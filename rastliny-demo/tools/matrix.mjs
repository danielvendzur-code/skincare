// Exhaustive walk of the adaptive advisor: every path ends in matching products,
// every product reachable. The UI paginates long option lists into four cards;
// list length is not the number of cards displayed at once.
import {BRANDS as INDEX} from '../catalog-index.mjs';
import {getBrand} from '../catalogue-loader.mjs';
import {questionsFor,rankProducts,complete,matches,tagsOf} from '../advisor.mjs';
// Read the same current JSON records as the browser and API. The historical
// catalog-data.mjs bundle is no longer the runtime catalogue.
const BRANDS=Object.fromEntries(await Promise.all(Object.keys(INDEX).map(async slug=>[slug,await getBrand(slug)])));
let fail=0,paths=0,maxOpt=0,maxSteps=0,noImageChoices=0;const want=process.argv[2];
for(const [slug,brand] of Object.entries(BRANDS)){
  const reached=new Set();
  const walk=(answers,depth,trace)=>{
    if(depth>7){fail++;console.log('DEEP',slug);return}
    if(complete(brand,answers)){paths++;maxSteps=Math.max(maxSteps,depth);const r=rankProducts(brand,answers);if(!r.length){fail++;console.log('EMPTY',slug,JSON.stringify(answers));return}
      r.forEach(p=>reached.add(p.id));for(const p of r){if(!matches(p,answers))fail++;if(!p.name||!p.price||!Number.isFinite(p.priceValue)||!/^https:\/\//.test(p.url))fail++;if(answers.budget&&answers.budget!=='any'&&p.priceValue>Number(answers.budget))fail++}
      if(slug===want)console.log(trace.join(' > '),'=>',r[0].name,r[0].price,'('+r.length+')');return}
    const q=questionsFor(brand,answers)[depth];if(!q){fail++;console.log('NOQ',slug,JSON.stringify(answers));return}
    maxOpt=Math.max(maxOpt,q.options.length);if(q.options.length<2){fail++;console.log('OPTS',slug,q.key,q.options.length)}
    // The renderer intentionally supports text-only choices when the shop has
    // no photograph. Keep this visible in the report, separate from path errors.
    noImageChoices+=q.options.filter(o=>!o.image).length;
    if(q.options.some(o=>!o.title||o.value===undefined)){fail++;console.log('INVALID_OPTION',slug,q.key)}
    for(const o of q.options)walk({...answers,[q.key]:o.value},depth+1,[...trace,q.key+'='+o.title]);
  };
  walk({},0,[]);
  const miss=brand.products.filter(p=>p.available!==false&&p.priceUnavailable!==true&&!reached.has(p.id)).length;if(miss){fail++;console.log('UNREACHABLE',slug,miss)}
}
console.log(JSON.stringify({brands:Object.keys(BRANDS).length,paths,maxOpt,maxSteps,noImageChoices,fail}));

if(fail)process.exit(1);
