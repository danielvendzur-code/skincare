/* Shared recommendation rules. Uses the complete supplied catalogue, never a top-N subset. */
(function (scope) {
  'use strict';
  const norm = v => String(v || '').normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
  const kinds = [['mask', 'Masky'], ['serum', 'Séra'], ['oil', 'Oleje'], ['gel', 'Gély'], ['cream', 'Krémy']];
  const profiles = ['dry', 'oily', 'sensitive', 'balanced'];
  const goals = ['hydrate', 'calm', 'balance', 'mature', 'clean', 'daily'];
  function prepare(source) {
    return source.map((p, index) => {
      const tags = [...(p.tags || [])];
      const text = norm([p.name, p.kind, p.reason].join(' '));
      const category = p.category || 'face';
      const kind = p.kind || kinds.find(([tag]) => tags.includes(tag))?.[1] || 'Starostlivosť';
      const signals = new Set(tags.filter(t => profiles.includes(t) || goals.includes(t)));
      if (/hydrat|hyaluron|such[aeuoy]|vyziv|zvlacn/.test(text)) signals.add('hydrate');
      if (/citliv|upokoj|zklid|jemne myti/.test(text)) signals.add('calm');
      if (/mastn|mastici|sebum|nedokonal|akne/.test(text)) signals.add('balance');
      if (/vrask|aging|lifting|zrel|spevn/.test(text)) signals.add('mature');
      if (['face','body','hair'].includes(category) && kind!=='Doplnky' && /cist|odlic|mydl|myci|umyv|sprch|sampon|sampuk|cleanser|cleansing|shampoo|soap|wash/.test(text)) signals.add('clean');
      /* Anti-wrinkle care is a face matter; a shower cream is not "for mature skin". */
      if (!['face', 'eyes'].includes(category)) signals.delete('mature');
      if (!signals.has('mature') && !signals.has('clean')) signals.add('daily');
      const amount = Number.isFinite(p.priceAmount) ? p.priceAmount : Number(String(p.price || '').replace(/\s/g, '').replace(',', '.').match(/\d+(?:\.\d+)?/)?.[0]);
      return {...p, id:String(p.id ?? index), category, kind, tags, signals:[...signals], priceAmount:Number.isFinite(amount)?amount:null, currency:p.currency || (/Kč|CZK/.test(p.price || '') ? 'CZK' : 'EUR'), photo:p.photo || p.image};
    });
  }
  function create(source) {
    const products = prepare(source);
    function categoryPool(answers = {}) {
      return products.filter(p => (!answers.category || p.category === answers.category) && (!answers.kind || answers.kind === 'any' || p.kind === answers.kind));
    }
    function recommend(answers = {}) {
      let list = categoryPool(answers).filter(p => p.available !== false);
      // Samples belong to their explicit form; never silently replace the normal product.
      if (!/vzork|sample/i.test(answers.kind || '') && list.some(p => !p.isSample)) list = list.filter(p => !p.isSample);
      if (answers.budget) list = list.filter(p => Number.isFinite(p.priceAmount) && p.priceAmount <= Number(answers.budget));
      if (answers.profile === 'sensitive') list = list.filter(p => p.signals.includes('sensitive') || p.signals.includes('calm') || !/retinol|retinal|aha|bha|peeling|kyselin/.test(norm(p.name + ' ' + p.kind)));
      if (answers.goal && answers.goal !== 'any') list = list.filter(p => p.signals.includes(answers.goal));
      if (answers.profile && answers.profile !== 'any') list = list.filter(p => p.signals.includes(answers.profile));
      const rank = p => (p.signals.includes(answers.profile) ? 8 : 0) + (p.signals.includes(answers.goal) ? 12 : 0);
      const cost=p=>Number.isFinite(p.priceAmount)?p.priceAmount:Infinity;
      list.sort((a, b) => rank(b) - rank(a) || cost(a) - cost(b) || a.name.localeCompare(b.name, 'sk') || a.id.localeCompare(b.id));
      const winner = list[0] || null;
      // An alternative must be a different real product, not a size variant of the winner.
      const alternative = winner ? list.find(p => p.url !== winner.url && norm(p.name) !== norm(winner.name)) || null : null;
      return {winner, alternative, matches:list, profileVerified:!!winner && (answers.profile === 'any' || !answers.profile || winner.signals.includes(answers.profile)), goalVerified:!!winner && (answers.goal === 'any' || !answers.goal || winner.signals.includes(answers.goal))};
    }
    function steps(answers = {}) {
      const categories = [...new Set(products.map(p => p.category))];
      const result = [{key:'category', options:categories}];
      const category = answers.category || categories[0];
      const pool = products.filter(p => p.category === category && p.available !== false);
      const supportedProfiles = profiles.filter(v => pool.some(p => p.signals.includes(v)) && pool.some(p => !p.signals.includes(v)));
      if (['face', 'hair', 'body'].includes(category) && supportedProfiles.length) result.push({key:'profile', options:[...supportedProfiles, 'any']});
      const profilePool = pool.filter(p => !answers.profile || answers.profile === 'any' || p.signals.includes(answers.profile));
      const relevant = goals.filter(v => profilePool.some(p => p.signals.includes(v)) && profilePool.some(p => !p.signals.includes(v)));
      if (relevant.length) result.push({key:'goal', options:[...relevant, 'any']});
      const formPool = pool.filter(p => (!answers.goal || answers.goal === 'any' || p.signals.includes(answers.goal)) && (!answers.profile || answers.profile === 'any' || p.signals.includes(answers.profile)));
      const forms = [...new Set(formPool.map(p => p.kind))];
      if (forms.length > 1) result.push({key:'kind', options:[...forms, 'any']});
      const priced = recommend({...answers, category, budget:''}).matches, limits = (priced[0]?.currency === 'CZK' ? [300, 600, 1000] : [10, 25, 50]).filter(n => { const c = priced.filter(p => Number.isFinite(p.priceAmount) && p.priceAmount <= n).length; return c && c < priced.length; });
      if (limits.length) result.push({key:'budget', options:limits});
      return result;
    }
    return {products, categoryPool, recommend, steps};
  }
  scope.CXAdvisorCore = {create, prepare, norm};
  if (typeof module !== 'undefined' && module.exports) module.exports = scope.CXAdvisorCore;
})(typeof globalThis !== 'undefined' ? globalThis : window);
