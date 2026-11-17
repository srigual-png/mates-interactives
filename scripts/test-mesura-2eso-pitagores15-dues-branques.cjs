#!/usr/bin/env node
'use strict';
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync(path.join(__dirname,'..','2eso/sentit-mesura.html'),'utf8');
const beg=html.indexOf('/* ── UTILS NUMÈRIQUES'),mid=html.indexOf("return {topicId:'problemes',type,course:'2n'",beg),end=html.indexOf('\n}',mid)+2;
assert(beg>=0&&mid>beg&&end>mid);
const M=Object.create(Math);let seed=0x85d112ee;
M.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296};
const c=vm.createContext({Math:M,console});
vm.runInContext(html.slice(beg,end),c,{timeout:15000});
const gen=vm.runInContext('genPitagores2ESO',c);
const n=s=>Number(s.replace(',','.'));
const counts={diagonal:0,catet:0},examples={diagonal:[],catet:[]};
for(let i=0;i<400;i++){
 const ex=gen(15),q=ex.question.replace(/<[^>]*>/g,'');
 let expected,branch;
 if(q.includes('diagonal d’un rectangle')){
  branch='diagonal';const m=q.match(/rectangle de ([\d,.]+) cm × ([\d,.]+) cm/);
  assert(m,'Missing rectangle parameters');expected=Math.sqrt(n(m[1])**2+n(m[2])**2);
 }else{
  branch='catet';const m=q.match(/hipotenusa ([\d,.]+) cm i un catet de ([\d,.]+) cm/);
  assert(m,'Missing inverse parameters');expected=Math.sqrt(n(m[1])**2-n(m[2])**2);
 }
 const answer=ex.correct.match(/^([\d,.]+) cm$/);
 assert(answer,'Wrong unit or format');
 assert(Math.abs(n(answer[1])-expected)<.005001,'Incorrect '+branch+' result');
 assert.equal(ex.options.length,4);assert.equal(new Set(ex.options).size,4);assert(ex.options.includes(ex.correct));
 if(branch==='diagonal')assert(ex.guide.join(' ').includes('Suma els quadrats'));
 else assert(ex.guide.join(' ').includes('Resta el quadrat'));
 counts[branch]++;
 if(examples[branch].length<2)examples[branch].push({q,correct:ex.correct});
}
assert(counts.diagonal>=100&&counts.catet>=100,'Branch coverage insufficient');
console.log(JSON.stringify({checked:400,counts,examples,official_level_changes:0},null,2));
