(function () {
  'use strict';
  const engine=window.MIWorksheets,scope=window.MIWorksheetConfig;
  if(!engine||!scope)return;
  const firstNumeric=scope.id==='1eso-numeric';
  const trialNotice=['1eso-numeric','2eso-numeric'].includes(scope.id)?'<aside class="mi-worksheet-note" aria-labelledby="ws-trial-title"><strong id="ws-trial-title">Generador de fitxes · Versió en proves</strong><p>Estem millorant aquesta eina. Algunes combinacions de temes i nombre d\'exercicis poden tenir limitacions de varietat o no estar disponibles temporalment.</p><p>Gràcies per ajudar-nos a millorar Mates Interactives!</p></aside>':'';
  const host=document.createElement('section');host.className='mi-worksheet';host.setAttribute('aria-labelledby','miWorksheetTitle');
  document.getElementById(scope.homeId||'sHome').append(host);
  const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const select=(id,label,items,value)=>`<label for="${id}">${label}<select id="${id}" name="${id}">${items.map(([v,t])=>`<option value="${v}" ${v==value?'selected':''}>${t}</option>`).join('')}</select></label>`;
  host.innerHTML=`<h2 id="miWorksheetTitle">Genera una fitxa d’exercicis</h2>${trialNotice}<p>Prepara exercicis per practicar en paper, amb espai per respondre i un solucionari opcional en un document separat.</p><form><fieldset id="miWorksheetFields"><div class="mi-worksheet-grid">${select('ws-count','Nombre d’exercicis',(firstNumeric?engine.fixedCounts:scope.worksheetTypes?Array.from({length:30},(_,i)=>i+1):[5,10,15,20,25,30]).map(n=>[n,n]),firstNumeric?10:scope.worksheetTypes?15:10)}<div><label id="ws-topics-label">Temes</label><details id="ws-topics" aria-labelledby="ws-topics-label"><summary id="ws-topic-summary">Selecciona els temes</summary><div class="mi-topic-list"><label><input type="checkbox" id="ws-all">Tots els temes</label>${scope.topics.map((t,i)=>`<label><input type="checkbox" name="ws-topic" value="${t.id}" ${t.levels.length?'':'disabled'} ${i<10&&t.levels.length?'checked':''}>${escape(t.name)}${t.levels.length?'':' — encara no disponible en paper'}</label>`).join('')}</div></details></div>${scope.worksheetTypes?select('ws-type','Tipus de fitxa',[['standard','Estàndard'],['extension','Ampliació']],'standard')+'<p id="ws-type-help" role="status"></p>':`<fieldset class="mi-wide"><legend>Dificultat matemàtica</legend><div class="mi-levels">${['Baixa','Mitjana','Alta'].map((l,i)=>select('ws-level-'+i,l,Array.from({length:11},(_,n)=>[n*10,n*10+' %']),[40,40,20][i])).join('')}</div><p id="ws-total" role="status"></p><p id="ws-counts"></p></fieldset>`}${select('ws-order','Ordre dels exercicis',[['grouped','Agrupats per temes'],['mixed','Barrejats']],'grouped')}${select('ws-space','Espai per respondre',[['compact','Compacte'],['normal','Normal'],['wide','Ampli']],'normal')}${select('ws-format','Format de sortida',[['docx','Word (.docx)'],['pdf','PDF'],['both','Word + PDF']],'both')}${select('ws-solutions','Solucionari',[['none','Sense solucionari'],['answers','Només respostes'],['steps','Resolució pas a pas']],'steps')}</div></fieldset><p id="ws-summary"></p><small id="ws-selected"></small><p id="ws-validation" class="mi-error" aria-live="polite"></p><button type="submit" id="ws-generate">Genera la fitxa</button></form><p id="ws-status" role="status" aria-live="polite"></p>${firstNumeric?`<section id="ws-variety" class="mi-worksheet-note" aria-labelledby="ws-variety-title" hidden><h3 id="ws-variety-title" tabindex="-1">No hi ha prou varietat d’exercicis</h3><p id="ws-variety-request"></p><p id="ws-variety-message"></p><p id="ws-variety-explanation"></p><div class="mi-variety-actions"><div><label for="ws-reduce-count">Prova una quantitat inferior</label><select id="ws-reduce-count"><option value="">Tria una quantitat inferior</option></select><small id="ws-reduce-help">Comprovarem la disponibilitat abans de preparar els documents.</small><button type="button" id="ws-reduce" aria-describedby="ws-reduce-help">Comprova i genera menys exercicis</button></div><button type="button" id="ws-add-topics">Afegir més temes</button><button type="button" id="ws-similar">Continuar amb exercicis semblants</button></div></section>`:''}<button type="button" id="ws-standard" hidden>Genera una fitxa Estàndard</button><div id="ws-results" hidden><p id="ws-version"></p><div class="mi-worksheet-downloads"></div><button type="button" id="ws-another">Genera una altra versió</button></div>`;
  const $=id=>host.querySelector('#'+id),form=host.querySelector('form');let busy=false,current=null,pending=null,urls=[],exporterPromise,extensionIssue='',varietyIssue=null,lastError=null;
  function config(){return {...(firstNumeric?{contextId:scope.id}:{}),count:+$('ws-count').value,topics:[...host.querySelectorAll('[name="ws-topic"]:checked')].map(e=>e.value),...(scope.worksheetTypes?{worksheetType:$('ws-type').value}:{percentages:[0,1,2].map(i=>+$('ws-level-'+i).value)}),order:$('ws-order').value,space:$('ws-space').value,format:$('ws-format').value,solutions:$('ws-solutions').value};}
  function clearDownloads(){urls.forEach(URL.revokeObjectURL);urls=[];$('ws-results').hidden=true;host.querySelector('.mi-worksheet-downloads').replaceChildren();}
  function clearVariety(){if(firstNumeric){varietyIssue=null;$('ws-variety').hidden=true;}}
  function showVariety(c,accepted,previous){
    varietyIssue={config:c,accepted,previous};
    const names=c.topics.map(id=>scope.topics.find(t=>t.id===id).name);
    $('ws-variety-request').textContent=`Has demanat una fitxa de ${c.count} exercicis de modalitat ${engine.worksheetTypes[c.worksheetType]} sobre ${names.length===1?'el tema':'els temes'} ${names.join(', ')}.`;
    $('ws-variety-message').textContent=accepted?'Tot i permetre exercicis semblants, no hem pogut obtenir prou variants diferents per completar la fitxa. No s’ha preparat cap document.':'No disposem de prou exercicis diferents per mantenir la varietat que recomanem.';
    $('ws-variety-explanation').textContent=accepted?'Pots provar una quantitat inferior o afegir més temes.':'Si vols continuar, alguns exercicis poden ser molt semblants entre si, encara que tinguin nombres diferents. Es mantindrà la dificultat i l’acceptació només s’aplicarà a aquesta generació.';
    const lower=engine.fixedCounts.filter(n=>n<c.count);
    $('ws-reduce-count').innerHTML='<option value="">Tria una quantitat inferior</option>'+lower.map(n=>`<option value="${n}">${n} exercicis</option>`).join('');
    $('ws-reduce-count').disabled=!lower.length;$('ws-reduce').disabled=true;
    $('ws-reduce-help').textContent=lower.length?'Comprovarem la disponibilitat abans de preparar els documents.':'5 és la quantitat mínima disponible. Pots afegir més temes.';
    $('ws-similar').hidden=accepted;$('ws-variety').hidden=false;
    $('ws-variety-title').focus();
  }
  function update(){
    const c=config();
    if(scope.worksheetTypes){$('ws-type-help').textContent={standard:'Per practicar i consolidar els continguts del curs.',extension:'Per aprofundir amb exercicis de més raonament i autonomia.'}[c.worksheetType];}else{
    const total=c.percentages.reduce((a,b)=>a+b,0);
    c.percentages.forEach((p,i)=>[...$('ws-level-'+i).options].forEach(o=>o.disabled=+o.value>engine.maximum(c.percentages,i)));
    $('ws-total').textContent=total===100?'Total: 100 % ✓':`Total: ${total} % — falta assignar un ${100-total} %`;
    $('ws-counts').textContent=total===100?engine.counts(c.count,c.percentages).map((n,i)=>`${n} ${['de dificultat baixa','de mitjana','d’alta'][i]}`).join(', '):'Completa els percentatges per veure les quantitats reals.';
    }
    let error=engine.validate(c,scope.topics);if(!error)try{engine.allocate(c,scope.topics);}catch(e){lastError=e;error=firstNumeric?'No s’ha pogut comprovar la configuració. Torna-ho a provar.':e.message;}
    const offer=!firstNumeric&&scope.worksheetTypes&&c.worksheetType==='extension'&&(extensionIssue||!scope.topics.some(t=>c.topics.includes(t.id)&&t.families.some(f=>f.challenge)));
    $('ws-standard').hidden=!offer;$('ws-standard').disabled=busy;
    if(offer&&!error)error=extensionIssue||engine.noChallengesMessage;
    $('ws-validation').textContent=error;$('ws-generate').disabled=busy||!!error;
    if(firstNumeric){$('ws-similar').disabled=busy;$('ws-add-topics').disabled=busy;$('ws-reduce').disabled=busy||!$('ws-reduce-count').value;}
    $('ws-topic-summary').textContent=`${c.topics.length} temes seleccionats`;
    const available=scope.topics.filter(t=>t.levels.length).length;$('ws-all').checked=c.topics.length===available;$('ws-all').indeterminate=c.topics.length>0&&c.topics.length<available;
    $('ws-selected').textContent=c.topics.map(id=>scope.topics.find(t=>t.id===id).name).join(' · ');
    $('ws-summary').textContent=`${scope.label||'1r d’ESO · Sentit numèric'} · ${c.count} exercicis${scope.worksheetTypes?' · Tipus de fitxa: '+engine.worksheetTypes[c.worksheetType]:''} · ${$('ws-order').selectedOptions[0].text} · Espai ${$('ws-space').selectedOptions[0].text.toLowerCase()} · ${$('ws-format').selectedOptions[0].text} · ${$('ws-solutions').selectedOptions[0].text}`;
  }
  form.addEventListener('change',e=>{extensionIssue='';lastError=null;clearVariety();if(e.target.id==='ws-all')host.querySelectorAll('[name="ws-topic"]:not(:disabled)').forEach(el=>el.checked=e.target.checked);clearDownloads();current=null;pending=null;$('ws-generate').textContent='Genera la fitxa';$('ws-status').textContent='Configuració actualitzada. Genera una fitxa amb aquests valors.';update();});
  $('ws-topics').addEventListener('keydown',e=>{if(e.key==='Escape'){$('ws-topics').open=false;$('ws-topic-summary').focus();}});
  function analytics(action,format){try{window.MIAnalytics?.track('mi/worksheet/'+action+'/'+scope.id+(format?'/'+format:''),'MI · Fitxes · '+action);}catch{}}
  function exporter(){if(!exporterPromise)exporterPromise=new Promise((resolve,reject)=>{const s=document.createElement('script');s.src='../assets/js/fitxes/export.js';s.onload=()=>resolve(window.MIWorksheetExport);s.onerror=()=>{s.remove();exporterPromise=null;reject(new Error('No s’ha pogut carregar l’exportació. Torna-ho a provar.'));};document.head.append(s);});return exporterPromise;}
  async function generate(another=false,allowSimilar=false,previousOverride){
    if(busy)return;const c={...config(),...(firstNumeric&&allowSimilar?{allowSimilar:true}:{})};if(engine.validate(c,scope.topics))return;
    lastError=null;clearVariety();
    busy=true;$('miWorksheetFields').disabled=true;$('ws-another').disabled=true;update();$('ws-status').textContent='Generant els exercicis i preparant els documents…';host.setAttribute('aria-busy','true');
    const previous=previousOverride||(another&&current?current.questions.map(q=>q.key):[]);
    clearDownloads();
    try{
      // En reintentar una exportació fallida, conservem el mateix conjunt.
      if(!pending)pending=await engine.generate(c,scope.topics,previous);
      const exp=await exporter(),files=await exp.create(pending,scope);
      current=pending;pending=null;
      files.forEach(file=>{const a=document.createElement('a'),url=URL.createObjectURL(file.blob);urls.push(url);a.href=url;a.download=file.name;a.textContent=file.label;a.addEventListener('click',()=>analytics('download',file.kind));host.querySelector('.mi-worksheet-downloads').append(a);});
      $('ws-version').textContent='Versió '+current.version+' · Pots tornar a descarregar aquests mateixos documents.';$('ws-results').hidden=false;$('ws-status').textContent=(current.notice?current.notice+' ':'')+'Fitxa preparada. Tria una descàrrega.';$('ws-generate').textContent='Genera la fitxa';analytics('generated',c.format);host.querySelector('.mi-worksheet-downloads a').focus();
    }catch(e){
      lastError=e;
      if(firstNumeric&&e.code==='INSUFFICIENT_QUOTAS'){
        $('ws-status').textContent='No s’ha preparat cap document. Tria com vols continuar.';
        showVariety(c,allowSimilar,previous);
      }else{
        if(['NO_CHALLENGES','INSUFFICIENT_EXTENSION'].includes(e.code))extensionIssue=e.message;
        $('ws-status').textContent=firstNumeric?'S’ha produït un problema tècnic en preparar la fitxa. Torna-ho a provar.':'No s’ha completat la generació: '+e.message;
      }
      $('ws-generate').textContent='Reintenta la generació';
    }
    finally{busy=false;$('miWorksheetFields').disabled=false;$('ws-another').disabled=false;host.removeAttribute('aria-busy');update();}
  }
  form.addEventListener('submit',e=>{e.preventDefault();generate(!!current);});$('ws-another').addEventListener('click',()=>generate(true));
  $('ws-standard').addEventListener('click',()=>{$('ws-type').value='standard';$('ws-type').dispatchEvent(new Event('change',{bubbles:true}));generate();});
  if(firstNumeric){
    $('ws-reduce-count').addEventListener('change',()=>{$('ws-reduce').disabled=busy||!$('ws-reduce-count').value;});
    $('ws-reduce').addEventListener('click',()=>{
      const count=+$('ws-reduce-count').value;
      if(busy||!varietyIssue||!engine.fixedCounts.includes(count)||count>=varietyIssue.config.count)return;
      $('ws-count').value=String(count);$('ws-count').dispatchEvent(new Event('change',{bubbles:true}));generate();
    });
    $('ws-add-topics').addEventListener('click',()=>{if(!busy){$('ws-topics').open=true;$('ws-topic-summary').focus();}});
    $('ws-similar').addEventListener('click',()=>{if(!busy&&varietyIssue&&!varietyIssue.accepted)generate(false,true,varietyIssue.previous);});
  }
  update();
  window.MIWorksheetUI={getCurrent:()=>current,getConfig:config,getDiagnostic:()=>lastError};
})();
