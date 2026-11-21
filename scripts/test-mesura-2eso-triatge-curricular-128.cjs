#!/usr/bin/env node
'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const dir=path.join(__dirname,'..','docs','auditoria');
const read=x=>JSON.parse(fs.readFileSync(path.join(dir,x),'utf8'));
const data=read('MI_2ESO_mesura_triatge_curricular_128_sense_quotes.json');
const master=read('MI_2ESO_mesura_tracabilitat_128_tipus.json');
const keys=new Set(master.types.map(t=>t.topic+':'+t.type));
assert.equal(data.status,'first_pass_curricular_triage_not_validation');
assert.equal(keys.size,128);assert.equal(data.records.length,128);
assert.equal(new Set(data.records.map(x=>x.key)).size,128);
for(const x of data.records){
 assert(keys.has(x.key),'Tipus fora de l inventari: '+x.key);
 assert.equal(x.curricular_screen,'plausible_2eso_pending_full_generator_review');
 assert.equal(x.approved_status,'not_reviewed_by_teacher');
 assert(x.procedure.length>10&&x.rationale.length>15);
}
const prioritized=data.priority_cases.map(x=>x.key);
assert.equal(prioritized.length,24);
assert.equal(new Set(prioritized).size,24);
assert(prioritized.every(x=>keys.has(x)));
const actions={};
for(const r of data.records)actions[r.first_pass_action]=(actions[r.first_pass_action]||0)+1;
assert.deepEqual(data.counts.actions,actions);
assert.equal(data.counts.reviewed_descriptive_records,128);
assert.equal(data.counts.flagged_priority_types,24);
assert.equal(data.counts.formal_new_family_approvals,0);
assert.equal(data.counts.official_level_changes,0);
console.log('OK: 128 tipus triats, 24 prioritats, cap família ni nivell oficial alterat.');
