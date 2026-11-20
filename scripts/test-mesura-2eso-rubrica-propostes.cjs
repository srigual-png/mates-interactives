#!/usr/bin/env node
'use strict';
// Rúbrica de cribratge: no valida famílies genuïnes ni nivells pedagògics.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const dir=path.join(__dirname,'..','docs','auditoria');
const get=n=>JSON.parse(fs.readFileSync(path.join(dir,n),'utf8'));
const source=get('MI_2ESO_mesura_propostes_procediments_nous.json'),rubric=get('MI_2ESO_mesura_rubrica_propostes.json'),inv=get('MI_2ESO_mesura_tracabilitat_128_tipus.json');
const proposals=new Map(source.proposals.map(p=>[p.id,p]));
const keys=new Set(inv.types.map(t=>t.topic+':'+t.type));
assert.equal(keys.size,128);assert.equal(proposals.size,11);assert.equal(rubric.assessments.length,11);
assert.equal(rubric.criteria.length,4);
const accepted=new Set(['candidate_conditional','rework_or_reuse','reuse_as_compound_practice','reinforcement_not_new_family']);
const seen=new Set(),counts={conditional_candidates:0,reuse_or_rework:0,reinforcement_only:0};
for(const row of rubric.assessments){
 assert(!seen.has(row.proposal_id),'Proposta duplicada');seen.add(row.proposal_id);
 const original=proposals.get(row.proposal_id);assert(original,'Proposta desconeguda');
 assert.equal(row.topic,original.topic);assert.equal(row.initial_level,original.proposed_level);
 assert(accepted.has(row.screening_decision),'Decisió no reconeguda');
 assert.equal(row.validated_new_family,false);assert.equal(row.approved_level,null);
 assert.equal(row.proposed_level_remains_hypothesis,true);
 assert.deepEqual(row.overlap,original.existing_overlap);
 for(const k of row.overlap)assert(keys.has(k),'Tipus base absent: '+k);
 let sum=0;for(const c of rubric.criteria){const n=row.scores[c.key];assert(Number.isInteger(n)&&n>=0&&n<=2);sum+=n;}
 assert.equal(row.score_total,sum);
 assert(row.justification.length>65&&row.required_evidence.length>50);
 if(row.screening_decision==='candidate_conditional'){counts.conditional_candidates++;assert(row.scores.independence<=1,'Cap candidata no acredita independència definitiva');}
 else if(row.screening_decision==='reinforcement_not_new_family')counts.reinforcement_only++;
 else counts.reuse_or_rework++;
}
assert.equal(seen.size,11);
assert.deepEqual(rubric.counts,{proposals:11,...counts,validated_new_families:0});
assert.equal(rubric.status,'screening_not_approval');
assert.equal(rubric.assessments.filter(x=>x.initial_level===3).length,7);
assert.equal(rubric.assessments.filter(x=>x.initial_level===1).length,2);
assert.equal(rubric.assessments.filter(x=>x.initial_level===2).length,2);
console.log('OK: 11 propostes rubricades, '+counts.conditional_candidates+' candidates condicionals, '+counts.reuse_or_rework+' a reutilitzar/refer, '+counts.reinforcement_only+' de reforç; cap família aprovada.');
