#!/usr/bin/env node
'use strict';
// Control d'integritat de PROPOSTES, no certificat de novetat ni de dificultat.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.join(__dirname,'..','docs','auditoria');
const read=x=>JSON.parse(fs.readFileSync(path.join(root,x),'utf8'));
const doc=read('MI_2ESO_mesura_propostes_procediments_nous.json');
const inventory=read('MI_2ESO_mesura_tracabilitat_128_tipus.json');
const known=new Set(inventory.types.map(x=>x.topic+':'+x.type));
const topics=new Set(Object.keys(inventory.counts));
assert.equal(known.size,128);
assert.equal(doc.status,'ideas_only_unapproved');
assert.equal(doc.proposals.length,11);
const ids=new Set(),levels={N1:0,N2:0,N3:0},seenTopicN3=new Set();
const expected={
 'MI2-MES-U-N2-01':1.2*1000-950,
 'MI2-MES-U-N2-02':.75*1000-180,
 'MI2-MES-U-N3-01':650,
 'MI2-MES-E-N3-01':(8*50/100)*(6*50/100),
 'MI2-MES-P-N3-01':Math.hypot(6,8)+Math.hypot(5,12),
 'MI2-MES-PA-N3-01':16+3.14*2,
 'MI2-MES-S-N3-01':4*3+2*4*2+2*3*2,
 'MI2-MES-EST-N3-01':Math.abs(99-100)/100*100,
 'MI2-MES-PR-N3-01':Math.ceil((2*(8*50/100+6*50/100)-1)/5),
 'MI2-MES-PR-N1-01':12/4,
 'MI2-MES-PR-N1-02':3
};
for(const p of doc.proposals){
 assert(!ids.has(p.id),'ID repetit');ids.add(p.id);
 assert(topics.has(p.topic),'Tema no inventariat: '+p.topic);
 assert([1,2,3].includes(p.proposed_level));
 levels['N'+p.proposed_level]++;
 if(p.proposed_level===3)seenTopicN3.add(p.topic);
 assert(p.worked_example.prompt.length>30);
 assert(p.worked_example.reasoning.length>12);
 assert(Number.isFinite(p.worked_example.answer));
 assert(Math.abs(expected[p.id]-p.worked_example.answer)<1e-8,'Oracle erroni: '+p.id);
 assert(p.existing_overlap.length>0,'Sense contrast documentat: '+p.id);
 for(const key of p.existing_overlap)assert(known.has(key),'Tipus existent no trobat: '+key);
 assert.equal(p.not_approved,true);
 assert.equal(p.decision,'pending_curricular_and_pedagogical_review');
}
assert.equal(ids.size,Object.keys(expected).length);
assert.equal(seenTopicN3.size,7,'No tots els set temes tenen una idea N3');
assert.deepEqual(doc.counts,{ideas:11,...levels});
assert(doc.explicit_exclusions.some(x=>x.includes('Duplic')||x.includes('duplicat')));
console.log('OK: 11 propostes amb exemples matemàticament verificats, 2 N1 + 2 N2 + 7 N3; 7 temes i enllaços als 128 tipus existents. Cap família nova validada.');
