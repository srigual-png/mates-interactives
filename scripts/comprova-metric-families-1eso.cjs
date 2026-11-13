'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
globalThis.window=globalThis;
vm.runInThisContext(fs.readFileSync('assets/js/raonament-mesura-1eso.js','utf8'),{filename:'raonament-mesura-1eso.js'});
vm.runInThisContext(fs.readFileSync('assets/js/dificultat-mi.js','utf8'),{filename:'dificultat-mi.js'});

const page=fs.readFileSync('1eso/sentit-mesura.html','utf8');
const helperStart=page.indexOf('function metricDistractors(');
const helperEnd=page.indexOf('// ── GENERADORS',helperStart);
const genStart=page.indexOf('function genMetricRaw(){');
const genEnd=page.indexOf('// 2. CONVERSIONS D',genStart);
assert(helperStart>=0&&helperEnd>helperStart,'metricDistractors block exists');
assert(genStart>=0&&genEnd>genStart,'genMetricRaw block exists');
function seeded(initial=0x51a7cafe){let x=initial>>>0;return ()=>{x=(Math.imul(x,1664525)+1013904223)>>>0;return x/4294967296;};}
let rand=seeded(),forcedType=1,firstDraw=true;
globalThis.rnd=(a,b)=>{if(firstDraw){firstDraw=false;return forcedType;}return a+Math.floor(rand()*(b-a+1));};
globalThis.fmtNum=n=>String(Number(n)).replace('.',',');
globalThis.shuffle=a=>{const out=a.slice();for(let i=out.length-1;i>0;i--){const j=Math.floor(rand()*(i+1));[out[i],out[j]]=[out[j],out[i]];}return out;};
vm.runInThisContext(page.slice(helperStart,helperEnd)+'\n'+page.slice(genStart,genEnd),{filename:'metric-generators-extracted.js'});
const M=MIFirstMeasureTasks;
const topic={id:'metric',course:'1r',exam1r:true};
const shared=MIDifficulty.attach({course:'1eso',sense:'mesura',topics:[topic]});
const familySpecs=M.metricFamilySpecs;
assert.equal(familySpecs.length,4,'4 procediment families (not 3 raw type families)');
assert.deepEqual([1,2,3].map(level=>familySpecs.filter(f=>f.level===level).length),[2,1,1]);
assert.equal(M.metricFamilyFor(1,1).id,'escala-decimal-longitud-capacitat');
assert.equal(M.metricFamilyFor(1,4).id,'escala-decimal-longitud-capacitat');
assert.equal(M.metricFamilyFor(3,1).id,'escala-decimal-longitud-capacitat');
assert.equal(M.metricFamilyFor(2,1).id,'equivalencies-massa-factor-1000');

function parseValue(text){const m=String(text).match(/^\s*([+-]?\d+(?:[,.]\d+)?(?:\.\d{3})*)\s*/);assert(m,'numeric measure: '+text);return Number(m[1].replace(/\./g,'').replace(',','.'));}
const unitLadders={
  length:{km:0,hm:1,dam:2,m:3,dm:4,cm:5,mm:6},
  capacity:{l:0,dl:1,cl:2,ml:3},
  mass:{t:0,kg:1,g:2,mg:3}
};
const unitKinds={km:'length',hm:'length',dam:'length',m:'length',dm:'length',cm:'length',mm:'length',l:'capacity',dl:'capacity',cl:'capacity',ml:'capacity',t:'mass',kg:'mass',g:'mass',mg:'mass'};
let checked=0;const familiesSeen=new Set(),dimensionKinds=new Set(),stepVariants=new Set();
for(let type=1;type<=3;type++)for(let sample=0;sample<250;sample++){
  forcedType=type;firstDraw=true;rand=seeded(0x51a7cafe+sample*17+type*101);const q=genMetricRaw();
  assert.equal(q.type,type,'preserve historical type '+type);
  assert.equal(q.variantId.startsWith('metric-'+type+'-'),true,'variant id '+type);
  const m=q.question.match(/^Converteix (\d+) ([a-z]+) a ([a-z]+)$/);assert(m,'conversion statement: '+q.question);
  const [,raw,from,to]=m,kind=unitKinds[from];assert.equal(kind,unitKinds[to],'unit dimension preserved');
  const ladder=unitLadders[kind],steps=Math.abs(ladder[to]-ladder[from]),base=kind==='mass'?1000:10;
  const oracle=Number(raw)*Math.pow(base,ladder[to]-ladder[from]);
  assert(Math.abs(parseValue(q.correct)-oracle)<1e-9,JSON.stringify({q:q.question,correct:q.correct,oracle}));
  assert(q.correct.endsWith(' '+to),'answer unit');
  const expectedFamily=type===2?'equivalencies-massa-factor-1000':'escala-decimal-longitud-capacitat';
  const expectedLevel=1;
  assert.equal(q.metricFamily,expectedFamily,'mathematical family');
  assert.equal(q.familyId,expectedFamily,'compatibility family');
  assert.equal(q.taskDifficulty,expectedLevel,'generator level');
  assert.equal(q.diff,expectedLevel,'internal diff');
  assert.equal(shared.getDifficulty(topic,q),expectedLevel,'shared classifier');
  assert.equal(q.options.length,4,'four options');
  assert.equal(new Set(q.options).size,4,'distinct distractors');
  assert.equal(q.options.filter(x=>x===q.correct).length,1,'one correct option');
  assert(q.solution.join(' ').includes(q.correct),'solution shows answer');
  assert.equal(q.guide.length>=2,true,'conversion guidance');
  familiesSeen.add(expectedFamily);dimensionKinds.add(kind);stepVariants.add(kind+':'+steps);checked++;
}
assert(familiesSeen.has('escala-decimal-longitud-capacitat')&&familiesSeen.has('equivalencies-massa-factor-1000'));
assert(dimensionKinds.has('length')&&dimensionKinds.has('capacity')&&dimensionKinds.has('mass'));
assert([...stepVariants].some(x=>x==='length:1')&&[...stepVariants].some(x=>x.startsWith('length:')&&!x.endsWith(':1')),'length step variants');

const taskRoutes=[['mesura-mixta',2],['talls-combinats',3]];
for(const [id,level] of taskRoutes)for(let sample=0;sample<250;sample++){
  const random=seeded();const q=M.generate(id,random);
  assert.equal(q.reasoningFamily,id);assert.equal(q.metricFamily,id);assert.equal(q.familyId,id);
  assert.equal(q.diff,level);assert.equal(q.taskDifficulty,level);assert.equal(shared.getDifficulty(topic,q),level);
  assert.equal(q.options.length,4);assert.equal(new Set(q.options).size,4);assert(q.options.includes(q.correct));
  assert(q.answerCheck(q.correct),'accept canonical answer');assert(!q.answerCheck('999999'),'reject incorrect answer');
  if(id==='mesura-mixta'){
    const d=q.reasoningData,oracle=d.metres*100+d.cm-d.used;
    assert.equal(Number(q.correct),oracle,'mixed measure independent oracle');
    assert(q.solution.join(' ').includes(String(oracle)),'mixed-measure solution');
  }else{
    const d=q.reasoningData,oracle=d.A+d.B+1;
    const capacity=d.length,total=d.B*d.b+d.C*d.c;
    assert.equal(Number(q.correct),oracle,'combined cuts answer');
    assert.equal(Math.ceil(total/capacity),d.B+1,'volume lower bound for non-a pieces');
    assert.equal(d.C,d.B+1,'one c piece remains after pairing b+c');
    assert(q.solution.join(' ').includes(String(oracle)),'cuts solution');
  }
  checked++;
}
const coverage=shared.coverage(topic);
assert.deepEqual(coverage.types,[2,1,1]);assert.equal(coverage.families.length,4);assert.deepEqual(coverage.missing,[]);
assert.equal(shared.examPlan(topic).types.join(','),'2,1,1');
console.log(JSON.stringify({families:familySpecs.map(f=>({id:f.id,level:f.level,generators:f.generators})),levels:[2,1,1],samples:checked,conversionSamples:750,contextSamples:500,checks:'independent conversion factors (10/1000), decimal parsing, answer units, distractors, family metadata, shared classifier, mixed-measure arithmetic, cut minimum, 12-question coverage'},null,2));
