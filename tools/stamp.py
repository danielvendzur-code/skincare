"""Stamp every local .js/.css reference in the demo pages with a hash of that
file's contents, so a browser or CDN never serves an old copy after an edit.
Hand-written versions (?v=vino1, ?v=20260914b) did not change when the file
did. Run after any change:  python3 tools/stamp.py [--check]"""
import hashlib, re, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CHECK = '--check' in sys.argv
REF = re.compile(r'''(["'])(/[A-Za-z0-9_\-./]+\.(?:js|css))(?:\?v=[0-9A-Za-z]+)?\1''')
changed = []
for site in ('vino-demo', 'kozmetika-nove', 'vlasy-nove'):
    base = ROOT / site
    def stamp(match):
        quote, path = match.group(1), match.group(2)
        file = base / path.lstrip('/')
        if not file.is_file():
            return match.group(0)
        digest = hashlib.sha1(file.read_bytes()).hexdigest()[:8]
        return f'{quote}{path}?v={digest}{quote}'
    for page in base.glob('*.html'):
        before = page.read_text()
        after = REF.sub(stamp, before)
        if after != before:
            changed.append(str(page.relative_to(ROOT)))
            if not CHECK:
                page.write_text(after)
if CHECK and changed:
    sys.exit('Not stamped for current contents:\n  ' + '\n  '.join(changed))
print('stamped:', ', '.join(changed) if changed else 'nothing to change')
