"""Official fixed-price, stocked product details; no purchases or guessed care."""
import sys,json,re,concurrent.futures as futures
from pathlib import Path
from datetime import date
from urllib.parse import urljoin
ROOT=Path(__file__).resolve().parent.parent
sys.path.insert(0,str(ROOT/'tools'))
from net import soup,plain,save
from collect_addition import care
TODAY=date.today().isoformat()
def row(slug,name,kind,value,url,image):
 return dict(id='p'+re.search(r'-(\d+)/$',url)[1] if slug=='samek' else 'p'+re.search(r'/(\d+)-',url)[1],name=name,kind=kind,priceValue=value,currency='CZK',price=f'{value:g} Kč',url=url,photo='',imageSource=image,stock='InStock',checked=TODAY,diameter=None,potDiameter=None,tags=[],facts=[])
def uniform(rows,limits):
 result=[]
 for kind,n in limits.items():
  group=sorted([p for p in rows if p['kind']==kind],key=lambda p:(p['priceValue'],p['name']))
  if len(group)>n:group=[group[round(i*(len(group)-1)/(n-1))] for i in range(n)]
  result.extend(group)
 return result

def samek():
 base='https://www.sukulenty-samek.cz/';first=soup(base+'product/available/');pages=[base+'product/available/']+sorted({urljoin(base,a['href']) for a in first.select('main a[href]') if re.search(r'/product/available/\?page=\d+',a['href'])})
 def listing(url):
  try:return [urljoin(base,a['href'].split('?')[0]) for a in soup(url).select('main a[href^="/product/"]') if re.search(r'-\d+/$',a['href'].split('?')[0]) and not re.search(r'kolekc|semen|semín|osiv|poukaz',a.get_text(' ',strip=True),re.I)]
  except Exception as e:print('excluded listing',url,str(e)[-90:],flush=True);return []
 with futures.ThreadPoolExecutor(max_workers=3) as pool:urls=list(dict.fromkeys(u for batch in pool.map(listing,pages) for u in batch))
 print('samek listed',len(urls),flush=True)
 def detail(url):
  try:
   s=soup(url);main=s.select_one('main');text=main.get_text('\n',strip=True);name=main.select_one('h1').get_text(' ',strip=True)
   stock=re.search(r'Dostupnost:\s*(\d+)\s*ks\s*skladem',text,re.I)
   if not stock or int(stock[1])<1 or not s.select_one('#frm-productAddToCartForm') or s.select('select'):return None
   cats=[a.get_text(' ',strip=True) for a in main.select('a[href^="/category/"]')];paths=[a['href'] for a in main.select('a[href^="/category/"]')]
   kind=next((k for k,c in [('cacti','/category/kaktusy-2/'),('succulents','/category/sukulenty-1/'),('outdoor','/category/skalnicky-3/')] if c in paths),None)
   if not kind:return None
   price=re.search(r'(\d[\d\s\u00a0]*,\d{2})\s*Kč',text)
   if not price:return None
   value=float(re.sub(r'\s','',price[1]).replace(',','.'));images=[urljoin(base,i['src']) for i in main.select('img[src^="/images/"]')]
   if not images:return None
   last=bool(re.search(r'posledn[ií]\s+fotograf',text,re.I));p=row('samek',name,kind,value,url,images[-1] if last else images[0]);p['photo']='/assets/plants/samek-'+p['id']+'.jpg';p['sourceCategory']=cats;p['sourceStockEvidence']={'quantity':int(stock[1]),'availabilityText':stock[0],'fixedAddToCartForm':True};p['sourceEndpoint']=url;p['photoSelection']='Last assigned photo: seller explicitly identifies offered plant size.' if last else 'First assigned product photo.'
   care_text=text.split('Víte, že')[0];p=care(p,care_text,{},cats)
   if re.search(r'má ráda plné slunce|umístíme.{0,35}na slunce',care_text,re.I) and 'sun' not in p['tags']:
    p['tags'].append('sun');p['facts'].append('Predajca uvádza: slnečné stanovište.')
   if re.search(r'rostlina je pln[eě] mrazuvzdorná',care_text,re.I):p['facts'].append('Predajca uvádza plnú mrazuvzdornosť.')
   p['reason']=' '.join(p['facts'][:3]);p['careSource']='Seller cultivation instructions before the botanical background section.'
   return p
  except Exception as e:print('excluded detail',url,str(e)[-100:],flush=True);return None
 with futures.ThreadPoolExecutor(max_workers=3) as pool:rows=[p for p in pool.map(detail,urls) if p]
 return uniform(rows,{'succulents':24,'cacti':12,'outdoor':12})

def vseprokaktusy():
 base='https://www.vseprokaktusy.cz/';urls={}
 for kind,path in [('cacti','303-prodej-kaktusu'),('succulents','304-prodej-sukulentu'),('substrates','306-substraty-a-hnojiva')]:
  first=soup(base+path);pages=[base+path]+sorted({urljoin(base,a['href']) for a in first.select('a[href]') if path+'?page=' in a['href']})
  for page in pages:
   s=soup(page)
   for card in s.select('article.product-miniature'):
    stock=card.select_one('.availability-list.in-stock');a=card.select_one('h3 a[href]')
    if stock and a and re.search(r'\d+\s+Kus',stock.get_text(' ',strip=True),re.I) and not card.select('.variant-links a'):
     name=a.get_text(' ',strip=True)
     if kind=='substrates' and (not re.search('substr|rašel|perlit|písek|zemin|kokos|keramzit',name,re.I) or re.search('tablet',name,re.I)):continue
     urls[a['href']]=kind
 print('vseprokaktusy listed stocked',len(urls),flush=True)
 def detail(pair):
  url,kind=pair
  try:
   s=soup(url);node=s.select_one('#product-details[data-product]')
   if not node:return None
   d=json.loads(node['data-product']);av=s.select_one('link[itemprop="availability"],meta[itemprop="availability"]');stock=(av.get('href','')+av.get('content','')) if av else ''
   if 'Kč' not in d.get('price','') or float(d.get('quantity',0))<=0 or d.get('allow_oosp') or str(d.get('id_product_attribute','0'))!='0' or not d.get('available_for_order') or not stock.endswith('/InStock'):return None
   if s.select('.product-variants select'):return None
   name=d['name'];value=float(d['price_amount']);image=d['cover']['large']['url'];p=row('vseprokaktusy',name,kind,value,url,image);p['photo']='/assets/plants/vseprokaktusy-'+p['id']+'.jpg';p['sourceEndpoint']=url;p['sourceStockEvidence']={'quantity':d['quantity'],'allow_oosp':d['allow_oosp'],'availability':stock,'attributeId':d['id_product_attribute']};text=plain(d.get('description_short','')+' '+d.get('description',''));p['sourceCategory']=[d.get('category_name',kind)]
   size=plain(d.get('description_short',''))
   if size:p['facts'].append('Veľkosť podľa predajcu: '+size.rstrip('.')+'.')
   volume=re.search(r'balen[ií]\s*(\d+(?:[.,]\d+)?)\s*l\b',size,re.I)
   if kind=='substrates' and volume and not re.search(r'\d+\s*l\b',name,re.I):p['name']+=' — '+volume[1]+' l'
   return care(p,text,{},p['sourceCategory'])
  except Exception as e:print('excluded detail',url,str(e)[-100:],flush=True);return None
 with futures.ThreadPoolExecutor(max_workers=3) as pool:rows=[p for p in pool.map(detail,urls.items()) if p]
 return uniform(rows,{'cacti':20,'succulents':16,'substrates':8})
if __name__=='__main__':
 slug=sys.argv[1];rows={'samek':samek,'vseprokaktusy':vseprokaktusy}[slug]();meta=json.loads((ROOT/'tools/shops.json').read_text())[slug];rows=[r for r in rows if r['id'] not in meta.get('excludeIds',[])];out=ROOT/'research'/TODAY;out.mkdir(exist_ok=True);save(out/(slug+'-products.json'),rows);print('SAVED',slug,len(rows),{k:sum(p['kind']==k for p in rows) for k in set(p['kind'] for p in rows)},flush=True)
 for p in rows:print(p['id'],p['kind'],p['name'],p['price'],p['tags'],flush=True)
