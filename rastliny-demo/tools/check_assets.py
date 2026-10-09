"""Fail on missing/corrupt official images, duplicate IDs or broken facts."""
import json,sys
from pathlib import Path
from PIL import Image
ROOT=Path(__file__).resolve().parent.parent;fail=[];total=0
for path in (ROOT/'data').glob('*.json'):
 b=json.loads(path.read_text());seen=set()
 for key in ['hero','logo','mark']:
  p=ROOT/b[key].lstrip('/')
  try:Image.open(p).verify()
  except Exception as e:fail.append(str(p)+': '+str(e))
 for p in b['products']:
  total+=1
  if p['id'] in seen:fail.append(b['slug']+' duplicate '+p['id'])
  seen.add(p['id'])
  if p['currency']!=b['currency']:fail.append(p['name']+' currency mismatch')
  if b['currency']=='EUR' and not p['price'].endswith(' €'):fail.append(p['name']+' wrong currency label')
  if b['currency']=='CZK' and not p['price'].endswith(' Kč'):fail.append(p['name']+' wrong currency label')
  if p['stock']!='InStock' or not p['url'].startswith(b['website']) or p['priceValue']<=0:fail.append(p['name']+' bad source/stock/price')
  try:
   im=Image.open(ROOT/p['photo'].lstrip('/'));im.verify()
   if im.size!=(760,1095):fail.append(p['name']+' wrong photo geometry')
  except Exception as e:fail.append(p['name']+': '+str(e))
  if not p['reason'] or not p['facts']:fail.append(p['name']+' missing facts')
print(('FAIL\n'+'\n'.join(fail)) if fail else f'PASS assets: {total} products')
sys.exit(bool(fail))
