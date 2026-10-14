"""Reviewed whole-plant framing of the seller's offered-size photographs."""
import json
from pathlib import Path
from net import save
ROOT=Path(__file__).resolve().parent.parent
p=sorted((ROOT/'research').glob('*/samek-products.json'))[-1]
rows=json.loads(p.read_text())
# The last photo is seller-designated as the offered size. Do not substitute
# an adult specimen when that last photo already clips the live plant.
excluded={'p990','p958','p864','p910'}
crops={'p888':[.27,.05,.74,1],'p1078':[.22,0,.70,1],'p801':[.30,0,.75,1],'p729':[.16,0,.83,1],'p865':[.20,0,.75,1],'p964':[.10,.05,.80,1],'p959':[.12,0,.83,1],'p724':[.08,0,.87,1],'p727':[.18,0,.86,1],'p1075':[0,0,.80,1],'p766':[.06,0,.94,1],'p721':[.10,0,.90,1],'p1089':[.10,0,.95,1],'p856':[.10,0,.86,1],'p757':[.12,0,.88,1],'p901':[.05,0,.90,1],'p893':[.18,0,.85,1],'p914':[.12,0,.88,1],'p900':[0,0,.90,1],'p736':[.24,0,.76,1],'p985':[.26,0,.70,1],'p863':[0,0,.85,1],'p718':[.12,0,.92,1],'p1021':[.12,0,.85,1],'p1077':[.12,0,.85,1],'p916':[.22,0,.88,1]}
rows=[r for r in rows if r['id'] not in excluded]
for r in rows:
 if r['id'] in crops:r['imageCrop']=crops[r['id']]
 elif r['kind']=='outdoor':r['imageCrop']=[.10,0,.90,1]
 r['photoReview']='Official offered-size photo, reviewed for subject framing; normalized crop, if present, preserves the plant.'
save(p,rows)
print('curated samek',len(rows))
