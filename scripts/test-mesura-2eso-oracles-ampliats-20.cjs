#!/usr/bin/env node
'use strict';
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync(path.join(__dirname,'..','2eso','sentit-mesura.html'),'utf8');
const beg=html.indexOf('/* ── UTILS NUMÈRIQUES'),mark="return {topicId:'problemes',type,course:'2n'";
const endAt=html.indexOf(mark,beg),end=html.indexOf('\n}',endAt)+2;
assert(beg>=0&&endAt>beg&&end>endAt,'Generator excerpt boundaries not found');
const source=html.slice(beg,end);
let seed=0x6d3a1b77, randomCalls=0;
const math=Object.create(Math);
math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;randomCalls++;if(randomCalls>600000)throw Error('Runaway RNG / possible recursion');return seed/0x100000000;};
const ctx=vm.createContext({Math:math,console});
vm.runInContext(source,ctx,{timeout:15000});
const fn=vm.runInContext('({unitats:genUnitats2ESO,escales:genEscales2ESO,pitagores:genPitagores2ESO,perimetres:genPerimetresArees2ESO,superficies:genSuperficiesVolums2ESO,estimacio:genEstimacioError2ESO,problemes:genProblemesMesura2ESO})',ctx);
const kinds={unitats:18,escales:18,pitagores:16,perimetres:18,superficies:20,estimacio:18,problemes:20};
let total=0;const findings=[],guards={},oracleChecks={};
function cnumber(s){const x=Number(String(s).trim().replace(/\./g,'').replace(',','.'));return Number.isFinite(x)?x:NaN}
function approx(a,b,tol=1e-7){return Math.abs(a-b)<=tol*Math.max(1,Math.abs(a),Math.abs(b))}
function textOnly(s){return String(s).replace(/<[^>]*>/g,'').replace(/\s+/g,' ')}
for(const [topic,n] of Object.entries(kinds)){
 for(let type=1;type<=n;type++){
  const key=topic+':'+type;
  for(let i=0;i<40;i++){
   const before=randomCalls;let ex;
   try{ex=fn[topic](type)}catch(e){findings.push({key,iteration:i,kind:'runtime_exception',detail:e.message});continue}
   total++;
   if(ex.topicId!==topic||ex.type!==type||typeof ex.question!=='string'||!ex.question||typeof ex.correct!=='string'||!ex.correct) findings.push({key,iteration:i,kind:'missing_content'});
   if(!Array.isArray(ex.options)||ex.options.length!==4||new Set(ex.options.map(String)).size!==4) findings.push({key,iteration:i,kind:'non_unique_options',options:ex.options});
   if(Array.isArray(ex.options)&&!ex.options.includes(ex.correct))findings.push({key,iteration:i,kind:'missing_correct_option',correct:ex.correct});
   if(!Array.isArray(ex.guide)||!ex.guide.length||!Array.isArray(ex.solution)||!ex.solution.length)findings.push({key,iteration:i,kind:'missing_worked_solution'});
   const steps=randomCalls-before;if(steps>1000)findings.push({key,iteration:i,kind:'excess_random_calls',count:steps});
   if(['unitats:9','escales:15','escales:18','estimacio:17'].includes(key))guards[key]=Math.max(guards[key]||0,steps);
   // Independent arithmetic checks on visible problem data, not derived from the stored correct answer.
   const q=textOnly(ex.question);
   let expected=null;
   if(key==='unitats:18'){const m=q.match(/conté ([\d,.]+) mL/);if(m)expected=cnumber(m[1])/1000}
   if(key==='superficies:14'){const m=q.match(/de ([\d,.]+) dm × ([\d,.]+) dm × ([\d,.]+) dm/);if(m)expected=cnumber(m[1])*cnumber(m[2])*cnumber(m[3])}
   if(key==='perimetres:8'){const m=q.match(/radi ([\d,.]+) cm/);if(m)expected=3.14*cnumber(m[1])+2*cnumber(m[1])}
   if(key==='pitagores:5'){const m=q.match(/costat de ([\d,.]+) cm/);if(m)expected=cnumber(m[1])*Math.SQRT2}
   if(key==='escales:11'){const m=q.match(/([\d,.]+)\/([\d,.]+) = ([\d,.]+)\/x/);if(m)expected=cnumber(m[2])*cnumber(m[3])/cnumber(m[1])}
   if(key==='problemes:19'){const m=q.match(/de ([\d,.]+) m².*?cauen ([\d,.]+) mm/);if(m)expected=cnumber(m[1])*cnumber(m[2])}
   if(key==='estimacio:5'){const m=q.match(/és de ([\d,.]+) cm/);if(m)expected=Math.round(cnumber(m[1])*10)/10}
   if(key==='estimacio:6'){const m=q.match(/és ([\d,.]+) cm i una mesura dona ([\d,.]+) cm/);if(m)expected=Math.abs(cnumber(m[1])-cnumber(m[2]))}
   if(key==='estimacio:7'){const m=q.match(/és ([\d,.]+) i una aproximació és ([\d,.]+)/);if(m)expected=Math.abs(cnumber(m[2])-cnumber(m[1]))/cnumber(m[1])}
   if(key==='estimacio:8'){const m=q.match(/referència és ([\d,.]+) i una aproximació és ([\d,.]+)/);if(m)expected=100*Math.abs(cnumber(m[2])-cnumber(m[1]))/cnumber(m[1])}
   if(key==='estimacio:13'){const m=q.match(/error absolut de ([\d,.]+) sobre un valor de referència de ([\d,.]+)/);if(m)expected=100*cnumber(m[1])/cnumber(m[2])}
   if(key==='estimacio:15'){const m=q.match(/longitud: ([\d,.]+) cm, ([\d,.]+) cm, ([\d,.]+) cm/);if(m)expected=(cnumber(m[1])+cnumber(m[2])+cnumber(m[3]))/3}
   if(key==='estimacio:16'){const m=q.match(/indica ([\d,.]+) m/);if(m)expected=Math.round(cnumber(m[1])*10)/10}
   if(key==='perimetres:4'){const m=q.match(/té ([\d,.]+) costats de ([\d,.]+) cm/);if(m)expected=cnumber(m[1])*cnumber(m[2])}
   if(key==='perimetres:5'){const m=q.match(/radi ([\d,.]+) cm/);if(m)expected=2*3.14*cnumber(m[1])}
   if(key==='perimetres:6'){const m=q.match(/radi ([\d,.]+) cm/);if(m)expected=3.14*cnumber(m[1])**2}
   if(key==='perimetres:14'){const m=q.match(/longitud ([\d,.]+) cm/);if(m)expected=cnumber(m[1])/(2*3.14)}
   if(key==='problemes:3'){const m=q.match(/fa ([\d,.]+) × ([\d,.]+) × ([\d,.]+) cm i està ple al ([\d,.]+)%/);if(m)expected=cnumber(m[1])*cnumber(m[2])*cnumber(m[3])/1000*cnumber(m[4])/100}
   if(key==='problemes:14'){const m=q.match(/de ([\d,.]+) × ([\d,.]+) m.*?porta de ([\d,.]+) m.*?costa ([\d,.]+) €\/m/);if(m)expected=(2*(cnumber(m[1])+cnumber(m[2]))-cnumber(m[3]))*cnumber(m[4])}
   if(key==='problemes:16'){const m=q.match(/és ([\d,.]+) cm.*?A = ([\d,.]+) cm i B = ([\d,.]+) cm/);if(m)expected=Math.abs(cnumber(m[2])-cnumber(m[1]))<Math.abs(cnumber(m[3])-cnumber(m[1]))?'Mesura A':'Mesura B'}
   const expectedKeys=new Set(['unitats:18','superficies:14','perimetres:8','pitagores:5','escales:11','problemes:19','estimacio:5','estimacio:6','estimacio:7','estimacio:8','estimacio:13','estimacio:15','estimacio:16','perimetres:4','perimetres:5','perimetres:6','perimetres:14','problemes:3','problemes:14','problemes:16']);
   if(expectedKeys.has(key)&&expected===null)findings.push({key,iteration:i,kind:'oracle_parser_miss',q});
   if(expected!==null){
     oracleChecks[key]=(oracleChecks[key]||0)+1;
     if(typeof expected==='string'){
       if(ex.correct!==expected)findings.push({key,iteration:i,kind:'independent_choice_mismatch',expected,actual:ex.correct,q});
     }else{
       const got=cnumber(ex.correct.replace('%','').split(' ')[0]),rounded=Math.round((expected+Number.EPSILON)*100)/100;
       if(!approx(got,rounded,0.00002))findings.push({key,iteration:i,kind:'arithmetic_mismatch',expected:rounded,actual:got,q});
     }
   }
  }
 }
}
console.log(JSON.stringify({generator_types:128,generated:total,samples_per_type:40,independent_oracle_types:Object.keys(oracleChecks).length,independent_oracle_checks:Object.values(oracleChecks).reduce((a,b)=>a+b,0),random_calls:randomCalls,guard_random_calls_max:guards,findings_count:findings.length,findings:findings.slice(0,25)},null,2));
assert.equal(total,128*40,'Generator coverage incomplete');
assert.equal(Object.keys(oracleChecks).length,20);assert.equal(findings.length,0,'Found generative or oracle problems (details above)');
