# Revisió del codi dels 24 casos prioritaris · 2n ESO, Sentit de la mesura

**Estat: auditoria del codi, sense reparacions ni reclassificacions funcionals.** Fitxa completa per tipus: [MI_2ESO_mesura_24_prioritats_revisio_codi.json](MI_2ESO_mesura_24_prioritats_revisio_codi.json).

## Resultat principal

S'han revisat les branques de **24 dels 128 generadors**, concretament els casos que la primera passada curricular havia marcat com a prioritaris. Per cada tipus s'han consultat l'enunciat, el càlcul de la resposta, les alternatives, les guies i la solució. **No** s'ha fet una prova de generació exhaustiva de totes les instàncies.

### Problema de resposta única confirmat

**`estimacio:11`** demana una expressió amb precisió i unitat raonables, però té més d'una opció defensable sense indicar l'instrument o la tolerància. Per a una ampolla, **1,5 L** i **1,51 L** poden ser igualment raonables segons com s'hagi mesurat. Per al gruix d'una moneda, **1,8 mm** i **1,81 mm** poden ser defensables si el dispositiu té prou precisió. El codi en designa només una com a correcta. **Cal modificar els exemples o afegir informació sobre la precisió instrumental abans de considerar el test inequívoc.**

### Precisió o convencions a aclarir

- **`estimacio:12`**: interval d'arrodoniment semiobert, amb extrem inferior inclòs i superior exclòs. És una convenció coherent, però cal deixar clar com es tracten els casos de frontera.
- **`estimacio:15`**: mitjana de tres mesures a dècimes presentada amb centèsimes. El càlcul és correcte com a mitjana aritmètica arrodonida, però cal diferenciar els decimals del càlcul de la precisió real de l'instrument.

### Nivell a revisar, no error de càlcul

- **`unitats:6/18`**, **`pitagores:15`** i **`superficies:17`**: variants directes, encadenades o de geometria diferent que no s'han de classificar automàticament al mateix nivell.
- **`escales:11`**: la proporció ja s'ofereix plantejada; N1 pot ser justificable.
- **`superficies:14/20`**: l'equivalència directa dm³=L i el reconeixement de parelles de cares podrien ser N1.
- **`problemes:16`**: amb una referència comuna, comparar errors relatius equival a comparar distàncies absolutes a la referència.
- **`pitagores:5`** i **`perimetres:13`**: valorar si la representació i el despejament requereixen autonomia real.

### Qualitat i contextualització

- **`unitats:13/17`** i **`escales:14`**: caldria millorar distractors perquè algunes respostes incorrectes són massa poc plausibles.
- **`perimetres:15`**: la fórmula trigonomètrica s'usa **internament** per preparar l'apotema, però l'exercici dona l'apotema calculada: no es demana trigonometria a l'alumnat.
- **`problemes:2`**: rajoles amb ajust exacte; no cal introduir retalls sense un objectiu curricular concret.
- **`problemes:3/14/19`**: problemes compostos de capacitat i percentatge, tanca i cost, o precipitació; adequats com a contextos, sense crear famílies automàticament.
- **`pitagores:9`**: verificar conjunt complet de triples i condició de triangle en una prova sistemàtica posterior.

## Prioritats de treball proposades

1. **Corregir l'ambigüitat confirmada de `estimacio:11`**, quan s'autoritzi modificar el generador.
2. **Aclarir convenció i precisió** de `estimacio:12` i `estimacio:15`.
3. **Provar sistemàticament els oracles** i els casos límit dels generadors revisats.
4. **Valorar els nivells per variant**, no per quantitat de passos.
5. **Continuar amb els 104 tipus restants** quan es tanquin aquests punts.

Aquests canvis **no** s'han implementat; tampoc no s'ha certificat cap família N3. La distribució antiga 5–5–3 no condiciona les recomanacions.

La verificació automàtica `scripts/test-mesura-2eso-prioritats-24-codi.cjs` comprova la traçabilitat de les 24 branques i confirma que les dues alternatives raonables de `estimacio:11` són presents en el codi.

**No s'ha fusionat la PR #49 ni publicat la web.**
