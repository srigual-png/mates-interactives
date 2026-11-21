#!/usr/bin/env node
'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.join(__dirname,'..'),dir=path.join(root,'docs','auditoria');
const read=n=>JSON.parse(fs.readFileSync(path.join(dir,n),'utf8'));
const p=read('MI_2ESO_mesura_nivells_candidats_perimetres_superficies_20.json');
const prior=[
 ...read('MI_2ESO_mesura_proposta_nivells_20_variants_pedagogiques.json').records.map(r=>r.type_or_variant.split(':').slice(0,2).join(':')),
 ...read('MI_2ESO_mesura_nivells_candidats_unitats_escales_20.json').records.map(r=>r.key),
 ...read('MI_2ESO_mesura_nivells_candidats_escales_pitagores_20.json').records.map(r=>r.key),
 ...read('MI_2ESO_mesura_nivells_candidats_pitagores_perimetres_20.json').records.map(r=>r.key)
];
const used=new Set(prior),catalogue=read('MI_2ESO_mesura_triatge_curricular_128_sense_quotes.json');
const allKeys=new Set(catalogue.records.map(r=>r.key));
const html=fs.readFileSync(path.join(root,'2eso','sentit-mesura.html'),'utf8');
const fns={perimetres:'genPerimetresArees2ESO',superficies:'genSuperficiesVolums2ESO'};
const seen=new Set(),counts={N1:0,N2:0,N1_N2:0};
assert.equal(p.records.length,20);
for(const r of p.records){
 assert(!used.has(r.key),'Repeated previous type '+r.key);
 assert(!seen.has(r.key),'Repeated type in batch '+r.key);seen.add(r.key);
 assert(allKeys.has(r.key),'Type missing from curricular catalogue '+r.key);
 const [topic,id]=r.key.split(':');assert(fns[topic]);
 const i=html.indexOf('function '+fns[topic]+'('),j=html.indexOf('/* ── GENERADOR ·',i+40);
 assert(i>=0&&j>i);
 assert(new RegExp('(?:if|else if)\\(type==='+Number(id)+'\\)\\{').test(html.slice(i,j)),'Generator branch missing '+r.key);
 assert(typeof r.cognitive_reason==='string'&&r.cognitive_reason.trim().length>0);
 assert(r.task.trim().length>0&&r.family_core.trim().length>0);
 assert.equal(r.approval,'pending');
 assert(r.level_candidate in counts);
 counts[r.level_candidate]++;
}
assert.deepEqual(counts,{N1:5,N2:15,N1_N2:0});
assert.equal(p.counts.official_levels_changed,0);
assert.equal(p.counts.official_families_approved,0);
for(const value of Object.values(p.authorizations))assert.equal(value,false);
console.log(JSON.stringify({new_types:20,earlier_level_records:80,level_candidates:counts,approved_levels:0,approved_families:0},null,2));
