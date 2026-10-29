/* Exàmens de tema: generadors de pràctica, correcció diferida i estat en memòria. */
(function () {
  'use strict';
  const secondYear = TOPICS.some(t => t.course === '2n' && t.exam2n === true);
  const thirdYear = TOPICS.some(t => t.course === '3r' && t.exam3r === true);
  const fourthYear = TOPICS.some(t => t.exam4t === true);
  const spatialSecondYear = secondYear && TOPICS.some(t => t.id === 'visual3d');
  const spatialFourthYear = fourthYear && TOPICS.some(t => t.id === 'figures4t');
  const spatialThirdYear = thirdYear && TOPICS.some(t => t.id === 'translacions');
  const algebraFourthYear = fourthYear && TOPICS.some(t => t.id === 'equacions2g4t');
  const algebraThirdYear = thirdYear && TOPICS.some(t => t.id === 'identitats');
  const algebraSecondYear = secondYear && TOPICS.some(t => t.id === 'funcionslineals');
  const algebraFirstYear = TOPICS.some(t => t.id === 'traduccio' && t.course === '1r');
  const spatialFirstYear = TOPICS.some(t => t.id === 'elements' && t.course === '1r');
  const stochasticFourthYear = fourthYear && TOPICS.some(t => t.id === 'dadesVariables4t');
  const stochasticThirdYear = thirdYear && TOPICS.some(t => t.id === 'quartils3r');
  const stochasticSecondYear = secondYear && TOPICS.some(t => t.id === 'investigacions');
  const stochasticFirstYear = TOPICS.some(t => t.id === 'recollida' && t.course === '1r');
  const advanced = secondYear || thirdYear || fourthYear;
  const course = fourthYear ? '4eso' : thirdYear ? '3eso' : secondYear ? '2eso' : '1eso';
  const courseLabel = fourthYear ? '4t ESO' : thirdYear ? '3r ESO' : secondYear ? '2n ESO' : '1r ESO';
  const theoryPages = advanced ? (typeof THEORY_PAGES !== 'undefined' ? THEORY_PAGES : typeof MI_NAV_THEORY_PAGES !== 'undefined' ? MI_NAV_THEORY_PAGES : Object.fromEntries(TOPICS.map(t=>[t.id,t.theoryPage]))) : MI_THEORY_PAGES;
  const theoryClass = fourthYear && (stochasticFourthYear || TOPICS.some(t=>t.id==='angles4t')) ? 'btn-theory' : 'theory-page-link';
  const numeric = TOPICS.some(t => t.id === 'naturals');
  const topics = TOPICS.filter(t => (fourthYear ? t.exam4t === true && (typeof isExamTopic !== 'function' || isExamTopic(t)) : thirdYear ? t.course === '3r' && t.exam3r === true : secondYear ? t.course === '2n' && t.exam2n === true : t.course === '1r' && t.exam1r === true) &&
    typeof t.gen === 'function');
  const primary = numeric ? 'bp' : 'btn-primary';
  const secondary = numeric ? 'bs' : 'btn-secondary';
  let session;
  const plain = value => { const el = document.createElement('div'); el.innerHTML = String(value); return el.textContent.trim(); };
  const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function level(t, q) {
    if (stochasticFourthYear) {
      const levels = {
        dadesVariables4t:[[1,2,3,5],[4,8,9],[6,7,10]],
        taulesRepresentacions4t:[[1,2,3,10],[5,6,9],[4,7,8]],
        comparacioDistribucions4t:[[1,2,3],[4,5,10],[6,7,8,9]],
        estudisMostreig4t:[[1,2],[3,5,6,9],[4,7,8,10]],
        nuvolsRelacio4t:[[1,2,3,6],[4,7,9,10],[5,8]],
        regressioPrediccions4t:[[1,3,4,10],[2,5,6],[7,8,9]],
        espaiMostralRecompte4t:[[1,3,8,10],[2,4,5],[6,7,9]],
        experimentsCompostos4t:[[1,3,5,10],[2,4,6,9],[7,8]]
      };
      return levels[t.id].findIndex(types=>types.includes(q.type))+1;
    }
    if (stochasticThirdYear) {
      const levels = {
        dades3r:[[1,2,3,5],[4,6,7,13],[8,9,10,11,12,14]],
        taules3r:[[1,2,3,4,13,15,19],[5,8,10,11,14,16,17,20],[6,7,9,12,18,21,22]],
        grafics3r:[[1,2,8,9],[3,6,7,10],[4,5,11,12]],
        centralitzacio3r:[[1,7,10,16],[2,3,5,8,9],[4,6,11,12,13,14,15]],
        quartils3r:[[2,3,5,6],[1,4,8,13],[7,9,10,11,12,14]],
        dispersio3r:[[1,5,6,10,11,12],[2,3,4,7,8,9],[13,14,15,16,17]],
        investigacio3r:[[1,2,8,9,18],[3,5,6,10,12,13,19,20],[4,7,11,14,15,16,17,21]],
        probabilitat3r:[[1,2,3,4,6,21],[5,7,11,12,13,14,15,17],[8,9,10,16,18,19,20,22]]
      };
      return levels[t.id].findIndex(types=>types.includes(q.type))+1;
    }
    if (stochasticSecondYear) {
      const levels = {
        dades:[[1,2,3],[4,5,7],[6,8]],
        frequencias:[[1,2,3,4],[5,8,10,11],[6,7,9,12]],
        grafics:[[1,4,7,8],[2,5,6,9],[3,10,11,12]],
        centralitzacio:[[1,4,7,8,10],[2,5,9],[3,6,11,12]],
        investigacions:[[1,2,8,9],[3,5,6,10],[4,7,11,12]],
        probabilitat:[[1,2,3,4],[5,6,7,8,10],[9,11,12,13,14,15]],
        experiments:[[1,2,3,4],[5,6,8,13],[7,9,10,11,12]]
      };
      return levels[t.id].findIndex(types=>types.includes(q.type))+1;
    }
    if (stochasticFirstYear) {
      const levels = {
        recollida:[[1,3],[2,4],[5,6,7]],
        taules:[[1,6,7,9,11],[2,5,10,12],[3,4,8]],
        barres:[[1,2,3,9,10],[7,8,11,12],[4,5,6]],
        sectors:[[1,7,10,11,12,13],[2,3,6],[4,5,8,9]],
        poligons:[[1,2,3,9,10,11,12],[4,8],[5,6,7]],
        mitjana:[[1],[3],[2,4]], mediana:[[4],[1],[3]],
        moda:[[1,5,7],[2,8,9,10],[3,4,6]],
        probabilitat:[[1,2,3],[4,5,6,7,10],[8,9,11]]
      };
      return levels[t.id].findIndex(types=>types.includes(q.type))+1;
    }
    if (algebraFourthYear) {
      const levels = {
        patrons4t: [[2,4,9,10], [3,5,7], [1,6,8]],
        equacions2g4t: [[1,2,7,11], [3,5,6], [4,8,9,10]],
        sistemes4t: [[4,5,10], [1,2,8], [3,6,7,9]],
        inequacions4t: [[4,5,6,7], [1,3,8], [2,9,10]],
        funcionsRep4t: [[1,2,5,11], [3,4,6,9], [7,8,10,12]],
        linealsQuad4t: [[2,4,5,9], [1,7,8,10], [3,6,11,12]],
        inversaExp4t: [[1,2,8,12], [3,5,6,7], [4,9,10,11]],
        analisiFunc4t: [[1,3,6,10,12], [2,5,7,8], [4,9,11]]
      };
      return levels[t.id].findIndex(types => types.includes(q.type)) + 1;
    }
    if (algebraThirdYear) {
      const levels = {
        patrons: [[1,2,6], [4,5], [3,7,8]],
        expressions: [[1,2,3], [4,8], [5,6,7]],
        identitats: [[1,2,6,7], [3,8], [4,5]],
        factoritzacio: [[1,7,8], [2,3,4], [5,6]],
        equacions2: [[1,2,6], [3,5], [4,7,8]],
        sistemes: [[1,5,6], [2,3], [4,7,8]],
        funcions: [[1,2,3], [4,6], [5,7,8]],
        funcions8: [[1,2,3], [4,6,7], [5,8]],
        quadratica: [[1,6,7], [2,4,5], [3,8]]
      };
      return levels[t.id].findIndex(types => types.includes(q.type)) + 1;
    }
    if (algebraSecondYear) {
      const levels = {
        patrons: [[1,3], [2,5,6], [4,7,8]],
        expressions: [[1,2], [3,4,6,9,10], [5,7,8]],
        equacions: [[1,2,10], [3,4,5,8,11], [6,7,9,12]],
        problemes: [[1,2,12], [3,4,5,8,10], [6,7,9,11]],
        relacions: [[1,2,3,4,11], [5,6,7,8,12], [9,10]],
        funcionslineals: [[1,2,3,4,5,17], [6,8,9,10,11,12,13,15], [7,14,16]],
        computacional: [[1,2,11,17], [3,4,5,7,9,10,12,15], [6,8,13,14,16]]
      };
      return levels[t.id].findIndex(types => types.includes(q.type)) + 1;
    }
    if (algebraFirstYear) {
      const levels = {
        traduccio: [[1,2], [3,4], [5,6]],
        patrons: [[1,3], [2,6], [4,5]],
        monomis: [[1], [2,4], [3]],
        simplificacio: [[1,5], [6], [3]],
        equacions: [[1,2], [3,4], [7,8]],
        computacional: [[5], [1,2], [3,4,6]]
      };
      return levels[t.id].findIndex(types => types.includes(q.type)) + 1;
    }
    if (spatialThirdYear) {
      const levels = {
        translacions: [[1,2,5,8,9], [4,6,10], [3,7]],
        girs: [[1,2,3,10], [4,5,6], [7,8,9]],
        simetriaAxial: [[1,2,8,9,10], [5,6,7], [3,4]],
        simetriaCentral: [[1,4], [2,3,5], [6,7,8,9,10]],
        mosaics: [[1,3,4,8], [2,7,9], [5,6,10]],
        transformacionsCoord: [[2,3,8,9], [1,4,5,7], [6,10]],
        geoAlgebra: [[5,6,7,8], [1,2,9], [3,4,10]],
        visualitzacio: [[2,3,5,10], [4,7,9], [1,6,8]]
      };
      return levels[t.id].findIndex(types => types.includes(q.type)) + 1;
    }
    if (spatialFirstYear) {
      const levels = {
        elements: [[1,2,6,7], [3,5], [4,8]],
        angles: [[1,4], [2,3,5], [6,7]],
        poligons: [[1,2,8], [3,4,5], [6,7]],
        triangles: [[1,2], [3], [4,6]],
        quadrilaters: [[1,6], [4,5], [2,3]],
        cercle: [[1,7], [2], [3]],
        visualitzacio: [[1,3,7], [2,4], [5,6]]
      };
      return levels[t.id].findIndex(types => types.includes(q.type)) + 1;
    }
    if (spatialSecondYear) {
      const levels = {
        semblanca: [[1,2,6,7], [4,5,8,10], [3,9,11]],
        tales: [[3,4,6], [1,2,5,10], [7,8,9]],
        pitagores: [[1,2,3], [4,5,6,10], [7,8,9]],
        cossos: [[1,2,3,6], [7,8,9], [4,5,10]],
        visual3d: [[3,6], [1,4,5,7,9], [2,8]],
        coordenades: [[1,2,5,9], [4,6,8], [3,7,10]],
        modelitzacio: [[6,9], [2,4,8], [1,3,5,7,10]]
      };
      return levels[t.id].findIndex(types => types.includes(q.type)) + 1;
    }
    if (spatialFourthYear) {
      const levels = {
        figures4t: [[1,3,7], [2,4,6], [5,8,9,10]],
        vectors4t: [[1,2,3,4,10], [7,9], [5,6,8]],
        components4t: [[1,2,4,10], [3,5,9], [6,7,8]],
        operacionsVectors4t: [[1,3,4], [2,5,6], [7,8,9,10]],
        coordenadesVectors4t: [[1,2,7], [3,5,6,8], [4,9,10]],
        homotecies4t: [[1,5,6], [7,9,10], [2,3,4,8]],
        geometriaFuncions4t: [[1,2,3,4,11], [5,6,9], [7,8,10]],
        regions4t: [[1,2,6], [4,5,7,9], [3,8,10]],
        rectesAmpA: [[1,4,5], [2,6,7,9], [3,8,10]],
        geometriaAnaliticaAmpD: [[4,5,7,11], [1,3,6,12], [2,8,9,10]]
      };
      return levels[t.id].findIndex(types => types.includes(q.type)) + 1;
    }
    if (fourthYear) {
      const levels = {
        angles4t: [[1,6,7,10], [2,3,9], [4,5,8]],
        radians4t: [[1,2,3], [4,5,6], [7,8,9,10]],
        pitagores4t: [[1,2,3,4], [5,6,7], [8,9,10]],
        semblancaRaons4t: [[1,2,3], [4,5,6], [7,8,9,10]],
        trigRaons4t: [[1,2,3,4], [5,6,7], [8,9,10]],
        resolTriangles4t: [[1,2,3,10], [4,5,6], [7,8,9]],
        mesuresIndirectes4t: [[1,3,4,9], [2,5,6], [7,8,10]],
        precisioError4t: [[1,2,6], [3,4,7,9], [5,8,10]],
        reals4t: [[1,2,3,6], [4,5,7], [8,9,10]],
        irracionals4t: [[1,2,5], [3,6,9], [4,7,8,10]],
        intervals4t: [[1,2,3,4], [5,6,7], [8,9,10]],
        errors4t: [[1,2,3,4], [5,9], [6,7,8,10]],
        operacions4t: [[1,2,4], [3,5,7], [6,8,9,10]],
        comptatge4t: [[1,4,5,7], [2,3,8,9], [6,10]],
        pascal4t: [[1,2,6,8], [3,5,9], [4,7,10]],
        financera4t: [[1,2,8], [4,6,7], [3,5,9,10]]
      };
      return levels[t.id].findIndex(types => types.includes(q.type)) + 1;
    }
    if (thirdYear && TOPICS.some(topic => topic.id === 'precisio')) {
      const levels = {
        volum: [[1,2,3,5], [4,6,9], [7,8]],
        precisio: [[1,2,3,9], [4,5,8], [6,7]],
        arees: [[1,2,7], [3,4,6], [5,8,9]],
        semblanca: [[1,2,3], [4,5,8], [6,7,9]],
        tales: [[1,2,9], [3,4,7], [5,6,8]],
        pitagores: [[1,2,3], [4,5,6], [7,8,9]],
        piramides: [[1,2,7], [3,4,8], [5,6,9]],
        errorMesura: [[1,2,9], [3,4,6], [5,7,8]]
      };
      return levels[t.id].findIndex(types => types.includes(q.type)) + 1;
    }
    if (advanced) {
      const levels = {
        racionals: [[1,2,3,4,9,11], [5,6,7,10,12], [8,13,14,15]],
        fraccionsSentit: [[1,2,3,5,6,14], [4,7,9,11], [8,10,12,13,15]],
        operacionsRacionals: [[1,2,7,13,17], [3,4,5,6,11,14,16], [8,9,10,12,15,18]],
        potencies: [[1,2,3,4,5,8], [6,7,11,12,13,14], [9,10,15,16,17,18]],
        aproximacions: [[1,2,3,4,5], [6,7,10,11,12], [8,9,13,14,15]],
        proporcionalitat: [[1,2,3,4,5,6], [7,8,9,13,16,18], [10,11,12,14,15,17]],
        percentatges: [[1,2,3,4,8,16], [5,6,7,11,12,17], [9,10,13,14,15,18]],
        recomptes: [[1,2,3,6,12], [4,5,8,9,11,15], [7,10,13,14]],
        racionals3r: [[1,2,3,5], [4,6,7,9], [8,10,11,12]],
        generatriu3r: [[1,2,3,9], [4,5,7,12], [6,8,10,11]],
        reals3r: [[1,2,3,4], [5,6,7,8], [9,10,11,12]],
        aproximacions3r: [[1,2,3,4], [5,6,8,9], [7,10,11,12]],
        potencies3r: [[1,2,4,5,6], [3,7,8,9,12,14], [10,11,13,15,16]],
        notacio3r: [[1,2,3,4,5,17,18], [6,7,8,9,15,16], [10,11,12,13,14]],
        proporcionalitat3r: [[1,2,3,4,7,10], [5,6,9,11,12,14], [8,13,15]],
        recomptes3r: [[1,2,6,11,14,15], [3,4,9,12], [5,7,8,10,13,16]],
        unitats: [[1,2,3,7,8], [4,5,6,9,11,12,14,16], [10,13,15,17,18]],
        escales: [[1,3,5,12,13], [2,4,8,9,10,11], [6,7,14,15,16,17,18]],
        pitagores: [[1,2,3,9], [4,5,6,7,8,12], [10,11,13,14,15,16]],
        perimetres: [[1,2,3,4], [5,6,7,12,13,14], [8,9,10,11,15,16]],
        superficies: [[1,5,6,10,11,14], [2,3,4,7,8,12,18,19], [9,13,15,16,17,20]],
        estimacio: [[1,2,3,4,5,11], [6,10,14,15,16,18], [7,8,9,12,13,17]],
        problemes: [[6,8,9,14,16,18], [1,3,4,5,7,10,15,17], [2,11,12,13,19,20]]
      };
      return levels[t.id].findIndex(types => types.includes(q.type)) + 1;
    }
    if (t.id === 'conversions') return q.type === 1 ? 1 : q.type === 3 ? 2 : 3;
    if (t.id === 'temps') return q.type === 4 ? 3 : [2,3].includes(q.type) ? 2 : 1;
    if (t.id === 'proporcionalitat') {
      if ([3,4,7].includes(q.type)) return 3;
      if ([6,8].includes(q.type)) return 2;
      return 1;
    }
    if (t.id === 'metric') {
      const match = q.solution.join(' ').match(/hi ha (\d+) canvi/);
      return match ? Math.min(3, Number(match[1])) : 1;
    }
    if (t.id === 'potencies') {
      if (q.type === 6) return 2;
      if (q.type === 5 && /\^3/.test(plain(q.question))) return 3;
      if (q.type === 7 && / = (100|121|144)/.test(plain(q.question))) return 3;
    }
    return q.diff || ({easy:1,medium:2,hard:3}[q.difficulty]) || 1;
  }
  function build(t) {
    const pool = [], seen = new Set();
    for (let i = 0; i < 700; i++) {
      const q = {...t.gen(), topicId:t.id, topicName:t.name};
      if (stochasticThirdYear) {
        let visual=q.visual || '';
        if (t.id === 'taules3r' && q.type === 11) q.question += '<br>Tria la llista ordenada de menor a major.';
        if (t.id === 'grafics3r' && q.type === 7) visual=visual.replaceAll('#a87408','#d29a1f').replace(/r="7"/g,'r="5.5"');
        if (t.id === 'quartils3r' && q.type === 4) q.options=q.options.filter(o=>!String(o).includes('o superior'));
        if (t.id === 'investigacio3r') visual=visual.replace('Atenció a l’escala: l’eix vertical va de 90 a 100.','');
        q.question='<div>'+q.question+'</div>'+visual;
      }
      if (stochasticSecondYear) {
        // Tant un arbre com una taula poden representar dues etapes: evita
        // exigir una preferència de representació com si fos una resposta única.
        if (t.id === 'experiments' && q.type === 13) continue;
        if (t.id === 'frequencias' && q.type === 11) q.question += '<br>Tria la llista ordenada de menor a major.';
        // Les dades visuals són part de l’enunciat; no incloguis pistes de pràctica.
        let visual=q.visual || '';
        if (t.id === 'grafics' && q.type === 11) visual=visual.replace('Atenció: l’eix vertical no comença a zero.','');
        if (t.id === 'experiments' && q.type === 12) visual=contingencyPairTable(['C','X'],['1','2','3','4','5','6'],(r,c)=>r+c,'C = cara; X = creu. Cada cel·la és un resultat equiprobable.');
        q.question='<div>'+q.question+'</div>'+visual;
      }
      if (stochasticFirstYear) {
        // Conserva les dades del gràfic, sense ressaltar la categoria que resol la pregunta.
        const visual = (q.visual || '').replaceAll('var(--primary-dark)','var(--primary)').replace(/stroke-width="3"/g,'stroke-width="2"').replace(/stroke="var\(--primary\)" stroke-width="2"/g,'stroke="white" stroke-width="2"');
        if (t.id === 'mitjana' && [1,4].includes(q.type)) q.question += ' Arrodoneix a dues xifres decimals si cal.';
        q.question = '<div>'+q.question+'</div>'+visual;
      }
      if (Array.isArray(t.examTypes) && !t.examTypes.includes(q.type)) continue;
      if (spatialFirstYear && t.id === 'visualitzacio' && q.type === 6) {
        // No ofereixis una segona fracció equivalent a la resposta correcta.
        const [n,d] = String(q.correct).split('/').map(Number);
        q.options = q.options.filter(o => {
          if (String(o) === String(q.correct)) return true;
          const parts = String(o).match(/^(\d+)\/(\d+)$/);
          return !parts || Number(parts[2]) === 0 || Number(parts[1])*d !== n*Number(parts[2]);
        });
      }
      if (advanced || algebraFirstYear) {
        q.options = q.options.filter(o => String(o) === String(q.correct) ||
          !(typeof openOk === 'function' ? (algebraSecondYear ?
            openOk(q.correct,q.alts,o,q.allowXEquivalent===true,q.allowPairEquivalent===true) :
            openOk(q.correct,q.alts,o,q)) : validateOpen(q,o)));
      }
      if (!advanced && t.id === 'divis' && q.type === 4) {
        q.question += '<br><small>Agrupa els factors repetits com a potències.</small>';
      }
      if (!advanced && t.id === 'proporcionalitat' && q.type === 6) {
        q.options = q.options.filter(o => o !== 'Només entre els dos primers valors');
      }
      if (!advanced && t.id === 'fraccions' && q.type === 11) {
        // El generador pot incloure l’equivalència correcta amb punt en lloc de coma.
        q.options = q.options.filter(o => String(o) === String(q.correct) ||
          normOpenText(o) !== normOpenText(q.correct));
      }
      // En els exercicis visuals, la geometria del dibuix també defineix la pregunta.
      const key = stochasticFourthYear || stochasticThirdYear || stochasticSecondYear || stochasticFirstYear || algebraFourthYear || algebraThirdYear || algebraSecondYear || spatialSecondYear || spatialThirdYear || spatialFourthYear ? q.question : plain(q.question);
      if (seen.has(key) || !q.solution || !q.solution.length || !Array.isArray(q.options) || q.options.length < 2) continue;
      // El mode test de pràctica compara les opcions amb la resposta exacta.
      if (q.options.filter(o => String(o) === String(q.correct)).length !== 1) continue;
      if (new Set(q.options.map(plain)).size !== q.options.length) continue;
      seen.add(key); pool.push(q);
      // Els dibuixos de quart són costosos: atura el banc quan ja cobreix
      // tots els tipus del generador i té prou preguntes de cada nivell.
      if ((spatialFourthYear || algebraFourthYear) && pool.length >= 40 &&
          new Set(pool.map(item=>item.type)).size >= (algebraFourthYear ? ({equacions2g4t:11,funcionsRep4t:12,linealsQuad4t:12,inversaExp4t:12,analisiFunc4t:12}[t.id] || 10) : t.id==='geometriaFuncions4t'?11:t.id==='geometriaAnaliticaAmpD'?12:10) &&
          [1,2,3].every(d=>pool.filter(item=>level(t,item)===d).length>=4)) break;
    }
    const result = [], counts = {};
    // Aquests blocs tenen més habilitats diferents concentrades en un mateix nivell.
    const slots = advanced ? [4,4,4] : t.id === 'fraccions' ? [6,4,2] : t.id === 'decimals' ? [2,6,4] :
      t.id === 'estimacio' ? [8,4,0] : t.id === 'mesurament' ? [4,6,2] : [4,4,4];
    for (let difficulty = 1; difficulty <= 3; difficulty++) {
      const candidates = pool.filter(q => level(t, q) === difficulty);
      for (let i = 0; i < slots[difficulty-1]; i++) {
        candidates.sort((a,b) => (counts[a.type] || 0) - (counts[b.type] || 0));
        const q = candidates.shift();
        if (!q) throw new Error('No hi ha prou preguntes per preparar aquest examen.');
        counts[q.type] = (counts[q.type] || 0) + 1; result.push(q);
      }
    }
    return result;
  }
  const screen = document.createElement('section');
  screen.id = 'miTopicExam'; screen.className = 'screen';
  screen.setAttribute('aria-label', 'Examen del tema');
  screen.innerHTML = '<div class="mi-topic-exam" id="miTopicExamBody"></div>';
  const screenParent = document.querySelector('.screen').parentElement;
  screenParent.insertBefore(screen, stochasticFourthYear || stochasticThirdYear || stochasticSecondYear || stochasticFirstYear || algebraFourthYear || algebraThirdYear || algebraSecondYear || algebraFirstYear || spatialFirstYear || spatialSecondYear || spatialThirdYear || spatialFourthYear ? screenParent.querySelector(':scope > .mi-learning-footer') : null);
  const body = screen.firstElementChild;
  function button(label, action, disabled) {
    return '<button type="button" class="'+secondary+'" data-action="'+action+'" '+(disabled?'disabled':'')+'>'+label+'</button>';
  }
  function links() {
    return '<a class="'+theoryClass+'" href="'+theoryPages[session.topic.id]+'">📚 Repassar la teoria</a>' + button('← Tornar a la pràctica', 'practice');
  }
  function render() {
    const answered = session.answers.filter(a => a !== null).length;
    body.innerHTML = '<h2 tabindex="-1">Examen del tema · '+escape(session.topic.name)+'</h2><p role="status">'+answered+' de '+session.questions.length+' preguntes respostes</p><progress max="'+session.questions.length+'" value="'+answered+'" aria-label="Preguntes respostes"></progress><p>Selecciona una resposta. Pots canviar-la i revisar totes les preguntes abans de lliurar. Les solucions es mostraran en acabar.</p>' + session.questions.map((q,i) => '<fieldset><legend>Pregunta '+(i+1)+' · '+['','Fàcil','Mitjana','Alta'][level(session.topic,q)]+'</legend><div class="'+(numeric?'exq':'ex-question')+'">'+(stochasticFourthYear || stochasticThirdYear || stochasticSecondYear || stochasticFirstYear || algebraFourthYear || algebraThirdYear || algebraSecondYear || algebraFirstYear || spatialFirstYear || spatialSecondYear || spatialThirdYear || spatialFourthYear?'<div class="q-text">'+q.question+'</div>':q.question)+'</div>'+q.options.map((o,j) => '<label class="mi-topic-option"><input type="radio" name="topicQ'+i+'" data-question="'+i+'" value="'+j+'" '+(session.answers[i]===j?'checked':'')+'><span>'+o+'</span></label>').join('')+button('Deixar sense resposta', 'clear-'+i)+'</fieldset>').join('')+'<div class="mi-topic-exam-actions"><button type="button" class="'+primary+'" data-action="submit">Lliurar l’examen</button>'+links()+'</div>';
  }
  function finish() {
    if (session.finished) return;
    session.finished = true;
    window.MIAnalytics?.topicExam('submitted', session.topic.id);
    const correct = session.questions.filter((q,i) => session.answers[i] !== null && String(q.options[session.answers[i]]) === String(q.correct)).length;
    const empty = session.answers.filter(a => a === null).length;
    const total = session.questions.length;
    session.result = {correct, empty, errors:total-correct-empty, grade:correct/total*10, percent:correct/total*100};
    body.innerHTML = '<h2 tabindex="-1">Resultat de l’examen · '+escape(session.topic.name)+'</h2><div class="mi-topic-exam-score"><p class="mi-topic-exam-grade">Nota: <strong>'+session.result.grade.toFixed(2).replace('.',',')+' sobre 10</strong></p><p>'+Math.round(session.result.percent)+'% d’encerts · '+correct+' de '+total+' preguntes correctes</p><p class="mi-topic-exam-scoring">Cada encert val el mateix. Les respostes incorrectes i les preguntes sense respondre compten 0 punts.</p></div><p role="status">'+correct+' encerts · '+session.result.errors+' errors · '+empty+' sense respondre</p>'+session.questions.map((q,i) => '<fieldset><legend>Pregunta '+(i+1)+'</legend><div>'+q.question+'</div><p class="mi-topic-exam-answer '+(session.answers[i]!==null && String(q.options[session.answers[i]])===String(q.correct)?'mi-answer-correct':'mi-answer-wrong')+'">La teva resposta: <strong>'+escape(session.answers[i]===null?'Sense respondre':plain(q.options[session.answers[i]]))+'</strong></p><p>Resposta correcta: <strong>'+escape(plain(q.correct))+'</strong></p><div class="'+(numeric?'solbox':'solution-box show')+'">'+q.solution.map(s=>'<p>'+s+'</p>').join('')+'</div></fieldset>').join('')+'<div class="mi-topic-exam-actions">'+button('Torna a començar', 'restart')+links()+'</div>';
    body.querySelector('h2').focus();
  }
  function start(id) {
    const t = topics.find(t => t.id === id); if (!t) return;
    try { session = {topic:t, questions:build(t), answers:Array(12).fill(null), finished:false}; }
    catch (error) { body.textContent = error.message; showScreen(screen.id); return; }
    window.MIAnalytics?.topicExam('started', t.id);
    document.getElementById('navTitle').textContent = 'Examen · '+t.name;
    const sidebar = document.getElementById('sidebar'); if (sidebar) sidebar.style.display='none';
    render(); showScreen(screen.id); body.querySelector('h2').focus();
  }
  body.addEventListener('change', event => {
    const input = event.target;
    if (session.finished || !input.matches('input[data-question]')) return;
    session.answers[Number(input.dataset.question)] = Number(input.value);
    const n = session.answers.filter(a=>a!==null).length;
    body.querySelector('[role="status"]').textContent=n+' de 12 preguntes respostes';
    body.querySelector('progress').value=n;
  });
  body.addEventListener('click', event => {
    const btn = event.target.closest('[data-action]'); if (!btn) return;
    const action = btn.dataset.action;
    if (action==='submit') finish();
    if (action==='restart') start(session.topic.id);
    if (action==='practice') {
      if (advanced) {
        const params=new URLSearchParams({topic:session.topic.id});
        if (fourthYear) { const option=new URLSearchParams(location.search).get('opcio'); if (option==='A'||option==='B') params.set('opcio',option); }
        location.href='?'+params;
      }
      else { const i=TOPICS.indexOf(session.topic); numeric?selTopic(i):selectTopic(i); }
    }
    if (action.startsWith('clear-') && !session.finished) {
      const i=Number(action.slice(6)); session.answers[i]=null;
      body.querySelectorAll('[name="topicQ'+i+'"]').forEach(el=>el.checked=false);
      const n=session.answers.filter(a=>a!==null).length;
      body.querySelector('[role="status"]').textContent=n+' de 12 preguntes respostes'; body.querySelector('progress').value=n;
    }
  });
  // The publication checker uses the same eligible topics and builder as start().
  window.miTopicExam = {start, build, getTopics:()=>topics.slice(), getSession:()=>session};
  const params=new URLSearchParams(location.search);
  if(params.get('examen')==='tema')start(params.get(advanced?'topic':'tema') || params.get('tema'));
})();
