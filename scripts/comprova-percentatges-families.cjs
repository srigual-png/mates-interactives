/* Independent tests for Percentatges family generation and mathematical oracles. */
'use strict';
const assert=require('node:assert/strict');
require('../assets/js/raonament-numeric-1eso.js');
require('../assets/js/percentatges-1eso.js');
const M=globalThis.MIPercentatges;
assert.ok(M&&globalThis.MIFirstNumericTasks,'generator dependencies loaded');
const routes=['Q01','Q02','Q03-total','Q03-unitari','Q03-descompte','Q03-augment','Q04-augment','Q04-descompte','Q05-fraccio-pct','Q05-decimal-pct','Q05-pct-decimal','Q05-pct-fraccio','Q06','Q07','Q08','Q09','Q10','Q11','Q12','Q13'];
function rng(seed){let s=seed>>>0;return (a,b)=>{s=(Math.imul(s,1664525)+1013904223)>>>0;return a+Math.floor((s/4294967296)*(b-a+1));};}
function num(s){return Number(String(s).replace(',','.'));}
function near(actual,expected,label){assert.ok(Number.isFinite(actual)&&Math.abs(actual-expected)<1e-8,`${label}: ${actual} != ${expected}`);}
function oracle(id,q){
 const d=q.percentData;
 if(id==='Q01')return d[0]*d[1]/100;
 if(id==='Q02')return d[0]/d[1]*100;
 if(id==='Q03-total'||id==='Q03-unitari')return d[0]*100/d[1];
 if(id==='Q03-descompte'||id==='Q03-augment')return d[0];
 if(id==='Q04-augment'||id==='Q04-descompte')return d[0]*(100+(id.endsWith('augment')?d[1]:-d[1]))/100;
 if(id.startsWith('Q05-')){
   const [a,b]=d,ratio=a/b;
   if(id.endsWith('fraccio-pct'))return ratio*100;
   if(id.endsWith('decimal-pct'))return ratio*100;
   if(id.endsWith('pct-decimal'))return ratio;
   return `${a}/${b}`;
 }
 if(id==='Q06')return Math.abs(d[1]-d[0])/d[0]*100;
 if(id==='Q07')return d[0]*(100+(d[3]?d[1]:-d[1]))/100*(100-d[2])/100;
 if(id==='Q08')return d[0]*(100-d[1]-d[2])/100;
 if(id==='Q09')return Number(q.correct);
 if(id==='Q10')return d[0];
 if(id==='Q11'){const [base,p,p2,coupon]=d,a=base*(100-p),b=base*(100-p2)-coupon;return a===b?'Empat':a<b?'A':'B';}
 if(id==='Q12'){const [base,p,,up]=d;assert.equal(up,true);assert.equal(d[1],d[2]);return `El descompte s'aplica sobre ${(base*(100+p)/100).toFixed(2).replace('.',',')} €, no sobre ${base} €`;}
 if(id==='Q13')return Math.abs(d[1]-d[0]);
 throw Error('No independent oracle for '+id);
}
let generated=0, assertions=0;
for(const [routeIndex,id] of routes.entries()){
 const random=rng(0x51a700+routeIndex);
 for(let i=0;i<250;i++){
  const q=M.generate(id,random),expected=oracle(id,q);generated++;
  if(id==='Q09')assert.equal(q.type,1001,'Q09 delegates to contextual threshold generator');else assert.equal(q.type,id,id+' route id');assert.equal(q.taskDifficulty,M.levelFor(id),id+' internal level');
  assert.equal(M.familyInfo(q.familyId).level,q.taskDifficulty,id+' family catalog level');
  assert.ok(q.familyId,'family id '+id);assert.ok(q.variantId,'variant id '+id);
  assert.equal(new Set(q.options).size,4,id+' distinct options');
  assert.equal(q.options.filter(x=>M.matches(q.percentAnswer,x)).length,1,id+' one mathematically correct option');
  assert.ok(q.solution.length>=2,id+' worked solution');assert.ok(q.question.length>10,id+' prompt');
  if(id==='Q09'){
   const {p,q:rate,coupon}=q.reasoningData,x=Number(q.correct);
   assert.ok((p-rate)*x>100*coupon,'Q09 strict candidate');assert.ok((p-rate)*(x-1)<=100*coupon,'Q09 previous euro fails');
   assert.ok(q.solution.join(' ').includes(String(x-1)),'Q09 verifies predecessor');
  }else if(id==='Q11'||id==='Q12')assert.equal(q.correct,expected,id+' choice oracle');
  else if(id==='Q05-pct-fraccio')assert.equal(q.correct,expected,id+' fraction oracle');
  else near(num(q.correct),expected,id+' numerical oracle');
  assertions+=10;
 }
}
assert.equal(M.families.map(x=>x.length).join('/'),'2/8/3','catalog family counts');
assert.equal(M.familyInfo('Q10').id,'Q05','hundred grid shares representation family');
assert.equal(M.familyInfo('Q03-total').level,2,'direct reconstruction N2');
assert.equal(M.familyInfo('Q03-descompte').level,3,'price reconstruction N3');assert.equal(M.familyInfo({familyId:'Q03',type:'Q03-descompte'}).level,3,'route resolves ahead of historic family id');
const fixed=values=>(a,b)=>{const n=values.shift();assert.ok(n>=a&&n<=b,`fixed random ${n} outside ${a}..${b}`);return n;};
const over=M.generate('Q01',fixed([10,2]));assert.equal(over.correct,'50');assert.match(over.question,/125%/);assert.equal(M.matches(over.percentAnswer,'50'),true);
for(const [model,input,expected] of [
 [{kind:'number',value:'25',unit:'%'},'25%',true],
 [{kind:'number',value:'25',unit:'%'},'25',true],
 [{kind:'number',value:'25',unit:'%'},'25 €',false],
 [{kind:'number',value:'5',unit:'pp'},'5%',false],
 [{kind:'number',value:'100',unit:'€'},'100,00 €',true],
 [{kind:'number',value:'100',unit:'€'},'100,04 €',false],
 [{kind:'fraction',value:'3/8',n:3,d:8},'3/8',true],
 [{kind:'fraction',value:'3/8',n:3,d:8},'6/16',false],
 [{kind:'number',value:'12',unit:'persones',integer:true},'12,5',false]
])assert.equal(M.matches(model,input),expected,'answer parser '+input);
console.log(JSON.stringify({routes:routes.length,perRoute:250,generated,assertions,families:M.familySpecs.length,levels:M.families.map(x=>x.length),specialCases:9},null,2));
