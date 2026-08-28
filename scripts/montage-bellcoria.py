from pathlib import Path
from PIL import Image, ImageDraw

source = Path('artifacts/screenshots')
states = ['owner', 'chat', 'advisor', 'result']
viewports = ['desktop', 'mobile', 'mobile360']
labels = {'desktop':'1440×900', 'mobile':'390×844', 'mobile360':'360×800'}

tiles = []
for viewport in viewports:
    for state in states:
        image = Image.open(source / f'bellcoria-{viewport}-{state}.png').convert('RGB')
        image.thumbnail((450, 285))
        canvas = Image.new('RGB', (470, 325), 'white')
        canvas.paste(image, ((470 - image.width) // 2, 30))
        ImageDraw.Draw(canvas).text((12, 9), f'{labels[viewport]} / {state}', fill='#222')
        tiles.append(canvas)

board = Image.new('RGB', (470 * 4, 325 * 3), '#e8e3df')
for index, tile in enumerate(tiles):
    board.paste(tile, ((index % 4) * 470, (index // 4) * 325))
board.save(source / 'bellcoria-qa-board.jpg', quality=92)
