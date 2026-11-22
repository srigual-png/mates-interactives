#!/usr/bin/env node
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const html=fs.readFileSync(path.join(__dirname,'..','2eso/sentit-mesura.html'),'utf8');
const start=html.indexOf('/* ── UTILS NUMÈRIQUES'),last=html.indexOf("return {topicId:'problemes',type,course:'2n'",start),end=html.indexOf('\n}',last)+2;
assert(start>=0&&last>start&&end>last);
let seed=0x2255abc1;const math=Object.create(Math);math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
const ctx=vm.createContext({Math:math,console});vm.runInContext(html.slice(start,end),ctx,{timeout:15000});
const gens=vm.runInContext('({problem:genProblemesMesura2ESO,surface:genSuperficiesVolums2ESO})',ctx);
const clean=s=>String(s).replace(/<[^>]*>/g,'').replace(/\s+/g,' ').trim();
const num=s=>Number(s.replace(',','.'));const byType={3:new Map(),13:new Map(),14:new Map()};let count=0;
const samplesPerType={3:400,13:2000,14:2000};
for(const type of [3,13,14])for(let i=0;i<samplesPerType[type];i++){
 const ex=type===3?gens.problem(3):gens.surface(type),q=clean(ex.question);
 let l,w,h,pct=100,capacityLitres,filledLitres,dimensionsM;
 if(type===3){const m=q.match(/fa ([\d,.]+) × ([\d,.]+) × ([\d,.]+) cm i està ple al ([\d,.]+)%/);assert(m,'Cannot parse partial tank '+q);[l,w,h,pct]=m.slice(1).map(num);dimensionsM=[l/100,w/100,h/100];capacityLitres=l*w*h/1000;filledLitres=capacityLitres*pct/100;}
 else if(type===13){const m=q.match(/mesura ([\d,.]+) m × ([\d,.]+) m × ([\d,.]+) m/);assert(m,'Cannot parse metres '+q);[l,w,h]=m.slice(1).map(num);dimensionsM=[l,w,h];capacityLitres=l*w*h*1000;filledLitres=capacityLitres;}
 else{const m=q.match(/dimensions interiors de ([\d,.]+) dm × ([\d,.]+) dm × ([\d,.]+) dm/);assert(m,'Cannot parse dm '+q);[l,w,h]=m.slice(1).map(num);dimensionsM=[l/10,w/10,h/10];capacityLitres=l*w*h;filledLitres=capacityLitres;}
 const ans=ex.correct.match(/^([\d,.]+) L$/);assert(ans,'Expected litres '+ex.correct);assert(Math.abs(num(ans[1])-filledLitres)<0.00501,'Volume oracle incorrect '+type+' '+q);
 assert.equal(ex.options.length,4);assert.equal(new Set(ex.options).size,4);assert(ex.options.includes(ex.correct));assert(ex.guide.length>0&&ex.solution.length>0);
 const physicalVolumeM3=capacityLitres/1000;
 const record={question:q,answer:ex.correct,l,w,h,pct,full_capacity_litres:capacityLitres,filled_litres:filledLitres,full_volume_m3:physicalVolumeM3};
 const physicalDimensionsM=dimensionsM.map(x=>Number(x.toFixed(6))).sort((a,b)=>a-b);
 record.dimensions_m=physicalDimensionsM;
 const key=physicalDimensionsM.join(':');if(!byType[type].has(key))byType[type].set(key,record);count++;
}
const a=[...byType[3].values()],b=[...byType[13].values()],c=[...byType[14].values()];
assert.equal(a.length,4);assert(b.length>0&&c.length>0);
const inputOverlap=Array.from(byType[3].keys()).filter(k=>byType[13].has(k)||byType[14].has(k));
const exactPhysicalPairs=a.flatMap(p=>[...b.map(x=>({target:'superficies:13',record:x})),...c.map(x=>({target:'superficies:14',record:x}))]
 .filter(x=>x.record.dimensions_m.join(':')===p.dimensions_m.join(':'))
 .map(x=>({source:p.question,source_answer:p.answer,fill_percentage:p.pct,physical_dimensions_m:p.dimensions_m,target:x.target,target_question:x.record.question,target_answer:x.record.answer,full_capacity_litres:p.full_capacity_litres})));
const canonical=dimensions=>dimensions.map(x=>Number(x.toFixed(6))).sort((x,y)=>x-y).join(':');
const sourceDomain=[[.8,.5,.4],[1,.6,.5],[.6,.4,.5],[1.2,.5,.5]].map(canonical);
const domain13=[3,4,5,6].flatMap(l=>[2,3,4].flatMap(w=>[1,1.5,2].map(h=>canonical([l,w,h]))));
const domain14=[.4,.5,.6,.8].flatMap(l=>[.2,.3,.4,.5].flatMap(w=>[.2,.3,.4].map(h=>canonical([l,w,h]))));
const exhaustiveDomainMatches={
 superficies13:sourceDomain.filter(key=>domain13.includes(key)),
 superficies14:sourceDomain.filter(key=>domain14.includes(key))
};
assert.equal(exhaustiveDomainMatches.superficies13.length,0,'Unexpected exact physical dimensions in the finite superficies:13 domain');
assert.equal(exhaustiveDomainMatches.superficies14.length,2,'Expected two exact physical dimensions in the finite superficies:14 domain');
assert.equal(exactPhysicalPairs.length,2,'The sampled generators should reproduce the two exhaustive matches');
assert(exactPhysicalPairs.every(pair=>pair.target==='superficies:14'));
assert.equal(exactPhysicalPairs.length,inputOverlap.length,'Exact physical match count mismatch');
assert(exactPhysicalPairs.every(pair=>Math.abs(Number(pair.source_answer.match(/[\d,.]+/)[0].replace(',','.'))-pair.full_capacity_litres*pair.fill_percentage/100)<0.00501));
const sameFullCapacity=a.flatMap(p=>c.filter(x=>Math.abs(x.full_capacity_litres-p.full_capacity_litres)<1e-8).map(x=>({partial_tank:p.question,partial_tank_result:p.answer,tank_full_capacity_litres:p.full_capacity_litres,dm3_box:x.question,box_capacity:x.answer,interpretation:'Same numerical full capacity in litres but distinct physical dimensions; partial tank adds percentage and changes final answer'})));
const examples={partial_tanks:a.map(x=>({full_litres:x.full_capacity_litres,fill_pct:x.pct,water_litres:x.filled_litres})),metre_tanks:b.slice(0,2).map(x=>({dimensions:[x.l,x.w,x.h],capacity_litres:x.full_capacity_litres})),dm_boxes:c.slice(0,2).map(x=>({dimensions:[x.l,x.w,x.h],capacity_litres:x.full_capacity_litres}))};
console.log(JSON.stringify({generated_and_verified:count,verified_by_type:{'problemes:3':samplesPerType[3],'superficies:13':samplesPerType[13],'superficies:14':samplesPerType[14]},unique_sampled_physical_fixtures_after_normalizing_to_metres:{problem3:a.length,surface13:b.length,surface14:c.length},exhaustive_finite_domain_dimension_matches:exhaustiveDomainMatches,exact_physical_pairs_from_samples:exactPhysicalPairs,same_full_litres_pairs_with_superficies13:a.flatMap(p=>b.filter(x=>Math.abs(x.full_capacity_litres-p.full_capacity_litres)<1e-8)).length,same_full_litres_pairs_with_superficies14:sameFullCapacity.length,volume_examples:examples,same_full_litres_examples:sameFullCapacity.slice(0,5),pedagogy:'Same volume/capacity model and final unit (litres); exact physical dimensions occur with superficies:14. Problemes:3 additionally applies fill percentage; superficies:13/14 find total capacity with m³/dm³-to-L conversion.',teacher_approved:false},null,2));
assert.equal(count,4400);
