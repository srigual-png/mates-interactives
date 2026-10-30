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
  function level(t,q){return miTaskDifficulty.getDifficulty(t,q);}
  function topicPlan(t){const revisedPlan=miTaskDifficulty.examPlan(t);if(revisedPlan)return revisedPlan;return {slots:advanced ? [4,4,4] : t.id === 'fraccions' ? [6,4,2] : t.id === 'decimals' ? [2,6,4] :
      t.id === 'estimacio' ? [8,4,0] : t.id === 'mesurament' ? [4,6,2] : [4,4,4],reviewed:false};}
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
      // Comprova la cobertura abans que altres filtres descartin la variant.
      level(t,q);
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
    const slots=topicPlan(t).slots;
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
    const revisedPlan=miTaskDifficulty.examPlan(session.topic);
    const revisedNote=revisedPlan?'<p role="note">Cobertura revisada: '+revisedPlan.types.map((n,i)=>['baixa','mitjana','alta'][i]+': '+n+' tipus').join(' · ')+'. Aquest examen conté '+revisedPlan.slots.map((n,i)=>n+' de dificultat '+['baixa','mitjana','alta'][i]).join(', ')+'. '+(revisedPlan.types[2]===1?'Cobertura alta limitada: les preguntes altes són variants d’una sola família. ':'')+'Els nivells sense cobertura no se substitueixen ni es presenten com a coberts.</p>':'';
    const coverageNote=revisedNote || '<p role="note">Quotes d’examen: '+topicPlan(session.topic).slots.map((n,i)=>n+' de dificultat '+['baixa','mitjana','alta'][i]).join(', ')+'.</p>'+(secondYear&&session.topic.id==='racionals'&&typeof rationalDifficulty2ESO==='function' ? '<p role="note">Cobertura alta limitada: les quatre preguntes altes són variants d’una mateixa família de problemes inversos de proporcions.</p>' : '');
    const answered = session.answers.filter(a => a !== null).length;
    body.innerHTML = '<h2 tabindex="-1">Examen del tema · '+escape(session.topic.name)+'</h2><p role="status">'+answered+' de '+session.questions.length+' preguntes respostes</p><progress max="'+session.questions.length+'" value="'+answered+'" aria-label="Preguntes respostes"></progress><p>Selecciona una resposta. Pots canviar-la i revisar totes les preguntes abans de lliurar. Les solucions es mostraran en acabar.</p>' + coverageNote + session.questions.map((q,i) => '<fieldset><legend>Pregunta '+(i+1)+' · '+['','Fàcil','Mitjana','Alta'][level(session.topic,q)]+'</legend><div class="'+(numeric?'exq':'ex-question')+'">'+(stochasticFourthYear || stochasticThirdYear || stochasticSecondYear || stochasticFirstYear || algebraFourthYear || algebraThirdYear || algebraSecondYear || algebraFirstYear || spatialFirstYear || spatialSecondYear || spatialThirdYear || spatialFourthYear?'<div class="q-text">'+q.question+'</div>':q.question)+'</div>'+q.options.map((o,j) => '<label class="mi-topic-option"><input type="radio" name="topicQ'+i+'" data-question="'+i+'" value="'+j+'" '+(session.answers[i]===j?'checked':'')+'><span>'+o+'</span></label>').join('')+button('Deixar sense resposta', 'clear-'+i)+'</fieldset>').join('')+'<div class="mi-topic-exam-actions"><button type="button" class="'+primary+'" data-action="submit">Lliurar l’examen</button>'+links()+'</div>';
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
    catch (error) { session=undefined; body.textContent = error.message; showScreen(screen.id); return; }
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
  window.miTopicExam = {start, build, getDifficulty:level, getPlan:topicPlan, getTopics:()=>topics.slice(), getSession:()=>session};
  const params=new URLSearchParams(location.search);
  if(params.get('examen')==='tema')start(params.get(advanced?'topic':'tema') || params.get('tema'));
})();
