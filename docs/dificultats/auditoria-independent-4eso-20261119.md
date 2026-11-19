# Auditoria independent de 4t d’ESO — 19-11-2026

## Dictamen executiu

He contrastat de nou els cinc sentits de 4t amb els HTML i generadors actuals, el mapa de nivells actiu, els registres de revisió i mostres desades, i les orientacions curriculars oficials de la Generalitat. No he pres els informes previs com a prova suficient: alguns es contradiuen sobre si els blocs de 4t estaven pendents o ja tancats.

**Resultat:** el cens de tipus i el mapa tècnic de nivells són coherents, però no recomano donar l’auditoria de 4t per tancada ni adoptar canvis de nivell encara. Hi ha una discrepància curricular clara a estocàstica: procediments de correlació i probabilitat condicionada figuren només en temes etiquetats com a ampliació Batx, mentre que les orientacions de 4t els inclouen al currículum ordinari. A mesura també hi ha dues entrades N3 que són variants d’una mateixa família; compten com una sola família de dificultat alta.

La comparació tipus → família dels 624 tipus ja està documentada a [mapa-tipus-familia-4eso-20261119.md](mapa-tipus-familia-4eso-20261119.md). Aquesta és una proposta independent de classificació i cobertura; no canvia nivells, generadors, temes actius ni registres oficials.

## Abast i recompte

He llegit les cinc pàgines de 4t, el mapa compartit de nivells i els deu fitxers de revisió/resultats. S’han contrastat els àmbits curriculars amb [les orientacions de Matemàtiques d’ESO per cursos (XTEC, 4t)](https://xtec.gencat.cat/web/.content/curriculum/eso/concrecions-curriculars/Orientacions-curriculars_MAT_SEC_per-cursos.pdf).

| Sentit | Temes ordinaris / ampliacions | Tipus ordinaris | Tipus d’ampliació | N1 / N2 / N3 ordinaris | N1 / N2 / N3 ampliació |
| --- | ---: | ---: | ---: | ---: | ---: |
| Numèric | 8 / 4 | 80 | 40 | 59 / 21 / 0 | 36 / 4 / 0 |
| Mesura | 8 / 4 | 88 | 44 | 63 / 24 / 1 | 30 / 13 / 1 |
| Algebraic | 8 / 4 | 89 | 40 | 52 / 37 / 0 | 26 / 14 / 0 |
| Espacial | 8 / 4 | 81 | 42 | 60 / 21 / 0 | 29 / 13 / 0 |
| Estocàstic | 8 / 4 | 80 | 40 | 51 / 29 / 0 | 21 / 19 / 0 |
| **Total** | **40 / 20** | **418** | **206** | **285 / 132 / 1** | **142 / 63 / 1** |

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

### Sentit estocàstic — discrepància curricular prioritària

Les orientacions oficials de 4t situen al curs ordinari:
- la interpretació de distribucions bidimensionals;
- l’organització en taules de contingència;
- els núvols de punts i la recta de regressió;
- el concepte i la utilitat del coeficient de correlació lineal;
- l’anàlisi de correlació, regressió i causalitat;
- experiments simples i compostos, probabilitats dependents i independents, i probabilitat condicionada.

Ara bé, els generadors presentsen `contingenciaBatx4t`, `correlacioBatx4t` i `condicionadaBatx4t` com a ampliacions Batx, fora dels exàmens ordinaris. Les mostres confirmen que no són només contingut avançat:
- `correlacioBatx4t` pregunta pel signe i la intensitat de (r), la interpretació de (r\approx0), i què permet concloure sobre correlació i causalitat.
- `condicionadaBatx4t` inclou càlculs bàsics com (P(\text{esport}\mid4t\ A)), dependència per extracció sense reemplaçament i independència d’esdeveniments.
- `contingenciaBatx4t` inclou freqüències conjuntes/marginals i percentatges condicionats per fila o columna.

Els temes ordinaris actuals sí que cobreixen lectura de taules, associació qualitativa, recta de regressió, interpolació/extrapolació i experiments compostos. Però les mostres ordinàries de `nuvolsRelacio4t` i `regressioPrediccions4t` no contenen la interpretació de (r), i `experimentsCompostos4t` no formula probabilitats condicionades amb notació o denominador del grup de referència.

**Proposta per decidir abans de tocar codi:** separar cada generador Batx en dues capes:
1. **Nucli 4t ordinari:** interpretació bàsica del coeficient (r), causalitat vs correlació, lectures de probabilitat condicionada i freqüències/percentatges condicionats en taules, i independència/dependència en casos simples.
2. **Ampliació:** inferència Bayesiana mèdica amb prevalença i falsos positius quan exigeixi una modelització de diversos passos; tècniques formals o casos deliberadament no lineals que vagin més enllà del concepte i utilitat bàsics.

Aquesta separació podria donar lloc a variants dins dels temes ordinaris existents o a un tema ordinari nou si no hi caben sense barrejar procediments. **No proposo canviar ara els nivells actius**: la promoció curricular i el nivell de dificultat són eixos separats.

En la lectura tipus per tipus d’aquestes quatre branques, la proposta preliminar és:
- `correlacioBatx4t`: els 10 tipus interpreten el coeficient, els límits de (r), valors atípics o la relació amb regressió/causalitat; contingut ordinari de 4t, distribuït com està ara en 6 N1 i 4 N2.
- `condicionadaBatx4t`: els 10 tipus treballen el denominador condicionat, dependència/independència o (P(A\mid B)); contingut ordinari, amb la distribució actual 5 N1 i 5 N2.
- `contingenciaBatx4t`: els 10 tipus són lectura, freqüència conjunta/marginal o percentatge condicionat en taules; contingut ordinari, amb 7 N1 i 3 N2 actuals.
- `bayesBatx4t`: tipus 4–6 i 8 se solapen amb el recompte i la probabilitat de monedes/daus/assaigs que ja apareixen a `experimentsCompostos4t`; no els comptaria com a famílies noves. Tipus 1, 7 i 9 són conceptes bàsics de condicionament/Bernoulli. Tipus 2, 3 i 10 afegeixen una reconstrucció de la taxa base amb falsos positius; són bons candidats a N2 contextual del nucli si s’expressen amb taula o arbre, no motiu per etiquetar automàticament tot el tema com a Batx.
- Cal deduplicar els problemes amb taula de contingència i probabilitat condicionada entre `contingenciaBatx4t` i `condicionadaBatx4t`, i explicitar la frontera entre lectura qualitativa de núvols (`nuvolsRelacio4t`), interpretació de (r) i ús del model de regressió.

Això és una proposta d’encaix curricular per a la revisió; no s’ha canviat la visibilitat dels tipus ni el registre oficial.

## Famílies i dificultat

- No hi ha famílies N3 als sentits numèric, algebraic, espacial ni estocàstic amb el mapa actual.
- A mesura hi ha dues entrades N3 que són una sola família de modelització de dues observacions.
- La manca de N3 no s’ha d’omplir apujant operacions rutinàries, augmentant valors o allargant enunciats. Si es creen tasques, han d’introduir una decisió estratègica, una representació a coordinar o una reconstrucció no present a N1/N2.
- La classificació per famílies i l’adopció de nous nivells és una decisió pedagògica posterior; aquest informe no canvia les etiquetes actives.

## Evidències i límits dels modes

| Tipus de revisió | Què queda verificat en aquesta passada |
| --- | --- |
| Estàtica | Pàgines, generadors declarats, recompte de tipus, registres de dificultat i concordança amb el mapa actiu: sí. |
| Mostres i simulació | S’han llegit les mostres i metadades ja desades als JSON. No he llançat cap generació o simulació nova. |
| Mode guiat / autònom / examen | He contrastat estàticament les opcions i dades de mode en les pàgines i els informes previs; no he repetit cap suite d’interacció ni la passada de quotes. |
| Validació visual | No s’ha fet en navegador en aquesta auditoria. |
| GitHub Actions | No s’ha creat cap workflow ni s’ha activat cap execució. |

Els informes previs descriuen suites d’interfície i comprovacions d’oracle, però no les considero revalidades aquí. Aquesta passada tampoc certifica visualment totes les figures, totes les solucions explicades ni totes les combinacions de l’examen.

## Estat i següents passos

1. Revisar tipus per tipus els tres temes estocàstics etiquetats Batx i decidir quins procediments són nucli curricular de 4t.
2. Revisar i adoptar el mapa tipus → família de les 624 entrades, sobretot les duplicacions entre ordinari i ampliació i els itineraris A/B.
3. Decidir si es reubiquen al nucli ordinari els tipus curriculars de correlació, contingència i probabilitat condicionada. Separar aquesta decisió de qualsevol canvi de dificultat.
4. Completar validació d’interacció i visual en una única passada integrada, si finalment es modifica codi.

**Cap codi, generador, nivell, examen ni registre oficial ha estat modificat. El mapa cobreix els 624 tipus i passa una comprovació d’IDs sense omissions o duplicats. No s’ha fusionat ni publicat res.**
