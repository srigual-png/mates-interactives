(function () {
  'use strict';
  const bank = window.MIPortadaBank;
  document.querySelectorAll('[data-mi-demo]').forEach(host => {
    const find = name => host.querySelector(`[data-demo-${name}]`);
    const form = find('form'), response = find('response'), result = find('result');
    let current;
    function newExercise(focus) {
      current = bank.generate(host.dataset.courses.split(','), current);
      find('meta').textContent = `${current.courseLabel} · ${current.sense}`;
      find('topic').textContent = current.topic;
      find('question').textContent = current.question;
      result.replaceChildren();
      response.replaceChildren();
      const label = document.createElement('label');
      label.htmlFor = `${host.id}-answer`;
      label.textContent = 'La teva resposta';
      const control = document.createElement(current.type === 'choice' ? 'select' : 'input');
      control.id = label.htmlFor;
      control.name = 'answer';
      if (current.type === 'choice') {
        const placeholder = new Option('Selecciona una resposta', '');
        control.append(placeholder, ...current.options.map(option => new Option(option, option)));
      } else {
        control.type = 'text';
        control.inputMode = 'text'; // El teclat ha de permetre també / i el signe menys.
        control.autocomplete = 'off';
      }
      const hint = document.createElement('p');
      hint.id = `${host.id}-hint`;
      hint.className = 'exercise-demo__hint';
      hint.textContent = current.hint || (current.type === 'choice' ? 'Tria una de les opcions.' : 'Escriu el resultat, sense unitats. Pots usar coma o punt decimal.');
      control.setAttribute('aria-describedby', hint.id);
      response.append(label, control, hint);
      if (focus) control.focus();
    }
    form.addEventListener('submit', event => {
      event.preventDefault();
      const control = form.elements.answer, raw = control.value.trim();
      result.replaceChildren();
      if (!raw || (current.type === 'number' && bank.parseNumber(raw) === null)) {
        result.textContent = !raw ? 'Escriu o selecciona una resposta abans de comprovar.' :
          `La resposta no és vàlida. ${current.hint || 'Escriu un nombre, sense unitats. Pots usar coma o punt decimal.'}`;
        control.setAttribute('aria-invalid', 'true');
        control.focus();
        return;
      }
      control.removeAttribute('aria-invalid');
      const correct = bank.validate(current, raw);
      const status = document.createElement('p');
      status.className = `exercise-demo__status exercise-demo__status--${correct ? 'correct' : 'incorrect'}`;
      status.textContent = correct ? '✅ Correcte!' : `❌ Incorrecte. Resposta correcta: ${current.answerLabel}.`;
      const steps = document.createElement('ol');
      current.steps.forEach(text => { const item = document.createElement('li'); item.textContent = text; steps.append(item); });
      result.append(status, steps);
      if (!correct) {
        const theory = document.createElement('a');
        theory.href = bank.theoryUrl(current);
        theory.target = 'MI_TEORIA';
        theory.textContent = '📚 Repassar la teoria d’aquest tema';
        theory.addEventListener('click', event => {
          if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
          event.preventDefault();
          const tab = window.open(theory.href, 'MI_TEORIA');
          if (tab) tab.focus();
        });
        result.append(theory);
      }
    });
    response.addEventListener('input', () => { form.elements.answer.removeAttribute('aria-invalid'); result.replaceChildren(); });
    find('next').addEventListener('click', () => newExercise(true));
    newExercise(false);
    host.hidden = false;
  });
})();
