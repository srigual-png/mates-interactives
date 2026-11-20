#!/usr/bin/env node
'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const p=path.join(__dirname,'..','docs','auditoria','MI_2ESO_mesura_proposta_correccio_distractors_estimacio_1_11.json');
const d=JSON.parse(fs.readFileSync(p,'utf8'));
assert.equal(d.status,'proposed_not_approved_not_implemented');
const factors={mm:.001,cm:.01,m:1,km:1000,L:.001,'l':.001};
const num=s=>{const m=/^([\d,.]+)\s*(mm|cm|km|m|L)$/.exec(s);assert(m,'Unrecognized '+s);return Number(m[1].replace(',','.'))*factors[m[2]]};
const distinct=opts=>{assert.equal(opts.length,4);assert.equal(new Set(opts).size,4);for(let i=0;i<4;i++)for(let j=i+1;j<4;j++)assert(Math.abs(num(opts[i])-num(opts[j]))>1e-10,opts[i]+' equivalent to '+opts[j]);};
distinct(d.est1.proposed);assert(d.est1.proposed.includes(d.est1.oracle));
assert.equal(d.est11.cases.length,4);
for(const c of d.est11.cases){distinct(c.options);assert(c.options.includes(c.correct));assert(c.question.length>70);assert(c.reason.length>30)}
assert.equal(d.checks.suggested_generator_changes_applied,0);
assert.equal(d.checks.official_levels_changed,0);
assert.equal(d.checks.pedagogical_approval,null);
assert.equal(d.checks.implementation_authorized,false);
console.log('OK: 5 bancs de resposta amb quatre opcions numeriques no equivalents i decisions encara pendents.');
