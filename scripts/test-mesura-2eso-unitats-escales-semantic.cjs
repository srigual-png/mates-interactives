#!/usr/bin/env node
'use strict';
// Oracles semàntics independents per als tipus no numèrics d'Unitats i Escales (2n ESO).
// No equival a validació pedagògica ni a proves UI.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const html=fs.readFileSync(path.join(__dirname,'..','2eso','sentit-mesura.html'),'utf8');
const a=html.indexOf('/* ── GENERADOR · BLOC 1:'), b=html.indexOf('/* ── AMPLIACIÓ A',a);
assert(a>=0&&b>a,'No es troba el bloc de generadors reals');
let shift=0;
const shuffle=xs=>{const k=shift%xs.length;return [...xs.slice(k),...xs.slice(0,k)];};
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

const expectedUnit={
  'la longitud d’un llapis':'cm',
  'la superfície d’una aula':'m²',
  'el volum d’una capsa':'dm³',
  'la capacitat d’una ampolla':'mL',
  'la massa d’una motxilla':'kg',
  'la superfície d’una ciutat':'km²'
};
const values=v=>{const match=String(v).match(/^([\d.,]+)\s*([^\s=]+)$/);assert(match,'Expressió no reconeguda: '+v);return {n:num(match[1]),u:match[2]};};
const equivalence=text=>{
  const m=String(text).match(/^([\d.,]+)\s*([^\s=]+)\s*=\s*([\d.,]+)\s*([^\s=]+)$/);
  assert(m,'Equivalència mal formada: '+text);
  const [left,right]=[{n:num(m[1]),u:m[2]},{n:num(m[3]),u:m[4]}];
  const f=x=>volumeL[x.u]??(x.u.endsWith('²')?factor(x.u,lengths,2):x.u.endsWith('³')?factor(x.u,lengths,3):capacity[x.u]);
  const x=f(left),y=f(right);
  assert(Number.isFinite(x)&&Number.isFinite(y),'Unitats no reconegudes: '+text);
  return Math.abs(left.n*x-right.n*y)<Math.max(1e-8,Math.abs(left.n*x)*1e-9);
};
const diagnosticUnit=q=>{
  if(q.question.includes('5 m²'))return 'Ha oblidat que és una superfície';
  if(q.question.includes('2 m³'))return 'Ha aplicat el factor d’una longitud';
  if(q.question.includes('3 L'))return 'No ha utilitzat la relació volum-capacitat';
  throw Error('Diagnòstic d’unitats desconegut: '+q.question);
};
const diagnosticScale=q=>{
  if(q.question.includes('1:100'))return 'És correcte';
  if(q.question.includes('1:50'))return 'Ha aplicat un factor lineal a una àrea';
  if(q.question.includes('4 cm del dibuix'))return 'Ha comparat mesures amb unitats diferents';
  throw Error('Diagnòstic d’escales desconegut: '+q.question);
};
const variants={};
let checked=0;
for(let iteration=0;iteration<12;iteration++){
  shift=iteration;
  for(const t of [7,8,13,14,16,17]){
    const q=ctx.genUnitats2ESO(t),v=bold(q),label='unitats:'+t;
    assert.equal(q.topicId,'unitats',label);
    assert.equal(q.options.length,4,label);
    assert.equal(new Set(q.options).size,4,label+': distractors duplicats');
    assert(q.options.includes(q.correct),label+': resposta absent');
    assert(Array.isArray(q.guide)&&q.guide.length>=2,label+': guia');
    assert(Array.isArray(q.solution)&&q.solution.length>=1,label+': solució');
    let expected;
    if(t===7){expected=expectedUnit[v[0]];assert(expected,label+': context desconegut');}
    if(t===8){
      const pow=v[0].includes('²')?2:3;
      const actual=factor(v[0],lengths,pow)/factor(v[1],lengths,pow);
      expected=(actual>=1?'× ':'÷ ')+Math.round(actual>=1?actual:1/actual).toLocaleString('de-DE');
    }
    if(t===13){expected=equivalence(v[0])?'Correcte':'Incorrecte: ha aplicat el factor de longitud';}
    if(t===14){const match=v[0].match(/^([\d.,]+)\s*([^\s]+)\s*=\s*\?\s*([^\s]+)$/);assert(match,label+': conversió');
      const pow=match[2].includes('²')?2:3;
      const result=num(match[1])*factor(match[2],lengths,pow)/factor(match[3],lengths,pow);
      expected=result.toLocaleString('de-DE')+' '+match[3];
    }
    if(t===16){const valid=q.options.filter(equivalence);assert.equal(valid.length,1,label+': una única equivalència vàlida');expected=valid[0];}
    if(t===17){expected=diagnosticUnit(q);}
    assert.equal(q.correct,expected,label+': oracle semàntic');
    (variants[label]??=new Set()).add(v[0]??q.question);
    checked++;
  }
  for(const t of [13,14]){
    const q=ctx.genEscales2ESO(t),v=bold(q),label='escales:'+t;
    assert.equal(q.topicId,'escales',label);
    assert.equal(q.options.length,4,label);
    assert.equal(new Set(q.options).size,4,label+': distractors duplicats');
    assert(q.options.includes(q.correct),label+': resposta absent');
    assert(Array.isArray(q.guide)&&q.guide.length>=2,label+': guia');
    assert(Array.isArray(q.solution)&&q.solution.length>=1,label+': solució');
    let expected;
    if(t===13){
      const m=v.join(' ').match(/([\d.,]+)\s*↔\s*([\d.,]+).*?([\d.,]+)\s*↔\s*([\d.,]+)/);
      assert(m,label+': correspondència');
      const [a,A,b,B]=m.slice(1).map(num);
      expected=a+'/'+A+' = '+b+'/'+B;
      assert(Math.abs(a/A-b/B)<1e-9,label+': triangles semblants');
    }
    if(t===14)expected=diagnosticScale(q);
    assert.equal(q.correct,expected,label+': oracle semàntic');
    (variants[label]??=new Set()).add(v[0]??q.question);
    checked++;
  }
}
assert.equal(checked,96);
for(const [id,set] of Object.entries(variants))assert(set.size>=2,id+': varietat insuficient '+set.size);
console.log('OK: '+checked+' instàncies semàntiques reals en 8 tipus (6 Unitats i 2 Escales), amb comprovació de resposta, distractors, guies i varietat.');
