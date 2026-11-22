#!/usr/bin/env node
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const html=fs.readFileSync(path.join(__dirname,'..','2eso/sentit-mesura.html'),'utf8'),a=html.indexOf('/* ── UTILS NUMÈRIQUES'),b=html.indexOf("return {topicId:'problemes',type,course:'2n'",a),end=html.indexOf('\n}',b)+2;
assert(a>=0&&b>a&&end>b);
let seed=0x731ca701;const math=Object.create(Math);math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296};
const ctx=vm.createContext({Math:math,console});vm.runInContext(html.slice(a,end),ctx,{timeout:15000});
const gen=vm.runInContext('genSuperficiesVolums2ESO',ctx),plain=s=>String(s).replace(/<[^>]*>/g,'').replace(/\s+/g,' ').trim(),num=s=>Number(s.replace(',','.'));
const data={10:new Map(),11:new Map(),15:new Map()};let total=0;
for(const type of [10,11,15])for(let i=0;i<400;i++){
 const ex=gen(type),q=plain(ex.question);let area,height,vol,expected,unit,key,extra;
 if(type===10){const m=q.match(/volum de ([\d,.]+) cm³ i una àrea de la base de ([\d,.]+) cm²/);assert(m,q);vol=num(m[1]);area=num(m[2]);height=vol/area;expected=height;unit='cm';key=area+':'+height;}
 else if(type===11){const m=q.match(/volum de ([\d,.]+) cm³ i una altura de ([\d,.]+) cm/);assert(m,q);vol=num(m[1]);height=num(m[2]);area=vol/height;expected=area;unit='cm²';key=area+':'+height;}
 else{const m=q.match(/base ([\d,.]+) m × ([\d,.]+) m conté ([\d,.]+) L/);assert(m,q);const l=num(m[1]),w=num(m[2]),litres=num(m[3]);area=l*w;vol=litres/1000;height=vol/area;expected=height;unit='m';key=area+':'+height;extra={l,w,litres};}
 const ans=ex.correct.match(/^([\d,.]+) (cm²|cm|m)$/);assert(ans,ex.correct);assert.equal(ans[2],unit);assert(Math.abs(num(ans[1])-expected)<.00501,'Wrong '+type+' '+q);
 assert.equal(ex.options.length,4);assert.equal(new Set(ex.options).size,4);assert(ex.options.includes(ex.correct));assert(ex.guide.length>=3&&ex.solution.length>=2);
 if(!data[type].has(key))data[type].set(key,{q,answer:ex.correct,area,height,vol,extra});total++;
}
const overlap=[...data[10].keys()].filter(k=>data[11].has(k)).sort();
assert(overlap.length>=4,'Need four direct same-volume-and-base inverse pairs');
const pairs=overlap.slice(0,4).map(k=>{const h=data[10].get(k),b=data[11].get(k);assert.equal(h.vol,b.vol);return {same_base_area_and_height:k,find_height:{q:h.q,answer:h.answer},find_base_area:{q:b.q,answer:b.answer},distinction:'Same V=A_base*h, but inverse tasks solve different unknowns'};});
const examples15=[...data[15].values()].slice(0,4).map(e=>({q:e.q,answer:e.answer,volume_m3:e.vol,base_area_m2:e.area,depth_m:e.height,distinction:'Depth in m requires litre to cubic metre conversion and area from two lengths; not equal-data pairing with cm-scale prism inverses'}));
// Enumerate the finite parameter pools directly from the generator source. This
// establishes that 15 has no exact physical fixture with 10/11 after unit
// normalization, rather than inferring disjointness from 400 random samples.
const domains={
  area10_11_cm2:[12,15,18,20,24,30],
  height10_cm:[4,5,6,8,10],
  height11_cm:[4,5,6,8],
  base15_length_m:[2,2.5,3,4],
  base15_width_m:[1,1.5,2],
  depth15_m:[0.2,0.3,0.4,0.5]
};
const area15_m2=[...new Set(domains.base15_length_m.flatMap(l=>domains.base15_width_m.map(w=>+(l*w).toFixed(4))))].sort((a,b)=>a-b);
const height15_cm=domains.depth15_m.map(x=>x*100).sort((a,b)=>a-b);
const area15_cm2=area15_m2.map(x=>x*10000).sort((a,b)=>a-b);
const common=(a,b)=>a.filter(x=>b.includes(x));
const noExactPhysicalPairs={
  superficies15_base_area_cm2_vs_10_11:common(area15_cm2,domains.area10_11_cm2),
  superficies15_depth_cm_vs_10:common(height15_cm,domains.height10_cm),
  superficies15_depth_cm_vs_11:common(height15_cm,domains.height11_cm)
};
assert.deepEqual(noExactPhysicalPairs,{superficies15_base_area_cm2_vs_10_11:[],superficies15_depth_cm_vs_10:[],superficies15_depth_cm_vs_11:[]});
const sameFormulaDifferentWork={superficies15_vs_10:'same unknown (height/depth) and V=A_base·h after conversion, but 15 computes base area from two lengths and converts L to m³',superficies15_vs_11:'same volume relation, but 15 solves depth while 11 solves base area; input domains and units differ'};
console.log(JSON.stringify({checked:total,exact_inverse_pairs_available:overlap.length,paired_inverse_examples:pairs,structural_examples_15:examples15,finite_domains:{...domains,area15_m2,area15_cm2,height15_cm},normalized_parameter_overlap:noExactPhysicalPairs,interpretation:sameFormulaDifferentWork,teacher_approved:false},null,2));
assert.equal(total,1200);
