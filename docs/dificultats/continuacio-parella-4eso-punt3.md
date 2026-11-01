# Punt 3 — numèric i mesura de 4t

**252 tipus revisats**, amb ampliacions: 120 numèrics i 132 de mesura. Estat global: **17/20 blocs revisats; 3 pendents**, algebraic, espacial i estocàstic de 4t. La següent parella prevista és algebraic i espacial. Aquests canvis són locals, encara sense publicar, posteriors a la publicació aa058f2.

| Bloc | Bàsica / mitjana / alta base | Temes ordinaris |
| --- | --- | --- |
| Numèric | 95 / 25 / 0 | 8 en A i B |
| Mesura | 93 / 37 / 2 | 5 en A i 8 en B |

Cada bloc conté quatre ampliacions, excloses dels exàmens ordinaris. Els registres revisio-4eso-*-punt3.json inclouen les justificacions de demanda per tipus i variants. Les mostres d’aquests registres provenen del cens anterior; els resultats-punt3-4eso-*.json contenen mostres dels generadors actualitzats.

## Classificació i cobertura

La dificultat depèn de la tasca, no dels signes, la mida dels nombres, el suport o l’itinerari. Aplicar una fórmula coneguda, incloses raons trigonomètriques, exponents fraccionaris i logaritmes introductoris, continua sent bàsic. Els models de context i les representacions connectades són mitjans. Les variants distingeixen seleccions d’una sola persona o del complement d’una persona a Pascal i la identificació d’una estratègia que requereix afegir l’altura dels ulls.

Les dues altes de mesura són versions de la mateixa família: reconstruir una altura comuna amb dues observacions i una separació coneguda, amb distàncies desconegudes. Cal formular dues relacions i eliminar una incògnita; no és alta només perquè hi hagi molts passos. Una versió és ordinària B i l’altra és ampliació. La família continua tenint poca varietat pedagògica i no dona cobertura alta a tots els temes.

- Numèric A/B: només bàsiques i lliure funcionen; equilibrat 7/7/6, només mitjanes i només altes es bloquegen quan tots els temes estan seleccionats.
- Mesura A: només bàsiques i lliure funcionen. Equilibrat, només mitjanes i només altes es bloquegen perquè els temes seleccionats no cobreixen la política demanada.
- Mesura B: equilibrat genera exactament **7/7/6**, incloent tots els temes seleccionats. Només bàsiques i lliure funcionen; només mitjanes i només altes es bloquegen quan falta cobertura en temes seleccionats.
- Les quotes de cada examen de tema es calculen a partir de la classificació real. No s’ometen temes seleccionats ni es canvia una dificultat per completar una quota.

## Correccions aplicades

- Estimació de producte: es demana explícitament arrodonir el primer factor a unitats i el segon a dècimes. Abans diverses opcions eren estimacions raonables.
- Creixement successiu de població: s’arrodoneix al final, com demanava la guia; ja no es perd precisió cada any.
- Radicals: eliminats distractors equivalents quan numerador i denominador de l’exponent coincideixen, i en la suma de radicals (per exemple, 6√8 i 12√2).
- Naturals: el generador evita el resultat zero tal com anuncia la convenció de la teoria.
- Conversió inversa de graus decimals a sexagesimals: s’explicita l’arrodoniment al segon, perquè els graus d’entrada ja es mostren arrodonits.
- Roda sense lliscament: es pregunta l’avanç del centre, que correspon a r·θ, i s’evita confondre’l amb la trajectòria d’un punt de la vora.
- Semblança: eliminada una proporció equivalent que apareixia com a distractor.
- Tangent des de sinus/cosinus aproximats: s’utilitzen els decimals que veu l’alumne; enunciat i guia indiquen que són aproximacions.
- Identitats: eliminada una resposta alternativa vàlida en la comprovació de coherència de tres raons.
- Angles de referència: corregida la guia del tercer quadrant; es calcula respecte de 180°, no de 270°.
- Equivalències trigonomètriques: s’eviten dues opcions correctes a 45°, on sinus i cosinus coincideixen.
- Dues observacions de torre: es concreta terreny horitzontal, observacions a nivell del terra i, en el problema amb dos punts, el mateix costat de la torre.
- Comunicació de la diagonal: es demana explícitament la dècima de metre, per evitar triar entre diversos graus de precisió raonables.
- Dibuix d’angles obtusos: desplaçat el centre perquè els dos costats quedin íntegres dins del marc.
- Els errors desats conserven la variant, i les regles concretes de les dues variants recuperen també preguntes antigues sense clau. Això no equival a corregir tot el contingut històric desat.

## Verificació

- **144000 generacions** entre les passades A i B: tots els tipus, classificació, resposta canònica, pistes, solucions i dades finites.
- **348 configuracions** de pràctica, amb suport guiat/autònom i test/obert; quotes de tema i globals i comprovació de desbordament a 390 px.
- **21 exàmens de tema** superats en les suites existents: 8 numèrics, 8 de mesura B i 5 de mesura A. Inclouen lliurament, notes, buits, colors, reinici i retorn a pràctica.
- **57100 comprovacions addicionals**, amb mostreig directe de tots els tipus i oracles independents per a les famílies quantitatives cobertes: aritmètica, comptatge, percentatges, radicals, exponents, logaritmes, conversions angulars, raons, triangles, mesures indirectes i precisió. També coordenades dels costats de l’angle i etiquetes/raons dels dos esquemes de triangle. Sense incidències pendents. No és una prova independent exhaustiva de tots els enunciats qualitatius i de tot gràfic heretat.
- Sintaxi dels 20 HTML, coherència de classificació compilada i accés estàtic de 149 scripts superats.

Els detalls són a regressions-parella-4eso-punt3.json, oracles-parella-4eso-punt3.json i les quatre passades resultats-punt3-4eso-*.json. Continuen pendents els tres blocs restants de 4t, completar famílies altes i varietat on falten, la passada de portades i errors antics i la migració dels mapes propis de fitxes/Word/PDF. **El punt 3 global encara és parcial.**
