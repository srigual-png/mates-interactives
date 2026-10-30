/* Quotes explícites. La cobertura es comprova amb les preguntes generades, sense reetiquetar-les. */
(function(root){
  'use strict';
  const POLICIES=Object.freeze({free:null,balanced:Object.freeze([7,7,6]),'1':Object.freeze([20,0,0]),'2':Object.freeze([0,20,0]),'3':Object.freeze([0,0,20])});
  function fail(message){const error=new Error(message);error.code='MI_DIFFICULTY_COVERAGE';throw error;}
  function counts(questions){return [1,2,3].map(n=>questions.filter(q=>q.taskDifficulty===n).length);}
  function choose(pool,topicIds,slots){
    if(!Array.isArray(slots)||slots.length!==3||slots.some(n=>!Number.isInteger(n)||n<0)||slots.reduce((a,b)=>a+b,0)!==20)throw Error('Quotes invàlides: han de sumar 20.');
    const ids=[...new Set(topicIds)],seen=new Set(),candidates=[];
    if(!ids.length||ids.length>20)fail('Cal seleccionar entre un i vint temes.');
    for(const q of pool){if(!ids.includes(q.topicId))continue;if(![1,2,3].includes(q.taskDifficulty))fail('Hi ha una pregunta sense dificultat classificada al tema '+q.topicId+'.');const key=q.topicId+'|'+q.question+'|'+(q.visual||q.svg||'');if(!seen.has(key)){seen.add(key);candidates.push(q);}}
    const topicLevels=ids.map(id=>({id,levels:[1,2,3].filter(n=>slots[n-1]>0&&candidates.some(q=>q.topicId===id&&q.taskDifficulty===n))})).sort((a,b)=>a.levels.length-b.levels.length);
    for(const t of topicLevels)if(!t.levels.length)fail('No s’ha trobat cobertura dels nivells demanats al tema «'+t.id+'». No s’ha substituït per un altre nivell.');
    const failed=new Set();
    function assign(index,left){if(index===topicLevels.length)return [];const key=index+':'+left.join(',');if(failed.has(key))return null;for(const n of topicLevels[index].levels.slice().sort((a,b)=>left[b-1]-left[a-1])){if(left[n-1]===0)continue;const next=left.slice();next[n-1]--;const rest=assign(index+1,next);if(rest)return [[topicLevels[index].id,n],...rest];}failed.add(key);return null;}
    const assigned=assign(0,slots.slice());if(!assigned)fail('Les quotes demanades no permeten incloure tots els temes seleccionats. Canvia els nivells o els temes.');
    const out=[],used=new Set(),topicCount={},familyCount={},left=slots.slice();
    const contextual=q=>!!(q.examProblem||q.examOpen||q.isOpenProblem),family=q=>q.topicId+':'+(q.difficultyKey||q.reasoningFamily||q.type);
    function add(q){out.push(q);used.add(q);left[q.taskDifficulty-1]--;topicCount[q.topicId]=(topicCount[q.topicId]||0)+1;familyCount[family(q)]=(familyCount[family(q)]||0)+1;}
    for(const [id,n] of assigned){const options=candidates.filter(q=>q.topicId===id&&q.taskDifficulty===n);options.sort((a,b)=>Number(contextual(b))-Number(contextual(a)));add(options[0]);}
    for(let n=1;n<=3;n++)while(left[n-1]>0){const options=candidates.filter(q=>q.taskDifficulty===n&&!used.has(q)),preferContext=out.filter(contextual).length<6;options.sort((a,b)=>(preferContext?Number(contextual(b))-Number(contextual(a)):0)||(topicCount[a.topicId]||0)-(topicCount[b.topicId]||0)||(familyCount[family(a)]||0)-(familyCount[family(b)]||0));if(!options.length)fail('No hi ha prou variants diferents de dificultat '+['','baixa','mitjana','alta'][n]+' per complir les quotes. No s’ha substituït per un altre nivell.');add(options[0]);}
    for(let i=out.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[out[i],out[j]]=[out[j],out[i]];}
    return out;
  }
  root.MIDifficultyQuotas=Object.freeze({policies:POLICIES,counts,choose,fail});
})(typeof window==='undefined'?globalThis:window);
