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
    await page.addInitScript(()=>{let seed=981;Math.random=()=>((seed=Math.imul(seed,1664525)+1013904223>>>0)/4294967296);});
    await page.goto(pathToFileURL(resolve('1eso/sentit-numeric.html')).href);
    const report=await page.evaluate(()=>{
      const check=(v,m)=>{if(!v)throw Error(m);};
      const M=MIEnters,topic=TOPICS.find(t=>t.id==='enters');
      const gcd=(a,b)=>b?gcd(b,a%b):Math.abs(a);
      const permutations=a=>a.length?a.flatMap((x,i)=>permutations(a.filter((_,j)=>j!==i)).map(rest=>[x,...rest])):[[]];
      const rngFactory=seed=>{let s=seed>>>0;return (lo,hi)=>{s=(Math.imul(s,1664525)+1013904223)>>>0;return lo+s%(hi-lo+1);};};
      const keyOf=q=>JSON.parse(q.practiceKey.slice(q.type.length+1));
      const same=(actual,expected,msg)=>check(JSON.stringify(actual)===JSON.stringify(expected),msg+': '+JSON.stringify(actual)+' != '+JSON.stringify(expected));
      const options=q=>{
        check(Array.isArray(q.options)&&q.options.length===4,'4 opcions '+q.type);
        check(new Set(q.options).size===4,'opcions úniques '+q.type);
        const accepted=q.options.filter(v=>M.matches(q.entersAnswer,v));
        check(accepted.length===1&&String(accepted[0])===String(q.correct),'corrector i distractors '+q.type);
        check(M.matches(q.entersAnswer,q.correct),'resposta canònica '+q.type);
      };
      const familyCounts=M.families.map(g=>g.length);
      same(familyCounts,[8,6,1],'famílies adaptatives');
      same(miTaskDifficulty.coverage(topic).types,[8,6,1],'cobertura de famílies');
      same(miTaskDifficulty.examPlan(topic).slots,[6,3,3],'quotes d’examen preservades');
      check(M.familySpecs.length===15,'nombre de familySpecs');
      check(new Set(M.familySpecs.map(f=>f.id)).size===M.familySpecs.length,'IDs familiars únics');
      const assigned=M.familySpecs.flatMap(f=>f.practiceTypes.map(type=>[type,f.level]));
      same(assigned.map(x=>x[0]).sort(),Array.from({length:17},(_,i)=>'E'+String(i+1).padStart(2,'0')).sort(),'cobertura dels 17 generadors');
      check(new Set(assigned.map(x=>x[0])).size===17,'generadors sense duplicar');
      let total=0;
      const types=Array.from({length:17},(_,i)=>'E'+String(i+1).padStart(2,'0'));
      for(const type of types)for(let i=0;i<250;i++){
        const q=M.generate(type,rngFactory(14000+i*37+Number(type.slice(1))*101));
        const level=M.levelFor(type),effective=miTaskDifficulty.getDifficulty(topic,q),k=keyOf(q);
        check(q.taskDifficulty===level&&q.diff===level&&effective===level,'nivell intern/compartit '+type);
        options(q);
        let expected;
        if(type==='E01'){
          if(k[0]==='compare'){
            const [,a,b]=k,relation=a<b?'<':a>b?'>':'=';
            expected=a+' '+relation+' '+b;
          }else{
            const [,nums,ascending]=k,sorted=nums.slice().sort((a,b)=>ascending?a-b:b-a),sep=ascending?'<':'>';
            expected=sorted.join(' '+sep+' ');
          }
        }else if(['E02','E03','E04'].includes(type)){
          const [a,b]=k,n=Number(type.slice(1));expected=String(n===2?a+b:n===3?a-b:a*b);
        }else if(type==='E05'){
          const [a,b]=k;expected=String(a+b);
        }else if(type==='E06'){
          const [a,b,c]=k;expected=String(a+b+c);
        }else if(type==='E07'){
          const [a,b]=k;expected=String(Math.abs(b-a));
        }else if(type==='E08'){
          const [a,b,c]=k;expected=(a+b-c)+'; '+(b-c);
        }else if(type==='E09'){
          const {start,moves,lower,upper}=k;
          const count=permutations(moves).filter(order=>{let pos=start;return order.every(move=>{pos+=move;return pos>=lower&&pos<=upper;});}).length;
          expected=String(count);
        }else if(type==='E10'){
          const [a,inverse]=k;expected=String(inverse?-Math.abs(a):Math.abs(a));
        }else if(type==='E11'){
          const [a]=k;expected=String(-a);
        }else if(type==='E12'){
          const [start,step,target]=k;expected=String(start+step*target);
        }else if(type==='E13'){
          const [initial,up,down]=k;expected=String(initial);
          check(initial+up-down===Number(q.question.match(/final és de (-?\d+) °C/)[1]),'canvis inversos E13');
        }else if(type==='E14'){
          const [a,b,subtract,left]=k;expected=String(left?a:b);
          const result=subtract?a-b:a+b,found=left?expected:a,other=left?b:expected;
          check((subtract?found-other:found+other)===result,'operació inversa E14');
        }else if(type==='E15'){
          const [a,b]=k;expected='Ha restat el valor absolut en lloc de sumar l’oposat del nombre negatiu.; '+(a+b);
        }else if(type==='E16'){
          const [a,b]=k;expected=String(2*b-a);
          check(Math.abs(a-b)===Math.abs(Number(expected)-b),'distàncies simètriques E16');
        }else if(type==='E17'){
          const [a,b,c,d]=k;expected=String(a*(b-c)+d);
        }
        check(String(q.correct)===expected,'oracle independent '+type+' #'+i);
        check(miTaskDifficulty.getDifficulty(topic,q)===M.levelFor(type),'nivell revalidat '+type);
        total++;
      }
      const reasoningSeed={value:716};
      const reasonRandom=()=>((reasoningSeed.value=Math.imul(reasoningSeed.value,1664525)+1013904223>>>0)/4294967296);
      let reasoning=0;
      for(let i=0;i<250;i++){
        const q=MIFirstNumericTasks.generate('moviments-amb-limits',reasonRandom),{start,moves,lower,upper}=q.reasoningData;
        const count=permutations(moves).filter(order=>{let pos=start;return order.every(move=>{pos+=move;return pos>=lower&&pos<=upper;});}).length;
        check(String(count)===String(q.correct),'oracle raonament independent #'+i);
        check(M.levelFor(q.reasoningFamily)===3&&miTaskDifficulty.getDifficulty(topic,q)===3,'nivell raonament');
        check(q.options.length===4&&new Set(q.options).size===4&&q.options.filter(v=>String(v)===String(q.correct)).length===1,'opcions raonament');
        reasoning++;
      }
      const bankLevels={1:2,2:2,3:1,4:2,5:2};
      const originalBags=AMP_TYPE_BAGS.enters,bankCounts={};
      try{
        for(let type=1;type<=5;type++){
          bankCounts[type]=0;
          for(let i=0;i<250;i++){
            AMP_TYPE_BAGS.enters=[type];
            const q=genEntersProb(),plain=String(q.text).replace(/<[^>]*>/g,' ');
            const nums=(plain.match(/[+-]?\d+/g)||[]).map(Number);
            check(q.type===type&&q.diff===bankLevels[type],'variant/Nivell banc '+type);
            check(miTaskDifficulty.getDifficulty(topic,q)===bankLevels[type],'classificador banc '+type);
            const fields=q.answer.entersAnswer.fields,values=fields.map(f=>f.value);
            if(type===1)check(values[0]===nums[0]+nums[1]-nums[2],'temperatura contextual');
            if(type===2)check(values[0]===nums[0]+nums[1]-nums[2]-nums[3],'saldo contextual');
            if(type===3)check(values[0]===nums[0]+nums[1],'distància entre altituds');
            if(type===4)check(values[0]===nums[0]+nums[1]-nums[2]+nums[3],'moviments d’ascensor');
            if(type===5)check(values[0]===nums[0]+nums[1]-nums[2]&&values[1]===nums[1]-nums[2],'posició i canvi net');
            check(q.answer.check(q.answer.val),'corrector banc '+type);
            bankCounts[type]++;
          }
        }
      }finally{AMP_TYPE_BAGS.enters=originalBags;}
      const examTypes={1:1,2:1,3:1,4:1,5:1,6:2,7:1};
      const oldRnd=window.rnd;let examBase=0;
      try{
        for(let type=1;type<=7;type++)for(let i=0;i<250;i++){
          let first=true,seed=type*1000+i;
          window.rnd=(lo,hi)=>{if(first&&lo===1&&hi===7){first=false;return type;}seed=(Math.imul(seed,1664525)+1013904223>>>0);return lo+seed%(hi-lo+1);};
          const q=genEnters();
          check(q.type===type&&q.diff===examTypes[type],'tipus/Nivell examen base '+type);
          check(miTaskDifficulty.getDifficulty(topic,q)===examTypes[type],'classificador examen base '+type);
          check(M.matches(q.entersAnswer,q.correct),'corrector examen base '+type);
          check(q.options.length===4&&new Set(q.options).size===4,'opcions examen base '+type);
          examBase++;
        }
      }finally{window.rnd=oldRnd;}
      return {practiceRoutes:types.length,practiceSamples:total,reasoningSamples:reasoning,ampVariants:bankCounts,examBaseSamples:examBase,families:familyCounts,examPlan:miTaskDifficulty.examPlan(topic).slots};
    });
    assert.deepEqual(report.families,[8,6,1]);
    console.log(JSON.stringify(report));
  }finally{await browser.close();}
}
main().catch(error=>{console.error(error);process.exitCode=1;});
