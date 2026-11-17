#!/usr/bin/env node
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const root=path.join(__dirname,'..'),dir=path.join(root,'docs/auditoria');
const load=n=>JSON.parse(fs.readFileSync(path.join(dir,n),'utf8'));
const report=load('MI_2ESO_mesura_nivells_candidats_escales_pitagores_20.json');
const first=load('MI_2ESO_mesura_proposta_nivells_20_variants_pedagogiques.json');
const second=load('MI_2ESO_mesura_nivells_candidats_unitats_escales_20.json');
const inventory=load('MI_2ESO_mesura_triatge_curricular_128_sense_quotes.json');
const h=fs.readFileSync(path.join(root,'2eso/sentit-mesura.html'),'utf8');
const prior=new Set([...first.records.map(x=>x.type_or_variant.split(':').slice(0,2).join(':')),...second.records.map(x=>x.key)]);
const indexed=new Set(inventory.records.map(x=>x.key));
assert.equal(report.records.length,20);
assert.equal(new Set(report.records.map(x=>x.key)).size,20);
const levels={N1:0,N2:0,N1_N2:0};
const fns={escales:'genEscales2ESO',pitagores:'genPitagores2ESO'};
for(const entry of report.records){
 assert(indexed.has(entry.key),'Unknown type '+entry.key);
 assert(!prior.has(entry.key),'Already classified '+entry.key);
 const [topic,n]=entry.key.split(':');assert(topic in fns);
 const pos=h.indexOf('function '+fns[topic]+'('),end=h.indexOf('/* ── GENERADOR ·',pos+35);
 assert(pos>=0);
 assert(new RegExp('(?:if|else if)\\(type==='+Number(n)+'\\)\\{').test(h.slice(pos,end>pos?end:undefined)),entry.key);
 assert(entry.reason.length>=25&&entry.example.length>=20);
 assert.equal(entry.approval,'pending');
 assert(entry.family_candidate.length>=3);
 assert(entry.level_candidate in levels);
 levels[entry.level_candidate]++;
}
assert.deepEqual(levels,{N1:2,N2:14,N1_N2:4});
assert.equal(report.counts.official_levels_applied,0);
for(const value of Object.values(report.permissions))assert.equal(value,false);
console.log(JSON.stringify({new_types:20,covered_types_or_variants_in_three_lots:60,level_hypotheses:levels,official_changes:0},null,2));
