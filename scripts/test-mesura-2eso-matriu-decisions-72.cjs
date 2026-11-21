#!/usr/bin/env node
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const dir=path.join(__dirname,'..','docs','auditoria');
const read=n=>JSON.parse(fs.readFileSync(path.join(dir,n),'utf8'));
const cat=read('MI_2ESO_mesura_cataleg_global_provisional.json');
const d=read('MI_2ESO_mesura_matriu_decisio_pedagogica_72_clusters.json');
const old=new Map(cat.clusters.map(x=>[x.id,x]));
assert.equal(d.rows.length,72);
const ids=new Set();
let assignments=0;const groups={};
for(const row of d.rows){
 assert(!ids.has(row.cluster_id));ids.add(row.cluster_id);
 const src=old.get(row.cluster_id);assert(src,'Missing original cluster '+row.cluster_id);
 assert.deepEqual([...row.members].sort(),[...src.members].sort());
 assert(row.rationale.length>20);
 assert(row.pedagogical_direction!=='approved');
 assert.equal(row.level_status,'pendent_evidencia_no_aprovat');
 assert.equal(row.decision,'pendent_docent');
 assignments+=row.members.length;
 groups[row.pedagogical_direction]=(groups[row.pedagogical_direction]||0)+1;
}
assert.equal(ids.size,cat.clusters.length);
assert.equal(assignments,cat.counts.assignment_records);
assert.equal(assignments,129);
assert.equal(groups.candidata_separacio,8);
assert.equal(groups.variant_o_procediment_compartit,18);
assert.equal(groups.exigeix_revisio_docent,46);
assert(d.rows.find(x=>x.cluster_id==='ME2-C011').needs_current_code_recheck);
assert.equal(d.gates.docent_level_approval,false);
assert.equal(d.gates.official_families_approved,0);
assert.equal(d.gates.official_levels_changed,0);
assert.equal(d.gates.generator_changes,false);
console.log(JSON.stringify({clusters:ids.size,assignments,grouping_hypotheses:groups,approvals:0},null,2));
