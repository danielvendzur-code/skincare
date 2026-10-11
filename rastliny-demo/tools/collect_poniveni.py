"""Exact own-shop Product/Offer, main buy form and supplied nursery pot size."""
import json,re,hashlib,concurrent.futures as futures
from pathlib import Path
from datetime import date
from net import soup,save
ROOT=Path(__file__).resolve().parent.parent
TODAY=date.today().isoformat();BASE='https://www.poniveni.sk/'
# Photos of whole primary plants were reviewed before admission. Close-ups,
# an inconsistent Timeless Treasure description and clipped leaf/flower tips omitted.
PATHS=['molinia-black-arrows-bezkolenec','schizachyrium-blue-paradise-prstovka','panicum-niagara-falls-proso','miscanthus-memory-ozdobnica-k2l','cortaderia-pumila-pampova-trava-k1l','pennisetum-little-honey-perovec','helictotrichon-pendula-ovsikovec','cortaderia-tiny-pampa-pampova-trava-k2l','pennisetum-black-beauty-perovec','hosta-school-mouse-funkia','hosta-lakeside-paisley-print-funkia','stachys-helene-von-stein-cistec']
def read(path):
 try:
  url=BASE+path;s=soup(url);objects=[]
  for el in s.select('script[type="application/ld+json"]'):
   try:
    o=json.loads(el.string or el.get_text());objects.extend(o if isinstance(o,list) else [o])
   except (ValueError,TypeError):pass
  p=next(o for o in objects if o.get('@type')=='Product');offer=p['offers']
  assert isinstance(offer,dict) and offer['availability'].endswith('/InStock') and offer['priceCurrency']=='EUR' and offer['url']==url
  form=s.select_one('form.add-to-cart-form--product-detail');qty=form.select_one('input[name="amount"]');productid=form.get('data-product-id')
  assert productid==form.select_one('input[name="product_id"]')['value'] and int(qty['max'])>0
  assert form.select_one('button[type="submit"]:not([disabled])') and not form.select('select')
  stock=s.select_one('.product-detail-page__product-availability-wrapper').get_text(' ',strip=True);assert 'Na sklade' in stock
  price=float(offer['price']);visible=s.select_one('.product-detail-page__product-prices-wrapper').get_text(' ',strip=True)
  assert 'vrátane DPH' in visible and re.search(rf'{price:.2f}'.replace('.',r'[.,]'),visible)
  pack=s.select_one('.product-detail-page__product-pieces-per-package-wrapper').get_text(' ',strip=True);pot=re.search(r'Veľkosť kvetináča:\s*(.*?)\s+Taxón:',pack);assert pot
  text=s.select_one('#product-description').get_text(' ',strip=True);kind='grasses' if path in PATHS[:9] else 'foliage'
  tags=['genus:'+p['name'].split()[0].lower()];facts=['Dodávaná sadenica: kvetináč '+pot[1]+'.','Odrodová fotografia zobrazuje vzhľad rastliny, nie veľkosť dodávanej sadenice.'];evidence=[]
  # Manual care curation by product, with positive seller wording as evidence.
  if kind=='grasses':
   assert re.search(r'slnečn|plnom slnku|na slnku',text,re.I);tags.append('sun');facts.append('Predajca odporúča slnečné stanovište.');evidence.append('slnečn|plnom slnku|na slnku')
   if path.startswith(('molinia-','miscanthus-','panicum-')):
    assert 'polotien' in text or 'polotieň' in text;tags.append('low');facts[-1]='Predajca uvádza slnko a ľahký polotieň.';evidence.append('polotien|polotieň')
   if path.startswith('miscanthus-'):tags.append('easy');facts.append('Po zakorenení je podľa predajcu pomerne nenáročná.')
   if path.startswith('cortaderia-'):facts.append('Predajca odporúča ochranu v chladnejších oblastiach a priepustnú pôdu bez zimného zamokrenia.')
  elif path.startswith(('hosta-','heuchera-')):
   assert re.search(r'polotien|polotieň',text,re.I);tags.append('low');facts.append('Predajca odporúča polotieň a rovnomerne mierne vlhkú, priepustnú pôdu.');evidence.append('polotien|polotieň')
  else:
   assert 'na slnku alebo vo veľmi ľahkom polotieni' in text;tags+=['sun','low','easy'];facts+=['Predajca uvádza slnko alebo veľmi ľahký polotieň.','Nenáročný podľa predajcu; suchšie podmienky zvláda po zakorenení.'];evidence.append('na slnku alebo vo veľmi ľahkom polotieni')
  return dict(id='p'+productid,name=p['name'] if pot[1].lower() in p['name'].lower() else p['name']+' — '+pot[1],kind=kind,priceValue=price,price=f'{price:.2f} €',currency='EUR',url=url,photo=f'/assets/plants/poniveni-p{productid}.jpg',imageSource=p['image'],stock='InStock',checked=TODAY,tags=tags,facts=facts,reason=' '.join(facts),diameter=None,potDiameter=None,sourceStockEvidence=dict(productId=productid,quantity=int(qty['max']),availability=stock,activeBuyForm=True,priceIncludesVAT=True),sourcePack=pack,careEvidence=evidence,descriptionSha256=hashlib.sha256(text.encode()).hexdigest())
 except Exception as e:print('Excluded Poni',path,str(e)[-120:],flush=True);return None
with futures.ThreadPoolExecutor(max_workers=3) as pool:rows=[p for p in pool.map(read,PATHS) if p]
p=ROOT/'research'/TODAY;p.mkdir(exist_ok=True);save(p/'poniveni-products.json',rows)
print('Poni Veni',len(rows),{kind:sum(p['kind']==kind for p in rows) for kind in ['grasses','foliage']},flush=True)
