# Rastliny — nový segment ukážok

Prémiové ukážky chatbota a výberu produktov pre malé SK/CZ e-shopy. Samostatný segment v repe `danielvendzur-code/skincare`, základ UX z `kozmetika-nove/` na main (`5a1dc9a`). Existujúce segmenty zostávajú samostatnými projektmi.

Lokálne: `npm install`, `npm run serve` (port 8797, statika aj skutočný API handler). Na obnovu assetov: `python3 -m pip install -r requirements.txt`. Chromium dodajte cez `CHROMIUM=/cesta/k/chromium`; QA nesťahuje prehliadač.

Overenie: `python3 tools/check_assets.py`, `npm test`, `node tools/qa.mjs <slug> qa-raw/<slug>`, `python3 tools/review.py <slug>`. Po zmene katalógu: `python3 tools/build.py <slug>`, `python3 tools/routes.py`, `python3 tools/stamp.py`. Ceny, sklad a zdroje sú v [ZDROJE.md](./ZDROJE.md); výber firiem a vyradení kandidáti v [VYBER.md](./VYBER.md); nasadenie v [NASADENIE.md](./NASADENIE.md).

Chat funguje bez API kľúča z overeného katalógu. Voliteľný `ANTHROPIC_API_KEY` a `CHAT_MODEL` zapnú výber produktových ID cez Anthropic Messages API. Model nevytvára ceny ani produktové fakty; tie zostavuje server. Provider bol overený mock testom, platené živé volanie sa nerobilo. Žiadne napojenie na košík ani ukladanie konverzácií nie je súčasťou tejto ukážky; popis ponuky na owner stránke uvádza možnosti dodávaného riešenia.

| E-shop | Ukážka | Produkty | Kategórie | Firma / IČO | Veľkosť | QA |
|---|---|---:|---|---|---|---|
| [Plantizia](https://plantizia.sk/) | [`plantizia`](./plantizia/index.html) | 112 | izbové rastliny, črepníky, substráty, teráriá | prírodno s. r. o. / 52542858 | 685 249 € tržby 2025; 5–9 zam. | PASS 1440 / 390 / 360 |
| [Garden Holice](https://www.gardenholice.sk/) | [`gardenholice`](./gardenholice/index.html) | 69 | izbové rastliny, záhrada, črepníky, substráty | Green-Oasis, spol. s r. o. / 46658793 | 119 662 € tržby 2025; 5–9 zam. | PASS 1440 / 390 / 360 |
| [Lukscheiter](https://www.lukscheiter.eu/) | [`lukscheiter`](./lukscheiter/index.html) | 78 | izbové rastliny, orchidey, tillandsie, sukulenty a kaktusy | Lukscheiter s.r.o. / 08714410 | Tržby nedoložené; 6–9 zam. | PASS 1440 / 390 / 360 |
| [Zahrada na niti](https://www.zahradananiti.cz/) | [`zahradananiti`](./zahradananiti/index.html) | 50 | kokedamy, tillandsie, rastlinné teráriá, substráty | koke no koke s.r.o. / 06096221 | Tržby nedoložené; 6–9 zam. | PASS 1440 / 390 / 360 |
| [KytkaSem](https://www.kytkasem.cz/) | [`kytkasem`](./kytkasem/index.html) | 61 | izbové rastliny, sukulenty a kaktusy, črepníky, substráty | Eva Balašová / 02204452 | Tržby nedoložené; 1–5 zam. | PASS 1440 / 390 / 360 |
| [Farmářky z paneláku](https://farmarkyzpanelaku.cz/) | [`farmarky`](./farmarky/index.html) | 50 | izbové rastliny, črepníky, substráty | Jolana Šádková / 09315543 | Tržby nedoložené; 1–5 zam. | PASS 1440 / 390 / 360 |
| [Plantotéka](https://www.plantoteka.sk/) | [`plantoteka`](./plantoteka/index.html) | 40 | izbové rastliny, črepníky, substráty | Ing. Nikola Faturík / 55004709 | Tržby nedoložené; 0 zam. | PASS 1440 / 390 / 360 |
| [PlantBros](https://www.plantbros.sk/) | [`plantbros`](./plantbros/index.html) | 58 | izbové rastliny, sukulenty a kaktusy, črepníky, substráty | Extravaganza Studio LV s.r.o. / 50932632 | 24 630 € tržby 2025; nezistené zam. | PASS 1440 / 390 / 360 |
| [Pokojovky ze severu](https://www.pokojovkyzeseveru.cz/) | [`sever`](./sever/index.html) | 17 | izbové rastliny, sukulenty a kaktusy, substráty | Iva Kolátorová / 68424582 | Tržby nedoložené; 1–5 zam. | PASS 1440 / 390 / 360 |
| [Izbovečky](https://www.izbovecky.sk/) | [`izbovecky`](./izbovecky/index.html) | 25 | izbové rastliny, raritné rastliny | Izbovečky s. r. o. / 57395497 | Tržby nedoložené; 1 zam. | PASS 1440 / 390 / 360 |
| [BREST](https://www.brest.sk/) | [`brest`](./brest/index.html) | 50 | trvalky a skalničky, okrasné dreviny, ovocné dreviny | STROMČEKY s. r. o. / 46243313 | 487 128 € tržby 2025; 5–9 zam. | PASS 1440 / 390 / 360 |
| [Kokedamy.cz](https://www.kokedamy.cz/) | [`kokedamy`](./kokedamy/index.html) | 18 | listové kokedamy, sukulentné kokedamy | NAVONA Gardens, s.r.o. / 05753147 | Tržby nedoložené; 6–9 zam. | PASS 1440 / 390 / 360 |
| [Rastlinkovo](https://www.rastlinkovo.sk/) | [`rastlinkovo`](./rastlinkovo/index.html) | 61 | izbové rastliny, sukulenty a kaktusy, črepníky, substráty | Maxspan s.r.o. / 51649764 | 119 447 € tržby 2025; 1 zam. | PASS 1440 / 390 / 360 |
| [Svokrine jazyky](https://svokrinejazyky.sk/) | [`svokrinejazyky`](./svokrinejazyky/index.html) | 59 | izbové rastliny, zberateľské rastliny, črepníky, substráty | Svokrine jazyky s. r. o. / 52096092 | 99 987 € tržby 2025; nezistené zam. | PASS 1440 / 390 / 360 |
