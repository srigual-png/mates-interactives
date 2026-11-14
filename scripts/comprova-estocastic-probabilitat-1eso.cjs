require('./run-estocastic-lot2.cjs')('probabilitat','ui').catch(e=>{console.error(e.stack||e);process.exitCode=1;});
