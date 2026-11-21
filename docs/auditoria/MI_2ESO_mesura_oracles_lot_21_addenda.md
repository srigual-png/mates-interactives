# Addenda · 21 oracles independents nous · Escales, Perímetres i Superfícies (2n ESO)

**Data:** 17/11/2026. **Prova superada:** [GitHub Actions #44072540368](https://github.com/srigual-png/mates-interactives/actions/runs/44072540368).

## Resultats

El test `scripts/test-mesura-2eso-oracles-lot-21.cjs` ha executat **21 tipus × 50 instàncies = 1.050 comprovacions** reconstruint el valor correcte a partir de l'enunciat real del generador, sense utilitzar el càlcul intern que assigna `correct`. Resultat final: **0 discrepàncies**.

| Bloc | Tipus nous comprovats | Abast |
|---|---|---|
| Escales | 4, 12–18 | Càlcul i elecció d'escales, proporcions, ampliacions, perímetres reals, rutes i semblança de triangles |
| Perímetres i àrees | 11–13, 15–18 | Marc quadrat, fórmules inverses de triangle i trapezi, apotema donada, superfícies pintades, camins circulars i diagnòstic d'errors |
| Superfícies i volums | 15–20 | Profunditat de dipòsit, superfície de capses, comparació de capacitats, diagnòstic de fórmules i desenvolupaments plans |
| **Total** | **21 tipus** | **1.050 oracles** |

Els oracles d'aquest lot inclouen tant càlcul numèric amb unitats com decisions de resposta múltiple verificades des de les dades de l'enunciat.

## Nova cobertura independent acumulada

| Tema | Tipus amb oracle | Total | Pendents |
|---|---:|---:|---:|
| Unitats i conversions | 13 | 18 | 5 |
| Escales | 18 | 18 | 0 |
| Pitàgores | 16 | 16 | 0 |
| Perímetres i àrees | 18 | 18 | 0 |
| Superfícies i volums | 20 | 20 | 0 |
| Estimació, precisió i error | 13 | 18 | 5 |
| Problemes de mesura | 14 | 20 | 6 |
| **Total** | **112** | **128** | **16** |

Còmput independent del mostreig dels sis lots: **800 + 950 + 850 + 850 + 900 + 1.050 = 5.400 contrastos** sobre **112 tipus diferents**. Aquesta xifra **no representa famílies pedagògiques diferents ni totes les variants matemàtiques possibles**.

## Pendents

Els 16 tipus encara sense oracle són:
- **Unitats:** 7, 8, 13, 16, 17.
- **Estimació:** 1, 2, 3, 4, 14.
- **Problemes:** 2, 13, 15, 17, 18, 20.

Aquest últim bloc inclou diverses **preguntes de selecció contextual i de detecció d'errors**, en què convé provar també l'ambigüitat de les opcions, no només que coincideixin amb la resposta predefinida.

Segueix pendent la validació **pedagògica de famílies diferents i nivells N1/N2/N3**, la qualitat dels distractors i els casos límit. L'objectiu 5–5–3 és només orientatiu; cap quota justifica exercicis fora del nivell de 2n ESO.

No s'ha modificat cap generador, família oficial o nivell en aquest lot. La PR #49 no s'ha fusionat ni desplegat.
