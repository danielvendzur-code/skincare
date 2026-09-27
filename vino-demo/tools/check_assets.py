"""Static checks for every new brand: files exist, logos and marks have
transparent corners (no plate behind the letters), packshots and hero have
the engine's geometry. python3 tools/check_assets.py"""
import re, sys
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
config = (ROOT / 'nove-znacky-config.js').read_text()
problems = []
for slug in re.findall(r"^    ([a-z0-9]+): \{", config, re.M):
    block = config[config.index(f'    {slug}: {{'):]
    block = block[:block.index('\n    }')]
    paths = set(re.findall(r"/assets/vino/[a-z0-9-]+\.(?:png|jpg)", block))
    paths |= {f'/assets/vino/{slug}-{pid}.jpg' for pid in re.findall(r"photo:photo\('[a-z0-9]+','([a-z0-9]+)'\)", block)}
    paths.add(f'/assets/vino/{slug}-logo.png')
    for rel in sorted(paths):
        f = ROOT / rel.lstrip('/')
        if not f.exists():
            problems.append(f'{slug}: missing {rel}'); continue
        im = Image.open(f)
        if f.suffix == '.png':
            a = im.convert('RGBA').getchannel('A')
            corners = [a.getpixel(p) for p in [(0, 0), (im.width - 1, 0), (0, im.height - 1), (im.width - 1, im.height - 1)]]
            if max(corners) > 10: problems.append(f'{slug}: {rel} has an opaque plate (corner alpha {corners})')
        elif rel.endswith(f'/{slug}.jpg'):
            if im.size != (1000, 1120): problems.append(f'{slug}: hero {im.size}')
        elif im.size != (760, 1095):
            problems.append(f'{slug}: packshot {rel} {im.size}')
print('\n'.join(problems) or 'assets ok')
sys.exit(1 if problems else 0)
