# Tancament de la Fase A — Sentit de la mesura · 1r d’ESO

**Base de treball:** `main` a `e725568f58ed925f4ab5f2db1e8f08298ea73103`, merge de PR #30.
**Branca de tancament:** `codex/tancament-mesura-fase-a-2026-11-13`.
**Estat:** una PR conjunta d’Estimació i Problemes de context pendent de revisió; aquest document és provisional. No s’ha fet merge ni s’ha modificat el registre JSON/CSV. No es declara GitHub Pages verificat.

## Inventari dels vuit temes

Les sis primeres files provenen dels informes finals revisats i el codi corresponent al seu merge. L’última parella és la classificació proposada en aquesta branca, pendent de revisió.

| Tema | Famílies locals | N1 / N2 / N3 | PR fusionada / SHA real de merge | Estat |
|---|---:|---:|---|---|
| Sistema Mètric Decimal (`metric`) | 4 | 2 / 1 / 1 | #24 · `b46568a8a2242ffb45ac01221527208789c49e32` | Integrat a main |
| Conversions d’unitats (`conversions`) | 7 | 1 / 5 / 1 | #25 · `53d28a93350738dfec2f082bb0bb034e2b2fc776` | Integrat a main |
| Mesura del temps (`temps`) | 10 | 2 / 7 / 1 | #26 · `bd1fd1f1fed800f8a10d449db35e1fb594d4dcd2` | Integrat a main |
| Perímetres (`perimetres`) | 13 | 1 / 11 / 1 | #27 · `2a67563272675b037eed02365048a9725716f6c8` | Integrat a main |
| Àrees (`arees`) | 15 | 3 / 11 / 1 | #28 · `ec5c6e5cdc3b534d6ae8473120eda20e098b0ea6` | Integrat a main |
| Mesurament i precisió (`mesurament`) | 15 | 6 / 8 / 1 | #29 · `9062840d294cb0793a391bb96ca589d68f51ce48` | Integrat a main |
| Estimació (`estimacio`) | 3 | 1 / 1 / 1 | — | Provisional en aquesta PR |
| Problemes de context (`problemes`) | 4 pròpies | 1 / 2 / 1 | — | Provisional en aquesta PR |
| **Total d’entrades locals** | **71** | **17 / 46 / 8** | — | 64 fusionades + 7 provisionals |

Les sis primeres famílies sumen 64 entrades per tema abans de deduplicar. Entre les 71 entrades locals hi ha **70 identificadors únics**, perquè `mesura-mixta` es comparteix explícitament pels temes `metric` i `conversions`. Els patrons contextuals de Problemes reusen, a més, famílies dels sis temes previs; no són entrades familiars addicionals. El còmput de 70 és el conjunt d’IDs del catàleg de famílies pròpies per tema, no un recompte de patrons globals.

## Famílies compartides i traçabilitat

| Família / procediment | Tema principal | Reutilització | Evidència / nota |
|---|---|---|---|
| `mesura-mixta` | Sistema Mètric Decimal i Conversions | `metric` 1002 i `conversions` tipus 2; contextos C01/C04 | Mateix procediment de combinar mesures en unitats diferents; es compta una sola vegada en els 70 IDs únics. |
| `voltes-circumferencia` | Perímetres | Context P04 i I04 | Perímetre/circumferència per nombre de voltes, amb conversions d’unitat com a variants. I04 s’ha reassignat a aquest ID; no és una família pròpia nova de Problemes. |
| `durada-entre-hores`, `hora-final`, `operar-durades-i-pausas` | Temps | T01–T04 | Variants contextuals; nivells i IDs del tema Temps es conserven. |
| Famílies de perímetre i àrea | Perímetres / Àrees | P01–P05, A01–A07, I01–I04 | Tanques, pintura, jardí i voltes són contextos de procediments ja catalogats. |
| `escala-proporcional`, `seleccionar-instrument`, `seleccionar-unitat-mesura`, `error-absolut`, `error-relatiu-percentual`, `angle-gir-rellotge` | Mesurament i precisió | S01–S04, M01–M05 i T05 | Les variants s’assignen als IDs existents, sense crear famílies contextuals duplicades. |
| `repartir-quantitat-amb-conversio` | Problemes de context | C02/C03/C06/I05 | Família integrada del tema: convertir una mesura i obtenir quantitats completes. Es recomana revisar en una futura homogeneïtzació si el registre global vol vincular-la a divisió euclidiana de Nombres naturals; aquesta PR no canvia IDs històrics ni el registre. |
| `restar-mesures-mateixa-unitat` | Problemes de context | C05 | Resta de mesures homogènies, N1. Context específic local; l’operació aritmètica bàsica és coneguda en altres temes. |
| `cost-combinat-area-perimetre` | Problemes de context | I03/I06 | Procediment integrat: tarifa superficial + tarifa lineal. Les seves parts comparteixen Àrees/Perímetres però la combinació de costos és específica. |
| `compra-pintura-combinada` | Problemes de context | R08 i catàleg 1001 del tema | Procediment nou de compra discreta mínima sota cobertura; compara combinacions i no es redueix a triar el preu unitari. |

Les famílies pròpies d’Estimació són `estimacio-per-referents` (N1), `estimacio-amb-limit-superior` (N2) i `estimacio-amb-garantia` (N3). La compra de pintura garantida amb formats mixtos és una família diferent: l’estimació de marges protegeix el volum necessari, mentre que R08 minimitza el cost entre combinacions discretes.

## Canvis transversals imprescindibles

La validació integral existent va revelar que el rotador de `MIFirstMeasureTasks.extend()` triava únicament generadors del catàleg als temes `metric`, `conversions` i `temps`: l’índex feia mòdul pel nombre de tasques de catàleg i mai arribava al generador principal. Això ocultava les famílies raw N1 en la pràctica i feia fallar les comprovacions de cobertura de totes les famílies. El canvi mínim afegeix aquests temes a la rotació amb una ranura pel seu `topic.gen()` original. No canvia regles matemàtiques, nivells històrics ni contingut; les proves integrals confirmaren que totes les famílies ara apareixen i es mantenen els exàmens i la progressió.

La validació de Problemes també va detectar una mutació de banc: després d’afegir R01–R08 a `MEASURE_PROBLEM_PATTERNS` per als exàmens, la pràctica de Problemes els reutilitzava tots com a generadors propis. Es separa el banc de 38 contextos per a la pràctica del banc global d’exàmens; s’hi afegeix únicament R08, propi de Problemes. També s’ha corregit `primaryTopic` d’I05 de `metric` a `conversions`, i s’ha classificat I04 com a variant de `voltes-circumferencia`.

## Regressions i proves

| Grup | Resultat verificat |
|---|---|
| Tests matemàtics nous | Estimació PASS ×2: 1.000 rutes del banc (250×4) + 500 catàleg (250×2) per execució. Problemes PASS ×2: 11.500 per execució (250×38 contextos + 250×8 rutes globals); oracles independents de resultats i restriccions. |
| Playwright nou | Estimació PASS ×2; Problemes PASS ×2. Execució reproduïble amb Math.random llavor fixa a Chrome. Exàmens 12/20, rotació, pràctica guiada/autònoma, recuperació d’errors, àncores/hashchange, 390 px, cap error JS. |
| Sis tests matemàtics històrics | PASS: Metric 1.250, Conversions 2.000, Temps 2.750, Perímetres 4.250, Àrees 4.750, Mesurament 7.000 mostres. |
| Sis tests integrals històrics | PASS executats individualment després del fix de rotació: metric, conversions, temps, perímetres, àrees i mesurament. Cobertura existent de regressió: 30 generacions/tema. |
| Validació del codi | Les quatre proves noves es van executar dues vegades després dels canvis funcionals; totes les sortides tenen cobertura de famílies completa. |

Chrome s’ha iniciat i utilitzat. No s’ha executat Edge. No s’ha provat desplegament de GitHub Pages ni es pot verificar fins a un merge posterior; aquesta PR continua pendent. No s’han tocat teoria, CSS, HTML de teoria, progressió ni registres JSON/CSV. La revisió del navegador verifica dimensions, àncores i absència d’errors, però no és una inspecció visual manual de disseny.

## Recomanacions per al registre definitiu

Després d’un merge i validació de publicació, una PR documental separada hauria d’afegir Estimació (3 famílies) i Problemes (4 pròpies), amb SHA i evidències reals de merge i proves. Cal conservar les 64 entrades validades i no comptar els patrons contextuals duplicats. El registre actual `families-validades.json` cobreix Sentit numèric, no aquests temes de Mesura; no s’ha modificat.

Informes per tema: [Estimació](MI_1ESO_estimacio_informe_final.md) · [Problemes de context](MI_1ESO_problemes_context_informe_final.md). Els informes de procedència dels sis temes fusionats són `MI_1ESO_sistema_metric_decimal_informe_final.md`, `MI_1ESO_conversions_unitats_informe_final.md`, `MI_1ESO_mesura_temps_informe_final.md`, `MI_1ESO_perimetres_informe_final.md`, `MI_1ESO_arees_informe_final.md` i `MI_1ESO_mesurament_precisio_informe_final.md`.
