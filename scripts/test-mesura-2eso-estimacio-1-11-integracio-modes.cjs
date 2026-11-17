#!/usr/bin/env node
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const html=fs.readFileSync(path.join(__dirname,'..','2eso','sentit-mesura.html'),'utf8');
function slice(a,b){const i=html.indexOf(a),j=html.indexOf(b,i+a.length);assert(i>=0&&j>i,'Missing source '+a+'..'+b);return html.slice(i,j)}
const beg=html.indexOf('/* ── UTILS NUMÈRIQUES'),last=html.indexOf("return {topicId:'problemes',type,course:'2n'",beg),end=html.indexOf('\n}',last)+2;
assert(beg>=0&&last>beg&&end>last);
let seed=0x7294031;const math=Object.create(Math);
math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/0x100000000};
const docElements=new Map(),buttons=[];
function el(id){
 if(!docElements.has(id))docElements.set(id,{innerHTML:'',textContent:'',style:{},className:'',value:'',disabled:false,hidden:false,focus(){},classList:{add(){},remove(){},toggle(){}},dataset:{}});
 return docElements.get(id);
}
const correctEvents=[],examEvents=[],screens=[];
const document={getElementById:el,querySelectorAll(){return buttons}};
const state={currentTopic:0,level:1,mode:'multi',exCount:0,correctStreak:0,answered:false,examQs:[],examIdx:0,examScore:0};
let nextEx;
const api={
 Math:math,console,document,window:{MIAnalytics:{shown(){},answer(){}}},state,
 TOPICS:[{id:'estimacio',name:'Estimació, precisió i error'}],
 setTimeout(){},setNavContext(){},showScreen(x){screens.push(x)},
 updateUnitPad(){},registerError(){},miReviewHtml(){return ''},miTheoryLinkHtml(){return ''},markTopicDone(){},
 processAnswer(ok,answer){correctEvents.push({ok,answer})},
 processExamAnswer(ok,answer){examEvents.push({ok,answer})},
 getExerciseForMode(){return nextEx}
};
const ctx=vm.createContext(api);
vm.runInContext(html.slice(beg,end),ctx,{timeout:10000});
vm.runInContext(slice('function showExercise(){','function insertMath(')+slice('function selectAnswer(','function checkOpen(')+slice('function renderExamQ(){','function selectExamAnswer(')+slice('function selectExamAnswer(','function checkExamOpen('),ctx,{timeout:10000});
const generator=vm.runInContext('genEstimacioError2ESO',ctx);
function check(type){
 const ex=generator(type);
 assert.equal(ex.allowOpen,false);
 assert.equal(ex.options.length,4);
 assert(ex.options.includes(ex.correct));
 nextEx=ex;ctx.currentEx=ex;
 const optionButtons=ex.options.map(()=>({disabled:false,flags:new Set(),classList:{add(k){this.owner.flags.add(k)}}}));
 for(const b of optionButtons)b.classList.owner=b;
 buttons.length=0;buttons.push(...optionButtons);
 state.level=1;state.mode='multi';state.exCount=0;
 vm.runInContext('showExercise()',ctx);
 assert(el('exQuestion').innerHTML.includes(ex.question));
 assert(el('guideSteps').innerHTML.includes(ex.guide[0]));
 assert(el('optionsGrid').innerHTML.includes(ex.correct));
 assert.equal(el('openWrap').style.display,'none');
 state.level=2;vm.runInContext('showExercise()',ctx);
 assert.equal(el('guideSteps').style.display,'none');
 assert.equal(el('optionsGrid').style.display,'');
 assert(el('optionsGrid').innerHTML.includes(ex.correct));
 state.level=1;
 assert(screens.includes('screenExercise'));
 vm.runInContext('selectAnswer('+ex.options.indexOf(ex.correct)+',null)',ctx);
 assert.deepEqual(correctEvents.at(-1),{ok:true,answer:ex.correct});
 assert(optionButtons.every(b=>b.disabled));
 const wrong=ex.options.findIndex(x=>x!==ex.correct);
 vm.runInContext('selectAnswer('+wrong+',document.querySelectorAll()[0])',ctx); // source callback itself; no real DOM click
 assert.deepEqual(correctEvents.at(-1),{ok:false,answer:ex.options[wrong]});
 state.examQs=[{...ex,topicName:'Estimació'}];state.examIdx=0;
 buttons.length=0;buttons.push(...ex.options.map(()=>({disabled:false,flags:new Set(),classList:{add(k){this.owner.flags.add(k)}}})));
 for(const b of buttons)b.classList.owner=b;
 vm.runInContext('renderExamQ()',ctx);
 assert(el('examContent').innerHTML.includes(ex.question));
 assert(el('examOptions').innerHTML.includes(ex.correct));
 assert.equal(el('examOpenWrap').style.display,'none');
 vm.runInContext('selectExamAnswer('+ex.options.indexOf(ex.correct)+',null)',ctx);
 assert.deepEqual(examEvents.at(-1),{ok:true,answer:ex.correct});
 vm.runInContext('selectExamAnswer('+wrong+',document.querySelectorAll()[0])',ctx);
 assert.deepEqual(examEvents.at(-1),{ok:false,answer:ex.options[wrong]});
 return {type,correct:ex.correct,practice:'ok',exam:'ok',noOpen:true};
}
const results=[check(1),check(11)];
console.log(JSON.stringify({kind:'source-level simulated DOM integration, not real browser',results},null,2));
