# Pitàgores directe, invers i variant mixta — 2n ESO

**Prova:** [GitHub Actions #44109309149](https://github.com/srigual-png/mates-interactives/actions/runs/44109309149), `success`. **1.200 generacions** amb comprovació independent de resultats, opcions i resolucions, **8 parelles reals amb el mateix triangle**. Script: `scripts/test-mesura-2eso-pitagores2-3-15-aparellades.cjs`.

## Contrast cognitiu

- `pitagores:15`, branca diagonal ↔ `pitagores:2` (2 parelles): mateixos catets i mateixa hipotenusa. L'enunciat de `pitagores:15` situa el càlcul en la diagonal d'un rectangle i demana què hauria d'obtenir un alumne; `pitagores:2` el formula directament sobre un triangle rectangle.
- `pitagores:15`, branca catet ↔ `pitagores:3` (3 parelles): mateixa hipotenusa i catet conegut, mateix resultat calculat per resta de quadrats; la branca mixta afegeix una formulació de comprovació.
- `pitagores:3` ↔ `pitagores:2` (3 parelles): el triangle és el mateix però un exercici busca el catet i l'altre la hipotenusa, amb fórmules inverses i respostes diferents.

La prova inicial exigia erròniament **9** exemples aparellats; només hi havia **8 correspondències reals** amb la llavor fixada (2 de diagonal, 3 d'inversa i 3 de directe/invers). S'ha corregit **l'assert del test, no els generadors**, i la prova ha passat amb 8 casos.

**Cobertura:** 14 de les 21 relacions conceptuals amb contrast aparellat; 54 conjunts de casos aparellats en total. En queden 7. Són validacions matemàtiques i comparacions cognitives provisionals, no aprovacions de nivells o famílies, i no inclouen encara les proves dels modes guiat, autònom i examen. La PR es manté sense fusió ni publicació.
