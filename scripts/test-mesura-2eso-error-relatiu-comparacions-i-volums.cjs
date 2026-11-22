#!/usr/bin/env node
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const html=fs.readFileSync(path.join(__dirname,'..','2eso/sentit-mesura.html'),'utf8');
const a=html.indexOf('/* ── UTILS NUMÈRIQUES'),b=html.indexOf("return {topicId:'problemes',type,course:'2n'",a),c=html.indexOf('\n}',b)+2;assert(a>=0&&b>a&&c>b);
let seed=0x6148ad29,draws=0;const math=Object.create(Math);
math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;assert(++draws<500000);return seed/4294967296;};
const ctx=vm.createContext({Math:math,console});vm.runInContext(html.slice(a,c),ctx,{timeout:15000});
const gens=vm.runInContext('({estimacio:genEstimacioError2ESO,problemes:genProblemesMesura2ESO,superficies:genSuperficiesVolums2ESO})',ctx);
const clean=s=>String(s).replace(/<[^>]*>/g,'').replace(/\s+/g,' ');
const n=s=>{const value=Number(s.replace(',','.').replace(/\.$/,''));assert(Number.isFinite(value),'Invalid parsed number '+s);return value};
const match=(q,re)=>{const m=q.match(re);assert(m,'Unable to parse '+q);return m.slice(1).map(n)};
const counts={estimacio9:0,problemes16:0,superficies17:0,sameBase:0,otherBase:0,estimacio9_A:0,estimacio9_B:0,problemes16_A:0,problemes16_B:0},samples={},issues=[];
for(const [topic,type,total] of [['estimacio',9,100],['problemes',16,100],['superficies',17,400]]){
 const key=topic+type;samples[key]=[];
 for(let i=0;i<total;i++){
  const ex=gens[topic](type),q=clean(ex.question);
  try{
   let expected,variant='';
   if(topic==='estimacio'){
    const [r1,a1,r2,a2]=match(q,/Mesura A: referència ([\d,.]+), aproximació ([\d,.]+).*?Mesura B: referència ([\d,.]+), aproximació ([\d,.]+)/);
    const x=Math.abs(a1-r1)/r1,y=Math.abs(a2-r2)/r2;assert(Math.abs(x-y)>1e-10);
    expected=x<y?'La mesura A':'La mesura B';counts[expected==='La mesura A'?'estimacio9_A':'estimacio9_B']++;
   }else if(topic==='problemes'){
    const [r,x,y]=match(q,/referència d’un objecte és ([\d,.]+) cm.*?A = ([\d,.]+) cm i B = ([\d,.]+) cm/);
    const dx=Math.abs(x-r)/r,dy=Math.abs(y-r)/r;assert(Math.abs(dx-dy)>1e-10);
    expected=dx<dy?'Mesura A':'Mesura B';counts[expected==='Mesura A'?'problemes16_A':'problemes16_B']++;
   }else{
    const [x1,y1,z1,x2,y2,z2]=match(q,/A mesura ([\d,.]+)×([\d,.]+)×([\d,.]+) dm i el B ([\d,.]+)×([\d,.]+)×([\d,.]+) dm/);
    const v1=x1*y1*z1,v2=x2*y2*z2;assert.notEqual(v1,v2);
    variant=x1===x2&&y1===y2?'sameBase':'otherBase';counts[variant]++;
    expected=v1>v2?'El recipient A':'El recipient B';
    if(variant==='sameBase')assert(v1>v2?z1>z2:z2>z1);
   }
   assert.equal(ex.correct,expected,'Wrong independent comparison');
   assert.equal(ex.options.length,4);assert.equal(new Set(ex.options).size,4);assert(ex.options.includes(ex.correct));
   assert(ex.guide.length>0&&ex.solution.length>0);
   counts[key]++;if(samples[key].filter(x=>x.variant===variant).length<2)samples[key].push({q,answer:ex.correct,variant});
  }catch(e){issues.push({key,index:i,error:e.message,question:q,answer:ex.correct})}
 }
}
const result={checked:counts.estimacio9+counts.problemes16+counts.superficies17,counts,issues:issues.slice(0,12),samples};
console.log(JSON.stringify(result,null,2));
assert.equal(issues.length,0);assert.equal(result.checked,600);
assert(counts.sameBase>=2,'Expected actual same-base branch evidence');
assert(counts.otherBase>=2);
