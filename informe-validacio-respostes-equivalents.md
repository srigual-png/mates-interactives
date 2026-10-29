# Correcció de la validació de respostes obertes — 29/10/2026

## Errors reals trobats

- `openOk` de primer d’àlgebra es basava en cadenes normalitzades: `x+x` no era reconegut com `2x` sense una alternativa explícita.
- `numEq` de primer de numèric feia `parseFloat` i tenia tolerància per defecte de 0,01: podia acceptar `12abc` com a 12. Diversos validadors numèrics de problemes també extreien el primer nombre d’una cadena.
- Segon, tercer i quart d’àlgebra utilitzaven `Function` i comprovacions en alguns punts per comparar expressions. Aquest camí s’ha substituït pel parser segur i la comparació simbòlica exacta.
- Diversos controladors d’examen i el motor de problemes numèrics de primer no comprovaven que la resposta ja estigués corregida: un segon enviament podia duplicar puntuació o registres.
- Hi havia criteris diferents entre forma estricta, igualtat literal i toleràncies; les restriccions de domini i la forma demanada no tenien una política comuna.
- Dos generadors de fraccions podien donar un enter com a resposta canònica tot i demanar explícitament una fracció. Ara mostren `n/1` quan correspon: segon numèric, raó vermelles/blaves; tercer numèric, suma/resta de decimal i fracció.
- El generador de patrons de quart d’àlgebra podia quedar-se sense tres distractors diferents en una taula lineal. S’hi han afegit candidats matemàticament diferents.

## Canvis implementats

Nucli compartit a `assets/js/validacio-respostes.js`, carregat abans dels generadors de les 20 pàgines. Els adaptadors passen l’exercici complet perquè el nucli conegui la forma, la unitat, la precisió i el tipus de resposta. La lògica separa valor i forma, utilitza racionals exactes i conserva restriccions de denominadors. També gestiona conjunts, parells, sistemes etiquetats, dimensions i conversions, percentatges contextuals, notació científica i precisió decimal.

S’han afegit guardes de doble enviament i missatges específics de pràctica en català. Es conserva la informació que els exàmens ja mostraven. Els controladors existents continuen gestionant puntuació, progrés, navegació i analítica. No s’ha modificat `analitica-mi.js` ni s’hi han afegit respostes o dades personals.

Configuració d’exercicis nous, política i límits: `docs/validacio-respostes.md`. Inventari de funcions inicial/final: `scripts/auditoria-validadors.json`. Resum dels canvis dels HTML: `scripts/canvis-validacio-respostes.json`. Còpies prèvies: `backups/validacio-respostes-20261029/`.

## Cobertura

- Codi integrat en quatre cursos × cinc sentits: numèric, mesura, espacial, algebraic i estocàstic.
- Mostra funcional de pràctica guiada i autònoma: 25 variants de pàgina (A/B a quart), 291 accessos a temes i 3.408 exercicis. 3.276 exercicis mostraven camp obert; les 3.276 respostes canòniques s’han acceptat. Els altres 132 mostraven opcions per `allowOpen:false`.
- Els set temes d’ampliació de primer sense patrons oberts continuen amb el selector desactivat. Les 42 combinacions tema/opció que alternen amb selecció múltiple mantenen aquest comportament.
- Examen general: controladors reals dels 20 apartats, amb pregunta determinista equivalent (`2/4` per `1/2`) i doble enviament.
- Examen per tema: generació i lliurament d’un examen de 12 preguntes en cadascun dels 20 apartats; comprovació de puntuació del 100% en seleccionar les respostes correctes.
- Cinc motors separats de problemes oberts de primer: correcció equivalent i doble enviament amb comptador analític local.

Això és cobertura dels punts de codi indicats i una mostra funcional, no una validació exhaustiva de tota la web ni de totes les combinacions aleatòries. Les alternatives equivalents i incorrectes es proven principalment a la suite del nucli; el recorregut de 3.408 exercicis comprova respostes canòniques i idempotència.

## Proves executades

| Prova | Resultat |
| --- | --- |
| `comprova-validacio-respostes.cjs` | 104 casos correctes/incorrectes superats |
| `comprova-sintaxi-validacio.cjs` | Scripts de les 20 pàgines sense errors de sintaxi |
| `audita-validadors.cjs` | 20 pàgines integrades; retirades les crides a `Function` de tres pàgines |
| `comprova-validacio-funcional.cjs` | 3.276/3.276 obertes acceptades; 0 errors de generació; 0 dobles submisssions |
| `comprova-validacio-motors.cjs` | 20 exàmens generals + 20 per tema + cinc motors de problemes oberts superats |
| `comprova-analitica-guardes.cjs` | Guardes de repetició, dimensions dels 20 apartats i vuit col·lisions del catàleg superades |

La suite inclou fraccions, signes, formats, expressions, factorització/desenvolupament/simplificació, conjunts, sistemes, parells, unitats, percentatges, arrodoniment, domini i entrades malformades o amb intents de codi. La regressió de pràctica comprova que la segona submissió no altera puntuació/progrés/errors i que només hi ha una crida a `MIAnalytics.answer`. La suite d’analítica verifica separadament la deduplicació dels esdeveniments.

Resultats detallats: `scripts/resultats-validacio-respostes-funcional.json` i `scripts/resultats-validacio-motors.json`. Llavor del recorregut general: 20261029. Totes les peticions HTTP/HTTPS s’han bloquejat en les proves de navegador: no s’han generat dades fictícies al GoatCounter de producció.

## Casos pendents i límits

Les notacions que el nucli no interpreta continuen amb validadors especialitzats: radicals generals, identitats trigonomètriques, exponencials d’exponent variable, explicacions de text i algunes notacions d’interval. No s’ha certificat cada branca d’aquests validadors ni cada possible conversió composta. La comparació de dominis és conservadora i la forma algebraica té comprovacions estructurals, sense una factorització irreductible general. Les noves activitats han de declarar explícitament els requisits; la inferència dels enunciats antics no cobreix qualsevol redacció possible.

No s’ha publicat la web. Els canvis són locals i revisables.
