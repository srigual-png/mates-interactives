#!/usr/bin/env node
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const html=fs.readFileSync(path.join(__dirname,'..','2eso/sentit-mesura.html'),'utf8'),a=html.indexOf('/* ── UTILS NUMÈRIQUES'),b=html.indexOf("return {topicId:'problemes',type,course:'2n'",a),end=html.indexOf('\n}',b)+2;
assert(a>=0&&b>a&&end>b);
let seed=0xb74542ab;const math=Object.create(Math);math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296};
const ctx=vm.createContext({Math:math,console});vm.runInContext(html.slice(a,end),ctx,{timeout:15000});
const estim=vm.runInContext('genEstimacioError2ESO',ctx),problem=vm.runInContext('genProblemesMesura2ESO',ctx),plain=s=>String(s).replace(/<[^>]*>/g,'').replace(/\s+/g,' ').trim(),num=s=>Number(s.replace(',','.').replace(/\.$/,''));
const calc={7:new Map(),8:new Map()},decisions=new Map();let tested=0;
for(const type of [7,8,16])for(let i=0;i<400;i++){
 const ex=type===16?problem(16):estim(type),q=plain(ex.question);let key,rel,source;
 if(type===16){const m=q.match(/referència d’un objecte és ([\d,.]+) cm.*?A = ([\d,.]+) cm i B = ([\d,.]+) cm/);assert(m,'parse problem '+q);const real=num(m[1]),A=num(m[2]),B=num(m[3]);const ra=Math.abs(A-real)/real,rb=Math.abs(B-real)/real;assert.notEqual(ra,rb);assert.equal(ex.correct,ra<rb?'Mesura A':'Mesura B');key=real+':'+B;rel=rb;source={q,answer:ex.correct,real,A,B,relativeB:rb};if(!decisions.has(key))decisions.set(key,source);}
 else{const m=q.match(/referència és ([\d,.]+) i una aproximació és ([\d,.]+)/);assert(m,'parse estimate '+q);const real=num(m[1]),approx=num(m[2]);rel=Math.abs(approx-real)/real;const ans=type===7?num(ex.correct):num(ex.correct.replace('%',''))/100;assert(Math.abs(ans-rel)<1e-6);key=real+':'+approx;source={q,answer:ex.correct,real,approx,rel};if(!calc[type].has(key))calc[type].set(key,source);}
 assert.equal(ex.options.length,4);assert.equal(new Set(ex.options).size,4);assert(ex.options.includes(ex.correct));assert(ex.guide.length>0);tested++;
}
const shared=[...decisions.keys()].filter(key=>calc[7].has(key)&&calc[8].has(key)).sort();
assert(shared.length>=1,'No genuine shared reference/measurement B among 7 8 and 16');
const cases=shared.map(key=>{
 const d=decisions.get(key),decimal=calc[7].get(key),pct=calc[8].get(key);
 assert(Math.abs(d.relativeB-decimal.rel)<1e-8);assert(Math.abs(decimal.rel-pct.rel)<1e-8);
 return {matched_reference_and_B:key,decision:{question:d.q,answer:d.answer,relativeB:d.relativeB},relative_decimal:{question:decimal.q,answer:decimal.answer},relative_percent:{question:pct.q,answer:pct.answer},pedagogy:'Shared relative-error calculation for B, but comparing A and B needs two relative errors and a decision'};
});
console.log(JSON.stringify({verified:tested,shared:shared.length,examples:cases,teacher_approved:false},null,2));
assert.equal(tested,1200);
