# Addenda · 17 nous oracles independents · 2n ESO, Sentit de la mesura

**Data:** 17/11/2026 · **CI superat:** [GitHub Actions #44069474453](https://github.com/srigual-png/mates-interactives/actions/runs/44069474453).

## Què s'ha executat

El test `scripts/test-mesura-2eso-oracles-lot-17.cjs` reconstrueix **els resultats matemàtics des de les dades dels enunciats** per a **17 tipus** abans no contrastar-los amb la resposta calculada pel generador. S'han provat **50 instàncies de cada tipus = 850 comprovacions**, amb 0 errors detectats.

| Tema | Tipus nous amb oracle |
|---|---|
| Escales | 6, 7, 8, 9, 10 |
| Perímetres i àrees | 1, 2, 3, 7, 9, 10 |
| Superfícies i volums | 1, 2, 3, 4, 5, 6 |
| **Total** | **17** |

Comprovacions incloses: conversió d'escales lineals a àrees, semblança d'altures i ombres, proporcions, superfícies de paral·lelograms, rombes i trapezis, àrees compostes, prismes triangulars, ortoedres i cubs.

## Nova cobertura de l'auditoria

| Tema | Amb oracle | Total | Encara pendent |
|---|---:|---:|---:|
| Unitats | 6 | 18 | 12 |
| Escales | 10 | 18 | 8 |
| Pitàgores | 6 | 16 | 10 |
| Perímetres i àrees | 11 | 18 | 7 |
| Superfícies i volums | 7 | 20 | 13 |
| Estimació i error | 7 | 18 | 11 |
| Problemes de mesura | 9 | 20 | 11 |
| **Total** | **56** | **128** | **72** |

Els **56 tipus** amb oracle provenen de tres bateries sense superposició de tipus: 20 tipus inicials amb 40 instàncies, 19 del primer lot amb 50 instàncies i 17 d'aquest lot amb 50 instàncies. Per tant, **800 + 950 + 850 = 2.600 contrastos independents**. No s'han de confondre els **tipus de generador** amb famílies matemàtiques validades.

## Què queda pendent

Els 72 tipus restants necessiten un oracle de resultat independent si volem arribar a aquest mateix estàndard. Entre aquests, també convé reforçar la inspecció pedagògica de distractors, la coherència dels nivells i la diversitat d'estratègies. Les mostres no demostren totes les combinacions possibles, i els oracles no garanteixen per si sols que una pregunta sigui adequada a 2n ESO.

**No s'ha modificat cap generador, nivell, família ni desplegament durant aquest lot. La PR #49 continua oberta.**
