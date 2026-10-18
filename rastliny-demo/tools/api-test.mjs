import assert from 'node:assert/strict';import {createHandler} from '../api/cosmetics-chat.js';import {BRANDS as INDEX} from '../catalog-index.mjs';import {getBrand} from '../catalogue-loader.mjs';import {catalogueReply} from '../advisor.mjs';
const BRANDS=Object.fromEntries(await Promise.all(Object.keys(INDEX).map(async slug=>[slug,await getBrand(slug)])));
const slug=Object.keys(BRANDS)[0],brand=BRANDS[slug];
async function call(handler,body,method='POST') {const res={headers:{},setHeader(k,v){this.headers[k]=v;},status(n){this.code=n;return this;},json(p){this.payload=p;return this;}};await handler({method,body},res);return res;}
const local=createHandler({apiKey:''});
assert.equal((await call(local,{},'GET')).code,405);assert.equal((await call(local,'{')).code,400);assert.equal((await call(local,{demoId:'wrong',messages:[]})).code,404);
assert.equal((await call(local,{demoId:slug,messages:[{role:'assistant',content:'Optimistic reply'}]})).code,400);
const req={demoId:slug,messages:[{role:'user',content:'Som začiatočník'}]};const result=await call(local,req);assert.equal(result.code,200);assert(result.payload.products.every(id=>brand.products.find(p=>p.id===id)?.tags.includes('easy')));
let captured;
const aiRequest={demoId:slug,messages:[{role:'user',content:'Čo odporúčate?'}]},allowed=(await call(local,aiRequest)).payload.products;
assert(allowed.length,'AI regression needs an eligible catalogue candidate');const chosen=brand.products.find(p=>p.id===allowed[0]);
// Claude answers in its own words; the cards stay the catalogue's and every price or link must come from the data.
const natural=`Ako prvé by som zvolil ${chosen.name} — ${chosen.price}\n${chosen.url}`;
const ai=createHandler({apiKey:'test-key',fetchImpl:async(url,init)=>{captured=JSON.parse(init.body);return{ok:true,json:async()=>({content:[{type:'text',text:natural}]})};}});
const answer=await call(ai,aiRequest);assert.equal(answer.payload.reply,natural);assert.equal(answer.payload.mode,'ai');assert(answer.payload.products.every(id=>brand.products.some(p=>p.id===id)));
assert.equal(captured.messages.at(-1).role,'user');assert(JSON.stringify(captured.system).includes(chosen.url));
const invented=createHandler({apiKey:'test-key',fetchImpl:async()=>({ok:true,json:async()=>({content:[{type:'text',text:'Odporúčam rastlinu za 9 999 € https://example.com/x'}]})})});
const rejected=await call(invented,aiRequest);assert.equal(rejected.payload.mode,'catalogue');assert(!rejected.payload.reply.includes('9 999'));
const failed=createHandler({apiKey:'test-key',fetchImpl:async()=>{throw new Error('provider down');}});assert.equal((await call(failed,{demoId:slug,messages:[{role:'user',content:'Čo odporúčate?'}]})).payload.mode,'catalogue');
for(const b of Object.values(BRANDS))for(const content of ['Mám mačku','Do 0 €','Rastline žltnú listy','Kedy príde objednávka?']){
 const r=await call(local,{demoId:b.slug,messages:[{role:'user',content}]});assert.equal(r.code,200);
 if(content.includes('mačku'))assert(r.payload.products.every(id=>b.products.find(p=>p.id===id)?.tags.includes('pet-safe')));
 if(content.includes('žltnú')||content.includes('objednávka'))assert.equal(r.payload.products.length,0);
 if(content==='Do 0 €')assert(r.payload.products.length<=1&&/nič vhodné|nic vhodn|ceny v Kč/.test(r.payload.reply),'nothing under 0 € may only point to the cheapest option');
}
const compound=await call(local,{demoId:slug,messages:[{role:'user',content:'Mám mačku, hľadám nenáročnú rastlinu do polotieňa do 15 €'}]});
assert(compound.payload.products.every(id=>{const p=brand.products.find(p=>p.id===id);return p.tags.includes('pet-safe')&&p.tags.includes('easy')&&p.tags.includes('low')&&(p.priceValue<=15||/nie je nič/.test(compound.payload.reply));}));
assert((await call(local,{demoId:slug,messages:[{role:'user',content:brand.products[0].name+' do 0 €'}]})).payload.products.length<=1,'over budget: at most the cheapest alternative');
assert.equal((await call(local,{demoId:slug,messages:[{role:'user',content:'Rastlina do úplnej tmy bez okna'}]})).payload.products.length,0);
const diffuse=await call(local,{demoId:slug,messages:[{role:'user',content:'Rastlina na rozptýlené svetlo bez priameho slnka pod 15 €'}]});
assert(diffuse.payload.products.every(id=>{const p=brand.products.find(p=>p.id===id);return p.tags.includes('bright')&&(p.priceValue<=15||/nie je nič/.test(diffuse.payload.reply));}));
for(const b of Object.values(BRANDS).filter(b=>b.kinds.includes('cacti'))){
 const unit=b.currency==='CZK'?'Kč':'€',eligible=p=>p.available!==false&&Number.isFinite(p.priceValue)&&p.priceValue<=200&&(!p.sourcePriceFrom||Number.isFinite(p.sourcePriceMax)&&p.sourcePriceMax<=200);
 const cactus=await call(local,{demoId:b.slug,messages:[{role:'user',content:'Porovnaj kaktusy do 200 '+unit}]});
 assert.equal(cactus.payload.products.length>0,b.products.some(p=>p.kind==='cacti'&&eligible(p)),b.slug+' cactus availability');
 assert(cactus.payload.products.every(id=>{const p=b.products.find(p=>p.id===id);return p.kind==='cacti'&&p.priceValue<=200;}));
 if(b.kinds.includes('succulents')){const succulent=await call(local,{demoId:b.slug,messages:[{role:'user',content:'Porovnaj sukulenty do 200 '+unit}]});
 assert.equal(succulent.payload.products.length>0,b.products.some(p=>p.kind==='succulents'&&eligible(p)),b.slug+' succulent availability');
 assert(succulent.payload.products.every(id=>b.products.find(p=>p.id===id)?.kind==='succulents'));}
 const namedCactus=b.products.find(p=>p.kind==='cacti');
 // A cactus named exactly is that cactus, never a different succulent.
 if(b.kinds.includes('succulents'))assert((await call(local,{demoId:b.slug,messages:[{role:'user',content:'Sukulent '+namedCactus.name}]})).payload.products.every(id=>id===namedCactus.id));
}
// A size stated in a plant name must not turn an exact product query into a pot request.
for(const b of Object.values(BRANDS)){
 const p=b.products.find(p=>p.available!==false&&p.kind!=='pots'&&/kv[eě]tin[aá]č|črepn[ií]k/i.test(p.name));if(!p)continue;
 const r=await call(local,{demoId:b.slug,messages:[{role:'user',content:p.name}]});
 assert(r.payload.products.includes(p.id),`exact named plant misclassified: ${b.slug} ${p.name}`);
 const limited=await call(local,{demoId:b.slug,messages:[{role:'user',content:p.name+' do 0 '+(b.currency==='CZK'?'Kč':'€')}]});
 assert(!limited.payload.products.includes(p.id)||/limit|skladem|skladom/.test(limited.payload.reply),'named product bypassed the budget');
}
console.log('PASS API: input validation, company scope, constraints, canonical AI cards, provider fallback');
