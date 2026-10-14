"""Care reviewed against the seller's short-description bullet lists on 2026-10-10.

The page builder merges warnings with positive care clauses in plain text.
These reviewed fields preserve the actual list-item meaning. This dated
snapshot must be reviewed again before reuse on a later collection date.
"""
import json
from pathlib import Path
from net import save

ROOT = Path(__file__).resolve().parent.parent
PATH = ROOT / 'research/2026-10-10/kokedamy-products.json'
CARE = {
    'p4977': ['bright', 'low', 'easy'],
    'p6761': ['bright', 'low'],
    'p1910': ['bright', 'easy'],
    'p1905': ['bright', 'low', 'easy'],
    'p7764': ['bright', 'low', 'sun', 'easy'],
    'p7157': ['bright', 'easy'],
    'p6762': ['bright', 'low'],
    'p6589': ['sun', 'easy'],
    'p6578': ['bright', 'low', 'sun', 'easy'],
    'p6574': ['low', 'easy'],
    'p5312': ['bright', 'low', 'sun', 'easy'],
    'p3574': ['bright', 'low'],
    'p1909': ['bright', 'low', 'easy'],
    'p1907': ['bright', 'easy'],
    'p1906': ['bright', 'easy'],
    'p1904': ['bright'],
    'p1901': ['bright', 'easy'],
    'p1890': ['bright', 'easy'],
}
LABELS = {
    'bright': 'Predajca uvádza svetlé miesto bez priameho slnka.',
    'low': 'Predajca uvádza vhodnosť do polotieňa.',
    'sun': 'Predajca výslovne uvádza toleranciu priameho slnka alebo slunného miesta.',
    'easy': 'Predajca uvádza nenáročnú starostlivosť.',
}
rows = json.loads(PATH.read_text())
for p in rows:
    assert p['checked'] == '2026-10-10', 'Care needs a new source review'
    reviewed = CARE[p['id']]
    genus = [t for t in p['tags'] if t.startswith('genus:')]
    if p['id'] == 'p1907':
        genus = ['genus:asparagus']  # "Mini" is a size descriptor.
    p['tags'] = sorted(genus + reviewed)
    p['facts'] = [LABELS[t] for t in reviewed]
    if p['id'] in ['p7764', 'p6578', 'p5312']:
        p['facts'][0] = 'Predajca uvádza toleranciu svetla od slunného miesta po polotieň.'
    elif p['id'] in ['p4977', 'p3574', 'p1909']:
        p['facts'][0] = 'Predajca uvádza rozptýlené svetlo.'
    if p['kind'] == 'succulents':
        p['facts'].append('Predajca opisuje druh ako sukulentnú rastlinu.')
    p['reason'] = ' '.join(p['facts'][:3])
    p['careReview'] = {
        'source': p['sourceEndpoint'],
        'field': 'short_description / seller care bullet lists',
        'checked': '2026-10-10',
        'tags': reviewed,
    }
save(PATH, rows)
print('Reviewed seller care:', len(rows), 'kokedamas')
