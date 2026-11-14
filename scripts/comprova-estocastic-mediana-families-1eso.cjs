require('./run-estocastic-lot2.cjs')('mediana','math').catch(e=>{console.error(e.stack||e);process.exitCode=1;});
