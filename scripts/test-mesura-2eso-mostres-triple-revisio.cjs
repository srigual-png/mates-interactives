#!/usr/bin/env node
'use strict';
// Executa els generadors reals per revisar variants; no valida famílies pedagògiques.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const html=fs.readFileSync(path.join(__dirname,'..','2eso','sentit-mesura.html'),'utf8');
const start=html.indexOf('/* ── UTILITATS DE MESURA');
const end=html.indexOf('/* ── AMPLIACIÓ A',start);
assert(start>=0&&end>start,'Generadors no localitzats');
let seq=0,choice=0,mode='diagonal';
const shuffle=a=>{const k=seq++%a.length;return [...a.slice(k),...a.slice(0,k)]};
const math=Object.create(Math);
math.random=()=>mode==='diagonal'?.25:.75;
const fmtNum=(x,max=4)=>Number(x).toFixed(max).replace(/0+$/,'').replace(/\.$/,'').replace('.',',');
const answerUnit=(x,u,max=6)=>fmtNum(x,max)+' '+u;
const uniq4=(correct,pool)=>{const o=[String(correct)];for(const x of shuffle(pool))if(!o.includes(String(x))&&o.push(String(x))===4)break;assert.equal(o.length,4);return shuffle(o)};
const ctx={Math:math,shuffle,fmtNum,answerUnit,uniq4,
 roundTo:(x,p)=>Math.round((x+Number.EPSILON)*10**p)/10**p,
 unitAlternatives:(x,u,max)=>[answerUnit(x,u,max)],
 pctStr:x=>fmtNum(x,2)+'%',
 countAnswer:(n,s,p)=>n+' '+(n===1?s:(p||s+'s')),
 rnd:(min,max)=>min+seq++%(max-min+1)};
vm.createContext(ctx);vm.runInContext(html.slice(start,end),ctx);
const bold=q=>[...q.question.matchAll(/<b>(.*?)<\/b>/g)].map(m=>m[1]);
const generators={estimacio:ctx.genEstimacioError2ESO,superficies:ctx.genSuperficiesVolums2ESO,pitagores:ctx.genPitagores2ESO};
const cases=[
 ['estimacio',1,'objecte lineal'],['estimacio',2,'superfície'],['estimacio',3,'volum/capacitat'],
 ['superficies',1,'ortoedre'],['superficies',3,'prisma amb base donada'],['superficies',5,'cub']
];
let count=0;
const check=(topic,type,tag,q)=>{
 assert.equal(q.topicId,topic,tag);assert.equal(q.type,type,tag);
 assert(q.question.length>40,tag+' enunciat');
 assert.equal(q.options.length,4,tag+' quatre opcions');
 assert.equal(new Set(q.options).size,4,tag+' opcions úniques');
 assert(q.options.includes(q.correct),tag+' resposta absent');
 assert(q.guide.length>=2&&q.solution.length>=1,tag+' guia o solució');
 const b=bold(q);
 if(topic==='estimacio'){
  assert.equal(b.length,1,tag+' context');
  assert.equal(q.allowOpen,false,tag+' tria contextual');
  const unit=q.correct.split(' ').slice(-1)[0];
  if(type===1)assert(['mm','cm','m'].includes(unit),tag+' unitat longitudinal');
  if(type===2)assert(['m²','cm²'].includes(unit),tag+' unitat superficial');
  if(type===3)assert(['mL','L','m³'].includes(unit),tag+' unitat capacitat');
 }else if(topic==='superficies'){
  assert.equal(b.length,1,tag+' dades');
  const nums=[...b[0].matchAll(/\d+(?:[.,]\d+)?/g)].map(x=>Number(x[0].replace(',','.')));
  let volume;
  if(type===1){assert.equal(nums.length,3);volume=nums[0]*nums[1]*nums[2];}
  if(type===3){assert.equal(nums.length,1);const h=q.question.match(/altura de <b>([\d.,]+) cm<\/b>/);assert(h,tag);volume=nums[0]*Number(h[1].replace(',','.'));}
  if(type===5){assert.equal(nums.length,1);volume=nums[0]**3;}
  assert.equal(q.correct,answerUnit(volume,'cm³'),tag+' oracle matemàtic');
 }
 console.log(tag+': '+q.question.replace(/<[^>]+>/g,'')+' -> '+q.correct);
 count++;
};
for(let sample=0;sample<2;sample++)for(const [topic,type,kind] of cases)check(topic,type,topic+':'+type+' mostra '+sample,generators[topic](type));
for(const choiceMode of ['diagonal','catet']){
 mode=choiceMode;
 const q=ctx.genPitagores2ESO(15),b=bold(q);
 if(mode==='diagonal'){
  assert(q.question.includes('diagonal d’un rectangle'),'Branca diagonal no seleccionada');
  assert.equal(b.length,1);const d=b[0].match(/(\d+) cm × (\d+) cm/);assert(d);
  assert.equal(q.correct,answerUnit(Math.hypot(Number(d[1]),Number(d[2])),'cm'));
 }else{
  assert(q.question.includes('hipotenusa'),'Branca catet no seleccionada');
  assert.equal(b.length,2);
  const a=Number(b[0].split(' ')[0]),c=Number(b[1].split(' ')[0]);
  assert.equal(q.correct,answerUnit(Math.sqrt(a*a-c*c),'cm'));
 }
 assert.equal(q.type,15);
 assert(q.options.includes(q.correct));
 console.log('pitagores:15/'+mode+': '+q.question.replace(/<[^>]+>/g,'')+' -> '+q.correct);
 count++;
}
assert.equal(count,14);
console.log('OK: 14 mostres reals i dues branques de pitagores:15 comprovades; identitat pedagògica pendent.');
