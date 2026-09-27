// Render an SVG logo to a transparent PNG at a given height:
// node tools/svg2png.mjs URL_OR_FILE OUT.png [height]
import { chromium } from '@playwright/test';
const [src, out, height = '220'] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', proxy: process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY } : undefined });
const p = await b.newPage({ viewport: { width: 1600, height: 800 } });
await p.setContent(`<html><body style="margin:0;background:transparent"><img id="l" src="${src}" style="height:${height}px;width:auto;display:block"></body></html>`);
await p.waitForFunction(() => document.getElementById('l').complete);
await p.locator('#l').screenshot({ path: out, omitBackground: true });
await b.close();
