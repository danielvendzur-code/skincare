import { expect, test } from '@playwright/test';
import handler from '../api/chat.js';
import { biofy, biofyProducts, getBiofyQuestion } from '../src/brands/biofy/config.js';
import { biofyScoringContract, recommendBiofy } from '../src/brands/biofy/scoring.js';

function mockResponse() {
  let statusCode = 200;
  let body;
  return {
    response: {
      setHeader() {},
      status(value) { statusCode = value; return this; },
      json(value) { body = value; return this; },
      end() { return this; },
    },
    result: () => ({ statusCode, body }),
  };
}

async function offlineReply(message) {
  const mock = mockResponse();
  await handler({ method:'POST', headers:{}, body:{ brand:'biofy', message } }, mock.response);
  return mock.result();
}

async function completeAdvisor(page, choiceIndexes) {
  for (const index of choiceIndexes) {
    await page.locator('.choice-grid button').nth(index).click();
    await page.waitForTimeout(230);
  }
}

test('BIOFY scoring has an explicit hard area constraint and deterministic tie-break', () => {
  expect(biofyScoringContract.hardConstraint).toBe('area');
  expect(biofyScoringContract.tieBreak).toBe('catalog-order');
  expect(biofyScoringContract.weights).toEqual({ skin:12, role:10, format:7, texture:5, routine:3 });

  const cases = [
    { answers:['face','dry-sensitive','hydration','light-cream'], expected:'face-hydrating' },
    { answers:['face','normal-mixed','nourishment','rich-cream'], expected:'face-nourishing' },
    { answers:['face','dry-problematic','hemp-care','hemp-cream'], expected:'face-hemp' },
    { answers:['hair','scalp','tonic','tonic-format'], expected:'hair-tonic' },
    { answers:['hair','lengths','conditioning','oil-format'], expected:'hair-oil' },
  ];

  for (const item of cases) {
    const first = recommendBiofy(biofyProducts, item.answers);
    const second = recommendBiofy(biofyProducts, item.answers);
    expect(first.product.id).toBe(item.expected);
    expect(second.product.id).toBe(item.expected);
    expect(second.score).toBe(first.score);
    expect(first.alternative?.area).toBe(first.product.area);
  }
});

test('every reachable BIOFY advisor path keeps result and alternative in the selected category', () => {
  for (const areaOption of getBiofyQuestion(0, []).options) {
    const area = areaOption.value;
    const q1 = getBiofyQuestion(1, [area]);
    for (const a1 of q1.options) {
      const q2 = getBiofyQuestion(2, [area, a1.value]);
      for (const a2 of q2.options) {
        const q3 = getBiofyQuestion(3, [area, a1.value, a2.value]);
        for (const a3 of q3.options) {
          const recommendation = biofy.recommend([area, a1.value, a2.value, a3.value]);
          expect(recommendation.product.area).toBe(area);
          expect(recommendation.alternative?.area).toBe(area);
        }
      }
    }
  }
});

test('BIOFY storefront clearly separates face and hair, navigation works and images load', async ({ page }) => {
  await page.setViewportSize({ width:1440, height:900 });
  const errors = [];
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/ukazka/biofy');

  await expect(page.locator('.biofy-header__brand img')).toBeVisible();
  await expect(page.locator('#plet .biofy-product')).toHaveCount(3);
  await expect(page.locator('#vlasy .biofy-product')).toHaveCount(2);
  await expect(page.locator('#plet')).toContainText('Krém podľa typu pleti');
  await expect(page.locator('#vlasy')).toContainText('Tonikum alebo olejček');
  await expect(page.locator('body')).not.toContainText(/garantuje rast|zastaví vypadávanie|lieči akné|dermatologicky testované/i);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
  expect(await page.locator('.biofy-product img').evaluateAll((images) => images.every((image) => image.complete && image.naturalWidth > 0))).toBeTruthy();

  await page.locator('.biofy-nav--desktop a[href="#vlasy"]').click();
  await expect(page.locator('#vlasy')).toBeInViewport();
  await expect(page.locator('.biofy-product__meta a')).toHaveCount(5);
  expect(errors).toEqual([]);
});

test('BIOFY mobile navigation and storefront have no horizontal page overflow', async ({ page }) => {
  for (const viewport of [{ width:390, height:844 }, { width:360, height:800 }]) {
    await page.setViewportSize(viewport);
    await page.goto('/ukazka/biofy');
    await page.getByRole('button', { name:'Otvoriť menu' }).click();
    await expect(page.locator('#biofy-mobile-nav')).toBeVisible();
    await page.locator('#biofy-mobile-nav a[href="#plet"]').click();
    await expect(page.locator('#biofy-mobile-nav')).not.toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
  }
});

test('BIOFY chat keeps history across mode switches and deterministic fallback handles required comparisons', async ({ page }) => {
  await page.goto('/ukazka/biofy');
  await page.getByRole('button', { name:/Opýtať sa v chate/i }).click();
  await page.getByRole('button', { name:'Tonikum alebo olejček?' }).click();
  await expect(page.locator('.bubble--bot').last()).toContainText(/tonikum|olej/i);
  const messageCount = await page.locator('.message-row').count();

  await page.getByRole('tab', { name:/Výber starostlivosti/i }).click();
  await page.getByRole('tab', { name:'Chat' }).click();
  await expect(page.locator('.message-row')).toHaveCount(messageCount);

  const comparisons = [
    ['Hydratačný krém vs Výživný krém', /suchú.*citlivú|normálnu.*zmiešanú/i],
    ['Hydratačný krém vs Konopný krém', /konopný|problematickú/i],
    ['Tonikum vs olejček', /pokožky hlavy|dĺžok/i],
    ['Pleť vs vlasy', /nikdy nemieša|kategóri/i],
    ['Čo je konopný krém?', /suchú a problematickú/i],
  ];
  for (const [message, pattern] of comparisons) {
    const result = await offlineReply(message);
    expect(result.statusCode).toBe(200);
    expect(result.body.fallback).toBeTruthy();
    expect(result.body.reply).toMatch(pattern);
  }
});

test('BIOFY advisor Back, Reset, Escape, focus trap and same-category CTA work', async ({ page }) => {
  await page.setViewportSize({ width:390, height:844 });
  await page.goto('/ukazka/biofy');
  await page.getByRole('button', { name:/Nájsť svoj produkt/i }).click();
  await expect(page.locator('.widget')).toBeVisible();
  expect(await page.evaluate(() => document.body.classList.contains('widget-open'))).toBeTruthy();

  await expect(page.locator('.choice-grid button')).toHaveCount(2);
  await page.getByRole('button', { name:'Pleť' }).click();
  await page.waitForTimeout(230);
  await expect(page.locator('.choice-grid')).toContainText('Suchá a citlivá');
  await page.getByRole('button', { name:'Späť' }).click();
  await expect(page.locator('.choice-grid button')).toHaveCount(2);

  await completeAdvisor(page, [0, 0, 0, 0]);
  await expect(page.locator('.result-card')).toContainText('Hydratačný krém');
  await expect(page.locator('.alternative')).not.toContainText(/tonikum|olejček/i);
  expect(await page.locator('.result-cta').getAttribute('href')).toContain('biofy.sk/produkt/hydratacny-krem');

  await page.getByRole('button', { name:'Začať odznova' }).click();
  await expect(page.locator('.choice-grid button')).toHaveCount(2);
  const dialog = page.locator('.widget');
  await dialog.focus();
  await page.keyboard.press('Shift+Tab');
  expect(await page.evaluate(() => document.activeElement?.closest('.widget') !== null)).toBeTruthy();
  await page.keyboard.press('Escape');
  await expect(page.locator('.widget')).toHaveCount(0);
  expect(await page.evaluate(() => document.body.classList.contains('widget-open'))).toBeFalsy();
});

test('BIOFY question screens fit at all required viewports', async ({ page }) => {
  for (const viewport of [{ width:1440, height:900 }, { width:390, height:844 }, { width:360, height:800 }]) {
    await page.setViewportSize(viewport);
    await page.goto('/ukazka/biofy');
    await page.getByRole('button', { name:/Nájsť svoj produkt/i }).first().click();
    for (let step = 0; step < 4; step += 1) {
      expect(await page.locator('.advisor-view').evaluate((node) => node.scrollHeight <= node.clientHeight + 1)).toBeTruthy();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
      await page.locator('.choice-grid button').first().click();
      await page.waitForTimeout(230);
    }
    await expect(page.locator('.result-card')).toBeVisible();
  }
});

test('BIOFY API rejects invalid brand and missing user message', async () => {
  const unknown = mockResponse();
  await handler({ method:'POST', headers:{}, body:{ brand:'not-a-brand', message:'test' } }, unknown.response);
  expect(unknown.result().statusCode).toBe(400);

  const missing = mockResponse();
  await handler({ method:'POST', headers:{}, body:{ brand:'biofy', message:'' } }, missing.response);
  expect(missing.result().statusCode).toBe(400);
});
