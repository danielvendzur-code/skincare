"""Curate a verified additional shop; no guessed stock, variant prices or care.

Configuration is appended to shops.json only after seller/registry verification.
Raw descriptions remain in the local HTTP cache; public research keeps facts.
"""
import concurrent.futures as futures
import hashlib, json, re, sys
from datetime import date
from pathlib import Path
from urllib.parse import urljoin
from net import js, soup, plain, save, fetch
from collect_shoptet import listing, detail

ROOT=Path(__file__).resolve().parent.parent
TODAY=date.today().isoformat()

def eligible(p,shop):
    name=p['name']
    if p['id'] in shop.get('excludeIds',[]):return False
    if re.search(shop.get('exclude',r'(?!)'),name,re.I):return False
    if re.search(shop.get('excludeByKind',{}).get(p['kind'],r'(?!)'),name,re.I):return False
    if p['kind'] in shop.get('include',{}) and not re.search(shop['include'][p['kind']],name,re.I):return False
    if p['kind']=='substrates' and not re.search(r'substr[aá]t|rašelin|raselin|perlit|keramzit|kokos|zemin|p[ií]sek',name,re.I):return False
    return True

def care(p,text,attributes=None,categories=None):
    """Only explicit seller wording and classifications produce constraints."""
    attributes=attributes or {};categories=categories or []
    t=text.lower().replace(', nie však ','. nie však ');tags=list(p.get('tags',[]));facts=list(p.get('facts',[]))
    tokens=' '.join(categories+[str(v) for v in attributes.values()]).lower()
    if not p.get('facts'):
        # Care comes from affirmative seller clauses, never guessed by genus.
        clauses=[c for c in re.split(r'[.!?\n]',t) if not re.search(r'ne[ľl][úu]bi|neob[ľl][úu]b|nevy[žz]ad|po[šs]kod|pop[aá]l|sp[aá]l|degrad|nesv[eě]d[čc]|nevyhov|nepatr|netoler|nesn[aá][šs]|nesnes|neznes|nezn[aá][šs]|vyh[nýy]|chr[aá][nň]|bez\s+(?:p[rř]ím|priam)|nevhod|nesm|nem[aá]|nevystav|pop[aá]l|sp[aá]len|[šs]kod|nie\s+(?:však\s+)?priam|niektor[eé]|v[aä][čc][šs]ina|aklimatizovan',c)]
        for pattern,tag,label in [(r'polost[ií]n|polotie[nň]|sn[aá][šs][ií]\s+st[ií]n|zvládne aj tmav[šs]ie','low','polotieň'),(r'rozpt[ýy]len|filtrovan|filtrov[aá]n|nep[rř]ím[eé]\s+slun|nepriam[eé]\s+sln|sv[eě]tl[eéý]\s+(?:m[ií]sto|stanovi|miesto)','bright','rozptýlené svetlo'),(r'(?<!ne)\bp[rř]ím[eéý]\s+slun|(?<!ne)\bpriam[eé]\s+sln|slunn[eé]\s+stanovi|slne[čc]n[eé]\s+stanovi','sun','slnečné stanovište')]:
            if any(re.search(pattern,c) for c in clauses):tags.append(tag);facts.append('Predajca uvádza: '+label+'.')
        if any(re.search(r'nen[aá]ro[čc]n|snadn[aá]\s+p[eé][čc]e|jednoduch[aá]\s+starost',c) for c in clauses):tags.append('easy');facts.append('Predajca uvádza nenáročnú starostlivosť.')
    # Category/attribute labels are positive statements, unlike prose warnings.
    lights=[]
    for value in [v for k,vals in attributes.items() if re.search(r'sv[eě]tlo|umiest|stanovi',k,re.I) for v in vals]+categories:
        value=value.lower()
        if re.search('rozpt[ýy]len|nep[rř]ím|nepriam',value):lights.append('bright')
        elif re.search('polost[ií]n|polotie[nň]|do tie[nň]a',value):lights.append('low')
        elif re.search(r'p[rř]ím[eé]\s+slun|priam[eé]\s+sln|slunn|slne[čc]',value):lights.append('sun')
    # Product-specific placement attributes take precedence over generic genus
    # paragraphs that may discuss other plants' tolerance of direct sunshine.
    explicit_lights=[]
    for key,values in attributes.items():
        if re.search(r'sv[eě]tlo|umiest|stanovi',key,re.I):
            for value in values:
                if re.search(r'rozpt[ýy]len|nep[rř]ím|nepriam|svetl[eé]\s+stanov',value,re.I):explicit_lights.append('bright')
                elif re.search(r'polost[ií]n|polotie[nň]|do tie[nň]a',value,re.I):explicit_lights.append('low')
                elif re.search(r'p[rř]ím[eé]\s+slun|priam[eé]\s+sln|slunn|slne[čc]',value,re.I):explicit_lights.append('sun')
    if explicit_lights:
        tags=[tag for tag in tags if tag not in ['low','bright','sun']]
        facts=[fact for fact in facts if fact not in ['Predajca uvádza: polotieň.','Predajca uvádza: rozptýlené svetlo.','Predajca uvádza: slnečné stanovište.']]
        lights=explicit_lights
    for tag in lights:
        if tag not in tags:
            tags.append(tag);facts.append('Predajca uvádza: '+{'low':'polotieň','bright':'rozptýlené svetlo','sun':'slnečné stanovište'}[tag]+'.')
    if re.search(r'nen[aá]ro[čc]n|za[čc][áa]te[čc]n[ií]k|za[čc]iato[čc]n[ií]k',tokens) and 'easy' not in tags:
        tags.append('easy');facts.append('Predajca ju zaraďuje medzi rastliny pre začiatočníkov.')
    if re.search(r'netoxick|nejedovat|vhodn[eé].*mazl[ií][čc]k|pet.friendly|bezpe[čc]n.*(?:zv[ií]ř|zvier|mil[áa][čc])',tokens) and 'pet-safe' not in tags:
        tags.append('pet-safe');facts.append('Zaradenie predajcu: vhodná do domácnosti so zvieratami; nie na konzumáciu.')
    if re.search(r'previs|převis|[ťt]ahav|plaziv',tokens) and 'trailing' not in tags:
        tags.append('trailing');facts.append('Previsnutý alebo ťahavý rast podľa zaradenia predajcu.')
    if p['kind']=='terrariums':
        # These tags describe a living composition, never an empty glass vessel.
        for pattern,tag,label in [(r'uzav[řr]en|uzavret','closed','uzavreté'),(r'otev[řr]en|otvoren','open','otvorené'),('tilland','airplants','s tillandsiou'),('bonsai|bonsaj','bonsai','s bonsajom')]:
            if re.search(pattern,text+' '+p['name'],re.I):tags.append(tag);facts.append('Typ kompozície podľa predajcu: '+label+'.')
    if p['kind']=='pots':
        size=re.search(r'(?:[øØ]|pr[ií]emer(?:om|e|\s+majú)?|pr[uů]m[eě]r|ší[řr]ka)\s*:?\s*(\d+(?:[.,]\d+)?)\s*cm',p['name']+' '+text,re.I)
        if size:
            diameter=float(size[1].replace(',','.'));p['diameter']=diameter;tags.append('small-pot' if diameter<=11 else 'medium-pot' if diameter<=16 else 'large-pot');facts.append(f'Priemer alebo šírka podľa predajcu: {diameter:g} cm.')
        for pattern,tag,label in [('keramik|keramick','ceramic','keramika'),('terakot','terracotta','terakota'),('plast','plastic','plast'),('bet[oó]n','concrete','betón')]:
            if tag=='concrete' and re.search(r'bet[oó]n.*(?:effect|efekt)|imit\w*.{0,30}bet[oó]n|vzh[ľl][ae]d\w*.{0,20}bet[oó]n',p['name']+' '+text,re.I):continue
            if re.search(pattern,p['name']+' '+text,re.I):tags.append(tag);facts.append('Materiál podľa predajcu: '+label+'.')
    if p['kind']=='substrates':
        tags=[t for t in tags if not t.endswith('-mix')]
        purpose=(p['variantLabel'] if p.get('variantLabel') and re.search(r'na |pro ',p['variantLabel'],re.I) else p['name'])+' '+ ' '.join(v for k,vals in attributes.items() if re.search(r'ur[čc]en|pou[žz]it',k,re.I) for v in vals)
        for pattern,tag in [('orchid','orchid-mix'),('kaktus|sukulent','cactus-mix'),('izbov|pokojov|aroid','indoor-mix'),('univerz','universal-mix'),('hydropon','hydro-mix')]:
            if re.search(pattern,purpose,re.I):tags.append(tag)
        if 'cactus-mix' in tags and not re.search(r'izbov|pokojov|aroid',p['name'],re.I):
            tags=[tag for tag in tags if tag!='indoor-mix']
    if not any(x.startswith('genus:') for x in tags):tags.append('genus:'+re.sub(r'^Kokedama\s+', '', p['name'], flags=re.I).split()[0].lower())
    p.update(tags=sorted(set(tags)),facts=list(dict.fromkeys(facts)) or ['Konkrétny druh a variant podľa e-shopu: '+p['name']+'.'])
    p['reason']=' '.join(p['facts'][:3]);p['descriptionSha256']=hashlib.sha256(text.encode()).hexdigest()
    return p

def shoptet_products(shop,slug):
    rows={}
    for kind,paths in shop['categories'].items():
        for path in paths:
            s=soup(urljoin(shop['website'],path+'/'))
            numbers=[int(m.group(1)) for a in s.select('.pagination a[href]') if (m:=re.search(r'/strana-(\d+)',a['href']))]
            last=max(numbers,default=1)
            page_numbers=list(range(1,last+1)) if last<=8 else sorted(set([1,*[round(1+i*(last-1)/7) for i in range(1,8)]]))
            pages=[path if n==1 else path.rstrip('/')+'/strana-'+str(n) for n in page_numbers]
            for page in pages:
                for p in listing(shop['website'],page,kind):
                    if eligible(p,shop):rows[p['id']]=p
    chosen=[]
    for kind in shop['kinds']:
        group=sorted([p for p in rows.values() if p['kind']==kind],key=lambda p:(p['priceValue'],p['name']))
        limit=shop.get('limits',{}).get(kind,40 if kind=='plants' else 18)
        if len(group)>limit:group=[group[round(i*(len(group)-1)/(limit-1))] for i in range(limit)]
        chosen.extend(group)
    print(slug,len(rows),'stocked; selected',len(chosen),'detail pages',flush=True)
    def read(p):
        try:
            s=soup(p['url']);availability=s.select_one('[itemprop="availability"]')
            if not availability or not (availability.get('href','')+availability.get('content','')).endswith('/InStock'):return None
            variant=None;variant_label=None
            selectors=s.select('select[name^="parameterValueId"]')
            if selectors:
                # Official Shoptet variant data ties stock, price and photo to
                # the exact seller label. Keep one stocked SKU per product.
                script='\n'.join(x.get_text() for x in s.select('script'))
                match=re.search(r'necessaryVariantData\s*=\s*',script)
                if not match:return None
                variants,_=json.JSONDecoder().raw_decode(script[match.end():])
                choices=[]
                for key,v in variants.items():
                    if not v.get('isNotSoldOut') or not re.fullmatch(r'Skladem|Skladom',v.get('availabilityName',''),re.I):continue
                    labels=[]
                    for selector in selectors:
                        parameter=selector.get('data-parameter-id')
                        values=[o for o in selector.select('option[value]') if o.get('value') and f'{parameter}-{o["value"]}' in key]
                        if not values:break
                        labels.append(values[0].get_text(' ',strip=True))
                    if len(labels)!=len(selectors):continue
                    label=' / '.join(labels)
                    if re.search(r'prázd|bez rostlin|p[řr]edobjedn|na objedn',label,re.I):continue
                    choices.append((v,label))
                if not choices:return None
                variant,variant_label=min(choices,key=lambda row:float(row[0]['priceUnformatted']))
            p=detail(p,slug)
            if not p:return None
            if variant:
                p['name']+=' — '+variant_label
                p['variantId']=variant['id'];p['variantLabel']=variant_label;p['variantCode']=variant.get('code')
                p['priceValue']=float(variant['priceUnformatted'])
                p['price']=f'{p["priceValue"]:g} Kč' if p['currency']=='CZK' else f'{p["priceValue"]:.2f}'.replace('.',',')+' €'
                if variant.get('variantImage',{}).get('big'):p['imageSource']=variant['variantImage']['big']
                p['facts'].insert(0,'Variant podľa e-shopu: '+variant_label+'.')
            p['checked']=TODAY;p['sourceAttributes']={}
            for tr in s.select('.detail-parameters tr,.extended-description tr'):
                th=tr.select_one('th');td=tr.select_one('td')
                if th and td:p['sourceAttributes'][th.get_text(' ',strip=True)]=[td.get_text(' ',strip=True)]
            text=p.pop('sourceText','')
            if re.search(r'os[aá]zen[ií].{0,30}trv[aá]|na objedn[aá]vku|p[řr]edobjedn|predobjedn',text,re.I):return None
            p=care(p,text,p['sourceAttributes'],[p['sourceCategory']])
            # Empty glass and DIY compositions are not living terrariums.
            if p['kind']=='terrariums' and not re.search(r'rostlin|rastlin|osazen|osaden|tilland|řasokoul',text,re.I):return None
            return p
        except Exception as e:print('Detail excluded:',p['name'],str(e)[-100:],flush=True);return None
    with futures.ThreadPoolExecutor(max_workers=3) as pool:return [p for p in pool.map(read,chosen) if p]

def woo_products(shop,slug):
    endpoint=shop['website'].rstrip('/')+'/wp-json/wc/store/v1/products?per_page=100'
    # Large mixed shops need plant-category pages rather than the newest 100
    # products, which may all be unrelated goods. Keep each item source URL.
    rows={}
    if shop.get('categoryFetch'):
        for category in dict.fromkeys(v for values in shop['categories'].values() for v in values):
            page=1
            while True:
                source=endpoint+f'&category={category}&page={page}'
                batch=js(source)
                for raw in batch:rows.setdefault(raw['id'],(raw,source,category))
                if len(batch)<100:break
                page+=1
    else:
        rows={raw['id']:(raw,endpoint,None) for raw in js(endpoint)}
    result=[]
    for raw,source,category in rows.values():
        if not (raw['is_in_stock'] and raw['is_purchasable'] and raw['images']) or raw.get('is_on_backorder') or raw.get('stock_availability',{}).get('class','in-stock')!='in-stock' or raw.get('variations') or raw['prices'].get('price_range'):continue
        cats=[c['name'] for c in raw['categories']];ids=[c['id'] for c in raw['categories']]
        kind=next((k for k,values in shop['categories'].items() if any(v in ids for v in values)),None)
        if not kind and category is not None:
            kind=next((k for k,values in shop['categories'].items() if category in values),None)
        if not kind:continue
        currency=raw['prices']['currency_code']
        if currency!=shop['currency']:raise ValueError('Unexpected currency')
        value=int(raw['prices']['price'])/(10**raw['prices']['currency_minor_unit'])
        p=dict(id='p'+str(raw['id']),name=plain(raw['name']),kind=kind,priceValue=value,currency=currency,price=f'{value:.2f}'.replace('.',',')+' €' if currency=='EUR' else f'{value:g} Kč',url=raw['permalink'],photo=f'/assets/plants/{slug}-p{raw["id"]}.jpg',imageSource=raw['images'][0]['src'],sourceEndpoint=source,stock='InStock',checked=TODAY,diameter=None,potDiameter=None)
        if not eligible(p,shop):continue
        text=plain(raw.get('short_description','')+' '+raw.get('description',''))
        if re.search(r'na objedn[aá]vku|p[řr]edobjedn|predobjedn',text,re.I):continue
        # Optional, reviewed seller classification; never infer from a genus.
        description_kind=next((k for k,pattern in shop.get('descriptionKinds',{}).items() if re.search(pattern,text,re.I)),None)
        if description_kind:p['kind']=description_kind
        attrs={a['name']:[v['name'] for v in a['terms']] for a in raw['attributes']}
        # Reuse the existing detail extractor on a synthetic description only.
        p.update(tags=[],facts=[]);p=care(p,text,attrs,cats);p['sourceAttributes']=attrs;p['sourceCategories']=cats;p['sourceStockEvidence']={k:raw.get(k) for k in ['is_in_stock','is_on_backorder','stock_availability']}
        if description_kind:
            p['classificationSource']='seller-description'
            fact=shop.get('descriptionKindFacts',{}).get(description_kind)
            if fact:p['facts'].append(fact);p['reason']=' '.join(p['facts'][:3])
        result.append(p)
    if not shop.get('limits'):return result
    selected=[]
    for kind in shop['kinds']:
        group=sorted([p for p in result if p['kind']==kind],key=lambda p:(p['priceValue'],p['name']))
        limit=shop['limits'].get(kind,len(group))
        if len(group)>limit:group=[group[round(i*(len(group)-1)/(limit-1))] for i in range(limit)]
        selected.extend(group)
    return selected

def shopify_products(shop,slug):
    endpoint=shop['website'].rstrip('/')+'/products.json?limit=250';rows=js(endpoint)['products'];result=[]
    home=fetch(shop['website']).decode(errors='replace')
    currency=re.search(r'Shopify\.currency\s*=\s*\{\s*"active"\s*:\s*"([A-Z]{3})"',home)
    if not currency or currency[1]!=shop['currency']:raise ValueError('Shopify storefront currency not verified')

    for raw in rows:
        cats=raw.get('tags',[]);kind=next((k for k,pattern in shop['categories'].items() if re.search(pattern,raw['product_type']+' '+' '.join(cats)+' '+raw['title'],re.I)),None)
        if not kind or not raw['images']:continue
        text=plain(raw.get('body_html',''))
        if re.search(r'na objedn[aá]vku|p[řr]edobjedn|predobjedn',raw['title']+' '+text,re.I):continue
        stocked=sorted([v for v in raw['variants'] if v['available']],key=lambda v:float(v['price']))
        for v in stocked[:1]:
            value=float(v['price']);title=raw['title']+((' — '+v['title']) if v['title']!='Default Title' else '')
            p=dict(id='v'+str(v['id']),name=title,kind=kind,priceValue=value,currency=shop['currency'],price=f'{value:g} Kč' if shop['currency']=='CZK' else f'{value:.2f}'.replace('.',',')+' €',url=shop['website'].rstrip('/')+'/products/'+raw['handle']+'?variant='+str(v['id']),photo=f'/assets/plants/{slug}-v{v["id"]}.jpg',imageSource=v.get('featured_image',{}).get('src') if v.get('featured_image') else raw['images'][0]['src'],sourceEndpoint=endpoint,stock='InStock',checked=TODAY,diameter=None,potDiameter=None,tags=[],facts=[])
            if eligible(p,shop):
                p['currencySource']=shop['website'];p['sourceCategories']=cats;result.append(care(p,text,{},cats))
    selected=[]
    for kind in shop['kinds']:
        group=sorted([p for p in result if p['kind']==kind],key=lambda p:(p['priceValue'],p['name']))
        limit=shop.get('limits',{}).get(kind,40 if kind=='plants' else 18)
        if len(group)>limit:group=[group[round(i*(len(group)-1)/(limit-1))] for i in range(limit)]
        selected.extend(group)
    return selected

if __name__=='__main__':
    slug=sys.argv[1];shop=json.loads((ROOT/'tools/shops.json').read_text())[slug]
    rows={'shoptet':shoptet_products,'woocommerce':woo_products,'shopify':shopify_products}[shop['platform']](shop,slug)
    out=ROOT/'research'/TODAY;out.mkdir(exist_ok=True)
    save(out/f'{slug}-products.json',rows)
    print('SAVED',slug,len(rows),{k:sum(p['kind']==k for p in rows) for k in shop['kinds']},flush=True)
