#!/usr/bin/env node
'use strict';
// Casos dirigits: sameBase i other de superficies:17, amb oracle independent.
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const dir=path.join(__dirname,'..');
const html=fs.readFileSync(path.join(dir,'2eso','sentit-mesura.html'),'utf8');
const classifier=fs.readFileSync(path.join(dir,'assets','js','dificultat-mi.js'),'utf8');
const start=html.indexOf('/* ── UTILITATS DE MESURA');
const end=html.indexOf('/* ── AMPLIACIÓ A',start);
assert(start>=0&&end>start,'Generadors no localitzats');
const fmtNum=(n,p=4)=>Number(n).toFixed(p).replace(/0+$/,'').replace(/\.$/,'').replace('.',',');
const answerUnit=(n,u,p=6)=>fmtNum(n,p)+' '+u;
const uniq4=(correct,wrong)=>{const out=[String(correct)];for(const x of wrong){if(!out.includes(String(x)))out.push(String(x));if(out.length===4)break;}assert.equal(out.length,4);return out;};
const cases=[
 {mode:'sameBase',selectors:[0,0,0,1,0,0],expectedA:[4,3,2],expectedB:[4,3,3],level:1},
 {mode:'other',selectors:[2,2,2,0,3,2],expectedA:[6,5,4],expectedB:[3,6,5],level:2},
 {mode:'sameBase',selectors:[1,1,2,2,1,1],expectedA:[5,4,4],expectedB:[5,4,4],level:1},
 {mode:'other',selectors:[0,2,1,2,0,1],expectedA:[4,5,3],expectedB:[5,3,4],level:2}
];
// Replace last two cases if tied volumes or equal heights are detected (these are fixtures, not generated random inputs).
cases[2]={mode:'sameBase',selectors:[1,1,2,2,1,0],expectedA:[5,4,4],expectedB:[5,4,3],level:1};
cases[3]={mode:'other',selectors:[0,2,1,2,0,2],expectedA:[4,5,3],expectedB:[5,3,5],level:2};
const doc={createElement:()=>({
 _html:'',set innerHTML(v){this._html=String(v)},get textContent(){return this._html.replace(/<[^>]*>/g,'')}
})};
const ctx={Math,fmtNum,answerUnit,uniq4,document:doc,
 unitAlternatives:(n,u,p)=>[answerUnit(n,u,p)],
 roundTo:(n,p)=>Math.round((n+Number.EPSILON)*10**p)/10**p,
 pctStr:n=>fmtNum(n,2)+'%',countAnswer:(n,s,p)=>n+' '+(n===1?s:(p||s+'s')),
 rnd:(a,b)=>a,
 shuffle:a=>a};
vm.createContext(ctx);vm.runInContext(html.slice(start,end),ctx);vm.runInContext(classifier,ctx);
assert(ctx.MIDifficulty?.attach,'No es troba el classificador real');
const t={id:'superficies',name:'Superfícies i volums',gen:ctx.genSuperficiesVolums2ESO};
const mi=ctx.MIDifficulty.attach({course:'2eso',sense:'mesura',topics:[t]});
const n=s=>Number(s);
let completed=0;
for(const fixture of cases){
 let pos=0;
 ctx.shuffle=a=>{
   if(pos<6){const sel=fixture.selectors[pos++];assert(sel<a.length,'Selector fora de rang');return [a[sel],...a.filter((_,i)=>i!==sel)]}
   return a;
 };
 const q=ctx.genSuperficiesVolums2ESO(17);
 const bold=[...q.question.matchAll(/<b>(.*?)<\/b>/g)].map(x=>x[1]);
 assert.equal(bold.length,2,fixture.mode);
 const dims=bold.map(x=>{const m=x.match(/^(\d+)×(\d+)×(\d+) dm$/);assert(m,'Dimensions mal formades: '+x);return m.slice(1).map(n)});
 assert.deepEqual(dims[0],fixture.expectedA);assert.deepEqual(dims[1],fixture.expectedB);
 const sameBase=dims[0][0]===dims[1][0]&&dims[0][1]===dims[1][1];
 assert.equal(sameBase,fixture.mode==='sameBase');
 const volume=v=>v.reduce((a,b)=>a*b,1);
 const a=volume(dims[0]),b=volume(dims[1]);
 assert.notEqual(a,b,'Igualtat de volums: el generador recursa, fixture invàlid');
 assert.equal(q.correct,a>b?'El recipient A':'El recipient B','Oracle de volum independent');
 assert.equal(q.difficultyVariant,sameBase?'sameBase':undefined,'Variant marcada al generador');
 assert.equal(q.options.length,4);assert.equal(new Set(q.options).size,4);assert(q.options.includes(q.correct));
 const assigned=mi.getDifficulty(t,q);
 assert.equal(assigned,fixture.level,'Classificació N'+fixture.level);
 const copy={...q};delete copy.difficultyVariant;
 const inferred=mi.getDifficulty(t,copy);
 assert.equal(inferred,fixture.level,'Classificació compatible amb preguntes antigues sense metadades');
 console.log(fixture.mode+': '+bold.join(' vs ')+' -> '+q.correct+', N'+assigned+'; detecció antiga N'+inferred);
 completed++;
}
assert.equal(completed,4);
console.log('OK: 4 mostres dirigides, 2 sameBase N1 i 2 other N2, oracles independents i fallback de classificació');
