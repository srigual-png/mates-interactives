const fs=require('fs'),path=require('path'),assert=require('assert/strict');
const {chromium}=require('C:/Users/srigu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{const browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});try{
const p=await browser.newPage();await p.route(/^https?:/,r=>r.abort());await p.goto('file:///'+path.resolve('2eso/sentit-numeric.html').replace(/\\/g,'/'));
const data=await p.evaluate(()=>{const check=(v,m)=>{if(!v)throw Error(m);},plain=q=>{const d=document.createElement('div');d.innerHTML=q.question;return d.textContent;},nums=q=>(plain(q).match(/-?\d+(?:[.,]\d+)?/g)||[]).map(s=>Number(s.replace(',','.'))),classify=(id,q)=>miTaskDifficulty.annotate(TOPICS.find(t=>t.id===id),q);let errors=0,discounts=0,priority=0;
for(let i=0;i<100;i++){
 const q=classify('aproximacions',genAproximacions2ESO(7)),[real,a,b]=nums(q);check(Number(q.correct)===(Math.abs(a-real)<Math.abs(b-real)?a:b),'distàncies absolutes');check(q.diff===1,'comparar errors no és alta');errors++;
 const d=classify('percentatges',genPercentatges2ESO(7)),[initial,pct]=nums(d);check(Math.abs(Number(d.correct)-initial*(100-pct)/100)<1e-8,'disminució');check(d.diff===1,'disminució directa no és alta');discounts++;
 const h=classify('operacionsRacionals',genOperacionsRacionals2ESO(17)),[a0,b0,c0]=nums(h);check(h.correct==='Fer primer '+b0+' · '+c0&&h.diff===1,'primer pas');priority++;
}
const random=Math.random;let zero;try{Math.random=()=>0;zero=classify('operacionsRacionals',genOperacionsRacionals2ESO(10));}finally{Math.random=random;}check(zero.correct==='0'&&zero.diff===1&&zero.difficultyVariant==='cancelled','cancel·lació no detectada');const old={...zero};delete old.difficultyVariant;check(classify('operacionsRacionals',old).diff===1,'error antic cancel·lat');
const rndOriginal=rnd;let growth;try{let first=true;rnd=(a,b)=>{if(first){first=false;return 3;}return rndOriginal(a,b);};growth=classify('potencies',genPotencies2ESO(18));}finally{rnd=rndOriginal;}const [start,hours]=nums(growth);check(Number(growth.correct)===start*2**hours&&growth.diff===2,'creixement');
// Les quatre mostres motivadores continuen sent tasques bàsiques, també si un consumidor porta diff:3.
for(const [id,type,question,correct] of [['racionals',1,'Converteix 9/5 a decimal.','1,8'],['operacionsRacionals',17,'Primer pas de 8 + 6 · 4.','Fer primer 6 · 4'],['aproximacions',7,'Valor 168. Quina aproximació és millor: 169 o 165?','169'],['percentatges',7,'Disminució del 25% sobre 80.','60']])check(classify(id,{type,question,correct,diff:3}).diff===1,'cas motivador '+id);
return {absoluteErrorOracles:errors,discountOracles:discounts,priorityCases:priority,cancellation:zero.question,growth:growth.question,motivatingCases:4};});assert(data);fs.writeFileSync('docs/dificultats/casos-pedagogics-punt3.json',JSON.stringify(data,null,2));console.log(JSON.stringify(data));
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
