#!/usr/bin/env node
'use strict';
// Valida guies preparatòries, no resultats d'alumnat ni famílies noves.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const dir=path.join(__dirname,'..','docs','auditoria');
const read=name=>JSON.parse(fs.readFileSync(path.join(dir,name),'utf8'));
const guide=read('MI_2ESO_mesura_guies_observacio_E2_P3.json');
const protocol=read('MI_2ESO_mesura_protocol_docent_escales_perimetres.json');
const byId=new Map(protocol.tasks.map(t=>[t.id,t]));
const ids=new Set();
assert.equal(guide.status,'observation_guides_not_administered');
assert.equal(guide.guides.length,2);
let indicators=0,errors=0;
for(const row of guide.guides){
 assert(!ids.has(row.task_id));ids.add(row.task_id);
 assert(['E2','P3'].includes(row.task_id));
 const baseline=byId.get(row.task_id);assert(baseline);
 assert.equal(row.candidate,baseline.proposal_id);
 assert.equal(row.approval,null);
 assert(row.essential_reasoning.length>=4);
 assert(row.observable_indicators.length>=3);indicators+=row.observable_indicators.length;
 assert(row.error_codes.length>=4);errors+=row.error_codes.length;
 assert(row.contrast_tasks.length===3);
 assert(row.contrast_tasks.every(id=>byId.has(id)&&byId.get(id).proposal_id===baseline.proposal_id));
 assert(row.teacher_record_fields.includes('anonymous_session_code'));
 assert(row.teacher_record_fields.includes('prompting_used_none_minor_major'));
 assert(row.teacher_record_fields.includes('observed_steps'));
 for(const e of row.error_codes){
  assert(e.id&&e.label&&e.diagnosis&&e.corrective_probe);
 }
}
const e=guide.guides.find(x=>x.task_id==='E2').mathematical_oracle;
assert.equal(e.area_a_m2,e.a_real_m[0]*e.a_real_m[1]);
assert.equal(e.area_b_m2,e.b_real_m[0]*e.b_real_m[1]);
assert.equal(e.area_a_m2,e.area_b_m2);
assert.notDeepEqual(e.a_real_m.slice().sort((a,b)=>a-b),e.b_real_m.slice().sort((a,b)=>a-b));
assert.equal(e.equivalent,false);
assert.deepEqual(e.a_real_m,byId.get('E2').oracle.a_real_m);
assert.deepEqual(e.b_real_m,byId.get('E2').oracle.b_real_m);
const p=guide.guides.find(x=>x.task_id==='P3').mathematical_oracle;
assert.equal(p.rectangle_a_perimeter_m,20);
assert.equal(p.rectangle_b_perimeter_m,12);
assert.equal(p.internal_shared_length_m,4);
assert.equal(p.rectangle_a_perimeter_m+p.rectangle_b_perimeter_m-2*p.internal_shared_length_m,p.external_perimeter_m);
assert.equal(p.external_perimeter_m,byId.get('P3').oracle.perimeter_m);
assert.deepEqual(guide.counts,{guides:2,observable_indicators:indicators,error_codes:errors,teacher_observations:0,approved_new_families:0,approved_N3:0});
assert.equal(guide.observation_protocol.decision_status,'unreviewed');
console.log('OK: 2 guies E2/P3, 6 indicadors, 8 errors, controls i oracles; 0 observacions o aprovacions.');
