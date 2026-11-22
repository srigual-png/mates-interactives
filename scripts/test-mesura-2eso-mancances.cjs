#!/usr/bin/env node
'use strict';
// Recalcula els dèficits de TIPUS sense confondre'ls amb famílies genuïnes.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const root=path.join(__dirname,'..');
const dir=path.join(root,'docs','auditoria');
const read=n=>JSON.parse(fs.readFileSync(path.join(dir,n),'utf8'));
const report=read('MI_2ESO_mesura_mancances_per_tema_i_nivell.json');
const master=read('MI_2ESO_mesura_tracabilitat_128_tipus.json');
const base=read('MI_2ESO_mesura_cataleg_global_provisional.json');
const first=read('MI_2ESO_mesura_escissions_prioritaries.json');
const second=read('MI_2ESO_mesura_variants_pitagores_estimacio_superficies.json');
const matrix=read('MI_2ESO_mesura_matriu_nivells_variants_mixtes.json');
const code=fs.readFileSync(path.join(root,'assets/js/dificultat-mi.js'),'utf8');
const begin=code.split('const REVIEWED_LEVELS=freeze(')[1];
assert(begin,'Mapa de nivells no trobat');
const levels=JSON.parse(begin.slice(0,begin.indexOf(');')))['2eso/mesura'];
assert(levels,'Nivells 2n ESO de Mesura no localitzats');
let clusters=base.clusters.map(c=>({id:c.id,members:c.members}));
for(const proposal of [...first.splits,...second.proposals]){
 assert.equal(clusters.filter(c=>c.id===proposal.parent).length,1);
 clusters=clusters.filter(c=>c.id!==proposal.parent);
 clusters.push(...proposal.parts.map(p=>({id:p.id,members:p.members})));
}
assert.equal(clusters.length,85);
assert.equal(report.topic_records.length,7);
assert.equal(matrix.types.length,3);
let total=0,n3=0;
for(const row of report.topic_records){
 const blocks=levels[row.topic],types=master.counts[row.topic];
 assert.equal(blocks.length,3,'Nivells diferents de N1/N2/N3: '+row.topic);
 assert.equal(blocks.flat().length,types,'Nombre de tipus a nivells incoherent: '+row.topic);
 assert.equal(new Set(blocks.flat()).size,types,'Tipus repetit: '+row.topic);
 assert.deepEqual(blocks.flat().slice().sort((a,b)=>a-b),Array.from({length:types},(_,i)=>i+1));
 const levelsCount={N1:blocks[0].length,N2:blocks[1].length,N3:blocks[2].length};
 assert.deepEqual(row.base_type_levels,levelsCount,'Recompte N1/N2/N3 erroni: '+row.topic);
 const gap={N1:Math.max(0,5-levelsCount.N1),N2:Math.max(0,5-levelsCount.N2),N3:Math.max(0,3-levelsCount.N3)};
 assert.deepEqual(row.type_level_floor_gaps,gap,'Dèficit de tipus erroni: '+row.topic);
 const touched=clusters.filter(c=>c.members.some(k=>k.startsWith(row.topic+':'))).length;
 assert.equal(row.working_cluster_touch_count,touched,'Clústers locals incorrectes: '+row.topic);
 assert.equal(row.provisional_gap_to_15_working_clusters,Math.max(0,15-touched));
 assert.equal(row.generator_types,types);
 assert.equal(row.validated_genuine_families,null,'No afirmar famílies validades');
 for(const level of ['N1','N2','N3'])assert.equal(row.validated_family_levels[level],null);
 assert.equal(row.genuine_family_gap,'not_measurable_before_pedagogical_validation');
 total+=types;n3+=levelsCount.N3;
}
assert.equal(total,128);assert.equal(n3,0);
assert.equal(report.counts.hypothetical_split_working_clusters,85);
assert.equal(report.status,'diagnostic_not_curricular_validation');
console.log('OK: 128 tipus, 7 temes, N3=0 en nivells base; dèficits de tipus i recompte dels 85 clústers provisionals coherents. Famílies genuïnes: no determinades.');
