const fs=require('fs'),path=require('path');
const {playwright,launchOptions}=require('./genera-examens-cerca.cjs');
(async()=>{const browser=await playwright().chromium.launch(launchOptions()),result={};try{const p=await browser.newPage();await p.route(/^https?:/,r=>r.abort());
await p.goto(require('url').pathToFileURL(path.resolve('3eso/sentit-numeric.html')).href);
result.numeric=await p.evaluate(()=>{
 const counts={},check=(ok,key)=>{if(!ok)throw Error(key);const category=key.match(/^(racionals \d+|opció racional única \d+|(?:capacitat|àrea|semblança|Tales|Pitàgores|piràmides i cons|error i context|compra de caixes):\d+)/)?.[0]||key;counts[category]=(counts[category]||0)+1;},el=s=>{const d=document.createElement('div');d.innerHTML=s;return d;};
 // Analitzador aritmètic independent: arrels, fraccions i potències, sense usar els ajudants de càlcul del generador.
 function calc(input){let s=String(input).replace(/[⁻⁰¹²³⁴⁵⁶⁷⁸⁹]+/g,t=>'^('+[...t].map(c=>'⁻⁰¹²³⁴⁵⁶⁷⁸⁹'.indexOf(c)===0?'-':String('⁻⁰¹²³⁴⁵⁶⁷⁸⁹'.indexOf(c)-1)).join('')+')').replace(/−/g,'-').replace(/×|·/g,'*').replace(/÷/g,'/').replace(/,/g,'.').replace(/\s+/g,'');let i=0;
 function atom(){if(s[i]==='('){i++;const v=sum();if(s[i++]!==')')throw Error('Parèntesi '+s);return v;}if(s[i]==='√'||s[i]==='∛'){const r=s[i++];return r==='√'?Math.sqrt(atom()):Math.cbrt(atom());}const m=s.slice(i).match(/^(?:\d+(?:\.\d*)?|\.\d+)/);if(!m)throw Error('Expressió '+s.slice(i));i+=m[0].length;return Number(m[0]);}
 function power(){let v=atom();if(s[i]==='^'){i++;v=Math.pow(v,unary());}return v;}
 function unary(){if(s[i]==='+'){i++;return unary();}if(s[i]==='-'){i++;return -unary();}return power();}
 function product(){let v=unary();while(i<s.length){const c=s[i];if(c==='*'||c==='/'){i++;const r=unary();v=c==='*'?v*r:v/r;}else if(c==='('||c==='√'||c==='∛'){v*=unary();}else break;}return v;}
 function sum(){let v=product();while(s[i]==='+'||s[i]==='-'){const c=s[i++],r=product();v=c==='+'?v+r:v-r;}return v;}const v=sum();if(i!==s.length)throw Error('Sobra expressió '+s.slice(i)+' a '+input+' -> '+s);return v;}
 const near=(a,b)=>Math.abs(a-b)<=1e-8*Math.max(1,Math.abs(b)),math=q=>[...el(q.question).querySelectorAll('.math')].map(n=>{const c=n.cloneNode(true);for(const sup of c.querySelectorAll('sup'))sup.replaceWith('^('+sup.textContent+')');return c.textContent;});
 for(let i=0;i<200;i++){
  for(const type of [1,2,5,6,7,8,9,11]){const q=genRacionals3ESO(type),m=math(q);let expected;if(type===9){const [left,right]=m[0].split('=');expected=calc(right)-calc(left.replace(/^x\s*\+/,''));}else if(type===11)expected=calc(m[0])*(1-calc(m[1]));else expected=calc(m[0]);check(near(calc(q.correct),expected),'racionals '+type+' '+q.question+' -> '+q.correct+' / '+expected);const reduced=o=>{const m=String(o).match(/^(-?\d+)\/(\d+)$/);if(!m)return false;let a=Math.abs(Number(m[1])),b=Number(m[2]);while(b){const r=a%b;a=b;b=r;}return a===1;};check(q.options.filter(o=>near(calc(o),expected)&&(![2,7].includes(type)||reduced(o)||(!q.correct.includes('/')&&/^-?\d+$/.test(String(o))))).length===1,'opció racional única '+type+' '+q.question+' '+JSON.stringify(q.options));}
  for(const type of [2,7]){const q=genRacionals3ESO(type);check(openOk(q.correct,q.alts,q.correct,q),'forma irreductible acceptada '+type);for(const option of q.options)if(String(option)!==q.correct&&near(calc(option),calc(q.correct)))check(!openOk(q.correct,q.alts,option,q),'forma no demanada rebutjada '+type);}
  const q=genRacionals3ESO(10),parts=math(q)[0].match(/^(\d+)(?:\/(\d+))?\s*−\s*(\d+)(?:\/(\d+))?$/),den1=Number(parts[2]||1),den2=Number(parts[4]||1),N=Number(parts[1])*den2-Number(parts[3])*den1,D=den1*den2,matches=q.options.filter(o=>{const m=String(o).match(/^\[(-?\d+); (-?\d+)\)$/);return m&&N>=Number(m[1])*D&&N<Number(m[2])*D;});check(matches.length===1&&matches[0]===q.correct,'interval racional inclou enters');
  for(const type of [1,2,3,4,5,6,7,8,9,10,11,12,13]){const q=genExponentFraccionariB(type),expected=calc(math(q)[0]);check(near(calc(q.correct),expected),'exponent fraccionari '+type);check(q.options.filter(o=>near(calc(o),expected)).length===1,'opció fraccionària única '+type);}
  for(const [topic,gen,type]of [['racionals3r',genRacionals3ESO,8],['racionals3r',genRacionals3ESO,10],['aproximacions3r',genAproximacions3ESO,11],['recomptes3r',genRecomptes3ESO,12]]){const q=gen(type),copy={...q};delete copy.difficultyVariant;check(miTaskDifficulty.getDifficulty(TOPICS.find(t=>t.id===topic),q)===miTaskDifficulty.getDifficulty(TOPICS.find(t=>t.id===topic),copy),'variant antiga '+topic+':'+type);}
 }
 // Cas límit determinista A−A: pertany a [0;1), i el producte del parèntesi és baix.
 const t=TOPICS.find(t=>t.id==='racionals3r');check(miTaskDifficulty.getDifficulty(t,{type:8,correct:'0',question:'Calcula (1/2 − 1/2) × 2/3'})===1,'cancel·lació antiga baixa');
 return counts;
});
await p.goto(require('url').pathToFileURL(path.resolve('3eso/sentit-mesura.html')).href);
result.mesura=await p.evaluate(()=>{
 const counts={},check=(ok,key)=>{if(!ok)throw Error(key);const category=key.match(/^(racionals \d+|opció racional única \d+|(?:capacitat|àrea|semblança|Tales|Pitàgores|piràmides i cons|error i context|compra de caixes):\d+)/)?.[0]||key;counts[category]=(counts[category]||0)+1;},el=s=>{const d=document.createElement('div');d.innerHTML=s;return d;},numbers=q=>[...el(q.question).querySelectorAll('b')].flatMap(b=>[...b.textContent.matchAll(/\d+(?:,\d+)?/g)].map(m=>Number(m[0].replace(',','.')))),number=s=>Number(String(s).match(/-?\d+(?:[.,]\d+)?/)[0].replace(',','.'));
 function forced(gen,type){const old=rnd;let first=true;rnd=(a,b)=>first?(first=false,type):old(a,b);try{return gen();}finally{rnd=old;}}
 function validate(q,expected,label){check(Number.isFinite(expected)&&Math.abs(number(q.correct)-expected)<0.00501,label+' '+q.question+' -> '+q.correct+' / '+expected);check(q.options.filter(o=>Math.abs(number(o)-number(q.correct))<1e-9).length===1,'opció única '+label);}
 const specs=[
  [genVolumCapacitat3ESO,[6,7,8,9],(t,a)=>t===6?a[0]*a[1]*a[2]:t===7?a[0]*a[1]*a[2]*1000:t===8?a[0]*1000-a[1]:a[0]**3,'capacitat'],
  [genAreesCompostes3ESO,[1,2,3,4,5,6,7,8,9,10],(t,a)=>t===1?a[0]*a[1]-a[2]*a[3]:t===2?a[0]*a[1]+a[2]*a[3]/2:t===3?a[0]*a[1]-Math.PI*a[2]**2/2:t===4?a[0]*a[1]+Math.PI*a[2]**2:t===5?a[0]*a[1]-(a[0]-2*a[2])*(a[1]-2*a[2]):t===6?(a[0]+a[1])*a[2]/2+a[3]*a[4]:t===7?a[0]-a[1]:t===8?a[0]+a[1]*a[2]/2:t===9?a[0]*a[1]/100:a[0]*a[1]-a[2]*a[3],'àrea'],
  [genSemblancaMesures3ESO,[1,2,3,4,5,6,7,8,10],(t,a)=>t===1?a[0]*a[1]:t===2?a[1]/a[0]:t===3?a[0]*a[1]:t===4?a[0]*a[1]**2:t===5?a[0]*a[1]**3:t===6?Math.sqrt(a[1]/a[0]):t===7?Math.cbrt(a[1]/a[0]):t===8?a[2]/a[1]**2:(a[0]*a[1])**3,'semblança'],
  [genTalesMesures3ESO,[1,2,3,4,5,6,7,8,10],(t,a)=>t===1||t===6?a[1]*a[2]/a[0]:t===2?a[1]*a[2]/a[0]:t===7?a[1]*a[2]/a[0]:t===8?a[0]/a[1]*a[2]:t===10?a[0]*a[3]/a[1]-a[2]:a[0]*a[2]/a[1],'Tales'],
  [genPitagoresMesures3ESO,[1,2,3,4,5,6,7,8,9,10],(t,a)=>t===2||t===4?Math.sqrt(a[0]**2-a[1]**2):t===7?Math.sqrt(a[0]**2+a[1]**2+a[2]**2):t===8?a[0]*Math.SQRT2:t===9?Math.sqrt(a[1]**2-(a[0]/2)**2):t===10?Math.hypot(a[0],a[1])+a[2]:Math.hypot(a[0],a[1]),'Pitàgores'],
  [genPiramidesCons3ESO,[1,2,3,4,5,6,7,8,9,10],(t,a)=>t===1?a[0]**2*a[1]/3:t===2?a[0]*a[1]*a[2]/3:t===3?2*a[0]*a[1]:t===4?a[0]**2+2*a[0]*a[1]:t===5?Math.hypot(a[0]/2,a[1]):t===6?a[0]**2+2*a[0]*Math.hypot(a[0]/2,a[1]):t===7?3.14*a[0]**2*a[1]/3:t===8?3.14*a[0]*a[1]:t===9?3.14*a[0]*(a[0]+Math.hypot(a[0],a[1])):3*a[1]/(3.14*a[0]**2),'piràmides i cons'],
  [genErrorProblemes3ESO,[2,3,4,7,8,9,10],(t,a)=>t===2?Math.abs(a[0]-a[1]):t===3?Math.abs(a[0]-a[1])/a[0]:t===4?Math.abs(a[0]-a[1])/a[0]*100:t===7?a[0]*a[1]*a[2]*a[3]/100*1000:t===8?(a[0]*a[1]-a[2]*a[3]-a[4]*a[5])/a[6]:t===9?Math.hypot(a[0],a[1])+a[2]:3.14*a[0]**2*a[1]/3*a[2]/100/1000,'error i context'],
  [genProblemesAvancatsD,[2],(t,a)=>Math.ceil((a[0]*a[1]-3.14*a[2]**2)/2)*a[4],'compra de caixes']
 ];
 for(const [gen,types,expected,label]of specs)for(const type of types){let done=0;for(let attempt=0;done<80&&attempt<500;attempt++){const q=forced(gen,type);if(q.type!==type)continue;validate(q,expected(type,numbers(q)),label+':'+type);done++;}check(done===80,'cens oracle '+label+':'+type);}
 for(let i=0;i<100;i++){
  const model=forced(genTalesMesures3ESO,9),a=numbers(model),x=a[1]*a[2]/a[0],evalTerm=s=>{const parts=s.replace(/x/g,String(x)).replace(/·/g,'*').split(/([*/])/);let v=Number(parts[0]);for(let k=1;k<parts.length;k+=2)v=parts[k]==='*'?v*Number(parts[k+1]):v/Number(parts[k+1]);return v;},valid=model.options.filter(o=>{const sides=o.split('=');return Math.abs(evalTerm(sides[0])-evalTerm(sides[1]))<1e-8;});check(valid.length===1&&valid[0]===model.correct,'proporció de Tales única');
  const q=forced(genMesuraPrecisio3ESO,7),whole=number(el(q.question).querySelector('b').textContent),bounds=q.correct.match(/^\[([\d,]+); ([\d,]+)\)/);check(bounds&&number(bounds[1])===whole-.5&&number(bounds[2])===whole+.5,'interval arrodoniment semiobert');
  for(const type of [6,10]){const q=forced(genMesuraPrecisio3ESO,type);check(q.answerCheck(q.correct),'lectura oberta coherent '+type);for(const bad of q.openRejects)check(!q.answerCheck(bad),'lectura incoherent rebutjada '+type);}
 }
 return counts;
});
fs.writeFileSync('docs/dificultats/oracles-parella-3eso-punt3.json',JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(Object.fromEntries(Object.entries(result).map(([block,checks])=>[block,{categories:Object.keys(checks).length,checks:Object.values(checks).reduce((a,b)=>a+b,0)}]))));}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
