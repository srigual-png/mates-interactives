const fs=require('fs'),path=require('path'),assert=require('assert');
const {pathToFileURL}=require('url');
const {playwright,launchOptions}=require('./genera-examens-cerca.cjs');
const root=path.resolve(__dirname,'..');
(async()=>{
 const browser=await playwright().chromium.launch(launchOptions()),results=[];
 try{
  const context=await browser.newContext();await context.route(process.env.MI_AUDIT_BASE?/goatcounter|gc\.zgo\.at/i:/^https?:/,r=>r.abort());
  await context.addInitScript(()=>{let seed=20261029;Math.random=()=>{seed^=seed<<13;seed^=seed>>>17;seed^=seed<<5;return (seed>>>0)/4294967296;};});const page=await context.newPage();page.setDefaultNavigationTimeout(120000);
  for(let course=1;course<=4;course++)for(const sense of ['numeric','mesura','espacial','algebraic','estocastic'])for(const option of course===4?['A','B']:['']){
   const file=`${course}eso/sentit-${sense}.html`,url=process.env.MI_AUDIT_BASE?new URL(file,process.env.MI_AUDIT_BASE):pathToFileURL(path.join(root,file));if(option)url.searchParams.set('opcio',option);
   await page.goto(url.href,{waitUntil:'domcontentloaded'});
   const rows=await page.evaluate(()=>{
    const st=typeof ST!=='undefined'?ST:state,select=typeof selTopic==='function'?selTopic:selectTopic;
    const start=typeof startP==='function'?startP:startPractice,show=typeof showEx==='function'?showEx:showExercise;
    const output=[];
    for(let i=0;i<TOPICS.length;i++){
     const t=TOPICS[i];select(i);
     const button=[...document.querySelectorAll('button[onclick]')].find(b=>/(?:selectMode|setMode|selMode)\(['"]open['"]\)/.test(b.getAttribute('onclick')));
     const row={id:t.id,name:t.name,course:t.course||'',buttonFound:!!button,disabled:!!button?.disabled,samples:0,openFields:0,accepted:0,expectedFallbacks:0,issues:[]};
     if(!button||button.disabled){row.status=button?'disabled':'no_selector';output.push(row);continue;}
     button.click();
     if(st.mode!=='open'){row.status='mode_rejected';output.push(row);continue;}
     for(const level of [1,2]){
      st.level=level;try{start();}catch(e){row.issues.push({kind:"generator_error",message:e.message});continue;}
      for(let sample=0;sample<6;sample++){
       if(sample){try{show();}catch(e){row.issues.push({kind:"generator_error",message:e.message});continue;}}
       const ex=typeof currentEx!=='undefined'?currentEx:curEx;
       const input=document.getElementById('openInput'),wrap=document.getElementById('openWrap');
       const visible=!!input&&input.getClientRects().length>0&&getComputedStyle(wrap||input).display!=='none';
       row.samples++;
       if(!visible){if(ex?.allowOpen===false)row.expectedFallbacks++;if(row.issues.length<3)row.issues.push({kind:'no_open_field',level,type:ex?.type,question:ex?.question,allowOpen:ex?.allowOpen});continue;}
       row.openFields++;
       const raw=ex?.answer?.val??ex?.correct;
       const tmp=document.createElement('div');tmp.innerHTML=String(raw??'').replace(/<sup[^>]*>(.*?)<\/sup>/gi,(_,power)=>'^'+(/^[\d]+$/.test(power)?power:'('+power+')')).replace(/<sub[^>]*>(.*?)<\/sub>/gi,'_$1');const answer=tmp.textContent.trim();
       let analyticsCalls=0;const originalAnswer=window.MIAnalytics.answer;window.MIAnalytics.answer=(...args)=>{analyticsCalls++;return originalAnswer(...args);};input.value=answer;input.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',bubbles:true,cancelable:true}));
       const scoreSnapshot=JSON.stringify([st.correctStreak,st.streak,st.done,st.errors]);input.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',bubbles:true,cancelable:true}));const duplicate=analyticsCalls!==1||scoreSnapshot!==JSON.stringify([st.correctStreak,st.streak,st.done,st.errors]);window.MIAnalytics.answer=originalAnswer;if(duplicate)row.issues.push({kind:'duplicate_submission',analyticsCalls});
       const accepted=st.answered&&(input.classList.contains('ok')||((st.correctStreak??st.streak)>0&&!input.classList.contains('ko')));
       if(accepted)row.accepted++;
       else if(row.issues.length<3)row.issues.push({kind:'canonical_answer_rejected',level,type:ex?.type,question:ex?.question,answer,answered:st.answered,inputClass:input.className,validation:MIValidation.validate({...ex,correct:raw},answer),policy:MIValidation.policyFor(ex)});
      }
     }
     row.status=row.openFields===row.samples&&row.accepted===row.samples?'ok':row.expectedFallbacks+row.openFields===row.samples&&row.accepted===row.openFields?'mixed':'issues';output.push(row);
    }
    return output;
   });
   results.push({file,option,topics:rows});fs.writeFileSync(path.join(root,"scripts/resultats-validacio-respostes-parcial.json"),JSON.stringify(results,null,2));console.log(file+(option?' '+option:'')+': '+rows.filter(r=>r.status==='ok').length+'/'+rows.length+' sense incidències');
  }
 }finally{await Promise.race([browser.close(),new Promise(resolve=>{const timer=setTimeout(resolve,15000);timer.unref();})]);}
 const rows=results.flatMap(p=>p.topics.map(t=>({file:p.file,option:p.option,...t}))),issues=rows.filter(t=>t.status!=='ok');
 const summary={pages:results.length,topicVariants:rows.length,samples:rows.reduce((n,t)=>n+t.samples,0),disabled:rows.filter(t=>t.status==='disabled').length,mixed:rows.filter(t=>t.status==='mixed').length,withIssues:rows.filter(t=>t.status==='issues').length,generatorErrors:rows.reduce((n,t)=>n+t.issues.filter(i=>i.kind==='generator_error').length,0),duplicateSubmissions:rows.reduce((n,t)=>n+t.issues.filter(i=>i.kind==='duplicate_submission').length,0),accepted:rows.reduce((n,t)=>n+t.accepted,0),openFields:rows.reduce((n,t)=>n+t.openFields,0)};
 fs.writeFileSync(path.join(root,'scripts/resultats-validacio-respostes-funcional.json'),JSON.stringify({base:process.env.MI_AUDIT_BASE||'local',summary,issues,results},null,2)+'\n');console.log(JSON.stringify(summary));if(summary.withIssues||summary.generatorErrors||summary.duplicateSubmissions)throw Error('Functional validation failures: see result JSON');
})().then(()=>process.exit(0)).catch(e=>{console.error(e);process.exit(1)});

