# Addenda · 19 oracles independents nous · Sentit de la mesura 2n ESO

**Data:** 17/11/2026 · **Resultat:** superat al CI [#44068690716](https://github.com/srigual-png/mates-interactives/actions/runs/44068690716).

Després de la consolidació inicial (20 tipus amb oracle, 108 pendents), hem executat un lot de **19 tipus nous**, amb **50 instàncies cadascun = 950 comprovacions independents** calculades a partir dels nombres visibles dels enunciats. **0 discrepàncies** segons les comprovacions programades.

| Tema | Tipus nous amb oracle |
|---|---|
| Unitats | 1, 2, 3, 4, 5 |
| Escales | 1, 2, 3, 5 |
| Pitàgores | 2, 3, 4, 6, 7 |
| Problemes de mesura | 1, 4, 5, 6, 7 |
| **Total** | **19** |

## Cobertura actual després del lot

| Tema | Tipus totals | Amb oracle independent | Encara sense oracle |
|---|---:|---:|---:|
| Unitats | 18 | 6 | 12 |
| Escales | 18 | 5 | 13 |
| Pitàgores | 16 | 6 | 10 |
| Perímetres | 18 | 5 | 13 |
| Superfícies | 20 | 1 | 19 |
| Estimació | 18 | 7 | 11 |
| Problemes | 20 | 9 | 11 |
| **Total** | **128** | **39** | **89** |

El total acumulat de comprovacions aritmètiques independents **de les dues bateries** és 800 + 950 = **1.750**, en mostres de 40 i 50 instàncies per tipus. Els 39 tipus d'aquest còmput són diferents; no s'han afegit famílies pedagògiques ni nivells aprovats.

## Limitacions

- Els oracles d'aquest lot deriven dades de l'enunciat (no llegeixen el càlcul intern del generador), però segueixen sent **proves per mostreig**, no exhaustives.
- S'ha corregit al **test** la lectura de la distinció entre símbols de capacitat, com `dL`, `L`, `daL` i `mL`; la primera execució fallida era un error de normalització de l'oracle, no del generador.
- No s'ha modificat cap generador, nivell o família matemàtica en aquest lot.
- Encara cal revisió de la qualitat pedagògica, de distractors i de la cobertura dels altres 89 tipus.

**Pas següent:** donar prioritat a Superfícies i volums (19 pendents), Perímetres (13) i Escales (13), sense forçar una quota de famílies per nivell.
