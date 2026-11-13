# Informe final d’auditoria — Conversions d’unitats · 1r d’ESO

## Abast i base

- **SHA de `main` consultat:** `53d28a93350738dfec2f082bb0bb034e2b2fc776`, merge de la PR #25.
- **Tema:** `conversions`, Sentit de la mesura · 1r ESO.
- **Pàgina:** `1eso/sentit-mesura.html`.
- **Fonts revisades:** `AGENTS.md`, `docs/protocol-auditoria-temes.md`, `docs/auditoria/README.md`, registre validat, informe de Sistema Mètric Decimal, pàgina de pràctica, classificador, mòdul de raonament, banc contextual i teoria.
- La PR #25 s’ha comprovat fusionada; el seu informe i el codi de `main` coincideixen. El registre no s’ha modificat perquè aquesta PR encara és provisional.
- No s’han modificat la teoria, CSS, la progressió, el nombre d’exercicis per sessió ni altres temes funcionals.

## Auditoria dels generadors

### Generador principal `genConversionsRaw()`

| Tipus | Procediment verificat al codi | Variants / rangs |
|---|---|---|
| 1 | Convertir superfícies entre unitats quadrades | m²↔dm², m²↔cm², km²↔m² i cm²↔mm²; factors 100, 10.000 o 1.000.000 i els inversos; entrades finites de valors positius. |
| 2 | Sumar dues mesures expressades en unitats diferents | km+m, m+cm, kg+g i l+cl; valors positius i resultat en la unitat petita. És la mateixa família de mesura mixta que el type 1002 del tema `metric`. |
| 3 | Comparar dues mesures i decidir si són equivalents | longitud, massa, capacitat i superfície. Es retiren les hores/minuts: la conversió sexagesimal ja pertany a `temps`. Inclou casos equivalents i no equivalents. |
| 4 | Conversió contextual de superfície | 12 contextos de superfície; conversions directes i inverses. Els exemples lineals, de massa, capacitat i temps s’han retirat perquè duplicaven `metric` o `temps`. |

### Generadors complementaris

- Type 1001 `carrega-amb-dos-limits`: combina conversions de massa i capacitat i cerca la càrrega amb més litres subjecta a límits de massa i de nombre de caixes.
- Type 1003 `ordenar-mesures` (**nou**): converteix tres superfícies a dm², les ordena i identifica el valor central.
- Type 1004 `operar-arees-mixtes` (**nou**): suma m² i dm², resta cm² i expressa el resultat en dm².
- Type 1005 `diagnosticar-error-superficie` (**nou**): detecta l’ús del factor lineal en lloc del quadràtic i determina el factor correcte.
- `MIFirstMeasureTasks.extend()` intercala les quatre tasques del tema al generador de pràctica.
- El type 1002 `mesura-mixta` continua assignat al tema `metric`; comparteix l’identificador estable `mesura-mixta` amb les sumes mixtes del type 2.

### Banc contextual C01–C06 i altres rutes

C01–C04 i C06 necessiten conversió d’unitats i passen a tenir `primaryTopic: conversions`. C05 és una resta de longituds ja expressades en centímetres, sense conversió; queda atribuït a `problemes`. Les sis plantilles continuen dins del banc contextual i conserven els seus identificadors, correctors i classificació pròpia.

Els patrons C02/C03 també incorporen una divisió (repartiment en bosses o ampolles); són aplicacions contextuals, no famílies addicionals de conversió. Els altres bancs de temps, perímetres, àrees, mesurament i estimació no s’han reclassificat.

## Famílies anteriors i definitives

La correspondència revisada abans de consolidar era per tipus: 1 i 4 com N1, 2 i 3 com N2, i el 1001 com N3. Aquest mapa barrejava procediments diferents i comptava contexts que repetien conversions ja incloses a `metric` o `temps`.

| Família definitiva | Generadors i variants | Nivell anterior | Nivell final | Decisió pedagògica |
|---|---|---:|---:|---|
| `comparar-equivalencies` · Comparar mesures equivalents | Tipus 3; longitud, massa, capacitat i superfície | N2 | **N1** | Comparar dues mesures després d’una conversió directa és reconeixement/aplicació bàsica; no hi ha reconstrucció ni restriccions. |
| `conversio-superficies` · Convertir unitats d’àrea | Tipus 1 i 4; dues direccions i contextos de superfície | N1 per tipus 1/4 | **N2** | L’alumne ha de distingir unitats quadrades i aplicar el factor lineal elevat al quadrat. El context no és una família nova. |
| `mesura-mixta` · Operar amb mesures mixtes | Tipus 2 a `conversions`; comparteix família amb type 1002 a `metric` | N2 | **N2** | Convertir a unitat comuna i sumar és el mateix procediment que la mesura mixta del tema veí; es comparteix identificador i no es duplica el recompte global. |
| `ordenar-mesures` · Ordenar superfícies i recuperar el valor central | Type 1003 **nou** | — | **N2** | Cal normalitzar tres valors, comparar-los i identificar-ne la mediana. |
| `operar-arees-mixtes` · Operar amb diverses superfícies en unitats diferents | Type 1004 **nou** | — | **N2** | Combina conversions quadràtiques, suma i resta en diversos passos habituals. |
| `diagnosticar-error-superficie` · Corregir un factor quadràtic | Type 1005 **nou** | — | **N2** | La dada errònia és explícita; cal distingir el factor lineal del quadràtic i corregir-lo. És un raonament de dos passos, no N3. |
| `carrega-amb-dos-limits` · Optimitzar una càrrega amb dues restriccions | Type 1001 | N3 | **N3** | Cal convertir unitats, enumerar combinacions admissibles i justificar un màxim únic sota dos límits simultanis. |

**Recompte final:** **7 famílies — 1 N1, 5 N2 i 1 N3**. Les noves famílies incorporades són ordenar mesures, operar amb superfícies mixtes i diagnosticar l’error de factor. La conversió contextual d’àrea és una variant de la família d’àrees, no una vuitena família.

## Classificació i cobertura de teoria

El classificador compartit consulta les especificacions de família `conversionsFamilySpecs`; cada resultat del generador porta el mateix identificador i nivell intern. La cobertura de pràctica i examen es calcula a partir de les set famílies, no dels vuit tipus de ruta. La rotació de `conversions` compara aquests identificadors i evita repeticions familiars consecutives. Els llindars generals de pràctica (8 guiats i 15 autònoms) no canvien.

La pàgina de teoria i els seus ancoratges es conserven. La matriu de cobertura remitent a seccions ja existents:

| Família | Teoria existent |
|---|---|
| `comparar-equivalencies` | `#comparar`, `#comprovar` |
| `conversio-superficies` | `#arees`, `#context` |
| `mesura-mixta` | `#mateixa-unitat`, `#mixtes` |
| `ordenar-mesures` | `#arees`, `#comparar` |
| `operar-arees-mixtes` | `#arees`, `#mixtes` |
| `diagnosticar-error-superficie` | `#arees`, `#comprovar` |
| `carrega-amb-dos-limits` | `#context`, `#comprovar` |

No s’han afegit enllaços contextuals amb ancoratge per família: la interfície existent obre la teoria del tema. La prova comprova l’enllaç del tema, l’obertura directa amb `#arees` i el canvi amb `hashchange` a `#comparar`.

## Cobertura curricular i frontera amb Sistema Mètric Decimal

| Competència | Cobertura i tema assignat |
|---|---|
| Longitud, massa i capacitat; factors 10 i 1000; conversions directes i inverses | `metric`: escala decimal i equivalències de massa (N1). |
| Superfícies; factors quadràtics 100, 10.000 i 1.000.000; conversió inversa | `conversions`: `conversio-superficies` (N2). |
| Suma/resta en unitats diferents | Família compartida `mesura-mixta` (N2); s’evita comptar-la dues vegades entre temes. La suma/resta d’àrees té una família pròpia perquè utilitza unitats quadrades i diverses operacions. |
| Comparar dues o ordenar tres mesures equivalents | Comparació directa N1; ordenació i valor central N2. |
| Anàlisi d’un factor incorrecte | Corregir factor de superfície N2. |
| Combinar conversions amb restriccions | Càrrega amb límit de massa i nombre d’objectes, N3. |
| Temps i sistema sexagesimal | Tema `temps`; no es replica a `conversions`. |
| Fórmules geomètriques i càlcul d’àrees | Tema `arees`; aquesta PR només treballa unitats i operacions amb mesures d’àrea. |
| Elecció d’unitat per estimació, incertesa, precisió | Temes `estimacio` i `mesurament`; no s’afegeix com a conversió exacta. |
| Reconstruir una unitat desconeguda a partir d’una conversió inversa | És la mateixa conversió en sentit contrari, no una família nova. |

La frontera resultant és: `metric` cobreix les escales lineals de longitud/capacitat, equivalències de massa, mesures mixtes i talls; `conversions` cobreix superfícies, comparació/ordenació i usos combinats o restringits de les conversions. El procediment de mesura mixta és explícitament compartit, no duplicat.

**Conclusió sobre les quatre famílies de `metric`:** són suficients com a tema diferenciat un cop delimitat respecte de `conversions`, `temps`, `arees` i els contextos. Són quatre procediments, un dels quals comparteix identificador amb l’altre tema. No es recomana ampliar el recompte només per arribar a 15. Com a millora futura de variants, una PR específica podria estudiar la inclusió dels ordres intermedis de massa (hg, dag, dg i cg) i de salts no adjacents dins de la família actual de massa; el codi existent treballa t↔kg↔g↔mg amb factor 1000 per pas. Això no justifica per si sol una família nova ni forma part d’aquesta PR.

## Exemples resolts

### Comparar equivalències — N1

1. **Enunciat:** Són iguals 3 m i 300 cm? **Resolució:** 3 m = 300 cm; coincideixen. **Resposta:** Sí, són iguals.
2. **Enunciat:** Són iguals 2 kg i 2.200 g? **Resolució:** 2 kg = 2.000 g; no coincideixen. **Resposta:** No, no són iguals.
3. **Enunciat:** Són iguals 5 dm² i 500 cm²? **Resolució:** 5 dm² = 500 cm² (×100); coincideixen. **Resposta:** Sí, són iguals.

### Convertir superfícies — N2

1. **Enunciat:** Converteix 4 m² a cm². **Resolució:** 1 m = 100 cm; per tant 1 m² = 100² = 10.000 cm²; 4 × 10.000. **Resposta:** 40.000 cm².
2. **Enunciat:** Converteix 7.500 cm² a dm². **Resolució:** 1 dm² = 100 cm²; 7.500 ÷ 100. **Resposta:** 75 dm².
3. **Enunciat:** Un terreny té 3 km². Quants m² són? **Resolució:** 1 km² = 1.000² m² = 1.000.000 m²; 3 × 1.000.000. **Resposta:** 3.000.000 m².

### Mesures mixtes — N2 (família compartida amb `metric`)

1. **Enunciat:** Una ruta té 3 km i 450 m. Quants metres són? **Resolució:** 3 km = 3.000 m; 3.000 + 450. **Resposta:** 3.450 m.
2. **Enunciat:** Una caixa pesa 4 kg i 250 g. Quants grams són? **Resolució:** 4 kg = 4.000 g; 4.000 + 250. **Resposta:** 4.250 g.
3. **Enunciat:** Un recipient conté 6 l i 75 cl. Quants cl són? **Resolució:** 6 l = 600 cl; 600 + 75. **Resposta:** 675 cl.

### Ordenar superfícies i trobar-ne el valor central — N2

1. **Enunciat:** A = 3 m², B = 285 dm², C = 30.500 cm². Ordena-les i dona el valor central en dm². **Resolució:** A=300, B=285 i C=305 dm²; B<A<C. **Resposta:** 300 dm².
2. **Enunciat:** A = 5 m², B = 480 dm², C = 53.000 cm². **Resolució:** A=500, B=480 i C=530 dm²; B<A<C. **Resposta:** 500 dm².
3. **Enunciat:** A = 4 m², B = 375 dm², C = 45.000 cm². **Resolució:** A=400, B=375 i C=450 dm²; B<A<C. **Resposta:** 400 dm².

### Operar amb superfícies mixtes — N2

1. **Enunciat:** Una cartolina té 3 m² i 25 dm²; se’n retallen 200 cm². Quina superfície queda en dm²? **Resolució:** 300 + 25 − 2. **Resposta:** 323 dm².
2. **Enunciat:** Una cartolina té 5 m² i 40 dm²; se’n retallen 500 cm². **Resolució:** 500 + 40 − 5. **Resposta:** 535 dm².
3. **Enunciat:** Una cartolina té 2 m² i 15 dm²; se’n retallen 300 cm². **Resolució:** 200 + 15 − 3. **Resposta:** 212 dm².

### Diagnosticar l’error de factor — N2

1. **Enunciat:** Per passar de 4 m² a dm², s’ha aplicat 10 i s’han obtingut 40 dm². Quin factor calia aplicar? **Resolució:** el factor lineal és 10, però per a superfície és 10². **Resposta:** 100.
2. **Enunciat:** Per passar de 3 m² a cm², s’ha aplicat 100 i s’han obtingut 300 cm². **Resolució:** 1 m² = 100² cm². **Resposta:** 10.000.
3. **Enunciat:** Per passar de 5 dm² a cm², s’ha aplicat 10 i s’han obtingut 50 cm². **Resolució:** 1 dm² = 10² cm². **Resposta:** 100.

### Càrrega amb dos límits — N3

1. **Enunciat:** Les A porten 3 l i pesen 2 kg; les B porten 5 l i pesen 3 kg. Es poden portar com a màxim 4 caixes i 10 kg. Quants litres com a màxim? **Resolució:** sota ambdós límits, 2 A + 2 B pesen 10 kg i ocupen les quatre places; 6+10=16 l. **Resposta:** 16 l.
2. **Enunciat:** Les A porten 4 l i pesen 3 kg; les B porten 6 l i pesen 4 kg. Es poden portar com a màxim 5 caixes i 18 kg. **Resolució:** 2 A + 3 B pesen 18 kg i ocupen cinc places; 8+18=26 l. **Resposta:** 26 l.
3. **Enunciat:** Les A porten 5 l i pesen 4 kg; les B porten 7 l i pesen 5 kg. Es poden portar com a màxim 6 caixes i 28 kg. **Resolució:** 2 A + 4 B pesen 28 kg i ocupen sis places; 10+28=38 l. **Resposta:** 38 l.

## Errors freqüents

- Fer servir el factor lineal (×10 o ×100) en comptes del factor quadràtic en superfícies.
- Multiplicar en passar a unitats més grans o dividir en passar a unitats més petites.
- Comparar els valors numèrics sense convertir les unitats.
- Sumar o restar mesures abans d’expressar-les en una unitat comuna.
- Confondre la conversió amb una fórmula d’àrea geomètrica.
- En una càrrega restringida, optimitzar només els litres i ignorar la massa o el nombre de caixes.
- Considerar C05 una conversió tot i que les dues longituds ja estan en la mateixa unitat.

## Resultats de validació i limitacions

Les proves s’han executat en un directori de validació local amb els fitxers descarregats de `main` i els canvis finals de la PR, utilitzant **Chrome**:

- Sintaxi dels dos fitxers JS modificats i dels quatre tests executats (dos nous i dos de regressió): **6/6 correctes**.
- `comprova-conversions-families-1eso.cjs`: **superat**, 2.000 generacions (250 per cadascuna de 4 rutes base i 4 tasques complementàries). Oracles independents de factors quadràtics, unitats, comparacions, operacions, ordenació, diagnòstic, unicitat de l’òptim, opcions, respostes i nivells.
- `comprova-conversions-1eso.cjs`: **superat amb Chrome**; 150 generacions de pràctica, 25 rotacions després d’error, les 7 famílies, C01–C06 i atribució, pràctica guiada/autònoma, progressió preservada, exàmens de 12 i 20 preguntes, teoria, ancoratge directe i `hashchange`, viewport mòbil de 390 px i consola sense errors.
- Regressió de `metric`: test de famílies superat amb 1.250 mostres i test d’integració amb Chrome superat; l’examen de `metric` continua amb 12 preguntes i sense C01–C06 reatribuïts.
- Comparació de les famílies, classificació i exemples revisada contra el codi. No s’ha provat Edge ni GitHub Pages; la PR no està fusionada.

## Ordres locals (CMD)

```cmd
node --check assets\js\raonament-mesura-1eso.js
node --check assets\js\dificultat-mi.js
node --check scripts\comprova-conversions-families-1eso.cjs
node scripts\comprova-conversions-families-1eso.cjs
node --check scripts\comprova-conversions-1eso.cjs
node scripts\comprova-conversions-1eso.cjs
node --check scripts\comprova-metric-families-1eso.cjs
node scripts\comprova-metric-families-1eso.cjs
node --check scripts\comprova-metric-1eso.cjs
node scripts\comprova-metric-1eso.cjs
```

## Fitxers inclosos

- `1eso/sentit-mesura.html`
- `assets/js/dificultat-mi.js`
- `assets/js/raonament-mesura-1eso.js`
- `scripts/comprova-conversions-families-1eso.cjs`
- `scripts/comprova-conversions-1eso.cjs`
- Aquest informe
