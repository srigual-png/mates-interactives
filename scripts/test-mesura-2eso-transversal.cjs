#!/usr/bin/env node
'use strict';

// Execució real d'exercicis transversals; oracle matemàtic separat del generador.
// Aquesta prova no determina si dues famílies són pedagògicament idèntiques.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const html = fs.readFileSync(path.join(__dirname, '..', '2eso', 'sentit-mesura.html'), 'utf8');
const start = html.indexOf('/* ── GENERADOR · BLOC 1:');
const end = html.indexOf('/* ── AMPLIACIÓ A', start);
assert(start >= 0 && end > start, 'No es localitzen els set generadors reals');
const source = html.slice(start, end);
let turn = 0;
const shuffle = list => {
  const offset = turn % list.length;
  return [...list.slice(offset), ...list.slice(0, offset)];
};
const fmtNum = (x, max = 4) => Number(x).toFixed(max).replace(/0+$/, '').replace(/\.$/, '').replace('.', ',');
const answerUnit = (value, unit, max = 6) => fmtNum(value, max) + ' ' + unit;
const unitAlternatives = (value, unit, max = 6) => {
  const n = fmtNum(value, max), a = unit.replace(/²/g,'2').replace(/³/g,'3'),
    c = unit.replace(/²/g,'^2').replace(/³/g,'^3');
  return [...new Set([n+unit,n+' '+a,n+a,n+' '+c,n+c])];
};
const uniq4 = (correct, pool) => {
  const res = [String(correct)];
  for (const item of shuffle(pool)) {
    if (!res.includes(String(item))) res.push(String(item));
    if (res.length === 4) break;
  }
  assert.equal(res.length, 4, 'Distractors insuficients o duplicats');
  return shuffle(res);
};
const ctx = {
  shuffle, fmtNum, answerUnit, unitAlternatives, uniq4,
  roundTo: (n,p) => Math.round((n+Number.EPSILON)*10**p)/10**p,
  pctStr: n => fmtNum(n,2)+'%', Math,
};
vm.createContext(ctx);
vm.runInContext(source, ctx);

function numeric(value) {
  return Number(String(value).replace(/\./g, '').replace(',', '.'));
}
function unitsInQuestion(question) {
  return [...question.matchAll(/<b>([\d,.]+)\s*(cm|m|dm)<\/b>/g)]
    .map(m => ({value:numeric(m[1]),unit:m[2]}));
}
function parseCorrect(q) {
  const m = String(q.correct).match(/^([\d,.]+)\s+(cm|m|m²|cm²|cm³|L)$/);
  assert(m, 'Resposta amb unitat desconeguda: '+q.correct);
  return {value:numeric(m[1]),unit:m[2]};
}
function verify(q, expected, unit, label) {
  const a = parseCorrect(q);
  assert.equal(a.unit,unit, label+': unitat');
  assert(Math.abs(a.value-expected)<0.011,label+': valor incorrecte '+a.value+' vs '+expected);
  assert.equal(q.options.length,4,label+': quatre opcions');
  assert.equal(new Set(q.options).size,4,label+': alternatives diferents');
  assert(q.options.includes(q.correct),label+': la correcta és una opció');
  assert(Array.isArray(q.solution)&&q.solution.length>=2,label+': solució pas a pas');
}
const triples = [
  ['pitagores',13,'problemes',6,'diagonal'],
  ['perimetres',17,'problemes',12,'corona circular'],
  ['superficies',7,'problemes',4,'volum cilíndric'],
  ['superficies',8,'problemes',5,'lateral del cilindre'],
];
let checked=0;
for (turn=0; turn<8; turn++) {
  for (const [a,at,b,bt,topic] of triples) {
    const qa = ({
      pitagores:ctx.genPitagores2ESO,
      perimetres:ctx.genPerimetresArees2ESO,
      superficies:ctx.genSuperficiesVolums2ESO
    })[a](at);
    const qb=ctx.genProblemesMesura2ESO(bt);
    assert.equal(qa.topicId,a);assert.equal(qb.topicId,b);
    const na=unitsInQuestion(qa.question),nb=unitsInQuestion(qb.question);
    assert.equal(na.length,2,topic+': paràmetres origen');
    assert.equal(nb.length,2,topic+': paràmetres problemes');
    if (topic==='diagonal') {
      verify(qa,Math.hypot(na[0].value,na[1].value),'cm',a+':13');
      verify(qb,Math.hypot(nb[0].value,nb[1].value),'cm',b+':6');
    } else if (topic==='corona circular') {
      verify(qa,Math.round((3.14*((na[0].value+na[1].value)**2-na[0].value**2))*100)/100,'m²',a+':17');
      verify(qb,Math.round((3.14*((nb[0].value+nb[1].value)**2-nb[0].value**2))*100)/100,'m²',b+':12');
    } else if (topic==='volum cilíndric') {
      verify(qa,Math.round(3.14*na[0].value**2*na[1].value*100)/100,'cm³',a+':7');
      verify(qb,Math.round(3.14*nb[0].value**2*nb[1].value*100)/100,'L',b+':4');
    } else {
      verify(qa,Math.round(2*3.14*na[0].value*na[1].value*100)/100,'cm²',a+':8');
      verify(qb,Math.round(3.14*nb[0].value*nb[1].value*100)/100,'cm²',b+':5');
    }
    checked+=2;
  }
}
console.log('OK: '+checked+' exercicis reals comprovats; 4 nuclis transversals i 8 configuracions de seleccio');
