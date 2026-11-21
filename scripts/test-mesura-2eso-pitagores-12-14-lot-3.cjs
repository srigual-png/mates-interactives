#!/usr/bin/env node
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const html=fs.readFileSync(path.join(__dirname,'..','2eso','sentit-mesura.html'),'utf8');
const start=html.indexOf('/* ── UTILS NUMÈRIQUES'),mark=html.indexOf("return {topicId:'problemes',type,course:'2n'",start),end=html.indexOf('\n}',mark)+2;
assert(start>=0&&mark>start&&end>mark,'Generator source unavailable');
let seed=0x50495433,calls=0;const math=Object.create(Math);
math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;assert(++calls<500000,'Random budget exceeded');return seed/4294967296};
const ctx=vm.createContext({Math:math,console});vm.runInContext(html.slice(start,end),ctx,{timeout:15000});
const {genPitagores2ESO:pyth,genProblemesMesura2ESO:problems}=vm.runInContext('({genPitagores2ESO,genProblemesMesura2ESO})',ctx);
const clean=s=>String(s).replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim();
const num=s=>Number(String(s).replace(',','.').replace(/\.$/,''));
const grab=(q,re)=>{const m=q.match(re);assert(m,'Cannot parse parameters: '+q);return m.slice(1).map(num)};
const key=(a,b)=>[a,b].sort((x,y)=>x-y).map(v=>Number(v.toFixed(6))).join(':');
const types={4:'pitagores',5:'pitagores',6:'pitagores',7:'pitagores',8:'pitagores',12:'pitagores',13:'pitagores',14:'pitagores','p6':'problemes','p7':'problemes'};
const samples=Object.fromEntries(Object.keys(types).map(k=>[k,new Map()]));
const expected=(id,a,b,extra)=>id===12?a+b-Math.hypot(a,b):id===14?Math.hypot(a,b)+extra:Math.hypot(a,b);
function extract(id,q){
 if(typeof id==='string'&&/^\d+$/.test(id))id=Number(id);
 if(id===4)return grab(q,/habitació rectangular fa (\d+) m × (\d+) m/);
 if(id===5){const [s]=grab(q,/quadrat té costat de (\d+) cm/);return [s,s];}
 if(id===6)return grab(q,/peu a (\d+) m de la paret i arriba a una altura de (\d+) m/);
 if(id===7)return grab(q,/pal de (\d+) m fins a un punt del terra situat a (\d+) m/);
 if(id===8)return grab(q,/salva una altura de (\d+) m i ocupa (\d+) m horitzontalment/);
 if(id===12)return grab(q,/recórrer (\d+) m en una direcció i després (\d+) m/);
 if(id===13)return grab(q,/pantalla rectangular fa (\d+) cm d’amplada i (\d+) cm d’alçada/);
 if(id===14)return grab(q,/punt a (\d+) m de la base d’un pal i un punt situat a (\d+) m d’altura, cal deixar (\d+) m/);
 if(id==='p6')return grab(q,/pantalla rectangular fa (\d+) cm d’ample i (\d+) cm d’alt/).map(x=>x/100);
 if(id==='p7'){const [h,x]=grab(q,/arriba fins a ([\d,.]+) m d’altura i té el peu a ([\d,.]+) m/);return [x,h];}
 throw Error('Unknown type '+id);
}
function get(id){return id[0]==='p'?problems(Number(id.slice(1))):pyth(Number(id));}
function verify(id,ex,q,a,b){
 let unit=(id===13||id===5)?'cm':id==='p6'?'cm':'m';let val;
 if(id===5){const side=a;val=Math.round(Math.sqrt(2)*side*100)/100;}
 else if(id==='p6'){val=Math.hypot(a*100,b*100);}
 else if(id==='p7'){val=Math.hypot(a,b);}
 else if(id===12||id===14){const extra=id===14?grab(q,/cal deixar (\d+) m/)[0]:0;val=expected(id,a,b,extra);}
 else val=Math.hypot(a,b);
 const m=String(ex.correct).match(/^([\d,.]+)\s*(cm|m)$/);assert(m,'Unexpected answer '+ex.correct);
 assert.equal(m[2],unit,'Unit mismatch for '+id);
 assert(Math.abs(num(m[1])-val)<=(id===5?0.00501:0.00501),'Independent oracle failed for '+id+': '+q+'; expected '+val+' got '+ex.correct);
 assert.equal(ex.options.length,4);assert.equal(new Set(ex.options).size,4);assert(ex.options.includes(ex.correct));assert(ex.guide.length>0&&ex.solution.length>0);
}
const checks={};
for(const id of Object.keys(types)){
 checks[id]=0;
 for(let i=0;i<400;i++){
  const ex=get(id),q=clean(ex.question),[a,b]=extract(id,q);verify(Number.isNaN(Number(id))?id:Number(id),ex,q,a,b);checks[id]++;
  let outA=a,outB=b;
  const k=key(outA,outB);
  if(!samples[id].has(k))samples[id].set(k,{question:q,answer:ex.correct,key:k,unit:id===13?'cm':id==='p6'?'cm':'m'});
 }
}
const pairs=[];const targets=[4,6,7,8,13,'p7'];
for(const source of [12,14])for(const target of targets){
 const overlaps=[...samples[source].keys()].filter(k=>samples[target].has(k)).sort();
 assert(overlaps.length>=2,'Need 2 shared-triple examples for '+source+'↔'+target);
 for(const k of overlaps.slice(0,2)){
  const a=samples[source].get(k),b=samples[target].get(k);
  pairs.push({pair:source===12?'pitagores:12↔':'pitagores:14↔',target:target==='p7'?'problemes:7':'pitagores:'+target,shared_cathetus_signature:k,source:{question:a.question,answer:a.answer},target_example:{question:b.question,answer:b.answer},interpretation:target===13?'Mateix triple numèric amb unitats cm/m diferents; es contrasta la mateixa relació pitagòrica a una altra escala.':'Mateix triple i unitats; el context canvia però el càlcul de la hipotenusa es conserva.'});
 }
}
// Exhaust the finite inputs for the two remaining destinations: neither offers
// a same-parameter Pythagorean match to the meter-scale source triples.
const triples=vm.runInContext('PYTH_TRIPLES',ctx);
assert(triples.every(([a,b])=>a!==b),'Unexpected equal-leg triple would overlap square-diagonal type 5');
const sourceTriples=triples.filter(([, ,c])=>c<=29).map(([a,b])=>key(a,b));
const squareSides=[5,7,10,12].map(s=>key(s/100,s/100));
assert(!squareSides.some(k=>sourceTriples.includes(k)),'Unexpected square-diagonal exact input match');
const problem6Meters=[[30,40],[36,48],[45,60],[60,80]].map(([a,b])=>key(a/100,b/100));
assert(!problem6Meters.some(k=>sourceTriples.includes(k)),'Unexpected problemes:6 exact input match');
const report={lot:'pitagores:12/14 missing direct and contextual destinations',independent_oracle_instances:Object.values(checks).reduce((a,b)=>a+b,0),verified_by_type:checks,paired_examples:pairs.length,paired_targets:targets.map(t=>t==='p7'?'problemes:7':'pitagores:'+t),examples:pairs,structural_without_exact_pair:[{target:'pitagores:5',reason:'square diagonal has equal legs; the source triple pool contains no equal-leg right triangle'},{target:'problemes:6',reason:'screen dimensions are 30–80 cm, while source fixtures are meter-scale triples; no same-parameter fixture after unit conversion'}],teacher_approved:false};
console.log(JSON.stringify(report,null,2));
assert.equal(report.independent_oracle_instances,4000);assert.equal(report.paired_examples,24);
