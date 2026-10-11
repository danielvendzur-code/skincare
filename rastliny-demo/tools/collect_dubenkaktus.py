"""Duben-Kaktus own shop: exact product ID, photo, positive quantity and price."""
import concurrent.futures as futures
import hashlib,re
from datetime import date
from pathlib import Path
from urllib.parse import urljoin
from net import soup,save

ROOT=Path(__file__).resolve().parent.parent
BASE='https://shop.duben-kaktus.cz/'
TODAY=date.today().isoformat()
CATEGORIES={'cacti':['astrophytum-a1','ariocarpus-a1','tephrocactus-a1','vyberove-rostliny','mrazuvzdorne','kaktusy-standard'],'succulents':['ostatni-sukulenty']}

def listing(kind,path):
    first=soup(BASE+path+'/')
    last=max([int(m[1]) for a in first.select('a[href]') if (m:=re.search(r'vp-page=(\d+)',a['href']))],default=1)
    rows=[]
    for page in range(1,min(last,6)+1):
        s=first if page==1 else soup(BASE+path+'/?vp-page='+str(page))
        for a in s.select('a.prodBlockImg[href]'):
            im=a.select_one('img[src]');m=re.search(r'-(\d+)/$',a['href'])
            if not im or not m or '/uploads/images/'+m[1]+'/' not in im['src']:continue
            name=a.get('title','').strip()
            if re.search(r'\b(?:semena|seeds|10\s*(?:x|ks)|sada|hnojivo)\b',name,re.I):continue
            rows.append(dict(id='p'+m[1],name=name,url=urljoin(BASE,a['href']),kind=kind,sourceCategory=path))
    print(path,len(rows),'assigned photos',flush=True)
    return rows

def read(p):
    try:
        s=soup(p['url']);h=s.select_one('h1.h1_detail');d=s.select_one('.product_details')
        if not h or not d:return None
        p['name']=h.get_text(' ',strip=True)
        form=d.select_one('form.formAddToBasket');price=d.select_one('p.cena span.big')
        if not form or not price or form.select('select'):return None
        if form.select_one('[name="id_page_product"]')['value']!=p['id'][1:]:return None
        if form.select_one('[name="id_page_mainParam"]')['value']:return None
        if not form.select_one('input[name="add"][value="Koupit"]:not([disabled])'):return None
        t=d.select_one('p.cena').get_text(' ',strip=True);qty=re.search(r'Skladem\s*\((\d+)\s*ks\)',t)
        if not qty or int(qty[1])<=0 or not re.search(r'\bKč\b',t):return None
        value=float(price.get_text().replace('\xa0','').replace(' ','').replace(',-','').replace(',','.'))
        desc=d.select_one('.page_text');text=desc.get_text(' ',strip=True) if desc else ''
        if re.search(r'mate[řr]sk[áa]\s+rostlin|foto\s+(?:ilustra[čc]n|mat|orienta[čc])|na objedn|p[řr]edobjedn',text,re.I):return None
        photo=next((urljoin(BASE,a['href']) for a in s.select('.photo_big a[href]') if '/uploads/images/'+p['id'][1:]+'/large/' in a['href']),None)
        if not photo:return None
        attrs={}
        for key in d.select('.row .col-xs-6.col-sm-4'):
            val=key.find_next_sibling('div')
            if val:attrs[key.get_text(' ',strip=True)]=val.get_text(' ',strip=True)
        facts=[];tags=['genus:'+p['name'].split()[0].lower()]
        pot=attrs.get('Průměr květináčku:','');age=attrs.get('Stáří rostliny:','');typ=attrs.get('Typ rostliny:','')
        if pot:facts.append('Črepník podľa predajcu: '+pot+'.')
        if age:facts.append('Vek podľa predajcu: '+age+'.')
        if typ:facts.append('Typ podľa predajcu: '+typ+'.')
        if 'foceny, evidovány a prodávány individuálně' in text:facts.append('Predajca uvádza individuálne fotografovanú a evidovanú rastlinu.')
        if p['sourceCategory']=='mrazuvzdorne':facts.append('Zaradenie predajcu: mrazuvzdorné kaktusy; podmienky zimovania sú na detaile.')
        p.update(priceValue=value,price=f'{value:g} Kč',currency='CZK',photo=f'/assets/plants/dubenkaktus-{p["id"]}.jpg',imageSource=photo,stock='InStock',checked=TODAY,tags=tags,facts=facts or ['Konkrétny druh a veľkosť podľa predajcu.'],diameter=None,potDiameter=float(re.search(r'(\d+(?:[.,]\d+)?)',pot)[1].replace(',','.')) if re.search(r'(\d+(?:[.,]\d+)?)',pot) else None,sourceAttributes=attrs,sourceStockEvidence=dict(quantity=int(qty[1]),activeBuyForm=True,productId=p['id'][1:]),descriptionSha256=hashlib.sha256(text.encode()).hexdigest())
        p['reason']=' '.join(p['facts'][:3]);return p
    except Exception as e:print('Excluded',p['name'],str(e)[-100:],flush=True);return None

tasks=[(kind,path) for kind,paths in CATEGORIES.items() for path in paths]
rows=[]
with futures.ThreadPoolExecutor(max_workers=3) as pool:
    for result in pool.map(lambda x:listing(*x),tasks):rows.extend(result)
rows=list({p['id']:p for p in rows}.values())
# Read a bounded, diverse assortment; curation may exclude weak photographs.
detail_rows=[]
for kind,limit in [('cacti',80),('succulents',32)]:
    group=sorted([p for p in rows if p['kind']==kind],key=lambda p:p['name'])
    if len(group)>limit:group=[group[round(i*(len(group)-1)/(limit-1))] for i in range(limit)]
    detail_rows.extend(group)
with futures.ThreadPoolExecutor(max_workers=3) as pool:rows=[p for p in pool.map(read,detail_rows) if p]
selected=[]
for kind,limit in [('cacti',32),('succulents',18)]:
    group=sorted([p for p in rows if p['kind']==kind],key=lambda p:(p['priceValue'],p['name']))
    if len(group)>limit:group=[group[round(i*(len(group)-1)/(limit-1))] for i in range(limit)]
    selected.extend(group)
out=ROOT/'research'/TODAY;out.mkdir(exist_ok=True)
save(out/'dubenkaktus-products.json',selected)
print('SAVED Duben',len(selected),{k:sum(p['kind']==k for p in selected) for k in CATEGORIES},flush=True)
