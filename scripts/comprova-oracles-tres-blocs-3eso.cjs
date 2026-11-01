const fs=require('fs'),path=require('path'),{pathToFileURL}=require('url');
const {playwright,launchOptions}=require('./genera-examens-cerca.cjs');
(async()=>{const browser=await playwright().chromium.launch(launchOptions()),result=process.argv[2]&&fs.existsSync('docs/dificultats/oracles-tres-blocs-3eso-punt3.json')?JSON.parse(fs.readFileSync('docs/dificultats/oracles-tres-blocs-3eso-punt3.json')):{};try{
for(const sense of (process.argv[2]?process.argv.slice(2):['algebraic','espacial','estocastic'])){const p=await browser.newPage();await p.route(/^https?:/,r=>r.abort());await p.goto(pathToFileURL(path.resolve(`3eso/sentit-${sense}.html`)).href);
result[sense]=await p.evaluate(sense=>{
 const counts={},failures=[],seen=new Map(),plain=s=>{const e=document.createElement('div');e.innerHTML=String(s).replace(/<sup>(.*?)<\/sup>/g,'^($1)');e.querySelectorAll('svg').forEach(x=>x.remove());return e.textContent.replace(/−/g,'-');},numbers=s=>(String(s).match(/-?\d+(?:[.,]\d+)?/g)||[]).map(x=>Number(x.replace(',','.'))),dom=s=>{const e=document.createElement('div');e.innerHTML=s;return e;};
 const check=(ok,key,q)=>{counts[key]=(counts[key]||0)+1;if(!ok&&failures.length<60&&!failures.some(f=>f.key===key&&f.topic===q.topicId&&f.type===q.type))failures.push({key,topic:q.topicId,type:q.type,question:plain(q.question),correct:q.correct,options:q.options});};
 // Analitzador independent dels ajudants de la web: substitució numèrica en expressions.
 function calc(raw,x=0,y=0){let s=plain(raw).replace(/[²³]/g,c=>c==='²'?'^2':'^3').replace(/·|×/g,'*').replace(/÷/g,'/').replace(/,/g,'.').replace(/\s/g,'');let i=0;
 function atom(){if(s[i]==='('){i++;const v=sum();if(s[i++]!==')')throw Error('paren');return v;}if(/[xny]/.test(s[i]||'!'))return s[i++]==='y'?y:x;const m=s.slice(i).match(/^(?:\d+(?:\.\d*)?|\.\d+)/);if(!m)throw Error('atom');i+=m[0].length;return Number(m[0]);}
 function pow(){let v=atom();if(s[i]==='^'){i++;v=v**unary();}return v;}
 function unary(){if(s[i]==='-'){i++;return -unary();}if(s[i]==='+'){i++;return unary();}return pow();}
 function prod(){let v=unary();while(i<s.length){if(s[i]==='*'||s[i]==='/'){const op=s[i++],r=unary();v=op==='*'?v*r:v/r;}else if(/[xny(]/.test(s[i]))v*=unary();else break;}return v;}
 function sum(){let v=prod();while(s[i]==='+'||s[i]==='-'){const op=s[i++],r=prod();v=op==='+'?v+r:v-r;}return v;}const v=sum();if(i!==s.length||!Number.isFinite(v))throw Error('tail');return v;}
 function signature(raw){if(/\([^)]*,[^)]*\)/.test(plain(raw)))throw Error('parella');let s=plain(raw).replace(/^a(?:ₙ|_n|n)\s*=\s*/,'').replace(/^(?:f\(x\)|y)\s*=\s*/,'');return [-3,-1,0,2,5,7].map(x=>calc(s,x));}
 const same=(a,b)=>a.length===b.length&&a.every((v,i)=>Math.abs(v-b[i])<1e-8),num=s=>calc(String(s).replace(/%$/,'')),numericCheck=(q,v,key)=>{check(Math.abs(num(q.correct)-v)<0.011,key,q);check(q.options.filter(o=>{try{return Math.abs(num(o)-num(q.correct))<1e-9;}catch{return false;}}).length===1,key+' opció única',q);};
 function polyCheck(q,expression,key){const expected=signature(expression);check(same(signature(q.correct),expected),key,q);check(q.options.filter(o=>{try{return same(signature(o),expected);}catch{return false;}}).length===1,key+' opció única',q);}
 const median=a=>{const s=[...a].sort((a,b)=>a-b),n=s.length;return n%2?s[(n-1)/2]:(s[n/2-1]+s[n/2])/2;};
 for(const t of TOPICS){const types=new Set();let i=0;while(i++<900||[...types].some(type=>(seen.get(t.id+':'+type)||0)<50)){
 const names={espacial:['genTranslacions3ESO','genGirs3ESO','genSimetriaAxial3ESO','genSimetriaCentral3ESO','genMosaics3ESO','genTransformacionsCoord3ESO','genGeoAlgebra3ESO','genVisualitzacio3ESO','genAmpliacioA3ESO','genAmpliacioB3ESO','genAmpliacioC3ESO','genAmpliacioD3ESO'],estocastic:['genDades3ESO','genTaules3ESO','genGrafics3r','genCentralitzacio3r','genQuartils3r','genDispersio3r','genInvestigacio3r','genProbabilitatBloc8','genAmpA3r','genAmpB3r','genAmpC3r','genAmpD3r']};const q=names[sense]?window[names[sense][TOPICS.indexOf(t)]]():t.gen(),key=t.id+':'+q.type;types.add(q.type);seen.set(key,(seen.get(key)||0)+1);check(q.options.length===4,'quatre opcions',q);const text=plain(q.question),bold=[...dom(q.question).querySelectorAll('b')].map(e=>plain(e.innerHTML)),ns=numbers(text),pairs=[...text.matchAll(/\((-?\d+(?:[.,]\d+)?);\s*(-?\d+(?:[.,]\d+)?)\)/g)].map(m=>[Number(m[1].replace(',','.')),Number(m[2].replace(',','.'))]);
 // Cerca equivalències numèriques/algebraiques també a les opcions incorrectes.
 try{const sig=signature(q.correct);check(q.options.filter(o=>{try{return same(signature(o),sig);}catch{return false;}}).length===1,'equivalència d’opcions',q);}catch{}
 if(sense==='algebraic'){
 if(t.id==='expressions'&&q.type===2){const x=Number(text.match(/x = (-?\d+)/)[1]);numericCheck(q,calc(bold[0],x),'valor polinomi');}
 if(t.id==='expressions'&&[4,5,6,7].includes(q.type))polyCheck(q,bold[0],'operacions polinomis');
 if(t.id==='identitats'&&[1,2,3,4,5].includes(q.type))polyCheck(q,bold[0],'identitats');
 if(t.id==='factoritzacio'&&[1,2,3,4,5,6].includes(q.type))polyCheck(q,bold[0],'factorització');
 if(t.id==='equacions2'&&[1,2,3,4].includes(q.type)){
 const halves=bold[0].split('='),expr='('+halves[0]+')-('+halves[1]+')',c=calc(expr,0),b=(calc(expr,1)-calc(expr,-1))/2,a=(calc(expr,1)+calc(expr,-1)-2*c)/2,delta=b*b-4*a*c,roots=[(-b-Math.sqrt(delta))/(2*a),(-b+Math.sqrt(delta))/(2*a)].sort((a,b)=>a-b),got=[...new Set(numbers(q.correct))].sort((a,b)=>a-b),expected=[...new Set(roots)];check(same(got,expected),'arrels quadràtiques',q);
 }
 if(t.id==='equacions2'&&q.type===5){const roots=bold.slice(0,2).map(b=>Number(b.split('=')[1])),expr=q.correct.split('=')[0];check(roots.every(r=>Math.abs(calc(expr,r))<1e-8),'equació reconstruïda',q);}
 if(t.id==='funcions'&&[3,4].includes(q.type)){const expr=bold[0].split('=')[1];if(q.type===3)numericCheck(q,calc(expr,Number(text.match(/f\((-?\d+)\)/)[1])),'substitució funció');}
 if(t.id==='quadratica'&&q.type===2)numericCheck(q,calc(bold[0].split('=')[1],Number(text.match(/f\((-?\d+)\)/)[1])),'substitució quadràtica');
 }
 if(sense==='espacial'){
 let expected=null;const a=pairs[0],b=pairs[1],c=pairs[2],add=(a,b)=>a.map((v,i)=>v+b[i]),sub=(a,b)=>a.map((v,i)=>v-b[i]),scale=(a,k)=>a.map(v=>v*k);
 if(t.id==='translacions'){
 if(q.type===1)expected=sub(b,a);if([2,6].includes(q.type))expected=add(a,b);if(q.type===3)expected=sub(b,a);if(q.type===5)expected=scale(a,-1);if(q.type===7)expected=add(a,scale(b,Number(text.match(/(\d+) vegades/)[1])));
 }
 if(t.id==='girs'){
 if([1,2,3,4].includes(q.type))expected=q.type===1?[-a[1],a[0]]:[2,4].includes(q.type)?[a[1],-a[0]]:scale(a,-1);
 if(q.type===5)check(!q.options.includes('270° horari'),'gir equivalent no duplicat',q);
 if(q.type===6)expected=scale(a,-1);if(q.type===8)expected=scale(add(a,b),.5);if(q.type===9)expected=sub(scale(b,2),a);
 if(q.type===7){expected=a;for(let n=0;n<Number(text.match(/(\d+) girs/)[1]);n++)expected=[-expected[1],expected[0]];}
 }
 if(t.id==='simetriaAxial'){
 if(q.type===1)expected=[a[0],-a[1]];if(q.type===2)expected=[-a[0],a[1]];
 if(q.type===3)expected=[2*Number(text.match(/x = (-?\d+)/)[1])-a[0],a[1]];
 if(q.type===4)expected=[a[0],2*Number(text.match(/y = (-?\d+)/)[1])-a[1]];
 if(q.type===7)expected=[-c[0],c[1]];
 if(q.type===8){const k=Number(text.match(/x = (-?\d+)/)[1]);check(q.options.filter(o=>numbers(o)[0]===k).length===1,'únic punt fix',q);}
 }
 if(t.id==='simetriaCentral'){
 if(q.type===1)expected=scale(a,-1);if(q.type===2)expected=sub(scale(b,2),a);if(q.type===3)expected=scale(add(a,b),.5);
 if(q.type===6)expected=scale(add(a,b),-1);if(q.type===7)expected=add(scale(a,-1),b);if(q.type===8)expected=scale(sub(b,a),2);
 if(q.type===10)expected=[a[0]-b[0],-a[1]-b[1]];
 }
 if(t.id==='ampliacioA'){
 if(q.type===1)expected=[a[0]+b[0],-a[1]-b[1]];if(q.type===2)expected=[-a[1],-a[0]];if(q.type===3)expected=add(sub(scale(b,2),a),c);if(q.type===4)expected=add(a,b);if(q.type===5)expected=scale(a,-1);if(q.type===6)expected=[a[1],-a[0]];if(q.type===7)expected=[-a[1]+b[0],-a[0]-b[1]];if(q.type===9)expected=[b[0]-a[0],-(b[1]-a[1])];
 if(q.type===8){const label=q.options.find(o=>/translació/i.test(o)&&/\(-?\d+;/.test(o)),v=[...label.matchAll(/\((-?\d+);\s*(-?\d+)\)/g)][0].slice(1).map(Number),c=v,target=b,outcomes=[[ -a[0]+c[0],a[1]+c[1]],[a[0]+c[0],-a[1]-c[1]],[-a[0]+c[0],-a[1]+c[1]],add(a,c)];check(same([-a[0]-c[0],a[1]+c[1]],target),'composició directa',q);check(q.options.every(o=>o===q.correct||! /^(Simetria|Translació|Gir|Només una translació)/.test(o)||!same(outcomes[o.startsWith('Simetria')?0:o.startsWith('Translació')?1:o.startsWith('Gir')?2:3],target)),'composició identificable',q);}
 }
 if(t.id==='ampliacioD'){
 if(q.type===1)expected=scale(a,Number(text.match(/k = (-?\d+)/)[1]));if(q.type===2)expected=add(b,scale(sub(a,b),Number(text.match(/raó (\d+)/)[1])));if(q.type===5)expected=[a[1],a[0]];if(q.type===6)expected=[-a[1],-a[0]];if(q.type===8)expected=scale(add(a,b),.5);
 if(q.type===3)numericCheck(q,ns[0]*ns[1]**2,'àrea homotècia');if(q.type===4)numericCheck(q,ns[0]*Math.abs(ns[1]),'perímetre homotècia');if(q.type===7)numericCheck(q,Math.hypot(b[0]-a[0],b[1]-a[1]),'distància coordenades');
 }
 if(expected){check(same(numbers(q.correct),expected),'coordenades '+t.id+':'+q.type,q);check(q.options.filter(o=>same(numbers(o),expected)).length===1,'coordenades úniques '+t.id+':'+q.type,q);}
 if(t.id==='geoAlgebra'&&[1,2,3,4,5,9,10].includes(q.type)){let expr;if(q.type===1)expr='('+bold[0]+')^2';if(q.type===2)expr='('+bold[0]+')('+bold[1]+')';if([3,4,9,10].includes(q.type))expr=bold[0];if(q.type===5)expr=bold[0]+'+'+bold[1];polyCheck(q,expr,'geometria algebraica');}
 }
 if(sense==='estocastic'){
 const d=dom(q.visual||''),raw=d.querySelector('.raw-data'),data=raw?numbers(raw.textContent):null,table=[...d.querySelectorAll('tbody tr')].map(r=>[...r.querySelectorAll('td')].map(c=>plain(c.innerHTML)));
 if(t.id==='centralitzacio3r'&&q.type===1){const vals=numbers(dom(q.question).querySelector('.raw-data').textContent);numericCheck(q,vals.reduce((a,b)=>a+b,0)/vals.length,'mitjana dades');}
 if(t.id==='centralitzacio3r'&&[7,8].includes(q.type)){const vals=numbers(dom(q.question).querySelector('.raw-data').textContent);numericCheck(q,median(vals),'mediana dades');}
 if(t.id==='dispersio3r'&&[1,2,7].includes(q.type)&&data){const m=data.reduce((a,b)=>a+b,0)/data.length,v=data.reduce((s,x)=>s+(x-m)**2,0)/data.length;numericCheck(q,q.type===1?Math.max(...data)-Math.min(...data):q.type===2?v:Math.sqrt(v),'dispersió dades');}
 if(t.id==='dispersio3r'&&q.type===5)numericCheck(q,Math.sqrt(ns[0]),'arrel variància');
 if(t.id==='dispersio3r'&&q.type===6)numericCheck(q,ns[0]**2,'quadrat desviació');
 if(t.id==='dispersio3r'&&q.type===15)numericCheck(q,100*ns[1]/ns[0],'coeficient variació');
 if(t.id==='quartils3r'&&q.type===1&&data){const a=[...data].sort((a,b)=>a-b),quart=text.includes('Q₁')?median(a.slice(0,4)):text.includes('Q₃')?median(a.slice(4)):median(a);numericCheck(q,quart,'quartils dades');}
 if(t.id==='quartils3r'&&q.type===4)check(!q.options.some(o=>String(o).includes('o superior')),'interpretació quartil única',q);
 if(t.id==='quartils3r'&&q.type===14&&data){const a=[...data].sort((a,b)=>a-b),expected=[a[0],median(a.slice(0,4)),median(a),median(a.slice(4)),a.at(-1)];const got=q.correct.split(', ').map(s=>Number(s.replace(',','.')));check(same(got,expected),'resum cinc nombres',q);}
 if(t.id==='centralitzacio3r'&&[3,4].includes(q.type)&&table.length){const rows=table.map(r=>r.map(x=>Number(x.replace(',','.')))),offset=q.type===4?1:0,total=rows.reduce((s,r)=>s+r[offset+1],0),sum=rows.reduce((s,r)=>s+r[offset]*r[offset+1],0);numericCheck(q,sum/total,'mitjana ponderada taula');}
 if(t.id==='dispersio3r'&&q.type===14&&table.length){const rows=table.map(r=>r.map(Number)),N=rows.reduce((s,r)=>s+r[1],0),mean=rows.reduce((s,r)=>s+r[0]*r[1],0)/N;numericCheck(q,rows.reduce((s,r)=>s+r[1]*(r[0]-mean)**2,0)/N,'variància ponderada taula');}
 if(t.id==='ampC3r'){
 const r=ns[0],b=ns[1],n=r+b;let v=null;
 if(q.type===1)v=r*r/(n*n);if(q.type===2)v=r*(r-1)/(n*(n-1));if(q.type===3)v=(r-1)/(n-1);if(q.type===5)v=2*r*b/(n*(n-1));if(q.type===6)v=1-b*b/(n*n);if(q.type===7)v=1-b*(b-1)/(n*(n-1));if(q.type===8)v=3/8;if(q.type===14)v=(r*(r-1)+b*(b-1))/(n*(n-1));if(v!==null)numericCheck(q,v,'probabilitat composta '+q.type);
 }
 }
 if(q.difficultyVariant){const old={...q};delete old.difficultyVariant;check(miTaskDifficulty.getDifficulty(t,old)===q.taskDifficulty,'recuperació variant '+q.difficultyVariant,q);}
 if(i>5000)throw Error('Cens sense tancar '+t.id);
 }
 }
 return {counts,checks:Object.values(counts).reduce((a,b)=>a+b,0),types:seen.size,samples:[...seen.values()].reduce((a,b)=>a+b,0),failures};
},sense);fs.writeFileSync('docs/dificultats/oracles-tres-blocs-3eso-punt3.json',JSON.stringify(result,null,2));await p.close();console.log(sense+': '+result[sense].checks+' comprovacions, '+result[sense].failures.length+' incidències');}
}finally{await browser.close();}fs.writeFileSync('docs/dificultats/oracles-tres-blocs-3eso-punt3.json',JSON.stringify(result,null,2));if(Object.values(result).some(r=>r.failures.length))process.exitCode=1;})().catch(e=>{console.error(e);process.exitCode=1;});
