'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const root=path.resolve(__dirname,'..'),ctx={window:{}};
vm.runInNewContext(fs.readFileSync(path.join(root,'assets/js/divisibilitat-1eso.js'),'utf8'),ctx);
const D=ctx.window.MIDivisibilitat, factor=n=>{const a=[];for(let d=2;d*d<=n;d++)while(n%d===0){a.push(d);n/=d}if(n>1)a.push(n);return a.join(' × ')};
const steps=n=>['Factorització comprovada: '+factor(n)],opts=(c,w)=>[c,...w];let seed=4927821;
const rnd=(a,b)=>{seed=(seed*1664525+1013904223)>>>0;return a+seed%(b-a+1)};
const routes=[['type 1',1,false],['type 2',2,false],['type 3',3,false],['type 4',4,false],['type 5',5,false],['type 6 directe',6,false],['type 6 pràctica inversa',6,true],['type 7',7,false],['factor-error','factor-error',false],['G','G',false],['H','H',false],['I','I',false],['F02','F02',false],['F05','F05',false],['F03','F03',false],['F08','F08',false]];
let total=0;
for(const [name,type,practice] of routes)for(let i=0;i<250;i++){
 const q=D.generate(type,rnd,opts,factor,steps,practice);
 assert(D.matches(q.divisAnswer,q.correct),name+' answer');assert.equal(q.options.length,4);assert.equal(new Set(q.options).size,4);assert.equal(q.options[0],q.correct);
 for(const wrong of q.options.slice(1))assert(!D.matches(q.divisAnswer,wrong),name+' distractor');
 assert.equal(q.diff,D.levelFor(type),name+' level');assert(q.question&&q.solution.length);total++;
}
assert.equal(D.familySpecs.length,12);const count=D.familySpecs.reduce((a,f)=>(a[f.level-1]++,a),[0,0,0]);assert.deepEqual(count,[1,8,3]);
for(const id of [1,2,3,4,5,6,7,'factor-error','G','H','I','F02','F05','F03','F08','divis-1','divis-2','divis-3','divis-4','divisibilitat-condicions','divis-raonament'])assert(D.levelFor(id),String(id));
assert.equal(D.classify(0),'Ni primer ni compost');assert.equal(D.classify(1),'Ni primer ni compost');assert.equal(D.classify(2),'Primer');assert.equal(D.classify(9),'Compost');assert.deepEqual(Array.from(D.divisors(36)),[1,2,3,4,6,9,12,18,36]);
const diff=fs.readFileSync(path.join(root,'assets/js/dificultat-mi.js'),'utf8'),page=fs.readFileSync(path.join(root,'1eso/sentit-numeric.html'),'utf8');
assert.match(diff,/t\.id==='divis'&&root\.MIDivisibilitat/);assert.match(diff,/familySpecs\.flatMap/);assert.doesNotMatch(diff,/"divis":\[\[1,2,3,4,5,6\]/);
assert.match(page,/function genDivisPractice\(type,level,random=rnd\)/);assert.match(page,/ampNextType\('divis',4\)/);assert.match(page,/MIFirstNumericTasks\.generate\('divisibilitat-condicions'/);
console.log(JSON.stringify({generatorRoutes:routes.length,each:250,total,families:D.familySpecs.length,N1:count[0],N2:count[1],N3:count[2]},null,2));
