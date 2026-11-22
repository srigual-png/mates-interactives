# Correccions autoritzades — Estimació 1 i 11 · 2n ESO

**Estat:** dues correccions implementades a la branca de la PR #49 per autorització explícita de l'usuari. Sense fusió ni desplegament.

## Canvis fets al generador real

- `estimacio:1`: al cas «gruix d'un telèfon mòbil», el distractor equivalent `0,8 m` s'ha substituït per `0,8 mm`; s'evita la duplicació amb `80 cm` i es conserven quatre valors diferents. Es manté `8 mm` com a resposta prevista.
- `estimacio:11`: s'ha eliminat l'antiga pregunta subjectiva «Quina manera d'expressar ... té una precisió i una unitat raonables?» amb possibles opcions igualment plausibles. Ara quatre contextos de 2n ESO (fusta, piscina, recipient d'aigua i recorregut) indiquen el **marge màxim d'error admès** i el **marge màxim d'error garantit** per quatre instruments. La pregunta demana triar **l'instrument menys precís que compleix el requisit**. La correcció és objectiva: marge de l'instrument ≤ marge admissible i, entre els admissibles, el més gran. Les justificacions de la guia i la solució expliquen la tria.

La reformulació d'`estimacio:11` evita limitar-se a arrodonir i no duplica directament `estimacio:5` o `estimacio:16`.

## Regressions i validació

| Prova | Resultat |
|---|---|
| `scripts/test-mesura-2eso-estimacio-1-11-correccions.cjs` | 400 mostres de la decisió de precisió + 400 mostres de l'estimació contextual; **success**, CI **#44065319422** |
| `scripts/test-mesura-2eso-oracles-ampliats-20.cjs` | 5.120 instàncies dels 128 tipus, amb 800 contrastos independents de 20 tipus; **success**, CI **#44065260730** |
| `scripts/test-mesura-2eso-generacio-128-mostra.cjs` | 1.536 instàncies / 128 tipus, controls estructurals i sis oracles; **success**, CI **#44065260048** |
| `scripts/test-mesura-2eso-distractors-equivalents-128.cjs` | 7.680 instàncies, **0 duplicats numèrics detectats**, CI **#44065260118** |
| `scripts/test-mesura-2eso-prioritats-24-codi.cjs` | S'ha actualitzat perquè distingeixi la documentació històrica de les ambigüitats originals ja corregides; **success**, CI **#44065260139** |

**Important:** les proves numèriques no equivalen a revisió exhaustiva de cada generador ni de tots els distractors que no són numèrics. Els informes d'auditoria històrica es conserven com a traçabilitat de les incidències que hi havia abans de la correcció.

## Criteri pedagògic conservat

- El nivell 5–5–3 és orientatiu, no una quota obligatòria.
- Tots dos exercicis han de ser comprensibles per a alumnat de **2n ESO**.
- No es crea cap família nova ni es reclassifica oficialment cap nivell.
- No s'ha fusionat la PR #49 ni publicat cap canvi a la web.

**Pas següent recomanat:** comprovar que la presentació real al navegador i els modes d'interacció mostren correctament els nous enunciats. Cal comprovar també la qualitat de les opcions, no només la seva unicitat numèrica.
