#!/usr/bin/env node
'use strict';
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync(path.join(__dirname,'..','2eso/sentit-mesura.html'),'utf8');
const a=html.indexOf('/* ── UTILS NUMÈRIQUES'),b=html.indexOf("return {topicId:'problemes',type,course:'2n'",a),end=html.indexOf('\n}',b)+2;
assert(a>=0&&b>a&&end>b);
let seed=0x7352face;const math=Object.create(Math);
math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296};
const ctx=vm.createContext({Math:math,console});vm.runInContext(html.slice(a,end),ctx,{timeout:15000});
const gen=vm.runInContext('genSuperficiesVolums2ESO',ctx);
const clean=s=>String(s).replace(/<[^>]*>/g,'').replace(/\s+/g,' ').trim();
const number=s=>Number(s.replace(',','.'));
const obs={8:new Map(),9:new Map(),19:new Map()};let generated=0;
for(const type of [8,9,19])for(let i=0;i<400;i++){
 const ex=gen(type),q=clean(ex.question);
 let m;
 if(type===8)m=q.match(/cilindre de radi (\d+) cm i altura (\d+) cm/);
 else if(type===9)m=q.match(/cilindre tancat de radi (\d+) cm i altura (\d+) cm/);
 else m=q.match(/cilindre de radi (\d+) cm i altura (\d+) cm/);
 assert(m,'Cannot read source '+type+' '+q);
 const r=Number(m[1]),h=Number(m[2]),key=r+':'+h,lateral=2*3.14*r*h,area=2*3.14*r*r+lateral;
 if(type===8||type===9){
  const ans=ex.correct.match(/^([\d,.]+) cm²$/);assert(ans);
  assert(Math.abs(number(ans[1])-(type===8?lateral:area))<.00501);
 }else{
  const ans=ex.correct.match(/^([\d,.]+) cm × (\d+) cm$/);assert(ans);
  assert(Math.abs(number(ans[1])-2*3.14*r)<.00501);assert.equal(Number(ans[2]),h);
 }
 assert.equal(ex.options.length,4);assert.equal(new Set(ex.options).size,4);assert(ex.options.includes(ex.correct));
 assert(ex.guide.length>0&&ex.solution.length>0);
 if(!obs[type].has(key))obs[type].set(key,{q,correct:ex.correct,guide:ex.guide,r,h});
 generated++;
}
const shared=[...obs[9].keys()].filter(key=>obs[8].has(key)&&obs[19].has(key)).sort();
assert(shared.length>=4,'No 4 instances with exactly same radius and height');
const triples=shared.slice(0,4).map(key=>{
 const a=obs[8].get(key),b=obs[9].get(key),c=obs[19].get(key);
 const l=number(a.correct.split(' ')[0]),total=number(b.correct.split(' ')[0]),w=number(c.correct.split(' ')[0]);
 assert(Math.abs(l-w*a.h)<.00501);
 assert(Math.abs(total-(l+2*3.14*a.r*a.r))<.00501);
 return {radius_cm:a.r,height_cm:a.h,lateral:{q:a.q,answer:a.correct},total:{q:b.q,answer:b.correct},unfolded:{q:c.q,answer:c.correct},interpretation:'Common cylinder lateral geometry; lateral area, full area with two bases, and unfolded dimensions assess distinct outputs'};
});
console.log(JSON.stringify({generated,shared_data_triplets:shared.length,paired_triplets:triples.length,triples,teacher_approved:false},null,2));
assert.equal(generated,1200);assert.equal(triples.length,4);
