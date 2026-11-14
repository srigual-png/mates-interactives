# Sentit estocàstic · 1r d’ESO · Mediana

**Base:** **main** · **f1b3491de21f1aa7ba89ef12b1fbac61a3b83336** · **Tema:** **mediana** · **Famílies:** 4 (2 N1, 2 N2, 0 N3).

## Inventari inicial

genMediana tipus 1–4; tipus 1 amb variants senar/parella; banc C6–C8 i C13. La pràctica utilitza aquests generadors actius i el classificador compartit; les variants contextuals no es comptabilitzen com famílies noves.

## Famílies definitives i classificació

| ID | Procediment | Anterior | Final | Justificació pedagògica | Generadors / variants |
|---|---|---|---|---|---|
| **calcular-mediana-senar** | Ordenar i trobar el valor central amb un nombre senar de dades | N1 | N1 | Es manté N1: lectura, reconeixement o càlcul directe adequat a 1r d’ESO. | mediana:1#odd, mediana:4, C6 |
| **calcular-mediana-parella** | Ordenar i calcular la mitjana dels dos valors centrals amb un nombre parell de dades | N1 (tipus 1 original; variant parella no separada) | N2 | La variant parella es distingeix del tipus 1 original i queda a N2: ordenar, identificar dos centres i calcular-ne la mitjana. | mediana:1#even, mediana:3, C7 |
| **distingir-mitjana-mediana** | Distingir els procediments de mitjana i mediana | N1 | N1 | Es manté N1: lectura, reconeixement o càlcul directe adequat a 1r d’ESO. | mediana:2, C13 |
| **interpretar-efecte-extrem-mediana** | Interpretar la mediana després d’afegir una dada extrema | N2 | N2 | Es manté N2: combina procediments habituals o interpreta més d’una dada. | C8 |

## Matriu de cobertura de teoria i ajuda contextual

| Família | Generador | Apartat de teoria | Ajuda contextual | Exemple resolt | Error freqüent |
|---|---|---|---|---|---|
| **calcular-mediana-senar** | mediana:1#odd, mediana:4, C6 | **#senar** | C6 | Exemple 1 de sota | No ordenar les dades abans de localitzar el centre. |
| **calcular-mediana-parella** | mediana:1#even, mediana:3, C7 | **#parell / #posicions** | C7 | Exemple 1 de sota | Agafar un sol valor central o no fer-ne la mitjana. |
| **distingir-mitjana-mediana** | mediana:2, C13 | **#definicio / #mitjana** | C13 | Exemple 1 de sota | Confondre posició central amb suma dividida per n. |
| **interpretar-efecte-extrem-mediana** | C8 | **#parell / #posicions** | C8 | Exemple 1 de sota | No tornar a ordenar i recalcular les posicions centrals després d’afegir una dada. |

## Exemples resolts per família

### Ordenar i trobar el valor central amb un nombre senar de dades · N1 (**calcular-mediana-senar**)

1. **Enunciat:** Calcula la mediana de: 3, 8, 11, 6, 12, 4, 7 (n=7)  **Resposta:** 7  **Nivell:** N1
2. **Enunciat:** Calcula la mediana de: 7, 8, 12 (n=3)  **Resposta:** 8  **Nivell:** N1
3. **Enunciat:** Calcula la mediana de: 12, 7, 7, 15, 9, 9, 12 (n=7)  **Resposta:** 9  **Nivell:** N1

**Error freqüent:** No ordenar les dades abans de localitzar el centre.

### Ordenar i calcular la mitjana dels dos valors centrals amb un nombre parell de dades · N2 (**calcular-mediana-parella**)

1. **Enunciat:** Calcula la mediana de: 15, 15, 8, 9, 4, 13 (n=6)  **Resposta:** 11  **Nivell:** N2
2. **Enunciat:** Calcula la mediana de: 8, 10, 3, 7, 2, 15, 8, 9, 3, 7 (n=10)  **Resposta:** 7.5  **Nivell:** N2
3. **Enunciat:** Calcula la mediana de: 4, 9, 5, 4, 13, 3 (n=6)  **Resposta:** 4.5  **Nivell:** N2

**Error freqüent:** Agafar un sol valor central o no fer-ne la mitjana.

### Distingir els procediments de mitjana i mediana · N1 (**distingir-mitjana-mediana**)

1. **Enunciat:** Quina diferència hi ha entre la MITJANA i la MEDIANA?  **Resposta:** La mediana és el valor central quan les dades estan ordenades; la mitjana és la suma dividida per n  **Nivell:** N1
2. **Enunciat:** Quin procediment permet trobar la mediana d’un conjunt de dades?  **Resposta:** Ordenar les dades i trobar el valor o valors centrals  **Nivell:** N1
3. **Enunciat:** Dades: 1, 3, 3, 9, 14. Quin procediment dona la mediana?  **Resposta:** Ordenar i prendre el valor central: 3 (la mitjana és 6).  **Nivell:** N1 · exemple complementari resolt

**Error freqüent:** Confondre posició central amb suma dividida per n.

### Interpretar la mediana després d’afegir una dada extrema · N2 (**interpretar-efecte-extrem-mediana**)

1. **Enunciat:** Dades ordenades: 3, 4, 5, 6, 7 . Si afegim el valor 100 , la mediana nova és 5, 5,5 o 100?  **Resposta:** 5,5  **Nivell:** N2
2. **Enunciat:** Dades 2, 4, 6, 8, 10. Afegim 100. Quina és la nova mediana?  **Resposta:** Dades ordenades 2, 4, 6, 8, 10, 100; (6+8)/2 = 7.  **Nivell:** N2 · exemple complementari resolt
3. **Enunciat:** Dades 1, 3, 5, 7, 9. Afegim 80. Quina és la nova mediana?  **Resposta:** Dades ordenades 1, 3, 5, 7, 9, 80; (5+7)/2 = 6.  **Nivell:** N2 · exemple complementari resolt

**Error freqüent:** No tornar a ordenar i recalcular les posicions centrals després d’afegir una dada.

## Cobertura de pràctica, exàmens i proves

- Famílies cobertes: 4/4; catàleg, taskDifficulty, diff i classificador compartit coincidents.
- Banc regular: 0; generació aleatòria: 1000; contextos: 1000, amb 250 mostres per patró.
- Rotació de bossa: no aplica extraccions sense repetició familiar consecutiva.
- Playwright (Chrome): pràctica guiada i autònoma; feedback en encert i error amb continuació; 20 preguntes obertes sense repetició familiar consecutiva; examen de tema (12) i examen global (20); resposta única/corrector; 390 px sense desbordament.
- Navegació: comprovats a Chrome 30 ancoratges directes, cinc esdeveniments hashchange i cinc destinacions de retorn a pràctica carregades per URL; el clic d’enllaç queda pendent perquè el navegador de prova carrega pàgines via file://; cap error JS.
- Regressions PR #37: vuit tests (matemàtics i Playwright dels quatre temes) passats; 30 generacions per cadascun dels temes d’ampliació acumulades2 i histograma en cada prova UI.

## Limitacions

Les pàgines de teoria i CSS no s’han modificat. La matriu apunta a seccions existents, però no totes les variants tenen una ajuda contextual exclusiva ni un exemple idèntic; s’hi relaciona l’ajuda del patró o el procediment més proper. Els clics als enllaços de teoria cap a la pràctica no es van poder validar des de file://; se n’ha comprovat l’URL de destinació i la càrrega directa. Les proves s’han executat a Chrome local, no Edge. GitHub Pages no s’ha comprovat perquè la PR es deixa sense fusionar.
