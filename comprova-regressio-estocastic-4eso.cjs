const assert=require('assert'),path=require('path');
const {chromium}=require('C:/Users/srigu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{const b=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});const p=await b.newPage({viewport:{width:390,height:900}});await p.route(/^https?:/,r=>r.abort());
for(const opcio of ['A','B']){
 await p.goto('file:///'+path.resolve('4eso/sentit-estocastic.html').replace(/\\/g,'/')+'?opcio='+opcio+'&topic=dadesVariables4t&examen=tema');await p.waitForSelector('#miTopicExam.active');
 const checks=await p.evaluate(()=>{
  let n=0;const check=(ok,msg)=>{if(!ok)throw Error(msg);n++;};const el=html=>{const e=document.createElement('div');e.innerHTML=html;return e;};const num=s=>Number(String(s).replace('%','').replace(/\s/g,'').replace(',','.'));
  check(miTopicExam.getTopics().length===8,'Blocs');
  for(const t of miTopicExam.getTopics()){
   for(let k=0;k<3;k++){const qs=miTopicExam.build(t);check(qs.length===12,t.id);check(new Set(qs.map(q=>q.question)).size===12,'Duplicats');for(const q of qs){check(q.options.filter(o=>String(o)===String(q.correct)).length===1,'Correcta única');check(q.options.every(o=>String(o)===String(q.correct)||!validateOpen(q,o)),'Equivalent');check(q.solution.length>0,'Explicació');}}
   miTopicExam.start(t.id);const legends=[...document.querySelectorAll('#miTopicExam legend')].map(e=>e.textContent);for(const level of ['Fàcil','Mitjana','Alta'])check(legends.filter(x=>x.includes(level)).length===4,'Dificultats');
  }
  let groupA=0;for(let k=0;k<100;k++){
   const q=genComparacioDistribucions4(1),values=[...el(q.question).querySelectorAll('b')].slice(0,2).map(x=>num(x.textContent.split('=')[1]));const want=values[0]>values[1]?'Grup A':values[0]<values[1]?'Grup B':'Tenen la mateixa mitjana';check(q.correct===want,'Comparació mitjanes');check(q.solution.join(' ').includes(want),'Explicació comparació');if(want==='Grup A')groupA++;
   for(const type of [2,10]){const q=genComparacioDistribucions4(type),a=el(q.question).querySelector('b').textContent.split(', ').map(num).sort((a,b)=>a-b),m=a.length%2?a[Math.floor(a.length/2)]:(a[a.length/2-1]+a[a.length/2])/2;check(num(q.correct)===m,'Mediana');}
   for(const type of [4,8]){const q=genTaulesRepresentacions4(type),rows=[...el(q.question).querySelectorAll('tr')],v=[...rows[type===4?1:2].querySelectorAll('td')].map(x=>num(x.textContent));check(Math.abs(num(q.correct)-Math.round(v[0]/(v[0]+v[1])*1000)/10)<1e-9,'Percentatge i grup de referència');}
   const r=genRegressioPrediccions4(1),text=el(r.question).textContent,m=text.match(/y = ([\d,]+)x \+ (\d+)/),x=text.match(/x = (\d+)/);check(Math.abs(num(r.correct)-(num(m[1])*num(x[1])+num(m[2])))<1e-9,'Predicció lineal');
  }check(groupA>0,'Cas A més alt');
  const g=genNuvolsRelacio4(9),points=[...el(g.question).querySelectorAll('circle')].map(e=>[Number(e.getAttribute('cx')),-Number(e.getAttribute('cy'))]);const means=[0,1].map(i=>points.reduce((s,p)=>s+p[i],0)/points.length);const cross=points.reduce((s,p)=>s+(p[0]-means[0])*(p[1]-means[1]),0),ss=[0,1].map(i=>points.reduce((s,p)=>s+(p[i]-means[i])**2,0)),corr=cross/Math.sqrt(ss[0]*ss[1]);check(corr>.4&&corr<.75,'Associació moderada');
  const probabilities={1:50,2:75,3:25,4:100/6,6:24,7:30,10:50};for(const [type,want]of Object.entries(probabilities)){const q=genExperimentsCompostos4(Number(type));check(Math.abs(num(q.correct)-want)<.051,'Probabilitat composta');}
  const q={validator:'number',correct:'24 %',alts:['24'],question:'Escriu el percentatge'};check(validateOpen(q,' 24,0 % '),'Format percentatge');check(!validateOpen(q,'-24'),'Signe');check(!validateOpen(q,'25'),'Incorrecta');check(!validateOpen(q,''),'Buida');
  unlockAllTopics();miExamSelectedTopics=miExamCoreTopics().map(t=>t.id);miRunConfiguredExam();check(state.examQs.length===20,'Examen general');check(state.examQs.every(q=>!q.topicId.includes('Batx')),'Ampliacions');return n;
 });
 await p.evaluate(()=>miTopicExam.start('taulesRepresentacions4t'));assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await p.screenshot({path:'scripts/examens-estocastic-4eso-'+opcio+'-390.png',fullPage:true});console.log(opcio+': '+checks+' comprovacions, vuit blocs, 4/4/4, càlculs independents, gràfics i examen general.');
}await b.close();})().catch(e=>{console.error(e);process.exit(1)});
