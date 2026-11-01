# Continuació del punt 3 — numèric i mesura de 3r

291 tipus amb classificació revisada. Estat global: 12/20 blocs revisats; 8 pendents. Canvis locals posteriors a la publicació `5b31a41`, encara sense publicar. Següent parella: algebraic i espacial de 3r.

| Bloc | Tipus | B/M/A base | Generacions | Configuracions pràctica |
| --- | ---: | --- | ---: | ---: |
| numeric | 171 | 132 / 39 / 0 | 37503 | 96 |
| mesura | 120 | 49 / 71 / 0 | 36000 | 96 |

Cada bloc conté vuit temes ordinaris i quatre ampliacions de 4t. Les ampliacions conserven el seu curs i no entren als exàmens ordinaris. Els totals són tipus, no famílies pedagògiques; les variants poden donar dos nivells al mateix tipus.

## Classificació i cobertura

Operacions, signes, potències negatives, exponents fraccionaris i fórmules donades no creen alta per si sols. Les tasques que connecten representacions, magnituds, models estàndard o passos són mitjanes. No s’han trobat famílies altes legítimes al material revisat ni s’hi han afegit famílies noves: la cobertura alta queda pendent.

Els globals equilibrat i només alt es bloquegen en tots dos blocs. A numèric, només baix funciona i només mitjà es bloqueja perquè el tema de reals no té aquesta cobertura. A mesura, només mitjà funciona i només baix es bloqueja perquè Tales i Pitàgores no ofereixen tasques directes de nivell baix. El mode lliure funciona en tots dos casos i preserva tots els temes seleccionats. Les quotes de cada tema provenen de la cobertura real.

## Correccions

- Racionals tipus 10: intervals explícits [a; b), amb l’extrem esquerre inclòs. Ara són correctes també casos exactes com 1−1 = 0; abans la resposta «entre 0 i 1» era ambigua.
- Productes/quocients de fraccions: operands agrupats amb parèntesis per eliminar l’ambigüitat de les divisions en línia.
- Exponent fraccionari tipus 8: el distractor que intercanvia numerador i denominador s’adapta quan són iguals, de manera que no ofereixi una segona resposta equivalent. Les bases fraccionàries es mostren agrupades.
- Tales tipus 9: eliminat un distractor matemàticament equivalent a la resposta, contrastant les quatre proporcions per substitució.
- Precisió de mesura tipus 7: l’interval d’arrodoniment usa notació semioberta i explica els extrems.
- Àrees tipus 8: la guia aprofita l’àrea del rectangle ja donada, sense exigir reconstruir-ne una altura innecessària.
- Variants de cancel·lació, diferència entera, nombre d’autocars i recompte amb repetició tenen nivell explícit. Els errors desats antics es reconeixen sense haver de portar la metadada nova; això no repara tots els enunciats desats antics.

## Validació i límits

Els registres `revisio-3eso-*-punt3.json` contenen la justificació per tipus i variant. Els resultats de bloc documenten 73.503 generacions, 192 configuracions de pràctica, quotes de tema, cinc polítiques globals i absència d’errors de pàgina.

Les dues suites existents d’exàmens de 3r han passat: 16 temes amb nota, preguntes correctes/incorrectes/buides, reinici i retorn a pràctica. La sintaxi de les 20 pàgines i l’accés estàtic són correctes. Les comprovacions independents de càlcul i forma de resposta han passat i consten a `oracles-parella-3eso-punt3.json`: operacions racionals, potències fraccionàries, formes irreductibles, variants antigues, 60 tipus quantitatius de mesura, compra de caixes, proporció única de Tales i lectures obertes. Les proves d’interval racional comparen enters amb denominadors comuns per evitar errors de coma flotant. El detall de regressions és a `regressions-parella-3eso-punt3.json`. Aquestes mostres i proves no certifiquen exhaustivament totes les variants ni substitueixen la justificació pedagògica.
