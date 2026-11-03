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
  function paperQuestion(id,q){
    let text=plain(q.question).replace(/\bQuin es\b/g,'Quin és').replace(/\bfraccio\b/g,'fracció').replace(/\bfabrica\b/g,'fàbrica').replace(/\bmaquines\b/g,'màquines').replace(/\bA mes\b/g,'A més').replace(/\b(escola|fàbrica) te\b/g,'$1 té');
    const numbers=(text.match(/-?\d+(?:[.,]\d+)?/g)||[]),[a,b,c]=numbers;
    if(id==='decimal_sys'&&q.type===1)text=`En el nombre ${b}, quin valor representa la xifra ${a}? Escriu aquest valor en unitats.`;
    if(id==='potencies'&&q.type===4)text=`Escriu la potència ${a}^${b} com un producte de factors iguals.`;
    if(id==='divis'&&q.type===4)text=`Descompon ${a} en un producte de factors primers.`;
    if(id==='ops'&&q.type===5)text=text.replace(/quaderns a (\d+) euros\./,'quaderns a $1 euros cadascun.');
    if(id==='ops'&&q.type===6)text=`Una fàbrica treballa ${a} dies. Cada dia fa ${b} torns i en cada torn produeix ${c} unitats. Quantes unitats produeix en total?`;
    if(id==='enters'&&q.type===6)text=`En un compte bancari hi ha un saldo de ${a} €. S’hi ingressen ${b} € i després se’n retiren ${c} €. Quin és el saldo final?`;
    if(id==='fraccions'&&q.type===8){
      const item=plain(q.correct).replace(/^\d+\s+/,''),verb=text.match(/En (ven|reserva|presta|utilitza|regala|reparteix|gasta)/)?.[1];
      if(verb)text=`La Júlia té ${a} ${item} i ${verb} ${b}/${c} del total. ${/^(llibres|cromos|quaderns)$/.test(item)?'Quants':'Quantes'} ${item} li queden${verb==='reserva'?' sense reservar':''}?`;
    }
    if(id==='fraccions'&&q.type===9)text=`Indica si la fracció ${a}/${b} és pròpia o impròpia.`;
    if(id==='decimals'&&q.type===9)text=`El valor exacte d’una quantitat és ${a}, però s’ha utilitzat ${b} com a valor aproximat. Calcula l’error relatiu d’aquesta aproximació i expressa’l en percentatge.`;
    if(id==='decimals'&&q.type===7){
      const rate=a.replace('.',','),time=b;
      if(/ciclista|caminant/.test(text))text=`${/ciclista/.test(text)?'Un ciclista circula':'Una persona camina'} a una velocitat constant de ${rate} km/h durant ${time} h. Quants quilòmetres recorre?`;
      else if(/aixeta/.test(text))text=`Una aixeta deixa sortir ${rate} litres d’aigua cada minut. Quants litres en sortiran si es manté oberta durant ${time} minuts al mateix ritme?`;
      else if(/bomba/.test(text))text=`Una bomba d’aigua impulsa ${rate} litres cada minut. Quants litres impulsarà en ${time} minuts si manté el mateix cabal?`;
      else if(/màquina/.test(text))text=`Una màquina produeix ${rate} kg de material cada hora. Quants quilograms produirà en ${time} hores si manté el mateix ritme?`;
      else if(/cinta/.test(text))text=`Una cinta transportadora avança ${rate} metres cada minut. Quants metres avançarà en ${time} minuts si manté la mateixa velocitat?`;
    }
    if(id==='mcmmcd'&&q.type===4){
      if(/autobús/.test(text))text=`D’una mateixa parada surt un autobús de la línia A cada ${a} minuts i un de la línia B cada ${b} minuts. Ara surt un autobús de cada línia alhora. Quants minuts passaran fins que tornin a coincidir les sortides de les dues línies?`;
      else {
        const context=/llums/.test(text)?['Un llum parpelleja','un altre llum parpelleja','segons','parpellejar']: /semàfors/.test(text)?['Un semàfor canvia de fase','un altre semàfor canvia de fase','segons','canviar de fase']: /alarmes/.test(text)?['Una alarma sona','una altra alarma sona','minuts','sonar']: /aspersors/.test(text)?['Un aspersor s’activa','un altre aspersor s’activa','minuts','activar-se']: /màquines/.test(text)?['Una màquina emet un senyal','una altra màquina emet un senyal','segons','emetre un senyal']: /activitats/.test(text)?['Una activitat comença','una altra activitat comença','minuts','començar']:['Un indicador fa un flaix','un altre indicador fa un flaix','segons','fer un flaix'];
        const action=/llums/.test(text)?'els dos llums parpellegen':/semàfors/.test(text)?'els dos semàfors canvien de fase':/alarmes/.test(text)?'les dues alarmes sonen':/aspersors/.test(text)?'els dos aspersors s’activen':/màquines/.test(text)?'les dues màquines emeten un senyal':/activitats/.test(text)?'les dues activitats comencen':'els dos indicadors fan un flaix';
        text=`${context[0]} cada ${a} ${context[2]} i ${context[1]} cada ${b} ${context[2]}. Ara ${action} alhora. Quants ${context[2]} passaran fins que tornin a ${context[3]} alhora?`;
      }
    }
    return text;
  }
  function adaptLegacy(id,q){
    let question=paperQuestion(id,q),steps=q.solution.map(plain);
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
      if(q.type===5)steps.push(`Cada grup tindrà ${numbers[0]}/${result} = ${numbers[0]/result} elements del primer tipus i ${numbers[1]}/${result} = ${numbers[1]/result} del segon.`);
    }
    if(id==='proporcionalitat'&&q.type===1){
      const direct=q.correct==='Directament proporcional';
      steps=[`Relació analitzada: ${question.replace(/^Classifica la relació: /,'')}`,direct?'Amb el preu, ritme o quantitat per unitat fixos indicats a l’enunciat, multiplicar la primera magnitud per un factor multiplica la segona pel mateix factor.':/àrea/.test(question)?'Si el costat es duplica, l’àrea es multiplica per 2² = 4; no pel mateix factor 2.':/taxi/.test(question)?'La tarifa inicial es paga una sola vegada: duplicar la distància no duplica aquesta part fixa del preu.':`En aquesta relació (${question.match(/"(.*)"/)?.[1]||question}), duplicar la primera magnitud no determina el doble de la segona; no hi ha una quantitat fixa per unitat.`,plain(q.correct)];
    }
    const fingerprint=id==='divis'&&options.length?JSON.stringify([q.type,question.match(/\d+/g),options.slice().sort()]):undefined;
    return {level:level(id,q),question,answer:plain(q.correct),steps,options,type:q.type,fingerprint};
  }
  const display=s=>String(s)
    .replace(/\b(MCD|mcm)\(([\d,; ]+)\)/g,(_,name,args)=>name+'('+args.replace(/,\s*/g,'; ')+')')
    .replace(/(\d)\.(?=\d)/g,'$1,')
    .replace(/([0-9)\]⁰¹²³⁴⁵⁶⁷⁸⁹])\s*x\s*(?=[0-9(\[])/g,'$1 × ')
    .replace(/\(x(?=\d)/g,'(×')
    .replace(/(^|[\s(=+×÷:^])-(?=\d)/g,'$1−')
    .replace(/([0-9)\]⁰¹²³⁴⁵⁶⁷⁸⁹])\s*-\s*(?=[0-9(\[])/g,'$1 − ');
  function finish(q){return {...q,question:display(q.question),answer:display(q.answer),steps:q.steps.map(display),options:(q.options||[]).map(display)};}
  const groupGrammar={estoigs:['idèntics','Quants'],cistelles:['idèntiques','Quantes'],paquets:['idèntics','Quants'],lots:['idèntics','Quants'],safates:['idèntiques','Quantes'],bosses:['idèntiques','Quantes'],capses:['idèntiques','Quantes'],jocs:['idèntics','Quants']};
  function adapt(id,raw){
    const q=adaptLegacy(id,raw),t=raw.type;
    const source=plain(raw.question),ns=(source.match(/-?\d+(?:[.]\d+)?/g)||[]).map(Number);
    if(id==='potencies'&&[6,7].includes(t))q.factKey='root:'+ns[t===6?0:1];
    if((id==='naturals'||id==='enters')&&t===1){
      const values=ns; q.question=`Ordena de ${/menor a major/.test(source)?'menor a major':'major a menor'}: ${values.join('; ')}.`;
      q.steps=[`Nombres donats: ${values.join('; ')}.`,`Ordenació: ${q.answer}`];
    }
    if(id==='naturals'&&t===3){
      const unit=/milers/.test(source)?1000:/centenes/.test(source)?100:10;
      let n=ns[0];if(n%unit===0)n+=rnd(1,unit-1);
      const result=Math.floor((n+unit/2)/unit)*unit;
      q.question=`Arrodoneix ${n} a les ${unit===1000?'unitats de miler':unit===100?'centenes':'desenes'}.`;
      q.answer=String(result);q.steps=[`La unitat d’arrodoniment és ${unit}.`,`${n} queda entre ${Math.floor(n/unit)*unit} i ${(Math.floor(n/unit)+1)*unit}.`,`El múltiple més proper és ${result}; en cas d’empat triem el superior.`];
    }
    if(id==='decimal_sys'&&t===2){
      const n=ns[0],terms=String(n).split('').map((d,i,ds)=>Number(d)*10**(ds.length-i-1)).filter(Boolean);
      q.question=`Descompon el nombre ${n} com a suma segons el valor posicional de les xifres.`;
      q.answer=terms.join(' + ');q.steps=[`Cada xifra aporta el seu valor posicional.`,`${n} = ${q.answer}`];
    }
    if(id==='decimal_sys'&&t===1){
      const n=ns[1],digits=String(n),digit=ns[0]||Number(digits[0]),index=ns[0]?digits.indexOf(String(digit)):0,value=digit*10**(digits.length-index-1);
      const names=['unitats','desenes','centenes','milers','desenes de miler','centenes de miler'];
      q.question=`En el nombre ${n}, quin valor representa la xifra ${digit} ${digits.length-index-1===3?'dels':'de les'} ${names[digits.length-index-1]}? Escriu el valor en unitats.`;
      q.answer=String(value);q.steps=[`${digit} × ${10**(digits.length-index-1)} = ${value}`];
    }
    if(id==='decimal_sys'&&t===4){
      const pos=['unitats','desenes','centenes','milers'].findIndex(x=>source.includes('de les '+x)),unit=10**pos;
      let n=ns[0];if(Math.floor(n/unit)%10===0)n+=unit;
      const digit=Math.floor(n/unit)%10;
      q.question=`En el nombre ${n}, quin valor representa la xifra ${pos===3?'dels':'de les'} ${['unitats','desenes','centenes','milers'][pos]}?`;
      q.answer=String(digit*unit);q.steps=[`La xifra indicada és ${digit}.`,`${digit} × ${unit} = ${digit*unit}`];
    }
    if(id==='ops'&&t===4){
      const [n,d]=ns,quotient=Math.floor(n/d),remainder=n%d;
      q.divisionMode=remainder?'remainder':'exact';
      q.question=remainder?`Calcula el quocient enter i el residu de ${n} ÷ ${d}.`:`Calcula la divisió exacta ${n} ÷ ${d}.`;
      q.answer=`Quocient: ${quotient}; residu: ${remainder}.`;
      q.steps=[`${n} = ${d} × ${quotient} + ${remainder}`,`Es compleix 0 ≤ ${remainder} < ${d}.`,remainder?'La divisió no és exacta.':'La divisió és exacta perquè el residu és zero.'];
    }
    if(id==='ops'&&t===5){
      const [quantity,price,paid]=ns,cost=quantity*price,payment=paid===cost?paid+10:paid;
      q.question=`La Maria compra ${quantity} quaderns a ${price} € cadascun. Paga ${payment} €. Quin canvi rep?`;
      q.answer=`${payment-cost} €`;q.steps=[`${quantity} × ${price} = ${cost} €`,`${payment} − ${cost} = ${payment-cost} €`];
    }
    if(id==='naturals'&&t===4){const [total,groups]=ns,unit=/llibres/.test(source)?'llibres':'paquets';q.question=unit==='llibres'?`Una escola reparteix ${total} llibres a parts iguals entre ${groups} aules. Quants llibres rep cada aula?`:`Un magatzem distribueix ${total} paquets a parts iguals entre ${groups} botigues. Quants paquets rep cada botiga?`;q.answer=`${total/groups} ${unit}`;q.steps=[`${total} ÷ ${groups} = ${total/groups}`,`Cada ${unit==='llibres'?'aula':'botiga'} rep ${q.answer}.`];}
    if(id==='decimals'&&t===1){const a=ns[0],b=Number.isInteger(ns[0])&&Number.isInteger(ns[1])?ns[1]+0.1:ns[1],result=(Math.round(a*10)+Math.round(b*10))/10;q.question=`Calcula: ${a.toFixed(1)} + ${b.toFixed(1)}.`;q.answer=result.toFixed(1);q.steps=[`${a.toFixed(1)} + ${b.toFixed(1)} = ${q.answer}`];}
    if(id==='decimals'&&t===3){
      let scaled=Math.round(ns[0]*1000);if(scaled%10===0)scaled+=rnd(1,9);
      const result=Math.floor((scaled+5)/10)/100;
      q.question=`Arrodoneix ${(scaled/1000).toFixed(3)} a les centèsimes.`;q.answer=result.toFixed(2);
      q.steps=[`La xifra de les mil·lèsimes és ${scaled%10}.`,scaled%10>=5?'Cal augmentar una centèsima.':'Es manté la xifra de les centèsimes.',`Resultat: ${q.answer}`];
    }
    if(id==='decimals'&&t===8){
      let cents=Math.round(ns[0]*100);if(cents%10===0)cents+=rnd(1,9);
      const tenths=Math.floor((cents+5)/10),error=Math.abs(cents-tenths*10)/100;
      q.question=`El valor exacte és ${(cents/100).toFixed(2)} i s’ha arrodonit a les dècimes: ${(tenths/10).toFixed(1)}. Calcula l’error absolut.`;
      q.answer=error.toFixed(2);q.steps=[`Error absolut = |valor exacte − valor aproximat|`,`|${(cents/100).toFixed(2)} − ${(tenths/10).toFixed(1)}| = ${q.answer}`];
    }
    if(id==='decimals'&&t===6){
      const [a,b,c,paid]=ns,total=Math.round((a+b+c)*10)/10,payment=paid===total?paid+1:paid;
      q.question=`Compres tres articles de ${a.toFixed(1)} €, ${b.toFixed(1)} € i ${c.toFixed(1)} €. Pagues ${payment} €. Quin canvi reps?`;
      q.answer=`${(payment-total).toFixed(1)} €`;q.steps=[`${a} + ${b} + ${c} = ${total} €`,`${payment} − ${total} = ${(payment-total).toFixed(1)} €`];
    }
    if(id==='fraccions'&&[3,4,5].includes(t)){
      let [a,b,c,d]=ns;if(a===b)a=b-1;if(c===d)c=d-1;
      if(t===5&&a*d===b*c||t===4&&a*c===b*d)a=a===1?2:a-1;
      const numerator=t===3?a*d+c*b:t===4?a*c:a*d,denominator=t===5?b*c:b*d,g=gcd(numerator,denominator);
      const op=t===3?'+':t===4?'×':'÷';q.question=`Calcula i simplifica: ${a}/${b} ${op} ${c}/${d}.`;
      q.answer=`${numerator/g}/${denominator/g}`;
      q.steps=[t===3?`${a}/${b} + ${c}/${d} = ${a*d}/${b*d} + ${c*b}/${b*d}`:t===4?`Multipliquem numeradors i denominadors.`:`Dividim multiplicant per la fracció inversa: ${a}/${b} × ${d}/${c}.`,`${numerator}/${denominator} = ${q.answer}`];
    }
    if(id==='fraccions'&&t===11)q.question=q.question.replace(/\?$/,'.');
    if(id==='divis'&&t===7)q.question+=' Comprova per separat les dues possibilitats.';
    if(id==='fraccions'&&t===7){
      q.question=q.question.replace(' es equivalent',' és equivalent');
      const [a,b]=ns,value=a/b,correct=q.answer;
      const isEquivalent=v=>{const m=v.match(/^(\d+)\/(\d+)$/);return m&&Math.abs(Number(m[1])/Number(m[2])-value)<1e-12;};
      q.options=[correct,...q.options.filter(v=>v!==correct&&!isEquivalent(v))];
      for(let k=1;q.options.length<4&&k<=8;k++){const v=`${a+k}/${b}`;if(!isEquivalent(v)&&!q.options.includes(v))q.options.push(v);}
      q.options=shuffle(q.options.slice(0,4));
    }
    if(id==='divis'&&t===2){const [n,d]=ns;q.answer=n%d===0?`Sí, és divisible per ${d}.`:`No, no és divisible per ${d}.`;q.steps=[`${n} = ${d} × ${Math.floor(n/d)} + ${n%d}`,q.answer];}
    if(id==='divis'&&[1,3,5,6].includes(t)){
      const isPrime=n=>{if(n<2)return false;for(let d=2;d*d<=n;d++)if(n%d===0)return false;return true;};
      let correct=Number(q.answer),valid;
      if(t===6){const n=ns[0];if(!Number.isInteger(correct)||n%correct===0)correct=Array.from({length:n-2},(_,i)=>i+2).find(d=>n%d!==0);valid=v=>n%v!==0;q.steps=[`${n} = ${correct} × ${Math.floor(n/correct)} + ${n%correct}`,`El residu no és zero; ${correct} no és divisor de ${n}.`];}
      else valid=t===3?isPrime:v=>v%ns[0]===0;
      const options=[correct,...q.options.map(Number).filter(v=>v!==correct&&!valid(v))];
      for(let candidate=2;options.length<4&&candidate<=1000;candidate++)if(!valid(candidate)&&!options.includes(candidate))options.push(candidate);
      q.answer=String(correct);q.options=shuffle(options.slice(0,4).map(String));
    }
    if(id==='mcmmcd'&&t===5){
      const group=Object.keys(groupGrammar).find(g=>source.includes(g)),[adjective,quantifier]=groupGrammar[group];
      q.question=`${source.split('. Volem')[0]}. Volem fer el màxim nombre de ${group} ${adjective}, amb la mateixa quantitat de cada tipus i sense que sobri res. ${quantifier} ${group} podem fer?`;
    }
    if(id==='percentatges'&&t===3){q.question=q.question.replace(' es el ',' és el ').replace('quin es el','quin és el');q.answer=String(ns[0]*100/ns[1]);q.steps=[`El total és la part dividida pel percentatge expressat com a fracció.`,`${ns[0]} × 100 ÷ ${ns[1]} = ${q.answer}`];}
    if(id==='percentatges'&&t===5&&/Unes sabatilles/.test(q.question))q.question=q.question.replace('i té un descompte','i tenen un descompte');
    if(id==='proporcionalitat'&&t===6){const xs=ns.slice(0,3),ys=ns.slice(3,6),same=ys.every((y,i)=>y*xs[0]===ys[0]*xs[i]);q.answer=same?'Sí':'No';q.steps=ys.map((y,i)=>{const g=gcd(y,xs[i]);return `${y}/${xs[i]} = ${y/g}/${xs[i]/g}`;}).concat(same?'Les tres raons són iguals; la relació és directament proporcional.':'Les raons no són totes iguals; la relació no és directament proporcional.');}
    if(id==='proporcionalitat'&&t===2&&ns[0]===ns[2]){const [x,y]=ns,k=y/x,next=x+1;q.question=`Completa la taula proporcional: ${x} → ${y}; ${next} → ?`;q.answer=String(next*k);q.steps=[`Constant: ${y} ÷ ${x} = ${k}`,`${next} × ${k} = ${next*k}`];}
    q.steps=q.steps.map(s=>s.replace(/^Simplif:/,'Simplificació:').replace(/^Creuats:/,'Productes creuats:'));
    return finish({...q,fingerprint:JSON.stringify([id,t,q.question,q.answer,q.options]),audit:{topic:id,type:t}});
  }
  function generateBranch(id,type){
    const original=rnd;let first=true;
    try{rnd=(a,b)=>{if(first){first=false;return type;}return original(a,b);};return adapt(id,generators[id]());}finally{rnd=original;}
  }
  // Revisió manual de les branques type: dades i contextos nous no creen famílies.
  const definitions={
    naturals:[[1,'ordenar'],[1,'comparar'],[2,'arrodonir'],[2,'problema-suma'],[3,'produccio']],
    decimal_sys:[[1,'valor'],[2,'descompondre'],[2,'reconstruir'],[2,'valor']],
    ops:[[1,'suma'],[1,'resta'],[2,'producte'],[2,'divisio'],[2,'compra'],[3,'produccio']],
    potencies:[[1,'components','potencies'],[1,'components','potencies'],[1,'escriure-potencia','potencies'],[1,'producte-factors','potencies'],[2,'calcular-potencia','potencies'],[2,'arrel','arrels'],[2,'arrel','arrels']],
    jerarquia:[[1,'productes-sumes'],[1,'productes-sumes'],[2,'potencia'],[2,'parentesis'],[2,'parentesis'],[3,'potencia-parentesis'],[3,'compra'],[3,'claudators'],[3,'claudators-potencia']],
    divis:[[1,'triar-multiple'],[1,'comprovar-divisibilitat'],[2,'primer'],[2,'factoritzar'],[1,'triar-multiple'],[2,'excloure-divisor'],[3,'agrupacions']],
    mcmmcd:[[1,'calcul-mcd','mcd'],[1,'calcul-mcm','mcm'],[2,'mcm-tres','mcm'],[2,'periodicitat','mcm'],[3,'repartiment','mcd']],
    enters:[[1,'ordenar'],[1,'suma'],[2,'resta'],[2,'producte'],[2,'temperatura'],[3,'saldo'],[1,'recta']],
    decimals:[[1,'suma'],[2,'producte'],[2,'arrodonir'],[2,'fraccio-decimal'],[2,'decimal-fraccio'],[2,'canvi'],[3,'taxa'],[2,'error-absolut'],[3,'error-relatiu']],
    fraccions:[[1,'simplificar'],[1,'suma-igual'],[2,'suma-diferent'],[2,'producte'],[2,'divisio'],[2,'comparar'],[1,'equivalent'],[3,'romanent'],[1,'classificar'],[1,'part'],[1,'conversio']],
    proporcionalitat:[[1,'classificar'],[1,'completar-taula'],[3,'valor-unitari'],[3,'valor-unitari'],[1,'constant'],[2,'comprovar-taula'],[3,'valor-unitari'],[2,'factor']],
    percentatges:[[1,'part'],[1,'percentatge'],[2,'total'],[2,'augment'],[2,'descompte'],[2,'conversio'],[3,'enquesta']]
  };
  // A rationale is required for every challenge. High difficulty alone is
  // insufficient: longer products, powers and routine conversions are excluded.
  const challenges={decimal_sys:{intercanvi:'Relacionar la variació de valor amb la posició de dues xifres.'}};
  function classify(id,row){
    const reason=challenges[id]?.[row.family.slice(id.length+1)]||'';
    return {...row,challenge:!!reason,challengeReason:reason,standard:row.level<=2&&!reason,cognitiveDemand:reason?'reasoning-analysis':'routine-procedure'};
  }
  function families(id){
    const rows=definitions[id].map(([level,family,content])=>({level,family:id+':'+family,contents:[content||id]}));
    if(id==='potencies')rows.push({level:3,family:id+':combinada',contents:['potencies','arrels']});
    if(id==='decimal_sys')rows.push({level:3,family:id+':intercanvi',contents:[id]});
    return rows.map(row=>classify(id,row));
  }
  const legacyFamilies=families;
  function topicFamilies(id){
    const rows=[];
    legacyFamilies(id).forEach((f,index)=>{const prior=rows.find(x=>x.family===f.family&&x.level===f.level);if(prior)prior.types.push(index+1);else rows.push({...f,generatorId:f.family+'@'+f.level,types:index<definitions[id].length?[index+1]:[]});});
    return rows.concat(window.MIWorksheetReasoning.families(id));
  }
  window.MIWorksheetConfig={id:'1eso-numeric',worksheetTypes:true,title:'Fitxa d’exercicis — 1r d’ESO — Sentit numèric',web:'srigual-png.github.io/mates-interactives',paperQuestion,display,adapt,generateBranch,groupGrammar,
    inventory:Object.fromEntries(Object.entries(definitions).map(([id,rows])=>[id,rows.map((r,i)=>({type:i+1,family:r[1],level:r[0]}))])),
    topics:TOPICS.filter(t=>t.course==='1r').map(t=>{
      const bank=generators[t.id]?topicFamilies(t.id):[];
      function generateFamily(id){
        const f=bank.find(f=>(f.generatorId||f.family)===id)||bank.find(f=>f.family===id);if(!f)throw new Error('Família desconeguda: '+id);
        let q;
        if(f.extensionId)q=window.MIWorksheetReasoning.generate(t.id,f.extensionId);
        else if(f.types.length)q=generateBranch(t.id,f.types[rnd(0,f.types.length-1)]);
        else q=t.id==='potencies'?advancedPowers():advancedPlaceValue();
        return finish({...q,...f,variant:JSON.stringify(q.audit?.data||[q.question,q.answer])});
      }
      return {id:t.id,name:t.name,balanceContents:t.id==='mcmmcd',requiredContents:t.id==='mcmmcd'?['mcd','mcm']:t.id==='potencies'?['potencies','arrels']:[t.id],families:bank,levels:generators[t.id]?[1,2,3]:[],generateFamily,generate(l){const choices=bank.filter(f=>f.level===l);const choice=choices[rnd(0,choices.length-1)];return generateFamily(choice.generatorId||choice.family);},metadata(q){return bank.find(f=>q.generatorId?f.generatorId===q.generatorId:f.family===q.family);}};
    })};
})();
