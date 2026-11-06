window.MIMcdMcm = (() => {
  const families = [[['P1'],['P2'],['P3']],[['A1'],['A2'],['A3'],['A4'],['A5'],['P4']],[['A6'],['P5'],['P6']]];
  const anchors = {A1:'mcd-factors',A2:'mcm-factors',A3:'coincidencies',A4:'lots',A5:'talls',
    A6:'coincidencies-desfasades',P1:'divisors-comuns',P2:'multiples-comuns',P3:'casos-especials',
    P4:'triar-mcd-mcm',P5:'operand-desconegut',P6:'errors-factors'};
  const units = {segons:['s','segon','segons'],minuts:['min','minut','minuts'],lots:['lot','lots'],
    cm:['cm','centímetre','centímetres'],trossos:['tros','trossos'],
    vermells:['vermell','llapis vermell','llapis vermells','vermells'],blaus:['blau','llapis blau','llapis blaus','blaus']};
  const range = (lo,hi) => Array.from({length:hi-lo+1},(_,i)=>lo+i);
  const number = (label,value,unit) => ({label,value,unit});
  const pick = (items,rnd) => items[rnd(0,items.length-1)];
  function factorText(n){
    const factors=[];
    for(let d=2;d*d<=n;d++){
      let exponent=0;
      while(n%d===0){n/=d;exponent++;}
      if(exponent)factors.push(d+(exponent===1?'':exponent===2?'²':exponent===3?'³':'^'+exponent));
    }
    if(n>1)factors.push(String(n));
    return factors.join(' × ')||'1';
  }

  function fieldMatches(field,input){
    const text=String(input).trim();
    if(!text||text.length>180)return false;
    if(field.options)return text===field.value;
    if(field.factor)return field.value===1?text==='1':MIDivisibilitat.matches({kind:'factor',n:field.value},text);
    if(field.list)return MIDivisibilitat.matches({kind:'list',values:field.value},text);
    const match=text.match(/^(\d{1,10})(?:\s*([\p{L}]+(?:\s+[\p{L}]+)*))?$/u);
    return !!match&&Number(match[1])===field.value&&(!match[2]||field.unit?.includes(match[2].toLowerCase().replace(/\s+/g,' ')));
  }
  function matches(fields,input){
    if(String(input).length>600)return false;
    const parts=String(input).split(';');
    return parts.length===fields.length&&fields.every((field,i)=>fieldMatches(field,parts[i]));
  }
  function display(field){
    if(field.list)return field.value.join(', ');
    if(field.factor)return factorText(field.value);
    return String(field.value)+(field.unit?' '+field.unit.at(-1):'');
  }
  const values = fields => fields.map(display).join('; ');
  function exercise(type,question,fields,wrong,guide,solution,key){
    const correct=values(fields), options=[correct,...wrong];
    if(new Set(options).size!==4||options.length!==4||options.filter(v=>matches(fields,v)).length!==1){
      throw Error('Opcions incoherents de '+type);
    }
    return {type,question,correct,options:shuffle(options),mcmFields:fields,mcmTheory:anchors[type],
      guide:[guide],solution,practiceKey:type+':'+key};
  }
  const factors = (label,value) => ({label,value,factor:true});
  const choice = (label,value,options) => ({label,value,options});
  const groupPairs = [[2,3],[2,5],[3,4],[3,5],[4,5],[4,7],[5,6],[5,7]];

  function context(type,rnd){
    if(type==='A3'){
      const a=rnd(4,18),b=pick(range(5,24).filter(n=>n!==a),rnd),n=lcm(a,b);
      return {a,b,n,key:[a,b].sort((x,y)=>x-y).join(':'),
        question:`Dues alarmes sonen alhora ara. Una sona cada ${a} segons i l’altra cada ${b} segons. Al cap de quants segons tornaran a sonar juntes per primera vegada?`,
        fields:[number('Temps fins a la coincidència',n,units.segons)],
        solution:[`Els temps han de ser múltiples positius de ${a} i de ${b} perquè les alarmes han començat alhora.`,`mcm(${a}, ${b}) = ${n} segons.`]};
    }
    const g=rnd(3,18),[x,y]=pick(groupPairs,rnd),a=g*x,b=g*y,talls=type==='A5';
    const question=talls?`Tenim una corda de ${a} cm i una de ${b} cm. Les tallem en trossos tan llargs com sigui possible, tots de la mateixa longitud i sense sobrants.`:
      `Tenim ${a} llapis vermells i ${b} de blaus. Volem fer el màxim nombre de lots idèntics sense sobrants. Cada lot ha de tenir tants vermells com qualsevol altre lot i tants blaus com qualsevol altre lot.`;
    const fields=talls?[number('Longitud de cada tros (cm)',g,units.cm),number('Trossos de la primera corda',x,units.trossos),number('Trossos de la segona corda',y,units.trossos)]:
      [number('Nombre de lots',g,units.lots),number('Vermells per lot',x,units.vermells),number('Blaus per lot',y,units.blaus)];
    return {a,b,n:g,key:a+':'+b,question,fields,
      solution:[`El divisor comú més gran és MCD(${a}, ${b}) = ${g}.`,
        talls?`Cada tros fa ${g} cm. Obtenim ${a} ÷ ${g} = ${x} trossos de la primera corda i ${b} ÷ ${g} = ${y} de la segona.`:
          `Fem ${g} lots. Cada lot té ${a} ÷ ${g} = ${x} vermells i ${b} ÷ ${g} = ${y} blaus.`]};
  }

  function generate(type,rnd){
    const task=(...args)=>exercise(type,...args);
    if(type==='A1'||type==='A2'){
      const a=rnd(6,36),b=pick(range(6,36).filter(n=>n!==a),rnd);
      const isMcd=type==='A1',operands=!isMcd&&rnd(0,2)===0?[a,b,pick(range(4,16).filter(n=>n!==a&&n!==b),rnd)]:[a,b];
      const op=isMcd?'MCD':'mcm',n=operands.reduce(isMcd?gcd:lcm);
      const fields=[factors('Factors primers seleccionats',n),number('Resultat',n)];
      return task(`Calcula el ${op} de ${operands.join(', ')}. Escriu el producte dels factors primers seleccionats i el resultat.`+
        (isMcd?' Si no hi ha factors comuns, escriu 1 al camp dels factors.':''),
        fields,[n+1,n+2,n+3].map(w=>values([factors('',w),number('',w)])),
        isMcd?'Pren els factors comuns amb l’exponent més petit.':'Pren tots els factors necessaris amb l’exponent més gran.',
        [...operands.map(v=>v+' = '+factorText(v)),n===1?'No hi ha factors primers comuns. El MCD és 1.':`${op} = ${factorText(n)} = ${n}.`],
        operands.sort((x,y)=>x-y).join(':'));
    }
    if(['A3','A4','A5'].includes(type)){
      const c=context(type,rnd);
      const ask=type==='A4'?' Quants lots podem fer i quants llapis de cada color hi haurà a cada lot?':
        type==='A5'?' Quants centímetres farà cada tros i quants trossos obtindrem de cada corda?':'';
      const wrong=[1,2,3].map((delta,i)=>values(c.fields.map((field,j)=>j===i%c.fields.length?{...field,value:field.value+delta}:field)));
      return task(c.question+ask,c.fields,wrong,'Pensa què ha de ser comú a les dues quantitats.',c.solution,c.key);
    }
    if(type==='P1'||type==='P2'){
      const divisors=type==='P1',a=divisors?rnd(4,36):rnd(2,12);
      const b=divisors?pick(range(4,36).filter(n=>n!==a),rnd):pick(range(2,12).filter(n=>n!==a&&lcm(a,n)<=60),rnd);
      const n=divisors?gcd(a,b):lcm(a,b),limit=divisors?0:n*rnd(2,3);
      const items=divisors?MIDivisibilitat.divisors(n):range(1,limit/n).map(k=>k*n);
      const field={label:divisors?'Divisors comuns':'Múltiples comuns positius',value:items,list:true};
      const extremum=number(divisors?'MCD':'mcm',n);
      const question=divisors?`Escriu tots els divisors positius comuns de ${a} i ${b}. Quin és el més gran?`:
        `Escriu tots els múltiples comuns positius de ${a} i ${b} fins a ${limit}, inclòs. Quin és el més petit?`;
      const wrong=[values([{...field,value:items.length>1?items.slice(0,-1):[2]},extremum]),
        values([{...field,value:[...items,divisors?n+1:0]},extremum]),values([field,{...extremum,value:n+1}])];
      return task(question,[field,extremum],wrong,divisors?'Comprova quins divisors apareixen a les dues llistes.':'Comença pels múltiples positius i arriba fins al límit.',
        [divisors?`Divisors de ${a}: ${MIDivisibilitat.divisors(a).join(', ')}. Divisors de ${b}: ${MIDivisibilitat.divisors(b).join(', ')}.`:
          `Escrivim els múltiples positius de ${Math.max(a,b)} fins a ${limit} i conservem els divisibles per ${Math.min(a,b)}.`,
          `Comuns: ${items.join(', ')}. ${extremum.label} = ${n}.`],[a,b].sort((x,y)=>x-y).join(':')+':'+limit);
    }
    if(type==='P3'){
      const a=rnd(4,12),nested=rnd(0,1)===0;
      const b=nested?a*rnd(2,4):pick(range(a+1,20).filter(n=>gcd(a,n)===1),rnd);
      const g=nested?a:1,l=nested?b:a*b;
      return task((nested?`${b} és múltiple de ${a}.`:`${a} i ${b} només tenen l’1 com a divisor comú.`)+
        ' Indica el MCD i el mcm sense factoritzar.',[number('MCD',g),number('mcm',l)],
        [`${l}; ${g}`,`${g+1}; ${l}`,`${g}; ${l+1}`],
        'Aprofita la relació que ja coneixes entre els dos nombres.',
        nested?[`${a} divideix tots dos nombres i cap divisor seu és més gran que ${a}.`,`${b} ja és múltiple de tots dos i és el primer múltiple positiu de ${b}.`]:
          ['El MCD és 1. Com que no comparteixen cap factor primer, per formar el mcm calen tots els factors dels dos nombres.',`Multipliquem: ${a} × ${b} = ${l}.`],a+':'+b);
    }
    if(type==='P4'){
      const sync=rnd(0,1)===0,c=context(sync?'A3':'A4',rnd),op=sync?'mcm':'MCD',other=sync?'MCD':'mcm';
      const commonDivisor='Busquem el divisor comú més gran.';
      const commonMultiple='Busquem el primer múltiple positiu comú.';
      const reason=sync?commonMultiple:commonDivisor,wrongReason=sync?commonDivisor:commonMultiple;
      const fields=[choice('Quina operació faries?',op,['MCD','mcm']),
        choice('Per què?',reason,[commonDivisor,commonMultiple]),c.fields[0]];
      const formatted=display(fields[2]);
      return task(c.question+(sync?'':' Quants lots podem fer?'),fields,
        [`${other}; ${wrongReason}; ${formatted}`,`${op}; ${wrongReason}; ${formatted}`,`${op}; ${reason}; ${c.n+1} ${sync?'segons':'lots'}`],
        'Què ha de complir el resultat respecte de cadascuna de les dues quantitats?',c.solution,op+':'+c.key);
    }
    if(type==='P5'){
      const findMcd=rnd(0,1)===0,op=findMcd?'MCD':'mcm',calculate=findMcd?gcd:lcm;
      let data;
      for(let i=0;i<12&&!data;i++){
        const a=rnd(6,24),n=rnd(10,30),target=calculate(a,n),lo=n-rnd(3,7),hi=n+rnd(3,7);
        const initial=range(lo,hi).filter(v=>findMcd?v%target===0:target%v===0);
        const valid=range(lo,hi).filter(v=>calculate(a,v)===target);
        if(initial.length>=2&&valid.length===1)data={a,n,target,lo,hi,initial};
      }
      const {a,n,target,lo,hi,initial}=data||(findMcd?{a:12,n:18,target:6,lo:13,hi:25,initial:[18,24]}:
        {a:12,n:18,target:36,lo:10,hi:20,initial:[12,18]});
      const wrong=[...initial,...range(lo,hi)].filter((v,i,all)=>v!==n&&all.indexOf(v)===i).slice(0,3);
      return task(`Quin enter entre ${lo} i ${hi}, tots dos inclosos, té un ${op} de ${target} amb ${a}?`,
        [number('Nombre desconegut',n)],wrong.map(String),
        findMcd?'L’operand ha de ser múltiple del MCD.':'L’operand ha de ser divisor del mcm.',
        [`Després de filtrar l’interval queden ${initial.join(', ')}.`,
          initial.map(v=>`${op}(${a}, ${v}) = ${calculate(a,v)}`).join('. ')+'.',`Només ${n} dona ${target}.`],op+':'+a+':'+target+':'+lo+':'+hi);
    }
    if(type==='P6'){
      const mcd=rnd(0,1)===0,p=pick([2,3,5],rnd),q=pick([2,3,5,7].filter(v=>v!==p),rnd);
      const a=p*p*q,b=mcd?p*q*q:p*q*pick([2,3,5,7].filter(v=>v!==p&&v!==q),rnd);
      const op=mcd?'MCD':'mcm',n=mcd?gcd(a,b):lcm(a,b),wrong=mcd?p*p*q:a;
      const reason=mcd?`Ha triat l’exponent més gran del factor ${p} en lloc del més petit.`:
        `Ha oblidat el factor primer ${b/(p*q)}.`;
      const reasons=[reason,'Ha sumat els dos nombres.','Ha multiplicat els dos nombres sense revisar els factors.'];
      return task(`${a} = ${factStr(a)} i ${b} = ${factStr(b)}. Un alumne diu que el ${op} és ${factStr(wrong)} = ${wrong}. Què ha fet malament i quin és el resultat correcte?`,
        [choice('Quin error ha fet?',reason,reasons),number(op+' correcte',n)],
        [`${reasons[1]}; ${n}`,`${reasons[2]}; ${n}`,`${reason}; ${wrong}`],
        'Compara els factors un per un i revisa els exponents.',
        [reason,mcd?'Per al MCD, conserva els factors comuns amb l’exponent més petit.':'Per al mcm, inclou tots els factors amb l’exponent més gran.',`${op} = ${factStr(n)} = ${n}.`],
        op+':'+a+':'+b);
    }
    throw Error('Família desconeguda de MCD i mcm: '+type);
  }

  function bank(type,rnd){
    const common={topicId:'mcmmcd',topicName:'MCD i mcm',cat:'MCD i mcm',type,variantId:'mcmmcd-'+type,diff:type===4?3:2,dataBox:null};
    const reply=fields=>({mcmFields:fields,val:values(fields),check:value=>matches(fields,value)});
    if(type===1){
      const a=rnd(12,60),b=pick(range(12,72).filter(n=>n!==a),rnd);
      const factorsRequired=[factors('Factorització de '+a,a),factors('Factorització de '+b,b)];
      const fields=[number('MCD',gcd(a,b)),number('mcm',lcm(a,b))];
      const examText=`Calcula el MCD i el mcm de ${a} i ${b}. Escriu els dos resultats en aquest ordre, separats per un punt i coma.`;
      return {...common,mcmTheory:anchors.A1,examText,text:`Calcula el MCD i el mcm de ${a} i ${b} utilitzant la factorització en nombres primers. A la resposta final escriu MCD; mcm, en aquest ordre.`,
        steps:factorsRequired.map(field=>({label:field.label,required:true,hint:'Descompon el nombre en factors primers.',check:v=>fieldMatches(field,v)})),
        answer:reply(fields),examAnswer:reply(fields),bankAnswerText:values([...factorsRequired,...fields]),
        hints:[`${a} = ${factStr(a)}. ${b} = ${factStr(b)}.`,`MCD = ${fields[0].value}. mcm = ${fields[1].value}.`]};
    }
    const family=['','','A3','A4','A5'][type],c=context(family,rnd);
    const ask=type===3?' Quants lots, quants vermells per lot i quants blaus per lot?':
      type===4?' Quants centímetres fa cada tros, quants trossos surten de la primera corda i quants de la segona?':'';
    const text=c.question+ask+(type===2?'':' Escriu els tres valors en aquest ordre i separats per punt i coma.');
    return {...common,text,mcmTheory:anchors[family],answer:reply(c.fields),
      steps:c.fields.map(field=>({label:field.label,hint:'Revisa la quantitat que es demana en aquest camp.',check:v=>fieldMatches(field,v)})),hints:c.solution};
  }

  function reserve(family,level){
    if(level!==1)return [];
    const type=family[0];
    return range(0,7).map(i=>{
      const draws=type==='P3'?[4+i,i%2,0]:type==='P1'?[4+i,i,2]:[2+i,i%2,2];
      return {...generate(type,(min,max)=>Math.max(min,Math.min(max,draws.shift()??min))),taskDifficulty:1,diff:1};
    });
  }
  const isAnchor = value => Object.values(anchors).includes(value);
  return {families,anchors,units,number,matches,generate,bank,reserve,isAnchor};
})();
