# Informe final — Visualització i modelització geomètrica · 1r ESO · Sentit espacial

## Abast i decisió

Auditoria de la pràctica `1eso/sentit-espacial.html`, generador `genVisualitzacio1r()` i banc obert V1–V5 a partir del `main` de la PR #34 (`cb7e7f233e84f49ea55dff2d97f1a17e96341608`). El tema queda amb **7 famílies: 4 N1, 3 N2 i 0 N3**. No s'afegeixen famílies per cobrir les quotes orientatives: els procediments curriculars reals es cobreixen amb set famílies, cinc de les quals reutilitzen identificadors estables d'altres temes.

## Inventari, famílies i nivells

| ID / família | Generadors i variants | Nivell anterior → final | Justificació |
|---|---|---:|---|
| `producte-base-alcada` — producte de files i columnes amb un rectangle | pràctica tipus 1; V1 | N1 → N1 | Comptar cel·les requereix una multiplicació directa; el dibuix és una representació de l'àrea rectangular validada amb Àrees. |
| `distributiva-model-rectangle` — interpretar la distributiva en un rectangle partit | pràctica tipus 2; V2 | N2 → N2 | Es calcula l'àrea de dues parts i se'n relaciona la suma amb el producte de l'amplada total per l'alçada. |
| `calcular-potencia` — representar el quadrat d'un nombre com a àrea | pràctica tipus 3 | N1 → N1 | Multiplicar costat per costat i escriure n² és una aplicació directa; és la mateixa família de potències. |
| `arrel-exacta-i-relacio-inversa` — trobar el costat a partir de l'àrea quadrada | pràctica tipus 4; V3 | N1 → N1 | Reconeixement d'una arrel quadrada exacta, compartit amb Potències i arrels. |
| `suma-senars-model-quadrat` — construir un quadrat afegint capes senars | pràctica tipus 5; V4 | N2 → N2 | Cal interpretar una seqüència de capes i relacionar-ne la suma amb n²; no requereix justificar una conjectura avançada. |
| `producte-fraccions` — producte de fraccions com a intersecció rectangular | pràctica tipus 6; V5 | N2 → N1 | La intersecció representa el producte de les dues fraccions i després se simplifica. És el procediment directe de Producte de fraccions; el diagrama no crea una família ni eleva la dificultat. |
| `compondre-arees-figures` — recuperar la part desconeguda a partir de l'àrea total | pràctica tipus 7 | N1 → N2 | Cal interpretar la descomposició sense solapament i reconstruir la part restant. Comparteix amb Àrees la composició de superfícies; es classifica N2 com a problema de reconstrucció. |

Els nivells anteriors provenen del mapa efectiu de tipus de pràctica i del banc contextual (V1–V5). Els canvis són: tipus 6/V5 de N2 a N1, perquè només apliquen el producte de fraccions; tipus 7 de N1 a N2, perquè reconstrueix una dada en un model de parts. La classificació final és única al catàleg de famílies i coincideix amb el classificador compartit, l'etiqueta interna `taskDifficulty`, els nivells seleccionables i els exàmens.

### Famílies compartides

| ID | Tema/sentit amb què es comparteix | Motiu |
|---|---|---|
| `producte-base-alcada` | Àrees | Mateixa multiplicació de dimensions d'un rectangle. |
| `calcular-potencia` | Potències i arrels | Mateix càlcul de costat elevat al quadrat. |
| `arrel-exacta-i-relacio-inversa` | Potències i arrels | Mateixa arrel quadrada exacta com a operació inversa. |
| `producte-fraccions` | Fraccions | La intersecció representa el mateix producte de fraccions. |
| `compondre-arees-figures` | Àrees | Mateixa suma/resta de parts d'una superfície composta. |

Les dues famílies noves de procediment visual són `distributiva-model-rectangle` i `suma-senars-model-quadrat`. Els models de quadrícula, quadrat, fraccions i part desconeguda són variants visuals dels procediments anteriors, no famílies addicionals.

## Matriu de cobertura i exemples resolts

| Família | Teoria ja existent / banc | Tres exemples (enunciat → resposta; nivell) | Error freqüent |
|---|---|---|---|
| Producte de files i columnes | `#rectangles`; V1 | 6 columnes i 4 files → 24 (N1); 8×3 cel·les → 24 (N1); 5 files de 7 cel·les → 35 (N1). | Sumar files i columnes en lloc de multiplicar. |
| Distributiva visual | `#distributiva`; V2 | amplades 3 i 4, alçada 5 → 35 u² (N2); 2 i 5 per alçada 3 → 21 u² (N2); 4 i 4 per alçada 2 → 16 u² (N2). | Multiplicar només una de les parts o sumar una dimensió en comptes de les àrees parcials. |
| Potència quadrada com a àrea | `#quadrats`; pràctica tipus 3 | costat 8 → 64 u² (N1); costat 6 → 36 u² (N1); costat 10 → 100 u² (N1). | Confondre àrea amb perímetre o amb 2n. |
| Arrel exacta com a costat | `#arrels`; V3 | àrea 121 u² → costat 11 (N1); 64 u² → 8 (N1); 144 u² → 12 (N1). | Dividir l'àrea per dos o confondre costat i perímetre. |
| Suma de senars i capes | `#patrons`; V4 | 1+3+5+7+9 → 25 (N2); primers 4 senars → 16 (N2); primers 6 senars → 36 (N2). | Afegir el senar següent quan es demana la suma dels primers n, o comptar n capes com 2n+1. |
| Producte de fraccions | `#fraccions`; V5 | 1/3 de l'amplada i 2/5 de l'alçada → 2/15 (N1); 1/4×3/5 → 3/20 (N1); 1/2×1/3 → 1/6 (N1). | Sumar numeradors i denominadors, o oblidar simplificar. |
| Part d'àrea desconeguda | `#reconstruccio`; pràctica tipus 7 | total 60, part coneguda 24 → 36 u² (N2); 84−42 → 42 u² (N2); 30−18 → 12 u² (N2). | Tornar a sumar la part coneguda al total o confondre àrees amb longituds. |

Els IDs d'ancoratge indicats són els de la pàgina de pràctica o de la teoria existent, sense canvis de teoria. No es modifica la teoria ni el CSS. Les cinc rutes V tenen enunciat, resposta comprovable, pistes i solució. Les preguntes de pràctica ofereixen quatre opcions úniques; la comprovació també rebutja distractors equivalents a la fracció correcta.

## Models visuals i canvis

- Tipus 1/V1: quadrícula rectangular amb el nombre indicat de files i columnes.
- Tipus 2/V2: quadrícula dividida per una línia ressaltada; les dues àrees parcials sumen l'àrea total i representen `(a+b)h=ah+bh`.
- Tipus 3: quadrat de costat s representat per una quadrícula s×s.
- Tipus 4/V3: quadrat amb costat desconegut i àrea indicada; s'ha ampliat l'amplada del SVG perquè les etiquetes d'àrees grans (fins a 144) no quedin retallades.
- Tipus 5/V4: s'hi ha afegit el model absent de capes successives. Cada capa conté 1, 3, 5, … cel·les i l'última forma el quadrat n×n.
- Tipus 6/V5: s'hi ha afegit una quadrícula de denominadors, amb franges de color i intersecció separada. El nombre de cel·les d'intersecció és el numerador abans de simplificar.
- Tipus 7: s'hi ha afegit el model absent de rectangle partit; les cel·les de la part coneguda i la desconeguda reprodueixen, respectivament, les dues àrees i el total de l'enunciat.
- Els models nous incorporen títols/descripcions SVG accessibles quan escau i s'han dimensionat per mostrar etiquetes dins del viewBox.
- Catàleg: set famílies úniques amb generadors associats; s'ha connectat el prefix V al classificador del banc contextual. La rotació de pràctica utilitza l'ID de família real. La classificació del tipus 6 s'ha alineat amb Producte de fraccions i el tipus 7 amb reconstrucció d'àrees.
- Els exercicis de nombres senars i fraccions ara mostren el model que descriu l'enunciat, en lloc de deixar-lo implícit.

## Validació

- Prova matemàtica fixa `scripts/comprova-espacial-visualitzacio-families-1eso.cjs`: **4.000 mostres** (1.750 pràctica, 1.250 contextuals — 250 per V1–V5 — i 1.000 del wrapper). Oracles independents de productes, distributiva, quadrats/arrels, suma de senars, fraccions simplificades i àrees parcials; classificador, nivells, opcions i models SVG comprovats. Superada.
- Prova Playwright `scripts/comprova-espacial-visualitzacio-1eso.cjs`, navegador **Chrome**: 1.000 generacions de pràctica; set famílies cobertes; 1.250 contextuals; comprovacions geomètriques dels SVG; 30 intents incorrectes sense repetició consecutiva; sessió oberta de 20; examen de tema de 12 amb les set famílies; examen global de 20; pràctica mòbil a 390 px; ancoratge directe i `hashchange`; zero errors JavaScript. Superada.
- El helper va provar els sis temes previs amb sis suites matemàtiques i sis Playwright: Elements (2.000 matemàtiques), Angles (1.750), Polígons (2.000), Triangles (1.500 més 1.000 de wrapper i un límit), Quadrilàters (1.500 i un límit), Cercle (1.500 més 1.000 de wrapper). Els 12 tests passen.
- Prova navegador inclou 30 generacions de cadascun dels set temes de Sentit espacial de 1r i 30 de Poliedres de 2n; classificació vàlida a totes. L'examen global conté Triangles, Quadrilàters, Cercle i Visualització; els exàmens globals de les proves dels altres lots també han passat.
- Chrome ha estat disponible i utilitzat. Edge no s'ha pogut verificar en aquest entorn; el helper ha continuat amb Chrome.
- La verificació de teoria s'ha fet sobre la pàgina existent amb ancoratge directe/hashchange; no se n'ha alterat el contingut. El test confirma el layout de la pràctica a 390 px. No s'ha fet comparació visual amb captures ni verificació de GitHub Pages.

## Tancament dels set temes del Sentit espacial

| Tema | PR | Famílies locals | N1 | N2 | N3 |
|---|---:|---:|---:|---:|---:|
| Elements geomètrics | #33 | 6 | 6 | 0 | 0 |
| Angles | #33 | 6 | 3 | 3 | 0 |
| Polígons | #33 | 9 | 6 | 3 | 0 |
| Triangles | #34 | 10 | 8 | 2 | 0 |
| Quadrilàters | #34 | 5 | 3 | 2 | 0 |
| Circumferència i cercle | #34 | 5 | 3 | 2 | 0 |
| Visualització | PR d'aquest informe | 7 | 4 | 3 | 0 |
| **Total d'entrades locals** |  | **48** | **33** | **15** | **0** |

Les 48 entrades locals corresponen a **44 IDs únics dins del Sentit espacial**; quatre entrades són reutilitzacions internes: `angle-que-falta`, `mediatriu-segment`, `bisectriu-angle` i `angle-interior-regular`. Dels set IDs de Visualització, cinc ja existien en altres sentits; només `distributiva-model-rectangle` i `suma-senars-model-quadrat` són nous al registre global. Les famílies compartides mantenen el mateix nivell definitiu als temes d'origen.

## Pendents i limitacions

No s'han trobat errors aritmètics o de resposta en les mostres fixes. No hi ha N3 perquè les activitats disponibles no requereixen raonament avançat més enllà de reconstrucció habitual per a 1r d'ESO. Edge no estava disponible; no s'ha afirmat verificació visual comparativa ni desplegament de Pages. El registre global JSON/CSV queda expressament fora d'aquesta PR, tal com demana l'encàrrec.
