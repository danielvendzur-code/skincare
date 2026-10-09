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
