#!/usr/bin/env node
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const html=fs.readFileSync(path.join(__dirname,'..','2eso/sentit-mesura.html'),'utf8'),a=html.indexOf('/* ── UTILS NUMÈRIQUES'),b=html.indexOf("return {topicId:'problemes',type,course:'2n'",a),end=html.indexOf('\n}',b)+2;
assert(a>=0&&b>a&&end>b);
let seed=0x9a1840c3;const math=Object.create(Math);math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296};
const ctx=vm.createContext({Math:math,console});vm.runInContext(html.slice(a,end),ctx,{timeout:15000});
const gen=vm.runInContext('genSuperficiesVolums2ESO',ctx),plain=s=>String(s).replace(/<[^>]*>/g,'').replace(/\s+/g,' ').trim();
const sample={1:[],3:[],5:[],17:[]},branchExamples={sameBase:null,other:null},branchCounts={sameBase:0,other:0},numericDimensions={1:new Set(),17:new Set()};let count=0;
for(const type of [1,3,5,17])for(let i=0;i<500;i++){
 const ex=gen(type),q=plain(ex.question);let parsed;
 if(type===1){const m=q.match(/ortoedre de (\d+) cm × (\d+) cm × (\d+) cm/);assert(m,'Parse orthotope '+q);const dims=m.slice(1).map(Number),volume=dims.reduce((x,y)=>x*y,1);assert.equal(ex.correct,volume+' cm³');parsed={dims_cm:dims,volume_cm3:volume};}
 else if(type===3){const m=q.match(/àrea de la base de (\d+) cm² i una altura de (\d+) cm/);assert(m,'Parse prism '+q);const base=Number(m[1]),height=Number(m[2]),volume=base*height;assert.equal(ex.correct,volume+' cm³');parsed={base_area_cm2:base,height_cm:height,volume_cm3:volume};}
 else if(type===5){const m=q.match(/cub d’aresta (\d+) cm/);assert(m,'Parse cube '+q);const edge=Number(m[1]),volume=edge**3;assert.equal(ex.correct,volume+' cm³');parsed={edge_cm:edge,volume_cm3:volume};}
 else {const m=q.match(/recipient A mesura (\d+)×(\d+)×(\d+) dm i el B (\d+)×(\d+)×(\d+) dm/);assert(m,'Parse compared containers '+q);const A=m.slice(1,4).map(Number),B=m.slice(4,7).map(Number),vA=A.reduce((x,y)=>x*y,1),vB=B.reduce((x,y)=>x*y,1),sameBase=A[0]===B[0]&&A[1]===B[1];assert.notEqual(vA,vB);assert.equal(ex.correct,vA>vB?'El recipient A':'El recipient B');assert.equal(ex.difficultyVariant,sameBase?'sameBase':undefined);branchCounts[sameBase?'sameBase':'other']++;numericDimensions[17].add(A.join(':'));parsed={A_dm:A,B_dm:B,A_volume_dm3:vA,B_volume_dm3:vB,branch:sameBase?'sameBase':'other'};if(!branchExamples[sameBase?'sameBase':'other'])branchExamples[sameBase?'sameBase':'other']={question:q,answer:ex.correct,parameters:parsed};}
 if(type===1)numericDimensions[1].add(parsed.dims_cm.join(':'));
 assert.equal(ex.options.length,4);assert.equal(new Set(ex.options).size,4);assert(ex.options.includes(ex.correct));assert(ex.guide.length>0&&ex.solution.length>0);
 if(sample[type].length<3)sample[type].push({question:q,answer:ex.correct,parameters:parsed});count++;
}
assert(branchCounts.sameBase>0,'The lower-load sameBase branch must be sampled');assert(branchCounts.other>0,'The two-volume other branch must be sampled');
// The comparison type uses dm while the individual generators use cm. Their
// values can look alike as numerals, but physical dimensions are 10x larger.
const individual_cm_domains={
  type1_axes:[[4,5,6,8,10],[3,4,5,6],[2,3,4,5,7]],
  type3_base_area_cm2:[12,18,24,30,35,42],type3_height_cm:[4,5,6,8,10],
  type5_edge_cm:[2,3,4,5,6,8]
};
const comparison_dm_domains={A:[[4,5,6],[3,4,5],[2,3,4]],B:[[3,4,5],[3,4,6],[3,4,5]]};
const p17_axes_cm=[...comparison_dm_domains.A,...comparison_dm_domains.B].map(axis=>[...new Set(axis.map(x=>x*10))].sort((x,y)=>x-y));
const p17_base_areas_cm2=[...new Set(comparison_dm_domains.A[0].flatMap(l=>comparison_dm_domains.A[1].map(w=>l*w*100)))].sort((x,y)=>x-y);
const p17_heights_cm=[...new Set([...comparison_dm_domains.A[2],...comparison_dm_domains.B[2]].map(x=>x*10))].sort((x,y)=>x-y);
const numericMatchesWithoutUnitConversion=[...numericDimensions[1]].filter(x=>numericDimensions[17].has(x)).sort();
assert(numericMatchesWithoutUnitConversion.length>=4,'Expected at least four sampled numerical dimension triples; record unit mismatch explicitly');
const overlaps={type1_dimensions:individual_cm_domains.type1_axes.map(axis=>axis.filter(x=>p17_axes_cm.some(a=>a.includes(x)))),type3_base_area_cm2:individual_cm_domains.type3_base_area_cm2.filter(x=>p17_base_areas_cm2.includes(x)),type3_height_cm:individual_cm_domains.type3_height_cm.filter(x=>p17_heights_cm.includes(x)),type5_edge_cm:individual_cm_domains.type5_edge_cm.filter(x=>p17_axes_cm.some(axis=>axis.includes(x)))};
assert.deepEqual(overlaps,{type1_dimensions:[[],[],[]],type3_base_area_cm2:[],type3_height_cm:[],type5_edge_cm:[]});
const interpretations={type1:'same l×w×h volume model; 17 compares two containers instead of returning one volume',type3:'both use V=A_base×h, but 17 derives two prism volumes from dimensions in dm and compares capacities',type5:'a cube is the equal-edges case of l×w×h; 17 compares two general containers',branches:{sameBase:'equal first two dimensions make the comparison reducible to comparing heights (candidate N1)',other:'different bases require two volume products and a comparison (candidate N2)'}};
console.log(JSON.stringify({independent_oracle_instances:count,verified_by_type:{1:500,3:500,5:500,17:500},superficies17_branch_counts:branchCounts,numeric_dimension_matches_before_unit_conversion:numericMatchesWithoutUnitConversion,normalized_unit_domains:{comparison_17_axes_cm:p17_axes_cm,comparison_17_base_area_cm2:p17_base_areas_cm2,comparison_17_height_cm:p17_heights_cm,individual_cm_domains},exact_physical_parameter_overlaps:overlaps,interpretations,examples:{individual_tasks:sample,comparison_branches:branchExamples},teacher_approved:false},null,2));
assert.equal(count,2000);
