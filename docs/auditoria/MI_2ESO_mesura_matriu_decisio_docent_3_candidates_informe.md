# Matriu de decisió docent · Tres candidates de Mesura, 2n ESO

**Estat: document de revisió, sense cap aprovació pedagògica, tècnica ni publicació.** Fitxa estructurada: [MI_2ESO_mesura_matriu_decisio_docent_3_candidates.json](MI_2ESO_mesura_matriu_decisio_docent_3_candidates.json).

## Cinc criteris de decisió

**C1 · Nucli matemàtic diferencial.** La nova tasca exigeix una decisió o representació no necessària als tipus existents més propers.

**C2 · Independència no cosmètica.** No és només canviar el context, els nombres o encadenar subprocediments ja coneguts.

**C3 · Variació contrastada.** Dos casos genuïnament diferenciats mantenen l'estratègia, amb un contraexemple o situació enganyosa.

**C4 · Currículum i dificultat.** Un docent ha de validar l'objectiu de 2n ESO i justificar un nivell N1/N2/N3 amb demanda cognitiva observable.

**C5 · Límits amb famílies actuals.** Cal confrontar explícitament els tipus més pròxims, els contraexemples i el motiu per separar-los o agrupar-los.

## Matriu provisional

| Proposta | Estat del primer filtre | Criteri diferenciador | Hipòtesi de pilot |
|---|---|---|---|
| Escales | Candidata a família per revisar | Dos plànols poden tenir la mateixa àrea però representar rectangles diferents; un gir pot preservar equivalència | N2 |
| Perímetres | Candidata a família per revisar | Un costat compartit esdevé interior; en un semicercle aïllat, el diàmetre forma part del perímetre | N2 |
| Estimació | **Probable variant** | Les toleràncies percentuals externes i els intervals d'arrodoniment difereixen en el càlcul, però comparteixen acceptació per cotes | N2 |

**Cap hipòtesi N2 està homologada.** Qualsevol proposta N3 requeriria demostrar modelització o justificació no rutinària, no només una quantitat major de passos.

## Sis demostracions documentals

- **Escales:** plànols compatibles malgrat el gir; dos plànols amb àrea igual de 12 m² però geometries diferents (4×3 m contra 6×2 m).
- **Perímetres:** rectangle 6×4 m amb semicercle exterior de diàmetre 4 m: perímetre 22,28 m. El mateix semicercle aïllat: 10,28 m, ja que s'hi suma el diàmetre.
- **Estimació:** lectures de 99 i 98 cm davant referència 100 cm i tolerància 0,5%: cap lectura admissible. En el codi d'arrodoniment, 12,35 cm queda fora de l'interval [12,25,12,35) associat a 12,3 cm, mentre una tolerància percentual inclusiva de l'1% l'accepta.

Són **exemples de raonament**, no proves amb alumnat ni exercicis implementats. No se'n deriven famílies noves automàticament.

## Porta d'aprovació

Per a cada candidata, el docent ha de decidir explícitament entre **família nova**, **variant**, **pràctica composta** o **rebuig**. Només si es considera una família diferenciada caldrà concretar la diversitat de generació i validar amb exercicis reals, distractors, oracles, i modes guiat/autònom/examen. La fusió de PR i la publicació són decisions separades.

**Verificació:** `scripts/test-mesura-2eso-matriu-decisio-docent.cjs` comprova els cinc criteris, les sis demostracions, els vincles a l'inventari de 128 tipus i que no hi ha aprovacions fictícies. **GitHub Actions #44054809917: success.**

Sense modificacions als generadors, el mapa de dificultat, `families-validades.json`, la web ni les PR fusionades.
