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
    },
    dobravinice: {
      name:'Dobrá Vinice', domain:'dobravinice.cz', website:'https://www.dobravinice.cz/',
      theme:{brand:'#2b2624',accent:'#a8143a',soft:'#f5f0ee',paper:'#fdfcfb',ink:'#231f1e',line:'#e7dfdb'},
      wordmark:logo('dobravinice','Dobrá Vinice'),
      hero:'/assets/vino/dobravinice.jpg', mark:'/assets/vino/dobravinice-mark.png',
      markColor:{reverse:'/assets/vino/dobravinice-mark-reverse.png',bg:'#ffffff',bgHover:'#a8143a'},
      ownerNote:'Naturálne vína z Podyjí — pet-naty Crème, cuvée Národní park, Trois či qvevri — s umeleckými etiketami, z ktorých zákazník nevyčíta, čo je vo fľaši.',
      benefit:['Vysvetlí pet-nat, qvevri aj cuvée ľudskou rečou','Vyberie víno k jedlu z naturálnej ponuky','Odpovie aj mimo otváracích hodín'],
      products:[
        {id:'narodnipark',name:'Národní park 2021, cuvée, suché',price:'250 Kč',url:'https://www.dobravinice.cz/p/narodni-park-2021',photo:photo('dobravinice','narodnipark'),tags:['white','crisp','fish'],reason:'Müller Thurgau, Vlašský a Rýnsky ryzlink z Národného parku Podyjí, 16 mesiacov v starších dubových sudoch.'},
        {id:'muller',name:'Müller Thurgau 2022, suché',price:'240 Kč',url:'https://www.dobravinice.cz/p/muller-thurgau-2022',photo:photo('dobravinice','muller'),tags:['white','fruity','fish'],reason:'Jemne minerálna vôňa s dotykom kvetov a ovocia a ovocno-kvetinovým dozvukom — ideálne na každodenné pitie.'},
        {id:'veltlin',name:'Veltlínské zelené 2021, suché',price:'310 Kč',url:'https://www.dobravinice.cz/p/veltlinske-zelene-2021',photo:photo('dobravinice','veltlin'),tags:['white','crisp','fish'],reason:'12 mesiacov v dube: výrazne minerálna, jemne kvetinová vôňa, orieškové tóny a jemná kyselina.'},
        {id:'milerka',name:'Májová Milerka 2021, suché',price:'240 Kč',url:'https://www.dobravinice.cz/p/majova-milerka-2021',photo:photo('dobravinice','milerka'),tags:['white','crisp','cheese'],reason:'Veľmi minerálna, chlebová vôňa a príjemne plná chuť — tiché biele víno z naturálnej rady.'},
        {id:'ryzlink',name:'Ryzlink rýnský 2020 VOC, suché',price:'510 Kč',url:'https://www.dobravinice.cz/p/ryzlink-rynsky-2020',photo:photo('dobravinice','ryzlink'),tags:['white','bold','fish','target'],reason:'Prémiový Ryzlink s potenciálom 10 a viac rokov — vinárstvo ho páruje s rybami, ustricami, maslovou kuchyňou a zrelými syrmi.'},
        {id:'quatre',name:'Quatre Cuvée 2022, suché',price:'360 Kč',url:'https://www.dobravinice.cz/p/quatre-cuvee-2022',photo:photo('dobravinice','quatre'),tags:['white','bold','cheese'],reason:'Štyri odrody zreli spolu 20 mesiacov na kvasniciach v dube; farbivo zo šupiek Pinotu mu dáva sýtu, ružovkastú farbu.'},
        {id:'qvevri',name:'Vlašský ryzlink Qvevri 2017, oranžové, suché',price:'550 Kč',url:'https://www.dobravinice.cz/p/vlassky-ryzlink-qvevri-2017',photo:photo('dobravinice','qvevri'),tags:['white','bold','cheese','target'],reason:'Oranžové víno: 9 mesiacov na šupkách v qvevri a rok v novom dube — minerálna, koňakovo-medová chuť.'},
        {id:'rubin',name:'Pinot Noir Rubín 2018, suché',price:'410 Kč',url:'https://www.dobravinice.cz/p/pinot-noir-rubin-2018',photo:photo('dobravinice','rubin'),tags:['rose','bold','cheese'],reason:'Ružové z Pinot Noir, 12 mesiacov v dube na kvasniciach — jemná vôňa a chuť s nádychom sherry.'},
        {id:'frankovka',name:'Frankovka Ibérico 2023, suché',price:'290 Kč',url:'https://www.dobravinice.cz/p/frankovka-iberico-2023',photo:photo('dobravinice','frankovka'),tags:['red','fruity','meat'],reason:'Svieža a ovocná Frankovka, ktorú si budete chcieť objednať znova — k mäsu aj na posedenie.'},
        {id:'trois',name:'Trois 2022, červené cuvée, suché',price:'370 Kč',url:'https://www.dobravinice.cz/p/trois-2022',photo:photo('dobravinice','trois'),tags:['red','bold','meat','target'],reason:'Červené cuvée, ktoré zrelo 18 mesiacov na vlastných kvasniciach v starších dubových sudoch.'},
        {id:'kambrium',name:'Crème de Kambrium 2022, pet-nat, suché',price:'280 Kč',url:'https://www.dobravinice.cz/p/creme-de-kambrium-2022',photo:photo('dobravinice','kambrium'),tags:['sparkling','crisp','cheese'],reason:'Prírodné perlivé víno s chlebovo-minerálnou vôňou a plnou chuťou — pet-nat, ktorý chutí kedykoľvek počas dňa.'},
        {id:'cremeriesling',name:'Crème de Riesling 2020, pet-nat, suché',price:'290 Kč',url:'https://www.dobravinice.cz/p/creme-de-riesling-2020',photo:photo('dobravinice','cremeriesling'),tags:['sparkling','crisp','fish','target'],reason:'Pet-nat z Rýnskeho ryzlinku, kvasený a zretý v starších francúzskych dubových sudoch.'}
      ]
    },
    magula: {
      name:'Vinárstvo Magula', domain:'vinomagula.sk', website:'https://www.vinomagula.sk/',
      theme:{brand:'#8c1f27',accent:'#2a2322',soft:'#f7f2ef',paper:'#fdfbfa',ink:'#221c1b',line:'#ebe0dc'},
      wordmark:logo('magula','Vinárstvo Magula'),
      hero:'/assets/vino/magula.jpg', mark:'/assets/vino/magula-mark.png', headerLogo:'/assets/vino/magula-logo-header.png',
      ownerNote:'Remeselné bio vína zo Suchej nad Parnou — Vlci, Rosenberg, Teufelstal, Carboniq či Lupo! — názvy, pri ktorých zákazník potrebuje poradiť, čo je vo fľaši.',
      benefit:['Vysvetlí rad Vlkov aj jednotlivé vinice','Vyberie z vyše 25 vín podľa chuti a jedla','Odpovie aj mimo otváracích hodín'],
      products:[
        {id:'bielyvlk',name:'Biely vlk 2023',price:'19 €',url:'https://www.vinomagula.sk/produkt/biely-vlk-2023/',photo:photo('magula','bielyvlk'),tags:['white','crisp','fish'],reason:'Biele víno z Frankovky a Pinot noir technológiou blanc de noir, 12 mesiacov v amfore — svieže, s výraznou kyselinkou (91 bodov Falstaff).'},
        {id:'devin',name:'Jungberg Devín 2023',price:'19 €',url:'https://www.vinomagula.sk/produkt/jungberg-devin-2023/',photo:photo('magula','devin'),tags:['white','fruity','fish','target'],reason:'Single vineyard Devín z najvyššie položenej vinice na Mladej hore — elegantný, šťavnatá kyselinka a nádherná aromatika (92 bodov Falstaff).'},
        {id:'orange',name:'Oranžový vlk 2023, oranžové víno',price:'19 €',url:'https://www.vinomagula.sk/produkt/oranzovy-vlk-2023/',photo:photo('magula','orange'),tags:['white','bold','cheese'],reason:'Tramín, Veltlín a Rizling vlašský z Vlčej doliny — svieže, živé oranžové víno s pevnou štruktúrou a jemnou aromatikou Tramínu.'},
        {id:'ruzovy',name:'Ružový vlk 2022',price:'13 €',url:'https://www.vinomagula.sk/produkt/ruzovy-vlk-2022/',photo:photo('magula','ruzovy'),tags:['rose','fruity','fish'],reason:'Temperamentné rosé z Modrého Portugalu a Frankovky — intenzívna farba, plná, no svieža chuť a výrazný charakter.'},
        {id:'sen',name:'Magula, Gabay, Bernheim: Sen 2020',price:'22 €',url:'https://www.vinomagula.sk/produkt/sen-2020/',photo:photo('magula','sen'),tags:['rose','bold','meat','target'],reason:'Tmavé prírodné rosé zo spolupráce s Elizabeth Gabay MW, zreté v bordeauxských sudoch — menej ako 2000 fliaš, aj na zimné večery.'},
        {id:'lupo',name:'Lupo! #1, šumivé víno',price:'16 €',url:'https://www.vinomagula.sk/produkt/lupo-1/',photo:photo('magula','lupo'),tags:['sparkling','crisp','fish'],reason:'Ultra ľahké a svieže bublinky z Rizlingu vlašského, dokvasené vo fľaši s muštom z Frankovky a ponechané na kaloch.'},
        {id:'carboniq',name:'Carboniq 2023',price:'13 €',url:'https://www.vinomagula.sk/produkt/carboniq-2023/',photo:photo('magula','carboniq'),tags:['red','fruity','fish'],reason:'Modrý Portugal metódou macération carbonique — dominujú lesné jahody, svieža ovocnosť a prirodzená jemnosť.'},
        {id:'pinot',name:'Teufelstal Pinot noir 2022',price:'19 €',url:'https://www.vinomagula.sk/produkt/teufelstal-pinot-noir-2022/',photo:photo('magula','pinot'),tags:['red','fruity','meat'],reason:'Vyvážený, ovocný, a pritom plný a veľmi lahodný Pinot noir, zretý v novších aj starších dubových sudoch.'},
        {id:'frankovka',name:'Rosenberg Frankovka 2021',price:'19 €',url:'https://www.vinomagula.sk/produkt/rosenberg-frankovka-2021/',photo:photo('magula','frankovka'),tags:['red','bold','meat'],reason:'Korenistá a živá Frankovka, 24 mesiacov v 225- a 500-litrových sudoch — vinárstvo ju odporúča na párovanie s jedlom.'},
        {id:'cervenyvlk',name:'Červený vlk 2020',price:'19 €',url:'https://www.vinomagula.sk/produkt/cerveny-vlk-2020/',photo:photo('magula','cervenyvlk'),tags:['red','bold','meat'],reason:'Zamatovo čokoládový Dunaj s paprikovým Hronom — plnokrvné, mohutné červené víno klasického štýlu z dubových sudov.'},
        {id:'baccara',name:'Baccara 2019',price:'21 €',url:'https://www.vinomagula.sk/produkt/baccara-2019/',photo:photo('magula','baccara'),tags:['red','fruity','cheese'],reason:'Víno z odrody Rosa, pestovanej na suchovskej Ružovej hore — vo farbe, vôni aj chuti sa skrýva kráľovná ruží Black Baccara.'},
        {id:'portugal',name:'Teufelsecke Modrý Portugal 2017',price:'60 €',url:'https://www.vinomagula.sk/produkt/teufelsecke-modry-portugal-2017/',photo:photo('magula','portugal'),tags:['red','bold','meat','target'],reason:'Celé strapce 3 týždne v otvorenej kadi a 33 mesiacov v starom dubovom sude — archívny Portugal na výnimočnú príležitosť.'}
      ]
    },
    jurasek: {
      name:'Víno Jurášek', domain:'vinojurasek.sk', website:'https://vinojurasek.sk/',
      theme:{brand:'#1a1817',accent:'#a8843f',soft:'#f6f2ea',paper:'#fdfcf9',ink:'#1a1817',line:'#e8e0d0'},
      wordmark:logo('jurasek','Víno Jurášek'),
      hero:'/assets/vino/jurasek.jpg', mark:'/assets/vino/jurasek-mark.png',
      markColor:{reverse:'/assets/vino/jurasek-mark-reverse.png',bg:'#1a1817',bgHover:'#cbaa63'},
      ownerNote:'Vyše 15 vín zo Šenkvíc — suché, polosuché aj sladké biele, frizzante, rosé a barrique Pinot — a zákazník nevie, ktorá fľaša sadne k večeri.',
      benefit:['Vyberie víno podľa chuti aj sladkosti','Poradí frizzante na oslavu či rosé na leto','Odpovie aj mimo otváracích hodín'],
      products:[
        {id:'rizling',name:'Rizling rýnsky 2025, suché',price:'10 €',url:'https://vinojurasek.sk/vino/rizling-rynsky-2025/',photo:photo('jurasek','rizling'),tags:['white','crisp','fish'],reason:'Lahodná plná chuť so zlatistou farbou a vôňou lipového kvetu — klasický suchý Rizling k rybe a ľahkým jedlám.'},
        {id:'veltlin',name:'Veltlínske zelené 2025, suché',price:'10 €',url:'https://vinojurasek.sk/vino/veltlinske-zelene-2025/',photo:photo('jurasek','veltlin'),tags:['white','crisp','fish'],reason:'Plná chuť s vôňou záhradného ovocia a vlašského orecha — suchý Veltlín k hydine a šalátom.'},
        {id:'sauvignon',name:'Sauvignon blanc 2025, suché',price:'10 €',url:'https://vinojurasek.sk/vino/sauvignon-blanc-2025/',photo:photo('jurasek','sauvignon'),tags:['white','crisp','fish'],reason:'Víno plné sviežosti so žltozelenou farbou a výraznou vôňou broskýň a egreša.'},
        {id:'muskat',name:'Muškát moravský 2025, polosuché',price:'10 €',url:'https://vinojurasek.sk/vino/muskat-moravsky-2025/',photo:photo('jurasek','muskat'),tags:['white','fruity','cheese'],reason:'Svieža harmonická chuť s výraznou muškátovou arómou, bielymi kvetmi, broskyňami a citrusmi.'},
        {id:'palava',name:'Pálava 2024, sladké',price:'12 €',url:'https://vinojurasek.sk/vino/palava-2024/',photo:photo('jurasek','palava'),tags:['white','sweet','cheese','target'],reason:'Plná, mierne korenistá chuť s typickým buketom Pálavy z panenskej úrody na Morave — sladké víno k dezertom.'},
        {id:'frizzbiele',name:'Frizzante biele 2023, polosuché',price:'10 €',url:'https://vinojurasek.sk/vino/frizzante-biele-2023/',photo:photo('jurasek','frizzbiele'),tags:['sparkling','fruity','cheese'],reason:'Perlivé víno s ovocnou vôňou a medovými tónmi — ľahké bublinky na oslavu či posedenie.'},
        {id:'frizzruz',name:'Frizzante ružové 2023, polosuché',price:'12 €',url:'https://vinojurasek.sk/vino/frizzante-ruzove-2023/',photo:photo('jurasek','frizzruz'),tags:['sparkling','fruity','fish','target'],reason:'Ružové perlivé víno s ovocnou vôňou a medovými tónmi — svieži prípitok na leto.'},
        {id:'rose',name:'Cabernet Sauvignon rosé 2024, suché',price:'10 €',url:'https://vinojurasek.sk/vino/cabernet-sauvignon-rose-2023/',photo:photo('jurasek','rose'),tags:['rose','crisp','fish'],reason:'Ľahké ružové víno s malinovo-ríbezľovým odtieňom a chuťou lesných jahôd z južných svahov Jasovej.'},
        {id:'dornfelder',name:'Dornfelder 2024, suché',price:'10 €',url:'https://vinojurasek.sk/vino/dornfelder-2023/',photo:photo('jurasek','dornfelder'),tags:['red','fruity','meat'],reason:'Plná chuť zrelých černíc s rubínovou farbou, v závere prechádza až do čokolády.'},
        {id:'alibernet',name:'Alibernet 2021, suché',price:'10 €',url:'https://vinojurasek.sk/vino/alibernet-2021/',photo:photo('jurasek','alibernet'),tags:['red','bold','meat'],reason:'Výrazné červené víno so zrelými černicami a bobuľovým ovocím a čokoládovým záverom — k mäsu a grilu.'},
        {id:'pinot',name:'Pinot Noir Barrique 2020, suché',price:'15 €',url:'https://vinojurasek.sk/vino/pinot-noir-barrique-2020/',photo:photo('jurasek','pinot'),tags:['red','bold','meat','target'],reason:'Barikové víno plnej chuti po zrelých černiciach s rubínovou farbou a čokoládovým záverom.'}
      ]
    }
  });
})();
