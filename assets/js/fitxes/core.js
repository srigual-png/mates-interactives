/* Motor independent del curs i dels formats. No toca l'estat de pràctica. */
(function () {
  'use strict';
  const copyShuffle = a => { a=a.slice(); for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; };
  function counts(n, percentages) {
    const raw=percentages.map(p=>n*p/100), result=raw.map(Math.floor);
    const order=raw.map((v,i)=>({i,r:v-result[i]})).sort((a,b)=>b.r-a.r||a.i-b.i);
    const remaining=n-result.reduce((a,b)=>a+b,0);
    for(let j=0;j<remaining;j++) result[order[j].i]++;
    return result;
  }
  const maximum=(p,i)=>100-p.reduce((s,v,j)=>s+(i===j?0:v),0);
  function validate(c, catalog) {
    if(![5,10,15,20,25,30].includes(c.count)) return 'Selecciona un nombre d’exercicis vàlid.';
    if(!Array.isArray(c.percentages)||c.percentages.length!==3||c.percentages.some(p=>!Number.isInteger(p)||p<0||p>100||p%10)||c.percentages.reduce((a,b)=>a+b,0)!==100) return 'Els percentatges han de sumar exactament el 100 %.';
    if(!c.topics.length) return 'Selecciona almenys un tema.';
    if(new Set(c.topics).size!==c.topics.length||c.topics.some(id=>!catalog.some(t=>t.id===id&&t.levels.length))) return 'Hi ha un tema que no està disponible en paper.';
    if(c.topics.length>c.count) return 'Hi ha més temes que exercicis. Augmenta el nombre d’exercicis o redueix els temes.';
    if(!['grouped','mixed'].includes(c.order)||!['compact','normal','wide'].includes(c.space)||!['docx','pdf','both'].includes(c.format)||!['none','answers','steps'].includes(c.solutions)) return 'Revisa les opcions de la fitxa.';
    return '';
  }
  // Flux de cost mínim: el cost de la plaça extra prioritza cobrir el mínim
  // de cada tema. Les arestes residuals permeten corregir assignacions prèvies.
  function allocate(c,catalog) {
    const error=validate(c,catalog); if(error) throw new Error(error);
    const topics=c.topics.map(id=>catalog.find(t=>t.id===id)), quotas=counts(c.count,c.percentages);
    quotas.forEach((n,i)=>{const available=topics.reduce((s,t)=>s+(t.levels.includes(i+1)?(t.capacities?.[i]??c.count):0),0);if(n>available)throw new Error(`No hi ha prou exercicis diferents de dificultat ${['baixa','mitjana','alta'][i]} en els temes seleccionats: se’n demanen ${n} i n’hi ha ${available}. Redueix-ne la quantitat o selecciona més temes.`);});
    const sink=4+topics.length, graph=Array.from({length:sink+1},()=>[]);
    function edge(a,b,cap,cost){const x={to:b,cap,cost,rev:graph[b].length,initial:cap};graph[a].push(x);graph[b].push({to:a,cap:0,cost:-cost,rev:graph[a].length-1});return x;}
    quotas.forEach((v,i)=>edge(0,i+1,v,0));
    const matrix=topics.map((t,i)=>[1,2,3].map(l=>edge(l,4+i,t.levels.includes(l)?Math.min(c.count,t.capacities?.[l-1]??c.count):0,0)));
    const base=Math.floor(c.count/topics.length);
    topics.forEach((t,i)=>{edge(4+i,sink,base,0);edge(4+i,sink,1,100);});
    let flow=0;
    while(flow<c.count){
      const dist=Array(graph.length).fill(Infinity),prev=[];dist[0]=0;
      for(let k=0;k<graph.length-1;k++){let changed=false;graph.forEach((es,u)=>es.forEach((e,j)=>{if(e.cap&&dist[e.to]>dist[u]+e.cost){dist[e.to]=dist[u]+e.cost;prev[e.to]=[u,j];changed=true;}}));if(!changed)break;}
      if(!prev[sink])break;
      for(let v=sink;v!==0;){const [u,j]=prev[v],e=graph[u][j];e.cap--;graph[v][e.rev].cap++;v=u;}flow++;
    }
    const rows=matrix.map(row=>row.map(e=>e.initial-e.cap));
    if(flow!==c.count||rows.some(row=>row.reduce((a,b)=>a+b,0)<base)) throw new Error('No es poden combinar aquestes dificultats amb una representació equilibrada de tots els temes. Canvia els percentatges o els temes.');
    return topics.map((t,i)=>({topic:t,counts:rows[i]}));
  }
  async function generate(c,catalog,previousKeys=[]) {
    const plan=allocate(c,catalog),used=new Set(previousKeys),questions=[];
    for(const {topic,counts:quota} of plan){
      for(let l=1;l<=3;l++){
        let obtained=0;
        for(let attempt=0;obtained<quota[l-1]&&attempt<1200;attempt++){
          const q=await topic.generate(l); if(!q||q.level!==l)continue;
          const key=JSON.stringify([topic.id,q.fingerprint||q.question.replace(/\s+/g,' ').trim(),(q.options||[]).slice().sort()]);
          if(used.has(key))continue;
          used.add(key);questions.push({...q,key,topicId:topic.id,topicName:topic.name});obtained++;
        }
        if(obtained!==quota[l-1])throw new Error('No s’han pogut obtenir prou exercicis diferents de «'+topic.name+'» amb dificultat '+['baixa','mitjana','alta'][l-1]+'. Redueix-ne la quantitat o modifica la configuració i torna-ho a provar.');
      }
      await new Promise(resolve=>setTimeout(resolve,0));
    }
    let ordered=questions;
    if(c.order==='mixed'){
      ordered=copyShuffle(questions);
      const easy=ordered.findIndex(q=>q.level===1);if(easy>0)[ordered[0],ordered[easy]]=[ordered[easy],ordered[0]];
      // Intercala els difícils mentre quedin preguntes baixes o mitjanes.
      for(let i=1;i<ordered.length;i++)if(ordered[i].level===3&&ordered[i-1].level===3){const j=ordered.findIndex((q,k)=>k>i&&q.level<3);if(j>=0)[ordered[i],ordered[j]]=[ordered[j],ordered[i]];}
    }
    const version=crypto.randomUUID?crypto.randomUUID().slice(0,8):Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,6);
    return {version,config:JSON.parse(JSON.stringify(c)),questions:ordered.map((q,i)=>({...q,number:i+1}))};
  }
  window.MIWorksheets={counts,maximum,validate,allocate,generate};
})();
