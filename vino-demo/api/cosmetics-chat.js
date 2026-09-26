const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const MODEL = process.env.CHAT_MODEL || 'claude-haiku-4-5';

const DEMOS = {
  skoupil:{brand:"Vinařství Skoupil",web:"https://eshop.skoupil.com/",products:["Ryzlink rýnský 2024, pozdní sběr, suché","Veltlínské zelené 2025, suché","Sauvignon 2025, polosuché","Pálava 2025, polosuché","Tramín červený 2024 Úlehle, suché","Frankovka 2023 Šmatláky, suché","Pinot Noir 2023 Frejúnky, suché","Merlot 2025, pozdní sběr, suché","ŠUM Sauvignon 2025, extra dry","Tramín Babiččine cibéby 2023 History, sladké, 0,5 l"],fallback:{white:"K rybe, hydine a ľahším jedlám je zo Skoupilu dobrý smer suchý Ryzlink rýnský 2024 alebo Veltlínské zelené 2025. Vo Výbere vína nájdem aj ďalšie.",red:"K mäsu a steaku odporúčam Frankovku 2023 Šmatláky z dubových sudov, jemnejší je Merlot 2025. Výber vína ešte zohľadní vašu chuť.",sweet:"Ak máte radi sladšie, skúste polosuchú Pálavu 2025 alebo sladký Tramín Babiččine cibéby k dezertom.",gift:"Na darček sa hodí Frankovka 2023 Šmatláky alebo šumivý ŠUM Sauvignon 2025. Vo Výbere vína zohľadníme, čo má obdarovaný rád.",default:"Ak neviete, kde začať, prejdite Výber vína. Štyri krátke otázky zúžia ponuku Vinařství Skoupil na konkrétne víno."}}
};

function cors(req,res){
  const origin=req.headers.origin||'';
  const ok=origin===''||/(^https:\/\/([a-z0-9-]+\.)?mojchatbot\.sk$)|(^https:\/\/.*\.vercel\.app$)|(^http:\/\/(localhost|127\.0\.0\.1):\d+$)/i.test(origin);
  res.setHeader('Access-Control-Allow-Origin',ok&&origin?origin:'https://mojchatbot.sk');
  res.setHeader('Vary','Origin');res.setHeader('Access-Control-Allow-Methods','POST, OPTIONS');res.setHeader('Access-Control-Allow-Headers','Content-Type');
}
function fallbackReply(demo,text){
  const q=String(text||'').toLocaleLowerCase('sk');
  if(/darč|darc/.test(q))return demo.fallback.gift;
  if(/sladk|dezert/.test(q))return demo.fallback.sweet;
  if(/červen|cerven|mäs|mas|steak|gril/.test(q))return demo.fallback.red;
  if(/biel|ryb|hydin|šalát|salat|ružov|ruzov|šumiv|sumiv|sekt/.test(q))return demo.fallback.white;
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
    `Ste stručný poradca vo vinárstve ${demo.brand} a pomáhate vybrať víno z jeho e-shopu.`,
    'Odpovedajte jednoduchou slovenčinou, maximálne dvoma krátkymi vetami.',
    'Pomáhate s výberom podľa farby, chuti, príležitosti a jedla. Nepropagujte nadmerné pitie a neodporúčajte alkohol maloletým, tehotným ani vodičom.',
    'Odporučiť môžete iba presný názov vína zo zoznamu Overené vína. Nevymýšľajte ceny, ročníky, ocenenia ani chuťové tóny, ktoré nie sú uvedené.',
    `Oficiálny e-shop: ${demo.web}`,
    `Overené vína:\n- ${demo.products.join('\n- ')}`
  ].join('\n\n');
  try{
    const api=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'content-type':'application/json','x-api-key':ANTHROPIC_API_KEY,'anthropic-version':'2023-06-01'},body:JSON.stringify({model:MODEL,max_tokens:160,temperature:0,system,messages})});
    if(!api.ok){console.error('wine Anthropic API error',api.status,await api.text());return fallback();}
    const data=await api.json();const reply=Array.isArray(data.content)?data.content.filter(b=>b.type==='text').map(b=>b.text).join('').trim():'';
    const clean=reply.replace(/[\u002a_\u0060#]/g,'').replace(/\s+/g,' ').trim();if(!clean)return fallback();
    return res.status(200).json({reply:clean});
  }catch(error){console.error('wine chat provider error',error);return fallback();}
}
