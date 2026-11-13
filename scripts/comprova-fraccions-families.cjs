const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
globalThis.window=globalThis;
vm.runInThisContext(fs.readFileSync('assets/js/raonament-numeric-1eso.js','utf8'),{filename:'raonament-numeric-1eso.js'});
vm.runInThisContext(fs.readFileSync('assets/js/fraccions-1eso.js','utf8'),{filename:'fraccions-1eso.js'});
const M=globalThis.MIFraccions;
const specs=M.familySpecs;
assert.equal(specs.length,19,'Nombre de famílies');
assert.deepEqual([1,2,3].map(n=>specs.filter(f=>f.level===n).length),[9,9,1]);
assert.deepEqual(M.families.map(g=>g.length),[9,9,1]);
const ids=specs.flatMap(f=>f.generators);
assert.equal(new Set(ids).size,23,'Tots els generadors classificats exactament una vegada');
assert.deepEqual(ids.slice().sort(),Array.from({length:23},(_,i)=>'F'+String(i+1).padStart(2,'0')).sort());
function gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b)[a,b]=[b,a%b];return a||1;}
function rat(n,d=1){if(d<0){n=-n;d=-d;}const g=gcd(n,d);return `${n/g}/${d/g}`;}
function parse(s){const m=String(s).trim().match(/^([+-]?\d+)\s*\/\s*([+-]?\d+)$/);assert(m,`Fracció esperada: ${s}`);return rat(Number(m[1]),Number(m[2]));}
function decimal(s){return rat(Number(String(s).replace(',','.'))*10**((String(s).split(/[,.]/)[1]||'').length),10**((String(s).split(/[,.]/)[1]||'').length));}
function percent(s){return rat(Number(String(s).replace('%','').replace(',','.'))*10**((String(s).split(/[,.]/)[1]||'').length),100*10**((String(s).split(/[,.]/)[1]||'').length));}
let seed=917331,checked=0;
function random(a,b){seed=(seed*1664525+1013904223)>>>0;return a+Math.floor(seed/4294967296*(b-a+1));}
function expected(q,id){const data=q.fractionsData,[a=0,b=1,c=0,d=1,k=1]=Array.isArray(data)?data:[],variant=id==='F21'?data[4]:data?.[5]||0,total=b*d*k;switch(id){
 case'F01':return rat(a,b);
 case'F02':return rat(a*d+c*b,b*d);
 case'F03':return rat(a*c,b*d);
 case'F04':return rat(a*d,b*c);
 case'F05':return a*d===c*b?'=':a*d>c*b?'>':'<';
 case'F06':return q.fractionsData[0];
 case'F07':return String(total*(b-a)/b);
 case'F08':return a<b?'Pròpia':'Impròpia';
 case'F09':return String(total*a/b);
 case'F10':return [decimal(q.fractionsAnswer.fields[0].value),percent(q.fractionsAnswer.fields[1].value)];
 case'F11':return [rat(a*d+c*b,b*d),String(total*(a*d+c*b)/(b*d))];
 case'F12':return [rat(a*c,b*d),String(a*c*k)];
 case'F13':return String((b-a)*(d-c)*k);
 case'F14':return String(b*k);
 case'F15':return [rat(b-a-c,b),String(total*(b-a-c)/b)];
 case'F16':return [a*d>c*b?'Laia':'Marc',rat(Math.abs(a*d-c*b),b*d)];
 case'F17':{const x=data;const remaining=x.left+x.reserve;return String(remaining/(x.d-x.c)*x.d/(x.b-x.a)*x.b);}
 case'F18':return rat(a,b);
 case'F19':return [String(Math.floor(a/b)),rat(a%b,b)];
 case'F20':return String(a*c);
 case'F21':{const reasons=['Ha sumat els denominadors com si fossin numeradors.','Ha dividit només el numerador en simplificar.','Ha canviat el denominador sense transformar els numeradors.'];return reasons[variant];}
 case'F22':return rat(c,d);
 case'F23':return rat(a,b);
 default:throw Error(id);
}}
for(const spec of specs)for(const id of spec.generators){
 for(let sample=0;sample<250;sample++){
  const q=M.generate(id,random);
  assert.equal(q.familyId,spec.id,`${id}: família`);assert.equal(q.fractionsFamily,spec.id,`${id}: compatibilitat família`);
  assert.equal(q.variantId,id,`${id}: ruta`);assert.equal(q.diff,spec.level,`${id}: nivell`);assert.equal(q.taskDifficulty,spec.level,`${id}: nivell intern`);
  assert(q.fractionsTheory&&M.anchors.includes(q.fractionsTheory),`${id}: ancoratge teoria`);
  assert.equal(q.options.length,4,`${id}: quatre opcions`);
  const canonical=v=>String(v).split(';').map(x=>{try{return parse(x);}catch{return x.trim();}}).join(';');
  assert.equal(new Set(q.options.map(canonical)).size,4,`${id}: distractors diferents`);
  assert.equal(q.options.filter(v=>M.matches(q.fractionsAnswer,v)).length,1,`${id}: una única opció correcta`);
  const oracle=expected(q,id);
  if(Array.isArray(oracle)){
   const got=q.fractionsAnswer.kind==='fields'?q.fractionsAnswer.fields.map(f=>f.value):[];
   assert.equal(got.length,oracle.length,`${id}: camps`);
   for(let i=0;i<oracle.length;i++){
    const actual=got[i],kind=q.fractionsAnswer.fields[i].kind;
    if(kind==='decimal')assert.equal(decimal(actual),oracle[i],`${id}: decimal exacte`);
    else if(kind==='percent')assert.equal(percent(actual),oracle[i],`${id}: percentatge exacte`);
    else if(kind==='rational')assert.equal(parse(actual),oracle[i],`${id}: fracció exacta camp ${i}`);
    else assert.equal(String(actual),String(oracle[i]),`${id}: camp ${i} ${JSON.stringify({data:q.fractionsData,question:q.question,got,oracle})}`);
   }
  } else if(q.fractionsAnswer.kind==='rational')assert.equal(parse(q.correct),oracle,`${id}: fracció oracle`);
  else if(q.fractionsAnswer.kind==='integer')assert.equal(String(q.correct),String(oracle),`${id}: enter oracle`);
  else assert.equal(q.correct,oracle,`${id}: resposta oracle`);
  if(id==='F01')assert.equal(gcd(...q.correct.split('/').map(Number)),1,'F01 irreductible');
  if(id==='F06')assert.equal(parse(q.correct),oracle,'F06 equivalència');
  if(id==='F18'){assert.match(q.question,/aria-label="Una unitat dividida en \d+ parts iguals; \d+ pintades"/,'F18 gràfic etiquetat');}
  if(id==='F23'){assert.equal(q.fractionsAnswer.denominator,q.fractionsData[1],'F23 denominador fixat');assert(/únic numerador/i.test(q.solution[1]),'F23 unicitat');}
  if(id==='F17')assert(Number.isInteger(Number(q.correct))&&Number(q.correct)>0,'F17 reconstrucció entera positiva');
  checked++;
 }
}
assert.equal(checked,5750);
assert.equal(M.levelFor('F02'),2);assert.equal(M.familyInfo('equivalencia-fraccions').generators.length,3);
assert(!M.matches({kind:'rational',value:'1/2'},'1/0'));
assert(!M.matches({kind:'rational',value:'1/2',irreducible:true},'2/4'));
assert(M.matches({kind:'rational',value:'1/2'},'-2/-4'));
assert(M.matches({kind:'rational',value:'3/8',denominator:8},'6/16')===false);
console.log(JSON.stringify({families:specs.length,levels:[9,9,1],generatorRoutes:ids.length,samples:checked,checks:'independent exact-rational oracles, options, metadata, constraints, F17 reconstruction'},null,2));
