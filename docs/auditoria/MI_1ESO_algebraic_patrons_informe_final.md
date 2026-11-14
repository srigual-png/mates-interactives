# Sentit algebraic · Patrons numèrics i geomètrics · 1r ESO

## Inventari i agrupació

`genPatrons()` té sis tipus: completar una successió amb terme buit (1), identificar una regla (2), continuar un patró additiu o multiplicatiu (3), comptar pals en una fila de quadrats (4), comptar punts triangulars (5) i resoldre situacions contextuals de successió (6). Els patrons additius de tipus 1, tipus 3 i els contextos additius de tipus 6 comparteixen procediment; el factor multiplicatiu del tipus 3 i del context de bacteris forma una família diferent. El banc P1–P7 s’agrupa per procediment i no pel context.

| ID estable | Família definitiva | Nivell anterior dels generadors | Nivell final | Generadors i variants | Justificació |
|---|---|---|---|---|---|
| `completar-patro-additiu` | Completar o continuar una successió amb canvi additiu constant | tipus 1/3/6: N1; P1/P2/P4: N1 | N1 | `patrons:1`, `patrons:3#additive`, `patrons:6#additive`, P1, P2, P4 | Trobar o aplicar una suma/resta constant; les preguntes expliciten el canvi previst. |
| `identificar-regla-recurrent` | Identificar i descriure la regla recurrent d’un patró | tipus 2: N1; P7: N2 | N1 | `patrons:2`, P7 | Es llegeixen diferències o quocients senzills i es tria una regla; no cal construir una fórmula general. P7 baixa de N2 a N1. |
| `continuar-patro-multiplicatiu` | Continuar una successió amb factor multiplicatiu constant | tipus 3/6: N1; P3: N1 | N1 | `patrons:3#multiplicative`, `patrons:6#multiplicative`, P3 | Multiplicació reiterada per un factor petit, especificat o deduïble de termes consecutius. |
| `calcular-elements-figura-repetitiva` | Calcular elements d’una figura que n’afegeix una quantitat constant | tipus 4: N2; P5: N2 | N2 | `patrons:4`, P5 | Combina el nombre inicial de pals amb els increments de 3 per quadrat compartit. |
| `reconstruir-patro-triangular` | Reconstruir el nombre de punts d’un patró triangular per acumulació | tipus 5: N2; P6: N2 | N2 | `patrons:5`, P6 | Acumula files amb un punt més; no es demana fórmula general ni contingut avançat de `patrons2`. |

Distribució local: **5 famílies: 3 N1, 2 N2, 0 N3**. La classificació separa la continuació multiplicativa de l’additiva perquè canvia el procediment, però no crea famílies per a contextos de cinema, construcció, bacteris o rajoles.

## Tres exemples per família

| Família / nivell | Enunciat → resolució |
|---|---|
| Patró additiu · N1 | `4, 9, 14, ?, 24` → diferència `+5`, falta `19`. |
|  | `20, 17, 14, 11, …` → resta `3`, següent `8`. |
|  | Planta de 18 cm el dia 1, creix 4 cm/dia; dia 5 → `18 + 4·4 = 34 cm`. |
| Identificar regla · N1 | `3, 7, 11, 15` → sumar `4`. |
|  | `24, 20, 16, 12` → restar `4`. |
|  | `2, 6, 18, 54` → multiplicar per `3`. |
| Patró multiplicatiu · N1 | `2, 4, 8, 16, …` → `32`. |
|  | `3, 9, 27, 81, …` → `243`. |
|  | `4, 12, 36, 108, …` → `324`. |
| Figura repetitiva · N2 | 5 quadrats en fila, 4 pals inicials i 3 per cada nou → `4 + 4·3 = 16`. |
|  | 7 quadrats → `4 + 6·3 = 22` pals. |
|  | 10 quadrats → `4 + 9·3 = 31` pals. |
| Acumulació triangular · N2 | Figura 5 → `1+2+3+4+5 = 15` punts. |
|  | Figura 7 → `1+…+7 = 28` punts. |
|  | Figura 9 → `1+…+9 = 45` punts. |

## Cobertura de teoria i errors freqüents

| Família | Apartat / ajuda de teoria | Exemple resolt | Error freqüent |
|---|---|---|---|
| Additiu | `#patro`, `#additius`, `#buits` | Completar una diferència constant | Compensar un salt en més d’una posició o ignorar que la successió decreix. |
| Regla recurrent | `#patro`, `#estrategia` | Descriure el pas que es repeteix | Dir només «creix» sense especificar quant o per quin factor. |
| Multiplicatiu | `#multiplicatius` | Identificar que cada terme es duplica | Confondre multiplicar per un factor amb sumar aquest factor. |
| Figura repetitiva | `#geometrics` | 4 pals inicials i 3 per nou quadrat | Comptar 4 pals nous cada vegada i oblidar el costat compartit. |
| Triangular | `#geometrics` | Sumar files successives | Multiplicar la darrera fila pel nombre de files en lloc d’acumular-les. |

S’ha verificat amb Chrome que els cinc ancoratges existeixen, l’accés directe i `hashchange` funcionen, els enllaços contextuals retornen a teoria relacionada i la pàgina no desborda horitzontalment a 390 px. La teoria no s’ha modificat.

## Canvis i validació

- S’ha explicitat que els patrons de tipus 3 mantenen el mateix canvi entre termes; els enunciats contextuals expliciten l’increment o factor que es conserva. Això redueix ambigüitats per múltiples continuacions possibles.
- Les preguntes de quadrats indiquen que cada quadrat nou comparteix un costat i afegeix 3 pals; les triangulars expliquen la fila que s’acumula.
- P7, identificació directa d’una suma constant, s’ha reclassificat de N2 a N1. S’ha separat la variant multiplicativa de la família additiva.
- Prova matemàtica: 3.250 generacions (1.500 generadors interns + 1.750 del banc); rotació de 25 exercicis, 5 per família.
- Playwright/Chrome: 500 generacions internes, famílies i nivells, 12 preguntes de tema, 20 globals, guia, autònom, recuperació, teoria/ancoratges i 390 px superats.
- Regressions: 30 generacions cadascuna de `simplificacio`, `equacions`, `computacional`, `patrons2`, `monomis2`, `simplificacio2`, `equacions2`.
- No queden incidències locals pendents. GitHub Actions i remot queden pendents de PR.
