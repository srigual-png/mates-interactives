"""Verificació del contingut de totes les mostres comparables Word/PDF."""
from pathlib import Path
import json,re,zipfile,xml.etree.ElementTree as ET
from pypdf import PdfReader
folder=Path('output/fitxes-revisio-1eso')
manifest=json.loads((folder/'manifest.json').read_text(encoding='utf-8'))
def canonical(s):
    s=s.replace('−','-')
    s=re.sub('[⁰¹²³⁴⁵⁶⁷⁸⁹]+',lambda m:'^'+''.join(str('⁰¹²³⁴⁵⁶⁷⁸⁹'.index(c)) for c in m[0]),s)
    return re.sub(r'[\s/^√]','',s)
checked=[]
for item in manifest:
    sheet=json.loads((folder/item['model']).read_text(encoding='utf-8'))
    if item['worksheetType']=='extension':assert sum(q['challenge'] for q in sheet['questions'])>=7
    for kind in ['fitxa','solucionari']:
        stem=item['prefix']+kind+'-1eso-numeric-'+sheet['version']
        with zipfile.ZipFile(folder/(stem+'.docx')) as z:
            root=ET.fromstring(z.read('word/document.xml'))
            word=''.join(t.text or '' for t in root.iter() if t.tag.endswith('}t'))
            assert b'w:w="11906"' in z.read('word/document.xml')
        pdf=PdfReader(folder/(stem+'.pdf'));text=''.join(p.extract_text() for p in pdf.pages)
        label='Tipus de fitxa: '+('Estàndard' if item['worksheetType']=='standard' else 'Ampliació')
        assert label in word and label in text
        expected=[]
        for q in sheet['questions']:
            expected += [str(q['number'])+'. '+q['question']]+[chr(97+i)+') '+v for i,v in enumerate(q['options'])]
            if kind=='solucionari':expected += q['steps']+['Resposta: '+q['answer']]
        for fmt,actual in [('word',word),('pdf',text)]:
            pos=0;normalized=canonical(actual)
            for line in expected:
                needle=canonical(line);found=normalized.find(needle,pos)
                assert found>=0,(stem,fmt,line)
                pos=found+len(needle)
            for symbol in ['−','×']:
                if any(symbol in line for line in expected):assert symbol in actual,(stem,fmt,symbol)
        checked.append({'stem':stem,'pages':len(pdf.pages),'count':len(sheet['questions'])})
print(json.dumps(checked,ensure_ascii=False,indent=2))
