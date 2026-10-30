# Feina pendent després de publicar la continuació del punt 3

S’han publicat els 7 blocs revisats al commit `d01d71a`. Els 13 següents continuen pendents de revisió pedagògica completa. El recompte és el cens observat de l’auditoria anterior, no una validació nova.

| Curs | Sentit | Temes | Tipus observats |
| --- | --- | ---: | ---: |
| 2eso | algebraic | 10 | 136 |
| 2eso | espacial | 11 | 107 |
| 2eso | estocastic | 11 | 133 |
| 3eso | numeric | 12 | 171 |
| 3eso | mesura | 12 | 120 |
| 3eso | algebraic | 13 | 104 |
| 3eso | espacial | 12 | 120 |
| 3eso | estocastic | 12 | 194 |
| 4eso | numeric | 12 | 120 |
| 4eso | mesura | 12 | 132 |
| 4eso | algebraic | 12 | 129 |
| 4eso | espacial | 12 | 123 |
| 4eso | estocastic | 12 | 120 |

## Primera passada: àlgebra de 2n

136 identificadors en 10 temes: set ordinaris i tres ampliacions de 3r (`productes3r`, `identitats3r`, `sistemes3r`). S’ha inspeccionat el cens de mostres i els generadors de problemes, transformacions d’equacions i variants de pensament computacional. Aquesta passada encara no substitueix el mapa de classificació.

- Separar substitució i reconeixement directe de coordinar passos o formular un model. Per exemple, llegir el pendent no demana el mateix que deduir una fórmula d’una taula.
- Revisar les tres branques del tipus 11 d’equacions: restar un terme indicat és una operació directa; distribuir i reduir exigeix connectar operacions.
- Els problemes 3–10 generen models estàndard d’edats, consecutius, compres, perímetres, tarifes, repartiment, descompte invers i moviment. No convertir-los automàticament en alts pel context.
- Distingir interpretar una solució contextual (problemes 11), detectar un model incorrecte (12), detectar el desfasament n/n−1 (computacional 13) i passar d’algorisme a fórmula (16). Revisar totes les branques fixes i les equivalències acceptades.
- Comprovar les gràfiques de funcions lineals i les respostes algebraiques equivalents; preservar el curs de contingut de les tres ampliacions.

## Ordre de continuació

1. Tancar àlgebra de 2n: registre explícit per tipus/variant, oracles de resposta i filtres/quotes reals.
2. Espacial i estocàstic de 2n; després els cinc sentits de 3r i els cinc de 4t.
3. Cobertura alta legítima i varietat dels bancs dels blocs revisats: manquen altes a àlgebra, espacial i estocàstic de 1r; revisar també els buits ordinaris de 2n.
4. Portades autònomes, exercicis antics desats, dibuixos i equivalències de resposta. Migració de mapes propis de fitxes queda diferenciada dels generadors web.

Les quotes estrictes poden bloquejar un examen si falta cobertura; això queda visible i no es compensa canviant etiquetes. El punt 3 segueix parcial.

## Incidència trobada durant la publicació

La verificació de GitHub ha descobert una fallada intermitent de distractors a nombres reals de 4t. S’ha reproduït després de 35 exàmens de tema. Els tipus 3 i 10 podien coincidir en les alternatives racionals fins a no disposar de quatre opcions diferents. S’hi afegeixen 0, 1 i −1 com a reserva racional; la resposta correcta continua sent la mateixa expressió irracional. Això corregeix les opcions, sense donar per revisada la classificació del bloc de 4t.
