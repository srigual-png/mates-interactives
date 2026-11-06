window.MIDivisibilitat = (() => {
  const families = [
    [[1, 2, 5], [3], [6]],
    [[4, 'factor-error'], [7], ['G'], ['H'], ['I'], ['F02'], ['F05']],
    [[1001], ['F03'], ['F08']]
  ];
  const criteria = {
    2: 'l’última xifra és parella',
    3: 'la suma de les xifres és múltiple de 3',
    4: 'les dues últimes xifres formen un múltiple de 4',
    5: 'l’última xifra és 0 o 5',
    6: 'es compleixen els criteris del 2 i del 3',
    9: 'la suma de les xifres és múltiple de 9',
    10: 'l’última xifra és 0'
  };
  const bases = [2, 3, 4, 5, 6, 9, 10];
  const digitBases = [2, 3, 5, 9, 10];
  const yesNo = [false, true];
  const label = yes => yes ? 'Sí' : 'No';
  const pick = (items, rnd) => items[rnd(0, items.length - 1)];
  const range = (min, max) => Array.from({length: max - min + 1}, (_, i) => min + i);
  const digits = n => [...String(n)].map(Number);
  const digitSum = n => digits(n).reduce((sum, digit) => sum + digit, 0);
  const list = items => items.join('; ');
  const normal = value => String(value).trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const integer = value => {
    const input = String(value).trim();
    if (!/^\+?\d{1,15}$/.test(input)) return null;
    return Number(input);
  };
  const readYes = value => {
    const input = normal(value);
    return input === 'si' ? true : input === 'no' ? false : null;
  };

  function divisors(n) {
    if (!Number.isSafeInteger(n) || n < 1) throw RangeError('Cal un enter positiu per enumerar els divisors.');
    const small = [], large = [];
    for (let d = 1; d*d <= n; d++) {
      if (n % d !== 0) continue;
      small.push(d);
      if (d*d !== n) large.push(n/d);
    }
    return small.concat(large.reverse());
  }

  function isPrime(n) {
    return n > 1 && divisors(n).length === 2;
  }

  function classify(n) {
    return n <= 1 ? 'Ni primer ni compost' : isPrime(n) ? 'Primer' : 'Compost';
  }

  function verifyFactors(input, n, primeOnly) {
    const text = String(input).trim();
    if (!text || text.length > 120) return false;
    const superscripts = '⁰¹²³⁴⁵⁶⁷⁸⁹';
    const factors = text.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]+/g, s => '^' + [...s].map(d => superscripts.indexOf(d)).join(''))
      .split(/[×xX*·⋅]/);
    if (!primeOnly && factors.length !== 2) return false;
    let remaining = n;
    for (const factor of factors) {
      const match = factor.trim().match(primeOnly ? /^(\d{1,6})(?:\s*\^\s*(\d{1,2}))?$/ : /^(\d{1,6})$/);
      if (!match) return false;
      const base = Number(match[1]), exponent = Number(match[2] ?? 1);
      if (base < 2 || base > remaining || exponent < 1 || (primeOnly && !isPrime(base))) return false;
      for (let i = 0; i < exponent; i++) {
        if (remaining % base !== 0) return false;
        remaining /= base;
      }
    }
    return remaining === 1;
  }

  function matches(answer, input) {
    const text = String(input).trim();
    if (text.length > 240) return false;
    const n = integer(text);
    const fields = text.split(';');
    switch (answer.kind) {
      case 'integer': return n === answer.value;
      case 'boolean': return readYes(text) === answer.value || (!!answer.phrase && normal(text) === normal(answer.phrase));
      case 'pair': return fields.length === 2 && fields.every((value, i) => readYes(value) === answer.values[i]);
      case 'class': return [answer.value,...(answer.aliases || [])].some(value => normal(text) === normal(value));
      case 'multiple': return n !== null && n >= answer.min && n <= answer.max && n % answer.base === 0;
      case 'nondivisor': return n !== null && n >= 1 && n <= answer.n && answer.n % n !== 0;
      case 'interval': return n !== null && n >= answer.min && n <= answer.max && answer.bases.every(d => n % d === 0);
      case 'factor': return verifyFactors(text, answer.n, true);
      case 'product': return verifyFactors(text, answer.n, false);
      case 'list': {
        if (!/^\d+(?:(?:\s*[,;]\s*|\s+)\d+)*$/.test(text)) return false;
        const tokens = text.split(/[,;\s]+/);
        if (answer.digits && tokens.some(token => token.length !== 1)) return false;
        const values = tokens.map(integer);
        return values.length === answer.values.length && new Set(values).size === values.length &&
          values.every(value => answer.values.includes(value));
      }
      case 'compound': {
        const separator = text.indexOf(';');
        return separator >= 0 && matches(answer.first, text.slice(0, separator)) && matches(answer.second, text.slice(separator + 1));
      }
      case 'reasoning': {
        if (typeof input !== 'object' || !input) return text === answer.option;
        if (readYes(input.verdict) !== answer.truth) return false;
        if (!answer.counterexample) return input.reason === answer.reason;
        const value = integer(input.counterexample);
        const {m,d} = answer.counterexample;
        return value !== null && value >= 1 && value <= 60 && value % m === 0 && value % d !== 0;
      }
      default: return false;
    }
  }

  function criterionWork(n, d) {
    if (d === 3 || d === 9) return `La suma de xifres és ${digits(n).join(' + ')} = ${digitSum(n)}.`;
    if (d === 6) return `Última xifra: ${n%10}. Suma de xifres: ${digitSum(n)}.`;
    return d === 4 ? `Les dues últimes xifres formen ${n%100}.` : `L’última xifra és ${n%10}.`;
  }

  function exercise(type, question, correct, wrongs, answer, guide, solution, section, buildOpts, extra = {}) {
    const choices = [String(correct), ...wrongs.map(String)];
    if (choices.length !== 4 || new Set(choices).size !== 4 ||
        !matches(answer, choices[0]) || choices.slice(1).some(option => matches(answer, option))) {
      throw Error('Opcions de divisibilitat incoherents: ' + type);
    }
    return {type, question, correct: String(correct), options: buildOpts(String(correct), choices.slice(1)),
      divisAnswer: answer, guide: [guide], solution, divisTheory: section, ...extra};
  }

  function listWrongs(values, invalid) {
    return [values.length > 1 ? list(values.slice(0, -1)) : 'Cap',
      list([...values, invalid]), list([...values, values[0]])];
  }

  function generate(type, rnd, buildOpts, factorText, factorSteps, practice = false) {
    const task = (...args) => exercise(type, ...args);
    if (type === 1 || type === 5) {
      const d = type === 1 ? pick(bases, rnd) : rnd(2, 12);
      const min = 0, max = d*30, q = rnd(2, 30), n = d*q;
      const wrongs = [n-1, n+1, n-d+1];
      if (d === 2) wrongs[2] = n+3;
      const question = type === 1 ? `Quin nombre és divisible per ${d}?` : `Quin nombre és múltiple de ${d}?`;
      const calculation = `${n} = ${d} × ${q}; el residu és 0.`;
      return task(question, n, wrongs, {kind:'multiple', base:d, min, max},
        'Busca un producte del divisor per un enter.',
        type === 1 ? [`Criteri: ${criteria[d]}.`, criterionWork(n,d), calculation] : [calculation],
        type === 1 ? 'criteris' : 'divisibilitat', buildOpts,
        {diff:1, practiceKey:`A:testimoni:${d}`, divisOpenQuestion:`Escriu un múltiple de ${d} entre ${min} i ${max}, tots dos inclosos.`,
          divisOpenSolution:[`Un exemple vàlid és ${n}.`, calculation]});
    }
    if (type === 2 || (type === 6 && practice)) {
      const direct = type === 2;
      const d = direct ? pick(bases, rnd) : rnd(2, 12);
      const q = direct ? rnd(Math.ceil(100/d), Math.floor(990/d)) : rnd(1, 8);
      const r = rnd(0, 1) ? 0 : rnd(1, d-1);
      const n = d*q+r, yes = r === 0;
      const question = direct ? `És ${n} divisible per ${d}?` : `És ${d} divisor de ${n}?`;
      const correct = label(yes);
      return task(question, correct, [label(!yes), 'Depèn del quocient', 'Depèn del nombre de xifres'],
        {kind:'boolean', value:yes, phrase:`${correct}, ${yes ? '' : 'no '}és divisible per ${d}`},
        direct ? `Recorda el criteri del ${d}.` : 'Comprova si la divisió té residu 0.',
        [...(direct ? [`Criteri: ${criteria[d]}.`, criterionWork(n,d)] : []),
          `${n} = ${d} × ${q} + ${r}; residu ${r}. ${correct}.`],
        direct ? 'criteris' : 'divisibilitat', buildOpts, {diff:direct ? 1 : 2, practiceKey:`${type}:${n}:${d}`});
    }
    if (type === 3) {
      const n = rnd(0, 97), value = classify(n);
      const classes = ['Primer', 'Compost', 'Ni primer ni compost', 'Primer i compost'];
      return task(`El nombre ${n} és primer, compost o cap dels dos?`, value, classes.filter(item => item !== value),
        {kind:'class', value, aliases:n <= 1 ? ['cap dels dos'] : []},
        n === 0 ? 'Pensa què dona multiplicar qualsevol enter positiu per 0.' : 'Compta els divisors positius.',
        [n === 0 ? 'Qualsevol enter positiu divideix 0. Els primers i compostos són enters més grans que 1.' :
          `Divisors positius de ${n}: ${divisors(n).join(', ')}.`, `Classificació: ${value}.`],
        'primers', buildOpts, {diff:2, practiceKey:`B:${n}`});
    }
    if (type === 4 || type === 'factor-error') {
      const n = pick(range(12,144).filter(value => !isPrime(value)), rnd);
      if (type === 'factor-error') {
        const d = divisors(n).slice(1,-1).find(value => !isPrime(value));
        const sameProduct = rnd(0,1) === 0;
        const shown = sameProduct ? (d ? `${d} × ${n/d}` : `${n} × 1`) : factorText(n+1);
        const values = [sameProduct,!sameProduct], correct = list(values.map(label));
        const options = yesNo.flatMap(x => yesNo.map(y => list([label(x),label(y)])));
        return task(`Algú proposa ${shown} com a factorització primera de ${n}. El producte dona ${n}? Tots els factors són primers? Respon les dues preguntes en aquest ordre.`,
          correct, options.filter(option => option !== correct), {kind:'pair',values},
          'Comprova per separat el producte i la primalitat.',
          [sameProduct ? `${shown} = ${n}, però ${d || n} és compost.` : `Els factors són primers, però el producte és ${n+1}.`,
            ...factorSteps(n)], 'factoritzacio', buildOpts, {practiceKey:`C:diagnostic:${n}:${sameProduct}`});
      }
      return task(`Factoritza ${n} en factors primers.`, factorText(n), [factorText(n-1), factorText(n+1), factorText(n+2)],
        {kind:'factor', n}, 'Divideix successivament per nombres primers.', factorSteps(n), 'factoritzacio', buildOpts,
        {diff:2, practiceKey:`C:factor:${n}`});
    }
    if (type === 6) {
      const n = pick(range(12,96).filter(value => !isPrime(value)), rnd), ds = divisors(n);
      const d = pick(range(2,n-1).filter(value => n % value !== 0), rnd);
      return task(`Quin nombre no és divisor de ${n}?`, d, ds.slice(0,3), {kind:'nondivisor', n},
        'Un divisor ha de dividir el nombre exactament.', [`Divisors: ${ds.join(', ')}.`, `${n} ÷ ${d} té residu ${n%d}.`],
        'divisibilitat', buildOpts, {diff:2, divisOpenQuestion:`Escriu un enter entre 1 i ${n} que no sigui divisor de ${n}.`,
          divisOpenSolution:[`Divisors: ${ds.join(', ')}.`, `Un exemple vàlid és ${d}, perquè el residu és ${n%d}.`]});
    }
    if (type === 7) {
      const n = rnd(20,80), a = rnd(3,6), b = pick([3,4,5,6].filter(d => d !== a), rnd);
      const values = [n%a === 0,n%b === 0], correct = list(values.map(label));
      const options = yesNo.flatMap(x => yesNo.map(y => list([label(x),label(y)])));
      return task(`Hi ha ${n} fitxes. Es poden repartir en grups de ${a}? I en grups de ${b}? Comprova cada mida per separat i en aquest ordre, sense que sobri cap fitxa.`,
        correct, options.filter(option => option !== correct), {kind:'pair', values}, 'Comprova els dos residus per separat.',
        [`${n} ÷ ${a}: residu ${n%a}. ${label(values[0])}.`, `${n} ÷ ${b}: residu ${n%b}. ${label(values[1])}.`],
        'divisibilitat', buildOpts, {diff:3,isProblem:true,practiceKey:`E:${n}:${[a,b].sort().join(':')}`});
    }
    if (type === 'G') {
      const n = rnd(12,96), filtered = rnd(0,1) && n % 2 === 0, all = divisors(n);
      const values = filtered ? all.filter(d => d % 2 === 0 && d > 2) : all;
      const pairs = all.filter(d => d*d <= n).map(d => `${d} × ${n/d}`);
      return task(filtered ? `Escriu tots els divisors parells de ${n} més grans que 2.` : `Escriu tots els divisors positius de ${n}.`,
        list(values), listWrongs(values, n+1), {kind:'list', values}, 'Troba parelles de factors i compta els quadrats una sola vegada.',
        [`Parelles de factors: ${pairs.join(', ')}.`, `Divisors demanats: ${values.join(', ')}.`],
        'divisibilitat', buildOpts, {practiceKey:`G:${n}:${Boolean(filtered)}`});
    }
    if (type === 'H') {
      const n = rnd(120,999), d = pick(digitBases,rnd), r = n%d, value = r === 0 ? 0 : d-r;
      return task(`Quin és el mínim enter no negatiu que cal sumar a ${n} perquè sigui divisible per ${d}?`,
        value, [value+1,value+2,value+d+2], {kind:'integer', value}, 'Calcula el residu i el complement.',
        [`${n} ÷ ${d}: residu ${r}.`, r === 0 ? 'Ja és divisible. Cal sumar 0.' : `Falten ${d} − ${r} = ${value} fins a ${n+value}.`],
        'criteris', buildOpts, {practiceKey:`H:${n}:${d}`});
    }
    if (type === 'I') {
      const prefix = rnd(12,98), d = pick(digitBases,rnd), values = range(0,9).filter(x => (10*prefix+x)%d === 0);
      return task(`Escriu totes les xifres que poden completar ${prefix}□ perquè sigui divisible per ${d}.`,
        list(values), listWrongs(values,range(0,9).find(x => !values.includes(x))), {kind:'list', values, digits:true},
        `Recorda que ${criteria[d]}.`, [`Provem les xifres de 0 a 9 amb el criteri del ${d}.`,
          ...([3,9].includes(d) ? [`La suma de les xifres fixes és ${digitSum(prefix)}.`] : []),
          `Les xifres admissibles són ${values.join(', ')}.`], 'criteris', buildOpts, {practiceKey:`I:${prefix}:${d}`});
    }
    if (type === 'F02') {
      const pairs = [[2,3],[2,5],[2,9],[3,5],[3,10],[5,9],[9,10]];
      let data;
      const classifyInterval = (a,b,min,max) => {
        const groups = [[],[],[],[]];
        for (let n=min;n<=max;n++) groups[(n%a === 0 ? 2 : 0)+(n%b === 0 ? 1 : 0)].push(n);
        return groups[3].length === 1 && groups.slice(0,3).every(group => group.length)
          ? {a,b,min,max,value:groups[3][0],wrongs:[groups[2][0],groups[1][0],groups[0][0]], candidates:groups[1].concat(groups[3]).sort((x,y)=>x-y)} : null;
      };
      for (let i=0;i<12 && !data;i++) {
        const [a,b] = pick(pairs,rnd), min = rnd(10,125);
        data = classifyInterval(a,b,min,Math.min(150,min+rnd(9,25)));
      }
      const {a,b,min,max,value,wrongs,candidates} = data || classifyInterval(3,5,22,36);
      return task(`Quin enter entre ${min} i ${max}, tots dos inclosos, és divisible per ${a} i per ${b}?`,
        value, wrongs, {kind:'interval', min,max,bases:[a,b]}, 'Filtra primer per un divisor i després per l’altre.',
        [`Múltiples de ${b} dins l’interval: ${candidates.join(', ')}.`, `Només ${value} té residu 0 en dividir per ${a}.`],
        'criteris', buildOpts, {practiceKey:`F02:${min}:${max}:${a}:${b}`});
    }
    if (type === 'F05') {
      const a = rnd(2,12), b = rnd(2,15), n = a*b;
      return task(`Demostra que ${n} és compost escrivint un producte de dos enters més grans que 1.`,
        `${a} × ${b}`, [`1 × ${n}`,`${a} × ${b+1}`,`${a+1} × ${b}`], {kind:'product',n},
        'Busca una divisió exacta per un divisor diferent d’1 i del nombre.',
        [`Un exemple: ${n} ÷ ${a} = ${b}, amb residu 0.`, `${a} i ${b} són més grans que 1, així que ${n} és compost.`],
        'primers', buildOpts, {practiceKey:`F05:${n}`});
    }
    if (type === 'F03') {
      const d = pick([3,9,5],rnd), n = rnd(100,999), usesLastDigit = d !== 5;
      const last = n%10, sum = digitSum(n);
      const confusedDivisor = d === 3 ? 9 : 3;
      const confuseSum = d !== 5 && rnd(0,1) === 1;
      const claimed = confuseSum ? sum%confusedDivisor === 0 : usesLastDigit ? last%d === 0 : sum%5 === 0;
      const truth = claimed === (n%d === 0);
      const evidence = confuseSum ? `la suma de les xifres és ${sum} i ${sum%confusedDivisor === 0 ? 'és' : 'no és'} múltiple de ${confusedDivisor}` :
        usesLastDigit ? `acaba en ${last}` : `la suma de les xifres és ${sum}`;
      const rule = base => base === 5 ? 'Comprovar si l’última xifra és 0 o 5.' :
        `Comprovar si la suma de xifres és múltiple de ${base}.`;
      const reason = rule(d), reasons = [reason,rule(confusedDivisor),d === 5 ? rule(9) : rule(5)];
      const verdict = yes => yes ? 'La conclusió és certa.' : 'La conclusió és falsa.';
      const explanation = `La justificació és incorrecta. ${reason} ${criterionWork(n,d)} ${n} ${n%d === 0 ? 'és' : 'no és'} divisible per ${d}.`;
      const correct = `${verdict(truth)} ${explanation}`;
      const statement = `Un alumne afirma:<br>«${n} ${claimed ? 'és' : 'no és'} divisible per ${d} perquè ${evidence}.»`;
      return task(statement+'<br>Quina resposta explica millor l’error?', correct,
        [`${verdict(!truth)} ${reason}`, `${verdict(truth)} ${reasons[1]}`, `${verdict(!truth)} ${reasons[2]}`],
        {kind:'reasoning',option:correct,truth,reason},
        'Comprova el nombre amb el criteri correcte i després valora la conclusió i la justificació per separat.',
        [reason, criterionWork(n,d), `${n} ${n%d === 0 ? 'és' : 'no és'} divisible per ${d}.`,
          `La conclusió era ${truth ? 'certa' : 'falsa'}, però la justificació aplicava un criteri inadequat.`],
        'criteri-incorrecte', buildOpts, {practiceKey:`F03:${n}:${d}`,divisOpenQuestion:statement,
          divisReasoning:{prompt:'És certa la conclusió de l’alumne?',reasonPrompt:'Quin és el criteri correcte per comprovar-ho?',reasons}});
    }
    if (type === 'F08') {
      const m = rnd(2,12), d = pick(range(2,12).filter(value => value !== m),rnd), truth = m%d === 0;
      const reason = `${m} és divisible per ${d}. Si multipliquem ${m} per qualsevol enter, el resultat continua sent divisible per ${d}.`;
      const example = `${m*d} és múltiple de ${m} i de ${d}, i amb aquest exemple n’hi ha prou.`;
      const reverse = `Qualsevol múltiple de ${d} és també múltiple de ${m}.`;
      const correct = truth ? `Sí. ${reason}` : `No, perquè ${m} és múltiple de ${m} però no de ${d}.`;
      const wrongs = [`Sí, perquè ${example}`, `Sí, perquè ${reverse.toLowerCase()}`,
        `No, perquè ${m*d} és múltiple de ${m} però no de ${d}.`];
      const statement = `Un alumne afirma:<br>«Tots els múltiples de ${m} també són múltiples de ${d}.»`;
      return task(statement+'<br>És correcta aquesta afirmació? Tria la resposta que ho justifica millor.',
        correct, wrongs, {kind:'reasoning',option:correct,truth,reason,counterexample:truth ? null : {m,d}},
        'Un exemple que compleix la regla només comprova un cas. Busca un motiu que valgui per a tots o un cas que la contradigui.',
        truth ? ['L’afirmació és certa.',reason] :
          [`L’afirmació és falsa. ${m} és múltiple de ${m}, però deixa residu ${m%d} en dividir-lo per ${d}.`,
            'Un contraexemple és un cas que compleix la primera condició i falla la segona. Un de sol basta per demostrar que la regla és falsa.'],
        'prova-contraexemple', buildOpts, {practiceKey:`F08:${m}:${d}`,divisOpenQuestion:statement,
          divisReasoning:{prompt:'És certa l’afirmació?',reasonPrompt:'Per què és certa?',reasons:[reason,example,reverse],conditional:true}});
    }
    throw Error('Tipus de divisibilitat desconegut: ' + type);
  }

  function reserves(family) {
    if (family === families[0][0]) return range(1,8).map(i => [2,[i%7,Math.ceil(100/bases[i%7])+i,i%2,1]]);
    if (family === families[0][1]) return [1,2,3,4,9,11,21,29].map(n => [3,[n]]);
    return range(1,8).map(i => [6,[i+1,i,i%2,1]]);
  }

  function reasoningReview(record) {
    const question = record.question || '';
    const answer = String(record.answer || '');
    let draws, given;
    if (record.type === 'F03') {
      const old = question.match(/^«(\d{3}) (?:no )?és divisible per ([359]) perquè/);
      if (!old) return record;
      draws = [[3,9,5].indexOf(Number(old[2])),Number(old[1]),0];
      const coded = normal(answer).match(/^(c|certa|f|falsa)\s*;\s*([su])$/);
      if (coded) given = (coded[1].startsWith('c') ? 'Conclusió certa.' : 'Conclusió falsa.')+
        (coded[2] === 's' ? ' Sumar les xifres.' : ' Comprovar l’última xifra.');
    } else if (record.type === 'F08') {
      const old = question.match(/^«Tots els múltiples de (\d+) són múltiples de (\d+)\.» Si és cert,/);
      if (!old) return record;
      const m = Number(old[1]), d = Number(old[2]);
      if (m < 2 || m > 12 || d < 2 || d > 12 || m === d) return record;
      draws = [m,range(2,12).filter(value => value !== m).indexOf(d)];
      const coded = normal(answer).match(/^([pc])\s*;\s*(\d+)$/);
      if (coded) given = coded[1] === 'c' ? `No. Nombre proposat: ${coded[2]}.` :
        `Sí. Proposta: ${m} és ${coded[2]} vegades ${d}.`;
    } else return record;
    const exercise = generate(record.type,()=>draws.shift(),(correct,wrongs)=>[correct,...wrongs]);
    return {...record,question:exercise.divisOpenQuestion,correct:exercise.correct,answer:given ?? answer,
      guide:exercise.guide,review:exercise.guide,solution:exercise.solution,divisTheory:exercise.divisTheory};
  }

  return {families, generate, matches, divisors, classify, digitBases, reserves, reasoningReview};
})();
