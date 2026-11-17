#!/usr/bin/env node
'use strict';
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync(path.join(__dirname,'..','2eso/sentit-mesura.html'),'utf8');
const start=html.indexOf('/* ── UTILS NUMÈRIQUES'),last=html.indexOf("return {topicId:'problemes',type,course:'2n'",start),end=html.indexOf('\n}',last)+2;
assert(start>=0&&last>start&&end>last);
let seed=0x4acf2110;const math=Object.create(Math);math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
const ctx=vm.createContext({Math:math,console});vm.runInContext(html.slice(start,end),ctx,{timeout:15000});
const gen=vm.runInContext('genEstimacioError2ESO',ctx);
const clean=s=>String(s).replace(/<[^>]*>/g,'').replace(/\s+/g,' ').trim();
const num=s=>Number(s.replace(',','.'));
const byType={6:new Map(),18:new Map()};let tested=0;const errors=[];
for(const type of [6,18])for(let i=0;i<320;i++){
 const ex=gen(type),q=clean(ex.question);let real,approx,delta,key,expected;
 try{
  if(type===6){
   const m=q.match(/referència d’una longitud és ([\d,.]+) cm i una mesura dona ([\d,.]+) cm/);assert(m,'Cannot parse error question '+q);
   real=num(m[1]);approx=num(m[2]);delta=approx-real;expected=Math.abs(delta)+' cm';
   assert(Math.abs(num(ex.correct.match(/^[\d,.]+/)[0])-Math.abs(delta))<.005);
  }else{
   const m=q.match(/valor de referència ([\d,.]+) i una aproximació ([\d,.]+)/);assert(m,'Cannot parse diagnostic question '+q);
   real=num(m[1]);approx=num(m[2]);delta=approx-real;expected='Ha sumat els valors en lloc de calcular-ne la diferència absoluta';
   assert.equal(ex.correct,expected);assert(q.includes(real+'+'+approx+'='+(real+approx)));
  }
  assert.equal(ex.options.length,4);assert.equal(new Set(ex.options).size,4);assert(ex.options.includes(ex.correct));
  assert(ex.guide.length>=2&&ex.solution.length>=2);tested++;
  key=real+':'+approx;
  if(!byType[type].has(key))byType[type].set(key,{q,correct:ex.correct,guide:ex.guide,solution:ex.solution});
 }catch(e){errors.push({type,index:i,error:e.message,q})}
}
const shared=[...byType[18].keys()].filter(k=>byType[6].has(k)).sort();
assert(shared.length>=2,'Need two matched exact reference/approximation input cases');
const matched=shared.slice(0,4).map(key=>{
 const calc=byType[6].get(key),diagnose=byType[18].get(key);
 const [r,a]=key.split(':').map(Number);
 assert.equal(num(calc.correct.split(' ')[0]),Math.abs(a-r));
 assert(diagnose.solution.some(line=>line.includes(String(Math.abs(a-r)))));
 return {reference:r,approximation:a,calculation:{question:calc.q,answer:calc.correct},diagnosis:{question:diagnose.q,answer:diagnose.correct},pedagogy:'Same numerical evidence, but compute absolute error versus identify erroneous addition; preserve cognitive-task distinction'};
});
console.log(JSON.stringify({tested_generated_instances:tested,shared_exact_parameter_sets:shared.length,paired_cases:matched.length,paired_examples:matched,failures:errors.slice(0,8),teacher_approved:false},null,2));
assert.equal(tested,640);assert.equal(errors.length,0);
