require('./run-estocastic-lot2.cjs')('probabilitat','math').catch(e=>{console.error(e.stack||e);process.exitCode=1;});
