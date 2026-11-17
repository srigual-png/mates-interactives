#!/usr/bin/env node
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const html=fs.readFileSync(path.join(__dirname,'..','2eso','sentit-mesura.html'),'utf8');
const start=html.indexOf('/* ── UTILS NUMÈRIQUES'),last=html.indexOf("return {topicId:'problemes',type,course:'2n'",start),end=html.indexOf('\n}',last)+2;
assert(start>=0&&last>start&&end>last,'Could not locate actual generator source');
let seed=0x4b72aa19,calls=0;
const m=Object.create(Math);
m.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;if(++calls>500000)throw Error('Excessive RNG draws');return seed/0x100000000};
const ctx=vm.createContext({Math:m,console});
vm.runInContext(html.slice(start,end),ctx,{timeout:15000});
const gens=vm.runInContext('({unitats:genUnitats2ESO,escales:genEscales2ESO,pitagores:genPitagores2ESO,problemes:genProblemesMesura2ESO})',ctx);
const specs={
 'unitats:1':{unit:'',formula:q=>metric(q,1)},
 'unitats:2':{unit:'',formula:q=>metric(q,2)},
 'unitats:3':{unit:'',formula:q=>metric(q,3)},
 'unitats:4':{unit:'',formula:q=>metric(q,1)},
 'unitats:5':{unit:'',formula:q=>metric(q,1)},
 'escales:1':{unit:'m',formula:q=>{const a=match(q,/escala 1:([\d.]+).*?mesura ([\d,.]+) cm/);return num(a[1])*num(a[2])/100}},
 'escales:2':{unit:'km',formula:q=>{const a=match(q,/escala 1:([\d.]+).*?separats ([\d,.]+) cm/);return num(a[1])*num(a[2])/100000}},
 'escales:3':{unit:'cm',formula:q=>{const a=match(q,/real de ([\d,.]+) m.*?escala 1:([\d.]+)/);return num(a[1])*100/num(a[2])}},
 'escales:5':{unit:'cm',formula:q=>{const a=match(q,/peça real de ([\d,.]+) cm.*?escala d’ampliació ([\d,.]+):1/);return num(a[1])*num(a[2])}},
 'pitagores:2':{unit:'cm',formula:q=>{const a=match(q,/catets de ([\d,.]+) cm i ([\d,.]+) cm/);return Math.hypot(num(a[1]),num(a[2]))}},
 'pitagores:3':{unit:'cm',formula:q=>{const a=match(q,/hipotenusa mesura ([\d,.]+) cm i un catet ([\d,.]+) cm/);return Math.sqrt(num(a[1])**2-num(a[2])**2)}},
 'pitagores:4':{unit:'m',formula:q=>{const a=match(q,/fa ([\d,.]+) m × ([\d,.]+) m/);return Math.hypot(num(a[1]),num(a[2]))}},
 'pitagores:6':{unit:'m',formula:q=>{const a=match(q,/peu a ([\d,.]+) m.*?altura de ([\d,.]+) m/);return Math.hypot(num(a[1]),num(a[2]))}},
 'pitagores:7':{unit:'m',formula:q=>{const a=match(q,/pal de ([\d,.]+) m.*?situat a ([\d,.]+) m/);return Math.hypot(num(a[1]),num(a[2]))}},
 'problemes:1':{unit:'pot',formula:q=>{const a=match(q,/paret de ([\d,.]+) × ([\d,.]+) m.*?porta de ([\d,.]+) × ([\d,.]+) m.*?finestra de ([\d,.]+) × ([\d,.]+) m.*?pot de pintura cobreix ([\d,.]+) m²/);return Math.ceil((num(a[1])*num(a[2])-num(a[3])*num(a[4])-num(a[5])*num(a[6]))/num(a[7]))}},
 'problemes:4':{unit:'L',formula:q=>{const a=match(q,/radi ([\d,.]+) dm i altura ([\d,.]+) dm/);return 3.14*num(a[1])**2*num(a[2])}},
 'problemes:5':{unit:'cm²',formula:q=>{const a=match(q,/diàmetre ([\d,.]+) cm i altura ([\d,.]+) cm/);return 3.14*num(a[1])*num(a[2])}},
 'problemes:6':{unit:'cm',formula:q=>{const a=match(q,/fa ([\d,.]+) cm d’ample i ([\d,.]+) cm d’alt/);return Math.hypot(num(a[1]),num(a[2]))}},
 'problemes:7':{unit:'m',formula:q=>{const a=match(q,/fins a ([\d,.]+) m d’altura.*?peu a ([\d,.]+) m/);return Math.hypot(num(a[1]),num(a[2]))}}
};
const linear={mm:.001,cm:.01,dm:.1,m:1,dam:10,hm:100,km:1000};
const cap={ml:.001,cl:.01,dl:.1,l:1,dal:10,hl:100,kl:1000};
const mass={mg:.001,cg:.01,dg:.1,g:1,dag:10,hg:100,kg:1000};
function num(x){return Number(String(x).replace(/\.(?=\d{3}(?:\D|$))/g,'').replace(',','.'))}
function match(text,re){const a=text.match(re);if(!a)throw Error('Enunciat no reconegut: '+text);return a}
function metric(q,power){
 const a=match(q,/Converteix ([\d,.]+) (\w+[²³]?) a (\w+[²³]?)/);
 const from=a[2].replace(/[²³]/g,''),to=a[3].replace(/[²³]/g,'');
 const table=(from in linear)?linear:(from in cap)?cap:(from in mass)?mass:null;
 if(!table||!(to in table))throw Error('Convertion unit not in table '+a[2]+' '+a[3]);
 return {expected:num(a[1])*(table[from]/table[to])**power,unit:a[3]};
}
function view(q){return q.replace(/<[^>]*>/g,'').replace(/\s+/g,' ')}
function actualValue(ex,unit){
 const raw=String(ex.correct).trim();
 if(unit==='pot'){const a=match(raw,/^(\d+) pots?$/);return num(a[1])}
 const a=match(raw,/^([-+\d,.]+)\s+(\S+)$/);
 if(unit&&a[2]!==unit)throw Error('Incorrect output unit '+a[2]+' expected '+unit);
 return {value:num(a[1]),unit:a[2]};
}
const samples=50,failures=[],counter={};
for(const [key,spec] of Object.entries(specs)){
 const [topic,id]=key.split(':');
 for(let i=0;i<samples;i++){
  const ex=gens[topic](Number(id)),q=view(ex.question);
  try{
   const value=spec.formula(q),expected=typeof value==='object'?value.expected:value;
   const u=typeof value==='object'?value.unit:spec.unit;
   const parsed=actualValue(ex,u),got=typeof parsed==='object'?parsed.value:parsed;
   // Output format is at most 6 decimals for metric conversions, 2 decimal places for circles.
   const tol=key.startsWith('unitats:')?Math.max(0.00000051,Math.abs(expected)*1e-10):Math.max(.0050001,Math.abs(expected)*1e-9);
   if(Math.abs(got-expected)>tol)throw Error('Independent oracle differs: '+got+' versus '+expected);
   if(!ex.options.includes(ex.correct)||new Set(ex.options).size!==4)throw Error('Invalid option bank');
   counter[key]=(counter[key]||0)+1;
  }catch(err){failures.push({key,iteration:i,error:err.message,question:q,answer:ex.correct})}
 }
}
const report={independent_oracle_types:Object.keys(specs).length,instances_per_type:samples,oracles_checked:Object.values(counter).reduce((a,b)=>a+b,0),successful_types:Object.keys(counter).length,failures_count:failures.length,failures:failures.slice(0,15),random_calls:calls};
console.log(JSON.stringify(report,null,2));
assert.equal(Object.keys(specs).length,19);
assert.equal(failures.length,0,'See failed independent oracles');
assert.equal(report.oracles_checked,19*samples);
