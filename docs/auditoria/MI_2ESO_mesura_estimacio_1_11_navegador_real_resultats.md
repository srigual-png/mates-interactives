# Validació amb Chromium real — Estimació 1 i 11 · 2n ESO

**Data:** 17/11/2026. **Resultat:** GitHub Actions **#44067075126: success**.

## Què s'ha provat realment

S'ha executat Playwright amb Chromium en un contenidor oficial de navegador, sobre la pàgina `2eso/sentit-mesura.html` servida localment per GitHub Actions. A diferència de l'anterior prova amb DOM simulat, aquí es fan **clics reals en botons del navegador** i es comprova el text i la visibilitat dels elements.

| Generador | Mida | Guiat i pistes | Sense pistes | Examen | Desbordament horitzontal |
| --- | --- | --- | --- | --- | --- |
| `estimacio:1` | Ordinador 1280×800 | Passa | Passa | Passa | No |
| `estimacio:11` | Ordinador 1280×800 | Passa | Passa | Passa | No |
| `estimacio:1` | Mòbil 390×844 | Passa | Passa | Passa | No |
| `estimacio:11` | Mòbil 390×844 | Passa | Passa | Passa | No |

Per cada combinació es comprova: enunciat, quatre opcions, resposta escrita desactivada, selecció de resposta correcta i incorrecta en pràctica, pistes visibles al nivell 1 i ocultes al nivell 2, correcció en examen, absència de desbordament horitzontal del document i absència d'errors JavaScript de pàgina durant la prova.

Es generen i pugen **8 captures** (guiat i examen per cadascun dels dos tipus i de les dues mides), com a artefacte del workflow anomenat `estimacio-1-11-browser-screenshots`.

**Resultat verificat:** https://github.com/srigual-png/mates-interactives/actions/runs/44067075126

## Límits

- Es prova un cas generat per tipus i mida, no totes les instàncies o totes les resolucions.
- La vista mòbil és una mida de pantalla de Chromium, no un dispositiu mòbil físic ni Safari.
- No s'ha fet inspecció humana de totes les captures píxel a píxel.
- Els tests criden funcions de la pàgina per forçar específicament el tipus 1 o 11; no comproven la probabilitat amb què els presenta la selecció aleatòria durant una sessió llarga.
- Les anteriors bateries matemàtiques i de distractors són complementàries.

## Estat del treball

Les dues correccions d'Estimació estan implementades **només a la branca de la PR #49** i validades per proves generatives, oracles seleccionats, distractors equivalents, integració simulada i navegador real. No s'han canviat altres generadors ni nivells oficials, no s'ha fusionat ni publicat cap canvi.

El criteri pedagògic prioritari continua sent l'adequació de cada exercici als sabers de **2n ESO**, no la quota 5–5–3.
