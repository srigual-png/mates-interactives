const path=require('path');
const assert=require('assert');
const option=process.argv[2]||'B';
const {playwright,launchOptions}=require('./scripts/genera-examens-cerca.cjs');
const {chromium}=playwright();

const core=['figures4t','vectors4t','components4t','operacionsVectors4t','coordenadesVectors4t','homotecies4t','geometriaFuncions4t','regions4t'];
const routeB=['rectesAmpA','elementsRectaAmpB','posicioRectesAmpC'];
if(!['A','B'].includes(option))throw new Error('Opció no vàlida: '+option);
const expected=option==='A'?core:[...core,...routeB];

(async()=>{
  const browser=await chromium.launch(launchOptions());
  const page=await browser.newPage();
  page.setDefaultTimeout(120000);
  await page.route(/^https?:/,route=>route.abort());
  const errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  const url='file:///'+path.resolve('4eso/sentit-espacial.html').replace(/\\/g,'/');

  for(const id of expected){
    await page.goto(url+'?opcio='+option+'&topic='+id+'&examen=tema');
    await page.waitForSelector('#miTopicExam.active');

    const data=await page.evaluate(()=>({
      ids:miTopicExam.getTopics().map(t=>t.id),
      n:miTopicExam.getSession().questions.length,
      types:[...new Set(miTopicExam.getSession().questions.map(q=>q.type))],
      solutions:miTopicExam.getSession().questions.every(q=>q.solution.length>0),
      text:document.getElementById('miTopicExamBody').innerText
    }));
    assert.deepEqual(data.ids,expected,'L’opció '+option+' ha de respectar l’itinerari');
    assert.equal(data.n,12,id+' · nombre de preguntes');
    assert(data.solutions,id+' · solucions disponibles');
    assert(!data.text.includes('Resposta correcta:'),id+' · no revelar respostes abans del lliurament');

    await page.evaluate(()=>{
      const s=miTopicExam.getSession();
      s.questions.forEach((q,i)=>{
        if(i>=8)return;
        const j=q.options.findIndex(o=>i<6?String(o)===String(q.correct):String(o)!==String(q.correct));
        const el=document.querySelector('[name="topicQ'+i+'"][value="'+j+'"]');
        if(!el)throw new Error('Opció de resposta absent a la pregunta '+i);
        el.click();
      });
    });
    await page.getByRole('button',{name:'Lliurar l’examen',exact:true}).click();
    const partial=await page.evaluate(()=>miTopicExam.getSession().result);
    assert.deepEqual(partial,{correct:6,empty:4,errors:2,grade:5,percent:50},id+' · correcció parcial');
    assert.equal(await page.locator('#miTopicExam fieldset').count(),12);
    assert.equal(await page.locator('.mi-answer-correct').count(),6);
    assert.equal(await page.locator('.mi-answer-wrong').count(),6);
    assert(await page.locator('.mi-answer-wrong').evaluateAll(els=>els.filter(el=>el.textContent.includes('Sense respondre')).length===4));
    assert.equal(await page.locator('.mi-answer-correct').first().evaluate(el=>getComputedStyle(el).color),'rgb(22, 115, 59)');
    assert.equal(await page.locator('.mi-answer-wrong').first().evaluate(el=>getComputedStyle(el).color),'rgb(180, 35, 24)');

    await page.getByRole('button',{name:'Torna a començar',exact:true}).click();
    assert(await page.evaluate(()=>{const s=miTopicExam.getSession();return !s.finished&&!s.result&&s.answers.every(a=>a===null);}),id+' · reinici');

    for(const mode of ['correct','wrong','empty']){
      await page.evaluate(mode=>{
        const s=miTopicExam.getSession();
        if(mode==='empty')return;
        s.questions.forEach((q,i)=>{
          const j=q.options.findIndex(o=>mode==='correct'?String(o)===String(q.correct):String(o)!==String(q.correct));
          const el=document.querySelector('[name="topicQ'+i+'"][value="'+j+'"]');
          if(!el)throw new Error('Opció de resposta absent a la pregunta '+i);
          el.click();
        });
      },mode);
      await page.getByRole('button',{name:'Lliurar l’examen',exact:true}).click();
      const result=await page.evaluate(()=>miTopicExam.getSession().result);
      assert.equal(result.grade,mode==='correct'?10:0,id+' · nota '+mode);
      assert.equal(result.empty,mode==='empty'?12:0,id+' · buides '+mode);
      assert.equal(result.errors,mode==='wrong'?12:0,id+' · errors '+mode);
      await page.getByRole('button',{name:'Torna a començar',exact:true}).click();
    }
    await page.getByRole('button',{name:'← Tornar a la pràctica',exact:true}).click();
    await page.locator('#screenIntro.active').waitFor();
    assert(await page.locator('#miTopicExam').evaluate(el=>!el.classList.contains('active')),id+' · retorn a pràctica');
    console.log(option+' · '+id+': 12 preguntes, correcció parcial, encerts/errors/buides, reinici i retorn OK');
  }
  assert.deepEqual(errors,[],'Errors JS en els exàmens espacials');
  await browser.close();
  console.log(option+': completats '+expected.length+' exàmens de tema, sense errors JavaScript.');
})().catch(error=>{console.error(error);process.exit(1);});
