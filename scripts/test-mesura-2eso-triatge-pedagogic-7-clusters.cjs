#!/usr/bin/env node
'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const directory=path.join(__dirname,'..','docs','auditoria');
const load=p=>JSON.parse(fs.readFileSync(path.join(directory,p),'utf8'));
const proposal=load('MI_2ESO_mesura_triatge_pedagogic_7_clusters_prioritaris.json');
const source=load('MI_2ESO_mesura_cataleg_global_provisional.json');
const clusters=new Map(source.clusters.map(x=>[x.id,x]));
const inventory=new Set(source.assignments.map(x=>x.key||x.member).filter(Boolean));
assert.equal(source.counts.working_clusters,72);
assert.equal(proposal.selected_clusters.length,7);
let members=0;
for(const entry of proposal.selected_clusters){
 const c=clusters.get(entry.id);assert(c,'Unknown cluster '+entry.id);
 const existing=new Set(c.members),included=new Set();
 for(const group of entry.groups){assert(typeof group.core==='string'&&group.core.trim().length>=15);for(const member of group.members){assert(existing.has(member),'Not in source cluster '+entry.id+' '+member);assert(!included.has(member),'Repeated member '+member);included.add(member)}}
 assert.equal(included.size,existing.size,'Missing members in '+entry.id);
 members+=included.size;
}
assert.equal(proposal.effects.official_families_approved,0);
assert.equal(proposal.effects.official_levels_changed,0);
assert.equal(proposal.effects.provisional_cluster_count_changed,false);
assert.equal(proposal.effects.generator_code_changed,false);
console.log(JSON.stringify({source_provisional_clusters:source.clusters.length,selected_for_detailed_triage:proposal.selected_clusters.length,generator_type_or_variant_members_crosschecked:members,official_changes:0},null,2));
