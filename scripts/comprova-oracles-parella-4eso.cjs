const fs=require('fs'),path=require('path'),{pathToFileURL}=require('url'),{playwright,launchOptions}=require('./genera-examens-cerca.cjs');
(async()=>{const browser=await playwright().chromium.launch(launchOptions()),file='docs/dificultats/oracles-parella-4eso-punt3.json',result=process.argv[2]&&fs.existsSync(file)?JSON.parse(fs.readFileSync(file)):{};try{for(const sense of (process.argv[2]?process.argv.slice(2):['numeric','mesura'])){const p=await browser.newPage();await p.route(/^https?:/,r=>r.abort());await p.goto(pathToFileURL(path.resolve(`4eso/sentit-${sense}.html`)).href+'?opcio=B');result[sense]=await p.evaluate(sense=>{
 const counts={},failures=[],check=(v,key,q)=>{counts[key]=(counts[key]||0)+1;if(!v&&failures.length<60&&!failures.some(f=>f.key===key&&f.topic===q.topicId&&f.type===q.type))failures.push({key,topic:q.topicId,type:q.type,question:q.question,correct:q.correct,options:q.options});},dom=s=>{const d=document.createElement('div');d.innerHTML=String(s);return d;},plain=s=>{const d=dom(String(s).replace(/<sup>(.*?)<\/sup>/g,'^($1)'));d.querySelectorAll('svg').forEach(e=>e.remove());return d.textContent.replace(/−/g,'-');},nums=s=>(String(s).match(/-?\d+(?:[.,]\d+)?/g)||[]).map(n=>Number(n.replace(',','.')));
 // Analitzador independent: arrels d’índex 2..5, potències, factorials i aritmètica.
 function calc(input,a=2){let s;
 // Els índexs d’arrel són superscrits abans del signe, i no exponents de la base.
 s=plain(input).replace(/cm|mm|rad|m|€|°|%/g,'').replace(/³√/g,'R3').replace(/⁴√/g,'R4').replace(/⁵√/g,'R5').replace(/√/g,'R2').replace(/²/g,'^2').replace(/³/g,'^3').replace(/·|×/g,'*').replace(/÷/g,'/').replace(/\s/g,'').replace(/,/g,'.');let i=0;
 function atom(){if(s[i]==='('){i++;const v=sum();if(s[i++]!==')')throw Error('paren');return v;}if(s[i]==='R'){i++;const n=Number(s[i++]),v=atom();return v<0&&n%2?-Math.pow(-v,1/n):Math.pow(v,1/n);}if(s[i]==='π'){i++;return Math.PI;}if(s[i]==='a'){i++;return a;}const m=s.slice(i).match(/^(?:\d+(?:\.\d*)?|\.\d+)/);if(!m)throw Error('atom '+s.slice(i));i+=m[0].length;return Number(m[0]);}
 function pow(){let v=atom();if(s[i]==='!'){i++;let f=1;for(let j=2;j<=v;j++)f*=j;v=f;}if(s[i]==='^'){i++;v=v**unary();}return v;}
 function unary(){if(s[i]==='-'){i++;return -unary();}if(s[i]==='+'){i++;return unary();}return pow();}
 function prod(){let v=unary();while(i<s.length){const op=s[i];if(op==='*'||op==='/'){i++;const r=unary();v=op==='*'?v*r:v/r;}else if(/[Rπa(]/.test(op))v*=unary();else break;}return v;}
 function sum(){let v=prod();while(s[i]==='+'||s[i]==='-'){const op=s[i++],r=prod();v=op==='+'?v+r:v-r;}return v;}const v=sum();if(i!==s.length||!Number.isFinite(v))throw Error('tail '+s);return v;}
 const rad=d=>d*Math.PI/180,sin=d=>Math.sin(rad(d)),cos=d=>Math.cos(rad(d)),tan=d=>Math.tan(rad(d)),atan=x=>Math.atan(x)*180/Math.PI,acos=x=>Math.acos(x)*180/Math.PI,near=(a,b,t=1e-9)=>Math.abs(a-b)<=t,round=(v,d)=>Math.round((v+1e-10)*10**d)/10**d;
 function value(q,v,d=2,key='valor'){check(near(calc(q.correct),v,.501*10**-d),key+' '+q.topicId+':'+q.type,q);const target=calc(q.correct);check(q.options.filter(o=>{try{return near(calc(o),target);}catch{return false;}}).length===1,'opció numèrica única '+q.topicId+':'+q.type,q);}
 const choose=(n,k)=>{let r=1;for(let i=1;i<=k;i++)r=r*(n-i+1)/i;return Math.round(r);};
 const numeric=['genReals4ESO','genIrracionals4ESO','genIntervals4ESO','genErrors4ESO','genOperacions4ESO','genComptatge4ESO','genPascal4ESO','genFinancera4ESO','genRadicalsAmpA','genRadicalsAmpB','genCombinatoriaAmpC','genLogaritmesAmpD'],measure=['genAngles4','genRadians4','genPitagores4','genSemblancaRaons4','genTrigRaons4','genResolTriangles4','genMesuresIndirectes4','genPrecisioError4','genAnglesNotablesAmpA','genIdentitatsAmpB','genCircumferenciaAmpC','genModelitzacioAmpD'];
 for(let ti=0;ti<TOPICS.length;ti++){const t=TOPICS[ti],gen=window[(sense==='numeric'?numeric:measure)[ti]],max=sense==='numeric'?10:11;for(let type=1;type<=max;type++)for(let sample=0;sample<100;sample++){
 const q=gen(type),text=plain(q.question),n=nums(text),bold=[...dom(q.question).querySelectorAll('b')].map(e=>plain(e.innerHTML)),math=[...dom(q.question).querySelectorAll('.math')].map(e=>plain(e.innerHTML));check(q.options.length===4,'quatre opcions',q);
 if(sense==='numeric'){
 if(t.id==='reals4t'&&type===8){const v=calc(math[0]);check(v!==0,'convenció del zero evitada',q);}
 if(t.id==='irracionals4t'&&type===2)value(q,Math.sqrt(n[0]),1);
 if(t.id==='errors4t'&&[1,2,3].includes(type)){const d=text.includes('dècimes')?1:text.includes('mil·lèsimes')?3:2,x=n[0],v=type===1?round(x,d):type===2?Math.trunc(x*10**d)/10**d:text.includes('excés')?Math.ceil(x*10**d-1e-9)/10**d:Math.floor(x*10**d+1e-9)/10**d;value(q,v,d);}
 if(t.id==='errors4t'&&type===5)value(q,Math.abs(n[0]-n[1]),3);
 if(t.id==='errors4t'&&[6,7].includes(type))value(q,Math.abs(n[1]-n[0])/n[0]*(type===7?100:1),type===7?3:4);
 if(t.id==='operacions4t'){
 if([1,3,8].includes(type))value(q,calc(math.at(-1)),2);
 if(type===4)value(q,Math.round(n[0])*round(n[1],1),1);
 if(type===6)value(q,n[0]*(1+n[1]/100)**n[2],2);
 }
 if(t.id==='comptatge4t'&&type!==4){let v;if(type===1)v=n[0]*n[1];if(type===2)v=n[1]**n[0];if(type===3){v=1;for(let j=0;j<n[0];j++)v*=n[1]-j;}if(type===5)v=n[0]*n[1]*n[2];if(type===6)v=n[0]*(n[0]-1);if(type===7)v=n[0]+n[1];if(type===8)v=n[1]*n[3]*n[5];if(type===9)v=n[0]/n[1];if(type===10)v=(n[0]-n[1])*(n[0]-1);value(q,v,0);}
 if(t.id==='pascal4t'&&[2,3,4,5,6,7,9,10].includes(type)){const v=type===2||type===9?n[0]+n[1]:type===3?2**n[0]:[4,10].includes(type)?choose(n[0],n[1]):type===5?n[1]:type===6?1:choose(n[0],2);value(q,v,0);if(type===4)check(miTaskDifficulty.getDifficulty(t,q)===(n[1]===1||n[1]===n[0]-1?1:2),'variant selecció única',q);}
 if(t.id==='financera4t'&&type!==9){let v;if(type===1)v=n[0]*(1+n[1]/100);if(type===2)v=n[0]*(1-n[1]/100);if(type===3)v=100*(1-(1-n[0]/100)*(1-n[1]/100));if(type===4)v=n[1]/(1-n[0]/100);if(type===5)v=n[0]*(1-n[1]/100)*(1+n[2]/100);if(type===6)v=n[0]*n[1]/100*n[2];if(type===7)v=n[0]*(1+n[1]/100*n[2]);if(type===8)v=n[1]*n[0]/100;if(type===10)v=n[0]*(1+n[1]/100)**n[2];value(q,v,2);}
 if(t.id==='radicalsAmpA'&&[1,2,3,4,7].includes(type)){
 const expr=type===1?math[0]:type===2?math[0]:type===3||type===4?math[0]:math[1];const want=[2,3,7].map(a=>calc(expr,a));check([2,3,7].every((a,i)=>near(calc(q.correct,a),want[i])),'exponent fraccionari',q);check(q.options.filter(o=>{try{return [2,3,7].every((a,i)=>near(calc(o,a),want[i]));}catch{return false;}}).length===1,'radical equivalent únic',q);
 }
 if(t.id==='radicalsAmpB'){
 const expr=math[0],v=calc(expr);check(near(calc(q.correct),v),'operació radical '+type,q);const simplified=o=>{if(![1,2].includes(type))return true;const m=String(o).match(/^(\d*)√(\d+)$/);if(!m)return false;const r=Number(m[2]);for(let d=2;d*d<=r;d++)if(r%(d*d)===0)return false;return true;};check(q.options.filter(o=>{try{return near(calc(o),v)&&simplified(o);}catch{return false;}}).length===1,'forma radical única '+type,q);
 }
 if(t.id==='combinatoriaAmpC'&&[1,2,3,6,7,9,10].includes(type)){const v=type===1?calc(math[0]):[2,6,7].includes(type)?(()=>{const m=text.match(/C\((\d+),(\d+)\)/);return choose(Number(m[1]),Number(m[2]));})():type===9?choose(n[0],2):choose(n[0],n[1]);value(q,v,0);}
 if(t.id==='logaritmesAmpD'&&[1,2,3,6,7,10].includes(type)){const d=dom(q.question),base=Number(d.querySelector('sub').textContent),arg=text.match(/\(([^)]+)\)/)?.[1];value(q,type===6?base**Number(text.split('=').at(-1)):Math.log(calc(arg))/Math.log(base),type===10?2:5);}
 }
 if(sense==='mesura'){
 if(t.id==='angles4t'){
 if(type===2)value(q,n[0]+n[1]/60+n[2]/3600,4);
 if([3,4,5].includes(type)){const v=type===3?Math.round(n[0]*3600):type===4?(n[0]*3600+n[1]*60+n[2])+(n[3]*3600+n[4]*60+n[5]):(n[0]*3600+n[1]*60+n[2])-(n[3]*3600+n[4]*60+n[5]);const a=nums(q.correct);check(a[0]*3600+a[1]*60+a[2]===v,'sexagesimal '+type,q);}
 if(type===6)value(q,90-n[0],0);if(type===7)value(q,180-n[0],0);if(type===8)value(q,360-n.reduce((a,b)=>a+b,0),0);if(type===9)value(q,Math.min(n[0]*30,360-n[0]*30),0);
 if(type===10){const d=dom(q.question),svg=d.querySelector('svg'),lines=[...svg.querySelectorAll('line')],l=lines[1],x1=Number(l.getAttribute('x1')),y1=Number(l.getAttribute('y1')),x2=Number(l.getAttribute('x2')),y2=Number(l.getAttribute('y2')),angle=Math.atan2(y1-y2,x2-x1)*180/Math.PI;check(near(angle,calc(q.correct),.1),'geometria angle dibuixat',q);check(lines.every(l=>['x1','x2'].every(k=>Number(l.getAttribute(k))>=0&&Number(l.getAttribute(k))<=430)&&['y1','y2'].every(k=>Number(l.getAttribute(k))>=0&&Number(l.getAttribute(k))<=190)),'angle sense retall',q);}
 }
 if(t.id==='radians4t'){
 if([2,4].includes(type))value(q,n[0]*Math.PI/180,9);if([3,5].includes(type))value(q,calc(bold[0])*180/Math.PI,0);if(type===6||type===10)value(q,n[0]*n[1],2);if(type===7||type===8)value(q,n[0]/n[1],2);if(type===9)value(q,n[0]*rad(n[1]),2);
 }
 if(t.id==='pitagores4t'){
 if([2,5,6,7].includes(type))value(q,Math.hypot(n[0],n[1]));if(type===3||type===8)value(q,Math.sqrt(n[0]**2-n[1]**2));if(type===9)value(q,n[0]*Math.SQRT2);if(type===10)value(q,Math.hypot(n[0],n[1])*(1+n[2]/100));
 }
 if(t.id==='semblancaRaons4t'){
 if(type===2)value(q,n[1]/n[0]);if(type===3)value(q,n[2]*n[1]/n[0]);if([6,8,9].includes(type))value(q,n[0]/n[1],3);if(type===7)value(q,n[0]*n[2]/n[1]);if(type===10)value(q,n[0]*n[2]/n[1]);
 if(type===4){const x=n[1]*n[2]/n[0];const valid=o=>{const [a,b]=String(o).split('=').map(e=>e.trim().replace(/x/g,String(x)));return near(calc(a),calc(b));};check(q.options.filter(valid).length===1&&valid(q.correct),'proporció única',q);}
 }
 if(t.id==='trigRaons4t'){
 if([3,4,5].includes(type))value(q,n[0]/n[1],3);if(type===7)value(q,n[1]*sin(n[0]));if(type===8)value(q,n[1]*cos(n[0]));if(type===9)value(q,n[1]*tan(n[0]));if(type===11){value(q,text.includes('tan α')?n[0]/n[1]:Math.sqrt(1-n[0]**2),3);}
 if([1,6,10].includes(type)){const d=dom(q.question),labels=[...d.querySelectorAll('svg text')],top=Number(labels[0].getAttribute('x'))<150,opp=labels[top?2:1].textContent,adj=labels[top?1:2].textContent,hyp=labels[3].textContent;if(type===1){const target=text.includes('hipotenusa')?hyp:text.includes('oposat')?opp:adj;check(q.correct===target,'costat respecte angle dibuixat',q);}if(type===10)value(q,atan(Number(opp)/Number(adj)),1);if(type===6){const expected={sin:Number(opp)/Number(hyp),cos:Number(adj)/Number(hyp),tan:Number(opp)/Number(adj)},valid=o=>{const m=String(o).match(/^(sin|cos|tan) α = (\d+)\/(\d+)$/);return m&&near(Number(m[2])/Number(m[3]),expected[m[1]]);};check(valid(q.correct)&&q.options.filter(valid).length===1,'raó única del triangle dibuixat',q);}}
 }
 if(t.id==='resolTriangles4t'){
 if(type===1)value(q,n[0]*sin(n[1]));if(type===2)value(q,n[0]*cos(n[1]));if(type===3)value(q,n[0]*tan(n[1]));if(type===4)value(q,n[0]/tan(n[1]));if(type===5)value(q,atan(n[0]/n[1]),1);if(type===6)value(q,text.includes('oposat')?Math.asin(n[1]/n[0])*180/Math.PI:acos(n[1]/n[0]),1);if(type===7)value(q,n[1]/cos(n[0]));if(type===11)value(q,acos(n[1]/n[0]),1);
 if(type===8){const got=nums(q.correct),want=[n[0]*sin(n[1]),n[0]*cos(n[1]),90-n[1]];check(got.every((v,i)=>near(v,want[i],.0051)),'resolució completa amb hipotenusa',q);}
 if(type===9){const got=nums(q.correct),angle=atan(n[0]/n[1]),want=[Math.hypot(n[0],n[1]),angle,90-angle];check(near(got[0],want[0],.0051)&&near(got[1],want[1],.051)&&near(got[2],want[2],.051),'resolució completa amb catets',q);}
 }
 if(t.id==='mesuresIndirectes4t'){
 if([1,6,7].includes(type))value(q,n[0]*tan(n[1]));if(type===2)value(q,n[1]*tan(n[2])+n[0]);if([3,5].includes(type))value(q,n[0]/tan(n[1]));if([4,8].includes(type))value(q,atan(n[0]/n[1]),1);if(type===10)value(q,n[0]*tan(n[1])*tan(n[2])/(tan(n[1])-tan(n[2])));if(type===11)value(q,n[0]/sin(n[1]));
 }
 if(t.id==='precisioError4t'){
 if(type===2)value(q,Math.abs(n[0]-n[1]));if(type===3)value(q,Math.abs(n[0]-n[1])/n[0],4);if(type===4)value(q,100*Math.abs(n[0]-n[1])/n[0]);if(type===10)value(q,.2);
 }
 if(t.id==='anglesNotablesAmpA'&&[1,2,3,7,8,10,11].includes(type)){let v;if(type<=3)v=[sin,cos,tan][type-1](n[0]);if(type===7)v=n[0]*sin(n[1]);if(type===8)v=n[1];if(type===11)v=n[0]*cos(n[1]);if(type===10){const m=text.match(/(sin|cos|tan)\((.*?)\)/);v=Math[m[1]](calc(m[2]));}value(q,v,9);}
 if(t.id==='identitatsAmpB'&&[1,2,3,4,5,6,10].includes(type)){
 const fractions=[...text.matchAll(/(?:sin|cos|tan) α\s*=\s*([^ .]+(?:\/\d+)?)/g)].map(m=>calc(m[1]));const v=type===1||type===2||type===10?Math.sqrt(1-fractions[0]**2):type===3?fractions[0]/fractions[1]:type===4?fractions[0]/Math.sqrt(1+fractions[0]**2):type===5?1/Math.sqrt(1+fractions[0]**2):1-fractions[0]**2;value(q,v,9);
 }
 if(t.id==='circumferenciaAmpC'){
 if([5,6,7].includes(type))value(q,[sin,cos,tan][type-5](n[0]),9);if(type===9)value(q,rad(n[0]),9);
 if(type===10){const trig=e=>{const m=String(e).match(/^(−|-)?(sin|cos)\s*\(?([0-9]+)°\)?$/);if(!m)return calc(e);return(m[1]?-1:1)*Math[m[2]](rad(Number(m[3])));},target=trig(bold[0]);check(near(trig(q.correct),target),'trigonometria equivalent',q);check(q.options.filter(o=>near(trig(o),target)).length===1,'expressió trigonomètrica única',q);}
 }
 if(t.id==='modelitzacioAmpD'){
 if(type===1)value(q,n[0]*tan(n[2])+n[1]);if(type===2)value(q,n[1]*tan(n[0])*tan(n[2])/(tan(n[2])-tan(n[0])));if(type===3)value(q,n[0]*tan(n[1]));if(type===4)value(q,2*Math.hypot(n[0],n[1]));if(type===5)value(q,n[0]/sin(n[1]));if(type===6)value(q,n[1]*sin(n[0])+n[2]);if(type===7)value(q,atan(n[0]/n[1]),1);if(type===9)value(q,atan(n[0]/n[1]),1);if(type===11)value(q,n[0]/sin(n[1]));if(type===10)check(miTaskDifficulty.getDifficulty(t,q)===(text.includes('altura dels ulls')?2:1),'variant altura ulls',q);
 }
 }
 }}return {checks:Object.values(counts).reduce((a,b)=>a+b,0),types:TOPICS.length*(sense==='numeric'?10:11),counts,failures};
},sense);fs.writeFileSync(file,JSON.stringify(result,null,2));console.log(sense+': '+result[sense].checks+' comprovacions, '+result[sense].failures.length+' incidències');await p.close();}}finally{await browser.close();}if(Object.values(result).some(r=>r.failures.length))process.exitCode=1;})().catch(e=>{console.error(e);process.exitCode=1;});
