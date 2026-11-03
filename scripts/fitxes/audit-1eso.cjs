/* Executa des de l'arrel: node scripts/fitxes/test.cjs */
const fs=require('fs'),path=require('path'),http=require('http'),assert=require('assert');
const {chromium}=require('C:/Users/srigu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=process.cwd();
const server=http.createServer((req,res)=>{const f=path.join(root,decodeURIComponent(req.url.split('?')[0]));if(!f.startsWith(root+path.sep)){res.writeHead(403).end();return;}fs.readFile(f,(err,data)=>{if(err){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.js':'text/javascript','.css':'text/css','.html':'text/html','.ttf':'font/ttf'})[path.extname(f)]||'application/octet-stream');res.end(data);});});
(async()=>{
  await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port;
  const browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
  try{
    const page=await browser.newPage(),errors=[],requests=[];page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>requests.push(r.url()));
    await page.goto(origin+'/1eso/sentit-numeric.html');await page.waitForSelector('#ws-generate');
    assert(!requests.some(s=>s.includes('/vendor/fitxes/')),'Les dependències han de ser diferides');
    page.on('console',m=>{if(process.env.MI_AUDIT_VERBOSE&&m.text().startsWith('AUDIT '))console.log(m.text());});
    const report=await page.evaluate(()=>{
      const C=MIWorksheetConfig,T=C.topics,assert=(ok,msg)=>{if(!ok)throw Error(msg);};
      const close=(a,b,msg)=>assert(Math.abs(a-b)<1e-8,msg+': '+a+' ≠ '+b);
      const nums=s=>(s.match(/[−-]?\d+(?:,\d+)?/g)||[]).map(x=>Number(x.replace('−','-').replace(',','.')));
      const scalar=q=>nums(q.answer)[0];
      function calc(s){
        s=s.replace(/[.;]$/,'').replace(/(\d),(?=\d)/g,'$1.').replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]+/g,s=>'^'+[...s].map(c=>'⁰¹²³⁴⁵⁶⁷⁸⁹'.indexOf(c)).join(''));
        assert(/^[\d\s+−*/().\[\]^√×÷-]+$/.test(s),'expressió no prevista '+s);
        if(s.includes('÷'))s=s.replace(/(\d+(?:\.\d+)?\/\d+(?:\.\d+)?)/g,'($1)');
        s=s.replace(/−/g,'-').replace(/×/g,'*').replace(/÷/g,'/').replace(/\^/g,'**').replace(/√(\d+)/g,'Math.sqrt($1)').replace(/\[/g,'(').replace(/\]/g,')');
        return Function('return ('+s+')')();
      }
      const gcd2=(a,b)=>{while(b)[a,b]=[b,a%b];return Math.abs(a);};
      const lcm2=(a,b)=>a/gcd2(a,b)*b;
      const prime=n=>n>=2&&Array.from({length:Math.max(0,Math.floor(Math.sqrt(n))-1)},(_,i)=>i+2).every(d=>n%d!==0);
      function style(q){
        const all=[q.question,q.answer,...q.steps,...q.options].join(' ');
        assert(!/undefined|NaN|Infinity|\d\.\d|\d\s*x\s*\d/.test(all),'format o dades '+all);
        assert(!/(^|[\s(=+])-(?=\d)|\d\s*-\s*\d/.test(all),'signe menys ASCII '+all);
        assert(!/Quin es|quin es|fraccio\b|maquines|fabrica|safates idèntics|Quants (safates|cistelles|bosses|capses)|de les milers/.test(all),'llengua '+all);
        assert(q.question.length>10&&q.answer&&q.steps.length,'estructura incompleta');
      }
      function baseCheck(id,type,q){
        const n=nums(q.question),answer=scalar(q),expr=()=>calc(q.question.split(':').pop().trim());
        const expected=value=>close(answer,value,id+':'+type+' '+q.question+' / '+q.answer);
        if(id==='naturals'){
          if(type===1){const a=nums(q.answer),sorted=n.slice().sort((a,b)=>/menor a major/.test(q.question)?a-b:b-a);assert(JSON.stringify(a)===JSON.stringify(sorted),'ordenació natural');assert(q.question.includes(';'),'separadors naturals');}
          if(type===2)assert(q.answer.includes(n[0]>n[1]?'>':'<'),'comparació natural');
          if(type===3){const u=/miler/.test(q.question)?1000:/centenes/.test(q.question)?100:10;expected(Math.floor((n[0]+u/2)/u)*u);assert(n[0]%u!==0&&answer!==n[0],'arrodoniment no trivial');roundDirections.add(Math.sign(answer-n[0]));}
          if(type===4)expected(n[0]/n[1]);if(type===5)expected(n[0]*n[1]+n[2]);
        }
        if(id==='decimal_sys'){
          if(type===1||type===4){const word=q.question,unit=/centenes de miler/.test(word)?100000:/desenes de miler/.test(word)?10000:/milers/.test(word)?1000:/centenes/.test(word)?100:/desenes/.test(word)?10:1;expected(Math.floor(n[0]/unit)%10*unit);assert(answer>0,'valor posicional no trivial');}
          if(type===2){close(calc(q.answer),n[0],'descomposició');assert(q.question.includes('suma segons el valor posicional'),'procediment de descomposició');}
          if(type===3)expected(n.slice(0,6).reduce((s,v,i)=>s+v*10**(5-i),0));
        }
        if(id==='ops'){
          if(type<=3)expected(expr());
          if(type===4){const a=nums(q.answer);close(n[0],n[1]*a[0]+a[1],'identitat divisió');assert(a[1]>=0&&a[1]<n[1],'residu admissible');assert(/divisió exacta/.test(q.question)===(a[1]===0),'etiqueta exacta');divisionModes.add(q.divisionMode);}
          if(type===5){expected(n[2]-n[0]*n[1]);assert(answer>0,'canvi no nul');}
          if(type===6)expected(n[0]*n[1]*n[2]);
        }
        if(id==='potencies'){
          if(type===1)expected(n[0]);if(type===2)expected(n[1]);
          if(type===3)close(calc(q.answer),n.reduce((a,b)=>a*b,1),'producte com a potència');
          if(type===4)close(calc(q.answer),n[0]**n[1],'potència com a producte');
          if(type===5)expected(n[0]**n[1]);if(type===6)expected(Math.sqrt(n[0]));
          if(type===7){const a=nums(q.answer);assert(a[0]===n[1]&&a[1]===n[0]&&n[0]*n[0]===n[1],'operació inversa de potència');}
        }
        if(id==='jerarquia'){if(type!==7)expected(expr());else expected(n[0]*(n[1]+n[2])-n[3]+n[4]);}
        if(id==='divis'){
          if([1,5].includes(type)){const matches=q.options.filter(v=>Number(v)%n[0]===0);assert(matches.length===1&&Number(matches[0])===answer,'múltiple únic');}
          if(type===2)assert(q.answer.startsWith(n[0]%n[1]===0?'Sí':'No'),'divisibilitat');
          if(type===3){const matches=q.options.filter(v=>prime(Number(v)));assert(matches.length===1&&Number(matches[0])===answer,'primer únic');}
          if(type===4){close(calc(q.answer),n[0],'factorització primera');for(const f of q.answer.split('×')){const base=nums(f)[0];assert(prime(base),'factor primer '+f);}}
          if(type===6){const matches=q.options.filter(v=>n[0]%Number(v)!==0);assert(matches.length===1&&Number(matches[0])===answer,'no divisor únic');}
          if(type===7)for(const d of n.slice(1))assert(q.answer.includes((n[0]%d===0?'Sí':'No')+' ('+d+')'),'agrupacions');
        }
        if(id==='mcmmcd'){
          expected(n.reduce((a,b)=>[1,5].includes(type)?gcd2(a,b):lcm2(a,b)));
          if(type===4)assert(!q.question.includes('esdeveniments')&&(/Ara|ara/.test(q.question)),'coincidència concreta inicial');
          if(type===5){const group=Object.keys(C.groupGrammar).find(g=>q.question.includes(g)),[adjective,quantifier]=C.groupGrammar[group];assert(q.question.includes(group+' '+adjective)&&q.question.includes(quantifier+' '+group),'concordança '+group);}
        }
        if(id==='enters'){
          if(type===1){const sorted=n.slice().sort((a,b)=>/menor a major/.test(q.question)?a-b:b-a);assert(JSON.stringify(nums(q.answer))===JSON.stringify(sorted),'ordenació enters');assert(q.question.includes(';'),'separadors enters');}
          if([2,3,4].includes(type))expected(expr());if(type===5)expected(n[0]+n[1]);if(type===6)expected(n[0]+n[1]-n[2]);if(type===7)expected(n[0]+(/dreta/.test(q.question)?n[1]:-n[1]));
        }
        if(id==='decimals'){
          if([1,2].includes(type))expected(expr());if(type===3){expected(Math.floor((Math.round(n[0]*1000)+5)/10)/100);assert(Math.round(n[0]*1000)%10!==0,'arrodoniment decimal no trivial');roundDirections.add(Math.sign(answer-n[0]));}
          if(type===4)expected(n[0]/n[1]);if(type===5)close(calc(q.answer),n[0],'decimal a fracció');if(type===6){expected(n[3]-n[0]-n[1]-n[2]);assert(answer>0,'canvi decimal no nul');}
          if(type===7)expected(n[0]*n[1]);if(type===8){expected(Math.abs(n[0]-n[1]));assert(answer>0,'error absolut no nul');}if(type===9)expected(Math.abs(n[0]-n[1])/n[0]*100);
        }
        if(id==='fraccions'){
          if(type===1)close(calc(q.answer),n[0]/n[1],'simplificació');
          if([2,3,4,5].includes(type))close(calc(q.answer),expr(),'operació fraccions');
          if(type===6){const sign=n[0]/n[1]>n[2]/n[3]?'>':n[0]/n[1]<n[2]/n[3]?'<':'=';assert(q.answer.includes(' '+sign+' '),'comparació de fraccions');}
          if(type===7){correctOptionPositions.add(q.options.indexOf(q.answer));const matches=q.options.filter(v=>Math.abs(calc(v)-n[0]/n[1])<1e-9);assert(matches.length===1&&matches[0]===q.answer,'equivalència única');}
          if(type===8)expected(n[0]*(1-n[1]/n[2]));if(type===9)assert(q.answer===(n[0]<n[1]?'Fracció pròpia':'Fracció impròpia'),'classificació fracció');if(type===10)expected(n[0]/n[1]*n[2]);if(type===11){const a=nums(q.answer);close(a[0],n[0]/n[1],'decimal equivalent');close(a[1],100*n[0]/n[1],'percentatge equivalent');}
        }
        if(id==='proporcionalitat'){
          if(type===1){const negative=/edat|número de sabata|àrea|taxi|nota mitjana|habitants|temperatura exterior/.test(q.question);assert(q.answer===(negative?'No proporcional':'Directament proporcional'),'classificació proporcional: '+q.question+' → '+q.answer);}
          if(type===2)expected(n[1]/n[0]*n[2]);if([3,4,7].includes(type))expected(n[1]/n[0]*n[2]);if(type===5)expected(n[1]/n[0]);
          if(type===6){const ratios=n.slice(3,6).map((v,i)=>v/n[i]);assert(q.answer===(ratios.every(r=>Math.abs(r-ratios[0])<1e-9)?'Sí':'No'),'taula proporcional');}
          if(type===8)expected(n[2]*n[1]/n[0]);
        }
        if(id==='percentatges'){
          if(type===1)expected(n[0]/100*n[1]);if(type===2)expected(n[0]/n[1]*100);if(type===3||type===7)expected(n[0]*100/n[1]);if(type===4)expected(n[0]*(100+n[1])/100);if(type===5)expected(n[0]*(100-n[1])/100);if(type===6)expected(q.question.includes('/')?n[0]/n[1]*100:n[0]/100);
        }
      }
      function extensionCheck(topic,id,q){
        const d=q.audit.data,{a,b,c,k,p,x,r,unit,target,fee,n,cycles,end,d:dvs,q:quotient,e,cents,income,out,start,prefix,offset,f}=d;
        const key=topic+'/'+id;let expected;
        switch(key){
          case 'naturals/inversa-divisio':expected=dvs*quotient+r;break;
          case 'naturals/interval-arrodoniment':expected=[target-unit/2,target+unit/2-1];break;
          case 'naturals/error-ordenacio':expected=[a,b,c];break;
          case 'naturals/estrategia-producte':expected=a*(10+b);break;
          case 'decimal_sys/xifra-desconeguda':expected=b;break;
          case 'decimal_sys/intercanvi-invers':expected=10*a+b;break;
          case 'decimal_sys/error-zero-posicional':expected=1000*a+10*b+c;close(calc(q.answer),expected,key+' resposta');break;
          case 'decimal_sys/reagrupament':expected=100*a+10*b;break;
          case 'ops/operand-invers':expected=x;break;
          case 'ops/diagnostic-divisio':expected=[quotient,r];break;
          case 'ops/comparar-ofertes':expected=[n*p+fee,n*(p+1)];break;
          case 'ops/distributiva-error':expected=a*(b+c);break;
          case 'potencies/exponent-invers':expected=e;break;
          case 'potencies/error-potencia':expected=a*a;break;
          case 'potencies/arrel-acotada':expected=[a,a+1];assert(a*a<a*a+offset&&(a*a+offset)<(a+1)**2,'arrel no exacta');break;
          case 'potencies/comparar-inverses':expected=false;assert(Math.abs(Math.sqrt(a*a+b)-a-Math.sqrt(b))>1e-9,'contraexemple arrel');break;
          case 'jerarquia/escollir-parentesis':case 'jerarquia/equivalencia':expected=a*(b+c);break;
          case 'jerarquia/primer-error':expected=a+b*c;break;
          case 'jerarquia/casella-inversa':expected=x;break;
          case 'divis/xifra-divisible':{const xs=Array.from({length:10},(_,x)=>x).filter(x=>(10*prefix+x)%3===0&&(10*prefix+x)%5===0);assert(xs.length===1,'xifra única');expected=xs[0];break;}
          case 'divis/factor-compost':expected=a*b*p;close(calc(q.answer),expected,key+' resposta');break;
          case 'divis/multiples-condicionats':expected=Array.from({length:3},(_,i)=>dvs*(k+i)).filter(n=>n%(dvs+1)!==0);break;
          case 'divis/primer-contraexemple':expected=a*b;assert(!prime(expected),'nombre compost');break;
          case 'mcmmcd/mcd-error':expected=gcd2(6*k,10*k);break;
          case 'mcmmcd/mcd-invers':expected=[5,8,9].map(x=>x*k).filter(b=>gcd2(6*k,b)===k)[0];break;
          case 'mcmmcd/mcm-invers':expected=[2,3,4].map(x=>x*k).filter(b=>lcm2(3*k,b)===6*k)[0];break;
          case 'mcmmcd/coincidencies-interval':{const period=lcm2(6*k,10*k);expected=Array.from({length:Math.floor(end/period)},(_,i)=>(i+1)*period);break;}
          case 'enters/saldo-invers':expected=start;break;
          case 'enters/error-resta-negatiu':expected=a+b;break;
          case 'enters/distancia-desplacament':expected=[Math.abs(a-b),a-b];break;
          case 'enters/valor-absolut-condicio':expected=-a;assert(-a<b&&a>=b,'valor absolut únic');break;
          case 'decimals/factor-invers':expected=b/10;break;
          case 'decimals/error-coma':expected=(a/10)*(b/10);break;
          case 'decimals/interval-decimal':expected=[cents/100-0.005,cents/100+0.004];break;
          case 'decimals/comparar-costos':expected=[(n*p+fee)/100,n*(p+30)/100];break;
          case 'fraccions/error-suma':expected=[a*d.d+c*b,b*d.d];close(calc(q.answer),a/b+c/d.d,key+' resposta');break;
          case 'fraccions/complement-invers':expected=[b-a,b];close(calc(q.answer),1-a/b,key+' resposta');break;
          case 'fraccions/comparar-creuats':expected=true;assert(a/b<(a+1)/(b+1),'comparació fraccions');break;
          case 'fraccions/total-desconegut':expected=b*unit;break;
          case 'proporcionalitat/comparar-models':expected=[k*x,k*x+fee];break;
          case 'proporcionalitat/corregir-taula':expected=c*k;break;
          case 'proporcionalitat/antecedent-invers':expected=x;break;
          case 'proporcionalitat/escollir-estrategia':expected=k*x*f;break;
          case 'percentatges/preu-invers':expected=20*a;break;
          case 'percentatges/canvis-successius':expected=100*a*(1+p/100)*(1-p/100);break;
          case 'percentatges/comparar-bases':expected=[a*p/100,b*d.q/100];break;
          case 'percentatges/error-increment':expected=10*a*(1+p/100);break;
          default:throw Error('Família sense auditoria matemàtica: '+key);
        }
        const actual=q.audit.result;
        if(Array.isArray(expected)){assert(actual.length===expected.length,'longitud '+key);expected.forEach((v,i)=>close(actual[i],v,key));}
        else if(typeof expected==='number')close(actual,expected,key);
        else assert(actual===expected,key);
      }
      const random=Math.random;let state=123;Math.random=()=>((state=(state*1664525+1013904223)>>>0)/4294967296);
      const roundDirections=new Set(),divisionModes=new Set(),correctOptionPositions=new Set(),samples=[],inventory=[];let standardCases=0,extensionCases=0,customCases=0,explicitContexts=16;
      try{
        for(const [id,rows] of Object.entries(C.inventory))for(const row of rows){
          console.log('AUDIT '+id+':'+row.type);
          for(let i=0;i<32;i++){state=12345+i*104729;const q=C.generateBranch(id,row.type);style(q);baseCheck(id,row.type,q);standardCases++;if(i===0)samples.push({topic:id,type:row.type,question:q.question,answer:q.answer});}
          const descriptor=T.find(t=>t.id===id).families.find(f=>f.types?.includes(row.type));inventory.push({topic:id,type:row.type,...descriptor});
        }
        for(const t of T)for(const f of t.families.filter(f=>f.extensionId))for(let i=0;i<32;i++){
          if(!i)console.log('AUDIT '+f.family);
          state=12345+i*104729;const q=t.generateFamily(f.family);style(q);extensionCheck(t.id,f.extensionId,q);extensionCases++;if(i===0)samples.push({topic:t.id,family:f.family,question:q.question,answer:q.answer});
        }
        for(const topic of T)for(const f of topic.families.filter(f=>!f.extensionId&&!f.types.length))for(let i=0;i<32;i++){
          const q=topic.generateFamily(f.generatorId||f.family);style(q);const n=nums(q.question),a=nums(q.answer);
          if(topic.id==='potencies')close(a[0],n[0]**n[1]+Math.sqrt(n[2])*n[3]-n[4],'combinada potències/arrels');
          else{const initial=n[0],digits=String(initial).split('');[digits[0],digits[1]]=[digits[1],digits[0]];const swapped=Number(digits.join(''));close(a[0],swapped,'intercanvi');close(a[1],initial-swapped,'variació posicional');}
          customCases++;
        }
        // Force every grammar/context branch rather than trusting random sampling.
        const old=rnd;
        for(let context=0;context<8;context++)for(const type of [4,5]){
          try{rnd=(a,b)=>a===0&&b===7?context:old(a,b);const q=C.generateBranch('mcmmcd',type);style(q);baseCheck('mcmmcd',type,q);}finally{rnd=old;}
        }
        const contexts=[
          ['naturals',4,0,1],['naturals',3,1,3],['decimal_sys',4,0,3],
          ['divis',1,0,3],['divis',3,0,7],['divis',5,0,3],
          ['decimals',7,0,5],['decimals',4,0,26],['decimals',5,0,19],
          ['fraccions',8,0,7],['fraccions',10,0,5],['fraccions',11,0,11],
          ['percentatges',4,0,5],['percentatges',5,0,7],['percentatges',7,0,7],
          ['proporcionalitat',1,0,17]
        ];
        for(const [topic,type,lo,hi] of contexts)for(let value=lo;value<=hi;value++){
          const original=rnd;try{rnd=(a,b)=>a===lo&&b===hi?value:original(a,b);const q=C.generateBranch(topic,type);style(q);baseCheck(topic,type,q);explicitContexts++;}finally{rnd=original;}
        }
        for(let entry=0;entry<6;entry++)for(let variant=0;variant<2;variant++){
          const original=rnd;try{rnd=(a,b)=>a===0&&b===5?entry:a===0&&b===1?variant:original(a,b);const q=C.generateBranch('percentatges',6);style(q);baseCheck('percentatges',6,q);explicitContexts++;}finally{rnd=original;}
        }
        const division=C.adapt('ops',{type:4,diff:2,question:'Calcula: 1154 / 14',correct:'82 exacta',solution:['82'],options:[]});
        assert(division.answer.includes('82')&&division.answer.includes('6')&&!division.question.includes('divisió exacta'),'regressió 1154 ÷ 14');
        const decomposition=C.adapt('decimal_sys',{type:2,diff:2,question:'Descompon el nombre 67898',correct:'',solution:[],options:[]});
        assert(decomposition.answer==='60000 + 7000 + 800 + 90 + 8','regressió 67898');
        const rounding=C.adapt('naturals',{type:3,diff:2,question:'Arrodoneix 48760 a les desenes',correct:'48760',solution:[],options:[]});assert(scalar(rounding)!==nums(rounding.question)[0],'regressió 48760');
        assert(correctOptionPositions.size>=3,'l’opció correcta no té una posició fixa');
        assert(roundDirections.has(-1)&&roundDirections.has(1),'arrodoniments en totes dues direccions');assert(divisionModes.has('exact')&&divisionModes.has('remainder'),'dos tipus de divisió');
      }finally{Math.random=random;}
      return {baseBranches:inventory.length,baseCases:standardCases,extensionFamilies:extensionCases/32,extensionCases,customCases,explicitContexts,inventory,specialInventory:T.flatMap(t=>t.families.filter(f=>!f.extensionId&&!f.types.length).map(f=>({topic:t.id,...f}))),reasoningInventory:T.flatMap(t=>t.families.filter(f=>f.challenge).map(f=>({topic:t.id,...f}))),samples};
    }).catch(e=>{console.error('Auditoria: '+e.message);throw e;});
    fs.mkdirSync('tmp/fitxes',{recursive:true});fs.writeFileSync('tmp/fitxes/audit-1eso.json',JSON.stringify(report,null,2));
    console.log(JSON.stringify({...report,inventory:undefined,specialInventory:undefined,reasoningInventory:undefined,samples:undefined}));assert.deepEqual(errors,[]);
  }finally{await browser.close();server.close();}
})().catch(e=>{console.error(e);server.close();process.exitCode=1;});
