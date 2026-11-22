#!/usr/bin/env node
'use strict';
// Integritat de la proposta global, no certificació de famílies.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const d=path.join(__dirname,'..','docs','auditoria');
const load=n=>JSON.parse(fs.readFileSync(path.join(d,n),'utf8'));
const catalog=load('MI_2ESO_mesura_cataleg_global_provisional.json');
const master=load('MI_2ESO_mesura_tracabilitat_128_tipus.json');
const local=load('MI_2ESO_mesura_unitats_escales_grups_candidats.json');
const u=load('MI_2ESO_mesura_unitats_escales_contrast_transversal.json');
const f=load('MI_2ESO_mesura_cinc_temes_contrast_transversal.json');
assert.equal(master.types.length,128);
const expected=new Set(master.types.map(x=>x.topic+':'+x.type));
const expectedAssignments=new Set([...expected].filter(x=>x!=='unitats:6'));
expectedAssignments.add('unitats:6:directa');expectedAssignments.add('unitats:6:encadenada');
assert.equal(catalog.assignments.length,129);
assert.equal(catalog.clusters.length,catalog.counts.working_clusters);
assert.equal(new Set(catalog.clusters.map(x=>x.id)).size,catalog.clusters.length);
const seen=new Set(), covered=new Set(), clusterMap=new Map();
for(const c of catalog.clusters){
 assert.equal(c.status,'working_cluster_unvalidated');
 assert(c.members.length>0);
 assert.equal(new Set(c.members).size,c.members.length);
 assert.equal(c.needs_pedagogical_review,true);
 for(const k of c.members){
  assert(expectedAssignments.has(k),'Membre no inventariat: '+k);
  assert(!seen.has(k),'Membre repetit: '+k);seen.add(k);clusterMap.set(k,c.id);
 }
 assert.equal(new Set(c.members.map(x=>x.split(':')[0])).size>1,c.cross_topic);
}
assert.equal(seen.size,129);
for(const a of catalog.assignments){
 assert(expectedAssignments.has(a.key));
 assert.equal(clusterMap.get(a.key),a.cluster_id,'Assignació incorrecta: '+a.key);
 assert.equal(a.status,'provisional');
 covered.add(a.key);
}
assert.equal(covered.size,129);
const strict=[...u.links,...f.links].filter(x=>x.relation==='shared_core');
assert.equal(strict.length,catalog.counts.strict_cross_topic_edges);
for(const l of strict){
 assert.notEqual(l.source,'unitats:6');assert.notEqual(l.target,'unitats:6');
 assert.equal(clusterMap.get(l.source),clusterMap.get(l.target),'Falta nucli compartit: '+l.source+' / '+l.target);
}
for(const v of master.variants)assert(catalog.level_variants_to_preserve.some(x=>x.key===v.key&&x.case===v.case));
const realTopics=new Set(master.types.map(x=>x.topic));
assert.equal(realTopics.size,7);
assert.equal(catalog.counts.distinct_topics,7);
assert.equal(catalog.counts.generator_types,128);
assert.equal(catalog.status,'provisional_unapproved');
console.log('OK: 128 tipus, 129 registres amb variant, '+catalog.clusters.length+' agrupacions provisionals; '+strict.length+' nuclis compartits documentats. Revisió pedagògica pendent.');
