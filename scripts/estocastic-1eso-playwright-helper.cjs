'use strict';
const fs=require('node:fs');
const path=require('node:path');
const {pathToFileURL}=require('node:url');
let chromium;
for(const p of [
  'C:/Users/srigu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright',
  'C:/Users/srigu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright-core'
])try{chromium=require(p).chromium;break;}catch{}
if(!chromium)try{chromium=require('playwright').chromium;}catch{}
if(!chromium)throw new Error('Playwright no és disponible en aquest Node.js.');

const repo=path.resolve(__dirname,'..');
const practice=path.join(repo,'1eso','sentit-estocastic.html');
async function launchPage(){
  const failures=[];
  const candidates=[
    ['Chrome','C:/Program Files/Google/Chrome/Application/chrome.exe'],
    ['Chrome','C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'],
    ['Edge','C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'],
    ['Edge','C:/Program Files/Microsoft/Edge/Application/msedge.exe']
  ];
  for(const [engine,executablePath] of candidates)if(fs.existsSync(executablePath))try{
    const browser=await chromium.launch({executablePath});
    const page=await browser.newPage({viewport:{width:1200,height:900}}),errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    await page.route(/^https?:/,route=>route.abort());
    await page.goto(pathToFileURL(practice).href,{waitUntil:'load',timeout:30000});
    return {browser,page,engine,errors};
  }catch(e){failures.push(engine+': '+e.message);}
  try{
    const browser=await chromium.launch(),page=await browser.newPage({viewport:{width:1200,height:900}}),errors=[];
    page.on('pageerror',e=>errors.push(e.message));await page.route(/^https?:/,route=>route.abort());
    await page.goto(pathToFileURL(practice).href,{waitUntil:'load',timeout:30000});return {browser,page,engine:'bundled Chromium',errors};
  }catch(e){failures.push('bundled Chromium: '+e.message);}
  throw new Error('No s’ha pogut iniciar Chromium. '+failures.join(' | '));
}

const mathValidation=String.raw`(topicId)=>{
  const fail=(condition,message)=>{if(!condition)throw new Error(topicId+': '+message);};
  let seed=0x5e70c457;Math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
  const topic=TOPICS.find(t=>t.id===topicId),spec=MIFirstStochasticFamilies.topicSpecs(topicId),D=miTaskDifficulty;
  fail(topic&&spec&&D,'tema, catàleg i classificador carregats');
  const levels=[1,2,3].map(n=>spec.filter(f=>f.level===n).length);
  fail(D.coverage(topic).families.length===spec.length,'coverage informa totes les famílies');
  fail(JSON.stringify(D.coverage(topic).types)===JSON.stringify(levels),'coverage i nivells del catàleg coincideixen');
  fail(D.examPlan(topic).slots.reduce((a,b)=>a+b,0)===12,'pla de l’examen de 12 preguntes');
  const builders={recollida:buildRecollidaPool,taules:buildTaulesPool,barres:buildBarresPool,sectors:buildSectorsPool};
  const pools={recollida:115,taules:68,barres:112,sectors:94};
  const numberTypes={recollida:8,taules:12,barres:13,sectors:13}[topicId];
  const qByFamily=new Map(),typeCounts={},familyCounts={},contextCounts={},sampleCount={regular:0,contextual:0};
  const clean=s=>String(s||'').replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').replace(/\s+([,.;?!])/g,'$1').trim();
  const addExample=(q,answer)=>{const rows=qByFamily.get(q.familyId)||[];const visual=clean(q.visual);const statement=clean(q.question)+(visual?' [representació: '+visual+']':'');if(rows.length<3&&!rows.some(x=>x.statement===statement))rows.push({statement,answer:String(answer),level:q.taskDifficulty||q.diff||null});qByFamily.set(q.familyId,rows);};
  const number=(s)=>Number(String(s).replace(',','.').match(/-?\d+(?:\.\d+)?/)?.[0]);
  const tableRows=q=>{const d=new DOMParser().parseFromString(q.visual||'','text/html'),rows=[...d.querySelectorAll('table tr')];return rows.map(r=>[...r.querySelectorAll('td')].map(c=>c.textContent.trim()));};
  const barPairs=q=>{const d=new DOMParser().parseFromString(q.visual||'','text/html'),svg=d.querySelector('svg');if(!svg)return [];const rects=[...svg.querySelectorAll('rect')];if(rects.some(r=>r.hasAttribute('data-frequency')))return rects.map(r=>({label:r.getAttribute('data-category'),value:Number(r.getAttribute('data-frequency'))}));const t=[...svg.querySelectorAll('text')].map(x=>x.textContent.trim()),out=[];for(let i=0;i+1<t.length;i+=2){if(Number.isFinite(Number(t[i])))out.push({value:Number(t[i]),label:t[i+1]});}return out;};
  function verify(q){
    fail(q.topicId===topicId,'identificador de tema '+q.topicId);
    const f=MIFirstStochasticFamilies.familyFor(topic,q);
    fail(f&&q.familyId===f.id,'família matemàtica assignada');
    fail(D.getDifficulty(topic,q)===f.level&&q.taskDifficulty===f.level&&q.diff===f.level,'nivell intern i classificador coincideixen');
    fail(Array.isArray(q.options)&&q.options.length===4&&new Set(q.options.map(String)).size===4,'quatre opcions diferenciades');
    fail(q.options.filter(o=>String(o)===String(q.correct)).length===1,'una única opció correcta');
    fail(Array.isArray(q.guide)&&q.guide.length>=2&&Array.isArray(q.solution)&&q.solution.length>=2,'pistes progressives i resolució');
    const vals=(q.question.match(/\d+(?:[.,]\d+)?/g)||[]).map(x=>Number(x.replace(',','.'))),ans=number(q.correct),rows=tableRows(q),freq=rows[1]||[];
    if(topicId==='recollida'){
      if(q.type===1){const v=clean(q.question).match(/és:\s*"(.+?)"\?/i)?.[1],expected={'color dels ulls':'qualitativa','esport preferit':'qualitativa','mitjà de transport per anar a l’institut':'qualitativa','tipus de música preferida':'qualitativa','marca de mòbil utilitzada':'qualitativa','municipi de residència':'qualitativa','assignatura preferida':'qualitativa','color de la motxilla':'qualitativa','nombre de germans':'quantitativa discreta','nombre de llibres llegits aquest mes':'quantitativa discreta','nombre de gols marcats en un partit':'quantitativa discreta','nombre de mascotes a casa':'quantitativa discreta','nombre de missatges rebuts en una hora':'quantitativa discreta','nombre de persones que viuen a casa':'quantitativa discreta','nombre d’errors en un dictat':'quantitativa discreta','nombre de monedes que portes a la butxaca':'quantitativa discreta','alçada en cm':'quantitativa contínua','temperatura corporal':'quantitativa contínua','pes d’una motxilla':'quantitativa contínua','temps que es triga a arribar a l’institut':'quantitativa contínua','longitud d’un llapis':'quantitativa contínua','quantitat d’aigua d’una ampolla':'quantitativa contínua','distància recorreguda en bicicleta':'quantitativa contínua','durada d’una cançó':'quantitativa contínua'},key=v&&Object.keys(expected).find(k=>k.replace(/[’‘]/g,"'")===v.replace(/[’‘]/g,"'"));fail(v&&q.correct===expected[key],'oràcul independent de classificació de variables');}
      if(q.type===2){const m=clean(q.question).match(/hi ha (\d+) (.+?)\.? .*?seleccionen (\d+)/i);fail(m,'enunciat de població/mostra amb dades');fail(q.correct==='Mostra'||q.correct.indexOf('Els '+m[1]+' ')===0,'distinció població i mostra');}
      if(q.type===3)fail(q.correct===(/tots els|totes les/.test(clean(q.question))?'Cens':'Mostra'),'oràcul cens o mostra');
      if(q.type===4){const t=clean(q.question).toLowerCase(),expected=/preguntar|demanar/.test(t)?'Enquesta':/consult|utilitzar|fer servir|analitzar/.test(t)?'Fonts secundàries':/llançar|fer germinar|deixar caure|cronometrar/.test(t)?'Experiment':'Observació directa';fail(q.correct===expected,'oràcul del mètode de recollida');}
      if(q.type===5)fail(q.correct==='Mostra A','mostra representativa');
      if(q.type===6)fail(!/no creus|oi que|no et sembla|per què|massa|poc/.test(q.correct.toLowerCase()),'pregunta neutral sense biaix');
      if(q.type===7){const expected={depuracio:/revisar|comprovar/i,representativitat:/representativa|seleccionat/i,conclusio:/aproximadament|suggereix/i,procediment:/organitzar|pregunta, com s’han recollit/i}[q.variantId];fail(expected&&expected.test(q.correct),'variant d’inferència coherent '+q.variantId);}
      if(q.type===8){const expect=clean(q.question).match(/estudi de (.+), quin és/)[1],m={'els esports preferits de l’alumnat':'un alumne','l’alçada dels arbres d’un parc':'un arbre','el nombre de llibres llegits a la biblioteca':'un llibre','el temps de trajecte dels vehicles':'un vehicle','les temperatures màximes dels dies d’un mes':'un dia','les mascotes de les famílies d’un barri':'una família','els gols marcats en una lliga escolar':'un partit','la durada de les cançons d’una llista':'una cançó','el pes de les motxilles de 1r d’ESO':'una motxilla','les vendes diàries d’una botiga':'un dia','el color de les bicicletes del pati':'una bicicleta','el nombre de persones de cada habitatge':'un habitatge'};fail(q.correct===m[expect],'individu estadístic del context');}
    }
    if(topicId==='taules'){
      const cats=rows[0]||[];const fs=freq.map(Number);if([1,2,3,6,7,8].includes(q.type))fail(fs.length===4&&fs.every(Number.isFinite),'taula té quatre freqüències absolutes');
      if(q.type===1){const c=clean(q.question).match(/de "(.+?)"/)[1];fail(Number(q.correct)===fs[cats.indexOf(c)],'lectura absoluta');}
      if(q.type===2)fail(Number(q.correct)===fs.reduce((a,b)=>a+b,0),'total de dades');
      if(q.type===3){const c=clean(q.question).match(/de "(.+?)"/)[1],f=fs[cats.indexOf(c)],N=fs.reduce((a,b)=>a+b,0),text=clean(q.question);if(/fracció/.test(text))fail(q.correct===f+'/'+N,'freqüència relativa en fracció');else if(/percentatge/.test(text))fail(Math.abs(number(q.correct)-Math.round(f/N*10000)/100)<.011&&q.correct.endsWith('%'),'freqüència relativa en percentatge');else fail(Math.abs(Number(q.correct)-Math.round(f/N*100)/100)<.011,'freqüència relativa decimal');}
      if(q.type===4){const expected=vals[0]*vals[1];fail(vals.length===2&&Math.abs(Number(q.correct)-expected)<.01,'recuperar absoluta des de relativa');}
      if(q.type===5){const m=clean(q.question).match(/taula de (\d+) dades.*?són ([\d, ]+)\. Quina freqüència falta/);fail(m&&Number(q.correct)===Number(m[1])-m[2].split(',').reduce((a,b)=>a+Number(b),0),'freqüència desconeguda');}
      if(q.type===6){const i=fs.indexOf(Math.max(...fs));fail(q.correct===cats[i]&&fs.filter(v=>v===Math.max(...fs)).length===1,'categoria màxima');}
      if(q.type===7){const m=clean(q.question).match(/freqüència (\d+)/),i=fs.indexOf(Number(m?.[1]));fail(i>=0&&q.correct===cats[i],'cerca inversa a la taula');}
      if(q.type===8){const m=clean(q.question).match(/categoria "(.+?)"/),i=cats.indexOf(m?.[1]);fail(i>=0&&Number(q.correct)===fs.reduce((a,b)=>a+b,0)-fs[i],'complement de freqüència');}
      if(q.type===9)fail(q.correct==='Quantes vegades apareix aquest valor','definició de freqüència absoluta');
      if(q.type===10)fail(q.correct==='h = f / N','definició de freqüència relativa');
      if(q.type===11)fail(q.correct==='El nombre total de dades N','invariant Σf=N');
      if(q.type===12)fail(q.correct==='1','invariant Σh=1');
    }
    if(topicId==='barres'){
      const pairs=barPairs(q);if(q.type<=8||q.type===13)fail(pairs.length===5,'gràfic de barres conté cinc barres');
      if(q.type===1){const c=clean(q.question).match(/categoria "(.+?)"/)[1];fail(Number(q.correct)===pairs.find(x=>x.label===c)?.value,'lectura de barra');}
      if(q.type===2)fail(q.correct===pairs.reduce((a,b)=>a.value>b.value?a:b).label,'categoria màxima');
      if(q.type===3)fail(q.correct===pairs.reduce((a,b)=>a.value<b.value?a:b).label,'categoria mínima');
      if(q.type===4){const m=clean(q.question).match(/entre "(.+?)" i "(.+?)"/);fail(m&&Number(q.correct)===Math.abs(pairs.find(x=>x.label===m[1]).value-pairs.find(x=>x.label===m[2]).value),'diferència de freqüències');}
      if(q.type===5){const m=clean(q.question).match(/freqüència conjunta de "(.+?)" i "(.+?)"/);fail(m&&Number(q.correct)===pairs.find(x=>x.label===m[1]).value+pairs.find(x=>x.label===m[2]).value,'suma parcial de categories');}
      if(q.type===6)fail(Number(q.correct)===pairs.reduce((a,b)=>a+b.value,0),'total del diagrama');
      if(q.type===7){const m=clean(q.question).match(/freqüència (\d+)/);fail(m&&pairs.find(x=>x.value===Number(m[1]))?.label===q.correct,'cerca inversa de freqüència');}
      if(q.type===8){const m=clean(q.question).match(/freqüència: "(.+?)" o "(.+?)"/),a=pairs.find(x=>x.label===m?.[1]),b=pairs.find(x=>x.label===m?.[2]);fail(a&&b&&q.correct===(a.value>b.value?a.label:b.label),'comparar dues barres '+JSON.stringify({question:clean(q.question),correct:q.correct,labels:m&&m.slice(1),pairs}));}
      if(q.type===9)fail(q.correct==='Perquè representen categories o valors discrets diferenciats','convenció de barres separades');
      if(q.type===10)fail(q.correct==='La freqüència','lectura de l’eix vertical');
      if(q.type===11)fail(q.correct==='Quan volem comparar freqüències entre categories','ús del diagrama');
      if(q.type===12)fail(q.correct==='Cada barra associa una categoria o valor discret amb una freqüència','definició del diagrama');
      if(q.type===13){const d=new DOMParser().parseFromString(q.visual,'text/html'),svg=d.querySelector('svg'),r=[...svg.querySelectorAll('rect[data-frequency]')],step=Number(q.question.match(/avança de (\d+)/)[1]);fail(r.length===5&&r.every((x,i)=>Number(x.getAttribute('data-frequency'))===(i+1)*step),'escala i dades del gràfic coincideixen');const c=clean(q.question).match(/categoria "(.+?)"/)[1];fail(Number(q.correct)===Number(r.find(x=>x.getAttribute('data-category')===c).getAttribute('data-frequency')),'lectura segons l’escala');}
    }
    if(topicId==='sectors'){
      const d=new DOMParser().parseFromString(q.visual||'','text/html'),spans=[...d.querySelectorAll('div span span')].map(x=>x.parentElement.textContent.trim()),legend=spans.map(s=>{const m=s.match(/^(.+?):\s*([\d.]+)(%|°)$/);return m&&{label:m[1],value:Number(m[2]),unit:m[3]};}).filter(Boolean);
      const nums=legend.map(x=>x.value),sum=nums.reduce((a,b)=>a+b,0);
      if(q.type===1){const cat=clean(q.question).match(/"(.+?)"/)[1],g=legend.find(x=>x.label===cat);fail(g&&q.correct===g.value+'%','lectura de percentatge de sector');}
      if(q.type===2){const p=Number(clean(q.question).match(/el (\d+(?:[.,]\d+)?)%/)[1].replace(',','.'));fail(Number(q.correct.replace('°',''))===p*3.6,'percentatge a angle');}
      if(q.type===3){const deg=Number(clean(q.question).match(/ocupa (\d+)°/)[1]);fail(q.correct===deg/3.6+'%','angle a percentatge');}
      if(q.type===4){const m=clean(q.question).match(/de (\d+) persones.*?el (\d+(?:[.,]\d+)?)%/),expected=Number(m?.[1])*Number(m?.[2].replace(',','.'))/100;fail(m&&Number(q.correct)===expected&&Number.isInteger(expected),'percentatge a recompte enter');}
      if(q.type===5){const m=clean(q.question).match(/de (\d+) persones, (\d+) han triat/),g=legend.find(x=>x.label===clean(q.question).match(/han triat "(.+?)"/)[1]);fail(m&&g&&q.correct===g.value+'%'&&g.value/100*Number(m[1])===Number(m[2]),'recompte a percentatge');}
      if(q.type===6){const m=clean(q.question).match(/entre "(.+?)" i "(.+?)"/),a=legend.find(x=>x.label===m?.[1]),b=legend.find(x=>x.label===m?.[2]);fail(a&&b&&q.correct===Math.abs(a.value-b.value)+'%','comparació de sectors');}
      if(q.type===7)fail(q.correct===legend.reduce((a,b)=>a.value>b.value?a:b).label,'sector màxim');
      if(q.type===8){const m=clean(q.question).match(/categories ocupen el (\d+)%.*, el (\d+)% i el (\d+)%/),expected=100-(Number(m?.[1])+Number(m?.[2])+Number(m?.[3]));fail(m&&number(q.correct)===expected,'percentatges sumen 100%');}
      if(q.type===9){const m=clean(q.question).match(/sectors mesuren (\d+)°, (\d+)° i (\d+)°/),expected=360-(Number(m?.[1])+Number(m?.[2])+Number(m?.[3]));fail(m&&q.correct===expected+'°'&&expected>0,'angles sumen 360°');}
      if(q.type===10)fail(q.correct==='El 100% de les dades','cercle representa el total');
      if(q.type===11)fail(q.correct==='360°','cercle complet');
      if(q.type===12)fail(q.correct==='Quan volem comparar les parts d’un total','ús del diagrama de sectors');
      if(q.type===13)fail(q.correct==='Una quarta part','25% del cercle');
      if(q.visual&&q.type<=7){fail(d.querySelectorAll('svg path').length===legend.length,'un sector SVG per a cada categoria');const totalUnit=legend[0]?.unit==='°'?360:100;fail(Math.abs(sum-totalUnit)<0.001,'unitats de la llegenda sumen '+totalUnit+' '+(legend[0]?.unit||'%'));}
    }
    typeCounts[q.type]=(typeCounts[q.type]||0)+1;familyCounts[q.familyId]=(familyCounts[q.familyId]||0)+1;contextCounts[q.contextId||'sense-context']=(contextCounts[q.contextId||'sense-context']||0)+1;sampleCount.regular++;addExample(q,q.correct);
  }
  const expectedSize=pools[topicId];
  const bag=builders[topicId]();fail(bag.length===expectedSize,'mida real de la bossa '+bag.length+' / '+expectedSize);
  fail(bag.every(q=>q.familyId&&q.taskDifficulty===D.getDifficulty(topic,q)),'tota la bossa classificada');
  for(const q of bag){try{verify(q);}catch(error){throw new Error(error.message+' · type='+q.type+' · question='+clean(q.question));}}
  const types=[...new Set(bag.map(q=>q.type))];
  fail(types.length===numberTypes,'cobertura de tipus');
  for(const type of types)fail(bag.some(q=>q.type===type),'pool conserva tipus '+type);
  const familyTrace=[];let nextFromBag,bagLength;
  if(topicId==='recollida'){recollidaBag=[];lastRecollidaFamily=null;nextFromBag=genRecollida;bagLength=115;}
  if(topicId==='taules'){taulesBag=[];lastTaulesFamily=null;nextFromBag=genTaules;bagLength=68;}
  if(topicId==='barres'){barresBag=[];lastBarresFamily=null;nextFromBag=genBarres;bagLength=112;}
  if(topicId==='sectors'){sectorsBag=[];lastSectorsFamily=null;nextFromBag=genSectors;bagLength=94;}
  for(let i=0;i<bagLength*2;i++){const q=nextFromBag();familyTrace.push(q.familyId);if(i&&familyTrace[i]===familyTrace[i-1])fail(false,'família repetida consecutivament a la bossa, posició '+i+': '+familyTrace[i-1]+' / '+q.familyId);}
  const patternIds={recollida:['R1','R2','R3','R4','R5','R6','R7','R8','R9'],taules:['T1','T2','T3','T4','T5','T6','T7'],barres:['G1','G2','G3','G8','G9','K1'],sectors:['G4','G5','G6','G9','K3']}[topicId];
  const patterns=patternIds.map(id=>ST_OPEN_PATTERNS.find(p=>p.id===id));fail(patterns.every(Boolean),'banc contextual inclou totes les rutes '+patternIds.join(','));
  const variantCoverage={};
  for(const pattern of patterns){
    for(let i=0;i<250;i++){
      const q=pattern.gen();fail(q&&q.patternId===pattern.id,'generació contextual '+pattern.id);fail(q.solution?.length&&q.hint?.length,'solució i pista contextual '+pattern.id);
      if(pattern.id==='K1'){fail(q.labels.length===q.target.length&&q.labels.every((_,j)=>Number(q.target[j])>0),'construcció barres amb dades positives');}
      else if(pattern.id==='K3'){fail(q.labels.length===4&&q.target.length===4&&Math.abs(q.target.reduce((a,b)=>a+b,0)-360)<1e-8,'construcció sectors amb suma 360°');}
      else {
        const targetTopic=q.topicId,knownTopic=TOPICS.find(t=>t.id===targetTopic),f=knownTopic&&MIFirstStochasticFamilies.familyFor(knownTopic,q);
        if(f){fail(q.familyId===f.id&&q.diff===f.level&&pattern.diff===f.level,'nivell de banc contextual '+pattern.id);fail(typeof q.answer?.check==='function','corrector de resposta oberta '+pattern.id);}
        if(q.answer?.val!==undefined)fail(q.answer.check(q.answer.val),'resposta generada acceptada pel corrector '+pattern.id);
        if(pattern.id==='T1'){const m=clean(q.question).match(/Dades en brut: (.+?)\. Quina és la freqüència absoluta del valor (\d+)/),data=m?.[1].split(',').map(Number),n=Number(m?.[2]);fail(m&&Number(q.answer.val)===data.filter(x=>x===n).length,'oràcul recompte raw T1');}
        if(pattern.id==='T2'){const m=clean(q.question).match(/grup de\s+(\d+)\s+alumnes,\s+(\d+)\s+trien/),fraction=String(q.answer.val).match(/^(\d+)\/(\d+)$/);fail(m&&fraction&&Number(fraction[1])*Number(m[1])===Number(m[2])*Number(fraction[2])&&q.answer.check(q.answer.val),'oràcul freqüència relativa T2');}
        if(pattern.id==='T3'){const m=clean(q.question).match(/freqüències\s+(\d+),\s*(\d+),\s*\?,\s*(\d+)\s+i el total és\s+(\d+)/),expected=Number(m?.[4])-Number(m?.[1])-Number(m?.[2])-Number(m?.[3]);fail(m&&Number(q.answer.val)===expected,'oràcul freqüència que falta T3');}
        if(pattern.id==='T4'){const p=(clean(q.question).match(/(\d+(?:\.\d+)?)%/g)||[]).map(x=>Number(x.replace('%','')));fail(p.length===3&&Math.abs(number(q.answer.val)-(100-p.reduce((a,b)=>a+b,0)))<.011,'oràcul percentatge que falta T4');}
        if(pattern.id==='T5'){const m=clean(q.question).match(/freqüència absoluta (\d+) i freqüència relativa 1\/(\d+)/);fail(m&&Number(q.answer.val)===Number(m[1])*Number(m[2]),'oràcul recuperació del total T5');}
        if(pattern.id==='T6'){const r=tableRows({visual:q.visual}),sum=r[1].map(Number).reduce((a,b)=>a+b,0);fail(Number(q.answer.val)===sum,'oràcul total de taula T6');}
        if(pattern.id==='T7'){const r=tableRows({visual:q.visual}),f=r[1].map(Number);fail(Number(q.answer.val)===Math.max(...f)-Math.min(...f),'oràcul diferència màxim-mínim T7');}
        if(pattern.id==='G1'){const pair=barPairs(q).find(x=>clean(q.question).includes(x.label));fail(pair&&Number(q.answer.val)===pair.value,'oràcul lectura gràfic G1');}
        if(pattern.id==='G2'){const m=clean(q.question).match(/(\d+) i el mínim (\d+)/);const svg=new DOMParser().parseFromString(q.visual,'text/html'),v=[...svg.querySelectorAll('text')].map(x=>Number(x.textContent)).filter(Number.isFinite);fail(v.length>=4&&Number(q.answer.val)===Math.max(...v)-Math.min(...v),'oràcul diferència barres G2');}
        if(pattern.id==='G3'){const v=barPairs(q).map(x=>x.value);fail(v.length===4&&Number(q.answer.val)===v.reduce((a,b)=>a+b,0),'oràcul total gràfic G3');}
        if(pattern.id==='G4'){const d=new DOMParser().parseFromString(q.visual,'text/html'),cells=[...d.querySelectorAll('div span')].map(x=>x.textContent.trim()),wanted=clean(q.question).match(/correspon a (.+?)\?/)[1].trim(),line=cells.find(x=>x.startsWith(wanted+':')),expected=Number(line?.match(/([\d.]+)\s*%/)?.[1]);fail(expected>0&&number(q.answer.val)===expected,'oràcul lectura sector G4');}
        if(pattern.id==='G5'){const m=clean(q.question).match(/ocupa (\d+)% d’un grup de (\d+)/);fail(m&&Number(q.answer.val)===Number(m[1])*Number(m[2])/100,'oràcul percentatge a recompte G5');}
        if(pattern.id==='G6'){const m=clean(q.question).match(/freqüència (\d+) en un total de (\d+)/),expected=Math.round(Number(m?.[1])*360/Number(m?.[2])*10)/10;fail(m&&Math.abs(number(q.answer.val)-expected)<.011,'oràcul freqüència a angle G6');}
        if(pattern.id==='G8'){const v=(clean(q.question).match(/compara dues quantitats, (\d+) i (\d+).*comença a (\d+)/)||[]).slice(1).map(Number);fail(q.answer.val==='Sí'&&v.length===3&&v[2]<v[0]&&v[0]<v[1]&&v[1]-v[0]<=4,'oràcul de l’eix truncat G8');}
        if(pattern.id==='G9')fail(['barres','sectors','poligons'].includes(q.topicId),'tria de representació G9');
      }
      if(q.topicId===topicId||pattern.id==='G9'){const fam=q.familyId||pattern.mathFamilyId||spec.find(f=>f.generators.includes(pattern.id))?.id;if(fam){variantCoverage[fam]=(variantCoverage[fam]||0)+1;addExample({familyId:fam,question:q.question,visual:q.visual,taskDifficulty:q.taskDifficulty||q.diff},q.answer?.val||q.solution.join(' '));}}
      sampleCount.contextual++;
    }
  }
  const observedFamilies=new Set([...familyTrace,...Object.keys(variantCoverage)]);
  fail(observedFamilies.size===spec.length,'cobertura de famílies: absents '+spec.filter(f=>!observedFamilies.has(f.id)).map(f=>f.id).join(', '));
  return {topic:topicId,families:spec.length,familyCatalog:spec,levels,regularPool:bag.length,regularSamples:sampleCount.regular,regularTypes:typeCounts,regularFamilyCounts:familyCounts,contextSamples:sampleCount.contextual,contextPatterns:Object.fromEntries(patterns.map(p=>[p.id,250])),contextFamilyCounts:variantCoverage,bagRotations:familyTrace.length,examples:Object.fromEntries(qByFamily),pageErrors:[]};
}`;

async function runMathTopic(topicId){
  const {browser,page,engine,errors}=await launchPage();
  try{const result=await page.evaluate(({fn,id})=>(0,eval)(fn)(id),{fn:mathValidation,id:topicId});result.browser=engine;result.pageErrors=errors;return result;}
  finally{await browser.close();}
}
async function runUiTopic(topicId){
  const {browser,page,engine,errors}=await launchPage();
  try{
    const result=await page.evaluate(async id=>{
      const assert=(ok,msg)=>{if(!ok)throw new Error(id+': '+msg);};
      let seed=0x1e50cafe;Math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
      const topic=TOPICS.find(t=>t.id===id);assert(topic,'tema accessible');
      selectTopic(TOPICS.indexOf(topic));selectLevel(1);selectMode('multi');startPractice();
      assert(document.getElementById('screenExercise').classList.contains('active'),'pantalla de pràctica oberta');
      assert(document.getElementById('guideSteps').style.display==='block','pistes del mode guiat visibles');
      assert(document.querySelectorAll('#optionsGrid .opt-btn').length===4,'quatre opcions a la interfície');
      const correct=String(currentEx.correct),buttons=[...document.querySelectorAll('#optionsGrid .opt-btn')],index=buttons.findIndex(b=>b.textContent.trim()===correct);assert(index>=0,'resposta correcta disponible a la interfície');
      buttons[index].click();assert(document.getElementById('feedbackArea').textContent.trim().length>0,'retorn en respondre');
      document.getElementById('btnNext').click();assert(state.exCount===2,'es pot passar al següent exercici');
      selectMode('open');startPractice();assert(document.getElementById('openWrap').style.display==='block','entrada oberta visible');
      assert(currentEx.answer&&currentEx.answer.check(currentEx.answer.val),'resposta oberta del generador acceptada');
      const openFamilies=[currentEx.familyId],openPatterns=[currentEx.patternId];for(let i=1;i<20;i++){const q=stNextIntegratedOpen(id);assert(q&&q.familyId,'família de problema obert '+(i+1)+'; traça '+openPatterns.join(',')+'; darrera família '+stIntegratedOpenLastFamily[id]+'; banc '+JSON.stringify(stIntegratedOpenBag[id]));assert(q.familyId!==openFamilies[i-1],'rotació oberta sense repetició familiar consecutiva a '+(i+1)+': '+openFamilies[i-1]+' / '+q.familyId+' ('+openPatterns[i-1]+' / '+q.patternId+'); traça '+openPatterns.join(','));openFamilies.push(q.familyId);openPatterns.push(q.patternId);}
      document.getElementById('openInput').value=String(currentEx.answer.val);checkIntegratedOpen();
      assert(document.getElementById('feedbackArea').textContent.trim().length>0,'retorn en resposta oberta');
      if(id==='barres'){currentEx=buildBarresPool().find(q=>q.type===13);document.getElementById('exQuestion').innerHTML=currentEx.question+'<div class="ex-visual">'+currentEx.visual+'</div>';}
      if(id==='sectors'){currentEx=buildSectorsPool().find(q=>q.type===1&&q.visual);document.getElementById('exQuestion').innerHTML=currentEx.question+'<div class="ex-visual">'+currentEx.visual+'</div>';}
      const regressions={};
      for(const otherId of ['poligons','mitjana','mediana','moda','probabilitat']){const other=TOPICS.find(t=>t.id===otherId);assert(other,'tema de regressió '+otherId);for(let i=0;i<30;i++){const q=other.gen();assert(q&&q.topicId===otherId&&q.question&&q.correct!==undefined,'generació regressió '+otherId+' mostra '+(i+1));assert(Array.isArray(q.options)&&q.options.length===4&&new Set(q.options.map(String)).size===4,'opcions regressió '+otherId+' mostra '+(i+1));}regressions[otherId]=30;}
      return {topic:id,mode:'guided + open',exerciseCount:state.exCount,openRotation:openFamilies,regressions};
    },topicId);
    await page.setViewportSize({width:390,height:844});
    const responsive=await page.evaluate(()=>({viewport:innerWidth,document:document.documentElement.scrollWidth,chartCount:document.querySelectorAll('#exQuestion svg').length,chartBounds:[...document.querySelectorAll('#exQuestion svg')].map(x=>{const r=x.getBoundingClientRect();return {width:r.width,height:r.height};})}));
    if(responsive.document>responsive.viewport)throw new Error(topicId+': desbordament horitzontal al viewport mòbil '+JSON.stringify(responsive));
    if(topicId==='barres'&&responsive.chartCount&&responsive.chartBounds.some(x=>x.width<=0||x.height<=0))throw new Error(topicId+': gràfic SVG sense mida al mòbil');
    const exam=await page.evaluate(id=>{miTopicExam.start(id);const s=miTopicExam.getSession();if(!s||s.questions.length!==12)throw new Error(id+': examen de tema no té 12 preguntes');return {questions:s.questions.length,uniqueFamilies:new Set(s.questions.map(q=>q.familyId).filter(Boolean)).size};},topicId);
    if(errors.length)throw new Error(topicId+': errors JavaScript: '+errors.join(' | '));
    return {...result,...responsive,exam,browser:engine,pageErrors:errors};
  }finally{await browser.close();}
}
module.exports={repo,practice,launchPage,runMathTopic,runUiTopic,mathValidation};
