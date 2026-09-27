"""Append a winery to README.md and ZDROJE.md.
python3 tools/add_docs.py SLUG 'Name' 'domain' 'website' notes.txt rows.tsv
rows.tsv: name<TAB>price<TAB>url per line."""
import sys
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent
slug, name, domain, web, notes, rows = sys.argv[1:7]
readme = (ROOT / 'README.md').read_text().rstrip('\n') + f'\n| {name} | [{domain}]({web}) | `/{slug}/` · `{slug}.mojchatbot.sk` |\n'
(ROOT / 'README.md').write_text(readme)
body = Path(notes).read_text().strip()
table = '\n'.join('| ' + ' | '.join(line.split('\t')) + ' |' for line in Path(rows).read_text().strip().splitlines())
(ROOT / 'ZDROJE.md').write_text((ROOT / 'ZDROJE.md').read_text().rstrip('\n') + f'\n\n## {name} — {domain}\n\n{body}\n\n| víno | cena | stránka |\n| --- | --- | --- |\n{table}\n')
