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

let seed = 0xaeed2310;
const math = Object.create(Math);
math.random = () => {
  seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
  return seed / 4294967296;
};
const ctx = vm.createContext({ Math: math, console });
vm.runInContext(html.slice(start, end), ctx, { timeout: 15000 });
const { problem: genProblem, surface: genSurface } = vm.runInContext(
  '({problem:genProblemesMesura2ESO,surface:genSuperficiesVolums2ESO})', ctx
);
const clean = value => String(value).replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
const num = value => Number(String(value).replace(',', '.'));
const samples = { problem: new Map(), surface8: new Map(), surface19: new Map() };
const checked = { 'problemes:5': 0, 'superficies:8': 0, 'superficies:19': 0 };

function verify(exercise, label) {
  assert.equal(exercise.options.length, 4, `${label}: expected four options`);
  assert.equal(new Set(exercise.options).size, 4, `${label}: duplicate options`);
  assert(exercise.options.includes(exercise.correct), `${label}: answer absent from options`);
  assert(exercise.guide.length >= 3 && exercise.solution.length >= 2, `${label}: missing guidance`);
}

for (const [name, type, iterations] of [['problem', 5, 400], ['surface8', 8, 2000], ['surface19', 19, 2000]]) {
  for (let i = 0; i < iterations; i++) {
    const exercise = name === 'problem' ? genProblem(type) : genSurface(type);
    const question = clean(exercise.question);
    let radius, height;
    if (name === 'problem') {
      const match = question.match(/diàmetre ([\d,.]+) cm i altura ([\d,.]+) cm/);
      assert(match, 'Cannot parse problemes:5: ' + question);
      radius = num(match[1]) / 2;
      height = num(match[2]);
      const answer = exercise.correct.match(/^([\d,.]+) cm²$/);
      assert(answer, exercise.correct);
      assert(Math.abs(num(answer[1]) - 3.14 * (2 * radius) * height) < 0.00501, 'Independent label-area oracle mismatch');
    } else if (name === 'surface8') {
      const match = question.match(/radi ([\d,.]+) cm i altura ([\d,.]+) cm/);
      assert(match, 'Cannot parse superficies:8: ' + question);
      radius = num(match[1]);
      height = num(match[2]);
      const answer = exercise.correct.match(/^([\d,.]+) cm²$/);
      assert(answer, exercise.correct);
      assert(Math.abs(num(answer[1]) - 2 * 3.14 * radius * height) < 0.00501, 'Independent lateral-area oracle mismatch');
    } else {
      const match = question.match(/radi ([\d,.]+) cm i altura ([\d,.]+) cm/);
      assert(match, 'Cannot parse superficies:19: ' + question);
      radius = num(match[1]);
      height = num(match[2]);
      const dimensions = exercise.correct.match(/^([\d,.]+) cm × ([\d,.]+) cm$/);
      assert(dimensions, exercise.correct);
      assert(Math.abs(num(dimensions[1]) - 2 * 3.14 * radius) < 0.00501, 'Independent rectangle-circumference oracle mismatch');
      assert.equal(num(dimensions[2]), height, 'Unwrapped rectangle height mismatch');
    }
    verify(exercise, name);
    const key = `${radius}:${height}`;
    if (!samples[name].has(key)) samples[name].set(key, { question, answer: exercise.correct, radius, height });
    checked[name === 'problem' ? 'problemes:5' : `superficies:${type}`]++;
  }
}

const exactOverlap = target => [...samples.problem.keys()].filter(key => samples[target].has(key));
assert.equal(exactOverlap('surface8').length, 0, 'Unexpected exact radius/height match with superficies:8');
assert.equal(exactOverlap('surface19').length, 0, 'Unexpected exact radius/height match with superficies:19');
const problemRadiusDomain = [...new Set([...samples.problem.values()].map(x => x.radius))].sort((a, b) => a - b);
const problemHeightDomain = [...new Set([...samples.problem.values()].map(x => x.height))].sort((a, b) => a - b);
const surfaceRadiusDomain = [...new Set([...samples.surface8.values(), ...samples.surface19.values()].map(x => x.radius))].sort((a, b) => a - b);
const surfaceHeightDomain = [...new Set([...samples.surface8.values(), ...samples.surface19.values()].map(x => x.height))].sort((a, b) => a - b);
assert.deepEqual(problemHeightDomain, [12, 14, 15, 20]);
assert.deepEqual(surfaceHeightDomain, [4, 5, 6, 8, 10]);

const sameRadiusExamples = [...samples.problem.values()].flatMap(problem => {
  const surface8 = [...samples.surface8.values()].find(x => x.radius === problem.radius);
  const surface19 = [...samples.surface19.values()].find(x => x.radius === problem.radius);
  if (!surface8 || !surface19) return [];
  assert.notEqual(problem.height, surface8.height);
  assert.notEqual(problem.height, surface19.height);
  return [{
    common_radius_cm: problem.radius,
    label: { question: problem.question, answer: problem.answer, height_cm: problem.height },
    lateral_area: { question: surface8.question, answer: surface8.answer, height_cm: surface8.height },
    unfolded_lateral_surface: { question: surface19.question, answer: surface19.answer, height_cm: surface19.height },
    comparison: 'Same radius after d/2 normalization, different heights; no exact physical cylinder fixture'
  }];
}).sort((a, b) => a.common_radius_cm - b.common_radius_cm);
assert.equal(sameRadiusExamples.length, 3);

console.log(JSON.stringify({
  independent_oracle_instances: Object.values(checked).reduce((sum, value) => sum + value, 0),
  verified_by_type: checked,
  sampled_unique_fixtures: Object.fromEntries(Object.entries(samples).map(([name, values]) => [name, values.size])),
  exact_radius_height_pairs: { 'problemes:5↔superficies:8': exactOverlap('surface8').length, 'problemes:5↔superficies:19': exactOverlap('surface19').length },
  finite_parameter_domains_observed: { problem_radius_cm: problemRadiusDomain, problem_height_cm: problemHeightDomain, surface_radius_cm: surfaceRadiusDomain, surface_height_cm: surfaceHeightDomain },
  shared_radius_contrasts_with_different_heights: sameRadiusExamples,
  interpretation: 'Problemes:5 and superficies:8 use the same lateral-area formula after diameter-to-radius normalization; superficies:19 instead returns the lateral-unfolding rectangle dimensions. No shared height exists across the finite pools.',
  teacher_approved: false
}, null, 2));
