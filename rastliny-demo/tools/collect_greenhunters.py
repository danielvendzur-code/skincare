"""Official Woo variations: exact stocked size, CZK price and assigned photo.

The public API discovers plants; the seller's product form verifies each SKU.
An explicit storefront currency parameter prevents mixing CZK and EUR prices.
"""
import concurrent.futures, json, re, sys
from datetime import date
from pathlib import Path
from urllib.parse import urlencode
from net import js, soup, plain, save
from collect_addition import care

ROOT = Path(__file__).resolve().parent.parent
TODAY = date.today().isoformat()
SLUG = 'greenhunters'
SHOP = json.loads((ROOT/'tools/shops.json').read_text())[SLUG]
BASE = SHOP['website']

def stocked_variation(v):
    return (v.get('is_in_stock') is True and v.get('is_purchasable') is True
            and v.get('variation_is_active') is True and v.get('variation_is_visible') is True
            and v.get('backorders_allowed') is False and float(v.get('display_price', 0)) > 0
            and not re.search(r'out-of-stock|onbackorder', v.get('availability_html', '')))

def collect():
    raw = {}
    endpoint = BASE + 'wp-json/wc/store/v1/products?per_page=100'
    for category in dict.fromkeys(c for values in SHOP['categories'].values() for c in values):
        source = endpoint + '&category=' + str(category)
        for p in js(source):
            raw.setdefault(p['id'], (p, source))
    selected = []
    for kind, categories in SHOP['categories'].items():
        group = [(p, source, kind) for p, source in raw.values()
                 if any(c['id'] in categories for c in p['categories'])
                 and p['is_in_stock'] and p['is_purchasable'] and not p['is_on_backorder']
                 and not re.search(SHOP['exclude'], plain(p['name']), re.I)]
        group.sort(key=lambda row: (int(row[0]['prices']['price']), row[0]['name']))
        limit = SHOP['limits'][kind]
        if len(group) > limit:
            group = [group[round(i*(len(group)-1)/(limit-1))] for i in range(limit)]
        selected.extend(group)
        print(kind, len(group), 'details', flush=True)

    def detail(row):
        p, source, kind = row
        try:
            url = p['permalink'] + '?currency=CZK'
            s = soup(url)
            symbols = {x.get_text(strip=True) for x in s.select('.summary .woocommerce-Price-currencySymbol')}
            if symbols != {'Kč'}:
                return None
            description = plain(p.get('short_description', '')+' '+p.get('description', ''))
            if re.search(r'na objedn[aá]vku|p[řr]edobjedn', description, re.I):
                return None
            form = s.select_one('[data-product_variations]')
            variant = None
            label = None
            if p['type'] == 'variable':
                if not form or form.get('data-product_variations') in [None, 'false']:
                    return None
                choices = [v for v in json.loads(form['data-product_variations']) if stocked_variation(v)]
                if not choices:
                    return None
                variant = min(choices, key=lambda v: float(v['display_price']))
                labels = []
                for key, value in variant['attributes'].items():
                    if not value:
                        return None
                    option = s.select_one('select[name="'+key+'"] option[value="'+value+'"]')
                    if not option:
                        return None
                    labels.append(option.get_text(' ', strip=True))
                label = ' / '.join(labels)
                url = p['permalink']+'?'+urlencode({'currency':'CZK', **variant['attributes']})
                identity = 'v'+str(variant['variation_id'])
                value = float(variant['display_price'])
                image = variant.get('image', {}).get('full_src') or variant.get('image', {}).get('url')
                if not image:
                    return None
            elif p['type'] == 'simple':
                if not s.select_one('.summary .stock.in-stock') or not s.select_one('.single_add_to_cart_button'):
                    return None
                if p['prices']['currency_code'] != 'CZK':
                    return None
                identity = 'p'+str(p['id'])
                value = int(p['prices']['price'])/10**p['prices']['currency_minor_unit']
                image = p['images'][0]['src']
            else:
                return None
            product = dict(id=identity, parentId=p['id'], name=plain(p['name'])+((' — '+label) if label else ''),
                kind=kind, currency='CZK', priceValue=value, price=f'{value:g} Kč', url=url,
                photo=f'/assets/plants/{SLUG}-{identity}.jpg', imageSource=image,
                sourceEndpoint=source, sourceDetail=p['permalink']+'?currency=CZK', stock='InStock', checked=TODAY,
                tags=[], facts=[], diameter=None, potDiameter=None)
            if variant:
                product.update(variantId=variant['variation_id'], variantLabel=label,
                    sourceStockEvidence={k:variant[k] for k in ['is_in_stock','is_purchasable','backorders_allowed','availability_html']},
                    variantSize=plain(variant.get('variation_description', '')))
            cats=[c['name'] for c in p['categories']]
            product=care(product, description, {}, cats)
            if label:
                product['facts'].insert(0, 'Variant predajcu: '+label+('. '+product['variantSize'] if product.get('variantSize') else '.'))
                product['reason']=' '.join(product['facts'][:3])
            product['sourceCategories']=cats
            return product
        except Exception as e:
            print('Excluded', p['name'], str(e)[-120:], flush=True)
            return None
    with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:
        return [p for p in pool.map(detail, selected) if p
                and p['id'] not in SHOP.get('photoExcludeIds', [])]

if __name__ == '__main__':
    products=collect()
    dest=ROOT/'research'/TODAY;dest.mkdir(exist_ok=True)
    save(dest/(SLUG+'-products.json'), products)
    print('SAVED', len(products), {k:sum(p['kind']==k for p in products) for k in SHOP['kinds']}, flush=True)
