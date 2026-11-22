#!/usr/bin/env node
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const source=fs.readFileSync(path.join(__dirname,'..','2eso/sentit-mesura.html'),'utf8');
const a=source.indexOf('/* ── UTILS NUMÈRIQUES'),anchor=source.indexOf("return {topicId:'problemes',type,course:'2n'",a),end=source.indexOf('\n}',anchor)+2;
assert(a>=0&&anchor>a&&end>anchor);
let seed=0x20261117;const math=Object.create(Math);math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
const ctx=vm.createContext({Math:math,console});vm.runInContext(source.slice(a,end),ctx,{timeout:15000});
const gen=vm.runInContext('({problem:genProblemesMesura2ESO,surface:genSuperficiesVolums2ESO})',ctx);
const plain=x=>String(x).replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim();
const n=x=>Number(x.replace(',','.'));
const fixtures={3:new Map(),13:new Map(),14:new Map()};
for(const type of [3,13,14])for(let i=0;i<35;i++){
 const ex=type===3?gen.problem(3):gen.surface(type),question=plain(ex.question);
 let m,actualL,fullL,fill=100,physical=[];
 if(type===3){m=question.match(/fa ([\d,.]+) × ([\d,.]+) × ([\d,.]+) cm i està ple al ([\d,.]+)%/);assert(m,question);physical=m.slice(1,4).map(n);fill=n(m[4]);fullL=physical.reduce((a,b)=>a*b,1)/1000;actualL=fullL*fill/100;assert(ex.guide.some(x=>/percentatge|ompliment/i.test(x)),'Missing percentage guidance');assert(ex.solution.some(x=>x.includes('%')),'Missing filling explanation');}
 else if(type===13){m=question.match(/mesura ([\d,.]+) m × ([\d,.]+) m × ([\d,.]+) m/);assert(m,question);physical=m.slice(1).map(n);fullL=physical.reduce((a,b)=>a*b,1)*1000;actualL=fullL;assert(ex.solution.some(x=>/1\.000 L|1.000 L/.test(x)),'Missing m3 to litre bridge');}
 else {m=question.match(/dimensions interiors de ([\d,.]+) dm × ([\d,.]+) dm × ([\d,.]+) dm/);assert(m,question);physical=m.slice(1).map(n);fullL=physical.reduce((a,b)=>a*b,1);actualL=fullL;assert(ex.solution.some(x=>/1 dm³ = 1 L/.test(x)),'Missing dm3 to litre bridge');}
 const result=n(ex.correct.replace(/ L$/,''));assert(Math.abs(actualL-result)<.00501);
 const key=physical.join(':');if(!fixtures[type].has(key))fixtures[type].set(key,{question,answer:ex.correct,fullL,actualL,fill,physical});
}
const sourceFixtures=[...fixtures[3].values()];
const caseContrast=sourceFixtures.map(x=>({fullCapacityL:x.fullL,fillingPct:x.fill,waterL:x.actualL,mathSteps:['V = length × width × height','cm³ ÷ 1000 → litres',String(x.fill)+'% of capacity']}));
assert(sourceFixtures.length===4,'Four distinct partial fill fixture cases expected');
assert(sourceFixtures.every(x=>x.fill<100&&x.actualL<x.fullL));
const sameParameterInstances=sourceFixtures.filter(p=>[...fixtures[13].values(),...fixtures[14].values()].some(v=>p.physical.join(':')===v.physical.join(':')));
assert.equal(sameParameterInstances.length,0,'Physical dimensions must be distinguished by units');
console.log(JSON.stringify({suite:'partial_fill_pedagogic_differential_only',new_sample_draws:105,unique_partial_fill_cases:caseContrast.length,distinct_target_sets:{metres:fixtures[13].size,decimetres:fixtures[14].size},identical_dimension_fixtures:0,examples:caseContrast,curricular_conclusion:'All ask capacity in L, but partial-fill adds percentage and conversion cm³→L; metres require m³→L, decimetres direct dm³→L; not a validated common family',family_approved:false},null,2));
