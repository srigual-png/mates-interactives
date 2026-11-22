#!/usr/bin/env node
'use strict';
// Integritat documental; no és una prova d'equivalència pedagògica ni d'oracle.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const dir=path.join(__dirname,'..','docs','auditoria');
const load=(f)=>JSON.parse(fs.readFileSync(path.join(dir,f),'utf8'));
const master=load('MI_2ESO_mesura_tracabilitat_128_tipus.json');
const dictionary=new Map(master.types.map(r=>[r.topic+':'+r.type,r]));
const expected={
  unitats:{size:18,counts:{shared_local_core:8,contextual_variant:3,compound_candidate:2,review_distinct:3,variant_mixed:2}},
  escales:{size:18,counts:{shared_local_core:8,contextual_variant:6,compound_candidate:2,review_distinct:2,variant_mixed:0}}
};
const classifications=new Set(['shared_local_core','contextual_variant','compound_candidate','review_distinct','variant_mixed']);
for(const [topic,opts] of Object.entries(expected)){
  const a=load('MI_2ESO_mesura_'+topic+'_decisions_'+opts.size+'_tipus.json');
  assert.equal(a.schema_version,1);
  assert.equal(a.status,'provisional');
  assert.equal(a.scope,'2eso/mesura/'+topic);
  assert.equal(a.rows.length,opts.size);
  const assigned=new Set(), counts={shared_local_core:0,contextual_variant:0,compound_candidate:0,review_distinct:0,variant_mixed:0};
  for(const row of a.rows){
    assert.equal(row.key,topic+':'+row.type);
    assert(Number.isInteger(row.type)&&row.type>=1&&row.type<=opts.size);
    assert(!assigned.has(row.type),'Duplicat '+row.key);
    assigned.add(row.type);
    assert.equal(row.old_group,dictionary.get(row.key)?.source_candidate,'Grup sense traçabilitat: '+row.key);
    assert(classifications.has(row.decision));
    assert.equal(row.status,'provisional');
    assert(row.procedure.length>12&&row.rationale.length>12&&row.current_level_note.length>1);
    counts[row.decision]++;
    assert(Array.isArray(row.shared_with));
    for(const ref of row.shared_with){
      assert(dictionary.has(ref),'Referència inexistent '+ref);
      assert.notEqual(ref,row.key,'Autoreferència '+row.key);
    }
  }
  for(let i=1;i<=opts.size;i++)assert(assigned.has(i),'Falta '+topic+':'+i);
  assert.deepEqual(counts,opts.counts);
  console.log('OK '+topic+': '+opts.size+' tipus únics; decisions '+JSON.stringify(counts));
}
console.log('No es declaren famílies genuïnes, N3 ni nivells validades.');
