# Sentit numèric de 2n d’ESO — resum final dels Lots 1 i 2

## Inventari consolidat

S’han mantingut les classificacions dels quatre temes del Lot 1, i s’han auditat i integrat les quatre famílies del Lot 2 contra els generadors, la classificació compartida i les pàgines de pràctica/teoria. El Lot 2 parteix de `main` a `19beace8b55b45c233742fe491354fece9ce4c86`. No s’ha modificat la teoria, CSS, progressió o temes d’altres cursos.

| Tema | Famílies locals | N1 | N2 | N3 |
|---|---:|---:|---:|---:|
| Nombres racionals | 15 | 7 | 5 | 3 |
| Fraccions amb sentit | 15 | 6 | 5 | 4 |
| Operacions amb nombres racionals | 16 | 7 | 6 | 3 |
| Potències | 14 | 8 | 6 | 0 |
| Aproximacions i errors | 6 | 3 | 3 | 0 |
| Proporcionalitat directa | 9 | 5 | 4 | 0 |
| Percentatges | 8 | 4 | 4 | 0 |
| Recomptes sistemàtics | 10 | 6 | 4 | 0 |
| **Total local** | **93** | **46** | **37** | **10** |

Els quatre temes del Lot 2 contenen **33 famílies locals**: N1/N2/N3 = **18/15/0**. No s’han creat famílies N3 artificials: cap dels quatre catàlegs vigents no té generadors que ho justifiquin.

## Famílies compartides entre temes

Els identificadors locals romanen específics del tema. En comptar procediments únics entre tots vuit temes, es consoliden cinc parelles amb el mateix esquema matemàtic:

| Procediment compartit | Lot 1 | Lot 2 | Base de la coincidència |
|---|---|---|---|
| Aplicar una fracció o percentatge a una quantitat | Fraccions F02 — Fracció com a operador | Percentatges — `calcular-part-percentual` | Multiplicar el total pel factor equivalent; percentatge escrit com a fracció sobre 100. |
| Reconstruir el total a partir d’una part | Fraccions F03 — Reconstruir total i detectar errors d’inversió | Percentatges — `reconstruccio-total-inicial` | Desfer el factor que relaciona part i total; el percentatge n’és una altra representació. |
| Escalar quantitats conservant una proporció | Fraccions F08 — Escalar part i total conservant la proporció | Proporcionalitat — `taules-i-escalatge` | Aplicar el mateix factor a les dues magnituds en una taula o context. |
| Completar una raó equivalent a partir d’un terme | Fraccions F10 — Escalar una raó a partir d’un terme | Proporcionalitat — `factors-i-raons-equivalents` | Conservar la raó aplicant el mateix factor als termes. |
| Repartir un total segons una raó | Fraccions F11 — Repartir proporcionalment un total | Proporcionalitat — `repartiment-proporcional` | Sumar parts de la raó, calcular el valor unitari i repartir. |

Per tant, hi ha **0Nombres racionalsFraccions amb sentitOperacions amb nombres racionalsPotènciesAproximacions i errorsProporcionalitat directaPercentatgesRecomptes sistemàtics famílies locals** i **NaN procediments/famílies únics** després de consolidar aquestes cinc coincidències. Les distribucions N1/N2/N3 de la taula són les classificacions locals vigents; no se’n calcula una distribució única després de deduplicar, perquè els nivells locals difereixen en alguns procediments compartits (per exemple, una aplicació contextual simple pot ser N1 mentre que la variant de repartiment de fraccions és N3).

## Informes i proves

- [Aproximacions i errors](MI_2ESO_numeric_aproximacions_informe_final.md): 6 famílies, 15 tipus, N1/N2/N3 = 3/3/0.
- [Proporcionalitat directa](MI_2ESO_numeric_proporcionalitat_informe_final.md): 9 famílies, 18 tipus, 5/4/0.
- [Percentatges](MI_2ESO_numeric_percentatges_informe_final.md): 8 famílies, 18 tipus, 4/4/0.
- [Recomptes sistemàtics](MI_2ESO_numeric_recomptes_informe_final.md): 10 famílies, 15 tipus, 6/4/0.
- Els informes finals del Lot 1 són els quatre informes de nombres racionals, fraccions amb sentit, operacions racionals i potències, més `MI_2ESO_numeric_lot_1_resum.md`.

Validació executada amb Chrome 157:

- Proves matemàtiques: 250 mostres per tipus, oracles independents, 66 tipus i 16.500 mostres; també s’han comprovat identitat/cobertura de família, nivell, respostes úniques i rotació.
- Proves Playwright: 4 pàgines de pràctica, nivells guiats/autònoms, proves d’error, cobertura, exàmens de tema i globals, ancoratges directes i `hashchange`, mòbil de 390 px; 0 errors JavaScript.
- Regressions Lot 2: 240 exercicis, 30 per tema ordinari i per cadascun dels quatre temes d’ampliació.
- Regressions Lot 1: Racionals, Fraccions amb sentit, Operacions racionals i Potències superades.
- Fitxes: vuit temes ordinaris, selecció, quotes, varietat i duplicats; exports Word/PDF amb i sense solucions i sessions només N1/N2 per als temes sense N3.
- `node --check` als fitxers JavaScript modificats i `git diff --check`: superats.

Casos límit executats: arrodoniment exacte de 1,5000 a 2, valors per defecte/excés a 1,25 i enumeració exhaustiva independent per als procediments de recompte incloses les restriccions. El banc de percentatges no genera 0% ni 100%, i el banc d’aproximacions no genera valors negatius ni errors relatius amb referència zero; aquests casos queden explícitament pendents/no representats pel generador.

Limitacions: els tests de navegador s’han executat amb Chrome 157, no Edge. El sandbox bloqueja la càrrega del popup real de teoria des de `file://`; les proves comproven l’URL/ancoratge sol·licitats pel manejador i després naveguen directament a l’ancoratge amb `hashchange`. GitHub Pages no s’ha verificat localment ni s’afirma que cap desplegament estigui completat.
