/* Fitxes de 3r: adaptació del catàleg curricular existent. */
(function(){
'use strict';
const levels={
racionals3r:[[1,2,3,5],[4,6,7,9],[8,10,11,12]],
generatriu3r:[[1,2,3,9],[4,5,7,12],[6,8,10,11]],
reals3r:[[1,2,3,4],[5,6,7,8],[9,10,11,12]],
aproximacions3r:[[1,2,3,4],[5,6,8,9],[7,10,11,12]],
potencies3r:[[1,2,4,5,6],[3,7,8,9,12,14],[10,11,13,15,16]],
notacio3r:[[1,2,3,4,5,17,18],[6,7,8,9,15,16],[10,11,12,13,14]],
proporcionalitat3r:[[1,2,3,4,7,10],[5,6,9,11,12,14],[8,13,15]],
recomptes3r:[[1,2,6,11,14,15],[3,4,9,12],[5,7,8,10,13,16]]};
const generators={racionals3r:genRacionals3ESO,generatriu3r:genGeneratriu3ESO,reals3r:genReals3ESO,aproximacions3r:genAproximacions3ESO,potencies3r:genPotencies3ESO,notacio3r:genNotacio3ESO,proporcionalitat3r:genProporcionalitat3ESO,recomptes3r:genRecomptes3ESO};
const supers={'⁰':'0','¹':'1','²':'2','³':'3','⁴':'4','⁵':'5','⁶':'6','⁷':'7','⁸':'8','⁹':'9','⁻':'-','⁺':'+'};
function plain(html){
 const el=document.createElement('div');el.innerHTML=String(html).replace(/<br\s*\/?\s*>/gi,'\n').replace(/<sup>(.*?)<\/sup>/gi,'^$1');
 el.querySelectorAll('.periodic').forEach(e=>e.replaceWith('('+e.textContent+')'));
 el.querySelectorAll('svg').forEach(e=>e.remove());
 el.querySelectorAll('table').forEach(e=>{const rows=[...e.rows].map((r,i)=>(i===0?'Primera fila (x): ':'Segona fila (y): ')+[...r.cells].map(c=>c.textContent).join(' | '));e.replaceWith('\n'+rows.join('\n')+'\n');});
 el.querySelectorAll('div').forEach(e=>e.append(document.createTextNode('\n')));
 return el.textContent.replace(/ℝ\s*∖\s*ℚ/g,'irracionals').replace(/[ℕℤℚℝ]/g,c=>({'ℕ':'naturals','ℤ':'enters','ℚ':'racionals','ℝ':'reals'})[c]).replace(/⊂/g,'està inclòs en').replace(/∅/g,'conjunt buit').replace(/∈/g,' pertany a ').replace(/∉/g,' no pertany a ').replace(/\u00a0/g,' ').replace(/✅|☑|✔/gu,'').replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺]+/g,s=>'^'+[...s].map(c=>supers[c]).join('')).replace(/[ \t]+/g,' ').replace(/\n{3,}/g,'\n\n').trim();
}
function paperQuestion(id,q){
 let s=plain(q.question),t=q.type;
 if(id==='generatriu3r')s+=' Notació: les xifres entre parèntesis es repeteixen indefinidament; per exemple, 0,1(6) = 0,1666…';
 if(id==='racionals3r'){
  if(t===11)s+=' Expressa la resposta com a fracció de la capacitat total del dipòsit.';
  if([5,6,7,8,9].includes(t))s+=' Dona el resultat com a fracció irreductible o com a enter, si escau.';
 }
 if(id==='reals3r'){
  s=s.replace('sense període','infinit no periòdic');
  if(t===12)s='Suposa que a < b. Quin interval conté tots els nombres entre a i b, però no inclou cap dels dos extrems?';
  if(t===11)s+=' A la recta, un cercle ple inclou l’extrem i un cercle buit l’exclou.';
 }
 if(id==='aproximacions3r'){
  if(t===6)s+=' Arrodoneix a la precisió indicada.';
  if(t===10)s+=' Utilitza l’arrodoniment habitual: si la primera xifra eliminada és 5, s’arrodoneix cap amunt.';
  if(t===11)s+=' Busca el nombre mínim d’autocars necessari perquè tothom viatgi assegut.';
 }
 if(id==='potencies3r'&&t===12)s=s.replace(/(\d+)□/g,'$1^□')+' Escriu l’exponent que ha de substituir el quadrat □.';
 if(id==='notacio3r'){
  if(t===9)s=s.replace(/segons la convenció d’aquest bloc/gi,'prenent com a ordre de magnitud el factor 10^n de l’expressió a · 10^n, amb 1 ≤ a < 10');
  if([1,2,6,10,11,12,13,14,15].includes(t))s+=' Escriu-la en forma a · 10^n, amb 1 ≤ a < 10.';
  if([17,18].includes(t))s+=' En la notació de calculadora, E significa «multiplicat per 10 elevat a».';
 }
 if(id==='proporcionalitat3r'){
  if([1,2,3].includes(t))s+=' Els valors d’una mateixa columna formen una parella (x, y).';
  if(t===4)s+=' Utilitza la relació y = k · x.';
  if(t===10)s+=' Utilitza la relació y = k/x.';
  if(t===6)s+=' Tots els treballadors tenen el mateix rendiment i fan la mateixa feina.';
  if(t===8)s+=' Les tres parts segueixen l’ordre de la raó indicada.';
 }
 if(id==='recomptes3r'){
  if(t===1)s+=' Cada conjunt conté una samarreta i uns pantalons; totes les peces són diferents.';
  if(t===2)s=s.replace('permet triar','ofereix')+' Cada menú inclou exactament un entrant, un plat principal i unes postres.';
  if([4,12].includes(t))s+=' L’ordre dels símbols importa: intercanviar dos símbols diferents dona un resultat diferent.';
  if(t===5)s+=' Es poden repetir xifres.';
  if(t===7)s+=' Cal col·locar tots els llibres, una sola vegada cadascun.';
  if(t===13)s+=' No hi ha partits de tornada.';
  if(t===15){const nums=q.solution[0].match(/\d+/g),ends=q.solution[1].match(/\d+/g);if(nums&&ends)s=`Un arbre té ${nums[0]} branques al primer nivell. De cadascuna surten ${ends[0]} branques més, que acaben en una fulla. Quantes fulles finals té l’arbre en total?`;}
  if(t===16)s+=' Cada parella té dues persones diferents i l’ordre no importa: A–B i B–A són la mateixa parella.';
 }
 return s;
}
async function figure(svg){
 svg.setAttribute('xmlns','http://www.w3.org/2000/svg');
 const data=new XMLSerializer().serializeToString(svg);
 return new Promise((resolve,reject)=>{const url=URL.createObjectURL(new Blob([data],{type:'image/svg+xml'})),im=new Image();im.onload=()=>{const c=document.createElement('canvas');c.width=1200;c.height=276;const ctx=c.getContext('2d');ctx.fillStyle='white';ctx.fillRect(0,0,c.width,c.height);ctx.drawImage(im,0,0,c.width,c.height);URL.revokeObjectURL(url);resolve({data:c.toDataURL('image/png'),width:400,height:92,alt:'Interval representat a la recta numèrica. Els cercles plens inclouen els extrems i els buits els exclouen.'});};im.onerror=()=>{URL.revokeObjectURL(url);reject(Error('No s’ha pogut preparar la recta numèrica. Torna-ho a provar.'));};im.src=url;});
}
async function adapt(id,q){
 const el=document.createElement('div');el.innerHTML=q.question;const svg=el.querySelector('svg');
 const question=paperQuestion(id,q),answer=plain(q.correct),options=q.allowOpen===false?q.options.map(plain):[],steps=q.solution.map(s=>id==='potencies3r'&&/ᵐ|ⁿ/.test(s)?({4:'En multiplicar potències de la mateixa base, se sumen els exponents.',5:'En dividir potències de la mateixa base, es resta l’exponent del divisor al del dividend.',6:'En elevar una potència a una altra potència, es multipliquen els exponents.',7:'La potència d’un producte és el producte de les potències dels factors.',8:'La potència d’un quocient és el quocient de les potències del numerador i del denominador.'}[q.type]||plain(s)):plain(s));
 if(!steps.some(s=>s.includes(answer)))steps.push('Resultat: '+answer);
 return {type:q.type,level:levels[id].findIndex(a=>a.includes(q.type))+1,question,answer,options,steps,figure:svg?await figure(svg):undefined};
}
window.MIWorksheetConfig={id:'3eso-numeric',homeId:'screenHome',label:'3r d’ESO · Sentit numèric',title:'Fitxa d’exercicis — 3r d’ESO — Sentit numèric',web:'srigual-png.github.io/mates-interactives',paperQuestion,adapt,levels,topics:TOPICS.filter(t=>t.course==='3r'&&t.exam3r).map(t=>({id:t.id,name:t.name,levels:[1,2,3],capacities:t.id==='recomptes3r'?[undefined,undefined,24]:undefined,generate(l){const types=levels[t.id][l-1];return adapt(t.id,generators[t.id](types[Math.floor(Math.random()*types.length)]));}}))};
})();
