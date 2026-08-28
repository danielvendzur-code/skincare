import { expect, test } from '@playwright/test';
import handler from '../api/chat.js';

const brands = ['mylo','ponio','two','bellcoria','biofy','anemone'];

for (const brand of brands) {
  test(`${brand}: owner, chat, advisor and result`, async ({ page }) => {
    await page.goto(`/ukazka/${brand}`);
    await expect(page.locator('.owner h1')).toBeVisible();
    if (brand === 'bellcoria') {
      await expect(page.locator('.bellcoria-storefront')).toBeVisible();
      await expect(page.getByTestId('bellcoria-product')).toHaveCount(5);
      await expect(page.locator('.bellcoria-nav')).toBeVisible();
    } else {
      await expect(page.locator('.owner-benefits article')).toHaveCount(3);
    }
    await expect(page.locator('.owner')).not.toContainText('Čo poradca robí');
    await expect(page.locator('.owner__copy > p, .workflow')).toHaveCount(0);
    await expect(page.locator('.owner')).not.toContainText(/Starostlivosť, ktorá dáva zmysel|Starostlivosť, ktorú si pokožka zaslúži|Starostlivosť, ktorá dýcha prírodou/i);
    await expect(page.locator('body')).not.toContainText(/\bAI\b|\bdemo\b|94\s*%|confidence/i);
    expect(await page.locator('button button, a button, button a').count()).toBe(0);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);

    await page.getByRole('button', { name: /Otvoriť Chat/i }).click();
    await expect(page.locator('.widget')).toBeVisible();
    await expect(page.locator('.widget')).not.toContainText('Produktový poradca');
    await expect(page.locator('.mode-switch')).toHaveCount(1);
    await expect(page.locator('.mode-thumb')).toHaveCount(1);
    await expect(page.locator('.chat-avatar')).toHaveCount(1);
    const handoffBox = await page.locator('.handoff').boundingBox();
    const welcomeBox = await page.locator('.bubble--bot').first().boundingBox();
    expect(handoffBox.y).toBeLessThan(welcomeBox.y);
    await expect(page.locator('.quick-chips button')).toHaveCount(4);
    await page.locator('.quick-chips button').first().click();
    await expect(page.locator('.quick-chips')).toHaveCount(0);
    await expect(page.locator('.handoff')).toHaveCount(0);

    await page.locator('.mode-switch button').nth(1).click();
    await expect(page.locator('.mode-switch')).toHaveClass(/is-advisor/);
    for (let step = 0; step < 4; step += 1) {
      await expect(page.locator('.choice-grid button')).toHaveCount(4);
      await expect(page.locator('.choice-image img')).toHaveCount(4);
      await expect.poll(() => page.locator('.choice-image img').evaluateAll((images) => images.every((image) => image.complete && image.naturalWidth > 0))).toBeTruthy();
      const fullBleed = await page.locator('.choice-grid button').evaluateAll((buttons) => buttons.every((button) => {
        const card = button.getBoundingClientRect();
        const image = button.querySelector('.choice-image').getBoundingClientRect();
        return Math.abs(card.width - image.width) <= 2 && Math.abs(card.height - image.height) <= 2;
      }));
      expect(fullBleed).toBeTruthy();
      const noScroll = await page.locator('.advisor-view').evaluate((node) => node.scrollHeight <= node.clientHeight + 1);
      expect(noScroll).toBeTruthy();
      await page.locator('.choice-grid button').nth(step % 4).click();
      await page.waitForTimeout(230);
    }
    await expect(page.locator('.result-card')).toBeVisible();
    const url = await page.locator('.result-cta').getAttribute('href');
    expect(url).toMatch(/^https:\/\/(www\.)?(mylo\.sk|ponio\.sk|twocosmetics\.cz|bellcoria\.sk|biofy\.sk|anemone\.sk)\//);
    await page.keyboard.press('Escape');
    await expect(page.locator('.widget')).toHaveCount(0);
  });
}

test('mobile widget is fullscreen and page is scroll locked', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/ukazka/mylo');
  await page.getByRole('button', { name: /Vyskúšať Výber/i }).click();
  await page.waitForTimeout(350);
  const box = await page.locator('.widget').boundingBox();
  expect(box.x).toBe(0); expect(box.y).toBe(0); expect(box.width).toBe(390); expect(box.height).toBe(844);
  await expect(page.locator('.widget__header')).toBeVisible();
  await expect(page.locator('.mode-switch')).toBeVisible();
  expect(await page.evaluate(() => document.body.classList.contains('widget-open'))).toBeTruthy();
});

test('anemone mobile owner keeps the logo, benefits and primary action prominent', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/ukazka/anemone');
  await expect(page.locator('.owner__primary-action')).toBeVisible();
  await expect(page.locator('.owner-benefits article')).toHaveCount(3);
  const logo = await page.locator('.owner__header .brand-logo').boundingBox();
  const visual = await page.locator('.owner__visual').boundingBox();
  expect(logo.width).toBeGreaterThanOrEqual(120);
  expect(visual.width).toBeGreaterThanOrEqual(355);
  expect(await page.locator('.owner').evaluate((node) => node.scrollHeight <= node.clientHeight + 1)).toBeTruthy();
});

test('360x800 advisor questions fit without scroll', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto('/ukazka/two');
  await page.getByRole('button', { name: /Vyskúšať Výber/i }).click();
  expect(await page.locator('.advisor-view').evaluate((node) => node.scrollHeight <= node.clientHeight + 1)).toBeTruthy();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
});

test('brand themes are materially differentiated', async ({ page }) => {
  const signatures = [];
  for (const brand of brands) {
    await page.goto(`/ukazka/${brand}`);
    signatures.push(await page.locator('.owner__visual').evaluate((node) => {
      const s = getComputedStyle(node); return `${s.borderRadius}|${s.clipPath}|${getComputedStyle(document.documentElement).getPropertyValue('--accent')}`;
    }));
  }
  expect(new Set(signatures).size).toBeGreaterThanOrEqual(5);
});

test('reduced motion and deterministic API fallback', async () => {
  const css = await import('node:fs').then((fs) => fs.readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8'));
  expect(css).toContain('prefers-reduced-motion');
  let status = 0, body;
  await handler({ method:'POST', headers:{}, body:{ brand:'mylo', message:'Mám suchú pleť' } }, { setHeader(){}, status(value){ status=value; return this; }, json(value){ body=value; return this; } });
  expect(status).toBe(200); expect(body.reply).toMatch(/Mylo|štyrmi|štyri/i);
});
