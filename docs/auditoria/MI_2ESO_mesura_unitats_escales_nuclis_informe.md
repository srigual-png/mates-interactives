# Nuclis matemàtics candidats — Unitats i Escales (2n ESO)

**Estat: proposta provisional, sense aprovació pedagògica.** Aquest document no incorpora famílies a `families-validades.json`, no mou nivells ni altera els generadors publicats.

## Resultat inicial

- **Unitats i conversions:** 18 tipus assignats a **10 nuclis candidats**. `unitats:6` és mixt: els casos directes es vinculen a `U-P06`, i els encadenats, a `U-P07`. Per això hi ha 19 assignacions documentals per a 18 tipus.
- **Escales i mesures indirectes:** 18 tipus assignats a **8 nuclis candidats**. El canvi de m a km, el canvi d'objecte en les ombres o la simple alteració del context no acrediten per si sols procediments nous.
- **Conjunt:** 36 tipus, 37 assignacions per variants i 18 agrupacions candidates, no validades com a famílies genuïnes.

La font estructurada és [MI_2ESO_mesura_unitats_escales_grups_candidats.json](MI_2ESO_mesura_unitats_escales_grups_candidats.json). La coherència de les assignacions es comprova amb `node scripts/test-mesura-2eso-grups-candidats.cjs`.

## Regles de deduplicació aplicades

1. El procediment matemàtic, no el context verbal ni el tipus de fitxa, és la unitat d'anàlisi.
2. Una família candidata pot tenir variants N1/N2 si canvia la càrrega cognitiva (p. ex., ampliar directament o reduir normalitzant unitats). **No cal homogeneïtzar nivells per compartir grup.**
3. Una suma final, un canvi de magnitud o una conversió adicional no creen automàticament una família; poden donar lloc a una composició genuïna només després de revisió.
4. No es confonen exercicis de diagnòstic d'errors de conversió (`unitats:17`) amb errors d'escala (`escales:14`), malgrat compartir format.
5. Els grups `U-Pxx` i `E-Pxx` són **identificadors locals de treball**, no identificadors oficials ni grups canònics entre els set temes.

## Punts de revisió prioritaris

| Comparació | Hipòtesi inicial | Decisió pendent |
|---|---|---|
| `unitats:1/4/5` | Prefix decimal comú | Verificar que canviar magnitud no afegeix procés |
| `unitats:2/11` | Factor quadràtic compartit | Contrastar amb `problemes:18` |
| `unitats:6` vs `12/16/18` | Directa i encadenada no idèntiques | Identificar variants i establir nivell |
| `unitats:10/15` | Conversió + suma | Valorar si doble conversió d'àrees és diferenciadora |
| `unitats:13/17` | Verificació i diagnòstic | Determinar si requereixen habilitats diferenciades |
| `escales:1/2/17` | Distància real amb escala | Decidir si sumar trams és família o subcas |
| `escales:3/5` | Sentit invers/escala d'ampliació | Mantenir N2/N1 provisionals fins a revisió |
| `escales:8/9/10/11/18` | Proporcionalitat i semblança | Separar modelització, proporció donada i incògnita inversa |

## Restricció de mínim de famílies

L'objectiu segueix sent **almenys 15 famílies genuïnes per tema** i, per dificultat, **N1≥5, N2≥5 i N3≥3**. Els 10 i 8 nuclis d'ara no demostren aquest mínim i tampoc autoritzen a inventar N3. Cal completar el contrast curricular i transversal amb els altres cinc temes i decidir, amb exemples reals i justificacions, si falten procediments curricularment adients que s'hagin d'implementar de debò.

## Properes portes de qualitat

1. Comparar aquests 18 nuclis amb els altres cinc temes del Sentit de la mesura i amb les coincidències documentades a Problemes.
2. Preparar almenys dos exemples reals per nucli, amb variants N1/N2 quan n'hi hagi.
3. Revisar la càrrega cognitiva i els possibles N3 sense elevar exercicis simplement per complir una quota.
4. Passar la revisió curricular i els modes guiat/autònom/examen/fitxes abans de qualsevol validació definitiva.

**No fusionar ni publicar canvis per aquest document.**


## Passada focalitzada: agrupacions i modes (21/11/2026)

S'ha fet una revisió comparativa dels 18 nuclis candidats, contrastant procediment, magnitud final i càrrega cognitiva. La conclusió és de **consistència de les hipòtesis**, no d'aprovació de famílies:

- **Unitats:** mantenir separats els factors quadràtic (U-P02) i cúbic (U-P03); agrupar provisionalment les conversions decimals de longitud/massa/capacitat (U-P01) i els reconeixements de factors (U-P05) sense donar-los rang canònic. Separar unitats:6 en casos directes (U-P06) i encadenats (U-P07); unitats:18 és procedimentalment proper al segon. Conversió més comparació (U-P08) i conversió més suma (U-P09) són tasques compostes, no simples variants de canvi d'unitat. Mantenir oberta la identitat de verificació/reconeixement entre unitats:13/17 (U-P10) fins a comparar els enunciats i solucions complets.
- **Escales:** E-P01 comparteix el càlcul distància real amb escala; sumar trams a escales:17 és una composició afegida, no prova per si sola una família nova. E-P02 comparteix l'esquema d'aplicar o invertir l'escala, tot preservant la diferència entre reducció i ampliació i els nivells candidats. E-P03 manté separades les càrregues de reconèixer el factor (escales:12) i normalitzar/invertir (4/15). E-P04 (correspondència de costats) no es fusiona amb càlcul proporcional. E-P05 (escala bidimensional i àrea) i E-P07 (perímetre) es mantenen com a compostos candidats. E-P06 continua subdividit en proporció ja donada, semblança construïda i ombres; el canvi d'incògnita o objecte no basta per crear famílies. E-P08 és diagnòstic d'escala i no es fusiona amb el diagnòstic dimensional unitats:17.
- **Límits de nivell:** el camp working_level de la matriu de grups no és coherent en tots els tipus amb MI_2ESO_mesura_nivells_candidats_unitats_escales_20.json ni amb el mapa intern de dificultat. Per exemple, els candidats de unitats:2/3/8/11/13/14/17 divergeixen. Aquests valors continuen sent propostes no aprovades; aquesta passada no canvia nivells ni el mapa de producció. Cal reconciliar-los en una passada específica abans de publicar cap recompte per N.

### Verificació dels modes

La prova scripts/test-mesura-2eso-integracio-modes-vincles.cjs cobreix ara **82 casos**: els 18 tipus d'Unitats, els 18 d'Escales, una mostra de cadascun dels altres cinc temes i les dues branques internes de unitats:6 (directa i encadenada). En els 82 casos comprova guia amb pistes, pràctica autònoma sense pistes i examen tancat amb quatre opcions, incloent respostes correcta i incorrecta. En 67 casos també comprova que es renderitzi la resposta oberta; 15 queden tancats per disseny. **Resultat local: success.** És una prova DOM simulada: no és una comprovació visual en navegador real, i ui_modes continua pendent per a les relacions que no han estat cobertes cas a cas. El workflow integrat de Mesura 2n ha confirmat la suite ampliada amb **success** al cap bba61af4f056ff813ce4613b5410d21be476a70f (run #44838515018). Les validacions d'inline JavaScript, inventari, 2n numèric i 4t ESO també han acabat en success en aquest cap.

Les 18 agrupacions continuen candidate_not_validated; no s'aprova cap família, no s'actualitzen families-validades.json i no es modifica cap generador.
