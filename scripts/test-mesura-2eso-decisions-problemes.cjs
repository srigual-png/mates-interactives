#!/usr/bin/env node
'use strict';
// Comprova integritat i coherència amb el catàleg dels 128 tipus; no valida el criteri pedagògic.
const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const root=path.join(__dirname,'..','docs','auditoria');
const master=JSON.parse(fs.readFileSync(path.join(root,'MI_2ESO_mesura_tracabilitat_128_tipus.json'),'utf8'));
const decisions=JSON.parse(fs.readFileSync(path.join(root,'MI_2ESO_mesura_problemes_decisions_20_tipus.json'),'utf8'));
assert.equal(decisions.schema_version,1);
assert.equal(decisions.status,'provisional');
assert.equal(decisions.scope,'2eso/mesura/problemes');
assert.equal(decisions.rows.length,20);
const all=new Map(master.types.map(x=>[x.topic+':'+x.type,x]));
const counted=new Map();
const allowed=new Set(['shared_core','contextual_variant','compound_candidate','review_distinct']);
for(const row of decisions.rows){
  assert(row.type>=1&&row.type<=20&&Number.isInteger(row.type));
  assert.equal(row.key,'problemes:'+row.type);
  assert(all.has(row.key));
  assert.equal(row.old_group,all.get(row.key).source_candidate);
  assert.equal(row.status,'provisional');
  assert(allowed.has(row.decision));
  assert(row.procedure&&row.rationale&&row.procedure.length>12&&row.rationale.length>12);
  assert(Array.isArray(row.shared_with));
  assert(!counted.has(row.type),'Tipus duplicat '+row.type);
  counted.set(row.type,true);
  for(const ref of row.shared_with){
    assert(all.has(ref),'Referència no existent '+ref);
    assert(!ref.startsWith('problemes:'),'No és una altra família transversal '+ref);
  }
  if(row.decision==='shared_core')assert(row.shared_with.length>0,'Cal família d’origen: '+row.key);
}
for(let n=1;n<=20;n++)assert(counted.has(n),'Tipus sense decisió '+n);
assert.deepEqual(master.types.filter(x=>x.topic==='problemes').map(x=>x.type).sort((a,b)=>a-b),[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]);
const pm13=decisions.rows.filter(x=>x.old_group==='PM13'),pm14=decisions.rows.filter(x=>x.old_group==='PM14');
assert.equal(new Set(pm13.map(x=>x.procedure)).size,2,'PM13 ha d’estar desagregat en dos procediments');
assert.equal(new Set(pm14.map(x=>x.procedure)).size,3,'PM14 ha d’estar desagregat en tres procediments');
const counts=Object.fromEntries([...allowed].map(k=>[k,decisions.rows.filter(x=>x.decision===k).length]));
assert.deepEqual(counts,{shared_core:10,contextual_variant:5,compound_candidate:4,review_distinct:1});
console.log('OK: 20/20 tipus de Problemes desagregats, PM13 i PM14 separats; 10 compartits, 5 variants, 4 compostos i 1 pendent');
console.log('Nota: integritat documental, no validació pedagògica de famílies.');
