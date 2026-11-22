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
assert(start >= 0 && anchor > start && end > anchor, 'Scale generators unavailable');

let seed = 0x12e5ca1e;
const math = Object.create(Math);
math.random = () => {
  seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
  return seed / 4294967296;
};
const context = vm.createContext({ Math: math, console });
vm.runInContext(html.slice(start, end), context, { timeout: 15000 });
const genScale = vm.runInContext('genEscales2ESO', context);

const plain = value => String(value).replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
const numeric = value => Number(String(value).replace(',', '.'));
const answerValue = value => numeric(String(value).match(/^[\d,.]+/)[0]);
const parse = (question, regex) => {
  const match = question.match(regex);
  assert(match, 'Cannot parse generated exercise: ' + question);
  return match.slice(1).map(numeric);
};
const expected = {
  3: { n: [25, 50, 100, 200], ratio: [1 / 200, 1 / 25] },
  5: { k: [2, 3, 4, 5], ratio: [2, 5] },
  12: { k: [1.5, 2, 2.5, 3, 4], ratio: [1.5, 4] }
};
const observations = { 3: { scales: new Set(), ratios: new Set() }, 5: { scales: new Set(), ratios: new Set() }, 12: { scales: new Set(), ratios: new Set() } };
const matched = new Map();
const checked = { 3: 0, 5: 0, 12: 0 };

function verify(exercise, answer, unit, label) {
  const match = String(exercise.correct).match(/^([\d,.]+)(?:\s*(cm))?$/);
  assert(match, `${label}: malformed answer ${exercise.correct}`);
  assert.equal(match[2] || '', unit, `${label}: wrong unit`);
  assert(Math.abs(numeric(match[1]) - answer) < 0.00501, `${label}: independent oracle mismatch`);
  assert.equal(exercise.options.length, 4, `${label}: expected four options`);
  assert.equal(new Set(exercise.options).size, 4, `${label}: duplicate options`);
  assert(exercise.options.includes(exercise.correct), `${label}: answer absent from options`);
  assert(exercise.guide.length > 0 && exercise.solution.length > 0, `${label}: missing worked guidance`);
}

for (const type of [3, 5, 12]) {
  for (let i = 0; i < 400; i++) {
    const exercise = genScale(type);
    const question = plain(exercise.question);
    if (type === 3) {
      const [realM, scale] = parse(question, /longitud real de ([\d,.]+) m s’ha de representar a escala 1:(\d+)/);
      const planCm = realM * 100 / scale;
      verify(exercise, planCm, 'cm', 'escales:3');
      observations[3].scales.add(scale);
      observations[3].ratios.add(1 / scale);
    } else if (type === 5) {
      const [realCm, factor] = parse(question, /peça real de ([\d,.]+) cm es dibuixa a escala d’ampliació ([\d,.]+):1/);
      const drawingCm = realCm * factor;
      verify(exercise, drawingCm, 'cm', 'escales:5');
      observations[5].scales.add(factor);
      observations[5].ratios.add(factor);
      const key = `${factor}:${realCm}`;
      if (!matched.has(key)) matched.set(key, { type5: { question, answer: exercise.correct, factor, realCm } });
    } else {
      const [smallCm, bigCm] = parse(question, /costat passa de ([\d,.]+) cm a ([\d,.]+) cm/);
      const factor = bigCm / smallCm;
      verify(exercise, factor, '', 'escales:12');
      observations[12].scales.add(factor);
      observations[12].ratios.add(factor);
      const key = `${factor}:${smallCm}`;
      if (!matched.has(key)) matched.set(key, {});
      matched.get(key).type12 = { question, answer: exercise.correct, factor, smallCm, bigCm };
    }
    checked[type]++;
  }
}

const pairs = [...matched.entries()]
  .filter(([, pair]) => pair.type12 && pair.type5)
  .sort(([a], [b]) => a.localeCompare(b))
  .slice(0, 4)
  .map(([key, pair]) => {
    assert(Math.abs(pair.type12.factor * pair.type12.smallCm - pair.type12.bigCm) < 0.00501);
    assert(Math.abs(pair.type5.factor * pair.type5.realCm - answerValue(pair.type5.answer)) < 0.00501);
    return { shared_enlargement_factor_and_original_length_cm: key, type12: pair.type12, type5: pair.type5 };
  });
assert.equal(pairs.length, 4, 'Need four paired examples for escales:12 ↔ escales:5');

const domains = {
  'escales:3_reduction_factor_plan_over_real': [...observations[3].ratios].sort((a, b) => a - b),
  'escales:12_enlargement_factor': [...observations[12].ratios].sort((a, b) => a - b),
  'escales:5_enlargement_factor': [...observations[5].ratios].sort((a, b) => a - b)
};
assert.deepEqual([...observations[3].scales].sort((a, b) => a - b), expected[3].n);
assert.deepEqual([...observations[12].scales].sort((a, b) => a - b), expected[12].k);
assert.deepEqual([...observations[5].scales].sort((a, b) => a - b), expected[5].k);
assert([...observations[3].ratios].every(ratio => !observations[12].ratios.has(ratio)), 'Reduction and enlargement factor domains unexpectedly overlap');

console.log(JSON.stringify({
  lot: 'escales:12 destinations',
  independent_oracle_instances: Object.values(checked).reduce((sum, count) => sum + count, 0),
  verified_by_type: checked,
  paired_examples_sharing_factor_and_original_length_with_escales_5: pairs.length,
  paired_examples: pairs,
  structural_targets_without_exact_pair: [{
    target: 'escales:3',
    reason: 'the scale-parameter domains are disjoint: escales:12 enlarges by 1.5–4, while escales:3 reduces by 1:25–1:200 and also converts m to cm'
  }],
  finite_factor_domains: domains,
  teacher_approved: false
}, null, 2));
