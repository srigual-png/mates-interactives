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
// Tipus pendents: suma de figures, fórmula inversa de trapezi, apotema, pintura i diagnòstic.
// El 17 (corona circular) ja queda cobert per l'oracle transversal existent.
for(turn=0;turn<8;turn++){
  for(const type of [10,13,15,16,18]){
    const q=ctx.genPerimetresArees2ESO(type),b=bold(q);
    let expected,unit='cm²';
    if(type===10){
      const [W,H]=b[0].split('×').map(num);
      assert.equal(b.length,2,'10: rectangle i constant pi');
      expected=roundTo(W*H+3.14*(H/2)**2/2,2);
    } else if(type===13){
      assert.equal(b.length,3,'13: àrea i dues bases');
      expected=2*num(b[0])/(num(b[1])+num(b[2]));
      unit='cm';
    } else if(type===15){
      assert.equal(b.length,2,'15: costats i apotema');
      const dimensions=[...b[0].matchAll(/[0-9]+(?:[.,][0-9]+)?/g)].map(m=>num(m[0]));
      assert.equal(dimensions.length,2,'15: n i costat');
      expected=roundTo(dimensions[0]*dimensions[1]*num(b[1])/2,2);
    } else if(type===16){
      assert.equal(b.length,3,'16: paret, porta i finestra');
      const [W,H]=b[0].split('×').map(num);
      const [dw,dh]=b[1].split('×').map(num);
      const [ww,wh]=b[2].split('×').map(num);
      expected=roundTo(W*H-dw*dh-ww*wh,2);
      unit='m²';
    } else {
      assert.equal(b.length,2,'18: radi i operació errònia');
      const radius=num(b[0]), expression=b[1].replace(/\s/g,'');
      assert(expression.startsWith('2·3,14·'+radius+'='),'18: fórmula de longitud indicada');
      const shown=num(expression.split('=')[1]);
      assert.equal(shown,roundTo(2*3.14*radius,2),'18: resultat de longitud');
      assert.equal(q.correct,'Ha calculat la longitud de la circumferència en lloc de l’àrea');
      assert.equal(q.options.length,4);
      assert.equal(new Set(q.options).size,4);
      assert(q.options.includes(q.correct));
      assert(q.guide.length>=2&&q.solution.length>=2);
      checked++;
      continue;
    }
    check(q,expected,unit,type);
    checked++;
  }
}
assert.equal(checked,136);
console.log('OK: 136 exercicis de perímetres i àrees amb oracles per 17 tipus; el tipus 17 es comprova en suite transversal');
