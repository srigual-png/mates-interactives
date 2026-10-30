"""Compara el model únic amb el text OOXML i PDF exportat pel navegador."""
from pathlib import Path
import json,re,zipfile,xml.etree.ElementTree as ET
from pypdf import PdfReader

folder=Path('tmp/fitxes')
def canonical(s):
    s=s.replace('²','^2').replace('³','^3')
    s=re.sub(r'([0-9)])\s*x\s*(?=[0-9(\[])',r'\1 × ',s)
    s=re.sub(r'\s*/\s*(?=\d+/\d+)',' ÷ ',s)
    return re.sub(r'[\s/^√]','',s)

checked=[]
for model,prefix in [('sheet.json',''),('math-sheet.json','math-')]:
    sheet=json.loads((folder/model).read_text(encoding='utf-8'))
    for kind in ['fitxa','solucionari']:
        stem=f'{prefix}{kind}-1eso-numeric-{sheet["version"]}'
        with zipfile.ZipFile(folder/(stem+'.docx')) as z:
            tree=ET.fromstring(z.read('word/document.xml'))
            word=''.join(n.text or '' for n in tree.iter() if n.tag.endswith('}t'))
            meta=z.read('word/header1.xml').decode()
            assert sheet['version'] in meta
            assert b'w:w="11906"' in z.read('word/document.xml')
            if prefix:
                xml=z.read('word/document.xml')
                assert all(x in xml for x in [b'<m:f>',b'<m:sSup>',b'<m:rad>'])
        pdf=PdfReader(folder/(stem+'.pdf'))
        text=''.join(p.extract_text() for p in pdf.pages)
        assert sheet['version'] in text
        assert all(abs(float(p.mediabox.width)-595.28)<1 for p in pdf.pages)
        expected=[]
        for q in sheet['questions']:
            if kind=='fitxa' or sheet['config']['solutions']=='steps':
                expected.append(f'{q["number"]}. {q["question"]}')
                expected += [chr(97+i)+') '+v for i,v in enumerate(q['options'])]
            if kind=='solucionari':
                expected += q['steps'] if sheet['config']['solutions']=='steps' else []
                expected.append(('Resposta: ' if sheet['config']['solutions']=='steps' else str(q['number'])+'. ')+q['answer'])
        for format,actual in [('docx',word),('pdf',text)]:
            normalized=canonical(actual);position=0
            for line in expected:
                needle=canonical(line);found=normalized.find(needle,position)
                assert found>=0,(stem,format,line,normalized[position:position+400])
                position=found+len(needle)
        checked.append({'file':stem,'pages':len(pdf.pages),'questions':len(sheet['questions'])})
print(json.dumps(checked,ensure_ascii=False,indent=2))
