from pathlib import Path
from zipfile import ZipFile
from lxml import etree as E
from pypdf import PdfReader
import json,re

folder=Path('output/fitxes-4eso')
sheet=json.loads((folder/'model.json').read_text(encoding='utf-8'))
def canonical(s):
    s=s.replace('−','-').replace('²','^2').replace('³','^3')
    s=re.sub(r'([0-9)])\s*x\s*(?=[0-9(\[])',r'\1 × ',s)
    s=re.sub(r'\s*/\s*(?=\d+/\d+)',' ÷ ',s)
    return re.sub(r'[\s/^√()]','',s)
ns={'w':'http://schemas.openxmlformats.org/wordprocessingml/2006/main','m':'http://schemas.openxmlformats.org/officeDocument/2006/math'}
for kind in ['fitxa','solucionari']:
    stem=f'{kind}-4eso-numeric-{sheet["version"]}'
    with ZipFile(folder/(stem+'.docx')) as z:
        root=E.fromstring(z.read('word/document.xml'))
        word=''.join(root.xpath('.//w:t/text() | .//m:t/text()',namespaces=ns))
        if kind=='solucionari': assert root.findall('.//m:sSup',ns),'Exponents natius'
        assert root.findall('.//m:rad',ns),'Arrels natives'
        if kind=='solucionari': assert root.findall('.//m:f',ns),'Fraccions natives'
        assert len([n for n in z.namelist() if n.startswith('word/media/')])>=1,'Figura al Word'
        header=z.read('word/header1.xml').decode()
        assert '4t' in header and '1r' not in header,'Curs correcte'
        assert sheet['version'] not in header,'Sense versió a la capçalera'
    reader=PdfReader(folder/(stem+'.pdf'))
    text=''.join(p.extract_text() for p in reader.pages)
    assert sheet['version'] not in text,'Sense versió visible al PDF'
    assert any(len(p.images)>0 for p in reader.pages),'Figura al PDF'
    assert all(abs(float(p.mediabox.width)-595.28)<1 for p in reader.pages)
    expected=[]
    for q in sheet['questions']:
        expected.append(f'{q["number"]}. {q["question"]}')
        expected += [chr(97+i)+') '+v for i,v in enumerate(q['options'])]
        if kind=='solucionari':expected += q['steps']+['Resposta: '+q['answer']]
    for fmt,actual in [('Word',word),('PDF',text)]:
        actual=canonical(actual);pos=0
        for line in expected:
            needle=canonical(line);found=actual.find(needle,pos)
            assert found>=0,(fmt,stem,line,actual[pos:pos+450])
            pos=found+len(needle)
    print(stem+': contingut i ordre idèntics, figura, equacions i A4; '+str(len(reader.pages))+' pàgines PDF')
