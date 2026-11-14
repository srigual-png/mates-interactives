/* Classificació auditada de les famílies del sentit espacial de 1r d'ESO. */
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
    ],
    triangles:[
      {id:'classificar-costats-triangle',name:'Classificar un triangle segons els costats',level:1,generators:['genTriangles1r:1','T2']},
      {id:'classificar-angles-triangle',name:'Classificar un triangle segons els angles',level:1,generators:['genTriangles1r:2','T3']},
      {id:'angle-que-falta',name:'Calcular l’angle que falta en una suma coneguda',level:1,generators:['genTriangles1r:3','T1'],sharedWith:['angles']},
      {id:'desigualtat-triangular',name:'Decidir si tres longituds poden formar un triangle',level:2,generators:['genTriangles1r:4','T4']},
      {id:'angles-base-isosceles',name:'Calcular els angles de la base d’un triangle isòsceles',level:2,generators:['genTriangles1r:8','T5']},
      {id:'mediatriu-segment',name:'Identificar la mediatriu d’un costat de triangle',level:1,generators:['genTriangles1r:6:mediatriu','T6'],sharedWith:['elements']},
      {id:'bisectriu-angle',name:'Identificar la bisectriu d’un angle de triangle',level:1,generators:['genTriangles1r:6:bisectriu','T6'],sharedWith:['elements']},
      {id:'mediana-triangle',name:'Identificar la mediana d’un triangle',level:1,generators:['genTriangles1r:6:mediana','T6']},
      {id:'altura-triangle',name:'Identificar l’altura d’un triangle',level:1,generators:['genTriangles1r:6:altura','T6']},
      {id:'centres-rectes-notables-triangle',name:'Relacionar rectes notables i centres d’un triangle',level:1,generators:['genTriangles1r:6:centres','T7']}
    ],
    quadrilaters:[
      {id:'classificar-quadrilaters-per-propietats',name:'Classificar quadrilàters i reconèixer-ne les propietats definidores',level:1,generators:['genQuadrilaters1r:1','genQuadrilaters1r:4','genQuadrilaters1r:5','Q1','Q3','Q4','Q5','Q6']},
      {id:'propietats-diagonals-quadrilaters',name:'Comparar longitud, perpendicularitat i punt mig de les diagonals',level:2,generators:['genQuadrilaters1r:2']},
      {id:'angle-interior-quadrilater',name:'Calcular l’angle que falta en un quadrilàter',level:2,generators:['genQuadrilaters1r:3','Q2']},
      {id:'suma-angles-quadrilater',name:'Reconèixer la suma dels angles interiors d’un quadrilàter',level:1,generators:['genQuadrilaters1r:6:suma'],relatedTo:['suma-angles-interiors']},
      {id:'elements-quadrilater',name:'Reconèixer i comptar costats, vèrtexs i diagonals',level:1,generators:['genQuadrilaters1r:6:elements']}
    ],
    cercle:[
      {id:'elements-circumferencia-cercle',name:'Distingir la circumferència i identificar-ne els elements',level:1,generators:['genCircle1r:1','genCircle1r:7','C5']},
      {id:'relacio-radi-diametre',name:'Relacionar el radi i el diàmetre',level:1,generators:['genCircle1r:1:relacio','genCircle1r:2','C1','C2']},
      {id:'circumferencia-directa',name:'Calcular la longitud d’una circumferència',level:2,generators:['genCircle1r:3','C3'],sharedWith:['perimetres']},
      {id:'circumferencia-inversa',name:'Reconstruir el radi a partir de la longitud d’una circumferència',level:2,generators:['genCircle1r:8','C4'],sharedWith:['perimetres']},
      {id:'raio-circumferencia-diametre',name:'Aproximar π amb la raó entre circumferència i diàmetre',level:1,generators:['genCircle1r:9','C6'],sharedWith:['mesurament']}
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
    else if(id==='triangles'){
      if(type===6)key=/on es tallen|punt on es tallen/.test(text)?'centres-rectes-notables-triangle':/mediatriu/.test(text)?'mediatriu-segment':/bisectriu/.test(text)?'bisectriu-angle':/mediana/.test(text)?'mediana-triangle':/altura/.test(text)?'altura-triangle':null;
      else key=({1:'classificar-costats-triangle',2:'classificar-angles-triangle',3:'angle-que-falta',4:'desigualtat-triangular',8:'angles-base-isosceles'})[type];
    }else if(id==='quadrilaters'){
      const isAngle=type===3||type===6&&/angle que falta/.test(text);
      const isSum=type===6&&/suma dels angles|angles interiors.*360/.test(text);
      const isElement=type===6&&!isAngle&&!isSum;
      key=isAngle?'angle-interior-quadrilater':isSum?'suma-angles-quadrilater':isElement?'elements-quadrilater':type===2?'propietats-diagonals-quadrilaters':'classificar-quadrilaters-per-propietats';
    }else if(id==='cercle')key=type===1&&/relació hi ha entre|doble del radi/.test(text)?'relacio-radi-diametre':({1:'elements-circumferencia-cercle',2:'relacio-radi-diametre',3:'circumferencia-directa',7:'elements-circumferencia-cercle',8:'circumferencia-inversa',9:'raio-circumferencia-diametre'})[type];
    if(q&&q.patternId){const p=String(q.patternId),aliases={E1:'elements-geometria-bàsics',E2:'posicions-relatives-rectes',E3:'posicions-relatives-rectes',E4:'mediatriu-segment',E5:'bisectriu-angle',A1:'classificar-amplitud-angle',A2:'angle-que-falta',A3:'angle-que-falta',A4:'oposats-pel-vertex',A5:'relacions-angles-paral-leles',A6:'completar-volta-amb-tres-angles',A7:'angle-que-falta',P1:'nom-i-costats-poligon',P2:'diagonals-des-dun-vertex',P3:'triangulacio-des-dun-vertex',P4:'suma-angles-interiors',P5:'angle-interior-regular',P6:'repartir-volta-poligon-regular',T1:'angle-que-falta',T2:'classificar-costats-triangle',T3:'classificar-angles-triangle',T4:'desigualtat-triangular',T5:'angles-base-isosceles',T6:/mediatriu/.test(text)?'mediatriu-segment':/bisectriu/.test(text)?'bisectriu-angle':/mediana/.test(text)?'mediana-triangle':'altura-triangle',T7:'centres-rectes-notables-triangle',Q1:'classificar-quadrilaters-per-propietats',Q2:'angle-interior-quadrilater',Q3:'classificar-quadrilaters-per-propietats',Q4:'classificar-quadrilaters-per-propietats',Q5:'classificar-quadrilaters-per-propietats',Q6:'classificar-quadrilaters-per-propietats',C1:'relacio-radi-diametre',C2:'relacio-radi-diametre',C3:'circumferencia-directa',C4:'circumferencia-inversa',C5:'elements-circumferencia-cercle',C6:'raio-circumferencia-diametre'};key=aliases[p]||key;}
    return rows.find(f=>f.id===key)||null;
  }
  function decorate(topic,q){const f=familyFor(topic,q);return f?{...q,familyId:f.id,familyName:f.name,taskDifficulty:f.level,taskDifficultyStatus:'assigned',diff:f.level}:q;}
  Object.values(specs).forEach(rows=>rows.forEach(Object.freeze));Object.values(specs).forEach(Object.freeze);Object.freeze(specs);
  root.MIFirstSpatialFamilies=Object.freeze({specs,topicSpecs,familyFor,decorate});
})(typeof window==='undefined'?globalThis:window);
