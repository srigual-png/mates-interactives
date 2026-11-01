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
  const profiles={basic:'Bàsic',balanced:'Equilibrat',hard:'Difícil'};
  const pilot=(c,catalog)=>!!c.profile&&catalog.every(t=>Array.isArray(t.families));
  const allowed=c=>c.profile==='basic'?[1,2]:[1,2,3];
  function minimum(topic,c,items=topic.families,covered=[]){
    const required=topic.requiredContents,full=(1<<required.length)-1;
    const mask=contents=>contents.reduce((m,x)=>m|(required.includes(x)?1<<required.indexOf(x):0),0);
    const dp=Array(full+1).fill(Infinity);dp[mask(covered)]=0;
    for(let m=0;m<=full;m++)if(Number.isFinite(dp[m]))for(const f of items)if(allowed(c).includes(f.level)){const n=m|mask(f.contents);dp[n]=Math.min(dp[n],dp[m]+1);}
    return dp[full];
  }
  function profilePlan(c,catalog){
    const topics=c.topics.map(id=>catalog.find(t=>t.id===id));
    const plan=topics.map(topic=>({topic,count:minimum(topic,c)})),min=plan.reduce((n,r)=>n+r.count,0);
    if(min>c.count)throw new Error(`Calen com a mínim ${min} exercicis per cobrir tots els continguts. Augmenta la quantitat o redueix els temes.`);
    for(let n=min;n<c.count;n++)plan.reduce((a,b)=>a.count<=b.count?a:b).count++;
    return plan;
  }
  async function generateProfile(c,catalog,previousKeys){
    const error=validate(c,catalog);if(error)throw new Error(error);
    const plan=profilePlan(c,catalog),used=new Set(previousKeys),questions=[];let adjusted=false,coverageFallback=false;
    for(const {topic,count} of plan){
      const pool=[],seen=new Set(),familyUse={},contentUse={};
      // Finite candidate bank. Never try indefinitely to invent unavailable variety.
      for(const l of allowed(c))for(let attempt=0;attempt<320;attempt++){
        const raw=await topic.generate(l);if(!raw||raw.level!==l)continue;
        const meta=topic.metadata?topic.metadata(raw):raw;
        if(!meta||meta.level!==raw.level||!meta.family||!meta.contents)continue;
        const q={...raw,...meta,topicId:topic.id,topicName:topic.name};
        const numbers=q.question.match(/-?\d+(?:[.,]\d+)?/g)||[];
        const signature=JSON.stringify([q.family,numbers,q.answer,(q.options||[]).slice().sort()]);
        const key=JSON.stringify([q.question.replace(/\s+/g,' ').trim(),(q.options||[]).slice().sort()]);
        if(seen.has(signature)||used.has(key))continue;
        seen.add(signature);pool.push({...q,key,numbers});
      }
      await new Promise(resolve=>setTimeout(resolve,0));
      const chosen=[];
      function eligible(q){
        if(topic.balanceContents&&!q.contents.some(x=>(contentUse[x]||0)===Math.min(...topic.requiredContents.map(y=>contentUse[y]||0))))return false;
        if(used.has(q.key)||q.level===3&&(familyUse[q.family]||0)>=2)return false;
        return !chosen.some(x=>{if(x.family!==q.family)return false;const a=new Set(x.numbers),b=new Set(q.numbers);const overlap=[...a].filter(n=>b.has(n)).length;return overlap/Math.max(a.size,b.size,1)>=0.8;});
      }
      for(let i=0;i<count;i++){
        const covered=Object.keys(contentUse),missing=topic.requiredContents.filter(x=>!covered.includes(x));
        let candidates=pool.filter(eligible).filter(q=>{
          const after=[...covered,...q.contents];
          return minimum(topic,c,pool.filter(x=>x!==q&&eligible(x)),after)<=count-i-1;
        });
        if(c.profile==='hard'&&candidates.some(q=>q.level===2))candidates=candidates.filter(q=>q.level!==1||q.contents.some(x=>missing.includes(x)));
        // MCD/mcm are separate activities: alternate the less represented content.
        const balance=topic.balanceContents?Math.min(...topic.requiredContents.map(x=>contentUse[x]||0)):0;
        const ranked=copyShuffle(candidates).map(q=>{
          const coverage=q.contents.filter(x=>missing.includes(x)).length;
          const contentBalance=topic.balanceContents&&q.contents.some(x=>(contentUse[x]||0)===balance)?1:0;
          const preferred=c.profile==='basic'?(q.level===1?0:20):c.profile==='hard'?(q.level===3?0:q.level===2?2:5):(q.level===2?0:q.level===1?1:2);
          return {q,score:coverage*10000+contentBalance*5000-(familyUse[q.family]||0)*100-preferred*10+(c.profile==='balanced'&&q.level===[2,1,2,3,2][i%5]?150:0)-(c.profile==='hard'&&q.level===1?1000:0)};
        }).sort((a,b)=>b.score-a.score);
        if(!ranked.length)break;
        const q=ranked[0].q;chosen.push(q);pool.splice(pool.indexOf(q),1);used.add(q.key);
        familyUse[q.family]=(familyUse[q.family]||0)+1;q.contents.forEach(x=>contentUse[x]=(contentUse[x]||0)+1);
      }
      if(!topic.requiredContents.every(x=>chosen.some(q=>q.contents.includes(x))))throw new Error(`No hi ha prou activitats diferents per cobrir «${topic.name}». Redueix la selecció de temes i torna-ho a provar.`);
      if(c.profile==='hard'&&chosen.some(q=>q.level===2))adjusted=true;
      if(c.profile==='basic'&&chosen.some(q=>q.level===2))adjusted=true;
      if(c.profile==='hard'&&chosen.some(q=>q.level===1))coverageFallback=true;
      questions.push(...chosen.sort((a,b)=>a.level-b.level));
    }
    if(questions.length<c.count)throw new Error(`No hi ha prou exercicis diferents per arribar a ${c.count}. Pots demanar ${questions.length} exercicis amb aquesta selecció o seleccionar més temes. No s’ha exportat cap document.`);
    const ordered=c.order==='mixed'?copyShuffle(questions):questions;
    return {version:crypto.randomUUID().slice(0,8),config:JSON.parse(JSON.stringify(c)),notice:[adjusted?'Hem completat la fitxa amb exercicis de nivell mitjà per mantenir la varietat.':'',coverageFallback?'També hem inclòs exercicis senzills per treballar tots els continguts seleccionats.':''].filter(Boolean).join(' '),questions:ordered.map(({numbers,...q},i)=>({...q,number:i+1}))};
  }
  function validate(c, catalog) {
    if(!(pilot(c,catalog)?Number.isInteger(c.count)&&c.count>=1&&c.count<=30:[5,10,15,20,25,30].includes(c.count))) return 'Selecciona un nombre d’exercicis vàlid.';
    if(!pilot(c,catalog)&&(!Array.isArray(c.percentages)||c.percentages.length!==3||c.percentages.some(p=>!Number.isInteger(p)||p<0||p>100||p%10)||c.percentages.reduce((a,b)=>a+b,0)!==100)) return 'Els percentatges han de sumar exactament el 100 %.';
    if(c.profile&&!profiles[c.profile])return 'Selecciona un perfil de dificultat vàlid.';
    if(!c.topics.length) return 'Selecciona almenys un tema.';
    if(new Set(c.topics).size!==c.topics.length||c.topics.some(id=>!catalog.some(t=>t.id===id&&t.levels.length))) return 'Hi ha un tema que no està disponible en paper.';
    if(!pilot(c,catalog)&&c.topics.length>c.count) return 'Hi ha més temes que exercicis. Augmenta el nombre d’exercicis o redueix els temes.';
    if(!['grouped','mixed'].includes(c.order)||!['compact','normal','wide'].includes(c.space)||!['docx','pdf','both'].includes(c.format)||!['none','answers','steps'].includes(c.solutions)) return 'Revisa les opcions de la fitxa.';
    if(pilot(c,catalog))try{profilePlan(c,catalog);}catch(e){return e.message;}
    return '';
  }
  // Flux de cost mínim: el cost de la plaça extra prioritza cobrir el mínim
  // de cada tema. Les arestes residuals permeten corregir assignacions prèvies.
  function allocate(c,catalog) {
    const error=validate(c,catalog); if(error) throw new Error(error);
    if(pilot(c,catalog))return profilePlan(c,catalog);
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
    if(pilot(c,catalog))return generateProfile(c,catalog,previousKeys);
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
  window.MIWorksheets={counts,maximum,validate,allocate,generate,profiles,minimum};
})();
