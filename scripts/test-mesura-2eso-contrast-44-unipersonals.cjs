#!/usr/bin/env node
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const dir=path.join(__dirname,'..','docs','auditoria');
const get=n=>JSON.parse(fs.readFileSync(path.join(dir,n),'utf8'));
const q=get('MI_2ESO_mesura_cua_validacio_74_families.json');
const catalog=get('MI_2ESO_mesura_cataleg_74_families_candidates.json');
const triage=get('MI_2ESO_mesura_contrast_44_unipersonals.json');
const byId=new Map(catalog.groups.map(x=>[x.id,x]));
const originals=new Map(q.singletons.map(x=>[x.member,x.group_id]));
const seen=new Set();
assert.equal(originals.size,44);
assert.equal(triage.cases.length,44);
for(const c of triage.cases){
 assert(originals.has(c.member),'Not a queued singleton '+c.member);
 assert.equal(c.source_group,originals.get(c.member));
 assert(!seen.has(c.member),'Repeated singleton '+c.member);seen.add(c.member);
 const group=byId.get(c.source_group);assert(group&&group.members.length===1);
 assert.equal(group.members[0],c.member);
 if(c.target_group){
   assert(byId.has(c.target_group),'Missing candidate target '+c.target_group);
   assert.notEqual(c.target_group,c.source_group,'Self-link is not a cross-group comparison');
 }
 assert(typeof c.reason==='string'&&c.reason.trim().length>0);
 assert(typeof c.relation==='string'&&c.relation.trim().length>0);
 assert.equal(c.teacher_approved,false);
 assert.equal(c.requires_comparison_of_real_examples,true);
}
assert.equal(seen.size,44);
const targeted=triage.cases.filter(x=>x.target_group).length;
assert.equal(triage.count.targeted_cross_group_hypotheses,targeted);
assert.equal(triage.count.standalone_candidates,44-targeted);
assert.equal(triage.count.approved_family_merges,0);
for(const v of Object.values(triage.permissions))assert.equal(v,false);
console.log(JSON.stringify({singletons_reviewed:44,cross_group_comparisons:targeted,standalone_candidates:44-targeted,duplicate_or_missing:0,approved_merges:0},null,2));
