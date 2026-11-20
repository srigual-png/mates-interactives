#!/usr/bin/env node
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const html=fs.readFileSync(path.join(__dirname,'..','2eso','sentit-mesura.html'),'utf8');
const start=html.indexOf('/* ── UTILS NUMÈRIQUES'),stop=html.indexOf("return {topicId:'problemes',type,course:'2n'",start),end=html.indexOf('\n}',stop)+2;
assert(start>=0&&stop>start&&end>stop);
let seed=0x261117ac;const math=Object.create(Math);math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
const ctx=vm.createContext({Math:math,console});vm.runInContext(html.slice(start,end),ctx,{timeout:15000});
const gens=vm.runInContext('({escales:genEscales2ESO,perimetres:genPerimetresArees2ESO,unitats:genUnitats2ESO})',ctx);
const plain=x=>String(x).replace(/<[^>]*>/g,'').replace(/\s+/g,' '),num=x=>Number(String(x).replace(',','.'));
const find=(q,re)=>{const m=q.match(re);assert(m,'Unparsed: '+q);return m.slice(1).map(num)};
const oracles={
 'escales:12':q=>{const [a,b]=find(q,/passa de ([\d,.]+) cm a ([\d,.]+) cm/);return {answer:b/a,unit:''};},
 'escales:16':q=>{const [k,a,b]=find(q,/escala 1:([\d,.]+).*?mesura ([\d,.]+) cm × ([\d,.]+) cm/);return {answer:2*(a+b)*k/100,unit:'m'};},
 'perimetres:4':q=>{const [n,a]=find(q,/té ([\d,.]+) costats de ([\d,.]+) cm/);return {answer:n*a,unit:'cm'};},
 'perimetres:15':q=>{const [n,a,h]=find(q,/té ([\d,.]+) costats de ([\d,.]+) cm i apotema aproximada de ([\d,.]+) cm/);return {answer:n*a*h/2,unit:'cm²'};},
 'unitats:9':q=>{const [m,cm]=find(q,/Compara ([\d,.]+) m i ([\d,.]+) cm/);return {text:m>cm/100?'La primera és més gran':'La segona és més gran'};}
};
let checks=0;const counts={},samples={},issues=[];
for(const [key,fn] of Object.entries(oracles)){
 const [topic,t]=key.split(':');counts[key]=0;samples[key]=[];
 for(let i=0;i<40;i++){const ex=gens[topic](Number(t)),q=plain(ex.question);
  try{
   const x=fn(q);assert.equal(ex.options.length,4);assert.equal(new Set(ex.options).size,4);assert(ex.options.includes(ex.correct));
   assert(ex.guide.length>0&&ex.solution.length>0);
   if(x.text){assert.equal(ex.correct,x.text)}
   else{const a=ex.correct.match(/^([\d,.]+)(?:\s+(cm²|cm|m))?$/);assert(a,'Bad format '+ex.correct);assert.equal(a[2]||'',x.unit);assert(Math.abs(num(a[1])-x.answer)<.005001,'Wrong calculation '+ex.correct+' vs '+x.answer)}
   counts[key]++;checks++;if(i<2)samples[key].push({question:q,answer:ex.correct});
  }catch(e){issues.push({key,i,error:e.message,question:q,answer:ex.correct});}
 }
}
console.log(JSON.stringify({checked:checks,counts,issues:issues.slice(0,10),samples},null,2));
assert.equal(checks,200);assert.equal(issues.length,0);
