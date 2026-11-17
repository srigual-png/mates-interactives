#!/usr/bin/env node
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const html=fs.readFileSync(path.join(__dirname,'..','2eso/sentit-mesura.html'),'utf8'),a=html.indexOf('/* ── UTILS NUMÈRIQUES'),b=html.indexOf("return {topicId:'problemes',type,course:'2n'",a),end=html.indexOf('\n}',b)+2;
assert(a>=0&&b>a&&end>b);
let seed=0xaeed2310;const math=Object.create(Math);math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296};
const ctx=vm.createContext({Math:math,console});vm.runInContext(html.slice(a,end),ctx,{timeout:15000});
const gens=vm.runInContext('({problem:genProblemesMesura2ESO,surface:genSuperficiesVolums2ESO})',ctx);
const clean=s=>String(s).replace(/<[^>]*>/g,'').replace(/\s+/g,' ').trim(),num=s=>Number(s.replace(',','.'));
const unique={problem:new Map(),surface:new Map()},counts={problem:0,surface:0};
for(const name of ['problem','surface'])for(let i=0;i<400;i++){
 const ex=name==='problem'?gens.problem(5):gens.surface(8),q=clean(ex.question);
 const m=name==='problem'?q.match(/diàmetre ([\d,.]+) cm i altura ([\d,.]+) cm/):q.match(/radi ([\d,.]+) cm i altura ([\d,.]+) cm/);
 assert(m,'Cannot parse '+name+' '+q);
 const radius=(name==='problem'?num(m[1])/2:num(m[1])),height=num(m[2]),expected=2*3.14*radius*height;
 const ans=ex.correct.match(/^([\d,.]+) cm²$/);assert(ans,ex.correct);
 assert(Math.abs(num(ans[1])-expected)<.00501);
 assert.equal(ex.options.length,4);assert.equal(new Set(ex.options).size,4);assert(ex.options.includes(ex.correct));assert(ex.guide.length>=3&&ex.solution.length>=2);
 const key=radius+':'+height;if(!unique[name].has(key))unique[name].set(key,{q,answer:ex.correct,radius,height});
 counts[name]++;
}
const same=[...unique.problem.keys()].filter(k=>unique.surface.has(k));
assert.equal(same.length,0,'The current fixture sets unexpectedly have matching radius/height; inspect before reporting no match');
const examples=[...unique.problem.values()].filter(p=>[...unique.surface.values()].some(s=>s.radius===p.radius)).sort((x,y)=>x.radius-y.radius||x.height-y.height).slice(0,4).map(p=>{
 const s=[...unique.surface.values()].find(s=>s.radius===p.radius);
 assert(s,'Expected matching radii for 4 contextual examples');
 return {contextual_label:{question:p.q,answer:p.answer,radius:p.radius,height:p.height},abstract_surface:{question:s.q,answer:s.answer,radius:s.radius,height:s.height},common_formula:'A_lateral = pi * diameter * height = 2 * pi * radius * height',same_radius:p.radius===s.radius,identical_height:p.height===s.height};
});
console.log(JSON.stringify({instances:counts,unique_fixtures:{contextual:unique.problem.size,abstract:unique.surface.size},same_radius_height_pairs:same.length,comparisons:examples,interpretation:'Mathematical formula identical, but all heights in contextual fixtures differ from abstract fixtures; no genuinely paired same-parameter example',teacher_approved:false},null,2));
