# Auditoria Fase A · Estimació, precisió i error (2n ESO)

**ESTAT: PROVISIONAL.** Informe estàtic de Fase A; els tipus 11, 14 i 15 s’han actualitzat posteriorment al codi i es descriuen a la [consolidació de casos ambigus](MI_2ESO_mesura_consolidacio_casos_ambigus_estimacio_problemes.md). Les proves corresponents encara no s’han tornat a executar.

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
| EP02 | Triar instrument de mesura segons magnitud, escala i tolerància | 4,11 | N1 | **N1** al mapa actual; 11 afegeix triar l’instrument menys precís que compleix el marge admès |
| EP03 | Arrodonir una lectura a la precisió exigida | 5,16 | N1 | **N1**: mateix procediment i canvi de context |
| EP04 | Error absolut directe i comparació de dos errors absoluts | 6,17 | N1 | **N1**: distància absoluta a la referència, amb comparació opcional |
| EP05 | Calcular error relatiu (decimal o percentual) | 7,8,13 | N2 | **N2**: diferència absoluta/referència, i ×100 si percentual; 13 dona l'error absolut |
| EP06 | Comparar precisió relativa entre dues mesures | 9 | N2 | **N2**: comparar dos quocients, no només errors absoluts |
| EP07 | Interpretar interval d'arrodoniment i error màxim | 10,12 | N1,N2 | **N1/N2 segons variant**: reconèixer mig pas (10), construir interval compatible amb inclusió/exclusió (12) |
| EP08 | Validar una lectura respecte d’un valor esperat i una tolerància | 14 | N1 | **N1** al mapa actual; diferent de la selecció d’instrument de 11 i relacionada amb unitats |
| EP09 | Estimar longitud amb mitjana de lectures repetides | 15 | N1 | **N1**: mitjana directa, arrodonida a la mateixa precisió d’una dècima que les lectures |
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
- **EP08 — Validació de lectura:** lectura de 2,03 m davant referència 2 m i tolerància ±0,05 m → compleix; lectura de 8 cm davant 80 cm amb tolerància ±5 cm → no compleix. La tolerància fa explícit el criteri; el cas d’unitats converteix 1500 mL a 1,5 L abans de revisar el registre.
- **EP09 — Mitjana de mesures:** 10,2;10,3;10,2 cm → (30,7)/3=10,2333… → **10,2 cm** arrodonit a dècimes. Les lectures i el resultat reportat comparteixen la precisió d’una dècima.
- **EP10 — Diagnosticar error:** amb referència 20 i mesura 21, l'alumne suma 20+21=41, però error |21−20|=**1**; amb 50 i 54 l'alumne suma 104, error **4**. Error: confondre distància numèrica amb suma. Línies 1708–1717.

## Incidències amb evidència i prioritat

1. **TIPUS 9 — resposta sempre A (alta prioritat de varietat):** tots els quatre `cases` codificats impliquen `e1<e2`:
   - 100→102 vs 10→11: 2% < 10%;
   - 200→204 vs 20→21: 2% < 5%;
   - 500→510 vs 50→52: 2% < 4%;
   - 80→82 vs 8→8,4: 2,5% < 5%.
   El codi dona sempre `La mesura A`. El barrejament de les opcions de resposta **no** arregla el fet que sigui sempre A. Proposta: incloure casos amb precisió B millor i, si escau, empats contextuals justificats.
2. **TIPUS 17 — resposta sempre A (alta prioritat de varietat):** la desviació d'A pertany a {1,2}, mentre que la de B a {4,5}; així `ea<eb` en qualsevol combinació. `L'aproximació B` mai pot ser la correcta. Proposta: alternar els marges amb casos on B sigui millor; preservar la comparació d'errors absoluts.
3. **TIPUS 15 — precisió reportada: resolt al codi.** L’enunciat demana arrodonir la mitjana a dècimes i el generador ja expressa la resposta amb una dècima, igual que les lectures.
4. **TIPUS 14 — tolerància i unitats: resolt a la redacció.** Els tres casos de comparació indiquen marge d’error i el quart explicita la conversió 1500 mL = 1,5 L. Es manté pendent la validació pedagògica del tipus.
5. **TIPUS 11 — criteri d’instrument: actualitzat prèviament.** Ara demana triar l’instrument menys precís que encara compleix un marge d’error explícit; és una variant de la selecció d’instrument, no una tasca de plausibilitat com la 14.
6. **TIPUS 10/12:** diferenciar error de quantització d'arrodoniment de tolerància instrumental; en lectura arrodonida positiva l'interval semiobert es justifica però la semàntica de frontera ha d'estar definida.
7. **N3:** cap tipus actual justifica problemàtiques de múltiples restriccions no immediates. No afegir-ne per quota.

## Validació efectuada i pendent

**Fet:** inspecció completa de les 18 branques i variants literals, comparació de classificacions revisades, càlcul manual dels errors dels quatre casos del tipus 9 i dominis complets del tipus 17, i exemples de cada candidat.

**Pendent:** tests amb oracle d'errors i arrodoniments, UI, modes guiat/autònom, preguntes d'examen i fitxes, validació curricular normativa externa i consens docent. Els workflows d'altres blocs no substitueixen aquesta validació.

**Canvis posteriors documentats:** les redaccions d’estimacio:14/15 i problemes:19 s’han aplicat a la branca de la PR; l’oracle existent d’estimacio:15 s’ha alineat a les dècimes. No s’han canviat nivells ni s’han incorporat famílies al registre `families-validades.json`. Les proves actualitzades encara no s’han executat.
