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
   const check=(x,m)=>{if(!x)throw Error(m);},D=miTaskDifficulty,M=MIFirstMeasureTasks,topic=TOPICS.find(t=>t.id==='mesurament');
   check(topic&&D&&M,'measurement topic and dependencies loaded');
   const specs=M.measurementFamilySpecs,coverage=D.coverage(topic);
   check(specs.length===15,'15 reviewed measurement procedures');
   check(coverage.families.length===15&&coverage.types.join(',')==='6,8,1','family-level coverage 6/8/1');
   check(D.examPlan(topic).slots.reduce((a,b)=>a+b,0)===12,'topic exam has twelve slots');
   const trace=[],seen=new Set();let rawSamples=0;
   for(let i=0;i<320;i++){const q=topic.gen(),key=q.measurementFamily||q.familyId||q.reasoningFamily,level=D.getDifficulty(topic,q);
    check(key,'stable family metadata');check(specs.some(f=>f.id===key),'known mathematical family '+key);
    check(level===q.diff||level===q.taskDifficulty,'shared classifier '+key);
    check(q.options&&q.options.length===4&&new Set(q.options).size===4&&q.options.includes(q.correct),'four unique answers '+key);
    if(trace.length)check(trace[trace.length-1]!==key,'no consecutive repeat of a mathematical measurement family');
    trace.push(key);seen.add(key);rawSamples++;
   }
   check(specs.every(f=>seen.has(f.id)),'practice reaches all 15 families');
   check(NEEDED_LVL1===8&&NEEDED_LVL2===15,'existing progression unchanged');
   const contexts={},ids=['M01','M02','M03','M04','M05','S01','S02','S03','S04','T05'];
   const familyByBank={M01:'seleccionar-instrument',M02:'seleccionar-unitat-mesura',M03:'error-absolut',M04:'error-relatiu-percentual',M05:'error-relatiu-percentual',S01:'escala-proporcional',S02:'escala-proporcional',S03:'escala-proporcional',S04:'escala-proporcional',T05:'angle-gir-rellotge'};
   const getValue=q=>Number(String(q.correct).match(/-?\d+(?:,\d+)?/)?.[0].replace(',','.'));
   const checkPattern=q=>{
    const id=String(q.type),family=familyByBank[id],f=M.measurementFamilyInfo(family);
    check(f&&q.primaryTopic==='mesurament',id+' is a measurement problem');
    check(M.measurementFamilyFor(id).id===family,id+' maps to family');
    check(D.getDifficulty(topic,{...q,measurementFamily:family,familyId:family,difficultyBank:'measureProblems',difficultyKey:id})===f.level,id+' uses reviewed N'+f.level);
    check(q.options.length===4&&new Set(q.options).size===4&&q.options.includes(q.correct),id+' has four distinct options including correct answer');
    check(q.answerCheck(q.correct),id+' corrector accepts canonical answer');
    const n=(q.question.match(/\d+(?:,\d+)?/g)||[]).map(x=>Number(x.replace(',','.')));let oracle;
    if(id==='M01')check(['Cinta mètrica','Peu de rei','Balança','Termòmetre','Proveta graduada','Transportador','Cronòmetre'].includes(q.correct),'M01 instrument');
    if(id==='M02')check(!/classe|anunci|segon|minut|hora|dia/i.test(q.question),'M02 is not a time-unit exercise');
    if(id==='M03')oracle=Math.abs(n[1]-n[0]);
    if(id==='M04')oracle=Math.round(Math.abs(n[1]-n[0])/n[0]*100);
    if(id==='M05'){const m=q.question.match(/A té valor de referència (\d+) cm i error absolut ([\d,]+) cm\. La mesura B té valor de referència (\d+) cm i error absolut ([\d,]+) cm/);check(m,'M05 values parse');const pa=Number(m[2].replace(',','.'))/Number(m[1])*100,pb=Number(m[4].replace(',','.'))/Number(m[3])*100;check(q.correct===(pa<pb?'la mesura A':pb<pa?'la mesura B':'les dues mesures'),'M05 relative precision oracle');}
    if(id==='S01'){const m=q.question.match(/1 cm representa (\d+) m reals?\. Una paret hi mesura (\d+) cm/);check(m,'S01 scale parses');oracle=Number(m[1])*Number(m[2]);}
    if(id==='S02'){const m=q.question.match(/1 cm representa (\d+) m reals\. Una sala fa (\d+) m/);check(m,'S02 scale parses');oracle=Number(m[2])/Number(m[1]);}
    if(id==='S03'){const m=q.question.match(/escala 1:([\d.]+).*separades (\d+) cm/);check(m,'S03 scale parses');oracle=Number(m[1].replace(/\./g,''))*Number(m[2])/100000;}
    if(id==='S04'){const m=q.question.match(/1 cm representa (\d+) m\. Una habitació hi fa (\d+) cm per (\d+) cm/);check(m,'S04 scale parses');oracle=Number(m[1])**2*Number(m[2])*Number(m[3]);}
    if(id==='T05'){const m=q.question.match(/avança (\d+) minuts/);check(m,'T05 angle parses');oracle=Number(m[1])*6;}
    if(oracle!==undefined)check(Math.abs(getValue(q)-oracle)<1e-8,id+' independent oracle expected '+oracle+' got '+getValue(q));
    contexts[id]=(contexts[id]||0)+1;
   };
   const index=TOPICS.indexOf(topic);selectTopic(index);selectLevel(1);selectMode('multi');startPractice();
   check(curEx&&document.getElementById('guideSteps').style.display==='block','guided practice starts');
   processPracticeAnswer(true,curEx.correct);nextExercise();check(curEx,'guided next item');
   selectLevel(2);selectMode('open');startPractice();
   check(curEx&&document.getElementById('openWrap').style.display==='block','autonomous practice starts');
   check(document.getElementById('guideSteps').style.display==='none','autonomous mode hides hints');
   processPracticeAnswer(true,curEx.correct);nextExercise();check(curEx,'autonomous next item');
   let previous=null;const errorRotation=[];
   selectLevel(2);selectMode('open');startPractice();
   for(let i=0;i<30;i++){const q=curEx,key=q.measurementFamily||q.familyId||q.reasoningFamily;check(key!==previous,'wrong-answer rotation changes family');previous=key;errorRotation.push(key);processPracticeAnswer(false,'987654321');nextExercise();}
   check(new Set(errorRotation).size>=7,'wrong-answer loop preserves family variety');
   for(const make of MEASURE_PROBLEM_PATTERNS)for(let i=0;i<250;i++){const q=make();if(ids.includes(String(q.type)))checkPattern(q);}
   for(const id of ids)check(contexts[id]===250,id+' 250 validated contextual items');
   const topicIndex=TOPICS.indexOf(topic);check(topicIndex>=0,'measurement topic in catalogue');
   miTopicExam.start('mesurament');const exam=miTopicExam.getSession();check(exam.questions.length===12,'topic exam has 12 questions');
   for(const q of exam.questions)check([1,2,3].includes(D.getDifficulty(topic,q)),'topic exam question family level');
   miExamSelectedTopics=['mesurament'];miStartConfiguredExam();check(ST.examQs.length===20,'global exam has 20 questions');
   check(ST.examQs.every(q=>[1,2,3].includes(D.getDifficulty(TOPICS.find(t=>t.id===q.topicId)||topic,q))),'global exam difficulty classification');
   const regressions={metric:0,conversions:0,temps:0,perimetres:0,arees:0};
   for(const id of Object.keys(regressions)){const t=TOPICS.find(x=>x.id===id);check(t,id+' regression topic');for(let i=0;i<30;i++){const q=t.gen();check([1,2,3].includes(D.getDifficulty(t,q)),id+' regression classification');regressions[id]++;}}
   check(NEEDED_LVL1===8&&NEEDED_LVL2===15,'session progression values remain unchanged');
   const theoryLink=miTheoryLinkHtml('mesurament','Teoria');check(theoryLink.includes('mesurament-precisio-1r-eso.html'),'measurement theory link');const desktop={width:document.documentElement.scrollWidth,viewport:innerWidth};check(desktop.width<=desktop.viewport+2,'measurement practice desktop layout');
   return {theoryLink:theoryLink.includes('mesurament-precisio-1r-eso.html'),families:specs.map(f=>({id:f.id,level:f.level,generators:f.generators,bankVariants:f.bankVariants})),coverage:coverage.types,practice:{samples:rawSamples,distinctFamilies:seen.size,noConsecutiveRepeats:true},contextPatterns:contexts,errorRotation:{samples:errorRotation.length,distinctFamilies:new Set(errorRotation).size},topicExam:exam.questions.length,globalExam:ST.examQs.length,regressions,desktop};
  });
  assert.equal(pageErrors.length,0,'practice JS errors: '+pageErrors.join(' | '));
  await page.setViewportSize({width:390,height:844});
  const practiceMobile=await page.evaluate(()=>({width:document.documentElement.scrollWidth,viewport:innerWidth}));
  assert(practiceMobile.width<=practiceMobile.viewport+2,'practice page fits 390px');
  const theory=pathToFileURL(resolve('1eso/teoria/mesura/mesurament-precisio-1r-eso.html')).href;
  await page.goto(theory+'#instrument');
  const direct=await page.evaluate(()=>({hash:location.hash,target:!!document.getElementById(location.hash.slice(1)),width:document.documentElement.scrollWidth,viewport:innerWidth}));
  assert.equal(direct.hash,'#instrument');assert(direct.target,'direct theory anchor');assert(direct.width<=direct.viewport+2,'theory fits mobile viewport');
  const changed=await page.evaluate(()=>new Promise(resolve=>{let hit=false;const done=()=>{hit=true;removeEventListener('hashchange',done);};addEventListener('hashchange',done);location.hash='error-relatiu';setTimeout(()=>resolve({hit,hash:location.hash,target:!!document.getElementById('error-relatiu')}),70);}));
  assert(changed.hit&&changed.hash==='#error-relatiu'&&changed.target,'theory hashchange');
  assert.equal(pageErrors.length,0,'JavaScript errors after theory navigation: '+pageErrors.join(' | '));
  console.log(JSON.stringify({browser:browserEngine,...report,mobile:{practice:practiceMobile,theory:{directAnchor:direct.hash,hashchange:changed.hash,width:direct.viewport}}},null,2));
 }finally{await browser.close();}
}
main().catch(e=>{console.error(e.stack||e);process.exitCode=1;});
