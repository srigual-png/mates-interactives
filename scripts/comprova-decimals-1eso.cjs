const assert=require('node:assert/strict');
const fs=require('node:fs');
const {resolve}=require('node:path');
const {pathToFileURL}=require('node:url');
const {chromium}=require('C:/Users/srigu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
async function main(){
 const browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});
 try{
  const page=await browser.newPage({viewport:{width:900,height:920}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));await page.route(/^https?:/,r=>r.abort());
  await page.goto(pathToFileURL(resolve('1eso/sentit-numeric.html')).href);
  const report=await page.evaluate(()=>{
   const check=(v,m)=>{if(!v)throw Error(m);},M=MIDecimals,el=id=>document.getElementById(id),topic=TOPICS.find(t=>t.id==='decimals');
   const accepts=(q,v)=>openOk1(q.correct,v,q),groups=M.families,links={};
   for(const group of groups)for(const [id] of group){const q=M.generate(id);links[id]=miTheoryLinkHtml('decimals',undefined,q.decimalsTheory).match(/href="([^"]+)/)[1];check(accepts(q,q.correct),'Canonical '+id);}
   function start(level,mode='open'){selTopic(TOPICS.indexOf(topic));selLv(level);selMode(mode);startP();return adaptivePracticeSessions.decimals;}
   const scenarios=[];
   for(const [level,answers] of [[1,Array(10).fill(true)],[1,[true,true,false,false,...Array(10).fill(true)]],[2,Array(20).fill(true)],[2,Array(20).fill(false)]]){
    const session=start(level);let correct=0,wrong=0;
    for(const ok of answers){
     if(correct===10&&level===1)break;
     check(!session.ended,'Premature end');const before=session.points;
     processPracticeAnswer(ok,ok?currentEx.correct:'999');ok?correct++:wrong++;
     check(session.points===Math.max(0,Math.min(NEEDED[level],before+(ok?1:-1))),'Points');
     if(level===1&&correct===10||level===2&&correct+wrong===20){nextEx();break;}nextEx();
    }
    check(session.ended&&el('sDecimalResult').classList.contains('active'),'Final screen');
    check(el('decimalResultScore').textContent===correct+'/'+(correct+wrong),'Actual score');
    if(correct===10&&wrong===2)check(el('practiceResultMetric').textContent.includes('83,3%'),'Real percentage');
    scenarios.push({level,correct,wrong});
   }
   for(const [mode,thresholds] of [[1,[3,6]],[2,[6,12]]]){state.level=mode;for(const [i,p] of thresholds.entries()){check(adaptiveLevel(p-1)===i+1&&adaptiveLevel(p)===i+2,'Threshold');}}
   const session=start(2),keys=new Set(),visited=new Set();let last;
   for(let i=0;i<20;i++){check(!keys.has(currentEx.practiceKey),'Repeated instance');keys.add(currentEx.practiceKey);check(currentEx.decimalsFamily!==last,'Repeated family');last=currentEx.decimalsFamily;visited.add(last);processPracticeAnswer(false,'999');nextEx();}
   check(visited.size===11,'Twenty errors N1 rotation');
   start(2);const s=adaptivePracticeSessions.decimals,original=topic.practiceGen;
   try{topic.practiceGen=(id,level,random)=>original(id,level,random||((min,max)=>min));for(let i=0;i<20;i++){processPracticeAnswer(false,'999');nextEx();}check(s.ended&&s.incorrect===20,'Deterministic reserves');}finally{topic.practiceGen=original;}
   start(2);adaptivePracticeSessions.decimals.questions={has:()=>true};showEx();check(adaptivePracticeSessions.decimals.ended&&el('decimalResultSubtitle').textContent.includes('cap altra pregunta'),'Exhaustion summary');
   start(1);processPracticeAnswer(true,currentEx.correct);leavePractice();check(el('decimalResultScore').textContent==='1/1','Voluntary finish');
   start(1);const history=adaptivePracticeSessions.decimals;history.points=3;nextAdaptivePractice(topic);const visitedN2=[...history.seen].filter(f=>groups[1].includes(f));history.points=0;nextAdaptivePractice(topic);history.points=3;nextAdaptivePractice(topic);check(visitedN2.every(f=>history.seen.has(f)),'Retained history');
   miTopicExam.start('decimals');const exam=miTopicExam.getSession();check(exam.questions.length===12,'Topic exam length');check([1,2,3].map(l=>exam.questions.filter(q=>miTaskDifficulty.getDifficulty(topic,q)===l).length).join()==='6,3,3','Exam quotas');
   check(exam.questions.every(q=>!/^D\d/.test(String(q.type))),'Legacy exam generators');
   check(exam.questions.every(q=>q.options.length===4&&new Set(q.options).size===4&&q.options.filter(v=>accepts(q,v)).length===1),'Legacy exam unique options');
   miExamSelectedTopics=['decimals'];miStartConfiguredExam();check(state.examQs.length===20,'Global exam');
   let bank;
   for(let i=0;i<20;i++){const p=genDecimalsProb();if(p.type===4){bank=p;break;}}
   check(bank&&bank.answer.check(bank.answer.val)&&!bank.answer.check(bank.answer.val+';999'),'Bank tuple');
   ampSession={probs:[bank],idx:0,results:[]};ampShowProb();check(el('ampFinalAns1'),'Bank separate fields');el('ampFinalAns').value=String(bank.answer.decimalsAnswer.fields[0].value);ampCheckAnswer();check(ampSession.results.length===0,'Bank incomplete ignored');el('ampFinalAns1').value=String(bank.answer.decimalsAnswer.fields[1].value);ampCheckAnswer();check(ampSession.results[0].ok,'Bank UI correct');
   const wrapped=wrapExamProblem(bank);check(wrapped.decimalsAnswer&&!M.matches(wrapped.decimalsAnswer,bank.answer.val+';999'),'Global exam validation');
   state.examQs=[wrapped];state.examIdx=0;state.examAnswers=[];state.examScore=0;showEQ();check(el('examOpenAns1'),'Exam separate fields');el('examOpenAns').value=String(wrapped.decimalsAnswer.fields[0].value);checkExamOpenAnswer();check(state.examAnswers.length===0,'Exam incomplete ignored');el('examOpenAns1').value=String(wrapped.decimalsAnswer.fields[1].value);checkExamOpenAnswer();check(state.examAnswers[0].ok,'Exam UI correct');
   for(let i=0;i<20;i++){const p=genDecimalsProb();check(p.answer.check(p.answer.val),'Bank canonical '+p.type);}
   const reasoningBank=AMP_CATS.find(t=>t.id==='decimals');let guarantee;
   for(let i=0;i<20;i++){const q=reasoningBank.gen();if(q.reasoningFamily==='volum-amb-error'){guarantee=q;break;}}
   check(guarantee?.decimalsTheory==='garanties-volum'&&guarantee.answer.decimalsAnswer,'Reasoning bank metadata');
   check(guarantee.answer.check(guarantee.answer.val)&&!guarantee.answer.check(guarantee.answer.val+'.5'),'Reasoning bank strict integer');
   const record=buildErrorRecord({...M.generate('D22'),topicId:'decimals'},'incorrect','practice');const restored=normalizeErrorEntry(record,'decimals');
   check(restored.decimalsTheory==='errors-decimals'&&restored.decimalsAnswer,'New error metadata');check(openOk1(restored.correct,restored.correct,restored),'Restored validator');check(!openOk1(restored.correct,restored.correct+';999',restored),'Restored strict validator');
   const legacy={id:'old-decimals',topicId:'decimals',type:2,question:'Pregunta antiga',correct:'5',answer:'4'};
   state.errors.decimals=[legacy];state.errors=normalizeErrorStore(state.errors);check(state.errors.decimals[0].question===legacy.question&&state.errors.decimals[0].correct==='5','Legacy error preserved');showErrorSummary();
   for(const id of ['naturals','decimal_sys','ops','potencies','jerarquia','divis','mcmmcd','enters']){selTopic(TOPICS.findIndex(t=>t.id===id));selLv(1);selMode('multi');startP();processPracticeAnswer(true,currentEx.correct);leavePractice();check(el('decimalResultScore').textContent==='1/1','Earlier topic '+id);}
   return {families:groups.map(g=>g.length),links,scenarios,exam:[12,20]};
  });
  const theory=fs.readFileSync('1eso/teoria/numeric/nombres-decimals-1r-eso.html','utf8');
  for(const link of Object.values(report.links))assert(theory.includes('id="'+link.split('#')[1]+'"'),link);
  const theoryPage=await browser.newPage();
  await theoryPage.route(/^https?:/,r=>r.abort());
  await theoryPage.goto(pathToFileURL(resolve('1eso/teoria/numeric/nombres-decimals-1r-eso.html')).href);
  await theoryPage.addStyleTag({content:'html { scroll-behavior: auto !important; }'});
  for(const [family,link] of Object.entries(report.links)){
    await theoryPage.locator('a[href="#'+link.split('#')[1]+'"]').first().click();
    assert.equal(new URL(theoryPage.url()).hash,'#'+link.split('#')[1]);
    const section=theoryPage.locator('section#'+link.split('#')[1]);
    assert.equal(await section.count(),1,family);assert((await section.innerText()).length>120,family+' procedure');
    assert((await section.locator('.example').first().innerText()).length>20,family+' worked example');
    await theoryPage.waitForFunction(anchor=>document.getElementById(anchor).getBoundingClientRect().top<innerHeight,link.split('#')[1]);
  }
  await theoryPage.close();
  async function show(id,mode='open'){
   await page.evaluate(({id,mode})=>{const topic=TOPICS.find(t=>t.id==='decimals'),gen=topic.practiceGen;selTopic(TOPICS.indexOf(topic));selLv(1);selMode(mode);startP();adaptivePracticeSessions.decimals.questions.clear();adaptivePracticeSessions.decimals.points=id==='D11'?3:id==='D22'?6:0;try{topic.practiceGen=()=>MIDecimals.generate(id);showEx();}finally{topic.practiceGen=gen;}},{id,mode});
  }
  fs.mkdirSync('../output/decimals-2026-11-07',{recursive:true});
  await page.setViewportSize({width:390,height:844});await show('D16');
  assert.equal(await page.locator('#exQ svg').count(),1);assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await page.screenshot({fullPage:true,path:resolve('../output/decimals-2026-11-07/recta-mobil.png')});
  await show('D11');assert.equal(await page.locator('#divisReasoning input').count(),2);
  await page.locator('#divisReasoning button').click();assert.equal(await page.evaluate(()=>state.answered),false);
  await page.locator('#mcmField0').focus();await page.screenshot({fullPage:true,path:resolve('../output/decimals-2026-11-07/composta-mobil.png')});
  const values=await page.evaluate(()=>currentEx.decimalsAnswer.fields.map(f=>String(f.value)));
  for(let i=0;i<values.length;i++)await page.locator('#mcmField'+i).fill(values[i]);
  await page.locator('#mcmField1').press('Enter');assert.equal(await page.evaluate(()=>adaptivePracticeSessions.decimals.correct),1);
  await page.evaluate(()=>{const session=adaptivePracticeSessions.decimals;session.correct=10;session.incorrect=2;session.points=8;showAdaptivePracticeResult('decimals');});await page.screenshot({fullPage:true,path:resolve('../output/decimals-2026-11-07/resum-mobil.png')});
  await show('D22');assert.equal(await page.locator('#divisReasoning select').count(),1);
  await show('D11','multi');assert.equal(await page.locator('#og .mcm-option-line').count(),8);
  assert.deepEqual(errors,[]);console.log(JSON.stringify(report,null,2));
 }finally{await browser.close();}
}
main().catch(e=>{console.error(e);process.exitCode=1;});
