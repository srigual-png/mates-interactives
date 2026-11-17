#!/usr/bin/env node
'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {chromium}=require('playwright-core');
const base=process.env.MI_URL||'http://127.0.0.1:8765/2eso/sentit-mesura.html';
const out=path.join(__dirname,'..','artifacts','mesura-estimacio-ui');
fs.mkdirSync(out,{recursive:true});
const cases=[{id:1,label:'estimacio-1'},{id:11,label:'estimacio-11'}];
async function run(){
 const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
 const results=[];
 try{
  for(const viewport of [{name:'desktop',width:1280,height:800},{name:'mobile',width:390,height:844}]){
   const context=await browser.newContext({viewport:{width:viewport.width,height:viewport.height},deviceScaleFactor:1});
   const page=await context.newPage();
   const errors=[];
   page.on('pageerror',err=>errors.push(String(err)));
   await page.goto(base,{waitUntil:'domcontentloaded',timeout:45000});
   await page.waitForFunction(()=>typeof genEstimacioError2ESO==='function'&&typeof showExercise==='function'&&typeof renderExamQ==='function',{timeout:20000});
   for(const item of cases){
    // Drive existing page functions, preserving actual rendering and actual user click events.
    const info=await page.evaluate(type=>{
     const idx=TOPICS.findIndex(t=>t.id==='estimacio'&&t.course==='2n');
     if(idx<0)throw Error('Missing estimation topic');
     state.currentTopic=idx;
     state.level=1;
     state.mode='multi';
     const ex=genEstimacioError2ESO(type);
     TOPICS[idx].gen=()=>ex;
     showExercise();
     return {correct:ex.correct,options:ex.options,question:ex.question,allowOpen:ex.allowOpen};
    },item.id);
    assert.equal(info.allowOpen,false);
    assert.equal(info.options.length,4);
    assert(info.options.includes(info.correct));
    await page.locator('#exQuestion').getByText('').count().catch(()=>{});
    assert(await page.locator('#exQuestion').innerText());
    assert(await page.locator('#guideSteps').isVisible());
    const options=page.locator('#optionsGrid .opt-btn');
    assert.equal(await options.count(),4);
    assert.equal(await page.locator('#openWrap').isVisible(),false);
    await page.screenshot({path:path.join(out,viewport.name+'-'+item.label+'-guiat.png'),fullPage:true});
    await options.nth(info.options.indexOf(info.correct)).click();
    assert((await page.locator('#feedbackArea').innerText()).includes('Correcte'));
    await page.evaluate(()=>{state.level=2;showExercise()});
    assert.equal(await page.locator('#guideSteps').isVisible(),false);
    assert.equal(await page.locator('#optionsGrid .opt-btn').count(),4);
    await page.locator('#optionsGrid .opt-btn').nth(info.options.findIndex(v=>v!==info.correct)).click();
    assert((await page.locator('#feedbackArea').innerText()).includes('No és correcte'));
    await page.evaluate(type=>{
     const ex=genEstimacioError2ESO(type);
     state.examQs=[{...ex,topicName:'Estimació, precisió i error'}];
     state.examIdx=0;
     renderExamQ();
     showScreen('screenExam');
    },item.id);
    assert.equal(await page.locator('#examOpenWrap').isVisible(),false);
    const examOptions=page.locator('#examOptions .opt-btn');
    assert.equal(await examOptions.count(),4);
    await page.screenshot({path:path.join(out,viewport.name+'-'+item.label+'-examen.png'),fullPage:true});
    const examChoice=await page.evaluate(()=>{const q=state.examQs[0];return q.options.indexOf(q.correct)});
    await examOptions.nth(examChoice).click();
    assert((await page.locator('#examFeedback').innerText()).includes('Correcte'));
    const layout=await page.evaluate(()=>({width:document.documentElement.clientWidth,scrollWidth:document.documentElement.scrollWidth}));
    assert(layout.scrollWidth<=layout.width+5,'Horizontal overflow '+JSON.stringify(layout));
    results.push({viewport:viewport.name,type:item.id,practice_guided:'pass',practice_unguided:'pass',exam:'pass',responsive_overflow:'none'});
   }
   if(errors.length)throw new Error('Browser JS errors: '+errors.slice(0,5).join('; '));
   await context.close();
  }
 }finally{await browser.close()}
 console.log(JSON.stringify({mode:'real Chromium browser',cases:results,screenshots:8},null,2));
}
run().catch(err=>{console.error(err);process.exitCode=1});
