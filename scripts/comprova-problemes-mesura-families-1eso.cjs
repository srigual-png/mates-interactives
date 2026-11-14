'use strict';
const assert=require('node:assert/strict');const fs=require('node:fs');const vm=require('node:vm');
globalThis.window=globalThis;
function seeded(seed){let x=seed>>>0;return()=>{x=(Math.imul(x,1664525)+1013904223)>>>0;return x/4294967296;};}
let random=seeded(0x91a7);globalThis.rnd=(a,b)=>a+Math.floor(random()*(b-a+1));
globalThis.shuffle=a=>{const out=a.slice();for(let i=out.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[out[i],out[j]]=[out[j],out[i]];}return out;};
globalThis.fmtNum=n=>Number.isInteger(n)?String(n):String(Number(n.toFixed(6))).replace('.',',');
globalThis.MATH_OPTION='';
for(const p of ['assets/js/raonament-mesura-1eso.js','assets/js/dificultat-mi.js'])vm.runInThisContext(fs.readFileSync(p,'utf8'),{filename:p});
const html=fs.readFileSync('1eso/sentit-mesura.html','utf8').replace(/\r\n?/g,'\n');
const start=html.indexOf('function canonicalUnitText(value){'),end=html.indexOf('function genMesuramentPrecisioRaw(){',start);
assert(start>=0&&end>start,'context bank source bounds (LF/CRLF normalized)');
vm.runInThisContext(html.slice(start,end)+';globalThis.__patterns=MEASURE_PROBLEM_PATTERNS;globalThis.__problemRaw=genProblemesRaw;',{filename:'measure-problem-bank.js'});
const patterns=globalThis.__patterns,expectedCount=38;
assert.equal(patterns.length,expectedCount,'all 38 contextual patterns are present before adding reasoning catalog routes');
const topics=[{id:'problemes',name:'Problemes de context',course:'1r',exam1r:true},{id:'estimacio',name:'Estimació',course:'1r',exam1r:true}];
MIFirstMeasureTasks.extend(topics,patterns);
const D=MIDifficulty.attach({course:'1eso',sense:'mesura',topics});D.bindBanks({measureProblems:patterns});
const familyById={C01:'mesura-mixta',C02:'repartir-quantitat-amb-conversio',C03:'repartir-quantitat-amb-conversio',C04:'mesura-mixta',C05:'restar-mesures-mateixa-unitat',C06:'repartir-quantitat-amb-conversio',T01:'durada-entre-hores',T02:'hora-final',T03:'operar-durades-i-pausas',T04:'durada-entre-hores',T05:'angle-gir-rellotge',P01:'perimetre-amb-obertura',P02:'cost-material-per-contorn',P03:'circumferencia-directa',P04:'voltes-circumferencia',P05:'reconstruir-costat-des-del-perimetre',A01:'cobrir-superficie',A02:'cobrir-superficie',A03:'compondre-arees-figures',A04:'reconstruir-dimensio-rectangle-area',A05:'cost-per-superficie',A06:'compondre-arees-figures',A07:'comparar-arees',S01:'escala-proporcional',S02:'escala-proporcional',S03:'escala-proporcional',S04:'escala-proporcional',M01:'seleccionar-instrument',M02:'seleccionar-unitat-mesura',M03:'error-absolut',M04:'error-relatiu-percentual',M05:'error-relatiu-percentual',I01:'cost-material-per-contorn',I02:'cobrir-superficie',I03:'cost-combinat-area-perimetre',I04:'voltes-circumferencia',I05:'repartir-quantitat-amb-conversio',I06:'cost-combinat-area-perimetre'};
const levelByFamily={...Object.fromEntries(Object.entries(familyById).map(([id,f])=>[id,f==='restar-mesures-mateixa-unitat'||f==='seleccionar-instrument'||f==='seleccionar-unitat-mesura'?1:2])),R01:3,R02:3,R03:3,R04:3,R05:3,R06:3,R07:3,R08:3};
function nums(text){return [...String(text).matchAll(/\d+(?:[,.]\d+)?/g)].map(m=>Number(m[0].replace(',','.')));}
function timeMinutes(text){const s=String(text),clock=s.match(/(\d{1,2}):(\d{2})/);if(clock)return Number(clock[1])*60+Number(clock[2]);const h=s.match(/(\d+)\s*h/),m=s.match(/(\d+)\s*min/);return (h?Number(h[1])*60:0)+(m?Number(m[1]):0);}
function parsed(q,id){const n=nums(q.question);assert(n.length,`${id}: numerical inputs parse`);return n;}
function expected(q,id){if(id==='M01'||id==='M02')return null;const n=parsed(q,id),t=q.question;
 switch(id){
  case'C01':return n[0]*1000+n[1];case'C02':return Math.floor(n[0]*1000/n[1]);case'C03':return Math.floor(n[0]*1000/n[1]);case'C04':return n[0]*1000+n[1]*10+n[2];case'C05':return n[0]-n[1];case'C06':return Math.floor(n[0]*100/n[1]);
  case'T01':{const m=t.match(/comença a les (\d+):(\d+) h i acaba a les (\d+):(\d+) h.*parada de (\d+) min/);assert(m,'T01 independent parser');const start=+m[1]*60+ +m[2],end=+m[3]*60+ +m[4];return (end-start+1440)%1440-(+m[5]);}
  case'T02':{const m=t.match(/comença a les (\d+):(\d+) h i dura (\d+) h (\d+) min/);assert(m,'T02 independent parser');return (+m[1]*60+ +m[2]+ +m[3]*60+ +m[4])%1440;}
  case'T03':return n[0]+n[1]+n[2];case'T04':{const m=t.match(/comença a les (\d+):(\d+) h i acaba a la (\d+):(\d+) h/);assert(m,'T04 parser');return (24*60-(+m[1]*60+ +m[2]))+(+m[3]*60+ +m[4]);}case'T05':return n[0]*6;
  case'P01':return 2*(n[0]+n[1])-n[2];case'P02':return 2*(n[0]+n[1])/100*n[2];case'P03':return 3.14*n[0];case'P04':return 3.14*n[0]*n[1]/100;case'P05':return n[0]/2-n[1];
  case'A01':return Math.ceil(n[0]*n[1]/((n[2]/100)**2));case'A02':{const m=t.match(/paret fa (\d+) m d'ample i (\d+) m d'alt.*pot pinta (\d+) m²/);assert(m,'A02 parser');return Math.ceil((Number(m[1])*Number(m[2])-4)/Number(m[3]));}case'A03':return n[0]*n[1]-n[2]*n[3];case'A04':return n[0]/n[1];case'A05':return n[0]*n[1]/2*n[2];case'A06':return n[0]*n[1]-n[2]*n[3];case'A07':{const rect=n[0]*n[1],side=(n[0]+n[1])/2;return Math.abs(rect-side*side);}
  case'S01':{const m=t.match(/1 cm representa ([\d,]+) m reals?\. Una paret hi mesura (\d+) cm/);assert(m,'S01 parser');return Number(m[1].replace(',','.'))*Number(m[2]);}case'S02':{const m=t.match(/1 cm representa ([\d,]+) m reals?\. Una sala fa ([\d,]+) m/);assert(m,'S02 parser');return Number(m[2].replace(',','.'))/Number(m[1].replace(',','.'));}case'S03':{const m=t.match(/escala 1:([\d.]+).*separades (\d+) cm/);assert(m,'S03 parser');return Number(m[1].replace(/\./g,''))*Number(m[2])/100000;}case'S04':{const m=t.match(/1 cm representa ([\d,]+) m\. Una habitació hi fa (\d+) cm per (\d+) cm/);assert(m,'S04 parser');return Number(m[1].replace(',','.'))**2*Number(m[2])*Number(m[3]);}
  case'M03':return Math.abs(n[1]-n[0]);case'M04':return Math.round(Math.abs(n[1]-n[0])/n[0]*100);case'M05':{const m=t.match(/A té valor de referència (\d+) cm i error absolut ([\d,]+) cm\. La mesura B té valor de referència (\d+) cm i error absolut ([\d,]+) cm/);assert(m,'M05 parser');const a=Number(m[2].replace(',','.'))/Number(m[1]),b=Number(m[4].replace(',','.'))/Number(m[3]);return a<b?'la mesura A':b<a?'la mesura B':'les dues mesures';}
  case'I01':return (2*(n[0]+n[1])-1)*n[3];case'I02':return Math.ceil((2*(n[0]+n[1])*n[2]-n[3])/n[4]);case'I03':return n[0]*n[1]*n[2]+2*(n[0]+n[1])*n[3];case'I04':return 2*(n[0]+n[1])*n[2]/1000;case'I05':return Math.floor(n[0]*1000/n[1]);case'I06':return 2*(n[0]+n[1])*n[2]+n[0]*n[1]*n[3];
  case'R08':{const d=q.reasoningData,need=d.width*d.height-d.opening;let best=Infinity;for(let a=0;a<=Math.ceil(need/d.coverA);a++)for(let b=0;b<=Math.ceil(need/d.coverB);b++)if(a*d.coverA+b*d.coverB>=need)best=Math.min(best,a*d.costA+b*d.costB);return best;}
  default:return null;
 }
}
const counts={},coverage={};let checked=0;
for(let i=0;i<patterns.length;i++)for(let j=0;j<250;j++){
 random=seeded(0x70000+i*4099+j*101);const q=patterns[i](),id=String(q.type),family=familyById[id]||q.problemFamily||q.familyId;
 assert(q.question&&q.correct,`${id}: content`);assert.equal(new Set(q.options.map(String)).size,4,`${id}: four distinct distractors`);assert(q.options.map(String).includes(String(q.correct)),`${id}: answer option`);assert(q.guide?.length>=2&&q.solution?.length>=1,`${id}: hints and solution`);
 assert(family,`${id}: family association`);if(familyById[id])assert.equal(family,familyById[id],`${id}: expected shared/own family`);
 const ownFamily=q.problemFamily&&MIFirstMeasureTasks.problemFamilyInfo(q.problemFamily);const level=ownFamily?ownFamily.level:levelByFamily[id]||q.taskDifficulty;
 assert([1,2,3].includes(level),`${id}: classified level`);assert.equal(q.taskDifficulty,level,`${id}: internal family level`);assert.equal(D.getDifficulty(topics.find(t=>t.id==='problemes'),q),level,`${id}: shared classifier level`);
 const oracle=expected(q,id);if(oracle!==null){const got=id==='M05'?String(q.correct):id==='T05'?Number(String(q.correct).match(/-?\d+/)?.[0]):id.startsWith('T')?timeMinutes(q.correct):Number(String(q.correct).match(/-?\d+(?:[,.]\d+)?/)?.[0]?.replace(',','.'));if(typeof oracle==='string')assert.equal(String(q.correct).toLocaleLowerCase('ca'),oracle.toLocaleLowerCase('ca'),`${id} independent oracle`);else assert(Math.abs(got-oracle)<1e-6,`${id} independent oracle expected ${oracle}, got ${got}`);}
 counts[id]=(counts[id]||0)+1;coverage[family]=(coverage[family]||0)+1;checked++;
}
const ids=Object.keys(familyById);assert.deepEqual(ids.sort(),Object.keys(counts).filter(x=>x!=='R01'&&x!=='R02'&&x!=='R03'&&x!=='R04'&&x!=='R05'&&x!=='R06'&&x!=='R07'&&x!=='R08').sort(),'all 38 raw IDs are tested');
for(const id of ['C02','C03','C06','I05','C05','I03','I04','I06','R08'])assert.equal(counts[id],250,`${id}: 250 samples`);
for(const family of ['repartir-quantitat-amb-conversio','restar-mesures-mateixa-unitat','cost-combinat-area-perimetre','compra-pintura-combinada'])assert(coverage[family]>=250,`${family}: covered`);
console.log(JSON.stringify({ok:true,rawPatterns:38,reasoningPatterns:8,samples:checked,samplesPerPattern:250,families:Object.keys(coverage).length,counts,coverage},null,2));
