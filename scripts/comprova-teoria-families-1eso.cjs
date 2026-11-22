const fs=require('fs'),path=require('path'),http=require('http'),cp=require('child_process'),assert=require('assert'),vm=require('vm');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const root=path.resolve(__dirname,'..'),out=root+'/docs/teoria-families';
const baselineRef=process.env.MI_THEORY_BASELINE||'709262cba174f414f4fbd05a72398b93ba79388d';
const rows=JSON.parse(fs.readFileSync(out+'/matriu.json')),extra=JSON.parse(fs.readFileSync(out+'/matriu-altres-motors.json'));
const issues=[],report={matrixRows:rows.length,contextual:extra.filter(e=>e.source==='problemes').length,worksheet:extra.filter(e=>e.source==='fitxes').length,links:[],layouts:[],preservation:[],runtimeErrors:[]};
const check=(ok,msg)=>{if(!ok)issues.push(msg);};
const baseline=file=>cp.execFileSync('git',['show',baselineRef+':'+file],{cwd:root,encoding:'utf8',maxBuffer:2000000});
const lf=s=>s.replace(/\r\n/g,'\n');
const normalizedHead=s=>s.match(/<head[\s\S]*?<\/head>/)[0].replace(/<link rel="stylesheet" href="\.\.\/\.\.\/\.\.\/assets\/css\/teoria-numeric-1eso\.css">\s*/,'');
if(process.argv.includes('--source-only')){
 const previous=JSON.parse(fs.readFileSync(out+'/validacio.json'));const findings=[];
 for(const file of [...new Set(rows.map(r=>r.page))]){
  const before=lf(baseline('1eso/'+file)),after=lf(fs.readFileSync(root+'/1eso/'+file,'utf8'));
  assert.equal(normalizedHead(before),normalizedHead(after));
  assert.deepEqual(before.match(/<script\b[\s\S]*?<\/script>/g),after.match(/<script\b[\s\S]*?<\/script>/g));findings.push({file,head:true,scripts:true});
 }
 previous.sourcePreservation=findings;previous.issues=previous.issues.filter(e=>!e.endsWith(' head changed')&&!e.endsWith(' scripts changed'));
 fs.writeFileSync(out+'/validacio.json',JSON.stringify(previous,null,2));console.log({sourcePreservation:findings.length,issues:previous.issues,runtimeErrors:previous.runtimeErrors});process.exit(previous.issues.length?1:0);
}
if(process.argv.includes('--static-only')){
 const maps={};vm.runInNewContext(fs.readFileSync(root+'/assets/js/teoria-families-1eso.js','utf8'),{window:maps});
 const topicFiles={naturals:'nombres-naturals-bloc',decimal_sys:'sistema-numeracio-decimal',ops:'operacions-basiques',potencies:'potencies-arrels',jerarquia:'jerarquia-operacions',divis:'divisibilitat',mcmmcd:'mcm-mcd',enters:'nombres-enters',decimals:'nombres-decimals',fraccions:'fraccions',proporcionalitat:'proporcionalitat-directa',percentatges:'percentatges'};
 const findings=[];let targetCount=0;
 for(const [topic,name] of Object.entries(topicFiles)){
  const file='1eso/teoria/numeric/'+name+'-1r-eso.html',html=fs.readFileSync(root+'/'+file,'utf8');
  const found=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]),allIds=new Set(found),duplicates=[...new Set(found.filter((id,i)=>found.indexOf(id)!==i))];
  const anchors=[...html.matchAll(/\bhref="#([^"]+)"/g)].map(m=>m[1]),broken=[...new Set(anchors.filter(id=>!allIds.has(id)))];
  const mapped=[...new Set([...Object.values(maps.MITheoryFamilies?.[topic]||{}),...Object.values(maps.MITheoryVariants?.[topic]||{})])],missing=mapped.filter(id=>!allIds.has(id));
  const malformedHeadings=[...html.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi)].filter(m=>/<(?:p|div|section|ol|ul)\b/i.test(m[2])).length;
  check(!duplicates.length,file+' duplicate IDs '+duplicates.join(','));check(!broken.length,file+' broken local links '+broken.join(','));check(!missing.length,file+' missing family destinations '+missing.join(','));
  check(!malformedHeadings,file+' block elements inside headings: '+malformedHeadings);
  for(const row of [...rows,...extra].filter(r=>'1eso/'+r.page===file)){
   check(allIds.has(row.anchor),file+' missing matrix target '+row.anchor);
   check(anchors.includes(row.anchor),file+' target outside family navigation '+row.anchor);
  }
  targetCount+=mapped.length;
  findings.push({file,ids:allIds.size,uniqueMappedDestinations:mapped.length,allMapped:true,duplicateIds:duplicates.length,brokenLocalLinks:broken.length,malformedHeadings});
 }
 const sourceFiles=[...new Set(rows.map(r=>'1eso/'+r.page))];
 for(const file of sourceFiles){
  const before=lf(baseline(file)),after=lf(fs.readFileSync(root+'/'+file,'utf8'));
  check(normalizedHead(before)===normalizedHead(after),file+' head changed beyond shared stylesheet');
  check(JSON.stringify(before.match(/<script\b[\s\S]*?<\/script>/g))===JSON.stringify(after.match(/<script\b[\s\S]*?<\/script>/g)),file+' scripts changed');
 }
 const index=fs.readFileSync(root+'/1eso/sentit-numeric.html','utf8');
 check(index.includes('teoria-families-1eso.js'),'Family map is not loaded by practice page');
 const report={baseline:baselineRef,matrixRows:rows.length,contextual:extra.filter(e=>e.source==='problemes').length,worksheet:extra.filter(e=>e.source==='fitxes').length,static:{pages:findings,uniqueMappedDestinations:targetCount,sourcePagesPreserved:sourceFiles.length},browser:{status:'not-run',reason:'Chromium cannot start in this sandbox; use the full command in a browser-enabled environment.'},issues};
 fs.writeFileSync(out+'/validacio.json',JSON.stringify(report,null,2));
 console.log(JSON.stringify({baseline:baselineRef,pages:findings.length,matrixRows:rows.length,contextual:report.contextual,worksheet:report.worksheet,uniqueMappedDestinations:targetCount,issues},null,2));
 process.exit(issues.length?1:0);
}
const server=http.createServer((req,res)=>{
 const url=decodeURIComponent(req.url.split('?')[0]);
 if(url==='/baseline-practice'){res.setHeader('Content-Type','text/html; charset=utf-8');return res.end(baseline('1eso/sentit-numeric.html').replace('<head>','<head><base href="/1eso/">'));}
 const file=path.resolve(root,'.'+url);if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}
 fs.readFile(file,(e,data)=>{if(e){res.writeHead(404).end();return;}res.setHeader('Content-Type',file.endsWith('.css')?'text/css':file.endsWith('.js')?'text/javascript':file.endsWith('.html')?'text/html; charset=utf-8':'application/octet-stream');res.end(data);});
});
(async()=>{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+server.address().port;
 const executablePath=process.env.PLAYWRIGHT_EXECUTABLE_PATH||(process.platform==='win32'?'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe':fs.existsSync('/usr/bin/chromium')?'/usr/bin/chromium':undefined);
 const b=await chromium.launch({...executablePath?{executablePath}:{},headless:true});
 const context=await b.newContext({reducedMotion:'reduce'});await context.route('**/*',r=>r.request().url().startsWith(base)?r.continue():r.abort());
 const p=await context.newPage();p.on('pageerror',e=>report.runtimeErrors.push(e.message));
 if(process.argv.includes('--gallery')){
  await p.setViewportSize({width:1500,height:1000});await p.goto(base+'/docs/teoria-families/comparativa.html');
  await p.screenshot({path:out+'/captures/comparativa-1440.png',fullPage:true});await b.close();server.close();return;
 }
 await p.goto(base+'/baseline-practice');
 const generatorsBefore=await p.evaluate(()=>Object.fromEntries(Object.keys(window).filter(k=>/^(gen[A-Z]|nextAdaptivePractice|adaptivePracticeGroups|processAnswer)/.test(k)&&typeof window[k]==='function').map(k=>[k,String(window[k])])));
 await p.goto(base+'/1eso/sentit-numeric.html');
 const generatorsAfter=await p.evaluate(()=>Object.fromEntries(Object.keys(window).filter(k=>/^(gen[A-Z]|nextAdaptivePractice|adaptivePracticeGroups|processAnswer)/.test(k)&&typeof window[k]==='function').map(k=>[k,String(window[k])])));
 check(JSON.stringify(generatorsBefore)===JSON.stringify(generatorsAfter),'Generator or adaptive logic changed');
 report.generatorsPreserved=Object.keys(generatorsBefore).length;
 // Use real generated exercise metadata, rather than assuming requested type equals emitted type.
 const generated=await p.evaluate(rows=>rows.flatMap(row=>row.ids.map(type=>{
 const t=TOPICS.find(t=>t.id===row.topic),level=row.level;
 let e=t.id==='potencies'?genPotenciesPractice(type,level,{}):t.practiceGen?t.practiceGen(type,level):t.id==='ops'?genOpsPractice(type,level):t.id==='naturals'?(type===1001?MIFirstNumericTasks.generate('paquets-exactes'):typeof type==='number'?genNaturalType(type):genNaturalPracticeFamily(type)):type===1001?MIFirstNumericTasks.generate('xifres-amb-condicions'):type===1002?MIDecimalPractice.positionalChange(MIFirstNumericTasks.generate('canvi-posicional'),rnd,buildOpts):typeof type==='number'?genDecimalSysType(type,true):MIDecimalPractice.generate(type,rnd,buildOpts);
 const section=e.percentTheory||e.proportionTheory||e.fractionsTheory||e.decimalsTheory||e.entersTheory||e.mcmTheory||e.divisTheory||e.jerarquiaTheory||e.potenciesTheory||e.opsTheory;
 const div=document.createElement('div');div.innerHTML=miTheoryLinkHtml(t.id,undefined,section,e);
 return {topic:t.id,type,emittedType:e.type,reasoningFamily:e.reasoningFamily,expected:row.anchor,href:div.querySelector('a').getAttribute('href')};
 })),rows);
 for(const link of generated){check(link.href.endsWith('#'+link.expected),'Wrong correction '+JSON.stringify(link));report.links.push(link);}
 const contextual=await p.evaluate(extra=>extra.filter(r=>r.source==='problemes').map(r=>{const div=document.createElement('div');div.innerHTML=miTheoryLinkHtml(r.topic,undefined,r.anchor,{type:r.type,variantId:r.id});return {topic:r.topic,id:r.id,expected:r.anchor,href:div.querySelector('a').getAttribute('href')};}),extra);
 for(const link of contextual){check(link.href.endsWith('#'+link.expected),'Wrong contextual correction '+JSON.stringify(link));report.links.push(link);}
 for(const file of [...new Set(rows.map(r=>r.page))]){
  const original=baseline('1eso/'+file);await p.setContent(original);const old=await p.evaluate(()=>({ids:[...document.querySelectorAll('main [id]')].map(e=>e.id),text:[...document.querySelectorAll('main p,main .math,main .example,main .step,main details,main table')].map(e=>e.textContent.replace(/\s+/g,' ').trim()),seo:[...document.querySelectorAll('title,meta,script,link[rel=canonical]')].map(e=>e.outerHTML)}));
  await p.goto(base+'/1eso/'+file);
  const state=await p.evaluate(()=>({ids:[...document.querySelectorAll('main [id]')].map(e=>e.id),text:document.querySelector('main').textContent.replace(/\s+/g,' ').trim(),seo:[...document.querySelectorAll('title,meta,script,link[rel=canonical]')].map(e=>e.outerHTML),links:[...document.querySelectorAll('main a[href^="#"]')].map(a=>({id:a.hash.slice(1),valid:!!document.getElementById(a.hash.slice(1))})),cards:[...document.querySelectorAll('.quick-nav a')].map(a=>a.hash.slice(1)),late:[...document.querySelectorAll('main > .card')].filter(e=>e.compareDocumentPosition(document.querySelector('.final-cta'))&Node.DOCUMENT_POSITION_PRECEDING).map(e=>e.id)}));
  check(old.ids.every(id=>state.ids.includes(id)),file+' removed anchor');check(new Set(state.ids).size===state.ids.length,file+' duplicate anchor');
  const currentSource=lf(fs.readFileSync(root+'/1eso/'+file,'utf8'));
  check(old.text.every(t=>state.text.includes(t)),file+' original explanation removed');
  check(normalizedHead(lf(original))===normalizedHead(currentSource),file+' head changed beyond shared stylesheet');
  check(JSON.stringify(lf(original).match(/<script\b[\s\S]*?<\/script>/g))===JSON.stringify(currentSource.match(/<script\b[\s\S]*?<\/script>/g)),file+' scripts changed');
  check(!state.late.length,file+' theory after CTA');check(state.links.every(l=>l.valid),file+' broken card');
  for(const r of [...rows,...extra].filter(r=>r.page===file)){
   check(state.cards.includes(r.anchor),file+' family outside main grid '+(r.ids||r.id));
   check(await p.locator('[id="'+r.anchor+'"]').locator('.example,.steps,.math').count()>0,file+' missing worked example '+r.anchor);
  }
  report.preservation.push({file,ids:state.ids.length,cards:state.cards.length,preserved:true});
  // Click every card, allowing the browser itself to resolve the fragment and scroll.
  const cards=p.locator('.quick-nav a');for(let i=0;i<await cards.count();i++){
   const a=cards.nth(i),id=(await a.getAttribute('href')).slice(1);await a.click();check(decodeURIComponent(new URL(p.url()).hash.slice(1))===id,file+' click target '+id);
   check(await p.locator('[id="'+id+'"]').isVisible(),file+' destination not visible '+id);
  }
  for(const width of [1440,768,390,320]){
   await p.setViewportSize({width,height:1000});await p.goto(base+'/1eso/'+file);
   const layout=await p.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,columns:getComputedStyle(document.querySelector('.quick-nav')).gridTemplateColumns.split(' ').length}));
   check(layout.scroll<=width+1,file+' overflow '+width);report.layouts.push({file,...layout});
   if([1440,768,390].includes(width)&&['proporcionalitat','fraccions','percentatges'].some(t=>rows.find(r=>r.topic===t).page===file)){
    const topic=rows.find(r=>r.page===file).topic;await p.screenshot({path:out+'/captures/'+topic+'-despres-'+width+'.png'});
   }
  }
  if(file.includes('proporcionalitat-directa')){
   for(const width of [1440,390]){
    await p.setViewportSize({width,height:1000});await p.locator('#ajuda-exercicis').evaluate(el=>el.open=true);await p.locator('#produccio-pressupost').evaluate(el=>el.open=true);await p.locator('#produccio-pressupost').screenshot({path:out+'/captures/proporcionalitat-exemple-'+width+'.png'});
    await p.locator('.final-cta').scrollIntoViewIfNeeded();await p.screenshot({path:out+'/captures/proporcionalitat-final-'+width+'.png'});
   }
  }
 }
 // Previous public main, as supplied in the audit: same browser/width as the after captures.
 for(const topic of ['proporcionalitat','fraccions','percentatges']){
  const file=rows.find(r=>r.topic===topic).page;
  let old=baseline('1eso/'+file);
  for(const width of [1440,768,390]){await p.setViewportSize({width,height:1000});await p.goto(base+'/1eso/'+file);await p.setContent(old);await p.screenshot({path:out+'/captures/'+topic+'-main-abans-'+width+'.png'});}
 }
 // Real correction UI, including a topic that previously linked only to a generic page.
 for(const topic of ['naturals','decimal_sys','proporcionalitat','percentatges']){
  await p.goto(base+'/1eso/sentit-numeric.html?tema='+topic+'&nivell=1');
  const result=await p.evaluate(()=>{processPracticeAnswer(false,'prova de navegació');const a=document.querySelector('#fbA .mi-review-theory-link');return {href:a?.getAttribute('href'),type:currentEx.type};});
  check(!!result.href?.includes('#'),topic+' real correction missing fragment');report.links.push({topic,ui:true,...result});
 }
 await b.close();server.close();report.issues=issues;fs.writeFileSync(out+'/validacio.json',JSON.stringify(report,null,2));console.log(JSON.stringify({matrixRows:rows.length,contextual:report.contextual,worksheet:report.worksheet,links:report.links.length,layouts:report.layouts.length,generatorsPreserved:report.generatorsPreserved,issues},null,2));process.exitCode=issues.length?1:0;
})().catch(e=>{console.error(e);server.close();process.exit(1);});
