# Mesura del temps — Informe final d’auditoria

**Curs i sentit:** 1r d’ESO · Sentit de la mesura  
**Base revisada:** main a bd1fd1f1fed800f8a10d449db35e1fb594d4dcd2 (PR #26 fusionada)  
**Tema i pràctica:** temps · 1eso/sentit-mesura.html  
**Data:** 2026-11-13

## Resum

El tema queda classificat en **10 famílies: 2 N1, 7 N2 i 1 N3**. Els tipus 1 i 5 del generador principal són variants d’una mateixa família d’equivalències. S’hi incorporen conversions multietapa dins d’aquesta família i dos procediments absents: triar una unitat adequada i comparar durades mixtes. Les hores i durades que travessen mitjanit identifiquen explícitament l’endemà.

## Inventari de rutes auditades

- genTempsRaw() conté tipus 1–5: conversions/equivalències, hora final, durada entre hores, descomposició en base 60 i equivalències fixes. Els tipus 1 i 5 comparteixen el coneixement de relacions entre unitats i s’agrupen com a variants d’una família.
- MIFirstMeasureTasks conté transbordament-invers (1001) i les tasques de reconstrucció de l’inici (1002), suma d’activitats i pauses (1003), detecció de base 100 (1004), tria d’unitat (1005) i comparació de durades (1006). Les tasques 1002–1004 ja existien, però no tenien identificadors estables de família ni nivells coherents al classificador.
- Banc contextual: T01–T04 pertanyen a temps i són N2; T04 explicita l’endemà. T05 calcula l’angle de l’agulla dels minuts i continua a mesurament. El banc de raonament inclou el transbordament N3.
- La pràctica guiada/autònoma i els exàmens reutilitzen el classificador i el generador de tema. La rotació anti-repetició compara la família real, també entre els tipus 1 i 5. El pla d’examen es calcula des del catàleg de famílies.

## Famílies definitives i reclassificació

| Identificador | Família | Generadors i variants | Nivell anterior | Final | Justificació |
|---|---|---|---|---|---|
| equivalencies-temporals | Equivalències i conversions temporals | 1, 5 | N1 (tipus 1 i 5 separats) | N1 | Les conversions directes/inverses, les equivalències fixes i la conversió multietapa apliquen relacions entre unitats. La tria de la unitat s’aïlla com a procediment propi. |
| seleccionar-unitat-temporal | Escollir la unitat adequada | 1005 | No existia | N1 | Reconeixement contextual de la mida de les unitats sense càlcul de conversió. |
| hora-final | Calcular l’hora final | 2 | N2 (tipus 2) | N2 | Suma hores i minuts, reagrupa cada 60 minuts i interpreta el canvi de dia quan s’indica. |
| durada-entre-hores | Calcular la durada entre dues hores | 3; T01/T04 comparteixen variants | N2 (tipus 3) | N2 | Resta hores o descompon el càlcul a mitjanit; l’endemà s’indica explícitament. |
| descompondre-durades | Descompondre durades en base sexagesimal | 4 | N1 al mapa; un fallback antic la marcava N3 | N2 | La divisió entera i el residu en base 60 exigeixen reagrupar. És intermedi, sense raonament N3. |
| reconstruir-hora-inicial | Reconstruir l’hora inicial | 1002 | Sense família; fallback N1 | N2 | Resta inversa amb final l’endemà fixat. Procediment directe de diversos passos, adequat a N2. |
| operar-durades-i-pausas | Sumar durades i pauses | 1003; T03 suma blocs, T01 resta parada | Sense família; fallback N1 | N2 | Combina diversos intervals, reagrupa minuts i incorpora pauses. |
| comparar-durades | Comparar durades mixtes | 1006 | No existia | N2 | Converteix tres durades mixtes a una unitat comuna i les compara. |
| detectar-error-base-sexagesimal | Detectar l’error de base 100 | 1004 | Sense família; fallback N1 | N2 | Detecta la concatenació decimal i corregeix amb factor 60; justificació breu, nivell N2. |
| transbordament-invers | Reconstruir un transbordament amb termini | 1001 | N3 (tipus 1001) | N3 | Coordina freqüències, trajecte, caminada, espera i termini per trobar i justificar l’última sortida viable. |

**Distribució:** N1 = 2; N2 = 7; N3 = 1. No es fragmenten famílies per valors, unitats o contextos.

## Cobertura curricular i mancances

| Àmbit | Cobertura | Límit explícit |
|---|---|---|
| Unitats | s, min, h, dia, setmana, mes i any; equivalències, conversions directes/inverses i multietapa; mitja hora i quart d’hora | L’any a dies s’assumeix no bixest. No es converteixen mesos a dies perquè els mesos no tenen tots la mateixa durada. |
| Sexagesimal | descomposició h/min i min/s; suma amb pauses; correcció base 100; comparació a minuts | La resta d’una parada és al banc contextual T01 i no s’ha duplicat com una altra família. |
| Horaris | hora final, durada entre hores, inici reconstruït, canvi de dia i transbordament amb termini | No es modelen canvis d’horari d’estiu ni s’infereixen sense dades. |
| Selecció i comparació | unitat adequada en contextos quotidians; comparació de tres durades mixtes | No es modelen durades imprecises ni incoherències de calendari. |

Les famílies noves cobreixen mancances observades: triar unitat i comparar/ordenar durades. El total de 10 és inferior a la xifra orientativa de 15, però representa els procediments diferenciats sense fragmentació artificial. No s’han introduït conversions amb mesos de durada variable, anys bixests o canvis d’horari.

## Exemples resolts

### Equivalències i conversions temporals · N1

**Exemple 1.** Converteix 3 setmanes a dies  
**Resposta:** 21 dies

- Factor entre les unitats: 7
- 3 × 7 = 21
- ✅ 21 dies

**Exemple 2.** Converteix 2 dies a segons  
**Resposta:** 172800 segons

- Factor entre les unitats: 24 × 60 × 60 = 86400
- 2 dies × 24 = 48 hores
- 48 hores × 60 = 2880 minuts
- 2880 minuts × 60 = 172800 segons
- ✅ 172800 segons

**Exemple 3.** Quants minuts tenen 2 hores?  
**Resposta:** 120 min

- Cada hora té 60 minuts
- 2 × 60 = 120 minuts
- ✅ 120 min

**Errors freqüents:** Invertir multiplicació i divisió; usar base decimal en lloc de 60; ometre una etapa.

### Escollir la unitat adequada · N1

**Exemple 1.** Per expressar el temps que dura una pausa molt breu (aproximadament 20), quina unitat és la més adequada?  
**Resposta:** segons

- La durada aproximada és de 20 segons.
- Per tant, la unitat més adequada és segons.

**Exemple 2.** Per expressar el temps que dura una pel·lícula (aproximadament 2), quina unitat és la més adequada?  
**Resposta:** hores

- La durada aproximada és de 2 hores.
- Per tant, la unitat més adequada és hores.

**Exemple 3.** Per expressar el temps que dura un cap de setmana (aproximadament 2), quina unitat és la més adequada?  
**Resposta:** dies

- La durada aproximada és de 2 dies.
- Per tant, la unitat més adequada és dies.

**Errors freqüents:** Escollir una unitat massa petita o massa gran sense mirar la durada habitual.

### Calcular l’hora final · N2

**Exemple 1.** Una pel·lícula comença a les 15:00 h i dura 50 min. A quina hora acaba?  
**Resposta:** 15:50 h

- Inici: 15:00 h
- Durada: 50 min
- Hora final: 15:50 h
- ✅ 15:50 h

**Exemple 2.** Un partit comença a les 16:40 h i dura 40 min. A quina hora acaba?  
**Resposta:** 17:20 h

- Inici: 16:40 h
- Durada: 40 min
- Hora final: 17:20 h
- ✅ 17:20 h

**Exemple 3.** Una reunió comença a les 17:20 h i dura 20 min. A quina hora acaba?  
**Resposta:** 17:40 h

- Inici: 17:20 h
- Durada: 20 min
- Hora final: 17:40 h
- ✅ 17:40 h

**Errors freqüents:** No reagrupar cada 60 minuts o oblidar indicar el canvi de dia.

### Calcular la durada entre dues hores · N2

**Exemple 1.** Quant dura una activitat que comença a les 14:00 h i acaba a les 14:45 h?  
**Resposta:** 45 min

- Inici: 14:00 h
- Final: 14:45 h
- Diferència total: 45 min
- ✅ Durada = 45 min

**Exemple 2.** Quant dura una sessió d’estudi que comença a les 15:40 h i acaba a les 16:30 h?  
**Resposta:** 50 min

- Inici: 15:40 h
- Final: 16:30 h
- Diferència total: 50 min
- ✅ Durada = 50 min

**Exemple 3.** Quant dura una visita que comença a les 16:20 h i acaba a les 17:10 h?  
**Resposta:** 50 min

- Inici: 16:20 h
- Final: 17:10 h
- Diferència total: 50 min
- ✅ Durada = 50 min

**Errors freqüents:** Restar les hores del rellotge sense afegir el tram després de mitjanit.

### Descompondre durades en base sexagesimal · N2

**Exemple 1.** Expressa 310 minuts en hores i minuts  
**Resposta:** 5 h 10 min

- 310 ÷ 60 = 5 hores completes i sobren 10 minuts
- ✅ 5 h 10 min

**Exemple 2.** Expressa 345 minuts en hores i minuts  
**Resposta:** 5 h 45 min

- 345 ÷ 60 = 5 hores completes i sobren 45 minuts
- ✅ 5 h 45 min

**Exemple 3.** Expressa 385 minuts en hores i minuts  
**Resposta:** 6 h 25 min

- 385 ÷ 60 = 6 hores completes i sobren 25 minuts
- ✅ 6 h 25 min

**Errors freqüents:** Fer servir quocient decimal en lloc de divisió entera amb residu.

### Reconstruir l’hora inicial · N2

**Exemple 1.** Una activitat acaba a les 00:15 h de l’endemà i ha durat 2 h 35 min. A quants minuts després de les 00:00 del dia anterior havia començat?  
**Resposta:** 1300

- Final: 1440 + 15 = 1455 min des de les 00:00 del dia inicial.
- Inici: 1455 − 155 = 1300 min.
- Això correspon a 21:40 h.

**Exemple 2.** Una activitat acaba a les 01:30 h de l’endemà i ha durat 3 h 50 min. A quants minuts després de les 00:00 del dia anterior havia començat?  
**Resposta:** 1300

- Final: 1440 + 90 = 1530 min des de les 00:00 del dia inicial.
- Inici: 1530 − 230 = 1300 min.
- Això correspon a 21:40 h.

**Exemple 3.** Una activitat acaba a les 01:00 h de l’endemà i ha durat 3 h 10 min. A quants minuts després de les 00:00 del dia anterior havia començat?  
**Resposta:** 1310

- Final: 1440 + 60 = 1500 min des de les 00:00 del dia inicial.
- Inici: 1500 − 190 = 1310 min.
- Això correspon a 21:50 h.

**Errors freqüents:** No situar l’hora final al dia següent abans de restar.

### Sumar durades i pauses · N2

**Exemple 1.** Una jornada té tres activitats de 50 min, 1 h 20 min, 25 min i dues pauses de 5 i 20 min entre elles. Quant temps transcorre des de l’inici de la primera activitat fins al final de l’última, incloses les pauses? Dona la resposta en minuts.  
**Resposta:** 180

- Activitats: 50 + 80 + 25 = 155 min.
- Pauses: 5 + 20 = 25 min.
- Total: 155 + 25 = 180 min = 3 h 0 min.

**Exemple 2.** Una jornada té tres activitats de 50 min, 1 h 30 min, 1 h 0 min i dues pauses de 5 i 15 min entre elles. Quant temps transcorre des de l’inici de la primera activitat fins al final de l’última, incloses les pauses? Dona la resposta en minuts.  
**Resposta:** 220

- Activitats: 50 + 90 + 60 = 200 min.
- Pauses: 5 + 15 = 20 min.
- Total: 200 + 20 = 220 min = 3 h 40 min.

**Exemple 3.** Una jornada té tres activitats de 50 min, 1 h 30 min, 50 min i dues pauses de 10 i 10 min entre elles. Quant temps transcorre des de l’inici de la primera activitat fins al final de l’última, incloses les pauses? Dona la resposta en minuts.  
**Resposta:** 210

- Activitats: 50 + 90 + 50 = 190 min.
- Pauses: 10 + 10 = 20 min.
- Total: 190 + 20 = 210 min = 3 h 30 min.

**Errors freqüents:** Oblidar pauses o sumar hores i minuts en base 10.

### Comparar durades mixtes · N2

**Exemple 1.** Tres activitats tenen les durades A = 1 h 39 min, B = 3 h 1 min i C = 38 min. Quina és la més llarga? Respon en minuts.  
**Resposta:** 181

- A = 99 min; B = 181 min; C = 38 min.
- La durada més gran és B: 181 min.

**Exemple 2.** Tres activitats tenen les durades A = 1 h 39 min, B = 3 h 20 min i C = 2 h 59 min. Quina és la més llarga? Respon en minuts.  
**Resposta:** 200

- A = 99 min; B = 200 min; C = 179 min.
- La durada més gran és B: 200 min.

**Exemple 3.** Tres activitats tenen les durades A = 1 h 39 min, B = 3 h 38 min i C = 1 h 54 min. Quina és la més llarga? Respon en minuts.  
**Resposta:** 218

- A = 99 min; B = 218 min; C = 114 min.
- La durada més gran és B: 218 min.

**Errors freqüents:** Comparar només les hores o només els minuts sense unitat comuna.

### Detectar l’error de base 100 · N2

**Exemple 1.** Un alumne escriu que 2 h 45 min són 245 min perquè tracta les hores com si fossin desenes de minuts. Quants minuts són realment?  
**Resposta:** 165

- 2 h = 2 × 60 = 120 min.
- 120 + 45 = 165 min.
- El valor 245 min prové de fer servir base 100.

**Exemple 2.** Un alumne escriu que 2 h 50 min són 250 min perquè tracta les hores com si fossin desenes de minuts. Quants minuts són realment?  
**Resposta:** 170

- 2 h = 2 × 60 = 120 min.
- 120 + 50 = 170 min.
- El valor 250 min prové de fer servir base 100.

**Exemple 3.** Un alumne escriu que 2 h 54 min són 254 min perquè tracta les hores com si fossin desenes de minuts. Quants minuts són realment?  
**Resposta:** 174

- 2 h = 2 × 60 = 120 min.
- 120 + 54 = 174 min.
- El valor 254 min prové de fer servir base 100.

**Errors freqüents:** Acceptar la concatenació, per exemple 2 h 45 min = 245 min.

### Reconstruir un transbordament amb termini · N3

**Exemple 1.** L’autobús A surt a les 8:00 i cada 12 min; triga 14 min fins al transbordament. Cal caminar 7 min. B surt d’allà a les 8:02 i cada 25 min; el segon trajecte dura 11 min. Has d’arribar com a molt a les 10:21. Quants minuts després de les 8:00 surt l’últim A que et serveix? Es pot pujar a B just a l’hora de sortida.  
**Resposta:** 96

- Per a cada A comprova la primera sortida de B posterior o igual a l’hora d’arribar-hi caminant.
- L’últim itinerari vàlid és A 9:36, B 10:07, arribada 10:18.
- El següent A no arriba a temps amb cap B. Resposta: 96 min.

**Exemple 2.** L’autobús A surt a les 8:00 i cada 12 min; triga 14 min fins al transbordament. Cal caminar 6 min. B surt d’allà a les 8:07 i cada 25 min; el segon trajecte dura 18 min. Has d’arribar com a molt a les 9:52. Quants minuts després de les 8:00 surt l’últim A que et serveix? Es pot pujar a B just a l’hora de sortida.  
**Resposta:** 60

- Per a cada A comprova la primera sortida de B posterior o igual a l’hora d’arribar-hi caminant.
- L’últim itinerari vàlid és A 9:00, B 9:22, arribada 9:40.
- El següent A no arriba a temps amb cap B. Resposta: 60 min.

**Exemple 3.** L’autobús A surt a les 8:00 i cada 12 min; triga 14 min fins al transbordament. Cal caminar 4 min. B surt d’allà a les 8:05 i cada 25 min; el segon trajecte dura 16 min. Has d’arribar com a molt a les 10:14. Quants minuts després de les 8:00 surt l’últim A que et serveix? Es pot pujar a B just a l’hora de sortida.  
**Resposta:** 84

- Per a cada A comprova la primera sortida de B posterior o igual a l’hora d’arribar-hi caminant.
- L’últim itinerari vàlid és A 9:24, B 9:45, arribada 10:01.
- El següent A no arriba a temps amb cap B. Resposta: 84 min.

**Errors freqüents:** No comprovar l’arribada a B i el termini; confondre primera i última sortida viable.

## Validacions executades

### Test matemàtic: comprova-temps-families-1eso.cjs

**Superat:** 2.750 mostres (1.250 del generador principal, 250 per tipus 1–5; 1.500 del catàleg, 250 per cadascuna de sis tasques). En aquest lot es van generar 48 converses multietapa.

Oracles independents comproven factors 60/24/7/12/3.600, conversions inverses i decimals, singular/plural, hora final i durada nocturna, descomposició base 60, reconstrucció de l’inici, suma de durades i pauses, correcció base 100, comparació i tria d’unitat, unicitat de la sortida de transbordament, metadades, nivells i distractors.

### Test integral Playwright: comprova-temps-1eso.cjs

**Superat amb Chrome:** 160 exercicis sense repetir família en torns consecutius i amb totes les 10 famílies representades; variants nocturnes explícites; rotació després de 25 respostes errònies; pràctica guiada i autònoma; banc contextual T01–T05 i classificació; examen temàtic de 12 preguntes i global de 20; regressions de 30 exercicis de metric i 30 de conversions; teoria, ancoratge directe, hashchange, mòbil de 390 px, sense errors JavaScript ni desbordament horitzontal. La progressió es manté: 8 exercicis N1 i 15 N2.

### Sintaxi

node --check superat per assets/js/dificultat-mi.js, assets/js/raonament-mesura-1eso.js i tots dos tests.

## Fitxers i limitacions

Modificats: 1eso/sentit-mesura.html, assets/js/dificultat-mi.js, assets/js/raonament-mesura-1eso.js. Nous: scripts/comprova-temps-families-1eso.cjs, scripts/comprova-temps-1eso.cjs i aquest informe. No es modifica teoria, CSS, altres temes ni el registre JSON/CSV.

Chrome local és el navegador verificat; Edge no s’ha provat. GitHub Pages no es considera desplegat ni verificat abans de fusionar. A la creació de la PR, el workflow de GitHub Actions «Verifica inventaris fase A» va acabar amb èxit al commit f2042335147492e2c39a2adf150533e4d6cfb9a7.

## Ordres CMD per repetir

Des de l’arrel del repositori a Windows:

~~~cmd
node --check assets\js\dificultat-mi.js
node --check assets\js\raonament-mesura-1eso.js
node --check scripts\comprova-temps-families-1eso.cjs
node --check scripts\comprova-temps-1eso.cjs
node scripts\comprova-temps-families-1eso.cjs
node scripts\comprova-temps-1eso.cjs
~~~
