#!/usr/bin/env node
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const dir=path.join(__dirname,'..','docs','auditoria');
const read=n=>JSON.parse(fs.readFileSync(path.join(dir,n),'utf8'));
const d=read('MI_2ESO_mesura_E2_P3_suficiencia_evidencia.json');
const act=read('MI_2ESO_mesura_acta_revisio_docent_escales_perimetres_en_blanc.json');
const sheets=read('MI_2ESO_mesura_fitxes_avaluacio_8_tasques.json');
const guides=read('MI_2ESO_mesura_guies_observacio_E2_P3.json');
assert.equal(d.status,'evidence_insufficient_for_teacher_decision');
assert.deepEqual(d.cases.map(x=>x.task),['E2','P3']);
assert.equal(act.meeting.review_completed,false);
assert.equal(sheets.counts.recorded_observations,0);
assert.equal(guides.counts.teacher_observations,0);
for(const x of d.cases){
 const s=sheets.sheets.find(y=>y.task_id===x.task);assert(s);
 const g=guides.guides.find(y=>y.task_id===x.task);assert(g);
 const c=act.cases.find(y=>y.proposal_id===x.candidate);assert(c);
 assert.equal(s.blank_observation.observed,null);
 assert.equal(c.family_decision.outcome,null);
 assert.equal(c.family_decision.approved,false);
 assert.equal(c.difficulty_decision.approved,false);
 assert.equal(x.teacher_decision,null);
 assert.equal(x.math_oracle_verified,true);
 assert.equal(x.student_responses_available,false);
 assert.equal(x.teacher_C1_to_C5_assessed,false);
 assert.equal(x.readiness,'not_ready_for_family_approval');
}
assert.deepEqual(d.count,{cases:2,teacher_observations:0,teacher_reviews:0,approved_new_families:0,approved_levels:0});
assert.equal(d.allowed_interim_status,'insufficient_evidence');
console.log('OK: E2 i P3 no estan a punt per aprovació; faltan decisions docents. Zero aprovacions inventades.');
