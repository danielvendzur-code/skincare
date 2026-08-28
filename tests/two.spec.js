import { expect, test } from '@playwright/test';
import { deterministicTwoReply } from '../api/two-chat.js';
import { recommendTwo } from '../src/brands/two/config.js';

const route = '/ukazka/two';
const viewports = [{ width:1440, height:900 }, { width:390, height:844 }, { width:360, height:800 }];

async function noOverflow(page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
}

async function finishHa6Flow(page) {
  const choices = ['serum','hydration','gel','both'];
  for (const value of choices) {
    await page.locator(`.choice-grid button[data-value="${value}"]`).click();
    await page.waitForTimeout(170);
  }
}

test('TWO storefront is a navigable product-led mini shop', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.setViewportSize(viewports[0]);
  await page.goto(route);
  await expect(page.locator('.two-storefront')).toBeVisible();
  await expect(page.locator('.two-site__header')).toBeVisible();
  await expect(page.locator('.two-site__nav a')).toHaveCount(4);
  await expect(page.locator('.two-product-card')).toHaveCount(5);
  await expect(page.locator('.two-product-card h3')).toContainText(['HA⁶ HYDRATATION BOOSTER SERUM','BAKUCHIOL 1 % ANTI-AGE SERUM','Hydratačný krém','Krém pre problematickú pleť','AM/PM ROUTINE CLEANSING GEL 2% SALICYLIC ACID']);
  const productHrefs = await page.locator('.two-product-card h3 a').evaluateAll((links) => links.map((link) => link.href));
  expect(productHrefs.every((href) => /^https:\/\/www\.twocosmetics\.cz\/p\//.test(href))).toBeTruthy();
  await noOverflow(page);
  expect(errors).toEqual([]);
});

test('TWO chat keeps multi-turn context and compares named products without medical claims', async ({ page }) => {
  await page.goto(route);
  await page.getByRole('button', { name:'Otvoriť Chat' }).click();
  const input = page.getByRole('textbox', { name:'Napíšte správu' });
  await input.fill('Aký je rozdiel medzi HA⁶ a Hydratačným krémom?');
  await input.press('Enter');
  await expect(page.locator('.bubble--bot').last()).toContainText(/sérum|krém/i);
  await input.fill('A čo Bakuchiol oproti HA⁶?');
  await input.press('Enter');
  await expect(page.locator('.bubble--bot').last()).toContainText(/olejov|gélov/i);
  await input.fill('Vylieči mi to ekzém?');
  await input.press('Enter');
  const medicalReply = page.locator('.bubble--bot').last();
  await expect(medicalReply).toContainText(/diagnóz|liečb|dermatológ/i);
  await expect(medicalReply).not.toContainText(/garantuje|vylieči vám|lieči ekzém/i);
});

test('TWO advisor uses deterministic weighted scoring, Back, Reset, alternative and external CTA', async ({ page }) => {
  await page.goto(route);
  await page.getByRole('button', { name:/Vybrať starostlivosť/i }).first().click();
  await finishHa6Flow(page);
  await expect(page.locator('.result-card h2')).toContainText('HA⁶ HYDRATATION BOOSTER SERUM');
  await expect(page.locator('.why')).toContainText(/hydrat|gélov|sérum/i);
  await expect(page.locator('.alternative a')).toContainText('BAKUCHIOL 1 %');
  await expect(page.locator('.result-cta')).toHaveAttribute('href', /twocosmetics\.cz\/p\/ha6/);
  await page.getByRole('button', { name:'Späť k poslednej otázke' }).click();
  await expect(page.locator('.progress')).toContainText('4/4');
  await page.getByRole('button', { name:'Začať odznova' }).click();
  await expect(page.locator('.progress')).toContainText('1/4');
  await finishHa6Flow(page);
  await expect(page.locator('.result-card h2')).toContainText('HA⁶ HYDRATATION BOOSTER SERUM');
});

test('TWO sensitivity option hard-excludes products without verified sensitivity property', () => {
  const outcome = recommendTwo(['any','sensitive','cream','any']);
  expect(outcome.product.id).toBe('hydration-cream');
  expect(outcome.product.sensitiveVerified).toBeTruthy();
  expect(outcome.alternative?.sensitiveVerified).toBeTruthy();
});

test('TWO deterministic chat comparison uses previous named product', () => {
  const reply = deterministicTwoReply([
    { role:'user', content:'Povedz mi o HA⁶.' },
    { role:'assistant', content:'Je to sérum.' },
    { role:'user', content:'A čo oproti Bakuchiolu?' }
  ]);
  expect(reply).toMatch(/HA⁶/);
  expect(reply).toMatch(/BAKUCHIOL/);
  expect(reply).toMatch(/gélová/);
  expect(reply).toMatch(/olejová/);
});

for (const viewport of viewports) {
  test(`TWO advisor fits ${viewport.width}x${viewport.height} without horizontal or question scroll`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto(route);
    await page.getByRole('button', { name:/Vybrať starostlivosť/i }).first().click();
    await expect(page.locator('.advisor-view')).toBeVisible();
    expect(await page.locator('.advisor-view').evaluate((node) => node.scrollHeight <= node.clientHeight + 1)).toBeTruthy();
    await noOverflow(page);
  });
}

test('TWO keyboard focus, Escape and scroll lock restore correctly', async ({ page }) => {
  await page.goto(route);
  const trigger = page.getByRole('button', { name:'Otvoriť Chat' });
  await trigger.focus();
  await trigger.click();
  await expect(page.locator('.widget')).toBeFocused();
  expect(await page.evaluate(() => document.body.classList.contains('widget-open'))).toBeTruthy();
  await page.keyboard.press('Tab');
  expect(await page.evaluate(() => document.querySelector('.widget')?.contains(document.activeElement))).toBeTruthy();
  await page.keyboard.press('Escape');
  await expect(page.locator('.widget')).toHaveCount(0);
  expect(await page.evaluate(() => document.body.classList.contains('widget-open'))).toBeFalsy();
  await expect(trigger).toBeFocused();
});

test('TWO teaser close works and reduced motion removes meaningful animation', async ({ page }) => {
  await page.emulateMedia({ reducedMotion:'reduce' });
  await page.goto(route);
  await expect(page.locator('.teaser')).toBeVisible();
  await page.getByRole('button', { name:'Zavrieť pozvánku' }).click();
  await expect(page.locator('.teaser')).toHaveCount(0);
  const duration = await page.locator('.launcher').evaluate((node) => getComputedStyle(node).animationDuration);
  expect(duration).toMatch(/0\.00001s|0\.01ms|0s/);
});
