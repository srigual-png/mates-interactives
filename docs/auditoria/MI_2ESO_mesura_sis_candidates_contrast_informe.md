# Sis candidates condicionades: contrast de dotze casos · Mesura 2n ESO

**Estat:** exercicis d'anàlisi documental, no nous generadors, nivells N3 ni famílies aprovades. Dades: [MI_2ESO_mesura_sis_candidates_contrast_12_casos.json](MI_2ESO_mesura_sis_candidates_contrast_12_casos.json).

## Casos contrastats

| Proposta | Cas favorable | Cas contrari / límit | Interpretació |
|---|---|---|---|
| Unitats: capacitat mínima suficient | S'han de guardar 600 L: entre 500, 650 i 800 L, el mínim viable és 650 L | 580 L requerits i recipients de 450 o 550 L: **cap opció viable** | Cal prendre una decisió d'optimització amb restricció, però totes les conversions i comparacions són conegudes |
| Escales: dos plànols | 8×6 cm a 1:50 i 4×3 cm a 1:100 representen una mateixa sala de 12 m² | 8×6 cm a 1:50 i 4×4 cm a 1:100 **no** representen la mateixa sala | Comprovar la coherència de dues representacions podria diferenciar-se de calcular una escala |
| Perímetres: contorn exterior | Rectangle 6×4 m amb semicercle adossat pel costat de 4 m: contorn de **22,28 m**, inferior a 22,5 m | Rectangle 5×6 m amb semicercle adossat pel costat de 6 m: **25,42 m**, superior a 24 m | El pas substantiu és identificar la frontera externa i excloure el costat compartit |
| Superfícies: dues restriccions | Capsa oberta 4×3×2 dm: **24 L** i **40 dm²**; compleix 20 L mínims i 42 dm² màxims | La mateixa capsa amb límit de **39 dm²**: no és viable | El volum i la superfície són coneguts, però la decisió simultània pot afegir modelització |
| Estimació: tolerància | Referència 100 cm, mesures 99 i 98,5 cm, tolerància 1,2%: només la primera és acceptable | Referència 200 cm, mesures 198 i 197 cm, tolerància 1%: la primera s'accepta **exactament al límit** | El llindar d'acceptació afegeix interpretació, però el càlcul d'errors existeix |
| Problemes: compra de material | Pati 8×6 cm a 1:50, porta d'1 m i rotlles de 5 m: **13 m** de tanca, **3 rotlles** | Pati 10×10 cm a 1:50, sense porta: **20 m** de tanca, **4 rotlles exactes** | Probablement pràctica composta de procediments ja inventariats; manca evidència d'independència |

## Decisions del cribratge

**Pendents d'evidència d'estratègia diferenciada (5):** Unitats, Escales, Perímetres, Superfícies i Estimació. Han demostrat poder plantejar casos contrastats, **però no** una família nova.

**Probable reutilització composta (1):** Problemes. Els casos no introdueixen una operació o representació nova respecte a perímetre, escala, exclusió d'obertura i arrodoniment de rotlles. No és prova suficient de N3.

## Què acredita la comprovació

El validador `scripts/test-mesura-2eso-sis-candidates-contrast.cjs` recalcula independentment els **12 resultats**, verifica dos casos per cada una de les sis candidates, el tractament de resultats negatius i l'acceptació d'un llindar exacte.

**GitHub Actions #44050253823: success.** No s'ha comprovat un nou generador perquè **no s'ha implementat cap**.

## Següent porta de decisió

1. Formular per a cadascuna de les cinc candidates un criteri diferencial observable en la resolució, comparant-lo amb el procediment del tipus existent més proper.
2. Preparar criteris per distingir **família nova**, **variant de la mateixa família** i **problema compost de famílies conegudes**.
3. Determinar si el nivell N3 s'adiu amb el currículum i la càrrega cognitiva real, no amb el nombre de passos.
4. No transformar aquestes idees en generadors, registres de famílies o nivells publicats sense aprovació explícita.

Cap PR fusionada ni canvi a la web.
