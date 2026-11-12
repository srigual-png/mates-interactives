'use strict';
const assert=require('node:assert/strict');
const {resolve}=require('node:path');
const {pathToFileURL}=require('node:url');
const {chromium}=require(process.env.MI_PLAYWRIGHT||'C:/Users/srigu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

async function main(){
  const browser=await chromium.launch({executablePath:process.env.MI_BROWSER||'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});
  try{
    const page=await browser.newPage();
    await page.route(/^https?:/,route=>route.abort());
    await page.addInitScript(()=>{let seed=721;Math.random=()=>((seed=Math.imul(seed,1664525)+1013904223>>>0)/4294967296);});
    await page.goto(pathToFileURL(resolve('1eso/sentit-numeric.html')).href);
    const result=await page.evaluate(()=>{
      const check=(v,m)=>{if(!v)throw Error(m);};
      const M=MIMcdMcm, topic=TOPICS.find(t=>t.id==='mcmmcd');
      const gcd=(a,b)=>{while(b)[a,b]=[b,a%b];return a;};
      const lcm=(a,b)=>a/gcd(a,b)*b;
      const divisors=n=>Array.from({length:n},(_,i)=>i+1).filter(d=>n%d===0);
      const primes=n=>{const out=[];for(let p=2;p*p<=n;p++)while(n%p===0){out.push(p);n/=p;}if(n>1)out.push(n);return out;};
      const factorText=n=>{const a=primes(n),counts=new Map();a.forEach(p=>counts.set(p,(counts.get(p)||0)+1));return [...counts].map(([p,e])=>p+(e===1?'':e===2?'²':e===3?'³':'^'+e)).join(' × ')||'1';};
      const rngFactory=seed=>{let s=seed>>>0;return (lo,hi)=>{s=(Math.imul(s,1664525)+1013904223)>>>0;return lo+s%(hi-lo+1);};};
      const checkOptions=q=>{
        check(Array.isArray(q.options)&&q.options.length===4,'Quatre opcions: '+q.type);
        check(new Set(q.options).size===4,'Opcions diferents: '+q.type);
        const valid=q.options.filter(v=>q.mcmFields?M.matches(q.mcmFields,v):openOk1(q.correct,v,q));
        check(valid.length===1&&String(valid[0])===String(q.correct),'Una resposta correcta i distractors rebutjats: '+q.type);
      };
      const operands=source=>{
        const m=source.match(/(?:MCD|mcm)\((\d+)\s*,\s*(\d+)(?:\s*,\s*(\d+))?\)/i);
        return m?[Number(m[1]),Number(m[2]),...(m[3]?[Number(m[3])]:[])]:null;
      };
      const checkFactorField=field=>{
        const target=field.value,text=factorText(target);
        check(field.factor&&M.matches([field],text), 'Factorització primera de '+target);
        check(!M.matches([field],target+' × 1'),'No accepta productes no primers');
        if(target===1)check(M.matches([field],'1'),'Producte buit del MCD');
      };
      let total=0;
      const practiceTypes=['P1','P2','P3','A1','A2','A3','A4','A5','P4','P5','P6','A6'];
      for(const type of practiceTypes)for(let i=0;i<250;i++){
        const level=M.levelFor(type),q=genMcdPractice(type,level,rngFactory(11000+i*31+type.charCodeAt(0)));
        check(q.taskDifficulty===level&&q.diff===level,'Nivell intern '+type);
        check(miTaskDifficulty.getDifficulty(topic,q)===level,'Nivell compartit '+type);
        checkOptions(q);
        if(type==='P1'||type==='P2'){
          const ab=q.question.match(/(?:de|entre) (\d+) i (\d+)/);
          check(ab,'Operands de '+type);
          const [a,b]=ab.slice(1).map(Number),values=q.mcmFields[0].value;
          const expected=type==='P1'?divisors(gcd(a,b)):Array.from({length:Math.floor((q.mcmFields[0].value.at(-1)||0)/lcm(a,b))},(_,j)=>(j+1)*lcm(a,b));
          if(type==='P1')check(JSON.stringify(values)===JSON.stringify(expected),'Divisors comuns complets');
          else{
            const limit=Number(q.question.match(/fins a (\d+), inclòs/)[1]);
            const oracle=Array.from({length:limit},(_,j)=>j+1).filter(n=>n%a===0&&n%b===0);
            check(values.length===oracle.length&&values.every((v,j)=>v===oracle[j]&&v>0&&v<=limit),'Múltiples comuns positius fins al límit');
          }
          if(gcd(a,b)===1&&type==='P1')check(values.join()==='1','Divisors coprimers');
        }else if(type==='P3'){
          const ns=q.question.match(/\d+/g).slice(0,2).map(Number),[a,b]=ns;
          check(q.mcmFields[0].value===gcd(a,b)&&q.mcmFields[1].value===lcm(a,b),'Cas especial MCD/mcm');
          check(gcd(a,b)===1?lcm(a,b)===a*b:(a%b===0||b%a===0),'Cas coprimer o divisor');
        }else if(type==='A1'||type==='A2'){
          const a=operands(q.question);check(a,'Operands factoritzats');
          const result=a.slice(1).reduce(type==='A1'?gcd:lcm,a[0]);
          check(q.mcmFields[0].value===result&&q.mcmFields[1].value===result,'Factors seleccionats i producte '+type);
          checkFactorField(q.mcmFields[0]);
        }else if(type==='A3'||type==='A4'||type==='A5'||type==='P4'){
          const ab=operands(q.solution.join(' '));check(ab,'Operands contextuals '+type);
          const [a,b]=ab,which=type==='A3'||(type==='P4'&&q.mcmFields[0].value==='mcm')?lcm:gcd;
          const value=which(a,b);
          if(type==='A3')check(q.mcmFields[0].value===value,'Primera sincronització');
          if(type==='A4')check(q.mcmFields.map(f=>f.value).join()===[value,a/value,b/value].join(),'Lots, peces per lot');
          if(type==='A5')check(q.mcmFields.map(f=>f.value).join()===[value,a/value,b/value].join(),'Longitud màxima i nombre de trossos');
          if(type==='P4')check(q.mcmFields[2].value===value&&q.mcmFields[1].value===(which===lcm?'Busquem el primer múltiple positiu comú.':'Busquem el divisor comú més gran.'),'Operació, justificació i resposta');
        }else if(type==='P5'){
          const m=q.question.match(/entre (\d+) i (\d+), tots dos inclosos, té un (MCD|mcm) de (\d+) amb (\d+)/);
          check(m,'Interval i condició P5');
          const lo=Number(m[1]),hi=Number(m[2]),op=m[3],target=Number(m[4]),a=Number(m[5]),fn=op==='MCD'?gcd:lcm;
          const valid=Array.from({length:hi-lo+1},(_,j)=>lo+j).filter(v=>fn(a,v)===target);
          check(valid.length===1&&q.mcmFields[0].value===valid[0],'Operand únic per enumeració');
        }else if(type==='P6'){
          const ab=operands(q.solution.join(' '));check(ab,'Operands diagnòstic');
          const isMcd=/MCD/.test(q.question),expected=isMcd?gcd(...ab):lcm(...ab);
          check(q.mcmFields[1].value===expected,'Diagnòstic i resultat correcte');
        }else{
          const {a,b,oa,ob,after}=q.reasoningData,answer=Number(q.correct);
          const hits=Array.from({length:answer+1},(_,t)=>t).filter(t=>t>after&&t>=oa&&t>=ob&&(t-oa)%a===0&&(t-ob)%b===0);
          check(hits.length&&hits[0]===answer,'Primera coincidència desfasada després del llindar');
          check(q.taskDifficulty===3&&q.reasoningFamily==='coincidencies-desfasades','A6 és raonament N3');
        }
        total++;
      }
      let baseTypes=0,oldRnd=window.rnd,seed=331;
      try{
        for(let type=1;type<=5;type++)for(let i=0;i<250;i++){
          let first=true;window.rnd=(lo,hi)=>{if(first){first=false;return type;}seed=(Math.imul(seed,1664525)+1013904223)>>>0;return lo+seed%(hi-lo+1);};
          const q=genMcmMcdBase(),level=miTaskDifficulty.getDifficulty(topic,q);
          check(q.type===type&&q.diff===level,'Tipus i nivell base '+type);
          checkOptions(q);
          let a,b,expected;
          if(type<=3){const nums=operands(q.question);check(nums,'Operands base '+type);[a,b]=nums;expected=type===1?gcd(a,b):type===2?lcm(a,b):nums.slice(1).reduce(lcm,nums[0]);}
          else{const nums=operands(q.solution.join(' '));check(nums,'Operands contextuals base '+type);[a,b]=nums;expected=type===4?lcm(a,b):gcd(a,b);}
          check(q.mcmFields[0].value===expected,'Oracle base type '+type);
          check(level===(type<=2?1:2),'Nivell base alineat '+type);
          baseTypes++;
        }
      }finally{window.rnd=oldRnd;}
      let bankRoutes=0;
      for(let type=1;type<=4;type++)for(let i=0;i<250;i++){
        const q=M.bank(type,rngFactory(22100+i*17+type));
        check(q.variantId==='mcmmcd-'+type&&q.diff===2,'Identitat / nivell de banc '+type);
        check(miTaskDifficulty.getDifficulty(topic,q)===2,'Classificador banc '+type);
        check(q.answer.check(q.answer.val),'Corrector banc '+type);
        if(type===1){
          const ns=q.text.match(/de (\d+) i (\d+)/).slice(1).map(Number);
          check(q.answer.mcmFields[0].value===gcd(...ns)&&q.answer.mcmFields[1].value===lcm(...ns),'Banc factorització dos resultats');
          check(q.steps.length===2&&q.steps.every((step,j)=>step.check(j===0?factorText(ns[0]):factorText(ns[1]))),'Passos de factorització');
        }
        bankRoutes++;
      }
      let reasonTotal=0,seed2=741;
      for(let i=0;i<250;i++){
        const q=MIFirstNumericTasks.generate('coincidencies-desfasades',()=>((seed2=Math.imul(seed2,1664525)+1013904223>>>0)/4294967296));
        const {a,b,oa,ob,after}=q.reasoningData,answer=Number(q.correct);
        const first=Array.from({length:answer+1},(_,t)=>t).find(t=>t>after&&t>=oa&&t>=ob&&(t-oa)%a===0&&(t-ob)%b===0);
        check(first===answer&&M.levelFor(q.reasoningFamily)===3,'Banc de raonament amb oracle independent');
        check(q.options.length===4&&new Set(q.options).size===4&&q.options[0]===q.correct,'Opcions raonament');
        reasonTotal++;
      }
      for(const id of ['mcmmcd-1','mcmmcd-2','mcmmcd-3','mcmmcd-4','mcmmcd-raonament','coincidencies-desfasades',1,2,3,4,5,1001])check(M.levelFor(id),'Família absent: '+id);
      for(const family of M.families[0]){
        const reserve=M.reserve(family,1);
        check(reserve.length===8&&new Set(reserve.map(q=>q.practiceKey)).size===8,'Vuit reserves N1');
        reserve.forEach(checkOptions);
      }
      check(M.families.map(level=>level.length).join()==='3,6,2','Famílies adaptatives');
      const coverage=miTaskDifficulty.coverage(topic),plan=miTaskDifficulty.examPlan(topic);
      check(coverage.types.join()==='3,6,2'&&plan.slots.join()==='4,4,4','Quotes d’examen preservades');
      const exam=miTopicExam.build(topic);
      check(exam.length===12&&[1,2,3].map(n=>exam.filter(q=>miTaskDifficulty.getDifficulty(topic,q)===n).length).join()==='4,4,4','Examen de 12 amb 4/4/4');
      check(exam.every(q=>[1,2,3,4,5,1001].includes(q.type)),'Compatibilitat d’identificadors examen');
      exam.forEach(checkOptions);
      const amp=AMP_CATS.find(c=>c.id==='mcmmcd');
      check(amp.variants===5&&Object.values(amp.diffCounts).join()==='0,4,1','Quatre bancs contextuals i raonament N3');
      return {practiceRoutes:practiceTypes.length,practiceSamples:practiceTypes.length*250,examBaseRoutes:5,examBaseSamples:baseTypes,bankRoutes:bankRoutes,bankSamples:bankRoutes*250,reasoningSamples:reasonTotal,families:coverage.types,examPlan:plan.slots,examQuestions:exam.length,adaptiveReservations:24,total};
    });
    assert.deepEqual(result.families,[3,6,2]);
    console.log(JSON.stringify(result));
  }finally{await browser.close();}
}
main().catch(error=>{console.error(error);process.exitCode=1;});
