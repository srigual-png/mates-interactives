# Sentit algebraic · Traducció al llenguatge algebraic · 1r ESO

## Inventari i agrupació

`genTraduccio()` produeix sis tipus: traduir frases a expressions (tipus 1, amb més pes), expressar una expressió amb paraules (2), modelitzar situacions simples (3), substituir una variable (4), substituir dues variables (5) i modelitzar situacions compostes (6). El banc obert aporta T1–T7 i comparteix T5 amb l’avaluació. El tipus 1 té dues variants matemàtiques, directa i amb agrupació; la segona no és una família nova per canviar-ne els coeficients.

| ID estable | Família definitiva | Nivell anterior dels generadors | Nivell final | Generadors i variants | Justificació |
|---|---|---|---|---|---|
| `traduir-frase-a-expressio` | Traduir una frase verbal directa a una expressió algebraica | tipus 1: N1; T6: N1 | N1 | `traduccio:1#direct`, T6 | Reconeixement de la variable i aplicació literal de multiplicació, suma o resta en l’ordre indicat. |
| `interpretar-expressio-en-paraules` | Interpretar una expressió algebraica amb paraules | tipus 2: N1 | N1 | `traduccio:2` | Lectura d’operacions i verbalització sense càlcul invers ni justificació avançada. |
| `modelitzar-relacio-contextual-simple` | Modelitzar una relació directa d’un context amb una expressió | tipus 3: N1; T1/T3: N1 | N1 | `traduccio:3`, T1, T3 | Una única relació directa: cost repetit, edat anterior o quantitat restant. |
| `modelitzar-relacio-contextual-composta` | Construir una expressió per a una situació amb diverses quantitats | tipus 6: N2; T2/T4: N2 | N2 | `traduccio:6`, T2, T4 | Combina una part variable i una quantitat fixa, o bé suma dimensions per al perímetre. |
| `traduir-expressio-amb-agrupacio` | Traduir una frase en què una operació afecta una suma agrupada | tipus 1: N1 (variant no separada); T7: N2 | N2 | `traduccio:1#grouped`, T7 | Cal representar l’abast del factor amb parèntesis. És una reclassificació justificada, no una nova família per variació de nombres. |
| `avaluar-expressio-per-substitucio` | Substituir valors de variables i calcular una expressió | tipus 4/5: N1; T5: N1; M6: N2 | N1 | `traduccio:4`, `traduccio:5`, T5, M6; compartida amb `monomis` | La substitució de dues variables continua sent un procediment directe. M6 havia quedat en N2 tot i ser una substitució d’un sol valor; es reclassifica a N1. |

Distribució local: **6 famílies: 4 N1, 2 N2, 0 N3**. Famílies úniques del lot després de compartir l’avaluació amb `monomis`: 5 d’aquest tema més 5 de `patrons` i 4 exclusives de `monomis` = 15.

## Tres exemples per família

| Família / nivell | Enunciat → resolució |
|---|---|
| Traducció directa · N1 | «El doble d’un nombre» → `2x`. |
|  | «Sis vegades un nombre i després suma dos» → `6x + 2`. |
|  | «El triple d’un nombre i després resta quatre» → `3x − 4`. |
| Interpretació verbal · N1 | `x + 5` → «un nombre més cinc». |
|  | `4x` → «el quàdruple d’un nombre». |
|  | `3x − 2` → «el triple d’un nombre i després resta dos». |
| Modelització simple · N1 | 6 entrades a `p` euros cadascuna → `6p`. |
|  | Edat actual `x`, edat fa 5 anys → `x − 5`. |
|  | Tens 50 € i gastes `x` € → et queden `50 − x` €. |
| Modelització composta · N2 | `x` pizzes a 7 € i entrega de 2 € → `7x + 2`. |
|  | Taxi: 2 € fixos i 1,5 €/km, `x` km → `1,5x + 2`. |
|  | 3 llibres de `x` € amb 5 € de descompte → `3x − 5`. |
| Frase amb agrupació · N2 | El triple de la suma de `x` i 2 → `3(x + 2)`. |
|  | Quatre vegades la suma de `x` i 3 → `4(x + 3)`. |
|  | Dues vegades la suma de `x` i 7 → `2(x + 7)`. |
| Substitució i valor numèric · N1 | `x = 3`: `4x + 2 = 4·3 + 2 = 14`. |
|  | `x = 2, y = 5`: `3x + 2y = 6 + 10 = 16`. |
|  | `x = 7`: `2x + 1 = 14 + 1 = 15`. |

## Cobertura de teoria i errors freqüents

| Família | Apartat / ajuda de teoria | Exemple resolt | Error freqüent |
|---|---|---|---|
| Traducció directa | `#traduir`; ajuda contextual enllaça la teoria completa | «El doble de `x`» → `2x` | Escriure `x + 2` en lloc de multiplicar. |
| Interpretació | `#llegir` | `x²` → el quadrat de `x` | Confondre `x²` amb `2x`. |
| Modelització simple | `#context` | Preu unitari `p`, `x` unitats → `px` | Sumar preu i quantitat en comptes de multiplicar. |
| Modelització composta | `#context`, `#estrategia` | Quota fixa més tarifa per unitat → `rx + f` | Multiplicar també la quota fixa per `x`. |
| Agrupació | `#traduir`, `#estrategia` | El doble de la suma → `2(x + a)` | Ometre parèntesis i obtenir `2x + a`. |
| Substitució | `#valor` | Substituir cada variable i operar | Ometre un coeficient o sumar abans de multiplicar. |

Els enllaços de teoria contextuals, l’accés directe als ancoratges, el canvi amb `hashchange`, la navegació de retorn i l’amplada mòbil de 390 px s’han exercitat amb Chrome. La pàgina de teoria no s’ha modificat.

## Canvis i validació

- S’han precisat les expressions verbals compostes perquè indiquin l’ordre de les operacions; l’agrupació aleatòria ara genera coeficients i constants variables.
- Les situacions contextuals de tipus 6 varien els valors sense canviar el procediment.
- S’ha integrat el catàleg amb el classificador compartit, pràctica, banc obert i examen.
- Prova matemàtica: `node scripts/comprova-algebraic-traduccio-families-1eso.cjs` — 3.250 generacions: 1.500 de generadors interns, 1.750 de banc obert; rotació equilibrada de 30 exercicis, 5 per cadascuna de les 6 famílies.
- Playwright/Chrome: 500 exercicis de pràctica inspeccionats; les 6 famílies accessibles, 12 preguntes d’examen de tema i 20 de mode examen; pràctica guiada/autònoma, recuperació, teoria i ancoratges superats.
- Regressions: 30 mostres per cadascun dels 3 temes del Lot 2 i 4 ampliacions en cada execució dels tres tests Playwright.
- Cap incidència pendent en les comprovacions executades. GitHub Actions `Verifica inventaris fase A` (run #76) ha acabat amb èxit; aquest workflow no substitueix les proves matemàtiques ni Playwright, executades localment.
