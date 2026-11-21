# Addenda · Revisió dels tipus 6, 13, 17 i 18 d'Unitats i conversions

**Estat (21/11/2026):** la classificació interna de les variants de `unitats:6` i del tipus `unitats:18` ja està reconciliada amb el mapa vigent; les famílies i la validació curricular continuen provisionals. Aquesta addenda documenta la proposta i les proves existents, sense aprovar famílies oficials.

## 1. Evidència i classificació actual

**Fonts:** `2eso/sentit-mesura.html` (generadors dels tipus 6, 13, 17 i 18) i `assets/js/dificultat-mi.js` (`REVIEWED_LEVELS` i `REVIEWED_VARIANTS` de `2eso/mesura`).

La revisió efectiva distingeix les variants del tipus 6: la branca base queda a **N1** i `difficultyVariant='encadenada'` s'assigna a **N2**. El tipus 18 és **N2** al mapa base. Els tipus 13 i 17 es mantenen a **N1**. Aquestes són assignacions internes, no nivells oficials ni aprovació de famílies.

## 2. Variants exhaustives dels quatre tipus

| Tipus | Cas real al generador | Procediment | Nivell actual | Recomanació |
|---|---|---|---|---|
| 6 | 2,5 dm³ → 2,5 L | Equivalència immediata | N1 | **N1** |
| 6 | 750 cm³ → 750 mL | Equivalència immediata | N1 | **N1** |
| 6 | 1,2 m³ → 1.200 L | Conversió encadenada de volum a capacitat | N2 (`encadenada`) | **N2** |
| 6 | 3,4 L → 3.400 cm³ | Conversió encadenada L→dm³→cm³ | N2 (`encadenada`) | **N2** |
| 6 | 850 mL → 850 cm³ | Equivalència immediata | N1 | **N1** |
| 6 | 2.400 L → 2,4 m³ | Conversió encadenada de capacitat a volum | N2 (`encadenada`) | **N2** |
| 13 | 3,2 m² = 320 dm² | Verificar factor 100 | N1 | **N1** |
| 13 | 0,8 m³ = 800 dm³ | Verificar factor 1.000 | N1 | **N1** |
| 13 | 2,5 L = 2.500 cm³ | Verificar relació volum–capacitat | N1 | **N1**, revisar justificació |
| 13 | 4 m² = 400 cm² (falsa) | Detectar factor lineal erroni; resultat 40.000 cm² | N1 | **N1/N2 debatible**; no elevar sense revisar enunciat |
| 17 | Alumne fa 5 · 100 per convertir m² a cm² | Identificar oblit del quadrat de l'escala | N1 | **N1**, distractors massa febles |
| 17 | Alumne fa 2 · 10 per convertir m³ a dm³ | Identificar confusió d'escala volumètrica | N1 | **N1**, distractors massa febles |
| 17 | Alumne diu que L i cm³ no es relacionen | Identificar l'equivalència volum–capacitat | N1 | **N1**, distractors massa febles |
| 18 | 500/750/1.250/1.800/2.400/3.500 mL → dm³ | mL=cm³ i 1.000 cm³=1 dm³; conversió encadenada | N2 | **N2** |

**Important:** la variant incorrecta del tipus 13 exigeix valorar la igualtat, però l'opció correcta ja descriu explícitament l'error i els distractors són desiguals. No es pot equiparar a un diagnòstic o justificació oberts de N2. El tipus 17 demana «Quin és l'error principal?» i ofereix l'explicació com a resposta: no pressuposa reconstrucció de la solució.

## 3. Ajust de l'inventari de famílies

El contrast dels tipus **12, 16 i 18** amb les tres variants directes i les tres encadenades del tipus 6 resol la consolidació provisional de U06/U07/U08. La clau és el procediment que demana cada cas, no el format de resposta:

| Família candidata | Tipus/variants vinculats | Nivell proposat | Procediment distintiu |
|---|---|---|---|
| **U-P06 · equivalència directa volum–capacitat** | `unitats:12`; variants directes de `unitats:6` | **N1** | Aplicar directament `dm³↔L` o `cm³↔mL`, sense canviar després a una altra escala |
| **U-P07 · conversió volum–capacitat composta** | variants `encadenada` de `unitats:6`; `unitats:16`; `unitats:18` | **N2** | Enllaçar l'equivalència volum–capacitat amb un canvi de prefix/escala, o reconèixer el resultat correcte d'aquesta cadena |

El tipus **16 no pertany a U-P06 només perquè sigui de tria múltiple**. Les quatre igualtats correctes són `0,75 m³=750 L`, `2.400 cm³=2,4 L`, `3,5 dm³=3.500 mL` i `1,2 L=1.200 cm³`; cadascuna combina l'equivalència volum–capacitat amb un canvi d'escala. Això el fa procedimentalment més proper a la branca encadenada de `unitats:6` i al tipus 18 que a les equivalències directes del tipus 12. Que l'alumne seleccioni en lloc d'escriure el resultat no elimina aquest pas de raonament.

Per tant, U06/U07/U08 **no es compten com tres famílies ni com una sola família indiferenciada**: queden dues famílies candidates per demanda procedimental (directa i composta). Les famílies continuen provisionals. El mapa intern encara classifica `unitats:16` a N1; aquesta discrepància amb la proposta N2 queda documentada per a una decisió d'aplicació separada. No s'ha modificat el classificador ni s'ha reclassificat cap nivell en aquesta addenda.

No es reporta un recompte final de famílies N1/N2/N3 per al tema. El nombre de tipus no és el nombre de famílies, i no s'ha detectat cap N3 justificable en aquests tipus.

## 4. Resolució del contrast 6/18 i pendents

1. El tipus **6** conserva el nivell base N1 per a les tres equivalències directes (`dm³↔L`, `cm³↔mL`). La variant `encadenada` queda a N2 per als tres casos que connecten volum i capacitat mitjançant canvis addicionals d'unitat.
2. El tipus **18** queda a N2: els sis valors possibles recorren la cadena `mL = cm³` i `1.000 cm³ = 1 dm³`. Comparteix el nucli compost amb les variants encadenades del tipus 6; la inversió de la direcció no crea per si sola una família nova.
3. Els tipus **13 i 17** es mantenen a N1, amb el límit ja documentat que els distractors de diagnòstic són febles.
4. El test `test-mesura-2eso-unitats-variants.cjs` verifica els sis casos reals del tipus 6 (resposta, opcions úniques i N1/N2 per variant). `test-mesura-2eso-unitats18-cilindre.cjs` verifica els sis valors de 18 i quatre casos de `problemes:4`, amb oracles, opcions úniques i nivells. Tots dos formen part de la suite d'Unitats del workflow integrat, que va passar al commit `194b99c` ([run #44944032974](https://github.com/srigual-png/mates-interactives/actions/runs/44944032974)).
5. La prova integrada dels modes guiat, autònom i examen també va acabar correctament en aquella execució; la cobertura documentada és simulada amb DOM. No equival a una validació visual completa de cada variant en navegador.

**Famílies i currículum:** U-P06 (directa) i U-P07 (composta) són dues famílies candidates provisionals; la presentació de tipus 16 en format de tria múltiple no el separa de la conversió composta. Cal revisió humana abans d'aplicar el canvi N2 a `unitats:16` o declarar famílies oficials.
