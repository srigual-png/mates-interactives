const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
const root=require('path').resolve(__dirname,'..');
const ctx=vm.createContext({console});
for(const name of ['raonament-numeric-1eso.js','decimals-1eso.js'])vm.runInContext(fs.readFileSync(root+'/assets/js/'+name,'utf8'),ctx);
const M=ctx.MIDecimals;
for(const [x,y] of [['1,005','1,01'],['9,995','10,00'],['7,386','7,39'],['9,999','10,00']])assert.equal(M.round(x,2),y);
assert.equal(JSON.stringify(M.remainder(132,22)),JSON.stringify({q:6,r:0}));assert.equal(JSON.stringify(M.remainder(217,27)),JSON.stringify({q:8,r:1}));
const scalar=(value,extra={})=>({kind:'fields',fields:[{value,...extra}]});
for(const s of ['0,5','0.50','0,500'])assert(M.matches(scalar('0,5'),s));
assert(M.matches(scalar('6,525'),'6.525'));assert(!M.matches(scalar('6,53',{precision:2}),'6,525'));
assert(M.matches(scalar('6,53',{precision:2}),'6,53'));assert(!M.matches(scalar('6,53',{precision:2}),'6,530'));
assert(M.matches({kind:'fraction',n:1,d:4},'1/4'));assert(!M.matches({kind:'fraction',n:1,d:4},'25/100'));
const between={kind:'between',lo:120,hi:130,p:2};for(const s of ['1,21','1,29'])assert(M.matches(between,s));for(const s of ['1,20','1,30','1,225'])assert(!M.matches(between,s));
const fixed=(...draws)=>(a,b)=>{const v=draws.length?draws.shift():a;assert(v>=a&&v<=b,`Draw ${v} in ${a}..${b}`);return v;};
const examples=[['D14',[3,7,0,4],'0,07'],['D15',[2,1],'2,09 < 2,109 < 2,9'],['D16',[12,3],'1,23'],['D17',[2,5,2,17],'3,32'],['D18',[6,70],'7'],['D19',[37,2,0],'37'],['D21',[2,6,4],'6'],['D23',[4,2],'Entre 7 i 9']];
for(const [id,draws,answer] of examples){const q=M.generate(id,fixed(...draws));assert(M.matches(q.decimalsAnswer,answer),id+' reference');}
const diagnosis=M.generate('D22',fixed(37,0));assert(diagnosis.correct.endsWith('; 37'));assert(!M.matches(diagnosis.decimalsAnswer,diagnosis.correct.replace('; 37','; 3,7')));
for(const [notes,mode,result] of [[[67,96,53,45],0,'6,525'],[[67,96,53,45],1,'6,53']])assert(M.matches(M.generate('D12',fixed(...notes,mode)).decimalsAnswer,result));
for(const [length,piece,answer] of [[132,22,'6; 0'],[217,27,'8; 0,1']]){const q=M.generate('D11',fixed(length,piece));assert(M.matches(q.decimalsAnswer,answer));assert(!M.matches(q.decimalsAnswer,answer+'; 0'));assert(!M.matches(q.decimalsAnswer,'6.5; 0'));}
let seed=17;const random=(a,b)=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return a+Math.floor(seed/2**32*(b-a+1));};
const theory=fs.readFileSync(root+'/1eso/teoria/numeric/nombres-decimals-1r-eso.html','utf8');
for(const group of M.families)for(const [id] of group)for(let i=0;i<200;i++){
 const q=M.generate(id,random);assert(M.matches(q.decimalsAnswer,q.correct),id+' own answer '+q.correct);assert.equal(q.options.length,4,id+' four choices');assert.equal(q.options.filter(v=>M.matches(q.decimalsAnswer,v)).length,1,id+' unique answer');
 assert(theory.includes('id="'+q.decimalsTheory+'"'),id+' theory');
 if(id==='D11'){const [a,b]=JSON.parse(q.practiceKey.slice(4));const result=M.remainder(a,b);assert.equal(a,b*result.q+result.r);assert(result.r>=0&&result.r<b);assert(!M.matches(q.decimalsAnswer,['1.5','0']));assert(!M.matches(q.decimalsAnswer,q.correct+'; 99'));}
 if(id==='D17')assert(M.parse(q.correct).n>=0);
}
console.log('OK: P0, precisió, formats, intervals, 4.600 exercicis, opcions i ancoratges.');
