import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('artifacts/screenshots');
const baseURL = process.env.QA_BASE_URL ?? 'http://127.0.0.1:4173';
const viewports = [
  { name:'desktop', width:1440, height:900 },
  { name:'mobile', width:390, height:844 },
  { name:'mobile360', width:360, height:800 }
];

await fs.mkdir(root, { recursive:true });
const browser = await chromium.launch({ channel:process.env.PLAYWRIGHT_CHANNEL || undefined, headless:true });

for (const viewport of viewports) {
  const page = await browser.newPage({ viewport:{ width:viewport.width, height:viewport.height }, deviceScaleFactor:1 });
  const errors = [];
  page.on('console', (message) => { if (message.type() === 'error') errors.push(`${message.text()} ${message.location().url}`.trim()); });
  page.on('pageerror', (error) => errors.push(error.message));

  await page.goto(`${baseURL}/ukazka/bellcoria`, { waitUntil:'networkidle' });
  await page.screenshot({ path:path.join(root, `bellcoria-${viewport.name}-owner.png`) });

  await page.getByRole('button', { name:/Otvoriť poradcu BELLCORIA/i }).click();
  await page.waitForTimeout(120);
  await page.screenshot({ path:path.join(root, `bellcoria-${viewport.name}-chat.png`) });

  await page.getByRole('tab', { name:/Výber starostlivosti/i }).click();
  await page.screenshot({ path:path.join(root, `bellcoria-${viewport.name}-advisor.png`) });

  for (const pick of [0, 2, 1, 2]) {
    await page.locator('.choice-grid button').nth(pick).click();
    await page.waitForTimeout(210);
  }
  await page.locator('.result-card').waitFor();
  await page.screenshot({ path:path.join(root, `bellcoria-${viewport.name}-result.png`) });

  if (errors.length) throw new Error(`bellcoria ${viewport.name}: ${errors.join(' | ')}`);
  await page.close();
  process.stdout.write(`bellcoria ${viewport.name}\n`);
}

await browser.close();
