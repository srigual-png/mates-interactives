/* Pràctica de sistema decimal de 1r d’ESO. */
(function(root){
  'use strict';

  const units=['u','dos','tres','quatre','cinc','sis','set','vuit','nou'];
  const teens=['deu','onze','dotze','tretze','catorze','quinze','setze','disset','divuit','dinou'];
  const tens=['','','vint','trenta','quaranta','cinquanta','seixanta','setanta','vuitanta','noranta'];
  const orders=['unitats','desenes','centenes','unitats de miler','desenes de miler','centenes de miler'];
  const singularOrders=['unitat','desena','centena','unitat de miler','desena de miler','centena de miler'];
  const orderName=(index,count)=>count===1?singularOrders[index]:orders[index];
  const fmt=n=>String(n).replace(/\B(?=(\d{3})+(?!\d))/g,'.');

  // OIEC §4.4.2.2a i Optimot 824/5. Un davant de «mil», u en la forma nominal.
  function triplet(n,beforeMil=false){
    const h=Math.floor(n/100),tail=n%100,t=Math.floor(tail/10),u=tail%10;
    const hundreds=h===0?'':h===1?'cent':units[h-1]+'-cents';
    const unit=u===1&&beforeMil?'un':units[u-1];
    let rest='';
    if(tail>0)rest=t===0?unit:t===1?teens[u]:tens[t]+(u?(t===2?'-i-':'-')+unit:'');
    return [hundreds,rest].filter(Boolean).join(' ');
  }
  function words(n){
    if(!Number.isInteger(n)||n<0||n>999999)throw RangeError('Numeral fora de rang.');
    if(n===0)return 'zero';
    const high=Math.floor(n/1000),low=n%1000;
    const thousands=high===0?'':high===1?'mil':triplet(high,true)+' mil';
    return [thousands,triplet(low)].filter(Boolean).join(' ');
  }

  const normalize=input=>String(input).normalize('NFC').toLowerCase().trim();
  // Variants lèxiques recollides a la fitxa 7875/1 de l’Optimot.
  const variants=new Map(Object.entries({huit:'vuit',dèsset:'disset',díhuit:'divuit',dènou:'dinou',huitanta:'vuitanta',desset:'disset',devuit:'divuit',denou:'dinou'}));
  const unaccented=input=>input.normalize('NFD').replace(/\p{M}/gu,'');
  const diagnosticVariants=new Map(Array.from(variants,([word,canonical])=>[unaccented(word),canonical]));
  const replaceWords=(input,map)=>input.replace(/\p{L}+/gu,word=>map.get(word)??word);
  const skeleton=input=>replaceWords(unaccented(input),diagnosticVariants).replace(/[-‐‑–]/g,' ').replace(/\s+/g,' ').trim();
  let diagnosticGroups;
  function interpret(input){
    // La gramàtica canònica és un grup de l’1 al 999, o [grup 2–999] mil [grup 1–999].
    // La forma simplificada només serveix per diagnosticar, mai per acceptar grafies.
    if(!diagnosticGroups){
      diagnosticGroups=[new Map(),new Map()];
      for(let n=1;n<=999;n++){
        const nominal=skeleton(triplet(n));
        diagnosticGroups[0].set(nominal,n);
        diagnosticGroups[0].set(nominal.replace(/\bu$/,'un'),n);
        diagnosticGroups[1].set(skeleton(triplet(n,true)),n);
      }
    }
    const tokens=skeleton(input).split(' '),mil=tokens.indexOf('mil');
    if(mil<0)return tokens.join(' ')==='zero'?0:diagnosticGroups[0].get(tokens.join(' '));
    const high=mil===0?1:diagnosticGroups[1].get(tokens.slice(0,mil).join(' '));
    const low=mil===tokens.length-1?0:diagnosticGroups[0].get(tokens.slice(mil+1).join(' '));
    return high!==undefined&&low!==undefined?1000*high+low:undefined;
  }
  function spelling(input,expected){
    const text=replaceWords(normalize(input),variants);
    if(text.replace(/\bun$/,'u')===expected)return {ok:true};
    const value=interpret(text);
    if(value===undefined)return {ok:false,message:'No es pot interpretar aquesta escriptura amb seguretat. Compara-la amb la forma correcta.'};
    if(words(value)!==expected)return {ok:false,message:'El nombre que has escrit representa una quantitat diferent.'};
    const separators=s=>s.replace(/[-‐‑–]/g,' ').replace(/ +/g,' ');
    const compact=text.replace(/\bun$/,'u').replace(/\s+/g,' ');
    return {ok:false,message:compact!==expected&&separators(compact)===separators(expected)&&/[-‐‑–]/.test(compact+expected)
      ?'El valor és correcte. Revisa els guionets amb la regla D-U-C i els espais entre mots.'
      :'El valor és correcte. Revisa l’ortografia i la separació dels mots.'};
  }
  function integer(input){
    const text=String(input).trim();
    if(!/^\d+$/.test(text)&&!/^\d{1,3}(?:[. \u00a0\u202f]\d{3})+$/.test(text))return NaN;
    return Number(text.replace(/[.\s]/g,''));
  }
  function pair(input){
    return String(input).trim().replace(/^\((.*)\)$/,'$1').split(';').map(integer);
  }
  function grade(q,input){
    if(q.decimalAnswer==='spelling')return spelling(input,q.correct);
    if(q.decimalAnswer==='integer'){
      const raw=normalize(input);
      const value=q.unit&&raw.endsWith(' '+q.unit)?raw.slice(0,-q.unit.length-1):raw;
      return {ok:integer(value)===integer(q.correct.split(' ')[0])};
    }
    if(q.decimalAnswer==='pair'){
      const values=pair(input),expected=pair(q.correct);
      return {ok:values.length===2&&values.every((n,i)=>n===expected[i])};
    }
    if(q.decimalAnswer==='expanded'){
      const terms=String(input).split('+').map(term=>{
        const factors=term.split(/[×xX·*]/);
        if(factors.length===1)return integer(term);
        if(factors.length!==2)return NaN;
        const [digit,place]=factors.map(integer);
        return digit<=9&&/^10{0,5}$/.test(String(place))?digit*place:NaN;
      }).filter(n=>n!==0);
      return {ok:terms.sort((a,b)=>a-b).join(',')===q.expanded.join(',')};
    }
    return null;
  }

  function newNumber(rnd){
    const min=[1,1000,100000][rnd(0,2)];
    return rnd(min,min===1?999:min===1000?99999:999999);
  }
  function positionalDistractors(n){
    const digits=String(n);
    return [Number(digits.slice(0,-2)+digits.slice(-2).split('').reverse().join('')),Math.floor(n/10),n%1000,n+10,n+100,n+1,n-1,n-10,n-100]
      .filter(v=>v>=0&&v<=999999);
  }
  function regroupExplanation(coefficient,place){
    const order=Math.log10(place);
    return `${coefficient} ${orders[order]} es poden reagrupar en 1 ${singularOrders[order+1]} i ${coefficient%10} ${orderName(order,coefficient%10)}.`;
  }
  function generate(type,rnd,buildOpts){
    let question,correct,wrongs,guide,solution,decimalAnswer,unit;
    if(type==='lectura-paraules-a-xifres'||type==='escriure-xifres-a-paraules'){
      const read=type==='lectura-paraules-a-xifres';
      const n=read?rnd(1000,999999):newNumber(rnd),high=Math.floor(n/1000),low=n%1000;
      question=read?`Quin nombre representa «${words(n)}»?`:`Escriu amb paraules, en català, el nombre <span class="fc">${fmt(n)}</span>.`;
      correct=read?fmt(n):words(n);
      wrongs=read?positionalDistractors(n).map(fmt):[];
      decimalAnswer=read?'integer':'spelling';
      guide=['Separa el grup dels milers del grup de les darreres tres xifres.',read?'Completa les posicions buides amb zeros.':'Revisa els guionets entre desenes i unitats i entre unitats i centenes.'];
      solution=[high?`El grup dels milers val ${fmt(high*1000)}. Les tres posicions finals són ${String(low).padStart(3,'0')}.`:`El nombre és inferior a mil: ${n}.`,
        read?`En xifres, el nombre és ${fmt(n)}.`:`En paraules, s’escriu «${words(n)}». Les posicions buides dins del nombre no es llegeixen com a zeros.`];
    }else if(type==='guionets-numerals-du-c'){
      const hundreds=rnd(2,9),ten=rnd(2,9),u=rnd(1,9),high=rnd(0,1)?rnd(1,99):0;
      const n=high*1000+hundreds*100+ten*10+u;
      correct=words(n);
      const parts=correct.split(' '),tail=parts.pop(),hundred=parts.pop();
      const write=(h,t)=>[...parts,h,t].join(' ');
      wrongs=[write(hundred.replace('-',' '),tail),write(hundred,tail.replaceAll('-',' ')),
        ten===2?write(hundred,tail.replace('-i-','-i ')):write(hundred.replace('-',' '),tail.replaceAll('-',' '))];
      question=`Quina escriptura és correcta per al nombre <span class="fc">${fmt(n)}</span>?`;
      guide=['Aplica la regla D-U-C. Pensa quins mots formen una sola desena o una sola centena.'];
      solution=[`Escrivim «${hundred}» amb guionet entre la unitat i «cents».`,
        ten===2?`A «${tail}», la conjunció «i» porta un guionet a cada costat.`:`A «${tail}», la desena i la unitat van unides amb un guionet.`,
        'La centena i la desena queden separades amb un espai. Si hi ha milers, «mil» també va separat.'];
      decimalAnswer='spelling';
    }else if(type==='descomposicio-equivalent-reagrupament'){
      const places=[1,10,100,1000,10000,100000],pivot=rnd(0,4),count=rnd(2,4);
      const extra=places.filter((_,i)=>i!==pivot);
      const terms=[[rnd(10,19),places[pivot]]];
      for(let i=1;i<count;i++)terms.push([rnd(i===1?1:0,8),extra.splice(rnd(0,extra.length-1),1)[0]]);
      terms.sort((a,b)=>b[1]-a[1]);
      const total=terms.reduce((sum,[digit,place])=>sum+digit*place,0);
      const [coefficient,place]=terms.find(([digit])=>digit>9);
      question=`Quin nombre representa aquesta descomposició?<br><span class="fc">${terms.map(([d,p])=>d+' × '+fmt(p)).join(' + ')}</span>`;
      correct=fmt(total);
      wrongs=[total-10*place,total-coefficient*place+coefficient,total-coefficient*place,
        ...terms.map(([d,p])=>total-d*p),total-place,total-1,total-2,total-3].map(fmt);
      guide=['Calcula el valor de cada terme.', 'Recorda que deu unitats d’un ordre equivalen a una de l’ordre immediatament superior.'];
      solution=terms.map(([d,p])=>`${d} × ${fmt(p)} = ${fmt(d*p)}.`).concat(regroupExplanation(coefficient,place),`Sumem els valors: ${terms.map(([d,p])=>fmt(d*p)).join(' + ')} = ${correct}.`);
      decimalAnswer='integer';
    }else if(type==='equivalencia-ordres-posicionals'){
      const target=rnd(0,3),upper=rnd(target+2,5),lower=rnd(target+1,upper-1),a=rnd(1,9),b=rnd(0,9);
      const scale=10**target,left=a*10**(upper-target),right=b*10**(lower-target),count=left+right;
      unit=orders[target];correct=fmt(count)+' '+unit;
      wrongs=[count*scale,left,left+b,right+a,left/10+right,count+1,count+10].map(n=>fmt(n)+' '+unit);
      question=`Quantes ${unit} equivalen a ${a} ${orderName(upper,a)} i ${b} ${orderName(lower,b)}?`;
      guide=[`Calcula quantes ${unit} hi ha en una unitat de cadascun dels ordres donats.`,'Converteix cada quantitat i suma els recomptes.'];
      solution=[`${a} ${orderName(upper,a)} = ${fmt(left)} ${unit}.`,`${b} ${orderName(lower,b)} = ${fmt(right)} ${unit}.`,
        `En total: ${fmt(left)} + ${fmt(right)} = ${correct}.`,`Comprovació en unitats: ${fmt(count)} × ${fmt(scale)} = ${fmt(count*scale)}.`];
      decimalAnswer='integer';
    }else if(type==='auditar-error-de-posicio'){
      const from=rnd(2,4),to=rnd(0,from-1),digit=rnd(1,9);
      const digits=Array.from(String(rnd(100000,999999)),Number).reverse();
      digits[from]=digit;digits[to]=0;
      const target=digits.reduce((sum,d,i)=>sum+d*10**i,0);
      const gap=digit*(10**from-10**to),actual=target-gap;
      digits[from]=0;digits[to]=digit;
      const expression=digits.map((d,i)=>d?d+' × '+fmt(10**i):'').filter(Boolean).reverse().join(' + ');
      const option=(value,delta)=>`(${fmt(value)}; ${fmt(delta)})`;
      correct=option(actual,gap);wrongs=[option(gap,actual),option(target,gap),option(actual,digit*10**from)];
      question=`El nombre és ${fmt(target)}. En Pol escriu:<br><span class="fc">${expression}</span><br>Quin valor representa l’expressió i quant hi falta per arribar al nombre correcte? Escriu primer el valor i després la diferència, separats per un punt i coma.`;
      guide=['Calcula el valor real de cada terme escrit per en Pol.','Resta aquest resultat del nombre objectiu.'];
      solution=[`Calculem els termes: ${digits.map((d,i)=>d?fmt(d*10**i):'').filter(Boolean).reverse().join(' + ')} = ${fmt(actual)}.`,
        `En Pol ha col·locat la xifra ${digit} a les ${orders[to]} en lloc de les ${orders[from]}.`,
        `Calculem què hi falta: ${fmt(target)} − ${fmt(actual)} = ${fmt(gap)}. La parella és ${correct}.`];
      decimalAnswer='pair';
    }else throw Error('Família decimal desconeguda: '+type);
    const openOnly=type==='escriure-xifres-a-paraules';
    return {type,question,correct,guide,solution,decimalAnswer,unit,openOnly,options:openOnly?[]:buildOpts(correct,wrongs)};
  }

  function base(q,data,buildOpts){
    const {n,digit,position}=data;
    if(q.type===1||q.type===4){
      const p=10**position,value=digit*p;
      const lead=q.type===4?`El número de matrícula és <b>${n}</b>. `:'';
      q.question=q.type===4?`${lead}Quin valor representa la xifra ${digit} de les ${orders[position]}?`:
        `Quin valor representa la xifra ${digit} de les ${orders[position]} en el nombre <span class="fc">${fmt(n)}</span>?`;
      q.correct=fmt(value);
      q.options=buildOpts(q.correct,[digit,p,value*10,Math.floor(value/10),value+p,value+2*p,value+3*p].map(fmt));
      q.solution=[`La xifra ${digit} ocupa el lloc de les ${orders[position]}.`,`El seu valor és ${digit} × ${fmt(p)} = ${q.correct}.`];
      q.decimalAnswer='integer';
      return q;
    }
    const digits=Array.from(String(n),Number);
    const place=i=>10**(digits.length-i-1);
    const factors=ds=>ds.map((d,i)=>d+' × '+fmt(place(i))).join(' + ');
    const nonzero=digits.map((d,i)=>d*place(i)).filter(Boolean);
    if(q.type===2){
      q.question=`Descompon el nombre <span class="fc">${fmt(n)}</span> segons el valor de cada posició.`;
      q.correct=factors(digits);
      q.options=buildOpts(q.correct,[0,2,3].map(index=>factors(digits.map((d,i)=>i===index?(d+1)%10:d))));
      q.decimalAnswer='expanded';
      q.expanded=nonzero.slice().sort((a,b)=>a-b);
    }else{
      q.question='Quin nombre correspon a aquestes xifres?<br>'+digits.map((d,i)=>`${d} a les ${orders[digits.length-i-1]}`).join(', ')+'?';
      q.correct=fmt(n);
      q.options=buildOpts(q.correct,positionalDistractors(n).map(fmt));
      q.decimalAnswer='integer';
    }
    const zeroPositions=digits.flatMap((d,i)=>d===0?[orders[digits.length-i-1]]:[]);
    q.solution=[`Multipliquem cada xifra pel valor de la seva posició: ${factors(digits)}.`];
    if(zeroPositions.length)q.solution.push(`Hi ha un zero a les posicions següents: ${zeroPositions.join(', ')}. Aquests termes valen zero i es poden ometre de la suma.`);
    q.solution.push(`Sumem les aportacions: ${nonzero.map(fmt).join(' + ')} = ${fmt(n)}.`);
    return q;
  }
  root.MIDecimalPractice={words,spelling,grade,generate,base};
})(globalThis);
