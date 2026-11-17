#!/usr/bin/env node
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const root=path.join(__dirname,'..'),dir=path.join(root,'docs','auditoria');
const read=n=>JSON.parse(fs.readFileSync(path.join(dir,n),'utf8'));
const audit=read('MI_2ESO_mesura_24_prioritats_revisio_codi.json');
const triage=read('MI_2ESO_mesura_triatge_curricular_128_sense_quotes.json');
const html=fs.readFileSync(path.join(root,'2eso','sentit-mesura.html'),'utf8');
const functions={unitats:'genUnitats2ESO',escales:'genEscales2ESO',pitagores:'genPitagores2ESO',perimetres:'genPerimetresArees2ESO',superficies:'genSuperficiesVolums2ESO',estimacio:'genEstimacioError2ESO',problemes:'genProblemesMesura2ESO'};
const known=new Set(triage.priority_cases.map(x=>x.key));
assert.equal(audit.cases.length,24);
assert.equal(new Set(audit.cases.map(x=>x.key)).size,24);
for(const c of audit.cases){
 assert(known.has(c.key));
 const [topic,id]=c.key.split(':');
 const start=html.indexOf('function '+functions[topic]+'(');
 assert(start>=0,'Missing generator '+topic);
 const end=html.indexOf('/* ── GENERADOR ·',start+30);
 const section=html.slice(start,end>=0?end:html.length);
 const m=new RegExp('(?:if|else if)\\(type==='+Number(id)+'\\)\\{').exec(section);
 assert(m,'Missing code branch '+c.key);
 const rest=section.slice(m.index);
 const boundary=rest.search(/\n  else if\(type===|\n  return \{/);
 const body=rest.slice(0,boundary<0?rest.length:boundary);
 assert(body.includes('question='),'Missing question '+c.key);
 assert(body.includes('correct='),'Missing answer '+c.key);
 assert(body.includes('solution='),'Missing solution '+c.key);
 assert(c.evidence.length>=35&&c.recommendation.length>=25);
 assert.equal(c.verified_in_source,true);assert.equal(c.change_applied,false);assert.equal(c.teacher_approved,false);
}
assert(!html.includes("['la capacitat d’una ampolla','1,5 L',['1,5 L','1,51 L'"));
assert(!html.includes("['el gruix d’una moneda','1,8 mm',['1,8 mm','2 m','0,000018 km','1,81 mm']"));
assert(html.includes('cm (exclòs)'));
assert.equal(audit.cases.filter(x=>x.diagnosis==='ambiguitat_confirmada').length,1);
assert.deepEqual(audit.counts,{cases:24,confirmed_ambiguity:1,official_changes:0});
console.log('OK: 24 branques inspeccionades; document històric preservat i ambigüitats originals retirades del codi.');
