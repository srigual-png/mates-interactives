/* Catàleg de 2n derivat de TOPICS; ni ampliacions ni bosses de pràctica. */
(function () {
  'use strict';
  const levels={
    racionals:[[1,2,3,4,9,11],[5,6,7,10,12],[8,13,14,15]],
    fraccionsSentit:[[1,2,3,5,6,14],[4,7,9,11],[8,10,12,13,15]],
    operacionsRacionals:[[1,2,7,13,17],[3,4,5,6,11,14,16],[8,9,10,12,15,18]],
    potencies:[[1,2,3,4,5,8],[6,7,11,12,13,14],[9,10,15,16,17,18]],
    aproximacions:[[1,2,3,4,5],[6,7,10,11,12],[8,9,13,14,15]],
    proporcionalitat:[[1,2,3,4,5,6],[7,8,9,13,16,18],[10,11,12,14,15,17]],
    percentatges:[[1,2,3,4,8,16],[5,6,7,11,12,17],[9,10,13,14,15,18]],
    recomptes:[[1,2,3,6,12],[4,5,8,9,11,15],[7,10,13,14]]
  };
  const generators={racionals:genRacionals2ESO,fraccionsSentit:genFraccionsSentit2ESO,operacionsRacionals:genOperacionsRacionals2ESO,potencies:genPotencies2ESO,aproximacions:genAproximacions2ESO,proporcionalitat:genProporcionalitat2ESO,percentatges:genPercentatges2ESO,recomptes:genRecomptes2ESO};
  const supers={'⁰':'0','¹':'1','²':'2','³':'3','⁴':'4','⁵':'5','⁶':'6','⁷':'7','⁸':'8','⁹':'9','⁻':'-','⁺':'+'};
  function plain(html){
    const e=document.createElement('div');e.innerHTML=String(html).replace(/<br\s*\/?\s*>/gi,'\n').replace(/<sup>(.*?)<\/sup>/gi,'^$1');
    e.querySelectorAll('svg').forEach(s=>s.remove());
    return e.textContent.replace(/\u00a0/g,' ').replace(/✅|☑|✔/gu,'').replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺]+/g,s=>'^'+[...s].map(c=>supers[c]).join('')).replace(/[ \t]+/g,' ').replace(/\n{3,}/g,'\n\n').trim();
  }
  function paperQuestion(id,q){
    let text=plain(q.question);const nums=text.match(/-?\d+(?:[.,]\d+)?/g)||[];
    if(id==='racionals'){
      if(q.type===9)text+=' La recta va de 0 a 1 i està dividida en cinc parts iguals. Escriu la lletra del punt.';
      if(q.type===10)text=text.replace('Quin nombre','Quin dels nombres proposats');
      if(q.type===11)text+=' Indica si és una fracció, un nombre decimal o un percentatge.';
      if(q.type===12)text=text.replace('compleixen una condició','han escollit una activitat de teatre');
      if([6,7].includes(q.type))text+=' Indica quin dels dos valors és més gran o si són iguals.';
    }
    if(id==='fraccionsSentit'){
      if(q.type===3)text+=' Escriu el resultat numèric.';
      if(q.type===5)text=text.replace('del grup representa?','representen els alumnes que han triat aquesta activitat?');
      if(q.type===7)text+=' El numerador ha de correspondre a les peces vermelles i el denominador, a les blaves.';
      if(q.type===8)text=text.replace('Quina opció dona, en aquest ordre, la raó primer/segon i la fracció del total que és de primer any?','Tria l’opció que indica, primer, la raó entre els jugadors de primer i segon any i, després, la fracció de tots els jugadors que són de primer any.');
      if(q.type===9)text=`En un grup, ${nums[0]} de cada ${nums[1]} persones han escollit teatre. Un segon grup té ${nums[2]} persones i la mateixa proporció d’inscrits a teatre. Quantes persones del segon grup han escollit teatre?`;
      if(q.type===11)text=`Una recepta barreja ${nums[0]} litres de suc per cada ${nums[1]} litres d’aigua. Si utilitzem ${nums[2]} litres de suc, quants litres d’aigua calen per mantenir la mateixa proporció?`;
      if(q.type===12)text=`Una activitat té dos grups, X i Y, que sumen ${nums[2]} persones. Per cada ${nums[0]} persones del grup X, n’hi ha ${nums[1]} del grup Y. Quantes persones pertanyen al grup X?`;
      if(q.type===13)text+=' Expressa la resposta com a fracció del que tenia abans de fer cap despesa.';
      if(q.type===15)text='Quina de les afirmacions següents és incorrecta? Tria-la i explica quin error conté.';
    }
    if(id==='operacionsRacionals'){
      text=text.replace(/−\s*-(\d+(?:\/\d+)?)/g,'− (−$1)');
      if([11,12].includes(q.type))text+=' Escriu el valor que ha de substituir el quadrat □ perquè la igualtat sigui certa.';
      if(q.type===16){
        const fractions=[...text.matchAll(/(-?\d+)\/(\d+)/g)];
        if(fractions.length>=2){const [[,a,b],[,c,d]]=fractions;const wrong=`${+a+(+c)}/${+b+(+d)}`;text=`Un alumne suma directament els numeradors i els denominadors i escriu: ${a}/${b} + ${c}/${d} = ${wrong}. Quin és l’error d’aquest procediment?`;}
      }
    }
    if(id==='potencies'){
      if(q.type===2)text=text.replace('Quin producte representa','Quina de les opcions escriu com a producte de factors iguals la potència');
      if(q.type===15)text=text.replace(/(\d+)□/g,'$1^□')+' El quadrat □ ocupa el lloc d’un exponent; escriu el nombre que falta.';
      if([7,9,10].includes(q.type))text+=' Dona el resultat com a fracció irreductible o com a enter, si escau.';
      if(q.type===18)text+=' Suposa que la duplicació es produeix al final de cada hora.';
    }
    if(id==='aproximacions'){
      if([6,8,14].includes(q.type))text=text.replace('valor real','valor exacte').replace('Valor real','Valor exacte').replace('error relatiu percentual','error relatiu, expressat en percentatge');
      if(q.type===9)text='Es mesuren dues longituds de 20 m i 200 m. En totes dues mesures, l’error absolut és de 2 m. Quina mesura té un error relatiu més petit?';
      if(q.type===10)text=text.replace('Quin d’aquests','Quin dels nombres proposats');
      if(q.type===15)text+=' Utilitza l’arrodoniment habitual: quan la primera xifra eliminada és 5, s’arrodoneix cap amunt.';
    }
    if(id==='proporcionalitat'){
      if(q.type===3)text+=' Totes les unitats tenen el mateix preu. Quin és el preu de la quantitat que falta?';
      if(q.type===5)text=`En una taula de proporcionalitat directa, un valor d’una magnitud passa de ${nums[0]} a ${nums[1]}. Per quin nombre s’ha multiplicat?`;
      if(q.type===7)text+=' Escriu el nombre que ha de substituir el quadrat □.';
      if(q.type===11)text=`Es reparteixen ${nums[0]} € entre l’Anna i en Biel de manera que, per cada ${nums[1]} parts que rep l’Anna, en Biel en rep ${nums[2]}. Quants euros rep cadascú? Tria l’opció que dona primer l’import de l’Anna i després el d’en Biel.`;
      if(q.type===12)text=`Es reparteixen ${nums[0]} € entre tres persones en la raó ${nums[1]}:${nums[2]}:${nums[3]}, respectivament. Tria els tres imports en aquest mateix ordre.`;
      if(q.type===13)text=`Un vehicle recorre ${nums[0]} km en ${nums[1]} h a velocitat constant. Quants quilòmetres recorre en una hora? Expressa la velocitat en km/h.`;
      if(q.type===17)text=text.replace('En aquesta taula, quin valor de la primera fila correspon a la parella que trenca la proporcionalitat?','Les parelles de valors següents haurien de mantenir una mateixa constant de proporcionalitat, però una és incorrecta. Quin primer valor correspon a la parella que trenca la proporcionalitat?');
    }
    if(id==='percentatges'&&q.type===4)text=text.replace('compleixen una condició','han escollit una activitat de teatre');
    if(id==='recomptes'){
      if(q.type===2)text=text.replace('primers i','primers plats i').replace('segons.','segons plats.');
      if(q.type===4)text+=' Cada resultat queda definit per la combinació d’una opció de cadascuna de les tres decisions.';
      if(q.type===5)text+=' L’ordre de les lletres importa: AB i BA compten com a parelles diferents. No es pot repetir una lletra dins d’una parella.';
      if(q.type===7)text=text.replace('si Anna-Biel és la mateixa parella que Biel-Anna','si no es poden repetir persones i l’ordre no importa (Anna-Biel i Biel-Anna són la mateixa parella)');
      if(q.type===8)text+=' Es tracta de codis, no de nombres: si el 0 és una de les xifres disponibles, també pot ocupar la primera posició.';
      if(q.type===9)text+=' L’ordre importa: intercanviar dos símbols diferents dona un codi diferent.';
      if(q.type===10)text+=' Cada conjunt conté una samarreta i uns pantalons; totes les peces es consideren diferents.';
      if(q.type===13)text+=' Cada equip juga una vegada contra cadascun dels altres; no hi ha partits de tornada.';
    }
    return text;
  }
  let lineFigure;
  function figure(svg){
    if(!lineFigure)lineFigure=new Promise((resolve,reject)=>{
      svg.setAttribute('xmlns','http://www.w3.org/2000/svg');
      const url=URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(svg)],{type:'image/svg+xml'})),im=new Image();
      im.onload=()=>{const canvas=document.createElement('canvas');canvas.width=1110;canvas.height=270;const ctx=canvas.getContext('2d');ctx.fillStyle='white';ctx.fillRect(0,0,1110,270);ctx.drawImage(im,0,0,1110,270);URL.revokeObjectURL(url);resolve({data:canvas.toDataURL('image/png'),width:370,height:90,alt:'Recta de 0 a 1 dividida en cinc parts iguals, amb els punts interiors A, B, C i D d’esquerra a dreta.'});};
      im.onerror=()=>{URL.revokeObjectURL(url);lineFigure=null;reject(new Error('No s’ha pogut preparar la recta numèrica. Torna-ho a provar.'));};im.src=url;
    });return lineFigure;
  }
  async function adapt(id,q){
    const el=document.createElement('div');el.innerHTML=q.question;const svg=el.querySelector('svg');
    const question=paperQuestion(id,q),options=(q.allowOpen===false||(id==='racionals'&&q.type===10))?q.options.map(plain):[];
    let answer=plain(q.correct),steps=q.solution.map(plain);
    if(id==='racionals'&&q.type===11)steps=[`La quantitat està escrita amb el símbol %.`,`Per tant, la representació ${plain(q.question).match(/\d+%/)?.[0]||''} és un percentatge.`];
    if(id==='fraccionsSentit'){
      if([1,11].includes(q.type))answer+=' L';
      if([4,5,9,12].includes(q.type)&&/persones|alumnes/.test(question)&&/^\d+$/.test(answer))answer+=' persones';
      if(q.type===13){const f=[...question.matchAll(/(\d+)\/(\d+)/g)];if(f.length>=2){const [[,a,b],[,c,d]]=f;steps=[`Després de la primera despesa queda 1 − ${a}/${b} = ${b-a}/${b} del total inicial.`,`De la quantitat restant conserva 1 − ${c}/${d} = ${d-c}/${d}.`,`La fracció conservada del total inicial és (${b-a}/${b}) × (${d-c}/${d}) = ${plain(q.correct)}.`];}}
    }
    if(id==='potencies'){
      const match=question.match(/(\([^()]+\)|\d+)\^(-?\d+)/);
      if(match&&[7,9,10].includes(q.type)){
        const base=match[1].replace(/[()]/g,''),exponent=+match[2],parts=base.split('/').map(Number),n=parts[0],d=parts[1]||1,e=Math.abs(exponent);
        const nn=exponent<0?d*Math.sign(n):n,dd=exponent<0?Math.abs(n):d;
        steps=[...(exponent<0?[`L’exponent negatiu inverteix la base: (${base})^${exponent} = (${nn}/${dd})^${e}.`]:[]),`Elevem numerador i denominador: (${nn}/${dd})^${e} = ${nn**e}/${dd**e}.`,`Simplifiquem i obtenim ${answer}.`];
      }
    }
    if(id==='operacionsRacionals'&&q.type===18){if(/°C/.test(question))answer+=' °C';else if(/€/.test(question))answer+=' €';else if(/km/.test(question))answer+=' km';else if(/\bm\b/.test(question))answer+=' m';}
    if(id==='operacionsRacionals'&&[3,4,5,16].includes(q.type)){
      const fractions=[...question.matchAll(/(-?\d+)\/(\d+)/g)];
      if(fractions.length>=2){const [[,aa,bb],[,cc,dd]]=fractions,[a,b,c,d]=[aa,bb,cc,dd].map(Number);
        if([3,16].includes(q.type)){const minus=q.type===3&&/−/.test(question),common=b*d/gcd(b,d),n1=a*common/b,n2=c*common/d,result=ratText(rat(minus?n1-n2:n1+n2,common));steps=[`Denominador comú: mcm(${b}, ${d}) = ${common}.`,`${a}/${b} = ${n1}/${common} i ${c}/${d} = ${n2}/${common}.`,`${n1}/${common} ${minus?'−':'+'} ${n2}/${common} = ${result}.`,...(q.type===16?['No es poden sumar directament els denominadors: les parts han de tenir la mateixa mida.']:[])];}
        else if(q.type===4)steps=[`Multipliquem els numeradors: ${a} × ${c} = ${a*c}.`,`Multipliquem els denominadors: ${b} × ${d} = ${b*d}.`,`Simplifiquem ${a*c}/${b*d} i obtenim ${answer}.`];
        else {const rn=d*Math.sign(c),rd=Math.abs(c);steps=[`Dividir per ${c}/${d} equival a multiplicar per ${rn}/${rd}.`,`(${a}/${b}) × (${rn}/${rd}) = ${a*rn}/${b*rd}.`,`Simplifiquem i obtenim ${answer}.`];}
      }
    }
    if(id==='aproximacions'&&q.type===13)answer+=' habitants';
    if(id==='proporcionalitat'&&[4,8,14,16].includes(q.type)&&/^[-\d,.]+$/.test(answer))answer+=({4:' €',8:' €',14:' entrades',16:' g'})[q.type];
    if(id==='percentatges'&&q.type===8&&!/€/.test(answer))answer+=' €';
    if(id==='percentatges'&&q.type===18)answer+=' noies';
    // Una línia final sempre relaciona el procediment amb les dades concretes.
    if(!steps.some(s=>s.includes(answer)))steps.push('Resultat: '+answer);
    return {type:q.type,level:levels[id].findIndex(types=>types.includes(q.type))+1,question,options,answer,steps,figure:svg?await figure(svg):undefined};
  }
  window.MIWorksheetConfig={id:'2eso-numeric',homeId:'screenHome',label:'2n d’ESO · Sentit numèric',title:'Fitxa d’exercicis — 2n d’ESO — Sentit numèric',web:'srigual-png.github.io/mates-interactives',paperQuestion,adapt,levels,
    topics:TOPICS.filter(t=>t.course==='2n'&&t.exam2n).map(t=>({id:t.id,name:t.name,levels:[1,2,3],capacities:t.id==='recomptes'?[38,49,11]:undefined,generate(l){const types=levels[t.id][l-1],type=types[Math.floor(Math.random()*types.length)];return adapt(t.id,generators[t.id](type));}}))};
})();
