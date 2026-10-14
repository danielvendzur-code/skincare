"""Remove ambiguous seed/mother/flower offers; retain seller's exact care evidence."""
import json,re
from pathlib import Path
from net import save
ROOT=Path(__file__).resolve().parent.parent
p=sorted((ROOT/'research').glob('*/dubenkaktus-products.json'))[-1]
rows=json.loads(p.read_text());out=[]
# Entire primary plants are visible; grouped, clipped and mislabeled images omitted.
keep={'p12099','p13617','p13169','p12686','p11690','p11880','p13235','p13125','p13399','p10402','p12339','p13008','p12257','p6379','p10672','p5033','p5027','p12097','p13546'}
for q in rows:
 if q['id'] not in keep:continue
 if q['id'] in ['p7759','p6509','p12750']:continue
 if re.search(r'Semena|Seeds',q.get('sourceAttributes',{}).get('Typ rostliny:',''),re.I):continue
 if re.search(r'mate[čc]n[ií]|mate[řr]sk[áa]|v[ýy]b[ěe]r z kv[ěe]t',q['name'],re.I):continue
 facts=[];a=q.get('sourceAttributes',{})
 if a.get('Průměr květináčku:'):facts.append('Črepník podľa predajcu: '+a['Průměr květináčku:']+'.')
 if a.get('Stáří rostliny:'):
  age=re.sub(r'\s+rok[ůu]$','',a['Stáří rostliny:']).strip();age=re.sub(r'roky?$', 'roky',age)
  if not re.search(r'rok',age):age+=' rokov'
  facts.append('Vek podľa predajcu: '+age+'.')
 if a.get('Typ rostliny:'):facts.append('Typ podľa predajcu: '+a['Typ rostliny:']+'.')
 facts.extend(f for f in q['facts'] if f.startswith(('Predajca uvádza','Zaradenie predajcu')))
 q['facts']=facts;q['reason']=' '.join(facts[:3]);out.append(q)
save(p,out);print('Duben curated',len(out))
