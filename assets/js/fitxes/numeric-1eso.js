/* Adaptació explícita del catàleg real TOPICS al paper. */
(function () {
  'use strict';
  function plain(html){
    const el=document.createElement('div');
    el.innerHTML=String(html).replace(/<br\s*\/?\s*>/gi,'\n').replace(/<sup>(.*?)<\/sup>/gi,'^$1');
    return el.textContent.replace(/✅|☑|✔|📌/gu,'').replace(/\u00a0/g,' ').replace(/sqrt\((\d+)\)/g,'√$1').replace(/[ \t]+/g,' ').trim();
  }
  // Generadors base: reutilitzem els càlculs sense consumir les bosses de pràctica.
  const generators={naturals:genNaturals,decimal_sys:genDecimalSys,ops:genOps,potencies:genPotenciesArrels,jerarquia:genJerarquia,divis:genDivisibilitatBase,mcmmcd:genMcmMcdBase,enters:genEnters,decimals:genDecimalsBase,fraccions:genFraccionsBase,proporcionalitat:genProporcionalitatBase,percentatges:genPercentatgesBase};
  function level(id,q){
    if(id==='decimal_sys'&&q.type===4)return 2;
    if(id==='proporcionalitat')return [3,4,7].includes(q.type)?3:[6,8].includes(q.type)?2:1;
    if(id==='potencies')return [5,6,7].includes(q.type)?2:1;
    return q.diff;
  }
  function advancedPowers(){
    const a=rnd(2,12),b=rnd(2,12),c=rnd(2,9),n=rnd(2,3),power=a**n,square=b*b,result=power+square-c;
    return {level:3,question:`Calcula, respectant la jerarquia: ${a}^${n} + √${square} × ${b} − ${c}.`,answer:String(result),steps:[`${a}^${n} = ${Array(n).fill(a).join(' × ')} = ${power}`,`√${square} = ${b}, perquè ${b}² = ${square}.`,`${b} × ${b} = ${square}`,`${power} + ${square} − ${c} = ${result}`],options:[]};
  }
  function advancedPlaceValue(){
    const a=rnd(2,9),b=rnd(1,a-1),c=rnd(0,9),d=rnd(0,9),n=1000*a+100*b+10*c+d;
    const swapped=1000*b+100*a+10*c+d,delta=n-swapped;
    return {level:3,question:`En el nombre ${n}, intercanvia la xifra dels milers i la de les centenes. Escriu el nombre nou i calcula quant ha disminuït el valor inicial.`,answer:`Nombre nou: ${swapped}; disminució: ${delta}.`,steps:[`Nombre inicial: ${a} × 1000 + ${b} × 100 + ${c} × 10 + ${d} = ${n}`,`Intercanvi: ${b} × 1000 + ${a} × 100 + ${c} × 10 + ${d} = ${swapped}`,`Disminució: ${n} − ${swapped} = ${delta}`],options:[]};
  }
  function adapt(id,q){
    let question=plain(q.question),steps=q.solution.map(plain);
    // Aquestes preguntes demanen escollir entre nombres; les opcions són dades.
    const options=(id==='divis'&&[1,3,5,6].includes(q.type))||(id==='fraccions'&&q.type===7)?q.options.map(plain):[];
    if(options.length) question+=' Escriu l’opció correcta i justifica la resposta.';
    if(id==='fraccions'&&q.type===11)question=question.replace('Quina equivalència és correcta per a','Expressa en decimal i en percentatge la fracció');
    if(id==='decimal_sys'&&q.type===3)question+=' (cm: centenes de miler; dm: desenes de miler; m: milers; c: centenes; d: desenes; u: unitats.)';
    if(id==='divis'){
      const data=(plain(q.question).match(/\d+/g)||[]).map(Number);
      if([1,2,5,6].includes(q.type)){
        const n=q.type===2||q.type===6?data[0]:Number(q.correct);
        const divisor=q.type===2?data[1]:q.type===6?Number(q.correct):data[0];
        const remainder=n%divisor;
        steps=[`${n} = ${divisor} × ${Math.floor(n/divisor)} + ${remainder}`,`El residu és ${remainder}; per tant, ${n} ${remainder?'no és':'és'} divisible per ${divisor}.`,plain(q.correct)];
      }
      if(q.type===3){const n=Number(q.correct),trials=[];for(let d=2;d*d<=n;d++)trials.push(`${n} ÷ ${d}: residu ${n%d}`);steps=[`N’hi ha prou de comprovar divisors enters entre 2 i √${n}.`,trials.length?trials.join('; '):`No hi ha cap enter entre 2 i √${n}.`,`Cap divisió és exacta: ${n} només té els divisors 1 i ${n}; és primer.`];}
    }
    if(id==='mcmmcd'){
      const numbers=(question.match(/\d+/g)||[]).map(Number);
      const useGcd=[1,5].includes(q.type),operation=useGcd?'MCD':'mcm';
      const result=numbers.reduce((a,b)=>useGcd?gcd(a,b):lcm(a,b));
      steps=[...numbers.map(n=>`${n} = ${factStr(n)}`),useGcd?'Prenem els factors comuns amb l’exponent menor.':'Prenem tots els factors amb l’exponent major.',`${operation}(${numbers.join(', ')}) = ${factStr(result)} = ${result}`,plain(q.correct)];
      if(q.type===4)question+=' Ara els dos esdeveniments coincideixen.';
      if(q.type===5)steps.push(`Cada grup tindrà ${numbers[0]}/${result} = ${numbers[0]/result} elements del primer tipus i ${numbers[1]}/${result} = ${numbers[1]/result} del segon.`);
    }
    if(id==='proporcionalitat'&&q.type===1){
      const direct=q.correct==='Directament proporcional';
      steps=[`Relació analitzada: ${question.replace(/^Classifica la relació: /,'')}`,direct?'Amb el preu, ritme o quantitat per unitat fixos indicats a l’enunciat, multiplicar la primera magnitud per un factor multiplica la segona pel mateix factor.':/àrea/.test(question)?'Si el costat es duplica, l’àrea es multiplica per 2² = 4; no pel mateix factor 2.':/taxi/.test(question)?'La tarifa inicial es paga una sola vegada: duplicar la distància no duplica aquesta part fixa del preu.':`En aquesta relació (${question.match(/"(.*)"/)?.[1]||question}), duplicar la primera magnitud no determina el doble de la segona; no hi ha una quantitat fixa per unitat.`,plain(q.correct)];
    }
    const fingerprint=id==='divis'&&options.length?JSON.stringify([q.type,question.match(/\d+/g),options.slice().sort()]):undefined;
    return {level:level(id,q),question,answer:plain(q.correct),steps,options,type:q.type,fingerprint};
  }
  window.MIWorksheetConfig={id:'1eso-numeric',title:'Fitxa d’exercicis — 1r d’ESO — Sentit numèric',web:'srigual-png.github.io/mates-interactives',
    topics:TOPICS.filter(t=>t.course==='1r').map(t=>({id:t.id,name:t.name,levels:generators[t.id]?[1,2,3]:[],generate(l){if(t.id==='potencies'&&l===3)return advancedPowers();if(t.id==='decimal_sys'&&l===3)return advancedPlaceValue();return adapt(t.id,generators[t.id]());}}))};
})();
