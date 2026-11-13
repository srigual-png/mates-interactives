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
if(!chromium)throw Error('Playwright is unavailable. Install or activate it in the local runtime.');
async function launch(){
 const errors=[];
 for(const [name,path] of [
  ['Edge','C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'],
  ['Edge','C:/Program Files/Microsoft/Edge/Application/msedge.exe'],
  ['Chrome','C:/Program Files/Google/Chrome/Application/chrome.exe'],
  ['Chrome','C:/Program Files (x86)/Google/Chrome/Application/chrome.exe']
 ])if(fs.existsSync(path)){try{return {browser:await chromium.launch({executablePath:path}),browserEngine:name};}catch(e){errors.push(name+' '+path+': '+e.message);}}
 try{return {browser:await chromium.launch(),browserEngine:'Chromium bundled'};}catch(e){errors.push('bundled Chromium: '+e.message);}
 throw Error('Could not start Edge/Chrome/Chromium. '+errors.join(' | '));
}
async function main(){
 const {browser,browserEngine}=await launch();
 try{
  const page=await browser.newPage({viewport:{width:1100,height:900}}),pageErrors=[];
  page.on('pageerror',e=>pageErrors.push(e.message));await page.route(/^https?:/,route=>route.abort());
  await page.goto(pathToFileURL(resolve('1eso/sentit-mesura.html')).href);
  const report=await page.evaluate(()=>{
   const check=(v,m)=>{if(!v)throw Error(m);},D=miTaskDifficulty,M=MIFirstMeasureTasks,topic=TOPICS.find(t=>t.id==='perimetres');
   check(topic&&D&&M,'perimeter topic and dependencies loaded');
   const specs=M.perimeterFamilySpecs,coverage=D.coverage(topic);
   check(specs.length===13,'13 reviewed perimeter procedures');
   check(coverage.families.length===13&&coverage.types.join(',')==='1,11,1','coverage counts genuine families by level');
   check(D.examPlan(topic).slots.reduce((a,b)=>a+b,0)===12,'topic exam plans twelve items');
   check(D.examPlan(topic).types.join(',')==='1,11,1','exam plan reflects family levels');
   const ids=new Set(),trace=[];let direct=0,variants=0;
   for(let i=0;i<220;i++){
    const q=topic.gen(),key=q.perimeterFamily||q.familyId||q.reasoningFamily;
    check(key,'perimeter family metadata');check(D.getDifficulty(topic,q)===q.diff||D.getDifficulty(topic,q)===q.taskDifficulty,'shared level '+key);
    if(trace.length)check(trace[trace.length-1]!==key,'consecutive practice items must rotate mathematical family');
    if(key==='perimetre-directe')direct++;
    ids.add(key);trace.push(key);
   }
   check(specs.every(f=>ids.has(f.id)),'all families reached in 220 generated questions');
   check(direct>0,'raw direct perimeter variants are selected in practice');
   check(NEEDED_LVL1===8&&NEEDED_LVL2===15,'existing practice progression unchanged');
   const contextual={},idsWanted=['P01','P02','P03','P04','P05'];
   for(const make of MEASURE_PROBLEM_PATTERNS){
    for(let sample=0;sample<50;sample++){const q=make();if(idsWanted.includes(String(q.type)))contextual[q.type]=q;}
   }
   const familyByPattern={P01:'perimetre-amb-obertura',P02:'cost-material-per-contorn',P03:'circumferencia-directa',P04:'voltes-circumferencia',P05:'reconstruir-costat-des-del-perimetre'};
   for(const id of idsWanted){
    const q=contextual[id];check(q&&q.primaryTopic==='perimetres',id+' remains assigned to Perimeters');
    check(q.perimeterFamily===familyByPattern[id]&&q.familyId===familyByPattern[id],id+' contextual family metadata');
    check(D.getDifficulty(topic,q)===2,id+' contextual level');
    check(q.options.length===4&&new Set(q.options).size===4,id+' unique answer options');
    check(q.answerCheck(q.correct),id+' accepts canonical answer');
   }
   const idx=TOPICS.indexOf(topic);
   selectTopic(idx);selectLevel(1);selectMode('multi');startPractice();
   check(curEx&&document.getElementById('guideSteps').style.display==='block','guided practice displays steps');
   check(D.getDifficulty(topic,curEx)===curEx.diff||D.getDifficulty(topic,curEx)===curEx.taskDifficulty,'guided exercise has classified level');
   processPracticeAnswer(true,curEx.correct);nextExercise();check(curEx,'guided next exercise');
   selectLevel(2);selectMode('open');startPractice();
   check(curEx&&document.getElementById('openWrap').style.display==='block','autonomous practice displays answer input');
   check(document.getElementById('guideSteps').style.display==='none','autonomous practice hides guide');
   processPracticeAnswer(true,curEx.correct);nextExercise();check(curEx,'autonomous next exercise');
   selectLevel(2);selectMode('open');startPractice();
   let prev=null;const wrongFamilies=[];
   for(let i=0;i<30;i++){const q=curEx,key=q.perimeterFamily||q.familyId||q.reasoningFamily;check(key!==prev,'wrong-answer rotation changes family');prev=key;wrongFamilies.push(key);processPracticeAnswer(false,'987654321');nextExercise();}
   check(new Set(wrongFamilies).size>=8,'wrong-answer path retains broad family variety');
   miTopicExam.start('perimetres');const exam=miTopicExam.getSession();check(exam.questions.length===12,'Perimeters topic exam has 12 questions');
   for(const q of exam.questions)check([1,2,3].includes(D.getDifficulty(topic,q)),'topic exam question is classified');
   miExamSelectedTopics=['perimetres'];miStartConfiguredExam();check(ST.examQs.length===20,'global exam has 20 questions');
   check(ST.examQs.every(q=>[1,2,3].includes(D.getDifficulty(TOPICS.find(t=>t.id===q.topicId)||topic,q))),'global exam questions are classified');
   const regressions={metric:0,conversions:0,temps:0};
   for(const id of Object.keys(regressions)){const t=TOPICS.find(x=>x.id===id);check(t,id+' regression topic exists');for(let i=0;i<30;i++){const q=t.gen();check([1,2,3].includes(D.getDifficulty(t,q)),id+' regression level');regressions[id]++;}}
   const widths={inner:document.documentElement.scrollWidth,viewport:innerWidth};check(widths.inner<=widths.viewport+2,'practice page has no horizontal overflow');
   check(miTheoryLinkHtml('perimetres','Teoria').includes('perimetres-1r-eso.html'),'perimeters theory link remains intact');
   return {families:specs.map(f=>({id:f.id,level:f.level,generators:f.generators})),coverage:coverage.types,practice:{samples:trace.length,distinctFamilies:ids.size,noConsecutiveRepeats:true,directSamples:direct},wrongAnswerRotation:{samples:wrongFamilies.length,distinctFamilies:new Set(wrongFamilies).size},contextual:Object.keys(contextual),topicExam:exam.questions.length,globalExam:ST.examQs.length,regressions,widths};
  });
  assert.equal(pageErrors.length,0,'practice page JavaScript errors: '+pageErrors.join(' | '));
  await page.setViewportSize({width:390,height:844});const practiceMobile=await page.evaluate(()=>({width:document.documentElement.scrollWidth,viewport:innerWidth}));assert(practiceMobile.width<=practiceMobile.viewport+2,'practice page fits 390px viewport');
  const theory=pathToFileURL(resolve('1eso/teoria/mesura/perimetres-1r-eso.html')).href;
  await page.setViewportSize({width:390,height:844});await page.goto(theory+'#poligons');
  const direct=await page.evaluate(()=>({hash:location.hash,target:!!document.getElementById(location.hash.slice(1)),width:document.documentElement.scrollWidth,viewport:innerWidth}));
  assert.equal(direct.hash,'#poligons');assert(direct.target,'direct theory anchor');assert(direct.width<=direct.viewport+2,'theory page fits 390px viewport');
  const changed=await page.evaluate(()=>new Promise(resolve=>{let hit=false;const done=()=>{hit=true;removeEventListener('hashchange',done);};addEventListener('hashchange',done);location.hash='compostes';setTimeout(()=>resolve({hit,hash:location.hash,target:!!document.getElementById('compostes')}),60);}));
  assert(changed.hit&&changed.hash==='#compostes'&&changed.target,'theory hashchange navigation');
  assert.equal(pageErrors.length,0,'JavaScript errors after theory navigation: '+pageErrors.join(' | '));
  console.log(JSON.stringify({browser:browserEngine,...report,mobile:{practice:practiceMobile,theory:{directAnchor:direct.hash,hashchange:changed.hash,width:direct.viewport}}},null,2));
 }finally{await browser.close();}
}
main().catch(e=>{console.error(e.stack||e);process.exitCode=1;});
