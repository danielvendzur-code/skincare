const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const MODEL = process.env.CHAT_MODEL || 'claude-haiku-4-5';

const DEMOS = {
  ryor:{brand:"RYOR",web:"https://www.ryor.sk/",products:["RESTART – posilňujúci šampón pre poškodené a farbené vlasy 200 ml", "Šampón s ukľudňujúcim efektom 200 ml", "Bylinný šampón s panthenolom 200 ml", "Pivný šampón s keratínom 250 ml", "Urýchľovač rastu vlasov – 3-mesačná kúra 250 ml", "RESTART – posilňujúci kondicionér pre poškodené a farbené vlasy 200 ml", "RESTART – posilňujúca maska pre poškodené a farbené vlasy 250 ml", "Vlasový keratín sprej 250 ml", "Regeneračný kondicionér s panthenolom 200 ml"],fallback:{dry:"Na suché a farbené vlasy je z RYOR určená rada RESTART — posilňujúci šampón, kondicionér a maska. Výber starostlivosti ešte zohľadní, koľko krokov chcete.",oily:"Keď vlasy rýchlo splasnú a mastia sa, je dobrý smer Pivný šampón s keratínom, ktorý dodá objem a pevnosť. Výber ešte spresní vašu prioritu.",sensitive:"Pri citlivej, začervenanej alebo svrbiacej pokožke hlavy je určený Šampón s ukľudňujúcim efektom. Ak ťažkosti trvajú, poraďte sa s dermatológom.",mature:"Pri slabých vlasoch je smer Urýchľovač rastu vlasov – 3-mesačná kúra a k nemu Bylinný šampón s panthenolom. Pri výraznom vypadávaní sa poraďte s dermatológom.",default:"Ak neviete, kde začať, prejdite Výber starostlivosti. Štyri krátke kroky zúžia ponuku RYOR na konkrétny šampón, kúru alebo kondicionér."}},
  venira:{brand:"Venira",web:"https://www.venira.sk/",products:["Prírodný šampón pre podporu rastu vlasov 300 ml","Prírodný šampón s kolagénom pre podporu rastu vlasov 300 ml","Prírodný šampón pre mastné vlasy 300 ml","Prírodný šampón pre objem vlasov Volume Booster 300 ml","Šampón na kučeravé vlasy 300 ml","Hair Booster – vlasové sérum na podporu rastu 100 ml","Rozmarínová voda / tonikum na vlasy a pokožku 200 ml","Regeneračná maska na vlasy 300 ml","Kondicionér s kolagénom 300 ml"],fallback:{dry:"Na suché a poškodené vlasy je z Veniry dobrý smer Regeneračná maska na vlasy, pri kučerách Šampón na kučeravé vlasy. Výber starostlivosti ešte zohľadní, koľko krokov chcete.",oily:"Keď sa vlasy rýchlo mastia, je určený Prírodný šampón pre mastné vlasy, ktorý reguluje tvorbu mazu. Pri splihnutých vlasoch pomôže šampón Volume Booster.",sensitive:"Pri citlivej a podráždenej pokožke hlavy je dobrý smer Rozmarínová voda a šetrný Prírodný šampón s kolagénom. Ak ťažkosti trvajú, poraďte sa s dermatológom.",mature:"Pri slabých a rednúcich vlasoch je smer Prírodný šampón pre podporu rastu vlasov a sérum Hair Booster. Pri výraznom vypadávaní sa poraďte s dermatológom.",default:"Ak neviete, kde začať, prejdite Výber starostlivosti. Štyri krátke kroky zúžia ponuku Venira na konkrétny šampón, sérum alebo masku."}},
  havlikova:{brand:"Havlík Apoteka",web:"https://www.havlikovaapoteka.cz/sk/",products:["Cibuľovo-fazuľový šampón na tmavé vlasy 200 ml","Cibuľovo-fazuľový šampón na svetlé vlasy 200 ml","Havlíkov šampón 13 rastlín 200 ml","Jemný vlasový šampón pre suché vlasy 200 ml","Vlasové tonikum 200 ml","Rozmarínové tonikum na vlasy 200 ml","Cibuľovo-fazuľové vlasové sérum 30 ml","Cibuľovo-fazuľová vlasová maska 100 ml","Vlasové sérum Kyselina hyalurónová 50 ml"],fallback:{dry:"Na suché a poškodené vlasy je z Havlík Apoteka dobrý smer Jemný vlasový šampón pre suché vlasy, na končeky Vlasové sérum Kyselina hyalurónová. Výber starostlivosti ešte zohľadní, koľko krokov chcete.",oily:"Keď sa vlasy rýchlo mastia, pomôže Vlasové tonikum z 10 bylín, ktoré normalizuje maz na pokožke hlavy; k nemu ľahká Cibuľovo-fazuľová maska. Výber ešte spresní vašu prioritu.",sensitive:"Pri svrbiacej a citlivej pokožke hlavy je určené Vlasové tonikum alebo Rozmarínové tonikum, ktoré pokožku upokojí a hydratuje. Ak ťažkosti trvajú, poraďte sa s dermatológom.",mature:"Pri slabých a vypadávajúcich vlasoch je smer rad Vlasový opravář — Cibuľovo-fazuľový šampón na svetlé alebo tmavé vlasy a Cibuľovo-fazuľové vlasové sérum. Pri výraznom vypadávaní sa poraďte s dermatológom.",default:"Ak neviete, kde začať, prejdite Výber starostlivosti. Štyri krátke kroky zúžia ponuku Havlík Apoteka na konkrétny šampón, tonikum alebo sérum."}},
  haaro:{brand:"Haaro Naturo",web:"https://www.haaro-naturo.cz/",products:["Postbiotický šampón na jemné vlasy 100 g","Postbiotický šampón na lupiny a mastné vlasy 100 g","Postbiotický šampón na silné a kučeravé vlasy 100 g","Tuhý šampón na mastné vlasy 100 g","Tuhý šampón na uhladenie 100 g","Sérum na suchú pokožku hlavy Lipa-mäta 100 ml","Sérum na mastnú pokožku a lupiny Orech-dub 100 ml","Ľahký kondicionér na jemné vlasy","Suchý vlasový olej 50 ml"],fallback:{dry:"Na suché a krepovaté vlasy je z Haaro Naturo dobrý smer Tuhý šampón na uhladenie, k nemu Suchý vlasový olej na dĺžky. Výber starostlivosti ešte zohľadní, či chcete jeden krok alebo celú starostlivosť.",oily:"Keď sa vlasy rýchlo mastia, siahnite po Tuhom šampóne na mastné vlasy; pri svrbení a lupinách po Postbiotickom šampóne na lupiny a mastné vlasy. Výber ešte spresní vašu prioritu.",sensitive:"Pri citlivej pokožke hlavy a lupinách je určený Postbiotický šampón na lupiny a mastné vlasy a sérum Orech-dub, pri suchej pokožke sérum Lipa-mäta. Ak ťažkosti trvajú, poraďte sa s dermatológom.",mature:"Pri slabších a jemných vlasoch je dobrý začiatok Postbiotický šampón na jemné vlasy s postbiotikami pre zdravé prostredie pokožky hlavy. Pri výraznom vypadávaní sa poraďte s dermatológom.",default:"Ak neviete, kde začať, prejdite Výber starostlivosti. Štyri krátke kroky zúžia ponuku Haaro Naturo na konkrétny šampón, sérum alebo kondicionér."}},
};

function cors(req,res){
  const origin=req.headers.origin||'';
  const ok=origin===''||/(^https:\/\/([a-z0-9-]+\.)?mojchatbot\.sk$)|(^https:\/\/.*\.vercel\.app$)|(^http:\/\/(localhost|127\.0\.0\.1):\d+$)/i.test(origin);
  res.setHeader('Access-Control-Allow-Origin',ok&&origin?origin:'https://mojchatbot.sk');
  res.setHeader('Vary','Origin');res.setHeader('Access-Control-Allow-Methods','POST, OPTIONS');res.setHeader('Access-Control-Allow-Headers','Content-Type');
}
function fallbackReply(demo,text){
  const q=String(text||'').toLocaleLowerCase('sk');
  if(/lup|svrb|citliv|podráž|podraz|šupin|supin|pokož|pokoz|ekzém|štíp|stip/.test(q))return demo.fallback.sensitive;
  if(/vypad|padaj|redn|rídn|ridn|slab|rast|hust|posil|lysin/.test(q))return demo.fallback.mature;
  if(/mast|maz|objem|splasnut|ploch|jemn/.test(q))return demo.fallback.oily;
  if(/such|lámav|lamav|krep|poškod|poskod|konč|konc|farb|zniče|znice|kudrn|vlnit/.test(q))return demo.fallback.dry;
  return demo.fallback.default;
}
export default async function handler(req,res){
  cors(req,res);res.setHeader('Cache-Control','no-store');
  if(req.method==='OPTIONS')return res.status(204).end();
  if(req.method!=='POST')return res.status(405).json({error:'Method not allowed'});
  let body={};try{body=typeof req.body==='string'?JSON.parse(req.body):(req.body||{});}catch{return res.status(400).json({error:'Invalid body'});}
  const demo=DEMOS[String(body.demoId||'')];if(!demo)return res.status(400).json({error:'Unknown demo'});
  const messages=(Array.isArray(body.messages)?body.messages:[]).filter(m=>m&&(m.role==='user'||m.role==='assistant')).slice(-10).map(m=>({role:m.role,content:String(m.content||'').slice(0,700)})).filter(m=>m.content.trim());
  const latest=messages.filter(m=>m.role==='user').at(-1)?.content||'';if(!latest)return res.status(400).json({error:'Missing user message'});
  const fallback=()=>res.status(200).json({reply:fallbackReply(demo,latest),fallback:true});
  if(!ANTHROPIC_API_KEY)return fallback();
  const system=[
    `Ste stručný produktový poradca pre e-shop s vlasovou kozmetikou ${demo.brand}.`,
    'Odpovedajte jednoduchou slovenčinou, maximálne dvoma krátkymi vetami.',
    'Pomáhate s orientačným výberom vlasovej starostlivosti podľa typu vlasov, pokožky hlavy a preferencií. Nerobte zdravotnú diagnózu, nesľubujte liečbu ani zastavenie vypadávania a nevymýšľajte medicínske tvrdenia.',
    'Odporučiť môžete iba presný názov produktu zo zoznamu Overené produkty. Nevymýšľajte ceny, zloženie ani účinky, ktoré nie sú uvedené.',
    'Pri výraznom alebo dlhodobom probléme pokožky hlavy či vypadávaní vlasov odporučte konzultáciu s dermatológom alebo trichológom.',
    `Oficiálny e-shop: ${demo.web}`,
    `Overené produkty:\n- ${demo.products.join('\n- ')}`
  ].join('\n\n');
  try{
    const api=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'content-type':'application/json','x-api-key':ANTHROPIC_API_KEY,'anthropic-version':'2023-06-01'},body:JSON.stringify({model:MODEL,max_tokens:160,temperature:0,system,messages})});
    if(!api.ok){console.error('cosmetics Anthropic API error',api.status,await api.text());return fallback();}
    const data=await api.json();const reply=Array.isArray(data.content)?data.content.filter(b=>b.type==='text').map(b=>b.text).join('').trim():'';
    const clean=reply.replace(/[\u002a_\u0060#]/g,'').replace(/\s+/g,' ').trim();if(!clean)return fallback();
    return res.status(200).json({reply:clean});
  }catch(error){console.error('cosmetics chat provider error',error);return fallback();}
}
