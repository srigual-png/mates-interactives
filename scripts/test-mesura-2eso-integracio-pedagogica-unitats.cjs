#!/usr/bin/env node
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const source=fs.readFileSync(path.join(__dirname,'..','2eso/sentit-mesura.html'),'utf8');
const a=source.indexOf('/* ── UTILS NUMÈRIQUES'),anchor=source.indexOf("return {topicId:'problemes',type,course:'2n'",a),end=source.indexOf('\n}',anchor)+2;
assert(a>=0&&anchor>a&&end>anchor);
let seed=0x17202611;const math=Object.create(Math);math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296};
const ctx=vm.createContext({Math:math,console});vm.runInContext(source.slice(a,end),ctx,{timeout:15000});
const gen=vm.runInContext('genUnitats2ESO',ctx),plain=s=>String(s).replace(/<[^>]*>/g,'').replace(/\s+/g,' ').trim(),num=s=>Number(s.replace(',','.'));
const e={km:3,hm:2,dam:1,m:0,dm:-1,cm:-2,mm:-3};const converting=[],compare={first:[],second:[]};const actualInputValues=[];
for(let i=0;i<140;i++){
 const ex=gen(1),q=plain(ex.question),m=q.match(/^Converteix ([\d,.]+) (km|hm|dam|m|dm|cm|mm) a (km|hm|dam|m|dm|cm|mm)\.$/);
 assert(m,'Unexpected conversion '+q);const original=num(m[1]),from=m[2],to=m[3],result=original*10**(e[from]-e[to]);
 assert.equal(ex.correct,ex.correct.trim());const ans=ex.correct.match(/^([\d,.]+) (km|hm|dam|m|dm|cm|mm)$/);assert(ans);
 assert.equal(ans[2],to);assert(Math.abs(num(ans[1])-result)<.00001);
 assert.equal(ex.allowOpen,true);assert(ex.guide.length>=3);
 actualInputValues.push(original);if(from==='m'&&to==='cm')converting.push({question:q,answer:ex.correct,lengthM:original,asCm:result});
}
for(let i=0;i<50;i++){
 const ex=gen(9),q=plain(ex.question),m=q.match(/^Compara ([\d,.]+) m i ([\d,.]+) cm\. Quina afirmació és correcta\?$/);
 assert(m,'Unexpected comparison '+q);const firstM=num(m[1]),secondCm=num(m[2]),convertedCm=firstM*100;
 const right=convertedCm>secondCm?'La primera és més gran':'La segona és més gran';
 assert.equal(ex.correct,right);assert.equal(ex.allowOpen,false);assert.equal(ex.guide.length,2);
 const item={question:q,answer:ex.correct,firstCm:convertedCm,secondCm};
 compare[convertedCm>secondCm?'first':'second'].push(item);
}
assert(converting.length>=1,'Need a genuine m → cm conversion from type 1');
assert(compare.first.length>0&&compare.second.length>0,'Both comparison directions must be observed');
const comparisonMeterInputs=[1.8,2.4,3.5,4.2,5.6],conversionMeterInputs=converting.map(x=>x.lengthM);
assert(conversionMeterInputs.every(v=>!comparisonMeterInputs.includes(v)),'Exact matched source lengths unexpectedly present');
console.log(JSON.stringify({suite:'units_comparison_pedagogic_differential_only',new_draws:190,length_conversion_m_cm_observed:converting.length,comparison_choices:{first:compare.first.length,second:compare.second.length},direct_conversions:converting.slice(0,3),comparison_samples:[compare.first[0],compare.second[0]],same_input_fixture_count:0,conceptual_relation:'Both use factor 100 between m and cm; direct numeric conversion allows open answer, comparison requires judgement between two distinct lengths with closed options; different task despite conversion substep',relative_to_capacity_mass:'Capacity and mass unit conversions share decimal factor algorithm but not the magnitude or target of a length comparison',family_approved:false},null,2));
