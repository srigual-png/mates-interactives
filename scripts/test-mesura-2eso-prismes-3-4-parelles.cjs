#!/usr/bin/env node
'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),vm=require('node:vm');
const html=fs.readFileSync(path.join(__dirname,'..','2eso/sentit-mesura.html'),'utf8');
const begin=html.indexOf('/* ── UTILS NUMÈRIQUES'),endMarker=html.indexOf("return {topicId:'problemes',type,course:'2n'",begin),end=html.indexOf('\n}',endMarker)+2;
assert(begin>=0&&endMarker>begin&&end>endMarker);
let seed=0x120a45cd;const math=Object.create(Math);math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
const ctx=vm.createContext({Math:math,console});vm.runInContext(html.slice(begin,end),ctx,{timeout:15000});const generate=vm.runInContext('genSuperficiesVolums2ESO',ctx);
const plain=s=>String(s).replace(/<[^>]*>/g,'').replace(/\s+/g,' ').trim(),num=s=>Number(s.replace(',','.'));
const data={1:new Map(),3:new Map(),4:new Map(),5:new Map()};let checked=0;
for(const type of [1,3,4,5])for(let i=0;i<500;i++){
 const ex=generate(type),q=plain(ex.question);let area,height,description;
 if(type===1){const m=q.match(/ortoedre de (\d+) cm × (\d+) cm × (\d+) cm/);assert(m,'Cannot parse orthohedron '+q);const [l,w,h]=m.slice(1).map(Number);area=l*w;height=h;description={length_cm:l,width_cm:w,height_cm:h};}
 else if(type===3){const m=q.match(/àrea de la base de ([\d,.]+) cm² i una altura de ([\d,.]+) cm/);assert(m,'Cannot parse prism 3 '+q);area=num(m[1]);height=num(m[2]);description={base_area_cm2:area,height_cm:height};}
 else if(type===4){const m=q.match(/base triangular de base ([\d,.]+) cm i altura ([\d,.]+) cm.*?longitud del prisma és de ([\d,.]+) cm/);assert(m,'Cannot parse triangular prism '+q);const [b,hb,len]=m.slice(1).map(num);area=b*hb/2;height=len;description={triangle_base_cm:b,triangle_altitude_cm:hb,derived_base_area_cm2:area,prism_length_cm:len};}
 else {const m=q.match(/cub d’aresta (\d+) cm/);assert(m,'Cannot parse cube '+q);const edge=Number(m[1]);area=edge*edge;height=edge;description={edge_cm:edge,base_area_cm2:area,height_cm:height};}
 const volume=area*height,answer=ex.correct.match(/^([\d,.]+) cm³$/);assert(answer,'Expected cm³ answer '+ex.correct);assert(Math.abs(num(answer[1])-volume)<0.00501,`Oracle mismatch type ${type}: ${q}`);
 assert.equal(ex.options.length,4);assert.equal(new Set(ex.options).size,4);assert(ex.options.includes(ex.correct));assert(ex.guide.length>0&&ex.solution.length>0);
 const key=area+':'+height;if(!data[type].has(key))data[type].set(key,{question:q,answer:ex.correct,volume_cm3:volume,description});checked++;
}
const targetOverlaps={};
for(const type of [1,3,5])targetOverlaps[type]=[...data[4].keys()].filter(k=>data[type].has(k)).sort().map(key=>({base_area_cm2_and_height_cm:key,triangular_prism:data[4].get(key),target:data[type].get(key),shared_volume_model:'V=A_base×h',distinction:type===1?'type 1 has a rectangular base; type 4 derives the triangular base area':type===3?'type 3 is given the base area; type 4 derives it from the triangle':'type 5 constrains all three edge lengths to be equal'}));
const domains={
 type1_base_area_cm2:[...new Set([4,5,6,8,10].flatMap(l=>[3,4,5,6].map(w=>l*w)))].sort((a,b)=>a-b),
 type1_height_cm:[2,3,4,5,7],type3_base_area_cm2:[12,18,24,30,35,42],type3_height_cm:[4,5,6,8,10],
 type4_triangle_base_cm:[4,6,8,10],type4_triangle_altitude_cm:[3,4,5,6],type4_prism_length_cm:[5,6,8,10],
 type5_cube_edge_cm:[2,3,4,5,6,8]
};
domains.type4_derived_base_area_cm2=[...new Set(domains.type4_triangle_base_cm.flatMap(b=>domains.type4_triangle_altitude_cm.map(h=>b*h/2)))].sort((a,b)=>a-b);
domains.type5_base_area_cm2=domains.type5_cube_edge_cm.map(x=>x*x);
const pairDomains={
 type4_vs_1:[...new Set(domains.type4_derived_base_area_cm2)].filter(a=>domains.type1_base_area_cm2.includes(a)).length*[...new Set(domains.type4_prism_length_cm)].filter(h=>domains.type1_height_cm.includes(h)).length,
 type4_vs_3:[...new Set(domains.type4_derived_base_area_cm2)].filter(a=>domains.type3_base_area_cm2.includes(a)).length*[...new Set(domains.type4_prism_length_cm)].filter(h=>domains.type3_height_cm.includes(h)).length,
 type4_vs_5:domains.type4_derived_base_area_cm2.filter((a,i)=>domains.type5_base_area_cm2.includes(a)&&domains.type4_prism_length_cm.includes(domains.type5_cube_edge_cm[domains.type5_base_area_cm2.indexOf(a)])).length
};
assert.deepEqual(pairDomains,{type4_vs_1:8,type4_vs_3:16,type4_vs_5:1});
assert(targetOverlaps[1].length>=2&&targetOverlaps[3].length>=2&&targetOverlaps[5].length>=1,'Sample must contain the exhaustive exact parameter fixtures');
console.log(JSON.stringify({independent_oracle_instances:checked,verified_by_type:{1:500,3:500,4:500,5:500},exact_base_area_height_pairs_in_full_finite_domains:pairDomains,exact_pairs_observed_in_sample:{1:targetOverlaps[1].length,3:targetOverlaps[3].length,5:targetOverlaps[5].length},parameter_domains:domains,paired_examples:{type1:targetOverlaps[1].slice(0,2),type3:targetOverlaps[3].slice(0,4),type5:targetOverlaps[5]},interpretation:'All share the volume model. Type 4 is a same-family variant requiring the triangle base area first; the finite domains provide multiple exact base-area/height fixtures with type 1 and 3, but only one with the cube type 5, so strict paired-evidence coverage remains partial.',teacher_approved:false},null,2));
assert.equal(checked,2000);
