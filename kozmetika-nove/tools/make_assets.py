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

def cover(img, size, focus=(0.5, 0.5)):
    """Fill `size` completely (a styled photo, not a packshot), cropping
    around `focus` given as fractions of the source."""
    scale = max(size[0] / img.width, size[1] / img.height)
    resized = img.resize((round(img.width * scale), round(img.height * scale)), Image.LANCZOS)
    left = min(max(0, round(resized.width * focus[0] - size[0] / 2)), resized.width - size[0])
    top = min(max(0, round(resized.height * focus[1] - size[1] / 2)), resized.height - size[1])
    return resized.crop((left, top, left + size[0], top + size[1]))

def packshot(src, target, box=(600, 860)):
    """Canvas takes the photo's own backdrop colour, so a studio grey never
    leaves a lighter frame around the product. `photo.jpg@cover[:fx,fy]`
    marks a styled photo that fills the frame instead."""
    if '@cover' in src:
        path, _, focus = src.partition('@cover')
        fx, fy = (float(v) for v in focus.lstrip(':').split(',')) if focus else (0.5, 0.5)
        img = flat(Image.open(path))
        cover(img, (760, 1095), (fx, fy)).save(target, quality=90, optimize=True)
        img.cover_focus = (fx, fy)
        return img
    source = flat(Image.open(src))
    backdrop = source.getpixel((1, 1))
    img = trim(source)
    img.backdrop = backdrop
    fit_on(img, (760, 1095), box, color=backdrop).save(target, quality=90, optimize=True)
    return img

def padded(box, size, pad=3):
    return (max(0, box[0] - pad), max(0, box[1] - pad), min(size[0], box[2] + pad), min(size[1], box[3] + pad))

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
    img = img.crop(padded(box, img.size))
    if img.height > 220:
        img = img.resize((round(img.width * 220 / img.height), 220), Image.LANCZOS)
    img.save(target, optimize=True)

def hero(shots, soft, target):
    canvas = Image.new('RGB', (1000, 1120), soft)
    spots = [(50, 80), (515, 80), (50, 605), (515, 605)]
    for img, spot in zip(shots, spots):
        tile = cover(img, (435, 435), img.cover_focus) if hasattr(img, 'cover_focus') else \
            fit_on(img, (435, 435), (290, 340), color=getattr(img, 'backdrop', (255, 255, 255)))
        canvas.paste(tile, spot)
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

def mono_logo(src, target):
    """One-colour logo captured on a light background: alpha from darkness,
    colour from the darkest pixels (clean edges, no plate behind the text)."""
    img = Image.open(src).convert('RGBA')
    flat_img = Image.new('RGBA', img.size, (255, 255, 255, 255))
    flat_img.alpha_composite(img)
    rgb = flat_img.convert('RGB')
    grey = rgb.convert('L')
    lo = grey.getextrema()[0]
    ink = min(rgb.getdata(), key=sum)
    alpha = grey.point(lambda v: max(0, min(255, round((250 - v) * 255 / max(1, 250 - lo)))))
    out = Image.new('RGBA', img.size, ink + (0,))
    out.putalpha(alpha)
    box = alpha.point(lambda v: 255 if v > 8 else 0).getbbox()
    pad = Image.new('RGBA', (out.width + 8, out.height + 8), ink + (0,))
    pad.paste(out, (4, 4))
    out = pad.crop(padded((box[0] + 4, box[1] + 4, box[2] + 4, box[3] + 4), pad.size))
    if out.height > 220:
        out = out.resize((round(out.width * 220 / out.height), 220), Image.LANCZOS)
    out.save(target, optimize=True)

def extend(src, target, size=(760, 1095)):
    """Studio photo on a soft gradient backdrop: keep the whole frame at full
    width and continue its top and bottom rows (blurred) to fill the portrait
    canvas, so no pasted rectangle shows. Returns the source for the hero."""
    from PIL import ImageFilter
    img = flat(Image.open(src))
    scaled = img.resize((size[0], round(img.height * size[0] / img.width)), Image.LANCZOS)
    canvas = Image.new('RGB', size)
    top = (size[1] - scaled.height) // 2
    strip_top = scaled.crop((0, 0, size[0], 1)).resize((size[0], top + 1)).filter(ImageFilter.GaussianBlur(6))
    strip_bot = scaled.crop((0, scaled.height - 1, size[0], scaled.height)).resize((size[0], size[1] - top - scaled.height + 1)).filter(ImageFilter.GaussianBlur(6))
    canvas.paste(strip_top, (0, 0))
    canvas.paste(strip_bot, (0, top + scaled.height - 1))
    canvas.paste(scaled, (0, top))
    canvas.save(target, quality=90, optimize=True)
    img.cover_focus = (0.5, 0.5)
    return img
