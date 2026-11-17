# 2n ESO · Sentit de la mesura — auditoria Fase A, inventari inicial

**Estat: PROVISIONAL — no és cap classificació pedagògica validada.**

**Consolidació pedagògica provisional de «Problemes de mesura» (20/20):** [matriu de decisions JSON](MI_2ESO_mesura_problemes_decisions_20_tipus.json) i [informe amb exemples contrastius](MI_2ESO_mesura_problemes_consolidacio.md). Es distingeixen 10 nuclis compartits, 5 variants contextuals, 4 problemes compostos candidats i 1 cas per revisar; **són categories de decisió, no recomptes de famílies genuïnes**. Test estructural dedicat afegit.

**Traçabilitat 128/128 tipus:** registre estructurat [JSON](MI_2ESO_mesura_tracabilitat_128_tipus.json) i [guia d'interpretació](MI_2ESO_mesura_tracabilitat_128_tipus.md), amb assignació a agrupacions candidates, vincles entre temes i 6 variants documentades. Prova automàtica d'integritat disponible. **Això no valida encara famílies matemàtiques genuïnes.**

**Revisió transversal posterior:** comprovades coincidències de procediment entre els 7 temes, amb matriu de fusions, casos realment compostos i incidències prioritzades. Vegeu [Revisió transversal del Sentit de la mesura](MI_2ESO_mesura_revisio_transversal.md). **No existeix encara un recompte final de famílies genuïnes validades.**

**Setena revisió — inventari complet:** examinats els 20 tipus de **Problemes de mesura**. N1=4, N2=16, N3=0; inclou duplicats de procediments amb els sis temes anteriors i incidències de varietat demostrades als tipus 1, 10 i 16. [Auditoria provisional de Problemes de mesura](MI_2ESO_mesura_problemes_auditoria_provisional.md). Això completa la inspecció estàtica dels **7 temes / 128 tipus**; les famílies i els nivells pedagògics continuen pendents de validació final.

**Sisena revisió:** revisats els 18 tipus d'**Estimació, precisió i error**: 13 tipus N1, 5 N2, 0 N3; fins a 10 famílies candidates. Incidències detectades: als tipus 9 i 17 sempre és correcta la primera mesura, precisió de la mitjana (15) i context d'unitats (11/14). [Auditoria provisional d'Estimació i error](MI_2ESO_mesura_estimacio_auditoria_provisional.md).

**Cinquena revisió:** revisats els 20 tipus de **Superfícies i volums**, inclosa la variant `sameBase` del tipus 17, amb fins a 12 famílies candidates i mapa efectiu per defecte N1=9, N2=11, N3=0. [Auditoria provisional de Superfícies i volums](MI_2ESO_mesura_superficies_auditoria_provisional.md).

**Quarta revisió:** inspeccionats els 18 tipus de **Perímetres i àrees**, amb fins a 12 famílies candidates. El mapa efectiu és N1=11, N2=7, N3=0. Consulteu [l'auditoria provisional de Perímetres i àrees](MI_2ESO_mesura_perimetres_auditoria_provisional.md).

**Nova revisió:** també s'han inspeccionat els 16 tipus de **Teorema de Pitàgores**, amb fins a 9 famílies candidates. La variant de diagonal del tipus 15 és N2 mentre que la variant de catet és N1. Consulteu [l'auditoria provisional de Pitàgores](MI_2ESO_mesura_pitagores_auditoria_provisional.md).

**Actualització:** també s'ha revisat de manera estàtica el tema «Escales i mesures indirectes», amb 18 tipus i **fins a 9 famílies candidates**. Consulteu [l'auditoria provisional d'Escales](MI_2ESO_mesura_escales_auditoria_provisional.md). Cap recompte de famílies ni cap nivell proposat no és definitiu.
**Font inspeccionada:** `2eso/sentit-mesura.html` de `main` posterior a la fusió de la PR #47.
**Àmbit:** set temes ordinaris de 2n ESO. Les quatre ampliacions amb `course:'3r'` queden excloses de les quotes i dels recomptes ordinaris.

## Inventari de generadors identificats al codi

| Tema ordinari | ID al codi | Funció | Línies (base inspeccionada) | Tipus numèrics | Famílies genuïnes | N1/N2/N3 |
|---|---|---|---:|---:|---|---|
| Unitats i conversions | `unitats` | `genUnitats2ESO` | 893–1045 | 18 | 11 candidates, provisional | Auditoria provisional |
| Escales i mesures indirectes | `escales` | `genEscales2ESO` | 1046–1191 | 18 | Fins a 9 candidates, provisional | Auditoria provisional |
| Teorema de Pitàgores | `pitagores` | `genPitagores2ESO` | 1192–1306 | 16 | Fins a 9 candidates, provisional | Auditoria provisional |
| Perímetres i àrees | `perimetres` | `genPerimetresArees2ESO` | 1307–1425 | 18 | Fins a 12 candidates, provisional | Auditoria provisional |
| Superfícies i volums | `superficies` | `genSuperficiesVolums2ESO` | 1426–1579 | 20 | Fins a 12 candidates, provisional | Auditoria provisional |
| Estimació, precisió i error | `estimacio` | `genEstimacioError2ESO` | 1580–1721 | 18 | Fins a 10 candidates, provisional | Auditoria provisional |
| Problemes de mesura | `problemes` | `genProblemesMesura2ESO` | 1722–1903 | 20 | Grups provisionals; duplicitats transversals | Auditoria provisional |
| **Total** | | | | **128** | **No determinat** | **No determinat** |

Els **128 tipus** provenen de branques condicionals `type===N` visibles en cadascun dels set generadors. No equivalen a 128 famílies matemàtiques ni a una validació dels resultats. El curs i la vinculació als exàmens ordinaris es defineixen en `TOPICS` (línies 2319–2330).

## Primera inspecció de «Unitats i conversions»

Els 18 tipus del generador es poden agrupar inicialment per **objectiu observable**, però aquesta agrupació és una hipòtesi d'auditoria, no un inventari de famílies definitiu:

- **Conversions directes:** 1 longitud; 2 superfícies; 3 volums; 4 capacitat; 5 massa; 11 conversió contextual de superfície; 14 equivalències de superfícies/volums.
- **Equivalències volum–capacitat:** 6 conversió entre magnituds; 12 equivalència directa dm³–L; 16 reconeixement d'igualtat correcta; 18 mL–dm³.
- **Selecció/identificació:** 7 unitat adequada al context; 8 factor de conversió correcte.
- **Comparació i operacions amb unitats:** 9 comparar longituds; 10 sumar longituds de diferents unitats; 15 sumar superfícies de diferents unitats.
- **Anàlisi de raonaments:** 13 validar conversió proposada; 17 diagnosticar l'error principal.

Aquestes cinc agrupacions són **categories de treball**, no cinc famílies: per exemple, convertir longitud, superfície i volum podria requerir procediments conceptualment diferenciats, mentre que 1 i 4 podrien compartir un procediment de prefix decimal. Cal examinar els exemples, les variants, els passos, els límits curriculars i la classificació efectiva abans de decidir.

## Properes comprovacions obligatòries

1. Localitzar el mapa de dificultat real a `assets/js/dificultat-mi.js` i qualsevol classificació local, incloent variants i precedències; documentar el nivell efectiu de cadascun dels 18 tipus d'`unitats`.
2. Descartar pseudo-famílies: canvis merament numèrics o de context no compten. Identificar famílies compartides amb altres temes de mesura.
3. Per cada família genuïna, preparar mínim dos exemples resolts, justificació N1/N2/N3, errors típics i adequació al currículum.
4. Separar discrepàncies de dificultat real, correccions funcionals i proves; no alterar exercicis ni `families-validades.json` en aquesta auditoria de només lectura.
5. Repetir el procés per les altres sis temàtiques, preferiblement en lots petits per a una revisió rigorosa.

**No s'han executat proves matemàtiques ni de navegador en aquest inventari.** No s'ha fet encara cap reclassificació pedagògica.
