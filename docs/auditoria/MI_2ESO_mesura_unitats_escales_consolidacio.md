# Consolidació provisional · Unitats i conversions + Escales i mesures indirectes (2n ESO)

**Estat: PROVISIONAL — auditoria documental, no famílies validades.** Registres estructurats: [Unitats, 18/18 tipus](MI_2ESO_mesura_unitats_decisions_18_tipus.json) i [Escales, 18/18 tipus](MI_2ESO_mesura_escales_decisions_18_tipus.json). Contrastats amb els [set informes](MI_2ESO_mesura_inventari_inicial.md), [addenda d'Unitats](MI_2ESO_mesura_unitats_variants_addenda.md), [revisió transversal](MI_2ESO_mesura_revisio_transversal.md) i [matriu 128/128](MI_2ESO_mesura_tracabilitat_128_tipus.json).

## Resultat de 36 decisions, no de 36 famílies

| Decisió de treball | Unitats | Escales | Què vol dir |
|---|---:|---:|---|
| Nucli local o transversal compartit | 8 | 8 | Procediment matemàtic similar al d'altres tipus; no comptar-lo repetit |
| Variant contextual/procedimental | 3 | 6 | Una diferència pot justificar nivell diferent, no necessàriament una altra família |
| Compost candidat | 2 | 2 | Hi ha una segona operació o decisió a justificar |
| Identitat per determinar | 3 | 2 | No hi ha fusió prou acreditada amb les dades actuals |
| Tipus mixt amb variants internes | 2 | 0 | Necessita identificador de cas o justificació granular |
| **Total de tipus revisats** | **18** | **18** | **36**, sense cap tipus omès |

Aquestes categories no són nivells N1/N2/N3 ni un catàleg final de famílies. Per exemple, «Unitats» U06/U07/U08 queden en dues famílies candidates: equivalència directa (U-P06) i conversió composta (U-P07). El format de reconeixement del tipus 16 no el separa de la conversió composta que comparteix amb les branques encadenades del tipus 6 i el tipus 18.

## Unitats i conversions: decisions que importen

- **U01** (tipus 1,4,5): longitud, capacitat i massa comparteixen l'esquema de potències decimals. No hi ha família independent per canviar de magnitud si el raonament és el mateix.
- **U02** (2,11) coincideix en factor de superfície amb `problemes:18`; el pressupost no obliga a fer cap pressupost.
- **U03** (3) exigeix factor cúbic i ha de diferenciar-se conceptualment del factor quadràtic, sense inventar una nova família per cada prefix.
- **U05** (8,14) pregunta quin factor o equivalència és correcte; és una variant de reconeixement i no automàticament un procés de càlcul nou.
- **U06/U07/U08** (12,16,6,18): contrastats com dues famílies candidates, no tres: **U-P06 directa** (`unitats:12` i branca directa de `unitats:6`, N1) i **U-P07 composta** (branca encadenada de `unitats:6`, `unitats:16` i `unitats:18`, N2 proposat). El tipus 16 demana seleccionar una igualtat que incorpora també un canvi de prefix/escala; per això s'agrupa amb la conversió composta, encara que el format sigui de tria múltiple. El mapa vigent continua amb 16 a N1: la discrepància es documenta i no s'ha aplicat en aquesta revisió. Vegeu l'addenda, que conté els casos i la justificació.
- **U09** (9) requereix **convertir i comparar**, no sols canviar una unitat.
- **U10** (10,15) combina conversió i suma. La magnitud passa de longitud a superfície i el nombre de conversions canvia; no hi ha justificació automàtica de crear dues famílies.
- **U11** (13,17) és reconeixement o diagnòstic de factor. Al tipus 13 la branca incorrecta pot requerir identificar el factor dimensional, però els distractors ja indiquen l'error. **Mantenir N1 provisional**, sense elevar tot el tipus.

## Escales i mesures indirectes: decisions que importen

- **E01** (1,2) és escala 1:n → longitud real, tant si la unitat final és m com km; inclou `problemes:8`.
- **E02** (3,5) relaciona longitud real i representada, però el tipus 3 redueix i converteix unitats (N2), mentre 5 amplia directament (N1). **No homogeneïtzar nivells** per compartir grup.
- **E03** (4,12,15) parteix de correspondències de longitud; el tipus 12 identifica un factor directe (N1), mentre 4 i 15 han de normalitzar una escala a 1:n (N2). Vinculació `problemes:9`.
- **E04** (13) és verificar ordre de costats corresponents, i no «calcular una longitud». El format és diferent d'E06 i aquesta diferència s'ha de preservar.
- **E05** (6,7) aplica l'escala a **dues dimensions** abans d'obtenir superfície. El sentit real→dibuix o dibuix→real és un subcas.
- **E06** (8,9,10,11,18) aplica proporcions/semblança: els tipus 8 i 9 són ombres; 10 és un costat homòleg; 11 parteix d'una proporció ja escrita (N1, no N2 per defecte); 18 troba una ombra en lloc d'una altura. L'etiqueta comuna no garanteix igual dificultat ni família independent per a cada cas.
- **E07 i E08** (16,17) combinen escala i, respectivament, perímetre o suma de trams. **Compostos candidats**, encara no famílies declarades.
- **E09** (14) és diagnòstic d'errors d'escala. Comparteix *format* amb `unitats:17`, però no el mateix concepte matemàtic; prohibida la fusió automàtica per coincidència de format.

## Quatre exemples de contrast, calculats a partir dels procediments

Són exemples matemàtics construïts, no mostres de navegador.

1. **Conversió directa o encadenada:** 2,5 dm³ = **2,5 L** (relació directa); 1,2 m³ = 1.200 dm³ = **1.200 L** (conversió encadenada). Una única etiqueta «conversió» amaga decisions diferents.
2. **Escala i direcció:** mapa 1:25.000, 4 cm → 4×25.000 cm = **1 km** real. En canvi, 2 m reals al plànol 1:100 → 200/100 = **2 cm** dibuixats. Comparar el sentit de l'operació, no només el resultat.
3. **Factor lineal i àrea:** rectangle de 4×3 cm a 1:100 → 4×3 m reals → **12 m²**. Multiplicar l'àrea del dibuix per 100, sense elevar el factor, seria un error conceptual.
4. **Compost amb suma de trams:** mapa 1:50.000 i ruta de 2+3 cm → 5×50.000 cm = 250.000 cm = **2,5 km**. La suma prèvia pot ser una variant del procediment de distància real, no nova família automàtica.



**Actualització docent (21/11/2026):** el mapa vigent assigna `unitats:6` N1 per defecte i N2 a la variant `encadenada`, i `unitats:18` N2. El contrast posterior agrupa U06/U07/U08 en dues famílies candidates: U-P06 directa i U-P07 composta; proposa `unitats:16` N2 per la cadena de conversió inclosa a cada igualtat, tot i que el mapa vigent encara el manté a N1. Els tests de variants i d'Unitats de la integració al commit `194b99c` van passar ([run #44944032974](https://github.com/srigual-png/mates-interactives/runs/44944032974)); la verificació de modes és simulada. La discrepància de nivell de 16 continua sense aplicar i la validació de famílies continua pendent.

## Què està verificat i què queda pendent

**Verificat per inspecció:** cobertura 18+18, associació de cada tipus a l'agrupació original (Uxx o Exx), diferències de procediment i nivell documentades als informes i connexions explícites amb altres temes. Nou test estructural `node scripts/test-mesura-2eso-decisions-unitats-escales.cjs` que comprova integritat i referències.

**No verificat aquí:** oracles matemàtics exhaustius de cadascun dels 36 tipus, decisions curriculars normatives, dues instàncies **reals de generador** de cada família, distractors de tots els casos, modes guiat/autònom, examen i fitxes. A més, les PR funcionals encara no són producció.

**Proper pas:** consolidar Pitàgores i Perímetres i àrees, i després Superfícies i volums i Estimació. La decisió final de famílies genuïnes ha de ser transversal i explícitament aprovada, sense reclassificar N3 per quota. No tocar `families-validades.json` en aquesta PR.
