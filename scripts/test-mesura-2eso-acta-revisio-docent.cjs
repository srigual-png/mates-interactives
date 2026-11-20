#!/usr/bin/env node
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const base=path.join(__dirname,'..','docs','auditoria');
const load=n=>JSON.parse(fs.readFileSync(path.join(base,n),'utf8'));
const act=load('MI_2ESO_mesura_acta_revisio_docent_escales_perimetres_en_blanc.json');
const sheets=load('MI_2ESO_mesura_fitxes_avaluacio_8_tasques.json');
const matrix=load('MI_2ESO_mesura_matriu_decisio_docent_3_candidates.json');
const protocol=load('MI_2ESO_mesura_protocol_docent_escales_perimetres.json');
const allIds=new Set(protocol.tasks.map(x=>x.id));
const matrixIds=new Set(matrix.records.filter(x=>x.topic!=='estimacio').map(x=>x.proposal_id));
assert.equal(act.status,'blank_teacher_review_minute_not_signed');
assert.equal(act.meeting.review_completed,false);
for(const key of ['date','reviewer_code','meeting_reference','notes'])assert.equal(act.meeting[key],null);
assert.equal(act.cases.length,2);
assert.deepEqual([...matrixIds].sort(),act.cases.map(x=>x.proposal_id).sort());
const criterionIds=matrix.criteria.map(x=>x.code);
assert.deepEqual(criterionIds,['C1','C2','C3','C4','C5']);
for(const c of act.cases){
 assert.deepEqual(Object.keys(c.family_decision.criteria),criterionIds);
 assert(c.review_task_ids.length===4);
 assert(c.review_task_ids.every(t=>allIds.has(t)));
 assert(c.review_task_ids.every(t=>protocol.tasks.find(x=>x.id===t).proposal_id===c.proposal_id));
 assert.equal(c.review_task_ids.filter(id=>sheets.sheets.find(s=>s.task_id===id).relation_to_family_decision==='baseline_not_new').length,1);
 assert.equal(c.family_decision.approved,false);
 assert.equal(c.family_decision.outcome,null);
 assert.equal(c.family_decision.family_id_if_approved,null);
 assert.equal(c.family_decision.reviewer_signoff,null);
 assert.equal(c.difficulty_decision.assessed_separately_from_family,true);
 assert.equal(c.difficulty_decision.provisional_pilot_hypothesis,2);
 assert.equal(c.difficulty_decision.recommended_level,null);
 assert.equal(c.difficulty_decision.approved,false);
 for(const crit of Object.values(c.family_decision.criteria)){
  assert.equal(crit.status,null);
  assert.equal(crit.evidence_reference,null);
  assert.equal(crit.teacher_justification,null);
 }
 for(const val of Object.values(c.evidence_review))assert.equal(val,null);
 assert.equal(c.implementation_gate.requested,false);
 assert.equal(c.implementation_gate.explicit_authorization,null);
 assert.equal(c.implementation_gate.pr_merge_authorized,false);
 assert.equal(c.implementation_gate.web_publish_authorized,false);
}
assert.deepEqual(act.summary,{cases:2,criteria_per_case:5,recorded_teacher_decisions:0,approved_families:0,approved_levels:0,approved_N3:0,implementations_authorized:0});
assert(act.decision_vocabulary.family.includes('insufficient_evidence'));
assert.deepEqual(act.decision_vocabulary.level,[1,2,3]);
console.log('OK: 2 actes en blanc amb 10 criteris, decisions de família i nivell independents, zero aprovacions.');
