# Informe final — Quadrilàters · 1r ESO · Sentit espacial

## Abast i conclusió

Auditoria del codi a la base `33ebff73eacab4c6288610fb40f23a9413825e93`. Resultat: **5 famílies: 3 N1, 2 N2 i 0 N3**. No s'afegeix cap família per assolir les quotes orientatives. La classificació dels quadrilàters, les seves propietats, la suma angular i un angle desconegut són els procediments diferenciats presents a la pràctica accessible.

La pràctica activa és `genQuadrilaters1r()` → `genQuadrilatersVarietat()` (tipus 1–6). El generador antic `genQuadrilaters()` no és el punt d'entrada del tema de 1r. L'enunciat actiu del rombe es va precisar perquè digui que no té angles rectes, evitant que inclogui el quadrat.

Inventari inicial verificat: el generador actiu ja ofereix tipus 1 (definicions), 2 (diagonals), 3 (angle restant), 4 (classificació paral·lelisme), 5 (propietats) i 6 (suma/elements); Q1–Q6 són també rutes contextuals actives. Les subpreguntes dels tipus 1/4/5 comparteixen procediment de classificació, mentre el tipus 6 conté suma d'angles i recompte com a variants diferenciades.

## Famílies definitives

| ID / família | Nivell anterior → final | Generadors accessibles | Justificació pedagògica |
|---|---:|---|---|
| `classificar-quadrilaters-per-propietats` — classificar per definició/propietats | barrejat N1/N2 → N1 | tipus 1, 4, 5; bancs Q1, Q3, Q4, Q5, Q6 | Reconeixement de propietats definidores; s'evita duplicar contextos cosmètics com a famílies. |
| `propietats-diagonals-quadrilaters` — comparar diagonals | N3 → N2 | tipus 2 | Cal interpretar diverses propietats alhora, però són les relacions curriculars habituals. |
| `angle-interior-quadrilater` — angle que falta | N3 → N2 | tipus 3; banc Q2 | Combina la suma fixa 360° amb una resta de diversos angles. |
| `suma-angles-quadrilater` — reconèixer suma angular | N1 → N1 | tipus 6 variant `suma` | Reconeixement directe de 360°, relacionat però no idèntic a la fórmula general de polígons. |
| `elements-quadrilater` — comptar elements | N1 → N1 | tipus 6 variant `elements` | Recompte directe de costats, vèrtexs o diagonals. |

Els tipus 1/4/5 comparteixen l'objectiu de classificar a partir de propietats. Les variants de tipus 6 són separades perquè comptar elements i reconèixer una suma angular requereixen respostes i procediments diferents. `suma-angles-quadrilater` és relacionada amb, però no compartida amb, la família general de suma d'angles interiors de Polígons: aquí s'aplica directament 360° a quatre costats.

## Matriu de cobertura

| Família | Generadors | Teoria principal | Ajuda | Exemple | Error habitual |
|---|---|---|---|---|---|
| Classificar | tipus 1,4,5 | `#families`, `#parallelograms`, `#trapezis`, `#classificar` | Q1/Q3/Q4/Q5/Q6 | 4 costats iguals, sense angle recte → rombe | Classificació exclusiva que exclou el quadrat del grup dels paral·lelograms. |
| Diagonals | tipus 2 | `#diagonals` | no hi ha patró contextual separat | rectangle: diagonals iguals | Aplicar al rombe propietats del rectangle. |
| Angle que falta | tipus 3 | `#angles` | Q2 | 90°,100°,80° → 90° | Oblidar 360°. |
| Suma | tipus 6:suma | `#angles` | Q2 reforça el procediment de suma; generator ID dedicat | suma = 360° | Confondre suma amb mesura d'un sol angle. |
| Elements | tipus 6:elements | `#families` | pràctica tipada | quadrilàter: 4 costats i 2 diagonals | Comptar costats com a vèrtexs o diagonals. |

Teoria consultada: `1eso/teoria/espacial/quadrilaters-1r-eso.html`. La navegació directa i el `hashchange` es proven al test de navegador.

## Tres exemples per família

| Família | Exemples (enunciat → resposta; nivell) |
|---|---|
| Classificar | 4 costats iguals i 4 angles rectes → quadrat (N1); 4 costats iguals i cap angle recte → rombe (N1); exactament un parell de costats paral·lels → trapezi (N1). |
| Diagonals | rectangle → diagonals iguals (N2); rombe → diagonals perpendiculars (N2); paral·lelogram → les diagonals es bisecten (N2). |
| Angle que falta | 90°,100°,80° → 90° (N2); 75°,105°,90° → 90° (N2); 120°,60°,80° → 100° (N2). |
| Suma | suma dels quatre angles interiors → 360° (N1); 90°+90°+90°+90° → 360° (N1); si tres angles sumen 270°, el quart és 90° (N1, aplicació directa). |
| Elements | nombre de costats → 4 (N1); nombre de vèrtexs → 4 (N1); nombre de diagonals → 2 (N1). |

## Validació

- Prova matemàtica: **1.500 mostres** (250 per cadascun dels sis tipus actius del generador de pràctica); assercions d'opcions úniques, classificació, propietats, solucions i nivell superades. També s'ha provat el cas límit de tres angles de 65° i angle restant de 165°.
- Playwright amb Chrome: 1.500 mostres contextuals, 1.000 preguntes de pràctica, 30 respostes incorrectes/rotacions, 20 exercicis oberts, examen de tema i examen global; 5 famílies cobertes, sense repeticions adjacents al banc obert, cap error JS, ample de 390 px, ancoratge directe i `hashchange` superats.
- Regressions d'altres temes de Sentit espacial: 30 generacions de cadascun dels sis temes de 1r i 2n Poliedres; suite matemàtica de Elements, Angles i Polígons superada.
- `node --check` superat per scripts/JS. `git diff --check` i `git diff --cached --check`: superats amb `core.whitespace=cr-at-eol` per tractar els CRLF com a final de línia.
- No s'ha fet comparativa visual amb captures. Pages no s'ha desplegat ni verificat en aquesta PR.

## Incidències i pendents

No s'han observat respostes incorrectes en les mostres. La classificació del rombe ara explicita “cap angle recte” i la del rectangle exclou explícitament el quadrat; així cada enunciat té resposta única sota la classificació adoptada. Els objectius orientatius de 15 famílies i d'incloure N3 no són justificables per ampliar aquest tema de 1r sense inventar procediments.
