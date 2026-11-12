'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');

function main(){
  const root=process.cwd();
  const document={createElement(){let html='';return {set innerHTML(v){html=String(v);},get textContent(){return html.replace(/<[^>]*>/g,'');}};}};
  const context={console,document,Math};
  context.window=context;
  context.setTimeout=setTimeout;
  context.clearTimeout=clearTimeout;
  vm.createContext(context);
  for(const file of ['assets/js/raonament-numeric-1eso.js','assets/js/enters-1eso.js','assets/js/dificultat-mi.js']){
    vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),context,{filename:file});
  }
  vm.runInContext(`
    function rnd(a,b){return a+Math.floor(Math.random()*(b-a+1));}
    function shuffle(values){return values.slice().sort(()=>Math.random()-.5);}
    function wrongOrders(values,correct){return [values.slice().reverse().join(' < '),values.slice().reverse().join(' > '),values.join(' > ')].filter(v=>v!==correct);}
    function buildOpts(correct,wrongs){const out=[],seen=new Set();for(const value of [correct,...wrongs]){const s=String(value);if(!seen.has(s)){seen.add(s);out.push(s);}}let i=0;while(out.length<4){const value='distractor-'+i++;if(!seen.has(value)){seen.add(value);out.push(value);}}return out.slice(0,4);}
    function numEq(a,b){const m=String(a).trim().match(/[+-]?\\d+/);return !!m&&Number(m[0])===Number(b);}
    var AMP_TYPE_BAGS={};
    function ampNextType(key,count){if(!AMP_TYPE_BAGS[key]||!AMP_TYPE_BAGS[key].length)AMP_TYPE_BAGS[key]=Array.from({length:count},(_,i)=>i+1);return AMP_TYPE_BAGS[key].pop();}
  `,context);
  const html=fs.readFileSync(path.join(root,'1eso/sentit-numeric.html'),'utf8');
  const baseStart=html.indexOf('function genEnters(){'),baseEnd=html.indexOf('// ── GEN DECIMALS',baseStart);
  const bankStart=html.indexOf('function genEntersProb(){'),bankEnd=html.indexOf('function genDecimalsProb(){',bankStart);
  assert(baseStart>=0&&baseEnd>baseStart,'Legacy exam generator found');
  assert(bankStart>=0&&bankEnd>bankStart,'Contextual bank generator found');
  vm.runInContext(html.slice(baseStart,baseEnd)+'\n'+html.slice(bankStart,bankEnd),context,{filename:'integer-page-generators'});
  const topic={id:'enters',course:'1r',name:'Nombres enters',gen:()=>({type:1})};
  const difficulty=context.MIDifficulty.attach({topics:[topic],course:'1eso',sense:'numeric'});
  const M=context.MIEnters,permutations=a=>a.length?a.flatMap((x,i)=>permutations(a.filter((_,j)=>j!==i)).map(p=>[x,...p])):[[]];
  const rngFactory=seed=>{let s=seed>>>0;return (lo,hi)=>{s=(Math.imul(s,1664525)+1013904223)>>>0;return lo+s%(hi-lo+1);};};
  const checkOptions=q=>{
    assert.equal(q.options.length,4,'Four options '+q.type);
    assert.equal(new Set(q.options).size,4,'Unique options '+q.type);
    assert.equal(q.options.filter(v=>M.matches(q.entersAnswer,v)).length,1,'One accepted option '+q.type);
    assert(M.matches(q.entersAnswer,q.correct),'Canonical answer '+q.type);
  };
  const keyOf=q=>JSON.parse(q.practiceKey.slice(q.type.length+1));
  assert.deepEqual(Array.from(M.families,g=>g.length),[8,6,1],'Adaptive family distribution');
  assert.deepEqual(Array.from(difficulty.coverage(topic).types),[8,6,1],'Reviewed family coverage');
  assert.deepEqual(Array.from(difficulty.examPlan(topic).slots),[6,3,3],'Preserved topic exam quotas');
  assert.equal(M.familySpecs.length,15,'Family count');
  assert.equal(new Set(M.familySpecs.map(f=>f.id)).size,15,'Stable unique family IDs');
  const mapping=M.familySpecs.flatMap(f=>f.practiceTypes.map(type=>[type,f.level]));
  assert.deepEqual(Array.from(mapping,x=>x[0]).sort(),Array.from({length:17},(_,i)=>'E'+String(i+1).padStart(2,'0')).sort(),'All 17 generators assigned once');
  assert.equal(new Set(mapping.map(x=>x[0])).size,17,'No practice generator counted twice');
  let practiceSamples=0;
  for(let n=1;n<=17;n++){
    const type='E'+String(n).padStart(2,'0'),level=M.levelFor(type);
    for(let i=0;i<250;i++){
      const q=M.generate(type,rngFactory(14000+i*37+n*101)),k=keyOf(q);
      assert.equal(q.taskDifficulty,level,'Internal level '+type);
      assert.equal(q.diff,level,'Local difficulty '+type);
      assert.equal(difficulty.getDifficulty(topic,q),level,'Shared classifier '+type);
      checkOptions(q);
      let expected;
      if(type==='E01'){
        if(k[0]==='compare'){const [,a,b]=k,op=a<b?'<':a>b?'>':'=';expected=a+' '+op+' '+b;}
        else{const [,values,ascending]=k,sorted=values.slice().sort((a,b)=>ascending?a-b:b-a);expected=sorted.join(ascending?' < ':' > ');}
      }else if(['E02','E03','E04'].includes(type)){
        const [a,b]=k,n=Number(type.slice(1));expected=String(n===2?a+b:n===3?a-b:a*b);
      }else if(type==='E05'){const [a,b]=k;expected=String(a+b);}
      else if(type==='E06'){const [a,b,c]=k;expected=String(a+b+c);}
      else if(type==='E07'){const [a,b]=k;expected=String(Math.abs(b-a));}
      else if(type==='E08'){const [a,b,c]=k;expected=(a+b-c)+'; '+(b-c);}
      else if(type==='E09'){
        const {start,moves,lower,upper}=k;
        expected=String(permutations(moves).filter(order=>{let pos=start;return order.every(move=>{pos+=move;return pos>=lower&&pos<=upper;});}).length);
      }else if(type==='E10'){const [a,inverse]=k;expected=String(inverse?-Math.abs(a):Math.abs(a));}
      else if(type==='E11'){const [a]=k;expected=String(-a);}
      else if(type==='E12'){const [start,step,target]=k;expected=String(start+step*target);}
      else if(type==='E13'){
        const [initial,up,down]=k;expected=String(initial);
        const end=Number(q.question.match(/final és de (-?\d+) °C/)[1]);
        assert.equal(initial+up-down,end,'Undo ordered changes E13');
      }else if(type==='E14'){
        const [a,b,subtract,left]=k;expected=String(left?a:b);
        const result=subtract?a-b:a+b,first=left?Number(expected):a,second=left?b:Number(expected);
        assert.equal(subtract?first-second:first+second,result,'Inverse equation E14');
      }else if(type==='E15'){const [a,b]=k;expected='Ha restat el valor absolut en lloc de sumar l’oposat del nombre negatiu.; '+(a+b);}
      else if(type==='E16'){
        const [a,b]=k;expected=String(2*b-a);
        assert.equal(Math.abs(a-b),Math.abs(Number(expected)-b),'Symmetric distances E16');
      }else if(type==='E17'){const [a,b,c,d]=k;expected=String(a*(b-c)+d);}
      assert.equal(String(q.correct),expected,'Independent oracle '+type+' #'+i);
      practiceSamples++;
    }
  }
  let reasoningSamples=0,rs=716;
  const reasonRandom=()=>((rs=Math.imul(rs,1664525)+1013904223>>>0)/4294967296);
  for(let i=0;i<250;i++){
    const q=context.MIFirstNumericTasks.generate('moviments-amb-limits',reasonRandom),{start,moves,lower,upper}=q.reasoningData;
    const count=permutations(moves).filter(order=>{let pos=start;return order.every(move=>{pos+=move;return pos>=lower&&pos<=upper;});}).length;
    assert.equal(Number(q.correct),count,'Independent reasoning oracle #'+i);
    assert.equal(M.levelFor(q.reasoningFamily),3,'Reasoning family level');
    assert.equal(difficulty.getDifficulty(topic,q),3,'Reasoning shared level');
    assert.equal(q.options.length,4,'Reasoning options');
    assert.equal(new Set(q.options).size,4,'Reasoning unique options');
    assert.equal(q.options.filter(v=>String(v)===String(q.correct)).length,1,'Reasoning correct option');
    reasoningSamples++;
  }
  const bankLevels={1:2,2:2,3:1,4:2,5:2},bankCounts={};
  for(let type=1;type<=5;type++){
    bankCounts[type]=0;
    for(let i=0;i<250;i++){
      context.AMP_TYPE_BAGS.enters=[type];
      const q=context.genEntersProb(),plain=String(q.text).replace(/<[^>]*>/g,' '),nums=(plain.match(/[+-]?\d+/g)||[]).map(Number);
      assert.equal(q.type,type,'Context variant ID '+type);
      assert.equal(q.diff,bankLevels[type],'Context internal difficulty '+type);
      assert.equal(difficulty.getDifficulty(topic,q),bankLevels[type],'Context shared difficulty '+type);
      const values=q.answer.entersAnswer.fields.map(f=>f.value);
      if(type===1)assert.equal(values[0],nums[0]+nums[1]-nums[2],'Temperature oracle');
      if(type===2)assert.equal(values[0],nums[0]+nums[1]-nums[2]-nums[3],'Balance oracle');
      if(type===3)assert.equal(values[0],nums[0]+nums[1],'Distance oracle');
      if(type===4)assert.equal(values[0],nums[0]+nums[1]-nums[2]+nums[3],'Elevator oracle');
      if(type===5){assert.equal(values[0],nums[0]+nums[1]-nums[2],'Submarine final position oracle');assert.equal(values[1],nums[1]-nums[2],'Submarine net displacement oracle');}
      assert(q.answer.check(q.answer.val),'Context corrector '+type);
      bankCounts[type]++;
    }
  }
  const examTypes={1:1,2:1,3:1,4:1,5:1,6:2,7:1};
  const oldRnd=context.rnd;let examSamples=0;
  try{
    for(let type=1;type<=7;type++)for(let i=0;i<250;i++){
      let first=true,seed=type*1000+i;
      context.rnd=(lo,hi)=>{if(first&&lo===1&&hi===7){first=false;return type;}seed=(Math.imul(seed,1664525)+1013904223)>>>0;return lo+seed%(hi-lo+1);};
      const q=context.genEnters();
      assert.equal(q.type,type,'Legacy exam type '+type);
      assert.equal(q.diff,examTypes[type],'Legacy exam internal difficulty '+type);
      assert.equal(difficulty.getDifficulty(topic,q),examTypes[type],'Legacy exam shared level '+type);
      assert(M.matches(q.entersAnswer,q.correct),'Legacy exam corrector '+type);
      assert.equal(q.options.length,4,'Legacy exam options '+type);
      assert.equal(new Set(q.options).size,4,'Legacy exam distinct options '+type);
      examSamples++;
    }
  }finally{context.rnd=oldRnd;}
  assert.equal(M.integer('−0'),0,'Unicode negative zero');
  assert.equal(M.integer('−7'),-7,'Unicode minus');
  assert.equal(M.integer('7.0'),null,'Reject decimal formatting');
  const pair={kind:'fields',fields:[M.number('Position',-16,'m'),M.number('Change',2,'m')]};
  assert(M.matches(pair,'−16 m; +2 m'),'Signed values and optional unit');
  assert(!M.matches(pair,'−16 cm; 2'),'Reject incompatible unit');
  console.log(JSON.stringify({practiceRoutes:17,practiceSamples,reasoningSamples,contextVariants:bankCounts,contextSamples:1250,legacyExamRoutes:7,legacyExamSamples:examSamples,families:[8,6,1],examPlan:[6,3,3]}));
}
main();
