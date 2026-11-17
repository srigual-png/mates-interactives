# Bateria ampliada d'oracles · 2n ESO, Sentit de la mesura

**Estat:** prova automàtica de mostreig superada, sense declarar validació matemàtica exhaustiva.

## Resultats verificats al CI

- **128 tipus × 40 mostres = 5.120 exercicis** generats en un context JavaScript aïllat amb pseudoaleatorietat reproduïble.
- **20 tipus** amb un oracle independent derivat de les dades de l'enunciat, per un total de **800 contrastos de valor** (inclòs un contrast de resposta d'elecció a `problemes:16`).
- **60.404 crides** a la font pseudoaleatòria.
- **0 incidències** segons les condicions que comprova el test: estructura, quatre opcions textualment diferents, inclusió de la resposta, consistència de les solucions i els oracles implementats.
- **GitHub Actions #44062997347: success** (17/11/2026).

| Grup | Tipus amb oracle extern |
|---|---|
| Unitats | `unitats:18` |
| Escales | `escales:11` |
| Pitàgores | `pitagores:5` |
| Perímetres | `perimetres:4`, `:5`, `:6`, `:8`, `:14` |
| Superfícies | `superficies:14` |
| Estimació | `estimacio:5`, `:6`, `:7`, `:8`, `:13`, `:15`, `:16` |
| Problemes | `problemes:3`, `:14`, `:16`, `:19` |

La prova reconstrueix els valors esperats a partir de dades numèriques visibles a cada pregunta, **sense fer servir la variable de resposta del generador per calcular l'oracle**. Per a les dades en format català tracta comes decimals i separadors de milers.

## Quatre casos de reintent

S'han completat les instàncies dels quatre tipus vigilats. Màxim de crides pseudoaleatòries per instància observat: `unitats:9` **13**; `escales:15` **30**; `escales:18` **44**; `estimacio:17` **12**. No equival a una demostració formal de terminació per a tots els valors aleatoris possibles.

## Limitacions rellevants

- **108 tipus encara no disposen d'un oracle aritmètic independent** en aquesta bateria. Per a aquests, hem validat generació, presència i singularitat textual de les opcions, resposta present i camps de suport.
- **No s'ha comprovat l'equivalència matemàtica de cadenes diferents** (p. ex. 0,5 m i 50 cm); hi pot haver distractors semànticament duplicats.
- **`estimacio:11` conserva una ambigüitat pedagògica confirmada** en algunes alternatives de precisió sense indicar l'instrument. No és un error que l'oracle purament numèric pugui detectar.
- No es prova encara la navegació real del navegador ni tots els modes d'interacció.
- Els arrodoniments detectats en `estimacio:12` continuen requerint explicitar la convenció de l'extrem superior.

## Proper pas

Ampliar els oracles independents dels 108 tipus restants amb prioritat segons risc matemàtic i construir un test de **distractors numèrics equivalents després de normalitzar unitats**. No canviar automàticament el contingut ni els nivells oficials abans de documentar defectes reals i aprovar la intervenció.

**Test:** `scripts/test-mesura-2eso-oracles-ampliats-20.cjs`.

**CI:** https://github.com/srigual-png/mates-interactives/actions/runs/44062997347

No s'ha modificat cap generador, classificació oficial o família; tampoc no s'ha fusionat ni desplegat la PR #49.
