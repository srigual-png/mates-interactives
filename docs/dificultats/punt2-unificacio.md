Continuació: [punt 3 en curs](punt3-revisio-pedagogica.md), amb la primera reclassificació pedagògica de 1r numèric. Les xifres d’aquesta pàgina corresponen al tancament del punt 2.

# Punt 2: unificació de la classificació web

Data: 30/10/2026. Implementació local, pendent de publicar.

La web comparteix una única classificació entre pràctica, bancs contextuals i exàmens als 20 blocs de cursos i sentits. La referència és la classificació dels exàmens després del punt 1. És una unificació tècnica; no certifica encara la dificultat pedagògica de totes les famílies.

## Contracte compartit

El mòdul assets/js/dificultat-mi.js defineix taskDifficulty (1, 2, 3 o null), taskDifficultyStatus (assigned/pending), i curriculum (curs de pàgina, curs de contingut, opció, àmbit i elegibilitat per a examen). Els camps antics diff/difficulty segueixen el valor compartit. La identitat dels bancs evita confondre tipus numèrics i plantilles contextuals.

El suport és independent: Amb pistes / Sense pistes i Suport guiat / Pràctica autònoma. Canviar el suport no canvia la dificultat matemàtica. L'opció curricular tampoc determina el nivell. Es mantenen els identificadors i paràmetres antics per compatibilitat.

Hi ha 222 entrades explícites de banc: 51 numèriques, 38 de mesura, 42 algebraiques, 42 espacials i 49 estocàstiques. Els generadors web s'anoten sense mutar els objectes originals. Els errors antics recuperables es normalitzen; quan falta la identitat necessària queden pendents. La portada també declara explícitament dificultat pendent.

## Cobertura observada

Auditoria de 231 temes, 41.580 generacions i 2.468 combinacions observades de tema/tipus. Cap incidència de cobertura ordinària ni divergència entre la classificació compartida i el motor d'examen. Les 630 combinacions pendents corresponen a ampliacions; no reben un nivell baix per defecte. És mostreig, no un cens exhaustiu de variants.

| Curs | Sentit | Temes | Tipus observats pendents |
| --- | --- | ---: | ---: |
| 1eso | numeric | 13 | 0 |
| 1eso | mesura | 9 | 0 |
| 1eso | algebraic | 10 | 11 |
| 1eso | espacial | 12 | 27 |
| 1eso | estocastic | 11 | 10 |
| 2eso | numeric | 12 | 59 |
| 2eso | mesura | 11 | 58 |
| 2eso | algebraic | 10 | 48 |
| 2eso | espacial | 11 | 0 |
| 2eso | estocastic | 11 | 49 |
| 3eso | numeric | 12 | 56 |
| 3eso | mesura | 12 | 40 |
| 3eso | algebraic | 13 | 32 |
| 3eso | espacial | 12 | 0 |
| 3eso | estocastic | 12 | 56 |
| 4eso | numeric | 12 | 40 |
| 4eso | mesura | 12 | 44 |
| 4eso | algebraic | 12 | 40 |
| 4eso | espacial | 12 | 20 |
| 4eso | estocastic | 12 | 40 |

## Validació

- scripts/comprova-punt2.cjs: 18.480 generacions, 924 presentacions de pràctica, bancs i exàmens; també opció A als dos blocs amb exclusions curriculars i portada.
- Les 19 suites d'examen existents han passat.
- Les proves del punt 1 han passat, incloses les 392 combinacions del cas de moda i el bloqueig de tipus desconeguts.
- Equivalència de motors: 20 blocs correctes.
- Presentació mòbil de racionals i ampliació: revisada visualment, sense desbordament horitzontal.
- La prova històrica de portada compara l'HTML sencer amb una còpia anterior al cercador i l'analítica: aquesta comparació ja no és compatible amb la pàgina actual. La comprovació funcional separada comprova-portada-punt2.cjs ha passat: 8.000 mostres matemàtiques, 800 exercicis consecutius, 40 generadors i quatre amplades de pantalla, sense errors.

Evidències: resultats-punt2.json, auditoria-global-mostres-punt2.json, regressions-punt2.json i punt2-presentacio.json.

## Següent fase

Revisar pedagògicament les famílies i les ampliacions pendents, amb criteris de passos, raonament, representació i contingut. La centralització conserva nivells heretats que poden requerir reassignació. Les fitxes descarregables i els seus generadors originals es mantenen per a la fase posterior acordada; no s'afirma encara consistència completa entre web i paper.
