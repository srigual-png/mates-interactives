#!/usr/bin/env node
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const html=fs.readFileSync(path.join(__dirname,'..','2eso/sentit-mesura.html'),'utf8'),a=html.indexOf('/* ── UTILS NUMÈRIQUES'),b=html.indexOf("return {topicId:'problemes',type,course:'2n'",a),end=html.indexOf('\n}',b)+2;
assert(a>=0&&b>a&&end>b);
let seed=0x19888cf1;const math=Object.create(Math);math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296};
const ctx=vm.createContext({Math:math,console});vm.runInContext(html.slice(a,end),ctx,{timeout:15000});const gen=vm.runInContext('genProblemesMesura2ESO',ctx);
const plain=s=>String(s).replace(/<[^>]*>/g,'').replace(/\s+/g,' ').trim(),num=s=>Number(s.replace(',','.'));
const found={14:new Map(),15:new Map()};let tested=0;
for(const type of [14,15])for(let i=0;i<400;i++){
 const ex=gen(type),q=plain(ex.question);let L,W,g,c=1,unit;
 if(type===14){const m=q.match(/jardí rectangular de ([\d,.]+) × ([\d,.]+) m.*?porta de ([\d,.]+) m.*?costa ([\d,.]+) €\/m/);assert(m,'Cannot parse fence '+q);[L,W,g,c]=m.slice(1).map(num);unit='€';}
 else{const m=q.match(/habitació rectangular de ([\d,.]+) × ([\d,.]+) m.*?porta de ([\d,.]+) m/);assert(m,'Cannot parse skirting '+q);[L,W,g]=m.slice(1).map(num);unit='m';}
 const needed=2*(L+W)-g;assert(needed>0);
 const expected=needed*c;
 const ans=ex.correct.match(/^([\d,.]+) (m|€)$/);assert(ans,ex.correct);assert.equal(ans[2],unit);assert(Math.abs(num(ans[1])-expected)<.00501);
 assert.equal(ex.options.length,4);assert.equal(new Set(ex.options).size,4);assert(ex.options.includes(ex.correct));assert(ex.guide.length>=3&&ex.solution.length>=2);
 found[type].set([L,W,g].join(':'),{question:q,correct:ex.correct,needed,c,L,W,g});
 tested++;
}
const exact=[...found[14].keys()].filter(k=>found[15].has(k));
assert.equal(exact.length,0,'Unexpected identical dimensional fixtures: inspect before claiming no exact overlap');
const pairs=[];const f=[...found[14].values()].sort((a,b)=>a.needed-b.needed);const s=[...found[15].values()].sort((a,b)=>a.needed-b.needed);
for(let i=0;i<4;i++){
 const x=f[i],y=s[i];
 assert.equal(num(x.correct.split(' ')[0]),x.needed*x.c);assert.equal(num(y.correct.split(' ')[0]),y.needed);
 pairs.push({fence:{question:x.question,answer:x.correct,net_length_m:x.needed,unit_price_eur_per_m:x.c},skirting:{question:y.question,answer:y.correct,net_length_m:y.needed},shared_method:'2 × (length + width) − door width',distinction:'Fence has a subsequent multiplication by cost; skirting stops at length; no equal-parameter pairs exist in their fixture sets'});
}
console.log(JSON.stringify({generated:tested,structural_comparisons:pairs.length,exact_input_overlap:exact.length,fixture_counts:{fence:found[14].size,skirting:found[15].size},comparisons:pairs,teacher_approved:false},null,2));
assert.equal(tested,800);assert.equal(pairs.length,4);
