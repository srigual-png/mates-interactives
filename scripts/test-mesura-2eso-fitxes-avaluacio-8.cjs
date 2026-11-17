#!/usr/bin/env node
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const base=path.join(__dirname,'..','docs','auditoria');
const load=n=>JSON.parse(fs.readFileSync(path.join(base,n),'utf8'));
const doc=load('MI_2ESO_mesura_fitxes_avaluacio_8_tasques.json');
const protocol=load('MI_2ESO_mesura_protocol_docent_escales_perimetres.json');
const guides=load('MI_2ESO_mesura_guies_observacio_E2_P3.json');
const all=new Map(protocol.tasks.map(t=>[t.id,t]));
const domains=new Set(protocol.rubric.map(x=>x.criterion));
assert.equal(doc.status,'evaluation_sheets_blank_unadministered');
assert.equal(doc.sheets.length,8);assert.equal(all.size,8);
assert.equal(new Set(doc.sheets.map(x=>x.task_id)).size,8);
for(const s of doc.sheets){
 const task=all.get(s.task_id);assert(task,'Unknown task '+s.task_id);
 assert.equal(s.source_role,task.role);
 assert(s.observation_focus.length>35&&s.expected_evidence.length>=10);
 assert(s.likely_misconception.length>20&&s.diagnostic_question.length>20);
 assert(s.applied_rubric_dimensions.length>=2);
 assert(s.applied_rubric_dimensions.every(x=>domains.has(x)));
 assert.deepEqual(Object.keys(s.blank_observation.scores),s.applied_rubric_dimensions);
 assert(Object.values(s.blank_observation.scores).every(v=>v===null));
 assert.equal(s.blank_observation.observed,null);
 for(const key of ['anonymous_session_code','administered_at','assessor_code','prompting_used','observed_reasoning','feedback_notes'])assert.equal(s.blank_observation[key],null);
 assert.deepEqual(s.blank_observation.error_codes,[]);
 if(s.task_id==='E3'||s.task_id==='P2'){
  assert.equal(s.relation_to_family_decision,'baseline_not_new');
  assert(!s.applied_rubric_dimensions.includes('distinct_decision'));
 }else{
  assert(s.applied_rubric_dimensions.includes('distinct_decision'));
 }
 assert(!s.applied_rubric_dimensions.includes('transfer'));
}
const pairs=doc.scoring_rules.comparison_pairs;
assert.equal(pairs.length,2);
assert.deepEqual(pairs.map(x=>x.control),['E3','P2']);
assert.deepEqual(pairs.map(x=>x.transfer),['E4','P3']);
for(const pair of pairs)for(const v of Object.values(pair))if(/^[EP][1-4]$/.test(v))assert(all.has(v));
for(const guide of guides.guides)assert(doc.sheets.some(s=>s.task_id===guide.task_id));
for(const v of Object.values(doc.teacher_decision_record)){
 assert.equal(v.decision,null);assert.equal(v.criteria_C1_C5,null);
 assert.equal(v.justification,null);assert.equal(v.approved_level,null);
 assert.equal(v.implementation_authorized,false);
}
assert.deepEqual(doc.counts,{sheets:8,control_sheets:2,transfer_sheets:2,recorded_observations:0,recorded_teacher_decisions:0,approved_families:0,approved_N3:0});
console.log('OK: 8 fitxes en blanc, 2 controls no penalitzats, 2 transferències, cap observació ni aprovació.');
