from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED

root = Path(__file__).resolve().parent.parent
target = root / 'mates-interactives-access-lliure.zip'
files = []
for directory in ['assets', '1eso', '2eso', '3eso', '4eso', '.github/workflows']:
    files.extend(p for p in (root / directory).rglob('*') if p.is_file())
for name in ['index.html', 'favicon.ico', 'robots.txt', 'sitemap.xml', '.nojekyll',
             'informe-access-lliure.md', 'resultats-access-lliure.json',
             'scripts/resultats-practica-cercador.json']:
    p = root / name
    if p.exists():
        files.append(p)
files.extend((root / 'scripts').glob('*.cjs'))
files.extend(root.glob('*.cjs'))
files.append(Path(__file__).resolve())
with ZipFile(target, 'w', ZIP_DEFLATED) as archive:
    for p in sorted(set(files)):
        archive.write(p, p.relative_to(root).as_posix())
print(f'{target}: {len(set(files))} files, {target.stat().st_size} bytes')
