# Generador de fitxes: Estàndard i Ampliació

Pilot exclusiu de **1r d’ESO → sentit numèric**, revisat l’1 de novembre de 2026. Substitueix el selector anterior per «Tipus de fitxa»: Estàndard (inicial) i Ampliació. Els altres cursos mantenen la interfície i el motor percentuals existents. No s’activen altres sentits.

## Formulari i documents

- Estàndard: «Per practicar i consolidar els continguts del curs.»
- Ampliació: «Inclou reptes de raonament per aprofundir en els continguts.»

Es mantenen quantitat (1–30), temes, ordre, espai, Word/PDF/ambdós i solucionari separat. La configuració inicial continua amb 15 exercicis i els primers 10 temes. El resum i tots els documents indiquen «Tipus de fitxa: Estàndard» o «Tipus de fitxa: Ampliació». El pilot no mostra selectors ni validacions dels perfils antics o dels percentatges.

Si no hi ha cap repte adequat, el formulari ho explica, bloqueja la descàrrega d’Ampliació i ofereix el botó **Genera una fitxa Estàndard**. El botó canvia explícitament el tipus i genera amb les altres opcions seleccionades. Si les metadades indiquen reptes però el banc de candidats no en proporciona cap d’utilitzable, el motor retorna `NO_CHALLENGES` i la interfície ofereix la mateixa alternativa. No es genera mai Ampliació sense reptes. No hi ha avisos rutinaris per tenir-ne pocs.

## Metadades i revisió dels reptes

`numeric-1eso.js` conserva les famílies revisades de les branques `type`, el contingut treballat i la dificultat real. Afegeix explícitament:

- `standard`: activitat de pràctica bàsica o mitjana revisada.
- `challenge`: adequació com a repte, independent del nivell.
- `challengeReason`: què exigeix el repte i per què s’admet.

Cada variant té una clau d’enunciat/opcions i una signatura de família, dades i resposta. Canviar dades o contextos no crea una família. Les expressions senzilles amb productes i sumes comparteixen família, com les expressions amb parèntesis; entrades, receptes i distàncies de proporcionalitat comparteixen el valor unitari.

Famílies admeses com a reptes, després de revisar enunciat i solucionari:

| Tema | Família | Exigència |
| --- | --- | --- |
| Naturals | Producció i reserva | Relacionar producció per màquina, total i reserva |
| Sistema decimal | Intercanvi posicional | Connectar posició, nombre resultant i variació de valor |
| Jerarquia | Compra | Construir el cost amb quantitats, descompte i enviament |
| Divisibilitat | Agrupacions | Decidir dos agrupaments i justificar-los amb residus |
| MCD/mcm | Repartiment màxim | Identificar el MCD i interpretar els grups |
| Enters | Saldo | Connectar saldo inicial, ingrés i retirada |
| Decimals | Error relatiu | Relacionar error absolut, valor exacte i percentatge |
| Fraccions | Romanent | Calcular la part utilitzada i la quantitat restant |
| Proporcionalitat | Comprovar taula | Comparar totes les raons i decidir la proporcionalitat |

La comprovació de taules és de nivell mitjà i s’admet com a repte. En canvi, les expressions avançades de potències/arrels, les expressions llargues amb claudàtors, el producte encadenat de producció, les taxes decimals, els problemes proporcionals rutinaris i l’enquesta percentual no es converteixen automàticament en reptes. Els seus nivells originals es conserven; les activitats altes no admeses com a repte queden fora dels dos tipus de fitxa d’aquest pilot. No s’han afegit preguntes obertes ni s’han canviat càlculs o solucions dels generadors de pràctica.

## Cobertura i selecció

1. Calcular la cobertura mínima de cada tema amb els continguts explícits i les activitats estàndard disponibles. L’algoritme de conjunts permet que una activitat cobreixi diversos continguts. Reservar el mínim i repartir les places restants entre els temes amb menys exercicis.
2. Construir bancs finits de candidats: com a màxim 240 intents per nivell disponible i tema. Excloure enunciats de la versió anterior i activitats repetides. No es consumeixen les bosses de pràctica.
3. Generar la base Estàndard: només activitats `standard`, prioritzant cobertura, famílies menys utilitzades i una preferència flexible alternada de nivells mitjà/bàsic. No hi ha quotes obligatòries de dificultat.
4. A Ampliació, substituir activitats de la base per reptes revisats, comprovant després de cada substitució que es conserva tota la cobertura i l’equilibri intern del tema. Com a orientació interna s’explora aproximadament un repte per cada tres exercicis; si només hi ha un o dos reptes adequats, es conserva aquesta quantitat. Si el banc estàndard és limitat, es poden completar les places amb reptes vàlids disponibles.
5. Prioritzar temes amb menys reptes i després famílies noves. Cada família de reptes admet com a màxim dues variants; les variants massa semblants es rebutgen. Les activitats estàndard repetides es reparteixen entre famílies segons l’ús acumulat.
6. No exportar seleccions incompletes. Oferir una quantitat menor que també respecti una nova assignació equilibrada entre temes. Si no hi ha cobertura viable, indicar que cal reduir la selecció.

La semblança de dades rebutja variants de la mateixa família que comparteixen almenys el 80 % dels valors numèrics diferents, a més de la signatura família/dades/resposta. És una heurística conservadora, no una certificació d’equivalència semàntica de qualsevol enunciat.

**Temes agrupats identificats:**

- **MCD i mcm**: continguts obligatoris `mcd` i `mcm`. Càlcul MCD i repartiment màxim només cobreixen MCD; mcm de dos/tres nombres i periodicitat només cobreixen mcm. Tant sol com combinat amb altres temes, hi ha cobertura de tots dos i diferència màxima d’un exercici entre activitats separades. Mínim actual: dues activitats en tots dos tipus.
- **Potències i arrels**: continguts obligatoris `potencies` i `arrels`. La combinada alta cobreix tots dos però no s’ha admès com a repte perquè només combina càlculs. El banc seleccionable actual necessita dues activitats en tots dos tipus.

S’han revisat els altres deu temes: naturals, sistema decimal, operacions bàsiques, jerarquia, divisibilitat, enters, decimals, fraccions, proporcionalitat i percentatges. Es consideren unitats de cobertura; els procediments interns es representen com a famílies per afavorir varietat. Aquesta estructura no es dedueix de la conjunció del títol.

L’ordre barrejat només permuta el resultat final. Una sola selecció numerada alimenta Word, PDF i solucionaris. Un reintent d’exportació reutilitza el model pendent. Es conserven les equacions natives de Word i la composició matemàtica del PDF.

## Mancances reals del banc

- No s’han admès reptes en **operacions bàsiques, potències/arrels ni percentatges**: les famílies altes actuals no aporten prou raonament addicional respecte del procediment rutinari. Ampliació d’aquests temes sols ofereix explícitament Estàndard.
- Els altres nou temes només tenen una família admesa com a repte cadascun: mai s’hi utilitzen més de dues variants.
- En MCD/mcm, l’únic repte és de MCD; no hi ha repte de mcm revisat ni família mitjana de MCD. La resta d’activitats conserva la cobertura equilibrada.
- No hi ha arrels de nivell baix; Estàndard les cobreix amb activitats mitjanes.
- Les fitxes llargues poden repetir famílies estàndard amb dades prou diferents. No es presenta aquesta repetició com a tipologies noves.

## Validació

- `node scripts/fitxes/test.cjs`: matriu de 93 configuracions amb vuit llavors per a cobertura de MCD/mcm sol, combinat i catàleg complet; tots els temes individualment, tots dos tipus, dos ordres i quantitats màximes de 30 exercicis. Casos addicionals: una variant de repte, dues variants, banc estàndard limitat completat amb reptes, quantitat inviable, proposta viable equilibrada, mínims, absència de controls antics i distinció entre nivell i repte. Proves de UI, alternativa Estàndard, formats, solucionaris, reintent, mòbil, teclat, pràctica i examen.
- `scripts/fitxes/verify-documents.py`: comparació del contingut i ordre complets de Word/PDF/solucionari amb el model, etiqueta del tipus, A4 i OMML. Mostra Estàndard, mostra matemàtica i mostra Ampliació sense modificar els reptes.
- `test-2eso.cjs`, `test-3eso.cjs`, `test-4eso.cjs`: regressions dels cursos no activats; 132, 113 i 80 tipus, respectivament, i 24 combinacions individuals per curs.

Fitxers modificats: `assets/js/fitxes/core.js`, `numeric-1eso.js`, `ui.js`, `export.js`, `scripts/fitxes/test.cjs`, `verify-documents.py` i aquest document. El generador matemàtic de pràctica i el corrector no es modifiquen.

### Resultats de l’execució

93 configuracions de la matriu principal i els casos sintètics addicionals: correctes. Els tres casos de temes sense reptes retornen explícitament l’alternativa Estàndard. UI, formats individuals, solucionaris, reintent, mòbil, teclat, pràctica i examen: correctes. Les tres regressions dels cursos no activats també han passat.

Comparació final de sis parelles Word/PDF (fitxa i solucionari de tres models): tot el text, respostes, dades i ordre coincideixen amb el model. Les mostres PDF sumen 17 pàgines. Sis DOCX oberts en lectura i renderitzats amb Microsoft Word. Revisió visual del formulari i de la primera pàgina de la fitxa Ampliació en PDF i Word: correcta; no s’ha fet una revisió visual exhaustiva de totes les pàgines. Comprovacions sintàctiques dels quatre JavaScript d’implementació i de la prova: correctes.
