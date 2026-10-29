const fs = require('fs'), path = require('path'), assert = require('assert'), vm = require('vm');
const {playwright, launchOptions} = require('./genera-examens-cerca.cjs');
const {chromium} = playwright();
const root = path.resolve(__dirname, '..');
const senses = ['numeric','mesura','algebraic','espacial','estocastic'];
const results = {pages:0, combinations:[], checks:[]};
function walk(dir) { return fs.readdirSync(dir, {withFileTypes:true}).flatMap(e => e.isDirectory() ? walk(path.join(dir,e.name)) : [path.join(dir,e.name)]); }
const pages = process.argv.includes('--functional-only') || process.argv.includes('--extras-only') ? [] : [path.join(root,'index.html'), ...[1,2,3,4].flatMap(c => walk(path.join(root,c+'eso')).filter(f=>f.endsWith('.html')))];
console.log('Static audit:',pages.length,'pages');
for (const f of pages) {
  const source = fs.readFileSync(f,'utf8');
  assert.equal((source.match(/src="[^"\n]*analitica-mi.js"/g)||[]).length,1,f);
  assert(!source.includes('gc.zgo.at/count.js'),f);
  for (const script of source.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    if (/src=|application\/ld\+json/.test(script[1])) continue;
    new vm.Script(script[2], {filename:f});
  }
  results.pages++;
}
for (const f of walk(path.join(root,'assets/js')).filter(f=>f.endsWith('.js'))) new vm.Script(fs.readFileSync(f,'utf8'),{filename:f});
console.log('Syntax and loader audit OK; launching browser');
(async () => {
 const browser = await chromium.launch(launchOptions());
 try {
  const p = await browser.newPage();
  await p.addInitScript(()=>{ window.open=()=>null; }); // Keep theory-link tests in this tab.
  p.setDefaultTimeout(10000);
  p.setDefaultNavigationTimeout(15000);
  let hits = [], blocked = false, blockedModule = false, errors = [];
  p.on('pageerror', e=>errors.push(e.message));
  await p.route('**/*', async route => {
    const u = new URL(route.request().url());
    if(blockedModule&&u.pathname.endsWith('/analitica-mi.js'))return route.abort();
    if (u.hostname==='gc.zgo.at') return blocked ? route.abort() : route.fulfill({body:fs.readFileSync(path.join(root,'scripts/goatcounter-test-fixture.js')),contentType:'application/javascript'});
    if (u.hostname==='srigual.goatcounter.com') { hits.push(Object.fromEntries(u.searchParams)); return route.fulfill({body:'',contentType:'image/gif'}); }
    if (!['mi.test','localhost'].includes(u.hostname)) return route.abort();
    const f = path.resolve(root,'.'+decodeURIComponent(u.pathname));
    if (!f.startsWith(root+path.sep)||!fs.existsSync(f)) return route.abort();
    return route.fulfill({body:fs.readFileSync(f),contentType:f.endsWith('.html')?'text/html':f.endsWith('.js')?'application/javascript':f.endsWith('.json')?'application/json':f.endsWith('.css')?'text/css':'application/octet-stream'});
  });
  async function settle() { await p.waitForTimeout(300); }
  async function go(url) { hits=[]; errors=[]; await p.bringToFront();await p.goto(url); await settle(); assert.deepEqual(errors,[],url); }
  const events = () => hits.filter(x=>x.e==='true');
  const visits = () => hits.filter(x=>x.e!=='true');
  for (let c=1;c<=4;c++) for (const sense of senses) {
    if(process.argv.includes('--extras-only'))continue;
    console.log('Checking',c+'eso',sense);
    const url=`https://mi.test/${c}eso/sentit-${sense}.html`;
    await go(url+'?opcio=B&secret=PRIVATE#PRIVATE');
    assert.equal(visits().length,1,url+' visit');
    assert.equal(visits()[0].p,`/${c}eso/sentit-${sense}.html`);
    const info = await p.evaluate(() => ({ids:TOPICS.filter(t=>t['exam'+({'1eso':'1r','2eso':'2n','3eso':'3r','4eso':'4t'}[location.pathname.split('/')[1]])]===true).map(t=>t.id)}));
    const id = info.ids[0]; assert(id,url+' core topic');
    console.log('  practice',id);
    await p.evaluate(id => {
      const s=typeof ST!=='undefined'?ST:state;
      s.currentTopic=TOPICS.findIndex(t=>t.id===id);s.level=1;s.mode='choice';
      if(typeof startP==='function')startP();else startPractice();
    },id);
    await settle();
    const startEvents=events().filter(e=>e.p.includes('/started/')||/^\deso-numeric-/.test(e.p));
    assert.equal(startEvents.length,1,url+' start');
    if(c===4&&['mesura','estocastic'].includes(sense)) {
      await p.evaluate(()=>showNextHint());await settle();
    }
    assert(events().some(e=>e.p.includes('/hint/')),url+' displayed hints');
    // Use the actual correction engine; no student answer leaves the browser.
    await p.evaluate(() => {
      if(typeof processPracticeAnswer==='function') {processPracticeAnswer(false,'PRIVATE');processPracticeAnswer(false,'PRIVATE');}
      else if(typeof processAnswer==='function') {processAnswer(false,'PRIVATE');processAnswer(false,'PRIVATE');}
      else { const i=currentEx.options.findIndex(x=>x!==currentEx.correct);selectAnswer(i,document.querySelector('.opt-btn')); }
    });
    await settle();
    assert.equal(events().filter(e=>e.p.includes('/answered/')&&e.p.includes('/incorrect')).length,1,url+' correction dedupe');
    await p.evaluate(()=>document.addEventListener('click',e=>{if(e.target.closest('.ko a'))e.preventDefault();},true));
    await p.locator('.ko a[href*="teoria"]').first().click();await settle();
    assert.equal(events().filter(e=>e.p.includes('/theory-error/')).length,1,url+' error to theory');
    await p.evaluate(() => {
      if(typeof showEx==='function')showEx();else showExercise();
      if(typeof processPracticeAnswer==='function')processPracticeAnswer(true,'PRIVATE');
      else if(typeof processAnswer==='function')processAnswer(true,'PRIVATE');
      else {const i=currentEx.options.findIndex(x=>x===currentEx.correct);selectAnswer(i,document.querySelector('.opt-btn'));}
      if(typeof markDone==='function'){markDone();markDone();}else{markTopicDone();markTopicDone();}
    });
    await settle();
    assert.equal(events().filter(e=>e.p.includes('/answered/')&&e.p.includes('/correct')).length,1,url+' correct');
    assert.equal(events().filter(e=>e.p.includes('/completed/')).length,1,url+' complete');
    // Per-topic engine: real start and submit buttons, restart is a fresh execution.
    console.log('  topic exam');
    await p.evaluate(id=>miTopicExam.start(id),id); await settle();
    await p.getByRole('button',{name:'Lliurar l’examen',exact:true}).click();
    await p.evaluate(()=>document.querySelector('[data-action="submit"]')?.click());await settle();
    assert.equal(events().filter(e=>e.p.startsWith('mi/topic-exam/started/')).length,1,url+' topic start');
    assert.equal(events().filter(e=>e.p.startsWith('mi/exam/submitted/')).length,1,url+' topic submit');
    // Sense exam: original config and generator; advance actual final transition.
    console.log('  sense exam');
    await p.evaluate(() => {miExamSelectAll();miStartConfiguredExam();});await settle();
    assert.equal(events().filter(e=>e.p.startsWith('mi/sense-exam/started/')).length,1,url+' sense start');
    await p.evaluate(() => {
      const s=typeof ST!=='undefined'?ST:state;s.examIdx=s.examQs.length-1;
      if(typeof nextEQ==='function')nextEQ();else nextExamQ();
    });await settle();
    assert.equal(events().filter(e=>e.p.startsWith('mi/sense-exam/submitted/')).length,1,url+' sense submit');
    assert.equal(visits().length,1,url+' interactions must not create pageviews');
    assert(!JSON.stringify(hits).includes('PRIVATE'),url+' privacy');
    assert.deepEqual(errors,[],url+' runtime');
    results.combinations.push({course:c,sense,option:c===4?'B':null,practice:true,topicExam:true,senseExam:true});
    console.log(c+'eso '+sense+': OK');
  }
  for (const url of ['https://mi.test/index.html','https://mi.test/1eso/index.html','https://mi.test/2eso/index.html','https://mi.test/3eso/index.html','https://mi.test/4eso/index.html','https://mi.test/1eso/teoria/numeric/index.html']) {
    await go(url);assert.equal(visits().length,1,url);
    await p.evaluate(()=>{document.dispatchEvent(new Event('visibilitychange'));document.dispatchEvent(new Event('visibilitychange'));});await settle();assert.equal(visits().length,1);
    if(!url.includes('teoria')) {
      await p.evaluate(()=>{
        const form=document.querySelector('[data-demo-form]'),input=form.elements.answer;
        input.value=input.tagName==='SELECT'?input.options[1].value:'-99999';
        form.requestSubmit();form.requestSubmit();
      });await settle();
      assert.equal(events().filter(e=>e.p.startsWith('mi/demo/answered/')).length,1,url+' demo dedupe');
    }
  }
  // Search: no keystroke counts, no free text, fixed context and destination.
  const catalogue=JSON.parse(fs.readFileSync(path.join(root,'assets/data/index-cerca.json'),'utf8'));
  for (let c=0;c<=4;c++) {
    await go('https://mi.test/'+(c?c+'eso/':'')+'index.html');
    const input=p.locator('[data-mi-search] input');
    await input.fill('PRIVATE_NOT_A_TOPIC');await settle();assert.equal(events().length,0);
    await p.waitForTimeout(1100);
    assert.equal(events().filter(e=>e.p===`mi/search/query/${c?c+'eso':'general'}/no-results`).length,1);
    await input.dispatchEvent('input');await p.waitForTimeout(1100);assert.equal(events().length,1);
    const entry=catalogue.find(e=>!c||e.course===c);
    await input.fill(entry.title);await p.waitForTimeout(1100);
    await p.evaluate(()=>document.addEventListener('click',e=>{if(e.target.closest('[data-search-results] a'))e.preventDefault();},true));
    for (const dest of ['theory','practice','exam']) {
      const label={theory:'Veure teoria',practice:'Practicar',exam:'Examen'}[dest];
      await p.locator('[data-search-results] a').filter({hasText:label}).first().click();await settle();
      assert.equal(events().filter(e=>e.p.startsWith(`mi/search/${dest}/${c?c+'eso':'general'}/`)).length,1);
    }
    assert(!JSON.stringify(hits).includes('PRIVATE'));assert.equal(visits().length,1);
  }
  // Actual open-session engines and their distinct activity prefix.
  for (const sense of senses) {
    await go('https://mi.test/1eso/sentit-'+sense+'.html');
    await p.evaluate(sense=>{
      if(sense==='numeric'){ampStartSession();ampShowHint();document.getElementById('ampFinalAns').value='PRIVATE';ampCheckAnswer();ampCheckAnswer();ampShowResults();ampShowResults();}
      if(sense==='mesura'){startOpenProblems(5);toggleOpenHint();document.getElementById('openFinal').value='PRIVATE';checkOpenProblem();checkOpenProblem();OPENM.idx=OPENM.queue.length-1;nextOpenProblem();}
      if(sense==='algebraic'){startAlgebraProblems();algStartOpenSession();algToggleHint();document.getElementById('algOpenInput').value='PRIVATE';algCheckOpen();algCheckOpen();algRenderOpenResult();algRenderOpenResult();}
      if(sense==='espacial'){spStartSession();spToggleHint();document.getElementById('spOpenAnswer').value='PRIVATE';spCheckAnswer();spCheckAnswer();spShowResult();spShowResult();}
      if(sense==='estocastic'){startStochasticProblems();stStartOpenSession();stToggleHint();const inp=document.getElementById('stOpenInput');if(inp)inp.value='PRIVATE';stCheckOpen();stCheckOpen();stRenderOpenResult();stRenderOpenResult();}
    },sense);await settle();
    const activity=sense==='numeric'?'extension':'open';
    for(const action of ['started','answered','completed'])assert.equal(events().filter(e=>e.p.startsWith(`mi/${activity}/${action}/`)).length,1,sense+' '+action);
    assert(events().some(e=>e.p.startsWith(`mi/${activity}/hint/`)),sense+' hint');
    assert(!JSON.stringify(hits).includes('PRIVATE'));
  }
  for(const sense of senses) {
    await go(`https://mi.test/4eso/sentit-${sense}.html?opcio=A`);
    await p.evaluate(()=>{state.currentTopic=0;state.level=2;startPractice();processAnswer(false,'PRIVATE');});await settle();
    const answers=events().filter(e=>e.p.includes('/answered/'));assert.equal(answers.length,1);assert(answers.every(e=>e.p.endsWith('/A')&&e.p.includes('/autonom/')));
  }
  blocked=true;await go('https://mi.test/3eso/sentit-espacial.html');
  await p.evaluate(()=>{state.currentTopic=0;startPractice();processAnswer(true,'PRIVATE');miTopicExam.start(TOPICS.find(t=>t.exam3r).id);});
  await p.getByRole('button',{name:'Lliurar l’examen',exact:true}).click();
  assert(await p.evaluate(()=>miTopicExam.getSession().finished));assert.equal(hits.length,0);assert.deepEqual(errors,[]);
  blocked=false;
  blockedModule=true;await go('https://mi.test/3eso/sentit-espacial.html');
  await p.evaluate(()=>{state.currentTopic=0;startPractice();processAnswer(true,'PRIVATE');miTopicExam.start(TOPICS.find(t=>t.exam3r).id);});
  await p.getByRole('button',{name:'Lliurar l’examen',exact:true}).click();
  assert(await p.evaluate(()=>miTopicExam.getSession().finished));assert.equal(hits.length,0);assert.deepEqual(errors,[]);blockedModule=false;
  await go('https://localhost/2eso/sentit-numeric.html');await p.evaluate(()=>{state.currentTopic=0;startPractice();});await settle();assert.equal(hits.length,0);
  await go('https://mi.test/2eso/sentit-numeric.html');await p.evaluate(()=>localStorage.setItem('skipgc','t'));
  await go('https://mi.test/2eso/sentit-numeric.html');await p.evaluate(()=>{state.currentTopic=0;startPractice();});await settle();assert.equal(hits.length,0);
  results.checks.push('5 home pages and theory landing page','5 search contexts, debounce, no results and 3 destinations','5 standalone open/extension engines','4eso A autonomous; B guided in the main run','blocked client or shared module: teaching works','localhost and skipgc exclusions','no free text; no additional pageviews');
  if(results.pages)results.checks.unshift('all public HTML: one loader and JS syntax');
  if(results.combinations.length)results.checks.unshift('20 real practice/topic/sense exam engines');
  fs.writeFileSync(path.join(root,process.argv.includes('--extras-only')?'scripts/resultats-analitica-uniforme-extres.json':'scripts/resultats-analitica-uniforme.json'),JSON.stringify(results,null,2));
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
