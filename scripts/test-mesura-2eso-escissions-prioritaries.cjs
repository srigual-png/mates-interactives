#!/usr/bin/env node
'use strict';
// Escissions provisionals: prova d'integritat, no validació pedagògica.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const root=path.join(__dirname,'..','docs','auditoria');
const load=name=>JSON.parse(fs.readFileSync(path.join(root,name),'utf8'));
const base=load('MI_2ESO_mesura_cataleg_global_provisional.json');
const overlay=load('MI_2ESO_mesura_escissions_prioritaries.json');
assert.equal(base.clusters.length,72);
const original=new Map(base.clusters.map(c=>[c.id,c]));
const splitParents=new Set(),newIds=new Set();
for(const split of overlay.splits){
 assert(!splitParents.has(split.parent),'Clúster repetit: '+split.parent);
 splitParents.add(split.parent);
 const source=original.get(split.parent);
 assert(source,'Clúster de partida inexistent: '+split.parent);
 assert(split.parts.length>=2,'Calen dues parts o més');
 const all=[];
 for(const part of split.parts){
  assert(!newIds.has(part.id),'ID de subgrup repetit: '+part.id);
  newIds.add(part.id);
  assert(part.procedure?.length>20,'Procediment massa ambigu: '+part.id);
  assert(part.level_note?.length>8,'Falta nota de nivell: '+part.id);
  all.push(...part.members);
 }
 assert.equal(new Set(all).size,all.length,'Membre duplicat a les escissions: '+split.parent);
 assert.deepEqual([...all].sort(),[...source.members].sort(),'Membres perduts o afegits: '+split.parent);
}
const expected=base.clusters.length-splitParents.size+newIds.size;
assert.equal(expected,overlay.counts.derived_working_clusters);
assert.equal(overlay.counts.reviewed_parent_clusters,splitParents.size);
assert.equal(overlay.counts.proposed_subclusters,newIds.size);
assert.equal(overlay.status,'splits_for_review_only');
assert.equal(overlay.counts.baseline_clusters,base.clusters.length);
const sourceKeys=new Set(base.assignments.map(a=>a.key));
const retained=[];
for(const c of base.clusters)if(!splitParents.has(c.id))retained.push(...c.members);
for(const split of overlay.splits)for(const part of split.parts)retained.push(...part.members);
assert.equal(retained.length,sourceKeys.size);
assert.deepEqual(new Set(retained),sourceKeys);
console.log('OK: '+splitParents.size+' clústers separats en '+newIds.size+' parts; '+expected+' clústers de treball potencials, '+retained.length+' assignacions conservades.');
