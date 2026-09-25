# Nové kozmetické ukážky

Ďalšie ukážky chatbota a **Výberu starostlivosti** pre malé kozmetické e-shopy.
Bežia na **presne tom istom engine** ako pôvodných 18 kozmetických ukážok
(`cosmetics.html` + vrstvy `cosmetics*.{js,css}`, `skincare-*.{js,css}`),
skopírovanom z `kava.chatbot.backend` @ `94b0a21`. Pôvodné súbory sa nemenia;
nové značky pridávajú iba:

| súbor | čo robí |
| --- | --- |
| `nove-znacky-config.js` | značky v rovnakom tvare ako `cosmetics-config.js` (farby, logo, hero, produkty, tagy) |
| `nove-znacky.js`, `nove-znacky.css` | symbol značky v launcheri a v avataroch chatu |
| `api/cosmetics-chat.js` | pôvodné API + záznamy nových značiek (bez `ANTHROPIC_API_KEY` odpovedá z katalógu) |
| `<slug>/index.html`, `vercel.json`, `.htaccess`, `index.html` | trasy, subdomény `<slug>.mojchatbot.sk`, prehľad |

Každá ukážka má všetko, čo pôvodné: úvodnú stránku s ponukou (247 € / 10 €,
prvý mesiac zdarma), kartu „Chcem to na svoj web“, launcher s pozvánkou, chat
s rýchlymi otázkami, 4-krokový výber s fotkami, výsledok s rutinou, cenou,
prekliknutím do e-shopu a alternatívou. Tlačidlá **Chcem to na svoj web** a
**Ozvite sa mi** vedú na `mojchatbot.sk/kontakt?source=skincare-demo-<slug>&company=…&web=…&demo=…`,
kde sa formulár predvyplní (vyžaduje `danielvendzur-code/vne-n` PR #173).

## Ukážky

| značka | e-shop | ukážka |
| --- | --- | --- |
| Dulcia natural | [dulcia.sk](https://www.dulcia.sk/) | `/dulcia/` · `dulcia.mojchatbot.sk` |
| Yemna cosmetics | [yemna.sk](https://www.yemna.sk/) | `/yemna/` · `yemna.mojchatbot.sk` |
| NAMY | [namy.sk](https://www.namy.sk/) | `/namy/` · `namy.mojchatbot.sk` |
| Mymkech | [mymkech.com](https://www.mymkech.com/) | `/mymkech/` · `mymkech.mojchatbot.sk` |
| ANELA | [anela.cz](https://www.anela.cz/) | `/anela/` · `anela.mojchatbot.sk` |
| Klara Rott | [klararott.sk](https://www.klararott.sk/) | `/klararott/` · `klararott.mojchatbot.sk` |

Zdroje produktov, cien a fotiek: [`ZDROJE.md`](ZDROJE.md).

## Lokálne

```bash
npm run serve                      # http://127.0.0.1:8790/
node tools/qa.mjs dulcia /tmp/qa   # prehliadačové QA jednej ukážky
```

`tools/qa.mjs` prejde desktop 1440×900, mobil 390×844 a 360×800: úvod, karta
ponuky, oba odkazy do formulára, chat, štyri kroky bez scrollu, výsledok,
odkaz do e-shopu značky, všetkých 256 kombinácií odpovedí, chyby konzoly,
nenačítané obrázky a horizontálne pretečenie.

## Nová značka

1. `tools/probe.py URL…` — názov, cena a fotka z produktových stránok e-shopu.
2. `tools/fetch.sh` + `tools/make_assets.py SLUG SOFT LOGO id=packshot…` —
   packshoty 760×1095, hero koláž 1000×1120, logo; `make_assets.mark(...)` symbol,
   `make_assets.mono_logo(...)` pre jednofarebné logo zachytené z webu (`tools/elshot.mjs`).
3. Záznam v `nove-znacky-config.js` a v `api/cosmetics-chat.js`.
4. `python3 tools/routes.py` — trasy, `vercel.json`, `.htaccess`, prehľad.
5. `python3 tools/check_assets.py` a `node tools/qa.mjs SLUG OUT`, potom prezrieť snímky.
