# Proposta pedagògica provisional de 20 tipus o variants · Sentit de la mesura, 2n ESO

**Data:** 17/11/2026. **Estat:** proposta en auditoria; **cap nivell N1/N2/N3 aplicat a la web**.

La matriu `docs/auditoria/MI_2ESO_mesura_proposta_nivells_20_variants_pedagogiques.json` recull **20 tipus o variants** vinculats a 8 exemples de la revisió de C011 i variants mixtes i 12 exemples de les cinc agrupacions C010, C017, C021, C051 i C052. Cada registre inclou tasca, exemple, justificació de càrrega cognitiva, advertiments i estat pendent de decisió docent.

## Proposta inicial

| Orientació | Nombre de registres | Significat |
|---|---:|---|
| N1 candidat | 5 | Aplicació o reconeixement directe d'una equivalència, regla o model |
| N2 candidat | 10 | Tria de model, inversió, coordinació de passos, argumentació o comparació |
| N1 o N2 pendent | 5 | La dificultat pot dependre de les dades, del suport o de la formulació |
| **Total** | **20** | **0 nivells oficials canviats** |

Això **no** és una distribució de nivells de tot el tema ni serveix per exigir una proporció 5–5–3. La dificultat s'ha de justificar per la feina cognitiva que efectivament demana una instància a l'alumnat de **2n ESO**.

## Arrodoniment d'`estimacio:12`

El generador actual considera compatible amb una longitud positiva arrodonida a la dècima l'interval:

**[valor indicat − 0,05 cm, valor indicat + 0,05 cm)**

Per exemple, per **12,3 cm** dona **[12,25 cm, 12,35 cm)**: inclou 12,25 i exclou 12,35. Això correspon a la regla de **resoldre els empats exactes arrodonint cap amunt** en valors positius.

**Problema detectat:** l'enunciat original no declara aquesta convenció; per tant, el tractament dels casos de frontera podria ser ambigu en altres convencions.

**Correcció proposada però no aplicada:** afegir a l'enunciat «En cas de quedar exactament a mig camí entre dues dècimes, s'arrodoneix cap amunt». Es pot precisar que les longituds són positives. Les respostes i els càlculs actuals no canviarien. És una **modificació funcional pendent d'autorització explícita**.

Els casos de frontera i la proposta detallada són a `docs/auditoria/MI_2ESO_mesura_estimacio_12_convencio_arrodoniment_proposta.json`. La prova automàtica de límits d'arrodoniment ha superat el CI [#44077549100](https://github.com/srigual-png/mates-interactives/actions/runs/44077549100). Aquest test comprova també 400 instàncies generades del tipus 12; no substitueix la revisió didàctica.

## Altres punts encara pendents de decisió

- **`pitagores:15`:** cal revisar el supòsit anterior que recuperar un catet és N1 i la diagonal és N2. La fórmula inversa no és necessàriament més fàcil.
- **`unitats:6`:** directe i encadenat tenen càrrega distinta; es poden considerar N1 i N2 candidats sense convertir-los en famílies noves.
- **`superficies:17`:** si la base és compartida, comparar altures pot ser més senzill que calcular dos volums de bases diferents.
- **`estimacio:14`:** el context de possible confusió d'unitats no indica explícitament les unitats dels valors; cal millorar-ne la precisió conceptual abans d'aprovar-lo.
- **C010, C017, C021, C051, C052:** evitar duplicar famílies per la mera variació de figura, incògnita, unitat o format de resposta.

## Límits d'aquesta fase

S'ha contrastat el codi amb les fitxes d'exemples i els oracles matemàtics previs; les categories N1/N2 són **hipòtesis docents**, no conclusions empíriques amb dades d'alumnat. No s'ha elaborat cap repartiment definitiu de totes les famílies del bloc.

**No s'ha modificat cap generador, família o nivell oficial ni s'ha fusionat o publicat la PR #49.**
