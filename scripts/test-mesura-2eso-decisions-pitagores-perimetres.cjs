#!/usr/bin/env node
'use strict';
// Comprovació de cobertura i traçabilitat, NO de validació pedagògica.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const folder=path.join(__dirname,'..','docs','auditoria');
const read=name=>JSON.parse(fs.readFileSync(path.join(folder,name),'utf8'));
const all=read('MI_2ESO_mesura_tracabilitat_128_tipus.json');
const map=new Map(all.types.map(x=>[x.topic+':'+x.type,x]));
const cases={
  pitagores:{count:16,expected:{shared_local_core:6,contextual_variant:1,compound_candidate:4,review_distinct:4,variant_mixed:1}},
  perimetres:{count:18,expected:{shared_local_core:7,contextual_variant:5,compound_candidate:3,review_distinct:3,variant_mixed:0}}
};
for(const [topic,{count,expected}] of Object.entries(cases)){
  const d=read('MI_2ESO_mesura_'+topic+'_decisions_'+count+'_tipus.json');
  assert.equal(d.status,'provisional');
  assert.equal(d.scope,'2eso/mesura/'+topic);
  assert.equal(d.rows.length,count);
  const covered=new Set(),observed={shared_local_core:0,contextual_variant:0,compound_candidate:0,review_distinct:0,variant_mixed:0};
  for(const x of d.rows){
    assert.equal(x.key,topic+':'+x.type);
    assert(Number.isInteger(x.type)&&x.type>=1&&x.type<=count);
    assert(!covered.has(x.type),'Repetit '+x.key);
    covered.add(x.type);
    assert.equal(x.old_group,map.get(x.key)?.source_candidate,'Agrupació d\'origen incorrecta '+x.key);
    assert.equal(x.status,'provisional');
    assert(Object.hasOwn(observed,x.decision),'Tipus de decisió desconeguda');
    observed[x.decision]++;
    assert(x.procedure.length>12&&x.rationale.length>12);
    assert(Array.isArray(x.shared_with));
    for(const ref of x.shared_with){
      assert(map.has(ref),'Referència desconeguda '+ref);
      assert.notEqual(ref,x.key,'Referència al mateix tipus');
    }
  }
  for(let type=1;type<=count;type++)assert(covered.has(type),'Falta '+topic+':'+type);
  assert.deepEqual(observed,expected);
  if(topic==='pitagores'){
    const x=d.rows.find(r=>r.type===15);
    assert.equal(x.decision,'variant_mixed','Cal separar diagonal/catet');
  }
  if(topic==='perimetres'){
    const a=d.rows.find(r=>r.type===15);
    assert(a.rationale.includes('NO es demana deduir apotema'),'No confondre amb trigonometria');
  }
  console.log('OK '+topic+': '+count+' tipus amb decisions provisionals, cobertura i referències vàlides');
}
console.log('Total 34 tipus; la prova NO valida famílies, nivells ni càlculs en navegador.');
