'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
globalThis.window=globalThis;
vm.runInThisContext(fs.readFileSync('assets/js/raonament-mesura-1eso.js','utf8'),{filename:'raonament-mesura-1eso.js'});
vm.runInThisContext(fs.readFileSync('assets/js/dificultat-mi.js','utf8'),{filename:'dificultat-mi.js'});
const page=fs.readFileSync('1eso/sentit-mesura.html','utf8'),begin=page.indexOf('function genAreesRaw(){'),finish=page.indexOf('// ── 6. ESTIMACIÓ',begin);
assert(begin>=0&&finish>begin,'area generator boundaries');
function seeded(seed){let x=seed>>>0;return()=>{x=(Math.imul(x,1664525)+1013904223)>>>0;return x/4294967296;};}
let random=seeded(0x99887766),forced=1,first=true;
globalThis.rnd=(a,b)=>{if(first){first=false;return forced;}return a+Math.floor(random()*(b-a+1));};
globalThis.fmtNum=n=>Number.isInteger(n)?String(n):String(Math.round(n*1e6)/1e6).replace('.',',');
globalThis.shuffle=a=>{const out=a.slice();for(let i=out.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[out[i],out[j]]=[out[j],out[i]];}return out;};
vm.runInThisContext(page.slice(begin,finish),{filename:'area-generator-extracted.js'});
const M=MIFirstMeasureTasks,topic={id:'arees',course:'1r',exam1r:true},D=MIDifficulty.attach({course:'1eso',sense:'mesura',topics:[topic]}),specs=M.areaFamilySpecs;
assert.equal(specs.length,15,'15 real area procedures after consolidation');
assert.deepEqual([1,2,3].map(level=>specs.filter(f=>f.level===level).length),[3,11,1]);
assert.equal(new Set(specs.map(f=>f.id)).size,15);
assert.deepEqual(D.coverage(topic).types,[3,11,1]);
assert.equal(new Set(D.coverage(topic).families).size,15);
assert.equal(D.examPlan(topic).slots.reduce((a,b)=>a+b,0),12);
const val=s=>{const m=String(s).match(/-?\d+(?:,\d+)?/);assert(m,'numeric value '+s);return Number(m[0].replace(',','.'));};
const nums=q=>q.question.match(/\d+(?:,\d+)?/g).map(s=>Number(s.replace(',','.')));
let rawSamples=0,catalogSamples=0,checked=0;
for(let type=1;type<=7;type++)for(let sample=0;sample<250;sample++){
 forced=type;first=true;random=seeded(0x4411+type*401+sample*29);
 const q=genAreesRaw(),f=M.areaFamilyFor(type),v=nums(q);assert.equal(q.type,type);
 assert.equal(q.areaFamily,f.id);assert.equal(q.familyId,f.id);assert.equal(q.taskDifficulty,f.level);assert.equal(q.diff,f.level);assert.equal(D.getDifficulty(topic,q),f.level);
 assert.equal(q.options.length,4);assert.equal(new Set(q.options).size,4);assert(q.options.includes(q.correct),'correct choice');
 assert(q.guide.length>=2&&q.solution.length>=2,'worked guidance and steps');
 let oracle;
 if(type===1)oracle=v[0]*v[0];
 else if(type===2||type===7)oracle=v[0]*v[1];
 else if(type===3||type===4)oracle=v[0]*v[1]/2;
 else if(type===5)oracle=(v[0]+v[1])*v[2]/2;
 else oracle=v[0]*v[1]-v[2]*v[3];
 assert.equal(val(q.correct),oracle,JSON.stringify({type,question:q.question,answer:q.correct,oracle}));
 assert(/(?:cm|m)²$/.test(q.correct),'squared units on direct area');
 rawSamples++;checked++;
}
const catalog=[
 ['rectangle-area-fixada',1001,'perimetre-minim-amb-area-fixada'],
 ['sumar-arees-composades',1002,'compondre-arees-figures'],
 ['comptar-quadrats-unitat',1003,'comptar-quadrats-unitat'],
 ['costat-quadrat-des-de-larea',1004,'costat-quadrat-des-de-larea'],
 ['reconstruir-dimensio-rectangle-area',1005,'reconstruir-dimensio-rectangle-area'],
 ['reconstruir-dimensio-meitat-producte',1006,'reconstruir-dimensio-meitat-producte'],
 ['reconstruir-dimensio-trapezi',1007,'reconstruir-dimensio-trapezi'],
 ['comparar-arees',1008,'comparar-arees'],
 ['cobrir-superficie',1009,'cobrir-superficie'],
 ['cost-per-superficie',1010,'cost-per-superficie'],
 ['diagnosticar-error-area',1011,'diagnosticar-error-area'],
 ['reconstruir-dimensio-figura-composta',1012,'reconstruir-dimensio-figura-composta']
];
for(const [id,type,family] of catalog){
 const f=M.areaFamilyInfo(family);assert(f&&f.generators.includes(type),id+' family map');
 for(let sample=0;sample<250;sample++){
  const q=M.generate(id,seeded(0xc011+type*211+sample*31)),d=q.reasoningData,answer=val(q.correct);assert.equal(q.type,type);
  assert.equal(q.areaFamily,family);assert.equal(q.familyId,family);assert.equal(q.taskDifficulty,f.level);assert.equal(q.diff,f.level);assert.equal(D.getDifficulty(topic,q),f.level);
  assert.equal(q.options.length,4);assert.equal(new Set(q.options).size,4);assert(q.options.includes(q.correct));assert(q.answerCheck(q.correct),'canonical corrector accepts answer');assert(q.guide.length>=2&&q.solution.length>=1);
  let oracle;
  switch(type){
   case 1001:{const pairs=[];for(let a=d.minSide;a*a<=d.area;a++)if(d.area%a===0&&d.area/a>=d.minSide)pairs.push(2*(a+d.area/a));oracle=Math.min(...pairs);assert(pairs.length>=3);break;}
   case 1002:oracle=d.w*d.h+d.h*d.triH/2;assert(d.triH%2===0);break;
   case 1003:oracle=d.rows.reduce((a,b)=>a+b,0);assert(d.rows.every(n=>n>=2&&n<=5));break;
   case 1004:oracle=Math.sqrt(d.area);assert.equal(oracle,d.side);assert(Number.isInteger(oracle));break;
   case 1005:oracle=d.area/d.known;assert.equal(oracle,d.askBase?d.b:d.h);break;
   case 1006:oracle=2*d.area/d.known;assert.equal(oracle,d.answer);break;
   case 1007:oracle=d.askBase?2*d.area/d.height-d.major:2*d.area/(d.major+d.minor);assert.equal(oracle,d.askBase?d.minor:d.height);break;
   case 1008:oracle=Math.abs(d.A-d.B);assert(oracle>=2);break;
   case 1009:oracle=Math.ceil(d.room/d.tileArea);assert.equal(d.exact,d.room/d.tileArea);break;
   case 1010:oracle=d.area*d.price;assert.equal(d.area,d.b*d.h/2);break;
   case 1011:oracle=d.kind===0?d.b*d.h:d.kind===1?d.b*d.h/2:d.side*d.side;break;
   case 1012:oracle=(d.whole-d.remaining)/d.cutDepth;assert.equal(oracle,d.cutW);assert.equal(d.remaining,d.whole-d.cutW*d.cutDepth);break;
  }
  assert.equal(answer,oracle,JSON.stringify({id,data:d,answer,oracle}));
  if(type===1004||type===1005||type===1006||type===1007)assert(answer>0&&Number.isInteger(answer),'inverse dimension is positive integer');
  catalogSamples++;checked++;
 }
}
assert.equal(M.areaFamilyFor(1).id,'producte-base-alcada');
assert.equal(M.areaFamilyFor(2).id,'producte-base-alcada');
assert.equal(M.areaFamilyFor(7).id,'producte-base-alcada','parallelogram is a product variant');
assert.equal(M.areaFamilyFor(3).id,'meitat-producte-dimensions');
assert.equal(M.areaFamilyFor(4).id,'meitat-producte-dimensions');
assert.equal(M.areaFamilyFor(5).level,2,'trapezoid formula is N2');
assert.equal(M.areaFamilyFor(6).id,'compondre-arees-figures');
assert.equal(M.areaFamilyFor(1001).level,3);
console.log(JSON.stringify({ok:true,families:specs.length,levels:[3,11,1],rawSamples,catalogSamples,checked},null,2));