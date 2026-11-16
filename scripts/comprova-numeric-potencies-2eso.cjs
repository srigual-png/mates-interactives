const assert=require('node:assert/strict');
const path=require('node:path');
const {chromium}=require('playwright');
(async()=>{
 const browser=await chromium.launch({...(process.env.MI_BROWSER_PATH?{executablePath:process.env.MI_BROWSER_PATH}:{}),headless:true});
 try{
  const page=await browser.newPage({viewport:{width:1440,height:900}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
  const url='file:///'+path.resolve('2eso/sentit-numeric.html').replaceAll(String.fromCharCode(92),'/')+'?topic=potencies';
  await page.goto(url);
  const run=await page.evaluate(async()=>{
   const check=(x,m)=>{if(!x)throw Error(m)},topic=TOPICS.find(t=>t.id==='potencies'),families=new Set(),samples=[];
   for(const family of MIDifficulty.potencies2ESOFamilies){const q=await MIWorksheetConfig.topics.find(t=>t.id==='potencies').generateFamily(family.id);check(q.familyId===family.id&&q.level===family.level,'família accessible a fitxes '+family.id+' '+JSON.stringify(q));families.add(q.familyId);samples.push({family:q.familyId,level:q.level,type:q.type,variant:q.variantId});}
   check(families.size===14,'14 famílies accessibles a fitxes');
   const idx=TOPICS.findIndex(t=>t.id==='potencies');state.currentTopic=idx;state.level=1;state.mode='multi';state.done=state.done.filter(x=>x!=='potencies');startPractice();check(currentEx&&currentEx.familyId&&[1,2].includes(currentEx.taskDifficulty),'pràctica guiada mostra família');const guided=currentEx.familyId;processAnswer(false,'resposta de prova');check(state.answered===true,'error registrat');nextExercise();check(currentEx&&currentEx.familyId!==undefined,'recuperació després d’error i exercici següent');const afterError=currentEx.familyId;
   state.level=2;state.mode='multi';state.done=state.done.filter(x=>x!=='potencies');startPractice();check(currentEx&&currentEx.taskDifficulty<=2,'pràctica autònoma estable');const autonomous=currentEx.familyId;
   const exam=miTopicExam.build(topic),examLevels=[1,2,3].map(n=>exam.filter(q=>q.taskDifficulty===n).length),examFamilies=[1,2,3].map(n=>new Set(exam.filter(q=>q.taskDifficulty===n).map(q=>q.familyId)).size);check(exam.length===12&&JSON.stringify(examLevels)==='[6,6,0]','examen de tema 12 preguntes amb nivells disponibles '+JSON.stringify(examLevels));check(examFamilies[0]===6&&examFamilies[1]===6,'famílies no repetides per nivell a l’examen '+JSON.stringify(exam.map(q=>({type:q.type,level:q.taskDifficulty,family:q.familyId,variant:q.variantId}))));
   miExamSelectedTopics=['potencies'];miRunConfiguredExam();const global=state.examQs;check(global.length===20&&global.every(q=>[1,2].includes(q.taskDifficulty)),'examen global amb Potències');return {families:samples.length,practice:{guided,afterError,autonomous},topicExam:{total:exam.length,levels:examLevels,families:examFamilies},globalExam:{total:global.length,levels:[1,2,3].map(n=>global.filter(q=>q.taskDifficulty===n).length)}};
  });
  await page.goto('file:///'+path.resolve('2eso/teoria/numeric/potencies.html').replaceAll(String.fromCharCode(92),'/')+'#zero-negatiu');
  const direct=await page.evaluate(()=>({hash:location.hash,anchor:!!document.getElementById('zero-negatiu')}));assert.deepEqual(direct,{hash:'#zero-negatiu',anchor:true});
  await page.evaluate(()=>location.hash='#propietats');const changed=await page.evaluate(()=>({hash:location.hash,anchor:!!document.getElementById('propietats')}));assert.deepEqual(changed,{hash:'#propietats',anchor:true});
  const mobile=await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth);await page.setViewportSize({width:390,height:844});const mobile390=await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth);assert(mobile&&mobile390,'responsive desktop/mobile');assert.deepEqual(errors,[]);console.log(JSON.stringify({browser:await browser.version(),run,theory:{direct,hashchange:changed,mobile390},pageErrors:errors},null,2));
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});

