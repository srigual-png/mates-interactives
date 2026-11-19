# 3r ESO · Sentit numèric · Bloc 1 — Nombres racionals

> Pilot documental de revisió completa d’un bloc. Estat: documentació completada; validació visual/interactiva no acreditada. No s’assumeix que calgui afegir N3 si no hi ha un procediment curricular que el justifiqui.

## Abast i inventari inicial

El bloc racionals3r té **12 tipus ordinaris**: conversió fracció→decimal; decimal→fracció irreductible; comparació; ordenació; suma/resta; producte/divisió; operació decimal-fracció; operació combinada; equació additiva inversa; interval de resultat; fraccions d’una quantitat en dues etapes; estimació/validació del signe i magnitud.

Classificació desada a REVIEWED_LEVELS: 7 N1 i 5 N2, cap N3. Revisió-punt3 té una reclassificació prèvia marcada reclassified-with-gaps. Cal comprovar les raons i no tornar a fer el cens o les proves ja desades.

## Evidència existent

- docs/dificultats/revisio-3eso-numeric-punt3.json: 12 tipus de racionals amb propostes de nivell, motius i mostres.
- docs/dificultats/resultats-punt3-3eso-numeric.json: 3.000 mostres registrades per tema, cobertura i selecció d’examen; per racionals indica 9 camins N1 i 5 N2, amb selecció d’examen 6/6. Els 9 camins N1 són els 7 tipus N1 més dues variants N1: `racionals3r:8` quan es cancel·la el parèntesi i `racionals3r:10` quan la diferència és un enter. banksReviewed=0, bankChecks buit i pageErrors buit: no acrediten revisió visual ni de bancs.
- El resultat simulat no s’ha de comptar com a validació de 3.000 exercicis únics. No repetir execucions sense canvi material de codi o d’oracle.

## Contrast curricular

Font oficial: [XTEC, Orientacions curriculars de Matemàtiques per cursos, proposta de 3r ESO, sentit numèric, p. 18](https://xtec.gencat.cat/web/.content/curriculum/eso/concrecions-curriculars/Orientacions-curriculars_MAT_SEC_per-cursos.pdf). El curs inclou classificació dels racionals, conversió fracció-decimal, operacions i propietats en contextos, interpretació i validació de resultats i estimació. També cal distingir el que és propi d’aquest bloc del que correspon a fracció generatriu, nombres reals, aproximacions o proporcionalitat.

## Sis passos del pilot

1. Confirmar inventari real de tipus, branques i nivells actius.
2. Comparar tipus i deduplicar procediments equivalents; justificar mateixa família, variant o tasca diferent.
3. Proposar nivells amb justificació curricular i exemples resolts, errors típics i casos límit.
4. Detectar mancances reals i proposar exercicis nous només si completen una habilitat no coberta; no forçar cap quota de N3.
5. Revisar modes guiat, autònom i examen amb la millor evidència existent; deixar explícit què és estàtic, simulat o visual.
6. Si s’apliquen canvis funcionals, executar una sola integració al final i reutilitzar les evidències vigents sobre codi sense canvis.

El resultat d’aquest pilot servirà per fixar una plantilla eficient per als blocs següents. La PR es manté en Draft durant aquesta passada; no inclou fusió, publicació ni canvis de producció.

## Resultat del pilot: mapa de famílies i nivells

S’han contrastat els 12 tipus del generador amb les mostres i la reclassificació ja desades. Els codis de família d’aquesta taula són una proposta per aquest dictamen, no s’han escrit a families-validades.json.

| Tipus | Procediment i família proposada | Nivell | Decisió |
|---|---|---|---|
| 1 | Fracció → decimal, F1 | N1 | Mateixa família de conversió que T2 en sentit invers; variant de representació/direcció. |
| 2 | Decimal exacte → fracció irreductible, F1 | N1 | Variant inversa de F1; requereix denominador 10, 100… i simplificar. |
| 3 | Comparar racional en fracció i decimal, F2 | N1 | Comparació de dues quantitats; tasca diferent de l’ordenació de quatre entrades. |
| 4 | Ordenar quatre racionals en representacions mixtes, F3 | N2 | Tasca diferent de F2: normalitzar diverses representacions i ordenar el conjunt. |
| 5 | Suma/resta de fraccions, F4 | N1 | Mateixa família d’operació additiva amb signes i denominadors diferents; no elevar només per signe negatiu. |
| 6 | Producte o divisió de fraccions, F5 | N1 | Mateixa família de càlcul multiplicatiu amb la divisió com a variant de recíproc; confirmar cobertura equilibrada de totes dues operacions al banc. |
| 7 | Suma d’un decimal i una fracció, F4 | N2 | Variant de F4 que exigeix convertir/coordinar representacions. |
| 8 | Operació combinada amb parèntesis i jerarquia, F6 | N2; variant `cancelled` N1 | Tasca diferent: seleccionar ordre d’operacions i després operar; si el parèntesi queda en zero, la branca és un cas directe N1. |
| 9 | Racional desconegut en x+a=c, F7 | N1 | Operació inversa additiva; família diferent de càlcul directe, però procediment d’un sol pas. |
| 10 | Acotar resultat en un interval, F8 | N2; variant `integer` N1 | Tasca d’estimació i interpretació d’interval semiobert, no càlcul exacte; si la diferència ja és un enter, localitzar-la a l’extrem inclòs és N1. |
| 11 | Fracció aplicada a una quantitat ja fraccionària, F9 | N2 | Aplicació contextual en dues etapes; procediment multiplicatiu en context. |
| 12 | Validar signe i magnitud abans del càlcul, F10 | N1 | Estimació/raonabilitat; tasca diferent del càlcul exacte. |

La classificació revisada existent dona, per tipus únic, N1 per 1,2,3,5,6,9,12 i N2 per 4,7,8,10,11. Els tipus 8 i 10 tenen, a més, les variants N1 indicades a la taula: `cancelled` i `integer`. Això explica exactament la cobertura simulada de 9 camins N1 i 5 N2; no s’ha de confondre amb els 12 tipus únics. **No es proposa N3**: no hi ha evidència d’un procediment curricular genuïnament nou d’alta demanda dins d’aquest bloc. Les operacions negatives, fraccions impròpies o nombres més llargs no creen per si sols un nou nivell.

### Fitxes pedagògiques

#### F1. Conversió entre fracció i decimal (tipus 1 i 2)

- **Decisió:** mateixa família de representació equivalent, amb direccions inverses com a variants.
- **Nivell:** N1 per divisions simples i decimals finits exactes.
- **Exemple A:** 3/4 = 3 ÷ 4 = 0,75.
- **Exemple B:** 0,35 = 35/100 = 7/20.
- **Errors típics:** posar el numerador sobre 10 sense comptar decimals; oblidar simplificar; confondre decimal exacte amb periòdic.
- **Límit:** el tipus 2 només és directe per decimals finits; periòdics exigeixen fracció generatriu, que pertany al Bloc 2. No ampliar silenciosament aquest tipus.

#### F2. Comparació de dos racionals (tipus 3)

- **Decisió:** tasca diferent de F3 perquè només compara dues quantitats.
- **Nivell:** N1 si cal una sola conversió o comparació; la comparació de negatius és el cas límit que cal assegurar al banc.
- **Exemple A:** 9/8=1,125; com que 1,125<1,22, és més petit.
- **Exemple B:** −3/4=−0,75; per tant són iguals.
- **Errors típics:** pensar que decimal amb més xifres és més gran; comparar valors absoluts i ignorar el signe.
- **Límit:** nombres negatius i equivalència exacta (com −3/4 i −0,75) han de tenir resposta inequívoca.

#### F3. Ordenació de representacions mixtes (tipus 4)

- **Decisió:** tasca diferent de F2; cal comparar tot el conjunt.
- **Nivell:** N2 perquè s’han de normalitzar més de dues representacions i controlar el signe.
- **Exemple A:** −0,4 < 1/5 < 1/2 < 5/8, ja que 1/5=0,2 i 5/8=0,625.
- **Exemple B:** −3/4 < −0,4 < 1/2 < 1,25, ja que −3/4=−0,75.
- **Errors típics:** ordenar els negatius de dreta a esquerra; comparar numeradors sense denominador comú.
- **Límit:** si dues formes són equivalents, acceptar igualtat o especificar com es representen empats.

#### F4. Suma/resta de racionals (tipus 5 i 7)

- **Decisió:** mateixa família; tipus 7 és variant decimal-fracció que requereix conversió.
- **Nivell:** N1 per fraccions amb denominador comú o suma/resta directa; N2 per coordinar decimal i fracció.
- **Exemple A:** 2/3−1/6=4/6−1/6=1/2.
- **Exemple B:** −0,5+3/4=−1/2+3/4=1/4.
- **Errors típics:** sumar denominadors; perdre el signe de la resta; convertir 0,5 en 5/10 i no simplificar.
- **Límit:** denominadors i decimals han de produir representacions exactes o instruir sobre arrodoniment.

#### F5. Producte i divisió de fraccions (tipus 6)

- **Decisió:** família multiplicativa comuna, producte i divisió són variants de procediment; assegurar que cap de les dues quedi anecdòtica.
- **Nivell:** N1, amb simplificació com a procediment estàndard.
- **Exemple A:** 7/4×1/3=7/12.
- **Exemple B:** 1/5÷7/2=1/5×2/7=2/35.
- **Errors típics:** dividir numerador per numerador i denominador per denominador; oblidar invertir només el divisor.
- **Límit:** divisor zero no s’ha de generar; simplificar abans o després ha de donar la mateixa forma irreductible.

#### F6. Jerarquia amb racionals (tipus 8)

- **Decisió:** tasca diferent de F4 perquè cal resoldre parèntesis i prioritat abans d’operar.
- **Nivell:** N2 en la branca ordinària; la variant `cancelled` queda a N1 perquè el parèntesi dona zero i no cal resoldre la cadena general.
- **Exemple A:** (1/2−2/3)×4/5=(−1/6)×4/5=−2/15.
- **Exemple B:** (3/4+1/2)÷5/2=(5/4)×2/5=1/2.
- **Errors típics:** multiplicar abans de resoldre parèntesis; oblidar que dividir per fracció és multiplicar pel recíproc.
- **Límit:** si hi ha múltiples operacions del mateix rang, l’associativitat i els parèntesis han de quedar visibles.

#### F7. Operació inversa, trobar x (tipus 9)

- **Decisió:** tasca pròpia d’equivalència/inversió, tot i compartir resta amb F4.
- **Nivell:** N1 quan és x+a=c i una sola operació inversa.
- **Exemple A:** x+4/3=7/3 → x=1.
- **Exemple B:** x+1=−1/3 → x=−4/3.
- **Errors típics:** sumar el terme conegut en lloc de restar-lo; no verificar substituint.
- **Límit:** la resposta pot ser enter encara que les dades siguin fraccions; evitar distractors equivalents no únics.

#### F8. Estimació d’interval (tipus 10)

- **Decisió:** estimació/representació d’interval, diferent del càlcul exacte.
- **Nivell:** N2 per estimar, situar i interpretar extrems inclosos/exclosos; la variant `integer` queda a N1 quan el resultat és enter i només cal localitzar-lo a l’extrem inclòs.
- **Exemple A:** 1/2−7/3≈0,5−2,33=−1,83, per tant a [−2;−1).
- **Exemple B:** 5/4+1/2=1,75, per tant a [1;2).
- **Errors típics:** confondre [a;b) amb (a;b]; calcular exacte però no revisar l’interval.
- **Límit:** si el resultat cau exactament en un extrem, la inclusió/exclusió ha de decidir una sola resposta.

#### F9. Fracció d’una quantitat fraccionària (tipus 11)

- **Decisió:** tasca contextual en dues etapes; mateixa multiplicació de fraccions, variant d’interpretació.
- **Nivell:** N2 per distingir la fracció inicial i la part consumida de la quantitat inicial.
- **Exemple A:** dipòsit a 3/4; es consumeix 1/3 del que hi havia: queda 3/4×2/3=1/2 de la capacitat.
- **Exemple B:** s’ha recorregut 2/5 d’una ruta i després 1/2 del tram pendent: total recorregut 2/5+1/2×3/5=7/10.
- **Errors típics:** restar 1/3 de la capacitat sencera en lloc del contingut existent; ometre el complement.
- **Límit:** enunciats han de dir amb claredat “de la quantitat que hi havia” o “de la capacitat total”.

#### F10. Validar signe i magnitud (tipus 12)

- **Decisió:** estimació/raonabilitat pròpia; no duplica l’operació exacta de F4.
- **Nivell:** N1 per predicció elemental de signe i ordre; N2 si cal acotar magnitud amb més d’una referència.
- **Exemple A:** −2/3−1/3 ha de ser negatiu i menor que −2/3; resultat exacte −1 compleix.
- **Exemple B:** 3/4+1/2 ha de ser positiu i més gran que 3/4; resultat 1,25.
- **Errors típics:** calcular exactament sense estimar; confondre “menor” en negatius.
- **Límit:** distractors han de respectar alhora signe i magnitud; cap opció no pot satisfer parcialment l’afirmació.

### Mancances i propostes d’exercici

No cal afegir tipus només per arribar a una quota. El principal buit curricular observable és la contextualització d’operacions amb racionals: entre els 12 tipus, el tipus 11 és l’únic problema de situació clar; la majoria de generadors són càlcul o representació. XTEC inclou resolució de problemes contextualitzats i validació de resultats amb racionals. Per això es proposen, com a banc futur opcional, dues variants que cobreixen aplicació i raonament sense inventar una família nova:

1. **Recepta proporcional (F9, variant contextual):** una recepta per a 4 persones utilitza 3/4 kg d’un ingredient. Quina quantitat cal per a 6 persones? Solució: 3/4×6/4=9/8=1 1/8 kg. Cas límit: distingir factor d’escala 6/4 del nombre final de persones.
2. **Pressupost amb fraccions (F4/F10, variant contextual):** es gasta 2/5 del pressupost en transport i 1/4 en material. Quina fracció queda? 1−2/5−1/4=20/20−8/20−5/20=7/20. Error típic: sumar fraccions sense denominador comú. Cas límit: descriure explícitament que les fraccions són de la mateixa quantitat inicial.

Són propostes, no s’han afegit al generador ni s’han executat proves perquè aquesta PR documenta el pilot i no hi ha cap canvi de codi.

### Revisió dels modes i nivell de verificació

- **Guiat — revisió estàtica:** els objectes d’exercici inclouen pistes guide i solució pas a pas. El codi de visualització mostra les pistes al nivell guiat. No s’ha inspeccionat cada pantalla renderitzada ni comprovat l’accessibilitat visual.
- **Autònom — revisió estàtica + registre simulat:** els exercicis amb resposta oberta exposen camp i pista; tipus amb allowOpen=false són només d’opcions. En la lectura estàtica dels 12 tipus, 9 permeten resposta oberta i 3 són només d’opcions (tipus 4, 10 i 12). No s’ha fet una sessió nova d’entrada real.
- **Examen — simulació existent:** 3.000 generacions del tema i selecció de 12 preguntes amb repartiment N1/N2 6/6; les seleccions globals exclusives de N2/N3 consten bloquejades en el lot general. No s’ha validat visualment el DOM d’examen per aquest tema.
- **Bancs/varietat:** banksReviewed=0 i bankChecks buit; el volum de generacions no acredita unicitat. Els exemples guardats mostren cada tipus, però no totes les combinacions de valors.
- **Conclusió:** hi ha evidència simulada de cobertura i examen i inspecció estàtica de l’estructura; no hi ha validació visual/interactiva completa. No s’han creat workflows ni repetit proves.

### Tancament del pilot

Els sis passos s’han completat en l’àmbit documental: inventari de 12, mapa de famílies, nivells proposats amb justificació, dues mostres resoltes per família, errors/límits, dues propostes contextuals per al buit observat i revisió dels modes amb límits explícits. No s’ha alterat codi ni nivell de producció perquè les propostes d’exercicis no s’han validat encara al generador. La PR continua Draft, sense fusió ni publicació.
