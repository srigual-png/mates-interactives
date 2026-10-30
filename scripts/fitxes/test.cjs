/* Executa des de l'arrel: node scripts/fitxes/test.cjs */
const fs=require('fs'),path=require('path'),http=require('http'),assert=require('assert');
const {chromium}=require('C:/Users/srigu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=process.cwd();
const server=http.createServer((req,res)=>{const f=path.join(root,decodeURIComponent(req.url.split('?')[0]));if(!f.startsWith(root+path.sep)){res.writeHead(403).end();return;}fs.readFile(f,(err,data)=>{if(err){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.js':'text/javascript','.css':'text/css','.html':'text/html','.ttf':'font/ttf'})[path.extname(f)]||'application/octet-stream');res.end(data);});});
(async()=>{
  await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port;
  const browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
  try{
    const page=await browser.newPage(),errors=[],requests=[];page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>requests.push(r.url()));
    await page.goto(origin+'/1eso/sentit-numeric.html');await page.waitForSelector('#ws-generate');
    assert(!requests.some(s=>s.includes('/vendor/fitxes/')),'Les dependències han de ser diferides');
    const report=await page.evaluate(async()=>{
      const E=MIWorksheets,T=MIWorksheetConfig.topics,check=(v,msg)=>{if(!v)throw new Error(msg);};
      const base={count:15,topics:T.map(t=>t.id),percentages:[40,40,20],order:'grouped',space:'normal',format:'both',solutions:'steps'};
      for(const n of [5,15,25]){const v=E.counts(n,[30,30,40]);check(v.reduce((a,b)=>a+b,0)===n,'arrodoniment');check(v[0]>=v[1],'desempat estable');}
      for(let a=0;a<=100;a+=10)for(let b=0;b<=100-a;b+=10)for(let c=0;c<=100-a-b;c+=10){const p=[a,b,c];p.forEach((v,i)=>check(E.maximum(p,i)+p.reduce((s,x,j)=>s+(i===j?0:x),0)<=100,'màxim percentatge'));}
      check(!!E.validate({...base,percentages:[40,40,10]},T),'total incomplet');check(!!E.validate({...base,count:5},T),'més temes que preguntes');
      const limited=[{id:'only',name:'Només baixa',levels:[1]}];let rejected=false;try{E.allocate({...base,count:5,topics:['only'],percentages:[0,0,100]},limited);}catch{rejected=true;}check(rejected,'combinació impossible');
      const one={id:'one',name:'Repetit',levels:[1],generate:()=>({question:'Sempre igual',answer:'1',steps:['1'],level:1,options:[]})};rejected=false;try{await E.generate({...base,count:5,topics:['one'],percentages:[100,0,0]},[one]);}catch{rejected=true;}check(rejected,'límit de duplicats');
      const stats=[];
      for(const t of T)for(let l=1;l<=3;l++){
        const c={...base,count:5,topics:[t.id],percentages:[1,2,3].map(k=>k===l?100:0)};
        const s=await E.generate(c,T);check(s.questions.length===5&&s.questions.every(q=>q.level===l),'nivell '+t.id);stats.push(t.id+':'+l);
      }
      for(const n of [15,25,30])for(const p of [[40,40,20],[100,0,0],[0,100,0],[0,0,100]]){
        const s=await E.generate({...base,count:n,percentages:p},T),qs=s.questions;
        check(qs.length===n&&new Set(qs.map(q=>q.key)).size===n,'total i unicitat');
        const totals=T.map(t=>qs.filter(q=>q.topicId===t.id).length);check(Math.max(...totals)-Math.min(...totals)<=1&&Math.min(...totals)>0,'equilibri');
        check(JSON.stringify([1,2,3].map(l=>qs.filter(q=>q.level===l).length))===JSON.stringify(E.counts(n,p)),'quotes');
        T.forEach(t=>{const q=qs.filter(q=>q.topicId===t.id);check(q.every((x,i)=>!i||x.level>=q[i-1].level),'ordre agrupat');});
      }
      const a=await E.generate({...base,order:'mixed'},T),b=await E.generate({...base,order:'mixed'},T,a.questions.map(q=>q.key));
      check(a.questions[0].level===1&&b.questions[0].level===1,'començament fàcil');check(a.version!==b.version,'versió');check(b.questions.every(q=>!a.questions.some(x=>x.key===q.key)),'nova versió diferent');
      return {combinations:stats.length,topics:T.length};
    });
    console.log('Motor:',report);
    await page.selectOption('#ws-level-0','20');assert(await page.locator('#ws-generate').isDisabled());assert((await page.locator('#ws-total').innerText()).includes('80 %'));
    await page.selectOption('#ws-level-1','60');assert(await page.locator('#ws-generate').isEnabled());assert(await page.locator('#ws-level-0 option[value="30"]').evaluate(e=>e.disabled));
    await page.selectOption('#ws-level-1','40');await page.selectOption('#ws-level-0','40');
    await page.selectOption('#ws-count','15');await page.locator('#ws-topic-summary').click();await page.locator('#ws-all').check();
    await page.locator('#ws-all').press('Escape');assert(!await page.locator('#ws-topics').getAttribute('open'));
    await page.locator('#ws-generate').click();await page.waitForFunction(()=>!document.querySelector('.mi-worksheet').hasAttribute('aria-busy'),{},{timeout:60000});
    assert(await page.locator('#ws-results').isVisible(),await page.locator('#ws-status').innerText());
    assert.equal(await page.locator('.mi-worksheet-downloads a').count(),4);
    const first=await page.evaluate(()=>MIWorksheetUI.getCurrent());
    const downloadEvent=page.waitForEvent('download');await page.locator('.mi-worksheet-downloads a').first().click();
    const download=await downloadEvent;assert(download.suggestedFilename().endsWith('.docx'));assert.equal(await download.failure(),null);
    const files=await page.locator('.mi-worksheet-downloads a').evaluateAll(async links=>Promise.all(links.map(async a=>({name:a.download,data:Array.from(new Uint8Array(await (await fetch(a.href)).arrayBuffer()))}))));
    fs.mkdirSync('tmp/fitxes',{recursive:true});for(const file of files)fs.writeFileSync('tmp/fitxes/'+file.name,Buffer.from(file.data));fs.writeFileSync('tmp/fitxes/sheet.json',JSON.stringify(first,null,2));
    await page.locator('#ws-another').click();await page.waitForFunction(v=>MIWorksheetUI.getCurrent()?.version!==v,first.version);await page.waitForSelector('#ws-results:not([hidden])');
    await page.selectOption('#ws-space','wide');assert(await page.locator('#ws-results').isHidden());
    await page.setViewportSize({width:390,height:844});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await page.locator('#ws-generate').scrollIntoViewIfNeeded();await page.screenshot({path:'tmp/fitxes/mobile.png'});
    await page.setViewportSize({width:1280,height:1000});await page.locator('.mi-worksheet').screenshot({path:'tmp/fitxes/form.png'});
    // Exportacions deterministes dels casos amb notació i text llarg.
    const extra=await page.evaluate(async()=>{
      const s=await MIWorksheets.generate({count:5,topics:['fraccions','potencies','jerarquia'],percentages:[20,40,40],order:'mixed',space:'wide',format:'both',solutions:'steps'},MIWorksheetConfig.topics);
      s.questions[0]={...s.questions[0],question:'Calcula: 2/3 + 1/6.',answer:'5/6',steps:['2/3 = 4/6','4/6 + 1/6 = 5/6']};
      s.questions[1]={...s.questions[1],question:'Calcula: 3^3 + √144.',answer:'39',steps:['3^3 = 3 × 3 × 3 = 27','√144 = 12','27 + 12 = 39']};
      const files=await MIWorksheetExport.create(s,MIWorksheetConfig);return {s,files:await Promise.all(files.map(async f=>({name:'math-'+f.name,data:Array.from(new Uint8Array(await f.blob.arrayBuffer()))})))};
    });for(const f of extra.files)fs.writeFileSync('tmp/fitxes/'+f.name,Buffer.from(f.data));fs.writeFileSync('tmp/fitxes/math-sheet.json',JSON.stringify(extra.s,null,2));
    await page.evaluate(()=>{selTopic(TOPICS.findIndex(t=>t.id==='fraccions'));});assert(await page.locator('#sHome').evaluate(e=>!e.classList.contains('active')));
    await page.evaluate(()=>{showHome();miExamSelectedTopics=['enters'];startExam();});assert(await page.evaluate(()=>state.examQs.length===20));
    assert(await page.evaluate(()=>MIValidation.grade({correct:'1/2'},'2/4')));
    // Formats individuals, solucionari absent o només respostes.
    const modes=await page.evaluate(async()=>{
      const model=MIWorksheetUI.getCurrent()||await MIWorksheets.generate({count:5,topics:['fraccions'],percentages:[40,40,20],order:'mixed',space:'compact',format:'pdf',solutions:'none'},MIWorksheetConfig.topics);
      const results=[];
      for(const format of ['pdf','docx'])for(const solutions of ['none','answers']){
        const sheet={...model,config:{...model.config,format,solutions}};
        const f=await MIWorksheetExport.create(sheet,MIWorksheetConfig);
        if(solutions==='answers'&&MIWorksheetExport.blocks(sheet,MIWorksheetConfig,true).some(b=>b.lines.length!==1))throw new Error('Solucionari només respostes');
        results.push([format,solutions,f.length,f.every(x=>x.blob.size>1000)]);
      }return results;
    });modes.forEach(([,s,n,ok])=>{assert.equal(n,s==='none'?1:2);assert(ok);});
    // Una fallada transitòria conserva la fitxa pendent; l'analítica no bloqueja.
    await page.evaluate(()=>{
      showHome();window.fitxesCalls=0;const original=MIWorksheets.generate;MIWorksheets.generate=async(...args)=>{window.fitxesCalls++;return original(...args);};
      const create=MIWorksheetExport.create;let first=true;MIWorksheetExport.create=async(...args)=>{if(first){first=false;throw new Error('Fallada de prova recuperable');}return create(...args);};
      window.MIAnalytics={track(){throw new Error('Analítica no disponible');}};
    });
    await page.locator('#ws-generate').click();await page.waitForFunction(()=>document.querySelector('#ws-status').textContent.includes('Fallada de prova recuperable'));
    assert.equal(await page.evaluate(()=>fitxesCalls),1);
    await page.locator('#ws-generate').click();await page.waitForSelector('#ws-results:not([hidden])');assert.equal(await page.evaluate(()=>fitxesCalls),1);
    assert.deepEqual(errors,[]);console.log('UI, mòbil, teclat, nova versió, 8 descàrregues, pràctica, examen i equivalència: OK');
  }finally{await browser.close();server.close();}
})().catch(e=>{console.error(e);server.close();process.exitCode=1;});
