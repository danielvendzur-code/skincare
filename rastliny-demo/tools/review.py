"""Contact sheets for human QA. No invented or generated product imagery."""
import json,sys
from pathlib import Path
from PIL import Image,ImageDraw,ImageOps
ROOT=Path(__file__).resolve().parent.parent
slug=sys.argv[1];data=json.loads((ROOT/f'data/{slug}.json').read_text());dest=ROOT/'qa-review';dest.mkdir(exist_ok=True)
for page in range((len(data['products'])+29)//30):
 products=data['products'][page*30:(page+1)*30];canvas=Image.new('RGB',(1080,1050),'#efefe9');draw=ImageDraw.Draw(canvas)
 for i,p in enumerate(products):
  im=Image.open(ROOT/p['photo'].lstrip('/'));im.thumbnail((170,165));x=(i%6)*180;y=(i//6)*210;canvas.paste(im,(x+(180-im.width)//2,y));name=p['name'];draw.text((x+5,y+169),name[:26],fill='black');draw.text((x+5,y+185),p['price']+' · '+p['id'],fill='black')
 canvas.save(dest/f'{slug}-products-{page+1}.jpg',quality=88)
root=ROOT/f'qa-raw/{slug}';names=['desktop-1-owner','desktop-6-result','mobile-1-owner','mobile-3-chat','mobile-5-step1','mobile-6-result','small-1-owner','small-3-chat','small-5-step1','small-6-result'];ims=[]
for name in names:
 f=root/f'{slug}-{name}.png'
 if not f.exists():continue
 im=Image.open(f);w=480 if name.startswith('desktop') else 234;im=im.resize((w,round(im.height*w/im.width)));tile=Image.new('RGB',(w,im.height+25),'white');tile.paste(im,(0,25));ImageDraw.Draw(tile).text((5,5),name,fill='black');ims.append(tile)
if len(ims)==10:
 groups=[ims[:2],ims[2:6],ims[6:]];canvas=Image.new('RGB',(960,sum(max(i.height for i in g) for g in groups)),'#eee');y=0
 for group in groups:
  x=0
  for im in group:canvas.paste(im,(x,y));x+=im.width
  y+=max(i.height for i in group)
 canvas.save(dest/f'{slug}-ui.jpg',quality=90)
 report=json.loads((root/'report.json').read_text());(dest/f'{slug}-qa.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
 # Keep two full-size representative states, with compressed review sheets for mobiles.
 for name in ['desktop-1-owner','desktop-6-result']:
  Image.open(root/f'{slug}-{name}.png').convert('RGB').save(dest/f'{slug}-{name}.jpg',quality=90)
print('review sheets',slug)
