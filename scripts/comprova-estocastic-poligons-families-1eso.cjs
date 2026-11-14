require('./run-estocastic-lot2.cjs')('poligons','math').catch(e=>{console.error(e.stack||e);process.exitCode=1;});
