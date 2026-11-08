const assert=require('node:assert/strict'),fs=require('node:fs'),{resolve}=require('node:path'),{pathToFileURL}=require('node:url');
const {chromium}=require('C:/Users/srigu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{const browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});try{
const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));await page.route(/^https?:/,r=>r.abort());await page.goto(pathToFileURL(resolve('1eso/sentit-numeric.html')).href);
const report=await page.evaluate(()=>{
 const check=(v,m)=>{if(!v)throw Error(m);},M=MIPercentatges,t=TOPICS.find(t=>t.id==='percentatges'),links={},variants=new Set();let generated=0;
 for(const [li,g] of M.families.entries())for(const family of g)for(const id of family)for(let i=0;i<120;i++){
 const q=M.generate(id);generated++;check(q.taskDifficulty===li+1,'level '+id);check(openOk1(q.correct,q.correct,q),'canonical '+id+' '+q.correct);check(!openOk1(q.correct,q.correct+' extra',q),'extra '+id);check(!M.matches(q.percentAnswer,[q.correct,'extra']),'extra field');check(q.options.length===4&&new Set(q.options).size===4,'options '+id);check(q.options.filter(x=>M.matches(q.percentAnswer,x)).length===1,'equivalent options '+id);check(q.solution.length>=2,'steps '+id);links[q.familyId]=miTheoryLinkHtml(t.id,undefined,q.percentTheory);variants.add(q.percentTheory);check(miTaskDifficulty.getDifficulty(t,q)===li+1,'classifier '+id);if(q.percentAnswer.unit==='persones')check(Number.isInteger(Number(q.correct)),'people '+id);
 if(q.familyId==='Q06')check(q.percentData.every(Number.isInteger),'club fractions');
 if(q.familyId==='Q09'){const d=q.reasoningData,x=Number(q.correct);check((d.p-d.q)*x>100*d.coupon,'threshold candidate');check((d.p-d.q)*(x-1)<=100*d.coupon,'threshold previous');}
 if(q.percentAnswer.unit==='€')check(!M.matches(q.percentAnswer,String(Number(q.percentAnswer.value)+0.04)),'money tolerance '+id);
 }
 for(const s of ['100','100,00','100 €','100,00 €','100.000'])check(M.matches({kind:'number',value:'100',unit:'€'},s),'money '+s);
 for(const s of ['99,96 €','100,04 €','100,001','100%','100 1'])check(!M.matches({kind:'number',value:'100',unit:'€'},s),'money reject '+s);
 check(!M.matches({kind:'number',value:'137',unit:'persones',integer:true},'137,5'),'fractional person');
 check(M.matches({kind:'number',value:'25',unit:'%'},'25%'),'percentage symbol');check(M.matches({kind:'number',value:'25',unit:'%'},'25'),'percentage number');check(!M.matches({kind:'number',value:'25',unit:'%'},'25 €'),'percentage euro');check(!M.matches({kind:'number',value:'5',unit:'pp'},'5%'),'pp versus percent');
 // Deterministic data for the acceptance examples.
 const fixed=values=>(a,b)=>{const n=values.shift();check(n>=a&&n<=b,'fixed random '+n+' '+a+' '+b);return n;};
 check(M.generate('Q01',fixed([0,20])).correct==='20','5% of 400');
 check(M.generate('Q04-descompte',fixed([5,22])).correct==='308','30% discount');
 check(M.generate('Q03-descompte',fixed([3, 2])).solution.some(x=>x.includes('Comprovació')),'inverse verification');
 check(M.generate('Q02',fixed([4,7])).correct==='25','35 of 140');
 check(M.generate('Q03-total',fixed([3,10])).correct==='200','40 is 20% of 200');
 const club=M.generate('Q06',fixed([1,6,0]));check(club.question.includes('120 a 132'),'120 members plus 10%');
 const rate=M.generate('Q06',fixed([4,25,0]));check(rate.correct==='25'&&rate.question.includes('500 a 625'),'500 to 625');
 check(M.generate('Q07',fixed([0,25,1,1,1])).correct==='540','successive 500 +20 -10');
 check(M.generate('Q08',fixed([0,40,1,2])).correct==='400','complement 800');
 check(M.generate('Q10',fixed([0,2,25])).correct==='25','25 painted cells');
 check(M.generate('Q11',fixed([0,2,4,1,1,10])).correct==='A','80 euro offers');
 check(M.generate('Q12',fixed([0,5,1])).solution.some(x=>x.includes('96,00')),'100 plus/minus20');
 check(M.generate('Q13',fixed([0,2,1,0,0])).correct==='5','20 to25 percentage points');
 const thresholdRandom=[0.5,0.5,0];check(MIFirstNumericTasks.generate('llindar-ofertes',()=>thresholdRandom.shift()).correct==='21','threshold21');
 check(M.generate('Q05-fraccio-pct',fixed([0,2,2,3])).correct==='37,5','3/8');
 const scenarios=[];
 for(const [mode,answers] of [[1,Array(10).fill(true)],[1,[false,false,false,false,...Array(10).fill(true)]],[2,Array(20).fill(true)],[2,Array(20).fill(false)]]){
 selTopic(TOPICS.indexOf(t));selLv(mode);selMode('open');startP();const session=adaptivePracticeSessions.percentatges,keys=new Set(),visited=new Set();
 for(const ok of answers){check(!session.ended,'premature end');check(currentEx,'null exercise');check(!keys.has(currentEx.practiceKey),'duplicate');keys.add(currentEx.practiceKey);visited.add(currentEx.familyId);if(mode===2&&!ok)check(currentEx.taskDifficulty===1,'error level');processPracticeAnswer(ok,ok?currentEx.correct:'error');nextEx();}
 check(session.ended,'not ended');check(document.getElementById('decimalResultScore').textContent===session.correct+'/'+answers.length,'score');if(answers.length===14)check(document.getElementById('practiceResultMetric').textContent.includes('71,4%'),'71.4');if(mode===2&&!session.correct){check(visited.size===4,'N1 rotation');check(document.getElementById('practiceResultMetric').textContent.includes('0%'),'0%');}scenarios.push({mode,correct:session.correct,incorrect:session.incorrect,families:[...visited]});
 }
 selTopic(TOPICS.indexOf(t));selLv(2);selMode('open');startP();const session=adaptivePracticeSessions.percentatges,original=t.practiceGen;const min=(a,b)=>a;
 for(const group of M.families[0])for(const id of group)session.questions.add(M.generate(id,min).practiceKey);
 t.practiceGen=(id,level,random)=>M.generate(id,random||min);const reserve=nextAdaptivePractice(t);t.practiceGen=original;check(reserve&&reserve.taskDifficulty===1,'reserve level');
 for(const points of [6,12,5,0]){session.points=points;check(nextAdaptivePractice(t).taskDifficulty===adaptiveLevel(points),'transitions');}
 leavePractice();check(session.ended,'voluntary exit');
 selTopic(TOPICS.indexOf(t));selLv(1);selMode('open');startP();document.getElementById('mcmField0').value=currentEx.correct;checkOpen();const count=adaptivePracticeSessions.percentatges.correct;checkOpen();check(adaptivePracticeSessions.percentatges.correct===count,'double submit');
 const q=M.generate('Q12'),rec=normalizeErrorEntry(JSON.parse(JSON.stringify(buildErrorRecord(q,'error','practice'))),t.id);check(rec.question===q.question&&rec.correct===q.correct&&rec.percentTheory==='error-base'&&openOk1(rec.correct,rec.correct,rec),'new error');
 const old=normalizeErrorEntry({topicId:t.id,type:6,question:'Percentatge antic',correct:'25%',answer:'20%'},t.id);miTaskDifficulty.refreshErrors([rec]);check(rec.taskDifficulty===3,'saved error level');check(old.question==='Percentatge antic'&&old.correct==='25%'&&!old.percentTheory,'old error');
 for(let i=0;i<60;i++){const p=genPctProb();check(p.percentTheory&&p.familyId,'bank metadata');check(p.answer.check(p.answer.val),'bank canonical');check(wrapExamProblem(p).percentTheory===p.percentTheory,'bank exam theory');}
 // Exercise the actual open/choice controls for every variant.
 let uiChecks=0;
 for(const groups of M.families)for(const family of groups)for(const id of family)for(const mode of ['open','multi']){
 selTopic(TOPICS.indexOf(t));selLv(2);selMode(mode);startP();const q=M.generate(id),original=t.practiceGen;t.practiceGen=()=>q;adaptivePracticeSessions.percentatges.questions.clear();showEx();t.practiceGen=original;
 if(mode==='open'){document.getElementById('mcmField0').value=q.correct;checkOpen();}else{const i=currentEx.options.indexOf(q.correct);selAns(i,document.querySelectorAll('#og .ob')[i]);}
 check(state.answered&&document.querySelector('#fbA .fb.ok'),'UI '+id+' '+mode);check(document.querySelector('#fbA a[href$="#'+q.percentTheory+'"]'),'UI theory '+id);uiChecks++;
 }
 // Twenty forced random collisions must still produce twenty distinct N1 exercises.
 selTopic(TOPICS.indexOf(t));selLv(2);selMode('open');const original2=t.practiceGen;t.practiceGen=(id,level,random)=>M.generate(id,random||((a,b)=>a));startP();const reserveKeys=new Set();for(let i=0;i<20;i++){check(currentEx&&!reserveKeys.has(currentEx.practiceKey),'20 reserves');check(currentEx.taskDifficulty===1,'reserve escalation');reserveKeys.add(currentEx.practiceKey);processPracticeAnswer(false,'error');nextEx();}t.practiceGen=original2;check(adaptivePracticeSessions.percentatges.ended,'reserve end');
 // Bank grading must use the typed checker directly, including cents and units.
 for(let i=0;i<8;i++){const p=genPctProb();ampSession={probs:[p],idx:0,results:[],hintUsed:false};ampShowProb();document.getElementById('ampFinalAns').value=String(Number(p.correct)+0.04);ampCheckAnswer();check(!ampSession.results[0].ok,'bank loose grading');check(document.querySelector('#ampFbArea a[href$="#'+p.percentTheory+'"]'),'bank theory');}
 miTopicExam.start(t.id);const exam=miTopicExam.getSession();check(exam.questions.length===12,'topic exam');check(exam.questions.every(q=>q.percentTheory),'topic theory');const levels=exam.questions.reduce((a,q)=>(a[miTaskDifficulty.getDifficulty(t,q)-1]++,a),[0,0,0]);
 document.querySelector('#miTopicExamBody [data-action="submit"]').click();check(document.querySelectorAll('#miTopicExamBody a[href*="#"]').length===12,'topic correction links');
 miExamSelectedTopics=[t.id];miStartConfiguredExam();check(state.examQs.length===20,'global exam');check(state.examQs.every(q=>q.percentTheory),'global theory');
 return {generated,uiChecks,reserves:20,links,anchors:[...variants],scenarios,topicExamLevels:levels,globalExam:state.examQs.length};
});assert.deepEqual(errors,[]);
const theory=fs.readFileSync('1eso/teoria/numeric/percentatges-1r-eso.html','utf8');for(const id of report.anchors)assert(theory.includes('id="'+id+'"'),id);assert.equal(Object.keys(report.links).length,13);
fs.mkdirSync('../output/percentatges',{recursive:true});
await page.setViewportSize({width:390,height:844});
for(const id of ['Q10','Q12','Q11','Q03-descompte']){await page.evaluate(id=>{const t=TOPICS.find(t=>t.id==='percentatges');selTopic(TOPICS.indexOf(t));selLv(2);selMode('open');startP();const q=MIPercentatges.generate(id),original=t.practiceGen;t.practiceGen=()=>q;adaptivePracticeSessions.percentatges.questions.clear();showEx();t.practiceGen=original;},id);assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await page.screenshot({path:'../output/percentatges/'+id+'.png',fullPage:true});await page.evaluate(()=>processPracticeAnswer(false,'error'));assert(await page.locator('#fbA a[href*="#"]').count()>0);await page.screenshot({path:'../output/percentatges/'+id+'-correccio.png',fullPage:true});}
await page.evaluate(()=>{const t=TOPICS.find(t=>t.id==='percentatges');selTopic(TOPICS.indexOf(t));selLv(2);selMode('multi');startP();for(let i=0;i<20;i++){processPracticeAnswer(false,'error');nextEx();}});await page.screenshot({path:'../output/percentatges/final.png',fullPage:true});
await page.goto(pathToFileURL(resolve('1eso/teoria/numeric/percentatges-1r-eso.html')).href);for(const anchor of report.anchors){await page.locator('#'+anchor).scrollIntoViewIfNeeded();assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));}await page.locator('#representacio-percentual').scrollIntoViewIfNeeded();await page.screenshot({path:'../output/percentatges/teoria.png'});
console.log(JSON.stringify(report,null,2));fs.writeFileSync('../output/percentatges/resultats.json',JSON.stringify(report,null,2));
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exit(1)});
