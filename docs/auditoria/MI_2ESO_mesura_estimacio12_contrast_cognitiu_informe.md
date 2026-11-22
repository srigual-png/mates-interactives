# Contrast aprofundit de `estimacio:12` i càrrega cognitiva de tres candidates

**Estat:** revisió documental sense cap nova família ni nivell homologat. Dades reproduïbles: [MI_2ESO_mesura_estimacio12_contrast_cognitiu.json](MI_2ESO_mesura_estimacio12_contrast_cognitiu.json).

## 1. Dos criteris d'admissibilitat diferents però relacionats

El generador real `estimacio:12` proposa, per a una mesura arrodonida a la dècima, l'interval **semiobert** `[r−0,05,r+0,05)` cm. És la convenció concreta implementada al generador; no s'ha de generalitzar a qualsevol regla d'arrodoniment.

La proposta `MI2-MES-EST-N3-01` comprova si cada lectura satisfà una **tolerància percentual externa**: `100·|lectura−referència|/referència ≤ tolerància` (referència positiva), amb llindar inclusiu i sense arrodonir prèviament.

Els dos procediments comparteixen el **nucli de pertinença a una regió admissible**, però difereixen en la construcció de la regió i en la inclusió de fronteres.

## 2. Quatre contraexemples matemàtics

Suposem una referència i mesura registrada de **12,3 cm** arrodonida a la dècima: l'interval del generador és **[12,25,12,35)** cm.

| Lectura | Tolerància externa | Compatible amb l'arrodoniment? | Acceptada per la tolerància? |
|---|---:|---|---|
| 12,35 cm | 1% | No: extrem superior exclòs | Sí |
| 12,25 cm | 1% | Sí: extrem inferior inclòs | Sí |
| 12,18 cm | 1% | No | Sí |
| 12,28 cm | 0,1% | Sí | No |

Per tant, **els resultats no són intercanviables**, però la diferència de resposta no acredita una família genuïna nova. Cal valorar si l'aprenentatge diferencial —deduir l'interval de precisió davant aplicar una tolerància externa— justifica identitat de família o només una variant.

**Conclusió provisional d'Estimació:** classificar la proposta com a **probable variant de decisió per cotes**, pendent de revisió docent. No sumar-la al recompte de famílies; no acreditar N3.

## 3. Dificultat de les tres candidates

| Proposta | Nivell de prova pilot orientatiu | Condició observable per estudiar N3 |
|---|---|---|
| Escales: dos plànols | **N2 hipotètic** | Justificar congruència/refutació de dues representacions amb cas enganyós d'àrees iguals i rotació autoritzada |
| Perímetres: contorn exterior | **N2 hipotètic** | Identificar sense fórmula donada les fronteres internes i externes en més d'una geometria, i defensar les vores seleccionades |
| Estimació: tolerància relativa | **N2 hipotètic** | Interpretar un criteri d'acceptació no rutinari i demostrar una estratègia que no estigui ja coberta per la família de cotes d'arrodoniment |

Els tres dissenys poden resoldre's com a càlculs coneguts seguits d'una comprovació. **Tres passos no són per si mateixos N3**, i cap d'aquests N2 orientatius és un canvi funcional del classificador.

## 4. Validació i següent decisió

El script `scripts/test-mesura-2eso-estimacio12-contrast-cognitiu.cjs` comprova els quatre contraexemples amb dos oracles independents i les tres fitxes de revisió, mantenint explícitament **zero famílies i zero N3 aprovats**.

**GitHub Actions #44054073045: success.**

**Següent pas:** preparar una matriu de decisió docent amb criteris mínims de família genuïna i tasques de demostració d'independència per **Escales i Perímetres**, i avaluar **Estimació com a variant** de decisió d'admissibilitat. Aquesta matriu ha de separar l'aprovació pedagògica de qualsevol posterior implementació tècnica.

No s'ha modificat cap generador, el mapa de nivells, `families-validades.json`, ni s'ha fusionat o publicat cap PR.
