# Continuació del punt 3 — parella espacial i estocàstic de 2n

Classificació revisada de 240 tipus entre dos blocs. Estat global: 10/20 blocs revisats; 10 pendents (els cinc sentits de 3r i els cinc de 4t). Canvis locals posteriors a `8e94175`, encara sense publicar. El següent parell és numèric i mesura de 3r.

| Bloc | Tipus | B/M/A base | Generacions | Configuracions pràctica |
| --- | ---: | --- | ---: | ---: |
| espacial | 107 | 53 / 52 / 2 | 34498 | 84 |
| estocastic | 133 | 95 / 38 / 0 | 38550 | 84 |

Els totals compten tipus, no famílies independents. Les variants poden afegir un altre nivell al mateix tipus. Cada bloc té set temes ordinaris i quatre ampliacions de 3r, que conserven el seu curs i queden fora dels exàmens ordinaris.

## Canvis

- Espacial: interpretació de les tres vistes i cadena ombres/alçada/cable conserven alta. Cada distractor de les tres vistes coincideix en dues i falla en una de diferent, cosa que obliga a contrastar-les totes. Fórmules directes, signes, girs coneguts i ampliacions no reben alta per aquest sol fet.
- El dibuix del rectangle de Pitàgores 3r, tipus 2, oculta ara el costat demanat i mostra la diagonal coneguda. Abans revelava la resposta i marcava la diagonal com a incògnita.
- La tria de transformació evita punts on la simetria coincideix amb el gir de 90° ofert com a distractor.
- La translació nul·la té resposta explícita «Cap desplaçament (identitat)».
- Triangles dels cables/escala mostren metres quan l’enunciat usa metres. Els costats decimals de les figures semblants no mostren restes de coma flotant.
- Estocàstic: la reconstrucció d’una llista demana ordre creixent; desapareix l’ambigüitat de la llista permutada. L’adaptador d’examen evita repetir aquesta instrucció.
- Variants explícites i recuperació dels errors antics: model d’escala, centre amb valor extrem, respostes vàlides, titulars, reposició i codis amb/sense repetició. S’hi afegeix la variant directa del llindar màxim de freqüències (100%).

## Cobertura i límits

Espacial: dues famílies altes ordinàries, amb buits als altres temes; l’examen global equilibrat 7/7/6 és possible combinant nivells i respectant tots els temes seleccionats. Només mitjà o només alt es bloquegen per manca de nivell en algun tema seleccionat.

Estocàstic: no hi ha famílies altes legítimes al material revisat. Els modes equilibrat i només alt es bloquegen explícitament; lliure, només baix i només mitjà funcionen. El tipus 13 d’experiments continua exclòs dels exàmens per l’ambigüitat entre arbre i taula. No s’ha afegit material nou per omplir aquests buits.

## Proves

Els JSON de resultats documenten els 240 tipus, les 168 configuracions de pràctica, les quotes dels temes i les cinc polítiques globals. Les proves independents de `oracles-parella-2eso-punt3.json` inclouen 150 reconstruccions del costat ocult, 150 girs contrastats amb trigonometria, 750 construccions llegides des dels polígons SVG i 150 casos de tres vistes amb una sola construcció correcta; també 180 llistes ordenades, 720 enumeracions de monedes/daus, 900 mitjanes/medianes i 1.080 recuperacions de variants antigues, i 180 percentatges acumulats amb el nivell de la variant. Els cinc desenvolupaments de cub, els cinc distractors i les 30 cares oposades també s’han contrastat amb un oracle discret independent.

La sintaxi de les 20 pàgines i l’accés estàtic són correctes. Les suites heretades tenen una primera execució interrompuda pel límit de navegació de 30 segons; la passada seqüencial posterior ha superat les quatre suites. La regressió ampliada d’estocàstic ha passat 1.405 comprovacions. El detall és a `regressions-parella-2eso-punt3.json`. Cap resultat tècnic certifica exhaustivament totes les solucions o la interpretació de tots els dibuixos.
