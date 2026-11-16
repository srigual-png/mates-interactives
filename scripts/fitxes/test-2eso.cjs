const fs=require('fs'),path=require('path'),http=require('http'),assert=require('assert');
const {chromium}=require('playwright');
const root=process.cwd(),server=http.createServer((req,res)=>{const f=path.join(root,decodeURIComponent(req.url.split('?')[0]));if(!f.startsWith(root+path.sep)){res.writeHead(403).end();return;}fs.readFile(f,(err,data)=>{if(err){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.js':'text/javascript','.css':'text/css','.html':'text/html','.ttf':'font/ttf'})[path.extname(f)]||'application/octet-stream');res.end(data);});});
(async()=>{await new Promise(r=>server.listen(0,'127.0.0.1',r));const browser=await chromium.launch({...(process.env.MI_BROWSER_PATH?{executablePath:process.env.MI_BROWSER_PATH}:{}),headless:true});try{
 const p=await browser.newPage(),errors=[],requests=[];p.on('pageerror',e=>errors.push(e.message));p.on('request',r=>requests.push(r.url()));
 // file:// no permet fetch() de la font. La fixture serveix localment els mateixos bytes
 // del fitxer font per validar la generació i exportació sense dependre del servidor web.
 const fontBase64=fs.readFileSync(path.join(root,'assets/vendor/fitxes/LiberationSans-Regular.ttf')).toString('base64');
 await p.addInitScript(data=>{const original=window.fetch.bind(window);window.fetch=(resource,...args)=>String(resource).endsWith('/LiberationSans-Regular.ttf')?Promise.resolve(new Response(Uint8Array.from(atob(data),c=>c.charCodeAt(0)),{status:200,headers:{'Content-Type':'font/ttf'}})):original(resource,...args);},fontBase64);
 await p.goto('file:///'+path.resolve('2eso/sentit-numeric.html').replaceAll(String.fromCharCode(92),'/'));await p.waitForSelector('#ws-generate');
 assert(!requests.some(u=>u.includes('/vendor/fitxes/')));assert((await p.locator('#ws-summary').innerText()).startsWith('2n d’ESO'));assert.equal(await p.locator('[name="ws-topic"]').count(),8);
// El perfil de Racionals només apareix quan és l’únic tema. Mida 8 i quotes exactes.
 const originalTopics=await p.locator('[name="ws-topic"]').evaluateAll(es=>es.filter(e=>e.checked).map(e=>e.value));
 await p.evaluate(()=>{document.querySelectorAll('[name="ws-topic"]').forEach(e=>{e.checked=e.value==='racionals';});document.querySelector('[name="ws-topic"]').dispatchEvent(new Event('change',{bubbles:true}));});
 assert(await p.locator('#ws-rational-profile-wrap').isVisible());assert(await p.locator('.mi-wide').isHidden());await p.selectOption('#ws-count','8');
 assert.deepEqual(await p.evaluate(()=>MIWorksheetUI.getConfig().percentages),[40,60,0]);
 assert.deepEqual(await p.evaluate(()=>MIWorksheets.allocate(MIWorksheetUI.getConfig(),MIWorksheetConfig.topics).map(x=>x.counts).flat()),[3,5,0]);
 await p.selectOption('#ws-rational-profile','extension');assert.deepEqual(await p.evaluate(()=>MIWorksheetUI.getConfig().percentages),[0,20,80]);
 assert.deepEqual(await p.evaluate(()=>MIWorksheets.allocate(MIWorksheetUI.getConfig(),MIWorksheetConfig.topics).map(x=>x.counts).flat()),[0,2,6]);
 await p.evaluate(()=>{document.querySelectorAll('[name="ws-topic"]').forEach(e=>{e.checked=['racionals','fraccionsSentit'].includes(e.value);});document.querySelector('[name="ws-topic"]').dispatchEvent(new Event('change',{bubbles:true}));});
 assert(await p.locator('#ws-rational-profile-wrap').isHidden());assert(await p.locator('.mi-wide').isVisible());
 assert.equal(await p.evaluate(()=>MIWorksheets.validate(MIWorksheetUI.getConfig(),MIWorksheetConfig.topics)),'');
 await p.evaluate(()=>{document.querySelectorAll('[name="ws-topic"]').forEach(e=>e.checked=e.value==='racionals');document.querySelector('#ws-rational-profile').value='extension';const t=MIWorksheetConfig.topics.find(t=>t.id==='racionals');t.capacities=[10,10,2];document.querySelector('#ws-count').value='8';document.querySelector('#ws-count').dispatchEvent(new Event('change',{bubbles:true}));});
 assert((await p.locator('#ws-validation').innerText()).includes('se’n demanen 6'));assert(await p.locator('#ws-generate').isDisabled());
 await p.evaluate(originalTopics=>{const t=MIWorksheetConfig.topics.find(t=>t.id==='racionals');delete t.capacities;window.originalTopics=originalTopics;document.querySelector('#ws-count').value='15';document.querySelector('#ws-rational-profile').value='standard';document.querySelectorAll('[name="ws-topic"]').forEach(e=>e.checked=originalTopics.includes(e.value));document.querySelector('[name="ws-topic"]').dispatchEvent(new Event('change',{bubbles:true}));},originalTopics);
 const data=await p.evaluate(async()=>{
  const C=MIWorksheetConfig,E=MIWorksheets,check=(ok,m)=>{if(!ok)throw Error(m);};
  const gens={racionals:genRacionals2ESO,fraccionsSentit:genFraccionsSentit2ESO,operacionsRacionals:genOperacionsRacionals2ESO,potencies:genPotencies2ESO,aproximacions:genAproximacions2ESO,proporcionalitat:genProporcionalitat2ESO,percentatges:genPercentatges2ESO,recomptes:genRecomptes2ESO};
  const all=[];
  for(const t of C.topics)for(const [level,types] of C.levels[t.id].entries())for(const type of types)for(const variant of t.id==='potencies'&&type===18?['square','cube','growth']:[undefined]){
   const q=await C.adapt(t.id,gens[t.id](type,variant)),expected=t.id==='potencies'&&type===18?MIDifficulty.potencies2ESOInfo({type,variantId:variant,question:q.question}).level:level+1;check(q.level===expected,'nivell '+t.id+':'+type+'/'+variant);check(!/undefined|NaN|Infinity|<svg/.test(JSON.stringify(q)),'dades incompletes');check(q.steps.length>0&&q.answer,'solució');
   if(t.id==='racionals'&&type===9)check(q.figure?.data.startsWith('data:image/png'),'figura necessària');
   if(t.id==='racionals'&&type===10)check(q.options.length===4,'interval amb resposta única entre les opcions');
   if(t.id==='potencies'&&type===15)check(q.question.includes('^□'),'exponent desconegut');
   all.push({...q,topicId:t.id,topicName:t.name});
  }
   const base={count:10,topics:C.topics.map(t=>t.id),percentages:[40,40,20],worksheetType:'standard',order:'grouped',space:'normal',format:'both',solutions:'steps'};
   for(const n of [10,15,25,30])for(const percentages of [[40,40,20],[100,0,0],[0,100,0]]){
    const config={...base,count:n,topics:C.topics.map(t=>t.id),percentages};
    const sheet=await E.generate(config,C.topics),q=sheet.questions;
    check(q.length===n&&new Set(q.map(x=>x.key)).size===n,'total/duplicats');
    const totals=C.topics.map(t=>q.filter(x=>x.topicId===t.id).length);check(Math.max(...totals)-Math.min(...totals)<=1,'equilibri');
    check(JSON.stringify([1,2,3].map(l=>q.filter(x=>x.level===l).length))===JSON.stringify(E.counts(n,percentages)),'quotes');
   }
   // Un N3 exclusiu no és viable si Potències forma part dels vuit temes:
   // el catàleg complet manté el mode ordinari i ha d’explicar el bloqueig.
   let potenciesN3Blocked=false;try{E.allocate({...base,count:10,percentages:[0,0,100]},C.topics);}catch(e){potenciesN3Blocked=/representació equilibrada|dificultat alta/i.test(e.message);}check(potenciesN3Blocked,'N3 exclusiu amb Potències bloquejat amb diagnòstic');
   // La mateixa quota N3 sí que es pot generar quan només se seleccionen
   // temes que ofereixen aquest nivell, sempre usant el catàleg complet.
   const n3Topics=C.topics.filter(t=>t.levels.includes(3));
   for(const n of [10,15,25,30]){
    const percentages=[0,0,100],config={...base,count:n,topics:n3Topics.map(t=>t.id),percentages};
    const sheet=await E.generate(config,C.topics),q=sheet.questions;
    check(q.length===n&&q.every(x=>x.level===3),'N3 disponible sense Potències');
    check(new Set(q.map(x=>x.key)).size===n,'N3 sense duplicats');
   }
   // Sessions de Potències només N1/N2 són vàlides; N3 no forma part del tema.
   for(const percentages of [[40,60,0],[100,0,0],[0,100,0]]){
    const config={...base,count:10,topics:['potencies'],percentages},sheet=await E.generate(config,C.topics);
    check(sheet.questions.length===10&&sheet.questions.every(q=>q.topicId==='potencies'&&q.level<3),'Potències només N1/N2');
   }
   for(const t of C.topics)for(let level=1;level<=3;level++){
    const config={...base,count:5,topics:[t.id],percentages:[1,2,3].map(l=>l===level?100:0)};
    if(!t.levels.includes(level)){let unavailable=false;try{E.allocate(config,C.topics);}catch(e){unavailable=/dificultat|representació equilibrada|varietat/i.test(e.message);}check(unavailable,`${t.id} no ofereix fitxes N${level}`);continue;}
    // També força el catàleg seleccionat. Una llista de famílies sense
    // requiredContents no és un catàleg del pilot amb cobertura obligatòria.
    await E.generate(config,[t]);
   }
  let blocked=false;try{E.allocate({...base,count:15,topics:['recomptes'],percentages:[0,0,100]},C.topics);}catch(e){blocked=/N3|dificultat|representació equilibrada|varietat/i.test(e.message);}check(blocked,'nivell N3 no disponible amb diagnòstic previ');
  const a=await E.generate({...base,order:'mixed'},C.topics),b=await E.generate({...base,order:'mixed'},C.topics,a.questions.map(q=>q.key));check(a.questions[0].level===1&&b.questions[0].level===1&&a.version!==b.version,'barrejat i nova versió');check(!b.questions.some(q=>a.questions.some(x=>x.key===q.key)),'versió sense repetir');
  window.worksheetPaperSamples=all;return {types:all.length,topics:C.topics.length};
 });console.log('Catàleg i motor 2n:',data);
 await p.selectOption('#ws-level-0','20');assert(await p.locator('#ws-generate').isDisabled());await p.selectOption('#ws-level-1','60');assert(await p.locator('#ws-level-0 option[value="30"]').evaluate(e=>e.disabled));await p.selectOption('#ws-level-1','40');await p.selectOption('#ws-level-0','40');
 await p.locator('#ws-generate').click();await p.waitForFunction(()=>!document.querySelector('.mi-worksheet').hasAttribute('aria-busy'),{},{timeout:60000});assert(await p.locator('#ws-results').isVisible(),await p.locator('#ws-status').innerText());assert.equal(await p.locator('.mi-worksheet-downloads a').count(),4);
 const download=p.waitForEvent('download');await p.locator('.mi-worksheet-downloads a').first().click();assert((await download).suggestedFilename().startsWith('fitxa-2eso-numeric-'));
  // Comprova el cas real de Potències només N1/N2 i la resposta preventiva
  // de la interfície quan es demana N3, que el tema no té.
  await p.evaluate(()=>{document.querySelectorAll('[name="ws-topic"]').forEach(e=>e.checked=e.value==='potencies');[40,60,0].forEach((v,i)=>document.querySelector('#ws-level-'+i).value=String(v));document.querySelector('#ws-level-2').dispatchEvent(new Event('change',{bubbles:true}));});
  assert.equal(await p.locator('#ws-generate').isDisabled(),false,await p.locator('#ws-validation').innerText());
  await p.locator('#ws-generate').click();await p.waitForFunction(()=>!document.querySelector('.mi-worksheet').hasAttribute('aria-busy'),{},{timeout:60000});assert(await p.locator('#ws-results').isVisible(),await p.locator('#ws-status').innerText());
  await p.evaluate(()=>{[0,0,100].forEach((v,i)=>document.querySelector('#ws-level-'+i).value=String(v));document.querySelector('#ws-level-2').dispatchEvent(new Event('change',{bubbles:true}));});
  assert(await p.locator('#ws-generate').isDisabled());assert.match(await p.locator('#ws-validation').innerText(),/representació equilibrada|dificultat alta/i);
  await p.evaluate(original=>{document.querySelectorAll('[name="ws-topic"]').forEach(e=>e.checked=original.includes(e.value));[40,40,20].forEach((v,i)=>document.querySelector('#ws-level-'+i).value=String(v));document.querySelector('#ws-level-2').dispatchEvent(new Event('change',{bubbles:true}));},originalTopics);
  await p.locator('#ws-generate').click();await p.waitForFunction(()=>!document.querySelector('.mi-worksheet').hasAttribute('aria-busy'),{},{timeout:60000});assert(await p.locator('#ws-results').isVisible(),await p.locator('#ws-status').innerText());
 const all=await p.evaluate(()=>worksheetPaperSamples);fs.mkdirSync('tmp/fitxes',{recursive:true});fs.writeFileSync('tmp/fitxes/catalog-2eso-paper.json',JSON.stringify(all,null,2));
 // Mostra comuna amb diagrama, exponents negatius, parèntesis i problemes llargs.
 const samples=await p.evaluate(async()=>{
  const wanted=[['racionals',9],['racionals',16],['racionals',17],['racionals',18],['potencies',10],['potencies',13],['fraccionsSentit',12],['fraccionsSentit',13],['proporcionalitat',11],['recomptes',8],['aproximacions',15],['operacionsRacionals',16],['percentatges',18]];
  const examples=wanted.map(([id,type])=>({...worksheetPaperSamples.find(q=>q.topicId===id&&q.type===type),topicId:id}));
  const forms=[];for(let tries=0;forms.length<4&&tries<80;tries++){const q=await MIWorksheetConfig.adapt('racionals',genRacionals2ESO(11));if(!forms.some(x=>x.answer===q.answer))forms.push({...q,topicId:'racionals',topicName:'Nombres racionals'});}if(forms.length!==4)throw Error('No s’han generat les quatre formes T11 per a la mostra Word/PDF.');
  const selected=[examples[0],...forms,...examples.slice(1)];
  const sheet={version:'mostra-2eso',config:{count:selected.length,topics:MIWorksheetConfig.topics.map(t=>t.id),percentages:[40,40,20],order:'mixed',space:'normal',format:'both',solutions:'steps'},questions:selected.map((q,i)=>({...q,number:i+1}))};
  const files=await MIWorksheetExport.create(sheet,MIWorksheetConfig),modes=[];
  for(const solutions of ['none','answers','steps']){
   const modeSheet={...sheet,version:`mostra-2eso-${solutions}`,config:{...sheet.config,solutions}};
   const modeFiles=await MIWorksheetExport.create(modeSheet,MIWorksheetConfig);
   const expected=solutions==='none'?2:4;
   if(modeFiles.length!==expected)throw Error(`Nombre de fitxers incorrecte amb solutions=${solutions}: ${modeFiles.length}`);
   modes.push({solutions,files:await Promise.all(modeFiles.map(async f=>({name:f.name,data:Array.from(new Uint8Array(await f.blob.arrayBuffer()))})))});
  }
  return {sheet,files:await Promise.all(files.map(async f=>({name:f.name,data:Array.from(new Uint8Array(await f.blob.arrayBuffer()))}))),modes};
 });fs.mkdirSync('tmp/fitxes/export-modes',{recursive:true});for(const f of samples.files)fs.writeFileSync('tmp/fitxes/export-modes/steps-'+f.name,Buffer.from(f.data));fs.writeFileSync('tmp/fitxes/export-modes/model.json',JSON.stringify(samples.sheet,null,2));
 for(const mode of samples.modes)for(const f of mode.files)fs.writeFileSync(`tmp/fitxes/export-modes/${mode.solutions}-${f.name}`,Buffer.from(f.data));
 const v=await p.evaluate(()=>MIWorksheetUI.getCurrent().version);await p.locator('#ws-another').click();await p.waitForFunction(v=>MIWorksheetUI.getCurrent()?.version!==v,v);await p.selectOption('#ws-space','wide');assert(await p.locator('#ws-results').isHidden());
 await p.setViewportSize({width:390,height:844});assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await p.locator('#ws-topic-summary').click();await p.locator('#ws-all').focus();await p.keyboard.press('Space');await p.keyboard.press('Escape');assert(!await p.locator('#ws-topics').getAttribute('open'));await p.locator('#ws-generate').scrollIntoViewIfNeeded();await p.screenshot({path:'tmp/fitxes/2eso-mobile.png'});
 await p.evaluate(()=>{selectTopic(TOPICS.findIndex(t=>t.id==='potencies'));});await p.evaluate(()=>{showHome();miExamSelectedTopics=['racionals'];miStartConfiguredExam();});assert(await p.evaluate(()=>state.examQs.length===20));assert.deepEqual(errors,[]);
 console.log('2n: 132 tipus, 24 combinacions individuals, figures, Word/PDF/solucionaris, mòbil, teclat i examen OK');
}finally{await browser.close();server.close();}})().catch(e=>{console.error(e);server.close();process.exitCode=1;});

