#!/usr/bin/env node
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const h=fs.readFileSync(path.join(__dirname,'..','2eso','sentit-mesura.html'),'utf8');
const beg=h.indexOf('/* ── UTILS NUMÈRIQUES'),p=h.indexOf("return {topicId:'problemes',type,course:'2n'",beg),end=h.indexOf('\n}',p)+2;
assert(beg>=0&&p>beg&&end>p);
let seed=0xaff14321;const math=Object.create(Math);
math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/0x100000000};
const ctx=vm.createContext({Math:math});vm.runInContext(h.slice(beg,end),ctx,{timeout:10000});
const gen=vm.runInContext('genEstimacioError2ESO',ctx);
const parseNum=s=>Number(s.replace(',','.'));
const counts={},samples=400;
for(let i=0;i<samples;i++){
 const ex=gen(11);
 assert.equal(ex.type,11);
 assert.equal(ex.allowOpen,false);
 assert.equal(ex.options.length,4);
 assert.equal(new Set(ex.options).size,4);
 assert(ex.options.includes(ex.correct));
 const q=ex.question;
 const m=q.match(/marge màxim d’error admès és de ([\d,.]+) (mm|cm|L|m)/);
 assert(m,'Missing tolerance '+q);
 const maximum=parseNum(m[1]),unit=m[2];
 const instruments=[...q.matchAll(/Instrument ([ABCD]): ±([\d,.]+) (mm|cm|L|m)/g)];
 assert.equal(instruments.length,4);
 const valid=instruments.filter(x=>x[3]===unit&&parseNum(x[2])<=maximum+1e-10);
 assert(valid.length>0);
 const best=valid.sort((a,b)=>parseNum(b[2])-parseNum(a[2]))[0];
 assert.equal(ex.correct,'Instrument '+best[1],'Incorrect instrument for '+q);
 counts[unit]=(counts[unit]||0)+1;
 assert(ex.solution.join(' ').includes(ex.correct));
}
assert.deepEqual(Object.keys(counts).sort(),['L','cm','m','mm']);
for(let i=0;i<samples;i++){
 const ex=gen(1);
 assert.equal(ex.options.length,4);
 assert.equal(new Set(ex.options).size,4);
 assert(ex.options.includes(ex.correct));
 if(ex.question.includes('telèfon mòbil')){
  assert(ex.options.includes('0,8 mm'));
  assert(!ex.options.includes('0,8 m'));
  assert(!ex.options.includes('0,8 cm'));
 }
}
console.log(JSON.stringify({estimation_11_samples:samples,estimation_11_contexts:counts,estimation_1_samples:samples,failures:0},null,2));
