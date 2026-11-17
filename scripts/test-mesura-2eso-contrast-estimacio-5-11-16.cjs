#!/usr/bin/env node
'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.join(__dirname,'..');
const d=JSON.parse(fs.readFileSync(path.join(root,'docs/auditoria','MI_2ESO_mesura_contrast_estimacio_5_11_16.json'),'utf8'));
const h=fs.readFileSync(path.join(root,'2eso','sentit-mesura.html'),'utf8');
assert.equal(d.status,'pedagogical_overlap_recommendation_not_approved');
assert.deepEqual(Object.keys(d.observed).sort(),['estimacio:11','estimacio:16','estimacio:5']);
const start=h.indexOf('function genEstimacioError2ESO('),end=h.indexOf('/* ── GENERADOR ·',start+25);
const section=h.slice(start,end>start?end:h.length);
const bodies={};
for(const n of [5,11,16]){
 const m=new RegExp('(?:if|else if)\\(type==='+n+'\\)\\{').exec(section);
 assert(m,'Missing estimation '+n);
 const tail=section.slice(m.index),stop=tail.search(/\n  else if\(type===|\n  return \{/);
 bodies[n]=tail.slice(0,stop<0?tail.length:stop);
 assert(bodies[n].includes('question='));
 assert(bodies[n].includes('correct='));
}
assert(bodies[5].includes('roundTo(value,1)'));
assert(bodies[16].includes('roundTo(value,1)'));
assert(bodies[11].includes('menys precís que encara compleix'));
assert(bodies[11].includes('marges') || bodies[11].includes('margins'));
assert(bodies[11].includes('errors màxims garantits'));
assert(bodies[11].includes('correct=c.correct'));
assert(bodies[11].includes('allowOpen=false'));
assert(d.comparison.rewrite_to_explicit_rounding.duplicates_existing_core);
assert(d.comparison.retain_contextual_precision.distinct_possible);
assert.equal(d.recommendation.family_count_effect,0);
assert.equal(d.recommendation.implementation_authorized,false);
assert.equal(d.recommendation.teacher_decision,null);
console.log('OK: arrodoniment repetit a 5/16; selecció contextual d’instrument a 11; cap aprovació de família.');
