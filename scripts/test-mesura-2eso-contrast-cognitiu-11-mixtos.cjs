#!/usr/bin/env node
'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const dir=path.join(__dirname,'..','docs','auditoria'),read=n=>JSON.parse(fs.readFileSync(path.join(dir,n),'utf8'));
const original=read('MI_2ESO_mesura_cua_validacio_74_families.json');
const candidate=read('MI_2ESO_mesura_cataleg_74_families_candidates.json');
const review=read('MI_2ESO_mesura_contrast_cognitiu_11_grups_mixtos.json');
const byId=new Map(original.mixed_level_groups.map(x=>[x.group_id,x]));
assert.equal(review.cases.length,11);
const seen=new Set();
for(const c of review.cases){
 const source=byId.get(c.group_id);assert(source,'Unexpected group '+c.group_id);
 assert(!seen.has(c.group_id),'Duplicate group '+c.group_id);seen.add(c.group_id);
 assert.deepEqual(c.members,source.members);
 assert.deepEqual(c.current_level_candidates,source.level_candidates);
 if(c.group_id==='MI2-FC-C056'){
  assert.deepEqual(c.representative_members,['superficies:17:sameBase','superficies:17:other']);
 }else{
  assert.deepEqual([...c.representative_members].sort(),[...c.members].sort());
 }
 assert(c.evidence.length>25&&c.level_interpretation.length>15);
 assert.equal(c.teacher_approval,'pending');
 assert.equal(c.code_changed,false);
 assert(candidate.groups.some(g=>g.id===c.group_id));
}
assert.equal(seen.size,11);
assert(review.current_source_change_note.includes('no longer an outstanding permission'));
assert.equal(review.count.approved_groups,0);
for(const val of Object.values(review.permissions))assert.equal(val,false);
console.log(JSON.stringify({mixed_groups_verified:11,pedagogical_review_records:11,approved_families:0,official_level_changes:0},null,2));
