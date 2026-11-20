#!/usr/bin/env node
'use strict';
// Integritat del mapa de nuclis candidats; NO certifica famílies ni nivells.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.join(__dirname,'..','docs','auditoria');
const read=name=>JSON.parse(fs.readFileSync(path.join(root,name),'utf8'));
const d=read('MI_2ESO_mesura_unitats_escales_grups_candidats.json');
const u=read('MI_2ESO_mesura_unitats_decisions_18_tipus.json');
const e=read('MI_2ESO_mesura_escales_decisions_18_tipus.json');
const src=[...u.rows,...e.rows];
const ids=new Set(d.groups.map(g=>g.id));
assert.equal(ids.size,d.groups.length,'ID de grup duplicat');
assert.equal(d.groups.length,d.counts.candidate_groups);
const expected=new Set(src.map(x=>x.key));
assert.equal(expected.size,36,'Les decisions font no contenen 36 tipus únics');
const normalized=new Map();
for(const row of d.assignments){
  assert(expected.has(row.key),'Assignació d’un tipus no existent: '+row.key);
  assert(ids.has(row.candidate),'Grup no existent: '+row.candidate);
  assert.equal(row.provisional,true);
  const [topic]=row.key.split(':');
  assert.equal(d.groups.find(x=>x.id===row.candidate).topic,topic);
  if(!normalized.has(row.key))normalized.set(row.key,[]);
  normalized.get(row.key).push(row);
}
assert.equal(normalized.size,expected.size,'Cal cobrir 36/36 tipus');
for(const key of expected){
  const r=normalized.get(key);
  assert(r&&r.length>=1,'Tipus no assignat: '+key);
  if(key==='unitats:6'){
    assert.equal(r.length,2,'El tipus mixt unitats:6 requereix dues variants');
    assert.deepEqual(new Set(r.map(x=>x.variant)),new Set(['directa','encadenada']));
  }else assert.equal(r.length,1,'Tipus duplicat: '+key);
}
for(const group of d.groups){
  assert(group.types.length>0,'Grup buit: '+group.id);
  assert.equal(group.status,'candidate_not_validated');
  for(const t of group.types){
    assert(expected.has(group.topic+':'+t),'Tipus absent a la font');
    assert(d.assignments.some(a=>a.key===group.topic+':'+t&&a.candidate===group.id));
  }
}
for(const exception of d.level_exceptions){
  assert(expected.has(exception.key));
  assert([1,2,3].includes(exception.level));
}
assert.equal(d.counts.generator_types,36);
assert.equal(d.groups.filter(g=>g.topic==='unitats').length,10);
assert.equal(d.groups.filter(g=>g.topic==='escales').length,8);
assert.equal(d.status,'provisional_unapproved');
console.log('OK: 36/36 tipus, 37 assignacions incloent unitats:6, 18 nuclis candidats; sense validació pedagògica');
