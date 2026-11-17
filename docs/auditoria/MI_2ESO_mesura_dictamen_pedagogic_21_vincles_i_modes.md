# Dictamen pedagògic provisional · 21 vincles únics de Mesura, 2n ESO

**Data:** 17/11/2026. **Abast:** 23 registres originals, reduïts a 21 relacions conceptuals en evitar dues reciprocitats duplicades (perímetres 4↔15 i problemes 14↔15). Els vincles que enllacen diversos tipus no estan tots aparellats individualment.

**Criteri curricular:** la Matemàtica de 2n d'ESO inclou conversions, proporcionalitat i escales, Pitàgores, perímetre i àrea, prismes/cilindres, estimació i errors. S'aplica la proposta del repositori `MI_2ESO_mesura_proposta_pedagogica_curricular_sense_quotas.md`: N1 aplicació o reconeixement directe, N2 modelització, inversió, comparació o diverses decisions pertinents; N3 reservat a tasques genuïnament no rutinàries del curs, sense forçar quotes. Aquest document és **proposta de classificació**, no aprovació ni canvi de generadors.

**Com distingim les decisions:** «mateixa família/variant» només quan el model matemàtic decisiu i la magnitud final són compatibles; «tasca diferent» quan canvia la decisió final o la magnitud, encara que comparteixi subpassos. Les etiquetes mixtes especifiquen el destí pertinent.

**Evidència empírica de referència:** `MI_2ESO_mesura_cobertura_evidencia_23_vincles.json` (16 relacions amb parelles reals; altres amb contrast estructural) i execució integrada [#44114539881](https://github.com/srigual-png/mates-interactives/actions/runs/44114539881). La verificació de modes nova és [#44128716228](https://github.com/srigual-png/mates-interactives/actions/runs/44128716228).

## Dictamen per relació

### 1. `escales:16 ↔ escales:1/2/17 i problemes:8`

**Conclusió proposada:** variant de la mateixa família. **Nivell:** N1 directe → N2 compost. **Exemple:** D'una escala 1:n es passa d'una longitud de plànol a una longitud real; escales:16 afegeix el perímetre del rectangle i no només una longitud. **Justificació:** L'estratègia central d'escala es manté, però l'objectiu final exigeix modelitzar quatre costats; no crear una família nova només pel context. **Abast de les proves:** 4 parelles reals vinculades a escales:1; la resta de destinacions encara no s'han aparellat individualment.

### 2. `escales:12 ↔ escales:3/5`

**Conclusió proposada:** variant de la mateixa família. **Nivell:** N1 aplicar factor → N2 inferir factor. **Exemple:** Un dibuix ampliat que obliga a deduir el factor entre mesures (escales:12) contrasta amb aplicar un factor ja conegut (escales:5). **Justificació:** La proporcionalitat és comuna, però invertir la relació exigeix identificar la dada desconeguda; no confondre amb el càlcul de distàncies d'un mapa. **Abast de les proves:** 4 parelles reals amb escales:5; escales:3 sense aparellament específic.

### 3. `estimacio:18 ↔ estimacio:6/17`

**Conclusió proposada:** tasca diferent. **Nivell:** N1 error absolut → N2 diagnòstic. **Exemple:** Calcular |valor real−aproximació| és una resposta numèrica; identificar una operació errònia demana detectar el procediment que falla. **Justificació:** Mateix coneixement de l'error, però objectiu de càlcul i de diagnòstic no equivalents. **Abast de les proves:** 4 parelles reals amb estimacio:6; 17 no contrastat per parella.

### 4. `estimacio:9 ↔ estimacio:7/8/13`

**Conclusió proposada:** tasca diferent. **Nivell:** N1 càlcul relatiu → N2 comparar dues mesures. **Exemple:** Per a referència 250 i aproximació 255, l'error relatiu és 0,02 o 2%; decidir entre dos instruments obliga a fer una segona comparació. **Justificació:** Cal diferenciar valor decimal, percentatge i decisió de quina observació és millor. La resposta correcta de estimacio:9 és sistemàticament la primera en les fixtures actuals; cal revisar aquesta manca de varietat a la PR funcional. **Abast de les proves:** 3 ternes reals amb 7/8; estimacio:13 no aparellat per fixture.

### 5. `perimetres:14 ↔ perimetres:5`

**Conclusió proposada:** variant de la mateixa família. **Nivell:** N1 circumferència directa → N2 fórmula inversa. **Exemple:** Si C=31,4 cm i π≈3,14, cal recuperar r=C/(2π)=5 cm en lloc de calcular C donat r=5 cm. **Justificació:** Mateixa relació geomètrica circular, però procediment invers i unitat de resultat diferent. **Abast de les proves:** 4 parelles reals verificades.

### 6. `perimetres:4 ↔ perimetres:15`

**Conclusió proposada:** tasca diferent. **Nivell:** N1 perímetre regular → N2 superfície amb apotema. **Exemple:** Un polígon amb perímetre P=30 cm i apotema a=4 cm requereix A=P·a/2=60 cm²; perimetres:4 acaba quan calcula P. **Justificació:** El perímetre només és un subpas de l'àrea; no confondre longitud i superfície. Un sol nucli comú no basta per fusionar famílies. **Abast de les proves:** 4 parelles en cada direcció (8 registres de mostres, una única relació conceptual).

### 7. `pitagores:10 ↔ pitagores:3`

**Conclusió proposada:** tasca diferent. **Nivell:** N2 invers de Pitàgores → N2 compost invers + àrea. **Exemple:** Donada la hipotenusa 13 i un catet 5, es pot trobar l'altre catet 12; pitagores:10 continua calculant l'àrea 5·12/2=30. **Justificació:** Resultat de longitud versus resultat de superfície, i un pas final nou; no etiquetar-lo simplement com a mateix exercici. **Abast de les proves:** 3 parelles reals.

### 8. `pitagores:11 ↔ pitagores:3`

**Conclusió proposada:** tasca diferent. **Nivell:** N2 invers → N2 compost invers + perímetre. **Exemple:** Amb els catets 5 i 12 i hipotenusa 13, recuperar un catet és un càlcul invers; sumar 5+12+13=30 és una nova demanda de perímetre. **Justificació:** El nucli invers és prerequisit però l'objectiu final i les unitats/resolució són diferents. **Abast de les proves:** 4 parelles reals.

### 9. `pitagores:12 ↔ pitagores:2 i contextuals`

**Conclusió proposada:** variant composta de la mateixa família. **Nivell:** N1 hipotenusa → N2 decisió de recorregut. **Exemple:** Per un rectangle de 5×12 m, diagonal 13 m; el recorregut per dos costats és 17 m: cal comparar 13 i 17. **Justificació:** La diagonal és la mateixa que l'hipotenusa bàsica, però s'hi afegeix comparació de rutes; encaixa en distància i Pitàgores de 2n. **Abast de les proves:** 4 parelles reals amb pitagores:2; no amb totes les altres destinacions.

### 10. `pitagores:14 ↔ pitagores:2 i contextuals`

**Conclusió proposada:** variant composta de la mateixa família. **Nivell:** N1 hipotenusa → N2 llargada amb marge. **Exemple:** Per un triangle 5–12–13, el cable té 13 m; un ancoratge o marge prescrit s'ha de sumar després de calcular-lo. **Justificació:** El càlcul de Pitàgores és idèntic, però exigeix interpretar el marge com a segon pas. **Abast de les proves:** 4 parelles reals amb pitagores:2; altres contextos no aparellats.

### 11. `pitagores:15 (diagonal) ↔ pitagores:2`

**Conclusió proposada:** variant contextual de la mateixa família. **Nivell:** N1 directe → N2 comprovació de diagonal. **Exemple:** El rectangle 12×16 cm té diagonal 20 cm; és la mateixa hipotenusa que en un triangle de catets 12 i 16. **Justificació:** La branca diagonal requereix reconèixer el triangle implícit i valorar el resultat proposat, sense canviar la fórmula. **Abast de les proves:** 2 parelles reals amb el mateix triangle.

### 12. `pitagores:15 (catet) ↔ pitagores:3; pitagores:3 ↔ pitagores:2`

**Conclusió proposada:** variant procedimental de la mateixa família. **Nivell:** N1 directe → N2 invers. **Exemple:** Per hipotenusa 13 i catet 12, trobar el catet 5 exigeix √(13²−12²); calcular hipotenusa a partir de 5 i 12 exigeix √(5²+12²). **Justificació:** La família amplia la relació pitagòrica amb l'operació inversa; cal conservar la branca i el nivell diferenciats. **Abast de les proves:** 3 parelles per a branca inversa 15↔3 i 3 parelles de 3↔2.

### 13. `problemes:14 ↔ problemes:15`

**Conclusió proposada:** tasca diferent. **Nivell:** N1 longitud útil → N2 cost de tanca. **Exemple:** Jardí de 16×9 m amb porta de 2 m: perímetre útil 48 m; amb preu 18 €/m el cost final és 864 €, mentre que sòcol acaba en metres. **Justificació:** Mateix 2·(llarg+ample)−porta, però demanar pressupost en euros versus longitud en metres canvia l'objectiu avaluable. **Abast de les proves:** 800 generacions, 4 contrasts estructurals; cap triple de dimensions igual.

### 14. `problemes:16 ↔ estimacio:7/8/13`

**Conclusió proposada:** tasca diferent. **Nivell:** N1 error relatiu → N2 judici de precisió. **Exemple:** Amb referència 250 cm, A=248 i B=255, A té error relatiu 0,8% i B 2%: s'ha de triar A, no només retornar 2%. **Justificació:** Conèixer la fórmula és un subpas; comparar dos instruments exigeix el criteri de precisió. **Abast de les proves:** 1 terna real amb 7/8; 13 no aparellat.

### 15. `problemes:3 ↔ superficies:13/14`

**Conclusió proposada:** tasca diferent. **Nivell:** N1 capacitat total → N2 ompliment parcial. **Exemple:** Un dipòsit de 80×50×40 cm té 160 L de capacitat i, al 75%, conté 120 L; superficies:13 calcula m³→L i superficies:14 dm³→L sense aplicar percentatge. **Justificació:** Les unitats i el càlcul de volum són prerequisits, però l'aigua present i la capacitat total són objectius diferents. **Abast de les proves:** 1.200 oracles més 105 contrastos pedagògics, 4 fixtures parcials; sense correspondència física idèntica.

### 16. `problemes:5 ↔ superficies:8/19`

**Conclusió proposada:** variant contextual de la mateixa família respecte a superficie lateral; tasca diferent respecte a total. **Nivell:** N1 superfície lateral → N2 etiqueta contextual. **Exemple:** Una llauna de d=6 cm i h=14 cm exigeix etiqueta mínima de π·6·14≈263,76 cm²; el mateix procediment s'escriu 2πrh quan es dona r. **Justificació:** Amb superficies:8 comparteix resposta de superfície lateral i factor diàmetre/radi; amb superficies:19 cal diferenciar el desenvolupament de la superfície total si inclou bases. **Abast de les proves:** 800 oracles i contrast de 4 casos; cap parell amb mateix radi i altura.

### 17. `superficies:15 ↔ superficies:10/11`

**Conclusió proposada:** variant composta de la família d'inversió de volum respecte a 10; diferent de recuperació d'àrea de base 11. **Nivell:** N1 inversió simple → N2 volum en litres i profunditat. **Exemple:** Si un dipòsit de base 2×1,5 m conté 900 L, la profunditat és 0,9/(2·1,5)=0,3 m; el prisma bàsic dona directament V i A_base. **Justificació:** Mateixa relació V=A_base·h, però cal convertir litres en m³ i formar l'àrea de base; 10 resol h i 11 resol A_base. **Abast de les proves:** 1.200 comprovacions i 24 combinacions exactes de 10↔11, cap exemple idèntic acreditat del tipus 15 amb 10/11.

### 18. `superficies:17 ↔ superficies:1/3/5`

**Conclusió proposada:** tasca diferent. **Nivell:** N1 volum únic → N2 comparació de dues capacitats. **Exemple:** Un ortoedre de 4×3×2 té volum 24 (unitats cúbiques); comparar-lo amb 3×4×3, volum 36, obliga a calcular dos volums i triar el més gran. **Justificació:** La mateixa multiplicació no fa que 'quina capacitat és major?' sigui igual a 'quant volum té?'. Distingir cm³ i dm³. **Abast de les proves:** 1.000 instàncies i 4 parelles amb nombres de dimensions coincidents, però unitats cm/dm diferents.

### 19. `superficies:4 ↔ superficies:3 i altres volums`

**Conclusió proposada:** variant geomètrica de la mateixa família. **Nivell:** N1 prisma de base rectangular → N2 prisma de base triangular. **Exemple:** Per base triangular de base 6 cm i altura 4 cm i longitud 10 cm, el volum és (6·4/2)·10=120 cm³. **Justificació:** Comparteix V=A_base·altura però cal calcular abans l'àrea del triangle; s'ha de conservar el sentit espacial i evitar geometria de 3r. **Abast de les proves:** 4 parelles reals amb superficies:3; altres destinacions no contrastades individualment.

### 20. `superficies:9 ↔ superficies:8/19`

**Conclusió proposada:** tasca diferent respecte a lateral; variant de superfície total amb desenvolupament. **Nivell:** N1 superfície lateral → N2 superfície total. **Exemple:** Amb r=3 cm i h=6 cm, lateral 2πrh=113,04 cm², però total afegeix 2πr²≈56,52 cm², és a dir 169,56 cm². **Justificació:** Superfície exterior de tot el cilindre i etiqueta lateral no són el mateix resultat; representar el desenvolupament és variant visual si el model és el mateix. **Abast de les proves:** 4 ternes reals amb superficies:8/19.

### 21. `unitats:9 ↔ unitats:1/4/5`

**Conclusió proposada:** tasca diferent. **Nivell:** N1 conversió directa → N2 comparar magnituds. **Exemple:** Comparar 5,6 m amb 545 cm exigeix convertir 5,6 m=560 cm i després decidir que la primera és més gran; convertir 6 m a 600 cm s'atura al valor. **Justificació:** El factor 100 és un subpas compartit; convertir longitud, capacitat o massa no equival a decidir entre dues longituds. La comparació només accepta opció tancada. **Abast de les proves:** 190 + 140 contrastos diferencials reals; 27 decisions a favor de la primera i 23 de la segona, sense input idèntic.

## Revisió dels modes

La suite `scripts/test-mesura-2eso-integracio-modes-vincles.cjs`, executada amb **resultat success** al workflow integrat #44128716228, ha inspeccionat **56 tipus** representatius dels 23 registres i dels destins més propers sobre codi JavaScript real i **DOM simulat**, sense repetir les bateries matemàtiques antigues: 56 pantalles i correccions guiades amb pistes, 56 autònomes sense pistes, 56 exàmens amb quatre opcions, 49 pantalles de pràctica amb resposta oberta i 49 pantalles d'examen amb resposta oberta quan `allowOpen` ho permet. Els 7 tipus amb `allowOpen=false` han quedat amb opció tancada. El test també envia una resposta correcta i una incorrecta pels circuits d'opcions.

**Límit important:** els casos oberts s'han comprovat en la visualització i l'activació del camp, **no** com a verificació de l'acceptació de totes les formes textuals de resposta; tampoc s'ha comprovat selecció probabilística de 20 preguntes d'examen, navegació completa, efectes visuals, accessibilitat o comportament real en mòbil. Cal prova de navegador real abans de considerar la interfície definitivament validada.

## Decisions i límits

- **No fusionar automàticament els tipus** amb només una fórmula compartida: especialment diagnòstics d'error, perímetre versus àrea, volum versus comparació de capacitats, i percentatge d'ompliment versus capacitat total.
- **Mantenir les variants** de Pitàgores 15 (diagonal/catet), Superfícies 17 (sameBase/other), el context de radi/diàmetre i les fórmules inverses quan tenen el mateix objectiu central.
- **Nivells candidats:** tots els enllaços revisats s'expliquen amb coneixements de 2n d'ESO i orientació N1/N2; no cal inventar N3 per omplir una quota. La distribució final requereix la revisió de l'experiència real de l'alumnat.
- **Cobertura pendent per completar validació oficial:** dues mostres reals per *cada destinatari i branca*, no sols per la font; contrast de distractors i respostes obertes en els recorreguts finals; proves de navegador reals; aprovació docent expressa per modificar el mapa `REVIEWED_LEVELS` o `families-validades.json`.
- **Cap canvi funcional**, de nivell oficial, de famílies aprovades ni d'estat de la PR. Es manté **oberta i Draft**, sense fusió ni publicació.

**Nota sobre exemples:** quan una xifra és un exemple aritmètic il·lustratiu i no coincideix necessàriament amb una fixture existent, no representa un aparellament real addicional; el camp «Abast de les proves» n'aclareix la verificació.
