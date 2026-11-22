#!/usr/bin/env node
'use strict';
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const h=fs.readFileSync(path.join(__dirname,'..','2eso','sentit-mesura.html'),'utf8');
const start=h.indexOf('/* ── UTILS NUMÈRIQUES'),mark=h.indexOf("return {topicId:'problemes',type,course:'2n'",start),end=h.indexOf('\n}',mark)+2;
assert(start>=0&&mark>start&&end>mark);
let seed=0x94ac7811,randomCalls=0;
const math=Object.create(Math);math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;if(++randomCalls>900000)throw Error('RNG budget exceeded');return seed/0x100000000};
const ctx=vm.createContext({Math:math,console});vm.runInContext(h.slice(start,end),ctx,{timeout:15000});
const gen=vm.runInContext('({unitats:genUnitats2ESO,estimacio:genEstimacioError2ESO,problemes:genProblemesMesura2ESO})',ctx);
const plain=x=>String(x).replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim();
const value=x=>{const s=String(x).trim().replace(/(?<=\d)\.(?=\d{3}(?:\D|$))/g,'').replace(',','.').replace(/[.,]$/,'');const n=Number(s);if(!Number.isFinite(n))throw Error('Invalid numeric '+x);return n};
const match=(q,re)=>{const m=q.match(re);if(!m)throw Error('Unparsed question: '+q);return m.slice(1)};
const unit={mm:.001,cm:.01,dm:.1,m:1,km:1000,'cm²':.0001,'dm²':.01,'m²':1,'km²':1e6,'cm³':1e-6,'dm³':.001,'m³':1,'mL':1e-6,'L':.001,'kg':1};
function convert(a,from,to){assert(from in unit&&to in unit,'Unknown unit');return a*unit[from]/unit[to]}
function expressionIsTrue(str){
 const a=match(str,/^([\d,.]+) (\S+) = ([\d,.]+) (\S+)$/);
 return Math.abs(convert(value(a[0]),a[1],a[3])-value(a[2]))<1e-8*Math.max(value(a[2]),1);
}
function selectionCorrect(key,q,ex){
 if(key==='unitats:7'){
  const map=[['longitud d’un llapis','cm'],['superfície d’una aula','m²'],['volum d’una capsa','dm³'],['capacitat d’una ampolla','mL'],['massa d’una motxilla','kg'],['superfície d’una ciutat','km²']];
  const found=map.filter(([k])=>q.includes(k));assert.equal(found.length,1);return found[0][1];
 }
 if(key==='unitats:8'){
  const [from,to]=match(q,/passar de (\S+) a (\S+)\?/);
  const k=convert(1,from,to);return (k>=1?'× ':'÷ ')+Math.round(k>=1?k:1/k).toLocaleString('ca-ES');
 }
 if(key==='unitats:13'){
  const statement=match(q,/Un alumne escriu: (.+)\. Valora la conversió\./)[0];
  return expressionIsTrue(statement)?'Correcte':'Incorrecte: ha aplicat el factor de longitud';
 }
 if(key==='unitats:16'){
  const valid=ex.options.filter(expressionIsTrue);if(valid.length!==1)throw Error('Not exactly one true equality: '+valid.join('|'));return valid[0];
 }
 if(key==='unitats:17'){
  if(q.includes('convertir 5 m² a cm²'))return 'Ha oblidat que és una superfície';
  if(q.includes('convertir 2 m³ a dm³'))return 'Ha aplicat el factor d’una longitud';
  if(q.includes('convertir 3 L a cm³'))return 'No ha utilitzat la relació volum-capacitat';
  throw Error('Unknown error-diagnosis statement');
 }
 if(key==='estimacio:1'||key==='estimacio:2'||key==='estimacio:3'||key==='estimacio:4'){
  const cases={
   'alçada d’una porta':'2 m','gruix d’un telèfon mòbil':'8 mm','llargada d’una aula':'8 m','amplada d’un full A4':'21 cm',
   'superfície d’una aula':'50 m²','superfície d’una taula':'1 m²','superfície d’un camp de futbol':'7.000 m²','superfície d’una pantalla de mòbil':'100 cm²',
   'una ampolla d’aigua individual':'500 mL','una galleda domèstica':'10 L','una piscina familiar':'40 m³','una tassa':'250 mL',
   'mesurar el gruix d’una moneda':'un peu de rei','mesurar la llargada d’una habitació':'una cinta mètrica','mesurar 75 mL d’aigua':'una proveta graduada','mesurar el diàmetre d’un cargol petit':'un peu de rei'
  };
  const found=Object.entries(cases).filter(([k])=>q.includes(k));if(found.length!==1)throw Error('Unmatched or ambiguous real-world context '+q);return found[0][1];
 }
 if(key==='estimacio:14'){
  const format=x=>Number(x).toFixed(2).replace(/0+$/,'').replace(/\.$/,'').replace('.',',');
  if(q.includes('recipient indica')){
   assert.match(q,/recipient indica 1500 mL, però al registre s’ha anotat 1500 L/,'explicit mL-to-L recording case');
   return 'Cal registrar 1,5 L: 1500 mL equivalen a 1,5 L.';
  }
  const m=match(q,/s’esperava un valor de ([\d,.]+) (\S+) i el marge d’error admès és de ±([\d,.]+) (\S+)\. S’ha obtingut ([\d,.]+) (\S+)\. La mesura compleix el marge\?/);
  const [reference,referenceUnit,tolerance,toleranceUnit,reading,readingUnit]=m;
  assert.equal(referenceUnit,toleranceUnit,'reference and tolerance units');
  assert.equal(referenceUnit,readingUnit,'reference and reading units');
  const difference=Math.round(Math.abs(value(reading)-value(reference))*100)/100;
  const limit=value(tolerance),within=difference<=limit;
  return within
   ? `Sí: l’error absolut és ${format(difference)} ${referenceUnit} i no supera el marge de ${format(limit)} ${referenceUnit}.`
   : `No: l’error absolut és ${format(difference)} ${referenceUnit} i supera el marge de ${format(limit)} ${referenceUnit}; cal revisar la lectura o la unitat.`;
 }
 if(key==='problemes:17'){
  if(q.includes('Una aula de 6 m × 8 m'))return '48 m²';
  if(q.includes('Una ampolla d’aigua habitual'))return '1,5 L';
  if(q.includes('La porta d’una aula'))return '2 m';
  if(q.includes('Una piscina familiar de 8 m × 4 m × 1,5 m'))return '48.000 L';
  throw Error('Unknown estimation question');
 }
 throw Error('Unknown qualitative key '+key);
}
function answer(key,q,ex){
 if(key==='problemes:2'){
  const [l,w,t]=match(q,/habitació rectangular de ([\d,.]+) × ([\d,.]+) m.*?rajoles quadrades de ([\d,.]+) cm/).map(value);
  const n=(l*w)/(t/100)**2;
  if(Math.abs(n-Math.round(n))>1e-8)throw Error('Impossible no-cut tile count');
  return {number:Math.round(n),unit:'rajoles'};
 }
 if(key==='problemes:13'){
  const [l,w,hh]=match(q,/sense tapa de ([\d,.]+) × ([\d,.]+) × ([\d,.]+) cm/).map(value);
  return {number:l*w+2*l*hh+2*w*hh,unit:'cm²'};
 }
 if(key==='problemes:15'){
  const [l,w,d]=match(q,/habitació rectangular de ([\d,.]+) × ([\d,.]+) m.*?porta de ([\d,.]+) m/).map(value);
  return {number:2*(l+w)-d,unit:'m'};
 }
 if(key==='problemes:18'){
  const [a]=match(q,/superfície de ([\d,.]+) m² a cm²/).map(value);
  return {number:a*10000,unit:'cm²'};
 }
 if(key==='problemes:20'){
  const [r,v]=match(q,/cilíndric de radi ([\d,.]+) dm conté ([\d,.]+) L/).map(value);
  return {number:v/(3.14*r*r),unit:'dm'};
 }
 return {choice:selectionCorrect(key,q,ex)};
}
const keys=['unitats:7','unitats:8','unitats:13','unitats:16','unitats:17','estimacio:1','estimacio:2','estimacio:3','estimacio:4','estimacio:14','problemes:2','problemes:13','problemes:15','problemes:17','problemes:18','problemes:20'];
const failures=[],counts={},samples=50;
for(const key of keys){
 const [topic,type]=key.split(':');
 for(let i=0;i<samples;i++){
  const ex=gen[topic](Number(type)),q=plain(ex.question);
  try{
   const predicted=answer(key,q,ex);
   if('choice' in predicted){if(ex.correct!==predicted.choice)throw Error('Wrong selected answer '+ex.correct+' expected '+predicted.choice)}
   else{
    const m=String(ex.correct).match(/^([-+\d,.]+)\s+(\S+)$/);if(!m)throw Error('Not numeric answer '+ex.correct);
    if(predicted.unit!=='rajoles'&&m[2]!==predicted.unit)throw Error('Output unit '+m[2]+' expected '+predicted.unit);
    if(predicted.unit==='rajoles'&&m[2]!=='rajoles')throw Error('Expected tiles');
    if(Math.abs(value(m[1])-predicted.number)>Math.max(.00501,Math.abs(predicted.number)*1e-10))throw Error('Wrong number '+m[1]+' expected '+predicted.number);
   }
   if(ex.options.length!==4||new Set(ex.options).size!==4||!ex.options.includes(ex.correct))throw Error('Invalid option bank');
   counts[key]=(counts[key]||0)+1;
  }catch(err){failures.push({key,iteration:i,error:err.message,q,correct:ex.correct})}
 }
}
const result={types:keys.length,examples_checked:Object.values(counts).reduce((a,b)=>a+b,0),failures:failures.length,examples:failures.slice(0,20),random_calls:randomCalls};
console.log(JSON.stringify(result,null,2));
assert.equal(keys.length,16);
assert.equal(result.failures,0);
assert.equal(result.examples_checked,16*samples);
