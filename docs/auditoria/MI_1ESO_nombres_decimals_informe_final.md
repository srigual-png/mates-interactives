# Auditoria final — Nombres decimals · 1r d’ESO

**Estat:** provisional, pendent de revisió i merge de la PR. No s’ha actualitzat el registre de famílies validades.

## Punt de partida i resum

- **Commit base de `main`:** `b9f3c1f22090dd55757176844d1f94533adba3e4`.
- **Generadors inspeccionats:** 23 identificadors, D01–D23.
- **Classificació provisional anterior per generador:** 11 N1, 8 N2, 4 N3.
- **Classificació final per família real:** 20 famílies — **8 N1, 10 N2, 2 N3**.
- **Criteri:** els recomptes del protocol són orientatius; no s’han creat famílies per assolir cap quota.

El currículum de Catalunya per a 1r proposa l’ús de decimals, aproximacions i anàlisi de l’error, incloent l’error absolut i relatiu; això sosté mantenir D08/D09 i estimació de producte com a contingut del tema. [Orientacions curriculars de Matemàtiques de l’ESO, sentit numèric, proposta de 1r](https://xtec.gencat.cat/web/.content/curriculum/eso/concrecions-curriculars/Orientacions-curriculars_MAT_SEC_per-sentits.pdf).

## Famílies definitives i justificació de nivell

| Família | Generadors | Nivell(s) anterior(s) | Nivell final | Justificació |
|---|---|---:|---:|---|
| operacions-addicio-resta-decimals | D01, D17 | N1 + N1 | N2 | Alineació de comes comuna; la resta afegeix reagrupament, així que el nivell familiar reflecteix la variant més exigent habitual. |
| multiplicacio-decimals | D02, D07 | N1 + N2 | N2 | El producte decimal és comú; D07 només afegeix un context de taxa o paquets. |
| arrodoniment-decimals | D03 | N1 | N1 | Aplicació directa de la xifra següent i precisió indicada. |
| conversio-fraccio-decimal | D04, D05 | N1 + N1 | N2 | Són transformacions inverses d’una mateixa equivalència; requereixen reconèixer terminació decimal i simplificar. |
| compra-i-canvi | D06 | N2 | N2 | Combina suma d’imports i resta del pagament. |
| error-absolut | D08 | N1 | N1 | És la diferència no negativa entre valor exacte i aproximació. |
| error-relatiu-percentual | D09 | N2 | N2 | Interpreta l’error absolut en relació amb el valor exacte i el percentual. |
| divisio-unitaria-contextual | D10 | N2 | N1 | Una divisió decimal directa per un natural; no hi ha reconstrucció ni passos múltiples. |
| repartiment-amb-residu-decimal | D11 | N2 | N2 | Combina quocient enter, residu i interpretació de la unitat. |
| mitjana-decimal | D12 | N2 | N2 | Suma, divisió pel nombre de dades i, de vegades, arrodoniment. |
| garantia-amb-error-de-mesura | D13 | N3 | N3 | Compara simultàniament límits inferior/superior per garantir suficiència i capacitat. |
| valor-posicional-decimal | D14 | N1 | N1 | Lectura directa de posició o valor d’una xifra. |
| comparacio-i-ordenacio-decimal | D15 | N1 | N1 | Compara decimals igualant longituds amb zeros finals. |
| recta-numerica-decimal | D16 | N1 | N1 | Compta intervals iguals en una recta graduada. |
| divisio-decimal-per-decimal | D18 | N2 | N2 | Escala dividend i divisor pel mateix factor per obtenir divisor enter. |
| operar-amb-potencies-de-deu | D19 | N1 | N1 | Desplaçament de valor posicional en un procediment directe. |
| construccio-entre-decimals | D20 | N2 | N1 | N’hi ha prou d’escollir una centèsima interior; no requereix estratègia complexa. |
| reconstruccio-xifra-amb-cotes | D21 | N3 | N2 | Prova una xifra i comprova dues desigualtats simples. |
| diagnosi-errors-operacions-decimals | D22 | N3 | N2 | Tria la regla vulnerada i corregeix una operació coneguda; no justifica N3. |
| estimacio-producte-decimal | D23 | N3 | N3 | Requereix estimar el canvi del producte a partir dels factors propers a enters i justificar una cota. |

### Agrupaments i reclassificacions

- **D01/D17:** suma i resta comparteixen alineació posicional; D17 inclou reagrupament i fixa N2 per a la família.
- **D02/D07:** producte decimal i taxa/producte per nombre natural són variants del mateix procediment multiplicatiu.
- **D04/D05:** conversió en tots dos sentits és una única família d’equivalència, no dues famílies.
- **N2→N1:** D10 és divisió unitària directa; D20 demana només una centèsima interior.
- **N3→N2:** D21 només prova una xifra sota dues cotes; D22 identifica i corregeix errors amb regles ja apreses.
- **N1→N2:** la conversió D04/D05 combina equivalència i reducció/lectura del resultat; operacions decimals N2 inclouen el reagrupament de D17.
- D13 i D23 es mantenen N3 com a raonament amb restriccions/estimació, sense incorporar procediments algebraics nous ni ampliar el tema.

## Correspondència completa generador → família → nivell

| Generador | Família | Nivell |
|---|---|---:|
| D01 | operacions-addicio-resta-decimals | N2 |
| D17 | operacions-addicio-resta-decimals | N2 |
| D02 | multiplicacio-decimals | N2 |
| D07 | multiplicacio-decimals | N2 |
| D03 | arrodoniment-decimals | N1 |
| D04 | conversio-fraccio-decimal | N2 |
| D05 | conversio-fraccio-decimal | N2 |
| D06 | compra-i-canvi | N2 |
| D08 | error-absolut | N1 |
| D09 | error-relatiu-percentual | N2 |
| D10 | divisio-unitaria-contextual | N1 |
| D11 | repartiment-amb-residu-decimal | N2 |
| D12 | mitjana-decimal | N2 |
| D13 | garantia-amb-error-de-mesura | N3 |
| D14 | valor-posicional-decimal | N1 |
| D15 | comparacio-i-ordenacio-decimal | N1 |
| D16 | recta-numerica-decimal | N1 |
| D18 | divisio-decimal-per-decimal | N2 |
| D19 | operar-amb-potencies-de-deu | N1 |
| D20 | construccio-entre-decimals | N1 |
| D21 | reconstruccio-xifra-amb-cotes | N2 |
| D22 | diagnosi-errors-operacions-decimals | N2 |
| D23 | estimacio-producte-decimal | N3 |

## Exemples generats

Els exemples següents provenen de la llavor determinista de la suite; les respostes s’han contrastat amb oracles independents en enters escalats/`BigInt`.

### operacions-addicio-resta-decimals — D01, D17 · N2

1. **Enunciat:** Calcula 7,003 + 0,40.
   **Resposta:** 7,403
   **Nivell:** N2
   **Passos:** Iguala les posicions decimals: 7,003 + 0,400. Suma cada columna alineant les comes. Resultat: 7,403.

2. **Enunciat:** Calcula 8,007 − 5,90.
   **Resposta:** 2,107
   **Nivell:** N2
   **Passos:** Iguala les posicions decimals: 8,007 − 5,900. Reagrupa una unitat en deu dècimes i una dècima en deu centèsimes quan calgui. Resultat: 2,107.

3. **Enunciat:** Calcula 5,009 + 0,40.
   **Resposta:** 5,409
   **Nivell:** N2
   **Passos:** Iguala les posicions decimals: 5,009 + 0,400. Suma cada columna alineant les comes. Resultat: 5,409.

### multiplicacio-decimals — D02, D07 · N2

1. **Enunciat:** Calcula 7,0 × 4,2.
   **Resposta:** 29,40
   **Nivell:** N2
   **Passos:** Sense comes: 70 × 42 = 2940. Els factors tenen dues xifres decimals en total: 29,40.

2. **Enunciat:** Una màquina produeix 3,50 L per minut. Quants litres produeix en 5 minuts?
   **Resposta:** 17,50
   **Nivell:** N2
   **Passos:** Multiplica la quantitat per unitat pel nombre d’unitats: 3,50 × 5 = 17,50.

3. **Enunciat:** Calcula 1,5 × 2,8.
   **Resposta:** 4,20
   **Nivell:** N2
   **Passos:** Sense comes: 15 × 28 = 420. Els factors tenen dues xifres decimals en total: 4,20.

### arrodoniment-decimals — D03 · N1

1. **Enunciat:** Arrodoneix 91,607 a les centèsimes. Escriu 2 xifres decimals.
   **Resposta:** 91,61
   **Nivell:** N1
   **Passos:** La xifra següent és 7: augmenta una unitat la darrera posició conservada. Resultat amb 2 decimals: 91,61.

2. **Enunciat:** Arrodoneix 39,673 a les dècimes. Escriu 1 xifres decimals.
   **Resposta:** 39,7
   **Nivell:** N1
   **Passos:** La xifra següent és 7: augmenta una unitat la darrera posició conservada. Resultat amb 1 decimals: 39,7.

3. **Enunciat:** Arrodoneix 4,486 a les dècimes. Escriu 1 xifres decimals.
   **Resposta:** 4,5
   **Nivell:** N1
   **Passos:** La xifra següent és 8: augmenta una unitat la darrera posició conservada. Resultat amb 1 decimals: 4,5.

### conversio-fraccio-decimal — D04, D05 · N2

1. **Enunciat:** Converteix 7/8 a decimal.
   **Resposta:** 0,875
   **Nivell:** N2
   **Passos:** 0,875 = 875/1000 = 7/8. Divideix numerador i denominador pel seu MCD fins que no tinguin cap divisor comú.

2. **Enunciat:** Escriu 0,75 com a fracció irreductible.
   **Resposta:** 3/4
   **Nivell:** N2
   **Passos:** 0,75 = 750/1000 = 3/4. Divideix numerador i denominador pel seu MCD fins que no tinguin cap divisor comú.

3. **Enunciat:** Converteix 1/4 a decimal.
   **Resposta:** 0,25
   **Nivell:** N2
   **Passos:** 0,25 = 250/1000 = 1/4. Divideix numerador i denominador pel seu MCD fins que no tinguin cap divisor comú.

### compra-i-canvi — D06 · N2

1. **Enunciat:** Compres productes de 0,82 €, 3,05 € i 1,64 €. Pagues 10,00 €. Quin canvi reps?
   **Resposta:** 4,49
   **Nivell:** N2
   **Passos:** Total: 0,82 + 3,05 + 1,64 = 5,51 €. Canvi: 10,00 − 5,51 = 4,49 €.

2. **Enunciat:** Compres productes de 1,33 €, 1,23 € i 2,02 €. Pagues 5,00 €. Quin canvi reps?
   **Resposta:** 0,42
   **Nivell:** N2
   **Passos:** Total: 1,33 + 1,23 + 2,02 = 4,58 €. Canvi: 5,00 − 4,58 = 0,42 €.

3. **Enunciat:** Compres productes de 2,82 €, 1,29 € i 2,15 €. Pagues 10,00 €. Quin canvi reps?
   **Resposta:** 3,74
   **Nivell:** N2
   **Passos:** Total: 2,82 + 1,29 + 2,15 = 6,26 €. Canvi: 10,00 − 6,26 = 3,74 €.

### error-absolut — D08 · N1

1. **Enunciat:** El valor exacte és 2,06 m i l’aproximació és 2,10 m. Quin és l’error absolut en metres?
   **Resposta:** 0,04
   **Nivell:** N1
   **Passos:** Error absolut = |2,06 − 2,10| = 0,04 m. Si els valors coincideixen, l’error és zero.

2. **Enunciat:** El valor exacte és 8,78 m i l’aproximació és 8,80 m. Quin és l’error absolut en metres?
   **Resposta:** 0,02
   **Nivell:** N1
   **Passos:** Error absolut = |8,78 − 8,80| = 0,02 m. Si els valors coincideixen, l’error és zero.

3. **Enunciat:** El valor exacte és 8,70 m i l’aproximació és 8,70 m. Quin és l’error absolut en metres?
   **Resposta:** 0,00
   **Nivell:** N1
   **Passos:** Error absolut = |8,70 − 8,70| = 0,00 m. Si els valors coincideixen, l’error és zero.

### error-relatiu-percentual — D09 · N2

1. **Enunciat:** Valor exacte: 9,00. Aproximació: 7,92. Quin és l’error relatiu en percentatge?
   **Resposta:** 12
   **Nivell:** N2
   **Passos:** Error absolut: 1,08. Error relatiu: 1,08 ÷ 9,00 × 100 = 12%.

2. **Enunciat:** Valor exacte: 5,00. Aproximació: 4,00. Quin és l’error relatiu en percentatge?
   **Resposta:** 20
   **Nivell:** N2
   **Passos:** Error absolut: 1,00. Error relatiu: 1,00 ÷ 5,00 × 100 = 20%.

3. **Enunciat:** Valor exacte: 15,00. Aproximació: 14,85. Quin és l’error relatiu en percentatge?
   **Resposta:** 1
   **Nivell:** N2
   **Passos:** Error absolut: 0,15. Error relatiu: 0,15 ÷ 15,00 × 100 = 1%.

### divisio-unitaria-contextual — D10 · N1

1. **Enunciat:** 12 llibretes iguals costen 19,44 €. Quant val cada llibreta?
   **Resposta:** 1,62
   **Nivell:** N1
   **Passos:** Divideix el total pel nombre de llibretes: 19,44 ÷ 12 = 1,62 €. Comprova: 1,62 × 12 = 19,44 €.

2. **Enunciat:** 8 llibretes iguals costen 19,68 €. Quant val cada llibreta?
   **Resposta:** 2,46
   **Nivell:** N1
   **Passos:** Divideix el total pel nombre de llibretes: 19,68 ÷ 8 = 2,46 €. Comprova: 2,46 × 8 = 19,68 €.

3. **Enunciat:** 5 llibretes iguals costen 9,85 €. Quant val cada llibreta?
   **Resposta:** 1,97
   **Nivell:** N1
   **Passos:** Divideix el total pel nombre de llibretes: 9,85 ÷ 5 = 1,97 €. Comprova: 1,97 × 5 = 9,85 €.

### repartiment-amb-residu-decimal — D11 · N2

1. **Enunciat:** Una corda de 39,2 m es talla en trossos de 3,4 m. Quants trossos complets obtens i quants metres sobren?
   **Resposta:** 11; 1,8
   **Nivell:** N2
   **Passos:** Treballa en dècimes de metre: 392 = 34 × 11 + 18. Obtens 11 trossos i sobren 1,8 m. Comprovació: 39,2 = 11 × 3,4 + 1,8; 0 ≤ 1,8 < 3,4.

2. **Enunciat:** Una corda de 23,0 m es talla en trossos de 2,7 m. Quants trossos complets obtens i quants metres sobren?
   **Resposta:** 8; 1,4
   **Nivell:** N2
   **Passos:** Treballa en dècimes de metre: 230 = 27 × 8 + 14. Obtens 8 trossos i sobren 1,4 m. Comprovació: 23,0 = 8 × 2,7 + 1,4; 0 ≤ 1,4 < 2,7.

3. **Enunciat:** Una corda de 31,0 m es talla en trossos de 1,9 m. Quants trossos complets obtens i quants metres sobren?
   **Resposta:** 16; 0,6
   **Nivell:** N2
   **Passos:** Treballa en dècimes de metre: 310 = 19 × 16 + 6. Obtens 16 trossos i sobren 0,6 m. Comprovació: 31,0 = 16 × 1,9 + 0,6; 0 ≤ 0,6 < 1,9.

### mitjana-decimal — D12 · N2

1. **Enunciat:** Les notes són 8,6; 6,5; 4,6; 6,6. Calcula la mitjana exacta.
   **Resposta:** 6,575
   **Nivell:** N2
   **Passos:** Suma: 26,3. Mitjana exacta: 26,3 ÷ 4 = 6,575. Conserva el valor exacte, sense arrodonir.

2. **Enunciat:** Les notes són 8,0; 4,3; 7,8; 9,3. Calcula la mitjana arrodonida a centèsimes (dues xifres decimals).
   **Resposta:** 7,35
   **Nivell:** N2
   **Passos:** Suma: 29,4. Mitjana exacta: 29,4 ÷ 4 = 7,350. Arrodonida a centèsimes: 7,35.

3. **Enunciat:** Les notes són 6,1; 6,9; 5,1; 8,7. Calcula la mitjana arrodonida a centèsimes (dues xifres decimals).
   **Resposta:** 6,70
   **Nivell:** N2
   **Passos:** Suma: 26,8. Mitjana exacta: 26,8 ÷ 4 = 6,700. Arrodonida a centèsimes: 6,70.

### garantia-amb-error-de-mesura — D13 · N3

1. **Enunciat:** Cada ampolla conté 0,52 L, amb error absolut com a màxim 0,04 L. El contingut de cada ampolla pot ser qualsevol valor dins d'aquest marge. Vols abocar-les SENCERES en un dipòsit de 2,33 L i garantir almenys 1,61 L sense que mai vessi. Quin és el nombre mínim d'ampolles que ho garanteix? Respon 0 si no n'hi ha cap.
   **Resposta:** 4
   **Nivell:** N3
   **Passos:** Cada ampolla pot contenir entre 0,48 i 0,56 L. Per garantir la quantitat calen com a mínim 4 ampolles. Per no vessar se'n poden abocar com a màxim 4. El mínim compatible és 4.

2. **Enunciat:** Cada ampolla conté 0,57 L, amb error absolut com a màxim 0,01 L. El contingut de cada ampolla pot ser qualsevol valor dins d'aquest marge. Vols abocar-les SENCERES en un dipòsit de 4,06 L i garantir almenys 4,00 L sense que mai vessi. Quin és el nombre mínim d'ampolles que ho garanteix? Respon 0 si no n'hi ha cap.
   **Resposta:** 0
   **Nivell:** N3
   **Passos:** Cada ampolla pot contenir entre 0,56 i 0,58 L. Per garantir la quantitat calen com a mínim 8 ampolles. Per no vessar se'n poden abocar com a màxim 7. Els límits són incompatibles: cap nombre d’ampolles ho garanteix; resposta 0.

3. **Enunciat:** Cada ampolla conté 0,48 L, amb error absolut com a màxim 0,04 L. El contingut de cada ampolla pot ser qualsevol valor dins d'aquest marge. Vols abocar-les SENCERES en un dipòsit de 4,01 L i garantir almenys 2,86 L sense que mai vessi. Quin és el nombre mínim d'ampolles que ho garanteix? Respon 0 si no n'hi ha cap.
   **Resposta:** 7
   **Nivell:** N3
   **Passos:** Cada ampolla pot contenir entre 0,44 i 0,52 L. Per garantir la quantitat calen com a mínim 7 ampolles. Per no vessar se'n poden abocar com a màxim 7. El mínim compatible és 7.

### valor-posicional-decimal — D14 · N1

1. **Enunciat:** Quina posició ocupa el 9 a 6,090?
   **Resposta:** centèsimes
   **Nivell:** N1
   **Passos:** Després de la coma hi ha dècimes, centèsimes i mil·lèsimes. El 9 és a les centèsimes i val 0,09.

2. **Enunciat:** Quin valor té el 1 a 5,016?
   **Resposta:** 0,01
   **Nivell:** N1
   **Passos:** Després de la coma hi ha dècimes, centèsimes i mil·lèsimes. El 1 és a les centèsimes i val 0,01.

3. **Enunciat:** Quina posició ocupa el 6 a 3,063?
   **Resposta:** centèsimes
   **Nivell:** N1
   **Passos:** Després de la coma hi ha dècimes, centèsimes i mil·lèsimes. El 6 és a les centèsimes i val 0,06.

### comparacio-i-ordenacio-decimal — D15 · N1

1. **Enunciat:** Completa amb &lt;, &gt; o =: 1,5 □ 1,50.
   **Resposta:** =
   **Nivell:** N1
   **Passos:** 1,5 i 1,50 representen exactament el mateix valor: afegir zeros finals no el canvia.

2. **Enunciat:** Completa amb &lt;, &gt; o =: 3,5 □ 3,50.
   **Resposta:** =
   **Nivell:** N1
   **Passos:** 3,5 i 3,50 representen exactament el mateix valor: afegir zeros finals no el canvia.

3. **Enunciat:** Ordena de menor a major amb el signe &lt;: 5,9; 5,09; 5,109.
   **Resposta:** 5,09 < 5,109 < 5,9
   **Nivell:** N1
   **Passos:** Afegeix zeros: 5,090 < 5,109 < 5,900. Els zeros finals no canvien el valor.

### recta-numerica-decimal — D16 · N1

1. **Enunciat:** Quin nombre representa A? Recta de 3,00 a 3,10, amb deu intervals iguals. A és la marca 4 després de l’extrem esquerre. 3,00 A 3,10
   **Resposta:** 3,04
   **Nivell:** N1
   **Passos:** Entre 3,00 i 3,10 hi ha deu intervals; cada un val 0,01. A és 4 intervals després de 3,00: 3,04.

2. **Enunciat:** Quin nombre representa A? Recta de 7,00 a 7,10, amb deu intervals iguals. A és la marca 9 després de l’extrem esquerre. 7,00 A 7,10
   **Resposta:** 7,09
   **Nivell:** N1
   **Passos:** Entre 7,00 i 7,10 hi ha deu intervals; cada un val 0,01. A és 9 intervals després de 7,00: 7,09.

3. **Enunciat:** Quin nombre representa A? Recta de 8,40 a 8,50, amb deu intervals iguals. A és la marca 5 després de l’extrem esquerre. 8,40 A 8,50
   **Resposta:** 8,45
   **Nivell:** N1
   **Passos:** Entre 8,40 i 8,50 hi ha deu intervals; cada un val 0,01. A és 5 intervals després de 8,40: 8,45.

### divisio-decimal-per-decimal — D18 · N2

1. **Enunciat:** Calcula 1,50 ÷ 0,6.
   **Resposta:** 2,5
   **Nivell:** N2
   **Passos:** Multiplica dividend i divisor per 10: 15,0 ÷ 6. El quocient no canvia perquè multipliques totes dues quantitats pel mateix factor. Resultat: 2,5.

2. **Enunciat:** Calcula 3,50 ÷ 0,5.
   **Resposta:** 7,0
   **Nivell:** N2
   **Passos:** Multiplica dividend i divisor per 10: 35,0 ÷ 5. El quocient no canvia perquè multipliques totes dues quantitats pel mateix factor. Resultat: 7,0.

3. **Enunciat:** Calcula 0,62 ÷ 0,2.
   **Resposta:** 3,1
   **Nivell:** N2
   **Passos:** Multiplica dividend i divisor per 10: 6,2 ÷ 2. El quocient no canvia perquè multipliques totes dues quantitats pel mateix factor. Resultat: 3,1.

### operar-amb-potencies-de-deu — D19 · N1

1. **Enunciat:** Calcula 71 ÷ 100.
   **Resposta:** 0,71
   **Nivell:** N1
   **Passos:** Cada xifra passa 2 posicions cap a un valor menor: cada pas divideix el seu valor per 10. Resultat: 0,71.

2. **Enunciat:** Calcula 60 ÷ 100.
   **Resposta:** 0,60
   **Nivell:** N1
   **Passos:** Cada xifra passa 2 posicions cap a un valor menor: cada pas divideix el seu valor per 10. Resultat: 0,60.

3. **Enunciat:** Calcula 65 ÷ 10.
   **Resposta:** 6,5
   **Nivell:** N1
   **Passos:** Cada xifra passa 1 posicions cap a un valor menor: cada pas divideix el seu valor per 10. Resultat: 6,5.

### construccio-entre-decimals — D20 · N1

1. **Enunciat:** Escriu un nombre amb dues xifres decimals estrictament entre 6,4 i 6,5.
   **Resposta:** 6,45
   **Nivell:** N1
   **Passos:** Els extrems no s’inclouen. Qualsevol centèsima des de 6,41 fins a 6,49 serveix; per exemple 6,45.

2. **Enunciat:** Escriu un nombre amb dues xifres decimals estrictament entre 1,0 i 1,1.
   **Resposta:** 1,05
   **Nivell:** N1
   **Passos:** Els extrems no s’inclouen. Qualsevol centèsima des de 1,01 fins a 1,09 serveix; per exemple 1,05.

3. **Enunciat:** Escriu un nombre amb dues xifres decimals estrictament entre 4,5 i 4,6.
   **Resposta:** 4,55
   **Nivell:** N1
   **Passos:** Els extrems no s’inclouen. Qualsevol centèsima des de 4,51 fins a 4,59 serveix; per exemple 4,55.

### reconstruccio-xifra-amb-cotes — D21 · N2

1. **Enunciat:** Completa 1,□4 perquè sigui estrictament més gran que 1,54 i més petit que 1,74. Escriu només la xifra.
   **Resposta:** 6
   **Nivell:** N2
   **Passos:** Prova les xifres de 0 a 9: només 6 compleix totes dues desigualtats. 1,54 < 1,64 < 1,74.

2. **Enunciat:** Completa 4,□4 perquè sigui estrictament més gran que 4,24 i més petit que 4,44. Escriu només la xifra.
   **Resposta:** 3
   **Nivell:** N2
   **Passos:** Prova les xifres de 0 a 9: només 3 compleix totes dues desigualtats. 4,24 < 4,34 < 4,44.

3. **Enunciat:** Completa 9,□5 perquè sigui estrictament més gran que 9,25 i més petit que 9,45. Escriu només la xifra.
   **Resposta:** 3
   **Nivell:** N2
   **Passos:** Prova les xifres de 0 a 9: només 3 compleix totes dues desigualtats. 9,25 < 9,35 < 9,45.

### diagnosi-errors-operacions-decimals — D22 · N2

1. **Enunciat:** Una alumna diu que 17,8 ÷ 0,2 = 890, perquè només multiplica el dividend per 10. Indica el motiu de l’error i el resultat correcte.
   **Resposta:** Ha multiplicat només el dividend i ha canviat el quocient.; 89
   **Nivell:** N2
   **Passos:** Multiplica dividend i divisor per 10: 178 ÷ 2 = 89. Canviar només el dividend multiplica el quocient per 10.

2. **Enunciat:** Una alumna suma 5,4 + 0,25 alineant les darreres xifres i obté 0,79. Indica el motiu de l’error i el resultat correcte.
   **Resposta:** Ha alineat les darreres xifres en lloc de les comes.; 5,65
   **Nivell:** N2
   **Passos:** Cal escriure 5,40 + 0,25, alineant les comes. Resultat: 5,65.

3. **Enunciat:** Una alumna diu que 13,0 ÷ 0,2 = 650, perquè només multiplica el dividend per 10. Indica el motiu de l’error i el resultat correcte.
   **Resposta:** Ha multiplicat només el dividend i ha canviat el quocient.; 65
   **Nivell:** N2
   **Passos:** Multiplica dividend i divisor per 10: 130 ÷ 2 = 65. Canviar només el dividend multiplica el quocient per 10.

### estimacio-producte-decimal — D23 · N3

1. **Enunciat:** Sense calcular exactament 6,9 × 5,1, escull l’interval que conté el producte.
   **Resposta:** Entre 34 i 36
   **Nivell:** N3
   **Passos:** Escriu els factors com (7 − 0,1) i (5 + 0,1). El producte es diferencia de 7 × 5 = 35 en 0,1 × (7 − 5) − 0,01, una quantitat entre −1 i 1. Per tant 34 < producte < 36. Els altres intervals en queden fora.

2. **Enunciat:** Sense calcular exactament 7,9 × 2,1, escull l’interval que conté el producte.
   **Resposta:** Entre 15 i 17
   **Nivell:** N3
   **Passos:** Escriu els factors com (8 − 0,1) i (2 + 0,1). El producte es diferencia de 8 × 2 = 16 en 0,1 × (8 − 2) − 0,01, una quantitat entre −1 i 1. Per tant 15 < producte < 17. Els altres intervals en queden fora.

3. **Enunciat:** Sense calcular exactament 4,9 × 4,1, escull l’interval que conté el producte.
   **Resposta:** Entre 19 i 21
   **Nivell:** N3
   **Passos:** Escriu els factors com (5 − 0,1) i (4 + 0,1). El producte es diferencia de 5 × 4 = 20 en 0,1 × (5 − 4) − 0,01, una quantitat entre −1 i 1. Per tant 19 < producte < 21. Els altres intervals en queden fora.

## Errors freqüents a prevenir

- Alinear les xifres per la dreta en lloc d’alinear les comes en sumes i restes.
- Comptar malament les xifres decimals totals en un producte o moure només una coma en una divisió.
- Tallar el residu com si fos un nombre enter sense convertir-lo a la unitat indicada.
- Arrodonir abans d’acabar una mitjana o no conservar les xifres decimals exigides.
- Confondre error absolut amb error relatiu; dividir pel valor aproximat en comptes del valor exacte.
- Ordenar per nombre de xifres decimals sense completar zeros finals.
- Acceptar els extrems en D20/D21 tot i que l’enunciat diu «estrictament».
- Donar per possible una garantia sense verificar tant el mínim de contingut com la capacitat màxima.

## Canvis implementats

- Afegit un catàleg explícit de 20 famílies, amb generadors variants i una única dificultat per família.
- La pràctica adaptativa selecciona una família i alterna els seus generadors variants.
- El classificador compartit consulta la família decimal, no el tipus brut del generador.
- La generació legacy d’exàmens cobreix D01–D23 i manté `q.type` numèric per compatibilitat; això fa accessibles les famílies N3 als exàmens.
- El banc AMP sincronitza `diff` i `taskDifficulty`; les seves sis variants cobreixen 2 N1, 4 N2 i 0 N3.
- El test de navegador verifica els 23 ancoratges per ID, distingeix seccions i `<details>`, i comprova hash directe, `hashchange`, contingut i exemples sense exigir una entrada de menú per procediment.
- No s’han canviat teoria, CSS, progressió, nombre d’exercicis ni el registre definitiu de famílies.

## Resultats de validació

- `scripts/comprova-decimals-families.cjs`: **PASS** — 5.750 generacions (250 per cadascun dels 23 generadors), 5.750 comprovacions de dificultat compartida, 5.750 comprovacions de corrector/oracle i distractors únics en 5.750 mostres. Inclou proves de zeros equivalents i arrodoniment de casos límit.
- `scripts/comprova-decimals-1eso.cjs`: **PASS a Chrome/Chromium** — sessions adaptatives guiades/autònomes, rotació i cobertura de totes les 8 famílies N1, exàmens de tema/global, banc contextual i teoria; nivells d’examen 4/4/4 i 12/20 preguntes. Execució en còpia aïllada amb els fitxers modificats de la branca.
- La còpia local del test Edge ha fallat a l’arrencada per restricció del perfil temporal del sandbox (Edge error `-5` en substituir `SiteList-Enterprise.json`). La mateixa suite s’ha executat amb Chrome, disponible a l’entorn, i ha passat.
- `node --check` ha passat per als dos scripts de test i els mòduls JavaScript modificats.
- No s’ha executat el workflow de CI de GitHub ni s’ha fet prova d’integració sobre un clone Git local: el workspace actiu no és un checkout del repositori i conté altres còpies de projecte. Les fonts de la prova aïllada s’han recuperat de `main` i s’han verificat contra els fitxers modificats.

## Fitxers de la PR

- `assets/js/decimals-1eso.js`
- `assets/js/dificultat-mi.js`
- `1eso/sentit-numeric.html`
- `scripts/comprova-decimals-1eso.cjs`
- `scripts/comprova-decimals-families.cjs` (nou)
- `docs/auditoria/MI_1ESO_nombres_decimals_informe_final.md` (aquest informe)

## Validació local a Windows CMD

Des de l’arrel del repositori:

```cmd
node --check assets\js\decimals-1eso.js
node --check assets\js\dificultat-mi.js
node --check scripts\comprova-decimals-families.cjs
node scripts\comprova-decimals-families.cjs
node --check scripts\comprova-decimals-1eso.cjs
node scripts\comprova-decimals-1eso.cjs
```

El test de navegador utilitza Playwright i Edge a la ruta configurada al script. Si Edge no s’inicia, la sortida s’ha de marcar com a pendent; en aquest entorn Chrome/Chromium s’ha provat com a substitut.

## Pendent de validació humana

- Revisar que l’agrupació de suma/resta, multiplicació i conversió reflecteix la granularitat didàctica desitjada.
- Revisar la dificultat N3 dels reptes de garantia i estimació; no s’han forçat famílies addicionals.
- Revisar el diff de la PR abans del merge. El registre `families-validades.json` només s’actualitzarà després del merge i de la validació final.