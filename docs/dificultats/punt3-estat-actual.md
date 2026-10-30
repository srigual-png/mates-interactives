# Punt 3 — estat de la continuació

**Estat: parcial. 7 blocs amb classificació revisada; 13 blocs pendents. Publicació verificada: d01d71a.**

El registre anterior de 1r numèric es conserva. Aquesta continuació reclassifica 1r mesura, algebraic, espacial i estocàstic, i 2n numèric i mesura. Les decisions explícites són als fitxers `revisio-*-punt3.json`; el compilador `scripts/compila-revisions-punt3.cjs` les aplica al contracte compartit. No s’ha aplicat una regla automàtica de paraules clau per decidir els nivells.

## Matriu de classificació

Els totals són identificadors de tema/tipus i entrades de banc; no són un recompte de famílies pedagògiques independents. Les reutilitzacions s’expliquen més avall. B/M/A compta el nivell base: els tipus amb variants de dos nivells també figuren al detall JSON i a la cobertura real de la interfície.

| Curs | Sentit | Tipus revisats / inventariats | Banc revisat / inventariat | B / M / A base | Estat |
| --- | --- | ---: | ---: | --- | --- |
| 1eso | numeric | 105/105 | 61/61 | 60 / 33 / 12 | Reclassificat; veure buits i límits |
| 1eso | mesura | 97/97 | 46/46 | 43 / 39 / 15 | Reclassificat; veure buits i límits |
| 1eso | algebraic | 43/43 | 42/42 | 27 / 16 / 0 | Reclassificat; veure buits i límits |
| 1eso | espacial | 72/72 | 42/42 | 66 / 6 / 0 | Reclassificat; veure buits i límits |
| 1eso | estocastic | 95/95 | 49/49 | 78 / 17 / 0 | Reclassificat; veure buits i límits |
| 2eso | numeric | 192/192 | 0/0 | 120 / 71 / 1 | Reclassificat; veure buits i límits |
| 2eso | mesura | 186/186 | 0/0 | 85 / 94 / 7 | Reclassificat; veure buits i límits |
| 2eso | algebraic | Cens pendent | Pendent | Pendent | Pendent |
| 2eso | espacial | Cens pendent | Pendent | Pendent | Pendent |
| 2eso | estocastic | Cens pendent | Pendent | Pendent | Pendent |
| 3eso | numeric | Cens pendent | Pendent | Pendent | Pendent |
| 3eso | mesura | Cens pendent | Pendent | Pendent | Pendent |
| 3eso | algebraic | Cens pendent | Pendent | Pendent | Pendent |
| 3eso | espacial | Cens pendent | Pendent | Pendent | Pendent |
| 3eso | estocastic | Cens pendent | Pendent | Pendent | Pendent |
| 4eso | numeric | Cens pendent | Pendent | Pendent | Pendent |
| 4eso | mesura | Cens pendent | Pendent | Pendent | Pendent |
| 4eso | algebraic | Cens pendent | Pendent | Pendent | Pendent |
| 4eso | espacial | Cens pendent | Pendent | Pendent | Pendent |
| 4eso | estocastic | Cens pendent | Pendent | Pendent | Pendent |

## Canvis i evidència

- **Mesura de 1r:** 80 identificadors originals revisats, inclosos 38 patrons contextuals i volum com a ampliació. S’han afegit 10 famílies (8 altes i 2 mitjanes). Les 8 altes també entren al banc contextual; 7 són reutilitzacions de les famílies dels temes. Resultat: 97 identificadors web i 46 patrons de banc, sense comptar aquestes reutilitzacions com a famílies noves. Les altes demanen distribuir talls, coordinar càrrega i massa, planificar un transbordament, optimitzar dimensions, garantir marges o comparar compres mixtes.
- **Àlgebra de 1r:** 43 tipus i 42 patrons oberts. Coeficients, reduccions directes i substitucions passen a baixa; formular models o coordinar passos queda a mitjana. Els tipus 7/8 d’equacions distingeixen operació única i cadena de dues operacions. S’ha desambiguat «el triple…, més 2» i impedit triangles isòsceles inexistents al patró E9. Traducció disposa de cinc enunciats mitjans diferents; l’examen declara 7/5/0.
- **Espacial de 1r:** 72 tipus i 42 patrons oberts. Les definicions, fórmules directes i propietats recordades no són altes. Es distingeixen el volum de prisma amb base triangular i l’efecte de duplicar el radi.
- **Estocàstic de 1r:** 95 tipus i 49 patrons, incloses les tres construccions gràfiques fora d’examen. Lectura directa, complements i freqüència experimental són baixos; coordinar lectures, interpretar biaix o reconstruir dades queda a mitjana. La mediana amb nombre parell es distingeix de la lectura central senar.
- **Numèric de 2n:** 192 tipus amb les quatre ampliacions. Les quatre tasques que motivaven la revisió són baixes. S’han contrastat amb oracles 100 comparacions d’error absolut, 100 disminucions i 100 primers passos; també la cancel·lació del parèntesi i el creixement per duplicacions. Racionals conserva la família alta de llindar amb total variable.
- **Mesura de 2n:** 186 tipus amb les quatre ampliacions. Les altes d’ampliació que combinen models geomètrics conserven el seu curs de contingut i queden fora dels exàmens ordinaris. S’han corregit apotemes incompatibles, cons/piràmides degenerats, la precisió dels extrems d’arrodoniment i les raons de volums que abans es distorsionaven en mostrar decimals.

## Validació i límits

Les mostres per identificador, els filtres reals en suport guiat/autònom i test/obert, les quotes dels exàmens de tema i globals i els bancs oberts consten a `resultats-punt3-*.json`. Els oracles nous són `oracles-raonament-1eso-mesura.json`, `casos-pedagogics-punt3.json` i `oracles-geometria-2eso-mesura.json`. Les suites existents queden a `regressions-punt3.json`. Que passin els filtres no demostra per si sol la dificultat: la justificació és la demanda de les tasques registrada per tipus.

La font de les quotes dels temes revisats és la cobertura real. Un examen pot declarar 12/0/0 o 6/6/0 si no hi ha altes. El selector global conserva una quota demanada estricta: si no es pot satisfer amb tots els temes seleccionats, ho bloqueja explícitament. No es reconverteixen preguntes bàsiques en altes ni s’exclou un tema seleccionat per dissimular el buit.

Última passada de suites existents: **19/19 superades**. Les sis passades noves de bloc consten als JSON anteriors. Les famílies noves de mesura de 1r tenen 1.530 casos d’oracle independent, 80 sessions de correcció real i vuit exàmens d’un sol tema amb 20 preguntes altes. Les dades geomètriques corregides de 2n tenen 127 casos exhaustius.

**Pendents:** revisar els altres 13 blocs (següent: 2n algebraic), completar cobertura alta i varietat dels bancs on manca, i aprofundir la validació independent de respostes i dibuixos heretats. Àlgebra, espacial i estocàstic de 1r han quedat sense famílies altes legítimes en el material original. Les altes noves de mesura de 1r tenen una sola família per tema ordinari (el tema de problemes en reutilitza vuit); el volum d’ampliació no té alta. Les portades autònomes pendents i els exercicis antics desats també requereixen una passada específica. No es dóna per complet el punt 3 ni tota la web.

## Efecte sobre fitxes i publicació

No s’han modificat formularis ni exportacions Word/PDF. La classificació nova s’aplica als generadors web embolcallats. Els camps de variant no alteren el càlcul dels generadors numèrics compartits amb les fitxes; els seus mapes propis continuen pendents de migració. Les correccions de dades geomètriques actuen al generador base de mesura de 2n i afectaran qualsevol consumidor que el reutilitzi. Les famílies noves de mesura de 1r s’afegeixen als temes i al banc web, sense substituir els generadors base de conversions i àrees. La publicació verificada consta a `publicacio-punt3.json`. La revisió dels 13 blocs restants continua pendent; el detall de la passada posterior és a `pendents-despres-publicacio-punt3.md`.
