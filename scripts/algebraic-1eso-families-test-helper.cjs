'use strict';
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const html=fs.readFileSync(path.join(root,'1eso/sentit-algebraic.html'),'utf8');

function seeded(seed){let x=seed>>>0;return()=>((x=Math.imul(x,1664525)+1013904223>>>0)/4294967296);}
function makeHarness(){
  const random=seeded(0x41a1b3),state={forced:[],forcedType:null,forcedGeneratorType:null};
  const sandbox={console,Math:Object.create(Math)};
  sandbox.Math.random=random;
  sandbox.document={createElement(){return {textContent:'',set innerHTML(v){this.textContent=String(v).replace(/<[^>]*>/g,'')}}}};
  sandbox.rnd=(a,b)=>{if(a===1&&b===6&&state.forcedGeneratorType!==null){const value=state.forcedGeneratorType;state.forcedGeneratorType=null;return value;}if(state.forced.length&&state.forced[0]>=a&&state.forced[0]<=b)return state.forced.shift();return a+Math.floor(random()*(b-a+1));};
  sandbox.shuffle=a=>{
    if(state.forcedType!==null&&a.length===7&&a[0]===1&&a[1]===1&&a[6]===6){const type=state.forcedType;state.forcedType=null;return [type,...a.filter((_,i)=>i!==a.indexOf(type))];}
    const out=a.slice();for(let i=out.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[out[i],out[j]]=[out[j],out[i]];}return out;
  };
  sandbox.uniq4=(correct,wrong)=>{const out=[...new Set([String(correct),...wrong.map(String)])].slice(0,4);while(out.length<4)out.push('Distractor '+out.length);return out;};
  sandbox.openOk=()=>false;sandbox.norm=v=>String(v).toLowerCase().trim();
  sandbox.algNumAnswer=v=>({val:String(v),check:()=>false});
  sandbox.algExprAnswer=(v,alts=[])=>({val:v,check:()=>false,alts});
  sandbox.algTextAnswer=(v,alts=[])=>({val:v,check:()=>false,alts});
  sandbox.algProblem=o=>Object.assign({patternId:'',family:'',topicId:'',diff:1,question:'',hint:[],solution:[],answer:null},o,{type:o.patternId});
  sandbox.ALG_OPEN_PATTERNS=[];
  sandbox.algAdd=(id,family,topicId,diff,gen)=>sandbox.ALG_OPEN_PATTERNS.push({id,family,topicId,diff,gen});
  sandbox.window=sandbox;
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(path.join(root,'assets/js/algebraic-1eso-families.js'),'utf8'),sandbox,{filename:'algebraic-1eso-families.js'});
  vm.runInContext(fs.readFileSync(path.join(root,'assets/js/dificultat-mi.js'),'utf8'),sandbox,{filename:'dificultat-mi.js'});
  function between(startMarker,endMarker){const a=html.indexOf(startMarker);assert(a>=0,startMarker);const b=html.indexOf(endMarker,a+startMarker.length);assert(b>a,endMarker);return html.slice(a,b);}
  for(const [name,end] of [['genTraduccio','function genPatrons()'],['genPatrons','function genPatronsAmpliacio()'],['genMonomis','function genMonomisAmpliacio()'],['genSimplificacio','function genSimplificacioAmpliacio()'],['genSimplificacioAmpliacio','function genEquacions('],['genEquacions','function genEquacionsAmpliacio()'],['genEquacionsAmpliacio','/* ── PENSAMENT COMPUTACIONAL'],['genComputacional','/* ── TEMES']]){
    const source=between('function '+name+'(',end);vm.runInContext(source,sandbox,{filename:name+'.js'});
  }
  const topics={
    traduccio:{id:'traduccio',course:'1r',exam1r:true,gen:()=>sandbox.genTraduccio()},
    patrons:{id:'patrons',course:'1r',exam1r:true,gen:()=>sandbox.genPatrons()},
    monomis:{id:'monomis',course:'1r',exam1r:true,gen:()=>sandbox.genMonomis()},
    simplificacio:{id:'simplificacio',course:'1r',exam1r:true,gen:()=>sandbox.genSimplificacio()},
    equacions:{id:'equacions',course:'1r',exam1r:true,gen:()=>sandbox.genEquacions()},
    computacional:{id:'computacional',course:'1r',exam1r:true,gen:()=>sandbox.genComputacional()},
    patrons2:{id:'patrons2',course:'2n',exam1r:false,gen:()=>({topicId:'patrons2',type:1,question:'',correct:'',options:['a','b'],solution:['ok']})},
    monomis2:{id:'monomis2',course:'2n',exam1r:false,gen:()=>({topicId:'monomis2',type:1,question:'',correct:'',options:['a','b'],solution:['ok']})},
    simplificacio2:{id:'simplificacio2',course:'2n',exam1r:false,gen:()=>sandbox.genSimplificacioAmpliacio()},
    equacions2:{id:'equacions2',course:'2n',exam1r:false,gen:()=>sandbox.genEquacionsAmpliacio()}
  };
  sandbox.TOPICS=Object.values(topics);
  const D=sandbox.MIDifficulty.attach({course:'1eso',sense:'algebraic',topics:Object.values(topics)});
  const bankSection=between('// LLENGUATGE I VARIABLE (7)','const algOpenCfg=');
  for(const line of bankSection.split(/\r?\n/).map(x=>x.trim()).filter(x=>/^algAdd\('(T|P|M|S|E|C)/.test(x)))vm.runInContext(line,sandbox,{filename:'algebra-open-bank.js'});
  D.bindBanks({algebraOpen:sandbox.ALG_OPEN_PATTERNS});
  const variantStart=html.indexOf('const variationMemory={};');
  const variantEnd=html.indexOf('TOPICS.forEach(t=>{t._baseGen=t.gen;t.gen=variedGenerator(t.id,t.gen);});',variantStart);
  assert(variantStart>=0&&variantEnd>variantStart,'family-aware variation wrapper found');
  vm.runInContext(html.slice(variantStart,variantEnd),sandbox,{filename:'variation-wrapper.js'});
  return {sandbox,state,topics,D,families:sandbox.MIFirstAlgebraicFamilies,patterns:sandbox.ALG_OPEN_PATTERNS,seeded,html};
}
function clean(value){return String(value??'').replace(/<[^>]*>/g,' ').replace(/&nbsp;/g,' ').replace(/\s+/g,' ').trim();}
function number(value){const m=String(value).replace(/−/g,'-').replace(/,/g,'.').match(/-?\d+(?:\.\d+)?/);assert(m,'numeric answer '+value);return Number(m[0]);}
function evalExpr(expression,x){
  let s=clean(expression).replace(/[−–]/g,'-').replace(/²/g,'^2').replace(/³/g,'^3').replace(/,/g,'.').replace(/·/g,'*').replace(/×/g,'*').replace(/(\d)(x)/g,'$1*$2').replace(/(\d)\(/g,'$1*(').replace(/x\^3/g,'x*x*x').replace(/x\^2/g,'x*x');
  assert(/^[0-9x+*/().\s-]+$/.test(s),'safe algebraic expression: '+s);
  return Function('x','return ('+s+');')(x);
}
function equivalent(a,b){for(const x of [-5,-2,-1,0,1,3,7])if(Math.abs(evalExpr(a,x)-evalExpr(b,x))>1e-9)return false;return true;}
module.exports={makeHarness,clean,number,evalExpr,equivalent};
