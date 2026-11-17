#!/usr/bin/env node
'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const base=path.join(__dirname,'..'),dir=path.join(base,'docs','auditoria');
const read=name=>JSON.parse(fs.readFileSync(path.join(dir,name),'utf8'));
const proposed=read('MI_2ESO_mesura_nivells_candidats_pitagores_perimetres_20.json');
const prior=[
 ...read('MI_2ESO_mesura_proposta_nivells_20_variants_pedagogiques.json').records.map(x=>x.type_or_variant.split(':').slice(0,2).join(':')),
 ...read('MI_2ESO_mesura_nivells_candidats_unitats_escales_20.json').records.map(x=>x.key),
 ...read('MI_2ESO_mesura_nivells_candidats_escales_pitagores_20.json').records.map(x=>x.key)
];
const inventory=new Map(read('MI_2ESO_mesura_triatge_curricular_128_sense_quotes.json').records.map(x=>[x.key,x]));
const html=fs.readFileSync(path.join(base,'2eso','sentit-mesura.html'),'utf8');
const used=new Set(prior),levels={N1:0,N2:0,N1_N2:0},seen=new Set();
assert.equal(proposed.records.length,20);
for(const row of proposed.records){
 assert(!used.has(row.key),'Duplicate previous batch: '+row.key);
 assert(!seen.has(row.key),'Duplicate in batch: '+row.key);seen.add(row.key);
 const inv=inventory.get(row.key);assert(inv,'No curricular inventory '+row.key);
 const [topic,id]=row.key.split(':');const fn={pitagores:'genPitagores2ESO',perimetres:'genPerimetresArees2ESO'}[topic];assert(fn,'Unexpected topic '+topic);
 const i=html.indexOf('function '+fn+'('),j=html.indexOf('/* ── GENERADOR ·',i+40);assert(i>=0);
 assert(new RegExp('(?:if|else if)\\(type==='+Number(id)+'\\)\\{').test(html.slice(i,j>i?j:undefined)),'Missing generator branch '+row.key);
 assert(row.cognitive_reason.trim().length>35);
 assert(row.task.trim().length>10&&row.family_core.length>2);
 assert.equal(row.approved,false);
 assert(row.level_candidate in levels);
 levels[row.level_candidate]++;
}
assert.deepEqual(levels,{N1:6,N2:12,N1_N2:2});
assert.equal(proposed.counts.official_levels_changed,0);
assert.equal(proposed.counts.approved_families,0);
for(const value of Object.values(proposed.permissions))assert.equal(value,false);
console.log(JSON.stringify({new_types:20,previous_documented_records:60,nonoverlapping:true,level_hypotheses:levels,official_changes:0},null,2));
