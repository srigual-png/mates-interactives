#!/usr/bin/env node
'use strict';
// Comprovació de traçabilitat del contrast funcional, no homologació curricular.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const root=path.join(__dirname,'..'), dir=path.join(root,'docs','auditoria');
const read=n=>JSON.parse(fs.readFileSync(path.join(dir,n),'utf8'));
const report=read('MI_2ESO_mesura_coincidencies_indirectes_codi_18.json');
const global=read('MI_2ESO_mesura_tres_candidates_contrast_global_128.json');
const spec=read('MI_2ESO_mesura_tres_especificacions_pedagogiques.json');
const html=fs.readFileSync(path.join(root,'2eso','sentit-mesura.html'),'utf8');
const functions={unitats:'genUnitats2ESO',escales:'genEscales2ESO',pitagores:'genPitagores2ESO',perimetres:'genPerimetresArees2ESO',superficies:'genSuperficiesVolums2ESO',estimacio:'genEstimacioError2ESO',problemes:'genProblemesMesura2ESO'};
function sourceFor(topic,type){
 const begin=html.indexOf('function '+functions[topic]+'(');assert(begin>=0);
 const next=html.indexOf('/* ── GENERADOR ·',begin+30);
 const body=html.slice(begin,next>begin?next:html.length);
 const re=new RegExp('(?:if|else if)\\(type==='+type+'\\)\\{');
 const m=re.exec(body);assert(m,topic+':'+type+' absent');
 const part=body.slice(m.index);
 const cut=part.search(/\n  else if\(type===|\n  return \{/);
 return part.slice(0,cut<0?part.length:cut);
}
assert.equal(report.status,'source_code_indirect_overlap_review_only');
assert.equal(report.reviewed_types.length,18);assert.equal(report.counts.examined_source_cases,18);
const counts={},unique=new Set();
for(const row of report.reviewed_types){
 assert(!unique.has(row.candidate+':'+row.key),'Duplicated candidate/key '+row.key);unique.add(row.candidate+':'+row.key);
 assert.equal(row.key,row.key.toLowerCase());
 assert(['escales','perimetres','estimacio'].includes(row.topic),'Unknown candidate topic');
 const [actualTopic,num]=row.key.split(':');
 const caseSource=sourceFor(actualTopic,Number(num));
 const signature=row.question_signature;
 assert(caseSource.replace(/<[^>]*>/g,'').includes(signature),'Source signature missing '+row.key+': '+signature);
 const globalRow=global.rows.find(x=>x.key===row.key);assert(globalRow);
 const category=globalRow.comparisons[row.candidate];
 assert(['shared_component','related_context','direct_overlap_review'].includes(category),'Not an overlap '+row.key);
 assert(row.boundary.length>=25&&row.functional_overlap.length>=8);
 counts[row.candidate]=(counts[row.candidate]||0)+1;
}
assert.deepEqual(Object.values(counts).sort(),[6,6,6]);
assert.equal(unique.size,18);
assert.equal(report.conclusions.length,3);
for(const item of report.conclusions){
 assert(spec.specifications.some(x=>x.proposal_id===item.proposal_id));
 assert.equal(item.novel_family_approved,false);
 assert.equal(item.N3_approved,false);
 assert(item.important_closest.every(x=>unique.has(item.proposal_id+':'+x)));
}
assert.equal(report.counts.approved_genuine_families,0);
assert.equal(report.counts.approved_N3,0);
console.log('OK: 18 source signatures checked across three candidates, 18 documented indirect overlaps and no new families/levels approved.');
