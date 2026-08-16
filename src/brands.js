const standard = [
  { title: 'Aká je vaša pleť?', hint: 'Vyberte možnosť, ktorá jej je najbližšia.', imageOffset: 0, options: [['Suchá','dry'],['Mastnejšia','oily'],['Zmiešaná','mixed'],['Citlivá','sensitive']].map(([label,value])=>({label,value})) },
  { title: 'Čo chcete riešiť?', hint: 'Jedna hlavná priorita nám pomôže zúžiť výber.', imageOffset: 4, options: [['Hydratáciu','hydration'],['Upokojenie','soothing'],['Jednoduchšiu rutinu','simple'],['Balans pleti','balance']].map(([label,value])=>({label,value})) },
  { title: 'Akú rutinu chcete?', hint: 'Od jedného produktu po pravidelnú starostlivosť.', imageOffset: 8, options: [['Jeden produkt','one'],['Základnú rutinu','basic'],['Rannú','morning'],['Večernú','night']].map(([label,value])=>({label,value})) },
  { title: 'Čo vám vyhovuje?', hint: 'Vyberte textúru, po ktorej siahate najradšej.', imageOffset: 12, options: [['Ľahký gél','gel'],['Bohatší krém','cream'],['Sérum','serum'],['Bez preferencie','neutral']].map(([label,value])=>({label,value})) },
];

const product = (name, price, url, image, features, reason) => ({ name, price, url, image, features, reason });
const common = {
  benefits: ['Menej nerozhodných zákazníkov', 'Konkrétnejší výber produktu', 'Jednoduchšia cesta k nákupu'],
  questions: standard,
};

export const brands = {
  mylo: {
    ...common, slug:'mylo', name:'MYLO', headline:'Starostlivosť, ktorá dáva zmysel.',
    logo:'https://www.mylo.sk/wp-content/uploads/Mylo_logo.png', hero:'https://www.mylo.sk/wp-content/uploads/web_opravene-1536x1024.jpg',
    teaserTitle:'Neviete, čo vašej pleti sadne?', teaser:'Štyri odpovede. Konkrétny produkt.',
    welcome:'Ahoj, som tu, aby som vám pomohla zorientovať sa v ponuke Mylo. Čo dnes hľadáte?',
    chips:['Mám suchú pleť','Niečo na citlivú pleť','Chcem jednoduchú rutinu','Čo použiť večer?'],
    fallback:()=> 'Z ponuky Mylo by som podľa tejto preferencie začala jemným čistením a hydratáciou. Pre konkrétny produkt skúste štyri krátke kroky výberu.',
    products:[
      product('Hydratačné sérum INOVAŤ','19,00 €','https://www.mylo.sk/starostlivost-o-tvar/inovat/','https://www.mylo.sk/wp-content/uploads/6-247x247.jpg',['hydrogélové sérum','niacínamid a kyselina hyalurónová','prebiotiká'],'Ľahká hydrogélová textúra zodpovedá preferencii hydratácie bez zbytočne bohatej vrstvy.'),
      product('Čistiace a odličovacie mlieko MOISSANIT','20,00 €','https://www.mylo.sk/starostlivost-o-tvar/moissanit/','https://www.mylo.sk/wp-content/uploads/mylo_prod_0108-247x247.jpg',['na tvár aj oči','aj pre citlivú pleť','jemné čistenie'],'Je vhodným začiatkom jednoduchej rutiny, keď je prioritou šetrné každodenné čistenie.'),
      product('Pleťový olej FLÓRA','2,50 € – 24,00 €','https://www.mylo.sk/starostlivost-o-tvar/flora/','https://www.mylo.sk/wp-content/uploads/mylo_prod_0123-1-247x247.jpg',['pre suchú a citlivú pleť','ruža stolistá','vyživujúce sérum'],'Bohatšia olejová starostlivosť zodpovedá preferencii suchej a citlivej pleti.'),
      product('Pleťová voda KVETOVÁ ROSA','22,00 €','https://www.mylo.sk/starostlivost-o-tvar/kvetova-rosa/','https://www.mylo.sk/wp-content/uploads/DSC_8415.jpg.1950x0_q85_crop-247x247.jpg',['tonizuje','podporuje hydratáciu','pripraví pleť na olej'],'Je praktickým ľahkým krokom medzi čistením a následnou starostlivosťou.'),
      product('Ceramidový krém s vitamínmi RADOSŤ','14,75 €','https://www.mylo.sk/starostlivost-o-tvar/ceramidovy-krem-s-vitaminmi-radost/','https://www.mylo.sk/wp-content/uploads//radost_eshop-247x247.jpg',['ceramidový krém','hydratácia','regenerácia'],'Krémová textúra a ceramidy sedia preferencii komfortnej základnej rutiny.')
    ]
  },
  ponio: {
    ...common, slug:'ponio', name:'PONIO', headline:'Rýchlejší výber pre každodennú starostlivosť.',
    logo:'https://ponio.sk/cdn/shop/files/ponio_logo_27ac333a-9012-4cc5-b9e8-1a33bb560506.png?v=1712145207&width=240', hero:'https://ponio.sk/cdn/shop/files/P1180105_8c7e019b-1021-40f1-858b-163c845a755d.jpg?v=1759301712&width=1920',
    teaserTitle:'Pleť, vlasy alebo telo?', teaser:'Nájdite správny produkt bez hľadania.',
    welcome:'Ahoj! Ponio má starostlivosť o pleť, vlasy aj telo. S čím vám dnes môžem pomôcť?',
    chips:['Krém na pleť','Citlivá pokožka','Starostlivosť o vlasy','Tuhá kozmetika'],
    fallback:()=> 'Pri Ponio je najlepšie najprv určiť oblasť starostlivosti a obľúbený formát. Výber vám potom ukáže konkrétny produkt z ponuky.',
    questions:[
      {...standard[0],title:'Čo dnes vyberáte?',options:[['Pleť','face'],['Vlasy','hair'],['Telo','body'],['Pery','lips']].map(([label,value])=>({label,value}))},
      {...standard[1],title:'Čo je priorita?',options:[['Hydratácia','hydration'],['Citlivosť','sensitive'],['Ochrana','protect'],['Každodenná sviežosť','fresh']].map(([label,value])=>({label,value}))},
      {...standard[2],title:'Aký formát vám sedí?',options:[['Krém','cream'],['Tuhý produkt','solid'],['Olej','oil'],['Voda alebo gél','water']].map(([label,value])=>({label,value}))},
      {...standard[3],title:'Ako často ho chcete používať?',options:[['Každé ráno','morning'],['Každý večer','night'],['Podľa potreby','sometimes'],['Na cestovanie','travel']].map(([label,value])=>({label,value}))}
    ],
    products:[
      product('Lumina shield – denný ochranný pleťový krém','25,30 €','https://ponio.sk/products/lumina-shield-pletovy-krem','https://ponio.sk/cdn/shop/files/P1190640.jpg?v=1696600300&width=750',['denná starostlivosť','ľahké používanie','pleťový krém'],'Zodpovedá preferencii denného krému a jednoduchej rannej rutiny.'),
      product('Healthy aging – pleťový krém pre zrelú pleť','25,30 €','https://ponio.sk/products/healthy-aging-pletovy-krem','https://ponio.sk/cdn/shop/files/P1200226.jpg?v=1699020120&width=750',['krémová textúra','pre zrelú pleť','každodenná starostlivosť'],'Je určený pre preferenciu bohatejšieho pleťového krému.'),
      product('Mint – suchý šampón','7,70 €','https://ponio.sk/products/mint-suchy-sampon','https://ponio.sk/cdn/shop/files/DSC02502.jpg?v=1758197744&width=750',['suchý šampón','rýchle osvieženie','praktický formát'],'Hodí sa, ak je prioritou rýchle osvieženie vlasov medzi umytiami.'),
      product('Banán & kokos – suchý šampón','7,70 €','https://ponio.sk/products/banan-kokos-suchy-sampon','https://ponio.sk/cdn/shop/files/DSC02466.jpg?v=1758101600&width=750',['suchý šampón','vlasová starostlivosť','praktické použitie'],'Z ponuky sedí preferencii vlasovej starostlivosti bez vody.'),
      product('Dvojitá levanduľa – žihľavový šampúch','od 4,70 €','https://ponio.sk/products/dvojita-levandula-zihlavovy-sampuch','https://ponio.sk/cdn/shop/products/levandulova250ml1.jpg?v=1679903655&width=750',['tuhý šampón','žihľava','levanduľa'],'Tuhý formát zodpovedá preferencii kompaktnej a jednoduchej vlasovej rutiny.')
    ]
  },
  two: {
    ...common, slug:'two', name:'TWO COSMETICS', headline:'Starostlivosť, ktorú si pokožka zaslúži.',
    logo:'https://twocosmetics.s14.cdn-upgates.com/5/56960eaf91b614-logo-v2.svg', hero:'https://twocosmetics.s14.cdn-upgates.com/_cache/b/7/b7cea98fa30ed04b774961bcd9b7c9dd-podla-typu-pleti-final.jpg',
    teaserTitle:'Veda a príroda, bez hádania.', teaser:'Štyri odpovede zúžia výber.',
    welcome:'Ahoj! Pomôžem vám vybrať starostlivosť TWO COSMETICS podľa typu pleti, textúry a cieľa rutiny.',
    chips:['Potrebujem hydratáciu','Citlivá pleť','Jednoduchý skinimalizmus','Večerné sérum'],
    fallback:()=> 'Pri TWO COSMETICS vieme výber zúžiť podľa typu pleti a preferovanej textúry. Z ponuky potom vyberieme konkrétnu starostlivosť.',
    products:[
      product('HA⁶ HYDRATATION BOOSTER SERUM','725 Kč','https://www.twocosmetics.cz/p/ha6-hydratation-booster-serum','https://twocosmetics.s14.cdn-upgates.com/_cache/0/b/0b6387622de2c5186e007916582b3b17-hydratation-1a-1.jpeg',['6 foriem kyseliny hyalurónovej','gélová textúra','bez pridanej parfumácie'],'Gélová textúra a hydratačné zameranie priamo zodpovedajú zvoleným preferenciám.'),
      product('BAKUCHIOL 1 % ANTI-AGE SERUM','724 Kč','https://www.twocosmetics.cz/p/bakuchiol-1-anti-age-serum','https://twocosmetics.s14.cdn-upgates.com/_cache/d/7/d7d1eab7fcc81a85650af9a547aefe12-hydratation-1a-1.jpeg',['sérum','bakuchiol 1 %','cielená starostlivosť'],'Je alternatívou pre preferenciu séra a cielenej večernej rutiny.'),
      product('Hydratačný krém','409 Kč','https://www.twocosmetics.cz/p/hydratacny-krem-s-vitaminom-e-a-bisabololom','https://twocosmetics.s14.cdn-upgates.com/_cache/b/6/b6af8dfc1ab65e2562cf94269f8c461e-two-zrela-plet.jpeg',['krémová textúra','vitamín E','bisabolol'],'Krémová textúra sedí preferencii jednoduchej hydratácie.'),
      product('Krém pre problematickú pleť','433 Kč','https://www.twocosmetics.cz/p/krem-pre-problematicku-plet-s-tea-tree-a-kyselinou-hyaluronovou','https://twocosmetics.s14.cdn-upgates.com/_cache/b/6/b6af8dfc1ab65e2562cf94269f8c461e-two-zrela-plet.jpeg',['pleťový krém','tea tree','kyselina hyalurónová'],'Z katalógu zodpovedá preferencii ľahkej starostlivosti pre problematickú pleť.'),
      product('AM/PM ROUTINE CLEANSING GEL 2% SALICYLIC ACID','554 Kč','https://www.twocosmetics.cz/p/am-pm-routine-cleansing-gel-salicylic-acid-cistiaci-gel','https://twocosmetics.s14.cdn-upgates.com/_cache/3/6/36e8041ded21fa9dbba44ad1eb559e05-hydrogel-eye-mask.jpeg',['čistiaci gél','2 % kyselina salicylová','ranná aj večerná rutina'],'Je jasným čistiacim krokom pre preferenciu pravidelnej AM/PM rutiny.')
    ]
  },
  bellcoria: {
    ...common, slug:'bellcoria', name:'BELLCORIA', headline:'Jemnejšia cesta ku konkrétnej starostlivosti.',
    logo:'https://bellcoria.sk/wp-content/uploads/Datov%C3%BD-zdroj-1@2x.png', hero:'https://bellcoria.sk/wp-content/uploads/sera-elixiri-kategoria-e1598807762151.jpg',
    teaserTitle:'Sérum, olej alebo čistenie?', teaser:'Výber podľa vašej textúry a rutiny.',
    welcome:'Dobrý deň, pomôžem vám zorientovať sa v organických olejoch, elixíroch a čistení Bellcoria.',
    chips:['Organický pleťový olej','Jemné čistenie','Večerný elixír','Kvetová voda'],
    fallback:()=> 'Bellcoria ponúka séra, organické oleje aj čistenie. Štyri krátke kroky pomôžu vybrať konkrétny produkt bez zdravotnej diagnózy.',
    products:[
      product('Organický opunciový olej','30,90 €','https://bellcoria.sk/produkty/organicky-opunciovy-olej/','https://bellcoria.sk/wp-content/uploads/opunciovy-olej-2-300x300.jpg',['100 % organický','pleťový olej','30 ml'],'Olejová textúra zodpovedá preferencii koncentrovanej večernej starostlivosti.'),
      product('Elixír proti vráskam s bakuchiolom','27,90 €','https://bellcoria.sk/produkty/elixir-proti-vraskam-s-bakuchiolom/','https://bellcoria.sk/wp-content/uploads/elixir-bakuchiol-300x300.jpg',['elixír','bakuchiol','olejová starostlivosť'],'Je konkrétnou voľbou pre preferenciu elixíru a bohatejšej textúry.'),
      product('Pleťový čistiaci gél','9,90 €','https://bellcoria.sk/produkty/pletovy-cistiaci-gel/','https://bellcoria.sk/wp-content/uploads/cistiaci-gel-300x300.jpg',['čistiaci gél','každodenné čistenie','ľahká textúra'],'Zodpovedá preferencii ľahkého a jednoduchého prvého kroku rutiny.'),
      product('Nočný elixír s vitamínom C a brusnicovým olejom','27,90 €','https://bellcoria.sk/produkty/nocny-elixir-proti-vraskam-so-stabilizovanym-vitaminom-c-a-brusnicovym-olejom/','https://bellcoria.sk/wp-content/uploads/nocny-elixir-300x300.jpg',['nočný elixír','vitamín C','brusnicový olej'],'Je určený pre preferenciu večernej olejovej starostlivosti.'),
      product('Telový olej s astaxantínom','10,90 €','https://bellcoria.sk/produkty/telovy-olej-na-podporu-opalenia-s-astaxantinom/','https://bellcoria.sk/wp-content/uploads/opalovaci-olej-300x300.jpg',['100 % organický','telový olej','astaxantín'],'Z katalógu sedí preferencii telového oleja a jednoduchej aplikácie.')
    ]
  },
  biofy: {
    ...common, slug:'biofy', name:'BIOFY', headline:'Kratšia cesta k starostlivosti pre pleť aj vlasy.',
    logo:'https://biofy.sk/wp-content/uploads/2026/06/logo-1.svg', hero:'https://biofy.sk/wp-content/uploads/2026/08/Hero-Biofy.jpg',
    teaserTitle:'Pleť, vlasy alebo telo?', teaser:'Štyri kroky k produktu z ponuky Biofy.',
    welcome:'Ahoj! Biofy ponúka starostlivosť o pleť, vlasy aj telo. Ktorú oblasť chcete riešiť?',
    chips:['Suchá a citlivá pleť','Normálna až zmiešaná pleť','Starostlivosť o vlasy','Telo a sprcha'],
    fallback:()=> 'V Biofy sa dá výber rozdeliť medzi pleť, vlasy a telo. Vo Výbere starostlivosti nájdeme konkrétny produkt podľa vašej rutiny.',
    questions:[
      {...standard[0],title:'Pre ktorú oblasť vyberáte?',options:[['Pleť','face'],['Vlasy','hair'],['Telo','body'],['Darčekové balenie','gift']].map(([label,value])=>({label,value}))},standard[1],standard[2],standard[3]
    ],
    products:[
      product('Hydratačný krém na suchú a citlivú pleť 60 ml','15,90 €','https://biofy.sk/produkt/hydratacny-krem-na-suchu-a-citlivu-plet-60ml-2/','https://biofy.sk/wp-content/uploads/2026/06/hydratacny-krem-na-suchu-a-citlivu-plet-650x487.png',['ľahká textúra','suchá a citlivá pleť','60 ml'],'Typ pleti a preferencia hydratačného krému sa zhodujú s určením produktu.'),
      product('Výživný krém na normálnu a zmiešanú pleť 60 ml','16,09 €','https://biofy.sk/produkt/vyzivny-krem-na-normalnu-a-zmiesanu-plet-60ml/','https://biofy.sk/wp-content/uploads/2026/06/vyzivny_krem_zmiesana_plet-650x487.png',['výživný krém','normálna a zmiešaná pleť','60 ml'],'Zodpovedá voľbe normálnej až zmiešanej pleti a krémovej textúry.'),
      product('Konopný krém na suchú a problematickú pleť 50 ml','13,35 €','https://biofy.sk/produkt/konopny-krem-na-suchu-a-problematicku-plet-50ml/','https://biofy.sk/wp-content/uploads/2026/06/konopny-krem-650x487.png',['konopný krém','suchá a problematická pleť','50 ml'],'Je konkrétnou voľbou pre suchú pleť a preferenciu krému.'),
      product('Vlasové tonikum na rast vlasov s rozmarínom 100 ml','12,67 €','https://biofy.sk/produkt/tonikum-na-rast-vlasov-s-rozmarinom-100ml/','https://biofy.sk/wp-content/uploads/2026/06/Tonikum_na_rast_vlasov_biofy-650x487.jpg',['vlasové tonikum','rozmarín','100 ml'],'Z ponuky sedí preferencii cielenej vlasovej starostlivosti.'),
      product('Ošetrujúci olejček na vlasy – 9 vzácnych olejov 50 ml','11,93 €','https://biofy.sk/produkt/osetrujuci-olejcek-na-vlasy-9-vzacnych-olejov-50ml/','https://biofy.sk/wp-content/uploads/2026/06/osetrujuci-olejcek-na-vlasy-1024x768.png',['9 olejov','vlasová starostlivosť','50 ml'],'Olejová forma zodpovedá preferencii výživy suchších vlasov.')
    ]
  },
  anemone: {
    ...common, slug:'anemone', name:'ANEMONE', headline:'Starostlivosť, ktorá dýcha prírodou.',
    logo:'https://anemone.sk/img/logo-1763572920.jpg', hero:'https://anemone.sk/71-large_default/pletovy-olej-na-zrelu-plet.jpg',
    teaserTitle:'Ktorý prírodný rituál vám sedí?', teaser:'Vyberieme konkrétnu starostlivosť.',
    welcome:'Ahoj, pomôžem vám vybrať z kvetových vôd, pleťových olejov, balzamov a vlasovej starostlivosti Anemone.',
    chips:['Kvetová voda','Pleťový olej','Balzam na pery','Tuhý šampón'],
    fallback:()=> 'Anemone má pleťové oleje, kvetové vody, balzamy aj vlasovú starostlivosť. Štyri kroky zúžia výber na konkrétny produkt.',
    questions:[
      {...standard[0],title:'Aký rituál hľadáte?',options:[['Pleťová voda','water'],['Pleťový olej','oil'],['Balzam','balm'],['Vlasy','hair']].map(([label,value])=>({label,value}))},standard[1],standard[2],standard[3]
    ],
    products:[
      product('Kvetová voda Ruža damascénska','5,30 €','https://anemone.sk/kvetinove-vody/kvetinova-voda-ruza-damascenska.html','https://anemone.sk/86-medium_default/kvetinova-voda-ruza-damascenska.jpg',['kvetová voda','ruža damascénska','ľahký krok rutiny'],'Zodpovedá preferencii kvetovej vody a ľahkej každodennej starostlivosti.'),
      product('Kvetová voda Harmanček','4,00 €','https://anemone.sk/kvetinove-vody/kvetinova-voda-harmancek.html','https://anemone.sk/85-medium_default/kvetinova-voda-harmancek.jpg',['kvetová voda','harmanček','jemná aplikácia'],'Je vhodnou voľbou pri preferencii jednoduchého kvetového kroku.'),
      product('Pleťový olej na zrelú pleť','8,90 €','https://anemone.sk/pletove-oleje-a-sera/pletovy-olej-na-zrelu-plet.html','https://anemone.sk/71-medium_default/pletovy-olej-na-zrelu-plet.jpg',['pleťový olej','pre zrelú pleť','večerná starostlivosť'],'Olejový formát priamo zodpovedá preferencii bohatejšej večernej rutiny.'),
      product('Balzam na pery Mandarínka & grep','3,70 €','https://anemone.sk/balzamy-na-pery/balzam-na-pery-mandarinka-grep.html','https://anemone.sk/122-medium_default/balzam-na-pery-mandarinka-grep.jpg',['balzam na pery','mandarínka a grep','praktický formát'],'Je konkrétnou voľbou pre rýchlu starostlivosť o pery.'),
      product('Tuhý šampón Šalvia & levanduľa','7,00 €','https://anemone.sk/starostlivost-o-vlasy/tuhy-sampon-salvia-levandula.html','https://anemone.sk/87-medium_default/tuhy-sampon-salvia-levandula.jpg',['tuhý šampón','šalvia a levanduľa','vlasová starostlivosť'],'Tuhý formát zodpovedá preferencii kompaktnej vlasovej rutiny.')
    ]
  }
};

const assetExtension = (url) => new URL(url).pathname.match(/\.(svg|png|jpe?g|webp)$/i)?.[0].toLowerCase() ?? '.jpg';
for (const [slug, brand] of Object.entries(brands)) {
  brand.remoteLogo = brand.logo;
  brand.remoteHero = brand.hero;
  brand.logo = `/assets/brands/${slug}/logo${assetExtension(brand.logo)}`;
  brand.hero = `/assets/brands/${slug}/hero${assetExtension(brand.hero)}`;
  brand.products.forEach((item, index) => {
    item.remoteImage = item.image;
    item.image = `/assets/brands/${slug}/product-${index + 1}${assetExtension(item.image)}`;
  });
}

export const brandOrder = Object.keys(brands);
