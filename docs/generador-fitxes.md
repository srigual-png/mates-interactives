# Generador de fitxes de Mates Interactives

Primera implementació el 30 d’octubre de 2026 a la portada del sentit numèric de 1r d’ESO. Posteriorment s’ha incorporat el sentit numèric de 2n reutilitzant aquest motor: vegeu [la documentació de 2n](generador-fitxes-2eso.md). Les altres portades no s’han activat.

## Fitxers

- `1eso/sentit-numeric.html`: incorpora els scripts i estils del generador.
- `assets/js/fitxes/core.js`: validació, restes més grans, assignació equilibrada amb flux de cost mínim, unicitat, ordre i identificador de versió.
- `assets/js/fitxes/numeric-1eso.js`: configuració, catàleg derivat de `TOPICS`, classificació de dificultat i adaptacions al paper.
- `assets/js/fitxes/ui.js`: formulari, estats, descàrregues, reintents i esdeveniments GoatCounter a través de `MIAnalytics.track`.
- `assets/js/fitxes/export.js`: model compartit de contingut, paginació, Word editable amb equacions OMML i PDF real amb font incrustada.
- `assets/css/fitxes.css`: estils responsius, controls i focus visible.
- `assets/vendor/fitxes/`: versions locals de docx, pdf-lib, fontkit i Liberation Sans, amb procedència i llicències.
- `scripts/fitxes/test.cjs`, `verify-documents.py`, `render-word.ps1` i `inspect.cjs`: proves i inspecció del catàleg i dels documents.

## Temes i dificultats

Els 12 temes curriculars admeten dificultat baixa, mitjana i alta: nombres naturals, sistema de numeració decimal, operacions bàsiques, potències i arrels, jerarquia d’operacions, divisibilitat, mcm i MCD, enters, decimals, fraccions, proporcionalitat directa i percentatges. No hi ha cap tema curricular exclòs. La notació científica és una ampliació de 2n i no s’hi inclou.

S’utilitza `diff` dels generadors, independent del mode guiat/autònom. Proporcionalitat segueix la classificació matemàtica del mode examen de tema. En potències i arrels, el nivell alt combina potències, arrels exactes i jerarquia. En numeració decimal, el nivell alt requereix intercanviar posicions i calcular la variació del valor; la identificació contextual d’una xifra es considera mitjana.

Els generadors base comparteixen els càlculs existents sense consumir les bosses de pràctica. No s’ha modificat `validacio-respostes.js`, la correcció d’equivalències ni el codi dels exàmens.

## Adaptació al paper

- Divisibilitat conserva les opcions que constitueixen les dades de la pregunta; fraccions equivalents també.
- Les conversions fracció/decimal/percentatge demanen explícitament els dos formats de resposta.
- La reconstrucció del sistema decimal incorpora una llegenda de les abreviatures.
- Els problemes de periodicitat indiquen que els esdeveniments coincideixen inicialment.
- Les solucions de mcm/MCD inclouen les factoritzacions dels nombres generats i, en repartiments, la composició dels grups.
- Divisibilitat mostra divisions amb residus concrets; les preguntes sobre primers comproven els possibles divisors fins a l’arrel quadrada.
- Les taules proporcionals del catàleg ja expressen totes les parelles de dades en text. No hi ha figures interactives necessàries en aquests generadors.
- Les potències, fraccions i arrels es representen amb equacions natives de Word i composició vectorial en PDF; el text és editable al Word.

## Funcionament

Tots els camps són desplegables. Els temes utilitzen `details/summary` amb caselles etiquetades, selecció total, resum visible i tancament amb Escape. Inicialment se seleccionen els primers 10 temes, amb 10 exercicis i percentatges 40/40/20, per disposar d’una configuració vàlida. Seleccionar els 12 temes amb 10 exercicis mostra el motiu i bloqueja la generació.

Les opcions percentuals incompatibles es desactiven sense modificar els valors existents. La generació exigeix exactament el 100 %. Les restes més grans conserven el total; els empats es resolen baixa, mitjana, alta. El flux de cost mínim assigna quotes de dificultat a cada tema i comprova una diferència màxima d’un exercici entre temes. Les combinacions de suport incompatibles es detecten abans de generar.

Els intents es limiten a 1.200 per tema i nivell. Si no hi ha prou exercicis diferents, es mostra un error recuperable. En una altra versió també s’exclouen els enunciats de la versió anterior. L’ordre agrupat conserva l’ordre del catàleg i ordena cada bloc per dificultat. L’ordre barrejat comença amb un exercici baix si n’hi ha i intercala els alts mentre quedin altres nivells.

Un únic conjunt immutable de dades alimenta totes les exportacions. El solucionari usa el mateix ordre i numeració i es descarrega separat. Els enllaços mantenen els mateixos blobs fins que es canvia la configuració o es genera una nova versió. Si falla l’exportació, el reintent conserva el conjunt pendent. Els clics simultanis estan bloquejats.

Els documents són A4, amb marca, títol, camps per a nom/grup/data, versió compartida, paginació i referència web. Els exercicis es paginen com a blocs indivisibles. No es mostra la dificultat. La configuració d’espai determina el blanc disponible per respondre.

Tot funciona al navegador sobre un allotjament estàtic com GitHub Pages. Les dependències d’exportació es carreguen sota demanda des del mateix lloc, sense CDN en temps d’execució. La font i pdf-lib s’usen també per mesurar la paginació de Word. No hi ha servidor de generació, compte, claus, servei d’IA ni cookies afegides. L’analítica només registra l’acció, l’àmbit i el format; no envia continguts ni dades de l’alumnat, i els errors d’analítica no interrompen la funcionalitat.

## Verificació

Executat `node scripts/fitxes/test.cjs` amb Edge:

- 36 combinacions individuals: 12 temes × 3 dificultats al 100 %.
- Percentatges compatibles, total incomplet bloquejat, restes més grans amb 5, 15 i 25 exercicis.
- Equilibri i quotes exactes amb 15, 25 i 30 exercicis, incloent cada nivell al 100 %.
- Combinacions impossibles, límit de reintents i absència de duplicats.
- Ordre agrupat/barrejat i nova versió sense repetir els enunciats anteriors.
- Descàrrega efectiva, quatre documents en mode Word + PDF, formats individuals, sense solucionari i només respostes.
- Canvi de configuració, recuperació d’error conservant els exercicis i fallada d’analítica simulada.
- Pantalla de 390 px sense desbordament, selecció amb teclat i Escape, retorn a pràctica, examen global i validació de 2/4 com a equivalent de 1/2.

`verify-documents.py` obre els DOCX com a paquets OOXML i els PDF amb pypdf: comprova que tots els enunciats, opcions, passos i respostes del model hi són en el mateix ordre, l’A4 i l’identificador de versió. Les mostres específiques inclouen fraccions, potències i arrels amb elements OMML.

S’han obert i renderitzat quatre DOCX amb Microsoft Word en lectura i els PDF amb Poppler; s’han inspeccionat visualment les 26 pàgines d’una primera sèrie, incloent problemes llargs. El renderer `render_docx.py` no podia funcionar perquè no hi ha LibreOffice; la comprovació de Word s’ha fet amb el Word instal·lat. Les mostres i captures es desen a `tmp/fitxes/`.

També ha passat `node comprova-examens-tema.cjs`, la regressió existent de 20 temes numèrics i de mesura, amb correcció, puntuació, reinici, retorn a pràctica i examen global de 20 preguntes.

## Límits i ampliació

La revisió s’ha executat amb Edge i Microsoft Word; no s’ha fet una matriu completa de navegadors ni lectors de pantalla. La maqueta exacta pot variar entre editors Word, però el contingut, l’ordre i les equacions són natius. La càrrega de fonts requereix servir la web per HTTP(S), com a GitHub Pages; per provar-la localment cal un servidor estàtic.

Les mostres de generació són aleatòries: no s’ha verificat exhaustivament tot el banc matemàtic preexistent. Els intents estan limitats i comuniquen qualsevol insuficiència. No hi ha temes de l’abast inicial pendents de suport.

Exemples de la darrera execució: [fitxa Word](fitxes-exemples/fitxa-exemple.docx), [fitxa PDF](fitxes-exemples/fitxa-exemple.pdf), [solucionari Word](fitxes-exemples/solucionari-exemple.docx) i [solucionari PDF](fitxes-exemples/solucionari-exemple.pdf).

Per incorporar el següent sentit, afegir un adaptador que derivi el seu catàleg real, declari els nivells suportats i retorni `question`, `answer`, `steps`, `options` i `level`. Cal adaptar les figures/taules que en aquell sentit siguin necessàries, ampliar el model i els dos exportadors si incorporen visuals, carregar l’adaptador només a la portada escollida i repetir les proves de repartiment, matemàtiques i documents. El motor i el formulari es poden reutilitzar.

## Revisió de claredat dels enunciats

Arran de revisar una fitxa descarregada, s’ha revisat la redacció de tots els seus exercicis i de les famílies de preguntes relacionades. L’adaptador de paper diferencia explícitament els dos intervals dels problemes de periodicitat, situa la coincidència inicial abans de la pregunta i pregunta per la pròxima coincidència de les sortides o dels esdeveniments. Els problemes de fraccions indiquen qui disposa de la quantitat inicial, quina part utilitza o retira i de quins objectes es pregunta el romanent; les reserves es distingeixen dels objectes encara sense reservar.

També s’han aclarit el valor d’una xifra en unitats, l’escriptura d’una potència com a producte de factors iguals, la descomposició en factors primers, el valor exacte i l’aproximat, els saldos bancaris i la producció per torns. Els problemes amb taxes fan servir el verb i la magnitud del seu context (caminar, circular, cabal d’aigua, producció o desplaçament de la cinta) en lloc de preguntar genèricament què es recorre o produeix. Es mantenen les dades, els nivells i les respostes dels generadors existents. Les proves inclouen els casos de 30/45 minuts i de 30 objectes amb una fracció d’1/3.
