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
   const check=(v,m)=>{if(!v)throw Error(m);},topic=TOPICS.find(t=>t.id==='metric'),D=miTaskDifficulty,M=MIFirstMeasureTasks;
   check(topic&&D&&M,'metric topic/dependencies loaded');
   const specs=M.metricFamilySpecs,coverage=D.coverage(topic);
   check(specs.length===4,'four real metric families');
   check(coverage.families.length===4&&coverage.types.join(',')==='2,1,1','shared coverage counts families, not raw generator types');
   check(D.examPlan(topic).types.join(',')==='2,1,1','exam plan uses the reviewed family coverage');
   const ids=new Set(),trace=[];
   for(let i=0;i<120;i++){
    const q=topic.gen(),key=q.metricFamily||q.reasoningFamily||q.familyId;
    check(key,'generated family metadata');check(D.getDifficulty(topic,q)===q.diff||D.getDifficulty(topic,q)===q.taskDifficulty,'shared level '+key);
    if(trace.length)check(trace[trace.length-1]!==key,'no consecutive repeat of a real family');
    ids.add(key);trace.push(key);
   }
   check(specs.every(f=>ids.has(f.id)),'all four families reached in topic generator');
   check(NEEDED_LVL1===8&&NEEDED_LVL2===15,'existing practice progression thresholds unchanged');
   const idx=TOPICS.indexOf(topic);
   selectTopic(idx);selectLevel(1);selectMode('multi');startPractice();
   check(curEx&&document.getElementById('guideSteps').style.display==='block','guided practice starts with hints');
   const guidedFamily=curEx.metricFamily||curEx.reasoningFamily||curEx.familyId;
   check(D.getDifficulty(topic,curEx)===curEx.taskDifficulty||D.getDifficulty(topic,curEx)===curEx.diff,'guided classifier');
   processPracticeAnswer(true,curEx.correct);nextExercise();check(curEx,'guided next exercise');
   selectLevel(2);selectMode('open');startPractice();
   check(curEx&&document.getElementById('openWrap').style.display==='block','autonomous open-answer practice starts');
   check(document.getElementById('guideSteps').style.display==='none','autonomous mode hides guided hints');
   check(openOkMeasure('3000 m','3 km',{correct:'3000 m'}),'accept equivalent unit answer');
   check(!openOkMeasure('3000 m','2999 m',{correct:'3000 m'}),'reject wrong converted value');
   processPracticeAnswer(true,curEx.correct);nextExercise();check(curEx,'autonomous next exercise');
   selectLevel(2);selectMode('open');startPractice();
   let previous=null,rotation=[];
   for(let i=0;i<25;i++){
    const q=curEx,key=q.metricFamily||q.reasoningFamily||q.familyId;
    check(key!==previous,'no repeated real family in error rotation');
    previous=key;rotation.push(key);processPracticeAnswer(false,'999999');nextExercise();
   }
   check(new Set(rotation).size>=2,'rotation covers distinct families');
   miTopicExam.start('metric');const topicExam=miTopicExam.getSession();
   check(topicExam.questions.length===12,'topic exam has 12 questions');
   for(const q of topicExam.questions){const level=D.getDifficulty(topic,q);check([1,2,3].includes(level),'topic exam item classified');}
   miExamSelectedTopics=['metric'];miStartConfiguredExam();
   check(ST.examQs.length===20,'global exam has 20 questions');
   check(ST.examQs.every(q=>[1,2,3].includes(D.getDifficulty(TOPICS.find(t=>t.id===q.topicId)||topic,q))),'global exam items classified');
   const link=miTheoryLinkHtml('metric','Teoria completa del bloc');
   check(link.includes('sistema-metric-decimal-1r-eso.html'),'metric theory link');
   const neighbours=['conversions','temps','perimetres','arees','problemes'],neighborCount={};
   for(const id of neighbours){const t=TOPICS.find(x=>x.id===id);let n=0;for(let i=0;i<20;i++){const q=t.gen(),level=D.getDifficulty(t,q);check([1,2,3].includes(level),'neighbor classifier '+id);n++;}neighborCount[id]=n;}
   const widths={inner:document.documentElement.scrollWidth,viewport:innerWidth};
   check(widths.inner<=widths.viewport+2,'no horizontal overflow on desktop');
   return {families:specs.map(f=>({id:f.id,level:f.level})),coverage:coverage.types,rotation,topicExam:topicExam.questions.length,globalExam:ST.examQs.length,neighborCount,widths};
  });
  assert.equal(pageErrors.length,0,'JavaScript page errors: '+pageErrors.join(' | '));
  const theoryPath=pathToFileURL(resolve('1eso/teoria/mesura/sistema-metric-decimal-1r-eso.html')).href;
  await page.setViewportSize({width:390,height:844});
  await page.goto(theoryPath+'#massa');
  const direct=await page.evaluate(()=>({hash:location.hash,target:!!document.getElementById(location.hash.slice(1)),width:document.documentElement.scrollWidth,viewport:innerWidth}));
  assert.equal(direct.hash,'#massa');assert(direct.target,'direct theory anchor target');assert(direct.width<=direct.viewport+2,'theory fits mobile width');
  const changed=await page.evaluate(()=>new Promise(resolve=>{let hit=false;const done=()=>{hit=true;removeEventListener('hashchange',done);};addEventListener('hashchange',done);location.hash='longitud';setTimeout(()=>resolve({hit,hash:location.hash,target:!!document.getElementById('longitud')}),50);}));
  assert(changed.hit&&changed.hash==='#longitud'&&changed.target,'theory hashchange navigation');
  assert.equal(pageErrors.length,0,'JavaScript page errors after theory navigation: '+pageErrors.join(' | '));
  console.log(JSON.stringify({browser:browserEngine,...report,theory:{directAnchor:direct.hash,hashchange:changed.hash,mobileWidth:direct.viewport}},null,2));
 }finally{await browser.close();}
}
main().catch(e=>{console.error(e.stack||e);process.exitCode=1;});
