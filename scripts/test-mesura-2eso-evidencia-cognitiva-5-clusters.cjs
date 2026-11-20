#!/usr/bin/env node
'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.join(__dirname,'..');
const data=JSON.parse(fs.readFileSync(path.join(root,'docs/auditoria/MI_2ESO_mesura_evidencia_cognitiva_5_clusters_geometria_error.json'),'utf8'));
const cat=JSON.parse(fs.readFileSync(path.join(root,'docs/auditoria/MI_2ESO_mesura_cataleg_global_provisional.json'),'utf8'));
const h=fs.readFileSync(path.join(root,'2eso/sentit-mesura.html'),'utf8');
const lookup=new Map(cat.clusters.map(x=>[x.id,x]));
assert.equal(data.clusters.length,5);
let total=0;
const defs={estimacio:'genEstimacioError2ESO',perimetres:'genPerimetresArees2ESO',superficies:'genSuperficiesVolums2ESO'};
for(const entry of data.clusters){
 const src=lookup.get(entry.cluster);
 assert(src,'Missing '+entry.cluster);
 assert.deepEqual([...entry.keys].sort(),[...src.members].sort(),'Members differ '+entry.cluster);
 assert.equal(entry.variants.length,entry.keys.length);
 const seen=new Set();
 for(const v of entry.variants){
  assert(entry.keys.includes(v.key)&&!seen.has(v.key),'Invalid variant '+v.key);seen.add(v.key);
  assert(typeof v.rationale==='string'&&v.rationale.trim().length>=12&&typeof v.demand==='string'&&v.demand.trim().length>=12);
  assert(v.proposed_level.includes('candidate')||v.proposed_level.includes('review'));
  const [topic,n]=v.key.split(':');const start=h.indexOf('function '+defs[topic]+'(');assert(start>=0);
  const tail=h.slice(start,h.indexOf('/* ── GENERADOR ·',start+40));
  assert(new RegExp('(?:if|else if)\\(type==='+Number(n)+'\\)\\{').test(tail),'Missing source branch '+v.key);
  total++;
 }
}
assert.equal(total,12);
assert(data.clusters.find(x=>x.cluster==='ME2-C010').risks.some(s=>s.includes('convenció')));
for(const v of Object.values(data.gates))assert.equal(v,false);
console.log(JSON.stringify({pedagogical_clusters:5,source_types:total,official_changes:0,assessment:'structural traceability only'},null,2));
