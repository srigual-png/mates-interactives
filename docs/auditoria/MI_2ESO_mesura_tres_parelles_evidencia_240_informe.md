# Contrast matemàtic de tres parelles prioritàries — 2n ESO · Mesura

**Estat:** evidència generativa verificada, proposta pedagògica encara no aprovada. GitHub Actions **#44093014333: success**, 240 instàncies verificades amb oracles independents (40 per cadascun de 6 generadors), sense incidències de resposta, quatre opcions o guies. Les dues primeres instàncies de cada tipus són visibles als logs. No s'ha comprovat encara el funcionament visual complet dels tres modes.

## 1. `problemes:14` ↔ `problemes:15`: perímetre menys porta

**Evidència real:** `problemes:14`: jardí 18 × 10 m, porta de 2 m, 12 €/m → `(2(18+10)−2)·12 = 648 €`. `problemes:15`: habitació 7 × 4 m, porta d'1,2 m → `2(7+4)−1,2 = 20,8 m`. Els passos guiats comparteixen calcular el perímetre i restar la porta; el primer afegeix multiplicar per una tarifa i canvia la magnitud de resposta a euros.

**Decisió candidata:** mateix nucli conceptual de longitud útil, amb **variant composta monetària diferenciada**; no són exercicis idèntics, i una mateixa família només és justificable si el registre conserva la variant i el nivell segons el procés complet. N2 candidat per a la variant amb cost; nivell de la variant simple pendent de contrast curricular. No és fusió autoritzada.

## 2. `problemes:5` ↔ `superficies:8`: àrea lateral de cilindre

**Evidència real:** etiqueta d'una llauna de diàmetre 6 cm i altura 14 cm → `3,14·6·14=263,76 cm²`; cilindre de radi 4 cm i altura 5 cm → `2·3,14·4·5=125,6 cm²`. Tots dos responen **àrea lateral**, exclouen les bases i expliquen circumferència per altura; es diferencien en la dada inicial (diàmetre/radi) i el context.

**Decisió candidata:** **mateixa estratègia matemàtica** amb parametrització i ambientació diferents, prioritària per considerar un únic nucli amb variants. `superficies:19`, que demana dimensions del rectangle desplegat i no àrea, s'ha de mantenir com a objectiu d'avaluació distingible fins a evidència addicional. Cap canvi oficial de famílies.

## 3. `estimacio:6` ↔ `estimacio:18`: error absolut

**Evidència real:** referència 25 cm i mesura 26 cm → error absolut 1 cm. En un altre exercici, referència 20 i aproximació 24, l'alumne fa 20+24=44 i cal identificar que **ha sumat en comptes de restar en valor absolut**. La guia del primer indica el càlcul; la del segon demana avaluar un procediment.

**Decisió candidata:** **mateix concepte, objectius cognitius diferents**: càlcul directe i diagnòstic d'una errada. Conservar-los com a variants avaluables independents fins a contrastar la transferència en mode guiat i examen; no equiparar automàticament les seves dificultats.

## Conclusió i portes de validació

- El test independent acredita la correcció de **240 respostes generades**, no la validació d'una família pedagògica.
- Cal revisar encara distraccions específiques en pantalla i 2 exemples deliberadament aparellats amb **les mateixes dades**, comparar ajudes dels modes guiat/autònom/examen i documentar adequació curricular.
- No s'assigna una quantitat obligatòria N1/N2/N3. Les altres 18 parelles de grups de la cua continuen pendents d'evidència equivalent.
- Cap alteració de generadors, `REVIEWED_LEVELS`, `families-validades.json`, fusió o publicació.
