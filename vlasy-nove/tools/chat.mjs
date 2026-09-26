// Offline chat answers of one demo for typical hair questions:
// node tools/chat.mjs SLUG [BASE]
import { chromium } from '@playwright/test';
const [slug, base = 'http://127.0.0.1:8790'] = process.argv.slice(2);
const questions = ['Mám suché vlasy', 'Vlasy sa mi rýchlo mastia', 'Svrbí ma pokožka hlavy a mám lupiny',
  'Vypadávajú mi vlasy', 'Mám jemné vlasy bez objemu', 'Mám poškodené farbené vlasy', 'Koľko to stojí?'];
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
for (const q of questions) {
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto(`${base}/cosmetics.html?demo=${slug}`, { waitUntil: 'networkidle' });
  await p.locator('#cx-open').click(); await p.waitForTimeout(500);
  await p.fill('#cx-input', q); await p.press('#cx-input', 'Enter'); await p.waitForTimeout(900);
  console.log(`> ${q}\n  ${await p.locator('.cx-message--assistant .cx-bubble').last().textContent()}`);
  await p.close();
}
await b.close();
