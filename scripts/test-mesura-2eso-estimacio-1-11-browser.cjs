#!/usr/bin/env node
'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {chromium}=require('playwright-core');
const base=process.env.MI_URL||'http://127.0.0.1:8765/2eso/sentit-mesura.html';
const out=path.join(__dirname,'..','artifacts','mesura-estimacio-ui');
fs.mkdirSync(out,{recursive:true});
const cases=[{id:1,label:'estimacio-1'},{id:11,label:'estimacio-11'},{id:12,label:'estimacio-12'}];
const openCases=[
 {topic:'unitats',id:1,label:'unitats-1'},
 {topic:'escales',id:1,label:'escales-1'},
 {topic:'pitagores',id:2,label:'pitagores-2'},
 {topic:'perimetres',id:4,label:'perimetres-4'},
 {topic:'superficies',id:1,label:'superficies-1'},
 {topic:'estimacio',id:6,label:'estimacio-6'},
 {topic:'problemes',id:3,label:'problemes-3'}
];
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
   await page.waitForFunction(()=>typeof genEstimacioError2ESO==='function'&&typeof genUnitats2ESO==='function'&&typeof genProblemesMesura2ESO==='function'&&typeof showExercise==='function'&&typeof renderExamQ==='function',{timeout:20000});
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
   for(const item of openCases){
    const info=await page.evaluate(item=>{
     const generators={unitats:genUnitats2ESO,escales:genEscales2ESO,pitagores:genPitagores2ESO,perimetres:genPerimetresArees2ESO,superficies:genSuperficiesVolums2ESO,estimacio:genEstimacioError2ESO,problemes:genProblemesMesura2ESO};
     const idx=TOPICS.findIndex(t=>t.id===item.topic&&t.course==='2n');
     if(idx<0||!generators[item.topic])throw Error('Missing topic generator '+item.topic);
     const ex=generators[item.topic](item.id);
     if(ex.allowOpen===false)throw Error('Expected an open-answer example: '+item.label);
     state.currentTopic=idx;state.mode='open';state.level=1;TOPICS[idx].gen=()=>ex;showExercise();
     return {correct:ex.correct,question:ex.question,allowOpen:ex.allowOpen};
    },item);
    assert(info.allowOpen!==false,item.label+' supports open answer');
    assert(await page.locator('#openWrap').isVisible(),item.label+' guided open input visible');
    assert(await page.locator('#guideSteps').isVisible(),item.label+' guided hints visible');
    await page.screenshot({path:path.join(out,viewport.name+'-'+item.label+'-guiat-obert.png'),fullPage:true});
    await page.locator('#openInput').fill(info.correct);
    await page.locator('#openWrap .btn-check').click();
    assert((await page.locator('#feedbackArea').innerText()).includes('Correcte'),item.label+' guided open answer accepted');

    await page.evaluate(()=>{state.level=2;showExercise()});
    assert(await page.locator('#openWrap').isVisible(),item.label+' autonomous open input visible');
    assert.equal(await page.locator('#guideSteps').isVisible(),false,item.label+' autonomous hints hidden');
    await page.locator('#openInput').fill(info.correct);
    await page.locator('#openWrap .btn-check').click();
    assert((await page.locator('#feedbackArea').innerText()).includes('Correcte'),item.label+' autonomous open answer accepted');

    await page.evaluate(item=>{
     const generators={unitats:genUnitats2ESO,escales:genEscales2ESO,pitagores:genPitagores2ESO,perimetres:genPerimetresArees2ESO,superficies:genSuperficiesVolums2ESO,estimacio:genEstimacioError2ESO,problemes:genProblemesMesura2ESO};
     const idx=TOPICS.findIndex(t=>t.id===item.topic&&t.course==='2n'),ex=generators[item.topic](item.id);
     state.examQs=[{...ex,topicName:TOPICS[idx].name}];state.examIdx=0;
     const originalRandom=Math.random;Math.random=()=>0;
     try{renderExamQ()}finally{Math.random=originalRandom}
     showScreen('screenExam');
    },item);
    assert(await page.locator('#examOpenWrap').isVisible(),item.label+' exam open input visible');
    await page.screenshot({path:path.join(out,viewport.name+'-'+item.label+'-examen-obert.png'),fullPage:true});
    await page.locator('#examOpenInput').fill(info.correct);
    await page.locator('#examOpenWrap .btn-check').click();
    assert((await page.locator('#examFeedback').innerText()).includes('Correcte'),item.label+' exam open answer accepted');
    const layout=await page.evaluate(()=>({width:document.documentElement.clientWidth,scrollWidth:document.documentElement.scrollWidth}));
    assert(layout.scrollWidth<=layout.width+5,item.label+' horizontal overflow '+JSON.stringify(layout));
    results.push({viewport:viewport.name,topic:item.topic,type:item.id,guided_open:'pass',autonomous_open:'pass',exam_open:'pass',correct_answer_accepted:true,responsive_overflow:'none'});
   }
   if(errors.length)throw new Error('Browser JS errors: '+errors.slice(0,5).join('; '));
   await context.close();
  }
 }finally{await browser.close()}
 console.log(JSON.stringify({mode:'real Chromium browser',cases:results,screenshots:results.length*2},null,2));
}
run().catch(err=>{console.error(err);process.exitCode=1});
