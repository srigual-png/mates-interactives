// Regressió funcional de portada; la comparació amb l’HTML històric es manté al test original.
const fs=require('fs'),path=require('path'),assert=require('assert'),{pathToFileURL,fileURLToPath}=require('url');
const {chromium}=require('C:/Users/srigu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
require('./assets/js/exercici-portada-banc.js');for(const course of [2,3,4])require(`./assets/js/exercici-portada-${course}eso.js`);
const bank=globalThis.MIPortadaBank;
// Reutilitza els oracles independents dels quatre bancs ja validats.
for(const course of [1,2,3,4]){
 const source=fs.readFileSync(course===1?'comprova-exercici-portada.cjs':`comprova-exercici-portada-${course}eso.cjs`,'utf8');
 const oracles=new Function(`return ${source.match(/const oracles\s*=\s*([\s\S]*?);\r?\nfor\s*\(/)[1]}`)();
 for(const [i,gen]of bank.banks[`${course}eso`].entries())for(let j=0;j<200;j++){
  const e=gen(),expected=oracles[i](course===1?e.question:e.question.match(/-?\d+/g).map(Number));
  if(typeof expected==='number')assert(Math.abs(expected-e.answer)<1e-9,e.question);else assert.equal(expected,e.answer);
  assert.equal(e.course,`${course}eso`);assert(fs.existsSync(e.theoryPath));assert(bank.validate(e,e.answerLabel));assert(!bank.validate(e,e.type==='choice'?'Angle desconegut':String(e.answer+1)));
 }
}
(async()=>{
 const browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
 try{
 const context=await browser.newContext(),page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 // Font pseudoaleatòria reproduïble per verificar els 40 generadors.
 await page.addInitScript(()=>{let seed=271828;Math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};});
 await page.goto(pathToFileURL(path.resolve('index.html')).href,{waitUntil:'domcontentloaded'});
 assert(await page.locator('#exercise-demo').isVisible());assert.equal(await page.locator('.card--course').count(),4);
 await page.locator('[data-demo-form] button[type=submit]').click();assert((await page.locator('[data-demo-result]').innerText()).includes('abans de comprovar'));
 let theoryTab,firstUrl;
 for(let i=0;i<2;i++){
  const control=page.locator('[name=answer]'),type=await control.evaluate(e=>e.tagName);
  if(type==='SELECT')await control.selectOption('Angle pla');else await control.fill('99999');
  await page.locator('[data-demo-form] button[type=submit]').click();
  const link=page.locator('[data-demo-result] a'),url=await link.getAttribute('href');assert(fs.existsSync(fileURLToPath(url)));
  if(!theoryTab){const opened=context.waitForEvent('page');await link.click();theoryTab=await opened;await theoryTab.waitForLoadState();firstUrl=url;}
  else{const nav=theoryTab.waitForEvent('framenavigated',f=>f===theoryTab.mainFrame());await link.click();await nav;await theoryTab.waitForLoadState('domcontentloaded');assert.equal(theoryTab.url(),url);}
  assert.equal(context.pages().length,2);assert.equal(await theoryTab.evaluate(()=>window.name),'MI_TEORIA');await page.bringToFront();
  await page.locator('[data-demo-next]').click();
 }
 await theoryTab.close();await page.bringToFront();
 // Regressió: una parella de coordenades no és el valor escalar x demanat.
 await page.evaluate(()=>{
  const random=Math.random,values=[.55,.9,.3];Math.random=()=>values.shift();
  const ex=MIPortadaBank.banks['3eso'][7]();Math.random=random;
  const generate=MIPortadaBank.generate;MIPortadaBank.generate=()=>ex;
  document.querySelector('[data-demo-next]').click();MIPortadaBank.generate=generate;
 });
 assert((await page.locator('[data-demo-question]').innerText()).includes('P(1, 4)'));
 await page.locator('[name=answer]').fill('(4,4)');await page.locator('[data-demo-form] button[type=submit]').click();
 const formatMessage=await page.locator('[data-demo-result]').innerText();assert(formatMessage.includes('Escriu només la coordenada x.'));assert(!formatMessage.includes('fracció'));assert(!formatMessage.includes('Incorrecte'));
 await page.locator('[name=answer]').fill('4');await page.locator('[name=answer]').press('Enter');assert((await page.locator('[data-demo-result]').innerText()).includes('Correcte!'));
 await page.locator('[name=answer]').fill('5');await page.locator('[data-demo-form] button[type=submit]').click();assert((await page.locator('[data-demo-result]').innerText()).includes('Incorrecte'));
 await page.locator('[data-demo-next]').click();
 const samples=await page.evaluate(()=>{
  const host=document.querySelector('#exercise-demo'),find=s=>host.querySelector(s),out=[];let previous='';
  for(let i=0;i<800;i++){
   const q=find('[data-demo-question]').textContent,meta=find('[data-demo-meta]').textContent,topic=find('[data-demo-topic]').textContent,control=find('[name=answer]');
   if(q===previous)throw Error('Repetició consecutiva');previous=q;
   const course=['1r ESO','2n ESO','3r ESO','4t ESO'].find(c=>meta.startsWith(c+' · '));if(!course||!topic)throw Error('Metadades incorrectes');
   control.value=control.tagName==='SELECT'?'Angle pla':'99999';find('button[type=submit]').click();
   const status=find('[data-demo-result] p').textContent,link=find('[data-demo-result] a');
   if(!status.includes('Incorrecte')||!link||host.querySelectorAll('[data-demo-result] li').length<2)throw Error('Correcció incorrecta');
   const path=new URL(link.href).pathname,expected=String(['1r ESO','2n ESO','3r ESO','4t ESO'].indexOf(course)+1)+'eso';if(!path.includes('/'+expected+'/teoria/'))throw Error('Teoria del curs incorrecte');
   control.value=status.match(/Resposta correcta: (.*)\.$/)[1];find('button[type=submit]').click();
   if(!find('[data-demo-result]').textContent.includes('Correcte!')||find('[data-demo-result] a'))throw Error('Encert incorrecte');
   find('[data-demo-next]').click();if(find('[name=answer]').value||find('[data-demo-result]').textContent||find('[name=answer]').hasAttribute('aria-invalid'))throw Error('Estat conservat');
   out.push({course,meta,topic,type:control.tagName});
  }return out;
 });
 assert.equal(new Set(samples.map(e=>e.course)).size,4);assert.equal(new Set(samples.map(e=>e.meta+' · '+e.topic)).size,40);assert.equal(new Set(samples.map(e=>e.type)).size,2);
 for(const width of [320,375,768,1280]){
  await page.setViewportSize({width,height:1000});await page.locator('[name=answer]').evaluate(e=>{e.value=e.tagName==='SELECT'?'Angle pla':'99999';});await page.locator('[data-demo-form] button[type=submit]').click();await page.locator('#exercise-demo').scrollIntoViewIfNeeded();
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));assert(await page.evaluate(()=>[...document.querySelectorAll('#exercise-demo input,#exercise-demo select,#exercise-demo button')].every(e=>{const r=e.getBoundingClientRect();return r.left>=0&&r.right<=innerWidth&&r.height>=44;})));
  await page.screenshot({path:`backups/demo-portada-general/portada-${width}.png`});
 }
 assert.deepEqual(errors,[]);const report={mathSamples:8000,consecutiveExercises:800,courses:[...new Set(samples.map(e=>e.course))],generatorsCovered:40,responseFormats:['INPUT','SELECT'],widths:[320,375,768,1280],theoryReuse:true,errors};
 fs.writeFileSync('backups/demo-portada-general/resultats.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1);});
