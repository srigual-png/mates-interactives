/* Demostració de continguts comuns de 4t ESO; no depèn del selector A/B. */
(function (root) {
  'use strict';
  const rnd = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
  const fmt = n => String(n).replace('.', ',');
  const senses = { numeric: 'Sentit numèric', algebraic: 'Sentit algebraic', mesura: 'Sentit de la mesura', espacial: 'Sentit espacial', estocastic: 'Sentit estocàstic' };
  function exercise(sense, topic, page, question, answer, steps, extra = {}) {
    return { course: '4eso', courseLabel: '4t ESO', sense: senses[sense], topic,
      question, answer, answerLabel: fmt(answer), steps, type: 'number',
      theoryPath: `4eso/teoria/${sense}/${page}.html`, ...extra };
  }
  root.MIPortadaBank.banks['4eso'] = [
    () => {
      const capital = rnd(2, 9) * 100, percent = rnd(2, 5), years = rnd(1, 3), interest = capital * percent * years / 100;
      return exercise('numeric', 'Interès simple', 'educacio-financera', `Un capital de ${capital} € genera un interès simple anual del ${percent} % durant ${years} anys. Quin és el capital final, en euros?`, capital + interest,
        ['En l’interès simple, el guany es calcula sempre sobre el capital inicial.', `Interès = ${capital} × ${fmt(percent / 100)} × ${years} = ${interest} €.`, `Capital final = ${capital} + ${interest} = ${capital + interest} €.`]);
    },
    () => {
      const shirts = rnd(2, 5), trousers = rnd(2, 4);
      return exercise('numeric', 'Recompte sistemàtic', 'comptatge-diagrames-arbre', `Tens ${shirts} samarretes diferents i ${trousers} pantalons diferents. Quantes combinacions d’una samarreta i uns pantalons pots fer?`, shirts * trousers,
        [`Per a cadascuna de les ${shirts} samarretes pots triar qualsevol dels ${trousers} pantalons.`, `Pel principi multiplicatiu: ${shirts} × ${trousers} = ${shirts * trousers} combinacions.`]);
    },
    () => {
      const y = rnd(1, 5), x = y + rnd(1, 5), sum = x + y, difference = x - y;
      return exercise('algebraic', 'Sistemes d’equacions', 'sistemes-equacions', `En el sistema x + y = ${sum} i x − y = ${difference}, quin és el valor de x?`, x,
        ['Sumem les dues equacions: y i −y es cancel·len.', `2x = ${sum} + ${difference} = ${2 * x}; per tant, x = ${2 * x}/2 = ${x}.`, `Amb y = ${y}, es comprova ${x} + ${y} = ${sum} i ${x} − ${y} = ${difference}.`], { hint: 'Escriu només el valor de x.' });
    },
    () => {
      const base = rnd(2, 4), x = rnd(2, 4), answer = base ** x;
      return exercise('algebraic', 'Funcions exponencials', 'inversa-exponencial', `La funció és f(x) = ${base}^x. Quin és el valor de f(${x})?`, answer,
        [`Substituïm x per ${x}: f(${x}) = ${base}^${x}.`, `Multipliquem la base ${x} vegades: ${Array(x).fill(base).join(' × ')} = ${answer}.`]);
    },
    () => {
      const [a, b, c] = [[3, 4, 5], [5, 12, 13], [6, 8, 10]][rnd(0, 2)];
      return exercise('mesura', 'Pitàgores: trobar un catet', 'triangles-pitagores', `Un triangle rectangle té hipotenusa de ${c} cm i un catet de ${a} cm. Quant mesura l’altre catet, en cm?`, b,
        [`Per Pitàgores, el quadrat del catet desconegut és ${c}² − ${a}².`, `${c * c} − ${a * a} = ${b * b}. Prenem l’arrel positiva: √${b * b} = ${b} cm.`]);
    },
    () => {
      const a = rnd(2, 6), k = rnd(2, 4), b = rnd(3, 8);
      return exercise('mesura', 'Semblança: raons entre costats', 'semblanca-raons', `Dos triangles són semblants. Un costat del primer mesura ${a} cm i el corresponent del segon ${a * k} cm. Si un altre costat del primer mesura ${b} cm, quant mesura el corresponent del segon, en cm?`, b * k,
        [`La raó del primer triangle al segon és ${a * k}/${a} = ${k}.`, `Multipliquem l’altre costat per la mateixa raó: ${b} × ${k} = ${b * k} cm.`]);
    },
    () => {
      const [x, y, length] = [[3, 4, 5], [5, 12, 13], [6, 8, 10], [8, 15, 17]][rnd(0, 3)];
      return exercise('espacial', 'Mòdul d’un vector', 'components-modul-vector', `Un vector té components (${x}, ${y}). Quin és el seu mòdul?`, length,
        [`El mòdul és la longitud del vector: √(${x}² + ${y}²).`, `√(${x * x} + ${y * y}) = √${length * length} = ${length}.`]);
    },
    () => {
      const x = rnd(-5, 5), y = rnd(1, 5), k = rnd(2, 4);
      return exercise('espacial', 'Homotècies', 'homotecies', `Apliquem al punt P(${x}, ${y}) una homotècia de centre l’origen i raó ${k}. Quina és la coordenada x de la imatge?`, k * x,
        ['Amb centre a l’origen, una homotècia de raó k multiplica les dues coordenades per k.', `x′ = ${k} × (${x}) = ${k * x}. La imatge és (${k * x}, ${k * y}).`], { hint: 'Escriu només la coordenada x, amb el signe corresponent.' });
    },
    () => {
      const low = rnd(1, 5), gap = rnd(4, 9), values = [low + gap, low + 2, low, low + gap - 1];
      return exercise('estocastic', 'Dispersió: rang', 'comparacio-distribucions', `Les dades d’una mostra són ${values.join(', ')}. Quin és el rang?`, gap,
        [`El mínim és ${low} i el màxim és ${low + gap}.`, `El rang mesura la separació entre extrems: ${low + gap} − ${low} = ${gap}.`]);
    },
    () => {
      const red = rnd(2, 5), total = red + rnd(2, 5), numerator = red * (red - 1), denominator = total * (total - 1);
      return exercise('estocastic', 'Extraccions sense reemplaçament', 'experiments-compostos', `Una bossa té ${total} boles iguals al tacte, ${red} de les quals són vermelles. En traiem dues a l’atzar, una després de l’altra, sense tornar la primera. Quina és la probabilitat que totes dues siguin vermelles?`, numerator / denominator,
        [`La primera és vermella amb probabilitat ${red}/${total}.`, `Si la primera és vermella, queden ${red - 1} vermelles entre ${total - 1} boles: la probabilitat de la segona és ${red - 1}/${total - 1}.`, `Multipliquem: ${red}/${total} × ${red - 1}/${total - 1} = ${numerator}/${denominator}.`],
        { answerLabel: `${numerator}/${denominator}`, hint: 'Escriu una fracció o un decimal exacte equivalent, sense percentatge.' });
    }
  ];
})(typeof window === 'undefined' ? globalThis : window);
