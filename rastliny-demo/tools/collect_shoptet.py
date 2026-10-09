"""Read the seller's stock/price microdata and its own product care descriptions.

The saved research retains the source text; the public catalogue only contains
short factual summaries. Never infer pet safety or outdoor hardiness by genus.
"""
import concurrent.futures as futures
import re, sys
from pathlib import Path
from urllib.parse import urljoin
from net import soup, plain, save

ROOT=Path(__file__).resolve().parent.parent
SHOPS={
 'gardenholice': {'base':'https://www.gardenholice.sk/', 'categories':{
   'plants':['interierove','stredomorske'],
   'outdoor':['trvalky','listnate-kriky','ihlicnate-kriky','okrasne-travy'],
   'pots':['kvetinace'], 'substrates':['substraty']}},
 'lukscheiter': {'base':'https://www.lukscheiter.eu/', 'categories':{
   'plants':['pokojove-rostliny','voskovky--hoya','begonie','bromelie'],
   'orchids':['orchideje','katleje','orchideje-botanicke-druhy'],
   'airplants':['tilandsie'], 'succulents':['sukulenty','kaktusy','adenium--poustni-ruze']}}
}

def listing(base,path,kind):
 url=urljoin(base,path+'/');s=soup(url);rows=[]
 for p in s.select('.p[data-micro="product"]'):
  offer=p.select_one('[data-micro="offer"]'); a=p.select_one('a.name');im=p.select_one('[data-micro-image]')
  if not offer or not a or not im or not offer.get('data-micro-availability','').endswith('/InStock'):continue
  src=im.get('data-micro-image') or im.get('src');price=offer.get('data-micro-price')
  if not src or src.startswith('data:') or not price:continue
  rows.append(dict(id='p'+p['data-micro-product-id'],name=a.get_text(' ',strip=True),url=urljoin(base,a['href']),
   kind=kind,priceValue=float(price),currency=offer.get('data-micro-currency','EUR'),imageSource=src,sourceEndpoint=url,
   sourceCategory=path,stock='InStock',checked='2026-10-09'))
 return rows

def detail(p,slug):
 s=soup(p['url']); short=s.select_one('.p-short-description');desc=s.select_one('#description .basic-description')
 text=' '.join(x.get_text(' ',strip=True) for x in [short,desc] if x)
 # Never quote the generic availability/related-products prose as care guidance.
 t=text.lower(); tags=[];facts=[]
 if re.search(r'rozpt[ýy]len|sv[eě]tl[eéý]\s+(m[ií]sto|stanovi|miesto)|sv[eě]tl[ýy]m?',t):tags.append('bright')
 if re.search(r'polost[ií]n|polotie[nň]|od\s+st[ií]nu|sn[aá][šs][ií]\s+st[ií]n',t):tags.append('low')
 # Strip sentences that explicitly warn against direct sun before matching it.
 suntext=' '.join(x for x in re.split(r'[.!?\n]',t) if not re.search(r'nesn[aá][šs]|vyh[nýy]|nepriame|chra[nň]|bez\s+p[rř]ím|nevhod|nesm|nie\s+priam|nem[aá]',x))
 if re.search(r'p[rř]ím[eéý]\s+slun|priam[eé]\s+sln|slunn|slne[čc]n',suntext):tags.append('sun')
 if re.search(r'nen[aá]ro[čc]n|snadn[aá]\s+p[eé][čc]e|jednoduch[aá]\s+starost',t):tags.append('easy')
 if re.search(r'pop[ií]nav|převis|previs|[ťt]ahav',t):tags.append('trailing')
 diameter=None
 m=re.search(r'(?:kv[eě]tin[aá][čc]|[čc]repn[ií]k)[^.;]{0,45}?(\d+(?:[.,]\d+)?)\s*cm',t)
 if m:diameter=float(m[1].replace(',','.'));facts.append(f'Črepník podľa e-shopu: {diameter:g} cm.')
 if tags:
  lights=[{'low':'polotieň','bright':'rozptýlené svetlo','sun':'slnečné stanovište'}[x] for x in ['low','bright','sun'] if x in tags]
  if lights:facts.insert(0,'Predajca uvádza: '+', '.join(lights)+'.')
 if 'easy' in tags:facts.append('Predajca uvádza nenáročnú starostlivosť.')
 if 'trailing' in tags:facts.append('Popínavý alebo previsnutý rast podľa popisu predajcu.')
 if p['kind']=='outdoor':
  category=p['sourceCategory'];tags.append('perennial' if category=='trvalky' else 'grass' if category=='okrasne-travy' else 'conifer' if category=='ihlicnate-kriky' else 'shrub')
  facts.append({'perennial':'Trvalka','grass':'Okrasná tráva','conifer':'Ihličnatý ker','shrub':'Listnatý ker'}[tags[-1]]+' podľa kategórie e-shopu.')
 if p['kind']=='pots':
  name=p['name'].lower()
  m=re.search(r'(\d+(?:[.,]\d+)?)\s*cm',name)
  if m:diameter=float(m[1].replace(',','.'))
  else:
   m=re.search(r'(?:šírka/priemer|priemer)\s*:?\s*(\d+(?:[.,]\d+)?)\s*cm',t)
   diameter=float(m[1].replace(',','.')) if m else None
  if diameter:tags.append('small-pot' if diameter<=11 else 'medium-pot' if diameter<=16 else 'large-pot');facts.append(f'Priemer alebo šírka podľa e-shopu: {diameter:g} cm.')
  for pattern,tag,label in [('terakot','terracotta','terakota'),('bet[oó]n','concrete','betón'),('polyetylén|plastov','plastic','plast'),('keram','ceramic','keramika')]:
   if re.search(pattern,name+' '+t):tags.append(tag);facts.append('Materiál podľa predajcu: '+label+'.')
  if 'podmisk' in name:tags.append('saucer')
  facts.append('Samostatný črepník; vhodnosť rozmeru skontrolujte pri rastline.')
 if p['kind']=='substrates':
  for pattern,tag in [('orchid','orchid-mix'),('kaktus|sukulent','cactus-mix'),('izbov|pokojov','indoor-mix'),('univerz','universal-mix'),('kyslomil|rododend|rhododend','acid-mix')]:
   if re.search(pattern,p['name'].lower()+' '+t):tags.append(tag)
  facts=['Určenie z názvu a popisu e-shopu. '+p['name']+'.']
 # Genus is a useful, explicit product family when care facts are absent.
 genus=re.split(r'\s+',p['name'])[0].strip('"\'')
 tags.append('genus:'+genus.lower())
 p.update(tags=sorted(set(tags)),facts=facts or ['Botanický názov a variant podľa e-shopu: '+p['name']+'.'],
  reason=' '.join(facts[:3]) or 'Konkrétny druh a variant z ponuky predajcu.',diameter=diameter if p['kind']=='pots' else None,
  potDiameter=diameter if p['kind'] not in ['pots','substrates'] else None,sourceText=text[:7000],
  photo=f'/assets/plants/{slug}-{p["id"]}.jpg',price=(f'{p["priceValue"]:.2f}'.replace('.',',')+' €') if p['currency']=='EUR' else f'{p["priceValue"]:g} Kč')
 # Confirm price/stock/currency on the detail, never guess the currency.

 stock=s.select_one('[itemprop="availability"]');price=s.select_one('meta[itemprop="price"]');currency=s.select_one('meta[itemprop="priceCurrency"]')
 if not currency or currency.get('content') not in ['EUR','CZK']:raise ValueError('Missing verified currency')
 p['currency']=currency['content']
 if stock and not (stock.get('href','')+stock.get('content','')).endswith('/InStock'):return None
 if price:
  value=float(price['content']);p['priceValue']=value;p['price']=f'{value:.2f}'.replace('.',',')+' €' if p['currency']=='EUR' else f'{value:g} Kč'
 p['price']=f'{p["priceValue"]:.2f}'.replace('.',',')+' €' if p['currency']=='EUR' else f'{p["priceValue"]:g} Kč'
 # Prefer the full official product image, if the detail exposes it.
 meta=s.select_one('meta[property="og:image"]')
 if meta and 'content' in meta.attrs and '/products/' in meta['content']:p['imageSource']=meta['content']
 return p

if __name__=='__main__':
 slug=sys.argv[1];shop=SHOPS[slug];rows=[]
 with futures.ThreadPoolExecutor(max_workers=3) as pool:
  tasks=[pool.submit(listing,shop['base'],path,kind) for kind,paths in shop['categories'].items() for path in paths]
  for task in tasks:
   try:rows.extend(task.result())
   except Exception as e:print('Category skipped:',e,flush=True)
 unique={p['id']:p for p in rows}; chosen=[]
 for kind in shop['categories']:
  group=[p for p in unique.values() if p['kind']==kind]
  # Equal representation of cheap, middle and premium products.
  group.sort(key=lambda p:(p['priceValue'],p['name']))
  limit=28 if kind=='plants' else 18
  if len(group)>limit:group=[group[round(i*(len(group)-1)/(limit-1))] for i in range(limit)]
  chosen.extend(group)
 print(slug,len(unique),'stocked →',len(chosen),'details',flush=True)
 result=[]
 with futures.ThreadPoolExecutor(max_workers=3) as pool:
  tasks=[pool.submit(detail,p,slug) for p in chosen]
  for task in tasks:
   try:
    p=task.result()
    if p:result.append(p)
   except Exception as e:print('Product skipped:',e,flush=True)
 save(ROOT/f'research/2026-10-09/{slug}-products.json',result)
 print('SAVED',slug,len(result),{kind:sum(p['kind']==kind for p in result) for kind in shop['categories']},flush=True)
