#!/usr/bin/env node
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const page = fs.readFileSync(path.join(root, '1eso/sentit-numeric.html'), 'utf8');
const hierarchySource = fs.readFileSync(path.join(root, 'assets/js/jerarquia-1eso.js'), 'utf8');
const reasoningSource = fs.readFileSync(path.join(root, 'assets/js/raonament-numeric-1eso.js'), 'utf8');
const difficultySource = fs.readFileSync(path.join(root, 'assets/js/dificultat-mi.js'), 'utf8');
const tests = { generators: 0, generated: 0, oracleChecks: 0, failures: [] };
const samples = {};
function assert(ok, message) { if (!ok) throw new Error(message); tests.oracleChecks++; }
function count(ok, message) { tests.generated++; if (!ok) throw new Error(message); }
function extract(start, end) {
  const a = page.indexOf(start), b = page.indexOf(end, a);
  if (a < 0 || b < 0) throw new Error('No es pot extreure ' + start);
  return page.slice(a, b);
}
const context = { console, Math, Number, String, Array, Set, Object, Error, JSON, RegExp, Map };
context.window = context; context.globalThis = context;
context.rnd = (min, max) => min;
context.buildJerOptions = (correct, choices) => [String(correct), ...choices.map(String).filter(x => x !== String(correct))];
context.buildOpts = context.buildJerOptions;
context.numEq = (a, b) => Number(a) === Number(b);
context.ampNextType = () => 1;
vm.createContext(context);
vm.runInContext(hierarchySource, context, {filename:'jerarquia-1eso.js'});
vm.runInContext(reasoningSource, context, {filename:'raonament-numeric-1eso.js'});
vm.runInContext(extract('function genJerarquia(type=', '// ── BOSSES DE VARIETAT'), context, {filename:'genJerarquia'});
vm.runInContext(extract('function genJerProb(', '// --- DIVISIBILITAT'), context, {filename:'genJerProb'});
vm.runInContext(extract('function genJerarquiaPractice(', 'function genDivisPractice('), context, {filename:'genJerarquiaPractice'});
const MI = context.MIJerarquia;
function rng(seed) { let x = seed >>> 0; return (min, max) => { x = (1664525 * x + 1013904223) >>> 0; return min + (x % (max - min + 1)); }; }
function mathEval(source) {
  const s = String(source).replace(/[×xX·⋅]/g,'*').replace(/[−–]/g,'-').replace(/[÷:]/g,'/').replace(/\[/g,'(').replace(/\]/g,')').replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]/g, c => '^' + '⁰¹²³⁴⁵⁶⁷⁸⁹'.indexOf(c));
  const tokens = s.match(/\d+|[()+\-*/^]/g) || [];
  let i=0; const seen=[];
  const precedence={'+':1,'-':1,'*':2,'/':2,'^':3};
  function expr(min) {
    let t=tokens[i++], value;
    if (t==='(') { value=expr(1); if(tokens[i++]!==')') throw Error('Parèntesis no tancat'); }
    else if (/^\d+$/.test(t||'')) value=Number(t);
    else throw Error('Token inicial invàlid: '+t+' a '+source);
    while (precedence[tokens[i]]>=min) {
      const op=tokens[i++], rhs=expr(precedence[op]+(op==='^'?0:1));
      value=op==='+'?value+rhs:op==='-'?value-rhs:op==='*'?value*rhs:op==='/'?value/rhs:value**rhs;
      if (!Number.isSafeInteger(value)) throw Error('Resultat no enter: '+source);
      seen.push(value);
    }
    return value;
  }
  const value=expr(1);
  if(i!==tokens.length) throw Error('Expressió invàlida: '+source);
  return {value, intermediates:seen};
}
function plain(s) { return String(s).replace(/<[^>]*>/g,' ').replace(/&nbsp;/g,' ').replace(/\s+/g,' ').trim(); }
function expressionIn(q) {
  const m=String(q).match(/<span class="fc">([^<]+)<\/span>/) || String(q).match(/<b[^>]*>([^<]*[0-9][^<]*)<\/b>/);
  if(!m) throw Error('No trobo l’expressió a l’enunciat: '+plain(q));
  return m[1];
}
function generatePractice(type, level, random) { return context.genJerarquiaPractice(type, level, random); }
function checkLevels() {
  const specs=MI.familySpecs;
  assert(specs.length===11,'S’esperaven 11 famílies.');
  assert(JSON.stringify(specs.map(f=>f.level).reduce((a,n)=>(a[n-1]++,a),[0,0,0]))==='[3,5,3]','Recompte no esperat.');
  for(const family of specs) for(const gen of family.generators) assert(MI.levelFor(gen)===family.level,'Nivell incorrecte per '+gen);
  const ids=['precedencia-productes-i-operacions','operacions-equivalents-esquerra-dreta','identificar-o-fer-el-primer-pas','potencies-dins-expressions-combinades','operar-amb-parentesis-i-claudators','modelitzar-i-calcular-contextos','comparar-efectes-dels-parentesis','trobar-signe-amb-resultat-objectiu','optimitzar-resultat-positiu','detectar-i-reparar-primer-error','reconstruir-expressio-amb-restriccions'];
  assert(ids.join('|')===specs.map(f=>f.id).join('|'),'Inventari familiar diferent del revisat.');
  assert(difficultySource.includes("t.id==='jerarquia'&&root.MIJerarquia"),'Falta el pont del classificador compartit.');
}
function verifyCore(type, q) {
  if(type===7) {
    const m=plain(q.question).match(/val (\d+) €.*compra (\d+).*germà (\d+).*descompte de (\d+) €.*afegeixen (\d+) €/);
    assert(!!m,'No es poden llegir els imports contextuals: '+plain(q.question));
    const expected=Number(m[1])*(Number(m[2])+Number(m[3]))-Number(m[4])+Number(m[5]);
    assert(Number.parseInt(q.correct,10)===expected,'Resultat contextual incorrecte.');
  } else {
    assert(mathEval(expressionIn(q.question)).value===Number(q.correct),'Resultat incorrecte al generador '+type+'.');
  }
  assert(q.diff===MI.levelFor(type),'Dificultat interna desalineada al generador '+type+'.');
}
function oracleF07(q) {
  const m=plain(q.question).match(/(\d+) □ (\d+) × (\d+) = (\d+)/);
  assert(!!m,'No es pot llegir F07.');
  const [a,b,c,target]=m.slice(1).map(Number);
  const vals={'+':a+b*c,'−':a-b*c,'×':a*b*c,'÷':(a/b)*c};
  const valid=Object.entries(vals).filter(([,v])=>Number.isSafeInteger(v)&&v===target);
  assert(valid.length===1,'F07 no té un únic signe correcte.');
  assert(valid.length===1&&String(q.correct).replace('-','−')===valid[0][0],'F07 incorrecte: '+plain(q.question)+'; resposta '+q.correct+'; signes vàlids '+JSON.stringify(valid));
}
function oraclePositive(data) {
  const {a,b,c,d}=data;
  return [(a+b)*c-d,a+b*c-d,(a+b)*(c-d),a+(b*c-d),a+b*(c-d)].filter(v=>v>0);
}
function oracleRecon(numbers) {
  const [a,b,c,d]=numbers, ops=['+','-','*'], all=[];
  for(let i=0;i<3;i++) for(let j=0;j<3;j++) if(j!==i) for(let k=0;k<3;k++) if(k!==i&&k!==j) {
    const [x,y,z]=[ops[i],ops[j],ops[k]];
    const forms=['(('+a+x+b+')'+y+c+')'+z+d,'('+a+x+'('+b+y+c+'))'+z+d,'('+a+x+b+')'+y+'('+c+z+d+')',a+x+'(('+b+y+c+')'+z+d+')',a+x+'('+b+y+'('+c+z+d+'))'];
    for(const e of forms) { try { const out=mathEval(e); if(out.intermediates.every(v=>v>=0)) all.push({e,value:out.value}); } catch {} }
  }
  return all;
}
function verifySpecial(type, q) {
  if(type==='F03') {
    const m=plain(q.question).match(/A: (.*?) B: (.*?) Motiu/);
    assert(!!m,'No es poden llegir les expressions F03.');
    const relation=mathEval(m[1]).value<mathEval(m[2]).value?'<':mathEval(m[1]).value>mathEval(m[2]).value?'>':'=';
    assert(String(q.correct).includes('A '+relation+' B;'),'Relació incorrecta a F03.');
  } else if(type==='F07') oracleF07(q);
  else if(type==='F05') {
    const original=expressionIn(q.question);
    const result=mathEval(original).value;
    const items=[...String(q.question).matchAll(/<li>(.*?)<\/li>/g)].map(m=>m[1]);
    assert(items.length===5,'F05 no conté cinc línies.');
    const repair=String(q.correct).split(';');
    assert(repair[0]==='3'&&mathEval(repair[1]).value===result,'F05 no repara correctament la primera línia errònia.');
    assert(mathEval(items[0]).value===result&&mathEval(items[1]).value===result,'F05 té un error abans de la línia 3.');
    assert(mathEval(items[2]).value!==result,'La línia 3 de F05 no és incorrecta.');
  } else if(type==='F06') {
    const numbers=(plain(q.question).match(/Usa els nombres ([0-9, ]+)/)||[])[1].split(/,\s*/).map(Number);
    const target=Number((plain(q.question).match(/don[ií] ([0-9]+)/)||[])[1]);
    const answer=String(q.correct).replace(/[×x]/g,'*').replace(/−/g,'-');
    const vals=answer.match(/\d+/g).map(Number);
    assert(JSON.stringify(vals)===JSON.stringify(numbers),'F06 no conserva nombres ni ordre.');
    assert((answer.match(/[+\-*]/g)||[]).length===3,'F06 no utilitza cada operador una vegada.');
    const got=mathEval(answer);
    assert(got.value===target&&got.intermediates.every(v=>v>=0),'F06 infringeix el resultat o la restricció de no-negativitat.');
    assert(oracleRecon(numbers).some(x=>x.value===target),'L’oracle independent no valida la resposta F06.');
  } else if(type==='B4') {
    const m=String(q.correct).match(/^(.*?) = (\d+)$/);
    assert(!!m&&mathEval(m[1]).value===Number(m[2]),'B4 expressió/igualtat incorrecta.');
  }
  if(type!=='F01'&&type!=='F02'&&type!=='F03'&&type!=='F05'&&type!=='F06'&&type!=='F07'&&type!=='B4')
    assert(q.correct!==undefined,'Falta resposta al generador '+type+'.');
  if(type==='F01'||type==='F02') {
    const source=q.practiceKey, answer=String(q.correct);
    assert(source&&answer,'F01/F02 no retorna una resposta.');
    if(type==='F01')assert(source.includes(answer),'F01 no selecciona una operació de l’enunciat.');
    else assert(mathEval(source).value===mathEval(answer).value&&q.solution[1].includes(answer),'F02 no conserva el valor en fer un únic pas.');
    const correct=MI.matches(q.jerarquiaAnswer,answer);
    assert(correct,'La forma de resposta del primer pas no passa la verificació.');
  }
}
function record(label, q, oracle) { if(oracle) oracle(q); count(true,''); tests.oracleChecks++; if(samples[label].length<3)samples[label].push({question:plain(q.question),answer:plain(q.correct),level:q.taskDifficulty||q.diff||null}); }
function runGenerator(label, make, oracle) {
  tests.generators++;
  samples[label]=[];
  for(let i=0;i<250;i++) {
    const q=make(i);
    try { record(label,q,oracle); }
    catch(e) { tests.failures.push(label+' #' +(i+1)+': '+e.message); }
  }
}
checkLevels();
for(let type=1;type<=9;type++) runGenerator('core-'+type,i=>context.genJerarquia(type,rng(i+type*997)),q=>verifyCore(type,q));
for(const type of ['L01','F01','F02','F03','F05','F06','F07','B4']) runGenerator(type,i=>MI.generate(type,rng(i+700),context.buildOpts),q=>verifySpecial(type,q));
for(let type=1;type<=4;type++) runGenerator('AMP-jerarquia-'+type,i=>context.genJerProb(type,rng(i+1700)),q=>{
  assert(q.variantId==='jerarquia-'+type,'ID bancari incorrecte.');
  assert(q.diff===2,'Nivell bancari intern incorrecte.');
  if(type<=3) assert(mathEval(expressionIn(q.text)).value===Number(q.answer.val),'Resultat AMP incorrecte.');
  else assert(MI.levelFor(q.variantId)===2,'Nivell de jerarquia-raonament incorrecte.');
});
for(let type=1;type<=9;type++) runGenerator('adaptive-core-'+type,i=>{
  const lev=MI.levelFor(type); return generatePractice(type,lev,rng(i+2700));
},q=>assert(q.diff===q.taskDifficulty&&q.taskDifficulty===MI.levelFor(q.type),'Wrapper adaptatiu desalineat.'));
for(const type of ['L01','F01','F02','F03','F05','F06','F07','B1','B2','B3','B4']) runGenerator('adaptive-'+type,i=>{
  const lev=MI.levelFor(type);return generatePractice(type,lev,rng(i+3700));
},q=>assert(q.diff===q.taskDifficulty&&q.taskDifficulty===MI.levelFor(q.type),'Wrapper adaptatiu desalineat per '+type));
runGenerator('reasoning-parentesis-resultat-positiu',i=>context.MIFirstNumericTasks.generate('parentesis-resultat-positiu',()=>rng(i+4700)(0,999999)/1000000),q=>{
  const vals=oraclePositive(q.reasoningData),expected=Math.min(...vals);
  assert(Number(q.correct)===expected&&expected>0,'L’òptim positiu no coincideix amb l’oracle independent.');
  assert(MI.levelFor(q.reasoningFamily)===3&&q.diff===3,'Nivell incorrecte al raonament d’òptim positiu.');
});
const familyExamples=MI.familySpecs.map((family,index)=>({family:family.id,level:family.level,examples:Array.from({length:3},(_,i)=>{const type=family.practiceTypes[i%family.practiceTypes.length];const q=generatePractice(type,family.level,rng(880000+index*11+i));return {generator:type,question:plain(q.question),answer:plain(q.correct),level:q.taskDifficulty};})}));
const failureGroups=Object.fromEntries([...new Set(tests.failures.map(x=>x.split(' #')[0]))].map(k=>[k,tests.failures.filter(x=>x.startsWith(k+' #')).length]));
console.log(JSON.stringify({summary:{generators:tests.generators,generations:tests.generated,oracleChecks:tests.oracleChecks,failures:tests.failures.length,failureGroups},familyExamples,samples},null,2));
if(tests.failures.length){console.error(tests.failures.slice(0,25).join('\n'));process.exitCode=1;}
