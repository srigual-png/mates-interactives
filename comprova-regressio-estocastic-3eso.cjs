const assert=require('assert'),path=require('path');
const {chromium}=require('C:/Users/srigu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{
 const b=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});const p=await b.newPage({viewport:{width:390,height:900}});await p.route(/^https?:/,r=>r.abort());
 await p.goto('file:///'+path.resolve('3eso/sentit-estocastic.html').replace(/\\/g,'/')+'?topic=quartils3r&examen=tema');await p.waitForSelector('#miTopicExam.active');
 const checks=await p.evaluate(()=>{
  let n=0;const check=(ok,msg)=>{if(!ok)throw Error(msg);n++;};const el=html=>{const e=document.createElement('div');e.innerHTML=html;return e;};const num=s=>Number(String(s).replace(',','.'));const value=s=>{const a=String(s).split('/').map(num);return a.length===2?a[0]/a[1]:num(s);};
  const median=a=>a.length%2?a[Math.floor(a.length/2)]:(a[a.length/2-1]+a[a.length/2])/2;
  for(const t of miTopicExam.getTopics())for(let k=0;k<3;k++){
   const qs=miTopicExam.build(t);check(qs.length===12,t.id);check(new Set(qs.map(q=>q.question)).size===12,'Duplicats');
   for(const q of qs){check(q.options.filter(o=>String(o)===String(q.correct)).length===1,'Resposta única');check(q.options.every(o=>String(o)===String(q.correct)||!openOk(q.correct,q.alts,o,q)),'Equivalent');if(q.visual)check(el(q.question).querySelector('svg,table,.raw-data')!==null,'Visual absent');if(t.id==='grafics3r'&&q.type===7)check(!q.question.includes('#a87408')&&!q.question.includes('r="7"'),'Ressaltat solució');if(t.id==='quartils3r'&&q.type===4)check(q.options.every(o=>!String(o).includes('o superior')),'Interpretació complementària');if(t.id==='taules3r'&&q.type===11)check(q.question.includes('ordenada de menor a major'),'Llista ordenada');check(!q.question.includes('Atenció a l’escala'),'Pista');}
  }
  for(let k=0;k<80;k++){
   const q=genQuartils3r(1),e=el(q.visual),a=e.textContent.split(' · ').map(num).sort((a,b)=>a-b),half=a.length/2;const text=el(q.question).textContent;const expected=text.includes('Q₁')?median(a.slice(0,half)):text.includes('Q₃')?median(a.slice(half)):median(a);check(num(q.correct)===expected,'Quartils');
   for(const type of [1,2,7]){const q=genDispersio3r(type),a=el(q.visual).textContent.split(' · ').map(num),mean=a.reduce((a,b)=>a+b,0)/a.length,variance=a.reduce((s,x)=>s+(x-mean)**2,0)/a.length,expected=type===1?Math.max(...a)-Math.min(...a):type===2?variance:Math.sqrt(variance);check(Math.abs(num(q.correct)-expected)<.0051,'Dispersió');}
   const c=genCentralitzacio3r(4),rows=[...el(c.visual).querySelectorAll('tbody tr')];const data=rows.map(r=>[...r.querySelectorAll('td')].map(x=>x.textContent));if(data.length){let total=0,sum=0;for(const row of data){if(row.length<3)continue;const mark=num(row[1]),f=num(row[2]);if(Number.isFinite(mark)&&Number.isFinite(f)){sum+=mark*f;total+=f;}}check(total>0&&Math.abs(num(c.correct)-sum/total)<.0051,'Mitjana agrupada');}
   for(const type of [18,19,20]){const q=genProbabilitatBloc8(type),texts=[...el(q.visual).querySelectorAll('svg text')].map(x=>x.textContent).filter(x=>/^[VB] \d+\/\d+$/.test(x)).map(x=>value(x.slice(2)));check(texts.length===6,'Arbre complet');let expected;if(type===20)expected=texts[0]*texts[2]+texts[3]*texts[4];else{const path=el(q.question).querySelector('b').textContent;const first=path[0]==='V'?0:3;expected=texts[first]*texts[first+1+(path[1]==='V'?0:1)];}check(Math.abs(value(q.correct)-expected)<1e-10,'Probabilitat arbre');}
  }
  check(openOk('1/2',[],' 0,5 ',{}),'Coma');check(!openOk('1/2',[],'1/0',{}),'Zero');check(!openOk('1/2',[],'-1/2',{}),'Signe');
  miExamSelectedTopics=miExamCoreTopics().map(t=>t.id);miRunConfiguredExam();check(state.examQs.length===20,'General');check(state.examQs.every(q=>!q.topicId.startsWith('amp')),'Ampliacions');return n;
 });
 await p.evaluate(()=>miTopicExam.start('quartils3r'));assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await p.screenshot({path:'scripts/examens-estocastic-3eso-390.png',fullPage:true});console.log(checks+' comprovacions: bancs, visuals, quartils, dispersió, mitjana agrupada, arbres, corrector i examen general.');await b.close();
})().catch(e=>{console.error(e);process.exit(1)});
