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

let seed = 0x16e5ca1e;
const math = Object.create(Math);
math.random = () => {
  seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
  return seed / 4294967296;
};
const context = vm.createContext({ Math: math, console });
vm.runInContext(html.slice(start, end), context, { timeout: 15000 });
const { genEscales2ESO: genScale, genProblemesMesura2ESO: genProblems } =
  vm.runInContext('({genEscales2ESO,genProblemesMesura2ESO})', context);

const plain = value => String(value).replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
const numeric = value => Number(String(value).replace(/\./g, '').replace(',', '.'));
const parse = (question, regex) => {
  const match = question.match(regex);
  assert(match, 'Cannot parse generated exercise: ' + question);
  return match.slice(1).map(numeric);
};
const expectedScaleDomains = {
  16: [50, 100],
  2: [25000, 50000, 100000],
  17: [25000, 50000, 100000],
  p8: [25000, 50000, 100000, 200000]
};
const seenScales = Object.fromEntries(Object.keys(expectedScaleDomains).map(key => [key, new Set()]));
const source16 = new Map();
const target1 = new Map();
const checked = { 'escales:1': 0, 'escales:2': 0, 'escales:16': 0, 'escales:17': 0, 'problemes:8': 0 };

function verify(exercise, answer, unit, label) {
  const match = String(exercise.correct).match(/^([\d,.]+)\s*(m|km)$/);
  assert(match, `${label}: malformed answer ${exercise.correct}`);
  assert.equal(match[2], unit, `${label}: wrong unit`);
  assert(Math.abs(numeric(match[1]) - answer) < 0.00501, `${label}: independent oracle mismatch`);
  assert.equal(exercise.options.length, 4, `${label}: expected four options`);
  assert.equal(new Set(exercise.options).size, 4, `${label}: duplicate options`);
  assert(exercise.options.includes(exercise.correct), `${label}: answer absent from options`);
  assert(exercise.guide.length > 0 && exercise.solution.length > 0, `${label}: missing worked guidance`);
}

for (let i = 0; i < 400; i++) {
  const ex = genScale(16);
  const question = plain(ex.question);
  const [scale, side1, side2] = parse(question, /escala 1:(\d+), un jardí rectangular mesura ([\d,.]+) cm × ([\d,.]+) cm/);
  verify(ex, 2 * scale * (side1 + side2) / 100, 'm', 'escales:16');
  checked['escales:16']++;
  seenScales[16].add(scale);
  const key = `${scale}:${side1}`;
  if (!source16.has(key)) source16.set(key, { question, answer: ex.correct, scale, side1, side2 });
}

for (let i = 0; i < 400; i++) {
  const ex = genScale(1);
  const question = plain(ex.question);
  const [scale, length] = parse(question, /escala 1:(\d+), una paret mesura ([\d,.]+) cm/);
  verify(ex, scale * length / 100, 'm', 'escales:1');
  checked['escales:1']++;
  const key = `${scale}:${length}`;
  if (!target1.has(key)) target1.set(key, { question, answer: ex.correct, scale, length });
}

for (let i = 0; i < 400; i++) {
  const ex = genScale(2);
  const question = plain(ex.question);
  const [scale, length] = parse(question, /escala 1:([\d.]+), dos punts estan separats ([\d,.]+) cm/);
  verify(ex, scale * length / 100000, 'km', 'escales:2');
  checked['escales:2']++;
  seenScales[2].add(scale);
}

for (let i = 0; i < 400; i++) {
  const ex = genScale(17);
  const question = plain(ex.question);
  const [scale, first, second] = parse(question, /escala 1:([\d.]+), una ruta té dos trams rectes de ([\d,.]+) cm i ([\d,.]+) cm/);
  verify(ex, (first + second) * scale / 100000, 'km', 'escales:17');
  checked['escales:17']++;
  seenScales[17].add(scale);
}

for (let i = 0; i < 400; i++) {
  const ex = genProblems(8);
  const question = plain(ex.question);
  const [scale, length] = parse(question, /escala 1:([\d.]+), una ruta mesura ([\d,.]+) cm/);
  verify(ex, length * scale / 100000, 'km', 'problemes:8');
  checked['problemes:8']++;
  seenScales.p8.add(scale);
}

const paired = [...source16.keys()].filter(key => target1.has(key)).sort();
assert(paired.length >= 4, 'Need four shared scale-and-side examples for escales:16 ↔ escales:1');
const pairedExamples = paired.slice(0, 4).map(key => {
  const source = source16.get(key);
  const target = target1.get(key);
  const perimeter = 2 * (source.scale * source.side1 / 100 + source.scale * source.side2 / 100);
  assert(Math.abs(perimeter - numeric(source.answer.split(' ')[0])) < 0.00501);
  assert(Math.abs(source.scale * target.length / 100 - numeric(target.answer.split(' ')[0])) < 0.00501);
  return { shared_scale_and_first_side_cm: key, source: source.question, source_answer: source.answer, target: target.question, target_answer: target.answer };
});

const observedDomains = Object.fromEntries(Object.entries(seenScales).map(([key, values]) => [key, [...values].sort((a, b) => a - b)]));
for (const key of ['16', '2', '17', 'p8']) {
  assert.deepEqual(observedDomains[key], expectedScaleDomains[key], `Scale domain changed for ${key}`);
}
const sourceDomain = new Set(observedDomains['16']);
const structuralWithoutExactPair = [
  { target: 'escales:2', reason: 'the finite scale domains are disjoint (1:50/1:100 versus 1:25,000–1:100,000)' },
  { target: 'escales:17', reason: 'the finite scale domains are disjoint (1:50/1:100 versus 1:25,000–1:100,000)' },
  { target: 'problemes:8', reason: 'the finite scale domains are disjoint (1:50/1:100 versus 1:25,000–1:200,000)' }
];
for (const target of ['2', '17', 'p8']) {
  assert(observedDomains[target].every(scale => !sourceDomain.has(scale)), `Unexpected same-scale overlap with ${target}`);
}

console.log(JSON.stringify({
  lot: 'escales:16 destinations',
  independent_oracle_instances: Object.values(checked).reduce((sum, count) => sum + count, 0),
  verified_by_type: checked,
  paired_examples_sharing_scale_and_first_side_with_escales_1: pairedExamples.length,
  paired_examples: pairedExamples,
  structural_targets_without_exact_pair: structuralWithoutExactPair,
  finite_scale_domains: observedDomains,
  teacher_approved: false
}, null, 2));
