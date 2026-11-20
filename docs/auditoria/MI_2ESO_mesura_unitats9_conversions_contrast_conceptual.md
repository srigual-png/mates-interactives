# Criteri comparatiu pendent: unitats:9 vs conversions directes — 2n ESO

**Objectiu:** tancar la valoració conceptual abans de crear més proves aleatòries redundants.

El codi actual presenta tres tasques curricularment diferenciades:
- `unitats:1`: conversió d'una longitud entre unitats del sistema mètric, amb resposta numèrica i unitat.
- `unitats:4`: conversió de capacitat entre unitats, amb resposta numèrica i unitat.
- `unitats:5`: conversió de massa entre unitats, amb resposta numèrica i unitat.
- `unitats:9`: comparació de longituds en **metres i centímetres**, amb resposta relacional («La primera és més gran» / «La segona és més gran»). Un dels passos és portar-les a la mateixa unitat.

**Proposta pedagògica provisional:** `unitats:9` comparteix amb `unitats:1` una **conversió de longitud**, però afegeix una comparació i canvia el tipus de resposta. Respecte a `unitats:4` i `unitats:5`, comparteix la tècnica de factors decimals, però les magnituds (capacitat, massa) no són intercanviables en la tasca. Per tant, no és correcte donar per fet que siguin quatre exercicis equivalents ni comptar-los com una família validada només pel patró «convertir unitats».

**Proves existents:** `scripts/test-mesura-2eso-cinc-variants-escales-perimetres-unitats.cjs` comprova 40 exemplars de `unitats:9` matemàticament amb oracle independent. **Pendent:** 2 parelles reals amb dada compartida a `unitats:1` i comprovar resposta, distractors i càrrega cognitiva als modes guiat, autònom i examen. Sense canvis a generadors ni aprovacions.
