# Informe final — Triangles · 1r ESO · Sentit espacial

## Abast i conclusió

Auditoria del codi de pràctica a la base `33ebff73eacab4c6288610fb40f23a9413825e93`. No s'ha modificat la teoria ni el CSS. El tema queda amb **10 famílies: 8 N1, 2 N2 i 0 N3**. No s'afegeix cap família artificial per acostar-se a les quotes orientatives: al nivell curricular revisat, els procediments de raonament més exigents queden adequadament a N2.

`genTriangles()` és el generador base; `genTriangles1r()` restringeix l'accés a les variants de 1r ESO i incorpora una variant d'angles de base d'isòsceles. Els generadors `genPitagores*` i de perímetre/àrea continuen fora del flux de pràctica d'aquest tema.

Inventari inicial verificat: la ruta regular seleccionava els tipus 1, 2, 3, 4 i 6; el banc contextual tenia T1–T7. El tipus 6 conté quatre rectes notables i quatre associacions recta/centre. El tipus 5 (Pitàgores) i el tipus 7 (àrea/perímetre) no s'ofereixen a `genTriangles1r()`.

## Famílies i classificació definitiva

| ID / família | Nivell anterior → final | Generadors accessibles | Justificació del nivell |
|---|---:|---|---|
| `classificar-costats-triangle` — classificar pels costats | N1 → N1 | pràctica tipus 1; banc T2 | Reconeixement directe de tres longituds. |
| `classificar-angles-triangle` — classificar pels angles | N1 → N1 | pràctica tipus 2; banc T3 | Identificació directa d'angle recte/obtús/aguts. |
| `angle-que-falta` — angle que falta | N2 → N1 | pràctica tipus 3; banc T1; compartida amb Angles | Una resta directa a partir de 180°; és la mateixa família de suma coneguda. |
| `desigualtat-triangular` — decidir si tres longituds formen triangle | N3 → N2 | pràctica tipus 4; banc T4 | Comparar el costat major amb la suma dels altres dos és raonament de restricció, però no exigeix reconstrucció N3. |
| `angles-base-isosceles` — angles de la base | no disponible → N2 | pràctica tipus 8; banc T5 | Combina suma 180° i repartiment en dues parts iguals. |
| `mediatriu-segment` — mediatriu d'un costat | N3 → N1 | tipus 6 variant `mediatriu`; banc T6; compartida amb Elements | Identificar la definició/procediment és directe; el context triangular no el converteix en N3. |
| `bisectriu-angle` — bisectriu d'un angle | N3 → N1 | tipus 6 variant `bisectriu`; banc T6; compartida amb Elements | Reconeixement directe de la divisió en dos angles iguals. |
| `mediana-triangle` — mediana | N3 → N1 | tipus 6 variant `mediana`; banc T6 | Reconeixement del vèrtex i punt mig del costat oposat. |
| `altura-triangle` — altura | N3 → N1 | tipus 6 variant `altura`; banc T6 | Reconeixement de la perpendicular des del vèrtex al costat oposat. |
| `centres-rectes-notables-triangle` — rectes i centres notables | N3 → N1 | tipus 6 variant `centres`; banc T7 | Associació memoritzada entre rectes i punt d'intersecció; no hi ha justificació geomètrica extensa. |

Les cinc variants del tipus 6 són preguntes diferents, cadascuna vinculada a un objectiu curricular específic; no es compten com un mateix ítem superficial. Les famílies `angle-que-falta`, `mediatriu-segment` i `bisectriu-angle` reutilitzen IDs estables d'Angles/Elements perquè el procediment és compartit.

## Matriu de cobertura

| Família | Generador(s) | Teoria principal | Ajuda / banc contextual | Exemple resolt | Error habitual |
|---|---|---|---|---|---|
| Costats | tipus 1 | `#classificacio` | T2 | 5,5,8 → isòsceles | Confondre costats amb angles. |
| Angles | tipus 2 | `#classificacio` | T3 | 90°,40°,50° → rectangle | Classificar només pel costat més llarg. |
| Angle que falta | tipus 3 | `#angles` | T1 | 45°,65° → 70° | No restar de 180°. |
| Desigualtat | tipus 4 | `#desigualtat` | T4 | 4,6,9 sí | Acceptar igualtat amb el costat major. |
| Isòsceles | tipus 8 | `#isosceles` | T5 | vèrtex 40° → base 70° | Dividir el vèrtex en comptes de la suma restant. |
| Mediatriu | tipus 6: mediatriu | `#rectes` | T6 | perpendicular pel punt mig → mediatriu | Confondre-la amb una altura. |
| Bisectriu | tipus 6: bisectriu | `#rectes` | T6 | divideix angle en dues parts iguals → bisectriu | Confondre-la amb la mediana. |
| Mediana | tipus 6: mediana | `#rectes` | T6 | vèrtex al punt mig oposat → mediana | Pensar que ha de ser perpendicular. |
| Altura | tipus 6: altura | `#rectes` | T6 | vèrtex perpendicular al costat → altura | Oblidar la perpendicularitat. |
| Centres | tipus 6: centres | `#centres` | T7 | medianes → baricentre | Intercanviar incentre i circumcentre. |

Teoria consultada: `1eso/teoria/espacial/triangles-1r-eso.html`. La prova de navegador valida ancoratge directe i `hashchange` a la teoria existent; no s'ha editat aquesta pàgina.

## Tres exemples resolts per família

| Família | Exemples (enunciat → resposta; nivell) |
|---|---|
| Costats | 5,5,8 → isòsceles (N1); 4,6,7 → escalè (N1); 9,9,9 → equilàter (N1). |
| Angles | 90°,35°,55° → rectangle (N1); 110°,30°,40° → obtusangle (N1); 60°,60°,60° → acutangle (N1). |
| Angle que falta | 50°,60° → 70° (N1); 90°,45° → 45° (N1); 38°,72° → 70° (N1). |
| Desigualtat | 3,4,5 → sí (N2); 4,6,9 → sí (N2); 3,4,7 → no, perquè 3+4=7 i la desigualtat ha de ser estricta (N2). |
| Isòsceles | angle vèrtex 40° → base 70° cadascun (N2); 60° → 60° cadascun (N2); 100° → 40° cadascun (N2). |
| Mediatriu | perpendicular pel punt mig → mediatriu (N1); punt equidistant dels extrems → pertany a la mediatriu (N1); perpendicular que biseca el costat → mediatriu (N1). |
| Bisectriu | divideix 80° en 40°+40° → bisectriu (N1); dues parts iguals d'un angle → bisectriu (N1); vèrtex i interior de l'angle → bisectriu (N1). |
| Mediana | vèrtex a punt mig oposat → mediana (N1); segment que divideix el costat oposat en dos trams iguals → mediana (N1); una de les tres medianes → mediana (N1). |
| Altura | perpendicular des del vèrtex al costat oposat → altura (N1); angle de 90° amb el costat oposat → altura (N1); segment d'altura d'un triangle → altura (N1). |
| Centres | mediatrius → circumcentre (N1); bisectrius → incentre (N1); altures → ortocentre (N1). |

## Validació

- Prova matemàtica independent: **1.500 mostres** (250 per cada ruta de pràctica activa tipus 1, 2, 3, 4, 6 i 8), més **1.000** mostres del wrapper; també passa explícitament el cas límit 3+4=7, que no forma triangle.
- Playwright amb Chrome: **1.750** mostres contextuals, 1.000 pràctiques, 30 iteracions de rotació d'errors, sessió oberta de 20, examen de tema (12) i examen global (20); 10 famílies trobades a pràctica, zero errors JS, 390 px i ancoratges directe/hashchange superats.
- Regressions: Elements, Angles, Polígons, Quadrilàters, Cercle, Visualització i Poliedres; 30 generacions per tema, superades. Proves matemàtiques de regressió de Elements/Angles/Polígons també superades.
- `node --check` als scripts i actius JS canviats: superat. `git diff --check` i `git diff --cached --check`: superats amb `core.whitespace=cr-at-eol` per tractar els CRLF com a final de línia.
- No s'han fet captures ni comparació visual pixel a pixel. El desplegament extern no forma part d'aquesta PR; no s'afirma cap verificació de Pages.

## Incidències i pendents

S'ha afegit al banc el cas límit 3,4,7 per fer explícita la desigualtat estricta i s'ha comprovat amb oracle independent. La resta de mostres no ha detectat errors. El tema no té N3 i en té 10 famílies: resultat justificat pel contingut curricular i no una mancança que calgui omplir artificialment. La família compartida entre temes reutilitza el mateix identificador estable.
