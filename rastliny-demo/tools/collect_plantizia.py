"""Curate stocked, fixed-price products from the shop's public WooCommerce API."""
import json, re, sys
from collections import Counter
from pathlib import Path
from net import js, plain, save

ROOT = Path(__file__).resolve().parent.parent
BASE = 'https://plantizia.sk/wp-json/wc/store/v1/products'

def attrs(p):
    return {a['name']: [v['name'] for v in a['terms']] for a in p['attributes']}

def eligible(p):
    text = plain(p.get('short_description','') + p.get('description','')).lower()
    return (p['is_in_stock'] and p['is_purchasable'] and p['images'] and
        not p['prices'].get('price_range') and not p.get('variations') and
        not re.search(r'na objednávku|na objednavku|do [12] týžd|do tyzd|dodáme do', text))

def products(category):
    result=[]
    for page in range(1,3 if category==92 else 2):
        url=f'{BASE}?per_page=100&category={category}&stock_status=instock&page={page}'
        if category==92 and page<=2:
            p=Path(f'/tmp/plantizia-plants-{page}.json')
            rows=json.loads(p.read_text()) if p.exists() else js(url)
        else:
            kind={161:'pots',181:'substrates',156:'terrariums'}[category]
            p=Path(f'/tmp/plantizia-{kind}-{page}.json')
            try: rows=json.loads(p.read_text()) if p.exists() else js(url)
            except RuntimeError as e:
                print('Skipped endpoint:',str(e),flush=True)
                break
        result.extend((p,url) for p in rows if eligible(p))
        if len(rows)<100: break
    return result

def normalize(p,endpoint,kind):
    a=attrs(p); cats=[c['name'] for c in p['categories']]
    body=plain(p.get('short_description','') + p.get('description',''))
    tokens=' '.join(cats+sum(a.values(),[])).lower()
    tags=[];facts=[]
    light=a.get('Umiestnenie',[])
    if light: facts.append('Svetlo: '+', '.join(light).lower()+'.')
    for value in light:
        if 'priame' in value.lower(): tags.append('sun')
        elif 'rozptýlen' in value.lower(): tags.append('bright')
        elif 'tieň' in value.lower(): tags.append('low')
    if 'nenároč' in tokens: tags.append('easy');facts.append('Predajca uvádza nenáročnú starostlivosť.')
    if 'bezpeč' in tokens: tags.append('pet-safe');facts.append('Predajca ju zaraďuje medzi rastliny vhodné do domácnosti so zvieratami.')
    if 'ťahav' in tokens: tags.append('trailing');facts.append('Ťahavý rast podľa popisu predajcu.')
    diameter=None
    if a.get('Priemer kvetináča'):
        diameter=float(re.search(r'[\d.,]+',a['Priemer kvetináča'][0])[0].replace(',','.'))
        facts.append('Priemer pestovateľského črepníka: '+a['Priemer kvetináča'][0]+'.')
    if kind=='pots':
        # Pot dimensions come from the pot's own attributes, never the plant's height.
        for key,values in a.items():
            if 'Priemer' in key and values:
                m=re.search(r'[\d.,]+',values[0]);diameter=float(m[0].replace(',','.')) if m else diameter
        for text in cats+sum(a.values(),[]):
            t=text.lower()
            if 'keramick' in t: tags.append('ceramic')
            if 'plastov' in t: tags.append('plastic')
            if 'podmisk' in t: tags.append('saucer')
        if diameter is not None:
            tags.append('small-pot' if diameter<=11 else 'medium-pot' if diameter<=16 else 'large-pot')
        facts=[f'Priemer podľa e-shopu: {diameter:g} cm.'] if diameter else []
        for text in a.get('Materiál',[]):facts.append('Materiál: '+text+'.')
    if kind=='substrates':
        for text in cats:
            t=text.lower()
            if 'izbov' in t: tags.append('indoor-mix')
            if 'kaktus' in t or 'sukulent' in t: tags.append('cactus-mix')
            if 'orchid' in t: tags.append('orchid-mix')
            if 'hydropon' in t: tags.append('hydro-mix')
        for key,values in a.items():
            if any(v in key.lower() for v in ['objem','zložen','určen']):facts.append(key+': '+', '.join(values)+'.')
        if not facts: facts=['Určenie podľa predajcu: '+( ', '.join(c for c in cats if c.startswith('Substráty pre')) or p['name'])+'.']
    if kind=='terrariums':
        if 'uzavreté' in tokens: tags.append('closed');facts.append('Uzavreté terárium podľa kategórie predajcu.')
        if 'otvorené' in tokens: tags.append('open');facts.append('Otvorené terárium podľa kategórie predajcu.')
        if 'bonsai' in tokens: tags.append('bonsai');facts.append('Bonsai terárium podľa e-shopu.')
        if 'tillands' in tokens: tags.append('airplants');facts.append('Terárium s tillandsiami podľa e-shopu.')
        for key,values in a.items():
            if any(v in key.lower() for v in ['výška','priemer','rozmer']):facts.append(key+': '+', '.join(values)+'.')
    price=int(p['prices']['price'])/(10**p['prices']['currency_minor_unit'])
    return dict(id='p'+str(p['id']), sourceId=p['id'],name=p['name'],kind=kind,priceValue=price,
        price=f'{price:.2f}'.replace('.',',')+' €',currency='EUR',url=p['permalink'],
        photo=f'/assets/plants/plantizia-p{p["id"]}.jpg',imageSource=p['images'][0]['src'],
        imageAlt=p['images'][0].get('alt',''), tags=sorted(set(tags)),facts=facts,
        reason=' '.join(facts[:3]),potDiameter=diameter if kind=='plants' else None,
        diameter=diameter if kind=='pots' else None,sourceEndpoint=endpoint,
        sourceAttributes=a,sourceCategories=cats,stock='InStock',checked='2026-10-09',
        sourceText=body[:7000])

selected=[];rejected=[]
for cat,kind,limit in [(92,'plants',64),(161,'pots',24),(181,'substrates',18),(156,'terrariums',14)]:
    rows=products(cat); seen=Counter()
    rows=sorted(rows,key=lambda r:(int(r[0]['prices']['price']),r[0]['name']))
    if kind=='plants' and len(rows)>limit:
        indices=list(dict.fromkeys(round(i*(len(rows)-1)/(limit-1)) for i in range(limit)))
        rows=[rows[i] for i in indices]+[r for i,r in enumerate(rows) if i not in indices]
    # Retain botanical and price diversity, rather than many almost identical cultivars.
    for p,url in rows:
        n=normalize(p,url,kind); genus=p['name'].split()[0]
        name=p['name'].lower()
        if kind=='terrariums' and (re.search(r'workshop|vyrob si sám|set na výrobu|materiál|príslušenstvo|kamien|kameň',name) or not re.search(r'rastlinné terárium|sukulentné terárium|bonsai terárium|s tillandsiou|s.*tillandsi|tillandsia.*(skle|aeráriu)',name)):continue
        if kind=='substrates' and not re.search(r'substrát|zmes',name):continue
        if kind=='pots' and 'podmiska' in name:continue
        if kind=='plants' and (not any(t in n['tags'] for t in ['sun','bright','low']) or seen[genus]>=4):continue
        if kind=='pots' and (n['diameter'] is None or not any(t in n['tags'] for t in ['ceramic','plastic','saucer'])):continue
        if kind=='substrates' and not any(t.endswith('-mix') for t in n['tags']):continue
        if kind=='terrariums' and not any(t in n['tags'] for t in ['open','closed','bonsai','airplants']):continue
        if n['id'] in [x['id'] for x in selected]:continue
        selected.append(n);seen[genus]+=1
        if sum(x['kind']==kind for x in selected)>=limit:break
    print(kind, len(rows),'eligible →',sum(x['kind']==kind for x in selected),'selected',flush=True)
save(ROOT/'research/2026-10-09/plantizia-products.json',selected)
print('TOTAL',len(selected))
