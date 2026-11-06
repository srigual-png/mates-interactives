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
    await page.addInitScript(() => {
      let seed=42;
      Math.random=()=>((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/4294967296);
      localStorage.setItem('sn1eso_v4',JSON.stringify({done:[],errors:{naturals:[
        {id:'prova-historica',topicId:'naturals',question:'Error anterior',correct:'4',answer:'3'}
      ]}}));
    });
    await page.goto(pathToFileURL(resolve('1eso/sentit-numeric.html')).href);
    const cases = await page.evaluate(() => {
      const check=(value,message)=>{if(!value)throw Error(message);};
      const element=id=>document.getElementById(id);
      const topics=['naturals','decimal_sys','ops','potencies','jerarquia','divis'];
      const repeat=(n,value)=>Array(n).fill(value);
      const historical=JSON.stringify(state.errors.naturals[0]);
      function start(id,level){
        selTopic(TOPICS.findIndex(t=>t.id===id));
        selLv(level);selMode('open');startP();
        const session=adaptivePracticeSessions[id];
        check(session.correct===0&&session.incorrect===0&&session.points===0,'Reinici de '+id);
        check(element('bChg').style.display==='block','Sortida disponible');
        // N1 starts with an ordinary input, so an empty attempt is testable through the UI.
        element('openInput').value=' ';
        checkOpen();
        check(!state.answered&&session.correct+session.incorrect===0,'Entrada buida');
        return session;
      }
      function run(id,level,answers,complete,expectedPoints){
        const session=start(id,level);
        let points=0;
        answers.forEach((correct,index)=>{
          check(!element('sDecimalResult').classList.contains('active'),'Final prematur');
          processPracticeAnswer(correct,correct?currentEx.correct:'Resposta de prova');
          points=Math.max(0,Math.min(NEEDED[level],points+(correct?1:-1)));
          check(session.points===points,'Punts adaptatius');
          check(element('sb').style.width===Math.round(100*points/NEEDED[level])+'%','Barra de dificultat');
          processPracticeAnswer(correct,'Intent duplicat');
          check(session.correct+session.incorrect===index+1,'Una resposta per pregunta');
          if(index+1<answers.length)nextEx();
        });
        check(expectedPoints===undefined||session.points===expectedPoints,'Punts finals');
        if(!element('sDecimalResult').classList.contains('active')){
          if(complete)nextEx();
          else{
            if(answers.length)nextEx();
            goBack();
          }
        }
        return session;
      }
      function result(correct,incorrect,percent,objective=''){
        const total=correct+incorrect;
        check(element('sDecimalResult').classList.contains('active'),'Pantalla comuna');
        check(element('decimalResultScore').textContent===correct+'/'+total,'Resultat principal');
        check(element('practiceResultMetric').textContent===(total?percent+'% d’encerts':'Encara no hi ha respostes.'),'Percentatge');
        check(element('decimalResultCount').textContent===String(total)&&element('decimalResultCorrect').textContent===String(correct)&&
          element('decimalResultIncorrect').textContent===String(incorrect),'Tres comptadors');
        const progress=element('decimalResultProgress');
        check(progress.max===100&&Math.abs(progress.value-(total?100*correct/total:0))<1e-9&&
          (progress.style.display==='none')===!total,'Barra del resultat');
        check(element('decimalResultTitle').textContent===(objective?'Objectiu assolit!':'Pràctica finalitzada')&&
          element('decimalResultIcon').hidden===!objective&&element('decimalResultStatus').textContent===objective,'Objectiu i trofeu');
      }
      for(const id of topics){
        run(id,2,[...repeat(6,false),...repeat(14,true)],true);
        result(14,6,'70','Objectiu completat: 20 preguntes contestades.');
        check(state.done.includes(id),'Distintiu persistent');
        run(id,1,[],false);
        result(0,0,'');
      }
      for(const id of topics.slice(2)){
        run(id,1,[true,true,false,false,...repeat(8,true)],true,8);
        result(10,2,'83,3','Objectiu completat: 10 encerts acumulats.');
      }
      run('naturals',1,[false,true,true,false,true,true,false,true,true,true],true);
      result(7,3,'70','Objectiu completat: 10 preguntes contestades.');
      run('naturals',1,repeat(9,true),false);
      check(state.exCount===10,'Desena pregunta mostrada però pendent');
      result(9,0,'100');
      run('decimal_sys',1,[true,true,false,false,...repeat(8,true)],false,8);
      result(10,2,'83,3');
      run('decimal_sys',1,[true,true,false,false,...repeat(10,true)],true,10);
      result(12,2,'85,7','Objectiu completat: 10 punts de progrés.');
      run('ops',1,repeat(10,true),true);
      result(10,0,'100','Objectiu completat: 10 encerts acumulats.');
      run('divis',2,[true,false,true],false);
      result(2,1,'66,7');
      check(state.exCount===4,'Pregunta pendent exclosa');
      check(JSON.stringify(state.errors.naturals.find(e=>e.id==='prova-historica'))===historical,'Error anterior conservat');
      showHome();
      const card=[...document.querySelectorAll('.tc')].find(el=>el.querySelector('h3')?.textContent.includes('Nombres naturals'));
      check(card.querySelector('.tbadge').textContent.includes('Fet')&&
        card.querySelector('.errtag').textContent===state.errors.naturals.length+' errors','Distintiu i errors a la portada');
      run('jerarquia',1,[true,true,false,false,...repeat(8,true)],true,8);
      result(10,2,'83,3','Objectiu completat: 10 encerts acumulats.');
      return {topics:topics.length,modalities:topics.length*2};
    });
    if(process.env.MI_RESULT_SCREENSHOTS){
      await page.screenshot({fullPage:true,path:resolve(process.env.MI_RESULT_SCREENSHOTS,'resultat-10-de-12.png')});
      await page.setViewportSize({width:390,height:844});
      await page.screenshot({fullPage:true,path:resolve(process.env.MI_RESULT_SCREENSHOTS,'resultat-mobil.png')});
      await page.evaluate(()=>{startP();leavePractice();});
      await page.screenshot({fullPage:true,path:resolve(process.env.MI_RESULT_SCREENSHOTS,'resultat-sense-respostes.png')});
    }
    assert.deepEqual(errors,[]);
    console.log(JSON.stringify(cases));
  } finally {
    await browser.close();
  }
}
main().catch(error=>{console.error(error);process.exitCode=1;});
