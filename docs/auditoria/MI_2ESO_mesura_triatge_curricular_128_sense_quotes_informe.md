# Triatge curricular dels 128 generadors · 2n ESO, Sentit de la mesura

**Estat:** primera passada documental. No és una validació de totes les instàncies, distractors o interfícies, ni una proposta de modificació de nivells oficials.

## Criteri actual

La distribució **5–5–3** i les **15 famílies per tema** es conserven només com a fites de referència. La prioritat és treballar els **sabers adequats a 2n ESO**, amb casos matemàticament diferents i progressió clara. N3 és una categoria de raonament no rutinari **dins del curs**, no una quota.

Fonts curriculars: [Orientacions de Sentit de la mesura de 2n ESO](https://projectes.edigital.cat/orientacions-curriculars/mat_sec/sentit_de_la_mesura_2n_eso.html), [Orientacions per cursos de la Generalitat](https://xtec.gencat.cat/web/.content/curriculum/eso/concrecions-curriculars/Orientacions-curriculars_MAT_SEC_per-cursos.pdf).

## Resultat de la primera passada

- **128/128** registres documentals classificats, corresponents als set temes.
- **24 tipus** amb revisió prioritària: ambigüitat, precisió, nivell, distractors, solapament o control del model matemàtic.
- **104 tipus restants** provisionalment conservats, sense certificar: 77 necessiten mantenir control de solapament amb altres exercicis i 27 requereixen inspecció individual posterior.
- **Zero famílies i zero nivells aprovats o modificats.**

La fitxa individual de cadascun dels 128 tipus és a [MI_2ESO_mesura_triatge_curricular_128_sense_quotes.json](MI_2ESO_mesura_triatge_curricular_128_sense_quotes.json); conté la descripció de procediment, classificació prèvia, acció de triatge i motiu. No es tracta de 128 exercicis executats i corregits: són 128 **tipus descrits**.

## Primers casos que convé inspeccionar al codi

| Tema | Tipus | Comprovació necessària |
| --- | --- | --- |
| Unitats | `unitats:6/18` | Separar conversions directes i encadenades, sense comptar famílies duplicades |
| Unitats | `unitats:13/17` | Distractors que podrien revelar massa fàcilment la resposta |
| Escales | `escales:11/14` | Revisar si l'enunciat ja facilita el procediment o la detecció de l'error |
| Pitàgores | `pitagores:5/9/15` | Complexitat de la diagonal, casos no rectangles, variants catet/diagonal |
| Perímetres | `perimetres:13/15` | Inversió de fórmules i apotema donada, sense exigir trigonometria aliena al curs |
| Superfícies i volums | `superficies:14/17/20` | Justificació real de N1/N2, especialment bases iguals i recompte de cares |
| Estimació | `estimacio:11/12/15` | Ambigüitat de xifres significatives, convenció d'arrodoniment i precisió en mitjanes |
| Problemes | `problemes:2/3/14/16/19` | Varietat real, complexitat composta, redundància i significat de mm·m² = L |

Les descripcions per tipus són indicis per prioritzar. Un generador no es descarta ni es reclassifica sense comparar l'enunciat real, les seves possibles variants, els distractors i la solució.

## Decisions pedagògiques

**Conservar i millorar**, abans que eliminar, els exercicis que reforcen una idea útil del curs. **Agrupar variants equivalents** a l'hora de comptar famílies, però mantenir-ne les pràctiques quan són útils. **Simplificar** enunciats i distractors amb ambigüitats. **Reclassificar** només si la complexitat cognitiva real és diferent de l'etiqueta actual. **Descartar** només si el contingut no encaixa, és incorrecte o duplica sense valor una pràctica existent.

L'auditoria **no demostra** que tots els 128 exercicis siguin curricularment adequats, però no ha detectat prou evidència documental per descartar-ne cap automàticament.

## Propera passada

Revisar el codi de les **24 prioritats** i executar casos concrets, començant per les possibles errades d'ambigüitat o precisió. Després examinar els altres 104 generadors per mostreig i cobertura sistemàtica abans d'un resultat final. La proposta d'E2 com a variant i P3 com a candidata independent es manté pendent d'aprovació docent.

Cap generador ni classificador modificat, cap PR fusionada, cap desplegament.
