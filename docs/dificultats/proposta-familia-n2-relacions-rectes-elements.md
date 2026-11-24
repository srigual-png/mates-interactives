# Proposta de família N2 — composició de relacions entre rectes

**Estat:** candidata pedagògica implementada i validada amb proves de generació/classificació; pendent de la passada al navegador i de revisió abans de fusionar. La classificació local la tracta provisionalment com una família N2.<br>
**Tema:** 1r ESO · Sentit espacial · Elements geomètrics bàsics.<br>
**Ús previst:** exercicis per a una oferta combinada N2 de geometria, no per justificar un examen individual del tema.

## Identitat de la família

- **ID candidat:** `compondre-relacions-entre-rectes`
- **Nom:** Compondre relacions de paral·lelisme i perpendicularitat
- **Objectiu:** deduir la relació entre dues rectes a partir de dues o més relacions conegudes, identificant la recta o relació que es comparteix en la cadena.
- **Nivell proposat:** N2.
- **Unitat de recompte:** les regles d’inferència següents són variants d’una família, perquè totes demanen compondre relacions entre rectes conegudes. Canviar lletres, ordre de les premisses o context no crea famílies noves.

## Regles d’inferència admeses

Es treballa en geometria euclidiana plana. Les rectes de cada exercici són coplanàries i diferents. La teoria actual del tema defineix paral·lelisme i perpendicularitat, però no explica explícitament totes aquestes composicions; si s’implementa la família, caldrà afegir-hi una explicació breu i un exemple resolt.

| Relacions conegudes | Relació deduïda |
|---|---|
| `r ∥ s` i `s ∥ t` | `r ∥ t` |
| `r ∥ s` i `t ⟂ s` | `t ⟂ r` |
| `r ⟂ t` i `s ⟂ t` | `r ∥ s` |
| `a ⟂ b` i `b ∥ c` | `a ⟂ c` |

Es descarten preguntes sobre angles numèrics, transversals, polígons o càlcul de longituds: aquests continguts pertanyen a altres famílies i ampliarien l’abast d’aquesta proposta.

## Contrast amb el temari

La teoria actual de Mates Interactives per a 1r ESO ensenya a classificar dues rectes com a paral·leles, perpendiculars, secants obliqües o coincidents. També introdueix la perpendicularitat en la definició de mediatriu. No presenta, però, regles per deduir la posició relativa d’una tercera recta a partir de dues relacions conegudes.

Les orientacions curriculars de la Generalitat descriuen per a 1r ESO l’estudi dels angles i les seves relacions, dels polígons i dels triangles. En els sabers comuns de 1r a 3r ESO s’hi inclouen la descripció i classificació de formes segons propietats, el reconeixement de relacions geomètriques, i es destaca el raonament deductiu i l’argumentació lògica. La seqüenciació consultada no enumera explícitament aquestes quatre regles de composició com a contingut específic de 1r.

| Regla proposada | Encaix amb els continguts actuals de 1r | Valoració |
|---|---|---|
| Paral·lela + paral·lela → paral·lela | Parteix del concepte de paral·lelisme, però la transitivitat no s’explica a la teoria actual ni figura explícitament en la seqüenciació de 1r. | Extensió assequible; cal ensenyar-la abans d’avaluar-la. |
| Paral·lela + perpendicular → perpendicular | Utilitza dues relacions presents en les definicions del tema, però la transferència de perpendicularitat entre paral·leles no s’hi desenvolupa. | Extensió assequible amb diagrama i exemple resolt. |
| Dues perpendiculars a una mateixa recta → paral·leles | Combina propietats conegudes, però aquesta deducció no s’ensenya explícitament; requereix visualitzar les direccions. | La més exigent de les tres; convé introduir-la amb dibuix i justificació verbal. |
| `a ⟂ b` i `b ∥ c` → `a ⟂ c` | És la mateixa propietat que la segona regla, amb les lletres i l’ordre canviats. | No és una regla curricular o procediment nou; compta com a variant d’ítem. |

**Dictamen:** les quatre regles són matemàticament correctes en el pla euclidià i parteixen de vocabulari que el tema ja introdueix. Tanmateix, no es poden presentar com a contingut explícit que l’alumnat ja hauria d’haver après a 1r ESO. La família es pot mantenir com a candidata N2 per a una oferta combinada només si la teoria de MI incorpora abans les propietats i exemples resolts, i si l’etiqueta N2 reflecteix aquesta deducció addicional. El currículum general dona suport al treball de relacions i raonament geomètric, però la seqüenciació de 1r consultada no obliga a incloure aquestes inferències.

**Fonts de contrast:** [Orientacions curriculars de matemàtiques de l’ESO per sentits, sentit espacial, pp. 21–23](https://xtec.gencat.cat/web/.content/curriculum/eso/concrecions-curriculars/Orientacions-curriculars_MAT_SEC_per-sentits.pdf); teoria i generadors actuals a `1eso/teoria/espacial/elements-geometrics-1r-eso.html` i `1eso/sentit-espacial.html`.

## Especificació dels passos del generador

### Integració prevista

La implementació local s’ha afegit a `genElementsVarietat`, el generador de preguntes de quatre opcions que utilitza el tema `elements`. Els tipus són **9 = R1, 10 = R2, 11 = R3, 12 = cadena i 13 = diagnòstic d’error**. Cada variant retorna el format del generador actual: `question`, `correct`, quatre `options`, dues `guide`, `solution`, `svg` buit i `type`. Totes queden associades a una única família candidata (`compondre-relacions-entre-rectes`) i a N2. El `else` general antic s’ha delimitat explícitament com a tipus 8.

El mapa `familyFor`/`decorate` assigna els tipus 9–13 a la mateixa família N2. El sorteig conserva vuit grups de pes legacy i n’afegeix un per a aquesta família; dins del grup N2 reparteix els cinc patrons. Així evita que cinc tipus nous multiplicats per cinc el pes de la família. El filtre N2 existent pot demanar el nivell per separat; guiat/autònom continua determinant només el suport.

No s’ha de copiar directament a `SP_OPEN_PATTERNS`: aquest banc és de resposta escrita (`spTextAnswer`) i no mostra les quatre opcions dels exemples. Si més endavant es vol cobrir també el banc obert, caldrà una adaptació pròpia del format de resposta i les seves variants acceptades.

Per a tots els casos, el generador tria etiquetes diferents per a les rectes, les considera coplanàries i diferents, construeix primer les premisses i la resposta lògica, i només després redacta l’enunciat i les opcions. Les opcions han de ser les quatre posicions relatives ja ensenyades: **paral·leles, perpendiculars, secants obliqües i coincidents**. No s’ha d’oferir «no es pot determinar»: cada regla triada determina una resposta única.

### Regla 1 — Paral·lela + paral·lela → paral·lela

1. Tria tres etiquetes diferents, per exemple `r`, `s` i `t`.
2. Construeix les premisses `r ∥ s` i `s ∥ t`; la recta `s` és la connexió comuna.
3. Defineix com a parella objectiu `r`–`t` i deriva `r ∥ t` per tenir la mateixa direcció que `s`.
4. Escriu la pregunta demanant només la relació entre `r` i `t`; no preguntis per una relació que ja sigui una premissa.
5. Barreja l’ordre de les dues premisses i les etiquetes, sense canviar-ne l’estructura.
6. Dona com a pistes: trobar la recta comuna; comparar la direcció de les altres dues.
7. Resolució: copiar la cadena de premisses i concloure que `r ∥ t`.

### Regla 2 — Paral·lela + perpendicular → perpendicular

1. Tria tres etiquetes diferents, per exemple `r`, `s` i `t`.
2. Tria una parella paral·lela (`r ∥ s`) i una tercera recta perpendicular a una d’elles (`t ⟂ s`).
3. Pregunta per la parella no donada directament (`t`–`r`) i deriva `t ⟂ r`.
4. Permet les dues orientacions equivalents de la premissa paral·lela (`r ∥ s` o `s ∥ r`) i tria aleatòriament quin membre del parell és la recta perpendicular coneguda. Pregunta sempre per l’altre membre; no generis com a objectiu la mateixa parella que ja apareix en la dada perpendicular.
5. Pistes: les paral·leles tenen la mateixa direcció; una recta que forma 90° amb una també en forma amb l’altra.
6. Resolució en dos passos: `r ∥ s`; `t ⟂ s`; per tant, `t ⟂ r`.

### Regla 3 — Dues perpendiculars a una recta → paral·leles

1. Tria tres etiquetes diferents, per exemple `r`, `s` i `t`; comprova especialment que `r` i `s` no siguin la mateixa recta.
2. Construeix les premisses `r ⟂ t` i `s ⟂ t`, amb `t` com a recta comuna.
3. Pregunta per `r`–`s` i deriva `r ∥ s`: en el mateix pla, dues rectes diferents perpendiculars a una mateixa recta tenen la mateixa direcció.
4. Barreja l’ordre de les premisses i les etiquetes, però conserva la condició `r ≠ s`.
5. Pistes: compara els angles que formen totes dues amb `t`; dues rectes diferents amb aquesta mateixa direcció són paral·leles.
6. Resolució: `r ⟂ t` i `s ⟂ t`; per tant, `r ∥ s`.

### Variants compostes de la família

**Cadena de dues deduccions (tres premisses):** tria una de les plantilles `a ∥ b, b ∥ c, c ∥ d ⟹ a ∥ d` o `m ∥ n, p ⟂ m, q ∥ p ⟹ q ⟂ n`. Mostra les premisses en ordre aleatori; la solució ha d’explicitar les dues deduccions intermèdies. El generador no ha d’ometre una dada necessària ni preguntar per una relació donada literalment.

**Diagnòstic d’una conclusió errònia:** crea primer un cas vàlid d’una de les tres regles i calcula la relació correcta. Després tria una conclusió falsa, diferent de la correcta, i pregunta quina correcció és adequada. Les quatre opcions han de contenir l’avaluació i la relació resultant; només una pot ser correcta. La solució ha d’assenyalar la premissa compartida, aplicar la regla i corregir la conclusió.

### Condicions de validesa i varietat

- Els generadors de base corresponen a tres patrons matemàtics (`R1`, `R2`, `R3`); canviar només lletres, ordre o redacció no crea un patró nou. Els identificadors són provisionals.
- La regla `a ⟂ b` i `b ∥ c` és una instància de `R2`, no un quart generador independent.
- La relació correcta es deriva de les premisses, mai de l’orientació gràfica ni de l’ordre de les opcions. Inicialment no cal dibuix en cada exercici: les premisses textuals són suficients i eviten que el dibuix afegeixi informació accidental.
- No hi pot haver línies repetides entre les etiquetes, premisses incompatibles, premisses que donin directament la resposta objectiu, ni objectius amb més d’una interpretació.
- Les opcions s’han de barrejar amb `uniq4(correct, distractors)`, mantenint una resposta correcta i tres posicions alternatives; cal comprovar que cap distractor coincideixi amb la correcta després de normalitzar el text.
- La pràctica principal i l’examen han d’identificar tots els tipus com la mateixa família N2. No s’ha d’afegir la família al registre de validades ni al catàleg d’oferta fins que el generador estigui implementat, provat i acceptat.

## Exemples d’ítems

Totes les preguntes admeten quatre opcions. Per conservar els distractors coherents, es poden usar les quatre posicions relatives **paral·leles**, **perpendiculars**, **secants obliqües** i **coincidents**; s’ajusta la resposta correcta al cas.

### 1. Paral·leles en cadena

**Enunciat:** Les rectes `r` i `s` són paral·leles. Les rectes `s` i `t` també són paral·leles. Com són `r` i `t`?

**Opcions:** paral·leles · perpendiculars · secants obliqües · coincidents.<br>
**Resposta:** paral·leles.<br>
**Pistes:** 1) Busca la recta que apareix en totes dues relacions. 2) Les dues rectes tenen la mateixa direcció que aquesta recta.<br>
**Resolució:** `r ∥ s` i `s ∥ t`; per tant, `r ∥ t`.

### 2. Paral·lelisme i perpendicularitat

**Enunciat:** `r ∥ s` i `t ⟂ s`. Quina relació hi ha entre `t` i `r`?

**Opcions:** paral·leles · perpendiculars · secants obliqües · coincidents.<br>
**Resposta:** perpendiculars.<br>
**Pistes:** 1) Compara `r` i `s`: tenen la mateixa direcció. 2) Una recta perpendicular a una d’elles també és perpendicular a l’altra.<br>
**Resolució:** com que `r ∥ s` i `t ⟂ s`, també `t ⟂ r`.

### 3. Dues perpendiculars a una mateixa recta

**Enunciat:** `r ⟂ t` i `s ⟂ t`. Les rectes `r` i `s` són diferents. Com són entre elles?

**Opcions:** paral·leles · perpendiculars · secants obliqües · coincidents.<br>
**Resposta:** paral·leles.<br>
**Pistes:** 1) Observa que `r` i `s` formen un angle recte amb la mateixa recta. 2) Totes dues tenen la mateixa direcció.<br>
**Resolució:** dues rectes diferents perpendiculars a una mateixa recta són paral·leles; per tant, `r ∥ s`.

### 4. Mateixa deducció amb l’ordre canviat

**Enunciat:** `b ∥ c` i `a ⟂ b`. Quina relació hi ha entre `a` i `c`?

**Opcions:** paral·leles · perpendiculars · secants obliqües · coincidents.<br>
**Resposta:** perpendiculars.<br>
**Pistes:** 1) Reordena les dades com a paral·lelisme més perpendicularitat. 2) Aplica la mateixa regla que si la perpendicularitat s’hagués donat amb `c`.<br>
**Resolució:** `b ∥ c` i `a ⟂ b`; per tant, `a ⟂ c`.

### 5. Cadena de tres relacions

**Enunciat:** `m ∥ n`, `p ⟂ m` i `q ∥ p`. Quina relació hi ha entre `q` i `n`?

**Opcions:** paral·leles · perpendiculars · secants obliqües · coincidents.<br>
**Resposta:** perpendiculars.<br>
**Pistes:** 1) Fes servir primer `m ∥ n` i `p ⟂ m`. 2) Després compara `q` amb `p`.<br>
**Resolució:** `p ⟂ m` i `m ∥ n`, així que `p ⟂ n`. Com que `q ∥ p`, també `q ⟂ n`.

### 6. Detectar una conclusió incorrecta

**Enunciat:** Sabem que `u ∥ v` i `w ⟂ v`. La Jana conclou que `w ∥ u`. És correcta la conclusió?

**Opcions:** sí, perquè `u` i `v` són paral·leles · no, `w ⟂ u` · no, `w` i `u` són secants obliqües · no, `w` i `u` són coincidents.<br>
**Resposta:** no, `w ⟂ u`.<br>
**Pistes:** 1) Mantén la relació entre `u` i `v`. 2) Una perpendicular a `v` no passa a ser paral·lela a una recta paral·lela a `v`.<br>
**Resolució:** si `u ∥ v` i `w ⟂ v`, aleshores `w ⟂ u`. La conclusió de la Jana és incorrecta.

## Per què N2

Els exercicis actuals del tema demanen reconèixer o aplicar directament una definició. Aquesta família exigeix combinar almenys dues premisses i fer una deducció abans de triar la relació final. Per això es proposa N2; no demana demostracions formals, càlculs d’angles ni continguts d’ampliació, així que no es proposa N3.

## Valoració de la varietat

La revisió troba tres estructures d’inferència de dues premisses: paral·lelisme + paral·lelisme; paral·lelisme + perpendicularitat; dues perpendicularitats amb una recta comuna. A això s’hi poden afegir cadenes de tres premisses i exercicis que demanen detectar una conclusió errònia. Aquestes són formes diverses de treballar **una mateixa família**: compondre relacions entre rectes.

Canviar només les lletres, invertir l’ordre de les premisses o reformular la pregunta no compta com a varietat matemàtica nova. La varietat és suficient per proposar una contribució petita a un examen combinat N2, sempre que el generador distribueixi les tres estructures i inclogui cadenes o diagnòstic d’errors. No és suficient per oferir el tema individualment: continua sent una sola família.

## Límits i criteri per acceptar-la

- La família no converteix el tema en apte per a examen individual: és una sola família N2. La seva possible incorporació seria com a aportació al paquet combinat de geometria N2.
- Els sis enunciats són exemples de variants, no sis famílies. El generador implementa ara els tres patrons base, una cadena i un diagnòstic d’error.
- El contrast amb les orientacions oficials confirma que són una extensió coherent del raonament geomètric, però no contingut explícit de la seqüenciació proposada per a 1r. La teoria s’ha redactat a `1eso/teoria/espacial/elements-geometrics-1r-eso.html#compondre`. Les lletres aleatòries només amplien els enunciats, no la varietat de procediments.
- Fins que es fusioni i s’accepti pedagògicament, es manté el catàleg tancat actual: el nivell N2 d’Elements geomètrics bàsics continua sense oferta formal.

## Resultat de la validació local

- Mostra de **3.250 preguntes**: 250 per cadascun dels tipus 1–13; totes amb quatre opcions úniques, resposta entre les opcions, pistes i resolució.
- Els **1.250 casos N2** s’han comprovat amb un oracle independent que interpreta les premisses i dedueix si la relació objectiu és paral·lela o perpendicular. Els cinc patrons (tipus 9–13) queden classificats a N2.
- Una mostra addicional de pràctica confirma que el filtre demanat retorna N2 i que tots cinc patrons són assolibles.
- El banc que pot alimentar l’examen combinat conté mostres dels cinc patrons N2. Per respectar l’abast acordat, l’examen individual del tema queda limitat a 12 preguntes N1; aquesta família única no hi ocupa places N2.
- La prova de navegador amb Chromium no s’ha pogut executar en aquest entorn: el binari disponible avorta en iniciar-se per una restricció de socket. La passada de navegador continua pendent.
