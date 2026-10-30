(function () {
  'use strict';
  const engine=window.MIWorksheets,scope=window.MIWorksheetConfig;
  if(!engine||!scope)return;
  const host=document.createElement('section');host.className='mi-worksheet';host.setAttribute('aria-labelledby','miWorksheetTitle');
  document.getElementById(scope.homeId||'sHome').append(host);
  const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const select=(id,label,items,value)=>`<label for="${id}">${label}<select id="${id}" name="${id}">${items.map(([v,t])=>`<option value="${v}" ${v==value?'selected':''}>${t}</option>`).join('')}</select></label>`;
  host.innerHTML=`<h2 id="miWorksheetTitle">Genera una fitxa d’exercicis</h2><p>Prepara exercicis per practicar en paper, amb espai per respondre i un solucionari opcional en un document separat.</p><form><fieldset id="miWorksheetFields"><div class="mi-worksheet-grid">${select('ws-count','Nombre d’exercicis',[5,10,15,20,25,30].map(n=>[n,n]),10)}<div><label id="ws-topics-label">Temes</label><details id="ws-topics" aria-labelledby="ws-topics-label"><summary id="ws-topic-summary">Selecciona els temes</summary><div class="mi-topic-list"><label><input type="checkbox" id="ws-all">Tots els temes</label>${scope.topics.map((t,i)=>`<label><input type="checkbox" name="ws-topic" value="${t.id}" ${t.levels.length?'':'disabled'} ${i<10&&t.levels.length?'checked':''}>${escape(t.name)}${t.levels.length?'':' — encara no disponible en paper'}</label>`).join('')}</div></details></div><fieldset class="mi-wide"><legend>Dificultat matemàtica</legend><div class="mi-levels">${['Baixa','Mitjana','Alta'].map((l,i)=>select('ws-level-'+i,l,Array.from({length:11},(_,n)=>[n*10,n*10+' %']),[40,40,20][i])).join('')}</div><p id="ws-total" role="status"></p><p id="ws-counts"></p></fieldset>${select('ws-order','Ordre dels exercicis',[['grouped','Agrupats per temes'],['mixed','Barrejats']],'grouped')}${select('ws-space','Espai per respondre',[['compact','Compacte'],['normal','Normal'],['wide','Ampli']],'normal')}${select('ws-format','Format de sortida',[['docx','Word (.docx)'],['pdf','PDF'],['both','Word + PDF']],'both')}${select('ws-solutions','Solucionari',[['none','Sense solucionari'],['answers','Només respostes'],['steps','Resolució pas a pas']],'steps')}</div></fieldset><p id="ws-summary"></p><small id="ws-selected"></small><p id="ws-validation" class="mi-error" aria-live="polite"></p><button type="submit" id="ws-generate">Genera la fitxa</button></form><p id="ws-status" role="status" aria-live="polite"></p><div id="ws-results" hidden><p id="ws-version"></p><div class="mi-worksheet-downloads"></div><button type="button" id="ws-another">Genera una altra versió</button></div>`;
  const $=id=>host.querySelector('#'+id),form=host.querySelector('form');let busy=false,current=null,pending=null,urls=[],exporterPromise;
  function config(){return {count:+$('ws-count').value,topics:[...host.querySelectorAll('[name="ws-topic"]:checked')].map(e=>e.value),percentages:[0,1,2].map(i=>+$('ws-level-'+i).value),order:$('ws-order').value,space:$('ws-space').value,format:$('ws-format').value,solutions:$('ws-solutions').value};}
  function clearDownloads(){urls.forEach(URL.revokeObjectURL);urls=[];$('ws-results').hidden=true;host.querySelector('.mi-worksheet-downloads').replaceChildren();}
  function update(){
    const c=config(),total=c.percentages.reduce((a,b)=>a+b,0);
    c.percentages.forEach((p,i)=>[...$('ws-level-'+i).options].forEach(o=>o.disabled=+o.value>engine.maximum(c.percentages,i)));
    $('ws-total').textContent=total===100?'Total: 100 % ✓':`Total: ${total} % — falta assignar un ${100-total} %`;
    $('ws-counts').textContent=total===100?engine.counts(c.count,c.percentages).map((n,i)=>`${n} ${['de dificultat baixa','de mitjana','d’alta'][i]}`).join(', '):'Completa els percentatges per veure les quantitats reals.';
    let error=engine.validate(c,scope.topics);if(!error)try{engine.allocate(c,scope.topics);}catch(e){error=e.message;}
    $('ws-validation').textContent=error;$('ws-generate').disabled=busy||!!error;
    $('ws-topic-summary').textContent=`${c.topics.length} temes seleccionats`;
    const available=scope.topics.filter(t=>t.levels.length).length;$('ws-all').checked=c.topics.length===available;$('ws-all').indeterminate=c.topics.length>0&&c.topics.length<available;
    $('ws-selected').textContent=c.topics.map(id=>scope.topics.find(t=>t.id===id).name).join(' · ');
    $('ws-summary').textContent=`${scope.label||'1r d’ESO · Sentit numèric'} · ${c.count} exercicis · ${$('ws-order').selectedOptions[0].text} · Espai ${$('ws-space').selectedOptions[0].text.toLowerCase()} · ${$('ws-format').selectedOptions[0].text} · ${$('ws-solutions').selectedOptions[0].text}`;
  }
  form.addEventListener('change',e=>{if(e.target.id==='ws-all')host.querySelectorAll('[name="ws-topic"]:not(:disabled)').forEach(el=>el.checked=e.target.checked);clearDownloads();current=null;pending=null;$('ws-generate').textContent='Genera la fitxa';$('ws-status').textContent='Configuració actualitzada. Genera una fitxa amb aquests valors.';update();});
  $('ws-topics').addEventListener('keydown',e=>{if(e.key==='Escape'){$('ws-topics').open=false;$('ws-topic-summary').focus();}});
  function analytics(action,format){try{window.MIAnalytics?.track('mi/worksheet/'+action+'/'+scope.id+(format?'/'+format:''),'MI · Fitxes · '+action);}catch{}}
  function exporter(){if(!exporterPromise)exporterPromise=new Promise((resolve,reject)=>{const s=document.createElement('script');s.src='../assets/js/fitxes/export.js';s.onload=()=>resolve(window.MIWorksheetExport);s.onerror=()=>{s.remove();exporterPromise=null;reject(new Error('No s’ha pogut carregar l’exportació. Torna-ho a provar.'));};document.head.append(s);});return exporterPromise;}
  async function generate(another=false){
    if(busy)return;const c=config();if(engine.validate(c,scope.topics))return;
    busy=true;$('miWorksheetFields').disabled=true;$('ws-another').disabled=true;update();$('ws-status').textContent='Generant els exercicis i preparant els documents…';host.setAttribute('aria-busy','true');
    const previous=another&&current?current.questions.map(q=>q.key):[];
    clearDownloads();
    try{
      // En reintentar una exportació fallida, conservem el mateix conjunt.
      if(!pending)pending=await engine.generate(c,scope.topics,previous);
      const exp=await exporter(),files=await exp.create(pending,scope);
      current=pending;pending=null;
      files.forEach(file=>{const a=document.createElement('a'),url=URL.createObjectURL(file.blob);urls.push(url);a.href=url;a.download=file.name;a.textContent=file.label;a.addEventListener('click',()=>analytics('download',file.kind));host.querySelector('.mi-worksheet-downloads').append(a);});
      $('ws-version').textContent='Versió '+current.version+' · Pots tornar a descarregar aquests mateixos documents.';$('ws-results').hidden=false;$('ws-status').textContent='Fitxa preparada. Tria una descàrrega.';$('ws-generate').textContent='Genera la fitxa';analytics('generated',c.format);host.querySelector('.mi-worksheet-downloads a').focus();
    }catch(e){$('ws-status').textContent='No s’ha completat la generació: '+e.message;$('ws-generate').textContent='Reintenta la generació';}
    finally{busy=false;$('miWorksheetFields').disabled=false;$('ws-another').disabled=false;host.removeAttribute('aria-busy');update();}
  }
  form.addEventListener('submit',e=>{e.preventDefault();generate(!!current);});$('ws-another').addEventListener('click',()=>generate(true));
  update();
  window.MIWorksheetUI={getCurrent:()=>current,getConfig:config};
})();
