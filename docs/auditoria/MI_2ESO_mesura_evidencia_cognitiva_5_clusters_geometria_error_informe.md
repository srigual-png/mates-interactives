# Evidència cognitiva de cinc agrupacions · Sentit de la mesura, 2n ESO

**Data:** 17/11/2026 · **Estat:** propostes pedagògiques sense aprovació de famílies ni nivells.

## Comprovació de traçabilitat

El test `scripts/test-mesura-2eso-evidencia-cognitiva-5-clusters.cjs` ha contrastat els **12 tipus** de les agrupacions **C010, C017, C021, C051 i C052** amb el codi real de `2eso/sentit-mesura.html`. **GitHub Actions #44076948374: success**.

La primera execució (#44076666803) va fallar per un requisit arbitrari de longitud del text de les justificacions del test; s'ha corregit únicament el test, sense modificar els generadors.

## Orientació pedagògica per agrupació

| Agrupació | Nucli compartit | Distinció de dificultat |
|---|---|---|
| C010 | Arrodoniment i error màxim | Trobar la meitat del pas de precisió és més directe que construir un interval compatible i justificar-ne els extrems |
| C017 | Error relatiu | Calcular el quocient, expressar percentatge o rebre ja l'error absolut són variants amb diferent nombre de passos |
| C021 | Fórmules inverses d'àrea | Triangle i trapezi requereixen aïllar incògnites, però el trapezi exigeix coordinar les dues bases |
| C051 | Volum de prisma | Ortoedre, cub i prisma amb àrea de base donada comparteixen el nucli volum = base × altura; no equivalen necessàriament a famílies noves |
| C052 | Invertir fórmula de volum | Recuperar altura o àrea de base és el mateix model invers, amb unitat final diferent |

### Precaucions

- **`estimacio:12`**: abans de consolidar el nivell o donar per única la resposta, cal explicitar la convenció d'arrodoniment als punts exactament equidistants.
- **`estimacio:7/8/13`**: la diferència de passos no converteix automàticament un exercici en N3.
- **`perimetres:12/13`**: fórmules diferents no garanteixen per si soles famílies matemàtiques independents.
- **`superficies:1/3/5` i `superficies:10/11`**: evitar que la variació de dades o incògnita infli el recompte de famílies.

## Límits

La prova verifica la traçabilitat de la documentació amb les branques del generador. No és una observació d'alumnat, ni un estudi d'èxit per nivells, ni prova exhaustiva d'ambigüitat de distractors.

La fitxa estructurada amb exemples i nivells candidats és `docs/auditoria/MI_2ESO_mesura_evidencia_cognitiva_5_clusters_geometria_error.json`.

**Cap generador, nivell o família oficial s'ha modificat. La PR #49 continua oberta, sense fusió ni desplegament.**
