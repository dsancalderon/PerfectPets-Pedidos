from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'assets'
OUT.mkdir(exist_ok=True)

def crop(source, box, target, width=None):
    image = Image.open(ROOT / source).crop(box).convert('RGB')
    if width:
        image.resize((width, round(image.height * width / image.width)), Image.Resampling.LANCZOS).save(OUT / target, quality=94)
    else:
        image.save(OUT / target, quality=94)

crop('assets/logo-options.png', (264, 1097, 770, 1295), 'perfect-pets.png', 650)
crop('Tarjetas/Vet_Healt.jpeg', (149, 266, 664, 649), 'vet-health.jpg', 300)
crop('Tarjetas/Spa_Tu_Gato.jpeg', (422, 300, 1106, 490), 'spa-tu-gato.jpg', 420)
crop('Tarjetas/Peluditos_y_Vanidosos.jpeg', (192, 172, 386, 328), 'peluditos.jpg', 250)
crop('Tarjetas/Patas_al_Agua.jpeg', (520, 236, 821, 610), 'patas-al-agua.jpg', 300)
crop('Tarjetas/Matius.jpeg', (156, 305, 427, 649), 'matius.jpg', 280)
for name, box in {
    'xtreme': (62, 317, 285, 699),
    'diamond': (629, 341, 884, 694),
    'frutos': (25, 741, 300, 1080),
    'coco': (659, 750, 884, 1098),
    'mascarilla': (88, 1112, 244, 1457),
    'statik': (686, 1119, 864, 1453),
}.items():
    crop('Productos_Champoo.jpg', box, name + '.jpg', 300)
