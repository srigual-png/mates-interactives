#!/usr/bin/env node
'use strict';
// Contrasta els 128 registres descriptius i les 9 variants; no valida independència curricular.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const dir=path.join(__dirname,'..','docs','auditoria');
const read=n=>JSON.parse(fs.readFileSync(path.join(dir,n),'utf8'));
const source=read('MI_2ESO_mesura_tracabilitat_128_tipus.json');
const doc=read('MI_2ESO_mesura_tres_candidates_contrast_global_128.json');
const spec=read('MI_2ESO_mesura_tres_especificacions_pedagogiques.json');
const known=new Set(source.types.map(x=>x.topic+':'+x.type));
assert.equal(known.size,128);assert.equal(doc.rows.length,128);
assert.equal(doc.definitions.length,3);assert.equal(spec.specifications.length,3);
const unique=new Set(),cats=['direct_overlap_review','shared_component','related_context','no_overlap_identified_in_inventory'];
for(const r of doc.rows){
 assert(known.has(r.key),'Clau no inventariada: '+r.key);
 assert(!unique.has(r.key),'Clau duplicada: '+r.key);unique.add(r.key);
 assert.equal(r.topic,r.key.split(':')[0]);
 assert(r.source_procedure.length>12);
 assert.deepEqual(Object.keys(r.comparisons),doc.definitions.map(d=>d.id));
 for(const v of Object.values(r.comparisons))assert(cats.includes(v),'Categoria desconeguda');
}
for(const d of doc.definitions){
 const s=spec.specifications.find(x=>x.proposal_id===d.id);
 assert(s,'Especificació absent: '+d.id);
 assert.equal(d.criteria.length>45,true);
 for(const key of [...d.direct,...d.component,...d.related])assert(known.has(key));
 const keys=[...d.direct,...d.component,...d.related];
 assert.equal(new Set(keys).size,keys.length,'Una clau no pot tenir dues categories');
 const count={direct:0,component:0,related:0,none:0};
 for(const r of doc.rows){
  const v=r.comparisons[d.id];
  const expected=d.direct.includes(r.key)?'direct_overlap_review':d.component.includes(r.key)?'shared_component':d.related.includes(r.key)?'related_context':'no_overlap_identified_in_inventory';
  assert.equal(v,expected,'Matriu incoherent: '+r.key+' vs '+d.id);
  const kind=v==='direct_overlap_review'?'direct':v==='shared_component'?'component':v==='related_context'?'related':'none';
  count[kind]++;
 }
 assert.deepEqual(doc.counts[d.id],count);
 assert(s.closest_existing.every(key=>d.direct.includes(key)),'Els tipus de contrast prioritaris han de ser dins coincidències directes');
 assert.equal(s.new_family_approved,false);
 assert.equal(s.level_approved,null);
 assert.equal(s.variants.length,3);
}
assert.equal(doc.status,'global_inventory_screening_only');
assert.equal(doc.novelty_findings.length,3);
// Proves de varietat cognitiva: per a cadascun dels tres dissenys hi ha respostes
// oposades o enganyoses; no simplement tres nombres diferents.
const esc=spec.specifications.find(x=>x.topic==='escales');
assert(esc.variants.some(x=>x.equivalent===true));
assert(esc.variants.some(x=>x.id==='same_area_non_equivalent'&&x.equivalent===false));
const per=spec.specifications.find(x=>x.topic==='perimetres');
assert(per.variants.some(x=>x.below===true));
assert(per.variants.some(x=>x.id==='exact_limit'&&x.below===false));
const est=spec.specifications.find(x=>x.topic==='estimacio');
assert(est.variants.some(x=>x.accepted.every(Boolean)===false&&x.accepted.every(v=>!v)));
assert(est.variants.some(x=>x.id==='exact_limit'&&x.accepted.some(Boolean)));
console.log('OK: 128/128 inventariats x 3 cribratges = 384 enllaços classificats, 9 variants de contrast, 0 famílies o N3 aprovats.');
