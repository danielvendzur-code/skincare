"""Read public shop pages with a disk cache; preserve a reproducible snapshot."""
import hashlib, json, subprocess
from pathlib import Path
from bs4 import BeautifulSoup

from datetime import date
CACHE = Path('/tmp/rastliny-source-'+date.today().strftime('%Y%m%d'))
CACHE.mkdir(exist_ok=True)

def fetch(url, refresh=False):
    p = CACHE / (hashlib.sha256(url.encode()).hexdigest() + '.body')
    if p.exists() and not refresh:
        return p.read_bytes()
    r = subprocess.run(['curl', '-fsSL', '--compressed', '--max-time', '22', url],
        capture_output=True)
    if r.returncode:
        raise RuntimeError(f'{url}: {r.stderr.decode(errors="replace")[-150:]}')
    p.write_bytes(r.stdout)
    return r.stdout

def js(url):
    return json.loads(fetch(url))

def soup(url):
    return BeautifulSoup(fetch(url), 'html.parser')

def plain(html):
    return BeautifulSoup(html or '', 'html.parser').get_text(' ', strip=True)

def save(path, data):
    Path(path).write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n')
