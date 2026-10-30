const fs=require('fs'),path=require('path'),assert=require('assert/strict');
const {chromium}=require('C:/Users/srigu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const cases=[
 ['1eso','estocastic',{mediana:{2:1}}],
 ['2eso','mesura',{perimetres:{17:2,18:2}}],
 ['3eso','numeric',{proporcionalitat3r:{16:1},recomptes3r:{17:2}}],
 ['3eso','mesura',{volum:{10:1},precisio:{10:1},arees:{10:2},semblanca:{10:2},tales:{10:2},pitagores:{10:2},piramides:{10:2},errorMesura:{10:2}}],
 ['4eso','mesura',{angles4t:{11:1},radians4t:{11:1},pitagores4t:{11:1},semblancaRaons4t:{11:1},trigRaons4t:{11:1},resolTriangles4t:{11:2},mesuresIndirectes4t:{11:2},precisioError4t:{11:2}}]
];
(async()=>{const browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});const results=[];
try{for(const [course,sense,targets]of cases){const p=await browser.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));await p.route(/^https?:/,r=>r.abort());await p.goto('file:///'+path.resolve(`${course}/sentit-${sense}.html`).replace(/\\/g,'/')+(course==='4eso'?'?opcio=B':''));
 const data=await p.evaluate(({targets})=>{
  const check=(ok,msg)=>{if(!ok)throw Error(msg);},results=[];
  for(const [id,expected]of Object.entries(targets)){
   const t=miTopicExam.getTopics().find(t=>t.id===id);check(t,'tema elegible '+id);const samples={};
   for(let i=0;i<500;i++){const q=t.gen(),level=miTopicExam.getDifficulty(t,q);check([1,2,3].includes(level),'nivell absent '+id+':'+q.type);if(expected[q.type]){check(level===expected[q.type],'nivell incorrecte '+id+':'+q.type);check(q.question&&q.solution.length&&q.options.includes(q.correct),'estructura '+id);samples[q.type]=(samples[q.type]||0)+1;}}
   for(const type of Object.keys(expected))check(samples[type]>=1,'tipus no observat '+id+':'+type);
   const rawNames={mediana:'genMediana',perimetres:'genPerimetresArees2ESO',proporcionalitat3r:'genProporcionalitat3ESO',recomptes3r:'genRecomptes3ESO',volum:'genVolumCapacitat3ESO',precisio:'genMesuraPrecisio3ESO',arees:'genAreesCompostes3ESO',semblanca:'genSemblancaMesures3ESO',tales:'genTalesMesures3ESO',pitagores:'genPitagoresMesures3ESO',piramides:'genPiramidesCons3ESO',errorMesura:'genErrorProblemes3ESO',angles4t:'genAngles4',radians4t:'genRadians4',pitagores4t:'genPitagores4',semblancaRaons4t:'genSemblancaRaons4',trigRaons4t:'genTrigRaons4',resolTriangles4t:'genResolTriangles4',mesuresIndirectes4t:'genMesuresIndirectes4',precisioError4t:'genPrecisioError4'};
   const raw=eval(rawNames[id]),targetSamples={};
   for(const type of Object.keys(expected))for(let i=0;i<30;i++){
    let q;if(raw.length)q=raw(Number(type));else{const saved=rnd;let first=true;try{rnd=(a,b)=>{if(first){first=false;check(a===1&&b>=Number(type),'selector de tipus inesperat');return Number(type);}return saved(a,b);};q=raw();}finally{rnd=saved;}}
    check(String(q.type)===type,'tipus forçat incorrecte');check(miTopicExam.getDifficulty(t,q)===expected[type],'classificació de variant');check(q.options.includes(q.correct)&&q.solution.length&&!/NaN|undefined|Infinity/.test(JSON.stringify(q)),'dades variant');targetSamples[type]=(targetSamples[type]||0)+1;
   }
   const qs=miTopicExam.build(t);check(qs.length===12,'total examen');const counts=[1,2,3].map(l=>qs.filter(q=>miTopicExam.getDifficulty(t,q)===l).length);check(counts.every(n=>n===4),'quotes');
   // Força la selecció de cada tipus abans exclòs: ha de poder entrar a la seva quota real.
   const original=t.gen;const selected=[];
   try{for(const type of Object.keys(expected)){let q;for(let i=0;i<500;i++){const candidate=original();if(String(candidate.type)===type){q=candidate;break;}}check(q,'variant objectiu');
    let first=true;t.gen=()=>{if(first){first=false;return q;}return original();};const built=miTopicExam.build(t);check(built.some(x=>String(x.type)===type),'tipus encara exclòs '+id+':'+type);selected.push(type);
   }}finally{t.gen=original;}
   results.push({id,samples,targetSamples,counts,includedTypes:selected});
  }
  const t=miTopicExam.getTopics().find(t=>t.id===Object.keys(targets)[0]),original=t.gen,known=original();
  let rejected=false;try{miTopicExam.getDifficulty(t,{...known,type:99999});}catch(e){rejected=e.message.includes('dificultat');}check(rejected,'tipus desconegut no rebutjat');
  miTopicExam.start(t.id);check(miTopicExam.getSession()?.questions.length===12,'examen inicial');
  try{t.gen=()=>({...known,type:99999});let blocked=false;try{miTopicExam.build(t);}catch(e){blocked=e.message.includes('No es pot preparar');}check(blocked,'substitució silenciosa');miTopicExam.start(t.id);check(!miTopicExam.getSession(),'sessió antiga retinguda');check(document.getElementById('miTopicExamBody').textContent.includes('No es pot preparar'),'avís absent');}finally{t.gen=original;}
  return {topics:results,unknownTypeBlocked:true};
 },{targets});assert.deepEqual(errors,[]);results.push({course,sense,...data});console.log(course,sense,'cobertura i bloqueig OK');
 if(course==='1eso'){
  const mode=await p.evaluate(()=>{
   const check=(ok,msg)=>{if(!ok)throw Error(msg);},pat=ST_OPEN_PATTERNS.find(p=>p.id==='C9'),oldRnd=rnd,oldShuffle=shuffle;let variants=0;
   function verify(q){const el=document.createElement('div');el.innerHTML=q.question;const values=el.querySelector('b').textContent.match(/\d+/g).map(Number),counts=new Map();values.forEach(v=>counts.set(v,(counts.get(v)||0)+1));const max=Math.max(...counts.values()),modes=[...counts].filter(([,n])=>n===max).map(([v])=>v);check(modes.length===1,'moda ambigua');check(modes[0]===Number(q.answer.val),'resposta incorrecta');check(q.answer.check(q.answer.val),'resposta rebutjada');check(q.answer.check((2*modes[0])+'/2'),'equivalent rebutjada');for(const v of counts.keys())if(v!==modes[0])check(!q.answer.check(String(v)),'distractor acceptat');check(q.solution.join(' ').includes('<b>'+modes[0]+'</b>'),'solució incoherent');check(q.diff===1,'nivell canviat');}
   try{
    const seq=[2,3,3,3];rnd=()=>seq.shift();verify(pat.gen());
    // Totes les combinacions de tres valors secundaris diferents, per a cadascuna de les set modes.
    for(let mode=2;mode<=8;mode++){const others=Array.from({length:9},(_,i)=>i+1).filter(n=>n!==mode);for(let a=0;a<6;a++)for(let b=a+1;b<7;b++)for(let c=b+1;c<8;c++){
     const selected=[others[a],others[b],others[c]];rnd=()=>mode;shuffle=values=>values.length===8?[...selected,...values.filter(v=>!selected.includes(v))]:[...values].reverse();verify(pat.gen());variants++;
    }}
   }finally{rnd=oldRnd;shuffle=oldShuffle;}
   // La plantilla bimodal específica es conserva i continua acceptant les dues modes.
   const bimodal=ST_OPEN_PATTERNS.find(p=>p.id==='C11').gen();check(bimodal.answer.check('2 i 3'),'bimodal perduda');return {regression:true,combinations:variants,bimodalPreserved:true};
  });results.at(-1).mode=mode;console.log('Moda:',mode);
 }
 await p.close();
}fs.writeFileSync('docs/dificultats/resultats-punt1.json',JSON.stringify(results,null,2));}finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
