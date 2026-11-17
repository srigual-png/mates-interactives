# Part 3 — protocol de contrast dels vincles de deduplicació de 2n ESO · Sentit de la mesura

**Estat:** proposta de revisió pedagògica, no és validació ni autorització d'edicions funcionals. Data: 17/11/2026.

Font: `MI_2ESO_mesura_decisio_44_vincles_unipersonals.json`. Es mantenen els 21 casos no equivalents separats provisionalment. Els altres 23 registres són **19 relacions de variants/subpassos i 4 registres de nucli compartit**, però els dos registres recíprocs `problemes:14/15` representen **una sola parella**, és a dir, **22 comparacions conceptuals**, no 23 fusions. Les observacions de sota són hipòtesis justificades a contrastar amb sortides reals i resolucions, no proves efectuades.

## Criteris per acceptar una mateixa família

1. Mateix objectiu matemàtic avaluable i mateixa estratègia central, més enllà del context i els nombres.
2. Les variants poden canviar càrrega cognitiva i nivell, però han de conservar un procediment central explícit; un subpas compartit no és suficient per unir famílies.
3. Distingir resultats de **longitud, superfície, volum, capacitat, error** i diagnòstic d'errors.
4. Contrastar per parella almenys dos exemples reals **per cada variant**, respostes i distractors; registrar les pistes de modes guiat/autònom/examen. Quan les evidències falten, deixar `pendent`.
5. N1/N2/N3 és una classificació curricular i de demanda cognitiva, **no una quota a assolir**. Sense canviar `REVIEWED_LEVELS` ni `families-validades.json` fins a validació.

## Matriu dels 23 registres prioritzats

| Registre | Relació candidata | Judici pedagògic provisional; què contrastar |
|---|---|---|
| 1 · `escales:16` | `MI2-FC-C001` · variant/subpas | **Variant composta**. N2 candidat quan cal transformar longituds i derivar perímetre; comparar amb exercici d'escala simple |
| 2 · `escales:12` | `MI2-FC-C005` · variant/subpas | **Variant directa**. N1/N2 segons si el factor s'ha de deduir; no confondre ampliació amb escala gràfica |
| 3 · `estimacio:18` | `MI2-FC-C016` · nucli compartit | **Objectiu diagnòstic propi**. Comprovar si detectar una suma incorrecta exigeix entendre el valor absolut o només descartar una fórmula |
| 4 · `estimacio:9` | `MI2-FC-C017` · variant/subpas | **Dues referències**. Cal calcular i comparar dos errors relatius amb denominadors diferents; verificar si hi ha biaix a favor d'una opció |
| 5 · `perimetres:14` | `MI2-FC-C027` · variant/subpas | **Fórmula inversa**. N2 candidat: aïllar radi a partir de perímetre, no aplicar directament fórmula |
| 6 · `perimetres:15` | `MI2-FC-C026` · variant/subpas | **Família final diferent**. Àrea amb apotema implica perímetre intermedi; mantenir tasca de superfície diferenciada |
| 7 · `perimetres:4` | `MI2-FC-C023` · variant/subpas | **Prerequisit, no duplicat**. Perímetre regular és subpas d'àrea amb apotema, però resultat i decisió final diferents |
| 8 · `pitagores:10` | `MI2-FC-C039` · variant/subpas | **Compost invers**. Trobar altura i posterior àrea: dues etapes i interpretació geomètrica |
| 9 · `pitagores:11` | `MI2-FC-C039` · variant/subpas | **Compost invers**. Trobar catet i posterior perímetre: diferenciar inversió de simple hipotenusa |
| 10 · `pitagores:12` | `MI2-FC-C038` · variant/subpas | **Compost comparatiu**. Diagonal pitagòrica més comparació de recorreguts: no unir sense prova |
| 11 · `pitagores:14` | `MI2-FC-C038` · variant/subpas | **Compost additiu**. Hipotenusa més marge: comprovar si segon pas és només operació rutinària |
| 12 · `pitagores:15` | `MI2-FC-C038` · variant/subpas | **Variants obligatòriament separades**. Branca diagonal ≠ branca catet; comparar cadascuna amb el seu nucli |
| 13 · `pitagores:3` | `MI2-FC-C038` · variant/subpas | **Inversió pitagòrica**. Procediment relacionat amb hipotenusa però exigeix resta de quadrats |
| 14 · `problemes:14` | `MI2-FC-C045` · nucli compartit | **Nucli amb cost**. Perímetre útil sense porta + multiplicació de tarifa; comparar amb problemes:15 |
| 15 · `problemes:15` | `MI2-FC-C044` · nucli compartit | **Nucli sense cost**. Contorn útil; parella recíproca amb problemes:14, comptar-la una sola vegada |
| 16 · `problemes:16` | `MI2-FC-C017` · variant/subpas | **Denominador comú**. Comparació d'errors relatius amb referència comuna pot simplificar-se; verificar què es pregunta |
| 17 · `problemes:3` | `MI2-FC-C054` · variant/subpas | **Volum parcial**. Volum rectangular + capacitat + percentatge; no reduir a conversió de litres |
| 18 · `problemes:5` | `MI2-FC-C061` · nucli compartit | **Àrea lateral contextual**. Etiqueta cilíndrica equival a superfície lateral; verificar si és donat diàmetre i sense bases |
| 19 · `superficies:15` | `MI2-FC-C052` · variant/subpas | **Volum invers i conversió**. Profunditat a partir de litres i àrea de base: dos passos, resultat longitud |
| 20 · `superficies:17` | `MI2-FC-C051` · variant/subpas | **Bifurcació real**. sameBase permet comparar altures; other demana productes de bases i altures |
| 21 · `superficies:4` | `MI2-FC-C051` · variant/subpas | **Prisma triangular**. Cal calcular àrea triangular prèvia; verificar nivell per 2n ESO |
| 22 · `superficies:9` | `MI2-FC-C061` · variant/subpas | **Superfície total**. Àrea lateral + dues bases; distingir de sola àrea lateral cilíndrica |
| 23 · `unitats:9` | `MI2-FC-C063` · variant/subpas | **Conversió comparativa**. Normalitzar unitats abans de comparar; l'objectiu no és només convertir |

## Bloc de validació empírica pendent

Per a cadascuna de les **22 comparacions conceptuals**: (a) identificar els generadors i les branques efectives, (b) obtenir dos enunciats reals de cada variant, (c) resoldre independentment i contrastar amb l'opció correcta, (d) comprovar errors típics, unitats i equivalències de distractors, (e) verificar les pistes i el mode examen, (f) emetre decisió: `mateixa_familia`, `variant_mateixa_familia`, `families_diferents` o `pendent_evidencia` amb nivell candidat i justificació. Evitar comptar dues vegades `problemes:14/15`.

**Prioritat de mostreig:** `problemes:14/15`, `problemes:5/superficies:8`, `estimacio:18` contra càlcul d'error absolut, després Pitàgores directe/invers i les variants de `superficies:17`. La relació amb `superficies:19` és una tercera tasca de reconeixement de desenvolupament, no una equivalència assumida.

**Control de canvis:** cap fusió, cap publicació, cap nivell oficial ni generador canviat per aquest document. La correcció autoritzada d'`estimacio:12` ja figura com aplicada i comprovada.
