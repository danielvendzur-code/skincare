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
    havlikova: {
      name:'Havlík Apoteka', domain:'havlikovaapoteka.cz', website:'https://www.havlikovaapoteka.cz/sk/',
      theme:{brand:'#124800',accent:'#9a5a2a',soft:'#f0f5e1',paper:'#fcfdf8',ink:'#0e2a1d',line:'#dfe6cf'},
      wordmark:logo('havlikova','Havlíkova přírodní apotéka'),
      hero:'/assets/cosmetics/havlikova.jpg', mark:'/assets/cosmetics/havlikova-mark.png',
      ownerNote:'Rad „Vlasový opravář“, cibuľovo-fazuľové šampóny na svetlé a tmavé vlasy, šampón 13 rastlín, dve toniká a dve séra — zákazník nevie, čím začať a čo k tomu pridať.',
      benefit:['Z cibuľovo-fazuľového radu poskladá celú starostlivosť','Rozlíši tonikum na pokožku a sérum na končeky','Odpovie aj mimo otváracích hodín'],
      products:[
        {id:'tmave',name:'Cibuľovo-fazuľový šampón na tmavé vlasy 200 ml',price:'24,00 €',url:'https://www.havlikovaapoteka.cz/sk/cibulovo-fazolovy-sampon-na-tmave-vlasy/',photo:photo('havlikova','tmave'),tags:['balanced','mature','cream','simple','basic'],reason:'Výťažky z cibule, fazule a Cressatine® posilňujú vlasy od korienkov a pri pravidelnom používaní bránia nadmernému vypadávaniu; orech podporí farbu tmavých vlasov.'},
        {id:'svetle',name:'Cibuľovo-fazuľový šampón na svetlé vlasy 200 ml',price:'24,00 €',url:'https://www.havlikovaapoteka.cz/sk/cibulovo-fazolovy-sampon-na-svetle-vlasy/',photo:photo('havlikova','svetle'),tags:['balanced','mature','cream','simple','basic'],reason:'Rovnaký posilňujúci šampón z cibule a fazule, s harmančekom pre svetlé vlasy — podporí rast nových vlasov a lesk.'},
        {id:'rostlin',name:'Havlíkov šampón 13 rastlín 200 ml',price:'16,50 €',url:'https://www.havlikovaapoteka.cz/sk/havlikuv-sampon-13-rostlin/',photo:photo('havlikova','rostlin'),tags:['dry','mature','cream','simple','basic'],reason:'Málo penivý BIO šampón z 13 lokálnych rastlín šetrne regeneruje poškodené vlasy, hĺbkovo hydratuje a posilňuje pokožku hlavy.'},
        {id:'sucha',name:'Jemný vlasový šampón pre suché vlasy 200 ml',price:'19,50 €',url:'https://www.havlikovaapoteka.cz/sk/jemny-vlasovy-sampon-pro-suche-vlasy-200-ml/',photo:photo('havlikova','sucha'),tags:['dry','hydrate','cream','simple','basic'],reason:'Jemne penivý šampón so žĺtkom a arganovým olejom pre veľmi suché, poškodené vlasy so sklonom k strapkaniu — nevysušuje, dodá lesk.'},
        {id:'tonikum',name:'Vlasové tonikum 200 ml',price:'16,00 €',url:'https://www.havlikovaapoteka.cz/sk/vlasove-tonikum/',photo:photo('havlikova','tonikum'),tags:['oily','sensitive','calm','clarity','serum','target','full'],reason:'Zmes 10 bylín na pokožku hlavy normalizuje maz, odstraňuje pocit svrbenia a vyživuje korienky — nanáša sa bez oplachovania.'},
        {id:'rozmarin',name:'Rozmarínové tonikum na vlasy 200 ml',price:'24,50 €',url:'https://www.havlikovaapoteka.cz/sk/rozmarynove-tonikum-na-vlasy/',photo:photo('havlikova','rozmarin'),tags:['sensitive','mature','calm','serum','target','full'],reason:'Kvetová voda z rozmarínu posilňuje vlasové vlákna, podporuje prirodzenú hustotu a zároveň upokojí a hydratuje citlivú pokožku hlavy.'},
        {id:'serum',name:'Cibuľovo-fazuľové vlasové sérum 30 ml',price:'24,50 €',url:'https://www.havlikovaapoteka.cz/sk/cibulovo-fazolove-vlasove-serum-30-ml-2/',photo:photo('havlikova','serum'),tags:['balanced','mature','serum','target','full'],reason:'Sérum s cibuľou, kofeínom, žihľavou a panthenolom pre slabé a vypadávajúce vlasy — podporí rast nových a hustotu vlasov.'},
        {id:'maska',name:'Cibuľovo-fazuľová vlasová maska 100 ml',price:'18,00 €',url:'https://www.havlikovaapoteka.cz/sk/cibulovo-fazolova-vlasova-maska/',photo:photo('havlikova','maska'),tags:['oily','hydrate','oil','target','full'],reason:'Výživná maska so žĺtkom, arganovým a ovseným olejom — vhodná aj na jemné a rýchlo sa mastiace vlasy, poškodeným vráti lesk a hebkosť.'},
        {id:'hyaluron',name:'Vlasové sérum Kyselina hyalurónová 50 ml',price:'30,50 €',url:'https://www.havlikovaapoteka.cz/sk/vlasove-serum-kyselina-hyaluronova-vlasovy-opravar-50-ml/',photo:photo('havlikova','hyaluron'),tags:['dry','hydrate','oil','target','full'],reason:'Koncentrované sérum s kyselinou hyalurónovou a panthenolom vytvorí na vlase ochranný štít — hydratácia, lesk a menej strapkajúcich sa končekov.'}
      ]
    },
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
