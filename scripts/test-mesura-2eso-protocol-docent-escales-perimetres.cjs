#!/usr/bin/env node
'use strict';
// Verificació de les tasques del protocol; no hi ha dades d'alumnat ni aprovacions.
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path');
const dir=path.join(__dirname,'..','docs','auditoria');
const read=n=>JSON.parse(fs.readFileSync(path.join(dir,n),'utf8'));
const p=read('MI_2ESO_mesura_protocol_docent_escales_perimetres.json');
const matrix=read('MI_2ESO_mesura_matriu_decisio_docent_3_candidates.json');
const specs=read('MI_2ESO_mesura_tres_especificacions_pedagogiques.json');
const inv=read('MI_2ESO_mesura_tracabilitat_128_tipus.json');
const keys=new Set(inv.types.map(t=>t.topic+':'+t.type));
const eq=(a,b)=>assert(Math.abs(a-b)<1e-8,'Error numeric '+a+' versus '+b);
assert.equal(p.status,'review_protocol_not_administered');
assert.equal(p.candidates.length,2);assert.equal(p.tasks.length,8);
assert.equal(p.rubric.length,4);assert.equal(new Set(p.rubric.map(x=>x.criterion)).size,4);
assert.deepEqual(p.counts,{candidates:2,tasks:8,controls:2,transfer_tasks:2,teacher_decisions_recorded:0,new_families_approved:0,N3_approved:0});
const seen=new Set(), roleCounts={}, tasksFor={};
for(const t of p.tasks){
 assert(!seen.has(t.id));seen.add(t.id);
 const candidate=p.candidates.find(x=>x.proposal_id===t.proposal_id);assert(candidate);
 assert(t.student_prompt.length>70&&t.success_signal.length>55);
 (tasksFor[t.proposal_id]??=[]).push(t.role);roleCounts[t.role]=(roleCounts[t.role]||0)+1;
 const v=t.inputs,o=t.oracle;
 if(candidate.topic==='escales'){
   const actualA=v.a_cm.map(x=>x*v.scale_a/100);
   actualA.forEach((x,i)=>eq(x,o.a_real_m[i]));
   eq(actualA[0]*actualA[1],o.area_a_m2);
   if(v.b_cm){
     const actualB=v.b_cm.map(x=>x*v.scale_b/100);
     actualB.forEach((x,i)=>eq(x,o.b_real_m[i]));
     eq(actualB[0]*actualB[1],o.area_b_m2);
     const sa=actualA.slice().sort((a,b)=>a-b),sb=actualB.slice().sort((a,b)=>a-b);
     assert.equal(sa.every((x,i)=>Math.abs(x-sb[i])<1e-8),o.same);
     if(t.role==='candidate_equal_area_trap'){eq(o.area_a_m2,o.area_b_m2);assert.equal(o.same,false);}
   }
 } else if(v.shape==='rectangle_semicircle_join'){
   eq(2*v.length_m+v.width_m+v.pi*v.width_m/2,o.perimeter_m);
   eq(v.width_m,o.shared_edge_m);
 } else if(v.shape==='isolated_semicircle'){
   eq(v.pi*v.diameter_m/2+v.diameter_m,o.perimeter_m);
   eq(0,o.shared_edge_m);
 } else if(v.shape==='two_rectangles_join'){
   eq(2*(v.length_a_m+v.length_b_m+v.shared_height_m),o.perimeter_m);
   eq(v.shared_height_m,o.shared_edge_m);
 } else assert.fail('Figura inesperada: '+v.shape);
}
assert.equal(seen.size,8);
for(const c of p.candidates){
 assert(keys.has(c.nearest_baseline));
 assert(matrix.records.some(x=>x.proposal_id===c.proposal_id));
 assert(specs.specifications.some(x=>x.proposal_id===c.proposal_id));
 assert.deepEqual(tasksFor[c.proposal_id].slice().sort(),c.required_roles.slice().sort());
 assert.equal(c.approved_family,false);assert.equal(c.approved_level,null);
 assert.equal(c.provisional_level_hypothesis,2);
 assert(c.review_options.includes('insufficient_evidence'));
}
assert.equal(p.tasks.filter(x=>x.role.startsWith('baseline_')).length,2);
assert.equal(p.tasks.filter(x=>x.role.startsWith('transfer_')).length,2);
assert(p.acceptance_conditions.length>=4);
console.log('OK: 8 casos amb oracles independents, 2 controls i 2 transferencies; 0 aprovacions docents.');
