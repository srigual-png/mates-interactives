/* Catàleg curricular de 4t derivat dels generadors de pràctica. */
(function(){
'use strict';
const levels={
reals4t:[[1,2,3,6],[4,5,7],[8,9,10]],
irracionals4t:[[1,2,5],[3,6,9],[4,7,8,10]],
intervals4t:[[1,2,3,4],[5,6,7],[8,9,10]],
errors4t:[[1,2,3,4],[5,9],[6,7,8,10]],
operacions4t:[[1,2,4],[3,5,7],[6,8,9,10]],
comptatge4t:[[1,4,5,7],[2,3,8,9],[6,10]],
pascal4t:[[1,2,6,8],[3,5,9],[4,7,10]],
financera4t:[[1,2,8],[4,6,7],[3,5,9,10]]};
const generators={reals4t:genReals4ESO,irracionals4t:genIrracionals4ESO,intervals4t:genIntervals4ESO,errors4t:genErrors4ESO,operacions4t:genOperacions4ESO,comptatge4t:genComptatge4ESO,pascal4t:genPascal4ESO,financera4t:genFinancera4ESO};
const supers={'⁰':'0','¹':'1','²':'2','³':'3','⁴':'4','⁵':'5','⁶':'6','⁷':'7','⁸':'8','⁹':'9','⁻':'-','⁺':'+'};
function plain(html){
 const el=document.createElement('div');el.innerHTML=String(html).replace(/<br\s*\/?\s*>/gi,'\n').replace(/<sup>(.*?)<\/sup>/gi,'^$1');
 el.querySelectorAll('.periodic').forEach(e=>e.replaceWith('('+e.textContent+')'));
 el.querySelectorAll('svg').forEach(e=>e.remove());
 el.querySelectorAll('table').forEach(e=>{const rows=[...e.rows].map((r,i)=>(i===0?'Primera fila (x): ':'Segona fila (y): ')+[...r.cells].map(c=>c.textContent).join(' | '));e.replaceWith('\n'+rows.join('\n')+'\n');});
 el.querySelectorAll('div').forEach(e=>e.append(document.createTextNode('\n')));
 return el.textContent.replace(/ℕ\s*·\s*naturals/g,'naturals').replace(/ℤ\s*·\s*enters/g,'enters').replace(/ℚ\s*·\s*racionals/g,'racionals').replace(/ℝ\s*·\s*reals/g,'reals').replace(/I\s*·\s*irracionals/g,'irracionals').replace(/∈ I\b/g,'pertany als irracionals').replace(/Eₐ/g,'error absolut').replace(/Eᵣ/g,'error relatiu').replace(/ⁿ/g,'^n').replace(/([\[(])(-?\d+,\d+),\s*(-?\d+,\d+)([\])])/g,'$1$2; $3$4').replace(/ℝ\s*∖\s*ℚ/g,'irracionals').replace(/[ℕℤℚℝ]/g,c=>({'ℕ':'naturals','ℤ':'enters','ℚ':'racionals','ℝ':'reals'})[c]).replace(/⊂/g,'està inclòs en').replace(/∅/g,'conjunt buit').replace(/∈/g,' pertany a ').replace(/∉/g,' no pertany a ').replace(/\u00a0/g,' ').replace(/✅|☑|✔/gu,'').replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺]+/g,s=>'^'+[...s].map(c=>supers[c]).join('')).replace(/[ \t]+/g,' ').replace(/\n{3,}/g,'\n\n').trim();
}

function paperQuestion(id,q){
 let s=plain(q.question),t=q.type;
 if(id==='reals4t'){
  if(t===2)s+=' Indica si és certa o falsa i justifica la resposta.';
  if(t===7)s+=' Tria la descripció que es refereix al nombre indicat a la pregunta.';
  if([3,6,10].includes(t))s=s.replace('Quin nombre','Quin dels nombres proposats').replace('Quina expressió','Quina de les expressions proposades');
  if(t===9)s=s.replace('Què podem afirmar sobre','Considera l’operació').replace(/\?$/,'.')+' El resultat és sempre racional, sempre irracional o depèn dels nombres escollits? Justifica-ho.';
  if([1,4,8].includes(t))s+=' En aquesta fitxa, els naturals són 1, 2, 3, …; el 0 es classifica com a enter.';
 }
 if(id==='irracionals4t'){
  if([2,3,7,10].includes(t))s+=' Pots utilitzar la calculadora; conserva prou decimals per comparar o arrodonir correctament.';
  if(t===9)s=s.replace('Sense que hi aparegui marcada la solució, en quin tram situaries','Entre quins dos enters consecutius de la recta situaries');
 }
 if(id==='intervals4t'){
  if(t===6)s+=' Un cercle ple inclou l’extrem i un cercle buit l’exclou.';
  if(t===9)s=s.replace('Quin d’aquests intervals','Quin dels intervals proposats');
 }
 if(id==='errors4t'){
  if(t===6)s+=' Expressa l’error relatiu com a nombre decimal.';
  if(t===7)s=s.replace('valor real','valor exacte').replace('error relatiu percentual','error relatiu, expressat en percentatge');
  if(t===8)s+=' Compara els errors relatius de les dues mesures.';
  if(t===10)s+=' Utilitza l’arrodoniment habitual: si la primera xifra eliminada és 5, s’arrodoneix cap amunt. Separa els extrems de l’interval amb un punt i coma.';
 }
 if(id==='operacions4t'){
  if(t===4)s+=' Arrodoneix el primer factor a les unitats i el segon a les dècimes, i multiplica els valors arrodonits.';
  if(t===6)s+=' Aplica el model sense arrodonir els passos intermedis i arrodoneix la població final al nombre enter d’habitants més proper.';
  if(t===8){const side=s.match(/costat (\d+)/)?.[1];if(side)s=`Un quadrat té un costat de ${side} cm i una diagonal de ${side}√2 cm. Aproxima la longitud de la diagonal a les centèsimes de centímetre.`;}
 }
 if(id==='comptatge4t'){
  if(t===1)s+=' Cada conjunt té una samarreta i uns pantalons; totes les peces són diferents.';
  if([2,3,10].includes(t))s+=' L’ordre dels símbols importa: canviar-ne l’ordre dona un codi diferent.';
  if(t===4)s+=' Cada camí complet comença al punt de l’esquerra i acaba en un punt final de la dreta.';
  if(t===5)s=s.replace('primers,','primers plats,').replace('segons i','segons plats i');
  if(t===10)s+=' Si el 0 és un dels dígits disponibles i no està prohibit, també pot ocupar la primera posició.';
 }
 if(id==='pascal4t'){
  if([3,4,5,8,10].includes(t))s+=' Numerem les files i les posicions des de 0: la fila 0 és «1» i la primera posició de cada fila és la 0.';
  if([1,8].includes(t))s+=' Els punts separen nombres de la fila; no indiquen multiplicacions.';
  if([4,7,10].includes(t))s+=' Cada persona només pot formar part d’un mateix grup una vegada; canviar l’ordre dels membres no crea un grup nou.';
 }
 if(id==='financera4t'){
  s+=' Arrodoneix els imports finals a cèntims si cal; conserva la precisió durant els passos intermedis.';
  if(t===3)s+=' Expressa el descompte en percentatge del preu inicial.';
  if([6,7].includes(t))s+=' Considera només els interessos indicats, sense impostos ni comissions.';
 }
 return s;
}
async function figure(svg,id){
 const view=svg.viewBox.baseVal,width=Math.min(400,view.width),height=width*view.height/view.width;
 const alt=svg.getAttribute('aria-label')||'Figura de l’exercici';
 svg.setAttribute('xmlns','http://www.w3.org/2000/svg');
 const data=new XMLSerializer().serializeToString(svg);
 return new Promise((resolve,reject)=>{const url=URL.createObjectURL(new Blob([data],{type:'image/svg+xml'})),im=new Image();im.onload=()=>{const c=document.createElement('canvas');c.width=Math.round(width*3);c.height=Math.round(height*3);const ctx=c.getContext('2d');ctx.fillStyle='white';ctx.fillRect(0,0,c.width,c.height);ctx.drawImage(im,0,0,c.width,c.height);URL.revokeObjectURL(url);resolve({data:c.toDataURL('image/png'),width,height,alt});};im.onerror=()=>{URL.revokeObjectURL(url);reject(Error('No s’ha pogut preparar la figura. Torna-ho a provar.'));};im.src=url;});
}
async function adapt(id,q){
 const el=document.createElement('div');el.innerHTML=q.question;const svg=el.querySelector('svg');
 const question=paperQuestion(id,q),options=q.allowOpen===false?q.options.map(plain):[];
 let answer=plain(q.correct),steps=q.solution.map(plain);
 if(id==='reals4t'&&[4,8].includes(q.type)){
  const values=steps.flatMap(s=>[...s.matchAll(/=\s*(-?\d+)/g)].map(m=>m[1]));
  if(values.length)answer=values.at(-1)+'; '+answer;
 }
 if(id==='operacions4t'&&q.type===6){
  const [population,rate,years]=plain(q.question).match(/\d+/g).map(Number),factor=1+rate/100,value=population*factor**years;
  answer=Math.round(value)+' habitants';
  steps=[`Factor anual: 1 + ${rate}/100 = ${fmtNum(factor,2)}.`,`Model: ${population} × (${fmtNum(factor,2)})^${years} ≈ ${fmtNum(value,4)} habitants.`,`Arrodonim al nombre enter més proper: ${answer}.`];
 }
 if(id==='operacions4t'&&q.type===8)answer+=' cm';
 if(id==='financera4t'&&q.type===10){
  const [capital,rate,years]=plain(q.question).match(/\d+/g).map(Number),factor=1+rate/100,value=capital*factor**years;
  answer=moneyStr(roundTo(value,2));
  steps=[`Factor anual: 1 + ${rate}/100 = ${fmtNum(factor,2)}.`,`Valor final sense arrodoniments intermedis: ${capital} × (${fmtNum(factor,2)})^${years} ≈ ${fmtNum(value,6)} €.`,`Arrodonim a cèntims: ${answer}.`];
 }
 if(!steps.some(s=>s.includes(answer)))steps.push('Resultat: '+answer);
 return {type:q.type,level:levels[id].findIndex(a=>a.includes(q.type))+1,question,answer,options,steps,figure:svg?await figure(svg,id):undefined};
}
const option=typeof MATH_OPTION!=='undefined'&&MATH_OPTION?' · Opció '+MATH_OPTION:'';
window.MIWorksheetConfig={id:'4eso-numeric',homeId:'screenHome',label:'4t d’ESO · Sentit numèric'+option,title:'Fitxa d’exercicis — 4t d’ESO — Sentit numèric'+option,web:'srigual-png.github.io/mates-interactives',paperQuestion,adapt,levels,topics:TOPICS.filter(t=>t.course==='4t'&&t.exam4t===true).map(t=>({id:t.id,name:t.name,levels:[1,2,3],capacities:t.id==='comptatge4t'?[undefined,undefined,25]:undefined,generate(l){const types=levels[t.id][l-1];return adapt(t.id,generators[t.id](types[Math.floor(Math.random()*types.length)]));}}))};
})();
