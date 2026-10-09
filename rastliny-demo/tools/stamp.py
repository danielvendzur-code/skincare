"""Content stamp includes module dependencies, so catalogue edits invalidate UI."""
import hashlib,re
from pathlib import Path
ROOT=Path(__file__).resolve().parent.parent
files=[ROOT/'cosmetics.js',ROOT/'advisor.mjs',ROOT/'catalog-data.mjs',ROOT/'nove-znacky-config.js']
stamp=hashlib.sha256(b''.join(p.read_bytes() for p in files)).hexdigest()[:10]
p=ROOT/'cosmetics.html';s=p.read_text()
for match in set(re.findall(r'(?:href|src)="(/[^"?]+)\?v=[^"]+"',s)):
 f=ROOT/match.lstrip('/');v=stamp if f.suffix in ['.js','.mjs'] else hashlib.sha256(f.read_bytes()).hexdigest()[:10]
 s=re.sub(re.escape(match)+r'\?v=[^"\s]+',match+'?v='+v,s)
p.write_text(s);print('stamp',stamp)
