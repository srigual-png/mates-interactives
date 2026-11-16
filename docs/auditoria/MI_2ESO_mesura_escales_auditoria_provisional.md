# Auditoria Fase A · Escales i mesures indirectes (2n ESO)

**ESTAT: PROVISIONAL — PENDENT DE REVISIÓ PEDAGÒGICA. NO IMPLEMENTAT.**

## Evidència i límits

Fonts inspeccionades: `2eso/sentit-mesura.html:1046–1191` (18 tipus, funció `genEscales2ESO`), `2eso/sentit-mesura.html:2319–2330` (tema `escales`) i `assets/js/dificultat-mi.js`: `REVIEWED_LEVELS['2eso/mesura'].escales` a la línia 9, amb precedència efectiva en `reviewedLevels`/`classify` (línies 657, 686–795).

La lectura de codi és **estàtica**: no s'ha executat encara la generació aleatòria, Playwright, els exàmens o fitxes del bloc de mesura. Els exemples següents són instàncies representatives, calculades independentment a partir de les operacions presents al generador; no es presenten com a sortides observades del navegador.

### Classificació real actual

- N1: **5 tipus** — `5,11,12,13,14`.
- N2: **13 tipus** — `1,2,3,4,6,7,8,9,10,15,16,17,18`.
- N3: **0 tipus**.
- **Atenció:** el mapa antic del mateix fitxer, dins `level()`, situa `1,3,5,12,13` a N1, `2,4,8,9,10,11` a N2 i `6,7,14,15,16,17,18` a N3. **No és el mapa efectiu per a l'exercici ordinari** quan existeix `REVIEWED_LEVELS`. No s'ha de comptar cap N3 actual a partir del mapa antic.
- No hi ha excepcions de `REVIEWED_VARIANTS` per a `escales`.

## Matriu de famílies candidates (provisional: màxim 9)

| Família | Procediment genuí (no confondre amb context) | Tipus | Nivells actuals | Proposta provisional i justificació |
|---|---|---|---|---|
| E01 | Escala de reducció → longitud real i conversió d'unitats | 1,2 | N2,N2 | **N2**: interpretar escala, multiplicar i convertir cm→m/km |
| E02 | Longitud real → longitud representada, inclosa ampliació | 3,5 | N2,N1 | **N1–N2 segons variant**: 5 és ampliació directa, 3 combina m→cm i inversió de l'escala |
| E03 | Trobar o interpretar factor d'escala a partir de longituds corresponents | 4,12,15 | N2,N1,N2 | **N1/N2 segons variant**: 12 és un quocient directe; 4/15 requereixen igualar unitats i normalitzar 1:n |
| E04 | Identificar la correspondència correcta de costats en semblança | 13 | N1 | **N1**: reconèixer proporcions amb ordre coherent, no cercar un valor desconegut |
| E05 | Superfícies en plànols mitjançant escala aplicada a dues dimensions | 6,7 | N2,N2 | **N2**: trobar dos costats reals o representats i després calcular àrea (o k²) |
| E06 | Aplicar proporcionalitat de costats/triangles semblants per trobar incògnita | 8,9,10,11,18 | N2,N2,N2,N1,N2 | **N2 general; tipus 11 candidat N1** perquè la proporció ja està escrita i només cal resoldre ax=bc |
| E07 | Perímetre real a partir de dues dimensions representades | 16 | N2 | **N2**: escala de dos costats + càlcul de perímetre |
| E08 | Sumar trams d'un mapa i convertir-los a distància real | 17 | N2 | **N2**: sumar mesures homòlogues + factor d'escala + conversió de cm a km |
| E09 | Valorar/detectar errors en ús d'escales | 14 | N1 | **N1 actual**: reconeixement amb solució explícita entre alternatives; no justifica N3 |

La partició cobreix exactament **els 18 tipus, una vegada cadascun**. Les famílies candidates són **9**, però cal revisar si E03 i E04 s'han de distingir en tots els casos, i si E07/E08 són procediments nous o combinacions d'E01 i fórmules bàsiques. **No registrar-ne 9 com a definitives**. Els nivells proposats són de famílies/variants, no una nova font de classificació del codi.

## Exemples representatius resolts (dos per família)

**E01 — Longitud real.** 1) Escala 1:50, 4 cm al plànol → 200 cm = **2 m**. 2) Escala 1:25.000, 4 cm al mapa → 100.000 cm = **1 km**. Error: multiplicar per n però oblidar la unitat final.

**E02 — Longitud al dibuix.** 1) Paret real de 2 m a 1:100 → 200 cm / 100 = **2 cm** al plànol. 2) Peça de 2 cm ampliada 3:1 → 2·3 = **6 cm**. Error: confondre ampliació amb reducció.

**E03 — Factor i escala.** 1) 4 cm al plànol representen 2 m → 4:200 = **1:50**. 2) Un segment passa de 3 cm a 6 cm → factor de semblança **2**. Error: comparar centímetres amb metres sense convertir o invertir petit/gran.

**E04 — Correspondència en semblança.** 1) 2↔4 i 5↔10 → **2/4 = 5/10**. 2) 3↔9 i 6↔18 → **3/9 = 6/18**. Error: barrejar l'ordre gran/petit.

**E05 — Superfícies i escales.** 1) Rectangle 4×3 cm a 1:100 → 4×3 m reals, àrea **12 m²**. 2) Terrassa de 3×2 m a 1:100 → 3×2 cm al dibuix, àrea **6 cm²**. Error: multiplicar una àrea només pel factor lineal.

**E06 — Mesura indirecta per proporcionalitat.** 1) Persona 1,5 m amb ombra 1 m; arbre ombra 4 m → altura arbre **6 m**. 2) Triangles semblants: costat petit 3 i gran 9 (factor 3); segon costat petit 4 → gran **12**. Error: relacionar costats no corresponents.

**E07 — Perímetre a escala.** 1) Rectangle 4×3 cm a 1:100 → 4×3 m reals; perímetre 2·(4+3)=**14 m**. 2) Rectangle 6×5 cm a 1:50 → 3×2,5 m reals; perímetre **11 m**. Error: confondre perímetre i àrea.

**E08 — Ruta amb dos trams.** 1) Mapa 1:50.000, trams 2 cm + 3 cm → 5·50.000 = 250.000 cm = **2,5 km**. 2) Mapa 1:100.000, trams 1,5 cm + 2 cm → 350.000 cm = **3,5 km**. Error: multiplicar els trams entre si en lloc de sumar-los.

**E09 — Diagnòstic d'escales.** 1) «A escala 1:50, àrea real = àrea del plànol ×50» és **incorrecte**: per a àrees s'aplica 50². 2) «A escala 1:100, 5 cm al plànol són 5 m reals» és **correcte**: 5×100=500 cm=5 m. Error: confondre regles lineals i d'àrea.

## Comparació amb Unitats i conversions

- **Solapament instrumental, no necessàriament duplicitat de família:** E01/E02/E03/E08 reutilitzen les conversions lineals de U01 per passar cm→m/km, però la finalitat principal és **interpretar l'escala**. No eliminar E01 pel fet de contenir una conversió de metres.
- **Composició de procediments:** E07 i E08 combinen una escala amb una fórmula o una suma; cal decidir si representen una família genuïna de problema integrat o només una variant d'E01, segons la definició del protocol. Per ara resten candidates.
- **Semblança:** E04 i E06 podrien retrobar-se en altres sentits matemàtics; abans de donar-les per singulars dins el curs, contrastar-les amb els altres temes.
- **Errors:** U11 i E09 comparteixen el format de diagnòstic però no el coneixement matemàtic objectiu. Els distractors d'E09 són desiguals i no acrediten per si sols raonament N3.
- **N3:** cap tipus del tema `escales` està justificat com a N3 al mapa revisat; no se'n proposa cap per arribar a quotes.

## Observacions de qualitat i proves pendents

1. El tipus **11** ja proporciona `a/b = c/x`; la feina és resoldre una proporció coneguda. **N1 actual és defensable**: no classificar-lo N2 només perquè el context esmenta Tales.
2. El tipus **14** inclou variants correctes i incorrectes amb distractors fàcils. **N1 actual és defensable** i una futura millora hauria d'endurir la tasca abans de reclassificar-la.
3. El tipus **15** reconstrueix una escala i utilitza un reintent recursiu per evitar denominadors inadequats. Cal comprovar que no genera valors impossibles ni s'encalla en mostres.
4. El tipus **18** reintenta generar valors perquè l'ombra calculada tingui un decimal. Cal provar la finalització, la distribució de variants i la correcció aritmètica.
5. Comprovar els 18 tipus amb oracles independents, decimals/precisió, distractors únics i correcció guiada/autònoma; els tests del Sentit numèric **no validen** automàticament aquest tema de mesura.
6. Qualsevol possible revisió de classificació s'ha de fer en una **PR funcional separada**, després de la revisió humana. No modificar `families-validades.json` en aquesta PR.

**Validació real feta aquí:** inspecció de les 18 branques, cobertura de la matriu, comparació del mapa revisat i antic i exemples matemàtics resolts. **Validació no feta:** proves de navegador, oracles, revisió curricular normativa externa i aprovació pedagògica humana.
