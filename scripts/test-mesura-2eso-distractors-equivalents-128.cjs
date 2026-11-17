#!/usr/bin/env node
'use strict';
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync(path.join(__dirname,'..','2eso','sentit-mesura.html'),'utf8');
const begin=html.indexOf('/* ── UTILS NUMÈRIQUES');
const marker="return {topicId:'problemes',type,course:'2n'";
const last=html.indexOf(marker,begin),end=html.indexOf('\n}',last)+2;
assert(begin>=0&&last>begin&&end>last);
let seed=0x917a5bd3,randomCalls=0;
const math=Object.create(Math);
math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;randomCalls++;if(randomCalls>900000)throw Error('Randomness budget exceeded');return seed/0x100000000};
const context=vm.createContext({Math:math,console});
vm.runInContext(html.slice(begin,end),context,{timeout:15000});
const generators=vm.runInContext('({unitats:genUnitats2ESO,escales:genEscales2ESO,pitagores:genPitagores2ESO,perimetres:genPerimetresArees2ESO,superficies:genSuperficiesVolums2ESO,estimacio:genEstimacioError2ESO,problemes:genProblemesMesura2ESO})',context);
const counts={unitats:18,escales:18,pitagores:16,perimetres:18,superficies:20,estimacio:18,problemes:20};
const factors={mm:[.001,'length'],cm:[.01,'length'],dm:[.1,'length'],m:[1,'length'],dam:[10,'length'],hm:[100,'length'],km:[1000,'length'],mm2:[1e-6,'area'],cm2:[1e-4,'area'],dm2:[.01,'area'],m2:[1,'area'],dam2:[100,'area'],hm2:[10000,'area'],km2:[1e6,'area'],mm3:[1e-9,'volume'],cm3:[1e-6,'volume'],dm3:[.001,'volume'],m3:[1,'volume'],cl:[.00001,'volume'],ml:[.000001,'volume'],dl:[.0001,'volume'],l:[.001,'volume'],mg:[1e-6,'mass'],g:[.001,'mass'],kg:[1,'mass'],t:[1000,'mass'],'€':[1,'money'],'%':[.01,'ratio'],'' :[1,'scalar']};
const normalizeUnit=u=>u.toLowerCase().replace(/²/g,'2').replace(/³/g,'3').replace(/\^2/g,'2').replace(/\^3/g,'3');
function numericOption(s){
 const v=String(s).trim().replace(/<[^>]+>/g,'');
 // The whole option must be one numeric measurement, never a sentence, vector or dimension.
 const m=/^([-+]?(?:\d{1,3}(?:\.\d{3})+|\d+)(?:,\d+|\.\d+)?)[\s\u00a0]*([a-zA-Z€%²³^0-9]*)$/.exec(v);
 if(!m)return null;
 const u=normalizeUnit(m[2]),factor=factors[u];if(!factor)return null;
 let amount=m[1].replace(/\.(?=\d{3}(?:\.|,|$))/g,'').replace(',','.');
 const n=Number(amount);if(!Number.isFinite(n))return null;
 return {kind:factor[1],value:n*factor[0],original:v};
}
function equivalent(a,b){
 if(a.kind!==b.kind)return false;
 const scale=Math.max(Math.abs(a.value),Math.abs(b.value),1e-12);
 return Math.abs(a.value-b.value)<=scale*1e-10;
}
// Unit-test the independent normalization before scanning actual exercises.
for(const [a,b] of [['0,5 m','50 cm'],['1 L','1 dm³'],['1000 mL','1 L'],['1.000 mL','1 L'],['50 %','0,5'],['1.000 g','1 kg'],['1,00 cm²','100 mm²']]){
 const p=numericOption(a),q=numericOption(b);assert(p&&q&&equivalent(p,q),'Failed positive normalization '+a+' '+b);
}
for(const [a,b] of [['1 m','1 m²'],['1 cm','1 m'],['1 m','1 €'],['2 cm²','2 cm³']]){
 const p=numericOption(a),q=numericOption(b);assert(p&&q&&!equivalent(p,q),'Failed negative normalization '+a+' '+b);
}
const anomalies=[],examples=[],byType={},sampleCount=60;
let generated=0,numericOptionCount=0;
for(const [topic,count] of Object.entries(counts)){
 for(let type=1;type<=count;type++){
  const key=topic+':'+type;
  for(let i=0;i<sampleCount;i++){
   let ex;try{ex=generators[topic](type)}catch(error){anomalies.push({key,iteration:i,kind:'exception',message:error.message});continue}
   generated++;
   const arr=ex.options.map(numericOption);
   numericOptionCount+=arr.filter(Boolean).length;
   const duplicates=[];
   for(let a=0;a<4;a++)for(let b=a+1;b<4;b++){
    if(arr[a]&&arr[b]&&equivalent(arr[a],arr[b])&&ex.options[a]!==ex.options[b])duplicates.push([a,b]);
   }
   if(duplicates.length){
    byType[key]=(byType[key]||0)+1;
    if(examples.length<30)examples.push({key,iteration:i,question:ex.question,correct:ex.correct,options:ex.options,duplicate_pairs:duplicates});
   }
  }
 }
}
const report={generator_types:128,samples_per_type:sampleCount,generated,numeric_options_parsed:numericOptionCount,types_with_semantic_duplicates:Object.keys(byType).length,instances_with_semantic_duplicates:Object.values(byType).reduce((a,b)=>a+b,0),by_type:byType,examples,exceptions:anomalies.slice(0,10),exceptions_count:anomalies.length,random_calls:randomCalls};
console.log(JSON.stringify(report,null,2));
assert.equal(generated,128*sampleCount);
assert.equal(anomalies.length,0);
if(process.env.MI_AUDIT_STRICT_DUPLICATES==='1')assert.equal(report.instances_with_semantic_duplicates,0);
