'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
globalThis.window=globalThis;
vm.runInThisContext(fs.readFileSync('assets/js/raonament-mesura-1eso.js','utf8'),{filename:'raonament-mesura-1eso.js'});
vm.runInThisContext(fs.readFileSync('assets/js/dificultat-mi.js','utf8'),{filename:'dificultat-mi.js'});
const page=fs.readFileSync('1eso/sentit-mesura.html','utf8');
const distractorStart=page.indexOf('function distractors('),distractorEnd=page.indexOf('// ── DISTRACTORS ESPECÍFICS',distractorStart);
const genStart=page.indexOf('function genConversionsRaw(){'),genEnd=page.indexOf('function genTempsRaw(){',genStart);
assert(distractorStart>=0&&distractorEnd>distractorStart,'common distractor function exists');
assert(genStart>=0&&genEnd>genStart,'conversion generator exists');
function seeded(initial=0x4c0a7e){let x=initial>>>0;return ()=>{x=(Math.imul(x,1664525)+1013904223)>>>0;return x/4294967296;};}
let rand=seeded(),forcedType=1,firstDraw=true;
globalThis.rnd=(a,b)=>{if(firstDraw){firstDraw=false;return forcedType;}return a+Math.floor(rand()*(b-a+1));};
globalThis.fmtNum=n=>Number.isInteger(n)?String(n):String(Math.round(n*1000000)/1000000).replace('.',',');
globalThis.shuffle=a=>{const out=a.slice();for(let i=out.length-1;i>0;i--){const j=Math.floor(rand()*(i+1));[out[i],out[j]]=[out[j],out[i]];}return out;};
vm.runInThisContext(page.slice(distractorStart,distractorEnd)+'\n'+page.slice(genStart,genEnd),{filename:'conversions-generator-extracted.js'});
const M=MIFirstMeasureTasks,topic={id:'conversions',course:'1r',exam1r:true};
const shared=MIDifficulty.attach({course:'1eso',sense:'mesura',topics:[topic]});
const specs=M.conversionsFamilySpecs;
assert.equal(specs.length,7,'seven real families');
assert.deepEqual([1,2,3].map(level=>specs.filter(f=>f.level===level).length),[1,5,1]);
assert.equal(M.conversionsFamilyInfo('mesura-mixta').id,M.metricFamilyInfo('mesura-mixta').id,'mixed-measure family shared with metric');
assert.deepEqual(M.conversionsFamilyFor(1).id,M.conversionsFamilyFor(4).id,'area context is a variant of area conversion');
const coverage=shared.coverage(topic);
assert.deepEqual(coverage.types,[1,5,1]);assert.equal(new Set(coverage.families).size,7);assert.deepEqual(coverage.missing,[]);
assert.equal(shared.examPlan(topic).types.join(','),'1,5,1','exam levels follow reviewed families');
const areaToBase={'km²':1e6,'m²':1,'dm²':0.01,'cm²':0.0001,'mm²':0.000001};
const unitToBase={km:1000,m:1,cm:0.01,kg:1000,g:1,l:1,dl:0.1,cl:0.01,ml:0.001,'km²':1e6,'m²':1,'dm²':0.01,'cm²':0.0001,'mm²':0.000001};
const number=s=>{const m=String(s).match(/-?[0-9]+(?:,[0-9]+)?/);assert(m,'numeric value in '+s);return Number(m[0].replace(',','.'));};
let checked=0;const baseFamilies=new Set();
for(let type=1;type<=4;type++)for(let sample=0;sample<250;sample++){
  forcedType=type;firstDraw=true;rand=seeded(0x4c0a7e+type*1009+sample*31);
  const q=genConversionsRaw();
  assert.equal(q.type,type);
  const expected=type===1||type===4?'conversio-superficies':type===2?'mesura-mixta':'comparar-equivalencies';
  const level=M.conversionsFamilyInfo(expected).level;
  assert.equal(q.conversionsFamily,expected);assert.equal(q.familyId,expected);
  assert.equal(q.taskDifficulty,level);assert.equal(q.diff,level);assert.equal(shared.getDifficulty(topic,q),level);
  assert.equal(q.options.length,4);assert.equal(new Set(q.options).size,4);assert(q.options.includes(q.correct));
  assert(q.guide.length>=2&&q.solution.length>=2);
  if(type===1||type===4){
    const m=type===1?q.question.match(/Converteix ([\d,]+) (.+) a (.+)$/):q.question.match(/([\d,]+) (km²|m²|dm²|cm²|mm²)/);
    assert(m,'area conversion prompt: '+q.question);
    const val=number(m[1]),from=m[2],to=type===1?m[3]:q.correct.match(/ (km²|m²|dm²|cm²|mm²)$/)?.[1],oracle=val*areaToBase[from]/areaToBase[to];
    assert(Math.abs(number(q.correct)-oracle)<1e-8,JSON.stringify({q:q.question,correct:q.correct,oracle}));
    assert(q.correct.endsWith(' '+to),'area answer unit');
    if(from!==to)assert(Math.abs(oracle/val-areaToBase[from]/areaToBase[to])<1e-10,'quadratic area factor');
  }else if(type===2){
    const m=q.question.match(/^(?:[^0-9]+)(\d+) ([a-z]+) i (\d+) ([a-z]+)\. Quants ([a-z]+) són en total\?$/);assert(m,'mixed-measure prompt');
    const oracle=Number(m[1])*unitToBase[m[2]]/unitToBase[m[5]]+Number(m[3])*unitToBase[m[4]]/unitToBase[m[5]];
    assert.equal(number(q.correct),oracle,'mixed-measure arithmetic oracle');
    assert(q.correct.endsWith(' '+m[5]));
  }else{
    const m=q.question.match(/^Són iguals ([\d,]+) (.+) i ([\d,]+) (.+)\?$/);assert(m,'equivalence comparison prompt');
    const left=number(m[1])*unitToBase[m[2]],right=number(m[3])*unitToBase[m[4]],equal=Math.abs(left-right)<1e-9;
    assert.equal(q.correct,equal?'Sí, són iguals':'No, no són iguals',JSON.stringify({prompt:q.question,left,right,equal,correct:q.correct,solution:q.solution}));
    assert(q.solution.join(' ').includes(m[3]+' '+m[4]),'solution shows comparison input');
  }
  baseFamilies.add(expected);checked++;
}
assert.deepEqual([...baseFamilies].sort(),['comparar-equivalencies','conversio-superficies','mesura-mixta'].sort());
const routes=[['carrega-amb-dos-limits',3],['ordenar-mesures',2],['operar-arees-mixtes',2],['diagnosticar-error-superficie',2]];
for(const [id,level] of routes)for(let sample=0;sample<250;sample++){
  const q=M.generate(id,seeded(0x1920+sample*29+id.length));
  const family=M.conversionsFamilyFor(q.type);
  assert.equal(q.reasoningFamily,id);assert.equal(q.conversionsFamily,family.id);assert.equal(q.familyId,family.id);
  assert.equal(q.taskDifficulty,level);assert.equal(q.diff,level);assert.equal(shared.getDifficulty(topic,q),level);
  assert.equal(q.options.length,4);assert.equal(new Set(q.options).size,4);assert(q.options.includes(q.correct));
  assert(q.answerCheck(q.correct));assert(!q.answerCheck('99999999'));
  if(id==='carrega-amb-dos-limits'){
    const d=q.reasoningData,valid=[];
    for(let a=0;a<=d.slots;a++)for(let b=0;b<=d.slots-a;b++)if(a*d.massA+b*d.massB<=d.limit)valid.push({a,b,lit:a*d.litA+b*d.litB});
    const max=Math.max(...valid.map(x=>x.lit));
    assert.equal(Number(q.correct),max,'dual-limit independent optimum');
    assert.equal(valid.filter(x=>x.lit===max).length,1,'unique optimal litre result');
  }else if(id==='ordenar-mesures'){
    const rows=q.reasoningData.rows.slice().sort((a,b)=>a.dm2-b.dm2);
    assert.equal(Number(q.correct),rows[1].dm2,'area median oracle');
    assert.equal(new Set(rows.map(x=>x.dm2)).size,3,'distinct sortable measures');
    assert.deepEqual(q.reasoningData.ordered,rows.map(x=>x.label));
  }else if(id==='operar-arees-mixtes'){
    const d=q.reasoningData;
    assert.equal(Number(q.correct),d.m2*100+d.dm2-d.removed,'mixed area operation oracle');
    assert(Number(q.correct)>0);
  }else{
    const d=q.reasoningData;
    assert.equal(Number(q.correct),d.factor,'surface error factor oracle');
    assert.equal(d.reported,d.value*d.wrong);assert.notEqual(d.wrong,d.factor);
  }
  checked++;
}
console.log(JSON.stringify({families:specs.map(f=>({id:f.id,level:f.level,generators:f.generators})),levels:coverage.types,samples:checked,rawSamples:1000,taskSamples:1000,assertions:'area factors/inverse directions, decimals and units; mixed-measure arithmetic; comparison equivalence; internal/shared levels; unique dual-limit optimum; ordering, area operations, error-factor diagnosis; distractors, feedback, coverage'},null,2));
