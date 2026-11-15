const assert=require('node:assert/strict');
const path=require('node:path');
const {chromium}=require('C:/Users/srigu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.MI_BROWSER_PATH||'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 try{
  const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('file:///'+path.resolve('2eso/sentit-numeric.html').replaceAll(String.fromCharCode(92),'/')+'?topic=potencies');
  const result=await page.evaluate(()=>{
   const check=(x,m)=>{if(!x)throw Error(m)},plain=x=>{const e=document.createElement('div');e.innerHTML=String(x);return e.textContent.replace(/[⁻⁺⁰¹²³⁴⁵⁶⁷⁸⁹]+/g,s=>'^'+[...s].map(c=>c==='⁻'?'-':c==='⁺'?'+':'⁰¹²³⁴⁵⁶⁷⁸⁹'.indexOf(c)).join('')).replace(/[−–]/g,'-').replace(/\s+/g,' ').trim()},families=new Set(),counts=[0,0,0],coverage={};
   const exp=(q)=>{const t=plain(q.question),m=t.match(/(?:\(|^)(-?\d+)(?:\))(?:\^)(-?\d+)/)||t.match(/(-?\d+)\^(-?\d+)/);check(m,'expressió de potència parsejable '+q.type+' '+t);return {base:Number(m[1]),e:Number(m[2])}};
   for(let type=1;type<=17;type++)for(let i=0;i<250;i++){
    const q=genPotencies2ESO(type),info=MIDifficulty.potencies2ESOInfo(q),text=plain(q.question),correct=plain(q.correct);check(info&&info.level===miTaskDifficulty.getDifficulty(TOPICS.find(t=>t.id==='potencies'),q),'família i classificador T'+type);check(q.options.length===4&&q.options.filter(x=>plain(x)===correct).length===1&&new Set(q.options.map(plain)).size===4,'opcions úniques T'+type);check(q.solution.length>=2&&!/undefined|NaN|Infinity/.test(JSON.stringify(q)),'solució vàlida T'+type);families.add(info.id);coverage[type]=(coverage[type]||0)+1;counts[info.level-1]++;
    if(type===1){const factors=(text.match(/\d+/g)||[]).map(Number),expected=Number(correct.replace(/\^.*$/,''));check(new Set(factors).size===1&&factors.length>=3&&expected===factors[0],'producte repetit T1 '+JSON.stringify({text,correct,factors,expected}))}
    if(type===2){const {base,e}=exp(q),factors=correct.match(/-?\d+/g).map(Number);check(factors.length===e&&factors.every(n=>n===base),'desenvolupar potència T2')}
    if(type===3){const m=correct.match(/Base = (-?\d+); exponent = (\d+)/);check(m&&text.includes(String(m[1]))&&text.includes(String(m[2])),'base i exponent T3')}
    if([4,7,8,9,10].includes(type)){if(type===8)check(correct==='1','exponent zero T8');else if(type===7||type===10){const b=text.match(/\((-?\d+)\/(\d+)\)\^(-?\d+)/);check(b,'base racional T'+type);const val=(Number(b[1])/Number(b[2]))**Number(b[3]),answer=correct.split('/').reduce((a,n,i)=>i===0?Number(n):a/Number(n),0);check(Math.abs(answer-val)<1e-10,'potència racional T'+type)}else{const {base,e}=exp(q),answer=correct.split('/').reduce((a,n,i)=>i===0?Number(n):a/Number(n),0);check(Math.abs(answer-base**e)<1e-10,'potència entera T'+type)}}
    if(type===5){const {e}=exp(q);check(correct===(e%2===0?'Positiu':'Negatiu'),'signe segons paritat T5')}
    if(type===6){const m=[...text.matchAll(/\(?(-?\d+)\)?\^2/g)];check(m.length===2,'signes amb parèntesis T6');const a=Number(m[0][1]),b=Number(m[1][1]);check(correct.includes(String(a*a))&&correct.includes(String(-(Math.abs(b)**2))),'precedència del signe T6')}
    if(type===13){const m=text.match(/\((\d+)\^(\d+)\)\^(\d+)/);check(m&&correct===`${m[1]}^${Number(m[2])*Number(m[3])}`,'potència d’una potència T13')}
    if([11,12].includes(type)){const powers=[...text.matchAll(/(\d+)\^(\d+)/g)].map(m=>[Number(m[1]),Number(m[2])]);check(powers.length>=2,'potències amb base i exponent T'+type);const [base,m]=powers[0],n=powers[1][1],e=type===11?m+n:m-n;check(correct===`${base}^${e}`,'llei d’exponents T'+type)}
    if(type===14){check(correct.includes(' · ')&&correct.split(' · ').length===2,'potència d’un producte T14')}
    if(type===15){const x=Number(correct),nums=(text.match(/\d+/g)||[]).map(Number);check(nums.length>=4&&nums[1]+x===nums.at(-1),'exponent desconegut T15 '+JSON.stringify({text,correct,nums}))}
    if(type===16){const m=correct.match(/(\d+)\^(\d+) \+ (\d+)\^(\d+) = (\d+)\^(\d+)/);check(m&&m[1]===m[3]&&m[1]===m[5]&&Number(m[2])+Number(m[4])===Number(m[6])&&Number(m[1])**Number(m[2])+Number(m[3])**Number(m[4])!==Number(m[5])**Number(m[6]),'igualtat falsa T16 '+correct)}
    if(type===17){const nums=(text.match(/\d+/g)||[]).map(Number);check(nums.length>=4&&Number(correct)===nums[0]**nums[1]-nums[2]*nums[3],'jerarquia T17 '+JSON.stringify({text,nums,correct}))}
   }
   for(const variant of ['square','cube','growth'])for(let i=0;i<250;i++){
    const q=genPotencies2ESO(18,variant),info=MIDifficulty.potencies2ESOInfo(q),t=plain(q.question),correct=Number(q.correct);check(info&&q.variantId===variant&&info.level===miTaskDifficulty.getDifficulty(TOPICS.find(x=>x.id==='potencies'),q),'família T18/'+variant);families.add(info.id);counts[info.level-1]++;coverage['18/'+variant]=(coverage['18/'+variant]||0)+1;
    const n=(t.match(/\d+/g)||[]).map(Number),expected=variant==='square'?n[0]**2:variant==='cube'?n[0]**3:n[0]*2**n[1];check(correct===expected,'oracle contextual T18/'+variant+' '+JSON.stringify({t,n,correct,expected}));
   }
   check(families.size===14,'14 famílies, variants no duplicades');check(JSON.stringify(MIDifficulty.potencies2ESOFamilies.reduce((a,f)=>(a[f.level-1]++,a),[0,0,0]))==='[8,6,0]','Distribució N1/N2/N3 8/6/0');
   return {samples:Object.values(coverage).reduce((a,b)=>a+b,0),coverage,families:families.size,levels:MIDifficulty.potencies2ESOFamilies.reduce((a,f)=>(a[f.level-1]++,a),[0,0,0])};
  });assert.equal(result.samples,5000);assert.equal(result.families,14);assert.deepEqual(result.levels,[8,6,0]);assert.deepEqual(errors,[]);console.log(JSON.stringify(result,null,2));
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});


