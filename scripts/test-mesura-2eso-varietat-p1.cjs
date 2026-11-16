#!/usr/bin/env node
'use strict';

// Proves dels generadors reals, aïllats del navegador. No certifiquen la UI.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const html = fs.readFileSync(path.join(__dirname, '..', '2eso', 'sentit-mesura.html'), 'utf8');

const start = html.indexOf('function genEstimacioError2ESO(forceType)');
const end = html.indexOf('/* ── AMPLIACIÓ A · FIGURES SEMBLANTS I MESURES', start);
assert(start !== -1 && end > start, 'No es troben els generadors de mesura');
const source = html.slice(start, end);

let choice = 0;
const fmtNum = (x, max = 4) => {
  let s = Number(x).toFixed(max).replace(/0+$/, '').replace(/\.$/, '');
  return s.replace('.', ',');
};
const shuffle = a => {
  const offset = choice % a.length;
  return [...a.slice(offset), ...a.slice(0, offset)];
};
const answerUnit = (value, unit, max = 6) => fmtNum(value, max) + ' ' + unit;
const unitAlternatives = (value, unit, max = 6) => [answerUnit(value, unit, max)];
const uniq4 = (correct, pool) => {
  const unique = [String(correct)];
  for (const item of shuffle(pool)) {
    if (!unique.includes(String(item))) unique.push(String(item));
    if (unique.length === 4) break;
  }
  // La prova no permet opcions genèriques que no siguin distractors matemàtics.
  assert.equal(unique.length, 4, 'Calen quatre respostes matemàtiques diferents');
  return shuffle(unique);
};
const pctStr = x => fmtNum(x, 2) + '%';
const countAnswer = (n, singular, plural) => n + ' ' + (n === 1 ? singular : (plural || singular + 's'));
const ctx = {shuffle, fmtNum, answerUnit, unitAlternatives, uniq4, pctStr, countAnswer,
  roundTo: (n, places) => Math.round((n + Number.EPSILON) * 10 ** places) / 10 ** places,
  floorTo: (n, places) => Math.floor(n * 10 ** places) / 10 ** places,
  ceilTo: (n, places) => Math.ceil(n * 10 ** places) / 10 ** places,
  nextEstimateType: () => 1, nextProblemType: () => 1, Math};
vm.createContext(ctx);
vm.runInContext(source, ctx);

const getNumbers = q => [...q.question.matchAll(/<b>([\d,.]+)(?:\s*(?:cm|m))?<\/b>/g)]
  .map(m => Number(m[1].replace(/\./g, '').replace(',', '.')));
const parseAnswer = s => Number(s.match(/[\d,.]+/)[0].replace(/\./g, '').replace(',', '.'));
const semantic = {pots: new Set(), ombres: new Set(), relEstimacio: new Set(),
  absEstimacio: new Set(), relProblemes: new Set()};

for (let i = 0; i < 24; i++) {
  choice = i;
  for (const type of [9, 14, 17]) {
    const q = ctx.genEstimacioError2ESO(type);
    assert(q.options.includes(q.correct), 'Estimacio ' + type + ': falta resposta correcta');
    assert.equal(new Set(q.options).size, 4, 'Estimacio ' + type + ': opcions repetides');
    if (type === 9) {
      const n = getNumbers(q);
      assert.equal(n.length, 4);
      const ea = Math.abs(n[1] - n[0]) / n[0];
      const eb = Math.abs(n[3] - n[2]) / n[2];
      assert.equal(q.correct, ea < eb ? 'La mesura A' : 'La mesura B');
      semantic.relEstimacio.add(q.correct);
    }
    if (type === 14) {
      assert(/<b>[\d,.]+ (?:m|cm|L)<\/b>/.test(q.question),
        'Estimacio 14: cal mostrar la unitat de mesura');
      assert(!q.question.includes('Quin instrument'), 'Enunciat inesperat');
    }
    if (type === 17) {
      const n = getNumbers(q);
      assert.equal(n.length, 3);
      const ea = Math.abs(n[1] - n[0]), eb = Math.abs(n[2] - n[0]);
      assert.equal(q.correct, ea < eb ? "L’aproximació A" : "L’aproximació B");
      semantic.absEstimacio.add(q.correct);
    }
  }
  for (const type of [1, 10, 16]) {
    const q = ctx.genProblemesMesura2ESO(type);
    assert(q.options.includes(q.correct), 'Problemes ' + type + ': falta resposta correcta');
    assert.equal(new Set(q.options).size, 4, 'Problemes ' + type + ': opcions repetides');
    if (type === 1) {
      const n = getNumbers(q);
      assert.equal(n.length, 7, 'Pintura: set magnituds');
      const expected = Math.ceil((n[0] * n[1] - n[2] * n[3] - n[4] * n[5]) / n[6]);
      assert.equal(parseAnswer(q.correct), expected);
      semantic.pots.add(expected);
    }
    if (type === 10) {
      const n = getNumbers(q);
      assert.equal(n.length, 3);
      const expected = n[0] * n[2] / n[1];
      assert(Math.abs(parseAnswer(q.correct) - expected) < 1e-9, 'Proporcio ombres');
      semantic.ombres.add(parseAnswer(q.correct));
    }
    if (type === 16) {
      const n = getNumbers(q);
      assert.equal(n.length, 3);
      const ea = Math.abs(n[1] - n[0]) / n[0];
      const eb = Math.abs(n[2] - n[0]) / n[0];
      assert.equal(q.correct, ea < eb ? 'Mesura A' : 'Mesura B');
      semantic.relProblemes.add(q.correct);
    }
  }
}

assert(semantic.pots.has(1) && semantic.pots.has(2) &&
  semantic.pots.has(3) && semantic.pots.has(4), 'Els pots han de variar 1–4');
assert(semantic.ombres.size >= 3, 'Calen almenys 3 altures diferents');
for (const key of ['relEstimacio', 'absEstimacio', 'relProblemes']) {
  assert.equal(semantic[key].size, 2, key + ': han de guanyar tant A com B');
}
console.log('OK: 144 generacions reals revisades (24 × 6 tipus), oracles i varietat semantica');
