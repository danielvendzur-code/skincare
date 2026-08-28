import { expect, test } from '@playwright/test';
import { choosePonioRecommendation, ponioFallbackReply, rankPonioProducts } from '../src/brands/ponio/config.js';

async function openAdvisor(page) {
  await page.getByRole('button', { name: /Vybrať starostlivosť/i }).first().click();
  await expect(page.getByRole('dialog', { name: /PONIO/i })).toBeVisible();
  await expect(page.locator('.ponio-advisor.is-active')).toBeVisible();
}

async function choose(page, label) {
  await page.locator('.ponio-advisor.is-active .ponio-choice-grid').getByRole('button', { name: new RegExp(label, 'i') }).first().click();
}

test.describe('PONIO storefront and advisor parity', () => {
  test('1440x900 storefront is a real category-led mini shop', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/ukazka/ponio');
    await expect(page.locator('.ponio-site-header')).toBeVisible();
    await expect(page.locator('.ponio-hero')).toBeVisible();
    await expect(page.locator('.ponio-category-link')).toHaveCount(4);
    await expect(page.locator('.ponio-category-link[data-category="face"]')).toContainText('Pleť');
    await expect(page.locator('.ponio-category-link[data-category="hair"]')).toContainText('Vlasy');
    await expect(page.locator('.ponio-category-link[data-category="body"]')).toContainText('Telo');
    await expect(page.locator('.ponio-category-link[data-category="lips"]')).toContainText('Pery');
    await expect(page.locator('.ponio-product-card')).toHaveCount(5);
    await expect(page.locator('.ponio-product-card')).toContainText(['Lumina shield', 'Healthy aging', 'Mint', 'Banán & kokos', 'Dvojitá levanduľa']);
    await expect(page.locator('.ponio-editorial')).toContainText('Suchý šampón nie je tuhý šampón');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
  });

  test('category and product links point to real PONIO destinations and cards are clickable', async ({ page }) => {
    await page.goto('/ukazka/ponio');
    const categoryLinks = await page.locator('.ponio-category-link').evaluateAll((links) => links.map((link) => link.href));
    expect(categoryLinks).toHaveLength(4);
    expect(categoryLinks.every((href) => href.startsWith('https://ponio.sk/'))).toBeTruthy();
    const card = page.locator('.ponio-product-card[data-product-id="mint-dry"]');
    await expect(card).toHaveAttribute('href', 'https://ponio.sk/products/suchy-sampon-mint');
    await card.evaluate((element) => element.addEventListener('click', (event) => event.preventDefault(), { once: true }));
    await card.click();
    await expect(page).toHaveURL(/\/ukazka\/ponio$/);
  });

  test('teaser dismisses independently and launcher still opens the widget', async ({ page }) => {
    await page.goto('/ukazka/ponio');
    await expect(page.getByTestId('ponio-teaser')).toBeVisible();
    await page.getByRole('button', { name: 'Skryť pozvánku' }).click();
    await expect(page.getByTestId('ponio-teaser')).toHaveCount(0);
    await page.getByRole('button', { name: /Otvoriť poradcu PONIO/i }).click();
    await expect(page.getByRole('dialog', { name: /PONIO/i })).toBeVisible();
  });

  test('Chat preserves multi-turn history in the API payload', async ({ page }) => {
    const requests = [];
    let replyIndex = 0;
    await page.route('**/api/chat', async (route) => {
      requests.push(route.request().postDataJSON());
      replyIndex += 1;
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ reply: `Odpoveď ${replyIndex}`, fallback: false }) });
    });
    await page.goto('/ukazka/ponio');
    await page.getByRole('button', { name: /Opýtať sa v Chate/i }).click();
    const input = page.getByRole('textbox', { name: /Otázka pre PONIO poradcu/i });
    await input.fill('Porovnaj Lumina shield a Healthy aging');
    await page.getByRole('button', { name: 'Odoslať správu' }).click();
    await expect(page.getByText('Odpoveď 1', { exact: true })).toBeVisible();
    await input.fill('A ktorý z nich je na zrelú pleť?');
    await page.getByRole('button', { name: 'Odoslať správu' }).click();
    await expect(page.getByText('Odpoveď 2', { exact: true })).toBeVisible();
    expect(requests).toHaveLength(2);
    expect(requests[0].messages.map((message) => message.content)).toContain('Porovnaj Lumina shield a Healthy aging');
    expect(requests[1].messages.map((message) => message.content)).toEqual(expect.arrayContaining(['Porovnaj Lumina shield a Healthy aging', 'Odpoveď 1', 'A ktorý z nich je na zrelú pleť?']));
  });

  test('advisor Back, Reset, result and CTA work', async ({ page }) => {
    await page.goto('/ukazka/ponio');
    await openAdvisor(page);
    await expect(page.getByRole('heading', { name: 'Čo dnes vyberáte?' })).toBeVisible();
    await choose(page, '^Pleť');
    await expect(page.getByRole('heading', { name: 'Čo je pre vás najdôležitejšie?' })).toBeVisible();
    await page.locator('.ponio-advisor.is-active').getByRole('button', { name: /^Späť/ }).click();
    await expect(page.getByRole('heading', { name: 'Čo dnes vyberáte?' })).toBeVisible();
    await choose(page, '^Pleť');
    await choose(page, 'Denná ochrana');
    await page.getByRole('button', { name: 'Začať odznova' }).click();
    await expect(page.getByRole('heading', { name: 'Čo dnes vyberáte?' })).toBeVisible();
    await choose(page, '^Pleť');
    await choose(page, 'Denná ochrana');
    await choose(page, 'Denný krém');
    await choose(page, '^Ráno');
    const result = page.locator('.ponio-result.is-active');
    await expect(result).toBeVisible();
    await expect(result).toHaveAttribute('data-product-area', 'face');
    await expect(result).toContainText('Lumina shield');
    await expect(result.locator('.ponio-result-reason')).toContainText('Prečo tento produkt');
    await expect(result.locator('.ponio-result-cta')).toHaveAttribute('href', 'https://ponio.sk/products/lumina-shield-pletovy-krem');
    await result.getByRole('button', { name: 'Vybrať znova' }).click();
    await expect(page.getByRole('heading', { name: 'Čo dnes vyberáte?' })).toBeVisible();
  });

  test('Escape closes, page unlocks and focus returns to the opener', async ({ page }) => {
    await page.goto('/ukazka/ponio');
    const launcher = page.getByRole('button', { name: /Otvoriť poradcu PONIO/i });
    await launcher.click();
    await expect(page.getByRole('dialog', { name: /PONIO/i })).toBeVisible();
    expect(await page.evaluate(() => document.body.classList.contains('ponio-widget-open'))).toBeTruthy();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog', { name: /PONIO/i })).toHaveCount(0);
    expect(await page.evaluate(() => document.body.classList.contains('ponio-widget-open'))).toBeFalsy();
    await expect(page.getByRole('button', { name: /Otvoriť poradcu PONIO/i })).toBeFocused();
  });

  for (const viewport of [{ width: 390, height: 844 }, { width: 360, height: 800 }]) {
    test(`${viewport.width}x${viewport.height} mobile storefront and advisor stay inside the viewport`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await page.goto('/ukazka/ponio');
      await expect(page.locator('.ponio-mobile-toggle')).toBeVisible();
      await page.locator('.ponio-mobile-toggle').click();
      await expect(page.locator('.ponio-mobile-nav')).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
      await page.locator('.ponio-mobile-toggle').click();
      await openAdvisor(page);
      const box = await page.locator('.ponio-widget').boundingBox();
      expect(Math.round(box.x)).toBe(0);
      expect(Math.round(box.y)).toBe(0);
      expect(Math.round(box.width)).toBe(viewport.width);
      expect(Math.round(box.height)).toBe(viewport.height);
      expect(await page.locator('.ponio-advisor.is-active').evaluate((node) => node.scrollHeight <= node.clientHeight + 1)).toBeTruthy();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
    });
  }
});

test('PONIO scoring is deterministic and care area is a hard constraint', () => {
  const faceAnswers = { area: 'face', goal: 'protect', format: 'daily-cream', timing: 'morning' };
  const first = choosePonioRecommendation(faceAnswers);
  const second = choosePonioRecommendation(faceAnswers);
  expect(first.product.id).toBe('lumina-shield');
  expect(second.product.id).toBe(first.product.id);
  expect(first.product.area).toBe('face');
  expect(first.alternative?.area).toBe('face');
  expect(rankPonioProducts({ area: 'face', goal: 'refresh', format: 'dry-shampoo', timing: 'as-needed' }).every(({ product }) => product.area === 'face')).toBeTruthy();

  const hair = choosePonioRecommendation({ area: 'hair', goal: 'refresh', format: 'dry-shampoo', timing: 'travel' });
  expect(hair.product.id).toBe('mint-dry');
  expect(hair.product.area).toBe('hair');
  expect(hair.alternative?.area).toBe('hair');
  expect(rankPonioProducts({ area: 'hair', goal: 'protect', format: 'daily-cream', timing: 'morning' }).every(({ product }) => product.area === 'hair')).toBeTruthy();

  const sensitive = choosePonioRecommendation({ area: 'face', goal: 'sensitive', format: 'sensitive-cream', timing: 'daily' });
  expect(sensitive.product.id).toBe('vanilla-coconut');
  expect(sensitive.reason).toMatch(/citlivá pleť/i);
});

test('catalog fallback understands named products, solid vs dry shampoo and supported travel use', () => {
  expect(ponioFallbackReply('Lumina shield')).toMatch(/rann|SPF|make-up/i);
  expect(ponioFallbackReply('Aký je rozdiel medzi suchým šampónom a šampúchom?')).toMatch(/medzi umytiami.*samotné umývanie/i);
  expect(ponioFallbackReply('Čo na citlivú pleť?')).toMatch(/Vanilka.*kokos/i);
  expect(ponioFallbackReply('Čo je vhodné na cesty?')).toMatch(/Mint.*Dvojitá levanduľa/i);
  expect(ponioFallbackReply('Máte niečo na pery?')).toMatch(/Rúž.*8,30/i);
});
