import { expect, test } from '@playwright/test';
import handler from '../api/chat.js';
import { bellcoriaFallback, recommendBellcoria } from '../src/brands/bellcoria/config.js';

const faceAreas = ['face', 'face-neck'];
const roles = ['cleanse', 'oil', 'elixir', 'body-oil'];
const textures = ['gel', 'oil', 'light', 'any'];
const routines = ['cleansing', 'daily', 'evening', 'body'];

function mockResponse() {
  let statusCode = 200;
  let payload;
  const headers = {};
  return {
    response: {
      setHeader(key, value) { headers[key] = value; },
      status(value) { statusCode = value; return this; },
      json(value) { payload = value; return this; },
      end() { return this; }
    },
    result: () => ({ statusCode, payload, headers })
  };
}

test('Bellcoria scoring is deterministic and body oil never wins a face flow', () => {
  for (const area of faceAreas) {
    for (const role of roles) {
      for (const texture of textures) {
        for (const routine of routines) {
          const first = recommendBellcoria({ area, role, texture, routine });
          const second = recommendBellcoria({ area, role, texture, routine });
          expect(first.product.area).toContain('face');
          expect(first.product.id).not.toBe('body-astaxanthin');
          expect(second.product.id).toBe(first.product.id);
          expect(second.reason).toBe(first.reason);
        }
      }
    }
  }

  expect(recommendBellcoria({ area:'body', role:'body-oil', texture:'oil', routine:'body' }).product.id).toBe('body-astaxanthin');
  expect(recommendBellcoria({ area:'face', role:'elixir', texture:'oil', routine:'evening' }).product.id).toBe('night-elixir');
  expect(recommendBellcoria({ area:'face', role:'oil', texture:'oil', routine:'daily' }).product.id).toBe('opuntia');
});

test('Bellcoria local fallback covers product-role intents without medical claims', () => {
  expect(bellcoriaFallback('Aký je rozdiel olej vs elixír?')).toMatch(/pleťový olej|elixír/i);
  expect(bellcoriaFallback('Čo zaradiť večer?')).toMatch(/Nočný elixír/i);
  expect(bellcoriaFallback('A čo bakuchiol?')).toMatch(/bakuchiol/i);
  expect(bellcoriaFallback('Tvár alebo telo?')).toMatch(/telov/i);
  expect(bellcoriaFallback('Čistiaci gél alebo olej?')).toMatch(/čistiaci gél/i);
  expect(bellcoriaFallback('A čo liečba ekzému?')).not.toMatch(/vylieči|lieči ekzém/i);
});

test('Bellcoria API handles multi-turn and deterministic fallback', async () => {
  const mock = mockResponse();
  await handler({
    method: 'POST',
    headers: {},
    body: {
      brand: 'bellcoria',
      messages: [
        { role:'user', content:'Porovnaj opunciový olej a bakuchiolový elixír.' },
        { role:'assistant', content:'Rozumiem.' },
        { role:'user', content:'Ktorý z nich je elixír?' }
      ]
    }
  }, mock.response);
  const result = mock.result();
  expect(result.statusCode).toBe(200);
  expect(result.payload.reply).toMatch(/Bellcoria|elixír|bakuchiol|olej/i);
  expect(result.headers['Cache-Control']).toBe('no-store');
});

test('Bellcoria storefront, chat history and advisor work at 1440x900', async ({ page }) => {
  await page.setViewportSize({ width:1440, height:900 });
  const consoleErrors = [];
  page.on('console', (message) => { if (message.type() === 'error') consoleErrors.push(message.text()); });
  page.on('pageerror', (error) => consoleErrors.push(error.message));

  const apiBodies = [];
  await page.route('**/api/chat', async (route) => {
    const body = route.request().postDataJSON();
    apiBodies.push(body);
    await route.fulfill({ status:200, contentType:'application/json', body:JSON.stringify({ reply:`Katalógová odpoveď ${apiBodies.length}` }) });
  });

  await page.goto('/ukazka/bellcoria');
  await expect(page.locator('.bellcoria-storefront h1')).toBeVisible();
  await expect(page.getByTestId('bellcoria-product')).toHaveCount(5);
  await expect(page.locator('.bellcoria-nav')).toContainText('Čistenie');
  await expect(page.locator('.bellcoria-nav')).toContainText('Oleje a elixíry');
  await expect(page.locator('.bellcoria-nav')).toContainText('Telo');
  await expect(page.locator('.bellcoria-product__link')).toHaveCount(5);
  expect(await page.locator('.bellcoria-product__link').evaluateAll((links) => links.every((link) => /^https:\/\/bellcoria\.sk\//.test(link.href)))).toBeTruthy();

  await page.locator('.bellcoria-nav a[href="#cistenie"]').click();
  await expect(page.locator('#cistenie')).toBeInViewport();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();

  const launcher = page.getByRole('button', { name:/Otvoriť poradcu BELLCORIA/i });
  await launcher.click();
  await expect(page.getByRole('dialog', { name:/Poradca BELLCORIA/i })).toBeVisible();
  expect(await page.evaluate(() => document.body.classList.contains('widget-open'))).toBeTruthy();
  expect(await page.evaluate(() => document.activeElement?.closest?.('.widget') !== null)).toBeTruthy();

  await page.locator('.quick-chips button').first().click();
  await expect(page.locator('.bubble--bot').last()).toContainText('Katalógová odpoveď 1');
  await page.getByRole('textbox', { name:'Napíšte správu' }).fill('A ktorý z nich je večerný?');
  await page.getByRole('button', { name:'Odoslať' }).click();
  await expect(page.locator('.bubble--bot').last()).toContainText('Katalógová odpoveď 2');
  expect(apiBodies[0].messages.length).toBe(2);
  expect(apiBodies[1].messages.length).toBeGreaterThanOrEqual(4);
  expect(apiBodies[1].messages.at(-1).content).toBe('A ktorý z nich je večerný?');

  await page.getByRole('tab', { name:/Výber starostlivosti/i }).click();
  const picks = [0, 2, 1, 2];
  for (const pick of picks) {
    await expect(page.locator('.choice-grid button')).toHaveCount(4);
    expect(await page.locator('.advisor-view').evaluate((node) => node.scrollHeight <= node.clientHeight + 1)).toBeTruthy();
    await page.locator('.choice-grid button').nth(pick).click();
    await page.waitForTimeout(210);
  }

  await expect(page.locator('.result-card')).toContainText('Nočný elixír s vitamínom C a brusnicovým olejom');
  await expect(page.locator('.why')).toContainText(/Najlepšie sedí|vašim odpovediam/i);
  await expect(page.locator('.result-cta')).toHaveAttribute('href', /nocny-elixir/);

  await page.getByRole('button', { name:/Späť k poslednej otázke/i }).click();
  await expect(page.locator('.progress b')).toHaveText('4/4');
  await expect(page.locator('.choice-grid button[aria-pressed="true"]')).toContainText('Večer');
  await page.getByRole('button', { name:'Začať odznova' }).click();
  await expect(page.locator('.progress b')).toHaveText('1/4');

  await page.keyboard.press('Escape');
  await expect(page.locator('.widget')).toHaveCount(0);
  await page.waitForTimeout(50);
  expect(await page.evaluate(() => document.body.classList.contains('widget-open'))).toBeFalsy();
  expect(await page.evaluate(() => document.activeElement?.classList?.contains('launcher'))).toBeTruthy();
  expect(consoleErrors).toEqual([]);
});

for (const viewport of [{ width:390, height:844 }, { width:360, height:800 }]) {
  test(`Bellcoria mobile ${viewport.width}x${viewport.height}: nav, advisor and overflow`, async ({ page }) => {
    await page.setViewportSize(viewport);
    const errors = [];
    page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto('/ukazka/bellcoria');

    const menu = page.locator('.bellcoria-menu-toggle');
    await expect(menu).toHaveAccessibleName('Otvoriť menu');
    await menu.click();
    await expect(menu).toHaveAttribute('aria-expanded', 'true');
    await expect(menu).toHaveAccessibleName('Zavrieť menu');
    await expect(page.locator('.bellcoria-nav')).toHaveClass(/is-open/);
    await page.locator('.bellcoria-nav a[href="#plet"]').click();
    await expect(menu).toHaveAttribute('aria-expanded', 'false');
    await expect(menu).toHaveAccessibleName('Otvoriť menu');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();

    await page.getByRole('button', { name:/Otvoriť poradcu BELLCORIA/i }).click();
    await page.getByRole('tab', { name:/Výber starostlivosti/i }).click();
    const box = await page.locator('.widget').boundingBox();
    expect(Math.round(box.width)).toBe(viewport.width);
    expect(Math.round(box.height)).toBe(viewport.height);
    expect(await page.locator('.advisor-view').evaluate((node) => node.scrollHeight <= node.clientHeight + 1)).toBeTruthy();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
    expect(errors).toEqual([]);
  });
}

test('Bellcoria respects reduced motion and teaser can be dismissed', async ({ page }) => {
  await page.emulateMedia({ reducedMotion:'reduce' });
  await page.goto('/ukazka/bellcoria');
  await expect(page.locator('.teaser')).toBeVisible();
  await page.getByRole('button', { name:'Zavrieť pozvánku' }).click();
  await expect(page.locator('.teaser')).toHaveCount(0);
  const duration = await page.locator('.bellcoria-product__image img').first().evaluate((node) => getComputedStyle(node).transitionDuration);
  expect(duration === '0s' || duration === '0.01ms').toBeTruthy();
});
