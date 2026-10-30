# Fitxes del sentit numèric de 3r d’ESO

El generador reutilitza el formulari i els exportadors de 1r i 2n. Inclou els vuit blocs curriculars de `TOPICS` (`course === '3r'`, `exam3r`), amb 113 tipus distribuïts en tres dificultats segons l’examen de tema. Les ampliacions de preparació de 4t no s’inclouen.

Els generadors base reben el tipus explícit i no consumeixen les bosses de pràctica. La selecció, les quotes, la distribució equilibrada, les versions alternatives i els formats Word/PDF funcionen igual que als altres cursos.

## Adaptació al paper

- Els decimals periòdics s’escriuen amb el període entre parèntesis. Cada pregunta d’aquest bloc explica la convenció amb `0,1(6) = 0,1666…`, també utilitzada a les opcions i al solucionari.
- Les taules de proporcionalitat es transcriuen en dues files etiquetades amb separadors entre columnes. S’explica que cada columna forma una parella (x, y).
- Els intervals conserven el dibuix original, rasteritzat a alta resolució i incrustat als dos formats. S’explica el significat dels cercles plens i buits.
- Els conjunts numèrics s’escriuen amb els noms complets per garantir-ne la lectura amb la font incrustada al PDF. Les inclusions i pertinences s’expressen amb paraules.
- Els problemes expliciten el total de referència, la repetició de xifres, l’ordre de les eleccions, el nombre de plats i els partits sense tornada.
- La pregunta d’ordre de magnitud explicita la convenció que utilitza el catàleg: el factor 10^n de la forma normalitzada.
- Les capçaleres no mostren cap versió. Els peus només contenen l’adreça web i la paginació. La versió es conserva als noms dels fitxers i a les metadades.

El banc de recompte té 24 enunciats diferents d’alta dificultat. El motor bloqueja una petició superior abans de generar i proposa reduir la quantitat o afegir temes.

## Verificació

`node scripts/fitxes/test-3eso.cjs` comprova els 113 tipus i diverses variants, 24 combinacions individuals de tema/nivell, quotes i equilibri amb 10/15/25/30 preguntes, versions alternatives, capacitat finita, descàrregues, mòbil, teclat i compatibilitat amb pràctica i examen. També comprova els glifs de tota la mostra i exporta els 113 tipus a PDF amb solucions.

`verify-documents-3eso.py` compara tots els enunciats, opcions, passos i respostes del model amb els Word i PDF, incloent-hi ordre, figura, equacions, curs i absència de versió visible. `render-word-3eso.ps1` genera PDF de control amb Microsoft Word. Les mostres de cobertura són a `output/fitxes-3eso/`.
