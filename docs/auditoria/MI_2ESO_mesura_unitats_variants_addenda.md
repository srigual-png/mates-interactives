# Addenda · Revisió dels tipus 6, 13, 17 i 18 d'Unitats i conversions

**Estat: PROVISIONAL; pendent de revisió pedagògica i proves funcionals.** Aquest document afina l'informe inicial sense modificar exercicis ni dificultats efectives.

## 1. Evidència i classificació actual

**Fonts:** `2eso/sentit-mesura.html` (tipus 6: línies 932–940; tipus 13: línies 985–994; tipus 17: línies 1024–1032; tipus 18: línies 1033–1044) i `assets/js/dificultat-mi.js` (`REVIEWED_LEVELS['2eso/mesura'].unitats`, línia 9; `classify`, línies 686–795).

Els quatre tipus tenen **N1 efectiu en totes les variants**. `REVIEWED_VARIANTS['2eso/mesura']` només declara excepcions de `pitagores` i `superficies`, no d'`unitats`. El mapa antic dins `level()` no substitueix aquest valor en la ruta ordinària del classificador. És una comprovació estàtica de precedència, no una simulació de la UI.

## 2. Variants exhaustives dels quatre tipus

| Tipus | Cas real al generador | Procediment | Nivell actual | Recomanació |
|---|---|---|---|---|
| 6 | 2,5 dm³ → 2,5 L | Equivalència immediata | N1 | **N1** |
| 6 | 750 cm³ → 750 mL | Equivalència immediata | N1 | **N1** |
| 6 | 1,2 m³ → 1.200 L | Relació m³→dm³→L | N1 | **N2 provisional** |
| 6 | 3,4 L → 3.400 cm³ | L→dm³→cm³ | N1 | **N2 provisional** |
| 6 | 850 mL → 850 cm³ | Equivalència immediata | N1 | **N1** |
| 6 | 2.400 L → 2,4 m³ | L→dm³→m³ | N1 | **N2 provisional** |
| 13 | 3,2 m² = 320 dm² | Verificar factor 100 | N1 | **N1** |
| 13 | 0,8 m³ = 800 dm³ | Verificar factor 1.000 | N1 | **N1** |
| 13 | 2,5 L = 2.500 cm³ | Verificar relació volum–capacitat | N1 | **N1**, revisar justificació |
| 13 | 4 m² = 400 cm² (falsa) | Detectar factor lineal erroni; resultat 40.000 cm² | N1 | **N1/N2 debatible**; no elevar sense revisar enunciat |
| 17 | Alumne fa 5 · 100 per convertir m² a cm² | Identificar oblit del quadrat de l'escala | N1 | **N1**, distractors massa febles |
| 17 | Alumne fa 2 · 10 per convertir m³ a dm³ | Identificar confusió d'escala volumètrica | N1 | **N1**, distractors massa febles |
| 17 | Alumne diu que L i cm³ no es relacionen | Identificar l'equivalència volum–capacitat | N1 | **N1**, distractors massa febles |
| 18 | 500/750/1.250/1.800/2.400/3.500 mL → dm³ | mL=cm³ i 1.000 cm³=dm³; dividir per 1.000 | N1 | **N2 provisional** |

**Important:** la variant incorrecta del tipus 13 exigeix valorar la igualtat, però l'opció correcta ja descriu explícitament l'error i els distractors són desiguals. No es pot equiparar a un diagnòstic o justificació oberts de N2. El tipus 17 demana «Quin és l'error principal?» i ofereix l'explicació com a resposta: no pressuposa reconstrucció de la solució.

## 3. Ajust de l'inventari de famílies

En revisar la distinció procedimental, **U06 (equivalència directa dm³–L)** i **U07 (reconeixement d'igualtats volum–capacitat)** de l'informe inicial comparteixen el mateix coneixement i no està demostrat que siguin famílies genuïnament independents. La diferència és sobretot de format i d'abast dels factors.

**Proposta més conservadora:** fusionar U06+U07 en una família d'«equivalències volum–capacitat i reconeixement d'igualtats» (tipus 12 i 16). Això redueix el recompte de **11 a 10 famílies candidates**. Les altres es mantenen provisionals; U08 té branques directes que també poden solapar aquesta família, per la qual cosa **ni tan sols les 10 són definitives**.

No es reporta una distribució N1/N2/N3 definitiva de famílies mentre hi hagi variants mixtes i possibles solapaments. El nombre de tipus no és el nombre de famílies. No s'ha detectat cap N3 justificable en aquests quatre tipus.

## 4. Proposta per a una futura PR funcional separada

1. Afegir una identitat estable de variant al tipus **6**: `directa` (dm³↔L, cm³↔mL), `encadenada` (m³↔L o L↔cm³), sense inferir-la de l'enunciat.
2. Si es confirma pedagògicament, afegir la correspondència de nivell N1/N2 al classificador amb les variants revisades de `2eso/mesura/unitats`. Mantenir un únic camí efectiu de classificació i conservar la compatibilitat amb errors antics.
3. Proposar el canvi del tipus **18** a N2 només si les proves d'exemple confirmen que la conversió no és tractada com una única equivalència memoritzada.
4. Mantenir **13 i 17 a N1** ara per ara. Una revisió posterior d'enunciats, distractors i explicacions podria justificar famílies de diagnòstic més exigent, però no s'ha d'augmentar el nivell abans de millorar la tasca.
5. Verificar amb proves matemàtiques per **tots** els casos enumerats, modes guiats/autònoms, exàmens i fitxes. Revisar la distribució de generació i que la selecció N2 no accepti accidentalment variants N1 del tipus 6.
6. Revisar coincidències de procediment amb `Escales` i els altres cinc temes, així com la font curricular catalana vigent, abans de tancar Fase A.

## 5. Què s'ha validat i què no

**Fet:** inspecció de totes les opcions literals dels tipus 6, 13 i 17, dels sis valors possibles de 18, conversió matemàtica manual i comprovació estàtica del mapa efectiu.

**No fet:** execució de totes les variants dins el navegador, oracle de correcció independent, comprovació d'exàmens i fitxes, execució de tests específics de mesura ni revisió humana del nivell. Aquest treball és una **proposta d'auditoria**, no un canvi publicat a la web ni una família validada.
