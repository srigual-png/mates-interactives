# Primer catàleg global provisional · Sentit de la mesura, 2n ESO

**Estat: no aprovat.** Font estructurada: [MI_2ESO_mesura_cataleg_global_provisional.json](MI_2ESO_mesura_cataleg_global_provisional.json).

## Què s'ha consolidat

- **128 de 128 tipus** dels set temes ordinaris, amb 129 registres d'assignació perquè `unitats:6` té les variants directa i encadenada.
- **72 agrupacions de treball** construïdes conservadorament a partir dels grups locals i d'enllaços `shared_core` explícits. D'aquestes, **9 abasten més d'un tema**.
- **14 enllaços transversals estrictes** fets servir per connectar grups. Les altres **45 relacions** (subpassos, variants o diferències) queden com a pistes de revisió, sense fusió.
- La suite `scripts/test-mesura-2eso-cataleg-global.cjs` ha superat GitHub Actions (#44044589178). Això confirma la integritat de la proposta, **no** la qualitat ni equivalència pedagògica.

## Advertiment metodològic important

Aquest és un **catàleg de clústers de revisió**, no un recompte de famílies genuïnes. Les agrupacions locals poden ser massa àmplies; un enllaç matemàtic amb una part d'una agrupació no prova que tots els membres siguin equivalents. Les agrupacions transitives s'han de **desfer si barregen habilitats diferents**. No es pot afirmar que existeixin 72 famílies validades ni deduir-ne automàticament els nivells.

Exemples prioritaris de grups potencialment excessius:

1. **Pitàgores:** la categoria local de càlcul d'hipotenusa inclou diagonals, rampes, cables i escales recolzades; cal separar les situacions que exigeixen identificar el triangle o combinar passos de les hipotenuses explícites.
2. **Escales i semblança:** ombres, proporció algebraica ja formulada i costat homòleg poden demanar càrregues cognitives diferents, encara que comparteixin proporcionalitat.
3. **Estimació:** ordre de magnitud general i estimació contextual de capacitat poden ser variants d'un mateix nucli o estratègies diferents; falta evidència real.
4. **Superfícies/volums:** conservar la distinció de volum directe, inversions, àrees laterals i desplegaments; no fusionar per coincidència d'una fórmula.
5. **Problemes:** els tipus compostos es mantenen separats quan la coincidència amb altres temes només és un subpas.

## Proper pas verificable

Cal una **passada d'escissió i justificació de cada clúster**: crear dues instàncies reals per agrupació prioritària, comparar procediment requerit, decisions i prerequisits, assignar evidència específica de nivell per variant, i construir una matriu curricular. Només llavors es podrà calcular la diversitat genuïna **per tema** i el dèficit respecte als mínims (15 famílies: 5 N1, 5 N2, 3 N3). No es crearan famílies ni es promouran exercicis a N3 per arribar a una quota.

No s'ha modificat `families-validades.json`, cap generador, cap nivell publicat ni s'ha fusionat cap PR.
