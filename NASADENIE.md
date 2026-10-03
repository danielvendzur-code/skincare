# Nasadenie kozmetických a vlasových ukážok (repo `skincare`)

V repe sú dve samostatné stránky. Každá je vlastný projekt na Verceli.
Vínne ukážky sa presunuli do repa [`vino`](https://github.com/danielvendzur-code/vino)
(postup je v jeho `NASADENIE.md`). Kávové ukážky a 18 starších kozmetických
ukážok (mylo … natureal) zostávajú v `kava.chatbot.backend`.

| priečinok | Vercel projekt | čo v ňom je | stav |
| --- | --- | --- | --- |
| `kozmetika-nove/` | `kozmetika-nove`, Root Directory `kozmetika-nove` | 30 kozmetických značiek | nasadené, domény pripojené |
| `vlasy-nove/` | zatiaľ žiadny | 11 vlasových značiek | **nenasadené**, subdomény nemajú certifikát |

Pri oboch: Framework Preset = Other, Build Command prázdny, Output Directory
prázdny. Každá ukážka beží na `<slug>.mojchatbot.sk`. Ukážku podľa subdomény
vyberá `vercel.json`. Adresa bez značky (`*.vercel.app`) zobrazí
`zoznam.html`. Všade je `X-Robots-Tag: noindex`. Bez `ANTHROPIC_API_KEY` chat
odpovedá pripravenými odpoveďami z katalógu.

## kozmetika-nove: 30 domén (už pripojené)

dulcia yemna namy mymkech anela klararott yage omorfia pravaja caltha zahir
pimpinella biorythme purity indivo smyssly liqoil muzuri noili mujluj
humitics skinium botanica atok iuvenio drsandra savon marielli delibutus
almara

## vlasy-nove: nový projekt a 11 domén

1. Vercel → Add New → Project → `danielvendzur-code/skincare`,
   Project Name `vlasy-nove`, Root Directory `vlasy-nove`, Deploy.
2. Settings → Domains: pridaj `<slug>.mojchatbot.sk` pre:
   dixi vivaco kapyderm medarek andreine voono navlasil ryor venira havlikova haaro
3. Websupport → DNS mojchatbot.sk: pre každú z 11 subdomén pridaj CNAME
   `<slug>` s hodnotou, ktorú ukáže Vercel (zvyčajne
   `cname.vercel-dns.com.`). Existujúce záznamy nemeň.

## Pred každým nasadením

```sh
python3 tools/stamp.py
(cd kozmetika-nove && python3 -m http.server 8791 --bind 127.0.0.1 &)
node tools/routing-test.mjs kozmetika-nove
PROBE=dixi node tools/routing-test.mjs vlasy-nove
node tools/matrix.mjs http://127.0.0.1:8791 <slug,slug…>
```
