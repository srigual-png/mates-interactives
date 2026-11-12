window.MIJerarquia = (() => {
  const familySpecs = Object.freeze([
    {id:'precedencia-productes-i-operacions',level:1,generators:[1,2],practiceTypes:[1,2]},
    {id:'operacions-equivalents-esquerra-dreta',level:1,generators:['L01'],practiceTypes:['L01']},
    {id:'identificar-o-fer-el-primer-pas',level:1,generators:['F01','F02'],practiceTypes:['F01','F02']},
    {id:'potencies-dins-expressions-combinades',level:2,generators:[3,6,'B1','B2','B3','jerarquia-1','jerarquia-2','jerarquia-3'],practiceTypes:[3,6,'B1','B2','B3']},
    {id:'operar-amb-parentesis-i-claudators',level:2,generators:[4,5,8,9],practiceTypes:[4,5,8,9]},
    {id:'modelitzar-i-calcular-contextos',level:2,generators:[7,'B4','jerarquia-4'],practiceTypes:[7,'B4']},
    {id:'comparar-efectes-dels-parentesis',level:2,generators:['F03'],practiceTypes:['F03']},
    {id:'trobar-signe-amb-resultat-objectiu',level:2,generators:['F07'],practiceTypes:['F07']},
    {id:'optimitzar-resultat-positiu',level:3,generators:['parentesis-resultat-positiu'],practiceTypes:['parentesis-resultat-positiu']},
    {id:'detectar-i-reparar-primer-error',level:3,generators:['F05'],practiceTypes:['F05']},
    {id:'reconstruir-expressio-amb-restriccions',level:3,generators:['F06'],practiceTypes:['F06']}
  ]);
  const families = [1,2,3].map(level => familySpecs.filter(family=>family.level===level)
    .map(family=>family.practiceTypes));
  function levelFor(type) {
    const family=familySpecs.find(row=>row.generators.includes(type));
    return family ? family.level : null;
  }
  const superscripts = '⁰¹²³⁴⁵⁶⁷⁸⁹';
  const precedence = {'+': 1, '-': 1, '*': 2, '/': 2, '^': 3};
  const operators = ['+', '−', '×', '÷'];

  function normalize(value) {
    return String(value).trim()
      .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]+/g, digits => '^' + [...digits].map(d => superscripts.indexOf(d)).join(''))
      .replace(/[×xX·⋅]/g, '*').replace(/[÷:]/g, '/').replace(/−/g, '-');
  }

  function parse(value) {
    const source = normalize(value);
    if (!source || source.length > 160) return null;
    const tokens = source.match(/\d+|[^\s]/g) || [];
    let index = 0;

    function expression(minimum) {
      const token = tokens[index++];
      let tree;
      if (token === '(' || token === '[') {
        tree = expression(1);
        if (tokens[index++] !== (token === '(' ? ')' : ']')) throw Error();
      } else {
        if (!token || !/^\d+$/.test(token) || !Number.isSafeInteger(Number(token))) throw Error();
        tree = Number(token);
      }
      while (precedence[tokens[index]] >= minimum) {
        const op = tokens[index++];
        tree = [op, tree, expression(precedence[op] + (op === '^' ? 0 : 1))];
      }
      return tree;
    }

    try {
      const tree = expression(1);
      return index === tokens.length ? tree : null;
    } catch {
      return null;
    }
  }

  function evaluate(tree, nonnegative = true) {
    if (tree === null) return null;
    if (typeof tree === 'number') return tree;
    const [op, left, right] = tree;
    const a = evaluate(left, nonnegative), b = evaluate(right, nonnegative);
    if (a === null || b === null) return null;
    const result = op === '+' ? a + b : op === '-' ? a - b :
      op === '*' ? a * b : op === '/' ? a / b : a ** b;
    return Number.isSafeInteger(result) && (!nonnegative || result >= 0) ? result : null;
  }

  function integer(value) {
    const text = String(value).trim();
    if (!/^\+?(?:\d+|\d{1,3}([. \u00a0\u202f])\d{3}(?:\1\d{3})*)$/.test(text)) return null;
    const number = Number(text.replace(/[. \u00a0\u202f]/g, ''));
    return Number.isSafeInteger(number) ? number : null;
  }

  function matches(answer, input) {
    const value = String(input).trim();
    if (answer.kind === 'integer') return integer(value.replace(/\s+punts?$/i, '')) === answer.result;
    if (answer.kind === 'operator') return normalize(value) === normalize(answer.sign);
    if (answer.kind === 'comparison') {
      return value.toUpperCase().replace(/\s/g, '') === 'A' + answer.relation + 'B;' + answer.reason;
    }
    const separator = answer.kind === 'equality' ? '=' : answer.kind === 'repair' ? ';' : null;
    const parts = separator ? value.split(separator) : [value];
    if (parts.length !== (separator ? 2 : 1)) return false;
    if (answer.kind === 'repair' && integer(parts[0]) !== answer.line) return false;
    if (answer.kind === 'equality' && integer(parts[1]) !== answer.result) return false;
    const tree = parse(parts[answer.kind === 'repair' ? 1 : 0]);
    return tree !== null && answer.forms.includes(JSON.stringify(tree));
  }

  function forms(...expressions) {
    return expressions.map(expr => JSON.stringify(parse(expr)));
  }

  function lots(rnd) {
    const packs = rnd(3, 7), basic = rnd(4, 9), extra = rnd(2, 5);
    const total = packs * (basic + extra);
    const cost = rnd(2, Math.min(6, Math.floor(Math.sqrt(packs * basic + extra))));
    const text = `En un joc s’aconsegueixen <b>${packs} lots</b>, cadascun amb <b>${basic} punts bàsics</b> i <b>${extra} punts extra</b>. Després es resta una penalització igual al quadrat de <b>${cost}</b>.`;
    const expression = `${packs} × (${basic} + ${extra}) − ${cost}²`;
    const result = total - cost ** 2;
    const shape = {forms: forms(expression, `(${basic} + ${extra}) × ${packs} − ${cost}²`,
      `${packs} × (${extra} + ${basic}) − ${cost}²`, `(${extra} + ${basic}) × ${packs} − ${cost}²`)};
    const solution = [`Punts per lot: ${basic} + ${extra} = ${basic + extra}.`,
      `Punts dels lots: ${packs} × ${basic + extra} = ${total}.`,
      `Penalització: ${cost}² = ${cost ** 2}.`, `${expression} = ${result}.`];
    return {text, expression, result, total, cost, packs, basic, extra, solution,
      expressionAnswer: {...shape, kind: 'expression'}, equalityAnswer: {...shape, kind: 'equality', result}};
  }

  const orders = [
    ['+', '-', '×'], ['+', '×', '-'], ['-', '+', '×'],
    ['-', '×', '+'], ['×', '+', '-'], ['×', '-', '+']
  ];
  function reconstructions([a, b, c, d]) {
    const candidates = new Map();
    for (const [x, y, z] of orders) {
      for (const expression of [
        `((${a} ${x} ${b}) ${y} ${c}) ${z} ${d}`,
        `(${a} ${x} (${b} ${y} ${c})) ${z} ${d}`,
        `(${a} ${x} ${b}) ${y} (${c} ${z} ${d})`,
        `${a} ${x} ((${b} ${y} ${c}) ${z} ${d})`,
        `${a} ${x} (${b} ${y} (${c} ${z} ${d}))`
      ]) {
        const tree = parse(expression);
        candidates.set(JSON.stringify(tree), {expression, result: evaluate(tree)});
      }
    }
    return [...candidates.values()];
  }

  function operatorSolutions(a, b, c, target) {
    return operators.filter(sign => evaluate(parse(`${a} ${sign} ${b} × ${c}`), false) === target);
  }

  const theorySections = Object.freeze({
    1:'multiplicacions',2:'multiplicacions',3:'potencies',4:'parentesis',5:'parentesis',6:'combinades',
    8:'claudators',9:'claudators',B1:'combinades',B2:'combinades',B3:'combinades',B4:'problemes',
    L01:'esquerra-dreta',F01:'primer-pas',F02:'un-sol-pas',F03:'comparar-parentesis',F07:'signe-desconegut',
    'parentesis-resultat-positiu':'resultat-positiu',1001:'resultat-positiu',
    F05:'reparar-error',F06:'reconstruir-expressio'
  });

  function generate(type, rnd, buildOpts) {
    function exercise(question, correct, distractors, answer, hint, guide, solution) {
      return {type, question, correct: String(correct), options: buildOpts(String(correct), distractors.map(String)),
        jerarquiaAnswer: answer, jerarquiaHint: hint, guide: [guide], solution, jerarquiaTheory: theorySections[type]};
    }
    const a = rnd(2, 9), b = rnd(2, 9), c = rnd(2, 9), d = rnd(2, 9);
    const math = expression => `<br><span class="fc">${expression}</span>`;
    const expressionHint = 'Escriu l’expressió. Pots usar ×, *, ÷, /, : i ^.';

    if (type === 'L01') {
      const division = rnd(0, 1);
      const first = division ? `${a*b*c} ÷ ${b}` : `${a+b+c} − ${b}`;
      const intermediate = division ? a*c : a+c;
      const last = division ? `× ${c}` : `+ ${c}`;
      const result = division ? intermediate*c : intermediate+c;
      const rightGroup = division ? `${a*b*c} ÷ (${b} × ${c})` : `${a+b+c} − (${b} + ${c})`;
      return exercise('Calcula d’esquerra a dreta.' + math(first + ' ' + last), result,
        [a, intermediate, division ? b*c : a+b+c, result+c], null, '',
        'Quan les operacions tenen la mateixa prioritat, comença per l’esquerra.',
        [`${first} = ${intermediate}.`, `${intermediate} ${last} = ${result}.`, `Amb una agrupació diferent, ${rightGroup} = ${a}.`]);
    }

    if (type === 'F01' || type === 'F02') {
      const isFirst = type === 'F01';
      const variant = rnd(0, 2);
      const [original, first, next, other] = [
        isFirst ? [`${a} + ${b} × (${c+d} − ${d})`, `${c+d} − ${d}`, `${a} + ${b} × ${c}`] :
          [`${a*b} ÷ (${b+c} − ${c}) + ${d}`, `${b+c} − ${c}`, `${a*b} ÷ ${b} + ${d}`, `${a} + ${d}`],
        [`${a} + ${b} × ${c}²`, `${c}²`, `${a} + ${b} × ${c*c}`, `${a} + ${b*c*c}`],
        [`${a} + ${b} × ${c} − ${d > a ? a : d}`, `${b} × ${c}`, `${a} + ${b*c} − ${d > a ? a : d}`, `${a+b*c} − ${d > a ? a : d}`]
      ][variant];
      const correct = isFirst ? first : next;
      const task = exercise((isFirst ? 'Quina operació cal fer primer? Escriu-la sense resoldre-la.' :
        'Escriu l’expressió que queda després de fer exactament el primer pas.') + math(original),
        correct, isFirst ? [evaluate(parse(first)), next, original] : [other, evaluate(parse(original)), original],
        {kind: 'expression', forms: forms(correct)}, expressionHint,
        isFirst ? 'Busca l’operació amb més prioritat. Si n’hi ha més d’una, mira l’ordre.' :
          'Calcula una sola operació i conserva la resta de l’expressió.',
        [`Primer: ${first} = ${evaluate(parse(first))}.`, `L’expressió queda ${next}.`]);
      return {...task, practiceKey: original};
    }

    if (type === 'F03') {
      const variant = rnd(0, 2);
      const flat = `${a} + ${b} × ${c}`, grouped = `(${a} + ${b}) × ${c}`;
      const expressions = [[flat, grouped], [flat, `${a} + (${b} × ${c})`], [grouped, flat]][variant];
      const values = expressions.map(expression => evaluate(parse(expression)));
      const relation = ['<', '=', '>'][variant], reason = variant === 1 ? 'B' : 'A';
      const label = (sign, code) => `A ${sign} B; ${code}`;
      return exercise('Compara les expressions i tria el motiu.' + math('A: ' + expressions[0]) + math('B: ' + expressions[1]) +
        '<br><b>Motiu A:</b> Els parèntesis fan que es calculi una suma abans d’un producte.' +
        '<br><b>Motiu B:</b> Els parèntesis mantenen el producte que ja tenia prioritat.',
        label(relation, reason), [label(relation, reason === 'A' ? 'B' : 'A'),
          ...['<', '=', '>'].filter(sign => sign !== relation).map(sign => label(sign, reason))],
        {kind: 'comparison', relation, reason}, 'Escriu la relació i el motiu. Format: A < B; A.',
        'Calcula A i B i comprova quina operació es fa primer a cada expressió.',
        [`A = ${values[0]}. B = ${values[1]}.`, `Per tant, ${label(relation, reason)}.`]);
    }

    if (type === 'F07') {
      // A multiple of b × c gives an exact quotient even under the wrong grouping.
      const left = (a + 2)*b*c;
      const result = sign => evaluate(parse(`${left} ${sign} ${b} × ${c}`));
      const unique = operators.filter(sign => operatorSolutions(left, b, c, result(sign)).length === 1);
      const sign = unique[rnd(0, unique.length - 1)], target = result(sign);
      return exercise('Quin signe falta? Escriu només el signe.' + math(`${left} □ ${b} × ${c} = ${target}`),
        sign, operators.filter(op => op !== sign), {kind: 'operator', sign}, 'Escriu un signe: +, −, × o ÷.',
        'Prova els quatre signes respectant la jerarquia.', operators.map(op => `${left} ${op} ${b} × ${c} = ${result(op)}.`));
    }

    if (type === 'B4') {
      const model = lots(rnd);
      const {packs, basic, extra, cost, total, result, expression} = model;
      return {...exercise(model.text + ' Escriu una igualtat amb l’expressió i el resultat.',
        `${expression} = ${result}`, [
          `${expression} = ${cost === 2 ? total : total - cost*2}`,
          `${packs} × ${basic} + ${extra} − ${cost}² = ${packs*basic + extra - cost**2}`,
          `${packs} × (${basic} + ${extra}) − ${cost} = ${total - cost}`
        ], model.equalityAnswer, 'Escriu l’expressió = resultat.',
        'Agrupa els punts de cada lot i resta el quadrat de la penalització.', model.solution), isProblem: true};
    }

    if (type === 'F05') {
      const hierarchy = rnd(0, 1);
      const divisor = b*c, square = c*c, quotient = hierarchy ? a*d : a;
      const dividend = divisor*quotient;
      const start = `${dividend} ÷ (${b} + ${b*(c-1)}) × ${d} + ${c}²`;
      const step1 = `${dividend} ÷ ${divisor} × ${d} + ${c}²`;
      const step2 = `${dividend} ÷ ${divisor} × ${d} + ${square}`;
      const correction = `${quotient} × ${d} + ${c*c}`;
      const wrong = hierarchy ? `${dividend} ÷ ${divisor*d} + ${square}` : `${quotient+1} × ${d} + ${square}`;
      const tail = hierarchy ? a : (quotient+1)*d;
      const lines = [step1, step2, wrong, `${tail} + ${square}`, String(tail+square)];
      return exercise('Quina és la primera línia incorrecta? Escriu-ne el número i la correcció.' + math(start) +
        '<ol>' + lines.map(line => `<li>${line}</li>`).join('') + '</ol>',
        '3; ' + correction, ['2; ' + correction, '3; ' + wrong, `4; ${quotient*d} + ${c*c}`],
        {kind:'repair', line:3, forms:forms(correction)}, 'Separa la línia i la correcció amb un punt i coma.',
        'Compara cada línia amb l’anterior i comprova tant l’ordre com el càlcul.',
        [hierarchy ? 'Error de jerarquia: la divisió i el producte van d’esquerra a dreta.' :
          `Error aritmètic: el quocient és ${quotient}.`,
        `Línia 3: ${correction}.`, `Resultat final: ${quotient*d+c*c}.`]);
    }

    if (type === 'F06') {
      let numbers = [a, b, c, d], candidates = reconstructions(numbers);
      let unique = candidates.filter(item => item.result !== null &&
        candidates.filter(other => other.result === item.result).length === 1);
      if (!unique.length) {
        numbers = [2, 3, 4, 5];
        candidates = reconstructions(numbers);
        unique = candidates.filter(item => item.result === 15);
      }
      const {expression, result} = unique[rnd(0, unique.length - 1)];
      const valid = candidates.filter(item => item.result === result);
      return exercise(`Usa els nombres <b>${numbers.join(', ')}</b> una vegada cadascun i en aquest ordre. Usa +, − i × una vegada cadascun, en qualsevol ordre. Pots afegir parèntesis. Escriu una expressió que doni <b>${result}</b> sense resultats intermedis negatius.`,
        expression, candidates.filter(item => item.result !== null && item.result !== result).slice(0, 3).map(item => item.expression),
        {kind: 'expression', forms: forms(...valid.map(item => item.expression))}, expressionHint,
        'Prova on pots fer primer una suma o una resta canviant els parèntesis.',
        valid.map(item => `${item.expression} = ${result}.`));
    }
    throw Error('Família de jerarquia desconeguda: ' + type);
  }

  return {families, familySpecs, levelFor, theorySections, generate, matches, lots, parse, evaluate, operatorSolutions, reconstructions};
})();
