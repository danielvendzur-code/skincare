"""Short and long description of Shoptet products (first N chars), to write
advisor reasons from the brand's own words. python3 tools/shoptet_text.py N URL..."""
import html, re, subprocess, sys
def text(f): return re.sub(r'\s+', ' ', html.unescape(re.sub(r'<(script|style)[^>]*>.*?</\1>|<[^>]+>', ' ', f, flags=re.S))).strip()
n = int(sys.argv[1])
for url in sys.argv[2:]:
    d = subprocess.run(['curl', '-sSL', '-m', '30', url], capture_output=True).stdout.decode('utf-8', 'replace')
    short = re.search(r'class="p-short-description"[^>]*>(.*?)</div>', d, re.S)
    long_ = re.search(r'id="description"[^>]*>(.*?)(<div[^>]+id="(?:productDiscussion|ratingTab|productsAlternative)|class="extended-description)', d, re.S)
    meta = re.search(r'<meta name="description" content="([^"]*)', d)
    print('##', url.rstrip('/').split('/')[-1])
    print('  short:', text(short.group(1))[:n] if short else '-')
    print('  long :', text(long_.group(1))[:n] if long_ else (html.unescape(meta.group(1)) if meta else '-'))
