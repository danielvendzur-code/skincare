"""Build demo assets from official brand files.

python3 tools/make_assets.py SLUG SOFT_HEX LOGO_SRC id=packshot [id=packshot ...]

* assets/cosmetics/SLUG-ID.jpg  760x1095 packshot, trimmed and centred on white
  so neither the portrait result card nor the landscape option tile cuts it.
* assets/cosmetics/SLUG.jpg     1000x1120 hero: first four packshots as 2x2
  white tiles on the brand's soft colour (same geometry as the older demos).
* assets/cosmetics/SLUG-logo.png transparent logo, trimmed.
"""
import sys
from pathlib import Path
from PIL import Image, ImageChops, ImageOps

OUT = Path(__file__).resolve().parent.parent / 'assets' / 'cosmetics'

def hex_rgb(value):
    value = value.lstrip('#')
    return tuple(int(value[i:i + 2], 16) for i in (0, 2, 4))

def flat(img):
    """RGB on white (transparent pixels become white)."""
    img = ImageOps.exif_transpose(img)
    if img.mode in ('RGBA', 'LA', 'P'):
        img = img.convert('RGBA')
        base = Image.new('RGBA', img.size, (255, 255, 255, 255))
        base.alpha_composite(img)
        return base.convert('RGB')
    return img.convert('RGB')

def trim(img, tolerance=18):
    """Crop to everything that is not (near) the corner background colour."""
    bg = Image.new('RGB', img.size, img.getpixel((1, 1)))
    diff = ImageChops.difference(img, bg).convert('L').point(lambda v: 255 if v > tolerance else 0)
    box = diff.getbbox()
    return img.crop(box) if box else img

def fit_on(img, size, box, color=(255, 255, 255), dy=0):
    canvas = Image.new('RGB', size, color)
    scale = min(box[0] / img.width, box[1] / img.height)
    resized = img.resize((max(1, round(img.width * scale)), max(1, round(img.height * scale))), Image.LANCZOS)
    canvas.paste(resized, ((size[0] - resized.width) // 2, (size[1] - resized.height) // 2 + dy))
    return canvas

def packshot(src, target, box=(600, 860)):
    img = trim(flat(Image.open(src)))
    fit_on(img, (760, 1095), box).save(target, quality=90, optimize=True)
    return img

def logo(src, target):
    img = Image.open(src).convert('RGBA')
    alpha = img.getchannel('A')
    if alpha.getextrema()[0] == 255:  # no transparency: key out the corner colour
        bg = img.getpixel((1, 1))[:3]
        px = img.load()
        for y in range(img.height):
            for x in range(img.width):
                r, g, b, a = px[x, y]
                d = max(abs(r - bg[0]), abs(g - bg[1]), abs(b - bg[2]))
                if d < 40: px[x, y] = (r, g, b, int(a * max(0, d - 10) / 30))
    box = img.getchannel('A').point(lambda v: 255 if v > 8 else 0).getbbox()
    img = img.crop(box)
    if img.height > 220:
        img = img.resize((round(img.width * 220 / img.height), 220), Image.LANCZOS)
    img.save(target, optimize=True)

def hero(shots, soft, target):
    canvas = Image.new('RGB', (1000, 1120), soft)
    spots = [(50, 80), (515, 80), (50, 605), (515, 605)]
    for img, spot in zip(shots, spots):
        canvas.paste(fit_on(img, (435, 435), (290, 340)), spot)
    canvas.save(target, quality=90, optimize=True)

if __name__ == '__main__':
    slug, soft, logo_src, *pairs = sys.argv[1:]
    OUT.mkdir(parents=True, exist_ok=True)
    shots = []
    for pair in pairs:
        pid, src = pair.split('=', 1)
        shots.append(packshot(src, OUT / f'{slug}-{pid}.jpg'))
    hero(shots[:4], hex_rgb(soft), OUT / f'{slug}.jpg')
    logo(logo_src, OUT / f'{slug}-logo.png')
    print('ok', slug, len(shots), 'packshots')

def mark(src, box, target):
    """Square brand symbol cut from the official logo (for launcher/avatars)."""
    img = Image.open(src).convert('RGBA').crop(box)
    bb = img.getchannel('A').point(lambda v: 255 if v > 8 else 0).getbbox()
    img = img.crop(bb)
    side = max(img.size)
    square = Image.new('RGBA', (side, side), (0, 0, 0, 0))
    square.paste(img, ((side - img.width) // 2, (side - img.height) // 2))
    square.save(target, optimize=True)
