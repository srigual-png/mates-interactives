const assert=require('node:assert/strict');
const fs=require('node:fs');
const {resolve}=require('node:path');
const {pathToFileURL}=require('node:url');
const {chromium}=require('C:/Users/srigu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
async function main(){
 let browser,browserEngine;for(const [name,executablePath] of [['Edge','C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'],['Chrome','C:/Program Files/Google/Chrome/Application/chrome.exe']]){try{browser=await chromium.launch({executablePath});browserEngine=name;break;}catch(e){if(name==='Chrome')throw e;}}if(!browser)throw Error('No hi ha cap Edge o Chrome executable.');
 try{
  const page=await browser.newPage({viewport:{width:900,height:920}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));await page.route(/^https?:/,r=>r.abort());
  await page.goto(pathToFileURL(resolve('1eso/sentit-numeric.html')).href);
  const report=await page.evaluate(()=>{
   const check=(v,m)=>{if(!v)throw Error(m);},M=MIFraccions,el=id=>document.getElementById(id),topic=TOPICS.find(t=>t.id==='fraccions');
   const accepts=(q,v)=>openOk1(q.correct,v,q),groups=M.families,links={},generated=[];
   for(const spec of M.familySpecs){for(const id of spec.generators){const q=M.generate(id);generated.push(q);links[id]=miTheoryLinkHtml('fraccions',undefined,q.fractionsTheory).match(/href="([^"]+)/)[1];check(accepts(q,q.correct),'Canonical '+id);check(q.familyId===spec.id&&q.diff===spec.level,'Family metadata '+id);check(miTaskDifficulty.getDifficulty(topic,q)===spec.level,'Shared classifier '+id);}}
   check(groups.map(g=>g.length).join(',')==='9,9,1','Family coverage');check(new Set(generated.map(q=>q.variantId)).size===23,'All generator routes');
   // Els exàmens han de funcionar abans que la pràctica inicialitzi cap estat.
   miTopicExam.start('fraccions');const exam=miTopicExam.getSession();check(exam.questions.length===12,'Topic exam length');check([1,2,3].map(l=>exam.questions.filter(q=>miTaskDifficulty.getDifficulty(topic,q)===l).length).join()==='4,4,4','Exam quotas');check(new Set(exam.questions.map(q=>q.variantId)).size>1,'Exam route variety');
   check(exam.questions.every(q=>!/^F\d/.test(String(q.type))),'Legacy exam generators');check(document.querySelector('#miTopicExamBody .mcm-option-line'),'Labelled fraction components in topic exam');
   check(exam.questions.every(q=>q.options.length===4&&new Set(q.options).size===4&&q.options.filter(v=>accepts(q,v)).length===1),'Legacy exam unique options');
   miExamSelectedTopics=['fraccions'];miStartConfiguredExam();check(state.examQs.length===20,'Global exam');
   function start(level,mode='open'){selTopic(TOPICS.indexOf(topic));selLv(level);selMode(mode);startP();return adaptivePracticeSessions.fraccions;}
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
   // Exact forms, unrestricted equivalents, tuples and all six new worked examples.
   check(!M.matches({kind:'rational',value:'1/2',irreducible:true},'2/4'),'Reject reducible');
   check(M.matches({kind:'rational',value:'1/2',irreducible:true},'1/2'),'Accept irreducible');
   check(M.matches({kind:'rational',value:'1/2'},'-2/-4'),'Signed equivalents');
   check(!M.matches({kind:'rational',value:'1/2'},'1/0'),'Zero denominator');
   check(!M.matches({kind:'rational',value:'1/2'},'1.5/3'),'Integer terms');
   check(M.matches({kind:'rational',value:'3/8'},'6/16'),'F18');
   check(M.matches({kind:'fields',fields:[{kind:'integer',value:'2'},{kind:'rational',value:'1/3',proper:true}]},'2; 1/3'),'F19');
   check(M.matches({kind:'integer',value:'8'},'8')&&!M.matches({kind:'integer',value:'8'},'8/1'),'F20');
   check(M.frac(2*4+1*3,3*4)==='11/12','F21');
   check(M.matches({kind:'rational',value:'1/2'},'3/6'),'F22');
   check(M.matches({kind:'rational',value:'3/6',denominator:6},'3/6')&&!M.matches({kind:'rational',value:'3/6',denominator:6},'1/2'),'F23');
   check(M.options({kind:'rational',value:'1/1'},'1/1',['3/3','6/6','9/9','1/2','2/3','3/4']).length===4,'Rational duplicate rejection');
   start(2);const n3keys=new Set(),n3families=new Set();
   for(let i=0;i<20;i++){adaptivePracticeSessions.fraccions.points=12;const q=nextAdaptivePractice(topic);check(q.diff===3&&!n3keys.has(q.practiceKey),'N3 distinct reserve');n3keys.add(q.practiceKey);n3families.add(q.fractionsFamily);}
   check(n3families.size===1,'N3 rotation');const n3gen=topic.practiceGen;try{topic.practiceGen=(id,l,random)=>n3gen(id,l,random||((min,max)=>min));for(let i=0;i<20;i++){adaptivePracticeSessions.fraccions.points=12;const q=nextAdaptivePractice(topic);check(q&&q.diff===3,'N3 deterministic reserves');}}finally{topic.practiceGen=n3gen;}
   const session=start(2),keys=new Set(),visited=new Set();let last;
   for(let i=0;i<20;i++){check(!keys.has(currentEx.practiceKey),'Repeated instance');keys.add(currentEx.practiceKey);check(currentEx.fractionsFamily!==last,'Repeated family');last=currentEx.fractionsFamily;visited.add(last);processPracticeAnswer(false,'999');nextEx();}
   check(visited.size===9,'Twenty errors N1 rotation');
   start(2);const s=adaptivePracticeSessions.fraccions,original=topic.practiceGen;
   try{topic.practiceGen=(id,level,random)=>original(id,level,random||((min,max)=>min));for(let i=0;i<20;i++){processPracticeAnswer(false,'999');nextEx();}check(s.ended&&s.incorrect===20,'Deterministic reserves');}finally{topic.practiceGen=original;}
   start(2);adaptivePracticeSessions.fraccions.questions={has:()=>true};showEx();check(adaptivePracticeSessions.fraccions.ended&&el('decimalResultSubtitle').textContent.includes('cap altra pregunta'),'Exhaustion summary');
   start(1);processPracticeAnswer(true,currentEx.correct);leavePractice();check(el('decimalResultScore').textContent==='1/1','Voluntary finish');
   for(const [level,mode] of [[1,'multi'],[2,'multi']]){start(level,mode);check(currentEx&&currentEx.options.length===4,'Guided/autonomous multiple choice '+level);processPracticeAnswer(true,currentEx.correct);leavePractice();check(el('decimalResultScore').textContent==='1/1','Guided/autonomous result '+level);}
   start(1);const history=adaptivePracticeSessions.fraccions;history.points=3;nextAdaptivePractice(topic);const n2Ids=new Set(M.familySpecs.filter(f=>f.level===2).map(f=>f.id)),visitedN2=[...history.seen].filter(f=>n2Ids.has(f));history.points=0;nextAdaptivePractice(topic);history.points=3;nextAdaptivePractice(topic);check(visitedN2.every(f=>history.seen.has(f)),'Retained history');
   let bank;
   for(let i=0;i<20;i++){const p=genFraccionsProb();if(p.type===7){bank=p;break;}}
   check(bank&&bank.answer.check(bank.answer.val)&&!bank.answer.check(bank.answer.val+';999'),'Bank tuple');const fields=bank.answer.fractionsAnswer.fields;check(!bank.answer.check((fields[0].value==='Laia'?'Marc':'Laia')+'; '+fields[1].value),'Wrong person');check(!bank.answer.check(fields[0].value+'; 0'),'Wrong difference');check(!bank.answer.check(fields[1].value),'Incomplete pair');
   ampSession={probs:[bank],idx:0,results:[]};ampShowProb();check(el('ampFinalAns1'),'Bank separate fields');el('ampFinalAns').value=String(bank.answer.fractionsAnswer.fields[0].value);ampCheckAnswer();check(ampSession.results.length===0,'Bank incomplete ignored');el('ampFinalAns1').value=String(bank.answer.fractionsAnswer.fields[1].value);ampCheckAnswer();check(ampSession.results[0].ok,'Bank UI correct');
   const wrapped=wrapExamProblem(bank);check(wrapped.fractionsAnswer&&!M.matches(wrapped.fractionsAnswer,bank.answer.val+';999'),'Global exam validation');
   state.examQs=[wrapped];state.examIdx=0;state.examAnswers=[];state.examScore=0;showEQ();check(el('examOpenAns1'),'Exam separate fields');el('examOpenAns').value=String(wrapped.fractionsAnswer.fields[0].value);checkExamOpenAnswer();check(state.examAnswers.length===0,'Exam incomplete ignored');el('examOpenAns1').value=String(wrapped.fractionsAnswer.fields[1].value);checkExamOpenAnswer();check(state.examAnswers[0].ok,'Exam UI correct');
   for(let i=0;i<20;i++){const p=genFraccionsProb();check(p.answer.check(p.answer.val),'Bank canonical '+p.type);check(p.diff===2&&p.taskDifficulty===2,'Bank family level '+p.type);}
   const reasoningBank=AMP_CATS.find(t=>t.id==='fraccions');let guarantee;
   for(let i=0;i<20;i++){const q=reasoningBank.gen();if(q.reasoningFamily==='fraccions-reconstruccio'){guarantee=q;break;}}
   check(guarantee?.fractionsTheory==='reconstruccio-successiva'&&guarantee.answer.fractionsAnswer,'Reasoning bank metadata');
   check(guarantee.answer.check(guarantee.answer.val)&&!guarantee.answer.check(guarantee.answer.val+'.5'),'Reasoning bank strict integer');
   const record=buildErrorRecord({...M.generate('F16'),topicId:'fraccions'},'incorrect','practice');const restored=normalizeErrorEntry(record,'fraccions');
   check(restored.fractionsTheory==='comparacio-diferencia'&&restored.fractionsAnswer,'New error metadata');check(openOk1(restored.correct,restored.correct,restored),'Restored validator');check(!openOk1(restored.correct,restored.correct+';999',restored),'Restored strict validator');
   const legacy={id:'old-fractions',topicId:'fraccions',type:2,question:'Pregunta antiga',correct:'5',answer:'4'};
   state.errors.fraccions=[legacy];state.errors=normalizeErrorStore(state.errors);check(state.errors.fraccions[0].question===legacy.question&&state.errors.fraccions[0].correct==='5','Legacy error preserved');showErrorSummary();
   for(const id of ['naturals','decimal_sys','ops','potencies','jerarquia','divis','mcmmcd','enters','decimals','proporcionalitat','percentatges']){selTopic(TOPICS.findIndex(t=>t.id===id));selLv(1);selMode('multi');startP();processPracticeAnswer(true,currentEx.correct);leavePractice();check(el('decimalResultScore').textContent==='1/1','Neighbor topic '+id);}
   return {families:groups.map(g=>g.length),links,scenarios,exam:[12,20]};
  });
  report.browser=browserEngine;
  const theory=fs.readFileSync('1eso/teoria/numeric/fraccions-1r-eso.html','utf8');
  for(const link of Object.values(report.links))assert(theory.includes('id="'+link.split('#')[1]+'"'),link);
  const theoryPage=await browser.newPage();
  await theoryPage.route(/^https?:/,r=>r.abort());
  await theoryPage.goto(pathToFileURL(resolve('1eso/teoria/numeric/fraccions-1r-eso.html')).href);
  await theoryPage.addStyleTag({content:'html { scroll-behavior: auto !important; }'});
  for(const [family,link] of Object.entries(report.links)){
    const anchor=link.split('#')[1],target=theoryPage.locator('#'+anchor);assert.equal(await target.count(),1,family+' anchor');
    await theoryPage.goto(pathToFileURL(resolve('1eso/teoria/numeric/fraccions-1r-eso.html')).href+'#'+anchor);assert.equal(new URL(theoryPage.url()).hash,'#'+anchor,family+' direct hash');
    await target.evaluate(el=>{for(let d=el.closest('details');d;d=d.parentElement?.closest('details'))d.open=true;});
    assert(await target.evaluate(el=>{for(let d=el.closest('details');d;d=d.parentElement?.closest('details'))if(!d.open)return false;return true;}),family+' details open');
    const section=target;
    assert((await section.innerText()).length>120,family+' procedure');
    const example=section.locator('.example');assert.equal(await example.count(),1,family+' worked example exists');assert((await example.first().innerText()).length>20,family+' worked example');
    await section.evaluate(el=>el.scrollIntoView());assert(await target.isVisible(),family+' visible');
    const next=anchor==='fraccio-intermedia'?'simplificar':'fraccio-intermedia';await theoryPage.evaluate(()=>{window.__hashChanged=false;addEventListener('hashchange',()=>window.__hashChanged=true,{once:true});});await theoryPage.evaluate(id=>{location.hash=id;},next);await theoryPage.waitForFunction(id=>location.hash==='#'+id&&window.__hashChanged,next);assert.equal(new URL(theoryPage.url()).hash,'#'+next,family+' hashchange event');await theoryPage.evaluate(()=>history.back());await theoryPage.waitForFunction(id=>location.hash==='#'+id,anchor);
  }
  await theoryPage.close();
  fs.mkdirSync(resolve('tmp/fraccions-2026-11-13'),{recursive:true});
  async function showFamily(id){
   await page.evaluate(id=>{const topic=TOPICS.find(t=>t.id==='fraccions');selTopic(TOPICS.indexOf(topic));selLv(1);selMode('open');startP();const gen=topic.practiceGen;try{topic.practiceGen=()=>MIFraccions.generate(id);adaptivePracticeSessions.fraccions.questions.clear();showEx();}finally{topic.practiceGen=gen;}},id);
  }
  await page.setViewportSize({width:390,height:844});
  for(const id of ['F18','F19','F16','F21']){
   await showFamily(id);assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
   await page.screenshot({fullPage:true,path:resolve('tmp/fraccions-2026-11-13/'+id+'-mobil.png')});
   if(id==='F16'||id==='F19'){
    await page.locator('#divisReasoning button').click();assert.equal(await page.evaluate(()=>state.answered),false);
    const values=await page.evaluate(()=>currentEx.fractionsAnswer.fields.map(f=>f.value));
    for(let i=0;i<values.length;i++){const ctl=page.locator('#mcmField'+i);if(await ctl.evaluate(el=>el.tagName==='SELECT'))await ctl.selectOption(values[i]);else await ctl.fill(values[i]);}
    await page.locator('#divisReasoning button').click();assert.equal(await page.evaluate(()=>adaptivePracticeSessions.fraccions.correct),1);
    await page.locator('#divisReasoning button').click({force:true,timeout:1000}).catch(()=>{});assert.equal(await page.evaluate(()=>adaptivePracticeSessions.fraccions.correct),1);
   }
  }
  await page.evaluate(()=>{const s=adaptivePracticeSessions.fraccions;s.correct=10;s.incorrect=2;showAdaptivePracticeResult('fraccions');});
  await page.screenshot({fullPage:true,path:resolve('tmp/fraccions-2026-11-13/resultat-mobil.png')});
  assert.deepEqual(errors,[]);console.log(JSON.stringify(report,null,2));
 }finally{await browser.close();}
}
main().catch(e=>{console.error(e);process.exitCode=1;});
