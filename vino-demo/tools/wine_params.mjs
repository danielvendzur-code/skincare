// Wine detail facts from a rendered product page: sweetness, volume, alcohol,
// pairing hints and whether it can be bought. node tools/wine_params.mjs URL...
import { chromium } from '@playwright/test';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', proxy: process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY } : undefined });
for (const u of process.argv.slice(2)) {
  const p = await b.newPage({ viewport: { width: 1440, height: 1200 } });
  await p.goto(u, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
  await p.waitForTimeout(2500);
  const t = await p.evaluate(() => document.body.innerText.replace(/\s+/g, ' '));
  const pick = (re) => [...new Set((t.match(re) || []).map((x) => x.trim().toLowerCase()))].slice(0, 4).join(', ');
  console.log(u.split('/').filter(Boolean).pop(), '|',
    pick(/(?<!\p{L})(suché|polosuché|polosladké|sladké|suchá|polosuchá|polosladká|sladká|suchý|polosuchý|polosladký|sladký|brut nature|extra brut|brut|extra dry|demi[- ]sec)(?!\p{L})/giu), '|',
    pick(/\b0[,.]\d{1,2}\s?l\b|\b\d{3}\s?ml\b/gi), '|',
    pick(/(hodí se|párování|doporuč\w*|ideáln\w*|k (?:rybám|masu|drůbeži|sýrům|dezertům|grilovan\w*)|ku? (?:rybe|mäsu|syrom|hydine))[^.]{0,70}/gi), '|',
    pick(/(skladem|vyprodáno|není skladem|na sklade|vypredané|do košíku|do košíka|přidat do košíku|pridať do košíka)/gi));
  await p.close();
}
await b.close();
