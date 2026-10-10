# Zdroje a overenie segmentu rastlín

Kontrola 9. 10. 2026. Ceny a stav skladu sú snímkou skutočnej ponuky; ukážky nerobia živú synchronizáciu. Používame len vlastné e-shopy a nimi priradené produktové fotografie. Vylúčené sú chýbajúce obrázky, predobjednávky a nejednoznačné ceny variantov. Pri doporučení sa zobrazí názov, cena a presný produktový odkaz.

Výber má štyri kroky, ale otázky sa menia podľa kategórie. Svetlo, doložené zaradenie pre zvieratá, rozmer, materiál, účel substrátu a rozpočet sa filtrujú ako záväzné požiadavky. Nasledujúca otázka ponúkne len možnosti zostávajúce v katalógu. Bez presnej zhody sa neponúkne nevhodná náhrada. Neznáma vlastnosť sa považuje za neoverenú. Polotieň neznamená tmavú miestnosť. Tvrdenia o bezpečnosti rastlín sú zaradením predajcu, nie odporúčaním ich konzumovať.

Fotografie: celý produkt zachovaný, upravené len okraje, veľkosť a pozadie pomocou PIL v `tools/make_assets.py`. Hero je koláž oficiálnych produktov, mobil má vlastnú horizontálnu koláž. Nepoužívajú sa generované fotografie. V každej správe asistenta a launcheri je rovnaký oficiálny značkový motív v kruhu na tmavej farbe značky.

## Plantizia

- Web a identita predajcu: [https://plantizia.sk/](https://plantizia.sk/), [obchodné podmienky](https://plantizia.sk/obchodne-podmienky/).
- Firma: **prírodno s. r. o., IČO 52542858**. Vlastníci: Mgr. Matúš Varsik. Konatelia: Mgr. Matúš Varsik.
- Veľkosť: **685 249 € tržby 2025; 5–9 zam.**. Kód zamestnancov `05`; [primárny register](https://www.registeruz.sk/cruz-public/api/uctovna-jednotka?id=1870632). [Výkaz za 2025](https://www.registeruz.sk/cruz-public/domain/financialreport/show/10255108/545); tržby sú celofiremné, nie iba e-shop. [Vlastníci](https://api.statistics.sk/rpo/v1/entity/10031022).
- Rozhodujúci predajca je `prírodno s. r. o.` podľa VOP; pridruženú firmu Plantizia s. r. o. (iné IČO) nezamieňame s predajcom. Rodinný príbeh Evky a Matúša je na [O nás](https://plantizia.sk/o-nas/). Tržby 2024 boli 639 997 €, rast 2025 približne 7 %.
- Ceny, sklad a atribúty: verejná [WooCommerce Store API](https://plantizia.sk/wp-json/wc/store/v1/products?per_page=100), kategórie 92, 161, 181 a 156. Len `is_in_stock`, `is_purchasable`, pevná cena bez rozsahu či variantov; predobjednávky vyradené aj podľa popisu. Pri teráriách sú v tejto skladovej snímke hotové kompozície s tillandsiami; workshopy, DIY, prázdne sklo a kamienky sú vyradené.
- Logo: [oficiálny SVG wordmark](https://plantizia.sk/wp-content/uploads/2026/07/Plantizia-logo-website-2.svg), vyrenderovaný na 4× veľkosť a vyhladený. Symbol: [oficiálna rastlina](https://plantizia.sk/wp-content/uploads/2026/04/cropped-Logo-rastlina-192x192.png). Zelená `#035d30` je priamo z SVG.
- Farby: `brand: #035d30`, `accent: #035d30`, `soft: #eef3e9`, `paper: #fffefb`, `ink: #18271d`, `line: #d4dfd2`. Biela na brand aj accent dosahuje WCAG kontrast ≥ 4,5 : 1; kontroluje QA.
- Rozsah: **112 produktov**, izbové rastliny, črepníky, substráty, teráriá. Výber je kurátorovaný zo skladovej ponuky; nejde o tvrdenie, že bol načítaný úplne celý e-shop. Pri vyšších cenách sa hranice rozpočtu prispôsobia zostávajúcim produktom.
- Doklady: `research/2026-10-09/plantizia-registry.json`, `plantizia-products.json`. Pri každej položke je URL, oficiálny zdroj fotografie, cena, stav, kategória a doložené fakty. QA: `qa-review/plantizia-qa.json`, matica `qa-review/matrix.json`, prezreté UI a produktové kontaktné hárky.

| Produkt / variant | Kategória | Cena | Produkt skladom pri kontrole |
|---|---|---:|---|
| Drosera capensis | izbové rastliny | 8,50 € | [detail](https://plantizia.sk/obchod/drosera-capensis/) |
| Asparagus setaceus malý | izbové rastliny | 8,90 € | [detail](https://plantizia.sk/obchod/asparagus-setaceus-maly/) |
| Tillandsia caput medusae v skle | teráriá | 11,90 € | [detail](https://plantizia.sk/obchod/tillandsia-caput-medusae-v-skle/) |
| Dekoračný kvetináč Terazzo | črepníky | 9,90 € | [detail](https://plantizia.sk/obchod/dekoracny-kvetinac-terazzo/) |
| Tillandsia ionantha ružová | izbové rastliny | 5,90 € | [detail](https://plantizia.sk/obchod/tillandsia-ionantha-ruzova/) |
| Dekoračný kvetináč Papagáj modrý 6 cm | črepníky | 5,90 € | [detail](https://plantizia.sk/obchod/dekoracny-kvetinac-papagaj-modry-6-cm/) |
| Hoštický substrát pre izbové rastliny 10 l | substráty | 5,50 € | [detail](https://plantizia.sk/obchod/hosticky-substrat-pre-izbove-rastliny-10-l/) |
| Brečtan / Hedera helix ‘Wonder’ | izbové rastliny | 6,90 € | [detail](https://plantizia.sk/obchod/brectan-hedera-helix-wonder/) |
| Opuntia microdasys albispina malá | izbové rastliny | 6,90 € | [detail](https://plantizia.sk/obchod/opuntia-microdasys-albispina/) |
| Pilea peperomioides malá | izbové rastliny | 6,90 € | [detail](https://plantizia.sk/obchod/pilea-peperomioides-mini/) |
| Alocasia ‘Dragon Scale’ malá | izbové rastliny | 9,90 € | [detail](https://plantizia.sk/obchod/alocasia-dragon-scale-mala/) |
| Kávovník / Coffea Arabica malá | izbové rastliny | 9,90 € | [detail](https://plantizia.sk/obchod/kavovnik-coffea-arabica-mala/) |
| Nepenthes ‘Rebecca Soper’ | izbové rastliny | 9,90 € | [detail](https://plantizia.sk/obchod/nepenthes-rebecca-soper/) |
| Rodinné šťastie aurea / Soleirolia soleirolii aurea | izbové rastliny | 9,90 € | [detail](https://plantizia.sk/obchod/rodinne-stastie-aurea-soleirolia-soleirolii-aurea/) |
| Starček / Senecio rowleyanus variegated malý | izbové rastliny | 9,90 € | [detail](https://plantizia.sk/obchod/starcek-senecio-rowleyanus-variegated-maly/) |
| Ficus benjamina ‘Green Kinky’ | izbové rastliny | 11,90 € | [detail](https://plantizia.sk/obchod/ficus-benjamina-green-kinky/) |
| Lampášik / Ceropegia woodii ‘Variegata’ stredná | izbové rastliny | 11,90 € | [detail](https://plantizia.sk/obchod/lampasik-ceropegia-woodii-variegata-stredna/) |
| Zamioculcas zamiifolia | izbové rastliny | 11,90 € | [detail](https://plantizia.sk/obchod/zamioculcas-zamiifolia/) |
| Hoya crassipetiolata ‘Splash’ | izbové rastliny | 13,90 € | [detail](https://plantizia.sk/obchod/hoya-crassipetiolata-splash/) |
| Monstera ‘Frozen Freckles’ | izbové rastliny | 14,90 € | [detail](https://plantizia.sk/obchod/monstera-frozen-freckles/) |
| Tillandsia capitata v aeráriu | izbové rastliny | 14,90 € | [detail](https://plantizia.sk/obchod/tillandsia-capitata-v-aerariu/) |
| Aranžmán s tillandsiou zelenou v guľatom skle 12 cm | izbové rastliny | 16,90 € | [detail](https://plantizia.sk/obchod/aranzman-s-tillandsiou-zelenou-v-gulatom-skle-12-cm/) |
| Nepenthes gaya | izbové rastliny | 16,90 € | [detail](https://plantizia.sk/obchod/nepenthes-gaya/) |
| Zelenec / Chlorophytum orchidastrum ‘Fire Flash’ | izbové rastliny | 16,90 € | [detail](https://plantizia.sk/obchod/zelenec-chlorophytum-orchidastrum-fire-flash/) |
| Scindapsus treubii ‘Dark form’ | izbové rastliny | 17,90 € | [detail](https://plantizia.sk/obchod/scindapsus-treubii-dark-form/) |
| Havajská palma / Brighamia insignis | izbové rastliny | 18,90 € | [detail](https://plantizia.sk/obchod/havajska-palma-brighamia-insignis/) |
| Stephania erecta hľuza | izbové rastliny | 18,90 € | [detail](https://plantizia.sk/obchod/stephania-erecta-hluza/) |
| Anthurium andraeanum ‘Lilli’ | izbové rastliny | 19,90 € | [detail](https://plantizia.sk/obchod/anthurium-andraeanum-lilli/) |
| Lopatkovec / Spathiphyllum wallisii ‘Diamond’ | izbové rastliny | 19,90 € | [detail](https://plantizia.sk/obchod/lopatkovec-spathiphyllum-wallisii-diamond/) |
| Orchidea Dendrobium Sa-Nook ‘White Pink’ | izbové rastliny | 19,90 € | [detail](https://plantizia.sk/obchod/orchidea-dendrobium-sa-nook-white-pink/) |
| Philodendron ‘Ring of fire’ | izbové rastliny | 19,90 € | [detail](https://plantizia.sk/obchod/philodendron-ring-of-fire/) |
| Vitrážové terárium so zelenou tillandsiou | izbové rastliny | 19,90 € | [detail](https://plantizia.sk/obchod/vitrazove-terarium-so-zelenou-tillandsiou/) |
| Adenium ‘Ansu Baobab’ | izbové rastliny | 24,90 € | [detail](https://plantizia.sk/obchod/adenium-ansu-baobab/) |
| Areca Dypsis lutescens veľká | izbové rastliny | 24,90 € | [detail](https://plantizia.sk/obchod/areca-dypsis-lutescens-velka/) |
| Orchidea Oncidium ‘Charlesworthii’ | izbové rastliny | 24,90 € | [detail](https://plantizia.sk/obchod/orchidea-oncidium-charlesworthii/) |
| Zamioculcas ‘Zenzi’ | izbové rastliny | 24,90 € | [detail](https://plantizia.sk/obchod/zamioculcas-zenzi-2/) |
| Monstera obliqua | izbové rastliny | 26,90 € | [detail](https://plantizia.sk/obchod/monstera-obliqua/) |
| Monstera ‘Burle Marx Flame’ veľká | izbové rastliny | 29,90 € | [detail](https://plantizia.sk/obchod/monstera-burle-marx-flame-velka-2/) |
| Aglaonema ‘Eyecatcher’ veľká | izbové rastliny | 34,90 € | [detail](https://plantizia.sk/obchod/aglaonema-eyecatcher-red-velka/) |
| Aglaonema ‘Red Sprinkles’ veľká | izbové rastliny | 34,90 € | [detail](https://plantizia.sk/obchod/aglaonema-red-sprinkles-velka/) |
| Sansevieria trifasciata ‘Laurentii’ veľká | izbové rastliny | 36,90 € | [detail](https://plantizia.sk/obchod/sansevieria-trifasciata-laurentii-velka/) |
| Strelitzia nicolai veľká | izbové rastliny | 59,90 € | [detail](https://plantizia.sk/obchod/strelitzia-nicolai-velka/) |
| Monstera deliciosa ‘Mint’ veľká | izbové rastliny | 79,90 € | [detail](https://plantizia.sk/obchod/monstera-deliciosa-mint-velka-2/) |
| Cyperus zumula / Mačacia tráva | izbové rastliny | 4,50 € | [detail](https://plantizia.sk/obchod/cyperus-zumula-macacia-trava/) |
| Tillandsia capitata | izbové rastliny | 5,90 € | [detail](https://plantizia.sk/obchod/tillandsia-capitata/) |
| Tillandsia caput medusae | izbové rastliny | 5,90 € | [detail](https://plantizia.sk/obchod/tillandsia-caput-medusae/) |
| Brečtan / Hedera Helix variegata | izbové rastliny | 6,90 € | [detail](https://plantizia.sk/obchod/brectan-hedera-helix-variegata/) |
| Kaktus Hylocereus undatus | izbové rastliny | 6,90 € | [detail](https://plantizia.sk/obchod/kaktus-hylocereus-undatus/) |
| Peperomia prostrata malá | izbové rastliny | 6,90 € | [detail](https://plantizia.sk/obchod/peperomia-prostrata-mala/) |
| Pilea glauca aquamarine malá | izbové rastliny | 6,90 € | [detail](https://plantizia.sk/obchod/pilea-glauca-aquamarine-mala/) |
| Živé kamene / Lithopsy hnedé | izbové rastliny | 6,90 € | [detail](https://plantizia.sk/obchod/zive-kamene-lithopsy-hnede/) |
| Alocasia scalprum malá | izbové rastliny | 7,90 € | [detail](https://plantizia.sk/obchod/alocasia-scalprum-mala/) |
| Lampášik / Ceropegia woodii variegata mini | izbové rastliny | 7,90 € | [detail](https://plantizia.sk/obchod/lampasik-ceropegia-woodii-variegata-mini/) |
| Tradescantia ‘Nanouk’ | izbové rastliny | 7,90 € | [detail](https://plantizia.sk/obchod/tradescantia-nanouk/) |
| Zelenec / Chlorophytum comosum ‘Ocean’ malý | izbové rastliny | 7,90 € | [detail](https://plantizia.sk/obchod/zelenec-chlorophytum-ocean-maly/) |
| Mäsožravá rastlina Pinguicula agnata | izbové rastliny | 8,50 € | [detail](https://plantizia.sk/obchod/masozrava-rastlina-pinguicula-agnata/) |
| Alocasia ‘Antoro velvet’ malá | izbové rastliny | 8,90 € | [detail](https://plantizia.sk/obchod/alocasia-antoro-velvet-stredna/) |
| Aglaonema ‘White Anyamanee’ malá | izbové rastliny | 9,90 € | [detail](https://plantizia.sk/obchod/aglaonema-white-anyamanee-mala/) |
| Alocasia cuprea ‘Red Secret’ malá | izbové rastliny | 9,90 € | [detail](https://plantizia.sk/obchod/alocasia-cuprea-red-secret-mala/) |
| Hoya carnosa ‘Freckles’ | izbové rastliny | 9,90 € | [detail](https://plantizia.sk/obchod/hoya-carnosa-freckles/) |
| Mäsožravá rastlina Sarracenia purpurea venosa | izbové rastliny | 9,90 € | [detail](https://plantizia.sk/obchod/sarracenia-purpurea-venosa/) |
| Philodendron ‘Pink Princess Marble’ malý | izbové rastliny | 9,90 € | [detail](https://plantizia.sk/obchod/philodendron-pink-princess-marble-maly/) |
| Philodendron ‘Ring of fire’ malý | izbové rastliny | 9,90 € | [detail](https://plantizia.sk/obchod/philodendron-ring-of-fire-maly/) |
| Selaginella lepidophylla / Ruža z jericha | izbové rastliny | 9,90 € | [detail](https://plantizia.sk/obchod/selaginella-lepidophylla-ruza-z-jericha/) |
| Slonia noha / Nolina recurvata malá | izbové rastliny | 9,90 € | [detail](https://plantizia.sk/obchod/slonia-noha-nolina-recurvata-mala/) |
| Syngonium ‘Milk Confetti’ | izbové rastliny | 9,90 € | [detail](https://plantizia.sk/obchod/syngonium-milk-confetti/) |
| Adenium obesum mini / Púštna ruža | izbové rastliny | 11,90 € | [detail](https://plantizia.sk/obchod/adenium-obesum-mini/) |
| Hypoestes farebný mix | izbové rastliny | 11,90 € | [detail](https://plantizia.sk/obchod/hypoestes-farebny-mix/) |
| Dekoračný kvetináč Papagáj červený 6 cm | črepníky | 5,90 € | [detail](https://plantizia.sk/obchod/dekoracny-kvetinac-papagaj-cerveny-6-cm/) |
| Keramický kvetináč Corym čierny 13 cm | črepníky | 7,90 € | [detail](https://plantizia.sk/obchod/keramicky-kvetinac-corym-cierny-13-cm/) |
| Keramický kvetináč Bubble lilac 10 cm | črepníky | 9,90 € | [detail](https://plantizia.sk/obchod/keramicky-kvetinac-bubble-lilac-10-cm/) |
| Keramický kvetináč Bubble peach 10 cm | črepníky | 9,90 € | [detail](https://plantizia.sk/obchod/keramicky-kvetinac-bubble-peach-10-cm/) |
| Keramický kvetináč Bubble violet 10 cm | črepníky | 9,90 € | [detail](https://plantizia.sk/obchod/keramicky-kvetinac-bubble-violet-10-cm/) |
| Keramický kvetináč Bubble white 10 cm | črepníky | 9,90 € | [detail](https://plantizia.sk/obchod/keramicky-kvetinac-bubble-white-10-cm/) |
| Keramický kvetináč Simple line white 13 cm | črepníky | 9,90 € | [detail](https://plantizia.sk/obchod/keramicky-kvetinac-simple-line-white-13-cm/) |
| Keramický kvetináč na orchidey biely 13 cm | črepníky | 9,90 € | [detail](https://plantizia.sk/obchod/keramicky-kvetinac-na-orchidey-biely-13-cm/) |
| Keramický kvetináč na orchidey ružový 13 cm | črepníky | 9,90 € | [detail](https://plantizia.sk/obchod/keramicky-kvetinac-na-orchidey-ruzovy-13-cm/) |
| Keramický črepník s podmiskou Aqua | črepníky | 9,90 € | [detail](https://plantizia.sk/obchod/keramicky-crepnik-s-podmiskou-aqua/) |
| Keramický črepník s podmiskou Blue Wave | črepníky | 9,90 € | [detail](https://plantizia.sk/obchod/keramicky-crepnik-s-podmiskou-blue-wave/) |
| Keramický kvetináč Simple line black 13 cm | črepníky | 11,90 € | [detail](https://plantizia.sk/obchod/keramicky-kvetinac-simple-line-black-13-cm/) |
| Keramický kvetináč Simple line green 13 cm | črepníky | 11,90 € | [detail](https://plantizia.sk/obchod/keramicky-kvetinac-simple-line-green-13-cm/) |
| Keramický kvetináč Trophy green 13 cm | črepníky | 11,90 € | [detail](https://plantizia.sk/obchod/keramicky-kvetinac-trophy-green13-cm/) |
| Keramický kvetináč Trophy pink 13 cm | črepníky | 11,90 € | [detail](https://plantizia.sk/obchod/keramicky-kvetinac-trophy-pink-13-cm/) |
| Keramický kvetináč Duo Rainbow sivý | črepníky | 12,90 € | [detail](https://plantizia.sk/obchod/keramicky-kvetinac-duo-rainbow-sivy/) |
| Keramický kvetináč Duo Rainbow svetlozelený | črepníky | 12,90 € | [detail](https://plantizia.sk/obchod/keramicky-kvetinac-duo-rainbow-svetlozeleny/) |
| Dekoračný kvetináč Antique Fig 13 cm | črepníky | 15,90 € | [detail](https://plantizia.sk/obchod/dekoracny-kvetinac-antique-fig-13-cm/) |
| Dekoračný kvetináč Origami biely 13 cm | črepníky | 15,90 € | [detail](https://plantizia.sk/obchod/dekoracny-kvetinac-origami-biely-13-cm/) |
| Plastový podlhovastý kvetináč čierny na nožičkách 58 cm | črepníky | 19,90 € | [detail](https://plantizia.sk/obchod/plastovy-podlhovasty-kvetinac-cierny-na-nozickach-58-cm/) |
| Vysoký hrant s vkladom antracitový 77 cm | črepníky | 89,90 € | [detail](https://plantizia.sk/obchod/vysoky-hrant-s-vkladom-antracitovy-77-cm/) |
| Vysoký hrant s vkladom biely 77 cm | črepníky | 89,90 € | [detail](https://plantizia.sk/obchod/vysoky-hrant-s-vkladom-biely-77-cm/) |
| Forestina Substrát pre orchidey 2 l | substráty | 2,90 € | [detail](https://plantizia.sk/obchod/substrat-pre-orchidey-2-l/) |
| Hoštický substrát pre izbové rastliny 5 l | substráty | 3,90 € | [detail](https://plantizia.sk/obchod/hosticky-substrat-pre-izbove-rastliny-5-l/) |
| Rosteto Substrát pre orchidey 3 l | substráty | 4,90 € | [detail](https://plantizia.sk/obchod/rosteto-substrat-pre-orchidey-3-l/) |
| Substrát Profík pre izbové rastliny 5 l | substráty | 4,90 € | [detail](https://plantizia.sk/obchod/substrat-profik-pre-izbove-rastliny-5-l/) |
| Substrát Profík pre výsev a množenie 5 l | substráty | 4,90 € | [detail](https://plantizia.sk/obchod/substrat-profik-pre-vysev-a-mnozenie-5-l/) |
| Substrát pre bonsaje rašelina premium 5 l | substráty | 4,90 € | [detail](https://plantizia.sk/obchod/substrat-pre-bonsaje-raselina-premium-5-l/) |
| Substrát rašelina premium pre kaktusy a sukulenty 5 l | substráty | 4,90 € | [detail](https://plantizia.sk/obchod/substrat-raselina-premium-pre-kaktusy-a-sukulenty-5-l/) |
| Substrát Profík pre bonsaje 5 l | substráty | 5,90 € | [detail](https://plantizia.sk/obchod/substrat-profik-pre-bonsaje-5-l/) |
| Substrát Profík pre orchidey a bromélie 5 l | substráty | 5,90 € | [detail](https://plantizia.sk/obchod/substrat-profik-pre-orchidee-a-bromelie-5-l/) |
| Substrát Profík pre kaktusy a sukulenty 5 l | substráty | 6,90 € | [detail](https://plantizia.sk/obchod/substrat-profik-pre-kaktusy-a-sukulenty-5-l/) |
| Hoštický substrát pre izbové rastliny 20 l | substráty | 7,90 € | [detail](https://plantizia.sk/obchod/hosticky-substrat-pre-izbove-rastliny-20-l/) |
| Substrát Profík pre citrusy 15 l | substráty | 7,90 € | [detail](https://plantizia.sk/obchod/substrat-profik-pre-citrusy-15-l/) |
| Substrát Profík pre izbové rastliny 15 l | substráty | 7,90 € | [detail](https://plantizia.sk/obchod/substrat-profik-pre-izbove-rastliny-15-l/) |
| Substrát Profík pre izbové rastliny minerálny 5 l | substráty | 7,90 € | [detail](https://plantizia.sk/obchod/substrat-profik-pre-izbove-rastliny-mineralny-5-l/) |
| Substrát Profík pre výsev a množenie 15 l | substráty | 7,90 € | [detail](https://plantizia.sk/obchod/substrat-profik-pre-vysev-a-mnozenie-15-l/) |
| Hoštický substrát pre palmy, juky, dracény 20 l | substráty | 8,90 € | [detail](https://plantizia.sk/obchod/hosticky-substrat-pre-palmy-juky-draceny-20-l/) |
| Rosteto Substrát pre orchidey 8 l | substráty | 9,90 € | [detail](https://plantizia.sk/obchod/rosteto-substrat-pre-orchidey-8-l/) |
| Tillandsia ionantha ružová v skle | teráriá | 11,90 € | [detail](https://plantizia.sk/obchod/tillandsia-ionantha-ruzova-v-skle/) |
| Tillandsia ionantha zelená v aeráriu | teráriá | 14,90 € | [detail](https://plantizia.sk/obchod/tillandsia-ionantha-zelena-v-aerariu/) |
| Aranžmán s tillandsiou ružovou v aeráriu 15 cm | teráriá | 16,90 € | [detail](https://plantizia.sk/obchod/aranzman-s-tillandsiou-ruzovou-v-aerariu-10-cm/) |
| Aranžmán s tillandsiou ružovou v guľatom skle 12 cm | teráriá | 16,90 € | [detail](https://plantizia.sk/obchod/aranzman-s-tillandsiou-ruzovou-v-gulatom-skle-12-cm/) |
| Vitrážové terárium s ružovou tillandsiou | teráriá | 21,90 € | [detail](https://plantizia.sk/obchod/vitrazove-terarium-s-tillandsiou/) |

## Garden Holice

- Web a identita predajcu: [https://www.gardenholice.sk/](https://www.gardenholice.sk/), [obchodné podmienky](https://www.gardenholice.sk/obchodne-podmienky/).
- Firma: **Green-Oasis, spol. s r. o., IČO 46658793**. Vlastníci: Bc. Ľubica Osvald, Dominik Lichner. Konatelia: Bc. Ľubica Osvald, Dominik Lichner.
- Veľkosť: **119 662 € tržby 2025; 5–9 zam.**. Kód zamestnancov `05`; [primárny register](https://www.registeruz.sk/cruz-public/api/uctovna-jednotka?id=1221934). [Výkaz za 2025](https://www.registeruz.sk/cruz-public/domain/financialreport/show/9985788/545); tržby sú celofiremné, nie iba e-shop. [Vlastníci](https://api.statistics.sk/rpo/v1/entity/418929).
- Ceny a sklad: Shoptet mikroúdaje kategórií a kontrola na detailoch produktov. Vyradených 9 položiek bez skutočnej fotografie alebo s placeholderom. Vlhčená utierka nepatrí medzi substráty; Lupinus The Governor mal príliš širokú skupinovú fotografiu s drobnými produktmi. Aj tieto dve položky sú vyradené. Pri črepníkoch je šírka/priemer odlíšený od výšky; podmiska spomenutá v texte sa nepovažuje za samostatný produkt.
- Logo: [oficiálny wordmark](https://cdn.myshoptet.com/usr/www.gardenholice.sk/user/logos/dizajn_bez_na__zvu_(44).png), symbol [strom z faviconu](https://www.gardenholice.sk/favicon.png). Zlaté logo ostáva v pôvodnej farbe; tmavohnedá podložka zabezpečuje čitateľnosť. Téma vychádza zo zlatohnedej identity e-shopu.
- Farby: `brand: #393225`, `accent: #75613d`, `soft: #f4f0e6`, `paper: #fffefb`, `ink: #29251d`, `line: #dfd8c8`. Biela na brand aj accent dosahuje WCAG kontrast ≥ 4,5 : 1; kontroluje QA.
- Rozsah: **69 produktov**, izbové rastliny, záhrada, črepníky, substráty. Výber je kurátorovaný zo skladovej ponuky; nejde o tvrdenie, že bol načítaný úplne celý e-shop. Pri vyšších cenách sa hranice rozpočtu prispôsobia zostávajúcim produktom.
- Doklady: `research/2026-10-09/gardenholice-registry.json`, `gardenholice-products.json`. Pri každej položke je URL, oficiálny zdroj fotografie, cena, stav, kategória a doložené fakty. QA: `qa-review/gardenholice-qa.json`, matica `qa-review/matrix.json`, prezreté UI a produktové kontaktné hárky.

| Produkt / variant | Kategória | Cena | Produkt skladom pri kontrole |
|---|---|---:|---|
| Strelitzia reginae 5L | izbové rastliny | 15,90 € | [detail](https://www.gardenholice.sk/strelitzia-reginae-5l/) |
| AGAVE DESMETIANA "Variegata" Clt. 7,5 | izbové rastliny | 29,00 € | [detail](https://www.gardenholice.sk/agave-desmetiana--variegata--clt--7-5/) |
| Chamaecyparis pisifera cumulus | záhrada | 9,90 € | [detail](https://www.gardenholice.sk/chamaecyparis-pisifera-cumulus/) |
| Betonový kvetináč 30cm | črepníky | 59,00 € | [detail](https://www.gardenholice.sk/betonovy-kvetinac-30cm/) |
| Substrát hoštický pre izbové rastliny 10L | substráty | 5,60 € | [detail](https://www.gardenholice.sk/substrat-hosticky-pre-izbove-rastliny-10l/) |
| Phoenix canariensis | izbové rastliny | 33,90 € | [detail](https://www.gardenholice.sk/phoenix-canariensis/) |
| Yucca rostrata | izbové rastliny | 39,00 € | [detail](https://www.gardenholice.sk/yucca-rostrata/) |
| Yucca variegata | izbové rastliny | 40,90 € | [detail](https://www.gardenholice.sk/yucca-variegata/) |
| yucca gloriosa silver | izbové rastliny | 40,90 € | [detail](https://www.gardenholice.sk/yucca-gloriosa-silver/) |
| Agave red edge compact | izbové rastliny | 49,00 € | [detail](https://www.gardenholice.sk/agave-red-edge-compact/) |
| Citrus Chinotto mandarin | izbové rastliny | 57,90 € | [detail](https://www.gardenholice.sk/citrus-chinotto-mandarin/) |
| Citrus ret Clementin | izbové rastliny | 57,90 € | [detail](https://www.gardenholice.sk/citrus-ret-clementin/) |
| Quercus ilex 8/10L | izbové rastliny | 59,00 € | [detail](https://www.gardenholice.sk/quercus-ilex-8-10l/) |
| Strelitzia reginae s | izbové rastliny | 59,90 € | [detail](https://www.gardenholice.sk/strelitzia-reginae-s/) |
| Yucca elephantipes 8/10 L | izbové rastliny | 59,90 € | [detail](https://www.gardenholice.sk/yucca-elephantipes-8-10-l/) |
| Chamaerops humilis / palma | izbové rastliny | 79,00 € | [detail](https://www.gardenholice.sk/chamaerops-humilis-palma/) |
| Edgeworthia chrys. ´Grandiflora´ | izbové rastliny | 92,90 € | [detail](https://www.gardenholice.sk/edgeworthia-chrys--grandiflora/) |
| Strelitzia reginae 15 L | izbové rastliny | 99,00 € | [detail](https://www.gardenholice.sk/strelitzia-reginae-15-l/) |
| Trachycarpus wagnerianus | izbové rastliny | 109,00 € | [detail](https://www.gardenholice.sk/trachycarpus-wagnerianus/) |
| CITRUS "Nobilis" [Mandarino] | izbové rastliny | 169,00 € | [detail](https://www.gardenholice.sk/citrus--nobilis-mandarino/) |
| Cycas revoluta | izbové rastliny | 229,00 € | [detail](https://www.gardenholice.sk/cycas-revoluta-2/) |
| Chamaerops humilis/ palma | izbové rastliny | 299,00 € | [detail](https://www.gardenholice.sk/chamaerops-humilis--palma/) |
| Yucca rostrata 100/125cm | izbové rastliny | 790,00 € | [detail](https://www.gardenholice.sk/yucca-rostrata-100-125cm/) |
| Olea europea Ponpon | izbové rastliny | 1350,00 € | [detail](https://www.gardenholice.sk/olea-europea-ponpon/) |
| Olea Europaea 3kmeneI | izbové rastliny | 1490,00 € | [detail](https://www.gardenholice.sk/olea-europaea-3kmenei/) |
| Olea Europaea 2kmene | izbové rastliny | 1850,00 € | [detail](https://www.gardenholice.sk/olea-europaea-2kmene/) |
| Olea Europaea vysoký kmeň | izbové rastliny | 2300,00 € | [detail](https://www.gardenholice.sk/olea-europaea-vysoky-kmen/) |
| ILEX MUTCHAGARA NELLIE R.STEVENS BONSAI | izbové rastliny | 3600,00 € | [detail](https://www.gardenholice.sk/ilex-mutchagara-nellie-r-stevens-bonsai/) |
| Rosa (PA) Eufemia | záhrada | 12,90 € | [detail](https://www.gardenholice.sk/rosa--pa--eufemia/) |
| Rosa pauls scarlet climber - ruža červená | záhrada | 13,50 € | [detail](https://www.gardenholice.sk/rosa-pauls-scarlet-climber-ruza-cervena/) |
| Rosa Standard Pink | záhrada | 14,90 € | [detail](https://www.gardenholice.sk/rosa-standard-pink/) |
| Vistéria Blue Moon | záhrada | 14,90 € | [detail](https://www.gardenholice.sk/visteria-blue-moon/) |
| Euonymus jap. Himalaya | záhrada | 15,90 € | [detail](https://www.gardenholice.sk/euonymus-jap--himalaya/) |
| Ilex cren. ´Dark Green´ | záhrada | 16,90 € | [detail](https://www.gardenholice.sk/ilex-cren--dark-green-2/) |
| Levanduľa munstead | záhrada | 17,90 € | [detail](https://www.gardenholice.sk/levandula-munstead/) |
| Cortaderia rosea | záhrada | 19,90 € | [detail](https://www.gardenholice.sk/cortaderia-rosea/) |
| Hydrangea Mophead Pink 10+ / Hy-pe Original | záhrada | 21,90 € | [detail](https://www.gardenholice.sk/hydrangea-mophead-pink-10--hy-pe-original/) |
| Helleborus Strawberry moon | záhrada | 24,90 € | [detail](https://www.gardenholice.sk/helleborus-strawberry-moon/) |
| Leucothoe axillaris ´Curly Red | záhrada | 29,00 € | [detail](https://www.gardenholice.sk/leucothoe-axillaris-curly-red/) |
| Borovica východná ´Tiny Kurls´/Pinus strobus ´Tiny Kurls´ | záhrada | 33,90 € | [detail](https://www.gardenholice.sk/borovica-vychodna-tiny-kurls-pinus-strobus-tiny-kurls/) |
| Hibiscus syr. Tricolor | záhrada | 39,00 € | [detail](https://www.gardenholice.sk/hibiscus-syr--tricolor/) |
| Rosa hedge-on white | záhrada | 87,90 € | [detail](https://www.gardenholice.sk/rosa-hedge-on-white/) |
| Mandevilla pyramída | záhrada | 250,00 € | [detail](https://www.gardenholice.sk/mandevilla-pyramida/) |
| Betonový kvetináč malý 45cm | črepníky | 89,00 € | [detail](https://www.gardenholice.sk/betonovy-kvetinac-maly-45cm/) |
| Kvetináč Balconetta  uzka | črepníky | 99,00 € | [detail](https://www.gardenholice.sk/kvetinac-balconetta-35cm-uzka/) |
| Kvetináč Balconetta uzka | črepníky | 149,00 € | [detail](https://www.gardenholice.sk/kvetinac-balconetta-55cm-uzka/) |
| Kvetináč Cassetta 80 Antracit | črepníky | 169,00 € | [detail](https://www.gardenholice.sk/kvetinac-cassetta-80-antracit/) |
| Betonový kvetináč 65cm | črepníky | 179,00 € | [detail](https://www.gardenholice.sk/betonovy-kvetinac-65cm/) |
| Kvetináč SMOOTH ANTIK 140 | črepníky | 220,00 € | [detail](https://www.gardenholice.sk/kvetinac-smooth-antik-140/) |
| Kvetináč SMOOTH FESTONE ANTIK 100 | črepníky | 220,00 € | [detail](https://www.gardenholice.sk/kvetinac-smooth-festone-antik-100/) |
| Terakotový kvetináč Camelia pot 74 | črepníky | 230,00 € | [detail](https://www.gardenholice.sk/terakotovy-kvetinac-camelia-pot-74/) |
| Kvetináč SMOOTH FESTONE ANTIK 120 | črepníky | 240,00 € | [detail](https://www.gardenholice.sk/kvetinac-smooth-festone-antik-120/) |
| Kvetináč Titano 110 Bronzatico | črepníky | 290,00 € | [detail](https://www.gardenholice.sk/kvetinac-titano-110-bronzatico/) |
| Betonový kvetináč veľký 95cm | črepníky | 390,00 € | [detail](https://www.gardenholice.sk/betonovy-kvetinac-velky-95cm/) |
| Kvetináč Titano 125 Greystone | črepníky | 410,00 € | [detail](https://www.gardenholice.sk/kvetinac-titano-125-greystone/) |
| Substrát izbové rastliny 5L | substráty | 3,30 € | [detail](https://www.gardenholice.sk/substrat-palmy-a-izbove-rastliny-5l/) |
| ROSTETO substrát pre orchid. | substráty | 3,90 € | [detail](https://www.gardenholice.sk/rosteto-substrat-pre-orchid/) |
| Substrát palmy 5l | substráty | 3,90 € | [detail](https://www.gardenholice.sk/substrat-palmy-5l/) |
| Floria orchideje substrát 3l | substráty | 4,50 € | [detail](https://www.gardenholice.sk/floria-orchideje-substrat-3l/) |
| Floria substrát na izbové rastliny 5L | substráty | 5,90 € | [detail](https://www.gardenholice.sk/floria-substrat-na-izbove-rastliny-5l/) |
| AGRO sub na palmy a zelene rastliny 20l | substráty | 6,50 € | [detail](https://www.gardenholice.sk/agro-sub-na-palmy-a-zelene-rastliny-20l/) |
| Substrát na pelargónie 20l | substráty | 6,50 € | [detail](https://www.gardenholice.sk/substrat-na-pelargonie-20l/) |
| Substrát pre rajčiny, papriky, a uhorky 15 l | substráty | 6,90 € | [detail](https://www.gardenholice.sk/substrat-pre-rajciny--papriky--a-uhorky-15-l/) |
| FLORIA SUB NA INTERIEROVE RASTLINY 18L | substráty | 7,90 € | [detail](https://www.gardenholice.sk/floria-sub-na-interierove-rastliny-18l/) |
| Substrát pre kyslomilné rastliny 45l / NOVATERRA -Acidofile | substráty | 9,60 € | [detail](https://www.gardenholice.sk/substrat-pre-kyslomilne-rastliny-45l-novaterra-acidofile/) |
| Substrát na modré hortenzie 20l | substráty | 9,90 € | [detail](https://www.gardenholice.sk/substrat-na-modre-hortenzie-20l/) |
| Floria substrát paradajky a sadenie | substráty | 13,50 € | [detail](https://www.gardenholice.sk/floria-substrat-paradajky-a-sadenie/) |
| Floria substrát zahradnicky s mykorhizou 40L | substráty | 14,90 € | [detail](https://www.gardenholice.sk/floria-substrat-zahradnicky-s-mykorhizou-40l/) |
| Substrát forestina- pre stredomorské rastliny | substráty | 14,90 € | [detail](https://www.gardenholice.sk/substrat-forestina-pre-stredomorske-rastliny/) |

## Lukscheiter

- Web a identita predajcu: [https://www.lukscheiter.eu/](https://www.lukscheiter.eu/), [obchodné podmienky](https://www.lukscheiter.eu/obchodni-podminky/).
- Firma: **Lukscheiter s.r.o., IČO 08714410**. Vlastníci: Antonín Lukscheiter, Ing. Ondřej Lukscheiter. Konatelia: Antonín Lukscheiter, Ing. Ondřej Lukscheiter.
- Veľkosť: **Tržby nedoložené; 6–9 zam.**. Kód zamestnancov `120`; [primárny register](https://ares.gov.cz/ekonomicke-subjekty-v-be/rest/ekonomicke-subjekty-res/08714410). Český register nepreukazuje tržby; neuvádzame odhad. Záznam RES má dátum aktualizácie 5. 1. 2023; bol načítaný 9. 10. 2026. Podľa VR majú vlastníci po 50 %. [Vlastníci](https://ares.gov.cz/ekonomicke-subjekty-v-be/rest/ekonomicke-subjekty-vr/08714410).
- Ceny a sklad: Shoptet mikroúdaje kategórií a detailov; konkrétne varianty pomenované v produktovom názve, ceny v Kč. Mena je overená z `meta[itemprop=priceCurrency]` na detaile produktu; kontrola vyžaduje zhodu s menou firmy. Neoverené svetelné alebo toxikologické vlastnosti sa nepridávajú podľa botanických domnienok.
- Logo: [oficiálny banner 295×65](https://cdn.myshoptet.com/usr/www.lukscheiter.eu/user/logos/banner2-295x65.jpg). Zelený wordmark je vyrezaný bez drobného sloganu, zväčšený 6× s Lanczos a transparentným pozadím vytvoreným oddelením pôvodných zelených písmen od sivého JPEG gradientu. Kruh používa orchideový motív z pravej časti toho istého bannera; nepoužíva nekvalitný 16×16 favicon. Tmavá zelená a kontrastná fialová vychádzajú z banneru.
- Farby: `brand: #184b29`, `accent: #7b287e`, `soft: #eef3e9`, `paper: #fffefb`, `ink: #18271d`, `line: #d5dfd3`. Biela na brand aj accent dosahuje WCAG kontrast ≥ 4,5 : 1; kontroluje QA.
- Rozsah: **78 produktov**, izbové rastliny, orchidey, tillandsie, sukulenty a kaktusy. Výber je kurátorovaný zo skladovej ponuky; nejde o tvrdenie, že bol načítaný úplne celý e-shop. Pri vyšších cenách sa hranice rozpočtu prispôsobia zostávajúcim produktom.
- Doklady: `research/2026-10-09/lukscheiter-registry.json`, `lukscheiter-products.json`. Pri každej položke je URL, oficiálny zdroj fotografie, cena, stav, kategória a doložené fakty. QA: `qa-review/lukscheiter-qa.json`, matica `qa-review/matrix.json`, prezreté UI a produktové kontaktné hárky.

| Produkt / variant | Kategória | Cena | Produkt skladom pri kontrole |
|---|---|---:|---|
| Asparagus setaceus | izbové rastliny | 120 Kč | [detail](https://www.lukscheiter.eu/asparagus-setaceus/) |
| Adiantum hispidulum 'Bronze Venus'  (kapradina) | izbové rastliny | 130 Kč | [detail](https://www.lukscheiter.eu/adiantum-hispidulum--bronze-venus--kapradina/) |
| Cattleya deckerii | orchidey | 270 Kč | [detail](https://www.lukscheiter.eu/cattleya-deckerii--tipo/) |
| Echeveria 'Pearl von Nurnberg' | sukulenty a kaktusy | 60 Kč | [detail](https://www.lukscheiter.eu/echeveria--pearl-von-nurnberg/) |
| Begonia 'Angel Wind' | izbové rastliny | 60 Kč | [detail](https://www.lukscheiter.eu/begonia--angel-wind/) |
| Fosterella penduliflora (větší) | izbové rastliny | 100 Kč | [detail](https://www.lukscheiter.eu/fosterella-penduliflora--vetsi/) |
| Bifrenaria harrisoniae | orchidey | 260 Kč | [detail](https://www.lukscheiter.eu/bifrenaria-harrisoniae/) |
| Tillandsia brachycaulos v. abdita (malá) | tillandsie | 50 Kč | [detail](https://www.lukscheiter.eu/tillandsia-brachycaulos-v--abdita--mala/) |
| Astrophytum myriostigma | sukulenty a kaktusy | 40 Kč | [detail](https://www.lukscheiter.eu/astrophytum-myriostigma/) |
| Asparagus densiflorus 'Sprengerii' | izbové rastliny | 100 Kč | [detail](https://www.lukscheiter.eu/asparagus-sprengerii/) |
| Cattleya bicolor | orchidey | 250 Kč | [detail](https://www.lukscheiter.eu/cattleya-bicolor/) |
| Fosterella villosula | izbové rastliny | 120 Kč | [detail](https://www.lukscheiter.eu/fosterella-villosula/) |
| Adiantum raddianum 'Fritz Luthi' (kapradina) | izbové rastliny | 130 Kč | [detail](https://www.lukscheiter.eu/adiantum-raddianum--fritz-luthi-kapradina/) |
| Neoregelia 'Fuego Ancho' | izbové rastliny | 150 Kč | [detail](https://www.lukscheiter.eu/neoregelia--fuego-ancho/) |
| Vriesea espinosae f. gigant | izbové rastliny | 150 Kč | [detail](https://www.lukscheiter.eu/vriesea-espinosae-f--gigant/) |
| Hoya ovalifolia (ZR) | izbové rastliny | 160 Kč | [detail](https://www.lukscheiter.eu/hoya-ovalifolia--zr/) |
| Hoya wayetii 'variegata' (ZR) | izbové rastliny | 170 Kč | [detail](https://www.lukscheiter.eu/hoya-wayetii--variegata/) |
| Hoya cardiophylla (VR) | izbové rastliny | 180 Kč | [detail](https://www.lukscheiter.eu/hoya-cardiophylla-2/) |
| Hoya parasitica 'splash' (Laos) (VR) | izbové rastliny | 180 Kč | [detail](https://www.lukscheiter.eu/hoya-parasitica--splash-laos/) |
| Quesnelia humilis | izbové rastliny | 190 Kč | [detail](https://www.lukscheiter.eu/quesnelia-humilis/) |
| Hoya amoena (VR) | izbové rastliny | 200 Kč | [detail](https://www.lukscheiter.eu/hoya-amoena-2/) |
| Hoya brevialata (ST) | izbové rastliny | 200 Kč | [detail](https://www.lukscheiter.eu/hoya-brevialata/) |
| Hoya cagayanensis | izbové rastliny | 200 Kč | [detail](https://www.lukscheiter.eu/hoya-cagayanensis/) |
| Araeococcus flagellifolius | izbové rastliny | 230 Kč | [detail](https://www.lukscheiter.eu/araeococcus-flagellifolius-2/) |
| Hoya bicknellii (VR) | izbové rastliny | 230 Kč | [detail](https://www.lukscheiter.eu/hoya-bicknellii-2/) |
| Hoya burtoniae (ST) | izbové rastliny | 230 Kč | [detail](https://www.lukscheiter.eu/hoya-burtoniae--st/) |
| Neoregelia 'Hades' | izbové rastliny | 230 Kč | [detail](https://www.lukscheiter.eu/neoregelia--hades-2/) |
| Neoregelia 'Burnsie's Spiral' | izbové rastliny | 250 Kč | [detail](https://www.lukscheiter.eu/neoregelia--burnsie-s-spiral/) |
| Vriesea saundersii (velká) | izbové rastliny | 250 Kč | [detail](https://www.lukscheiter.eu/vriesea-saundersii--velka/) |
| Aglaonema 'White Joy' | izbové rastliny | 260 Kč | [detail](https://www.lukscheiter.eu/aglaonema--white-joy/) |
| Hoya acuta 'variegata' (big leaf) (VR, závěs 9cm) | izbové rastliny | 300 Kč | [detail](https://www.lukscheiter.eu/hoya-acuta--variegata-big-leaf/) |
| Araeococcus flagellifolius | izbové rastliny | 350 Kč | [detail](https://www.lukscheiter.eu/araeococcus-flagellifolius-3/) |
| Dischidia pectinoides (závěs, prům. 9cm) | izbové rastliny | 350 Kč | [detail](https://www.lukscheiter.eu/dischidia-pectinoides--zaves/) |
| Neoregelia camoreiana (trs XL) | izbové rastliny | 500 Kč | [detail](https://www.lukscheiter.eu/neoregelia-camoreiana--trs-xl/) |
| Bifrenaria aureo-fulva | orchidey | 270 Kč | [detail](https://www.lukscheiter.eu/bifrenaria-aureo-fulva/) |
| C. Peckaviensis | orchidey | 270 Kč | [detail](https://www.lukscheiter.eu/c--peckaviensis/) |
| Cattleya intermedia var. alba | orchidey | 270 Kč | [detail](https://www.lukscheiter.eu/cattleya-intermedia-var--alba/) |
| Dendrobium polysema | orchidey | 270 Kč | [detail](https://www.lukscheiter.eu/dendrobium-polysema/) |
| Cattleya forbesii | orchidey | 280 Kč | [detail](https://www.lukscheiter.eu/cattleya-forbesii/) |
| Cattleya intermedia var. coerulea | orchidey | 280 Kč | [detail](https://www.lukscheiter.eu/cattleya-intermedia-var--coerulea-2/) |
| Cattleya mendelii | orchidey | 280 Kč | [detail](https://www.lukscheiter.eu/cattleya-mendelii/) |
| Cattleya porphyroglossa | orchidey | 280 Kč | [detail](https://www.lukscheiter.eu/cattleya-porphyroglossa/) |
| Stanhopea tigrina var. nigroviolacea | orchidey | 290 Kč | [detail](https://www.lukscheiter.eu/stanhopea-tigrina-var--nigroviolacea/) |
| Cattleya schilleriana | orchidey | 300 Kč | [detail](https://www.lukscheiter.eu/cattleya-schilleriana/) |
| Renanthera imschootiana x Vanda falcata | orchidey | 350 Kč | [detail](https://www.lukscheiter.eu/renanthera-imschootiana-x-vanda-falcata/) |
| Vanda foetida | orchidey | 350 Kč | [detail](https://www.lukscheiter.eu/vanda-foetida/) |
| Aerangis biloba | orchidey | 380 Kč | [detail](https://www.lukscheiter.eu/aerangis-biloba/) |
| Tillandsia ionantha v. rubra | tillandsie | 50 Kč | [detail](https://www.lukscheiter.eu/tillandsia-ionantha-v--rubra/) |
| Tillandsia brachycaulos v. abdita (střední) | tillandsie | 70 Kč | [detail](https://www.lukscheiter.eu/tillandsia-brachycaulos-v--abdita--stredni/) |
| Tillandsia brachycaulos v. multiflora (střední) | tillandsie | 70 Kč | [detail](https://www.lukscheiter.eu/tillandsia-brachycaulos-v--multiflora--stredni/) |
| Tillandsia tricolor var. melanocrater (střední) | tillandsie | 70 Kč | [detail](https://www.lukscheiter.eu/tillandsia-tricolor-var--melanocrater--stredni/) |
| Tillandsia bandensis | tillandsie | 80 Kč | [detail](https://www.lukscheiter.eu/tillandsia-bandensis/) |
| Tillandsia albida (forma dlouhá) | tillandsie | 100 Kč | [detail](https://www.lukscheiter.eu/tillandsia-albida--forma-dlouha/) |
| Tillandsia brachycaulos v. abdita (velká) | tillandsie | 100 Kč | [detail](https://www.lukscheiter.eu/tillandsia-brachycaulos-v--abdita--velka/) |
| Tillandsia balbisiana 'Guatemala' | tillandsie | 120 Kč | [detail](https://www.lukscheiter.eu/tillandsia-balbisiana--guatemala/) |
| Tillandsia albida var. minor | tillandsie | 150 Kč | [detail](https://www.lukscheiter.eu/tillandsia-albida-var--minor/) |
| Tillandsia bandensis (trs) | tillandsie | 150 Kč | [detail](https://www.lukscheiter.eu/tillandsia-bandensis--trs/) |
| Tillandsia capitata (velká) | tillandsie | 150 Kč | [detail](https://www.lukscheiter.eu/tillandsia-capitata--velka/) |
| Tillandsia loliacea (trs) | tillandsie | 150 Kč | [detail](https://www.lukscheiter.eu/tillandsia-loliacea--trs/) |
| Tillandsia aeranthos | tillandsie | 180 Kč | [detail](https://www.lukscheiter.eu/tillandsia-aeranthos/) |
| Tillandsia bermeojensis | tillandsie | 290 Kč | [detail](https://www.lukscheiter.eu/tillandsia-bermeojensis/) |
| Tillandsia aeranthos f. 'Gigant' | tillandsie | 350 Kč | [detail](https://www.lukscheiter.eu/tillandsia-aeranthos-f-gigant/) |
| Eriocactus leninghausii | sukulenty a kaktusy | 45 Kč | [detail](https://www.lukscheiter.eu/eriocactus-leninghausii/) |
| Aloe squarrosa - menší | sukulenty a kaktusy | 50 Kč | [detail](https://www.lukscheiter.eu/aloe-squarrosa-mensi/) |
| Aloe humilis | sukulenty a kaktusy | 60 Kč | [detail](https://www.lukscheiter.eu/aloe-humilis/) |
| Cereus peruvianus 'Golden Monstrosus' | sukulenty a kaktusy | 60 Kč | [detail](https://www.lukscheiter.eu/cereus-peruvianus--mostrosa/) |
| Sedum rubrotinctum 'Jelly Bean' | sukulenty a kaktusy | 60 Kč | [detail](https://www.lukscheiter.eu/sedum-rubrotinctum--jelly-bean/) |
| Cotyledon orbiculata 'Red Edge' | sukulenty a kaktusy | 65 Kč | [detail](https://www.lukscheiter.eu/cotyledon-orbiculata--red-edge/) |
| Aloe haworthioides | sukulenty a kaktusy | 70 Kč | [detail](https://www.lukscheiter.eu/aloe-haworthioides/) |
| Aloinopsis schooneesii | sukulenty a kaktusy | 70 Kč | [detail](https://www.lukscheiter.eu/aloinopsis-schooneesii/) |
| Gymnocalycium saglione | sukulenty a kaktusy | 70 Kč | [detail](https://www.lukscheiter.eu/gymnocalycium-saglione/) |
| Anacampseros telephiastrum variegata 'Sunrise' | sukulenty a kaktusy | 120 Kč | [detail](https://www.lukscheiter.eu/anacampseros-telephiastrum-variegata--sunrise-2/) |
| Mammillaria elongata 'Copper' | sukulenty a kaktusy | 130 Kč | [detail](https://www.lukscheiter.eu/mammillaria-elongata--copper/) |
| Cereus peruvianus 'Monstrosus Brown' (velký) | sukulenty a kaktusy | 150 Kč | [detail](https://www.lukscheiter.eu/cereus-peruvianus--monstrosus-brown-velky/) |
| Crassula marnieriana 'Grey' | sukulenty a kaktusy | 160 Kč | [detail](https://www.lukscheiter.eu/crassula-marnieriana--grey/) |
| Cereus peruvianus 'Tortuosus' | sukulenty a kaktusy | 330 Kč | [detail](https://www.lukscheiter.eu/cereus-peruvianus--tortuosus/) |
| Dorstenia gigas (v) | sukulenty a kaktusy | 3000 Kč | [detail](https://www.lukscheiter.eu/dorstenia-gigas--v/) |
| Adenium socotranum 'Pet Baan Na' (v) | sukulenty a kaktusy | 4650 Kč | [detail](https://www.lukscheiter.eu/adenium-socotranum--pet-baan-na/) |

## Kandidáti, ktorí sa nepridali

| Kandidát | Dôvod |
|---|---|
| KYTKYshop.cz | ARES IČO 88591280 uvádza kód 210, teda 20–24 pracovníkov; pre prvú sadu sme uprednostnili menšie rodinné predajne. Tržby nie sú doložené. |
| Lístky radosti | Pri kontrole nebolo možné spoľahlivo overiť plnohodnotný skladový katalóg; web komunikoval otvorenie 5. októbra. |
| Gardners | Web sa prezentuje ako najväčší predajca izbových rastlín v ČR; nesedí na zameranie prvej sady malých e-shopov bez ďalšieho preukázania veľkosti. |
| Plantizia.cz ako samostatná ukážka | Ten istý vlastník a predajca ako slovenská Plantizia; duplicitná firma sa nepočíta ako nový kandidát. |

Pri overení sa nepreukázal spoločný vlastník s existujúcimi zdokumentovanými ukážkami kozmetiky, vlasovej starostlivosti ani 43 vinárstiev.

## Zahrada na niti

- Kontrola cien a skladu: **10.10.2026**, priamo z vlastného [e-shopu](https://www.zahradananiti.cz/). [Identita predajcu](https://www.zahradananiti.cz/obchodni-podminky/).
- Firma: **koke no koke s.r.o., IČO 06096221**. Vlastníci: Ing. Lenka Hrubá. Konatelia / podnikateľ: Ing. Lenka Hrubá.
- Veľkosť: **Tržby nedoložené; 6–9 zam.**. Kód `120` v [primárnom registri](https://ares.gov.cz/ekonomicke-subjekty-v-be/rest/ekonomicke-subjekty-res/06096221); údaj aktualizovaný 2024-12-04, načítaný 2026-10-10. [Vlastníci](https://ares.gov.cz/ekonomicke-subjekty-v-be/rest/ekonomicke-subjekty-vr/06096221).
- Tržby nedoložené; výber podľa vlastníka, butikového sortimentu a 6–9 zamestnancov.
- Aktuálnym predajcom je koke no koke s.r.o. podľa VOP. Staršie katalógy uvádzajú osobné IČO 74490982; nekombinujeme jeho menší počet zamestnancov s touto spoločnosťou.
- Prečo sedí: Autorský butik s kokedamami a floráriami, vlastný e-shop; rozdielne svetlo, druhy a ceny robia výber náročným. Vlastníkov a konateľov sme porovnali s už zdokumentovanými ukážkami; bez zisteného opakovania.
- Ponuka: **50 produktov**, kokedamy, tillandsie, rastlinné teráriá, substráty. Kurátorovaný výber viacerých druhov a cenových hladín, nie tvrdenie o celom e-shope. Doplnky sú zahrnuté pri zmysluplnom počte položiek; služby, poukazy, predobjednávky, prázdne kompozície a varianty bez doloženej ceny alebo skladu sa vyradili.
- Ceny a sklad: mikrodáta výpisu aj detailu (`InStock`, cena a mena); pri variantoch navyše oficiálne Shoptet variantové dáta viažu cenu, sklad a fotografiu k uvedenému variantu. Na detaile treba vybrať pomenovaný variant. Dátum je snímkou; ukážka nevykonáva živú synchronizáciu.
- Tagy a dôvody: iba popis, parametre a kategórie predajcu. Bez doloženého svetla alebo starostlivosti sa použije botanická skupina alebo cenová preferencia. Pet safety sa neodvodzuje z názvu rodu. Snímka údajov a URL ku každej fotografii: `research/2026-10-10/zahradananiti-products.json`.
- Fotografie: oficiálne priradené produktové zábery; okraje, veľkosť a koláže cez `tools/assets.py` a `tools/make_assets.py` (PIL). Logo: [oficiálny súbor](https://cdn.myshoptet.com/usr/www.zahradananiti.cz/user/logos/layer_1.svg); Oficiálne SVG vyrenderované vo vysokej veľkosti. Do kruhu je vyrezané pôvodné písmeno Z z loga a upravené na bielu monochromatickú verziu pre kontrast.
- Logo: tvary originálnych písmen sú pre čitateľnosť stmavené do zelenej témy; nejde o prepis názvu novým fontom.
- Farby: `brand: #2c5130`, `accent: #38683b`, `soft: #f2f1e9`, `paper: #fffefb`, `ink: #25281f`, `line: #dedfd3`. Zelená #48844B z oficiálneho SVG; brand a accent sú jej tmavšie verzie pre kontrast bieleho textu. Biela na brand a accent ≥ 4,5 : 1, kontrolované QA.
- QA: PASS na desktope 1440 px a mobiloch 390/360 px; owner, chat, kroky a výsledky prezreté. `qa-review/zahradananiti-qa.json`, `zahradananiti-ui.jpg`, produktové hárky a `qa-review/matrix.json`. Zdrojový doklad firmy: `research/2026-10-10/zahradananiti-registry.json`.

| Produkt / variant | Kategória | Cena | Produkt skladom pri kontrole |
|---|---|---:|---|
| Kokedama mini Nolina | Kokedamy | 550 Kč | [detail](https://www.zahradananiti.cz/kokedamy/mini-kokedama-nolina/) |
| Sputnik s řasokoulí — Ø 8 cm | rastlinné teráriá | 450 Kč | [detail](https://www.zahradananiti.cz/teraria-sputnik/sputnik-s-rasokouli/) |
| Tillandsia brachycaulos | tillandsie | 150 Kč | [detail](https://www.zahradananiti.cz/tillandsie/tillandsia-brachycaulos/) |
| Kokedama mini parožnatka | Kokedamy | 550 Kč | [detail](https://www.zahradananiti.cz/kokedamy/kokedama-mini-paroznatka/) |
| Kokedama mini tlustice | Kokedamy | 550 Kč | [detail](https://www.zahradananiti.cz/kokedamy/kokedama-mini-tlustice/) |
| Kokedama Asparagus falcatus — cca 13 cm | Kokedamy | 990 Kč | [detail](https://www.zahradananiti.cz/kokedamy/kokedama-asparagus-falcatus/) |
| Kokedama Asparagus plumosus — cca 13 cm | Kokedamy | 990 Kč | [detail](https://www.zahradananiti.cz/kokedamy/kokedama-asparagus-plumosus/) |
| Kokedama Asplenium-parvati — cca 13 cm | Kokedamy | 990 Kč | [detail](https://www.zahradananiti.cz/kokedamy/kokedama-asplenium-parvati/) |
| Kokedama Marble Queen — cca 13 cm | Kokedamy | 990 Kč | [detail](https://www.zahradananiti.cz/kokedamy/kokedama-marble-queen/) |
| Kokedama Nolina — cca 13 cm | Kokedamy | 990 Kč | [detail](https://www.zahradananiti.cz/kokedamy/kokedama-nolina/) |
| Kokedama Scindapsus pictus Exotica — cca 13 cm | Kokedamy | 990 Kč | [detail](https://www.zahradananiti.cz/kokedamy/kokedama-scindapsus-pictus-exotica/) |
| Kokedama africká fialka | Kokedamy | 990 Kč | [detail](https://www.zahradananiti.cz/kokedamy/kokedama-africka-fialka/) |
| Kokedama cik-cak kaktus — cca 13 cm | Kokedamy | 990 Kč | [detail](https://www.zahradananiti.cz/kokedamy/kokedama-cik-cak-kaktus/) |
| Kokedama filodendron Brazil — cca 13 cm | Kokedamy | 990 Kč | [detail](https://www.zahradananiti.cz/kokedamy/kokedama-filodendron-brazil/) |
| Kokedama filodendron scandens — cca 13 cm | Kokedamy | 990 Kč | [detail](https://www.zahradananiti.cz/kokedamy/kokedama-filodendron-scandens/) |
| Kokedama maranta — cca 13 cm | Kokedamy | 990 Kč | [detail](https://www.zahradananiti.cz/kokedamy/kokedama-maranta/) |
| Kokedama monstera Monkey Mask — cca 13 cm | Kokedamy | 990 Kč | [detail](https://www.zahradananiti.cz/kokedamy/kokedama-monstera-monkey-mask/) |
| Kokedama neonka — cca 13 cm | Kokedamy | 990 Kč | [detail](https://www.zahradananiti.cz/kokedamy/kokedama-neonka/) |
| Kokedama tlustice — cca 13 cm - mladá rostlina | Kokedamy | 990 Kč | [detail](https://www.zahradananiti.cz/kokedamy/kokedama-tlustice/) |
| Kokedama tlustice Hobbit — cca 15 cm | Kokedamy | 1490 Kč | [detail](https://www.zahradananiti.cz/kokedamy/kokedama-tlustice-hobbit/) |
| Kokedama zelenec — cca 13 cm | Kokedamy | 990 Kč | [detail](https://www.zahradananiti.cz/kokedamy/kokedama-zelenec/) |
| Kokedama Aglaonema — cca 13 cm | Kokedamy | 1590 Kč | [detail](https://www.zahradananiti.cz/kokedamy/kokedama-aglaonema/) |
| Kokedama Ficus Ginseng — cca 13 cm | Kokedamy | 1590 Kč | [detail](https://www.zahradananiti.cz/kokedamy/kokedama-ficus-ginseng/) |
| Kokedama Hoya Kerii | Kokedamy | 1590 Kč | [detail](https://www.zahradananiti.cz/kokedamy/kokedama-hoya-kerii/) |
| Kokedama Pink Aglaonema | Kokedamy | 1590 Kč | [detail](https://www.zahradananiti.cz/kokedamy/kokedama-pink-aglaonema/) |
| Kokedama africká myrta — cca 13 cm | Kokedamy | 1590 Kč | [detail](https://www.zahradananiti.cz/kokedamy/kokedama-africka-myrta/) |
| Kokedama filodendron Birkin | Kokedamy | 1590 Kč | [detail](https://www.zahradananiti.cz/kokedamy/kokedama-filodendron-birkin/) |
| Kokedama listový kaktus — cca 13 cm | Kokedamy | 1590 Kč | [detail](https://www.zahradananiti.cz/kokedamy/kokedama-listovy-kaktus/) |
| Kokedama monstera Minima — cca 13 cm | Kokedamy | 1590 Kč | [detail](https://www.zahradananiti.cz/kokedamy/kokedama-monstera-minima/) |
| Kokedama sanseviera | Kokedamy | 1590 Kč | [detail](https://www.zahradananiti.cz/kokedamy/kokedama-sanseviera/) |
| Kokedama Aloe | Kokedamy | 1990 Kč | [detail](https://www.zahradananiti.cz/kokedamy/kokedama-aloe/) |
| Kokedama Calathea musaica | Kokedamy | 1990 Kč | [detail](https://www.zahradananiti.cz/kokedamy/kokedama-calathea-musaica/) |
| Kokedama olivovník — cca 15 cm | Kokedamy | 2590 Kč | [detail](https://www.zahradananiti.cz/kokedamy/kokedama-olivovnik/) |
| Tillandsia capitata | tillandsie | 150 Kč | [detail](https://www.zahradananiti.cz/tillandsie/tillandsia-capitata/) |
| Tillandsia caput medusa — Malý | tillandsie | 150 Kč | [detail](https://www.zahradananiti.cz/tillandsie/tillandsia-caput-medusa/) |
| Tillandsia fuchsii | tillandsie | 150 Kč | [detail](https://www.zahradananiti.cz/tillandsie/tillandsia-fuchsii/) |
| Tillandsia ionantha | tillandsie | 150 Kč | [detail](https://www.zahradananiti.cz/tillandsie/tillandsia-ionantha/) |
| Oblázkový stojánek s tillandsií | tillandsie | 220 Kč | [detail](https://www.zahradananiti.cz/tillandsie/tillandsie-na-dratku/) |
| Tillandsia Tectorum — Malá | tillandsie | 220 Kč | [detail](https://www.zahradananiti.cz/tillandsie/tillandsia-tectorum/) |
| Tillandsia juncefolia | tillandsie | 250 Kč | [detail](https://www.zahradananiti.cz/tillandsie/tillandsia-juncefolia/) |
| Tillandsia usneoides | tillandsie | 450 Kč | [detail](https://www.zahradananiti.cz/tillandsie/tillandsia-usneoides/) |
| Tillandsia streptophylla — Velká | tillandsie | 550 Kč | [detail](https://www.zahradananiti.cz/tillandsie/tillandsia-streptophylla/) |
| Porcelánová medúzka s tillandsií | tillandsie | 680 Kč | [detail](https://www.zahradananiti.cz/tillandsie/porcelanova-meduzka-s-tillandsii/) |
| Sputnik na Marsu — Ø 8 cm | rastlinné teráriá | 590 Kč | [detail](https://www.zahradananiti.cz/teraria-sputnik/sputnik-na-marsu-m/) |
| Florárium Vzkaz v lahvi | rastlinné teráriá | 990 Kč | [detail](https://www.zahradananiti.cz/vlhkomilna-teraria/terarium-vzkaz-v-lahvi/) |
| Terárium Sputnik s miniorichidejí — Bílá | rastlinné teráriá | 990 Kč | [detail](https://www.zahradananiti.cz/teraria-sputnik/terarium-sputnik-s-miniorichideji/) |
| Erlenkové florárium | rastlinné teráriá | 1590 Kč | [detail](https://www.zahradananiti.cz/vlhkomilna-teraria/erlenkove-terarium/) |
| Náš bezrašelinový substrát na pokojovky — Na pokojovky - 1 litr | substráty | 45 Kč | [detail](https://www.zahradananiti.cz/substraty/nas-substrat/) |
| Říční písek | substráty | 45 Kč | [detail](https://www.zahradananiti.cz/substraty/ricni-pisek/) |
| Rašeliník - Sphagnum | substráty | 125 Kč | [detail](https://www.zahradananiti.cz/substraty/raselinik/) |

## KytkaSem

- Kontrola cien a skladu: **10.10.2026**, priamo z vlastného [e-shopu](https://www.kytkasem.cz/). [Identita predajcu](https://www.kytkasem.cz/obchodni-podminky/).
- Firma: **Eva Balašová, IČO 02204452**. Vlastníci: Eva Balašová. Konatelia / podnikateľ: Eva Balašová.
- Veľkosť: **Tržby nedoložené; 1–5 zam.**. Kód `110` v [primárnom registri](https://ares.gov.cz/ekonomicke-subjekty-v-be/rest/ekonomicke-subjekty-res/02204452); údaj aktualizovaný 2022-12-01, načítaný 2026-10-10. [Vlastníci](https://ares.gov.cz/ekonomicke-subjekty-v-be/rest/ekonomicke-subjekty-res/02204452).
- Tržby živnostníčky nie sú v použitom verejnom registri doložené; veľkosť overená podľa ARES 1–5 zamestnancov.
- Prečo sedí: Malý obchod jednej podnikateľky, pestrá ponuka izbových rastlín, sukulentov a doplnkov; poradca pomôže so svetlom, starostlivosťou a cenou. Vlastníkov a konateľov sme porovnali s už zdokumentovanými ukážkami; bez zisteného opakovania.
- Ponuka: **61 produktov**, izbové rastliny, sukulenty a kaktusy, črepníky, substráty. Kurátorovaný výber viacerých druhov a cenových hladín, nie tvrdenie o celom e-shope. Doplnky sú zahrnuté pri zmysluplnom počte položiek; služby, poukazy, predobjednávky, prázdne kompozície a varianty bez doloženej ceny alebo skladu sa vyradili.
- Ceny a sklad: mikrodáta výpisu aj detailu (`InStock`, cena a mena); pri variantoch navyše oficiálne Shoptet variantové dáta viažu cenu, sklad a fotografiu k uvedenému variantu. Na detaile treba vybrať pomenovaný variant. Dátum je snímkou; ukážka nevykonáva živú synchronizáciu.
- Tagy a dôvody: iba popis, parametre a kategórie predajcu. Bez doloženého svetla alebo starostlivosti sa použije botanická skupina alebo cenová preferencia. Pet safety sa neodvodzuje z názvu rodu. Snímka údajov a URL ku každej fotografii: `research/2026-10-10/kytkasem-products.json`.
- Fotografie: oficiálne priradené produktové zábery; okraje, veľkosť a koláže cez `tools/assets.py` a `tools/make_assets.py` (PIL). Logo: [oficiálny súbor](https://cdn.myshoptet.com/usr/www.kytkasem.cz/user/logos/logo.png); Oficiálne rasterové logo zväčšené s Lanczos vyhladením. Do kruhu je vyrezaný pôvodný list monstéry a prevedený na bielu verziu.
- Farby: `brand: #245c39`, `accent: #347447`, `soft: #f0f4eb`, `paper: #fffefa`, `ink: #243024`, `line: #d9e3d4`. Zelená pôvodného listu v logu; tmavšie zelené brand a accent pre čitateľný biely text. Biela na brand a accent ≥ 4,5 : 1, kontrolované QA.
- QA: PASS na desktope 1440 px a mobiloch 390/360 px; owner, chat, kroky a výsledky prezreté. `qa-review/kytkasem-qa.json`, `kytkasem-ui.jpg`, produktové hárky a `qa-review/matrix.json`. Zdrojový doklad firmy: `research/2026-10-10/kytkasem-registry.json`.

| Produkt / variant | Kategória | Cena | Produkt skladom pri kontrole |
|---|---|---:|---|
| Sansevieria "Moonshine" | izbové rastliny | 209 Kč | [detail](https://www.kytkasem.cz/sansevieria-moonshine/) |
| Portulacaria afra | izbové rastliny | 239 Kč | [detail](https://www.kytkasem.cz/portulacaria-afra/) |
| Květináč "Lovebirds" 13  cm | črepníky | 189 Kč | [detail](https://www.kytkasem.cz/kvetinac--lovebirds--13--cm/) |
| Anacampseros Rufescens "Sunrise" baby | sukulenty a kaktusy | 209 Kč | [detail](https://www.kytkasem.cz/anacampseros-rufescens--sunrise--baby/) |
| Sansevieria enrenbergii 'Samurai Dwarf' | izbové rastliny | 239 Kč | [detail](https://www.kytkasem.cz/sansevieria-enrenbergii--samurai-dwarf/) |
| Philodendron "Calkins" baby | izbové rastliny | 249 Kč | [detail](https://www.kytkasem.cz/philodendron--calkins--baby/) |
| Anthurium veitchii baby | izbové rastliny | 259 Kč | [detail](https://www.kytkasem.cz/anthurium-veitchii/) |
| Anthurium villenaorum baby | izbové rastliny | 259 Kč | [detail](https://www.kytkasem.cz/anthurium-villenaorum-baby/) |
| Sansevieria “Abbey Crown” | izbové rastliny | 259 Kč | [detail](https://www.kytkasem.cz/sansevieria--abbey-crown/) |
| Sansevieria “Rocky Crown” | izbové rastliny | 259 Kč | [detail](https://www.kytkasem.cz/sansevieria--rocky-crown/) |
| Tradescantia Spathacea Rhoeo baby | izbové rastliny | 259 Kč | [detail](https://www.kytkasem.cz/tradescantia-spathacea-rhoeo-2/) |
| Anthurium clarinervium baby | izbové rastliny | 309 Kč | [detail](https://www.kytkasem.cz/anthurium-clarinervium-baby-3/) |
| Anthurium crystallinum | izbové rastliny | 349 Kč | [detail](https://www.kytkasem.cz/anthurium-crystallinum/) |
| Anthurium peltigerum | izbové rastliny | 399 Kč | [detail](https://www.kytkasem.cz/anthurium-peltigerum/) |
| Sansevieria trifasciata 'Laurentii' | izbové rastliny | 419 Kč | [detail](https://www.kytkasem.cz/sansevieria-trifasciata--laurentii/) |
| Scindapsus "Silver Hero" | izbové rastliny | 419 Kč | [detail](https://www.kytkasem.cz/scindapsus--silver-hero/) |
| Anthurium balaoanum | izbové rastliny | 519 Kč | [detail](https://www.kytkasem.cz/anthurium-balaoanum/) |
| Calathea "Triostar" | izbové rastliny | 519 Kč | [detail](https://www.kytkasem.cz/calathea--triostar--velka/) |
| Aglaonema "White Laksap" | izbové rastliny | 619 Kč | [detail](https://www.kytkasem.cz/aglaonema--white-laksap-bush/) |
| Sansevieria aubrytniana "silver Metallica" | izbové rastliny | 619 Kč | [detail](https://www.kytkasem.cz/sansevieria-trif-silver-metallica/) |
| Michaelmoelleria vietnamensis Sapphire | izbové rastliny | 729 Kč | [detail](https://www.kytkasem.cz/michaelmoelleria-vietnamensis-sapphire/) |
| Tradescantia quadricolor XXL | izbové rastliny | 729 Kč | [detail](https://www.kytkasem.cz/tradescantia-quadricolor-xxl/) |
| Platycerium bifurcatum "Parožnatka" XXL | izbové rastliny | 799 Kč | [detail](https://www.kytkasem.cz/platycerium-bifurcatum--paroznatka--xxl/) |
| Scindapsus Shimmering Silver | izbové rastliny | 849 Kč | [detail](https://www.kytkasem.cz/scindapsus-shimmering-silver/) |
| Ficus 'ginseng' XXL | izbové rastliny | 899 Kč | [detail](https://www.kytkasem.cz/ficus--ginseng--xxl/) |
| Sansevieria lau. XXL | izbové rastliny | 949 Kč | [detail](https://www.kytkasem.cz/sansevieria-lau--xxl/) |
| Ficus "Lyrata" XXL 160 cm | izbové rastliny | 999 Kč | [detail](https://www.kytkasem.cz/ficus--lyrata--xxl-160-cm/) |
| Monstera “Gold compact” baby | izbové rastliny | 999 Kč | [detail](https://www.kytkasem.cz/monstera--gold-compact--baby/) |
| Anthurium luxurians | izbové rastliny | 1049 Kč | [detail](https://www.kytkasem.cz/anthurium-luxurians-/) |
| Scindapsus Silver Splash Glow | izbové rastliny | 1049 Kč | [detail](https://www.kytkasem.cz/scindapsus-silver-splash-glow/) |
| Scindapsus Stabilo Green Arrow | izbové rastliny | 1049 Kč | [detail](https://www.kytkasem.cz/scindapsus-stabilo-green-arrow/) |
| Ficus "Lyrata" XXL stromek | izbové rastliny | 1199 Kč | [detail](https://www.kytkasem.cz/ficus--lyrata--xxl-stromek/) |
| Scindapsus treubi "Moonlight" variegata | izbové rastliny | 1649 Kč | [detail](https://www.kytkasem.cz/scindapsus-treubi--moonlight--variegata/) |
| Sansevieria masoniana variegata | izbové rastliny | 1849 Kč | [detail](https://www.kytkasem.cz/sansevieria-masoniana-variegata-/) |
| Scindapsus "Hologram" | izbové rastliny | 1849 Kč | [detail](https://www.kytkasem.cz/scindapsus--hologram/) |
| Anthurium arrow XXL | izbové rastliny | 2599 Kč | [detail](https://www.kytkasem.cz/anthurium-arrow/) |
| Sansevieria francissi baby | sukulenty a kaktusy | 209 Kč | [detail](https://www.kytkasem.cz/sansevieria-francissi-baby/) |
| Sedum adolphii baby | sukulenty a kaktusy | 209 Kč | [detail](https://www.kytkasem.cz/sedum-adolphii-baby/) |
| Sansevieria "StarShine" | sukulenty a kaktusy | 259 Kč | [detail](https://www.kytkasem.cz/sansevieria--starshine/) |
| Austrocylindropuntia subulata | sukulenty a kaktusy | 309 Kč | [detail](https://www.kytkasem.cz/austrocylindropuntia-subulata/) |
| Adenium Obesum "pouštní růže" malá baby rostlinka | sukulenty a kaktusy | 399 Kč | [detail](https://www.kytkasem.cz/adenium-obesum--poustni-ruze--mala-baby-rostlinka/) |
| Sansevieria "Silver Star" | sukulenty a kaktusy | 419 Kč | [detail](https://www.kytkasem.cz/sansevieria--silver-star/) |
| Zamioculcas černý "Black Raven" | sukulenty a kaktusy | 519 Kč | [detail](https://www.kytkasem.cz/zamioculcas-cerny--black-raven/) |
| Sansevieria "Moonshine" XXL | sukulenty a kaktusy | 849 Kč | [detail](https://www.kytkasem.cz/sansevieria--moonshine--xxl/) |
| Schlumbergera - Vánoční kaktus XXL | sukulenty a kaktusy | 3449 Kč | [detail](https://www.kytkasem.cz/schlumbergera-vanocni-kaktus-xxl/) |
| Oválný květináč "šedý mramor" | črepníky | 199 Kč | [detail](https://www.kytkasem.cz/ovalny-kvetinac--sedy-mramor/) |
| Květináč "Lovely" 12 cm | črepníky | 249 Kč | [detail](https://www.kytkasem.cz/kvetinac--lovely--12-cm/) |
| Kokedama květináč | črepníky | 299 Kč | [detail](https://www.kytkasem.cz/kokedama-kvetinac/) |
| Květináč "Lady" | črepníky | 299 Kč | [detail](https://www.kytkasem.cz/kvetinac--lady/) |
| Květináč ze série "Amazonka" 13 cm | črepníky | 299 Kč | [detail](https://www.kytkasem.cz/obaly-na-kvetinace-ze-serie--amazonka/) |
| Květináč "Napoli" 24 cm | črepníky | 499 Kč | [detail](https://www.kytkasem.cz/kvetinac--napoli--24-cm/) |
| Bio aktivní uhlí do substrátu 500 ml | substráty | 59 Kč | [detail](https://www.kytkasem.cz/aktivni-uhli-do-substratu/) |
| Keramzit 1 l | substráty | 59 Kč | [detail](https://www.kytkasem.cz/keramzit-1-l/) |
| Perlit na provzdušnění substrátu - 1 litr | substráty | 59 Kč | [detail](https://www.kytkasem.cz/perlit-na-provzdusneni-substratu-1-litr/) |
| Namíchání ideálního substrátu pro pokojovky | substráty | 63 Kč | [detail](https://www.kytkasem.cz/substrat-pro-pokojovky-namichanisubstratu/) |
| Kokosové coco chipsy 1 litr | substráty | 69 Kč | [detail](https://www.kytkasem.cz/kokosove-coco-chipsy/) |
| Červený písek hrubý 750 g | substráty | 79 Kč | [detail](https://www.kytkasem.cz/pisek/) |
| Minerální substrát pro pokojovky 1 litr | substráty | 89 Kč | [detail](https://www.kytkasem.cz/-pon--smes-pro-pokojovky/) |
| Namíchání ideálního substrátu pro Jewel orchids | substráty | 99 Kč | [detail](https://www.kytkasem.cz/namichani-idealniho-substratu-pro-jewel-orchids/) |
| Písek BRILIANT přírodní 600g na smutnice | substráty | 99 Kč | [detail](https://www.kytkasem.cz/pisek-briliant-prirodni-600g-na-smutnice/) |
| Kokosové vlákno 100g | substráty | 119 Kč | [detail](https://www.kytkasem.cz/kokosove-vlakno/) |

## Farmářky z paneláku

- Kontrola cien a skladu: **10.10.2026**, priamo z vlastného [e-shopu](https://farmarkyzpanelaku.cz/). [Identita predajcu](https://farmarkyzpanelaku.cz/policies/contact-information).
- Firma: **Jolana Šádková, IČO 09315543**. Vlastníci: Jolana Šádková. Konatelia / podnikateľ: Jolana Šádková.
- Veľkosť: **Tržby nedoložené; 1–5 zam.**. Kód `110` v [primárnom registri](https://ares.gov.cz/ekonomicke-subjekty-v-be/rest/ekonomicke-subjekty-res/09315543); údaj aktualizovaný 2022-01-31, načítaný 2026-10-10. [Vlastníci](https://ares.gov.cz/ekonomicke-subjekty-v-be/rest/ekonomicke-subjekty-res/09315543).
- Tržby živnostníka nie sú v použitom verejnom registri doložené; veľkosť overená podľa ARES.
- Prečo sedí: Vlastný obchod jednej živnostníčky, 1–5 zamestnancov; mnoho podobných izbových druhov, pestovateľské médiá a črepníky. Vlastníkov a konateľov sme porovnali s už zdokumentovanými ukážkami; bez zisteného opakovania.
- Ponuka: **50 produktov**, izbové rastliny, črepníky, substráty. Kurátorovaný výber viacerých druhov a cenových hladín, nie tvrdenie o celom e-shope. Doplnky sú zahrnuté pri zmysluplnom počte položiek; služby, poukazy, predobjednávky, prázdne kompozície a varianty bez doloženej ceny alebo skladu sa vyradili.
- Ceny a sklad: Shopify verejný katalóg a dostupnosť konkrétneho variantu (`available`); URL obsahuje jeho ID a cena patrí uvedenému variantu. Dátum je snímkou; ukážka nevykonáva živú synchronizáciu.
- Tagy a dôvody: iba popis, parametre a kategórie predajcu. Bez doloženého svetla alebo starostlivosti sa použije botanická skupina alebo cenová preferencia. Pet safety sa neodvodzuje z názvu rodu. Snímka údajov a URL ku každej fotografii: `research/2026-10-10/farmarky-products.json`.
- Fotografie: oficiálne priradené produktové zábery; okraje, veľkosť a koláže cez `tools/assets.py` a `tools/make_assets.py` (PIL). Logo: [oficiálny súbor](https://farmarkyzpanelaku.cz/cdn/shop/files/1.png?v=1719496145&width=600); Oficiálne logo; pre hlavičku vyrezaný pôvodný trojriadkový text a zväčšený s Lanczos vyhladením. Pôvodný kvetinový motív je v kruhu v bielej verzii.
- Farby: `brand: #275c37`, `accent: #377448`, `soft: #f0f4eb`, `paper: #fffefa`, `ink: #253124`, `line: #d9e3d5`. Zelené odtiene odvodené z oficiálneho loga; brand a accent stmavené pre kontrast bieleho textu. Biela na brand a accent ≥ 4,5 : 1, kontrolované QA.
- QA: PASS na desktope 1440 px a mobiloch 390/360 px; owner, chat, kroky a výsledky prezreté. `qa-review/farmarky-qa.json`, `farmarky-ui.jpg`, produktové hárky a `qa-review/matrix.json`. Zdrojový doklad firmy: `research/2026-10-10/farmarky-registry.json`.

| Produkt / variant | Kategória | Cena | Produkt skladom pri kontrole |
|---|---|---:|---|
| Fittonia 4 | izbové rastliny | 69 Kč | [detail](https://farmarkyzpanelaku.cz/products/fittonia-3-kopie?variant=54102593470790) |
| Pilea peperomides "M" | izbové rastliny | 149 Kč | [detail](https://farmarkyzpanelaku.cz/products/pilea-peperomides-m?variant=54314087973190) |
| Kokosový květináč (8 cm) | črepníky | 45 Kč | [detail](https://farmarkyzpanelaku.cz/products/kokosovy-kvetinac-8-cm?variant=53383176290630) |
| Sansevieria Laurentii "S" | izbové rastliny | 149 Kč | [detail](https://farmarkyzpanelaku.cz/products/sansevieria-laurentii-s?variant=50438503825734) |
| Zelenec panašovaný (Chlorophytum) "M" | izbové rastliny | 119 Kč | [detail](https://farmarkyzpanelaku.cz/products/zelenec-panasovany-chlorophytum?variant=50283133927750) |
| Epipremnum Neon "S" | izbové rastliny | 149 Kč | [detail](https://farmarkyzpanelaku.cz/products/epipremnum-njoy?variant=50082460139846) |
| Květináč - Brontosauří vejce (8 cm) — Půlka vejce | črepníky | 999 Kč | [detail](https://farmarkyzpanelaku.cz/products/kvetnik-brontosauri-vejce-8-cm?variant=53786514424134) |
| Fittonia 10 | izbové rastliny | 109 Kč | [detail](https://farmarkyzpanelaku.cz/products/fittonia-10?variant=54518007365958) |
| Hoya carnosa tricolor "S" | izbové rastliny | 149 Kč | [detail](https://farmarkyzpanelaku.cz/products/hoya-carnosa-tricolor-s?variant=56493358186822) |
| Chamaedorea elegans "M" | izbové rastliny | 159 Kč | [detail](https://farmarkyzpanelaku.cz/products/chamaedorea-elegans-m?variant=54314010247494) |
| Ficus Belize "M" | izbové rastliny | 169 Kč | [detail](https://farmarkyzpanelaku.cz/products/ficus-belize-stredni?variant=54102607429958) |
| Ficus Pumila "M" | izbové rastliny | 169 Kč | [detail](https://farmarkyzpanelaku.cz/products/ficus-pumila-m?variant=50439895482694) |
| Peperomia pereskiifolia "M" | izbové rastliny | 169 Kč | [detail](https://farmarkyzpanelaku.cz/products/peperomia-pereskiifolia-m?variant=56493370540358) |
| Philodendron White Princess "S" | izbové rastliny | 169 Kč | [detail](https://farmarkyzpanelaku.cz/products/philodendron-white-princess?variant=50438278742342) |
| Philodendron pink princess "S" | izbové rastliny | 169 Kč | [detail](https://farmarkyzpanelaku.cz/products/philodendron-pink-princess-s?variant=54517849424198) |
| Philodendron Lemon Lime "M" | izbové rastliny | 179 Kč | [detail](https://farmarkyzpanelaku.cz/products/philodendron-lemon-lime?variant=50082522136902) |
| Scindapsus pictus trebi "M" | izbové rastliny | 179 Kč | [detail](https://farmarkyzpanelaku.cz/products/scindapsus-pictus-trebi?variant=54076595044678) |
| Scindapsus Pictus "M" | izbové rastliny | 189 Kč | [detail](https://farmarkyzpanelaku.cz/products/scindapsus-pictus?variant=50283124457798) |
| Epipremnum Aureum "M" (šetrné k přírodě) | izbové rastliny | 199 Kč | [detail](https://farmarkyzpanelaku.cz/products/epipremnum-aureum-m-setrne-k-prirode?variant=54794218078534) |
| Epipremnum Neon "M" (šetrné k přírodě) | izbové rastliny | 199 Kč | [detail](https://farmarkyzpanelaku.cz/products/epipremnum-neon-m-setrne-k-prirode?variant=54788751262022) |
| Peperomia pereskiifolia (šetrné k přírodě) | izbové rastliny | 199 Kč | [detail](https://farmarkyzpanelaku.cz/products/peperomia-pereskiifolia-m-kopie?variant=56493371359558) |
| Philodendron Birkin "L" | izbové rastliny | 199 Kč | [detail](https://farmarkyzpanelaku.cz/products/philodendron-birkin-l?variant=50438492782918) |
| Tchýnin jazyk "M" (šetrné k přírodě) | izbové rastliny | 199 Kč | [detail](https://farmarkyzpanelaku.cz/products/tchynin-jazyk-m-setrne-k-prirode?variant=54788724752710) |
| Schefflera arboricola Gerda "L" | izbové rastliny | 229 Kč | [detail](https://farmarkyzpanelaku.cz/products/schefflera-arboricola-gerda-l?variant=56540154298694) |
| Alocasia Scalprum "S" | izbové rastliny | 239 Kč | [detail](https://farmarkyzpanelaku.cz/products/alocasia-scalprum-s?variant=55983937225030) |
| Peperomia Green Bean | izbové rastliny | 249 Kč | [detail](https://farmarkyzpanelaku.cz/products/peperomia-green-bean?variant=56781099172166) |
| Philodendron Cream Splash "M" | izbové rastliny | 249 Kč | [detail](https://farmarkyzpanelaku.cz/products/philodendron-cream-splash-s?variant=54106803568966) |
| Sansevieria Laurentii "L" | izbové rastliny | 249 Kč | [detail](https://farmarkyzpanelaku.cz/products/sansevieria-laurentii-l?variant=56493347995974) |
| Scindapsus Pictus Trebi "M" (šetrné k přírodě) | izbové rastliny | 249 Kč | [detail](https://farmarkyzpanelaku.cz/products/scindapsus-pictus-trebi-m-setrne-k-prirode?variant=54794248683846) |
| Ficus Bambino "L" | izbové rastliny | 279 Kč | [detail](https://farmarkyzpanelaku.cz/products/ficus-bambino?variant=53383152042310) |
| Peperomia obtusifolia green "L" | izbové rastliny | 299 Kč | [detail](https://farmarkyzpanelaku.cz/products/peperomia-obtusifolia-green-l?variant=55984078389574) |
| Monstera siltepecana "L" | izbové rastliny | 329 Kč | [detail](https://farmarkyzpanelaku.cz/products/monstera-siltepecana-l?variant=54517745975622) |
| Philodendron Cream Splash "M" (šetrné k přírodě) | izbové rastliny | 349 Kč | [detail](https://farmarkyzpanelaku.cz/products/philodendron-cream-splash-m-setrne-k-prirode?variant=54788687593798) |
| Ficus Benjamina variegated "L" | izbové rastliny | 359 Kč | [detail](https://farmarkyzpanelaku.cz/products/ficus-benjamina-variegated-l?variant=56781095338310) |
| Nephrolepis Exaltata Green Lady "M" | izbové rastliny | 399 Kč | [detail](https://farmarkyzpanelaku.cz/products/neprolepis-exaltata-green-lady-m?variant=54313979576646) |
| Hoya Macrophylla Variegata "M" | izbové rastliny | 449 Kč | [detail](https://farmarkyzpanelaku.cz/products/hoya-macrophylla-variegata-m?variant=54313967124806) |
| Květináč - Brontosauří vejce (10 cm) — Půlka vejce | črepníky | 1349 Kč | [detail](https://farmarkyzpanelaku.cz/products/kvetnik-brontosauri-vejce-10-cm?variant=53786524713286) |
| Květináč - Brontosauří vejce (11 cm) — Půlka vejce | črepníky | 1799 Kč | [detail](https://farmarkyzpanelaku.cz/products/kvetnik-brontosauri-vejce-11-cm?variant=53740043108678) |
| Kokosové vlákno — 1l | substráty | 29 Kč | [detail](https://farmarkyzpanelaku.cz/products/kokosove-vlakno?variant=50438851035462) |
| Perlit — 1l | substráty | 29 Kč | [detail](https://farmarkyzpanelaku.cz/products/perlit?variant=50438851985734) |
| Substrát pro Alocasie a Anthuria — 1l | substráty | 39 Kč | [detail](https://farmarkyzpanelaku.cz/products/substrat-pro-alocasie-a-anthuria?variant=55869662626118) |
| Substrát pro Aroidy — 1l | substráty | 39 Kč | [detail](https://farmarkyzpanelaku.cz/products/substrat-pro-aroidy?variant=50089707143494) |
| Substrát pro fíkusy — 1l | substráty | 39 Kč | [detail](https://farmarkyzpanelaku.cz/products/substrat-pro-fikusy?variant=53726971068742) |
| Substrát pro kapradiny — 1l | substráty | 39 Kč | [detail](https://farmarkyzpanelaku.cz/products/substrat-pro-kapradiny?variant=53727074025798) |
| Substrát pro pilei a pepřince — 1l | substráty | 39 Kč | [detail](https://farmarkyzpanelaku.cz/products/substrat-pro-pilei-a-peprince?variant=53727041782086) |
| Substrát pro pokojovky — 1l | substráty | 39 Kč | [detail](https://farmarkyzpanelaku.cz/products/substrat-pro-pokojovky?variant=55800118575430) |
| Substrát pro sukulenty a kaktusy — 1l | substráty | 39 Kč | [detail](https://farmarkyzpanelaku.cz/products/substrat-pro-suchomilne-rostliny?variant=50442402758982) |
| Substrát pro vlhkomilné rostliny — 1l | substráty | 39 Kč | [detail](https://farmarkyzpanelaku.cz/products/substrat-pro-vlhkomilne-rostliny?variant=55869651714374) |
| Substrát pro voskovky — 1l | substráty | 39 Kč | [detail](https://farmarkyzpanelaku.cz/products/substrat-pro-voskovky?variant=53726982930758) |
| Substrát pro zamioculcasy a sansevierie — 1l | substráty | 39 Kč | [detail](https://farmarkyzpanelaku.cz/products/substrat-pro-zamioculcas?variant=53726995415366) |

## Plantotéka

- Kontrola cien a skladu: **10.10.2026**, priamo z vlastného [e-shopu](https://www.plantoteka.sk/). [Identita predajcu](https://www.plantoteka.sk/obchodne-podmienky/).
- Firma: **Ing. Nikola Faturík, IČO 55004709**. Vlastníci: Ing. Nikola Faturík. Konatelia / podnikateľ: Ing. Nikola Faturík.
- Veľkosť: **Tržby nedoložené; 0 zam.**. Kód `01` v [primárnom registri](https://www.registeruz.sk/cruz-public/api/uctovna-jednotka?id=2133611); údaj aktualizovaný 2026-07-03, načítaný 2026-10-10. [Vlastníci](https://www.plantoteka.sk/obchodne-podmienky/).
- [Finančný výkaz](https://www.registeruz.sk/cruz-public/api/uctovny-vykaz?id=9984960): Výkaz za rok 2025 je v RÚZ označený Neverejné; sumy nie sú dostupné. Veľkosť organizácie 01 znamená 0 zamestnancov.
- RPO pri kontrole neodpovedalo; vlastníci overení z uvedeného primárneho zdroja, veľkosť a financie z RÚZ.
- Prečo sedí: Malé rastlinárstvo jednej podnikateľky bez zamestnancov podľa registra; podobné izbové druhy a kultivary s doplnkami, pri ktorých záleží na svetle a rozpočte. Vlastníkov a konateľov sme porovnali s už zdokumentovanými ukážkami; bez zisteného opakovania.
- Ponuka: **40 produktov**, izbové rastliny, črepníky, substráty. Kurátorovaný výber viacerých druhov a cenových hladín, nie tvrdenie o celom e-shope. Doplnky sú zahrnuté pri zmysluplnom počte položiek; služby, poukazy, predobjednávky, prázdne kompozície a varianty bez doloženej ceny alebo skladu sa vyradili.
- Ceny a sklad: mikrodáta výpisu aj detailu (`InStock`, cena a mena); pri variantoch navyše oficiálne Shoptet variantové dáta viažu cenu, sklad a fotografiu k uvedenému variantu. Na detaile treba vybrať pomenovaný variant. Dátum je snímkou; ukážka nevykonáva živú synchronizáciu.
- Tagy a dôvody: iba popis, parametre a kategórie predajcu. Bez doloženého svetla alebo starostlivosti sa použije botanická skupina alebo cenová preferencia. Pet safety sa neodvodzuje z názvu rodu. Snímka údajov a URL ku každej fotografii: `research/2026-10-10/plantoteka-products.json`.
- Fotografie: oficiálne priradené produktové zábery; okraje, veľkosť a koláže cez `tools/assets.py` a `tools/make_assets.py` (PIL). Logo: [oficiálny súbor](https://cdn.myshoptet.com/usr/www.plantoteka.sk/user/logos/plantot__ka_logo.jpg); Oficiálne logo; pri potrebe zväčšené s Lanczos vyhladením. Symbol v kruhu vyrezaný z pôvodného loga.
- Farby: `brand: #235e49`, `accent: #2b7258`, `soft: #f4eeea`, `paper: #fffefa`, `ink: #253229`, `line: #dedfd5`. Zelené odtiene odvodené z oficiálneho loga; brand a accent stmavené pre kontrast bieleho textu. Biela na brand a accent ≥ 4,5 : 1, kontrolované QA.
- QA: PASS na desktope 1440 px a mobiloch 390/360 px; owner, chat, kroky a výsledky prezreté. `qa-review/plantoteka-qa.json`, `plantoteka-ui.jpg`, produktové hárky a `qa-review/matrix.json`. Zdrojový doklad firmy: `research/2026-10-10/plantoteka-registry.json`.

| Produkt / variant | Kategória | Cena | Produkt skladom pri kontrole |
|---|---|---:|---|
| Monstera adansonii | izbové rastliny | 8,90 € | [detail](https://www.plantoteka.sk/monstera-adansonii/) |
| Peperomia Sarcophylla | izbové rastliny | 8,90 € | [detail](https://www.plantoteka.sk/peperomia/) |
| Kvetináč Bria | črepníky | 8,90 € | [detail](https://www.plantoteka.sk/kvetinac-bria/) |
| Begonia Listrada | izbové rastliny | 4,90 € | [detail](https://www.plantoteka.sk/begonia-3/) |
| Aglaonema Rich Red | izbové rastliny | 7,90 € | [detail](https://www.plantoteka.sk/aglaonema-7/) |
| Aglaonema pictum Tricolor | izbové rastliny | 7,90 € | [detail](https://www.plantoteka.sk/aglaonema-13/) |
| Begonia leaf Looking Glass | izbové rastliny | 9,90 € | [detail](https://www.plantoteka.sk/begonia-6/) |
| Aglaonema Peach Pearl | izbové rastliny | 12,90 € | [detail](https://www.plantoteka.sk/aglaonema-peach-pearl/) |
| Ceropegia woodii variegata | izbové rastliny | 12,90 € | [detail](https://www.plantoteka.sk/ceropegia-woodii-variegata/) |
| Aeonium Anna | izbové rastliny | 16,90 € | [detail](https://www.plantoteka.sk/aeonium-anna/) |
| Aeonium Medusa | izbové rastliny | 16,90 € | [detail](https://www.plantoteka.sk/aeonium-medusa/) |
| Alocasia lauterbachiana variegata | izbové rastliny | 16,90 € | [detail](https://www.plantoteka.sk/alocasia-13/) |
| Labisia obtusifolia Turtle Back | izbové rastliny | 16,90 € | [detail](https://www.plantoteka.sk/labisia-turtle-back/) |
| Philodendron Cherry Red | izbové rastliny | 16,90 € | [detail](https://www.plantoteka.sk/philodendron-15/) |
| Philodendron Summer Glory veľký | izbové rastliny | 16,90 € | [detail](https://www.plantoteka.sk/philodendron-16/) |
| Streptocarpus - viacero druhov | izbové rastliny | 16,90 € | [detail](https://www.plantoteka.sk/streptocarpus-viacero-druhov/) |
| Aglaonema White Joy | izbové rastliny | 18,90 € | [detail](https://www.plantoteka.sk/aglaonema-white-joy/) |
| Monstera adansonii variegata | izbové rastliny | 18,90 € | [detail](https://www.plantoteka.sk/monstera-adansonii-variegata/) |
| Aglaonema Buttercup Pink | izbové rastliny | 19,90 € | [detail](https://www.plantoteka.sk/aglaonema-4/) |
| Rhipsalis burchellii viacero druhov | izbové rastliny | 21,90 € | [detail](https://www.plantoteka.sk/rhipsalis-burchellii-viacero-druhov/) |
| Anthurium Silver Blush Mint | izbové rastliny | 24,90 € | [detail](https://www.plantoteka.sk/anthurium-9/) |
| Ficus lyrata variegata | izbové rastliny | 24,90 € | [detail](https://www.plantoteka.sk/ficus-lyrata-variegata/) |
| Philodendron Caramel Marble | izbové rastliny | 29,00 € | [detail](https://www.plantoteka.sk/philodendron-12/) |
| Alocasia venom | izbové rastliny | 29,90 € | [detail](https://www.plantoteka.sk/alocasia-venom/) |
| Monstera deliciosa albo variegata | izbové rastliny | 34,90 € | [detail](https://www.plantoteka.sk/monstera-deliciosa-albo-variegata/) |
| Alocasia Shattered Glass | izbové rastliny | 45,00 € | [detail](https://www.plantoteka.sk/alocasia-6/) |
| Euphorbia mauritanica Mayuranthii Variegata | izbové rastliny | 54,90 € | [detail](https://www.plantoteka.sk/euphorbia-2/) |
| Plastový priehľadný kvetináč 17 cm | črepníky | 1,29 € | [detail](https://www.plantoteka.sk/plastovy-priehladny-kvetinac-17-cm/) |
| Kvetináč Abby | črepníky | 3,20 € | [detail](https://www.plantoteka.sk/kvetinac/) |
| Kvetináč Caro | črepníky | 3,50 € | [detail](https://www.plantoteka.sk/kvetinac-caro/) |
| Kvetináč Ashley | črepníky | 4,90 € | [detail](https://www.plantoteka.sk/kvetinac-ashley/) |
| Kvetináč Rainbow | črepníky | 4,90 € | [detail](https://www.plantoteka.sk/kvetinac-rainbow/) |
| Kvetináč Farah | črepníky | 5,90 € | [detail](https://www.plantoteka.sk/kvetinac-farah/) |
| Kvetináč Davina | črepníky | 6,90 € | [detail](https://www.plantoteka.sk/kvetinac-davina/) |
| Kvetináč Sadie | črepníky | 6,90 € | [detail](https://www.plantoteka.sk/kvetinac-sadie/) |
| Kvetináč Cali | črepníky | 9,90 € | [detail](https://www.plantoteka.sk/kvetinac-cali/) |
| Kvetináč Aisha | črepníky | 11,90 € | [detail](https://www.plantoteka.sk/kvetinac-aisha/) |
| Substrát Profík Orchidea 5l | substráty | 6,20 € | [detail](https://www.plantoteka.sk/substrat-profik-orchidea-5l/) |
| Terrabloom prémiový substrát ORCHIDEA | substráty | 6,90 € | [detail](https://www.plantoteka.sk/premiovy-substrat-orchid/) |
| Hydroponický substrát SOIL.NINJA | substráty | 10,90 € | [detail](https://www.plantoteka.sk/hydroponicky-substrat-soil-ninja/) |

### Kontrola negovaných odporúčaní svetla (10.10.2026)

Pri pridaní PlantBros sa opravili tagy pri vetách typu „priame slnko listy poškodí“, „nesnese přímé slunce“ a „neľúbi priame slnko“. Spätne sa odstránilo nesprávne slnko pri troch filodendronoch a troch tillandsiových produktoch Zahrady na niti a pri Calathea Triostar z KytkaSem. Ceny a sklad sa nemenili. QA a všetky kombinácie sa znova spustili, výsledky PASS.

## PlantBros

- Kontrola cien a skladu: **10.10.2026**, priamo z vlastného [e-shopu](https://www.plantbros.sk/). [Identita predajcu](https://www.plantbros.sk/obchodne-podmienky/).
- Firma: **Extravaganza Studio LV s.r.o., IČO 50932632**. Vlastníci: Lukáš Halama, Viliam Lajgút. Konatelia / podnikateľ: Lukáš Halama, Viliam Lajgút.
- Veľkosť: **24 630 € tržby 2025; nezistené zam.**. Kód `00` v [primárnom registri](https://www.registeruz.sk/cruz-public/api/uctovna-jednotka?id=1708531); údaj aktualizovaný 2026-07-03, načítaný 2026-10-10. [Vlastníci](https://www.orsr.sk/vypis.asp?ID=382160&SID=3&P=0).
- [Finančný výkaz](https://www.registeruz.sk/cruz-public/domain/financialreport/show/10012458/687): Čistý obrat: 0 € z predaja tovaru + 24 630 € z predaja výrobkov a služieb. Celofiremné tržby; podniká aj mimo e-shopu. Kód 00 znamená nezistený počet zamestnancov, nie nulu.
- RPO pri kontrole neodpovedalo; vlastníci overení z uvedeného primárneho zdroja, veľkosť a financie z RÚZ.
- Prečo sedí: Malý vlastný obchod dvoch konateľov; overené celofiremné tržby hlboko pod miliónom eur. Rastliny, kaktusy a substráty vytvárajú zmysluplné poradenstvo. Vlastníkov a konateľov sme porovnali s už zdokumentovanými ukážkami; bez zisteného opakovania.
- Ponuka: **58 produktov**, izbové rastliny, sukulenty a kaktusy, črepníky, substráty. Kurátorovaný výber viacerých druhov a cenových hladín, nie tvrdenie o celom e-shope. Doplnky sú zahrnuté pri zmysluplnom počte položiek; služby, poukazy, predobjednávky, prázdne kompozície a varianty bez doloženej ceny alebo skladu sa vyradili.
- Ceny a sklad: mikrodáta výpisu aj detailu (`InStock`, cena a mena); pri variantoch navyše oficiálne Shoptet variantové dáta viažu cenu, sklad a fotografiu k uvedenému variantu. Na detaile treba vybrať pomenovaný variant. Dátum je snímkou; ukážka nevykonáva živú synchronizáciu.
- Tagy a dôvody: iba popis, parametre a kategórie predajcu. Bez doloženého svetla alebo starostlivosti sa použije botanická skupina alebo cenová preferencia. Pet safety sa neodvodzuje z názvu rodu. Snímka údajov a URL ku každej fotografii: `research/2026-10-10/plantbros-products.json`.
- Fotografie: oficiálne priradené produktové zábery; okraje, veľkosť a koláže cez `tools/assets.py` a `tools/make_assets.py` (PIL). Logo: [oficiálny súbor](https://cdn.myshoptet.com/usr/www.plantbros.sk/user/logos/wwww.png); Oficiálne rasterové logo; symbol je vyrezané pôvodné písmeno B a prevedené na bielu verziu pre kontrast v kruhu. Produktové štúdiové fotografie priblížené individuálnym PIL orezom; výsledky prezreté.
- Farby: `brand: #00362b`, `accent: #246649`, `soft: #f0f4eb`, `paper: #fffefa`, `ink: #243029`, `line: #d7e1d5`. Zelené odtiene odvodené z oficiálneho loga; brand a accent stmavené pre kontrast bieleho textu. Biela na brand a accent ≥ 4,5 : 1, kontrolované QA.
- QA: PASS na desktope 1440 px a mobiloch 390/360 px; owner, chat, kroky a výsledky prezreté. `qa-review/plantbros-qa.json`, `plantbros-ui.jpg`, produktové hárky a `qa-review/matrix.json`. Zdrojový doklad firmy: `research/2026-10-10/plantbros-registry.json`.

| Produkt / variant | Kategória | Cena | Produkt skladom pri kontrole |
|---|---|---:|---|
| Maranta kerchoveana (Modlivka) | izbové rastliny | 9,90 € | [detail](https://www.plantbros.sk/maranta-kerchoveana-2/) |
| Philodendron White Measure | izbové rastliny | 16,90 € | [detail](https://www.plantbros.sk/philodendron-white-measure/) |
| Kvetináč "Kafíčko" 6cm | črepníky | 4,90 € | [detail](https://www.plantbros.sk/kvetinac--kaficko--6cm/) |
| Mammillaria Elongata | sukulenty a kaktusy | 3,90 € | [detail](https://www.plantbros.sk/mammillaria-elongata/) |
| Baby Sansevieria Ehrenbergii "Samurai" | izbové rastliny | 8,90 € | [detail](https://www.plantbros.sk/baby-sansevieria-ehrenbergii--samurai/) |
| Fittonia albivenis | izbové rastliny | 8,90 € | [detail](https://www.plantbros.sk/fittonia-albivenis/) |
| Aloe Vera | sukulenty a kaktusy | 9,90 € | [detail](https://www.plantbros.sk/aloe-vera/) |
| Kvetináč "Pipkovia" 10,5cm | črepníky | 8,90 € | [detail](https://www.plantbros.sk/kvetinac--pipkovia/) |
| Hoya burtoniae variegata | izbové rastliny | 8,90 € | [detail](https://www.plantbros.sk/hoya-burtoniae-variegata/) |
| Peperomia albov. Bambino | izbové rastliny | 8,90 € | [detail](https://www.plantbros.sk/peperomia-albov--bambino/) |
| Baby Hoya Carnosa "Tricolor" | izbové rastliny | 9,90 € | [detail](https://www.plantbros.sk/baby-hoya-carnosa--tricolor/) |
| Baby Hoya Erythrina | izbové rastliny | 9,90 € | [detail](https://www.plantbros.sk/baby-hoya-verticillata--wibergiae/) |
| Coleus 2 | izbové rastliny | 9,90 € | [detail](https://www.plantbros.sk/coleus-2/) |
| Coleus decurrens | izbové rastliny | 9,90 € | [detail](https://www.plantbros.sk/coleus-decurrens/) |
| Hoya Callistophylla Sabah malá | izbové rastliny | 9,90 € | [detail](https://www.plantbros.sk/hoya-callistophylla-sabah-mala/) |
| Ctenanthe burle-marxii ‘Amagris’ | izbové rastliny | 10,90 € | [detail](https://www.plantbros.sk/ctenanthe-burle-marxii-amagris/) |
| Philodendron Micans | izbové rastliny | 10,90 € | [detail](https://www.plantbros.sk/philodendron-micans/) |
| Zamioculcas Zenzi baby | izbové rastliny | 12,50 € | [detail](https://www.plantbros.sk/zamioculcas-zenzi-baby/) |
| Dracaena fragrans ‘Lemon Lime’ | izbové rastliny | 12,90 € | [detail](https://www.plantbros.sk/dracaena-fragrans--lemon-lime/) |
| Tradescantia zebrina Purple Passion | izbové rastliny | 12,90 € | [detail](https://www.plantbros.sk/tradescantia-zebrina-purple-passion/) |
| Begonia conchifolia | izbové rastliny | 14,90 € | [detail](https://www.plantbros.sk/begonia-conchifolia/) |
| Gynura aurantiaca ‘Purple Passion’ | izbové rastliny | 14,90 € | [detail](https://www.plantbros.sk/gynura-aurantiaca-purple-passion/) |
| Asparagus Plumosus | izbové rastliny | 15,90 € | [detail](https://www.plantbros.sk/asparagus-plumosus/) |
| Hoya Callistophylla Sabah | izbové rastliny | 16,90 € | [detail](https://www.plantbros.sk/hoya-callistophylla-sabah/) |
| Peperomia glabella | izbové rastliny | 16,90 € | [detail](https://www.plantbros.sk/peperomia-glabela/) |
| Peperomia pixie | izbové rastliny | 16,90 € | [detail](https://www.plantbros.sk/peperomia-pixie/) |
| Philodendron Imperial Red | izbové rastliny | 16,90 € | [detail](https://www.plantbros.sk/philodendron-imperial-red/) |
| Philodendron Narrow | izbové rastliny | 16,90 € | [detail](https://www.plantbros.sk/philodendron-narrow/) |
| Philodendron tortum | izbové rastliny | 16,90 € | [detail](https://www.plantbros.sk/philodendron-tortum/) |
| Papraď Nephrolepis exaltata Green Lady | izbové rastliny | 18,90 € | [detail](https://www.plantbros.sk/nephrolepis-exaltata--paprad-nefrolepka/) |
| Papraď nefrolepka-Nephrolepis exaltata | izbové rastliny | 18,90 € | [detail](https://www.plantbros.sk/paprad-nefrolepka-nephrolepis-exaltata/) |
| Philodendron melanochrysum | izbové rastliny | 19,90 € | [detail](https://www.plantbros.sk/philodendron-melanochrysum/) |
| Zamioculcas ‘Pixie’ | izbové rastliny | 19,90 € | [detail](https://www.plantbros.sk/zamioculcas-zenzi/) |
| Strelitzia Nicolai 3pp 105cm | izbové rastliny | 30,00 € | [detail](https://www.plantbros.sk/strelitzia-nicolai-105cm/) |
| Zamioculcas zamiifolia | izbové rastliny | 39,90 € | [detail](https://www.plantbros.sk/zamioculcas-zamiifolia/) |
| Mammillaria bombycina | sukulenty a kaktusy | 4,50 € | [detail](https://www.plantbros.sk/mammillaria-bombycina/) |
| Stenocereus pruinosis | sukulenty a kaktusy | 4,50 € | [detail](https://www.plantbros.sk/stenocereus-pruinosis/) |
| Echinopsis | sukulenty a kaktusy | 5,00 € | [detail](https://www.plantbros.sk/echinopsis/) |
| Opuntia Monacantha | sukulenty a kaktusy | 5,90 € | [detail](https://www.plantbros.sk/opuntia-monacantha/) |
| Ferocactus histrix | sukulenty a kaktusy | 6,00 € | [detail](https://www.plantbros.sk/ferocactus-histrix/) |
| Maihueniopsis boliviana | sukulenty a kaktusy | 7,00 € | [detail](https://www.plantbros.sk/austrocylindropuntia-subulata/) |
| Hylocereus undatus (Dračie ovocie - Pitahaya) | sukulenty a kaktusy | 9,90 € | [detail](https://www.plantbros.sk/hylocereus-undatus--dracie-ovocie-pitahaya-/) |
| Sedum burrito — Bez keramického kvetináča | sukulenty a kaktusy | 9,90 € | [detail](https://www.plantbros.sk/sedum-burrito/) |
| Pilosocereus chrysostele | sukulenty a kaktusy | 12,00 € | [detail](https://www.plantbros.sk/pilosocereus-chrysostele/) |
| Rhipsalis burchellii — Bez keramického kvetináča | sukulenty a kaktusy | 12,90 € | [detail](https://www.plantbros.sk/rhipsalis-burchellii/) |
| Kalanchoe luciae 'Lady Fingers' | sukulenty a kaktusy | 26,90 € | [detail](https://www.plantbros.sk/kalanchoe-luciae--lady-fingers/) |
| Hildewintera colademonis (Opičí chvost) | sukulenty a kaktusy | 75,00 € | [detail](https://www.plantbros.sk/hildewintera-colademonis--opici-chvost/) |
| Kvetináč "Cencúľ" 6cm | črepníky | 5,50 € | [detail](https://www.plantbros.sk/kvetinac--cencul--6cm/) |
| Kvetináč "Vlnky" 6cm — Biela | črepníky | 5,50 € | [detail](https://www.plantbros.sk/kvetinac--a--uz-viem/) |
| Kvetináč "Košíček" 13cm | črepníky | 6,50 € | [detail](https://www.plantbros.sk/kvetinac--kosicek--13-cm/) |
| Kvetináč "Poistka" 7cm — Biela | črepníky | 6,50 € | [detail](https://www.plantbros.sk/kvetinac--poistka--7cm/) |
| Kvetináč Nálada 9cm — Zelená | črepníky | 8,90 € | [detail](https://www.plantbros.sk/kvetinac-nalada-9-cm/) |
| Kvetináč "Tatiana" 12cm — Biela | črepníky | 9,90 € | [detail](https://www.plantbros.sk/kvetinac-tatiana-12-cm/) |
| Kvetináč Krupica 12cm — Biela | črepníky | 9,90 € | [detail](https://www.plantbros.sk/kvetinac-krupica/) |
| Kvetináč Rokoko 12cm — Kapučíno | črepníky | 10,50 € | [detail](https://www.plantbros.sk/kvetinac-rokoko/) |
| Perlit — 2l | substráty | 3,99 € | [detail](https://www.plantbros.sk/perlit/) |
| Vzdušný substrát SoilBros "Tropical Mix" — 2l | substráty | 4,50 € | [detail](https://www.plantbros.sk/vzdusny-substrat-soilbros--tropical-mix/) |
| Vzdušný substrát SoilBros "Dreviny Mix" — 3l | substráty | 5,80 € | [detail](https://www.plantbros.sk/vzdusny-substrat-soilbros--dreviny-mix/) |

## Pokojovky ze severu

- Kontrola cien a skladu: **10.10.2026**, priamo z vlastného [e-shopu](https://www.pokojovkyzeseveru.cz/). [Identita predajcu](https://www.pokojovkyzeseveru.cz/obchodni-podminky/).
- Firma: **Iva Kolátorová, IČO 68424582**. Vlastníci: Iva Kolátorová. Konatelia / podnikateľ: Iva Kolátorová.
- Veľkosť: **Tržby nedoložené; 1–5 zam.**. Kód `110` v [primárnom registri](https://ares.gov.cz/ekonomicke-subjekty-v-be/rest/ekonomicke-subjekty-res/68424582); údaj aktualizovaný 2021-12-03, načítaný 2026-10-10. [Vlastníci](https://ares.gov.cz/ekonomicke-subjekty-v-be/rest/ekonomicke-subjekty-res/68424582).
- Tržby živnostníka nie sú v použitom verejnom registri doložené; veľkosť overená podľa ARES.
- Prečo sedí: Samostatná podnikateľka, 1–5 zamestnancov podľa ARES; bohatá skladová ponuka rastlín a médií vyžaduje výber podľa podmienok. Vlastníkov a konateľov sme porovnali s už zdokumentovanými ukážkami; bez zisteného opakovania.
- Ponuka: **17 produktov**, izbové rastliny, sukulenty a kaktusy, substráty. Kurátorovaný výber viacerých druhov a cenových hladín, nie tvrdenie o celom e-shope. Doplnky sú zahrnuté pri zmysluplnom počte položiek; služby, poukazy, predobjednávky, prázdne kompozície a varianty bez doloženej ceny alebo skladu sa vyradili.
- Ceny a sklad: mikrodáta výpisu aj detailu (`InStock`, cena a mena); pri variantoch navyše oficiálne Shoptet variantové dáta viažu cenu, sklad a fotografiu k uvedenému variantu. Na detaile treba vybrať pomenovaný variant. Dátum je snímkou; ukážka nevykonáva živú synchronizáciu.
- Tagy a dôvody: iba popis, parametre a kategórie predajcu. Bez doloženého svetla alebo starostlivosti sa použije botanická skupina alebo cenová preferencia. Pet safety sa neodvodzuje z názvu rodu. Snímka údajov a URL ku každej fotografii: `research/2026-10-10/sever-products.json`.
- Fotografie: oficiálne priradené produktové zábery; okraje, veľkosť a koláže cez `tools/assets.py` a `tools/make_assets.py` (PIL). Logo: [oficiálny súbor](https://cdn.myshoptet.com/usr/www.pokojovkyzeseveru.cz/user/logos/logo-6.png); Oficiálne logo; pri potrebe zväčšené s Lanczos vyhladením. Symbol v kruhu vyrezaný z pôvodného loga.
- Farby: `brand: #275c37`, `accent: #377448`, `soft: #f0f4eb`, `paper: #fffefa`, `ink: #253124`, `line: #d9e3d5`. Zelené odtiene odvodené z oficiálneho loga; brand a accent stmavené pre kontrast bieleho textu. Biela na brand a accent ≥ 4,5 : 1, kontrolované QA.
- QA: PASS na desktope 1440 px a mobiloch 390/360 px; owner, chat, kroky a výsledky prezreté. `qa-review/sever-qa.json`, `sever-ui.jpg`, produktové hárky a `qa-review/matrix.json`. Zdrojový doklad firmy: `research/2026-10-10/sever-registry.json`.

| Produkt / variant | Kategória | Cena | Produkt skladom pri kontrole |
|---|---|---:|---|
| Tradescantia Unicorn Květináč 7 cm | izbové rastliny | 95 Kč | [detail](https://www.pokojovkyzeseveru.cz/tradescantia-unicorn/) |
| Epipremnum Marble queen Průměr květináče 12 cm. | izbové rastliny | 199 Kč | [detail](https://www.pokojovkyzeseveru.cz/epipremnum-marble-queen/) |
| Sansevieria cylindrica Květináč 12 cm. | sukulenty a kaktusy | 230 Kč | [detail](https://www.pokojovkyzeseveru.cz/sansevieria-cylindrica/) |
| Monstera Minima Květináč 12 cm. | izbové rastliny | 230 Kč | [detail](https://www.pokojovkyzeseveru.cz/monstera-minima/) |
| Dracaena fragrans Malaika Květináč 12 cm. | izbové rastliny | 260 Kč | [detail](https://www.pokojovkyzeseveru.cz/dracaena-fragrans-malaika/) |
| Hoya DS70 Průměr květináče 12 cm. | izbové rastliny | 260 Kč | [detail](https://www.pokojovkyzeseveru.cz/hoya-burtoniae-variegata/) |
| Hoya carnosa Tricolor Průměr květináče 12 nebo 14  cm. | izbové rastliny | 320 Kč | [detail](https://www.pokojovkyzeseveru.cz/hoya-carnosa-tricolor/) |
| Philodendron Imperial red Květináč 12 cm. | izbové rastliny | 290 Kč | [detail](https://www.pokojovkyzeseveru.cz/philodendron-imperial-red/) |
| Philodendron Brandtianum Květináč 12 cm. | izbové rastliny | 299 Kč | [detail](https://www.pokojovkyzeseveru.cz/philodendron-brandtianum/) |
| Hoya carnosa Silver spots Květináč 12 cm. | izbové rastliny | 349 Kč | [detail](https://www.pokojovkyzeseveru.cz/hoya-carnosa-silver-spots/) |
| Hoya crassipetiolata Splash Round Leaf Květináč 8 cm. | izbové rastliny | 380 Kč | [detail](https://www.pokojovkyzeseveru.cz/hoya-crassipetiolata-splash-round-leaf/) |
| Monstera Burle Marx Flame Monstera Burle Marx Flame (květináč 12 cm, výška 30 cm) | izbové rastliny | 699 Kč | [detail](https://www.pokojovkyzeseveru.cz/monstera-burle-marx-flame/) |
| Aeschynanthus Marmoratus Průměr květináče 19 cm. | izbové rastliny | 499 Kč | [detail](https://www.pokojovkyzeseveru.cz/aeschynanthus-marmoratus/) |
| Sansevieria Black Dragon temný tchynin jazyk / květináč 12 cm | sukulenty a kaktusy | 240 Kč | [detail](https://www.pokojovkyzeseveru.cz/sansevieria-black-dragon/) |
| Univerzální vzdušný substrát Akční cena | substráty | 45 Kč | [detail](https://www.pokojovkyzeseveru.cz/univerzalni-vzdusny-substrat/) |
| LECHUZA PON 3l Minerální substrát LECHUZA PON 3l | substráty | 190 Kč | [detail](https://www.pokojovkyzeseveru.cz/lechuza-pon-3l/) |
| Minerální substrát CACTUSPON 3l CACTUSPON minerální substrát pro kaktusy a sukulenty | substráty | 210 Kč | [detail](https://www.pokojovkyzeseveru.cz/mineralni-substrat-cactuspon-3l/) |

## Izbovečky

- Kontrola cien a skladu: **10.10.2026**, priamo z vlastného [e-shopu](https://www.izbovecky.sk/). [Identita predajcu](https://www.izbovecky.sk/podmienky-gdpr).
- Firma: **Izbovečky s. r. o., IČO 57395497**. Vlastníci: Zuzana Abrahámová. Konatelia / podnikateľ: Zuzana Abrahámová, Tomáš Cibuľa.
- Veľkosť: **Tržby nedoložené; 1 zam.**. Kód `02` v [primárnom registri](https://www.registeruz.sk/cruz-public/api/uctovna-jednotka?id=2537923); údaj aktualizovaný 2026-07-10, načítaný 2026-10-10. [Vlastníci](https://orsr.sk/vypis.asp?ID=745883&SID=3&P=0).
- Spoločnosť vznikla 9.1.2026, dosiaľ bez účtovnej závierky v RÚZ. Kód veľkosti 02 znamená 1 zamestnanca, nejde o odhad tržieb.
- RPO pri kontrole neodpovedalo; vlastníci overení z uvedeného primárneho zdroja, veľkosť a financie z RÚZ.
- Prečo sedí: Nové rastlinné s.r.o. od januára 2026, 1 zamestnanec podľa registra; mnoho podobných izbových a raritných druhov, pri ktorých výber spresní svetlo a rozpočet. Vlastníkov a konateľov sme porovnali s už zdokumentovanými ukážkami; bez zisteného opakovania.
- Ponuka: **25 produktov**, izbové rastliny, raritné rastliny. Kurátorovaný výber viacerých druhov a cenových hladín, nie tvrdenie o celom e-shope. Doplnky sú zahrnuté pri zmysluplnom počte položiek; služby, poukazy, predobjednávky, prázdne kompozície a varianty bez doloženej ceny alebo skladu sa vyradili.
- Ceny a sklad: WooCommerce Store API: `is_in_stock` a `is_purchasable` sú true, `is_on_backorder` je false, `stock_availability.class` je in-stock; pevná cena a mena, bez variantov a cenového rozsahu. Dátum je snímkou; ukážka nevykonáva živú synchronizáciu.
- Tagy a dôvody: iba popis, parametre a kategórie predajcu. Bez doloženého svetla alebo starostlivosti sa použije botanická skupina alebo cenová preferencia. Pet safety sa neodvodzuje z názvu rodu. Snímka údajov a URL ku každej fotografii: `research/2026-10-10/izbovecky-products.json`.
- Fotografie: oficiálne priradené produktové zábery; okraje, veľkosť a koláže cez `tools/assets.py` a `tools/make_assets.py` (PIL). Logo: [oficiálny súbor](https://www.izbovecky.sk/wp-content/uploads/2025/11/Adobe-Express-file.png); Originálne biele písmená vybrané z oficiálnej fotografickej koláže a prevedené do tmavej zelenej pre čitateľnosť. Tvar písmen aj mäkčeň zachované; symbol je pôvodný list z koláže. 
- Farby: `brand: #294329`, `accent: #3c6438`, `soft: #f0f3e9`, `paper: #fffefa`, `ink: #253025`, `line: #dbe0d2`. Zelené odtiene odvodené z oficiálneho loga; brand a accent stmavené pre kontrast bieleho textu. Biela na brand a accent ≥ 4,5 : 1, kontrolované QA.
- QA: PASS na desktope 1440 px a mobiloch 390/360 px; owner, chat, kroky a výsledky prezreté. `qa-review/izbovecky-qa.json`, `izbovecky-ui.jpg`, produktové hárky a `qa-review/matrix.json`. Zdrojový doklad firmy: `research/2026-10-10/izbovecky-registry.json`.

| Produkt / variant | Kategória | Cena | Produkt skladom pri kontrole |
|---|---|---:|---|
| Monstera standleyana variegata (Philodendron cobra) | raritné rastliny | 9,90 € | [detail](https://www.izbovecky.sk/produkt/6671) |
| Epipremnum aureum neon | izbové rastliny | 3,50 € | [detail](https://www.izbovecky.sk/produkt/epipremnum-aureum-neon) |
| Maranta light veins | raritné rastliny | 9,90 € | [detail](https://www.izbovecky.sk/produkt/maranta-light-veins) |
| Anthurium crystallinum | izbové rastliny | 8,90 € | [detail](https://www.izbovecky.sk/produkt/anthurium-crystallinum) |
| Hoya mathilde splash | izbové rastliny | 12,90 € | [detail](https://www.izbovecky.sk/produkt/hoya-matchilde-splash) |
| Codiaeum variegatum magnificent | izbové rastliny | 9,90 € | [detail](https://www.izbovecky.sk/produkt/kroton) |
| Begónia leaf midnight sun | raritné rastliny | 45,00 € | [detail](https://www.izbovecky.sk/produkt/begonia-leaf-midnight-sun) |
| Alocasia polly aurea | raritné rastliny | 44,90 € | [detail](https://www.izbovecky.sk/produkt/alocasia-polly-aurea) |
| Citrus limon eureka variegata | raritné rastliny | 10,90 € | [detail](https://www.izbovecky.sk/produkt/citrus-limon-eureka-variegata) |
| Alocasia longiloba suhirmaniana purple vein | raritné rastliny | 5,00 € | [detail](https://www.izbovecky.sk/produkt/alocasia-longiloba-suhirmaniana-purple-vein) |
| Syngonium pink splash | raritné rastliny | 5,50 € | [detail](https://www.izbovecky.sk/produkt/syngonium-pink-splash) |
| Hoya compacta variegata | raritné rastliny | 15,90 € | [detail](https://www.izbovecky.sk/produkt/hoya-compacta-variegata) |
| Epipremnum aureum/ Divý Jano | izbové rastliny | 1,50 € | [detail](https://www.izbovecky.sk/produkt/epipremnum-aureum-divy-jano) |
| Epipremnum silver stripe | raritné rastliny | 11,90 € | [detail](https://www.izbovecky.sk/produkt/epipremnum-silver-stripe) |
| Philodendron summer glory | raritné rastliny | 12,90 € | [detail](https://www.izbovecky.sk/produkt/philodendron-summer-glory) |
| Rhaphidophora tetrasperma | izbové rastliny | 8,90 € | [detail](https://www.izbovecky.sk/produkt/rhaphidophora-tetrasperma-2) |
| Monstera adansonii variegata | raritné rastliny | 5,00 € | [detail](https://www.izbovecky.sk/produkt/monstera-adansonii-variegata-2) |
| Spathiphyllum sensation variegata | raritné rastliny | 19,90 € | [detail](https://www.izbovecky.sk/produkt/spathiphyllum-sensation-variegata) |
| Rhaphidophora tetrasperma variegata | raritné rastliny | 19,90 € | [detail](https://www.izbovecky.sk/produkt/rhaphidophora-tetrasperma-variegata) |
| Begonia pink spot | raritné rastliny | 8,90 € | [detail](https://www.izbovecky.sk/produkt/begonia-pink-spot) |
| Gymnocalycium variegata | raritné rastliny | 9,90 € | [detail](https://www.izbovecky.sk/produkt/gymnocalycium-variegata) |
| Pteris albolienata | izbové rastliny | 5,00 € | [detail](https://www.izbovecky.sk/produkt/pteris-albolienata) |
| Aeschynanthus bolero bicolore | raritné rastliny | 24,90 € | [detail](https://www.izbovecky.sk/produkt/aeschynanthus-bolero-bicolore) |
| Monstera obliqua peru | raritné rastliny | 9,90 € | [detail](https://www.izbovecky.sk/produkt/monstera-obliqua-peru) |
| Tillandsia andreana | izbové rastliny | 3,90 € | [detail](https://www.izbovecky.sk/produkt/tillandsia) |

## BREST

- Kontrola cien a skladu: **10.10.2026**, priamo z vlastného [e-shopu](https://www.brest.sk/). [Identita predajcu](https://www.brest.sk/OBCHODNE-PODMIENKY-a3_0.htm).
- Firma: **STROMČEKY s. r. o., IČO 46243313**. Vlastníci: Zoltán Lovász. Konatelia / podnikateľ: Zoltán Lovász.
- Veľkosť: **487 128 € tržby 2025; 5–9 zam.**. Kód `05` v [primárnom registri](https://www.registeruz.sk/cruz-public/api/uctovna-jednotka?id=1100190); údaj aktualizovaný 2026-07-03, načítaný 2026-10-10. [Vlastníci](https://www.orsr.sk/vypis.asp?ID=210806&SID=9&P=0).
- [Finančný výkaz](https://www.registeruz.sk/cruz-public/domain/financialreport/show/9891443/687): Čistý obrat: 487 038 € z predaja tovaru + 90 € z predaja výrobkov a služieb. Celofiremné tržby, nie iba e-shop.
- RPO pri kontrole neodpovedalo; vlastníci overení z uvedeného primárneho zdroja, veľkosť a financie z RÚZ.
- Prečo sedí: Rodinný rastlinný e-shop jedného vlastníka, 5–9 zamestnancov a overené tržby pod pol miliónom eur; množstvo podobných odrôd na rôzne miesta v záhrade. Vlastníkov a konateľov sme porovnali s už zdokumentovanými ukážkami; bez zisteného opakovania.
- Ponuka: **50 produktov**, trvalky a skalničky, okrasné dreviny, ovocné dreviny. Kurátorovaný výber viacerých druhov a cenových hladín, nie tvrdenie o celom e-shope. Doplnky sú zahrnuté pri zmysluplnom počte položiek; služby, poukazy, predobjednávky, prázdne kompozície a varianty bez doloženej ceny alebo skladu sa vyradili.
- Ceny a sklad: Oficiálne Product/Offer JSON-LD na detaile: InStock, cena a mena konkrétneho produktu. Nepoužíva sa cena bez DPH z data-price výpisu. Dátum je snímkou; ukážka nevykonáva živú synchronizáciu.
- Tagy a dôvody: iba popis, parametre a kategórie predajcu. Bez doloženého svetla alebo starostlivosti sa použije botanická skupina alebo cenová preferencia. Pet safety sa neodvodzuje z názvu rodu. Snímka údajov a URL ku každej fotografii: `research/2026-10-10/brest-products.json`.
- Fotografie: oficiálne priradené produktové zábery; okraje, veľkosť a koláže cez `tools/assets.py` a `tools/make_assets.py` (PIL). Logo: [oficiálny súbor](https://www.brest.sk/fotky3971/design_setup/template/v4.0/geneva/prod/1767682304brest_logoG.gif?0_137830193); Originálny nápis BREST.sk vyrezaný zo spodnej časti oficiálneho loga a zväčšený s Lanczos vyhladením. Do kruhu použitá pôvodná jasne zelená silueta stromu; prevedená na bielu pre kontrast. Oficiálne odrodové zábery z detailov e-shopu zobrazujú vzhľad rastliny; nejde o fotografiu presnej dodávanej sadenice. Veľkosť dodávky treba čítať v detaile produktu.
- Farby: `brand: #315229`, `accent: #46703a`, `soft: #f1f3e9`, `paper: #fffefa`, `ink: #293024`, `line: #dce1d1`. Zelená z oficiálneho loga a rastlinného webu; tmavšie odtiene brand a accent pre biely text. Biela na brand a accent ≥ 4,5 : 1, kontrolované QA.
- QA: PASS na desktope 1440 px a mobiloch 390/360 px; owner, chat, kroky a výsledky prezreté. `qa-review/brest-qa.json`, `brest-ui.jpg`, produktové hárky a `qa-review/matrix.json`. Zdrojový doklad firmy: `research/2026-10-10/brest-registry.json`.

| Produkt / variant | Kategória | Cena | Produkt skladom pri kontrole |
|---|---|---:|---|
| Convallaria majalis | Trvalky a skalničky | 1,99 € | [detail](https://www.brest.sk/Convallaria-majalis-d96.htm) |
| Lonicera nitida 'Maigrün' | Okrasné dreviny | 1,99 € | [detail](https://www.brest.sk/LONICERA-nitida-Maigrun-d433.htm) |
| Ficus carica 'Brown Turkey' krík | Ovocné dreviny | 9,90 € | [detail](https://www.brest.sk/ficus-carica-brown-turkey-krik) |
| Hemerocallis 'Autumn Red' | Trvalky a skalničky | 2,85 € | [detail](https://www.brest.sk/hemerocallis-autumn-red) |
| Hydrangea quercifolia 'Alice' | Trvalky a skalničky | 8,99 € | [detail](https://www.brest.sk/hydrangea-quercifolia-alice) |
| Lobelia fulgens, red | Trvalky a skalničky | 2,79 € | [detail](https://www.brest.sk/Lobelia-fulgens-red-d1440.htm) |
| Sanguisorba minor | Trvalky a skalničky | 2,82 € | [detail](https://www.brest.sk/sanguisorba-minor) |
| Campanula glomerata  'Dahurica' superba odessa | Trvalky a skalničky | 2,87 € | [detail](https://www.brest.sk/Campanula-glomerata-Dahurica-superba-odessa-d1420.htm) |
| Helichrysum italicum | Trvalky a skalničky | 2,89 € | [detail](https://www.brest.sk/helichrysum-italicum) |
| Armeria maritima splendens | Trvalky a skalničky | 2,90 € | [detail](https://www.brest.sk/Armeria-maritima-splendens-d75.htm) |
| Verbena bonariensis 'Lollipop' | Trvalky a skalničky | 2,93 € | [detail](https://www.brest.sk/Verbena-bonariensis-Lollipop-d593.htm) |
| Lobelia pedunculata ‘County Park’ | Trvalky a skalničky | 2,95 € | [detail](https://www.brest.sk/lobelia-pedunculata-county-park) |
| Veronica spicata 'Nana Blauteppich' | Trvalky a skalničky | 2,95 € | [detail](https://www.brest.sk/veronica-spicata-nana-blauteppich) |
| Hypericum polyphyllum | Trvalky a skalničky | 2,99 € | [detail](https://www.brest.sk/Hypericum-polyphyllum-d1136.htm) |
| Verbena bonariensis | Trvalky a skalničky | 2,99 € | [detail](https://www.brest.sk/verbena-bonariensis) |
| Convallaria majalis Rosea | Trvalky a skalničky | 3,20 € | [detail](https://www.brest.sk/convallaria-majalis-rosea-d368.htm) |
| Polystichum setiferum 'Herrenhausen' | Trvalky a skalničky | 3,45 € | [detail](https://www.brest.sk/polystichum-setiferum-herrenhausen) |
| Sedum telephium 'Yellow Delicat' | Trvalky a skalničky | 3,59 € | [detail](https://www.brest.sk/sedum-telephium-yellow-delicat) |
| Liriope muscari 'Big Blue' | Trvalky a skalničky | 3,94 € | [detail](https://www.brest.sk/Liriope-muscari-big-blue-d39.htm) |
| Lupinus polyphyllus 'Yellow Shades' | Trvalky a skalničky | 3,99 € | [detail](https://www.brest.sk/lupinus-polyphyllus-yellow-shades) |
| Asplenium scolopendrium ‘Angustifolia’ | Trvalky a skalničky | 4,35 € | [detail](https://www.brest.sk/asplenium-scolopendrium-angustifolia) |
| Matteuccia pensylvanica | Trvalky a skalničky | 4,50 € | [detail](https://www.brest.sk/matteuccia-pensylvanica) |
| Phyllitis scolopendrium | Trvalky a skalničky | 4,90 € | [detail](https://www.brest.sk/Phyllitis-scolopendrium-d15.htm) |
| Hosta sieboldiana 'Elegans' | Trvalky a skalničky | 5,53 € | [detail](https://www.brest.sk/Hosta-sieboldiana-Elegans-d1002.htm) |
| Osmunda regalis 2 lit. | Trvalky a skalničky | 5,90 € | [detail](https://www.brest.sk/osmunda-regalis-2-lit) |
| Persicaria chinensis  ‘Indian Summer’ | Trvalky a skalničky | 6,45 € | [detail](https://www.brest.sk/persicaria-chinensis-indian-summer) |
| Hibiscus moscheutos 'Perfect Storm' | Trvalky a skalničky | 9,90 € | [detail](https://www.brest.sk/hibiscus-moscheutos-perfect-storm) |
| Phormium tenax 'aureovariegata | Trvalky a skalničky | 14,70 € | [detail](https://www.brest.sk/phormium-tenax-atropurpureum) |
| Záhon do tieňa bez údržby "Pokojný Tieň" | Trvalky a skalničky | 79,00 € | [detail](https://www.brest.sk/mix-trvaliek-pokojny-tien-pre-miesta-bez-priameho-upeku) |
| Ilex crenata 'Fastigiata' | Okrasné dreviny | 3,20 € | [detail](https://www.brest.sk/ilex-crenata-fastigiata) |
| Buxus Sempervirens | Okrasné dreviny | 3,95 € | [detail](https://www.brest.sk/Buxus-Sempervirens-Extra-d1129.htm) |
| Ceanothus thyrsiflorus var. repens | Okrasné dreviny | 4,85 € | [detail](https://www.brest.sk/ceanothus-thyrsiflorus-var-repens) |
| Tamarix | Okrasné dreviny | 6,50 € | [detail](https://www.brest.sk/Tamarix-d470.htm) |
| Euonymus alatus 'Compactus' | Okrasné dreviny | 8,90 € | [detail](https://www.brest.sk/Euonymus-alatus-Compactus-d683.htm) |
| Hydrangea macrophylla Saxon® 'Schloss Wackerbarth' | Okrasné dreviny | 9,99 € | [detail](https://www.brest.sk/hydrangea-macrophylla-saxon-schloss-wackerbarth) |
| Nandina domestica 'Gulf Stream' | Okrasné dreviny | 14,90 € | [detail](https://www.brest.sk/Nandina-domestica-Gulf-Stream-d1520.htm) |
| Trachelospermum jasminoides 'Variegatum' | Okrasné dreviny | 19,90 € | [detail](https://www.brest.sk/rhyncospermum-jasmine-variegata) |
| Wisteria floribunda 'Vignoli's White' | Okrasné dreviny | 33,50 € | [detail](https://www.brest.sk/wisteria-kvitnuca) |
| Aronia melanocarpa 'Hugin' 120 cm kmeň | Okrasné dreviny | 54,00 € | [detail](https://www.brest.sk/aronia-melanocarpa-hugin-120-cm-kmen) |
| Liquidambar styraciflua 'Gum Ball'  kmeň 140cm | Okrasné dreviny | 119,00 € | [detail](https://www.brest.sk/liquidambar-styraciflua-gum-ball-kmen-140cm3) |
| Carya ovata | Ovocné dreviny | 21,00 € | [detail](https://www.brest.sk/Carya-ovata-d897.htm) |
| Morus rubra 'Illinois Everbearing' | Ovocné dreviny | 23,90 € | [detail](https://www.brest.sk/morus-rubra-illinois-everbearing) |
| Hruška červená vilmoska | Ovocné dreviny | 27,90 € | [detail](https://www.brest.sk/Hruska-cervena-vilmoska-d376.htm) |
| Ficus carica 'Brown Turkey' (Brogiotto nero) 100-120cm | Ovocné dreviny | 28,90 € | [detail](https://www.brest.sk/Ficus-carica-Brown-Turkey-d708.htm) |
| Jabloň 'Golden Delicious' | Ovocné dreviny | 29,90 € | [detail](https://www.brest.sk/Jablon-Golden-Delicious-d1017.htm) |
| Pyrus pyrifolia ‘Kosui’ | Ovocné dreviny | 29,90 € | [detail](https://www.brest.sk/pyrus-pyrifolia-kosui) |
| Čerešňa 'Sunburst' | Ovocné dreviny | 29,90 € | [detail](https://www.brest.sk/ceresna-sunburst) |
| Marhuľa 'Sungiant' | Ovocné dreviny | 32,50 € | [detail](https://www.brest.sk/marhula-sungiant) |
| Ziziphus jujuba ‘Gheri’s Géant’ 2 ročná | Ovocné dreviny | 39,90 € | [detail](https://www.brest.sk/ziziphus-jujuba-gheri-s-geant-2-rocna) |
| Ficus carica 'Brown Turkey'  Strom (Brogiotto nero) | Ovocné dreviny | 49,00 € | [detail](https://www.brest.sk/Ficus-carica-Brown-Turkey-Strom-d1140.htm) |

## Kokedamy.cz

Svetlo a nenáročnosť všetkých 18 kokedám boli osobitne prezreté v odrážkach `short_description` predajcu. Negatívne upozornenia na priame slnko sa nepočítajú ako tolerancia slnka. Dáta majú `careReview`; dátovaný postup je v `tools/curate_kokedamy.py`. Šesť sukulentných kokedám je takto pomenovaných priamo v popise predajcu, nie odvodených iba z rodu rastliny.

- Kontrola cien a skladu: **10.10.2026**, priamo z vlastného [e-shopu](https://www.kokedamy.cz/). [Identita predajcu](https://www.kokedamy.cz/obchodni-podminky/).
- Firma: **NAVONA Gardens, s.r.o., IČO 05753147**. Vlastníci: Ing. Petra Smetana, Ondřej Smetana. Konatelia / podnikateľ: Ing. Petra Smetana, Ondřej Smetana.
- Veľkosť: **Tržby nedoložené; 6–9 zam.**. Kód `120` v [primárnom registri](https://ares.gov.cz/ekonomicke-subjekty-v-be/rest/ekonomicke-subjekty-res/05753147); údaj aktualizovaný 2024-11-03, načítaný 2026-10-10. [Vlastníci](https://ares.gov.cz/ekonomicke-subjekty-v-be/rest/ekonomicke-subjekty-vr/05753147).
- Tržby nie sú doložené použitým verejným registrom; veľkosť overená podľa ARES.
- Prečo sedí: Špecializovaný obchod dvoch vlastníkov, 6–9 zamestnancov podľa ARES; 18 skladových kokedám rôznych rastlín a cien, pri ktorých pomôže výber podľa svetla a starostlivosti. Vlastníkov a konateľov sme porovnali s už zdokumentovanými ukážkami; bez zisteného opakovania.
- Ponuka: **18 produktov**, listové kokedamy, sukulentné kokedamy. Kurátorovaný výber viacerých druhov a cenových hladín, nie tvrdenie o celom e-shope. Doplnky sú zahrnuté pri zmysluplnom počte položiek; služby, poukazy, predobjednávky, prázdne kompozície a varianty bez doloženej ceny alebo skladu sa vyradili.
- Ceny a sklad: WooCommerce Store API: `is_in_stock` a `is_purchasable` sú true, `is_on_backorder` je false, `stock_availability.class` je in-stock; pevná cena a mena, bez variantov a cenového rozsahu. Dátum je snímkou; ukážka nevykonáva živú synchronizáciu.
- Tagy a dôvody: iba popis, parametre a kategórie predajcu. Bez doloženého svetla alebo starostlivosti sa použije botanická skupina alebo cenová preferencia. Pet safety sa neodvodzuje z názvu rodu. Snímka údajov a URL ku každej fotografii: `research/2026-10-10/kokedamy-products.json`.
- Fotografie: oficiálne priradené produktové zábery; okraje, veľkosť a koláže cez `tools/assets.py` a `tools/make_assets.py` (PIL). Logo: [oficiálny súbor](https://www.kokedamy.cz/wp-content/uploads/2019/03/logo_Kokedamy.cz_.png); Oficiálne logo zväčšené s Lanczos vyhladením; pôvodné tvary znakov prefarbené na tmavú machovú zelenú kvôli čitateľnosti. Symbol rastliny a machovej gule je vyrezaný z pôvodného písmena o, neutrálne okraje susedných znakov sa odfiltrovali a pôvodný symbol sa prefarbil na bielu pre viditeľnosť na brand kruhu.
- Farby: `brand: #374f2d`, `accent: #4b683a`, `soft: #f2f3e9`, `paper: #fffefa`, `ink: #293025`, `line: #dce1d2`. Machová zelená z pôvodného loga; tmavšie odtiene brand a accent pre kontrast s bielym textom. Biela na brand a accent ≥ 4,5 : 1, kontrolované QA.
- QA: PASS na desktope 1440 px a mobiloch 390/360 px; owner, chat, kroky a výsledky prezreté. `qa-review/kokedamy-qa.json`, `kokedamy-ui.jpg`, produktové hárky a `qa-review/matrix.json`. Zdrojový doklad firmy: `research/2026-10-10/kokedamy-registry.json`.

| Produkt / variant | Kategória | Cena | Produkt skladom pri kontrole |
|---|---|---:|---|
| Kokedama Maranta Fascinator | Listové kokedamy | 659 Kč | [detail](https://www.kokedamy.cz/produkt/kokedama-maranta-fascinator/) |
| Kokedama Asplenium nidus | Listové kokedamy | 629 Kč | [detail](https://www.kokedamy.cz/produkt/kokedama-asplenium-nidus/) |
| Kokedama Nolina recurvata | Listové kokedamy | 549 Kč | [detail](https://www.kokedamy.cz/produkt/kokedama-nolina-recurvata/) |
| Kokedama Dracaena marginata | Listové kokedamy | 509 Kč | [detail](https://www.kokedamy.cz/produkt/kokedama-dracaena-marginata/) |
| Kokedama Sansevieria Fernwood | Sukulentné kokedamy | 758 Kč | [detail](https://www.kokedamy.cz/produkt/kokedama-sansevieria-fernwood/) |
| Kokedama Hoya | Sukulentné kokedamy | 639 Kč | [detail](https://www.kokedamy.cz/produkt/kokedama-hoya/) |
| Kokedama Asplenium antiquum | Listové kokedamy | 629 Kč | [detail](https://www.kokedamy.cz/produkt/kokedama-asplenium-antiquum/) |
| Kokedama Crassula ovata | Sukulentné kokedamy | 619 Kč | [detail](https://www.kokedamy.cz/produkt/kokedama-crassula-ovata/) |
| Kokedama Sansevieria kirkii Friends | Sukulentné kokedamy | 759 Kč | [detail](https://www.kokedamy.cz/produkt/kokedama-sansevieria-kirkii-friends/) |
| Kokedama Davallia tyermanii | Listové kokedamy | 739 Kč | [detail](https://www.kokedamy.cz/produkt/kokedama-davallia-tyermanii/) |
| Kokedama Sansevieria bacularis Mikado | Sukulentné kokedamy | 729 Kč | [detail](https://www.kokedamy.cz/produkt/kokedama-sansevieria-bacularis-mikado/) |
| Kokedama Platycerium | Listové kokedamy | 709 Kč | [detail](https://www.kokedamy.cz/produkt/kokedama-platycerium/) |
| Kokedama Chamaedorea elegans | Listové kokedamy | 489 Kč | [detail](https://www.kokedamy.cz/produkt/kokedama-chamaedorea-elegans/) |
| Kokedama Mini Asparagus setaceus | Listové kokedamy | 359 Kč | [detail](https://www.kokedamy.cz/produkt/kokedama-mini-asparagus-setaceus/) |
| Kokedama Asparagus setaceus | Listové kokedamy | 599 Kč | [detail](https://www.kokedamy.cz/produkt/kokedama-asparagus-setaceus/) |
| Kokedama Ficus microcarpa Ginseng | Listové kokedamy | 749 Kč | [detail](https://www.kokedamy.cz/produkt/kokedama-ficus-microcarpa-ginseng/) |
| Kokedama Asparagus falcatus | Listové kokedamy | 599 Kč | [detail](https://www.kokedamy.cz/produkt/kokedama-asparagus-falcatus/) |
| Kokedama Haworthia | Sukulentné kokedamy | 509 Kč | [detail](https://www.kokedamy.cz/produkt/kokedama-haworthia/) |

## Rastlinkovo

- Kontrola cien a skladu: **10.10.2026**, priamo z vlastného [e-shopu](https://www.rastlinkovo.sk/). [Identita predajcu](https://www.rastlinkovo.sk/obchodne-podmienky/).
- Firma: **Maxspan s.r.o., IČO 51649764**. Vlastníci: Mgr. Matej Prokypčák. Konatelia / podnikateľ: Lenka Čeplová, Mgr. Matej Prokypčák.
- Veľkosť: **119 447 € tržby 2025; 1 zam.**. Kód `02` v [primárnom registri](https://www.registeruz.sk/cruz-public/api/uctovna-jednotka?id=1772733); údaj aktualizovaný 2026-07-03, načítaný 2026-10-10. [Vlastníci](https://api.statistics.sk/rpo/v1/entity/9571971).
- [Finančný výkaz](https://www.registeruz.sk/cruz-public/domain/financialreport/show/10167583/687): Výkaz MÚJ: tržby z predaja tovaru 112 209 € + vlastných výrobkov a služieb 7 238 € = 119 447 €. Prvý riadok 121 111 € zahŕňa aj ostatné výnosy, nie je použitý ako tržby. Sumy sú celofiremné.
- Predajca Maxspan s.r.o. podľa aktuálnych VOP; v rokoch 2021–2023 sa firma volala Rastlinkovo s.r.o. IČO je rovnaké. RPO záznam aktualizovaný 7.7.2025, načítaný 10.10.2026; ORSR pri kontrole neodpovedal.
- Prečo sedí: Samostatný vlastník, 1 zamestnanec a 119 447 € doložených tržieb za 2025; rastlinný výber je dostatočne pestrý aj bez nesúvisiacich produktov rozšíreného e-shopu. Vlastníkov a konateľov sme porovnali s už zdokumentovanými ukážkami; bez zisteného opakovania.
- Ponuka: **61 produktov**, izbové rastliny, sukulenty a kaktusy, črepníky, substráty. Kurátorovaný výber viacerých druhov a cenových hladín, nie tvrdenie o celom e-shope. Doplnky sú zahrnuté pri zmysluplnom počte položiek; služby, poukazy, predobjednávky, prázdne kompozície a varianty bez doloženej ceny alebo skladu sa vyradili.
- Ceny a sklad: WooCommerce Store API: `is_in_stock` a `is_purchasable` sú true, `is_on_backorder` je false, `stock_availability.class` je in-stock; pevná cena a mena, bez variantov a cenového rozsahu. Ceny Oxalis (6,73 €) a Dracaena Janet Craig XXL (97,46 €) boli navyše porovnané s koncovou cenou na detaile; zhodné. Dátum je snímkou; ukážka nevykonáva živú synchronizáciu.
- Tagy a dôvody: iba popis, parametre a kategórie predajcu. Bez doloženého svetla alebo starostlivosti sa použije botanická skupina alebo cenová preferencia. Pet safety sa neodvodzuje z názvu rodu. Snímka údajov a URL ku každej fotografii: `research/2026-10-10/rastlinkovo-products.json`.
- Fotografie: oficiálne priradené produktové zábery; okraje, veľkosť a koláže cez `tools/assets.py` a `tools/make_assets.py` (PIL). Logo: [oficiálny súbor](https://www.rastlinkovo.sk/wp-content/uploads/2025/10/rastlinkovo-logo-mobil.webp); Oficiálne logo zväčšené s Lanczos vyhladením. Pôvodný list je vyrezaný z loga, tmavé pozadie sa odfiltrovalo a obrys sa jemne zosilnil o jeden zdrojový pixel a prefarbil na bielu kvôli čitateľnosti v brand kruhu. Hlavička chatu zobrazuje celé originálne logo na bielej podložke.
- Farby: `brand: #393954`, `accent: #565481`, `soft: #f1f0f6`, `paper: #fffefa`, `ink: #292a35`, `line: #dddae8`. Tmavá fialová z oficiálneho loga; sýtejší accent pre kontrast bieleho textu, svetlé fialové neutrálne plochy. Biela na brand a accent ≥ 4,5 : 1, kontrolované QA.
- QA: PASS na desktope 1440 px a mobiloch 390/360 px; owner, chat, kroky a výsledky prezreté. `qa-review/rastlinkovo-qa.json`, `rastlinkovo-ui.jpg`, produktové hárky a `qa-review/matrix.json`. Zdrojový doklad firmy: `research/2026-10-10/rastlinkovo-registry.json`.

| Produkt / variant | Kategória | Cena | Produkt skladom pri kontrole |
|---|---|---:|---|
| Dieffenbachia mac Amy baby | izbové rastliny | 8,68 € | [detail](https://www.rastlinkovo.sk/dieffenbachia-mac-amy-baby/) |
| Hypoestes phyllostachya červený baby | izbové rastliny | 8,68 € | [detail](https://www.rastlinkovo.sk/hypoestes-phyllostachya-cerveny-baby/) |
| Prosperplast plastový kvetináč Tubo P light grey Ø 18 cm | črepníky | 8,68 € | [detail](https://www.rastlinkovo.sk/prosperplast-plastovy-kvetinac-tubo-p-light-grey-18-cm/) |
| Crassula Buddhas temple baby | sukulenty a kaktusy | 9,66 € | [detail](https://www.rastlinkovo.sk/crassula-buddhas-temple-baby/) |
| Hoya Kerrii Variegata baby | izbové rastliny | 6,73 € | [detail](https://www.rastlinkovo.sk/hoya-kerrii-variegata-baby/) |
| Dracaena marginata baby | izbové rastliny | 7,71 € | [detail](https://www.rastlinkovo.sk/dracaena-marginata-baby/) |
| Philodendron Scandens Brasil baby | izbové rastliny | 7,71 € | [detail](https://www.rastlinkovo.sk/philodendron-scandens-brasil-baby/) |
| Pilea Peperomioides baby | izbové rastliny | 8,68 € | [detail](https://www.rastlinkovo.sk/pilea-peperomioides-baby/) |
| Aglaonema Red Zirkon baby | izbové rastliny | 9,66 € | [detail](https://www.rastlinkovo.sk/aglaonema-red-zirkon-baby/) |
| Calathea Freddie Red baby | izbové rastliny | 9,66 € | [detail](https://www.rastlinkovo.sk/calathea-freddie-red-baby/) |
| Epipremnum Pothos Aureum zlatý | izbové rastliny | 9,66 € | [detail](https://www.rastlinkovo.sk/epipremnum-pothos-aureum-zlaty/) |
| Philodendron Pink bikini baby | izbové rastliny | 9,66 € | [detail](https://www.rastlinkovo.sk/philodendron-pink-bikini-baby/) |
| Syngonium Pixie baby | izbové rastliny | 9,66 € | [detail](https://www.rastlinkovo.sk/syngonium-pixie-baby/) |
| Philodendron Scandens baby | izbové rastliny | 10,63 € | [detail](https://www.rastlinkovo.sk/philodendron-scandens-baby/) |
| Rhapidophora Tetrasperma | izbové rastliny | 11,61 € | [detail](https://www.rastlinkovo.sk/rhapidophora-tetrasperma/) |
| Epipremnum Pothos neon | izbové rastliny | 12,59 € | [detail](https://www.rastlinkovo.sk/epipremnum-pothos-neon/) |
| Philodendron Gloriosum baby | izbové rastliny | 12,59 € | [detail](https://www.rastlinkovo.sk/philodendron-gloriosum-baby/) |
| Syngonium Mottled Mojito baby | izbové rastliny | 13,56 € | [detail](https://www.rastlinkovo.sk/syngonium-mottled-mojito-baby/) |
| Epipremnum Pothos Global Green | izbové rastliny | 14,54 € | [detail](https://www.rastlinkovo.sk/epipremnum-pothos-global-green/) |
| Hoya Mathilde splash | izbové rastliny | 14,54 € | [detail](https://www.rastlinkovo.sk/hoya-mathilde-splash/) |
| Philodendron Pink Princess marble | izbové rastliny | 14,54 € | [detail](https://www.rastlinkovo.sk/philodendron-pink-princess-marble/) |
| Alocasia Scalprum baby | izbové rastliny | 15,51 € | [detail](https://www.rastlinkovo.sk/alocasia-scalprum-baby/) |
| Caladium Pearl Blush | izbové rastliny | 15,51 € | [detail](https://www.rastlinkovo.sk/caladium-pearl-blush/) |
| Sansevieria Svokrine jazyky Trifasciata Futura Superba | izbové rastliny | 15,51 € | [detail](https://www.rastlinkovo.sk/sansevieria-svokrine-jazyky-trifasciata-futura-superba/) |
| Scindapsus Treubii Moonlight | izbové rastliny | 15,51 € | [detail](https://www.rastlinkovo.sk/scindapsus-treubii-moonlight/) |
| Orchidea phalaenopsis multiflora fialová | izbové rastliny | 16,49 € | [detail](https://www.rastlinkovo.sk/orchidea-phalaenopsis-multiflora-fialova-hviezda/) |
| Monstera Deliciosa veľká | izbové rastliny | 17,46 € | [detail](https://www.rastlinkovo.sk/monstera-deliciosa/) |
| Alocasia Stingray | izbové rastliny | 18,44 € | [detail](https://www.rastlinkovo.sk/alocasia-stingray/) |
| Strelitzia kráľovská Reginae | izbové rastliny | 18,44 € | [detail](https://www.rastlinkovo.sk/strelitzia-kralovska-reginae/) |
| Aglaonema Lemon Mint | izbové rastliny | 22,34 € | [detail](https://www.rastlinkovo.sk/aglaonema-lemon-mint/) |
| Alocasia Jacklyn | izbové rastliny | 27,22 € | [detail](https://www.rastlinkovo.sk/alocasia-jacklyn/) |
| Aglaonema Rose Parakeet | izbové rastliny | 29,17 € | [detail](https://www.rastlinkovo.sk/aglaonema-rose-parakeet/) |
| Dracaena Janet Craig XXL | izbové rastliny | 97,46 € | [detail](https://www.rastlinkovo.sk/dracaena-janet-craig-xxl/) |
| Haworthia Big Band baby | sukulenty a kaktusy | 4,78 € | [detail](https://www.rastlinkovo.sk/haworthia-big-band-baby/) |
| Kalanchoe Tomentosa baby | sukulenty a kaktusy | 6,73 € | [detail](https://www.rastlinkovo.sk/kalanchoe-tomentosa-baby/) |
| Kalanchoe Zebra baby | sukulenty a kaktusy | 6,73 € | [detail](https://www.rastlinkovo.sk/kalanchoe-zebra-baby/) |
| Kalanchoe Grandiva biele baby | sukulenty a kaktusy | 7,71 € | [detail](https://www.rastlinkovo.sk/kalanchoe-grandiva-biele-baby/) |
| Kalanchoe Grandiva ružové baby | sukulenty a kaktusy | 7,71 € | [detail](https://www.rastlinkovo.sk/kalanchoe-grandiva-ruzove-baby/) |
| Kalanchoe Grandiva žlté baby | sukulenty a kaktusy | 7,71 € | [detail](https://www.rastlinkovo.sk/kalanchoe-grandiva-zlte-baby/) |
| Lithops hallii živé kamene baby | sukulenty a kaktusy | 7,71 € | [detail](https://www.rastlinkovo.sk/lithops-hallii-zive-kamene-baby/) |
| Sedum Rubrotinctum Aurora baby | sukulenty a kaktusy | 9,66 € | [detail](https://www.rastlinkovo.sk/sedum-rubrotinctum-aurora-baby/) |
| Senecio starček Rowleyanus baby | sukulenty a kaktusy | 9,66 € | [detail](https://www.rastlinkovo.sk/senecio-starcek-rowleyanus-baby/) |
| Prosperplast plastový kvetináč Cube Beton effect sivý Ø 9 cm | črepníky | 2,83 € | [detail](https://www.rastlinkovo.sk/prosperplast-plastovy-kvetinac-cube-beton-effect-sivy-9-cm/) |
| Prosperplast plastový kvetináč Milly round copper Ø 12 cm | črepníky | 3,80 € | [detail](https://www.rastlinkovo.sk/prosperplast-plastovy-kvetinac-milly-round-copper-12-cm/) |
| Prosperplast plastový kvetináč Milly round copper Ø 14 cm | črepníky | 4,78 € | [detail](https://www.rastlinkovo.sk/prosperplast-plastovy-kvetinac-milly-round-copper-14-cm/) |
| Prosperplast plastový kvetináč Milly round copper Ø 17 cm | črepníky | 5,76 € | [detail](https://www.rastlinkovo.sk/prosperplast-plastovy-kvetinac-milly-round-copper-17-cm/) |
| Kvetináč Eno Duo dusty green Ø 7 cm | črepníky | 6,73 € | [detail](https://www.rastlinkovo.sk/kvetinac-eno-duo-dusty-green-7-cm/) |
| Kvetináč Eno Matt olive Ø 7 cm | črepníky | 6,73 € | [detail](https://www.rastlinkovo.sk/kvetinac-eno-matt-olive-7-cm/) |
| Kvetináč Vintage keramický béžový Ø 6 cm | črepníky | 6,73 € | [detail](https://www.rastlinkovo.sk/kvetinac-vintage-keramicky-bezovy-o-6-cm/) |
| Prosperplast plastový kvetináč Milly round pine green Ø 19 cm | črepníky | 6,73 € | [detail](https://www.rastlinkovo.sk/prosperplast-plastovy-kvetinac-milly-round-pine-green-o-19-cm/) |
| Kvetináč Eno Matt dusty petrol Ø 10 cm | črepníky | 7,71 € | [detail](https://www.rastlinkovo.sk/kvetinac-eno-matt-dusty-petrol-10-cm/) |
| Kvetináč DOG Ø 9 cm | črepníky | 9,66 € | [detail](https://www.rastlinkovo.sk/kvetinac-dog-o-9-cm/) |
| Plastia samozavlažovací kvetináč Tolita ružový Ø 15 cm | črepníky | 16,49 € | [detail](https://www.rastlinkovo.sk/plastia-samozavlazovaci-kvetinac-tolita-ruzovy-15-cm/) |
| Rosteto Keramzit 1 liter | substráty | 2,15 € | [detail](https://www.rastlinkovo.sk/rosteto-keramzit-1-liter/) |
| Rastlinkovo Keramzit 1 liter | substráty | 4,78 € | [detail](https://www.rastlinkovo.sk/rastlinkovo-keramzit-1-liter/) |
| Forestina Profík Substrát pre kaktusy a sukulenty 5 litrov | substráty | 5,76 € | [detail](https://www.rastlinkovo.sk/forestina-profik-substrat-pre-kaktusy-a-sukulenty-5-litrov/) |
| Rastlinkovo substrát Sukulenty a Kaktusy 1 liter | substráty | 6,73 € | [detail](https://www.rastlinkovo.sk/rastlinkovo-substrat-sukulenty-a-kaktusy-1-liter/) |
| Rastlinkovo Keramzit 3 litre | substráty | 8,68 € | [detail](https://www.rastlinkovo.sk/rastlinkovo-keramzit-3-litre/) |
| Rastlinkovo substrát Calathea & Maranta 3 litre | substráty | 10,63 € | [detail](https://www.rastlinkovo.sk/rastlinkovo-substrat-calathea-maranta-3-litre/) |
| PlantNest Kaktus a Sukulent substrát 3 litre | substráty | 12,59 € | [detail](https://www.rastlinkovo.sk/plantnest-kaktus-a-sukulent-substrat-3-litre/) |
| Forestina Profík Substrát pre izbové rastliny minerálny 15 litrov | substráty | 16,49 € | [detail](https://www.rastlinkovo.sk/forestina-profik-substrat-pre-izbove-rastliny-mineralny-15-litrov/) |
