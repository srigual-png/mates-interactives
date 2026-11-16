#!/usr/bin/env node
'use strict';
// Structural audit only: verifies traceability, not mathematical/pedagogical validity.
const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const filepath=path.join(__dirname,'..','docs','auditoria','MI_2ESO_mesura_tracabilitat_128_tipus.json');
const a=JSON.parse(fs.readFileSync(filepath,'utf8'));
assert.equal(a.schema_version,1);
assert.equal(a.status,'provisional');
assert.equal(a.scope,'2eso/mesura');
assert(Array.isArray(a.types));
const expected={unitats:18,escales:18,pitagores:16,perimetres:18,superficies:20,estimacio:18,problemes:20};
assert.deepEqual(a.counts,expected);
const keys=new Set();
for(const x of a.types){
  assert(Object.hasOwn(expected,x.topic),'Tema desconegut '+x.topic);
  assert(Number.isInteger(x.type)&&x.type>=1&&x.type<=expected[x.topic]);
  assert(/^(?:U|E|P|PA|SV|EP|PM)\d{2}$/.test(x.source_candidate),'Família candidata mal formada');
  assert.equal(x.status,'provisional');
  assert(Array.isArray(x.cross_topic_links));
  const key=x.topic+':'+x.type;
  assert(!keys.has(key),'Duplicació '+key);
  keys.add(key);
}
for(const [topic,n] of Object.entries(expected)){
  for(let t=1;t<=n;t++)assert(keys.has(topic+':'+t),'Falta '+topic+':'+t);
}
assert.equal(a.types.length,128);
let linked=0;
for(const x of a.types){
  for(const ref of x.cross_topic_links){
    assert(keys.has(ref),'Referència inexistent: '+ref);
    assert(!ref.startsWith(x.topic+':'),'Les relacions són entre temes: '+ref);
    linked++;
  }
}
const expectedVariants=['unitats:6:directa','unitats:6:encadenada','pitagores:15:diagonal','pitagores:15:catet','superficies:17:sameBase','superficies:17:other'];
assert.deepEqual(a.variants.map(v=>v.key+':'+v.case).sort(),expectedVariants.sort());
for(const v of a.variants){
  assert(keys.has(v.key));
  assert([1,2,3].includes(v.proposed_level));
}
console.log('OK: 7 temes, 128 tipus únics i complets, '+linked+' referències transversals, 6 variants explícites');
console.log('Advertiment: això verifica l’estructura, NO valida famílies ni nivells pedagògics');
