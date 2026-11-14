/* Classificació auditada de les famílies del primer lot de sentit espacial. */
(function(root){
  'use strict';
  const specs={
    elements:[
      {id:'elements-geometria-bàsics',name:'Identificar punts, rectes, segments i semirectes',level:1,generators:['genElementsVarietat:1','genElementsVarietat:7','genElementsVarietat:8:elements','E1']},
      {id:'posicions-relatives-rectes',name:'Classificar la posició relativa de dues rectes',level:1,generators:['genElementsVarietat:2','E2','E3']},
      {id:'punt-mig-segment',name:'Calcular una meitat coneguda d’un segment',level:1,generators:['genElementsVarietat:3']},
      {id:'mediatriu-segment',name:'Identificar i aplicar la mediatriu d’un segment',level:1,generators:['genElementsVarietat:4','genElementsVarietat:8:mediatriu','E4']},
      {id:'bisectriu-angle',name:'Identificar i aplicar la bisectriu d’un angle',level:1,generators:['genElementsVarietat:5','genElementsVarietat:8:bisectriu','E5']},
      {id:'alineacio-i-incidencia',name:'Interpretar alineació i pertinença de punts',level:1,generators:['genElementsVarietat:6']}
    ],
    angles:[
      {id:'classificar-amplitud-angle',name:'Classificar angles segons l’amplitud',level:1,generators:['genAngles:1','A1']},
      {id:'angle-que-falta',name:'Calcular l’angle que falta en una suma coneguda',level:1,generators:['genAngles:2','genAngles:3','genAngles:5','A2','A3','A7']},
      {id:'completar-volta-amb-tres-angles',name:'Completar una volta després de combinar tres angles coneguts',level:2,generators:['A6']},
      {id:'oposats-pel-vertex',name:'Aplicar la igualtat dels angles oposats pel vèrtex',level:1,generators:['genAngles:4','A4']},
      {id:'relacions-angles-paral-leles',name:'Aplicar relacions d’angles en paral·leles amb transversal',level:2,generators:['genAngles:6','A5']},
      {id:'angle-interior-regular',name:'Calcular l’angle interior d’un polígon regular',level:2,generators:['genAngles:7','P5'],sharedWith:['poligons']}
    ],
    poligons:[
      {id:'nom-i-costats-poligon',name:'Relacionar el nom d’un polígon amb el nombre de costats',level:1,generators:['genPoligons1r:1','genPoligons1r:2','P1']},
      {id:'elements-poligon',name:'Identificar elements i definició de polígon',level:1,generators:['genPoligons1r:8']},
      {id:'regularitat-poligons',name:'Distingir polígons regulars i irregulars',level:1,generators:['genPoligons1r:3']},
      {id:'convexitat-poligons',name:'Distingir polígons convexos i còncaus',level:1,generators:['genPoligons1r:4']},
      {id:'diagonals-des-dun-vertex',name:'Comptar diagonals des d’un vèrtex',level:1,generators:['genPoligons1r:5','P2']},
      {id:'triangulacio-des-dun-vertex',name:'Comptar triangles en la triangulació des d’un vèrtex',level:1,generators:['P3']},
      {id:'suma-angles-interiors',name:'Calcular la suma dels angles interiors',level:2,generators:['genPoligons1r:6','P4']},
      {id:'angle-interior-regular',name:'Calcular l’angle interior d’un polígon regular',level:2,generators:['P5'],sharedWith:['angles']},
      {id:'repartir-volta-poligon-regular',name:'Relacionar angles centrals i nombre de costats',level:2,generators:['genPoligons1r:7','P6']}
    ]
  };
  function topicSpecs(topic){return specs[typeof topic==='string'?topic:topic&&topic.id]||null;}
  function familyFor(topic,q){
    const id=typeof topic==='string'?topic:topic&&topic.id,rows=topicSpecs(id);if(!rows)return null;
    if(q&&q.familyId){const f=rows.find(x=>x.id===q.familyId);if(f)return f;}
    const type=Number(q&&q.type),text=String((q&&q.question||'')+' '+(q&&q.correct||'')).replace(/<[^>]*>/g,' ').toLowerCase();let key;
    if(id==='elements'){
      if(type===8){key=/mediatriu/.test(text)?'mediatriu-segment':/bisectriu/.test(text)?'bisectriu-angle':'elements-geometria-bàsics';}
      else key={1:'elements-geometria-bàsics',2:'posicions-relatives-rectes',3:'punt-mig-segment',4:'mediatriu-segment',5:'bisectriu-angle',6:'alineacio-i-incidencia',7:'elements-geometria-bàsics'}[type];
    }else if(id==='angles')key=({1:'classificar-amplitud-angle',2:'angle-que-falta',3:'angle-que-falta',4:'oposats-pel-vertex',5:'angle-que-falta',6:'relacions-angles-paral-leles',7:'angle-interior-regular'})[type];
    else if(id==='poligons')key=({1:'nom-i-costats-poligon',2:'nom-i-costats-poligon',3:'regularitat-poligons',4:'convexitat-poligons',5:'diagonals-des-dun-vertex',6:'suma-angles-interiors',7:'repartir-volta-poligon-regular',8:'elements-poligon',10:'angle-interior-regular',11:'repartir-volta-poligon-regular'})[type];
    if(q&&q.patternId){const p=String(q.patternId),aliases={E1:'elements-geometria-bàsics',E2:'posicions-relatives-rectes',E3:'posicions-relatives-rectes',E4:'mediatriu-segment',E5:'bisectriu-angle',A1:'classificar-amplitud-angle',A2:'angle-que-falta',A3:'angle-que-falta',A4:'oposats-pel-vertex',A5:'relacions-angles-paral-leles',A6:'completar-volta-amb-tres-angles',A7:'angle-que-falta',P1:'nom-i-costats-poligon',P2:'diagonals-des-dun-vertex',P3:'triangulacio-des-dun-vertex',P4:'suma-angles-interiors',P5:'angle-interior-regular',P6:'repartir-volta-poligon-regular'};key=aliases[p]||key;}
    return rows.find(f=>f.id===key)||null;
  }
  function decorate(topic,q){const f=familyFor(topic,q);return f?{...q,familyId:f.id,familyName:f.name,taskDifficulty:f.level,taskDifficultyStatus:'assigned',diff:f.level}:q;}
  Object.values(specs).forEach(rows=>rows.forEach(Object.freeze));Object.values(specs).forEach(Object.freeze);Object.freeze(specs);
  root.MIFirstSpatialFamilies=Object.freeze({specs,topicSpecs,familyFor,decorate});
})(typeof window==='undefined'?globalThis:window);
