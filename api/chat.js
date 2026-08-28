const catalogReplies = {
  mylo: 'Z ponuky Mylo by som podľa tejto preferencie začal jemným čistením a hydratáciou. Ak chcete konkrétny produkt, Výber starostlivosti vás prevedie štyrmi krokmi.',
  ponio: 'V ponuke Ponio záleží najmä na tom, či hľadáte pleťový krém, čistenie alebo starostlivosť o vlasy. Štyri krátke kroky výber spresnia.',
  two: 'Pri TWO COSMETICS sa dá výber zúžiť podľa typu pleti, textúry a aktívnej starostlivosti. Odporúčanie zostane v hraniciach aktuálneho katalógu.',
  bellcoria: 'Bellcoria ponúka séra, oleje aj čistenie. Podľa vašich preferencií vieme vybrať konkrétnu jemnú starostlivosť bez zdravotných diagnóz.',
  biofy: 'V Biofy sa dá výber rozdeliť medzi pleť, vlasy a telo. Vo Výbere starostlivosti nájdeme konkrétny produkt podľa vašej rutiny.',
  anemone: 'Anemone má pleťové oleje, kvetové vody, balzamy aj vlasovú starostlivosť. Pomôžem vám zúžiť výber na konkrétny produkt.'
};

export default async function handler(request, response) {
  if (request.method !== 'POST') return response.status(405).json({ error: 'Method not allowed' });
  const { brand = 'mylo', message = '' } = request.body || {};
  const fallback = catalogReplies[brand] || catalogReplies.mylo;
  if (!process.env.ANTHROPIC_API_KEY) return response.status(200).json({ reply: fallback });
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5500);
    const upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST', signal: controller.signal,
      headers: { 'content-type': 'application/json', 'x-api-key': process.env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: 'claude-3-5-haiku-latest', max_tokens: 180, system: `Si produktový poradca značky ${brand}. Nediagnostikuj zdravotné stavy. Nevymýšľaj produkty ani tvrdenia. Ak si nie si istý, odporuč štyri kroky výberu. Odpovedaj stručne po slovensky.`, messages: [{ role: 'user', content: String(message).slice(0, 700) }] })
    });
    clearTimeout(timeout);
    if (!upstream.ok) throw new Error('provider');
    const data = await upstream.json();
    return response.status(200).json({ reply: data.content?.[0]?.text || fallback });
  } catch { return response.status(200).json({ reply: fallback }); }
}
