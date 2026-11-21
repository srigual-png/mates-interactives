# Segona passada de triatge pedagògic — 65 agrupacions restants

**Projecte:** Mates Interactives, 2n ESO, Sentit de la mesura. **Estat:** hipòtesis d'agrupació i revisió estructurada, sense aprovació curricular de famílies o nivells.

## Traçabilitat i abast

El catàleg inicial conté **72 agrupacions provisionals** i **129 assignacions de tipus/variant**. El total és de **128 tipus generadors** amb una variant mixta (`unitats:6`) registrada desdoblada en directa i encadenada: això no es pot interpretar com 129 tipus ni 72 famílies reals.

La revisió anterior va documentar **7 agrupacions prioritàries**, amb **33 assignacions**. Aquesta segona passada documenta les **65 restants**, amb **96 assignacions**: **24 agrupacions multimembre** amb hipòtesi pedagògica de relació i **41 agrupacions unipersonals** inventariades individualment. En conjunt s'abasten les 72 agrupacions de treball i les 129 assignacions de traçabilitat, sense decidir encara el nombre definitiu de famílies.

## Conclusions pedagògiques de la segona passada

| Agrupacions | Hipòtesi de treball | Precaució didàctica |
|---|---|---|
| C005 / C007 | Reducció/ampliació de longitud i escala d'àrees: comparar direcció del model i factor quadràtic | Canviar la unitat o invertir l'escala no sempre justifica família nova |
| C009 / C015 | Estimacions d'ordre de magnitud i arrodoniment directe amb diferents contexts | Contextos diferents no equivalen necessàriament a estratègies noves |
| C010 / C011 | Error màxim d'arrodoniment, intervals de valors, precisió instrumental i valoració de coherència | **C011 està desactualitzada** respecte del generador corregit `estimacio:11`; aquest tria instrument segons tolerància, no «xifres creïbles» |
| C016 / C017 | Error absolut i relatiu: calcular, comparar i convertir a percentatge | Diferenciar operació elemental de raonament comparatiu o encadenament |
| C021 / C028 / C030 | Fórmules inverses, cercle/semicercle i àrees per sostracció | Distingir inversió de fórmula, reconeixement de figura i càrrega de passos |
| C051–C054 / C060–C061 | Volums, fórmules inverses i superfície lateral o desplegament de cilindre | L'objectiu espacial o la fórmula inversa pot canviar la demanda cognitiva |
| C063–C064 / C066–C067 / C069 / C071 | Conversió d'unitats, suma, anàlisi d'errors, volum–capacitat i elecció de factor | Preservar variants de magnitud, qüestions de diagnòstic i casos de conversió encadenada |

Les agrupacions **unipersonals** queden identificades amb el seu procediment i l'acció de triatge curricular prèvia; no es declaren «famílies úniques» simplement perquè estiguin soles al catàleg.

## Criteri de nivell proposat per a la futura revisió docent

**N1:** una equivalència o regla directa, identificació simple de magnitud o instrument. **N2:** elecció de model, aïllament d'incògnita, combinació de passos o comparació justificada. **N3:** síntesi de decisions i informació en una tasca no rutinària però adequada a **2n ESO**. Això és una **rúbrica de treball** i no una reassignació de cada exercici. La petició 5–5–3 és orientativa i cap nivell s'ha de forçar per quotes.

## Observacions necessàries abans d'aprovar

1. Revisar **C011** a partir del **codi actual**: el generador `estimacio:11` s'ha redissenyat amb toleràncies i ara ja no comparteix exactament el nucli anterior amb `estimacio:14`.
2. Fer anàlisi de diferència d'estratègia i dificultat per a les 24 agrupacions multimembre; la matriu d'hipòtesis aporta justificació inicial, no proves d'aprenentatge ni certificació.
3. Contrastar les 41 agrupacions unipersonals amb els procediments dels altres grups per descartar duplicacions transversals no recollides al catàleg.
4. Prioritzar la dificultat real de variants mixtes `unitats:6`, `pitagores:15` i `superficies:17` abans de validar cap N1/N2/N3.
5. Aprofundir la qualitat de distractors i les convencions d'arrodoniment en `estimacio:12`.

Les **6.200 comprovacions independents** sobre 128 tipus verificades a GitHub Actions són proves per mostreig de resposta **numèrica o contextual**. No són 6.200 observacions docents ni validen que cada pregunta tingui una única resposta defensable en qualsevol context.

**Fitxa detallada:** `docs/auditoria/MI_2ESO_mesura_triatge_pedagogic_65_restants.json`.

**Autoritzacions respectades:** no s'ha modificat cap generador, cap família oficial, cap classificació de dificultat, ni s'ha fusionat la PR #49 o publicat la web.
