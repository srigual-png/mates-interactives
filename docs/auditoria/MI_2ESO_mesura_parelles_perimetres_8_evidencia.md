# Comparació aparellada de perímetres — 2n ESO

**Evidència matemàtica confirmada:** GitHub Actions [#44103600888](https://github.com/srigual-png/mates-interactives/actions/runs/44103600888), `success`. **1.280 instàncies generades** (320 per tipus) i **8 parelles amb dades coincidents** (4 per contrast) verificades amb un oracle independent, opcions i guies. Prova reproduïble: `scripts/test-mesura-2eso-dues-parelles-parametres-iguals.cjs`.

## `perimetres:5` vs `perimetres:14`
Amb el mateix radi de 2 cm, l'exercici directe demana `2·3,14·2 = 12,56 cm`; l'invers parteix de `12,56 cm` de circumferència i demana obtenir **2 cm** de radi. Comparteixen expressió `L=2πr`, però **canvia la incògnita i cal aïllar-la**. Una eventual família comuna requeriria variants diferenciades, especialment en dificultat i ajudes.

## `perimetres:4` vs `perimetres:15`
Amb pentàgon de costat 4 cm, el primer demana perímetre **20 cm**. El segon reutilitza `20 cm` i incorpora apotema **2,75 cm** per calcular àrea **27,5 cm²**. Comparteixen un subprocés, però **no la magnitud final**; no s'ha de tractar com la mateixa tasca simple.

## Abast

Aquesta evidència cobreix dos vincles conceptuals únics de la cua (tres registres si es compten els dos vincles recíprocs entre `perimetres:4` i `perimetres:15`). Els altres **19 vincles conceptuals** encara necessiten mostres aparellades, i les modalitats guiat/autònom/examen no s'han verificat en aquesta prova. **Cap proposta de família o nivell s'ha aprovat.** No s'han modificat generadors, mapes oficials, ni s'ha fusionat o publicat la PR.
