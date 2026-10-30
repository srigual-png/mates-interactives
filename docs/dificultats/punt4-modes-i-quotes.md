# Punt 4: aplicar la classificació als modes i verificar quotes

Data: 30/10/2026. Implementació i validació prèvies a la publicació completades.

## Comportament

La pràctica dels 20 blocs disposa d’un selector independent de dificultat matemàtica: totes, baixa, mitjana o alta. Les pistes guiades/autònomes i el format test/obert continuen separats. Tant els generadors ordinaris com els generadors de pràctica oberta i les seves bosses de variants es filtren amb miTaskDifficulty. Si no es troba una variant del nivell i format demanats, s’ofereix un avís i no es mostra una pregunta d’un altre nivell ni la pregunta anterior.

Els exàmens per tema mantenen 12 preguntes i les quotes pròpies del motor, ara consultables amb miTopicExam.getPlan i visibles a la interfície. El selector de pràctica no altera aquestes quotes. La reclassificació de 1r numèric continua amb les quotes adaptades i l’avís d’alta limitada a una família per tema.

Els exàmens globals ofereixen:

- Barreja lliure, opció inicial que conserva la selecció anterior i declara que no fixa quotes de dificultat.
- Equilibrada: 7 preguntes baixes, 7 mitjanes i 6 altes.
- Un sol nivell: 20 preguntes del nivell seleccionat.

En les opcions amb quotes, s’inclou almenys una pregunta de cada tema seleccionat, es respecten els temes elegibles i l’opció A/B, es conserven els validadors i es comproven vint preguntes diferents. El planificador reparteix primer la cobertura mínima de temes entre nivells disponibles; després completa les quotes i afavoreix varietat de tipus i els problemes contextuals compatibles. Les quotes són de dificultat; no es promet una quota fixa de formats oberts/test en aquests nous perfils.

La dificultat de cada pregunta i les quotes reals es mostren durant el global. Els casos sense cobertura bloquegen la preparació, amb explicació, i buiden preguntes, respostes, puntuació i metadades de la sessió anterior. No es redistribueixen les quotes sense informar ni es reetiqueten preguntes.

La generació és acotada: si el primer banc mostrejat no conté prou variants diferents per a una quota —especialment vint altes d’un sol tema— es continua generant fins a completar-la o arribar al límit. Arribar al límit es comunica com una selecció que no s’ha pogut obtenir, no com una certificació d’inexistència de la família.

## Resultats verificats

- 53 casos independents del planificador: quotes, cobertura de temes, insuficiència de variants, preguntes sense classificar, combinacions incompatibles i absència de mutacions del banc original.
- 702 exercicis mostrats al nivell sol·licitat, combinant tres dificultats, dos suports i dos formats al primer tema de cadascun dels 20 blocs. Sis configuracions d’alta oberta de 1r algebraic, espacial i estocàstic queden bloquejades explícitament perquè el banc corresponent no proporciona aquest nivell.
- 161 exàmens per tema generats, tots amb 12 preguntes i les quotes declarades.
- 102 preparacions globals: les cinc opcions als 20 blocs i l’equilibrada de 4t mesura/espacial en opció A. 101 es generen amb les quotes correctes; una es bloqueja justificadament.
- El bloqueig real és només alta seleccionant tots els temes de 1r mesura: Estimació no disposa de cobertura alta. Els altres temes no el substitueixen silenciosament.
- S’han injectat buits per comprovar que no queda activa una pregunta ni un examen antic.
- Enllaços directes dels 20 blocs verificats: nivell baix des de la primera pregunta mostrada i suport autònom, sense una pregunta inicial d’un altre nivell. Retorn a configuració després d’un bloqueig preservant suport i dificultat.
- Vint altes d’un sol tema verificades a fraccions de 1r i racionals de 2n, amb correcció real de la primera resposta; global equilibrat de 2n estocàstic també corregit.
- Les 19 suites existents d’examen han passat. La primera passada simultània amb la validació massiva i la còpia del repositori va superar el temps límit en tres suites sense errors d’asserció; la repetició amb més marge ha finalitzat correctament. Es conserven tots dos registres.
- Les proves de motors dels 20 blocs mantenen les respostes equivalents, una sola puntuació/registre per resposta i la correcció dels exàmens de tema.
- Presentació mòbil del selector global revisada a 390 × 844, sense desbordament.

| Curs | Sentit | Exercicis filtrats mostrats | Exàmens de tema | Perfils globals generats |
| --- | --- | ---: | ---: | ---: |
| 1eso | numeric | 36 | 12 | 5/5 |
| 1eso | mesura | 36 | 8 | 4/5 |
| 1eso | algebraic | 30 | 6 | 5/5 |
| 1eso | espacial | 30 | 7 | 5/5 |
| 1eso | estocastic | 30 | 9 | 5/5 |
| 2eso | numeric | 36 | 8 | 5/5 |
| 2eso | mesura | 36 | 7 | 5/5 |
| 2eso | algebraic | 36 | 7 | 5/5 |
| 2eso | espacial | 36 | 7 | 5/5 |
| 2eso | estocastic | 36 | 7 | 5/5 |
| 3eso | numeric | 36 | 8 | 5/5 |
| 3eso | mesura | 36 | 8 | 5/5 |
| 3eso | algebraic | 36 | 9 | 5/5 |
| 3eso | espacial | 36 | 8 | 5/5 |
| 3eso | estocastic | 36 | 8 | 5/5 |
| 4eso | numeric | 36 | 8 | 5/5 |
| 4eso | mesura | 36 | 8 | 5/5 |
| 4eso | algebraic | 36 | 8 | 5/5 |
| 4eso | espacial | 36 | 10 | 5/5 |
| 4eso | estocastic | 36 | 8 | 5/5 |

S’han conservat els recorreguts de portada i cercador: els seus enllaços de pràctica/examen continuen obrint els mateixos motors. Les fitxes descarregables mantenen el seu formulari i exportació per a la fase posterior acordada.

## Fitxers i evidències

La selecció de quotes és a assets/js/dificultat-quotes.js i la integració dels modes a assets/js/dificultat-modes.js. Els 20 HTML carreguen aquests mòduls després del motor de tema. assets/js/examen-tema.js exposa les quotes de tema. assets/js/dificultat-mi.js conserva la classificació compartida i protegeix la selecció dels enllaços directes abans d’inicialitzar-se tots els controls.

Proves: scripts/comprova-quotes.cjs, scripts/comprova-punt4.cjs, scripts/comprova-punt4-variants.cjs, scripts/comprova-punt4-enllacos.cjs i les suites existents. Evidències: resultats-punt4.json, punt4-variants-i-correccio.json, punt4-enllacos-directes.json, regressions-punt4.json i regressions-punt4-temps-limit.json.

## Límit de l’entrega

El punt 4 aplica i verifica el contracte de classificació actual. No converteix en revisió pedagògica completa els blocs encara pendents del punt 3: s’ha revisat 1r numèric, i es manté pendent la revisió pedagògica detallada de la resta. Les ampliacions sense classificació suficient continuen explícites. La publicació correspon als canvis implementats i validats, amb aquests límits.
