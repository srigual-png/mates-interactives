/* Banc independent dels modes de pràctica. URLs relatives a aquest script. */
(function (root) {
  'use strict';
  const baseUrl = typeof document === 'undefined' ? null : document.currentScript.src;
  const integer = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
  const fmt = value => String(value).replace('.', ',');
  const senses = { numeric: 'Sentit numèric', algebraic: 'Sentit algebraic', mesura: 'Sentit de la mesura', espacial: 'Sentit espacial', estocastic: 'Sentit estocàstic' };
  function exercise(sense, topic, page, question, answer, steps, extra = {}) {
    return { course: '1eso', courseLabel: '1r ESO', sense: senses[sense], topic,
      question, answer, answerLabel: fmt(answer), steps, type: 'number',
      theoryPath: `1eso/teoria/${sense}/${page}-1r-eso.html`, ...extra };
  }
  const banks = { '1eso': [
    () => {
      const a = integer(-9, -1), b = integer(2, 12);
      return exercise('numeric', 'Nombres enters', 'nombres-enters', `Calcula: (${a}) + ${b}`, a + b,
        [`Els nombres tenen signes diferents: restem els valors absoluts ${Math.max(-a, b)} − ${Math.min(-a, b)}.`, 'El resultat té el signe del nombre amb valor absolut més gran; si són iguals, és 0.', `(${a}) + ${b} = ${a + b}.`]);
    },
    () => {
      const d = integer(3, 9), a = integer(1, d - 1), b = integer(1, d - 1);
      return exercise('numeric', 'Fraccions', 'fraccions', `Calcula: ${a}/${d} + ${b}/${d}`, (a + b) / d,
        ['Amb el mateix denominador, sumem els numeradors i conservem el denominador.', `(${a} + ${b})/${d} = ${a + b}/${d}. Pots simplificar la fracció.`],
        { answerLabel: `${a + b}/${d}`, hint: 'Escriu una fracció (com 3/4) o un decimal equivalent.' });
    },
    () => {
      const a = integer(2, 6), n = integer(2, 3), result = a ** n;
      return exercise('numeric', 'Potències', 'potencies-arrels', `Calcula ${a}${n === 2 ? '²' : '³'}.`, result,
        [`Una potència multiplica la base per si mateixa ${n} vegades.`, `${Array(n).fill(a).join(' × ')} = ${result}.`]);
    },
    () => {
      const x = integer(2, 12), b = integer(2, 15), c = x + b;
      return exercise('algebraic', 'Equacions de primer grau', 'equacions-primer-grau', `Troba x: x + ${b} = ${c}.`, x,
        [`Restem ${b} als dos membres de la igualtat.`, `x = ${c} − ${b} = ${x}.`, `Comprovació: ${x} + ${b} = ${c}.`], { hint: 'Escriu només el valor de x.' });
    },
    () => {
      const a = integer(1, 8), step = integer(2, 5), values = [a, a + step, a + 2 * step];
      return exercise('algebraic', 'Patrons numèrics', 'patrons-numerics-geometrics', `Quin és el nombre següent? ${values.join(', ')}, …`, a + 3 * step,
        [`Cada terme augmenta en ${step}: ${values[1]} − ${a} = ${step} i ${values[2]} − ${values[1]} = ${step}.`, `El següent és ${values[2]} + ${step} = ${a + 3 * step}.`]);
    },
    () => {
      const a = integer(3, 12), b = integer(2, 8), p = 2 * (a + b);
      return exercise('mesura', 'Perímetres', 'perimetres', `Un rectangle té costats de ${a} cm i ${b} cm. Quin és el perímetre, en cm?`, p,
        ['El perímetre és la suma dels quatre costats; els costats oposats del rectangle són iguals.', `${a} + ${b} + ${a} + ${b} = 2 × (${a} + ${b}) = ${p} cm.`]);
    },
    () => {
      const cm = integer(12, 250);
      return exercise('mesura', 'Conversions d’unitats', 'conversions-unitats', `Expressa ${cm} cm en metres.`, cm / 100,
        ['1 metre equival a 100 centímetres. Per passar de cm a m, dividim per 100.', `${cm} ÷ 100 = ${fmt(cm / 100)} m.`], { hint: 'Escriu el nombre de metres, sense la unitat. Pots usar coma o punt decimal.' });
    },
    () => {
      const angle = integer(2, 17) * 10, options = ['Angle agut', 'Angle recte', 'Angle obtús', 'Angle pla'];
      const answer = angle < 90 ? options[0] : angle === 90 ? options[1] : options[2];
      return exercise('espacial', 'Angles', 'angles-relacions', `Quin tipus d’angle mesura ${angle}°?`, answer,
        ['Un angle agut mesura menys de 90°; un recte, 90°; un obtús, més de 90° i menys de 180°; un pla, 180°.', `${angle}° ${angle < 90 ? 'és menor que 90°' : angle === 90 ? 'és exactament 90°' : 'està entre 90° i 180°'}: és un ${answer.toLowerCase()}.`],
        { type: 'choice', options, answerLabel: answer });
    },
    () => {
      const middle = integer(3, 8), delta = integer(1, 2), values = [middle - delta, middle, middle + delta];
      return exercise('estocastic', 'Mitjana aritmètica', 'mitjana-aritmetica', `Calcula la mitjana de: ${values.join(', ')}.`, middle,
        [`Sumem les tres dades: ${values.join(' + ')} = ${3 * middle}.`, `Dividim pel nombre de dades: ${3 * middle} ÷ 3 = ${middle}.`]);
    },
    () => {
      const red = integer(1, 5), blue = integer(1, 5), total = red + blue;
      return exercise('estocastic', 'Probabilitat', 'probabilitat', `Una bossa conté ${red} boles vermelles i ${blue} de blaves, totes iguals al tacte. Si en treus una a l’atzar, quina probabilitat hi ha que sigui vermella?`, red / total,
        [`Hi ha ${red} casos favorables (boles vermelles) i ${red} + ${blue} = ${total} casos possibles, tots igualment probables.`, `Probabilitat = casos favorables / casos possibles = ${red}/${total}.`],
        { answerLabel: `${red}/${total}`, hint: 'Escriu una fracció (com 1/2) o un decimal equivalent; no un percentatge.' });
    }
  ] };
  function parseNumber(raw) {
    const parts = raw.trim().replace(/−/g, '-').split('/');
    if (parts.length > 2 || parts.some(p => !/^[+-]?(?:\d+(?:[.,]\d+)?|[.,]\d+)$/.test(p.trim()))) return null;
    const values = parts.map(p => Number(p.trim().replace(',', '.')));
    const value = parts.length === 2 ? values[0] / values[1] : values[0];
    return Number.isFinite(value) ? value : null;
  }
  function validate(ex, raw) {
    if (ex.type === 'choice') return raw === ex.answer;
    const value = parseNumber(raw);
    return value !== null && Math.abs(value - ex.answer) <= 1e-9;
  }
  function generate(courses, previous) {
    const generators = courses.flatMap(course => banks[course] || []);
    if (!generators.length) throw new Error('No hi ha exercicis per al curs configurat.');
    let next;
    for (let attempt = 0; attempt < 20; attempt++) {
      next = generators[integer(0, generators.length - 1)]();
      if (!previous || next.question !== previous.question || next.topic !== previous.topic) return next;
    }
    // També evita la repetició amb fonts aleatòries constants o simulades.
    for (const generator of generators) {
      next = generator();
      if (next.question !== previous.question || next.topic !== previous.topic) return next;
    }
    return next;
  }
  root.MIPortadaBank = { generate, validate, parseNumber, banks,
    theoryUrl: ex => new URL(`../../${ex.theoryPath}`, baseUrl).href };
})(typeof window === 'undefined' ? globalThis : window);
