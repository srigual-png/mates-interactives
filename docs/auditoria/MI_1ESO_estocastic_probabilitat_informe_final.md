# Sentit estocàstic · 1r d’ESO · Probabilitat

**Base:** **main** · **f1b3491de21f1aa7ba89ef12b1fbac61a3b83336** · **Tema:** **probabilitat** · **Famílies:** 10 (5 N1, 5 N2, 0 N3).

## Inventari inicial

buildProbabilitatPool: 141 ítems; genProbabilitat; contextos P1–P11. La pràctica utilitza aquests generadors actius i el classificador compartit; les variants contextuals no es comptabilitzen com famílies noves.

## Famílies definitives i classificació

| ID | Procediment | Anterior | Final | Justificació pedagògica | Generadors / variants |
|---|---|---|---|---|---|
| **classificar-fenomen-aleatori** | Distingir fenòmens aleatoris i deterministes | N1 | N1 | Es manté N1: lectura, reconeixement o càlcul directe adequat a 1r d’ESO. | probabilitat:1 |
| **determinar-espai-mostral** | Determinar l’espai mostral d’un experiment senzill | N1 | N1 | Es manté N1: lectura, reconeixement o càlcul directe adequat a 1r d’ESO. | probabilitat:2, P5 |
| **classificar-probabilitat-qualitativa** | Classificar qualitativament esdeveniments segurs, impossibles o probables | N1 | N1 | Es manté N1: lectura, reconeixement o càlcul directe adequat a 1r d’ESO. | probabilitat:3, P6 |
| **regla-laplace-equiprobable** | Aplicar la regla de Laplace a resultats equiprobables | N1 | N1 | Es manté N1: lectura, reconeixement o càlcul directe adequat a 1r d’ESO. | probabilitat:4, probabilitat:5, probabilitat:6, probabilitat:7, probabilitat:11, P1, P2, P4 |
| **comparar-probabilitats-esdeveniments** | Comparar probabilitats d’esdeveniments en un mateix experiment | N1/N2 mixt (tipus 8/P9) | N2 | N2: comparar requereix obtenir i relacionar dues fraccions de casos favorables. | probabilitat:8, P9 |
| **calcular-freq-relativa-experimental** | Calcular una freqüència relativa a partir de resultats observats | N1 (tipus 9/P7) | N2 | N2: interpretar observacions i dividir casos observats pel total. | probabilitat:9, P7 |
| **distingir-probabilitat-teorica-experimental** | Distingir probabilitat teòrica de freqüència experimental | N1 i N2 (tipus 10/P11 nou) | N2 | N2 consolida tipus 10 i patró P11; el patró contextual interpreta si la dada prové de model teòric o d’experiment. | probabilitat:10, P11 |
| **interpretar-estabilitzacio-freq-relativa** | Interpretar la tendència de la freqüència relativa amb moltes repeticions | N2 | N2 | Es manté N2: combina procediments habituals o interpreta més d’una dada. | P8 |
| **calcular-esdeveniment-complementari** | Calcular la probabilitat de l’esdeveniment complementari | N1 | N1 | Es manté N1: lectura, reconeixement o càlcul directe adequat a 1r d’ESO. | P3 |
| **reconstruir-casos-favorables** | Recuperar casos favorables a partir de la probabilitat i del total equiprobable | N1 | N2 | Puja de N1 a N2: cal invertir la regla de Laplace i reconstruir la quantitat a partir d’una fracció i del total. | P10 |

## Matriu de cobertura de teoria i ajuda contextual

| Família | Generador | Apartat de teoria | Ajuda contextual | Exemple resolt | Error freqüent |
|---|---|---|---|---|---|
| **classificar-fenomen-aleatori** | probabilitat:1 | **#atzar** | probabilitat:1 | Exemple 1 de sota | Confondre un resultat imprevisible amb un experiment determinista. |
| **determinar-espai-mostral** | probabilitat:2, P5 | **#espai** | P5 | Exemple 1 de sota | Ometre resultats possibles en enumerar l’espai mostral. |
| **classificar-probabilitat-qualitativa** | probabilitat:3, P6 | **#qualitativa** | P6 | Exemple 1 de sota | Anomenar segur un resultat que només és possible. |
| **regla-laplace-equiprobable** | probabilitat:4, probabilitat:5, probabilitat:6, probabilitat:7, probabilitat:11, P1, P2, P4 | **#laplace** | P1, P2, P4 | Exemple 1 de sota | Aplicar Laplace quan els resultats no són equiprobables o invertir la fracció. |
| **comparar-probabilitats-esdeveniments** | probabilitat:8, P9 | **#comparar** | P9 | Exemple 1 de sota | Comparar numeradors sense posar en relació els casos possibles. |
| **calcular-freq-relativa-experimental** | probabilitat:9, P7 | **#experimental** | P7 | Exemple 1 de sota | Fer servir els casos teòrics en lloc dels resultats observats. |
| **distingir-probabilitat-teorica-experimental** | probabilitat:10, P11 | **#experimental** | P11 | Exemple 1 de sota | Confondre proporció observada amb probabilitat teòrica. |
| **interpretar-estabilitzacio-freq-relativa** | P8 | **#experimental** | P8 | Exemple 1 de sota | Esperar coincidència exacta amb la probabilitat en una mostra petita. |
| **calcular-esdeveniment-complementari** | P3 | **#laplace** | P3 | Exemple 1 de sota | Oblidar que P(A)+P(no A)=1. |
| **reconstruir-casos-favorables** | P10 | **#laplace** | P10 | Exemple 1 de sota | Multiplicar el total només pel denominador de la probabilitat. |

## Exemples resolts per família

### Distingir fenòmens aleatoris i deterministes · N1 (**classificar-fenomen-aleatori**)

1. **Enunciat:** Classifica el fenomen: "Extreure una bola d'una bossa sense mirar"  **Resposta:** Aleatori  **Nivell:** N1
2. **Enunciat:** Classifica el fenomen: "Fer girar una ruleta i observar en quin sector s'atura"  **Resposta:** Aleatori  **Nivell:** N1
3. **Enunciat:** Classifica el fenomen: "Calcular l'àrea d'un rectangle de 4 cm per 7 cm"  **Resposta:** Determinista  **Nivell:** N1

**Error freqüent:** Confondre un resultat imprevisible amb un experiment determinista.

### Determinar l’espai mostral d’un experiment senzill · N1 (**determinar-espai-mostral**)

1. **Enunciat:** Llancem un dau de 4 cares numerades de l'1 al 4. Quin és l'espai mostral?  **Resposta:** {1, 2, 3, 4}  **Nivell:** N1
2. **Enunciat:** Quin és l'espai mostral quan llancem un dau de 6 cares?  **Resposta:** {1, 2, 3, 4, 5, 6}  **Nivell:** N1
3. **Enunciat:** Escollim a l'atzar una lletra entre A, B, C i D. Quin és l'espai mostral?  **Resposta:** {A, B, C, D}  **Nivell:** N1

**Error freqüent:** Ometre resultats possibles en enumerar l’espai mostral.

### Classificar qualitativament esdeveniments segurs, impossibles o probables · N1 (**classificar-probabilitat-qualitativa**)

1. **Enunciat:** Classifica qualitativament l'esdeveniment: "Triar una targeta parella entre {1, 2, 3, 4}"  **Resposta:** Igual de probable que no  **Nivell:** N1
2. **Enunciat:** Classifica qualitativament l'esdeveniment: "Treure una bola blava d'una bossa amb 9 vermelles i 1 blava"  **Resposta:** Poc probable  **Nivell:** N1
3. **Enunciat:** Classifica qualitativament l'esdeveniment: "Treure vermell d'una bossa amb 8 boles vermelles i 2 verdes"  **Resposta:** Molt probable  **Nivell:** N1

**Error freqüent:** Anomenar segur un resultat que només és possible.

### Aplicar la regla de Laplace a resultats equiprobables · N1 (**regla-laplace-equiprobable**)

1. **Enunciat:** En un experiment hi ha 12 resultats equiprobables i 5 són favorables a l'esdeveniment A. Quina és P(A)?  **Resposta:** 5/12  **Nivell:** N1
2. **Enunciat:** Una ruleta té 8 sectors iguals i 1 són de color lila. Quina és la probabilitat d'aturar-se en lila?  **Resposta:** 1/8  **Nivell:** N1
3. **Enunciat:** Llancem un dau de 6 cares numerades de l'1 al 6. Quina és la probabilitat de treure un múltiple de 2?  **Resposta:** 1/2  **Nivell:** N1

**Error freqüent:** Aplicar Laplace quan els resultats no són equiprobables o invertir la fracció.

### Comparar probabilitats d’esdeveniments en un mateix experiment · N2 (**comparar-probabilitats-esdeveniments**)

1. **Enunciat:** En una mateixa bossa hi ha 4 boles verdes, 4 liles i 4 d'altres colors. Quin esdeveniment és més probable?  **Resposta:** Són igual de probables  **Nivell:** N2
2. **Enunciat:** En una mateixa bossa hi ha 1 boles grogues, 7 vermelles i 2 d'altres colors. Quin esdeveniment és més probable?  **Resposta:** Treure una bola vermella  **Nivell:** N2
3. **Enunciat:** En una mateixa bossa hi ha 4 boles vermelles, 4 blaves i 2 d'altres colors. Quin esdeveniment és més probable?  **Resposta:** Són igual de probables  **Nivell:** N2

**Error freqüent:** Comparar numeradors sense posar en relació els casos possibles.

### Calcular una freqüència relativa a partir de resultats observats · N2 (**calcular-freq-relativa-experimental**)

1. **Enunciat:** En 25 repeticions d'un experiment ha aparegut el color blau en una ruleta 9 vegades. Quina és la seva freqüència relativa?  **Resposta:** 0.36  **Nivell:** N2
2. **Enunciat:** En 20 repeticions d'un experiment ha aparegut cara en llançar una moneda 11 vegades. Quina és la seva freqüència relativa?  **Resposta:** 0.55  **Nivell:** N2
3. **Enunciat:** En 50 repeticions d'un experiment ha aparegut creu en llançar una moneda 29 vegades. Quina és la seva freqüència relativa?  **Resposta:** 0.58  **Nivell:** N2

**Error freqüent:** Fer servir els casos teòrics en lloc dels resultats observats.

### Distingir probabilitat teòrica de freqüència experimental · N2 (**distingir-probabilitat-teorica-experimental**)

1. **Enunciat:** Aquesta afirmació descriu una probabilitat teòrica o un resultat experimental? "Una ruleta té 4 sectors iguals i un és blau, per tant P(blau)=1/4."  **Resposta:** Probabilitat teòrica  **Nivell:** N2
2. **Enunciat:** Aquesta afirmació descriu una probabilitat teòrica o un resultat experimental? "En 100 extraccions, retornant la bola a la bossa cada vegada, una bola vermella ha aparegut 34 vegades: 34/100."  **Resposta:** Freqüència relativa experimental  **Nivell:** N2
3. **Enunciat:** Aquesta afirmació descriu una probabilitat teòrica o un resultat experimental? "En 50 llançaments d'una moneda han sortit 27 cares, així que la freqüència relativa és 27/50."  **Resposta:** Freqüència relativa experimental  **Nivell:** N2

**Error freqüent:** Confondre proporció observada amb probabilitat teòrica.

### Interpretar la tendència de la freqüència relativa amb moltes repeticions · N2 (**interpretar-estabilitzacio-freq-relativa**)

1. **Enunciat:** En una moneda equilibrada, després de 10 llançaments han sortit 8 cares. Si fem molts més llançaments, és raonable esperar que la freqüència relativa de cara s’acosti a 1/2 ?  **Resposta:** Sí  **Nivell:** N2
2. **Enunciat:** En 10 llançaments d’una moneda han sortit 8 cares. Amb molts llançaments addicionals, cap a quin valor és raonable que tendeixi la freqüència relativa?  **Resposta:** Cap a 1/2; no necessàriament hi arribarà exactament a cada moment.  **Nivell:** N2 · exemple complementari resolt
3. **Enunciat:** En 500 llançaments d’una moneda equilibrada han sortit 247 cares. Quina freqüència relativa s’ha observat i quin és el valor teòric de referència?  **Resposta:** 247/500 = 0,494; la probabilitat teòrica de cara és 1/2.  **Nivell:** N2 · exemple complementari resolt

**Error freqüent:** Esperar coincidència exacta amb la probabilitat en una mostra petita.

### Calcular la probabilitat de l’esdeveniment complementari · N1 (**calcular-esdeveniment-complementari**)

1. **Enunciat:** La probabilitat que passi A és 1/4 . Quina és la probabilitat que NO passi A?  **Resposta:** 3/4  **Nivell:** N1
2. **Enunciat:** La probabilitat que passi A és 2/5 . Quina és la probabilitat que NO passi A?  **Resposta:** 3/5  **Nivell:** N1
3. **Enunciat:** La probabilitat que passi A és 3/8 . Quina és la probabilitat que NO passi A?  **Resposta:** 5/8  **Nivell:** N1

**Error freqüent:** Oblidar que P(A)+P(no A)=1.

### Recuperar casos favorables a partir de la probabilitat i del total equiprobable · N2 (**reconstruir-casos-favorables**)

1. **Enunciat:** Un experiment té 12 resultats equiprobables . Un esdeveniment té probabilitat 1/4 . Quants resultats favorables té?  **Resposta:** 3  **Nivell:** N2
2. **Enunciat:** Un experiment té 12 resultats equiprobables . Un esdeveniment té probabilitat 2/4 . Quants resultats favorables té?  **Resposta:** 6  **Nivell:** N2
3. **Enunciat:** Un experiment té 8 resultats equiprobables . Un esdeveniment té probabilitat 3/4 . Quants resultats favorables té?  **Resposta:** 6  **Nivell:** N2

**Error freqüent:** Multiplicar el total només pel denominador de la probabilitat.

## Cobertura de pràctica, exàmens i proves

- Famílies cobertes: 10/10; catàleg, taskDifficulty, diff i classificador compartit coincidents.
- Banc regular: 141/141 ítems exhaustius; generació aleatòria: 0; contextos: 2750, amb 250 mostres per patró.
- Rotació de bossa: 282 extraccions sense repetició familiar consecutiva.
- Playwright (Chrome): pràctica guiada i autònoma; feedback en encert i error amb continuació; 20 preguntes obertes sense repetició familiar consecutiva; examen de tema (12) i examen global (20); resposta única/corrector; 390 px sense desbordament.
- Navegació: comprovats a Chrome 30 ancoratges directes, cinc esdeveniments hashchange i cinc destinacions de retorn a pràctica carregades per URL; el clic d’enllaç queda pendent perquè el navegador de prova carrega pàgines via file://; cap error JS.
- Regressions PR #37: vuit tests (matemàtics i Playwright dels quatre temes) passats; 30 generacions per cadascun dels temes d’ampliació acumulades2 i histograma en cada prova UI.

## Limitacions

Les pàgines de teoria i CSS no s’han modificat. La matriu apunta a seccions existents, però no totes les variants tenen una ajuda contextual exclusiva ni un exemple idèntic; s’hi relaciona l’ajuda del patró o el procediment més proper. Els clics als enllaços de teoria cap a la pràctica no es van poder validar des de file://; se n’ha comprovat l’URL de destinació i la càrrega directa. Les proves s’han executat a Chrome local, no Edge. GitHub Pages no s’ha comprovat perquè la PR es deixa sense fusionar.
