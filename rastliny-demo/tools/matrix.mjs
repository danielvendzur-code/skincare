// Exhaustive walk of the adaptive advisor: every path ends in matching products,
// every product reachable. The UI paginates long option lists into four cards;
// list length is not the number of cards displayed at once.
import {BRANDS} from '../catalog-data.mjs';
import {questionsFor,rankProducts,complete,matches,tagsOf} from '../advisor.mjs';
let fail=0,paths=0,maxOpt=0,maxSteps=0;const want=process.argv[2];
for(const [slug,brand] of Object.entries(BRANDS)){
  const reached=new Set();
  const walk=(answers,depth,trace)=>{
    if(depth>7){fail++;console.log('DEEP',slug);return}
    if(complete(brand,answers)){paths++;maxSteps=Math.max(maxSteps,depth);const r=rankProducts(brand,answers);if(!r.length){fail++;console.log('EMPTY',slug,JSON.stringify(answers));return}
      r.forEach(p=>reached.add(p.id));for(const p of r){if(!matches(p,answers))fail++;if(answers.budget&&answers.budget!=='any'&&p.priceValue>Number(answers.budget))fail++}
      if(slug===want)console.log(trace.join(' > '),'=>',r[0].name,r[0].price,'('+r.length+')');return}
    const q=questionsFor(brand,answers)[depth];if(!q){fail++;console.log('NOQ',slug,JSON.stringify(answers));return}
    maxOpt=Math.max(maxOpt,q.options.length);if(q.options.length<2){fail++;console.log('OPTS',slug,q.key,q.options.length)}
    if(q.options.some(o=>!o.image)){fail++;console.log('NOIMG',slug,q.key)}
    for(const o of q.options)walk({...answers,[q.key]:o.value},depth+1,[...trace,q.key+'='+o.title]);
  };
  walk({},0,[]);
  const miss=brand.products.filter(p=>!reached.has(p.id)).length;if(miss){fail++;console.log('UNREACHABLE',slug,miss)}
}
console.log(JSON.stringify({brands:Object.keys(BRANDS).length,paths,maxOpt,maxSteps,fail}));

if(fail)process.exit(1);
