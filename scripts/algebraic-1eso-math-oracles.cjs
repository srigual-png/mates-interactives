'use strict';
const assert=require('node:assert/strict');
const {makeHarness,clean,number,equivalent}=require('./algebraic-1eso-families-test-helper.cjs');

function verifyChoices(q,expressionAnswer=false){
  assert.equal(q.options.length,4,'quatre respostes');assert.equal(new Set(q.options.map(String)).size,4,'distractors textualment diferents');
  assert.equal(q.options.filter(x=>String(x)===String(q.correct)).length,1,'una resposta correcta exacta');
  if(expressionAnswer){const equivalentChoices=q.options.filter(x=>equivalent(x,q.correct));const accepted=(q.alts||[q.correct]).filter(x=>equivalent(x,q.correct));assert(equivalentChoices.length>=1,'hi ha una resposta equivalent');assert(equivalentChoices.every(x=>accepted.some(a=>equivalent(x,a))),'cap distractor matemàticament equivalent fora de les variants acceptades');}
  assert(q.guide.length>=2,'pistes disponibles');assert(q.solution.length>=1,'solució disponible');
}
function verifyTagged(h,topic,q){
  const f=h.families.familyFor(topic,q),decorated=h.D.annotate(topic,q);
  assert(f,'família assignada: '+topic.id+'/'+q.type);
  assert.equal(decorated.familyId,f.id);assert.equal(decorated.taskDifficulty,f.level);assert.equal(decorated.diff,f.level);
  assert.equal(h.D.getDifficulty(topic,q),f.level,'classificador compartit');
  return decorated;
}
function forceType(h,type,queue=[],shuffleType=null){h.state.forced=queue.slice();h.state.forcedType=shuffleType;}

function testTranslation(h){
  const topic=h.topics.traduccio,seen=new Set();let samples=0;
  const direct={
    'El doble d\'un nombre':'2x','El triple d\'un nombre':'3x','La meitat d\'un nombre':'x/2','Un nombre parell':'2x','Un nombre senar':'2x+1',
    'El consecutiu de x':'x+1','El nombre anterior a x':'x-1','Un nombre menys quatre':'x-4','Sis vegades un nombre i després suma dos':'6x+2',
    'El quadrat d\'un nombre':'x²','El triple d\'un nombre i després resta quatre':'3x-4','Tres vegades la suma d\'un nombre i dos':'3(x+2)',
    'La suma del doble i el triple d\'un nombre':'2x+3x'
  };
  for(let type=1;type<=6;type++)for(let i=0;i<250;i++){
    const first=type===1?i%13:type===2?i%7:type===3?i%7:type===6?i%3:null;
    forceType(h,type,first===null?[]:[first],type);
    const raw=h.sandbox.genTraduccio(),q=verifyTagged(h,topic,raw);verifyChoices(q,[1,3,6].includes(type));samples++;
    if(type===1){const phrase=clean(q.question).match(/Tradueix:\s*"(.+?)"/)?.[1];assert(phrase,'frase de traducció reconeguda');const grouped=phrase.match(/^(\d+) vegades la suma d'un nombre i (\d+)$/);if(grouped){assert.equal(q.difficultyVariant,'grouped','variant amb agrupació');assert(equivalent(q.correct,`${grouped[1]}(x+${grouped[2]})`),'oracle de frase agrupada → expressió');}else{assert(direct[phrase],'frase directa reconeguda: '+phrase);assert.equal(q.difficultyVariant,'direct','variant directa');assert(equivalent(q.correct,direct[phrase]),'oracle de frase → expressió '+phrase);}if(phrase==='La suma del doble i el triple d\'un nombre')assert(q.alts.some(x=>equivalent(x,'5x')),'accepta la forma equivalent 5x');}
    if(type===2){const expr=clean(q.question).match(/Expressa amb paraules:\s*(.+)$/)?.[1];const expected={'x+5':'Un nombre més cinc','x-3':'Un nombre menys tres','4x':'El quàdruple d\'un nombre','x/3':'Un nombre dividit entre tres','x²':'El quadrat d\'un nombre','2x+1':'El doble d\'un nombre i després suma una unitat','3x-2':'El triple d\'un nombre i després resta dos'};assert.equal(q.correct,expected[expr],'oracle d’expressió → llenguatge verbal');}
    if(type===3){const text=clean(q.question),expected=[['En Marc té x anys','x-5'],['Una samarreta val x','6x'],['Tens x caramels','x-9'],['La meitat dels alumnes','x/2'],['En Joan guanya x','12x'],['Tens 50 €','50-x'],['Un rectangle té base x','4x']].find(([start])=>text.includes(start));assert(expected&&equivalent(q.correct,expected[1]),'oracle de modelització contextual');}
    if(type===4){const m=clean(q.question).match(/x\s*=\s*(\d+).*?(\d+)x\s*\+\s*(\d+)/);assert(m,'substitució d’una variable amb terme independent');assert.equal(Number(q.correct),Number(m[2])*Number(m[1])+Number(m[3]));}
    if(type===5){const m=clean(q.question).match(/x\s*=\s*(\d+).*?y\s*=\s*(\d+).*?(\d+)x\s*\+\s*(\d+)y/);assert(m,'substitució de dues variables');assert.equal(Number(q.correct),Number(m[3])*Number(m[1])+Number(m[4])*Number(m[2]));}
    if(type===6){const text=clean(q.question);let expected;if(text.includes('pizzeria')){const m=text.match(/cobra (\d+) € per pizza i (\d+) € d'entrega/);assert(m,'dades de pizzeria');expected=`${m[1]}x+${m[2]}`;}else if(text.includes('taxi')){const m=text.match(/cobra (\d+) € de baixada i (\d+) €\/km/);assert(m,'dades del taxi');expected=`${m[2]}x+${m[1]}`;}else{const m=text.match(/Compres (\d+) llibres i tens (\d+) € de descompte/);assert(m,'dades dels llibres');expected=`${m[1]}x-${m[2]}`;}assert(equivalent(q.correct,expected),'oracle de context real i decimals');}
    seen.add(q.familyId);
  }
  for(const p of h.patterns.filter(x=>x.topicId==='traduccio'))for(let i=0;i<250;i++){const q=p.gen(),family=h.families.familyFor(topic,q);verifyTagged(h,topic,q);assert.equal(q.diff,family.level,'nivell intern del banc '+p.id);samples++;}
  const expected=JSON.parse(JSON.stringify(h.families.topicSpecs('traduccio').map(f=>f.id)));assert.deepEqual([...seen].sort(),expected.sort(),'cobertura de les famílies en els tipus base');
  return {samples,baseByType:6*250,bankPatterns:7*250,families:expected.length,levels:h.D.coverage(topic).types};
}

function testPatterns(h){
  const topic=h.topics.patrons,seen=new Set();let samples=0;
  for(let type=1;type<=6;type++)for(let i=0;i<250;i++){
    const queue=type===2?[type,i%3+1]:type===3?[type,i%2+1]:[type];forceType(h,type,queue);
    const q=verifyTagged(h,topic,h.sandbox.genPatrons());verifyChoices(q);const text=clean(q.question);
    if(type===1){const m=text.match(/patró\?\s*([\d?,\s]+)/i);assert(m,'successió amb terme desconegut');const vals=m[1].split(',').map(x=>x.trim()==='?'?null:Number(x.trim()));let d,answer;for(let a=0;a<vals.length;a++)for(let b=a+1;b<vals.length;b++)if(vals[a]!==null&&vals[b]!==null){d=(vals[b]-vals[a])/(b-a);if(Number.isInteger(d)){for(let k=0;k<vals.length;k++)if(vals[k]===null)answer=vals[a]+(k-a)*d;break;}}assert(Number.isInteger(d)&&answer!==undefined);assert.equal(Number(q.correct),answer);assert.equal(q.familyVariant,'additive');}
    if(type===2){const vals=(text.match(/\d+/g)||[]).map(Number).slice(0,4),correct=clean(q.correct);assert.equal(vals.length,4);if(correct.includes('augmenta')){const d=vals[1]-vals[0];assert(d>0&&vals.every((x,i)=>!i||x-vals[i-1]===d));}else if(correct.includes('disminueix')){const d=vals[0]-vals[1];assert(d>0&&vals.every((x,i)=>!i||vals[i-1]-x===d));}else{const ratio=vals[1]/vals[0];assert(ratio>1&&vals.every((x,i)=>!i||x/vals[i-1]===ratio));}}
    if(type===3){const vals=(text.match(/\d+/g)||[]).map(Number).slice(0,4);assert.equal(vals.length,4);const expected=q.familyVariant==='additive'?vals[3]+(vals[3]-vals[2]):vals[3]*(vals[3]/vals[2]);assert.equal(Number(q.correct),expected);}
    if(type===4){const n=Number(text.match(/per a (\d+) quadrats/)?.[1]);assert(n);assert.equal(Number(q.correct),3*n+1);}
    if(type===5){const n=Number(text.match(/figura (\d+)/)?.[1]);assert(n);assert.equal(Number(q.correct),n*(n+1)/2);}
    if(type===6){let seq=text.match(/té (\d+) seients a la primera fila, (\d+) a la segona, (\d+) a la tercera i (\d+) a la quarta/)||text.match(/usa (\d+) peces a la figura 1, (\d+) a la figura 2, (\d+) a la figura 3 i (\d+) a la figura 4/)||text.match(/segueix (\d+), (\d+), (\d+), (\d+)…/)||text.match(/segueixen (\d+), (\d+), (\d+), (\d+)…/);assert(seq,'quatre termes explícits del context');const vals=seq.slice(1).map(Number),expected=q.familyVariant==='multiplicative'?vals[3]*(vals[3]/vals[2]):vals[3]+(vals[3]-vals[2]);assert.equal(Number(q.correct),expected);}
    seen.add(q.familyId);samples++;
  }
  const banks=h.patterns.filter(x=>x.topicId==='patrons');for(const p of banks)for(let i=0;i<250;i++){const q=p.gen(),family=h.families.familyFor(topic,q);verifyTagged(h,topic,q);assert.equal(q.diff,family.level,'nivell intern del banc '+p.id);verifyOpenPattern('patrons',p.id,q);samples++;}
  const expected=JSON.parse(JSON.stringify(h.families.topicSpecs('patrons').map(f=>f.id)));assert.deepEqual([...seen].sort(),expected.sort());
  return {samples,baseByType:6*250,bankPatterns:banks.length*250,families:expected.length,levels:h.D.coverage(topic).types};
}

function verifyOpenPattern(topicId,id,q){
  const t=q.topicId==='simplificacio'?null:{id:topicId};const ans=String(q.answer.val);const text=clean(q.question);
  if(id==='P1'||id==='P3'){const seq=text.match(/patr[oó](?: multiplicatiu)?:\s*([\d, ]+)/i)?.[1].split(',').map(x=>Number(x.trim())).filter(Number.isFinite).slice(0,4);assert(seq&&seq.length===4);const expected=id==='P1'?seq[3]+seq[3]-seq[2]:seq[3]*(seq[3]/seq[2]);assert.equal(Number(ans),expected);}
  if(id==='P2'){const seq=text.match(/falta\?\s*([\d?, ]+)/i)?.[1].split(',').map(x=>x.trim()==='?'?null:Number(x));assert(seq);let expected;for(let i=0;i<seq.length;i++)if(seq[i]===null)expected=seq[i-1]===null?seq[i+1]-(seq[i+2]-seq[i+1]):seq[i-1]+(seq[i+1]-seq[i-1])/(i+1-(i-1));assert.equal(Number(ans),expected);}
  if(id==='P4'){const m=text.match(/fa\s+(\d+)\s*cm el dia 1 i creix\s+(\d+)\s*cm cada dia.*?dia\s+(\d+)/i);assert(m);assert.equal(Number(ans),Number(m[1])+(Number(m[3])-1)*Number(m[2]));}
  if(id==='P5'){const n=Number(text.match(/per a (\d+) quadrats/)?.[1]);assert.equal(Number(ans),3*n+1);}
  if(id==='P6'){const n=Number(text.match(/primeres (\d+) files/)?.[1]);assert.equal(Number(ans),n*(n+1)/2);}
  if(id==='P7'){const seq=(text.match(/Observa\s+([\d, ]+)/i)?.[1]||'').split(',').map(Number);const d=seq[1]-seq[0];assert(ans.toLowerCase().includes(String(d))&&/sumar|afegir|afegeix/.test(ans.toLowerCase()));}
  if(id==='T1'){const n=Number(text.match(/costa\s+(\d+)\s*€/i)?.[1]);assert(n&&equivalent(ans,`${n}x`));}
  if(id==='T2'){const m=text.match(/cobra\s+(\d+)\s*€ fixos i\s+(\d+)\s*€ per ús/i);assert(m&&equivalent(ans,`${m[2]}x+${m[1]}`));}
  if(id==='T3'){const k=Number(text.match(/fa\s+(\d+) anys/i)?.[1]);assert(k&&equivalent(ans,`x-${k}`));}
  if(id==='T4'){const h=Number(text.match(/altura\s+(\d+)\s*cm/i)?.[1]);assert(h&&equivalent(ans,`2x+${2*h}`));}
  if(id==='T5'){const m=text.match(/x=(\d+).*?(\d+)x\+(\d+)/);assert(m&&Number(ans)===Number(m[2])*Number(m[1])+Number(m[3]));}
  if(id==='T6'){const m=text.match(/per\s+(\d+) i després resta\s+(\d+)/i);assert(m&&equivalent(ans,`${m[1]}x-${m[2]}`));}
  if(id==='T7'){const m=text.match(/representa\s+(\d+) vegades la suma d'un nombre i (\d+)/i);assert(m&&equivalent(ans,`${m[1]}(x+${m[2]})`));}
  if(id==='M1'){const term=text.match(/terme\s+(.+?)\?/i)?.[1].replace(/[.]/g,'').trim();const expected=term==='x'?1:term==='−x'?-1:Number(term?.replace('x','').replace('−','-'));assert(Number.isFinite(expected)&&Number(ans)===expected);}
  if(id==='M2'){const expected=text.match(/x\s*[+−-]\s*(\d+)/)?.[0];assert(expected);assert.equal(Number(ans),Number(expected.replace(/.*([+−-])\s*/, '$1').replace('−','-')));}
  if(id==='M3'||id==='M4'){const m=text.match(/(\d+)x\s*([+−-])\s*(\d+)x/);assert(m);const n=id==='M3'?Number(m[1])+Number(m[3]):Number(m[1])-Number(m[3]);assert(equivalent(ans,`${n}x`));}
  if(id==='M5')assert.equal(Number(ans),2);
  if(id==='M6'){const m=text.match(/coeficient\s+(\d+) i terme independent\s+(\d+).*?x=(\d+)/);assert(m);assert.equal(Number(ans),Number(m[1])*Number(m[3])+Number(m[2]));}
  if(t)assert.equal(q.taskDifficulty,q.diff,'dificultat del banc anotada');
}

function testMonomis(h){
  const topic=h.topics.monomis,seen=new Set();let samples=0;
  for(let type=1;type<=4;type++)for(let i=0;i<250;i++){
    if(type===1)forceType(h,type,[i%19]);else if(type===2)forceType(h,type,[4,0,7,0]);else if(type===3)forceType(h,type,[3,5,i%2]);else forceType(h,type,[i%5]);
    const q=verifyTagged(h,topic,h.sandbox.genMonomis(type));verifyChoices(q);const text=clean(q.question);
    if(type===1){const term=text.match(/l’expressió\s+(.+?),\s*quin és el\s+coeficient/i)?.[1]?.trim();assert(term,'terme de l’expressió identificat');const expected=term==='x'?1:term==='−x'?-1:Number(term.replace('x','').replace('−','-'));assert(Number.isFinite(expected)&&Number(q.correct)===expected);}
    if(type===2){const m=text.match(/expressió\s+([−-]?\d+x)\s*([+−-])\s*(\d+)/);assert(m);assert.equal(Number(q.correct),Number(m[2]==='+'?m[3]:'-'+m[3]));}
    if(type===3){const m=text.match(/de\s+([\d]+x)\s*([+−-])\s*(\d+x)/);assert(m);const expected=m[1]+' i '+(m[2]==='+'?' + ':'− ')+m[3].replace(/[+−-]/g,'');assert.equal(q.correct.replace(/\s+/g,''),expected.replace(/\s+/g,''));assert(q._openAnswerCheck(q.correct));}
    if(type===4){const pair=text.match(/^(.+?)\s+i\s+(.+?)\s+Són termes semblants/i);assert(pair);const literal=s=>/x/.test(s);const expected=literal(pair[1])&&literal(pair[2])?'Sí, es poden reduir':'No, no són termes semblants';assert.equal(q.correct,expected);}
    seen.add(q.familyId);samples++;
  }
  const banks=h.patterns.filter(x=>x.topicId==='monomis'||x.id==='M3'||x.id==='M4');for(const p of banks)for(let i=0;i<250;i++){const q=p.gen();verifyOpenPattern('monomis',p.id,q);samples++;if(['M1','M2','M5','M6'].includes(p.id)){const family=h.families.familyFor(topic,q);verifyTagged(h,topic,q);assert.equal(q.diff,family.level,'nivell intern del banc '+p.id);}else assert.equal(q.topicId,'simplificacio','reducció de termes encaminada a Simplificació');}
  const expected=JSON.parse(JSON.stringify(h.families.topicSpecs('monomis').map(f=>f.id)));assert.deepEqual([...seen].sort(),expected.filter(x=>!x.includes('avaluar')).sort(),'cobertura dels generadors interns de monomis');
  const m6=h.patterns.find(x=>x.id==='M6').gen();verifyTagged(h,topic,m6);seen.add(m6.familyId);assert.deepEqual([...seen].sort(),expected.sort(),'cobertura inclòs el generador compartit M6');
  return {samples,baseByType:4*250,bankPatterns:banks.length*250,families:expected.length,levels:h.D.coverage(topic).types};
}

function testRotation(h,topicId,base){
  const topic=h.topics[topicId];h.sandbox.resetVariationSession(topicId);
  const generated=h.sandbox.variedGenerator(topicId,()=>h.D.annotate(topic,base()));let previous=null;const counts=Object.create(null),rows=h.families.topicSpecs(topicId).filter(f=>f.generators.some(g=>g.startsWith(topicId+':')));
  for(let i=0;i<rows.length*5;i++){const q=generated();assert(q.familyId);assert.notEqual(q.familyId,previous,'no es repeteix la família consecutivament');previous=q.familyId;counts[q.familyId]=(counts[q.familyId]||0)+1;}
  assert.equal(Object.keys(counts).length,rows.length,'rotació passa per totes les famílies');
  assert(Math.max(...Object.values(counts))-Math.min(...Object.values(counts))<=1,'rotació equilibrada per família');
  return {draws:rows.length*5,families:Object.keys(counts).length,counts};
}

function testStableIds(h){
  const entries=['traduccio','patrons','monomis'].flatMap(topic=>h.families.topicSpecs(topic).map(f=>({topic,f}))),byId=new Map();
  for(const row of entries){const list=byId.get(row.f.id)||[];list.push(row);byId.set(row.f.id,list);}
  for(const [id,rows] of byId)if(rows.length>1)for(const row of rows)for(const other of rows)if(row!==other)assert(row.f.sharedWith?.includes(other.topic),'ID reutilitzat només amb declaració sharedWith: '+id);
  const registry=JSON.parse(require('node:fs').readFileSync(require('node:path').join(__dirname,'../docs/auditoria/families-validades.json'),'utf8'));
  const existing=new Set(registry.topics.flatMap(t=>t.families.map(f=>f.id)));
  for(const id of byId.keys())assert(!existing.has(id),'ID estable no coincideix amb una família ja registrada: '+id);
  return {localEntries:entries.length,uniqueIds:byId.size,registryConflicts:0};
}
function run(topicId){const h=makeHarness(),ids=testStableIds(h);let result;
  if(topicId==='traduccio'){result=testTranslation(h);result.rotation=testRotation(h,'traduccio',()=>h.sandbox.genTraduccio());}
  else if(topicId==='patrons'){result=testPatterns(h);result.rotation=testRotation(h,'patrons',()=>h.sandbox.genPatrons());}
  else if(topicId==='monomis'){result=testMonomis(h);result.rotation=testRotation(h,'monomis',()=>h.sandbox.genMonomis());}
  else throw new Error('Tema desconegut: '+topicId);
  console.log(JSON.stringify({topic:topicId,stableIds:ids,...result}));
}
module.exports={run};
