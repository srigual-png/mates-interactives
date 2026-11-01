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
      const wording=MIWorksheetConfig.paperQuestion;
      const bus=wording('mcmmcd',{type:4,question:'Dues línies d’autobús surten cada 30 i 45 minuts. Si ara surten juntes, d’aquí a quants minuts coincidiran?'});
      check(bus.includes('línia A cada 30 minuts')&&bus.includes('línia B cada 45 minuts')&&bus.endsWith('sortides de les dues línies?'),'intervals de cada línia i pregunta temporal explícits');
      for(const item of ['ampolles','cromos','entrades']){
        const text=wording('fraccions',{type:8,question:`Hi ha 30 ${item}. En utilitza 1/3 del total. Quantes en queden?`,correct:`20 ${item}`});
        check(text.includes(`La Júlia té 30 ${item}`)&&text.includes('utilitza 1/3 del total')&&text.includes(item==='cromos'?'Quants cromos':'Quantes '+item),'subjecte, fracció i unitat explícits');
      }
      for(const name of ['Un ciclista','Una persona caminant','Una aixeta','Una màquina','Una cinta transportadora','Una bomba d’aigua']){
        const text=wording('decimals',{type:7,question:`${name} funciona a 3.5 km/h durant 4 h. Quina quantitat recorre o produeix?`});
        check(!text.includes('recorre o produeix')&&!text.includes('funciona a')&&text.includes('3,5'),'context i magnitud concrets');
      }
      const base={count:15,topics:T.map(t=>t.id),worksheetType:'standard',order:'grouped',space:'normal',format:'both',solutions:'steps'};
      check(MIWorksheetUI.getConfig().worksheetType==='standard','tipus inicial');
      check([...document.querySelector('#ws-type').options].map(o=>o.text).join('|')==='Estàndard|Ampliació','dos tipus');
      check(!document.querySelector('[id^="ws-level-"],#ws-profile'),'sense selectors obsolets');
      check(!/Bàsic|Equilibrat|Difícil|Perfil de dificultat/.test(document.querySelector('.mi-worksheet').textContent),'sense textos obsolets');
      check(!!E.validate({...base,count:5},T),'mínim insuficient');
      const originalRandom=Math.random;let runs=0;
      function seedRandom(seed){let state=seed;Math.random=()=>((state=(state*1664525+1013904223)>>>0)/4294967296);}
      function inspect(sheet,topics){
        const qs=sheet.questions;
        check(qs.length===sheet.config.count&&new Set(qs.map(q=>q.key)).size===qs.length,'quantitat i duplicats');
        for(const id of topics){
          const t=T.find(t=>t.id===id),items=qs.filter(q=>q.topicId===id);
          check(t.requiredContents.every(x=>items.some(q=>q.contents.includes(x))),'cobertura '+id);
          const families={};for(const q of items)if(q.challenge){families[q.family]=(families[q.family]||0)+1;check(q.challengeReason&&q.answer&&q.steps.length,'repte amb solucionari');}
          check(Object.values(families).every(n=>n<=2),'màxim dos reptes per família');
          if(id==='mcmmcd')check(Math.abs(items.filter(q=>q.contents.includes('mcd')).length-items.filter(q=>q.contents.includes('mcm')).length)<=1,'equilibri MCD/mcm');
        }
        const totals=topics.map(id=>qs.filter(q=>q.topicId===id).length);
        check(Math.max(...totals)-Math.min(...totals)<=1,'equilibri entre temes');
        if(sheet.config.worksheetType==='standard')check(qs.every(q=>q.standard&&!q.challenge&&q.level<=2),'estàndard amb pràctica bàsica/mitjana');
        else check(qs.some(q=>q.challenge)&&qs.some(q=>!q.challenge),'ampliació amb pràctica i reptes');
        check(!sheet.notice,'sense avís rutinari');
      }
      try{
        for(let seed=1;seed<=8;seed++)for(const worksheetType of ['standard','extension'])for(const topics of [['mcmmcd'],['mcmmcd','potencies','naturals'],T.map(t=>t.id)]){
          seedRandom(seed);const c={...base,worksheetType,topics,count:topics.length===12?30:10,order:seed%2?'grouped':'mixed'};
          const sheet=await E.generate(c,T);inspect(sheet,topics);runs++;
          if(topics.length===12&&worksheetType==='extension')check(new Set(sheet.questions.filter(q=>q.challenge).map(q=>q.topicId)).size>=3,'reptes repartits entre temes');
        }
        for(const t of T)for(const worksheetType of ['standard','extension']){
          seedRandom(91);const c={...base,count:10,topics:[t.id],worksheetType};
          if(worksheetType==='extension'&&!t.families.some(f=>f.challenge)){
            let code;try{await E.generate(c,T);}catch(e){code=e.code;}check(code==='NO_CHALLENGES','no ampliar sense reptes '+t.id);
          }else{const sheet=await E.generate(c,T);inspect(sheet,[t.id]);if(worksheetType==='standard')check(sheet.questions.some(q=>q.level===1)&&sheet.questions.some(q=>q.level===2),'combinar nivells '+t.id);}
          runs++;
        }
        for(const t of T)for(const worksheetType of ['standard','extension']){
          if(worksheetType==='extension'&&!t.families.some(f=>f.challenge))continue;
          seedRandom(501);const sheet=await E.generate({...base,count:30,topics:[t.id],worksheetType},T);inspect(sheet,[t.id]);runs++;
        }
        const c={...base,count:10,topics:['mcmmcd','naturals'],worksheetType:'extension'};
        seedRandom(123);const grouped=await E.generate(c,T);seedRandom(123);const mixed=await E.generate({...c,order:'mixed'},T);
        check(JSON.stringify(grouped.questions.map(q=>q.key).sort())===JSON.stringify(mixed.questions.map(q=>q.key).sort()),'barrejar només permuta la selecció');
        for(const type of ['standard','extension'])check(E.validate({...base,count:1,topics:['mcmmcd'],worksheetType:type},T).includes('2 exercicis'),'mínim exacte MCD/mcm');
        check(T.find(t=>t.id==='potencies').families.some(f=>f.level===3&&!f.challenge),'alta no implica repte');
        check(T.find(t=>t.id==='proporcionalitat').families.some(f=>f.level===2&&f.challenge),'repte independent del nivell alt');
      }finally{Math.random=originalRandom;}
      let serial=0;
      const standard={level:2,family:'practice',contents:['one'],standard:true,challenge:false};
      const challenge={level:3,family:'reasoning',contents:['one'],standard:false,challenge:true,challengeReason:'Decidir el procediment i connectar dos passos.'};
      const one={id:'one',name:'Una família de reptes',levels:[2,3],requiredContents:['one'],families:[standard,challenge],generate:l=>({...(l===3?challenge:standard),question:l===3?'Troba la dada 999':`Calcula ${++serial}`,answer:'0',options:[],steps:['Dada inicial.','Relació i resultat: 0.']})};
      const single=await E.generate({...base,count:10,topics:['one'],worksheetType:'extension'},[one]);
      check(single.questions.filter(q=>q.challenge).length===1,'una única variant adequada');
      let variant=0;const two={...one,generate:l=>l===3?{...challenge,question:`Troba la dada ${++variant%2?999:888}`,answer:'0',options:[],steps:['Relació i resultat: 0.']}:one.generate(l)};
      const pair=await E.generate({...base,count:10,topics:['one'],worksheetType:'extension'},[two]);
      check(pair.questions.filter(q=>q.challenge).length===2,'màxim dues variants diferents');
      const fill={...two,generate:l=>l===3?two.generate(l):({...standard,question:'Calcula 1',answer:'1',options:[],steps:['1']})};
      const filled=await E.generate({...base,count:3,topics:['one'],worksheetType:'extension'},[fill]);
      check(filled.questions.length===3&&filled.questions.filter(q=>q.challenge).length===2,'completar un banc estàndard limitat amb reptes disponibles');
      const scarce={...one,levels:[2],families:[standard],generate:()=>({...standard,question:'Calcula 1',answer:'1',options:[],steps:['1']})};
      let shortage='';try{await E.generate({...base,count:5,topics:['one']},[scarce]);}catch(e){shortage=e.message;}
      check(shortage.includes('Pots demanar 1 exercicis'),'quantitat viable explícita');
      const otherStandard={...standard,contents:['other']};
      const other={id:'other',name:'Banc ampli',levels:[2],requiredContents:['other'],families:[otherStandard],generate:()=>({...otherStandard,question:`Calcula ${++serial}`,answer:'0',options:[],steps:['0']})};
      let balancedShortage='';try{await E.generate({...base,count:10,topics:['one','other']},[scarce,other]);}catch(e){balancedShortage=e.message;}
      check(balancedShortage.includes('Pots demanar 2 exercicis'),'quantitat viable conserva equilibri entre temes');
      return {runs,topics:T.length};
    });
    console.log('Motor:',report);
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
    await page.evaluate(()=>{document.querySelectorAll('[name="ws-topic"]').forEach(e=>e.checked=e.value==='potencies');document.querySelector('#ws-type').value='extension';document.querySelector('#ws-type').dispatchEvent(new Event('change',{bubbles:true}));});
    assert(await page.locator('#ws-standard').isVisible());assert(await page.locator('#ws-generate').isDisabled());
    assert((await page.locator('#ws-validation').innerText()).includes('cap repte adequat'));
    assert(await page.locator('#ws-results').isHidden());
    await page.locator('#ws-standard').click();await page.waitForSelector('#ws-results:not([hidden])');
    assert.equal(await page.locator('#ws-type').inputValue(),'standard');
    assert.equal(await page.evaluate(()=>MIWorksheetUI.getCurrent().config.worksheetType),'standard');
    // Exportacions deterministes dels casos amb notació i text llarg.
    const extra=await page.evaluate(async()=>{
      const s=await MIWorksheets.generate({count:5,topics:['fraccions','potencies','jerarquia'],worksheetType:'extension',order:'mixed',space:'wide',format:'both',solutions:'steps'},MIWorksheetConfig.topics);
      s.questions[0]={...s.questions[0],question:'Calcula: 2/3 + 1/6.',answer:'5/6',steps:['2/3 = 4/6','4/6 + 1/6 = 5/6']};
      s.questions[1]={...s.questions[1],question:'Calcula: 3^3 + √144.',answer:'39',steps:['3^3 = 3 × 3 × 3 = 27','√144 = 12','27 + 12 = 39']};
      const files=await MIWorksheetExport.create(s,MIWorksheetConfig);return {s,files:await Promise.all(files.map(async f=>({name:'math-'+f.name,data:Array.from(new Uint8Array(await f.blob.arrayBuffer()))})))};
    });for(const f of extra.files)fs.writeFileSync('tmp/fitxes/'+f.name,Buffer.from(f.data));fs.writeFileSync('tmp/fitxes/math-sheet.json',JSON.stringify(extra.s,null,2));
    const extension=await page.evaluate(async()=>{
      const s=await MIWorksheets.generate({count:10,topics:['mcmmcd','decimal_sys','naturals'],worksheetType:'extension',order:'mixed',space:'normal',format:'both',solutions:'steps'},MIWorksheetConfig.topics);
      const files=await MIWorksheetExport.create(s,MIWorksheetConfig);
      return {s,files:await Promise.all(files.map(async f=>({name:'extension-'+f.name,data:Array.from(new Uint8Array(await f.blob.arrayBuffer()))})))};
    });
    for(const f of extension.files)fs.writeFileSync('tmp/fitxes/'+f.name,Buffer.from(f.data));fs.writeFileSync('tmp/fitxes/extension-sheet.json',JSON.stringify(extension.s,null,2));
    await page.evaluate(()=>{selTopic(TOPICS.findIndex(t=>t.id==='fraccions'));});assert(await page.locator('#sHome').evaluate(e=>!e.classList.contains('active')));
    await page.evaluate(()=>{showHome();miExamSelectedTopics=['enters'];startExam();});assert(await page.evaluate(()=>state.examQs.length===20));
    assert(await page.evaluate(()=>MIValidation.grade({correct:'1/2'},'2/4')));
    // Formats individuals, solucionari absent o només respostes.
    const modes=await page.evaluate(async()=>{
      const model=MIWorksheetUI.getCurrent()||await MIWorksheets.generate({count:5,topics:['fraccions'],worksheetType:'standard',order:'mixed',space:'compact',format:'pdf',solutions:'none'},MIWorksheetConfig.topics);
      const results=[];
      for(const format of ['pdf','docx'])for(const solutions of ['none','answers']){
        const sheet={...model,config:{...model.config,format,solutions}};
        const f=await MIWorksheetExport.create(sheet,MIWorksheetConfig);
        if(solutions==='answers'&&MIWorksheetExport.blocks(sheet,MIWorksheetConfig,true).filter(b=>b.lines.length).some(b=>b.lines.length!==1))throw new Error('Solucionari només respostes');
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
    assert.deepEqual(errors,[]);console.log('UI, mòbil, teclat, nova versió, exportacions, pràctica, examen i equivalència: OK');
  }finally{await browser.close();server.close();}
})().catch(e=>{console.error(e);server.close();process.exitCode=1;});
