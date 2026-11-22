#!/usr/bin/env node
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const dir=path.join(__dirname,'..','docs','auditoria');
const load=name=>JSON.parse(fs.readFileSync(path.join(dir,name),'utf8'));
const full=load('MI_2ESO_mesura_creuament_131_fitxes_72_agrupacions.json');
const reviewed=load('MI_2ESO_mesura_11_vincles_estrategies_restants.json');
const previous=load('MI_2ESO_mesura_3_vincles_transversals_evidencia.json');
assert.equal(reviewed.cases.length,11);
assert.equal(previous.cases.length,3);
const original=new Map(full.reviewed_links.map(x=>[x.id,x]));
const already=new Set(previous.cases.map(x=>x.id));
const now=new Set();
for(const c of reviewed.cases){
 assert(original.has(c.id),'Unrecognized link '+c.id);
 assert(!already.has(c.id),'Previously audited link '+c.id);
 assert(!now.has(c.id),'Repeated link '+c.id);
 now.add(c.id);
 const x=original.get(c.id);
 assert.deepEqual(c.members,x.members);
 assert.deepEqual(c.member_clusters,x.member_clusters);
 assert.equal(c.candidate_level_by_member.length,c.members.length);
 for(const v of c.candidate_level_by_member){
   assert(c.members.includes(v.key));
   const source=full.records.filter(r=>r.key===v.key).map(r=>r.level_candidate);
   assert.deepEqual(v.levels,source);
 }
 assert(c.mathematical_model.trim().length>0&&c.pedagogical_risk.trim().length>0);
 assert.equal(c.teacher_approved,false);
}
assert.equal(new Set([...already,...now]).size,14);
assert.equal(reviewed.cases.find(x=>x.id==='DEDUPE-14').working_judgment,'different_strategy_do_not_merge');
assert.equal(reviewed.case_count,11);
for(const value of Object.values(reviewed.pending_permission))assert.equal(value,false);
console.log(JSON.stringify({crosswalk_links:14,previously_reviewed:3,newly_reviewed:11,missing:0,teacher_approved:0,official_changes:0},null,2));
