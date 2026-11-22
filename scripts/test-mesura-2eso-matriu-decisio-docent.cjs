#!/usr/bin/env node
'use strict';
// Verifica la matriu de revisio docent, sense autoritzar familia ni nivell.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const dir=path.join(__dirname,'..','docs','auditoria');
const read=n=>JSON.parse(fs.readFileSync(path.join(dir,n),'utf8'));
const m=read('MI_2ESO_mesura_matriu_decisio_docent_3_candidates.json');
const spec=read('MI_2ESO_mesura_tres_especificacions_pedagogiques.json');
const cog=read('MI_2ESO_mesura_estimacio12_contrast_cognitiu.json');
const inv=read('MI_2ESO_mesura_tracabilitat_128_tipus.json');
const all=new Set(inv.types.map(x=>x.topic+':'+x.type));
const ids=new Set(spec.specifications.map(x=>x.proposal_id));
const crit=new Set(m.criteria.map(x=>x.code));
assert.equal(m.status,'teacher_review_matrix_no_approvals');
assert.deepEqual([...crit],['C1','C2','C3','C4','C5']);
assert.equal(m.records.length,3);assert.equal(ids.size,3);assert.equal(all.size,128);
assert.deepEqual(m.counts,{candidates:3,unapproved_families:3,validated_new_families:0,approved_levels_N3:0});
const seen=new Set();
for(const r of m.records){
 assert(ids.has(r.proposal_id));assert(!seen.has(r.proposal_id));seen.add(r.proposal_id);
 assert(r.nearest_types.length>=4&&r.nearest_types.every(k=>all.has(k)));
 assert.deepEqual(Object.keys(r.rubric_status),[...crit]);
 assert(r.rubric_status.C4==='pending');
 assert.equal(r.pilot_level_hypothesis,2);
 assert.equal(r.required_demonstrations.length,2);
 assert(r.required_demonstrations.every(t=>t.task.length>35&&t.expected.length>24));
 assert(r.teacher_choice_options.length>=4);
 assert(r.N3_requires.length>90);
 const existing=cog.cognitive_review.find(x=>x.proposal_id===r.proposal_id);
 assert(existing&&existing.suggested_level_for_pilot===r.pilot_level_hypothesis);
 assert(existing.approved_level===null);
 assert(spec.specifications.find(x=>x.proposal_id===r.proposal_id).new_family_approved===false);
}
assert(m.review_protocol.length===5);
const E=m.records.find(x=>x.topic==='escales');
assert(E.required_demonstrations.some(x=>x.test==='same_area_trap'));
const P=m.records.find(x=>x.topic==='perimetres');
assert(P.required_demonstrations.some(x=>x.test==='joined_boundary'));
const T=m.records.find(x=>x.topic==='estimacio');
assert(T.nearest_types.includes('estimacio:12')&&T.rubric_status.C2==='fails_current_screen');
// Oracles simples per les demostracions clau
assert.equal(4*3,6*2);assert.notDeepEqual([3,4],[2,6]);
assert(Math.abs((2*6+4+3.14*4/2)-22.28)<1e-8);
assert(Math.abs((3.14*4/2+4)-10.28)<1e-8);
assert(100*Math.abs(99-100)/100>.5);
assert(12.35>=12.35&&12.35<12.35===false);
console.log('OK: 3 decisions docents pendents, 5 criteris, 6 demostracions i cap família/N3 aprovats.');
