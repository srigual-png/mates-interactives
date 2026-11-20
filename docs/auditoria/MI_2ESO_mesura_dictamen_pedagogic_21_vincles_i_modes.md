# Dictamen pedagògic provisional · 21 vincles únics de Mesura, 2n ESO

**Data:** 17/11/2026. **Abast:** 23 registres originals, reduïts a 21 relacions conceptuals en evitar dues reciprocitats duplicades (perímetres 4↔15 i problemes 14↔15). Els vincles que enllacen diversos tipus no estan tots aparellats individualment.

**Criteri curricular:** la Matemàtica de 2n d'ESO inclou conversions, proporcionalitat i escales, Pitàgores, perímetre i àrea, prismes/cilindres, estimació i errors. S'aplica la proposta del repositori `MI_2ESO_mesura_proposta_pedagogica_curricular_sense_quotas.md`: N1 aplicació o reconeixement directe, N2 modelització, inversió, comparació o diverses decisions pertinents; N3 reservat a tasques genuïnament no rutinàries del curs, sense forçar quotes. Aquest document és **proposta de classificació**, no aprovació ni canvi de generadors.

**Com distingim les decisions:** «mateixa família/variant» només quan el model matemàtic decisiu i la magnitud final són compatibles; «tasca diferent» quan canvia la decisió final o la magnitud, encara que comparteixi subpassos. Les etiquetes mixtes especifiquen el destí pertinent.

**Evidència empírica de referència:** la matriu `MI_2ESO_mesura_cobertura_evidencia_23_vincles.json` registra evidència matemàtica aparellada **parcial o completa** per a 18 grups únics / 19 registres, amb 135 casos. Els lots 2–4 aporten quatre parelles d’estimació i 72 parelles de Pitàgores. El lot 5 comprova amb oracles independents les 7 parelles existents de `pitagores:10/11` amb `pitagores:3` (1.200 instàncies), i el lot 6 les 8 parelles de `pitagores:12/14` amb `pitagores:2` (1.200 instàncies), sense afegir casos. El lot 7 verifica amb oracles independents 4 parelles de `perimetres:14/5` i 4 de `perimetres:4/15` (1.280 instàncies); aquests darrers són dos registres recíprocs d’una sola relació conceptual. El lot 8 valida 2.000 instàncies de `escales:16` i quatre parelles amb `escales:1`; els dominis d’escala de `escales:2`, `escales:17` i `problemes:8` són disjunts. El lot 9 valida 1.200 instàncies de `escales:12/3/5` i quatre parelles amb `escales:5`; els dominis de factor de `escales:12` i `escales:3` són disjunts. El lot 10 valida 1.600 instàncies de `problemes:16` i `estimacio:7/8/13`: una terna comparteix referència i lectura B amb 7/8, i el domini de referència de 13 és disjunt. El lot 11 valida 4.400 instàncies de `problemes:3` i `superficies:13/14`; després de normalitzar les unitats, troba dues parelles de dimensions físiques exactes amb `superficies:14` i cap amb 13. Cap dels lots 5–11 afegeix casos al recompte de 135. Sis relacions compleixen el criteri complet; les altres 15 continuen parcials o sense aparellar. Una relació només compta com a completa quan tots els destinataris i branques tenen almenys dues mostres aparellades i els dos generadors disposen d'oracles independents. Amb aquest criteri, el recompte és **6 de 21 relacions completes**. La matriu també registra els límits estructurals sense dades idèntiques. Execució integrada de contrast [#44114539881](https://github.com/srigual-png/mates-interactives/actions/runs/44114539881); prova agregada de modes [#44128716228](https://github.com/srigual-png/mates-interactives/actions/runs/44128716228).

## Dictamen per relació

### 1. `escales:16 ↔ escales:1/2/17 i problemes:8`

**Conclusió reconciliada:** variant de la mateixa família. **Nivell candidat:** N2 per `escales:16` i pels destinataris actuals. **Exemple:** a 1:50, un rectangle de 8×6 cm té costats reals 4×3 m i perímetre 14 m; una longitud de plànol de 8 cm, a `escales:1`, dona 4 m després de convertir cm a m. **Justificació:** l’escala lineal continua sent el nucli, però `escales:1/2/17` també inclouen conversió o suma de trams; no són sempre N1. `escales:16` afegeix transformar el segon costat i calcular perímetre, però queda dins N2. **Abast de les proves:** 4 parelles amb escala i primer costat compartits entre `escales:16` i `escales:1`; els cinc generadors s’han validat amb 2.000 oracles independents. `escales:2`, `escales:17` i `problemes:8` tenen dominis d’escala disjunts (`1:50`/`1:100` davant escales des de `1:25.000`), així que no hi ha fixtures de paràmetres coincidents; el vincle queda parcial segons el criteri estricte.

### 2. `escales:12 ↔ escales:3/5`

**Conclusió reconciliada:** variant de la mateixa família. **Nivell candidat:** `escales:12` N1; `escales:5` N1; `escales:3` N2. **Exemple:** 4 cm passen a 12 cm: inferir el factor és 12÷4=3; aplicar el factor 3 a 4 cm dona 12 cm. **Justificació:** inferir el quocient entre longituds compatibles és una aplicació directa; `escales:3` afegeix convertir metres a centímetres i aplicar una escala de reducció. Això coincideix amb el mapa vigent per `escales:12` i `escales:5`. **Abast de les proves:** 4 parelles reals amb escales:5; 1.200 oracles independents per als tres tipus. `escales:3` no admet parelles de paràmetres: `escales:12` amplia amb factors 1,5–4 i `escales:3` redueix a 1:25–1:200; la relació queda parcial segons el criteri estricte.

### 3. `estimacio:18 ↔ estimacio:6/17`

**Conclusió reconciliada:** tasca diferent. **Nivell candidat:** N1 per `estimacio:18`, `estimacio:6` i `estimacio:17`. **Exemple:** amb referència 20 i aproximació 22, s’ha de detectar que sumar en lloc de calcular |22−20| és l’error; `estimacio:6` retorna directament l’error absolut. **Justificació:** el tipus 18 presenta una confusió concreta i es resol reconeixent la diferència absoluta; no exigeix una cadena de decisions N2. Coincideix amb el mapa vigent. **Abast de les proves:** 4 parelles reals amb estimacio:6, més 2 coincidències exactes amb estimacio:17; el lot 2 comprova 1.600 instàncies de quatre tipus amb oracles independents.

### 4. `estimacio:9 ↔ estimacio:7/8/13`

**Conclusió reconciliada:** tasca diferent. **Nivell candidat:** N2 per als quatre tipus. **Exemple:** si la referència és 200, una aproximació 220 té error relatiu 0,1 o 10%; comparar dos instruments obliga a calcular i comparar dos errors. **Justificació:** `estimacio:7/8/13` requereixen formar un error relatiu (i, segons el tipus, expressar-lo en percentatge); `estimacio:9` fa el pas comparatiu. El mapa vigent també situa tots quatre a N2. La manca de varietat de resposta de `estimacio:9` és una incidència del generador separada del nivell. **Abast de les proves:** 3 ternes reals amb 7/8, més 2 coincidències exactes amb estimacio:13 (100→102 i 500→510); el lot 2 comprova 1.600 instàncies de quatre tipus amb oracles independents.

### 5. `perimetres:14 ↔ perimetres:5`

**Conclusió reconciliada:** variant de la mateixa família. **Nivell candidat:** N1 circumferència directa (`perimetres:5`) i N2 fórmula inversa (`perimetres:14`). **Exemple:** si C=31,4 cm i π≈3,14, cal calcular r=31,4/(2·3,14)=5 cm. **Justificació:** la relació circular és comuna, però cal aïllar el radi en lloc d’aplicar la fórmula directa. El candidat N2 divergeix del mapa vigent, que marca `perimetres:14` N1; queda pendent de revisió docent, no aplicat. **Abast de les proves:** 4 parelles exactes; el lot 7 les valida amb oracles independents dels dos generadors. Vincle complet segons el criteri de la matriu.

### 6. `perimetres:4 ↔ perimetres:15`

**Conclusió reconciliada:** tasca diferent. **Nivell candidat:** N1 per perímetre regular (`perimetres:4`) i N2 per àrea amb apotema (`perimetres:15`). **Exemple:** P=30 cm i apotema 4 cm donen A=P·a/2=60 cm²; `perimetres:4` acaba en P. **Justificació:** en el segon tipus, el perímetre és un subpas i canvia tant la decisió final com la magnitud. Coincideix amb el mapa vigent. **Abast de les proves:** 4 parelles en cada direcció (8 registres, una única relació conceptual), totes comprovades amb oracles independents al lot 7. Relació completa segons el criteri de la matriu.

### 7. `pitagores:10 ↔ pitagores:3`

**Conclusió reconciliada:** tasca diferent. **Nivell candidat:** N2 per `pitagores:10` i per la inversió de `pitagores:3`. **Exemple:** amb hipotenusa 13 i catet 5, s’obté l’altre catet 12; `pitagores:10` després calcula l’àrea 5·12/2=30. **Justificació:** el tipus 10 afegeix trobar altura i calcular àrea; la inversió de Pitàgores demana restar quadrats abans de fer l’arrel. `pitagores:3` és N1 al mapa vigent; proposar N2 és una discrepància provisional que requereix revisió docent. **Abast de les proves:** 3 parelles aparellades existents; el lot 5 les torna a comprovar amb oracles independents dels dos generadors. Relació completa segons el criteri de cobertura de la matriu.

### 8. `pitagores:11 ↔ pitagores:3`

**Conclusió reconciliada:** tasca diferent. **Nivell candidat:** N2 per `pitagores:11` i per la inversió de `pitagores:3`. **Exemple:** amb diagonal 29 cm i costat 20 cm, es recupera 21 cm i després es calcula el perímetre 82 cm. **Justificació:** es combina la inversió de Pitàgores amb un segon objectiu de perímetre. `pitagores:3` és N1 al mapa vigent; proposar N2 per la inversió és pendent de revisió docent. **Abast de les proves:** 4 parelles aparellades existents; el lot 5 les torna a comprovar amb oracles independents dels dos generadors. Relació completa segons el criteri de cobertura de la matriu.

### 9. `pitagores:12 ↔ pitagores:2 i contextuals`

**Conclusió reconciliada:** variant composta de la mateixa família. **Nivell candidat:** N2 per `pitagores:12`; N1 per la hipotenusa directa bàsica (`pitagores:2`), i N2 quan el context afegeix decisions. **Exemple:** amb recorreguts perpendiculars de 7 i 24 m, la diagonal fa 25 m i el camí pels trams 31 m; s’estalvien 6 m. **Justificació:** calcular la hipotenusa és el nucli; comparar dos recorreguts és un pas addicional. **Abast de les proves:** 4 parelles amb `pitagores:2` verificades al lot 6; el lot 3 n’afegeix 2 per a cadascun dels tipus 4, 6, 7, 8, 13 i `problemes:7` (13 comparteix la terna numèrica però expressa cm en lloc de m). En total, 16 parelles per a cada tipus font. La relació continua parcial perquè no hi ha fixtures exactes per al tipus 5 (diagonal d’un quadrat, amb catets iguals) ni `problemes:6` (pantalles de 30–80 cm davant triples font en metres); els dos límits s’han comprovat i no es compten com a aparellaments.

### 10. `pitagores:14 ↔ pitagores:2 i contextuals`

**Conclusió reconciliada:** variant composta de la mateixa família. **Nivell candidat:** N2 per `pitagores:14`; N1 per la hipotenusa directa (`pitagores:2`). **Exemple:** triangle 9–12–15 i 2 m addicionals per a ancoratges: cal obtenir 15 m i després comprar 17 m de cable. **Justificació:** el marge és un segon pas contextual, de manera que no s’ha de classificar igual que el càlcul directe. **Abast de les proves:** 4 parelles amb `pitagores:2` verificades al lot 6; el lot 3 n’afegeix 2 per a cadascun dels tipus 4, 6, 7, 8, 13 i `problemes:7` (13 comparteix la terna numèrica però expressa cm en lloc de m). En total, 16 parelles per a cada tipus font. La relació continua parcial perquè no hi ha fixtures exactes per al tipus 5 (diagonal d’un quadrat, amb catets iguals) ni `problemes:6` (pantalles de 30–80 cm davant triples font en metres); els dos límits s’han comprovat i no es compten com a aparellaments.

### 11. `pitagores:15 (diagonal) ↔ pitagores:2`

**Conclusió reconciliada:** variant de la mateixa família, nivell candidat N1. **Exemple:** un rectangle de 12×16 cm demana calcular la diagonal: √(12²+16²)=20 cm, igual que un triangle amb catets explícits. **Justificació:** l’enunciat no dona un resultat d’alumne per validar; demana calcular directament la hipotenusa. El mapa actual marca la variant diagonal N2; aquesta passada proposa revisar-la a N1, sense aplicar el canvi. **Abast de les proves:** 2 parelles amb el mateix triangle; el lot 4 afegeix 2 per branca coneguda (catet curt i llarg) amb cadascun dels tipus 4, 6, 7, 8, 13 i problemes:7. Als tipus en metres, es comparteix la terna numèrica però no l’escala física. No hi ha fixtures exactes per al tipus 5 ni problemes:6.

### 12. `pitagores:15 (catet) ↔ pitagores:3; pitagores:3 ↔ pitagores:2`

**Conclusió reconciliada:** mateixa família amb variant inversa. **Nivell candidat:** `pitagores:15` branca catet i `pitagores:3` N2; `pitagores:2` directa N1. **Exemple:** hipotenusa 13 i catet 12: √(13²−12²)=5; en la directa, √(5²+12²)=13. **Justificació:** la branca inversa requereix restar quadrats abans de fer l’arrel. El mapa actual situa la branca catet i `pitagores:3` a N1; proposar N2 és pendent de revisió docent. Les dues branques del tipus 15 s’han de mantenir separades en nivell candidat. **Abast de les proves:** 3 parelles per a la branca inversa 15↔3 i 3 parelles de 3↔2; el lot 4 afegeix, per cadascun dels sis destinataris directes, dues mostres tant per a la diagonal com per al catet invers, i cobreix els catets coneguts curt i llarg de `pitagores:3`. En els destinataris en metres es comparteix la terna numèrica, no la longitud física. No hi ha fixtures exactes per al tipus 5 ni problemes:6.

### 13. `problemes:14 ↔ problemes:15`

**Conclusió reconciliada:** tasques diferents pel resultat avaluable, amb nivell candidat N2 en tots dos casos. **Exemple:** jardí de 25×15 m amb porta de 4 m: cal tancar 76 m; a 10 €/m, el cost és 760 €. En el sòcol, es demanen els metres útils de contorn. **Justificació:** tots dos calculen perímetre i resten una obertura; `problemes:14` afegeix el preu, però `problemes:15` també exigeix modelar el contorn i restar la porta. N2 coincideix amb el mapa vigent; no rebaixar el sòcol a N1. **Abast de les proves:** 800 generacions i 4 contrasts estructurals; cap triple de dimensions igual.

### 14. `problemes:16 ↔ estimacio:7/8/13`

**Conclusió reconciliada:** tasca diferent, nivell candidat N1 per `problemes:16`. **Exemple aparellat:** referència 250 cm; B=255 cm dona error relatiu 0,02 (2%) tant a `estimacio:7/8` com a la comparació A=248 cm, B=255 cm de `problemes:16`, que tria A. **Exemple de decisió:** amb referència comuna 120 cm, A=122 i B=119, comparar errors relatius dona 1,67% i 0,83%; com que el denominador és igual, n’hi ha prou de comparar errors absoluts 2 i 1. **Justificació:** `problemes:16` requereix comparar dues mesures i decidir quina s’apropa més; la resposta final és categòrica, mentre que 7/8 calculen l’error d’una aproximació. N1 coincideix amb el mapa vigent perquè la referència comuna permet reduir la decisió a comparar diferències absolutes. `estimacio:13` demana calcular un percentatge a partir d’un error absolut i un valor de referència, però els dominis de referència no coincideixen (80/120/150/250 cm contra 100/200/500/1000); queda sense fixture aparellat. **Abast de les proves:** 1.600 oracles independents (400 per tipus), una terna real amb 7/8 i cap solapament paramètric amb 13.

### 15. `problemes:3 ↔ superficies:13/14`

**Conclusió reconciliada:** variant de la mateixa família; nivell candidat N2 per als tres tipus. **Exemples amb dimensions físiques idèntiques:** un dipòsit de 60×40×50 cm (6×4×5 dm) ple al 50% conté 60 L; `superficies:14` amb caixa de 6×5×4 dm calcula la capacitat total, 120 L. Un altre dipòsit de 80×50×40 cm ple al 75% conté 120 L; la caixa de 8×5×4 dm té capacitat de 160 L. Les dimensions coincideixen en metres, encara que l’ordre dels costats i les unitats escrites siguin diferents. **Justificació:** tots tres comparteixen el càlcul `llargada × amplada × altura` i la resposta final en litres; `problemes:3` afegeix convertir cm³ a L i aplicar el percentatge d’ompliment, així que és una variant més composta. Els tres mantenen N2 per la modelització del volum i la conversió de capacitat. `superficies:13` no té dimensions físiques coincidents: els seus dominis mínims (3×2×1 m) excedeixen com a mínim dues dimensions dels dipòsits font. **Abast de les proves:** 4.400 oracles independents (400 per a `problemes:3`, 2.000 per a cadascun de `superficies:13/14`), dues coincidències dimensionals exactes amb 14 i cap amb 13. El vincle queda parcial fins a disposar d’una parella paramètrica per a 13.

### 16. `problemes:5 ↔ superficies:8/19`

**Conclusió reconciliada:** variant de la mateixa família respecte a superfície lateral calculada; tasca diferent respecte al reconeixement de dimensions del desplegament (`superficies:19`). **Nivell candidat:** N2 per `problemes:5`; N1 per `superficies:8`; N2 per `superficies:19`. **Exemple:** una llauna de diàmetre 6 cm i altura 14 cm requereix π·6·14≈263,76 cm² d’etiqueta. **Justificació:** el context exigeix identificar que només es cobreix el lateral i usar πdh; és més que aplicar directament 2πrh quan ja es dona el radi. **Abast de les proves:** 800 oracles i 4 contrasts; cap parell amb radi i altura iguals.

### 17. `superficies:15 ↔ superficies:10/11`

**Conclusió reconciliada:** variant composta de la inversió de volum respecte a `superficies:10`, tasca diferent de recuperar l’àrea de base de `superficies:11`. **Nivell candidat:** N2 per `superficies:15`; N1 per 10/11 al mapa vigent. **Exemple:** base 2×1,5 m i 900 L: 0,9 m³/(3 m²)=0,3 m. **Justificació:** cal convertir litres a m³, formar l’àrea de base i aïllar la profunditat; el resultat també canvia de l’alçada del prisma simple. **Abast de les proves:** 1.200 comprovacions i 24 combinacions exactes 10↔11; encara no hi ha parella equivalent 15↔10/11.

### 18. `superficies:17 ↔ superficies:1/3/5`

**Conclusió reconciliada:** tasca diferent del volum únic; el nivell depèn de la branca de `superficies:17`: N1 `sameBase`, N2 `other`. **Exemple:** amb la mateixa base, comparar altures 3 i 5 resol la capacitat; amb bases diferents cal comparar productes com 5·3·3 i 5·3·5. **Justificació:** `sameBase` només compara altures; `other` calcula dos volums. Això coincideix amb el mapa vigent, que no s’ha de resumir com un únic N2. **Abast de les proves:** 1.000 instàncies i 4 parelles amb nombres de dimensions coincidents, però unitats cm/dm diferents.

### 19. `superficies:4 ↔ superficies:3 i altres volums`

**Conclusió reconciliada:** variant de la mateixa família de volum de prisma. **Nivell candidat:** N2 per `superficies:4`; N1 per `superficies:3` i els volums directes simples. **Exemple:** base triangular de base 6 cm i altura 4 cm i longitud del prisma 10 cm: (6·4/2)·10=120 cm³. **Justificació:** compartir V=A_base·h no elimina el pas previ d’obtenir l’àrea triangular. N2 és coherent amb el mapa actual i amb el currículum de geometria del curs. **Abast de les proves:** 4 parelles amb superficies:3; altres destinacions no contrastades individualment.

### 20. `superficies:9 ↔ superficies:8/19`

**Conclusió reconciliada:** tasca diferent respecte a àrea lateral; variant de superfície total amb reconeixement de desenvolupament. **Nivell candidat:** N2 per `superficies:9` i `superficies:19`; N1 per `superficies:8`. **Exemple:** amb r=3 cm i h=6 cm, l’àrea lateral és 113,04 cm²; la total afegeix les dues bases, 56,52 cm², i dona 169,56 cm². **Justificació:** superfície total exigeix afegir les bases i no és equivalent a l’etiqueta lateral. Coincideix amb els nivells vigents. **Abast de les proves:** 4 ternes reals amb superficies:8/19.

### 21. `unitats:9 ↔ unitats:1/4/5`

**Conclusió reconciliada:** tasca diferent; nivell candidat N2 per `unitats:9` i N1 per conversió directa (`unitats:1/4/5`). **Exemple:** 5,6 m són 560 cm; en comparar amb 545 cm cal convertir i prendre una decisió. **Justificació:** comparar magnituds requereix un pas de decisió addicional; convertir longitud, capacitat o massa per separat és una conversió directa. Coincideix amb el mapa vigent. **Abast de les proves:** 190+140 contrastos diferencials; 27 decisions a favor de la primera opció i 23 de la segona, sense input idèntic.

## Reconciliació dels nivells amb el mapa vigent (20/11/2026)

La passada contrasta els nivells candidats amb els passos matemàtics reals i amb `REVIEWED_LEVELS`/`REVIEWED_VARIANTS` de `main` a la base de la PR. El nivell candidat no modifica el nivell actiu. Les discrepàncies són propostes pendents de revisió docent.

| Relació | Candidat reconciliat | Mapa vigent | Resultat |
|---|---|---|---|
| 1 · `escales:16` ↔ escales 1/2/17, problemes 8 | N2 | N2 | Coincideix. |
| 2 · `escales:12` ↔ escales 3/5 | N1 (12/5); N2 (3) | N1 / N2 / N1 | Coincideix per a 12/5; 3 suma conversió. |
| 3 · `estimacio:18` ↔ 6/17 | N1 | N1 | Coincideix. |
| 4 · `estimacio:9` ↔ 7/8/13 | N2 | N2 | Coincideix. |
| 5 · `perimetres:14` ↔ 5 | N2 invers; N1 directe | N1 / N1 | N2 invers és proposta pendent. |
| 6 · `perimetres:4` ↔ 15 | N1 / N2 | N1 / N2 | Coincideix. |
| 7 · `pitagores:10` ↔ 3 | N2 / N2 invers | N2 / N1 | Revisar el nivell de 3. |
| 8 · `pitagores:11` ↔ 3 | N2 / N2 invers | N2 / N1 | Revisar el nivell de 3. |
| 9 · `pitagores:12` ↔ 2/contextos | N2 | N2 | Coincideix per al tipus 12. |
| 10 · `pitagores:14` ↔ 2/contextos | N2 | N2 | Coincideix. |
| 11 · `pitagores:15` diagonal ↔ 2 | N1 / N1 | N2 / N1 | Revisar l’excepció de diagonal. |
| 12 · `pitagores:15` catet ↔ 3; 3 ↔ 2 | N2 invers / N1 directe | N1 / N1 / N1 | Revisar la branca catet i el tipus 3. |
| 13 · `problemes:14` ↔ 15 | N2 / N2 | N2 / N2 | Coincideix. |
| 14 · `problemes:16` ↔ estimació 7/8/13 | N1 / N2 | N1 / N2 | Coincideix; referència comuna simplifica la comparació. |
| 15 · `problemes:3` ↔ superfícies 13/14 | N2 | N2 | Coincideix. |
| 16 · `problemes:5` ↔ superfícies 8/19 | N2 / N1 / N2 | N2 / N1 / N2 | Coincideix. |
| 17 · `superficies:15` ↔ 10/11 | N2 / N1 / N1 | N2 / N1 / N1 | Coincideix. |
| 18 · `superficies:17` ↔ 1/3/5 | N1 `sameBase`; N2 `other` | N1 / N2 | Coincideix amb la bifurcació vigent. |
| 19 · `superficies:4` ↔ 3/altres | N2 / N1 | N2 / N1 | Coincideix. |
| 20 · `superficies:9` ↔ 8/19 | N2 / N1 / N2 | N2 / N1 / N2 | Coincideix. |
| 21 · `unitats:9` ↔ 1/4/5 | N2 / N1 | N2 / N1 | Coincideix. |

**Pendents que podrien requerir una decisió docent abans de tocar el mapa oficial:** `perimetres:14` (candidat N2, actual N1); `pitagores:3` i branca catet de `pitagores:15` (candidat N2, actual N1); i branca diagonal de `pitagores:15` (candidat N1, actual N2). Cap canvi oficial s’ha aplicat.

## Revisió dels modes

La suite `scripts/test-mesura-2eso-integracio-modes-vincles.cjs`, executada amb **resultat success** al workflow integrat #44128716228, ha inspeccionat **56 tipus** representatius dels 23 registres i dels destins més propers sobre codi JavaScript real i **DOM simulat**, sense repetir les bateries matemàtiques antigues: 56 pantalles i correccions guiades amb pistes, 56 autònomes sense pistes, 56 exàmens amb quatre opcions, 49 pantalles de pràctica amb resposta oberta i 49 pantalles d'examen amb resposta oberta quan `allowOpen` ho permet. Els 7 tipus amb `allowOpen=false` han quedat amb opció tancada. El test també envia una resposta correcta i una incorrecta pels circuits d'opcions.

**Límit important:** els 56 tipus són una cobertura agregada de representació de modes, no una verificació completa de cada vincle; per això `ui_modes` resta `pending` a les files de la matriu. Els casos oberts s'han comprovat en la visualització i l'activació del camp, **no** com a verificació de l'acceptació de totes les formes textuals de resposta; tampoc s'ha comprovat selecció probabilística de 20 preguntes d'examen, navegació completa, efectes visuals, accessibilitat o comportament real en mòbil. Cal prova de navegador real abans de considerar la interfície definitivament validada.

## Decisions i límits

- **No fusionar automàticament els tipus** amb només una fórmula compartida: especialment diagnòstics d'error, perímetre versus àrea, volum versus comparació de capacitats, i percentatge d'ompliment versus capacitat total.
- **Mantenir les variants** de Pitàgores 15 (diagonal/catet), Superfícies 17 (sameBase/other), el context de radi/diàmetre i les fórmules inverses quan tenen el mateix objectiu central.
- **Nivells candidats:** tots els enllaços revisats s'expliquen amb coneixements de 2n d'ESO i orientació N1/N2; no cal inventar N3 per omplir una quota. La distribució final requereix la revisió de l'experiència real de l'alumnat.
- **Cobertura:** la matriu compta 18 grups / 19 registres amb evidència aparellada (135 casos), amb **6/21 relacions conceptuals completes** segons el criteri estricte indicat a dalt. Per a les altres 15 falta completar almenys un destinatari o branca amb dues mostres aparellades i oracles independents als dos generadors; també falta contrastar distractors i respostes obertes en els recorreguts finals i fer proves de navegador reals. L'aprovació docent continua pendent abans de modificar `REVIEWED_LEVELS` o `families-validades.json`.
- **Cap canvi funcional**, de nivell oficial, de famílies aprovades ni d'estat de la PR. Es manté **oberta i Draft**, sense fusió ni publicació.

**Nota sobre exemples:** quan una xifra és un exemple aritmètic il·lustratiu i no coincideix necessàriament amb una fixture existent, no representa un aparellament real addicional; el camp «Abast de les proves» n'aclareix la verificació.
