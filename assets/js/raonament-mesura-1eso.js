/* Tasques de mesura per a la web. Els generadors base de les fitxes es conserven. */
(function(root){
  'use strict';
  const n=(r,a,b)=>a+Math.floor(r()*(b-a+1)),pick=(r,a)=>a[n(r,0,a.length-1)];
  const clock=m=>Math.floor(m/60)+':'+String(m%60).padStart(2,'0');
  const fmt=n=>String(n).replace('.',',');
  const paintCases=[];
  for(let width=5;width<=10;width++)for(let height=2;height<=5;height++)for(let opening=2;opening<=6;opening++){
    const need=width*height-opening,all=[];
    for(let a=0;a<=Math.ceil(need/4);a++)for(let b=0;b<=Math.ceil(need/7);b++)if(4*a+7*b>=need)all.push({a,b,cost:6*a+9*b});
    const best=all.reduce((a,b)=>a.cost<=b.cost?a:b);
    if(best.a&&best.b&&best.cost<Math.min(6*Math.ceil(need/4),9*Math.ceil(need/7)))paintCases.push({width,height,opening,need,best});
  }
  const rectangleCases=[];
  for(let area=36;area<=160;area++)for(const minSide of [2,3]){const all=[];for(let a=minSide;a*a<=area;a++)if(area%a===0)all.push({a,b:area/a,p:2*(a+area/a)});if(all.length>=3)rectangleCases.push({area,minSide,all});}
  function task(d,data,question,answer,guide,solution){
    if(!Number.isSafeInteger(answer)||answer<0)throw Error('Resposta fora del domini: '+d.id);
    return {type:d.type,reasoningFamily:d.id,reasoningData:data,question,correct:String(answer),options:[answer,answer+1,answer+2,Math.max(0,answer-1)].map(String),guide,solution,allowOpen:true,isProblem:true,diff:d.level,
      answerCheck:v=>typeof root.answerNumEq==='function'?root.answerNumEq(v,answer,1e-8):String(v).trim()===String(answer)};
  }
  const catalog=[
    {id:'talls-combinats',topic:'metric',type:1001,level:3,reason:'Planificar com distribuir talls de dues mesures entre barres; convertir no resol la distribució ni la minimalitat.',build(r){
      const scale=n(r,1,3),length=100*scale,a=60*scale,b=55*scale,c=45*scale,A=n(r,2,4),B=n(r,2,4),C=B+1,answer=A+B+1;
      return task(this,{length,a,b,c,A,B,C},`Tens barres de ${fmt(length/100)} m. Cal obtenir ${A} peces de ${a} cm, ${B} peces de ${b*10} mm i ${C} peces de ${c} cm. Pots combinar talls en una barra; el tall no consumeix material i els retalls no es poden unir. Quin és el nombre mínim de barres?`,answer,['Expressa totes les longituds en la mateixa unitat.','La suma total no diu si les peces es poden distribuir. Comprova quines parelles caben.'],[`Cada barra té ${length} cm. Les peces de ${a} cm no poden compartir barra amb cap altra peça: calen ${A} barres.`,`Una peça de ${b} cm i una de ${c} cm omplen una barra: ${B} barres. Sobra una peça de ${c} cm: una barra més.`,`Les ${B} peces de ${b} cm requereixen barres diferents i no poden compartir amb les de ${a} cm. Si només hi hagués ${A+B} barres, només hi cabrien ${B} peces curtes, però en calen ${C}.`,`Mínim: ${A}+${B}+1=${answer} barres.`]);
    }},
    {id:'carrega-amb-dos-limits',topic:'conversions',type:1001,level:3,reason:'Convertir unitats i escollir una combinació sota límits simultanis de massa i espai.',build(r){
      const shift=n(r,0,5),massA=2+shift,massB=3+shift,litA=3+shift,litB=5+shift,slots=n(r,4,9),limit=massB*slots-2,all=[];
      for(let a=0;a<=slots;a++)for(let b=0;b<=slots-a;b++)if(a*massA+b*massB<=limit)all.push({a,b,lit:a*litA+b*litB});const best=all.reduce((a,b)=>a.lit>=b.lit?a:b);
      return task(this,{massA,massB,litA,litB,slots,limit},`Una caixa A conté ${litA} L i pesa ${massA*1000} g. Una B conté ${litB*1000} mL i pesa ${massB} kg. Pots transportar com a màxim ${slots} caixes i ${limit*1000} g en total. Quants litres pots transportar com a màxim combinant els dos tipus?`,best.lit,['Converteix masses i capacitats a unitats comunes.','Enumera combinacions que compleixin tots dos límits, també les mixtes.'],[`En kg i L: A (${massA}; ${litA}), B (${massB}; ${litB}).`,`Cal a+b ≤ ${slots} i ${massA}a+${massB}b ≤ ${limit}.`,`Compara ${all.length} combinacions admissibles. Una òptima és ${best.a} A i ${best.b} B: ${best.lit} L.`]);
    }},
    {id:'transbordament-invers',topic:'temps',type:1001,level:3,reason:'Reconstruir el darrer trajecte possible coordinant dues freqüències, transbordament i termini d’arribada.',build(r){
      const base=8*60,periodA=pick(r,[12,15,20]),periodB=pick(r,[15,20,25]),offset=n(r,2,9),rideA=n(r,12,22),walk=n(r,3,7),rideB=n(r,10,18),deadline=base+n(r,100,150),trips=[];
      for(let a=base;a<=deadline;a+=periodA){const ready=a+rideA+walk,b=base+offset+Math.max(0,Math.ceil((ready-base-offset)/periodB))*periodB;if(b+rideB<=deadline)trips.push({a,b,end:b+rideB});}const best=trips[trips.length-1],answer=best.a-base;
      return task(this,{base,periodA,periodB,offset,rideA,walk,rideB,deadline},`L’autobús A surt a les 8:00 i cada ${periodA} min; triga ${rideA} min fins al transbordament. Cal caminar ${walk} min. B surt d’allà a les ${clock(base+offset)} i cada ${periodB} min; el segon trajecte dura ${rideB} min. Has d’arribar com a molt a les ${clock(deadline)}. Quants minuts després de les 8:00 surt l’últim A que et serveix? Es pot pujar a B just a l’hora de sortida.`,answer,['Treballa enrere des de l’hora límit.','No sumis només durades: has de poder agafar una sortida real de B.'],[`Per a cada A comprova la primera sortida de B posterior o igual a l’hora d’arribar-hi caminant.`,`L’últim itinerari vàlid és A ${clock(best.a)}, B ${clock(best.b)}, arribada ${clock(best.end)}.`,`El següent A no arriba a temps amb cap B. Resposta: ${answer} min.`]);
    }},
    {id:'tanca-area-maxima',topic:'perimetres',type:1001,level:3,reason:'Modelitzar una tanca incompleta i comparar rectangles enters per maximitzar una altra magnitud.',build(r){
      const half=n(r,11,22),gate=n(r,1,3),fence=2*half-gate,maxWidth=Math.floor(half/2)-n(r,1,3),area=maxWidth*(half-maxWidth);
      return task(this,{half,gate,fence,maxWidth},`Disposes de ${fence} m de tanca i d’una porta de ${gate} m. Has de fer un recinte rectangular, usant tota la tanca i la porta una sola vegada al contorn. Els costats són metres enters positius i l’amplada no pot superar ${maxWidth} m. Quina és l’àrea màxima, en m²?`,area,['La porta també forma part del perímetre.','Enumera les amplades permeses i dedueix la llargada de cadascuna.'],[`Perímetre total: ${fence}+${gate}=${2*half} m; llargada+amplada=${half}.`,`Àrees admissibles: ${Array.from({length:maxWidth},(_,i)=>`${i+1}×${half-i-1}=${(i+1)*(half-i-1)}`).join('; ')}.`,`Màxim: ${maxWidth}×${half-maxWidth}=${area} m².`]);
    }},
    {id:'rectangle-area-fixada',topic:'arees',type:1001,level:3,reason:'Reconstruir dimensions enteres a partir de l’àrea i una restricció; comparar contorns de totes les solucions.',build(r){
      const {area,minSide,all}=pick(r,rectangleCases),best=all.reduce((a,b)=>a.p<=b.p?a:b);
      return task(this,{area,minSide},`Un rectangle té ${area} m² d’àrea. Els costats són metres enters i tots dos mesuren almenys ${minSide} m. Quin és el perímetre mínim possible, en metres?`,best.p,['Busca totes les parelles de factors admissibles.','Tenir la mateixa àrea no implica tenir el mateix perímetre.'],[`Parelles (sense repetir l’ordre): ${all.map(p=>`${p.a}×${p.b}, P=${p.p}`).join('; ')}.`,`La parella ${best.a} i ${best.b} dona el perímetre mínim: ${best.p} m.`]);
    }},
    {id:'encaix-amb-tolerancies',topic:'mesurament',type:1001,level:3,reason:'Escollir extrems oposats dels errors i trobar el marge que garanteix encaix en qualsevol cas.',build(r){
      const width=n(r,30,80),errW=n(r,1,3),errP=n(r,1,3),clearance=n(r,1,4),answer=width-errW-errP-clearance;
      return task(this,{width,errW,errP,clearance},`Una obertura mesura ${width} cm amb error absolut màxim ${errW} cm. Fabriquem una peça amb amplada nominal entera en cm i error màxim ${errP} cm. Entre l’obertura i la peça ha de quedar una diferència total d’almenys ${clearance} cm, fins i tot amb els errors més desfavorables. Quina amplada nominal màxima podem encarregar?`,answer,['Considera l’obertura més petita i la peça més gran possibles.','Comprova el valor límit i què passaria si augmentessis l’encàrrec un centímetre.'],[`Obertura mínima: ${width-errW} cm. Peça màxima: nominal+${errP}.`,`Per garantir el marge: nominal+${errP}+${clearance} ≤ ${width-errW}.`,`Màxim enter: ${answer} cm; amb ${answer+1} cm el marge podria quedar en ${clearance-1} cm.`]);
    }},
    {id:'estimacio-amb-garantia',topic:'estimacio',type:1001,level:3,reason:'Distingir estimació central de garantia, coordinar dos marges i decidir compra mínima sencera.',build(r){
      const length=n(r,5,12),width=n(r,3,8),margin=pick(r,[0.1,0.2,0.3]),coverage=n(r,3,7),maxArea=(length+margin)*(width+margin),answer=Math.ceil(maxArea/coverage);
      return task(this,{length,width,margin,coverage},`Una sala rectangular té llargada estimada ${length} m i amplada estimada ${width} m. Cada dimensió pot diferir com a màxim ${fmt(margin)} m de l’estimació. Cada paquet cobreix exactament ${coverage} m² i es poden aprofitar tots els retalls. Quants paquets cal comprar com a mínim per garantir que n’hi haurà prou en qualsevol mida possible?`,answer,['El producte de les estimacions no garanteix prou material.','Tria els límits adequats per a totes dues dimensions i decideix una compra sencera.'],[`Màxims: ${fmt(length+margin)} m i ${fmt(width+margin)} m.`,`Àrea màxima: ${fmt(Number(maxArea.toFixed(4)))} m².`,`Cal el menor enter amb paquets×${coverage} ≥ ${fmt(Number(maxArea.toFixed(4)))}: ${answer}. Amb ${answer-1} no n’hi ha prou.`]);
    }},
    {id:'compra-pintura-combinada',topic:'problemes',type:1001,level:3,reason:'Construir l’àrea neta i decidir una compra mixta de formats amb excés permès i cost mínim.',build(r){
      const {width,height,opening,need,best}=pick(r,paintCases),coverA=4,coverB=7,costA=6,costB=9;
      return task(this,{width,height,opening,coverA,coverB,costA,costB},`Una paret de ${width}×${height} m té ${opening} m² d’obertures que no es pinten. Un pot A cobreix 4 m² i costa 6 €; un B cobreix 7 m² i costa 9 €. Pots combinar formats i pot sobrar pintura. Quin és el cost mínim, en euros, per pintar la paret?`,best.cost,['Calcula la superfície que realment es pinta.','Compara compres mixtes amb compres d’un sol format; el preu per m² no decideix tot sol.'],[`Àrea neta: ${width*height}−${opening}=${need} m².`,`Per cada nombre de pots B de 0 a ${Math.ceil(need/coverB)}, calcula quants A falten i compara el cost.`,`Una compra òptima: ${best.a} A i ${best.b} B, cobreix ${best.a*coverA+best.b*coverB} m² i costa ${best.cost} €.`]);
    }},
    {id:'mesura-mixta',topic:'metric',type:1002,level:2,reason:'Connectar una mesura composta amb una unitat final i una retirada en una altra unitat.',build(r){
      const metres=n(r,2,8),cm=n(r,20,90),used=n(r,2,9)*10,answer=metres*100+cm-used;
      return task(this,{metres,cm,used},`Una corda fa ${metres} m i ${cm} cm. Se’n gasten ${used*10} mm. Quants centímetres en queden?`,answer,['Converteix totes les dades a centímetres.','Suma la longitud composta abans de restar el tros gastat.'],[`Longitud inicial: ${metres*100+cm} cm. Tros gastat: ${used} cm.`,`Queden ${answer} cm.`]);
    }},
    {id:'estimacio-comparada',topic:'estimacio',type:1002,level:2,reason:'Comparar dos límits d’una àrea i relacionar-los amb una compra sencera, amb la interpretació ja indicada.',build(r){
      const a=n(r,4,10),b=n(r,3,8),c=n(r,2,6),answer=Math.ceil((a+1)*b/c);
      return task(this,{a,b,c},`L’amplada d’una sala és ${b} m i la llargada està entre ${a} i ${a+1} m. Per calcular una compra suficient s’ha decidit usar l’àrea més gran. Si un paquet cobreix ${c} m², quants paquets sencers cal comprar?`,answer,['Calcula l’àrea amb la llargada màxima indicada.','Divideix per la cobertura i arrodoneix cap amunt.'],[`Àrea màxima: ${a+1}×${b}=${(a+1)*b} m².`,`Compra suficient: ${answer} paquets.`]);
    }}
  ];
  function generate(id,random=Math.random){const d=catalog.find(d=>d.id===id);if(!d)throw Error('Família desconeguda');const q=d.build(random);if(new Set(q.options).size!==4)throw Error('Opcions repetides');for(let i=q.options.length-1;i>0;i--){const j=n(random,0,i);[q.options[i],q.options[j]]=[q.options[j],q.options[i]];}return q;}
  function extend(topics,banks){for(const t of topics){if(t.id==='problemes')continue;const ds=catalog.filter(d=>d.topic===t.id);if(!ds.length)continue;const original=t.gen;let turn=ds.length;t.gen=function(...args){const slot=turn++%10;return slot<ds.length?generate(ds[slot].id):original.apply(this,args);};}catalog.filter(d=>d.level===3).forEach((d,i)=>{const key='R'+String(i+1).padStart(2,'0');banks.push(()=>({...generate(d.id),type:key,patternId:key,primaryTopic:d.topic,difficultyBank:'measureProblems',difficultyKey:key,family:'Raonament',examCompatible:true}));});}
  root.MIFirstMeasureTasks=Object.freeze({catalog:Object.freeze(catalog.map(Object.freeze)),generate,extend});
})(typeof window==='undefined'?globalThis:window);
