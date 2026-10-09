import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {BRANDS} from '../catalog-data.mjs';
import {questionsFor,rankProducts,matches,catalogueReply} from '../advisor.mjs';
const slugs=process.argv.slice(2).length?process.argv.slice(2):Object.keys(BRANDS);const results={};
for(const slug of slugs){
 const brand=BRANDS[slug];assert(brand,slug);let combinations=0;const winners={},byKind={};
 function visit(answers={},step=0){
  if(step===4){
   const ranked=rankProducts(brand,answers);assert(ranked.length,`${slug} empty ${JSON.stringify(answers)}`);
   assert(ranked.every(p=>matches(p,answers)),`${slug} constraint failure`);
   assert(new Set(ranked.map(p=>p.id)).size===ranked.length,'duplicate alternatives');
   assert.deepEqual(rankProducts(brand,answers).map(p=>p.id),ranked.map(p=>p.id),'unstable ranking');
   combinations++;const p=ranked[0];winners[p.id]=(winners[p.id]||0)+1;byKind[p.kind]=(byKind[p.kind]||0)+1;return;
  }
  const question=questionsFor(brand,answers)[step];assert(question.options.length>=2&&question.options.length<=4,'invalid choices');
  assert(new Set(question.options.map(o=>o.value)).size===question.options.length,'duplicate choices');
  for(const o of question.options){assert(o.image,'option missing photo');visit({...answers,[question.key]:o.value},step+1);}
 }
 visit();
 // Adversarial inputs must not trigger an incompatible fallback.
 assert.equal(rankProducts(brand,{kind:'plants',facet:'unknown-tag'}).length,0);
 assert.equal(rankProducts(brand,{budget:'0'}).length,0);
 const pet=catalogueReply(brand,[{role:'user',content:'Mám mačku, chcem bezpečnú rastlinu.'}]);
 assert(pet.products.every(id=>brand.products.find(p=>p.id===id)?.tags.includes('pet-safe')),'unsafe pet fallback');
 assert.equal(catalogueReply(brand,[{role:'user',content:'Rastline žltnú listy, akú kúpiť?'}]).products.length,0);
 assert.equal(catalogueReply(brand,[{role:'user',content:'Kedy príde objednávka?'}]).products.length,0);
 results[slug]={combinations,empty:0,constraintFailures:0,uniqueWinners:Object.keys(winners).length,winners,byKind};
 console.log(`PASS ${slug}: ${combinations} combinations, ${Object.keys(winners).length} different winners`);
}
await fs.mkdir('qa-review',{recursive:true});await fs.writeFile('qa-review/matrix.json',JSON.stringify(results,null,2)+'\n');
