/* P2: candidats sintètics i DOM simulat, sense bancs matemàtics ni exportació real. */
const fs=require('fs'),vm=require('vm'),assert=require('assert/strict'),path=require('path');
const root=path.resolve(__dirname,'../..'),core=fs.readFileSync(root+'/assets/js/fitxes/core.js','utf8'),ui=fs.readFileSync(root+'/assets/js/fitxes/ui.js','utf8');
const plain=x=>JSON.parse(JSON.stringify(x));
function topic(defs,variants=16,shared=false){
  const families=defs.map(([name,level,challenge=false])=>({family:'a:'+name,generatorId:'a:'+name,level,standard:!challenge,challenge,challengeReason:challenge?'Justificació sintètica':'',contents:['a']})),cursor={};
  return {id:'a',name:'Tema A',levels:[1,2,3],requiredContents:['a'],families,generateFamily(id){const f=families.find(f=>f.generatorId===id),n=(cursor[id]=(cursor[id]||0)+1)%variants;return {...f,question:id+' dades '+n,answer:'resposta '+n,steps:['Pas sintètic'],options:[],audit:{data:shared?{a:10,b:20,c:30,d:40,n}:{n}}};}};
}
function engine(id='1eso-numeric',source=core){const math=Object.create(Math);math.random=()=>0.5;const c={window:{MIWorksheetConfig:{id}},Math:math,crypto:{randomUUID:()=> 'test-p2-uuid'},setTimeout:fn=>fn()};vm.runInNewContext(source,c);return c.window.MIWorksheets;}
const c=(extra={})=>({contextId:'1eso-numeric',count:10,worksheetType:'extension',topics:['a'],order:'grouped',space:'normal',format:'both',solutions:'steps',...extra});
function quotas(model,expected){assert.deepEqual([1,2,3].map(l=>model.questions.filter(q=>q.level===l).length),expected);assert.equal(model.questions.length,model.config.count);assert.equal(new Set(model.questions.map(q=>q.question)).size,model.questions.length);}
function page({id='1eso-numeric',topics=[topic([['easy',1],['medium',2]])],source=ui}={}){
  const E=engine(id),nodes={},exports=[],checks=topics.map(t=>({value:t.id,checked:true}));let markup='',focused='',generationCalls=[];
  class Event{constructor(type,options={}){this.type=type;this.bubbles=!!options.bubbles;}preventDefault(){}}
  class Node{
    constructor(id=''){this.id=id;this.listeners={};this.value='';this.hidden=['ws-variety','ws-results','ws-standard'].includes(id);this.textContent='';this.disabled=false;}
    addEventListener(type,fn){(this.listeners[type]??=[]).push(fn);}
    dispatchEvent(e){e.target??=this;for(const fn of this.listeners[e.type]||[])fn(e);if(e.bubbles&&this.id.startsWith('ws-')&&!['ws-reduce-count','ws-similar','ws-add-topics','ws-reduce'].includes(this.id))form.dispatchEvent(e);return true;}
    focus(){focused=this.id;}setAttribute(){}removeAttribute(){}remove(){}append(){}replaceChildren(){}
    set innerHTML(html){this.html=html;if(html.includes('<option')){this.options=[...html.matchAll(/<option value="([^"]*)"([^>]*)>([^<]*)<\/option>/g)].map(m=>({value:m[1],text:m[3],selected:m[2].includes('selected')}));let v=(this.options.find(o=>o.selected)||this.options[0]).value;Object.defineProperty(this,'value',{configurable:true,get:()=>v,set:x=>v=this.options.some(o=>o.value===String(x))?String(x):''});Object.defineProperty(this,'selectedOptions',{configurable:true,get:()=>this.options.filter(o=>o.value===v)});}}
  }
  const form=new Node('form'),node=id=>nodes[id]??=(new Node(id));
  const host=new Node('host');host.querySelector=s=>s==='form'?form:s==='.mi-worksheet-downloads a'?node('download'):s==='.mi-worksheet-downloads'?node('downloads'):node(s.slice(1));host.querySelectorAll=s=>s.includes('ws-topic')?checks.filter(t=>!s.includes(':checked')||t.checked):[];
  Object.defineProperty(host,'innerHTML',{set:html=>{markup=html;for(const m of html.matchAll(/<select id="([^"]+)"[^>]*>([\s\S]*?)<\/select>/g))node(m[1]).innerHTML=m[2];}});
  const generate=E.generate;E.generate=(config,...args)=>{generationCalls.push(plain(config));return generate(config,...args);};
  const context={window:{MIWorksheets:E,MIWorksheetConfig:{id,worksheetTypes:id==='1eso-numeric',topics},MIWorksheetExport:{create:async model=>{assert.equal(model.questions.length,model.config.count);exports.push(model);return [{blob:{},name:'control.docx',label:'Fitxa',kind:'docx'}];}}},document:{createElement:tag=>tag==='section'?host:new Node(tag),getElementById:()=>new Node(),head:{append:s=>s.onload()}},URL:{createObjectURL:()=> 'blob:test',revokeObjectURL(){}},Event};
  vm.runInNewContext(source,context);
  return {nodes,form,exports,checks,api:context.window.MIWorksheetUI,markup,get focused(){return focused;},generationCalls,async fire(id,type='click'){node(id).dispatchEvent(new Event(type,{bubbles:type==='change'}));await new Promise(setImmediate);await new Promise(setImmediate);},async submit(){form.dispatchEvent(new Event('submit'));await new Promise(setImmediate);await new Promise(setImmediate);}};
}
(async()=>{
  const E=engine(),few=()=>topic([['medium',2],['high',3,true]],16,true);
  await assert.rejects(E.generate(c(),[few()]),e=>e.code==='INSUFFICIENT_QUOTAS');
  const accepted=await E.generate(c({allowSimilar:true}),[few()]);quotas(accepted,[0,2,8]);assert.equal(accepted.questions.filter(q=>q.family==='a:high').length,8);
  await assert.rejects(E.generate(c(),[few()]),e=>e.code==='INSUFFICIENT_QUOTAS'); // consentiment no persistent
  quotas(await E.generate(c({worksheetType:'standard',allowSimilar:true}),[topic([['easy',1],['medium',2]],16,true)]),[4,6,0]);
  const diverse=await E.generate(c({allowSimilar:true}),[topic([['medium',2],['high-a',3,true],['high-b',3,true]],16,true)]);quotas(diverse,[0,2,8]);assert.equal(diverse.questions.filter(q=>q.family==='a:high-a').length,4);assert.equal(diverse.questions.filter(q=>q.family==='a:high-b').length,4);
  const exact=topic([['medium',2],['high',3,true]]);const build=exact.generateFamily;let option=0;exact.generateFamily=id=>({...build(id),question:id+' mateix enunciat 42',options:[String(++option)]});await assert.rejects(E.generate(c({allowSimilar:true}),[exact]),e=>e.code==='INSUFFICIENT_QUOTAS');
  const normal=page();assert(normal.markup.includes('Generador de fitxes · Versió en proves'));assert(normal.markup.includes("nombre d'exercicis poden"));assert(normal.markup.indexOf('ws-trial-title')<normal.markup.indexOf('<form>'));await normal.submit();assert.equal(normal.exports.length,1);assert(normal.nodes['ws-variety'].hidden);
  const p=page({topics:[few()]});p.nodes['ws-type'].value='extension';await p.fire('ws-type','change');await p.submit();assert.equal(p.exports.length,0);assert(!p.nodes['ws-variety'].hidden);assert(!p.nodes['ws-variety-message'].textContent.includes('N1'));assert.equal(p.api.getDiagnostic().code,'INSUFFICIENT_QUOTAS');assert.equal(p.generationCalls.length,1);assert(!p.generationCalls[0].allowSimilar);
  const before=plain(p.api.getConfig());await p.fire('ws-add-topics');assert.equal(p.focused,'ws-topic-summary');assert(p.nodes['ws-topics'].open);assert.deepEqual(plain(p.api.getConfig()),before);
  await p.fire('ws-similar');assert.equal(p.exports.length,1);quotas(p.exports[0],[0,2,8]);assert(p.generationCalls.at(-1).allowSimilar);assert(!p.api.getConfig().allowSimilar);await p.fire('ws-another');assert.equal(p.exports.length,1);assert(!p.generationCalls.at(-1).allowSimilar);
  const reduced=page({topics:[topic([['medium',2],['high-a',3,true],['high-b',3,true],['high-c',3,true]])]});reduced.nodes['ws-type'].value='extension';await reduced.fire('ws-type','change');const keep=plain(reduced.api.getConfig());await reduced.submit();assert.equal(reduced.exports.length,0);assert.deepEqual(reduced.nodes['ws-reduce-count'].options.map(o=>o.value),['','5','8']);assert(reduced.nodes['ws-reduce-help'].textContent.includes('Comprovarem'));reduced.nodes['ws-reduce-count'].value='8';await reduced.fire('ws-reduce-count','change');await reduced.fire('ws-reduce');assert.equal(reduced.exports.length,1);quotas(reduced.exports[0],[0,2,6]);assert.deepEqual(plain(reduced.api.getConfig()),{...keep,count:8});
  const failed=page({topics:[topic([['medium',2],['high',3,true]],2)]});failed.nodes['ws-type'].value='extension';await failed.fire('ws-type','change');await failed.submit();await failed.fire('ws-similar');assert.equal(failed.exports.length,0);assert(failed.nodes['ws-variety-message'].textContent.includes('Tot i permetre'));assert(failed.nodes['ws-similar'].hidden);assert(!failed.nodes['ws-add-topics'].disabled);
  const broken=topic([['easy',1],['medium',2]]);broken.generateFamily=()=>{throw Error('detall tècnic intern');};const technical=page({topics:[broken]});await technical.submit();assert.equal(technical.exports.length,0);assert(technical.nodes['ws-variety'].hidden);assert(technical.nodes['ws-status'].textContent.includes('problema tècnic'));assert(!technical.nodes['ws-status'].textContent.includes('detall tècnic intern'));assert.equal(technical.api.getDiagnostic().message,'detall tècnic intern');
  const legacy={id:'b',name:'Tema B',levels:[1,2,3],generate:l=>({level:l,question:'dada '+l+' '+(++serial),answer:'resposta',options:[]})};let serial=0;const cfg={count:5,topics:['b'],percentages:[40,40,20],order:'grouped',space:'normal',format:'both',solutions:'steps',allowSimilar:true};
  const second=page({id:'2eso-numeric',topics:[legacy]});assert(second.markup.includes('Versió en proves'));assert(!second.markup.includes('id="ws-variety"'));assert.deepEqual(second.nodes['ws-count'].options.map(o=>+o.value),[5,10,15,20,25,30]);
  if(process.argv[3]){const original=page({id:'2eso-numeric',topics:[legacy],source:fs.readFileSync(process.argv[3],'utf8')});assert.equal(second.markup.replace(/<aside class="mi-worksheet-note"[\s\S]*?<\/aside>/,''),original.markup);assert.deepEqual(plain(second.api.getConfig()),plain(original.api.getConfig()));}
  const result=await engine('2eso-numeric').generate(cfg,[legacy]);quotas(result,[2,2,1]);
  if(process.argv[2]){serial=0;assert.deepEqual(plain(result),plain(await engine('2eso-numeric',fs.readFileSync(process.argv[2],'utf8')).generate(cfg,[legacy])));}
  console.log('P2 OK: avís als dos cursos, alternatives, consentiment temporal, quotes, equilibri, duplicats, errors tècnics, exportació bloquejada si incompleta i compatibilitat de 2n. DOM simulat; cap exportació real.');
})().catch(e=>{console.error(e);process.exitCode=1;});
