#!/usr/bin/env node
'use strict';
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync(path.join(__dirname,'..','2eso','sentit-mesura.html'),'utf8');
const beg=html.indexOf('/* ── UTILS NUMÈRIQUES'),endTag=html.indexOf("return {topicId:'problemes',type,course:'2n'",beg),end=html.indexOf('\n}',endTag)+2;
assert(beg>=0&&endTag>beg&&end>endTag);
let seed=0x36496a11,draws=0;
const math=Object.create(Math);
math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;if(++draws>600000)throw Error('RNG limit exceeded');return seed/0x100000000};
const ctx=vm.createContext({Math:math,console});
vm.runInContext(html.slice(beg,end),ctx,{timeout:15000});
const gens=vm.runInContext('({escales:genEscales2ESO,perimetres:genPerimetresArees2ESO,superficies:genSuperficiesVolums2ESO})',ctx);
const text=s=>String(s).replace(/<[^>]+>/g,'').replace(/\s+/g,' ');
const num=s=>Number(String(s).replace(/\.(?=\d{3}(?:\D|$))/g,'').replace(',','.'));
function args(q,regex){const m=q.match(regex);if(!m)throw Error('Could not parse question: '+q);return m.slice(1).map(num)}
const specs={
 'escales:6':{u:'m²',get:q=>{const [a,b,n]=args(q,/fa ([\d,.]+) cm × ([\d,.]+) cm.*?escala 1:([\d,.]+)/);return a*b*(n/100)**2}},
 'escales:7':{u:'cm²',get:q=>{const [a,b]=args(q,/fa ([\d,.]+) m × ([\d,.]+) m/);return a*b}},
 'escales:8':{u:'m',get:q=>{const [hp,sp,st]=args(q,/persona de ([\d,.]+) m.*?ombra de ([\d,.]+) m.*?ombra de ([\d,.]+) m/);return hp*st/sp}},
 'escales:9':{u:'m',get:q=>{const [hs,ss,sb]=args(q,/vara vertical de ([\d,.]+) m.*?ombra de ([\d,.]+) m.*?ombra de ([\d,.]+) m/);return hs*sb/ss}},
 'escales:10':{u:'',get:q=>{const [a,b,c]=args(q,/mesuren ([\d,.]+) i ([\d,.]+).*?primer mesura ([\d,.]+)/);return b*c/a}},
 'perimetres:1':{u:'cm²',get:q=>{const [b,h]=args(q,/base ([\d,.]+) cm i altura ([\d,.]+) cm/);return b*h}},
 'perimetres:2':{u:'cm²',get:q=>{const [a,b]=args(q,/diagonals de ([\d,.]+) cm i ([\d,.]+) cm/);return a*b/2}},
 'perimetres:3':{u:'cm²',get:q=>{const [a,b,h]=args(q,/bases ([\d,.]+) cm i ([\d,.]+) cm i altura ([\d,.]+) cm/);return (a+b)*h/2}},
 'perimetres:7':{u:'cm²',get:q=>{const [r]=args(q,/semicercle de radi ([\d,.]+) cm/);return 3.14*r*r/2}},
 'perimetres:9':{u:'cm²',get:q=>{const [w,h,a,b]=args(q,/rectangle de ([\d,.]+) cm × ([\d,.]+) cm.*?rectangle de ([\d,.]+) cm × ([\d,.]+) cm/);return w*h-a*b}},
 'perimetres:10':{u:'cm²',get:q=>{const [w,h,d]=args(q,/rectangle de ([\d,.]+) cm × ([\d,.]+) cm i un semicercle adossat pel costat de ([\d,.]+) cm/);if(h!==d)throw Error('Inconsistent diameter');return w*h+3.14*(d/2)**2/2}},
 'superficies:1':{u:'cm³',get:q=>{const [l,w,h]=args(q,/ortoedre de ([\d,.]+) cm × ([\d,.]+) cm × ([\d,.]+) cm/);return l*w*h}},
 'superficies:2':{u:'cm²',get:q=>{const [l,w,h]=args(q,/tancada de ([\d,.]+) cm × ([\d,.]+) cm × ([\d,.]+) cm/);return 2*(l*w+l*h+w*h)}},
 'superficies:3':{u:'cm³',get:q=>{const [b,h]=args(q,/base de ([\d,.]+) cm².*?altura de ([\d,.]+) cm/);return b*h}},
 'superficies:4':{u:'cm³',get:q=>{const [b,h,l]=args(q,/base ([\d,.]+) cm i altura ([\d,.]+) cm.*?longitud del prisma és de ([\d,.]+) cm/);return b*h*l/2}},
 'superficies:5':{u:'cm³',get:q=>{const [s]=args(q,/cub d’aresta ([\d,.]+) cm/);return s**3}},
 'superficies:6':{u:'cm²',get:q=>{const [s]=args(q,/cub d’aresta ([\d,.]+) cm/);return 6*s**2}}
};
const failures=[],stats={},samples=50;
for(const [key,spec] of Object.entries(specs)){
 const [topic,id]=key.split(':');
 for(let i=0;i<samples;i++){
  const ex=gens[topic](Number(id)),q=text(ex.question);
  try{
   const expected=spec.get(q);
   const raw=String(ex.correct).trim();
   const m=raw.match(/^([-+\d,.]+)(?:\s+(\S+))?$/);
   if(!m)throw Error('Cannot parse answer '+raw);
   const actual=num(m[1]),unit=m[2]||'';
   if(unit!==spec.u)throw Error('Wrong unit '+unit+' expected '+spec.u);
   const allowed=Math.max(0.005001,Math.abs(expected)*1e-10);
   if(Math.abs(actual-expected)>allowed)throw Error('Wrong result '+actual+' expected '+expected);
   if(!Array.isArray(ex.options)||ex.options.length!==4||new Set(ex.options).size!==4||!ex.options.includes(ex.correct))throw Error('Options invalid');
   stats[key]=(stats[key]||0)+1;
  }catch(error){failures.push({key,iteration:i,error:error.message,question:q,answer:ex.correct})}
 }
}
const output={new_oracle_types:Object.keys(specs).length,checked_instances:Object.values(stats).reduce((a,b)=>a+b,0),failed_instances:failures.length,failures:failures.slice(0,20),rng_draws:draws};
console.log(JSON.stringify(output,null,2));
assert.equal(Object.keys(specs).length,17);
assert.equal(failures.length,0,'Independent oracle failures');
assert.equal(output.checked_instances,17*samples);
