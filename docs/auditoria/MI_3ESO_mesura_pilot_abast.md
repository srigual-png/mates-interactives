# Pilot 3r ESO — Sentit de la mesura

## Abast

Auditoria documental dels **8 blocs ordinaris** de 3r ESO (80 tipus, segons els registres previs). Les ampliacions A–D de preparació de 4t (40 tipus) queden excloses dels recomptes i de les decisions de família.

| Bloc | Tema | Tipus | N1/N2 provisionals al registre revisat |
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

Aquests recomptes descriuen l’estat dels fitxers previs, no són encara una proposta pedagògica ni un recompte de famílies. Cal contrastar-los amb els generadors actuals i separar tipus, variants i famílies.

## Evidència prèvia a reutilitzar

- `docs/dificultats/revisio-3eso-mesura-punt3.json`: 120 registres de tipus per als 8 blocs ordinaris i 4 ampliacions; estat global `reclassified-with-gaps`.
- `docs/dificultats/resultats-punt3-3eso-mesura.json`: mostres de 3.000 instàncies per bloc, amb resultats d’examen per als 8 blocs ordinaris; els registres previs de les ampliacions no tenen camp d’examen.
- `3eso/teoria/mesura/index.html`: delimita explícitament el recorregut principal (blocs 1–8) i les ampliacions A–D.

Les xifres i mostres s’han de contrastar amb el codi actual abans de concloure. La generació de mostres documentada prèviament no demostra per si sola l’equivalència pedagògica entre tipus.

## Decisions i revisió

Per a cada tipus s’ha de registrar el grup/família candidata i la relació: **mateixa família / variant / tasca diferent**. Per a cada família resultant: nivell proposat i justificació curricular de 3r, dos exemples resolts, errors típics i casos límit. Les propostes de nous exercicis s’han de limitar als procediments absents; no es forçarà N3 ni es duplicaran famílies entre blocs.

La revisió dels modes guiat, autònom i examen ha d’indicar, per cada afirmació, si l’evidència és **estàtica**, de **simulació** o **visual**. La manca de validació visual s’ha de declarar explícitament.

## Límit de canvis

Aquesta branca és documental. No s’han de modificar nivells de producció, generadors ni `families-validades.json`, ni crear workflows ni proves noves. Si l’auditoria detecta una correcció de codi imprescindible, documentar-la i aturar-se abans d’aplicar-la.

## Estat

- [x] Inventari inicial i abast (80 tipus ordinaris; ampliacions excloses).
- [ ] Contrastar inventari i evidència amb generadors actuals.
- [ ] Mapa tipus → família i decisions de deduplicació (80/80).
- [ ] Nivells, justificació curricular i casos (per família).
- [ ] Buits reals i propostes justificades, si n’hi ha.
- [ ] Revisió de guiat, autònom i examen; límits de verificació.
- [ ] Síntesi final amb què s’ha verificat i què queda pendent.

## Primera comprovació contra el generador (revisió estàtica)

Fitxer contrastat: `3eso/sentit-mesura.html` a la branca base.

- El codi declara exactament **8 temes de 3r** amb `exam3r:true` i **4 ampliacions de 4t** amb `exam3r:false` i `ampliacio:true`. Això confirma l’abast 80/40 dels registres previs.
- Hi ha un generador específic per a cadascun dels 12 temes. Els vuit generadors ordinaris seleccionen un identificador de tipus entre 1 i 10; per tant, els registres previs cobreixen els identificadors esperats, però encara falta contrastar una per una les branques i el procediment matemàtic real de cada tipus.
- La interfície de pràctica exposa dos nivells (1 i 2); al nivell 1 mostra les pistes. El codi no exposa un selector N3 en aquesta pàgina. Això descriu la implementació actual, no determina si pedagògicament caldria proposar N3.
- El filtre de contingut d’examen s’aplica sobre la llista de temes; els vuit blocs ordinaris estan marcats com a inclosos i les ampliacions com a excloses.
- Aquesta passada és **estàtica**. No s’han executat proves ni s’ha fet simulació o validació visual.

Aquesta confirmació de l’estructura no certifica encara la correcció de les 80 branques, la deduplicació per família, la qualitat dels exemples o l’adequació curricular.

## Progrés de l’auditoria

- [x] Confirmació estàtica de l’abast al codi: 8 blocs de 3r × 10 tipus i 4 ampliacions de 4t × 10 tipus.
- [ ] Contrast individual de les branques 1–10 dels vuit generadors ordinaris.
- [ ] Mapa tipus → família i decisions de deduplicació (80/80).
- [ ] Nivells, justificació curricular i casos (per família).
- [ ] Buits reals i propostes justificades, si n’hi ha.
- [ ] Revisió de guiat, autònom i examen amb classificació de l’evidència.
- [ ] Síntesi final amb què s’ha verificat i què queda pendent.

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
- 3,0 cm arrodonits a 0,1 cm: valor previ dins `[2,95;3,05)` (cal confirmar que la implementació del tipus està restringida a unitats, com diu l’enunciat actual).

Errors típics: usar ±1 en comptes de ±0,5 unitat; incloure tots dos extrems; no ajustar la meitat de la resolució. Cas límit: la inclusió del punt de mig depèn de la convenció d’arrodoniment i del signe; el generador descriu la convenció per valors positius.

### Revisió dels modes i evidència disponible per al bloc 2

- **Estàtica:** els tipus 1, 2, 8 i 9 declaren `allowOpen=false`; per tant, el mode de resposta oberta els evita i regenera un altre tipus. Els altres tipus tenen resposta oberta activada. Això redueix l’univers del mode obert i cal tenir-ho present en valorar varietat.
- **Estàtica:** el codi retorna pistes i solucions per a les deu branques; la interfície mostra pistes al nivell 1.
- **Estàtica prèvia:** el registre indica 3000 mostres, cobertura [7,3,0] i examen [7,5,0]. No s’han repetit aquestes mostres.
- **Simulació i validació visual:** no fetes en aquesta passada.

### Casos a contrastar en una passada de qualitat

- El tipus 5 crea les opcions amb una llista barrejada fixa; el codi visible no deriva les opcions de la comparació actual ni garanteix explícitament que la resposta correcta aparegui. Cal inspeccionar aquesta branca amb més detall abans de concloure si és una incidència funcional; no s’ha executat cap prova nova ni s’ha canviat el codi.
- Al tipus 7, la pregunta diu “arrodonida a la unitat més propera”, però el banc conté unitats diferents. La interpretació d’`[valor−0,5; valor+0,5)` només és correcta si “unitat” vol dir la unitat indicada per cada lectura; cal contrastar els valors/unitats exactes del banc abans de tancar el cas.