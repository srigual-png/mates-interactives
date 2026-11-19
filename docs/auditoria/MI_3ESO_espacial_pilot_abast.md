# Pilot 3r ESO — Sentit espacial

## Abast i estat

Auditoria documental dels **8 temes ordinaris (80 tipus)** de `3eso/sentit-espacial.html`. Les ampliacions A–D (40 tipus) queden excloses. Branca de treball separada de `main`; PR en Draft, sense fusió ni publicació. No es canvien generadors, nivells de producció ni `families-validades.json`.

S’han contrastat el codi actual de cada generador, `docs/dificultats/revisio-3eso-espacial-punt3.json` i `docs/dificultats/resultats-punt3-3eso-espacial.json`. Les mostres prèvies es reutilitzen; no s’han repetit proves.

## Referent curricular i criteri de nivell

Les orientacions oficials de la Generalitat per a 3r ESO en Sentit espacial expliciten moviments i transformacions (translació, gir i simetria, elements que els defineixen), recobriments del pla i ús d’eines manipulatives/dinàmiques. Les homotècies apareixen com a saber de 4t. Vegeu [Orientacions curriculars de Matemàtiques per cursos (XTEC, 3r ESO)](https://xtec.gencat.cat/web/.content/curriculum/eso/concrecions-curriculars/Orientacions-curriculars_MAT_SEC_per-cursos.pdf) i [per sentits](https://xtec.gencat.cat/web/.content/curriculum/eso/concrecions-curriculars/Orientacions-curriculars_MAT_SEC_per-sentits.pdf).

N1/N2 són una seqüenciació didàctica interna: N1 per aplicació, lectura o reconeixement directe amb una regla; N2 per inversió menys transparent, centre/eix no nul, composició ordenada, comparació de condicions o descomposició. No s’assigna N3 per completar una quota. El currículum de 3r no dona cobertura equivalent a tot el contingut dels temes “Geometria i àlgebra” i “Visualització i modelització”: es marquen com a contingut algebraic/funcional connectat, no com a saber espacial nuclear; cal decidir-ne l’encaix abans d’adoptar canvis.

## Inventari actual i proposta

Comptes de nivells llegits de `REVIEWED_LEVELS["3eso/espacial"]`; la proposta no s’ha escrit al codi.

| Tema | Tipus | Actiu N1/N2/N3 | Proposta N1/N2/N3 |
|---|---:|---:|---:|
| Translacions | 10 | 8/2/0 | 8/2/0 |
| Girs | 10 | 8/2/0 | 7/3/0 |
| Simetria axial | 10 | 6/4/0 | 6/4/0 |
| Simetria central i composicions | 10 | 3/7/0 | 4/6/0 |
| Mosaics i recobriments | 10 | 9/1/0 | 9/1/0 |
| Transformacions i coordenades | 10 | 8/2/0 | 8/2/0 |
| Geometria i àlgebra | 10 | 10/0/0 | 6/4/0 |
| Visualització i modelització | 10 | 10/0/0 | 6/4/0 |
| **Total** | **80** | **62/18/0** | **54/26/0** |

La revisió prèvia registra 3.000 o més generacions per tema i mostres d’examen: translacions 8/4/0; girs 8/4/0; simetria axial 6/6/0; central 5/7/0; mosaics 11/1/0; transformacions-coordinate 8/4/0; geoàlgebra 12/0/0; visualització 12/0/0. Són recomptes d’instàncies, no nombres de famílies. L’examen distribueix més preguntes que els deu tipus i pot repetir branques.

## Mapa complet tipus → família candidata

“Variant” indica el mateix nucli amb una representació, sentit o context diferent. “Tasca diferent” indica que el resultat demanat o el procediment final canvia. Els codis de família són locals i candidats, no entrades oficials validades.

| Tema | Família candidata i tipus | Relació interna | N proposat |
|---|---|---|---:|
| Translacions | TR1: 1, 2, 3, 4, 5, 6, 8 | Mateixa família; vector, punt imatge/preimatge, regla i vector oposat són variants | N1 |
|  | TR2: 7 | Tasca diferent: iterar el vector | N2 |
|  | TR3: 9 | Tasca diferent: propietat invariant | N1 |
|  | TR4: 10 | Tasca diferent: comprovar si dues correspondències comparteixen vector | N2 |
| Girs | GI1: 1, 2, 3, 4, 6 | Mateixa família: aplicar/invertir gir centrat a l’origen, amb angle i sentit variants | N1 |
|  | GI2: 5 | Variant inversa de GI1: identificar el gir | N1 |
|  | GI3: 7 | Tasca diferent: composició de girs | N2 |
|  | GI4: 8 | Tasca diferent: recuperar el centre com a punt mig | N2 |
|  | GI5: 9 | Variant de GI1 amb centre desplaçat | N2 |
|  | GI6: 10 | Tasca diferent: propietats invariants | N1 |
| Simetria axial | AX1: 1, 2, 7 | Mateixa família: reflexió respecte dels eixos coordenats, inclòs un vèrtex d’una figura | N1 |
|  | AX2: 3, 4 | Variants amb eix coordenat desplaçat | N2 |
|  | AX3: 5, 6 | Mateixa família: reconstruir l’eix com a mediatriu | N2 |
|  | AX4: 8, 9, 10 | Tasques diferents de propietats: punt fix, nombre d’eixos, propietats conservades | N1 |
| Simetria central | CE1: 1, 3, 4 | Mateixa família: regla d’origen, centre de dos punts i equivalència amb mitja volta | N1 |
|  | CE2: 2 | Variant amb centre no nul | N2 |
|  | CE3: 5, 6, 7, 8, 9, 10 | Família de composicions; ordre i moviments intermedis són variants, no sis famílies | N2 |
| Mosaics | MO1: 1, 2, 3, 6, 7, 8, 10 | Mateixa família: reconèixer i justificar si els angles omplen 360°; polígons/angles són variants | N1 |
|  | MO2: 4 | Variant: trobar l’angle que falta per tancar 360° | N1 |
|  | MO3: 5 | Tasca diferent: triar una configuració mixta de polígons | N2 |
|  | MO4: 9 | Tasca de translació d’un motiu; variant transversal de TR1, no família nova | N1 |
| Transformacions i coordenades | TC1: 1, 2, 3, 4, 5, 7, 9 | Mateixa família: reconèixer, aplicar o invertir una sola regla; tipus de moviment són variants | N1 |
|  | TC2: 8 | Tasca diferent: classificar si la regla és una isometria | N1 |
|  | TC3: 6, 10 | Mateixa família: compondre regles en ordre; 2 o 3 passos són variants | N2 |
| Geometria i àlgebra | GA1: 1, 2, 10 | Mateixa família: traduir un model d’àrea o producte a expressió/desenvolupament | N1 |
|  | GA2: 3, 4, 5, 9 | Família de factorització; trinomis, diferència de quadrats, factor comú i quadrat perfecte són procediments emparentats però no intercanviables | N2 |
|  | GA3: 6 | Tasca diferent: completar una identitat notable | N1 |
|  | GA4: 7 | Variant aplicada: substituir el valor de x en una àrea | N1 |
|  | GA5: 8 | Tasca diferent: expressar un perímetre algebraic | N1 |
| Visualització i modelització | VI1: 1, 10 | Mateixa família: llegir/interpretrar la intersecció de dues rectes | N1 |
|  | VI2: 2, 3 | Mateixa família amb resultats diferents: classificar un sistema de rectes com a únic o sense solució | N2 |
|  | VI3: 4, 5, 9 | Mateixa família: nombres figurats i successions explícites, amb triangular/quadrada/lineal com a variants | N1 |
|  | VI4: 6 | Tasca diferent: comprovar si un punt satisfà y=x² per substitució | N1 |
|  | VI5: 7, 8 | Família de lectura de gràfiques no lineals; eix de paràbola i punt d’hipèrbola són tasques variants, nivell N2 | N2 |

## Exemples resolts, errors i casos límit per família

### TR1 — Translació directa/inversa (1, 2, 3, 4, 5, 6, 8)
- **Exemples:** A(-3,2)→A′(1,0): v=(1−(-3),0−2)=(4,-2). Si P′=(2,5) i v=(-3,1), P=(2−(-3),5−1)=(5,4).
- **Errors:** invertir final−inicial; sumar el vector en una preimatge; perdre signes.
- **Límits:** vector zero és identitat; primer component horitzontal i segon vertical; comprovar que tots els vèrtexs comparteixen el mateix vector.

### TR2 — Iterar translació (7)
- **Exemples:** P=(0,0), v=(2,-1), 3 passos → (6,-3). Amb P=(1,4), v=(-1,2), 2 passos → (-1,8).
- **Errors:** aplicar el vector només una vegada o canviar signe.
- **Límits:** nombre de passos zero dona el punt inicial; el punt final pot sortir del rang del dibuix encara que el càlcul sigui correcte.

### TR3 — Invariants (9)
- **Exemples:** una translació conserva 5 cm de longitud; conserva també angles de 60° i l’àrea de la figura.
- **Errors:** confondre conservar orientació amb conservar posició.
- **Límits:** no conserva les coordenades ni la distància a l’origen en general.

### TR4 — Verificar mateix moviment (10)
- **Exemples:** A(1,2)→A′(3,1) i B(-2,0)→B′(0,-1) donen v=(2,-1) totes dues: sí. Si B′=(1,-1), el segon vector és (3,-1): no.
- **Errors:** comparar punts finals sense restar les coordenades inicials.
- **Límits:** dos punts amb vectors iguals són compatibles amb una mateixa translació; no cal reconstruir la figura sencera.

### GI1/GI2 — Gir a l’origen i gir invers (1–6)
- **Exemples:** 90° antihorari: (2,1)→(-1,2); 270° antihorari equival a 90° horari: (2,1)→(1,-2). Per a 180°, (−3,4)→(3,−4).
- **Errors:** confondre sentit horari/antihorari; aplicar la regla del gir a un punt sense centrar-lo a O.
- **Límits:** 0°/360° és identitat; recuperar l’angle pot tenir equivalències modulars; no s’ha d’acceptar un sentit si el sistema en demana un altre sense indicar equivalència.

### GI3/GI4/GI5 — Composició o centre (7–9)
- **Exemples:** quatre girs de 90° antihoraris retornen el punt inicial; A(4,2) amb centre C(1,1) a 180° dona A′=(-2,0). Si A=(3,1), A′=(1,5), el centre és el punt mig C=(2,3).
- **Errors:** sumar angles sense modular 360°; girar al voltant de l’origen quan el centre és C; donar el doble del vector en lloc del punt mig.
- **Límits:** dos girs amb centres diferents no són automàticament un gir igual; s’ha d’usar el cas concret que demana el tipus.

### GI6 — Invariants del gir (10)
- **Exemples:** un segment de 4 cm continua fent 4 cm; un angle de 35° continua fent 35°.
- **Errors:** marcar la posició o l’orientació com a invariant.
- **Límits:** una rotació pot canviar l’orientació de la figura en el pla? La transformació manté l’orientació cíclica; el que no conserva és la posició.

### AX1/AX2 — Reflexió en eix coordinat o desplaçat (1–4,7)
- **Exemples:** respecte d’X, (−2,3)→(−2,−3); respecte de x=1, (4,2)→(−2,2), ja que la distància horitzontal 3 es replica a l’altre costat.
- **Errors:** canviar la coordenada paral·lela a l’eix; reflectir respecte de l’origen en lloc d’una recta.
- **Límits:** un punt sobre l’eix queda fix; en x=k, x′=2k−x; verificar equidistància perpendicular.

### AX3 — Recuperar l’eix (5,6)
- **Exemples:** A(-3,1), A′(1,1) → eix x=(-3+1)/2=-1. B(-1,4), B′(-1,-2) → eix y=(4-2)/2=1.
- **Errors:** usar la suma sense dividir per 2; triar la direcció equivocada.
- **Límits:** coordenades iguals impliquen eix perpendicular pel punt mig en l’altra direcció; punts coincidents no determinen un únic eix.

### AX4 — Propietats i eixos de simetria (8–10)
- **Exemples:** sobre x=1, els punts (1,0) i (1,5) queden fixos; un triangle equilàter té 3 eixos i un escalè 0.
- **Errors:** confondre eix de simetria d’una figura amb eix de coordenades; creure que la reflexió conserva l’orientació.
- **Límits:** una simetria axial conserva distàncies, angles i àrea, però inverteix l’orientació; només els punts de l’eix són fixos.

### CE1/CE2 — Simetria central i centre (1–4)
- **Exemples:** respecte O, (−2,3)→(2,−3); A=(0,−4), A′=(−4,0) → C=(-2,-2). Amb C=(1,2) i P=(3,1), P′=(-1,3).
- **Errors:** confondre central amb axial; oblidar que C és el punt mig PP′.
- **Límits:** centre O dona (x,y)→(-x,-y); central equival a gir de 180° i no a un gir de 90°.

### CE3 — Composicions (5–10)
- **Exemples:** reflectir primer en X i després Y equival a (x,y)→(-x,-y), central a O; dues centrals C₁=(1,0), C₂=(3,0) equivalen a translació de vector (4,0) (ordre dels centres defineix el vector).
- **Errors:** ignorar l’ordre; tractar una simetria axial com si fos central; sumar regles sense aplicar-les seqüencialment.
- **Límits:** dues reflexions paral·leles donen translació, dues que es tallen donen gir; només es pot generalitzar després d’identificar eixos/centres i ordre.

### MO1/MO2 — Tancament angular i mosaics regulars (1–4,6–8,10)
- **Exemples:** 6 triangles equilàters: 6·60°=360°, sí; 3 pentàgons regulars: 3·108°=324°, buit de 36°, no.
- **Errors:** comprovar només que el polígon és regular; acceptar una suma aproximada com si fos exacta.
- **Límits:** per un polígon regular que recobreix sol, 360°/angle interior ha de ser enter; mosaics semiregulars poden tenir més d’un angle, però no es dedueixen amb el criteri d’un sol polígon.

### MO3/MO4 — Configuració mixta / trasllat del motiu (5,9)
- **Exemples:** 120°+60°+90° necessita 90° per tancar; si el motiu es repeteix 2 unitats a l’esquerra, v=(-2,0).
- **Errors:** sumar 360° com si fos un angle pla de 180°; assignar signe positiu al moviment cap a l’esquerra.
- **Límits:** la suma angular tanca un vèrtex però no prova per si sola que una peça completa cobreixi el pla; el vector descriu només la translació entre motius.

### TC1/TC2 — Regla única i isometria (1–5,7–9)
- **Exemples:** (x,y)→(x−1,y+2) a P=(3,−1) dona (2,1); si la imatge és (4,−2) per (x,y)→(−x,y), la preimatge és (−4,−2).
- **Errors:** aplicar les regles en el sentit invers; confondre canvi de signe d’una coordenada amb translació.
- **Límits:** una regla és isometria si preserva distàncies per a tots els punts; una ampliació per 2 no ho és.

### TC3 — Composar regles (6,10)
- **Exemples:** P=(1,2), reflecteix en Y → (−1,2), després trasllada (+2,+3) → (1,5); P=(0,2), gir antihorari 90° → (−2,0), trasllada (−1,−2) → (−3,−2), reflecteix en X → (−3,2).
- **Errors:** fer els passos en ordre invers o aplicar cada regla al punt inicial.
- **Límits:** les composicions no commuten en general; escriure cada resultat intermedi evita errors.

### GA1/GA3 — Àrees, desenvolupament i identitats (1,2,6,10)
- **Exemples:** costat x+2 d’un quadrat: àrea (x+2)²=x²+4x+4; (x+2)(x+6)=x²+8x+12. Per (x+8)², el terme del mig és 16x.
- **Errors:** ometre els dos rectangles creuats; usar 8x en lloc de 16x.
- **Límits:** una longitud algebraica ha de ser positiva en el context geomètric; l’expressió expandida i la factorizada poden ser equivalents però demanen formats diferents.

### GA2 — Factorització (3,4,5,9)
- **Exemples:** x²+6x+5=(x+1)(x+5); x²−9=(x−3)(x+3). Model 5x+20=5(x+4); x²+10x+25=(x+5)².
- **Errors:** factoritzar x²+6x+5 com producte de termes amb suma incorrecta; oblidar que diferència de quadrats és suma per diferència.
- **Límits:** no tots els trinomis monics tenen factors enters; factor comú és pas previ si existeix.

### GA4/GA5 — Substitució i perímetre (7,8)
- **Exemples:** rectangle (x+3)(x+5), x=4 → 7·9=63; costats x+4 i x+3 → perímetre 2(x+4)+2(x+3)=4x+14.
- **Errors:** substituir x abans d’escriure correctament l’expressió; sumar només dos costats en un perímetre.
- **Límits:** distingir unitats lineals del perímetre i unitats quadrades de l’àrea.

### VI1/VI2 — Interseccions i sistemes (1–3,10)
- **Exemples:** rectes y=2x+1 i y=−x+4: 2x+1=−x+4 → x=1, y=3; y=3x−9 i y=−x+3: 4x=12 → intersecció (3,0); y=3x−2 i y=3x−5 són paral·leles i no tenen solució.
- **Errors:** confondre el tall amb els interceptes; dir “cap solució” quan les rectes són coincidents.
- **Límits:** rectes coincidents tenen infinites solucions; el punt d’intersecció representa el parell que compleix ambdues relacions.

### VI3 — Nombres figurats i successions (4,5,9)
- **Exemples:** 7è triangular = 7·8/2=28; quadrats, figura 3 = 3²=9; f(n)=2n+2, figura 10 =22.
- **Errors:** confondre la posició n amb el nombre d’elements; aplicar n(n+1)/2 a quadrats.
- **Límits:** si l’enunciat dona només una imatge sense regla explícita, cal inferir el patró; aquí el tipus 9 ja dona f(n), per tant és substitució directa, no descobriment de regla.

### VI4/VI5 — Gràfiques quadràtiques/recíproques (6–8)
- **Exemples:** (−2,4) pertany a y=x² perquè 4=(−2)²; vèrtex (3,0) implica eix x=3; (2,2) pertany a y=4/x perquè 2=4/2.
- **Errors:** oblidar que x² sempre és no negatiu; posar l’eix de simetria com y=3; dividir per x=0 en y=k/x.
- **Límits:** y=k/x no està definida a x=0; y=x² amb vèrtex a l’origen és un model particular, i el tipus 7 generalitza només l’eix, no tota l’equació. La pertinença a una gràfica exigeix substituir coordenades, no jutjar visualment.

## Deduplicació entre temes

| Relació | Decisió |
|---|---|
| `translacions:1–8`, `transformacionsCoord:1–5,7` i `mosaics:9` | Nucli compartit de translació/vector; les tasques de mosaics i de regla analítica són variants contextuals. No comptar-les com famílies noves de translació. |
| `girs:1–6`, `transformacionsCoord:1,9` i `simetriaCentral:1,4` | Regles analítiques relacionades; gir 180° i simetria central són la mateixa transformació puntual en O, però identificar, aplicar i justificar propietats són tasques/variants separades. |
| `simetriaAxial` i `transformacionsCoord:5,7` | Reflexió de coordenades compartida; tipus de lectura puntual com a variants, no duplicitat exacta d’objectiu. |
| `simetriaCentral:5–10` i `transformacionsCoord:6,10` | Composició ordenada de regles; variants amb sistemes de notació/context. Comptar una sola família transversal de composició quan es consolidi el catàleg. |
| `mosaics:9` i `translacions:8` | Mateixa operació de vector de desplaçament, aplicada a motius repetits. |
| `geoAlgebra` i `visualitzacio:4,5,9` | Connexió algebraica per expressions/successions, però tasques diferents: factoritzar/desenvolupar vs obtenir un terme d’una regla figurada. |
| `geoAlgebra` i resta de transformacions | No són la mateixa família; la connexió visual/geomètrica és un context, no equivalència de procediment final. |

## Buits, encaix curricular i propostes noves

- No es detecta un buit genuí en els procediments de translació, gir, simetries o tancament angular dels vuit blocs. No cal afegir exercicis per inflar N3.
- El registre previ marca buits de cobertura alta; són buits de **dificultat**, no prova que falti un procediment curricular essencial.
- **Geoàlgebra (80% de les branques) i visualització (100%)** tenen procediments d’àlgebra, sistemes, successions i funcions. Són continguts matemàtics potencialment pertinents al curs, però la justificació no prové del saber específic de Sentit espacial de 3r citat. Recomanació: conservar-los com a contingut connectat amb Sentit algebraic/relacions funcionals i revisar l’arquitectura curricular abans d’adoptar nivells.
- La regla d’eix i centre desplaçats, la composició i la classificació de sistemes són escalons N2 legítims; no cal crear contextos artificials N3.
- No s’han proposat nous generadors.

## Modes i evidència disponible

- **Estàtica — guiat:** els generadors retornen `guide` i `solution`; el mode guiat presenta ajuda. S’ha inspeccionat el flux comú i mostres representatives dels 80 tipus. Això no verifica visualment cada combinació ni la qualitat pedagògica de cada pista.
- **Estàtica — autònom:** el nivell N2 amaga pistes respecte de N1; el codi etiqueta els tipus. Un nivell actiu no és evidència que la dificultat estigui ben calibrada.
- **Resposta oberta:** el codi combina `allowOpen` per branca; hi ha branques només d’opcions i els temes d’geoàlgebra/visualització tenen format d’opcions predeterminat. No s’ha d’afirmar que els 80 tipus admeten resposta oberta.
- **Estàtica — examen:** els vuit temes ordinaris tenen `exam3r:true`; ampliacions A–D, `exam3r:false`. Els resultats previs contenen plans d’examen per als vuit temes ordinaris.
- **Simulació durant aquesta auditoria:** no feta.
- **Validació visual amb navegador:** no feta.
- **Mostres prèvies:** generacions de 3.000–4.218 segons tema; evidència de generació i cobertura, no d’UI ni de correcció pedagògica. No s’han tornat a executar.

## Estat final

- 80/80 tipus ordinaris revisats contra les branques actuals i el registre previ.
- Mapa tipus→família candidat, decisions mateixa/variant/diferent, propostes N1/N2, exemples resolts, errors i límits documentats.
- Proposta global: 54 N1, 26 N2, 0 N3; cap canvi aplicat a la configuració de producció.
- Cap generador, nivell actiu, registre oficial ni workflow modificat; cap prova nova executada.
- PR en Draft i sense fusió ni publicació. Les famílies continuen candidates fins a validació docent i eventual adopció.
