'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
globalThis.window=globalThis;
vm.runInThisContext(fs.readFileSync('assets/js/raonament-mesura-1eso.js','utf8'),{filename:'raonament-mesura-1eso.js'});
vm.runInThisContext(fs.readFileSync('assets/js/dificultat-mi.js','utf8'),{filename:'dificultat-mi.js'});
const page=fs.readFileSync('1eso/sentit-mesura.html','utf8');
const genStart=page.indexOf('function genTempsRaw(){'),genEnd=page.indexOf('function genPerimetresRaw(){',genStart);
assert(genStart>=0&&genEnd>genStart,'time generator exists');
function seeded(initial=0x715e){let x=initial>>>0;return ()=>{x=(Math.imul(x,1664525)+1013904223)>>>0;return x/4294967296;};}
let rand=seeded(),forcedType=1,firstDraw=true;
globalThis.rnd=(a,b)=>{if(firstDraw){firstDraw=false;return forcedType;}return a+Math.floor(rand()*(b-a+1));};
globalThis.fmtNum=n=>Number.isInteger(n)?String(n):String(Math.round(n*1000000)/1000000).replace('.',',');
globalThis.shuffle=a=>{const out=a.slice();for(let i=out.length-1;i>0;i--){const j=Math.floor(rand()*(i+1));[out[i],out[j]]=[out[j],out[i]];}return out;};
vm.runInThisContext(page.slice(genStart,genEnd),{filename:'time-generator-extracted.js'});
const M=MIFirstMeasureTasks,topic={id:'temps',course:'1r',exam1r:true},D=MIDifficulty.attach({course:'1eso',sense:'mesura',topics:[topic]}),specs=M.timeFamilySpecs;
assert.equal(specs.length,10,'ten real time families');
assert.deepEqual([1,2,3].map(level=>specs.filter(f=>f.level===level).length),[2,7,1]);
assert.deepEqual(D.coverage(topic).types,[2,7,1]);assert.equal(new Set(D.coverage(topic).families).size,10);
assert.deepEqual(D.coverage(topic).missing,[]);
assert.equal(D.examPlan(topic).types.join(','),'2,7,1');
const unitsToBase={segons:1,minuts:60,hores:3600,dies:86400,setmanes:604800,mesos:1,anys:12};
const number=s=>{const m=String(s).match(/-?[0-9]+(?:,[0-9]+)?/);assert(m,'numeric result in '+s);return Number(m[0].replace(',','.'));};
const fmtDuration=n=>{const h=Math.floor(n/60),m=n%60;return h?(m?`${h} h ${m} min`:`${h} h`):`${m} min`;};
let checked=0,multistage=0;const baseFamilies=new Set();
for(let type=1;type<=5;type++)for(let sample=0;sample<250;sample++){
  forcedType=type;firstDraw=true;rand=seeded(0x715e+type*821+sample*23);
  const q=genTempsRaw(),expected=type===1||type===5?'equivalencies-temporals':type===2?'hora-final':type===3?'durada-entre-hores':'descompondre-durades',level=M.timeFamilyInfo(expected).level;
  assert.equal(q.type,type);assert.equal(q.timeFamily,expected);assert.equal(q.familyId,expected);
  assert.equal(q.taskDifficulty,level);assert.equal(q.diff,level);assert.equal(D.getDifficulty(topic,q),level);
  assert.equal(q.options.length,4);assert.equal(new Set(q.options).size,4);assert(q.options.includes(q.correct));
  assert(q.guide.length>=2&&q.solution.length>=2);
  if(type===1){
    const m=q.question.match(/^Converteix (\d+) (\S+) a (\S+)$/);assert(m,'conversion prompt '+q.question);const singular={hores:'hora',minuts:'minut',segons:'segon',dies:'dia',setmanes:'setmana',anys:'any',mesos:'mes'};if(Number(m[1])===1)assert.equal(m[2],singular[m[2]]||m[2],'singular source unit');const answer=q.correct.match(/^(\d+(?:,\d+)?) (\S+)$/);assert(answer,'conversion answer '+q.correct);if(answer[1]==='1')assert.equal(answer[2],singular[answer[2]]||answer[2],'singular target unit');
    const [_,raw,from,to]=m,fromUnit=Object.entries(singular).find(([,s])=>s===from)?.[0]||from,oracle=Number(raw)*unitsToBase[fromUnit]/unitsToBase[to];
    assert(Math.abs(number(q.correct)-oracle)<1e-8,JSON.stringify({prompt:q.question,correct:q.correct,oracle}));
    const answerUnit=number(q.correct)===1?(singular[to]||to):to;assert(q.correct.endsWith(' '+answerUnit),'conversion output unit');if(q.solution[0].includes(' = '))multistage++;
  }else if(type===2){
    const m=q.question.match(/comença a les (\d{1,2}):(\d{2}) h i dura (?:(\d+) h )?(\d+) min\. A quina hora acaba( de l’endemà)?\?/);assert(m,'final-time prompt '+q.question);
    const start=Number(m[1])*60+Number(m[2]),duration=Number(m[3]||0)*60+Number(m[4]),end=start+duration,expectedClock=`${String(Math.floor(end/60)%24).padStart(2,'0')}:${String(end%60).padStart(2,'0')} h`;
    assert.equal(q.correct,expectedClock,'start + duration oracle');
    assert.equal(Boolean(m[5]),end>=1440,'next-day is explicit exactly when needed');
  }else if(type===3){
    const m=q.question.match(/comença a les (\d{1,2}):(\d{2}) h i acaba a les (\d{1,2}):(\d{2}) h( de l’endemà)?\?/);assert(m,'duration prompt '+q.question);
    const start=Number(m[1])*60+Number(m[2]),finish=Number(m[3])*60+Number(m[4])+(m[5]?1440:0),duration=finish-start;
    assert(duration>0);assert.equal(q.correct,fmtDuration(duration),'elapsed-time oracle');
  }else if(type===4){
    const mins=q.question.match(/^Expressa (\d+) minuts en hores i minuts$/),secs=q.question.match(/^Expressa (\d+) segons en minuts i segons$/);
    if(mins){const total=Number(mins[1]),h=Math.floor(total/60),m=total%60;assert.equal(q.correct,`${h} h ${m} min`);assert.equal(h*60+m,total);}
    else{assert(secs,'duration decomposition prompt '+q.question);const total=Number(secs[1]),m=Math.floor(total/60),s=total%60;assert.equal(q.correct,`${m} min ${s} s`);assert.equal(m*60+s,total);}
  }else{
    const m=q.question.match(/^Quant(?:s|es) (minuts|segons|dies|hores|mesos) (?:té|tenen) (.+)\?$/);assert(m,'equivalence prompt '+q.question);
    const facts={'un dia':'1440 min','1 hora':'3600 s','un any no bixest':'365 dies','un dia sencer':'86400 s','una setmana':'168 h','2 hores':'120 min','3 setmanes':'21 dies','2 anys':'24 mesos','5 minuts':'300 s','2 dies':'48 h','mitja hora':'30 min','un quart d’hora':'15 min'};
    const key=m[2];assert.equal(q.correct,facts[key],'unit equivalence fact');
  }
  baseFamilies.add(expected);checked++;
}
assert.deepEqual([...baseFamilies].sort(),['descompondre-durades','durada-entre-hores','equivalencies-temporals','hora-final'].sort());assert(multistage>0,'multi-stage conversion samples reached');
const routes=[['transbordament-invers',3],['reconstruir-hora-inicial',2],['operar-durades-i-pausas',2],['detectar-error-base-sexagesimal',2],['seleccionar-unitat-temporal',1],['comparar-durades',2]];
for(const [id,level] of routes)for(let sample=0;sample<250;sample++){
  const q=M.generate(id,seeded(0x9012+sample*37+id.length)),family=M.timeFamilyFor(q.type);
  assert.equal(q.reasoningFamily,id);assert.equal(q.timeFamily,family.id);assert.equal(q.familyId,family.id);
  assert.equal(q.taskDifficulty,level);assert.equal(q.diff,level);assert.equal(D.getDifficulty(topic,q),level);
  assert.equal(q.options.length,4);assert.equal(new Set(q.options).size,4);assert(q.options.includes(q.correct));
  assert(q.answerCheck(q.correct));assert(!q.answerCheck('99999999'));
  const d=q.reasoningData;
  if(id==='transbordament-invers'){
    const feasible=[];
    for(let depart=d.base;depart<=d.deadline;depart+=d.periodA){const ready=depart+d.rideA+d.walk,nextB=d.base+d.offset+Math.max(0,Math.ceil((ready-d.base-d.offset)/d.periodB))*d.periodB;if(nextB+d.rideB<=d.deadline)feasible.push({depart,nextB,end:nextB+d.rideB});}
    const best=feasible[feasible.length-1];
    assert.equal(Number(q.correct),best.depart-d.base,'latest valid A departure oracle');
    assert(!feasible.some(x=>x.depart>best.depart),'unique latest valid departure');
  }else if(id==='reconstruir-hora-inicial'){
    assert.equal(Number(q.correct),1440+d.after-d.duration,'inverse clock reconstruction');
    assert.equal(Number(q.correct),d.start,'original start clock');
    assert(d.startHour>=21&&q.question.includes('l’endemà'),'explicit overnight wording');
  }else if(id==='seleccionar-unitat-temporal'){
    assert.equal(q.correct,d.unit);assert(['segons','minuts','hores','dies'].includes(q.correct));assert(!q.answerCheck('anys'));assert(q.question.includes(d.context));
  }else if(id==='comparar-durades'){
    const longest=d.rows.reduce((a,b)=>a.minutes>b.minutes?a:b);assert.equal(Number(q.correct),longest.minutes);assert.equal(new Set(d.rows.map(x=>x.minutes)).size,3);assert(q.question.includes('Respon en minuts'));
  }else if(id==='operar-durades-i-pausas'){
    const total=d.activities.reduce((a,b)=>a+b,0)+d.breaks.reduce((a,b)=>a+b,0);
    assert.equal(Number(q.correct),total,'activities and pauses total');
    assert.equal(d.answer,total);
  }else{
    assert.equal(Number(q.correct),d.hours*60+d.minutes,'base-60 correction');
    assert.equal(d.reported,d.hours*100+d.minutes,'reported base-100 error');
    assert.notEqual(d.reported,Number(q.correct));
  }
  checked++;
}
console.log(JSON.stringify({families:specs.map(f=>({id:f.id,level:f.level,generators:f.generators})),levels:D.coverage(topic).types,samples:checked,rawSamples:1250,taskSamples:1500,multistageSamples:multistage,assertions:'60/24/7/12/3600 conversions and inverses; decimal outputs; HH:MM arithmetic and overnight labeling; duration subtraction; base-60 decomposition; unique transit departure; multi-activity totals; unit-choice and mixed-duration ordering; metadata, levels, distractors and coverage'},null,2));
