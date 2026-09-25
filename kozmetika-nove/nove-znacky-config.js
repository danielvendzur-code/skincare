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
    }
  });
})();
