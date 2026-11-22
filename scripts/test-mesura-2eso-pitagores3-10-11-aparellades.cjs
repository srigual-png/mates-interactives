#!/usr/bin/env node
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const html=fs.readFileSync(path.join(__dirname,'..','2eso/sentit-mesura.html'),'utf8');
const start=html.indexOf('/* ── UTILS NUMÈRIQUES'),last=html.indexOf("return {topicId:'problemes',type,course:'2n'",start),end=html.indexOf('\n}',last)+2;
assert(start>=0&&last>start&&end>last);
let seed=0x3811ca21;const math=Object.create(Math);math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296};
const ctx=vm.createContext({Math:math,console});vm.runInContext(html.slice(start,end),ctx,{timeout:15000});
const gen=vm.runInContext('genPitagores2ESO',ctx),plain=s=>String(s).replace(/<[^>]*>/g,'').replace(/\s+/g,' ').trim(),num=s=>Number(s.replace(',','.'));
const sets={3:new Map(),10:new Map(),11:new Map()};
for(const type of [3,10,11])for(let i=0;i<400;i++){
 const ex=gen(type),q=plain(ex.question);let hyp,known,target,context;
 if(type===3){const m=q.match(/hipotenusa mesura ([\d,.]+) cm i un catet ([\d,.]+) cm/);assert(m,q);hyp=num(m[1]);known=num(m[2]);target=Math.sqrt(hyp*hyp-known*known);context='inverse cathetus';}
 else if(type===10){const m=q.match(/base de ([\d,.]+) cm i costats iguals de ([\d,.]+) cm/);assert(m,q);hyp=num(m[2]);known=num(m[1])/2;target=Math.sqrt(hyp*hyp-known*known);context='isosceles height then area';}
 else{const m=q.match(/diagonal de ([\d,.]+) cm i un costat de ([\d,.]+) cm/);assert(m,q);hyp=num(m[1]);known=num(m[2]);target=Math.sqrt(hyp*hyp-known*known);context='inverse side then rectangle perimeter';}
 let answer;
 if(type===3)answer=target;else if(type===10)answer=known*target;else answer=2*(known+target);
 const m=ex.correct.match(/^([\d,.]+) (cm|cm²)$/);assert(m,'Invalid response '+ex.correct);assert(Math.abs(num(m[1])-answer)<.00501);assert.equal(m[2],type===10?'cm²':'cm');
 assert.equal(ex.options.length,4);assert.equal(new Set(ex.options).size,4);assert(ex.options.includes(ex.correct));assert(ex.guide.length>0&&ex.solution.length>0);
 const key=hyp+':'+known;
 if(!sets[type].has(key))sets[type].set(key,{q,correct:ex.correct,known,target,context});
}
const cases=[];
for(const type of [10,11]){
 const overlap=[...sets[type].keys()].filter(key=>sets[3].has(key)).sort();
 assert(overlap.length>=2,'Need two equal inverse-Pythagoras parameter sets '+type);
 for(const key of overlap.slice(0,4)){
  const source=sets[type].get(key),core=sets[3].get(key);
  assert(Math.abs(source.target-num(core.correct.split(' ')[0]))<.00501);
  cases.push({pair:'pitagores:'+type+' vs pitagores:3',common_hypotenuse_and_cathetus_cm:key,source:{question:source.q,correct:source.correct},core:{question:core.q,correct:core.correct},pedagogy:type===10?'Pythagoras inverse gives isosceles height, then triangle area (cm²)':'Pythagoras inverse gives missing side, then rectangle perimeter (cm)'});
 }
}
const pairsByTarget=Object.fromEntries([10,11].map(type=>[
 `pitagores:${type}`,
 cases.filter(x=>x.pair===`pitagores:${type} vs pitagores:3`).length
]));
for(const [target,count] of Object.entries(pairsByTarget))assert(count>=2,`Need at least two independent paired oracles for ${target}`);
console.log(JSON.stringify({generated:1200,independent_oracle_instances:1200,paired_cases:cases.length,verified_pairs_by_target:pairsByTarget,cases,approved:false},null,2));
assert(cases.length>=4);
