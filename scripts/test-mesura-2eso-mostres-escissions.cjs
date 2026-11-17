#!/usr/bin/env node
'use strict';
// Mostres reals dels generadors per contrastar els clústers; no prova identitat de famílies.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.join(__dirname,'..');
const overlay=JSON.parse(fs.readFileSync(path.join(root,'docs/auditoria/MI_2ESO_mesura_escissions_prioritaries.json'),'utf8'));
const html=fs.readFileSync(path.join(root,'2eso/sentit-mesura.html'),'utf8');
const start=html.indexOf('/* ── UTILITATS DE MESURA');
const stop=html.indexOf('/* ── AMPLIACIÓ A',start);
assert(start>=0&&stop>start,'Generadors de Mesura no trobats');
let turn=0,sequence=0;
const shuffle=a=>{const k=(turn+sequence++)%a.length;return [...a.slice(k),...a.slice(0,k)];};
const fmtNum=(x,max=4)=>Number(x).toFixed(max).replace(/0+$/,'').replace(/\.$/,'').replace('.',',');
const answerUnit=(x,u,max=6)=>fmtNum(x,max)+' '+u;
const roundTo=(x,p)=>Math.round((x+Number.EPSILON)*10**p)/10**p;
const uniq4=(correct,pool)=>{const a=[String(correct)];for(const w of shuffle(pool)){if(!a.includes(String(w)))a.push(String(w));if(a.length===4)break;}assert.equal(a.length,4);return shuffle(a)};
const ctx={Math,shuffle,fmtNum,answerUnit,roundTo,uniq4,
  unitAlternatives:(x,u,max)=>[answerUnit(x,u,max)],
  pctStr:x=>fmtNum(x,2)+'%',
  countAnswer:(n,s,p)=>n+' '+(n===1?s:(p||s+'s')),
  rnd:(min,max)=>min+(turn+sequence++)%(max-min+1)};
vm.createContext(ctx);vm.runInContext(html.slice(start,stop),ctx);
const generators={escales:ctx.genEscales2ESO,pitagores:ctx.genPitagores2ESO,problemes:ctx.genProblemesMesura2ESO};
for(const [topic,gen] of Object.entries(generators))assert.equal(typeof gen,'function','Falta generador '+topic);
let n=0;
for(const split of overlay.splits){
 for(const part of split.parts){
  for(const member of part.members){
   const [topic,type]=member.split(':');const gen=generators[topic];assert(gen,'Tema no reconegut: '+member);
   for(turn=0;turn<2;turn++){
    const ex=gen(Number(type));
    assert.equal(ex.topicId,topic,member+' tema');
    assert.equal(ex.type,Number(type),member+' tipus');
    assert(typeof ex.question==='string'&&ex.question.length>30,member+' enunciat');
    assert(typeof ex.correct==='string'&&ex.correct.length>0,member+' resposta');
    assert(Array.isArray(ex.options)&&ex.options.length===4,member+' 4 opcions');
    assert.equal(new Set(ex.options).size,4,member+' distractors únics');
    assert(ex.options.includes(ex.correct),member+' resposta present');
    assert(ex.guide.length>=2&&ex.solution.length>=1,member+' passos explicatius');
    if(turn===0)console.log(part.id+' '+member+': '+ex.question.replace(/<[^>]+>/g,'').slice(0,120)+' | '+ex.correct);
    n++;
   }
  }
 }
}
assert.equal(overlay.splits.length,6);
assert.equal(n,54);
console.log('OK: '+n+' instàncies reals, 14 subgrups i 6 clústers revisats. Qualitat curricular pendent.');
