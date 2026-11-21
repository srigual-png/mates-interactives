# Addenda · 17 oracles nous (lot 17b) · Sentit de la mesura, 2n ESO

**Data:** 17/11/2026 · **CI superat:** [GitHub Actions #44070475127](https://github.com/srigual-png/mates-interactives/actions/runs/44070475127).

## Resultats

S'ha executat `scripts/test-mesura-2eso-oracles-lot-17b.cjs` sobre els generadors reals, amb **17 tipus × 50 instàncies = 850 comprovacions matemàtiques independents** reconstruïdes a partir dels enunciats. Després d'ajustar l'analitzador numèric de la prova, el resultat és **0 discrepàncies**.

| Tema | Tipus verificats en aquest lot |
|---|---|
| Superfícies i volums | 7, 8, 9, 10, 11, 12, 13 |
| Unitats i conversions | 10, 11, 12 |
| Estimació i error | 9, 10 |
| Problemes de mesura | 8, 9, 10, 11, 12 |
| **Total** | **17 tipus** |

Els oracles contrasten àrees i volums de cilindres, inverses de volums, capacitat en litres, conversions mixtes de longitud, superfície i volum, comparació de precisió relativa, marge de l'arrodoniment, distàncies en escales, escales deduïdes, semblança d'ombres i àrees de franges rectangulars i circulars.

### Incidència a la primera execució

La primera execució (#44070352971) va detectar **9 discrepàncies de test** en instàncies de `estimacio:9`. El parser llegia el punt final de frase com a part del número «8,4.» i obtenia `NaN`, de manera que decidia erròniament «mesura B». La comparació correcta és 2/80 = 2,5 % per a A i 0,4/8 = 5 % per a B; **A és realment més precisa**, tal com diu el generador. Es va corregir **únicament l'analitzador del test**. La segona execució (#44070475127) ha superat les 850 comprovacions sense discrepàncies.

## Cobertura després de l'ampliació

| Tema | Tipus amb oracle | Total | Pendents |
|---|---:|---:|---:|
| Unitats | 9 | 18 | 9 |
| Escales | 10 | 18 | 8 |
| Pitàgores | 6 | 16 | 10 |
| Perímetres i àrees | 11 | 18 | 7 |
| Superfícies i volums | 14 | 20 | 6 |
| Estimació i error | 9 | 18 | 9 |
| Problemes de mesura | 14 | 20 | 6 |
| **Total** | **73** | **128** | **55** |

L'acumulat independent és **3.450 verificacions** sobre **73 tipus diferents** (800 del lot inicial + 950 + 850 + 850), però segueixen sent mostres i no una demostració de totes les combinacions. Les **famílies pedagògiques** i **els nivells de dificultat** encara requereixen validació curricular pròpia.

## Estat de publicació

**No s'ha modificat cap generador**, família oficial o nivell en aquest lot. La PR #49 continua sense fusionar ni desplegar.

**Proper pas:** completar els 55 tipus sense oracle amb prioritat en Pitàgores (10 pendents), Unitats i Estimació (9 cadascun), Escales (8), Perímetres (7), Superfícies i Problemes (6 cadascun), i després revisar les famílies matemàtiques i els nivells sense forçar quotas 5–5–3.
