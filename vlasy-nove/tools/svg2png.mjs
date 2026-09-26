// Render an SVG logo to a transparent PNG at a given height:
// node tools/svg2png.mjs URL_OR_FILE OUT.png [height]
// A local file is opened from its own folder (a file:// image inside
// setContent's about:blank page is blocked).
import { chromium } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
const [src, out, height = '220'] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', proxy: process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY } : undefined });
const p = await b.newPage({ viewport: { width: 4000, height: 1200 } });
const page = `<html><body style="margin:0;background:transparent"><img id="l" src="${fs.existsSync(src) ? path.basename(src) : src}" style="height:${height}px;width:auto;display:block"></body></html>`;
if (fs.existsSync(src)) {
  const html = path.join(path.dirname(path.resolve(src)), '.svg2png.html');
  fs.writeFileSync(html, page); await p.goto('file://' + html);
} else await p.setContent(page);
await p.waitForFunction(() => document.getElementById('l').complete);
await p.locator('#l').screenshot({ path: out, omitBackground: true });
await b.close();
