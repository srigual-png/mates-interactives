const assert = require('node:assert/strict');
const {resolve} = require('node:path');
const {pathToFileURL} = require('node:url');
const {chromium} = require(process.env.MI_PLAYWRIGHT || 'C:/Users/srigu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

async function main() {
  const browser = await chromium.launch({
    executablePath: process.env.MI_BROWSER || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
  });
  try {
    const page = await browser.newPage({viewport:{width:900,height:920}});
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.route(/^https?:/, route => route.abort());
    const url = pathToFileURL(resolve('1eso/sentit-numeric.html')).href;
    await page.goto(url);
    const details = await page.evaluate(() => {
      const check = (value,message) => { if (!value) throw Error(message); };
      const topic = id => TOPICS.find(t => t.id === id);
      const D = MIDivisibilitat;
      const fixed = (...values) => (min,max) => {
        const value = values.length ? values.shift() : min;
        check(value >= min && value <= max, 'Valor fora de rang');
        return value;
      };
      const make = (type,...values) => genDivisPractice(type,2,fixed(...values));
      const accept = (q,v) => openOk1(q.correct,v,q);
      const rejects = (q,answers) => answers.every(v => !accept(q,v));
      const testOptions = q => check(q.options.length === 4 && new Set(q.options).size === 4 &&
        q.options.filter(v => accept(q,v)).length === 1, 'Opcions de ' + q.type + ': ' + q.question);

      check(accept(make(2,0,50,1),'si') && accept(make(2,0,50,1),'Sí') && accept(make(2,0,50,0,1),'no'), 'Sí/no');
      const pair = make(7,30,5,1);
      check(accept(pair,'sí; no') && rejects(pair,['no; sí','sí','sí; no; no']), 'Parell ordenat');
      const factor = make(4,0);
      check(['2² × 3','2^2*3','3 × 2 × 2'].every(v => accept(factor,v)), 'Productes equivalents');
      check(rejects(factor,['4 × 3','2 × 6','12','1 × 2² × 3','×2×2×3×','2^0 × 2² × 3','2*2*3;alert(0)']), 'Factorització restringida');
      check(accept(make('factor-error',0,0),'sí; no') && accept(make('factor-error',0,1),'no; sí'), 'Diagnòstic de factorització');
      const divisors = make('G',36,0);
      check(accept(divisors,'36; 2; 6; 18; 1; 12; 3; 4; 9') &&
        rejects(divisors,['36; 2; 6; 18; 1; 12; 3; 4','36; 2; 6; 18; 1; 12; 3; 4; 9; 9']), 'Divisors complets i permutats');
      check(accept(make('G',36,1),'36, 18, 12, 6, 4'), 'Divisors amb filtre');
      check(accept(make('I',43,2),'5; 0') && rejects(make('I',43,2),['5','5; 0; 0','-5; 0','5abc0']), 'Xifres amb 0');
      check(accept(make('H',127,2),'3') && accept(make('H',125,2),'0'), 'Complement i residu zero');
      const composite = make('F05',7,13);
      check(accept(composite,'13 × 7') && accept(composite,'7*13') && rejects(composite,['1 × 91','7','91','7 × 12']) &&
        accept(make('F05',7,12),'4 × 21'), 'Qualsevol testimoni de compost');
      const diagnosis = make('F03',0,234,0), trueConclusion = make('F03',0,232,0);
      const answer = (q,verdict,reason=q.divisAnswer.reason) => ({verdict,reason});
      check(accept(diagnosis,answer(diagnosis,'No')) && accept(trueConclusion,answer(trueConclusion,'Sí')) &&
        rejects(diagnosis,[answer(diagnosis,'Sí'),answer(diagnosis,'No',diagnosis.divisReasoning.reasons[1]),'F; S']), 'Diagnòstic');
      check(make('F03',1,234,1).question.includes('múltiple de 3') &&
        make('F03',2,234).divisAnswer.reason.includes('0 o 5'), 'Confusions amb 9 i 5');
      const proof = make('F08',6,0), counter = make('F08',3,9);
      check(accept(proof,answer(proof,'Sí')) && rejects(proof,[answer(proof,'Sí',proof.divisReasoning.reasons[1]),'P; 3']) &&
        ['3','6'].every(value=>accept(counter,{verdict:'No',counterexample:value})) &&
        rejects(counter,['12','1','0','63'].map(value=>({verdict:'No',counterexample:value}))), 'Prova i contraexemple');
      check(proof.correct.includes('qualsevol enter') && [diagnosis,trueConclusion,proof,counter].every(q=>
        !/[CFPU];\s*[SUNk\d]/.test([q.question,...q.options,...q.solution].join(' '))), 'Llenguatge natural');
      const interval = make('F02',3,22,14), a = interval.divisAnswer;
      check(interval.correct === '30' && Array.from({length:a.max-a.min+1},(_,i)=>a.min+i).filter(n=>accept(interval,n)).join() === '30', 'Unicitat F02');
      check(accept(make(3,1),'ni primer ni compost') && accept(make(3,2),'primer') &&
        accept(make(3,0),'ni primer ni compost') && accept(make(5,7,2),'0') && accept(make(5,7,2),'21'), 'Casos 0, 1, 2 i múltiples oberts');
      const reasoning = make(1001);
      check(reasoning.correct === '1044' && rejects(reasoning,['1404','1764']), 'Mínim amb dues xifres');

      const groups = adaptivePracticeGroups(topic('divis'));
      check(groups.map(level=>level.length).join() === '2,7,3', 'Catàleg adaptatiu');
      for (const [level,families] of groups.entries()) for (const type of families.flat()) {
        for (const random of [(min,max)=>min,(min,max)=>max,...Array(4).fill(rnd)]) testOptions(genDivisPractice(type,level+1,random));
      }
      for (const family of groups[0]) {
        const reserve = divisPracticeReserve(family,1);
        check(new Set(reserve.map(q=>q.practiceKey)).size === 8, 'Vuit reserves per família');
        reserve.forEach(testOptions);
      }

      function start(id,level,mode) {
        selTopic(TOPICS.indexOf(topic(id)));
        selLv(level); selMode(mode); startP();
      }
      function respond(correct) {
        if (state.mode === 'open') {
          if (currentEx.divisReasoning) {
            const form=document.getElementById('divisReasoning'), expected=currentEx.divisAnswer;
            form.elements.verdict.value=expected.truth?'Sí':'No';
            form.elements.verdict.dispatchEvent(new Event('change'));
            checkOpen();
            check(!state.answered,'Un intent incomplet no es registra');
            if(expected.counterexample) form.elements.counterexample.value=correct?expected.counterexample.m:1;
            else form.elements.reason.value=correct?expected.reason:currentEx.divisReasoning.reasons[1];
          } else document.getElementById('openInput').value = correct ? currentEx.correct : 'incorrecte';
          checkOpen(); checkOpen();
        } else {
          const i = currentEx.options.findIndex(o => (String(o) === String(currentEx.correct)) === correct);
          const button = document.querySelectorAll('#og .ob')[i];
          button.click(); selAns(i,button);
        }
        check(document.querySelector('#fbA .fb').classList.contains(correct?'ok':'ko'), 'Correcció');
      }
      function session(level,mode,answers,levels,constant=false) {
        const saved = Math.random;
        if(constant) Math.random=()=>0;
        try {
          start('divis',level,mode);
          const stats=adaptivePracticeSessions.divis;
          let previous;
          answers.forEach((correct,i)=>{
            check(currentEx.taskDifficulty===levels[i], 'Llindar a '+(i+1));
            check(previous!==stats.lastFamily, 'Família repetida consecutivament');
            previous=stats.lastFamily;
            check(stats.questions.size===i+1, 'Pregunta repetida');
            respond(correct);
            check(stats.correct+stats.incorrect===i+1,'Comptar una sola vegada');
            check(document.querySelector('#fbA .mi-review-theory-link').hash==='#'+currentEx.divisTheory,'Enllaç de teoria');
            check(document.getElementById('jerarquiaCompletion').textContent.endsWith((level===1?stats.correct:i+1)+'/'+NEEDED[level]),'Comptador independent');
            if(levels[i+1]&&levels[i+1]!==levels[i]) check(document.getElementById('fbA').textContent.includes('serà de nivell N'+levels[i+1]),'Avís adaptatiu');
            nextEx();
          });
          check(document.getElementById('sDecimalResult').classList.contains('active'),'Resum');
          check(document.getElementById('decimalResultCount').textContent===String(answers.length),'Total del resum');
        } finally { Math.random=saved; }
      }
      session(1,'open',[true,true,true,false,true,true,true,true,false,true,true,true],[1,1,1,2,1,2,2,2,3,2,3,3]);
      session(2,'multi',Array(20).fill(false),Array(20).fill(1),true);
      session(2,'multi',Array(20).fill(true),[...Array(6).fill(1),...Array(6).fill(2),...Array(8).fill(3)]);
      for(const q of [diagnosis,proof,counter]){
        for(const correct of [false,true]){
          start('divis',1,'open');
          const t=topic('divis'), generate=t.practiceGen;
          adaptivePracticeSessions.divis.points=6;
          try{t.practiceGen=()=>({...q,taskDifficulty:3});showEx();}finally{t.practiceGen=generate;}
          respond(correct);
          check(document.querySelector('#fbA a').hash==='#'+q.divisTheory,'Enllaç de repàs directe');
        }
      }
      start('divis',2,'multi');
      const stats=adaptivePracticeSessions.divis;
      stats.points=6;
      const visited=new Set();
      for(let i=0;i<7;i++){
        showEx(); visited.add(stats.lastFamily);
        if(i===2){stats.points=5;showEx();stats.points=6;}
      }
      check(visited.size===7,'Rotació completa N2 amb baixada i retorn');
      document.getElementById('bChg').click();
      check(document.getElementById('decimalResultScore').textContent==='0/0','Sortida anticipada');

      for(const id of ['naturals','decimal_sys','ops','potencies','jerarquia']){
        start(id,1,'multi');respond(true);nextEx();
        check(currentEx.topicId===id && state.exCount===2,'Entrada existent '+id);
      }
      const exam=miTopicExam.build(topic('divis'));
      check(exam.length===12 && [1,2,3].map(level=>exam.filter(q=>q.taskDifficulty===level).length).join()==='6,3,3' &&
        exam.every(q=>[1,2,3,4,5,6,7,1001].includes(q.type)),'Examen per tema');
      miTopicExam.start('divis');
      check(document.querySelectorAll('#miTopicExam fieldset').length===12,'Pantalla examen de tema');
      miExamSelectedTopics=['divis'];miStartConfiguredExam();
      check(state.examQs.length===20 && state.examQs.every(q=>q.topicId==='divis'),'Examen global');
      for(const variant of ['divis-1','divis-4']){
        const index=state.examQs.findIndex(q=>q.variantId===variant);
        check(index>=0,'Variant d’examen '+variant);
        const q=state.examQs[index], submit=value=>{
          state.examIdx=index;showEQ();document.getElementById('examOpenAns').value=value;checkExamOpenAnswer();
          return state.examAnswers.at(-1).ok;
        };
        const [first,...rest]=q.correct.split(';');
        check(!submit(first)&&!submit(rest.join(';'))&&!submit('no és '+q.correct)&&submit(q.correct),'Doble correcció a '+variant);
      }
      const digitExam=state.examQs.find(q=>q.variantId==='divis-3');
      check(digitExam?.divisAnswer&&D.matches(digitExam.divisAnswer,digitExam.correct.split(';').reverse().join(' ')),
        'Llista permutada al global');
      const bank=AMP_CATS.find(cat=>cat.id==='divis'), bankProblems=Array.from({length:bank.variants},()=>bank.gen());
      check(bankProblems.length===5&&Object.values(bank.diffCounts).join()==='0,4,1','Banc i dificultat');
      for(const variant of ['divis-1','divis-4']){
        const p=bankProblems.find(q=>q.variantId===variant),[first]=p.examAnswer.val.split(';');
        const submit=(step,final)=>{
          ampSession={probs:[p],idx:0,results:[]};ampShowProb();
          document.getElementById('ampStep_0').value=step;
          document.getElementById('ampFinalAns').value=final; ampCheckAnswer();
          return ampSession.results[0].ok;
        };
        check(!submit('',p.answer.val)&&!submit('no és '+first,p.answer.val)&&!submit(first,'0')&&
          submit(first,p.answer.val),'Passos obligatoris a '+variant);
      }
      state.errors.divis.push({id:'divis-antic',type:5,topicId:'divis',question:'Múltiple d’un registre antic',correct:'21'},
        {id:'divis-f08-antic',type:'F08',topicId:'divis',question:'«Tots els múltiples de 3 són múltiples de 12.» Si és cert, escriu P; k.',answer:'C; 12',correct:'C; 3'});
      state.errors=normalizeErrorStore(state.errors);showErrorSummary();
      check(document.body.textContent.includes('Múltiple d’un registre antic')&&
        document.querySelector('.saved-error-card a[href$="#primers"]'),'Repàs d’errors');
      check(document.querySelector('.saved-error-card a[href$="#prova-contraexemple"]') &&
        !document.getElementById('testC').textContent.includes('C; 12'),'Repàs de F08 en llenguatge natural');
      return {families:groups.map(x=>x.length),guided:12,autonomous:[20,20],exams:[12,20],bank:bankProblems.length};
    });

    await page.setViewportSize({width:390,height:844});
    await page.goto(url+'?tema=divis&nivell=1');
    await page.evaluate(()=>{selMode('open');startP();});
    const input=page.locator('#openInput');
    await input.fill(await page.evaluate(()=>currentEx.correct));
    await input.press('Enter');
    await page.locator('#fbA .ok').waitFor();
    await page.waitForFunction(()=>document.activeElement.id==='bNext');
    await page.keyboard.press('Enter');
    assert.equal(await page.evaluate(()=>state.exCount),2);
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
    const output=process.env.MI_DIVIS_SCREENSHOTS;
    await page.evaluate(()=>{
      const t=TOPICS.find(t=>t.id==='divis'),generate=t.practiceGen;
      const draws=[3,9];
      const task=genDivisPractice('F08',3,()=>draws.shift());
      adaptivePracticeSessions.divis.points=6;
      try{t.practiceGen=()=>task;showEx();}finally{t.practiceGen=generate;}
    });
    const form=page.locator('#divisReasoning');
    await form.locator('#divisVerdict').selectOption('No');
    await form.locator('button').click();
    assert.equal(await page.evaluate(()=>state.answered),false);
    await form.locator('#divisCounterexample').fill('6');
    await form.locator('#divisCounterexample').press('Enter');
    await page.locator('#fbA .ok').waitFor();
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
    if(output){
      await page.screenshot({fullPage:true,path:resolve(output,'divis-mobil.png')});
      await page.setViewportSize({width:900,height:920});
      for(const id of ['jerarquia','divis']){
        for(const [points,mode,good] of [[2,'multi',true],[3,'open',false],[6,'multi',true]]){
          await page.evaluate(({id,points,mode,good})=>{
            selTopic(TOPICS.findIndex(t=>t.id===id));selLv(1);selMode(mode);startP();
            const stats=adaptivePracticeSessions[id];stats.points=points;stats.correct=points;showEx();
            if(mode==='open'){document.getElementById('openInput').value='incorrecte';checkOpen();}
            else document.querySelectorAll('#og .ob')[currentEx.options.indexOf(currentEx.correct)].click();
            if(document.querySelector('#fbA .fb').classList.contains('ok')!==good)throw Error('Captura de correcció');
            window.scrollTo(0,0);
          },{id,points,mode,good});
          await page.screenshot({fullPage:true,path:resolve(output,id+'-'+points+'.png')});
        }
        await page.locator('#bChg').click();
        await page.screenshot({fullPage:true,path:resolve(output,id+'-resum.png')});
      }
    }
    await page.goto(pathToFileURL(resolve('1eso/teoria/numeric/divisibilitat-1r-eso.html')).href);
    for(const id of ['divisibilitat','criteris','primers','factoritzacio','errors-frequents','criteri-incorrecte','prova-contraexemple']) assert.equal(await page.locator('#'+id).count(),1);
    assert.match(await page.locator('#criteri-incorrecte').innerText(),/234[\s\S]*232/,'Exemples de diagnòstic de criteris');
    assert.match(await page.locator('#prova-contraexemple').innerText(),/6 són parells[\s\S]*3 són múltiples de 12/,'Exemples de demostració i contraexemple');
    assert.match(await page.locator('#errors-frequents').innerText(),/Confondre múltiple amb divisor[\s\S]*Aturar una factorització/,'Resum d’errors freqüents');
    assert.deepEqual(errors,[]);
    console.log(JSON.stringify({...details,keyboard:true,mobile:true}));
  } finally {
    await browser.close();
  }
}
main().catch(error=>{console.error(error);process.exitCode=1;});
