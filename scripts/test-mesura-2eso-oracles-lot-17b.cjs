#!/usr/bin/env node
'use strict';
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync(path.join(__dirname,'..','2eso','sentit-mesura.html'),'utf8');
const beg=html.indexOf('/* ── UTILS NUMÈRIQUES'),last=html.indexOf("return {topicId:'problemes',type,course:'2n'",beg),end=html.indexOf('\n}',last)+2;
assert(beg>=0&&last>beg&&end>last,'Cannot identify source generator boundaries');
let seed=0x2ac5b190,calls=0;const math=Object.create(Math);
math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;if(++calls>600000)throw Error('Excess random draws');return seed/0x100000000};
const ctx=vm.createContext({Math:math,console});vm.runInContext(html.slice(beg,end),ctx,{timeout:15000});
const gens=vm.runInContext('({superficies:genSuperficiesVolums2ESO,unitats:genUnitats2ESO,estimacio:genEstimacioError2ESO,problemes:genProblemesMesura2ESO})',ctx);
const clean=s=>String(s).replace(/<[^>]+>/g,'').replace(/\s+/g,' ');
const num=s=>{const raw=String(s).replace(/[.,]$/,'').replace(/\.(?=\d{3}(?:\D|$))/g,'').replace(',','.');const value=Number(raw);if(!Number.isFinite(value))throw Error('Invalid numeric value '+s);return value};
function read(q,re){const m=q.match(re);if(!m)throw Error('Enunciat no reconegut: '+q);return m.slice(1).map(num)}
const specs={
 'superficies:7':{unit:'cm³',calc:q=>{const [r,h]=read(q,/cilindre té radi ([\d,.]+) cm i altura ([\d,.]+) cm/);return 3.14*r*r*h}},
 'superficies:8':{unit:'cm²',calc:q=>{const [r,h]=read(q,/cilindre de radi ([\d,.]+) cm i altura ([\d,.]+) cm/);return 2*3.14*r*h}},
 'superficies:9':{unit:'cm²',calc:q=>{const [r,h]=read(q,/tancat de radi ([\d,.]+) cm i altura ([\d,.]+) cm/);return 2*3.14*r*(r+h)}},
 'superficies:10':{unit:'cm',calc:q=>{const [v,a]=read(q,/volum de ([\d,.]+) cm³ i una àrea de la base de ([\d,.]+) cm²/);return v/a}},
 'superficies:11':{unit:'cm²',calc:q=>{const [v,h]=read(q,/volum de ([\d,.]+) cm³ i una altura de ([\d,.]+) cm/);return v/h}},
 'superficies:12':{unit:'cm',calc:q=>{const [r,v]=read(q,/cilindre de radi ([\d,.]+) cm té un volum de ([\d,.]+) cm³/);return v/(3.14*r*r)}},
 'superficies:13':{unit:'L',calc:q=>{const [l,w,h]=read(q,/mesura ([\d,.]+) m × ([\d,.]+) m × ([\d,.]+) m/);return 1000*l*w*h}},
 'unitats:10':{unit:'cm',calc:q=>{const [m,cm]=read(q,/cinta té ([\d,.]+) m i se n’afegeixen ([\d,.]+) cm/);return m*100+cm}},
 'unitats:11':{unit:'dm²',calc:q=>{const [area]=read(q,/és de ([\d,.]+) m²/);return area*100}},
 'unitats:12':{unit:'L',calc:q=>{const [v]=read(q,/interior de ([\d,.]+) dm³/);return v}},
 'estimacio:9':{choice:true,calc:q=>{const [r1,a1,r2,a2]=read(q,/Mesura A: referència ([\d,.]+), aproximació ([\d,.]+). Mesura B: referència ([\d,.]+), aproximació ([\d,.]+)/);const e1=Math.abs(a1-r1)/r1,e2=Math.abs(a2-r2)/r2;if(Math.abs(e1-e2)<1e-12)throw Error('Unexpected relative-error tie');return e1<e2?'La mesura A':'La mesura B'}},
 'estimacio:10':{choice:true,calc:q=>{if(q.includes('a la unitat'))return '0,5';if(q.includes('a la dècima'))return '0,05';if(q.includes('a la centèsima'))return '0,005';throw Error('Unrecognized rounding unit: '+q)}},
 'problemes:8':{unit:'km',calc:q=>{const [scale,cm]=read(q,/mapa a escala 1:([\d.]+), una ruta mesura ([\d,.]+) cm/);return scale*cm/100000}},
 'problemes:9':{choice:true,calc:q=>{const [cm,m]=read(q,/plànol, ([\d,.]+) cm representen ([\d,.]+) m/);return '1:'+String(Math.round(100*m/cm))}},
 'problemes:10':{unit:'m',calc:q=>{const [hp,sp,st]=read(q,/persona de ([\d,.]+) m.*?ombra de ([\d,.]+) m.*?ombra de ([\d,.]+) m/);return hp*st/sp}},
 'problemes:11':{unit:'m²',calc:q=>{const [l,w,p]=read(q,/piscina rectangular de ([\d,.]+) × ([\d,.]+) m.*?amplada uniforme ([\d,.]+) m/);return (l+2*p)*(w+2*p)-l*w}},
 'problemes:12':{unit:'m²',calc:q=>{const [r,w]=read(q,/parterre circular de radi ([\d,.]+) m.*?camí d’amplada ([\d,.]+) m/);return 3.14*((r+w)**2-r*r)}}
};
const checks={},failures=[],samples=50;
for(const [key,spec] of Object.entries(specs)){
 const [topic,n]=key.split(':');
 for(let i=0;i<samples;i++){
  const ex=gens[topic](Number(n)),question=clean(ex.question);
  try{
   const expected=spec.calc(question),answer=String(ex.correct).trim();
   if(spec.choice){if(answer!==expected)throw Error('Incorrect choice '+answer+' expected '+expected)}
   else{
    const m=answer.match(/^([-+\d,.]+)\s+(\S+)$/);
    if(!m)throw Error('Unparseable answer '+answer);
    const actual=num(m[1]),unit=m[2];
    if(unit!==spec.unit)throw Error('Unit '+unit+' expected '+spec.unit);
    const tolerance=key==='superficies:12'?0.01:Math.max(.0050001,Math.abs(expected)*1e-10);
    if(!Number.isFinite(actual)||Math.abs(actual-expected)>tolerance)throw Error('Arithmetic mismatch '+actual+' expected '+expected);
   }
   if(!Array.isArray(ex.options)||ex.options.length!==4||!ex.options.includes(ex.correct)||new Set(ex.options).size!==4)throw Error('Answer options invalid');
   checks[key]=(checks[key]||0)+1;
  }catch(error){failures.push({key,iteration:i,error:error.message,question,answer:ex.correct})}
 }
}
const result={new_oracle_types:Object.keys(specs).length,checks_completed:Object.values(checks).reduce((a,b)=>a+b,0),failed_instances:failures.length,failures:failures.slice(0,18),random_calls:calls};
console.log(JSON.stringify(result,null,2));
assert.equal(result.new_oracle_types,17);
assert.equal(failures.length,0,'Independent oracle mismatches or parser failures');
assert.equal(result.checks_completed,17*samples);
