"""Shoptet "simple variants" without a browser: every variant's label, final
price, stock (matched by data-index) and big image; single-price products
print their one price. python3 tools/shoptet_variants.py URL [URL...]"""
import html, re, subprocess, sys

def text(fragment):
    return re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', ' ', fragment))).strip()

for url in sys.argv[1:]:
    d = subprocess.run(['curl', '-sSL', '-m', '30', url], capture_output=True).stdout.decode('utf-8', 'replace')
    title = re.search(r'<h1[^>]*>(.*?)</h1>', d, re.S)
    print(url, '\n ', text(title.group(1)) if title else '?')
    stock = {m.group(1): text(m.group(2)) for m in re.finditer(r'choose-variant\s+no-display (\d+)">\s*<span class="availability-label"[^>]*>(.*?)</span>', d, re.S)}
    labels = re.findall(r'show-tooltip" title="([^"]+)".*?data-customerprice="([\d.]+)"data-big="([^"?]+).*?data-index="(\d+)"', d, re.S)
    for label, price, big, index in labels:
        print(f'   {html.unescape(label)} | {price} | {stock.get(index, "?")} | {big}')
    if not labels:
        i = d.find('p-final-price-wrapper')
        price = re.findall(r'price-final-holder[^>]*>\s*([^<]+)', d[i:i + 1500])[:1]
        avail = re.findall(r'availability-label[^>]*>\s*([^<]+)', d[d.find('p-detail-inner'):][:40000])[:1]
        img = re.search(r'<meta property="og:image" content="([^"?]*)', d)
        select = re.findall(r'<option value="(\d+)"[^>]*data-customerprice="([\d.]+)"[^>]*>([^<]+)', d)
        print(f'   single | {price} | {avail} | {img.group(1) if img else ""}')
        for _, p, lab in select: print(f'   option {lab.strip()} | {p}')
