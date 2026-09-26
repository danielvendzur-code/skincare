/* Hair demos on the same engine as the skincare demos (cosmetics.js + its
   layers). Each brand is added here in the exact shape of cosmetics-config.js;
   products, prices, links and photos come from the brand's own e-shop.
   Loaded right after cosmetics-config.js. */
(() => {
  'use strict';
  const data = window.COSMETICS_DEMOS;
  if (!data) return;

  const logo = (slug, name) => `<img class="cx-wordmark cx-logo" src="/assets/cosmetics/${slug}-logo.png" alt="${name}">`;
  const photo = (slug, id) => `/assets/cosmetics/${slug}-${id}.jpg`;

  const hair = {
    haaro: {
      name:'Haaro Naturo', domain:'haaro-naturo.cz', website:'https://www.haaro-naturo.cz/',
      theme:{brand:'#1f1c1a',accent:'#8c6f55',soft:'#f3efe9',paper:'#fdfcfa',ink:'#1f1c1a',line:'#e4ddd3'},
      wordmark:logo('haaro','Haaro Naturo'),
      hero:'/assets/cosmetics/haaro.jpg', mark:'/assets/cosmetics/haaro-mark.png',
      ownerNote:'Tuhé aj postbiotické šampóny „na objem“, „na uhladenie“, „na lupiny“ a séra Lipa-mäta či Orech-dub — zákazník nevie, či rieši vlasy, alebo pokožku hlavy.',
      benefit:['Z desiatky šampónov ten, ktorý sadne vlasom aj pokožke','Poradí k šampónu sérum alebo kondicionér','Odpovie aj mimo otváracích hodín kaderníctva'],
      products:[
        {id:'jemne',name:'Postbiotický šampón na jemné vlasy 100 g',price:'585 Kč',url:'https://www.haaro-naturo.cz/sampon-postbioticky-na-jemne-vlasy/',photo:photo('haaro','jemne'),tags:['balanced','sensitive','hydrate','clarity','mature','cream','simple','basic'],reason:'Objem bez svrbenia — tuhý šampón pre normálne až veľmi jemné vlasy pri citlivej pokožke hlavy, s postbiotikami a extra hydratáciou.'},
        {id:'lupy',name:'Postbiotický šampón na lupiny a mastné vlasy 100 g',price:'595 Kč',url:'https://www.haaro-naturo.cz/sampon-postbioticky-na-lupy-a-mastne-vlasy/',photo:photo('haaro','lupy'),tags:['oily','sensitive','calm','cream','simple','basic'],reason:'Výťažky z dubovej kôry, orecha a vŕbovky znižujú tvorbu mazu a lupín a upokojujú pokožku, ktorá svrbí; bez parfumácie.'},
        {id:'uhlaz',name:'Tuhý šampón na uhladenie 100 g',price:'570 Kč',url:'https://www.haaro-naturo.cz/sampon-na-uhlazeni-50g/',photo:photo('haaro','uhlaz'),tags:['dry','hydrate','cream','simple','basic'],reason:'Slizové látky z lipového kvetu s makovým a arganovým olejom uhladia suché, krepovaté a poškodené vlasy.'},
        {id:'kudrn',name:'Postbiotický šampón na silné a kučeravé vlasy 100 g',price:'585 Kč',url:'https://www.haaro-naturo.cz/sampon-postbioticky-na-silne-a-kudrnate-vlasy/',photo:photo('haaro','kudrn'),tags:['dry','sensitive','hydrate','calm','cream','simple','basic'],reason:'Uhladí a zjemní silné, tvrdé aj kučeravé vlasy a zmierni krepovatenie — recept upravený pre citlivú pokožku hlavy.'},
        {id:'mastne',name:'Tuhý šampón na mastné vlasy 100 g',price:'570 Kč',url:'https://www.haaro-naturo.cz/sampon-na-mastne-vlasy/',photo:photo('haaro','mastne'),tags:['oily','clarity','cream','simple','basic'],reason:'Byliny ako imelo, svetlík a rebríček s hlinkou usmernia tvorbu mazu bez odmasťovania — vlasy vydržia dlhšie čisté.'},
        {id:'lipa',name:'Sérum na suchú pokožku hlavy Lipa-mäta 100 ml',price:'695 Kč',url:'https://www.haaro-naturo.cz/serum-na-suchou-vlasovou-pokozku-lipa-mata/',photo:photo('haaro','lipa'),tags:['dry','sensitive','calm','hydrate','serum','target','full'],reason:'Hydratuje presušenú pokožku hlavy, ktorá sa napína, svrbí a šupinkuje — nanáša sa po umytí, s postbiotikami.'},
        {id:'orech',name:'Sérum na mastnú pokožku a lupiny Orech-dub 100 ml',price:'655 Kč',url:'https://www.haaro-naturo.cz/serum-na-mastnou-pokozku-a-lupy-orech-dub/',photo:photo('haaro','orech'),tags:['oily','sensitive','calm','serum','target','full'],reason:'Triesloviny z orecha a dubu so šalviou a konope obmedzujú mastenie a svrbenie a pomáhajú proti lupinám.'},
        {id:'lehky',name:'Ľahký kondicionér na jemné vlasy',price:'345 Kč',url:'https://www.haaro-naturo.cz/lehky-kondicioner/',photo:photo('haaro','lehky'),tags:['balanced','clarity','hydrate','oil','target','full'],reason:'Ľahko uhladí a uľahčí rozčesávanie bez straty objemu — s marhuľovým olejom, overený denne v ich kaderníctve.'},
        {id:'olej',name:'Suchý vlasový olej 50 ml',price:'445 Kč',url:'https://www.haaro-naturo.cz/suchy-olej-na-vlasy/',photo:photo('haaro','olej'),tags:['dry','hydrate','oil','target','full'],reason:'Olejové sérum na silné, suché a krepovaté vlasy — uhladí a dodá lesk bez mastného pocitu, prírodná náhrada silikónov.'}
      ]
    },
  };

  /* Only the hair brands open here. cosmetics-config.js still carries the
     original skincare brands (older layers read them), so any other slug goes
     back to the overview instead of a skincare page with hair questions. */
  const match = location.pathname.match(/\/kozmetika\/([a-z0-9-]+)/i);
  const hostSlug = location.hostname.endsWith('.mojchatbot.sk') ? location.hostname.split('.')[0] : '';
  const slug = String(match?.[1] || new URLSearchParams(location.search).get('demo') || hostSlug || '').toLowerCase();
  if (!hair[slug]) {
    delete window.COSMETICS_DEMOS;
    location.replace('/');
    return;
  }
  Object.assign(data.brands, hair);
})();
