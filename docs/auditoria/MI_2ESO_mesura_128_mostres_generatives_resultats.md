# Primera bateria generativa dels 128 tipus · 2n ESO, Sentit de la mesura

**Data:** 17/11/2026 · **Estat:** mostreig automatitzat correcte, no prova exhaustiva.

## Execució verificada

S'ha executat el codi real dels set generadors de `2eso/sentit-mesura.html` dins d'un context JavaScript aïllat, sense obrir el navegador ni modificar el fitxer original.

- **128 tipus coberts:** Unitats 18, Escales 18, Pitàgores 16, Perímetres 18, Superfícies 20, Estimació 18, Problemes 20.
- **12 instàncies per tipus:** **1.536 exercicis** generats amb seqüència pseudoaleatòria reproduïble.
- **0 incidències detectades** per les assercions que s'han executat.
- Per a cada instància s'ha comprovat: enunciat i resposta no buits; exactament 4 opcions textualment diferents; resposta correcta inclosa entre les opcions; guia i solució presents; absència d'excepcions en generació.
- **Comprovació numèrica independent sobre 6 tipus**: `unitats:18`, `superficies:14`, `perimetres:8`, `pitagores:5`, `escales:11` i `problemes:19`. Es reconstrueix el resultat des de dades explícites a l'enunciat, no des de `correct`.
- **4 tipus amb reintent** han acabat dins de la mostra: `unitats:9` (màxim 13 crides pseudoaleatòries per instància), `escales:15` (22), `escales:18` (35), `estimacio:17` (12). Aquest recompte no equival a una prova formal de terminació.
- Total de crides al generador pseudoaleatori: **18.132**.

**CI:** [GitHub Actions #44062543928](https://github.com/srigual-png/mates-interactives/actions/runs/44062543928) amb conclusió **success**.

## Limitacions i incidències prèvies obertes

**Zero errors detectats** vol dir zero errors **dins dels criteris comprovats**, no zero errors matemàtics a tot el banc.

- La comprovació numèrica externa només cobreix sis dels 128 tipus; els altres tenen comprovacions estructurals i d'opcions, però no un oracle numèric independent.
- Només s'han executat 12 instàncies per tipus i una seqüència pseudoaleatòria; no s'han recorregut totes les combinacions.
- Les opcions es comparen com a cadenes: no es detecten opcions matemàticament equivalents escrites de manera distinta.
- **`estimacio:11` conserva una ambigüitat semàntica confirmada**: en alguns enunciats dues expressions de precisió són raonables sense informar de l'instrument. Aquesta prova no la descarta ni l'arregla.
- No s'han verificat aquí les funcions d'interfície ni els modes guiat/autònom/examen.

## Proper pas d'auditoria

Ampliar els oracles independents i provar casos límit de les famílies amb major risc; revisar matemàticament alternatives equivalents i arrodoniment i mantenir `estimacio:11` com a incidència oberta. Prioritat curricular: activitats adequades a 2n ESO, sense quota rígida 5–5–3.

El test executable és `scripts/test-mesura-2eso-generacio-128-mostra.cjs`, amb workflow `.github/workflows/test-mesura-2eso-generacio-128-mostra.yml`. Cap generador, nivell oficial, família, estat de fusió de PR o publicació alterats.
