const fs=require('fs'),path=require('path'),assert=require('assert/strict'),{pathToFileURL}=require('url');
const {playwright,launchOptions}=require('./genera-examens-cerca.cjs');
const base=process.env.MI_VALIDATION_BASE;
(async()=>{const browser=await playwright().chromium.launch(launchOptions()),results=[];try{
const page=await browser.newPage();await page.route('**/*',r=>(base?r.request().url().startsWith(base):r.request().url().startsWith('file:'))?r.continue():r.abort());
await page.addInitScript(()=>{window.goatcounter={count:()=>{}};});
for(let course=1;course<=4;course++){
 const file=`${course}eso/sentit-algebraic.html`,url=base?new URL(file,base).href:pathToFileURL(path.resolve(file)).href;
 await page.goto(url,{waitUntil:'domcontentloaded'});
 const result=await page.evaluate(()=>{
  const check=(ok,msg)=>{if(!ok)throw Error(msg);};
  const topicIndex=TOPICS.findIndex(t=>/expressions|polinom|monomi/.test(t.id));state.currentTopic=Math.max(0,topicIndex);state.level=1;state.exCount=1;state.mode='open';
  let calls=0;window.MIAnalytics.answer=()=>{calls++;};showScreen('screenExercise');
  const inputs=['-x','-X','- x','- X',' − X ','2X² + 3 X - 1'];
  for(const input of inputs){
   currentEx={question:'Simplifica el polinomi.',correct:input.includes('2X')?'2x^2+3x-1':'-x',alts:[],solution:[],guide:[],options:[],topicId:TOPICS[state.currentTopic].id};
   state.answered=false;state.correctStreak=0;const field=document.getElementById('openInput');field.disabled=false;field.value=input;
   const before=calls;checkOpen();check(field.classList.contains('ok'),'Rejected input '+input);check(state.correctStreak===1,'Missing score '+input);checkOpen();check(calls===before+1&&state.correctStreak===1,'Duplicate correction '+input);
  }
  check(!MIValidation.validate({correct:'x+X'},'2x').ok,'Distinct symbols collapsed');
  check(!MIValidation.validate({correct:'-x',validation:{caseSensitiveVariables:true}},'- X').ok,'Explicit case policy ignored');
  return {inputs:inputs.length,singleCorrections:inputs.length,distinctSymbolsPreserved:true};
 });results.push({file,...result});console.log(file+': uppercase X, unary minus and spaces OK');
}
fs.writeFileSync(path.resolve(base?'scripts/resultats-espais-majuscules-publicat.json':'scripts/resultats-espais-majuscules.json'),JSON.stringify(results,null,2)+'\n');
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});

