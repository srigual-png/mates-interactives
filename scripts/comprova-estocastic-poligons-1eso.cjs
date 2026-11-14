require('./run-estocastic-lot2.cjs')('poligons','ui').catch(e=>{console.error(e.stack||e);process.exitCode=1;});
