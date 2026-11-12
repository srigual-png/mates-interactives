'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const M = require('../assets/js/decimals-1eso.js');
const D = globalThis.MIDecimals;
require('../assets/js/dificultat-mi.js');
require('../assets/js/raonament-numeric-1eso.js');
const topic = {id:'decimals',gen(){},practiceGen(){}};
const html = fs.readFileSync(path.resolve(__dirname,'../1eso/sentit-numeric.html'),'utf8');
assert.match(html,/function genDecimalsPractice\(type,level,random=rnd\).*MIDecimals\.familyInfo/);
assert.match(html,/const type=rnd\(1,23\),q=MIDecimals\.generate/);
assert.match(html,/diff:q\.taskDifficulty,taskDifficulty:q\.taskDifficulty/);
assert.match(html,/variants:6,diffCounts:\{1:2,2:4,3:0\},gen:genDecimalsProb/);
const classifier = globalThis.MIDifficulty.attach({topics:[topic],course:'1eso',sense:'numeric'});
let seed=0xdec1a1;
function rnd(min,max){seed=(Math.imul(seed,1664525)+1013904223)>>>0;return min+Math.floor(seed/4294967296*(max-min+1));}
function exact(s){const m=String(s).match(/^(-?)(\d+)(?:,(\d+))?$/);assert(m,'decimal parse '+s);return {n:BigInt((m[1]||'')+m[2]+(m[3]||'')),p:(m[3]||'').length};}
function scaled(x,p){return x.n*10n**BigInt(p-x.p);}
function gcd(a,b){return b===0n?(a<0n?-a:a):gcd(b,a%b);}
function sameDecimal(a,b){const x=typeof a==='string'?exact(a):a,y=typeof b==='string'?exact(b):b,p=Math.max(x.p,y.p);return scaled(x,p)===scaled(y,p);}
function cmpDecimal(a,b){const x=typeof a==='string'?exact(a):a,y=typeof b==='string'?exact(b):b,p=Math.max(x.p,y.p),u=scaled(x,p),v=scaled(y,p);return u<v?-1:u>v?1:0;}
function oracle(id,q){
 const question=q.question,answer=String(q.correct),m=(re)=>{const x=question.match(re);assert(x,id+' oracle could not parse: '+question);return x;};
 if(id==='D01'||id==='D17'){
  const x=m(/Calcula ([\d,]+) ([+−]) ([\d,]+)\./),p=Math.max(exact(x[1]).p,exact(x[3]).p),a=scaled(exact(x[1]),p),b=scaled(exact(x[3]),p);
  assert(sameDecimal(answer,{n:x[2]==='+'?a+b:a-b,p}),id+' exact add/sub');return;
 }
 if(id==='D02'){
  const x=m(/Calcula ([\d,]+) × ([\d,]+)\./),a=exact(x[1]),b=exact(x[2]);
  assert(sameDecimal(answer,{n:a.n*b.n,p:a.p+b.p}),id+' exact product');return;
 }
 if(id==='D03'){
  const x=m(/Arrodoneix ([\d,]+) a (les unitats|les dècimes|les centèsimes)/),p=['les unitats','les dècimes','les centèsimes'].indexOf(x[2]),v=exact(x[1]),factor=10n**BigInt(Math.max(0,v.p-p));
  const rounded=v.p<=p?v.n*10n**BigInt(p-v.p):(v.n/factor)+(v.n%factor*2n>=factor?1n:0n);
  assert.equal(exact(answer).p,p,id+' required precision');assert(sameDecimal(answer,{n:rounded,p}),id+' half-up rounding');return;
 }
 if(id==='D04'){
  const x=m(/Converteix (\d+)\/(\d+) a decimal\./),v=exact(answer);
  assert.equal(v.n*BigInt(x[2]),BigInt(x[1])*10n**BigInt(v.p),id+' fraction to decimal');return;
 }
 if(id==='D05'){
  const x=m(/Escriu ([\d,]+) com a fracció irreductible\./),f=answer.match(/^(\d+)\/(\d+)$/);assert(f,id+' fraction response');
  const v=exact(x[1]),n=BigInt(f[1]),d=BigInt(f[2]);assert.equal(gcd(n,d),1n,id+' reduced fraction');assert.equal(n*10n**BigInt(v.p),v.n*d,id+' decimal to fraction');return;
 }
 if(id==='D06'){
  const vals=[...question.matchAll(/([\d,]+) €/g)].map(x=>exact(x[1]));assert.equal(vals.length,4,id+' money inputs');
  const p=Math.max(...vals.map(x=>x.p),exact(answer).p),sum=vals.slice(0,3).reduce((n,x)=>n+scaled(x,p),0n);
  assert.equal(sum+scaled(exact(answer),p),scaled(vals[3],p),id+' shopping change');return;
 }
 if(id==='D07'){
  const x=m(/([\d,]+) (?:kg|L per minut|L per minute)/i),n=m(/(?:paquets|minuts)\?$/),count=Number(question.match(/(\d+) (?:paquets|minuts)\?/)[1]),v=exact(x[1]),a=exact(answer);
  assert.equal(a.n*10n**BigInt(v.p),v.n*BigInt(count)*10n**BigInt(a.p),id+' contextual multiplication');return;
 }
 if(id==='D08'){
  const x=m(/valor exacte és ([\d,]+) m i l’aproximació és ([\d,]+) m/),p=Math.max(exact(x[1]).p,exact(x[2]).p),d=scaled(exact(x[1]),p)-scaled(exact(x[2]),p);
  assert(sameDecimal(answer,{n:d<0n?-d:d,p}),id+' absolute error');return;
 }
 if(id==='D09'){
  const x=m(/Valor exacte: ([\d,]+)\. Aproximació: ([\d,]+)\./),a=exact(x[1]),b=exact(x[2]),p=Math.max(a.p,b.p),delta=scaled(a,p)-scaled(b,p),err=delta<0n?-delta:delta,r=BigInt(answer);
  assert.equal(err*100n,r*scaled(a,p),id+' relative percent');return;
 }
 if(id==='D10'){
  const x=m(/(\d+) llibretes iguals costen ([\d,]+) €/),total=exact(x[2]),unit=exact(answer);
  assert.equal(unit.n*BigInt(x[1])*10n**BigInt(total.p),total.n*10n**BigInt(unit.p),id+' unit price');return;
 }
 if(id==='D11'){
  const x=m(/corda de ([\d,]+) m es talla en trossos de ([\d,]+) m/),a=exact(x[1]),b=exact(x[2]),parts=answer.split(';').map(v=>v.trim()),count=BigInt(parts[0]),rem=exact(parts[1]),p=Math.max(a.p,b.p,rem.p),length=scaled(a,p),piece=scaled(b,p),r=scaled(rem,p);
  assert.equal(length,piece*count+r,id+' quotient and remainder identity');assert(r>=0n&&r<piece,id+' remainder bounds');return;
 }
 if(id==='D12'){
  const x=m(/Les notes són ([\d,; ]+)\./),vals=x[1].split(';').map(v=>exact(v.trim())),sum=vals.reduce((n,v)=>n+scaled(v,1),0n),a=exact(answer);
  if(question.includes('arrodonida')){assert.equal(a.p,2,id+' rounded mean precision');const rounded=(sum*10n/4n)+(sum*10n%4n*2n>=4n?1n:0n);assert.equal(a.n,rounded,id+' rounded mean');}
  else assert.equal(a.n*4n*10n,a.p>=1?sum*10n**BigInt(a.p):sum*10n**BigInt(a.p),id+' exact mean');
  return;
 }
 if(id==='D13'){
  const x=m(/Cada ampolla conté ([\d,]+) L, amb error absolut com a màxim ([\d,]+) L[\s\S]*dipòsit de ([\d,]+) L[\s\S]*almenys ([\d,]+) L/),vals=x.slice(1).map(exact),p=Math.max(...vals.map(v=>v.p)),[nom,err,cap,need]=vals.map(v=>scaled(v,p));
  const ceil=(a,b)=>(a+b-1n)/b,lo=ceil(need,nom-err),hi=cap/(nom+err),want=lo<=hi?lo:0n;assert.equal(BigInt(answer),want,id+' guaranteed bottle count');return;
 }
 if(id==='D14'){
  if(question.startsWith('Quina posició'))assert.equal(answer,'centèsimes',id+' place');
  else {const x=m(/el (\d) a ([\d,]+)/);assert(sameDecimal(answer,{n:BigInt(x[1]),p:2}),id+' place value');}return;
 }
 if(id==='D15'){
  if(answer==='=')assert(question.includes(',5 □')&&question.includes(',50.'),id+' equal decimal forms');
  else {const x=m(/Ordena de menor a major amb el signe &lt;: ([\d,; ]+)\./),given=x[1].split('; '),sorted=given.slice().sort(cmpDecimal);assert.deepEqual(answer.split(' < '),sorted,id+' decimal ordering');}return;
 }
 if(id==='D16'){
  const x=m(/Recta de ([\d,]+) a ([\d,]+), amb deu intervals iguals\. A és la marca (\d+)/),start=exact(x[1]),a=exact(answer);assert.equal(a.n*100n,start.n*100n+BigInt(x[3])*10n**BigInt(a.p),id+' number line');return;
 }
 if(id==='D18'){
  const x=m(/Calcula ([\d,]+) ÷ ([\d,]+)\./),a=exact(x[1]),b=exact(x[2]),z=exact(answer);
  assert.equal(a.n*10n**BigInt(b.p+z.p),b.n*z.n*10n**BigInt(a.p),id+' decimal division');return;
 }
 if(id==='D19'){
  const power=BigInt(question.match(/1\.000|100|10/)[0].replace('.','')),x=question.match(/Calcula ([\d,]+) (×|÷) (1\.000|100|10)\./),a=exact(x[1]),z=exact(answer);
  if(x[2]==='×')assert.equal(z.n*10n**BigInt(a.p),a.n*power*10n**BigInt(z.p),id+' power-of-ten multiplication');
  else assert.equal(z.n*power*10n**BigInt(a.p),a.n*10n**BigInt(z.p),id+' power-of-ten division');return;
 }
 if(id==='D20'){
  const x=m(/estrictament entre ([\d,]+) i ([\d,]+)\./),a=exact(answer);assert.equal(a.p,2,id+' construction precision');assert(cmpDecimal(answer,x[1])>0&&cmpDecimal(answer,x[2])<0,id+' strict construction');return;
 }
 if(id==='D21'){
  const x=m(/més gran que ([\d,]+) i més petit que ([\d,]+)\./),digit=Number(answer),a=exact(x[1]),b=exact(x[2]),v=exact(question.match(/Completa (\d,□\d)/)[1].replace('□',String(digit)));
  assert(cmpDecimal(v,x[1])>0&&cmpDecimal(v,x[2])<0,id+' bounded digit');return;
 }
 if(id==='D22'){
  const result=q.decimalsAnswer.fields[1].value;
  if(question.includes(' × 100 = ')){const x=m(/diu que ([\d,]+) × 100/),a=exact(x[1]),z=exact(result);assert.equal(z.n*10n**BigInt(a.p),a.n*100n*10n**BigInt(z.p),id+' multiplication diagnosis');}
  else if(question.includes('suma ')){const x=m(/suma ([\d,]+) \+ 0,25/),a=exact(x[1]),b=exact('0,25'),z=exact(result),p=Math.max(a.p,b.p);assert(sameDecimal(result,{n:scaled(a,p)+scaled(b,p),p}),id+' addition diagnosis');}
  else {const x=m(/diu que ([\d,]+) ÷ 0,2/),a=exact(x[1]),z=exact(result);assert.equal(a.n*10n*10n**BigInt(z.p),z.n*2n*10n**BigInt(a.p),id+' division diagnosis');}
  return;
 }
 if(id==='D23'){
  const x=m(/exactament ([\d,]+) × ([\d,]+),/),a=exact(x[1]),b=exact(x[2]),product=exact(x[1]);const pair=answer.match(/Entre (\d+) i (\d+)/);assert(pair,id+' interval answer');
  const exactProduct={n:a.n*b.n,p:a.p+b.p};assert(cmpDecimal(exactProduct,{n:BigInt(pair[1]),p:0})>0&&cmpDecimal(exactProduct,{n:BigInt(pair[2]),p:0})<0,id+' product in selected interval');return;
 }
 throw new Error('Missing independent oracle '+id);
}
const expectedLevel={D01:2,D17:2,D02:2,D07:2,D03:1,D04:2,D05:2,D06:2,D08:1,D09:2,D10:1,D11:2,D12:2,D13:3,D14:1,D15:1,D16:1,D18:2,D19:1,D20:1,D21:2,D22:2,D23:3};
const examples={}; const counts={}; let total=0, gradeChecks=0, uniqueDistractors=0, classifierChecks=0;
assert.deepEqual(D.families.map(level=>level.length),[8,10,2]);
assert.equal(D.familySpecs.length,20);
for(const id of Object.keys(expectedLevel)){
 counts[id]=0;let sample=[];
 for(let i=0;i<250;i++){
  const q=D.generate(id,rnd);
  assert.equal(q.decimalsGenerator,id,id+' generator metadata');
  const spec=D.familyInfo(id);
  assert.equal(q.decimalsFamily,spec.id,id+' family identity');
  assert.equal(q.taskDifficulty,expectedLevel[id],id+' internal level');
  assert.equal(q.diff,expectedLevel[id],id+' displayed difficulty');
  assert.equal(classifier.getDifficulty(topic,q),expectedLevel[id],id+' shared classifier level');
  classifierChecks++;
  assert.equal(D.matches(q.decimalsAnswer,q.correct),true,id+' canonical answer');
  assert.equal(q.options.includes(q.correct),true,id+' answer among choices');
  assert.equal(new Set(q.options.map(String)).size,q.options.length,id+' unique distractors');
  uniqueDistractors++;
  oracle(id,q);
  const original=q.correct;
  const wrong=q.options.map(String).find(v=>v!==String(original));
  if(wrong!==undefined)assert.equal(D.matches(q.decimalsAnswer,wrong),false,id+' rejects distractor');
  gradeChecks++;
  if(i<3)sample.push({generator:id,question:q.question.replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim(),answer:q.correct,solution:q.solution});
  counts[id]++; total++;
 }
 const fam=D.familyInfo(id).id;(examples[fam]||=[]).push(...sample);
}
for(const spec of D.familySpecs)assert.deepEqual(spec.generators.map(id=>expectedLevel[id]),spec.generators.map(()=>spec.level),'one level per family '+spec.id);
assert.equal(D.equal('2,5','2,50'),true);
assert.equal(D.equal('0,07','0,0700'),true);
assert.equal(D.equal('1,2','1,02'),false);
assert.equal(D.round('2,345',2),'2,35');
assert.equal(D.round('2,344',2),'2,34');
assert.deepEqual(Object.values(counts).reduce((a,b)=>a+b,0),5750);
for(const spec of D.familySpecs){const rows=examples[spec.id]||[];if(spec.generators.length>1){const selected=spec.generators.map(id=>rows.find(row=>row.generator===id)).filter(Boolean);while(selected.length<3)selected.push(rows.find(row=>row.generator===spec.generators[0]&&!selected.includes(row)));examples[spec.id]=selected.slice(0,3);}else examples[spec.id]=rows.slice(0,3);assert.equal(examples[spec.id].length,3,'three report examples '+spec.id);}
console.log(JSON.stringify({passed:true,total,families:D.familySpecs.length,levels:D.families.map(x=>x.length),generatedById:counts,checks:{classifierChecks,gradeChecks,uniqueDistractors},examples},null,2));
