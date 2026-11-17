#!/usr/bin/env node
'use strict';
// Integritat de la matriu de variants; no certifica famílies o dificultat curricular.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const root=path.join(__dirname,'..');
const docs=path.join(root,'docs','auditoria');
const read=n=>JSON.parse(fs.readFileSync(path.join(docs,n),'utf8'));
const m=read('MI_2ESO_mesura_matriu_nivells_variants_mixtes.json');
const inv=read('MI_2ESO_mesura_tracabilitat_128_tipus.json');
const src=fs.readFileSync(path.join(root,'assets','js','dificultat-mi.js'),'utf8');
const html=fs.readFileSync(path.join(root,'2eso','sentit-mesura.html'),'utf8');
assert.equal(m.status,'provisional_unapproved');
assert.equal(m.types.length,3);assert.equal(m.type_count,3);assert.equal(m.variant_count,6);
const invV=new Map(inv.variants.map(v=>[v.key+':'+v.case,v]));
const seen=new Set();
const expected=['unitats:6','pitagores:15','superficies:17'];
assert.deepEqual(m.types.map(x=>x.key),expected);
for(const topic of m.types){
 assert.equal(topic.variants.length,2);
 for(const v of topic.variants){
  const k=topic.key+':'+v.variant;
  assert(!seen.has(k),'Variant repetida: '+k);seen.add(k);
  assert.equal(v.status,'provisional');
  assert(v.procedure.length>25);
  assert(v.source_examples.length>0);
  assert([1,2].includes(v.proposed_level));
  assert.equal(invV.get(k)?.proposed_level,v.proposed_level,'Incoherència amb inventari: '+k);
 }
}
assert.equal(seen.size,6);
assert.equal(inv.types.length,128,'No confondre les variants amb tipus nous');
const base=/\"2eso\/mesura\":\{\"unitats\":\[\[[^\]]*\]/;
assert(base.test(src),'No es troba el mapa de nivells 2n ESO Mesura');
assert(src.includes('"pitagores":{"15":{"diagonal":{"level":2'),'Pitàgores diagonal sense N2 revisat');
assert(src.includes('"superficies":{"17":{"sameBase":{"level":1'),'Superfícies sameBase sense N1 revisat');
assert(!src.includes('"unitats":{"6":{"encadenada":{"level":2'),'La proposta PR53 no s’ha de descriure com a vigent a la branca PR49');
assert(html.includes("difficultyVariant='sameBase'"),'Marca generador de superfícies absent');
assert(html.includes("difficultyVariant:type===15&&question.includes('diagonal')?'diagonal':undefined"),'Marca Pitàgores absent');
console.log('OK: 3 tipus mixtos, 6 variants N1/N2 traçables, 128 tipus preservats i separació correcta de PR49 vs PR53.');
