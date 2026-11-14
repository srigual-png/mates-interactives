'use strict';
const {runUiTopic}=require('./estocastic-1eso-playwright-helper.cjs');
runUiTopic('barres').then(result=>console.log(JSON.stringify(result,null,2))).catch(error=>{console.error(error);process.exitCode=1;});
