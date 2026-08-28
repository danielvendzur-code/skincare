import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('artifacts/screenshots/ponio');
const baseURL = process.env.QA_BASE_URL ?? 'http://127.0.0.1:4173';
const viewports = [
  { name: 'desktop-1440x900', width: 1440, height: 900 },
  { name: 'mobile-390x844', width: 390, height: 844 },
  { name: 'mobile-360x800', width: 360, height: 800 },
];

await fs.mkdir(root, { recursive: true });
const requestedChannel = process.env.QA_BROWSER_CHANNEL?.trim();
const browser = await chromium.launch({ ...(requestedChannel ? { channel: requestedChannel } : {}), headless: true });
const captures = [];

async function assertNoErrors(page, errors, viewport, state) {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  if (overflow > 0) throw new Error(`${viewport.name} ${state}: horizontal overflow ${overflow}px`);
  if (errors.length) throw new Error(`${viewport.name} ${state}: ${errors.join(' | ')}`);
}

async function shot(page, viewport, state, errors) {
  await assertNoErrors(page, errors, viewport, state);
  const filename = `${viewport.name}-${state}.png`;
  await page.screenshot({ path: path.join(root, filename), fullPage: false });
  captures.push({ viewport: viewport.name, state, filename });
}

for (const viewport of viewports) {
  const page = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height }, deviceScaleFactor: 1 });
  const errors = [];
  page.on('console', (message) => { if (message.type() === 'error') errors.push(`${message.text()} ${message.location().url}`.trim()); });
  page.on('pageerror', (error) => errors.push(error.message));

  await page.goto(`${baseURL}/ukazka/ponio`, { waitUntil: 'networkidle' });
  await page.locator('.ponio-site-header').waitFor();
  await shot(page, viewport, 'storefront', errors);

  await page.getByRole('button', { name: /Opýtať sa v Chate/i }).click();
  await page.getByRole('dialog', { name: /PONIO/i }).waitFor();
  await shot(page, viewport, 'chat', errors);

  await page.getByRole('tab', { name: /Výber starostlivosti/i }).click();
  await page.locator('.ponio-advisor.is-active').waitFor();
  const noAdvisorScroll = await page.locator('.ponio-advisor.is-active').evaluate((node) => node.scrollHeight <= node.clientHeight + 1);
  if (!noAdvisorScroll) throw new Error(`${viewport.name} advisor: unexpected internal scroll`);
  await shot(page, viewport, 'advisor', errors);

  const choose = async (label) => {
    await page.locator('.ponio-advisor.is-active .ponio-choice-grid').getByRole('button', { name: new RegExp(label, 'i') }).first().click();
  };
  await choose('^Pleť');
  await choose('Denná ochrana');
  await choose('Denný krém');
  await choose('^Ráno');
  await page.locator('.ponio-result.is-active').waitFor();
  await shot(page, viewport, 'result', errors);

  await page.getByRole('button', { name: /Zavrieť poradcu/i }).click();
  await page.close();
  process.stdout.write(`${viewport.name}: storefront, chat, advisor, result\n`);
}

await browser.close();

const cells = captures.map(({ viewport, state, filename }) => `
      <figure>
        <img src="screenshots/ponio/${filename}" alt="PONIO ${viewport} ${state}">
        <figcaption><strong>${viewport}</strong><span>${state}</span></figcaption>
      </figure>`).join('');

const board = `<!doctype html>
<html lang="sk">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>PONIO Káva parity QA board</title>
<style>
*{box-sizing:border-box}body{margin:0;background:#111;color:#f6f6f2;font:14px/1.45 Inter,system-ui,sans-serif}.board{width:min(1800px,calc(100% - 40px));margin:0 auto;padding:34px 0 70px}.head{display:flex;justify-content:space-between;gap:24px;align-items:end;border-bottom:1px solid #343434;padding-bottom:20px;margin-bottom:24px}.head h1{font-size:28px;margin:0;letter-spacing:-.04em}.head p{margin:0;color:#aaa}.grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px}figure{margin:0;background:#1a1a1a;border:1px solid #323232;padding:10px}img{width:100%;height:auto;display:block;background:#fff}figcaption{padding:9px 2px 0;display:flex;justify-content:space-between;gap:10px;font-size:11px}figcaption span{color:#aaa;text-transform:uppercase;letter-spacing:.08em}@media(max-width:900px){.grid{grid-template-columns:1fr}.head{align-items:start;flex-direction:column}}
</style>
</head>
<body><main class="board"><header class="head"><div><h1>PONIO · Káva parity QA board</h1><p>Storefront · Chat · Výber · výsledok</p></div><p>1440×900 · 390×844 · 360×800</p></header><section class="grid">${cells}</section></main></body></html>`;

await fs.writeFile(path.resolve('artifacts/PONIO_QA_BOARD.html'), board, 'utf8');
process.stdout.write('artifacts/PONIO_QA_BOARD.html\n');
