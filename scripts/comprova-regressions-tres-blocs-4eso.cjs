const cp=require('child_process'),fs=require('fs'),suites=[];
for(const sense of ['algebraic','espacial','estocastic'])for(const option of ['A','B']){
const file=`comprova-examens-${sense}-4eso.cjs`,r=cp.spawnSync(process.execPath,['--require','./scripts/proves-locals-offline.cjs',file,option],{encoding:'utf8',timeout:600000});
suites.push({file,option,exitCode:r.status,output:r.stdout,error:r.stderr});console.log(file+' '+option+': '+r.status);if(r.status!==0)console.log(r.stderr);
fs.writeFileSync('docs/dificultats/regressions-tres-blocs-4eso-punt3.json',JSON.stringify({suites},null,2)+'\n');if(r.status!==0)process.exit(1);
}
