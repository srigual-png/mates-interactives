#!/usr/bin/env node
'use strict';
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.join(__dirname,'..');
const data=JSON.parse(fs.readFileSync(path.join(root,'docs/auditoria/MI_2ESO_mesura_estimacio_12_convencio_arrodoniment_proposta.json'),'utf8'));
const html=fs.readFileSync(path.join(root,'2eso/sentit-mesura.html'),'utf8');
const begin=html.indexOf('/* ── UTILS NUMÈRIQUES'),p=html.indexOf("return {topicId:'problemes',type,course:'2n'",begin),end=html.indexOf('\n}',p)+2;
assert(begin>=0&&p>begin&&end>p,'generator definitions missing');
let seed=0xa5401273;const math=Object.create(Math);
math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296};
const context=vm.createContext({Math:math});
vm.runInContext(html.slice(begin,end),context,{timeout:12000});
const generator=vm.runInContext('genEstimacioError2ESO',context);
const asNum=x=>Number(x.replace(',','.'));
const values=data.cases.map(x=>x.measured_cm);
assert.deepEqual(values,[12.3,18.7,25.4,40.6]);
for(const c of data.cases){
 const tenth=Math.round(c.measured_cm*10),lo=Math.round(c.lower_cm*1000),hi=Math.round(c.upper_cm*1000);
 assert.equal(lo,tenth*100-50);
 assert.equal(hi,tenth*100+50);
 // Independent exact integer arithmetic: thousandths -> tenths, half-up
 for(let v=lo-100;v<=hi+100;v++){
  const rounded=Math.floor((v+50)/100);
  const inside=v>=lo&&v<hi;
  assert.equal(rounded===tenth,inside,'Boundary mismatch '+JSON.stringify({c,v,rounded,tenth}));
 }
 assert.equal(Math.floor((lo+50)/100),tenth);
 assert.equal(Math.floor((hi+50)/100),tenth+1);
}
const seen=new Set();for(let i=0;i<400;i++){
 const ex=generator(12);
 const q=String(ex.question).replace(/<[^>]*>/g,'');
 const m=q.match(/registrat com ([\d,.]+) cm/);
 assert(m,'Unexpected question '+q);
 const value=asNum(m[1]);seen.add(value);
 const match=ex.correct.match(/^des de ([\d,.]+) cm \(inclòs\) fins a ([\d,.]+) cm \(exclòs\)$/);
 assert(match,'Unexpected correct answer '+ex.correct);
 assert(Math.abs(asNum(match[1])-(value-.05))<1e-8);
 assert(Math.abs(asNum(match[2])-(value+.05))<1e-8);
 assert(ex.options.includes(ex.correct));
 assert.equal(new Set(ex.options).size,4);
}
assert.equal(seen.size,4);
assert.equal(data.permission_boundary.source_generator_edited,false);
assert.equal(data.level_guidance.approved,false);
console.log(JSON.stringify({rounding_cases:4,exact_integer_boundary_checks:4*301,generated_questions:400,distinct_scenarios:seen.size,discrepancies:0,source_changed:false},null,2));
