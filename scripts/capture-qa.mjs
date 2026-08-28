import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('artifacts/screenshots');
const baseURL = process.env.QA_BASE_URL ?? 'http://127.0.0.1:4173';
const brands = ['mylo','ponio','two','bellcoria','biofy','anemone'];
const viewports = [
  { name:'desktop', width:1440, height:900 },
  { name:'mobile', width:390, height:844 },
  { name:'mobile-small', width:360, height:800 }
];

await fs.mkdir(root,{ recursive:true });
const browser = await chromium.launch({ channel:'msedge', headless:true });
for (const brand of brands) {
  for (const viewport of viewports) {
    const page = await browser.newPage({ viewport:{ width:viewport.width, height:viewport.height }, deviceScaleFactor:1 });
    const errors = [];
    page.on('console', (message) => { if (message.type() === 'error') errors.push(`${message.text()} ${message.location().url}`.trim()); });
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(`${baseURL}/ukazka/${brand}`, { waitUntil:'networkidle' });
    await page.screenshot({ path:path.join(root,`${brand}-${viewport.name}-owner.png`) });
    await page.getByRole('button',{ name:/Otvoriť poradcu/i }).click();
    await page.waitForTimeout(320);
    await page.screenshot({ path:path.join(root,`${brand}-${viewport.name}-chat.png`) });
    await page.locator('.mode-switch button').nth(1).click();
    await page.screenshot({ path:path.join(root,`${brand}-${viewport.name}-advisor.png`) });
    for (let step=0; step<4; step+=1) {
      await page.locator('.choice-grid button').nth(step%4).click();
      await page.waitForTimeout(210);
    }
    await page.locator('.result-card').waitFor();
    await page.screenshot({ path:path.join(root,`${brand}-${viewport.name}-result.png`) });
    if (errors.length) throw new Error(`${brand} ${viewport.name}: ${errors.join(' | ')}`);
    await page.close();
    process.stdout.write(`${brand} ${viewport.name}\n`);
  }
}
await browser.close();
