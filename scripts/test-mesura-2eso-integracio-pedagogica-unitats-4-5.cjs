#!/usr/bin/env node
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const text=fs.readFileSync(path.join(__dirname,'../2eso/sentit-mesura.html'),'utf8');
const a=text.indexOf('/* ── UTILS NUMÈRIQUES'),b=text.indexOf("return {topicId:'problemes',type,course:'2n'",a),end=text.indexOf('\n}',b)+2;
assert(a>=0&&b>a&&end>b);
let seed=0x17112026;const math=Object.create(Math);math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296};
const ctx=vm.createContext({Math:math,console});vm.runInContext(text.slice(a,end),ctx,{timeout:15000});
const gen=vm.runInContext('genUnitats2ESO',ctx);
const exponent={km:3,hm:2,dam:1,m:0,dm:-1,cm:-2,mm:-3,kL:3,hL:2,daL:1,L:0,dL:-1,cL:-2,mL:-3,kg:3,hg:2,dag:1,g:0,dg:-1,cg:-2,mg:-3};
const clean=s=>String(s).replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim();
const num=s=>Number(s.replace(',','.'));const counts={1:0,4:0,5:0,9:0},real={1:[],4:[],5:[],9:[]};
for(const type of [1,4,5,9])for(let i=0;i<35;i++){
 const ex=gen(type),q=clean(ex.question);counts[type]++;
 if(type===9){const m=q.match(/^Compara ([\d,.]+) m i ([\d,.]+) cm\./);assert(m,q);const left=num(m[1])*100,right=num(m[2]);assert.equal(ex.correct,left>right?'La primera és més gran':'La segona és més gran');assert.equal(ex.allowOpen,false);assert(ex.guide.some(g=>/mateixa unitat/.test(g)));real[type].push({q,correct:ex.correct,substep:left+' cm'});}
 else {const m=q.match(/^Converteix ([\d,.]+) (\S+) a (\S+)\.$/);assert(m,q);const value=num(m[1]),fr=m[2],to=m[3],converted=value*10**(exponent[fr]-exponent[to]);
 assert(Number.isFinite(converted),'Unknown units '+q);assert(Math.abs(num(ex.correct.split(' ')[0])-converted)<1e-5,q);
 assert.equal(ex.allowOpen,true);assert(ex.guide.length>=3);real[type].push({q,correct:ex.correct});
 }
}
assert.equal(counts[1]+counts[4]+counts[5]+counts[9],140);
console.log(JSON.stringify({new_samples:140,counts,examples:{length:real[1][0],capacity:real[4][0],mass:real[5][0],compare:real[9][0]},common_procedure:'Decimal metric unit conversions',distinct_task:'Comparison needs two quantities and a larger/smaller decision, unlike producing a converted numeric quantity',distinct_magnitudes:'Length, capacity and mass conversions share a scaling routine but not the quantity or units. Their grouping requires curricular review, not just source-code similarity',family_approved:false},null,2));
