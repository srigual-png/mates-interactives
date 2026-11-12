const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
require('../assets/js/practica-sistema-decimal-1eso.js');
require('../assets/js/raonament-numeric-1eso.js');

const M = globalThis.MIDecimalPractice;
const R = globalThis.MIFirstNumericTasks;
let seed = 0xdec1a1;
function random(min, max) {
  seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
  return min + Math.floor(seed / 4294967296 * (max - min + 1));
}
function unitRandom() {
  seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
  return seed / 4294967296;
}
const buildOpts = (correct, wrongs) => [correct, ...wrongs.filter(value => value !== correct)].slice(0, 4);
const checks = { spellingBoundaries: 0, generatedByType: {}, baseTypes: {}, positionalChanges: 0, positionalEquivalences: 0, constrainedConstruction: 0 };
const examples = {};
const plain = value => String(value).replace(/<br\s*\/?\s*>/gi, ' ').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

// Canonical Catalan forms cover hyphens D-U-C, spaces, zeroes, and the mil boundary.
const canonical = new Map([
  [0, 'zero'], [21, 'vint-i-u'], [29, 'vint-i-nou'], [31, 'trenta-u'],
  [100, 'cent'], [101, 'cent u'], [231, 'dos-cents trenta-u'],
  [999, 'nou-cents noranta-nou'], [1000, 'mil'], [1001, 'mil u'],
  [21000, 'vint-i-un mil'], [100000, 'cent mil'],
  [999999, 'nou-cents noranta-nou mil nou-cents noranta-nou']
]);
for (const [value, expected] of canonical) {
  assert.equal(M.words(value), expected, `grafia de ${value}`);
  checks.spellingBoundaries++;
}
for (const [value, form] of [[8, 'huit'], [17, 'desset'], [18, 'devuit'], [19, 'denou'], [80, 'huitanta']]) {
  assert.equal(M.spelling(form, M.words(value)).ok, true, `variant lèxica ${form}`);
  checks.spellingBoundaries++;
}
assert.equal(M.spelling('vint i u', M.words(21)).ok, false, 'guionet absent');
assert.throws(() => M.words(-1), RangeError);
assert.throws(() => M.words(1000000), RangeError);

// The reviewed classifier and the page's family list must agree for every variant.
const root = path.resolve(__dirname, '..');
let families = null, familyLevels = [1, 1, 1, 1, 2, 2, 3];
if (process.env.MI_SKIP_CLASSIFICATION_SOURCE_CHECKS !== '1') {
  const difficultySource = fs.readFileSync(path.join(root, 'assets/js/dificultat-mi.js'), 'utf8');
  const mapText = difficultySource.match(/const DECIMAL_PRACTICE_LEVELS=freeze\((\{[^\n]+\})\);/);
  assert(mapText, 'mapa de dificultat decimal');
  const levels = Function(`return (${mapText[1]})`)();
  assert.deepEqual(levels, {
    'lectura-paraules-a-xifres': 1,
    'escriure-xifres-a-paraules': 1,
    'guionets-numerals-du-c': 1,
    'descomposicio-equivalent-reagrupament': 2,
    'equivalencia-ordres-posicionals': 2,
    'auditar-error-de-posicio': 2
  });
  assert(/"decimal_sys":\[\[1,2,3,4\],\[\],\[\]\]/.test(difficultySource), 'nivell central dels generadors base');
  const page = fs.readFileSync(path.join(root, '1eso/sentit-numeric.html'), 'utf8');
  const groupsText = page.match(/decimal_sys:(\[[^\r\n]+\])/);
  assert(groupsText, 'grups adaptatius decimal_sys');
  families = Function(`return (${groupsText[1]})`)();
  assert.equal(families.length, 7, 'famílies matemàtiques reals');
  const allTypes = families.flat();
  assert.equal(allTypes.length, 12, 'variants comptades una sola vegada');
  assert.equal(new Set(allTypes).size, 12, 'cap generador duplicat entre famílies');
  const levelOf = type => typeof type === 'number' ? ({ 1001: 3, 1002: 2 })[type] || 1 : levels[type];
  familyLevels = families.map((family, i) => {
    const values = [...new Set(family.map(levelOf))];
    assert.equal(values.length, 1, `nivell únic per família ${i + 1}`);
    return values[0];
  });
  assert.deepEqual(familyLevels, [1, 1, 1, 1, 2, 2, 3]);
  const generator = page.slice(page.indexOf('function genDecimalSysType'), page.indexOf('// ── GEN OPERACIONS'));
  assert(generator.includes("Quin és el valor posicional"), 'accentuació de l’enunciat');
  assert(generator.includes("'Posició: '"), 'accentuació de la solució');
  assert.equal((generator.match(/diff=1;/g) || []).length, 4, 'quatre generadors base N1');
  assert(!/diff=[23];/.test(generator), 'cap nivell intern divergent als generadors base');
  assert.equal(R.catalog.find(item => item.id === 'canvi-posicional').level, 2);
  assert.equal(R.catalog.find(item => item.id === 'xifres-amb-condicions').level, 3);
}

// Every generated response is accepted by the production grader over fixed seed ranges.
const practiceTypes = [
  'lectura-paraules-a-xifres', 'escriure-xifres-a-paraules', 'guionets-numerals-du-c',
  'descomposicio-equivalent-reagrupament', 'equivalencia-ordres-posicionals', 'auditar-error-de-posicio'
];
for (const type of practiceTypes) {
  const sampleRows = [];
  for (let i = 0; i < 250; i++) {
    const q = M.generate(type, random, buildOpts);
    assert(q.question && q.solution.length && q.guide.length, `contingut ${type}`);
    assert.equal(M.grade(q, q.correct).ok, true, `corrector ${type} #${i}`);
    checks.generatedByType[type] = (checks.generatedByType[type] || 0) + 1;
    if (i < 3) sampleRows.push({ question: plain(q.question), answer: q.correct });
  }
  examples[type] = sampleRows;
}

// Exercise the legacy generator variants with independent known positional data.
for (const [type, data] of [
  [1, { n: 123456, digit: 3, position: 3 }],
  [2, { n: 40506 }],
  [3, { n: 40506 }],
  [4, { n: 123456, digit: 3, position: 3 }]
]) {
  const q = M.base({ type, diff: 1, options: [], solution: [] }, data, buildOpts);
  assert.equal(M.grade(q, q.correct).ok, true, `corrector del generador base ${type}`);
  checks.baseTypes[type] = 1;
  (examples[type === 1 || type === 4 ? 'valor-posicional' : 'composicio-descomposicio'] ||= []).push({ question: plain(q.question), answer: q.correct });
}
for (const [type, data, family] of [
  [1, { n: 840020, digit: 4, position: 4 }, 'valor-posicional'],
  [2, { n: 90702 }, 'composicio-descomposicio']
]) {
  const q = M.base({ type, diff: 1, options: [], solution: [] }, data, buildOpts);
  assert.equal(M.grade(q, q.correct).ok, true, `mostra addicional del generador ${type}`);
  examples[family].push({ question: plain(q.question), answer: q.correct });
}

for (let i = 0; i < 250; i++) {
  const raw = R.generate('canvi-posicional', unitRandom);
  const q = M.positionalChange(raw, random, buildOpts);
  const { digit, from, to } = q.reasoningData;
  assert.equal(Number(String(q.correct).replace(/\./g, '')), digit * (to - from));
  assert.equal(M.grade(q, q.correct).ok, true, `canvi posicional #${i}`);
  checks.positionalChanges++;
  if (i === 0) (examples['equivalencies-i-errors'] ||= []).push({ variant: 'canvi-posicional', question: q.question, answer: q.correct });
}
for (let i = 0; i < 250; i++) {
  const q = R.generate('xifres-amb-condicions', unitRandom);
  const digits = q.reasoningData.digits;
  const oracle = Math.max(...digits.flatMap((unit, index) => unit % 2 === 0
    ? [Number([...digits.filter((_, j) => j !== index).sort((a, b) => b - a), unit].join(''))]
    : []));
  assert.equal(Number(q.correct), oracle, `construcció amb restriccions #${i}`);
  checks.constrainedConstruction++;
  if (i < 3) (examples['construccio-amb-restriccions'] ||= []).push({ question: q.question, answer: q.correct });
}

// Pair the three variants in the shared equivalence/change/error family.
for (let i = 0; i < 250; i++) {
  const q = M.generate('equivalencia-ordres-posicionals', random, buildOpts);
  assert.equal(M.grade(q, q.correct).ok, true, `equivalència #${i}`);
  checks.positionalEquivalences++;
  if (i < 1) (examples['equivalencies-i-errors'] ||= []).push({ variant: 'equivalencia-ordres-posicionals', question: q.question, answer: q.correct });
}
examples['lectura-i-escriptura'] = [examples['lectura-paraules-a-xifres'][0], examples['escriure-xifres-a-paraules'][0], examples['lectura-paraules-a-xifres'][1]];
examples['ortografia-numerals'] = examples['guionets-numerals-du-c'];
examples['reagrupament'] = examples['descomposicio-equivalent-reagrupament'];
examples['equivalencies-i-errors'].push({ variant: 'auditar-error-de-posicio', ...examples['auditar-error-de-posicio'][0] });
examples['equivalencies-i-errors'] = examples['equivalencies-i-errors'].slice(0, 3);
examples['valor-posicional'] = examples['valor-posicional'].slice(0, 3);
examples['composicio-descomposicio'] = examples['composicio-descomposicio'].slice(0, 3);
examples['construccio-amb-restriccions'] = examples['construccio-amb-restriccions'].slice(0, 3);
for (const [name, rows] of Object.entries(examples).filter(([key]) => !practiceTypes.includes(key))) {
  if (['valor-posicional', 'composicio-descomposicio', 'lectura-i-escriptura', 'ortografia-numerals', 'reagrupament', 'equivalencies-i-errors', 'construccio-amb-restriccions'].includes(name)) assert.equal(rows.length, 3, `tres exemples de ${name}`);
}

console.log(JSON.stringify({ passed: true, checks, total: checks.spellingBoundaries + Object.values(checks.generatedByType).reduce((a, b) => a + b, 0) + Object.values(checks.baseTypes).reduce((a, b) => a + b, 0) + checks.positionalChanges + checks.positionalEquivalences + checks.constrainedConstruction, families: familyLevels, examples }, null, 2));


