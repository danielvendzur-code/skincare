# vino-demo — chatbot a výber vína pre malé vinárstva

Ukážky pre vinárstva na rovnakom engine ako skincare ukážky
(`kozmetika-nove/`): stránka pre majiteľa s cenníkom (247 € / 10 €, prvý
mesiac zdarma), ponuka „Chcem to na svoj web“, launcher so symbolom
vinárstva, chat, výber v 4 krokoch s fotkami a výsledok s cenou, odkazom
do e-shopu vinárstva a alternatívou.

Čo je iné oproti kozmetike:

- Otázky (`cosmetics-config.js`): farba · chuť · koľko vín (1 fľaša, trio
  na ochutnanie, výber do kartónu, darček) · k čomu (ryba/hydina, mäso,
  syry/dezerty, len tak). Interné kľúče ostali `skin/goal/routine/texture`.
- Bodovanie (`skincare-routine-enhancer.js`, `skincare-final-fix.js`):
  farba rozhoduje prvá (kto chce červené, nedostane biele), potom štýl a
  jedlo. Trio a kartón sú rôzne vína zoradené podľa zhody.
- Texty chatu a stránky sú o víne; výsledok uvádza „Predaj alkoholu len
  osobám starším ako 18 rokov.“
- CTA vedú na `mojchatbot.sk/kontakt?source=vino-demo-<slug>&…`.
- Fotky dlaždíc sú z Pexels (licencia bez povinného uvedenia autora),
  zoznam v `ZDROJE.md`.

Spustenie: `python3 -m http.server 8791 --bind 127.0.0.1` v tomto priečinku,
potom `http://127.0.0.1:8791/cosmetics.html?demo=<slug>` alebo `/<slug>/`.
QA: `node tools/qa.mjs <slug> <out>` a `node tools/hover.mjs <slug> <out>`.

| vinárstvo | web | ukážka |
| --- | --- | --- |
| Vinařství Skoupil | [eshop.skoupil.com](https://eshop.skoupil.com/) | `/skoupil/` · `skoupil.mojchatbot.sk` |
| Vinařství Nechory | [vinarstvinechory.cz](https://eshop.vinarstvinechory.cz/) | `/nechory/` · `nechory.mojchatbot.sk` |
| Dobrá Vinice | [dobravinice.cz](https://www.dobravinice.cz/) | `/dobravinice/` · `dobravinice.mojchatbot.sk` |
| Vinárstvo Magula | [vinomagula.sk](https://www.vinomagula.sk/) | `/magula/` · `magula.mojchatbot.sk` |
| Víno Jurášek | [vinojurasek.sk](https://vinojurasek.sk/) | `/jurasek/` · `jurasek.mojchatbot.sk` |
