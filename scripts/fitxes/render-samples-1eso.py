"""Renderitza totes les pàgines dels PDF natius i dels PDF produïts per Word."""
from pathlib import Path
import json
import pypdfium2 as pdfium
root=Path('output/fitxes-revisio-1eso')
manifest=json.loads((root/'manifest.json').read_text(encoding='utf-8'))
paths=[]
for item in manifest:
    for name in item['files']:
        if not name.endswith('.pdf'):continue
        source=root/name
        for pdfpath in [source,Path('tmp/fitxes/render-comparables')/(source.stem+'-word.pdf')]:
            folder=Path('tmp/fitxes/render-comparables')/pdfpath.stem
            folder.mkdir(exist_ok=True)
            doc=pdfium.PdfDocument(str(pdfpath))
            for i in range(len(doc)):
                target=folder/f'page-{i+1}.png'
                doc[i].render(scale=1.25).to_pil().save(target)
                paths.append(str(target.resolve()))
Path('tmp/fitxes/render-comparables/final-pages.json').write_text(json.dumps(paths),encoding='utf-8')
print(json.dumps({'pages':len(paths)}))
