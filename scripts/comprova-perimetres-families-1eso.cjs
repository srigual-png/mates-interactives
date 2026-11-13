'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
globalThis.window=globalThis;
vm.runInThisContext(fs.readFileSync('assets/js/raonament-mesura-1eso.js','utf8'),{filename:'raonament-mesura-1eso.js'});
vm.runInThisContext(fs.readFileSync('assets/js/dificultat-mi.js','utf8'),{filename:'dificultat-mi.js'});
const page=fs.readFileSync('1eso/sentit-mesura.html','utf8');
const begin=page.indexOf('function genPerimetresRaw(){'),finish=page.indexOf('// ── 5. ÀREES',begin);
assert(begin>=0&&finish>begin,'perimeter generator boundaries');
function seeded(seed){let x=seed>>>0;return()=>{x=(Math.imul(x,1664525)+1013904223)>>>0;return x/4294967296;};}
let random=seeded(0x1a2b3c4d),forced=1,first=true;
globalThis.rnd=(a,b)=>{if(first){first=false;return forced;}return a+Math.floor(random()*(b-a+1));};
globalThis.fmtNum=n=>Number.isInteger(n)?String(n):String(Math.round(n*1e6)/1e6).replace('.',',');
globalThis.shuffle=a=>{const out=a.slice();for(let i=out.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[out[i],out[j]]=[out[j],out[i]];}return out;};
const ds=page.indexOf('function distractors('),de=page.indexOf('// ── DISTRACTORS ESPECÍFICS',ds);assert(ds>=0&&de>ds,'production distractor helper');vm.runInThisContext(page.slice(ds,de),{filename:'production-distractors.js'});
vm.runInThisContext(page.slice(begin,finish),{filename:'perimeter-generator-extracted.js'});
const M=MIFirstMeasureTasks,specs=M.perimeterFamilySpecs,topic={id:'perimetres',course:'1r',exam1r:true};
const D=MIDifficulty.attach({course:'1eso',sense:'mesura',topics:[topic]});
assert.equal(specs.length,13,'13 genuine mathematical families');
assert.deepEqual([1,2,3].map(n=>specs.filter(f=>f.level===n).length),[1,11,1]);
assert.equal(new Set(specs.map(f=>f.id)).size,13);
assert.deepEqual(D.coverage(topic).types,[1,11,1]);
assert.equal(new Set(D.coverage(topic).families).size,13);
assert.equal(D.examPlan(topic).slots.reduce((a,b)=>a+b,0),12);
const number=s=>{const m=String(s).match(/-?\d+(?:,\d+)?/);assert(m,'numeric answer '+s);return Number(m[0].replace(',','.'));};
const levelById=new Map(specs.map(f=>[f.id,f.level]));
let directSamples=0,circleSamples=0,irregularSamples=0,catalogSamples=0,checked=0;
for(let type=1;type<=7;type++)for(let sample=0;sample<250;sample++){
  forced=type;first=true;random=seeded(0x7711+type*337+sample*19);
  const q=genPerimetresRaw(),family=q.perimeterFamily;
  assert.equal(q.type,type);assert(levelById.has(family),'family id '+family);
  assert.equal(q.familyId,family);assert.equal(q.taskDifficulty,levelById.get(family));assert.equal(q.diff,levelById.get(family));
  assert.equal(D.getDifficulty(topic,q),levelById.get(family));
  assert.equal(q.options.length,4);assert.equal(new Set(q.options).size,4);assert(q.options.includes(q.correct));
  assert(q.guide.length>=2&&q.solution.length>=2,'guide and worked solution');
  let oracle;
  if(type===1){const m=q.question.match(/costat (\d+) (?:cm|m)/);assert(m,q.question);oracle=4*Number(m[1]);}
  else if(type===2){const m=q.question.match(/rectangle de (\d+) (?:cm|m) × (\d+)/);assert(m,q.question);oracle=2*(Number(m[1])+Number(m[2]));}
  else if(type===3){const sides=q.question.match(/\d+/g).map(Number).slice(0,3);assert.equal(sides.length,3,q.question);assert(sides[0]+sides[1]>sides[2]&&sides[0]+sides[2]>sides[1]&&sides[1]+sides[2]>sides[0]);oracle=sides.reduce((a,b)=>a+b,0);}
  else if(type===4){const m=q.question.match(/radi (\d+) (?:cm|m)/);assert(m,q.question);oracle=Math.round(2*3.14*Number(m[1])*10)/10;circleSamples++;}
  else if(type===5){const m=q.question.match(/rectangle de (\d+) × (\d+) (?:cm|m) es retira un rectangle de (\d+) × (\d+)/);assert(m,q.question);oracle=2*(Number(m[1])+Number(m[2]));}
  else if(type===6){const m=q.solution[0].match(/P = (\d+) × (\d+) = (\d+)/);assert(m,q.solution[0]);oracle=Number(m[1])*Number(m[2]);}
  else {const sides=q.question.match(/\d+/g).map(Number);assert(sides.length>=4);assert(Math.max(...sides)<sides.reduce((a,b)=>a+b,0)-Math.max(...sides),'polygon inequality');oracle=sides.reduce((a,b)=>a+b,0);irregularSamples++;}
  assert.equal(number(q.correct),oracle,JSON.stringify({type,q:q.question,correct:q.correct,oracle}));
  if(type<=3||type===6||type===7)directSamples++;
  checked++;
}
const expectedByType={1001:['tanca-area-maxima','optimitzar-area-amb-tanca'],1002:['reconstruir-costat-des-del-perimetre','reconstruir-costat-des-del-perimetre'],1003:['circumferencia-inversa','circumferencia-inversa'],1004:['contorn-entallat','contorn-entallat'],1005:['perimetre-unitats-mixtes','perimetre-unitats-mixtes'],1006:['comparar-perimetres','comparar-perimetres'],1007:['diagnosticar-error-perimetre','diagnosticar-error-perimetre'],1008:['perimetre-amb-obertura','perimetre-amb-obertura'],1009:['cost-material-per-contorn','cost-material-per-contorn'],1010:['voltes-circumferencia','voltes-circumferencia']};
const specsByGenerator=new Map(specs.flatMap(f=>f.generators.map(g=>[g,f])));
for(const [type,pair] of Object.entries(expectedByType)){
  const [catalogId,family]=pair,f=specsByGenerator.get(Number(type));assert.equal(f.id,family);
  for(let sample=0;sample<250;sample++){
    const q=M.generate(catalogId,seeded(0xb003+Number(type)*101+sample*17)),d=q.reasoningData,answer=number(q.correct);
    assert.equal(q.perimeterFamily,family);assert.equal(q.familyId,family);
    assert.equal(q.taskDifficulty,f.level);assert.equal(q.diff,f.level);assert.equal(D.getDifficulty(topic,q),f.level);
    assert.equal(q.options.length,4);assert.equal(new Set(q.options).size,4);assert(q.options.includes(q.correct));
    assert(q.guide.length>=2&&q.solution.length>=2);
    let oracle;
    switch(Number(type)){
      case 1001: oracle=d.maxWidth*(d.half-d.maxWidth);assert.equal(d.fence+d.gate,2*d.half);break;
      case 1002:
        if(d.kind===0)oracle=d.p/4;
        else if(d.kind===1)oracle=d.p/2-d.a;
        else if(d.kind===2){oracle=d.p-d.a-d.b;assert(d.a+d.b>oracle&&d.a+oracle>d.b&&d.b+oracle>d.a);}
        else oracle=d.p/d.sides;
        break;
      case 1003: oracle=d.askRadius?d.radius:d.diameter;assert.equal(Math.round(3.14*d.diameter*10)/10,d.C);break;
      case 1004: oracle=2*(d.W+d.H)+2*d.depth;assert(d.w<d.W&&d.depth<d.H);break;
      case 1005: oracle=d.cm.reduce((a,b)=>a+b,0)+100*d.m.reduce((a,b)=>a+b,0);assert(q.question.includes('expressa’l en cm'));break;
      case 1006: oracle=Math.abs(d.p1-d.p2);assert.notEqual(d.p1,d.p2);break;
      case 1007: if(d.kind===2)assert(d.a+d.b>d.c&&d.a+d.c>d.b&&d.b+d.c>d.a,'diagnostic triangle is geometrically valid');oracle=d.kind===0?2*(d.a+d.b):d.kind===1?4*d.s:d.a+d.b+d.c;break;
      case 1008: oracle=2*(d.L+d.W)-d.gate;break;
      case 1009: oracle=d.metres*d.price;break;
      case 1010: oracle=d.one*d.turns;assert.equal(Math.round(3.14*d.d),d.one);break;
    }
    assert.equal(answer,oracle,JSON.stringify({family,d,answer,oracle}));
    catalogSamples++;checked++;
  }
}
assert.equal(M.perimeterFamilyFor(1).id,'perimetre-directe');
assert.equal(M.perimeterFamilyFor(7).id,'perimetre-directe');
assert.equal(M.perimeterFamilyFor(4).level,2,'circumference reclassified to N2');
assert.equal(M.perimeterFamilyFor(1001).level,3);
console.log(JSON.stringify({ok:true,families:specs.length,levels:[1,11,1],rawSamples:checked-catalogSamples,catalogSamples,checked,directSamples,circleSamples,irregularSamples},null,2));