#!/usr/bin/env node
'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const dir=path.join(__dirname,'..','docs','auditoria');
const read=n=>JSON.parse(fs.readFileSync(path.join(dir,n),'utf8'));
const proposal=read('MI_2ESO_mesura_proposta_nivells_20_variants_pedagogiques.json');
const groups=read('MI_2ESO_mesura_evidencia_cognitiva_5_clusters_geometria_error.json');
const mixed=read('MI_2ESO_mesura_exemples_cognitius_C011_variants_mixtes.json');
const rounding=read('MI_2ESO_mesura_estimacio_12_convencio_arrodoniment_proposta.json');
const original=[...groups.clusters.flatMap(c=>c.variants.map(v=>({key:v.key,cluster:c.cluster,task:v.demand,reason:v.rationale,example:v.example}))),...mixed.checks.map(v=>({key:v.key,cluster:v.cluster,task:v.task,reason:v.cognitive_rationale,example:v.example}))];
assert.equal(original.length,20);
assert.equal(proposal.records.length,20);
assert.equal(new Set(proposal.records.map(r=>r.type_or_variant)).size,20);
assert.equal(proposal.counts.official_level_assignments,0);
assert.equal(proposal.counts.official_family_approvals,0);
const index=new Map(original.map(r=>[r.key,r]));
const levels={};
for(const r of proposal.records){
 const expected=index.get(r.type_or_variant);assert(expected,'Missing source evidence '+r.type_or_variant);
 assert.equal(r.cluster_id,expected.cluster);
 assert.equal(r.task,expected.task);
 assert.equal(r.example,expected.example);
 if(r.type_or_variant.startsWith('pitagores:15:')){
  assert(r.type_or_variant.endsWith(':diagonal')?r.reason.includes('modelitzar'):r.reason.includes('restar els quadrats'));
 }else assert.equal(r.reason,expected.reason);
 if(r.type_or_variant.startsWith('pitagores:15:')){
  assert.equal(r.teacher_decision,'nivell_intern_validat_2026-11-20');
  assert.equal(r.level_confidence,'mitjana_revisio_docent');
  assert.equal(r.level_suggestion,'N2_candidat');
 }else{
  assert.equal(r.teacher_decision,'pendent');
  assert.equal(r.level_confidence,'baixa_no_validat');
  assert(['N1_candidat','N2_candidat','N1_o_N2_pendent'].includes(r.level_suggestion));
 }
 levels[r.level_suggestion]=(levels[r.level_suggestion]||0)+1;
}
assert.deepEqual(levels,{N1_o_N2_pendent:3,N2_candidat:12,N1_candidat:5});
assert.equal(proposal.internal_level_decisions.status,'validated_for_internal_mi_map');
assert(proposal.unresolved.every(x=>x.key!=='pitagores:15'));
assert.equal(rounding.permission_boundary.source_generator_edited,true);
assert.equal(rounding.permission_boundary.levels_changed,false);
assert.equal(rounding.permission_boundary.merge,false);
assert.equal(rounding.permission_boundary.deploy,false);
assert.equal(rounding.level_guidance.approved,false);
assert(proposal.unresolved.some(x=>x.key==='estimacio:12'));
for(const v of Object.values(proposal.gates))assert.equal(v,false);
console.log(JSON.stringify({traceable_variants:20,candidate_levels:levels,rounding_midpoint_clarification_authorized:true,official_level_changes:0,official_family_approvals:0},null,2));
