"""Remove stray pieces from a cut-out symbol: connected components that are flat and touch
the left or right edge of the drawing or sit in its bottom fifth (rules, dotted lines of the wordmark
frame), and specks. python3 tools/clean_mark.py IN.png OUT.png [max_h] [min_area]"""
import sys
from PIL import Image
src, out = sys.argv[1], sys.argv[2]
max_h = int(sys.argv[3]) if len(sys.argv) > 3 else 40
min_area = int(sys.argv[4]) if len(sys.argv) > 4 else 60
im = Image.open(src).convert('RGBA'); a = im.getchannel('A'); w, h = im.size
L, T, R, B = a.point(lambda v: 255 if v > 40 else 0).getbbox()
px = a.load(); seen = bytearray(w * h); drop = []
for y0 in range(h):
    for x0 in range(w):
        if px[x0, y0] <= 40 or seen[y0 * w + x0]: continue
        stack = [(x0, y0)]; seen[y0 * w + x0] = 1; comp = []
        while stack:
            x, y = stack.pop(); comp.append((x, y))
            for nx, ny in ((x+1,y),(x-1,y),(x,y+1),(x,y-1)):
                if 0 <= nx < w and 0 <= ny < h and not seen[ny*w+nx] and px[nx, ny] > 40:
                    seen[ny*w+nx] = 1; stack.append((nx, ny))
        xs = [p[0] for p in comp]; ys = [p[1] for p in comp]
        flat = max(ys) - min(ys) < max_h and (min(xs) <= L + 2 or max(xs) >= R - 3 or min(ys) > T + 0.8 * (B - T))
        if flat or len(comp) < min_area: drop.extend(comp)
out_px = im.load()
for x, y in drop:
    for dx in (-1, 0, 1):
        for dy in (-1, 0, 1):
            if 0 <= x+dx < w and 0 <= y+dy < h: r, g, b, _ = out_px[x+dx, y+dy]; out_px[x+dx, y+dy] = (r, g, b, 0) if (x+dx, y+dy) == (x, y) or a.getpixel((x+dx, y+dy)) <= 40 else out_px[x+dx, y+dy]
bb = im.getchannel('A').point(lambda v: 255 if v > 8 else 0).getbbox(); im = im.crop(bb)
side = max(im.size); sq = Image.new('RGBA', (side, side), (0, 0, 0, 0)); sq.paste(im, ((side - im.width) // 2, (side - im.height) // 2))
sq.save(out, optimize=True); print('removed', len(drop), 'px; size', sq.size)
