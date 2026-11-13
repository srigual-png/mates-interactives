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
if(!chromium)throw Error('Playwright is unavailable in the local runtime.');
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
   const check=(x,m)=>{if(!x)throw Error(m);},D=miTaskDifficulty,M=MIFirstMeasureTasks,topic=TOPICS.find(t=>t.id==='arees');
   check(topic&&D&&M,'area topic and dependencies loaded');
   const specs=M.areaFamilySpecs,coverage=D.coverage(topic);
   check(specs.length===15,'15 reviewed area procedures');
   check(coverage.families.length===15&&coverage.types.join(',')==='3,11,1','family-level coverage');
   check(D.examPlan(topic).slots.reduce((a,b)=>a+b,0)===12,'topic exam has twelve slots');
   const trace=[],seen=new Set();let grid=0;
   for(let i=0;i<260;i++){const q=topic.gen(),key=q.areaFamily||q.familyId||q.reasoningFamily,level=D.getDifficulty(topic,q);
    check(key,'stable family metadata');check(level===q.diff||level===q.taskDifficulty,'shared classifier '+key);
    if(trace.length)check(trace[trace.length-1]!==key,'no consecutive repeat of a mathematical area family');
    if(key==='comptar-quadrats-unitat')grid++;
    trace.push(key);seen.add(key);
   }
   check(specs.every(f=>seen.has(f.id)),'practice reaches all families');
   check(grid>0,'grid counting appears in practice');
   check(NEEDED_LVL1===8&&NEEDED_LVL2===15,'existing practice progression unchanged');
   const bank={},contextCounts={},ids=['A01','A02','A03','A04','A05','A06','A07'];
   const family={A01:'cobrir-superficie',A02:'cobrir-superficie',A03:'compondre-arees-figures',A04:'reconstruir-dimensio-rectangle-area',A05:'cost-per-superficie',A06:'compondre-arees-figures',A07:'comparar-arees'};
   const value=q=>Number(String(q.correct).match(/-?\d+(?:,\d+)?/)[0].replace(',','.'));
   const verifyContext=q=>{
    const id=String(q.type);check(q.primaryTopic==='arees',id+' is assigned to Areas');
    check(q.areaFamily===family[id]&&q.familyId===family[id],id+' family association');
    check(D.getDifficulty(topic,q)===2,id+' is N2');check(q.difficulty==='medium',id+' displayed difficulty matches N2');
    check(q.options.length===4&&new Set(q.options).size===4&&q.options.includes(q.correct),id+' options are unique and include the right answer');
    check(q.answerCheck(q.correct),id+' corrector accepts canonical answer');
    const n=q.question.match(/\d+(?:,\d+)?/g).map(x=>Number(x.replace(',','.')));let oracle;
    switch(id){
     case 'A01':{const [L,W,tile]=n,room=L*W,tileArea=(tile/100)**2;oracle=Math.ceil(room/tileArea);check(q.question.includes('retalls'),id+' explicit cutting assumption');break;}
     case 'A02':{const [wallW,wallH,doorW,doorH,winW,winH,cover]=n,paint=wallW*wallH-doorW*doorH-winW*winH;oracle=Math.ceil(paint/cover);break;}
     case 'A03':oracle=n[0]*n[1]-n[2]*n[3];break;
     case 'A04':oracle=n[0]/n[1];check(Number.isInteger(oracle),id+' unique integer dimension');break;
     case 'A05':oracle=n[0]*n[1]/2*n[2];break;
     case 'A06':oracle=n[0]*n[1]-n[2]*n[3];break;
     case 'A07':{const [a,b]=n,side=(a+b)/2;oracle=Math.abs(side*side-a*b);break;}
    }
    check(Math.abs(value(q)-oracle)<1e-8,id+' oracle expected '+oracle+' got '+value(q));
    contextCounts[id]=(contextCounts[id]||0)+1;bank[id]=q;
   };
   for(const make of MEASURE_PROBLEM_PATTERNS)for(let i=0;i<250;i++){const q=make();if(ids.includes(String(q.type)))verifyContext(q);}
   for(const id of ids){check(contextCounts[id]===250,id+' has 250 independently checked samples');}
   const patterns={...contextCounts};
   const index=TOPICS.indexOf(topic);
   selectTopic(index);selectLevel(1);selectMode('multi');startPractice();
   check(curEx&&document.getElementById('guideSteps').style.display==='block','guided practice shows hints');
   check(D.getDifficulty(topic,curEx)===curEx.diff||D.getDifficulty(topic,curEx)===curEx.taskDifficulty,'guided exercise classified');
   processPracticeAnswer(true,curEx.correct);nextExercise();check(curEx,'guided next item');
   selectLevel(2);selectMode('open');startPractice();
   check(curEx&&document.getElementById('openWrap').style.display==='block','autonomous mode has answer input');
   check(document.getElementById('guideSteps').style.display==='none','autonomous mode hides hints');
   processPracticeAnswer(true,curEx.correct);nextExercise();check(curEx,'autonomous next item');
   selectLevel(2);selectMode('open');startPractice();let prev=null;const errorRotation=[];
   for(let i=0;i<30;i++){const q=curEx,key=q.areaFamily||q.familyId||q.reasoningFamily;check(key!==prev,'wrong-answer rotation changes family');prev=key;errorRotation.push(key);processPracticeAnswer(false,'987654321');nextExercise();}
   check(new Set(errorRotation).size>=8,'wrong-answer loop preserves family variety');
   miTopicExam.start('arees');const exam=miTopicExam.getSession();check(exam.questions.length===12,'topic exam has twelve questions');
   for(const q of exam.questions)check([1,2,3].includes(D.getDifficulty(topic,q)),'topic exam family level');
   miExamSelectedTopics=['arees'];miStartConfiguredExam();check(ST.examQs.length===20,'global exam has twenty questions');
   check(ST.examQs.every(q=>[1,2,3].includes(D.getDifficulty(TOPICS.find(t=>t.id===q.topicId)||topic,q))),'global exam levels');
   const regressions={metric:0,conversions:0,temps:0,perimetres:0};
   for(const id of Object.keys(regressions)){const t=TOPICS.find(x=>x.id===id);check(t,id+' regression topic');for(let i=0;i<30;i++){const q=t.gen();check([1,2,3].includes(D.getDifficulty(t,q)),id+' regression classification');regressions[id]++;}}
   const theoryLink=miTheoryLinkHtml('arees','Teoria');check(theoryLink.includes('arees-1r-eso.html'),'area theory link');
   const desktop={width:document.documentElement.scrollWidth,viewport:innerWidth};check(desktop.width<=desktop.viewport+2,'practice desktop layout');
   return {families:specs.map(f=>({id:f.id,level:f.level,generators:f.generators,bankVariants:f.bankVariants})),coverage:coverage.types,practice:{samples:trace.length,distinctFamilies:seen.size,noConsecutiveRepeats:true,gridSamples:grid},contextPatterns:patterns,errorRotation:{samples:errorRotation.length,distinctFamilies:new Set(errorRotation).size},topicExam:exam.questions.length,globalExam:ST.examQs.length,regressions,desktop};
  });
  assert.equal(pageErrors.length,0,'practice JS errors: '+pageErrors.join(' | '));
  await page.setViewportSize({width:390,height:844});const practiceMobile=await page.evaluate(()=>({width:document.documentElement.scrollWidth,viewport:innerWidth}));assert(practiceMobile.width<=practiceMobile.viewport+2,'practice page fits 390px');
  const theory=pathToFileURL(resolve('1eso/teoria/mesura/arees-1r-eso.html')).href;
  await page.goto(theory+'#rectangle');
  const direct=await page.evaluate(()=>({hash:location.hash,target:!!document.getElementById(location.hash.slice(1)),width:document.documentElement.scrollWidth,viewport:innerWidth}));
  assert.equal(direct.hash,'#rectangle');assert(direct.target,'direct theory anchor');assert(direct.width<=direct.viewport+2,'theory fits mobile viewport');
  const changed=await page.evaluate(()=>new Promise(resolve=>{let hit=false;const done=()=>{hit=true;removeEventListener('hashchange',done);};addEventListener('hashchange',done);location.hash='compostes';setTimeout(()=>resolve({hit,hash:location.hash,target:!!document.getElementById('compostes')}),70);}));
  assert(changed.hit&&changed.hash==='#compostes'&&changed.target,'theory hashchange');
  assert.equal(pageErrors.length,0,'JavaScript errors after theory navigation: '+pageErrors.join(' | '));
  console.log(JSON.stringify({browser:browserEngine,...report,mobile:{practice:practiceMobile,theory:{directAnchor:direct.hash,hashchange:changed.hash,width:direct.viewport}}},null,2));
 }finally{await browser.close();}
}
main().catch(e=>{console.error(e.stack||e);process.exitCode=1;});