import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';
import path from 'node:path';

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
  await page.getByRole('button', { name:'Otvoriť Chat' }).click();
  await page.screenshot({ path:path.join(root, `two-${viewport.name}-${states[1]}.png`) });
  await page.locator('.mode-switch button').nth(1).click();
  await page.screenshot({ path:path.join(root, `two-${viewport.name}-${states[2]}.png`) });
  for (const value of ['serum','hydration','gel','both']) {
    await page.locator(`.choice-grid button[data-value="${value}"]`).click();
    await page.waitForTimeout(170);
  }
  await page.locator('.result-card').waitFor();
  await page.screenshot({ path:path.join(root, `two-${viewport.name}-${states[3]}.png`) });
  if (errors.length) throw new Error(`${viewport.name}: ${errors.join(' | ')}`);
  await page.close();
}
await browser.close();

const html = `<!doctype html><meta charset="utf-8"><title>TWO visual QA board</title><style>body{margin:0;background:#111;color:#fff;font:14px system-ui;padding:24px}h1{margin:0 0 20px}.grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}.tile{background:#222;padding:10px}.tile img{display:block;width:100%;height:300px;object-fit:contain;background:#eee}.tile b{display:block;margin-bottom:8px}@media(max-width:900px){.grid{grid-template-columns:1fr}}</style><h1>TWO COSMETICS — QA board</h1><div class="grid">${viewports.flatMap((viewport) => states.map((state) => `<div class="tile"><b>${viewport.name} / ${state}</b><img src="two-${viewport.name}-${state}.png"></div>`)).join('')}</div>`;
await fs.writeFile(path.join(root, 'two-qa-board.html'), html);
process.stdout.write('TWO screenshots and QA board created.\n');
