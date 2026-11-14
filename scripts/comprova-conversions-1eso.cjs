'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const {resolve}=require('node:path');
const {pathToFileURL}=require('node:url');
let chromium;
for(const p of [
  'C:/Users/srigu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright',
  'C:/Users/srigu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright-core'
]){try{chromium=require(p).chromium;break;}catch{}}
if(!chromium)try{chromium=require('playwright').chromium;}catch{}
if(!chromium)throw Error('Playwright no està disponible. Instal·la/activa Chromium al runtime local.');
async function launch(){
 const errors=[];
 for(const [name,path] of [
  ['Edge','C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'],
  ['Edge','C:/Program Files/Microsoft/Edge/Application/msedge.exe'],
  ['Chrome','C:/Program Files/Google/Chrome/Application/chrome.exe'],
  ['Chrome','C:/Program Files (x86)/Google/Chrome/Application/chrome.exe']
 ])if(fs.existsSync(path)){try{return {browser:await chromium.launch({executablePath:path}),browserEngine:name};}catch(e){errors.push(name+' '+path+': '+e.message);}}
 try{return {browser:await chromium.launch(),browserEngine:'Chromium bundled'};}catch(e){errors.push('bundled Chromium: '+e.message);}
 throw Error('No s’ha pogut iniciar Edge/Chrome/Chromium. '+errors.join(' | '));
}
async function main(){
 const {browser,browserEngine}=await launch();
 try{
  const page=await browser.newPage({viewport:{width:1000,height:900}}),pageErrors=[];
  page.on('pageerror',e=>pageErrors.push(e.message));
  await page.route(/^https?:/,route=>route.abort());
  await page.goto(pathToFileURL(resolve('1eso/sentit-mesura.html')).href);
  const report=await page.evaluate(()=>{
   const check=(v,m)=>{if(!v)throw Error(m);},D=miTaskDifficulty,M=MIFirstMeasureTasks;
   const topic=TOPICS.find(t=>t.id==='conversions'),metric=TOPICS.find(t=>t.id==='metric');
   check(topic&&metric&&D&&M,'conversion/metric topics and dependencies loaded');
   const specs=M.conversionsFamilySpecs,coverage=D.coverage(topic);
   check(specs.length===7,'seven unique conversion families');
   check(coverage.families.length===7&&coverage.types.join(',')==='1,5,1','shared coverage uses unique family levels');
   check(D.examPlan(topic).types.join(',')==='1,5,1','exam plan follows family coverage');
   const ids=new Set(),rotation=[];
   for(let i=0;i<150;i++){
    const q=topic.gen(),key=q.conversionsFamily||q.familyId||q.reasoningFamily;
    check(key,'conversion family metadata');
    check(D.getDifficulty(topic,q)===q.diff||D.getDifficulty(topic,q)===q.taskDifficulty,'shared level for '+key);
    if(rotation.length)check(rotation[rotation.length-1]!==key,'no consecutive repeated conversion family');
    ids.add(key);rotation.push(key);
   }
   const absentFamilies=specs.filter(f=>!ids.has(f.id)).map(f=>f.id);
   check(absentFamilies.length===0,'all seven families reached; absent='+JSON.stringify(absentFamilies)+'; observed='+JSON.stringify(Object.fromEntries([...ids].map(id=>[id,rotation.filter(x=>x===id).length]))));
   check(M.conversionsFamilyInfo('mesura-mixta').id===M.metricFamilyInfo('mesura-mixta').id,'mixed-measure family shared with metric');
   const cSamples={};
   for(const make of MEASURE_PROBLEM_PATTERNS){const q=make();if(/^C0[1-6]$/.test(q.type))cSamples[q.type]=q.primaryTopic;}
   check(Object.keys(cSamples).length===6,'all contextual C01-C06 patterns are accessible');
   for(const id of ['C01','C02','C03','C04','C06'])check(cSamples[id]==='conversions',id+' assigned to conversions');
   check(cSamples.C05==='problemes','same-unit subtraction C05 assigned to contextual problems');
   const i=TOPICS.indexOf(topic);
   selectTopic(i);selectLevel(1);selectMode('multi');startPractice();
   check(curEx&&document.getElementById('guideSteps').style.display==='block','guided practice');
   check(D.getDifficulty(topic,curEx)===curEx.taskDifficulty||D.getDifficulty(topic,curEx)===curEx.diff,'guided classification');
   processPracticeAnswer(true,curEx.correct);nextExercise();check(curEx,'guided next exercise');
   selectLevel(2);selectMode('open');startPractice();
   check(curEx&&document.getElementById('openWrap').style.display==='block','autonomous practice');
   check(document.getElementById('guideSteps').style.display==='none','autonomous mode hides guides');
   check(openOkMeasure('300 dm²','3 m²',{correct:'300 dm²'}),'accept equivalent area response');
   check(!openOkMeasure('300 dm²','2 m²',{correct:'300 dm²'}),'reject wrong area response');
   processPracticeAnswer(true,curEx.correct);nextExercise();check(curEx,'autonomous next exercise');
   selectLevel(2);selectMode('open');startPractice();
   let previous=null,errorRotation=[];
   for(let j=0;j<25;j++){const q=curEx,key=q.conversionsFamily||q.familyId||q.reasoningFamily;check(key!==previous,'error rotation avoids a repeated family');previous=key;errorRotation.push(key);processPracticeAnswer(false,'999999');nextExercise();}
   check(new Set(errorRotation).size>1,'error recovery reaches multiple families');
   check(NEEDED_LVL1===8&&NEEDED_LVL2===15,'practice progression thresholds unchanged');
   miTopicExam.start('conversions');const topicExam=miTopicExam.getSession();
   check(topicExam.questions.length===12,'topic exam has 12 questions');
   for(const q of topicExam.questions)check([1,2,3].includes(D.getDifficulty(topic,q)),'topic exam classification');
   miTopicExam.start('metric');const metricExam=miTopicExam.getSession();
   check(metricExam.questions.length===12,'metric regression exam still has 12 questions');
   check(metricExam.questions.every(q=>!/^C0[1-6]$/.test(String(q.patternId||q.type))),'C01-C06 no longer leak into the metric exam');
   for(const q of metricExam.questions)check([1,2,3].includes(D.getDifficulty(metric,q)),'metric regression classifier');
   miExamSelectedTopics=['conversions'];miStartConfiguredExam();
   check(ST.examQs.length===20,'global exam has 20 questions');
   check(ST.examQs.every(q=>[1,2,3].includes(D.getDifficulty(TOPICS.find(t=>t.id===q.topicId)||topic,q))),'global exam classification');
   const theoryLink=miTheoryLinkHtml('conversions','Teoria de conversions');
   check(theoryLink.includes('conversions-unitats-1r-eso.html'),'conversion theory link');
   const widths={inner:document.documentElement.scrollWidth,viewport:innerWidth};
   check(widths.inner<=widths.viewport+2,'no horizontal overflow on desktop');
   return {families:specs.map(f=>({id:f.id,level:f.level})),coverage:coverage.types,rotation,errorRotation,problemTopics:cSamples,topicExam:topicExam.questions.length,metricExam:metricExam.questions.length,globalExam:ST.examQs.length,widths};
  });
  assert.equal(pageErrors.length,0,'JavaScript page errors: '+pageErrors.join(' | '));
  const theoryPath=pathToFileURL(resolve('1eso/teoria/mesura/conversions-unitats-1r-eso.html')).href;
  await page.setViewportSize({width:390,height:844});
  await page.goto(theoryPath+'#arees');
  const direct=await page.evaluate(()=>({hash:location.hash,target:!!document.getElementById(location.hash.slice(1)),width:document.documentElement.scrollWidth,viewport:innerWidth}));
  assert.equal(direct.hash,'#arees');assert(direct.target,'direct theory anchor');assert(direct.width<=direct.viewport+2,'theory fits mobile width');
  const changed=await page.evaluate(()=>new Promise(resolve=>{let hit=false;const done=()=>{hit=true;removeEventListener('hashchange',done);};addEventListener('hashchange',done);location.hash='comparar';setTimeout(()=>resolve({hit,hash:location.hash,target:!!document.getElementById('comparar')}),60);}));
  assert(changed.hit&&changed.hash==='#comparar'&&changed.target,'theory hashchange navigation');
  assert.equal(pageErrors.length,0,'page errors after theory route: '+pageErrors.join(' | '));
  console.log(JSON.stringify({browser:browserEngine,...report,theory:{directAnchor:direct.hash,hashchange:changed.hash,mobileWidth:direct.viewport}},null,2));
 }finally{await browser.close();}
}
main().catch(e=>{console.error(e.stack||e);process.exitCode=1;});
