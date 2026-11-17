# Contrast pedagògic de C011 i tres tipus de dificultat mixta

**Data:** 17/11/2026
**Estat:** evidència pedagògica documentada i contrastada amb el codi actual, **sense aprovació oficial de nivells**.

## Validació

La prova `scripts/test-mesura-2eso-evidencia-cognitiva-C011-mixtes.cjs` ha superat **GitHub Actions #44075869866**. Comprova que la fitxa de vuit exemples és coherent amb el codi actual dels generadors, especialment després de la correcció autoritzada d'`estimacio:11`.

Aquesta prova és una verificació **de traçabilitat d'evidència**, no una prova estadística d'aprenentatge ni una auditoria completa de totes les variants.

## Conclusions

| Tipus o variants | Estratègia matemàtica | Orientació no vinculant |
| --- | --- | --- |
| `estimacio:11` | Comparar errors garantits amb una tolerància i triar l'instrument menys precís entre els vàlids | **Possible N2**; interpretar la doble condició |
| `estimacio:14` | Comparar valor observat i esperat, determinar si la diferència és coherent | **N1/N2 pendent**; convé explicitar millor unitats i context |
| `unitats:6:directa` | Aplicar equivalència immediata entre volum i capacitat | **Possible N1** |
| `unitats:6:encadenada` | Aplicar l'equivalència i una conversió de prefix addicional | **Possible N2**, no N3 obligatori |
| `pitagores:15:diagonal` | Reconèixer la diagonal com a hipotenusa i calcular-la | **N1/N2 pendent** |
| `pitagores:15:catet` | Restar quadrats per recuperar un catet desconegut | **N1/N2 pendent**; pot exigir tanta o més feina que la diagonal |
| `superficies:17:sameBase` | Comparar només les altures de dos recipients amb la mateixa base | **Possible N1** |
| `superficies:17:other` | Comparar productes de les tres dimensions amb bases diferents | **Possible N2** |

### Decisió important per a l'agrupació C011

La classificació històrica agrupava `estimacio:11` amb `estimacio:14` sota el mateix nucli de precisió contextual. **Ja no descriu fidelment el codi actual.** El tipus 11, després del redisseny autoritzat, treballa comparació de toleràncies i selecció d'instruments. El tipus 14 conserva un judici de coherència de la lectura. Es proposa **separar provisionalment les dues estratègies per a revisió docent**, sense aprovar automàticament dues famílies.

### Precaució amb Pitàgores 15

La matriu històrica havia indicat el cas de catet com a N1 i el de diagonal com a N2. Aquest ordre **no és una conclusió pedagògica segura**: la fórmula inversa del catet requereix identificar què es resta abans de fer l'arrel. Cal comparar enunciats concrets amb l'alumnat de 2n ESO abans de fixar la classificació.

## Límits i següents comprovacions

Cal contrastar altres agrupacions amb possibles variants mixtes, comprovar la qualitat dels distractors i definir un criteri de dificultat observable per tipus. Les 72 agrupacions de treball no són 72 famílies aprovades.

**Cap canvi de generador, família oficial o nivell; PR #49 sense fusió ni publicació.**

**Evidència estructurada:** `docs/auditoria/MI_2ESO_mesura_exemples_cognitius_C011_variants_mixtes.json`.
