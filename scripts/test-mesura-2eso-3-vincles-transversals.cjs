#!/usr/bin/env node
'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.join(__dirname,'..','docs','auditoria'),read=p=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8'));
const evidence=read('MI_2ESO_mesura_3_vincles_transversals_evidencia.json'),cross=read('MI_2ESO_mesura_creuament_131_fitxes_72_agrupacions.json'),catalog=read('MI_2ESO_mesura_cataleg_global_provisional.json');
const members=new Map(catalog.clusters.flatMap(c=>c.members.map(k=>[k,c.id])));
assert.equal(evidence.cases.length,3);
for(const item of evidence.cases){
 const source=cross.reviewed_links.find(x=>x.id===item.id);assert(source,'Missing original link '+item.id);
 assert.deepEqual([...item.members].sort(),[...source.members].sort());
 assert.deepEqual([...item.member_clusters].sort(),[...source.member_clusters].sort());
 assert.equal(item.differences.length,item.members.length);
 assert.deepEqual(item.differences.map(x=>x.key).sort(),[...item.members].sort());
 assert.equal(new Set(item.members.map(x=>members.get(x))).size,item.member_clusters.length);
 assert.equal(item.merge_ready,false);
 for(const x of item.differences)assert(x.demand.trim().length>0);
}
assert.equal(evidence.count.teacher_approved_merges,0);
for(const val of Object.values(evidence.gate))assert.equal(val,false);
console.log(JSON.stringify({cross_group_links:3,examples:evidence.cases.reduce((n,x)=>n+x.differences.length,0),official_merges:0,source_traceable:true},null,2));
