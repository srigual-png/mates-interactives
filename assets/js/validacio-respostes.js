/* Shared open-answer validation. No user input is executed. See docs/validacio-respostes.md. */
(function(root){
'use strict';
const abs=n=>n<0n?-n:n;
function gcd(a,b){a=abs(a);b=abs(b);while(b){const r=a%b;a=b;b=r;}return a||1n;}
function R(n,d=1n){if(!d)throw Error('zero');if(d<0n){n=-n;d=-d;}const g=gcd(n,d);return [n/g,d/g];}
const add=(a,b)=>R(a[0]*b[1]+b[0]*a[1],a[1]*b[1]), mul=(a,b)=>R(a[0]*b[0],a[1]*b[1]), neg=a=>[-a[0],a[1]], div=(a,b)=>R(a[0]*b[1],a[1]*b[0]);
const eq=(a,b)=>a[0]===b[0]&&a[1]===b[1], ONE=R(1n), ZERO=R(0n);
function decimal(s){const m=s.match(/^(\d*(?:\.\d*)?)(?:[eE]([+-]?\d+))?$/);if(!m||!m[1]||m[1]==='.')throw Error('number');const e=Number(m[2]||0);if(Math.abs(e)>100)throw Error('limit');const p=m[1].split('.'),digits=(p[0]||'0')+(p[1]||'');let n=BigInt(digits),d=10n**BigInt((p[1]||'').length);if(e>=0)n*=10n**BigInt(e);else d*=10n**BigInt(-e);return R(n,d);}
function clean(s,trusted=false){s=String(s??'');if(trusted)s=s.replace(/<sup>(.*?)<\/sup>/gi,'^($1)').replace(/<[^>]*>/g,'').replace(/&nbsp;/g,' ').replace(/&minus;/g,'-').replace(/&times;/g,'*').replace(/&middot;/g,'·');return s.replace(/[−–—]/g,'-').replace(/[×·⋅]/g,'*').replace(/[÷]/g,'/').replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]+/g,m=>'^'+[...m].map(c=>'⁰¹²³⁴⁵⁶⁷⁸⁹'.indexOf(c)).join('')).trim();}
const constant=r=>new Map(r[0]?[['',r]]:[]), unit=()=>constant(ONE);
function padd(a,b){const c=new Map(a);for(const [k,v] of b){const r=add(c.get(k)||ZERO,v);if(r[0])c.set(k,r);else c.delete(k);}return c;}
function pneg(a){return new Map([...a].map(([k,v])=>[k,neg(v)]));}
function pmul(a,b){const c=new Map();if(a.size*b.size>3000)throw Error('limit');for(const [k,v] of a)for(const [l,w] of b){const key=[...k,...l].sort().join('');if(key.length>32)throw Error('limit');const r=add(c.get(key)||ZERO,mul(v,w));if(r[0])c.set(key,r);else c.delete(key);}if(c.size>300)throw Error('limit');return c;}
function peq(a,b){return a.size===b.size&&[...a].every(([k,v])=>b.has(k)&&eq(v,b.get(k)));}
function pkey(p){if(!p.size)return '0';const xs=[...p].sort(([a],[b])=>a.localeCompare(b)),f=xs[0][1];return xs.map(([k,v])=>{const r=div(v,f);return k+':'+r.join('/');}).join('|');}
const cv=p=>p.size===0?ZERO:p.size===1&&p.has('')?p.get(''):null;
function node(n,d=unit(),restrictions=[] ,ast={op:'atom'}){return {n,d,restrictions,ast};}
function calc(op,a,b){let n,d,rs=[...a.restrictions,...b.restrictions];if(op==='+ ' )op='+';
 if(op==='+'){n=padd(pmul(a.n,b.d),pmul(b.n,a.d));d=pmul(a.d,b.d);}
 if(op==='-'){n=padd(pmul(a.n,b.d),pneg(pmul(b.n,a.d)));d=pmul(a.d,b.d);}
 if(op==='*'){n=pmul(a.n,b.n);d=pmul(a.d,b.d);}
 if(op==='/'){if(!b.n.size)throw Error('zero');n=pmul(a.n,b.d);d=pmul(a.d,b.n);if(cv(b.n)===null)rs.push(pkey(b.n));}
 return node(n,d,rs,{op,a:a.ast,b:b.ast});
}
function parse(s){s=clean(s);if(!s||s.length>500||/[<>"'`\\\[\]{};=_%]/.test(s))throw Error('syntax');if(/\d\s+\d/.test(s))throw Error('separator');s=s.replace(/,/g,'.');let ts=s.match(/\d+(?:\.\d*)?(?:[eE][+-]?\d+)?|\.\d+(?:[eE][+-]?\d+)?|[a-zA-Zπ]|[()+*/^%-]/g)||[];if(ts.join('')!==s.replace(/\s/g,'')||ts.length>160)throw Error('syntax');let i=0,depth=0;
 function atom(){if(++depth>40)throw Error('limit');const t=ts[i++];let v;if(t==='('){v=sum();if(ts[i++]!==')')throw Error('parenthesis');}else if(t&&/^\d|^\./.test(t))v=node(constant(decimal(t)),unit(),[],{op:'number',r:decimal(t)});else if(t&&/^[abcntpxyzABCNTPXYZπ]$/.test(t))v=node(new Map([[t,ONE]]),unit(),[],{op:'variable',name:t});else throw Error('atom');depth--;return v;}
 function power(){let a=atom();if(ts[i]==='^'){i++;const b=unary(),r=value(b);if(!r||r[1]!==1n||abs(r[0])>12n)throw Error('exponent');const k=Number(r[0]);let out=node(unit());for(let j=0;j<Math.abs(k);j++)out=calc('*',out,a);if(k<0)out=calc('/',node(unit()),out);out.restrictions.push(...a.restrictions);out.ast={op:'^',a:a.ast,k};a=out;}return a;}
 function unary(){if(ts[i]==='+'){i++;return unary();}if(ts[i]==='-'){i++;const a=unary();return node(pneg(a.n),a.d,a.restrictions,{op:'neg',a:a.ast});}return power();}
 function product(){let a=unary();while(i<ts.length){let op=ts[i];if(op==='*'||op==='/'){i++;a=calc(op,a,unary());}else if(op==='('||/^[a-zA-Zπ]$/.test(op))a=calc('*',a,unary());else break;}return a;}
 function sum(){let a=product();while(ts[i]==='+'||ts[i]==='-'){const op=ts[i++];a=calc(op,a,product());}return a;}
 const out=sum();if(i!==ts.length)throw Error('trailing');return out;
}
function value(a){const n=cv(a.n),d=cv(a.d);return n&&d?div(n,d):null;}
function equivalent(a,b,policy={}){const allowed=new Set((policy.nonzero||[]).map(x=>{try{return pkey(parse(x).n);}catch{return '';}}));const dom=x=>[...new Set(x.restrictions)].filter(k=>!allowed.has(k)).sort().join(';');return dom(a)===dom(b)&&peq(pmul(a.n,b.d),pmul(b.n,a.d));}
const units={'%':{dimension:'ratio',factor:R(1n,100n)}};
function unitsAdd(names,dimension,factor){for(const name of names.split('|'))units[name]={dimension,factor:decimal(factor)};}
for(const [u,f] of [['mm','0.001'],['cm','0.01'],['dm','0.1'],['m','1'],['dam','10'],['hm','100'],['km','1000']]){unitsAdd(u,'length',f);for(const p of [2,3]){let r=ONE;for(let j=0;j<p;j++)r=mul(r,decimal(f));units[u+'^'+p]={dimension:p===2?'area':'volume',factor:r};}}
unitsAdd('ml|mL','volume','0.000001');unitsAdd('cl|cL','volume','0.00001');unitsAdd('dl|dL','volume','0.0001');unitsAdd('l|L','volume','0.001');unitsAdd('kg','mass','1');unitsAdd('g','mass','0.001');unitsAdd('mg','mass','0.000001');unitsAdd('t','mass','1000');unitsAdd('s|segons|segon','time','1');unitsAdd('min|minuts|minut','time','60');unitsAdd('h|hores|hora','time','3600');unitsAdd('°|graus|grau','angle','1');unitsAdd('rad','radian','1');unitsAdd('€|euros|euro','money','1');
for(const u of ['unitats','alumnes','persones','pots','cubs','peces','entrades','bacteris'])unitsAdd(u,'count:'+u,'1');
function quantity(s){s=clean(s);const m=s.match(/^(.*?)\s*(%|[a-zA-Z€°]+(?:\^[23])?)$/);if(m&&(m[2]==='%'||units[m[2]])){const a=parse(m[1]),v=value(a);if(!v)throw Error('quantity');return {a,v,u:m[2],info:m[2]==='%'?{dimension:'ratio',factor:R(1n,100n)}:units[m[2]]};}const a=parse(s);return {a,v:value(a),u:null,info:null};}
const messages={wrong:'La resposta no és matemàticament correcta.',invalid:'No podem interpretar la resposta. Revisa els nombres, els signes i els parèntesis.',form:'El valor és correcte, però cal respectar la forma demanada.',unit:'Revisa la unitat de la resposta.',missingUnit:'Cal escriure la unitat de la resposta.',precision:'L’aproximació no té la precisió demanada.'};
function result(ok,code='wrong',message){return {ok,code:ok?'correct':code,message:ok?'Correcte!':message||messages[code]};}
function policyFor(ex={}){const q=clean(ex.question||'',true).toLowerCase(),p={...(ex.validation||{})};
 // In ordinary x-polynomials, keyboard X denotes x. Keep case when the exercise uses both symbols.
 const reference=clean(ex.correct??ex.answer?.val??'',true);
 const symbols=clean(String(ex.question||'').replace(/<svg\b[\s\S]*?<\/svg>/gi,''),true)+' '+reference;
 if(p.caseSensitiveVariables!==true&&p.variableAliases===undefined&&/x/.test(reference)&&!/X/.test(symbols))p.variableAliases={X:'x'};
 if(!p.fieldUnit&&/percentatge|percentual/.test(q)&&/%$/.test(clean(ex.correct??ex.answer?.val??'',true)))p.fieldUnit='%';
 if(!p.form){if(/fracció irreductible|fracció simplificada|fracció generatriu|simplifica.{0,25}fracció/.test(q))p.form='irreducible';else if(/(?:expressa|escriu|converteix).{0,65}(?:com (?:a |una )?fracció|en forma de fracció)/.test(q))p.form='fraction';else if(/factoritza/.test(q))p.form='factorized';else if(/desenvolupa|expandeix/.test(q))p.form='expanded';else if(/simplifica|redueix (?:els )?termes/.test(q))p.form='simplified';else if(/(?:expressa|escriu|converteix).{0,65}(?:en (?:forma |nombre )?decimal|a decimal)/.test(q))p.form='decimal';else if(/notació científica/.test(q))p.form='scientific';else if(/(?:expressa|escriu|converteix).{0,65}(?:en|com a) percentatge/.test(q))p.form='percent';}
 if(p.decimals===undefined){const m=q.match(/(?:a|amb|fins a)\s+(\d+|dues|dos|tres|una|un)\s+(?:xifres?\s+)?decimals?/);if(m){p.decimals=({dues:2,dos:2,tres:3,una:1,un:1})[m[1]]||Number(m[1]);p.precision='rounded';if(/si cal/.test(q))p.decimalFormat='optionalZeros';}}
 if(!p.type){if(ex.allowPairEquivalent)p.type='tuple';else if(/\bordena\b|de menor a major|de major a menor/.test(q))p.type='sequence';else if(/(?:les|totes les|dues) solucions|(?:les|dues) arrels/.test(q)&&/equació|polinomi/.test(q))p.type='set';}
 if(!p.unit){const m=q.match(/(?:expressa.{0,35}?en|respon en|en)\s+(centímetres|mil·límetres|quilòmetres|metres|cm(?:\^[23])?|mm|km|m(?:\^[23])?)(?=\s|[.,;:?!)]|$)/);if(m)p.unit=({centímetres:'cm','mil·límetres':'mm','quilòmetres':'km',metres:'m'})[m[1]]||m[1];}
 return p;
}
function hasAdd(ast){return ast&&(ast.op==='+'||ast.op==='-'||hasAdd(ast.a)||hasAdd(ast.b));}
function formCheck(input,a,p){let text=clean(input);const suffix=text.match(/^(.*?)\s*([a-zA-Z€°]+(?:\^[23])?)$/);if(suffix&&units[suffix[2]])text=suffix[1];const s=text.replace(/\s/g,''),v=value(a),fraction=s.match(/^([+-]?\d+)\/\(?([+-]?\d+)\)?$/);let ok=true,msg;
 switch(p.form){case 'fraction':case 'irreducible':ok=!!fraction;if(ok&&p.form==='irreducible')ok=BigInt(fraction[2])>0n&&gcd(BigInt(fraction[1]),BigInt(fraction[2]))===1n;msg=p.form==='irreducible'?'El valor és correcte, però cal expressar-lo com a fracció irreductible.':'El valor és correcte, però cal expressar-lo com a fracció.';break;
 case 'decimal':ok=/^[+-]?\d+(?:[.,]\d+)?$/.test(s);break;
 case 'percent':ok=/%$/.test(s);break;
 case 'scientific':ok=/^[+-]?[1-9](?:[.,]\d+)?(?:[eE][+-]?\d+|\*10\^\(?[+-]?\d+\)?)$/.test(s);break;
 case 'expanded':case 'simplified':ok=!hasNestedSum(a.ast)&&!trivialFactor(a.ast);if(ok&&p.form==='simplified')ok=termCount(a.ast)===a.n.size&&cv(a.d)!==null;msg='El valor és correcte, però cal '+(p.form==='expanded'?'desenvolupar':'simplificar')+' l’expressió.';break;
 case 'factorized':ok=(a.ast.op==='*'||a.ast.op==='^'&&a.ast.k>1)&&hasAdd(a.ast)&&!trivialFactor(a.ast);msg='El valor és correcte, però cal factoritzar l’expressió.';break;}
 if(!ok)return result(false,'form',msg);
 if(p.decimals!==undefined&&p.decimalFormat==='optionalZeros'){const match=s.match(/^[+-]?\d+(?:[.,](\d+))?$/);if(!match||(match[1]||'').length>p.decimals)return result(false,'form');}
 if(p.decimals!==undefined&&p.decimalFormat!=='optionalZeros'){const m=s.match(/^[+-]?\d+[.,](\d+)$/);if(p.decimals===0?!/^[+-]?\d+$/.test(s):!m||m[1].length!==p.decimals)return result(false,'form','El valor és correcte, però cal escriure '+p.decimals+' xifres decimals.');}
 if(p.significantFigures){const ds=s.replace(/^[+-]/,'').split(/[eE]/)[0].replace(/[.,]/,'').replace(/^0+/,'');if(ds.length!==p.significantFigures)return result(false,'form');}
 return null;
}
function trivialFactor(ast){if(!ast)return false;if(ast.op==='*'){for(const child of [ast.a,ast.b])if(child.op==='number'&&abs(child.r[0])===child.r[1])return true;}return trivialFactor(ast.a)||trivialFactor(ast.b);}
function hasNestedSum(ast){if(!ast)return false;if(['*','/','^'].includes(ast.op)&&hasAdd(ast.a))return true;if(['*','/'].includes(ast.op)&&hasAdd(ast.b))return true;return hasNestedSum(ast.a)||hasNestedSum(ast.b);}
function termCount(ast){return ast.op==='+'||ast.op==='-'?termCount(ast.a)+termCount(ast.b):1;}
function rounded(r,d){const f=10n**BigInt(d),n=abs(r[0])*f,q=n/r[1],rem=n%r[1];return R((r[0]<0n?-1n:1n)*(q+(rem*2n>=r[1]?1n:0n)),f);}
function parts(s,type){s=clean(s,true);if(type==='system'){const out={};for(const part of s.split(/[;,]/)){const m=part.trim().match(/^([a-zA-Z])\s*=\s*(.+)$/);if(!m||out[m[1]]!==undefined)throw Error('system');out[m[1]]=m[2];}return out;}
 if(type==='sequence'&&/[<>]/.test(s))return s.split(/\s*[<>]\s*/).map(x=>x.trim());
 if(type==='tuple'||type==='sequence')s=s.replace(/^\(/,'').replace(/\)$/,'');else s=s.replace(/^\{/,'').replace(/\}$/,'');
 if(/\s[oi]\s/.test(s))return s.split(/\s[oi]\s/).map(x=>x.replace(/^[a-zA-Z]\s*=\s*/,''));
 const sep=s.includes(';')?';':',';return s.split(sep).map(x=>x.trim().replace(/^[a-zA-Z]\s*=\s*/,''));}
function equationParts(s){const xs=clean(s,true).split('=');if(xs.length!==2)throw Error('equation');return calc('-',parse(xs[0]),parse(xs[1]));}
function equationCompare(input,target,p){let b;try{b=equationParts(target);}catch{return null;}try{const a=equationParts(input);const ad=[...new Set(a.restrictions)].sort().join(';'),bd=[...new Set(b.restrictions)].sort().join(';');return result(ad===bd&&pkey(a.n)===pkey(b.n));}catch{return result(false,'invalid');}}
function dms(s){s=clean(s,true);const m=s.match(/^([+-]?\d+(?:[.,]\d+)?)\s*[°º](?:\s*(\d+)\s*['′](?:\s*(\d+(?:[.,]\d+)?)\s*["″])?)?$/);if(!m)return null;const minutes=Number(m[2]||0),seconds=Number((m[3]||'0').replace(',','.'));if(minutes>=60||seconds>=60)return null;const sign=m[1].startsWith('-')?-1:1;return sign*(Math.abs(Number(m[1].replace(',','.')))+minutes/60+seconds/3600);}
function compare(input,target,p={}){if(/[′″]/.test(clean(target,true))){const b=dms(target),a=dms(input);if(b!==null)return a===null?result(false,'invalid'):result(Math.abs(a-b)<1e-12);}
 if(/π|\bpi\b/.test(clean(target,true))){const normalize=x=>clean(x,true).replace(/\s*(?:radians?|rad)\s*$/,'').replace(/π|\bpi\b/g,'π');try{const b=parse(normalize(target));try{return result(equivalent(parse(normalize(input)),b));}catch{return result(false,'invalid');}}catch{return null;}}
if(p.type==='equation')return equationCompare(input,target,p);let a,b;try{b=quantity(clean(target,true));}catch{return null;}try{a=quantity(input);}catch{return result(false,'invalid');}
 if(a.info||b.info||p.unit){const expected=p.unit||b.u,ui=p.unit?units[p.unit]:null;if(a.u&&b.u&&a.info.dimension!==b.info.dimension)return result(false,'unit');if((p.unitRequired||p.unitMode==='required')&&!a.u)return result(false,'missingUnit');const requestedUnit=p.unit||p.fieldUnit;if(a.u&&requestedUnit&&requestedUnit!=='%'&&a.u!==requestedUnit)return result(false,'unit','El valor pot ser equivalent, però cal expressar-lo en '+requestedUnit+'.');if(!a.v||!b.v)return result(false,'invalid');if(a.u&&!b.u&&!ui&&!p.fieldUnit&&a.u!=='%')return result(false,'unit');const ai=a.info||(p.fieldUnit?units[p.fieldUnit]:ui)||(b.u==='%'?null:b.info),bi=b.info||ui||(p.fieldUnit?units[p.fieldUnit]:null);if(ai&&bi&&ai.dimension!==bi.dimension)return result(false,'unit');let av=ai?mul(a.v,ai.factor):a.v,bv=bi?mul(b.v,bi.factor):b.v;if(!eq(av,bv)){const roundedTarget=p.precision==='rounded'&&Number.isInteger(p.decimals)?rounded(b.v,p.decimals):null;if(!roundedTarget||!eq(av,bi?mul(roundedTarget,bi.factor):roundedTarget))return result(false,p.precision==='rounded'?'precision':'wrong');}return formCheck(input,a.a,p)||result(true);}
 let equal=equivalent(a.a,b.a,p);if(!equal&&a.v&&b.v){if(p.precision==='rounded'&&Number.isInteger(p.decimals)&&p.decimals>=0&&p.decimals<=12)equal=eq(a.v,rounded(b.v,p.decimals));else if(typeof p.tolerance==='number'&&p.tolerance>=0)equal=Math.abs(Number(a.v[0])/Number(a.v[1])-Number(b.v[0])/Number(b.v[1]))<=p.tolerance;}
 if(!equal)return result(false,p.precision==='rounded'?'precision':'wrong');return formCheck(input,a.a,p)||result(true);
}
function normalizeVariableAliases(input,p){if(p.caseSensitiveVariables||!p.variableAliases)return String(input??'');return String(input??'').replace(/[A-Za-z]/g,c=>{const alias=p.variableAliases[c];return typeof alias==='string'&&/^[A-Za-z]$/.test(alias)?alias:c;});}
function validate(ex,input){const raw=String(input??'').trim();if(raw.length>500||/[`\\]|<\/?[a-z!]|\b(?:NaN|Infinity|eval|Function|alert|window|document)\b/.test(raw))return result(false,'invalid');ex=ex||{};const p=policyFor(ex);input=normalizeVariableAliases(input,p);const targets=[ex.correct??ex.answer?.val,...(ex.alts||[])].filter(x=>x!==undefined);let last=null,supported=false;const canonical=clean(targets[0]??'',true).replace(/^(?:a[ₙ_n]+|[a-zA-Z]\([a-zA-Z]\))\s*=\s*/,'');if(!p.type){if(canonical.includes('=')&&!/^[a-zA-Z]\s*=/.test(canonical))p.type='equation';if(/^\{.*\}$/.test(canonical)||/x\s*=.*\s[oi]\s.*x\s*=/.test(canonical))p.type='set';else if(/^[a-zA-Z]\s*=.+[,;]\s*[a-zA-Z]\s*=/.test(canonical))p.type='system';else if(/^\([^()]*[,;][^()]*\)$/.test(canonical)&&!/[∞]/.test(canonical))p.type='tuple';else if(/^[-+]?\d+(?:\.\d+)?(?:\s*,\s*[-+]?\d+(?:\.\d+)?){2,}$/.test(canonical))p.type='sequence';}
 if(p.type==='set'||p.type==='tuple'||p.type==='sequence'||p.type==='system'){for(const t of targets){try{let a=parts(input,p.type),b=parts(t,p.type);if(p.type==='system'){const ka=Object.keys(a).sort(),kb=Object.keys(b).sort();if(ka.join()!==kb.join())return result(false);a=ka.map(k=>a[k]);b=kb.map(k=>b[k]);}if(b.length<1)continue;supported=true;if(p.type==='sequence'&&(String(input).match(/[<>]/g)||[]).join('')!==(String(t).match(/[<>]/g)||[]).join('')){last=result(false);continue;}if(a.length!==b.length){last=result(false);continue;}let ok;if(p.type==='set'){const remaining=b.slice();ok=a.every(x=>{const j=remaining.findIndex(y=>compare(x,y,{})?.ok);if(j<0)return false;remaining.splice(j,1);return true;});}else ok=a.every((x,i)=>compare(x,b[i],{})?.ok);if(ok)return result(true);last=result(false);}catch{last=result(false,'invalid');}}if(supported)return last;}
 if(/^[\d\s.,+*/^()=−–—-]+$/.test(raw)){try{for(const side of clean(raw).split('='))parse(side);}catch{return result(false,'invalid');}}
 for(const t of targets){let target=clean(t,true),got=String(input).trim();const label=target.match(/^(?:a[ₙ_n]+|[a-zA-Z]\([a-zA-Z]\))\s*=\s*/);if(label){if(got.startsWith(label[0].split('=')[0].trim()))got=got.replace(/^(?:a[ₙ_n]+|[a-zA-Z]\([a-zA-Z]\))\s*=\s*/,'');target=target.slice(label[0].length);}if(/^[a-zA-Z]\s*=/.test(target)&&!p.type){const variable=target.match(/^([a-zA-Z])\s*=/)[1];if(new RegExp('^'+variable+'\\s*=').test(got))got=got.replace(/^[a-zA-Z]\s*=\s*/,'');target=target.replace(/^[a-zA-Z]\s*=\s*/,'');}else if(/^[a-zA-Z]\s*=/.test(got)&&!target.includes('=')&&!p.type)got=got.replace(/^x\s*=\s*/,'');
 const r=compare(got,target,p);if(!r&&clean(got).replace(/\s/g,'')===clean(target).replace(/\s/g,''))return result(true);if(r){supported=true;if(r.ok)return r;last=r;}}
 return supported?last:null;
}
let lastFeedback=null;
function grade(ex,input,legacy){const r=validate(ex,input);lastFeedback=r;if(r)return r.ok;if(/[`"\\]|<\/?[a-z!]|\b(?:NaN|Infinity|eval|Function|alert|window|document)\b/.test(String(input)))return false;return legacy?!!legacy():clean(input)===clean(ex.correct,true);}
function symbolicEqual(a,b,p){try{return equivalent(parse(clean(a,true)),parse(clean(b,true)),p);}catch{return false;}}
function numericValue(s,bindings={}){try{for(const [k,v] of Object.entries(bindings)){if(!/^[a-zA-Z]$/.test(k)||!Number.isFinite(v))return null;s=String(s).replace(new RegExp(k,'g'),'('+v+')');}const r=value(parse(s));return r?Number(r[0])/Number(r[1]):null;}catch{return null;}}
function inputLocked(doc,name){const ids=name==='checkOpenProblem'?['openFinal']:['examOpenInput','examOpenAns','examOpenAnswer','spExamAnswer','stExamAnswer'];return ids.some(id=>doc.getElementById(id)?.disabled);}
function installPracticeFeedback(){
 for(const name of ['checkOpen','checkOpenAnswer','checkOpenProblem','spCheckAnswer','algCheckOpen','stCheckOpen','ampCheckAnswer','checkIntegratedOpen']){
  const original=root[name];if(typeof original!=='function'||original.miWrapped)continue;
  const wrapped=function(...args){lastFeedback=null;const out=original.apply(this,args);const feedback=lastFeedback;if(feedback&&!feedback.ok){const doc=root.document;const area=['feedbackArea','fbA','openFeedback','spOpenFeedback','stOpenFeedback','ampFbArea','algOpenFeedback'].map(id=>doc.getElementById(id)).find(el=>el&&el.getClientRects().length);if(area){const msg=doc.createElement('p');msg.className='mi-validation-message';msg.setAttribute('role','status');msg.textContent=feedback.message;area.prepend(msg);}}return out;};wrapped.miWrapped=true;root[name]=wrapped;
 }
}
root.MIValidation={validate,grade,policyFor,parse,equivalent,compare,clean,symbolicEqual,numericValue,inputLocked,installPracticeFeedback};
if(typeof module!=='undefined')module.exports=root.MIValidation;
})(typeof window==='undefined'?globalThis:window);


