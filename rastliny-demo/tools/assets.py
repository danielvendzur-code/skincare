"""Download only official assigned product photos, then call make_assets.py.
SVG logos are rendered at 4x. Official motifs are used for circle avatars.
"""
import concurrent.futures as futures
import json,sys,re
from pathlib import Path
from PIL import Image,ImageOps
from net import fetch,save
from make_assets import logo,mark,mono_logo,flat,trim,fit_on
ROOT=Path(__file__).resolve().parent.parent
slug=sys.argv[1];source=ROOT/'research/source-images';source.mkdir(exist_ok=True,parents=True)
rows=json.loads((ROOT/f'research/2026-10-09/{slug}-products.json').read_text());good=[]
def download(p):
 try:
  if p['kind']=='substrates' and not re.search(r'substr|rašel|rasel|zemin|kokos|perlit|keramzit',p['name'],re.I):raise ValueError('not a substrate or growing medium')
  if slug=='gardenholice' and p['id']=='p4249':raise ValueError('group photo makes the individual plant unreadable')
  target=source/f'{slug}-{p["id"]}.original';target.write_bytes(fetch(p['imageSource']))
  im=Image.open(target);im.verify()
  if min(Image.open(target).size)<120:raise ValueError('tiny source photo')
  return p,str(target)
 except Exception as e:print('Image excluded:',p['name'],str(e)[-160:],flush=True);return None
with futures.ThreadPoolExecutor(max_workers=3) as pool:
 for result in pool.map(download,rows):
  if result:good.append(result)
print(slug,len(good),'photos ready',flush=True)
out=ROOT/'assets/plants';out.mkdir(exist_ok=True)
if slug=='plantizia':
 import cairosvg
 cairosvg.svg2png(url=str(source/'plantizia-logo.svg'),write_to=str(source/'plantizia-logo-render.png'),output_width=1089)
 logo(str(source/'plantizia-logo-render.png'),out/'plantizia-logo.png')
 logo(str(source/'plantizia-mark.png'),out/'plantizia-mark.png')
elif slug=='gardenholice':
 logo(str(source/'gardenholice-logo.png'),out/'gardenholice-logo.png')
 logo(str(source/'gardenholice-mark.png'),out/'gardenholice-mark.png')
elif slug=='lukscheiter':
 im=Image.open(source/'lukscheiter-logo.jpg').convert('RGB')
 # The official banner includes a photograph and a tiny tagline. Retain the
 # original green name for headers; the banner's orchid is the circle motif.
 crop=im.crop((18,10,153,35)).resize((810,150),Image.Resampling.LANCZOS);crop.save(source/'lukscheiter-wordmark.png')
 # Isolate the original green letters from the JPEG's grey gradient plate.
 import numpy as np
 rgb=np.asarray(crop).astype(float);strength=np.minimum(rgb[:,:,1]-rgb[:,:,0],rgb[:,:,1]-rgb[:,:,2]);alpha=np.clip((strength-12)/65,0,1)*255
 # Remove disconnected JPEG speckles, preserving the actual letter shapes.
 from collections import deque
 mask=alpha>30;seen=np.zeros(mask.shape,dtype=bool);keep=np.zeros(mask.shape,dtype='uint8');height,width=mask.shape
 for yy,xx in zip(*np.where(mask)):
  if seen[yy,xx]:continue
  q=deque([(yy,xx)]);seen[yy,xx]=True;component=[]
  while q:
   y,x=q.popleft();component.append((y,x))
   for dy,dx in [(-1,0),(1,0),(0,-1),(0,1),(-1,-1),(-1,1),(1,-1),(1,1)]:
    ny,nx=y+dy,x+dx
    if 0<=ny<height and 0<=nx<width and mask[ny,nx] and not seen[ny,nx]:seen[ny,nx]=True;q.append((ny,nx))
  if len(component)>=300:
   for y,x in component:keep[y,x]=255
 from PIL import ImageFilter
 keep=np.asarray(Image.fromarray(keep).filter(ImageFilter.MaxFilter(5)))>0;alpha=alpha*keep
 rgba=crop.convert('RGBA');rgba.putalpha(Image.fromarray(alpha.astype('uint8')));box=rgba.getchannel('A').getbbox();rgba=rgba.crop(box);rgba.save(out/'lukscheiter-logo.png')
 motif=im.crop((230,4,289,63)).resize((354,354),Image.Resampling.LANCZOS).convert('RGBA');motif.save(out/'lukscheiter-mark.png')
import subprocess
soft={'plantizia':'#eef3e9','gardenholice':'#f4f0e6','lukscheiter':'#eef3e9'}[slug]
# Botanical/price diversity in the hero, with whole products preserved.
hero_order=[]
if slug=='lukscheiter':
 for name in ['Asparagus setaceus','Adiantum hispidulum','Cattleya deckerii','Echeveria']:
  p=next((p for p,path in good if p['name'].startswith(name)),None)
  if p:hero_order.append(p['id'])
for kind in ['plants','plants','orchids','terrariums','outdoor','pots','airplants','succulents']:
 p=next((p for p,path in good if p['kind']==kind and p['priceValue']>8 and p['id'] not in hero_order and not any(p['name'].split()[0]==q['name'].split()[0] for q,path in good if q['id'] in hero_order)),None)
 if p:hero_order.append(p['id'])
good.sort(key=lambda row:hero_order.index(row[0]['id']) if row[0]['id'] in hero_order else 99)
subprocess.run([sys.executable,str(ROOT/'tools/make_assets.py'),slug,soft,str(out/f'{slug}-logo.png'),*[p['id']+'='+path for p,path in good]],check=True)
canvas=Image.new('RGB',(1000,480),soft)
for i,(p,path) in enumerate(good[:2]):
 im=flat(Image.open(path));bg=im.getpixel((1,1));tile=fit_on(trim(im),(460,420),(430,395),bg);canvas.paste(tile,(25+490*i,30))
canvas.save(out/f'{slug}-mobile.jpg',quality=90,optimize=True)
# Keep the download exclusions out of the public catalogue.
save(ROOT/f'research/2026-10-09/{slug}-products.json',[p for p,path in good])
