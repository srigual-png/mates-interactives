# Generador de fitxes de primer de sentit numèric

Revisió local de l’1 de novembre de 2026. Aquesta passada substitueix el criteri anterior d’Ampliació amb pocs reptes afegits. L’àmbit és exclusivament **1r d’ESO → sentit numèric**. La pràctica interactiva, els altres sentits i els adaptadors dels altres cursos no es reclassifiquen.

## Tipus de fitxa

Estàndard: «Per practicar i consolidar els continguts del curs.» Combina activitats bàsiques i mitjanes de procediment conegut, amb cobertura i varietat.

Ampliació: «Per aprofundir amb exercicis de més raonament i autonomia.» El motor cerca una majoria estricta i aproxima set activitats de raonament de cada deu. No mostra percentatges. Selecciona activitats inverses, condicionades, de detecció d’errors, interpretació o justificació; no es basa en la mida dels nombres o en la llargada del text.

Exemples de diferència real:

| Tema | Estàndard | Ampliació |
| --- | --- | --- |
| MCD/mcm | Calcular el MCD de dos nombres | Trobar quin candidat desconegut compleix un MCD donat i justificar els tres candidats |
| Potències | Calcular una potència | Explicar per què elevar al quadrat no equival a multiplicar per dos |
| Decimals | Arrodonir un nombre | Trobar els extrems de l’interval de decimals que s’arrodoneixen al mateix valor |
| Percentatges | Calcular un descompte | Desfer un descompte o explicar per què pujar i baixar el mateix percentatge no recupera el valor inicial |

## Inventari i famílies

L’adaptador revisa les 85 branques dels dotze generadors base, més els dos generadors especials previs. El banc nou `reasoning-1eso.js` afegeix **48 famílies**, quatre per tema, cadascuna amb dades estructurades, resposta i passos raonats. El banc visible de fitxes no inclou els bancs opcionals de pràctica que no consumeix aquest adaptador.

| Tema | Noves famílies de raonament |
| --- | --- |
| Naturals | Dividend invers; interval d’arrodoniment; error d’ordenació; estratègia distributiva |
| Sistema decimal | Xifra desconeguda; intercanvi invers; error del zero posicional; reagrupament |
| Operacions | Operand invers; diagnòstic de divisió; comparació d’ofertes; error distributiu |
| Potències/arrels | Exponent invers; error d’exponent; arrel acotada; falsa descomposició d’una arrel |
| Jerarquia | Elecció de parèntesis; primer error; casella inversa; equivalència distributiva |
| Divisibilitat | Xifra condicionada; factor compost; múltiples amb restriccions; contraexemple de primalitat |
| MCD/mcm | Error en MCD; MCD invers; mcm invers; coincidències dins d’un interval |
| Enters | Saldo inicial invers; error en restar un negatiu; distància/desplaçament; valor absolut amb condició |
| Decimals | Factor invers; error de coma; interval decimal; comparació de costos |
| Fraccions | Error de suma; complement invers; comparació amb productes creuats; total inicial desconegut |
| Proporcionalitat | Comparació de models; correcció de taula; antecedent invers; elecció d’estratègia |
| Percentatges | Preu invers; canvis successius; comparació de bases; error d’increment |

Els problemes contextuals rutinaris antics no s’han convertit automàticament en Ampliació. Es conserva la dificultat real de les activitats existents. Algunes famílies noves de raonament són de nivell mitjà: dificultat i exigència cognitiva continuen sent camps diferents. L’intercanvi posicional preexistent continua sent admissible com a raonament.

S’han unificat famílies que només diferien en la formulació: seleccionar un múltiple en divisibilitat i identificar base/exponent d’una potència i relacionar una potència amb la seva arrel exacta. Una clau de fet matemàtic evita repetir la mateixa arrel amb dues formulacions. El valor posicional comparteix família entre dos nivells, amb identificadors de generador separats; això evita reetiquetar-ne la dificultat o comptar-lo com a varietat nova.

## Metadades i selecció

Cada activitat separa tema, continguts, família, identificador de generador, variant, nivell real, exigència cognitiva i adequació a Estàndard/Ampliació. Les variants del banc nou conserven les dades numèriques internes; el format s’aplica només al text visible.

El motor reserva primer la cobertura mínima i distribueix la resta equilibradament entre temes. Genera bancs finits per família, sense consumir les bosses de pràctica. Afavoreix famílies menys utilitzades i rebutja duplicats i dades massa semblants. Cada família d’Ampliació admet un màxim de dues variants. Les substitucions es comproven contra la cobertura completa abans de formar part del resultat. Els reptes es reparteixen entre temes quan és possible. Barrejar només modifica l’ordre final.

El mínim es calcula mitjançant conjunts de continguts, amb suport per a activitats que en cobreixin més d’un. Els temes agrupats revisats són:

- **MCD i mcm**: tots dos continguts són obligatoris; les activitats separades tenen diferència màxima d’una. També es conserva quan es combinen amb altres temes.
- **Potències i arrels**: tots dos continguts són obligatoris; el mínim actual seleccionable és de dues activitats.

Els altres deu temes es consideren unitats de cobertura, amb procediments interns distingits per famílies. Aquesta estructura és explícita, no derivada del títol.

## Correccions matemàtiques i de text

- Arrodoniments naturals i decimals: excloure valors ja exactes a la unitat d’arrodoniment; càlcul amb enters escalats en decimals i casos en totes dues direccions.
- Divisions: explicitar exacta o quocient enter/residu i reconstruir la resposta a partir de dividend i divisor. La regressió 1154 ÷ 14 dona quocient 82 i residu 6, mai «exacta».
- Descomposicions: indicar suma posicional o factors primers. La regressió 67898 dona 60000 + 7000 + 800 + 90 + 8.
- Fraccions equivalents: eliminar distractors matemàticament equivalents a la resposta, encara que tinguin una escriptura diferent.
- Evitar canvis monetaris nuls accidentals, valors posicionals nuls no intencionats, factors fraccionaris unitaris o recíprocs trivials i taules proporcionals amb la mateixa dada repetida.
- Explicitar els repartiments a parts iguals i completar les dades i les unitats de resposta.
- Concordança de tots els recipients de MCD: estoigs, cistelles, paquets, lots, safates, bosses, capses i jocs. Metadades de gènere per a idèntics/idèntiques i Quants/Quantes.
- Periodicitat: coincidència inicial explícita i acció concreta per a llums, semàfors, alarmes, aspersors, màquines, activitats, indicadors i autobusos.
- Accents i expressions matemàtiques revisats per branca, incloses fraccions equivalents, descomposicions i el plural de sabatilles.
- Coma decimal, menys matemàtic −, signe × també al costat de claudàtors i exponents, i punt i coma en llistes ordenables. Arguments de MCD/mcm amb punt i coma per no confondre’ls amb decimals.
- Raons de taules proporcionals expressades exactament com a fraccions, sense decimals periòdics truncats sense indicar-ho.

Les correccions s’apliquen a la frontera del generador de paper; no es fan substitucions massives sobre el codi dels generadors de pràctica.

## Exportacions i mostres

Una sola selecció numerada alimenta Word, PDF i solucionaris. Es mantenen formats individuals, exportació doble i reintents amb el mateix model. S’han conservat les equacions natives i l’estil existent. El text exportat mostra el tipus de fitxa.

`output/fitxes-revisio-1eso/manifest.json` registra quatre configuracions comparables de 10 exercicis: MCD/mcm sol i operacions/potències/decimals, cadascuna en Estàndard i Ampliació. Les dues mostres d’Ampliació tenen set activitats de raonament i les mateixes garanties de cobertura. Inclouen Word, PDF i solucionaris.

## Proves i límits

- `scripts/fitxes/test.cjs`: 96 configuracions, vuit llavors de cobertura, proves per tema i quantitats màximes, tipus inicial, absència de controls antics, majoria de raonament, límit per família, continguts agrupats, ordre, mínims, banc limitat, alternativa Estàndard, reintents, mòbil, teclat, pràctica i examen.
- `scripts/fitxes/audit-1eso.cjs`: 32 llavors per cadascuna de les 85 branques i de les 48 famílies noves, més 64 casos dels generadors especials. Càlculs independents de les respostes, comprovacions de domini, unicitat, llengua i format; recorregut explícit dels contextos finits i les taules de conversió.
- `scripts/fitxes/verify-documents.py` i `verify-samples-1eso.py`: comparació de tot el contingut, dades i ordre dels Word/PDF amb els models i els solucionaris, així com els símbols i el tipus de fitxa.
- Regressions de 2n, 3r i 4t: 132, 113 i 80 tipus, respectivament, amb 24 combinacions individuals per curs; correctes.

**Limitació real:** quatre famílies noves per tema permeten vuit variants diferents d’Ampliació com a màxim, més l’eventual família antiga admissible. No es pot garantir el criteri de set de cada deu per a totes les fitxes de 30 preguntes d’un únic tema. El motor ho detecta, no exporta una Ampliació insuficient i proposa una quantitat menor o Estàndard. La capacitat augmenta seleccionant més temes. Caldrien més estructures diferents per eliminar aquest límit; no es resol repetint dades ni reetiquetant pràctica.

La revisió cobreix totes les branques i contextos inventariats, amb mostreig finit de dades; no és una prova formal de tots els nombres possibles. El procediment reutilitzable és a `docs/procediment-revisio-fitxes.md`.

## Fitxers d’aquesta passada

`1eso/sentit-numeric.html`; `assets/js/fitxes/core.js`, `numeric-1eso.js`, `reasoning-1eso.js`, `ui.js`, `export.js`; `scripts/fitxes/test.cjs`, `audit-1eso.cjs`, `samples-1eso.cjs`, `verify-samples-1eso.py`, `verify-documents.py`, `render-samples-1eso.ps1`, `render-samples-1eso.py`; `docs/generador-fitxes.md`, `procediment-revisio-fitxes.md` i l’inventari revisat. Les mostres i els seus models es desen a `output/fitxes-revisio-1eso/`.

## Tancament de la revisió

Informe consolidat el 3 de novembre de 2026 a partir de les proves acabades l’1 de novembre.

- 96 configuracions del selector i les proves de UI, reintents, formats, mòbil, pràctica i examen: correctes.
- 4.320 casos matemàtics: 2.720 de les 85 branques base, 1.536 de les 48 famílies noves i 64 dels dos generadors especials; correctes. 172 recorreguts explícits de contextos i taules; correctes. S’ha comprovat també que l’opció correcta no ocupa una posició fixa.
- Les regressions de 2n, 3r i 4t han passat sense activar-hi el nou sistema.
- Quatre models comparables, amb 16 documents finals (Word/PDF, fitxes/solucionaris): contingut i ordre contrastats amb els models. Les dues fitxes d’Ampliació tenen 7 activitats de raonament de 10.
- Inspecció visual de les 40 pàgines de les mostres finals: 20 de PDF natiu i 20 de Word renderitzat. Sense retallades, superposicions ni símbols perduts. El renderer empaquetat no trobava LibreOffice; s’han obert els vuit DOCX en lectura i renderitzat amb Microsoft Word instal·lat.
- S’ha corregit una repetició de la mateixa arrel amb dues formulacions i s’ha afegit una regressió de la clau de fet matemàtic.

Les mostres es poden regenerar amb `samples-1eso.cjs`, verificar amb `verify-samples-1eso.py` i renderitzar amb `render-samples-1eso.ps1` i `render-samples-1eso.py`. El paquet `output/fitxes-revisio-1eso.zip` inclou els documents, solucionaris i models del manifest, sense els PNG de QA.

Publicació autoritzada el 3 de novembre de 2026. Les comprovacions del desplegament es registren separadament de les proves locals.
