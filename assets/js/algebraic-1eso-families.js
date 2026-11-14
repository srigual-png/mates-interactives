/* Famílies matemàtiques revisades del Lot 1 del Sentit algebraic de 1r d'ESO. */
(function(root){
  'use strict';
  const specs={
    traduccio:[
      {id:'traduir-frase-a-expressio',name:'Traduir una frase verbal directa a una expressió algebraica',level:1,variants:{1:['direct']},generators:['traduccio:1#direct','T6']},
      {id:'interpretar-expressio-en-paraules',name:'Interpretar una expressió algebraica amb paraules',level:1,types:[2],generators:['traduccio:2']},
      {id:'modelitzar-relacio-contextual-simple',name:'Modelitzar una relació directa d’un context amb una expressió',level:1,types:[3],generators:['traduccio:3','T1','T3']},
      {id:'modelitzar-relacio-contextual-composta',name:'Construir una expressió per a una situació amb diverses quantitats',level:2,types:[6],generators:['traduccio:6','T2','T4']},
      {id:'traduir-expressio-amb-agrupacio',name:'Traduir una frase en què una operació afecta una suma agrupada',level:2,variants:{1:['grouped']},generators:['traduccio:1#grouped','T7']},
      {id:'avaluar-expressio-per-substitucio',name:'Substituir valors de variables i calcular una expressió',level:1,types:[4,5],generators:['traduccio:4','traduccio:5','T5','M6'],sharedWith:['monomis']}
    ],
    patrons:[
      {id:'completar-patro-additiu',name:'Completar o continuar una successió amb canvi additiu constant',level:1,types:[1],variants:{3:['additive'],6:['additive']},generators:['patrons:1','P1','P2','P4']},
      {id:'identificar-regla-recurrent',name:'Identificar i descriure la regla recurrent d’un patró',level:1,types:[2],generators:['patrons:2','P7']},
      {id:'continuar-patro-multiplicatiu',name:'Continuar una successió amb factor multiplicatiu constant',level:1,variants:{3:['multiplicative'],6:['multiplicative']},generators:['patrons:3','P3']},
      {id:'calcular-elements-figura-repetitiva',name:'Calcular elements d’una figura que n’afegeix una quantitat constant',level:2,types:[4],generators:['patrons:4','P5']},
      {id:'reconstruir-patro-triangular',name:'Reconstruir el nombre de punts d’un patró triangular per acumulació',level:2,types:[5],generators:['patrons:5','P6']}
    ],
    monomis:[
      {id:'identificar-coeficient-amb-signe',name:'Identificar el coeficient d’un terme, inclosos els signes implícits',level:1,types:[1],generators:['monomis:1','M1']},
      {id:'identificar-terme-independent-amb-signe',name:'Identificar el terme independent i conservar-ne el signe',level:1,types:[2],generators:['monomis:2','M2']},
      {id:'identificar-termes-i-signes',name:'Identificar els termes d’una expressió i els signes que els acompanyen',level:1,types:[3],generators:['monomis:3','M5']},
      {id:'reconeixer-termes-semblants',name:'Reconèixer si dos termes tenen la mateixa part literal',level:1,types:[4],generators:['monomis:4']},
      {id:'avaluar-expressio-per-substitucio',name:'Substituir valors de variables i calcular una expressió',level:1,generators:['M6'],sharedWith:['traduccio']}
    ],
    simplificacio:[
      {id:'reduir-termes-sempre-amb-la-mateixa-part-literal',name:'Reduir termes semblants d’una mateixa part literal',level:1,types:[1,5],generators:['simplificacio:1','simplificacio:5','S1','S2','S4','M3','M4']},
      {id:'simplificar-expressio-lineal-agrupant-termes',name:'Simplificar una expressió lineal agrupant termes amb x i termes constants',level:2,types:[3,6],generators:['simplificacio:3','simplificacio:6','S3','S5','S6']}
    ],
    equacions:[
      {id:'resoldre-equacio-additiva-dun-pas',name:'Resoldre una equació additiva d’un pas',level:1,types:[1],generators:['equacions:1','E1','E2']},
      {id:'resoldre-equacio-multiplicativa-dun-pas',name:'Resoldre una equació multiplicativa d’un pas',level:1,types:[2],generators:['equacions:2','E3']},
      {id:'resoldre-equacio-lineal-de-dos-passos',name:'Resoldre una equació lineal de dos passos',level:2,types:[3,4],generators:['equacions:3','equacions:4','E4','E5']},
      {id:'modelitzar-i-resoldre-equacio-en-un-context',name:'Modelitzar un context amb una equació i resoldre-la',level:2,types:[7,8],generators:['equacions:7','equacions:8','E6','E7','E8','E9','E10']}
    ],
    computacional:[
      {id:'executar-algorisme-amb-operacions-ordenades',name:'Executar operacions en l’ordre indicat',level:1,types:[1],generators:['computacional:1','C1']},
      {id:'iterar-instruccio-additiva',name:'Iterar una instrucció additiva un nombre determinat de vegades',level:1,types:[2],generators:['computacional:2','C2']},
      {id:'executar-branca-condicional',name:'Seleccionar i executar una branca segons una condició',level:2,types:[3,6],generators:['computacional:3','computacional:6','C3','C6']},
      {id:'detectar-primer-error-dalgorisme',name:'Detectar el primer pas incorrecte d’un algorisme',level:2,types:[4],generators:['computacional:4','C4']},
      {id:'reconstruir-instruccio-absent',name:'Reconstruir una instrucció a partir dels valors inicial i final',level:1,types:[5],generators:['computacional:5','C5']}
    ]
  };
  function topicSpecs(topic){return specs[typeof topic==='string'?topic:topic&&topic.id]||null;}
  function familyFor(topic,q){
    const id=typeof topic==='string'?topic:topic&&topic.id,rows=topicSpecs(id);
    if(!rows||!q)return null;
    if(q.familyId){const direct=rows.find(f=>f.id===q.familyId);if(direct)return direct;}
    const type=String(q.type),pattern=String(q.patternId??q.type),variant=String(q.difficultyVariant||q.familyVariant||'');
    for(const f of rows){
      if(f.variants&&Array.isArray(f.variants[type])&&f.variants[type].includes(variant))return f;
      if((f.generators||[]).includes(pattern)||(f.generators||[]).includes(id+':'+type+'#'+variant))return f;
      if((f.types||[]).some(v=>String(v)===type))return f;
    }
    return null;
  }
  function decorate(topic,q){
    const f=familyFor(topic,q);
    if(!f)return q;
    return {...q,familyId:f.id,familyName:f.name,taskDifficulty:f.level,taskDifficultyStatus:'assigned',diff:f.level};
  }
  function balancePool(topic,pool){
    const rows=topicSpecs(topic);if(!rows)throw new Error('Tema algebraic sense catàleg: '+topic);
    const queues=new Map(rows.map(f=>[f.id,[]]));
    pool.forEach(q=>{const f=familyFor(topic,q);if(!f)throw new Error('Generador sense família: '+topic+':'+q.type);queues.get(f.id).push(decorate(topic,q));});
    const output=[];let last=null;
    while([...queues.values()].some(q=>q.length)){
      let active=[...queues.keys()].filter(id=>queues.get(id).length&&id!==last);
      if(!active.length)active=[...queues.keys()].filter(id=>queues.get(id).length);
      const max=Math.max(...active.map(id=>queues.get(id).length));active=active.filter(id=>queues.get(id).length===max);
      const id=active[Math.floor(Math.random()*active.length)],q=queues.get(id).shift();output.push(q);last=id;
    }
    return output;
  }
  Object.values(specs).forEach(rows=>rows.forEach(Object.freeze));Object.values(specs).forEach(Object.freeze);Object.freeze(specs);
  root.MIFirstAlgebraicFamilies=Object.freeze({specs,topicSpecs,familyFor,decorate,balancePool});
})(typeof window==='undefined'?globalThis:window);
