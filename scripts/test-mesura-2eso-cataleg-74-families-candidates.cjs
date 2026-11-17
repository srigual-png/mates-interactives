#!/usr/bin/env node
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const dir=path.join(__dirname,'..','docs','auditoria'),read=p=>JSON.parse(fs.readFileSync(path.join(dir,p),'utf8'));
const catalog=read('MI_2ESO_mesura_cataleg_global_provisional.json');
const cross=read('MI_2ESO_mesura_creuament_131_fitxes_72_agrupacions.json');
const proposal=read('MI_2ESO_mesura_cataleg_74_families_candidates.json');
const originalMembers=catalog.assignments.map(a=>a.key);
const inventory=new Set(originalMembers);
const groups=proposal.groups,seen=new Map();
assert.equal(catalog.clusters.length,72);
assert.equal(groups.length,74);
assert.equal(proposal.counts.provisional_families,74);
for(const group of groups){
 assert(group.id&&group.name&&group.rationale&&group.needs_teacher_review);
 assert(group.members.length>0);
 for(const member of group.members){
   assert(inventory.has(member),'Unknown original assignment '+member);
   assert(!seen.has(member),'Duplicate assignment '+member);
   seen.set(member,group.id);
 }
}
assert.equal(seen.size,129);
assert.deepEqual([...seen.keys()].sort(),originalMembers.sort());
assert.equal(proposal.assignments.length,129);
const levels=new Map(cross.records.map(x=>[x.key,x.level_candidate]));
for(const item of proposal.assignments){
 assert.equal(seen.get(item.member),item.group_id);
 const desired=levels.has(item.member)?[levels.get(item.member)]:cross.records.filter(x=>x.generator_type===item.member).map(x=>x.level_candidate);
 assert.deepEqual(item.level_candidates,desired,'Level mismatch '+item.member);
}
assert.equal(new Set([...seen.keys()].map(x=>x.split(':').slice(0,2).join(':'))).size,128);
assert.equal(cross.records.length,131);
const source=new Map(catalog.clusters.map(c=>[c.id,c.members]));
for(const group of groups){
 if(group.origin_cluster_ids.length===1)assert(group.members.every(m=>source.get(group.origin_cluster_ids[0]).includes(m)));
 else assert.deepEqual(group.origin_cluster_ids,["ME2-C030","ME2-C042"]);
}
assert(Array.isArray(proposal.explicit_changes_from_source.splits));
assert.equal(proposal.explicit_changes_from_source.splits.length,3);
assert.equal(proposal.explicit_changes_from_source.joined.length,1);
for(const val of Object.values(proposal.permissions))assert.equal(val,false);
console.log(JSON.stringify({candidate_groups:74,assignments:seen.size,generator_types:128,level_evidence:131,duplicates:0,missing:0,approved_groups:0},null,2));
