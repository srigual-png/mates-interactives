#!/usr/bin/env node
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const html=fs.readFileSync(path.join(__dirname,'..','2eso','sentit-mesura.html'),'utf8');
const start=html.indexOf('/* ── UTILS NUMÈRIQUES'),mark=html.indexOf("return {topicId:'problemes',type,course:'2n'",start),end=html.indexOf('\n}',mark)+2;
assert(start>=0&&mark>start&&end>mark,'Generator source unavailable');
let seed=0x50495434,calls=0;const math=Object.create(Math);
math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;assert(++calls<500000,'Random budget exceeded');return seed/4294967296};
const ctx=vm.createContext({Math:math,console});vm.runInContext(html.slice(start,end),ctx,{timeout:15000});
const {genPitagores2ESO:pyth,genProblemesMesura2ESO:problems}=vm.runInContext('({genPitagores2ESO,genProblemesMesura2ESO})',ctx);
const clean=s=>String(s).replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim();
const num=s=>Number(String(s).replace(',','.').replace(/\.$/,''));
const grab=(q,re)=>{const m=q.match(re);assert(m,'Cannot parse parameters: '+q);return m.slice(1).map(num)};
const key=(a,b)=>[a,b].sort((x,y)=>x-y).map(v=>Number(v.toFixed(6))).join(':');
const maps={2:new Map(),4:new Map(),5:new Map(),6:new Map(),7:new Map(),8:new Map(),13:new Map(),p6:new Map(),p7:new Map(),'3_short':new Map(),'3_long':new Map(),'15_diagonal':new Map(),'15_inverse':new Map()};
const counts=Object.fromEntries(Object.keys(maps).map(k=>[k,0]));
function params(id,q){
 if(id===2)return grab(q,/catets de (\d+) cm i (\d+) cm/);
 if(id===3||id==='3_short'||id==='3_long'||id==='15_inverse'){
  const re=id===3?/hipotenusa mesura (\d+) cm i un catet (\d+) cm/:/hipotenusa (\d+) cm i un catet de (\d+) cm/;
  const [c,known]=grab(q,re),other=Math.sqrt(c*c-known*known);return {a:known,b:other,c,known};
 }
 if(id==='15_diagonal')return grab(q,/rectangle de (\d+) cm × (\d+) cm/);
 if(id===4)return grab(q,/habitació rectangular fa (\d+) m × (\d+) m/);
 if(id===5){const [s]=grab(q,/quadrat té costat de (\d+) cm/);return [s,s];}
 if(id===6)return grab(q,/peu a (\d+) m de la paret i arriba a una altura de (\d+) m/);
 if(id===7)return grab(q,/pal de (\d+) m fins a un punt del terra situat a (\d+) m/);
 if(id===8)return grab(q,/salva una altura de (\d+) m i ocupa (\d+) m horitzontalment/);
 if(id===13)return grab(q,/pantalla rectangular fa (\d+) cm d’amplada i (\d+) cm d’alçada/);
 if(id==='p6')return grab(q,/pantalla rectangular fa (\d+) cm d’ample i (\d+) cm d’alt/);
 if(id==='p7'){const [h,x]=grab(q,/arriba fins a ([\d,.]+) m d’altura i té el peu a ([\d,.]+) m/);return [x,h];}
 throw Error('Unknown type '+id);
}
function generate(id){return typeof id==='number'?pyth(id):id==='p6'||id==='p7'?problems(Number(id.slice(1))):pyth(Number(id.split('_')[0]));}
function verify(id,ex,q,p){
 let a,b,expected,unit;
 if(id===3||id==='3_short'||id==='3_long'||id==='15_inverse'){
  ({a,b}=p);expected=Math.sqrt(p.c*p.c-p.known*p.known);unit='cm';
 }else if(id==='15_diagonal'){[a,b]=p;expected=Math.hypot(a,b);unit='cm';}
 else if(id===5){[a,b]=p;expected=Math.round(Math.sqrt(2)*a*100)/100;unit='cm';}
 else if(id==='p6'){[a,b]=p;expected=Math.hypot(a,b);unit='cm';}
 else if(id==='p7'){[a,b]=p;expected=Math.hypot(a,b);unit='m';}
 else {[a,b]=p;expected=Math.hypot(a,b);unit=id===2||id===13?'cm':'m';}
 const m=String(ex.correct).match(/^([\d,.]+)\s*(cm|m)$/);assert(m,'Unexpected answer '+ex.correct);
 assert.equal(m[2],unit,'Unit mismatch for '+id);
 assert(Math.abs(num(m[1])-expected)<0.00501,'Independent oracle failed for '+id+': '+q+' expected '+expected+' got '+ex.correct);
 assert.equal(ex.options.length,4);assert.equal(new Set(ex.options).size,4);assert(ex.options.includes(ex.correct));assert(ex.guide.length>0&&ex.solution.length>0);
}
const ids=[2,3,4,5,6,7,8,13,15,'p6','p7'];
for(const id of ids)for(let i=0;i<400;i++){
 const ex=generate(id),q=clean(ex.question);let p,store;
 if(id===3){p=params(id,q);store=p.known<p.b?'3_short':'3_long';}
 else if(id===15){if(q.startsWith('Un alumne calcula la diagonal')){p=params('15_diagonal',q);store='15_diagonal';}else{p=params('15_inverse',q);store='15_inverse';}}
 else {p=params(id,q);store=id;}
 verify(store,ex,q,p);counts[store]++;
 let a,b;
 if(store==='3_short'||store==='3_long'||store==='15_inverse'){a=p.a;b=p.b;}
 else [a,b]=p;
 const k=key(a,b);
 if(!maps[store].has(k))maps[store].set(k,{question:q,answer:ex.correct,key:k,branch:store});
}
const targets=[4,6,7,8,13,'p7'];const pairs=[];
const sources=[{name:'pitagores:3 · catet conegut curt',map:maps['3_short']},{name:'pitagores:3 · catet conegut llarg',map:maps['3_long']},{name:'pitagores:15 · diagonal directa',map:maps['15_diagonal']},{name:'pitagores:15 · catet invers',map:maps['15_inverse']}];
for(const source of sources)for(const target of targets){
 const overlap=[...source.map.keys()].filter(k=>maps[target].has(k)).sort();
 assert(overlap.length>=2,'Need two shared-triple samples for '+source.name+' ↔ '+target);
 for(const k of overlap.slice(0,2)){
  const a=source.map.get(k),b=maps[target].get(k);
  const targetName=target==='p7'?'problemes:7':'pitagores:'+target;
  const unitNote=target===13?'Mateixa terna numèrica i mateixa unitat cm.':'Mateixa terna numèrica però unitats cm/m diferents; no són les mateixes longituds físiques.';
  pairs.push({pair:source.name+' ↔ '+targetName,shared_triple_signature:k,source:{question:a.question,answer:a.answer},target:{question:b.question,answer:b.answer},interpretation:unitNote+' La tasca directa resol la hipotenusa i la font inversa recupera un catet.'});
 }
}
const triples=vm.runInContext('PYTH_TRIPLES',ctx);
assert(triples.every(([a,b])=>a!==b),'Unexpected equal-leg right triangle would overlap pitagores:5');
const squareKeys=[5,7,10,12].map(s=>key(s,s));
assert(!squareKeys.some(k=>triples.some(([a,b])=>key(a,b)===k)),'Unexpected exact square-diagonal match');
const p6Keys=[[30,40],[36,48],[45,60],[60,80]].map(([a,b])=>key(a,b));
assert(!p6Keys.some(k=>triples.some(([a,b])=>key(a,b)===k)),'Unexpected exact screen-diagonal match');
const report={lot:'pitagores:3 and 15, all matched destinations and both type-15 branches',independent_oracle_instances:Object.values(counts).reduce((a,b)=>a+b,0),verified_by_type:counts,paired_examples:pairs.length,paired_targets:targets.map(t=>t==='p7'?'problemes:7':'pitagores:'+t),examples:pairs,structural_without_exact_pair:[{target:'pitagores:5',reason:'equal square legs do not occur in the source Pythagorean triple pool'},{target:'problemes:6',reason:'fixed 30–80 cm screen dimensions do not occur in the integer-centimeter source triple pool'}],teacher_approved:false};
console.log(JSON.stringify(report,null,2));
assert.equal(report.independent_oracle_instances,4400);assert.equal(report.paired_examples,48);
