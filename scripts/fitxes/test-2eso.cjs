const fs=require('fs'),path=require('path'),http=require('http'),assert=require('assert');
const {chromium}=require('C:/Users/srigu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=process.cwd(),server=http.createServer((req,res)=>{const f=path.join(root,decodeURIComponent(req.url.split('?')[0]));if(!f.startsWith(root+path.sep)){res.writeHead(403).end();return;}fs.readFile(f,(err,data)=>{if(err){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.js':'text/javascript','.css':'text/css','.html':'text/html','.ttf':'font/ttf'})[path.extname(f)]||'application/octet-stream');res.end(data);});});
(async()=>{await new Promise(r=>server.listen(0,'127.0.0.1',r));const browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});try{
 const p=await browser.newPage(),errors=[],requests=[];p.on('pageerror',e=>errors.push(e.message));p.on('request',r=>requests.push(r.url()));await p.goto('http://127.0.0.1:'+server.address().port+'/2eso/sentit-numeric.html');await p.waitForSelector('#ws-generate');
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
  for(const t of C.topics)for(const [level,types] of C.levels[t.id].entries())for(const type of types){
   const q=await C.adapt(t.id,gens[t.id](type));check(q.level===level+1,'nivell '+t.id+':'+type);check(!/undefined|NaN|Infinity|<svg/.test(JSON.stringify(q)),'dades incompletes');check(q.steps.length>0&&q.answer,'solució');
   if(t.id==='racionals'&&type===9)check(q.figure?.data.startsWith('data:image/png'),'figura necessària');
   if(t.id==='racionals'&&type===10)check(q.options.length===4,'interval amb resposta única entre les opcions');
   if(t.id==='potencies'&&type===15)check(q.question.includes('^□'),'exponent desconegut');
   all.push({...q,topicId:t.id,topicName:t.name});
  }
  const base={count:10,topics:C.topics.map(t=>t.id),percentages:[40,40,20],order:'grouped',space:'normal',format:'both',solutions:'steps'};
  for(const n of [10,15,25,30])for(const percentages of [[40,40,20],[100,0,0],[0,100,0],[0,0,100]]){
   const sheet=await E.generate({...base,count:n,percentages},C.topics),q=sheet.questions;
   check(q.length===n&&new Set(q.map(x=>x.key)).size===n,'total/duplicats');
   const totals=C.topics.map(t=>q.filter(x=>x.topicId===t.id).length);check(Math.max(...totals)-Math.min(...totals)<=1,'equilibri');
   check(JSON.stringify([1,2,3].map(l=>q.filter(x=>x.level===l).length))===JSON.stringify(E.counts(n,percentages)),'quotes');
  }
  for(const t of C.topics)for(let level=1;level<=3;level++)await E.generate({...base,count:5,topics:[t.id],percentages:[1,2,3].map(l=>l===level?100:0)},C.topics);
  let blocked=false;try{E.allocate({...base,count:15,topics:['recomptes'],percentages:[0,0,100]},C.topics);}catch(e){blocked=e.message.includes('11');}check(blocked,'capacitat finita explicada abans de generar');
  const a=await E.generate({...base,order:'mixed'},C.topics),b=await E.generate({...base,order:'mixed'},C.topics,a.questions.map(q=>q.key));check(a.questions[0].level===1&&b.questions[0].level===1&&a.version!==b.version,'barrejat i nova versió');check(!b.questions.some(q=>a.questions.some(x=>x.key===q.key)),'versió sense repetir');
  window.worksheetPaperSamples=all;return {types:all.length,topics:C.topics.length};
 });console.log('Catàleg i motor 2n:',data);
 await p.selectOption('#ws-level-0','20');assert(await p.locator('#ws-generate').isDisabled());await p.selectOption('#ws-level-1','60');assert(await p.locator('#ws-level-0 option[value="30"]').evaluate(e=>e.disabled));await p.selectOption('#ws-level-1','40');await p.selectOption('#ws-level-0','40');
 await p.locator('#ws-generate').click();await p.waitForFunction(()=>!document.querySelector('.mi-worksheet').hasAttribute('aria-busy'),{},{timeout:60000});assert(await p.locator('#ws-results').isVisible(),await p.locator('#ws-status').innerText());assert.equal(await p.locator('.mi-worksheet-downloads a').count(),4);
 const download=p.waitForEvent('download');await p.locator('.mi-worksheet-downloads a').first().click();assert((await download).suggestedFilename().startsWith('fitxa-2eso-numeric-'));
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
