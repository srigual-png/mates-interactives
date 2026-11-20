# Distractors equivalents després de normalitzar unitats · 2n ESO

**Estat:** auditoria diagnòstica amb incidències confirmades; **els generadors no s'han modificat**.

## Execució comprovada

- **128 tipus**, amb **60 mostres per tipus = 7.680 exercicis** generats de manera reproduïble.
- **23.656 opcions** reconegudes com a expressió numèrica amb unitat o com a quantitat adimensional.
- Les unitats es normalitzen a magnituds comparables: longitud, àrea, volum/capacitat, massa, diners i proporcions; s'entenen comes decimals, punts de milers i potències quadrades/cúbiques.
- **35 instàncies** mostren opcions **textualment diferents però numèricament equivalents**, agrupades en **2 tipus**.
- **GitHub Actions #44063548479: success** (el workflow és *diagnòstic*; l'estat correcte del workflow no significa que hi hagi zero incidències).

| Generador | Instàncies afectades en la mostra | Opcions equivalents comprovades | Efecte |
|---|---:|---|---|
| `estimacio:1` | **18** | **0,8 m = 80 cm** | Dos distractors idèntics en valor, disminueix qualitat de les alternatives |
| `estimacio:11` | **17** | **84 m = 0,084 km** | Dos distractors idèntics en valor; a més, ambigüitat pedagògica independent ja identificada |

Les xifres 18 i 17 són **comptatges d'instàncies de la mostra, no de casos matemàtics únics ni de percentatges generals d'error**. Els dos exemples són de parelles de **respostes incorrectes duplicades**, no de la resposta correcta duplicada. La incidència anterior d'`estimacio:11` (p. ex. 1,5 L i 1,51 L, que poden ser totes dues respostes plausibles en absència de criteri instrumental) és **un segon problema diferent**.

## Proposta correctiva per sotmetre a aprovació

- `estimacio:1`: substituir una de les alternatives 0,8 m / 80 cm per una altra magnitud plausible però clarament diferent, evitant opcions absurdes.
- `estimacio:11`: substituir 84 m o 0,084 km per una opció no equivalent i **també** definir l'instrument o la precisió per evitar múltiples respostes justificables.
- Afegir en una futura intervenció autoritzada una comprovació d'unicitat després de normalitzar unitats (no sols comparar cadenes).

## Límits de la prova

El script `scripts/test-mesura-2eso-distractors-equivalents-128.cjs` és una prova **de detecció**: en modalitat habitual informa de duplicats i només falla davant excepcions o cobertura incompleta. La modalitat estricta `MI_AUDIT_STRICT_DUPLICATES=1` pot fer fallar el test mentre persisteixin incidències, útil després d'una correcció autoritzada. El parser només pot comparar **opcions amb un únic nombre i una unitat reconeguda**; no prova opcions redactades com a frases, expressions algebraiques, intervals, combinacions o tots els casos semàntics possibles.

La prova numèrica ampliada anterior (#44062997347) va comprovar **5.120 exercicis** i **800 oracles independents de 20 tipus**; aquesta auditoria de distractors és complementària, **no** 7.680 oracles matemàtics externs.

**Pas següent recomanat:** proposar una correcció concreta dels bancs de distractors dels dos tipus i presentar-la per aprovació explícita abans de modificar el codi, mantenint prioritària l'adequació a 2n ESO.

Cap generador ni nivell oficial modificat, cap família aprovada, cap PR fusionada ni publicació.
