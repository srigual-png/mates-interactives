#!/usr/bin/env node
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const html=fs.readFileSync(path.join(__dirname,'..','2eso/sentit-mesura.html'),'utf8'),a=html.indexOf('/* ── UTILS NUMÈRIQUES'),b=html.indexOf("return {topicId:'problemes',type,course:'2n'",a),end=html.indexOf('\n}',b)+2;
assert(a>=0&&b>a&&end>b);
let seed=0x9a1840c3;const math=Object.create(Math);math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296};
const ctx=vm.createContext({Math:math,console});vm.runInContext(html.slice(a,end),ctx,{timeout:15000});
const gen=vm.runInContext('genSuperficiesVolums2ESO',ctx),plain=s=>String(s).replace(/<[^>]*>/g,'').replace(/\s+/g,' ').trim(),num=s=>Number(s.replace(',','.'));
const source={1:new Map(),17:new Map()},distribution={a:0,b:0,sameBase:0};let count=0;
for(const type of [1,17])for(let i=0;i<500;i++){
 const ex=gen(type),q=plain(ex.question);let dims,vol,other=null;
 if(type===1){const m=q.match(/ortoedre de (\d+) cm × (\d+) cm × (\d+) cm/);assert(m,'Parse orthogonal '+q);dims=m.slice(1).map(Number);vol=dims.reduce((a,b)=>a*b,1);assert.equal(ex.correct,vol+' cm³');}
 else {const m=q.match(/recipient A mesura (\d+)×(\d+)×(\d+) dm i el B (\d+)×(\d+)×(\d+) dm/);assert(m,'Parse compared containers '+q);dims=m.slice(1,4).map(Number);other=m.slice(4,7).map(Number);vol=dims.reduce((a,b)=>a*b,1);const vB=other.reduce((a,b)=>a*b,1);assert.notEqual(vol,vB);assert.equal(ex.correct,vol>vB?'El recipient A':'El recipient B');distribution[vol>vB?'a':'b']++;if(dims[0]===other[0]&&dims[1]===other[1])distribution.sameBase++;}
 assert.equal(ex.options.length,4);assert.equal(new Set(ex.options).size,4);assert(ex.options.includes(ex.correct));assert(ex.guide.length>0&&ex.solution.length>0);
 const key=dims.join(':');if(!source[type].has(key))source[type].set(key,{q,correct:ex.correct,dims,other,vol});
 count++;
}
const shared=[...source[17].keys()].filter(x=>source[1].has(x)).sort();
assert(shared.length>=4,'Insufficient exact dimension matches between basic volume and container comparison');
const examples=shared.slice(0,4).map(k=>{
 const comp=source[17].get(k),core=source[1].get(k),otherVol=comp.other.reduce((a,b)=>a*b,1);
 assert.equal(comp.vol,core.vol);
 assert.equal(comp.correct,core.vol>otherVol?'El recipient A':'El recipient B');
 return {same_dimension_numbers:k,volume:{question:core.q,answer:core.correct},capacity_comparison:{question:comp.q,answer:comp.correct},second_container_dm3:otherVol,interpretation:'Volume multiplication is shared; capacity comparison additionally calculates a second volume and selects greater; centimetres versus decimetres are not interchangeable'};
});
console.log(JSON.stringify({generated:count,exact_matching_sets:shared.length,paired_examples:examples.length,comparison_distribution:distribution,examples,teacher_approved:false},null,2));
assert.equal(count,1000);assert.equal(examples.length,4);
