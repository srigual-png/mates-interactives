# Analítica uniforme de MI · 29-10-2026

## Disseny i auditoria

`scripts/auditoria-analitica-inicial.json` conserva l’inventari anterior per pàgina:
càrregues del client, crides d’inici de pràctica, integració de l’examen per tema i
crides directes. No confon l’existència d’un helper amb una acció instrumentada.
Abans els 279 HTML ja tenien un únic comptador inline cadascun, inicis de pràctica als quatre numèrics,
lliurament d’examen per tema al motor compartit i cerca/selecció al cercador.
Les altres correccions, complecions i exàmens per sentit no tenien seguiment uniforme.

Ara els 279 HTML públics de la còpia local carreguen `assets/js/analitica-mi.js`
una vegada. Les còpies de seguretat no són pàgines públiques de l’auditoria.
El compte es manté a `https://srigual.goatcounter.com/count`.
S’utilitzen `path`, `title`, `event`, `no_session` i `referrer`, segons la
[API de GoatCounter](https://www.goatcounter.com/help/js), sense propietats arbitràries.

El client es carrega amb `no_onload` i el mòdul fa automàticament una única crida
de visita quan la pàgina és visible. Les interaccions no criden aquest circuit.
No s’envien ni la consulta ni el fragment de l’URL; es retira també el camp `q`
que afegeix el client. La referència d’entrada és buida.
La neteja de `q` envolta `get_data` del client: cal tornar-la a validar si aquest
client canvia. Si el client falla o queda bloquejat, l’activitat continua.
La cua d’esdeveniments té un màxim de 50 elements i caduca als 30 segons.

## Matriu de connexió

P = inici, correcció encert/error, compleció segons el motor i teoria des d’error.
H = pistes visibles automàtiques del mode guiat; HP = pistes progressives.
T/S = inici i lliurament d’examen per tema / per sentit.
La validació funcional i les seves limitacions consten al JSON de resultats i a
l’apartat de validació; aquesta taula descriu les connexions al codi.

| Curs | Sentit | Pràctica | Pistes | Exàmens | Particularitats |
|---|---|---|---|---|---|
| 1r | Numèric | P | H + ampliació | T/S | Sessions d’ampliació separades |
| 1r | Mesura | P | H + oberts | T/S | Motor ST i sessions de problemes oberts |
| 1r | Algebraic | P | H + oberts | T/S | Motor de correcció i sessions de problemes oberts |
| 1r | Espacial | P | H + oberts | T/S | Sessions de problemes oberts |
| 1r | Estocàstic | P | H + oberts | T/S | Elecció, resposta integrada i construcció |
| 2n | Numèric | P | H | T/S | Inici històric conservat |
| 2n | Mesura | P | H | T/S | Motor de ratxa |
| 2n | Algebraic | P | H | T/S | Examen configurat amb àlies propi |
| 2n | Espacial | P | H | T/S | Motor de ratxa |
| 2n | Estocàstic | P | H | T/S | Motor de ratxa |
| 3r | Numèric | P | H | T/S | Inici històric conservat |
| 3r | Mesura | P | H | T/S | Resultats d’examen al pas final |
| 3r | Algebraic | P | H | T/S | Resultats d’examen al pas final |
| 3r | Espacial | P | H | T/S | Motor de ratxa |
| 3r | Estocàstic | P | H | T/S | Motor de ratxa |
| 4t | Numèric | P | H | T/S | Opció A/B quan existeix |
| 4t | Mesura | P | HP | T/S | Opció A/B, ampliacions |
| 4t | Algebraic | P | H | T/S | Opció A/B |
| 4t | Espacial | P | H | T/S | Opció A/B |
| 4t | Estocàstic | P | HP | T/S | Opció A/B |

També s’instrumenten les demostracions de les cinc portades i les visites a
teoria. No s’han creat activitats noves, comptes ni cookies.

## Catàleg i significat

Per als esdeveniments nous:
`mi/{activitat}/{acció}/{curs}/{sentit}/{tema}[/{mode}][/{resultat}][/{A|B}]`.
Els temes són `TOPICS[].id`; `all` representa una sessió de diversos temes.
`guiat`/`autonom` prové del nivell pedagògic; escriure una resposta en lloc de
triar una opció no converteix la pràctica ordinària en una sessió de problemes.
Les extensions s’identifiquen per `isExtension` o pel curs del tema diferent
del curs de la pàgina. No es registren seleccions completes d’examen.

| Activitat | Acció | Unitat comptada |
|---|---|---|
| `practice`, `extension`, `open` | `started` | Inici real de sessió; dobles activacions immediates es dedupliquen |
| Les mateixes | `answered` | Correcció efectiva, amb `correct`/`incorrect`; una per exercici a pràctica i oberts |
| Les mateixes | `hint` | Presentació visible de pistes; en guiat automàtic una per exercici, en desplegable cada obertura, en progressives cada pista |
| Les mateixes | `completed` | Una per sessió: objectiu real de ratxa, o arribada al resum de problemes/ampliació |
| Les mateixes | `theory-error` | Clic a teoria dins de la correcció d’un error |
| `topic-exam` | `started` | Examen per tema generat i obert |
| `sense-exam` | `started`, `submitted` | Examen per sentit obert / arribat a resultats, una vegada per execució |
| `demo` | `answered`, `theory-error` | Intent corregit / accés a teoria de la demostració; camí del tema de teoria com a identificador estable |

La correcció compta intents corregits, no alumnes ni exercicis únics globals.
Els motors ordinaris bloquegen nous intents després de corregir. El mòdul afegeix
una guarda d’analítica per evitar duplicats sense alterar el progrés. En la demo
es compta un nou intent si canvia la resposta; repetir el mateix enviament no
afegeix un recompte. La resposta queda només a la memòria local de la pàgina.
Un nou exercici reinicia aquesta guarda. Tornar a mostrar un resultat d’examen
no genera un altre lliurament; reiniciar l’examen sí que inicia una execució nova.

### Continuïtat històrica

No s’envien esdeveniments equivalents duplicats. Es conserven:

- `{curs}-numeric-{tema}-{guiat|autonom}`: inici de pràctica numèrica. Continua sent un inici; es pot comparar amb `mi/practice/started/...` dels altres sentits. A 4t s’hi afegeix `/A` o `/B` quan hi ha opció activa.
- `mi/exam/submitted/{curs}/{tema}`: lliurament per tema. Es conserva quan curs+ID identifiquen el sentit; a 4t s’hi afegeix `/A` o `/B`. Els IDs amb col·lisió afegeixen el sentit al camí, segons la taula següent.
- `mi/search/query/{context}/...` i `mi/search/{theory|practice|exam}/{context}/{tema}[/{A|B}]`: cerca i selecció.

Canvis necessaris des del **29-10-2026**:

| Clau antiga | Clau nova | Motiu |
|---|---|---|
| `4eso-numeric-{tema}-{mode}` | La mateixa base + `/A` o `/B` | Separar opcions al recompte |
| `mi/exam/submitted/4eso/{tema}` | La mateixa base + `/A` o `/B` | Separar opcions al recompte |
| `mi/exam/submitted/1eso/poligons` | La mateixa base + `/espacial` o `/estocastic` | L’ID es reutilitza entre sentits |
| `mi/exam/submitted/2eso/pitagores` | La mateixa base + `/espacial` o `/mesura` | L’ID es reutilitza entre sentits |
| `mi/exam/submitted/2eso/problemes` | La mateixa base + `/algebraic` o `/mesura` | L’ID es reutilitza entre sentits |
| `mi/exam/submitted/2eso/semblanca3r` | La mateixa base + `/espacial` o `/mesura` | L’ID es reutilitza entre sentits |

Sense opció activa, la base de 4t continua representant l’ús conjunt/sense opció.
Els recomptes anteriors agregats no es poden repartir retrospectivament entre
opcions o sentits. El títol és presentació, no una dimensió independent fiable:
les separacions necessàries es codifiquen al camí. Per comparar sèries totals,
agregar la base antiga amb els seus nous sufixos; per separar opcions/sentits,
fer servir les claus noves a partir de la data del canvi. No s’envia també la
clau antiga per compatibilitat.

## Cercador

Es manté el motor i els accessos existents als exàmens. No s’envia text lliure.
Una consulta d’almenys tres caràcters es compta després d’un segon sense escriure
(respectant la composició de teclat), i es confirma també abans d’escollir un resultat.
Una signatura normalitzada idèntica consecutiva no es torna a comptar. Les
categories són tema reconegut del catàleg, sentit únic, múltiples sentits o
`no-results`. El context és `general` o `{curs}eso`; cada selecció distingeix
teoria, pràctica i examen, i l’opció A/B quan correspon.

## Ampliar i consultar

Un tema nou al motor existent hereta els punts de seguiment; cal donar-li un ID
estable, incloure’l al catàleg del cercador i declarar correctament les opcions
i si és ampliació. Si reutilitza un ID dins del mateix curs, actualitzar
`ambiguousTopics`: la prova de guardes contrasta les col·lisions amb el catàleg.
En un motor nou, cridar `start`, `shown`, `answer`, `hint` i
`complete` a les transicions reals, mai en renderitzacions de progrés. Per als
exàmens, connectar inici després de generar les preguntes i lliurament després
de la guarda de finalització. Incloure el carregador compartit una sola vegada.
No passar respostes, enunciats, dades de localStorage, noms, correus, IDs de
sessió/dispositiu ni text lliure als mètodes d’analítica.

Als gràfics de visites, conservar el filtre **`is:pageview`**. Els registres
amb `event: true` són interaccions; consultar-los separadament per prefix i
agregar les claus d’inici numèriques històriques amb les dels altres sentits.
Cap interacció genera visites artificials.

## Validació reproduïble

Executar `node scripts/comprova-analitica-uniforme.cjs`. La prova serveix els
fitxers locals sota `mi.test`, intercepta totes les peticions, utilitza el client
de GoatCounter de `scripts/goatcounter-test-fixture.js` i captura el transport.
Cap petició de prova arriba al compte de producció. El JSON de resultats només
s’escriu si acaben totes les comprovacions. L’auditoria estàtica recorre els 279
HTML i compila els scripts; la prova funcional recorre les 20 combinacions.
La prova nova comprova també els inicis, que les proves antigues de lliurament
no exigien.

### Resultat executat

- Auditoria estàtica: 279 HTML amb un únic carregador compartit i scripts compilables.
- Motors funcionals: les 20 combinacions han passat inicis, encert/error, guarda
  de doble correcció, pistes, teoria des d’error i els dos tipus d’examen.
- Complementàries: cinc portades amb demos, cinc contextos de cerca i tres
  destinacions, problemes oberts/ampliació dels cinc sentits de 1r, opció A de
  4t en autònom i B en guiat, client o mòdul compartit bloquejats, localhost i `skipgc`.
- Evidència: `scripts/resultats-analitica-uniforme.json` i
  `scripts/resultats-analitica-uniforme-extres.json`. La segona execució es pot
  repetir amb `--extras-only`; valida també el motor obert algebraic.
- Guardes aïllades: `node scripts/comprova-analitica-guardes.cjs` comprova doble
  inicialització, doble inici, canvi immediat guiat/autònom i doble correcció/compleció,
  els camins exactes de les 20 combinacions i els vuit casos amb col·lisió de catàleg.

Les correccions ordinàries es proven cridant el motor real; els lliuraments per
tema, amb el botó real. Per provar compleció es crida el punt de marcatge del
motor; per al sentit s’avança l’índex al darrer pas. No es resol una ratxa sencera
ni totes les preguntes d’un examen. Els motors oberts sí que reben una resposta
al control i es corregeixen amb les seves funcions. Les proves comproven el
recompte i les guardes; no constitueixen una revalidació matemàtica dels generadors.

No queda cap combinació curs–sentit sense una prova funcional representativa.
No s’han provat tots els temes, les variants de resposta escrita de cada tema,
les ampliacions de tots els cursos, totes les plantilles aleatòries de demo ni
els 254 HTML de teoria al navegador: aquests darrers tenen cobertura estàtica i
una portada de teoria representativa amb transport. La recepció al panell de
producció i els filtres configurats al servidor no es validen localment.
