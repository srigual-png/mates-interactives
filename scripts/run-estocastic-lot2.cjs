const {runLot2MathTopic,runLot2UiTopic}=require('./estocastic-lot2-test-helper.cjs');
async function run(topic,mode){
  const result=mode==='math'?await runLot2MathTopic(topic):await runLot2UiTopic(topic);
  const summary={topic:result.topic,browser:result.browser,mode,families:result.families,levels:result.levels,regularPool:result.regularPool,samples:result.samples,contextPatterns:result.contextPatterns,rotations:result.rotations||null,guiada:result.guiada||null,autonoma:result.autonoma||null,examQuestions:result.examQuestions||null,examUniqueFamilies:result.examUniqueFamilies||null,globalExamQuestions:result.globalExamQuestions||null,globalExamUniqueFamilies:result.globalExamUniqueFamilies||null,extensionSmoke:result.extensionSmoke||null,mobile:result.mobile||null,pageErrors:result.pageErrors||[]};
  console.log(JSON.stringify(summary,null,2));return result;
}
module.exports=run;
if(require.main===module){const [, ,topic,mode]=process.argv;if(!topic||!['math','ui'].includes(mode)){console.error('Ús: node scripts/run-estocastic-lot2.cjs <topic> <math|ui>');process.exitCode=2;}else run(topic,mode).catch(e=>{console.error(e.stack||e);process.exitCode=1;});}
