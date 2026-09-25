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
    }
  });
})();
