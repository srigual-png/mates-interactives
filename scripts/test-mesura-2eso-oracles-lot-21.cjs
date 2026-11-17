#!/usr/bin/env node
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const html=fs.readFileSync(path.join(__dirname,'..','2eso','sentit-mesura.html'),'utf8');
const first=html.indexOf('/* ── UTILS NUMÈRIQUES'),last=html.indexOf("return {topicId:'problemes',type,course:'2n'",first),end=html.indexOf('\n}',last)+2;
assert(first>=0&&last>first&&end>last,'Cannot locate source');
let seed=0x91a0c271,draws=0;const math=Object.create(Math);
math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;if(++draws>800000)throw Error('Exceeded random budget');return seed/0x100000000};
const ctx=vm.createContext({Math:math,console});vm.runInContext(html.slice(first,end),ctx,{timeout:15000});
const gens=vm.runInContext('({escales:genEscales2ESO,perimetres:genPerimetresArees2ESO,superficies:genSuperficiesVolums2ESO})',ctx);
const clean=q=>String(q).replace(/<[^>]+>/g,'').replace(/\s+/g,' ');
const n=v=>{const s=String(v).trim().replace(/(?<=\d)\.(?=\d{3}(?:\D|$))/g,'').replace(',','.').replace(/[.,]$/,'');const x=Number(s);if(!Number.isFinite(x))throw Error('Invalid number '+v);return x};
function vals(q,re){const m=q.match(re);if(!m)throw Error('Question parser miss: '+q);return m.slice(1).map(n)}
const specs={
 'escales:4':{kind:'scale',get:q=>{const [p,r]=vals(q,/plànol, ([\d,.]+) cm representen ([\d,.]+) m/);return 100*r/p}},
 'escales:12':{kind:'scalar',get:q=>{const [small,big]=vals(q,/passa de ([\d,.]+) cm a ([\d,.]+) cm/);return big/small}},
 'escales:13':{kind:'string',get:q=>{const [a,A,b,B]=vals(q,/corresponents ([\d,.]+) ↔ ([\d,.]+) i ([\d,.]+) ↔ ([\d,.]+)/);return a+'/'+A+' = '+b+'/'+B}},
 'escales:14':{kind:'string',get:q=>q.startsWith('En una escala 1:100')?'És correcte':q.startsWith('En una escala 1:50')?'Ha aplicat un factor lineal a una àrea':q.startsWith('Per trobar una escala')?'Ha comparat mesures amb unitats diferents':(()=>{throw Error('Unknown reasoning example')})()},
 'escales:15':{kind:'scale',get:q=>{const [real,p]=vals(q,/longitud real de ([\d,.]+) m.*?segment de ([\d,.]+) cm/);return real*100/p}},
 'escales:16':{unit:'m',get:q=>{const [scale,a,b]=vals(q,/escala 1:([\d,.]+), un jardí rectangular mesura ([\d,.]+) cm × ([\d,.]+) cm/);return 2*(a+b)*scale/100}},
 'escales:17':{unit:'km',get:q=>{const [scale,a,b]=vals(q,/escala 1:([\d.]+), una ruta té dos trams rectes de ([\d,.]+) cm i ([\d,.]+) cm/);return (a+b)*scale/100000}},
 'escales:18':{unit:'m',get:q=>{const [h1,s1,h2]=vals(q,/vara de ([\d,.]+) m projecta una ombra de ([\d,.]+) m.*?pal de ([\d,.]+) m/);return h2*s1/h1}},
 'perimetres:11':{unit:'cm²',get:q=>{const [outer,inner]=vals(q,/costat exterior de ([\d,.]+) cm.*?interior de ([\d,.]+) cm/);return outer**2-inner**2}},
 'perimetres:12':{unit:'cm',get:q=>{const [area,h]=vals(q,/àrea de ([\d,.]+) cm² i altura de ([\d,.]+) cm/);return 2*area/h}},
 'perimetres:13':{unit:'cm',get:q=>{const [a,B,b]=vals(q,/àrea de ([\d,.]+) cm² i bases de ([\d,.]+) cm i ([\d,.]+) cm/);return 2*a/(B+b)}},
 'perimetres:15':{unit:'cm²',get:q=>{const [count,side,apothem]=vals(q,/té ([\d,.]+) costats de ([\d,.]+) cm i apotema aproximada de ([\d,.]+) cm/);return count*side*apothem/2}},
 'perimetres:16':{unit:'m²',get:q=>{const [w,h,dw,dh,ww,wh]=vals(q,/paret de ([\d,.]+) m × ([\d,.]+) m.*?porta de ([\d,.]+) m × ([\d,.]+) m.*?finestra de ([\d,.]+) m × ([\d,.]+) m/);return w*h-dw*dh-ww*wh}},
 'perimetres:17':{unit:'m²',get:q=>{const [r,p]=vals(q,/estany circular de radi ([\d,.]+) m.*?camí d’amplada ([\d,.]+) m/);return 3.14*((r+p)**2-r*r)}},
 'perimetres:18':{kind:'string',get:q=>{const [r]=vals(q,/àrea d’un cercle de radi ([\d,.]+) cm/);if(r<=0)throw Error('Invalid radius');return 'Ha calculat la longitud de la circumferència en lloc de l’àrea'}},
 'superficies:15':{unit:'m',get:q=>{const [l,w,litres]=vals(q,/base ([\d,.]+) m × ([\d,.]+) m conté ([\d,.]+) L/);return litres/1000/(l*w)}},
 'superficies:16':{unit:'cm²',get:q=>{const [l,w,h]=vals(q,/tancada de ([\d,.]+) cm × ([\d,.]+) cm × ([\d,.]+) cm/);return 2*(l*w+l*h+w*h)}},
 'superficies:17':{kind:'string',get:q=>{const [a,b,c,x,y,z]=vals(q,/recipient A mesura ([\d,.]+)×([\d,.]+)×([\d,.]+) dm i el B ([\d,.]+)×([\d,.]+)×([\d,.]+) dm/);if(a*b*c===x*y*z)throw Error('Tie not acceptable');return a*b*c>x*y*z?'El recipient A':'El recipient B'}},
 'superficies:18':{kind:'string',get:q=>{const [a,b,c]=vals(q,/volum d’una capsa de ([\d,.]+)×([\d,.]+)×([\d,.]+) cm/);if(a*b*c<=0)throw Error('Invalid dimensions');return 'Ha calculat l’àrea total en lloc del volum'}},
 'superficies:19':{kind:'rectangle',get:q=>{const [r,h]=vals(q,/cilindre de radi ([\d,.]+) cm i altura ([\d,.]+) cm/);return {circ:2*3.14*r,height:h}}},
 'superficies:20':{kind:'string',get:q=>{const [l,w,h]=vals(q,/tancada de ([\d,.]+) cm × ([\d,.]+) cm × ([\d,.]+) cm/);return '2 cares de '+l+'×'+w+', 2 de '+l+'×'+h+' i 2 de '+w+'×'+h+' cm'}}
};
const failures=[],checked={},samples=50;
for(const [key,spec] of Object.entries(specs)){
 const [topic,type]=key.split(':');
 for(let i=0;i<samples;i++){
  const ex=gens[topic](Number(type)),q=clean(ex.question),answer=String(ex.correct).trim();
  try{
   const expected=spec.get(q);
   if(spec.kind==='string'){if(answer!==expected)throw Error('Wrong choice '+answer+' expected '+expected)}
   else if(spec.kind==='scale'){const m=answer.match(/^1\s*:\s*([\d,.]+)$/);if(!m||Math.abs(n(m[1])-expected)>1e-8)throw Error('Wrong scale '+answer+' expected 1:'+expected)}
   else if(spec.kind==='scalar'){if(Math.abs(n(answer)-expected)>0.005)throw Error('Wrong scale factor '+answer+' expected '+expected)}
   else if(spec.kind==='rectangle'){
    const m=answer.match(/^([\d,.]+) cm × ([\d,.]+) cm$/);if(!m||Math.abs(n(m[1])-expected.circ)>0.005001||Math.abs(n(m[2])-expected.height)>1e-8)throw Error('Wrong net rectangle '+answer)
   }else{
    const m=answer.match(/^([-+\d,.]+)\s+(\S+)$/);if(!m)throw Error('Bad numeric answer '+answer);
    if(m[2]!==spec.unit)throw Error('Wrong output unit '+m[2]+' expected '+spec.unit);
    const tol=Math.max(.005001,Math.abs(expected)*1e-10);
    if(Math.abs(n(m[1])-expected)>tol)throw Error('Wrong computed answer '+answer+' expected '+expected)
   }
   if(ex.options.length!==4||new Set(ex.options).size!==4||!ex.options.includes(ex.correct))throw Error('Option bank invalid');
   checked[key]=(checked[key]||0)+1;
  }catch(e){failures.push({key,iteration:i,error:e.message,question:q,answer})}
 }
}
const report={new_oracle_types:Object.keys(specs).length,checked_examples:Object.values(checked).reduce((a,b)=>a+b,0),failed_examples:failures.length,failures:failures.slice(0,20),random_draws:draws};
console.log(JSON.stringify(report,null,2));
assert.equal(report.new_oracle_types,21);
assert.equal(report.failed_examples,0);
assert.equal(report.checked_examples,21*samples);
