"""Remove round award badges from the top-left of YAGE packshots (run in the
folder with the downloaded .jpg files; cleaned copies go to ./clean)."""
from PIL import Image, ImageDraw
import glob, os
os.makedirs('clean', exist_ok=True)
for f in sorted(glob.glob('*.jpg')):
    im=Image.open(f).convert('RGB'); g=im.convert('L'); W,H=im.size
    first=min(y for y in range(H) if g.crop((0,y,W,y+1)).getextrema()[0]<200)
    if first < 100:
        cols=[x for x in range(W) if g.crop((x,45,x+1,215)).getextrema()[0]<120]
        runs=[]; start=prev=cols[0]
        for c in cols[1:]:
            if c-prev>4: runs.append((start,prev)); start=c
            prev=c
        runs.append((start,prev))
        d=ImageDraw.Draw(im)
        for x0,x1 in runs:
            # badge = roughly a circle: diameter ~ width of run, top at first dark row
            top=min(y for y in range(20,320) if g.crop((x0,y,x1+1,y+1)).getextrema()[0]<120)
            diam=x1-x0
            d.ellipse((x0-7,top-7,x1+7,top+diam+7), fill=(255,255,255))
        print(f, runs)
    im.save('clean/'+f, quality=95)
