# Especificacions pedagògiques prioritàries · 2n ESO, Sentit de la mesura

**Estat: tres propostes de disseny per a revisió docent; cap família genuïna ni nivell N3 validat.**

Fitxes estructurades: [MI_2ESO_mesura_tres_especificacions_pedagogiques.json](MI_2ESO_mesura_tres_especificacions_pedagogiques.json).

## Resum

| Tema | Decisió cognitiva que es vol contrastar | Diferència respecte als generadors actuals | Nivell |
| --- | --- | --- | --- |
| Escales | Validar si dos plànols descriuen un mateix rectangle, amb gir de 90° permès | `escales:6/7` calculen una única àrea; `escales:14` diagnostica un error concret | Hipòtesi N3, pendent |
| Perímetres | Identificar les vores exteriors d'una figura composta i excloure'n el costat compartit | `perimetres:8` inclou el diàmetre del semicercle aïllat; la unió de figures ja no | Hipòtesi N3, pendent |
| Estimació | Jutjar si lectures compleixen una tolerància externa | `estimacio:7/9` calculen/comparen precisió; la lectura més precisa pot ser inacceptable | Hipòtesi N3, pendent |

## Nou casos definits i verificats

**Escales:** plànols equivalents amb gir, plànols amb àrea idèntica però dimensions diferents, i plànols amb àrees incompatibles. La comprovació compara els dos costats reals (sense ordre si es permet gir), no només l'àrea.

**Perímetres:** contorn inferior, superior i **exactament igual** a un llindar estricte. L'oracle és `P = 2L + D + πD/2` per a un rectangle de llargada `L` i amplada `D` amb semicercle exterior de diàmetre `D`.

**Estimació:** una lectura admissible, igualtat exacta a la tolerància i cap lectura admissible. L'oracle compara `100 × |lectura - referència| / referència` amb el llindar inclusiu, sense arrodoniments prematurs.

Cada especificació inclou enunciats/contractes de dades, errors típics plausibles, fases de guia, oracles matemàtics i preguntes obertes sobre el nivell.

## Verificació

El validador `scripts/test-mesura-2eso-especificacions-pedagogiques.cjs` comprova la traçabilitat als tipus existents, les **nou variants** i els resultats matemàtics de cada cas, i imposa que totes continuïn sense aprovació de família ni N3.

**GitHub Actions #44051751641: success.**

## Decisions que continuen pendents

1. Si els tres procediments constitueixen famílies pedagògiques independents o variants de les existents, després de revisar **tot** l'inventari de 128 tipus.
2. Si la càrrega cognitiva és N2 o N3. Una tasca amb diversos passos no és automàticament N3.
3. Com garantir variació real, quatre distractors, oracles independents i comportament correcte en modes guiat, autònom i examen **en cas que s'aprovi la implementació**.

No s'han modificat generadors, el mapa de nivells, `families-validades.json`, la web publicada ni s'ha fusionat cap PR.
