# Problemes de context — informe final de validació (provisional)

**Base:** `main` a `e725568f58ed925f4ab5f2db1e8f08298ea73103` (PR #30); branca de treball creada des d’aquest SHA.
**Tema:** `problemes` · 1r d’ESO, Sentit de la mesura.
**Estat:** PR de tancament pendent de revisió; recompte provisional. Sense merge, publicació ni edició dels registres JSON/CSV.

## Auditoria i criteri de recompte

Abans de l’extensió, `MEASURE_PROBLEM_PATTERNS` tenia 38 patrons contextuals C01–C06, T01–T05, P01–P05, A01–A07, S01–S04, M01–M05 i I01–I06. `MIFirstMeasureTasks.extend()` hi afegia els vuit patrons globals de raonament R01–R08. Aquesta mutació feia que `genProblemesRaw()` i la pràctica de context incloguessin també els patrons N3 dels altres temes. Ara es conserva el banc global per als exàmens, però la pràctica `problemes` usa explícitament els 38 contextos i només el R08 propi: 39 rutes. R01–R07 continuen accessibles als temes als quals pertanyen i a l’examen global.

Les 38 variants contextuals no són 38 famílies pròpies. Les famílies genuïnes del tema són quatre: restar mesures homogènies, convertir i repartir en unitats completes, combinar àrea i perímetre en un cost, i optimitzar una compra mixta de pintura. La resta reutilitza IDs pedagògics dels sis temes auditats; I04 comparteix `voltes-circumferencia` amb P04 del tema Perímetres.

## Famílies pròpies definitives

| ID | Procediment | Generadors | Anterior → final | Justificació |
|---|---|---|---|---|
| `restar-mesures-mateixa-unitat` | Restar dues mesures expressades en la mateixa unitat | C05 | N1 → **N1** | Es llegeixen les dades i s’aplica una resta directa sense conversió. |
| `repartir-quantitat-amb-conversio` | Convertir una quantitat i repartir-la en unitats completes, interpretant el residu | C02, C03, C06, I05 | C02/C03/I05: N2; C06: N3 → **N2** | Combina conversió d’unitats amb quocient enter; cal distingir unitats completes de fraccions sobrants. Les variants d’arròs, beguda i suc són el mateix procediment. No hi ha cap raonament que justifiqui N3 a C06. |
| `cost-combinat-area-perimetre` | Calcular àrea i contorn, aplicar tarifes diferents i sumar costos | I03, I06 | N3 → **N2** | Calen dos models geomètrics i dues tarifes, però no hi ha optimització ni justificació avançada; l’etiqueta `hard` no és un argument per a N3. |
| `compra-pintura-combinada` | Minimitzar el cost de formats de pintura amb cobertura mínima | R08, catàleg `compra-pintura-combinada` | N3 → **N3** | Combina àrea neta i comparació exhaustiva de combinacions discretes de dos formats; cal demostrar el mínim. |

**Distribució pròpia:** 4 famílies — **N1=1, N2=2, N3=1**. El generador C05 es manté com a família local perquè el tema practica diferències de magnitud amb unitat i resposta etiquetades; a escala global és un context de la resta elemental i no s’ha de comptar com un procediment exclusiu de tota la matemàtica.

## Inventari exhaustiu dels patrons contextuals

El “nivell anterior” recull el nivell efectiu del classificador compartit abans d’aquesta branca, no una etiqueta textual `easy/medium/hard` aïllada. En diversos patrons contextuals la paraula `hard` era inconsistent amb el mapa; s’ha conservat el nivell matemàtic del classificador i s’han normalitzat les metadades. Nombre d’operacions és el mínim explícit per obtenir la resposta, no el nombre de línies de l’ajuda.

| Patró | Tema principal | Magnitud / procediment | Passos | Anterior → final | Família associada; relació |
|---|---|---|---:|---|---|
| C01 | conversions | Longitud: convertir km i m i sumar | 2 | N2 → N2 | `mesura-mixta`; variant de conversió + suma |
| C02 | conversions | Massa: convertir kg a g i comptar bosses completes | 2 | N2 → N2 | `repartir-quantitat-amb-conversio`; pròpia |
| C03 | conversions | Capacitat: convertir l a ml i comptar ampolles | 2 | N2 → N2 | `repartir-quantitat-amb-conversio`; pròpia |
| C04 | conversions | Capacitat: convertir l, cl i ml i sumar | 3 | N2 → N2 | `mesura-mixta`; variant |
| C05 | problemes | Longitud: restar cinta usada, mateixa unitat | 1 | N1 → N1 | `restar-mesures-mateixa-unitat`; pròpia local |
| C06 | conversions | Longitud: convertir km a m i comptar peces completes/sobrant | 2 | N2 → N2 | `repartir-quantitat-amb-conversio`; pròpia |
| T01 | temps | Durada real d’un trajecte amb parada | 2 | N2 → N2 | `durada-entre-hores` / `operar-durades-i-pausas`; compartida |
| T02 | temps | Sumar una durada a una hora inicial | 2 | N2 → N2 | `hora-final`; compartida |
| T03 | temps | Sumar tres blocs i reagrupar en hores/minuts | 2 | N2 → N2 | `operar-durades-i-pausas`; compartida |
| T04 | temps | Calcular durada a través de mitjanit, amb l’endemà indicat | 2 | N2 → N2 | `durada-entre-hores`; compartida |
| T05 | mesurament | Relacionar minuts de volta amb graus girats | 1 | N2 → N2 | `angle-gir-rellotge`; compartida amb el tema de precisió |
| P01 | perimetres | Perímetre rectangular menys porta | 2 | N2 → N2 | `perimetre-amb-obertura`; compartida |
| P02 | perimetres | Perímetre cm→m i cost lineal de marc | 3 | N2 → N2 | `cost-material-per-contorn`; compartida |
| P03 | perimetres | Circumferència a partir del diàmetre i π≈3,14 | 2 | N2 → N2 | `circumferencia-directa`; compartida |
| P04 | perimetres | Distància de voltes de roda i cm→m | 3 | N2 → N2 | `voltes-circumferencia`; compartida; també I04 |
| P05 | perimetres | Reconstruir amplada a partir de perímetre i llargada | 2 | N2 → N2 | `reconstruir-costat-des-del-perimetre`; compartida |
| A01 | arees | Àrea aula / àrea rajola, quocient i sostre | 3 | N2 → N2 | `cobrir-superficie`; compartida |
| A02 | arees | Pintura: restar obertures, dividir per rendiment | 3 | N2 → N2 | `cobrir-superficie`; compartida |
| A03 | arees | Àrea de jardí menys zona pavimentada | 3 | N2 → N2 | `compondre-arees-figures`; compartida |
| A04 | arees | Reconstruir alçada del rectangle amb àrea i base | 1 | N2 → N2 | `reconstruir-dimensio-rectangle-area`; compartida |
| A05 | arees | Àrea triangular i cost per m² | 2 | N2 → N2 | `cost-per-superficie`; compartida |
| A06 | arees | Àrea en L com a rectangle menys retall | 3 | N2 → N2 | `compondre-arees-figures`; compartida |
| A07 | arees | Calcular i comparar dues àrees | 3 | N2 → N2 | `comparar-arees`; compartida |
| S01 | mesurament | Escala: distància en plànol a distància real | 1 | N2 → N2 | `escala-proporcional`; compartida |
| S02 | mesurament | Escala inversa: longitud real a longitud en plànol | 1 | N2 → N2 | `escala-proporcional`; compartida |
| S03 | mesurament | Escala numèrica, cm de mapa a km reals | 2 | N2 → N2 | `escala-proporcional`; compartida |
| S04 | mesurament | Escala lineal en dues dimensions i àrea real | 3 | N2 → N2 | `escala-proporcional`; compartida |
| M01 | mesurament | Triar instrument per magnitud i precisió | 0 | N1 → N1 | `seleccionar-instrument`; variant |
| M02 | mesurament | Triar unitat d’ordre adequat | 0 | N1 → N1 | `seleccionar-unitat-mesura`; variant |
| M03 | mesurament | Diferència absoluta entre lectura i referència | 2 | N2 → N2 | `error-absolut`; variant |
| M04 | mesurament | Error absolut, quocient i percentatge | 3 | N2 → N2 | `error-relatiu-percentual`; variant |
| M05 | mesurament | Comparar errors relatius percentuals | 2 | N2 → N2 | `error-relatiu-percentual`; variant |
| I01 | perimetres | Perímetre menys obertura, cost lineal de sòcol | 3 | N2 → N2 | `cost-material-per-contorn`; variant |
| I02 | arees | Àrea de quatre parets menys obertures, pots sencers | 3 | N2 → N2 | `cobrir-superficie`; variant |
| I03 | problemes | Cost de tela per àrea + cinta per contorn | 3 | N2 (`hard`) → N2 | `cost-combinat-area-perimetre`; pròpia |
| I04 | perimetres | Perímetre rectangular × voltes, m→km | 3 | N2 → N2 | `voltes-circumferencia`; compartida amb P04 |
| I05 | conversions | Convertir l→ml, dividir i comptar gots complets | 2 | N2; abans etiquetat `metric` → N2 | `repartir-quantitat-amb-conversio`; pròpia; `primaryTopic` corregit a conversions |
| I06 | problemes | Cost de tanca pel perímetre + gespa per àrea | 3 | N2 (`hard`) → N2 | `cost-combinat-area-perimetre`; pròpia |

Els nivells efectius del classificador compartit abans d’aquesta branca són N1 només per C05/M01/M02, N2 per la resta de patrons contextuals i N3 per R01–R08. El fallback antic `BANK_LEVELS` encara conté N3 per a alguns patrons contextuals, però tots tenen una entrada explícita N2 a `REVIEWED_BANKS`, que és l’override actiu del classificador. No és una reclassificació efectiva d’aquests patrons en aquesta PR; el canvi necessari és normalitzar també les metadades internes `difficulty`, `taskDifficulty` i `diff` a l’assignació efectiva del classificador. Les etiquetes `hard` no són un argument pedagògic per a N3. R01–R07 són N3 perquè demanen reconstrucció, garanties o optimització; el seu nivell no es trasllada a Problemes pel sol fet de compartir el banc global.

## Rutes globals de raonament R01–R08

| ID | Tema de catàleg / procediment | Nivell | Relació amb Problemes |
|---|---|---:|---|
| R01 | Sistema mètric: talls combinats sota restriccions (`talls-combinats`) | N3 | Activitat d’un altre tema; exclosa de la pràctica de Problemes |
| R02 | Conversions: càrrega amb dos límits (`carrega-amb-dos-limits`) | N3 | Activitat d’un altre tema; exclosa de la pràctica de Problemes |
| R03 | Temps: transbordament invers (`transbordament-invers`) | N3 | Activitat de Temps; exclosa de la pràctica de Problemes |
| R04 | Perímetres: optimitzar àrea sota tanca (`optimitzar-area-amb-tanca`) | N3 | Activitat de Perímetres; exclosa de la pràctica de Problemes |
| R05 | Àrees: perímetre mínim amb àrea fixa (`perimetre-minim-amb-area-fixada`) | N3 | Activitat d’Àrees; exclosa de la pràctica de Problemes |
| R06 | Mesurament: encaix amb toleràncies (`encaix-amb-tolerancies`) | N3 | Activitat de Mesurament; exclosa de la pràctica de Problemes |
| R07 | Estimació: compra garantida (`estimacio-amb-garantia`) | N3 | Activitat d’Estimació; exclosa de la pràctica de Problemes |
| R08 | Minimitzar compra de dos formats de pintura | N3 | Única ruta R pròpia inclosa en la pràctica de Problemes |

## Exemples resolts de les famílies pròpies

### Restar mesures de la mateixa unitat — N1

1. **Enunciat:** Una cinta fa 625 cm i se’n tallen 175 cm. **Resposta:** 450 cm. **Càlcul:** `625−175=450`.
2. **Enunciat:** Un cordill fa 9 m i se’n gasten 3 m. **Resposta:** 6 m. **Càlcul:** `9−3=6`.
3. **Enunciat:** Una ampolla conté 750 ml i se’n serveixen 250 ml. **Resposta:** 500 ml. **Càlcul:** `750−250=500`.

### Convertir i repartir en unitats completes — N2

1. **Enunciat:** Hi ha 5 kg d’arròs; bosses de 250 g. **Resposta:** 20 bosses. **Càlcul:** `5 kg=5000 g`; `5000÷250=20`.
2. **Enunciat:** Un dipòsit té 6 l; ampolles de 750 ml. **Resposta:** 8 ampolles. **Càlcul:** `6000÷750=8`.
3. **Enunciat:** Hi ha 4 l de suc; gots de 300 ml. **Resposta:** 13 gots complets i sobren 100 ml. **Càlcul:** `4000=13×300+100`.

### Cost combinat d’àrea i perímetre — N2

1. **Enunciat:** Una tela fa `3×2 m`; tela a 8 €/m² i cinta perimetral a 3 €/m. **Resposta:** 78 €. **Càlcul:** tela `6×8=48 €`; perímetre `10 m`, cinta `10×3=30 €`; total `78 €`.
2. **Enunciat:** Un jardí fa `8×5 m`; tanca a 12 €/m i gespa a 4 €/m². **Resposta:** 472 €. **Càlcul:** `P=26 m`, tanca `312 €`; `A=40 m²`, gespa `160 €`; total `312+160=472 €`.
3. **Enunciat:** Una tela de `4×2 m`; tela a 6 €/m² i ribet a 4 €/m. **Resposta:** 96 €. **Càlcul:** àrea `8 m²` → 48 €; perímetre `12 m` → 48 €; total `48+48=96 €`.

### Compra mixta de pintura de cost mínim — N3

Els pots A cobreixen 4 m² i costen 6 €; els B cobreixen 7 m² i costen 9 €. Es poden barrejar formats i aprofitar el sobrant. La solució enumera nombres possibles de pots B; per a cada cas calcula el nombre mínim de A que cobreix el dèficit.

1. **Enunciat:** Paret `4×3 m`, obertures `2 m²`. **Resposta:** 15 €. **Càlcul:** calen `12−2=10 m²`; `1A+1B` cobreix 11 m² per 15 €. Amb només A calen 3 (18 €); amb només B, 2 (18 €), així que 15 € és mínim.
2. **Enunciat:** Paret `3×4 m`, obertures `1 m²`. **Resposta:** 15 €. **Càlcul:** `11 m²`; la combinació `1A+1B` cobreix 11 m² per 15 €. Un sol format costa com a mínim 18 €.
3. **Enunciat:** Paret `5×3 m`, obertures `2 m²`. **Resposta:** 18 €. **Càlcul:** `13 m²`; `2B` cobreixen 14 m² i costen 18 €. Amb una B calen dues A (19 €); només A costa 24 €. *(El catàleg usa casos predefinits; l’oracle prova tots els nombres de pots B possibles.)*

## Errors freqüents

- Dividir abans d’homogeneïtzar les unitats; truncar cap amunt quan es demanen peces completes, o comptar peces parcials.
- Restar la porta després d’haver aplicat una tarifa que només cobreix la part instal·lada.
- Confondre el cost per m² amb el cost lineal per m i sumar àrea amb perímetre sense tarifes.
- Comprar paquets amb sostre incorrecte, o ignorar obertures en superfícies pintades.
- A R08, triar només el format de menor €/m² i no comparar combinacions; donar una combinació que cobreix però no és de cost mínim.
- Assignar un context d’unitats a un tema incorrecte (`I05` era `metric` malgrat convertir litres a mil·lilitres i repartir gotets).

## Proves i limitacions

| Prova | Resultat |
|---|---|
| `comprova-problemes-mesura-families-1eso.cjs` | PASS, dues execucions deterministes; 11.500 mostres per execució: 38 patrons contextuals + 8 rutes R, 250 cadascun. Oracles independents, unitats, resultats, residus, sostres, opcions, correctors, nivells i IDs; 31 IDs de família/variants contextuals inspeccionats. |
| `comprova-problemes-mesura-1eso.cjs` | PASS, dues execucions deterministes a Chrome; 400 generacions, cobertura de quatre famílies pròpies i variants compartides, rotació, errors, pràctica guiada/autònoma, exàmens 12/20, regressió 30×6, teoria/hashchange/mòbil 390 px i zero errors JS. |
| Tests de famílies dels sis temes previs | PASS: metric 1.250; conversions 2.000; temps 2.750; perímetres 4.250; àrees 4.750; mesurament 7.000 mostres. |
| Tests integrals previs | PASS, sis executats després del fix del rotador: metric, conversions, temps, perímetres, àrees i mesurament. |

Chrome ha estat el navegador disponible. Edge no s’ha provat. No s’han editat teoria, CSS ni fitxers de registre. GitHub Pages no es declara verificat: aquesta PR és pendent de merge. La verificació visual és de dimensions i funcionament en navegador, no una inspecció visual comparativa manual.

## Ordres de validació a Windows CMD

```cmd
node scripts\comprova-problemes-mesura-families-1eso.cjs
node scripts\comprova-problemes-mesura-1eso.cjs
```
