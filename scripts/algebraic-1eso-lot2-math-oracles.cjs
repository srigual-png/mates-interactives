'use strict';
const assert=require('node:assert/strict');
const {makeHarness,clean,equivalent}=require('./algebraic-1eso-families-test-helper.cjs');

const SAMPLES=250;
function uniqueChoices(q){
  assert.equal(q.options?.length,4,'quatre opcions');
  assert.equal(new Set(q.options.map(String)).size,4,'opcions sense duplicats');
  assert.equal(q.options.filter(x=>String(x)===String(q.correct)).length,1,'una resposta correcta exacta');
  assert(q.guide?.length>=2&&q.solution?.length,'pistes i solució presents');
}
function assertFamily(h,topic,q,expected){
  const f=h.families.familyFor(topic,q);
  assert(f,'família assignada a '+topic.id+'/'+q.type);
  if(expected)assert.equal(f.id,expected);
  const d=h.D.annotate(topic,q);
  assert.equal(d.familyId,f.id);assert.equal(d.diff,f.level);assert.equal(d.taskDifficulty,f.level);
  assert.equal(h.D.getDifficulty(topic,q),f.level,'classificador compartit coincideix');
  return f;
}
function validateCatalog(h){
  const rows=['traduccio','patrons','monomis','simplificacio','equacions','computacional'].flatMap(topic=>h.families.topicSpecs(topic).map(f=>({topic,f})));
  const byId=new Map();for(const row of rows){const list=byId.get(row.f.id)||[];list.push(row);byId.set(row.f.id,list);}
  for(const [id,list] of byId)if(list.length>1)for(const row of list)for(const other of list)if(row!==other)assert(row.f.sharedWith?.includes(other.topic),'família compartida declarada: '+id);
  const registry=JSON.parse(require('node:fs').readFileSync(require('node:path').join(__dirname,'../docs/auditoria/families-validades.json'),'utf8'));
  const existing=new Set(registry.topics.flatMap(t=>t.families.map(f=>f.id)));
  for(const row of rows.filter(x=>['simplificacio','equacions','computacional'].includes(x.topic)))assert(!existing.has(row.f.id),'ID Lot 2 no reutilitza registre anterior: '+row.f.id);
  return {localFamilies:rows.length,uniqueIds:byId.size,registryConflicts:0};
}
function answer(q){return q.answer?.val??q.correct;}
function numeric(value){const m=String(value).replace(/−/g,'-').match(/-?\d+(?:[.,]\d+)?/);assert(m,'resposta numèrica: '+value);return Number(m[0].replace(',','.'));}
function equation(text){
  const normalized=clean(text).replace(/−/g,'-').replace(/·/g,'*');
  const m=normalized.match(/(?:^|\b)(?:(\d+)\s*\+\s*)?(\d*)\s*x\s*([+-])?\s*(\d+)?\s*=\s*(-?\d+)/i);
  if(!m)return null;
  return {a:Number(m[2]||1),b:Number(m[1]||0)+(m[4]?Number(m[4])*(m[3]==='-'?-1:1):0),c:Number(m[5])};
}
function verifyLinearEquation(q){
  const candidates=[q.question,...(q.solution||[])].filter(line=>String(line).includes('=')&&!/[·÷]/.test(line));
  const eq=candidates.map(equation).find(Boolean),source=candidates.join(' | ');
  assert(eq,'equació lineal recuperada de l’enunciat/solució: '+clean(source));
  const x=numeric(answer(q));assert.equal(eq.a*x+eq.b,eq.c,'solució satisfà l’equació: '+clean(source)+'; x='+x);
}
function expressionFromQuestion(text){
  const s=clean(text).replace(/−/g,'-');
  let m=s.match(/(\d+)x\s*\+\s*(\d+)x\s*-\s*(\d+)x/);
  if(m)return {expr:`${Number(m[1])+Number(m[2])-Number(m[3])}x`,x:null};
  m=s.match(/(\d+)x\s*\+\s*(\d+)x\s*\+\s*(\d+)x/);
  if(m)return {expr:`${Number(m[1])+Number(m[2])+Number(m[3])}x`,x:null};
  m=s.match(/(\d+)x\s*\+\s*(\d+)\s*\+\s*(\d+)x\s*-\s*(\d+)/);
  if(m)return {expr:`${Number(m[1])+Number(m[3])}x+${Number(m[2])-Number(m[4])}`,x:null};
  m=s.match(/(\d+)x\s*-\s*(\d+)x\s*\+\s*(\d+)\s*\+\s*(\d+)x\s*-\s*(\d+)/);
  if(m)return {expr:`${Number(m[1])+Number(m[4])}x+${Number(m[3])-Number(m[5])}`,x:null};
  m=s.match(/(\d+)x\s*-\s*(\d+)x\s*\+\s*(\d+)x/);
  if(m)return {expr:`${Number(m[1])-Number(m[2])+Number(m[3])}x`,x:null};
  m=s.match(/(\d+)x\s*-\s*(\d+)x\s*\+\s*(\d+)/);
  if(m)return {expr:`${Number(m[1])-Number(m[2])}x+${Number(m[3])}`,x:null};
  m=s.match(/recull\s+(\d+)x taps.*?altre\s+(\d+)x taps/i);
  if(m)return {expr:`${Number(m[1])+Number(m[2])}x`,x:null};
  m=s.match(/(\d+)x\s*\+\s*(\d+)x\s*-\s*(\d+)x/);
  if(m)return {expr:`${Number(m[1])+Number(m[2])-Number(m[3])}x`,x:null};
  m=s.match(/(\d+)x\s*\+\s*(\d+)x/);
  if(m)return {expr:`${Number(m[1])+Number(m[2])}x`,x:null};
  m=s.match(/(\d+)x\s*-\s*(\d+)x/);
  if(m)return {expr:`${Number(m[1])-Number(m[2])}x`,x:null};
  m=s.match(/x\s*\+\s*(\d+)x(?:\s*\+\s*(\d+))?/);
  if(m)return {expr:`${1+Number(m[1])}x${m[2]?`+${m[2]}`:''}`,x:null};
  return null;
}
function verifySimplification(q){
  const parsed=expressionFromQuestion(q.question);
  assert(parsed,'expressió simplificable reconeguda: '+clean(q.question));
  if(/calcula el valor per x\s*=\s*(\d+)/i.test(clean(q.question))){
    const x=Number(clean(q.question).match(/calcula el valor per x\s*=\s*(\d+)/i)[1]);
    const m=parsed.expr.match(/^(-?\d+)x$/);assert(m);assert.equal(numeric(answer(q)),Number(m[1])*x,'avaluació posterior a simplificar');
  }else assert(equivalent(answer(q),parsed.expr),'expressió equivalent al resultat reduït');
}
function testSimplificacio(h){
  const topic=h.topics.simplificacio,baseTypes=[1,3,5,6];let count=0;
  for(const type of baseTypes)for(let i=0;i<SAMPLES;i++){
    const q=h.sandbox.genSimplificacio(type);uniqueChoices(q);assertFamily(h,topic,q);verifySimplification(q);count++;
  }
  const bank=h.patterns.filter(p=>p.topicId==='simplificacio'||p.id==='M3'||p.id==='M4');
  assert.deepEqual(bank.map(p=>p.id).sort(),['M3','M4','S1','S2','S3','S4','S5','S6']);
  for(const p of bank)for(let i=0;i<SAMPLES;i++){const q=p.gen();assertFamily(h,topic,q);verifySimplification(q);assert(q.answer?.check,'corrector d’expressió del banc');count++;}
  const levels=Array.from(h.D.coverage(topic).types);
  assert.deepEqual(levels,[1,1,0]);
  return {samples:count,baseTypes:baseTypes.length,bankPatterns:bank.length,families:bank.length?2:0,levels};
}
function testEquacions(h){
  const topic=h.topics.equacions;let count=0;
  for(const type of [1,2,3,4,7,8])for(let i=0;i<SAMPLES;i++){
    const q=h.sandbox.genEquacions(type);uniqueChoices(q);assertFamily(h,topic,q);verifyLinearEquation(q);count++;
  }
  const bank=h.patterns.filter(p=>p.topicId==='equacions');assert.deepEqual(bank.map(p=>p.id).sort((a,b)=>Number(a.slice(1))-Number(b.slice(1))),Array.from({length:10},(_,i)=>'E'+(i+1)));
  for(const p of bank)for(let i=0;i<SAMPLES;i++){const q=p.gen();assertFamily(h,topic,q);verifyLinearEquation(q);assert(q.answer?.check,'corrector numèric del banc');count++;}
  const levels=Array.from(h.D.coverage(topic).types);assert.deepEqual(levels,[2,2,0]);
  return {samples:count,baseTypes:6,bankPatterns:bank.length,families:4,levels};
}
function evaluateInstruction(text,start){
  const op=String(text).toLowerCase(),m=op.match(/(sumar|restar|multiplicar per|dividir entre)\s+(\d+)/);assert(m,'instrucció concreta: '+text);
  const n=Number(m[2]);return m[1]==='sumar'?start+n:m[1]==='restar'?start-n:m[1]==='multiplicar per'?start*n:start/n;
}
function verifyComputational(q){
  const t=clean(q.question),r=['4','5'].includes(String(q.type))?null:numeric(q.correct);
  if(q.type===1){const m=t.match(/sobre el nombre\s+(\d+).*?suma\s+(\d+).*?multiplica el resultat per\s+(\d+)/i);assert(m,'nombre inicial i operacions: '+t);assert.equal(r,(Number(m[1])+Number(m[2]))*Number(m[3]));}
  else if(q.type===2){const m=t.match(/comença amb\s+(\d+).*?repeteix\s+(\d+) vegades.*?suma\s+(\d+)/i);assert(m);assert.equal(r,Number(m[1])+Number(m[2])*Number(m[3]));}
  else if(q.type===3){const m=t.match(/nombre inicial és\s+(\d+)/i);assert(m);const n=Number(m[1]);assert.equal(r,n%2===0?n/2:3*n+1);}
  else if(q.type===4){const m=t.match(/valor inicial\s+(\d+);\s*Pas 1: suma\s+(\d+)\s*→\s*(\d+)\s*;\s*Pas 2: multiplica per\s+(\d+)\s*→\s*(\d+)/);assert(m,'passos de l’algorisme: '+t);const [start,add,shown1,mul,shown2]=m.slice(1).map(Number);const first=shown1!==start+add,second=shown2!==shown1*mul;assert(first||second);assert.equal(String(q.correct).toLowerCase(),'pas '+(first?1:2));}
  else if(q.type===5){const m=t.match(/transforma\s+(\d+)\s+en\s+(\d+)/i);assert(m);assert.equal(evaluateInstruction(q.correct,Number(m[1])),Number(m[2]));}
  else if(q.type===6){const m=t.match(/si x és més gran que\s+(\d+), resta\s+(\d+).*?x=(\d+)/i);assert(m,'condició, canvi i valor inicial: '+t);const [limit,d,x]=m.slice(1).map(Number);assert.equal(r,x>limit?x-d:x+d);}
  else throw new Error('tipus computacional inesperat '+q.type);
}
function testComputacional(h){
  const topic=h.topics.computacional;let count=0;
  for(let type=1;type<=6;type++)for(let i=0;i<SAMPLES;i++){
    h.state.forcedGeneratorType=type;const q=h.sandbox.genComputacional();uniqueChoices(q);assertFamily(h,topic,q);verifyComputational(q);count++;
  }
  const bank=h.patterns.filter(p=>p.topicId==='computacional');assert.deepEqual(bank.map(p=>p.id).sort(),['C1','C2','C3','C4','C5','C6']);
  for(const p of bank)for(let i=0;i<SAMPLES;i++){
    const q=p.gen();assertFamily(h,topic,q);
    if(/^C[1-3]$/.test(p.id)||p.id==='C6'){
      const t=clean(q.question),nums=(t.match(/\d+/g)||[]).map(Number);
      if(p.id==='C1')assert.equal(numeric(q.answer.val),(nums[0]+nums[1])*nums[2]);
      if(p.id==='C2')assert.equal(numeric(q.answer.val),nums[0]+nums[1]*nums[2]);
      if(p.id==='C3'){const n=Number(t.match(/n=(\d+)/)?.[1]);assert(Number.isInteger(n));assert.equal(numeric(q.answer.val),n%2===0?n/2:3*n+1);}
      if(p.id==='C6'){const m=t.match(/x>(\d+), resta (\d+); si no, suma (\d+).*?x=(\d+)/);assert(m);assert.equal(numeric(q.answer.val),Number(m[4])>Number(m[1])?Number(m[4])-Number(m[2]):Number(m[4])+Number(m[3]));}
    }else if(p.id==='C4')assert.equal(q.answer.val,'pas 1');
    else {const t=clean(q.question).match(/transformar (\d+) en (\d+)/i);assert(t);assert.equal(evaluateInstruction(q.answer.val,Number(t[1])),Number(t[2]));}
    assert(q.answer?.check&&q.hint?.length>=1&&q.solution?.length,'correcció, pistes i solució del banc');count++;
  }
  const levels=Array.from(h.D.coverage(topic).types);assert.deepEqual(levels,[3,2,0]);
  return {samples:count,baseTypes:6,bankPatterns:bank.length,families:5,levels};
}
function run(topicId){const h=makeHarness(),results={simplificacio:testSimplificacio,equacions:testEquacions,computacional:testComputacional};assert(results[topicId],'tema Lot 2 conegut');console.log(JSON.stringify({topic:topicId,catalog:validateCatalog(h),...results[topicId](h)}));}
if(require.main===module)run(process.argv[2]);
module.exports={run};
