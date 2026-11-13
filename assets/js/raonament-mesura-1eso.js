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
    const metricFamily=d.topic==='metric'?metricFamilySpecs.find(f=>f.generators.includes(d.type))?.id:null;
    const conversionsFamily=d.topic==='conversions'?conversionsFamilyFor(d.type)?.id:null;
    const timeFamily=d.topic==='temps'?timeFamilyFor(d.type)?.id:null;
    const perimeterFamily=d.topic==='perimetres'?perimeterFamilyFor(d.type)?.id:null;
    const areaFamily=d.topic==='arees'?areaFamilyFor(d.type)?.id:null;
    const family=metricFamily||conversionsFamily||timeFamily||perimeterFamily||areaFamily;
    return {type:d.type,reasoningFamily:d.id,reasoningData:data,...(family?{...(metricFamily?{metricFamily}:{}),...(conversionsFamily?{conversionsFamily}:{}),...(timeFamily?{timeFamily}:{}),...(perimeterFamily?{perimeterFamily}:{}),...(areaFamily?{areaFamily}:{}),familyId:family,taskDifficulty:d.level,difficulty:d.level}:{}),question,correct:String(answer),options:[answer,answer+1,answer+2,Math.max(0,answer-1)].map(String),guide,solution,allowOpen:true,isProblem:true,diff:d.level,
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
    {id:'ordenar-mesures',topic:'conversions',type:1003,level:2,reason:'Normalitzar tres mesures de superfície, ordenar-les i identificar-ne la mediana.',build(r){
      const center=n(r,3,8)*100,below=n(r,5,30),above=n(r,5,30),rows=[
        {label:'A',text:`${center/100} m²`,dm2:center},
        {label:'B',text:`${center-below} dm²`,dm2:center-below},
        {label:'C',text:`${(center+above)*100} cm²`,dm2:center+above}
      ];
      const ordered=rows.slice().sort((a,b)=>a.dm2-b.dm2),presented=rows.slice();for(let i=presented.length-1;i>0;i--){const j=n(r,0,i);[presented[i],presented[j]]=[presented[j],presented[i]];}const answer=ordered[1].dm2;
      return task(this,{rows:presented.map(x=>({...x})),ordered:ordered.map(x=>x.label)},`Ordena de més petita a més gran les superfícies A = ${presented[0].text}, B = ${presented[1].text} i C = ${presented[2].text}. Quin valor en dm² queda al mig?`,answer,['Expressa les tres superfícies en dm² abans d’ordenar-les.','Recorda que entre unitats d’àrea el factor és quadràtic.'],[`A = ${rows[0].dm2} dm²; B = ${rows[1].dm2} dm²; C = ${rows[2].dm2} dm².`,`Ordre creixent: ${ordered.map(x=>x.label).join(' < ')}.`,`El valor central és ${answer} dm².`]);
    }},
    {id:'operar-arees-mixtes',topic:'conversions',type:1004,level:2,reason:'Convertir mesures d’àrea a una unitat comuna i resoldre una suma seguida d’una resta.',build(r){
      const m2=n(r,2,7),dm2=n(r,15,95),removed=n(r,1,5),answer=m2*100+dm2-removed;
      return task(this,{m2,dm2,removed,answer},`Una cartolina té ${m2} m² i ${dm2} dm². Se’n retallen ${removed*100} cm². Quina superfície queda en dm²?`,answer,['Expressa totes les superfícies en dm².','Després de sumar les dues parts, resta la superfície retallada.'],[`${m2} m² = ${m2*100} dm².`,`${removed*100} cm² = ${removed} dm².`,`${m2*100} + ${dm2} − ${removed} = ${answer} dm².`]);
    }},
    {id:'diagnosticar-error-superficie',topic:'conversions',type:1005,level:2,reason:'Detectar la confusió entre factor lineal i quadràtic i corregir el factor d’una conversió de superfície.',build(r){
      const cases=[
        {from:'m²',to:'dm²',factor:100,wrong:10},
        {from:'m²',to:'cm²',factor:10000,wrong:100},
        {from:'dm²',to:'cm²',factor:100,wrong:10}
      ];
      const item=cases[n(r,0,cases.length-1)],value=n(r,2,9),reported=value*item.wrong,answer=item.factor;
      return task(this,{...item,value,reported,answer},`En convertir ${value} ${item.from} a ${item.to}, una alumna aplica el factor ${item.wrong} i obté ${reported} ${item.to}. Quin factor correcte havia d’aplicar per cada unitat ${item.from}?`,answer,['Compara les dues unitats de longitud que formen cada unitat quadrada.','Eleva al quadrat el factor lineal.'],[`El factor lineal del canvi és ${Math.sqrt(item.factor)}.`,`Per a les unitats quadrades, el factor és ${Math.sqrt(item.factor)}² = ${item.factor}.`,`El factor ${item.wrong} és incorrecte. S’ha d’aplicar ${item.factor}.`]);
    }},
    {id:'reconstruir-hora-inicial',topic:'temps',type:1002,level:2,reason:'Reconstruir l’hora d’inici a partir de la durada i d’una hora final l’endemà.',build(r){
      const startHour=n(r,21,23),startMinute=pick(r,[0,10,20,30,40,50]),start=startHour*60+startMinute,after=pick(r,[15,30,45,60,75,90,105,120]),duration=1440-start+after,endH=Math.floor(after/60),endM=after%60,h=Math.floor(duration/60),m=duration%60,answer=start;
      return task(this,{start,startHour,startMinute,duration,after,endH,endM},`Una activitat acaba a les ${String(endH).padStart(2,'0')}:${String(endM).padStart(2,'0')} h de l’endemà i ha durat ${h} h ${m} min. A quants minuts després de les 00:00 del dia anterior havia començat?`,answer,['Situa l’hora final després de les 24:00 del dia inicial.','Treu la durada a aquesta hora final i normalitza el resultat dins del dia anterior.'],[`Final: 1440 + ${after} = ${1440+after} min des de les 00:00 del dia inicial.`,`Inici: ${1440+after} − ${duration} = ${answer} min.`,`Això correspon a ${String(startHour).padStart(2,'0')}:${String(startMinute).padStart(2,'0')} h.`]);
    }},
    {id:'operar-durades-i-pausas',topic:'temps',type:1003,level:2,reason:'Sumar tres durades i les pauses intermèdies per obtenir el temps total transcorregut.',build(r){
      const activities=[pick(r,[35,40,45,50,55,60,65,70,75,80,90]),pick(r,[30,40,45,50,60,65,75,80,90,100]),pick(r,[25,35,45,50,55,60,70,85])],breaks=[pick(r,[5,10,15,20]),pick(r,[5,10,15,20])],answer=activities.reduce((a,b)=>a+b,0)+breaks.reduce((a,b)=>a+b,0);
      const fmt=m=>{const h=Math.floor(m/60),rest=m%60;return h?`${h} h ${rest} min`:`${rest} min`;};
      return task(this,{activities,breaks,answer},`Una jornada té tres activitats de ${activities.map(fmt).join(', ')} i dues pauses de ${breaks.join(' i ')} min entre elles. Quant temps transcorre des de l’inici de la primera activitat fins al final de l’última, incloses les pauses? Dona la resposta en minuts.`,answer,['Expressa cada activitat en minuts i suma-les.','Afegeix les dues pauses i comprova si el total supera 60 minuts.'],[`Activitats: ${activities.join(' + ')} = ${activities.reduce((a,b)=>a+b,0)} min.`,`Pauses: ${breaks[0]} + ${breaks[1]} = ${breaks.reduce((a,b)=>a+b,0)} min.`,`Total: ${activities.reduce((a,b)=>a+b,0)} + ${breaks.reduce((a,b)=>a+b,0)} = ${answer} min = ${fmt(answer)}.`]);
    }},
    {id:'detectar-error-base-sexagesimal',topic:'temps',type:1004,level:2,reason:'Detectar l’ús de base 100 en una durada mixta i corregir la conversió a minuts.',build(r){
      const hours=n(r,1,4),minutes=n(r,10,59),reported=hours*100+minutes,answer=hours*60+minutes;
      return task(this,{hours,minutes,reported,answer},`Un alumne escriu que ${hours} h ${minutes} min són ${reported} min perquè tracta les hores com si fossin desenes de minuts. Quants minuts són realment?`,answer,['Una hora té 60 minuts, no 100.','Multiplica les hores per 60 i després suma els minuts.'],[`${hours} h = ${hours} × 60 = ${hours*60} min.`,`${hours*60} + ${minutes} = ${answer} min.`,`El valor ${reported} min prové de fer servir base 100.`]);
    }},
    {id:'seleccionar-unitat-temporal',topic:'temps',type:1005,level:1,reason:'Escollir una unitat habitual adequada per descriure durades quotidianes.',build(r){
      const cases=[
        {context:'una classe',amount:'50',unit:'minuts'},
        {context:'una pausa molt breu',amount:'20',unit:'segons'},
        {context:'una pel·lícula',amount:'2',unit:'hores'},
        {context:'un cap de setmana',amount:'2',unit:'dies'},
        {context:'una cursa curta',amount:'15',unit:'segons'},
        {context:'una visita al metge',amount:'30',unit:'minuts'}
      ];
      const item=pick(r,cases),options=['segons','minuts','hores','dies'];
      const q=`Per expressar el temps que dura ${item.context} (aproximadament ${item.amount}), quina unitat és la més adequada?`;
      return {type:this.type,reasoningFamily:this.id,reasoningData:{...item},timeFamily:this.id,familyId:this.id,taskDifficulty:this.level,difficulty:this.level,diff:this.level,question:q,correct:item.unit,options,guide:['Relaciona la durada habitual de l’activitat amb la mida de cada unitat.','Tria la unitat que permet expressar-la de manera clara i habitual.'],solution:[`La durada aproximada és de ${item.amount} ${item.unit}.`,`Per tant, la unitat més adequada és ${item.unit}.`],allowOpen:true,isProblem:true,answerCheck:v=>String(v).trim().toLocaleLowerCase('ca')===item.unit};
    }},
    {id:'comparar-durades',topic:'temps',type:1006,level:2,reason:'Comparar durades mixtes després de convertir-les a una unitat comuna.',build(r){
      const totals=[];
      while(totals.length<3){const value=n(r,35,240);if(!totals.includes(value))totals.push(value);}
      const fmtDuration=minutes=>{const h=Math.floor(minutes/60),rest=minutes%60;return h?(rest?`${h} h ${rest} min`:`${h} h`):`${rest} min`;};
      const rows=totals.map((minutes,index)=>({label:String.fromCharCode(65+index),minutes,text:fmtDuration(minutes)}));
      const longest=rows.reduce((a,b)=>a.minutes>b.minutes?a:b);
      return task(this,{rows:rows.map(x=>({...x})),longest:longest.label},`Tres activitats tenen les durades A = ${rows[0].text}, B = ${rows[1].text} i C = ${rows[2].text}. Quina és la més llarga? Respon en minuts.`,longest.minutes,['Expressa totes tres durades en minuts.','Compara els tres totals en la mateixa unitat.'],[`A = ${rows[0].minutes} min; B = ${rows[1].minutes} min; C = ${rows[2].minutes} min.`,`La durada més gran és ${longest.label}: ${longest.minutes} min.`]);
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
    {id:'reconstruir-costat-des-del-perimetre',topic:'perimetres',type:1002,level:2,reason:'Invertir la fórmula d’un perímetre per recuperar una longitud que no s’ha donat.',build(r){
      const kind=n(r,0,3);
      if(kind===0){const side=n(r,3,18),p=4*side;return task(this,{kind,side,p},`Un quadrat té un perímetre de ${p} cm. Quant mesura cada costat?`,side,['El quadrat té quatre costats iguals.','Reparteix el perímetre en quatre parts iguals.'],[`P = 4 × costat; costat = ${p} ÷ 4`,`✅ costat = ${side} cm`]);}
      if(kind===1){const a=n(r,4,20),b=n(r,3,16),p=2*(a+b);return task(this,{kind,a,b,p},`Un rectangle té un perímetre de ${p} cm i un costat de ${a} cm. Quant mesura l’altre costat?`,b,['El semiperímetre és la suma d’un costat llarg i un d’ample.','Resta el costat conegut al semiperímetre.'],[`P ÷ 2 = ${p} ÷ 2 = ${a+b} cm`,`L’altre costat = ${a+b} − ${a} = ${b} cm`,`✅ ${b} cm`]);}
      if(kind===2){let a,b,x;do{a=n(r,5,14);b=n(r,5,14);x=n(r,3,14);}while(a+b<=x||a+x<=b||b+x<=a);const p=a+b+x;return task(this,{kind,a,b,x,p},`Un triangle té perímetre ${p} cm. Dos costats mesuren ${a} cm i ${b} cm. Quant mesura el tercer costat?`,x,['Resta del perímetre les dues longituds conegudes.','Comprova que la longitud trobada pot tancar un triangle.'],[`Tercer costat = ${p} − ${a} − ${b} = ${x} cm`,`Comprovació: ${a}+${b}>${x}, ${a}+${x}>${b} i ${b}+${x}>${a}`,`✅ ${x} cm`]);}
      const sides=[5,6,8,10,12],side=sides[n(r,0,sides.length-1)],p=side*5;
      return task(this,{kind,side,p,sides:5},`Un pentàgon regular té perímetre ${p} cm. Quant mesura cada costat?`,side,['En un polígon regular tots els costats són iguals.','Divideix el perímetre pel nombre de costats.'],[`costat = ${p} ÷ 5 = ${side} cm`,`✅ ${side} cm`]);
    }},
    {id:'circumferencia-inversa',topic:'perimetres',type:1003,level:2,reason:'Aïllar radi o diàmetre a C=πd quan es coneix la longitud de la circumferència.',build(r){
      const radius=n(r,3,20),diameter=2*radius,C=Math.round(3.14*diameter*10)/10,askRadius=n(r,0,1)===0,answer=askRadius?radius:diameter;
      return task(this,{radius,diameter,C,askRadius},`Una circumferència mesura ${fmt(C)} cm (π = 3,14). Quin és el seu ${askRadius?'radi':'diàmetre'}? Dona la resposta en cm, arrodonida al centímetre més proper si cal.`,answer,['La fórmula és C = π × d.','Divideix per 3,14 per trobar el diàmetre; el radi és la meitat.'],[`d ≈ ${fmt(C)} ÷ 3,14 = ${diameter} cm`,`r = d ÷ 2 = ${radius} cm`,`✅ ${askRadius?radius:diameter} cm`]);
    }},
    {id:'contorn-entallat',topic:'perimetres',type:1004,level:2,reason:'Calcular el contorn d’un rectangle amb una entallada interior, sumant els dos trams nous de profunditat.',build(r){
      const W=n(r,12,30),H=n(r,10,24),w=n(r,2,W-2),depth=n(r,2,H-2),p=2*(W+H)+2*depth;
      return task(this,{W,H,w,depth,p},`A la part superior d’un rectangle de ${W} × ${H} m es fa una entallada rectangular de ${w} m d’amplada i ${depth} m de profunditat. Quin és el nou perímetre?`,p,['La base de l’entallada substitueix un tram superior de la mateixa amplada: aquests trams es cancel·len.','L’entallada afegeix dues vores de profunditat.'],[`Perímetre inicial = 2 × (${W}+${H}) = ${2*(W+H)} m`,`S’afegeixen 2 × ${depth} = ${2*depth} m; ${w} no canvia el total perquè substitueix un tram igual`,`Nou perímetre = ${p} m`]);
    }},
    {id:'perimetre-unitats-mixtes',topic:'perimetres',type:1005,level:2,reason:'Convertir longituds a la mateixa unitat abans de sumar els costats.',build(r){
      const count=n(r,3,5),cm=Array.from({length:count},()=>n(r,2,9)*10),m=Array.from({length:count},()=>n(r,1,4)),all=[...cm.map(v=>v+' cm'),...m.map(v=>v+' m')].sort(()=>r()-.5),totalCm=cm.reduce((a,b)=>a+b,0)+100*m.reduce((a,b)=>a+b,0);
      return task(this,{cm,m,totalCm},`Un polígon té costats de ${all.join(', ')}. Calcula’n el perímetre i expressa’l en cm.`,totalCm,['Converteix cada longitud en metres a centímetres.','Suma totes les longituds després de la conversió.'],[`Metres a centímetres: ${m.join(' + ')} m = ${100*m.reduce((a,b)=>a+b,0)} cm`,`Costats en cm: ${cm.join(' + ')} cm + ${100*m.reduce((a,b)=>a+b,0)} cm`,`✅ P = ${totalCm} cm`]);
    }},
    {id:'comparar-perimetres',topic:'perimetres',type:1006,level:2,reason:'Calcular dos perímetres i comparar-los per trobar-ne la diferència.',build(r){
      const a=n(r,4,18),b=n(r,4,18),c=n(r,4,18),d=n(r,4,18),p1=2*(a+b),p2=2*(c+d);if(p1===p2)return this.build(()=>r());const answer=Math.abs(p1-p2),bigger=p1>p2?'rectangle A':'rectangle B';
      return task(this,{a,b,c,d,p1,p2},`El rectangle A fa ${a} × ${b} cm i el rectangle B fa ${c} × ${d} cm. Quina diferència hi ha entre els seus perímetres, en cm?`,answer,['Calcula per separat el perímetre de cada rectangle.','Resta el perímetre més petit del més gran.'],[`P(A) = 2 × (${a}+${b}) = ${p1} cm`,`P(B) = 2 × (${c}+${d}) = ${p2} cm; és més gran ${bigger}`,`Diferència = |${p1} − ${p2}| = ${answer} cm`]);
    }},
    {id:'diagnosticar-error-perimetre',topic:'perimetres',type:1007,level:2,reason:'Detectar una fórmula que omet costats o confon perímetre i àrea, i calcular el resultat correcte.',build(r){
      const kind=n(r,0,2);
      if(kind===0){const a=n(r,3,18),b=n(r,3,16),p=2*(a+b);return task(this,{kind,a,b,p},`Una alumna calcula el perímetre d’un rectangle de ${a} × ${b} cm fent ${a}+${b}=${a+b} cm. Quin és el perímetre correcte?`,p,['El rectangle té dos costats de cada longitud.','Multiplica per 2 la suma dels costats adjacents.'],[`La suma ${a}+${b} només compta dos costats.`,`P = 2 × (${a}+${b}) = ${p} cm`,`✅ ${p} cm`]);}
      if(kind===1){const s=n(r,3,14),p=4*s;return task(this,{kind,s,p},`Per a un quadrat de costat ${s} cm, en Marc afirma que P = ${s}² = ${s*s} cm. Quin és el perímetre correcte?`,p,['La fórmula del quadrat és quatre vegades el costat.','El quadrat del costat calcula una àrea, amb unitats cm².'],[`s² = ${s*s} cm² és una àrea, no un perímetre.`,`P = 4 × ${s} = ${p} cm`,`✅ ${p} cm`]);}
      let a,b,c;do{a=n(r,4,16);b=n(r,4,16);c=n(r,4,16);}while(a+b<=c||a+c<=b||b+c<=a);const p=a+b+c;
      return task(this,{kind,a,b,c,p},`Un triangle té costats ${a}, ${b} i ${c} cm. La Laia calcula P = 2 × (${a}+${b}+${c}) = ${2*p} cm. Quin és el perímetre correcte?`,p,['Cada costat del triangle forma el contorn una sola vegada.','Suma els tres costats; no hi ha dues parelles iguals.'],[`La fórmula de duplicar la suma només correspon a comptar parelles oposades d’un rectangle.`,`P = ${a}+${b}+${c} = ${p} cm`,`✅ ${p} cm`]);
    }},
    {id:'perimetre-amb-obertura',topic:'perimetres',type:1008,level:2,reason:'Distingir el perímetre complet del material de tanca quan una obertura no es cobreix.',build(r){
      const L=n(r,12,30),W=n(r,6,18),gate=n(r,1,4),p=2*(L+W),fence=p-gate;
      return task(this,{L,W,gate,p},`Un jardí rectangular fa ${L} m × ${W} m. Es deixa una entrada de ${gate} m sense tanca. Quants metres de tanca calen?`,fence,['Calcula primer tot el perímetre del jardí.','Resta la longitud de l’entrada, on no es posa tanca.'],[`P = 2 × (${L}+${W}) = ${p} m`,`Tanca = ${p} − ${gate} = ${fence} m`,`✅ ${fence} m`]);
    }},
    {id:'cost-material-per-contorn',topic:'perimetres',type:1009,level:2,reason:'Calcular el perímetre, convertir-lo a metres i aplicar un preu lineal.',build(r){
      const a=n(r,2,12)*50,b=n(r,2,10)*50,price=n(r,2,9),cm=2*(a+b),metres=cm/100,cost=metres*price;
      return task(this,{a,b,cm,metres,price},`Un marc rectangular fa ${a} cm × ${b} cm. El perfil costa ${price} € per metre. Quin és el cost del perfil necessari per tot el contorn?`,cost,['Calcula el perímetre en centímetres.','Converteix el resultat a metres abans de multiplicar pel preu.'],[`P = 2 × (${a}+${b}) = ${cm} cm = ${metres} m`,`Cost = ${metres} × ${price} = ${cost} €`,`✅ ${cost} €`]);
    }},
    {id:'voltes-circumferencia',topic:'perimetres',type:1010,level:2,reason:'Calcular la distància recorreguda com el nombre de voltes per la longitud d’una circumferència.',build(r){
      const d=n(r,1,12)*50,turns=n(r,2,12),one=Math.round(3.14*d),distance=one*turns;
      return task(this,{d,turns,one},`Una roda de diàmetre ${d} cm fa ${turns} voltes completes (π = 3,14). Quina distància recorre en cm?`,distance,['Calcula la longitud d’una volta amb C = π × d.','Multiplica aquesta longitud pel nombre de voltes.'],[`Una volta: C = 3,14 × ${d} = ${one} cm`,`${turns} voltes: ${one} × ${turns} = ${distance} cm`,`✅ ${distance} cm`]);
    }},
    {id:'rectangle-area-fixada',topic:'arees',type:1001,level:3,reason:'Reconstruir dimensions enteres a partir de l’àrea i una restricció; comparar contorns de totes les solucions.',build(r){
      const {area,minSide,all}=pick(r,rectangleCases),best=all.reduce((a,b)=>a.p<=b.p?a:b);
      return task(this,{area,minSide},`Un rectangle té ${area} m² d’àrea. Els costats són metres enters i tots dos mesuren almenys ${minSide} m. Quin és el perímetre mínim possible, en metres?`,best.p,['Busca totes les parelles de factors admissibles.','Tenir la mateixa àrea no implica tenir el mateix perímetre.'],[`Parelles (sense repetir l’ordre): ${all.map(p=>`${p.a}×${p.b}, P=${p.p}`).join('; ')}.`,`La parella ${best.a} i ${best.b} dona el perímetre mínim: ${best.p} m.`]);
    }},
    {id:'sumar-arees-composades',topic:'arees',type:1002,level:2,reason:'Calcular l’àrea total de dues regions adjacents sense solapament.',build(r){
      const w=n(r,3,14),h=n(r,4,12),triH=n(r,2,12)*2,rect=w*h,triangle=h*triH/2,answer=rect+triangle;
      return task(this,{w,h,triH,rect,triangle},`Una figura plana es compon d’un rectangle de ${w} × ${h} cm i d’un triangle adossat a un costat de longitud ${h} cm. L’alçada perpendicular del triangle és ${triH} cm. Les dues parts només comparteixen una vora i no se solapen. Quina és l’àrea total?`,answer,['Calcula per separat l’àrea del rectangle i la del triangle.','Com que les parts no se solapen, suma les dues àrees.'],[`Rectangle: ${w} × ${h} = ${rect} cm²`,`Triangle: (${h} × ${triH}) ÷ 2 = ${triangle} cm²`,`Total = ${rect} + ${triangle} = ${answer} cm²`]);
    }},
    {id:'comptar-quadrats-unitat',topic:'arees',type:1003,level:1,reason:'Mesurar una figura en quadrícula comptant cel·les unitàries per files.',build(r){
      const rows=[n(r,2,5)],count=n(r,2,4);for(let i=1;i<count;i++)rows.push(Math.max(2,Math.min(5,rows[i-1]+n(r,-1,1))));const answer=rows.reduce((a,b)=>a+b,0);
      return task(this,{rows},`Una figura està dibuixada sobre una quadrícula de quadrats d’1 cm². Les files de quadrats coberts contenen, de dalt a baix: ${rows.join(', ')}. Quina és l’àrea de la figura en cm²?`,answer,['Cada quadrat complet de la quadrícula representa 1 cm².','Compta les cel·les de totes les files i suma-les.'],[`Cel·les: ${rows.join(' + ')} = ${answer}`,`Àrea = ${answer} cm²`]);
    }},
    {id:'costat-quadrat-des-de-larea',topic:'arees',type:1004,level:2,reason:'Reconstruir el costat d’un quadrat a partir d’una àrea quadrada perfecta.',build(r){
      const side=n(r,2,20),area=side*side;
      return task(this,{side,area},`Un quadrat té una àrea de ${area} cm². Quant mesura el costat? Dona una resposta exacta.`,side,['El costat multiplicat per ell mateix dona l’àrea.','Busca l’arrel quadrada exacta de l’àrea; aquí és un quadrat perfecte.'],[`costat² = ${area}`,`√${area} = ${side}`,`✅ costat = ${side} cm`]);
    }},
    {id:'reconstruir-dimensio-rectangle-area',topic:'arees',type:1005,level:2,reason:'Aïllar una de les dimensions en A=base×alçada.',build(r){
      const b=n(r,3,22),h=n(r,2,18),area=b*h,askBase=n(r,0,1)===0,known=askBase?h:b,answer=askBase?b:h;
      return task(this,{b,h,area,askBase,known},`Un rectangle té una àrea de ${area} m². ${askBase?'La seva alçada':'La seva base'} mesura ${known} m. Quant mesura ${askBase?'la base':'l’alçada'}?`,answer,['Utilitza A = base × alçada.','Divideix l’àrea per la dimensió coneguda.'],[`Dimensió desconeguda = ${area} ÷ ${known} = ${answer} m`,`Comprovació: ${b} × ${h} = ${area} m²`]);
    }},
    {id:'reconstruir-dimensio-meitat-producte',topic:'arees',type:1006,level:2,reason:'Desfer A=(dues dimensions×)/2 per reconstruir una base, alçada o diagonal.',build(r){
      const isRhombus=n(r,0,1)===1,known=n(r,2,10)*2,answer=n(r,2,16),area=known*answer/2,askKnown=n(r,0,1)===0;
      return task(this,{isRhombus,known,answer,area,askKnown},isRhombus?`Un rombe té una àrea de ${area} cm². Una diagonal mesura ${known} cm. Quant mesura l’altra diagonal?`:`Un triangle té una àrea de ${area} cm² i una base de ${known} cm. Quant mesura l’alçada perpendicular a aquesta base?`,answer,['Recorda que l’àrea és la meitat del producte de les dues dimensions indicades.','Multiplica l’àrea per dos i divideix per la dimensió coneguda.'],[`Dimensió desconeguda = (2 × ${area}) ÷ ${known} = ${answer} cm`,`Comprovació: (${known} × ${answer}) ÷ 2 = ${area} cm²`]);
    }},
    {id:'reconstruir-dimensio-trapezi',topic:'arees',type:1007,level:2,reason:'Aïllar una base o l’alçada a la fórmula de l’àrea del trapezi.',build(r){
      const major=n(r,8,24),minor=n(r,2,major-2),height=n(r,1,9)*2,area=(major+minor)*height/2,askBase=n(r,0,1)===0,answer=askBase?minor:height,knownBase=askBase?major:null;
      return task(this,{major,minor,height,area,askBase,knownBase},askBase?`Un trapezi té una àrea de ${area} cm², una alçada de ${height} cm i una base de ${major} cm. Quant mesura l’altra base?`:`Un trapezi té una àrea de ${area} cm² i les bases paral·leles mesuren ${major} cm i ${minor} cm. Quina és l’alçada perpendicular?`,answer,['Aplica A=((B+b)×h)/2.','Multiplica l’àrea per dos i aïlla la dimensió desconeguda.'],askBase?[`b = (2×${area}÷${height}) − ${major} = ${minor} cm`,`Comprovació: ((${major}+${minor})×${height})÷2 = ${area} cm²`]:[`h = (2×${area}) ÷ (${major}+${minor}) = ${height} cm`,`Comprovació: ((${major}+${minor})×${height})÷2 = ${area} cm²`]);
    }},
    {id:'comparar-arees',topic:'arees',type:1008,level:2,reason:'Calcular dues àrees i trobar-ne la diferència; pot incloure figures amb igual perímetre.',build(r){
      let a,b,c,d,A,B;do{a=n(r,3,14);b=n(r,2,12);c=n(r,3,14);d=n(r,2,12);A=a*b;B=c*d;}while(Math.abs(A-B)<2);
      const answer=Math.abs(A-B);
      return task(this,{a,b,c,d,A,B},`El rectangle A fa ${a} × ${b} cm i el rectangle B fa ${c} × ${d} cm. Quina diferència hi ha entre les àrees, en cm²?`,answer,['Calcula per separat l’àrea de cada rectangle.','Resta l’àrea més petita de la més gran.'],[`Àrea A = ${a} × ${b} = ${A} cm²`,`Àrea B = ${c} × ${d} = ${B} cm²`,`Diferència = |${A}−${B}| = ${answer} cm²`]);
    }},
    {id:'cobrir-superficie',topic:'arees',type:1009,level:2,reason:'Trobar la quantitat mínima de peces senceres per cobrir una superfície després de calcular àrees.',build(r){
      const L=n(r,3,12),W=n(r,3,9),tile=[20,25,30,40,50][n(r,0,4)],room=L*W,tileM=tile/100,tileArea=tileM*tileM,exact=room/tileArea,answer=Math.ceil(exact);
      return task(this,{L,W,tile,tileArea,room,exact},`Una sala rectangular fa ${L} m × ${W} m i es cobreix amb rajoles quadrades de ${tile} cm de costat. Si es pot aprofitar tota la superfície útil de cada rajola, quantes rajoles calen com a mínim?`,answer,['Expressa el costat de la rajola en metres abans de calcular-ne l’àrea.','Divideix l’àrea de la sala per l’àrea d’una rajola i arrodoneix cap amunt si cal.'],[`Sala: ${L} × ${W} = ${room} m²`,`Rajola: ${tile} cm = ${fmt(tileM)} m; àrea = ${fmt(tileArea)} m²`,`${room} ÷ ${fmt(tileArea)} = ${fmt(exact)}; calen ${answer} rajoles senceres`]);
    }},
    {id:'cost-per-superficie',topic:'arees',type:1010,level:2,reason:'Multiplicar una superfície calculada pel preu per unitat quadrada.',build(r){
      const b=n(r,4,20)*2,h=n(r,3,18),price=n(r,2,12),area=b*h/2,cost=area*price;
      return task(this,{b,h,price,area},`Un terreny triangular té base ${b} m i alçada perpendicular ${h} m. Posar-hi gespa costa ${price} € per m². Quin és el cost total?`,cost,['Calcula l’àrea triangular abans d’aplicar el preu.','Multiplica els metres quadrats pel cost de cada metre quadrat.'],[`Àrea = (${b}×${h})÷2 = ${area} m²`,`Cost = ${area}×${price} = ${cost} €`]);
    }},
    {id:'diagnosticar-error-area',topic:'arees',type:1011,level:2,reason:'Detectar una confusió entre àrea i perímetre o l’omissió del factor mig.',build(r){
      const kind=n(r,0,2);
      if(kind===0){const b=n(r,3,18),h=n(r,2,14),area=b*h;return task(this,{kind,b,h,area},`Per calcular l’àrea d’un rectangle de ${b} × ${h} cm, una alumna fa 2×(${b}+${h})=${2*(b+h)} cm. Quina és l’àrea correcta?`,area,['L’expressió donada calcula el perímetre, no la superfície.','L’àrea és base per alçada i s’expressa en cm².'],[`L’àrea correcta és ${b}×${h}=${area} cm²`]);}
      if(kind===1){const b=n(r,4,16)*2,h=n(r,2,14),area=b*h/2;return task(this,{kind,b,h,area},`Un triangle té base ${b} cm i alçada perpendicular ${h} cm. En Pol calcula l’àrea sense dividir el producte per 2: ${b}×${h}=${b*h}. Quina és l’àrea correcta?`,area,['El producte base×alçada és el doble de l’àrea del triangle.','Divideix per dos i escriu cm².'],[`Àrea = (${b}×${h})÷2 = ${area} cm²`]);}
      const side=n(r,2,15),area=side*side;return task(this,{kind,side,area},`Un quadrat té costat ${side} cm. Una resposta afirma que la seva àrea és 4×${side}=${4*side} cm. Quina és l’àrea correcta?`,area,['4×costat dona el perímetre.','Per a l’àrea, multiplica costat per costat.'],[`Àrea = ${side}×${side} = ${area} cm²`]);
    }},
    {id:'reconstruir-dimensio-figura-composta',topic:'arees',type:1012,level:2,reason:'Reconstruir una dimensió de la peça retirada d’una figura composta a partir de l’àrea restant.',build(r){
      const W=n(r,10,26),H=n(r,8,20),cutW=n(r,2,W-2),cutDepth=n(r,2,H-2),whole=W*H,removed=cutW*cutDepth,remaining=whole-removed;
      return task(this,{W,H,cutW,cutDepth,whole,removed,remaining},`A una placa rectangular de ${W} × ${H} cm se li retalla una peça rectangular de ${cutW} cm d’amplada i ${cutDepth} cm de fondària en un racó. L’àrea que queda és ${remaining} cm². Quina amplada tenia la peça retirada?`,cutW,['Calcula quina àrea s’ha tret restant l’àrea que queda de l’àrea inicial.','Divideix l’àrea retirada per la fondària coneguda.'],[`Àrea inicial = ${W}×${H} = ${whole} cm²`,`Àrea retirada = ${whole}−${remaining} = ${removed} cm²`,`Amplada retirada = ${removed}÷${cutDepth} = ${cutW} cm`]);
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
  const metricFamilySpecs=Object.freeze([
    Object.freeze({id:'escala-decimal-longitud-capacitat',name:'Conversió d’unitats de longitud i capacitat a l’escala decimal',level:1,generators:[1,3],variantRule:'longitud i capacitat; un o més canvis per potències de deu'}),
    Object.freeze({id:'equivalencies-massa-factor-1000',name:'Conversió d’unitats de massa per equivalències de mil en mil',level:1,generators:[2],variantRule:'t ↔ kg ↔ g ↔ mg; cada pas multiplica o divideix per 1000'}),
    Object.freeze({id:'mesura-mixta',name:'Operar amb una mesura composta i unitats diferents',level:2,generators:[1002],variantRule:'sumar m i cm, convertir mm i restar'}),
    Object.freeze({id:'talls-combinats',name:'Optimitzar la distribució de talls sota restriccions',level:3,generators:[1001],variantRule:'reconstruir el mínim de barres comprovant compatibilitat dels talls'})
  ]);
  function metricFamilyFor(type,steps=1){
    if(type===1001)return metricFamilySpecs.find(f=>f.id==='talls-combinats');
    if(type===1002)return metricFamilySpecs.find(f=>f.id==='mesura-mixta');
    if(type===2)return metricFamilySpecs.find(f=>f.id==='equivalencies-massa-factor-1000');
    return metricFamilySpecs.find(f=>f.id==='escala-decimal-longitud-capacitat');
  }
  const conversionsFamilySpecs=Object.freeze([
    Object.freeze({id:'conversio-superficies',name:'Convertir unitats de superfície',level:2,generators:[1,4],variantRule:'conversions directes i contextualitzades, en tots dos sentits; factor quadràtic'}),
    Object.freeze({id:'mesura-mixta',name:'Operar amb mesures mixtes i unitats diferents',level:2,generators:[2],variantRule:'suma de dues mesures; comparteix procediment amb la família de mesura mixta del tema metric'}),
    Object.freeze({id:'comparar-equivalencies',name:'Comparar mesures equivalents o no equivalents',level:1,generators:[3],variantRule:'longitud, massa, capacitat i superfície; no inclou temps'}),
    Object.freeze({id:'carrega-amb-dos-limits',name:'Optimitzar una càrrega amb límit de massa i de nombre d’objectes',level:3,generators:[1001],variantRule:'combinar dues caixes sota dues restriccions'}),
    Object.freeze({id:'ordenar-mesures',name:'Ordenar mesures d’àrea i reconstruir-ne el valor central',level:2,generators:[1003],variantRule:'tres superfícies expressades en unitats diferents'}),
    Object.freeze({id:'operar-arees-mixtes',name:'Operar amb diverses superfícies en unitats diferents',level:2,generators:[1004],variantRule:'sumar m² i dm², restar cm² i expressar el resultat en dm²'}),
    Object.freeze({id:'diagnosticar-error-superficie',name:'Diagnosticar i corregir un factor de conversió d’àrea',level:2,generators:[1005],variantRule:'detectar l’ús del factor lineal en lloc del quadràtic'})
  ]);
  function conversionsFamilyFor(type){return conversionsFamilySpecs.find(f=>f.generators.includes(Number(type)))||null;}
  function conversionsFamilyInfo(key){return conversionsFamilySpecs.find(f=>f.id===key)||null;}
  const perimeterFamilySpecs=Object.freeze([
    Object.freeze({id:'perimetre-directe',name:'Sumar els costats coneguts del contorn',level:1,generators:[1,2,3,6,7],bankVariants:[],variantRule:'quadrat, rectangle, triangle, polígon regular i polígon irregular; una sola operació de contorn conegut'}),
    Object.freeze({id:'circumferencia-directa',name:'Calcular la longitud d’una circumferència',level:2,generators:[4],bankVariants:['P03'],variantRule:'radi a diàmetre i C=πd amb π=3,14 i arrodoniment explícit'}),
    Object.freeze({id:'figura-l-cantonada',name:'Calcular el perímetre d’una figura en L',level:2,generators:[5],bankVariants:[],variantRule:'els trams substituïts per un retall de cantonada es compensen'}),
    Object.freeze({id:'reconstruir-costat-des-del-perimetre',name:'Reconstruir un costat a partir del perímetre',level:2,generators:[1002],bankVariants:['P05'],variantRule:'aïllar una longitud en les fórmules de quadrat, rectangle, triangle o polígon regular'}),
    Object.freeze({id:'circumferencia-inversa',name:'Reconstruir radi o diàmetre des de la circumferència',level:2,generators:[1003],bankVariants:[],variantRule:'desfer C=πd i, per al radi, dividir també per 2'}),
    Object.freeze({id:'contorn-entallat',name:'Calcular el contorn d’una figura amb entallada',level:2,generators:[1004],bankVariants:[],variantRule:'deduir quins trams es cancel·len i afegir les dues profunditats'}),
    Object.freeze({id:'perimetre-unitats-mixtes',name:'Sumar costats amb unitats diferents',level:2,generators:[1005],bankVariants:[],variantRule:'convertir totes les longituds a cm abans de sumar'}),
    Object.freeze({id:'comparar-perimetres',name:'Comparar dos perímetres i trobar-ne la diferència',level:2,generators:[1006],bankVariants:[],variantRule:'calcular dos contorns i restar-los'}),
    Object.freeze({id:'diagnosticar-error-perimetre',name:'Detectar i corregir errors de fórmula del perímetre',level:2,generators:[1007],bankVariants:[],variantRule:'identificar costats omesos, àrea confosa amb perímetre o costats comptats dues vegades'}),
    Object.freeze({id:'perimetre-amb-obertura',name:'Calcular la tanca necessària amb una obertura',level:2,generators:[1008],bankVariants:['P01'],variantRule:'calcular el contorn complet i restar l’entrada sense tanca'}),
    Object.freeze({id:'cost-material-per-contorn',name:'Calcular el cost del material que cobreix un contorn',level:2,generators:[1009],bankVariants:['P02'],variantRule:'perímetre en cm, conversió a m i multiplicació pel preu lineal'}),
    Object.freeze({id:'voltes-circumferencia',name:'Calcular una distància a partir de voltes d’una roda',level:2,generators:[1010],bankVariants:['P04'],variantRule:'longitud d’una circumferència per nombre de voltes; π=3,14'}),
    Object.freeze({id:'optimitzar-area-amb-tanca',name:'Optimitzar àrea amb perímetre i restricció de dimensions',level:3,generators:[1001],bankVariants:[],variantRule:'incloure la porta en el perímetre i comparar àrees de rectangles enters permesos'})
  ]);
  function perimeterFamilyFor(type){return perimeterFamilySpecs.find(f=>f.generators.includes(Number(type)))||null;}
  function perimeterFamilyInfo(key){return perimeterFamilySpecs.find(f=>f.id===key)||null;}
  const areaFamilySpecs=Object.freeze([
    Object.freeze({id:'producte-base-alcada',name:'Multiplicar base per alçada per calcular una àrea',level:1,generators:[1,2,7],bankVariants:[],variantRule:'quadrat com a cas de costats iguals, rectangle i paral·lelogram amb alçada perpendicular'}),
    Object.freeze({id:'meitat-producte-dimensions',name:'Prendre la meitat del producte de dues dimensions',level:1,generators:[3,4],bankVariants:[],variantRule:'base i alçada perpendicular del triangle; diagonals del rombe'}),
    Object.freeze({id:'comptar-quadrats-unitat',name:'Mesurar una regió comptant quadrats unitaris',level:1,generators:[1003],bankVariants:[],variantRule:'sumar les cel·les cobertes per les files d’una quadrícula'}),
    Object.freeze({id:'area-trapezi',name:'Calcular l’àrea d’un trapezi',level:2,generators:[5],bankVariants:[],variantRule:'sumar les dues bases paral·leles, multiplicar per l’alçada perpendicular i dividir per dos'}),
    Object.freeze({id:'compondre-arees-figures',name:'Combinar àrees de parts sense solapament',level:2,generators:[6,1002],bankVariants:['A03','A06'],variantRule:'restar una part retallada o sumar parts adjacents'}),
    Object.freeze({id:'costat-quadrat-des-de-larea',name:'Reconstruir el costat d’un quadrat a partir de l’àrea',level:2,generators:[1004],bankVariants:[],variantRule:'arrel quadrada exacta d’un quadrat perfecte'}),
    Object.freeze({id:'reconstruir-dimensio-rectangle-area',name:'Reconstruir una dimensió rectangular a partir de l’àrea',level:2,generators:[1005],bankVariants:['A04'],variantRule:'dividir l’àrea per la dimensió coneguda'}),
    Object.freeze({id:'reconstruir-dimensio-meitat-producte',name:'Reconstruir una dimensió d’una àrea de mig producte',level:2,generators:[1006],bankVariants:[],variantRule:'multiplicar l’àrea per dos i dividir per la dimensió coneguda; triangle o rombe'}),
    Object.freeze({id:'reconstruir-dimensio-trapezi',name:'Reconstruir una base o l’alçada del trapezi',level:2,generators:[1007],bankVariants:[],variantRule:'aïllar la base o l’alçada a partir de ((B+b)×h)/2'}),
    Object.freeze({id:'comparar-arees',name:'Calcular i comparar dues àrees',level:2,generators:[1008],bankVariants:['A07'],variantRule:'calcular àrees i trobar-ne la diferència; pot imposar perímetres iguals'}),
    Object.freeze({id:'cobrir-superficie',name:'Calcular peces senceres per cobrir una superfície',level:2,generators:[1009],bankVariants:['A01','A02'],variantRule:'calcular superfície útil, convertir longitud per a la rajola o restar obertures i arrodonir cap amunt'}),
    Object.freeze({id:'cost-per-superficie',name:'Calcular el cost d’una superfície',level:2,generators:[1010],bankVariants:['A05'],variantRule:'calcular àrea i multiplicar pel preu per unitat quadrada'}),
    Object.freeze({id:'diagnosticar-error-area',name:'Detectar i corregir errors en fórmules d’àrea',level:2,generators:[1011],bankVariants:[],variantRule:'distingir àrea/perímetre o corregir un factor 2'}),
    Object.freeze({id:'reconstruir-dimensio-figura-composta',name:'Reconstruir una dimensió d’una figura composta',level:2,generators:[1012],bankVariants:[],variantRule:'restar l’àrea restant de l’àrea total i dividir l’àrea retirada per una dimensió coneguda'}),
    Object.freeze({id:'perimetre-minim-amb-area-fixada',name:'Minimitzar el perímetre amb una àrea fixa',level:3,generators:[1001],bankVariants:[],variantRule:'enumerar parelles de factors enters admissibles i comparar-ne els perímetres'})
  ]);
  function areaFamilyFor(type){return areaFamilySpecs.find(f=>f.generators.includes(Number(type)))||null;}
  function areaFamilyInfo(key){return areaFamilySpecs.find(f=>f.id===key)||null;}
  const timeFamilySpecs=Object.freeze([
    Object.freeze({id:'equivalencies-temporals',name:'Convertir i reconèixer equivalències temporals',level:1,generators:[1,5],variantRule:'equivalències de 60 s/min/h, 24 h/dia, 7 dies/setmana, 12 mesos/any; direccions i formats numèrics'}),
    Object.freeze({id:'hora-final',name:'Calcular l’hora final a partir de l’inici i una durada',level:2,generators:[2],variantRule:'sumar la durada i normalitzar HH:MM; pot travessar la mitjanit amb l’endemà indicat'}),
    Object.freeze({id:'durada-entre-hores',name:'Calcular la durada entre dues hores',level:2,generators:[3],variantRule:'restar hores inicial i final; inclou l’endemà quan travessa mitjanit'}),
    Object.freeze({id:'descompondre-durades',name:'Expressar una durada en hores/minuts o minuts/segons',level:2,generators:[4],variantRule:'divisió entera i residu en base 60'}),
    Object.freeze({id:'reconstruir-hora-inicial',name:'Reconstruir l’hora inicial a partir de la final i la durada',level:2,generators:[1002],variantRule:'restar durada a una hora final l’endemà; l’enunciat fixa els dies'}),
    Object.freeze({id:'operar-durades-i-pausas',name:'Sumar durades i pauses de diverses activitats',level:2,generators:[1003],variantRule:'tres activitats i dues pauses, resposta en minuts'}),
    Object.freeze({id:'detectar-error-base-sexagesimal',name:'Detectar i corregir l’error de base 100 en durades',level:2,generators:[1004],variantRule:'convertir hores a minuts amb factor 60 i sumar els minuts'}),
    Object.freeze({id:'seleccionar-unitat-temporal',name:'Escollir la unitat adequada per a una durada quotidiana',level:1,generators:[1005],variantRule:'segons, minuts, hores i dies en contextos familiars'}),
    Object.freeze({id:'comparar-durades',name:'Comparar durades expressades en hores i minuts',level:2,generators:[1006],variantRule:'normalitzar tres durades a minuts i identificar la més llarga'}),
    Object.freeze({id:'transbordament-invers',name:'Reconstruir una sortida amb transbordaments i termini',level:3,generators:[1001],variantRule:'coordinar dues freqüències, trajectes, caminada i hora límit'})
  ]);
  function timeFamilyFor(type){return timeFamilySpecs.find(f=>f.generators.includes(Number(type)))||null;}
  function timeFamilyInfo(key){return timeFamilySpecs.find(f=>f.id===key)||null;}
  function metricFamilyInfo(key){return metricFamilySpecs.find(f=>f.id===key)||null;}
  function generate(id,random=Math.random){const d=catalog.find(d=>d.id===id);if(!d)throw Error('Família desconeguda');const q=d.build(random);if(new Set(q.options).size!==4)throw Error('Opcions repetides');for(let i=q.options.length-1;i>0;i--){const j=n(random,0,i);[q.options[i],q.options[j]]=[q.options[j],q.options[i]];}return q;}
  function extend(topics,banks){for(let i=0;i<banks.length;i++){const make=banks[i];banks[i]=(...args)=>{const q=make(...args);if(q&&q.primaryTopic==='perimetres'){const key=({P01:'perimetre-amb-obertura',P02:'cost-material-per-contorn',P03:'circumferencia-directa',P04:'voltes-circumferencia',P05:'reconstruir-costat-des-del-perimetre'})[String(q.type)];if(key)return {...q,perimeterFamily:key,familyId:key};}if(q&&q.primaryTopic==='arees'){const key=({A01:'cobrir-superficie',A02:'cobrir-superficie',A03:'compondre-arees-figures',A04:'reconstruir-dimensio-rectangle-area',A05:'cost-per-superficie',A06:'compondre-arees-figures',A07:'comparar-arees'})[String(q.type)];if(key)return {...q,areaFamily:key,familyId:key};}return q;};}for(const t of topics){if(t.id==='problemes')continue;const ds=catalog.filter(d=>d.topic===t.id);if(!ds.length)continue;const original=t.gen;let turn=ds.length,lastFamily=null;t.gen=function(...args){for(let tries=0;tries<120;tries++){const slot=turn++%(ds.length+(['perimetres','arees'].includes(t.id)?1:0)),q=slot<ds.length?generate(ds[slot].id):original.apply(this,args);if(!['conversions','temps','perimetres','arees'].includes(t.id))return q;const family=q.conversionsFamily||q.timeFamily||q.metricFamily||q.perimeterFamily||q.areaFamily||q.familyId||q.type;if(family!==lastFamily||tries===119){lastFamily=family;return q;}}return original.apply(this,args);};}catalog.filter(d=>d.level===3).forEach((d,i)=>{const key='R'+String(i+1).padStart(2,'0');banks.push(()=>({...generate(d.id),type:key,patternId:key,primaryTopic:d.topic,difficultyBank:'measureProblems',difficultyKey:key,family:'Raonament',examCompatible:true}));});}
  root.MIFirstMeasureTasks=Object.freeze({catalog:Object.freeze(catalog.map(Object.freeze)),metricFamilySpecs,metricFamilyFor,metricFamilyInfo,conversionsFamilySpecs,conversionsFamilyFor,conversionsFamilyInfo,timeFamilySpecs,timeFamilyFor,timeFamilyInfo,perimeterFamilySpecs,perimeterFamilyFor,perimeterFamilyInfo,areaFamilySpecs,areaFamilyFor,areaFamilyInfo,generate,extend});
})(typeof window==='undefined'?globalThis:window);
