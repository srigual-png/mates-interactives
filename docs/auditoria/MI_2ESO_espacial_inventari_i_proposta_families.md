# 2n ESO · Sentit espacial — inventari i primera proposta d’agrupació

> **Estat: provisional.** Aquest document prepara la revisió pedagògica del bloc. No valida famílies, no modifica els generadors, els nivells publicats ni `families-validades.json`. La revisió s’ha fet sobre `main` al commit `086d7b725db59ebb99266352e84ef8d9470a7d17`.

## Abast i fonts

S’inclouen els set temes ordinaris de `2eso/sentit-espacial.html`: semblança, Tales i escales, Pitàgores, cossos, visualització 3D, coordenades i modelització. S’exclouen els quatre temes etiquetats com a ampliació de 3r (`pitagores3r`, `semblanca3r`, `transformacions3r` i `transformacionsAv3r`).

Fonts del repositori: `2eso/sentit-espacial.html`, `docs/dificultats/revisio-2eso-espacial-punt3.json` i `docs/dificultats/resultats-punt3-2eso-espacial.json`. Referència curricular consultada: [XTEC — Orientacions curriculars de Matemàtiques per cursos (PDF)](https://xtec.gencat.cat/web/.content/curriculum/eso/concrecions-curriculars/Orientacions-curriculars_MAT_SEC_per-cursos.pdf), apartat **2n ESO, sentit espacial**, p. 12 i visualització, p. 13 (consulta del 17-11-2026). La pàgina [Concrecions curriculars](https://xtec.gencat.cat/ca/curriculum/eso/concrecions-curriculars/) identifica aquest document com a concreció oficial.

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

**Incidència funcional detectada:** a `visual3d:5`, l’enunciat pregunta per la vista des del costat dret i el càlcul usa la projecció lateral, però la figura afegeix el peu “mirada des del DAVANT”. És una contradicció de l’ajuda visual que pot confondre l’alumne. S’ha de corregir en una PR funcional abans de donar per validat aquest exercici; no s’ha canviat el codi en aquesta PR documental. És un defecte concret detectat en revisar els generadors, no una deducció del recompte de mostres.

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

Abans de considerar el bloc complet cal:
1. inspeccionar els generadors i variants reals i vincular 70/70 tipus amb preguntes, respostes, modes i els nivells configurats;
2. decidir mantenir/reclassificar/fusionar/separar cada família candidata amb almenys dos exercicis reals resolts, errors típics i casos límit;
3. contrastar cada decisió amb la seqüenciació XTEC específica de 2n;
4. comprovar modes guiat, autònom i examen, així com opcions/resposta oberta, i fer una validació visual;
5. demanar revisió docent final. Fins aleshores, aquesta proposta és provisional i no s’ha de copiar al registre oficial de famílies.
