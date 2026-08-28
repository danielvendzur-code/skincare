from pathlib import Path
from PIL import Image, ImageDraw

source = Path('artifacts/screenshots')
viewports = ['desktop', 'mobile', 'compact']
states = ['storefront', 'chat', 'advisor', 'result']
tiles = []

for viewport in viewports:
    for state in states:
        path = source / f'biofy-{viewport}-{state}.png'
        image = Image.open(path).convert('RGB')
        image.thumbnail((420, 290))
        canvas = Image.new('RGB', (440, 330), 'white')
        canvas.paste(image, ((440 - image.width) // 2, 30))
        ImageDraw.Draw(canvas).text((12, 9), f'{viewport} / {state}', fill='#1b2d21')
        tiles.append(canvas)

board = Image.new('RGB', (440 * 4, 330 * 3), '#e9e4da')
for index, tile in enumerate(tiles):
    board.paste(tile, ((index % 4) * 440, (index // 4) * 330))
board.save(source / 'biofy-qa-board.jpg', quality=92)
