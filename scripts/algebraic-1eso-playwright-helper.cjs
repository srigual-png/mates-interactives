'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {pathToFileURL}=require('node:url');
let chromium;
for(const p of ['C:/Users/srigu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright','C:/Users/srigu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright-core'])try{chromium=require(p).chromium;break;}catch{}
if(!chromium)try{chromium=require('playwright').chromium;}catch{}
if(!chromium)throw new Error('Playwright no és disponible en aquest Node.js.');
const root=path.resolve(__dirname,'..');
const topics={
  traduccio:{theory:'llenguatge-algebraic-1r-eso.html',anchors:['variable','traduir','llegir','valor','context'],index:0},
  patrons:{theory:'patrons-numerics-geometrics-1r-eso.html',anchors:['patro','additius','multiplicatius','buits','geometrics'],index:1},
  monomis:{theory:'expressions-termes-coeficients-1r-eso.html',anchors:['termes','coeficient','independent','semblants','reduir'],index:2}
};
async function launch(){
  const problems=[];
  for(const [name,exe] of [['Chrome','C:/Program Files/Google/Chrome/Application/chrome.exe'],['Chrome','C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'],['Edge','C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'],['Edge','C:/Program Files/Microsoft/Edge/Application/msedge.exe']])if(fs.existsSync(exe))try{return {browser:await chromium.launch({executablePath:exe}),engine:name};}catch(e){problems.push(name+': '+e.message);}
  try{return {browser:await chromium.launch(),engine:'Chromium empaquetat'};}catch(e){problems.push('Chromium: '+e.message);}
  throw new Error('No s’ha pogut iniciar cap navegador. '+problems.join(' | '));
}
async function run(topicId){
  const cfg=topics[topicId];assert(cfg,'Tema esperat: '+Object.keys(topics).join(', '));
  const {browser,engine}=await launch(),page=await browser.newPage({viewport:{width:1200,height:850}}),pageErrors=[];
  page.on('pageerror',e=>pageErrors.push(e.message));
  await page.route(/^https?:/,r=>r.abort());
  try{
    await page.goto(pathToFileURL(path.join(root,'1eso/sentit-algebraic.html')).href,{waitUntil:'load'});
    const core=await page.evaluate(id=>{
      const fail=(x,m)=>{if(!x)throw new Error(m);};
      let seed=0x41a1b3;Math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
      const topic=TOPICS.find(t=>t.id===id),families=MIFirstAlgebraicFamilies.topicSpecs(id),D=miTaskDifficulty;
      fail(topic&&families&&D,'tema, catàleg i classificador carregats');
      const levels=[1,2,3].map(n=>families.filter(f=>f.level===n).length),coverage=D.coverage(topic);
      fail(coverage.families.length===families.length,'coverage conté totes les famílies');
      fail(JSON.stringify(coverage.types)===JSON.stringify(levels),'nivells del catàleg i classificador coincideixen');
      fail(D.examPlan(topic).slots.reduce((a,b)=>a+b,0)===12,'pla d’examen de 12 preguntes');
      const reachable=families.filter(f=>f.generators.some(g=>g.startsWith(id+':'))),seen=new Set(),samples=500;
      for(let i=0;i<samples;i++){const q=D.annotate(topic,topic._baseGen());const f=MIFirstAlgebraicFamilies.familyFor(topic,q);fail(f&&q.familyId===f.id,'família assignada al generador');fail(q.diff===f.level&&q.taskDifficulty===f.level&&D.getDifficulty(topic,q)===f.level,'nivell intern i classificador');fail(q.options?.length===4&&new Set(q.options.map(String)).size===4&&q.options.includes(q.correct),'quatre opcions i una resposta exacta');fail(q.guide?.length>=2&&q.solution?.length,'pistes i solució');seen.add(q.familyId);}
      fail(reachable.every(f=>seen.has(f.id)),'la pràctica accedeix a totes les famílies dels generadors propis');
      const bankIds=id==='traduccio'?['T1','T2','T3','T4','T5','T6','T7']:id==='patrons'?['P1','P2','P3','P4','P5','P6','P7']:['M1','M2','M3','M4','M5','M6'];
      const bankCounts={};for(const bankId of bankIds){const p=ALG_OPEN_PATTERNS.find(x=>x.id===bankId);fail(p,'patró de banc '+bankId);for(let i=0;i<50;i++){const q=p.gen();if(q.topicId==='simplificacio'&&(bankId==='M3'||bankId==='M4')){const owner=TOPICS.find(t=>t.id==='simplificacio');fail(owner&&D.getDifficulty(owner,q)!==null,'classificador preservat de simplificació '+bankId);fail(q.topicId==='simplificacio','reassignació explícita del patró '+bankId);continue;}const f=MIFirstAlgebraicFamilies.familyFor(id,q);fail(f,'família del banc '+bankId);const decorated=D.annotate(topic,q);fail(decorated.diff===f.level&&decorated.taskDifficulty===f.level,'nivell intern i classificador del banc '+bankId);bankCounts[f.id]=(bankCounts[f.id]||0)+1;}}
      const exam=miTopicExam.build(topic);fail(exam.length===12,'constructor d’examen específic de 12 preguntes');
      for(const q of exam)fail(q.familyId&&q.taskDifficulty===D.getDifficulty(topic,q),'família i nivell a l’examen específic');
      const topicExamFamilies=[...new Set(exam.map(q=>q.familyId))];fail(reachable.every(f=>topicExamFamilies.includes(f.id)),'examen de tema cobreix totes les famílies disponibles a la pràctica');
      const regressions={};for(const tid of ['simplificacio','equacions','computacional','patrons2','monomis2','simplificacio2','equacions2']){const t=TOPICS.find(x=>x.id===tid);fail(t,'tema de regressió '+tid);let count=0;for(let i=0;i<30;i++){const q=t.gen();fail(q&&q.question&&q.correct!==undefined,'generació '+tid);if(t.course==='1r'){fail(q.options?.length===4&&q.options.includes(q.correct),'opcions correctes '+tid);fail(miTaskDifficulty.getDifficulty(t,q)!==null,'classificador '+tid);}count++;}regressions[tid]=count;}
      return {levels,families:families.map(f=>({id:f.id,level:f.level})),reachable:reachable.map(f=>f.id),coverage:[...seen],bankCounts,topicExam:exam.length,topicExamFamilies,regressions};
    },topicId);

    await page.evaluate(i=>selectTopic(i),cfg.index);
    await page.locator('#screenIntro').waitFor({state:'visible'});
    await page.evaluate(()=>{selectLevel(1);selectMode('multi');startPractice();});
    await page.locator('#screenExercise.active').waitFor();
    const question=page.locator('#exQuestion .q-text');await question.waitFor();
    const current=await page.evaluate(()=>({correct:String(currentEx.correct),family:currentEx.familyId,guide:document.getElementById('guideSteps').textContent}));
    assert(current.family,'practice UI stores family');assert((await page.locator('#guideSteps').innerText()).includes('Pistes'),'mode guiat mostra pistes');
    const wrong=page.locator('.opt-btn').filter({hasNotText:current.correct}).first();
    const buttons=await page.locator('.opt-btn').all();let wrongIndex=-1;for(let i=0;i<buttons.length;i++)if((await buttons[i].innerText()).trim()!==current.correct){wrongIndex=i;break;}assert(wrongIndex>=0,'distractor per provar recuperació');await buttons[wrongIndex].click();
    await page.locator('#feedbackArea .feedback-box.ko').waitFor();assert((await page.locator('#feedbackArea').innerText()).includes(current.correct),'error mostra resposta correcta');await page.locator('#feedbackArea .sol-btn').click();await page.locator('#solBox.show').waitFor();const contextual=page.locator('#feedbackArea .mi-review-theory-link'),theoryHref=await contextual.getAttribute('href');assert(theoryHref&&theoryHref.includes(cfg.theory),'ajuda contextual del tema '+topicId);const contextualUrl=new URL(theoryHref,page.url()).href;assert(contextualUrl.includes(cfg.theory),'href contextual resol al fitxer de teoria');await page.locator('#btnNext').click();await question.waitFor();
    await page.evaluate(()=>{selectLevel(2);selectMode('open');startPractice();});await page.locator('#openWrap').waitFor({state:'visible'});assert.equal(await page.locator('#guideSteps').evaluate(e=>getComputedStyle(e).display),'none','mode autònom amaga les pistes');
    const openAnswer=await page.evaluate(()=>String(currentEx.correct));await page.locator('#openInput').fill(openAnswer);await page.locator('#openWrap .btn-check').click();await page.locator('#feedbackArea .feedback-box.ok').waitFor();

    await page.evaluate(id=>miTopicExam.start(id),topicId);await page.locator('#miTopicExam').waitFor({state:'visible'});assert.equal(await page.evaluate(()=>miTopicExam.getSession().questions.length),12,'examen de tema presentat a la interfície');assert((await page.locator('#miTopicExam').innerText()).includes('Pregunta 1'),'primera pregunta de l’examen de tema');
    await page.evaluate(id=>{miTopicExam.getSession();showHome();miExamClearAll();miToggleExamTopic(id,true);miStartConfiguredExam();},topicId);await page.locator('#screenExam.active').waitFor();assert.equal(await page.evaluate(()=>state.examQs.length),20,'examen global amb 20 preguntes');
    const globalCoverage=await page.evaluate(id=>{const qs=state.examQs.filter(q=>q.topicId===id);return {total:state.examQs.length,topic:qs.length,families:[...new Set(qs.map(q=>q.familyId).filter(Boolean))],levels:qs.map(q=>q.taskDifficulty??q.diff)}},topicId);assert.equal(globalCoverage.total,20);assert(globalCoverage.topic>0,'el tema entra a l’examen global');

    const theory=await browser.newPage({viewport:{width:1200,height:850}});theory.on('pageerror',e=>pageErrors.push(e.message));const theoryPath=path.join(root,'1eso/teoria/algebraic',cfg.theory);
    const anchors=cfg.anchors;
    await theory.goto(contextualUrl+'#'+anchors[0],{waitUntil:'load'});assert(await theory.locator('#'+anchors[0]).count(),'ancoratge directe '+anchors[0]);await theory.locator('#'+anchors[0]).waitFor();assert.equal(await theory.evaluate(()=>location.hash),'#'+anchors[0]);
    const navLinks=theory.locator('.quick-nav a[href^="#"]');assert(await navLinks.count()>=2,'menú d’ancoratges');const second=await navLinks.nth(1).getAttribute('href');await navLinks.nth(1).click();assert.equal(await theory.evaluate(()=>location.hash),second,'hashchange en seleccionar un segon apartat');assert(await theory.locator(second).count(),'destí de hashchange existeix');
    const returnLinks=theory.locator('a[href*="sentit-algebraic.html?tema='+topicId+'"]').count();assert(await returnLinks>=2,'retorn a pràctica guiada i autònoma');await theory.setViewportSize({width:390,height:844});const layout=await theory.evaluate(()=>({width:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth}));assert(layout.scroll<=layout.width+1,'teoria sense desbordament horitzontal a 390 px');await theory.close();
    assert.deepEqual(pageErrors,[],'cap error JavaScript de navegador');
    console.log(JSON.stringify({topic:topicId,browser:engine,...core,practice:{guided:true,autonomous:true,errorRecovery:true},globalExam:globalCoverage,theory:{anchors,hashchange:true,mobile390:true},pageErrors}));
  }finally{await browser.close();}
}
if(require.main===module)run(process.argv[2]).catch(e=>{console.error(e);process.exitCode=1;});
module.exports={run};
