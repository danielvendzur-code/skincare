/* Wine demos on the skincare engine (cosmetics.js + its layers). Each winery
   is added here in the shape of cosmetics-config.js; wines, prices, links and
   photos come from the winery's own e-shop. Loaded right after
   cosmetics-config.js. */
(() => {
  'use strict';
  const data = window.COSMETICS_DEMOS;
  if (!data) return;

  const logo = (slug, name) => `<img class="cx-wordmark cx-logo" src="/assets/vino/${slug}-logo.png" alt="${name}">`;
  const photo = (slug, id) => `/assets/vino/${slug}-${id}.jpg`;

  Object.assign(data.brands, {
    skoupil: {
      name:'Vinařství Skoupil', domain:'skoupil.com', website:'https://eshop.skoupil.com/',
      theme:{brand:'#1d1d1b',accent:'#c98a00',soft:'#f6f3ea',paper:'#fdfcf8',ink:'#1d1d1b',line:'#e8e2d2'},
      wordmark:logo('skoupil','Vinařství Skoupil'),
      hero:'/assets/vino/skoupil.jpg', mark:'/assets/vino/skoupil-mark.png', headerLogo:'/assets/vino/skoupil-logo-header.png',
      markColor:{reverse:'/assets/vino/skoupil-mark-reverse.png',bg:'#1d1d1b',bgHover:'#ffbb00'},
      ownerNote:'Vyše 25 vín z Velkých Bílovic — pozdné zbery, trate Šmatláky či Frejúnky, sekty aj dezertné — a zákazník nevie, ktoré otvoriť k večeri.',
      benefit:['Z 25+ vín to pravé k jedlu aj na darček','Poskladá trio na ochutnanie alebo kartón','Odpovie aj mimo otváracích hodín'],
      products:[
        {id:'ryzlink',name:'Ryzlink rýnský 2024, pozdní sběr, suché',price:'212 Kč',url:'https://eshop.skoupil.com/p/ryzlink-rynsky-2024-pozdni-sber-suche',photo:photo('skoupil','ryzlink'),tags:['white','crisp','fish'],reason:'Broskyne a citrusy prechádzajúce do kvetov, s pikantnou šťavnatou kyselinkou — svieži Ryzlink k rybe a ľahkým jedlám.'},
        {id:'veltlin',name:'Veltlínské zelené 2025, suché',price:'212 Kč',url:'https://eshop.skoupil.com/p/veltlinske-zelene-2025',photo:photo('skoupil','veltlin'),tags:['white','crisp','fish'],reason:'Biele korenie, žlté jablko a mandle so sviežou kyselinkou — vinárstvo ho odporúča k hydine a zeleninovým jedlám.'},
        {id:'sauvignon',name:'Sauvignon 2025, polosuché',price:'212 Kč',url:'https://eshop.skoupil.com/p/sauvignon-2025',photo:photo('skoupil','sauvignon'),tags:['white','fruity','fish'],reason:'Aromatické a svieže víno s vôňou žihľavy, ríbezlí, egreša a marhule, ktoré v závere podčiarkne lahodná kyselinka.'},
        {id:'palava',name:'Pálava 2025, polosuché',price:'212 Kč',url:'https://eshop.skoupil.com/p/palava-2025',photo:photo('skoupil','palava'),tags:['white','fruity','cheese'],reason:'Ruže, muškát a exotické ovocie s medovou hebkosťou — vinárstvo ju páruje s dezertmi ako panna cotta či tvarohový koláč.'},
        {id:'tramin',name:'Tramín červený 2024 Úlehle, suché',price:'297 Kč',url:'https://eshop.skoupil.com/p/tramin-cerveny-2024-ulehle',photo:photo('skoupil','tramin'),tags:['white','bold','cheese','target'],reason:'Rodinný klenot z trate Úlehle — výrazný suchý Tramín k aromatickým syrom, predjedlám či jemne pikantnej ázijskej kuchyni.'},
        {id:'frankovka',name:'Frankovka 2023 Šmatláky, suché',price:'425 Kč',url:'https://eshop.skoupil.com/p/frankovka-2023-smatlaky',photo:photo('skoupil','frankovka'),tags:['red','bold','meat','target'],reason:'24 mesiacov v dubových sudoch: červené ríbezle, čerešne, tabak a klinček s pevnou trieslovinou — ideálna k hovädziemu steaku.'},
        {id:'pinot',name:'Pinot Noir 2023 Frejúnky, suché',price:'425 Kč',url:'https://eshop.skoupil.com/p/pinot-noir-2023-frejunky',photo:photo('skoupil','pinot'),tags:['red','bold','meat'],reason:'Elegantný Pinot Noir z dubových sudov s vôňou zrelých malín a dymu — vinárstvo ho podáva k tatárskemu bifteku.'},
        {id:'merlot',name:'Merlot 2025, pozdní sběr, suché',price:'212 Kč',url:'https://eshop.skoupil.com/p/merlot-pozdni-sber-2025',photo:photo('skoupil','merlot'),tags:['red','fruity','meat'],reason:'Zamatový suchý Merlot hlbokej rubínovej farby s bohatým buketom — na večere, rodinné oslavy aj ako darček.'},
        {id:'sum',name:'ŠUM Sauvignon 2025, extra dry',price:'254 Kč',url:'https://eshop.skoupil.com/p/sum-sauvignon-2025-brut',photo:photo('skoupil','sum'),tags:['sparkling','crisp','fish','target'],reason:'Šumivý Sauvignon v tradícii deda Petra, priekopníka moravských sektov — na slávnostné chvíle a oslavy.'},
        {id:'cibeby',name:'Tramín Babiččine cibéby 2023 History, sladké, 0,5 l',price:'425 Kč',url:'https://eshop.skoupil.com/p/babiccine-cibeby-2023-history',photo:photo('skoupil','cibeby'),tags:['white','sweet','cheese','target'],reason:'Sladký Tramín s tónmi marakuje, žltého melóna a prezretého manga s medovo-korenistou dochuťou — k dezertom a syrom.'}
      ]
    }
  });
})();
