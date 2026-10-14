"""Collect fixed stocked BREST SKUs from official Product/Offer JSON-LD.
Prices include VAT; listing data-price is not the consumer price.
"""
import sys,json,re,concurrent.futures,hashlib
from pathlib import Path
from urllib.parse import urljoin,quote
from datetime import date
ROOT=Path(__file__).resolve().parent.parent;sys.path.insert(0,str(ROOT/'tools'))
from net import soup,plain,save
from collect_addition import care
TODAY=date.today().isoformat()
meta=json.loads((ROOT/'tools/shops.json').read_text())['brest'];base=meta['website']
choices={}
for kind,path,pages,limit in [('outdoor','Trvalky-a-skalnicky-c31_0_1.htm',4,28),('shrubs','Okrasne-kriky-listnate-c53_12_2.htm',2,12),('fruits','Ovocne-stromy-c51_5_2.htm',2,12)]:
 rows={}
 for n in range(1,pages+1):
  url=base+path+('?page='+str(n) if n>1 else '');s=soup(url)
  for p in s.select('.product[data-id]'):
   if not p.select_one('.in-stock'):continue
   a=p.select_one('[data-selector="name"]');price=p.select_one('.c317')
   if not a or not price:continue
   t=price.get_text(' ',strip=True);v=re.search(r'(\d+(?:[.,]\d+)?)',t)
   if v:rows[p['data-id']]=dict(id='p'+p['data-id'],name=a.get_text(' ',strip=True),url=urljoin(base,a['href']),kind=kind,priceValue=float(v[1].replace(',','.')),sourceEndpoint=url)
 group=sorted(rows.values(),key=lambda p:(p['priceValue'],p['name']))
 if len(group)>limit:group=[group[round(i*(len(group)-1)/(limit-1))] for i in range(limit)]
 choices.update({p['id']:p for p in group});print(kind,len(rows),'stocked, selected',len(group),flush=True)
def detail(p):
 try:
  if p['id'] in meta.get('excludeIds',[]):return None
  s=soup(p['url']);product=None
  for script in s.select('script[type="application/ld+json"]'):
   try:d=json.loads(script.get_text())
   except:continue
   product=next((x for x in d.get('@graph',[d]) if x.get('@type')=='Product'),None)
   if product:break
  if not product:return None
  offer=product.get('offers',{})
  if offer.get('@type')!='Offer' or offer.get('availability','').split('/')[-1]!='InStock' or offer.get('priceCurrency')!='EUR':return None
  if s.select('#detail select[name]'):return None
  value=float(offer['price']);text=s.select_one('#detail-anchor-description');text=text.get_text(' ',strip=True) if text else product.get('description','')
  images=product.get('image');image=images[0] if isinstance(images,list) else images
  p.update(name=plain(product['name']),priceValue=value,currency='EUR',price=f'{value:.2f}'.replace('.',',')+' €',stock='InStock',checked=TODAY,photo='/assets/plants/brest-'+p['id']+'.jpg',imageSource=quote(image,safe=':/?&=%'),tags=[],facts=[],diameter=None,potDiameter=None)
  placement=product.get('brand',{}).get('name','');attrs={'Stanovište podľa predajcu':[placement]}
  p=care(p,text,attrs,[product.get('category','')]);p['sourceAttributes']=attrs
  if p['kind']=='outdoor':p['tags'].append('perennial');p['facts'].append('Trvalka alebo skalnička podľa kategórie predajcu.')
  if re.search(r'\bslnko\b',placement,re.I) and 'sun' not in p['tags']:p['tags'].append('sun');p['facts'].append('Predajca uvádza slnečné stanovište.')
  p['facts'].append('Odrodový záber predajcu; veľkosť dodávanej sadenice je uvedená v detaile.');p['reason']=' '.join(p['facts'][:3]);return p
 except Exception as e:print('Excluded',p['name'],str(e)[-80:],flush=True);return None
with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:rows=[p for p in pool.map(detail,choices.values()) if p]
dest=ROOT/'research'/TODAY;dest.mkdir(parents=True,exist_ok=True);save(dest/'brest-products.json',rows);print('BREST',len(rows),flush=True)
