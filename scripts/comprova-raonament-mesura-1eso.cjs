const assert=require('assert/strict'),fs=require('fs');
require('../assets/js/raonament-mesura-1eso.js');
function binMinimum(data){const items=[...Array(data.A).fill(data.a),...Array(data.B).fill(data.b),...Array(data.C).fill(data.c)].sort((a,b)=>b-a);
 for(let k=Math.ceil(items.reduce((a,b)=>a+b,0)/data.length);k<=items.length;k++){const bins=Array(k).fill(0);function fit(i){if(i===items.length)return true;const used=new Set();for(let j=0;j<k;j++){if(used.has(bins[j])||bins[j]+items[i]>data.length)continue;used.add(bins[j]);bins[j]+=items[i];if(fit(i+1))return true;bins[j]-=items[i];}return false;}if(fit(0))return k;}}
const oracles={
 'talls-combinats':binMinimum,
 'carrega-amb-dos-limits':d=>{let max=0;for(let a=0;a<20;a++)for(let b=0;b<20;b++)if(a+b<=d.slots&&a*d.massA+b*d.massB<=d.limit)max=Math.max(max,a*d.litA+b*d.litB);return max;},
 'transbordament-invers':d=>{let last=-1;for(let t=d.base;t<=d.deadline;t++)if((t-d.base)%d.periodA===0)for(let b=d.base+d.offset;b<=d.deadline;b+=d.periodB)if(b>=t+d.rideA+d.walk&&b+d.rideB<=d.deadline)last=t;return last-d.base;},
 'tanca-area-maxima':d=>{let max=0;for(let w=1;w<=d.maxWidth;w++)for(let l=1;l<=d.fence+d.gate;l++)if(2*(w+l)===d.fence+d.gate)max=Math.max(max,w*l);return max;},
 'rectangle-area-fixada':d=>{let min=Infinity;for(let a=d.minSide;a<=d.area;a++)for(let b=d.minSide;b<=d.area;b++)if(a*b===d.area)min=Math.min(min,2*a+2*b);return min;},
 'encaix-amb-tolerancies':d=>{let last=0;for(let w=0;w<=d.width;w++)if(d.width-d.errW-(w+d.errP)>=d.clearance)last=w;return last;},
 'estimacio-amb-garantia':d=>{let count=0;const area=(Math.round(d.length*10+d.margin*10)*Math.round(d.width*10+d.margin*10));while(count*d.coverage*100<area)count++;return count;},
 'compra-pintura-combinada':d=>{let min=Infinity;for(let a=0;a<50;a++)for(let b=0;b<50;b++)if(a*d.coverA+b*d.coverB>=d.width*d.height-d.opening)min=Math.min(min,a*d.costA+b*d.costB);return min;},
 'mesura-mixta':d=>d.metres*100+d.cm-d.used,
 'estimacio-comparada':d=>{let c=0;while(c*d.c<(d.a+1)*d.b)c++;return c;}
};
let seed=173;const random=()=>{seed=(1664525*seed+1013904223)>>>0;return seed/4294967296;};const result=[];
for(const descriptor of MIFirstMeasureTasks.catalog){let count=0;for(const rng of [()=>0,()=>0.5,()=>1-Number.EPSILON,...Array(150).fill(random)]){const q=MIFirstMeasureTasks.generate(descriptor.id,rng),d=q.reasoningData;assert.equal(Number(q.correct),oracles[descriptor.id](d),descriptor.id);assert.equal(q.options.filter(o=>o===q.correct).length,1);assert.equal(new Set(q.options).size,4);assert(q.solution.length&&q.guide.length);assert(!/NaN|undefined|Infinity/.test(JSON.stringify(q)));
if(descriptor.id==='talls-combinats')assert(Number(q.correct)>Math.ceil((d.a*d.A+d.b*d.B+d.c*d.C)/d.length),'la longitud sola resol el problema');
if(descriptor.id==='carrega-amb-dos-limits')assert(Number(q.correct)>Math.max(Math.min(d.slots,Math.floor(d.limit/d.massA))*d.litA,Math.min(d.slots,Math.floor(d.limit/d.massB))*d.litB),'no cal combinar càrregues');
if(descriptor.id==='compra-pintura-combinada'){const need=d.width*d.height-d.opening;assert(Number(q.correct)<Math.min(d.costA*Math.ceil(need/d.coverA),d.costB*Math.ceil(need/d.coverB)),'compra d’un únic format trivialitza la comparació');}
count++;}const unique=new Set();for(let i=0;i<2000;i++)unique.add(MIFirstMeasureTasks.generate(descriptor.id,random).question);if(descriptor.level===3)assert(unique.size>=20,'menys de 20 enunciats numèrics diferents '+descriptor.id);result.push({id:descriptor.id,level:descriptor.level,cases:count,distinctQuestions:unique.size});}
fs.writeFileSync('docs/dificultats/oracles-raonament-1eso-mesura.json',JSON.stringify({families:result,total:result.reduce((a,b)=>a+b.cases,0),method:'Oracles independents: col·locació recursiva en barres, enumeració d’horaris i compres, cerca de dimensions i comprovació dels marges extrems.'},null,2));console.log(JSON.stringify(result));
