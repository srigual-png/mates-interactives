# Tema 12 · Percentatges — implementació i verificació

Data: 8 de novembre de 2026. Base: `0b2b3401266cf099bcb650dd4657edde5a2ba413`, coincident amb `origin/main` abans dels canvis. Conserva Fraccions i Proporcionalitat, posteriors al commit auditat `157d7b5`.

13 famílies accessibles: N1 = 4, N2 = 6, N3 = 3. Q06–Q08 passen del banc a la pràctica. Q10–Q12 són noves. Q13 s’incorpora perquè es pot treballar amb una resta de taxes, acompanyada de l’exemple resolt que diferencia aquesta magnitud del canvi relatiu; el camp diu «Punts percentuals» i rebutja el símbol %.

Les quantitats de persones es construeixen amb múltiples compatibles. La variant de l’1% utilitza totals múltiples de 100, amb persones enteres també en el pas intermedi. No s’arrodoneixen persones. Els imports es calculen en cèntims enters; la validació converteix la cadena decimal en una fracció exacta amb BigInt i compara per producte creuat, sense tolerància. S’accepten zeros finals, coma o punt decimal i la unitat adequada. Es rebutgen unitats incorrectes i components sobrants.

Q03 inclou reconstrucció directa, l’1%, preu abans d’un descompte i abans d’un augment, amb comprovació numèrica. Q05 explica i practica les quatre conversions; la fracció irreductible es valida com a tal. Q09 conserva `llindar-ofertes` i l’extensió `MIFirstNumericTasks.extend`: no es duplica la família. Els seus distractors representen l’enter anterior, confondre el val amb el preu i sumar els descomptes en comptes de comparar-los.

Es reutilitza el motor adaptatiu compartit: guiada acaba amb 10 encerts acumulats, autònoma amb 20 respostes. Llindars 3/6 i 6/12, encert +1, error −1 amb mínim zero; historial, bossa per nivell, exclusió de dades repetides, reintents limitats i reserves deterministes existents. Resum independent, sortida voluntària i bloqueig del doble enviament.

La teoria conserva els ancoratges existents, inclòs `resum-master`, i els apartats numerats comencen per 1. Totes les famílies expliquen la base, el procediment, un exemple amb nombres i un error habitual. Els models i ancoratges es propaguen a pràctica, banc, exàmens i errors serialitzats. Els errors antics conserven l’enunciat i la resposta i reben un enllaç general quan no tenen metadades fiables; no es regenera la pregunta per consultar-los.

| Família | Nivell | Teoria suficient | Exemple resolt | Enllaç funcional | Estat |
|---|---|---|---|---|---|
| Q01 · Percentatge d’una quantitat | N1 | Sí | Sí | `calcular-pct` verificat | Completada |
| Q02 · Part respecte del total | N1 | Sí | Sí | `calcular-pct` verificat | Completada |
| Q03 · Reconstrucció del total i preu inicial | N3 | Sí | Sí | `calcular-pct / preu-inicial` verificat | Completada |
| Q04 · Augment o descompte | N2 | Sí | Sí | `augments` verificat | Completada |
| Q05 · Conversions | N1 | Sí | Sí | `conversions` verificat | Completada |
| Q06 · Taxa de variació | N2 | Sí | Sí | `variacio-i-complement` verificat | Completada |
| Q07 · Canvis successius | N2 | Sí | Sí | `percentatges-successius` verificat | Completada |
| Q08 · Complement | N2 | Sí | Sí | `variacio-i-complement` verificat | Completada |
| Q09 · Llindar d’ofertes | N3 | Sí | Sí | `llindar-ofertes` verificat | Completada |
| Q10 · Representació percentual | N1 | Sí | Sí | `representacio-percentual` verificat | Completada |
| Q11 · Comparació d’ofertes | N2 | Sí | Sí | `comparar-ofertes` verificat | Completada |
| Q12 · Error de base | N3 | Sí | Sí | `error-base` verificat | Completada |
| Q13 · Punts percentuals | N2 | Sí | Sí | `punts-percentuals` verificat | Completada |

## Compatibilitat i abast

Es mantenen `TOPICS[].gen`, `genPercentatgesBase`, `genPercentatges`, `genPctProb`, els tipus històrics 1–7 i els sis tipus del banc `pct`, i el tipus 1001 de raonament. La identitat matemàtica és `familyId`, diferenciada de `variantId`. La pràctica usa el catàleg complet; els exàmens mantenen els generadors històrics. L’examen per tema té 12 preguntes amb quotes 4/4/4; el global conserva 20 preguntes i les quotes compartides. Les noves famílies de pràctica no s’injecten als contractes antics d’examen. Cap canvi al generador Word/PDF ni a les pàgines o mòduls específics dels temes 01–11.

## Proves executades

- `node scripts/comprova-percentatges-1eso.cjs`: 2.400 generacions de les 20 variants del catàleg, nivell i classificador, resposta canònica, quatre opcions diferents amb una única correcta, precisió monetària i unitats, enters contextuals, passos i ancoratges.
- Exemples dirigits: 5% de 400, 35 de 140, 40 com a 20% de 200, 440 € amb −30%, 3/8, 120→132 socis, 500→625 socis, 500 € amb +20% i −10%, complement de 800 persones, 25 cel·les, ofertes de 80 €, 100 € amb +20% i −20%, llindar 21 € i taxa 20%→25%. El cas invers 72÷0,80=90 està resolt a teoria i les variants inverses generades es comproven en els dos sentits.
- 40 comprovacions dels controls reals (20 variants × oberta/tria), inclosos els selectors de Q11/Q12 i l’enllaç de cada correcció.
- Guiada 10/10 i 10/14 (71,4%); autònoma 20/20 i 0/20; pujades i baixades, rotació N1, reserves i finalització amb vint preguntes diferents forçant col·lisions aleatòries, sortida voluntària i doble enviament.
- Banc: resposta canònica, rebuig d’una diferència de 0,04, correcció amb enllaç; persistència dels models i nivell d’errors nous i conservació d’errors antics.
- Examen del tema: 12 preguntes, nivells 4/4/4 i dotze enllaços de correcció. Examen global: 20 preguntes amb teoria associada.
- `node scripts/comprova-proporcionalitat-1eso.cjs`: passa, incloent una comprovació de pràctica de cadascun dels temes 01–10, exàmens i banc de Proporcionalitat.
- `node scripts/comprova-fraccions-1eso.cjs`: passa.
- `node scripts/comprova-decimals-1eso.cjs`: passa.
- `node scripts/comprova-resultats-practica-1eso.cjs`: passa (6 temes, 12 modalitats).
- `node scripts/comprova-raonament-1eso-numeric.cjs`: passa (14 famílies, 1.442 casos).
- Comparació textual amb HEAD dels generadors previs a Percentatges: sense canvis. `git diff --check`: passa.
- Edge real amb Playwright, sense instal·lar dependències: cap error JavaScript. Captures i inspecció visual a 390 px de Q10, Q11, Q12, reconstrucció de preu, correccions, teoria i pantalla final. Sense desbordament horitzontal.

Limitacions: no s’ha fet una prova en dispositiu mòbil físic ni en Firefox/Safari, ni una revisió independent de cada generació possible. Les comprovacions de navegador utilitzen fitxers locals i bloquegen peticions externes; no validen serveis de tercers. Les captures locals es generen a `../output/percentatges/`, fora del checkout publicable. Els errors històrics es proven amb registres representatius, no amb dades privades d’alumnes.

## Fitxers de la implementació

- `assets/js/percentatges-1eso.js`: catàleg, generació, SVG i validació.
- `1eso/sentit-numeric.html`: adaptadors de Percentatges i propagació mínima compartida.
- `1eso/teoria/numeric/percentatges-1r-eso.html`: teoria completa.
- `assets/js/raonament-numeric-1eso.js`: decoració del llindar i metadades al banc.
- `assets/js/dificultat-mi.js`: nivells i pla 4/4/4 exclusius de Percentatges.
- `assets/js/examen-tema.js`: enllaços de correcció de Percentatges.
- `scripts/comprova-percentatges-1eso.cjs`: acceptació i verificació visual reproduïble.
- `docs/percentatges-1eso.md`: aquest informe.
- `docs/percentatges-1eso-resultats.json`: evidència de la darrera execució.
