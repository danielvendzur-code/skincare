# Rastliny — nový segment ukážok

Prémiové ukážky chatbota a výberu produktov pre malé SK/CZ e-shopy. Samostatný segment v repe `danielvendzur-code/skincare`, základ UX z `kozmetika-nove/` na main (`5a1dc9a`). Existujúce segmenty zostávajú samostatnými projektmi.

Lokálne: `npm install`, `npm run serve` (port 8797, statika aj skutočný API handler). Na obnovu assetov: `python3 -m pip install -r requirements.txt`. Chromium dodajte cez `CHROMIUM=/cesta/k/chromium`; QA nesťahuje prehliadač.

Overenie: `python3 tools/check_assets.py`, `npm test`, `node tools/qa.mjs <slug> qa-raw/<slug>`, `python3 tools/review.py <slug>`. Po zmene katalógu: `python3 tools/build.py <slug>`, `python3 tools/routes.py`, `python3 tools/stamp.py`. Ceny, sklad a zdroje sú v [ZDROJE.md](./ZDROJE.md); nasadenie v [NASADENIE.md](./NASADENIE.md).

Chat funguje bez API kľúča z overeného katalógu. Voliteľný `ANTHROPIC_API_KEY` a `CHAT_MODEL` zapnú výber produktových ID cez Anthropic Messages API. Model nevytvára ceny ani produktové fakty; tie zostavuje server. Provider bol overený mock testom, platené živé volanie sa nerobilo. Žiadne napojenie na košík ani ukladanie konverzácií nie je súčasťou tejto ukážky; popis ponuky na owner stránke uvádza možnosti dodávaného riešenia.

| E-shop | Ukážka | Produkty | Kategórie | Firma / IČO | Veľkosť | QA |
|---|---|---:|---|---|---|---|
| [Plantizia](https://plantizia.sk/) | [`plantizia`](./plantizia/index.html) | 112 | izbové rastliny, črepníky, substráty, teráriá | prírodno s. r. o. / 52542858 | 685 249 € tržby 2025; 5–9 zam. | PASS 1440 / 390 / 360 |
| [Garden Holice](https://www.gardenholice.sk/) | [`gardenholice`](./gardenholice/index.html) | 69 | izbové rastliny, záhrada, črepníky, substráty | Green-Oasis, spol. s r. o. / 46658793 | 119 662 € tržby 2025; 5–9 zam. | PASS 1440 / 390 / 360 |
| [Lukscheiter](https://www.lukscheiter.eu/) | [`lukscheiter`](./lukscheiter/index.html) | 78 | izbové rastliny, orchidey, tillandsie, sukulenty a kaktusy | Lukscheiter s.r.o. / 08714410 | Tržby nedoložené; 6–9 zam. | PASS 1440 / 390 / 360 |
