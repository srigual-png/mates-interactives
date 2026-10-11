/* Banc curt de 3r ESO, independent dels modes de pràctica. */
(function (root) {
  'use strict';
  const rnd = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
  const fmt = n => String(n).replace('.', ',');
  const senses = { numeric: 'Sentit numèric', algebraic: 'Sentit algebraic', mesura: 'Sentit de la mesura', espacial: 'Sentit espacial', estocastic: 'Sentit estocàstic' };
  function exercise(sense, topic, page, question, answer, steps, extra = {}) {
    return { course: '3eso', courseLabel: '3r ESO', sense: senses[sense], topic,
      question, answer, answerLabel: fmt(answer), steps, type: 'number',
      theoryPath: `3eso/teoria/${sense}/${page}.html`, ...extra };
  }
  root.MIPortadaBank.banks['3eso'] = [
    () => {
      const a = rnd(2, 5), n = rnd(1, 3), denominator = a ** n;
      return exercise('numeric', 'Potències d’exponent negatiu', 'potencies-exponent-enter', `Calcula ${a} elevat a −${n}.`, 1 / denominator,
        ['Un exponent negatiu indica l’invers de la potència amb exponent positiu.', `${a}^(−${n}) = 1/${a}^${n} = 1/${denominator}.`],
        { answerLabel: `1/${denominator}`, hint: 'Escriu una fracció o un decimal exacte equivalent.' });
    },
    () => {
      const coefficient = rnd(12, 95) / 10, n = rnd(2, 4), answer = Math.round(coefficient * 10 ** n);
      return exercise('numeric', 'Notació científica', 'notacio-cientifica', `Escriu ${fmt(coefficient)} × 10^${n} en forma decimal.`, answer,
        [`10^${n} = ${10 ** n}. Multipliquem ${fmt(coefficient)} per ${10 ** n}.`, `Desplacem la coma ${n} posicions a la dreta: ${answer}.`]);
    },
    () => {
      const a = rnd(2, 5), b = rnd(1, 6), x = rnd(1, 4), answer = a * x * x + b * x;
      return exercise('algebraic', 'Expressions algebraiques', 'expressions-algebraiques', `Calcula el valor de ${a}x² + ${b}x quan x = ${x}.`, answer,
        [`Substituïm x per ${x}: ${a} × ${x}² + ${b} × ${x}.`, `Primer calculem la potència i els productes: ${a * x * x} + ${b * x}.`, `El resultat és ${answer}.`]);
    },
    () => {
      const x = rnd(2, 9), square = x * x;
      return exercise('algebraic', 'Equacions de segon grau', 'equacions-segon-grau', `Resol x² = ${square}. Escriu només la solució positiva.`, x,
        [`Les dues solucions són x = ±√${square}, perquè tant ${x}² com (−${x})² valen ${square}.`, `Com que es demana la solució positiva, x = ${x}.`], { hint: 'Escriu només el valor positiu de x.' });
    },
    () => {
      const area = rnd(2, 8), k = rnd(2, 4);
      return exercise('mesura', 'Semblança i àrees', 'semblanca-mesures', `Una figura té una àrea de ${area} cm². L’ampliem multiplicant totes les longituds per ${k}. Quina àrea té la figura nova, en cm²?`, area * k * k,
        [`Si les longituds es multipliquen per ${k}, les àrees es multipliquen per ${k}² = ${k * k}.`, `Àrea nova = ${area} × ${k * k} = ${area * k * k} cm².`]);
    },
    () => {
      const area = rnd(2, 9) * 3, height = rnd(2, 8);
      return exercise('mesura', 'Volum de piràmides', 'piramides-cons', `Una piràmide té una base d’àrea ${area} cm² i altura perpendicular de ${height} cm. Quin volum té, en cm³?`, area * height / 3,
        ['El volum d’una piràmide és l’àrea de la base multiplicada per l’altura i dividida per 3.', `V = ${area} × ${height} / 3 = ${area * height} / 3 = ${area * height / 3} cm³.`]);
    },
    () => {
      const x = rnd(-6, 6), y = rnd(1, 6);
      return exercise('espacial', 'Simetria axial', 'simetria-axial', `Reflectim el punt P(${x}, ${y}) respecte de l’eix X. Quina és la coordenada y del punt simètric?`, -y,
        ['La simetria respecte de l’eix X conserva la coordenada x i canvia el signe de la coordenada y.', `P′ = (${x}, ${-y}). Per tant, la coordenada y és ${-y}.`], { hint: 'Escriu només la coordenada y, amb el signe corresponent.' });
    },
    () => {
      const x = rnd(-5, 5), y = rnd(-4, 4), shift = rnd(2, 6);
      return exercise('espacial', 'Translacions', 'translacions', `Traslladem el punt P(${x}, ${y}) una distància de ${shift} unitats cap a la dreta. Quina és la nova coordenada x?`, x + shift,
        ['Traslladar cap a la dreta suma el desplaçament a la coordenada x; la coordenada y es manté.', `x′ = ${x} + ${shift} = ${x + shift}. El punt nou és (${x + shift}, ${y}).`], { hint: 'Escriu només la coordenada x.' });
    },
    () => {
      const a = rnd(2, 5), b = a + rnd(2, 4), fa = rnd(2, 4), fb = rnd(2, 4), total = fa + fb, sum = a * fa + b * fb;
      return exercise('estocastic', 'Mitjana amb freqüències', 'mesures-centralitzacio', `En un grup de ${total} alumnes, ${fa} han llegit ${a} llibres i ${fb} han llegit ${b} llibres. Quina és la mitjana de llibres llegits?`, sum / total,
        [`Sumem els llibres tenint en compte les freqüències: ${fa} × ${a} + ${fb} × ${b} = ${sum}.`, `Dividim pel total d’alumnes: ${sum}/${total}.`],
        { answerLabel: `${sum}/${total}`, hint: 'Escriu una fracció o un decimal exacte equivalent.' });
    },
    () => {
      const red = rnd(1, 4), total = red + rnd(1, 4);
      return exercise('estocastic', 'Probabilitat composta', 'probabilitat-experiments-compostos', `Una bossa conté ${total} boles iguals al tacte, ${red} de les quals són vermelles. En traiem una a l’atzar, la tornem a posar i en traiem una altra. Quina és la probabilitat que totes dues siguin vermelles?`, red * red / (total * total),
        [`A cada extracció, P(vermella) = ${red}/${total}. En tornar la bola, les extraccions són independents.`, `Multipliquem les probabilitats: ${red}/${total} × ${red}/${total} = ${red * red}/${total * total}.`],
        { answerLabel: `${red * red}/${total * total}`, hint: 'Escriu una fracció o un decimal exacte equivalent, sense percentatge.' });
    }
  ];
})(typeof window === 'undefined' ? globalThis : window);
