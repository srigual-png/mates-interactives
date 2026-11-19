# Auditoria independent de 4t d’ESO — 19-11-2026

## Dictamen executiu

He contrastat de nou els cinc sentits de 4t amb els HTML i generadors actuals, el mapa de nivells actiu, els registres de revisió i mostres desades, i les orientacions curriculars oficials de la Generalitat. No he pres els informes previs com a prova suficient: alguns es contradiuen sobre si els blocs de 4t estaven pendents o ja tancats.

**Resultat:** el cens de tipus, el mapa de famílies i els nivells tècnics són coherents. L’auditoria va detectar una discrepància curricular a estocàstica; en aquesta branca he promogut a contingut ordinari les taules de contingència, la correlació i la probabilitat condicionada. Bayes amb taxes base continua com a ampliació. Les dues entrades N3 de mesura són variants d’una mateixa família i compten com una sola família alta.

La comparació tipus → família dels 624 tipus és a [mapa-tipus-familia-4eso-20261119.md](mapa-tipus-familia-4eso-20261119.md). El canvi altera l’accés als tres temes estocàstics i la seva inclusió al Mode Examen; conserva els generadors, els tipus d’exercici i els nivells actius.

## Abast i recompte

He llegit les cinc pàgines de 4t, el mapa compartit de nivells i els deu fitxers de revisió/resultats. S’han contrastat els àmbits curriculars amb [les orientacions de Matemàtiques d’ESO per cursos (XTEC, 4t)](https://xtec.gencat.cat/web/.content/curriculum/eso/concrecions-curriculars/Orientacions-curriculars_MAT_SEC_per-cursos.pdf).

| Sentit | Temes ordinaris / ampliacions | Tipus ordinaris | Tipus d’ampliació | N1 / N2 / N3 ordinaris | N1 / N2 / N3 ampliació |
| --- | ---: | ---: | ---: | ---: | ---: |
| Numèric | 8 / 4 | 80 | 40 | 59 / 21 / 0 | 36 / 4 / 0 |
| Mesura | 8 / 4 | 88 | 44 | 63 / 24 / 1 | 30 / 13 / 1 |
| Algebraic | 8 / 4 | 89 | 40 | 52 / 37 / 0 | 26 / 14 / 0 |
| Espacial | 8 / 4 | 81 | 42 | 60 / 21 / 0 | 29 / 13 / 0 |
| Estocàstic | 11 / 1 | 110 | 10 | 69 / 41 / 0 | 3 / 7 / 0 |
| **Total** | **43 / 17** | **448** | **176** | **303 / 144 / 1** | **124 / 51 / 1** |

Cada identificador tema/tipus és un registre tècnic, no una família pedagògica independent. Per tant, 624 tipus no vol dir 624 procediments diferents.

## Comprovació de coherència tècnica

- Els registres contenen 624 parelles tema/tipus i 60 temes.
- El mapa actiu de `assets/js/dificultat-mi.js` coincideix amb el nivell registrat per a tots els 624 tipus: **0 discrepàncies** en aquesta comparació.
- Les mostres de resultats cobreixen tots els tipus enumerats, sense buits ni duplicats en els números de tipus; **0 discrepàncies** amb els recomptes dels registres.
- Les mostres desades indiquen 3.000 generacions per tema a numèric, mesura i algebraic, i 1.000 a espacial i estocàstic. Són dades ja existents; no les he tornat a generar.
- La coincidència entre registres i mapa actiu confirma consistència tècnica, però no demostra que la classificació pedagògica sigui adequada.

## Dictamen per sentit

### Sentit numèric

Els vuit temes ordinaris cobreixen conjunts reals, irracionals i recta, intervals, errors, operacions, comptatge, triangle de Pascal i educació financera. L’orientació curricular de 4t inclou aquests continguts. Les ampliacions de radicals i exponents fraccionaris, logaritmes i propietats combinatòries s’ajusten al marcatge d’ampliació de les orientacions.

El repartiment 59 N1 / 21 N2 / 0 N3 no és, per si sol, una errada. Els procediments directes i les aplicacions amb pocs passos no s’han de pujar de nivell només per completar una quota. Tanmateix, no hi ha ara cap família N3 al sentit numèric; si l’objectiu és practicar una progressió fins a N3, cal detectar un procediment de planificació o validació realment diferent abans de crear exercicis.

**Dictamen:** alineació curricular general correcta; cobertura de N3 pendent d’una anàlisi de buits, sense forçar-la.

### Sentit de la mesura

Els temes ordinaris cobreixen angles i radians, Pitàgores, semblança, raons trigonomètriques, resolució de triangles, mesures indirectes i precisió/error. Són continguts presents a les orientacions de 4t.

Les entrades `mesuresIndirectes4t:type 10` i `modelitzacioAmpD:type 2` descriuen el mateix procediment: dues observacions separades, dues distàncies desconegudes, dues relacions trigonomètriques i eliminació d’una incògnita per trobar una altura. Canvia el context i la posició relativa dels punts, però no la família de resolució. La classificació N3 pot ser defensable per la modelització simultània, però s’ha de comptar com **una sola família N3 amb variants**, no com dues famílies.

**Dictamen:** alineació curricular general correcta; depurar el recompte de famílies N3 i comprovar si el procediment té prou varietat de contextos.

### Sentit algebraic

Els temes ordinaris cobreixen patrons, equacions de segon grau, sistemes, inequacions, representacions de funcions, funcions lineals/quadràtiques i exponencials, i anàlisi de funcions. Les ampliacions de polinomis, equacions avançades, paràmetres i sistemes d’inequacions s’han de mantenir separades del nucli quan requereixen contingut marcat com a ampliació a les orientacions.

No he trobat cap discrepància de recompte entre tipus, mostres i mapa actiu. L’absència de N3 és coherent amb no convertir automàticament una fórmula coneguda o un enunciat més llarg en una tasca d’alta dificultat. El mapa encara necessita una revisió familiar més fina abans de considerar adoptada qualsevol redistribució.

**Dictamen:** sense discrepància estructural detectada; N3 i varietat de famílies continuen oberts.

### Sentit espacial

Els temes ordinaris inclouen figures, vectors, components, operacions, coordenades, homotècies, lectura de funcions i regions. Les equacions de rectes i la seva posició relativa apareixen com a ampliacions, d’acord amb l’etiqueta [AMP] de les orientacions; alguns d’aquests continguts s’ofereixen a l’itinerari B. Cal conservar explícita aquesta diferència d’itinerari i no presentar-la com una mancança comuna a tot 4t.

La distribució és 60 N1 / 21 N2 / 0 N3 al nucli i 29 / 13 / 0 a les ampliacions. No és justificable crear N3 només per completar una proporció. Sí que queda pendent decidir, amb la matriu A/B al davant, quins temes són optatius per itinerari i quins formen part de cada pràctica o examen.

**Dictamen:** alineació general plausible; cal mantenir visibles els itineraris A/B i la manca actual de famílies N3.

### Sentit estocàstic — canvi curricular aplicat a la branca

Les orientacions oficials de 4t inclouen la interpretació de distribucions bidimensionals, les taules de contingència, els núvols de punts i la regressió lineal, el concepte i la utilitat de (r), l’anàlisi de correlació/regressió/causalitat i la probabilitat d’esdeveniments tenint en compte la independència o incompatibilitat. No anomenen explícitament la fórmula de probabilitat condicionada; incloure’n la lectura bàsica des de taules de contingència és una inferència curricular. Els càlculs formals més avançats i Bayes amb taxes base continuen fora de l’adopció ordinària.

La versió anterior presentava `contingenciaBatx4t`, `correlacioBatx4t` i `condicionadaBatx4t` com a ampliacions excloses del progrés obligatori i de l’examen. A la branca d’aquesta PR, els he convertit en els blocs ordinaris 9–11:
- **Bloc 9 · Taules de contingència:** freqüències conjuntes/marginals i percentatges sobre el total, la fila o la columna. Es conserven 7 N1 i 3 N2.
- **Bloc 10 · Correlació i relació entre variables:** interpretació de signe/intensitat de (r), no-linealitat, valors atípics i correlació vs causalitat. Es conserven 6 N1 i 4 N2.
- **Bloc 11 · Probabilitat condicionada i independència:** lectura de (P(A\mid B)), canvi de denominador i independència/dependència. Es conserven 5 N1 i 5 N2.

Els tres blocs ara compten en el progrés obligatori i es poden seleccionar al Mode Examen. **No s’han canviat els generadors, els 30 tipus d’exercici ni cap nivell.** La validació integrada ha detectat que `correlacioBatx4t` només ofereix quatre tipus diferents de nivell N2 amb enunciat fix; per mantenir 12 preguntes sense duplicar-les, el seu pla d’examen queda en 8 N1 / 4 N2 / 0 N3. És una quota de l’examen, no un canvi de nivell ni una incorporació de N3. Els blocs de Bayes amb taxa base i falsos positius continuen opcionals; els exercicis simples de monedes, daus i assaigs que hi apareixen se solapen amb les famílies ordinàries i no compten com a famílies noves.

La promoció és de contingut, no de dificultat: el mapa de 4t continua sense N3 a numèric, algebraic, espacial i estocàstic; no s’han apujat nivells per completar quotes.
## Famílies i dificultat

- No hi ha famílies N3 als sentits numèric, algebraic, espacial ni estocàstic amb el mapa actual.
- A mesura hi ha dues entrades N3 que són una sola família de modelització de dues observacions.
- La manca de N3 no s’ha d’omplir apujant operacions rutinàries, augmentant valors o allargant enunciats. Si es creen tasques, han d’introduir una decisió estratègica, una representació a coordinar o una reconstrucció no present a N1/N2.
- El mapa de famílies s’adopta com a classificació de treball segons la matriu següent, amb els ajustos procedimentals descrits més avall; l’adopció de nous nivells actius és una fase posterior. Aquest informe no canvia les etiquetes actives.

## Matriu d’adopció acordada després de la revisió crítica

La revisió crítica adopta el mapa de famílies com a classificació de treball i les fronteres curriculars següents. **No adopta cap canvi de nivell actiu N1/N2/N3**: la reassignació queda per a una fase posterior, després de revisar els exemples de les famílies mixtes. S’accepta que una família contingui variants N1 i N2 quan la demanda procedimental canvia; compartir família no obliga a compartir nivell.

| Sentit | Decisió adoptada | Límits i pendents |
| --- | --- | --- |
| Numèric | Mantenir la frontera entre nucli i ampliacions i el mapa de famílies. | Conservar els nivells actuals (59 N1 / 21 N2 / 0 N3); no crear N3 per quota. |
| Mesura | Adoptar el mapa de famílies i comptar `mesuresIndirectes4t:type 10` i `modelitzacioAmpD:type 2` com una família N3 amb variants. | La segona entrada és ampliació; mantenir una sola família N3 ordinària. |
| Algebraic | Mantenir la frontera curricular ordinari/ampliació i el mapa com a classificació de treball. | Conservar els nivells (52 / 37 / 0); revisar les famílies mixtes abans de proposar reassignacions. |
| Espacial | Mantenir vectors i homotècies al nucli i rectes/posició relativa com a ampliació, d’acord amb les orientacions. | Conservar els nivells (60 / 21 / 0); aclarir la matriu d’itineraris A/B per a pràctica i examen. |
| Estocàstic | Adoptar al nucli els blocs de contingència, correlació/regressió i probabilitat bàsica amb dependència/independència. Bayes amb taxes base continua com a ampliació. | Conservar els nivells (69 / 41 / 0). La lectura de probabilitat condicionada des de taules és una inferència curricular limitada; no s’hi inclouen tècniques avançades de Bayes. |

Les fronteres relatives a taules de contingència, distribucions bidimensionals, regressió/correlació, probabilitat i itineraris d’ampliació s’han contrastat amb les orientacions oficials. La classificació de la probabilitat condicionada bàsica com a ordinària és una interpretació del seu encaix amb taules i dependència/independència, no una formulació explícita del document curricular.

## Contrast procedimental de famílies mixtes

S’han contrastat estàticament els enunciats i les resolucions dels tipus que formen les famílies mixtes amb els generadors actuals. La conclusió és que una diferència de nivell només s’ha de justificar quan canvia el procediment, els passos o les decisions necessàries; un context o una representació nova, per si sols, no fan pujar el nivell.

El contrast ha afinat quatre agrupacions del mapa de famílies:

| Tema | Ajust de classificació documentat |
| --- | --- |
| Precisió i error | `precisioError4t:type 8` comunica una diagonal arrodonida amb una precisió coherent amb les dades d’entrada. Es separa de `type 10`, que sí que propaga l’error màxim de les dimensions al perímetre. |
| Espai mostral | `espaiMostralRecompte4t:type 3–4` aplica la regla de Laplace; `type 9` planifica una estimació experimental amb freqüència relativa. Es documenten com a tasques diferents, no com una progressió dins d’una sola família. |
| Representacions de funcions | A `funcionsRep4t`, els tipus 7 i 12 identifiquen una família a partir d’una taula; el tipus 9 construeix/selecciona un model afí contextual a partir de quota i cost per sessió. Es documenten en famílies separades. |
| Anàlisi de funcions | A `analisiFunc4t`, el tipus 1 interpreta creixement/decreixement d’una expressió i el tipus 7 identifica un model a partir d’una taula. Són procediments diferents, no nivells successius d’una família d’identificació exponencial. |
| Núvols de punts | A `nuvolsRelacio4t`, el tipus 8 anticipa una associació plausible a partir del context sense observar dades. Se separa de la lectura de direcció a partir d’un núvol. |

Els exemples de progressió procedimental que es mantenen com a plausibles inclouen el càlcul de l’interès simple abans de trobar el capital final, aplicar la fórmula d’arc en radians abans d’afegir-hi una conversió de graus, i passar de substituir un valor en una recta d’ajust a calcular el canvi de predicció entre dos valors de x. Són justificacions de treball, no una adopció dels nivells.

Aquests ajustos són **documentals**. No alteren les etiquetes N1/N2/N3, els generadors, la selecció de preguntes ni les suites de proves. El nombre de famílies dels temes afectats s’ha de llegir segons el mapa revisat, no segons una agrupació anterior més àmplia.

## Evidències i límits dels modes

| Tipus de revisió | Què queda verificat en aquesta passada |
| --- | --- |
| Estàtica | Pàgines, generadors declarats, recompte de tipus, registres de dificultat i concordança amb el mapa actiu: sí. |
| Mostres i simulació | S’han llegit les mostres i metadades ja desades als JSON. S’hi ha afegit una simulació de pràctica amb Playwright; no s’han tornat a generar grans lots de mostres. |
| Pràctica | La pàgina no té selectors separats anomenats «guiat» i «autònom». S’han simulat els dos formats disponibles (4 opcions i resposta oberta), les pistes disponibles i la correcció pas a pas després d’un error: 154 comprovacions als 11 blocs. Les pistes s’han mostrat en 22 casos i s’ha verificat resposta oberta real en 8 casos; els exercicis que no admeten resposta oberta mantenen les opcions. |
| Examen | Simulació amb Playwright dels 11 blocs ordinaris, 12 preguntes per tema en Matemàtiques A i B, lliurament, puntuació, reinici i retorn a pràctica. |
| Validació responsive i visual | S’han capturat i revisat manualment 44 pantalles: 11 blocs × 2 formats seleccionats × escriptori i mòbil. No s’hi veu cap desbordament horitzontal, retall de taules/gràfics ni control de resposta inaccessible. Observacions menors: alguns títols llargs s’abreugen amb punts suspensius a la barra de navegació mòbil, i el teclat matemàtic ocupa dues files quan no hi cap en una. |
| GitHub Actions | La passada integrada [#44514295009](https://github.com/srigual-png/mates-interactives/actions/runs/44514295009) ha passat amb simulació, captures i analítica. L’[artefacte de captures](https://github.com/srigual-png/mates-interactives/actions/runs/44514295009/artifacts/14523354091) es conserva tres dies. També havien passat la sintaxi inline JS [#44496515346](https://github.com/srigual-png/mates-interactives/actions/runs/44496515346) i la validació de 2n [#44496515419](https://github.com/srigual-png/mates-interactives/actions/runs/44496515419), activada perquè es va tocar el fitxer compartit de dificultats. Després s’ha limitat el disparador de 2n als fitxers del seu àmbit. |

Els informes previs no es consideren revalidats per defecte. La suite confirma generadors, exàmens i fluxos de pràctica. Les captures dels 11 blocs s’han revisat en escriptori i mòbil; les dues observacions visuals anotades no impedeixen respondre ni llegir els exercicis.

## Estat i següents passos

1. La promoció curricular, les simulacions i la revisió visual de les captures estan completades. No s’han aplicat retocs visuals perquè els controls continuen accessibles i el contingut es llegeix sense desbordaments.
2. El pla d’examen de correlació és 8 N1 / 4 N2 / 0 N3 perquè els seus quatre tipus N2 tenen enunciat fix. Cap etiqueta de nivell dels exercicis no s’ha alterat.
3. El workflow numèric de 2n ara s’activa només amb canvis als seus fitxers pertinents; canvis documentals o d’altres sentits no l’activen.

**A la branca de la PR #66 s’han actualitzat l’accés a progrés/examen, les pàgines de teoria, la documentació, els checks de 4t i el pla de composició de l’examen de correlació. No s’ha modificat cap generador ni nivell actiu o el registre oficial. El mapa cobreix 624 tipus sense omissions ni IDs duplicats. La PR continua Draft, oberta i sense fusionar.**
