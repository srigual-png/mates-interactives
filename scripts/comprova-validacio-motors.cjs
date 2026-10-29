const fs=require('fs'),path=require('path'),assert=require('assert/strict'),{pathToFileURL}=require('url');
const {playwright,launchOptions}=require('./genera-examens-cerca.cjs');
(async()=>{const browser=await playwright().chromium.launch(launchOptions()),results=[];try{
const page=await browser.newPage();await page.route(/^https?:/,r=>r.abort());
for(let course=1;course<=4;course++)for(const sense of ['numeric','mesura','espacial','algebraic','estocastic']){
const file=`${course}eso/sentit-${sense}.html`;await page.goto(pathToFileURL(path.resolve(file)).href);
const row=await page.evaluate(({course,sense})=>{
 const check=(ok,msg)=>{if(!ok)throw Error(msg);},st=typeof ST!=='undefined'?ST:state;
 const ensure=(id,tag='div')=>{let e=document.getElementById(id);if(!e){e=document.createElement(tag);e.id=id;document.body.append(e);}return e;};
 // Use the real submission controllers and score/log functions with a deterministic question.
 for(const id of ['examOpenInput','examOpenAns','examOpenAnswer','spExamAnswer']){const e=ensure(id,'input');e.disabled=false;e.value='2/4';}
 for(const id of ['examFeedback','examF','examOpenCheck','btnNextExam','bNExam','examOpenProblem','examOpenWrap'])ensure(id);
 const q={correct:'1/2',alts:[],question:'Calcula el valor.',topicId:TOPICS[0].id,topicName:TOPICS[0].name,type:1,solution:[],guide:[],hint:[],options:[],isOpenProblem:true,examProblem:true,examOpen:true,validator:'number',answer:{val:'1/2',check:()=>false},answerCheck:()=>false};
 st.examQs=[q];st.examIdx=0;st.examScore=0;st.examLog=[];st.examAnswers=[];
 const submit=course===1?(sense==='numeric'||sense==='mesura'?checkExamOpenAnswer:sense==='espacial'?submitSpatialExamProblem:sense==='estocastic'?checkExamOpenProblem:checkExamOpen):checkExamOpen;
 submit();check(st.examScore===1,'Equivalent exam answer rejected');const log=JSON.stringify([st.examLog,st.examAnswers]);submit();check(st.examScore===1,'Duplicate exam score');check(log===JSON.stringify([st.examLog,st.examAnswers]),'Duplicate exam log');
 let openProblemChecked=false;
 if(course===1){
  let calls=0;const original=window.MIAnalytics.answer;window.MIAnalytics.answer=()=>{calls++;};
  const p={...q,answer:{val:'1/2',check:()=>false},steps:[],hints:[],text:'Calcula el valor.',family:'test',patternId:'test'};
  if(sense==='numeric'){
   ampSession={probs:[p],idx:0,results:[],hintUsed:false};
   const field=ensure('ampFinalAns','input');field.value='2/4';field.disabled=false;field.className='final-input';ensure('sAmpProb').append(field);
   for(const id of ['ampFbArea','ampActionRow','ampBtnNext'])ensure(id);ampCheckAnswer();ampCheckAnswer();check(ampSession.results.length===1&&ampSession.results[0].ok,'Open numeric score');
  }else if(sense==='mesura'){
   OPENM={queue:[p],idx:0,results:[],hint:false};const field=ensure('openFinal','input');field.value='2/4';field.disabled=false;for(const id of ['openCheck','openFeedback'])ensure(id);checkOpenProblem();checkOpenProblem();check(OPENM.results.length===1&&OPENM.results[0].ok,'Open measure score');
  }else if(sense==='espacial'){
   spSession={problems:[p],idx:0,answered:false,correct:0};const field=ensure('spOpenAnswer','input');field.value='2/4';field.disabled=false;for(const id of ['spOpenCheck','spOpenNext','spOpenFeedback'])ensure(id);spCheckAnswer();spCheckAnswer();check(spSession.correct===1,'Open spatial score');
  }else if(sense==='algebraic'){
   algOpenSession={problems:[p],idx:0,answered:false,correct:0};const field=ensure('algOpenInput','input');field.value='2/4';field.disabled=false;for(const id of ['algOpenCheck','algOpenNext','algOpenFeedback'])ensure(id);algCheckOpen();algCheckOpen();check(algOpenSession.correct===1,'Open algebra score');
  }else{
   stOpenSession={problems:[{...p,kind:'input'}],idx:0,answered:false,correct:0};const field=ensure('stOpenInput','input');field.value='2/4';field.disabled=false;for(const id of ['stOpenCheck','stOpenNext','stOpenFeedback'])ensure(id);stCheckOpen();stCheckOpen();check(stOpenSession.correct===1,'Open stochastic score');
  }
  check(calls===1,'Duplicate open-problem analytic event');window.MIAnalytics.answer=original;openProblemChecked=true;
 }
 const topic=miTopicExam.getTopics()[0];check(!!topic,'No topic exam available');
 miTopicExam.start(topic.id);const session=miTopicExam.getSession();check(session.questions.length===12,'Topic exam question count');
 session.questions.forEach((question,i)=>{session.answers[i]=question.options.findIndex(option=>String(option)===String(question.correct));check(session.answers[i]>=0,'Topic exam correct option missing');});
 const submitButton=document.querySelector('#miTopicExam [data-action="submit"]');check(!!submitButton,'Topic exam submit missing');submitButton.click();check(miTopicExam.getSession().finished,'Topic exam not finished');check(miTopicExam.getSession().result.percent===100,'Topic exam scoring changed');
 // Multiple choice remains a literal option comparison: shared validation never intercepts it.
 check(typeof MIValidation.validate==='function','Shared validator absent');
 return {examEquivalent:true,examSingleScore:true,examSingleLog:true,topicExamChecked:true,openProblemChecked};
},{course,sense});results.push({file,...row});console.log(file+' exam OK');
}
fs.writeFileSync(path.resolve('scripts/resultats-validacio-motors.json'),JSON.stringify(results,null,2));
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
