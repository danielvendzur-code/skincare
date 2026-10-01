"""Readable text of a product page after a marker (first N chars), for
shops whose description is not in meta tags: python3 tools/page_text.py N MARKER URL..."""
import html, re, subprocess, sys
n, marker = int(sys.argv[1]), sys.argv[2]
for url in sys.argv[3:]:
    d = subprocess.run(['curl', '-sSL', '-m', '30', url], capture_output=True).stdout.decode('utf-8', 'replace')
    t = re.sub(r'\s+', ' ', html.unescape(re.sub(r'<(script|style|noscript)[^>]*>.*?</\1>|<[^>]+>', ' ', d, flags=re.S)))
    i = t.find(marker, t.find('<h1') if '<h1' in t else 0)
    print('##', url.rstrip('/').split('/')[-1]); print('  ', t[i:i + n] if i >= 0 else t[:n])
