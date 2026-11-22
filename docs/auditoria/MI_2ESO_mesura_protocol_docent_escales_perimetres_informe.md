# Protocol de revisió docent: Escales i Perímetres (2n ESO)

**Estat: protocol documental pendent d'aplicació.** No hi ha resultats d'alumnat, decisions docents registrades, noves famílies aprovades ni canvis als generadors.

Matriu verificable: [MI_2ESO_mesura_protocol_docent_escales_perimetres.json](MI_2ESO_mesura_protocol_docent_escales_perimetres.json).

## Propòsit i criteris d'observació

No es tracta de comprovar només si una resposta numèrica és correcta, sinó si el procediment exigeix una **decisió matemàtica diferenciada** respecte als tipus actuals.

Quatre dimensions puntuades entre 0 i 2: **càlcul**, **decisió diferencial**, **justificació** i **transferència**. Aquesta puntuació descriu l'observació; **no permet classificar automàticament un exercici com a N3**, ni aprovar una família. La revisió docent completa ha d'aplicar els cinc criteris C1–C5 de la matriu prèvia, especialment la independència no cosmètica.

## Escales — quatre tasques

| Tasca | Prova | Solució de contrast |
|---|---|---|
| E1 | Dos plànols equivalents amb un gir de 90° | 8×6 cm a 1:50 i 3×4 cm a 1:100 → tots dos 4×3 m |
| E2 | Trampa d'àrea igual però costats incompatibles | 4×3 m i 6×2 m tenen 12 m²; **no** són el mateix rectangle |
| E3 | **Control** d'un únic plànol, similar a `escales:6` | 8×6 cm a 1:50 → **12 m²** |
| E4 | **Transferència** a altres escales | 5×2 cm a 1:200 i 10×4 cm a 1:100 → tots dos 10×4 m |

**Evidència essencial:** l'alumne compara dos parells de dimensions i accepta la rotació quan escau; no dedueix equivalència només de compartir superfície. Cal observar si això és una modelització pròpia o una repetició de conversions conegudes.

## Perímetres — quatre tasques

| Tasca | Prova | Solució de contrast |
|---|---|---|
| P1 | Rectangle 6×4 m i semicercle exterior de diàmetre 4 m | Contorn **22,28 m**, excloent el costat comú |
| P2 | **Control**: semicercle aïllat, comparable a `perimetres:8` | Arc 6,28 + diàmetre 4 = **10,28 m** |
| P3 | **Transferència**: dos rectangles units pel costat de 4 m | 6×4 m i 2×4 m → figura 8×4 m, contorn **24 m** |
| P4 | Rectangle 5×6 m i semicercle de diàmetre 6 m | Contorn **25,42 m**, excloent el costat comú |

**Evidència essencial:** l'alumne identifica quines vores són exteriors, raona què passa amb la vora comuna i transfereix la idea a una unió sense arcs. No n'hi ha prou amb substituir xifres a una fórmula.

## Com registrar la decisió sense inflar famílies

La matriu ofereix quatre opcions per candidata: **família independent**, **variant**, **pràctica composta** o **evidència insuficient**. L'opció final correspon a una revisió docent, **no** al resultat d'un test de programació. Una puntuació alta als exercicis no implica, per si sola, que l'estratègia sigui matemàticament independent.

El nivell **N2** figura només com a hipòtesi de prova pilot. Per valorar N3 caldria una demostració de modelització o justificació no rutinària; augmentar el nombre de passos no és suficient.

## Control tècnic

El validador `scripts/test-mesura-2eso-protocol-docent-escales-perimetres.cjs` recalcula independentment els vuit resultats matemàtics, exigeix dos exercicis control i dos de transferència, comprova la traçabilitat amb l'inventari de 128 tipus i impedeix declarar aprovacions que no consten.

**L'aplicació del protocol continua pendent**; el codi no ha executat sessions amb alumnat ni una revisió docent. Cap família nova ni nivell N3 està aprovat, i no s'ha modificat cap generador, mapa de dificultats, registre oficial, PR fusionada ni web publicada.

**Pas següent:** contrastar les solucions i els errors esperats de cada tasca amb la rúbrica docent, amb especial atenció a E2 i P3, que són els casos que més ajuden a distingir la transferència d'una simple substitució numèrica.
