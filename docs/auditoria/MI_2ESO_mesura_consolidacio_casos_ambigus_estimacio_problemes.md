# Consolidació de casos ambigus — Estimació i Problemes (2n ESO)

**Estat:** addenda de revisió i canvis de redacció aplicats el 21/11/2026. Les decisions de família i de nivell continuen provisionals; no s’han modificat REVIEWED_LEVELS, famílies validades ni modes de producció.

Aquesta addenda consolida el contrast del codi actual de 2eso/sentit-mesura.html. Substitueix les agrupacions anteriors que quedaven desfasades per les correccions funcionals posteriors, especialment l’agrupació conjunta d’estimacio:11 i estimacio:14.

## Estimació

| Tipus | Comparació i evidència | Dictamen provisional |
|---|---|---|
| estimacio:11 | Tria l’instrument menys precís que compleix un marge d’error màxim. estimacio:4 també selecciona un instrument, però sense la mateixa optimització sota una tolerància explícita. | **Variant diferenciada** de la selecció d’instrument; el llindar afegeix una decisió. El mapa intern la manté a N1; N2 és una hipòtesi per contrastar, no un canvi aprovat. |
| estimacio:14 | Compara una lectura amb un valor esperat i detecta si la diferència o la unitat suggereixen una incoherència. Els casos actuals tenen unitats explícites, però expressions com «error petit» no defineixen un llindar numèric. | **Procediment diferent d’11.** El criteri és ara observable (error absolut ≤ marge) i les unitats són explícites. Es manté provisionalment N1. |
| estimacio:15 | Calcula la mitjana de tres mesures repetides i l’arrodoneix a dècimes, igual que les dades d’entrada. Per exemple, 10,2; 10,3; 10,2 cm dona 10,2 cm. La solució marca com a aproximació el valor intermedi 10,233 cm. | **Procediment diferenciat: mitjana de mesures.** El resultat s’arrodoneix a la mateixa precisió que les lectures. N1 es manté al mapa actual. |

## Problemes

| Tipus | Comparació i evidència | Dictamen provisional |
|---|---|---|
| problemes:1 | Comparteix amb perimetres:16 el càlcul de superfície de paret menys portes i finestres. Afegeix dividir pel rendiment del pot i arrodonir cap amunt perquè es compren pots sencers. | **Problema compost** de procediments coneguts; el pas de compra és una decisió pràctica, però no demostra una família independent. N2 es manté al mapa actual. |
| problemes:3 | Calcula volum d’ortoedre, converteix cm³ a litres i aplica el percentatge d’ompliment. Exemple: 80×50×40 cm = 160 L; al 75%, 120 L. Comparteix el nucli de volum/capacitat amb superficies:13/14 i unitats:6. | **Variant composta de volum/capacitat amb percentatge**, no una família independent demostrada. N2 es manté al mapa actual. |
| problemes:5 | L’etiqueta cilíndrica usa π·d·h, equivalent a 2π·r·h de superficies:8. El context és explícitament lateral i el diàmetre evita haver de convertir-lo a radi per aplicar la fórmula. Les altures dels dominis actuals no se solapen. | **Variant contextual/representativa del mateix nucli**, sense parelles físiques idèntiques disponibles. No inferir diferència de nivell només pel context. |
| problemes:19 | Multiplica àrea per precipitació després de donar l’equivalència 1 mm·1 m² = 1 L. Exemple: 80 m² × 12 mm = 960 L. | **Aplicació directa d’una equivalència donada**; no acredita una família nova. La referència a la projecció horitzontal evita confondre-la amb la superfície inclinada. N1 es manté al mapa actual. |

## Correcció de la síntesi prèvia

- L’agrupació anterior estimacio:11/14 no es manté: 11 selecciona un instrument sota una tolerància; 14 valida una lectura respecte d’una tolerància o revisa una conversió d’unitats.
- estimacio:15 no s’agrupa amb l’arrodoniment directe de 5/16: incorpora mitjana de lectures; ara reporta el resultat a dècimes, com les dades.
- Els casos de Problemes 1, 3 i 19 són aplicacions o cadenes de procediments coneguts; no es proposa crear famílies només per tenir més passos o un context nou.
- Els casos 5/8 comparteixen fórmula lateral; no es compten execucions ni exemples construïts com a dades aparellades.
- Els canvis aplicats ajusten enunciats, opcions, pistes i solucions dels generadors estimacio:14/15 i problemes:19; també s’ha alineat l’oracle existent d’estimacio:15. No canvien els nivells interns ni les famílies oficials. El 21/11/2026 han passat dues comprovacions focalitzades sobre el codi de la branca: l’oracle dels últims 16 tipus (800 mostres, incloent-hi estimacio:14) i el mostreig dels 128 tipus (1.536 generacions, incloent-hi l’aritmètica de problemes:19); ambdues han acabat amb zero errors. No s’ha executat la integració completa ni la suite visual de navegador. PR #49 continua en Draft, sense fusionar ni publicar.

**Base del contrast:** codi actual a 2eso/sentit-mesura.html, MI_2ESO_mesura_estimacio_decisions_18_tipus.json, MI_2ESO_mesura_problemes_decisions_20_tipus.json i l’informe de contrast MI_2ESO_mesura_etiquetes_area_lateral_contrast.md.
