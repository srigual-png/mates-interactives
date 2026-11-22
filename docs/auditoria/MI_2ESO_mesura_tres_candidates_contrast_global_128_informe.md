# Contrast global de les tres candidates contra els 128 tipus · Mesura de 2n ESO

**Estat:** cribratge de procediments documentats; no certifica noves famílies ni nivells.

## Abast exacte

S'han repassat els **128 registres descriptius** dels set informes per tema i s'han anotat **384 comparacions** (cada tipus confrontat amb cadascuna de les tres candidates: Escales, Perímetres i Estimació). La matriu completa es troba a [MI_2ESO_mesura_tres_candidates_contrast_global_128.json](MI_2ESO_mesura_tres_candidates_contrast_global_128.json).

| Candidata | Coincidència directa per revisar | Components compartits | Context relacionat | Cap coincidència identificada en el resum |
|---|---:|---:|---:|---:|
| Escales: dos plànols | 3 | 16 | 3 | 106 |
| Perímetres: vora externa | 2 | 11 | 3 | 112 |
| Estimació: tolerància | 5 | 8 | 4 | 111 |

**Com interpretar la taula:** els registres «sense coincidència identificada» no són proves de novetat. Volen dir que la descripció resumida del tipus no apunta al procediment candidat. La revisió del **codi executable** s'ha concentrat en les coincidències directes i no s'han inspeccionat exhaustivament les implementacions de tots els 128 tipus.

## Diferències que es poden sotmetre a prova

**Escales**: el codi actual calcula àrees a escala (`escales:6/7`) o demana diagnosticar un error (`escales:14`). El disseny nou compara les **dues parelles de dimensions reals** de dos plànols. Prova discriminadora: 4×3 m i 6×2 m tenen **igual àrea (12 m²)** però no representen un mateix rectangle; un gir de 90° sí que pot conservar-lo.

**Perímetres**: el semicercle aïllat (`perimetres:8`) inclou el seu diàmetre en el perímetre; el rectangle amb semicercle (`perimetres:10`) existeix, però pregunta per l'**àrea**, no pel perímetre de la unió. El candidat exigeix detectar que el costat compartit esdevé **interior** i no comptar-lo dues vegades.

**Estimació**: el codi actual calcula errors relatius (`estimacio:7/8/13`) i compara la precisió de dues mesures (`estimacio:9` i `problemes:16`). La candidata contrasta cada error amb una **tolerància externa inclusiva**. Prova discriminadora: amb una tolerància del 0,5% i mesures amb errors de l'1% i el 2%, la primera és més precisa però **cap** és acceptable.

## Prova de varietat: què s'ha comprovat

Les especificacions documentals aporten **nou casos** (tres per candidata) amb respostes de signe o estat diferents:

- Escales: plànols equivalents girats; plànols de mateixa àrea però no equivalents; plànols diferents.
- Perímetres: contorn inferior, superior i exactament igual a un llindar estricte.
- Estimació: una lectura admissible, acceptació en el llindar exacte i cap lectura admissible.

Aquesta varietat evidencia que es poden dissenyar **decisions matemàtiques contrastades**, però **no** demostra que la família sigui genuïna ni que el nivell sigui N3.

## Portes de revisió pendents

1. Fer una lectura de codi **més profunda** de qualsevol coincidència funcional indirecta que es detecti abans d'acreditar una família com a nova.
2. Decidir amb criteri docent si «validar dos plànols», «identificar vora exterior» i «acceptar amb tolerància» són estratègies prou independents dels nuclis existents o variants compostes.
3. Revisar si el nivell correspon a **N2 o N3**, especialment en els casos simples que es resolen amb procediment conegut més una comparació.
4. Si s'autoritza crear nous exercicis, concretar procediments, distractors plausibles, generació variada, oracles independents i proves en els modes guiat/autònom/examen.

No s'ha alterat `families-validades.json`, el mapa de dificultats, cap generador ni el web, i no s'ha fusionat cap PR.
