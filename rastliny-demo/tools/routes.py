"""Generate directory, host and /rastliny/<slug> routes from canonical data."""
import json,html
from pathlib import Path
ROOT=Path(__file__).resolve().parent.parent
additions=json.loads((ROOT/'tools/shops.json').read_text()) if (ROOT/'tools/shops.json').exists() else {}
order=['plantizia','gardenholice','lukscheiter',*additions]
brands=[json.loads(p.read_text()) for p in sorted((ROOT/'data').glob('*.json'),key=lambda p:order.index(p.stem) if p.stem in order else len(order))]
slugs=[b['slug'] for b in brands]
for b in brands:
 slug=b['slug'];target='/cosmetics.html?demo='+slug
 d=ROOT/slug;d.mkdir(exist_ok=True)
 (d/'index.html').write_text(f'<!doctype html><html lang="sk"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>{html.escape(b["name"])}</title><meta http-equiv="refresh" content="0;url={target}"><script>location.replace({json.dumps(target)});</script><a href="{target}">{html.escape(b["name"])}</a></html>\n')
vercel={'$schema':'https://openapi.vercel.sh/vercel.json','rewrites':[
 {'source':'/','has':[{'type':'host','value':'^(?<sub>'+('|'.join(slugs))+r')\.mojchatbot\.sk$'}],'destination':'/cosmetics.html'},
 {'source':'/rastliny/:slug','destination':'/cosmetics.html'},
 {'source':'/rastliny/:slug/','destination':'/cosmetics.html'}],
 'headers':[{'source':'/(.*)','headers':[{'key':'X-Robots-Tag','value':'noindex, nofollow, noarchive'}]},
 {'source':'/(.*)\\.(html|js|mjs|css)','headers':[{'key':'Cache-Control','value':'public, max-age=0, must-revalidate'}]},
 {'source':'/api/(.*)','headers':[{'key':'Cache-Control','value':'no-store'}]}]}
(ROOT/'vercel.json').write_text(json.dumps(vercel,indent=2)+'\n')
(ROOT/'.htaccess').write_text('Options -MultiViews\nRewriteEngine On\nRewriteCond %{HTTP_HOST} ^('+('|'.join(slugs))+r')\.mojchatbot\.sk$ [NC]'+'\nRewriteRule ^$ cosmetics.html [L]\nRewriteRule ^rastliny/[a-z0-9-]+/?$ cosmetics.html [L,NC]\n<IfModule mod_headers.c>\nHeader set X-Robots-Tag "noindex, nofollow, noarchive"\n</IfModule>\n')
cards=''.join(f'<li><a href="/{b["slug"]}/"><img src="{b["hero"]}" alt=""><div><b>{html.escape(b["name"])}</b><span>{len(b["products"])} produktov · {len(b["kinds"])} kategórie</span></div><em>Vyskúšať →</em></a></li>' for b in brands)
(ROOT/'index.html').write_text('''<!doctype html><html lang="sk"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow,noarchive"><title>Rastliny · ukážky chatbotov</title><link rel="stylesheet" href="/assets/fonts/fonts.css"><style>*{box-sizing:border-box}body{margin:0;font-family:'DM Sans',system-ui,sans-serif;background:#fafbf7;color:#18271d}main{width:min(1000px,100% - 40px);margin:auto;padding:64px 0}small{color:#035d30;letter-spacing:.12em;text-transform:uppercase;font-weight:800}h1{font-size:clamp(32px,5vw,58px);line-height:1.03;letter-spacing:-.04em;max-width:15ch;margin:20px 0}p{color:#5a665b;line-height:1.6;max-width:52ch}ul{padding:0;list-style:none;display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:20px;margin-top:36px}a{display:block;border:1px solid #d4dfd2;border-radius:22px;overflow:hidden;background:#fff;color:inherit;text-decoration:none}a>img{width:100%;height:225px;object-fit:contain;background:#eef3e9}a>div{padding:20px 20px 8px}b{font-size:22px}span{display:block;margin-top:6px;color:#586358;font-size:13px}em{display:block;padding:12px 20px 20px;font-size:13px;font-style:normal;color:#035d30}a:hover{border-color:#035d30}footer{margin-top:36px;font-size:12px;color:#657065}</style></head><body><main><small>Nový segment · SK / CZ</small><h1>Poradca pre zelenší domov.</h1><p>Výber rastliny podľa svetla a starostlivosti. Črepníky a substráty podľa skutočnej ponuky malých e-shopov.</p><ul>'''+cards+'</ul><footer>Ukážky riešenia mojchatbot.sk · Ceny a sklad: dátum overenia v každej ukážke</footer></main><script>const slug=location.hostname.split(".")[0];if('+json.dumps(slugs)+'.includes(slug)&&location.hostname.endsWith(".mojchatbot.sk"))location.replace("/cosmetics.html?demo="+slug);</script></body></html>\n')
print('routes:',', '.join(slugs))
