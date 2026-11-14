# Informe final — Circumferència i cercle · 1r ESO · Sentit espacial

## Abast i conclusió

Auditoria del codi de pràctica a `33ebff73eacab4c6288610fb40f23a9413825e93`. Resultat: **5 famílies: 3 N1, 2 N2 i 0 N3**. Les variants de lectura d'elements, conversió radi/diàmetre i càlcul/inversió de longitud queden agrupades pel procediment real; es reutilitzen famílies compartides ja validades amb Mesura.

`genCircle1r()` activa els tipus 1, 2, 3, 7 i les rutes noves 8–9. Àrea, arc i sector dels tipus d'ampliació no s'inclouen en aquest flux de 1r.

Inventari inicial verificat: abans de l'ampliació, la ruta regular filtrava els tipus 1, 2, 3 i 7, i el banc contextual tenia C1–C6. Els tipus 4–6 del generador base (àrea, arc i sector) pertanyen a l'ampliació `cercle2` i continuen exclosos de la pràctica ordinària. S'han afegit únicament la inversió C→r i el quocient C/d≈π com a rutes noves de 1r.

## Famílies definitives

| ID / família | Nivell anterior → final | Generadors accessibles | Justificació pedagògica |
|---|---:|---|---|
| `elements-circumferencia-cercle` — diferenciar i identificar elements | N1 → N1 | tipus 1/7; C5 | Definicions i identificació directa. |
| `relacio-radi-diametre` — passar de radi a diàmetre i viceversa | N2 → N1 | tipus 1 variant relació, tipus 2; C1/C2 | Multiplicar o dividir per 2 és procediment directe. |
| `circumferencia-directa` — longitud de circumferència | N3 → N2 | tipus 3; C3; compartida amb Perímetres | Aplicació de C=2πr amb una dada i aproximació de π. |
| `circumferencia-inversa` — recuperar radi a partir de C | no disponible → N2 | tipus 8; C4; compartida amb Perímetres | Aïllar radi amb una divisió; un pas algebraic habitual. |
| `raio-circumferencia-diametre` — aproximar π amb C/d | no disponible → N1 | tipus 9; C6; compartida amb Mesurament | Divisió guiada i interpretació de quocient aproximat; es manté N1. |

## Matriu de cobertura

| Família | Generadors | Teoria principal | Ajuda contextual | Exemple resolt | Error habitual |
|---|---|---|---|---|---|
| Elements | tipus 1,7 | `#diferencia`, `#elements` | C5 | segment del centre a la circumferència → radi | Confondre cercle i circumferència. |
| Radi/diàmetre | tipus 1:relació,2 | `#radi-diametre` | C1/C2 | r=6 → d=12 | Tractar-los com iguals. |
| Longitud directa | tipus 3 | `#longitud`, `#estrategia` | C3 | r=5, π≈3,14 → C=31,4 | Fer πr en lloc de 2πr. |
| Longitud inversa | tipus 8 | `#longitud`, `#estrategia` | C4 | C=37,68 → r=6 | Dividir per π en lloc de 2π. |
| Quocient π | tipus 9 | `#pi` | C6 | C=25,12; d=8 → 3,14 | Invertir C/d o confondre aproximació amb valor exacte. |

Teoria consultada: `1eso/teoria/espacial/circumferencia-cercle-1r-eso.html`. Les proves de browser validen els ancoratges i l'obertura amb URL/hashchange sense canviar la pàgina.

## Tres exemples per família

| Família | Exemples (enunciat → resposta; nivell) |
|---|---|
| Elements | segment centre–circumferència → radi (N1); segment que passa pel centre i uneix circumferència–circumferència → diàmetre (N1); corda que passa pel centre → diàmetre (N1). |
| Radi/diàmetre | r=6 cm → d=12 cm (N1); d=18 cm → r=9 cm (N1); r=4,5 cm → d=9 cm (N1). |
| Longitud directa | r=5 cm → C≈31,4 cm (N2); r=7 cm → C≈43,96 cm (N2); r=3 cm → C≈18,84 cm (N2). |
| Longitud inversa | C≈37,68 cm → r=6 cm (N2); C≈62,8 cm → r=10 cm (N2); C≈18,84 cm → r=3 cm (N2). |
| Quocient π | C=18,84; d=6 → C/d≈3,14 (N1); C=25,12; d=8 → 3,14 (N1); C=62,8; d=20 → 3,14 (N1). |

## Validació

- Prova matemàtica: **1.500 mostres** (250 per cadascun dels sis tipus/rutes actius de pràctica) i **1.000** mostres del wrapper; relacions r/d, C≈2πr, inversió, elements i quocient validats.
- Playwright amb Chrome: 1.500 mostres contextuals, 1.000 generacions de pràctica; 5 famílies accessibles, examen de tema i global, 30 rotacions d'error, banc obert de 20 preguntes, 468 SVGs generats; les etiquetes SVG de 10 mostres s'han comprovat dins del viewBox i sense solapament. Vista de pràctica a 390 px, ancoratge directe i `hashchange`, zero errors JavaScript.
- Regressions espacials Lot 1/Lot 2 i Poliedres: 30 generacions per tema; proves matemàtiques de Elements, Angles i Polígons superades.
- Sintaxi JS/CJS: superada. `git diff --check` i `git diff --cached --check`: superats amb `core.whitespace=cr-at-eol` per tractar els CRLF com a final de línia.
- No s'ha fet comparació visual amb captures ni desplegament Pages d'aquesta branca.

## Incidències i pendents

Les conversions inverses són noves rutes de pràctica i examen, validades amb 250 mostres pròpies. No s'han detectat fallades matemàtiques. La distribució sense N3 i amb 5 famílies és intencional: N3 no és curricularment necessari en aquestes operacions bàsiques de 1r ESO.
