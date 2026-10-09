// Every major state at desktop, 390px and 360px; every category completes.
import {chromium} from '@playwright/test';import fs from 'node:fs/promises';
import {BRANDS} from '../catalog-data.mjs';
const[slug,out=`qa-raw/${slug}`,base='http://127.0.0.1:8797']=process.argv.slice(2);const brand=BRANDS[slug];
if(!brand)throw new Error('Unknown demo '+slug);await fs.mkdir(out,{recursive:true});const problems=[];
const browser=await chromium.launch({executablePath:process.env.CHROMIUM||'/opt/pw-browsers/chromium',headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
const check=(condition,message)=>{if(!condition)problems.push(message);};
const luminance=hex=>{const rgb=hex.match(/[a-f\d]{2}/gi).map(x=>parseInt(x,16)/255).map(c=>c<=.04045?c/12.92:((c+.055)/1.055)**2.4);return rgb[0]*.2126+rgb[1]*.7152+rgb[2]*.0722;};
check(1.05/(luminance(brand.theme.accent)+.05)>=4.5,'accent contrast under 4.5');
check(1.05/(luminance(brand.theme.brand)+.05)>=4.5,'brand contrast under 4.5');
for(const vp of[{n:'desktop',width:1440,height:900},{n:'mobile',width:390,height:844},{n:'small',width:360,height:800}]){
 const page=await browser.newPage({viewport:{width:vp.width,height:vp.height},deviceScaleFactor:1});
 page.on('pageerror',e=>problems.push(vp.n+' '+e.message));page.on('response',r=>{if(r.status()>=400)problems.push(`${vp.n} HTTP ${r.status()} ${r.url()}`);});
 const shot=name=>page.screenshot({path:`${out}/${slug}-${vp.n}-${name}.png`});
 const images=async()=>{const bad=await page.locator('#cosmetics-root img').evaluateAll(ims=>ims.filter(i=>getComputedStyle(i).visibility!=='hidden').filter(i=>!i.complete||i.naturalWidth<2).map(i=>i.src));check(!bad.length,`${vp.n} images ${bad}`);};
 const overflow=async state=>check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${vp.n} ${state} overflow`);
 await page.goto(`${base}/cosmetics.html?demo=${slug}`,{waitUntil:'networkidle'});await page.waitForTimeout(300);
 check(await page.evaluate(()=>document.body.dataset.cosmeticsDemo)===slug,'wrong company');await images();await overflow('owner');await shot('1-owner');
 const cut=await page.locator('.cx-owner-actions').evaluate(el=>{const r=el.getBoundingClientRect();return r.bottom>innerHeight||r.left<0||r.right>innerWidth;});check(!cut,`${vp.n} owner CTA clipped`);
 const priceFits=await page.locator('.cx-price-terms>a').evaluate(e=>e.getBoundingClientRect().bottom<=innerHeight-15);check(priceFits,`${vp.n} price CTA clipped`);
 await page.locator('[data-cx-offer="open"]').click();await page.waitForTimeout(150);await shot('2-offer');
 for(const href of await page.locator('a[href*="mojchatbot.sk/kontakt"]').evaluateAll(a=>a.map(x=>x.href))){const q=new URL(href).searchParams;check(q.get('source')===`rastliny-demo-${slug}`&&q.get('company')===brand.name&&q.get('web')===brand.website&&q.get('demo'),`${vp.n} contact context`);}
 await page.locator('[data-cx-offer="close"]').click();await page.locator('[data-open="chat"]').click();await page.waitForTimeout(250);await shot('3-chat');
 await page.locator('.cx-chip').first().click();await page.waitForFunction(()=>!document.querySelector('#cx-form button').disabled);await page.waitForTimeout(150);await images();await shot('4-chat-answer');
 const reply=await page.locator('.cx-message--assistant .cx-bubble').last().textContent();check(brand.products.some(p=>reply.includes(p.name)),`${vp.n} chip no real product`);
 const avatar=await page.locator('.cx-message--assistant').count();check(await page.locator('.cx-message--assistant .cx-message-avatar img').count()===avatar,`${vp.n} missing bot logo`);
 await page.locator('[data-mode="advisor"]').click();await page.waitForTimeout(750);
 for(let step=0;step<4;step++){
  await images();const cards=page.locator('.cx-option');check(await cards.count()>=2,`${vp.n} missing choices`);
  const scroll=await page.locator('.cx-advisor-body').evaluate(el=>el.scrollHeight-el.clientHeight);check(scroll<=2,`${vp.n} step ${step+1} scroll ${scroll}`);
  const visible=await page.locator('.cx-option-photo img').evaluateAll(ims=>ims.every(i=>getComputedStyle(i).opacity==='1'&&getComputedStyle(i).visibility==='visible'&&i.getBoundingClientRect().height>50));check(visible,`${vp.n} invisible option photos`);
  const settled=await cards.evaluateAll(nodes=>nodes.every(n=>Number(getComputedStyle(n).opacity)>.99));check(settled,`${vp.n} option animation unfinished`);
  await shot(`5-step${step+1}`);const old=await page.locator('.cx-progress>b').textContent();await cards.first().click();await page.waitForFunction(t=>document.querySelector('.cx-progress>b')?.textContent!==t,old);await page.waitForTimeout(750);
 }
 await images();await overflow('result');await shot('6-result');
 const title=await page.locator('.cx-product-copy h2').textContent();const product=brand.products.find(p=>p.name===title);check(product,`${vp.n} invalid result`);
 check(await page.locator('.cx-product-price a').getAttribute('href')===product?.url,`${vp.n} wrong URL`);
 check((await page.locator('.cx-product-price strong').textContent()).trim()===product?.price,`${vp.n} wrong price`);
 // Back preserves the branch, restart clears it, every other branch finishes.
 await page.locator('#cx-result-back').click();check((await page.locator('.cx-progress>b').textContent())==='4/4',`${vp.n} back`);
 await page.locator('.cx-option').last().click();await page.waitForSelector('#cx-restart');await page.locator('#cx-restart').click();
 if(vp.n==='desktop')for(const kind of brand.kinds.slice(1)){
  await page.locator(`.cx-option[data-value="${kind}"]`).click();await page.waitForTimeout(600);
  for(let step=1;step<4;step++){await page.locator('.cx-option').last().click();await page.waitForTimeout(600);}
  const t=await page.locator('.cx-product-copy h2').textContent();check(brand.products.find(p=>p.name===t)?.kind===kind,`category leaked ${kind}`);await shot(`7-${kind}-result`);await page.locator('#cx-restart').click();
 }
 await page.keyboard.press('Escape');check(await page.locator('#cx-widget').getAttribute('aria-hidden')==='true',`${vp.n} escape`);await page.close();
}
await browser.close();const result={slug,status:problems.length?'FAIL':'PASS',problems:[...new Set(problems)],viewports:[1440,390,360],categories:brand.kinds,checked:'2026-10-09'};
await fs.writeFile(`${out}/report.json`,JSON.stringify(result,null,2)+'\n');
console.log(`${result.status} ${slug}`+(problems.length?'\n'+result.problems.join('\n'):''));process.exitCode=problems.length?1:0;
