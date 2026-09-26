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
    },
    nechory: {
      name:'Vinařství Nechory', domain:'vinarstvinechory.cz', website:'https://eshop.vinarstvinechory.cz/',
      theme:{brand:'#4a1f28',accent:'#c8702a',soft:'#f4eeea',paper:'#fdfbf9',ink:'#231c1d',line:'#e8ddd8'},
      wordmark:logo('nechory','Vinařství Nechory'),
      hero:'/assets/vino/nechory.jpg', mark:'/assets/vino/nechory-mark.png', headerLogo:'/assets/vino/nechory-logo-header.png',
      ownerNote:'Takmer 40 vín zo Slovácka — od suchého Sauvignonu cez Pálavu až po Cabernet Reserve a sekty — a zákazník sa nevie rozhodnúť, čo k jedlu.',
      benefit:['Z takmer 40 vín to pravé k jedlu','Rosé, sekty aj dezertné vína podľa chuti','Odpovie aj mimo otváracích hodín'],
      products:[
        {id:'sauvignon',name:'Sauvignon Blanc 2025, pozdní sběr, suché',price:'234 Kč',url:'https://eshop.vinarstvinechory.cz/sauvignon-blanc_25/',photo:photo('nechory','sauvignon'),tags:['white','crisp','fish'],reason:'Zrelé broskyne, egreš a kvet bazy so sviežou kyselinkou — vinárstvo ho odporúča k letným šalátom, rybám a kozím syrom.'},
        {id:'veltlin',name:'Veltlínské zelené 2024, pozdní sběr, suché',price:'226 Kč',url:'https://eshop.vinarstvinechory.cz/veltlinske-zelene_24/',photo:photo('nechory','veltlin'),tags:['white','crisp','fish'],reason:'Zelené korenie, červený egreš a minerálna chuť s mandľovým tónom — k rybám, studeným mäsám aj k rezňu.'},
        {id:'chardonnay',name:'Chardonnay 2024, pozdní sběr, suché',price:'224 Kč',url:'https://eshop.vinarstvinechory.cz/chardonnay_2024/',photo:photo('nechory','chardonnay'),tags:['white','bold','fish'],reason:'Plná, dlhá chuť s tónom exotického ovocia — k morským plodom na masle, pečenému kurčaťu či cestovinám so smotanou.'},
        {id:'muskat',name:'Muškát Ottonel 2024, pozdní sběr, polosladké',price:'234 Kč',url:'https://eshop.vinarstvinechory.cz/muskat-ottonel-24/',photo:photo('nechory','muskat'),tags:['white','fruity','cheese'],reason:'Intenzívna aróma machovky, liči a grepu s muškátovým orieškom — skvelý aperitív aj k ovocným šalátom.'},
        {id:'palava',name:'Pálava 2024, výběr z hroznů, polosladké',price:'242 Kč',url:'https://eshop.vinarstvinechory.cz/palava-24/',photo:photo('nechory','palava'),tags:['white','sweet','cheese','target'],reason:'Čajová ruža, jazmín a mandarínky s medovo nasladlou chuťou — k syrom s modrou plesňou a čokoládovým dezertom.'},
        {id:'tramin',name:'Tramín červený 2023, výběr z hroznů, polosladké',price:'242 Kč',url:'https://eshop.vinarstvinechory.cz/tramin-cerveny_23/',photo:photo('nechory','tramin'),tags:['white','sweet','cheese'],reason:'Z trate Židlíky: vôňa ruží a fialiek, plná chuť s prezretým mangom — vinárstvo ho odporúča k sladkým dezertom.'},
        {id:'rose',name:'Rulandské modré rosé 2024, pozdní sběr, polosuché',price:'226 Kč',url:'https://eshop.vinarstvinechory.cz/rulandske-modre-rose_24/',photo:photo('nechory','rose'),tags:['rose','fruity','fish'],reason:'Jahody a čierne čerešne v plnej, no svežej chuti — ku grilovaniu, ľahkým cestovinovým šalátom či mozzarelle.'},
        {id:'pinot',name:'Rulandské modré 2023, výběr z hroznů, suché',price:'242 Kč',url:'https://eshop.vinarstvinechory.cz/rulandske-modre-3/',photo:photo('nechory','pinot'),tags:['red','fruity','meat'],reason:'Lesné jahody, brusnice a jemné drevo so zamatovou textúrou — ku kačacine, paštétam a hubovým jedlám.'},
        {id:'cabernet',name:'Cabernet Sauvignon RESERVE 2021, pozdní sběr, suché',price:'280 Kč',url:'https://eshop.vinarstvinechory.cz/cabernet-sauvignon_21-2/',photo:photo('nechory','cabernet'),tags:['red','bold','meat','target'],reason:'Jahody a slivky, korenie a čokoládový dozvuk — k tmavým mäsám, zverine a jahňaciemu s tymiánom.'},
        {id:'catherine',name:'Cuvée Catherine OAK 2023, výběr z hroznů, suché',price:'280 Kč',url:'https://eshop.vinarstvinechory.cz/cuvee-catherine-oak-2023/',photo:photo('nechory','catherine'),tags:['red','bold','meat','target'],reason:'Ostružiny, višne, vanilka a horká čokoláda z barrique sudov — mimoriadne plné cuvée s dlhým hrejivým záverom.'},
        {id:'brut',name:'Riesling Select BRUT 2023, klasická metoda',price:'368 Kč',url:'https://eshop.vinarstvinechory.cz/riesling-select-brut-2023/',photo:photo('nechory','brut'),tags:['sparkling','crisp','fish','target'],reason:'Sekt kvasený vo fľaši s tónmi lipového kvetu a zrelých citrusov — k rybám, morským plodom a ľahkým predjedlám.'},
        {id:'euphoria',name:'Euphoria Sparkling 2025, perlivé, polosuché',price:'216 Kč',url:'https://eshop.vinarstvinechory.cz/euphoria-sparkling-25/',photo:photo('nechory','euphoria'),tags:['sparkling','fruity','cheese'],reason:'Ovocno-kvetinová aróma a svieža chuť — k miskám s ovocím, jednohubkám alebo len tak na letný večer.'}
      ]
    }
  });
})();
