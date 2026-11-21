#!/usr/bin/env node
'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const html = fs.readFileSync(path.join(__dirname, '..', '2eso', 'sentit-mesura.html'), 'utf8');
const file = fs.readFileSync(path.join(__dirname, '..', 'assets', 'js', 'dificultat-mi.js'), 'utf8');
const levelLine = file.split('\n').find(x => x.includes('const REVIEWED_LEVELS=freeze('));
assert(levelLine, 'Falta el mapa revisat de nivells');
const json = levelLine.match(/const REVIEWED_LEVELS=freeze\((\{.*\})\);/);
assert(json, 'No es pot interpretar REVIEWED_LEVELS');
const levels = JSON.parse(json[1])['2eso/mesura'];

const levelOf = (topic, type) => {
  const found = levels[topic].map((items, index) => items.includes(type) ? index + 1 : null).filter(Boolean);
  assert.equal(found.length, 1, 'Unicitat de nivell: ' + topic + '/' + type);
  return found[0];
};
assert.equal(levelOf('unitats', 18), 2);
assert.equal(levelOf('problemes', 4), 1);
assert.equal(levelOf('superficies', 7), 1);
assert.equal(levelOf('superficies', 8), 2);
assert.equal(levelOf('superficies', 14), 1);
assert.equal(levelOf('problemes', 5), 2);

// Comprovar que els mapes d'Unitats i Problemes romanen intactes i que Superfícies reflecteix els dos canvis resolts.
const oldUnitatsN1 = [1,2,3,4,5,6,7,8,11,12,13,14,16,17];
const oldUnitatsN2 = [9,10,15,18];
assert.deepEqual(levels.unitats, [oldUnitatsN1,oldUnitatsN2,[]]);
assert.deepEqual(levels.problemes, [[4,16,17,18,19],[1,2,3,5,6,7,8,9,10,11,12,13,14,15,20],[]]);
assert.deepEqual(levels.superficies, [[1,3,5,6,7,10,11,14,18],[2,4,8,9,12,13,15,16,17,19,20],[]]);

// Aïllar els generadors reals: no reproduïm fórmules de resposta en aquestes funcions.
const cut = (start, end) => {
  const a = html.indexOf(start), b = html.indexOf(end, a);
  assert(a >= 0 && b > a, 'Bloc no trobat: ' + start);
  return html.slice(a, b);
};

const format = (n, max = 4) => Number(n).toFixed(max).replace(/0+$/, '').replace(/\.$/, '').replace('.', ',');
const answerUnit = (v, u, n = 6) => format(v, n) + ' ' + u;
const unique4 = (v, list) => [...new Set([String(v), ...list.map(String)])].slice(0,4);
let selected = 0;
const shuffle = list => {
  if (list.length === 6 && typeof list[0] === 'number' && list[0] === 500) {
    return [list[selected], ...list.filter((_,i) => i !== selected)];
  }
  if (list.length === 4 && typeof list[0] === 'object' && list[0].r === 2 && list[0].h === 5) {
    return [list[selected], ...list.filter((_,i) => i !== selected)];
  }
  return [...list];
};
const ctx = {
  Math, shuffle, fmtNum: format, answerUnit, uniq4: unique4,
  unitAlternatives: (v,u,n) => [answerUnit(v,u,n)],
  nextUnitsType: () => 18, nextProblemType: () => 4,
  roundTo: (v,n) => Math.round((v+Number.EPSILON)*10**n)/10**n,
  countAnswer: (n,a,b) => n+' '+(n===1?a:(b||a+'s'))
};
vm.createContext(ctx);
vm.runInContext(cut('function genUnitats2ESO(forceType)', '/* ── GENERADOR · BLOC 2:'), ctx);
vm.runInContext(cut('function genProblemesMesura2ESO(forceType)', '/* ── AMPLIACIÓ A'), ctx);

const possibleMl = [500,750,1250,1800,2400,3500];
for (selected = 0; selected < possibleMl.length; selected++) {
  const q = ctx.genUnitats2ESO(18);
  const ml = possibleMl[selected];
  const expected = answerUnit(ml/1000, 'dm³');
  assert(q.question.includes('<b>' + ml + ' mL</b>'));
  assert.equal(q.correct, expected);
  assert.equal(q.options.length, 4);
  assert.equal(new Set(q.options).size, 4);
  assert(q.options.includes(q.correct));
  assert.equal(levelOf(q.topicId, q.type), 2);
}

const cases = [{r:2,h:5},{r:1.5,h:4},{r:3,h:2},{r:2.5,h:4}];
for (selected = 0; selected < cases.length; selected++) {
  const q = ctx.genProblemesMesura2ESO(4), {r,h} = cases[selected];
  assert(q.question.includes('<b>'+format(r)+' dm</b>'));
  assert(q.question.includes('<b>'+format(h)+' dm</b>'));
  assert.equal(q.correct, answerUnit(3.14*r*r*h, 'L', 2));
  assert.equal(q.options.length, 4);
  assert.equal(new Set(q.options).size, 4);
  assert(q.options.includes(q.correct));
  assert.equal(levelOf(q.topicId, q.type), 1);
}
console.log('OK: 10 variants reals amb oracle matematic, opcions i nivells coherents');
