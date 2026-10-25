// Check actual deep-link state and rendered exercises at desktop/mobile sizes.
const fs=require('fs'),path=require('path'),assert=require('assert');
const {pathToFileURL}=require('url');
const {playwright,launchOptions}=require('./genera-examens-cerca.cjs');
const root=path.resolve(__dirname,'..');
(async()=>{
 const entries=JSON.parse(fs.readFileSync(path.join(root,'assets/data/index-cerca.json')));
 assert.equal(entries.length,231);
 const local=fs.readFileSync(path.join(root,'assets/data/index-cerca-local.js'),'utf8');
 assert.equal(local,'window.MICercaLocal = '+JSON.stringify(entries)+';\n');
 const browser=await playwright().chromium.launch(launchOptions());
 const results=[];
 try{
  await Promise.all([1280,390].map(async width=>{
   const context=await browser.newContext({viewport:{width,height:900},isMobile:width===390,hasTouch:width===390});
   await context.route(/^https?:/,r=>r.abort());
   const page=await context.newPage();
   page.setDefaultNavigationTimeout(120000);
   for(const e of entries.filter(e=>!process.env.MI_PRACTICE_PAGE||e.practice.startsWith(process.env.MI_PRACTICE_PAGE)))for(const mode of e.course===4?e.modes:[null]){
    const [file,query]=e.practice.split('?');
    const url=pathToFileURL(path.join(root,file));url.search=query;
    if(mode)url.searchParams.set('opcio',mode);
    const id=url.searchParams.get(e.course===1?'tema':'topic');assert(id,e.theory);
    await page.goto(url.href,{waitUntil:'domcontentloaded'});
    const actual=await page.evaluate(()=>{
     const s=typeof ST!=='undefined'?ST:state,t=TOPICS[s.currentTopic];
     const theory=typeof MI_THEORY_PAGES!=='undefined'?MI_THEORY_PAGES[t.id]:typeof THEORY_PAGES!=='undefined'?THEORY_PAGES[t.id]:typeof MI_NAV_THEORY_PAGES!=='undefined'?MI_NAV_THEORY_PAGES[t.id]:t.theoryPage;
     const screen=document.querySelector('.screen.active');
     const ex=typeof currentEx!=='undefined'?currentEx:typeof curEx!=='undefined'?curEx:null;
     return {id:t.id,theory:new URL(theory,location.href).pathname,screen:screen?.id,visible:!!screen&&getComputedStyle(screen).display!=='none',question:ex?.question||ex?.q};
    });
    assert.equal(actual.id,id,e.theory);
    assert.equal(decodeURIComponent(actual.theory),new URL(pathToFileURL(path.join(root,e.theory))).pathname,e.theory);
    assert(actual.visible&&/^(sEx|screenExercise)$/.test(actual.screen),JSON.stringify({e,actual}));
    assert(actual.question,JSON.stringify({e,actual}));
    results.push({width,theory:e.theory,mode,topic:id});
   }
   await context.close();console.log(`${width}px: totes les pràctiques verificades`);
  }));
  fs.writeFileSync(path.join(__dirname,'resultats-practica-cercador.json'),JSON.stringify({topics:entries.length,checks:results.length,results},null,2)+'\n');
 }finally{await Promise.race([browser.close(),new Promise(resolve=>{const timer=setTimeout(resolve,15000);timer.unref();})]);}
})().catch(e=>{console.error(e);process.exit(1)});
