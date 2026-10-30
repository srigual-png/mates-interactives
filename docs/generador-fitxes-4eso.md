# Fitxes del sentit numèric de 4t d’ESO

El generador de la portada de 4t reutilitza el formulari, el repartiment i els exportadors dels cursos anteriors. Es deriva dels vuit blocs curriculars de `TOPICS`, filtrant `course === '4t'` i `exam4t === true`. Les quatre ampliacions de preparació de Batxillerat no s’inclouen.

Hi ha 80 tipus en tres nivells, segons la classificació matemàtica del mode examen: conjunts numèrics, irracionals, intervals, aproximacions i errors, operacions amb reals, comptatge, Pascal i educació financera. Els generadors base reben el tipus explícit i no consumeixen les bosses de pràctica. Les opcions A i B mantenen els vuit blocs del sentit numèric i indiquen l’opció activa al resum i al títol del document.

## Redacció i solucions

- Les preguntes de simplificar i classificar tenen tant el valor com el conjunt numèric al solucionari. S’explicita la convenció de naturals positius per resoldre el cas 0.
- Els conjunts i els errors absolut i relatiu s’escriuen amb noms complets. Es mantenen els símbols matemàtics que suporta la font incrustada.
- Els intervals amb extrems decimals utilitzen punt i coma, per distingir el separador de la coma decimal. L’interval d’arrodoniment explicita la regla del 5.
- Les estimacions indiquen com arrodonir els factors; les comparacions indiquen quan es pot utilitzar calculadora.
- El model de creixement de població conserva la precisió durant els passos i arrodoneix al nombre enter d’habitants més proper al final. Els imports de creixement anual s’arrodoneixen a cèntims només al final.
- Els codis especifiquen ordre, repetició i el cas del zero inicial. Els menús identifiquen primers i segons plats i una tria de cada grup.
- Pascal explicita que les files i les posicions es numeren des de 0. Els punts entre nombres d’una fila són separadors, no productes. Les seleccions de persones no distingeixen ordre ni repeteixen membres.
- Els problemes financers distingeixen descompte efectiu, interessos i capital final, i indiquen la base sobre la qual s’aplica cada percentatge.

El banc de comptatge té 25 preguntes diferents d’alta dificultat (cinc de podi i vint de codis amb restriccions). Les peticions impossibles es bloquegen abans de generar i expliquen com ajustar-les.

## Figures i formats

La recta per situar irracionals, els intervals amb extrems oberts/tancats i els diagrames d’arbre provenen dels SVG originals. Es rasteritzen a triple resolució, mantenint la proporció i el text alternatiu de cada figura. S’incrusten a Word i PDF i es mantenen amb l’exercici.

La millora compartida de l’exportador reconeix fraccions amb numerador o denominador decimal, com `0,4/10`, sense separar la part decimal de la fracció. Word conserva equacions natives; PDF compon les arrels, fraccions i potències amb font incrustada.

Les capçaleres no mostren versió. Els peus només contenen l’adreça web i la paginació. Les versions continuen als noms dels fitxers i a les metadades.

## Verificació

- `node scripts/fitxes/test-4eso.cjs`: 80 tipus i diverses variants, 24 combinacions individuals de tema/nivell, equilibri i quotes amb 10/15/25/30 exercicis, nova versió, límit finit, figures, glifs, fraccions decimals, exportació dels 80 tipus amb solucions, quatre descàrregues, mòbil, teclat, pràctica, examen i opcions A/B.
- `verify-documents-4eso.py`: compara en ordre tot el contingut del model amb OOXML i PDF, incloent-hi opcions, passos i respostes, arrels, potències i fraccions natives, figures, A4, curs i absència de versió visible.
- `render-word-4eso.ps1`: genera els PDF de control amb Microsoft Word per a la revisió visual.
- `comprova-examens-tema-4eso.cjs`: regressió dels vuit exàmens de tema, puntuació, reinici i retorn a pràctica.

Les mostres de cobertura són a `output/fitxes-4eso/`. Cobreixen els vuit temes i les tres figures; són una selecció de tipus per revisar documents, no un exemple del repartiment de dificultats del formulari.
