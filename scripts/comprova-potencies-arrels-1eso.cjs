const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..'),html=fs.readFileSync(path.join(root,'1eso/sentit-numeric.html'),'utf8'),difficulty=fs.readFileSync(path.join(root,'assets/js/dificultat-mi.js'),'utf8');
require('../assets/js/raonament-numeric-1eso.js');
const plain=s=>String(s).replace(/<[^>]*>/g,' ').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&nbsp;/g,' ').replace(/\s+/g,' ').trim();
function extractFunction(source,name){
 const start=source.indexOf('function '+name+'(');assert(start>=0,'funció '+name);const open=source.indexOf('{',start);let depth=0,quote=null,escaped=false,line=false,block=false;
 for(let i=open;i<source.length;i++){const c=source[i],n=source[i+1];if(line){if(c==='\n')line=false;continue;}if(block){if(c==='*'&&n==='/'){block=false;i++;}continue;}if(quote){if(escaped)escaped=false;else if(c==='\\')escaped=true;else if(c===quote)quote=null;continue;}if(c==='/'&&n==='/'){line=true;i++;continue;}if(c==='/'&&n==='*'){block=true;i++;continue;}if(c==='"'||c==="'"||c==='`'){quote=c;continue;}if(c==='{')depth++;if(c==='}'&&--depth===0)return source.slice(start,i+1);}
 throw Error('bloc incomplet '+name);
}
const familyMatch=difficulty.match(/const POTENCIES_FAMILY_SPECS=freeze\(([\s\S]*?)\);/);assert(familyMatch,'font única de famílies');
const families=Function('return ('+familyMatch[1]+')')();assert.deepEqual(families.map(f=>f.level),[1,1,1,1,2,2,2,2,3,3]);assert.deepEqual(families.map(f=>f.practiceTypes.length),[2,2,2,2,1,1,1,1,1,1]);
const ids=families.flatMap(f=>f.generators);assert.equal(ids.length,17);assert.equal(new Set(ids).size,17,'cap generador comptat dues vegades');
const levels=Object.fromEntries(families.flatMap(f=>f.generators.map(id=>[id,f.level])));
const legacy=difficulty.match(/"potencies":\[\[([^\]]*)\],\[([^\]]*)\],\[([^\]]*)\]\]/);assert(legacy,'mapa compartit');assert.deepEqual(legacy.slice(1).map(x=>x?Function('return ['+x+']')():[]),[[1,2,3,4,5,6,7],[],[]]);
assert(difficulty.includes('POTENCIES_FAMILY_SPECS.find(row=>row.generators.includes(key))'),'classificador comparteix les famílies');assert(difficulty.includes('potenciesFamilies:POTENCIES_FAMILY_SPECS'),'famílies exposades a la pràctica');
const groupMatch=html.match(/const POTENCIES_PRACTICE_FAMILIES=\[1,2,3\]\.map\(level=>\s*MIDifficulty\.potenciesFamilies\.filter\(family=>family\.level===level\)\.map\(family=>family\.practiceTypes\)\s*\);/);assert(groupMatch,'pràctica derivada del classificador');
assert.deepEqual([1,2,3].map(n=>families.filter(f=>f.level===n).length),[4,4,2]);
for(const type of [1,2,3,4,5,6,7])assert.equal(levels[type],1,'tipus base '+type);
for(const id of ['base-deu-regularitat','exponent-desconegut','acotar-arrel','recompte-multiplicatiu','dos-quadrats-invers','fila-columna','diagnosticar-potencia-arrel'])assert(Object.hasOwn(levels,id),id);
const bank=difficulty.match(/"potencies-([123])": (\d)/g)||[];assert.deepEqual(Object.fromEntries(bank.map(x=>{const m=x.match(/"(potencies-\d+)": (\d)/);return[m[1],Number(m[2])];})),{'potencies-1':1,'potencies-2':2,'potencies-3':1});
assert(!/if \(q\.type === 6\) return 2/.test(difficulty));assert(!/if \(q\.type === 5 && \/\\\^3/.test(difficulty));assert(!/if \(q\.type === 7 && \/ = \(100\|121\|144\)/.test(difficulty));

const p0=html.indexOf('function readOpsInteger'),p1=html.indexOf('function genProporcionalitatBase',p0);assert(p0>=0&&p1>p0,'bloc de generadors de potències');const block=html.slice(p0,p1);
const declarations=['const POTENCIES_THEORY=','const POWER_DIGITS=','const POWER_DIAGNOSIS_REASONS=','const POWER_DIAGNOSIS='];
function declaration(name){const start=block.indexOf(name);assert(start>=0,name);let i=block.indexOf('=',start)+1,depth=0,quote=null,escaped=false;for(;i<block.length;i++){const c=block[i];if(quote){if(escaped)escaped=false;else if(c==='\\')escaped=true;else if(c===quote)quote=null;continue;}if(c==='"'||c==="'"||c==='`'){quote=c;continue;}if(c==='['||c==='{')depth++;if(c===']'||c==='}')depth--;if(c===';'&&depth===0)return block.slice(start,i+1);}throw Error('declaració incompleta '+name);}
const code=[...declarations.map(declaration),...['readOpsInteger','powerParts','radicalValue','potenciesAnswerMatches','powerProduct','powerDisplay','powerInteger','powerOptions','genPotenciesPractice','genPotenciesArrels'].map(n=>extractFunction(block,n)),extractFunction(html,'genPotenciesProb')].join('\n');
let seed=57301;const ctx={MIFirstNumericTasks:globalThis.MIFirstNumericTasks,forcedAmpType:1};
ctx.rnd=(a,b)=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return a+Math.floor(seed/4294967296*(b-a+1));};ctx.shuffle=a=>{for(let i=a.length-1;i>0;i--){const j=ctx.rnd(0,i);[a[i],a[j]]=[a[j],a[i]];}return a;};ctx.ampNextType=()=>ctx.forcedAmpType;
vm.runInNewContext(code,ctx,{timeout:5000});
const totals={},samples={};
function checkExercise(q,key,oracle,level){const question=q.question||q.text;assert(question&&plain(question).length>8,key+': enunciat');assert(q.guide?.length||q.hints?.length,key+': pistes');assert(q.solution?.length||q.steps?.length,key+': solució');assert.equal(q.taskDifficulty??q.diff,level,key+': nivell efectiu');if(q.options){assert.equal(q.options.length,4,key+': quatre opcions');assert.equal(new Set(q.options).size,4,key+': opcions diferents');if(q.potenciesAnswer)assert.equal(q.options.filter(o=>ctx.potenciesAnswerMatches(q.potenciesAnswer,o)).length,1,key+': resposta no ambigua');}if(q.potenciesAnswer)assert(ctx.potenciesAnswerMatches(q.potenciesAnswer,q.correct),key+': corrector rebutja correcta');if(q.answer?.check)assert(q.answer.check(q.answer.val),key+': corrector rebutja correcta');oracle(q);totals[key]=(totals[key]||0)+1;const row={question:plain(question),answer:q.correct??q.answer.val,level};samples[key]||=[];if(samples[key].length<3&&!samples[key].some(x=>x.question===row.question))samples[key].push(row);}
function repeat(key,n,gen,oracle,level){for(let i=0;i<n;i++)checkExercise(gen(i),key,oracle,level);}
const numericOracles={
 1:q=>{const m=plain(q.question).match(/(\d+)\^(\d+)/);assert(m);assert.equal(Number(q.correct),+m[1]);},
 2:q=>{const m=plain(q.question).match(/(\d+)\^(\d+)/);assert(m);assert.equal(Number(q.correct),+m[2]);},
 3:q=>{const m=plain(q.question).match(/Escriu com a potència:\s*([\d\s×]+)/),f=m?.[1].match(/\d+/g).map(Number);assert(f?.length>=2&&f.every(x=>x===f[0]));assert.equal(q.correct,f[0]+'^'+f.length);},
 4:q=>{const m=plain(q.question).match(/representa\s*(\d+)\^(\d+)/),f=q.correct.match(/\d+/g).map(Number);assert(m);assert.deepEqual(f,Array(+m[2]).fill(+m[1]));},
 5:q=>{const m=plain(q.question).match(/Calcula\s*(\d+)\^(\d+)/);assert(m);assert.equal(+q.correct,(+m[1])**(+m[2]));},
 6:q=>{const m=plain(q.question).match(/√(\d+)/);assert(m);const r=Math.sqrt(+m[1]);assert(Number.isInteger(r));assert.equal(+q.correct,r);},
 7:q=>{const m=plain(q.question).match(/(\d+)²\s*=\s*(\d+)/);assert(m);assert.equal(q.correct,'√'+m[2]+' = '+m[1]);}
};
for(const type of [1,2,3,4,5,6,7])repeat('type-'+type,250,()=>ctx.genPotenciesPractice(type,1,{baseDeuInverse:false}),numericOracles[type],1);

repeat('base-deu-regularitat',250,i=>{const inverse=i%2===0,q=ctx.genPotenciesPractice('base-deu-regularitat',1,{baseDeuInverse:inverse});q._inverse=inverse;return q;},q=>{const n=Number(String(q.correct).replace(/\./g,''));if(q._inverse){const m=plain(q.question).match(/valgui\s*([\d.]+)/);assert(m);assert.equal(10**n,Number(m[1].replace(/\./g,'')));}else{const m=plain(q.question).match(/10([⁰¹²³⁴⁵⁶⁷⁸⁹]+)/);assert(m);const e=Number([...m[1]].map(d=>'⁰¹²³⁴⁵⁶⁷⁸⁹'.indexOf(d)).join(''));assert.equal(n,10**e);}},1);
repeat('exponent-desconegut',250,()=>ctx.genPotenciesPractice('exponent-desconegut',2,{}),q=>{const m=plain(q.question).match(/base (\d+) valgui ([\d.]+)/);assert(m);const e=Number(q.correct),v=Number(m[2].replace(/\./g,''));assert(e>0&&Number(m[1])**e===v);},2);
repeat('acotar-arrel',250,()=>ctx.genPotenciesPractice('acotar-arrel',2,{}),q=>{const m=plain(q.question).match(/√(\d+)/),[lo,hi]=q.correct.split(';').map(Number);assert(m);assert.equal(hi,lo+1);assert(lo**2<+m[1]&&+m[1]<hi**2);},2);
repeat('recompte-multiplicatiu',250,()=>ctx.genPotenciesPractice('recompte-multiplicatiu',2,{}),q=>{const t=plain(q.question);let b,e;if(t.includes('pantalles')){const m=t.match(/(\d+) pantalles amb (\d+) opcions/);assert(m);e=+m[1];b=+m[2];}else{const m=t.match(/reemplaça per (\d+) brots.*durant (\d+) rondes/);assert(m);b=+m[1];e=+m[2];}assert.equal(b**e,Number(q.correct.split('=')[1].replace(/\./g,'')));assert(ctx.potenciesAnswerMatches(q.potenciesAnswer,q.correct));},2);
repeat('dos-quadrats-invers',250,()=>ctx.genPotenciesPractice('dos-quadrats-invers',3,{}),q=>{const {gap,total}=q.reasoningData,solutions=[];for(let s=1;s*s<total;s++)if(s*s+(s+gap)**2===total)solutions.push(s);assert.equal(solutions.length,1);assert.equal(Number(q.correct),(solutions[0]+gap)**2);},3);
repeat('fila-columna',250,()=>ctx.genPotenciesPractice('fila-columna',2,{}),q=>{const {side}=q.reasoningData;assert.equal(Number(q.correct),(side-1)**2);assert.equal(Number(q.correct),side**2-(2*side-1));},2);
repeat('diagnosticar-potencia-arrel',250,()=>ctx.genPotenciesPractice('diagnosticar-potencia-arrel',3,{}),q=>{const [reason,n]=q.correct.split(';').map(x=>x.trim());const range=plain(q.question).match(/entre (\d+) i (\d+), inclosos/);assert(range&&['A','B','C'].includes(reason));const lo=+range[1],hi=+range[2],valid=Array.from({length:hi-lo+1},(_,i)=>lo+i).filter(x=>reason!=='B'||Number.isInteger(Math.sqrt(x)));const eq=x=>reason==='A'?x*x===2*x:reason==='B'?Math.sqrt(x)===x/2:2**x===x*x;const first=valid.find(x=>!eq(x));assert(first,'contraexemple dins del rang');assert.equal(+n,first);assert(valid.filter(x=>x<first).every(eq));},3);

for(const type of [1,2,3])repeat('potencies-'+type,250,()=>{ctx.forcedAmpType=type;return ctx.genPotenciesProb();},q=>{const text=plain(q.text);assert(q.answer?.check&&q.steps?.length);assert(q.answer.check(q.answer.val),'corrector banc');assert.deepEqual(Array.from(q.steps,step=>step.check(step.label==='Potència'?(/\d+[⁰¹²³⁴⁵⁶⁷⁸⁹]|\d+\^\d+/.exec(q.hints[0])||[])[0]:q.answer.val.split(' ')[0])),Array.from(q.steps,()=>true));const nums=text.match(/\d+/g).map(Number);if(type===1){assert.equal(nums[0],nums[1]);assert.equal(Number.parseInt(q.answer.val),nums[0]**2);}else if(type===2){const m=text.match(/(\d+) opcions.*?(\d+) pantalles/);assert(m);assert.equal(Number.parseInt(q.answer.val),Number(m[1])**Number(m[2]));}else{const r=Number.parseInt(q.answer.val),n=Number(text.match(/(\d+) fotografies/)[1]);assert.equal(r*r,n);}},type===1||type===3?1:2);

const mapped={
 'identificar-base-exponent':['type-1','type-2','type-1'],
 'representar-producte-potencia':['type-3','type-4','type-3'],
 'calcular-potencia':['type-5','base-deu-regularitat','base-deu-regularitat'],
 'arrel-exacta-i-relacio-inversa':['type-6','type-7','potencies-3'],
 'exponent-desconegut':['exponent-desconegut','exponent-desconegut','exponent-desconegut'],
 'acotar-arrel':['acotar-arrel','acotar-arrel','acotar-arrel'],
 'recompte-multiplicatiu-contextual':['recompte-multiplicatiu','recompte-multiplicatiu','recompte-multiplicatiu'],
 'comptar-quadrat-sense-solapament':['fila-columna','fila-columna','fila-columna'],
 'reconstruir-dos-quadrats':['dos-quadrats-invers','dos-quadrats-invers','dos-quadrats-invers'],
 'diagnosticar-potencies-i-arrels':['diagnosticar-potencia-arrel','diagnosticar-potencia-arrel','diagnosticar-potencia-arrel']
};
const examples={};for(const [id,keys] of Object.entries(mapped)){examples[id]=keys.map(key=>{const xs=samples[key];assert(xs?.length>=1,key+' exemples');return xs.shift();});assert.equal(examples[id].length,3);}
const total=Object.values(totals).reduce((a,b)=>a+b,0);assert.equal(total,4250);
console.log(JSON.stringify({passed:true,totalGenerated:total,byGenerator:totals,families:families.map(f=>({id:f.id,level:f.level,generators:f.generators})),examples},null,2));

