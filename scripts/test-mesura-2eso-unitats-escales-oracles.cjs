#!/usr/bin/env node
'use strict';
// Oracles matemàtics independents per als tipus numèrics d'Unitats i Escales (2n ESO).
// No equival a validació pedagògica ni a proves UI.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const html=fs.readFileSync(path.join(__dirname,'..','2eso','sentit-mesura.html'),'utf8');
const a=html.indexOf('/* ── GENERADOR · BLOC 1:'), b=html.indexOf('/* ── AMPLIACIÓ A',a);
assert(a>=0&&b>a,'No es troba el bloc de generadors reals');
let shift=0;
const shuffle=xs=>{const k=(shift++)%xs.length;return [...xs.slice(k),...xs.slice(0,k)];};
const fmtNum=(n,max=4)=>Number(n).toFixed(max).replace(/0+$/,'').replace(/\.$/,'').replace('.',',');
const answerUnit=(n,u,max=6)=>fmtNum(n,max)+' '+u;
const uniq4=(correct,wrong)=>{const out=[String(correct)];for(const v of wrong){if(!out.includes(String(v)))out.push(String(v));if(out.length===4)break;}assert.equal(out.length,4,'Distractors insuficients');return shuffle(out);};
const ctx={Math,shuffle,fmtNum,answerUnit,uniq4,rnd:(min,max)=>min+(shift++%(max-min+1)),unitAlternatives:(v,u)=>[answerUnit(v,u)],roundTo:(n,d)=>Math.round((n+Number.EPSILON)*10**d)/10**d,pctStr:n=>fmtNum(n,2)+'%',countAnswer:(n,s,p)=>String(n)+' '+(n===1?s:(p||s+'s'))};
const u=html.indexOf('/* ── UTILITATS DE MESURA');assert(u>=0&&u<a,'No es localitzen les utilitats');
vm.createContext(ctx);vm.runInContext(html.slice(u,b),ctx);
const num=v=>Number(String(v).replace(/\./g,'').replace(',','.'));
const bold=q=>[...q.question.matchAll(/<b>(.*?)<\/b>/g)].map(x=>x[1]);
const quantity=v=>{const m=String(v).match(/^([\d.,]+)\s*(.*)$/);assert(m,'Quantitat desconeguda: '+v);return {n:num(m[1]),u:m[2].trim()};};
const lengths={km:1000,hm:100,dam:10,m:1,dm:.1,cm:.01,mm:.001};
const capacity={kL:1000,hL:100,daL:10,L:1,dL:.1,cL:.01,mL:.001};
const mass={t:1000,kg:1,hg:.1,dag:.01,g:.001,dg:.0001,cg:.00001,mg:.000001};
const volumeL={'m³':1000,'dm³':1,'cm³':.001,'mm³':.000001,L:1,mL:.001};
const near=(actual,expected,label)=>assert(Math.abs(actual-expected)<=Math.max(0.00011,Math.abs(expected)*1e-8),label+': '+actual+' ≠ '+expected);
const verify=(q,expected,unit,label)=>{
  assert.equal(q.topicId,label.split(':')[0],label+': tema');
  assert.equal(q.options.length,4,label+': quatre opcions');
  assert.equal(new Set(q.options).size,4,label+': distractors únics');
  assert(q.options.includes(q.correct),label+': falta la resposta');
  assert(Array.isArray(q.guide)&&q.guide.length>=2,label+': guia');
  assert(Array.isArray(q.solution)&&q.solution.length>=1,label+': solució');
  const actual=quantity(q.correct);
  assert.equal(actual.u,unit,label+': unitat');
  near(actual.n,expected,label);
};
const take=(b,i)=>quantity(b[i]);
const factor=(unit,map,power=1)=>{
  const base=unit.replace(/[²³]/g,'');
  assert(Object.hasOwn(map,base),'Unitat inesperada: '+unit);
  return map[base]**power;
};
const scaleN=t=>num(String(t).replace(/^1:/,''));
const tested={unitats:new Set(),escales:new Set()};let checked=0;
for(let iteration=0;iteration<8;iteration++){
  for(const t of [1,2,3,4,5,6,9,10,11,12,15,18]){
    const q=ctx.genUnitats2ESO(t),v=bold(q),label='unitats:'+t;
    let expected,unit;
    if(t>=1&&t<=5){
      const f=take(v,0),to=v[1],power=t===2?2:t===3?3:1;
      const map=t===4?capacity:t===5?mass:lengths;
      expected=f.n*factor(f.u,map,power)/factor(to,map,power);unit=to;
    } else if(t===6){
      const f=take(v,0);unit=v[1];expected=f.n*volumeL[f.u]/volumeL[unit];
      assert(Number.isFinite(expected),label+': equivalència');
    } else if(t===9){
      const first=take(v,0),second=take(v,1);
      assert.equal(q.correct,first.n>second.n/100?'La primera és més gran':'La segona és més gran',label);
      assert.equal(new Set(q.options).size,4,label);checked++;tested.unitats.add(t);continue;
    } else if(t===10){expected=take(v,0).n*100+take(v,1).n;unit='cm';}
    else if(t===11){expected=take(v,0).n*100;unit='dm²';}
    else if(t===12){expected=take(v,0).n;unit='L';}
    else if(t===15){expected=take(v,0).n*100+take(v,1).n/100;unit='dm²';}
    else if(t===18){expected=take(v,0).n/1000;unit='dm³';}
    verify(q,expected,unit,label);tested.unitats.add(t);checked++;
  }
  for(const t of [1,2,3,4,5,6,7,8,9,10,11,12,15,16,17,18]){
    const q=ctx.genEscales2ESO(t),v=bold(q),label='escales:'+t;
    let expected,unit;
    if(t===1||t===2){expected=take(v,1).n*scaleN(v[0])/(t===1?100:100000);unit=t===1?'m':'km';}
    if(t===3){expected=take(v,0).n*100/scaleN(v[1]);unit='cm';}
    if(t===4){expected=take(v,1).n*100/take(v,0).n;unit='scale';}
    if(t===5){expected=take(v,0).n*num(v[1].split(':')[0]);unit='cm';}
    if(t===6){const m=v[0].match(/([\d.,]+) cm × ([\d.,]+) cm/);assert(m,label);expected=num(m[1])*num(m[2])*(scaleN(v[1])/100)**2;unit='m²';}
    if(t===7){const m=v[0].match(/([\d.,]+) m × ([\d.,]+) m/);assert(m,label);expected=num(m[1])*num(m[2]);unit='cm²';}
    if(t===8||t===9){expected=take(v,0).n*take(v,2).n/take(v,1).n;unit='m';}
    if(t===10){expected=num(v[1])*num(v[2])/num(v[0]);unit='';}
    if(t===11){const m=v[0].match(/([\d.,]+)\/([\d.,]+) = ([\d.,]+)\/x/);assert(m,label);expected=num(m[2])*num(m[3])/num(m[1]);unit='';}
    if(t===12){expected=take(v,1).n/take(v,0).n;unit='';}
    if(t===15){expected=take(v,0).n*100/take(v,1).n;unit='scale';}
    if(t===16){const m=v[0].match(/([\d.,]+) cm × ([\d.,]+) cm/);assert(m,label);expected=2*(num(m[1])+num(m[2]))*scaleN(v[1])/100;unit='m';}
    if(t===17){expected=(take(v,1).n+take(v,2).n)*scaleN(v[0])/100000;unit='km';}
    if(t===18){expected=take(v,1).n*take(v,2).n/take(v,0).n;unit='m';}
    if(unit==='scale'){
      const match=q.correct.match(/^1\s*:\s*([\d.,]+)$/);assert(match,label+': format escala');near(num(match[1]),expected,label);
      assert.equal(new Set(q.options).size,4,label);assert(q.options.includes(q.correct),label);
    } else verify(q,expected,unit,label);
    tested.escales.add(t);checked++;
  }
}
assert.equal(tested.unitats.size,12);
assert.equal(tested.escales.size,16);
assert.equal(checked,224);
console.log('OK: '+checked+' instàncies de 28 tipus amb oracles numèrics independents (12 Unitats, 16 Escales).');
console.log('Resten per a validació semàntica: Unitats 7,8,13,14,16,17 i Escales 13,14.');
