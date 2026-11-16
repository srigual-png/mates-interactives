const assert=require('node:assert/strict');
const path=require('node:path');
const {chromium}=require('C:/Users/srigu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

const CASES={aproximacions:15,proporcionalitat:18,percentatges:18,recomptes:15};
function number(s){s=String(s).replace(/\s/g,'');if(s.includes(','))return Number(s.replace(/\./g,'').replace(',','.'));if(/^\d{1,3}(?:\.\d{3})+$/.test(s))return Number(s.replace(/\./g,''));return Number(s);}
function plain(s){return String(s).replace(/<[^>]*>/g,' ').replace(/&nbsp;/g,' ').replace(/&middot;/g,'·').replace(/&minus;/g,'−').replace(/\s+/g,' ').trim();}
function close(actual,expected,label){assert(Number.isFinite(actual)&&Math.abs(actual-expected)<1e-7,`${label}: ${actual} !== ${expected}`);}
function numericAnswer(text){const m=String(text).match(/-?\d[\d. ]*(?:,\d+)?/);return m?number(m[0]):NaN;}
function oracle(topic,type,q){
 const text=plain(q.question),a=numericAnswer(q.correct),nums=(text.match(/-?\d[\d. ]*(?:,\d+)?/g)||[]).map(number).filter(Number.isFinite);
 if(topic==='aproximacions'){
  const precision=()=>{if(/mil·lèsim/.test(text))return 3;if(/centèsim/.test(text))return 2;if(/dècim/.test(text))return 1;if(/centen/.test(text))return -2;if(/desen/.test(text))return -1;return 0;};
  if(type===1){const d=precision(),scale=10**d;close(a,Math.floor(nums[0]*scale+0.5+1e-8)/scale,'arrodoniment');}
  if(type===2){const d=precision(),scale=10**d;close(a,Math.floor(nums[0]*scale+1e-8)/scale,'defecte');}
  if(type===3){const d=precision(),scale=10**d;close(a,Math.ceil(nums[0]*scale-1e-8)/scale,'excés');}
  if(type===4)assert(['Per defecte','Per excés','Arrodoniment'].includes(q.correct),'nom del procediment');
  if(type===5)assert(/quilòmetre|cèntim d’euro|centímetre|miler d’habitants/.test(q.correct),'precisió adequada al context');
  if(type===6)close(a,Math.abs(nums[0]-nums[1]),'error absolut');
  if(type===7){const expected=Math.abs(nums[1]-nums[0])<Math.abs(nums[2]-nums[0])?nums[1]:nums[2];close(a,expected,'comparació d’errors absoluts');}
  if(type===8){const expected=Math.abs(nums[0]-nums[1])/Math.abs(nums[0])*100;close(numericAnswer(q.correct),expected,'error relatiu percentual');}
  if(type===9)assert(q.correct==='La mesura de 200','precisió relativa');
  if(type===10){const d=precision(),step=10**-d,center=nums[0],value=numericAnswer(q.correct);assert(value>=center-step/2-1e-8&&value<center+step/2-1e-8,'interval de valors que arrodoneixen al centre');}
  if(type===11){const factor=plain(text).match(/([\d,.]+)\s*·\s*([\d,.]+)/);assert(factor,'factors visibles');const expected=Math.round(Math.round(number(factor[1]))*Math.round(number(factor[2]))/10)*10;close(a,expected,'estimació de producte');}
  if(type===12)assert(q.correct==='No és raonable','validació d’ordre de magnitud');
  if(type===13){const m=text.match(/població real de ([\d.]+) habitants.*?aproximadament ([\d.]+)/);assert(m);close(a,Math.abs(number(m[1])-number(m[2])),'error de població');}
  if(type===14)assert(q.correct==='L’error absolut és −0,5','error absolut no negatiu');
  if(type===15){const m=q.correct.match(/Entre ([\d,.]+) i ([\d,.]+)/);assert(m,'interval amb límits');const center=nums[0],low=number(m[1]),high=number(m[2]);close(low,center-0.05,'límit inferior');close(high,center+0.05,'límit superior obert');}
 }
 if(topic==='proporcionalitat'){
  if(type===1)assert(q.correct==='Sí, són directament proporcionals','reconeixement de relació directa');
  if(type===2)assert(q.correct==='No és proporcionalitat directa','relació no proporcional');
  if(type===3){const m=text.match(/(\d+) unitats → ([\d,.]+) €.*?(\d+) unitats/s);assert(m,'taula proporcional parsejable');close(a,number(m[2])/Number(m[1])*Number(m[3]),'taula proporcional');}
  if(type===4){const m=text.match(/(\d+) quaderns costen ([\d,.]+) €/);assert(m);close(a,number(m[2])/Number(m[1]),'preu unitari');}
  if(type===5){const m=text.match(/passa de (\d+) a (\d+)/);assert(m);close(a,Number(m[2])/Number(m[1]),'factor');}
  if(type===6){const m=text.match(/(\d+) kg .*?cost(?:en|a) ([\d,.]+) €/);assert(m);close(numericAnswer(q.correct),number(m[2])/Number(m[1]),'constant €/kg');}
  if(type===7){const m=text.match(/(\d+)\/(\d+) = (\d+)\/□/);assert(m);close(a,Number(m[2])*Number(m[3])/Number(m[1]),'raons equivalents');}
  if(type===8){const m=text.match(/(\d+) kg costen ([\d,.]+) €.*?(\d+) kg/);assert(m);close(a,number(m[2])/Number(m[1])*Number(m[3]),'escalatge de preu');}
  if(type===9)assert(q.correct&&q.options.includes(q.correct),'elecció d’estratègia');
  if(type===10){const m=[...text.matchAll(/Oferta [AB]: (\d+) unitats per ([\d,.]+) €/g)];assert.equal(m.length,2);const cheapest=number(m[0][2])/Number(m[0][1])<number(m[1][2])/Number(m[1][1])?'Oferta A':'Oferta B';assert.equal(q.correct,cheapest,'comparació de preu unitari');}
  if(type===11){const m=text.match(/Reparteix (\d+) € en la raó (\d+):(\d+)/);assert(m);const [total,x,y]=m.slice(1).map(Number),part=total/(x+y),expected=`${part*x} i ${part*y}`;assert.equal(q.correct,expected,'repartiment en dues parts');}
  if(type===12){const m=text.match(/Reparteix (\d+) € proporcionalment en la raó ([\d:]+)/);assert(m);const total=Number(m[1]),ratios=m[2].split(':').map(Number),u=total/ratios.reduce((x,y)=>x+y,0),expected=ratios.map(x=>String(u*x)).join(', ');assert.equal(q.correct,expected,'repartiment en tres parts');}
  if(type===13)assert(q.correct&&q.correct.includes('/'),'taxa unitària amb unitats');
  if(type===14){const m=text.match(/Cada entrada costa ([\d,.]+) €\s*\. Amb (\d+) €/);assert(m,text);close(a,Math.floor(Number(m[2])/number(m[1])),'compra amb pressupost');}
  if(type===15){const m=q.correct.match(/Si (\d+) quaderns costen ([\d,.]+) €, (\d+) quaderns costen ([\d,.]+) €/);assert(m);const proportional=number(m[2])/Number(m[1])*Number(m[3]);assert(Math.abs(proportional-number(m[4]))>1e-7,'l’afirmació additiva no conserva el preu unitari');}
  if(type===16){const m=text.match(/per a (\d+) persones.*?necessita (\d+) g.*?per a (\d+) persones/);assert(m);close(a,Number(m[2])/Number(m[1])*Number(m[3]),'escalatge de recepta');}
  if(type===17)assert(q.correct&&/\d/.test(q.correct),'fila incompatible identificada');
  if(type===18){const m=text.match(/costa ([\d,.]+) €/);assert(m);assert(q.correct.includes(fmtIndependent(number(m[1]))),'model P=k·q');}
 }
 if(topic==='percentatges'){
  if(type===1)assert(q.correct===`${nums[0]} de cada 100`,'significat percentual');
  if(type===2)assert(q.correct.includes(`${nums[0]}%`)&&q.correct.includes('='),'representacions equivalents');
  if([3,16,17].includes(type)){const m=text.match(/(\d+(?:,\d+)?)% de ([\d,.]+)/);assert(m);close(numericAnswer(q.correct),number(m[1])*number(m[2])/100,'part percentual');}
  if(type===4){const m=text.match(/De (\d+) alumnes, (\d+)/);assert(m);close(numericAnswer(q.correct),Number(m[2])/Number(m[1])*100,'percentatge que representa una part');}
  if(type===5){const m=text.match(/El (\d+)% d’una quantitat són (\d+)/);assert(m);close(a,Number(m[2])*100/Number(m[1]),'reconstrucció del total');}
  if([6,7].includes(type)){const m=text.match(/quantitat de (\d+) (augmenta|disminueix) un (\d+)%/);assert(m);const change=Number(m[1])*Number(m[3])/100,expected=Number(m[1])+(type===6?change:-change);close(a,expected,'canvi percentual');}
  if(type===8){const m=text.match(/article costa (\d+) € i té un descompte del (\d+)%/);assert(m);close(a,Number(m[1])*Number(m[2])/100,'import del descompte');}
  if([9,10].includes(type)){const m=text.match(/descompte del (\d+)%.*?costa ([\d,.]+) €|augment del (\d+)%.*?ser ([\d,.]+)/);assert(m);const p=Number(m[1]||m[3]),final=number(m[2]||m[4]),expected=final*100/(type===9?100-p:100+p);close(a,expected,'reconstrucció del valor inicial');}
  if([11,12].includes(type)){const m=text.match(/passa de (\d+) a (\d+)/);assert(m);const before=Number(m[1]),after=Number(m[2]),expected=Math.abs(after-before)/before*100;close(numericAnswer(q.correct),expected,'taxa de variació');}
  if(type===13){const m=text.match(/descompte del (\d+)% i després un altre del (\d+)%/);assert(m);const expected=(1-(1-Number(m[1])/100)*(1-Number(m[2])/100))*100;close(numericAnswer(q.correct),expected,'descomptes successius');}
  if(type===14)assert(q.correct==='No, queda per sota del valor inicial','disminució i augment successius');
  if(type===15)assert(['Oferta A','Oferta B'].includes(q.correct),'comparació de descomptes');
  if(type===18)assert(Number.isInteger(a)&&a>=0,'percentatge compost i nombre de persones');
 }
 if(topic==='recomptes'){
  if([1,2,3].includes(type)){
   const pattern=type===1?/(\d+) samarretes.*?(\d+) pantalons/:type===2?/(\d+) primers.*?(\d+) segons/ : /(\d+) branques.*?(\d+) branques/;
   const m=text.match(pattern);assert(m,'opcions de dues decisions');const cases=Array.from({length:Number(m[1])},(_,x)=>Array.from({length:Number(m[2])},(_,y)=>[x,y])).flat();close(a,cases.length,'enumeració exhaustiva del principi multiplicatiu');
  }
  if(type===4){const m=text.match(/amb (\d+)\s*,\s*(\d+) i (\d+) opcions/);assert(m,text);const cases=Array.from({length:Number(m[1])},(_,x)=>Array.from({length:Number(m[2])},(_,y)=>Array.from({length:Number(m[3])},(_,z)=>[x,y,z])).flat()).flat();close(a,cases.length,'enumeració exhaustiva de tres decisions');}
  if(type===5){const present=[...text.matchAll(/\b([ABC][ABC])\b/g)].map(m=>m[1]),all=['AB','AC','BA','BC','CA','CB'];assert.equal(present.length,new Set(present).size,'llista sense repetits');assert.deepEqual([...all].filter(x=>!present.includes(x)),[q.correct],'possibilitat que falta');}
  if(type===6)assert(q.correct==='S’ha repetit un cas','cas duplicat');
  if(type===7){const m=text.match(/grup de (\d+) persones/);assert(m);const pairs=Array.from({length:Number(m[1])},(_,i)=>Array.from({length:Number(m[1])},(_,j)=>i<j?[i,j]:null).filter(Boolean)).flat();close(a,pairs.length,'enumeració exhaustiva de parelles no ordenades');}
  if(type===8){const m=text.match(/Amb (\d+) xifres diferents/);assert(m);const symbols=Array.from({length:Number(m[1])},(_,i)=>i),codes=symbols.flatMap(x=>symbols.filter(y=>y!==x).map(y=>[x,y]));close(a,codes.length,'enumeració exhaustiva de codis sense repetició');}
  if(type===9){const m=text.match(/Amb (\d+) símbols/);assert(m);const symbols=Array.from({length:Number(m[1])},(_,i)=>i),codes=symbols.flatMap(x=>symbols.map(y=>[x,y]));close(a,codes.length,'enumeració exhaustiva de codis amb repetició');}
  if(type===10){const m=text.match(/Hi ha (\d+) samarretes i (\d+) pantalons.*?una combinació concreta està prohibida/);assert(m,'restricció amb dues opcions parsejable');const pairs=Array.from({length:Number(m[1])},(_,i)=>i).flatMap(x=>Array.from({length:Number(m[2])},(_,y)=>[x,y]));pairs.pop();close(a,pairs.length,'enumeració exhaustiva amb una combinació prohibida');}
  if(type===11){const m=text.match(/(\d+) combinacions.*?té (\d+) opcions/);assert(m);close(a,Number(m[1])/Number(m[2]),'factor desconegut');}
  if(type===12)assert(q.correct==='Diagrama d’arbre','representació de decisions');
  if(type===13){const m=text.match(/torneig amb (\d+) equips/);assert(m);const games=Array.from({length:Number(m[1])},(_,i)=>Array.from({length:Number(m[1])},(_,j)=>i<j?[i,j]:null).filter(Boolean)).flat();close(a,games.length,'enumeració exhaustiva de partits sense tornada');}
  if(type===14){const m=text.match(/majors que (\d+)/);assert(m);const threshold=Number(m[1]),expected=[2,4,6,8].flatMap(x=>[2,4,6,8].filter(y=>y!==x&&10*x+y>threshold)).length;close(a,expected,'enumeració de nombres admissibles');}
  if(type===15)assert(q.correct==='Sumar les opcions en lloc de combinar-les','principi additiu en tria successiva');
 }
}
function fmtIndependent(n){return Number.isInteger(n)?String(n):String(n).replace('.',',');}

async function run(topicId){
 assert(CASES[topicId],`tema desconegut ${topicId}`);
 const browser=await chromium.launch({executablePath:process.env.MI_BROWSER_PATH||'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 try{
  const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.addInitScript(()=>{let seed=0x2e50;Math.random=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};});
  await page.goto('file:///'+path.resolve('2eso/sentit-numeric.html').replaceAll(String.fromCharCode(92),'/'));
  const result=await page.evaluate(async({topicId,total})=>{
   const check=(x,m)=>{if(!x)throw Error(m)},topic=TOPICS.find(t=>t.id===topicId),specs=MIDifficulty.numeric2ESOFamilies[topicId],counts={types:{},families:{},levels:[0,0,0]},expected=new Map(),probes=[];
   for(const f of specs)for(const type of f.types){check(!expected.has(type),'tipus assignat dues vegades '+type);expected.set(type,f);}
   check(expected.size===total,'cobertura exacta de tipus '+expected.size+'/'+total);
   const generator={aproximacions:genAproximacions2ESO,proporcionalitat:genProporcionalitat2ESO,percentatges:genPercentatges2ESO,recomptes:genRecomptes2ESO}[topicId];
   const boundary=[];
   if(topicId==='aproximacions'){
    const saved=Math.random,seq=[0.01,4999/89999];let i=0;Math.random=()=>seq[i++]??0.5;
    const half=genAproximacions2ESO(1);Math.random=saved;
    check(Number(String(half.correct).replace(',','.'))===2,'arrodoniment positiu exacte al mig cap amunt');boundary.push('arrodoniment 1,5000 a unitats = 2');
    check(roundTo(1.25,1)===1.3&&floorTo(1.25,1)===1.2&&ceilTo(1.25,1)===1.3,'llindar i valors per defecte/excés');boundary.push('defecte/excés a 1,25 verificats');
   }
   for(let type=1;type<=total;type++)for(let i=0;i<250;i++){
    const raw=generator(type),q=miTaskDifficulty.annotate(topic,raw),family=expected.get(type),key=String(q.correct);
    check(q.familyId===family.id&&q.familyName===family.name,'família estable '+type+' '+q.familyId);
    check(q.taskDifficulty===family.level&&q.diff===family.level&&miTaskDifficulty.getDifficulty(topic,raw)===family.level,'nivell compartit '+type);
    check(q.question&&q.correct!==undefined&&q.options?.length>=2&&q.solution?.length,'enunciat i solució '+type);
    check(!/undefined|NaN|Infinity/.test(JSON.stringify(q)),'cap valor no finit '+type);
    check(new Set(q.options.map(x=>String(x).trim())).size===q.options.length,'distractors diferents '+type);
    if(q.allowOpen===false)check(q.options.filter(x=>String(x)===key).length===1,'una opció correcta '+type);
    else check(rationalOpenOk(q,q.correct),'corrector obert '+type);
    check(Array.isArray(q.solution)&&q.solution.length>0,'solució explicada '+type);
    probes.push({type,question:q.question,correct:q.correct,options:q.options,allowOpen:q.allowOpen});
    counts.types[type]=(counts.types[type]||0)+1;counts.families[family.id]=(counts.families[family.id]||0)+1;counts.levels[family.level-1]++;
   }
   const worksheet=MIWorksheetConfig.topics.find(t=>t.id===topicId);check(worksheet&&worksheet.levels.join(',')===[...new Set(specs.map(f=>f.level))].sort().join(','),'nivells disponibles a fitxes');
   check(worksheet.families.length===specs.length,'catàleg de fitxes per famílies');
   for(const family of specs){const q=await MIWorksheetConfig.topics.find(t=>t.id===topicId).generateFamily(family.id);check(q.familyId===family.id&&q.level===family.level,'família accessible a fitxes '+family.id+' '+JSON.stringify(q));}
   numericFamilyRotation[topicId]={bag:[],last:null};
   const rotated=Array.from({length:specs.length*2},()=>topic.gen());
   check(rotated.every((q,i)=>!i||q.familyId!==rotated[i-1].familyId),'rotació sense famílies consecutives');
   const cycle=new Set(rotated.slice(0,specs.length).map(q=>q.familyId));check(cycle.size===specs.length,'totes les famílies durant la rotació');
   return {samples:total*250,types:Object.keys(counts.types).length,families:specs.length,familyIds:specs.map(f=>f.id),levels:counts.levels,rotation:rotated.map(q=>q.familyId),boundary,probes};
  },{topicId,total:CASES[topicId]});
  for(const q of result.probes)oracle(topicId,q.type,q);
  delete result.probes;
  assert.deepEqual(errors,[],'errors JavaScript');
  console.log(JSON.stringify({topicId,browser:await browser.version(),...result,independentOracles:CASES[topicId]*250,pageErrors:errors},null,2));
 }finally{await browser.close();}
}
module.exports={run};
