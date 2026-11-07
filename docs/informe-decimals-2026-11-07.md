# Tema 09 · Nombres decimals · 7 de novembre de 2026

Implementades 23 famílies ordinàries: N1 11 (Normal), N2 8 (Normal), N3 4 (Ampliació). D10–D12 recuperades del banc; D14–D23 incorporades exclusivament al catàleg adaptatiu. D13 reutilitza `volum-amb-error`, sense duplicar-ne la identitat al catàleg.

Els dos P0 queden corregits amb enters escalats: arrodoniment escolar exacte i divisió amb quocient enter/residu. Verificats 1,005 → 1,01; 9,995 → 10,00; 7,386 → 7,39; 9,999 → 10,00, i les cordes 13,2/2,2 i 21,7/2,7. No s’alteren dades per evitar residus zero.

Models de resposta serialitzables per conservar la correcció exacta en errors guardats i repàs. Coma o punt en decimals simples; equivalència de zeros finals; precisió obligatòria quan es demana; fraccions irreductibles; intervals estrictes amb múltiples respostes; signes d’ordenació; enters no negatius per a quantitats discretes. Respostes compostes en camps separats i diagnòstic amb selector de motiu. No s’accepten components sobrants ni expressions arbitràries. Imports mostrats amb dos decimals.

Reutilitzat el motor adaptatiu compartit: guiada de 10 encerts acumulats (llindars 3/6), autònoma de 20 respostes (6/12), +1/−1 amb mínim zero, històric per nivell, rotació, límits de regeneració i reserves deterministes. Barra i avisos, sortida voluntària i resum comú: 10 encerts i 2 errors = 10/12 · 83,3%.

Recta SVG de deu intervals amb referències etiquetades, punt A i alternativa accessible. Verificada a 390 px sense desbordament horitzontal.

## Fitxers

- `assets/js/decimals-1eso.js`: catàleg, aritmètica, models i recta.
- `1eso/sentit-numeric.html`: generadors heretats corregits i integració mínima amb pràctica, banc, exàmens i errors.
- `1eso/teoria/numeric/nombres-decimals-1r-eso.html`: procediments i exemples que faltaven.
- `assets/js/examen-tema.js`: enllaç específic a teoria en la correcció de decimals.
- `scripts/comprova-decimals-exactes.cjs`: proves exactes i generació determinista.
- `scripts/comprova-decimals-1eso.cjs`: proves en Edge amb Playwright ja instal·lat.
- Aquest informe.

## Proves executades

- `node scripts/comprova-decimals-exactes.cjs`: 4.600 exercicis, casos de referència D14–D23, P0, mitjanes exactes/arrodonides, irreductibilitat, formats, residus, quatre opcions i una única correcta, ancoratges.
- `node scripts/comprova-decimals-1eso.cjs`: guiada sense errors i amb errors intermedis; autònoma de 20 encerts i de 20 errors; rotació d’11 famílies a N1; llindars de pujada/baixada; historial; reserves deterministes i esgotament; sortida voluntària; resum real; examen de tema de 12 preguntes amb quotes 6/3/3; global de 20; banc i global amb camps separats i rebuig de resposta incompleta; metadades i validador d’errors restaurats; compatibilitat d’errors antics; accés als vuit temes anteriors.
- Els 23 enllaços de teoria s’han seguit en navegador i comprovat contra seccions amb procediment i exemple resolt.
- `node scripts/comprova-enters-1eso.cjs`: regressió del tema 08 (pràctica, generadors, exàmens, banc, errors i pantalles).
- Captures revisades: `../output/decimals-2026-11-07/recta-mobil.png`, `composta-mobil.png`, `resum-mobil.png`. També s’ha provat el selector D22 i la tria amb respostes compostes.
- `git diff --check`; revisió del diff. Cap dependència instal·lada. Cap fitxer curricular dels temes 01–08 modificat. Generadors i identificadors d’examen preservats, sense incorporar automàticament D14–D23 als exàmens.

## Matriu teoria ↔ exercicis

| Família | Nivell | Explicació suficient | Exemple resolt | Enllaç funcional | Estat |
|---|---|---|---|---|---|
| D01 · Sumar decimals | N1 | Sí | Sí | [#operacions](../1eso/teoria/numeric/nombres-decimals-1r-eso.html#operacions) | Complet |
| D02 · Multiplicar decimals | N1 | Sí | Sí | [#operacions](../1eso/teoria/numeric/nombres-decimals-1r-eso.html#operacions) | Complet |
| D03 · Arrodonir decimals | N1 | Sí | Sí | [#arrodonir](../1eso/teoria/numeric/nombres-decimals-1r-eso.html#arrodonir) | Complet |
| D04 · Fracció a decimal | N1 | Sí | Sí | [#fraccions](../1eso/teoria/numeric/nombres-decimals-1r-eso.html#fraccions) | Complet |
| D05 · Decimal a fracció irreductible | N1 | Sí | Sí | [#fraccions](../1eso/teoria/numeric/nombres-decimals-1r-eso.html#fraccions) | Complet |
| D06 · Canvi d’una compra | N2 | Sí | Sí | [#compra-canvi](../1eso/teoria/numeric/nombres-decimals-1r-eso.html#compra-canvi) | Complet |
| D07 · Quantitat per unitat | N2 | Sí | Sí | [#problemes](../1eso/teoria/numeric/nombres-decimals-1r-eso.html#problemes) | Complet |
| D08 · Error absolut | N1 | Sí | Sí | [#error-absolut](../1eso/teoria/numeric/nombres-decimals-1r-eso.html#error-absolut) | Complet |
| D09 · Error relatiu | N2 | Sí | Sí | [#error-relatiu](../1eso/teoria/numeric/nombres-decimals-1r-eso.html#error-relatiu) | Complet |
| D10 · Quantitat unitària per divisió | N2 | Sí | Sí | [#divisio-unitaria](../1eso/teoria/numeric/nombres-decimals-1r-eso.html#divisio-unitaria) | Complet |
| D11 · Quocient enter i residu decimal | N2 | Sí | Sí | [#repartiment-residu](../1eso/teoria/numeric/nombres-decimals-1r-eso.html#repartiment-residu) | Complet |
| D12 · Mitjana decimal | N2 | Sí | Sí | [#mitjana-decimal](../1eso/teoria/numeric/nombres-decimals-1r-eso.html#mitjana-decimal) | Complet |
| D13 · Garanties de quantitat i capacitat | N3 | Sí | Sí | [#garanties-volum](../1eso/teoria/numeric/nombres-decimals-1r-eso.html#garanties-volum) | Complet |
| D14 · Valor posicional | N1 | Sí | Sí | [#valor-posicional](../1eso/teoria/numeric/nombres-decimals-1r-eso.html#valor-posicional) | Complet |
| D15 · Comparar i ordenar | N1 | Sí | Sí | [#comparar](../1eso/teoria/numeric/nombres-decimals-1r-eso.html#comparar) | Complet |
| D16 · Recta decimal | N1 | Sí | Sí | [#recta-decimal](../1eso/teoria/numeric/nombres-decimals-1r-eso.html#recta-decimal) | Complet |
| D17 · Resta amb reagrupament | N1 | Sí | Sí | [#operacions](../1eso/teoria/numeric/nombres-decimals-1r-eso.html#operacions) | Complet |
| D18 · Divisió per divisor decimal | N2 | Sí | Sí | [#dividir](../1eso/teoria/numeric/nombres-decimals-1r-eso.html#dividir) | Complet |
| D19 · Potències de deu | N1 | Sí | Sí | [#potencies-deu](../1eso/teoria/numeric/nombres-decimals-1r-eso.html#potencies-deu) | Complet |
| D20 · Decimal entre dos valors | N2 | Sí | Sí | [#entre-decimals](../1eso/teoria/numeric/nombres-decimals-1r-eso.html#entre-decimals) | Complet |
| D21 · Reconstrucció de xifres | N3 | Sí | Sí | [#reconstruir](../1eso/teoria/numeric/nombres-decimals-1r-eso.html#reconstruir) | Complet |
| D22 · Diagnòstic d’errors | N3 | Sí | Sí | [#errors-decimals](../1eso/teoria/numeric/nombres-decimals-1r-eso.html#errors-decimals) | Complet |
| D23 · Estimar i acotar | N3 | Sí | Sí | [#estimar](../1eso/teoria/numeric/nombres-decimals-1r-eso.html#estimar) | Complet |

Publicació: branca local `main` sincronitzada amb `origin/main` abans del commit. Un únic commit per a Nombres decimals; sense force push ni reset. L’execució s’atura en aquest tema.
