"""Regression checks against reviewed seller wording, without network requests."""
from collect_addition import care

def product(name,kind='plants'):
 return dict(name=name,kind=kind,tags=[],facts=[])

p=care(product('Begonia barsalouxiae'),'Begónia preferuje svetlé miesto, nie však priame slnko.')
assert 'bright' in p['tags'] and 'sun' not in p['tags']
p=care(product('Pilea Peperomioides'),'Niektoré peperomie zvládnu aj priame slnečné svetlo.',{'Umiestnenie':['nepriame slnko','svetlé stanovisko']})
assert 'bright' in p['tags'] and 'sun' not in p['tags']
p=care(product('Cube Beton effect Ø 9 cm','pots'),'Kvetináč je vyrobený z plastu, ktorý imituje betónový povrch.')
assert 'plastic' in p['tags'] and 'concrete' not in p['tags'] and p['diameter']==9
p=care(product('Samozavlažovací kvetináč','pots'),'Materiál: odolný plast. Použite keramzit. Priemer 15 cm.')
assert 'plastic' in p['tags'] and 'ceramic' not in p['tags'] and p['diameter']==15
p=care(product('Substrát na kaktusy a sukulenty 3 l','substrates'),'Priepustný substrát.',{'Použitie':['izbové rastliny']})
assert 'cactus-mix' in p['tags'] and 'indoor-mix' not in p['tags']
print('PASS collector: care negations, product placement, actual pot materials, targeted substrates')
