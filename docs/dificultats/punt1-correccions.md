Estat posterior: [punt 2 implementat i validat](punt2-unificacio.md). Les dades següents es conserven com a registre de la fase anterior.

# Punt 1 — Errors de resposta i mapes de cobertura

30 d’octubre de 2026. **Implementats els errors confirmats de la diagnosi**: una correcció de resposta/variant i 21 tipus amb classificació absent. No és una certificació matemàtica exhaustiva de totes les plantilles de la web.

## Error de moda corregit

A `1eso/sentit-estocastic.html`, el patró obert `ST_OPEN_PATTERNS:C9` mantenia un únic valor com a resposta fins i tot quan les dades aleatòries produïen dues modes. Es conserva la finalitat del patró: trobar una moda única de dificultat baixa, amb sis dades.

Ara es generen tres aparicions de la moda i tres altres valors diferents entre ells i de la moda. Això garanteix una freqüència màxima única. L’enunciat, la resposta numèrica, el validador d’equivalents i el solucionari continuen sent coherents. No s’accepten només algunes de les modes d’un conjunt bimodal: el generador ja no crea aquest conjunt per a C9. El patró específic bimodal C11 es conserva i continua admetent «2 i 3».

- Abans, la seqüència aleatòria [2,3,3,3] produïa una permutació de 2,2,2,3,3,3 i el solucionari només admetia 2.
- Després, el mateix intent de regressió genera una mostra amb moda única 2.
- `cas-limit-moda-1eso.json` conserva l’evidència original; `cas-limit-moda-1eso-corregit.json` registra la correcció.

## Cobertura completada

Els canvis es limiten als 21 tipus que retornaven nivell 0. Els nous nivells es basen en les tasques observades a la diagnosi: baixa per reconeixement/conversió directa; mitjana per connexió de passos, inversió de fórmula o interpretació. A semblança de 4t, el tipus 11 és baixa: només cal reconèixer que una raó entre costats es conserva quan tots els costats es multipliquen pel mateix factor.

| Curs / sentit | Tipus abans sense nivell | Nova baixa | Nova mitjana | Total |
|---|---|---|---|---:|
| 1r / estocàstic | mediana:2 | 2 | — | 1 |
| 2n / mesura | perimetres:17–18 | — | 17, 18 | 2 |
| 3r / numèric | proporcionalitat3r:16; recomptes3r:17 | proporcionalitat3r:16 | recomptes3r:17 | 2 |
| 3r / mesura | tipus 10 dels vuit temes | volum, precisio | arees, semblanca, tales, pitagores, piramides, errorMesura | 8 |
| 4t / mesura | tipus 11 dels vuit temes | angles4t, radians4t, pitagores4t, semblancaRaons4t, trigRaons4t | resolTriangles4t, mesuresIndirectes4t, precisioError4t | 8 |

Detall traçable dels 21 canvis:

| Curs / sentit | Tema:tipus | Abans | Ara |
|---|---|---|---|
| 1eso/estocastic | mediana:2 | Sense nivell (0) | Baixa |
| 2eso/mesura | perimetres:17 | Sense nivell (0) | Mitjana |
| 2eso/mesura | perimetres:18 | Sense nivell (0) | Mitjana |
| 3eso/numeric | proporcionalitat3r:16 | Sense nivell (0) | Baixa |
| 3eso/numeric | recomptes3r:17 | Sense nivell (0) | Mitjana |
| 3eso/mesura | volum:10 | Sense nivell (0) | Baixa |
| 3eso/mesura | precisio:10 | Sense nivell (0) | Baixa |
| 3eso/mesura | arees:10 | Sense nivell (0) | Mitjana |
| 3eso/mesura | semblanca:10 | Sense nivell (0) | Mitjana |
| 3eso/mesura | tales:10 | Sense nivell (0) | Mitjana |
| 3eso/mesura | pitagores:10 | Sense nivell (0) | Mitjana |
| 3eso/mesura | piramides:10 | Sense nivell (0) | Mitjana |
| 3eso/mesura | errorMesura:10 | Sense nivell (0) | Mitjana |
| 4eso/mesura | angles4t:11 | Sense nivell (0) | Baixa |
| 4eso/mesura | radians4t:11 | Sense nivell (0) | Baixa |
| 4eso/mesura | pitagores4t:11 | Sense nivell (0) | Baixa |
| 4eso/mesura | semblancaRaons4t:11 | Sense nivell (0) | Baixa |
| 4eso/mesura | trigRaons4t:11 | Sense nivell (0) | Baixa |
| 4eso/mesura | resolTriangles4t:11 | Sense nivell (0) | Mitjana |
| 4eso/mesura | mesuresIndirectes4t:11 | Sense nivell (0) | Mitjana |
| 4eso/mesura | precisioError4t:11 | Sense nivell (0) | Mitjana |

## Protecció contra noves omissions

A `assets/js/examen-tema.js`, els quinze mapes explícits utilitzen una consulta que exigeix **exactament un nivell** per tipus. Un tipus absent o repetit en dos nivells provoca un error explícit. La construcció comprova el nivell abans que els altres filtres de validesa de variant el puguin ocultar. Es respecten les exclusions expresses existents (`examTypes` i la pregunta ambigua d’experiments de 2n).

Si això passa, la pantalla indica que no es pot preparar l’examen i es descarta qualsevol sessió anterior. No es substitueix la pregunta per un altre nivell. `miTopicExam.getDifficulty` permet comprovar la classificació que fa servir realment el motor, sense copiar-ne la lògica al test.

La protecció afecta els mapes explícits. El sistema antic de metadades/regles de 1r que no usa aquests mapes conserva el seu comportament: la unificació d’aquestes fonts és el punt 2, pendent.

## Verificació executada

- `node scripts/comprova-punt1.cjs`: correcte. 500 seleccions per cadascun dels 20 temes afectats; 30 generacions dirigides per tipus corregit (**630** en total); inclusió real de cadascun dels 21 tipus en la seva quota d’examen; quotes 4/4/4; rebuig de tipus desconegut, avís visible i eliminació de la sessió anterior.
- La mateixa prova calcula les freqüències de les dades de C9 i verifica la resposta i el solucionari en **392 combinacions**: set modes possibles × totes les ternes de valors secundaris diferents. També comprova l’acceptació d’una fracció equivalent i el rebuig dels altres valors presents. C11 continua funcionant. La validesa no es dedueix només d’una etiqueta.
- `node scripts/reprodueix-cas-limit-moda.cjs`: correcte; ara és una regressió de l’error original i desa l’evidència corregida per separat.
- `node scripts/audita-dificultats-global.cjs all punt1`: auditoria posterior dels **20 blocs i 231 temes**, amb 180 generacions per tema (**41.580**), sense incidències de generació/estructura/classificació en les mostres ni errors de construcció dels 159 exàmens elegibles de la configuració inicial. **21 tipus sense nivell abans → 0 després.** És mostreig, no una demostració que no pugui existir cap tipus no mostrejat.
- `node scripts/executa-regressions-dificultats.cjs punt1`: **cinc suites existents superades**: estocàstic 1r, mesura 2n, numèric 3r, mesura 3r i mesura 4t. Comproven correcció, puntuació, respostes buides, reinici i retorn a pràctica. Per fer reproduïbles les proves locals, el carregador de proves bloqueja HTTP/HTTPS extern; els continguts es llegeixen de `file://`. No s’altera la web.
- `node scripts/comprova-validacio-motors.cjs`: superada als **20 blocs**, incloses respostes equivalents i absència de doble puntuació/registre en els controladors provats.
- `node scripts/comprova-sintaxi-validacio.cjs`: correcte als scripts integrats dels 20 sentits. Sintaxi dels scripts nous/modificats de comprovació també verificada.

Evidències: `resultats-punt1.json`, `auditoria-global-mostres-punt1.json`, `regressions-punt1.json` i `scripts/resultats-validacio-motors.json`. Els fitxers de diagnosi inicial i els temps límit antics es conserven com a registre històric. En aquesta passada, les cinc suites afectades han finalitzat correctament, inclosa mesura de 4t.

## Efecte sobre fitxes i abast pendent

No s’han modificat el formulari, el mapa propi, Word ni PDF del generador de fitxes. El canvi de C9 és al banc obert de 1r estocàstic; les fitxes numèriques no el consumeixen. La correcció de cobertura és al motor d’examen de tema, no als seus mapes de fitxes. Les divergències ja documentades entre fonts de dificultat continuen pendents de la unificació.

Continuen pendents les reclassificacions pedagògiques generals, la varietat/cobertura alta després de reclassificar, les quotes globals compartides i la comprovació matemàtica exhaustiva de totes les altres solucions. No s’ha publicat cap canvi. El següent bloc de treball és el **punt 2: unificar la classificació separant tasca, suport i opció curricular**.
