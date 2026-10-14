/* Independent progressive enhancement for the five MI home pages. */
(() => {
  'use strict';
  const script = document.currentScript;
  const root = new URL('../../', script.src);
  const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/\s+/g, ' ').trim();
  const aliases = {mcm: 'minim comu multiple', mcd: 'maxim comu divisor', estadistica: 'estadisti', probabilitat: 'probabilitat', pitagores: 'pitagores'};
  const courses = ['', '1r ESO', '2n ESO', '3r ESO', '4t ESO'];
  // All outbound values come from the catalogue or a finite category, never the input.
  const topicId = e => e.theory.replace(/\.html$/, '');
  const senseId = e => e.theory.split('/')[2];
  const track = (path, title) => {
    if (location.protocol === 'file:' || ['localhost', '127.0.0.1', '::1', '[::1]'].includes(location.hostname)) return;
    try {
      if (typeof window.goatcounter?.count === 'function') {
        window.goatcounter.count({path, title, event: true, no_session: true, referrer: ''});
      }
    } catch { /* Analytics must never interrupt search or navigation. */ }
  };
  document.querySelectorAll('[data-mi-search]').forEach(async host => {
    const input = host.querySelector('input');
    const status = host.querySelector('[data-search-status]');
    const list = host.querySelector('[data-search-results]');
    const more = host.querySelector('button');
    let entries = [], limit = 6, loaded = false, matches = [], timer, lastSearch = '';
    const origin = host.dataset.course ? `${host.dataset.course}eso` : 'general';
    const originTitle = host.dataset.course ? courses[Number(host.dataset.course)] : 'Portada general';
    const option = () => document.querySelector('.option-card[aria-pressed="true"]')?.dataset.option || null;
    const url = (path, mode) => {
      const value = new URL(path, root);
      if (mode) value.searchParams.set('opcio', mode);
      return value.href;
    };
    const recordSearch = () => {
      clearTimeout(timer);
      const query = normalize(input.value);
      if (!loaded || query.length < 3) return;
      const signature = query.split(' ').map(t => aliases[t] || t).join(' ');
      if (signature === lastSearch) return;
      lastSearch = signature; // Deduplicate attempts even if analytics is blocked.
      if (!matches.length) {
        track(`mi/search/query/${origin}/no-results`, `MI cerca · ${originTitle} · Sense resultats`);
        return;
      }
      const exact = matches.filter(({e}) => normalize(e.title) === query);
      const recognized = matches.length === 1 ? matches[0].e : exact.length === 1 ? exact[0].e : null;
      if (recognized) {
        track(`mi/search/query/${origin}/topic/${topicId(recognized)}`, `MI cerca · ${originTitle} · ${recognized.title} · Amb resultats`);
      } else {
        const senses = new Set(matches.map(({e}) => senseId(e)));
        const category = senses.size === 1 ? [...senses][0] : 'multiple';
        const label = senses.size === 1 ? matches[0].e.sense : 'Diversos sentits';
        track(`mi/search/query/${origin}/category/${category}`, `MI cerca · ${originTitle} · ${label} · Diversos temes`);
      }
    };
    const render = () => {
      const query = normalize(input.value);
      list.replaceChildren();
      more.hidden = true;
      if (!loaded) return;
      matches = [];
      if (!query) { status.textContent = 'Escriu un tema o un sentit matemàtic.'; return; }
      const tokens = query.split(' ').map(t => aliases[t] || t);
      const selected = host.dataset.course === '4' ? option() : null;
      matches = entries.filter(e => (!host.dataset.course || e.course === Number(host.dataset.course)) && (!selected || e.modes.includes(selected)))
        .map(e => {
          const name = normalize(e.title);
          const haystack = normalize(`${e.title} ${e.sense} ${e.keywords}`);
          const match = tokens.every(t => haystack.includes(t));
          return {e, score: !match ? -1 : name === query ? 3 : name.includes(query) ? 2 : 1};
        }).filter(x => x.score >= 0).sort((a,b) => b.score - a.score || a.e.course - b.e.course);
      status.textContent = matches.length ? `${matches.length} temes trobats. Es mostren ${Math.min(limit, matches.length)}.` : 'No hem trobat cap tema. Prova una altra paraula o el nom d’un sentit matemàtic.';
      for (const {e} of matches.slice(0, limit)) {
        const li = document.createElement('li');
        const title = document.createElement('h3'); title.textContent = e.title;
        const meta = document.createElement('p');
        meta.textContent = `${courses[e.course]} · ${e.sense}${e.course === 4 ? ' · Matemàtiques ' + (selected || e.modes.join('/')) : ''}`;
        li.append(title, meta);
        const modes = e.course === 4 ? (selected ? [selected] : e.modes) : [null];
        for (const mode of modes) {
          for (const [key,label] of [['theory','Veure teoria'],['practice','Practicar'],['exam','Examen']]) {
            if (!e[key]) continue;
            const a = document.createElement('a'); a.href = url(e[key], mode);
            a.textContent = label + (e.course === 4 && !selected ? ` · ${mode}` : '');
            if (key === 'exam') a.className = 'mi-search__exam';
            a.setAttribute('aria-label', `${a.textContent}: ${e.title}, ${courses[e.course]}`);
            const recordClick = () => {
              recordSearch(); // Flush an unfinished search before its result click.
              const action = key;
              track(`mi/search/${action}/${origin}/${topicId(e)}${mode ? '/' + mode : ''}`,
                `MI cerca · ${label} · ${originTitle} → ${courses[e.course]} · ${e.sense} · ${e.title}${mode ? ' · Matemàtiques ' + mode : ''}`);
            };
            a.addEventListener('click', recordClick);
            a.addEventListener('auxclick', event => { if (event.button === 1) recordClick(); });
            li.append(a);
          }
        }
        list.append(li);
      }
      more.hidden = matches.length <= limit;
    };
    const scheduleSearch = event => {
      clearTimeout(timer); limit = 6; render();
      if (!event.isComposing && normalize(input.value).length >= 3) timer = setTimeout(recordSearch, 1000);
    };
    input.addEventListener('input', scheduleSearch);
    input.addEventListener('compositionstart', () => clearTimeout(timer));
    input.addEventListener('compositionend', scheduleSearch);
    more.addEventListener('click', () => { limit += 6; render(); });
    if (host.dataset.course === '4') {
      const cards = document.querySelector('.option-section');
      if (cards) new MutationObserver(() => { limit = 6; render(); }).observe(cards, {subtree:true, attributes:true, attributeFilter:['aria-pressed']});
    }
    try {
      if (root.protocol === 'file:') {
        entries = await new Promise((resolve, reject) => {
          const localIndex = document.createElement('script');
          localIndex.src = new URL('assets/data/index-cerca-local.js', root).href;
          localIndex.onload = () => {
            const data = window.MICercaLocal;
            delete window.MICercaLocal;
            localIndex.remove();
            if (Array.isArray(data)) resolve(data); else reject(new Error('index'));
          };
          localIndex.onerror = () => { localIndex.remove(); reject(new Error('index')); };
          document.head.append(localIndex);
        });
      } else {
        const response = await fetch(new URL('assets/data/index-cerca.json', root));
        if (!response.ok) throw new Error('index');
        entries = await response.json();
      }
      loaded = true; render();
    } catch {
      status.textContent = 'El cercador no està disponible ara mateix. Pots accedir als continguts amb les targetes de la portada.';
      input.disabled = true;
    }
  });
})();
