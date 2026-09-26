// Tasting notes from a rendered wine page: sentences that describe aroma,
// taste or food pairing. node tools/wine_notes.mjs URL...
import { chromium } from '@playwright/test';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', proxy: process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY } : undefined });
for (const u of process.argv.slice(2)) {
  const p = await b.newPage({ viewport: { width: 1440, height: 1200 } });
  await p.goto(u, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
  await p.waitForTimeout(2500);
  const t = await p.evaluate(() => document.body.innerText.replace(/\s+/g, ' '));
  const sentences = t.split(/(?<=[.!?])\s+/).filter((s) => /(vůn|vôň|chu[tť]|buket|barv|farb|párov|hodí|k (?:ryb|mas|drůbe|sýr|dezert|jídl)|ideáln|dopor|tón|aroma|ovoc|kyselin|tělo|sud)/i.test(s) && s.length < 320);
  console.log('##', u.split('/').filter(Boolean).pop(), '\n  ', [...new Set(sentences)].slice(0, 6).join(' ').slice(0, 900));
  await p.close();
}
await b.close();
