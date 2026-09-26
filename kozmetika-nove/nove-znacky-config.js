/* Twelve new skincare demos on the same engine as the original eighteen
   (cosmetics.js + its layers). Each brand is added here in the exact shape of
   cosmetics-config.js; products, prices, links and photos come from the
   brand's own e-shop. Loaded right after cosmetics-config.js. */
(() => {
  'use strict';
  const data = window.COSMETICS_DEMOS;
  if (!data) return;

  const logo = (slug, name) => `<img class="cx-wordmark cx-logo" src="/assets/cosmetics/${slug}-logo.png" alt="${name}">`;
  const photo = (slug, id) => `/assets/cosmetics/${slug}-${id}.jpg`;

  Object.assign(data.brands, {
    dulcia: {
      name:'Dulcia', domain:'dulcia.sk', website:'https://www.dulcia.sk/',
      theme:{brand:'#3b3639',accent:'#9d57a8',soft:'#f3eef3',paper:'#fdfcfd',ink:'#2d292c',line:'#e6dde6'},
      wordmark:logo('dulcia','Dulcia natural'),
      hero:'/assets/cosmetics/dulcia.jpg', mark:'/assets/cosmetics/dulcia-mark.png',
      ownerNote:'Krémy, séra, boostre aj esencie delené podľa účinku — zákazník nevie, či siahnuť po lipidoch, probiotikách alebo hyalurónke.',
      benefit:['Z desiatok krémov a sér jeden konkrétny','Výber podľa pleti, nie podľa názvu účinnej látky','Odpovie aj mimo otváracích hodín'],
      products:[
        {id:'lipidy',name:'Výživný pleťový krém s lipidmi',price:'22,50 €',url:'https://www.dulcia.sk/pletove-kremy/vyzivny-pletovy-krem-s-lipidmi-na-suchu-plet.html',photo:photo('dulcia','lipidy'),tags:['dry','hydrate','cream','simple'],reason:'Regeneračný krém so šípkovým olejom, ektoínom a provitamínom B5 — intenzívna hydratácia pre suchú pleť, ktorá sa cíti napnutá.'},
        {id:'akne',name:'Pleťový krém na akné – čistiaci komplex',price:'19,50 €',url:'https://www.dulcia.sk/pletove-kremy/pletovy-krem-na-akne-cistiaci-komplex.html',photo:photo('dulcia','akne'),tags:['oily','clarity','cream','target'],reason:'Ľahký krém, ktorý reguluje tvorbu mazu, zmatňuje a pomáha proti komedónom — pre mastnejšiu pleť so sklonom k nedokonalostiam.'},
        {id:'mikro',name:'Nočné mikrobiotické pleťové sérum – Upokojujúce',price:'23,50 €',url:'https://www.dulcia.sk/pletove-sera/nocne-mikrobioticke-pletove-serum-upokojujuce.html',photo:photo('dulcia','mikro'),tags:['sensitive','calm','serum','basic'],reason:'Probiotiká a upokojujúce výťažky pracujú cez noc — cielený krok pre citlivú pleť, ktorá ľahko sčervenie alebo reaguje.'},
        {id:'vrasky',name:'Sérum proti vráskam s kyselinou hyalurónovou',price:'25,90 €',url:'https://www.dulcia.sk/pletove-sera/serum-proti-vraskam-s-kyselinou-hyaluronovou.html',photo:photo('dulcia','vrasky'),tags:['mature','dry','hydrate','serum','full'],reason:'Kyselina hyalurónová s anti-glykačnou formulou vypína pokožku a redukuje jemné linky — pre zrelšiu pleť, ktorá chce pružnosť.'},
        {id:'lahky',name:'Ľahký hydratačný krém',price:'17,50 €',url:'https://www.dulcia.sk/pletove-kremy/lahky-hydratacny-krem.html',photo:photo('dulcia','lahky'),tags:['balanced','hydrate','cream','simple','basic','any'],reason:'Rýchlo sa vstrebe a nezanechá mastný pocit — každodenná hydratácia pre normálnu až zmiešanú pleť v jednom kroku.'},
        {id:'olej',name:'Bioaktívne olejové sérum',price:'22,50 €',url:'https://www.dulcia.sk/pletove-boostre-a-oleje/bioaktivne-olejove-serum.html',photo:photo('dulcia','olej'),tags:['dry','mature','sensitive','oil','target','full'],reason:'Olejové sérum uzamkne vlhkosť a obnovuje hydrolipidický film — pár kvapiek pre suchú, zrelšiu alebo citlivú pleť.'}
      ]
    },
    yemna: {
      name:'Yemna', domain:'yemna.sk', website:'https://www.yemna.sk/',
      theme:{brand:'#5a3a24',accent:'#cf4f82',soft:'#f5efec',paper:'#fffdfc',ink:'#2e2019',line:'#eadfd9'},
      wordmark:logo('yemna','YEMNA cosmetics'),
      hero:'/assets/cosmetics/yemna.jpg', mark:'/assets/cosmetics/yemna-mark.png',
      ownerNote:'Krémy, oleje a emulzie s menami ako Moruša, AveQ10 či CICA — zákazník z názvu nevyčíta, ktorý je pre jeho pleť.',
      benefit:['Z ručne vyrábaných krémov jeden konkrétny','Výber podľa typu pleti, ako to robí poradňa','Odpovie aj mimo otváracích hodín'],
      products:[
        {id:'slivka',name:'Slivka & Ibištek pleťový krém',price:'11,90 €',url:'https://www.yemna.sk/slivka-ibistek-pletovy-krem/',photo:photo('yemna','slivka'),tags:['dry','hydrate','cream','simple'],reason:'Našľahaný krém z bambuckého a kakaového masla — výživa a hydratácia pre suchú až veľmi suchú, dehydratovanú pleť.'},
        {id:'intense',name:'INTENSE CLARIFYING rozjasňujúca emulzia 30 ml',price:'29,90 €',url:'https://www.yemna.sk/intense-clarifying-rozjasnujuca-emulzia-2/',photo:photo('yemna','intense'),tags:['oily','balanced','clarity','serum','target'],reason:'Ľahká emulzia s TXA a stabilným vitamínom C na nerovnomerný tón a stopy po akné — rozjasní bez zaťaženia pokožky.'},
        {id:'cica',name:'CICA Micro repair cream 50 ml',price:'31,90 €',url:'https://www.yemna.sk/cica-micro-repair-cream/',photo:photo('yemna','cica'),tags:['sensitive','calm','cream','basic','simple'],reason:'Krém s ceramidmi a ektoínom upokojuje citlivú pleť a podporuje obnovu kožnej bariéry — ráno aj večer.'},
        {id:'aveq10',name:'AVEQ10 hydratačný pleťový krém proti vráskam 50 ml',price:'26,50 €',url:'https://www.yemna.sk/aveq10-hydratacny-pletovy-krem-proti-vraskam/',photo:photo('yemna','aveq10'),tags:['balanced','hydrate','cream','simple','basic','any'],reason:'Denný hydratačný krém s piatimi aktívnymi látkami — pre všetky typy pleti, aj dehydratovanú a so sklonom k začervenaniu.'},
        {id:'morusa',name:'Moruša výživný pleťový krém 50 ml',price:'25,50 €',url:'https://www.yemna.sk/morusa-vyzivny-pletovy-krem-na-regeneraciu-a-spevnenie/',photo:photo('yemna','morusa'),tags:['mature','dry','cream','full'],reason:'Moruša, sladké drievko, niacín, Q10 a kyselina hyalurónová — regenerácia a spevnenie suchej a zrelej pleti.'},
        {id:'olej',name:'Omladenie s Q10 a bakuchiolom – pleťový olej 30 ml',price:'25,50 €',url:'https://www.yemna.sk/omladenie-s-q10-a-bakuchiol-pletovy-olej/',photo:photo('yemna','olej'),tags:['mature','oil','target','full'],reason:'Rastlinný olej s bakuchiolom, šetrnou alternatívou retinolu — pár kvapiek na noc pre pružnosť zrelšej pleti.'},
        {id:'tonikum',name:'Obnova pleťové tonikum s niacínom',price:'15,30 €',url:'https://www.yemna.sk/obnova-pletove-tonikum-s-niacinom/',photo:photo('yemna','tonikum'),tags:['balanced','oily','hydrate','basic','full'],reason:'Jemne dočistí, hydratuje a podporuje zdravý mikrobióm pleti — ľahký krok medzi čistením a krémom pre každý typ pleti.'}
      ]
    },
    namy: {
      name:'NAMY', domain:'namy.sk', website:'https://www.namy.sk/',
      theme:{brand:'#242526',accent:'#c8185c',soft:'#f6efe8',paper:'#fffdfb',ink:'#1f1f20',line:'#e8ddd2'},
      wordmark:logo('namy','NAMY'),
      hero:'/assets/cosmetics/namy.jpg', mark:'/assets/cosmetics/namy-logo.png', markWide:true,
      ownerNote:'Tri rady — NAMYSKIN, NAMYDERM a NAMY — s názvami ako NI + HA + E či LIFT + FILL; zákazník z nich nevyčíta, čo sadne jeho pleti.',
      benefit:['Z troch radov jeden konkrétny produkt','Výber podľa pleti, nie podľa skratky na tube','Odpovie aj mimo otváracích hodín poradne'],
      products:[
        {id:'niha',name:'NI + HA + E pleťový krém s niacínamidom',price:'25,90 €',url:'https://www.namy.sk/obchod/pletove-kremy/ni-ha-e-pletovy-krem-s-niacinamidom/',photo:photo('namy','niha'),tags:['balanced','dry','hydrate','cream','simple','any'],reason:'Hydratačný krém s niacínamidom, kyselinou hyalurónovou a vitamínom E — hydratuje a zjednocuje tón pleti v jednom dennom kroku.'},
        {id:'akne',name:'Akné hydrogel – gélové sérum 30 ml',price:'22,50 €',url:'https://www.namy.sk/obchod/dermalne-gely/akne-hydrogel/',photo:photo('namy','akne'),tags:['oily','clarity','serum','target'],reason:'Gélové sérum s aloe vera, vitamínom C, niacínamidom a tea tree olejom — ľahký cielený krok pre mastnú a problematickú pleť.'},
        {id:'sensitive',name:'Dermal Sensitive – krém na citlivú pokožku 50 ml',price:'25,90 €',url:'https://www.namy.sk/obchod/dermalne-kremy/dermal-sensitive-citliva-pokozka/',photo:photo('namy','sensitive'),tags:['sensitive','calm','cream','basic','simple'],reason:'Prírodný dermálny krém pre citlivú pokožku, vhodný aj okolo očí a na viečka — jemná starostlivosť, keď pleť ľahko reaguje.'},
        {id:'hyaluron',name:'HYALURON – pleťové sérum s kyselinou hyalurónovou',price:'17,50 €',url:'https://www.namy.sk/obchod/pletove-sera/pletove-serum-s-kyselinou-hyaluronovou/',photo:photo('namy','hyaluron'),tags:['dry','balanced','hydrate','serum','basic','target'],reason:'Sérum s 2 % kyseliny hyalurónovej podporuje hydratáciu a pevnosť pleti — pridá sa pod akýkoľvek krém.'},
        {id:'liftfill',name:'LIFT + FILL pleťový krém s liftingovým efektom',price:'27,90 €',url:'https://www.namy.sk/obchod/pletove-kremy/lift-fill-krem-proti-vraskam/',photo:photo('namy','liftfill'),tags:['mature','cream','full','simple'],reason:'Liftingový krém spevňuje, vyhladzuje a dodáva pleti pružnosť — denná voľba pre zrelšiu pleť.'},
        {id:'bakuchiol',name:'BAKUCHIOL – olejové pleťové sérum s 1 % bakuchiolom',price:'23,50 €',url:'https://www.namy.sk/obchod/pletove-sera/pletove-serum-s-bakuchiolom/',photo:photo('namy','bakuchiol'),tags:['mature','dry','oil','target','full'],reason:'Olejové sérum s 1 % bakuchiolu zlepšuje pevnosť a podporuje regeneráciu — pár kvapiek na noc pre zrelšiu pleť.'},
        {id:'hydra',name:'HYDRA – gélová hydratačná esencia',price:'25,50 €',url:'https://www.namy.sk/obchod/hydratacne-esencie/hydra-hydratacna-esencia/',photo:photo('namy','hydra'),tags:['oily','balanced','hydrate','basic','full'],reason:'Gélová esencia – toner okamžite hydratuje, obnoví rovnováhu pleti a pripraví ju na sérum či krém.'}
      ]
    },
    mymkech: {
      name:'Mymkech', domain:'mymkech.com', website:'https://www.mymkech.com/',
      theme:{brand:'#4a3368',accent:'#d24f5e',soft:'#efeaf6',paper:'#fdfcff',ink:'#261c33',line:'#e2dcee'},
      wordmark:logo('mymkech','mymkech'),
      hero:'/assets/cosmetics/mymkech.jpg', mark:'/assets/cosmetics/mymkech-mark.png', headerLogo:'/assets/cosmetics/mymkech-logo-flat.png',
      ownerNote:'Produkty s menami ako my barrier boost, my vital skin či my skin comfort a tri systémy pleti — zákazník potrebuje vedieť, ktorý je ten jeho.',
      benefit:['Z troch systémov ten, ktorý sadne pleti','Výber podľa pleti, nie podľa názvu na fľaštičke','Odpovie aj mimo otváracích hodín'],
      products:[
        {id:'barrier',name:'my barrier boost – krém na obnovu kožnej bariéry',price:'20,90 €',url:'https://www.mymkech.com/my-barrier-boost/',photo:photo('mymkech','barrier'),tags:['sensitive','dry','calm','hydrate','cream','simple','basic'],reason:'Prebiotický krém s aurafirmom a astaxantínom vyživí a chráni pleť so začervenaním a oslabenou bariérou — jeden spoľahlivý krok.'},
        {id:'acne',name:'my acne control – olejové sérum',price:'32,90 €',url:'https://www.mymkech.com/my-acne-control/',photo:photo('mymkech','acne'),tags:['oily','clarity','oil','target'],reason:'Nekomedogénne olejové sérum so skvalánom a bakuchiolom — upokojí a vyživí mastnú, zmiešanú aj aknóznu pleť bez upchávania pórov.'},
        {id:'repair',name:'my true repair – regeneračné krémové sérum',price:'34,90 €',url:'https://www.mymkech.com/my-true-repair/',photo:photo('mymkech','repair'),tags:['mature','dry','hydrate','serum','full','target'],reason:'Krémové sérum s platinou a baikalínom pre hĺbkovú hydratáciu a regeneráciu — cielený krok pre zrelšiu pleť proti vráskam.'},
        {id:'comfort',name:'my skin comfort – upokojujúce krémové sérum',price:'34,90 €',url:'https://www.mymkech.com/pletove-serum-my-skin-comfort/',photo:photo('mymkech','comfort'),tags:['sensitive','oily','calm','clarity','serum','basic'],reason:'Sérum s ektoínom a amarasense upokojí problematickú pleť a vráti jej komfort a rovnováhu.'},
        {id:'vital',name:'my vital skin – regeneračné olejové sérum',price:'32,90 €',url:'https://www.mymkech.com/my-vital-skin/',photo:photo('mymkech','vital'),tags:['balanced','dry','hydrate','oil','simple'],reason:'Olejové sérum s olejmi z guavy a sacha inchi zmení unavenú, drsnú pleť na rozžiarenú, hebkú a hydratovanú.'},
        {id:'pure',name:'my pure skin – nepenivý čistiaci gél',price:'29,90 €',url:'https://www.mymkech.com/my-pure-skin/',photo:photo('mymkech','pure'),tags:['oily','balanced','basic','full'],reason:'Nepenivý gél s extraktom vŕby a juky jemne čistí bez vysušenia a šetrí mikrobióm pleti — základ každej rutiny.'},
        {id:'rose',name:'ROSE – ružový hydrolát',price:'12,90 €',url:'https://www.mymkech.com/rose/',photo:photo('mymkech','rose'),tags:['balanced','hydrate','basic','any'],reason:'Kvetinová voda z ruže jemne prebudí unavenú a mdlú pleť — ľahký krok medzi čistením a sérom pre všetky typy pleti.'}
      ]
    },
    anela: {
      name:'Anela', domain:'anela.cz', website:'https://www.anela.cz/',
      theme:{brand:'#6f4a47',accent:'#a8645c',soft:'#f6ece7',paper:'#fffcfa',ink:'#2f2322',line:'#ecdcd5'},
      wordmark:logo('anela','ANELA'),
      hero:'/assets/cosmetics/anela.jpg', mark:'/assets/cosmetics/anela-mark.png',
      ownerNote:'Bezstarostný motýl, Půlnoční teenka, Růžové z nebe — krásne mená, z ktorých zákazníčka nevyčíta, ktoré je pre jej pleť.',
      benefit:['Z Motýľa, Teenky a Krásy tú správnu radu','Výber podľa pleti, ako ju delí Anela','Odpovie aj mimo otváracích hodín'],
      products:[
        {id:'motyl',name:'Bezstarostný motýl – olejové sérum pre suchú a citlivú pleť 30 ml',price:'820 Kč',url:'https://www.anela.cz/pletova-sera/bezstarostny-motyl-olejove-serum-se-zlatou-rasou-pro-suchou-citlivou-plet/',photo:photo('anela','motyl'),tags:['sensitive','dry','calm','oil','target'],reason:'Výživné oleje s extraktmi z ovsa a zlatej riasy upokoja pnutie, začervenanie a šupinky suchej a citlivej pleti.'},
        {id:'teenka',name:'Bezstarostná teenka – olejové sérum s CBD pre mastnú pleť 30 ml',price:'820 Kč',url:'https://www.anela.cz/pletova-sera/bezstarostna-teenka-olejove-serum-s-cbd-pro-mastnou-problematickou-plet/',photo:photo('anela','teenka'),tags:['oily','clarity','oil','target'],reason:'CBD, vitamín C a šípok so suchými olejmi upokoja podráždenie a nedokonalosti mastnej pleti bez zaťaženia.'},
        {id:'krasa',name:'Bezstarostná krása – olejové anti-age sérum s bakuchiolom 30 ml',price:'820 Kč',url:'https://www.anela.cz/pletova-sera/bezstarostna-krasa-olejove-antiage-serum-s-bakuchiolem-pro-zralou-plet/',photo:photo('anela','krasa'),tags:['mature','dry','oil','full','target'],reason:'Trinásť olejov s bakuchiolom a vitamínom C dodá zrelej a unavenej pleti výživu, jednotný tón a stratenú silu.'},
        {id:'ruzove',name:'Růžové z nebe – hydratačné sérum pre všetky typy pleti 30 ml',price:'950 Kč',url:'https://www.anela.cz/hydratace/ruzove-z-nebe-hydratacni-serum-pro-vsechny-typy-pleti/',photo:photo('anela','ruzove'),tags:['balanced','dry','hydrate','serum','simple','basic','any'],reason:'Dvojmolekulárna kyselina hyalurónová a polysacharidy — príval hydratácie, ktorý pleť vypne, vyhladí a zjednotí.'},
        {id:'pmotyl',name:'Půlnoční motýl – upokojujúci nočný balzam 30 ml',price:'1 590 Kč',url:'https://www.anela.cz/pletove-kremy/pulnocni-motyl-zklidnujici-nocni-balzam-se-zlatou-rasou-pro-suchou-citlivou-plet/',photo:photo('anela','pmotyl'),tags:['sensitive','dry','calm','cream','simple','basic'],reason:'Vzácne maslá a oleje so zlatou riasou cez noc upokoja svrbenie a pnutie citlivej pleti a vrátia jej silu.'},
        {id:'pkrasa',name:'Půlnoční krása – anti-age nočný balzam 30 ml',price:'1 590 Kč',url:'https://www.anela.cz/pletove-kremy/pulnocni-krasa-antiage-nocni-balzam-pro-zralou-a-unavenou-plet/',photo:photo('anela','pkrasa'),tags:['mature','dry','cream','full','simple'],reason:'Oleje s kyselinou hyalurónovou, bakuchiolom a vitamínom C cez noc rozjasnia, zjednotia a vyhladia zrelú pleť.'},
        {id:'pteenka',name:'Půlnoční teenka – regeneračný nočný balzam s CBD 30 ml',price:'1 590 Kč',url:'https://www.anela.cz/pletove-kremy/pulnocni-teenka-regeneracni-nocni-balzam-s-cbd-pro-problematickou-mastnou-plet/',photo:photo('anela','pteenka'),tags:['oily','clarity','cream','basic'],reason:'Ľahké maslá a suché oleje s CBD a bakuchiolom — nočná starostlivosť pre mastnú pleť s prvými vráskami.'},
        {id:'pena',name:'Očistím tvář – čistiaca pena pre všetky typy pleti 100 ml',price:'350 Kč',url:'https://www.anela.cz/cisteni-a-odlicovani-pleti/ocistim-tvar-cistici-pena-pro-vsechny-typy-pleti/',photo:photo('anela','pena'),tags:['balanced','oily','basic','full'],reason:'Nadýchaná bylinná pena ráno aj večer zbaví pleť nečistôt aj zvyškov odličovača — základ pre ďalšiu výživu.'}
      ]
    },
    klararott: {
      name:'Klara Rott', domain:'klararott.sk', website:'https://www.klararott.sk/',
      theme:{brand:'#4d5020',accent:'#7a6d1c',soft:'#f2f0e4',paper:'#fdfcf8',ink:'#23241a',line:'#e3e0cf'},
      wordmark:logo('klararott','KLARA ROTT'),
      hero:'/assets/cosmetics/klararott.jpg', mark:'/assets/cosmetics/klararott-mark.png',
      ownerNote:'Harmónia, Nádych, Kľud či Aura — séria sér a krémov, ktoré sa líšia typom pleti aj vekom; zákazníčka potrebuje vedieť, ktorá je jej.',
      benefit:['Z troch sér Harmónia to pravé','Výber podľa pleti, ako to robí kozmetička','Odpovie aj mimo otváracích hodín'],
      products:[
        {id:'vyziv',name:'Harmónia – vyživujúce sérum 25 ml',price:'116,70 €',url:'https://www.klararott.sk/harmonia-vyzivujuce-serum-e656.htm',photo:photo('klararott','vyziv'),tags:['balanced','dry','hydrate','serum','simple','basic'],reason:'Dvojzložkové koncentrované sérum pre mladú pleť 25+ — vyživí, hydratuje a predchádza tvorbe prvých vrások.'},
        {id:'vyrov',name:'Harmónia – vyrovnávacie sérum 25 ml',price:'116,70 €',url:'https://www.klararott.sk/harmonia-vyrovnavacie-serum-e655.htm',photo:photo('klararott','vyrov'),tags:['oily','clarity','serum','target'],reason:'Sérum vytvorené pre problematickú pleť so sklonom k akné — vyrovná ju bez zaťaženia.'},
        {id:'antiage',name:'Harmónia – anti-aging sérum 25 ml',price:'116,70 €',url:'https://www.klararott.sk/harmonia-anti-aging-serum-e654.htm',photo:photo('klararott','antiage'),tags:['mature','serum','full','target'],reason:'Sérum pre zrelú pleť 45+ s 38 biologicky aktívnymi látkami — redukuje vrásky, vypína a dodá výživu aj hydratáciu.'},
        {id:'nadych',name:'Nádych – hydratačný liftingový fluid 30 ml',price:'91,30 €',url:'https://www.klararott.sk/nadych-hydratacny-liftingovy-fluid-e692.htm',photo:photo('klararott','nadych'),tags:['dry','balanced','hydrate','serum','simple','any'],reason:'Ľahký fluid pre všetky typy pleti, ktorého dlhodobú hydratáciu potvrdilo meranie Štátneho zdravotného ústavu.'},
        {id:'balance',name:'BalanceCream – lipozomálny krém proti starnutiu 50 ml',price:'137,10 €',url:'https://www.klararott.sk/balancecream-lipozomalny-krem-proti-starnutiu-pleti-e811.htm',photo:photo('klararott','balance'),tags:['mature','dry','cream','simple','full'],reason:'Lipozomálny anti-aging krém s komplexom Active Balance — denná starostlivosť o zrelšiu pleť proti vráskam.'},
        {id:'aura',name:'Aura – denný ochranný krém s SPF 20 50 ml',price:'82,90 €',url:'https://www.klararott.sk/aura-denny-ochranny-krem-s-spf-20-e820.htm',photo:photo('klararott','aura'),tags:['sensitive','balanced','cream','simple','basic'],reason:'Ľahký denný krém s SPF 20, ktorý pleť nezaťaží — chráni pred slnkom, modrým svetlom aj mestským prostredím.'},
        {id:'klud',name:'Kľud – vyrovnávacie bylinné tonikum 100 ml',price:'65,40 €',url:'https://www.klararott.sk/klud-upokojujuce-bylinne-tonikum-e666.htm',photo:photo('klararott','klud'),tags:['oily','clarity','calm','full'],reason:'Bylinné tonikum pre problematickú pleť — dočistí ju a vyrovná po umytí, aby sérum lepšie zabralo.'},
        {id:'levandula',name:'Sviežosť – hydrolát levanduľa 100 ml',price:'24,60 €',url:'https://www.klararott.sk/sviezost-hydrolat-levandula-e669.htm',photo:photo('klararott','levandula'),tags:['sensitive','calm','basic','target'],reason:'Bio kvetinová voda z levandule z vlastnej destilácie v koncentrácii 1:10 — jemné upokojenie citlivej pleti.'}
      ]
    },
    yage: {
      name:'YAGE', domain:'yageorganics.cz', website:'https://www.yageorganics.cz/',
      theme:{brand:'#1b1a19',accent:'#8a6c42',soft:'#f3efe8',paper:'#fdfcf9',ink:'#1b1a19',line:'#e4ddd1'},
      wordmark:logo('yage','YAGE Organics'),
      hero:'/assets/cosmetics/yage.jpg', mark:'/assets/cosmetics/yage-logo.png', markWide:true,
      ownerNote:'Rituál v desiatich očíslovaných krokoch — zákazníčka nevie, ktoré čísla potrebuje práve jej pleť a ktoré môže vynechať.',
      benefit:['Z desiatich krokov tie, ktoré pleť potrebuje','Výber podľa pleti, nie podľa čísla na krabičke','Odpovie aj mimo otváracích hodín'],
      products:[
        {id:'aqua',name:'č. 4 AQUA SPLASH – hydratačná esencia s niacínamidom',price:'2 899 Kč',url:'https://www.yageorganics.cz/c--4-hydratacni-esence-s-multi-molekularni-kh-a-niacinamidem/',photo:photo('yage','aqua'),tags:['balanced','dry','hydrate','serum','simple','basic','any'],reason:'Kyselina hyalurónová v celom spektre molekulových hmotností so spirulinou — hĺbková hydratácia pre každý typ pleti.'},
        {id:'velvet',name:'č. 1 VELVET TOUCH – šetrný umývací gél',price:'1 399 Kč',url:'https://www.yageorganics.cz/c--1-myci-gel-velvet-touch/',photo:photo('yage','velvet'),tags:['sensitive','dry','basic','full'],reason:'Málo penivý gél s bio éterickými olejmi a rastlinnými extraktmi, vytvorený s ohľadom na citlivú a suchú pleť.'},
        {id:'aurevoir',name:'č. 6 AU REVOIR WRINKLES – well-aging krém s platinou 30 ml',price:'4 990 Kč',url:'https://www.yageorganics.cz/c--6--komplexni-well-aging-krem-s-platinou/',photo:photo('yage','aurevoir'),tags:['mature','dry','cream','simple','full'],reason:'Komplexný krém s platinou posilní mikrobióm a postará sa o vrásky, tonus, bariéru aj hydratáciu zrelej pleti.'},
        {id:'sleeping',name:'č. 6 SLEEPING BEAUTY – nočné olejové sérum s retinolom',price:'1 980 Kč',url:'https://www.yageorganics.cz/c--6-nocni-pletovy-olej-proti-vraskam-sleeping-beauty/',photo:photo('yage','sleeping'),tags:['mature','dry','oil','target','full'],reason:'Pätnásť rastlinných olejov s planktónom a retinolom — nočný olej, ktorý viditeľne zjemňuje vrásky.'},
        {id:'hello',name:'č. 5 HELLO BEAUTIFUL – liftingové sérum s kolagénom a peptidmi',price:'3 550 Kč',url:'https://www.yageorganics.cz/no-5-serum-hello-beautiful/',photo:photo('yage','hello'),tags:['mature','balanced','serum','target','basic'],reason:'Omladzujúce sérum s brusnicou a opunciou proti vráskam aj modrému svetlu — cielený liftingový krok.'},
        {id:'cica',name:'č. 3 SEA WAVE – upokojujúce Cica tonikum',price:'1 599 Kč',url:'https://www.yageorganics.cz/c--3-zklidnujici-cica-tonikum/',photo:photo('yage','cica'),tags:['sensitive','calm','basic','target'],reason:'Kvetinová voda z damascénskej ruže s centellou a morskými riasami — upokojí precitlivenú, začervenanú pleť.'},
        {id:'tansy',name:'č. 6 MYSTIC TANSY BLUE – nočný upokojujúci balzam',price:'1 980 Kč',url:'https://www.yageorganics.cz/c--6-nocni-pecujici-balzam-krasy-mystic-tansy-blue/',photo:photo('yage','tansy'),tags:['sensitive','oily','calm','cream','simple','basic'],reason:'Marocký harmanček, baobab a marula hydratujú a upokoja citlivú, začervenanú, podráždenú aj aknóznu pleť.'},
        {id:'sos',name:'č. 7 SOS MIRACLE – lokálna starostlivosť na pupienky',price:'1 299 Kč',url:'https://www.yageorganics.cz/c--7-lokalni-pece-na-pupinky-sos-miracle/',photo:photo('yage','sos'),tags:['oily','clarity','oil','target'],reason:'Koncentrovaná zmes olejov s bakuchiolom a tea tree na cielenú bodovú starostlivosť o nedokonalosti.'}
      ]
    },
    omorfia: {
      name:'OMORFIA', domain:'omorfia.care', website:'https://www.omorfia.care/',
      theme:{brand:'#11395a',accent:'#9c7a24',soft:'#f5eeec',paper:'#fdfcfb',ink:'#14263a',line:'#e8dcd9'},
      wordmark:logo('omorfia','OMORFIA'),
      hero:'/assets/cosmetics/omorfia.jpg', mark:'/assets/cosmetics/omorfia-mark.png',
      ownerNote:'Tri kroky a pleťový olej podľa pleti — Divine Elixir, Skin Superfood či Bright Star; zákazníčka potrebuje vedieť, ktorý olej je jej.',
      benefit:['Z olejov Omorfia ten pravý pre pleť','Výber podľa pleti, ako pri osobnej poradni','Odpovie aj mimo otváracích hodín'],
      products:[
        {id:'superfood',name:'SKIN SUPERFOOD – omladzujúci olej pre suchú pleť 30 ml',price:'1 870 Kč',url:'https://www.omorfia.care/p/12-antiaging-olej-pro-suchou-plet-skinsuperfood',photo:photo('omorfia','superfood'),tags:['dry','mature','hydrate','oil','simple','full'],reason:'Vyživujúci olejový koktejl pre suchú pleť — hydratuje, obnovuje hydrolipidovú vrstvu a pôsobí proti starnutiu.'},
        {id:'divine',name:'DIVINE ELIXIR – omladzujúci olej pre zmiešanú pleť 30 ml',price:'1 870 Kč',url:'https://www.omorfia.care/p/11-olej-proti-vraskam-divine-elixir',photo:photo('omorfia','divine'),tags:['oily','balanced','clarity','oil','target'],reason:'Olej pre pleť so známkami starnutia a sklonom k akné — urýchľuje hojenie pupienkov, zmenšuje póry a vyhladzuje vrásky.'},
        {id:'phoenix',name:'PHOENIX – ľahký liftingový krém 30 ml',price:'1 470 Kč',url:'https://www.omorfia.care/p/16-pece-o-plet-48-phoenix-hydratacni-liftingovy-krem',photo:photo('omorfia','phoenix'),tags:['mature','balanced','hydrate','cream','simple','full'],reason:'Kyselina hyalurónová vo vysokej aj nízkej molekule — lifting, hydratácia do hĺbky a jednotnejší tón zrelšej pleti.'},
        {id:'bright',name:'BRIGHT STAR – rozjasňujúci pleťový olej 30 ml',price:'1 370 Kč',url:'https://www.omorfia.care/p/9-rozjasnujici-pletovy-olej-bright-star',photo:photo('omorfia','bright'),tags:['balanced','dry','hydrate','oil','simple','any'],reason:'Hydratačný a rozjasňujúci olej s vitamínmi dodá unavenej pleti energiu, zjednotí ju a zjemní.'},
        {id:'zen',name:'ZEN PURE – odličovací a čistiaci balzam 100 ml',price:'1 670 Kč',url:'https://www.omorfia.care/p/8-zen-purity-odlicovaci-a-cistici-balzam',photo:photo('omorfia','zen'),tags:['sensitive','calm','full'],reason:'Jemný vegánsky balzam pleť dokonale vyčistí a zároveň hydratuje, bez syntetických látok a konzervantov — prvý krok rutiny.'}
      ]
    }
  });
})();
