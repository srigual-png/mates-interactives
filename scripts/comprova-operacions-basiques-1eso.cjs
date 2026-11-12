const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
require('../assets/js/raonament-numeric-1eso.js');
const root=path.resolve(__dirname,'..'),html=fs.readFileSync(path.join(root,'1eso/sentit-numeric.html'),'utf8'),difficulty=fs.readFileSync(path.join(root,'assets/js/dificultat-mi.js'),'utf8');
const plain=v=>String(v).replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim();
const legacy=difficulty.match(/"ops":\[\[([^\]]+)\],\[([^\]]*)\],\[([^\]]*)\]\]/);
assert(legacy,'mapa legacy');const legacyLevels=legacy.slice(1).map(x=>x?Function('return ['+x+']')():[]);
assert.deepEqual(legacyLevels,[[1,2,3],[4,5,6],[]]);
const extra=difficulty.match(/const OPS_PRACTICE_LEVELS=freeze\((\{[^\n]+\})\);/);
assert(extra,'nivells addicionals');const extraLevels=Function('return ('+extra[1]+')')();
assert.deepEqual(extraLevels,{'triar-operacio':1,capses:2,compensacio:2,'diagnosticar-divisio':2,'reconstruir-total':3});
const fm=html.match(/const OPS_PRACTICE_FAMILIES=\[\r?\n([\s\S]*?)\r?\n\];/);assert(fm,'famílies adaptatives');
const groups=Function('return ['+fm[1]+']')();assert.deepEqual(groups.map(x=>x.length),[4,4,2]);
const all=groups.flat(2);assert.equal(all.length,12);assert.equal(new Set(all).size,12,'cap duplicat');
const levelOf=t=>typeof t==='number'?(t===1001?3:legacyLevels.findIndex(g=>g.includes(t))+1):extraLevels[t];
for(const [i,row] of groups.entries())for(const family of row)assert(family.every(t=>levelOf(t)===i+1),'nivell únic');
assert.equal(globalThis.MIFirstNumericTasks.catalog.find(x=>x.id==='compra-combinada').level,3);

function extract(source,name){
 const start=source.indexOf('function '+name+'(');assert(start>=0,'funció '+name);
 const open=source.indexOf('{',start);let depth=0,quote=null,escaped=false,line=false,block=false;
 for(let i=open;i<source.length;i++){
  const c=source[i],n=source[i+1];
  if(line){if(c==='\n')line=false;continue;}
  if(block){if(c==='*'&&n==='/'){block=false;i++;}continue;}
  if(quote){if(escaped)escaped=false;else if(c==='\\')escaped=true;else if(c===quote)quote=null;continue;}
  if(c==='/'&&n==='/'){line=true;i++;continue;}if(c==='/'&&n==='*'){block=true;i++;continue;}
  if(c==='"'||c==="'"){quote=c;continue;}
  if(c==='{')depth++;if(c==='}'&&--depth===0)return source.slice(start,i+1);
 }
 throw Error('bloc incomplet '+name);
}
const from=html.indexOf('function readOpsInteger'),to=html.indexOf('function genJerarquia',from);
assert(from>=0&&to>from,'bloc de generadors ops');const ops=html.slice(from,to);
const fn=['readOpsInteger','readOpsAnswer','opsAnswerMatches','buildOpsOptions','opsBaseSolution','genOpsType','genOpsPractice','genOpsPracticeFamily'];
fn.forEach(name=>assert(extract(ops,name),'extracció '+name));
const d0=ops.indexOf('const OPS_DIVISION_REASONS='),d1=ops.indexOf('};',d0)+2;
const t0=ops.indexOf('const OPS_THEORY_SECTIONS='),t1=ops.indexOf('});',t0)+3;
const f0=ops.indexOf('const OPS_PRACTICE_FAMILIES='),f1=ops.indexOf('];',f0)+2;
const stubs=[
"let seed=137;",
"function rnd(a,b){seed=(Math.imul(seed,1664525)+1013904223)>>>0;return a+Math.floor(seed/4294967296*(b-a+1));}",
"function sumDistractors(a,b){return [a+b+1,a+b+2,a+b+3];}",
"function subDistractors(a,b){return [a-b+1,a-b+2,a-b+3];}",
"function multDistractors(a,b){return [a*b+1,a*b+2,a*b+3];}",
"function buildOpts(correct,wrong){const out=[String(correct)],seen=new Set(out);for(const v of wrong){const s=String(v);if(!seen.has(s)&&out.length<4){seen.add(s);out.push(s);}}let n=1;while(out.length<4){const s=String(correct),p=s.match(/^([AB];\\s*)?(\\d+);\\s*(\\d+)$/),m=s.match(/^(-?\\d+)(.*)$/),v=p?(p[1]||'')+p[2]+'; '+(Number(p[3])+n):m?(Number(m[1])+n)+m[2]:s+' '+n;if(!seen.has(v)){seen.add(v);out.push(v);}n++;}return out;}"
].join('\n');
const runnable=stubs+ops.slice(d0,d1)+'\n'+ops.slice(t0,t1)+'\n'+ops.slice(f0,f1)+'\n'+fn.map(n=>extract(ops,n)).join('\n');
const ctx={MIFirstNumericTasks:globalThis.MIFirstNumericTasks};vm.runInNewContext(runnable,ctx,{timeout:5000});
const counts={},samples={};
function verify(q,name,oracle){
 const text=plain(q.question);assert(q.question&&q.guide?.length&&q.solution?.length,name+': contingut');
 assert.equal(q.options.length,4,name+': opcions');
 const vals=q.options.map(x=>JSON.stringify(ctx.readOpsAnswer(q.opsAnswer,x)));
 assert.equal(new Set(vals).size,4,name+': opcions úniques');
 assert.equal(q.options.filter(x=>ctx.opsAnswerMatches(q.opsAnswer,x)).length,1,name+': una correcta');
 assert.equal(ctx.opsAnswerMatches(q.opsAnswer,q.correct),true,name+': corrector');
 assert.equal(q.taskDifficulty,levelOf(q.type),name+': nivell efectiu');
 assert.equal(q.diff,levelOf(q.type),name+': diffitat interna');
 if(oracle)oracle(q,text);counts[name]=(counts[name]||0)+1;
 if(counts[name]<=3)(samples[name]||=[]).push({question:text,answer:q.correct,level:q.taskDifficulty});
}
for(const type of [1,2,3,4,5,6])for(let i=0;i<250;i++){
 const q=ctx.genOpsPractice(type,levelOf(type));
 verify(q,'type-'+type,(x,text)=>{
  if(type<=3){const m=text.match(/Calcula: (\d+) ([+\-x]) (\d+)/);assert(m,'operació directa');
   const want=type===1?+m[1]+ +m[3]:type===2?+m[1]- +m[3]:+m[1]* +m[3];assert.equal(ctx.readOpsInteger(x.correct),want,'oracle aritmètic');}
  else if(type===4){const [n,d]=x.opsAnswer.division,[q,r]=x.opsAnswer.value;assert.equal(q,Math.floor(n/d));assert.equal(r,n%d);assert(n===d*q+r&&r>=0&&r<d);}
  else if(type===5){const m=text.match(/compra (\d+) quaderns a (\d+) euros cadascun\. Paga (\d+) euros/);assert(m);assert.equal(ctx.readOpsAnswer(x.opsAnswer,x.correct),+m[3]-(+m[1])*(+m[2]));}
  else{const m=text.match(/treballa (\d+) dies, (\d+) torns\/dia, (\d+) unitats\/torn/);assert(m);assert.equal(ctx.readOpsAnswer(x.opsAnswer,x.correct),+m[1]* +m[2]* +m[3]);}
 });
}
for(const type of ['triar-operacio','capses','compensacio','diagnosticar-divisio','reconstruir-total'])for(let i=0;i<250;i++){
 const q=ctx.genOpsPractice(type,extraLevels[type]);
 verify(q,type,(x,text)=>{
  if(type==='triar-operacio'){const n=[...text.matchAll(/\d+/g)].map(m=>+m[0]),op=text.includes('en reps')?'+':text.includes('en regales')?'-':text.includes('sobres amb')?'×':'÷';
   assert.equal(x.opsAnswer.value[1],op);assert.equal(x.opsAnswer.value[0],op==='+'||op==='×'?Math.min(...n):n[0]);assert.equal(x.opsAnswer.value[2],op==='+'||op==='×'?Math.max(...n):n[1]);}
  else if(type==='capses'){const m=text.match(/guardar (\d+) llibres en capses de fins a (\d+)/),total=+m[1],cap=+m[2],boxes=Math.ceil(total/cap);assert.deepEqual(Array.from(x.opsAnswer.value),[boxes,total-cap*(boxes-1)]);}
  else if(type==='compensacio'){const m=text.match(/Per sumar (\d+) \+ (\d+), substitueixes \d+ per (\d+)/);assert(m);assert.equal(x.opsAnswer.value,+m[1]+ +m[2]- +m[3]);}
  else if(type==='diagnosticar-divisio'){const m=text.match(/Algú escriu (\d+) = (\d+) × (\d+) \+ (\d+)/),n=+m[1],d=+m[2],shownQ=+m[3],shownR=+m[4],why=d*shownQ+shownR!==n?'A':shownR>=d?'B':null;assert(why);const [reason,q,r]=x.opsAnswer.value;assert.equal(reason,why);assert.equal(q,Math.floor(n/d));assert.equal(r,n%d);}
  else{const m=text.match(/de (\d+) en \1 es formen (\d+) grups.*?de (\d+) en \3 se’n formen (\d+)/);assert(m);const d=+m[1],q=+m[2],e=+m[3],f=+m[4],lo=Math.max(d*q,e*f),hi=Math.min(d*q+d-1,e*f+e-1);assert.equal(lo,hi);assert.equal(x.opsAnswer.value,lo);}
 });
}
function unitRandom(){seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;}
for(let i=0;i<250;i++){
 const q=ctx.genOpsPractice(1001,3),d=q.reasoningData;let best=Infinity;
 for(let x=0;x<=Math.ceil(d.need/d.a);x++)for(let y=0;y<=Math.ceil(d.need/d.b);y++)if(x*d.a+y*d.b>=d.need)best=Math.min(best,x*d.pa+y*d.pb);
 assert.equal(ctx.readOpsAnswer(q.opsAnswer,q.correct),best,'oracle cost mínim');verify(q,'compra-combinada',()=>{});
}
const familyTypes={'suma-directa':['type-1'],'resta-directa':['type-2'],'multiplicacio-directa':['type-3'],'triar-operacio':['triar-operacio'],
 'divisio-quocient-residu':['type-4','capses','diagnosticar-divisio'],'cost-i-canvi':['type-5'],'produccio-per-torns':['type-6'],
 'compensacio-sumands':['compensacio'],'compra-combinada-minim':['compra-combinada'],'reconstruir-total-agrupaments':['reconstruir-total']};
const examples=Object.fromEntries(Object.entries(familyTypes).map(([id,names])=>{const rows=names.map(n=>samples[n][0]);if(rows.length===1)rows.push(...samples[names[0]].slice(1));return[id,rows.slice(0,3)];}));
for(const [id,rows] of Object.entries(examples))assert.equal(rows.length,3,id+': tres exemples');
console.log(JSON.stringify({passed:true,totalGenerated:Object.values(counts).reduce((a,b)=>a+b,0),byGenerator:counts,familyLevels:groups.map((x,i)=>x.map(()=>i+1)),examples},null,2));

