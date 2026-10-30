const fs=require('fs'),path=require('path'),assert=require('assert');
const {chromium}=require('C:/Users/srigu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{
 const browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
 try{
 const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('file:///'+path.resolve('2eso/sentit-numeric.html').replace(/\\/g,'/')+'?topic=racionals');
 const result=await page.evaluate(()=>{
  const check=(ok,msg)=>{if(!ok)throw Error(msg);};let variants=0;
  for(let type=1;type<=16;type++)for(let i=0;i<50;i++){
   const q=genRacionals2ESO(type);check(q.diff>=1&&q.diff<=3,'classificació');
   check(q.options.filter(o=>o===q.correct).length===1,'resposta exacta única '+type);
   check(q.solution.length>0&&!/undefined|NaN|Infinity/.test(JSON.stringify(q)),'solució '+type);
   if(type===16){
    const [a,b,p]=q.question.match(/\d+/g).map(Number),k=Number(q.correct);
    check(k>1,'variant trivial');
    check(openOk(q.correct,q.alts,String(k*2)+'/2',q),'resposta equivalent');
    check(!openOk(q.correct,q.alts,String(k-1),q),'resposta incorrecta');
    check((a+k)/(b+k)>p/100,'proporció final');
    check((a+k-1)/(b+k-1)<=p/100,'mínim');
    check(q.solution.join(' ').includes(String(k)),'solució coherent');
   }
   variants++;
  }
  // Extrems de l'espai de dades: mínim, màxim, igualtat al llindar.
  for(let b=20;b<=40;b++)for(let a=4;a<=9;a++)for(const p of [50,60,75]){
   const k=Math.floor((p*b-100*a)/(100-p))+1;
   check(100*(a+k)>p*(b+k)&&100*(a+k-1)<=p*(b+k-1),'llindar estricte');
  }
  for(const support of [1,2])for(const mode of ['multi','open'])for(let d=1;d<=3;d++){
   state.level=support;state.mode=mode;document.getElementById('rationalTaskDifficulty').value=String(d);
   for(let i=0;i<40;i++)check(getExerciseForMode().diff===d,'filtre amb suport '+support+' '+mode);
   showExercise();check(currentEx.diff===d,'exercici mostrat');
   check(document.getElementById('guideSteps').style.display===(support===1?'block':'none'),'pistes independents');
  }
  return {variants,thresholdCases:21*6*3,practiceSamples:2*2*3*40};
 });
 await page.goto('file:///'+path.resolve('2eso/sentit-numeric.html').replace(/\\/g,'/')+'?topic=racionals&practice=1&difficulty=3&level=2');
 assert(await page.evaluate(()=>currentEx.diff===3&&state.level===2&&document.getElementById('guideSteps').style.display==='none'));
 await page.goto('file:///'+path.resolve('2eso/sentit-numeric.html').replace(/\\/g,'/')+'?topic=racionals&examen=tema');
 await page.waitForSelector('#miTopicExam.active');
 const exam=await page.evaluate(()=>{const qs=miTopicExam.getSession().questions;return {counts:[1,2,3].map(d=>qs.filter(q=>q.diff===d).length),highTypes:[...new Set(qs.filter(q=>q.diff===3).map(q=>q.type))]};});
 assert.deepEqual(exam.counts,[4,4,4]);assert.deepEqual(exam.highTypes,[16]);assert.deepEqual(errors,[]);
 const out={...result,exam,pageErrors:errors};fs.mkdirSync('docs/dificultats',{recursive:true});fs.writeFileSync('docs/dificultats/resultats-racionals-2eso.json',JSON.stringify(out,null,2));console.log(out);
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
