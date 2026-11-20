# Suficiència de l'evidència d'E2 i P3 — 2n ESO, Sentit de la mesura

**Conclusió: evidència insuficient per aprovar una família genuïna o assignar-ne un nivell oficial.**

Aquest informe comprova els registres reals de la PR #49, sense simular observacions docents. Dades: [MI_2ESO_mesura_E2_P3_suficiencia_evidencia.json](MI_2ESO_mesura_E2_P3_suficiencia_evidencia.json).

| Evidència | E2 (Escales) | P3 (Perímetres) |
|---|---|---|
| Oracle matemàtic reproduïble | Sí | Sí |
| Comparació amb generadors preexistents | Documentada | Documentada |
| Guia i fitxes d'observació | Preparades | Preparades |
| Raonaments o observacions docents **registrats** | No | No |
| Revisió de controls i transferències **registrada** | No | No |
| Criteris C1–C5 **validats per docent** | No | No |
| Decisió de família i dificultat **aprovada** | No | No |

## Punts exactes que falten

**E2:** manca una revisió docent real de si la necessitat de rebutjar rectangles de **4×3 m** i **6×2 m** malgrat la igualtat d'àrea (12 m²) constitueix una estratègia independent, més enllà de repetir conversions i comparacions. Cal contrastar el raonament amb el control E3 i transferència E4.

**P3:** manca una revisió real de si excloure les dues aparicions del costat de 4 m en sumar els perímetres dels rectangles de 6×4 i 2×4 m —**20+12−2×4 = 24 m**— generalitza una habilitat pròpia, més enllà del càlcul de perímetres habituals. Cal contrastar amb P2 i transferència P1/P4.

## Decisió correcta ara

Deixar ambdues propostes amb el valor **`insufficient_evidence`**. No és una denegació definitiva: és una constatació que no hi ha a l'acta cap valoració docent signada ni resolucions observades. Una revisió experta ben documentada pot ser suficient; una prova real amb alumnat és una opció, no una obligació universal.

El validador `scripts/test-mesura-2eso-E2-P3-suficiencia-evidencia.cjs` comprova que les fitxes estan buides, l'acta no està signada i els camps d'aprovació no s'han modificat. **GitHub Actions #44058318286: success.**

**Punt de parada per aprovació externa:** cal una revisió i decisió docent explícita, amb evidències sobre independència matemàtica, abans de catalogar noves famílies o establir N2/N3. No cal produir més documents administratius per simular aquest pas.

Cap generador ni nivell oficial alterat, cap PR fusionada, cap canvi publicat.
