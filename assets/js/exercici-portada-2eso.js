/* Generadors curts de 2n ESO; reutilitzen la validació i la interfície comunes. */
(function (root) {
  'use strict';
  const rnd = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
  const fmt = n => String(n).replace('.', ',');
  const senses = { numeric: 'Sentit numèric', algebraic: 'Sentit algebraic', mesura: 'Sentit de la mesura', espacial: 'Sentit espacial', estocastic: 'Sentit estocàstic' };
  function exercise(sense, topic, page, question, answer, steps, extra = {}) {
    return { course: '2eso', courseLabel: '2n ESO', sense: senses[sense], topic,
      question, answer, answerLabel: fmt(answer), steps, type: 'number',
      theoryPath: `2eso/teoria/${sense}/${page}.html`, ...extra };
  }
  root.MIPortadaBank.banks['2eso'] = [
    () => {
      const a = rnd(1, 5), b = rnd(2, 6), c = rnd(1, 5), d = rnd(2, 6);
      return exercise('numeric', 'Operacions amb fraccions', 'operacions-racionals', `Calcula: ${a}/${b} × ${c}/${d}.`, a * c / (b * d),
        ['Per multiplicar fraccions, multipliquem els numeradors i els denominadors.', `(${a} × ${c})/(${b} × ${d}) = ${a * c}/${b * d}. Pots simplificar la fracció.`],
        { answerLabel: `${a * c}/${b * d}`, hint: 'Escriu una fracció o un decimal exacte equivalent.' });
    },
    () => {
      const price = rnd(3, 12) * 10, percent = [10, 20, 25, 50][rnd(0, 3)], discount = price * percent / 100;
      return exercise('numeric', 'Percentatges', 'percentatges', `Una peça de roba val ${price} € i té un descompte del ${percent} %. Quin és el preu final, en euros?`, price - discount,
        [`Calculem el descompte: ${price} × ${percent}/100 = ${fmt(discount)} €.`, `Restem el descompte al preu inicial: ${price} − ${fmt(discount)} = ${fmt(price - discount)} €.`]);
    },
    () => {
      const a = rnd(2, 6), x = rnd(2, 9), b = rnd(1, 12), c = a * x + b;
      return exercise('algebraic', 'Equacions de primer grau', 'equacions-primer-grau', `Troba x: ${a}x + ${b} = ${c}.`, x,
        [`Restem ${b} als dos membres: ${a}x = ${c} − ${b} = ${a * x}.`, `Dividim els dos membres per ${a}: x = ${a * x}/${a} = ${x}.`, `Comprovació: ${a} × ${x} + ${b} = ${c}.`], { hint: 'Escriu només el valor de x.' });
    },
    () => {
      const a = rnd(2, 5), b = rnd(1, 8), x = rnd(1, 6);
      return exercise('algebraic', 'Funcions afins', 'funcions-lineals-afins', `En la funció y = ${a}x + ${b}, quin valor té y quan x = ${x}?`, a * x + b,
        [`Substituïm x per ${x}: y = ${a} × ${x} + ${b}.`, `Primer multipliquem i després sumem: ${a * x} + ${b} = ${a * x + b}.`]);
    },
    () => {
      const big = rnd(8, 14), small = rnd(3, 7), height = rnd(2, 6);
      return exercise('mesura', 'Àrees de trapezis', 'perimetres-arees', `Un trapezi té bases de ${big} cm i ${small} cm i altura de ${height} cm. Quina àrea té, en cm²?`, (big + small) * height / 2,
        ['L’àrea del trapezi és (base major + base menor) × altura / 2.', `(${big} + ${small}) × ${height} / 2 = ${big + small} × ${height} / 2 = ${fmt((big + small) * height / 2)} cm².`]);
    },
    () => {
      const a = rnd(2, 7), b = rnd(2, 5), c = rnd(2, 6);
      return exercise('mesura', 'Volums', 'superficies-volums', `Una capsa rectangular té dimensions de ${a} cm, ${b} cm i ${c} cm. Quin volum té, en cm³?`, a * b * c,
        ['El volum d’un ortoedre és llargada × amplada × altura.', `Àrea de la base: ${a} × ${b} = ${a * b} cm².`, `Volum: ${a * b} × ${c} = ${a * b * c} cm³.`]);
    },
    () => {
      const triple = [[3, 4, 5], [5, 12, 13], [6, 8, 10], [9, 12, 15]][rnd(0, 3)], [a, b, c] = triple;
      return exercise('espacial', 'Teorema de Pitàgores', 'teorema-pitagores', `Un triangle rectangle té catets de ${a} cm i ${b} cm. Quant mesura la hipotenusa, en cm?`, c,
        [`Per Pitàgores, c² = ${a}² + ${b}² = ${a * a} + ${b * b} = ${c * c}.`, `Prenem l’arrel quadrada positiva: c = √${c * c} = ${c} cm.`]);
    },
    () => {
      const k = rnd(2, 4), a = rnd(2, 8);
      return exercise('espacial', 'Semblança', 'semblanca-congruencia', `Dos triangles són semblants. Cada costat del segon és ${k} vegades el corresponent del primer. Si un costat del primer mesura ${a} cm, quant mesura el corresponent del segon, en cm?`, k * a,
        [`La raó de semblança del primer al segon és ${k}.`, `Multipliquem el costat per aquesta raó: ${a} × ${k} = ${a * k} cm.`]);
    },
    () => {
      const low = rnd(1, 4), gap = rnd(2, 5), values = [low + gap, low, low + gap + 2, low + 1];
      const sorted = [...values].sort((a, b) => a - b), median = (sorted[1] + sorted[2]) / 2;
      return exercise('estocastic', 'Mediana', 'centralitzacio-dispersio', `Calcula la mediana de: ${values.join(', ')}.`, median,
        [`Ordenem les dades de menor a major: ${sorted.join(', ')}.`, 'Hi ha quatre dades: la mediana és la mitjana de les dues centrals.', `(${sorted[1]} + ${sorted[2]}) / 2 = ${fmt(median)}.`]);
    },
    () => {
      const count = rnd(2, 8), total = 10;
      return exercise('estocastic', 'Freqüència relativa', 'taules-frequencies', `En una enquesta a ${total} alumnes, ${count} venen a l’institut amb bicicleta. Quina és la freqüència relativa d’aquesta resposta?`, count / total,
        ['La freqüència relativa és la freqüència absoluta dividida pel total de dades.', `${count}/${total} = ${fmt(count / total)}. És la proporció d’alumnes que venen amb bicicleta.`],
        { answerLabel: `${count}/${total}`, hint: 'Escriu una fracció o un decimal equivalent, sense percentatge.' });
    }
  ];
})(typeof window === 'undefined' ? globalThis : window);
