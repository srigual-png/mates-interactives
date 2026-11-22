#!/usr/bin/env node
'use strict';
// Integritat dels vincles documentals; NO afirma identitat pedagògica.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const dir=path.join(__dirname,'..','docs','auditoria');
const read=name=>JSON.parse(fs.readFileSync(path.join(dir,name),'utf8'));
const matrix=read('MI_2ESO_mesura_cinc_temes_contrast_transversal.json');
const expected={pitagores:16,perimetres:18,superficies:20,estimacio:18,problemes:20};
const all=new Set();
for(const [topic,count] of Object.entries(expected)){
  const f=read('MI_2ESO_mesura_'+topic+'_decisions_'+count+'_tipus.json');
  assert.equal(f.rows.length,count,'Nombre de tipus incorrecte: '+topic);
  for(const row of f.rows){
    assert.equal(row.key.split(':')[0],topic);
    assert(!all.has(row.key),'Tipus duplicat '+row.key);
    all.add(row.key);
  }
}
assert.equal(all.size,92);
const seen=new Set(),covered=new Set();
for(const x of matrix.links){
  assert(all.has(x.source)&&all.has(x.target),'Identificador no existent '+x.source+' / '+x.target);
  assert.notEqual(x.source,x.target,'Enllaç reflexiu');
  assert.notEqual(x.source.split(':')[0],x.target.split(':')[0],'Aquesta matriu és transversal');
  assert(Object.hasOwn(matrix.relation_types,x.relation),'Relació indefinida '+x.relation);
  assert(x.reason.length>25,'Cal justificació significativa');
  assert.equal(x.status,'provisional_unapproved');
  const key=[x.source,x.target].sort().join('|');
  assert(!seen.has(key),'Relació duplicada '+key);seen.add(key);
  covered.add(x.source.split(':')[0]);covered.add(x.target.split(':')[0]);
}
assert.equal(matrix.counts.comparison_links,matrix.links.length);
assert.equal(matrix.counts.types_in_five_topics,92);
assert.equal(covered.size,5,'Cal contrastar els cinc temes');
assert.equal(matrix.status,'provisional_unapproved');
console.log('OK: '+matrix.links.length+' relacions transversals justificades, 92 tipus de referència, 5 temes coberts');
