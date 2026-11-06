const assert = require('node:assert/strict');
const {pathToFileURL} = require('node:url');
const {resolve} = require('node:path');
const {chromium} = require(process.env.MI_PLAYWRIGHT || 'C:/Users/srigu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

async function main() {
  const browser = await chromium.launch({
    executablePath: process.env.MI_BROWSER || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
  });
  try {
    const page = await browser.newPage({viewport: {width: 900, height: 920}});
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.route(/^https?:/, route => route.abort());
    await page.goto(pathToFileURL(resolve('1eso/sentit-numeric.html')).href);
    const details = await page.evaluate(() => {
      const check = (condition, message) => { if (!condition) throw Error(message); };
      const topic = id => TOPICS.find(t => t.id === id);
      const J = MIJerarquia;
      const value = (expression, nonnegative) => J.evaluate(J.parse(expression), nonnegative);
      const fixed = (...values) => (min, max) => {
        const chosen = values.length ? values.shift() : min;
        check(chosen >= min && chosen <= max, 'Dades de prova fora de rang');
        return chosen;
      };
      const task = (type, ...values) => J.generate(type, fixed(...values), buildOpts);
      const accepts = (q, answer) => openOk1(q.correct, answer, q);
      const rejects = (q, answers) => answers.every(answer => !accepts(q, answer));

      check(value('24 ÷ 6 × 2') === 8 && value('24 ÷ (6 × 2)') === 2, 'Ordre de productes i divisions');
      check(value('18 − 6 + 2') === 14 && value('18 − (6 + 2)') === 10, 'Ordre de sumes i restes');
      check(value('8 ÷ 0') === null && value('8 : 3') === null, 'Domini de la divisió');
      check(value('4 - 6') === null && value('4 - 6', false) === -2, 'Domini de les restes');
      check(J.operatorSolutions(24, 6, 2, 8).join() === '÷', 'Operador únic');
      check(J.operatorSolutions(18, 6, 2, 6).join() === '−,÷', 'Operadors ambigus');

      const first = task('F01', 7, 3, 4, 2, 0);
      check(first.question.includes('7 + 3 × (6 − 2)') && accepts(first, '((6 - 2))') &&
        rejects(first, ['4', '19', '2-6', '6-2+0', '(6-2]', '6-2; alert(0)']), 'Primera operació');
      const next = task('F02', 6, 3, 2, 4, 0);
      check(next.question.includes('18 ÷ (5 − 2) + 4') && accepts(next, '[18 : 3 + (4)]') &&
        rejects(next, ['6 + 4', '10', '18 / (3 + 4)', '18 / 3 + 5', '18 / 0 + 4']), 'Un sol pas');
      const comparison = task('F03', 4, 3, 5, 2, 0);
      check(accepts(comparison, 'a < b; a') && rejects(comparison, ['A < B', 'A < B; B', 'A > B; A']), 'Comparació i motiu');
      check(accepts(task('F03', 4, 3, 5, 2, 1), 'A = B; B'), 'Parèntesis redundants');
      const operator = task('F07', 2, 6, 2, 2, 3);
      check(accepts(operator, ':') && accepts(operator, '/') && rejects(operator, ['48 / 6', '16', '−']), 'Resposta de signe');
      const repair = task('F05', 2, 2, 3, 2, 1);
      check(repair.question.includes('24 ÷ (2 + 4) × 2 + 3²') && accepts(repair, '3; 4*2+9') &&
        rejects(repair, ['17', '3; 17', '2; 4*2+9', '3; 8+9']) && repair.solution.at(-1).includes('17'), 'Reparació de la línia 3');
      const reconstruction = task('F06', 2, 3, 4, 5);
      check(J.reconstructions([2,3,4,5]).length === 30 && value('(2+3)*4-5') === 15, 'Cens de reconstruccions');
      check(accepts(reconstruction, reconstruction.correct) &&
        rejects(reconstruction, ['15', '2+3+4+5', '2+3+4*5', '(3+2)*4-5', '2*(3-4)+5']), 'Restriccions F06');
      const lots = J.lots(fixed(7, 4, 2, 2));
      const b4 = task('B4', 2, 2, 2, 2, 7, 4, 2, 2);
      check(b4.correct === '7 × (4 + 2) − 2² = 38' && accepts(b4, '(4+2) * 7 - 2^2 = +038') &&
        rejects(b4, ['38', '7*(4+2)-2^2', '7*(4+2)-2^2=39', '7*4+2-2^2=38', '37+(1)^2=38', '76/2=38']), 'Igualtat B4');
      check(J.matches(lots.expressionAnswer, '7·(4+2)−2²') && !J.matches(lots.expressionAnswer, '(1)^2'), 'Expressió B4');
      check(accepts(task('L01', 2, 6, 2, 2, 1), '16/2'), 'Forma numèrica equivalent');

      const groups = adaptivePracticeGroups(topic('jerarquia'));
      check(groups.map(level => level.length).join() === '3,8,3', 'Distribució de famílies');
      function options(q) {
        check(q.options.length === 4 && new Set(q.options.map(String)).size === 4, 'Quatre opcions: ' + q.type);
        check(q.options.filter(option => accepts(q, option)).length === 1, 'Una opció vàlida: ' + q.type);
      }
      for (const [level, families] of groups.entries()) for (const type of families.flat()) {
        for (const random of [(min, max) => min, (min, max) => max, ...Array(8).fill(rnd)]) {
          const q = genJerarquiaPractice(type, level + 1, random);
          options(q);
          if (typeof type === 'number' || /^B[1-3]$/.test(type)) {
            const math = q.question.match(/<(?:span|b) [^>]+>([^<]+)<\/(?:span|b)>/)[1];
            check(value(math) === Number(q.correct), 'Domini i resultat de ' + type);
          }
        }
      }
      for (const random of [(min, max) => min, (min, max) => max]) {
        const q = genJerarquia(7, random);
        check(q.options.every(option => Number.parseInt(option) >= 0), 'Imports coherents');
      }

      function start(id, level, mode) {
        selTopic(TOPICS.indexOf(topic(id)));
        selLv(level);
        selMode(mode);
        startP();
      }
      function respond(correct) {
        if (state.mode === 'open') {
          document.getElementById('openInput').value = correct ? currentEx.correct : 'incorrecte';
          checkOpen();
          checkOpen();
        } else {
          const index = currentEx.options.findIndex(o => (String(o) === String(currentEx.correct)) === correct);
          const button = document.querySelectorAll('#og .ob')[index];
          button.click();
          selAns(index, button);
        }
        check(document.querySelector('#fbA .fb').classList.contains(correct ? 'ok' : 'ko'), 'Correcció visible');
        check(document.querySelector('#fbA .solbox'), 'Resolució visible');
      }
      function session(level, answers, mode, expectedLevels, constantRandom = false) {
        const random = Math.random;
        if (constantRandom) Math.random = () => 0;
        try {
          start('jerarquia', level, mode);
          const stats = adaptivePracticeSessions.jerarquia, questions = new Set();
          let priorFamily;
          answers.forEach((correct, index) => {
            check(currentEx.taskDifficulty === expectedLevels[index], 'Nivell a la pregunta ' + (index + 1));
            check(document.getElementById('exN').textContent.includes('N' + expectedLevels[index]), 'Etiqueta de dificultat');
            check(!questions.has(currentEx.practiceKey || currentEx.question), 'Pregunta repetida');
            questions.add(currentEx.practiceKey || currentEx.question);
            check(priorFamily !== stats.lastFamily, 'Família consecutiva');
            priorFamily = stats.lastFamily;
            respond(correct);
            check(stats.correct + stats.incorrect === index + 1, 'Comptar una resposta una sola vegada');
            const count = level === 1 ? stats.correct : index + 1;
            check(document.getElementById('jerarquiaCompletion').textContent.endsWith(count + '/' + NEEDED[level]), 'Comptador independent');
            check(document.getElementById('sb').style.width === Math.round(stats.points/NEEDED[level]*100) + '%', 'Barra adaptativa');
            check(document.querySelector('#fbA .mi-review-theory-link').hash === '#' + currentEx.jerarquiaTheory, 'Enllaç de teoria');
            if (expectedLevels[index + 1] && expectedLevels[index + 1] !== expectedLevels[index]) {
              check(document.getElementById('fbA').textContent.includes('serà de nivell N' + expectedLevels[index + 1]), 'Avís de canvi de nivell');
            }
            nextEx();
          });
          check(document.getElementById('sDecimalResult').classList.contains('active'), 'Pantalla final');
          check(document.getElementById('decimalResultCount').textContent === String(answers.length), 'Comptador del resum');
          check(document.getElementById('decimalResultScore').textContent === answers.filter(Boolean).length+'/'+answers.length, 'Resultat real');
          check(document.getElementById('decimalResultTitle').textContent === 'Objectiu assolit!', 'Objectiu assolit');
        } finally { Math.random = random; }
      }
      session(1, [true,true,true,false,true,true,true,true,false,true,true,true],
        'open', [1,1,1,2,1,2,2,2,3,2,3,3]);
      session(2, Array(20).fill(false), 'multi', Array(20).fill(1), true);
      session(2, Array(20).fill(true), 'multi', [...Array(6).fill(1), ...Array(6).fill(2), ...Array(8).fill(3)]);
      start('jerarquia', 1, 'multi');
      document.getElementById('bChg').click();
      check(document.getElementById('decimalResultScore').textContent === '0/0', 'Sortida anticipada');

      for (const id of ['naturals', 'decimal_sys', 'ops', 'potencies']) {
        start(id, 1, 'multi');
        respond(true);
        nextEx();
        check(currentEx.topicId === id && state.exCount === 2, 'Pràctica existent: ' + id);
      }
      const exam = miTopicExam.build(topic('jerarquia'));
      check(exam.length === 12 && exam.every(q => typeof q.type === 'number'), 'Examen per tema i separació del catàleg');
      const plan = miTaskDifficulty.examPlan(topic('jerarquia'));
      check([1,2,3].every((level, index) => exam.filter(q => q.taskDifficulty === level).length === plan.slots[index]), 'Quotes per tema');
      miTopicExam.start('jerarquia');
      check(document.querySelectorAll('#miTopicExam fieldset').length === 12, 'Renderització examen per tema');
      miExamSelectedTopics = ['jerarquia'];
      miStartConfiguredExam();
      check(state.examQs.length === 20 && state.examQs.every(q => q.topicId === 'jerarquia'), 'Examen global');
      const examIndex = state.examQs.findIndex(q => q.variantId === 'jerarquia-4');
      check(examIndex >= 0, 'B4 a l’examen global');
      const examB4 = state.examQs[examIndex];
      const submitExam = answer => {
        state.examIdx = examIndex;
        showEQ();
        document.getElementById('examOpenAns').value = answer;
        checkExamOpenAnswer();
        return state.examAnswers.at(-1).ok;
      };
      check(!submitExam(String(examB4.jerarquiaAnswer.result)) && submitExam(examB4.correct), 'Correcció de B4 a l’examen');

      const bank = AMP_CATS.find(cat => cat.id === 'jerarquia');
      let problem;
      for (let i = 0; i < bank.variants && problem?.variantId !== 'jerarquia-4'; i++) problem = bank.gen();
      check(problem?.variantId === 'jerarquia-4', 'B4 al banc');
      const submitBank = (expression, result) => {
        ampSession = {probs: [problem], idx: 0, results: []};
        ampShowProb();
        document.getElementById('ampStep_0').value = expression;
        document.getElementById('ampFinalAns').value = result;
        ampCheckAnswer();
        return [ampSession.results[0].ok, document.getElementById('ampStep_0').classList.contains('ok'),
          document.getElementById('ampFinalAns').classList.contains('ok')].join();
      };
      const [expression] = problem.examAnswer.val.split(' = ');
      check(submitBank('(1)^2', problem.answer.val) === 'false,false,true' &&
        submitBank(expression, '0') === 'false,true,false' &&
        submitBank(expression, problem.answer.val) === 'true,true,true', 'Camps independents del banc');
      state.errors.jerarquia.push({id:'legacy-test', topicId:'jerarquia', type:7, question:'Error antic de samarretes', correct:'17 euros', source:'legacy'});
      state.errors = normalizeErrorStore(state.errors);
      showErrorSummary();
      check(document.body.textContent.includes('Error antic de samarretes') && document.body.textContent.includes(problem.examAnswer.val), 'Repàs d’errors antics i nous');
      check(document.querySelector('.saved-error-card a[href$="#problemes"]'), 'Enllaç desat per al repàs');
      return {families: groups.map(level => level.length), exams: [exam.length, state.examQs.length], guided: 12, autonomous: [20,20]};
    });
    assert.deepEqual(errors, []);
    console.log(JSON.stringify(details));

    // Optional screenshots for a side-by-side visual review of the real screens.
    if (process.env.MI_JER_SCREENSHOTS) {
      for (const id of ['potencies', 'jerarquia']) {
        for (const [level, mode, good] of [[1,'multi',true], [2,'open',false], [3,'multi',true]]) {
          await page.evaluate(({id, level, mode, good}) => {
            const i = TOPICS.findIndex(t => t.id === id);
            selTopic(i);
            selLv(1);
            selMode(mode);
            startP();
            const stats = adaptivePracticeSessions[id];
            stats.points = level === 1 ? 2 : level === 2 ? 3 : 6;
            stats.correct = stats.points;
            showEx();
            if (mode === 'open') {
              document.getElementById('openInput').value = 'incorrecte';
              checkOpen();
            } else {
              const index = currentEx.options.indexOf(currentEx.correct);
              document.querySelectorAll('#og .ob')[index].click();
            }
            if (document.querySelector('#fbA .fb').classList.contains('ok') !== good) throw Error('Estat de captura');
          }, {id, level, mode, good});
          await page.evaluate(() => window.scrollTo(0, 0));
          await page.screenshot({fullPage: true, path: resolve(process.env.MI_JER_SCREENSHOTS, id + '-N' + level + '.png')});
        }
        await page.locator('#bChg').click();
        await page.locator('#sDecimalResult').screenshot({path: resolve(process.env.MI_JER_SCREENSHOTS, id + '-resum.png')});
      }
    }
  } finally {
    await browser.close();
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
