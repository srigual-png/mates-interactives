const fs=require('fs'),path=require('path'),assert=require('assert/strict');
const {chromium}=require('C:/Users/srigu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{const browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true}),results=[];
try{for(let c=1;c<=4;c++)for(const sense of ['numeric','mesura','algebraic','espacial','estocastic']){
 const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));await page.route(/^https?:/,r=>r.abort());await page.goto('file:///'+path.resolve(`${c}eso/sentit-${sense}.html`).replace(/\\/g,'/')+(c===4?'?opcio=B':''));await page.waitForFunction(()=>typeof miTopicExam!=='undefined');
 const result=await page.evaluate(async({c,sense})=>{
  const check=(v,m)=>{if(!v)throw Error(m);},E=miTaskDifficulty,S=typeof ST!=='undefined'?ST:state,words=[null,'easy','medium','hard'];let generated=0,assigned=0,pending=0,shown=0;
  const verify=(t,q)=>{const n=E.getDifficulty(t,q);check(q.taskDifficulty===n&&q.diff===n&&q.difficulty===(words[n]||null),'àlies divergents '+t.id+':'+q.type);check(q.curriculum.pageCourse===c+'eso','curs');check(q.taskDifficultyStatus===(n===null?'pending':'assigned'),'estat');if(n===null){pending++;check(!q.curriculum.examEligible,'cobertura falsa');}else{assigned++;check(n>=1&&n<=3,'nivell');}return n;};
  for(let i=0;i<TOPICS.length;i++){
   const t=TOPICS[i];if(typeof t.gen!=='function')continue;
   for(let k=0;k<80;k++){const q=t.gen(),n=verify(t,q),math=JSON.stringify([q.question,q.correct,q.options,q.guide,q.solution]);S.level=1;check(E.getDifficulty(t,q)===n,'suport altera dificultat');S.level=2;check(E.getDifficulty(t,q)===n,'autònom altera dificultat');check(JSON.stringify([q.question,q.correct,q.options,q.guide,q.solution])===math,'contingut mutat');generated++;}
   for(const support of [1,2])for(const mode of ['multi','open']){
    if(typeof selTopic==='function')selTopic(i);else selectTopic(i);
    if(typeof selLv==='function')selLv(support);else if(typeof selectLevel==='function')selectLevel(support);else setLevel(support);
    if(typeof selMode==='function')selMode(mode);else if(typeof selectMode==='function')selectMode(mode);else setMode(mode);
    if(typeof startP==='function')startP();else startPractice();
    const q=typeof curEx!=='undefined'?curEx:currentEx;verify(t,q);check(S.level===support,'suport perdut');const label=document.getElementById('miTaskContext').textContent;check(label.includes(support===1?'Suport guiat':'Pràctica autònoma'),'etiqueta suport');check(q.taskDifficulty!==null||label.includes('pendent'),'pendent no explícit');shown++;
   }
  }
  const first=miTopicExam.getTopics()[0],qs=miTopicExam.build(first);check(qs.length===12,'examen tema');qs.forEach(q=>check(verify(first,q)===miTopicExam.getDifficulty(first,q),'examen no compartit'));
  let bankCount=0;const checkBank=(q)=>{const t=TOPICS.find(t=>t.id===(q.topicId||q.primaryTopic))||{id:q.topicId,name:'Banc'};verify(t,q);check(q.difficultyBank&&q.difficultyKey,'identitat banc');bankCount++;};
  if(typeof AMP_CATS!=='undefined')for(const p of AMP_CATS.filter(p=>p.gen)){for(let k=0;k<80;k++)checkBank(p.gen());check(Object.values(p.diffCounts).reduce((a,b)=>a+b,0)===p.variants,'capacitat banc');}
  if(typeof MEASURE_PROBLEM_PATTERNS!=='undefined')MEASURE_PROBLEM_PATTERNS.forEach(p=>checkBank(p()));
  if(typeof ALG_OPEN_PATTERNS!=='undefined')ALG_OPEN_PATTERNS.forEach(p=>{const q=p.gen();checkBank(q);check(p.diff===q.taskDifficulty,'filtre algebraic');});
  if(typeof SP_OPEN_PATTERNS!=='undefined')SP_OPEN_PATTERNS.forEach(p=>{const q=p.gen();checkBank(q);check(p.diff===q.taskDifficulty,'filtre obert');});
  if(typeof ST_OPEN_PATTERNS!=='undefined')ST_OPEN_PATTERNS.forEach(p=>{const q=p.gen();checkBank(q);check(p.diff===q.taskDifficulty,'filtre obert');});
  if(typeof miOpenExamConfig==='function')miOpenExamConfig();if(typeof miExamSelectAll==='function')miExamSelectAll();if(typeof miStartConfiguredExam==='function')miStartConfiguredExam();else startExam();check(S.examQs.length===20,'global incomplet');for(const q of S.examQs){const t=TOPICS.find(t=>t.id===q.topicId);check(t,'tema global absent');verify(t,q);check(q.curriculum.examEligible,'tema fora currículum');}
  if(c===1&&sense==='numeric'){
   const t=TOPICS.find(t=>t.id==='proporcionalitat');let raw;for(let k=0;k<200;k++){const q=genProporcionalitatBase();if(q.type===3){raw=q;break;}}check(raw&&raw.diff===1,'generador base/fitxes alterat');const normal=E.annotate(t,raw);check(normal.taskDifficulty===2,'proporcionalitat revisada: valor unitari i nou cost');check(raw.diff===1,'normalització muta el generador base');const old={...raw,topicId:t.id,source:'practice',diff:1};E.refreshErrors([old]);check(old.diff===2,'error històric incoherent');
   const ambiguous={...raw,topicId:t.id,source:'exam',isProblem:true};E.refreshErrors([ambiguous]);check(ambiguous.taskDifficulty===null,'històric ambigu classificat sense identitat');
  }
  return {generated,shown,assignedChecks:assigned,pendingChecks:pending,bankChecks:bankCount,topicExam:qs.length,globalExam:S.examQs.length};
 },{c,sense});assert.deepEqual(errors,[]);results.push({course:c+'eso',sense,option:c===4?'B':null,...result});fs.writeFileSync('docs/dificultats/resultats-punt2.json',JSON.stringify({blocks:results,complete:false},null,2));console.log(c+'eso '+sense+': OK ('+result.shown+' pràctiques)');await page.close();
 }
 for(const sense of ['mesura','espacial']){
  const p=await browser.newPage();await p.route(/^https?:/,r=>r.abort());await p.goto('file:///'+path.resolve(`4eso/sentit-${sense}.html`).replace(/\\/g,'/')+'?opcio=A');
  const data=await p.evaluate(()=>{const E=miTaskDifficulty,S=state;for(const t of TOPICS){const q=t.gen();if(q.curriculum.option!=='A')throw Error('opció absent');if(t.bRequired&&(q.curriculum.examEligible||q.curriculum.scope!=='curricular-b'))throw Error('B barrejat amb A');}miOpenExamConfig();miExamSelectAll();miStartConfiguredExam();if(S.examQs.length!==20||S.examQs.some(q=>!q.curriculum.examEligible||q.curriculum.option!=='A'))throw Error('examen A');return {eligible:miTopicExam.getTopics().map(t=>t.id),global:20};});results.push({course:'4eso',sense,option:'A',...data});await p.close();
 }
 const p=await browser.newPage();await p.route(/^https?:/,r=>r.abort());await p.goto('file:///'+path.resolve('index.html').replace(/\\/g,'/'));const portada=await p.evaluate(()=>{const q=MIPortadaBank.generate(['1eso','2eso','3eso','4eso']);return {difficulty:q.taskDifficulty,status:q.taskDifficultyStatus};});assert.deepEqual(portada,{difficulty:null,status:'pending'});await p.close();
 fs.writeFileSync('docs/dificultats/resultats-punt2.json',JSON.stringify({blocks:results,portada},null,2));
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
