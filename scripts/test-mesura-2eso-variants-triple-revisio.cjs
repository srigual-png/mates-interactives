#!/usr/bin/env node
'use strict';
// Integritat documental d'escissions cognitives i de variants; cap família validada.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const dir=path.join(__dirname,'..','docs','auditoria');
const load=n=>JSON.parse(fs.readFileSync(path.join(dir,n),'utf8'));
const base=load('MI_2ESO_mesura_cataleg_global_provisional.json');
const before=load('MI_2ESO_mesura_escissions_prioritaries.json');
const doc=load('MI_2ESO_mesura_variants_pitagores_estimacio_superficies.json');
const clusters=new Map(base.clusters.map(x=>[x.id,x]));
const used=new Set(before.splits.map(x=>x.parent));
const ids=new Set(),parts=[];
const expand=x=>x.replace(/:(diagonal|catet)$/,'');
for(const p of doc.proposals){
 assert(!used.has(p.parent),'Clúster ja escindit abans');
 used.add(p.parent);
 const orig=clusters.get(p.parent);assert(orig,'Clúster desconegut '+p.parent);
 assert(p.parts.length>=2);
 const keys=[];
 for(const item of p.parts){
  assert(!ids.has(item.id),'ID repetit');ids.add(item.id);
  assert(item.procedure.length>22&&item.classification.endsWith('_review'));
  keys.push(...item.members);
  parts.push(item);
 }
 assert.equal(new Set(keys).size,keys.length,'Variant repetida');
 if(p.parent==='ME2-C036'){
  assert.deepEqual(new Set(keys),new Set(['pitagores:15:diagonal','pitagores:15:catet']));
  assert.deepEqual([...new Set(keys.map(expand))],orig.members);
 }else assert.deepEqual(keys.slice().sort(),orig.members.slice().sort(),'Membre perdut '+p.parent);
}
assert.equal(doc.counts.reviewed_parent_clusters,doc.proposals.length);
assert.equal(doc.counts.variant_rows,parts.length);
const newTotal=before.counts.derived_working_clusters-doc.proposals.length+parts.length;
assert.equal(newTotal,doc.counts.derived_working_clusters_if_ratified);
assert.equal(newTotal,85);
assert.equal(doc.status,'provisional_split_review_only');
console.log('OK: '+doc.proposals.length+' clústers revisats, '+parts.length+' subgrups amb variants, '+newTotal+' clústers provisionals si es ratifiquen. Cap família validada.');
