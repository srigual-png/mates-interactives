# Auditoria independent de 4t d’ESO — 19-11-2026

## Dictamen executiu

He contrastat de nou els cinc sentits de 4t amb els HTML i generadors actuals, el mapa de nivells actiu, els registres de revisió i mostres desades, i les orientacions curriculars oficials de la Generalitat. No he pres els informes previs com a prova suficient: alguns es contradiuen sobre si els blocs de 4t estaven pendents o ja tancats.

**Resultat:** el cens de tipus, el mapa de famílies i els nivells tècnics són coherents. L’auditoria va detectar una discrepància curricular a estocàstica; en aquesta branca he promogut a contingut ordinari les taules de contingència, la correlació i la probabilitat condicionada. Bayes amb taxes base continua com a ampliació. Les dues entrades N3 de mesura són variants d’una mateixa família i compten com una sola família alta. Després del contrast procedimental, s’han aplicat a la branca dues reassignacions a `patrons4t`: el tipus 2 passa a N1 i el tipus 10 a N2.

La comparació tipus → família dels 624 tipus és a [mapa-tipus-familia-4eso-20261119.md](mapa-tipus-familia-4eso-20261119.md). El canvi curricular estocàstic altera l’accés als tres temes i la seva inclusió al Mode Examen; conserva els generadors, els tipus d’exercici i els nivells estocàstics. Les dues reassignacions algebraiques de `patrons4t` s’expliquen més avall.

## Abast i recompte

He llegit les cinc pàgines de 4t, el mapa compartit de nivells i els deu fitxers de revisió/resultats. S’han contrastat els àmbits curriculars amb [les orientacions de Matemàtiques d’ESO per cursos (XTEC, 4t)](https://xtec.gencat.cat/web/.content/curriculum/eso/concrecions-curriculars/Orientacions-curriculars_MAT_SEC_per-cursos.pdf).

| Sentit | Temes ordinaris / ampliacions | Tipus ordinaris | Tipus d’ampliació | N1 / N2 / N3 ordinaris | N1 / N2 / N3 ampliació |
| --- | ---: | ---: | ---: | ---: | ---: |
| Numèric | 8 / 4 | 80 | 40 | 59 / 21 / 0 | 36 / 4 / 0 |
| Mesura | 8 / 4 | 88 | 44 | 63 / 24 / 1 | 30 / 13 / 1 |
| Algebraic | 8 / 4 | 89 | 40 | 53 / 36 / 0 | 26 / 14 / 0 |
| Espacial | 8 / 4 | 81 | 42 | 60 / 21 / 0 | 29 / 13 / 0 |
| Estocàstic | 11 / 1 | 110 | 10 | 69 / 41 / 0 | 3 / 7 / 0 |
| **Total** | **43 / 17** | **448** | **176** | **304 / 143 / 1** | **124 / 51 / 1** |

Cada identificador tema/tipus és un registre tècnic, no una família pedagògica independent. Per tant, 624 tipus no vol dir 624 procediments diferents.

## Comprovació de coherència tècnica

- Els registres contenen 624 parelles tema/tipus i 60 temes.
- El mapa actiu de `assets/js/dificultat-mi.js` coincideix amb el nivell registrat per a tots els 624 tipus: **0 discrepàncies** en aquesta comparació.
- Les mostres de resultats cobreixen tots els tipus enumerats, sense buits ni duplicats en els números de tipus; **0 discrepàncies** amb els recomptes dels registres.
- Les mostres desades indiquen 3.000 generacions per tema a numèric, mesura i algebraic, i 1.000 a espacial i estocàstic. Són dades ja existents; no les he tornat a generar.
- La coincidència entre registres i mapa actiu confirma consistència tècnica, però no demostra que la classificació pedagògica sigui adequada.

## Dictamen per sentit

### Sentit numèric

Els vuit temes ordinaris cobreixen conjunts reals, irracionals i recta, intervals, errors, operacions, comptatge, triangle de Pascal i educació financera. Les orientacions de 4t inclouen aquests sabers i demanen analitzar mètodes per resoldre situacions financeres reals amb augments, disminucions, interessos i taxes. El full de càlcul per simular compromisos financers apareix com a [AMP]. Les ampliacions de radicals i exponents fraccionaris, logaritmes i propietats combinatòries també es mantenen separades del nucli.

El repartiment actiu continua en 59 N1 / 21 N2 / 0 N3. No proposo apujar exercicis existents per quota. El contrast dels procediments sí que ha trobat un buit específic dins l’educació financera:

| Proposta | Procediment absent | Nivell proposat | Encaix i límit |
| --- | --- | --- | --- |
| financera4t:type 11 — comparació de productes a termini | Calcular el resultat net de dues opcions amb models d’interès diferents i una comissió; comparar-les sobre el mateix capital i termini i justificar la decisió. Els tipus actuals tracten separadament interès simple, creixement compost i comissió, o comparen només una comissió percentual amb una de fixa. | **N3**, com a nova família F7 de decisió financera integrada. No s’aplica encara al mapa ni al generador. | S’ajusta a l’anàlisi de problemes reals d’interessos i taxes. Es pot resoldre a mà amb pocs períodes; no requereix simulació en full de càlcul, que les orientacions marquen [AMP]. |

**Exemple resolt de la proposta:** invertir 1.200 € durant 3 anys. Opció A: interès simple del 3,5% anual, sense comissió. Opció B: interès compost del 3,4% anual i comissió inicial de 8 €. A dona 1.200 · (1 + 0,035 · 3) = **1.326 €**. B dona 1.200 · 1,034³ − 8 ≈ **1.318,61 €**. Per tant, A acaba amb **7,39 € més**.

La demanda N3 és triar i comparar models sobre una mateixa base, no l’extensió de l’enunciat. Errors típics: tractar l’interès compost com a simple, aplicar la comissió al final com si fos un percentatge, comparar només les taxes o oblidar que els terminis han de coincidir. El cas límit és un capital únic i un termini explícit, sense aportacions periòdiques, impostos, inflació ni amortització de préstecs.

**Dictamen:** no hi ha cap N3 actual al sentit numèric. Hi ha una mancança curricularment defensable d’exercicis de decisió financera que coordinin procediments ja introduïts. Recomano crear aquesta família N3; fins que s’adopti, els nivells actius continuen 59 / 21 / 0.

### Sentit de la mesura

Els temes ordinaris cobreixen angles i radians, Pitàgores, semblança, raons trigonomètriques, resolució de triangles, mesures indirectes i precisió/error. Són continguts presents a les orientacions de 4t.

Les entrades `mesuresIndirectes4t:type 10` i `modelitzacioAmpD:type 2` descriuen el mateix procediment: dues observacions separades, dues distàncies desconegudes, dues relacions trigonomètriques i eliminació d’una incògnita per trobar una altura. Canvia el context i la posició relativa dels punts, però no la família de resolució. La classificació N3 pot ser defensable per la modelització simultània, però s’ha de comptar com **una sola família N3 amb variants**, no com dues famílies.

**Dictamen:** alineació curricular general correcta; depurar el recompte de famílies N3 i comprovar si el procediment té prou varietat de contextos.

### Sentit algebraic

Els temes ordinaris cobreixen patrons, equacions de segon grau, sistemes, inequacions, representacions de funcions, funcions lineals/quadràtiques i exponencials, i anàlisi de funcions. Les ampliacions de polinomis, equacions avançades, paràmetres i sistemes d’inequacions s’han de mantenir separades del nucli quan requereixen contingut marcat com a ampliació a les orientacions.

No he trobat cap discrepància de recompte entre tipus, mostres i mapa actiu. L’absència de N3 és coherent amb no convertir automàticament una fórmula coneguda o un enunciat més llarg en una tasca d’alta dificultat. Després de revisar les famílies mixtes, s’han aplicat dues reassignacions a la branca: `patrons4t:type 2` N2→N1 i `patrons4t:type 10` N1→N2. La resta de nivells es mantenen.

**Dictamen:** sense discrepància estructural detectada; N3 i varietat de famílies continuen oberts.

### Sentit espacial

Els vuit blocs comuns cobreixen figures, vectors, components, operacions, coordenades, homotècies, lectura geomètrica de funcions i regions. Les orientacions marquen [AMP] quatre sabers sobre rectes: formes d’equació i selecció; elements determinants d’una recta; posició relativa de dues rectes. A la pràctica s’organitzen en tres blocs interns (A–C).

| Itinerari | Contingut obligatori del projecte | Fora del recorregut obligatori |
| --- | --- | --- |
| Matemàtiques A | Els 8 blocs comuns A/B. | Els blocs interns A–C de rectes es poden treballar opcionalment; D és aprofundiment opcional. |
| Matemàtiques B | Els 8 blocs comuns + A–C: equacions de rectes, elements d’una recta i posició relativa. Aquests tres blocs entren a la progressió i al selector d’examen B. | D: problemes integrats de geometria analítica, com a repte de preparació per a Batxillerat. |

Aquesta distribució A/B és una decisió d’organització del projecte, no una assignació literal de les orientacions XTEC: la font marca els sabers de rectes com a [AMP] però no els reparteix explícitament entre les opcions A i B. El bloc D coordina punts, vectors i rectes en problemes integrats; el mantenim opcional perquè les orientacions no el defineixen com un saber separat.

La distribució de nivells continua sent 60 N1 / 21 N2 / 0 N3 al nucli comú i 29 / 13 / 0 als blocs [AMP]. A–C es compten dins els 42 tipus [AMP] encara que siguin obligatoris a l’itinerari B; D resta opcional. No és justificable crear N3 només per completar una proporció.

**Dictamen:** alineació plausible; la matriu d’itineraris queda resolta per al projecte i els nivells de les dues opcions es mantenen visibles.

### Sentit estocàstic — canvi curricular aplicat a la branca

Les orientacions oficials de 4t inclouen la interpretació de distribucions bidimensionals, les taules de contingència, els núvols de punts i la regressió lineal, el concepte i la utilitat de (r), l’anàlisi de correlació/regressió/causalitat i la probabilitat d’esdeveniments tenint en compte la independència o incompatibilitat. No anomenen explícitament la fórmula de probabilitat condicionada; incloure’n la lectura bàsica des de taules de contingència és una inferència curricular. Els càlculs formals més avançats i Bayes amb taxes base continuen fora de l’adopció ordinària.

La versió anterior presentava `contingenciaBatx4t`, `correlacioBatx4t` i `condicionadaBatx4t` com a ampliacions excloses del progrés obligatori i de l’examen. A la branca d’aquesta PR, els he convertit en els blocs ordinaris 9–11:
- **Bloc 9 · Taules de contingència:** freqüències conjuntes/marginals i percentatges sobre el total, la fila o la columna. Es conserven 7 N1 i 3 N2.
- **Bloc 10 · Correlació i relació entre variables:** interpretació de signe/intensitat de (r), no-linealitat, valors atípics i correlació vs causalitat. Es conserven 6 N1 i 4 N2.
- **Bloc 11 · Probabilitat condicionada i independència:** lectura de (P(A\mid B)), canvi de denominador i independència/dependència. Es conserven 5 N1 i 5 N2.

Els tres blocs ara compten en el progrés obligatori i es poden seleccionar al Mode Examen. **Per a la promoció estocàstica no s’han canviat els generadors, els 30 tipus d’exercici ni cap nivell estocàstic.** La validació integrada ha detectat que `correlacioBatx4t` només ofereix quatre tipus diferents de nivell N2 amb enunciat fix; per mantenir 12 preguntes sense duplicar-les, el seu pla d’examen queda en 8 N1 / 4 N2 / 0 N3. És una quota de l’examen, no un canvi de nivell ni una incorporació de N3. Els blocs de Bayes amb taxa base i falsos positius continuen opcionals; els exercicis simples de monedes, daus i assaigs que hi apareixen se solapen amb les famílies ordinàries i no compten com a famílies noves.

La promoció és de contingut, no de dificultat: el mapa de 4t continua sense N3 a numèric, algebraic, espacial i estocàstic; no s’han apujat nivells per completar quotes.
## Famílies i dificultat

- No hi ha famílies N3 actives als sentits numèric, algebraic, espacial ni estocàstic. Per a numèric s’ha identificat una candidata concreta de decisió financera integrada (F7), documentada com a proposta, sense modificar el generador ni els nivells actius.
- A mesura hi ha dues entrades N3 que són una sola família de modelització de dues observacions.
- La manca de N3 no s’ha d’omplir apujant operacions rutinàries, augmentant valors o allargant enunciats. Si es creen tasques, han d’introduir una decisió estratègica, una representació a coordinar o una reconstrucció no present a N1/N2.
- El mapa de famílies s’adopta com a classificació de treball segons la matriu següent, amb els ajustos procedimentals descrits més avall. Les dues reassignacions indicades a algebraic ja s’han aplicat a aquesta branca; aquest informe no modifica cap altre nivell actiu.

## Matriu d’adopció acordada després de la revisió crítica

La revisió crítica adopta el mapa de famílies com a classificació de treball i les fronteres curriculars següents. S’accepta que una família contingui variants N1 i N2 quan la demanda procedimental canvia; compartir família no obliga a compartir nivell. Després de revisar els generadors de les famílies mixtes, s’han adoptat a la branca dues reassignacions; la resta de nivells no s’ha modificat.

| Sentit | Decisió adoptada | Límits i pendents |
| --- | --- | --- |
| Numèric | Mantenir la frontera entre nucli i ampliacions i el mapa de famílies. | Conservar els nivells actuals (59 N1 / 21 N2 / 0 N3); no crear N3 per quota. |
| Mesura | Adoptar el mapa de famílies i comptar `mesuresIndirectes4t:type 10` i `modelitzacioAmpD:type 2` com una família N3 amb variants. | La segona entrada és ampliació; mantenir una sola família N3 ordinària. |
| Algebraic | Mantenir la frontera curricular ordinari/ampliació i el mapa com a classificació de treball. | Nivells actualitzats a (53 / 36 / 0): `patrons4t:type 2` N2→N1 i `patrons4t:type 10` N1→N2. La resta es manté; no crear N3 per quota. |
| Espacial | Mantenir els 8 blocs comuns; incloure al recorregut B els tres blocs A–C que despleguen els sabers [AMP] de rectes. Mantenir D com a aprofundiment opcional. | La divisió A/B és el criteri organitzatiu del projecte, perquè XTEC marca [AMP] però no assigna aquests continguts a una opció concreta. Nivells: 60 / 21 / 0 al nucli comú; 29 / 13 / 0 als blocs [AMP]. |
| Estocàstic | Adoptar al nucli els blocs de contingència, correlació/regressió i probabilitat bàsica amb dependència/independència. Bayes amb taxes base continua com a ampliació. | Conservar els nivells (69 / 41 / 0). La lectura de probabilitat condicionada des de taules és una inferència curricular limitada; no s’hi inclouen tècniques avançades de Bayes. |

Les fronteres relatives a taules de contingència, distribucions bidimensionals, regressió/correlació, probabilitat i itineraris d’ampliació s’han contrastat amb les orientacions oficials. La classificació de la probabilitat condicionada bàsica com a ordinària és una interpretació del seu encaix amb taules i dependència/independència, no una formulació explícita del document curricular.

## Contrast procedimental de famílies mixtes

S’han contrastat estàticament els enunciats i les resolucions dels tipus que formen les famílies mixtes amb els generadors actuals. La conclusió és que una diferència de nivell només s’ha de justificar quan canvia el procediment, els passos o les decisions necessàries; un context o una representació nova, per si sols, no fan pujar el nivell.

El contrast ha afinat diverses agrupacions del mapa de famílies. La taula de nivells i el resultat de l’adopció són a [proposta-progressio-families-mixtes-4eso-20261119.md](proposta-progressio-families-mixtes-4eso-20261119.md).

| Tema | Ajust de classificació documentat |
| --- | --- |
| Errors | `errors4t:type 9` compara dues aproximacions mitjançant error absolut; es reclassifica a F2 i surt de la família d’error relatiu F3. |
| Precisió i error | `precisioError4t:type 8` comunica una diagonal arrodonida amb una precisió coherent amb les dades d’entrada. Es separa de `type 10`, que sí que propaga l’error màxim de les dimensions al perímetre. |
| Espai mostral | `espaiMostralRecompte4t:type 3–4` aplica la regla de Laplace; `type 9` planifica una estimació experimental amb freqüència relativa. Es documenten com a tasques diferents, no com una progressió dins d’una sola família. |
| Representacions de funcions | A `funcionsRep4t`, els tipus 7 i 12 identifiquen una família a partir d’una taula; el tipus 9 construeix/selecciona un model afí contextual a partir de quota i cost per sessió. Es documenten en famílies separades. |
| Patrons i equacions | `patrons4t:type 10` és el mateix procediment de suma i producte que `equacions2g4t:type 10`; s’enllaça com a variant equivalent. `patrons4t:type 2` i `funcionsRep4t:type 9` modelitzen el mateix cost amb quota fixa i tarifa unitària, i es documenten com una família compartida. |
| Anàlisi de funcions | A `analisiFunc4t`, el tipus 1 interpreta creixement/decreixement d’una expressió i el tipus 7 identifica un model a partir d’una taula. Són procediments diferents, no nivells successius d’una família d’identificació exponencial. |
| Núvols de punts | A `nuvolsRelacio4t`, el tipus 8 anticipa una associació plausible a partir del context sense observar dades. Se separa de la lectura de direcció a partir d’un núvol. |

Els exemples de progressió procedimental que es mantenen com a plausibles inclouen el càlcul de l’interès simple abans de trobar el capital final, aplicar la fórmula d’arc en radians abans d’afegir-hi una conversió de graus, i passar de substituir un valor en una recta d’ajust a calcular el canvi de predicció entre dos valors de x. Són justificacions de treball, no una adopció dels nivells.

Aquests ajustos inclouen canvis documentals i dues reassignacions actives a `assets/js/dificultat-mi.js`: `patrons4t:type 2` N2→N1 i `patrons4t:type 10` N1→N2. No s’han modificat generadors, selecció de preguntes ni suites de proves. El nombre de famílies dels temes afectats s’ha de llegir segons el mapa revisat, no segons una agrupació anterior més àmplia.

## Evidències i límits dels modes

| Tipus de revisió | Què queda verificat en aquesta passada |
| --- | --- |
| Estàtica | Pàgines, generadors declarats, recompte de tipus, registres de dificultat i concordança amb el mapa actiu: sí. |
| Mostres i simulació | S’han llegit les mostres i metadades ja desades als JSON. S’hi ha afegit una simulació de pràctica amb Playwright; no s’han tornat a generar grans lots de mostres. |
| Pràctica | La pàgina no té selectors separats anomenats «guiat» i «autònom». S’han simulat els dos formats disponibles (4 opcions i resposta oberta), les pistes disponibles i la correcció pas a pas després d’un error: 154 comprovacions als 11 blocs. Les pistes s’han mostrat en 22 casos i s’ha verificat resposta oberta real en 8 casos; els exercicis que no admeten resposta oberta mantenen les opcions. |
| Examen | Simulació amb Playwright dels 11 blocs ordinaris, 12 preguntes per tema en Matemàtiques A i B, lliurament, puntuació, reinici i retorn a pràctica. |
| Validació responsive i visual | S’han capturat i revisat manualment 44 pantalles: 11 blocs × 2 formats seleccionats × escriptori i mòbil. No s’hi veu cap desbordament horitzontal, retall de taules/gràfics ni control de resposta inaccessible. Observacions menors: alguns títols llargs s’abreugen amb punts suspensius a la barra de navegació mòbil, i el teclat matemàtic ocupa dues files quan no hi cap en una. |
| GitHub Actions | Les passades integrades [#44514295009](https://github.com/srigual-png/mates-interactives/actions/runs/44514295009), [#44496515346](https://github.com/srigual-png/mates-interactives/actions/runs/44496515346) i [#44496515419](https://github.com/srigual-png/mates-interactives/actions/runs/44496515419) són anteriors a les dues reassignacions aplicades a `dificultat-mi.js`; no les validen. El canvi del fitxer compartit pot activar la validació integrada de 4t. No s’ha iniciat una execució manual de proves en aquesta passada. |

Els informes previs no es consideren revalidats per defecte. La suite confirma generadors, exàmens i fluxos de pràctica. Les captures dels 11 blocs s’han revisat en escriptori i mòbil; les dues observacions visuals anotades no impedeixen respondre ni llegir els exercicis.

## Estat i següents passos

1. La promoció curricular, les simulacions i la revisió visual de les captures estan completades. No s’han aplicat retocs visuals perquè els controls continuen accessibles i el contingut es llegeix sense desbordaments.
2. El pla d’examen de correlació és 8 N1 / 4 N2 / 0 N3 perquè els seus quatre tipus N2 tenen enunciat fix; es mantenen aquestes etiquetes.
3. La matriu A/B del Sentit espacial està reflectida a la pàgina de pràctica i als temes d’examen: A inclou els 8 blocs comuns; B n’afegeix A–C; D és opcional.
4. El workflow numèric de 2n ara s’activa només amb canvis als seus fitxers pertinents; canvis documentals o d’altres sentits no l’activen.

**A la branca de la PR #66 s’han actualitzat l’accés a progrés/examen, les pàgines de teoria, la documentació, els checks de 4t, el pla de composició de l’examen de correlació i dues etiquetes de nivell de `patrons4t`. No s’ha modificat cap generador ni el registre oficial de famílies. El mapa cobreix 624 tipus sense omissions ni IDs duplicats. La PR continua Draft, oberta i sense fusionar.**
