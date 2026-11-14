/* Famílies matemàtiques revisades del Lot 1 del Sentit estocàstic de 1r d'ESO. */
(function(root){
  'use strict';
  const specs={
    recollida:[
      {id:'classificar-variable-estadistica',name:'Classificar una variable qualitativa, quantitativa discreta o contínua',level:1,types:[1],generators:['recollida:1','R1']},
      {id:'distingir-poblacio-mostra-individu',name:'Distingir població, mostra i individu estadístic',level:1,types:[2,8],generators:['recollida:2','recollida:8','R2']},
      {id:'distingir-cens-i-mostra',name:'Distingir un cens d’un estudi amb mostra',level:1,types:[3],generators:['recollida:3']},
      {id:'identificar-metode-recollida',name:'Identificar el mètode de recollida de dades',level:1,types:[4],generators:['recollida:4','R6']},
      {id:'seleccionar-mostra-representativa',name:'Valorar si una mostra representa la població',level:2,types:[5],variants:{7:['representativitat']},generators:['recollida:5','recollida:7#representativitat','R3','R8']},
      {id:'detectar-pregunta-esbiaixada',name:'Detectar i corregir el biaix d’una pregunta d’enquesta',level:2,types:[6],generators:['recollida:6','R4','R5']},
      {id:'depurar-dades',name:'Detectar dades duplicades o incoherents abans d’analitzar-les',level:2,variants:{7:['depuracio']},generators:['recollida:7#depuracio','R9']},
      {id:'extreure-conclusio-justificada',name:'Extreure una conclusió limitada per les dades i la mostra',level:2,variants:{7:['conclusio']},generators:['recollida:7#conclusio']},
      {id:'organitzar-estudi-estadistic',name:'Reconèixer les fases bàsiques d’un estudi estadístic',level:1,variants:{7:['procediment']},generators:['recollida:7#procediment']},
      {id:'estimar-proporcio-poblacional',name:'Estimar una proporció de la població a partir d’una mostra',level:2,generators:['R7']}
    ],
    taules:[
      {id:'lectura-freq-absoluta-taula',name:'Llegir una freqüència absoluta en una taula',level:1,types:[1,7,9],generators:['taules:1','taules:7','taules:9']},
      {id:'totalitzar-freq-absolutes',name:'Calcular o interpretar el total a partir de freqüències absolutes',level:1,types:[2,11],generators:['taules:2','taules:11','T6'],sharedWith:['barres']},
      {id:'identificar-categoria-mes-frequent',name:'Identificar la categoria de freqüència màxima',level:1,types:[6],generators:['taules:6'],sharedWith:['barres','sectors']},
      {id:'freq-relativa-i-representacions',name:'Calcular i interpretar la freqüència relativa com a fracció, decimal o percentatge',level:2,types:[3,10,12],generators:['taules:3','taules:10','taules:12','T2']},
      {id:'recuperar-freq-absoluta-des-de-relativa',name:'Recuperar una freqüència absoluta a partir de la relativa i del total',level:2,types:[4],generators:['taules:4']},
      {id:'recuperar-total-des-de-freq-i-relativa',name:'Recuperar el total a partir d’una freqüència absoluta i la relativa',level:2,generators:['T5']},
      {id:'reconstruir-part-complementaria',name:'Reconstruir la freqüència o proporció que falta perquè el total sigui complet',level:2,types:[5,8],generators:['taules:5','taules:8','T3','T4'],sharedWith:['sectors']},
      {id:'calcular-diferencia-frequencies',name:'Calcular la diferència entre freqüències representades',level:2,generators:['T7'],sharedWith:['barres']},
      {id:'recompte-freq-des-de-dades-brutes',name:'Comptar una freqüència a partir d’una llista de dades',level:1,generators:['T1']}
    ],
    barres:[
      {id:'lectura-freq-barra',name:'Llegir una freqüència o categoria en un diagrama de barres',level:1,types:[1,7,13],generators:['barres:1','barres:7','barres:13','G1']},
      {id:'identificar-categoria-mes-frequent',name:'Identificar la categoria de freqüència màxima o mínima',level:1,types:[2,3],generators:['barres:2','barres:3'],sharedWith:['taules','sectors']},
      {id:'comparar-frequencies-barres',name:'Comparar directament les freqüències de dues categories',level:1,types:[8],generators:['barres:8']},
      {id:'calcular-diferencia-frequencies',name:'Calcular la diferència entre freqüències representades',level:2,types:[4],generators:['barres:4','G2'],sharedWith:['taules']},
      {id:'detectar-escala-enganyosa',name:'Detectar quan una escala truncada exagera visualment una diferència',level:2,generators:['G8']},
      {id:'sumar-frequencies-parcials',name:'Sumar les freqüències d’un subconjunt de categories',level:2,types:[5],generators:['barres:5']},
      {id:'totalitzar-freq-absolutes',name:'Calcular o interpretar el total a partir de freqüències absolutes',level:1,types:[6],generators:['barres:6','G3'],sharedWith:['taules']},
      {id:'interpretar-convencions-barres',name:'Interpretar les convencions bàsiques d’un diagrama de barres',level:1,types:[9,10,11,12],generators:['barres:9','barres:10','barres:11','barres:12']},
      {id:'construir-diagrama-barres',name:'Construir un diagrama de barres a partir d’una taula',level:1,generators:['K1']},
      {id:'triar-representacio-estadistica',name:'Triar una representació gràfica adequada a les dades',level:1,generators:['G9'],sharedWith:['sectors']}
    ],
    sectors:[
      {id:'lectura-percentatge-sector',name:'Llegir el percentatge d’una categoria en un diagrama de sectors',level:1,types:[1],generators:['sectors:1','G4']},
      {id:'identificar-categoria-mes-frequent',name:'Identificar la categoria de freqüència màxima',level:1,types:[7],generators:['sectors:7'],sharedWith:['taules','barres']},
      {id:'convertir-percentatge-i-angle',name:'Convertir una proporció entre percentatge i angle central',level:2,types:[2,3],generators:['sectors:2','sectors:3','G6','K3']},
      {id:'convertir-percentatge-i-freq-absoluta',name:'Convertir entre percentatge i freqüència absoluta amb el total conegut',level:2,types:[4,5],generators:['sectors:4','sectors:5','G5']},
      {id:'comparar-proporcions-sector',name:'Comparar proporcions representades en sectors',level:2,types:[6],generators:['sectors:6']},
      {id:'reconstruir-part-complementaria',name:'Reconstruir la freqüència o proporció que falta perquè el total sigui complet',level:2,types:[8,9],generators:['sectors:8','sectors:9'],sharedWith:['taules']},
      {id:'interpretar-diagrama-sectors',name:'Interpretar el total, les parts i l’ús d’un diagrama de sectors',level:1,types:[10,11,12,13],generators:['sectors:10','sectors:11','sectors:12','sectors:13']},
      {id:'triar-representacio-estadistica',name:'Triar una representació gràfica adequada a les dades',level:1,generators:['G9'],sharedWith:['barres']}
    ]
  };
  function topicSpecs(topic){return specs[typeof topic==='string'?topic:topic&&topic.id]||null;}
  function familyFor(topic,q){
    const rows=topicSpecs(topic);if(!rows||!q)return null;
    if(q.familyId){const direct=rows.find(f=>f.id===q.familyId);if(direct)return direct;}
    const pattern=String(q.patternId||'');
    if(pattern){const byPattern=rows.find(f=>f.generators.includes(pattern));if(byPattern)return byPattern;}
    const type=Number(q.type);
    return rows.find(f=>{
      const hasType=Array.isArray(f.types)&&f.types.includes(type),variantTypes=Object.keys(f.variants||{}).map(Number);
      if(!hasType&&!variantTypes.includes(type))return false;
      const allowed=f.variants&&f.variants[type];
      return !allowed||allowed.includes(String(q.variantId||''));
    })||null;
  }
  function decorate(topic,q){const f=familyFor(topic,q);return f?{...q,familyId:f.id,familyName:f.name,taskDifficulty:f.level,taskDifficultyStatus:'assigned',diff:f.level}:q;}
  function balancePool(topic,pool){
    const rows=topicSpecs(topic);if(!rows)throw new Error('Tema estocàstic sense catàleg: '+topic);
    const queues=new Map(rows.map(f=>[f.id,[]]));
    pool.forEach(raw=>{const q=decorate(topic,raw);if(!q.familyId)throw new Error('Generador sense família: '+topic+':'+q.type+(q.variantId?'/'+q.variantId:''));queues.get(q.familyId).push(q);});
    for(const queue of queues.values()){const shuffled=root.shuffle?root.shuffle(queue):queue.slice();queue.length=0;queue.push(...shuffled);}
    const selected=[];let previousFamily=null,previousContext=null,remaining=pool.length;
    while(remaining){
      let active=[...queues.keys()].filter(id=>queues.get(id).length&&id!==previousFamily);
      if(!active.length)active=[...queues.keys()].filter(id=>queues.get(id).length);
      const max=Math.max(...active.map(id=>queues.get(id).length));
      active=active.filter(id=>queues.get(id).length===max);
      if(root.shuffle&&active.length>1)active=root.shuffle(active);
      const id=active[0],queue=queues.get(id);let at=queue.length-1;
      if(previousContext!==null){for(let i=queue.length-1;i>=0;i--)if(queue[i].contextId!==previousContext){at=i;break;}}
      const q=queue.splice(at,1)[0];selected.push(q);previousFamily=id;previousContext=q.contextId===undefined?null:q.contextId;remaining--;
    }
    return selected.reverse();
  }
  Object.values(specs).forEach(rows=>rows.forEach(Object.freeze));Object.values(specs).forEach(Object.freeze);Object.freeze(specs);
  root.MIFirstStochasticFamilies=Object.freeze({specs,topicSpecs,familyFor,decorate,balancePool});
})(typeof window==='undefined'?globalThis:window);
