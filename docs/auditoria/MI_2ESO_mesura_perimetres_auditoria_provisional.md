# Auditoria Fase A · Perímetres i àrees (2n ESO)

**ESTAT: PROVISIONAL — PENDENT DE REVISIÓ PEDAGÒGICA. NO IMPLEMENTAT.**

## Fonts, classificació efectiva i límits

Font principal: `2eso/sentit-mesura.html:1307–1425`, funció `genPerimetresArees2ESO(forceType)`, tipus 1–18, `PI=3.14`, i registre `TOPICS` del mateix document. Dificultat efectiva: `assets/js/dificultat-mi.js`, `REVIEWED_LEVELS['2eso/mesura'].perimetres` a la línia 9 i precedència de `reviewedLevels` dins `classify`. Inspecció estàtica, sense execució del navegador.

- **N1 efectiu: 11 tipus** — 1,2,3,4,5,6,7,12,13,14,18.
- **N2 efectiu: 7 tipus** — 8,9,10,11,15,16,17.
- **N3 efectiu: 0 tipus.**
- Sense excepcions de variant `REVIEWED_VARIANTS` per a aquest tema. El mapa antic dins `level()` no substitueix el mapa `REVIEWED_LEVELS` en la pràctica ordinària.
- **Els 18 tipus són formes de generació, no necessàriament 18 famílies**. A continuació hi ha fins a 12 famílies candidates, no validades.

## Matriu provisional de famílies (12 com a màxim)

| ID | Procediment matemàtic | Tipus coberts | Nivell actual | Judici provisional |
|---|---|---|---|---|
| PA01 | Fórmules directes de superfície de polígons (paral·lelogram, rombe, trapezi) | 1,2,3 | N1 | **N1**: seleccionar fórmula coneguda i substituir dades; subfigures diferents, però mateixa estructura de càlcul directe |
| PA02 | Perímetre d'un polígon regular | 4 | N1 | **N1**: multiplicar costats per longitud |
| PA03 | Longitud de circumferència | 5 | N1 | **N1**: aplicació directa 2πr |
| PA04 | Àrea de cercle i semicercle | 6,7 | N1 | **N1**: πr², i meitat del cercle, sense passos de reconstrucció |
| PA05 | Perímetre d'un semicercle, incloent diàmetre | 8 | N2 | **N2**: calcular arc i sumar segment recte; cal identificar tot el contorn |
| PA06 | Àrea de figura composta per sostracció (L, marc, obertures de paret) | 9,11,16 | N2 | **N2**: àrea exterior menys una o més àrees interiors; el context no crea família nova |
| PA07 | Àrea de figura composta per suma de rectangle i semicercle | 10 | N2 | **N2**: interpretar diàmetre, obtenir radi i sumar àrees de dues figures |
| PA08 | Reconstruir dimensió a partir d'una fórmula d'àrea (base triangle, altura trapezi) | 12,13 | N1 | **N1/N2 pendent**: aïllar una incògnita coneguda és directe; la fórmula de trapezi té agrupació i pot justificar N2 si s'exigeix raonament més complex |
| PA09 | Recuperar radi a partir de la circumferència | 14 | N1 | **N1** provisional: desfer 2πr; no és per si sol una reconstrucció N3 |
| PA10 | Àrea de polígon regular emprant perímetre i apotema donada | 15 | N2 | **N2**: primer P=n·c i després A=P·a/2; no es demana calcular l'apotema |
| PA11 | Àrea de corona circular amb radi exterior obtingut d'amplada | 17 | N2 | **N2**: radi exterior r+w, després πR²−πr² |
| PA12 | Detectar confusió entre fórmula de circumferència i d'àrea | 18 | N1 | **N1** actual defensable: pregunta explícita i resposta diagnòstica entre distractors evidents |

**Cobertura exhaustiva:** tipus 1–18, una vegada cadascun. El nombre **12 és un sostre de famílies candidates**: PA01 pot dividir-se si la selecció de fórmula exigeix procediments diferents, PA08/PA09 poden fusionar-se com a «inversió de fórmula» segons el criteri del protocol, i PA06/PA11 comparteixen la sostracció d'àrees però PA11 inclou el càlcul previ de R. No sumar per quota sense justificar-ne la singularitat.

## Dos exemples resolts per família

Els exemples són **construïts a partir de les fórmules i dominis del generador**, no són mostres observades en una execució de la web.

- **PA01**: paral·lelogram base 8 cm, altura 5 cm → A=8·5=**40 cm²**; trapezi bases 12 i 6 cm, altura 4 cm → A=(12+6)·4/2=**36 cm²**. Error: usar perímetre en lloc d'àrea, o no dividir per dos on pertoca.
- **PA02**: pentàgon regular de costat 4 cm → P=5·4=**20 cm**; hexàgon regular de costat 6 cm → P=6·6=**36 cm**. Error: confondre nombre de costats amb nombre de diagonals.
- **PA03**: circumferència radi 3 cm → L=2·3,14·3=**18,84 cm**; radi 5 cm → L=2·3,14·5=**31,40 cm**. Error: utilitzar πr².
- **PA04**: cercle de radi 4 cm → A=3,14·16=**50,24 cm²**; semicercle radi 4 cm → A=3,14·16/2=**25,12 cm²**. Error: oblidar el quadrat del radi o la meitat del semicercle.
- **PA05**: semicercle radi 2 cm → P=3,14·2+4=**10,28 cm**; radi 3 cm → P=3,14·3+6=**15,42 cm**. Error: comptar només l'arc i ometre el diàmetre.
- **PA06**: figura L: rectangle 10×8 cm amb retall 3×2 cm → 80−6=**74 cm²**; marc quadrat exterior 12 cm i obertura interior 10 cm → 144−100=**44 cm²**. Error: sumar en lloc de restar les parts buides.
- **PA07**: rectangle 10×6 cm amb semicercle sobre el costat de 6 cm → r=3, A=60+3,14·9/2=**74,13 cm²**; rectangle 12×8 cm amb semicercle de diàmetre 8 cm → A=96+3,14·16/2=**121,12 cm²**. Error: interpretar el diàmetre com si fos el radi.
- **PA08**: triangle d'àrea 24 cm² i altura 6 cm → b=2·24/6=**8 cm**; trapezi d'àrea 36 cm² i bases 12 i 6 cm → h=2·36/(12+6)=**4 cm**. Error: oblidar el factor 2 o no agrupar la suma de bases.
- **PA09**: circumferència L=18,84 cm → r=18,84/(2·3,14)=**3 cm**; L=31,40 cm → r=31,40/(2·3,14)=**5 cm**. Error: dividir només per π.
- **PA10**: polígon regular de 6 costats de 4 cm amb apotema donada 3,46 cm → P=24, A=24·3,46/2=**41,52 cm²**; pentàgon regular costat 4 cm, apotema donada 2,75 cm → P=20, A=20·2,75/2=**27,50 cm²**. Les apotemes aquí són dades d'exemple: no es demana deduir-les amb trigonometria. Error: confondre costat amb perímetre.
- **PA11**: estany radi 3 m amb camí d'amplada 1 m → R=4, A=3,14·(16−9)=**21,98 m²**; estany radi 4 m, camí 2 m → R=6, A=3,14·(36−16)=**62,80 m²**. Error: fer servir només π·amplada².
- **PA12**: «per a l'àrea amb r=3, fer 2·3,14·3» calcula **18,84 cm de longitud**, no l'àrea; correctament A=**28,26 cm²**. «Amb r=4, fer 2·3,14·4» calcula **25,12 cm**, però A=**50,24 cm²**. Error: confondre magnituds i unitats.

## Discrepàncies i riscos específics

1. **Tipus 12 i 13:** se'ls ha assignat N1, però invertir una fórmula pot ser més laboriós que aplicar-la; **no reclassificar per complexitat superficial** sense contrastar passos, expectatives del curs i temps de resposta. El trapezi requereix tenir clar `B+b` com un sol factor.
2. **Tipus 14:** inversió `r=L/(2π)` directa, N1 plausible, encara que una altra auditoria pugui agrupar-la en una família d'inversió de fórmules.
3. **Tipus 15:** el codi calcula internament l'apotema amb tangent, però **l'alumne ja rep l'apotema arrodonida**: no és una tasca trigonomètrica. El resultat usa l'apotema presentada. Cal provar arrodoniment i alternatives.
4. **Tipus 17:** la corona circular comparteix resta de superfícies amb 9/11/16, però obliga a derivar un radi exterior abans; es pot defensar subfamília N2 amb passos diferenciats.
5. **Tipus 18:** distractors evidents, diagnosi gairebé explícita; N1. Fer-lo N2 exigiria redissenyar la tasca.
6. **Tipus 2:** diagonals del rombe no tenen al codi una condició de relació `d≤D`; algunes combinacions poden presentar una 'diagonal menor' igual o superior a l'altra, però l'enunciat diu només «diagonals» i l'àrea és matemàticament calculable. Es pot millorar realisme sense afirmar error actual.
7. **N3:** no s'ha justificat cap cas de reconstrucció no immediata, restriccions complexes o diagnosi oberta. No crear famílies artificials.
8. **Solapaments**: amb Pitàgores, l'àrea de triangle és una fórmula comuna, però aquí no es reconstrueix l'altura via Pitàgores; amb Escales, les àrees a escala poden reutilitzar figures, però requereixen un factor addicional.

## Proves pendents i criteris de tancament

- **Comprovat en aquesta passada:** les 18 branques, el mapa efectiu N1/N2, fórmules i exemples aritmètics representatius.
- **Encara no comprovat:** execució dels generadors amb llavors i oracles independents, navegació de modes, fitxes, exàmens, precisió de totes les combinacions i font curricular normativa externa.
- **No modificar ara:** ni els exercicis, ni `assets/js/dificultat-mi.js`, ni `docs/auditoria/families-validades.json`. Correccions funcionals i eventual canvi de nivell únicament en una PR específica, després de revisió pedagògica.
