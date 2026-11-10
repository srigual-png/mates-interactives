const assert=require('assert');
const fs=require('fs');
const path=require('path');
const {chromium}=require('C:/Users/srigu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

(async()=>{
  const profile=path.resolve('tmp','pw-fraccions-sentit');fs.mkdirSync(path.dirname(profile),{recursive:true});
  const context=await chromium.launchPersistentContext(profile,{executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true,viewport:{width:1440,height:1000}});
  try{
    const page=context.pages()[0]||await context.newPage(),errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    const url='file:///'+path.resolve('2eso/sentit-numeric.html').replace(/\\/g,'/')+'?topic=fraccionsSentit';
    await page.goto(url);
    const gen=await page.evaluate(()=>{
      const check=(v,m)=>{if(!v)throw Error(m)};
      const expected={1:1,2:1,3:1,4:2,5:1,6:1,7:1,8:2,9:2,10:3,11:2,12:3,13:3,14:1,15:2,16:2,17:3};
      const families=new Set(),coverage={};
      for(let type=1;type<=17;type++)for(let i=0;i<40;i++){
        const q=genFraccionsSentit2ESO(type);coverage[type]=q.diff;families.add(MIDifficulty.fractionsMeaningFamily(type));
        check(q.diff===expected[type],'nivell tipus '+type);
        check(q.options.length===4&&q.options.filter(x=>x===q.correct).length===1,'opcions/clau '+type);
        check(new Set(q.options).size===4,'opcions úniques '+type);
        check(q.guide.length>=2&&q.solution.length>=2&&!/undefined|NaN|Infinity/.test(JSON.stringify(q)),'pistes i solució '+type);
        if(q.allowOpen!==false)check(rationalOpenOk(q,q.correct),'accepta la resposta correcta oberta '+type);
        if(type===16){
          const m=q.correct.match(/A=(\d+); B=(\d+)/),ratio=q.question.match(/<b>(\d+):(\d+)<\/b>/),difference=Number(q.question.match(/<b>(\d+) unitats/)[1]);
          const A=Number(m[1]),B=Number(m[2]),a=Number(ratio[1]),b=Number(ratio[2]);
          check(Math.abs(A-B)===difference&&A*b===B*a,'raó i diferència t16');
          check(rationalOpenOk(q,m[1]+'; '+m[2])&&!rationalOpenOk(q,m[1]+'; '+(Number(m[2])+1))&&!rationalOpenOk(q,m[1]),'corrector de parella t16');
        }
        if(type===17){
          const nums=[...q.question.matchAll(/(\d+)\/(\d+)/g)].map(m=>[Number(m[1]),Number(m[2])]);
          const finalAmount=Number(q.question.match(/<b>(\d+) L<\/b>/)[1]),initial=Number(q.correct);
          check(nums.length===2&&Math.abs(initial*nums[0][0]/nums[0][1]*nums[1][0]/nums[1][1]-finalAmount)<1e-9,'reconstrucció successiva t17');
          check(rationalOpenOk(q,String(initial*2)+'/2')&&rationalOpenOk(q,String(initial)+' L')&&!rationalOpenOk(q,String(initial+1))&&!rationalOpenOk(q,String(initial)+' kg'),'corrector racional i unitats t17');
        }
      }
      check(families.size===15,'15 famílies');
      return {coverage,families:families.size,generatorVariants:17*40};
    });
    const practice=await page.evaluate(()=>{
      const i=TOPICS.findIndex(t=>t.id==='fraccionsSentit');state.currentTopic=i;
      const samples=[];
      for(const support of [1,2])for(const mode of ['multi','open'])for(let level=1;level<=3;level++){
        state.level=support;state.mode=mode;state.fractionsDifficultyPoints=level===1?0:level===2?(support===1?3:6):(support===1?6:12);
        for(let n=0;n<30;n++){const q=getExerciseForMode();if(q.diff!==level)throw Error('filtre progressiu '+support+'/'+mode+'/'+level+' points='+state.fractionsDifficultyPoints+' got='+q.diff);if(mode==='open'&&q.allowOpen===false)throw Error('generador tancat en mode obert');samples.push({support,mode,level,type:q.type});}
      }
      const familyCoverage=[];for(const support of [1,2])for(const mode of ['multi','open'])for(let level=1;level<=3;level++){const types=samples.filter(x=>x.support===support&&x.mode===mode&&x.level===level).map(x=>x.type);familyCoverage.push({support,mode,level,count:new Set(types.map(t=>MIDifficulty.fractionsMeaningFamily(t))).size});}
      state.level=1;state.mode='multi';state.fractionsSolved=0;state.fractionsAnswered=0;state.fractionsDifficultyPoints=0;state.done=state.done.filter(x=>x!=='fraccionsSentit');startPractice();
      for(let n=0;n<9;n++){state.answered=false;processAnswer(true,currentEx.correct);}
      const before=state.fractionsSolved;state.answered=false;processAnswer(false,'error');
      const errorProgress={solved:state.fractionsSolved,answered:state.fractionsAnswered,points:state.fractionsDifficultyPoints};
      state.fractionsSolved=9;state.fractionsAnswered=9;state.done=state.done.filter(x=>x!=='fraccionsSentit');state.answered=false;processAnswer(true,currentEx.correct);nextExercise();
      const completed=document.querySelector('#feedbackArea .congrats')?.textContent||'';
      state.level=2;state.mode='open';startPractice();const reset={solved:state.fractionsSolved,answered:state.fractionsAnswered,points:state.fractionsDifficultyPoints,correctStreak:state.correctStreak};
      state.mode='multi';state.done=state.done.filter(x=>x!=='fraccionsSentit');startPractice();for(let n=0;n<20;n++){state.answered=false;processAnswer(n%2===0,currentEx.correct)}nextExercise();
      const autonomous={answered:state.fractionsAnswered,solved:state.fractionsSolved,completed:document.querySelector('#feedbackArea .congrats')?.textContent.includes('20 respostes')||false};
      return {samples:samples.length,familyCoverage,before,errorProgress,completed:completed.includes('Bloc superat'),reset,autonomous};
    });
    assert.equal(practice.samples,360);assert.deepEqual(practice.errorProgress,{solved:9,answered:10,points:8});assert(practice.completed);assert.deepEqual(practice.reset,{solved:0,answered:0,points:0,correctStreak:0});assert.deepEqual(practice.autonomous,{answered:20,solved:10,completed:true});
    for(const f of practice.familyCoverage){const expected=({1:6,2:5,3:4})[f.level]-(f.mode==='open'&&f.level!==3?1:0);assert.equal(f.count,expected,`diversitat familiar ${f.support}/${f.mode}/N${f.level}`)}
    await page.goto(url+'&examen=tema');await page.waitForSelector('#miTopicExam.active');
    const exam=await page.evaluate(()=>{const qs=miTopicExam.getSession().questions;const fams=d=>qs.filter(q=>q.diff===d).map(q=>MIDifficulty.fractionsMeaningFamily(q.type));return {total:qs.length,levels:[1,2,3].map(d=>qs.filter(q=>q.diff===d).length),families:[1,2,3].map(d=>fams(d).length),uniqueFamilies:[1,2,3].map(d=>new Set(fams(d)).size)};});
    assert.equal(exam.total,12);assert.deepEqual(exam.levels,[4,4,4]);assert.deepEqual(exam.families,[4,4,4]);assert.deepEqual(exam.uniqueFamilies,[4,4,4]);
    await page.addScriptTag({path:path.resolve('assets/js/fitxes/numeric-2eso.js')});
    const worksheet=await page.evaluate(async()=>{const f=MIWorksheetConfig.topics.find(t=>t.id==='fraccionsSentit');const q16=await MIWorksheetConfig.adapt('fraccionsSentit',genFraccionsSentit2ESO(16)),q17=await MIWorksheetConfig.adapt('fraccionsSentit',genFraccionsSentit2ESO(17));return {levels:MIWorksheetConfig.levels.fraccionsSentit.map(a=>a.length),q16:{answer:q16.answer,steps:q16.steps.length},q17:{answer:q17.answer,steps:q17.steps.length}}});
    assert.deepEqual(worksheet.levels,[7,6,4]);assert(/A = \d+ unitats; B = \d+ unitats/.test(worksheet.q16.answer));assert(/ L$/.test(worksheet.q17.answer));assert(worksheet.q16.steps>=3&&worksheet.q17.steps>=3,JSON.stringify(worksheet));
    await page.goto(url);
    const general=await page.evaluate(()=>{miExamClearAll();miToggleExamTopic('fraccionsSentit',true);miRunConfiguredExam();const qs=state.examQs;return {total:qs.length,topics:[...new Set(qs.map(q=>q.topicId))],types:[...new Set(qs.map(q=>q.type))].sort((a,b)=>a-b)}});
    assert.equal(general.total,20);assert.deepEqual(general.topics,['fraccionsSentit']);assert(general.types.includes(16)&&general.types.includes(17));
    const linkTargets=await page.evaluate(()=>Array.from({length:17},(_,i)=>{const a=new DOMParser().parseFromString(miTheoryLinkHtml('fraccionsSentit',undefined,i+1),'text/html').querySelector('a');return a?new URL(a.getAttribute('href'),location.href).hash.slice(1):''}));
    await page.goto('file:///'+path.resolve('2eso/teoria/numeric/fraccions-amb-sentit.html').replace(/\\/g,'/')+'#inversa-successives');
    const theory=await page.evaluate(()=>({opened:document.querySelector('#ajuda-exercicis').open,anchor:document.getElementById('inversa-successives')!==null,sections:document.querySelectorAll('#ajuda-exercicis .procedure-list > section').length}));
    assert.deepEqual(theory,{opened:true,anchor:true,sections:15});
    const missingLinks=await page.evaluate(ids=>ids.filter(id=>!document.getElementById(id)),linkTargets);if(missingLinks.length)throw Error('ancoratges inexistents: '+JSON.stringify({missingLinks,linkTargets}));
    const anchors=['divisio-repartiment','operador-ajuda','reconstruir-total','part-total','complement','rao-entre-grups','rao-i-part-total','escala-part-total','comparar-proporcions','escala-rao','repartiment-proporcional','fraccions-successives','significat-contextual','rao-i-diferencia','inversa-successives'];
    for(const id of anchors){await page.evaluate(id=>{document.getElementById('ajuda-exercicis').open=false;location.hash='#'+id},id);await page.waitForTimeout(25);assert(await page.locator('#ajuda-exercicis').evaluate(el=>el.open),'hashchange '+id)}
    const desktop=await page.locator('body').evaluate(el=>el.scrollWidth<=innerWidth);assert(desktop,'teoria sense desbordament horitzontal d’escriptori');
    await page.setViewportSize({width:390,height:844});const mobile=await page.locator('body').evaluate(el=>el.scrollWidth<=innerWidth);assert(mobile,'teoria sense desbordament horitzontal mòbil');
    assert.deepEqual(errors,[]);
    console.log(JSON.stringify({generator:gen,practice,exam,theory,mobile,pageErrors:errors},null,2));
  }finally{await context.close();const root=path.resolve('tmp')+path.sep;if(profile.startsWith(root))fs.rmSync(profile,{recursive:true,force:true});}
})().catch(e=>{console.error(e);process.exitCode=1;});
