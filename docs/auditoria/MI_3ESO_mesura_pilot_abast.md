# Pilot 3r ESO — Sentit de la mesura

## Abast

Auditoria documental dels **8 blocs ordinaris** de 3r ESO (80 tipus, segons els registres previs). Les ampliacions A–D de preparació de 4t (40 tipus) queden excloses dels recomptes i de les decisions de família.

| Bloc | Tema | Tipus | N1/N2/N3 actius al codi |
|---|---|---:|---:|
| 1 | Volum i capacitat | 10 | 7 / 3 |
| 2 | Mesura i precisió | 10 | 7 / 3 |
| 3 | Àrees i figures compostes | 10 | 1 / 9 |
| 4 | Semblança i mesures | 10 | 9 / 1 |
| 5 | Tales i mesures indirectes | 10 | 0 / 10 |
| 6 | Pitàgores i mesures indirectes | 10 | 0 / 10 |
| 7 | Piràmides i cons | 10 | 5 / 5 |
| 8 | Estimació, error i problemes de mesura | 10 | 5 / 5 |
| **Total** |  | **80** | **34 / 46 / 0 N3** |

Aquests recomptes són els nivells actius llegits de `REVIEWED_LEVELS["3eso/mesura"]`; no són la proposta de l’auditoria ni un recompte de famílies.

## Evidència prèvia a reutilitzar

- `docs/dificultats/revisio-3eso-mesura-punt3.json`: 120 registres de tipus per als 8 blocs ordinaris i 4 ampliacions; estat global `reclassified-with-gaps`.
- `docs/dificultats/resultats-punt3-3eso-mesura.json`: mostres de 3.000 instàncies per bloc, amb resultats d’examen per als 8 blocs ordinaris; els registres previs de les ampliacions no tenen camp d’examen.
- `3eso/teoria/mesura/index.html`: delimita explícitament el recorregut principal (blocs 1–8) i les ampliacions A–D.

Les xifres i mostres s’han contrastat amb els generadors actuals. Les mostres prèvies acrediten execució/generació, però no demostren per si soles l’equivalència pedagògica entre tipus.

## Decisions i revisió

Per als 80 tipus s’ha documentat el grup/família candidata i la relació: **mateixa família / variant / tasca diferent**. Per a cada família resultant consten nivell proposat i justificació curricular de 3r, dos exemples resolts, errors típics i casos límit. Les propostes de nous exercicis s’han limitat als procediments absents; no s’ha forçat N3 ni s’han duplicat famílies entre blocs.

La revisió dels modes guiat, autònom i examen distingeix l’evidència **estàtica**, la **simulació** i la validació **visual**. En aquesta auditoria només s’ha fet revisió estàtica; no s’ha fet simulació ni validació visual.

## Límit de canvis

Aquesta branca és documental. No s’han de modificar nivells de producció, generadors ni `families-validades.json`, ni crear workflows ni proves noves. Si l’auditoria detecta una correcció de codi imprescindible, documentar-la i aturar-se abans d’aplicar-la.

## Estat

- [x] Inventari de blocs i 80 tipus ordinaris; ampliacions A–D excloses.
- [x] Confirmació estàtica de l’estructura del generador i dels modes.
- [x] Contrast de les 10 branques del bloc 1 (volum i capacitat).
- [x] Contrast de les 10 branques del bloc 2 (mesura i precisió).
- [x] Contrast estàtic de les 10 branques del bloc 3 (àrees compostes).\n- [x] Contrast estàtic de les branques dels blocs 4–5 (20 tipus).\n- [x] Contrast estàtic dels blocs 6–8 (30 tipus).
- [x] Consolidació transversal de famílies entre blocs.
- [x] Justificació curricular global contrastada amb els sabers oficials 1r–3r; buits/propostes documentats per bloc.
- [x] Síntesi final de modes i evidències disponibles.

## Primera comprovació contra el generador (revisió estàtica)

Fitxer contrastat: `3eso/sentit-mesura.html` a la branca base. Aquesta és la comprovació d’estructura inicial; les 80 branques es detallen als apartats de cada bloc.

- El codi declara exactament **8 temes de 3r** amb `exam3r:true` i **4 ampliacions de 4t** amb `exam3r:false` i `ampliacio:true`. Això confirma l’abast 80/40 dels registres previs.
- Hi ha un generador específic per a cadascun dels 12 temes. Els vuit generadors ordinaris seleccionen un identificador de tipus entre 1 i 10; el contrast de cada branca s’ha completat i queda documentat als apartats següents.
- La interfície de pràctica exposa dos nivells (1 i 2); al nivell 1 mostra les pistes. El codi no exposa un selector N3 en aquesta pàgina. Això descriu la implementació actual, no determina si pedagògicament caldria proposar N3.
- El filtre de contingut d’examen s’aplica sobre la llista de temes; els vuit blocs ordinaris estan marcats com a inclosos i les ampliacions com a excloses.
- Aquesta passada és **estàtica**. No s’han executat proves ni s’ha fet simulació o validació visual.

Aquesta passada estructural és estàtica. Les branques i les decisions de família s’han revisat als apartats de cada bloc; no hi ha simulació ni verificació visual.

## Progrés de l’auditoria

- Contrast tipus per tipus: **80/80** branques ordinàries revisades estàticament.
- Famílies candidates locals: bloc 1 = 6; bloc 2 = 6; bloc 3 = 3; bloc 4 = 6; bloc 5 = 4; bloc 6 = 4; bloc 7 = 7; bloc 8 = 6 més un enllaç a Pitàgores. Són grups provisionals i resten a consolidar transversalment.
- No s’han executat proves ni simulacions noves; validació visual pendent.
- Auditoria documental dels vuit blocs completada; simulació i validació visual no realitzades.

## Bloc 1 — Volum i capacitat: contrast dels 10 tipus

Contrast estàtic de les branques 1–10 de `genVolumCapacitat3ESO()` (línies 995–1094 del generador). S’han comparat procediment, unitats, resposta i mostra del registre previ. Les famílies següents són decisions de l’auditoria, no entrades al registre oficial.

### Mapa tipus → família

| Tipus | Procediment real | Decisió | Nivell proposat | Motiu |
|---:|---|---|---|---|
| 1 | Conversió entre unitats cúbiques amb factor 1000 per salt | Família V1 | N1 | Aplicació directa del factor cúbic i del sentit del canvi |
| 2 | Equivalència directa dm³↔L, cm³↔mL o m³↔L | Família V2 | N1 | Una equivalència de referència i una conversió |
| 3 | Conversió L, dL, cL i mL | Família V3 | N1 | Escala de capacitat decimal, factor 10 per salt |
| 4 | Conversió encadenada entre volum i capacitat (p. ex. m³↔mL) | Variant de V2 | N2 | Cal coordinar més d’una equivalència o un factor global gran |
| 5 | Reconeixement de l’equivalència m³↔L en opcions | Variant de V2 | N1 | Mateix coneixement i càlcul que el tipus 2, amb resposta de selecció |
| 6 | Volum d’un prisma rectangular en cm³ i equivalència a mL | Variant de V4 | N2 | Fórmula geomètrica seguida d’una equivalència |
| 7 | Volum d’un dipòsit rectangular en m³ i conversió a L | Variant de V4 | N2 | Mateix procediment que 6, amb decimal i factor 1000 |
| 8 | Capacitat total en m³, conversió a L i resta del contingut | Família V5 | N2 | Problema invers de capacitat restant; inclou conversió i resta contextual |
| 9 | Volum d’un cub amb aresta en dm i equivalència a L | Variant de V4 | N1 | Cas directe de volum geomètric; cub i dm³=L redueixen els passos |
| 10 | Comparació de cm³ i L després d’expressar-los en una unitat comuna | Família V6 | N2 | La decisió de comparació és el focus, no només convertir |

### Famílies i exemples resolts

**V1 — Conversió d’unitats cúbiques (tipus 1), N1.** Cal distingir el factor cúbic del factor lineal: cada salt entre unitats cúbiques és ×1000 o ÷1000.

- 2,5 dm³ = 2,5 × 1000 = **2500 cm³**.
- 4500 mm³ = 4500 ÷ 1000 = **4,5 cm³**.

Errors típics: multiplicar per 10 per cada salt; invertir el sentit del factor. Cas límit: canviar dues posicions equival a factor 1.000.000, no 2000.

**V2 — Equivalències volum-capacitat (tipus 2, 4 i 5), N1/N2.** Tipus 2 i 5 són la mateixa família; el 5 és una variant de format d’opcions. El tipus 4 és una variant composta perquè demana encadenar equivalències (cm³↔L, mL↔dm³ o m³↔mL). N1 per l’equivalència immediata; N2 per la cadena.

- 0,75 m³ = 0,75 × 1000 = **750 L**.
- 3500 mL = 3500 cm³ = 3,5 dm³ = **3,5 dm³**.

Errors típics: confondre 1 m³=1 L; aplicar factor 1000 també a dm³↔L o cm³↔mL. Cas límit: comprovar que el factor global per m³↔mL és 1.000.000.

**V3 — Canvis d’unitat de capacitat (tipus 3), N1.** Família pròpia: escala decimal de litres, diferent de les unitats cúbiques.

- 2,5 L = **250 cL**.
- 750 mL = **0,75 L**.

Errors típics: usar ×1000 en cada salt (aquí és ×10); moure la coma en el sentit contrari. Cas límit: cL↔dL és un salt, no tres.

**V4 — Volum geomètric convertit en capacitat (tipus 6, 7 i 9), N1/N2.** Mateix esquema (calcular V i aplicar equivalència), amb variants de cos i unitat. N1 per al cub amb aresta en dm i equivalència immediata; N2 per al prisma amb tres dimensions i conversió posterior.

- Capsa 20×15×10 cm: V=3000 cm³ i, com que 1 cm³=1 mL, capacitat **3000 mL**.
- Dipòsit 2×0,5×0,4 m: V=0,4 m³; 0,4×1000= **400 L**.
- Cas límit del tipus 9: cub d’aresta 3 dm → V=3³=27 dm³=**27 L**.

Errors típics: sumar dimensions; oblidar elevar al cub en el cas del cub; convertir cada longitud en lloc del volum; confondre dimensions exteriors i interiors. El text “si es pogués omplir completament” limita la resposta a la capacitat geomètrica, sense gruix de paret ni espai lliure.

**V5 — Capacitat restant (tipus 8), N2.** Tasca diferent de V4: primer convertir la capacitat màxima i després restar el contingut.

- Dipòsit de 1,2 m³ amb 450 L: 1,2 m³=1200 L; 1200−450=**750 L**.
- Dipòsit de 0,8 m³ amb 250 L: 800−250=**550 L**.

Errors típics: restar 1,2−450 abans de convertir; respondre la capacitat total. Cas límit: la quantitat continguda no pot superar la capacitat total (el generador filtra aquest cas).

**V6 — Comparació de volums en unitats diferents (tipus 10), N2.** Tasca diferent de convertir per donar una quantitat: cal establir la relació entre dues mesures.

- 1250 cm³=1250 mL=1,25 L; comparat amb 0,6 L és **més gran**.
- 600 cm³=600 mL=0,6 L; comparat amb 0,6 L és **igual**.

Errors típics: comparar nombres sense homogeneïtzar unitats; marcar “no es poden comparar” perquè les unitats difereixen. Cas límit: el generador inclou igualtat i, per tant, la resposta no és només més gran/més petit.

### Revisió dels modes i evidència disponible per al bloc 1

- **Estàtica:** el generador retorna pistes i passos de solució als deu tipus; el mode obert només reintenta si un tipus declara `allowOpen:false`. En aquest generador del bloc 1 no s’ha observat aquesta restricció.
- **Estàtica:** el registre previ informa 3000 mostres generades, cobertura [7,3,0] i examen [7,5,0]. Són recomptes de nivells per al banc, no una demostració de cobertura de famílies.
- **Simulació:** no feta en aquesta auditoria.
- **Visual:** no feta; no s’afirma que s’hagi comprovat el navegador.

### Incidència detectada per revisar globalment

En el codi actual, el tipus 4 selecciona, entre altres, m³↔mL, però els distractors es construeixen amb factors ×10, ÷10, ×1000 i ÷1000 del resultat. En aquests casos, diversos distractors poden no representar les confusions específiques més útils i cal comprovar que cap coincideixi amb la resposta correcta. És una observació estàtica, no s’ha reproduït amb una prova nova; no s’ha modificat el generador.

## Bloc 2 — Mesura i precisió: contrast dels 10 tipus

Contrast estàtic de les branques 1–10 de `genMesuraPrecisio3ESO()` (línies 1097–1257).

### Mapa tipus → família

| Tipus | Procediment real | Decisió | Nivell proposat | Motiu |
|---:|---|---|---|---|
| 1 | Seleccionar instrument per a una longitud segons mida i abast | Família P1 | N1 | Elecció directa a partir de la magnitud i escala |
| 2 | Seleccionar instrument per mesurar un angle | Variant de P1 | N1 | Mateixa decisió d’instrument, restringida a magnitud angular |
| 3 | Triar unitat adequada a la magnitud i escala | Família P2 | N1 | Reconeixement de magnitud i ordre de mida |
| 4 | Llegir la resolució a partir de les divisions de l’instrument | Família P3 | N1 | Identificar l’increment mínim indicat |
| 5 | Comparar la resolució de dos instruments | Família P4 | N2 | Comparació explícita; cal saber que la resolució menor discrimina més |
| 6 | Valorar si una lectura és compatible amb la resolució | Família P5 | N1 | Aplicar la posició decimal/interval de lectura permès |
| 7 | Reconstruir l’interval previ a un arrodoniment a unitats | Família P6 | N2 | Invertir l’arrodoniment i tractar els extrems |
| 8 | Triar instrument amb equilibri d’abast i resolució | Variant de P1 | N2 | Decisió amb dos criteris i un compromís real |
| 9 | Triar instrument especialitzat per a una mesura petita o concreta | Variant de P1 | N1 | Mateixa família d’elecció d’instrument |
| 10 | Expressar una lectura contextual amb precisió coherent | Variant de P5 | N1 | Mateix criteri que el 6, aplicat a contextos diferents |

### Famílies i exemples resolts

**P1 — Selecció d’instrument (tipus 1, 2, 8 i 9), N1/N2.** Mateixa família; variants segons magnitud, abast i especialització. Tipus 8 és N2 perquè obliga a ponderar abast suficient i resolució, no a maximitzar una sola característica.

- Gruix exterior d’una moneda: un **calibre** és més adequat que una cinta mètrica, perquè arriba a la mida i discrimina millor.
- Mesurar 350 mL d’aigua: una proveta de 500 mL graduada cada 5 mL té abast suficient; un vas sense graduació no permet aquesta lectura.
- Cas límit: per mesurar una porta, un regle de 15 cm amb resolució d’1 mm no serveix: la resolució és bona, però l’abast és insuficient.

Errors típics: escollir només pel nombre més petit de divisions; ignorar l’abast; confondre instrument angular amb lineal. Els tipus 2 i 9 són variants contextuals, no famílies noves.

**P2 — Elecció d’unitat (tipus 3), N1.** Cal correspondència amb la magnitud i una escala pràctica.

- Gruix d’un full: **mm**; distància entre ciutats: **km**.
- Capacitat d’una ampolla d’aigua: **L**; superfície d’un pis: **m²**.

Errors típics: triar una unitat d’una magnitud diferent (m³ per una llargada) o una unitat que produeix una quantitat poc manejable. Cas límit: distingir volum (m³) de capacitat (L), encara que es puguin relacionar.

**P3 — Resolució d’un instrument (tipus 4), N1.** La resolució és la diferència entre lectures consecutives.

- Regle amb marques cada 1 mm: resolució **1 mm**.
- Proveta graduada cada 2 mL: resolució **2 mL**.

Errors típics: donar l’abast total com a resolució; confondre la divisió més petita amb la incertesa total de la mesura. Cas límit: no inferir una resolució més fina de la que indiquen les marques.

**P4 — Comparació de resolucions (tipus 5), N2.** La resolució numèricament més petita permet distingir canvis més petits, si les unitats són comparables.

- A: 1 mm; B: 0,1 mm → **B** permet una lectura més detallada.
- A: 0,01 g; B: 0,1 g → **A** és més detallat.

Errors típics: pensar que el nombre més gran sempre és més precís. Cas límit: abans de comparar, cal posar les resolucions en la mateixa unitat (1 cm = 10 mm).

**P5 — Lectura coherent amb la resolució (tipus 6 i 10), N1.** Mateixa família; el 10 afegeix context i unitat. S’accepten exemples compatibles, no hi ha un únic valor correcte en resposta oberta.

- Resolució 0,1 cm: **12,3 cm** és coherent; 12,34 cm afirma precisió no disponible.
- Balança amb resolució d’1 g: **537 g** és coherent; 537,284 g no ho és.

Errors típics: afegir decimals sense suport instrumental o ometre la unitat. Cas límit: una lectura equivalent en una altra unitat pot ser correcta si conserva la mateixa resolució real (0,1 cm = 1 mm).

**P6 — Interval d’una mesura arrodonida (tipus 7), N2.** Per arrodoniment habitual a unitats i valors positius, la lectura 25 representa `[24,5; 25,5)`.

- 18 unitats arrodonides a l’enter més proper: valor previ dins `[17,5;18,5)`.
- 18 g arrodonits al gram més proper: valor previ dins `[17,5;18,5)`.

Errors típics: usar ±1 en comptes de ±0,5 unitat; incloure tots dos extrems; no ajustar la meitat de la resolució. Cas límit: la inclusió del punt de mig depèn de la convenció d’arrodoniment i del signe; el generador descriu la convenció per valors positius.

### Revisió dels modes i evidència disponible per al bloc 2

- **Estàtica:** els tipus 1, 2, 8 i 9 declaren `allowOpen=false`; per tant, el mode de resposta oberta els evita i regenera un altre tipus. Els altres tipus tenen resposta oberta activada. Això redueix l’univers del mode obert i cal tenir-ho present en valorar varietat.
- **Estàtica:** el codi retorna pistes i solucions per a les deu branques; la interfície mostra pistes al nivell 1.
- **Estàtica prèvia:** el registre indica 3000 mostres, cobertura [7,3,0] i examen [7,5,0]. No s’han repetit aquestes mostres.
- **Simulació i validació visual:** no fetes en aquesta passada.

### Casos a contrastar en una passada de qualitat

- El tipus 5 crea les opcions amb una llista barrejada fixa; el codi visible no deriva les opcions de la comparació actual ni garanteix explícitament que la resposta correcta aparegui. Cal inspeccionar aquesta branca amb més detall abans de concloure si és una incidència funcional; no s’ha executat cap prova nova ni s’ha canviat el codi.
- Al tipus 7, la pregunta diu “arrodonida a la unitat més propera”, però el banc conté unitats diferents. La interpretació d’`[valor−0,5; valor+0,5)` només és correcta si “unitat” vol dir la unitat indicada per cada lectura; cal contrastar els valors/unitats exactes del banc abans de tancar el cas.

## Bloc 3 — Àrees i figures compostes: contrast dels 10 tipus

Contrast estàtic de les branques 1–10 de `genAreesCompostes3ESO()` (línies 1258–1351).

### Mapa tipus → família

| Tipus | Procediment real | Decisió | Nivell proposat | Motiu |
|---:|---|---|---|---|
| 1 | Àrea d’un rectangle menys un rectangle retirat (figura en L) | Variant d’A1 | N2 | Cal calcular dues àrees i restar-les |
| 2 | Àrea de rectangle més triangle | Variant d’A2 | N2 | Dues fórmules d’àrea i suma |
| 3 | Àrea de rectangle menys semicercle | Variant d’A1 | N2 | Mateixa estratègia de complement, amb àrea circular |
| 4 | Àrea de rectangle més dos semicercles (un cercle) | Variant d’A2 | N2 | Composició additiva, amb equivalència de dos semicercles i cercle |
| 5 | Camí interior: rectangle exterior menys rectangle interior | Variant d’A1 | N2 | Cal reduir cada dimensió en dues amplades abans de restar |
| 6 | Àrea de trapezi més rectangle | Variant d’A2 | N2 | Dues fórmules i suma |
| 7 | Àrea completa menys àrea del buit, ambdues donades | Família A1, cas directe | N1 | Resta directa; no cal descompondre ni calcular àrees auxiliars |
| 8 | Àrea rectangular donada més triangle sobre base comuna | Variant d’A2 | N2 | El rectangle no cal recalcular-lo; cal obtenir l’àrea triangular |
| 9 | Àrea de rectangle amb longituds en m i cm | Família A3 | N2 | La conversió d’unitats ha de precedir el producte d’àrees |
| 10 | Àrea de pati menys àrea de piscina | Variant d’A1 | N2 | Mateixa estratègia de superfície restant, en context |

### Famílies i exemples resolts

**A1 — Superfície restant o forat (tipus 1, 3, 5, 7 i 10), N1/N2.** Mateixa estratègia de resta; són variants quan canvia la forma de l’àrea eliminada o cal calcular dimensions interiors. Només el tipus 7 és N1 perquè les dues àrees ja són donades.

- Figura en L: rectangle 12×8 = 96 cm²; rectangle retirat 3×2 = 6 cm²; queda **90 cm²**.
- Jardí 10×8 m amb camí interior d’1 m: àrea exterior 80 m²; zona interior 8×6=48 m²; camí **32 m²**.
- Cas límit del tipus 3: si el retall és semicercle de radi 2 cm, se’n resta `π·2²/2=2π≈6,28 cm²`, no l’àrea d’un cercle sencer.

Errors típics: sumar el forat; reduir només una dimensió de cada costat en comptes de dues amplades totals; restar àrees de figures superposades sense comprovar el dibuix i les mesures.

**A2 — Suma d’àrees de parts adjacents (tipus 2, 4, 6 i 8), N2.** Mateixa família: descompondre, calcular àrees parcials i sumar-les. Les parts han de cobrir la figura sense solapament.

- Façana 8×4 m més triangle de base 8 m i altura 3 m: 32 + 12 = **44 m²**.
- Pista amb rectangle 20×6 m i dos semicercles de radi 3 m: 120 + 9π ≈ **148,27 m²**.

Errors típics: oblidar el factor 1/2 de triangle o trapezi; sumar longituds en lloc d’àrees; comptar els dos semicercles com dos cercles. Cas límit: al tipus 8, l’àrea del rectangle ja es dona; la base comuna del triangle no implica que se n’hagi de tornar a calcular l’àrea rectangular.

**A3 — Àrea rectangular amb canvi previ d’unitat (tipus 9), N2.** Tasca diferent de la suma/resta de components: primer unificar longituds, després multiplicar.

- Placa 2,4 m × 35 cm: 35 cm=0,35 m; àrea = 2,4×0,35 = **0,84 m²**.
- Taula 1,5 m × 80 cm: 0,80 m; àrea = 1,5×0,8 = **1,2 m²**.

Errors típics: multiplicar 2,4×35 i donar el resultat en m²; convertir cm a m com si fos àrea (factor 100, no 10.000). Cas límit: si el resultat es demana en cm², després de trobar m² encara cal aplicar 1 m²=10.000 cm².

### Revisió dels modes i evidència disponible per al bloc 3

- **Estàtica:** cada tipus retorna pistes i solució; el mode guiat les mostra al nivell 1 i el nivell 2 les amaga durant la resolució. Cap de les deu branques declara `allowOpen=false`; totes poden entrar en la selecció del mode de resposta oberta.
- **Estàtica prèvia:** el registre informa 3000 mostres, distribució [1,9,0] i examen [3,9,0]. No s’ha repetit la generació.
- **Simulació i validació visual:** no fetes.

### Observació pedagògica pendent de decisió global

El catàleg concentra 9 dels 10 tipus a N2 perquè gairebé tots combinen àrees parcials. El tipus 7 és un N1 clar. No es detecta, en aquest bloc, un procediment genuïnament N3; augmentar números o afegir un context per si sol no justificaria N3.

**Incidència de codi documentada, no aplicada:** al tipus 8, la guia diu que l’àrea del rectangle ja està donada i no cal calcular-ne l’altura, però la solució mostra `àrea ÷ base` com a primer pas. És un pas superflu que contradiu la guia; queda documentat per valorar una eventual correcció, sense modificar el generador.


## Bloc 4 — Semblança i mesures: contrast dels 10 tipus

Contrast estàtic de les branques 1–10 de `genSemblancaMesures3ESO()` (línies 1352–1437).

### Mapa tipus → família

| Tipus | Procediment | Decisió | Nivell proposat | Justificació |
|---:|---|---|---|---|
| 1 | Aplicar k a una longitud homòloga | Família S1 | N1 | Escala lineal directa |
| 2 | Trobar k a partir de dues longituds homòlogues | Família S2 | N1 | Quocient directe entre longituds corresponents |
| 3 | Aplicar k a un perímetre | Variant de S1 | N1 | El perímetre també escala linealment |
| 4 | Aplicar k² a una àrea | Família S3 | N1 | Aplicació directa de la regla d’àrees |
| 5 | Aplicar k³ a un volum | Família S4 | N1 | Aplicació directa de la regla de volums |
| 6 | Recuperar k a partir de la raó d’àrees, amb arrel quadrada | Família S5 | N2 | Invertir la regla d’àrees |
| 7 | Recuperar k a partir de la raó de volums, amb arrel cúbica | Variant de S5 | N2 | Mateixa tasca inversa, amb exponent cúbic |
| 8 | Reducció d’àrea amb raó lineal fraccionària | Variant de S3 | N2 | Cal elevar una fracció al quadrat |
| 9 | Detectar l’afirmació falsa sobre factors k, k² i k³ | Família S6 | N1 | Diagnòstic conceptual, no càlcul d’una mesura |
| 10 | Escalar l’aresta d’un cub i calcular-ne el nou volum | Variant de S4 | N2 | Dues vies equivalents: aresta³ o volum·k³ |

### Famílies i exemples resolts

**S1 — Escala lineal directa (tipus 1 i 3), N1.** Mateix procediment; el costat i el perímetre són longituds.

- Costat 8 cm amb k=2,5: 8·2,5 = **20 cm**.
- Perímetre 36 cm amb k=1,5: 36·1,5 = **54 cm**.

Error típic: multiplicar el perímetre per k². Cas límit: si k<1, la longitud disminueix; el banc actual d’aquests tipus treballa sobretot amb k>1.

**S2 — Recuperar k de longituds homòlogues (tipus 2), N1.** Cal mantenir l’ordre primera→segona figura.

- Un costat passa de 2 cm a 6 cm: k=6/2=**3**.
- Un costat passa de 5 cm a 7,5 cm: k=7,5/5=**1,5**.

Error típic: dividir en sentit invers i obtenir el factor de reducció quan es demana k de la primera a la segona. Cas límit: k pot ser menor que 1 si la segona figura és més petita; els exemples actuals seleccionen ampliacions.

**S3 — Escala d’àrees (tipus 4 i 8), N1/N2.** Mateixa regla A₂=A₁·k²; el tipus 8 n’és una variant de reducció fraccionària, proposada a N2.

- Àrea 16 cm², k=2: A₂=16·2²=**64 cm²**.
- Reducció k=1/4 d’una superfície de 48 m²: A₂=48·(1/4)²=48/16=**3 m²**.

Errors típics: aplicar k en lloc de k²; quadrar l’àrea original. Cas límit: “longituds a 1/4” implica àrea a 1/16, no a 1/4.

**S4 — Escala de volums (tipus 5 i 10), N1/N2.** Mateixa regla V₂=V₁·k³; el tipus 10 és variant perquè dona l’aresta i demana calcular el cub nou.

- Volum 20 cm³ amb k=2: 20·2³=**160 cm³**.
- Cub d’aresta 4 cm, k=3: aresta nova 12 cm; volum nou 12³=**1728 cm³**.

Errors típics: aplicar k o k² al volum. Cas límit: el tipus 10 també es pot resoldre per 64·27=1728 cm³; els dos camins han de coincidir.

**S5 — Recuperar k d’una raó d’àrees o volums (tipus 6 i 7), N2.** Mateixa tasca inversa; arrel quadrada per a àrees, arrel cúbica per a volums.

- Àrees 15 i 135 cm²: A₂/A₁=9; k=√9=**3**.
- Volums 3 i 24 cm³: V₂/V₁=8; k=∛8=**2**.

Errors típics: prendre directament la raó d’àrees/volums com a k; usar arrel quadrada en un volum. Cas límit: l’ordre de les figures determina si la raó és k o 1/k.

**S6 — Diagnòstic de les lleis d’escala (tipus 9), N1.** Tasca diferent de calcular una mesura: reconèixer quina magnitud usa l’exponent incorrecte.

- Amb k=3: longitud ×3, àrea ×9, volum ×27. És falsa “l’àrea es multiplica per 3”.
- Amb k=2: perímetre ×2, superfície ×4, volum ×8. És falsa “el volum es multiplica per 4”.

Error típic: confondre la raó lineal amb la de superfície o volum. Cas límit: la regla val per figures/cossos semblants, no per qualsevol parell de formes.

### Revisió dels modes i evidència disponible per al bloc 4

- **Estàtica:** pistes i solucions estan definides per a les deu branques. El nivell 1 mostra les pistes; el nivell 2 les oculta. No s’ha trobat una restricció `allowOpen=false` en aquest generador.
- **Estàtica prèvia:** 3000 mostres, distribució [9,1,0], examen [9,3,0]. La proposta revisa els tipus 6–8 del N1 registrat cap a N2; cal que la classificació final no es limiti a copiar aquests recomptes.
- **Simulació i validació visual:** no fetes.
- **Deduplicació transversal:** comparteix la llei de k, k² i k³ amb els problemes contextuals de Tales, però es manté com a bloc/família d’aplicació de l’escala entre figures semblants; Tales exigeix modelitzar una mesura indirecta concreta.

## Bloc 5 — Tales i mesures indirectes: contrast dels 10 tipus

Contrast estàtic de les branques 1–10 de `genTalesMesures3ESO()` (línies 1438–1517).

### Mapa tipus → família

| Tipus | Procediment | Decisió | Nivell proposat | Justificació |
|---:|---|---|---|---|
| 1 | Trobar k amb un parell de costats i aplicar-lo a un altre | Família T1 | N1 | Proporció directa en triangles ja identificats com a semblants |
| 2 | Recuperar una longitud del triangle petit amb factor invers | Variant de T1 | N2 | Canvia el sentit de l’escala i s’ha de conservar la correspondència |
| 3 | Trobar altura amb raó d’ombres al mateix instant | Família T2 | N2 | Modelització de triangles semblants a partir del context |
| 4 | Escalar l’altura d’un pal a un edifici amb ombres | Variant de T2 | N2 | Mateix procediment que 3, altres mesures/context |
| 5 | Mètode del mirall: altura dels ulls i distàncies al mirall | Variant de T2 | N2 | Proporció de triangles visuals; nova configuració |
| 6 | Aplicar escala entre triangles per estimar l’amplada d’un riu | Variant de T1 | N2 | Correspondència geomètrica contextualitzada |
| 7 | Recuperar l’ombra a partir de la raó d’altures | Variant de T2 | N2 | Inverteix la proporció directa dels tipus 3–4 |
| 8 | Mesura amb ombres i conversió cm↔m | Variant de T2 | N2 | Mateixa modelització, amb normalització d’unitats |
| 9 | Seleccionar la proporció amb ordre coherent de costats homòlegs | Família T3 | N1 | Interpretar una representació proporcional sense resoldre x |
| 10 | Trobar altura total per ombres i restar l’antena | Família T4 | N2 | Tasca composta: mesura indirecta i descomposició de l’altura |

### Famílies i exemples resolts

**T1 — Proporció en triangles semblants (tipus 1, 2 i 6), N1/N2.** Mateixa família; 2 és la variant inversa, i 6 aplica el mateix factor a una amplada de riu.

- 6 m del triangle petit corresponen a 30 m del gran; costat petit 8 m: k=5 i costat gran **40 m**.
- Costats homòlegs del gran 6 cm i 16 cm; el primer al petit és 3 cm: k gran/petit=2; l’altre costat petit és 16/2=**8 cm**.

Errors típics: invertir k; aplicar-lo al costat que no és homòleg. Cas límit: abans de multiplicar o dividir cal explicitar quina longitud pertany al triangle petit/gran. Tipus 1 es proposa N1; tipus 2 i 6, N2 per la inversió o la identificació contextual.

**T2 — Mesura indirecta amb ombres o mirall (tipus 3, 4, 5, 7 i 8), N2.** Variants d’aplicar la proporció a triangles construïts per raigs solars o reflexió; el tipus 8 afegeix conversió d’unitats.

- Persona 1,6 m, ombra 1,5 m; arbre ombra 9 m: factor 9/1,5=6; altura =1,6·6=**9,6 m**.
- Mirall: ulls a 1,5 m; persona–mirall 2 m; mirall–edifici 20 m: factor 20/2=10; altura **15 m**.
- Cas límit tipus 8: 160 cm=1,6 m i 100 cm=1 m; monument amb ombra 4 m → factor 4; altura **6,4 m**.

Errors típics: comparar ombres preses en moments diferents; barrejar cm i m; posar en correspondència altura amb ombra. En el mètode del mirall, la posició del mirall i els segments indicats han de mantenir la configuració assumida pel problema.

**T3 — Construcció/lectura de la proporció (tipus 9), N1.** Tasca conceptual diferenciada: verificar que els quocients conserven el mateix ordre.

- 3 m correspon a 12 m i 5 m a x: proporció petit/gran `3/12 = 5/x`.
- 4 correspon a 10 i 6 a x: `4/10 = 6/x`; no `4/10 = x/6`.

Errors típics: invertir només un dels dos quocients. Cas límit: una proporció global invertida als dos membres és equivalent; la barreja d’ordres no ho és.

**T4 — Alçada total i part afegida (tipus 10), N2.** Tasca diferent del càlcul directe d’ombra: obtenir l’altura torre+antena i després restar la part que no es demana.

- Persona 1,5 m amb ombra 1,2 m; torre+antena ombra 14,4 m: factor 12; altura total 18 m; si l’antena fa 1,5 m, edifici = **16,5 m**.
- Persona 1,6 m amb ombra 2 m; torre+antena amb ombra 10 m: factor 5; total 8 m; antena 2 m; edifici **6 m**.

Errors típics: restar l’antena abans d’escalar o informar l’altura total en lloc de la de l’edifici. Cas límit: el resultat ha de ser positiu i l’antena ha de ser una part de l’altura total.

### Revisió dels modes i evidència disponible per al bloc 5

- **Estàtica:** pistes i solucions definides per a les deu branques. El mode guiat correspon al nivell 1; el nivell 2 oculta pistes. No s’ha trobat una restricció `allowOpen=false` a les branques examinades.
- **Estàtica prèvia:** 3000 mostres, distribució [0,10,0] i examen [0,12,0]. El registre classifica tots els tipus N2; es proposa N1 per als casos de proporció més directa (1 i 9), sense crear N3.
- **Simulació i validació visual:** no fetes.
- **Deduplicació transversal:** el factor de semblança és el mateix que al bloc 4, però l’objectiu aquí és construir una proporció per mesurar longitud inaccessible. No es compten com la mateixa família pedagògica.

### Límits de la proposta dels blocs 4–5

Les decisions són documentals i provisionals. Els exemples de Tales pressuposen triangles realment semblants (mateix instant per ombres; reflexió i distàncies mesurades com en l’esquema del mirall). La validació geomètrica dels diagrames i la revisió visual encara no s’han fet. No es força cap família N3: els tipus actuals no requereixen planificar una estratègia entre opcions múltiples independents.

## Bloc 6 — Pitàgores i mesures indirectes: contrast dels 10 tipus

Contrast estàtic de les branques 1–10 de `genPitagoresMesures3ESO()` (línies 1518–1598).

### Mapa tipus → família

| Tipus | Procediment | Decisió | Nivell proposat |
|---:|---|---|---|
| 1 | Escala recolzada: trobar hipotenusa | Variant de P1 | N2, modelització contextual |
| 2 | Escala: trobar un catet a partir de la hipotenusa | Família P2 | N2, relació inversa |
| 3 | Diagonal plana d’un rectangle | Variant de P1 | N1, aplicació directa |
| 4 | Diagonal i catet conegut: trobar l’altre catet | Variant de P2 | N2 |
| 5 | Rampa: hipotenusa amb dos catets | Variant de P1 | N2, identificar el model contextual |
| 6 | Cable i pal: hipotenusa | Variant de P1 | N2, identificar catets |
| 7 | Diagonal espacial d’una caixa | Família P3 | N2, combinar tres dimensions |
| 8 | Diagonal d’un quadrat | Variant de P1 | N1, cas directe amb catets iguals |
| 9 | Altura d’un triangle isòsceles amb base partida | Variant de P2 | N2, construir el triangle auxiliar |
| 10 | Cable diagonal més longitud extra | Família P4 | N2, Pitàgores i suma final |

### Famílies i exemples resolts

**P1 — Trobar hipotenusa amb dos catets (tipus 1, 3, 5, 6 i 8), N1/N2.** Mateix procediment, amb variants de model i context. Els casos de diagonal plana/quadrada són N1; escala, rampa i cable demanen identificar el triangle del context i són N2.

- Catets 7 i 24 cm: diagonal = √(49+576)=**25 cm**.
- Desnivell 5 m i recorregut 12 m: rampa = √(25+144)=**13 m**.
- Cas límit del tipus 8: costat 5 cm → diagonal = √50 ≈ **7,07 cm**; no és 10 cm.

Errors típics: sumar costats; prendre la hipotenusa com a catet; fer l’arrel abans de sumar els quadrats. Les unitats dels catets han de coincidir.

**P2 — Recuperar un catet (tipus 2, 4 i 9), N2.** Mateixa relació inversa; el tipus 9 és variant perquè primer divideix la base de l’isòsceles per la meitat.

- Hipotenusa 20 m, catet 16 m: altre catet = √(400−256)=**12 m**.
- Isòsceles de costats iguals 13 cm i base 10 cm: meitat de base 5; altura = √(169−25)=**12 cm**.

Errors típics: sumar quadrats en lloc de restar; no partir la base; usar el costat conegut com si fos la hipotenusa quan no ho és. Cas límit: hipotenusa ha de ser estrictament més gran que cada catet.

**P3 — Diagonal espacial (tipus 7), N2.** Tasca diferent de la diagonal plana: incorpora una tercera dimensió, equivalent a aplicar Pitàgores dues vegades.

- Caixa 4×4×7 m: D=√(16+16+49)=**9 m**.
- Caixa 3×4×12 m: D=√(9+16+144)=**13 m**.

Errors típics: usar només la diagonal de la base; sumar dimensions sense quadrar-les. Cas límit: D és més gran que cadascuna de les tres arestes.

**P4 — Hipotenusa i longitud addicional (tipus 10), N2.** Cal calcular primer la distància directa i després afegir cable per connexions. És la mateixa família procedimental que el tipus 9 del bloc 8.

- Catets 5 i 12 m, connexions 1,25 m: hipotenusa 13 m; total **14,25 m**.
- Catets 8 i 15 m, extra 2 m: hipotenusa 17 m; total **19 m**.

Errors típics: incorporar l’extra com un catet; afegir-la abans de calcular la hipotenusa. Cas límit: la longitud final ha de ser més gran que la distància recta.

### Modes i evidència disponible per al bloc 6

- **Estàtica:** les deu branques tenen pistes i solució; no declaren `allowOpen=false`. El selector mostra N1/N2 i el nivell 1 presenta pistes.
- **Estàtica prèvia:** 3000 mostres, distribució [0,10,0], examen [0,12,0]. Es proposa N1 només per diagonals planes directes (3 i 8); no es força N3.
- **Simulació i validació visual:** no fetes.
- **Enllaç transversal:** el tipus 10 comparteix procediment amb `errorMesura:9`; s’ha de comptar com una família compartida, no dues.

## Bloc 7 — Piràmides i cons: contrast dels 10 tipus

Contrast estàtic de les branques 1–10 de `genPiramidesCons3ESO()` (línies 1599–1676).

### Mapa tipus → família

| Tipus | Procediment | Decisió | Nivell proposat |
|---:|---|---|---|
| 1 | Volum de piràmide amb base quadrada | Família V1 | N1 |
| 2 | Volum de piràmide amb base rectangular | Variant de V1 | N1 |
| 3 | Àrea lateral de piràmide quadrada | Família V2 | N1 |
| 4 | Àrea total de piràmide (base + lateral) | Variant de V2 | N2 |
| 5 | Apotema lateral amb Pitàgores | Família V3 | N2 |
| 6 | Apotema amb Pitàgores i àrea total | Variant de V3 | N2 |
| 7 | Volum de con | Família C1 | N1 |
| 8 | Àrea lateral de con amb generatriu donada | Família C2 | N1 |
| 9 | Àrea total de con: obtenir generatriu i sumar base | Família C3 | N2 |
| 10 | Altura de con a partir del volum | Família C4 | N2 |

### Famílies i exemples resolts

**V1 — Volum de piràmide (tipus 1 i 2), N1.** Mateix esquema V=Aᵦ·h/3; quadrat i rectangle són variants de base.

- Base quadrada de costat 6 cm, altura 9 cm: 36·9/3 = **108 cm³**.
- Base rectangular 8×5 cm, altura 6 cm: 40·6/3 = **80 cm³**.

Errors típics: oblidar dividir entre 3; usar una aresta inclinada en lloc de l’altura perpendicular. Cas límit: la base ha d’estar expressada en unitats d’àrea i el resultat en unitats cúbiques.

**V2 — Àrea lateral/total de piràmide quadrada (tipus 3 i 4), N1/N2.** Mateixa àrea lateral (P·apotema/2); el tipus 4 és variant perquè hi suma la base.

- Costat 6 cm, apotema lateral 5 cm: lateral = 24·5/2 = **60 cm²**.
- Amb base 6²=36 cm²: àrea total = 60+36 = **96 cm²**.

Errors típics: comptar només una cara triangular; afegir la base al tipus 3, que demana només àrea lateral. Cas límit: apotema lateral no és l’altura vertical.

**V3 — Apotema i àrea total de piràmide (tipus 5 i 6), N2.** Mateix triangle auxiliar (altura vertical i meitat del costat); el 6 continua fins a l’àrea total.

- Costat 12 cm, altura 8 cm: apotema = √(8²+6²)=**10 cm**.
- Amb aquestes dades: lateral=(48·10)/2=240; base=144; total=**384 cm²**.

Errors típics: usar el costat sencer com a catet horitzontal; sumar lateral i base abans de trobar l’apotema. Cas límit: només per a la piràmide regular quadrada definida a l’enunciat.

**C1 — Volum de con (tipus 7), N1.**

- r=3 cm, h=12 cm: V=3,14·9·12/3=**113,04 cm³**.
- r=5 cm, h=6 cm: V=3,14·25·6/3=**157 cm³**.

Error típic: oblidar el terç o usar el diàmetre com a radi. Cas límit: mantenir π≈3,14 al càlcul.

**C2 — Àrea lateral de con (tipus 8), N1.**

- r=3 cm, g=5 cm: Aₗ=3,14·3·5=**47,1 cm²**.
- r=4 cm, g=10 cm: Aₗ=3,14·4·10=**125,6 cm²**.

Errors típics: usar πr² (base) o duplicar l’àrea lateral. Cas límit: no afegir l’àrea de la base perquè l’enunciat demana només lateral.

**C3 — Àrea total de con amb generatriu calculada (tipus 9), N2.**

- r=3 cm, h=4 cm: g=5; Aₗ=47,1; base=28,26; total=**75,36 cm²**.
- r=5 cm, h=12 cm: g=13; Aₗ=204,1; base=78,5; total=**282,6 cm²**.

Errors típics: confondre g amb h; oblidar la base o comptar-la dues vegades. Cas límit: primer cal validar que g²=r²+h².

**C4 — Recuperar l’altura del con a partir del volum (tipus 10), N2.**

- V=12,56 cm³, r=1 cm: h=3·12,56/(3,14·1²)=**12 cm**.
- V=314 cm³, r=5 cm: h=3·314/(3,14·25)=**12 cm**.

Errors típics: aïllar malament h; oblidar que radi és al quadrat. Cas límit: radi i volum han de ser positius i coherents amb les unitats.

### Modes i evidència disponible per al bloc 7

- **Estàtica:** pistes i solucions per a les deu branques; cap declara `allowOpen=false`. Es pot usar resposta oberta per a totes segons el codi actual.
- **Estàtica prèvia:** 3000 mostres, distribució [5,5,0], examen [6,6,0]. S’ha mantingut la progressió N1 per fórmules directes i N2 per apotema/generatriu o inversió.
- **Simulació i validació visual:** no fetes.
- **Cobertura:** el generador només tracta piràmides de base quadrada (amb el tipus 2 de base rectangular per volum) i cons; no s’inventa ampliació de bases poligonals perquè els 10 tipus cobreixen els procediments que el bloc anuncia.

## Bloc 8 — Estimació, error i problemes de mesura: contrast dels 10 tipus

Contrast estàtic de les branques 1–10 de `genErrorProblemes3ESO()` (línies 1677–1767).

### Mapa tipus → família

| Tipus | Procediment | Decisió | Nivell proposat |
|---:|---|---|---|
| 1 | Triar estimació plausible d’una magnitud | Família E1 | N1 |
| 2 | Error absolut | Família E2 | N1 |
| 3 | Error relatiu en forma decimal | Família E3 | N1 |
| 4 | Error relatiu percentual | Variant de E3 | N1 |
| 5 | Comparar dues precisions relatives | Variant de E3 | N2 |
| 6 | Error absolut màxim per arrodoniment | Família E4 | N1 |
| 7 | Volum d’un dipòsit rectangular parcialment ple → litres | Família E5 | N2 |
| 8 | Àrea pintable i cobertura per litre | Família E6 | N2 |
| 9 | Pitàgores i extra de connexió | Mateixa família que `pitagores:10` | N2 |
| 10 | Volum de con parcialment ple → litres | Variant de E5 | N2 |

### Famílies i exemples resolts

**E1 — Estimació d’ordre de magnitud (tipus 1), N1.**

- Altura d’una porta: estimació plausible **2 m**, no 2 cm ni 20 m.
- Capacitat d’una ampolla d’aigua: **1 L** és plausible, no 1 m³.

Error típic: confondre unitat o ordre de magnitud. Cas límit: és una estimació contextual, no una mesura exacta. El tipus 1 és d’opcions; el codi declara `allowOpen=false`.

**E2 — Error absolut (tipus 2), N1.** Eₐ=|mesura−referència|, amb la mateixa unitat.

- Referència 80 cm, mesura 79,8 cm: **0,2 cm**.
- Referència 100 cm, mesura 102,5 cm: **2,5 cm**.

Errors típics: donar error amb signe; canviar d’unitat sense convertir. Cas límit: l’error absolut no indica per si sol quina de dues mesures és relativament millor.

**E3 — Error relatiu decimal, percentual i comparació (tipus 3, 4 i 5), N1/N2.** Mateixa idea d’error absolut dividit pel valor de referència; el tipus 4 n’expressa el resultat en %, i el 5 compara dos quocients (N2).

- Referència 40 cm, mesura 40,5 cm: Eₐ=0,5; Eᵣ=0,5/40=**0,0125**.
- Referència 20 cm, mesura 19,5 cm: Eᵣ=0,5/20=0,025=**2,5%**.
- A: error 0,2 sobre 20 → 0,01; B: error 1 sobre 200 → 0,005; **B** és més precisa relativament.

Errors típics: dividir per la mesura en comptes de la referència; confondre 0,025 amb 0,025%; comparar errors absoluts de referències de mida diferent. Cas límit: si els errors relatius coincideixen, no hi ha una mesura més precisa; el generador filtra els empats.

**E4 — Error màxim d’arrodoniment (tipus 6), N1.** L’error màxim és la meitat de la unitat d’arrodoniment.

- Arrodoniment a unitats de cm: error màxim **0,5 cm**.
- Arrodoniment a dues xifres decimals de cm: error màxim **0,005 cm**.

Error típic: usar una unitat sencera d’error, no la meitat. Cas límit: la pregunta limita el resultat a l’error degut només a l’arrodoniment.

**E5 — Volum parcialment ple i conversió a litres (tipus 7 i 10), N2.** Mateixa família (volum geomètric × fracció d’ompliment i canvi d’unitat), amb variant de cos: prisma rectangular o con.

- Dipòsit 2×1,5×1,2 m al 75%: total 3,6 m³; aigua 2,7 m³=**2700 L**.
- Con r=25 cm, h=60 cm al 75%: V=39.250 cm³; ocupat 29.437,5 cm³=**29,4375 L** (aprox. 29,44 L si es demana arrodonir a centèsimes).

Errors típics: aplicar percentatge a una sola dimensió; convertir cm³ a L amb factor 100; no aplicar la fracció d’ompliment. Cas límit: el resultat depèn de la capacitat geomètrica interior i del percentatge indicat.

**E6 — Superfície pintable i cobertura (tipus 8), N2.**

- Paret 6×3 m, porta 1×2 m, finestra 1×1 m: superfície pintable 18−2−1=15 m²; a 4 m²/L calen **3,75 L**.
- Paret 5×3 m, porta 2 m², finestra 1,5 m²: superfície 11,5 m²; a 5 m²/L calen **2,3 L**.

Errors típics: pintar també les obertures; multiplicar per cobertura en lloc de dividir. Cas límit: el tipus demana litres, no quants pots sencers comprar; no s’arrodoneix a un envàs perquè no hi ha mida d’envàs a les dades.

**Enllaç P4 — Cable amb connexions extra (tipus 9), N2.** És la mateixa família que `pitagores:10`, amb valors/context diferents, i no s’ha de comptar com una família nova.

- Catets 3 i 4 m, extra 1 m: diagonal 5 m; longitud total **6 m**.
- Catets 5 i 12 m, extra 0,5 m: diagonal 13 m; total **13,5 m**.

Errors típics: sumar l’extra dins del radical o afegir-la abans de trobar la diagonal. Cas límit: l’extra correspon al cable físic i se suma a la distància recta.

### Modes i evidència disponible per al bloc 8

- **Estàtica:** tipus 1 declara `allowOpen=false`; els tipus 2–10 poden entrar en mode obert. Tots retornen pistes i solucions; el nivell 1 mostra pistes.
- **Estàtica prèvia:** 3000 mostres, distribució [5,5,0], examen [6,6,0]. Type 9 s’ha enllaçat a Pitàgores, no duplicat.
- **Simulació i validació visual:** no fetes.
- **Casos límit de codi comprovats estàticament:** el tipus 5 de comparació detecta i regenera casos d’empat; el tipus 8 calcula litres fraccionaris perquè l’enunciat demana litres necessaris, no envasos sencers.

## Justificació curricular de nivell i abast

La font oficial del Departament d’Educació agrupa diversos sabers de Matemàtiques per a **1r–3r d’ESO**, no assigna tots aquests procediments exclusivament a 3r. En el sentit de la mesura hi inclou la tria d’unitats/instruments, el càlcul de longituds, àrees i volums, l’ús de Tales i Pitàgores, l’estimació i la precisió. En canvi, les raons trigonomètriques apareixen a la columna de 4t. Per això les ampliacions de trigonometria, escales/cossos avançats i reptes de preparació de 4t es mantenen fora del recomptatge ordinari, i els nivells proposats s’entenen com a progressió interna N1/N2/N3 dins d’aquest marc, no com una afirmació que cada saber pertanyi normativament només a 3r.

Font: [Generalitat de Catalunya, Sabers de l’educació secundària obligatòria — Matemàtiques (PDF)](https://projectes.xtec.cat/nou-curriculum/wp-content/uploads/usu2072/2024/06/20240529-Sabers-MAT-Nodes.pdf), apartats “Sentit de la mesura”, especialment “Mesurament” i “Estimació i relacions”.


## Consolidació transversal dels vuit blocs

### Nivells actius i proposta de l’auditoria

S’ha llegit el mapa actiu `REVIEWED_LEVELS["3eso/mesura"]` de `assets/js/dificultat-mi.js` i s’ha contrastat amb les matrius prèvies. La columna de proposta resumeix els nivells indicats als mapes tipus→família d’aquest document; **no s’ha escrit a la configuració de producció**.

| Bloc | Actiu N1/N2/N3 | Proposat N1/N2/N3 | Canvi principal |
|---|---:|---:|---|
| 1 · Volum i capacitat | 7/3/0 | 5/5/0 | Unitats mixtes i volum geomètric compost passen a N2 |
| 2 · Mesura i precisió | 7/3/0 | 7/3/0 | Es manté; ponderació abast+resolució i interval ja són N2 |
| 3 · Àrees compostes | 1/9/0 | 1/9/0 | Es manté; només resta directa és N1 |
| 4 · Semblança | 9/1/0 | 6/4/0 | Recuperar k amb arrels i reducció fraccionària passen a N2 |
| 5 · Tales | 0/10/0 | 2/8/0 | Proporció directa i reconeixement de l’ordre passen a N1 |
| 6 · Pitàgores | 0/10/0 | 2/8/0 | Diagonal plana directa i diagonal quadrada passen a N1 |
| 7 · Piràmides i cons | 5/5/0 | 5/5/0 | Es manté |
| 8 · Estimació, error i problemes | 5/5/0 | 5/5/0 | Es manté |
| **Total** | **34/46/0** | **33/47/0** | **No es proposa cap N3** |

El currículum oficial agrupa molts d’aquests sabers a la franja **1r–3r ESO**; per tant, N1/N2 és una proposta de seqüenciació interna del producte, no l’afirmació que un saber concret només es pugui treballar a 3r. La font i l’abast curricular queden indicats més amunt.

### Relacions de família entre blocs

| Vincles | Decisió | Criteri de recompte |
|---|---|---|
| `pitagores:10` ↔ `errorMesura:9` | **Mateixa família** | Distància per Pitàgores i suma d’extra de connexió. Un únic nucli de família, dos contextos/tipus. |
| `volum:6,7,9` ↔ `errorMesura:7,10` | **Variants d’una família de volum-capacitat** | Calcular volum i convertir; els tipus 7/10 hi afegeixen una fracció d’ompliment, i canvia la forma del recipient. |
| `arees:1,3,5,7,10` ↔ `errorMesura:8` | **Variant integradora** | La paret pintable reutilitza àrea total menys obertures i hi afegeix una taxa de cobertura; no és una família nova per cada context. |
| `semblanca` ↔ `tales` | **Tasques diferents, principi relacionat** | Semblança aplica una raó coneguda o la recupera entre figures; Tales modelitza una longitud inaccessible a partir d’una configuració de triangles. |
| `pitagores` ↔ `piramides:5,6` i `piramides:9` | **Tasques diferents amb subprocediment compartit** | Pitàgores obté apotema/generatriu, però la tasca final és àrea de piràmide/con; no es duplica com a família autònoma de Pitàgores. |
| `precisio:6,10` | **Mateixa família amb contextos/format variants** | Lectura compatible amb la resolució de l’instrument. |
| `estimacio:3,4,5` | **Mateixa família amb variants** | Error relatiu decimal, percentatge i comparació de precisió relativa. |
| `piramides:3,4`; `piramides:5,6`; `piramides:7,8,9,10` | **Famílies diferenciades segons l’objectiu** | Àrea lateral/total; apotema i àrea composta; volum, àrea lateral/total i inversió del volum no són el mateix procediment final. |

Els nombres de famílies locals dels blocs no s’han de sumar directament: els enllaços anteriors uneixen famílies equivalents o variants integradores. No s’ha actualitzat el registre oficial `families-validades.json`; les decisions continuen sent candidates documentades.

### Buits curriculars i propostes d’exercicis

No s’ha identificat un procediment imprescindible absent que justifiqui crear exercicis nous dins dels vuit blocs ordinaris. Les branques cobreixen conversions, instruments/resolució, àrees compostes, escala, Tales, Pitàgores, piràmides/cons i estimació/error. No es proposa forçar N3. La trigonometria i altres ampliacions de preparació de 4t romanen fora del bloc ordinari segons la seqüenciació publicada.

### Revisió global dels modes i qualitat de l’evidència

- **Mode guiat / N1 — estàtic:** tots els generadors revisats retornen pistes i passos de solució; la interfície mostra les pistes quan el nivell seleccionat és 1.
- **Mode autònom / N2 — estàtic:** la interfície amaga les pistes al nivell 2. Això confirma la regla de presentació, no que cada exercici tingui una dificultat N2 pedagogicament calibrada.
- **Resposta oberta — estàtic:** la majoria de branques són compatibles amb entrada oberta. Excepcions explícites: `precisio:1,2,8,9` i `errorMesura:1` (`allowOpen=false`), que el codi ha de regenerar fora del mode obert. Per tant, el banc de resposta oberta no cobreix literalment els 80 tipus.
- **Mode Examen — estàtic:** els vuit blocs ordinaris tenen `exam3r:true`; les quatre ampliacions de 4t, `exam3r:false`. Els fitxers previs registren distribucions d’examen per als blocs ordinaris i no per a les ampliacions.
- **Mostres prèvies — no repetides:** els resultats registren 3.000 generacions per tema i la cobertura d’examen indicada a l’inventari. Són evidència prèvia de generació, no validació pedagògica ni visual.
- **Simulació de fluxos — no feta en aquesta auditoria.**
- **Validació visual en navegador — no feta.**

## Resolució de les observacions de qualitat (19-11-2026)

S’han contrastat estàticament les observacions que quedaven obertes; no s’han executat proves ni s’ha modificat cap generador.

| Observació | Contrast amb el codi actual | Dictamen |
|---|---|---|
| Bloc 1, tipus 4: distractors en conversions volum-capacitat | measureOptions() elimina del conjunt de distractors qualsevol valor numèric igual a la resposta; uniq4() conserva una resposta correcta i completa quatre opcions úniques. Els factors proposats són errors d’escala (×10, ÷10, ×1000, ÷1000). | No hi ha defecte funcional de resposta correcta absent o duplicada. La qualitat pedagògica dels distractors continua sent un criteri de disseny, no una incidència funcional reproduïda. |
| Bloc 2, tipus 5: la resposta correcta no semblava lligada a les opcions | La branca tria A o B com a resposta segons la parella de resolucions de la taula; les quatre opcions inclouen sempre “Instrument A” i “Instrument B”. | Falsa alarma: la resposta correcta sempre forma part de les opcions. |
| Bloc 2, tipus 7: “unitat més propera” amb diverses unitats | El banc genera valors positius en cm, mm, mL o g, i l’enunciat sempre mostra la unitat de la lectura. L’interval de ±0,5 és en aquesta unitat, amb convenció [límit inferior, límit superior) indicada a la guia. | No hi ha ambigüitat: l’interval es refereix a la unitat que acompanya la lectura. |
| Bloc 3, tipus 8: guia i solució discrepen | L’enunciat dona l’àrea del rectangle. La guia diu correctament que no cal calcular-ne l’altura; el primer pas de la solució calcula àrea ÷ base, un pas superflu i contradictori. El càlcul no canvia la resposta final, però pot confondre sobre el procediment necessari. | Incidència de contingut confirmada. Correcció proposada, pendent d’autorització: substituir el primer pas de la solució per “Àrea del rectangle (donada): ${area} cm²”, i mantenir els passos del triangle i de la suma. No s’ha modificat el codi, d’acord amb els límits d’aquesta PR. |

**Pendents que no són incidències de codi:** la revisió de les branques i les mostres és estàtica; continuen sense simulació dels fluxos ni validació visual de navegador. Cal conservar aquesta limitació fins que es faci una passada de validació autoritzada.

### Estat final de verificació i observacions

- **80/80** branques contrastades estàticament amb els vuit generadors actuals.
- Exemples resolts, errors típics, casos límit i decisió de família documentats per a cada família candidata local.
- Nivells actius comprovats al codi i proposta N1/N2 presentada sense escriure-la a producció.
- No s’ha canviat codi, generadors, nivells ni el registre oficial; tampoc s’han creat workflows ni s’han executat proves noves.
- Les tres observacions de distractors/resposta i unitat d’arrodoniment s’han tancat per contrast estàtic; la incidència de contingut a `arees:8` està confirmada i té una correcció proposada, encara no aplicada.
- Les decisions de família són una proposta d’auditoria, no una adopció oficial ni una validació docent.

