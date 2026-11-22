# Auditoria Fase A · Problemes de mesura (2n ESO)

**ESTAT: PROVISIONAL, NOMÉS LECTURA.** No són famílies validades ni s'ha canviat cap exercici ni nivell.

## Evidències i dificultat efectiva

- Generador: `2eso/sentit-mesura.html:1722–1903`, `genProblemesMesura2ESO(forceType)`, 20 tipus amb enumeració explícita, més `nextProblemType` amb rotació de 20.
- Classificació prioritària: `assets/js/dificultat-mi.js:9`, `REVIEWED_LEVELS['2eso/mesura'].problemes`; preval sobre l'antic mapa dins `level()`. No hi ha `REVIEWED_VARIANTS` de `problemes`.
- **N1 efectiu: 4 tipus** — 16,17,18,19.
- **N2 efectiu: 16 tipus** — 1–15 i 20.
- **N3 efectiu: 0**. No inventar procediments de N3.

## Matriu de famílies candidates — 14 grups provisionals

Agrupar un problema per **raonament** no vol dir que sigui una família nova: molts tipus ja apareixen als sis temes previs.

| Grup | Procediment / finalitat principal | Tipus | Nivell efectiu | Relació amb altres temes |
|---|---|---|---|---|
| PM01 | Àrea útil després de descomptar buits; litres de pintura i arrodoniment a pots sencers | 1 | N2 | Àrea amb buits de `perimetres:16` + rendiment/arrodoniment, integració diferent |
| PM02 | Quantitat de rajoles segons dues dimensions i unitats de superfície | 2 | N2 | Conversiones d'unitats + superfícies, modelatge de recompte |
| PM03 | Volum de dipòsit i percentatge d'ompliment | 3 | N2 | `superficies:1` + `unitats` + percentatges |
| PM04 | Capacitat a partir de volum de cilindre | 4 | N2 | Solapament fort amb `superficies:7` i `unitats:12`: és fórmula i dm³→L directes |
| PM05 | Superfície lateral de cilindre per etiqueta | 5 | N2 | Mateix procediment que `superficies:8`, canvi de context |
| PM06 | Hipotenusa/diagonal en pantalla o escala | 6,7 | N2 | Duplicació matemàtica de `pitagores:13` i `pitagores:6` |
| PM07 | Escala → distància real o escala deduïda | 8,9 | N2 | Procediments ja presents a `escales:2` i `escales:4` |
| PM08 | Altura indirecta per ombres i semblança | 10 | N2 | Mateix procediment que `escales:8,9`; canvien dades |
| PM09 | Àrea de franja rectangular exterior menys interior | 11 | N2 | Sostracció d'àrees de `perimetres:9,11,16`; s'ha de construir dues dimensions exteriors |
| PM10 | Corona circular exterior menys interior | 12 | N2 | Matemàticament el mateix procediment que `perimetres:17` |
| PM11 | Àrea de capsa sense tapa (base i quatre cares) | 13 | N2 | Variant específica del recompte de cares de `superficies:2,16,20` |
| PM12 | Perímetre amb obertura: sòcol, tanca i eventual cost per metre | 14,15 | N2 | Mateixa longitud neta, però 14 incorpora cost proporcional; subvariantes amb diferent nombre de passos |
| PM13 | Comparació d'error relatiu i selecció d'estimació plausible | 16,17 | N1 | `estimacio:9` (error relatiu) i `estimacio:1–3` (estimació) — coneixement repetit, 16 queda a N1 mentre comparació de relatius a `estimacio:9` és N2 |
| PM14 | Conversió de superfície, precipitació o altura inversa de cilindre | 18,19,20 | N1,N1,N2 | **Agrupació d'inventari, no família genuïna:** 18 repeteix `unitats:2`; 19 aplica directament equivalència facilitada; 20 és fórmula inversa de `superficies:12` |

**Advertiment:** PM14 és només un grup residual per garantir cobertura exhaustiva i **s'ha de separar o eliminar** en el recompte de famílies; no és una família. PM13 també agrupa procediments diferents (comparar errors relatius i estimar). Per tant les 14 files **no equivalen a 14 famílies candidates genuïnes**. L'objectiu de la revisió transversal serà absorbir els duplicats i només registrar els procediments integrats diferencials. Tots els tipus 1–20 estan coberts una vegada en aquesta matriu.

## Exemples matemàtics representatius

Els exemples són càlculs construïts d'acord amb el codi, **no sortides de navegador**.

- **1, pintura:** paret 6×3 m; porta 1×2 i finestra 1,5×1,2 → superfície 18−2−1,8 = 14,2 m²; pot de 8 m² → ceil(14,2/8)=**2 pots**.
- **2, rajoles:** 4×3 m; rajoles 50×50 cm → 8·6=**48 rajoles**.
- **3, dipòsit al percentatge:** 80×50×40 cm = 160 L; ple al 75% → **120 L**.
- **4, cilindre:** r=2 dm i h=5 dm → V=3,14·4·5 = **62,8 L**.
- **5, etiqueta:** d=8 cm, h=12 cm → A=3,14·8·12=**301,44 cm²**.
- **6, pantalla:** 30×40 cm → √(900+1600)=**50 cm** de diagonal.
- **7, escala recolzada:** base 1,8 m i altura 2,4 m → √(3,24+5,76)=**3 m**.
- **8, mapa:** escala 1:25.000, 8 cm → 8·25.000/100.000=**2 km**.
- **9, escala deduïda:** 5 cm del plànol representen 2,5 m → 5:250 = **1:50**.
- **10, ombres:** persona 1,5 m, ombra 2 m; arbre ombra 8 m → 1,5·8/2=**6 m**.
- **11, franja rectangular:** piscina 8×4 m; camí d'1 m al voltant → exterior 10×6, franja 60−32=**28 m²**.
- **12, camí circular:** r=3 m, amplada 1 m → 3,14·(4²−3²)=**21,98 m²**.
- **13, capsa oberta:** 40×30×20 cm, sense tapa → 40·30+2·40·20+2·30·20=**4.000 cm²**.
- **14, tanca:** jardí 20×12 m, porta 3 m, cost 15 €/m → (64−3)·15=**915 €**.
- **15, sòcol:** habitació 5×4 m, porta 0,9 m → 2·(5+4)−0,9=**17,1 m**.
- **16, error relatiu:** referència 120 cm, A=119 i B=122 → A 1/120, B 2/120 → **A**.
- **17, estimació:** aula 6×8 m → 48 m²; volum 8×4×1,5 m³ = 48 m³ = 48.000 L.
- **18, conversió:** 8 m²=8·10.000 = **80.000 cm²**.
- **19, precipitació:** 80 m² ·12 mm ·(1 L/m²/mm)=**960 L**.
- **20, altura de cilindre:** r=2 dm, V=62,8 L=62,8 dm³ → h=62,8/(3,14·4)=**5 dm**.

## Incidències importants trobades al codi

1. **Tipus 1: sempre surten 2 pots.** Tots els tres casos codificats donen quocient entre 1 i 2: (18−2−1,8)/8=1,775; (14−1,8−1,44)/7≈1,537; (21−2,1−2,1)/9≈1,867. `Math.ceil` sempre torna **2**. L'estratègia és bona, però la varietat de resultat és nul·la: calen exemples d'1, 3, 4... pots, mantenint coherència.
2. **Tipus 10: resposta numèrica sempre 6 m.** Tots quatre casos del banc tenen `ht:6`, de manera que canvien les dades però mai el resultat. Cal variar l'altura buscada i comprovar la proporció.
3. **Tipus 16: sempre guanya A.** Els quatre casos codificats tenen error absolut d'A més petit que el de B, i la referència és la mateixa per a les dues mesures. Per tant, A sempre té menor error relatiu. És un defecte de varietat compartit amb `estimacio:9` i `estimacio:17`.
4. **Tipus 16: incoherència de N1 entre temes.** Comparar **dos errors relatius** és N2 a `estimacio:9`, però **N1** a `problemes:16`. Tot i que la referència és igual dins cada pregunta del tipus 16 (la comparació es pot reduir als errors absoluts), cal justificar explícitament la classificació per la possible simplificació: no pujar-lo a N2 automàticament.
5. **Tipus 2:** el banc de casos fixos encaixa rajoles exactes en ambdues dimensions. El procediment exclou retalls i reserva per enunciat. No considerar-lo un problema N3 de quantitats no enteres.
6. **Tipus 13:** la capsa **no té tapa**; la fórmula correcta és base + quatre laterals, no l'àrea d'un ortoedre tancat. Diferència conceptual real que cal preservar.
7. **Tipus 19:** l'equivalència de pluja 1 mm × 1 m² = 1 L s'ofereix **expressament**; és una aplicació directa, no una conversió composta N3.
8. **Transversal:** 4/5/6/7/8/9/10/12/18/20 reutilitzen gairebé literalment procediments de temes precedents. **No sumar-los com a famílies noves** per assolir una quota de 15.
9. **Qualitat:** revisar a totes les preguntes els distractors que podrien coincidir, els decimals i les equivalències en modes guiats/autònoms. No s'han executat oracles ni proves UI específiques.
10. **N3:** cap dels 20 tipus actuals exigeix un problema obert o de reconstrucció avançada verificable que acrediti N3. No crear-ne artificialment.

## Abast verificat i feina pendent

**Revisat:** 20/20 branques de codi, comparació del procediment amb els sis temes anteriors, exemples aritmètics i tres errors de varietat demostrables per domini finit dels casos. **Actualització (22/11/2026):** el mapa `REVIEWED_LEVELS` vigent classifica Problemes en 5 N1, 15 N2 i 0 N3; el recompte 4/16/0 del primer tall ha quedat superat.

**No executat:** els generadors reals al navegador, proves d'oracle independents, UI, mode examen, test dels distractors i comprovació normativa curricular. La validació pedagògica definitiva i les correccions de funcionament seran fases posteriors i PRs específiques.

**No modificar en aquesta PR:** `assets/js/dificultat-mi.js`, els exercicis de `2eso/sentit-mesura.html` ni `docs/auditoria/families-validades.json`.
