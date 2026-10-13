export const snapshotDate=brand=>(brand.checked||brand.products[0]?.checked||'2026-10-09').split('-').reverse().map(Number).join('. ')+'.';
// One catalogue matcher for the browser, API and exhaustive QA. Only facts
// explicitly supplied by the seller become hard constraints.
export const LABELS={plants:'Izbové rastliny',rareplants:'Raritné rastliny',accessories:'Pestovateľské pomôcky',support:'Opora pre rastlinu',fixing:'Držiak alebo diel opory',watering:'Kvapkanie k opore',hanging:'Záves na rastlinu',shrubs:'Okrasné kry',fruits:'Ovocné stromy',outdoor:'Do záhrady',pots:'Črepníky',substrates:'Substráty',terrariums:'Rastlinné teráriá',orchids:'Orchidey',airplants:'Tillandsie',succulents:'Sukulenty a kaktusy',cacti:'Kaktusy',low:'Polotieň',bright:'Rozptýlené svetlo',sun:'Slnečné miesto',easy:'Nenáročná starostlivosť','pet-safe':'Domácnosť so zvieratami',trailing:'Previsnutý rast','small-pot':'Do 11 cm','medium-pot':'12–16 cm','large-pot':'Nad 16 cm',terracotta:'Terakota',concrete:'Betón',ceramic:'Keramika',plastic:'Plast',saucer:'Podmiska','indoor-mix':'Izbové rastliny','cactus-mix':'Kaktusy a sukulenty','orchid-mix':'Orchidey','hydro-mix':'Hydropónia','universal-mix':'Univerzálne','bonsai-mix':'Hotová bonsajová zmes','deciduous-mix':'Listnaté bonsaje','conifer-mix':'Ihličnaté bonsaje','mineral-component':'Zložka vlastnej zmesi','acid-mix':'Kyslomilné rastliny',closed:'Uzavreté',open:'Otvorené',bonsai:'S bonsajom',airplants:'S tillandsiou',perennial:'Trvalky',shrub:'Listnaté kry',conifer:'Ihličnany',grass:'Okrasné trávy','volume-small':'Do 3 litrov','volume-medium':'4–10 litrov','volume-large':'Nad 10 litrov',any:'Nechám si poradiť',lowest:'Nižšia cena',middle:'Stred ponuky',premium:'Vyššia cena'};
/* Product facts are shown as facts: the catalogue notes say "podľa predajcu / e-shopu" in every
   sentence, which reads as a disclaimer. The wording is tidied where it is displayed. */
const DROP=/^(Cena a fotografia patria|Určenie z názvu a popisu|Odrodový záber|Odrodová fotografia|Samostatný črepník; vhodnosť)/;
const REWRITE=[[/^Predajca uvádza nenáročnú starostlivosť\.$/,'Nenáročná starostlivosť.'],[/^Predajca ju zaraďuje medzi rastliny pre začiatočníkov\.$/,'Vhodná pre začiatočníkov.'],[/^Predajca ju zaraďuje medzi rastliny vhodné do domácnosti so zvieratami\.$/,'Vhodná do domácnosti so zvieratami.'],[/^Predajca uvádza fotografiu konkrétneho stromu, ktorý dostanete\.$/,'Na fotografii je konkrétny strom, ktorý dostanete.'],[/^Predajca uvádza:\s*/,''],[/^Predajca (výslovne )?uvádza vhodnosť do polotieňa\.$/,'Znesie polotieň.'],[/^Predajca (výslovne )?uvádza toleranciu priameho slnka alebo slunného miesta\.$/,'Znesie priame slnko.'],[/^Predajca (výslovne )?uvádza toleranciu svetla od slunného miesta po polotieň\.$/,'Znesie slnko aj polotieň.'],[/^Predajca opisuje druh ako sukulentnú rastlinu\.$/,'Sukulentná rastlina.'],[/^Predajca (výslovne )?(uvádza|opisuje|odporúča)\s+/,''],[/\s+Predajca uvádza nenáročnú starostlivosť\./,'. Nenáročná starostlivosť.'],[/^V období kvitnutia predajca požaduje osobný odber\.$/,'V období kvitnutia len osobný odber.'],[/; pomer zmesi overte na detaile\.$/,'.'],[/\s+podľa (názvu |popisu |kategórie |zaradenia |ponuky )?(predajcu|predajca|e-shopu|pestovateľa)/g,''],[/\s+podľa názvu(?=[:.])/g,''],[/\s+z ponuky predajcu/g,''],[/\s+predajcu(?=[:.;])/g,'']];
export function tidy(text){
 return String(text||'').split(/(?<=\.)\s+/).filter(s=>s&&!DROP.test(s)).map(s=>{for(const [from,to] of REWRITE)s=s.replace(from,to);s=s.trim();return s.charAt(0).toUpperCase()+s.slice(1);}).filter(Boolean).join(' ');
}
/* Colour of a pot or accessory is read from its product name. */
const COLOURS=[['colour:grey',/\bsiv|grey|gray|beton|antracit|\bsed/],['colour:green',/zelen|green|oliv|pine|mint/],['colour:copper',/copper|meden|bronz|zlat|gold/],['colour:beige',/bezov|beige|krem|piesk|natur|sand/],['colour:pink',/ruzov|pink|rose/],['colour:white',/\bbiel|\bbil|white/],['colour:black',/ciern|cern|black/],['colour:brown',/hned|brown|terakot|terracot/],['colour:blue',/modr|blue|petrol|tyrkys/]];
Object.assign(LABELS,{'colour:grey':'Sivá','colour:green':'Zelená','colour:copper':'Medená a zlatá','colour:beige':'Béžová a prírodná','colour:pink':'Ružová','colour:white':'Biela','colour:black':'Čierna','colour:brown':'Hnedá a terakota','colour:blue':'Modrá',any:'Je mi to jedno'});
const fold=text=>String(text).normalize('NFD').replace(/\p{Diacritic}/gu,'').toLowerCase();
const tagCache=new WeakMap();
export function tagsOf(product){
 let tags=tagCache.get(product);
 if(!tags){const colour=['pots','accessories'].includes(product.kind)?COLOURS.find(([,test])=>test.test(fold(product.name)))?.[0]:null;tags=colour?[...product.tags,colour]:product.tags;tagCache.set(product,tags);}
 return tags;
}
export function matches(product,answers={}) {
  if(product.available===false)return false;
  if(answers.kind && product.kind!==answers.kind)return false;
  const tags=tagsOf(product);
  if(answers.required?.some(tag=>!tags.includes(tag)))return false;
  for(const [key,value] of Object.entries(answers)) {
    if(['kind','budget','required'].includes(key)||!value||value==='any')continue;
    if(!tags.includes(value))return false;
  }
  if(answers.budget && answers.budget!=='any' && (!Number.isFinite(product.priceValue)||product.priceValue>Number(answers.budget)||(product.sourcePriceFrom&&(!Number.isFinite(product.sourcePriceMax)||product.sourcePriceMax>Number(answers.budget)))))return false;
  return true;
}
const candidates=(brand,answers)=>brand.products.filter(p=>matches(p,answers));
const DETAIL={low:'Polotieň, nie tmavá miestnosť',bright:'Svetlé miesto bez ostrého slnka',sun:'Znesie priame slnko','small-pot':'Priemer črepníka','medium-pot':'Priemer črepníka','large-pot':'Priemer črepníka','pet-safe':'Vhodná k psom a mačkám',easy:'Jednoduchšia starostlivosť',trailing:'Na policu alebo do závesu'};
/* Question groups per category, in the order they are asked. */
const genera=products=>{const counts=new Map();for(const p of products){const t=p.tags.find(t=>t.startsWith('genus:'));if(t)counts.set(t,(counts.get(t)||0)+1);}return [...counts].sort((x,y)=>y[1]-x[1]||x[0].localeCompare(y[0])).map(([t])=>t);};
const GROUPS={
 pots:[['size','Aký veľký črepník hľadáte?',['small-pot','medium-pot','large-pot']],['colour','Aká farba sa vám hodí?',COLOURS.map(([t])=>t)],['material','Aký materiál preferujete?',['ceramic','plastic','terracotta','concrete']]],
 substrates:[['use','Na čo substrát potrebujete?',['indoor-mix','cactus-mix','orchid-mix','hydro-mix','universal-mix','bonsai-mix','acid-mix','mineral-component']],['bonsai','Pre ktoré bonsaje vyberáme zmes?',['deciduous-mix','conifer-mix']],['volume','Aké balenie sa vám hodí?',['volume-small','volume-medium','volume-large']]],
 terrariums:[['type','Aký typ terária?',['closed','open','bonsai','airplants']]],
 accessories:[['use','Na čo pomôcku potrebujete?',['support','fixing','watering','hanging']],['colour','Aká farba sa vám hodí?',COLOURS.map(([t])=>t)]],
 outdoor:[['type','Čím doplníme záhradu?',['perennial','shrub','conifer','grass']],['light','Aké stanovište máte v záhrade?',['low','bright','sun']]]
};
const LIVING=[['light','Koľko svetla bude mať?',['low','bright','sun']],['care','Čo je pre vás podstatné?',['easy','pet-safe','trailing']]];
function facetQuestions(brand,kind,answers){
 const result=[];let fixed={kind};
 const groups=[...(GROUPS[kind]||LIVING)];
 for(const [key,title,values] of [...groups,...(GROUPS[kind]?[]:[['genus','Ktorá rastlina sa vám páči?',null]])]){
  if(result.length>=3)break;
  const pool=candidates(brand,fixed);
  const list=(values||genera(pool)).map(value=>[value,pool.filter(p=>tagsOf(p).includes(value))]).filter(([,items])=>items.length);
  /* Worth asking only when at least two answers lead to different products. */
  if(list.length>=2&&list.some(([,items])=>items.length<pool.length)){
   const covered=new Set(list.flatMap(([,items])=>items.map(p=>p.id))).size===pool.length;
   let shown=list;
   if(!values)shown=list.slice(0,3);else if(list.length>4||(!covered&&list.length>3))shown=[...list].sort((x,y)=>y[1].length-x[1].length).slice(0,3).sort((x,y)=>values.indexOf(x[0])-values.indexOf(y[0]));
   const neutral=shown.length<list.length||!covered||shown.length<=3;
   const used=new Set();
   const options=shown.map(([value,items])=>{const p=items.find(i=>!used.has(i.photo))||items[0];used.add(p.photo);return{value,title:LABELS[value]||value.replace('genus:','').replace(/^./,c=>c.toUpperCase()),text:DETAIL[value]||(items.length===1?'1 produkt':items.length<5?items.length+' produkty':items.length+' produktov'),image:p.photo};});
   if(neutral){const p=pool.find(i=>!used.has(i.photo))||pool[0];options.push({value:'any',title:shown.length<list.length?'Niečo iné':'Je mi to jedno',text:shown.length<list.length?'Ukázať celú ponuku':'Vyberiem podľa ostatných odpovedí',image:p.photo});}
   result.push({key,title,options});
  }
  if(answers[key]===undefined)break;
  fixed={...fixed,[key]:answers[key]};
 }
 return {questions:result,fixed};
}
const NICE={EUR:[3,5,8,10,12,15,20,25,30,40,50,60,80,100,150,200,300,500],CZK:[50,80,100,150,200,250,300,400,500,600,800,1000,1500,2000,3000,5000]};
/* Budget limits come from the prices of the products that are still in play. */
function budgetQuestion(brand,pool){
 const prices=pool.map(p=>p.sourcePriceFrom?p.sourcePriceMax:p.priceValue).filter(Number.isFinite).sort((x,y)=>x-y);if(prices.length<3)return null;
 const within=n=>prices.filter(p=>p<=n).length,nice=NICE[brand.currency==='CZK'?'CZK':'EUR'],unit=brand.currency==='CZK'?'Kč':'€';
 const limits=[...new Set([.34,.67].map(q=>nice.find(n=>n>=prices[Math.floor((prices.length-1)*q)])).filter(Boolean))].filter(n=>within(n)>0&&within(n)<prices.length);
 if(!limits.length)return null;
 const used=new Set();
 const options=limits.map(n=>{const items=pool.filter(p=>matches(p,{budget:n})).sort((x,y)=>y.priceValue-x.priceValue);const p=items.find(i=>!used.has(i.photo))||items[0];used.add(p.photo);return{value:String(n),title:'Do '+n+' '+unit,text:items.length<5?items.length+(items.length===1?' produkt':' produkty'):items.length+' produktov',image:p.photo};});
 const top=[...pool].sort((x,y)=>y.priceValue-x.priceValue).find(i=>!used.has(i.photo))||pool[0];
 options.push({value:'any',title:'Bez limitu',text:'Celá ponuka, '+pool.length+' produktov',image:top.photo});
 return {key:'budget',title:'Do akej sumy vyberáme?',options};
}
export function questionsFor(brand,answers={}) {
 const first={key:'kind',title:'Čo dnes vyberáme?',options:brand.kinds.map(k=>({value:k,title:brand.kindLabels?.[k]||(k==='airplants'?'Tillandsie':LABELS[k]),text:tidy(brand.categoryNotes?.[k]||'Z ponuky tohto e-shopu'),image:brand.products.find(p=>p.kind===k&&p.available!==false)?.photo||brand.products.find(p=>p.kind===k)?.photo}))};
 const list=brand.kinds.length>1?[first]:[];
 const kind=answers.kind||(brand.kinds.length>1?null:brand.kinds[0]);
 if(kind){
  const {questions,fixed}=facetQuestions(brand,kind,answers);list.push(...questions);
  /* The budget is asked once every earlier question has an answer. */
  if(questions.every(q=>answers[q.key]!==undefined)){const budget=budgetQuestion(brand,candidates(brand,fixed));if(budget)list.push(budget);}
 }
 const names={kind:'Čo hľadáte',budget:'Rozpočet',size:'Veľkosť',colour:'Farba',material:'Materiál',light:'Svetlo',care:'Starostlivosť',genus:'Druh',use:'Použitie',type:'Typ',volume:'Balenie',bonsai:'Bonsaj'};
 return list.map((q,i)=>({...q,kicker:String(i+1).padStart(2,'0')+' · '+(names[q.key]||'Výber')}));
}
/* Is the selection finished? Later questions may only appear after an answer. */
export const complete=(brand,answers={})=>questionsFor(brand,answers).every(q=>answers[q.key]!==undefined)&&(brand.kinds.length<2||!!answers.kind);
/* With a budget the closest product under the limit wins; without one the middle of the range.
   The order is fully determined by the catalogue, never shuffled. */
export function rankProducts(brand,answers={}) {
 const pool=candidates(brand,answers);if(!pool.length)return pool;
 const prices=pool.map(p=>p.priceValue).sort((x,y)=>x-y);
 const target=answers.budget&&answers.budget!=='any'?Number(answers.budget):prices[Math.floor((prices.length-1)/2)];
 return pool.sort((x,y)=>Math.abs(x.priceValue-target)-Math.abs(y.priceValue-target)||x.priceValue-y.priceValue||x.name.localeCompare(y.name,'sk'));
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
 // A plant's own name may contain ‘kvetinac’ or ‘substrat’. Interpret category
 // requests only outside the explicitly named product.
 const intentQuery=exact.reduce((text,p)=>text.replace(plain(p.name),''),q);
 let answers={};
 if(/opora|opory|raselinnikov.*tyc|drziak|kvapkadlo|korunka|macrame|zaves/.test(intentQuery)&&brand.kinds.includes('accessories'))answers.kind='accessories';else if(/rarit|zberatel|vzacn/.test(intentQuery)&&brand.kinds.includes('rareplants'))answers.kind='rareplants';else if(/ovocn|jablon|hrusk|broskyn/.test(intentQuery)&&brand.kinds.includes('fruits'))answers.kind='fruits';else if(/(?:^|\s)(?:ker|kry|krik|kriky)(?:\s|$)/.test(intentQuery)&&brand.kinds.includes('shrubs'))answers.kind='shrubs';else if(/substrat|zemin/.test(intentQuery))answers.kind='substrates';else if(/kvetinac|crepnik|obal/.test(intentQuery))answers.kind='pots';else if(/terarium/.test(intentQuery))answers.kind='terrariums';else if(/orchide/.test(intentQuery)&&brand.kinds.includes('orchids'))answers.kind='orchids';else if(/\bkaktus\w*|\bcactus\b/.test(intentQuery)&&brand.kinds.includes('cacti'))answers.kind='cacti';else if(/sukulent/.test(intentQuery)&&brand.kinds.includes('succulents'))answers.kind='succulents';else answers.kind=brand.kinds.includes('plants')?'plants':brand.kinds[0];
 if(/polotien|polostin|menej svetla|malo svetla|do tien/.test(q))answers.facet='low';else if(/rozptylen|bez priameho sln|bez priame sln|nie.*priame.*sln|nechcem.*slnec/.test(q))answers.facet='bright';else if(/priame slnko|slnec/.test(q))answers.facet='sun';
 if(/nenaroc|zaciatoc|zacatec|lahka starost|snadn/.test(q))answers.priority='easy';
 const money=q.match(/(?:do|pod|max)\s+(\d+(?:[.,]\d+)?)\s*(€|eur|kc)/);
 if(money){
  const currency=money[2]==='kc'?'CZK':'EUR';
  if(currency!==brand.currency)return {text:`Tento e-shop uvádza ceny v ${brand.currency==='CZK'?'Kč':'eurách'}. Zadajte prosím rozpočet v rovnakej mene; kurz v tejto ukážke neprepočítavam.`,products:[]};
  answers.budget=money[1].replace(',','.');
 }
 // Category words are not botanical names: “kaktusy” must search the entire
 // cactus category, including names starting with Mammillaria or Schlumbergera.
 const queryWords=new Set(q.split(/[^a-z0-9]+/)),genericName=/^(?:kaktus\w*|cactus|sukulent\w*|rastlin\w*|rostlin\w*|substrat\w*|kvetinac\w*|crepnik\w*|baby|mini|mix|izbov\w*|pokojov\w*)$/;
 const genus=brand.products.filter(p=>{const first=plain(p.name).split(' ')[0];return first.length>3&&!genericName.test(first)&&queryWords.has(first);});
 if(/jedovat|toxick|mack|maci|kock|pes|psov|psum|zvierat|zvirat/.test(q)) {
  answers.kind='plants';answers.required=['pet-safe'];
  const named=exact.length?exact:genus;
  const p=(named.length?named.filter(p=>matches(p,answers)):rankProducts(brand,answers)).slice(0,2);
  return p.length?{text:`Do domácnosti so zvieratami sa hodia: ${p.map(x=>`${x.name} (${x.price})`).join('; ')}. Tieto položky spĺňajú aj uvedené svetlo a rozpočet. Rastliny nie sú určené na konzumáciu.`,products:p.map(x=>x.id)}:{text:'Pre tieto podmienky alebo pomenovaný druh nemám doložené zaradenie ako bezpečný pre zvieratá. Bez tohto podkladu ho nebudem odporúčať na tento účel.',products:[]};
 }
 const named=exact.length?exact:genus;
 const explicitKind=/substrat|zemin|kvetinac|crepnik|obal|terarium|opora|opory|drziak|kvapkadlo|korunka|macrame|raselinnikov.*tyc|rarit|zberatel|vzacn|ovocn|\bkaktus\w*|\bcactus\b|sukulent/.test(intentQuery);
 let ranked=named.length?named.filter(p=>matches(p,explicitKind?answers:{...answers,kind:p.kind})):rankProducts(brand,answers);
 if(/cena|ceny|kolko|lacne/.test(q)&&!exact.length)ranked=[...ranked].sort((a,b)=>a.priceValue-b.priceValue);
 if(!ranked.length)return {text:'V overenej ponuke nemám produkt, ktorý by spĺňal tieto podmienky. Skúste upraviť rozpočet alebo prejdite Výber rastlín a doplnkov.',products:[]};
 const selected=ranked.slice(0,/porovnaj|porovnej|porovnanie|srovn|rozdiel|rozdil/.test(q)?2:1);
 return {text:selected.map(p=>`${p.name} — ${p.price}. ${tidy(p.reason)}`).join('\n\n'),products:selected.map(p=>p.id)};
}
