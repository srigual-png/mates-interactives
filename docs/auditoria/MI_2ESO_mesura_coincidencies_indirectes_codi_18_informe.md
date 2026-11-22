# Coincidències funcionals indirectes: revisió del codi real

**Abast:** 18 tipus inspeccionats a `2eso/sentit-mesura.html`, sis per cadascuna de les candidates d'Escales, Perímetres i Estimació. No és una auditoria exhaustiva de les 128 implementacions: l'auditoria global anterior sí que abastava les **128 descripcions**.

## Escales: validació de dos plànols

S'han contrastat `escales:12/13/15/16` i `problemes:9/11`. El codi actual treballa factor lineal, correspondències, escala inversa, perímetre d'un plànol i superfície d'una franja. Els subprocediments de conversió i reconstrucció de dimensions són reutilitzables.

**Diferència encara plausible:** comprovar *simultàniament* dues parelles de dimensions reals de plànols independents i admetre un gir de 90° quan estigui permès. Una àrea igual no és condició suficient de congruència (4×3 m i 6×2 m tenen 12 m² i dimensions diferents). Cal revisar si és família pròpia o variant d'escala+comparació.

## Perímetres: contorn exterior compost

S'han contrastat `perimetres:9/11`, `problemes:11/14/15` i `escales:16`. Les activitats existents resten àrees interiors, calculen perímetres de rectangles i exclouen una obertura per obtenir metres de tanca o sòcol.

**Diferència encara plausible:** distingir una **frontera interna compartida** entre dues figures unides, que desapareix del perímetre exterior, d'una **obertura** que no s'ha de cobrir. La vora comuna entre semicercle i rectangle exigeix identificació geomètrica; si només s'aplica una fórmula memoritzada, pot quedar com a variant composta.

## Estimació: acceptació sota tolerància

S'han contrastat `estimacio:6/10/12/14/17` i `problemes:16`. És la candidata amb el **solapament indirecte més delicat**: `estimacio:12` ja pregunta quin interval és compatible amb una mesura arrodonida; això ja suposa un criteri d'admissibilitat, tot i que el límit es dedueix de la precisió de l'arrodoniment.

**Diferència pendent d'acreditar:** decidir l'admissibilitat de dues o més lectures respecte d'una **tolerància percentual externa**. La mesura de menor error pot seguir inacceptable; una lectura exactament al límit inclusiu és acceptable. Cal distingir rigorosament si aquest criteri és una família nova o una variant de l'aplicació d'errors.

## Decisió de cribratge

| Candidata | Estat després de revisar el codi | Principal dubte |
|---|---|---|
| Escales | Estratègia diferenciable, **no validada** | Dues conversions i comparació, o modelització independent? |
| Perímetres | Estratègia diferenciable, **no validada** | Identificació genuïna de frontera o fórmula composta? |
| Estimació | Estratègia diferenciable amb **solapament important**, no validada | Tolerància externa vs interval admès per arrodoniment (`estimacio:12`) |

**Resultat formal:** zero famílies genuïnes noves aprovades, zero N3 homologats. No s'han creat generadors ni modificat `families-validades.json` o cap nivell. Cap PR fusionada ni cap desplegament.

## Verificació reproduïble

La matriu documental és a [MI_2ESO_mesura_coincidencies_indirectes_codi_18.json](MI_2ESO_mesura_coincidencies_indirectes_codi_18.json). El validador `scripts/test-mesura-2eso-coincidencies-indirectes-18.cjs` comprova que les signatures dels enunciats es troben en les branques reals de cada generador, que existeixen els vincles previs de traçabilitat i que cap decisió es presenta com a validada.

**Següent pas recomanat:** contrast de resolucions i guies amb alumnat o criteri docent sobre els tres dubtes, prioritzant `estimacio:12`. Només després, decidir si cada proposta és família nova, variant o pràctica composta i establir-ne el nivell N2/N3.
