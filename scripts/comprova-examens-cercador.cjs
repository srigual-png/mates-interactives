const fs=require('fs'),path=require('path'),assert=require('assert');
const {generate,playwright,launchOptions}=require('./genera-examens-cerca.cjs');
const root=path.resolve(__dirname,'..');
const file=p=>{const [name,query]=p.split('?');const url=require('url').pathToFileURL(path.join(root,name));url.search=query||'';return url.href;};
(async()=>{
 let entries=await generate();
 assert.equal(entries.filter(e=>e.exam).length,7);
 const component=path.join(root,'assets/js/examen-tema.js'),original=fs.readFileSync(component);
 try {
   // A new eligible topic reuses a proven real generator (including all levels).
   // No search code or catalogue is edited; change only the exam implementation.
   let source=original.toString().replace("'mcmmcd'];", "'mcmmcd', 'naturals'];");
   source=source.replace('const numeric =', "const fixture=topics.find(t=>t.id==='naturals'); if(fixture) fixture.gen=topics.find(t=>t.id==='jerarquia').gen;\n  const numeric =");
   assert.notEqual(source,original.toString());fs.writeFileSync(component,source);
   const future=await generate();
   assert.equal(future.filter(e=>e.exam).length,8);
   assert(future.find(e=>e.theory.endsWith('nombres-naturals-bloc-1r-eso.html')).exam.includes('tema=naturals'));
 } finally {fs.writeFileSync(component,original);entries=await generate();}
 const browser=await playwright().chromium.launch(launchOptions());
 try {
   const page=await browser.newPage(),errors=[];
   page.on('pageerror',e=>errors.push(e.message));
   await page.route(/^https?:/,r=>r.abort());
   for(const width of [1280,390]) {
     await page.setViewportSize({width,height:844});
     for(const entry of entries.filter(e=>e.exam)) {
       await page.goto(file('index.html'));
       await page.locator('#mi-search-input').fill(entry.title);
       const card=page.locator('[data-search-results] li').filter({has:page.getByRole('heading',{name:entry.title,exact:true})}).filter({hasText:'1r ESO'});
       const exam=card.getByRole('link',{name:/^Examen:/});
       await exam.waitFor();assert.equal(await exam.getAttribute('href'),file(entry.exam));
       assert.equal(await card.getByRole('link',{name:/^Veure teoria:/}).getAttribute('href'),file(entry.theory));
       assert.equal(await card.getByRole('link',{name:/^Practicar:/}).getAttribute('href'),file(entry.practice));
       assert(await exam.isVisible());
       assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
       if(entry.exam.includes('tema=ops&')) await page.locator('.mi-search').screenshot({path:path.join(root,`scripts/examens-cercador-${width}.png`)});
       await exam.click();await page.waitForSelector('#miTopicExam.active');
       assert.equal(await page.evaluate(()=>miTopicExam.getSession().questions.length),12);
       assert.equal(await page.evaluate(()=>miTopicExam.getSession().topic.id),new URL(examUrl(entry)).searchParams.get('tema'));
     }
   }
   await page.goto(file('index.html'));await page.locator('#mi-search-input').fill('Nombres naturals');
   await page.locator('[data-search-results] li').first().waitFor();assert.equal(await page.locator('.mi-search__exam').count(),0);
   // Serve a production-shaped origin through interception to exercise analytics.
   await page.route('https://mi.test/**',route=>{
     let p=decodeURIComponent(new URL(route.request().url()).pathname).slice(1)||'index.html';
     const full=path.join(root,p);
     if(!fs.existsSync(full)) return route.fulfill({status:404,body:''});
     route.fulfill({body:fs.readFileSync(full),contentType:p.endsWith('.js')?'text/javascript':p.endsWith('.css')?'text/css':p.endsWith('.json')?'application/json':'text/html'});
   });
   await page.addInitScript(()=>{window.examEvents=[];window.goatcounter={count:e=>window.examEvents.push(e)};});
   await page.goto('https://mi.test/index.html');await page.locator('#mi-search-input').fill('Jerarquia');
   const link=page.locator('.mi-search__exam');await link.waitFor();
   // Avoid navigation so the timer and click events can be inspected together.
   await link.evaluate(a=>a.addEventListener('click',e=>e.preventDefault()));
   await link.click();await page.waitForTimeout(1150);
   const events=await page.evaluate(()=>window.examEvents.filter(e=>e.path.startsWith('mi/search/exam/')));
   assert.equal(events.length,1);assert(events[0].path.includes('/general/1eso/teoria/numeric/jerarquia-'));
   assert.deepEqual(errors,[]);
   console.log('OK: 7 exàmens, alta temporal 8 i retirada, enllaços, 1280/390 px, temes sense examen, GoatCounter únic, cap error JS.');
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
function examUrl(entry){return new URL(entry.exam,'https://mi.test/').href;}
