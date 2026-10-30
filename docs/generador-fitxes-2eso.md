# Fitxes descarregables del sentit numèric de 2n d’ESO

El generador de la portada de 2n reutilitza el formulari, el repartiment i els exportadors de 1r. Les dades de curs, el títol, la pantalla de portada i els noms dels fitxers ara provenen de la configuració del sentit. Les altres portades no s’han activat.

## Temes i dificultats

El catàleg es deriva de `TOPICS`, filtrant `course === '2n'` i `exam2n`. Inclou els vuit temes curriculars: nombres racionals, fraccions amb sentit, operacions amb racionals, potències, aproximacions i errors, proporcionalitat directa, percentatges i recomptes sistemàtics. Educació financera d’ampliació i els tres blocs de preparació de 3r queden fora.

Els tres nivells segueixen la classificació matemàtica per tipus del mode examen de tema. S’invoquen els generadors base amb el tipus explícit: no es consumeixen les bosses ni es canvia el mode de pràctica o el progrés. S’han comprovat els 132 tipus curriculars.

El banc de recompte té onze enunciats diferents d’alta dificultat: quatre de parelles, un de combinació prohibida, cinc de tornejos i un de nombres amb restricció. La capacitat es declara al catàleg i el motor la té en compte abans de generar. Per exemple, quinze exercicis només d’aquest tema i tots alts queden bloquejats amb el motiu visible. Les fitxes equilibrades amb els vuit temes no arriben a aquest límit.

## Redacció per al paper

- Les fraccions de persones i els problemes inversos identifiquen el grup de referència. Les raons X:Y s’expliquen amb «per cada…» i s’indica el total dels dos grups.
- Les mescles utilitzen litres de suc i d’aigua, amb les mateixes proporcions del generador.
- Els repartiments indiquen els destinataris i l’ordre dels imports en les opcions. Les taules de parelles expliquen què s’ha de completar o identificar.
- Les preguntes de recompte distingeixen ordre i repetició, codis i nombres, i partits amb o sense tornada.
- Les aproximacions distingeixen el valor exacte i l’aproximat i expliciten l’arrodoniment als límits de l’interval.
- En les potències s’explicita on va l’exponent desconegut i el moment de cada duplicació en els problemes de creixement. Els signes negatius consecutius es separen amb parèntesis quan cal.
- Quan diverses respostes serien matemàticament possibles, es mantenen les opcions que fan la pregunta unívoca: per exemple, escollir un nombre estrictament entre dos límits. Les opcions originals de les preguntes conceptuals i d’error també es conserven.
- En el tipus que analitza l’error de sumar numeradors i denominadors, la suma incorrecta es construeix a partir de les fraccions que es mostren, perquè sigui coherent encara que el generador les hagi simplificat abans. El solucionari mostra el denominador comú i el càlcul correcte.

Les instruccions del formulari, els documents i el solucionari estan en català. Els enunciats, les dades, les opcions, la numeració i les solucions provenen d’un sol conjunt per a tots dos formats.

## Notació i figures

Els exportadors compartits admeten exponents negatius, totes les xifres en superíndex, bases entre parèntesis i bases fraccionàries. Word utilitza equacions natives, també per a una potència d’una potència. En PDF es componen el text, les fraccions i els exponents sobre la mateixa font incrustada.

La recta numèrica es conserva com a figura PNG d’alta resolució, derivada al navegador de l’SVG existent i incrustada als dos formats. Inclou el 0, l’1 i els punts A–D; el text indica la divisió en cinc parts iguals. No es ressalta la resposta. La figura té text alternatiu al Word i es manté sencera amb l’exercici. El motor admet que l’adaptador prepari aquesta figura de manera asíncrona.

## Fitxers

- `2eso/sentit-numeric.html`: carrega el generador de 2n.
- `assets/js/fitxes/numeric-2eso.js`: catàleg, nivells, redacció, respostes, passos concrets i adaptació de la recta.
- `assets/js/fitxes/core.js`: capacitats finites i generadors asíncrons.
- `assets/js/fitxes/ui.js`: pantalla i resum del curs configurables.
- `assets/js/fitxes/export.js`: títols i fitxers segons el curs, figures i notació ampliada.
- `scripts/fitxes/inspect-2eso.cjs`, `test-2eso.cjs`, `verify-documents-2eso.py` i `render-word-2eso.ps1`: inspecció, proves i verificació dels documents.

No s’han afegit dependències: continuen carregant-se les biblioteques locals d’exportació només quan es genera. Es manté GitHub Pages, la generació íntegrament al navegador i l’analítica existent sense dades personals.

## Verificació

- `node scripts/fitxes/test-2eso.cjs`: 132 tipus, 24 combinacions individuals de tema/nivell, quotes i equilibri amb 10/15/25/30 exercicis i cada nivell al 100 %, capacitats impossibles, unicitat, nova versió, documents separats i noms de 2n, descàrrega, invalidació de documents antics, mòbil de 390 px, teclat i examen global de 20 preguntes.
- `node scripts/fitxes/test.cjs`: regressió del generador de 1r, incloent percentatges, formats, reintents i enunciats revisats.
- `node comprova-examens-tema-2eso.cjs`: regressió dels exàmens de tema de 2n, puntuació, reinici i retorn a pràctica.
- `verify-documents-2eso.py`: obre els paquets OOXML i els PDF, comprova tots els enunciats, opcions, passos i respostes en ordre, la figura als dos formats, l’A4, el curs i els exponents negatius natius.
- Les mostres Word s’han obert i renderitzat amb Microsoft Word; els PDF s’han renderitzat amb Poppler. S’han inspeccionat les fraccions, parèntesis, exponents, la recta numèrica i els blocs llargs.

Les mostres són a `output/fitxes-2eso/`. El conjunt de demostració selecciona deu tipus per cobrir figura, notació i enunciats llargs; el repartiment de nivells d’aquesta mostra és de cobertura i no una nova generació amb les quotes del formulari.

Límit conegut: el banc original de recompte d’alta dificultat és finit, i s’informa abans de generar. La revisió visual s’ha fet amb Edge i Word; no s’ha provat una matriu completa de navegadors, editors i lectors de pantalla. Les altres ampliacions no formen part de l’abast.
