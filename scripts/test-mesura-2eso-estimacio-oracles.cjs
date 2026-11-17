#!/usr/bin/env node
'use strict';
// Oracles calculats de les dades que veu l'alumne; només mostreig determinista.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const html=fs.readFileSync(path.join(__dirname,'..','2eso','sentit-mesura.html'),'utf8');
const start=html.indexOf('/* ── GENERADOR · BLOC 1:');
const end=html.indexOf('/* ── AMPLIACIÓ A',start);
assert(start>=0&&end>start,'Generadors no localitzats');
let turn=0;
const shuffle=xs=>{const k=turn%xs.length;return [...xs.slice(k),...xs.slice(0,k)];};
const fmtNum=(x,max=4)=>Number(x).toFixed(max).replace(/0+$/,'').replace(/\.$/,'').replace('.',',');
const answerUnit=(x,u,max=6)=>fmtNum(x,max)+' '+u;
const pctStr=x=>fmtNum(x,2)+'%';
const roundTo=(x,d)=>Math.round((x+Number.EPSILON)*10**d)/10**d;
const ctx={Math,shuffle,fmtNum,answerUnit,pctStr,roundTo,
  floorTo:(x,d)=>Math.floor(x*10**d)/10**d,ceilTo:(x,d)=>Math.ceil(x*10**d)/10**d,
  unitAlternatives:(x,u,max)=>[answerUnit(x,u,max)],
  uniq4:(correct,pool)=>{const o=[String(correct)];for(const x of shuffle(pool)){if(!o.includes(String(x)))o.push(String(x));if(o.length===4)break;}assert.equal(o.length,4,'No hi ha 4 opcions');return shuffle(o);},
  countAnswer:(n,s,p)=>n+' '+(n===1?s:(p||s+'s'))};
vm.createContext(ctx);vm.runInContext(html.slice(start,end),ctx);
function value(text){const m=String(text).match(/-?\d[\d.,]*/);assert(m,'Manca número: '+text);return Number(m[0].replace(/\./g,'').replace(',','.'));}
const bold=q=>[...q.question.matchAll(/<b>(.*?)<\/b>/g)].map(m=>m[1]);
function verify(q,expected,label){
  assert.equal(q.correct,expected,label+' resposta');
  assert.equal(q.options.length,4,label+' quatre opcions');
  assert.equal(new Set(q.options).size,4,label+' distractors únics');
  assert(q.options.includes(q.correct),label+' correcta present');
  assert(q.guide.length>=2,label+' guia');
  assert(q.solution.length>=1,label+' solució');
}
let count=0;
for(turn=0;turn<8;turn++){
  for(const type of [5,6,7,8,12,13,15,16]){
    const q=ctx.genEstimacioError2ESO(type),b=bold(q);
    assert.equal(q.topicId,'estimacio');
    let expected;
    switch(type){
      case 5: expected=answerUnit(roundTo(value(b[0]),1),'cm',1);break;
      case 6: expected=answerUnit(Math.abs(value(b[1])-value(b[0])),'cm',2);break;
      case 7: expected=fmtNum(Math.abs(value(b[1])-value(b[0]))/value(b[0]),4);break;
      case 8: expected=pctStr(100*Math.abs(value(b[1])-value(b[0]))/value(b[0]));break;
      case 12:{
        const x=value(b[0]);
        expected='des de '+fmtNum(roundTo(x-0.05,2),2)+' cm (inclòs) fins a '+fmtNum(roundTo(x+0.05,2),2)+' cm (exclòs)';
        break;
      }
      case 13: expected=pctStr(value(b[0])/value(b[1])*100);break;
      case 15:{
        const nums=b[0].split(' cm, ').map(value);
        assert.equal(nums.length,3,'tres lectures');
        expected=answerUnit(roundTo(nums.reduce((a,c)=>a+c,0)/3,2),'cm',2);break;
      }
      case 16: expected=answerUnit(roundTo(value(b[0]),1),'m',1);break;
    }
    verify(q,expected,'estimacio:'+type+' iter='+turn);
    count++;
  }
}
assert.equal(count,64);
console.log('OK: 64 exercicis reals de precisio i error amb oracle independent per 8 tipus');
