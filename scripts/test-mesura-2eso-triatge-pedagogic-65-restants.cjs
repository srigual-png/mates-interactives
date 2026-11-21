#!/usr/bin/env node
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const dir=path.join(__dirname,'..','docs','auditoria');
const read=n=>JSON.parse(fs.readFileSync(path.join(dir,n),'utf8'));
const catalogue=read('MI_2ESO_mesura_cataleg_global_provisional.json');
const previous=read('MI_2ESO_mesura_triatge_pedagogic_7_clusters_prioritaris.json');
const next=read('MI_2ESO_mesura_triatge_pedagogic_65_restants.json');
assert.equal(catalogue.clusters.length,72);
assert.equal(previous.selected_clusters.length,7);
assert.equal(next.records.length,65);
assert.equal(next.multi_member_contrasts,24);
assert.equal(next.single_member_inventory,41);
const byId=new Map(catalogue.clusters.map(c=>[c.id,c]));
const visited=new Set(previous.selected_clusters.map(c=>c.id));
assert.equal(visited.size,7);
let total=previous.selected_clusters.reduce((n,x)=>n+x.groups.reduce((m,g)=>m+g.members.length,0),0);
for(const row of next.records){
 assert(!visited.has(row.cluster_id),'Repeated cluster '+row.cluster_id);
 visited.add(row.cluster_id);
 const source=byId.get(row.cluster_id);assert(source,'Missing cluster '+row.cluster_id);
 assert.deepEqual(row.members.map(x=>x.key).sort(),[...source.members].sort(),'Mismatch '+row.cluster_id);
 assert.equal(row.member_count,source.members.length);
 assert(row.pedagogical_rationale.length>35,'No rationale '+row.cluster_id);
 assert.equal(row.curricular_approval,'pending');
 assert.equal(row.level_proposal,'not_assigned');
 for(const member of row.members)assert(typeof member.procedure==='string'&&member.procedure.trim().length>10);
 total+=row.member_count;
}
assert.equal(visited.size,72);
assert.equal(total,catalogue.counts.assignment_records);
assert.equal(total,129); // 128 generator types plus the intentionally separated unitats:6 variant
assert.equal(next.implementation.approved_families,0);
assert.equal(next.implementation.official_levels_changed,0);
assert.equal(next.implementation.source_generators_edited,false);
assert.equal(next.implementation.merged,false);
assert.equal(next.implementation.deployed,false);
console.log(JSON.stringify({clusters_total:72,prioritized:7,newly_documented:65,multi:24,single:41,assignment_records:129,approved_families:0,official_level_changes:0},null,2));
