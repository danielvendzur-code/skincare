"""Recheck the reviewed ABIES selection against exact live product offers."""
import concurrent.futures as futures
import hashlib,json,re
from datetime import date
from pathlib import Path
from urllib.parse import urljoin
from net import soup,js,save

ROOT=Path(__file__).resolve().parent.parent
TODAY=date.today().isoformat()
b=json.loads((ROOT/'data/abies.json').read_text())

def read(p):
    s=soup(p['url'])
    offer=s.select_one('[itemscope][itemtype$="Offer"]')
    assert offer,p['name']+' missing offer'
    price=offer.select_one('[itemprop="price"]')
    currency=offer.select_one('[itemprop="priceCurrency"]')
    availability=offer.select_one('[itemprop="availability"]')
    assert currency['content']=='EUR'
    assert availability['href'].endswith('/InStock')
    text=s.get_text(' ',strip=True)
    qty=re.search(r'Aktuálny počet kusov skladom:\s*(\d+)',text)
    assert qty and int(qty[1])>0,p['name']+' out of stock'
    form=s.select_one('form[action="/nakupny-kosik/"]')
    assert form and form.select_one('input[type="submit"][value="OBJEDNAŤ"]')
    assert form.select_one('input[name="r_0"]')['value']==p['id'][1:]
    value=float(price['content']);p.update(priceValue=value,price=f'{value:.2f}'.replace('.',',')+' €',checked=TODAY)
    assigned={urljoin(p['url'],x.get('href',x.get('src',''))) for x in s.select('a[href],img[src]')}
    assert p['imageSource'] in assigned,p['name']+' photo no longer assigned'
    p['sourceStockEvidence']={'availability':'InStock','quantity':int(qty[1]),'activeOrderForm':True}
    p['descriptionSha256']=hashlib.sha256(text.encode()).hexdigest()
    return p

with futures.ThreadPoolExecutor(max_workers=3) as pool:rows=list(pool.map(read,b['products']))
out=ROOT/'research'/TODAY;out.mkdir(exist_ok=True)
save(out/'abies-products.json',rows)
rpo='https://api.statistics.sk/rpo/v1/entity/259038'
unit='https://www.registeruz.sk/cruz-public/api/uctovna-jednotka?id=564653'
report='https://www.registeruz.sk/cruz-public/api/uctovny-vykaz?id=10333346'
r=js(rpo);u=js(unit);v=js(report)
assert v['idSablony']==687 and v['obsah']['titulnaStrana']['obdobieDo']=='2025-12'
income=v['obsah']['tabulky'][2]['data']
assert int(income[2])+int(income[4])==379770
owners=[x['personName']['formatedName'] for x in r['stakeholders'] if not x.get('validTo')]
executives=[x['personName']['formatedName'] for x in r['statutoryBodies'] if not x.get('validTo')]
assert u['velkostOrganizacie']=='03'
save(out/'abies-registry.json',dict(checked=TODAY,company=r['fullNames'][0]['value'],ico='35828501',owners=owners,executives=executives,employees=dict(code='03',range='2',source=unit,recordUpdated=u.get('datumPoslednejUpravy','2026-07-03')),revenue=dict(value=379770,currency='EUR',year=2025,source=report,note='MÚJ 687, tabuľka Výkaz ziskov a strát: tržby za tovar 182541 € + vlastné výrobky a služby 197229 €; prvý riadok všetkých výnosov 412785 € nie je obrat.'),ownersSource=rpo,note='RPO súčasní vlastníci a konatelia; VOP staršie sídlo s rovnakým IČO. Odrodové fotografie nie sú portrétom dodávanej sadenice.'))
print('ABIES verified',len(rows),'stocked products',TODAY)
