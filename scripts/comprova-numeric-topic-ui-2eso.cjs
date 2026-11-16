const assert=require('node:assert/strict');
const path=require('node:path');
const {chromium}=require('playwright');

const THEORY={aproximacions:'aproximacions-errors.html',proporcionalitat:'proporcionalitat-directa.html',percentatges:'percentatges.html',recomptes:'recomptes-sistematics.html'};
async function run(topicId){
 const root=process.cwd();
 const browser=await chromium.launch({...(process.env.MI_BROWSER_PATH?{executablePath:process.env.MI_BROWSER_PATH}:{}),headless:true});
 try{
  const page=await browser.newPage({viewport:{width:1440,height:900}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.addInitScript(()=>{window.__miOpenedTheory=[];window.open=(url,name)=>{window.__miOpenedTheory.push({url:String(url),name});return undefined;};});
  const base='file:///'+path.resolve('2eso/sentit-numeric.html').replaceAll(String.fromCharCode(92),'/');await page.goto(base);
  const app=await page.evaluate(topicId=>{
   const check=(ok,message)=>{if(!ok)throw Error(message);},topic=TOPICS.find(t=>t.id===topicId),families=MIDifficulty.numeric2ESOFamilies[topicId],idx=TOPICS.indexOf(topic);
   check(topic&&families.length>0,'tema i famílies carregats');
   for(const family of families){check(family.anchor,'ancoratge assignat '+family.id);check(MIWorksheetConfig.topics.find(t=>t.id===topicId).families.some(x=>x.family===family.id),'família disponible a fitxes '+family.id);}
   state.currentTopic=idx;state.level=1;state.mode='multi';state.done=state.done.filter(x=>x!==topicId);startPractice();
   check(currentEx?.topicId===topicId&&[1,2].includes(currentEx.taskDifficulty)&&currentEx.familyId&&document.querySelector('#guideSteps').style.display!=='none','pràctica guiada amb família i pista N1/N2 '+topicId+' '+JSON.stringify(currentEx));
   const guided=currentEx.familyId;processAnswer(false,'resposta incorrecta de validació');check(state.answered===true,'error guardat a la sessió');
   const link=document.querySelector('#feedbackArea .mi-review-theory-link');check(link,'enllaç teoria després d’error');
   const href=new URL(link.href);check(href.pathname.includes('/teoria/numeric/')&&href.hash==='#'+currentEx.familyAnchor,'enllaç amb ancoratge de família '+href.href);link.click();const openedTheory=window.__miOpenedTheory[0];check(openedTheory?.url===href.href&&openedTheory.name,'el clic activa l’obertura contextual');
   nextExercise();check(currentEx?.topicId===topicId&&currentEx.familyId&&[1,2].includes(currentEx.taskDifficulty),'recuperació després d’error '+JSON.stringify(currentEx));
   state.level=2;state.mode='multi';state.done=state.done.filter(x=>x!==topicId);startPractice();check(currentEx?.topicId===topicId&&[1,2].includes(currentEx.taskDifficulty)&&document.querySelector('#guideSteps').style.display==='none','pràctica autònoma N1/N2');const autonomous=currentEx.familyId;
   const plan=miTaskDifficulty.examPlan(topic),exam=miTopicExam.build(topic),levels=[1,2,3].map(n=>exam.filter(q=>q.taskDifficulty===n).length),distinct=[1,2,3].map(n=>new Set(exam.filter(q=>q.taskDifficulty===n).map(q=>q.familyId)).size);
   check(exam.length===12&&levels[0]+levels[1]===12&&levels[2]===0,'examen de tema de 12 preguntes '+JSON.stringify(levels));
   check(levels[0]===plan.slots[0]&&levels[1]===plan.slots[1],'distribució N1/N2 segons pla '+JSON.stringify({levels,plan}));
   check(distinct[0]>=Math.min(levels[0],families.filter(f=>f.level===1).length)&&distinct[1]>=Math.min(levels[1],families.filter(f=>f.level===2).length),'diversitat de famílies a l’examen '+JSON.stringify(distinct));
   miExamSelectedTopics=[topicId];miRunConfiguredExam();const global=state.examQs,globalLevels=[1,2,3].map(n=>global.filter(q=>q.taskDifficulty===n).length);
   check(global.length===20&&global.every(q=>q.topicId===topicId&&[1,2].includes(q.taskDifficulty)),'examen global de 20 preguntes sense N3');
   return {guided,autonomous,feedbackHref:href.href,openedTheory,topicExam:{length:exam.length,levels,distinct},globalExam:{length:global.length,levels:globalLevels},familyAnchors:families.map(f=>f.anchor)};
  },topicId);
  const opened=app.openedTheory;assert(opened&&opened.url===app.feedbackHref&&opened.name,'clic pràctica→teoria');
  const theoryPath='2eso/teoria/numeric/'+THEORY[topicId],theoryUrl='file:///'+path.resolve(theoryPath).replaceAll(String.fromCharCode(92),'/');
  const familyAnchors=app.familyAnchors;
  for(const anchor of familyAnchors){await page.goto(theoryUrl+'#'+anchor);assert.deepEqual(await page.evaluate(()=>({hash:location.hash,exists:!!document.getElementById(location.hash.slice(1))})),{hash:'#'+anchor,exists:true},'accés directe #'+anchor);}
  const from=familyAnchors[0],to=familyAnchors[familyAnchors.length-1];await page.goto(theoryUrl+'#'+from);
  const changed=await page.evaluate(to=>new Promise(resolve=>{window.addEventListener('hashchange',()=>resolve({hash:location.hash,exists:!!document.getElementById(location.hash.slice(1))}),{once:true});location.hash=to;}),to);
  assert.deepEqual(changed,{hash:'#'+to,exists:true},'hashchange '+from+' → '+to);
  await page.goto(base);await page.setViewportSize({width:390,height:844});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'vista mòbil 390 px');
  assert.deepEqual(errors,[],'errors JavaScript');
  console.log(JSON.stringify({topicId,browser:await browser.version(),...app,practiceTheoryClick:opened,directAnchors:familyAnchors.length,hashchange:changed,mobile390:true,pageErrors:errors},null,2));
 }finally{await browser.close();}
}
module.exports={run};
