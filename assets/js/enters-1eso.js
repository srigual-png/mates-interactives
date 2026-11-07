/* Catàleg de pràctica d'enters. Els exàmens conserven els generadors heretats. */
(function(root){
  'use strict';
  const anchors=['recta','sumar','restar','multiplicar','moviments','problemes','distancia-enters','posicio-canvi','moviments-limits','valor-absolut','oposat','recta-graduada','valor-inicial','operacio-incompleta','errors-signes','simetria','combinades'];
  const families=[[1,2,3,4,5,10,11,12],[6,7,8,14,17],[9,13,15,16]].map(level=>level.map(n=>['E'+String(n).padStart(2,'0')]));
  const sign=n=>n>=0?'+'+n:String(n);
  const normalize=s=>String(s??'').trim().replace(/[−–—﹣]/g,'-');
  function integer(s,unit=''){
    s=normalize(s);
    if(unit&&s.endsWith(unit))s=s.slice(0,-unit.length).trim();
    if(!/^[+-]?\d+$/.test(s))return null;
    const n=Number(s);return Number.isSafeInteger(n)?(n===0?0:n):null;
  }
  const number=(label,value,unit='')=>({label,value,unit,integer:true});
  function matches(model,input){
    if(!model)return false;
    if(model.kind==='comparison'){
      const t=normalize(input);if(['<','>','='].includes(t))return t===model.relation;
      const m=t.match(/^([+-]?\d+)\s*([<>=])\s*([+-]?\d+)$/);
      return !!m&&integer(m[1])===model.a&&integer(m[3])===model.b&&m[2]===model.relation;
    }
    if(model.kind==='order'){
      const text=normalize(input),parts=text.split(/[<>]/).map(x=>integer(x));
      return parts.length===model.values.length&&parts.every((n,i)=>n!==null&&n===model.values[i])&&
        (text.match(/[<>]/g)||[]).every(s=>s===model.separator)&&
        (text.match(/[<>]/g)||[]).length===model.values.length-1;
    }
    const parts=Array.isArray(input)?input:normalize(input).split(';');
    return parts.length===model.fields.length&&parts.every((part,i)=>{
      const f=model.fields[i];return f.options?String(part).trim()===f.value:integer(part,f.unit)===f.value;
    });
  }
  function options(answer,candidates){
    const all=[...new Set([answer,...candidates].map(String))];
    if(all.length<4)throw Error('Distractors insuficients');
    return all.slice(0,4);
  }
  // Numeric alternatives represent sign, inverse-operation and counting mistakes.
  function numericOptions(n,candidates=[]){
    return options(n,[...candidates,-n,Math.abs(n),n*2,Math.trunc(n/2),0,n+1,n-1,n+2,n-2]);
  }
  function recta(start,step,target){
    const labels=Array.from({length:7},(_,i)=>i===target?'A':String(start+i*step));
    const alt='Recta amb set marques equidistants: '+labels.join(', ')+'.';
    return '<svg viewBox="0 0 460 96" style="display:block;width:100%;max-width:600px;height:auto" role="img" aria-label="'+alt+'"><line x1="20" y1="43" x2="440" y2="43" stroke="currentColor" stroke-width="2"/>'+labels.map((label,i)=>'<line x1="'+(35+i*65)+'" y1="35" x2="'+(35+i*65)+'" y2="51" stroke="currentColor"/><text x="'+(35+i*65)+'" y="76" text-anchor="middle" font-size="18" fill="currentColor">'+label+'</text>').join('')+'</svg>';
  }
  function generate(id,r=(a,b)=>a+Math.floor(Math.random()*(b-a+1))){
    const n=Number(id.slice(1)),level=families.findIndex(g=>g.some(f=>f[0]===id))+1;
    let a=r(-20,20),b=r(-12,12),c=r(-8,8),answer,question,solution,guide,model,opts,key;
    const fields=(...f)=>({kind:'fields',fields:f});
    if(n===1){
      if(r(0,1)){
        const relation=a<b?'<':a>b?'>':'=';
        answer=`${a} ${relation} ${b}`;question=`Completa amb &lt;, &gt; o =: (${a}) □ (${b}).`;
        model={kind:'comparison',a,b,relation};
        opts=[answer,...['<','>','='].filter(x=>x!==relation).map(x=>`${a} ${x} ${b}`),`${a+1} = ${a+2}`];
        solution=[`${a} ${relation==='<'?'&lt;':relation==='>'?'&gt;':'='} ${b}: compara les posicions a la recta.`];key=['compare',a,b];
      }else{
        const nums=[a,a+r(1,4),a+r(5,9),a+r(10,14)],asc=!!r(0,1),sorted=nums.slice().sort((x,y)=>asc?x-y:y-x),sep=asc?'<':'>';
        answer=sorted.join(' '+sep+' ');model={kind:'order',values:sorted,separator:sep};
        question=`Ordena de ${asc?'menor a major':'major a menor'}: ${[nums[2],nums[0],nums[3],nums[1]].join(', ')}.`;
        opts=options(answer,[sorted.slice().reverse().join(' '+sep+' '),[sorted[1],sorted[0],...sorted.slice(2)].join(' '+sep+' '),sorted.join(' '+(asc?'>':'<')+' ')]);
        solution=[`Situa els nombres a la recta i llegeix-los ${asc?'d’esquerra a dreta':'de dreta a esquerra'}.`,answer.replace(/</g,'&lt;')];key=['order',nums,asc];
      }
      guide=['A la recta, el nombre de més a la dreta és més gran.'];
    }else if(n>=2&&n<=4){
      if(n===2&&r(0,4)===0)b=-a;
      const op=n===2?'+':n===3?'−':'×';answer=n===2?a+b:n===3?a-b:a*b;
      question=`Calcula (${a}) ${op} (${b}).`;
      solution=n===2?[a*b>0?'Mateix signe: suma els valors absoluts i conserva el signe.':'Signes diferents: resta els valors absoluts i conserva el signe del de més valor absolut. El zero no canvia la suma.',`${a} + (${b}) = ${answer}`]:n===3?[`Restar és sumar l’oposat: ${a} + (${-b}) = ${answer}.`]:['Signes iguals: positiu; diferents: negatiu. Si un factor és zero, el producte és zero.',`${a} × (${b}) = ${answer}`];
      guide=[solution[0]];opts=numericOptions(answer,[a+b,a-b,a*b,-a-b]);key=[a,b];
    }else if(n===5||n===6){
      b=(r(0,1)?1:-1)*r(1,12);c=(r(0,1)?1:-1)*r(1,12);
      const context=r(0,2),unit=context===0?'°C':context===1?'€':'plantes';
      const rectaContext=!!r(0,1);
      question=n===5?(rectaContext?`A la recta comences a ${a} i et mous ${Math.abs(b)} unitats cap a ${b>0?'la dreta':'l’esquerra'}. On arribes?`:`La temperatura és de ${a} °C i ${b>0?'puja':'baixa'} ${Math.abs(b)} °C. Quina temperatura fa, en °C?`):`El valor inicial ${context===0?'de la temperatura':context===1?'del saldo':'de la planta'} és ${a} ${unit}. Els canvis són ${sign(b)} i ${sign(c)} ${unit}. Quin és el valor final?`;
      answer=a+b+(n===6?c:0);model=fields(number('Resultat',answer,n===6?unit:rectaContext?'unitats':'°C'));solution=[`${a} + (${b}) = ${a+b}`,n===6?`${a+b} + (${c}) = ${answer}`:`Arribes a ${answer}.`];guide=['Representa cada canvi amb signe i aplica’ls en ordre.'];key=[a,b,n===6?c:null];
    }else if(n===7){
      answer=Math.abs(b-a);question=`Quina distància hi ha entre ${a} i ${b} a la recta numèrica? Respon en unitats.`;
      solution=[`Resta les posicions i pren el valor absolut: |${b} − (${a})| = ${answer} unitats.`,`La distància no és una posició i mai és negativa.`];guide=['Compta les unitats entre els punts, sense tenir en compte el sentit.'];opts=numericOptions(answer,[b-a,a-b,Math.abs(a)+Math.abs(b)]);key=[Math.min(a,b),Math.max(a,b)];
    }else if(n===8){
      a=-r(8,25);b=r(1,-a-1);c=r(1,15);const end=a+b-c,change=b-c;
      model=fields(number('Posició final (m)',end,'m'),number('Desplaçament net (m)',change,'m'));
      answer=`${end}; ${change}`;question=`Un submarinista és a ${a} m. Puja ${b} m i baixa ${c} m. Quina és la posició final i quin desplaçament net ha fet?`;
      opts=options(answer,[`${end}; ${-change}`,`${change}; ${end}`,`${a+b+c}; ${b+c}`,`${end}; ${b+c}`]);
      solution=[`Després de pujar: ${a+b} m.`,`Posició final: ${a+b} − ${c} = ${end} m.`,`Desplaçament net: ${end} − (${a}) = ${change} m.`];guide=['Calcula on acaba i després resta la posició inicial.'];key=[a,b,c];
    }else if(n===9){
      const ex=root.MIFirstNumericTasks.generate('moviments-amb-limits',()=>r(0,999999)/1000000);
      answer=Number(ex.correct);question=ex.question;solution=ex.solution;guide=ex.guide;key=ex.reasoningData;
      const {start,moves,lower,upper}=key;
      const perm=a=>a.length?a.flatMap((x,i)=>perm(a.filter((_,j)=>j!==i)).map(p=>[x,...p])):[[]];
      solution=perm(moves).map(order=>{let pos=start;const states=order.map(m=>(pos+=m));return order.map(sign).join(', ')+': '+[start,...states].join(' → ')+'. '+(states.every(v=>v>=lower&&v<=upper)?'Vàlid.':'No vàlid: algun estat queda fora dels límits.');}).concat(`En total: ${answer} ordres vàlids.`);
      opts=numericOptions(answer,[6-answer,6,0,answer===1?2:1]);
    }else if(n===10||n===11){
      const inverse=n===10&&!!r(0,1)&&a!==0;
      answer=n===11?-a:inverse?-Math.abs(a):Math.abs(a);
      question=n===11?`Quin és l’oposat de ${a}?`:inverse?`Quin enter negatiu es troba a ${Math.abs(a)} unitats del zero?`:`Quin és el valor absolut de ${a}?`;
      solution=n===11?[`L’oposat canvia el signe: ${answer}.`,`Comprovació: ${a} + (${answer}) = 0.`]:inverse?[`A l’esquerra del zero, a ${Math.abs(a)} unitats, hi ha ${answer}.`]:[`El valor absolut és la distància al zero: |${a}| = ${answer}.`];guide=[n===11?'Busca el nombre que sumat amb el donat fa zero.':'La distància és sempre positiva o zero; en la inversa respecta el signe demanat.'];key=[a,inverse];
    }else if(n===12){
      const step=[1,2,5][r(0,2)],target=r(1,5);answer=a+target*step;
      question='Quin nombre representa el punt A?'+recta(a,step,target);
      solution=[`Entre dues marques consecutives hi ha ${step} unitats.`,`Des de ${a}, avança ${target} intervals: ${a} + ${target} × ${step} = ${answer}.`];guide=['Troba l’escala amb dues referències i compta els intervals fins a A.'];opts=numericOptions(answer,[a+target,a+(target-1)*step,a+(target+1)*step]);key=[a,step,target];
    }else if(n===13){
      b=r(1,12);c=r(1,12);const end=a+b-c;answer=a;
      question=`La temperatura puja ${b} °C i després baixa ${c} °C. Al final és de ${end} °C. Quina temperatura hi havia al principi?`;
      solution=[`Desfés els canvis en ordre invers: ${end} + ${c} − ${b} = ${a} °C.`,`Comprovació: ${a} + ${b} − ${c} = ${end} °C.`];guide=['Desfés primer la baixada i després la pujada.'];opts=numericOptions(answer,[end+b-c,end-b-c,end+b+c]);key=[a,b,c];
    }else if(n===14){
      const subtract=!!r(0,1),left=!!r(0,1),result=subtract?a-b:a+b;answer=left?a:b;
      question=`Completa amb un enter: ${left?'□':`(${a})`} ${subtract?'−':'+'} ${left?`(${b})`:'□'} = ${result}.`;
      solution=[left?`Desfés l’última operació: ${result} ${subtract?'+':'−'} (${b}) = ${a}.`:subtract?`La quantitat restada és ${a} − (${result}) = ${b}.`:`Desfés la suma: ${result} − (${a}) = ${b}.`,`Comprovació: (${a}) ${subtract?'−':'+'} (${b}) = ${result}.`];guide=['Desfés l’operació i comprova la igualtat completa.'];opts=numericOptions(answer,[result+a,result-a,a-result]);key=[a,b,subtract,left];
    }else if(n===15){
      a=r(1,12);b=r(1,12);answer=a+b;
      const reason='Ha restat el valor absolut en lloc de sumar l’oposat del nombre negatiu.';
      const reasons=[reason,'Ha canviat el signe del primer nombre.','Ha multiplicat els dos nombres.','Ha aplicat la regla dels signes d’un producte a una suma.'];
      model=fields({label:'Motiu de l’error',value:reason,options:reasons},number('Resultat correcte',answer));
      question=`Un alumne escriu ${a} − (−${b}) = ${a-b}. Què ha fet malament i quin és el resultat correcte?`;
      answer=`${reason}; ${a+b}`;
      opts=[answer,`${reasons[1]}; ${-a+b}`,`${reasons[2]}; ${a*b}`,`${reasons[3]}; ${-a-b}`];
      solution=[`Restar −${b} és sumar +${b}, perquè són oposats.`,`${a} − (−${b}) = ${a} + ${b} = ${a+b}.`];guide=['En una resta només canvies el signe del segon nombre quan la transformes en suma.'];key=[a,b];
    }else if(n===16){
      if(a===b)b+=1;answer=2*b-a;
      question=`Un punt és a ${a}. On és el punt que està a la mateixa distància de ${b}, però a l’altra banda?`;
      solution=[`De ${a} a ${b} hi ha ${Math.abs(b-a)} unitats.`,`Continua ${Math.abs(b-a)} unitats en el mateix sentit des de ${b}: ${b} + (${b-a}) = ${answer}.`,`Comprovació: |${a} − (${b})| = |${answer} − (${b})|.`];guide=['Arriba al centre i repeteix el mateix desplaçament una altra vegada.'];opts=numericOptions(answer,[-a,a+b,a-b]);key=[a,b];
    }else if(n===17){
      const d=r(-6,6);answer=a*(b-c)+d;
      question=`Calcula (${a}) × (${b} − (${c})) + (${d}).`;
      solution=[`Parèntesis: ${b} − (${c}) = ${b-c}.`,`Producte: ${a} × (${b-c}) = ${a*(b-c)}.`,`Suma: ${a*(b-c)} + (${d}) = ${answer}.`];guide=['Primer parèntesis, després productes i finalment sumes o restes.'];opts=numericOptions(answer,[a*b-c+d,a*(b+c)+d,a*(b-c+d)]);key=[a,b,c,d];
    }else throw Error('Família desconeguda: '+id);
    model??=fields(number('Resultat',Number(answer),n===13?'°C':n===7?'unitats':''));
    if(answer===undefined)answer=model.fields.map(f=>f.value).join('; ');
    const correct=String(answer),entersFields=model.fields?.length>1?model.fields:undefined;
    const choices=(opts||numericOptions(Number(answer))).slice();
    for(let i=choices.length-1;i>0;i--){const j=r(0,i);[choices[i],choices[j]]=[choices[j],choices[i]];}
    return {type:id,entersFamily:id,entersTheory:anchors[n-1],entersAnswer:model,entersFields,
      entersOptionLabels:entersFields?.map(f=>f.label),question,correct,options:choices,guide,solution,
      taskDifficulty:level,diff:level,isProblem:[5,6,7,8,9,13,16].includes(n),practiceKey:id+':'+JSON.stringify(key)};
  }
  root.MIEnters=Object.freeze({anchors,families,integer,matches,generate,recta,number});
})(typeof window!=='undefined'?window:globalThis);
