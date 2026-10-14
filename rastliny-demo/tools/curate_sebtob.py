"""Reviewed whole-plant photos, 10 October 2026; exact Shopify variants."""
import json
from pathlib import Path
ROOT=Path(__file__).resolve().parent.parent
path=ROOT/'research/2026-10-10/sebtobplants-products.json'
chosen=['v54844135899482', 'v54844125839706', 'v54844099166554', 'v54844029141338', 'v54843895284058', 'v54843890860378', 'v54819900719450', 'v54819076931930', 'v54819062579546', 'v54819058188634', 'v54766932001114', 'v54766928920922', 'v54766927479130', 'v54766925349210', 'v54766925087066', 'v54766917058906', 'v54766914896218', 'v54766851391834', 'v54766843003226', 'v54766596456794', 'v54766594523482', 'v54766592000346', 'v54766588035418', 'v54766584824154', 'v54766583939418', 'v54766583644506', 'v54766581285210', 'v54766575976794', 'v54766568374618', 'v54056895938906']
rows={p['id']:p for p in json.loads(path.read_text())}
result=[]
for id in chosen:
 p=rows[id]
 p['imageCrop']=[0,0.20,1,0.98]
 p['imageSource']=p['imageSource'].split('&width=')[0]+'&width=1600'
 p['photoSelection']='Reviewed whole-plant product/variant photo; closer crop preserves the whole plant and pot.'
 p['sourceStockEvidence']={'available':True,'variantId':id[1:]}
 p['kind']='philodendrons' if p['name'].lower().startswith('philodendron') else 'monsteras' if p['name'].lower().startswith('monstera') else 'plants'
 p['facts']=['Botanický rod podľa názvu predajcu: '+p['name'].split()[0].capitalize()+'.','Cena a fotografia patria konkrétnej dostupnej položke.']
 if ' — ' in p['name']:p['facts'].insert(1,'Variant podľa predajcu: '+p['name'].split(' — ',1)[1]+'.')
 p['reason']=' '.join(p['facts'][:3])
 result.append(p)
# Individual source photographs need different margins to retain all foliage.
crops={
 'v54843895284058':[0,0.25,1,0.95],
 'v54843890860378':[0,0.27,1,0.97],
 'v54819900719450':[0,0.24,1,0.98],
 'v54819076931930':[0.05,0.49,0.92,0.98],
 'v54819062579546':[0.08,0.25,0.92,0.98],
 'v54819058188634':[0.10,0.42,0.90,0.98],
 'v54766843003226':[0.10,0.35,0.88,0.99],
 'v54766596456794':[0.10,0.28,0.96,0.98],
 'v54766594523482':[0.03,0.05,1,0.95],
 'v54766588035418':[0.02,0.35,0.98,0.98],
 'v54766584824154':[0.04,0.52,0.92,0.98],
 'v54766579393946':[0.05,0.24,0.98,0.98],
 'v54766557976794':[0.04,0.45,0.94,0.98],
 'v54766568374618':[0.02,0.24,0.98,0.98],
 'v54056895938906':[0.04,0.32,0.94,0.98]}
for p in result:
 p['imageCrop']=crops.get(p['id'],p['imageCrop'])
path.write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
print('curated',len(result),'whole-plant photographs')
