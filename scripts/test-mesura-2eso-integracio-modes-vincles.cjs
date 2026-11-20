#!/usr/bin/env node
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const html=fs.readFileSync(path.join(__dirname,'..','2eso/sentit-mesura.html'),'utf8');
function slice(a,b){const i=html.indexOf(a),j=html.indexOf(b,i+a.length);assert(i>=0&&j>i,'missing '+a+' '+b);return html.slice(i,j)}
const beg=html.indexOf('/* ── UTILS NUMÈRIQUES'),last=html.indexOf("return {topicId:'problemes',type,course:'2n'",beg),end=html.indexOf('\n}',last)+2;assert(beg>=0&&last>beg&&end>last);
let seed=0x17112026;const math=Object.create(Math);math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296};
const elements=new Map(),buttons=[];function el(id){if(!elements.has(id))elements.set(id,{innerHTML:'',textContent:'',style:{},className:'',value:'',disabled:false,focus(){},classList:{add(){},remove(){}},dataset:{}});return elements.get(id)}
const document={getElementById:el,querySelectorAll(){return buttons}},practice=[],exam=[],screens=[];
const state={currentTopic:0,level:1,mode:'multi',exCount:0,correctStreak:0,answered:false,examQs:[],examIdx:0,examScore:0,examLog:[]};
const api={Math:math,console,document,window:{MIAnalytics:{shown(){},answer(){}}},state,TOPICS:[{id:'unitats',name:'Mesura'}],setTimeout(){},setNavContext(){},showScreen(x){screens.push(x)},updateUnitPad(){},registerError(){},miReviewHtml(){return ''},miTheoryLinkHtml(){return ''},markTopicDone(){},processAnswer(ok,answer){practice.push({ok,answer})},processExamAnswer(ok,answer){exam.push({ok,answer})},getExerciseForMode(){return nextEx}};
let nextEx;
const ctx=vm.createContext(api);
vm.runInContext(html.slice(beg,end),ctx,{timeout:15000});
vm.runInContext(slice('function showExercise(){','function insertMath(')+slice('function selectAnswer(','function checkOpen(')+slice('function renderExamQ(){','function selectExamAnswer(')+slice('function selectExamAnswer(','function checkExamOpen('),ctx,{timeout:15000});
const generators=vm.runInContext('({unitats:genUnitats2ESO,escales:genEscales2ESO,pitagores:genPitagores2ESO,perimetres:genPerimetresArees2ESO,superficies:genSuperficiesVolums2ESO,estimacio:genEstimacioError2ESO,problemes:genProblemesMesura2ESO})',ctx);
const types={unitats:[1,4,5,9],escales:[1,2,3,5,12,16,17],pitagores:[2,3,4,5,6,7,8,10,11,12,13,14,15],perimetres:[4,5,14,15],superficies:[1,3,4,5,8,9,10,11,13,14,15,17,19],estimacio:[6,7,8,9,13,17,18],problemes:[3,5,6,7,8,14,15,16]};
let n=0,openAllowed=0,closedOnly=0;const samples=[];
function freshButtons(ex){buttons.length=0;buttons.push(...ex.options.map(()=>({disabled:false,flags:new Set(),classList:{add(k){this.owner.flags.add(k)}}})));for(const b of buttons)b.classList.owner=b;}
for(const [topic,arr] of Object.entries(types)){
 for(const type of arr){
  const ex=generators[topic](type);assert(ex.question&&ex.correct&&ex.guide?.length&&ex.solution?.length,topic+':'+type);
  assert.equal(ex.options.length,4,topic+':'+type);assert.equal(new Set(ex.options).size,4,topic+':'+type);assert(ex.options.includes(ex.correct),topic+':'+type);
  nextEx=ex;ctx.currentEx=ex;api.TOPICS[0]={id:topic,name:topic};state.currentTopic=0;
  freshButtons(ex);state.level=1;state.mode='multi';state.answered=false;vm.runInContext('showExercise()',ctx);
  assert(el('exQuestion').innerHTML.includes(ex.question));assert(el('guideSteps').innerHTML.includes(ex.guide[0]));assert.equal(el('guideSteps').style.display,'block');assert(el('optionsGrid').innerHTML.includes(ex.correct));assert.equal(el('openWrap').style.display,'none');
  vm.runInContext('selectAnswer('+ex.options.indexOf(ex.correct)+',null)',ctx);assert.equal(practice.at(-1).ok,true);assert(buttons.every(x=>x.disabled));
  freshButtons(ex);state.level=2;state.answered=false;vm.runInContext('showExercise()',ctx);
  assert.equal(el('guideSteps').style.display,'none');assert(el('optionsGrid').innerHTML.includes(ex.correct));
  const wrong=ex.options.findIndex(x=>x!==ex.correct);vm.runInContext('selectAnswer('+wrong+',document.querySelectorAll()[0])',ctx);assert.equal(practice.at(-1).ok,false);
  state.examQs=[{...ex,topicName:topic}];state.examIdx=0;freshButtons(ex);
  const savedRandom=math.random;math.random=()=>.99;vm.runInContext('renderExamQ()',ctx);math.random=savedRandom;
  assert.equal(state.examQs[0]._examOpen,false);assert(el('examContent').innerHTML.includes(ex.question));assert(el('examOptions').innerHTML.includes(ex.correct));
  vm.runInContext('selectExamAnswer('+ex.options.indexOf(ex.correct)+',null)',ctx);assert.equal(exam.at(-1).ok,true);
  freshButtons(ex);vm.runInContext('selectExamAnswer('+wrong+',document.querySelectorAll()[0])',ctx);assert.equal(exam.at(-1).ok,false);
  if(ex.allowOpen===false){closedOnly++;}else{
   openAllowed++;
   state.mode='open';state.level=1;state.answered=false;vm.runInContext('showExercise()',ctx);
   assert.equal(el('openWrap').style.display,'block');assert.equal(el('optionsGrid').innerHTML,'');assert(el('openHint').textContent.length>0);
   state.mode='multi';freshButtons(ex);math.random=()=>0;vm.runInContext('renderExamQ()',ctx);math.random=savedRandom;
   assert.equal(state.examQs[0]._examOpen,true);assert.equal(el('examOpenWrap').style.display,'block');
  }
  samples.push({type:topic+':'+type,open:ex.allowOpen!==false,answer:ex.correct});n++;
 }
}
assert(n>=50,'Coverage too narrow');assert(openAllowed>0&&closedOnly>0);
console.log(JSON.stringify({scope:'simulated DOM, not visual/browser validation',types:n,guided_multiple:n,autonomous_multiple:n,exam_multiple:n,guided_open:openAllowed,exam_open_rendered:openAllowed,closed_only:closedOnly,example_subset:samples.slice(0,10),teacher_approved:false},null,2));
