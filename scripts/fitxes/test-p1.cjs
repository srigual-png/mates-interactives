/* Proves dirigides de P1 amb candidats sintètics; no genera exercicis matemàtics. */
const fs=require('fs'),vm=require('vm'),assert=require('assert/strict'),crypto=require('crypto');
const root=require('path').resolve(__dirname,'../..');
const core=fs.readFileSync(root+'/assets/js/fitxes/core.js','utf8');
const ui=fs.readFileSync(root+'/assets/js/fitxes/ui.js','utf8');
function engine(source=core,scopeId){
  const math=Object.create(Math);math.random=()=>0.5;
  const context={window:scopeId?{MIWorksheetConfig:{id:scopeId}}:{},Math:math,crypto:{randomUUID:()=> '12345678-test'},setTimeout:fn=>fn()};
  vm.runInNewContext(source,context);return context.window.MIWorksheets;
}
const E=engine(),plain=x=>JSON.parse(JSON.stringify(x));
const config=(worksheetType='standard',extra={})=>({contextId:'1eso-numeric',count:5,worksheetType,topics:['a'],order:'grouped',space:'normal',format:'both',solutions:'steps',...extra});
function topic(id,definitions){
  const families=definitions.map(([name,level,challenge=false,contents=[id]])=>({family:id+':'+name,generatorId:id+':'+name,level,challenge,standard:!challenge,contents,challengeReason:challenge?'Justificació sintètica':''}));
  const cursors={};
  return {id,name:id,levels:[1,2,3],requiredContents:[id],families,generateFamily(key){
    const f=families.find(f=>f.generatorId===key),i=(cursors[key]=(cursors[key]||0)+1)%4;
    return {...f,question:key+' variant '+String.fromCharCode(65+i),answer:key+' resposta '+i,steps:['Pas sintètic'],options:[],audit:{data:{value:1000*families.indexOf(f)+i}}};
  }};
}
function expectQuotas(model,expected){
  assert.deepEqual([1,2,3].map(l=>model.questions.filter(q=>q.level===l).length),expected);
  assert.equal(model.questions.length,model.config.count);
  assert.equal(new Set(model.questions.map(q=>q.key)).size,model.questions.length);
  for(const family of new Set(model.questions.filter(q=>q.challenge).map(q=>q.family)))assert(model.questions.filter(q=>q.family===family).length<=2);
}
function uiState(id,worksheetTypes){
  const nodes={},topics=[{id:'a',name:'Tema A',levels:[1,2,3],families:[],requiredContents:['a']}];let markup='';
  const form={addEventListener(){}};
  const checkbox={value:'a',checked:true};
  const node=key=>nodes[key]||(nodes[key]={value:'',textContent:'',hidden:false,addEventListener(){},replaceChildren(){},focus(){}});
  const host={setAttribute(){},append(){},querySelector(selector){return selector==='form'?form:node(selector.slice(1));},querySelectorAll(selector){return selector.includes('ws-topic')?[checkbox]:[];},
    set innerHTML(html){markup=html;
      for(const match of html.matchAll(/<select id="([^"]+)"[^>]*>([\s\S]*?)<\/select>/g)){
        const options=[...match[2].matchAll(/<option value="([^"]*)"([^>]*)>([^<]*)<\/option>/g)].map(m=>({value:m[1],selected:m[2].includes('selected'),text:m[3]}));
        const el=node(match[1]);el.options=options;let value=(options.find(o=>o.selected)||options[0]).value;
        Object.defineProperty(el,'value',{get:()=>value,set:v=>value=options.some(o=>o.value===String(v))?String(v):''});
        Object.defineProperty(el,'selectedOptions',{get:()=>options.filter(o=>o.value===value)});
      }
    }};
  const context={window:{MIWorksheets:E,MIWorksheetConfig:{id,worksheetTypes,topics}},document:{createElement:()=>host,getElementById:()=>({append(){}})}};
  vm.runInNewContext(ui,context);
  return {nodes,markup,api:context.window.MIWorksheetUI};
}
(async()=>{
  const standard=[[2,3,0],[3,5,0],[4,6,0],[6,9,0],[8,12,0],[10,15,0],[12,18,0]];
  const extension=[[0,1,4],[0,2,6],[0,2,8],[0,3,12],[0,4,16],[0,5,20],[0,6,24]];
  [5,8,10,15,20,25,30].forEach((count,i)=>{assert.deepEqual(plain(E.difficultyQuotas(config('standard',{count}))),standard[i]);assert.deepEqual(plain(E.difficultyQuotas(config('extension',{count}))),extension[i]);});
  const first=uiState('1eso-numeric',true);
  assert.deepEqual(first.nodes['ws-count'].options.map(o=>+o.value),[5,8,10,15,20,25,30]);assert.equal(first.api.getConfig().count,10);
  first.nodes['ws-count'].value=9;assert.equal(first.nodes['ws-count'].value,'');assert(E.validate(first.api.getConfig(),[topic('a',[['easy',1],['medium',2]])]));
  for(const count of [0,1,6,9,11,31,5.5,'10'])assert(E.validate(config('standard',{count}),[topic('a',[['easy',1],['medium',2]])]));
  const nativeConfig=config('standard',{count:6});delete nativeConfig.contextId;
  assert(engine(core,'1eso-numeric').validate(nativeConfig,[topic('a',[['easy',1],['medium',2]])]));
  const second=uiState('2eso-numeric',false);assert.deepEqual(second.nodes['ws-count'].options.map(o=>+o.value),[5,10,15,20,25,30]);assert.equal(second.api.getConfig().count,10);assert(!('contextId' in second.api.getConfig()));
  expectQuotas(await E.generate(config(),[topic('a',[['easy',1],['medium',2],['advanced',3,true]])]),[2,3,0]);
  expectQuotas(await E.generate(config('extension'),[topic('a',[['easy',1],['medium',2],['advanced-a',3,true],['advanced-b',3,true]])]),[0,1,4]);
  // Quotes globals: el tema a només aporta N1 i b només N2. No imposar quotes per tema.
  const mixed=await E.generate(config('standard',{topics:['a','b']}),[topic('a',[['easy',1]]),topic('b',[['medium',2]])]);expectQuotas(mixed,[2,3,0]);assert.deepEqual([...new Set(mixed.questions.map(q=>q.topicId))],['a','b']);
  const balanced=topic('a',[['easy-mcd',1,false,['mcd']],['medium-mcd',2,false,['mcd']],['medium-mcm',2,false,['mcm']]]);balanced.requiredContents=['mcd','mcm'];balanced.balanceContents=true;
  const balancedModel=await E.generate(config(),[balanced]);expectQuotas(balancedModel,[2,3,0]);assert(Math.abs(balancedModel.questions.filter(q=>q.contents.includes('mcd')).length-balancedModel.questions.filter(q=>q.contents.includes('mcm')).length)<=1);
  const twoMediumChallenges=await E.generate(config('extension',{count:10}),[topic('a',[['medium',2,true],['advanced-a',3,true],['advanced-b',3,true],['advanced-c',3,true],['advanced-d',3,true]])]);expectQuotas(twoMediumChallenges,[0,2,8]);
  for(const [mode,defs,missing] of [['standard',[['easy',1]],'N2'],['extension',[['medium',2],['advanced',3,true]],'N3']]){
    await assert.rejects(E.generate(config(mode),[topic('a',defs)]),e=>{assert.equal(e.code,'INSUFFICIENT_QUOTAS');assert(e.insufficientLevels.includes(missing));assert.equal(e.requested,5);assert.equal(e.expected.reduce((a,b)=>a+b,0),5);assert(e.achieved.reduce((a,b)=>a+b,0)<5);return true;});
  }
  await assert.rejects(E.generate(config('standard',{topics:['a','b']}),[topic('a',[['easy',1],['medium',2]]),topic('b',[])]),e=>e.code==='INSUFFICIENT_QUOTAS');
  const repeated=topic('a',[['easy',1],['medium',2]]),v1=await E.generate(config(),[repeated]);
  await assert.rejects(E.generate(config(),[repeated],v1.questions.map(q=>q.key)),e=>e.code==='INSUFFICIENT_QUOTAS');
  // El camí real de 2n continua usant els percentatges i l'assignació anteriors.
  const legacy={count:5,percentages:[40,40,20],topics:['b'],order:'grouped',space:'normal',format:'both',solutions:'steps'};
  let serial=0;const legacyTopic={id:'b',name:'b',levels:[1,2,3],generate:level=>({level,question:'control '+(++serial),answer:'control',steps:[],options:[]})};
  const actual=await E.generate(legacy,[legacyTopic]);expectQuotas(actual,[2,2,1]);
  assert(E.validate({...legacy,count:8},[legacyTopic]));
  if(process.argv[2]){serial=0;const original=engine(fs.readFileSync(process.argv[2],'utf8'));assert.deepEqual(plain(actual),plain(await original.generate(legacy,[legacyTopic])));assert.deepEqual(plain(E.allocate(legacy,[legacyTopic])).map(r=>r.counts),plain(original.allocate(legacy,[legacyTopic])).map(r=>r.counts));}
  console.log('P1 OK: selector, 14 quotes, selecció viable, quotes globals, insuficiència N2/N3, cobertura, deduplicació, límit de reptes i compatibilitat 2n. Sense navegador ni generadors matemàtics.');
})().catch(e=>{console.error(e);process.exitCode=1;});
