"""Read name, price and main image of product pages (og tags + JSON-LD).

Usage: python3 tools/probe.py URL [URL ...]
"""
import json, re, subprocess, sys, html

def fetch(url):
    return subprocess.run(['curl', '-sSL', '-m', '30', '-A', 'Mozilla/5.0 (X11; Linux x86_64) Chrome/126 Safari/537.36', url],
                          capture_output=True).stdout.decode('utf-8', 'replace')

def meta(doc, prop):
    for pat in (rf'<meta[^>]+(?:property|name)=["\']{prop}["\'][^>]*content=["\']([^"\']*)',
                rf'<meta[^>]+content=["\']([^"\']*)["\'][^>]*(?:property|name)=["\']{prop}["\']'):
        m = re.search(pat, doc, re.I)
        if m: return html.unescape(m.group(1)).strip()
    return ''

def ld_products(doc):
    out = []
    for block in re.findall(r'<script[^>]+application/ld\+json[^>]*>(.*?)</script>', doc, re.S | re.I):
        try: data = json.loads(block.strip())
        except Exception: continue
        stack = data if isinstance(data, list) else [data]
        while stack:
            item = stack.pop()
            if isinstance(item, dict):
                if '@graph' in item: stack.extend(item['@graph'])
                t = item.get('@type')
                if t == 'Product' or (isinstance(t, list) and 'Product' in t): out.append(item)
            elif isinstance(item, list): stack.extend(item)
    return out

for url in sys.argv[1:]:
    doc = fetch(url)
    name = meta(doc, 'og:title'); image = meta(doc, 'og:image')
    price = meta(doc, 'product:price:amount') or meta(doc, 'og:price:amount')
    cur = meta(doc, 'product:price:currency')
    for p in ld_products(doc):
        name = p.get('name') or name
        img = p.get('image'); img = img[0] if isinstance(img, list) else img
        if isinstance(img, dict): img = img.get('url')
        image = img or image
        offers = p.get('offers'); offers = offers[0] if isinstance(offers, list) else offers
        if isinstance(offers, dict):
            price = offers.get('price') or offers.get('lowPrice') or price
            cur = offers.get('priceCurrency') or cur
        break
    print(json.dumps({'url': url, 'name': html.unescape(str(name)), 'price': str(price), 'currency': cur, 'image': image}, ensure_ascii=False))
