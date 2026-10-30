/* Famílies web de raonament de 1r numèric. No altera els generadors base de les fitxes. */
(function(root){
  'use strict';
  const high=1001,medium=1002;
  const integer=(r,a,b)=>a+Math.floor(r()*(b-a+1));
  const pick=(r,a)=>a[integer(r,0,a.length-1)];
  const permutations=a=>a.length?a.flatMap((x,i)=>permutations(a.filter((_,j)=>j!==i)).map(rest=>[x,...rest])):[[]];
  const fmt=c=>(c/100).toFixed(2).replace('.',',');
  function task(desc,data,question,answer,guide,solution){
    if(!Number.isSafeInteger(answer))throw Error('Resposta no entera: '+desc.id);
    const wrong=[answer+1,answer-1,answer+2,answer+3].filter(n=>n>=0&&n!==answer).slice(0,3);
    return {type:desc.level===3?high:medium,reasoningFamily:desc.id,reasoningData:data,question,correct:String(answer),options:[String(answer),...wrong.map(String)],guide,solution,isProblem:true,allowOpen:true,diff:desc.level};
  }
  const catalog=[
    {id:'paquets-exactes',topic:'naturals',level:3,reason:'Planificar una combinació exacta de dos formats i demostrar que minimitza el nombre de paquets.',build(r){
      const [a,b]=pick(r,[[4,7],[5,8],[6,10],[7,11]]),x=b+integer(r,1,4),y=a+integer(r,1,4),total=a*x+b*y;
      const candidates=[];for(let i=1;i*a<total;i++)if((total-i*a)%b===0&&total-i*a>=b)candidates.push([i,(total-i*a)/b]);
      const best=candidates.reduce((v,p)=>p[0]+p[1]<v[0]+v[1]?p:v);
      return task(this,{a,b,total},`Cal repartir exactament ${total} adhesius. Hi ha paquets de ${a} i de ${b} adhesius. Has d'utilitzar almenys un paquet de cada format i no pot sobrar cap adhesiu. Quin és el nombre mínim de paquets?`,best[0]+best[1],['Organitza les combinacions que donen el total exacte.','Compara el nombre de paquets; utilitzar només el format gran no està permès.'],[`Les combinacions exactes (paquets petits, grans) són: ${candidates.map(p=>'('+p.join(', ')+')').join('; ')}.`,`La millor és ${best[0]} × ${a} + ${best[1]} × ${b} = ${total}.`,`Utilitza ${best[0]+best[1]} paquets; cap combinació admissible en necessita menys.`]);
    }},
    {id:'xifres-amb-condicions',topic:'decimal_sys',level:3,reason:'Coordinar valor posicional, paritat i ús únic de les xifres per construir el màxim.',build(r){
      const evens=pick(r,[[2,4],[2,6],[2,8],[4,6],[4,8],[6,8]]),odds=pick(r,[[1,3],[1,5],[1,7],[1,9],[3,5],[3,7],[3,9],[5,7],[5,9],[7,9]]),digits=[...evens,...odds];
      const candidates=permutations(digits).filter(p=>p[3]%2===0).map(p=>Number(p.join(''))),answer=Math.max(...candidates);
      return task(this,{digits},`Amb les xifres ${digits.join(', ')}, forma el nombre parell de quatre xifres més gran possible. Has de fer servir cada xifra exactament una vegada. Quin nombre obtens?`,answer,['Una unitat parella és obligatòria.','Compara les millors ordenacions per a cadascuna de les dues unitats possibles.'],evens.map(unit=>{const rest=digits.filter(d=>d!==unit).sort((a,b)=>b-a);return `Si la unitat és ${unit}, el màxim és ${rest.join('')}${unit}.`;}).concat(`El més gran és ${answer}.`));
    }},
    {id:'canvi-posicional',topic:'decimal_sys',level:2,reason:'Relacionar dos valors posicionals i calcular el canvi de contribució al nombre.',build(r){
      const digit=integer(r,2,9),[from,to]=pick(r,[[10,1000],[1,100],[100,10000]]),answer=digit*(to-from);
      return task(this,{digit,from,to},`La contribució d'una xifra ${digit} passa de ${digit} × ${from} a ${digit} × ${to}. Les altres contribucions no canvien. En quant augmenta el nombre?`,answer,['Calcula el valor antic i el nou.','Compara els dos valors, sense sumar-los.'],[`Valor antic: ${digit*from}. Valor nou: ${digit*to}.`,`Augment: ${digit*to} − ${digit*from} = ${answer}.`]);
    }},
    {id:'compra-combinada',topic:'ops',bankKey:'naturals-raonament',level:3,reason:'Comparar compres mixtes, excés d’unitats i cost mínim; el preu unitari sol no resol el problema.',build(r){
      let data;for(let attempt=0;attempt<80;attempt++){
        const a=integer(r,3,6),b=a+integer(r,2,4),pa=a+integer(r,1,3),pb=b+integer(r,0,2),need=integer(r,a+b,a+b+12),all=[];
        for(let x=0;x<=Math.ceil(need/a);x++)for(let y=0;y<=Math.ceil(need/b);y++)if(a*x+b*y>=need)all.push({x,y,cost:pa*x+pb*y});
        const best=all.reduce((v,p)=>p.cost<v.cost?p:v);if(best.x&&best.y&&best.cost<Math.min(Math.ceil(need/a)*pa,Math.ceil(need/b)*pb)){data={a,b,pa,pb,need,best};break;}
      }
      if(!data)data={a:4,b:7,pa:5,pb:8,need:11,best:{x:1,y:1,cost:13}};
      const {a,b,pa,pb,need,best}=data;
      return task(this,{a,b,pa,pb,need},`Necessites almenys ${need} llapis. Els paquets A tenen ${a} llapis i costen ${pa} €; els B tenen ${b} llapis i costen ${pb} €. Pots combinar formats i poden sobrar llapis. Quin és el cost mínim, en euros?`,best.cost,['Compara compres de tots dos formats, també les mixtes.','Per cada nombre de paquets B, calcula quants A falten per cobrir la necessitat.'],[`Per cada y de 0 a ${Math.ceil(need/b)}, calen com a mínim max(0, arrodoniment superior de (${need} − ${b}y)/${a}) paquets A.`,`Comparant-ne els costos, una compra òptima és ${best.x} paquets A i ${best.y} B: ${best.x*a+best.y*b} llapis.`,`Cost mínim: ${best.x} × ${pa} + ${best.y} × ${pb} = ${best.cost} €.`]);
    }},
    {id:'dos-quadrats-invers',topic:'potencies',bankKey:'potencies-raonament',level:3,reason:'Reconstruir dues disposicions quadrades amb una relació entre costats i un total conjunt, sense equacions de segon grau.',build(r){
      const side=integer(r,4,12),gap=integer(r,2,4),total=side*side+(side+gap)**2;
      return task(this,{gap,total},`Dos mosaics quadrats utilitzen en total ${total} rajoles. El costat del gran té ${gap} rajoles més que el del petit. No se superposen. Quantes rajoles té el mosaic gran?`,(side+gap)**2,['Prova parelles de costats enters que es diferenciïn en la quantitat indicada.','El total és la suma de les dues àrees, no el quadrat de la suma dels costats.'],[`Cal cercar dos quadrats de costats n i n + ${gap} amb àrees que sumin ${total}.`,`${side}² + ${side+gap}² = ${side*side} + ${(side+gap)**2} = ${total}.`,`La suma creix amb n, per tant no hi ha una altra parella de costats positius.`,`El mosaic gran té ${(side+gap)**2} rajoles.`]);
    }},
    {id:'fila-columna',topic:'potencies',level:2,reason:'Relacionar una potència amb dos conjunts de rajoles i evitar comptar dues vegades la cantonada.',build(r){
      const side=integer(r,4,15),answer=(side-1)**2;
      return task(this,{side},`Un mosaic quadrat té ${side} files de ${side} rajoles. Es retira tota la fila superior i tota la columna de l'esquerra. Quantes rajoles queden?`,answer,['La cantonada pertany a la fila i a la columna.','Pots comptar el quadrat que queda o restar les rajoles retirades sense repetir-ne cap.'],[`Inicialment hi ha ${side}² = ${side*side} rajoles.`,`Es retiren ${side} + ${side} − 1 = ${2*side-1}, perquè la cantonada només es retira una vegada.`,`Queden ${side*side} − ${2*side-1} = ${answer}, també (${side} − 1)².`]);
    }},
    {id:'parentesis-resultat-positiu',topic:'jerarquia',bankKey:'jerarquia-raonament',level:3,reason:'Explorar agrupacions admissibles, respectar l’ordre i discriminar el mínim estrictament positiu.',build(r){
      let a,b,c,d,values;for(let i=0;i<80;i++){a=integer(r,2,15);b=integer(r,2,9);c=integer(r,2,9);d=integer(r,2,15);values=[(a+b)*c-d,a+b*c-d,(a+b)*(c-d),a+b*(c-d)];if(new Set(values.filter(v=>v>0)).size>=3)break;}
      if(new Set(values.filter(v=>v>0)).size<3){a=10;b=3;c=5;d=2;values=[63,23,39,19];}
      const answer=Math.min(...values.filter(v=>v>0));
      return task(this,{a,b,c,d},`A l'expressió ${a} + ${b} × ${c} − ${d}, pots afegir parèntesis sense canviar l'ordre dels nombres ni els signes. Quin és el resultat estrictament positiu més petit que pots obtenir?`,answer,['Explora les agrupacions possibles, també les que inclouen una resta dins del parèntesi.','Descarta zero i resultats negatius abans de comparar.'],[`Les cinc agrupacions completes donen: ((${a}+${b})×${c})−${d} = ${values[0]}; (${a}+(${b}×${c}))−${d} = ${values[1]}; (${a}+${b})×(${c}−${d}) = ${values[2]}; ${a}+((${b}×${c})−${d}) = ${values[1]}; ${a}+(${b}×(${c}−${d})) = ${values[3]}.`,`El mínim estrictament positiu és ${answer}.`]);
    }},
    {id:'divisibilitat-condicions',topic:'divis',bankKey:'divis-raonament',level:3,reason:'Combinar criteris de divisibilitat i restriccions posicionals, cercant i contrastant candidats.',build(r){
      let first,last,candidates;for(let i=0;i<80;i++){first=integer(r,1,9);last=pick(r,[2,4,6,8]);candidates=[];for(let x=0;x<100;x++){const n=1000*first+10*x+last;if(n%9===0&&n%4===0&&n%8!==0)candidates.push(n);}if(candidates.length>=3)break;}
      if(candidates.length<3){first=1;last=4;candidates=[1044,1404,1764];}
      const answer=Math.min(...candidates);
      return task(this,{first,last},`Completa ${first}□□${last} amb dues xifres (poden ser zero o repetir-se). El nombre ha de ser divisible per 9 i per 4, però no per 8. Quin és el nombre més petit que compleix totes les condicions?`,answer,['Combina la suma de xifres amb les dues últimes xifres.','Comprova el criteri del 8 i compara només els candidats admissibles.'],[`Els candidats que compleixen totes tres condicions són ${candidates.join(', ')}.`,`S'han comprovat les dues xifres desconegudes de 00 a 99, mantenint les posicions fixes.`,`El més petit és ${answer}: és múltiple de 9 i de 4, però no de 8.`]);
    }},
    {id:'coincidencies-desfasades',topic:'mcmmcd',bankKey:'mcmmcd-raonament',level:3,reason:'Coordinar progressions periòdiques amb inicis diferents i un llindar; aplicar només mcm als intervals no determina la primera coincidència.',build(r){
      const [a,b]=pick(r,[[4,6],[6,8],[6,9],[8,12]]);const seed=pick(r,Array.from({length:61},(_,i)=>i+10).filter(n=>n%a!==n%b)),oa=seed%a,ob=seed%b;
      const after=integer(r,0,50);let answer=after+1;while(answer<oa||answer<ob||(answer-oa)%a||(answer-ob)%b)answer++;
      return task(this,{a,b,oa,ob,after},`El servei A surt per primer cop al minut ${oa} i després cada ${a} minuts. El B surt per primer cop al minut ${ob} i després cada ${b} minuts. Quin és el primer minut estrictament posterior al ${after} en què surten alhora?`,answer,['Els serveis no han començat alhora: conserva els dos inicis.','Cerca un temps que pertanyi a totes dues llistes i superi estrictament el llindar.'],[`A: ${Array.from({length:Math.floor((answer-oa)/a)+1},(_,i)=>oa+i*a).join(', ')}.`,`B: ${Array.from({length:Math.floor((answer-ob)/b)+1},(_,i)=>ob+i*b).join(', ')}.`,`La primera coincidència posterior al minut ${after} és al minut ${answer}.`]);
    }},
    {id:'moviments-amb-limits',topic:'enters',bankKey:'enters-raonament',level:3,reason:'Explorar ordres de moviments amb signes i validar tots els estats intermedis contra dos límits.',build(r){
      let start,a,b,c,lower,upper,valid;for(let i=0;i<100;i++){start=integer(r,0,5);a=integer(r,3,8);b=integer(r,9,13);c=-integer(r,5,14);lower=-integer(r,0,5);upper=integer(r,10,18);valid=permutations([a,b,c]).filter(order=>{let pos=start;return order.every(v=>{pos+=v;return pos>=lower&&pos<=upper;});});if(valid.length>=1&&valid.length<=5)break;}
      if(!valid.length||valid.length===6){start=0;a=6;b=9;c=-8;lower=0;upper=12;valid=[[9,-8,6]];}
      const sign=n=>n>0?'+'+n:String(n);
      return task(this,{start,moves:[a,b,c],lower,upper},`Comences a ${start} en una recta numèrica. Has d'aplicar els tres moviments ${sign(a)}, ${sign(b)} i ${sign(c)}, una vegada cadascun, en l'ordre que triïs. Després de CADA moviment, la posició ha de quedar entre ${lower} i ${upper}, inclosos. Quants ordres diferents són possibles?`,valid.length,['Amb tres moviments diferents hi ha sis ordres que pots llistar.','El saldo final és el mateix, però les posicions intermèdies poden incomplir els límits.'],[`Els ordres admissibles són: ${valid.map(p=>p.map(sign).join(', ')).join('; ')}.`,`S'han descartat els altres ordres perquè alguna posició intermèdia queda fora de [${lower}, ${upper}].`,`Hi ha ${valid.length} ordres possibles.`]);
    }},
    {id:'volum-amb-error',topic:'decimals',bankKey:'decimals-raonament',level:3,reason:'Escollir el pitjor cas en dues direccions i comprovar simultàniament suficiència i capacitat abans de decidir un enter.',build(r){
      const nominal=integer(r,40,90),error=integer(r,1,4),n=integer(r,4,10),needed=n*(nominal-error)-integer(r,1,nominal-error-1),capacity=n*(nominal+error)+integer(r,0,nominal+error-1),impossible=integer(r,0,3)===0;
      const cap=impossible?(n-1)*(nominal+error):capacity,need=impossible?integer(r,(n-1)*(nominal-error)+1,Math.min(n*(nominal-error),cap)):needed,answer=Math.ceil(need/(nominal-error))<=Math.floor(cap/(nominal+error))?Math.ceil(need/(nominal-error)):0;
      return task(this,{nominal,error,needed:need,capacity:cap},`Cada ampolla conté ${fmt(nominal)} L, amb error absolut com a màxim ${fmt(error)} L. El contingut de cada ampolla pot ser qualsevol valor dins d'aquest marge. Vols abocar-les SENCERES en un dipòsit de ${fmt(cap)} L i garantir almenys ${fmt(need)} L sense que mai vessi. Quin és el nombre mínim d'ampolles que ho garanteix? Respon 0 si no n'hi ha cap.`,answer,['Per garantir la quantitat mínima, considera ampolles amb el contingut mínim possible.','Per evitar vessaments, considera el màxim possible i contrasta els dos límits.'],[`Cada ampolla pot contenir entre ${fmt(nominal-error)} i ${fmt(nominal+error)} L.`,`Per garantir la quantitat calen com a mínim ${Math.ceil(need/(nominal-error))} ampolles.`,`Per no vessar se'n poden abocar com a màxim ${Math.floor(cap/(nominal+error))}.`,answer?`El mínim compatible és ${answer}.`:'Els límits són incompatibles: cap nombre d’ampolles ho garanteix; resposta 0.']);
    }},
    {id:'fraccions-reconstruccio',topic:'fraccions',bankKey:'fraccions-raonament',level:3,reason:'Reconstruir el total desfent en ordre invers dues fraccions sobre bases diferents i una retirada fixa.',build(r){
      const b=integer(r,3,7),a=integer(r,1,b-2),d=integer(r,3,7),c=integer(r,1,d-2),k=integer(r,4,12),initial=b*d*k,remaining=(b-a)*(d-c)*k,reserve=integer(r,1,Math.floor(remaining/2)),left=remaining-reserve;
      return task(this,{a,b,c,d,reserve,left},`Una botiga ven ${a}/${b} de les unitats que tenia. Després regala ${c}/${d} de les que quedaven i finalment en retira ${reserve} per a una exposició. Al final en queden ${left}. Quantes unitats tenia inicialment?`,initial,['Desfés primer la retirada fixa.','Reconstrueix el total anterior a cada fracció, respectant que tenen bases diferents.'],[`Abans de retirar-ne ${reserve}, quedaven ${left} + ${reserve} = ${remaining}.`,`Aquesta quantitat és ${d-c}/${d} de la que hi havia abans de regalar: ${remaining} ÷ ${d-c} × ${d} = ${(b-a)*d*k}.`,`Això és ${b-a}/${b} del total inicial: ${(b-a)*d*k} ÷ ${b-a} × ${b} = ${initial}.`,`Comprovació: es venen ${a*d*k}, es regalen ${(b-a)*c*k} i se'n retiren ${reserve}; queden ${left}.`]);
    }},
    {id:'produccio-amb-pressupost',topic:'proporcionalitat',bankKey:'proporcionalitat-raonament',level:3,reason:'Deducció de dos ritmes proporcionals i elecció d’hores enteres amb pressupost i límits de disponibilitat.',build(r){
      let rateA,rateB,costA,costB,hoursA,hoursB,budget,best;
      for(let attempt=0;attempt<80;attempt++){
        rateA=integer(r,6,12);rateB=integer(r,13,20);costA=integer(r,5,8);costB=integer(r,9,12);hoursA=integer(r,2,4);hoursB=integer(r,2,4);budget=integer(r,22,42);const all=[];
        for(let x=0;x<=hoursA;x++)for(let y=0;y<=hoursB;y++)if(costA*x+costB*y<=budget)all.push({x,y,made:rateA*x+rateB*y});
        best=all.reduce((v,p)=>p.made>v.made?p:v);
        if(best.x&&best.y&&budget<costA*hoursA+costB*hoursB&&best.made>Math.max(Math.min(hoursA,Math.floor(budget/costA))*rateA,Math.min(hoursB,Math.floor(budget/costB))*rateB))break;
      }
      if(!best.x||!best.y||budget>=costA*hoursA+costB*hoursB||best.made<=Math.max(Math.min(hoursA,Math.floor(budget/costA))*rateA,Math.min(hoursB,Math.floor(budget/costB))*rateB)){rateA=9;rateB=14;costA=7;costB=9;hoursA=4;hoursB=4;budget=34;best={x:1,y:3,made:51};}
      return task(this,{madeA:rateA*2,timeA:2,madeB:rateB*3,timeB:3,costA,costB,hoursA,hoursB,budget},`A ritme constant, la màquina A fabrica ${rateA*2} peces en 2 hores i la B, ${rateB*3} peces en 3 hores. Fer funcionar A costa ${costA} €/h i B costa ${costB} €/h. Pots utilitzar A fins a ${hoursA} hores i B fins a ${hoursB}, sempre hores senceres (també 0). Amb ${budget} € de pressupost total, quantes peces pots fabricar com a màxim?`,best.made,['Troba el ritme de cada màquina; no comparis directament totals corresponents a temps diferents.','Organitza les combinacions d’hores, comprova cost i disponibilitat, i compara’n les produccions.'],[`Ritmes: A = ${rateA*2} ÷ 2 = ${rateA} peces/h; B = ${rateB*3} ÷ 3 = ${rateB} peces/h.`,`Per a cada nombre d'hores B entre 0 i ${hoursB}, prova les hores A entre 0 i ${hoursA} que no superin ${budget} €.`,`Una combinació òptima és A: ${best.x} h i B: ${best.y} h, amb cost ${best.x*costA+best.y*costB} €.`,`Producció màxima: ${best.x} × ${rateA} + ${best.y} × ${rateB} = ${best.made} peces.`]);
    }},
    {id:'llindar-ofertes',topic:'percentatges',bankKey:'percentatges-raonament',level:3,reason:'Cercar un llindar enter desconegut, comparar models de descompte i distingir igualtat de millora estricta.',build(r){
      const p=pick(r,[20,25,30]),q=pick(r,[5,10,15]),coupon=integer(r,3,12),answer=Math.floor(100*coupon/(p-q))+1;
      return task(this,{p,q,coupon},`Un article té un preu inicial enter d'euros, igual a totes dues botigues. A aplica un descompte del ${p}%. B aplica un descompte del ${q}% i després resta un val de ${coupon} €. Quin és el preu inicial enter més petit perquè A sigui ESTRICTAMENT més barata que B? No arrodoneixis els preus intermedis.`,answer,['Expressa o prova els dos preus finals per al mateix preu inicial.','La igualtat no és suficient: comprova el candidat i l’enter anterior.'],[`A estalvia ${p-q} punts percentuals més que B, mentre B afegeix un val de ${coupon} €.`,`A és més barata quan el ${p-q}% del preu inicial supera ${coupon} €, és a dir, quan el preu supera ${100*coupon}/${p-q} €.`,`El menor enter és ${answer}. En aquest preu, A costa ${(answer*(100-p)/100).toFixed(2)} € i B ${(answer*(100-q)/100-coupon).toFixed(2)} €.`,`Amb ${answer-1} €, A encara no és estrictament més barata. Els preus dels candidats són positius.`]);
    }}
  ];
  function generate(id,random=Math.random){const d=catalog.find(d=>d.id===id);if(!d)throw Error('Família desconeguda: '+id);const q=d.build(random);for(let i=q.options.length-1;i>0;i--){const j=integer(random,0,i);[q.options[i],q.options[j]]=[q.options[j],q.options[i]];}return q;}
  function extend(topics,banks){
    topics.forEach(t=>{const ds=catalog.filter(d=>d.topic===t.id);if(!ds.length)return;const original=t.gen,period=({naturals:5,decimal_sys:4,ops:6,potencies:7,jerarquia:9,divis:7,mcmmcd:5,enters:7,decimals:9,fraccions:11,proporcionalitat:8,percentatges:7})[t.id]+ds.length;let cursor=ds.length;
      t.gen=function(...args){const slot=cursor++%period;return slot<ds.length?generate(ds[slot].id):original.apply(this,args);};
    });
    banks.filter(c=>c.gen).forEach(c=>{const prefix=c.id==='pct'?'percentatges':c.id,ds=catalog.filter(d=>d.bankKey?.startsWith(prefix+'-'));if(!ds.length)return;const original=c.gen,oldCount=c.variants;let cursor=ds.length;c.variants+=ds.length;
      c.gen=function(...args){const slot=cursor++%(oldCount+ds.length);if(slot>=ds.length)return original.apply(this,args);const d=ds[slot],q=generate(d.id),t=topics.find(t=>t.id===d.topic);return {...q,variantId:d.bankKey,topicId:t.id,topicName:t.name,cat:c.name,text:q.question,dataBox:null,steps:[],answer:{val:q.correct,check:v=>numEq(v,Number(q.correct))},practiceHints:q.guide,hints:q.solution};};
    });
  }
  catalog.forEach(d=>Object.freeze(d));Object.freeze(catalog);
  root.MIFirstNumericTasks=Object.freeze({catalog,generate,extend});
})(typeof window==='undefined'?globalThis:window);
