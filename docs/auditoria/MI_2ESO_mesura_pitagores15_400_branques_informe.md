# Contrast de les dues branques de Pitàgores 15 — 2n ESO

**Resultat empíric:** GitHub Actions [#44098522318](https://github.com/srigual-png/mates-interactives/actions/runs/44098522318), `success`. S'han generat **400 exercicis** amb oracle matemàtic independent i comprovació de quatre opcions úniques: **192 diagonals** i **208 catets inversos**; cap error. Les dues branques tenen cobertura efectiva i mostres accessibles als logs.

| Branca | Exemple real | Estratègia |
|---|---|---|
| Diagonal | Rectangle 6 × 8 cm → diagonal 10 cm | `√(6²+8²)`: suma de quadrats |
| Catet | Hipotenusa 20 cm, catet 12 cm → altre catet 16 cm | `√(20²−12²)`: resta de quadrats |

**Decisió pedagògica candidata:** no assignar obligatòriament el mateix nivell a totes dues. Una branca treballa Pitàgores directe per trobar hipotenusa; l'altra, la inversió per trobar un catet. Per a 2n ESO poden ser variants d'un mateix teorema, però tenen **decisions i dificultats diferents** i cal conservar aquesta distinció al registre. Cal observar els nivells realment exigits en mode guiat, autònom i examen abans d'aprovar família o nivell.

**Límit:** 400 respostes matemàticament coherents no demostren que les variants siguin famílies diferents ni que els nivells siguin N1/N2 concrets. No hi ha canvis a generadors, `REVIEWED_LEVELS` o `families-validades.json`, ni fusió o publicació.
