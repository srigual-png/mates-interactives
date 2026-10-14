/* Exàmens de tema: generadors de pràctica, correcció diferida i estat en memòria. */
(function () {
  'use strict';
  const numeric = TOPICS.some(t => t.id === 'naturals');
  const topics = TOPICS.filter(t => t.course === '1r' && t.exam1r === true &&
    typeof t.gen === 'function' && (numeric || t.id === 'metric'));
  const primary = numeric ? 'bp' : 'btn-primary';
  const secondary = numeric ? 'bs' : 'btn-secondary';
  let session;
  const plain = value => { const el = document.createElement('div'); el.innerHTML = String(value); return el.textContent.trim(); };
  const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function level(t, q) {
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
    return q.diff || 1;
  }
  function build(t) {
    const pool = [], seen = new Set();
    for (let i = 0; i < 700; i++) {
      const q = decorateExercise(t, {...t.gen()});
      if (t.id === 'divis' && q.type === 4) {
        q.question += '<br><small>Agrupa els factors repetits com a potències.</small>';
      }
      if (t.id === 'proporcionalitat' && q.type === 6) {
        q.options = q.options.filter(o => o !== 'Només entre els dos primers valors');
      }
      if (t.id === 'fraccions' && q.type === 11) {
        // El generador pot incloure l’equivalència correcta amb punt en lloc de coma.
        q.options = q.options.filter(o => String(o) === String(q.correct) ||
          normOpenText(o) !== normOpenText(q.correct));
      }
      const key = plain(q.question);
      if (seen.has(key) || !q.solution || !q.solution.length || !Array.isArray(q.options)) continue;
      // El mode test de pràctica compara les opcions amb la resposta exacta.
      if (q.options.filter(o => String(o) === String(q.correct)).length !== 1) continue;
      if (new Set(q.options.map(plain)).size !== q.options.length) continue;
      seen.add(key); pool.push(q);
    }
    const result = [], counts = {};
    // Aquests blocs tenen més habilitats diferents concentrades en un mateix nivell.
    const slots = t.id === 'fraccions' ? [6,4,2] : t.id === 'decimals' ? [2,6,4] : [4,4,4];
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
  (document.querySelector('.screen').parentElement).appendChild(screen);
  const body = screen.firstElementChild;
  function button(label, action, disabled) {
    return '<button type="button" class="'+secondary+'" data-action="'+action+'" '+(disabled?'disabled':'')+'>'+label+'</button>';
  }
  function links() {
    return '<a class="theory-page-link" href="'+MI_THEORY_PAGES[session.topic.id]+'">📚 Repassar la teoria</a>' + button('← Tornar a la pràctica', 'practice');
  }
  function render() {
    const answered = session.answers.filter(a => a !== null).length;
    body.innerHTML = '<h2 tabindex="-1">Examen del tema · '+escape(session.topic.name)+'</h2><p role="status">'+answered+' de '+session.questions.length+' preguntes respostes</p><progress max="'+session.questions.length+'" value="'+answered+'" aria-label="Preguntes respostes"></progress><p>Selecciona una resposta. Pots canviar-la i revisar totes les preguntes abans de lliurar. Les solucions es mostraran en acabar.</p>' + session.questions.map((q,i) => '<fieldset><legend>Pregunta '+(i+1)+' · '+['','Fàcil','Mitjana','Alta'][level(session.topic,q)]+'</legend><div class="'+(numeric?'exq':'ex-question')+'">'+q.question+'</div>'+q.options.map((o,j) => '<label class="mi-topic-option"><input type="radio" name="topicQ'+i+'" data-question="'+i+'" value="'+j+'" '+(session.answers[i]===j?'checked':'')+'><span>'+o+'</span></label>').join('')+button('Deixar sense resposta', 'clear-'+i)+'</fieldset>').join('')+'<div class="mi-topic-exam-actions"><button type="button" class="'+primary+'" data-action="submit">Lliurar l’examen</button>'+links()+'</div>';
  }
  function finish() {
    if (session.finished) return;
    session.finished = true;
    // Un esdeveniment per lliurament; només metadades fixes del tema.
    if (location.protocol !== 'file:' && !['localhost', '127.0.0.1', '::1', '[::1]'].includes(location.hostname)) {
      try {
        if (typeof window.goatcounter?.count === 'function') {
          window.goatcounter.count({
            path: 'mi/exam/submitted/1eso/'+session.topic.id,
            title: 'MI · Examen lliurat · 1r ESO · '+session.topic.name,
            event: true,
            no_session: true,
            referrer: ''
          });
        }
      } catch { /* L’analítica no ha d’interrompre la correcció. */ }
    }
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
    if (action==='practice') { const i=TOPICS.indexOf(session.topic); numeric?selTopic(i):selectTopic(i); }
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
  if(params.get('examen')==='tema')start(params.get('tema'));
})();
