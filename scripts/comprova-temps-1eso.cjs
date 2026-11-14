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
   const check=(v,m)=>{if(!v)throw Error(m);},D=miTaskDifficulty,M=MIFirstMeasureTasks,topic=TOPICS.find(t=>t.id==='temps');
   check(topic&&D&&M,'time topic/dependencies loaded');
   const specs=M.timeFamilySpecs,coverage=D.coverage(topic);
   check(specs.length===10,'ten genuine time families');
   check(coverage.families.length===10&&coverage.types.join(',')==='2,7,1','coverage counts families');
   check(D.examPlan(topic).types.join(',')==='2,7,1','exam levels follow family catalog');
   const ids=new Set(),trace=[];let overnight=0;
   for(let i=0;i<160;i++){
    const q=topic.gen(),key=q.timeFamily||q.familyId||q.reasoningFamily;
    check(key,'time family metadata');check(D.getDifficulty(topic,q)===q.diff||D.getDifficulty(topic,q)===q.taskDifficulty,'shared level '+key);
    if(trace.length)check(trace[trace.length-1]!==key,'no consecutive repeat of a real time family');
    if(q.question.includes('endemà'))overnight++;
    ids.add(key);trace.push(key);
   }
   const absentFamilies=specs.filter(f=>!ids.has(f.id)).map(f=>f.id);
   check(absentFamilies.length===0,'all families reached; absent='+JSON.stringify(absentFamilies)+'; observed='+JSON.stringify(Object.fromEntries([...ids].map(id=>[id,trace.filter(x=>x===id).length]))));
   check(overnight>0,'practice includes explicit overnight variants');
   check(NEEDED_LVL1===8&&NEEDED_LVL2===15,'existing practice progression unchanged');
   const tPatterns={};
   for(const make of MEASURE_PROBLEM_PATTERNS){const q=make();if(/^T0[1-5]$/.test(q.type))tPatterns[q.type]=q;}
   for(const id of ['T01','T02','T03','T04']){check(tPatterns[id]&&tPatterns[id].primaryTopic==='temps',id+' belongs to time topic');check(D.getDifficulty(topic,tPatterns[id])===2,id+' level');check(tPatterns[id].options.length===4&&new Set(tPatterns[id].options).size===4,id+' unique options');check(tPatterns[id].answerCheck(tPatterns[id].correct),id+' accepts canonical answer');}
   check(tPatterns.T04.question.includes('endemà'),'bank overnight statement explicit');
   check(tPatterns.T05&&tPatterns.T05.primaryTopic==='mesurament','minute-hand angle remains in measurement topic');
   const transit=MEASURE_PROBLEM_PATTERNS.map(fn=>fn()).find(q=>q.reasoningFamily==='transbordament-invers');
   check(transit&&transit.timeFamily==='transbordament-invers'&&transit.primaryTopic==='temps','transit reasoning bank route');
   check(D.getDifficulty(topic,transit)===3,'transit N3 classification');
   const idx=TOPICS.indexOf(topic);
   selectTopic(idx);selectLevel(1);selectMode('multi');startPractice();
   check(curEx&&document.getElementById('guideSteps').style.display==='block','guided practice');
   check(D.getDifficulty(topic,curEx)===curEx.diff||D.getDifficulty(topic,curEx)===curEx.taskDifficulty,'guided classifier');
   processPracticeAnswer(true,curEx.correct);nextExercise();check(curEx,'guided next question');
   selectLevel(2);selectMode('open');startPractice();
   check(curEx&&document.getElementById('openWrap').style.display==='block','autonomous practice');
   check(document.getElementById('guideSteps').style.display==='none','autonomous mode hides guides');
   processPracticeAnswer(true,curEx.correct);nextExercise();check(curEx,'autonomous next question');
   selectLevel(2);selectMode('open');startPractice();
   let prev=null,errorRotation=[];
   for(let i=0;i<25;i++){const q=curEx,key=q.timeFamily||q.familyId||q.reasoningFamily;check(key!==prev,'error rotation changes real family');prev=key;errorRotation.push(key);processPracticeAnswer(false,'999999');nextExercise();}
   check(new Set(errorRotation).size>1,'wrong-answer recovery reaches multiple families');
   miTopicExam.start('temps');const topicExam=miTopicExam.getSession();check(topicExam.questions.length===12,'time topic exam size');
   for(const q of topicExam.questions)check([1,2,3].includes(D.getDifficulty(topic,q)),'topic exam classification');
   miExamSelectedTopics=['temps'];miStartConfiguredExam();check(ST.examQs.length===20,'global exam size');
   check(ST.examQs.every(q=>[1,2,3].includes(D.getDifficulty(TOPICS.find(t=>t.id===q.topicId)||topic,q))),'global exam classification');
   let regressions={metric:0,conversions:0};
   for(const id of Object.keys(regressions)){const t=TOPICS.find(x=>x.id===id);for(let i=0;i<30;i++){const q=t.gen();check([1,2,3].includes(D.getDifficulty(t,q)),id+' regression classification');regressions[id]++;}}
   const widths={inner:document.documentElement.scrollWidth,viewport:innerWidth};check(widths.inner<=widths.viewport+2,'no horizontal overflow desktop');
   check(miTheoryLinkHtml('temps','Teoria').includes('mesura-temps-1r-eso.html'),'time theory link');
   return {families:specs.map(f=>({id:f.id,level:f.level})),coverage:coverage.types,rotation:{samples:trace.length,distinctFamilies:ids.size,noConsecutiveRepeats:true},overnight,wrongRotation:{samples:errorRotation.length,distinctFamilies:new Set(errorRotation).size},patterns:Object.keys(tPatterns),transit:transit.reasoningFamily,topicExam:topicExam.questions.length,globalExam:ST.examQs.length,regressions,widths};
  });
  assert.equal(pageErrors.length,0,'page JS errors: '+pageErrors.join(' | '));
  const theory=pathToFileURL(resolve('1eso/teoria/mesura/mesura-temps-1r-eso.html')).href;
  await page.setViewportSize({width:390,height:844});await page.goto(theory+'#equivalencies');
  const direct=await page.evaluate(()=>({hash:location.hash,target:!!document.getElementById(location.hash.slice(1)),width:document.documentElement.scrollWidth,viewport:innerWidth}));
  assert.equal(direct.hash,'#equivalencies');assert(direct.target,'direct theory anchor');assert(direct.width<=direct.viewport+2,'theory mobile width');
  const changed=await page.evaluate(()=>new Promise(resolve=>{let hit=false;const done=()=>{hit=true;removeEventListener('hashchange',done);};addEventListener('hashchange',done);location.hash='hora-final';setTimeout(()=>resolve({hit,hash:location.hash,target:!!document.getElementById('hora-final')}),60);}));
  assert(changed.hit&&changed.hash==='#hora-final'&&changed.target,'hashchange theory navigation');
  assert.equal(pageErrors.length,0,'page errors after theory navigation: '+pageErrors.join(' | '));
  console.log(JSON.stringify({browser:browserEngine,...report,theory:{directAnchor:direct.hash,hashchange:changed.hash,mobileWidth:direct.viewport}},null,2));
 }finally{await browser.close();}
}
main().catch(e=>{console.error(e.stack||e);process.exitCode=1;});
