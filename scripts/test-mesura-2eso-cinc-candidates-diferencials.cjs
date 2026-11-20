#!/usr/bin/env node
'use strict';
// Comprova traçabilitat de la revisió diferencial; NO certifica famílies noves.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const dir=path.join(__dirname,'..','docs','auditoria');
const read=n=>JSON.parse(fs.readFileSync(path.join(dir,n),'utf8'));
const doc=read('MI_2ESO_mesura_cinc_candidates_diferencials.json');
const source=read('MI_2ESO_mesura_rubrica_propostes.json');
const traced=read('MI_2ESO_mesura_tracabilitat_128_tipus.json');
const keys=new Set(traced.types.map(x=>x.topic+':'+x.type));
const candidates=new Set(source.assessments.filter(x=>x.screening_decision==='candidate_conditional').map(x=>x.proposal_id));
const seen=new Set(),summary={promising_distinct_family_to_review:0,compound_problem_not_independent_family_yet:0};
assert.equal(doc.status,'screened_not_approved');
assert.equal(doc.records.length,5);
for(const r of doc.records){
 assert(candidates.has(r.id)&&r.id!=='MI2-MES-PR-N3-01','Proposta no esperada: '+r.id);
 assert(!seen.has(r.id),'Proposta duplicada');seen.add(r.id);
 for(const key of r.closest)assert(keys.has(key),'Tipus de contrast inexistent: '+key);
 for(const k of ['existing_required_decision','candidate_addition','reason','falsifiable_test'])
  assert(r[k].length>85,'Evidència massa curta: '+r.id+'/'+k);
 assert.equal(r.level_status,'N3 not confirmed');
 assert(Object.hasOwn(summary,r.classification));
 summary[r.classification]++;
}
assert.deepEqual(doc.counts,{proposals:5,...summary,validated_new_families:0,approved_N3:0});
assert.deepEqual(summary,{promising_distinct_family_to_review:3,compound_problem_not_independent_family_yet:2});
// Tres contraexemples que discriminen de l'estratègia existent.
// Escales: l'àrea coincideix però la configuració de costats no.
const [a1,a2]=[[4,3],[6,2]];assert.equal(a1[0]*a1[1],a2[0]*a2[1]);assert.notDeepEqual(a1.slice().sort(),a2.slice().sort());
// Perímetres: el diàmetre del semicercle adossat deixa de formar part del contorn.
const PI=3.14,len=6,width=4,r=width/2;
const rectanglePerimeter=2*(len+width),semicirclePerimeter=PI*r+width;
const external=rectanglePerimeter+semicirclePerimeter-2*width;
assert(Math.abs(external-22.28)<1e-9);
assert(external<rectanglePerimeter+semicirclePerimeter);
// Estimació: una mesura pot ser més precisa que una altra i, tanmateix, cap ser admissible.
const ref=100,tol=.5,errors=[Math.abs(99-ref)/ref*100,Math.abs(98-ref)/ref*100];
assert(errors[0]<errors[1]);assert(errors.every(e=>e>tol));
console.log('OK: 5 diferències avaluades, 3 candidates de revisió, 2 composicions; 3 contraexemples matemàtics. Cap família/N3 validada.');
