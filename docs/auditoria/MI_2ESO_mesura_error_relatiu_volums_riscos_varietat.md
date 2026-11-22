# Revisió de varietat i mostreig: error relatiu i comparació de volums (2n ESO)

**Origen:** test nou de 600 instàncies, GitHub Actions #44100643570. La primera execució ha fallat per un **error del parser de la prova**, no per una resposta matemàtica errònia del generador: la puntuació final després de `8,4.` es llegia com un nombre no vàlid. Corregit només a `scripts/test-mesura-2eso-error-relatiu-comparacions-i-volums.cjs` a la PR #49; cal comprovar el resultat de la nova execució.

## Observacions pedagògiques independents del parser

1. **`estimacio:9`:** el catàleg de quatre casos fa que la mesura A tingui sempre un error relatiu menor que B. Fins i tot el cas 80→82 vs 8→8,4 dona respectivament 2,5 % i 5 %. Risc d'endevinar A sense calcular. La variació necessita una **proposta de correcció funcional separada** i autorització abans d'aplicar-la.
2. **`problemes:16`:** en els quatre casos definits al generador, A també té sempre l'error relatiu més baix; tots dos errors divideixen pel mateix valor de referència. És una comparació amb denominador comú; resulta cognitivament més simple que `estimacio:9` quan els denominadors són diferents.
3. **`superficies:17`:** la primera mostra de 400 va generar **8 variants de base igual** i **392 de bases diferents**. La probabilitat de practicar la simplificació per altura sembla baixa. La dada és un mostreig reproduïble, no una quota establerta. No canviar ponderacions sense aprovació.

## Límits i estat

Les comprovacions automàtiques d'errors, opcions i guies no són validació docent ni revisió UI. Les respostes A/B de les dues comparacions d'error relatiu necessiten varietat real perquè les opcions no siguin predictibles; això s'ha de tractar a la PR funcional amb consentiment explícit, sense afegir exemples artificials a la PR documental.

**Cap generador ni mapa de nivells s'ha alterat.** PR #49 Draft, no fusionada ni publicada.
