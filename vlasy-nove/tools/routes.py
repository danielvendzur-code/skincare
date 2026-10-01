"""Write <slug>/index.html redirects and the host lists in vercel.json and
.htaccess for every brand in nove-znacky-config.js. Run after adding a brand."""
import json, re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
config = (ROOT / 'nove-znacky-config.js').read_text()
brands = re.findall(r"^    ([a-z0-9]+): \{\n      name:'([^']+)'", config, re.M)
slugs = [slug for slug, _ in brands]

for slug, name in brands:
    target = f'/cosmetics.html?demo={slug}'
    (ROOT / slug).mkdir(exist_ok=True)
    (ROOT / slug / 'index.html').write_text(f'''<!doctype html>
<html lang="sk">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>{name}</title>
<link rel="canonical" href="{target}">
<meta http-equiv="refresh" content="0;url={target}">
<script>location.replace('{target}');</script>
</head>
<body><p>Presmerovanie na <a href="{target}">{name}</a>…</p></body>
</html>
''')

hosts = '|'.join(slugs)
vercel = {
    '$schema': 'https://openapi.vercel.sh/vercel.json',
    'rewrites': [
        {'source': '/', 'has': [{'type': 'host', 'value': f'^(?<sub>{hosts})\\.mojchatbot\\.sk$'}], 'destination': '/cosmetics.html'},
        {'source': '/kozmetika/:slug', 'destination': '/cosmetics.html'},
        {'source': '/kozmetika/:slug/', 'destination': '/cosmetics.html'},
    ],
    'headers': [
        {'source': '/(.*)', 'headers': [{'key': 'X-Robots-Tag', 'value': 'noindex, nofollow, noarchive'}]},
        {'source': '/(.*)\\.(html|js|css)', 'headers': [{'key': 'Cache-Control', 'value': 'public, max-age=0, must-revalidate'}]},
        {'source': '/api/(.*)', 'headers': [{'key': 'Cache-Control', 'value': 'no-store'}]},
    ],
}
(ROOT / 'vercel.json').write_text(json.dumps(vercel, ensure_ascii=False, indent=2) + '\n')

(ROOT / '.htaccess').write_text(f'''Options -MultiViews
RewriteEngine On

# <slug>.mojchatbot.sk opens that brand's demo at the root.
RewriteCond %{{HTTP_HOST}} ^({hosts})\\.mojchatbot\\.sk$ [NC]
RewriteRule ^$ cosmetics.html [L]

# /kozmetika/<slug> works too; the page reads the slug from the path.
RewriteRule ^kozmetika/[a-z0-9-]+/?$ cosmetics.html [L,NC]

<IfModule mod_headers.c>
  Header set X-Robots-Tag "noindex, nofollow, noarchive"
</IfModule>
''')

cards = '\n'.join(f'      <li><a href="/{slug}/"><b>{name}</b><span>{slug}.mojchatbot.sk</span></a></li>' for slug, name in brands)
(ROOT / 'index.html').write_text(f'''<!doctype html>
<html lang="sk">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow,noarchive">
<title>Nové vlasové ukážky</title>
<link rel="stylesheet" href="/assets/fonts/fonts.css?v=43ec8a95">
<style>
  :root {{ --ink:#1f1d1c; --muted:#6f6a66; --line:#e6e1dc; --paper:#fbfaf8; }}
  * {{ box-sizing:border-box; }}
  body {{ margin:0; background:var(--paper); color:var(--ink); font-family:'DM Sans',system-ui,sans-serif; }}
  main {{ width:min(880px,100% - 32px); margin:0 auto; padding:56px 0 64px; }}
  h1 {{ margin:0 0 6px; font-size:clamp(28px,5vw,40px); letter-spacing:-.02em; }}
  p {{ margin:0 0 28px; color:var(--muted); }}
  ul {{ list-style:none; margin:0; padding:0; display:grid; grid-template-columns:repeat(auto-fill,minmax(240px,1fr)); gap:10px; }}
  a {{ display:grid; gap:3px; padding:16px 18px; border:1px solid var(--line); border-radius:14px; background:#fff; color:inherit; text-decoration:none; }}
  a:hover {{ border-color:var(--ink); }}
  span {{ color:var(--muted); font-size:13px; }}
</style>
</head>
<body>
  <main>
    <h1>Nové vlasové ukážky</h1>
    <p>Chatbot a výber vlasovej starostlivosti pre {len(brands)} e-shopov.</p>
    <ul>
{cards}
    </ul>
  </main>
</body>
</html>
''')
print('routes for', ', '.join(slugs))
