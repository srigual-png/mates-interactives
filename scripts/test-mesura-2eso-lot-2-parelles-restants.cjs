#!/usr/bin/env node
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const html=fs.readFileSync(path.join(__dirname,'..','2eso','sentit-mesura.html'),'utf8');
const start=html.indexOf('/* ── UTILS NUMÈRIQUES'),mark=html.indexOf("return {topicId:'problemes',type,course:'2n'",start),end=html.indexOf('\n}',mark)+2;
assert(start>=0&&mark>start&&end>mark,'Generator source unavailable');
let seed=0x4c4f5432,calls=0;const math=Object.create(Math);
math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;assert(++calls<500000,'Random budget exceeded');return seed/4294967296};
const ctx=vm.createContext({Math:math,console});vm.runInContext(html.slice(start,end),ctx,{timeout:15000});
const gen=vm.runInContext('genEstimacioError2ESO',ctx);
const clean=s=>String(s).replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim();
const num=s=>Number(String(s).replace(',','.').replace(/\.$/,''));
const buckets={17:new Map(),18:new Map(),9:new Map(),13:new Map()};
const take=(type)=>{
 const ex=gen(type),q=clean(ex.question);let entries=[];
 if(type===17){
  const m=q.match(/valor de referència és ([\d,.]+)\. Aproximació A: ([\d,.]+)\. Aproximació B: ([\d,.]+)/);assert(m,'Cannot parse estimacio:17 '+q);
  const [r,a,b]=m.slice(1).map(num),ea=Math.abs(a-r),eb=Math.abs(b-r);
  assert.equal(ex.correct,ea<eb?'L’aproximació A':'L’aproximació B');entries=[{key:r+':'+a,q,answer:ex.correct},{key:r+':'+b,q,answer:ex.correct}];
 }else if(type===18){
  const m=q.match(/referència ([\d,.]+) i una aproximació ([\d,.]+).*?=(\d+)/);assert(m,'Cannot parse estimacio:18 '+q);
  const [r,a,sum]=m.slice(1).map(num);assert.equal(sum,r+a);assert.equal(ex.correct,'Ha sumat els valors en lloc de calcular-ne la diferència absoluta');
  entries=[{key:r+':'+a,q,answer:ex.correct,absolute_error:Math.abs(a-r)}];
 }else if(type===9){
  const m=q.match(/Mesura A: referència ([\d,.]+), aproximació ([\d,.]+)\. Mesura B: referència ([\d,.]+), aproximació ([\d,.]+)/);assert(m,'Cannot parse estimacio:9 '+q);
  const [ra,a,rb,b]=m.slice(1).map(num),ea=Math.abs(a-ra)/ra,eb=Math.abs(b-rb)/rb;
  assert.equal(ex.correct,ea<eb?'La mesura A':'La mesura B',q+'; '+ea+' vs '+eb);entries=[{key:ra+':'+a,q,answer:ex.correct,relative_error:ea},{key:rb+':'+b,q,answer:ex.correct,relative_error:eb}];
 }else{
  const m=q.match(/error absolut de ([\d,.]+) sobre un valor de referència de ([\d,.]+)/);assert(m,'Cannot parse estimacio:13 '+q);
  const [abs,r]=m.slice(1).map(num),pct=100*abs/r;assert(Math.abs(num(ex.correct.replace('%',''))-pct)<1e-8);
  entries=[{key:r+':'+(r+abs),q,answer:ex.correct,relative_error:pct/100}];
 }
 assert.equal(ex.options.length,4);assert.equal(new Set(ex.options).size,4);assert(ex.options.includes(ex.correct));assert(ex.guide.length>0&&ex.solution.length>0);
 for(const e of entries)if(!buckets[type].has(e.key))buckets[type].set(e.key,e);
 return ex;
};
const verified={17:0,18:0,9:0,13:0};
for(const type of [17,18,9,13])for(let i=0;i<400;i++){take(type);verified[type]++;}
const absoluteKeys=[...buckets[18].keys()].filter(k=>buckets[17].has(k)).sort();
const relativeKeys=[...buckets[9].keys()].filter(k=>buckets[13].has(k)).sort();
assert(absoluteKeys.length>=2,'Need two exact reference/approximation overlaps for 18↔17');
assert(relativeKeys.length>=2,'Need two exact reference/approximation overlaps for 9↔13');
const absolutePairs=absoluteKeys.slice(0,2).map(key=>{
 const a=buckets[18].get(key),b=buckets[17].get(key),error=Math.abs(num(key.split(':')[1])-num(key.split(':')[0]));
 assert.equal(a.absolute_error,error);assert(b.q.includes(key.split(':')[1]));
 return {shared_reference_and_approximation:key,diagnosis:{question:a.q,answer:a.answer},comparison:{question:b.q,answer:b.answer},interpretation:'La mateixa aproximació participa en un diagnòstic de suma errònia i en la comparació de dos errors absoluts.'};
});
const relativePairs=relativeKeys.slice(0,2).map(key=>{
 const a=buckets[9].get(key),b=buckets[13].get(key),[r,approx]=key.split(':').map(Number),rel=Math.abs(approx-r)/r;
 assert(Math.abs(a.relative_error-rel)<1e-12);assert(Math.abs(b.relative_error-rel)<1e-12);
 return {shared_reference_and_approximation:key,comparison:{question:a.q,answer:a.answer},calculation:{question:b.q,answer:b.answer},interpretation:'Mateix error relatiu per a una de les mesures; el tipus 9 afegeix una segona mesura i una decisió comparativa.'};
});
const report={lot:'estimacio:18↔17 and estimacio:9↔13',independent_oracle_instances:Object.values(verified).reduce((a,b)=>a+b,0),verified,paired_examples:absolutePairs.length+relativePairs.length,overlap_counts:{'18↔17':absoluteKeys.length,'9↔13':relativeKeys.length},pairs:{'estimacio:18↔17':absolutePairs,'estimacio:9↔13':relativePairs},teacher_approved:false};
console.log(JSON.stringify(report,null,2));
assert.equal(report.independent_oracle_instances,1600);assert.equal(report.paired_examples,4);
