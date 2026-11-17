# Contrast aparellat d'escales — 2n ESO

**Prova completada:** [GitHub Actions #44104301110](https://github.com/srigual-png/mates-interactives/actions/runs/44104301110): `success`. S'han comprovat **1.600 generacions** dels tipus `escales:1,5,12,16` i extret **8 parelles reals** amb paràmetres compartits (4 per relació). El test independent és `scripts/test-mesura-2eso-escales-dues-parelles-dades-compartides.cjs`.

## `escales:12` ↔ `escales:5`
Amb una longitud original de **2 cm** i ampliació **2:1**, `escales:12` presenta el pas 2→4 cm i exigeix **deduir el factor** (resposta 2); `escales:5` proporciona el factor 2 i exigeix **obtenir la longitud ampliada** (resposta 4 cm). Mateixa relació multiplicativa, però sentit invers de la dada desconeguda. És prematur aprovar una mateixa família sense conservar les dues variants i contrastar el nivell requerit.

## `escales:16` ↔ `escales:1`
A escala **1:100**, una longitud de plànol de **10 cm** correspon a **10 m** reals a `escales:1`. A `escales:16`, el rectangle 10×6 cm exigeix convertir també **6 cm→6 m** i calcular **2·(10+6)=32 m** de perímetre. La conversió simple és un **subprocés** de la tasca composta; diferent càrrega de passos, encara que totes dues acabin en metres.

## Estat de la cua
Hi ha evidència real aparellada en **4 de 21** comparacions conceptuals úniques (16 parelles), incloent els contrastos de perímetres documentats anteriorment. **17 comparacions continuen pendents** del mateix grau de contrast, a més dels modes guiat, autònom i examen. Cap autorització de fusió, publicació, alteració dels generadors, `REVIEWED_LEVELS` o `families-validades.json`.
