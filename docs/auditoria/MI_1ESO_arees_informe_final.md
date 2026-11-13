# Auditoria i informe final — Àrees de 1r d’ESO

## Abast i criteri

Aquesta auditoria consolida les famílies que produeixen exercicis del tema Àrees a la pràctica de sentit de la mesura. La base de treball és `main` a `ec5c6e5cdc3b534d6ae8473120eda20e098b0ea6` (després de la PR #28). S’han contrastat els generadors, el classificador compartit, els bancs contextuals A01–A07 i el flux de pràctica i proves.

La classificació agrupa procediments matemàtics, no identificadors de generador. Una mateixa família pot tenir formes geomètriques o variants contextuals diferents. L’arrel quadrada de l’àrea d’un quadrat es manté com a procediment de 1r: les orientacions curriculars l’esmenten explícitament com la cerca del costat a partir de l’àrea. Els exercicis només empren quadrats perfectes, de manera que no demanen arrels irracionals. L’àrea de polígons per descomposició també és explícita al currículum. [Orientacions curriculars de Matemàtiques per cursos, XTEC](https://xtec.gencat.cat/web/.content/curriculum/eso/concrecions-curriculars/Orientacions-curriculars_MAT_SEC_per-cursos.pdf)

S’han exclòs activitats d’escala àrea/factor d’escala: no cal afegir aquest procediment per cobrir l’objectiu curricular del tema.

## Catàleg definitiu

| ID estable | Família matemàtica | Nivell anterior | Nivell final | Generadors i variants |
|---|---|---:|---:|---|
| `producte-base-alcada` | Multiplicar base per alçada per calcular una àrea | N1 | N1 | Raw 1 (quadrat), 2 (rectangle), 7 (paral·lelogram) |
| `meitat-producte-dimensions` | Prendre la meitat del producte de dues dimensions | N1 | N1 | Raw 3 (triangle), 4 (rombe) |
| `comptar-quadrats-unitat` | Mesurar una regió comptant quadrats unitaris | Nova | N1 | Catàleg 1003 |
| `area-trapezi` | Calcular l’àrea d’un trapezi | N1 | N2 | Raw 5 |
| `compondre-arees-figures` | Combinar àrees de parts sense solapament | Raw 6: N1; bancs: N2 | N2 | Raw 6 (retall), catàleg 1002 (rectangle + triangle), A03/A06 |
| `costat-quadrat-des-de-larea` | Reconstruir el costat d’un quadrat a partir de l’àrea | Nova | N2 | Catàleg 1004; arrel quadrada exacta |
| `reconstruir-dimensio-rectangle-area` | Reconstruir una dimensió rectangular a partir de l’àrea | A04: N1 | N2 | Catàleg 1005, A04 |
| `reconstruir-dimensio-meitat-producte` | Reconstruir una dimensió d’una àrea de mig producte | Nova | N2 | Catàleg 1006 (triangle o rombe) |
| `reconstruir-dimensio-trapezi` | Reconstruir una base o l’alçada del trapezi | Nova | N2 | Catàleg 1007 |
| `comparar-arees` | Calcular i comparar dues àrees | N2 | N2 | Catàleg 1008, A07 |
| `cobrir-superficie` | Calcular peces senceres per cobrir una superfície | N2 | N2 | Catàleg 1009, A01/A02 |
| `cost-per-superficie` | Calcular el cost d’una superfície | N2 | N2 | Catàleg 1010, A05 |
| `diagnosticar-error-area` | Detectar i corregir errors en fórmules d’àrea | Nova | N2 | Catàleg 1011 |
| `reconstruir-dimensio-figura-composta` | Reconstruir una dimensió d’una figura composta | Nova | N2 | Catàleg 1012 |
| `perimetre-minim-amb-area-fixada` | Minimitzar el perímetre amb una àrea fixa | N3 | N3 | Catàleg 1001; parelles de factors enters |

**Distribució final:** 15 famílies: **3 N1, 11 N2 i 1 N3**.

### Canvis de nivell i decisions

- **Trapezi, N1 → N2:** cal sumar dues bases, multiplicar per l’altura perpendicular i dividir per dos; és una combinació de passos, més exigent que aplicar directament el producte rectangle.
- **Figura composta per resta, N1 → N2:** primer s’obté l’àrea de la figura completa i després se’n resta la part retallada. Les variants de suma (A03/A06 i catàleg 1002) són el mateix procediment de composició, amb operació inversa.
- **A04, N1 → N2:** l’enunciat contextual dona l’àrea d’un rectangle compost i exigeix aïllar una dimensió mitjançant divisió. És equivalent al catàleg 1005; no és una família separada.
- **Conversió d’àrea del costat del quadrat, incorporada a N2:** es limita a quadrats perfectes i una arrel exacta. És una reconstrucció inversa contextual del model quadrat, adequada al curs; no incorpora nombres irracionals.
- **N1 directe:** àrees de producte i meitat del producte, incloent-hi quadrat/rectangle/paral·lelogram i triangle/rombe, són variants de dues regles. Comptar-les com cinc famílies duplicaria procediments.

### Frontera amb perímetres

`perimetre-minim-amb-area-fixada` es conserva provisionalment al tema Àrees perquè la dada fixa és l’àrea i cal enumerar-ne les dimensions enteres compatibles abans de comparar perímetres. La família de la PR #28 resol el problema dual (perímetre fixat, maximitzar àrea amb restriccions); no és la mateixa optimització. Aquesta frontera queda documentada per evitar duplicar generadors.

## Tres exemples resolts per família

Els exemples següents mostren variants i procediments representatius. Totes les respostes inclouen unitat quadrada quan es tracta d’una àrea. N1/N2/N3 són els nivells finals.

### N1

**1. Multiplicar base per alçada — N1**
1. Rectangle de 8 cm × 5 cm: (A=8×5=40) → **40 cm²**.
2. Quadrat de costat 9 cm: (A=9×9=81) → **81 cm²**.
3. Paral·lelogram de base 12 cm i altura perpendicular 7 cm: (A=12×7=84) → **84 cm²**.

**2. Meitat del producte de dues dimensions — N1**
1. Triangle de base 10 cm i altura perpendicular 6 cm: (A=(10×6)/2) → **30 cm²**.
2. Rombe de diagonals 8 cm i 6 cm: (A=(8×6)/2) → **24 cm²**.
3. Triangle de base 13 cm i altura perpendicular 4 cm: (A=(13×4)/2) → **26 cm²**.

**3. Comptar quadrats unitaris — N1**
1. Files amb 4, 4 i 3 cel·les d’1 cm²: (4+4+3) → **11 cm²**.
2. Files amb 2, 3, 4 i 3 cel·les d’1 cm²: (2+3+4+3) → **12 cm²**.
3. Files amb 5, 4 i 4 cel·les d’1 cm²: (5+4+4) → **13 cm²**.

### N2

**4. Calcular l’àrea d’un trapezi — N2**
1. Bases 12 cm i 8 cm, altura 5 cm: (((12+8)×5)/2) → **50 cm²**.
2. Bases 15 cm i 9 cm, altura 4 cm: (((15+9)×4)/2) → **48 cm²**.
3. Bases 10 cm i 6 cm, altura 7 cm: (((10+6)×7)/2) → **56 cm²**.

**5. Combinar àrees de parts sense solapament — N2**
1. Placa 12×8 cm amb retall 4×3 cm: (96-12) → **84 cm²**.
2. Rectangle 10×6 cm i triangle adjacent de base 4 cm i altura 3 cm: (60+6) → **66 cm²**.
3. Figura formada per dos rectangles de 7×4 cm i 3×4 cm: (28+12) → **40 cm²**.

**6. Reconstruir el costat d’un quadrat — N2**
1. Àrea 144 cm²: (sqrt{144}) → **12 cm**.
2. Àrea 225 cm²: (sqrt{225}) → **15 cm**.
3. Àrea 400 cm²: (sqrt{400}) → **20 cm**.

**7. Reconstruir una dimensió d’un rectangle — N2**
1. Àrea 72 m² i base 9 m: (72÷9) → **8 m d’altura**.
2. Àrea 96 m² i altura 12 m: (96÷12) → **8 m de base**.
3. Àrea 150 m² i base 10 m: (150÷10) → **15 m d’altura**.

**8. Reconstruir una dimensió d’una àrea de mig producte — N2**
1. Triangle d’àrea 42 cm² i base 12 cm: (2×42÷12) → **7 cm d’altura**.
2. Rombe d’àrea 60 cm² i diagonal 10 cm: (2×60÷10) → **12 cm l’altra diagonal**.
3. Triangle d’àrea 48 cm² i altura 8 cm: (2×48÷8) → **12 cm de base**.

**9. Reconstruir una base o l’altura del trapezi — N2**
1. Àrea 72 cm², bases 10 i 14 cm: (2×72÷(10+14)) → **6 cm d’altura**.
2. Àrea 54 cm², altura 6 cm, una base 9 cm: (2×54÷6-9) → **9 cm l’altra base**.
3. Àrea 96 cm², bases 10 i 14 cm: (2×96÷24) → **8 cm d’altura**.

**10. Calcular i comparar dues àrees — N2**
1. Rectangles 5×7 i 6×6 cm: àrees 35 i 36 → diferència **1 cm²**.
2. Rectangles 4×8 i 5×7 cm: àrees 32 i 35 → diferència **3 cm²**.
3. Rectangles 3×9 i 4×8 cm: àrees 27 i 32 → diferència **5 cm²**.

**11. Calcular peces per cobrir una superfície — N2**
1. Sala 5×4 m; rajola quadrada de costat 0,5 m: (20÷0,25) → **80 rajoles**.
2. Habitació 8×6 m menys una obertura 2×1 m; rajola de 0,5×0,5 m: (46÷0,25) → **184 rajoles**.
3. Superfície 7×5 m; cada pot cobreix 10 m²: (35÷10=3,5), arrodonim cap amunt → **4 pots**.

**12. Calcular el cost d’una superfície — N2**
1. Gespa triangular de base 10 m, altura 8 m, a 12 €/m²: àrea 40 m² → **480 €**.
2. Paviment rectangular de 7×9 m a 14 €/m²: àrea 63 m² → **882 €**.
3. Superfície de 18×6 m a 9 €/m²: àrea 108 m² → **972 €**.

**13. Detectar i corregir errors en fórmules d’àrea — N2**
1. Rectangle 8×5 cm amb resposta de perímetre (2(8+5)=26): àrea correcta (8×5) → **40 cm²**.
2. Triangle base 10 cm i altura 6 cm sense dividir per dos: (10×6÷2) → **30 cm²**, no 60.
3. Quadrat de costat 7 cm amb (4×7=28) com a àrea: (7×7) → **49 cm²**.

**14. Reconstruir una dimensió d’una figura composta — N2**
1. Placa 12×8 cm; en queda una àrea de 84 cm²; retall de fondària 3 cm: ((96-84)÷3) → **4 cm d’amplada**.
2. Placa 15×10 cm; en queden 132 cm²; retall de fondària 5 cm: ((150-132)÷5) → **3,6 cm d’amplada**.
3. Placa 20×12 cm; en queden 216 cm²; retall de fondària 4 cm: ((240-216)÷4) → **6 cm d’amplada**.

### N3

**15. Minimitzar el perímetre amb una àrea fixa — N3**
1. Àrea 36 cm²; parelles enteres: 1×36, 2×18, 3×12, 4×9, 6×6. Perímetre mínim: (2(6+6)) → **24 cm**, quadrat.
2. Àrea 24 m², costats enters d’almenys 2 m; parelles: 2×12, 3×8, 4×6. Perímetres 28, 22, 20 → **20 m**, dimensions 4×6 m.
3. Àrea 30 m², costats enters d’almenys 2 m; parelles: 2×15, 3×10, 5×6. Perímetres 34, 26, 22 → **22 m**, dimensions 5×6 m.

El repte N3 demana justificar que s’han comparat totes les parelles enteres de factors. No fa servir equacions avançades ni dimensions no enteres.

## Validació

### Resultats quantitatius registrats

- Test de famílies: **15 famílies**, distribució **3/11/1**; **1.750** generacions raw i **3.000** generacions del catàleg, **4.750** mostres amb resposta matemàtica verificada.
- Prova de navegador: **260** generacions de pràctica, **15** famílies distingides, sense repetició consecutiva; mostreig dels bancs contextuals A01–A07 amb **250 casos per variant (1.750)**, cada enunciat/resposta comprovat de manera independent.
- Rotació de pràctica i recuperació: sessió d’errors de **30** preguntes, **13** famílies observades; prova d’examen de tema amb **12** preguntes i examen global amb **20** preguntes.
- Regressió: **30** comprovacions cadascuna de sistema mètric decimal, conversions d’unitats, mesura del temps i perímetres.
- Navegador Chrome: escriptori **1100 px**, mòbil de pràctica i teoria **390 px**, sense errors JavaScript; ancoratge directe `#rectangle` i canvi `hashchange` cap a `#compostes`.

Les proves són mostrejos deterministes/aleatoris del codi disponible i no constitueixen una prova formal exhaustiva de tots els valors possibles.

### Incidències i limitacions

- La teoria i CSS han romàs fora dels canvis. S’han comprovat els enllaços d’ancoratge sense modificar-ne el contingut.
- La validació amb Chrome va passar en l’entorn disponible; Edge no s’ha executat.
- No s’ha verificat GitHub Pages: la branca encara no està fusionada i no hi ha un desplegament d’aquesta versió que es pugui atribuir a aquesta PR.
- El desplegament/CI remot queda pendent dels checks de GitHub després de crear la PR.

### Ordres de validació a Windows CMD

```bat
node --check scripts\comprova-arees-families-1eso.cjs
node --check scripts\comprova-arees-1eso.cjs
node scripts\comprova-arees-families-1eso.cjs
node scripts\comprova-arees-1eso.cjs
```

La prova de navegador necessita Playwright i Chrome/Chromium instal·lats i disponibles al sistema.
