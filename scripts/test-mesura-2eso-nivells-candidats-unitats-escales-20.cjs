#!/usr/bin/env node
'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const base=path.join(__dirname,'..'),root=path.join(base,'docs','auditoria');
const read=file=>JSON.parse(fs.readFileSync(path.join(root,file),'utf8'));
const p=read('MI_2ESO_mesura_nivells_candidats_unitats_escales_20.json');
const previous=read('MI_2ESO_mesura_proposta_nivells_20_variants_pedagogiques.json');
const triage=read('MI_2ESO_mesura_triatge_curricular_128_sense_quotes.json');
const html=fs.readFileSync(path.join(base,'2eso','sentit-mesura.html'),'utf8');
const byKey=new Map(triage.records.map(x=>[x.key,x]));
const prev=new Set(previous.records.map(x=>x.type_or_variant.split(':').slice(0,2).join(':')));
assert.equal(p.records.length,20);
assert.equal(new Set(p.records.map(x=>x.key)).size,20);
const actual={N1:0,N2:0,N1_N2:0};
const fns={unitats:'genUnitats2ESO',escales:'genEscales2ESO'};
let uniqueCores=new Set();
for(const row of p.records){
 assert(!prev.has(row.key),'Overlap with previous candidate levels: '+row.key);
 const source=byKey.get(row.key);assert(source,'No curricular record '+row.key);
 const [topic,id]=row.key.split(':');assert(topic in fns);
 const start=html.indexOf('function '+fns[topic]+'(');assert(start>=0);
 const end=html.indexOf('/* ── GENERADOR ·',start+35);
 const part=html.slice(start,end>start?end:undefined);
 const regex=new RegExp('(?:if|else if)\\(type==='+Number(id)+'\\)\\{');
 assert(regex.test(part),'Missing actual generator '+row.key);
 assert(row.task.trim().length>=15&&row.reason.trim().length>=20);
 assert(['N1','N2','N1_N2'].includes(row.level_candidate));
 assert.equal(row.approval,'pending');
 assert(row.family_candidate.length>2);
 actual[row.level_candidate]++;
 uniqueCores.add(row.family_candidate);
}
assert.deepEqual(actual,{N1:5,N2:14,N1_N2:1});
assert.equal(p.counts.official_level_assignments,0);
assert.equal(p.counts.official_family_approvals,0);
assert(p.not_authorized.some(x=>x.includes('estimacio:12')));
console.log(JSON.stringify({new_types:20,nonoverlap:true,level_hypotheses:actual,distinct_working_cores:uniqueCores.size,official_changes:0},null,2));
