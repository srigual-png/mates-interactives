#!/usr/bin/env node
'use strict';
// Compara criteris d'admissibilitat; no homologació de nivell o família.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const root=path.join(__dirname,'..'),dir=path.join(root,'docs','auditoria');
const read=n=>JSON.parse(fs.readFileSync(path.join(dir,n),'utf8'));
const data=read('MI_2ESO_mesura_estimacio12_contrast_cognitiu.json');
const specs=read('MI_2ESO_mesura_tres_especificacions_pedagogiques.json');
const html=fs.readFileSync(path.join(root,'2eso','sentit-mesura.html'),'utf8');
assert(html.includes("const measured=shuffle([12.3,18.7,25.4,40.6])[0],step=0.1"));
assert(html.includes(" cm (exclòs)"));
assert(html.includes("else if(type===12){"));
assert.equal(data.core_comparison.existing_type,'estimacio:12');
assert.equal(data.core_comparison.new_family_approved,false);
assert.equal(data.core_comparison.comparison_cases.length,4);
for(const c of data.core_comparison.comparison_cases){
 const lo=Math.round((c.rounding_reported_cm-c.step_cm/2)*100)/100;
 const hi=Math.round((c.rounding_reported_cm+c.step_cm/2)*100)/100;
 const x=Math.round(c.reading_cm*100)/100;
 const roundOk=x>=lo&&x<hi;
 const ePct=100*Math.abs(c.reading_cm-c.reference_cm)/c.reference_cm;
 const percentOk=ePct<=c.tolerance_pct+1e-10;
 assert.equal(roundOk,c.rounding_compatible,'Interval arrodoniment '+c.id);
 assert.equal(percentOk,c.relative_percent_compatible,'Tolerància relativa '+c.id);
}
assert.equal(data.cognitive_review.length,3);
const ids=new Set(specs.specifications.map(x=>x.proposal_id));
for(const item of data.cognitive_review){
 assert(ids.has(item.proposal_id));
 assert.equal(item.suggested_level_for_pilot,2);
 assert.equal(item.approved_level,null);
 assert(item.N2_evidence.length>60&&item.N3_gate.length>90);
 assert(item.baseline_steps.length>=3);
}
assert.deepEqual(data.counts,{proposals:3,rounding_tolerance_counterexamples:4,approved_families:0,approved_levels_N3:0});
console.log('OK: 4 contraexemples de dues regles de tolerancia, 3 hipotesis cognitives N2; zero families/N3 homologats.');
