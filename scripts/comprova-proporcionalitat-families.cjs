'use strict';
const assert=require('node:assert/strict');
const path=require('node:path');
require(path.resolve('assets/js/raonament-numeric-1eso.js'));
require(path.resolve('assets/js/proporcionalitat-1eso.js'));
const M=globalThis.MIProporcionalitat;
assert.ok(M,'MIProporcionalitat carregat');
const expected=[
  {id:'P01',level:1,generators:['P01']},
  {id:'P03',level:1,generators:['P03','P06']},
  {id:'P02-factor',level:1,generators:['P02-factor']},
  {id:'P02',level:2,generators:['P02','P02-consum','P07']},
  {id:'P04',level:2,generators:['P04','P08']},
  {id:'P10',level:2,generators:['P10']},
  {id:'P05',level:3,generators:['P05']},
  {id:'P09',level:3,generators:['P09']},
  {id:'P11',level:3,generators:['P11']}
];
assert.deepEqual(M.familySpecs.map(({id,level,generators})=>({id,level,generators})),expected);
assert.deepEqual(M.families.map(g=>g.length),[3,3,3]);
const inventory=M.families.flat(2).sort();
assert.equal(new Set(inventory).size,13);
assert.deepEqual(inventory,['P01','P02','P02-consum','P02-factor','P03','P04','P05','P06','P07','P08','P09','P10','P11'].sort());
for(const spec of expected)for(const id of spec.generators)assert.equal(M.familyInfo(id).id,spec.id);
let seed=0x23a9b431;
const random=(min,max)=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return min+Math.floor(seed/4294967296*(max-min+1));};
const counts={};
function choice(q,value){assert.ok(q.options.includes(value),q.type+' expected answer not offered');assert.equal(new Set(q.options).size,4,q.type+' duplicate options');assert.equal(M.matches(q.proportionAnswer,value),true,q.type+' accepted answer');assert.equal(M.matches(q.proportionAnswer,value+' extra'),false,q.type+' accepted malformed answer');}
function oracle(q){
 const v=q.proportionData.values,id=q.proportionData.generator;
 if(id==='P01')return v[1]===0?'Sí: el preu per kg és constant i no hi ha quota fixa':'No: hi ha una quota fixa';
 if(id==='P02')return String(v[1]*v[2]);
 if(id==='P02-factor')return String(v[1]*v[2]);
 if(id==='P02-consum')return String(v[1]*v[2]);
 if(id==='P03')return String(v[1]);
 if(id==='P06'){
  const k=v[0],i=v[1];
  return [`Cada quilogram costa ${k} euros`,`Cada hora fabrica ${k} peces`,`Cada entrada costa ${k} euros`][i];
 }
 if(id==='P04'){
  const [x1,x3,k,bad]=v,xs=[1,x1,x3],ys=xs.map(x=>x*k);
  if(bad)ys[2]+=1;
  return bad?'No és proporcional: els quocients no són tots iguals':'És proporcional: tots els quocients són iguals';
 }
 if(id==='P08')return String(v[1]*v[2]);
 if(id==='P05'){
  const d=q.reasoningData;let best=0;
  for(let a=0;a<=d.hoursA;a++)for(let b=0;b<=d.hoursB;b++)if(a*d.costA+b*d.costB<=d.budget)best=Math.max(best,a*d.madeA/d.timeA+b*d.madeB/d.timeB);
  return String(best);
 }
 if(id==='P07')return v[2]===v[3]?'Costen igual per unitat':v[2]<v[3]?'A':'B';
 if(id==='P09')return String(v[0]*v[2]);
 if(id==='P10')return 'Ha sumat en lloc de mantenir el mateix factor multiplicatiu';
 if(id==='P11')return v[3]?'Sí: la tarifa proporcional està especificada':'No: hi ha diversos models compatibles';
 throw Error('Sense oracle independent per '+id);
}
for(const spec of expected)for(const id of spec.generators){
 counts[id]=0;
 for(let i=0;i<250;i++){
  const q=M.generate(id,random);counts[id]++;
  assert.equal(q.familyId,spec.id,id+' canonical family');
  assert.equal(q.taskDifficulty,spec.level,id+' taskDifficulty');
  assert.equal(q.diff,spec.level,id+' diff');
  assert.equal(q.proportionData.generator,id,id+' audit data');
  assert.ok(q.question&&q.solution.length>=2&&q.guide.length,id+' content');
  const answer=oracle(q);assert.equal(String(q.correct),answer,id+' exact independent answer');
  choice(q,answer);
  if(id==='P05'){assert.ok(q.reasoningData,'P05 constraints');}
  if(id==='P11'&&!q.proportionData.values[3]){const [x,extra,k]=q.proportionData.values;assert.notEqual((x+extra)*k,x+(x+extra)*(k-1),'countermodels must differ');}
 
 }
}
console.log(JSON.stringify({families:expected.length,counts,generated:Object.values(counts).reduce((a,b)=>a+b,0)},null,2));
