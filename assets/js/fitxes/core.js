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
  const worksheetTypes={standard:'Estàndard',extension:'Ampliació'};
  const pilot=(c,catalog)=>catalog.length>0&&catalog.every(t=>Array.isArray(t.families));
  const isStandard=q=>q.standard===true;
  const noChallengesMessage='No hi ha cap repte adequat disponible per a aquesta selecció. Pots generar una fitxa Estàndard.';
  function minimum(topic,c,items=topic.families,covered=[]){
    const required=topic.requiredContents,full=(1<<required.length)-1;
    const mask=contents=>contents.reduce((m,x)=>m|(required.includes(x)?1<<required.indexOf(x):0),0);
    const dp=Array(full+1).fill(Infinity);dp[mask(covered)]=0;
    for(let m=0;m<=full;m++)if(Number.isFinite(dp[m]))for(const f of items)if(isStandard(f)){const n=m|mask(f.contents);dp[n]=Math.min(dp[n],dp[m]+1);}
    return dp[full];
  }
  function typePlan(c,catalog){
    const topics=c.topics.map(id=>catalog.find(t=>t.id===id));
    const plan=topics.map(topic=>({topic,count:minimum(topic,c)})),min=plan.reduce((n,r)=>n+r.count,0);
    if(!Number.isFinite(min))throw new Error('No es poden cobrir tots els continguts amb les activitats disponibles. Redueix els temes seleccionats.');
    if(min>c.count)throw new Error(`Calen com a mínim ${min} exercicis per cobrir tots els continguts. Augmenta la quantitat o redueix els temes.`);
    for(let n=min;n<c.count;n++)plan.reduce((a,b)=>a.count<=b.count?a:b).count++;
    return plan;
  }
  function noChallenges(){const e=new Error(noChallengesMessage);e.code='NO_CHALLENGES';return e;}
  function covers(topic,questions){
    if(!topic.requiredContents.every(x=>questions.some(q=>q.contents.includes(x))))return false;
    if(topic.balanceContents){const totals=topic.requiredContents.map(x=>questions.filter(q=>q.contents.includes(x)).length);return Math.max(...totals)-Math.min(...totals)<=1;}
    return true;
  }
  function similar(a,b){
    if(a.family!==b.family)return false;
    // Semantic variants with the same input values remain one activity even when
    // the surrounding story or distractors change. Close data are conservative.
    const x=new Set(a.numbers),y=new Set(b.numbers),overlap=[...x].filter(n=>y.has(n)).length;
    return a.variantKey&&a.variantKey===b.variantKey||x.size+y.size>0&&overlap/Math.max(x.size,y.size)>=0.8;
  }
  async function generateType(c,catalog,previousKeys){
    const error=validate(c,catalog);if(error)throw new Error(error);
    const plan=typePlan(c,catalog),used=new Set(previousKeys),questions=[],banks=[];
    for(const {topic,count} of plan){
      const pool=[],seen=new Set();
      const available=topic.families.filter(f=>isStandard(f)||c.worksheetType==='extension'&&f.challenge);
      for(const l of [...new Set(available.map(f=>f.level))])for(let attempt=0;attempt<240;attempt++){
        const raw=await topic.generate(l);if(!raw||raw.level!==l)continue;
        const meta=topic.metadata?topic.metadata(raw):raw;
        if(!meta||meta.level!==raw.level||!meta.family||!meta.contents||!isStandard(meta)&&!(c.worksheetType==='extension'&&meta.challenge))continue;
        const q={...raw,...meta,topicId:topic.id,topicName:topic.name};
        if(q.challenge&&(!q.answer||!q.steps?.length||!q.challengeReason))continue;
        const numbers=q.question.match(/-?\d+(?:[.,]\d+)?/g)||[];
        const variantKey=JSON.stringify([q.family,numbers,q.answer]);
        const key=JSON.stringify([q.question.replace(/\s+/g,' ').trim(),(q.options||[]).slice().sort()]);
        if(seen.has(variantKey)||used.has(key))continue;
        seen.add(variantKey);pool.push({...q,key,numbers,variantKey});
      }
      await new Promise(resolve=>setTimeout(resolve,0));
      const chosen=[],familyUse={},contentUse={};
      const standard=pool.filter(isStandard);
      function eligible(q){
        if(topic.balanceContents&&!q.contents.some(x=>(contentUse[x]||0)===Math.min(...topic.requiredContents.map(y=>contentUse[y]||0))))return false;
        return !used.has(q.key)&&!chosen.some(x=>similar(x,q));
      }
      for(let i=0;i<count;i++){
        const covered=Object.keys(contentUse),missing=topic.requiredContents.filter(x=>!covered.includes(x));
        const candidates=standard.filter(eligible);
        // Only compute the covering set when there are uncovered contents.
        const viable=candidates.filter(q=>minimum(topic,c,candidates.filter(x=>x!==q),[...covered,...q.contents])<=count-i-1);
        const ranked=copyShuffle(viable).map(q=>({q,score:q.contents.filter(x=>missing.includes(x)).length*10000-(familyUse[q.family]||0)*100+(q.level===[2,1,2][i%3]?40:0)})).sort((a,b)=>b.score-a.score);
        if(!ranked.length)break;
        const q=ranked[0].q;chosen.push(q);standard.splice(standard.indexOf(q),1);used.add(q.key);
        familyUse[q.family]=(familyUse[q.family]||0)+1;q.contents.forEach(x=>contentUse[x]=(contentUse[x]||0)+1);
      }
      if(c.worksheetType==='standard'&&!covers(topic,chosen))throw new Error(`No hi ha prou activitats diferents per cobrir «${topic.name}». Redueix la selecció de temes i torna-ho a provar.`);
      questions.push(...chosen);banks.push({topic,pool,count});
    }
    if(c.worksheetType==='extension'){
      // A soft ceiling, never a required quota. Every replacement is checked
      // against the complete standard selection before it becomes final.
      const target=Math.max(1,Math.round(c.count*0.3)),familyUse={},topicUse={};let added=0;
      while(added<target||banks.some(({topic,count})=>questions.filter(q=>q.topicId===topic.id).length<count)){
        const replacements=[];
        for(const {topic,pool,count} of banks){
          const local=questions.filter(q=>q.topicId===topic.id);
          if(local.length>=count&&added>=target)continue;
          for(const q of pool.filter(q=>q.challenge)){
            if(used.has(q.key)||(familyUse[q.family]||0)>=2||questions.some(x=>similar(x,q)))continue;
            const gap=local.length<count;
            if(gap&&local.length+1===count&&!covers(topic,local.concat(q)))continue;
            if(gap&&topic.balanceContents){const totals=topic.requiredContents.map(x=>local.concat(q).filter(v=>v.contents.includes(x)).length);if(Math.max(...totals)-Math.min(...totals)>1)continue;}
            const index=gap?questions.length:questions.findIndex(old=>old.topicId===topic.id&&!old.challenge&&covers(topic,local.filter(x=>x!==old).concat(q)));
            if(index<0)continue;
            replacements.push({q,index,score:(gap?100000:0)-(topicUse[topic.id]||0)*1000-(familyUse[q.family]||0)*100});
          }
        }
        const next=copyShuffle(replacements).sort((a,b)=>b.score-a.score)[0];if(!next)break;
        const {q,index}=next;questions[index]=q;used.add(q.key);familyUse[q.family]=(familyUse[q.family]||0)+1;topicUse[q.topicId]=(topicUse[q.topicId]||0)+1;added++;
      }
      if(!added)throw noChallenges();
    }
    for(const {topic} of banks)if(!covers(topic,questions.filter(q=>q.topicId===topic.id)))throw new Error(`No hi ha prou activitats diferents per cobrir «${topic.name}». Redueix la selecció de temes i torna-ho a provar.`);
    if(questions.length<c.count){
      let viable=0;
      // A viable offer must also survive a new balanced allocation: the sum of
      // partial topic banks alone can promise an impossible worksheet.
      for(let n=questions.length;n>0;n--){
        try{if(typePlan({...c,count:n},catalog).every(({topic,count})=>count<=questions.filter(q=>q.topicId===topic.id).length)){viable=n;break;}}catch{}
      }
      throw new Error(`No hi ha prou exercicis diferents per arribar a ${c.count}. ${viable?'Pots demanar '+viable+' exercicis amb aquesta selecció o seleccionar més temes.':'Redueix la selecció de temes.'} No s’ha exportat cap document.`);
    }
    const grouped=plan.flatMap(({topic})=>questions.filter(q=>q.topicId===topic.id).sort((a,b)=>a.level-b.level));
    const ordered=c.order==='mixed'?copyShuffle(grouped):grouped;
    return {version:crypto.randomUUID().slice(0,8),config:JSON.parse(JSON.stringify(c)),questions:ordered.map(({numbers,variantKey,...q},i)=>({...q,number:i+1}))};
  }
  function validate(c, catalog) {
    if(!(pilot(c,catalog)?Number.isInteger(c.count)&&c.count>=1&&c.count<=30:[5,10,15,20,25,30].includes(c.count))) return 'Selecciona un nombre d’exercicis vàlid.';
    if(!pilot(c,catalog)&&(!Array.isArray(c.percentages)||c.percentages.length!==3||c.percentages.some(p=>!Number.isInteger(p)||p<0||p>100||p%10)||c.percentages.reduce((a,b)=>a+b,0)!==100)) return 'Els percentatges han de sumar exactament el 100 %.';
    if(pilot(c,catalog)&&!worksheetTypes[c.worksheetType])return 'Selecciona un tipus de fitxa vàlid.';
    if(!c.topics.length) return 'Selecciona almenys un tema.';
    if(new Set(c.topics).size!==c.topics.length||c.topics.some(id=>!catalog.some(t=>t.id===id&&t.levels.length))) return 'Hi ha un tema que no està disponible en paper.';
    if(!pilot(c,catalog)&&c.topics.length>c.count) return 'Hi ha més temes que exercicis. Augmenta el nombre d’exercicis o redueix els temes.';
    if(!['grouped','mixed'].includes(c.order)||!['compact','normal','wide'].includes(c.space)||!['docx','pdf','both'].includes(c.format)||!['none','answers','steps'].includes(c.solutions)) return 'Revisa les opcions de la fitxa.';
    if(pilot(c,catalog))try{typePlan(c,catalog);}catch(e){return e.message;}
    return '';
  }
  // Flux de cost mínim: el cost de la plaça extra prioritza cobrir el mínim
  // de cada tema. Les arestes residuals permeten corregir assignacions prèvies.
  function allocate(c,catalog) {
    const error=validate(c,catalog); if(error) throw new Error(error);
    if(pilot(c,catalog))return typePlan(c,catalog);
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
    if(pilot(c,catalog))return generateType(c,catalog,previousKeys);
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
  window.MIWorksheets={counts,maximum,validate,allocate,generate,worksheetTypes,minimum,noChallengesMessage};
})();
