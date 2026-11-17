# Addenda · 18 nous oracles independents · Pitàgores, Unitats i Estimació · 2n ESO

**Data:** 17/11/2026 · **GitHub Actions:** [#44072023329](https://github.com/srigual-png/mates-interactives/actions/runs/44072023329) — **success**.

## Cobertura d'aquest lot

El test `scripts/test-mesura-2eso-oracles-lot-18.cjs` executa el codi real dels generadors i contrasta **18 tipus × 50 mostres = 900 respostes** amb valors reconstruïts de l'enunciat, sense consultar el càlcul intern de `correct`. **0 discrepàncies detectades**.

| Tema | Tipus nous | Competències comprovades |
|---|---|---|
| Pitàgores | 1, 8, 9, 10, 11, 12, 13, 14, 15, 16 | Identificació d'hipotenusa, rampes, classificació de triangles, diagonals, càlcul de catets, àrees, longitud de cables i diagnòstic d'errors |
| Unitats | 6, 9, 14, 15 | Relacions volum–capacitat, comparació de longituds, equivalències de superfície/volum i suma de superfícies convertides |
| Estimació | 11, 12, 17, 18 | Selecció d'instruments segons tolerància, intervals d'arrodoniment, error absolut i diagnòstic d'errors |
| **Total** | **18** | |

El tipus `estimacio:11` ja disposava de proves matemàtiques específiques i navegació real, però **no formava part del recompte dels 73 tipus** amb oracle de la taula consolidada anterior. Ara s'hi incorpora per criteri uniforme. El conjunt de tipus inclòs en el nou test no se superposa amb els quatre lots del recompte original.

## Cobertura actual dels set temes

| Tema | Tipus totals | Amb oracle independent | Pendents |
|---|---:|---:|---:|
| Unitats i conversions | 18 | 13 | 5 |
| Escales | 18 | 10 | 8 |
| Pitàgores | 16 | 16 | 0 |
| Perímetres i àrees | 18 | 11 | 7 |
| Superfícies i volums | 20 | 14 | 6 |
| Estimació i error | 18 | 13 | 5 |
| Problemes de mesura | 20 | 14 | 6 |
| **Total** | **128** | **91** | **37** |

El còmput acumulat de contrastos específics dels cinc lots és **800 + 950 + 850 + 850 + 900 = 4.350**. Són proves per mostreig, no comprovacions exhaustives de totes les possibles instàncies, i els tipus no equivalen a famílies matemàtiques pedagògicament aprovades.

## Limitacions i proper pas

- Cal completar **37 tipus** sense oracle de resultat independent, començant per Escales (8), Perímetres (7), Superfícies (6), Problemes (6), Unitats (5) i Estimació (5).
- Els controls de resultat no substitueixen la revisió de **qualitat dels distractors**, grau de dificultat, adequació a 2n ESO o independència entre famílies.
- La convenció d'extrems de l'interval a `estimacio:12` continua sent una decisió que ha de quedar pedagògicament explícita, encara que l'oracle coincideixi amb el codi.
- El test només afegeix fitxers d'auditoria: **cap generador ni nivell oficial modificat**. La PR #49 continua oberta, sense fusió ni publicació.
