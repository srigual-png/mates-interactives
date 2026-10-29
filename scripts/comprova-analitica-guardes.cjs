const fs=require('fs'),vm=require('vm'),assert=require('assert');
const calls=[],scripts=[];
const context={
  location:{pathname:'/1eso/sentit-algebraic.html',hostname:'mi.test',protocol:'https:',search:''},
  TOPICS:[{id:'equacions',course:'1r'}],state:{currentTopic:0,level:1},performance:{now:()=>0},
  document:{querySelector:()=>null,addEventListener:()=>{},createElement:()=>({dataset:{}}),head:{appendChild:x=>scripts.push(x)}},
  queueMicrotask:f=>f(),URL,URLSearchParams
};
context.window={goatcounter:{count:event=>calls.push(event)}};
vm.createContext(context);
const source=fs.readFileSync(require('path').join(__dirname,'../assets/js/analitica-mi.js'),'utf8');
vm.runInContext(source,context);vm.runInContext(source,context);
assert.equal(scripts.length,1);
const analytics=context.window.MIAnalytics;
analytics.start();analytics.start();context.state.level=2;analytics.start();
assert.equal(calls.length,2);
assert(calls[0].path.endsWith('/guiat'));assert(calls[1].path.endsWith('/autonom'));
analytics.shown();analytics.answer(false);analytics.answer(false);analytics.complete();analytics.complete();
assert.equal(calls.length,4);
assert(calls.every(event=>event.event===true&&event.no_session===true&&event.referrer===''));
console.log('Inicialització repetida, doble inici, modes diferents, doble correcció i compleció: OK');
for(let course=1;course<=4;course++)for(const sense of ['numeric','mesura','algebraic','espacial','estocastic']) {
  const events=[];
  const sandbox={...context,location:{...context.location,pathname:`/${course}eso/sentit-${sense}.html`},
    state:{currentTopic:0,level:1},TOPICS:[{id:'stable-id',course:['','1r','2n','3r','4t'][course]}],
    MATH_OPTION:course===4?'B':'',window:{goatcounter:{count:event=>events.push(event)}}};
  vm.createContext(sandbox);vm.runInContext(source,sandbox);
  const a=sandbox.window.MIAnalytics,dimensions=`${course}eso/${sense}/stable-id`,option=course===4?'/B':'';
  a.start();a.shown();a.answer(true);a.complete();a.topicExam('started','stable-id');a.topicExam('submitted','stable-id');a.examStart();a.examSubmit();a.examSubmit();
  assert.equal(events.length,7);
  assert.equal(events[0].path,sense==='numeric'?`${course}eso-numeric-stable-id-guiat${option}`:`mi/practice/started/${dimensions}/guiat${option}`);
  assert.equal(events[1].path,`mi/practice/answered/${dimensions}/guiat/correct${option}`);
  assert.equal(events[2].path,`mi/practice/completed/${dimensions}/guiat${option}`);
  assert.equal(events[3].path,`mi/topic-exam/started/${dimensions}${option}`);
  assert.equal(events[4].path,`mi/exam/submitted/${course}eso/stable-id${option}`);
  assert.equal(events[5].path,`mi/sense-exam/started/${course}eso/${sense}/all${option}`);
  assert.equal(events[6].path,`mi/sense-exam/submitted/${course}eso/${sense}/all${option}`);
  assert(events.every(event=>event.event&&event.no_session&&event.referrer===''));
  for(const event of events)assert.deepEqual(Object.keys(event).sort(),['event','no_session','path','referrer','title']);
}
console.log('Dimensions exactes de curs, sentit, tema, mode, resultat, tipus d’examen i opció B: 20/20 OK');
const catalogue=JSON.parse(fs.readFileSync(require('path').join(__dirname,'../assets/data/index-cerca.json'),'utf8'));
const ids=new Map();
for(const entry of catalogue){
  const url=new URL(entry.practice,'https://mi.test'),id=url.searchParams.get('tema')||url.searchParams.get('topic');
  const key=entry.course+'eso/'+id,sense=entry.theory.split('/')[2];
  if(!ids.has(key))ids.set(key,new Set());ids.get(key).add(sense);
}
let collisions=0;
for(const [key,senses] of ids)if(senses.size>1)for(const sense of senses){
  const [course,id]=key.split('/'),events=[];
  const sandbox={...context,location:{...context.location,pathname:`/${course}/sentit-${sense}.html`},window:{goatcounter:{count:event=>events.push(event)}}};
  vm.createContext(sandbox);vm.runInContext(source,sandbox);sandbox.window.MIAnalytics.topicExam('submitted',id);
  assert.equal(events[0].path,`mi/exam/submitted/${key}/${sense}`);collisions++;
}
console.log('Col·lisions del catàleg diferenciades:',collisions,'OK');
