"""Shoptet product detail: final price(s) with variant labels, stock,
og:image and short description. python3 tools/shoptet_detail.py URL [...]"""
import html, re, subprocess, sys

def text(fragment):
    return re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', ' ', fragment))).strip()

for url in sys.argv[1:]:
    d = subprocess.run(['curl', '-sSL', '-m', '30', url], capture_output=True).stdout.decode('utf-8', 'replace')
    title = re.search(r'<meta property="og:title" content="([^"]*)', d)
    img = re.search(r'<meta property="og:image" content="([^"?]*)', d)
    i = d.find('p-final-price-wrapper')
    prices = [p.strip() for p in re.findall(r'price-final-holder[^>]*>\s*([^<]+)', d[i:i + 1500])][:4]
    variants = re.findall(r'<option value="\d+"[^>]*>([^<]+)', d)[:5]
    j = d.find('p-detail-inner') if 'p-detail-inner' in d else d.find('p-info')
    stock = [a.strip() for a in re.findall(r'availability-label[^>]*>\s*([^<]+)', d[j:j + 40000])][:3]
    short = re.search(r'class="p-short-description"[^>]*>(.*?)</div>', d, re.S)
    print(f"{url}\n  {html.unescape(title.group(1)) if title else '?'} | {prices} | variants {variants} | {stock}\n  {img.group(1) if img else ''}\n  {text(short.group(1))[:260] if short else ''}")
