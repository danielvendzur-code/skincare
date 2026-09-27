#!/usr/bin/env bash
# Parse the brand config the way the page loads it and list product ids per brand.
cd "$(dirname "$0")/.." && node -e "
global.window={}; for (const s of Object.keys(require('vm'))) {}
const fs=require('fs'), vm=require('vm');
const ctx={window:{},location:{pathname:'/',search:'',hostname:'x',replace(){}},URLSearchParams};
vm.createContext(ctx); vm.runInContext(fs.readFileSync('cosmetics-config.js','utf8'),ctx);
const src=fs.readFileSync('nove-znacky-config.js','utf8').replace('if (!hair[slug])','if (false)');
vm.runInContext(src,ctx);
const b=ctx.window.COSMETICS_DEMOS.brands; const hair=Object.keys(b).filter(k=>/nove-znacky/.test('nove-znacky')&&b[k].mark);
for (const k of hair) console.log(k.padEnd(10), b[k].products.map(p=>p.id).join(' '));"
