# Consolidació de casos ambigus — Estimació i Problemes (2n ESO)

**Estat:** addenda documental de revisió; les decisions de família i de nivell continuen provisionals. No s’han modificat generadors, REVIEWED_LEVELS, famílies validades ni modes de producció.

Aquesta addenda consolida el contrast del codi actual de 2eso/sentit-mesura.html. Substitueix les agrupacions anteriors que quedaven desfasades per les correccions funcionals posteriors, especialment l’agrupació conjunta d’estimacio:11 i estimacio:14.

## Estimació

| Tipus | Comparació i evidència | Dictamen provisional |
|---|---|---|
| estimacio:11 | Tria l’instrument menys precís que compleix un marge d’error màxim. estimacio:4 també selecciona un instrument, però sense la mateixa optimització sota una tolerància explícita. | **Variant diferenciada** de la selecció d’instrument; el llindar afegeix una decisió. El mapa intern la manté a N1; N2 és una hipòtesi per contrastar, no un canvi aprovat. |
| estimacio:14 | Compara una lectura amb un valor esperat i detecta si la diferència o la unitat suggereixen una incoherència. Els casos actuals tenen unitats explícites, però expressions com «error petit» no defineixen un llindar numèric. | **Procediment relacionat, no equivalent a 11.** Mantenir provisionalment N1 i revisar la redacció perquè el judici de plausibilitat sigui prou inequívoc. |
| estimacio:15 | Calcula la mitjana de tres mesures repetides. Es diferencia d’arrodonir una lectura (estimacio:5/16). Per exemple, 10,2; 10,3; 10,2 cm dona 10,23 cm arrodonit a centèsimes. | **Procediment diferenciat: mitjana de mesures.** El generador demana precisió coherent amb les dades però dona dues decimals a partir de lectures a dècimes. Cal resoldre aquesta incoherència abans de validar-lo. N1 es manté al mapa actual. |

## Problemes

| Tipus | Comparació i evidència | Dictamen provisional |
|---|---|---|
| problemes:1 | Comparteix amb perimetres:16 el càlcul de superfície de paret menys portes i finestres. Afegeix dividir pel rendiment del pot i arrodonir cap amunt perquè es compren pots sencers. | **Problema compost** de procediments coneguts; el pas de compra és una decisió pràctica, però no demostra una família independent. N2 es manté al mapa actual. |
| problemes:3 | Calcula volum d’ortoedre, converteix cm³ a litres i aplica el percentatge d’ompliment. Exemple: 80×50×40 cm = 160 L; al 75%, 120 L. Comparteix el nucli de volum/capacitat amb superficies:13/14 i unitats:6. | **Variant composta de volum/capacitat amb percentatge**, no una família independent demostrada. N2 es manté al mapa actual. |
| problemes:5 | L’etiqueta cilíndrica usa π·d·h, equivalent a 2π·r·h de superficies:8. El context és explícitament lateral i el diàmetre evita haver de convertir-lo a radi per aplicar la fórmula. Les altures dels dominis actuals no se solapen. | **Variant contextual/representativa del mateix nucli**, sense parelles físiques idèntiques disponibles. No inferir diferència de nivell només pel context. |
| problemes:19 | Multiplica àrea per precipitació després de donar l’equivalència 1 mm·1 m² = 1 L. Exemple: 80 m² × 12 mm = 960 L. | **Aplicació directa d’una equivalència donada**; no acredita una família nova. Cal especificar que els m² són la projecció horitzontal de la teulada per evitar confondre-la amb la superfície inclinada. N1 es manté al mapa actual. |

## Correcció de la síntesi prèvia

- L’agrupació anterior estimacio:11/14 no es manté: 11 selecciona instrument sota una tolerància; 14 avalua la plausibilitat d’una lectura i la coherència d’unitats.
- estimacio:15 no s’agrupa amb l’arrodoniment directe de 5/16: incorpora mitjana de lectures i té pendent resoldre la precisió reportada.
- Els casos de Problemes 1, 3 i 19 són aplicacions o cadenes de procediments coneguts; no es proposa crear famílies només per tenir més passos o un context nou.
- Els casos 5/8 comparteixen fórmula lateral; no es compten execucions ni exemples construïts com a dades aparellades.
- Cap decisió d’aquesta addenda canvia els nivells interns vigents, les famílies oficials ni els generadors. Es manté la PR #49 en Draft, sense fusionar ni publicar.

**Base del contrast:** codi actual a 2eso/sentit-mesura.html, MI_2ESO_mesura_estimacio_decisions_18_tipus.json, MI_2ESO_mesura_problemes_decisions_20_tipus.json i l’informe de contrast MI_2ESO_mesura_etiquetes_area_lateral_contrast.md.
