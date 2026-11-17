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

// Cobertura complementària: comparacions de precisió, mig pas i diagnòstic d'error.
const winningRelative=new Set(),winningAbsolute=new Set();
for(turn=0;turn<8;turn++){
  for(const type of [9,10,17,18]){
    const q=ctx.genEstimacioError2ESO(type),b=bold(q),label='estimacio:'+type+' iter='+turn;
    let expected;
    switch(type){
      case 9:{
        assert.equal(b.length,4,label+' quatre magnituds');
        const [ra,aa,rb,ab]=b.map(value);
        const ea=Math.abs(aa-ra)/ra,eb=Math.abs(ab-rb)/rb;
        assert.notEqual(ea,eb,label+' errors iguals no previstos');
        expected=ea<eb?'La mesura A':'La mesura B';
        winningRelative.add(expected);
        break;
      }
      case 10:{
        assert.equal(b.length,1,label+' una precisió');
        const tolerance={'a la unitat':'0,5','a la dècima':'0,05','a la centèsima':'0,005'};
        expected=tolerance[b[0]];
        assert(expected,label+' precisió desconeguda '+b[0]);
        break;
      }
      case 17:{
        assert.equal(b.length,3,label+' tres valors');
        const [ref,a,c]=b.map(value);
        const ea=Math.abs(a-ref),eb=Math.abs(c-ref);
        assert.notEqual(ea,eb,label+' empat no previst');
        expected=ea<eb?'L’aproximació A':'L’aproximació B';
        winningAbsolute.add(expected);
        break;
      }
      case 18:{
        assert.equal(b.length,3,label+' dades i operació');
        const reference=value(b[0]),approximation=value(b[1]);
        assert.equal(b[2].replace(/\s/g,''),reference+'+'+approximation+'='+(reference+approximation),label+' suma indicada');
        expected='Ha sumat els valors en lloc de calcular-ne la diferència absoluta';
        break;
      }
    }
    verify(q,expected,label);
    count++;
  }
}
assert.equal(winningRelative.size,2,'estimacio:9 ha de poder seleccionar A i B');
assert.equal(winningAbsolute.size,2,'estimacio:17 ha de poder seleccionar A i B');
assert.equal(count,96);
console.log('OK: 96 exercicis reals de precisio i error amb oracles independents per 12 tipus');
