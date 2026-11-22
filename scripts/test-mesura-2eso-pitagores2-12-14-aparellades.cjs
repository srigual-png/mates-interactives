#!/usr/bin/env node
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const html=fs.readFileSync(path.join(__dirname,'..','2eso/sentit-mesura.html'),'utf8'),start=html.indexOf('/* ── UTILS NUMÈRIQUES'),anchor=html.indexOf("return {topicId:'problemes',type,course:'2n'",start),end=html.indexOf('\n}',anchor)+2;
assert(start>=0&&anchor>start&&end>anchor);
let seed=0x342cb6a1;const math=Object.create(Math);math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296};
const ctx=vm.createContext({Math:math,console});vm.runInContext(html.slice(start,end),ctx,{timeout:15000});
const gen=vm.runInContext('genPitagores2ESO',ctx),plain=s=>String(s).replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim(),number=s=>Number(s.replace(',','.'));
const maps={2:new Map(),12:new Map(),14:new Map()};
let checked=0;
for(const t of [2,12,14])for(let i=0;i<400;i++){
 const ex=gen(t),q=plain(ex.question),m=t===2?q.match(/catets de ([\d,.]+) cm i ([\d,.]+) cm/):t===12?q.match(/recórrer ([\d,.]+) m en una direcció i després ([\d,.]+) m/):q.match(/punt a ([\d,.]+) m de la base d’un pal i un punt situat a ([\d,.]+) m d’altura, cal deixar ([\d,.]+) m/);
 assert(m,'Cannot parse '+t+': '+q);
 const a=number(m[1]),b=number(m[2]),extra=t===14?number(m[3]):0,hyp=Math.sqrt(a*a+b*b);
 const expected=t===2?hyp:t===12?a+b-hyp:hyp+extra;
 const answer=ex.correct.match(/^([\d,.]+) (cm|m)$/);assert(answer,'Unexpected answer '+ex.correct);assert(Math.abs(number(answer[1])-expected)<.00501,'Oracle failure '+t+': '+q);
 assert.equal(answer[2],t===2?'cm':'m');assert.equal(ex.options.length,4);assert.equal(new Set(ex.options).size,4);assert(ex.options.includes(ex.correct));assert(ex.guide.length>0&&ex.solution.length>0);
 const key=[a,b].sort((x,y)=>x-y).join(':');
 if(!maps[t].has(key))maps[t].set(key,{q,answer:ex.correct,a,b,extra,hyp});
 checked++;
}
const cases=[];
for(const t of [12,14]){
 const matches=[...maps[t].keys()].filter(key=>maps[2].has(key)).sort();
 assert(matches.length>=4,'Need four true source matches for '+t);
 for(const key of matches.slice(0,4)){
  const composite=maps[t].get(key),core=maps[2].get(key);
  assert(Math.abs(composite.hyp-number(core.answer.split(' ')[0]))<.00501);
  cases.push({pair:'pitagores:'+t+' vs pitagores:2',shared_cathets:key,core:{question:core.q,answer:core.answer},composite:{question:composite.q,answer:composite.answer},interpretation:t===12?'Pythagoras hypotenuse then subtract from a+b to find savings, with m instead of cm':'Pythagoras hypotenuse then add anchorage allowance, with m instead of cm'});
 }
}
console.log(JSON.stringify({verified_instances:checked,real_paired_cases:cases.length,cases,teacher_approved:false},null,2));
assert.equal(checked,1200);assert.equal(cases.length,8);
