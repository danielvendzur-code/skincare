from pathlib import Path
from PIL import Image, ImageDraw

source = Path('artifacts/screenshots')
states = ['owner', 'chat', 'advisor', 'result']
viewports = ['desktop', 'mobile', 'mobile-small']
for brand in ['mylo','ponio','two','bellcoria','biofy','anemone']:
    tiles = []
    for viewport in viewports:
        for state in states:
            image = Image.open(source / f'{brand}-{viewport}-{state}.png').convert('RGB')
            image.thumbnail((470, 330))
            canvas = Image.new('RGB', (490, 370), 'white')
            canvas.paste(image, ((490-image.width)//2, 28))
            ImageDraw.Draw(canvas).text((12,8), f'{viewport} / {state}', fill='#222')
            tiles.append(canvas)
    board = Image.new('RGB', (490*4, 370*len(viewports)), '#ececec')
    for index, tile in enumerate(tiles):
        board.paste(tile, ((index%4)*490, (index//4)*370))
    board.save(source / f'{brand}-qa-board.jpg', quality=91)
