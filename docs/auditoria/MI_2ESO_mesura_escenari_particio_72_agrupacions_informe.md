# Escenari de partició pedagògica — Sentit de la mesura, 2n ESO

**Estat:** exercici de deduplicació i separació provisional, **no un catàleg definitiu de famílies**.

## Traçabilitat i creuament

La prova de creuament de **131 fitxes de dificultat** amb **72 agrupacions provisionals** ja ha passat: [GitHub Actions #44082668403](https://github.com/srigual-png/mates-interactives/actions/runs/44082668403). El resultat reconcilia els **128 tipus de generador** i les **129 assignacions de tipus/variant** del catàleg de famílies. S'han documentat **14 vincles de semblança o distinció** entre estratègies, inclosos tres que travessen agrupacions provisionals diferents.

## Exemple explícit de reorganització, per revisar

Per comprovar la integritat del catàleg es proposa un **escenari mecànic de treball**, no una decisió pedagògica: partir de 72 agrupacions, examinar la divisió de 7 grups, que afegeix 9 subgrups, i combinar dos grups que comparteixen el model de superfície exterior menys retall. El resultat **serien 80 unitats de treball provisionals** si s'apliquessin exclusivament aquestes operacions.

**Important:** 80 **no és el nombre recomanat de famílies matemàtiques**. Aquest escenari ignora altres possibles unions i separacions, i algunes subdivisions són només hipòtesis que poden resultar massa fines.

| Agrupació | Separació candidata | Precaució |
|---|---|---|
| C001 | Distància a escala i itinerari de diversos trams | Un segon pas pot ser una variant de la mateixa família |
| C006 | Deduir escala 1:n i aplicar un factor d'ampliació | Es comparteix el raonament proporcional |
| C008 | Altures per ombra, ombra desconeguda i proporcions abstractes | Potser són variants d'una família de semblança |
| C011 | Tolerància instrumental i coherència d'una lectura | Aquesta distinció és especialment important després de corregir `estimacio:11` |
| C019 | Fórmules d'àrea de paral·lelogram, rombe i trapezi | Una fórmula diferent no implica necessàriament família nova |
| C038 | Hipotenusa general i diagonal de quadrat amb √2 | Cal comprovar si es tracta de cas especial o família |
| C058 | Superfície exterior i reconeixement de cares d'un desenvolupament pla | Objectius cognitius possiblement diferents |

La combinació transversal candidata és **C030 amb C042**: àrea exterior menys àrea interior, amb un cas de franja al voltant d'una piscina que exigeix construir dimensions exteriors. La seva complexitat específica s'ha de conservar com a variant si es confirma la unió.

## Abans de qualsevol canvi real

1. Revisar cada possible separació amb exemples del mateix nivell curricular i identificar la decisió matemàtica diferencial.
2. Contrastar els tipus individuals amb possibles duplicats d'altres agrupacions abans de donar-los entitat de família.
3. Preparar **famílies candidates basades en procediments reals** i proposar N1/N2/N3 per variant, sense obligació de 5–5–3.
4. Revisar les preguntes amb ambigüitat o convenció no explicitada, especialment `estimacio:12` i `estimacio:14`, abans d'aprovar canvis funcionals.

**Fitxa de l'escenari:** `docs/auditoria/MI_2ESO_mesura_escenari_particio_72_agrupacions.json`.

Sense canvis als generadors ni a famílies oficials. El mapa intern de dificultat ara situa `unitats:16` a N2 i el seu grup U-P07; per això s'ha retirat la separació C065 d'aquest escenari. PR #49 no fusionada, web no desplegada.**


**Actualització (21/11/2026):** després del contrast U06/U07/U08, `unitats:16` s'agrupa amb U-P07 (conversió composta) i no es divideix com a família pròpia. L'escenari mecànic baixa de 81 a 80 unitats provisionals; continua sent només una prova d'integritat, no un recompte de famílies.
