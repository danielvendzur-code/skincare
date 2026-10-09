// One catalogue matcher for the browser, API and exhaustive QA. Only facts
// explicitly supplied by the seller become hard constraints.
export const LABELS={plants:'Izbové rastliny',outdoor:'Do záhrady',pots:'Črepníky',substrates:'Substráty',terrariums:'Rastlinné teráriá',orchids:'Orchidey',airplants:'Tillandsie',succulents:'Sukulenty a kaktusy',low:'Polotieň',bright:'Rozptýlené svetlo',sun:'Slnečné miesto',easy:'Nenáročná starostlivosť','pet-safe':'Domácnosť so zvieratami',trailing:'Previsnutý rast','small-pot':'Do 11 cm','medium-pot':'12–16 cm','large-pot':'Nad 16 cm',terracotta:'Terakota',concrete:'Betón',ceramic:'Keramika',plastic:'Plast',saucer:'Podmiska','indoor-mix':'Izbové rastliny','cactus-mix':'Kaktusy a sukulenty','orchid-mix':'Orchidey','hydro-mix':'Hydropónia','universal-mix':'Univerzálne','acid-mix':'Kyslomilné rastliny',closed:'Uzavreté',open:'Otvorené',bonsai:'S bonsajom',airplants:'S tillandsiou',perennial:'Trvalky',shrub:'Listnaté kry',conifer:'Ihličnany',grass:'Okrasné trávy','volume-small':'Do 3 litrov','volume-medium':'4–10 litrov','volume-large':'Nad 10 litrov',any:'Nechám si poradiť',lowest:'Nižšia cena',middle:'Stred ponuky',premium:'Vyššia cena'};
export function matches(product,answers={}) {
  if(answers.kind && product.kind!==answers.kind)return false;
  if(answers.required?.some(tag=>!product.tags.includes(tag)))return false;
  for(const key of ['facet','priority']) {
    const value=answers[key];
    if(value && value!=='any' && !['lowest','middle','premium'].includes(value) && !product.tags.includes(value))return false;
  }
  if(answers.budget && answers.budget!=='any' && product.priceValue>Number(answers.budget))return false;
  return true;
}
const candidates=(brand,answers)=>brand.products.filter(p=>matches(p,answers));
const family=p=>p.tags.find(t=>t.startsWith('genus:'));
function families(products) {
 const counts=new Map();for(const p of products){const t=family(p);if(t)counts.set(t,(counts.get(t)||0)+1);}
 return [...counts].sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0])).slice(0,3).map(([t])=>t);
}
const tagOptions=(products,tags)=>tags.filter(t=>products.some(p=>p.tags.includes(t))).slice(0,3);
function options(products,values,detail={}) {
 const used=new Set();return [...values,'any'].map(value=>{
  const pool=value==='any'?products:products.filter(p=>p.tags.includes(value));
  const product=pool.find(p=>!used.has(p.id))||pool[0]||products[0];if(product)used.add(product.id);
  return {value,title:LABELS[value]||value.replace('genus:',''),text:detail[value]|| (value==='any'?'Všetky zostávajúce možnosti':'Podľa údajov predajcu'),image:product?.photo};
 });
}
function pricePreference(products) {
 const sorted=[...products].sort((a,b)=>a.priceValue-b.priceValue);
 const indices=[0,Math.floor((sorted.length-1)/2),sorted.length-1];
 return ['lowest','middle','premium','any'].map((value,i)=>({value,title:LABELS[value],text:i<3?'Uprednostniť túto časť ponuky':'Bez cenovej preferencie',image:sorted[indices[i]??0]?.photo}));
}
export function questionsFor(brand,answers={}) {
 const kind=answers.kind||brand.kinds[0];const byKind=candidates(brand,{kind});
 const first={key:'kind',kicker:'01 · Čo hľadáte',title:'Čo dnes vyberáme?',options:brand.kinds.map(k=>({value:k,title:brand.kindLabels?.[k]||(k==='airplants'?'Tillandsie':LABELS[k]),text:brand.categoryNotes?.[k]||'Z ponuky tohto e-shopu',image:brand.products.find(p=>p.kind===k)?.photo}))};
 let facet,title;
 if(kind==='pots'){facet=tagOptions(byKind,['small-pot','medium-pot','large-pot']);title='Aký rozmer hľadáte?';}
 else if(kind==='substrates'){facet=tagOptions(byKind,['indoor-mix','cactus-mix','orchid-mix','hydro-mix','universal-mix','acid-mix']);title='Pre ktorú skupinu rastlín?';}
 else if(kind==='terrariums'){facet=tagOptions(byKind,['closed','open','bonsai','airplants']);title='Aký typ terária?';}
 else if(kind==='outdoor'){facet=tagOptions(byKind,['perennial','shrub','conifer','grass']);title='Čím doplníme záhradu?';}
 else {facet=tagOptions(byKind,['low','bright','sun']);title='Koľko svetla bude mať?';}
 if(!facet.length){facet=families(byKind);title='Ktorý rod vás zaujíma?';}
 const second={key:'facet',kicker:'02 · Podmienky',title,options:options(byKind,facet,{low:'Polotieň, nie tmavá miestnosť',bright:'Svetlé miesto bez ostrého slnka',sun:'Priame slnko podľa predajcu','small-pot':'Rozmer črepníka, nie rastliny','medium-pot':'Rozmer črepníka, nie rastliny','large-pot':'Rozmer črepníka, nie rastliny'})};
 const afterFacet=candidates(brand,{kind,facet:answers.facet});let priority,priorityTitle;
 if(kind==='pots'){priority=tagOptions(afterFacet,['ceramic','plastic','terracotta','concrete','saucer']);priorityTitle='Aký materiál preferujete?';}
 else if(kind==='substrates'){priority=tagOptions(afterFacet,['volume-small','volume-medium','volume-large']);priorityTitle='Aké balenie sa vám hodí?';}
 else {priority=tagOptions(afterFacet,['easy','pet-safe','trailing']);priorityTitle='Čo je pre vás podstatné?';}
 let thirdOptions;
 if(priority.length)thirdOptions=options(afterFacet,priority,{'pet-safe':'Takto ju zaraďuje predajca',easy:'Predajca uvádza jednoduchšiu starostlivosť',trailing:'Na policu alebo do závesu'});
 else {priorityTitle='Čomu dáme prednosť?';thirdOptions=pricePreference(afterFacet);}
 const third={key:'priority',kicker:'03 · Vaša preferencia',title:priorityTitle,options:thirdOptions};
 const afterPriority=candidates(brand,{kind,facet:answers.facet,priority:answers.priority});
 const thresholds=brand.currency==='CZK'?[200,400,800]:[15,30,60];
 let available=thresholds.filter(n=>afterPriority.some(p=>p.priceValue<=n));
 if(!available.length && afterPriority.length){
  const prices=afterPriority.map(p=>p.priceValue).sort((a,b)=>a-b);const unit=brand.currency==='CZK'?100:10;
  available=[...new Set([prices[0],prices[Math.floor(prices.length/2)],prices.at(-1)].map(p=>Math.ceil(p/unit)*unit))].slice(0,3);
 }
 const fourth={key:'budget',kicker:'04 · Rozpočet',title:'Do akej sumy vyberáme?',options:[...available.map(n=>{const p=afterPriority.filter(p=>p.priceValue<=n).sort((a,b)=>b.priceValue-a.priceValue)[0];return{value:String(n),title:`Do ${n} ${brand.currency==='CZK'?'Kč':'€'}`,text:'Cena jednej položky',image:p?.photo}}),{value:'any',title:'Bez limitu',text:'Rozhodne vhodnosť produktu',image:afterPriority.at(-1)?.photo}]};
 return [first,second,third,fourth];
}
function hash(text){let h=2166136261;for(const c of text)h=Math.imul(h^c.charCodeAt(0),16777619);return h>>>0;}
export function rankProducts(brand,answers={}) {
 const pool=candidates(brand,answers);const sorted=[...pool].sort((a,b)=>a.priceValue-b.priceValue);
 const preference=answers.priority;
 const target=preference==='lowest'?sorted[0]?.priceValue:preference==='premium'?sorted.at(-1)?.priceValue:preference==='middle'?sorted[Math.floor(sorted.length/2)]?.priceValue:null;
 const seed=JSON.stringify(Object.fromEntries(Object.entries(answers).sort()));
 return pool.sort((a,b)=>(target===null?0:Math.abs(a.priceValue-target)-Math.abs(b.priceValue-target))||hash(seed+a.id)-hash(seed+b.id));
}
export function matchedLabels(product,answers) {
 return Object.entries(answers).filter(([k,v])=>k!=='kind'&&v!=='any').map(([k,v])=>k==='budget'?`Do ${v} ${product.currency==='CZK'?'Kč':'€'}`:LABELS[v]||v.replace('genus:',''));
}
const plain=text=>String(text).normalize('NFD').replace(/\p{Diacritic}/gu,'').toLowerCase();
export function catalogueReply(brand,messages) {
 const last=messages.filter(m=>m.role==='user').at(-1)?.content||'';const q=plain(last);
 if(/doprava|doruc|objednav|reklamac|vraten|otvarac|kedy pride/.test(q))return {text:`Aktuálne podmienky dopravy, objednávok a reklamácií nájdete na ${brand.website}. V tejto ukážke nemám prístup k objednávkam. Môžem pomôcť vybrať konkrétny produkt.`,products:[]};
 if(/zlt(?:e|nu|nuc).*list|list.*zlt|hnil|chorob|skodc|preliat|usych/.test(q))return {text:'Napíšte názov rastliny, koľko má svetla a ako ju polievate. Zo samotného príznaku neviem spoľahlivo určiť príčinu. Overené pokyny predajcu nájdete na detaile konkrétnej rastliny.',products:[]};
 if(/tmava miest|uplna tma|bez svetla|bez okn/.test(q))return {text:'Polotieň neznamená úplnú tmu. Bez denného svetla alebo pestovateľského osvetlenia vám z tejto ponuky vhodnú živú rastlinu neodporučím. Vyberme najprv miesto so svetlom.',products:[]};
 const exact=brand.products.filter(p=>q.includes(plain(p.name)));
 let answers={};
 if(/substrat|zemin/.test(q))answers.kind='substrates';else if(/kvetinac|crepnik|obal/.test(q))answers.kind='pots';else if(/terarium/.test(q))answers.kind='terrariums';else if(/orchide/.test(q)&&brand.kinds.includes('orchids'))answers.kind='orchids';else answers.kind=brand.kinds.includes('plants')?'plants':brand.kinds[0];
 if(/polotien|polostin|menej svetla|malo svetla|do tien/.test(q))answers.facet='low';else if(/rozptylen|bez priameho sln|bez priame sln|nie.*priame.*sln|nechcem.*slnec/.test(q))answers.facet='bright';else if(/priame slnko|slnec/.test(q))answers.facet='sun';
 if(/nenaroc|zaciatoc|lahka starost/.test(q))answers.priority='easy';
 const money=q.match(/(?:do|pod|max)\s+(\d+(?:[.,]\d+)?)\s*(€|eur|kc)/);
 if(money){
  const currency=money[2]==='kc'?'CZK':'EUR';
  if(currency!==brand.currency)return {text:`Tento e-shop uvádza ceny v ${brand.currency==='CZK'?'Kč':'eurách'}. Zadajte prosím rozpočet v rovnakej mene; kurz v tejto ukážke neprepočítavam.`,products:[]};
  answers.budget=money[1].replace(',','.');
 }
 const genus=brand.products.filter(p=>plain(p.name).split(' ')[0].length>3&&q.includes(plain(p.name).split(' ')[0]));
 if(/jedovat|toxick|mack|maci|pes|psov|zvierat/.test(q)) {
  answers.kind='plants';answers.required=['pet-safe'];
  const named=exact.length?exact:genus;
  const p=(named.length?named.filter(p=>matches(p,answers)):rankProducts(brand,answers)).slice(0,2);
  return p.length?{text:`Predajca medzi rastliny vhodné do domácnosti so zvieratami zaraďuje: ${p.map(x=>`${x.name} (${x.price})`).join('; ')}. Tieto položky spĺňajú aj uvedené svetlo a rozpočet. Rastliny nie sú určené na konzumáciu.`,products:p.map(x=>x.id)}:{text:'Pre tieto podmienky alebo pomenovaný druh nemám doložené zaradenie ako bezpečný pre zvieratá. Bez tohto podkladu ho nebudem odporúčať na tento účel.',products:[]};
 }
 const named=exact.length?exact:genus;
 let ranked=named.length?named.filter(p=>matches(p,{...answers,kind:p.kind})):rankProducts(brand,answers);
 if(/cena|ceny|kolko|lacne/.test(q)&&!exact.length)ranked=[...ranked].sort((a,b)=>a.priceValue-b.priceValue);
 if(!ranked.length)return {text:'V overenej ponuke nemám produkt, ktorý by spĺňal tieto podmienky. Skúste upraviť rozpočet alebo prejdite Výber rastlín a doplnkov.',products:[]};
 const selected=ranked.slice(0,/porovnaj|porovnanie|rozdiel/.test(q)?2:1);
 return {text:selected.map(p=>`${p.name} — ${p.price}. ${p.reason}`).join('\n\n')+'\n\nCeny sú zo snímky ponuky z 9. 10. 2026. Dostupnosť si overte na detaile produktu. Výber v štyroch krokoch zohľadní ďalšie podmienky.',products:selected.map(p=>p.id)};
}
