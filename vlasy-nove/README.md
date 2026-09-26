# Nové vlasové ukážky

Ukážky chatbota a **Výberu starostlivosti** pre stredne veľké české a slovenské
e-shopy s prírodnou vlasovou kozmetikou. Bežia na **tom istom engine** ako
kozmetické ukážky v [`kozmetika-nove/`](../kozmetika-nove/README.md)
(`cosmetics.html` + vrstvy `cosmetics*.{js,css}`, `skincare-*.{js,css}`,
`kvitok-*` — skopírované bez zmeny). Segment mení iba:

| súbor | čo robí |
| --- | --- |
| `cosmetics-config.js` | štyri otázky poradcu o vlasoch (typ vlasov a pokožky hlavy · priorita · rutina · forma) s rovnakými hodnotami tagov, takže bodovanie, rutina aj výsledok ostávajú rovnaké |
| `vlasy-segment.js`, `vlasy-segment.css` | texty, ktoré engine píše o pleti (pozdrav, rýchle otázky, offline odpovede chatu, štítky výsledku, veta o rutine), a zdroj `vlasy-demo-<slug>` v odkazoch do formulára; tematické fotky dlaždíc |
| `nove-znacky-config.js` | vlasové značky v tvare `cosmetics-config.js` (farby, logo, symbol, hero, produkty, tagy); iný slug vráti na prehľad |
| `nove-znacky.js`, `nove-znacky.css` | symbol značky v launcheri a v avataroch chatu |
| `api/cosmetics-chat.js` | API so záznamami vlasových značiek, systémovým promptom a záložnými odpoveďami o vlasoch |
| `<slug>/index.html`, `vercel.json`, `.htaccess`, `index.html` | trasy, subdomény `<slug>.mojchatbot.sk`, prehľad |

Každá ukážka má všetko, čo kozmetické: úvodnú stránku s ponukou (247 € / 10 €,
prvý mesiac zdarma), kartu „Chcem to na svoj web“, launcher s pozvánkou
a symbolom značky, chat s rýchlymi otázkami, 4-krokový výber s fotkami,
výsledok s rutinou, cenou, prekliknutím do e-shopu a alternatívou. Tlačidlá
**Chcem to na svoj web** a **Ozvite sa mi** vedú na
`mojchatbot.sk/kontakt?source=vlasy-demo-<slug>&company=…&web=…&demo=…`
(prefix `vlasy-demo-` v `danielvendzur-code/vne-n`, `DEMO_LEADS`).

## Otázky poradcu

| krok | otázka | odpovede (tag) |
| --- | --- | --- |
| Vaše vlasy | Aké sú vaše vlasy a pokožka hlavy? | suché a lámavé (`dry`) · rýchlo sa mastia (`oily`) · citlivá pokožka hlavy (`sensitive`) · normálne (`balanced`) |
| Priorita | Čo chcete riešiť ako prvé? | výživa a lesk (`hydrate`) · upokojiť pokožku (`calm`) · objem a sviežosť (`clarity`) · posilnenie vlasov (`mature`) |
| Rutina | Koľko krokov vám reálne vyhovuje? | jeden produkt (`simple`) · 2–3 kroky (`basic`) · kompletná (`full`) · len niečo doplniť (`target`) |
| Forma | Aký produkt hľadáte? | šampón (`cream`) · sérum alebo tonikum (`serum`) · starostlivosť o dĺžky – kondicionér, maska, olej (`oil`) · je mi to jedno (`any`) |

Pravidlo tagov: `basic` majú len hlavné produkty (šampóny); kondicionér,
maska, olej, sérum či tonikum sú doplnkové kroky (`target`, `full`), aby pri
„2–3 kroky“ nevyhrali ako hlavný produkt.

## Ukážky

| značka | e-shop | ukážka | prečo je vhodná |
| --- | --- | --- | --- |
| Haaro Naturo | [haaro-naturo.cz](https://www.haaro-naturo.cz/) | `/haaro/` · `haaro.mojchatbot.sk` | česká značka s vlastným kaderníctvom a výrobou v Liberci, špecialista len na vlasy; tuhé aj postbiotické šampóny, séra na pokožku hlavy a kondicionéry delené podľa problému — z názvov nie je jasné, či riešiť vlasy alebo pokožku; Shoptet, všetko skladom |
| Havlík Apoteka | [havlikovaapoteka.cz/sk](https://www.havlikovaapoteka.cz/sk/) | `/havlikova/` · `havlikova.mojchatbot.sk` | Havlíkova přírodní apotéka, česká značka prírodnej kozmetiky (od obchodíka s jedným krémom k „domu krásy“), s vlastnými predajňami; vlasový rad „Vlasový opravář“ (šampóny na svetlé/tmavé vlasy, toniká, séra, maska) — zákazník nevie, čo s čím kombinovať; slovenská verzia e-shopu v €, Shoptet Premium |
| Venira | [venira.sk](https://www.venira.sk/) | `/venira/` · `venira.mojchatbot.sk` | česká značka doplnkov výživy a prírodnej kozmetiky vyrábanej v Česku, samostatný slovenský e-shop v €; vlasový rad s ôsmimi šampónmi (rast, kolagén, objem, mastné, kučeravé…) v rovnakých fľašiach a vo viacerých vôňach, sérum Hair Booster, masky — typický „ktorý je môj?“ katalóg; Shoptet |
<!-- /ukazky -->

Zdroje produktov, cien a fotiek: [`ZDROJE.md`](ZDROJE.md).

## Lokálne

```bash
npm run serve                        # http://127.0.0.1:8790/  (node_modules zdieľa s kozmetika-nove)
node tools/qa.mjs haaro /tmp/qa      # prehliadačové QA jednej ukážky
node tools/chat.mjs haaro            # offline odpovede chatu na typické otázky o vlasoch
node tools/matrix.mjs haaro          # výsledok všetkých 256 kombinácií odpovedí
```

`tools/qa.mjs` prejde desktop 1440×900, mobil 390×844 a 360×800: úvod, karta
ponuky, oba odkazy do formulára (zdroj `vlasy-demo-<slug>`), chat, štyri
kroky bez scrollu, výsledok, odkaz do e-shopu značky, všetkých 256 kombinácií,
chyby konzoly, nenačítané obrázky, horizontálne pretečenie a zvyšky textov
o pleti.

## Nová značka

1. `tools/shoptet_list.py`, `tools/shoptet_variants.py`, `tools/shoptet_text.py`
   (Shoptet), `tools/probe.py`, `tools/dom_list.mjs`, `tools/dom_detail.mjs`
   (iné e-shopy) — produkty, ceny variantov, sklad, popisy.
2. `tools/fetch.sh` + `tools/make_assets.py SLUG SOFT LOGO id=packshot…`,
   `make_assets.mark(...)` a `tools/clean_mark.py` pre symbol.
3. Záznam v `nove-znacky-config.js` a v `api/cosmetics-chat.js`.
4. `python3 tools/routes.py`, `python3 tools/check_assets.py`,
   `node tools/qa.mjs SLUG OUT`, `node tools/hover.mjs SLUG OUT`, prezrieť snímky.
