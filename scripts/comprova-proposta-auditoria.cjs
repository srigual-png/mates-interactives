#!/usr/bin/env node
'use strict';

// Checks the structure and traceability of PROVISIONAL pedagogical audits.
// This script cannot decide whether a mathematical family is genuinely N1/N2/N3.
const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');

function validate(a){
  const problems=[];
  const check=(ok,msg)=>{if(!ok)problems.push(msg);};
  const nonempty=v=>typeof v==='string'&&v.trim().length>0;
  check(a&&typeof a==='object'&&!Array.isArray(a),'document must be an object');
  if(!a||typeof a!=='object'||Array.isArray(a))return problems;
  check(a.schema_version===1,'schema_version must equal 1');
  check(a.status==='provisional','audits must be provisional, not validated');
  check(nonempty(a.topic_id),'topic_id required');
  check(nonempty(a.course),'course required');
  check(nonempty(a.sense),'sense required');
  check(nonempty(a.base_commit)&&/^[a-f0-9]{40}$/.test(a.base_commit||''),'base_commit must be a 40-character SHA');
  check(nonempty(a.curriculum_reference),'curriculum_reference required');
  check(Array.isArray(a.source_files)&&a.source_files.length>0&&a.source_files.every(nonempty),'source_files must be nonempty');
  check(Array.isArray(a.generator_types)&&a.generator_types.length>0,'generator_types must be nonempty');
  check(Array.isArray(a.families)&&a.families.length>0,'families must be nonempty');
  const types=new Set(),coverage=new Map(),ids=new Set();
  for(const t of (Array.isArray(a.generator_types)?a.generator_types:[])){
    check(nonempty(t),'generator_types entries must be nonempty strings');
    if(types.has(t))problems.push('duplicate generator type: '+t);
    types.add(t);
  }
  for(const f of (Array.isArray(a.families)?a.families:[])){
    const id=f?.id||'(missing id)';
    if(ids.has(id))problems.push('duplicate family id: '+id);
    ids.add(id);
    check(nonempty(f?.id),'family id required');
    check(nonempty(f?.name),id+': name required');
    check(nonempty(f?.procedure),id+': mathematical procedure required');
    check(nonempty(f?.difference_from_similar),id+': mathematical distinction required');
    check(nonempty(f?.curriculum_fit),id+': curriculum fit required');
    check([1,2,3].includes(f?.proposed_level),id+': proposed_level must be 1, 2 or 3');
    check(f?.current_level===null||[1,2,3].includes(f?.current_level),id+': current_level must be null or 1, 2, 3');
    check(['maintain','reclassify','new','merge'].includes(f?.decision),id+': unsupported decision');
    check(nonempty(f?.level_rationale),id+': level rationale required');
    if(f?.decision==='reclassify')check(f.current_level!==f.proposed_level&&f.current_level!==null,id+': reclassification must change an existing level');
    if(f?.decision==='maintain')check(f.current_level===f.proposed_level,id+': maintained level must match');
    if(f?.decision==='new')check(f.current_level===null,id+': new family must have null current_level');
    check(Array.isArray(f?.generator_types)&&f.generator_types.length>0,id+': generator types required');
    for(const t of (Array.isArray(f?.generator_types)?f.generator_types:[])){
      check(types.has(t),id+': unknown generator type '+t);
      if(coverage.has(t))problems.push('generator type '+t+' assigned to multiple families: '+coverage.get(t)+' and '+id);
      coverage.set(t,id);
    }
    check(Array.isArray(f?.examples)&&f.examples.length>=2,id+': at least 2 worked examples required');
    for(const [n,e] of (Array.isArray(f?.examples)?f.examples:[]).entries()){
      check(nonempty(e?.question)&&nonempty(e?.answer)&&Array.isArray(e?.steps)&&e.steps.length>0&&e.steps.every(nonempty),id+': invalid worked example '+(n+1));
    }
    check(Array.isArray(f?.common_errors)&&f.common_errors.length>0&&f.common_errors.every(nonempty),id+': common errors required');
  }
  for(const t of types)if(!coverage.has(t))problems.push('generator type not assigned to any family: '+t);
  if(a.shared_procedures!==undefined)check(Array.isArray(a.shared_procedures),'shared_procedures must be an array');
  if(a.limitations!==undefined)check(Array.isArray(a.limitations)&&a.limitations.every(nonempty),'limitations must be a string array');
  return problems;
}

function fixture(){
  return {schema_version:1,status:'provisional',topic_id:'2eso/mesura/exemple',course:'2n ESO',sense:'Mesura',
    base_commit:'a'.repeat(40),curriculum_reference:'Currículum ESO: magnituds i mesura',
    source_files:['2eso/sentit-mesura.html'],generator_types:['1','2'],
    families:[{id:'convertir',name:'Convertir unitats',procedure:'Convertir una magnitud entre unitats',
      difference_from_similar:'No exigeix comparar dues magnituds',curriculum_fit:'Conversions de 2n ESO',
      current_level:1,proposed_level:1,decision:'maintain',level_rationale:'Aplicació directa del factor conegut',
      generator_types:['1','2'],examples:[
        {question:'2 m a cm',answer:'200 cm',steps:['Multiplica 2 per 100']},
        {question:'3 km a m',answer:'3000 m',steps:['Multiplica 3 per 1000']}],
      common_errors:['Invertir el factor de conversió']}],shared_procedures:[],limitations:[]};
}
if(process.argv.includes('--self-test')){
  assert.deepEqual(validate(fixture()),[],'valid example rejected');
  const dup=fixture();dup.families.push({...dup.families[0],id:'segona'});
  assert(validate(dup).some(x=>x.includes('multiple families')),'duplicate mapping not caught');
  const lost=fixture();lost.families[0].generator_types=['1'];
  assert(validate(lost).some(x=>x.includes('not assigned')),'unmapped generator not caught');
  const weak=fixture();weak.families[0].level_rationale='';
  assert(validate(weak).some(x=>x.includes('rationale')),'missing rationale not caught');
  const mismatch=fixture();mismatch.families[0].decision='reclassify';
  assert(validate(mismatch).some(x=>x.includes('reclassification')),'invalid reclassification not caught');
  console.log('OK: 5 automated validation cases passed. Pedagogical correctness still requires human review.');
  process.exit(0);
}
const files=process.argv.slice(2);
if(!files.length){
  console.error('Usage: node scripts/comprova-proposta-auditoria.cjs --self-test | <proposal.json> [...]');
  process.exit(2);
}
let failed=false;
for(const file of files){
  try{
    const v=JSON.parse(fs.readFileSync(path.resolve(file),'utf8'));
    const errors=validate(v);
    if(errors.length){failed=true;console.error('FAIL '+file+'\n'+errors.map(x=>' - '+x).join('\n'));}
    else console.log('OK '+file+': '+v.families.length+' provisional families, '+v.generator_types.length+' generator types; human review pending');
  }catch(e){failed=true;console.error('FAIL '+file+': '+e.message);}
}
if(failed)process.exitCode=1;
