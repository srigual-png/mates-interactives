# Proposta pedagògica · 20 tipus de Perímetres i Superfícies · 2n ESO

**Estat:** classificacions candidates no aprovades. **CI de traçabilitat:** [#44080759727](https://github.com/srigual-png/mates-interactives/actions/runs/44080759727) — **success**.

## Abast

S'han inspeccionat els enunciats, les pistes i les solucions dels tipus **Perímetres 11 i 14–18** i **Superfícies i volums 2, 4, 6–9, 12–16 i 18–20**. Cap d'aquests 20 tipus repeteix els tipus ja documentats en els quatre lots anteriors de propostes de nivell.

| Nivell candidat | Registres | Justificació general |
|---|---:|---|
| **N1** | **5** | Aplicacions directes i diagnòstic tancat de fórmules |
| **N2** | **15** | Composicions, inversions, conversions amb demanda addicional i visualització de parelles de cares |
| **N1/N2 pendent** | **0** | Les propostes internes dels sis casos revisats s'han reconciliat; l'aprovació docent continua pendent |
| **Total** | **20** | **Cap nivell oficial aplicat** |

## Diferències matemàtiques que importen

- `perimetres:11` i `perimetres:16` comparteixen el nucli de **superfície exterior menys obertures**, però el segon resta dues zones rectangulars.
- `perimetres:14` requereix **aïllar el radi** de la fórmula de longitud de circumferència. La inversió d'una fórmula no és necessàriament N1 perquè s'acabi dividint.
- `perimetres:15` utilitza perímetre i **apotema donada**; no requereix trigonometria. S'ha de mantenir dins del currículum de 2n ESO.
- `perimetres:17` calcula una **corona circular** amb radi exterior derivat de l'amplada del camí.
- `superficies:2` i `superficies:16` comparteixen la mateixa suma de les **sis cares d'un ortoedre**, amb context de capsa o cartró.
- `superficies:8` i `superficies:19` comparteixen el desenvolupament lateral del cilindre: el primer demana **àrea lateral**, el segon **dimensions del rectangle desplegat**.
- `superficies:9` amplia el càlcul lateral afegint les **dues bases**.
- `superficies:13/14` calculen un volum i el relacionen amb capacitat, però el pas de **m³ a litres** és més exigent que la igualtat directa **dm³ = L**.
- `superficies:15` inverteix volum = àrea de base × profunditat després de convertir litres a m³.
- `superficies:20` reconeix parelles de cares d'un desenvolupament pla, tasca espacial diferent de calcular-ne l'àrea.

## Precaucions

El catàleg de tipus de generador no equival a un catàleg de famílies matemàtiques independents. La reclassificació de dificultat s'ha de fer segons les decisions matemàtiques requerides i les ajudes facilitades, no per quota. **5–5–3 és només orientatiu.**

Aquesta prova verifica traçabilitat documental i correspondència amb el codi; no certifica l'efectivitat pedagògica amb alumnat.

**Dades estructurades:** `docs/auditoria/MI_2ESO_mesura_nivells_candidats_perimetres_superficies_20.json`.

**Autoritzacions respectades:** no s'han modificat generadors, famílies o nivells oficials; `estimacio:12` continua pendent d'autorització; la PR #49 no s'ha fusionat ni publicat.


## Reconciliació de sis casos · 21/11/2026

Després de comparar enunciats, guies, respostes i criteri N1/N2, la proposta interna queda en **5 N1 i 15 N2**, sense registres N1/N2 indecisos. D’aquesta proposta, `superficies:8` N2 i `superficies:14` N1 ja s’han aplicat al mapa intern després de validació docent; això no aprova les famílies candidates ni canvia nivells oficials.

- **N1 proposat:** `perimetres:18` (diagnòstic tancat i explícit); `superficies:7` (fórmula directa de volum cilíndric amb dades donades); `superficies:14` (producte de dimensions en dm i equivalència directa 1 dm³=1 L); `superficies:18` (reconeixement tancat de fórmula de superfície en lloc de volum).
- **N2 proposat:** `superficies:20` (construir les tres parelles de cares a partir de les dimensions i relacionar-les amb el desplegament). L'esforç espacial i les tres correspondències el diferencien de la simple suma de superfícies.
- **Resolució de les discrepàncies (21/11/2026):** `superficies:8` queda a N2 per la modelització espacial del lateral desplegat; `superficies:14` queda a N1 pel producte directe en dm i l’equivalència dm³=L. Les dues assignacions ja s’han aplicat al mapa intern. Els altres quatre casos proposats coincideixen amb el mapa o continuen subjectes a revisió segons el seu informe.

`approval: pending` i `official_families_approved: 0` mantenen les agrupacions de famílies pendents. `official_levels_changed: 0` significa que no s’han modificat nivells oficials; en canvi, `superficies:8/14` sí que s’han aplicat al mapa intern `REVIEWED_LEVELS`.
