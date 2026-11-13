'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
globalThis.window=globalThis;
function seeded(seed){let x=seed>>>0;return()=>{x=(Math.imul(x,1664525)+1013904223)>>>0;return x/4294967296;};}
let random=seeded(0x5a31),forced=1,first=true;
globalThis.rnd=(a,b)=>{if(first){first=false;return forced;}return a+Math.floor(random()*(b-a+1));};
globalThis.shuffle=a=>{const o=a.slice();for(let i=o.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[o[i],o[j]]=[o[j],o[i]];}return o;};
globalThis.fmtNum=n=>Number.isInteger(n)?String(n):String(Number(n.toFixed(6))).replace('.',',');
globalThis.distractors=(answer,unit,wrong)=>{const values=[String(answer)+' '+unit,...wrong.map(x=>String(x)+' '+unit)];return [...new Set(values)].slice(0,4);};
globalThis.answerNumEq=(a,b)=>Math.abs(Number(String(a).replace(',','.').match(/-?\d+(?:\.\d+)?/)?.[0])-Number(b))<1e-8;
function uniqueOptions(correct,values,unit=''){const arr=[String(correct)];for(const v of values){const s=String(v);if(s!==String(correct)&&!arr.includes(s))arr.push(s);}if(arr.length<4){const m=String(correct).match(/^(-?\\d+(?:,\\d+)?)(.*)$/);if(m){const v=Number(m[1].replace(',','.')),suffix=m[2];for(const x of [v*2,v/2,v*10,v/10,v*4,v/4]){const s=fmtNum(x)+suffix;if(x>0&&!arr.includes(s))arr.push(s);if(arr.length===4)break;}}}return shuffle(arr.slice(0,4));}
globalThis.numProblem=(id,family,primaryTopic,difficulty,question,answer,unit,wrongs,guide,solution)=>{const correct=fmtNum(answer)+' '+unit,values=wrongs.map(x=>fmtNum(x)+' '+unit);return {type:id,patternId:id,family,primaryTopic,difficulty,question,correct,options:uniqueOptions(correct,values),guide,solution,answerCheck:v=>answerNumEq(v,answer)};};
globalThis.textProblem=(id,family,primaryTopic,difficulty,question,correct,wrongs,accepted,guide,solution)=>({type:id,patternId:id,family,primaryTopic,difficulty,question,correct,options:uniqueOptions(correct,wrongs),guide,solution,answerCheck:v=>(accepted||[correct]).some(x=>String(v).trim().toLocaleLowerCase('ca')===String(x).trim().toLocaleLowerCase('ca'))});
for(const p of ['assets/js/raonament-mesura-1eso.js','assets/js/dificultat-mi.js'])vm.runInThisContext(fs.readFileSync(p,'utf8'),{filename:p});
const html=fs.readFileSync('1eso/sentit-mesura.html','utf8').replace(/\r\n?/g,'\n');
const begin=html.indexOf('function genMesuramentPrecisioRaw(){'),end=html.indexOf('// ── AMPLIACIÓ 2n ESO · VOLUM I CAPACITAT',begin);
assert(begin>=0&&end>begin,'raw generator boundaries');
vm.runInThisContext(html.slice(begin,end),{filename:'mesurament-generator.js'});
const topic={id:'mesurament',course:'1r',exam1r:true};
const D=MIDifficulty.attach({course:'1eso',sense:'mesura',topics:[topic]});
const M=MIFirstMeasureTasks,specs=M.measurementFamilySpecs;
assert.equal(specs.length,15,'15 mathematical procedures');
assert.deepEqual([1,2,3].map(n=>specs.filter(f=>f.level===n).length),[6,8,1]);
assert.deepEqual(D.coverage(topic).types,[6,8,1]);
assert.equal(new Set(specs.map(f=>f.id)).size,15);
const val=s=>{const m=String(s).match(/-?\d+(?:,\d+)?/);assert(m,'numeric answer '+s);return Number(m[0].replace(',','.'));};
const numbers=s=>(String(s).match(/-?\d+(?:,\d+)?/g)||[]).map(x=>Number(x.replace(',','.')));
let rawSamples=0,catalogSamples=0,bankSamples=0,checked=0,piValues=new Set();
for(let type=1;type<=8;type++)for(let j=0;j<250;j++){
 forced=type;first=true;random=seeded(0x9001+type*211+j*37);
 const q=genMesuramentPrecisioRaw(),f=M.measurementFamilyFor(type),ns=numbers(q.question);
 assert.equal(q.type,type);assert.equal(q.measurementFamily,f.id);assert.equal(q.familyId,f.id);assert.equal(q.taskDifficulty,f.level);assert.equal(q.diff,f.level);assert.equal(D.getDifficulty(topic,q),f.level);
 assert.equal(q.options.length,4,`raw options type=${type} sample=${j} ${JSON.stringify(q.options)}`);assert.equal(new Set(q.options).size,4);assert(q.options.includes(q.correct),`raw correct not in options type=${type} sample=${j}, correct=${q.correct}, options=${JSON.stringify(q.options)}`);assert(q.guide.length>=2&&q.solution.length>=1);
 if(type===1)assert(['Cinta mètrica','Peu de rei','Balança','Termòmetre','Proveta graduada','Transportador','Cronòmetre'].includes(q.correct));
 if(type===2)assert(['cm','km','g','t','ml','m²','°C','m','l','mg','graus'].includes(q.correct),'unit family excludes time');
 if(type===3){const m=q.question.match(/1 cm representa ([\d,]+) m/),d=q.question.match(/mesura (\d+) cm/);assert(m&&d);assert.equal(val(q.correct),Number(m[1].replace(',','.'))*Number(d[1]));}
 if(type===4)assert.equal(val(q.correct),Math.abs(ns[1]-ns[0]));
 if(type===5)assert.equal(val(q.correct),Math.round(Math.abs(ns[1]-ns[0])/ns[0]*100));
 if(type===6){const total=/triangle/.test(q.question)?180:360;assert.equal(val(q.correct),total-ns.reduce((a,b)=>a+b,0));}
 if(type===7){const m=q.question.match(/circumferència de ([\d,]+) cm i el seu diàmetre de (\d+)/);assert(m);const ratio=Math.round(Number(m[1].replace(',','.'))/Number(m[2])*100)/100;assert.equal(val(q.correct),ratio);assert(Math.abs(ratio-3.14)<=0.010000001);piValues.add(q.correct);}
 if(type===8)assert(['Perímetre','Àrea'].includes(q.correct));
 rawSamples++;checked++;
}
assert(piValues.size>=3,'π exercise reflects small measurement variation');
const catalogIds=['encaix-amb-tolerancies','llegir-graduacions','comparar-resolucio-instruments','escala-proporcional-mesura','reconstruir-mesura-error-absolut','error-relatiu-percentual-mesura','arrodonir-mesura','interval-incertesa-lectura','comparar-mesures-amb-incertesa','angle-gir-rellotge'];
for(const id of catalogIds)for(let j=0;j<250;j++){
 const q=M.generate(id,seeded(0x411+id.length*211+j*17)),d=q.reasoningData,f=M.measurementFamilyInfo(q.measurementFamily);
 assert(f&&q.familyId===f.id,'family association '+id);assert.equal(q.taskDifficulty,f.level);assert.equal(q.diff,f.level);assert.equal(D.getDifficulty(topic,q),f.level);
 assert.equal(q.options.length,4);assert.equal(new Set(q.options).size,4);assert(q.options.includes(q.correct),`options missing correct ${id} ${JSON.stringify(q.correct)} ${JSON.stringify(q.options)} sample=${j}`);assert(q.answerCheck(q.correct),'corrector '+id);assert(q.guide.length>=2&&q.solution.length>=1);
 let oracle;
 switch(id){
  case 'encaix-amb-tolerancies': if(d.mode===0)oracle=d.width-d.errW-d.errP-d.clearance;else oracle=d.fits?'Sí, compleix':'No, no compleix'; if(d.mode===0)assert.equal(d.maximum,oracle);else assert.equal(d.fits,d.gap>=d.clearance);break;
  case 'llegir-graduacions':oracle=d.start+d.index*d.step;assert.equal(d.step,d.span/d.divisions);break;
  case 'comparar-resolucio-instruments':oracle=d.instruments.filter(x=>x.resolution<=d.required).reduce((a,b)=>a.resolution>b.resolution?a:b).name;break;
  case 'escala-proporcional-mesura':oracle=d.mode===0?d.draw*d.factor:d.mode===1?d.real/d.factor:d.mode===2?d.draw*d.denominator/100:d.mode===3?d.real*100/d.draw:d.draw*d.real*d.factor*d.factor;break;
  case 'reconstruir-mesura-error-absolut':oracle=d.mode===0?Math.abs(d.measured-d.reference):d.mode===1?d.measured:Math.min(d.ea,d.eb);break;
  case 'error-relatiu-percentual-mesura':oracle=Math.round(Math.abs(d.measured-d.reference)/d.reference*100);break;
  case 'arrodonir-mesura':oracle=(Math.round(d.value*d.scale+1e-9)/d.scale).toFixed(d.scale===1?0:d.scale===10?1:2).replace('.',',')+' cm';break;
  case 'interval-incertesa-lectura':oracle='['+d.lo.toFixed(2).replace('.',',')+'; '+d.hi.toFixed(2).replace('.',',')+') cm';assert(Math.abs((d.hi-d.lo)-d.resolution)<1e-8);assert.equal(d.lowerIncluded,true);assert.equal(d.upperIncluded,false);break;
  case 'comparar-mesures-amb-incertesa':oracle=d.loA>=d.hiB?'A és més llarga':d.loB>=d.hiA?'B és més llarga':'No es pot determinar';break;
  case 'angle-gir-rellotge':oracle=d.minutes*6;break;
 }
 assert.equal(q.correct,String(oracle),id+' independent oracle');catalogSamples++;checked++;
}
const patternIds=['M01','M02','M03','M04','M05','S01','S02','S03','S04','T05'],patternsStart=html.indexOf('const MEASURE_PROBLEM_PATTERNS=['),patternsEnd=html.indexOf('\n];\n\nlet MEASURE_PROBLEM_PATTERN_BAG',patternsStart);
assert(patternsStart>=0&&patternsEnd>patternsStart,'context bank bounds');
vm.runInThisContext(html.slice(patternsStart,patternsEnd+3)+';',{filename:'measure-bank.js'});
const familyByBank={M01:'seleccionar-instrument',M02:'seleccionar-unitat-mesura',M03:'error-absolut',M04:'error-relatiu-percentual',M05:'error-relatiu-percentual',S01:'escala-proporcional',S02:'escala-proporcional',S03:'escala-proporcional',S04:'escala-proporcional',T05:'angle-gir-rellotge'};
const patternById=new Map(MEASURE_PROBLEM_PATTERNS.map(p=>[p.toString().match(/(?:numProblem|textProblem)\('(M\d\d|S\d\d|T\d\d)'/)?.[1],p]));
for(const id of patternIds)for(let j=0;j<250;j++){
 random=seeded(0x661+id.charCodeAt(0)*101+Number(id.slice(1))*13+j*19);
 const q=patternById.get(id)();assert.equal(String(q.type),id);assert.equal(q.primaryTopic,'mesurament');
 const family=familyByBank[id],f=M.measurementFamilyInfo(family);assert(f);
 const wrapped={...q,measurementFamily:family,familyId:family,difficultyBank:'measureProblems',difficultyKey:id};
 assert.equal(D.getDifficulty(topic,wrapped),f.level,'bank classifier '+id);
 assert(q.options.length===4&&new Set(q.options).size===4,'bank distractors '+id);assert(q.answerCheck(q.correct),'bank corrector '+id);
 const ns=numbers(q.question);let oracle;
 if(id==='M01')assert(['Cinta mètrica','Peu de rei','Balança','Termòmetre','Proveta graduada','Transportador','Cronòmetre'].includes(q.correct));
 if(id==='M02')assert(!/classe|anunci|segon|minut|hora|dia/i.test(q.question),'time unit not duplicated');
 if(id==='M03')assert.equal(val(q.correct),Math.abs(ns[1]-ns[0]));
 if(id==='M04')assert.equal(val(q.correct),Math.round(Math.abs(ns[1]-ns[0])/ns[0]*100));
 if(id==='M05'){const m=q.question.match(/A té valor de referència (\d+) cm i error absolut ([\d,]+) cm\. La mesura B té valor de referència (\d+) cm i error absolut ([\d,]+) cm/);assert(m);const pa=Number(m[2].replace(',','.'))/Number(m[1])*100,pb=Number(m[4].replace(',','.'))/Number(m[3])*100;oracle=pa<pb?'la mesura A':pb<pa?'la mesura B':'les dues mesures';assert.equal(q.correct,oracle);}
 if(id==='S01'){const m=q.question.match(/1 cm representa (\d+) m real(?:s)?\. Una paret hi mesura (\d+) cm/);assert(m);assert.equal(val(q.correct),Number(m[1])*Number(m[2]));}
 if(id==='S02'){const m=q.question.match(/1 cm representa (\d+) m reals\. Una sala fa (\d+) m/);assert(m);assert.equal(val(q.correct),Number(m[2])/Number(m[1]));}
 if(id==='S03'){const scale=q.question.match(/escala 1:([\d.]+)/),dist=q.question.match(/separades (\d+) cm/);assert(scale&&dist);assert.equal(val(q.correct),Number(scale[1].replace(/\./g,''))*Number(dist[1])/100000);}
 if(id==='S04'){const m=q.question.match(/1 cm representa (\d+) m\. Una habitació hi fa (\d+) cm per (\d+) cm/);assert(m);assert.equal(val(q.correct),Number(m[1])**2*Number(m[2])*Number(m[3]));}
 if(id==='T05'){const m=q.question.match(/avança (\d+) minuts/);assert(m);assert.equal(val(q.correct),Number(m[1])*6);}
 bankSamples++;checked++;
}
console.log(JSON.stringify({ok:true,families:specs.length,levels:[6,8,1],rawRoutes:8,rawSamples,catalogRoutes:catalogIds.length,catalogSamples,bankRoutes:patternIds.length,bankSamples,checked,piApproximationValues:[...piValues]},null,2));
