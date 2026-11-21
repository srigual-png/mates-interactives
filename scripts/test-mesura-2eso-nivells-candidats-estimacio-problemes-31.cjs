#!/usr/bin/env node
'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.join(__dirname,'..'),dir=path.join(root,'docs','auditoria');
const read=n=>JSON.parse(fs.readFileSync(path.join(dir,n),'utf8'));
const recent=read('MI_2ESO_mesura_nivells_candidats_estimacio_problemes_31.json');
const files=[
 'MI_2ESO_mesura_proposta_nivells_20_variants_pedagogiques.json',
 'MI_2ESO_mesura_nivells_candidats_unitats_escales_20.json',
 'MI_2ESO_mesura_nivells_candidats_escales_pitagores_20.json',
 'MI_2ESO_mesura_nivells_candidats_pitagores_perimetres_20.json',
 'MI_2ESO_mesura_nivells_candidats_perimetres_superficies_20.json'
];
const existing=files.map(read);
const keys=existing.flatMap((d,i)=>d.records.map(r=>i===0?r.type_or_variant:r.key));
const seenBase=new Set(keys.map(k=>k.split(':').slice(0,2).join(':')));
const inv=read('MI_2ESO_mesura_triatge_curricular_128_sense_quotes.json');
const full=new Set(inv.records.map(r=>r.key));
const html=fs.readFileSync(path.join(root,'2eso','sentit-mesura.html'),'utf8');
const funcs={estimacio:'genEstimacioError2ESO',problemes:'genProblemesMesura2ESO'};
const current=new Set(),totals={N1:0,N2:0,N1_N2:0};
assert.equal(recent.records.length,31);
assert.equal(keys.length,100);
assert.equal(seenBase.size,97);
for(const row of recent.records){
 assert(full.has(row.key),'Missing curricular type: '+row.key);
 assert(!seenBase.has(row.key),'Duplicate earlier pedagogical review: '+row.key);
 assert(!current.has(row.key),'Repeated current type: '+row.key);current.add(row.key);
 const [topic,id]=row.key.split(':');
 assert(funcs[topic],'Unexpected topic: '+topic);
 const start=html.indexOf('function '+funcs[topic]+'(');
 const next=html.indexOf('/* ── GENERADOR ·',start+30);
 const end=next>start?next:html.length;
 assert(start>=0&&end>start);
 const section=html.slice(start,end);
 assert(new RegExp('(?:if|else if)\\(type==='+Number(id)+'\\)\\{').test(section),'No generator branch for '+row.key);
 assert(typeof row.cognitive_reason==='string'&&row.cognitive_reason.trim().length>0);
 assert(typeof row.task==='string'&&row.task.trim().length>0);
 assert(row.family_core&&row.approval==='pending');
 assert(Object.hasOwn(totals,row.level_candidate),'Invalid candidate '+row.level_candidate);
 totals[row.level_candidate]++;
}
assert.deepEqual(totals,{N1:8,N2:17,N1_N2:6});
assert.equal(current.size,31);
assert.equal(new Set([...seenBase,...current]).size,128);
assert.equal(full.size,128);
assert.equal(recent.counts.official_levels_changed,0);
assert.equal(recent.counts.official_families_approved,0);
for(const val of Object.values(recent.permissions))assert.equal(val,false);
console.log(JSON.stringify({prior_records:100,new_records:31,proposed_records_total:131,unique_generator_types_with_level_hypotheses:128,variant_extra_records:3,level_hypotheses_new:totals,official_changes:0},null,2));
