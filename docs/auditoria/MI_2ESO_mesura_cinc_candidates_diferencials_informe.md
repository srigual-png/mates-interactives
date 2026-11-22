# Cinc candidates: diferència observable respecte als generadors reals · Mesura 2n ESO

**Estat: cribratge orientatiu, no autorització de noves famílies ni nivells N3.** Fitxes: [MI_2ESO_mesura_cinc_candidates_diferencials.json](MI_2ESO_mesura_cinc_candidates_diferencials.json).

## Contrast amb el codi existent

He inspeccionat els enunciats i les guies dels tipus més propers a `2eso/sentit-mesura.html` (branca de la PR #49), no només les etiquetes del catàleg.

| Proposta | Què demana el tipus actual més proper | Diferència que es pot verificar | Estat |
|---|---|---|---|
| **Escales** | `escales:6/7`: àrea a partir d'una escala. `escales:14`: diagnosticar un error de càlcul d'escala | Reconstruir **dues** geometries reals i verificar la compatibilitat de dimensions, no només l'àrea | **Candidata a família diferenciada per revisar** |
| **Perímetres** | `perimetres:8`: un semicercle aïllat inclou arc **i diàmetre** al perímetre. `perimetres:10`: àrea conjunta de rectangle i semicercle | En una figura **unida**, la vora comuna deixa de ser exterior i cal excloure-la del contorn | **Candidata a família diferenciada per revisar** |
| **Estimació** | `estimacio:7`: error relatiu; `estimacio:9`: comparació de precisions | Ser **més precís** no implica ser **admissible** si una tolerància externa és insuficient | **Candidata a família diferenciada per revisar** |
| **Unitats** | `unitats:6`: equivalència capacitat-volum; `unitats:9`: comparar quantitats després de normalitzar-les | Seleccionar el recipient de menor capacitat que satisfà una restricció; suma/conversió/comparació ja conegudes | **Problema compost, no família nova acreditada** |
| **Superfícies** | `superficies:1/2/16`: volum i superfície de capsa; `problemes:13`: material de capsa sense tapa | Exigir simultàniament volum mínim i superfície màxima: dues fórmules conegudes i verificació de dues condicions | **Problema compost, no família nova acreditada** |

## Tres proves que distingeixen procediments

1. **Escales — mateixa superfície no implica mateix espai:** 4×3 m i 6×2 m tenen tots dos **12 m²**, però dimensions diferents. Si l'objectiu és comprovar compatibilitat geomètrica dels plànols, comparar àrees no és suficient. Cal decidir si es permeten rotacions.
2. **Perímetres — vora compartida:** rectangle de 6×4 m i semicercle de diàmetre 4 m. La suma ingènua dels perímetres compta dues vegades el costat compartit; el contorn real és **22,28 m** amb π≈3,14.
3. **Estimació — millor no vol dir acceptable:** referència de 100 cm, mesures de 99 i 98 cm, tolerància 0,5%. La primera és més precisa (**1%** davant **2%** d'error), però **cap de les dues** compleix la tolerància.

Aquests contraexemples **mostren una decisió diferenciable**, però no demostren encara que cada conjunt mereixi una família genuïna independent ni que hagi de ser N3.

## Decisions i següent porta de validació

- Prioritzar **Escales, Perímetres i Estimació** per a una especificació pedagògica que delimiti objectiu, entrada de dades, estratègia, tipus d'error i condicions límit.
- Mantenir **Unitats i Superfícies** com a candidates de pràctica composta; no augmentar el recompte de famílies amb elles.
- Exigir per a les tres candidates prioritàries variació real de la situació, oracles independents i comprovació de què la tasca no és una simple variant de les existents.
- No assignar N3 definitiu abans d'avaluar currículum i càrrega cognitiva; no modificar `families-validades.json`, els generadors o el mapa de dificultats sense aprovació.

El validador `scripts/test-mesura-2eso-cinc-candidates-diferencials.cjs` ha passat a GitHub Actions **#44050982054**: coherència de les cinc fitxes, referències als tipus inventariats i els tres contraexemples.

**Cap PR fusionada ni canvis a la web publicada.**
