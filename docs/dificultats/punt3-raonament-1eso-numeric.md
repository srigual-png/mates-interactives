# Punt 3: cobertura de raonament a 1r numèric

Continuació de la primera reclassificació. Data: 30/10/2026. Canvis locals, sense publicar.

## Resultat actual

S’incorporen 14 famílies noves: 12 altes, una per cada tema ordinari, i dues mitjanes per a sistema decimal i potències. El cens web d’aquest bloc passa de 91 a 105 tipus. El banc contextual passa de 51 a 61 entrades perquè reutilitza 10 de les famílies altes noves; no són 10 famílies pedagògiques addicionals.

La classificació web queda en 60 tipus baixos, 33 mitjans i 12 alts. El banc contextual té 5 entrades baixes, 46 mitjanes i 10 altes. Els 12 temes ordinaris disposen ara dels tres nivells. notacio2 continua com a ampliació de continguts de 2n, fora dels exàmens de 1r i sense alta; el buit continua explícit.

## Demanda matemàtica de les famílies noves

| Tema | Identificador | Nivell | Justificació |
| --- | --- | --- | --- |
| naturals | paquets-exactes | Alta | Planificar una combinació exacta de dos formats i demostrar que minimitza el nombre de paquets. |
| decimal_sys | xifres-amb-condicions | Alta | Coordinar valor posicional, paritat i ús únic de les xifres per construir el màxim. |
| decimal_sys | canvi-posicional | Mitjana | Relacionar dos valors posicionals i calcular el canvi de contribució al nombre. |
| ops | compra-combinada | Alta | Comparar compres mixtes, excés d’unitats i cost mínim; el preu unitari sol no resol el problema. |
| potencies | dos-quadrats-invers | Alta | Reconstruir dues disposicions quadrades amb una relació entre costats i un total conjunt, sense equacions de segon grau. |
| potencies | fila-columna | Mitjana | Relacionar una potència amb dos conjunts de rajoles i evitar comptar dues vegades la cantonada. |
| jerarquia | parentesis-resultat-positiu | Alta | Explorar agrupacions admissibles, respectar l’ordre i discriminar el mínim estrictament positiu. |
| divis | divisibilitat-condicions | Alta | Combinar criteris de divisibilitat i restriccions posicionals, cercant i contrastant candidats. |
| mcmmcd | coincidencies-desfasades | Alta | Coordinar progressions periòdiques amb inicis diferents i un llindar; aplicar només mcm als intervals no determina la primera coincidència. |
| enters | moviments-amb-limits | Alta | Explorar ordres de moviments amb signes i validar tots els estats intermedis contra dos límits. |
| decimals | volum-amb-error | Alta | Escollir el pitjor cas en dues direccions i comprovar simultàniament suficiència i capacitat abans de decidir un enter. |
| fraccions | fraccions-reconstruccio | Alta | Reconstruir el total desfent en ordre invers dues fraccions sobre bases diferents i una retirada fixa. |
| proporcionalitat | produccio-amb-pressupost | Alta | Deducció de dos ritmes proporcionals i elecció d’hores enteres amb pressupost i límits de disponibilitat. |
| percentatges | llindar-ofertes | Alta | Cercar un llindar enter desconegut, comparar models de descompte i distingir igualtat de millora estricta. |

L’alta es justifica per cercar i contrastar combinacions, reconstruir dades, coordinar condicions o validar decisions. Cap família puja de nivell per augmentar els nombres o ocultar pistes. Els problemes de quadrats es resolen cercant costats enters, sense equacions de segon grau; els horaris es poden resoldre amb llistes de múltiples desfasades, sense teoremes de cursos posteriors. Les combinacions i l’elecció òptima es resolen amb taules petites de casos, no amb fórmules avançades de combinatòria o optimització.

Les variants preserven condicions rellevants: diversos repartiments exactes admissibles; dos possibles dígits parells a les unitats; una compra mixta estrictament millor que qualsevol format únic; tres resultats positius diferents entre agrupacions; diversos candidats de divisibilitat; horaris amb inicis diferents; alguns ordres de moviments vàlids i alguns invàlids; pressupost insuficient per fer funcionar totes les hores i una producció mixta superior a una sola màquina. Els casos impossibles del problema d’error mantenen la quantitat demanada dins de la capacitat: cal raonar sobre els marges, no només detectar un dipòsit massa petit.

## Integració i cobertura real

El fitxer assets/js/raonament-numeric-1eso.js aporta els generadors i els incorpora únicament als TOPICS i al banc contextual de la web de 1r numèric. Les funcions base de les fitxes no s’han modificat en aquesta entrega. La capa compartida anota les tasques i calcula les capacitats dels filtres amb el catàleg nou.

| Tema | Tipus B / M / A | Quotes d’examen B / M / A |
| --- | --- | --- |
| naturals | 4 / 1 / 1 | 4 / 4 / 4 |
| decimal_sys | 4 / 1 / 1 | 4 / 4 / 4 |
| ops | 4 / 2 / 1 | 4 / 4 / 4 |
| potencies | 7 / 1 / 1 | 7 / 3 / 2 |
| jerarquia | 2 / 7 / 1 | 3 / 7 / 2 |
| divis | 6 / 1 / 1 | 6 / 3 / 3 |
| mcmmcd | 3 / 2 / 1 | 4 / 4 / 4 |
| enters | 6 / 1 / 1 | 6 / 3 / 3 |
| decimals | 6 / 3 / 1 | 6 / 3 / 3 |
| fraccions | 8 / 3 / 1 | 8 / 3 / 1 |
| proporcionalitat | 4 / 4 / 1 | 4 / 4 / 4 |
| percentatges | 3 / 4 / 1 | 4 / 4 / 4 |
| notacio2 | 3 / 3 / 0 | Fora de l’examen de 1r |

Tots els exàmens ordinaris mantenen 12 preguntes i inclouen els tipus del tema, amb les quotes reals declarades. Una família alta pot aportar diverses variants numèriques, però no es presenta com a varietat de famílies: l’examen adverteix que l’alta d’aquell tema està limitada a una família. El banc contextual també ho indica quan mostra aquestes altes. La barreja alta de categories pot reunir famílies de procediments diferents.

Les pistes i les resolucions es mostren en els modes existents. La correcció oberta i test, els enllaços a teoria i el guardat d’errors es mantenen. S’ha completat el registre d’identitat del banc als errors contextuals perquè la classificació es recuperi després de desar i recarregar l’historial. Les pistes de les famílies noves s’ofereixen sense mostrar anticipadament la solució.

## Validació

- scripts/comprova-raonament-1eso-numeric.cjs: 1.442 casos de les 14 famílies amb oracles independents. Inclou fonts aleatòries als extrems i al punt mitjà, casos impossibles, igualtat en el llindar, exhaustió dels ordres o agrupacions i comprovació que la resposta correcta no ocupa sempre la mateixa posició.
- scripts/comprova-punt3-1eso-numeric.cjs: 7.800 generacions de temes i 1.525 del banc contextual, 105 tipus i 61 entrades observats; quotes, filtres, cobertura, 150 oracles anteriors i les 64 combinacions de persones enteres superats.
- scripts/comprova-raonament-web-1eso.cjs: 112 respostes reals de pràctica entre suport guiat/autònom, test/oberta i resposta correcta/incorrecta; 14 formes decimals equivalents, 20 respostes contextuals i recuperació d’errors persistits correctes.
- comprova-examens-tema.cjs: suite existent superada per als 20 temes de 1r numèric i mesura, amb notes, buides, reinici, retorn a pràctica i global. Els inventaris esperats inclouen les noves famílies.
- Integració dels 20 blocs, opcions A/B i quatre modes per tema: scripts/comprova-punt2.cjs superat després d’incorporar les famílies.
- Revisió visual a 390 × 844 de pràctica alta guiada i examen amb nota de cobertura: llegibles i sense desbordament horitzontal.

Les dades i mostres són a oracles-raonament-1eso-numeric.json, resultats-punt3-1eso-numeric.json i raonament-web-1eso-numeric.json. La revisió de cada tipus, amb els nous identificadors, és a revisio-1eso-numeric-punt3.json; la versió anterior a les altes es conserva a revisio-1eso-numeric-punt3-abans-altes.json.

## Estat i següent bloc

La reclassificació de les tasques existents i els buits dels temes ordinaris de 1r numèric queden tractats. La cobertura alta és inicial i limitada: una família per tema. No es certifica exhaustivament tota resposta o variant dels generadors heretats, ni queda complet el punt 3 global. La notació científica d’ampliació manté un buit alt declarat. El següent bloc de revisió pedagògica és 1r mesura, mantenint aquests límits registrats i les fitxes per a la fase posterior.
