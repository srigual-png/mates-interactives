#!/usr/bin/env node
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const html=fs.readFileSync(path.join(__dirname,'..','2eso/sentit-mesura.html'),'utf8'),a=html.indexOf('/* ── UTILS NUMÈRIQUES'),b=html.indexOf("return {topicId:'problemes',type,course:'2n'",a),end=html.indexOf('\n}',b)+2;
assert(a>=0&&b>a&&end>b);
let seed=0x82190ac3;const math=Object.create(Math);math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296};
const ctx=vm.createContext({Math:math,console});vm.runInContext(html.slice(a,end),ctx,{timeout:15000});
const gen=vm.runInContext('genPitagores2ESO',ctx),plain=s=>String(s).replace(/<[^>]*>/g,'').replace(/\s+/g,' ').trim();
const map={2:new Map(),3:new Map(),15:new Map()},count={2:0,3:0,15:0};
const key=(a,b,c)=>[a,b].sort((x,y)=>x-y).join(':')+':'+c;
for(const t of [2,3,15])for(let i=0;i<400;i++){
 const ex=gen(t),q=plain(ex.question),ans=Number(ex.correct.match(/^\d+/)?.[0]);
 let a,b,c,branch,known;
 if(t===2){const m=q.match(/catets de (\d+) cm i (\d+) cm/);assert(m,q);a=+m[1];b=+m[2];c=Math.sqrt(a*a+b*b);assert.equal(ans,c);branch='hypotenuse';}
 else if(t===3){const m=q.match(/hipotenusa mesura (\d+) cm i un catet (\d+) cm/);assert(m,q);c=+m[1];known=+m[2];const other=Math.sqrt(c*c-known*known);a=known;b=other;assert.equal(ans,other);branch='inverse';}
 else if(q.startsWith('Un alumne calcula la diagonal')){const m=q.match(/rectangle de (\d+) cm × (\d+) cm/);assert(m,q);a=+m[1];b=+m[2];c=Math.sqrt(a*a+b*b);assert.equal(ans,c);branch='diagonal';}
 else {const m=q.match(/hipotenusa (\d+) cm i un catet de (\d+) cm/);assert(m,q);c=+m[1];known=+m[2];const other=Math.sqrt(c*c-known*known);a=known;b=other;assert.equal(ans,other);branch='inverse';}
 assert.equal(ex.correct,ans+' cm');
 assert.equal(ex.options.length,4);assert.equal(new Set(ex.options).size,4);assert(ex.options.includes(ex.correct));
 assert(ex.guide.length>=2&&ex.solution.length>=2);
 const k=key(a,b,c),group=t===15?branch:'all';if(!map[t].has(k))map[t].set(k,{q,answer:ex.correct,branch,a,b,c});
 count[t]++;
}
const direct=[...map[15]].filter(([k,x])=>x.branch==='diagonal'&&map[2].has(k));
const inverse=[...map[15]].filter(([k,x])=>x.branch==='inverse'&&map[3].has(k));
const cross=[...map[3]].filter(([k,x])=>map[2].has(k));
assert(direct.length>=2,'Need diagonal matched source examples');
assert(inverse.length>=2,'Need inverse matched source examples');
assert(cross.length>=2,'Need direct/inverse matched source examples');
const cases=[];
for(const [branch,selected,target] of [['diagonal',direct,map[2]],['inverse',inverse,map[3]],['inverse-vs-direct',cross,map[2]]]){
 for(const [k,x] of selected.slice(0,3)){const y=target.get(k);cases.push({pair:branch==='inverse-vs-direct'?'pitagores:3 vs pitagores:2':'pitagores:15 '+branch+' vs pitagores:'+(branch==='inverse'?3:2),common_triangle:k,source:x.q,source_answer:x.answer,target:y.q,target_answer:y.answer,pedagogy:branch==='inverse-vs-direct'?'Same right triangle, solving inverse versus direct problem':branch==='inverse'?'Both inverse, one contextualized as a diagnosis of expected result':'Both direct, rectangle diagonal wording versus basic right triangle'});}
}
console.log(JSON.stringify({verified:count,total:Object.values(count).reduce((a,b)=>a+b,0),matched_direct:direct.length,matched_inverse:inverse.length,matched_cross:cross.length,paired_cases:cases.length,cases,teacher_approved:false},null,2));
assert(cases.length>=6,'Need at least six actual matching cases across branches');
