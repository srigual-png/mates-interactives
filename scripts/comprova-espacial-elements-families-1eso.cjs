'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
globalThis.window=globalThis;vm.runInThisContext(fs.readFileSync('assets/js/espacial-1eso-families.js','utf8'));vm.runInThisContext(fs.readFileSync('assets/js/dificultat-mi.js','utf8'));
const page=fs.readFileSync('1eso/sentit-espacial.html','utf8');
function extract(name){const start=page.indexOf('function '+name+'(');assert(start>=0,name+' source');const open=page.indexOf('{',start);let depth=0;for(let i=open;i<page.length;i++){if(page[i]==='{')depth++;else if(page[i]==='}'&&!--depth)return page.slice(start,i+1);}throw Error(name+' end');}
function seeded(seed){let x=seed>>>0;return()=>((x=Math.imul(x,1664525)+1013904223>>>0)/4294967296);}
let random,forced,first;globalThis.rnd=(a,b)=>{if(first){first=false;return forced;}return a+Math.floor(random()*(b-a+1));};globalThis.shuffle=a=>{const x=a.slice();for(let i=x.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[x[i],x[j]]=[x[j],x[i]];}return x;};globalThis.uniq4=(c,w)=>{const a=[...new Set([String(c),...w.map(String)])].slice(0,4);while(a.length<4)a.push('Distractor '+a.length);return shuffle(a);};globalThis.svgAngle=()=>'';globalThis.svgPolygon=()=>'';globalThis.svgParalelRec=()=>'';
vm.runInThisContext(extract('genElementsVarietat'));
const topic={id:'elements',course:'1r',exam1r:true},families=MIFirstSpatialFamilies.topicSpecs(topic.id),D=MIDifficulty.attach({course:'1eso',sense:'espacial',topics:[topic]});
assert.deepEqual(families.map(f=>f.level).reduce((a,n)=>(a[n-1]++,a),[0,0,0]),[6,0,0]);assert.deepEqual(D.coverage(topic).types,[6,0,0]);assert.equal(new Set(families.map(f=>f.id)).size,6);
let samples=0;for(let type=1;type<=8;type++)for(let i=0;i<250;i++){forced=type;first=true;random=seeded(1009+type*997+i*17);const q=genElementsVarietat(),f=MIFirstSpatialFamilies.familyFor('elements',q);assert.equal(q.type,type);assert(f,'family assigned');assert.equal(D.getDifficulty(topic,q),f.level);assert.equal(q.options.length,4);assert.equal(new Set(q.options).size,4);assert(q.options.includes(q.correct));assert(q.guide?.length>=2);assert(q.solution?.length>=1);
 if(type===3){const m=q.question.match(/mesura <b>(\d+) cm<\/b>/),a=q.correct.match(/(\d+) cm/);assert(m&&a);assert.equal(+a[1],+m[1]/2);}
 if(type===5){const m=q.question.match(/angle de <b>(\d+)°/),a=q.correct.match(/(\d+)°/);assert(m&&a);assert.equal(+a[1],+m[1]/2);}
 if(type===4&&/punts que estan a la mateixa distància/.test(q.question))assert.match(q.correct,/mediatriu/i);
 samples++;}
console.log(JSON.stringify({topic:'elements',families:families.length,levels:D.coverage(topic).types,samples}));
