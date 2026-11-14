# Sentit algebraic · Lot 1 · Resum final

## Catàleg consolidat

| Tema | Famílies locals | N1 | N2 | N3 | IDs únics del tema |
|---|---:|---:|---:|---:|---:|
| Traducció (`traduccio`) | 6 | 4 | 2 | 0 | 5 |
| Patrons (`patrons`) | 5 | 3 | 2 | 0 | 5 |
| Monomis (`monomis`) | 5 | 5 | 0 | 0 | 4 |
| **Lot 1, deduplicat** | **15 IDs matemàtics** | **11** | **4** | **0** | **15** |

L’avaluació per substitució és una mateixa família pedagògica i conserva un ID únic, `avaluar-expressio-per-substitucio`, compartit entre Traducció i Monomis. El recompte de 16 registres locals es redueix a 15 famílies úniques. No s’ha creat cap N3: cap procediment del lot requereix reconstrucció o justificació amb restriccions; elevar-ne un només per arribar a una quota seria artificial.

## Dades i decisions principals

- La traducció verbal amb agrupació és una variant del tipus 1, però sí que constitueix una família separada perquè exigeix representar l’abast del factor amb parèntesis. Queda en N2.
- Llegir una regla recurrent de suma/resta es classifica N1; P7 baixa de N2 a N1. Continuar un patró multiplicatiu és una família diferent de la suma constant.
- Substituir un valor i calcular una expressió és N1, tant a Traducció com a Monomis; M6 baixa de N2 a N1 i el seu nivell intern queda alineat.
- M3/M4 reduïen termes semblants i dupliquen el procediment de `simplificacio`. Es conserven els patrons, però queden vinculats a aquest tema; el tipus intern de Monomis passa a identificar termes i signes sense simplificar.
- Els enunciats de traducció s’han aclarit quant a l’ordre de les operacions. Les preguntes de patrons especifiquen el canvi o el model que s’ha de mantenir. Els generadors de Monomis incorporen casos amb zero i signes negatius.

## Proves executades

- Tests matemàtics: Traducció 3.250; Patrons 3.250; Monomis 2.500 generacions verificades. Tots superats; cada test usa llavor fixa, oracles independents, nivells, respostes, opcions, solucions, classificació i rotació.
- Playwright amb **Chrome**: els tres tests cobreixen 500 generacions internes per tema; prova de pràctica guiada i autònoma, recuperació, examen de tema de 12 preguntes, examen global de 20 preguntes, teoria, ajudes, ancoratges directes i `hashchange`, i vista de 390 px. Sense errors JavaScript.
- Regressions: 30 exercicis per `simplificacio`, `equacions`, `computacional`, `patrons2`, `monomis2`, `simplificacio2` i `equacions2` en cada execució dels tres tests de navegador.
- `node --check` i `git diff --check`: superats.
- GitHub Actions `Verifica inventaris fase A` (run #76): èxit. És una comprovació d’inventaris, no substitueix els tests matemàtics ni Playwright locals. No s’ha verificat GitHub Pages; no s’ha fet desplegament remot.
- Limitació del navegador: l’`href` contextual resol i la teoria s’ha carregat directament; no s’ha pogut provar el clic pràctica → teoria perquè Chrome no navega en `file://` i el sandbox bloqueja un servidor HTTP local. Cal repetir aquest clic en un navegador amb servidor web.

## Fitxers funcionals i informes

Catàleg: `assets/js/algebraic-1eso-families.js`. Integració: `assets/js/dificultat-mi.js`, `assets/js/examen-tema.js` i `1eso/sentit-algebraic.html`. Tests i oracles: scripts `comprova-algebraic-{traduccio,patrons,monomis}-families-1eso.cjs`, els tres scripts Playwright homònims sense el sufix `-families`, i helpers `algebraic-1eso-families-test-helper.cjs`, `algebraic-1eso-math-oracles.cjs`, `algebraic-1eso-playwright-helper.cjs`.

Informes detallats: [Traducció](MI_1ESO_algebraic_traduccio_informe_final.md), [Patrons](MI_1ESO_algebraic_patrons_informe_final.md), [Monomis](MI_1ESO_algebraic_monomis_informe_final.md).
