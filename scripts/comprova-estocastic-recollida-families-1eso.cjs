'use strict';
const {runMathTopic}=require('./estocastic-1eso-playwright-helper.cjs');
runMathTopic('recollida').then(result=>{console.log(JSON.stringify(result,null,2));if(result.pageErrors.length)process.exitCode=1;}).catch(error=>{console.error(error);process.exitCode=1;});
