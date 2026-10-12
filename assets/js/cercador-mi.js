/* Independent progressive enhancement for the five MI home pages. */
(() => {
  'use strict';
  const script = document.currentScript;
  const root = new URL('../../', script.src);
  const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/\s+/g, ' ').trim();
  const aliases = {mcm: 'minim comu multiple', mcd: 'maxim comu divisor', estadistica: 'estadisti', probabilitat: 'probabilitat', pitagores: 'pitagores'};
  const courses = ['', '1r ESO', '2n ESO', '3r ESO', '4t ESO'];
  document.querySelectorAll('[data-mi-search]').forEach(async host => {
    const input = host.querySelector('input');
    const status = host.querySelector('[data-search-status]');
    const list = host.querySelector('[data-search-results]');
    const more = host.querySelector('button');
    let entries = [], limit = 6, loaded = false;
    const option = () => document.querySelector('.option-card[aria-pressed="true"]')?.dataset.option || null;
    const url = (path, mode) => {
      const value = new URL(path, root);
      if (mode) value.searchParams.set('opcio', mode);
      return value.href;
    };
    const render = () => {
      const query = normalize(input.value);
      list.replaceChildren();
      more.hidden = true;
      if (!loaded) return;
      if (!query) { status.textContent = 'Escriu un tema o un sentit matemàtic.'; return; }
      const tokens = query.split(' ').map(t => aliases[t] || t);
      const selected = host.dataset.course === '4' ? option() : null;
      const matches = entries.filter(e => (!host.dataset.course || e.course === Number(host.dataset.course)) && (!selected || e.modes.includes(selected)))
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
          for (const [key,label] of [['theory','Veure teoria'],['practice','Practicar']]) {
            if (!e[key]) continue;
            const a = document.createElement('a'); a.href = url(e[key], mode);
            a.textContent = label + (e.course === 4 && !selected ? ` · ${mode}` : '');
            a.setAttribute('aria-label', `${a.textContent}: ${e.title}, ${courses[e.course]}`);
            li.append(a);
          }
        }
        list.append(li);
      }
      more.hidden = matches.length <= limit;
    };
    input.addEventListener('input', () => { limit = 6; render(); });
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
