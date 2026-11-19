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

Les orientacions oficials de 4t inclouen la interpretació de distribucions bidimensionals, les taules de contingència, els núvols de punts i la regressió lineal, el concepte i la utilitat de (r), l’anàlisi de correlació/regressió/causalitat i la probabilitat condicionada amb esdeveniments dependents i independents.

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
- La classificació per famílies i l’adopció de nous nivells és una decisió pedagògica posterior; aquest informe no canvia les etiquetes actives.

## Evidències i límits dels modes

| Tipus de revisió | Què queda verificat en aquesta passada |
| --- | --- |
| Estàtica | Pàgines, generadors declarats, recompte de tipus, registres de dificultat i concordança amb el mapa actiu: sí. |
| Mostres i simulació | S’han llegit les mostres i metadades ja desades als JSON. S’hi ha afegit una simulació de pràctica amb Playwright; no s’han tornat a generar grans lots de mostres. |
| Pràctica | La pàgina no té selectors separats anomenats «guiat» i «autònom». S’han simulat els dos formats disponibles (4 opcions i resposta oberta), les pistes disponibles i la correcció pas a pas després d’un error: 154 comprovacions als 11 blocs. Les pistes s’han mostrat en 22 casos i s’ha verificat resposta oberta real en 8 casos; els exercicis que no admeten resposta oberta mantenen les opcions. |
| Examen | Simulació amb Playwright dels 11 blocs ordinaris, 12 preguntes per tema en Matemàtiques A i B, lliurament, puntuació, reinici i retorn a pràctica. |
| Validació responsive | Playwright ha comprovat la posició, amplada i accés al botó d’examen en escriptori i mòbil per als 11 blocs. No és una inspecció visual manual. |
| GitHub Actions | La passada integrada actual [#44512783420](https://github.com/srigual-png/mates-interactives/actions/runs/44512783420) ha passat amb les proves de pràctica afegides. També havien passat la sintaxi inline JS [#44496515346](https://github.com/srigual-png/mates-interactives/actions/runs/44496515346) i la validació de 2n [#44496515419](https://github.com/srigual-png/mates-interactives/actions/runs/44496515419), activada perquè es va tocar el fitxer compartit de dificultats. Després s’ha limitat el disparador de 2n als fitxers del seu àmbit. |

Els informes previs no es consideren revalidats per defecte. La suite confirma generadors i exàmens, i ara també els fluxos pràctics disponibles. No s’ha fet una inspecció visual manual de totes les figures, pàgines, controls i solucions.

## Estat i següents passos

1. La promoció curricular i la passada integrada estan completades. La pràctica s’ha simulada en els dos formats de resposta disponibles per als 11 blocs; la revisió visual manual completa continua pendent.
2. El pla d’examen de correlació és 8 N1 / 4 N2 / 0 N3 perquè els seus quatre tipus N2 tenen enunciat fix. Cap etiqueta de nivell dels exercicis no s’ha alterat.
3. El workflow numèric de 2n ara s’activa només amb canvis als seus fitxers pertinents; canvis documentals o d’altres sentits no l’activen.

**A la branca de la PR #66 s’han actualitzat l’accés a progrés/examen, les pàgines de teoria, la documentació, els checks de 4t i el pla de composició de l’examen de correlació. No s’ha modificat cap generador ni nivell actiu o el registre oficial. El mapa cobreix 624 tipus sense omissions ni IDs duplicats. La PR continua Draft, oberta i sense fusionar.**
