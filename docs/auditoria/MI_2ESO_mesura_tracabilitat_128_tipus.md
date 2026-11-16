# Traçabilitat estructurada · 128 tipus de Sentit de la mesura, 2n ESO

**Estat: PROVISIONAL.** La font principal és [`MI_2ESO_mesura_tracabilitat_128_tipus.json`](MI_2ESO_mesura_tracabilitat_128_tipus.json), traçable als set informes temàtics i la [revisió transversal](MI_2ESO_mesura_revisio_transversal.md) de la PR #49. L'assignació **no és un registre de famílies genuïnes validades**.

## Cobertura verificable

| Tema | Tipus exhaustius | Tipus amb enllaços a candidats d'altres temes |
|---|---:|---:|
| `unitats` | 18 | 0 |
| `escales` | 18 | 1 |
| `pitagores` | 16 | 1 |
| `perimetres` | 18 | 1 |
| `superficies` | 20 | 1 |
| `estimacio` | 18 | 1 |
| `problemes` | 20 | 14 |
| **Total** | **128** | **19** |

Cada registre identifica `topic`, `type`, `source_candidate`, `cross_topic_links` i `status: provisional`. Les referències transversals són exemples **no exhaustius** de procediments que s'assemblen; no representen fusió definitiva, ni similitud simètrica necessàriament. Un tipus amb zero enllaços **no s'ha acreditat com a únic**.

### Casos de variants separats explícitament

- `unitats:6`: directes N1 / encadenades N2 (modificació funcional proposada a la PR #51 i integració a la #53).
- `pitagores:15`: `diagonal` N2 / `catet` N1.
- `superficies:17`: `sameBase` N1 / altres N2.
- `unitats:18` N2 i `problemes:4` N1 són canvis proposats a la PR #52 i integrats a la #53. **No alteren el recompte de 128 tipus.**

### Advertiments sobre agrupacions temporals

- Les sigles `U`, `E`, `P`, `PA`, `SV`, `EP` i `PM` són **codis locals dels informes**; no es poden sumar com si fossin famílies de tot el bloc.
- `PM13` reuneix de manera provisional dos raonaments diferents: comparació d'error relatiu (`problemes:16`) i estimació contextual (`problemes:17`). S'han de separar en la deduplicació definitiva.
- `PM14` és una agrupació residual amb `problemes:18` (conversió de superfície), `problemes:19` (litres de precipitació) i `problemes:20` (inversió del volum cilíndric). **No és una família genuïna**.
- Alguns contextos inclouen més d'un procés: `problemes:1` (àrea útil + rendiment + arrodoniment), `problemes:2` (recompte de rajoles), `problemes:3` (volum + percentatge). No s'han de fusionar automàticament amb exercicis de fórmula directa.
- La traçabilitat no resol per si sola si una diferència de context justifica N1/N2, ni prova que hi hagi N3; cal una revisió docent i oracles de generació.

## Com comprovar-ne la integritat

Executa `node scripts/test-mesura-2eso-tracabilitat.cjs`. El test comprova:

1. Tots els identificadors de tipus 1–18, 1–16 o 1–20 segons el tema, **sense buits ni duplicacions**;
2. 128 registres, 7 temes, etiquetes candidates amb format correcte;
3. referències entre temes que existeixen i no són autorreferències;
4. les sis variants de tres tipus especials, amb nivell proposat N1 o N2;
5. estat exclusivament provisional.

El workflow de la PR comprova aquest script. **Aquesta verificació és estructural, no matemàtica ni curricular.**

## Proper criteri de tancament pedagògic

Per convertir els registres en famílies genuïnes: identificar un únic nucli matemàtic per tipus o variant (i justificar les composicions), confirmar dues mostres reals resoltes per família, explicitar errors habituals i nivells, comparar els continguts de teoria/fitxes/examen i revalidar en navegador. Només després de consens i fusió funcional s'ha d'actualitzar `families-validades.json`.
