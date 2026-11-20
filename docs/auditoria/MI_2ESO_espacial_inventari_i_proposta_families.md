# 2n ESO · Sentit espacial — inventari i primera proposta d’agrupació

> **Estat: provisional.** Aquest document prepara la revisió pedagògica del bloc. No valida famílies, no modifica els generadors, els nivells publicats ni `families-validades.json`. La revisió s’ha fet sobre `main` al commit `086d7b725db59ebb99266352e84ef8d9470a7d17`.

## Abast i fonts

S’inclouen els set temes ordinaris de `2eso/sentit-espacial.html`: semblança, Tales i escales, Pitàgores, cossos, visualització 3D, coordenades i modelització. S’exclouen els quatre temes etiquetats com a ampliació de 3r (`pitagores3r`, `semblanca3r`, `transformacions3r` i `transformacionsAv3r`).

Fonts del repositori: `2eso/sentit-espacial.html`, `docs/dificultats/revisio-2eso-espacial-punt3.json` i `docs/dificultats/resultats-punt3-2eso-espacial.json`. La revisió original és una fotografia del codi de `main` al commit `086d7b725db59ebb99266352e84ef8d9470a7d17`. Després, la contradicció del peu de `visual3d:5` es va corregir a la PR #61: ara indica `COSTAT DRET`. Aquest canvi no acredita una validació visual completa del banc. Referència curricular consultada: [XTEC — Orientacions curriculars de Matemàtiques per cursos (PDF)](https://xtec.gencat.cat/web/.content/curriculum/eso/concrecions-curriculars/Orientacions-curriculars_MAT_SEC_per-cursos.pdf), apartat **2n ESO, sentit espacial**, p. 12 i visualització, p. 13 (consulta del 17-11-2026). La pàgina [Concrecions curriculars](https://xtec.gencat.cat/ca/curriculum/eso/concrecions-curriculars/) identifica aquest document com a concreció oficial.

La classificació efectiva és: **37 tipus únics a N1, 31 a N2 i 2 a N3**. El tipus 10 de modelització té una variant de plànol/escala que també es classifica a N1; per això, el resum de cobertura per camins el compta a N1 i N2. El validador de cobertura informa 38/31/2 camins, però només hi ha 70 tipus ordinaris.

## Contrast amb la seqüenciació curricular de 2n

La proposta XTEC situa explícitament a 2n ESO: semblança en el pla i l’espai i raó de semblança; Tales en contextos; descobriment i ús de Pitàgores; propietats/classificació de cossos geomètrics; desenvolupaments plans; coordenades cartesianes; visualització de funcions constant, lineal i afí; i connexions entre sentits. També inclou representació plana de prismes i cilindres. Això dona base curricular als set blocs, però no valida per si sol cada pregunta ni el seu nivell.

| Bloc del repositori | Connexió curricular | Punt de revisió |
|---|---|---|
| Semblança | Semblança plana i espacial, raó de semblança. | Comprovar que els ítems tridimensionals treballen la raó i no introdueixen proporcions d’àrea/volum pròpies de l’ampliació de 3r. |
| Tales i escales | Tales i proporcionalitat geomètrica; hi ha referències creuades amb mesura i numèric. | Escales i conversions també pertanyen al sentit de la mesura; evitar presentar tot l’enunciat contextual com una família geomètrica nova. |
| Pitàgores | Descoberta, visualització per àrees i resolució de problemes. | Separar la comprensió de la relació de l’aplicació en diagonals/contextos; no elevar només per tenir context. |
| Cossos | Propietats, elements i classificació de poliedres i cossos rodons. | Recompte de cares/arestes/vèrtexs és una extensió de les propietats; revisar que les fórmules s’hagin treballat a 2n. |
| Visualització 3D | Desenvolupaments plans i representació de cossos. | Les vistes ortogonals i les restriccions triples són coherents com a visualització; comprovar que la dificultat no depengui de convencions gràfiques no ensenyades. |
| Coordenades | Localització en el pla cartesià. | Les distàncies euclidianes empren Pitàgores; les funcions de les rectes enllacen també amb el sentit algebraic. |
| Modelització | Connexions espacials; la visualització de funcions constant, lineal i afí també apareix al sentit espacial. | És un contenidor de connexions, no una família única. Cal vincular cada tipus al procediment curricular concret. |

## Inventari provisional

Hi ha **70 tipus ordinaris** repartits en set temes. Els nivells següents són la classificació efectiva de `REVIEWED_LEVELS` a `assets/js/dificultat-mi.js`, basada en l’inventari provisional existent. Estan actius a l’aplicació, però **no són una validació pedagògica final ni un registre de famílies**:

| Tema | Tipus | N1 | N2 | N3 | Lectura inicial |
|---|---:|---:|---:|---:|---|
| Semblança i congruència | 11 | 6 | 5 | 0 | Diverses propietats de la semblança estan agrupades sota una justificació massa ampla. |
| Tales, escales i mesures indirectes | 10 | 5 | 5 | 0 | Escala de plànol, Tales i ombres comparteixen proporcionalitat, però demanen representacions diferents. |
| Teorema de Pitàgores | 10 | 5 | 5 | 0 | Aplicació directa i identificació del triangle versus situacions que exigeixen construir-lo. |
| Poliedres i cossos rodons | 10 | 10 | 0 | 0 | Nivell uniforme; cal comprovar si les preguntes inverses i de recompte són igualment directes. |
| Desenvolupaments i visualització 3D | 9 | 2 | 6 | 1 | El tipus 8 incorpora tres projeccions i restriccions simultànies; candidat N3, sense donar-lo per validat. |
| Coordenades cartesianes | 10 | 7 | 3 | 0 | El tema barreja lectura del pla, classificació de figures, rectes i distàncies. |
| Modelització i connexions geomètriques | 10 | 2 (+ branca) | 7 | 1 | El tipus 10 té una variant d’escala a N1 i altres variants a N2; no són 11 tipus diferents. |
| **Total de tipus únics** | **70** | **37** | **31** | **2** | El tipus 10 de modelització té una branca N1 i altres variants N2; la cobertura per camins compta una branca addicional. No és un recompte de famílies. |

La taula reflecteix la classificació activa existent. Després d’inspeccionar els generadors, proposo quatre ajustos provisionals: `modelitzacio:3` de N3 a N2; `modelitzacio:2`, `visual3d:3` i `coordenades:6` de N2 a N1. Si la revisió dels exemples confirma aquesta lectura, quedaria **40 N1 / 29 N2 / 1 N3** per a tipus únics, amb una branca addicional N1 de `modelitzacio:10` comptada separadament.

### Agrupacions candidates per contrastar

Els grups d’aquesta taula serveixen per començar la comparació. **No es declaren famílies genuïnes** fins a contrastar procediment, exemples reals i límits de cada generador.

| Tema | Tipus | Nucli que convé comparar | Qüestió pendent |
|---|---|---|---|
| Semblança | 2, 3 | Calcular la raó en els dos sentits. | Mateixa família amb orientació invertida? |
| Semblança | 1, 5, 8, 11 | Reconèixer o comprovar semblança entre figures; angles i dimensions corresponents. | Tipus 8 és conceptual; 11 és tridimensional. Cal decidir si són variants o tasques diferents. |
| Semblança | 4, 9 | Trobar una longitud homòloga desconeguda. | Verificar si les dues representacions usen el mateix muntatge proporcional. |
| Semblança | 6, 7, 10 | Conservar angle, mida o perímetre sota semblança/isometria. | Separar invariància angular, congruència per moviment i escala del perímetre. |
| Tales i escales | 3, 4, 5, 6, 10 | Passar entre representació i realitat amb una escala. | El tipus 10 pot exigir reconstruir una proporció, més que una conversió directa. |
| Tales i escales | 1, 2 | Reconstruir segments homòlegs amb paral·lelisme. | Revisar si canvia només la incògnita o també el raonament. |
| Tales i escales | 7, 8 | Relacionar alçades i ombres. | Mateixa proporcionalitat amb incògnita diferent. |
| Tales i escales | 9 | Mesura indirecta mitjançant triangles semblants. | Contrastar si és una aplicació de l’escala o un model geomètric propi. |
| Pitàgores | 1, 2, 3, 4, 5 | Relació entre catets i hipotenusa, identificació i recíproca. | Separar identificació, càlcul de costat i diagnòstic de triangle rectangle. |
| Pitàgores | 6, 7, 10 | Diagonal d’un rectangle, quadrat o cara rectangular. | Mateix triangle subjacent; representacions i resultat arrelat/arrodonit. |
| Pitàgores | 8, 9 | Escala recolzada i altura d’un isòsceles. | Modelització del triangle versus reconstrucció de la semibase. |
| Cossos | 1, 2, 3, 6, 9 | Reconeixement, classificació i descripció de cossos. | No assumir una sola família: poliedres, piràmides i cossos rodons. |
| Cossos | 4, 5, 7, 8, 10 | Recompte o reconstrucció de bases, cares i vèrtexs. | Revisar el tipus 10, que infereix la base des del total de cares. |
| Visualització 3D | 1, 2 | Plegar desenvolupaments i anticipar cares oposades. | Compartir procediment espacial, però pot requerir subfamílies segons la tasca. |
| Visualització 3D | 3, 4, 5, 6, 7 | Comptar cubs, llegir vistes i completar un prisma. | Distingir ocupació, alçades per projecció i completar volum. |
| Visualització 3D | 8 | Reconstruir una construcció que compleixi tres vistes. | Candidat a N3 per restriccions combinades; comprovar que cap pista redundant resol la resposta. |
| Visualització 3D | 9 | Identificar la forma de la secció plana d’un cub/cilindre i la base d’un prisma. | Barreja secció paral·lela i identificació de base; separar o justificar com a variants. |
| Coordenades | 1, 2 | Llegir coordenades i quadrants. | Comprovar si llegir el quadrant és la mateixa tasca amb dades diferents. |
| Coordenades | 3 | Classificar la figura definida per punts. | Pot implicar identificar propietats geomètriques, no només llegir coordenades. |
| Coordenades | 4, 6, 7 | Reconstruir quart vèrtex, punt mig o distància. | Tres procediments diferents; el tipus 7 connecta amb Pitàgores. |
| Coordenades | 5 | Distància horitzontal/vertical. | Distingir distància axial de distància euclidiana. |
| Coordenades | 8, 9, 10 | Interpretar recta, tendència i pertinença d’un punt. | Mateixa representació gràfica, però preguntes matemàtiques diferents. |
| Modelització | 6, 9 | Triar eina geomètrica o tipus de relació a partir del context. | Selecció d’eina i identificació de relació lineal poden no ser la mateixa família. |
| Modelització | 1, 2, 4, 5, 7, 8, 10 | Problemes contextuals que connecten representacions o procediments. | Massa heterogenis per comptar-los com una família; cal vincular cadascun al nucli del tema corresponent. |
| Modelització | 3 | Ombres per trobar altura i Pitàgores per trobar un cable. | Dues etapes de modelització; revisar si és N2 o si el nivell proposat N3 es manté dins del currículum de 2n. |

## Recomanació provisional de nivells

- **No forçar N3.** El candidat més sòlid és visualització 3D:8, perquè cal contrastar tres projeccions simultàniament. Proposo modelització:3 a N2: encadena dos models coneguts amb indicis explícits. Un tipus amb diversos passos no és N3 automàticament. A modelització, el tipus 10 també té una branca alternativa a N1; cal comptar variants i tipus únics per separat.
- **Revisar la distribució de cossos i coordenades.** Tots els tipus de cossos són N1; en coordenades conviuen tasques diferents sota una explicació comuna de N1. La classificació s’ha de basar en el raonament, no en el tema o el format.
- **Revisar les connexions transversals sense duplicar famílies:** semblança ↔ escales/Tales; Pitàgores ↔ diagonals/coordenades; coordenades ↔ trajectes; cossos ↔ visualització 3D. Una fórmula compartida no demostra que la tasca sigui la mateixa.
- Els objectius 15 famílies / 5 N1 / 5 N2 / 3 N3 són orientatius, no quotes. El nivell depèn del procediment i de l’adequació curricular a 2n.

### Contrast directe dels generadors i decisions de treball

S’han inspeccionat els set generadors de 2n a `2eso/sentit-espacial.html`; cobreixen 70 branques de tipus. Aquesta passada permet concretar les agrupacions, però no substitueix encara la fitxa final de cada família amb dos exemples resolts, errors típics i casos límit.

| Tema | Decisió de treball després de veure els enunciats i passos generats |
|---|---|
| Semblança | `2` i `3` són la mateixa tasca de trobar la raó, en sentits inversos. `4` i `9` busquen un costat homòleg per proporcionalitat; rectangle i triangle són variants de representació. `1` i `5` comparen figures, però el primer distingeix congruència/semblança i el segon verifica dues raons. `6` conserva angles; `10` aplica la raó al perímetre; `7` tracta girs, translacions i reflexions. No comptar aquests tres darrers com a una família només perquè tots parlin de propietats invariants. **Abast curricular per revisar:** el tipus 7 de semblança posa en primer pla girs, translacions i reflexions; la seqüenciació XTEC situa l’estudi sistemàtic dels moviments al 3r curs, mentre 2n sí que inclou la congruència. Proposo mantenir-lo en quarantena curricular i revisar si cal convertir-lo en una pregunta sobre congruència sense exigir identificar transformacions. |
| Tales i escales | `3`–`6` són conversions d’escala directa/inversa amb canvis d’unitat. `1` i `2` són variants del mateix esquema de Tales amb una incògnita diferent. `7` i `8` són variants d’ombres amb l’alçada o l’ombra com a incògnita; `9` explicita triangles semblants sense el context d’ombres i pot ser una variant del mateix nucli proporcional. `10` parteix d’una escala coneguda i transfereix la proporció a un altre costat. |
| Pitàgores | `1` és lectura visual de la relació entre àrees; `2` identifica la hipotenusa; `3`–`4` calculen un costat; `5` usa la recíproca per decidir si un triangle és rectangle. Són subtipus diferents del mateix teorema, no cinc famílies. `6`, `7`, `8`, `9` i `10` l’apliquen a diagonals o a un triangle que s’ha d’identificar/construir; el 9 afegeix partir la base per la meitat. |
| Cossos | `1`, `2`, `3`, `6` i `9` són reconeixement/classificació amb criteris diferents (poliedre o cos rodó; prisma/piràmide; descripció d’esfera). `4` i `5` compten elements de prismes/piràmides; `7` i `8` identifiquen bases de cilindres i cons; `10` reconstrueix el polígon de la base a partir del nombre total de cares d’un prisma. L’N1 és plausible per ser una regla curta i explícita, però el tipus `10` cal contrastar-lo amb la resta inversa. |
| Visualització 3D | `1` i `2` demanen plegat mental d’un desenvolupament de cub. `4` i `5` projecten alçades des del davant o el costat; `6` llegeix la petjada superior; `3` suma cubs i `7` completa un prisma per diferència. `8` exigeix contrastar simultàniament tres vistes, candidat N3 raonable. |
| Coordenades | `1`–`2` llegeixen punt/quadrant; `3` classifica una figura formada per punts; `4` reconstrueix el vèrtex que falta; `5` mesura una distància horitzontal o vertical; `6` troba el punt mig d’un segment axial; `7` calcula la distància euclidiana amb Pitàgores; `8`–`10` interpreten rectes, tipus de funció i pertinença de punts. La classificació N1 general del tema no descriu aquestes diferències de procediment. |
| Modelització | Els tipus `1`, `2`, `4`, `5`, `7`, `8` i `10` connecten sabers diferents; no són una família global. El `2` comparteix nucli amb semblança/perímetre; el `4`, amb coordenades i Pitàgores; el `5`, amb completar un prisma (visualització `7`); el `7`, amb coordenades, escala i perímetre; el `8`, amb comptatge de cubs i volum; el `10`, que amaga tres tasques: identificar una escala (variant N1), formular Pitàgores per a una escala recolzada (N2) o formular la proporció d’ombres (N2). Aquestes tres branques no són una sola família i s’han d’explicitar al registre. `6` i `9` són selecció/interpretació de model a partir del text. |

**Reclassificació a contrastar:** el tipus `modelitzacio:3` està proposat com a N3 perquè encadena semblança d’ombres i Pitàgores per al cable. Amb l’exemple generat (pal 1,5 m / ombra 2 m; torre amb ombra 8 m; cable ancorat a 8 m de la base), primer s’obté l’altura de la torre: 1,5/2 = h/8, h = 6 m; després el cable: √(6² + 8²) = 10 m. Com que els dos models són explícits i són aplicacions treballades a 2n, proposo **N2 provisional**, pendent de comprovar els extrems de valors i la càrrega de representació.

**Incidència funcional detectada a la versió auditada:** a `visual3d:5`, l’enunciat preguntava per la vista des del costat dret, però la figura afegia el peu “mirada des del DAVANT”. La PR #61 va corregir el peu a `COSTAT DRET`. La present PR continua sent només documental, i l’auditoria no declara una validació visual completa d’aquest banc.

### Propostes de nivell a verificar amb exercicis resolts

Aquests ajustos sorgeixen del procediment que demana el codi, no del nombre de pantalles o passos escrits a la guia:

| Tipus | Nivell actiu | Proposta | Exemple i justificació |
|---|---:|---:|---|
| `modelitzacio:2` | N2 | N1 | Rectangle 4 × 4 cm, ampliació k=3: perímetre inicial 16 cm; perímetre ampliat = 16×3 = 48 cm. És el mateix principi lineal que `semblanca:10`; la solució actual desplega dimensions i suma, però no exigeix un model nou. |
| `visual3d:3` | N2 | N1 | Una construcció de columnes com [1,2; 2,3] té 1+2+2+3 = 8 cubs. El generador només demana sumar alçades visibles; no hi ha reconstrucció de cap vista. |
| `coordenades:6` | N2 | N1 | Si A=(-4;2) i B=(4;2), el punt mig és (0;2): es fa la mitjana de les x i es manté la y comuna. El generador limita els segments a una línia horitzontal o vertical. |
| `modelitzacio:3` | N3 | N2 | Amb ombra de 8 m, l’alçada de la torre és 6 m; amb base del cable a 8 m, la longitud és √(6²+8²)=10 m. Amb ombra de 16 m s’obté alçada 12 m i cable 20 m. El context encadena semblança i Pitàgores explícits, però no imposa restriccions o justificació no immediates. |
| `visual3d:8` | N3 | N3 provisional | Les tres vistes restringeixen simultàniament les posicions i les altures. Mantenir només si els quatre distractors requereixen realment comparar-les totes i no hi ha una pista que resolgui la resposta sola. |

Això deixaria una proposta de **40 N1 / 29 N2 / 1 N3** entre tipus únics; l’alternativa d’escala de `modelitzacio:10` continua essent una branca addicional a N1. No s’ha aplicat cap canvi als nivells de producció.

**Varietat a revisar:** `coordenades:7` genera sempre desplaçaments 3 i 4 unitats (en ordre i signes variables), de manera que la resposta sempre és 5. El procediment N2 (Pitàgores sobre les diferències de coordenades) és adient, però la varietat numèrica actual és feble. `modelitzacio:3` només tria tres paquets fixos, amb resultats 10, 15 o 20 m. Per tant, les 3.000 generacions registrades no són 3.000 enunciats diferents ni evidència de varietat ampla.

### Registres existents de cobertura i examen

El fitxer `resultats-punt3-2eso-espacial.json` conté aquesta simulació prèvia:

| Tema ordinari | Mostres generades | Cobertura N1/N2/N3 | Selecció examen N1/N2/N3 |
|---|---:|---:|---:|
| Semblança | 3.000 | 6/5/0 | 6/6/0 |
| Tales i escales | 3.000 | 5/5/0 | 6/6/0 |
| Pitàgores | 3.000 | 5/5/0 | 6/6/0 |
| Cossos | 3.000 | 10/0/0 | 12/0/0 |
| Visualització 3D | 3.000 | 2/6/1 | 3/6/3 |
| Coordenades | 3.000 | 7/3/0 | 7/5/0 |
| Modelització | 3.000 | 3/7/1 | 3/7/2 |

El mateix registre dona una selecció global equilibrada de 20 preguntes (7/7/6) i una selecció només N1 (20/0/0); les polítiques només N2 o només N3 apareixen bloquejades. Aquests són resultats del simulador existent, no validació visual dels modes guiat/autònom/examen. `banksReviewed: 0` i `bankChecks: []` indiquen que no es van revisar bancs d’exercicis; `pageErrors: []` només vol dir que aquella passada automatitzada no va registrar errors de pàgina.

## Evidència de proves disponible i límits

La lectura del codi confirma que els set generadors cobreixen els codis ordinaris 1–11 / 1–10 / 1–10 / 1–10 / 1–9 / 1–10 / 1–10. La classificació s’aplica des de `REVIEWED_LEVELS`; `REVIEWED_VARIANTS` només afegeix una branca específica per al tipus 10 de modelització (escala, N1). Les etiquetes locals `easy/medium/hard` dels generadors no substitueixen el mapa N1/N2/N3.

El resum existent registra **3.000 mostres generades per tema** i recompte de cobertura/examen. Això és evidència de generació simulada, no una revisió pedagògica de 3.000 exercicis únics. El mateix resum informa `banksReviewed: 0`, `bankChecks: []` i `pageErrors: []`; per tant, encara no acredita una passada de bancs ni una comprovació visual al navegador. Aquest document no executa proves noves ni modifica el comportament de l’aplicació.

La passada documental d’aquesta PR ja completa els passos 1–3: inventari i variants reals, decisions d’agrupació amb exemples resolts, errors i límits i contrast curricular. També revisa estàticament guiat i autònom i reutilitza la simulació d’examen existent. Abans de considerar el bloc validat en producció encara cal una validació visual al navegador i la revisió docent final. Per tant, la proposta continua sent provisional i no s’ha de copiar al registre oficial de famílies.


## Tancament de l’auditoria documental

La comparació cobreix els **70 tipus ordinaris**. Les famílies agrupen procediments equivalents; compartir fórmula o context no basta per fusionar tasques. Aquesta és una proposta pedagògica documental, no una validació de producció.

### Mapa tipus → família i decisions

| Bloc | Tipus i família | Nivell proposat | Decisió |
|---|---|---|---|
| Semblança | 1,8 → S1; 2,3 → S2; 4,9 → S3; 5 → S4; 6 → S5; 7 → S6; 10 → S7; 11 → S8 | S1 N1/N2; S2 N1; S3 N2; S4 N2; S5 N1; S6 fora seqüència bàsica/revisar; S7 N2; S8 N2 | 1/8 variants de classificació; 2/3 mateixa raó en sentit invers; 4/9 variants de costat homòleg; 5 comprovació de dues raons és diferent; 6, 7, 10, 11 tasques diferents. |
| Tales i escales | 1,2 → T1; 3,4,5,6,10 → T2; 7,8 → T3; 9 → T4 | T1 N2; T2 N1/N2; T3 N2; T4 N2 | 1/2 i 7/8 variants; 3–6 conversió d’escala amb direcció/unitats diferents; 10 és transferència del mateix factor a un segon costat; 9 és una mesura indirecta per semblança. |
| Pitàgores | 1→P1; 2→P2; 3→P3; 4→P4; 5→P5; 6,10→P6; 7→P7; 8→P8; 9→P9 | N1: 1,2,3,6; N2: 4,5,7,8,9,10 | 6/10 mateixa diagonal rectangular; resta de tasques separades per habilitat: àrees, identificar hipotenusa, trobar hipotenusa/catet, recíproca, quadrat, contextos, isòsceles. |
| Cossos | 1→C1; 2→C2; 3→C3; 4→C4; 5→C5; 6→C6; 7→C7; 8→C8; 9→C9; 10→C10 | N1 provisional, tots | Tasques diferents segons propietat: poliedre/cos rodó, classificar prisma/piràmide, comptar elements, reconèixer definicions, base de cilindre/con, propietats d’esfera i reconstrucció inversa de base. No fusionar per ser preguntes de classificació. |
| Visualització 3D | 1→V1; 2→V2; 3→V3; 4,5→V4; 6→V5; 7→V6; 8→V7; 9→V8 | N1: 3,6; N2: 1,2,4,5,7,9; N3 provisional: 8 | 4/5 variants de projecció; les altres són procediments diferents (plegar, oposada, comptar, petjada, completar, combinar tres vistes, secció). |
| Coordenades | 1→K1; 2→K2; 3→K3; 4→K4; 5→K5; 6→K6; 7→K7; 8→K8; 9→K9; 10→K10 | N1: 1,2,5,6,9; N2: 3,4,7,8,10; proposat K6 N1 | Tasques diferents: llegir coordenades/quadrant, classificar figura, completar vèrtex, distància axial, punt mig axial, distància euclidiana, tipus de recta, tendència i pertinença. |
| Modelització | 1→M1; 2→M2; 3→M3; 4→M4; 5→M5; 6→M6; 7→M7; 8→M8; 9→M9; 10→M10a/b/c | N1 proposat: 2,6,9,10a; N2: 1,4,5,7,8,10b/c; N2 proposat: 3 | M10 amaga tres tasques diferents (escala, formular Pitàgores, formular proporció); M2 comparteix procediment amb S7; M5 amb V6; M9 amb K8. Les connexions contextuals no creen una família nova. |

Els quatre canvis candidats ja descrits (M2, V3 i K6 a N1; M3 a N2) donen 40 N1 / 29 N2 / 1 N3 per tipus únic. Si es compten les branques de M10 per separat, se n’afegeixen dues a N2 i una a N1. No s’ha canviat cap nivell de producció.

### Fitxes de famílies

Cada parell d’exemples mostra el procediment complet amb nombres triats; no pretén afirmar que tots els valors s’hagin generat en el banc.

#### Semblança

| Família i tipus | Exemples resolts | Errors típics i casos límit |
|---|---|---|
| S1. Classificar figures (1,8), variant de representació | 3×4 i 6×8: k=2, semblants no congruents. 3×4 i 3×5: raons 1 i 1,25, no semblants. | Error: confondre forma i mida o aparellar costats no homòlegs. k=1 implica congruència. |
| S2. Raó i sentit (2,3), mateixa família | 4→10: 10/4=2,5. 10→4: 4/10=0,4. | Error: invertir el quocient. Dir sempre quina figura és origen/destinació; ampliació k>1 i reducció 0<k<1. |
| S3. Costat homòleg desconegut (4,9), variant rectangle/triangle | 4→6 amb k=1,5; costat 6→9. Triangle 5→10, costat 7→14. | Error: sumar o restar en lloc d’aplicar k. Cal correspondència inequívoca; el dibuix no garanteix correspondència per posició. |
| S4. Comprovar dues raons (5), tasca diferent de S1 | 2×3 i 4×6: raons 2 i 2, sí. 2×3 i 4×7: 2 i 7/3, no. | Error: comprovar només una parella o usar àrea. Una parella coincident no basta. |
| S5. Angle corresponent (6) | A↔D i A=42°: D=42°. E↔B i E=70°: B=70°. | Error: multiplicar l’angle per k. La correspondència ha d’estar indicada; els angles no s’escalegen. |
| S6. Congruència amb moviments (7) | Gir de 90° d’un quadrat de costat 3: continua congruent. Translació d’un triangle 3-4-5: conserva forma i mida. | Error: creure que canviar posició canvia mida. XTEC situa moviments sistemàtics a 3r: mantenir en quarantena o reformular com a intuïció de congruència per 2n. |
| S7. Perímetre semblant (10; també M2) | P=18, k=2 → 36. P=26, k=1,5 → 39. | Error: multiplicar per k². Només longituds i perímetres escalen linealment; àrea no. |
| S8. Semblança 3D (11) | 2×3×4→4×6×8: tres raons 2, sí. 2×3×4→4×6×9: tercera raó 2,25, no. | Error: verificar només dues dimensions. L’ordre declarat de dimensions és rellevant; una reorientació física pot reordenar-les. |

#### Tales i escales

| Família i tipus | Exemples resolts | Errors típics i casos límit |
|---|---|---|
| T1. Segments amb paral·leles (1,2), variant segons incògnita | AD=3, AB=9, AE=4: AC=12. AD/AB=2/5 i AC=15: AE=6. | Error: barrejar segments petit/gran o no homòlegs. Depèn de paral·lelisme i triangles semblants; figura no necessàriament a escala. |
| T2. Escala i unitats (3–6,10), variants de conversió | Escala 1:200, 4 cm → 800 cm=8 m. 1:25.000, 6 cm → 150.000 cm=1,5 km. | Errors: invertir factor o convertir amb 10/100/1.000 erroni. Escriure unitats a cada pas. T10 reutilitza el mateix factor per a un costat segon. |
| T3. Ombres (7,8), mateixa proporció | Pal 1,5 m/ombra 2 m; arbre ombra 8 m → altura 6 m. Pal 2 m/ombra 1,5 m; edifici 8 m → ombra 6 m. | Error: invertir altura/ombra. Només val amb condicions i inclinació dels raigs iguals. |
| T4. Mesura inaccessible (9), semblança en context | Costat 3 m→9 m, altre 4 m→12 m. Costat 5→20, altre 2,5→10 m. | Error: fer diferències en lloc de multiplicar. La correspondència declarada és essencial; el dibuix no està necessàriament a escala. |

#### Pitàgores

| Família i tipus | Exemples resolts | Errors típics i casos límit |
|---|---|---|
| P1. Relació d’àrees (1) | Catets 3 cm i 4 cm: els quadrats sobre els catets tenen àrees 9 cm² i 16 cm²; el quadrat sobre la hipotenusa té àrea 25 cm², de manera que la hipotenusa fa 5 cm. Si falten les àrees 9 cm² i 25 cm², l’altra àrea és 16 cm². | Confondre costat i àrea; la unitat demanada és cm² i no cal arrel. |
| P2. Identificar hipotenusa (2) | Angle recte a A: hipotenusa BC. Angle recte a R: hipotenusa PQ. | Error: triar el costat que sembla inclinat. El dibuix pot no estar a escala; mana l’angle recte. |
| P3. Trobar hipotenusa (3) | Catets 3,4: c=√25=5. Catets 5,12: c=13. | Error: sumar catets sense quadrats o oblidar l’arrel. Si no és exacta, cal indicar forma/arrodoniment. |
| P4. Trobar catet (4) | c=13, b=5: a=√(169−25)=12. c=10, b=6: a=8. | Error: sumar o fer √(c²−b). La hipotenusa sempre és el costat més llarg. |
| P5. Recíproca (5) | 3,4,5: 9+16=25, rectangle. 3,4,6: 25≠36, no rectangle. | Error: no ordenar costats o comparar costats en lloc de quadrats. Comprovar també desigualtat triangular. |
| P6. Diagonal rectangular (6,10), mateixa família | Rectangle 6×8: d=10. Cara 5×12: d=13. | Error: calcular perímetre/àrea. A capsa només compta la cara indicada. |
| P7. Diagonal del quadrat (7), variant de P6 | Costat 5: d=√50≈7,1. Costat 10: d=√200≈14,1. | Error: usar 2s. Arrodonir només al final a una dècima com demana l’enunciat. |
| P8. Contextos de triangle rectangle (8), variants contextuals | Escala 13 m i altura 5: base 12 m. Rampa amb catets 5 i 12: llargada 13 m. | Errors: no dibuixar triangle o confondre catet/hipotenusa. Inclou escala, rampa, cable i tirant, amb incògnita directa o inversa; no tractar-los com a quatre famílies. |
| P9. Altura d’isòsceles (9), procediment propi | Base 10, costat igual 13: meitat 5; h=12. Base 16, costat 10: meitat 8; h=6. | Error: no partir base en dos. Cal costat igual ≥ meitat de la base; si no, no hi ha triangle no degenerat. |

#### Cossos

| Família i tipus | Exemples resolts | Errors típics i casos límit |
|---|---|---|
| C1. Poliedre/cos rodó (1) | Cub → poliedre. Cilindre → cos rodó. | Classificar només per aparença; con té base plana i superfície corba, però és cos rodó. |
| C2. Prisma i base (2) | Base pentagonal → prisma pentagonal. Base triangular → prisma triangular. | Comptar cares laterals com a costats de base. Dues bases iguals i paral·leles. |
| C3. Piràmide i base (3) | Base quadrada → piràmide quadrangular. Base hexagonal → hexagonal. | Anomenar-la pel total de cares. Té una base i cares laterals que es troben en un vèrtex. |
| C4. Comptar prisma (4) | Prisma triangular: 5 cares, 9 arestes, 6 vèrtexs. Quadrangular: 6,12,8. | No usar fórmula de piràmide; n-gonal: cares n+2, arestes 3n, vèrtexs 2n. |
| C5. Comptar piràmide (5) | Piràmide quadrangular: 5 cares, 8 arestes, 5 vèrtexs. Pentagonal: 6,10,6. | Afegir dues bases. Per base n-gonal: cares n+1, arestes 2n, vèrtexs n+1. |
| C6. Reconèixer definició (6) | Dues bases iguals paral·leles → prisma. Una base i cares triangulars → piràmide. | No confondre forma base i tipus; les definicions són generals. |
| C7. Base del cilindre (7) | Cilindre dret: cercle a cada extrem. Cilindre més alt: bases encara circulars. | La perspectiva les dibuixa el·líptiques; geomètricament són cercles. |
| C8. Base del con (8) | Con circular → una base circular. Con estret → base encara circular. | L’àpex no és una base; separar base i superfície lateral. |
| C9. Esfera (9) | Esfera: sense cares planes, arestes ni vèrtexs. Pilota idealitzada: superfície corba contínua. | No inventar base/vèrtex; distingir esfera sòlida de circumferència. |
| C10. Inferir base pel nombre de cares (10) | Prisma de 7 cares: n=7−2=5, pentàgon. Piràmide de 6 cares: n=6−1=5, pentàgon. | Error: restar el nombre incorrecte de bases. És pas invers però aritmètica directa; cal llegir si és prisma o piràmide. |

#### Visualització 3D

| Família i tipus | Exemples resolts | Errors típics i casos límit |
|---|---|---|
| V1. Validar xarxa (1) | Sis quadrats ben disposats, sense solapament, poden formar cub. Sis quadrats en una sola tira no tanquen correctament el cub. | No n’hi ha prou amb comptar sis cares; verificar plegat i solapament. |
| V2. Cara oposada (2) | En xarxa amb una cara central i quatre al voltant, plegar: cares en costats oposats del centre són oposades. En una tira de quatre, primera i tercera queden oposades. | Rotar la xarxa mantenint adjacències; l’etiqueta concreta depèn del dibuix, així que la solució del banc s’ha de validar visualment. |
| V3. Comptar cubs (3) | Columnes 1,2,3 → 6 cubs. Columnes 2,2,1,1 → 6. | Comptar només cubs davanters o multiplicar alçades; cubs ocults a sota compten. N1 proposat perquè és suma directa. |
| V4. Llegir projecció (4,5), variants davant/costat | Alçades frontals 2,1,3 → seqüència 2-1-3. Màxims laterals per profunditat 1,3 → 1-3. | Confondre amplada i fons o la direcció de mirada. A la versió auditada, el tipus 5 demanava costat dret però el peu deia DAVANT. La contradicció es va corregir a la PR #61 (peu `COSTAT DRET`); això no equival a validació visual completa de l’ítem. |
| V5. Petjada superior (6) | 3×2 amb una posició buida → 5 caselles. Petjada 2×3 tota ocupada → 6. | Comptar cubs/alçades en lloc de posicions ocupades; alçada no canvia petjada. |
| V6. Completar prisma (7; també M5) | Prisma 3×2×3 conté 18; n’hi ha 11 → afegir 7. Prisma 2×2×4 conté 16; n’hi ha 13 → afegir 3. | Donar total en lloc de diferència; el generador imposa almenys dos cubs absents. |
| V7. Combinar tres vistes (8) | Restriccions de columnes 1,2,1,3 sumen 7: descartar qualsevol candidat que no doni aquesta projecció. Un altre cas 2,1,2,2 suma 7 i s’ha de contrastar també amb vista lateral i superior. | Ignorar una vista; verificar que cap pista sola no reveli la resposta. N3 provisional només si la combinació és imprescindible. |
| V8. Secció/base (9) | Tall paral·lel a base triangular → triangle. Tall paral·lel a base circular de cilindre → cercle. | Barrejar vista lateral amb secció. El generador barreja seccions i bases; conservar família comuna només amb enunciat inequívoc. |

#### Coordenades

| Família i tipus | Exemples resolts | Errors típics i casos límit |
|---|---|---|
| K1. Llegir coordenades (1) | 3 a la dreta, 2 amunt → (3;2). 4 esquerra,1 avall → (−4;−1). | Intercanviar x/y i signes; llegir eixos abans de marcar punt. |
| K2. Quadrant (2) | (−2;3) és II. (4;−1) és IV. | Comptar des de dalt a la dreta sense convenció. Punt sobre eix no és en cap quadrant; el generador l’ha d’evitar o tractar. |
| K3. Classificar figura (3) | (0,0),(4,0),(4,3),(0,3): rectangle. (0,0),(3,0),(0,3): triangle rectangle. | Confondre rectangle amb quadrat; “més específica” exigeix comparar longituds. |
| K4. Quart vèrtex (4) | A(−2,1),B(3,1),C(3,4) consecutius → D(−2,4). A(0,−1),B(4,−1),C(4,2) → D(0,2). | Copiar x de B o y d’A; val amb vèrtexs consecutius en l’ordre indicat. |
| K5. Distància axial (5) | (−3,2) a (4,2) → 7. (−1,−2) a (−1,5) → 7. | Diferència amb signe; distància no negativa i només canvia una coordenada. |
| K6. Punt mig axial (6) | Entre (−4,2) i (4,2) → (0,2). Entre (3,−5) i (3,1) → (3,−2). | Oblidar dividir per dos o canviar coordenada comuna; generador força segment horitzontal/vertical i valors enters. Reclassificació a N1 proposada. |
| K7. Distància euclidiana (7) | Desplaçaments 3,4 → 5. Desplaçaments 5,12 → 13. | Sumar catets en lloc de Pitàgores. El generador real només produeix desplaçaments 3/4 i resposta 5: varietat feble, tot i que el procediment és N2. |
| K8. Tipus de funció en gràfic (8) | y=3 constant. y=2x lineal. y=2x+1 afí. | Dir “lineal” a qualsevol recta inclinada; convenció: lineal passa per origen. |
| K9. Tendència (9) | Pendent positiva: augmenta. Negativa: disminueix. | Llegir de dreta a esquerra; pendent zero significa constant. |
| K10. Pertinença a recta (10) | y=x+1: (2,3) sí, (2,4) no. y=−x+2: (1,1) sí, (1,2) no. | Intercanviar x/y o només comprovar abscissa; gràfic requereix eixos i escala llegibles. |

#### Modelització

| Família i tipus | Exemples resolts | Errors típics i casos límit |
|---|---|---|
| M1. Escala i diagonal (1) | Plànol 3×4, escala 1:100: diagonal 5 cm, real 5 m. 5×12, 1:200: diagonal 13 cm, real 26 m. | Barrejar escala i Pitàgores/unitats; si la diagonal no és exacta, arrodonir explícitament. |
| M2. Perímetre ampliat (2; S7 equivalent) | Rectangle 4×6, k=2: P ampliat=40. 3×5, k=3: P=48. | Multiplicar per k²; és la mateixa família de perímetre semblant S7, no una família nova. |
| M3. Ombres i cable (3) | Pal 1,5/2, torre ombra 8: alçada 6; ancoratge 8: cable 10. Amb ombra de torre 16: alçada 12; cable 20. | Fer Pitàgores abans de trobar alçada; confondre ombra amb base del cable. Només tres paquets de resultats (10,15,20), variabilitat limitada; dos models explícits, per això N2 proposat. |
| M4. Estalvi en trajecte (4) | Catets 3,4: recorregut 7, recte 5, estalvi 2. Catets 5,12: recorregut 17, recte 13, estalvi 4. | Respondre la distància directa en lloc de l’estalvi; en general la hipotenusa no és entera. |
| M5. Completar prisma (5; V6 equivalent) | Capacitat 18, n’hi ha 12: falten 6. Capacitat 12, n’hi ha 9: falten 3. | Comptar només buits d’una capa; mateix procediment que V6, el context no crea família nova. |
| M6. Escollir eina (6) | Mesurar arbre per ombres → semblança/Tales. Plànol 1:500 → escala. | Selecció per paraula clau; han d’existir dades que facin una eina principal inequívoca. |
| M7. Perímetre real per coordenades/escala (7) | Rectangle 3×4 unitats i 10 m/unitat: 14×10=140 m. Rectangle 2×5 i 20 m/unitat: 14×20=280 m. | Aplicar escala a coordenades absolutes o confondre àrea i perímetre; primer trobar diferències entre coordenades. |
| M8. Volum de cubs (8) | 6 cubs d’aresta 2: 6×8=48 cm³. 5 cubs d’aresta 3: 5×27=135 cm³. | Usar cm² o multiplicar aresta per nombre; cal comptar cubs inclosos els ocults. |
| M9. Funció contextual (9; variant de K8) | Altura fixa 3 m → constant. Rampa des de nivell 0 amb pujada regular → lineal; cable que parteix de 2 m → afí. | “Canvi regular” no implica passar per origen; mateixa classificació que K8, variant de context. |
| M10a. Formular escala (tipus 10, branca escala) | Escala 1:200: real=plànol×200. Plànol 3 cm: realitat 600 cm abans de convertir. | Invertir el factor o oblidar unitats; variant de T2, nivell N1 proposat. |
| M10b. Formular Pitàgores (tipus 10, branca escala) | Escala 10, altura 8: x²+8²=10². Cable 13, catet 5: x²+5²=13². | Posar hipotenusa com a catet; formular equació és N2. |
| M10c. Formular proporció (tipus 10, branca ombres) | Pal 1,5/ombra 2, arbre ombra 8: x/8=1,5/2. Pal 2/ombra 3, arbre ombra 9: x/9=2/3. | Barrejar ordre o comparar altura amb altura i ombra amb ombra; variant de T3, nivell N2. |

### Modes i evidència: què queda verificat

- **Guiat:** revisió estàtica del codi: nivell 1 mostra les pistes i el generador inclou camps guide/solution. No s’ha recorregut visualment cada pantalla ni validat la qualitat de cada pista al DOM.
- **Autònom:** revisió estàtica: el mode de resposta oberta oculta opcions i mostra entrada i pista. La lògica intenta fins a 40 generacions si un tipus no admet resposta oberta; els registres previs mostren 49/56 tipus oberts i 7/56 només amb opcions. No s’ha fet una sessió nova ni provat les respostes d’un alumne.
- **Examen:** simulació prèvia registrada: seleccions globals de 20 preguntes amb repartiment N1/N2/N3 de 7/7/6; N2 o N3 exclusius bloquejats. No s’ha recorregut el DOM d’examen en navegador.
- **Generació:** 3.000 mostres registrades per tema; no equivalen a 3.000 exercicis únics. banksReviewed=0 i bankChecks=[]; pageErrors=[] no acrediten correcció visual. El validador estàtic comprova quatre opcions diferents, correcta inclosa, metadades, pistes i solució.
- No s’han creat workflows ni executat proves noves. Queda acreditada la lectura documental, l’inspecció estàtica del codi i la interpretació dels registres previs; no queda acreditada la validació interactiva visual.

### Incidències i tancament

La contradicció de `visual3d:5` es va corregir a la PR #61 (el peu ara indica costat dret); no s’ha fet una validació visual completa del banc. La varietat numèrica de `coordenades:7` i `modelitzacio:3` continua sent limitada. En aquesta PR no s’han aplicat canvis a generadors, nivells actius o `families-validades.json`.

La passada documental queda completa: 70/70 tipus mapejats, decisions d’agrupació, proposta curricular de nivells i fitxa per família amb dos exemples resolts, errors típics i límits. La PR resta oberta i llesta per a revisió, sense fusió ni publicació. La correcció funcional de `visual3d:5` es va completar a la PR #61; la validació docent i la revisió visual completa no s’han acreditat en aquesta auditoria.
