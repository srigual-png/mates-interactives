/* MI analytics: fixed catalogue identifiers only. Never pass answers or query text. */
(() => {
  'use strict';
  if (window.MIAnalytics) return;
  const page = location.pathname.match(/([1-4]eso)\/sentit-(numeric|mesura|algebraic|espacial|estocastic)\.html$/);
  const excluded = () => location.protocol === 'file:' || /^(localhost|127\..*|10\..*|192\.168\..*|172\.(1[6-9]|2\d|3[01])\..*|0\.0\.0\.0|\[?::1\]?)$/.test(location.hostname);
  const queue = [];
  let timer, deadline;
  function flush() {
    timer = undefined;
    if (typeof window.goatcounter?.count === 'function') {
      for (const event of queue.splice(0)) { try { window.goatcounter.count(event); } catch {} }
    } else if (Date.now() < deadline) timer = setTimeout(flush, 250);
    else queue.length = 0;
  }
  function track(path, title = path) {
    if (excluded()) return;
    const event = {path, title, event: true, no_session: true, referrer: ''};
    try {
      if (typeof window.goatcounter?.count === 'function') window.goatcounter.count(event);
      else {
        if (queue.length < 50) queue.push(event);
        if (timer === undefined) { deadline = Date.now() + 30000; timer = setTimeout(flush, 250); }
      }
    } catch { /* Analytics never interrupts teaching or navigation. */ }
  }
  const safe = value => /^[a-zA-Z0-9_-]+$/.test(String(value)) ? String(value) : 'all';
  // Existing IDs reused by different senses: old submissions merged their counts.
  const ambiguousTopics = {'1eso': ['poligons'], '2eso': ['pitagores', 'problemes', 'semblanca3r']};
  const st = () => typeof ST !== 'undefined' ? ST : typeof state !== 'undefined' ? state : {};
  const topic = () => typeof TOPICS !== 'undefined' ? TOPICS[st().currentTopic] : null;
  const option = () => {
    if (page?.[1] !== '4eso') return '';
    const value = typeof MATH_OPTION !== 'undefined' ? MATH_OPTION : new URLSearchParams(location.search).get('opcio');
    return value === 'A' || value === 'B' ? '/' + value : '';
  };
  let practice, currentTopicId, answered = false, completed = false, exam = false, submitted = false;
  let lastStart = '', lastStartTime = -Infinity;
  function emit(activity, action, id, mode, result) {
    if (!page) return;
    track(['mi', activity, action, page[1], page[2], safe(id || 'all'), mode, result].filter(Boolean).join('/') + option());
  }
  function start(activity) {
    const t = topic(); if (!t && !activity) return;
    const key = activity || t.id + '/' + (st().level === 1 ? 'guiat' : 'autonom');
    if (key === lastStart && performance.now() - lastStartTime < 350) return;
    lastStart = key; lastStartTime = performance.now();
    const ordinal = {'1eso':'1r','2eso':'2n','3eso':'3r','4eso':'4t'}[page?.[1]];
    practice = {id: activity ? 'all' : t.id, mode: activity ? null : st().level === 1 ? 'guiat' : 'autonom', activity: activity || (t.isExtension || t.course && t.course !== ordinal ? 'extension' : 'practice')};
    completed = false;
    // Keep the historical numeric base; qualify A/B without a duplicate event.
    if (!activity && page?.[2] === 'numeric') track(page[1] + '-numeric-' + safe(t.id) + '-' + practice.mode + option(), ['MI', practice.activity, page[1], 'numeric', safe(t.id), practice.mode].join(' · ') + option());
    else emit(practice.activity, 'started', practice.id, practice.mode);
  }
  function shown(id) {
    currentTopicId = id || practice?.id;
    answered = false;
    queueMicrotask(() => {
      const guide = document.querySelector('#gst, #guideSteps, #guideArea');
      if (guide && guide.textContent.trim() && guide.getClientRects().length) hint();
    });
  }
  function answer(ok, id) {
    if (!practice || answered) return;
    answered = true;
    currentTopicId = id || currentTopicId || practice.id;
    emit(practice.activity, 'answered', currentTopicId, practice.mode, ok ? 'correct' : 'incorrect');
  }
  function hint(id) { if (practice) emit(practice.activity, 'hint', id || currentTopicId || practice.id, practice.mode); }
  function complete() {
    if (!practice || completed) return;
    completed = true; emit(practice.activity, 'completed', practice.id, practice.mode);
  }
  function examStart() { exam = true; submitted = false; emit('sense-exam', 'started', 'all'); }
  function examSubmit() { if (!exam || submitted) return; submitted = true; emit('sense-exam', 'submitted', 'all'); }
  window.MIAnalytics = {track, start, shown, answer, hint, complete, examStart, examSubmit,
    topicExam(action, id) {
      // Preserve unambiguous historical keys; qualify collisions and A/B in path.
      if (action === 'submitted') track('mi/exam/submitted/' + page[1] + '/' + safe(id) + (ambiguousTopics[page[1]]?.includes(id) ? '/' + page[2] : '') + option(), 'MI · topic-exam · ' + page[1] + ' · ' + page[2] + ' · ' + safe(id) + option());
      else emit('topic-exam', action, id);
    },
    demo(action, theoryPath, ok) {
      if (!/^[1-4]eso\/teoria\/(numeric|mesura|algebraic|espacial|estocastic)\/[a-z0-9-]+\.html$/.test(theoryPath)) return;
      track('mi/demo/' + action + '/' + theoryPath.replace('.html', '') + (typeof ok === 'boolean' ? '/' + (ok ? 'correct' : 'incorrect') : ''));
    }
  };
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (!link || !link.closest('.ko, .fb-err, .feedback-box.ko') || !practice) return;
    try {
      const url = new URL(link.href, location.href);
      if (url.origin === location.origin && /\/teoria\//.test(url.pathname)) emit(practice.activity, 'theory-error', currentTopicId || practice.id, practice.mode);
    } catch {}
  });
  if (!excluded() && !document.querySelector('script[data-goatcounter]')) {
    // Strip unreviewed URL query/hash and incoming referrer from automatic pageviews.
    window.goatcounter = window.goatcounter || {};
    window.goatcounter.path = location.pathname;
    window.goatcounter.referrer = '';
    window.goatcounter.no_onload = true;
    window.goatcounter.no_events = true;
    const script = document.createElement('script');
    script.async = true;
    script.dataset.goatcounter = 'https://srigual.goatcounter.com/count';
    script.src = 'https://gc.zgo.at/count.js';
    script.onload = () => {
      try {
        const gc = window.goatcounter;
        // The client also adds raw location.search in q independently of path.
        const getData = gc.get_data;
        gc.get_data = vars => { const data = getData(vars); delete data.q; return data; };
        let counted = false;
        const visit = () => {
          if (counted || document.visibilityState === 'hidden' || document.visibilityState === 'prerender') return;
          counted = true; gc.count();
        };
        visit();
        document.addEventListener('visibilitychange', visit);
        flush();
      } catch {}
    };
    document.head.appendChild(script);
  }
})();
