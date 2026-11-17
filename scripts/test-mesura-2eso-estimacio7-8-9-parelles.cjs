#!/usr/bin/env node
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const html=fs.readFileSync(path.join(__dirname,'..','2eso/sentit-mesura.html'),'utf8');
const start=html.indexOf('/* ── UTILS NUMÈRIQUES'),stop=html.indexOf("return {topicId:'problemes',type,course:'2n'",start),end=html.indexOf('\n}',stop)+2;
assert(start>=0&&stop>start&&end>stop);
let seed=0x95078015;const math=Object.create(Math);math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
const ctx=vm.createContext({Math:math,console});vm.runInContext(html.slice(start,end),ctx,{timeout:15000});
const gen=vm.runInContext('genEstimacioError2ESO',ctx);
const clean=s=>String(s).replace(/<[^>]*>/g,'').replace(/\s+/g,' ').trim();
const n=s=>Number(s.replace(',','.'));
const byType={7:new Map(),8:new Map(),9:new Map()};
let checked=0;const problems=[];
for(const type of [7,8,9])for(let i=0;i<400;i++){
 const ex=gen(type),q=clean(ex.question),m=type===7?q.match(/referència és ([\d,.]+) i una aproximació és ([\d,.]+)/):type===8?q.match(/referència és ([\d,.]+) i una aproximació és ([\d,.]+)/):q.match(/Mesura A: referència ([\d,.]+), aproximació ([\d,.]+).*?Mesura B: referència ([\d,.]+), aproximació ([\d,.]+)/);
 try{
  assert(m,'Cannot parse '+type+' '+q);
  const real=n(m[1]),approx=n(m[2]),relative=Math.abs(approx-real)/real,key=real+':'+approx;
  if(type===7)assert(Math.abs(n(ex.correct)-relative)<1e-5);
  else if(type===8)assert(Math.abs(n(ex.correct.replace('%','').trim())-relative*100)<1e-5);
  else {const rb=n(m[3]),ab=n(m[4]);const relB=Math.abs(ab-rb)/rb;assert.notEqual(relative,relB);assert.equal(ex.correct,relative<relB?'La mesura A':'La mesura B');}
  assert.equal(ex.options.length,4);assert.equal(new Set(ex.options).size,4);assert(ex.options.includes(ex.correct));assert(ex.guide.length>0);
  checked++;if(!byType[type].has(key))byType[type].set(key,{q,answer:ex.correct,relative});
 }catch(e){problems.push({type,i,message:e.message,q})}
}
const overlap=[...byType[9].keys()].filter(k=>byType[7].has(k)&&byType[8].has(k)).sort();
assert(overlap.length>=2,'Insufficient exact common measurement pairs');
const pairs=overlap.slice(0,4).map(key=>{
 const a=byType[9].get(key),b=byType[7].get(key),c=byType[8].get(key);
 assert(Math.abs(a.relative-b.relative)<1e-10);assert(Math.abs(b.relative-c.relative)<1e-10);
 return {shared_reference_and_approximation:key,relative_number:{q:b.q,answer:b.answer},relative_percent:{q:c.q,answer:c.answer},comparison:{q:a.q,answer:a.answer},interpretation:'Same error-relative computation for measurement A; compare vs measurement B adds evaluation and decision'};
});
console.log(JSON.stringify({generated:1200,verified:checked,available_triple_overlap:overlap.length,paired_examples:pairs.length,pairs,issues:problems.slice(0,8),teacher_approved:false},null,2));
assert.equal(checked,1200);assert.equal(problems.length,0);
