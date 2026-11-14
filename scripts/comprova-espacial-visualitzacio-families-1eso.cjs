'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
globalThis.window=globalThis;
for(const f of ['assets/js/espacial-1eso-families.js','assets/js/dificultat-mi.js'])vm.runInThisContext(fs.readFileSync(f,'utf8'));
const page=fs.readFileSync('1eso/sentit-espacial.html','utf8');
function extract(name){const start=page.indexOf('function '+name+'(');assert(start>=0,name+' source');const open=page.indexOf('{',start);let depth=0;for(let i=open;i<page.length;i++){if(page[i]==='{')depth++;else if(page[i]==='}'&&!--depth)return page.slice(start,i+1);}throw Error(name+' end');}
let seed=1,forced=[];
function random(){seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;}
globalThis.rnd=(a,b)=>forced.length?Math.min(b,Math.max(a,forced.shift())):a+Math.floor(random()*(b-a+1));
globalThis.shuffle=a=>{const x=a.slice();for(let i=x.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[x[i],x[j]]=[x[j],x[i]];}return x;};
globalThis.uniq4=(correct,others)=>{const out=[...new Set([String(correct),...others.map(String)])];for(let i=0;out.length<4;i++)out.push('Distractor '+i);return shuffle(out.slice(0,4));};
for(const name of ['svgGridModel','svgSquareAreaOnly','svgOddSquareLayers','svgFractionProductModel','svgMissingRectanglePart','genVisualitzacio1r'])vm.runInThisContext(extract(name));
globalThis.spOpen=[];
globalThis.spNumAnswer=n=>({val:String(n),check:x=>Number(x)===n});
globalThis.spFracAnswer=(n,d)=>{const gcd=(a,b)=>b?gcd(b,a%b):a,g=gcd(n,d);return {val:`${n/g}/${d/g}`,check:x=>{const m=String(x).match(/^(\d+)\/(\d+)$/);return !!m&&+m[1]*d===n*+m[2];}};};
globalThis.spProblem=o=>({...o,options:[],correct:o.answer.val,guide:o.hint, type:o.patternId});
globalThis.spAdd=(id,family,topicId,diff,gen)=>spOpen.push({id,family,topicId,diff,gen:()=>MIFirstSpatialFamilies.decorate(topicId,gen())});
for(const line of page.split(/\r?\n/).filter(x=>/^spAdd\('V[1-5]'/.test(x)))vm.runInThisContext(line);
const topic={id:'visualitzacio',course:'1r',exam1r:true},families=MIFirstSpatialFamilies.topicSpecs(topic.id),D=MIDifficulty.attach({course:'1eso',sense:'espacial',topics:[topic]});
const levels=[1,2,3].map(level=>families.filter(f=>f.level===level).length);
assert.equal(families.length,7);assert.deepEqual(levels,[4,3,0]);assert.deepEqual(D.coverage(topic).types,levels);assert.equal(new Set(families.map(f=>f.id)).size,7);
function nums(text){return [...String(text).replace(/<[^>]*>/g,' ').matchAll(/\d+(?:[.,]\d+)?/g)].map(m=>Number(m[0].replace(',','.')));}
function rects(svg){return [...svg.matchAll(/<rect\b([^>]*)\/>/g)].map(m=>Object.fromEntries([...m[1].matchAll(/([\w-]+)="([^"]*)"/g)].map(x=>[x[1],x[2]])));}
function checkSvg(q){assert.match(q.svg,/<svg\b/,'visual model exists');const type=Number(String(q.type).replace(/^V/,'')),v=nums(q.question),cells=rects(q.svg).filter(r=>r.width==='18'||r.width==='22');
  if(type===1){assert.equal((q.svg.match(/<line\b/g)||[]).length,v[0]+1+v[1]+1,'rows/columns grid matches prompt');}
  if(type===2){const [a,b,h]=String(q.type).startsWith('V')?[v[1],v[2],v[0]]:[v[0],v[1],v[2]];assert.equal((q.svg.match(/<line\b/g)||[]).length,a+b+h+3,'split grid matches both widths and height');assert(q.svg.includes('stroke="#e05c5c"'),'distributive split is visible');}
  if(type===3&&q.type!=='V3'){const r=rects(q.svg).find(x=>x.fill==='#a0b4ff');assert(r&&r.width===String(v[0]*18)&&r.height===String(v[0]*18),'square grid model has equal sides');}
  if(q.type==='V3'){const r=rects(q.svg).find(x=>x.fill==='#a0b4ff');assert(r&&r.width===r.height&&q.svg.includes('costat = ?'),'inverse square model has equal sides and unknown-side label');}
  if(type===4&&typeof q.type==='number')assert.match(q.svg,/costat = \?/,'inverse square model labels unknown side');
  if(q.type===5||q.type==='V4'){const n=v[0],groups={};for(const r of cells)groups[r.fill]=(groups[r.fill]||0)+1;assert.deepEqual(Object.values(groups).sort((a,b)=>a-b),Array.from({length:n},(_,i)=>2*i+1),'each square layer contains the next odd number of cells');}
  if(q.type===6||q.type==='V5'){const match=q.question.match(/1\/(\d+).*?(\d+)\/(\d+)/),d1=+match[1],n2=+match[2],d2=+match[3];assert.equal(cells.length,d1*d2,'fraction model grid size');assert.equal(cells.filter(r=>r.fill==='#8d78d8').length,n2,'fraction intersection cells');}
  if(type===7){const total=v[0],left=v[1],groups={};for(const r of cells)groups[r.fill]=(groups[r.fill]||0)+1;assert.equal(groups['#80b5e8'],left,'known-area cells');assert.equal(groups['#f2bf62'],total-left,'missing-area cells');}
}
function validate(q,expectedId){assert(q,'exercise generated');if(String(q.type).startsWith('V'))assert.equal(q.options.length,0,'open-context pattern has no multiple-choice options');else{assert.equal(q.options.length,4);assert.equal(new Set(q.options.map(String)).size,4);assert(q.options.includes(q.correct));}assert(q.guide?.length>=1);assert(q.solution?.length>=1);const f=MIFirstSpatialFamilies.familyFor(topic,q);assert(f,'family recognized for type '+q.type);if(expectedId)assert.equal(f.id,expectedId);const decorated=MIFirstSpatialFamilies.decorate(topic,q);assert.equal(decorated.familyId,f.id);assert.equal(decorated.taskDifficulty,f.level);assert.equal(D.getDifficulty(topic,decorated),f.level);assert.equal(decorated.taskDifficultyStatus,'assigned');checkSvg(q);}
let practiceSamples=0,contextSamples=0,wrapperSamples=0;
for(let type=1;type<=7;type++)for(let i=0;i<250;i++){
  seed=(0x61a000+type*1009+i*37)>>>0;forced=[type];const q=genVisualitzacio1r();assert.equal(q.type,type);validate(q);
  const v=nums(q.question),answer=nums(q.correct)[0];
  if(type===1)assert.equal(answer,v[0]*v[1],'rows × columns');
  if(type===2)assert.equal(answer,(v[0]+v[1])*v[2],'split rectangle and distributive property');
  if(type===3)assert.equal(answer,v[0]*v[0],'square area');
  if(type===4)assert.equal(answer*answer,v[0],'exact square root');
  if(type===5)assert.equal(Array.from({length:v[0]},(_,i)=>2*i+1).reduce((a,b)=>a+b,0),answer,'sum of odd numbers');
  if(type===6){const m=q.question.match(/1\/(\d+).*?(\d+)\/(\d+)/),frac=q.correct.match(/^(\d+)\/(\d+)$/);assert(m&&frac);assert.equal(+frac[1]*+m[1]*+m[3],+m[2]*+frac[2],'fraction product');for(const option of q.options){const other=String(option).match(/^(\d+)\/(\d+)$/);if(other&&option!==q.correct)assert.notEqual(+other[1]*+frac[2],+frac[1]*+other[2],'no equivalent-fraction distractor');}}
  if(type===7)assert.equal(answer,v[0]-v[1],'missing area is total minus known part');
  practiceSamples++;
}
const expected={V1:'producte-base-alcada',V2:'distributiva-model-rectangle',V3:'arrel-exacta-i-relacio-inversa',V4:'suma-senars-model-quadrat',V5:'producte-fraccions'};
for(const pattern of spOpen)for(let i=0;i<250;i++){
  seed=(0x72b000+pattern.id.charCodeAt(1)*997+i*43)>>>0;forced=[];const q=pattern.gen();assert.equal(q.patternId,pattern.id);assert(pattern.id in expected);validate(q,expected[pattern.id]);assert(q.answer.check(q.correct),'context answer accepts correct value');
  const v=nums(q.question),ans=nums(q.correct)[0];
  if(pattern.id==='V1')assert.equal(ans,v[0]*v[1]);
  if(pattern.id==='V2')assert.equal(ans,(v[1]+v[2])*v[0]);
  if(pattern.id==='V3')assert.equal(ans*ans,v[0]);
  if(pattern.id==='V4')assert.equal(ans,v[0]*v[0]);
  if(pattern.id==='V5'){const m=q.question.match(/1\/(\d+).*?(\d+)\/(\d+)/);assert.equal(ans/+(q.correct.split('/')[1]),+m[2]/(+m[1]*+m[3]));}
  contextSamples++;
}
for(let i=0;i<1000;i++){seed=(0x83c000+i*71)>>>0;forced=[];const q=genVisualitzacio1r();assert([1,2,3,4,5,6,7].includes(q.type),'wrapper keeps all routes');const decorated=MIFirstSpatialFamilies.decorate(topic,q);assert.equal(D.getDifficulty(topic,decorated),decorated.taskDifficulty);wrapperSamples++;}
console.log(JSON.stringify({topic:'visualitzacio',families:families.length,levels,samples:{practice:practiceSamples,contextual:contextSamples,wrapper:wrapperSamples,total:practiceSamples+contextSamples+wrapperSamples},contextPatterns:Object.fromEntries(spOpen.map(p=>[p.id,250])),sharedFamilies:families.filter(f=>f.sharedWith).map(f=>({id:f.id,with:f.sharedWith})),newFamilyIds:families.filter(f=>!f.sharedWith).map(f=>f.id)}));
