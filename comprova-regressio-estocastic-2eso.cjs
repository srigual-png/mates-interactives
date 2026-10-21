const assert=require('assert'),path=require('path'),fs=require('fs');
const {chromium}=require('C:/Users/srigu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{
 const b=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
 const p=await b.newPage({viewport:{width:390,height:900}});await p.route(/^https?:/,r=>r.abort());
 await p.goto('file:///'+path.resolve('2eso/sentit-estocastic.html').replace(/\\/g,'/')+'?topic=experiments&examen=tema');await p.waitForSelector('#miTopicExam.active');
 const checks=await p.evaluate(()=>{
  let n=0;const check=(ok,msg)=>{if(!ok)throw Error(msg);n++;};
  const el=html=>{const e=document.createElement('div');e.innerHTML=html;return e;};
  const number=s=>Number(String(s).replace(',','.'));
  const value=s=>{const a=String(s).split('/').map(number);return a.length===2?a[0]/a[1]:number(s);};
  for(const t of miTopicExam.getTopics())for(let k=0;k<3;k++){
   const qs=miTopicExam.build(t);check(qs.length===12,t.id);check(new Set(qs.map(q=>q.question)).size===12,'Duplicats');
   for(const q of qs){check(q.options.filter(o=>String(o)===String(q.correct)).length===1,'Resposta única');check(q.options.every(o=>String(o)===String(q.correct)||!openOk(q.correct,q.alts,o,q)),'Distractor equivalent');if(q.visual)check(el(q.question).querySelector('svg,table,.pictogram,.raw-data')!==null,'Visual absent');check(!q.question.includes('Atenció: l’eix vertical'),'Pista d’escala');if(t.id==='experiments'){check(q.type!==13,'Representació ambigua');if(q.type===12)check(!q.question.includes('✓'),'Casos marcats');}if(t.id==='frequencias'&&q.type===11){check(q.question.includes('ordenada de menor a major'),'Ordre explícit');const ordered=q.options.filter(o=>{const a=String(o).split(', ').map(Number);const expected=String(q.correct).split(', ').map(Number);return a.every(Number.isFinite)&&a.length===expected.length&&a.every((v,i)=>v===expected[i]);});check(ordered.length===1,'Llista ordenada única');}}
  }
  for(let k=0;k<60;k++){
   const q=genExperiments2ESO(7),text=el(q.question).textContent,nums=[...text.matchAll(/\d+/g)].map(m=>Number(m[0]));const [sides,target]=nums;
   let fav=0;for(let a=1;a<=sides;a++)for(let c=1;c<=sides;c++)if(a+c===target)fav++;
   check(Math.abs(value(q.correct)-fav/(sides*sides))<1e-10,'Dos daus');
   for(const type of [9,10,11]){const q=genExperiments2ESO(type),nums=[...el(q.question).textContent.matchAll(/\d+/g)].map(m=>Number(m[0]));const count=nums[0],heads=nums[1];const outcomes=Array.from({length:2**count},(_,i)=>i.toString(2).padStart(count,'0'));const fav=outcomes.filter(x=>type===9?x.includes('1'):type===11?!x.includes('1'):[...x].filter(c=>c==='1').length===heads).length;check(value(q.correct)===fav/outcomes.length,'Monedes');}
   for(const type of [1,4,5,7,10]){const q=genCentralitzacio2ESO(type),e=el(q.question),data=e.querySelector('.raw-data');if(!data)continue;const a=[...data.textContent.matchAll(/\d+(?:[.,]\d+)?/g)].map(m=>number(m[0])).sort((a,b)=>a-b);if(!a.length)continue;let expected;
    if(type===1)expected=a.reduce((a,b)=>a+b,0)/a.length;
    if([4,5].includes(type))expected=a.length%2?a[Math.floor(a.length/2)]:(a[a.length/2-1]+a[a.length/2])/2;
    if(type===10)expected=e.textContent.includes('màxim')?a.at(-1):e.textContent.includes('mínim')?a[0]:a.at(-1)-a[0];
    if(expected!==undefined)check(Math.abs(number(q.correct)-expected)<1e-9,'Centralització');
   }
  }
  check(openOk('1/2',[],' 0,5 ',{}),'Coma');check(openOk('1/2',[],'50%',{}),'Percentatge');check(!openOk('1/2',[],'1/0',{}),'Divisió zero');check(!openOk('1/2',[],'-1/2',{}),'Signe');check(!openOk('1/2',[],'0,51',{}),'Valor incorrecte');
  unlockAllTopics();miExamSelectedTopics=miExamCoreTopics().map(t=>t.id);miRunConfiguredExam();check(state.examQs.length===20,'Examen general');check(state.examQs.every(q=>q.course!=='3r'&&!q.topicId.endsWith('3r')),'Ampliacions');return n;
 });
 await p.evaluate(()=>miTopicExam.start('experiments'));assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await p.screenshot({path:'scripts/examens-estocastic-2eso-390.png',fullPage:true});
 console.log(checks+' comprovacions: bancs, opcions, gràfics, probabilitats independents, normalització, examen general i mòbil.');await b.close();
})().catch(e=>{console.error(e);process.exit(1)});
