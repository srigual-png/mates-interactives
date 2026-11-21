#!/usr/bin/env node
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const html=fs.readFileSync(path.join(__dirname,'..','2eso','sentit-mesura.html'),'utf8');
const start=html.indexOf('/* ── UTILS NUMÈRIQUES');
const mark=html.indexOf("return {topicId:'problemes',type,course:'2n'",start);
const end=html.indexOf('\n}',mark)+2;
assert(start>=0&&mark>start&&end>mark,'Generator source unavailable');
let seed=0x729bb31e,draws=0;const math=Object.create(Math);
math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;assert(++draws<500000,'Random budget exceeded');return seed/4294967296};
const ctx=vm.createContext({Math:math,console});vm.runInContext(html.slice(start,end),ctx,{timeout:15000});
const generators=vm.runInContext('({problemes:genProblemesMesura2ESO,superficies:genSuperficiesVolums2ESO,estimacio:genEstimacioError2ESO})',ctx);
const clean=s=>String(s).replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim();
const num=s=>Number(String(s).replace(',','.'));
const match=(s,re)=>{const a=s.match(re);assert(a,'Missing problem parameters: '+s);return a.slice(1).map(num)};
const specs={
 'problemes:14':q=>{const [l,w,g,c]=match(q,/rectangular de ([\d,.]+) × ([\d,.]+) m.*porta de ([\d,.]+) m.*costa ([\d,.]+) €\/m/);return {value:(2*(l+w)-g)*c,unit:'€'}},
 'problemes:15':q=>{const [l,w,d]=match(q,/rectangular de ([\d,.]+) × ([\d,.]+) m.*porta de ([\d,.]+) m/);return {value:2*(l+w)-d,unit:'m'}},
 'problemes:5':q=>{const [d,h]=match(q,/diàmetre ([\d,.]+) cm i altura ([\d,.]+) cm/);return {value:3.14*d*h,unit:'cm²'}},
 'superficies:8':q=>{const [r,h]=match(q,/radi ([\d,.]+) cm i altura ([\d,.]+) cm/);return {value:2*3.14*r*h,unit:'cm²'}},
 'estimacio:6':q=>{const [r,a]=match(q,/és ([\d,.]+) cm i una mesura dona ([\d,.]+) cm/);return {value:Math.abs(a-r),unit:'cm'}},
 'estimacio:18':q=>{const [r,a]=match(q,/referència ([\d,.]+) i una aproximació ([\d,.]+)/);return {text:'Ha sumat els valors en lloc de calcular-ne la diferència absoluta',distance:Math.abs(a-r)}}
};
const findings=[],samples={},counts={};
for(const [key,oracle] of Object.entries(specs)){
 const [topic,type]=key.split(':');samples[key]=[];counts[key]=0;
 for(let i=0;i<40;i++){
  const ex=generators[topic](Number(type)),q=clean(ex.question);
  try{
   const expected=oracle(q);
   assert.equal(ex.topicId,topic);assert.equal(ex.type,Number(type));
   assert.equal(ex.options.length,4);assert.equal(new Set(ex.options).size,4);assert(ex.options.includes(ex.correct));
   assert(ex.guide.length>0&&ex.solution.length>0);
   if(expected.text){assert.equal(ex.correct,expected.text);assert(ex.solution.join(' ').includes(String(expected.distance)));}
   else {
    const a=String(ex.correct).match(/^([\d,.]+)\s+(€|m|cm²|cm)$/);
    assert(a,'Unexpected answer format '+ex.correct);
    assert.equal(a[2],expected.unit);
    assert(Math.abs(num(a[1])-expected.value)<=0.005001,'Wrong independent result '+key+': '+ex.correct+' expected '+expected.value);
   }
   counts[key]++;
   if(i<2)samples[key].push({question:q,correct:ex.correct,guide:ex.guide,solution:ex.solution});
  }catch(e){findings.push({key,iteration:i,error:e.message,question:q,answer:ex.correct})}
 }
}
const report={scope:'3 comparison pairs (6 generator types)',samples_per_type:40,independently_checked: Object.values(counts).reduce((a,b)=>a+b,0),counts,findings:findings.slice(0,15),examples:samples};
console.log(JSON.stringify(report,null,2));assert.equal(findings.length,0,'Independent oracle or option/guide inconsistency');
assert.equal(report.independently_checked,240);
