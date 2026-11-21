#!/usr/bin/env node
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const html=fs.readFileSync(path.join(__dirname,'..','2eso/sentit-mesura.html'),'utf8');
const a=html.indexOf('/* ── UTILS NUMÈRIQUES'),b=html.indexOf("return {topicId:'problemes',type,course:'2n'",a),end=html.indexOf('\n}',b)+2;
assert(a>=0&&b>a&&end>b);
let seed=0x61ae89dc;const math=Object.create(Math);math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296};
const ctx=vm.createContext({Math:math,console});vm.runInContext(html.slice(a,end),ctx,{timeout:15000});const gen=vm.runInContext('genEscales2ESO',ctx);
const plain=s=>String(s).replace(/<[^>]*>/g,'').replace(/\s+/g,' ').trim();
const num=s=>Number(s.replace(',','.'));
const scan=(q,re)=>{const m=q.match(re);assert(m,'Unable to parse '+q);return m.slice(1).map(num)};
const data={1:new Map(),5:new Map(),12:new Map(),16:new Map()};
for(const t of [1,5,12,16])for(let i=0;i<400;i++){
 const ex=gen(t),q=plain(ex.question);let key,v,unit,metadata={};
 if(t===1){const [n,p]=scan(q,/escala 1:(\d+).*?mesura ([\d,.]+) cm/);key=n+':'+p;v=n*p/100;unit='m';metadata={n,p};}
 else if(t===16){const [n,p,w]=scan(q,/escala 1:(\d+).*?mesura ([\d,.]+) cm × ([\d,.]+) cm/);key=n+':'+p;v=2*n*(p+w)/100;unit='m';metadata={n,p,w};}
 else if(t===5){const [small,k]=scan(q,/peça real de ([\d,.]+) cm.*?ampliació ([\d,.]+):1/);key=k+':'+small;v=k*small;unit='cm';metadata={small,k};}
 else{const [small,big]=scan(q,/costat passa de ([\d,.]+) cm a ([\d,.]+) cm/);const k=big/small;key=k+':'+small;v=k;unit='';metadata={small,k,big};}
 const m=ex.correct.match(/^([\d,.]+)(?: (m|cm))?$/);assert(m,'Wrong format '+ex.correct);assert.equal(m[2]||'',unit);
 assert(Math.abs(num(m[1])-v)<0.005001,'Wrong oracle '+t+' '+q);
 assert.equal(ex.options.length,4);assert.equal(new Set(ex.options).size,4);assert(ex.options.includes(ex.correct));assert(ex.guide.length>0&&ex.solution.length>0);
 if(!data[t].has(key))data[t].set(key,{q,correct:ex.correct,guide:ex.guide,metadata});
}
const result=[];
const overlapA=[...data[12].keys()].filter(k=>data[5].has(k)).sort();
assert(overlapA.length>=4,'Not enough real pairs 12/5');
for(const key of overlapA.slice(0,4)){
 const x=data[12].get(key),y=data[5].get(key);
 assert(Math.abs(x.metadata.k*y.metadata.small-num(y.correct.split(' ')[0]))<.005);
 assert(Math.abs(x.metadata.k-num(x.correct))<.005);
 result.push({pair:'escales:12 vs escales:5',key,source:x.q,source_answer:x.correct,target:y.q,target_answer:y.correct,interpretation:'Same enlargement factor and original length, but factor inference vs application: related not identical'});
}
const overlapB=[...data[16].keys()].filter(k=>data[1].has(k)).sort();assert(overlapB.length>=4,'Not enough real pairs 16/1');
for(const key of overlapB.slice(0,4)){
 const x=data[16].get(key),y=data[1].get(key);const w=x.metadata.w;
 const length=num(y.correct.split(' ')[0]),expectedPer=2*(length+w*x.metadata.n/100);
 assert(Math.abs(expectedPer-num(x.correct.split(' ')[0]))<.005);
 result.push({pair:'escales:16 vs escales:1',key,source:x.q,source_answer:x.correct,target:y.q,target_answer:y.correct,interpretation:'Same map scale and first dimension, but second length and perimeter add distinct steps'});
}
assert.equal(result.length,8);
console.log(JSON.stringify({generator_instances:1600,paired_examples:8,overlap_12_5:overlapA.length,overlap_16_1:overlapB.length,pairs:result,teacher_approved:false},null,2));
