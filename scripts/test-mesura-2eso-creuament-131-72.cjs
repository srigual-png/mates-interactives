#!/usr/bin/env node
'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.join(__dirname,'..','docs','auditoria');
const read=n=>JSON.parse(fs.readFileSync(path.join(root,n),'utf8'));
const cross=read('MI_2ESO_mesura_creuament_131_fitxes_72_agrupacions.json');
const catalogue=read('MI_2ESO_mesura_cataleg_global_provisional.json');
const batches=[
'MI_2ESO_mesura_proposta_nivells_20_variants_pedagogiques.json',
'MI_2ESO_mesura_nivells_candidats_unitats_escales_20.json',
'MI_2ESO_mesura_nivells_candidats_escales_pitagores_20.json',
'MI_2ESO_mesura_nivells_candidats_pitagores_perimetres_20.json',
'MI_2ESO_mesura_nivells_candidats_perimetres_superficies_20.json',
'MI_2ESO_mesura_nivells_candidats_estimacio_problemes_31.json'];
const original=batches.flatMap((file,i)=>read(file).records.map(x=>({
 key:i===0?x.type_or_variant:x.key,
 level:i===0?({N1_candidat:'N1',N2_candidat:'N2',N1_o_N2_pendent:'N1_N2'})[x.level_suggestion]:x.level_candidate
})));
const members=new Map(catalogue.clusters.flatMap(c=>c.members.map(k=>[k,c.id])));
assert.equal(original.length,131);
assert.equal(cross.records.length,131);
assert.equal(catalogue.clusters.length,72);
const known=new Map(original.map(x=>[x.key,x]));
assert.equal(known.size,131);
const levels={N1:0,N2:0,N1_N2:0},types=new Set();
for(const row of cross.records){
 const source=known.get(row.key);assert(source,'Missing source proposal '+row.key);
 assert.equal(row.level_candidate,source.level);
 const base=row.key.split(':').slice(0,2).join(':');types.add(base);
 assert.equal(row.generator_type,base);
 assert.equal(row.cluster_id,members.get(row.key)||members.get(base));
 assert.equal(row.approved,false);
 levels[row.level_candidate]++;
}
assert.equal(types.size,128);
assert.deepEqual(levels,{N1:27,N2:80,N1_N2:24});
assert.equal(cross.reviewed_links.length,14);
let crossCluster=0;
for(const link of cross.reviewed_links){
 const ids=new Set(link.members.map(k=>{assert(members.has(k),'Missing catalog member '+k);return members.get(k)}));
 assert.deepEqual([...ids].sort(),[...link.member_clusters].sort());
 assert(link.reason.length>30);
 assert.equal(link.pending_teacher,true);
 if(ids.size>1)crossCluster++;
}
assert.equal(crossCluster,3);
for(const val of Object.values(cross.permissions))assert.equal(val,false);
assert.equal(cross.reconciliation.approved_families,0);
console.log(JSON.stringify({difficulty_records:131,generator_types:types.size,groups:catalogue.clusters.length,levels,reviewed_strategy_links:14,links_across_prior_clusters:crossCluster,approved_changes:0},null,2));
