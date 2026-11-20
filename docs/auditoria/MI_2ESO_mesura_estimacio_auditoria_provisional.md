# Auditoria Fase A · Estimació, precisió i error (2n ESO)

**ESTAT: PROVISIONAL. Revisió estàtica, no validació funcional ni pedagògica definitiva. No es modifica el codi.**

## Font i classificació efectiva

- `2eso/sentit-mesura.html:1580–1721`, `genEstimacioError2ESO(forceType)` amb tipus 1–18; variants explícites en les llistes `cases`.
- `assets/js/dificultat-mi.js:9` (`REVIEWED_LEVELS['2eso/mesura'].estimacio`); és el mapa efectiu en `classify`, per davant del mapa històric de `level()`. Sense excepcions `REVIEWED_VARIANTS` per a `estimacio`.
- **N1 actual:** 1,2,3,4,5,6,10,11,14,15,16,17,18 (**13 tipus**).
- **N2 actual:** 7,8,9,12,13 (**5 tipus**).
- **N3:** cap.

## Matriu de 9 famílies candidates (18 tipus coberts)

| Candidat | Raonament matemàtic genuí | Tipus | Nivells reals | Criteri provisional |
|---|---|---|---|---|
| EP01 | Estimar una magnitud plausible per ordre de mida i unitat | 1,2,3 | N1 | **N1**: mateixa selecció contextual, independentment de longitud, superfície o volum |
| EP02 | Triar instrument de mesura segons magnitud i escala | 4 | N1 | **N1**: adequació d'instrument, reconeixement |
| EP03 | Arrodonir una lectura a la precisió exigida | 5,16 | N1 | **N1**: mateix procediment i canvi de context |
| EP04 | Error absolut directe i comparació de dos errors absoluts | 6,17 | N1 | **N1**: distància absoluta a la referència, amb comparació opcional |
| EP05 | Calcular error relatiu (decimal o percentual) | 7,8,13 | N2 | **N2**: diferència absoluta/referència, i ×100 si percentual; 13 dona l'error absolut |
| EP06 | Comparar precisió relativa entre dues mesures | 9 | N2 | **N2**: comparar dos quocients, no només errors absoluts |
| EP07 | Interpretar interval d'arrodoniment i error màxim | 10,12 | N1,N2 | **N1/N2 segons variant**: reconèixer mig pas (10), construir interval compatible amb inclusió/exclusió (12) |
| EP08 | Validar coherència de magnitud, unitat i precisió d'una lectura | 11,14 | N1 | **N1** actual, però l'enunciat 14 no explicita les unitats en tots els casos |
| EP09 | Estimar longitud amb mitjana de lectures repetides | 15 | N1 | **N1**: mitjana aritmètica directa; revisar xifres reportades |
| EP10 | Diagnosticar confusió entre suma i error absolut | 18 | N1 | **N1**: error explicitat; distractors febles |

**Recompte correcte: 10 famílies candidates (EP01–EP10), no nou.** Aquestes categories són encara provisionals. EP04/EP10 podrien ser variants del mateix coneixement; EP03/EP07 comparteixen arrodoniment però exigeixen procediments diferents; EP01/EP08 comparteixen coherència contextual però no la mateixa demanda. Es cobreixen tots els tipus **1–18** una sola vegada en la matriu. No se'n fabrica cap N3.

## Dos exemples resolts per família candidata

Exemples **construïts a partir dels procediments i dominis del codi**. No representen una execució aleatòria observada.

- **EP01 — Estimació plausible:** altura d'una porta → **2 m**, no 20 m; superfície d'una aula → **50 m²**, no 5.000 m². Error: unitat o ordre de magnitud inadequats. Línies 1583–1618.
- **EP02 — Instruments:** gruix d'una moneda → **peu de rei**; 75 mL d'aigua → **proveta graduada**. Error: escollir instrument que mesura una altra magnitud. Línies 1619–1624.
- **EP03 — Arrodoniment:** 12,46 cm a dècimes → **12,5 cm**; 7,26 m a dècimes → **7,3 m**. Error: truncar en lloc d'arrodonir. Línies 1625–1630 i 1696–1701.
- **EP04 — Error absolut:** referència 20 cm, mesura 21,5 cm → |21,5−20|=**1,5 cm**; referència 100, aproximacions 98 i 105 → errors 2 i 5, **la primera és més precisa en error absolut**. Error: usar suma o signe de la diferència. Línies 1631–1636 i 1702–1707.
- **EP05 — Error relatiu:** referència 200, mesura 204 → error 4, relatiu 4/200=**0,02** = **2 %**; error absolut 5 sobre referència 500 → (5/500)·100=**1 %**. Error: confondre decimal i percentatge. Línies 1637–1642, 1643–1653, 1680–1689.
- **EP06 — Comparar errors relatius:** A 102/100 → **2 %** i B 11/10 → **10 %**, A més precisa; A 204/200=**2 %** i B 21/20=**5 %**, A més precisa. Error: comparar només diferències absolutes. Línies 1654–1658.
- **EP07 — Mig pas i interval:** arrodonir a la dècima dona límit d'error **0,05**; una lectura 12,3 cm a la dècima és compatible amb **[12,25; 12,35) cm** sota arrodoniment habitual per a nombres positius. Error: incloure el límit superior o usar ±0,1. Línies 1659–1667 i 1674–1679.
- **EP08 — Coherència d'una mesura:** «una distància de carretera de 84 km» és una precisió raonable davant 84,000001 km sense evidència; esperat 80 i llegit 8 → **sospita de desajust d'escala o unitat**. Error: confondre precisió aparent amb precisió real. Línies 1668–1673 i 1690–1695.
- **EP09 — Mitjana de mesures:** 10,2;10,3;10,2 cm → (30,7)/3=10,2333… → **10,23 cm** segons el generador; 5,8;5,9;5,8 cm → 17,5/3=5,8333… → **5,83 cm** segons el generador. Cal diferenciar el càlcul intern de l'expressió amb xifres coherents. Línies 1696–1701 (verificar font exacta de tipus 15 en línies 1696 aproximades).
- **EP10 — Diagnosticar error:** amb referència 20 i mesura 21, l'alumne suma 20+21=41, però error |21−20|=**1**; amb 50 i 54 l'alumne suma 104, error **4**. Error: confondre distància numèrica amb suma. Línies 1708–1717.

## Incidències amb evidència i prioritat

1. **TIPUS 9 — resposta sempre A (alta prioritat de varietat):** tots els quatre `cases` codificats impliquen `e1<e2`:
   - 100→102 vs 10→11: 2% < 10%;
   - 200→204 vs 20→21: 2% < 5%;
   - 500→510 vs 50→52: 2% < 4%;
   - 80→82 vs 8→8,4: 2,5% < 5%.
   El codi dona sempre `La mesura A`. El barrejament de les opcions de resposta **no** arregla el fet que sigui sempre A. Proposta: incloure casos amb precisió B millor i, si escau, empats contextuals justificats.
2. **TIPUS 17 — resposta sempre A (alta prioritat de varietat):** la desviació d'A pertany a {1,2}, mentre que la de B a {4,5}; així `ea<eb` en qualsevol combinació. `L'aproximació B` mai pot ser la correcta. Proposta: alternar els marges amb casos on B sigui millor; preservar la comparació d'errors absoluts.
3. **TIPUS 15 — precisió reportada (pendent de criteri pedagògic):** tres lectures amb una decimal sempre donen una mitjana periòdica en els patrons disponibles; la web retorna `roundTo(...,2)` i dues decimals. Una mitjana pot expressar-se amb més xifres de càlcul però presentar-la com una **mesura** pot suggerir una precisió instrumental no sostinguda. Proposta: distingir «mitjana numèrica arrodonida a centèsimes» de «resultat amb precisió instrumental»; revisar enunciat i expectatives del curs.
4. **TIPUS 14 — unitats i context insuficientment explícits:** en els quatre casos l'enunciat imprimeix valors sense especificar-hi les unitats; les justificacions de les branques fan referència a m, cm, mL i L. Especialment 1.500 vs 1,5 és ambigüitat matemàtica sense unitats. Proposta: incloure magnitud i unitats inicials/finals en cada cas o preguntar explícitament per possible confusió de representació.
5. **TIPUS 11 — criteri d'«adequació» contextual:** 1,5 L i 1,51 L poden ser totes dues lectures raonables segons instrument; l'enunciat no aporta resolució de la mesura. L'elecció de l'opció correcta està predefinida i pot no ser unívoca conceptualment. Proposta: contextualitzar resolució/ús abans de considerar les respostes incorrectes.
6. **TIPUS 10/12:** diferenciar error de quantització d'arrodoniment de tolerància instrumental; en lectura arrodonida positiva l'interval semiobert es justifica però la semàntica de frontera ha d'estar definida.
7. **N3:** cap tipus actual justifica problemàtiques de múltiples restriccions no immediates. No afegir-ne per quota.

## Validació efectuada i pendent

**Fet:** inspecció completa de les 18 branques i variants literals, comparació de classificacions revisades, càlcul manual dels errors dels quatre casos del tipus 9 i dominis complets del tipus 17, i exemples de cada candidat.

**Pendent:** tests amb oracle d'errors i arrodoniments, UI, modes guiat/autònom, preguntes d'examen i fitxes, validació curricular normativa externa i consens docent. Els workflows d'altres blocs no substitueixen aquesta validació.

**No fer en aquesta PR:** canviar els exercicis, pujar nivells sense justificació o incorporar famílies provisionals al registre `families-validades.json`. Les incidències funcionals requereixen PR separada i proves de regressió.
