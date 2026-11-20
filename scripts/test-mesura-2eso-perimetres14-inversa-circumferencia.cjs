#!/usr/bin/env node
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const html=fs.readFileSync(path.join(__dirname,'..','2eso','sentit-mesura.html'),'utf8');
const start=html.indexOf('/* ── UTILS NUMÈRIQUES'),last=html.indexOf("return {topicId:'problemes',type,course:'2n'",start),end=html.indexOf('\n}',last)+2;
assert(start>=0&&last>start&&end>last);
let seed=0x7149af02;
const math=Object.create(Math);math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296};
const ctx=vm.createContext({Math:math,console});vm.runInContext(html.slice(start,end),ctx,{timeout:15000});
const generate=vm.runInContext('genPerimetresArees2ESO',ctx);
const norm=s=>String(s).replace(/<[^>]*>/g,'').replace(/\s+/g,' ');
const num=s=>Number(s.replace(',','.'));
let count=0;const distinct={5:new Set(),14:new Set()}, examples={5:[],14:[]},failures=[];
for(const type of [5,14]){
 for(let i=0;i<80;i++){
  const ex=generate(type),q=norm(ex.question);
  try{
   let expected;
   if(type===5){
    const m=q.match(/circumferència de radi ([\d,.]+) cm/);assert(m,'Missing forward length');
    expected=2*3.14*num(m[1]);
   }else{
    const m=q.match(/té longitud ([\d,.]+) cm/);assert(m,'Missing inverse length');
    expected=num(m[1])/(2*3.14);
   }
   const match=ex.correct.match(/^([\d,.]+) cm$/);assert(match,'Wrong answer unit');
   assert(Math.abs(num(match[1])-expected)<0.005001,'Wrong inverse or forward result');
   assert.equal(ex.options.length,4);assert.equal(new Set(ex.options).size,4);assert(ex.options.includes(ex.correct));assert(ex.guide.length>0&&ex.solution.length>0);
   if(type===14){assert(ex.guide.some(x=>x.includes('Aïlla el radi')));assert(Math.abs(expected-Math.round(expected))<0.005001);}
   count++;distinct[type].add(q);
   if(examples[type].length<2)examples[type].push({question:q,answer:ex.correct});
  }catch(e){failures.push({type,iteration:i,error:e.message,question:q})}
 }
}
console.log(JSON.stringify({checked:count,types:[5,14],distinct_questions:{5:distinct[5].size,14:distinct[14].size},examples,failures:failures.slice(0,10)},null,2));
assert.equal(count,160);assert.equal(failures.length,0);assert(distinct[5].size>=3&&distinct[14].size>=3);
