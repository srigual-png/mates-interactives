const assert=require('node:assert/strict');
const {launchPage,practice}=require('./estocastic-1eso-playwright-helper.cjs');

const topics=['poligons','mitjana','mediana','moda','probabilitat'];
const mathSource=String.raw`(topicId)=>{
  const fail=(ok,msg)=>{if(!ok)throw new Error(topicId+': '+msg);};
  let seed=0x2e50cafe;Math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
  const topic=TOPICS.find(t=>t.id===topicId),spec=MIFirstStochasticFamilies.topicSpecs(topicId),D=miTaskDifficulty;
  fail(topic&&spec&&D,'tema, catàleg i classificador carregats');
  const clean=s=>String(s||'').replace(/<[^>]*>/g,' ').replace(/&nbsp;/g,' ').replace(/\s+/g,' ').trim();
  const num=s=>Number(String(s).replace(',','.').match(/-?\d+(?:\.\d+)?/)?.[0]);
  const nums=s=>(String(s).match(/-?\d+(?:[.,]\d+)?/g)||[]).map(x=>Number(x.replace(',','.')));
  const med=a=>{const s=[...a].sort((x,y)=>x-y),m=s.length>>1;return s.length%2?s[m]:(s[m-1]+s[m])/2;};
  const rows=q=>{const d=new DOMParser().parseFromString(q.visual||'','text/html');return [...d.querySelectorAll('table tr')].map(r=>[...r.querySelectorAll('td')].map(c=>c.textContent.trim()));};
  const examples={},familyCounts={},types={},levels=[1,2,3].map(n=>spec.filter(f=>f.level===n).length),samples={regular:0,random:0,contextual:0};let rotationSamples=0;
  const visualSummary=visual=>{if(!visual)return '';const d=new DOMParser().parseFromString(visual,'text/html'),svg=d.querySelector('svg');if(svg){const dots=[...svg.querySelectorAll('circle')],texts=[...svg.querySelectorAll('text')],pairs=dots.map(dot=>{const x=Number(dot.getAttribute('cx')),y=Number(dot.getAttribute('cy')),value=texts.find(t=>Math.abs(Number(t.getAttribute('x'))-x)<.06&&Number(t.getAttribute('y'))<y)?.textContent.trim(),label=texts.find(t=>Math.abs(Number(t.getAttribute('x'))-x)<.06&&Number(t.getAttribute('y'))>120)?.textContent.trim();return label+': '+value;});return ' [gràfic: '+pairs.join('; ')+']';}const rows=[...d.querySelectorAll('table tr')].map(r=>[...r.querySelectorAll('th,td')].map(c=>c.textContent.trim()).join(' | '));return rows.length?' [taula: '+rows.join(' / ')+']':' ['+clean(visual)+']';};
  const add=(q,a)=>{const xs=examples[q.familyId]||(examples[q.familyId]=[]),s=clean(q.question)+visualSummary(q.visual);if(xs.length<3&&!xs.some(x=>x.question===s))xs.push({question:s,answer:String(a),level:q.taskDifficulty});};
  function check(q,kind){
    fail(q&&q.topicId===topicId,'identificador de tema');
    const f=MIFirstStochasticFamilies.familyFor(topic,q);
    fail(f&&q.familyId===f.id,'família assignada per catàleg · '+JSON.stringify({type:q.type,variant:q.variantId||q.difficultyVariant,pattern:q.patternId,family:q.familyId}));
    fail(D.getDifficulty(topic,q)===f.level&&q.taskDifficulty===f.level&&q.diff===f.level,'nivell del catàleg, intern i classificador coincideixen: '+f.id);
    if(kind!=='contextual'){
      fail(Array.isArray(q.options)&&q.options.length===4,'quatre opcions');
      fail(new Set(q.options.map(clean)).size===4,'distractors diferents');
      fail(q.options.filter(o=>clean(o)===clean(q.correct)).length===1,'una sola resposta correcta');
      fail(Array.isArray(q.guide)&&q.guide.length>=2&&Array.isArray(q.solution)&&q.solution.length>=2,'dues pistes i solució explicada');
    }else if(q.kind==='construct')fail(Array.isArray(q.target)&&q.target.length===5&&q.target.every(Number.isInteger)&&q.target.every(x=>x>=2&&x<=10),'objectiu de construcció vàlid');
    else fail(q.answer&&typeof q.answer.check==='function'&&q.answer.check(q.answer.val),'corrector accepta la resposta generada');
    const t=Number(q.type),s=clean(q.question),n=nums(s),a=num(q.correct);
    if(topicId==='poligons'&&kind==='regular'){
      if(t<=8){const d=new DOMParser().parseFromString(q.visual||'','text/html'),svg=d.querySelector('svg'),dots=svg?[...svg.querySelectorAll('circle')]:[],line=svg&&svg.querySelector('polyline'),texts=svg?[...svg.querySelectorAll('text')]:[];fail(dots.length===5&&line,'polígon amb cinc punts i línia');const points=line.getAttribute('points').split(' ').map(p=>p.split(',').map(Number));fail(points.length===dots.length&&points.every((p,i)=>Math.abs(p[0]-Number(dots[i].getAttribute('cx')))<.06&&Math.abs(p[1]-Number(dots[i].getAttribute('cy')))<.06),'segments uneixen els punts en ordre');
        const values=dots.map(dot=>{const label=texts.find(x=>Math.abs(Number(x.getAttribute('x'))-Number(dot.getAttribute('cx')))<.06&&Number(x.getAttribute('y'))<Number(dot.getAttribute('cy')));return Number(label?.textContent);}),labels=dots.map(dot=>texts.find(x=>Math.abs(Number(x.getAttribute('x'))-Number(dot.getAttribute('cx')))<.06&&Number(x.getAttribute('y'))>120)?.textContent.trim());
        fail(values.length===5&&values.every(Number.isInteger)&&labels.every(Boolean),'escales i etiquetes del polígon');
        if(t===1){const m=s.match(/valor (\d+)/),i=labels.indexOf(m?.[1]);fail(i>=0&&a===values[i],'lectura freqüència a partir del punt');}
        if(t===2||t===12){const i=values.indexOf(Math.max(...values));fail(String(q.correct)===labels[i],'màxim del polígon');}
        if(t===3){const i=values.indexOf(Math.min(...values));fail(String(q.correct)===labels[i],'mínim del polígon');}
        if(t===4){const m=s.match(/més freqüència: (\d+) o (\d+)/),i=labels.indexOf(m?.[1]),j=labels.indexOf(m?.[2]);fail(m&&i>=0&&j>=0&&Number(q.correct)===Number(labels[values[i]>values[j]?i:j]),'comparació de freqüències');}
        if(t===5){const m=s.match(/valors (\d+) i (\d+)/),i=labels.indexOf(m?.[1]),j=labels.indexOf(m?.[2]);fail(m&&i>=0&&j>=0&&a===Math.abs(values[i]-values[j]),'diferència de freqüències');}
        if(t===6){const m=s.match(/valors (\d+) i (\d+)/),i=labels.indexOf(m?.[1]),j=labels.indexOf(m?.[2]);fail(m&&i>=0&&j>=0&&a===values[i]+values[j],'suma de freqüències parcials');}
        if(t===7)fail(a===values.reduce((x,y)=>x+y,0),'total de freqüències');
        if(t===8){const m=s.match(/freqüència (\d+)/);fail(m&&labels[values.indexOf(Number(m[1]))]===String(q.correct),'cerca inversa de freqüència');}
      }
    }
    if(topicId==='mitjana'&&kind==='random'){
      if(t===1){const d=n,m=d.reduce((x,y)=>x+y,0)/d.length;fail(d.length>=3&&Math.abs(a-Math.round(m*100)/100)<.011,'mitjana llista independent');}
      if(t===2){const m=s.match(/mitjana de (\d+) notes és (\d+).*?són: ([\d, ]+)/),known=m?.[3].split(',').map(Number),expected=m&&Number(m[1])*Number(m[2])-known.reduce((x,y)=>x+y,0);fail(m&&a===expected&&expected>0,'dada desconeguda per suma total');}
      if(t===3){const m=s.match(/suma de les dades si la mitjana de (\d+) valors és (\d+)/);fail(m&&a===Number(m[1])*Number(m[2]),'suma recuperada com n per mitjana');}
      if(t===4){const r=rows(q),v=r[0].map(Number),f=r[1].map(Number),expected=v.reduce((x,z,i)=>x+z*f[i],0)/f.reduce((x,y)=>x+y,0);fail(v.length===f.length&&f.every(x=>x>0)&&Math.abs(a-Math.round(expected*100)/100)<.011,'mitjana ponderada independent');}
    }
    if(topicId==='mediana'&&kind==='random'){
      if(t===1||t===3){const start=s.indexOf(':')+1,end=s.indexOf(' (n=');const d=nums(s.slice(start,end));fail(d.length>0&&Math.abs(a-med(d))<.011,'mediana independent de dades desordenades');if(t===1)fail((d.length%2===0)===(q.difficultyVariant==='even'),'variant senar/parell');}
      if(t===2)fail(/valor central.*ordenades/.test(q.correct)&&/suma dividida per n/.test(q.correct),'distinció definicional mitjana/mediana');
      if(t===4){const d=nums(s.slice(s.indexOf(':')+1,s.lastIndexOf('.')));fail(d.length%2===1&&d.every((x,i)=>i===0||d[i-1]<=x)&&a===med(d),'mediana senar de dades ordenades');}
    }
    if(topicId==='moda'&&kind==='regular'){
      if(t===1||t===3){const d=nums(s.slice(s.indexOf(':')+1,s.lastIndexOf('?'))),counts=new Map();d.forEach(x=>counts.set(x,(counts.get(x)||0)+1));const mx=Math.max(...counts.values()),modes=[...counts].filter(x=>x[1]===mx).map(x=>x[0]).sort((x,y)=>x-y),expect=modes.join(' i ');fail(String(q.correct)===expect,'totes les modes numèriques');if(t===1)fail(modes.length===1,'moda numèrica única');if(t===3)fail(modes.length>=2,'empat multimodal');}
      if(t===2){const r=rows(q),cats=r[0],freq=r[1].map(Number),m=Math.max(...freq),expected=cats.filter((_,i)=>freq[i]===m);fail(expected.length===1&&q.correct===expected[0],'moda de taula inequívoca');}
      if(t===8)fail(q.correct==='Buscant la freqüència més alta i el valor o categoria corresponent','procediment de localització de la moda en una taula');
      if(t===4){const d=nums(s.match(/dades són ([\d, ]+)/)?.[1]),x=nums(s.match(/de valor (\d+)/)?.[1])[0],all=[...d,x,x],counts=new Map();all.forEach(v=>counts.set(v,(counts.get(v)||0)+1));const mx=Math.max(...counts.values()),modes=[...counts].filter(v=>v[1]===mx).map(v=>v[0]);fail(modes.length===1&&Number(q.correct)===modes[0],'actualització de moda amb dades afegides');}
      if(t===11){const d=nums(s.match(/dades són ([\d, ]+)/)?.[1]);fail(d.length>0&&new Set(d).size===d.length&&q.correct==='No hi ha moda'&&/convenció/i.test(s),'absència de moda segons la convenció explicitada');}
      if(t===3)fail(/modes són/.test(q.solution.join(' ')),'resolució enumera totes les modes');
    }
    if(topicId==='probabilitat'&&kind==='regular'){
      if([4,5,6,7,11].includes(t)){
        const m=q.solution.join(' ').match(/(?:P\s*\(?[^)]*\)?\s*=|P\(A\)\s*=|=)\s*(\d+)\/(\d+)/),frac=String(q.correct).match(/^(\d+)\/(\d+)$/);fail(frac&&m,'fracció de Laplace explícita');const x=Number(m[1])/Number(m[2]),y=Number(frac[1])/Number(frac[2]);fail(Math.abs(x-y)<1e-10&&x>=0&&x<=1,'probabilitat entre zero i u i fracció equivalent');
        if(t===5){const v=s.match(/(\d+) boles vermelles, (\d+) blaves i (\d+) verdes/),f=String(q.correct).match(/(\d+)\/(\d+)/),color=s.match(/probabilitat de treure una bola (vermella|blava|verda)/i)?.[1]?.toLowerCase(),target=color==='vermella'?Number(v?.[1]):color==='blava'?Number(v?.[2]):Number(v?.[3]);fail(v&&f&&Number(f[1])*([Number(v[1]),Number(v[2]),Number(v[3])].reduce((a,b)=>a+b,0))===target*Number(f[2]),'urna afavoreix el color demanat');}
        if(t===7){const v=s.match(/ruleta té (\d+) sectors iguals i (\d+) són/),f=String(q.correct).match(/(\d+)\/(\d+)/);fail(v&&f&&Number(f[1])*Number(v[1])===Number(v[2])*Number(f[2]),'ruleta equiprobable');}
      }
      if(t===8){const v=s.match(/hi ha (\d+) boles .*?, (\d+) .*? i (\d+) d'altres colors/),chooseA=/Quin esdeveniment/.test(s),fr=q.solution.join(' ');fail(v&&fr.includes(String(Number(v[1])))&&fr.includes(String(Number(v[2]))),'comparació amb el mateix total');}
      if(t===9){const m=s.match(/En (\d+) repeticions.*? (\d+) vegades/);fail(m&&Math.abs(a-Number(m[2])/Number(m[1]))<.011,'freqüència relativa observada');}
      if(t===10)fail(q.correct==='Probabilitat teòrica'||q.correct==='Freqüència relativa experimental','distinció teoria/experiment');
    }
    familyCounts[q.familyId]=(familyCounts[q.familyId]||0)+1;types[t]=(types[t]||0)+1;samples[kind]++;add(q,kind==='contextual'?(q.answer?.val??q.solution.join(' ')):q.correct);
  }
  const builders={poligons:buildPoligonsPool,moda:buildModaPool,probabilitat:buildProbabilitatPool};
  const expectedPools={poligons:84,moda:56,probabilitat:141};
  if(builders[topicId]){
    const bag=builders[topicId]();fail(bag.length===expectedPools[topicId],'mida del banc exhaustiu '+bag.length+'/'+expectedPools[topicId]);
    for(const q of bag)check(q,'regular');
    const next={poligons:genPoligons,moda:genModa,probabilitat:genProbabilitat}[topicId],bagName={poligons:'poligonsBag',moda:'modaBag',probabilitat:'probabilitatBag'}[topicId],lastName={poligons:'lastPoligonsFamily',moda:'lastModaFamily',probabilitat:'lastProbFamily'}[topicId];
    window[bagName]=[];window[lastName]=null;let prev=null,rotation=0;
    for(let i=0;i<bag.length*2;i++){const q=next();if(prev!==null)fail(q.familyId!==prev,'rotació sense repetició familiar consecutiva a '+i);prev=q.familyId;rotation++;}fail(rotation===bag.length*2,'reposició de bossa');rotationSamples=rotation;
  }else{
    const generate=topicId==='mitjana'?genMitjana:genMediana;
    for(let t=1;t<=4;t++)for(let i=0;i<250;i++){
      const old=rnd;let first=true,second=true;rnd=function(min,max){if(first){first=false;return t;}if(topicId==='mediana'&&t===1&&second){second=false;return i%2;}return old(min,max);};let q;try{q=generate();}finally{rnd=old;}check(q,'random');
    }
  }
  const patterns=ST_OPEN_PATTERNS.filter(p=>p.topicId===topicId&&(p.family!=='construccio'||(topicId==='poligons'&&p.id==='K2')));
  const patternCounts={};
  for(const p of patterns){for(let i=0;i<250;i++){const q=p.gen();check(q,'contextual');patternCounts[p.id]=(patternCounts[p.id]||0)+1;}}
  const found=new Set(Object.keys(familyCounts));Object.keys(patternCounts).forEach(id=>{const f=MIFirstStochasticFamilies.familyFor(topic,{patternId:id});if(f)found.add(f.id);});
  fail(found.size===spec.length,'cobertura de famílies; absents '+spec.filter(f=>!found.has(f.id)).map(f=>f.id).join(', '));
  return {topic:topicId,families:spec.length,levels,regularPool:expectedPools[topicId]||0,samples,regularTypes:types,regularFamilyCounts:familyCounts,contextPatterns:patternCounts,rotations:rotationSamples,familyCatalog:spec,examples,browser:'Chromium (via helper)'};
}`;

async function runLot2MathTopic(topicId){
  assert(topics.includes(topicId),'Tema Lot 2 desconegut: '+topicId);
  const {browser,page,engine,errors}=await launchPage();
  try{const result=await page.evaluate(({fn,id})=>(0,eval)(fn)(id),{fn:mathSource,id:topicId});if(errors.length)throw new Error('Errors JavaScript: '+errors.join(' | '));result.browser=engine;result.pageErrors=errors;return result;}
  finally{await browser.close();}
}

async function runLot2UiTopic(topicId){
  assert(topics.includes(topicId),'Tema Lot 2 desconegut: '+topicId);
  const fail=(ok,msg)=>assert.ok(ok,msg);
  const {browser,page,engine,errors}=await launchPage();
  try{
    const result=await page.evaluate(async id=>{
      const fail=(ok,msg)=>{if(!ok)throw new Error(id+': '+msg);};
      let seed=0x1e50cafe;Math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
      const t=TOPICS.find(x=>x.id===id);fail(t,'tema disponible');selectTopic(TOPICS.indexOf(t));selectLevel(1);selectMode('multi');startPractice();
      fail(document.getElementById('screenExercise').classList.contains('active'),'pràctica guiada oberta');fail(document.querySelectorAll('#optionsGrid .opt-btn').length===4,'quatre opcions visibles');
      const buttons=[...document.querySelectorAll('#optionsGrid .opt-btn')],at=buttons.findIndex(b=>b.textContent.trim()===String(currentEx.correct));fail(at>=0,'opció correcta visible');buttons[at].click();fail(document.getElementById('feedbackArea').textContent.trim(),'correcció guiada retorna feedback');document.getElementById('btnNext').click();fail(state.exCount===2,'avanç d’exercici');
      const retryButtons=[...document.querySelectorAll('#optionsGrid .opt-btn')],wrong=retryButtons.findIndex(b=>b.textContent.trim()!==String(currentEx.correct));fail(wrong>=0,'distractor per provar recuperació');retryButtons[wrong].click();fail(document.getElementById('feedbackArea').textContent.trim(),'resposta incorrecta retorna feedback');document.getElementById('btnNext').click();fail(state.exCount===3,'es pot continuar després d’un error');
      selectLevel(2);selectMode('multi');startPractice();fail(document.getElementById('screenExercise').classList.contains('active')&&document.querySelectorAll('#optionsGrid .opt-btn').length===4,'pràctica autònoma accessible');
      selectMode('open');startPractice();fail(document.getElementById('openWrap').style.display==='block','pràctica de resposta oberta');fail(currentEx.answer.check(currentEx.answer.val),'resposta oberta acceptada');
      const familyTrace=[currentEx.familyId];for(let i=1;i<20;i++){const q=stNextIntegratedOpen(id);fail(q&&q.familyId,'problema obert #'+(i+1));fail(q.familyId!==familyTrace[i-1],'no repeteix família oberta consecutiva a #'+(i+1));familyTrace.push(q.familyId);}document.getElementById('openInput').value=String(currentEx.answer.val);checkIntegratedOpen();fail(document.getElementById('feedbackArea').textContent.trim(),'correcció de resposta oberta');
      const session=()=>{miTopicExam.start(id);return miTopicExam.getSession();},exam=session();fail(exam&&exam.questions.length===12,'examen tema 12 preguntes');const examFamilies=new Set(exam.questions.map(q=>q.familyId).filter(Boolean));
      miExamSelectedTopics=[id];miStartConfiguredExam();const globalQuestions=state.examQs||[];fail(globalQuestions.length===20,'examen global de 20 preguntes');const badGlobal=globalQuestions.filter(q=>q.topicId!==id||![1,2,3].includes(q.taskDifficulty)||!((Array.isArray(q.options)&&q.options.filter(o=>String(o)===String(q.correct)).length===1)||(q.answer&&typeof q.answer.check==='function'&&q.answer.check(q.answer.val))));fail(!badGlobal.length,'classificació i correcció de les preguntes globals '+JSON.stringify(badGlobal.slice(0,2).map(q=>({topicId:q.topicId,type:q.type,patternId:q.patternId,familyId:q.familyId,diff:q.taskDifficulty,correct:q.correct,options:q.options,answer:q.answer?.val}))));
      const globalFamilies=new Set(globalQuestions.map(q=>q.familyId).filter(Boolean));
      const extensionSmoke={};for(const extensionId of ['acumulades2','histograma']){const extension=TOPICS.find(x=>x.id===extensionId);fail(extension&&typeof extension.gen==='function',extensionId+' ampliació disponible');for(let i=0;i<30;i++){const q=extension.gen();fail(q&&q.topicId===extensionId&&q.question&&q.correct!==undefined,extensionId+' exercici coherent #'+(i+1));}extensionSmoke[extensionId]=30;}
      return {topic:id,guiada:'ok',autonoma:'ok',familyTrace,examQuestions:exam.questions.length,examUniqueFamilies:examFamilies.size,globalExamQuestions:globalQuestions.length,globalExamUniqueFamilies:globalFamilies.size,extensionSmoke};
    },topicId);
    await page.setViewportSize({width:390,height:844});const mobile=await page.evaluate(id=>{if(id==='poligons'){const q=buildPoligonsPool().find(x=>x.type===1);document.getElementById('exQuestion').innerHTML=q.question+'<div class="ex-visual">'+q.visual+'</div>';document.getElementById('screenExercise').classList.add('active');}return {width:innerWidth,scrollWidth:document.documentElement.scrollWidth,svg:[...document.querySelectorAll('#exQuestion svg')].map(x=>{const r=x.getBoundingClientRect();return {width:r.width,height:r.height};})};},topicId);fail(mobile.scrollWidth<=mobile.width,topicId+': horitzontal overflow 390px '+JSON.stringify(mobile));if(topicId==='poligons')fail(mobile.svg.length===1&&mobile.svg[0].width>0&&mobile.svg[0].height>0,'polígon visible i amb mida a 390px');
    if(errors.length)throw new Error(topicId+': JavaScript errors '+errors.join(' | '));return {...result,mobile,browser:engine,pageErrors:errors};
  }finally{await browser.close();}
}
module.exports={topics,practice,runLot2MathTopic,runLot2UiTopic};
