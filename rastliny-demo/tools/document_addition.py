"""Append one completed, reviewed demo and its primary-source evidence."""
import json,sys
from pathlib import Path
ROOT=Path(__file__).resolve().parent.parent
slug=sys.argv[1]
b=json.loads((ROOT/'data'/f'{slug}.json').read_text())
meta=json.loads((ROOT/'tools/shops.json').read_text())[slug]
source=sorted((ROOT/'research').glob(f'*/{slug}-registry.json'))[-1]
r=json.loads(source.read_text())
qa=json.loads((ROOT/'qa-review'/f'{slug}-qa.json').read_text())
assert qa['status']=='PASS'
assert (ROOT/'qa-review'/f'{slug}-ui.jpg').exists()
employees=r['employees']['range'];revenue=r['revenue']
money=(f'{revenue["value"]:,.0f}'.replace(',',' ')+(' €' if revenue.get('currency','EUR')=='EUR' else ' Kč')+f' tržby {revenue["year"]}') if revenue.get('value') is not None else 'Tržby nedoložené'
labels={'plants':'izbové rastliny','airplants':'tillandsie','succulents':'sukulenty a kaktusy','orchids':'orchidey','pots':'črepníky','substrates':'substráty','terrariums':'rastlinné teráriá','outdoor':'záhradné rastliny','accessories':'pestovateľské pomôcky','rareplants':'raritné rastliny'}
kinds=', '.join(b.get('kindLabels',{}).get(k,labels.get(k,k)).lower() for k in b['kinds'])
line=f'| [{b["name"]}]({b["website"]}) | [`{slug}`](./{slug}/index.html) | {len(b["products"])} | {kinds} | {r["company"]} / {r["ico"]} | {money}; {employees} zam. | PASS 1440 / 390 / 360 |\n'
p=ROOT/'README.md';s=p.read_text();assert f'[`{slug}`]' not in s;p.write_text(s+line)
date='.'.join(reversed(b['checked'].split('-')))
section=f'\n## {b["name"]}\n\n'
section+=f'- Kontrola cien a skladu: **{date}**, priamo z vlastného [e-shopu]({b["website"]}). [Identita predajcu]({meta["terms"]}).\n'
section+=f'- Firma: **{r["company"]}, IČO {r["ico"]}**. Vlastníci: '+', '.join(r['owners'])+'. Konatelia / podnikateľ: '+', '.join(r['executives'])+'.\n'
section+=f'- Veľkosť: **{money}; {employees} zam.**. Kód `{r["employees"]["code"]}` v [primárnom registri]({r["employees"]["source"]}); údaj aktualizovaný {r["employees"].get("recordUpdated","neuvedené")}, načítaný {r["checked"]}. [Vlastníci]({r["ownersSource"]}).\n'
if revenue.get('source'):section+=f'- [Finančný výkaz]({revenue["source"]}): '+revenue.get('note','Tržby sú celofiremné, nie iba e-shop.')+'\n'
else:section+='- '+revenue.get('note','Tržby nie sú verejne doložené použitým registrom; nevymýšľame odhad.')+'\n'
if r.get('note'):section+='- '+r['note']+'\n'
section+='- Prečo sedí: '+meta['fit']+' Vlastníkov a konateľov sme porovnali s už zdokumentovanými ukážkami; bez zisteného opakovania.\n'
section+='- Ponuka: **'+str(len(b['products']))+' produktov**, '+kinds+'. Kurátorovaný výber viacerých druhov a cenových hladín, nie tvrdenie o celom e-shope. Doplnky sú zahrnuté pri zmysluplnom počte položiek; služby, poukazy, predobjednávky, prázdne kompozície a varianty bez doloženej ceny alebo skladu sa vyradili.\n'
section+='- Ceny a sklad: '+({'shoptet':'mikrodáta výpisu aj detailu (`InStock`, cena a mena); pri variantoch navyše oficiálne Shoptet variantové dáta viažu cenu, sklad a fotografiu k uvedenému variantu. Na detaile treba vybrať pomenovaný variant.','woocommerce':'WooCommerce Store API: `is_in_stock` a `is_purchasable` sú true, `is_on_backorder` je false, `stock_availability.class` je in-stock; pevná cena a mena, bez variantov a cenového rozsahu.','eshoprychle':'Oficiálne Product/Offer JSON-LD na detaile: InStock, cena a mena konkrétneho produktu. Nepoužíva sa cena bez DPH z data-price výpisu.', 'shopify':'Shopify verejný katalóg a dostupnosť konkrétneho variantu (`available`); URL obsahuje jeho ID a cena patrí uvedenému variantu.'}[meta['platform']])+' Dátum je snímkou; ukážka nevykonáva živú synchronizáciu.\n'
section+='- Tagy a dôvody: iba popis, parametre a kategórie predajcu. Bez doloženého svetla alebo starostlivosti sa použije botanická skupina alebo cenová preferencia. Pet safety sa neodvodzuje z názvu rodu. Snímka údajov a URL ku každej fotografii: `'+str(source.parent.relative_to(ROOT))+'/'+slug+'-products.json`.\n'
section+=f'- Fotografie: oficiálne priradené produktové zábery; okraje, veľkosť a koláže cez `tools/assets.py` a `tools/make_assets.py` (PIL). Logo: [oficiálny súbor]({meta["logoSource"]}); '+meta['logoNote']+(' '+meta['photoNote'] if meta.get('photoNote') else '')+'\n'
section+='- Farby: '+', '.join(f'`{key}: {value}`' for key,value in b['theme'].items())+'. '+meta['themeNote']+' Biela na brand a accent ≥ 4,5 : 1, kontrolované QA.\n'
section+=f'- QA: PASS na desktope 1440 px a mobiloch 390/360 px; owner, chat, kroky a výsledky prezreté. `qa-review/{slug}-qa.json`, `{slug}-ui.jpg`, produktové hárky a `qa-review/matrix.json`. Zdrojový doklad firmy: `{source.relative_to(ROOT)}`.\n\n'
section+='| Produkt / variant | Kategória | Cena | Produkt skladom pri kontrole |\n|---|---|---:|---|\n'
for p in b['products']:
 section+=f'| {p["name"].replace("|","/")} | {b.get("kindLabels",{}).get(p["kind"],labels.get(p["kind"],p["kind"]))} | {p["price"]} | [detail]({p["url"]}) |\n'
p=ROOT/'ZDROJE.md';s=p.read_text();assert f'## {b["name"]}\n' not in s;p.write_text(s+section)
p=ROOT/'NASADENIE.md';s=p.read_text();s+=f'| `{slug}.mojchatbot.sk` | `/cosmetics.html?demo={slug}` |\n';p.write_text(s)
root=ROOT.parent/'NASADENIE.md';s=root.read_text();s+=f'\nRastlinná ukážka [{b["name"]}](./rastliny-demo/{slug}/index.html): pripravená subdoména `{slug}.mojchatbot.sk`, rovnaký samostatný projekt `rastliny-demo`.\n';root.write_text(s)
print('documented',slug)
