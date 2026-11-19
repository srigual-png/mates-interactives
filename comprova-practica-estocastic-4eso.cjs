const assert=require('assert'),path=require('path');
let chromium;try{({chromium}=require('playwright'));}catch(e){({chromium}=require('C:/Users/srigu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright'));}
const ids=['dadesVariables4t','taulesRepresentacions4t','comparacioDistribucions4t','estudisMostreig4t','nuvolsRelacio4t','regressioPrediccions4t','espaiMostralRecompte4t','experimentsCompostos4t','contingenciaBatx4t','correlacioBatx4t','condicionadaBatx4t'];
(async()=>{const browser=await chromium.launch({...((process.env.MI_BROWSER_PATH)?{executablePath:process.env.MI_BROWSER_PATH}:{}),headless:true});const page=await browser.newPage({viewport:{width:1280,height:900}});page.setDefaultTimeout(30000);await page.route(/^https?:/,r=>r.abort());const errors=[];page.on('pageerror',e=>errors.push(e.message));let checks=0,openSeen=0,hintSeen=0;
for(const id of ids)for(const mode of ['multi','open']){
 const url='file:///'+path.resolve('4eso/sentit-estocastic.html').replace(/\\/g,'/')+'?opcio=A&topic='+id;
 await page.goto(url);await page.locator('#screenIntro.active').waitFor();
 await page.evaluate(({id,mode})=>{const i=TOPICS.findIndex(t=>t.id===id);if(i<0)throw Error('Tema absent: '+id);setLevel(1);setMode(mode);selectTopic(i);startPractice();},{id,mode});
 await page.locator('#screenExercise.active').waitFor();
 // Seek a question with a guided hint; retain the first sample if none appears within the bounded sample.
 let foundHint=false;
 for(let attempt=0;attempt<40;attempt++){
   if(await page.evaluate(()=>Array.isArray(currentEx.guide)&&currentEx.guide.length>0)){foundHint=true;break;}
   await page.evaluate(()=>showExercise());
 }
 if(foundHint){await page.evaluate(()=>showNextHint());assert(await page.locator('#hintBox.show').count(),'La pista no s’ha mostrat ('+id+')');assert((await page.locator('#hintBox').innerText()).includes('Pista'),'Text de pista ('+id+')');hintSeen++;checks++;}
 const shape=await page.evaluate(()=>({open:document.getElementById('openWrap').style.display!=='none',allowOpen:currentEx.allowOpen!==false,mode:state.mode}));
 assert.equal(shape.mode,mode,'Mode seleccionat '+id);
 assert.equal(shape.open,mode==='open'&&shape.allowOpen,'Controls coherents '+id+' '+mode);
 if(shape.open)openSeen++;
 // Answer correctly through the control visible to the learner.
 if(shape.open){await page.locator('#openInput').fill(await page.evaluate(()=>String(currentEx.correct)));await page.evaluate(()=>checkOpenAnswer());}
 else {const i=await page.evaluate(()=>currentEx.options.findIndex(x=>x===currentEx.correct));assert(i>=0,'Opció correcta absent '+id);await page.locator('#optionsArea .opt-btn').nth(i).click();}
 assert(await page.evaluate(()=>state.answered),'No ha registrat la resposta correcta '+id+' '+mode);
 assert.equal(await page.locator('#feedbackArea .feedback-box.ok').count(),1,'Feedback correcte '+id+' '+mode);checks+=3;
 // A new question answered incorrectly must show the worked solution.
 await page.evaluate(()=>nextExercise());
 if(await page.evaluate(()=>state.mode==='open'&&currentEx.allowOpen!==false)){
   await page.locator('#openInput').fill('__resposta_incorrecta__');await page.evaluate(()=>checkOpenAnswer());
 }else{
   const i=await page.evaluate(()=>currentEx.options.findIndex(x=>x!==currentEx.correct));assert(i>=0,'Opció incorrecta absent '+id);await page.locator('#optionsArea .opt-btn').nth(i).click();
 }
 assert(await page.evaluate(()=>state.answered),'No ha registrat la resposta incorrecta '+id+' '+mode);
 assert.equal(await page.locator('#feedbackArea .feedback-box.ko').count(),1,'Feedback incorrecte '+id+' '+mode);
 assert((await page.locator('#feedbackArea .solution-box .step').count())>0,'Resolució pas a pas absent '+id+' '+mode);checks+=3;
 console.log(id+' '+mode+': control correcte, feedback d’encert/error i resolució pas a pas'+(foundHint?', pista visible':''));
}
assert(hintSeen>0,'No s’ha verificat cap pista guiada');assert(openSeen>0,'No s’ha verificat cap resposta oberta real');assert.deepEqual(errors,[],'Errors JS al navegador');await browser.close();console.log('TOTAL: '+checks+' comprovacions; 11 blocs × 2 modes de resposta; pistes guiades visibles en '+hintSeen+' casos; resposta oberta real en '+openSeen+' casos; sense errors JS.');})().catch(e=>{console.error(e);process.exit(1);});
