#!/usr/bin/env node
'use strict';
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync(path.join(__dirname,'..','2eso/sentit-mesura.html'),'utf8');
const first=html.indexOf('/* ── UTILS NUMÈRIQUES'),last=html.indexOf("return {topicId:'problemes',type,course:'2n'",first),end=html.indexOf('\n}',last)+2;
assert(first>=0&&last>first&&end>last);
let seed=0x413feb97,calls=0;const M=Object.create(Math);
M.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;assert(++calls<500000);return seed/4294967296};
const ctx=vm.createContext({Math:M,console});
vm.runInContext(html.slice(first,end),ctx,{timeout:15000});
const gen=vm.runInContext('genPitagores2ESO',ctx);
const clean=s=>String(s).replace(/<[^>]+>/g,'').replace(/\s+/g,' ');
const vals=(s,re)=>{const a=s.match(re);assert(a,'No match: '+s);return a.slice(1).map(Number)};
function oracle(type,q){
 if(type===3||type===15&&q.includes('hipotenusa')){
  const [c,a]=vals(q,/hipotenusa (?:mesura )?(\d+) cm i un catet (?:de )?(\d+) cm/);
  return {value:Math.sqrt(c*c-a*a),unit:'cm',branch:'inverse'};
 }
 if(type===10){const [base,side]=vals(q,/base de (\d+) cm i costats iguals de (\d+) cm/);return {value:base*Math.sqrt(side*side-(base/2)**2)/2,unit:'cm²',branch:'area'};}
 if(type===11){const [c,a]=vals(q,/diagonal de (\d+) cm i un costat de (\d+) cm/);return {value:2*(a+Math.sqrt(c*c-a*a)),unit:'cm',branch:'inverse_perimeter'};}
 if(type===12){const [a,b]=vals(q,/recórrer (\d+) m en una direcció i després (\d+) m perpendicularment/);return {value:a+b-Math.sqrt(a*a+b*b),unit:'m',branch:'savings'};}
 if(type===14){const [a,b,extra]=vals(q,/punt a (\d+) m de la base d’un pal i un punt situat a (\d+) m d’altura, cal deixar (\d+) m addicionals/);return {value:Math.sqrt(a*a+b*b)+extra,unit:'m',branch:'anchors'};}
 if(type===15){const [a,b]=vals(q,/rectangle de (\d+) cm × (\d+) cm/);return {value:Math.sqrt(a*a+b*b),unit:'cm',branch:'diagonal'};}
 throw Error('No oracle: '+type+' '+q);
}
const types=[3,10,11,12,14,15],seen={},examples={},failures=[];
for(const t of types){seen[t]=0;examples[t]=[];for(let i=0;i<40;i++){
 const ex=gen(t),q=clean(ex.question);
 try{
  const o=oracle(t,q),m=String(ex.correct).match(/^([\d,.]+)\s+(cm²|cm|m)$/);
  assert(m,'Malformed answer '+ex.correct);assert.equal(m[2],o.unit);
  assert(Math.abs(Number(m[1].replace(',','.'))-o.value)<.005001,'Expected '+o.value+' actual '+ex.correct);
  assert.equal(ex.options.length,4);assert.equal(new Set(ex.options).size,4);assert(ex.options.includes(ex.correct));
  assert(ex.guide.length&&ex.solution.length);
  seen[t]++;if(i<2)examples[t].push({question:q,answer:ex.correct,branch:o.branch,guide:ex.guide});
 }catch(e){failures.push({type:t,iteration:i,error:e.message,q,answer:ex.correct})}
}}
assert.equal(Object.values(seen).reduce((a,b)=>a+b,0),240,'Less than 240 validated instances');
assert.equal(failures.length,0,JSON.stringify(failures.slice(0,5)));
assert(examples[15].length===2);
console.log(JSON.stringify({types:6,checked:240,by_type:seen,failures:0,samples:examples},null,2));
