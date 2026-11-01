const fs=require('fs'),path=require('path'),{pathToFileURL}=require('url');
const {playwright,launchOptions}=require('./genera-examens-cerca.cjs');
(async()=>{const browser=await playwright().chromium.launch(launchOptions()),report={};try{
for(const sense of ['algebraic','espacial','estocastic']){const p=await browser.newPage();await p.route(/^https?:/,r=>r.abort());await p.goto(pathToFileURL(path.resolve(`4eso/sentit-${sense}.html`)).href+'?opcio=B');
report[sense]=await p.evaluate(sense=>{
const counts={},failures=[],seen=new Map(),dom=s=>{const e=document.createElement('div');e.innerHTML=String(s);return e;},plain=s=>{const e=dom(String(s).replace(/<sup>(.*?)<\/sup>/g,'^($1)'));e.querySelectorAll('svg').forEach(x=>x.remove());return e.textContent.replace(/−/g,'-');},nums=s=>(String(s).match(/-?\d+(?:\.\d+)?/g)||[]).map(Number);
const check=(ok,key,q)=>{counts[key]=(counts[key]||0)+1;if(!ok&&failures.length<60&&!failures.some(f=>f.key===key&&f.topic===q.topicId&&f.type===q.type))failures.push({key,topic:q.topicId,type:q.type,question:plain(q.question),correct:q.correct,options:q.options});};
// Analitzador independent: no reutilitza normalitzadors, solucions ni càlculs del producte.
function calc(raw,x=0){let s=plain(raw).replace(/[²³]/g,c=>c==='²'?'^2':'^3').replace(/·|×/g,'*').replace(/÷/g,'/').replace(/,/g,'.').replace(/\s/g,'');let i=0;
function atom(){if(s[i]==='('){i++;const v=sum();if(s[i++]!==')')throw Error('paren');return v;}if(s[i]==='√'){i++;return Math.sqrt(atom());}if(/[xn]/.test(s[i]||'!')){i++;return x;}const m=s.slice(i).match(/^(?:\d+(?:\.\d*)?|\.\d+)/);if(!m)throw Error('atom');i+=m[0].length;return Number(m[0]);}
function pow(){let v=atom();if(s[i]==='^'){i++;v=v**unary();}return v;}function unary(){if(s[i]==='-'){i++;return -unary();}if(s[i]==='+'){i++;return unary();}return pow();}
function prod(){let v=unary();while(i<s.length){if(s[i]==='*'||s[i]==='/'){const op=s[i++],r=unary();v=op==='*'?v*r:v/r;}else if(/[xn(]/.test(s[i]))v*=unary();else break;}return v;}
function sum(){let v=prod();while(s[i]==='+'||s[i]==='-'){const op=s[i++],r=prod();v=op==='+'?v+r:v-r;}return v;}const v=sum();if(i!==s.length||!Number.isFinite(v))throw Error('tail '+s);return v;}
const same=(a,b)=>a.length===b.length&&a.every((v,i)=>Math.abs(v-b[i])<1e-7),num=s=>calc(String(s).replace(/\s*(?:%|°|€|u²|u|unitats|m)\s*$/,'')),numeric=(q,v,key,tol=.011)=>{check(Math.abs(num(q.correct)-v)<tol,key,q);check(q.options.filter(o=>{try{return Math.abs(num(o)-num(q.correct))<1e-8;}catch{return false;}}).length===1,key+' única',q);};
const sig=s=>{if(/\([^)]*,[^)]*\)/.test(plain(s)))throw Error('coordenada');return [-3,-1,0,2,5,7].map(x=>calc(plain(s).replace(/^(?:aₙ|C\(x\)|f\(x\)|y|P\(x\))\s*=\s*/,''),x));};
function poly(q,expr,key){let expected,got;try{expected=sig(expr);got=sig(q.correct);}catch(e){throw Error(key+' '+q.topicId+':'+q.type+' '+expr+' -> '+q.correct+' '+e.message);}check(same(got,expected),key,q);check(q.options.filter(o=>{try{return same(sig(o),expected);}catch{return false;}}).length===1,key+' única',q);}
const pairs=s=>[...String(s).matchAll(/\((-?\d+(?:[.,]\d+)?)[,;]\s*(-?\d+(?:[.,]\d+)?)\)/g)].map(m=>m.slice(1).map(x=>Number(x.replace(',', '.')))),add=(a,b)=>a.map((v,i)=>v+b[i]),sub=(a,b)=>a.map((v,i)=>v-b[i]),mul=(a,k)=>a.map(v=>v*k),cross=(a,b)=>a[0]*b[1]-a[1]*b[0];
const names={algebraic:['genPatrons4ESO','genEquacions2Grau4ESO','genSistemes4ESO','genInequacions4ESO','genFuncionsRep4ESO','genLinealsQuad4ESO','genInversaExp4ESO','genAnalisiFunc4ESO','genPolinomisAmpA','genEquacionsAdvAmpB','genParametresAmpC','genInequacionsCompAmpD'],espacial:['genFigures4ESO','genVectors4ESO','genComponents4ESO','genOperationsVectors4ESO','genCoordinatesVectors4ESO','genHomothety4ESO','genGeometryFunctions4ESO','genRegions4ESO','genRectesAmpA','genElementsRectaAmpB','genPosicioRectesAmpC','genGeometriaAnaliticaAmpD'],estocastic:['genDadesVariables4','genTaulesRepresentacions4','genComparacioDistribucions4','genEstudisMostreig4','genNuvolsRelacio4','genRegressioPrediccions4','genEspaiMostralRecompte4','genExperimentsCompostos4','genContingenciaBatx4','genCorrelacioBatx4','genCondicionadaBatx4','genBayesBatx4']};
for(const [index,t] of TOPICS.entries()){let i=0;const types=new Set();while(i++<1600||[...types].some(type=>seen.get(t.id+':'+type)<60)){
const q=window[names[sense][index]](),key=t.id+':'+q.type;types.add(q.type);seen.set(key,(seen.get(key)||0)+1);check(q.options.length===4&&new Set(q.options).size===4,'opcions diferents',q);
const text=plain(q.question),bold=[...dom(q.question).querySelectorAll('b')].map(e=>plain(e.innerHTML)),ns=nums(text),ps=pairs(text),a=ps[0],b=ps[1],c=ps[2],d=ps[3],type=q.type;
try{const expected=sig(q.correct);check(q.options.filter(o=>{try{return same(sig(o),expected);}catch{return false;}}).length===1,'equivalència algebraica/numèrica',q);}catch{}
if(sense==='algebraic'){
if(t.id==='patrons4t'){
if(type===5)poly(q,bold[0],'distributiva');if(type===6)poly(q,bold[0],'factor comú');
if(type===1){const seq=nums(bold[0]),delta=seq[1]-seq[0];poly(q,`${delta}n+(${seq[0]-delta})`,'terme general');}
if(type===9){const expr=bold[0].split('=')[1],x=Number(bold[1].match(/\d+/)[0]);numeric(q,calc(expr,x),'cost');}
}
if(t.id==='equacions2g4t'&&[1,2,3,4,5,7].includes(type)){
const eq=bold.find(x=>x.includes('²')&&x.includes('=')),halves=eq.split('='),expr=`(${halves[0]})-(${halves[1]})`,C=calc(expr,0),B=(calc(expr,1)-calc(expr,-1))/2,A=(calc(expr,1)+calc(expr,-1)-2*C)/2,delta=B*B-4*A*C;
if(type===5)check(q.correct===(delta>0?'Dues solucions reals diferents':delta===0?'Una solució real doble':'Cap solució real'),'discriminant',q);
else if(type===7){const candidate=Number(bold[0].split('=')[1]);check(q.correct===(Math.abs(calc(expr,candidate))<1e-8?'Sí':'No'),'comprovació arrel',q);}
else {const roots=[...new Set([(-B-Math.sqrt(delta))/(2*A),(-B+Math.sqrt(delta))/(2*A)])].sort((a,b)=>a-b),got=[...new Set(nums(q.correct))].sort((a,b)=>a-b);check(same(got,roots),'arrels quadràtiques',q);if([3,4].includes(type))check(miTaskDifficulty.getDifficulty(t,q)===(B===0||C===0?1:2),'variant incompleta i errors antics',q);}
}
if(t.id==='equacions2g4t'&&type===6){const roots=nums(bold[0]+' '+bold[1]),expr=q.correct.split('=')[0];check(roots.every(r=>Math.abs(calc(expr,r))<1e-8),'reconstrucció quadràtica',q);}
if(t.id==='polinomisAmpA'){
if(type===1)numeric(q,calc(bold[0].split('=')[1],Number(bold[1].match(/-?\d+/)[0])),'valor polinomi');
if(type===3)poly(q,`(${bold[0].split('=')[1]})+(${bold[1].split('=')[1]})`,'suma polinomis');
if([4,5,6,7].includes(type))poly(q,type===4?bold[1]:bold[0],'factorització');
}
if(t.id==='equacionsAdvAmpB'&&[1,2,3,4,5,6,7,8,9].includes(type)){
const eq=bold.find(x=>x.includes('=')&&x!=='comprova'),halves=eq.split('='),x=num(q.correct);check(Math.abs(calc(halves[0],x)-calc(halves[1],x))<1e-7,'equació avançada',q);
check(q.options.filter(o=>{try{const v=num(o);return Math.abs(calc(halves[0],v)-calc(halves[1],v))<1e-7;}catch{return false;}}).length===1,'equació avançada única',q);
}
if(t.id==='analisiFunc4t'&&type===5){const expr=bold[0].split('=')[1],xs=[...text.matchAll(/x=(-?\d+)/g)].map(m=>Number(m[1]));check(calc(expr,xs[0])===calc(expr,xs[1]),'simetria paràbola',q);check(!q.options.includes(`f(${xs[0]}) = −f(${xs[1]})`),'signe nul no duplicat',q);}
}
if(sense==='espacial'){
let expected=null;
if(t.id==='figures4t'){
if(type===8){const s=nums(bold[0]).sort((a,b)=>a-b),v=s[2]**2-s[0]**2-s[1]**2;check(s[0]+s[1]>s[2],'triangle vàlid',q);check(q.correct===(v===0?'Rectangle':v>0?'Obtusangle':'Acutangle'),'classificació triangle',q);}
if(type===4)numeric(q,(ns[0]-2)*180/ns[0],'angle regular');if(type===5)numeric(q,360/ns[0],'costats regular');if(type===6)numeric(q,ns[0]/2,'angle inscrit');if(type===9)numeric(q,ns[0]*1.5,'arestes prisma');if(type===10)numeric(q,ns[0]/2+2,'cares prisma');
}
if(t.id==='components4t'){
if(type===1)expected=sub(b,a);if(type===2)expected=add(a,b);if(type===3)expected=sub(b,a);
if([5,6].includes(type))numeric(q,Math.hypot(...a),'mòdul');if(type===8)check(q.correct===(a[0]**2+a[1]**2>b[0]**2+b[1]**2?'u':'v'),'comparació mòduls',q);
}
if(t.id==='operacionsVectors4t'){
if(type===1)expected=add(a,b);if(type===2)expected=sub(a,b);if(type===3)expected=mul(a,-1);if(type===4)expected=mul(a,ns[0]);if(type===5)expected=sub(b,a);if(type===7)expected=add(mul(a,2),b);if(type===9)numeric(q,b[0]/a[0],'escalar');if(type===10)expected=mul(add(ps[1],ps[2]),-1);
}
if(t.id==='coordenadesVectors4t'){
if(type===1)numeric(q,Math.hypot(...sub(b,a)),'distància');if(type===2)expected=mul(add(a,b),.5);if([3,8].includes(type))expected=sub(mul(a,2),b);if(type===4){expected=sub(add(a,c),b);check(cross(sub(b,a),sub(c,b))!==0,'paral·lelogram no degenerat',q);}
if(type===10)check(cross(sub(b,a),sub(d,a))!==0,'paral·lelogram no degenerat',q);
if(type===5)check(cross(sub(b,a),sub(d,c))===0,'paral·lelisme',q);if(type===6)check(cross(sub(b,a),sub(c,a))===0,'alineació',q);
}
if(t.id==='homotecies4t'){
if(type===1)expected=mul(b,Number(text.match(/k=(-?\d+)/)[1]));if(type===2)expected=add(a,mul(sub(b,a),Number(text.match(/k=(-?\d+)/)[1])));if(type===3)expected=add(a,mul(sub(b,a),1/Number(text.match(/k=(-?\d+)/)[1])));if(type===4)numeric(q,(c[0]-a[0])/(b[0]-a[0]),'raó homotècia');if(type===9)expected=sub(mul(a,2),b);
if([6,7].includes(type)){const n=nums(text.replace(',','.'));numeric(q,n[0]*Math.abs(n[1]),'longitud homotècia');}if(type===8)numeric(q,ns[0]*Number(text.match(/k=(-?\d+(?:[.,]\d+)?)/)[1].replace(',','.'))**2,'àrea homotècia');
}
if(t.id==='geometriaAnaliticaAmpD'){
if(type===4){expected=mul(add(a,c),.5);check(cross(sub(b,a),sub(d,a))!==0,'paral·lelogram no degenerat',q);}
if(type===11)expected=add(a,b);
}
if(expected){const got=pairs(q.correct)[0];check(got&&same(got,expected),'coordenades independents',q);check(q.options.filter(o=>{const v=pairs(o)[0];return v&&same(v,expected);}).length===1,'coordenades úniques',q);}
}
if(sense==='estocastic'){
if(q.validator==='number'&&q.allowOpen!==false){check(validateOpenLegacy(q,q.correct),'resposta decimal canònica',q);const value=num(q.correct);check(!validateOpenLegacy(q,String(value+.2).replace('.',',')),'decimal incorrecte rebutjat',q);check(!validateOpenLegacy(q,q.correct+' qualsevol'),'text afegit rebutjat',q);}
const table=[...dom(q.question).querySelectorAll('tr')].map(r=>[...r.querySelectorAll('td')].map(x=>Number(x.textContent.replace(',','.')))).filter(r=>r.length);
if(['contingenciaBatx4t','condicionadaBatx4t'].includes(t.id)&&table.length){const [a,b]=table[0].slice(0,2),[c,d]=table[1].slice(0,2),N=a+b+c+d;let v=null;
if(t.id==='contingenciaBatx4t'){if(type===1)v=a;if(type===2)v=a+b;if(type===3)v=a+c;if(type===4)v=100*a/N;if(type===5)v=100*a/(a+b);if(type===6)v=100*a/(a+c);if(type===8)check(q.correct===(a*(c+d)>c*(a+b)?'4t A':a*(c+d)<c*(a+b)?'4t B':'Tenen el mateix percentatge'),'comparació bases',q);}
else {if(type===1)v=100*a/(a+b);if(type===2)v=100*a/(a+c);if(type===10)v=100*d/(c+d);}if(v!==null)numeric(q,v,'taula contingència',.051);
}
if(t.id==='experimentsCompostos4t'){const values={1:50,2:75,3:25,4:100/6,6:24,7:30,10:50};if(values[type]!==undefined)numeric(q,values[type],'probabilitat composta',.051);}
if(t.id==='bayesBatx4t'){const values={2:1800/67,3:30,4:87.5,5:37.5,6:1100/36,8:4};if(values[type]!==undefined)numeric(q,values[type],'Bayes/recompte',.051);}
if(t.id==='condicionadaBatx4t'&&type===6){const bs=bold.map(x=>nums(x));numeric(q,bs[2][0]*bs[3][0]/100,'independència producte',.051);}
}
if(i>5000)throw Error('Cens sense tancar '+t.id);
}}
return {counts,checks:Object.values(counts).reduce((a,b)=>a+b,0),types:seen.size,samples:[...seen.values()].reduce((a,b)=>a+b,0),failures};
},sense);await p.close();fs.writeFileSync('docs/dificultats/oracles-tres-blocs-4eso-punt3.json',JSON.stringify(report,null,2));console.log(sense+': '+report[sense].checks+' comprovacions, '+report[sense].failures.length+' incidències');}
}finally{await browser.close();}if(Object.values(report).some(r=>r.failures.length))process.exitCode=1;})().catch(e=>{console.error(e);process.exitCode=1;});
