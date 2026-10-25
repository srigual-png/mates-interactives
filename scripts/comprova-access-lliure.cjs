const fs=require('fs'),path=require('path'),assert=require('assert');
const {pathToFileURL}=require('url');
const {playwright,launchOptions}=require('./genera-examens-cerca.cjs');
const root=path.resolve(__dirname,'..');
(async()=>{
 const browser=await playwright().chromium.launch(launchOptions()),results=[];
 const context=await browser.newContext();
 await context.route(/^https?:/,r=>r.abort());
 const page=await context.newPage(),errors=[];let currentFile='';
 page.setDefaultNavigationTimeout(120000);
 page.on('pageerror',e=>errors.push(e.message));
 if(process.env.MI_ACCESS_DEBUG)page.on('console',msg=>console.log(currentFile,msg.text()));
 const evaluate=page.evaluate.bind(page);
 page.evaluate=async(...args)=>{
  let timer;
  try{return await Promise.race([evaluate(...args),new Promise((_,reject)=>{timer=setTimeout(()=>{const error=Error(currentFile+' evaluation timeout: '+String(args[0]).slice(0,160));console.error(error.message);reject(error);},120000);})]);}
  finally{clearTimeout(timer);}
 };
 try{
  for(let course=1;course<=4;course++)for(const sense of ['numeric','algebraic','espacial','mesura','estocastic'])for(const option of course===4?['A','B']:['']){
   const file=`${course}eso/sentit-${sense}.html`;
   if(process.env.MI_ACCESS_PAGE&&!file.includes(process.env.MI_ACCESS_PAGE))continue;
   currentFile=file;errors.length=0;
   const url=pathToFileURL(path.join(root,file));if(option)url.searchParams.set('opcio',option);
   await page.goto(url.href,{waitUntil:'domcontentloaded'});
   await page.evaluate(()=>{localStorage.clear();sessionStorage.clear();});
   await page.reload({waitUntil:'domcontentloaded'});
   const ids=await page.evaluate(()=>TOPICS.map(t=>t.id));
   assert(ids.length,file);
   assert.equal(await page.locator('.locked,.lk,.unlock-panel,.unlock-launch,[onclick*="toggleUnlock"]').count(),0,file);
   const keys=await page.evaluate(()=>{
    const st=typeof ST!=='undefined'?ST:state;
    const save=typeof saveST==='function'?saveST:saveState;save();
    return [...new Set([...Object.keys(localStorage),...Object.keys(sessionStorage)])].filter(k=>{
     try{return JSON.parse(localStorage.getItem(k)||sessionStorage.getItem(k))?.done;}catch{return false;}
    });
   });
   // Exercise legacy data migration, with locked access and a completed last topic.
   await page.evaluate(({keys,id})=>{for(const store of [localStorage,sessionStorage])for(const key of keys)store.setItem(key,JSON.stringify({done:[id],errors:[],unlockedIds:[],unlocked:0,keep:'preserved'}));},{keys,id:ids.at(-1)});
   await page.reload({waitUntil:'domcontentloaded'});
   const migrated=await page.evaluate(keys=>{
    const st=typeof ST!=='undefined'?ST:state;
    return {done:st.done,stores:keys.flatMap(k=>[localStorage,sessionStorage].map(store=>JSON.parse(store.getItem(k)||'null')).filter(Boolean))};
   },keys);
   assert(migrated.done.includes(ids.at(-1)),file+' completion retained');
   for(const data of migrated.stores){assert(!('unlockedIds'in data)&&!('unlocked'in data),file+' migration');assert.equal(data.keep,'preserved',file+' unrelated data');}
   // Every topic must open from the homepage without a search/deep-link side effect.
   const activities=await page.evaluate(()=>TOPICS.map((topic,i)=>{
     console.debug('access-topic',topic.id);
     if(typeof showHome==='function')showHome();
     (typeof selTopic==='function'?selTopic:selectTopic)(i);
     (typeof startP==='function'?startP:startPractice)();
     const st=typeof ST!=='undefined'?ST:state,ex=typeof currentEx!=='undefined'?currentEx:curEx;
     const screen=document.querySelector('.screen.active');
     return {id:TOPICS[st.currentTopic].id,question:ex?.question||ex?.q,screen:screen?.id};
    }));
   for(let i=0;i<ids.length;i++){
    const actual=activities[i];
    assert.equal(actual.id,ids[i],file);assert(actual.question,file+' '+ids[i]);assert(/^(sEx|screenExercise)$/.test(actual.screen),JSON.stringify(actual));
   }
   // Real correction handlers: one incorrect response must save an error, followed by a correct response.
   await page.evaluate(()=>{
    const st=typeof ST!=='undefined'?ST:state;st.mode='multi';st.level=1;
    (typeof selTopic==='function'?selTopic:selectTopic)(0);
    (typeof startP==='function'?startP:startPractice)();
   });
   for(const correct of [false,true]){
    if(correct)await page.evaluate(()=>(typeof startP==='function'?startP:startPractice)());
    const answer=await page.evaluate(correct=>{
     const ex=typeof currentEx!=='undefined'?currentEx:curEx;
     const index=ex.options.findIndex(o=>(String(o)===String(ex.correct))===correct);
     const buttons=[...document.querySelectorAll('#optionsGrid button,#og button,#optionsArea button')];
     if(index>=0&&buttons[index])buttons[index].click();
     else{
      const input=document.getElementById('openInput');
      if(!input)throw Error('No answer input');
      input.value=correct?String(ex.correct):'__incorrect__';
      input.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',bubbles:true,cancelable:true}));
     }
     const st=typeof ST!=='undefined'?ST:state;
     return {answered:st.answered,errors:Array.isArray(st.errors)?st.errors.length:Object.values(st.errors).flat().length,streak:st.correctStreak??st.streak};
    },correct);
    assert(answer.answered,file+' correction');assert(correct?answer.streak>0:answer.errors>0,file+' result');
   }
   // A saved error on a core topic must never break homepage rendering.
   await page.evaluate(()=>showHome());
   await page.reload({waitUntil:'domcontentloaded'});
   const home=await page.evaluate(()=>{
    const st=typeof ST!=='undefined'?ST:state;
    return {cards:document.querySelectorAll('#topicsGrid .topic-card,#tGrid .tc').length,topicCards:document.querySelectorAll('#topicsGrid .topic-card[onclick^="selectTopic("]').length,expected:TOPICS.length,errors:Array.isArray(st.errors)?st.errors.length:Object.values(st.errors).flat().length};
   });
   assert(home.cards>0&&home.errors>0,file+' homepage with saved errors');
   assert.equal(await page.locator('[onclick="resetProgress()"],#btnReset,#btnResetProgress').count(),0,file+' no reset');
   if(file==='1eso/sentit-mesura.html'){
    assert.equal(home.topicCards,home.expected,'Mesura 1r: every topic rendered with saved errors');
    await page.locator('#topicsGrid').screenshot({path:path.join(root,'scripts/mesura-1eso-restaurada.png')});
   }
   const exams=await page.evaluate(()=>{
    if(!window.miTopicExam)throw Error('Missing topic exam API');
    const topics=miTopicExam.getTopics();
    return {ids:topics.map(t=>t.id),sampleQuestions:topics.length?miTopicExam.build(topics[0]).length:0};
   });
   assert(exams.ids.length,file+' exams');assert.equal(exams.sampleQuestions,12,file+' 12 questions');
   await page.evaluate(()=>miOpenExamConfig());
   assert(await page.locator('.mi-exam-overlay.open').count(),file+' sense exam config');
   const exam=await page.evaluate(()=>{
    miExamSelectAll();miStartConfiguredExam();
    const st=typeof ST!=='undefined'?ST:state;
    return {questions:st.examQs.length,screen:document.querySelector('.screen.active')?.id};
   });
   assert.equal(exam.questions,20,file+' sense exam');assert(/^(sExam|screenExam)$/.test(exam.screen),file+' exam screen');
   assert.deepEqual(errors,[],file+' JS errors');
   results.push({file,option,topics:ids.length,exams:exams.ids.length,migration:true,correction:true});
   console.log(file+(option?' '+option:'')+': OK');
  }
 }finally{await Promise.race([browser.close(),new Promise(resolve=>{const timer=setTimeout(resolve,15000);timer.unref();})]);}
 fs.writeFileSync(path.join(root,'resultats-access-lliure.json'),JSON.stringify({pages:results.length,topicChecks:results.reduce((n,r)=>n+r.topics,0),results},null,2)+'\n');
})().catch(e=>{console.error(e);process.exit(1);});
