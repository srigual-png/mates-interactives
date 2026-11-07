const assert = require('node:assert/strict');
const {resolve} = require('node:path');
const {pathToFileURL} = require('node:url');
const {chromium} = require(process.env.MI_PLAYWRIGHT || 'C:/Users/srigu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

async function main(){
  const browser=await chromium.launch({
    executablePath:process.env.MI_BROWSER || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
  });
  try{
    const page=await browser.newPage({viewport:{width:900,height:920}});
    const errors=[];
    page.on('pageerror',error=>errors.push(error.message));
    await page.route(/^https?:/,route=>route.abort());
    await page.addInitScript(()=>{
      let seed=73;
      Math.random=()=>((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/4294967296);
    });
    await page.goto(pathToFileURL(resolve('1eso/sentit-numeric.html')).href);
    const result=await page.evaluate(()=>{
      const check=(value,message)=>{if(!value)throw Error(message);};
      const M=MIMcdMcm, el=id=>document.getElementById(id), topic=TOPICS.find(t=>t.id==='mcmmcd');
      const fixed=(...draws)=>(min,max)=>{
        const value=draws.length?draws.shift():min;
        check(value>=min&&value<=max,'Sorteig fix fora de rang: '+value+' / '+min+'–'+max);
        return value;
      };
      const make=(type,...draws)=>M.generate(type,fixed(...draws));
      const accepts=(q,v)=>openOk1(q.correct,v,q);
      const rejects=(q,values)=>values.every(v=>!accepts(q,v));
      check(gcd(12,18)===6&&lcm(12,18)===36&&gcd(8,9)===1&&lcm(8,9)===72&&
        gcd(6,18)===6&&lcm(6,18)===18&&lcm(12,30)===60&&lcm(lcm(4,6),8)===24,'Exemples matemàtics');
      const p1=make('P1',12,13),p2=make('P2',4,3,2);
      check(accepts(p1,'6, 2, 1, 3; 6')&&rejects(p1,['1 2 3; 6','1 2 3 6 6; 6','1 2 3 6; 3','1 2 3 6; 6; 999']),'P1 conjunt i màxim');
      check(accepts(p2,'24 12; 12')&&rejects(p2,['0 12 24; 12','12; 12','12 24; 24']),'P2 positius i límit inclusiu');
      check(accepts(p1,['6; 2; 1; 3','6'])&&accepts(make('P2',6,7,2),['60; 30','30'])&&
        !accepts(p1,['1; 2; 3; 6; 6','6']),'Separadors dins del camp de llista');
      check(accepts(make('P3',6,0,3),'6; 18')&&accepts(make('P3',8,1,0),'1; 72'),'P3 casos especials');
      const a1=make('A1',12,11),a2=make('A2',12,23,1),a3=make('A3',12,12),a4=make('A4',12,0);
      check(accepts(a1,'3*2; 6')&&rejects(a1,['6; 6','2 × 3; 12','6'])&&accepts(a2,'5 × 3 × 2 × 2; 60'),'Factors seleccionats');
      const factorCases=[
        [make('A1',30,27),'2','2'],
        [make('A1',24,29),'3 × 2 × 2','12'],
        [make('A1',8,2),'1','1'],
        [make('A2',12,11,1),'3² · 2^2','36']
      ];
      check(factorCases.every(([q,factors,value])=>accepts(q,[factors,value]))&&
        rejects(make('A1',24,29),['2³ × 3; 12','4 × 3; 12','2² × 3 × 5; 12']),'Exponents, factors comuns i productes equivalents');
      check([a1,a2,...factorCases.map(([q])=>q)].every(q=>q.question.includes(' = ')),'Descomposicions visibles');
      check(a3.question.includes('alhora ara')&&['36','36 s','36 segons'].every(v=>accepts(a3,v))&&rejects(a3,['36 minuts','36 metres']),'Sincronització i unitats');
      check(accepts(a4,'12 lots; 2 llapis vermells; 3 blaus')&&
        rejects(a4,['12; 2; 3; 999','12; 3; 2','12 metres; 2; 3','12; 2 text; 3']),'Lots i camps exactes');
      check(accepts(make('A5',18,4),'18 cm; 4 trossos; 5 trossos')&&
        rejects(make('A5',18,4),['18 metres; 4; 5','18; 5; 4']),'Talls màxims i unitats');
      const p4=make('P4',1,12,0);
      check(accepts(p4,'MCD; Busquem el divisor comú més gran.; 12 lots')&&
        rejects(p4,['mcm; Busquem el divisor comú més gran.; 12','MCD; Busquem el primer múltiple positiu comú.; 12','MCD; Busquem el divisor comú més gran.; 11']),'P4 tres components');
      for(const branch of [0,1]){
        const q=make('P5',branch),[lo,hi,target,a]=q.question.match(/\d+/g).map(Number);
        const calculate=branch===0?gcd:lcm;
        const valid=Array.from({length:hi-lo+1},(_,i)=>lo+i).filter(v=>calculate(a,v)===target);
        check(valid.length===1&&accepts(q,String(valid[0])),'P5 unicitat exhaustiva');
      }
      check(accepts(make('P6',1,0,0,0),'Ha oblidat el factor primer 5.; 60')&&
        accepts(make('P6',0,0,0),'Ha triat l’exponent més gran del factor 2 en lloc del més petit.; 6'),'P6 motiu i resultat');
      const seeds=Array.from({length:61},(_,i)=>i+10).filter(n=>n%4!==n%6);
      const draws=[0,(seeds.indexOf(11)+0.5)/seeds.length,11.5/51];
      const a6=MIFirstNumericTasks.generate('coincidencies-desfasades',()=>draws.shift()??0);
      check(a6.correct==='23'&&accepts(a6,'23 minuts')&&!accepts(a6,'11'),'A6 límit estricte');

      const groups=adaptivePracticeGroups(topic), feedbackLinks={};
      check(groups.map(level=>level.length).join()==='3,6,3','Catàleg');
      for(const [level,families] of groups.entries())for(const [type] of families){
        for(const random of [(min,max)=>min,(min,max)=>max,rnd,rnd]){
          const q=genMcdPractice(type,level+1,random);
          check(q.options.length===4&&new Set(q.options).size===4&&q.options.filter(v=>accepts(q,v)).length===1,'Opcions de '+type);
        }
      }
      for(const family of groups[0])check(new Set(M.reserve(family,1).map(q=>q.practiceKey)).size===8,'Reserva N1');
      function start(id,level,mode){
        selTopic(TOPICS.findIndex(t=>t.id===id));selLv(level);selMode(mode);startP();
      }
      function submit(q,good,verifyIncomplete=false){
        if(state.mode==='multi'){
          const i=q.options.findIndex(v=>(v===q.correct)===good);
          document.querySelectorAll('#og .ob')[i].click();
        }else if(q.mcmFields.length>1){
          if(verifyIncomplete){checkOpen();check(!state.answered,'Formulari incomplet');}
          q.correct.split(';').forEach((value,i)=>{
            el('mcmField'+i).value=!good&&i===q.mcmFields.length-1?'incorrecte':value.trim();
          });
          checkOpen();
        }else{
          el('openInput').value=good?q.correct:'incorrecte';checkOpen();
        }
        check(document.querySelector('#fbA .fb').classList.contains(good?'ok':'ko'),'Correcció de '+q.type);
      }
      function session(level,mode,answers,levels,constant=false){
        const saved=Math.random;
        if(constant)Math.random=()=>0;
        try{
          start('mcmmcd',level,mode);
          const stats=adaptivePracticeSessions.mcmmcd;
          let previous;
          answers.forEach((good,i)=>{
            const q=currentEx;
            check(q.taskDifficulty===levels[i]&&previous!==stats.lastFamily&&stats.questions.size===i+1,'Nivell i rotació a '+i);
            previous=stats.lastFamily;
            submit(q,good,true);
            check(stats.correct+stats.incorrect===i+1,'Comptador');
            check(document.querySelector('#fbA a').hash==='#'+q.mcmTheory,'Enllaç');
            nextEx();
          });
          check(el('sDecimalResult').classList.contains('active'),'Resum');
          check(el('decimalResultScore').textContent===answers.filter(Boolean).length+'/'+answers.length,'Resultat real');
          if(level===1)check(el('practiceResultMetric').textContent==='83,3% d’encerts','Percentatge real');
        }finally{Math.random=saved;}
      }
      session(1,'open',[true,true,true,false,true,true,true,true,false,true,true,true],[1,1,1,2,1,2,2,2,3,2,3,3]);
      session(2,'multi',Array(20).fill(false),Array(20).fill(1),true);
      session(2,'multi',Array(20).fill(true),[...Array(6).fill(1),...Array(6).fill(2),...Array(8).fill(3)]);
      start('mcmmcd',1,'multi');el('bChg').click();
      check(el('decimalResultScore').textContent==='0/0','Sortida voluntària');
      start('mcmmcd',1,'open');
      const firstP4=genMcdPractice('P4',2);
      adaptivePracticeSessions.mcmmcd.questions.add(firstP4.practiceKey);
      check(firstP4.mcmFields[0].value!==genMcdPractice('P4',2).mcmFields[0].value,'P4 alterna MCD i mcm');
      for(const [level,families] of groups.entries())for(const [type] of families){
        start('mcmmcd',1,'open');
        const q=genMcdPractice(type,level+1), generate=topic.practiceGen;
        const stats=adaptivePracticeSessions.mcmmcd;
        stats.points=[0,3,6][level];
        stats.questions.clear();
        try{topic.practiceGen=()=>q;showEx();}finally{topic.practiceGen=generate;}
        submit(q,true,true);
        const url=document.querySelector('#fbA .mi-review-theory-link').href;
        check(new URL(url).hash==='#'+q.mcmTheory,'Enllaç per família '+type);
        feedbackLinks[type]=url;
      }

      miTopicExam.start('mcmmcd');
      const exam=miTopicExam.getSession().questions;
      check(exam.length===12&&[1,2,3].map(n=>exam.filter(q=>q.taskDifficulty===n).length).join()==='4,4,4'&&
        exam.every(q=>[1,2,3,4,5,1001].includes(q.type)),'Examen de tema i quotes');
      check(exam.every(q=>q.options.length===4&&new Set(q.options).size===4&&
        q.options.filter(value=>accepts(q,value)).length===1),'Opcions matemàtiques de l’examen');
      document.querySelector('#miTopicExam [data-action="submit"]').click();
      check(document.querySelectorAll('#miTopicExam fieldset a[href*="#"]').length===12,'Enllaços de l’examen de tema');
      miExamSelectedTopics=['mcmmcd'];miStartConfiguredExam();
      check(state.examQs.length===20,'Examen global');
      for(const variant of ['mcmmcd-1','mcmmcd-2','mcmmcd-3','mcmmcd-4','mcmmcd-raonament']){
        const index=state.examQs.findIndex(q=>q.variantId===variant);
        check(index>=0,'Variant d’examen '+variant);
        state.examIdx=index;showEQ();const q=state.examQs[index];
        if(variant==='mcmmcd-1')check(!q.question.includes('factorització'),'Examen amb dos resultats');
        el('examOpenAns').value=q.correct;checkExamOpenAnswer();
        check(state.examAnswers.at(-1).ok&&document.querySelector('#examF a').hash==='#'+q.mcmTheory,'Correcció de '+variant);
      }
      const bank=M.bank(1,fixed(12,5)), first=bank.steps[0];
      check(['2² × 3','3 × 2 × 2','2^2*3'].every(v=>first.check(v))&&
        ['4 × 3','2*2*3*','12; alert(0)'].every(v=>!first.check(v)),'Factorització estricta');
      for(const complete of [false,true]){
        ampSession={probs:[bank],idx:0,results:[]};ampShowProb();
        if(complete){
          el('ampStep_0').value='3 × 2 × 2';
          el('ampStep_1').value='2 × 3²';
        }
        el('ampFinalAns').value=bank.answer.val;ampCheckAnswer();
        check(ampSession.results[0].ok===complete&&document.querySelector('#ampFbArea a').hash==='#mcd-factors','Factors obligatoris al banc');
      }
      state.errors.mcmmcd.push({id:'antic-mcm',type:1,question:'Error antic del tema',correct:'6',solution:['MCD = 6']});
      state.errors=normalizeErrorStore(state.errors);showErrorSummary();
      check(el('testC').textContent.includes('Error antic del tema')&&
        document.querySelector('.saved-error-card a[href$="mcm-mcd-1r-eso.html"]'),'Repàs antic amb enllaç general');
      for(const id of ['naturals','decimal_sys','ops','potencies','jerarquia','divis']){
        start(id,1,'multi');processPracticeAnswer(true,currentEx.correct);el('bChg').click();
        check(el('decimalResultScore').textContent==='1/1','Obertura i resum '+id);
      }
      return {families:groups.map(level=>level.length),feedbackLinks};
    });
    async function showCase(type,draws,mode){
      await page.evaluate(({type,draws,mode})=>{
        const t=TOPICS.find(t=>t.id==='mcmmcd'),generate=t.practiceGen;
        selTopic(TOPICS.indexOf(t));selLv(1);selMode(mode);startP();
        const level=type.startsWith('P')?1:2;
        const q={...MIMcdMcm.generate(type,()=>draws.shift()),taskDifficulty:level,diff:level};
        adaptivePracticeSessions.mcmmcd.points=level===1?0:3;
        try{t.practiceGen=()=>q;showEx();}finally{t.practiceGen=generate;}
      },{type,draws,mode});
    }
    for(const [type,draws] of [['P1',[12,13]],['P2',[6,7,2]],['A1',[30,27]],['A2',[12,23,1]]]){
      await showCase(type,draws,'multi');
      assert.equal(await page.locator('#og .ob').count(),4);
      assert(await page.locator('#og .ob').evaluateAll(buttons=>buttons.every(button=>
        button.querySelectorAll('.mcm-option-line').length===2&&button.dataset.answer.includes(';'))));
      const correct=await page.evaluate(()=>currentEx.correct);
      const button=page.locator('#og .ob').filter({has:page.locator('strong')});
      const index=await page.evaluate(()=>currentEx.options.indexOf(currentEx.correct));
      await button.nth(index).focus();
      await page.keyboard.press('Enter');
      assert(await button.nth(index).evaluate(el=>el.classList.contains('correct')));
      assert.equal(await page.evaluate(()=>adaptivePracticeSessions.mcmmcd.correct),1);
      assert.equal(await page.evaluate(()=>currentEx.correct),correct);
    }
    await showCase('P2',[6,7,2],'open');
    await page.locator('#divisReasoning button').click();
    assert.equal(await page.evaluate(()=>state.answered),false);
    await page.locator('#mcmField0').fill('60; 30');
    await page.locator('#divisReasoning button').click();
    assert.equal(await page.evaluate(()=>state.answered),false);
    await page.locator('#mcmField1').fill('30');
    await page.locator('#mcmField1').press('Enter');
    await page.locator('#fbA .ok').waitFor();
    assert.match(await page.locator('#fbA').innerText(),/Múltiples comuns positius: 30, 60/);
    assert.match(await page.locator('#fbA').innerText(),/El més petit és 30/);
    const theory=await browser.newPage();
    await theory.route(/^https?:/,route=>route.abort());
    for(const [family,link] of Object.entries(result.feedbackLinks)){
      await theory.goto(link);
      const section=theory.locator('section'+new URL(link).hash);
      assert.equal(await section.count(),1,family);
      assert((await section.locator(':scope > p').innerText()).length>60,family+' procediment');
      assert((await section.locator('.example').innerText()).length>65,family+' exemple');
      assert(await section.locator('.example strong').count(),family+' resultat de l’exemple');
    }
    await theory.close();
    if(process.env.MI_MCD_SCREENSHOTS){
      const output=process.env.MI_MCD_SCREENSHOTS;
      await showCase('A1',[30,27],'multi');
      await page.screenshot({fullPage:true,path:resolve(output,'mcd-factors-tria.png')});
      await page.setViewportSize({width:390,height:844});
      assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
      await page.screenshot({fullPage:true,path:resolve(output,'mcd-factors-mobil.png')});
      await showCase('P2',[6,7,2],'open');
      await page.screenshot({fullPage:true,path:resolve(output,'multiples-oberta-mobil.png')});
      await showCase('P1',[12,13],'multi');
      await page.screenshot({fullPage:true,path:resolve(output,'divisors-tria-mobil.png')});
    }
    assert.deepEqual(errors,[]);
    console.log(JSON.stringify({families:result.families,theory:Object.keys(result.feedbackLinks).length,exams:[12,20]}));
  }finally{await browser.close();}
}
main().catch(error=>{console.error(error);process.exitCode=1;});
