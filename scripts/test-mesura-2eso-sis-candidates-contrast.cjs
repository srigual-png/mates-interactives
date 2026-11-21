#!/usr/bin/env node
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const base=path.join(__dirname,'..','docs','auditoria');
const load=n=>JSON.parse(fs.readFileSync(path.join(base,n),'utf8'));
const doc=load('MI_2ESO_mesura_sis_candidates_contrast_12_casos.json');
const rubric=load('MI_2ESO_mesura_rubrica_propostes.json');
const eligible=new Set(rubric.assessments.filter(x=>x.screening_decision==='candidate_conditional').map(x=>x.proposal_id));
const eq=(a,b)=>assert(Math.abs(a-b)<1e-8,'Diferència '+a+' ≠ '+b);
assert.equal(eligible.size,6);
assert.equal(doc.counts.candidates,6);assert.equal(doc.cases.length,12);
const count=new Map();
for(const c of doc.cases){
 assert(eligible.has(c.proposal));count.set(c.proposal,(count.get(c.proposal)||0)+1);
 const x=c.input,y=c.expected;
 switch(c.proposal){
 case 'MI2-MES-U-N3-01':{
 const required=x.amounts_l.reduce((a,b)=>a+b,0),choices=x.containers_l.filter(v=>v>=required);
 eq(required,y.required_l);assert.equal(y.feasible,choices.length>0);
 assert.equal(y.choice_l,choices.length?Math.min(...choices):null);break;}
 case 'MI2-MES-E-N3-01':{
 const dims=(v,s)=>v.map(z=>z*s/100),a=dims(x.a_cm,x.a_scale),b=dims(x.b_cm,x.b_scale);
 const same=a.every((n,i)=>Math.abs(n-b[i])<1e-8);
 assert.equal(y.same,same);
 if(same)eq(y.area_m2,a[0]*a[1]);else assert.equal(y.area_m2,null);
 break;}
 case 'MI2-MES-PA-N3-01':{
 assert.equal(x.semicircle_diameter_m,x.width_m);
 const p=2*x.length_m+x.width_m+x.pi*x.semicircle_diameter_m/2;
 eq(p,y.perimeter_m);assert.equal(y.below,p<x.threshold_m);break;}
 case 'MI2-MES-S-N3-01':{
 const v=x.l_dm*x.w_dm*x.h_dm,area=x.l_dm*x.w_dm+2*x.l_dm*x.h_dm+2*x.w_dm*x.h_dm;
 eq(v,y.volume_l);eq(area,y.area_dm2);
 assert.equal(y.viable,v>=x.min_l&&area<x.max_area_dm2);break;}
 case 'MI2-MES-EST-N3-01':{
 const errors=x.measurements.map(v=>Math.abs(v-x.reference)/x.reference*100);
 assert.equal(errors.length,2);errors.forEach((v,i)=>eq(v,y.errors_pct[i]));
 assert.deepEqual(y.accepted,errors.map(v=>v<=x.tolerance_pct+1e-10));break;}
 case 'MI2-MES-PR-N3-01':{
 const real=x.drawing_cm.map(v=>v*x.scale/100);
 const fence=2*(real[0]+real[1])-x.gate_m;
 eq(fence,y.fence_m);assert.equal(Math.ceil(fence/x.roll_m),y.rolls);break;}
 default:assert.fail('Proposta inesperada '+c.proposal);
 }
 assert(c.reason.length>50,'Cal justificar cada contracas');
}
assert.equal(count.size,6);
for(const n of count.values())assert.equal(n,2);
assert.equal(doc.reviews.length,6);
const statuses={pending_distinct_strategy:0,likely_composite_reuse:0};
for(const r of doc.reviews){
 assert(eligible.has(r.proposal_id));assert(!r.novel_family_proven&&!r.level_N3_proven);
 assert(r.reason.length>75);statuses[r.classification]++;
}
assert.deepEqual(doc.counts,{candidates:6,contrasted_cases:12,...statuses,validated_new_families:0});
assert.equal(doc.status,'comparative_examples_only');
console.log('OK: 12 exemples independents calculats, sis candidates contrastades, cap N3/família validat');
