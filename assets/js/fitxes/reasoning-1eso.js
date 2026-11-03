/* Banc de raonament de paper: continguts de 1r, dades separades del text. */
(function(){
  'use strict';
  const bank={};
  const add=(topic,id,content,demand,build)=>{(bank[topic]||=[]).push({id,content,demand,build});};
  const make=(question,answer,steps,data,result)=>({question,answer:String(answer),steps,options:[],audit:{data,result}});
  const pick=a=>a[rnd(0,a.length-1)];
  const frac=(n,d)=>{const g=gcd(n,d);return `${n/g}/${d/g}`;};
  const num=(n,d=2)=>Number(n.toFixed(d));
  add('naturals','inversa-divisio','naturals','inverse',()=>{
    const d=rnd(3,19),q=rnd(12,80),r=rnd(1,d-1),n=d*q+r;
    return make(`En una divisió de nombres naturals, el divisor és ${d}, el quocient és ${q} i el residu és ${r}. Troba el dividend i comprova que el residu és admissible.`,n,[`Dividend = divisor × quocient + residu.`,`${d} × ${q} + ${r} = ${n}`,`0 < ${r} < ${d}; les dades són compatibles.`],{d,q,r},n);
  });
  add('naturals','interval-arrodoniment','naturals','constraints',()=>{
    const unit=pick([10,100,1000]),target=unit*rnd(3,70),lo=target-unit/2,hi=target+unit/2-1;
    return make(`Quins són el menor i el major nombre natural que, arrodonits a la unitat ${unit}, donen ${target}? En els empats s’arrodoneix cap amunt. Justifica els dos límits.`,`${lo}; ${hi}`,[`${lo} és el primer enter que arriba a ${target} per arrodoniment.`,`${hi+1} ja s’arrodoneix al múltiple superior.`,`Per tant, l’interval enter és de ${lo} a ${hi}, inclosos.`],{unit,target},[lo,hi]);
  });
  add('naturals','error-ordenacio','naturals','error-analysis',()=>{
    const a=rnd(2,8)*1000+rnd(1,8)*100,b=a+rnd(11,80),c=b+rnd(11,80);
    return make(`Un alumne escriu ${a} < ${c} < ${b}. Identifica la comparació incorrecta i escriu l’ordenació correcta.`,`${a} < ${b} < ${c}`,[`${c} és més gran que ${b}; la segona comparació és falsa.`,`L’ordenació correcta és ${a} < ${b} < ${c}.`],{a,b,c},[a,b,c]);
  });
  add('naturals','estrategia-producte','naturals','connection',()=>{
    const a=rnd(12,60),b=rnd(2,8),r=a*(10+b);
    return make(`Explica per què ${a} × ${10+b} es pot calcular com ${a} × 10 + ${a} × ${b}, i utilitza aquesta estratègia per trobar el resultat.`,r,[`${10+b} = 10 + ${b}.`,`La propietat distributiva permet repartir el producte entre els dos sumands.`,`${a*10} + ${a*b} = ${r}`],{a,b},r);
  });
  add('decimal_sys','xifra-desconeguda','decimal_sys','inverse',()=>{
    const a=rnd(1,9),b=rnd(1,9),c=rnd(1,9),n=1000*a+100*b+c;
    return make(`Troba la xifra □: ${a} × 1000 + □ × 100 + ${c} = ${n}. Explica com l’has identificada.`,b,[`La part coneguda val ${1000*a+c}.`,`${n} − ${1000*a+c} = ${100*b}`,`${100*b} ÷ 100 = ${b}; és una xifra vàlida.`],{a,b,c},b);
  });
  add('decimal_sys','intercanvi-invers','decimal_sys','inverse-constraints',()=>{
    const a=rnd(1,7),b=rnd(a+1,9),sum=a+b,delta=9*(b-a),n=10*a+b;
    return make(`Un nombre té dues xifres que sumen ${sum}. En intercanviar-les, el nombre augmenta ${delta}. Troba el nombre inicial i justifica que és únic.`,n,[`L’augment és nou vegades la diferència entre la xifra de les unitats i la de les desenes.`,`La diferència de les xifres és ${delta} ÷ 9 = ${b-a}.`,`Amb suma ${sum} i diferència ${b-a}, les xifres són ${a} i ${b}.`,`Nombre inicial: ${n}; comprovació: ${10*b+a} − ${n} = ${delta}.`],{a,b},n);
  });
  add('decimal_sys','error-zero-posicional','decimal_sys','error-analysis',()=>{
    const a=rnd(1,9),b=rnd(1,9),c=rnd(1,9),n=1000*a+10*b+c;
    return make(`Algú descompon ${n} com ${1000*a} + ${100*b} + ${c}. Explica l’error i escriu la suma posicional correcta.`,`${1000*a} + ${10*b} + ${c}`,[`El zero ocupa les centenes; la xifra ${b} ocupa les desenes.`,`El terme ${100*b} s’ha de substituir per ${10*b}.`,`${n} = ${1000*a} + ${10*b} + ${c}`],{a,b,c},n);
  });
  add('decimal_sys','reagrupament','decimal_sys','connection',()=>{
    const a=rnd(2,8),b=rnd(1,8),n=100*a+10*b;
    return make(`És certa la igualtat ${a} centenes i ${b} desenes = ${a-1} centenes i ${b+10} desenes? Justifica-ho mitjançant el valor posicional, sense limitar-te a dir sí o no.`,`${n}; sí`,[`Una centena equival a deu desenes.`,`${a} × 100 + ${b} × 10 = ${n}`,`${a-1} × 100 + ${b+10} × 10 = ${n}`,`S’ha canviat una centena per deu desenes; el valor es conserva.`],{a,b},n);
  });
  add('ops','operand-invers','ops','inverse',()=>{
    const a=rnd(3,15),x=rnd(7,35),b=rnd(2,20),r=a*x-b;
    return make(`Troba □ en ${a} × □ − ${b} = ${r}. Explica en quin ordre desfàs les operacions.`,x,[`Primer desfem la resta: ${r} + ${b} = ${a*x}.`,`Després desfem el producte: ${a*x} ÷ ${a} = ${x}.`,`Comprovació: ${a} × ${x} − ${b} = ${r}.`],{a,x,b},x);
  });
  add('ops','diagnostic-divisio','ops','error-analysis',()=>{
    const d=rnd(3,18),q=rnd(10,90),r=rnd(1,d-1),n=d*q+r;
    return make(`Un alumne afirma que ${n} ÷ ${d} és una divisió exacta de quocient ${q}. Comprova-ho, explica l’error i dona el quocient enter i el residu correctes.`,`Quocient: ${q}; residu: ${r}.`,[`${d} × ${q} = ${d*q}`,`${n} − ${d*q} = ${r}`,`El residu és positiu i menor que ${d}; la divisió no és exacta.`],{d,q,r},[q,r]);
  });
  add('ops','comparar-ofertes','ops','decision',()=>{
    const n=rnd(4,12),p=rnd(3,9),fee=rnd(2,14),a=n*p+fee,b=n*(p+1);
    return make(`Per comprar ${n} articles, l’opció A cobra ${p} € per article i ${fee} € de transport per tota la compra. L’opció B cobra ${p+1} € per article sense transport. Compara els totals i decideix quina convé.`,`A: ${a} €; B: ${b} €; ${a<b?'convé A':a>b?'convé B':'mateix cost'}.`,[`A: ${n} × ${p} + ${fee} = ${a} €`,`B: ${n} × ${p+1} = ${b} €`,`Cal comparar el cost complet, inclòs el transport; una igualtat significa que totes dues opcions costen el mateix.`],{n,p,fee},[a,b]);
  });
  add('ops','distributiva-error','ops','error-analysis',()=>{
    const a=rnd(3,12),b=rnd(2,9),c=rnd(2,9),r=a*(b+c);
    return make(`És correcte escriure ${a} × (${b} + ${c}) = ${a} × ${b} + ${c}? Detecta l’error i corregeix el segon membre perquè sigui equivalent al primer.`,`${a} × ${b} + ${a} × ${c} = ${r}`,[`El factor ${a} ha de multiplicar tots dos sumands.`,`El segon membre proposat val ${a*b+c}, però el primer val ${r}.`,`La forma correcta és ${a} × ${b} + ${a} × ${c} = ${r}.`],{a,b,c},r);
  });
  add('potencies','exponent-invers','potencies','inverse',()=>{
    const a=rnd(3,9),e=rnd(2,4),r=a**e;
    return make(`Troba l’exponent natural □ perquè ${a}^□ = ${r}. Justifica’l i explica per què no n’hi ha cap altre.`,e,[`Les potències successives de ${a} creixen estrictament perquè ${a} > 1.`,`${a}^${e} = ${r}`,`L’exponent és ${e}; el creixement garanteix la unicitat.`],{a,e},e);
  });
  add('potencies','error-potencia','potencies','error-analysis',()=>{
    const a=rnd(3,15);
    return make(`Un alumne diu que ${a}^2 = ${a} × 2. Explica què representa l’exponent i corregeix el resultat.`,a*a,[`L’exponent indica quants factors iguals a la base es multipliquen.`,`${a}^2 = ${a} × ${a} = ${a*a}`,`${a} × 2 = ${2*a} és una altra operació.`],{a},a*a);
  });
  add('potencies','arrel-acotada','arrels','constraints',()=>{
    const a=rnd(3,18),offset=rnd(1,2*a),n=a*a+offset;
    return make(`Sense calculadora, troba dos enters consecutius entre els quals es troba √${n}. Justifica també si l’arrel és exacta.`,`${a} < √${n} < ${a+1}; no és exacta.`,[`${a}^2 = ${a*a}`,`${a+1}^2 = ${(a+1)**2}`,`${a*a} < ${n} < ${(a+1)**2}; per tant, l’arrel queda estrictament entre ${a} i ${a+1}.`],{a,offset},[a,a+1]);
  });
  add('potencies','comparar-inverses','arrels','connection',()=>{
    const a=rnd(5,12),b=rnd(2,9),n=a*a+b;
    return make(`És certa la igualtat √(${a*a} + ${b}) = ${a} + √${b}? Justifica la resposta sense limitar-te a donar una aproximació decimal.`,`No.`,[`${a*a} < ${n} < ${(a+1)**2}; per tant, ${a} < √${n} < ${a+1}.`,`Com que ${b} > 1, també √${b} > 1 i ${a} + √${b} > ${a+1}.`,`El primer membre és menor que ${a+1} i el segon és més gran; no poden ser iguals.`],{a,b},false);
  });
  add('jerarquia','escollir-parentesis','jerarquia','decision',()=>{
    const a=rnd(3,12),b=rnd(2,9),c=rnd(2,9),r=a*(b+c);
    return make(`Quina expressió dona ${r}: ${a} × ${b} + ${c} o ${a} × (${b} + ${c})? Explica el paper del parèntesi.`,`${a} × (${b} + ${c})`,[`Sense parèntesi: ${a} × ${b} + ${c} = ${a*b+c}`,`Amb parèntesi: ${a} × (${b} + ${c}) = ${r}`,`El parèntesi fa sumar abans de multiplicar.`],{a,b,c},r);
  });
  add('jerarquia','primer-error','jerarquia','error-analysis',()=>{
    const a=rnd(2,15),b=rnd(2,9),c=rnd(2,9),wrong=(a+b)*c,r=a+b*c;
    return make(`En calcular ${a} + ${b} × ${c}, algú suma primer ${a} + ${b} i obté finalment ${wrong}. Identifica el primer error i resol l’expressió correctament.`,r,[`La multiplicació té prioritat sobre la suma.`,`${b} × ${c} = ${b*c}`,`${a} + ${b*c} = ${r}`],{a,b,c},r);
  });
  add('jerarquia','casella-inversa','jerarquia','inverse',()=>{
    const a=rnd(2,9),b=rnd(2,9),x=rnd(3,18),r=a*(x+b);
    return make(`Troba □ en ${a} × (□ + ${b}) = ${r}. Desfés les operacions i comprova la resposta.`,x,[`${r} ÷ ${a} = ${x+b}`,`${x+b} − ${b} = ${x}`,`Comprovació: ${a} × (${x} + ${b}) = ${r}.`],{a,b,x},x);
  });
  add('jerarquia','equivalencia','jerarquia','connection',()=>{
    const a=rnd(3,14),b=rnd(2,9),c=rnd(2,9),r=a*(b+c);
    return make(`Sense calcular separadament tots dos resultats, justifica si ${a} × (${b} + ${c}) i ${a} × ${b} + ${a} × ${c} són equivalents.`,`${r}; són equivalents.`,[`Per la propietat distributiva, el factor ${a} multiplica tots dos sumands.`,`Totes dues expressions representen ${a} grups de ${b+c}.`,`El valor comú és ${r}.`],{a,b,c},r);
  });
  add('divis','xifra-divisible','divis','constraints',()=>{
    const k=rnd(2,25),r=rnd(0,1),prefix=3*k+r,x=r===0?0:5,n=10*prefix+x;
    return make(`Troba la xifra □ perquè el nombre ${prefix}□ sigui divisible per 3 i per 5 alhora. Explica per què no hi ha cap altra xifra possible.`,x,[`La divisibilitat per 5 obliga que l’última xifra sigui 0 o 5.`,`Només la xifra ${x} també fa que el nombre sigui divisible per 3.`,`${n} ÷ 3 = ${n/3}; ${n} ÷ 5 = ${n/5}.`],{prefix},x);
  });
  add('divis','factor-compost','divis','error-analysis',()=>{
    const a=rnd(2,9),b=rnd(2,9),p=pick([2,3,5,7]),n=a*b*p;
    return make(`S’afirma que ${n} = ${a*b} × ${p} ja és una descomposició en factors primers. Explica l’error i completa la factorització.`,factStr(n),[`${a*b} no és primer perquè ${a*b} = ${a} × ${b}, amb tots dos factors més grans que 1.`,`Cal continuar descomponent els factors compostos.`,`${n} = ${factStr(n)}`],{a,b,p},n);
  });
  add('divis','multiples-condicionats','divis','constraints',()=>{
    const d=rnd(3,12),k=rnd(3,20),lo=d*k,hi=d*(k+2),values=[lo,lo+d,hi].filter(n=>n%(d+1)!==0);
    return make(`Troba tots els múltiples de ${d} entre ${lo} i ${hi}, inclosos, que no siguin divisibles per ${d+1}. Justifica que no en falta cap.`,values.join('; '),[`Els únics múltiples de ${d} dins l’interval són ${lo}; ${lo+d}; ${hi}.`,`En comprovem la divisibilitat per ${d+1} i descartem els que tenen residu zero.`,`Resultat: ${values.join('; ')}.`],{d,k},values);
  });
  add('divis','primer-contraexemple','divis','counterexample',()=>{
    const a=pick([3,5,7,11,13]),b=pick([3,5,7,11,13]),n=a*b;
    return make(`Algú afirma: «${n} és primer perquè és senar». És suficient aquest argument? Dona una prova que decideixi aquest cas.`,`No; ${n} és compost.`,[`Ser senar no implica ser primer.`,`${n} = ${a} × ${b}`,`Com que ${a} i ${b} són més grans que 1, aquesta factorització demostra que és compost.`],{a,b},n);
  });
  add('mcmmcd','mcd-error','mcd','error-analysis',()=>{
    const k=rnd(2,35),a=6*k,b=10*k,g=2*k;
    return make(`Un alumne proposa MCD(${a}; ${b}) = ${a}. Comprova si el valor proposat divideix tots dos nombres i troba el MCD correcte.`,g,[`${b} no és múltiple de ${a}; la proposta no pot ser un divisor comú.`,`MCD(6; 10) = 2`,`${a} = ${k} × 6 i ${b} = ${k} × 10; el MCD és ${k} × 2 = ${g}.`],{k},g);
  });
  add('mcmmcd','mcd-invers','mcd','inverse-constraints',()=>{
    const k=rnd(2,35),a=6*k,options=[5*k,8*k,9*k];
    return make(`Troba quin valor de b entre ${options.join('; ')} compleix MCD(${a}; b) = ${k}. Justifica la tria comprovant els tres candidats.`,5*k,options.map(b=>`MCD(${a}; ${b}) = ${gcd(a,b)}`).concat(`Només ${5*k} compleix la condició.`),{k},5*k);
  });
  add('mcmmcd','mcm-invers','mcm','inverse-constraints',()=>{
    const k=rnd(2,35),a=3*k,options=[2*k,3*k,4*k];
    return make(`Troba quin valor de b entre ${options.join('; ')} compleix mcm(${a}; b) = ${6*k}. Justifica la tria comprovant els tres candidats.`,2*k,options.map(b=>`mcm(${a}; ${b}) = ${lcm(a,b)}`).concat(`Només ${2*k} compleix la condició.`),{k},2*k);
  });
  add('mcmmcd','coincidencies-interval','mcm','connected-steps',()=>{
    const k=rnd(2,12),cycles=rnd(2,5),a=6*k,b=10*k,period=30*k,end=period*cycles+rnd(1,period-1),times=Array.from({length:cycles},(_,i)=>(i+1)*period);
    return make(`Dues alarmes sonen cada ${a} i ${b} minuts. Ara sonen alhora. En quins minuts després d’ara, fins al minut ${end} inclòs, tornaran a sonar juntes? No comptis la coincidència inicial.`,times.join('; ')+' minuts',[`El període de coincidència és mcm(${a}; ${b}) = ${period} minuts.`,`Prenem els múltiples positius de ${period} que no superen ${end}.`,`Coincidències: ${times.join('; ')} minuts; en total, ${cycles}.`],{k,cycles,end},times);
  });
  add('enters','saldo-invers','enters','inverse',()=>{
    const start=rnd(-40,40),income=rnd(5,30),out=rnd(5,30),end=start+income-out;
    return make(`Després d’un ingrés de ${income} € i d’una retirada de ${out} €, el saldo és ${end} €. Quin saldo hi havia inicialment? Explica com desfàs els dos moviments.`,`${start} €`,[`Desfem primer la retirada: ${end} + ${out} = ${start+income}.`,`Desfem l’ingrés: ${start+income} − ${income} = ${start}.`,`El saldo inicial era ${start} €.`],{start,income,out},start);
  });
  add('enters','error-resta-negatiu','enters','error-analysis',()=>{
    const a=rnd(-15,15),b=rnd(2,15);
    return make(`Un alumne transforma ${a} − (−${b}) en ${a} − ${b}. Explica l’error i calcula el valor correcte.`,a+b,[`Restar un nombre negatiu equival a sumar-ne l’oposat.`,`${a} − (−${b}) = ${a} + ${b} = ${a+b}`,`La transformació proposada canviava el signe incorrectament.`],{a,b},a+b);
  });
  add('enters','distancia-desplacament','enters','interpretation',()=>{
    const a=-rnd(2,25),b=rnd(2,25),dist=b-a;
    return make(`A la recta numèrica et desplaces de ${b} a ${a}. Calcula la distància recorreguda i el desplaçament amb signe. Explica per què tenen signes diferents.`,`Distància: ${dist}; desplaçament: ${-dist}.`,[`Distància = ${b} − (${a}) = ${dist}; una distància no és negativa.`,`Desplaçament = ${a} − ${b} = ${-dist}.`,`El signe negatiu indica que el moviment és cap a l’esquerra.`],{a,b},[dist,-dist]);
  });
  add('enters','valor-absolut-condicio','enters','constraints',()=>{
    const a=rnd(3,25),b=rnd(0,a-1);
    return make(`Troba tots els enters x que compleixen |x| = ${a} i x < ${b}. Explica per què l’altra possibilitat queda descartada.`,-a,[`L’equació de valor absolut té les possibilitats ${a} i ${-a}.`,`${a} no és menor que ${b}, però ${-a} sí.`,`L’única solució és ${-a}.`],{a,b},-a);
  });
  add('decimals','factor-invers','decimals','inverse',()=>{
    const a=rnd(11,49),b=rnd(11,49),product=a*b/100;
    return make(`Troba el nombre decimal □ en ${a/10} × □ = ${product}. Dona el valor exacte i comprova’l.`,b/10,[`${product} ÷ ${a/10} = ${b/10}`,`Comprovació: ${a/10} × ${b/10} = ${product}.`,`No cal arrodonir: el quocient és decimal exacte.`],{a,b},b/10);
  });
  add('decimals','error-coma','decimals','error-analysis',()=>{
    const a=rnd(11,49),b=rnd(11,49),correct=a*b/100,wrong=a*b/10;
    return make(`Un alumne obté ${wrong} en multiplicar ${a/10} × ${b/10}. Explica l’error de posició de la coma i corregeix el producte.`,correct,[`Cada factor s’ha dividit per 10 respecte de ${a} i ${b}.`,`Per tant, el producte enter ${a*b} s’ha de dividir per 100.`,`${a*b} ÷ 100 = ${correct}; el resultat proposat era deu vegades massa gran.`],{a,b},correct);
  });
  add('decimals','interval-decimal','decimals','constraints',()=>{
    const cents=rnd(120,980),lo=(cents*10-5)/1000,hi=(cents*10+4)/1000;
    return make(`Entre els decimals positius escrits amb tres xifres decimals, troba el menor i el major que s’arrodoneixen a ${ (cents/100).toFixed(2)} a les centèsimes. En els empats s’arrodoneix cap amunt.`,`${lo.toFixed(3)}; ${hi.toFixed(3)}`,[`El límit inferior inclòs és ${lo.toFixed(3)}.`,`El nombre ${(hi+0.001).toFixed(3)} ja s’arrodoneix a la centèsima següent.`,`Amb tres decimals, el major admissible és ${hi.toFixed(3)}.`],{cents},[lo,hi]);
  });
  add('decimals','comparar-costos','decimals','decision',()=>{
    const n=rnd(3,10),p=rnd(120,390),fee=rnd(50,250),a=(n*p+fee)/100,b=n*(p+30)/100;
    return make(`Compra de ${n} articles: A cobra ${p/100} € per article i ${fee/100} € per tota la comanda; B cobra ${(p+30)/100} € per article sense recàrrec. Calcula els dos totals exactes i decideix quina opció convé.`,`A: ${a.toFixed(2)} €; B: ${b.toFixed(2)} €; ${a<b?'convé A':a>b?'convé B':'mateix cost'}.`,[`A: ${n} × ${p/100} + ${fee/100} = ${a.toFixed(2)} €`,`B: ${n} × ${(p+30)/100} = ${b.toFixed(2)} €`,`Comparem els totals sense arrodonir abans d’acabar.`],{n,p,fee},[a,b]);
  });
  add('fraccions','error-suma','fraccions','error-analysis',()=>{
    const a=rnd(1,4),b=rnd(5,9),c=rnd(1,4),d=rnd(10,14),n=a*d+c*b,den=b*d;
    return make(`Algú escriu ${a}/${b} + ${c}/${d} = ${a+c}/${b+d}. Explica per què no es poden sumar així els denominadors i calcula la suma correcta.`,frac(n,den),[`Cal expressar les fraccions en parts de la mateixa mida.`,`${a}/${b} = ${a*d}/${b*d}; ${c}/${d} = ${c*b}/${b*d}`,`Sumem numeradors: ${n}/${den} = ${frac(n,den)}.`],{a,b,c,d},[n,den]);
  });
  add('fraccions','complement-invers','fraccions','inverse',()=>{
    const b=rnd(5,18),a=rnd(1,b-1);
    return make(`Troba la fracció □ en □ + ${a}/${b} = 1. Dona-la simplificada i comprova la igualtat.`,frac(b-a,b),[`Escrivim 1 com ${b}/${b}.`,`La part desconeguda és ${b}/${b} − ${a}/${b} = ${b-a}/${b}.`,`Simplificant: ${frac(b-a,b)}; la suma amb ${a}/${b} dona 1.`],{a,b},[b-a,b]);
  });
  add('fraccions','comparar-creuats','fraccions','justification',()=>{
    const b=rnd(5,18),a=rnd(1,b-2);
    return make(`Sense convertir a decimals, compara ${a}/${b} i ${a+1}/${b+1}. Justifica si augmentar numerador i denominador en una unitat fa créixer aquesta fracció.`,`${a}/${b} < ${a+1}/${b+1}`,[`Productes creuats: ${a} × ${b+1} = ${a*(b+1)} i ${a+1} × ${b} = ${(a+1)*b}.`,`El segon producte supera el primer en ${b-a} > 0.`,`Per tant, en aquest cas la fracció augmenta.`],{a,b},true);
  });
  add('fraccions','total-desconegut','fraccions','inverse-connected',()=>{
    const b=rnd(3,9),a=rnd(1,b-1),unit=rnd(4,25),left=(b-a)*unit,total=b*unit;
    return make(`Després de gastar ${a}/${b} d’una quantitat inicial, en queden ${left} unitats. Troba la quantitat inicial i comprova-la.`,`${total} unitats`,[`La part que queda és ${b-a}/${b} del total.`,`Una de les ${b} parts val ${left} ÷ ${b-a} = ${unit} unitats.`,`El total és ${unit} × ${b} = ${total} unitats; se’n gasten ${a*unit} i en queden ${left}.`],{a,b,unit},total);
  });
  add('proporcionalitat','comparar-models','proporcionalitat','interpretation',()=>{
    const k=rnd(2,12),fee=rnd(2,15),x=rnd(2,8),a=k*x,b=k*x+fee;
    return make(`Dos models relacionen una quantitat x amb el cost: A cobra ${k} € per unitat; B cobra ${k} € per unitat i una quota fixa de ${fee} €. Quin model és de proporcionalitat directa? Justifica-ho i compara els costos quan x = ${x}.`,`A és proporcional; B no. A: ${a} €; B: ${b} €.`,[`A conserva la raó cost/quantitat igual a ${k}.`,`En B, la quota fixa fa variar aquesta raó; duplicar la quantitat no duplica la quota.`,`Per x = ${x}: A = ${a} € i B = ${b} €.`],{k,fee,x},[a,b]);
  });
  add('proporcionalitat','corregir-taula','proporcionalitat','error-analysis',()=>{
    const k=rnd(2,12),a=rnd(2,5),b=rnd(6,9),c=rnd(10,15),error=rnd(1,7);
    return make(`En una taula directament proporcional, les parelles ${a} → ${a*k} i ${b} → ${b*k} són correctes. La tercera és ${c} → ${c*k+error}. Detecta i corregeix l’error justificant la constant.`,c*k,[`${a*k} ÷ ${a} = ${k}; ${b*k} ÷ ${b} = ${k}.`,`La tercera imatge ha de ser ${c} × ${k} = ${c*k}.`,`El valor ${c*k+error} no manté la mateixa raó.`],{k,a,b,c,error},c*k);
  });
  add('proporcionalitat','antecedent-invers','proporcionalitat','inverse',()=>{
    const k=rnd(2,12),a=rnd(2,9),x=rnd(10,25),y=k*x;
    return make(`En una proporcionalitat directa, ${a} correspon a ${a*k}. A quin valor inicial correspon ${y}? Explica com utilitzes la constant i comprova la resposta.`,x,[`Constant: ${a*k} ÷ ${a} = ${k}.`,`Busquem l’antecedent: ${y} ÷ ${k} = ${x}.`,`Comprovació: ${x} × ${k} = ${y}.`],{k,a,x},x);
  });
  add('proporcionalitat','escollir-estrategia','proporcionalitat','decision',()=>{
    const k=rnd(2,12),x=rnd(2,9),f=rnd(2,5),y=k*x;
    return make(`Una proporcionalitat directa associa ${x} → ${y}. Per trobar la imatge de ${x*f}, l’Aina multiplica ${y} per ${f} i en Pau hi suma ${x*f-x}. Qui conserva la proporcionalitat? Justifica-ho i dona la imatge correcta.`,y*f,[`El valor inicial s’ha multiplicat per ${f}; la imatge també s’ha de multiplicar per ${f}.`,`El procediment de l’Aina és correcte: ${y} × ${f} = ${y*f}.`,`El procediment d’en Pau donaria ${y+x*f-x}, que no conserva la raó ${k}.`],{k,x,f},y*f);
  });
  add('percentatges','preu-invers','percentatges','inverse',()=>{
    const a=rnd(6,35),p=pick([10,20,25]),base=20*a,paid=base*(100-p)/100;
    return make(`Després d’un descompte del ${p} %, un article costa ${paid} €. Troba el preu inicial i comprova’l.`,`${base} €`,[`Es paga el ${100-p} % del preu inicial.`,`${paid} ÷ ${(100-p)/100} = ${base} €`,`Comprovació: ${base} − ${base*p/100} = ${paid} €.`],{a,p},base);
  });
  add('percentatges','canvis-successius','percentatges','error-analysis',()=>{
    const a=rnd(2,25),p=pick([10,20]),base=100*a,raised=base*(100+p)/100,final=base*(10000-p*p)/10000;
    return make(`Un preu de ${base} € augmenta un ${p} % i després baixa un ${p} %. Algú diu que torna al preu inicial. És cert? Calcula el resultat i explica sobre quina base s’aplica cada canvi.`,`${final} €; no torna al preu inicial.`,[`Primer canvi: ${base} × ${(100+p)/100} = ${raised} €`,`La baixada es calcula sobre ${raised}, no sobre ${base}.`,`Segon canvi: ${raised} × ${(100-p)/100} = ${final} €; les bases són diferents.`],{a,p},final);
  });
  add('percentatges','comparar-bases','percentatges','decision',()=>{
    const a=20*rnd(4,20),b=20*rnd(4,20),p=pick([10,20,25]),q=pick([10,20,25]),x=a*p/100,y=b*q/100;
    return make(`Compara el ${p} % de ${a} amb el ${q} % de ${b}. Pots decidir només comparant ${p} i ${q}? Justifica la resposta utilitzant també les bases.`,`${x} ${x<y?'<':x>y?'>':'='} ${y}`,[`Primera quantitat: ${a} × ${p}/100 = ${x}.`,`Segona quantitat: ${b} × ${q}/100 = ${y}.`,`Cal tenir en compte tant els percentatges com les bases; la comparació és ${x} ${x<y?'<':x>y?'>':'='} ${y}.`],{a,b,p,q},[x,y]);
  });
  add('percentatges','error-increment','percentatges','error-analysis',()=>{
    const a=rnd(11,40),base=10*a,p=pick([10,20,30]),wrong=base+p,correct=base*(100+p)/100;
    return make(`Per augmentar ${base} € un ${p} %, un alumne hi suma ${p} € i obté ${wrong} €. Explica l’error i calcula el nou import correcte.`,`${correct} €`,[`El ${p} % significa ${p} de cada 100, no ${p} euros fixos.`,`L’augment és ${base} × ${p}/100 = ${base*p/100} €.`,`Nou import: ${base} + ${base*p/100} = ${correct} €.`],{a,p},correct);
  });
  window.MIWorksheetReasoning={
    families(topic){return (bank[topic]||[]).map(f=>({family:topic+':ext-'+f.id,extensionId:f.id,contents:[f.content],level:['error-potencia','complement-invers','reagrupament','error-resta-negatiu','corregir-taula'].includes(f.id)?2:3,standard:false,challenge:true,cognitiveDemand:f.demand,challengeReason:'Cal '+({inverse:'desfer una relació i comprovar-la',constraints:'combinar condicions i justificar tots els casos','error-analysis':'localitzar i explicar un error',connection:'relacionar representacions o propietats',decision:'triar un procediment i justificar-lo'}[f.demand]||'interpretar i justificar relacions entre dades')+'.'}));},
    generate(topic,id){const f=bank[topic].find(f=>f.id===id),q=f.build();q.audit={...q.audit,topic,id};return q;}
  };
})();
