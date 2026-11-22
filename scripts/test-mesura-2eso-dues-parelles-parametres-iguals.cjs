#!/usr/bin/env node
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const html=fs.readFileSync(path.join(__dirname,'..','2eso/sentit-mesura.html'),'utf8');
const a=html.indexOf('/* ── UTILS NUMÈRIQUES'),b=html.indexOf("return {topicId:'problemes',type,course:'2n'",a),end=html.indexOf('\n}',b)+2;
assert(a>=0&&b>a&&end>b);
const math=Object.create(Math);let seed=0x42c1d90f;math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
const ctx=vm.createContext({Math:math,console});vm.runInContext(html.slice(a,end),ctx,{timeout:15000});
const gen=vm.runInContext('genPerimetresArees2ESO',ctx);
const plain=s=>String(s).replace(/<[^>]*>/g,'').replace(/\s+/g,' ').trim();
const number=s=>Number(s.replace(',','.'));
const get=(q,re)=>{const m=q.match(re);assert(m,'Invalid source question: '+q);return m.slice(1).map(number)};
const samples={4:new Map(),5:new Map(),14:new Map(),15:new Map()};
for(const type of [4,5,14,15])for(let i=0;i<320;i++){
 const ex=gen(type),q=plain(ex.question);let key,expected,unit;
 if(type===4){const [n,side]=get(q,/té (\d+) costats de (\d+) cm/);key=n+':'+side;expected=n*side;unit='cm';}
 else if(type===15){const [n,side,h]=get(q,/té (\d+) costats de (\d+) cm i apotema aproximada de ([\d,.]+) cm/);key=n+':'+side;expected=n*side*h/2;unit='cm²';}
 else if(type===5){const [r]=get(q,/radi (\d+) cm/);key=String(r);expected=2*3.14*r;unit='cm';}
 else {const [L]=get(q,/té longitud ([\d,.]+) cm/);const radius=L/(2*3.14);key=String(Math.round(radius));expected=radius;unit='cm';}
 const m=ex.correct.match(/^([\d,.]+) (cm²|cm)$/);assert(m,'Wrong answer structure');
 assert.equal(m[2],unit);assert(Math.abs(number(m[1])-expected)<.005001,'Incorrect source answer '+type+': '+ex.correct+' vs '+expected);
 assert.equal(ex.options.length,4);assert.equal(new Set(ex.options).size,4);assert(ex.options.includes(ex.correct));assert(ex.guide.length&&ex.solution.length);
 if(!samples[type].has(key))samples[type].set(key,{type,q,correct:ex.correct,guide:ex.guide,solution:ex.solution});
}
const pairs=[];
for(const [left,right,kind] of [[5,14,'forward_vs_inverse'],[4,15,'perimeter_as_intermediate_step']]){
 const matches=[...samples[left].keys()].filter(k=>samples[right].has(k)).sort();
 assert(matches.length>=2,'Less than 2 same-parameter real pairs '+kind);
 for(const k of matches.slice(0,4)){
  const x=samples[left].get(k),y=samples[right].get(k);let rationale;
  if(kind==='forward_vs_inverse'){
   assert(Math.abs(number(x.correct.split(' ')[0])/(2*3.14)-number(y.correct.split(' ')[0]))<.005001);
   rationale='Same radius/circumference relation but inverse unknown: distinct cognitive operation';
  } else {
   const [n,s]=k.split(':').map(Number),p=n*s;
   assert.equal(number(x.correct.split(' ')[0]),p);
   assert(y.solution.some(line=>line.includes('Perímetre = '+n+'·'+s+' = '+p+' cm')));
   rationale='Identical polygon/perimeter intermediate step, but target magnitude differs (cm vs cm²)';
  }
  pairs.push({kind,parameters:k,source:x.q,source_correct:x.correct,target:y.q,target_correct:y.correct,rationale});
 }
}
assert.equal(pairs.length,8);
console.log(JSON.stringify({tested_generator_instances:1280,real_paired_cases:pairs.length,by_pair:{forward_vs_inverse:4,perimeter_as_intermediate_step:4},pairs,teacher_approved:false},null,2));
