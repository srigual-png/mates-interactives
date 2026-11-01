# Punt 3 — algebraic, espacial i estocàstic de 3r

Revisats els tres blocs junts: **418 tipus**. Amb numèric i mesura, tot 3r té classificació revisada. Estat global: **15/20 blocs revisats; 5 pendents**, tots de 4t. Aquests tres blocs són canvis locals encara sense publicar, posteriors al commit públic ce0fda9. La següent parella prevista és numèric i mesura de 4t.

| Bloc | Tipus | Bàsica / mitjana / alta base | Generacions verificades | Configuracions de pràctica |
| --- | ---: | --- | ---: | ---: |
| algebraic | 104 | 68 / 36 / 0 | 39000 | 108 |
| espacial | 120 | 85 / 35 / 0 | 41356 | 96 |
| estocastic | 194 | 115 / 79 / 0 | 48513 | 96 |

Les justificacions i mostres per identificador consten als tres registres revisio-3eso-*-punt3.json i es compilen al registre web compartit. El nombre de passos, els signes i el títol d’ampliació no determinen una dificultat alta. No s’han inventat famílies altes per satisfer quotes. Les ampliacions mantenen el curs de contingut i l’exclusió dels exàmens ordinaris.

## Variants de dificultat

Àlgebra distingeix diferència i raó immediates de termes generals o llunyans, continuació recursiva, tarifa directa i equacions que els coeficients redueixen a incompletes. Estocàstic distingeix comprovacions de mostreig, recompte de respostes vàlides, extracció amb reposició i codis amb repetició. Les branques tenen clau explícita als exercicis anotats; els errors desats conserven la clau i les regles concretes recuperen també les branques antigues que no en portaven.

## Correccions de resposta i quotes

- Girs: 270° horari ja no apareix com a incorrecta quan la correcta és 90° antihorari. La guia no demana observar un arc absent de l’enunciat.
- Simetria axial: les opcions incorrectes del punt fix queden fora de l’eix, també en les opcions de reserva. Abans hi podia haver diversos punts fixos vàlids.
- Transformacions combinades: s’eliminen seqüències alternatives que, en determinades coordenades, arriben al mateix punt final.
- Invariants: s’elimina una opció sobre distància a l’origen que esdevenia correcta quan el centre generat era l’origen.
- Quartils: s’ha substituït la interpretació complementària correcta que apareixia entre els distractors. La correcció afecta també la pràctica, no només el filtre d’examen.
- Taules: la llista de dades demana ordre creixent, per evitar dues llistes equivalents en ordres diferents.
- Mosaics: l’examen utilitza **11 bàsiques / 1 mitjana / 0 altes**. La pregunta mitjana té un únic enunciat diferent; la quota automàtica anterior en demanava tres i l’examen fallava. La quota explícita respecta la varietat disponible.

Els globals equilibrats 7/7/6 i només altes queden bloquejats explícitament als tres blocs perquè no tenen cobertura alta. Només mitjanes queda bloquejat a àlgebra i espacial perquè alguns temes seleccionats només tenen bàsiques; funciona a estocàstic. Només bàsiques funciona als tres. No se substitueixen nivells ni s’ometen temes seleccionats.

## Verificació i límits

- 128869 generacions: tots els tipus, resposta canònica única, guies, solucions, dades finites i classificació esperada.
- 300 configuracions reals: nivell, suport guiat/autònom i test/obert. Quotes dels 25 exàmens de tema i cinc polítiques globals per bloc; comprovació de desbordament a 390 px.
- Tres suites existents superades: 25 temes amb lliurament, notes de respostes correctes/incorrectes/buides, colors, explicacions, reinici i retorn a pràctica. Detall a regressions-tres-blocs-3eso-punt3.json.
- 69563 comprovacions addicionals sense incidències a oracles-tres-blocs-3eso-punt3.json: estructura d’opcions en tots els tipus i càlcul independent en les famílies cobertes de polinomis, arrels, coordenades, composicions, homotècies, mitjanes, medianes, quartils, variància i probabilitat. Inclou recuperació de variants. El comprovador no és una certificació matemàtica independent de tots els enunciats qualitatius ni de tots els gràfics.
- Sintaxi dels 20 HTML, classificació compilada coherent i accés estàtic dels 149 scripts superats.

Continuen pendents els cinc blocs de 4t, afegir famílies altes legítimes i varietat on falta, la passada específica de portades i d’errors antics i aprofundir la verificació independent de dibuixos heretats. Els mapes propis de fitxes i exportacions Word/PDF continuen fora d’aquesta migració. **El punt 3 global encara és parcial.**
