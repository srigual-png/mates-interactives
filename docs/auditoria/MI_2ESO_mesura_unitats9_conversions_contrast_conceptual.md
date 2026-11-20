# Criteri comparatiu pendent: unitats:9 vs conversions directes — 2n ESO

**Objectiu:** tancar la valoració conceptual abans de crear més proves aleatòries redundants.

El codi actual presenta tres tasques curricularment diferenciades:
- `unitats:1`: conversió d'una longitud entre unitats del sistema mètric, amb resposta numèrica i unitat.
- `unitats:4`: conversió de capacitat entre unitats, amb resposta numèrica i unitat.
- `unitats:5`: conversió de massa entre unitats, amb resposta numèrica i unitat.
- `unitats:9`: comparació de longituds en **metres i centímetres**, amb resposta relacional («La primera és més gran» / «La segona és més gran»). Un dels passos és portar-les a la mateixa unitat.

**Proposta pedagògica provisional:** `unitats:9` comparteix amb `unitats:1` una **conversió de longitud**, però afegeix una comparació i canvia el tipus de resposta. Respecte a `unitats:4` i `unitats:5`, comparteix la tècnica de factors decimals, però les magnituds (capacitat, massa) no són intercanviables en la tasca. Per tant, no és correcte donar per fet que siguin quatre exercicis equivalents ni comptar-los com una família validada només pel patró «convertir unitats».

**Contrast completat:** `scripts/test-mesura-2eso-integracio-pedagogica-unitats.cjs` valida 140 conversions de `unitats:1` i 50 comparacions de `unitats:9` amb oracles independents; observa les dues direccions de comparació i confirma que no hi ha entrada exacta compartida. `scripts/test-mesura-2eso-integracio-pedagogica-unitats-4-5.cjs` afegeix 35 casos per tipus en 1/4/5/9 i confirma que la comparació és una decisió relacional distinta de convertir una sola quantitat. El mode agregat comprova tipus 1/4/5 amb resposta oberta i tipus 9 amb resposta tancada en DOM simulat. **Conclusió:** relació parcial (cap dada d’entrada idèntica amb 1); N2 candidat per a 9 i N1 per a conversió directa, tots pendents d’aprovació docent. No s’han canviat els generadors ni els casos.
