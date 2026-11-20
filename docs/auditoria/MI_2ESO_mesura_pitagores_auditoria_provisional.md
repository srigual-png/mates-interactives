# Auditoria Fase A · Teorema de Pitàgores (2n ESO)

**ESTAT: PROVISIONAL — PENDENT DE REVISIÓ PEDAGÒGICA. NO IMPLEMENTAT.**

## Fonts i abast

Codi real: `2eso/sentit-mesura.html:1192–1304` (funció `genPitagores2ESO`, 16 tipus), selecció de triples `PYTH_TRIPLES` i rotació `nextPythType` (línies anteriors), `TOPICS` (línia 2322). Classificador: `assets/js/dificultat-mi.js`, mapes `REVIEWED_LEVELS['2eso/mesura'].pitagores` i `REVIEWED_VARIANTS['2eso/mesura'].pitagores` (línies 9 i 11); ruta `classify` i detecció de variants (línies 744–795). Revisió **estàtica**, no una prova real de navegador.

### Nivells efectius

- **N1 per defecte: 7 tipus:** 1, 2, 3, 5, 9, 15, 16.
- **N2 per defecte: 9 tipus:** 4, 6, 7, 8, 10, 11, 12, 13, 14.
- **N3: 0 tipus.**
- **Excepció verificada:** `type=15` conté dues branques: `diagonal` → **N2** mitjançant `difficultyVariant:'diagonal'`; `catet` → **N1**. La detecció de `difficultyVariant` per `question.includes('diagonal')` dins el generador coincideix amb el text de la branca de diagonal. El classificador consulta `REVIEWED_VARIANTS` abans de retornar el nivell revisat general. Per això el recompte **7/9/0 és per tipus base, no per totes les variants generades**.

El mapa antic del mètode `level()` atribueix grups diferents; no és el mapa efectiu de la pràctica ordinària quan preval `REVIEWED_LEVELS`.

## Proposta de famílies matemàtiques (màxim 9 candidates)

| Família candidata | Procediment real | Tipus i variants | Actual | Nivell proposat (provisional) |
|---|---|---|---|---|
| P01 | Identificar hipotenusa oposada a l'angle recte | 1 | N1 | **N1**: reconeixement directe |
| P02 | Calcular una hipotenusa amb Pitàgores, directe o modelitzant una diagonal, cable, rampa o escala | 2,4,5,6,7,8,13,15-diagonal | 2 N1; 4/6/7/8/13 N2; 5 N1; 15-diagonal N2 | **N1 quan el triangle és explícit (2); N2 quan cal reconèixer-lo en el context (4/6/7/8/13/15-diagonal)**. Cas especial: **5** és diagonal d'un quadrat amb arrodoniment i està a N1; revisió pendent perquè també cal modelitzar |
| P03 | Trobar un catet a partir d'hipotenusa i un altre catet | 3,15-catet | N1 | **N1**: aplicació inversa directa |
| P04 | Verificar si un triangle és rectangle comparant quadrats | 9 | N1 | **N1**: comprovació directa; la pregunta no demana justificar l'error |
| P05 | Trobar àrea d'un triangle isòsceles calculant abans l'altura | 10 | N2 | **N2**: mig costat, Pitàgores invers i fórmula de l'àrea |
| P06 | Trobar perímetre d'un rectangle a partir de la diagonal i un costat | 11 | N2 | **N2**: catet desconegut i perímetre |
| P07 | Calcular l'estalvi comparant recorregut pels catets i diagonal | 12 | N2 | **N2**: hipotenusa i diferència entre dos recorreguts |
| P08 | Calcular longitud de cable incloent marges d'ancoratge | 14 | N2 | **N2**: hipotenusa i longitud addicional |
| P09 | Diagnosticar confusió entre suma de catets i Pitàgores | 16 | N1 | **N1** de moment: els distractors fan que el diagnòstic sigui molt directe |

**Criteri de genuïnitat:** P02 agrupava set tipus de context que comparteixen fórmula i objectiu, no set famílies matemàtiques. P05–P08 són *candidates de problema compost* perquè calen procediments o decisions addicionals, però es podrien acabar reunint en menys famílies si el procediment essencial no canvia. **«Fins a 9» no és un recompte validat.** L'eventual coexistència de P02 N1/N2 requereix identitats de variant o famílies diferenciades abans d'incorporar-la al registre definitiu.

### Dos exemples matemàtics resolts per família

Són exemples **construïts i aritmèticament comprovats a partir dels procediments existents**; no són registres d'execució aleatòria.

**P01 — Hipotenusa (N1).**
1. En un triangle rectangle, si el costat AC és oposat a l'angle de 90°, **AC és la hipotenusa**.
2. Si el costat BC és oposat a l'angle recte, **BC és la hipotenusa**.
Error: pensar que sempre és un costat amb una lletra concreta. Font: :1195–1201.

**P02 — Hipotenusa directa o contextual (N1/N2).**
1. Catets 3 cm i 4 cm → √(3²+4²) = √25 = **5 cm** (tipus 2).
2. Rampa d'altura 5 m i base horitzontal 12 m → √(5²+12²)=√169=**13 m** (tipus 8).
Error: sumar els catets sense elevar-los al quadrat o no identificar la diagonal contextual. Fonts: :1202–1208, :1240–1245.

**P03 — Catet desconegut (N1).**
1. Hipotenusa 13 cm i catet 5 cm → √(13²−5²)=√144=**12 cm**.
2. Hipotenusa 10 cm i catet 6 cm → √(10²−6²)=√64=**8 cm**.
Error: sumar els quadrats en lloc de restar-los. Fonts: :1209–1215, :1287–1300.

**P04 — Reconeixement de triangle rectangle (N1).**
1. Costats 3, 4, 5 → 3²+4²=25=5² → **sí, rectangle**.
2. Costats 3, 4, 6 → 3²+4²=25, però 6²=36 → **no és rectangle**.
Error: acceptar qualsevol triangle de tres costats com a rectangle sense comprovar quadrats. Font: :1246–1252.

**P05 — Àrea d'isòsceles (N2).**
1. Base 10 cm, laterals 13 cm → mitja base 5, altura √(13²−5²)=12 → àrea 10·12/2=**60 cm²**.
2. Base 12 cm, laterals 10 cm → altura √(10²−6²)=8 → àrea 12·8/2=**48 cm²**.
Error: fer servir el costat oblic com si fos l'altura. Font: :1253–1259.

**P06 — Perímetre amb diagonal (N2).**
1. Diagonal 13 cm i costat 5 cm → altre costat 12 cm → P=2(5+12)=**34 cm**.
2. Diagonal 10 cm i costat 6 cm → altre costat 8 cm → P=2(6+8)=**28 cm**.
Error: calcular només el catet i oblidar que es demana perímetre. Font: :1260–1266.

**P07 — Estalvi de recorregut (N2).**
1. Recorreguts perpendiculars 3 i 4 m → diagonal 5 m → estalvi 3+4−5=**2 m**.
2. Recorreguts 6 i 8 m → diagonal 10 m → estalvi 6+8−10=**4 m**.
Error: donar la diagonal com a resposta en lloc de l'estalvi. Font: :1267–1273.

**P08 — Cable amb marge (N2).**
1. Separació 3 m i altura 4 m, marge 2 m → cable 5+2=**7 m**.
2. Separació 5 m i altura 12 m, marge 1 m → cable 13+1=**14 m**.
Error: oblidar l'excés per ancoratges. Font: :1280–1286.

**P09 — Diagnosi d'error (N1).**
1. «Catets 3 i 4, hipotenusa 3+4=7» → **error: sumar longituds**; correcta √(9+16)=**5**.
2. «Catets 5 i 12, hipotenusa 17» → **error: sumar longituds**; correcta √(25+144)=**13**.
Error: confondre un diagnòstic elemental amb un problema de reconstrucció N3. Font: :1294–1301.

## Variants, incoherències i qualitat

1. **Tipus 15, 2 variants matemàtiques:** la branca diagonal (N2) correspon a la família P02 mentre la branca catet (N1) correspon a P03. No comptar tot el tipus 15 en una sola família. El generador ja aporta `difficultyVariant:'diagonal'` quan pertoca i el mapa revisat té la seva excepció.
2. **Tipus 5, cas discutible:** «diagonal d'un quadrat» requereix reconèixer Pitàgores i arrodonir, però ara és N1. Pot ser N1 per l'expressió memoritzada `d=c√2` o N2 si s'exigeix la construcció geomètrica. **No elevar sense validar la tasca real**.
3. **Tipus 4 i 13:** habitació i pantalla són la mateixa operació de diagonal de rectangle (només canvia context i unitat); no duplicar famílies.
4. **Tipus 6, 7, 8:** escala, cable i rampa són tots hipotenusa en triangle implícit. No són tres famílies independents només per context.
5. **Tipus 9:** el generador tria un triple o altera la hipotenusa amb `c+1`; comprovar en les proves la coherència amb la desigualtat triangular i la diagnosi `a²+b²=c²`.
6. **Tipus 16:** pregunta explícita de diagnòstic, però distractors molt dèbils; no justificar N3.
7. **Solapament amb altres temes:** P05 comparteix càlcul d'àrea amb `perimetres`; P06, perímetre amb `perimetres`; P02 i P07, longituds amb `escales` només si s'afegeix semblança. Cal distingir **coneixement utilitzat** de **família de procediment** abans del recompte global de 2n ESO.
8. No es crea cap família N3 fictícia per satisfer quotes.

## Proves i passos de tancament

**Verificat:** lectura de 16 branques, correspondència amb el mapa efectiu i excepció del tipus 15, exemples manualment resolts i cobertura dels tipus 1–16.

**No verificat:** oracle independent en execució, rotació real de generadors, mostreig de variants, prova UI guiada/autònoma, fitxes, exàmens i conformitat normativa curricular externa. Els workflows verds de regressió de *Sentit numèric* no substitueixen les proves de mesura.

**Abans d'editar nivells:** valorar el tipus 5 i el grau de raonament de les famílies compostes; aprovar variants i executar proves de tots els tipus. Qualsevol canvi funcional s'ha de fer en una PR separada i només llavors actualitzar el registre oficial de famílies validades. Aquesta PR és exclusivament d'auditoria.
