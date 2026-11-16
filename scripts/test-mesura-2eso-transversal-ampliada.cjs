#!/usr/bin/env node
'use strict';

// Prova independent de 4 nuclis matemàtics presents en temes diferents.
// Exercita els generadors originals. No declara famílies pedagògiques validades.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const html = fs.readFileSync(path.join(__dirname,'..','2eso','sentit-mesura.html'),'utf8');
const start=html.indexOf('/* ── GENERADOR · BLOC 1:');
const end=html.indexOf('/* ── AMPLIACIÓ A',start);
assert(start>=0 && end>start,'No es localitzen els generadors');

let iteration=0;
const shuffle=items=>{
  const offset=iteration%items.length;
  return [...items.slice(offset),...items.slice(0,offset)];
};
const fmtNum=(x,max=4)=>Number(x).toFixed(max).replace(/0+$/,'').replace(/\.$/,'').replace('.',',');
const answerUnit=(x,u,max=6)=>fmtNum(x,max)+' '+u;
const uniq4=(correct,pool)=>{
  const out=[String(correct)];
  for(const value of shuffle(pool)) {
    const s=String(value);
    if(!out.includes(s))out.push(s);
    if(out.length===4)break;
  }
  assert.equal(out.length,4,'Distractors no diferenciats');
  return shuffle(out);
};
const ctx={
  Math,shuffle,fmtNum,answerUnit,uniq4,
  unitAlternatives:(x,u,max)=>[answerUnit(x,u,max)],
  pctStr:x=>fmtNum(x,2)+'%',
  roundTo:(x,d)=>Math.round((x+Number.EPSILON)*10**d)/10**d,
  countAnswer:(n,s,p)=>String(n)+' '+(n===1?s:(p||s+'s'))
};
vm.createContext(ctx);
vm.runInContext(html.slice(start,end),ctx);

const number=s=>Number(String(s).replace(/\./g,'').replace(',','.'));
const bolds=q=>[...q.question.matchAll(/<b>(.*?)<\/b>/g)].map(x=>x[1]);
function check(q,val,unit,label){
  assert.equal(q.correct,answerUnit(val,unit),label+': oracle de càlcul');
  assert(q.options.includes(q.correct),label+': resposta absent');
  assert.equal(q.options.length,4,label+': quatre alternatives');
  assert.equal(new Set(q.options).size,4,label+': alternatives úniques');
  assert(q.guide.length>=2,label+': guia insuficient');
}
const outcomes={estimacio:new Set(),problemes:new Set()};
let count=0;

for(iteration=0;iteration<8;iteration++){
  // Conversió de superfícies: canvia la unitat final, no el factor dimensional.
  const u=ctx.genUnitats2ESO(11);
  const p=ctx.genProblemesMesura2ESO(18);
  const uInput=bolds(u),pInput=bolds(p);
  assert(uInput[0].endsWith(' m²'));
  assert(pInput[0].endsWith(' m²'));
  check(u,number(uInput[0].split(' ')[0])*100,'dm²','unitats:11');
  check(p,number(pInput[0].split(' ')[0])*10000,'cm²','problemes:18');
  count+=2;

  // Escala de mapa 1:n: cm del mapa × n, i cm reals → km.
  const e=ctx.genEscales2ESO(2), m=ctx.genProblemesMesura2ESO(8);
  for(const [q,label] of [[e,'escales:2'],[m,'problemes:8']]){
    const b=bolds(q);
    const n=number(b[0].replace(/^1:/,''));
    const cm=number(b[1].split(' ')[0]);
    check(q,cm*n/100000,'km',label);
    count++;
  }

  // Ombres: altura de la persona × ombra objectiu / ombra de la persona.
  const sh=ctx.genEscales2ESO(8), ph=ctx.genProblemesMesura2ESO(10);
  for(const [q,label] of [[sh,'escales:8'],[ph,'problemes:10']]){
    const b=bolds(q);
    assert.equal(b.length,3,label+': tres dades');
    const [height,shadow,target]=b.map(s=>number(s.split(' ')[0]));
    check(q,height*target/shadow,'m',label);
    count++;
  }

  // Precisió relativa: el problema 16 comparteix una referència; estimació 9, dues.
  const er=ctx.genEstimacioError2ESO(9), pr=ctx.genProblemesMesura2ESO(16);
  const eNums=bolds(er).map(number),pNums=bolds(pr).map(number);
  assert.equal(eNums.length,4);
  assert.equal(pNums.length,3);
  const eA=Math.abs(eNums[1]-eNums[0])/eNums[0];
  const eB=Math.abs(eNums[3]-eNums[2])/eNums[2];
  const pA=Math.abs(pNums[1]-pNums[0])/pNums[0];
  const pB=Math.abs(pNums[2]-pNums[0])/pNums[0];
  assert.equal(er.correct,eA<eB?'La mesura A':'La mesura B');
  assert.equal(pr.correct,pA<pB?'Mesura A':'Mesura B');
  for(const [q,label] of [[er,'estimacio:9'],[pr,'problemes:16']]){
    assert(q.options.includes(q.correct),label+': correcta absent');
    assert.equal(new Set(q.options).size,4,label+': quatre respostes úniques');
  }
  outcomes.estimacio.add(er.correct);outcomes.problemes.add(pr.correct);
  count+=2;
}
assert.equal(outcomes.estimacio.size,2,'Estimació:9 ha de permetre guanyar A/B');
assert.equal(outcomes.problemes.size,2,'Problemes:16 ha de permetre guanyar A/B');
assert.equal(count,64);
console.log('OK: '+count+' exercicis reals en 4 parelles transversals; opcions i oracles matemàtics verificats');
