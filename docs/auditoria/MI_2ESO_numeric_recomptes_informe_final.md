# Recomptes sistemàtics — 2n d’ESO · Sentit numèric · Lot 2

## Abast i fonts

Auditoria de la branca iniciada a `main` (`19beace8b55b45c233742fe491354fece9ce4c86`). S’han contrastat els generadors reals, la classificació compartida `MIDifficulty`, la pàgina de pràctica i les seccions de teoria indicades a continuació. Les variants són generadors que comparteixen un procediment, no famílies addicionals.

- **Tema:** `recomptes`
- **Pàgina i teoria:** 2eso/sentit-numeric.html#recomptes; teoria 2eso/teoria/numeric/recomptes-sistematics.html
- **Inventari verificat:** 15 tipus de generador coberts, sense solapaments entre famílies.
- **Famílies definitives:** 10 · N1/N2/N3 = 6/4/0

## Classificació definitiva

| ID estable | Família | Nivell | Generadors | Justificació |
|---|---|---:|---|---|
| `principi-multiplicatiu` | Principi multiplicatiu | N1 | 1, 2, 3, 4 | Procediment directe, reconeixement o càlcul amb una relació principal; les variacions de context i representació romanen com a generadors/variants dins la família. |
| `llista-sistematica` | Completar una llista sistemàtica | N2 | 5 | Combina relacions o operacions, inverteix una proporcionalitat, analitza una restricció o valida més d’un cas; es manté a N2 perquè els passos són ensenyables a 2n i no requereixen raonament avançat de N3. |
| `deteccio-duplicats` | Detectar casos duplicats | N1 | 6 | Procediment directe, reconeixement o càlcul amb una relació principal; les variacions de context i representació romanen com a generadors/variants dins la família. |
| `parelles-sense-ordre` | Comptar parelles sense tenir en compte l’ordre | N2 | 7, 13 | Combina relacions o operacions, inverteix una proporcionalitat, analitza una restricció o valida més d’un cas; es manté a N2 perquè els passos són ensenyables a 2n i no requereixen raonament avançat de N3. |
| `codis-sense-repeticio` | Comptar codis ordenats sense repetició | N2 | 8 | Combina relacions o operacions, inverteix una proporcionalitat, analitza una restricció o valida més d’un cas; es manté a N2 perquè els passos són ensenyables a 2n i no requereixen raonament avançat de N3. |
| `codis-amb-repeticio` | Comptar codis amb repetició | N1 | 9 | Procediment directe, reconeixement o càlcul amb una relació principal; les variacions de context i representació romanen com a generadors/variants dins la família. |
| `recompte-amb-restriccions` | Recompte amb restriccions | N2 | 10, 14 | Combina relacions o operacions, inverteix una proporcionalitat, analitza una restricció o valida més d’un cas; es manté a N2 perquè els passos són ensenyables a 2n i no requereixen raonament avançat de N3. |
| `desfer-principi-multiplicatiu` | Reconstruir un factor d’un recompte | N1 | 11 | Procediment directe, reconeixement o càlcul amb una relació principal; les variacions de context i representació romanen com a generadors/variants dins la família. |
| `representacio-arbre` | Representar decisions amb un arbre | N1 | 12 | Procediment directe, reconeixement o càlcul amb una relació principal; les variacions de context i representació romanen com a generadors/variants dins la família. |
| `errors-de-recompte` | Detectar errors en un recompte | N1 | 15 | Procediment directe, reconeixement o càlcul amb una relació principal; les variacions de context i representació romanen com a generadors/variants dins la família. |

Els generadors en cada fila són variants del mateix procediment matemàtic. No s’han creat famílies N3 perquè el tema actual no conté cap generador que exigeixi reconstrucció o raonament amb restriccions de nivell avançat; s’ha mantingut la dificultat curricular observada al codi compartit.

## Tres mostres generades per família

### Principi multiplicatiu (`principi-multiplicatiu`) — N1

**Generadors:** 1, 2, 3, 4 · **Apartat de teoria:** `#producte`

**Mostra 1 · tipus 1 · N1.** Tens 3 samarretes i 5 pantalons . Quants conjunts diferents pots formar triant una peça de cada tipus?

**Resposta:** 15

**Resolució:** Per cadascuna de les 3 samarretes hi ha 5 pantalons possibles. Total: 3 · 5 = 15.

**Mostra 2 · tipus 2 · N1.** Un menú permet triar 3 primers i 3 segons . Quants menús diferents es poden formar triant un primer i un segon?

**Resposta:** 9

**Resolució:** La taula tindria 3 files i 3 columnes de combinacions. Hi ha 9 menús diferents.

**Mostra 3 · tipus 3 · N1.** En un diagrama d’arbre hi ha 4 branques a la primera decisió i, des de cadascuna, 2 branques a la segona. Quants resultats finals té l’arbre?

**Resposta:** 8

**Resolució:** Cada una de les 4 primeres opcions genera 2 resultats finals. Total: 8.

### Completar una llista sistemàtica (`llista-sistematica`) — N2

**Generadors:** 5 · **Apartat de teoria:** `#llistes`

**Mostra 1 · tipus 5 · N2.** Amb les lletres A, B i C es formen parelles ordenades de dues lletres diferents. Un alumne ha escrit: · · AB · AC · BA · BC · CA · · Quin cas falta?

**Resposta:** CB

**Resolució:** La llista completa és AB, AC, BA, BC, CA, CB. Falta CB.

**Mostra 2 · tipus 5 · N2.** Amb les lletres A, B i C es formen parelles ordenades de dues lletres diferents. Un alumne ha escrit: · · AB · AC · BA · CA · CB · · Quin cas falta?

**Resposta:** BC

**Resolució:** La llista completa és AB, AC, BA, BC, CA, CB. Falta BC.

**Mostra 3 · tipus 5 · N2.** Amb les lletres A, B i C es formen parelles ordenades de dues lletres diferents. Un alumne ha escrit: · · AB · BA · BC · CA · CB · · Quin cas falta?

**Resposta:** AC

**Resolució:** La llista completa és AB, AC, BA, BC, CA, CB. Falta AC.

### Detectar casos duplicats (`deteccio-duplicats`) — N1

**Generadors:** 6 · **Apartat de teoria:** `#llistes`

**Mostra 1 · tipus 6 · N1.** En un recompte apareix la llista AB, AC, BA, BC, CA, CB, CA . Quin problema té la llista?

**Resposta:** S’ha repetit un cas

**Resolució:** El cas CA ja apareixia a la llista. Per tant, s’ha repetit un cas.

**Mostra 2 · tipus 6 · N1.** En un recompte apareix la llista AB, AC, BA, BC, CA, CB, BC . Quin problema té la llista?

**Resposta:** S’ha repetit un cas

**Resolució:** El cas BC ja apareixia a la llista. Per tant, s’ha repetit un cas.

**Mostra 3 · tipus 6 · N1.** En un recompte apareix la llista AB, AC, BA, BC, CA, CB, AB . Quin problema té la llista?

**Resposta:** S’ha repetit un cas

**Resolució:** El cas AB ja apareixia a la llista. Per tant, s’ha repetit un cas.

### Comptar parelles sense tenir en compte l’ordre (`parelles-sense-ordre`) — N2

**Generadors:** 7, 13 · **Apartat de teoria:** `#ordre`

**Mostra 1 · tipus 7 · N2.** En un grup de 6 persones , quantes parelles diferents es poden formar si Anna-Biel és la mateixa parella que Biel-Anna ?

**Resposta:** 15

**Resolució:** Cada persona es podria relacionar amb 5 persones, però així cada parella es compta dues vegades. El nombre de parelles diferents és 15.

**Mostra 2 · tipus 13 · N2.** En un torneig amb 6 equips , cada parella d’equips juga un únic partit . Quants partits es disputen en total?

**Resposta:** 15

**Resolució:** El recompte ordenat seria 6 · 5, però cada partit està duplicat. En total hi ha 15 partits.

**Mostra 3 · tipus 7 · N2.** En un grup de 4 persones , quantes parelles diferents es poden formar si Anna-Biel és la mateixa parella que Biel-Anna ?

**Resposta:** 6

**Resolució:** Cada persona es podria relacionar amb 3 persones, però així cada parella es compta dues vegades. El nombre de parelles diferents és 6.

### Comptar codis ordenats sense repetició (`codis-sense-repeticio`) — N2

**Generadors:** 8 · **Apartat de teoria:** `#repeticio`

**Mostra 1 · tipus 8 · N2.** Amb 6 xifres diferents , quants codis de dues xifres es poden formar sense repetir cap xifra , si l’ordre importa?

**Resposta:** 30

**Resolució:** Primera posició: 6 opcions. Segona posició: 5 opcions. Total: 30 codis.

**Mostra 2 · tipus 8 · N2.** Amb 5 xifres diferents , quants codis de dues xifres es poden formar sense repetir cap xifra , si l’ordre importa?

**Resposta:** 20

**Resolució:** Primera posició: 5 opcions. Segona posició: 4 opcions. Total: 20 codis.

**Mostra 3 · tipus 8 · N2.** Amb 4 xifres diferents , quants codis de dues xifres es poden formar sense repetir cap xifra , si l’ordre importa?

**Resposta:** 12

**Resolució:** Primera posició: 4 opcions. Segona posició: 3 opcions. Total: 12 codis.

### Comptar codis amb repetició (`codis-amb-repeticio`) — N1

**Generadors:** 9 · **Apartat de teoria:** `#repeticio`

**Mostra 1 · tipus 9 · N1.** Amb 2 símbols , quants codis de dues posicions es poden formar si es poden repetir els símbols?

**Resposta:** 4

**Resolució:** Hi ha 2 opcions per a cada posició. Total: 2 · 2 = 4.

**Mostra 2 · tipus 9 · N1.** Amb 5 símbols , quants codis de dues posicions es poden formar si es poden repetir els símbols?

**Resposta:** 25

**Resolució:** Hi ha 5 opcions per a cada posició. Total: 5 · 5 = 25.

**Mostra 3 · tipus 9 · N1.** Amb 4 símbols , quants codis de dues posicions es poden formar si es poden repetir els símbols?

**Resposta:** 16

**Resolució:** Hi ha 4 opcions per a cada posició. Total: 4 · 4 = 16.

### Recompte amb restriccions (`recompte-amb-restriccions`) — N2

**Generadors:** 10, 14 · **Apartat de teoria:** `#restriccions`

**Mostra 1 · tipus 10 · N2.** Hi ha 3 samarretes i 3 pantalons . En principi es poden combinar tots, però una combinació concreta està prohibida . Quants conjunts són possibles?

**Resposta:** 8

**Resolució:** Sense restriccions hi ha 9 combinacions. N’eliminem 1. Queden 8 conjunts.

**Mostra 2 · tipus 14 · N2.** Amb les xifres 2, 4, 6 i 8 , quants nombres de dues xifres diferents , sense repetir xifra, són majors que 50 ?

**Resposta:** 6

**Resolució:** Els casos vàlids són 62, 64, 68, 82, 84, 86. En total n’hi ha 6.

**Mostra 3 · tipus 14 · N2.** Amb les xifres 2, 4, 6 i 8 , quants nombres de dues xifres diferents , sense repetir xifra, són majors que 50 ?

**Resposta:** 6

**Resolució:** Els casos vàlids són 62, 64, 68, 82, 84, 86. En total n’hi ha 6.

*El generador té un enunciat fix en aquest tipus; les execucions repetides retornen la mateixa pregunta i resposta. S’indica per transparència, sense inventar variants que el codi no genera.*

### Reconstruir un factor d’un recompte (`desfer-principi-multiplicatiu`) — N1

**Generadors:** 11 · **Apartat de teoria:** `#producte`

**Mostra 1 · tipus 11 · N1.** Hi ha 15 combinacions possibles. Si la primera decisió té 3 opcions i per a totes hi ha el mateix nombre d’opcions a la segona decisió, quantes opcions té la segona?

**Resposta:** 5

**Resolució:** 3 · ? = 15. La segona decisió té 5 opcions.

**Mostra 2 · tipus 11 · N1.** Hi ha 16 combinacions possibles. Si la primera decisió té 4 opcions i per a totes hi ha el mateix nombre d’opcions a la segona decisió, quantes opcions té la segona?

**Resposta:** 4

**Resolució:** 4 · ? = 16. La segona decisió té 4 opcions.

**Mostra 3 · tipus 11 · N1.** Hi ha 25 combinacions possibles. Si la primera decisió té 5 opcions i per a totes hi ha el mateix nombre d’opcions a la segona decisió, quantes opcions té la segona?

**Resposta:** 5

**Resolució:** 5 · ? = 25. La segona decisió té 5 opcions.

### Representar decisions amb un arbre (`representacio-arbre`) — N1

**Generadors:** 12 · **Apartat de teoria:** `#arbres`

**Mostra 1 · tipus 12 · N1.** Quina eina és especialment útil per representar decisions successives i comprovar que no falta cap possibilitat?

**Resposta:** Diagrama d’arbre

**Resolució:** Per visualitzar decisions successives utilitzem un diagrama d’arbre.

**Mostra 2 · tipus 12 · N1.** Quina eina és especialment útil per representar decisions successives i comprovar que no falta cap possibilitat?

**Resposta:** Diagrama d’arbre

**Resolució:** Per visualitzar decisions successives utilitzem un diagrama d’arbre.

**Mostra 3 · tipus 12 · N1.** Quina eina és especialment útil per representar decisions successives i comprovar que no falta cap possibilitat?

**Resposta:** Diagrama d’arbre

**Resolució:** Per visualitzar decisions successives utilitzem un diagrama d’arbre.

*El generador té un enunciat fix en aquest tipus; les execucions repetides retornen la mateixa pregunta i resposta. S’indica per transparència, sense inventar variants que el codi no genera.*

### Detectar errors en un recompte (`errors-de-recompte`) — N1

**Generadors:** 15 · **Apartat de teoria:** `#errors`

**Mostra 1 · tipus 15 · N1.** Un alumne diu: “Hi ha 4 begudes i 3 entrepans, així que hi ha 4 + 3 = 7 menús”. Quin és l’error principal?

**Resposta:** Sumar les opcions en lloc de combinar-les

**Resolució:** L’alumne ha sumat les quantitats d’opcions. Quan triem una beguda i un entrepà, cal combinar les possibilitats de totes dues decisions.

**Mostra 2 · tipus 15 · N1.** Un alumne diu: “Hi ha 4 begudes i 3 entrepans, així que hi ha 4 + 3 = 7 menús”. Quin és l’error principal?

**Resposta:** Sumar les opcions en lloc de combinar-les

**Resolució:** L’alumne ha sumat les quantitats d’opcions. Quan triem una beguda i un entrepà, cal combinar les possibilitats de totes dues decisions.

**Mostra 3 · tipus 15 · N1.** Un alumne diu: “Hi ha 4 begudes i 3 entrepans, així que hi ha 4 + 3 = 7 menús”. Quin és l’error principal?

**Resposta:** Sumar les opcions en lloc de combinar-les

**Resolució:** L’alumne ha sumat les quantitats d’opcions. Quan triem una beguda i un entrepà, cal combinar les possibilitats de totes dues decisions.

*El generador té un enunciat fix en aquest tipus; les execucions repetides retornen la mateixa pregunta i resposta. S’indica per transparència, sense inventar variants que el codi no genera.*

## Validació i incidències

- Prova matemàtica independent: **250 mostres per tipus**; cada mostra comprova el resultat amb un oracle independent, unicitat de respostes, consistència nivell/família i absència d’errors JavaScript.
- Prova de navegador: interfície guiada/autònoma, cobertura de famílies, respostes i recuperació d’error, generació d’examen, enllaços de teoria, ancoratges directes/hashchange i viewport mòbil de 390 px.
- Chrome 157.0.8103.52; la navegació emergent a la pàgina de teoria es verifica fins a l’esdeveniment `window.open` i URL/ancoratge sol·licitat. L’entorn de fitxer local no permet carregar el popup real; aquesta part no es declara verificada.
- Suite de regressió: 30 exercicis per cadascun dels quatre temes ordinaris i quatre temes d’ampliació, sense errors de pàgina.
- Fitxes: comprovació de nivells i famílies, temes ordinaris disponibles, combinacions N1/N2, impossibilitat de N3 per a temes sense N3, Word/PDF i solucions amb/sense resolució.

Les dades de resposta d’aquestes mostres també passen la prova matemàtica; són sortides aleatòries documentals i poden repetir-se quan un generador usa una plantilla fixa.
