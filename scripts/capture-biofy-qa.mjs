import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('artifacts/screenshots');
const baseURL = process.env.QA_BASE_URL ?? 'http://127.0.0.1:4173';
const viewports = [
  { name:'desktop', width:1440, height:900 },
  { name:'mobile', width:390, height:844 },
  { name:'compact', width:360, height:800 },
];

await fs.mkdir(root, { recursive:true });
const browser = await chromium.launch({ headless:true });

for (const viewport of viewports) {
  const page = await browser.newPage({ viewport:{ width:viewport.width, height:viewport.height }, deviceScaleFactor:1 });
  const errors = [];
  page.on('console', (message) => { if (message.type() === 'error') errors.push(`console: ${message.text()}`); });
  page.on('pageerror', (error) => errors.push(`pageerror: ${error.message}`));
  page.on('requestfailed', (request) => errors.push(`requestfailed: ${request.url()} ${request.failure()?.errorText ?? ''}`));

  await page.goto(`${baseURL}/ukazka/biofy`, { waitUntil:'networkidle' });
  await page.locator('.biofy-storefront').waitFor();
  const imagesLoaded = await page.locator('.biofy-storefront img').evaluateAll((images) => images.every((image) => image.complete && image.naturalWidth > 0));
  if (!imagesLoaded) throw new Error(`${viewport.name}: one or more storefront images failed to load`);
  await page.screenshot({ path:path.join(root, `biofy-${viewport.name}-storefront.png`) });

  await page.getByRole('button', { name:/Opýtať sa v chate/i }).click();
  await page.locator('.widget').waitFor();
  await page.screenshot({ path:path.join(root, `biofy-${viewport.name}-chat.png`) });
  await page.keyboard.press('Escape');

  await page.getByRole('button', { name:/Nájsť svoj produkt/i }).first().click();
  await page.locator('.choice-grid').waitFor();
  await page.screenshot({ path:path.join(root, `biofy-${viewport.name}-advisor.png`) });
  for (let step = 0; step < 4; step += 1) {
    await page.locator('.choice-grid button').first().click();
    await page.waitForTimeout(230);
  }
  await page.locator('.result-card').waitFor();
  await page.screenshot({ path:path.join(root, `biofy-${viewport.name}-result.png`) });

  if (errors.length) throw new Error(`${viewport.name}: ${errors.join(' | ')}`);
  await page.close();
  process.stdout.write(`biofy ${viewport.name}\n`);
}

await browser.close();
