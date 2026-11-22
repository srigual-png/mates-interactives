#!/usr/bin/env node
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const root=path.join(__dirname,'..');
const read=n=>JSON.parse(fs.readFileSync(path.join(root,'docs','auditoria',n),'utf8'));
const audit=read('MI_2ESO_mesura_104_restants_verificacio_estructural_codi.json');
const tri=read('MI_2ESO_mesura_triatge_curricular_128_sense_quotes.json');
const pri=read('MI_2ESO_mesura_24_prioritats_revisio_codi.json');
const h=fs.readFileSync(path.join(root,'2eso','sentit-mesura.html'),'utf8');
const fn={unitats:'genUnitats2ESO',escales:'genEscales2ESO',pitagores:'genPitagores2ESO',perimetres:'genPerimetresArees2ESO',superficies:'genSuperficiesVolums2ESO',estimacio:'genEstimacioError2ESO',problemes:'genProblemesMesura2ESO'};
const prior=new Set(pri.cases.map(x=>x.key)),expected=new Set(tri.records.map(x=>x.key).filter(x=>!prior.has(x)));
assert.equal(prior.size,24);assert.equal(expected.size,104);
assert.equal(audit.records.length,104);
const seen=new Set(),guards=[];
for(const row of audit.records){
 assert(expected.has(row.key)&&!seen.has(row.key),'Unexpected/duplicate '+row.key);
 seen.add(row.key);
 const [topic,id]=row.key.split(':'),start=h.indexOf('function '+fn[topic]+'(');
 assert(start>=0);
 const end=h.indexOf('/* ── GENERADOR ·',start+30),section=h.slice(start,end>start?end:h.length);
 const m=new RegExp('(?:if|else if)\\(type==='+Number(id)+'\\)\\{').exec(section);
 assert(m,'Missing branch '+row.key);
 const rest=section.slice(m.index),stop=rest.search(/\n  else if\(type===|\n  return \{/);
 const body=rest.slice(0,stop<0?rest.length:stop);
 const checks={question:/question\s*=/.test(body),answer:/correct\s*=/.test(body),options:/options\s*=/.test(body),guide:/guide\s*=/.test(body),solution:/solution\s*=/.test(body)};
 assert.deepEqual(row.checkpoints,checks);
 assert(Object.values(checks).every(Boolean),'Incomplete '+row.key);
 assert.equal(row.recursion_guard,/return gen[A-Za-z]+2ESO\(/.test(body));
 if(row.recursion_guard)guards.push(row.key);
 assert.equal(row.finding,'structural_checks_passed_not_oracle_proven');
}
assert.deepEqual(guards,audit.recursive_guards);
assert.deepEqual(audit.counts,{remaining_types:104,source_branches_found:104,structural_failures:0,recursive_guard_types:4,oracle_cases_exhaustively_executed:0,official_changes:0});
console.log('OK: 104/104 branques amb 5 peces estructurals; 4 guards recursius; no equival a validació matemàtica.');
