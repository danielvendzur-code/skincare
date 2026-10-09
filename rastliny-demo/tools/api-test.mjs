import assert from 'node:assert/strict';import {createHandler} from '../api/cosmetics-chat.js';import {BRANDS} from '../catalog-data.mjs';
const slug=Object.keys(BRANDS)[0],brand=BRANDS[slug];
async function call(handler,body,method='POST') {const res={headers:{},setHeader(k,v){this.headers[k]=v;},status(n){this.code=n;return this;},json(p){this.payload=p;return this;}};await handler({method,body},res);return res;}
const local=createHandler({apiKey:''});
assert.equal((await call(local,{},'GET')).code,405);assert.equal((await call(local,'{')).code,400);assert.equal((await call(local,{demoId:'wrong',messages:[]})).code,404);
assert.equal((await call(local,{demoId:slug,messages:[{role:'assistant',content:'Optimistic reply'}]})).code,400);
const req={demoId:slug,messages:[{role:'user',content:'Som začiatočník'}]};const result=await call(local,req);assert.equal(result.code,200);assert(result.payload.products.every(id=>brand.products.find(p=>p.id===id)?.tags.includes('easy')));
let captured;
const ai=createHandler({apiKey:'test-key',fetchImpl:async(url,init)=>{captured=JSON.parse(init.body);return{ok:true,json:async()=>({content:[{type:'text',text:JSON.stringify({productIds:[brand.products[0].id,'FAKE',brand.products[0].id]})}]})};}});
const selection=await call(ai,{demoId:slug,messages:[{role:'user',content:'Zaujíma ma tento konkrétny druh, pomôžete mi vybrať?'}]});assert.deepEqual(selection.payload.products,[brand.products[0].id]);assert(selection.payload.reply.includes(brand.products[0].price));assert.equal(captured.messages.at(-1).role,'user');assert(!JSON.stringify(captured).includes('imageSource'));
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
console.log('PASS API: input validation, company scope, constraints, canonical AI cards, provider fallback');
