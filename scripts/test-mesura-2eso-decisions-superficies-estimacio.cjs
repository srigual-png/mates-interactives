#!/usr/bin/env node
'use strict';
// Audit estructural: cobertura i referències; no avalua famílies genuïnes ni resultats.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const dir=path.join(__dirname,'..','docs','auditoria');
const read=(name)=>JSON.parse(fs.readFileSync(path.join(dir,name),'utf8'));
const master=read('MI_2ESO_mesura_tracabilitat_128_tipus.json');
const all=new Map(master.types.map(x=>[x.topic+':'+x.type,x]));
const expected={
 superficies:{size:20,counts:{shared_local_core:7,contextual_variant:7,compound_candidate:4,review_distinct:1,variant_mixed:1}},
 estimacio:{size:18,counts:{shared_local_core:7,contextual_variant:6,compound_candidate:2,review_distinct:3,variant_mixed:0}}
};
for(const [topic,{size,counts}] of Object.entries(expected)){
 const audit=read('MI_2ESO_mesura_'+topic+'_decisions_'+size+'_tipus.json');
 assert.equal(audit.status,'provisional');
 assert.equal(audit.scope,'2eso/mesura/'+topic);
 assert.equal(audit.rows.length,size);
 const covered=new Set();
 const found={shared_local_core:0,contextual_variant:0,compound_candidate:0,review_distinct:0,variant_mixed:0};
 for(const r of audit.rows){
   assert.equal(r.key,topic+':'+r.type);
   assert(Number.isInteger(r.type)&&r.type>=1&&r.type<=size);
   assert(!covered.has(r.type),'Tipus repetit: '+r.key);
   covered.add(r.type);
   assert.equal(r.old_group,all.get(r.key)?.source_candidate,'Agrupació original no coincideix: '+r.key);
   assert.equal(r.status,'provisional');
   assert(Object.hasOwn(found,r.decision));
   found[r.decision]++;
   assert(r.procedure.length>12&&r.rationale.length>12);
   assert(Array.isArray(r.shared_with));
   for(const ref of r.shared_with) {
     assert(all.has(ref),'Referència inexistent: '+ref);
     assert.notEqual(ref,r.key,'Autoreferència: '+r.key);
   }
 }
 for(let i=1;i<=size;i++)assert(covered.has(i),'Falta '+topic+':'+i);
 assert.deepEqual(found,counts);
 if(topic==='superficies')assert.equal(audit.rows.find(r=>r.type===17).decision,'variant_mixed','Cal conservar sameBase');
 if(topic==='estimacio')assert.equal(audit.rows.find(r=>r.type===9).decision,'compound_candidate','Cal distingir dues referències');
 console.log('OK '+topic+': '+size+'/'+size+' decisions coherents amb el registre mestre');
}
// Reconciliar els set fitxers de decisions, no només els dos darrers.
const counts={problemes:20,unitats:18,escales:18,pitagores:16,perimetres:18,superficies:20,estimacio:18};
const seen=new Set();
for(const [topic,n] of Object.entries(counts)){
 const a=read('MI_2ESO_mesura_'+topic+'_decisions_'+n+'_tipus.json');
 assert.equal(a.rows.length,n);
 for(const r of a.rows){
   assert(!seen.has(r.key),'Duplicació transversal '+r.key);
   seen.add(r.key);
   assert(all.has(r.key),'Tipus fora del registre de 128: '+r.key);
 }
}
assert.equal(seen.size,128);
for(const k of all.keys())assert(seen.has(k),'Tipus no consolidat '+k);
console.log('OK: 128/128 tipus coberts pels 7 fitxers de decisions.');
console.log('ATENCIÓ: decisió documental provisional, sense validació pedagògica definitiva.');
