const API_KEY = process.env.ANTHROPIC_API_KEY;
const MODEL = process.env.CHAT_MODEL || 'claude-haiku-4-5';
const MAX_HISTORY = 10;
const MAX_CHARS = 700;
const TIMEOUT_MS = 5500;

const PRODUCTS = [
  { id:'ha6', name:'HA⁶ HYDRATATION BOOSTER SERUM', aliases:[/ha\s*⁶/i,/ha\s*6/i,/hydratation booster/i], role:'sérum', texture:'gélová', facts:['6 foriem kyseliny hyalurónovej','bez pridanej parfumácie','oficiálne pre všetky typy pleti'], routine:'pri rannej aplikácii zdroj uvádza následný SPF krok' },
  { id:'bakuchiol', name:'BAKUCHIOL 1 % ANTI-AGE SERUM', aliases:[/bakuchiol/i], role:'sérum', texture:'olejová', facts:['1 % bakuchiol','bez pridanej parfumácie','oficiálne uvedené aj pre citlivú pleť'], routine:'návod uvádza ráno aj večer' },
  { id:'hydration-cream', name:'Hydratačný krém', aliases:[/hydrata[cč]n.{0,8}kr[eé]m/i], role:'krém', texture:'krémová', facts:['vitamín E','bisabolol','oficiálne pre všetky typy pleti'], routine:'čas použitia v overenom výreze produktu nie je špecifikovaný' },
  { id:'problem-cream', name:'Krém pre problematickú pleť', aliases:[/problematick.{0,12}kr[eé]m/i,/kr[eé]m.{0,12}problemat/i], role:'krém', texture:'krémová', facts:['tea tree','kyselina hyalurónová','produktová kategória problematickej pleti'], routine:'čas použitia v overenom výreze produktu nie je špecifikovaný' },
  { id:'salicylic-cleanser', name:'AM/PM ROUTINE CLEANSING GEL 2% SALICYLIC ACID', aliases:[/salicyl/i,/cleansing gel/i,/čistiaci g[eé]l/i,/am\/pm/i], role:'čistenie', texture:'gélová', facts:['2 % kyselina salicylová','bez pridanej parfumácie','200 ml'], routine:'názov produktu ho uvádza ako AM/PM krok' }
];

const MEDICAL = /diagn[oó]z|ekz[eé]m|psori|rosace|infek|alergi|opuch|krvác|hnis|siln.{0,12}boles|vyr[aá]žk|lie[cč]i|vylie[cč]|terapi|lek[aá]r|dermatol/i;
const COMPARE = /porovn|rozdiel|oproti|versus|\bvs\.?\b|a [cč]o/i;

function normalizeMessages(body) {
  const source = Array.isArray(body.messages) ? body.messages : body.message ? [{ role:'user', content:body.message }] : [];
  return source.filter((message) => message && (message.role === 'user' || message.role === 'assistant'))
    .slice(-MAX_HISTORY)
    .map((message) => ({ role:message.role, content:String(message.content || '').trim().slice(0, MAX_CHARS) }))
    .filter((message) => message.content);
}

function matches(text) {
  return PRODUCTS.filter((product) => product.aliases.some((pattern) => pattern.test(text)));
}

function compare(first, second) {
  return `${first.name} je ${first.role} s ${first.texture} textúrou; overené body: ${first.facts.slice(0,2).join(', ')}. ${second.name} je ${second.role} s ${second.texture} textúrou; overené body: ${second.facts.slice(0,2).join(', ')}. Rozhodujte podľa kroku rutiny a textúry, nie podľa medicínskeho prísľubu.`;
}

function previousNamed(messages, latestIndex) {
  for (let index = latestIndex - 1; index >= 0; index -= 1) {
    if (messages[index].role !== 'user') continue;
    const found = matches(messages[index].content);
    if (found.length) return found[found.length - 1];
  }
  return null;
}

export function deterministicTwoReply(messages) {
  const latestIndex = [...messages].map((message) => message.role).lastIndexOf('user');
  const latest = latestIndex >= 0 ? messages[latestIndex].content : '';
  const q = latest.toLocaleLowerCase('sk');
  if (MEDICAL.test(q)) return 'S diagnózou ani liečbou vám cez produktový chatbot nepomôžem. Môžem porovnať iba kozmetické produkty a ich overené vlastnosti; pri výrazných alebo pretrvávajúcich ťažkostiach je vhodná konzultácia s lekárom alebo dermatológom.';

  const current = matches(latest);
  if (current.length >= 2) return compare(current[0], current[1]);
  if (current.length === 1 && COMPARE.test(q)) {
    const previous = previousNamed(messages, latestIndex);
    if (previous && previous.id !== current[0].id) return compare(previous, current[0]);
  }
  if (/s[eé]rum.{0,20}kr[eé]m|kr[eé]m.{0,20}s[eé]rum/.test(q)) return compare(PRODUCTS[0], PRODUCTS[2]);
  if (/hydrat/.test(q)) return 'Pri hydratácii sú najpriamejšie HA⁶ HYDRATATION BOOSTER SERUM a Hydratačný krém. HA⁶ je gélové sérum so 6 formami kyseliny hyalurónovej; Hydratačný krém má krémovú textúru a medzi overenými zložkami vitamín E a bisabolol.';
  if (/bakuchiol/.test(q)) return 'BAKUCHIOL 1 % ANTI-AGE SERUM je olejové sérum s 1 % bakuchiolom. Oficiálny návod uvádza použitie ráno aj večer a produktová stránka ho výslovne uvádza aj pre citlivú pleť.';
  if (/ha\s*⁶|ha\s*6/.test(q)) return 'HA⁶ HYDRATATION BOOSTER SERUM je gélové hydratačné sérum so 6 formami kyseliny hyalurónovej. Oficiálna stránka ho uvádza pre všetky typy pleti a bez pridanej parfumácie.';
  if (/čist|salicyl|cleansing/.test(q)) return 'AM/PM ROUTINE CLEANSING GEL 2% SALICYLIC ACID je čistiaci gél s 2 % kyselinou salicylovou, gélovou textúrou a bez pridanej parfumácie. Zostávam pri produktovej role a zložení; nerobím z toho tvrdenie o liečbe kožného stavu.';
  if (/r[aá]no|ve[cč]er|am|pm/.test(q)) return 'Bakuchiol sérum má v návode výslovne uvedené ráno aj večer. Pri HA⁶ je explicitne popísaná ranná aplikácia a názov AM/PM čistiaceho gélu označuje oba časy; pri ostatných baseline produktoch si čas použitia bez potvrdenia nevymýšľam.';
  if (/s[eé]rum/.test(q)) return compare(PRODUCTS[0], PRODUCTS[1]);
  return 'Môžem porovnať HA⁶, Bakuchiol 1 %, Hydratačný krém, Krém pre problematickú pleť a AM/PM čistiaci gél. Napíšte názov produktu, cieľ ako hydratácia, alebo dva názvy na priame porovnanie.';
}

function cors(request, response) {
  const origin = request.headers?.origin || '';
  const allowed = !origin || /^https:\/\/([a-z0-9-]+\.)?mojchatbot\.sk$/i.test(origin) || /^https:\/\/.*\.vercel\.app$/i.test(origin) || /^http:\/\/(localhost|127\.0\.0\.1):\d+$/i.test(origin);
  response.setHeader('Access-Control-Allow-Origin', allowed && origin ? origin : 'https://mojchatbot.sk');
  response.setHeader('Vary', 'Origin');
  response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function systemPrompt() {
  return [
    'Ste stručný produktový poradca TWO COSMETICS.',
    `Povolený baseline katalóg: ${PRODUCTS.map((product) => `${product.name} — ${product.role}, ${product.texture}, ${product.facts.join(', ')}, ${product.routine}`).join('; ')}.`,
    'Odpovedajte po slovensky v 2 až 4 krátkych vetách.',
    'Nevymýšľajte cenu, dostupnosť, účinok, zloženie, certifikáciu ani vlastnosť mimo uvedeného katalógu.',
    'Nevykonávajte diagnózu, neposkytujte liečebné odporúčanie a netvrďte, že kozmetika lieči alebo vylieči zdravotný stav.',
    'Pri porovnaní používajte históriu a pomenujte rozdiel v produktovej role, textúre, potvrdených zložkách alebo potvrdenom čase použitia.'
  ].join('\n');
}

export default async function handler(request, response) {
  cors(request, response);
  response.setHeader('Cache-Control', 'no-store');
  if (request.method === 'OPTIONS') return response.status(204).end();
  if (request.method !== 'POST') return response.status(405).json({ error:'Method not allowed' });

  let body;
  try { body = typeof request.body === 'string' ? JSON.parse(request.body) : (request.body || {}); }
  catch { return response.status(400).json({ error:'Invalid JSON body' }); }
  if (body.brand && String(body.brand).toLowerCase() !== 'two') return response.status(400).json({ error:'Unknown brand' });
  const messages = normalizeMessages(body);
  if (!messages.some((message) => message.role === 'user')) return response.status(400).json({ error:'Missing user message' });
  const fallback = () => response.status(200).json({ reply:deterministicTwoReply(messages), fallback:true });
  if (!API_KEY) return fallback();

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method:'POST', signal:controller.signal,
      headers:{ 'content-type':'application/json', 'x-api-key':API_KEY, 'anthropic-version':'2023-06-01' },
      body:JSON.stringify({ model:MODEL, max_tokens:280, system:systemPrompt(), messages })
    });
    if (!upstream.ok) return fallback();
    const data = await upstream.json();
    const reply = Array.isArray(data.content) ? data.content.find((block) => block?.type === 'text' && typeof block.text === 'string')?.text?.trim() : '';
    if (!reply) return fallback();
    return response.status(200).json({ reply, fallback:false });
  } catch { return fallback(); }
  finally { clearTimeout(timeout); }
}
