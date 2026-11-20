#!/usr/bin/env node
'use strict';
// Mostreig real dels 16 tipus de Pitàgores. Oracles derivats de l'enunciat.
// La suite no determina els nivells pedagògics ni garanteix totes les variants.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const html=fs.readFileSync(path.join(__dirname,'..','2eso','sentit-mesura.html'),'utf8');
const start=html.indexOf('/* ── GENERADOR · BLOC 1:');
const end=html.indexOf('/* ── AMPLIACIÓ A',start);
assert(start>=0&&end>start,'Generadors reals no localitzats');
let turn=0;
const shuffle=a=>{const k=turn%a.length;return [...a.slice(k),...a.slice(0,k)];};
const fmtNum=(x,max=4)=>Number(x).toFixed(max).replace(/0+$/,'').replace(/\.$/,'').replace('.',',');
const answerUnit=(x,u,max=6)=>fmtNum(x,max)+' '+u;
const roundTo=(x,p)=>Math.round((x+Number.EPSILON)*10**p)/10**p;
const uniq4=(correct,pool)=>{const o=[String(correct)];for(const x of shuffle(pool)){if(!o.includes(String(x)))o.push(String(x));if(o.length===4)break;}assert.equal(o.length,4,'Quatre opcions diferents requerides');return shuffle(o);};
const ctx={Math,shuffle,fmtNum,answerUnit,roundTo,uniq4,
  unitAlternatives:(x,u,max)=>[answerUnit(x,u,max)],
  pctStr:x=>fmtNum(x,2)+'%',countAnswer:(n,s,p)=>n+' '+(n===1?s:(p||s+'s'))};
vm.createContext(ctx);vm.runInContext(html.slice(start,end),ctx);
function number(s){const m=String(s).match(/-?\d[\d.,]*/);assert(m,'Número absent: '+s);return Number(m[0].replace(/\./g,'').replace(',','.'));}
const bold=q=>[...q.question.matchAll(/<b>(.*?)<\/b>/g)].map(x=>x[1]);
function check(q,expected,label){
  assert.equal(q.topicId,'pitagores',label+' tema');
  assert.equal(q.correct,expected,label+' oracle');
  assert.equal(q.options.length,4,label+' 4 opcions');
  assert.equal(new Set(q.options).size,4,label+' opcions úniques');
  assert(q.options.includes(q.correct),label+' correcta present');
  assert(q.guide.length>=2&&q.solution.length>=2,label+' guia i solució');
}
let count=0;
for(turn=0;turn<8;turn++){
  for(let type=1;type<=16;type++){
    const q=ctx.genPitagores2ESO(type),b=bold(q),label='pitagores:'+type+' selecció '+turn;
    let expected,unit='cm';
    switch(type){
      case 1:{
        assert.equal(b.length,1,label);
        expected=b[0];break;
      }
      case 2: case 6: case 8: case 13:{
        if(type===6||type===8)unit='m';
        assert.equal(b.length,2,label);
        expected=answerUnit(Math.hypot(number(b[0]),number(b[1])),unit);break;
      }
      case 3:{
        assert.equal(b.length,2);
        expected=answerUnit(Math.sqrt(number(b[0])**2-number(b[1])**2),'cm');break;
      }
      case 4:{
        assert.equal(b.length,1);
        const dims=b[0].split('×').map(number);
        assert.equal(dims.length,2);
        expected=answerUnit(Math.hypot(...dims),'m');break;
      }
      case 5:{
        assert.equal(b.length,1);
        expected=answerUnit(roundTo(number(b[0])*Math.sqrt(2),2),'cm',2);break;
      }
      case 7:{
        assert.equal(b.length,2);
        expected=answerUnit(Math.hypot(number(b[0]),number(b[1])),'m');break;
      }
      case 9:{
        assert.equal(b.length,3);
        const nums=b.map(number);
        expected=nums[0]**2+nums[1]**2===nums[2]**2?'Sí, és rectangle':'No, no és rectangle';
        break;
      }
      case 10:{
        assert.equal(b.length,2);
        const base=number(b[0]),side=number(b[1]);
        expected=answerUnit(base*Math.sqrt(side**2-(base/2)**2)/2,'cm²');break;
      }
      case 11:{
        assert.equal(b.length,2);
        const diag=number(b[0]),side=number(b[1]);
        expected=answerUnit(2*(side+Math.sqrt(diag**2-side**2)),'cm');break;
      }
      case 12:{
        assert.equal(b.length,2);
        const a=number(b[0]),c=number(b[1]);
        expected=answerUnit(a+c-Math.hypot(a,c),'m');break;
      }
      case 14:{
        assert.equal(b.length,3);
        const [a,c,extra]=b.map(number);
        expected=answerUnit(Math.hypot(a,c)+extra,'m');break;
      }
      case 15:{
        if(b.length===1){
          const dims=b[0].split('×').map(number);
          assert.equal(dims.length,2);
          expected=answerUnit(Math.hypot(...dims),'cm');
          assert.equal(q.difficultyVariant,'diagonal');
        }else{
          assert.equal(b.length,2);
          expected=answerUnit(Math.sqrt(number(b[0])**2-number(b[1])**2),'cm');
          assert.equal(q.difficultyVariant,undefined);
        }
        break;
      }
      case 16:{
        assert.equal(b.length,2);
        const a=number(b[0]),c=number(b[1]);
        assert(q.question.includes(a+'+'+c+'='+(a+c)),'Enunciat d'+'error coherent');
        expected='Ha sumat les longituds en lloc d’aplicar Pitàgores';
        break;
      }
    }
    check(q,expected,label);
    count++;
  }
}
assert.equal(count,128);
console.log('OK: 128 exercicis reals de Pitàgores; 16 tipus coberts amb oracles independents');
