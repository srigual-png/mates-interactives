'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
globalThis.window=globalThis;
function seeded(seed){let x=seed>>>0;return()=>{x=(Math.imul(x,1664525)+1013904223)>>>0;return x/4294967296;};}
let random=seeded(0x71e51),forcedType=1,first=true;
globalThis.rnd=(a,b)=>{if(first){first=false;return forcedType;}return a+Math.floor(random()*(b-a+1));};
globalThis.shuffle=a=>{const out=a.slice();for(let i=out.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[out[i],out[j]]=[out[j],out[i]];}return out;};
globalThis.fmtNum=n=>Number.isInteger(n)?String(n):String(Number(n.toFixed(6))).replace('.',',');
for(const p of ['assets/js/raonament-mesura-1eso.js','assets/js/dificultat-mi.js'])vm.runInThisContext(fs.readFileSync(p,'utf8'),{filename:p});
const html=fs.readFileSync('1eso/sentit-mesura.html','utf8').replace(/\r\n?/g,'\n');
const start=html.indexOf('function crearBossaEstimacio(){'),end=html.indexOf('// ── 7. PROBLEMES DE CONTEXT',start);
assert(start>=0&&end>start,'estimation generator boundaries');
vm.runInThisContext('let bossaEstimacio=[];let lastEstimacioType=null;'+html.slice(start,end)+';globalThis.__estimate={crearBossaEstimacio,genEstimacio,treureEstimacio,reset(){bossaEstimacio=[];lastEstimacioType=null;}};',{filename:'estimacio-generators.js'});
const M=MIFirstMeasureTasks,topic={id:'estimacio',course:'1r',exam1r:true},D=MIDifficulty.attach({course:'1eso',sense:'mesura',topics:[topic]});
const specs=M.estimateFamilySpecs;
assert.deepEqual(specs.map(x=>x.id),['estimacio-per-referents','estimacio-amb-limit-superior','estimacio-amb-garantia']);
assert.deepEqual([1,2,3].map(n=>specs.filter(x=>x.level===n).length),[1,1,1]);
assert.deepEqual(D.coverage(topic).types,[1,1,1]);
const counts={raw:{},catalog:{}};
function validate(q,expectedLevel,id){
 assert(q&&q.question&&q.correct,`${id}: complete question`);
 assert(Array.isArray(q.options)&&q.options.length===4,`${id}: four options`);
 assert.equal(new Set(q.options.map(String)).size,4,`${id}: distinct options`);
 assert(q.options.map(String).includes(String(q.correct)),`${id}: correct answer present`);
 assert(Array.isArray(q.guide)&&q.guide.length>=2,`${id}: graduated hints`);
 assert(Array.isArray(q.solution)&&q.solution.length>=2,`${id}: worked solution`);
 assert.equal(D.getDifficulty(topic,q),expectedLevel,`${id}: classifier agrees with family N${expectedLevel}`);
 assert.equal(q.taskDifficulty,expectedLevel,`${id}: internal level agrees`);
 assert.equal(q.diff,expectedLevel,`${id}: difficulty label agrees`);
}
const bank=globalThis.__estimate.crearBossaEstimacio();
assert.equal(bank.length,40,'four original banks contain 40 samples');
assert.deepEqual([1,2,3,4].map(t=>bank.filter(x=>x.type===t).length),[10,10,10,10]);
for(let type=1;type<=4;type++)for(let i=0;i<250;i++){
 forcedType=type;first=true;random=seeded(0x3000+type*997+i*31);
 const q=globalThis.__estimate.genEstimacio();
 validate(q,1,`raw type ${type} sample ${i}`);
 assert.equal(q.estimateFamily,'estimacio-per-referents');
 assert(!/\d\s*[×x]\s*\d/.test(q.question),`type ${type}: estimation does not provide dimensions to multiply`);
 counts.raw[type]=(counts.raw[type]||0)+1;
}
for(const [id,level] of [['estimacio-comparada',2],['estimacio-amb-garantia',3]])for(let i=0;i<250;i++){
 random=seeded(0xa710+i*17+(level*991));
 const q=M.generate(id,random),d=q.reasoningData;
 validate(q,level,id+' sample '+i);
 assert.equal(q.estimateFamily,specs.find(x=>x.level===level).id);
 if(id==='estimacio-comparada'){
   const area=(d.a+1)*d.b,expected=Math.ceil(area/d.c);
   assert.equal(Number(q.correct),expected,'independent upper-bound and ceiling oracle');
   assert(q.question.includes('entre '+d.a+' i '+(d.a+1)),'interval is explicit');
 }else{
   const maxArea=(d.length+d.margin)*(d.width+d.margin),expected=Math.ceil(maxArea/d.coverage);
   assert.equal(Number(q.correct),expected,'independent maximum-margin purchase oracle');
   assert((expected-1)*d.coverage<maxArea&&expected*d.coverage>=maxArea,'minimum integer purchase is proven');
 }
 counts.catalog[id]=(counts.catalog[id]||0)+1;
}
// The raw bag covers four magnitudes, but estimates are one mathematical family.
globalThis.__estimate.reset();
const sequence=[];for(let i=0;i<80;i++){random=seeded(0xbad0+i);const q=globalThis.__estimate.genEstimacio();sequence.push(q.type);}
assert(sequence.every((x,i)=>i===0||x!==sequence[i-1]),'bag avoids repeating the same magnitude block consecutively');
console.log(JSON.stringify({ok:true,families:specs.map(({id,level,generators})=>({id,level,generators})),rawSamples:Object.values(counts.raw).reduce((a,b)=>a+b,0),catalogSamples:Object.values(counts.catalog).reduce((a,b)=>a+b,0),counts,bagSequence:sequence.length},null,2));
