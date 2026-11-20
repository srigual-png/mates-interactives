#!/usr/bin/env node
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const html=fs.readFileSync(path.join(__dirname,'..','2eso/sentit-mesura.html'),'utf8');
const a=html.indexOf('/* ── UTILS NUMÈRIQUES'),b=html.indexOf("return {topicId:'problemes',type,course:'2n'",a),end=html.indexOf('\n}',b)+2;assert(a>=0&&b>a&&end>b);
let seed=0x22383d71,randomCalls=0;const math=Object.create(Math);
math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;assert(++randomCalls<500000);return seed/4294967296;};
const ctx=vm.createContext({Math:math,console});vm.runInContext(html.slice(a,end),ctx,{timeout:15000});
const gens=vm.runInContext('({problemes:genProblemesMesura2ESO,superficies:genSuperficiesVolums2ESO})',ctx);
const clean=s=>String(s).replace(/<[^>]*>/g,'').replace(/\s+/g,' ').trim();
const val=s=>Number(String(s).replace(',','.'));
const find=(q,re)=>{const m=q.match(re);assert(m,'Unparsed question: '+q);return m.slice(1).map(val)};
const checks={
 'problemes:3':q=>{const [l,w,h,p]=find(q,/rectangular fa ([\d,.]+) × ([\d,.]+) × ([\d,.]+) cm i està ple al ([\d,.]+)%/);return {expected:l*w*h/1000*p/100,unit:'L'};},
 'superficies:4':q=>{const [b,h,len]=find(q,/base triangular de base ([\d,.]+) cm i altura ([\d,.]+) cm.*?longitud del prisma és de ([\d,.]+) cm/);return {expected:b*h/2*len,unit:'cm³'};},
 'superficies:9':q=>{const [r,h]=find(q,/cilindre tancat de radi ([\d,.]+) cm i altura ([\d,.]+) cm/);return {expected:2*3.14*r*r+2*3.14*r*h,unit:'cm²'};},
 'superficies:15':q=>{const [l,w,L]=find(q,/base ([\d,.]+) m × ([\d,.]+) m conté ([\d,.]+) L/);return {expected:L/1000/(l*w),unit:'m'};}
};
let count=0;const byType={},samples={},issues=[];
for(const [key,oracle] of Object.entries(checks)){
 const [topic,type]=key.split(':');byType[key]=0;samples[key]=[];
 for(let i=0;i<60;i++){const ex=gens[topic](Number(type)),q=clean(ex.question);
  try{
   const o=oracle(q),m=String(ex.correct).match(/^([\d,.]+)\s+(L|cm³|cm²|m)$/);
   assert(m,'Wrong answer format '+ex.correct);assert.equal(m[2],o.unit);
   assert(Math.abs(val(m[1])-o.expected)<.005001,'Wrong mathematical result '+ex.correct+' expected '+o.expected);
   assert.equal(ex.options.length,4);assert.equal(new Set(ex.options).size,4);assert(ex.options.includes(ex.correct));assert(ex.guide.length>0&&ex.solution.length>0);
   byType[key]++;count++;if(i<2)samples[key].push({question:q,answer:ex.correct,guide:ex.guide});
  }catch(e){issues.push({key,index:i,message:e.message,question:q,answer:ex.correct})}
 }
}
console.log(JSON.stringify({checked:count,byType,failures:issues.slice(0,10),samples},null,2));
assert.equal(count,240);assert.equal(issues.length,0);
