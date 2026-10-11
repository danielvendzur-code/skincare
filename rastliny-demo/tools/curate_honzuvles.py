"""Reviewed bonsai care and exact bowl dimensions; no inferred toxicity."""
import hashlib,json,re
from pathlib import Path
from net import soup,save
ROOT=Path(__file__).resolve().parent.parent
source=ROOT/'research/2026-10-11/honzuvles-products.json'
rows=json.loads(source.read_text())
for p in rows:
    s=soup(p['url']);short=s.select_one('.p-short-description');desc=s.select_one('#description .basic-description')
    short_text=short.get_text(' ',strip=True) if short else ''
    text=' '.join(x.get_text(' ',strip=True) for x in [short,desc] if x)
    p['descriptionSha256']=hashlib.sha256(text.encode()).hexdigest()
    if p['kind']=='plants':
        p['tags']=[];p['facts']=['Vonkajší bonsaj podľa kategórie predajcu.']
        if 'skutečný strom, který obdržíte' in short_text:p['facts'].append('Predajca uvádza fotografiu konkrétneho stromu, ktorý dostanete.')
        size=re.search(r'Rozměry[^:]*:\s*([\d.,x×\s]+)cm',short_text)
        if size:p['facts'].append('Rozmery podľa predajcu: '+size[1].strip()+' cm.')
        age=re.search(r'Stáří\s*(?:cca\s*)?(\d+)\s*let',short_text,re.I)
        if age:p['facts'].append('Vek podľa predajcu: '+age[1]+' rokov.')
        name=p['name'].split(' — ')[0]
        if name=='Japonská azalka':
            assert 'Polostinné až světlé stanoviště' in text
            p['tags']+=['low'];p['facts'].append('Predajca uvádza polotieň, ochranu pred prudkým poludňajším slnkom.')
        elif name in ['Buk lesní','Habr obecný','Skalník','Lípa malolistá']:
            assert 'slunné až polostinné stanoviště' in text or 'plném slunci až v polostínu' in text
            p['tags']+=['low','sun'];p['facts'].append('Predajca uvádza slnko až polotieň; v horúčavách ochranu pred poludňajším žiarom.')
        elif name.startswith('Jalovec'):
            assert 'Plné slunce (minimálně 6 hodin denně)' in text
            p['tags']+=['sun'];p['facts'].append('Predajca uvádza plné slnko, v extrémnych horúčavách ľahké pritienenie.')
        elif name.startswith('Picea'):
            assert 'Polostín až plné slunce' in text
            p['tags']+=['low','sun'];p['facts'].append('Predajca uvádza polotieň až plné slnko a letné pritienenie.')
        if name in ['Japonská azalka','Habr obecný','Skalník','Lípa malolistá']:
            assert re.search(r'začátečn|snadná|nenároč',text,re.I)
            p['tags'].append('easy');p['facts'].append('Predajca ju označuje za vhodnú aj pre začiatočníkov; pravidelná bonsajová starostlivosť je potrebná.')
        if 'pouze osobní odběr' in short_text.lower():
            fact='V období kvitnutia predajca požaduje osobný odber.' if 'V období květu' in short_text else 'Predajca uvádza osobný odber.'
            if 's naší vlastní dopravou' in short_text:fact+=' Prípadnú vlastnú dopravu treba dohodnúť.'
            p['facts'].insert(1,fact)
        family='azalka' if name=='Japonská azalka' else 'smrk' if name.startswith('Picea') else name.split()[0].lower()
        p['tags'].append('genus:'+family)
        if size:p['name']=name+' — '+size[1].strip()+' cm'
    elif p['kind']=='pots':
        p['tags']=[t for t in p['tags'] if not t.endswith('-pot') and not t.startswith('genus:')]
        # Multiple dimensions are not a diameter: use the longest listed side
        # consistently for the existing size question, and show all dimensions.
        match=re.search(r'(\d+(?:[.,]\d+)?(?:x\d+(?:[.,]\d+)?){1,2})\s*cm',p['name'],re.I)
        p['facts']=[f for f in p['facts'] if not re.search(r'Priemer|šírka|Črepník podľa',f)]
        if match:
            values=[float(v.replace(',','.')) for v in match[1].split('x')];longest=max(values)
            p['diameter']=None;p['tags'].append('small-pot' if longest<=11 else 'medium-pot' if longest<=16 else 'large-pot')
            p['facts'].insert(0,'Rozmery podľa názvu predajcu: '+match[1]+' cm; triedenie podľa najdlhšieho rozmeru, nie priemeru.')
        if 'podmiska' in p['name'].lower():p['tags'].append('saucer');p['facts'].insert(0,'Samostatná podmiska; nejde o nádobu na vysadenie stromu.')
    elif p['kind']=='substrates':
        p['tags']=[t for t in p['tags'] if not t.startswith('genus:') and not t.endswith('-mix')]
        if 'listnaté' in p['name']:tag='deciduous-mix';fact='Hotová zmes pre listnaté bonsaje podľa predajcu; okrem azaliek.'
        elif 'jehličnaté' in p['name']:tag='conifer-mix';fact='Hotová zmes pre ihličnaté bonsaje podľa predajcu.'
        elif p['name'].startswith('Kanuma'):tag='acid-mix';fact='Predajca uvádza určenie pre azalky a kyslomilné bonsaje.'
        else:tag='mineral-component';fact='Samostatná zložka bonsajového substrátu podľa predajcu; pomer zmesi overte na detaile.'
        p['tags'].append(tag);p['facts'].insert(0,fact)
        if tag in ['deciduous-mix','conifer-mix']:p['tags'].append('bonsai-mix')
        p['facts']=[f for f in p['facts'] if not f.startswith(('Dostupný variant:','Balenie podľa názvu:','Fotografia predajcu ukazuje','Určenie z názvu'))]
        p['tags']=[t for t in p['tags'] if not t.startswith('volume-')]
        vol=re.search(r'(\d+(?:[.,]\d+)?)\s*litr',p.get('variantLabel',''))
        if vol:
            v=float(vol[1].replace(',','.'));p['tags'].append('volume-small' if v<=3 else 'volume-medium' if v<=10 else 'volume-large');p['facts'].append(f'Dostupný variant: {v:g} l.')
    p['tags']=sorted(set(p['tags']));p['facts']=list(dict.fromkeys(p['facts']));p['reason']=' '.join(p['facts'][:3])
save(source,rows)
print('curated Honzův les',len(rows))
