"""List products of Shoptet category pages: name | price | availability | url.
python3 tools/shoptet_list.py https://shop.tld/category/ [...]"""
import html, re, subprocess, sys
from urllib.parse import urljoin

for url in sys.argv[1:]:
    doc = subprocess.run(['curl', '-sSL', '-m', '30', url], capture_output=True).stdout.decode('utf-8', 'replace')
    for block in re.split(r'<div class="product\b', doc)[1:]:
        block = block[:6000]
        link = re.search(r'<a\s+href="([^"]+)"\s+class="name"', block) or re.search(r'class="name"[^>]*href="([^"]+)"', block)
        name = re.search(r'data-testid="productCardName">\s*([^<]+)', block) or re.search(r'<span[^>]*>\s*([^<]{4,120})</span>\s*</a>', block)
        price = re.search(r'price-final[^>]*>\s*(?:<strong>)?\s*([^<]+)', block)
        avail = re.search(r'availability[^>]*>\s*(?:<span[^>]*>)?\s*([^<]+)', block)
        if link:
            print(' | '.join([html.unescape(name.group(1).strip()) if name else '?', price.group(1).strip() if price else '?',
                              avail.group(1).strip() if avail else '?', urljoin(url, link.group(1))]))
