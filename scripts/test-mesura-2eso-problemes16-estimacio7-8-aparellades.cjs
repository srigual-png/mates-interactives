#!/usr/bin/env node
'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const html = fs.readFileSync(path.join(__dirname, '..', '2eso', 'sentit-mesura.html'), 'utf8');
const start = html.indexOf('/* ── UTILS NUMÈRIQUES');
const anchor = html.indexOf("return {topicId:'problemes',type,course:'2n'", start);
const end = html.indexOf('\n}', anchor) + 2;
assert(start >= 0 && anchor > start && end > anchor);

let seed = 0xb74542ab;
const math = Object.create(Math);
math.random = () => {
  seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
  return seed / 4294967296;
};
const ctx = vm.createContext({ Math: math, console });
vm.runInContext(html.slice(start, end), ctx, { timeout: 15000 });
const estim = vm.runInContext('genEstimacioError2ESO', ctx);
const problem = vm.runInContext('genProblemesMesura2ESO', ctx);
const plain = value => String(value).replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
const num = value => Number(String(value).replace(',', '.').replace(/\.$/, ''));
const calc = { 7: new Map(), 8: new Map(), 13: new Map() };
const decisions = new Map();
const problemReferences = new Set();
const estimate13References = new Set();
const checked = { 7: 0, 8: 0, 13: 0, 16: 0 };

function verifyOptions(exercise, type) {
  assert.equal(exercise.options.length, 4, `${type}: expected four choices`);
  assert.equal(new Set(exercise.options).size, 4, `${type}: duplicate choices`);
  assert(exercise.options.includes(exercise.correct), `${type}: answer absent from choices`);
  assert(exercise.guide.length > 0 && exercise.solution.length > 0, `${type}: missing explanation`);
}

for (const type of [7, 8, 13, 16]) {
  for (let i = 0; i < 400; i++) {
    const exercise = type === 16 ? problem(16) : estim(type);
    const question = plain(exercise.question);
    if (type === 16) {
      const match = question.match(/referència d’un objecte és ([\d,.]+) cm.*?A = ([\d,.]+) cm i B = ([\d,.]+) cm/);
      assert(match, 'Cannot parse problemes:16: ' + question);
      const [, rawReal, rawA, rawB] = match;
      const real = num(rawReal), A = num(rawA), B = num(rawB);
      const errorA = Math.abs(A - real), errorB = Math.abs(B - real);
      const expected = errorA < errorB ? 'Mesura A' : 'Mesura B';
      assert.notEqual(errorA, errorB);
      assert.equal(exercise.correct, expected, 'Independent decision oracle mismatch');
      const key = `${real}:${B}`;
      if (!decisions.has(key)) decisions.set(key, { question, answer: exercise.correct, real, A, B, relativeB: errorB / real });
      problemReferences.add(real);
    } else if (type === 13) {
      const match = question.match(/error absolut de ([\d,.]+) sobre un valor de referència de ([\d,.]+)/);
      assert(match, 'Cannot parse estimacio:13: ' + question);
      const absoluteError = num(match[1]), real = num(match[2]);
      const expected = absoluteError / real * 100;
      const actual = num(String(exercise.correct).replace('%', ''));
      assert(Math.abs(actual - expected) < 1e-6, 'Independent percentage oracle mismatch');
      const key = `${real}:${absoluteError}`;
      if (!calc[13].has(key)) calc[13].set(key, { question, answer: exercise.correct, real, absoluteError });
      estimate13References.add(real);
    } else {
      const match = question.match(/referència és ([\d,.]+) i una aproximació és ([\d,.]+)/);
      assert(match, `Cannot parse estimacio:${type}: ${question}`);
      const real = num(match[1]), approximate = num(match[2]);
      const relative = Math.abs(approximate - real) / real;
      const actual = type === 7 ? num(exercise.correct) : num(String(exercise.correct).replace('%', '')) / 100;
      assert(Math.abs(actual - relative) < 1e-6, `Independent oracle mismatch for estimacio:${type}`);
      const key = `${real}:${approximate}`;
      if (!calc[type].has(key)) calc[type].set(key, { question, answer: exercise.correct, real, approximate, relative });
    }
    verifyOptions(exercise, `type ${type}`);
    checked[type]++;
  }
}

assert.deepEqual([...problemReferences].sort((a, b) => a - b), [80, 120, 150, 250]);
assert.deepEqual([...estimate13References].sort((a, b) => a - b), [100, 200, 500, 1000]);
assert([...problemReferences].every(value => !estimate13References.has(value)), 'Unexpected reference overlap with estimacio:13');

const shared = [...decisions.keys()].filter(key => calc[7].has(key) && calc[8].has(key)).sort();
assert.equal(shared.length, 1, 'Expected the one genuine shared reference/B fixture');
const paired = shared.map(key => {
  const decision = decisions.get(key);
  const decimal = calc[7].get(key);
  const percent = calc[8].get(key);
  assert(Math.abs(decision.relativeB - decimal.relative) < 1e-8);
  assert(Math.abs(decimal.relative - percent.relative) < 1e-8);
  return {
    shared_reference_and_instrument_B: key,
    decision: { question: decision.question, answer: decision.answer, relative_error_B: decision.relativeB },
    relative_decimal: { question: decimal.question, answer: decimal.answer },
    relative_percent: { question: percent.question, answer: percent.answer },
    interpretation: 'The shared B error is a subcalculation; choosing between A and B additionally compares both errors and makes a decision.'
  };
});

console.log(JSON.stringify({
  verified: Object.values(checked).reduce((sum, value) => sum + value, 0),
  verified_by_type: { 'estimacio:7': checked[7], 'estimacio:8': checked[8], 'estimacio:13': checked[13], 'problemes:16': checked[16] },
  shared_with_estimacio_7_and_8: paired.length,
  paired_examples: paired,
  structural_targets_without_exact_pair: [{
    target: 'estimacio:13',
    reason: 'reference domains are disjoint: problemes:16 uses 80/120/150/250 cm; estimacio:13 uses 100/200/500/1000'
  }],
  teacher_approved: false
}, null, 2));
assert.equal(Object.values(checked).reduce((sum, value) => sum + value, 0), 1600);
