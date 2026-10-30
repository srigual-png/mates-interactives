# Revisió de dificultats — registre de continuïtat

> Actualització: els errors confirmats del punt 1 ja estan corregits. Vegeu [punt1-correccions.md](punt1-correccions.md). Les incidències i propostes següents descriuen la diagnosi anterior a aquesta correcció.
> Actualització posterior: la diagnosi dels 20 blocs, mostres B/M/A i accions necessàries són a [diagnosi-global.md](diagnosi-global.md). Aquesta pàgina conserva el registre de la primera entrega; «pendent» a la seva taula no vol dir que no s’hagi fet la diagnosi global posterior.

Data: 30 d’octubre de 2026. **Fase parcial: no s’ha revisat tota la web.**

## Abast i inventari real

S’han localitzat 20 pàgines de sentits, cinc per curs. Els exercicis són principalment scripts integrats als HTML; no hi ha un banc uniforme extern. Les ampliacions també apareixen a TOPICS dins les mateixes pàgines. L’inventari estructural reproduïble és `scripts/inventaria-dificultats.py`; el detall de temes, generadors candidats, branques explícites i scripts externs és a `inventari-estructural.json`.

El recompte de funcions NO és un recompte de famílies: hi ha embolcalls de variació, bosses i generadors base, especialment a 1r. El cens semàntic exhaustiu continua pendent. A 2n numèric s’han enumerat 192 branques de plantilla actuals (191 originals + 1 nova): 133 dels vuit temes ordinaris i 59 d’ampliació/preparació de 3r. Se n’han revisat les 16 de racionals, no les 192.

## Diagnòstic confirmat i límits

- Pràctica de 2n numèric: `state.level` 1/2 controla pistes i objectiu de ratxa (10/20). Abans no filtrava dificultat matemàtica. No s’ha reutilitzat aquest estat per classificar la tasca.
- Recorregut nou, només a racionals: selector de dificultat → llista explícita de tipus → generador amb tipus forçat → pregunta real amb `diff` → presentació i validació existents. El mode obert torna a seleccionar dins el mateix nivell quan una plantilla només admet test.
- Examen per tema: `assets/js/examen-tema.js` tenia una classificació per tipus separada dels generadors. En racionals situava 8, 13, 14 i 15 a alta, tot i que demanen comparar/ordenar o reconèixer representacions. Ara consulta la classificació revisada del generador. Conserva quotes 4/4/4, rebutja tipus desconeguts i no substitueix preguntes per un altre nivell si manca cobertura.
- Les fitxes tenen un altre mapa a `assets/js/fitxes/numeric-2eso.js`. No s’ha modificat ni el seu formulari, ni el mapa, ni l’exportació. Continuaran amb la classificació anterior fins a la fase posterior. Comparteixen les funcions matemàtiques, però forcen els tipus 1–15: no seleccionen la plantilla nova 16. La propietat addicional `diff` no altera l’adaptació, que calcula el seu propi nivell.
- Hi ha altres consumidors independents: exàmens globals integrats, cercador, pràctica oberta des de teoria i bancs de portada. La comprovació de tots els seus recorreguts encara és pendent.
- No s’ha reproduït la selecció de «9/5 a decimal» com a alta: el tipus 1 ja era baix en el mapa d’examen i de fitxes del repositori. Per tant, no s’atribueix la mostra original a un filtre trencat sense evidència. Els altres tres exemples (primer pas, comparació d’errors i disminució percentual) queden pendents d’investigar als seus temes. No s’han corregit indirectament amb aquest canvi.

## Criteris comuns

Baixa: procediment directe, estratègia evident i poques decisions. Mitjana: passos connectats, interpretació o connexió de representacions. Alta: planificar, reconstruir dades, combinar conceptes, justificar un límit o analitzar un error amb decisions rellevants. La mida dels nombres, signes, fraccions, llargada, format test i absència de pistes no determinen per si sols la dificultat. No és una puntuació mecànica. Els continguts han de correspondre al curs.

Adaptació revisada a 2n, racionals:

| Tipus | Tasca real | Nivell | Motiu |
|---|---|---|---|
| 1–4 | Conversions directes entre fracció, decimal i percentatge | Baixa | Aplicació directa |
| 9 | Identificar cinquens en una recta dividida | Baixa | Lectura directa |
| 11 | Reconèixer la notació escrita | Baixa | Identificació |
| 15 | Reconèixer el decimal periòdic exacte d’una fracció senzilla | Baixa | Divisió/reconeixement, sense estratègia nova |
| 5, 12 | Connectar tres representacions | Mitjana | Comprovar equivalències connectades |
| 6, 7, 14 | Comparar dues representacions/proporcions | Mitjana | Transformar i comparar |
| 8 | Ordenar quatre representacions | Mitjana | Coordinar comparacions; la repetició no ho fa alt |
| 10 | Escollir una representació entre dos límits | Mitjana | Dues condicions i conversió |
| 13 | Detectar una equivalència incorrecta | Mitjana | Verificar cadenes; no exigeix una justificació estratègica |
| 16, nova | Mínim d’incorporacions que supera una proporció objectiu | Alta | Model invers amb total variable i comprovació de minimalitat |

Les adaptacions i comparacions pedagògiques dels altres cursos i sentits estan pendents; no s’infereixen d’aquesta taula.

## Canvis i exemples

- Abans, ordenar 20%, 1/4, 0,3 i 2/5 podia formar part del tram alt; ara és mitjana.
- Abans, reconèixer que 1/3 = 0,333… era alta; ara és baixa.
- Convertir 9/5 a 1,8 es conserva com a baixa; no s’ha eliminat.
- Nova alta: amb 6 ciclistes entre 24 membres, quants nous membres, tots ciclistes, calen per superar estrictament el 50%? Calen 13: 19/37 > 1/2, però amb 12 s’obté 18/36 = 1/2. S’ha de canviar també el denominador.
- La nova plantilla usa totals de 20–40, ciclistes inicials de 4–9 i objectius 50/60/75%. Evita llindars ja assolits i respostes 0/1. Inclou resposta, pistes, desenvolupament i comprovació del valor anterior. La resolució algebraica es pot verificar per assaig organitzat de proporcions; no exigeix un contingut de cursos superiors.
- Selector independent al tema de racionals; `difficulty=1|2|3` també es transmet als enllaços directes d’aquest tema. `level=1|2` continua sent el suport.
- L’exercici mostrat informa de la dificultat. La pràctica i l’examen avisen que alta té una sola família. Quatre variants numèriques NO es compten com quatre famílies pedagògiques. Cal ampliar aquesta cobertura.

## Matriu per curs i sentit

«Pendent» en cobertura significa que no s’ha validat pedagògicament; no significa que no hi hagi exercicis. ND = total de famílies semàntiques encara no determinat. Temes/gen. són dades estructurals, incloses ampliacions. No s’han donat per revisats blocs a partir de proves de sintaxi.

| Curs | Sentit | Temes / funcions gen. candidates | Plantilles revisades / total | Cobertura baixa / mitjana / alta revisada | Selecció i modes verificats | Estat |
|---|---|---|---|---|---|---|
| 1eso | numeric | 13 / 33 | 0 / ND | Pendent / pendent / pendent | Pendent | Pendent |
| 1eso | mesura | 9 / 17 | 0 / ND | Pendent / pendent / pendent | Pendent | Pendent |
| 1eso | algebraic | 10 / 11 | 0 / ND | Pendent / pendent / pendent | Pendent | Pendent |
| 1eso | espacial | 12 / 21 | 0 / ND | Pendent / pendent / pendent | Pendent | Pendent |
| 1eso | estocastic | 11 / 11 | 0 / ND | Pendent / pendent / pendent | Pendent | Pendent |
| 2eso | numeric | 12 / 24 | 16 / 192 branques | Racionals: 7 / 8 / 1 famílies; resta pendent | Racionals: selector, guiat/autònom, test/oberta, enllaç directe i examen tema; resta només regressió examen tema | Parcial |
| 2eso | mesura | 11 / 22 | 0 / ND | Pendent / pendent / pendent | Pendent | Pendent |
| 2eso | algebraic | 10 / 11 | 0 / ND | Pendent / pendent / pendent | Pendent | Pendent |
| 2eso | espacial | 11 / 22 | 0 / ND | Pendent / pendent / pendent | Pendent | Pendent |
| 2eso | estocastic | 11 / 22 | 0 / ND | Pendent / pendent / pendent | Pendent | Pendent |
| 3eso | numeric | 12 / 24 | 0 / ND | Pendent / pendent / pendent | Pendent | Pendent |
| 3eso | mesura | 12 / 12 | 0 / ND | Pendent / pendent / pendent | Pendent | Pendent |
| 3eso | algebraic | 13 / 19 | 0 / ND | Pendent / pendent / pendent | Pendent | Pendent |
| 3eso | espacial | 12 / 24 | 0 / ND | Pendent / pendent / pendent | Pendent | Pendent |
| 3eso | estocastic | 12 / 35 | 0 / ND | Pendent / pendent / pendent | Pendent | Pendent |
| 4eso | numeric | 12 / 25 | 0 / ND | Pendent / pendent / pendent | Pendent | Pendent |
| 4eso | mesura | 12 / 12 | 0 / ND | Pendent / pendent / pendent | Pendent | Pendent |
| 4eso | algebraic | 12 / 24 | 0 / ND | Pendent / pendent / pendent | Pendent | Pendent |
| 4eso | espacial | 12 / 26 | 0 / ND | Pendent / pendent / pendent | Pendent | Pendent |
| 4eso | estocastic | 12 / 12 | 0 / ND | Pendent / pendent / pendent | Pendent | Pendent |

## Validació executada

- `node scripts/comprova-sintaxi-validacio.cjs`: correcte, scripts integrats dels 20 sentits.
- `node comprova-examens-tema-2eso.cjs`: correcte als vuit temes numèrics; 12 preguntes, correcció 6/2/4, resultats tot correcte/incorrecte/buit, reinici i retorn a pràctica.
- `node scripts/comprova-dificultats-racionals-2eso.cjs`: 800 variants (50 per tipus); resposta exacta única, dades finites i resolució present; en la nova alta també es comprova matemàticament el percentatge final i el valor anterior, l’acceptació d’una fracció equivalent i el rebuig d’una resposta incorrecta. 378 combinacions de totals, inicials i llindars verifiquen la fórmula del mínim estricte. 480 seleccions en totes les combinacions de dificultat × suport × test/oberta; comprovació de l’exercici mostrat, visibilitat de pistes, enllaç directe alt autònom i examen amb quotes 4/4/4, altes només tipus 16. Resultats a `resultats-racionals-2eso.json`.
- La revisió pedagògica es basa en els enunciats i decisions de cada família descrits abans, no en comprovar només l’etiqueta.
- El navegador de proves no arrencava dins el sandbox; les proves funcionals s’han executat amb el mateix Edge fora del sandbox. No s’ha publicat cap canvi.

## Pendent i següent bloc

1. Continuar 2n numèric amb **fraccions amb sentit** (15 plantilles), sense donar per tancat el sentit. Després operacions, potències, aproximacions, proporcionalitat, percentatges i recomptes; investigar els tres exemples encara pendents.
2. Ampliar alta de racionals amb famílies pedagògicament diferents; la classificació actual és coherent però la varietat alta és limitada.
3. Verificar exàmens globals/per sentit i la reutilització pel cercador/portada. La prova existent d’examen per tema no certifica aquests recorreguts.
4. Acabar el cens semàntic de totes les plantilles de la resta de blocs i ampliacions. Les branques/funcions de l’inventari són una guia estructural.
5. Revisar diverses variants i casos límit de cada família restant; comparar mostres baixa/mitjana/alta per curs i sentit.
6. Executar les regressions de cada bloc a mesura que es modifica. No s’ha executat tota la bateria de la web ni les proves de documents descarregables.
7. En la fase posterior de fitxes, substituir el mapa antic de racionals per la classificació revisada, adaptar el tipus 16 i revisar les capacitats per família. Ara hi ha una divergència documentada, no una migració completada.
