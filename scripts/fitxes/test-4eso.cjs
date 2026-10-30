const fs=require('fs'),path=require('path'),http=require('http'),assert=require('assert');
const {chromium}=require('C:/Users/srigu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=process.cwd(),server=http.createServer((req,res)=>{const f=path.join(root,decodeURIComponent(req.url.split('?')[0]));if(!f.startsWith(root+path.sep)){res.writeHead(403).end();return;}fs.readFile(f,(err,data)=>{if(err){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.js':'text/javascript','.css':'text/css','.html':'text/html','.ttf':'font/ttf'})[path.extname(f)]||'application/octet-stream');res.end(data);});});
(async()=>{await new Promise(r=>server.listen(0,'127.0.0.1',r));const browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});try{
 const p=await browser.newPage(),errors=[],requests=[];p.on('pageerror',e=>errors.push(e.message));p.on('request',r=>requests.push(r.url()));await p.goto('http://127.0.0.1:'+server.address().port+'/4eso/sentit-numeric.html');await p.waitForSelector('#ws-generate');
 assert(!requests.some(u=>u.includes('/vendor/fitxes/')));assert((await p.locator('#ws-summary').innerText()).startsWith('4t d’ESO'));assert.equal(await p.locator('[name="ws-topic"]').count(),8);
 const data=await p.evaluate(async()=>{
  const C=MIWorksheetConfig,E=MIWorksheets,check=(ok,m)=>{if(!ok)throw Error(m);};
  const gens={reals4t:genReals4ESO,irracionals4t:genIrracionals4ESO,intervals4t:genIntervals4ESO,errors4t:genErrors4ESO,operacions4t:genOperacions4ESO,comptatge4t:genComptatge4ESO,pascal4t:genPascal4ESO,financera4t:genFinancera4ESO};
  const all=[];
  for(const t of C.topics)for(const [level,types] of C.levels[t.id].entries())for(const type of types){
   const q=await C.adapt(t.id,gens[t.id](type));check(q.level===level+1,'nivell '+t.id+':'+type);check(!/undefined|NaN|Infinity|<svg/.test(JSON.stringify({...q,figure:undefined})),'dades incompletes '+t.id+':'+type);check(q.steps.length>0&&q.answer,'solució');
   if((t.id==='irracionals4t'&&type===9)||(t.id==='intervals4t'&&type===6)||(t.id==='comptatge4t'&&type===4))check(q.figure?.data.startsWith('data:image/png'),'figura conservada');
   if(t.id==='reals4t'&&[4,8].includes(type))check(/^-?\d+; /.test(q.answer),'valor i classificació');
   if(t.id==='errors4t'&&type===10)check(q.answer.includes(';'),'extrems decimals separats');
   if(t.id==='operacions4t'&&type===6){const [a,r,y]=q.question.match(/\d+/g).map(Number);check(q.answer===Math.round(a*(1+r/100)**y)+' habitants','creixement sense arrodonir passos');}
   if(t.id==='reals4t'&&type===9)check(q.question.includes(q.steps[0].includes('producte')?'×':q.steps[0].includes('quocient')?'÷':'+'),'operació coherent');
   all.push({...q,topicId:t.id,topicName:t.name});
   for(let sample=0;sample<5;sample++){const extra=await C.adapt(t.id,gens[t.id](type));check(extra.answer&&extra.question,'variants completes');window.worksheetAuditVariants=(window.worksheetAuditVariants||[]).concat(extra);}
  }
  const base={count:10,topics:C.topics.map(t=>t.id),percentages:[40,40,20],order:'grouped',space:'normal',format:'both',solutions:'steps'};
  for(const n of [10,15,25,30])for(const percentages of [[40,40,20],[100,0,0],[0,100,0],[0,0,100]]){
   const sheet=await E.generate({...base,count:n,percentages},C.topics),q=sheet.questions;
   check(q.length===n&&new Set(q.map(x=>x.key)).size===n,'total/duplicats');
   const totals=C.topics.map(t=>q.filter(x=>x.topicId===t.id).length);check(Math.max(...totals)-Math.min(...totals)<=1,'equilibri');
   check(JSON.stringify([1,2,3].map(l=>q.filter(x=>x.level===l).length))===JSON.stringify(E.counts(n,percentages)),'quotes');
  }
  for(const t of C.topics)for(let level=1;level<=3;level++)await E.generate({...base,count:5,topics:[t.id],percentages:[1,2,3].map(l=>l===level?100:0)},C.topics);
  let blocked=false;try{E.allocate({...base,count:30,topics:['comptatge4t'],percentages:[0,0,100]},C.topics);}catch(e){blocked=e.message.includes('25');}check(blocked,'capacitat alta finita');
  const a=await E.generate({...base,order:'mixed'},C.topics),b=await E.generate({...base,order:'mixed'},C.topics,a.questions.map(q=>q.key));check(a.questions[0].level===1&&b.questions[0].level===1&&a.version!==b.version,'barrejat i nova versió');check(!b.questions.some(q=>a.questions.some(x=>x.key===q.key)),'versió sense repetir');
  window.worksheetPaperSamples=all;return {types:all.length,topics:C.topics.length};
 });console.log('Catàleg i motor 4t:',data);
 await p.selectOption('#ws-level-0','20');assert(await p.locator('#ws-generate').isDisabled());await p.selectOption('#ws-level-1','60');assert(await p.locator('#ws-level-0 option[value="30"]').evaluate(e=>e.disabled));await p.selectOption('#ws-level-1','40');await p.selectOption('#ws-level-0','40');
 await p.locator('#ws-generate').click();await p.waitForFunction(()=>!document.querySelector('.mi-worksheet').hasAttribute('aria-busy'),{},{timeout:60000});assert(await p.locator('#ws-results').isVisible(),await p.locator('#ws-status').innerText());assert.equal(await p.locator('.mi-worksheet-downloads a').count(),4);
 const download=p.waitForEvent('download');await p.locator('.mi-worksheet-downloads a').first().click();assert((await download).suggestedFilename().startsWith('fitxa-4eso-numeric-'));
 const all=await p.evaluate(()=>worksheetPaperSamples);fs.writeFileSync('tmp/fitxes/catalog-4eso-paper.json',JSON.stringify(all,null,2));
 // Mostra comuna amb diagrama, exponents negatius, parèntesis i problemes llargs.
 const samples=await p.evaluate(async()=>{
  const wanted=[['reals4t',4],['irracionals4t',9],['intervals4t',6],['errors4t',10],['errors4t',8],['operacions4t',6],['comptatge4t',4],['pascal4t',4],['financera4t',3],['financera4t',10]];
  const sheet={version:'mostra-4eso',config:{count:10,topics:MIWorksheetConfig.topics.map(t=>t.id),percentages:[40,40,20],order:'mixed',space:'normal',format:'both',solutions:'steps'},questions:wanted.map(([id,type],i)=>({...worksheetPaperSamples.find(q=>q.topicId===id&&q.type===type),number:i+1}))};
  const files=await MIWorksheetExport.create(sheet,MIWorksheetConfig);return {sheet,files:await Promise.all(files.map(async f=>({name:f.name,data:Array.from(new Uint8Array(await f.blob.arrayBuffer()))})))};
 });fs.mkdirSync('output/fitxes-4eso',{recursive:true});for(const f of samples.files)fs.writeFileSync('output/fitxes-4eso/'+f.name,Buffer.from(f.data));fs.writeFileSync('output/fitxes-4eso/model.json',JSON.stringify(samples.sheet,null,2));
 const audit=await p.evaluate(async()=>{
  const decimalFraction=MIWorksheetExport.tokens('0,4/10').find(t=>t.kind==='fraction');if(!decimalFraction||decimalFraction.parts[0]!=='0,4')throw Error('Fracció amb numerador decimal íntegre');
  const bytes=await (await fetch('../assets/vendor/fitxes/LiberationSans-Regular.ttf')).arrayBuffer(),font=fontkit.create(new Uint8Array(bytes));
  const missing=[...new Set([...worksheetPaperSamples,...worksheetAuditVariants].flatMap(q=>[q.question,q.answer,...q.options,...q.steps]).join(''))].filter(c=>!/[\s]/.test(c)&&font.glyphForCodePoint(c.codePointAt(0)).id===0);
  const sheet={version:'audit',config:{count:80,order:'mixed',space:'compact',format:'pdf',solutions:'steps'},questions:worksheetPaperSamples.map((q,i)=>({...q,number:i+1}))};
  await MIWorksheetExport.create(sheet,MIWorksheetConfig);return {missing};
 });console.log('Glifs absents:',audit.missing);assert.deepEqual(audit.missing,[],'glifs matemàtics disponibles');
 const v=await p.evaluate(()=>MIWorksheetUI.getCurrent().version);await p.locator('#ws-another').click();await p.waitForFunction(v=>MIWorksheetUI.getCurrent()?.version!==v,v);await p.selectOption('#ws-space','wide');assert(await p.locator('#ws-results').isHidden());
 await p.setViewportSize({width:390,height:844});assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await p.locator('#ws-topic-summary').click();await p.locator('#ws-all').focus();await p.keyboard.press('Space');await p.keyboard.press('Escape');assert(!await p.locator('#ws-topics').getAttribute('open'));await p.locator('#ws-generate').scrollIntoViewIfNeeded();await p.screenshot({path:'tmp/fitxes/4eso-mobile.png'});
 await p.evaluate(()=>{selectTopic(TOPICS.findIndex(t=>t.id==='operacions4t'));});await p.evaluate(()=>{showHome();miExamSelectedTopics=['reals4t'];miStartConfiguredExam();});assert(await p.evaluate(()=>state.examQs.length===20));assert.deepEqual(errors,[]);
 for(const option of ['A','B']){await p.goto('http://127.0.0.1:'+server.address().port+'/4eso/sentit-numeric.html?opcio='+option);await p.waitForSelector('#ws-generate');assert((await p.locator('#ws-summary').innerText()).includes('Opció '+option));assert.equal(await p.locator('[name="ws-topic"]').count(),8);}
 console.log('4t: 80 tipus, 24 combinacions individuals, figures, Word/PDF/solucionaris, mòbil, teclat i examen OK');
}finally{await browser.close();server.close();}})().catch(e=>{console.error(e);server.close();process.exitCode=1;});
