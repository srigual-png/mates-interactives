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
   const check=(v,m)=>{if(!v)throw Error(m);},M=MIEnters,el=id=>document.getElementById(id),topic=TOPICS.find(t=>t.id==='enters');
   const accepts=(q,v)=>openOk1(q.correct,v,q);
   const fixed=(...values)=>(min,max)=>{const v=values.length?values.shift():min;check(v>=min&&v<=max,'Draw '+v+' ['+min+','+max+']');return v;};
   const make=(id,...v)=>M.generate(id,fixed(...v));
   for(const [q,answer] of [[make('E02',0,0,0,1),'0'],[make('E02',-4,4,0,1),'0'],[make('E03',0,-5,0),'5'],[make('E03',7,0,0),'7'],[make('E04',-3,0,0),'0'],[make('E11',0,0,0),'0'],[make('E10',-7,0,0,0),'7'],[make('E07',-7,-2,0),'5'],[make('E16',-5,-1,0),'3'],[make('E17',-3,2,5,4),'13']])check(accepts(q,answer),'Mathematics '+q.type);
   check(M.integer('−0')===0&&M.integer('−7')===-7&&M.integer('7.0')===null&&M.integer('7,0')===null,'Exact integers');
   const pair={kind:'fields',fields:[M.number('Posició',-16,'m'),M.number('Canvi',2,'m')]};
   check(M.matches(pair,'−16 m; +2 m')&&!M.matches(pair,'−16; 2; 999')&&!M.matches(pair,'-16.0;2')&&!M.matches(pair,'-16 cm;2')&&!M.matches(pair,'-16;')&&!M.matches(pair,'-16;2 text'),'Strict tuple');
   const comparison=make('E01',-7,-2,0,1);
   check(accepts(comparison,'<')&&accepts(comparison,'−7 < −2')&&!accepts(comparison,'-7 > -2')&&!accepts(comparison,'7 < -2'),'Comparison operands and direction');
   const groups=adaptivePracticeGroups(topic);check(groups.map(g=>g.length).join()==='8,6,1','Catalogue');
   const links={};
   for(const [li,g] of groups.entries())for(const [id] of g){
    for(let i=0;i<150;i++){
     const q=M.generate(id);check(q.taskDifficulty===li+1,'Level '+id);
     check(q.options.length===4&&new Set(q.options).size===4&&q.options.filter(v=>accepts(q,v)).length===1,'Unique options '+id);
     check(!accepts(q,q.correct+';999')&&!accepts(q,'alert(1)'),'Reject trailing values '+id);
     if(id==='E08'){const numbers=q.question.match(/-?\d+/g).map(Number);check(numbers[0]+numbers[1]<0&&numbers[0]+numbers[1]-numbers[2]<0,'Submerged path');}
     links[id]=miTheoryLinkHtml('enters',undefined,q.entersTheory).match(/href="([^"]+)/)[1];
    }
   }
   const perm=a=>a.length?a.flatMap((x,i)=>perm(a.filter((_,j)=>j!==i)).map(p=>[x,...p])):[[]];
   const draws=[3.5/6,3.5/6,2.5/5,5.5/10,3.5/6,4.5/9];const bounded=MIFirstNumericTasks.generate('moviments-amb-limits',()=>draws.shift()??0);check(bounded.correct==='2'&&bounded.reasoningData.start===3&&bounded.reasoningData.lower===-3&&bounded.reasoningData.upper===14,'Generator reference path');
   check(perm([6,11,-10]).filter(p=>{let x=3;return p.every(m=>(x+=m)>=-3&&x<=14);}).length===2,'Six permutations');
   function start(level,mode='open'){selTopic(TOPICS.indexOf(topic));selLv(level);selMode(mode);startP();return adaptivePracticeSessions.enters;}
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
   for(let i=0;i<20;i++){check(!keys.has(currentEx.practiceKey),'Repeated instance');keys.add(currentEx.practiceKey);check(currentEx.entersFamily!==last,'Repeated family');last=currentEx.entersFamily;visited.add(last);processPracticeAnswer(false,'999');nextEx();}
   check(visited.size===8,'Twenty errors N1 rotation');
   start(2);const s=adaptivePracticeSessions.enters,original=topic.practiceGen;
   try{topic.practiceGen=(id,level,random)=>original(id,level,random||((min,max)=>min));for(let i=0;i<20;i++){processPracticeAnswer(false,'999');nextEx();}check(s.ended&&s.incorrect===20,'Deterministic reserves');}finally{topic.practiceGen=original;}
   start(2);adaptivePracticeSessions.enters.questions={has:()=>true};showEx();check(adaptivePracticeSessions.enters.ended&&el('decimalResultSubtitle').textContent.includes('cap altra pregunta'),'Exhaustion summary');
   start(1);processPracticeAnswer(true,currentEx.correct);leavePractice();check(el('decimalResultScore').textContent==='1/1','Voluntary finish');
   start(1);const history=adaptivePracticeSessions.enters;history.points=3;nextAdaptivePractice(topic);const visitedN2=[...history.seen].filter(f=>groups[1].includes(f));history.points=0;nextAdaptivePractice(topic);history.points=3;nextAdaptivePractice(topic);check(visitedN2.every(f=>history.seen.has(f)),'Retained history');
   miTopicExam.start('enters');const exam=miTopicExam.getSession();check(exam.questions.length===12,'Topic exam length');check([1,2,3].map(l=>exam.questions.filter(q=>miTaskDifficulty.getDifficulty(topic,q)===l).length).join()==='6,3,3','Exam quotas');
   check(exam.questions.every(q=>!/^E\d/.test(String(q.type))),'Legacy exam generators');
   check(exam.questions.every(q=>q.options.length===4&&new Set(q.options).size===4&&q.options.filter(v=>accepts(q,v)).length===1),'Legacy exam unique options');
   miExamSelectedTopics=['enters'];miStartConfiguredExam();check(state.examQs.length===20,'Global exam');
   let bank;
   for(let i=0;i<20;i++){const p=genEntersProb();if(p.type===5){bank=p;break;}}
   check(bank&&bank.answer.check(bank.answer.val)&&!bank.answer.check(bank.answer.val+';999'),'Bank tuple');
   ampSession={probs:[bank],idx:0,results:[]};ampShowProb();check(el('ampFinalAns1'),'Bank separate fields');el('ampFinalAns').value=String(bank.answer.entersAnswer.fields[0].value);ampCheckAnswer();check(ampSession.results.length===0,'Bank incomplete ignored');el('ampFinalAns1').value=String(bank.answer.entersAnswer.fields[1].value);ampCheckAnswer();check(ampSession.results[0].ok,'Bank UI correct');
   const wrapped=wrapExamProblem(bank);check(wrapped.entersAnswer&&!M.matches(wrapped.entersAnswer,bank.answer.val+';999'),'Global exam validation');
   state.examQs=[wrapped];state.examIdx=0;state.examAnswers=[];state.examScore=0;showEQ();check(el('examOpenAns1'),'Exam separate fields');el('examOpenAns').value=String(wrapped.entersAnswer.fields[0].value);checkExamOpenAnswer();check(state.examAnswers.length===0,'Exam incomplete ignored');el('examOpenAns1').value=String(wrapped.entersAnswer.fields[1].value);checkExamOpenAnswer();check(state.examAnswers[0].ok,'Exam UI correct');
   for(let i=0;i<20;i++){const p=genEntersProb();check(p.answer.check(p.answer.val),'Bank canonical '+p.type);}
   const record=buildErrorRecord({...M.generate('E15'),topicId:'enters'},'incorrect','practice');const restored=normalizeErrorEntry(record,'enters');
   check(restored.entersTheory==='errors-signes'&&restored.entersAnswer,'New error metadata');
   const legacy={id:'old-enters',topicId:'enters',type:2,question:'Pregunta antiga',correct:'5',answer:'4'};
   state.errors.enters=[legacy];state.errors=normalizeErrorStore(state.errors);check(state.errors.enters[0].question===legacy.question&&state.errors.enters[0].correct==='5','Legacy error preserved');showErrorSummary();
   for(const id of ['naturals','decimal_sys','ops','potencies','jerarquia','divis','mcmmcd']){selTopic(TOPICS.findIndex(t=>t.id===id));selLv(1);selMode('multi');startP();processPracticeAnswer(true,currentEx.correct);leavePractice();check(el('decimalResultScore').textContent==='1/1','Earlier topic '+id);}
   return {families:groups.map(g=>g.length),links,scenarios,exam:[12,20]};
  });
  const theory=fs.readFileSync('1eso/teoria/numeric/nombres-enters-1r-eso.html','utf8');
  const anchors=[...new Set(Object.values(report.links).map(link=>link.split('#')[1]))];
  assert(anchors.length>0,'Procedure links available');
  for(const anchor of anchors)assert(theory.includes('id="'+anchor+'"'),'Theory anchor '+anchor);
  const theoryPage=await browser.newPage();
  await theoryPage.route(/^https?:/,r=>r.abort());
  await theoryPage.addStyleTag({content:'html { scroll-behavior: auto !important; }'});
  const theoryUrl=pathToFileURL(resolve('1eso/teoria/numeric/nombres-enters-1r-eso.html')).href;
  async function waitForOpenedProcedure(anchor){
    await theoryPage.waitForFunction(id=>{
      const panel=document.getElementById('ajuda-exercicis'),item=document.getElementById(id);
      return location.hash==='#'+id&&panel?.open&&item?.open;
    },anchor);
  }
  async function verifyProcedure(anchor,family){
    const section=theoryPage.locator('details.procedure-item[id="'+anchor+'"]');
    assert.equal(await section.count(),1,family+' procedure anchor');
    assert.equal(await section.evaluate(node=>node.tagName),'DETAILS',family+' details element');
    const panel=theoryPage.locator('details#ajuda-exercicis');
    assert.equal(await panel.count(),1,'Procedure help details');
    await section.evaluate(node=>{
      for(let current=node;current;current=current.parentElement){
        if(current.tagName==='DETAILS')current.open=true;
      }
    });
    assert((await section.innerText()).length>120,family+' procedure content');
    const example=section.locator('.example').first();
    assert.equal(await example.count(),1,family+' resolved example');
    assert((await example.innerText()).length>65,family+' worked example content');
  }
  for(const [family,link] of Object.entries(report.links)){
    const anchor=link.split('#')[1];
    await theoryPage.goto(theoryUrl+'#'+encodeURIComponent(anchor));
    await waitForOpenedProcedure(anchor);
    assert.equal(new URL(theoryPage.url()).hash,'#'+anchor,'Direct theory anchor '+family);
    await verifyProcedure(anchor,family);
  }
  const firstAnchor=anchors[0],hashchangeAnchor=anchors[1]||anchors[0];
  await theoryPage.goto(theoryUrl+'#'+encodeURIComponent(firstAnchor));
  await waitForOpenedProcedure(firstAnchor);
  await theoryPage.evaluate(()=>{window.__miHashchangeCount=0;window.addEventListener('hashchange',()=>window.__miHashchangeCount++);});
  await theoryPage.evaluate(anchor=>{location.hash='#'+anchor;},hashchangeAnchor);
  await theoryPage.waitForFunction(id=>{
    const panel=document.getElementById('ajuda-exercicis'),item=document.getElementById(id);
    return window.__miHashchangeCount>0&&location.hash==='#'+id&&panel?.open&&item?.open;
  },hashchangeAnchor);
  assert.equal(new URL(theoryPage.url()).hash,'#'+hashchangeAnchor,'hashchange navigation');
  await verifyProcedure(hashchangeAnchor,'hashchange');
  await theoryPage.close();
  async function show(id,mode='open'){
   await page.evaluate(({id,mode})=>{const topic=TOPICS.find(t=>t.id==='enters'),gen=topic.practiceGen;selTopic(TOPICS.indexOf(topic));selLv(1);selMode(mode);startP();adaptivePracticeSessions.enters.questions.clear();adaptivePracticeSessions.enters.points=id==='E08'?3:id==='E15'?6:0;try{topic.practiceGen=()=>MIEnters.generate(id);showEx();}finally{topic.practiceGen=gen;}},{id,mode});
  }
  fs.mkdirSync('../output/enters-2026-11-07',{recursive:true});
  await page.setViewportSize({width:390,height:844});await show('E12');
  assert.equal(await page.locator('#exQ svg').count(),1);assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await page.screenshot({fullPage:true,path:resolve('../output/enters-2026-11-07/recta-mobil.png')});
  await show('E08');assert.equal(await page.locator('#divisReasoning input').count(),2);
  await page.locator('#divisReasoning button').click();assert.equal(await page.evaluate(()=>state.answered),false);
  await page.screenshot({fullPage:true,path:resolve('../output/enters-2026-11-07/composta-mobil.png')});
  const values=await page.evaluate(()=>currentEx.entersAnswer.fields.map(f=>String(f.value)));
  for(let i=0;i<values.length;i++)await page.locator('#mcmField'+i).fill(values[i]);
  await page.locator('#mcmField1').press('Enter');assert.equal(await page.evaluate(()=>adaptivePracticeSessions.enters.correct),1);
  await page.evaluate(()=>{const session=adaptivePracticeSessions.enters;session.correct=10;session.incorrect=2;session.points=8;showAdaptivePracticeResult('enters');});await page.screenshot({fullPage:true,path:resolve('../output/enters-2026-11-07/resum-mobil.png')});
  await show('E15');assert.equal(await page.locator('#divisReasoning select').count(),1);
  await show('E08','multi');assert.equal(await page.locator('#og .mcm-option-line').count(),8);
  assert.deepEqual(errors,[]);console.log(JSON.stringify(report,null,2));
 }finally{await browser.close();}
}
main().catch(e=>{console.error(e);process.exitCode=1;});
