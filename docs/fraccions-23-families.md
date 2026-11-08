# Fraccions · implementació del 8 de novembre de 2026

Base: `main` / `origin/main`, commit `157d7b5f29dbf288ef315b4de003ed1bc7598fa0`, consultat abans d’implementar.

23 famílies accessibles: 9 N1, 9 N2, 5 N3. F02 conserva suma igual/diferent amb una sola identitat; F11 conserva biblioteca/esports. F11–F16 incorporades a la pràctica. F18–F23 implementades. F17 reutilitza el generador de raonament existent.

C01–C04: alternatives deduplicades pel valor racional exacte; una única resposta correcta; consigna irreductible i comprovació de forma; resposta composta Persona/Diferència amb dos camps obligatoris; divisió amb parèntesis i ÷. Equivalència lliure, irreductibilitat, denominador fixat, mixt propi i numerador enter tenen models separats. No s’utilitza eval ni Function. Els models es poden serialitzar.

Motor adaptatiu compartit: guiada 10 encerts acumulats i llindars 3/6; autònoma 20 respostes i llindars 6/12. +1/−1 punts, mínim zero, comptadors reals i prevenció de doble enviament. Rotació per família, historial en canvis de nivell i reserves deterministes amb reintents limitats al mateix nivell. Resultat verificat: 10/12 · 83,3%.

Els tipus històrics 1–11 i 1–7, TOPICS[].gen i MIFirstNumericTasks.extend continuen disponibles. Les quotes històriques d’examen no s’han modificat: el tema genera 12 preguntes, amb 8/3/1 segons el classificador revisat existent; el global continua amb 20. Metadades de teoria i validació propagades al banc, exàmens, errors nous i repàs; els errors antics conserven l’enunciat i un enllaç general. No es regenera la pregunta guardada.

## Fitxers

- `assets/js/fraccions-1eso.js`: catàleg, generació, racionals, models i dibuix SVG accessible.
- `1eso/sentit-numeric.html`: integracions de pràctica, banc, errors i examen global.
- `1eso/teoria/numeric/fraccions-1r-eso.html`: 23 procediments i exemples amb ancoratges.
- `assets/js/examen-tema.js`: etiquetes de components i enllaços de teoria de Fraccions.
- `scripts/comprova-fraccions-1eso.cjs`: proves dirigides de navegador.
- Aquest informe.

## Validació

- `node --check assets/js/fraccions-1eso.js`
- `node --check assets/js/examen-tema.js`
- `node scripts/comprova-fraccions-1eso.cjs`: quatre escenaris de sessió, llindars, doble enviament, sortida, vint instàncies N1/N3, rotació, reserves amb col·lisions, exhauriment, formes racionals, sis exemples nous, camps del banc/examen, metadades, errors antics/nous i els 23 ancoratges navegats.
- `node scripts/comprova-decimals-1eso.cjs`: regressió de Decimals i comprovacions breus dels temes anteriors.
- `git diff --check`.
- Comprovació visual mòbil de F18, F19, F16, F21 i resultat; sense desbordament horitzontal. Captures a `../output/fraccions-2026-11-08/`.

No s’han modificat altres temes, fitxes Word/PDF, quotes globals ni dependències.

## Cobertura per família

| Família | Nivell | Procediment explicat | Exemple resolt | Enllaç funcional | Estat |
|---|---|---|---|---|---|
| F01 | N1 | Sí | Sí | [Verificat](../1eso/teoria/numeric/fraccions-1r-eso.html#simplificar) | Completada |
| F02 | N2 | Sí | Sí | [Verificat](../1eso/teoria/numeric/fraccions-1r-eso.html#sumar) | Completada |
| F03 | N1 | Sí | Sí | [Verificat](../1eso/teoria/numeric/fraccions-1r-eso.html#multiplicar) | Completada |
| F04 | N1 | Sí | Sí | [Verificat](../1eso/teoria/numeric/fraccions-1r-eso.html#dividir) | Completada |
| F05 | N2 | Sí | Sí | [Verificat](../1eso/teoria/numeric/fraccions-1r-eso.html#comparar) | Completada |
| F06 | N1 | Sí | Sí | [Verificat](../1eso/teoria/numeric/fraccions-1r-eso.html#equivalents) | Completada |
| F07 | N2 | Sí | Sí | [Verificat](../1eso/teoria/numeric/fraccions-1r-eso.html#quantitat-restant) | Completada |
| F08 | N1 | Sí | Sí | [Verificat](../1eso/teoria/numeric/fraccions-1r-eso.html#tipus) | Completada |
| F09 | N1 | Sí | Sí | [Verificat](../1eso/teoria/numeric/fraccions-1r-eso.html#quantitat) | Completada |
| F10 | N1 | Sí | Sí | [Verificat](../1eso/teoria/numeric/fraccions-1r-eso.html#equivalencies) | Completada |
| F11 | N2 | Sí | Sí | [Verificat](../1eso/teoria/numeric/fraccions-1r-eso.html#parts-disjuntes) | Completada |
| F12 | N2 | Sí | Sí | [Verificat](../1eso/teoria/numeric/fraccions-1r-eso.html#fraccio-fraccio) | Completada |
| F13 | N2 | Sí | Sí | [Verificat](../1eso/teoria/numeric/fraccions-1r-eso.html#retirades-successives) | Completada |
| F14 | N3 | Sí | Sí | [Verificat](../1eso/teoria/numeric/fraccions-1r-eso.html#reconstruir-total) | Completada |
| F15 | N2 | Sí | Sí | [Verificat](../1eso/teoria/numeric/fraccions-1r-eso.html#complement-divers) | Completada |
| F16 | N2 | Sí | Sí | [Verificat](../1eso/teoria/numeric/fraccions-1r-eso.html#comparacio-diferencia) | Completada |
| F17 | N3 | Sí | Sí | [Verificat](../1eso/teoria/numeric/fraccions-1r-eso.html#reconstruccio-successiva) | Completada |
| F18 | N1 | Sí | Sí | [Verificat](../1eso/teoria/numeric/fraccions-1r-eso.html#representacio-visual) | Completada |
| F19 | N1 | Sí | Sí | [Verificat](../1eso/teoria/numeric/fraccions-1r-eso.html#quocient-impropies) | Completada |
| F20 | N2 | Sí | Sí | [Verificat](../1eso/teoria/numeric/fraccions-1r-eso.html#equivalents-restriccions) | Completada |
| F21 | N3 | Sí | Sí | [Verificat](../1eso/teoria/numeric/fraccions-1r-eso.html#diagnosticar-errors) | Completada |
| F22 | N3 | Sí | Sí | [Verificat](../1eso/teoria/numeric/fraccions-1r-eso.html#operand-desconegut) | Completada |
| F23 | N3 | Sí | Sí | [Verificat](../1eso/teoria/numeric/fraccions-1r-eso.html#fraccio-intermedia) | Completada |
