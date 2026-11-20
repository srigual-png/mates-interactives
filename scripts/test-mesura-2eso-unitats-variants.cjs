#!/usr/bin/env node
'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const html = fs.readFileSync(path.join(__dirname, '..', '2eso', 'sentit-mesura.html'), 'utf8');
const dif = fs.readFileSync(path.join(__dirname, '..', 'assets', 'js', 'dificultat-mi.js'), 'utf8');

function readReviewed(name) {
  const match = dif.match(new RegExp('const '+name+'=freeze\\((\\{[^\\n]*\\})\\);'));
  assert(match, 'No es pot llegir '+name);
  return JSON.parse(match[1]);
}
const levels = readReviewed('REVIEWED_LEVELS')['2eso/mesura'].unitats;
const variants = readReviewed('REVIEWED_VARIANTS')['2eso/mesura'].unitats;
assert(levels[0].includes(6), 'El tipus 6 ha de mantenir N1 com a nivell base');
assert(!levels[1].includes(6), 'El nivell N2 només pot venir de la variant');
assert.equal(variants[6].encadenada.level, 2);

const start = html.indexOf('function genUnitats2ESO(forceType)');
const end = html.indexOf('/* ── GENERADOR · BLOC 2:', start);
assert(start >= 0 && end > start, 'No es localitza el generador original');

const fixed = [
  ['2,5 dm³', 'L', '2,5 L', 1],
  ['750 cm³', 'mL', '750 mL', 1],
  ['1,2 m³', 'L', '1200 L', 2],
  ['3,4 L', 'cm³', '3400 cm³', 2],
  ['850 mL', 'cm³', '850 cm³', 1],
  ['2400 L', 'm³', '2,4 m³', 2],
];
let selected = 0;
const shuffle = a => {
  if (a.length === 6 && a[0]?.v === 2.5 && a[0]?.from === 'dm³') {
    return [a[selected], ...a.filter((_, i) => i !== selected)];
  }
  return [...a];
};
const fmtNum = x => String(Number(x)).replace('.', ',');
const answerUnit = (v, unit) => fmtNum(v) + ' ' + unit;
const uniq4 = (correct, alternatives) => {
  const all = [String(correct), ...alternatives.map(String)];
  return [...new Set(all)].slice(0, 4);
};
const context = {
  shuffle, fmtNum, answerUnit, uniq4,
  metricDistractors: (v, unit, factors) => factors.map(f => answerUnit(v*f, unit)),
  unitAlternatives: (v, unit) => [answerUnit(v, unit)],
  nextUnitsType: () => 6,
};
vm.createContext(context);
vm.runInContext(html.slice(start, end), context);

for (selected = 0; selected < fixed.length; selected++) {
  const [from, to, expected, level] = fixed[selected];
  const q = context.genUnitats2ESO(6);
  assert.equal(q.topicId, 'unitats');
  assert.equal(q.type, 6);
  assert(q.question.includes(from), 'Origen incorrecte: ' + from);
  assert(q.question.includes('<b>' + to + '</b>'), 'Destí incorrecte: ' + to);
  assert.equal(q.correct, expected, 'Conversió incorrecta: ' + from);
  assert.equal(q.options.length, 4);
  assert.equal(new Set(q.options).size, 4, 'Opcions duplicades');
  assert(q.options.includes(q.correct));
  const effective = q.difficultyVariant
    ? variants[6][q.difficultyVariant]?.level
    : levels.findIndex(group => group.includes(6)) + 1;
  assert.equal(effective, level, 'Nivell de ' + from);
  assert.equal(q.difficultyVariant, level === 2 ? 'encadenada' : undefined);
}
console.log('OK: 6 casos tipus 6 verificats (3 N1 directes i 3 N2 encadenats)');
