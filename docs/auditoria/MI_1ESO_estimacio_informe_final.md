# Estimació de mesures — informe final de validació (provisional)

**Base:** `main` a `e725568f58ed925f4ab5f2db1e8f08298ea73103` (PR #30); branca de treball creada des d’aquest SHA.
**Tema:** `estimacio` · 1r d’ESO, Sentit de la mesura.
**Estat:** PR de tancament pendent de revisió; aquest recompte és provisional. No s’ha modificat el registre definitiu ni s’ha fet merge/publicació.

## Inventari inicial i decisió de famílies

`crearBossaEstimacio()` conté 40 referents: 10 de longitud, 10 de capacitat, 10 de massa i 10 de superfície. Els 40 són preguntes de selecció de magnituds habituals, no 40 procediments. També hi havia `estimacio-comparada` (1002, N2) i `estimacio-amb-garantia` (1001, N3). El generador original té quatre tipus; longitud, capacitat, massa i àrea són magnituds/variants del mateix objectiu d’estimació directa mitjançant referents.

| ID estable | Procediment | Generadors / variants | Anterior → final | Raó |
|---|---|---|---|---|
| `estimacio-per-referents` | Estimar una magnitud quotidiana comparant-la amb referents i descartant ordres de magnitud absurds | Tipus 1–4; banc original de 40 ítems | N1 → **N1** | Lectura directa de magnituds conegudes i selecció de l’ordre plausible; canviar longitud per capacitat, massa o àrea no canvia el procediment. |
| `estimacio-amb-limit-superior` | Fer una estimació suficient amb el límit superior explícit d’un interval i arrodonir unitats de compra cap amunt | 1002; `estimacio-comparada` | N2 → **N2** | Cal seleccionar el cas desfavorable ja delimitat, calcular-ne l’àrea i aplicar sostre d’unitats senceres. |
| `estimacio-amb-garantia` | Garantir material suficient davant marges màxims en dues dimensions | 1001 | N3 → **N3** | Cal combinar els extrems desfavorables de dues mesures, calcular una àrea màxima i justificar la compra mínima sencera. |

**Distribució final: 3 famílies — N1=1, N2=1, N3=1.** No s’han creat famílies separades per magnitud ni s’ha apujat el nivell dels 40 referents. La cobertura de generadors també ha estat corregida: el rotador de `topic.gen()` ometia el generador original i impedia que aparegués N1; ara reserva una posició per a aquest generador, igual que per a les activitats de catàleg.

## Mancances i canvis implementats

- El banc de referents cobria les quatre magnituds, però només preguntava valors habituals i no usava referents en una estimació relacional. La família N1 continua sent introductòria; l’enunciat i l’ajuda han estat ajustats perquè l’àrea es tracti com una estimació amb referent i escala, sense presentar dimensions donades com si fossin una estimació.
- S’ha conservat la comparació contextual de límits com a N2; el text indica que s’usa el límit superior, de manera que no queda una interpretació subjectiva.
- La tasca de garantia conserva marges explícits i retalls aprofitables; en conseqüència, el sostre de paquets és inequívoc.
- Les variants de referents s’identifiquen totes amb `estimacio-per-referents`, nivell 1, tant a `taskDifficulty`/`diff` com al classificador compartit.

## Exemples resolts

### Estimar mitjançant referents — N1

1. **Enunciat:** Quina és una estimació raonable de la llargada d’una porta interior: 20 cm, 2 m o 20 m? **Resposta:** 2 m. **Raó:** una porta és de l’ordre d’un adult; 20 cm és massa curt i 20 m és propi d’un edifici.
2. **Enunciat:** Quina capacitat és més plausible per a un got d’aigua: 25 ml, 250 ml o 25 l? **Resposta:** 250 ml. **Raó:** un got habitual conté centenars de mil·lilitres.
3. **Enunciat:** Quina massa és més plausible per a una taronja: 20 g, 200 g o 20 kg? **Resposta:** 200 g. **Raó:** és de l’ordre de centenars de grams, no de desenes de quilograms.

### Estimar amb límit superior — N2

1. **Enunciat:** Llargada entre 6 i 7 m, amplada 5 m, paquets de 4 m²; usa el cas suficient. **Resposta:** 9 paquets. **Passos:** àrea màxima `7×5=35 m²`; `35÷4=8,75`, per tant cal arrodonir cap amunt.
2. **Enunciat:** Llargada entre 4 i 5 m, amplada 3 m, cada paquet cobreix 6 m². **Resposta:** 3 paquets. **Passos:** `5×3=15 m²`; `15÷6=2,5`, sostre 3.
3. **Enunciat:** Llargada entre 8 i 9 m, amplada 7 m, cada paquet cobreix 5 m². **Resposta:** 13 paquets. **Passos:** `9×7=63 m²`; `63÷5=12,6`, sostre 13.

### Garantir una compra amb marges — N3

1. **Enunciat:** Una sala s’estima en `6 m × 4 m`, amb error màxim `0,2 m` per dimensió; paquet de `5 m²`. **Resposta:** 6 paquets. **Passos:** màxims `6,2` i `4,2`; àrea màxima `26,04 m²`; `ceil(26,04÷5)=6`. Cinc paquets només cobreixen 25 m².
2. **Enunciat:** `5 m × 3 m`, marges `0,1 m` i `0,2 m`, paquet de `4 m²`. **Resposta:** 5 paquets. **Passos:** `5,1×3,2=16,32 m²`; `ceil(16,32÷4)=5`.
3. **Enunciat:** `8 m × 6 m`, marges `0,3 m` i `0,2 m`, paquet de `7 m²`. **Resposta:** 8 paquets. **Passos:** `8,3×6,2=51,46 m²`; `ceil(51,46÷7)=8`.

## Errors freqüents

- Confondre centímetres amb metres o mil·lilitres amb litres i acceptar un factor 10/1000 manifestament inversemblant.
- Tractar una estimació com una mesura exacta o no usar cap referent.
- En N2/N3, usar el valor central o el límit inferior quan es demana una compra suficient.
- Arrodonir paquets cap avall; una fracció de paquet també obliga a comprar una unitat sencera més.
- A N3, aplicar el marge a una sola dimensió en lloc de combinar els dos màxims.

## Validació executada

| Prova | Resultat |
|---|---|
| `comprova-estimacio-families-1eso.cjs` | PASS, dues execucions reproduïbles; 1.000 mostres del banc original (250 per tipus), 500 del catàleg (250 per ruta), correctors/opcions/metadades i oracles independents. |
| `comprova-estimacio-1eso.cjs` | PASS, dues execucions deterministes a Chrome; cobertura N1/N2/N3, pràctica, rotació/error, exàmens 12/20, regressió 30×6 temes, teoria/ancoratges, hashchange, 390 px i cap error JS. |
| Regressions matemàtiques existents | PASS per als sis temes previs: metric (1.250), conversions (2.000), temps (2.750), perímetres (4.250), àrees (4.750), mesurament (7.000 mostres). |
| Tests integrals previs | PASS per als sis temes, executats individualment després de corregir l’omissió dels generadors originals a `metric`, `conversions` i `temps`. |

Les dues proves amb navegador han usat Chrome disponible; Edge no s’ha provat en aquesta execució. Les proves locals cobreixen vista responsive i àncores funcionals, però no substitueixen una inspecció visual humana detallada. GitHub Pages i el merge d’aquesta PR són pendents per definició.

## Reproducció a Windows CMD

```cmd
node scripts\comprova-estimacio-families-1eso.cjs
node scripts\comprova-estimacio-1eso.cjs
```
