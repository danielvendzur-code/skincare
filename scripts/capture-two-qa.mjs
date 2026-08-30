import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = path.resolve('artifacts/screenshots');
const baseURL = process.env.QA_BASE_URL ?? 'http://127.0.0.1:4173';
const viewports = [
  { name:'desktop-1440x900', width:1440, height:900 },
  { name:'mobile-390x844', width:390, height:844 },
  { name:'mobile-360x800', width:360, height:800 }
];
const states = ['storefront','chat','advisor','result'];

await fs.mkdir(root, { recursive:true });
const browser = await chromium.launch({ headless:true });

for (const viewport of viewports) {
  const page = await browser.newPage({ viewport:{ width:viewport.width, height:viewport.height }, deviceScaleFactor:1 });
  const errors = [];
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
  page.on('pageerror', (error) => errors.push(error.message));

  await page.goto(`${baseURL}/ukazka/two`, { waitUntil:'networkidle' });
  await page.screenshot({ path:path.join(root, `two-${viewport.name}-${states[0]}.png`), fullPage:true });

  await page.getByRole('button', { name:'Poradiť s výberom' }).click();
  await page.screenshot({ path:path.join(root, `two-${viewport.name}-${states[1]}.png`) });

  await page.locator('.mode-switch button').nth(1).click();
  await page.screenshot({ path:path.join(root, `two-${viewport.name}-${states[2]}.png`) });

  for (const value of ['serum','hydration','gel','both']) {
    await page.locator(`.choice-grid button[data-value="${value}"]`).click();
    await page.waitForTimeout(170);
  }
  await page.locator('.result-card').waitFor();
  await page.screenshot({ path:path.join(root, `two-${viewport.name}-${states[3]}.png`) });

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  if (overflow > 0) errors.push(`horizontal overflow: ${overflow}px`);
  if (errors.length) throw new Error(`${viewport.name}: ${errors.join(' | ')}`);
  await page.close();
}

const boardPath = path.join(root, 'two-qa-board.html');
const boardHtml = `<!doctype html>
<meta charset="utf-8">
<title>TWO COSMETICS visual QA board</title>
<style>
  *{box-sizing:border-box}body{margin:0;background:#11110f;color:#f8f5ed;font:14px/1.4 Arial,sans-serif;padding:28px}h1{margin:0 0 6px;font:900 30px/1 Arial Black,Arial,sans-serif;letter-spacing:-.04em}p{margin:0 0 24px;color:#aaa59a}.grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}.tile{min-width:0;background:#1d1d19;border:1px solid #36352f;padding:10px}.tile img{display:block;width:100%;height:310px;object-fit:contain;background:#f4f0e8}.tile b{display:block;margin-bottom:8px;font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:#f0ebe0}
</style>
<h1>TWO COSMETICS — visual QA</h1>
<p>1440×900 · 390×844 · 360×800 · storefront / chat / advisor / result</p>
<div class="grid">${viewports.flatMap((viewport) => states.map((state) => `<div class="tile"><b>${viewport.name} / ${state}</b><img src="two-${viewport.name}-${state}.png" alt="${viewport.name} ${state}"></div>`)).join('')}</div>`;
await fs.writeFile(boardPath, boardHtml);

const boardPage = await browser.newPage({ viewport:{ width:1900, height:1300 }, deviceScaleFactor:1 });
await boardPage.goto(pathToFileURL(boardPath).href, { waitUntil:'load' });
await boardPage.screenshot({ path:path.join(root, 'two-qa-board.png'), fullPage:true });
await boardPage.close();
await browser.close();

process.stdout.write('TWO screenshots and PNG QA board created.\n');
