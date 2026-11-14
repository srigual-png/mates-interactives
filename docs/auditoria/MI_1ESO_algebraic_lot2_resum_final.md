# Sentit algebraic · Tancament Lot 2 · 1r ESO

Base de treball: `b046e8dd6466279b9b8e78cd8144d8f0e3fddde1`, `main` amb la PR #40 (Lot 1) incorporada. Aquest canvi completa la classificació de sis temes; no toca el registre global d’inventari.

## Famílies definitives dels sis temes

| Tema | Famílies | N1 | N2 | N3 | Detall |
|---|---:|---:|---:|---:|---|
| Traducció (`traduccio`) | 6 | 4 | 2 | 0 | 6 famílies locals; 5 IDs únics perquè comparteix avaluació per substitució amb Monomis |
| Patrons (`patrons`) | 5 | 3 | 2 | 0 | 5 IDs |
| Monomis (`monomis`) | 5 | 5 | 0 | 0 | 4 famílies exclusives i substitució compartida amb Traducció |
| Simplificació (`simplificacio`) | 2 | 1 | 1 | 0 | 2 IDs |
| Equacions (`equacions`) | 4 | 2 | 2 | 0 | 4 IDs |
| Pensament computacional (`computacional`) | 5 | 3 | 2 | 0 | 5 IDs |
| **Total de famílies úniques** | **26** | **17** | **9** | **0** | **26 IDs estables**, sense solapament entre els temes nous i Lot 1 |

El recompte de famílies locals de cada tema suma 27; es deduplica una sola família compartida (`avaluar-expressio-per-substitucio`) entre Traducció i Monomis, i en resulten 26 famílies úniques. No s’ha creat cap N3: els generadors d’aquest lot arriben com a màxim a modelització i combinació de procediments habituals de 1r d’ESO. Els tipus contextuals d’equacions i la detecció d’errors es classifiquen N2; fer-los N3 només per una etiqueta anterior no tindria justificació curricular.

## Decisions de classificació del Lot 2

- **Simplificació:** variants de reduir coeficients queden en una família N1; agrupar termes amb x i constants o simplificar abans de substituir queda en N2. S5/S6 no són famílies noves per canviar el format.
- **Equacions:** les equacions additives i multiplicatives d’un pas són N1; les de dos passos i els problemes contextuals que es modelitzen amb equació són N2. Els antics N3 dels problemes contextuals baixen a N2 perquè no requereixen reconstrucció ni justificació amb restriccions.
- **Pensament computacional:** executar una seqüència, repetir una suma i inferir una operació inversa elemental són N1. Aplicar una branca condicional i trobar el primer error en una seqüència són N2.

Els detalls de generadors, nivells anteriors/finals, justificacions, tres exemples per família i teoria coberta són als informes [Simplificació](MI_1ESO_algebraic_simplificacio_informe_final.md), [Equacions](MI_1ESO_algebraic_equacions_informe_final.md) i [Pensament computacional](MI_1ESO_algebraic_computacional_informe_final.md). Els tres informes de Lot 1 i la seva classificació no s’han alterat.

## Validacions documentades

- Matemàtiques Lot 2: **10.000 mostres** — 3.000 Simplificació, 4.000 Equacions, 3.000 Pensament computacional; cobertura de tots els generadors interns i bancs, amb oracles independents.
- Playwright Chrome Lot 2: **3/3 tests superats**, 500 mostres aleatòries per tema, cobertura de totes les famílies i rotació sense repetició consecutiva, pràctica, etiquetes, recuperació, exàmens de tema/global, teoria i 390 px.
- Regressió Lot 1: **3/3 tests matemàtics i 3/3 tests Playwright superats**.
- En cadascuna de les tres suites de navegador s’han generat 30 exercicis per a `simplificacio`, `equacions`, `computacional`, `patrons2`, `monomis2`, `simplificacio2` i `equacions2`: **630 generacions verificades en total**.
- Limitació de navegador: el clic de pràctica a teoria queda pendent perquè aquesta sessió carrega el contingut amb `file://`; els href, les pàgines i els ancoratges directes/`hashchange` sí que s’han validat a Chrome.

La verificació de GitHub Actions es documentarà amb l’estat real de la PR. GitHub Pages no s’ha declarat publicat ni comprovat per aquesta auditoria.
