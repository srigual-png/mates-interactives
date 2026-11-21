# Auditoria pedagògica Fase A — Unitats i conversions (2n ESO)

**ESTAT: PROVISIONAL — PENDENT DE REVISIÓ PEDAGÒGICA. NO IMPLEMENTADA.**

> **Reconciliació vigent (21/11/2026):** el contrast posterior assigna `unitats:16` a N2 intern i consolida U06/U07/U08 en dues candidates: U-P06 directa (`unitats:12` i `unitats:6` directa) i U-P07 composta (`unitats:6` encadenada, `unitats:16`, `unitats:18`). El mapa efectiu de la branca té 13 tipus N1 i 5 N2; `unitats:6` manté nivells diferents per variant. Les famílies són provisionals. L'anàlisi que segueix conserva el primer tall de `main` i queda superada per l'[addenda de variants](MI_2ESO_mesura_unitats_variants_addenda.md) en aquests casos.


**Fitxers inspeccionats:** `2eso/sentit-mesura.html` (línies 893–1045, registre de temes 2319–2330) i `assets/js/dificultat-mi.js` (línies 9, 11, 390–392, 610–620, 657, 686–746, 777–795). **Origen:** `main` després de la PR #47; SHA de referència `086d7b725db59ebb99266352e84ef8d9470a7d17`. Revisió estàtica del codi; no s'han executat proves de navegador ni mostreig aleatori.

## 1. Quin nivell assigna realment la web?

Per a `2eso/mesura`, el mapa `REVIEWED_LEVELS` de `assets/js/dificultat-mi.js:9` s'utilitza en `classify` via `reviewedLevels` i `mappedLevel` (línies 657 i 744–795). A diferència del mapa històric de `level()` (línies 611–620), **aquest mapa revisat té prioritat**.

- **N1 efectiu — 13 tipus base:** 1, 2, 3, 4, 5, 6, 7, 8, 11, 12, 13, 14, 17.
- **N2 efectiu — 5 tipus:** 9, 10, 15, 16, 18; el tipus 6 també té una variant encadenada N2, mentre que la base és N1.
- **N3 efectiu:** cap.
- Un mapa antic de `level()` encara especifica N1={1,2,3,7,8}, N2={4,5,6,9,11,12,14,16}, N3={10,13,15,17,18}. **No és correcte presentar-lo com a nivell efectiu de l'exercici ordinari.** Cal retirar-lo o conciliar-lo en una futura PR de codi, només quan s'acordi la nova classificació.
- `REVIEWED_VARIANTS` separa ara la branca encadenada de `unitats:6` com a N2; la classificació N2 de `unitats:16` queda aplicada al mapa intern, no al currículum oficial.

## 2. Matriu provisional: 11 famílies genuïnes candidates, 18 tipus coberts

| ID | Procediment matemàtic diferenciat | Tipus | Actual efectiu | Nivell orientatiu | Justificació / observacions |
|---|---|---|---|---|---|
| U01 | Conversió decimal lineal (longitud, massa, capacitat) | 1,4,5 | N1 | **N1** | Mateix procediment de prefix i factor 10^k; canviar la magnitud no genera necessàriament una família |
| U02 | Conversió d'unitats de superfície | 2,11 | N1 | **N1** | Factor per dues dimensions; el context «sala» de 11 no és un procediment nou |
| U03 | Conversió d'unitats de volum | 3 | N1 | **N1** | Factor per tres dimensions, error conceptual específic respecte a la superfície |
| U04 | Triar la magnitud i una unitat adequada al context | 7 | N1 | **N1** | Reconeixement directe, distractors majoritàriament d'altres magnituds |
| U05 | Reconèixer factors dimensionals d'àrea i volum | 8,14 | N1 | **N1** | Identificar factor i equivalència unitària; 8 i 14 són formats de resposta del mateix principi |
| U06 | Equivalència volum–capacitat directa | 12, 6 directa | N1 | **N1** | Aplicar `dm³↔L` o `cm³↔mL` sense canvi de prefix addicional |
| U08 | Conversió volum–capacitat composta | 6 encadenada, 16, 18 | N2 | **N2** | Enllaçar equivalència amb canvi d'escala; `unitats:16` manté aquest procediment encara que es respongui amb una selecció |
| U09 | Comparar magnituds després d'unificar unitats | 9 | N2 | **N2** | Una conversió i una decisió de comparació |
| U10 | Combinar magnituds homogènies expressades en diferents unitats | 10,15 | N2 | **N2** | Conversió prèvia i suma; en 15 cal convertir dues superfícies |
| U11 | Comprovar conversions i diagnosticar errors | 13,17 | N1 | **N1/N2 segons variant** | 13 barreja igualtats correctes (validació directa) i una errònia amb diagnòstic; 17 revela força la resposta amb distractors poc plausibles. **No elevar indiscriminadament aquests tipus a N2** |

**Distribució orientativa després del contrast:** U01–U06 són candidates N1; U08–U10 són candidates N2; U11 continua mixt. Són **10 famílies candidates com a màxim**, no un recompte final. Cap N3 genuí no està justificat per les branques inspeccionades. El fet de tenir menys de 15 famílies o 0 N3 no autoritza crear-ne d'artificials.

Les onze famílies es diferencien per l'objectiu o el raonament; dins U01 i U10 hi ha variants de magnitud, però no necessàriament un nou procediment. U05 i U11 són famílies de valoració de regles o errors i no de càlcul directe. Les coincidències amb els altres sis temes de mesura resten pendents de contrastar.

## 3. Exemples resolts i errors típics (dos exemples per família)

Aquests exemples són **representatius construïts a partir dels procediments del codi**, no resultats d'una execució aleatòria del generador; les magnituds, unitats i relacions són comprovables aritmèticament.

**U01 — Conversió decimal lineal (N1).**
1. 2,5 m a cm: 2,5 × 100 = **250 cm**.
2. 0,8 kg a g: 0,8 × 1.000 = **800 g**.
Error: invertir el factor o comptar els salts en sentit contrari. Font: `sentit-mesura.html:897–940`.

**U02 — Conversió de superfície (N1).**
1. 3 m² a dm²: 3 × 100 = **300 dm²**.
2. 2 m² a cm²: 2 × 10.000 = **20.000 cm²**.
Error: aplicar el factor lineal 10 o 100 en lloc del factor al quadrat. Font: línies 904–910 i 979–984.

**U03 — Conversió de volum (N1).**
1. 2 m³ a dm³: 2 × 1.000 = **2.000 dm³**.
2. 0,5 dm³ a cm³: 0,5 × 1.000 = **500 cm³**.
Error: utilitzar 100 per salt en lloc de 1.000. Font: línies 911–917.

**U04 — Tria d'unitats (N1).**
1. Superfície d'una aula: magnitud de superfície → **m²**.
2. Massa d'una motxilla: magnitud de massa → **kg**.
Error: confondre longitud amb superfície o capacitat amb volum. Font: línies 941–947.

**U05 — Factors dimensionals (N1).**
1. De m² a cm²: dos salts de 100 per superfície → **× 10.000**.
2. 1 dm³ en cm³: un salt cúbic → **1.000 cm³**.
Error: oblidar elevar el factor al quadrat o al cub. Font: línies 948–957 i 995–1004.

**U06 — Equivalència dm³–L (N1).**
1. 2,4 dm³ → **2,4 L** perquè 1 dm³ = 1 L.
2. 8,75 dm³ → **8,75 L** per la mateixa equivalència.
Error: multiplicar per 1.000 en una equivalència directa. Font: línies 979–984.

**U08 — Conversió volum–capacitat composta (N2).**
1. 0,75 m³ = **750 L**: passar de m³ a dm³ i aplicar 1 dm³ = 1 L. És el mateix procediment que la branca encadenada de `unitats:6`.
2. 2.400 cm³ = **2,4 L**: passar de cm³ a mL i aplicar 1.000 mL = 1 L. El tipus 16 demana reconèixer aquesta cadena dins una igualtat; `unitats:18` també enllaça mL=cm³ amb cm³→dm³.
Error: tractar `cm³`, `dm³` i `L` com si compartissin el mateix factor. Font: tipus 16 (línies 1013–1023), variant encadenada 6 (932–940) i tipus 18 (1033–1044).

**U09 — Comparació entre unitats (N2).**
1. 1,8 m versus 165 cm: 1,8 m = 180 cm, per tant **la primera és més gran**.
2. 2,4 m versus 250 cm: 2,4 m = 240 cm, per tant **la segona és més gran**.
Error: comparar 2,4 amb 250 abans d'unificar unitats. Font: línies 958–964.

**U10 — Sumar mesures en unitats diferents (N2).**
1. 1,5 m + 40 cm: 150 + 40 = **190 cm**.
2. 0,6 m² + 2.400 cm², en dm²: 60 + 24 = **84 dm²**.
Error: sumar sense convertir totes les magnituds a la unitat demanada. Font: línies 965–971 i 1005–1012.

**U11 — Validació i diagnòstic d'errors (pendent N1/N2 segons variant).**
1. «3,2 m² = 320 dm²» → **correcte**, perquè 3,2 × 100 = 320 (**validació directa, N1**).
2. «4 m² = 400 cm²» → **incorrecte**, ja que 4 × 10.000 = **40.000 cm²** (diagnòstic de confusió entre llargada i superfície, **candidat N2**).
Error: donar per vàlida qualsevol multiplicació per 100 sense considerar les dimensions. Font: línies 985–994 i 1024–1032.

## 4. Discrepàncies i decisions pendents

1. **Classificador duplicat:** `REVIEWED_LEVELS` (línia 9) i el mapa antic dins `level()` (línia 611) discrepen; el revisat preval en la ruta normal de pràctica. Qualsevol eina que llegeixi únicament el mapa antic donaria una auditoria errònia.
2. **Tipus 6 (N1 actual):** casos directes (dm³→L, cm³→mL) i casos de dos passos (m³→L, L→cm³, L→m³) exigeixen procediments diferents. Proposta: afegir una clau estable de variant al generador i classificar-la abans de modificar el nivell.
3. **Tipus 18 (N1 actual):** mL→cm³→dm³ és un procediment de dos passos; **proposta provisional N2**, pendent de revisar si només s'avalua com a conversió ja automatitzada.
4. **Tipus 13 (N1 actual):** tres igualtats correctes i una incorrecta; distingir validació simple del diagnòstic. No elevar tot el tipus a N2 perquè només una branca exigeixi una reflexió diferent.
5. **Tipus 17 (N1 actual):** la formulació d'error és explícita i diversos distractors són trivials. Mantenir N1 provisionalment o enriquir distractors i argumentació per justificar N2; no alterar el nivell sense modificar/avaluar la tasca real.
6. **N3:** cap de les 18 branques no presenta un problema de reconstrucció o restriccions no immediates que justifiqui N3. **No inventar reptes** per completar una quota.
7. **Cobertura:** els tipus 1–18 apareixen cadascun exactament una vegada a la matriu; els conjunts de variants de 6, 13 i 17 requereixen inspecció més detallada abans de formalitzar una font única família→nivell.
8. **Currículum:** l'àmbit s'ha contrastat amb el contingut del tema a la web, però **no** amb un document normatiu curricular extern en aquesta passada; la comprovació curricular formal queda pendent.

## 5. Validacions i criteris de tancament

- Fet: lectura del codi del generador, dels 18 tipus, de la llista `TOPICS` i dels mapes de dificultat amb la seva precedència efectiva; càlcul manual dels exemples.
- No fet: execució de mostres automàtiques amb Playwright, oracles independents de cada tipus, comprovació de la rotació/famílies, exàmens, fitxes ni avaluació humana dels nivells.
- **Estat del tema: PROVISIONAL**. No editar `docs/auditoria/families-validades.json`, ni declarar les onze famílies com a validades.
- **Canvi aplicat en aquesta branca:** tipus 6 separat per variants, `unitats:16` N2 intern i `unitats:18` N2. Resten per contrastar millor les variants i els distractors de 13/17; no impliquen una reclassificació automàtica. Les famílies continuen provisionals.


**Actualització posterior (21/11/2026):** el mapa intern actual té 13 tipus N1 i 5 tipus N2; `unitats:6` conserva la branca directa a N1 i la branca encadenada a N2. El tipus 16 s'ha aplicat a N2 i s'agrupa provisionalment amb la conversió composta U-P07. La família és candidata, no oficial.
