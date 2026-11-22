#!/usr/bin/env node
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const dir=path.join(__dirname,'..','docs','auditoria'),load=n=>JSON.parse(fs.readFileSync(path.join(dir,n),'utf8'));
const doc=load('MI_2ESO_mesura_tres_especificacions_pedagogiques.json');
const prior=load('MI_2ESO_mesura_cinc_candidates_diferencials.json');
const original=load('MI_2ESO_mesura_tracabilitat_128_tipus.json');
const source=new Map(prior.records.filter(x=>x.classification==='promising_distinct_family_to_review').map(x=>[x.id,x]));
const all=new Set(original.types.map(x=>x.topic+':'+x.type));
assert.equal(source.size,3);assert.equal(all.size,128);
assert.equal(doc.status,'pedagogical_specification_pending_teacher_review');
assert.equal(doc.specifications.length,3);
let variants=0;
for(const s of doc.specifications){
 const ref=source.get(s.proposal_id);assert(ref,'Proposta sense font: '+s.proposal_id);
 assert.equal(s.topic,ref.topic);assert.deepEqual(s.closest_existing,ref.closest);
 assert.equal(s.new_family_approved,false);assert.equal(s.level_approved,null);assert.equal(s.level_hypothesis,3);
 for(const k of s.closest_existing)assert(all.has(k),'Tipus existent no reconegut: '+k);
 assert(s.differential.length>85&&s.uncertainty.length>35);
 assert(s.errors.length>=3&&s.scaffold.length>=3);
 assert.equal(s.variants.length,3);variants+=s.variants.length;
 for(const v of s.variants){
  if(s.topic==='escales'){
   const toMeters=(a,n)=>a.map(x=>x*n/100).sort((a,b)=>a-b);
   const a=toMeters(v.a_cm,v.a_scale),b=toMeters(v.b_cm,v.b_scale);
   assert.equal(a.every((x,i)=>Math.abs(x-b[i])<1e-9),v.equivalent,'Plànols: '+v.id);
   if(v.id==='same_area_non_equivalent')assert.equal(a[0]*a[1],b[0]*b[1]);
  } else if(s.topic==='perimetres'){
   const p=2*v.length_m+v.width_m+v.pi*v.width_m/2;
   assert(Math.abs(p-v.perimeter_m)<1e-8,'Perímetre: '+v.id);
   assert.equal(p<v.limit_m,v.below,'Llindar: '+v.id);
  } else if(s.topic==='estimacio'){
   const accepted=v.measurements.map(x=>100*Math.abs(x-v.reference)/v.reference<=v.tolerance_pct+1e-10);
   assert.deepEqual(accepted,v.accepted,'Tolerància: '+v.id);
  }else assert.fail('Tema inesperat: '+s.topic);
 }
}
assert.deepEqual(doc.counts,{specifications:3,variants:9,approved_genuine_families:0,approved_N3:0});
assert(doc.review_gates.length>=3);
console.log('OK: 3 especificacions i 9 variants amb oracles independents; 0 famílies i 0 N3 aprovats.');
