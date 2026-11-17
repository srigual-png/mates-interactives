#!/usr/bin/env node
'use strict';

// Oracles independents per a fórmules inverses, capacitat i desenvolupaments de Superfícies.
// Executa els generadors reals, però NO substitueix proves de navegador o revisió pedagògica.
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const html=fs.readFileSync(path.join(__dirname,'..','2eso','sentit-mesura.html'),'utf8');
const start=html.indexOf('/* ── GENERADOR · BLOC 1:');
const end=html.indexOf('/* ── AMPLIACIÓ A',start);
assert(start>=0&&end>start,'Generadors reals no localitzats');
let turn=0;
const shuffle=a=>{const offset=turn%a.length;return [...a.slice(offset),...a.slice(0,offset)];};
const fmtNum=(x,max=4)=>Number(x).toFixed(max).replace(/0+$/,'').replace(/\.$/,'').replace('.',',');
const answerUnit=(x,u,max=6)=>fmtNum(x,max)+' '+u;
const uniq4=(correct,pool)=>{
  const out=[String(correct)];
  for(const value of shuffle(pool)){if(!out.includes(String(value)))out.push(String(value));if(out.length===4)break;}
  assert.equal(out.length,4,'No hi ha quatre alternatives diferents');
  return shuffle(out);
};
const ctx={Math,shuffle,fmtNum,answerUnit,uniq4,
  unitAlternatives:(x,u,p)=>[answerUnit(x,u,p)],
  pctStr:x=>fmtNum(x,2)+'%',
  roundTo:(x,p)=>Math.round((x+Number.EPSILON)*10**p)/10**p,
  countAnswer:(n,s,pl)=>n+' '+(n===1?s:(pl||s+'s'))};
vm.createContext(ctx);
vm.runInContext(html.slice(start,end),ctx);
function num(s){const m=String(s).match(/\d[\d.,]*/);assert(m,'Número absent: '+s);return Number(m[0].replace(/\./g,'').replace(',','.'));}
function bold(q){return [...q.question.matchAll(/<b>(.*?)<\/b>/g)].map(m=>m[1]);}
function check(q,expected,unit,type){
  const label='superficies:'+type+' iteració '+turn;
  assert.equal(q.topicId,'superficies',label+': tema');
  assert.equal(q.type,type,label+': tipus');
  assert.equal(q.correct,answerUnit(expected,unit),label+': oracle');
  assert.equal(q.options.length,4,label+': alternatives');
  assert.equal(new Set(q.options).size,4,label+': duplicats');
  assert(q.options.includes(q.correct),label+': correcta absent');
  assert(q.guide.length>=2&&q.solution.length>=2,label+': guies o solució absents');
}
let checked=0;
for(turn=0;turn<8;turn++){
  let q=ctx.genSuperficiesVolums2ESO(10),b=bold(q);
  assert.equal(b.length,2);
  check(q,num(b[0])/num(b[1]),'cm',10);checked++;
  q=ctx.genSuperficiesVolums2ESO(11);b=bold(q);
  check(q,num(b[0])/num(b[1]),'cm²',11);checked++;
  q=ctx.genSuperficiesVolums2ESO(12);b=bold(q);
  check(q,Math.round(num(b[1])/(3.14*num(b[0])**2)*100)/100,'cm',12);checked++;
  q=ctx.genSuperficiesVolums2ESO(13);b=bold(q);
  assert.equal(b.length,1);
  const meters=b[0].split('×').map(num);
  assert.equal(meters.length,3);
  check(q,meters.reduce((a,c)=>a*c,1)*1000,'L',13);checked++;
  q=ctx.genSuperficiesVolums2ESO(14);b=bold(q);
  assert.equal(b.length,1);
  const decimeters=b[0].split('×').map(num);
  assert.equal(decimeters.length,3);
  check(q,decimeters.reduce((a,c)=>a*c,1),'L',14);checked++;
  q=ctx.genSuperficiesVolums2ESO(15);b=bold(q);
  assert.equal(b.length,2);
  const dimensions=b[0].split('×').map(num);
  check(q,Math.round((num(b[1])/1000/dimensions[0]/dimensions[1])*100)/100,'m',15);checked++;
  q=ctx.genSuperficiesVolums2ESO(19);b=bold(q);
  assert.equal(b.length,3);
  const radius=num(b[1]),height=num(b[2]);
  const length=Math.round(2*3.14*radius*100)/100;
  assert.equal(q.correct,fmtNum(length,2)+' cm × '+height+' cm','superficies:19 desenvolupament');
  assert.equal(new Set(q.options).size,4);assert(q.options.includes(q.correct));checked++;
  q=ctx.genSuperficiesVolums2ESO(20);b=bold(q);
  assert.equal(b.length,1);
  const dims=b[0].split('×').map(num);
  assert.equal(dims.length,3);
  assert.equal(q.correct,'2 cares de '+dims[0]+'×'+dims[1]+', 2 de '+dims[0]+'×'+dims[2]+' i 2 de '+dims[1]+'×'+dims[2]+' cm');
  assert.equal(new Set(q.options).size,4);
  assert(q.options.includes(q.correct));checked++;
}
assert.equal(checked,64);
console.log('OK: 64 exercicis de Superfícies amb oracles inversos, capacitat i desenvolupaments');
