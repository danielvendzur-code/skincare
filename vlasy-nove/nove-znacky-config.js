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
    voono: {
      name:'VOONO', domain:'voono.sk', website:'https://www.voono.sk/',
      theme:{brand:'#1c1c1c',accent:'#5f7189',soft:'#f2efea',paper:'#fdfcfa',ink:'#1c1c1c',line:'#e6e1d9'},
      wordmark:logo('voono','VOONO natural products'),
      hero:'/assets/cosmetics/voono.jpg', mark:'/assets/cosmetics/voono-mark.png',
      ownerNote:'Vedľa henny a rastlinných farieb šampóny ORGANIC LINE, keratínová rada, kondicionéry, Tricholog a brezový oplach — zákazníčka potrebuje vedieť, čo patrí k jej vlasom a pokožke.',
      benefit:['Z organických a keratínových radov ten pravý šampón','Poradí, kedy siahnuť po Tricholog a oplachu','Odpovie aj mimo pracovného času'],
      products:[
        {id:'mastne',name:"Šampón pre mastné vlasy ORGANIC LINE",price:'24,00 €',url:'https://www.voono.sk/obchod/vlasova-pece/organicka-starostlivost/sampon-pre-mastne-vlasy/',photo:photo('voono','mastne'),tags:['oily','hydrate','cream','simple','basic'],reason:"Pre vlasy, ktoré sa mastia a sú bez objemu — organické hydratačné zložky vyživia a dodajú lesk, no vlasy nezaťažia."},
        {id:'objem',name:"Šampón pre objem vlasov s keratínom 390 ml",price:'26,00 €',url:'https://www.voono.sk/obchod/ostatne/novinky/sampon-pre-objem-vlasov-s-keratinom-390-ml/',photo:photo('voono','objem'),tags:['balanced','oily','clarity','hydrate','cream','simple','basic'],reason:"Jemný, ale dôkladný šampón odstráni nečistoty a prebytočný maz bez zaťaženia; hydrolyzovaný keratín dodá vlasom plnší vzhľad a hebkosť."},
        {id:'suche',name:"Šampón pre suché, poškodené a vlnité vlasy ORGANIC LINE",price:'24,00 €',url:'https://www.voono.sk/obchod/vlasova-pece/organicka-starostlivost/sampon-pre-suche-vlasy/',photo:photo('voono','suche'),tags:['dry','hydrate','mature','cream','simple','basic'],reason:"Organické prírodné výťažky dodajú suchým, poškodeným a vlnitým vlasom hydratáciu a regeneráciu."},
        {id:'tricholog',name:"VOONO Tricholog – bylinný detox pokožky hlavy",price:'16,70 €',url:'https://www.voono.sk/obchod/vlasova-pece/masky/tricholog/',photo:photo('voono','tricholog'),tags:['sensitive','oily','calm','mature','target','full'],reason:"Zmes prvotriednych bylín na problematickú pokožku hlavy — pri lupinách, chrastách, vypadávaní vlasov či rýchlo sa mastiacej pokožke."},
        {id:'brezovy',name:"Brezový oplach pre zdravé a lesklé vlasy",price:'13,00 €',url:'https://www.voono.sk/obchod/ostatne/novinky/brezovy-oplach-pro-zdrave-a-leskle-vlasy/',photo:photo('voono','brezovy'),tags:['balanced','sensitive','calm','mature','serum','target','full'],reason:"Bezoplachová vlasová voda s brezou, jablčným octom a levanduľou prekrví pokožku hlavy, upokojí podráždenie a podporí prirodzený rast vlasov."},
        {id:'citrus',name:"Citrusový kondicionér pre mastiace sa a jemné vlasy 370 ml",price:'27,00 €',url:'https://www.voono.sk/obchod/vlasova-pece/kondicionery/citrusovy-kondicioner/',photo:photo('voono','citrus'),tags:['oily','clarity','oil','target','full'],reason:"Kondicionér na končeky jemných, zľahnutých a rýchlo sa mastiacich vlasov — panthenol a pšeničný proteín ich uhladia bez zaťaženia."},
        {id:'kerkondi',name:"Keratínový kondicionér pre objem a lesk 390 ml",price:'29,00 €',url:'https://www.voono.sk/obchod/vlasova-pece/kondicionery/keratinovy-kondicioner-objem-lesk/',photo:photo('voono','kerkondi'),tags:['balanced','clarity','hydrate','oil','target','full'],reason:"Keratín posilní vlasy, dodá im okamžitý objem, uľahčí rozčesávanie a chráni ich pred lámavosťou a krepovatením."},
        {id:'maska',name:"15-minútová vyživujúca maska ORGANIC LINE",price:'27,00 €',url:'https://www.voono.sk/obchod/vlasova-pece/masky/15-minutova-maska/',photo:photo('voono','maska'),tags:['dry','hydrate','oil','target','full'],reason:"Vyživujúca maska na suché, poškodené a kučeravé vlasy — organické oleje ich pri pravidelnom používaní uhladia a vrátia im lesk."},
        {id:'mango',name:"Mango balzam na suché a rozstrapkané končeky",price:'24,00 €',url:'https://www.voono.sk/obchod/vlasova-pece/styling/mango-balzam-na-konceky/',photo:photo('voono','mango'),tags:['dry','mature','oil','target','full'],reason:"Balzam na štiepiace sa a suché končeky poškodené žehlením, fénovaním či farbením — lesk bez zaťaženia vlasu."}
      ]
    },
    navlasil: {
      name:'NAVLASIL', domain:'navlasil.sk', website:'https://www.navlasil.sk/',
      theme:{brand:'#402021',accent:'#b0712f',soft:'#f7f1ec',paper:'#fdf9f6',ink:'#2a1516',line:'#ecdfd6'},
      wordmark:logo('navlasil','NAVLASIL'),
      hero:'/assets/cosmetics/navlasil.jpg', mark:'/assets/cosmetics/navlasil-mark.png',
      ownerNote:'Štyri šampóny a kondicionéry podľa typu vlasov, dve séra, tonikum, maska aj olejová kúra — všetko v rovnakých bielych fľašiach, zákazníčka potrebuje vedieť, ktorá kombinácia je jej.',
      benefit:['Z rovnakých bielych fliaš tá pravá kombinácia','Rozlíši sérum proti vypadávaniu a sérum s peptidmi medi','Odpovie aj vtedy, keď sprievodca výberom nestačí'],
      products:[
        {id:'jemne',name:"Šampón NAVLASIL pre jemné vlasy 250 ml",price:'18,50 €',url:'https://www.navlasil.sk/sampony/sampon-navlasil-pre-jemne-vlasy/',photo:photo('navlasil','jemne'),tags:['balanced','clarity','mature','cream','simple','basic'],reason:"Odľahčený šampón pre jemné vlasy bez objemu a so sklonom k vypadávaniu — umýva bez zaťaženia, zväčšuje objem a podporuje rast."},
        {id:'suche',name:"Šampón NAVLASIL pre suché a lámavé vlasy 250 ml",price:'18,50 €',url:'https://www.navlasil.sk/sampony/sampon-navlasil-pre-suche-a-lamave-vlasy/',photo:photo('navlasil','suche'),tags:['dry','hydrate','cream','simple','basic'],reason:"Hydratačný a vyživujúci šampón pre veľmi poškodené a nepoddajné vlasy, ktoré potrebujú maximálne hydratovať a vyživiť."},
        {id:'farbene',name:"Šampón NAVLASIL pre farbené a melírované vlasy 250 ml",price:'18,00 €',url:'https://www.navlasil.sk/sampony/sampon-navlasil-pre-farbene-a-melirovane-vlasy/',photo:photo('navlasil','farbene'),tags:['balanced','hydrate','cream','simple','basic'],reason:"Chráni farbu farbených a melírovaných vlasov, podporuje ich lesk a hydratáciu."},
        {id:'normalne',name:"Šampón NAVLASIL pre normálne vlasy 250 ml",price:'18,00 €',url:'https://www.navlasil.sk/sampony/sampon-navlasil-pre-normalne-vlasy/',photo:photo('navlasil','normalne'),tags:['balanced','oily','clarity','cream','simple','basic'],reason:"Odľahčená štruktúra pre všetky typy vlasov — svieži pocit krásne umytých a ľahkých vlasov už po prvom umytí, s vôňou levandule a citrónovej trávy."},
        {id:'serum',name:"Sérum NAVLASIL proti vypadávaniu a šediveniu vlasov",price:'50,50 €',url:'https://www.navlasil.sk/vlasova-sera/serum-navlasil-proti-vypadavaniu-a-sediveniu-vlasov/',photo:photo('navlasil','serum'),tags:['balanced','mature','serum','target','full'],reason:"Vlajková loď značky — sérum na pokožku hlavy pri vypadávaní a šedivení vlasov s vysokým obsahom účinných látok."},
        {id:'med',name:"Vlasové sérum NAVLASIL s peptidmi medi",price:'52,00 €',url:'https://www.navlasil.sk/vlasova-sera/vlasove-serum-navlasil-s-peptidmi-medi/',photo:photo('navlasil','med'),tags:['sensitive','mature','serum','target','full'],reason:"Medené peptidy GHK-Cu zlepšujú kvalitu pokožky hlavy, posilňujú korienok a pomáhajú udržať vlas dlhšie v rastovej fáze — bez agresívnej stimulácie."},
        {id:'tonikum',name:"Detoxikačné tonikum NAVLASIL pre vlasovú pokožku 50 ml",price:'27,00 €',url:'https://www.navlasil.sk/vlasove-tonika/detoxikacne-tonikum-navlasil-pre-vlasovu-pokozku-50-ml/',photo:photo('navlasil','tonikum'),tags:['oily','sensitive','calm','clarity','serum','target','full'],reason:"Šetrne, no hĺbkovo vyčistí pokožku hlavy od mazu a nánosov stylingu, upokojí ju pri svrbení a lupinách — 1–2× týždenne pred umytím."},
        {id:'maska',name:"Vyživujúca proteínová maska NAVLASIL",price:'18,00 €',url:'https://www.navlasil.sk/masky-na-vlasy/vyzivujuca-proteinova-maska-navlasil/',photo:photo('navlasil','maska'),tags:['balanced','hydrate','oil','target','full'],reason:"Nezaťažujúca proteínová maska aj pre jemné vlasy — hebkosť, ľahšie rozčesávanie a lesk už po prvom použití."},
        {id:'olej',name:"Predšampónová olejová kúra NAVLASIL s arganovým a tsubaki olejom",price:'26,00 €',url:'https://www.navlasil.sk/oleje-na-vlasy/predsamponova-olejova-kura-na-vlasy-navlasil-s-arganovym-a-tsubaki-olejom/',photo:photo('navlasil','olej'),tags:['dry','hydrate','oil','target','full'],reason:"Olejová kúra pred umytím intenzívne vyživí suché, poškodené a krepovatejúce vlasy a zníži ich vysušovanie šampónom."}
      ]
    },
    ryor: {
      name:'RYOR', domain:'ryor.sk', website:'https://www.ryor.sk/',
      theme:{brand:'#4f6b1c',accent:'#72902a',soft:'#f1f4e8',paper:'#fdfdf9',ink:'#1f2a14',line:'#e1e8d2'},
      wordmark:logo('ryor','RYOR'),
      hero:'/assets/cosmetics/ryor.jpg', mark:'/assets/cosmetics/ryor-mark.png',
      ownerNote:'Nová rada RESTART, bylinný, pivný aj upokojujúci šampón, urýchľovač rastu a keratínový sprej — zákazník v nich nevidí, ktorý je na jeho problém.',
      benefit:['Zo šampónov a kúr RYOR jeden konkrétny','Poradí, kedy stačí šampón a kedy pridať kúru','Odpovie aj mimo otváracích hodín predajní'],
      products:[
        {id:'restart',name:'RESTART – posilňujúci šampón pre poškodené a farbené vlasy 200 ml',price:'9,52 €',url:'https://www.ryor.sk/restart-posilnujuci-sampon-pre-poskodene-a-farbene-vlasy',photo:photo('ryor','restart'),tags:['dry','hydrate','mature','cream','simple','basic'],reason:'Cielená starostlivosť o suché a chemicky poškodené vlasy — posilní vlasy oslabené farbením, zosvetľovaním a teplom.'},
        {id:'calm',name:'Šampón s ukľudňujúcim efektom 200 ml',price:'9,52 €',url:'https://www.ryor.sk/sampon-s-ukludnujucim-efektom',photo:photo('ryor','calm'),tags:['sensitive','calm','cream','simple','basic'],reason:'Jogurtové proteíny priaznivo pôsobia na citlivú, začervenanú alebo svrbiacu pokožku hlavy a zároveň podporia lesk a vitalitu vlasov.'},
        {id:'bylin',name:'Bylinný šampón s panthenolom 200 ml',price:'4,94 €',url:'https://www.ryor.sk/bylinny-sampon-s-pantenolem',photo:photo('ryor','bylin'),tags:['balanced','hydrate','mature','cream','simple','basic'],reason:'Extrakty z brezy a rozmarínu s panthenolom výrazne podporujú regeneráciu vlasov — jednoduchý každodenný šampón.'},
        {id:'piv',name:'Pivný šampón s keratínom 250 ml',price:'6,86 €',url:'https://www.ryor.sk/pivny-sampon-s-keratinom',photo:photo('ryor','piv'),tags:['balanced','oily','clarity','cream','simple','basic'],reason:'Chmeľový extrakt a keratín dodajú vlasom objem, lesk a pevnosť — pre vlasy, ktoré rýchlo splasnú.'},
        {id:'ury',name:'Urýchľovač rastu vlasov – 3-mesačná kúra 250 ml',price:'19,04 €',url:'https://www.ryor.sk/urychlovac-rastu-vlasov-3-mesacna-kura',photo:photo('ryor','ury'),tags:['balanced','mature','serum','target','full'],reason:'Aktívny komplex aminokyselín, vitamínov a prírodných extraktov podporuje intenzívnejší rast vlasov — trojmesačná kúra na pokožku hlavy.'},
        {id:'restartk',name:'RESTART – posilňujúci kondicionér pre poškodené a farbené vlasy 200 ml',price:'9,88 €',url:'https://www.ryor.sk/restart-posilnujuci-kondicioner-pre-poskodene-a-farbene-vlasy',photo:photo('ryor','restartk'),tags:['dry','hydrate','oil','target','full'],reason:'Kondicionér pre suché vlasy oslabené farbením, zosvetľovaním a tepelnou úpravou — uhladí a posilní dĺžky po šampóne.'},
        {id:'restartm',name:'RESTART – posilňujúca maska pre poškodené a farbené vlasy 250 ml',price:'11,14 €',url:'https://www.ryor.sk/restart-posilnujuca-maska-pre-poskodene-a-farbene-vlasy',photo:photo('ryor','restartm'),tags:['dry','mature','oil','target','full'],reason:'Intenzívna regeneračná maska pre suché vlasy oslabené farbením a odfarbovaním — raz-dvakrát týždenne namiesto kondicionéra.'},
        {id:'keratin',name:'Vlasový keratín sprej 250 ml',price:'10,18 €',url:'https://www.ryor.sk/vlasovy-keratin-sprej',photo:photo('ryor','keratin'),tags:['balanced','hydrate','oil','target','full'],reason:'Bezoplachový sprej zabezpečí výbornú rozčesateľnosť vlasov a zároveň ich hĺbkovú regeneráciu.'},
        {id:'kondi',name:'Regeneračný kondicionér s panthenolom 200 ml',price:'5,36 €',url:'https://www.ryor.sk/regeneracny-kondicioner-s-pantenolom',photo:photo('ryor','kondi'),tags:['balanced','mature','oil','target','full'],reason:'Panthenol a kolagén výrazne zlepšujú pevnosť, elasticitu a rozčesateľnosť vlasov.'}
      ]
    },
    venira: {
      name:'Venira', domain:'venira.sk', website:'https://www.venira.sk/',
      theme:{brand:'#1a1a1a',accent:'#9c7641',soft:'#f7f1e8',paper:'#fdfcfa',ink:'#1a1a1a',line:'#ebe3d6'},
      wordmark:logo('venira','Venira'),
      hero:'/assets/cosmetics/venira.jpg', mark:'/assets/cosmetics/venira-mark.png',
      ownerNote:'Šampón na podporu rastu, s kolagénom, na objem, na mastné aj kučeravé vlasy, Hair Booster a rozmarínová voda — v rovnakých fľašiach a vo viacerých vôňach, zákazníčka nevie, ktorý je jej.',
      benefit:['Z ôsmich šampónov a vôní ten pravý','Poradí, kedy pridať Hair Booster alebo masku','Odpovie aj mimo pracovného času'],
      products:[
        {id:'rast',name:'Prírodný šampón pre podporu rastu vlasov 300 ml',price:'17,80 €',url:'https://www.venira.sk/venira-prirodny-sampon-pre-podporu-rastu-vlasov-mango-lici/',photo:photo('venira','rast'),tags:['balanced','mature','cream','simple','basic'],reason:'Komplex HotFlux® prekrví pokožku hlavy a prebudí vlasové cibuľky, chlorella a proteínový ferment posilnia vlákno — hustejšie a menej lámavé vlasy.'},
        {id:'kolagen',name:'Prírodný šampón s kolagénom pre podporu rastu vlasov 300 ml',price:'18,95 €',url:'https://www.venira.sk/venira-prirodny-sampon-s-kolagenom-pre-podporu-rastu-vlasov-mango-lici/',photo:photo('venira','kolagen'),tags:['sensitive','mature','calm','cream','simple','basic'],reason:'Maximálne šetrný šampón s morským kolagénom a HotFlux® podporuje rastovú fázu vlasov a zmierňuje vypadávanie, pokožku hlavy nechá pevnejšiu a pružnejšiu.'},
        {id:'mastne',name:'Prírodný šampón pre mastné vlasy 300 ml',price:'17,80 €',url:'https://www.venira.sk/venira-prirodny-sampon-pre-mastne-vlasy/',photo:photo('venira','mastne'),tags:['oily','clarity','cream','simple','basic'],reason:'Komplex AQUARICH® so 7 bylinami reguluje tvorbu mazu a stabilizuje mazové žľazy — vlasy ostanú čisté, vzdušné a lesklé bez zaťaženia.'},
        {id:'kucer',name:'Šampón na kučeravé vlasy 300 ml',price:'17,80 €',url:'https://www.venira.sk/venira-sampon-na-kucerave-vlasy-marhula-300ml/',photo:photo('venira','kucer'),tags:['dry','hydrate','cream','simple','basic'],reason:'Ľanové semienko a marhuľový olej znížia krepatenie, predĺžia výdrž vĺn a hydratujú suché, poškodené kučery už po prvom umytí.'},
        {id:'objem',name:'Prírodný šampón pre objem vlasov Volume Booster 300 ml',price:'18,60 €',url:'https://www.venira.sk/venira-prirodny-sampon-pre-objem-vlasov-volume-booster/',photo:photo('venira','objem'),tags:['balanced','dry','clarity','hydrate','cream','simple','basic'],reason:'Pre splihnuté, suché a nie príliš husté vlasy — dodá viditeľný objem, hebkosť a lesk a zároveň zvlhčí pokožku hlavy.'},
        {id:'booster',name:'Hair Booster – vlasové sérum na podporu rastu 100 ml',price:'31,25 €',url:'https://www.venira.sk/vlasove-serum-hair-booster/',photo:photo('venira','booster'),tags:['balanced','mature','serum','target','full'],reason:'Kopexil, kofeín a 7 bylín jemne prehrejú pokožku hlavy, zlepšia mikrocirkuláciu a predĺžia rastovú fázu — cielený krok pre slabé, rednúce vlasy.'},
        {id:'rozmarin',name:'Rozmarínová voda / tonikum na vlasy a pokožku 200 ml',price:'15,00 €',url:'https://www.venira.sk/venira-rozmarinova-voda-na-vlasy-a-pokozku/',photo:photo('venira','rozmarin'),tags:['sensitive','calm','serum','target','full'],reason:'Rozmarín s vegánskym keratínom, rebríčkom a žihľavou upokojí podráždenú pokožku hlavy, hydratuje ju a zacelí roztrepené končeky.'},
        {id:'maska',name:'Regeneračná maska na vlasy 300 ml',price:'23,30 €',url:'https://www.venira.sk/venira-regeneracni-maska-na-vlasy-kokos-300ml/',photo:photo('venira','maska'),tags:['dry','hydrate','oil','target','full'],reason:'Aminokyselinový komplex hĺbkovo regeneruje poškodené, krehké vlasy, uhladí ich a zníži krepatenie až o 29 %.'},
        {id:'kondi',name:'Kondicionér s kolagénom 300 ml',price:'19,80 €',url:'https://www.venira.sk/venira-kondicioner-s-kolagenom-mango-lici/',photo:photo('venira','kondi'),tags:['balanced','hydrate','oil','target','full'],reason:'Morský kolagén, keratín a arganový olej hydratujú a uhladia vlasy, uľahčia rozčesávanie a zlepšia ich pružnosť.'}
      ]
    },
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
