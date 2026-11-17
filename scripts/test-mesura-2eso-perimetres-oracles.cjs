#!/usr/bin/env node
'use strict';
// Oracles externs basats en les dades visibles dels exercicis; no valida identitat de famílies.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const html=fs.readFileSync(path.join(__dirname,'..','2eso','sentit-mesura.html'),'utf8');
const start=html.indexOf('/* ── GENERADOR · BLOC 1:');
const end=html.indexOf('/* ── AMPLIACIÓ A',start);
assert(start>=0&&end>start,'No es localitzen els generadors');
let turn=0;
const shuffle=a=>{const k=turn%a.length;return [...a.slice(k),...a.slice(0,k)];};
const fmtNum=(x,max=4)=>Number(x).toFixed(max).replace(/0+$/,'').replace(/\.$/,'').replace('.',',');
const answerUnit=(x,u,max=6)=>fmtNum(x,max)+' '+u;
const roundTo=(x,p)=>Math.round((x+Number.EPSILON)*10**p)/10**p;
const uniq4=(correct,pool)=>{const o=[String(correct)];for(const x of shuffle(pool)){if(!o.includes(String(x)))o.push(String(x));if(o.length===4)break;}assert.equal(o.length,4,'No es poden construir 4 opcions');return shuffle(o);};
const ctx={Math,shuffle,fmtNum,answerUnit,roundTo,uniq4,
  unitAlternatives:(x,u,max)=>[answerUnit(x,u,max)],
  pctStr:x=>fmtNum(x,2)+'%',countAnswer:(n,s,pl)=>n+' '+(n===1?s:(pl||s+'s'))};
vm.createContext(ctx);vm.runInContext(html.slice(start,end),ctx);
function num(s){const m=String(s).match(/-?\d[\d.,]*/);assert(m,'Número absent '+s);return Number(m[0].replace(/\./g,'').replace(',','.'));}
const bold=q=>[...q.question.matchAll(/<b>(.*?)<\/b>/g)].map(x=>x[1]);
function check(q,expected,unit,type){
  const label='perimetres:'+type+' iter='+turn;
  assert.equal(q.topicId,'perimetres',label+' tema');
  assert.equal(q.type,type,label+' tipus');
  assert.equal(q.correct,answerUnit(expected,unit),label+' oracle');
  assert.equal(q.options.length,4,label+' 4 opcions');
  assert.equal(new Set(q.options).size,4,label+' opcions úniques');
  assert(q.options.includes(q.correct),label+' resposta present');
  assert(q.guide.length>=2&&q.solution.length>=2,label+' guia i solució');
}
const types=[1,2,3,4,5,6,7,8,9,11,12,14];
let checked=0;
for(turn=0;turn<8;turn++){
  for(const type of types){
    const q=ctx.genPerimetresArees2ESO(type),b=bold(q);
    let expected,unit= 'cm²';
    switch(type){
      case 1: expected=num(b[0])*num(b[1]);break;
      case 2: expected=num(b[0])*num(b[1])/2;break;
      case 3: expected=(num(b[0])+num(b[1]))*num(b[2])/2;break;
      case 4: expected=num(b[0])*num(b[1]);unit='cm';break;
      case 5: expected=roundTo(2*3.14*num(b[0]),2);unit='cm';break;
      case 6: expected=roundTo(3.14*num(b[0])**2,2);break;
      case 7: expected=roundTo(3.14*num(b[0])**2/2,2);break;
      case 8: expected=roundTo(3.14*num(b[0])+2*num(b[0]),2);unit='cm';break;
      case 9:{
        assert.equal(b.length,2);
        const outer=b[0].split('×').map(num),cut=b[1].split('×').map(num);
        expected=outer[0]*outer[1]-cut[0]*cut[1];break;
      }
      case 11: expected=num(b[0])**2-num(b[1])**2;break;
      case 12: expected=2*num(b[0])/num(b[1]);unit='cm';break;
      case 14: expected=num(b[0])/(2*3.14);unit='cm';break;
    }
    check(q,expected,unit,type);
    checked++;
  }
}
assert.equal(checked,96);
console.log('OK: 96 exercicis de perímetres i àrees amb oracles de 12 tipus');
