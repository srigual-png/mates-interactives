const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {chromium}=require('playwright');

const url='file:///'+path.resolve('4eso/sentit-espacial.html').replace(/\\/g,'/');
const core=['figures4t','vectors4t','components4t','operacionsVectors4t','coordenadesVectors4t','homotecies4t','geometriaFuncions4t','regions4t'];
const routeB=['rectesAmpA','elementsRectaAmpB','posicioRectesAmpC'];
const extensionD='geometriaAnaliticaAmpD';

(async()=>{
  const browser=await chromium.launch({headless:true});
  try{
    const page=await browser.newPage();
    for(const option of ['A','B']){
      await page.goto(url+'?opcio='+option);
      await page.waitForFunction(()=>typeof MATH_OPTION!=='undefined'&&document.querySelector('#screenHome.active'));
      const data=await page.evaluate(()=>{
        const ids=xs=>xs.map(t=>t.id);
        const core=TOPICS.filter(t=>t.scope==='AB'&&!t.isExtension);
        const b=TOPICS.filter(t=>t.bRequired);
        const d=TOPICS.find(t=>t.id==='geometriaAnaliticaAmpD');
        const lastCore=TOPICS.findIndex(t=>t.id==='regions4t');
        const next=nextTopicIndex(lastCore);
        return {
          option:MATH_OPTION,
          core:ids(core),
          required:ids(TOPICS.filter(isRequiredTopic)),
          exam:ids(miTopicExam.getTopics()),
          b:ids(b),
          d:d&&{required:isRequiredTopic(d),exam:isExamTopic(d)},
          nextAfterCore:next<0?null:TOPICS[next].id,
          nextByRequired:TOPICS.filter(isRequiredTopic).map(t=>{const n=nextTopicIndex(TOPICS.indexOf(t));return n<0?null:TOPICS[n].id}),
          routeNote:[...document.querySelectorAll('.p6-section-note')].map(x=>x.textContent).find(x=>x.includes('recorregut'))
        };
      });
      assert.equal(data.option,option);
      assert.deepEqual(data.core,core,'Els vuit blocs comuns han de coincidir a A i B');
      assert.deepEqual(data.b,routeB,'Els blocs A-C de rectes han de ser exactament tres');
      assert.deepEqual(data.required,option==='A'?core:[...core,...routeB],
        'La progressió obligatòria ha de respectar l’opció');
      assert.deepEqual(data.exam,option==='A'?core:[...core,...routeB],
        'El selector d’examen per tema ha de respectar l’opció');
      assert.deepEqual(data.d,{required:false,exam:false},
        'El bloc D ha de continuar opcional i fora de l’examen a A i B');
      assert.equal(data.nextAfterCore,option==='A'?null:routeB[0],
        'La navegació de progrés ha de tancar A i continuar amb B');
      const expectedRoute=option==='A'?core:[...core,...routeB];
      assert.deepEqual(data.nextByRequired,expectedRoute.slice(1).concat(null),
        'Cada pas de progrés ha de seguir l’ordre complet de l’itinerari');
      assert(data.routeNote?.includes(option==='A'?'Matemàtiques A':'Matemàtiques B'),
        'La pàgina ha d’explicitar l’itinerari seleccionat');
      for(const id of routeB){
        await page.evaluate(id=>selectTopic(TOPICS.findIndex(t=>t.id===id)),id);
        const state=await page.evaluate(()=>({
          required:isRequiredTopic(TOPICS[state.currentTopic]),
          examVisible:!document.getElementById('miTopicExamLaunch').hidden,
          label:document.querySelector('#tabTheory .theory-box h3')?.textContent||''
        }));
        assert.equal(state.required,option==='B',id+' · estat obligatori');
        assert.equal(state.examVisible,option==='B',id+' · disponibilitat d’examen');
        assert(state.label.includes(option==='A'?'Opcional en A':'Matemàtiques B'),id+' · etiqueta');
      }
      await page.evaluate(()=>showHome());
      console.log(option+': '+data.required.length+' blocs obligatoris i '+data.exam.length+
        ' blocs a l’examen; A-C '+(option==='B'?'inclosos':'opcionals')+'; D opcional i fora de l’examen.');
    }
    const catalog=JSON.parse(fs.readFileSync('assets/data/index-cerca.json','utf8'));
    const spatial=catalog.filter(e=>e.course===4&&e.sense==='Sentit espacial');
    assert.equal(spatial.length,12,'El cercador ha de tenir vuit blocs comuns, A-C i D');
    const searchableExams=spatial.filter(e=>e.exam);
    const getTopic=e=>new URL(e.exam,'https://mi.invalid').searchParams.get('topic');
    assert.deepEqual(searchableExams.map(getTopic),[...core,...routeB],
      'El cercador ha d’oferir exactament els 11 exàmens obligatoris');
    for(const id of routeB){
      const entry=searchableExams.find(e=>getTopic(e)===id);
      assert.deepEqual(entry.modes,['B'],id+' · cercador només per a B');
      assert.equal(new URL(entry.exam,'https://mi.invalid').searchParams.get('opcio'),'B',
        id+' · l’enllaç d’examen ha d’activar B');
    }
    const dEntry=spatial.find(e=>e.practice?.includes('topic='+extensionD));
    assert(dEntry,'D ha de continuar accessible com a pràctica opcional');
    assert.deepEqual(dEntry.modes,['A','B']);
    assert.equal(dEntry.exam,undefined,'D no ha d’aparèixer com a examen');
    const local=JSON.parse(fs.readFileSync('assets/data/index-cerca-local.js','utf8')
      .replace(/^window\\.MICercaLocal = /,'').trim().replace(/;$/,''));
    assert.deepEqual(local,catalog,'La versió local i la JSON del cercador han de coincidir');
    console.log('Cercador espacial: 12 temes; 11 exàmens; A-C només B; D pràctica opcional.');
  }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1);});
