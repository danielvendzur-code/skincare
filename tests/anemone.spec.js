import { expect, test } from '@playwright/test';
import handler from '../api/chat.js';
import { anemoneProducts, recommendAnemone } from '../src/brands/anemone/config.js';

function mockResponse() {
  return {
    statusCode: 0,
    body: null,
    headers: {},
    setHeader(name, value) { this.headers[name] = value; },
    status(value) { this.statusCode = value; return this; },
    json(value) { this.body = value; return this; },
    end() { return this; },
  };
}

const roleCases = [
  { answers: ['water','oil','lips','neutral'], role: 'water' },
  { answers: ['oil','water','wash','rose'], role: 'oil' },
  { answers: ['balm','oil','finish','chamomile'], role: 'balm' },
  { answers: ['hair','water','prep','rose'], role: 'hair' },
];

for (const { answers, role } of roleCases) {
  test(`deterministic advisor hard-excludes other roles for ${role}`, () => {
    const first = recommendAnemone(answers);
    const second = recommendAnemone(answers);
    expect(first.product.id).toBe(second.product.id);
    expect(first.product.role).toBe(role);
    if (first.alternative) expect(first.alternative.role).toBe(role);
  });
}

test('water tie is stable and named botanical choice breaks it', () => {
  expect(recommendAnemone(['water','water','prep','neutral']).product.id).toBe('rose-water');
  expect(recommendAnemone(['water','water','prep','chamomile']).product.id).toBe('chamomile-water');
});

test('all baseline products use official ANEMONE links and local images', () => {
  expect(anemoneProducts).toHaveLength(5);
  for (const product of anemoneProducts) {
    expect(product.url).toMatch(/^https:\/\/anemone\.sk\//);
    expect(product.image).toMatch(/^\/assets\/brands\/anemone\//);
  }
});

test('API fallback compares the two floral waters and respects multi-turn context', async () => {
  const response = mockResponse();
  await handler({ method:'POST', headers:{}, body:{ brand:'anemone', messages:[
    { role:'user', content:'Pozerám Ružu damascénsku.' },
    { role:'assistant', content:'Rozumiem.' },
    { role:'user', content:'A aký je rozdiel oproti Harmančeku?' },
  ] } }, response);
  expect(response.statusCode).toBe(200);
  expect(response.body.fallback).toBeTruthy();
  expect(response.body.reply).toMatch(/Obe sú kvetové vody/);
  expect(response.body.reply).not.toMatch(/lieči|vylieči/i);
});

test('API validation handles invalid method, brand and body', async () => {
  const badMethod = mockResponse();
  await handler({ method:'GET', headers:{}, body:{} }, badMethod);
  expect(badMethod.statusCode).toBe(405);

  const badBrand = mockResponse();
  await handler({ method:'POST', headers:{}, body:{ brand:'unknown', message:'test' } }, badBrand);
  expect(badBrand.statusCode).toBe(400);

  const missing = mockResponse();
  await handler({ method:'POST', headers:{}, body:{ brand:'anemone' } }, missing);
  expect(missing.statusCode).toBe(400);
});

for (const viewport of [
  { name:'desktop', width:1440, height:900 },
  { name:'mobile', width:390, height:844 },
  { name:'mobile-small', width:360, height:800 },
]) {
  test(`ANEMONE rendered QA ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    const errors = [];
    page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto('/ukazka/anemone');

    await expect(page).toHaveTitle(/ANEMONE/);
    await expect(page.locator('.an-store')).toBeVisible();
    await expect(page.locator('.an-product')).toHaveCount(5);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
    expect(await page.locator('.an-store img').evaluateAll((images) => images.every((image) => image.complete && image.naturalWidth > 0))).toBeTruthy();

    if (viewport.width <= 900) {
      await page.getByRole('button', { name:'Otvoriť menu' }).click();
      await expect(page.locator('.an-mobile-nav')).toBeVisible();
      await page.keyboard.press('Escape');
      await expect(page.locator('.an-mobile-nav')).toHaveCount(0);
    } else {
      await expect(page.locator('.an-nav')).toBeVisible();
    }

    const teaserClose = page.getByRole('button', { name:'Zavrieť pozvánku' });
    if (viewport.width > 700) {
      await teaserClose.click();
      await expect(teaserClose).toHaveCount(0);
    }

    const launcher = page.getByRole('button', { name:/Otvoriť poradcu ANEMONE/i });
    await launcher.focus();
    await launcher.click();
    await expect(page.locator('.widget')).toBeVisible();
    expect(await page.evaluate(() => document.body.classList.contains('widget-open'))).toBeTruthy();
    await expect(page.locator('.widget')).toBeFocused();

    await page.getByRole('button', { name:'Ruža vs. Harmanček' }).click();
    await expect(page.locator('.bubble--bot').last()).toContainText('kvetové vody');
    await page.getByRole('textbox', { name:'Napíšte správu' }).fill('A kvetová voda oproti oleju?');
    await page.getByRole('button', { name:'Odoslať' }).click();
    await expect(page.locator('.bubble--bot').last()).toContainText(/olej|vodn/i);

    await page.locator('.mode-switch button').nth(1).click();
    await expect(page.locator('.choice-grid button')).toHaveCount(4);
    await page.locator('.mode-switch button').nth(0).click();
    await expect(page.locator('.message-row--user')).toHaveCount(2);
    await expect(page.locator('.message-row--user').last()).toContainText('kvetová voda oproti oleju');
    await page.locator('.mode-switch button').nth(1).click();

    expect(await page.locator('.advisor-view').evaluate((node) => node.scrollHeight <= node.clientHeight + 1)).toBeTruthy();
    await page.locator('.choice-grid button').nth(2).click();
    await page.waitForTimeout(210);
    await page.getByRole('button', { name:'Späť' }).click();
    await expect(page.locator('.choice-grid button').nth(2)).toHaveAttribute('aria-pressed', 'true');
    await page.locator('.choice-grid button').nth(2).click();
    await page.waitForTimeout(210);
    await page.locator('.choice-grid button').nth(0).click();
    await page.waitForTimeout(210);
    await page.locator('.choice-grid button').nth(0).click();
    await page.waitForTimeout(210);
    await page.locator('.choice-grid button').nth(0).click();
    await page.waitForTimeout(210);
    await expect(page.locator('.result-card')).toContainText('Balzam na pery Mandarínka & grep');
    expect(await page.locator('.result-cta').getAttribute('href')).toContain('anemone.sk/balzamy-na-pery/');

    await page.getByRole('button', { name:'Začať odznova' }).click();
    await expect(page.locator('.choice-grid button')).toHaveCount(4);
    await page.keyboard.press('Escape');
    await expect(page.locator('.widget')).toHaveCount(0);
    expect(await page.evaluate(() => document.body.classList.contains('widget-open'))).toBeFalsy();
    await expect(launcher).toBeFocused();
    expect(errors).toEqual([]);
  });
}

test('reduced motion removes ANEMONE transitions', async ({ page }) => {
  await page.emulateMedia({ reducedMotion:'reduce' });
  await page.goto('/ukazka/anemone');
  const duration = await page.locator('.an-product__image img').first().evaluate((node) => getComputedStyle(node).transitionDuration);
  expect(duration === '0s' || duration === '0.01ms').toBeTruthy();
});
