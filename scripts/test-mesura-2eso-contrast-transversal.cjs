#!/usr/bin/env node
'use strict';
// Integritat dels enllaços transversals: no certifica equivalència pedagògica.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const dir=path.join(__dirname,'..','docs','auditoria');
const read=n=>JSON.parse(fs.readFileSync(path.join(dir,n),'utf8'));
const d=read('MI_2ESO_mesura_unitats_escales_contrast_transversal.json');
const local=read('MI_2ESO_mesura_unitats_escales_grups_candidats.json');
const master=read('MI_2ESO_mesura_tracabilitat_128_tipus.json');
const all=new Set(master.types.map(x=>x.topic+':'+x.type));
assert.equal(all.size,128);
const groups=new Set(local.groups.map(x=>x.id));
const relations=new Set(Object.keys(d.relation_meaning));
const distinct=new Set();const covered=new Set();const others=new Set();
for(const link of d.links){
  assert(groups.has(link.candidate),'Grup candidat absent: '+link.candidate);
  assert(all.has(link.source),'Origen absent: '+link.source);
  assert(all.has(link.target),'Destí absent: '+link.target);
  assert(relations.has(link.relation),'Relació no declarada: '+link.relation);
  assert(link.reason&&link.reason.length>15,'Cal justificació');
  assert.equal(link.status,'provisional');
  assert(local.assignments.some(x=>x.key===link.source&&x.candidate===link.candidate),
    'La relació no respecta el grup de la matriu: '+link.source+' -> '+link.candidate);
  const key=link.candidate+'|'+link.source+'|'+link.target;
  assert(!distinct.has(key),'Relació repetida: '+key);
  distinct.add(key);covered.add(link.candidate);
  const topic=link.target.split(':')[0];
  if(topic!=='unitats'&&topic!=='escales')others.add(topic);
}
assert.equal(d.links.length,d.counts.links);
assert.equal(covered.size,18,'Cal contrastar tots els 18 grups candidats');
assert.equal(others.size,5,'Cal contrastar amb els 5 temes restants');
assert.equal(d.counts.other_topics,5);
assert.equal(d.status,'provisional_unapproved');
console.log('OK: '+d.links.length+' enllaços traçables, 18 grups coberts i 5 temes externs; valoració pedagògica pendent');
