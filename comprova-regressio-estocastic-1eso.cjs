const assert=require('assert'),path=require('path'),fs=require('fs');
const {chromium}=require('C:/Users/srigu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{
 const b=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
 const p=await b.newPage({viewport:{width:390,height:900}});
 await p.route(/^https?:/,r=>r.abort());
 await p.goto('file:///'+path.resolve('1eso/sentit-estocastic.html').replace(/\\/g,'/')+'?tema=barres&examen=tema');
 await p.waitForSelector('#miTopicExam.active');
 const checks=await p.evaluate(()=>{
  let n=0;const ensure=(ok,msg)=>{if(!ok)throw Error(msg);n++;};
  const text=html=>{const e=document.createElement('div');e.innerHTML=html;return e.textContent;};
  for(const t of miTopicExam.getTopics())for(let k=0;k<5;k++){
   const qs=miTopicExam.build(t);ensure(qs.length===12,t.id);
   ensure(new Set(qs.map(q=>q.question)).size===12,'Duplicats '+t.id);
   for(const q of qs){ensure(!q.question.includes('var(--primary-dark)'),'Ressaltat');ensure(!q.question.includes('stroke="var(--primary)" stroke-width="2"'),'Sector ressaltat');
    if(q.visual)ensure(q.question.includes('<svg')||q.question.includes('<table'),'Visual absent');
    ensure(q.options.filter(o=>String(o)===q.correct).length===1,'Opcions');
   }
  }
  for(let i=0;i<300;i++){
   const q=genMitjana();if(q.type===1){const a=q.question.split(': ')[1].split(', ').map(Number);ensure(Number(q.correct)===Math.round(a.reduce((a,b)=>a+b,0)/a.length*100)/100,'Mitjana');}
   if(q.type===4){const e=document.createElement('div');e.innerHTML=q.visual;const rows=[...e.querySelectorAll('tr')].map(r=>[...r.querySelectorAll('td')].map(x=>Number(x.textContent)));const a=rows[0],f=rows[1];ensure(Number(q.correct)===Math.round(a.reduce((s,x,j)=>s+x*f[j],0)/f.reduce((a,b)=>a+b,0)*100)/100,'Mitjana ponderada');}
   const m=genMediana();if([1,3,4].includes(m.type)){const a=m.question.split(': ')[1].split(/ \(n=|\. Quina/)[0].split(', ').map(Number).sort((a,b)=>a-b);const v=a.length%2?a[Math.floor(a.length/2)]:(a[a.length/2-1]+a[a.length/2])/2;ensure(Number(m.correct)===v,'Mediana');}
  }
  miExamSelectedTopics=miExamCoreTopics().map(t=>t.id);startExam();ensure(state.examQs.length===20,'Examen general');ensure(state.examQs.every(q=>q.solution.length),'Solucions general');
  return n;
 });
 await p.evaluate(()=>miTopicExam.start('barres'));
 assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 await p.screenshot({path:'scripts/examens-estocastic-1eso-390.png',fullPage:true});
 const catalogue=JSON.parse(fs.readFileSync('assets/data/index-cerca.json','utf8'));
 const entries=catalogue.filter(e=>e.course===1&&e.practice==='1eso/sentit-estocastic.html'&&e.exam);assert.equal(entries.length,9);
 for(const e of entries)assert(fs.existsSync(e.theory),e.theory);
 await p.goto('file:///'+path.resolve('1eso/index.html').replace(/\\/g,'/'));
 await p.locator('#mi-search-input').fill(entries[0].title);
 await p.locator('a.mi-search__exam').first().waitFor();
 assert((await p.locator('a.mi-search__exam').first().getAttribute('href')).includes(entries[0].exam.replace('1eso/','')));
 console.log(checks+' comprovacions: unicitat, visuals sense pistes, opcions, mitjanes i medianes independents, examen general de 20 i mòbil.');
 await b.close();
})().catch(e=>{console.error(e);process.exit(1)});
