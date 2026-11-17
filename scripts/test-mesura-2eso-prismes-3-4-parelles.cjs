#!/usr/bin/env node
'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),vm=require('node:vm');
const html=fs.readFileSync(path.join(__dirname,'..','2eso/sentit-mesura.html'),'utf8');
const begin=html.indexOf('/* ── UTILS NUMÈRIQUES'),endMarker=html.indexOf("return {topicId:'problemes',type,course:'2n'",begin),end=html.indexOf('\n}',endMarker)+2;
assert(begin>=0&&endMarker>begin&&end>endMarker);
let seed=0x120a45cd;const math=Object.create(Math);math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
const ctx=vm.createContext({Math:math,console});vm.runInContext(html.slice(begin,end),ctx,{timeout:15000});const generate=vm.runInContext('genSuperficiesVolums2ESO',ctx);
const plain=s=>String(s).replace(/<[^>]*>/g,'').replace(/\s+/g,' ').trim();
const num=s=>Number(s.replace(',','.'));
const source={3:new Map(),4:new Map()},errors=[];let checked=0;
for(const type of [3,4])for(let i=0;i<400;i++){
 const ex=generate(type),q=plain(ex.question);
 try{
  let area,height,substeps;
  if(type===3){
   const m=q.match(/àrea de la base de ([\d,.]+) cm² i una altura de ([\d,.]+) cm/);assert(m,'Cannot extract prism 3 '+q);
   area=num(m[1]);height=num(m[2]);substeps=1;
  }else{
   const m=q.match(/base triangular de base ([\d,.]+) cm i altura ([\d,.]+) cm.*?longitud del prisma és de ([\d,.]+) cm/);assert(m,'Cannot extract triangular prism 4 '+q);
   area=num(m[1])*num(m[2])/2;height=num(m[3]);substeps=2;
  }
  const mm=ex.correct.match(/^([\d,.]+) cm³$/);assert(mm,'Expected cm³ '+ex.correct);
  assert(Math.abs(num(mm[1])-area*height)<0.00501);
  assert.equal(ex.options.length,4);assert.equal(new Set(ex.options).size,4);assert(ex.options.includes(ex.correct));assert(ex.guide.length>0&&ex.solution.length>0);
  const key=area+':'+height;
  if(!source[type].has(key))source[type].set(key,{question:q,answer:ex.correct,steps:substeps,guide:ex.guide});
  checked++;
 }catch(e){errors.push({type,i,message:e.message,q})}
}
const overlap=[...source[4].keys()].filter(k=>source[3].has(k)).sort();
assert(overlap.length>=4,'Need 4 truly paired examples with equal base-area/height');
const examples=overlap.slice(0,4).map(key=>{
 const a=source[4].get(key),b=source[3].get(key);
 assert.equal(a.answer,b.answer);
 return {shared_area_base_cm2_and_prism_height_cm:key,triangular_prism:{question:a.question,answer:a.answer},known_base_area_prism:{question:b.question,answer:b.answer},pedagogical_conclusion:'Both compute A_base × h, but triangular prism first derives base area from triangle dimensions; same result and shared core, different required steps'};
});
console.log(JSON.stringify({checked,overlap_count:overlap.length,paired_examples:examples.length,examples,failures:errors.slice(0,10),teacher_approved:false},null,2));
assert.equal(checked,800);assert.equal(errors.length,0);
