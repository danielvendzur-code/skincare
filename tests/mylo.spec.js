import { expect, test } from '@playwright/test';
import { rankMyloProducts } from '../src/brands/mylo/config.js';

const PRODUCT_HOST = /^https:\/\/(www\.)?mylo\.sk\//;

async function openAdvisor(page) {
  await page.getByRole('button', { name: /Nájsť starostlivosť/i }).click();
  await expect(page.locator('.widget')).toBeVisible();
  await expect(page.getByRole('tab', { name: /Výber starostlivosti/i })).toHaveAttribute('aria-selected', 'true');
}

async function choose(page, label) {
  await page.getByRole('button', { name: new RegExp(label, 'i') }).click();
  await page.waitForTimeout(220);
}

test('MYLO storefront behaves like a real compact shop at 1440x900 without browser errors', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  const errors = [];
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/ukazka/mylo');
  await expect(page.locator('.mylo-header')).toBeVisible();
  await expect(page.locator('.mylo-hero h1')).toContainText('Starostlivosť');
  await expect(page.locator('.mylo-product')).toHaveCount(5);
  await expect(page.locator('.mylo-product__image img')).toHaveCount(5);
  await expect.poll(() => page.locator('.mylo-product__image img').evaluateAll((images) => images.every((image) => image.complete && image.naturalWidth > 0))).toBeTruthy();

  const productLinks = await page.locator('.mylo-product__image').evaluateAll((links) => links.map((link) => link.href));
  expect(productLinks).toHaveLength(5);
  productLinks.forEach((url) => expect(url).toMatch(PRODUCT_HOST));

  await page.getByRole('button', { name: 'Produkty' }).click();
  await expect.poll(() => page.locator('#mylo-products').evaluate((node) => Math.abs(node.getBoundingClientRect().top) < 120)).toBeTruthy();
  await page.getByRole('button', { name: 'Rutina' }).click();
  await expect(page.locator('#mylo-routine')).toBeInViewport();
  const routinePosition = await page.locator('#mylo-routine').evaluate((node) => ({
    top: node.getBoundingClientRect().top,
    bottom: node.getBoundingClientRect().bottom,
    viewportHeight: innerHeight,
    headerBottom: document.querySelector('.mylo-header')?.getBoundingClientRect().bottom || 0,
  }));
  expect(routinePosition.bottom).toBeGreaterThan(routinePosition.headerBottom + 80);
  expect(routinePosition.top).toBeLessThan(routinePosition.viewportHeight - 80);

  await page.locator('.mylo-logo-button').click();
  await expect.poll(() => page.evaluate(() => scrollY)).toBeLessThan(30);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
  expect(errors).toEqual([]);
});

test('teaser closes independently and launcher still works', async ({ page }) => {
  await page.goto('/ukazka/mylo');
  await expect(page.locator('.teaser')).toBeVisible();
  await page.getByRole('button', { name: 'Zavrieť pozvánku' }).click();
  await expect(page.locator('.teaser')).toHaveCount(0);
  await page.getByRole('button', { name: /Otvoriť poradcu MYLO/i }).click();
  await expect(page.locator('.widget')).toBeVisible();
});

test('chat sends bounded multi-turn history and keeps useful fallback semantics', async ({ page }) => {
  const payloads = [];
  await page.route('**/api/chat', async (route) => {
    const payload = route.request().postDataJSON();
    payloads.push(payload);
    const latest = payload.messages.at(-1)?.content || '';
    const reply = /rados/i.test(latest)
      ? 'INOVAŤ je ľahké hydrogélové sérum, kým RADOSŤ je krémový ceramidový krok. Obe MYLO uvádza aj na ranné použitie.'
      : 'Pri suchej pleti sa v tomto výbere oplatí porovnať FLÓRU s krémom RADOSŤ podľa preferovanej textúry.';
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ reply, fallback: true }) });
  });

  await page.goto('/ukazka/mylo');
  await page.getByRole('button', { name: /Opýtať sa v Chate/i }).click();
  await expect(page.locator('.quick-chips button')).toHaveCount(4);
  await page.getByRole('button', { name: 'Mám suchú pleť' }).click();
  await expect(page.locator('.bubble--bot').last()).toContainText('FLÓRU');

  await page.getByLabel('Napíšte správu').fill('A INOVAŤ alebo RADOSŤ?');
  await page.getByRole('button', { name: 'Odoslať' }).click();
  await expect(page.locator('.bubble--bot').last()).toContainText('hydrogélové sérum');

  expect(payloads).toHaveLength(2);
  expect(payloads[0].brand).toBe('mylo');
  expect(payloads[0].messages.at(-1)).toEqual({ role: 'user', content: 'Mám suchú pleť' });
  expect(payloads[1].messages.length).toBeGreaterThanOrEqual(4);
  expect(payloads[1].messages.at(-1).content).toBe('A INOVAŤ alebo RADOSŤ?');
  expect(payloads[1].messages.length).toBeLessThanOrEqual(10);
});

test('advisor scoring is deterministic and Back/Reset preserve correct state', async ({ page }) => {
  const direct = rankMyloProducts({ skin: 'dry', goal: 'comfort', format: 'oil', routine: 'evening' });
  const repeated = rankMyloProducts({ skin: 'dry', goal: 'comfort', format: 'oil', routine: 'evening' });
  expect(direct.product.id).toBe('flora');
  expect(repeated.product.id).toBe(direct.product.id);
  expect(repeated.alternative.id).toBe(direct.alternative.id);
  expect(direct.reason).toMatch(/suchšiu pleť|väčší komfort|olej/i);
  expect(direct.alternative.id).not.toBe(direct.product.id);

  await page.goto('/ukazka/mylo');
  await openAdvisor(page);
  await expect(page.locator('.choice-grid button')).toHaveCount(4);
  expect(await page.locator('.advisor-view').evaluate((node) => node.scrollHeight <= node.clientHeight + 1)).toBeTruthy();

  await choose(page, 'Suchá alebo napnutá');
  await expect(page.locator('.progress b')).toHaveText('2/4');
  await page.getByRole('button', { name: 'Späť' }).click();
  await expect(page.locator('.progress b')).toHaveText('1/4');
  await expect(page.getByRole('button', { name: /Suchá alebo napnutá/i })).toHaveAttribute('aria-pressed', 'true');

  await page.locator('.widget__header').getByRole('button', { name: 'Začať odznova' }).click();
  await expect(page.locator('.progress b')).toHaveText('1/4');
  await expect(page.getByRole('button', { name: /Suchá alebo napnutá/i })).toHaveAttribute('aria-pressed', 'false');

  await choose(page, 'Suchá alebo napnutá');
  await choose(page, 'Viac komfortu');
  await choose(page, '^Olej');
  await choose(page, 'Najmä večer');

  await expect(page.locator('.result-card')).toContainText('FLÓRA');
  await expect(page.locator('.why')).toContainText(/suchšiu pleť|väčší komfort|olej/i);
  const primaryUrl = await page.locator('.result-cta').getAttribute('href');
  const alternativeUrl = await page.locator('.alternative a').getAttribute('href');
  expect(primaryUrl).toMatch(PRODUCT_HOST);
  expect(alternativeUrl).toMatch(PRODUCT_HOST);
  expect(alternativeUrl).not.toBe(primaryUrl);

  await page.locator('.result-back').click();
  await expect(page.locator('.progress b')).toHaveText('4/4');
  await expect(page.getByRole('button', { name: /Najmä večer/i })).toHaveAttribute('aria-pressed', 'true');
});

test('dialog traps focus, Escape closes it and body scroll lock is restored', async ({ page }) => {
  await page.goto('/ukazka/mylo');
  const opener = page.getByRole('button', { name: /Opýtať sa v Chate/i });
  await opener.click();
  await expect(page.locator('body')).toHaveClass(/widget-open/);
  await expect(page.locator('.widget')).toBeFocused();

  const first = page.locator('.widget button:not(:disabled), .widget a[href], .widget input:not(:disabled)').first();
  const last = page.locator('.widget button:not(:disabled), .widget a[href], .widget input:not(:disabled)').last();
  await first.focus();
  await page.keyboard.press('Shift+Tab');
  await expect(last).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(first).toBeFocused();

  await page.keyboard.press('Escape');
  await expect(page.locator('.widget')).toHaveCount(0);
  await expect(page.locator('body')).not.toHaveClass(/widget-open/);
  await expect(opener).toBeFocused();
});

for (const viewport of [{ width: 390, height: 844 }, { width: 360, height: 800 }]) {
  test(`MYLO mobile ${viewport.width}x${viewport.height} has no overflow and advisor question fits`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const errors = [];
    page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto('/ukazka/mylo');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();

    await page.getByRole('button', { name: 'Otvoriť menu' }).click();
    await expect(page.locator('.mylo-mobile-nav')).toBeVisible();
    await page.locator('.mylo-mobile-nav').getByRole('button', { name: /Výber starostlivosti/i }).click();
    const widget = await page.locator('.widget').boundingBox();
    expect(widget.x).toBe(0);
    expect(widget.y).toBe(0);
    expect(widget.width).toBe(viewport.width);
    expect(widget.height).toBe(viewport.height);
    expect(await page.locator('.advisor-view').evaluate((node) => node.scrollHeight <= node.clientHeight + 1)).toBeTruthy();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
    expect(errors).toEqual([]);
  });
}
