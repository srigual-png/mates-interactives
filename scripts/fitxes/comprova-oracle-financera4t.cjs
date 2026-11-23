const assert=require('assert');
const fs=require('fs');
const path=require('path');
const {pathToFileURL}=require('url');
const {playwright,launchOptions}=require('../genera-examens-cerca.cjs');

(async()=>{
  const browser=await playwright().chromium.launch(launchOptions());
  try{
    const page=await browser.newPage();
    await page.route(/^https?:/,route=>route.abort());
    await page.goto(pathToFileURL(path.resolve('4eso/sentit-numeric.html')).href);
    const report=await page.evaluate(()=>{
      const money=value=>{const match=String(value).match(/-?\d[\d.]*,?\d*/);if(!match)throw Error('No s’ha pogut llegir el valor: '+value);return Number(match[0].replace(/\./g,'').replace(',','.'));};
      const round2=value=>Math.round((value+1e-10)*100)/100;
      const seed=Math.random;
      let state=0x4f3a21;
      Math.random=()=>{state=(Math.imul(state,1664525)+1013904223)>>>0;return state/4294967296;};
      const samples=500,capitalSeen=new Set(),yearsSeen=new Set(),scenarioSeen=new Set(),winnerSeen=new Set();
      let firstSample=null;
      const failures=[];
      for(let i=0;i<samples;i++){
        const q=genFinancera4ESO(11),el=document.createElement('div');
        if(i===0)firstSample={question:q.question,correct:q.correct,options:q.options,solution:q.solution};
        el.innerHTML=q.question;
        const bold=[...el.querySelectorAll('b')].map(node=>node.textContent.trim());
        const C=money(bold[0]),years=Number(bold[1].match(/\d+/)[0]);
        const simpleRate=money(bold[2]),compoundRate=money(bold[3]),fee=money(bold[4]);
        const simple=round2(C*(1+(simpleRate/100)*years));
        const compound=round2(C*Math.pow(1+compoundRate/100,years)-fee);
        const diff=round2(Math.abs(simple-compound));
        const winner=simple>compound?'A':'B';
        const parsed=q.correct.match(/^Opció ([AB]) · ([\d.,]+) € més$/);
        const fail=(condition,message)=>{if(!condition&&failures.length<12)failures.push({sample:i,message,question:el.textContent,correct:q.correct,options:q.options});};
        fail(bold.length===5,'cinc dades financeres llegibles');
        fail([2,3,4].includes(years),'termini entre 2 i 4 anys');
        fail(parsed&&parsed[1]===winner&&Math.abs(money(parsed[2])-diff)<0.005,'guanyador i diferència independents');
        fail(Array.isArray(q.options)&&q.options.length===4&&new Set(q.options).size===4,'quatre opcions diferents');
        fail(q.options.filter(option=>option===q.correct).length===1,'resposta correcta única');
        const stepA=q.solution[0].match(/=\s*([\d.,]+ €)\./);
        const stepB=q.solution[1].match(/=\s*([\d.,]+ €)\./);
        const stepDiff=q.solution[2].match(/=\s*([\d.,]+ €)/);
        fail(stepA&&Math.abs(money(stepA[1])-simple)<0.005,'pas de capital final A');
        fail(stepB&&Math.abs(money(stepB[1])-compound)<0.005,'pas de capital final B net de comissió');
        fail(stepDiff&&Math.abs(money(stepDiff[1])-diff)<0.005,'pas de diferència');
        fail(q.solution.length>=4&&q.solution[3].includes('Opció '+winner),'conclusió coherent');
        yearsSeen.add(years);
        capitalSeen.add(C);
        scenarioSeen.add(`${simpleRate}/${compoundRate}/${fee}`);
        winnerSeen.add(winner);
      }
      Math.random=seed;
      return {samples,capitals:[...capitalSeen].sort((a,b)=>a-b),years:[...yearsSeen].sort(),scenarios:[...scenarioSeen].sort(),winners:[...winnerSeen].sort(),sample:firstSample,failures};
    });
    assert.deepEqual(report.failures,[],JSON.stringify(report.failures,null,2));
    assert.deepEqual(report.years,[2,3,4],'cobertura dels tres terminis');
    assert.deepEqual(report.capitals,[800,1000,1200,1500,2000],'cobertura dels cinc capitals');
    assert.equal(report.scenarios.length,2,'cobertura dels dos escenaris del generador');
    assert.deepEqual(report.winners,['A','B'],'cobertura de totes dues opcions guanyadores');
    const results=JSON.parse(fs.readFileSync('docs/dificultats/resultats-punt3-4eso-numeric.json','utf8'));
    const financial=results.topics.find(topic=>topic.topic==='financera4t');
    const saved=financial?.variants.find(sample=>sample.type===11);
    assert(saved,'mostra persistent de financera4t:type 11');
    assert.equal(saved.seed,'0x4f3a21','llavor de la mostra persistent');
    assert.equal(financial.types,11,'cens financer actualitzat');
    assert.deepEqual(financial.coverage,[4,6,1],'cobertura N1/N2/N3 actualitzada');
    assert.equal(saved.n,report.samples,'nombre de mostres persistents');
    assert.deepEqual({question:saved.question,correct:saved.correct,options:saved.options,solution:saved.solution},report.sample,'la mostra persistent coincideix amb la primera mostra reproduïble: '+JSON.stringify({saved:{question:saved.question,correct:saved.correct,options:saved.options,solution:saved.solution},generated:report.sample}));
    console.log(`financera4t:type 11: ${report.samples} mostres, 5 capitals, 2 escenaris, terminis 2–4, guanyadors A/B; oracle matemàtic i distractors OK`);
  }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
