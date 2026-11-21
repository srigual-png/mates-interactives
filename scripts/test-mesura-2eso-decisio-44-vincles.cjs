#!/usr/bin/env node
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const root=path.join(__dirname,'..','docs','auditoria');
const load=n=>JSON.parse(fs.readFileSync(path.join(root,n),'utf8'));
const source=load('MI_2ESO_mesura_contrast_44_unipersonals.json');
const decision=load('MI_2ESO_mesura_decisio_44_vincles_unipersonals.json');
const cat=load('MI_2ESO_mesura_cataleg_74_families_candidates.json');
const originals=new Map(source.cases.map(c=>[c.member,c]));
const members=new Map(cat.groups.flatMap(g=>g.members.map(m=>[m,g.id])));
assert.equal(decision.records.length,44);
const seen=new Set(),totals={strong_shared_core_candidate:0,related_variant_or_subprocess_requires_examples:0,distinct_goal_or_non_equivalent_preserve_for_now:0};
for(const row of decision.records){
 assert(!seen.has(row.member),'Repeated '+row.member);seen.add(row.member);
 const original=originals.get(row.member);assert(original,'Unknown singleton '+row.member);
 assert.equal(row.source_group,original.source_group);
 assert.equal(row.target_group,original.target_group);
 assert.equal(row.relation,original.relation);
 assert.equal(members.get(row.member),row.source_group);
 if(row.target_group)assert(cat.groups.some(g=>g.id===row.target_group));
 assert(row.proposed_category in totals,'Invalid category '+row.proposed_category);
 totals[row.proposed_category]++;
 assert.equal(row.family_change_authorized,false);
 assert.equal(row.action,'document_only_teacher_review_required');
}
assert.deepEqual(totals,{strong_shared_core_candidate:4,related_variant_or_subprocess_requires_examples:19,distinct_goal_or_non_equivalent_preserve_for_now:21});
assert.equal(seen.size,44);
assert.equal(decision.candidate_coalescences.length,3);
assert.equal(decision.counts.official_merges,0);
for(const value of Object.values(decision.approval))assert.equal(value,false);
console.log(JSON.stringify({reviewed_singletons:44,...totals,official_merges:0,official_levels_modified:0},null,2));
