const fold=v=>String(v||'').normalize('NFD').replace(/\p{Diacritic}/gu,'').toLowerCase();
// Product type precedes the species mentioned in its purpose. A fertiliser
// for orchids is a care product, while a plant bundled with soil stays a plant.
export function nonLivingKind(name,source={}){
  const title=fold(name);
  if(/^(epipremnum|monstera|philodendron)\b/.test(title)&&/\s\+\s/.test(title))return null;
  if(/substrat|vermikulit/.test(title))return 'substrates';
  if(/vyziv|elixir|hnojiv|\bbio?stimulator|stimulator|insekticid|fungicid|pesticid|postrek|postrik/.test(title))return 'accessories';
  if(/substrat/.test(fold(source.category))&&/substrat/.test(fold(source.factText).slice(0,160)))return 'substrates';
  return null;
}
