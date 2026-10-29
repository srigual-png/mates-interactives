const fs=require('fs'),vm=require('vm'),path=require('path');
for(let c=1;c<=4;c++)for(const sense of ['numeric','mesura','algebraic','espacial','estocastic']){const file=`${c}eso/sentit-${sense}.html`,s=fs.readFileSync(file,'utf8');for(const m of s.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)){try{new vm.Script(m[1],{filename:file})}catch(e){console.error(e);process.exitCode=1;}}}
console.log('Syntax scan complete');
