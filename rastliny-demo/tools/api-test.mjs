import assert from 'node:assert/strict';import {createHandler} from '../api/cosmetics-chat.js';import {BRANDS as INDEX} from '../catalog-index.mjs';import {getBrand} from '../catalogue-loader.mjs';import {catalogueReply} from '../advisor.mjs';
const BRANDS=Object.fromEntries(await Promise.all(Object.keys(INDEX).map(async slug=>[slug,await getBrand(slug)])));
const slug=Object.keys(BRANDS)[0],brand=BRANDS[slug];
async function call(handler,body,method='POST') {const res={headers:{},setHeader(k,v){this.headers[k]=v;},status(n){this.code=n;return this;},json(p){this.payload=p;return this;}};await handler({method,body},res);return res;}
const local=createHandler({apiKey:''});
assert.equal((await call(local,{},'GET')).code,405);assert.equal((await call(local,'{')).code,400);assert.equal((await call(local,{demoId:'wrong',messages:[]})).code,404);
assert.equal((await call(local,{demoId:slug,messages:[{role:'assistant',content:'Optimistic reply'}]})).code,400);
const req={demoId:slug,messages:[{role:'user',content:'Som začiatočník'}]};const result=await call(local,req);assert.equal(result.code,200);assert(result.payload.products.every(id=>brand.products.find(p=>p.id===id)?.tags.includes('easy')));
let captured;
const aiRequest={demoId:slug,messages:[{role:'user',content:'Čo odporúčate?'}]},allowed=catalogueReply(brand,aiRequest.messages).products;
assert(allowed.length,'AI regression needs an eligible catalogue candidate');const chosen=brand.products.find(p=>p.id===allowed[0]);
const ai=createHandler({apiKey:'test-key',fetchImpl:async(url,init)=>{captured=JSON.parse(init.body);return{ok:true,json:async()=>({content:[{type:'text',text:JSON.stringify({productIds:[chosen.id,'FAKE',chosen.id]})}]})};}});
const selection=await call(ai,aiRequest);assert.deepEqual(selection.payload.products,[chosen.id]);assert(selection.payload.reply.includes(chosen.price));assert.equal(captured.messages.at(-1).role,'user');assert(!JSON.stringify(captured).includes('imageSource'));
const injected=createHandler({apiKey:'test-key',fetchImpl:async()=>({ok:true,json:async()=>({content:[{type:'text',text:JSON.stringify({productIds:['FAKE',brand.products.find(p=>!allowed.includes(p.id))?.id]})}]})})});
const rejected=await call(injected,aiRequest);assert.deepEqual(rejected.payload.products,allowed);assert.equal(rejected.payload.mode,'catalogue');
const failed=createHandler({apiKey:'test-key',fetchImpl:async()=>{throw new Error('provider down');}});assert.equal((await call(failed,{demoId:slug,messages:[{role:'user',content:'Čo odporúčate?'}]})).payload.mode,'catalogue');
for(const b of Object.values(BRANDS))for(const content of ['Mám mačku','Do 0 €','Rastline žltnú listy','Kedy príde objednávka?']){
 const r=await call(local,{demoId:b.slug,messages:[{role:'user',content}]});assert.equal(r.code,200);
 if(content.includes('mačku'))assert(r.payload.products.every(id=>b.products.find(p=>p.id===id)?.tags.includes('pet-safe')));
 if(content.includes('žltnú')||content.includes('objednávka')||content==='Do 0 €')assert.equal(r.payload.products.length,0);
}
const compound=await call(local,{demoId:slug,messages:[{role:'user',content:'Mám mačku, hľadám nenáročnú rastlinu do polotieňa do 15 €'}]});
assert(compound.payload.products.every(id=>{const p=brand.products.find(p=>p.id===id);return p.tags.includes('pet-safe')&&p.tags.includes('easy')&&p.tags.includes('low')&&p.priceValue<=15;}));
assert.equal((await call(local,{demoId:slug,messages:[{role:'user',content:brand.products[0].name+' do 0 €'}]})).payload.products.length,0);
assert.equal((await call(local,{demoId:slug,messages:[{role:'user',content:'Rastlina do úplnej tmy bez okna'}]})).payload.products.length,0);
const diffuse=await call(local,{demoId:slug,messages:[{role:'user',content:'Rastlina na rozptýlené svetlo bez priameho slnka pod 15 €'}]});
assert(diffuse.payload.products.every(id=>{const p=brand.products.find(p=>p.id===id);return p.tags.includes('bright')&&p.priceValue<=15;}));
for(const b of Object.values(BRANDS).filter(b=>b.kinds.includes('cacti'))){
 const unit=b.currency==='CZK'?'Kč':'€',eligible=p=>p.available!==false&&Number.isFinite(p.priceValue)&&p.priceValue<=200&&(!p.sourcePriceFrom||Number.isFinite(p.sourcePriceMax)&&p.sourcePriceMax<=200);
 const cactus=await call(local,{demoId:b.slug,messages:[{role:'user',content:'Porovnaj kaktusy do 200 '+unit}]});
 assert.equal(cactus.payload.products.length>0,b.products.some(p=>p.kind==='cacti'&&eligible(p)),b.slug+' cactus availability');
 assert(cactus.payload.products.every(id=>{const p=b.products.find(p=>p.id===id);return p.kind==='cacti'&&p.priceValue<=200;}));
 if(b.kinds.includes('succulents')){const succulent=await call(local,{demoId:b.slug,messages:[{role:'user',content:'Porovnaj sukulenty do 200 '+unit}]});
 assert.equal(succulent.payload.products.length>0,b.products.some(p=>p.kind==='succulents'&&eligible(p)),b.slug+' succulent availability');
 assert(succulent.payload.products.every(id=>b.products.find(p=>p.id===id)?.kind==='succulents'));}
 const namedCactus=b.products.find(p=>p.kind==='cacti');
 if(b.kinds.includes('succulents'))assert.equal((await call(local,{demoId:b.slug,messages:[{role:'user',content:'Sukulent '+namedCactus.name}]})).payload.products.length,0);
}
// A size stated in a plant name must not turn an exact product query into a pot request.
for(const b of Object.values(BRANDS)){
 const p=b.products.find(p=>p.available!==false&&p.kind!=='pots'&&/kv[eě]tin[aá]č|črepn[ií]k/i.test(p.name));if(!p)continue;
 const r=await call(local,{demoId:b.slug,messages:[{role:'user',content:p.name}]});
 assert(r.payload.products.includes(p.id),`exact named plant misclassified: ${b.slug} ${p.name}`);
 const limited=await call(local,{demoId:b.slug,messages:[{role:'user',content:p.name+' do 0 '+(b.currency==='CZK'?'Kč':'€')}]});
 assert.equal(limited.payload.products.length,0,'named product bypassed the budget');
}
console.log('PASS API: input validation, company scope, constraints, canonical AI cards, provider fallback');
