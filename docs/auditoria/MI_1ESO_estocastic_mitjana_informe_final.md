# Sentit estocàstic · 1r d’ESO · Mitjana aritmètica

**Base:** **main** · **f1b3491de21f1aa7ba89ef12b1fbac61a3b83336** · **Tema:** **mitjana** · **Famílies:** 6 (2 N1, 4 N2, 0 N3).

## Inventari inicial

genMitjana tipus 1–4; banc C1–C5 i C12; sense bossa finita. La pràctica utilitza aquests generadors actius i el classificador compartit; les variants contextuals no es comptabilitzen com famílies noves.

## Famílies definitives i classificació

| ID | Procediment | Anterior | Final | Justificació pedagògica | Generadors / variants |
|---|---|---|---|---|---|
| **calcular-mitjana-llista** | Calcular la mitjana d’una llista de dades | N1 | N1 | Es manté N1: lectura, reconeixement o càlcul directe adequat a 1r d’ESO. | mitjana:1, C1 |
| **reconstruir-dada-des-de-mitjana** | Reconstruir una dada desconeguda a partir de la mitjana | N2 | N2 | Es manté N2: combina procediments habituals o interpreta més d’una dada. | mitjana:2, C2 |
| **recuperar-suma-des-de-mitjana** | Recuperar la suma total a partir de la mitjana i el nombre de dades | N1 | N1 | Es manté N1: lectura, reconeixement o càlcul directe adequat a 1r d’ESO. | mitjana:3, C12 |
| **mitjana-ponderada-frequencies** | Calcular una mitjana ponderada a partir de freqüències | N2 | N2 | Es manté N2: combina procediments habituals o interpreta més d’una dada. | mitjana:4, C3 |
| **comparar-mitjanes** | Comparar les mitjanes de dos grups | N2 | N2 | Es manté N2: combina procediments habituals o interpreta més d’una dada. | C4 |
| **interpretar-efecte-extrem-mitjana** | Interpretar l’efecte d’una dada extrema sobre la mitjana | N2 | N2 | Es manté N2: combina procediments habituals o interpreta més d’una dada. | C5 |

## Matriu de cobertura de teoria i ajuda contextual

| Família | Generador | Apartat de teoria | Ajuda contextual | Exemple resolt | Error freqüent |
|---|---|---|---|---|---|
| **calcular-mitjana-llista** | mitjana:1, C1 | **#calcular** | C1 | Exemple 1 de sota | Oblidar una observació o dividir per un nombre diferent de dades. |
| **reconstruir-dada-des-de-mitjana** | mitjana:2, C2 | **#manquant** | C2 | Exemple 1 de sota | Restar les dades conegudes a la mitjana, no a la suma total x̄·n. |
| **recuperar-suma-des-de-mitjana** | mitjana:3, C12 | **#suma** | C12 | Exemple 1 de sota | Dividir en lloc de multiplicar mitjana pel nombre de dades. |
| **mitjana-ponderada-frequencies** | mitjana:4, C3 | **#taula** | C3 | Exemple 1 de sota | Ignorar les freqüències o dividir pel nombre de valors diferents. |
| **comparar-mitjanes** | C4 | **#interpretar** | C4 | Exemple 1 de sota | Comparar sumes o màxims, sense dividir cada suma pel seu n. |
| **interpretar-efecte-extrem-mitjana** | C5 | **#interpretar** | C5 | Exemple 1 de sota | No comparar el nou valor amb la mitjana original. |

## Exemples resolts per família

### Calcular la mitjana d’una llista de dades · N1 (**calcular-mitjana-llista**)

1. **Enunciat:** Calcula la mitjana aritmètica de: 3, 6, 8, 5, 9, 4  **Resposta:** 5.83  **Nivell:** N1
2. **Enunciat:** Calcula la mitjana aritmètica de: 3, 7, 10, 5, 10  **Resposta:** 7  **Nivell:** N1
3. **Enunciat:** Calcula la mitjana aritmètica de: 9, 8, 5, 7, 3, 6, 3  **Resposta:** 5.86  **Nivell:** N1

**Error freqüent:** Oblidar una observació o dividir per un nombre diferent de dades.

### Reconstruir una dada desconeguda a partir de la mitjana · N2 (**reconstruir-dada-des-de-mitjana**)

1. **Enunciat:** La mitjana de 4 notes és 6. Les primeres 3 notes són: 4, 7, 6. Quina és l'última nota?  **Resposta:** 7  **Nivell:** N2
2. **Enunciat:** La mitjana de 5 notes és 6. Les primeres 4 notes són: 9, 7, 3, 7. Quina és l'última nota?  **Resposta:** 4  **Nivell:** N2
3. **Enunciat:** La mitjana de 5 notes és 5. Les primeres 4 notes són: 3, 3, 6, 3. Quina és l'última nota?  **Resposta:** 10  **Nivell:** N2

**Error freqüent:** Restar les dades conegudes a la mitjana, no a la suma total x̄·n.

### Recuperar la suma total a partir de la mitjana i el nombre de dades · N1 (**recuperar-suma-des-de-mitjana**)

1. **Enunciat:** Quina és la suma de les dades si la mitjana de 5 valors és 6?  **Resposta:** 30  **Nivell:** N1
2. **Enunciat:** Quina és la suma de les dades si la mitjana de 3 valors és 6?  **Resposta:** 18  **Nivell:** N1
3. **Enunciat:** Quina és la suma de les dades si la mitjana de 6 valors és 4?  **Resposta:** 24  **Nivell:** N1

**Error freqüent:** Dividir en lloc de multiplicar mitjana pel nombre de dades.

### Calcular una mitjana ponderada a partir de freqüències · N2 (**mitjana-ponderada-frequencies**)

1. **Enunciat:** Observa la taula de freqüències. Calcula la mitjana aritmètica de les dades. [taula: Valor \| 4 \| 6 \| 7 \| 8 / Freqüència \| 3 \| 4 \| 6 \| 3]  **Resposta:** 6.38  **Nivell:** N2
2. **Enunciat:** Observa la taula de freqüències. Calcula la mitjana aritmètica de les dades. [taula: Valor \| 3 \| 4 \| 5 \| 9 \| 10 / Freqüència \| 4 \| 5 \| 4 \| 4 \| 2]  **Resposta:** 5.68  **Nivell:** N2
3. **Enunciat:** Observa la taula de freqüències. Calcula la mitjana aritmètica de les dades. [taula: Valor \| 2 \| 4 \| 8 \| 10 / Freqüència \| 5 \| 3 \| 5 \| 1]  **Resposta:** 5.14  **Nivell:** N2

**Error freqüent:** Ignorar les freqüències o dividir pel nombre de valors diferents.

### Comparar les mitjanes de dos grups · N2 (**comparar-mitjanes**)

1. **Enunciat:** Grup A: 9, 9, 10, 7, 3 Grup B: 8, 6, 3, 7, 3 Quin grup té una mitjana més alta, o són iguals?  **Resposta:** A  **Nivell:** N2
2. **Enunciat:** Grup A: 6, 8, 10, 9, 10 Grup B: 12, 7, 7, 5, 12 Quin grup té una mitjana més alta, o són iguals?  **Resposta:** Iguals  **Nivell:** N2
3. **Enunciat:** Grup A: 10, 3, 11, 9, 9 Grup B: 6, 6, 5, 8, 4 Quin grup té una mitjana més alta, o són iguals?  **Resposta:** A  **Nivell:** N2

**Error freqüent:** Comparar sumes o màxims, sense dividir cada suma pel seu n.

### Interpretar l’efecte d’una dada extrema sobre la mitjana · N2 (**interpretar-efecte-extrem-mitjana**)

1. **Enunciat:** En el conjunt 4, 7, 10, 9, 6 afegim el valor 24 . La mitjana augmentarà, disminuirà o quedarà igual?  **Resposta:** Augmentarà  **Nivell:** N2
2. **Enunciat:** En el conjunt 7, 9, 10, 8, 2 afegim el valor 21 . La mitjana augmentarà, disminuirà o quedarà igual?  **Resposta:** Augmentarà  **Nivell:** N2
3. **Enunciat:** En el conjunt 8, 5, 9, 8, 3 afegim el valor 22 . La mitjana augmentarà, disminuirà o quedarà igual?  **Resposta:** Augmentarà  **Nivell:** N2

**Error freqüent:** No comparar el nou valor amb la mitjana original.

## Cobertura de pràctica, exàmens i proves

- Famílies cobertes: 6/6; catàleg, taskDifficulty, diff i classificador compartit coincidents.
- Banc regular: 0; generació aleatòria: 1000; contextos: 1500, amb 250 mostres per patró.
- Rotació de bossa: no aplica extraccions sense repetició familiar consecutiva.
- Playwright (Chrome): pràctica guiada i autònoma; feedback en encert i error amb continuació; 20 preguntes obertes sense repetició familiar consecutiva; examen de tema (12) i examen global (20); resposta única/corrector; 390 px sense desbordament.
- Navegació: comprovats a Chrome 30 ancoratges directes, cinc esdeveniments hashchange i cinc destinacions de retorn a pràctica carregades per URL; el clic d’enllaç queda pendent perquè el navegador de prova carrega pàgines via file://; cap error JS.
- Regressions PR #37: vuit tests (matemàtics i Playwright dels quatre temes) passats; 30 generacions per cadascun dels temes d’ampliació acumulades2 i histograma en cada prova UI.

## Limitacions

Les pàgines de teoria i CSS no s’han modificat. La matriu apunta a seccions existents, però no totes les variants tenen una ajuda contextual exclusiva ni un exemple idèntic; s’hi relaciona l’ajuda del patró o el procediment més proper. Els clics als enllaços de teoria cap a la pràctica no es van poder validar des de file://; se n’ha comprovat l’URL de destinació i la càrrega directa. Les proves s’han executat a Chrome local, no Edge. GitHub Pages no s’ha comprovat perquè la PR es deixa sense fusionar.
