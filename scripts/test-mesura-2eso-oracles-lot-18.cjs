#!/usr/bin/env node
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const html=fs.readFileSync(path.join(__dirname,'..','2eso','sentit-mesura.html'),'utf8');
const first=html.indexOf('/* ── UTILS NUMÈRIQUES'),last=html.indexOf("return {topicId:'problemes',type,course:'2n'",first),end=html.indexOf('\n}',last)+2;
assert(first>=0&&last>first&&end>last,'Missing generator definitions');
let seed=0x21740693,calls=0;const math=Object.create(Math);
math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;if(++calls>800000)throw Error('RNG limit');return seed/0x100000000};
const ctx=vm.createContext({Math:math,console});vm.runInContext(html.slice(first,end),ctx,{timeout:15000});
const gens=vm.runInContext('({pitagores:genPitagores2ESO,unitats:genUnitats2ESO,estimacio:genEstimacioError2ESO})',ctx);
const strip=x=>String(x).replace(/<[^>]*>/g,'').replace(/\s+/g,' ');
const num=x=>{const v=Number(String(x).replace(/(?<=\d)\.(?=\d{3}(?:\D|$))/g,'').replace(',','.').replace(/[.,]$/,''));if(!Number.isFinite(v))throw Error('Invalid numeric '+x);return v};
function vals(q,re){const m=q.match(re);if(!m)throw Error('Cannot parse: '+q);return m.slice(1).map(num)}
const metric={mm:.001,cm:.01,dm:.1,m:1,dam:10,hm:100,km:1000,
  'mm²':1e-6,'cm²':1e-4,'dm²':.01,'m²':1,'dam²':100,'hm²':10000,'km²':1e6,
  'mm³':1e-9,'cm³':1e-6,'dm³':.001,'m³':1,
  mL:1e-6,cL:1e-5,dL:1e-4,L:.001,daL:.01,hL:.1,kL:1};
function unitValue(v,u){assert(Object.hasOwn(metric,u),'Unknown unit '+u);return v*metric[u]}
const specs={
 'pitagores:1':{pick:q=>{const m=q.match(/costat (AB|BC|AC) és oposat/);if(!m)throw Error('Missing opposite side');return m[1]}},
 'pitagores:8':{unit:'m',calc:q=>{const [a,b]=vals(q,/altura de ([\d,.]+) m.*?ocupa ([\d,.]+) m/);return Math.hypot(a,b)}},
 'pitagores:9':{pick:q=>{const [a,b,c]=vals(q,/costats de ([\d,.]+) cm, ([\d,.]+) cm i ([\d,.]+) cm/);const s=[a,b,c].sort((x,y)=>x-y);return Math.abs(s[0]**2+s[1]**2-s[2]**2)<1e-9?'Sí, és rectangle':'No, no és rectangle'}},
 'pitagores:10':{unit:'cm²',calc:q=>{const [b,s]=vals(q,/base de ([\d,.]+) cm i costats iguals de ([\d,.]+) cm/);return b*Math.sqrt(s*s-(b/2)**2)/2}},
 'pitagores:11':{unit:'cm',calc:q=>{const [d,s]=vals(q,/diagonal de ([\d,.]+) cm i un costat de ([\d,.]+) cm/);return 2*(s+Math.sqrt(d*d-s*s))}},
 'pitagores:12':{unit:'m',calc:q=>{const [a,b]=vals(q,/recórrer ([\d,.]+) m.*?després ([\d,.]+) m perpendicularment/);return a+b-Math.hypot(a,b)}},
 'pitagores:13':{unit:'cm',calc:q=>{const [a,b]=vals(q,/fa ([\d,.]+) cm d’amplada i ([\d,.]+) cm d’alçada/);return Math.hypot(a,b)}},
 'pitagores:14':{unit:'m',calc:q=>{const [a,b,e]=vals(q,/punt a ([\d,.]+) m.*?situat a ([\d,.]+) m.*?deixar ([\d,.]+) m addicionals/);return Math.hypot(a,b)+e}},
 'pitagores:15':{unit:'cm',calc:q=>q.includes('calcula la diagonal')?Math.hypot(...vals(q,/rectangle de ([\d,.]+) cm × ([\d,.]+) cm/)):((a)=>Math.sqrt(a[0]**2-a[1]**2))(vals(q,/hipotenusa ([\d,.]+) cm.*?catet de ([\d,.]+) cm/))},
 'pitagores:16':{pick:q=>{const [a,b,c]=vals(q,/catets ([\d,.]+) cm i ([\d,.]+) cm.*?“([\d,.]+)\+[\d,.]+=/);if(c!==a)throw Error('Bad question parse');return 'Ha sumat les longituds en lloc d’aplicar Pitàgores'}},
 'unitats:6':{dynamic:true,calc:q=>{const m=q.match(/converteix ([\d,.]+) (\S+) a (\S+)\./);if(!m)throw Error('Missing volume/capacity notation: '+q);return {unit:m[3],value:unitValue(num(m[1]),m[2])/metric[m[3]]}}},
 'unitats:9':{pick:q=>{const [m,cm]=vals(q,/Compara ([\d,.]+) m i ([\d,.]+) cm/);return m*100>cm?'La primera és més gran':'La segona és més gran'}},
 'unitats:14':{dynamic:true,calc:q=>{const m=q.match(/equivalència: ([\d,.]+) (\S+) = \? (\S+)/);if(!m)throw Error('Missing equivalence: '+q);return {unit:m[3],value:unitValue(num(m[1]),m[2])/metric[m[3]]}}},
 'unitats:15':{unit:'dm²',calc:q=>{const [a,b]=vals(q,/una de ([\d,.]+) m² i una altra de ([\d,.]+) cm²/);return a*100+b/100}},
 'estimacio:11':{pick:q=>{const a=q.match(/marge màxim d’error admès és de ([\d,.]+) (mm|cm|L|m)/);if(!a)throw Error('Missing tolerance');const lim=num(a[1]),unit=a[2],all=[...q.matchAll(/Instrument ([ABCD]): ±([\d,.]+) (mm|cm|L|m)/g)];if(all.length!==4)throw Error('Missing instruments');const eligible=all.filter(x=>x[3]===unit&&num(x[2])<=lim+1e-9);if(!eligible.length)throw Error('No eligible instruments');eligible.sort((x,y)=>num(y[2])-num(x[2]));return 'Instrument '+eligible[0][1]}},
 'estimacio:12':{pick:q=>{const [x]=vals(q,/registrat com ([\d,.]+) cm/);const f=n=>num(n).toLocaleString('ca-ES',{minimumFractionDigits:2,maximumFractionDigits:2});return 'des de '+f(x-.05)+' cm (inclòs) fins a '+f(x+.05)+' cm (exclòs)'}},
 'estimacio:17':{pick:q=>{const [r,a,b]=vals(q,/valor de referència és ([\d,.]+).*?A: ([\d,.]+).*?B: ([\d,.]+)/);return Math.abs(a-r)<Math.abs(b-r)?'L’aproximació A':'L’aproximació B'}},
 'estimacio:18':{pick:q=>'Ha sumat els valors en lloc de calcular-ne la diferència absoluta'}
};
const samples=50,checked={},failures=[];
for(const [key,spec] of Object.entries(specs)){
 const [topic,type]=key.split(':');
 for(let i=0;i<samples;i++){
  const ex=gens[topic](Number(type)),question=strip(ex.question);
  try{
   const expected=spec.pick?spec.pick(question):spec.calc(question),answer=String(ex.correct).trim();
   if(spec.pick){if(answer!==expected)throw Error('Choice differs: '+answer+' expected '+expected)}
   else{
    const desired=spec.dynamic?expected:{unit:spec.unit,value:expected};
    const m=answer.match(/^([-+\d,.]+)\s+(\S+)$/);
    if(!m)throw Error('Invalid answer notation '+answer);
    const actual=num(m[1]);
    if(m[2]!==desired.unit)throw Error('Wrong unit '+m[2]+' expected '+desired.unit);
    if(Math.abs(actual-desired.value)>Math.max(.0050001,Math.abs(desired.value)*1e-10))throw Error('Mismatch '+actual+' vs '+desired.value);
   }
   if(!ex.options.includes(ex.correct)||new Set(ex.options).size!==4)throw Error('Invalid choices');
   checked[key]=(checked[key]||0)+1;
  }catch(error){failures.push({key,iteration:i,error:error.message,question,answer:ex.correct})}
 }
}
const results={oracle_types:Object.keys(specs).length,verified_instances:Object.values(checked).reduce((a,b)=>a+b,0),failures_count:failures.length,failures:failures.slice(0,18),random_calls:calls};
console.log(JSON.stringify(results,null,2));
assert.equal(results.oracle_types,18);assert.equal(failures.length,0);assert.equal(results.verified_instances,18*samples);
