# Consolidació de propostes de dificultat — 2n ESO · Sentit de la mesura

**Data:** 17/11/2026. **Estat:** revisió pedagògica documental completada per als 128 tipus de generador; **nivells i famílies encara pendents d'aprovació i aplicació**.

## Cobertura dels sis lots

| Lot | Tipus o variants amb proposta |
|---|---:|
| Primera matriu de variants mixtes | 20 |
| Unitats i primeres Escales | 20 |
| Escales i primers Pitàgores | 20 |
| Pitàgores i primers Perímetres | 20 |
| Perímetres i Superfícies | 20 |
| Estimació i Problemes | 31 |
| **Total de fitxes** | **131** |

Aquests **131 registres** es corresponen amb els **128 tipus reals** perquè tres tipus de generador estan desdoblats en variants de dificultat. Per això, no és correcte dir que hi ha 131 tipus ni 131 famílies matemàtiques.

| Classificació candidata dels registres | Nombre |
|---|---:|
| N1 | **31** |
| N2 | **83** |
| N1/N2 encara pendent | **17** |
| N3 decidit en aquesta fase | **0** |
| **Total** | **131** |

El recompte **no s'ha d'utilitzar com a distribució definitiva** de la pràctica. És una mostra de les orientacions obtingudes llegint enunciats, ajudes i solucions; no demostra que no hi hagi famílies o variants N3 legítimes. L'objectiu de 5–5–3 és orientatiu i ha de cedir davant l'adequació curricular de 2n ESO.

## Evidència de qualitat

- Les bateries anteriors sumen **6.200 comprovacions independents** dels resultats de **128/128 tipus**, amb oracles aritmètics o contextuals. Són mostres, no demostració exhaustiva.
- Les **72 agrupacions provisionals** de famílies comptabilitzen **129 assignacions** de tipus/variant i encara requereixen deduplicació docent. No es poden identificar automàticament amb les 131 fitxes de nivell.
- Els sis lots de nivell han verificat amb GitHub Actions que cada fitxa remet a una branca real de generador. **CI de l'últim lot:** [#44082019971](https://github.com/srigual-png/mates-interactives/actions/runs/44082019971) — success.
- La qualitat dels distractors, la plausibilitat contextual, les convencions d'arrodoniment i la diferenciació real de famílies queden com a portes pendents.

## Decisions pendents

1. **No aplicar `estimacio:12`** fins que s'aprovi explícitament la proposta d'explicitar l'arrodoniment dels empats cap amunt per a valors positius.
2. Revisar `estimacio:14` per evitar atribuir errors d'unitat amb dades sense unitats explícites.
3. Resoldre les variants de dificultat mixta de `unitats:6`, `pitagores:15` i `superficies:17`.
4. Contrastar les famílies candidates segons **decisió matemàtica real**, no segons context, figura o nombre de passos.
5. Preparar una classificació N1/N2/N3 per **família o variant validada**, sense forçar cap quota ni continguts fora de curs.

**Cap nivell oficial canviat, cap generador modificat en aquesta fase, PR #49 oberta i no publicada.**


## Reconciliació de propostes · 21/11/2026

S'han resolt provisionalment sis registres abans classificats N1/N2: `perimetres:18`→N1, `superficies:7`→N1, `superficies:14`→N1, `superficies:18`→N1 i `superficies:20`→N2. La distribució candidata passa a 31 N1, 83 N2 i 17 N1/N2 (131 registres), sense aprovació formal ni canvi de `REVIEWED_LEVELS`. Continuen dues discrepàncies entre proposta i mapa efectiu: `superficies:8` proposat N2/mapa N1 i `superficies:14` proposat N1/mapa N2; cal validació docent abans de qualsevol canvi.
