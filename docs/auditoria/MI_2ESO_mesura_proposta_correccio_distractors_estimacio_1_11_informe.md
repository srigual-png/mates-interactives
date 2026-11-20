# Proposta de correcció dels distractors d'Estimació 1 i 11 (2n ESO)

**Estat:** document de proposta. **No s'ha canviat cap exercici publicat ni cap generador.**

## Diagnòstic

La bateria de 7.680 exercicis ha detectat **35 instàncies** amb dues opcions textualment diferents però numèricament equivalents, dins de dos tipus:

- **`estimacio:1`**: `0,8 m` i `80 cm` són exactament el mateix valor, encara que totes dues siguin respostes incorrectes davant d'un gruix de mòbil de `8 mm`.
- **`estimacio:11`**: `84 m` i `0,084 km` equivalen. A més, en les preguntes sobre precisió, `1,5 L` i `1,51 L` o `1,8 mm` i `1,81 mm` poden ser expressions plausibles segons l'instrument de mesura no especificat.

## Correcció proposada

**Estimació 1:** al cas «gruix d'un mòbil», substituir `0,8 m` per `0,8 mm`. Les quatre opcions quedarien: **8 mm** (correcta), **8 cm**, **80 cm**, **0,8 mm**. Les quatre representen valors diferents. S'ha de confirmar pedagògicament que els distractors siguin prou plausibles, no només diferents.

**Estimació 11:** reformular els quatre casos perquè la precisió requerida sigui **explícita** i hi hagi una única resposta correcta. Exemple:

> Un comptaquilòmetres indica **84,36 km** i el mapa resum demana quilòmetres sencers. Quin valor s'ha d'anotar?

Opcions: **84 km** (correcta), 85 km, 843 km, 83 km.

La fitxa JSON incorpora quatre propostes de preguntes contextualitzades (alçada, distància, moneda i ampolla), cadascuna amb quatre opcions i la seva justificació. En aquest disseny l'alumnat ha de llegir les dades i decidir la precisió que demana el registre.

## Reserva pedagògica rellevant

La reformulació de `estimacio:11` podria solapar-se amb `estimacio:5` i `estimacio:16`, que ja treballen arrodoniments explícits. Per tant, **no convé aplicar-la directament sense decidir** si es prefereix:

- Conservar una activitat de **criteri de precisió contextual**, afegint una descripció realista de l'instrument i una justificació oberta.
- Convertir-la en activitat de **precisió requerida i arrodoniment inequívoc**, assumint que seria una variant d'una família ja existent.

La segona opció és més fàcil de corregir automàticament, però la primera pot tenir més interès pedagògic si el disseny queda inequívoc.

## Validació

El script `scripts/test-mesura-2eso-proposta-distractors-estimacio.cjs` comprova que les **cinc propostes** (una del tipus 1 i quatre del tipus 11) tinguin quatre alternatives numèriques diferents, que l'oracle estigui present i que **no hi hagi cap canvi funcional aprovat**.

**CI #44064090273: success.**

La fitxa de proposta és `docs/auditoria/MI_2ESO_mesura_proposta_correccio_distractors_estimacio_1_11.json`.

## Decisió pendent

Cal una decisió explícita sobre la finalitat pedagògica d'`estimacio:11` abans de modificar codi. La PR #49 continua en fase d'auditoria; sense fusió, desplegament, modificació de generadors o classificacions oficials.
