#!/usr/bin/env node
'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const dir=path.join(__dirname,'..','docs','auditoria'),read=n=>JSON.parse(fs.readFileSync(path.join(dir,n),'utf8'));
const d=read('MI_2ESO_mesura_cataleg_74_families_candidates.json');
const q=read('MI_2ESO_mesura_cua_validacio_74_families.json');
const groups=new Map(d.groups.map(g=>[g.id,g]));
assert.equal(d.groups.length,74);
assert.equal(q.mixed_level_groups.length,11);
assert.equal(q.singletons.length,44);
for(const entry of q.mixed_level_groups){
 const source=groups.get(entry.group_id);assert(source&&source.level_variation_review_required);
 assert.deepEqual(entry.members,source.members);
 assert.deepEqual(entry.level_candidates,source.level_candidates);
 assert.equal(entry.decision,'pendent');
}
for(const entry of q.singletons){
 const source=groups.get(entry.group_id);assert(source&&source.members.length===1);
 assert.equal(entry.member,source.members[0]);
 assert.equal(entry.decision,'pendent');
}
assert.equal(q.counts.official_decisions,0);
for(const value of Object.values(q.permissions))assert.equal(value,false);
console.log(JSON.stringify({candidate_groups:74,mixed_level_review_groups:11,singleton_review_groups:44,approved_changes:0},null,2));
