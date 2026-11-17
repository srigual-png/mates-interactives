# Consolidació provisional de famílies · Problemes de mesura (20/20)

**Fase B documental, NO validació pedagògica.** Matriu editable en [`MI_2ESO_mesura_problemes_decisions_20_tipus.json`](MI_2ESO_mesura_problemes_decisions_20_tipus.json). Cada tipus té exactament una decisió de treball. Aquestes decisions **no** equivalen a un nombre de famílies genuïnes ni justifiquen cap increment artificial de N3.

## Resultat de la primera consolidació

| Decisió provisional | Tipus | Interpretació |
|---|---|---|
| **Nucli compartit** | 4, 6, 7, 8, 9, 10, 12, 17, 18, 20 | Mateixa operació essencial que un altre tema, sense comptar el context com una família nova |
| **Variant contextual que cal contrastar** | 5, 11, 13, 15, 16 | Pot afegir una decisió, un model o una simplificació que canvia la dificultat, sense implicar necessàriament família diferent |
| **Procediment compost candidat** | 1, 2, 3, 14 | Combina passos amb una decisió no present a la fórmula simple: verificar autonomia i transferència |
| **Identitat per revisar** | 19 | Cal justificar si l'equivalència de precipitació donada ja es cobreix amb conversions i proporcionalitat |

**Recompte:** 10 + 5 + 4 + 1 = **20 tipus, tots coberts**. Els grups antics **PM13** (tipus 16/17) i **PM14** (18/19/20) es desagreguen explícitament, perquè agrupaven procediments diferents. Les agrupacions **PM06** i **PM07** es conserven només com a codis històrics d'informe, però els seus tipus apunten a altres temes diferents.

## Exemples contrastius per als compostos

Aquests exemples són **construïts i resolts segons el procediment del generador**, no instàncies observades a la UI. S'han de contrastar amb generació real abans de declarar una família.

| Tipus | Exemple 1 | Exemple 2 | Decisió matemàtica afegida |
|---|---|---|---|
| 1 — pintura | Paret 6×3 m, porta 1×2 m i finestra 1,5×1,2 m; 8 m²/pot. Àrea útil 14,2 m²; 14,2/8=1,775 → **2 pots** | Mateixa paret i obertures; 5 m²/pot → 14,2/5=2,84 → **3 pots** | Comprar pots enters obliga a arrodonir **per excés**, no a l'enter més proper |
| 2 — rajoles | Terra 4×3 m, rajoles 50×50 cm: 8×6 = **48 rajoles** | Terra 6×4 m i rajoles 50×50 cm: 12×8 = **96 rajoles** | Convertir dimensions, comptar files i columnes; banc actual sense retalls |
| 3 — dipòsit | 80×50×40 cm = 160 L; 75% → **120 L** | 100×40×50 cm = 200 L; 60% → **120 L** | Primer capacitat total, després part percentual; dos casos poden coincidir en resposta tot i dades diferents |
| 14 — tanca | 20×12 m, porta 3 m; 15 €/m → (64−3)×15 = **915 €** | 18×10 m, porta 2 m; 12 €/m → (56−2)×12 = **648 €** | Diferenciar perímetre, buit sense tanca i cost final |

Els exemples estan pensats per raonar la **diferència de procediment**, no per crear quatre famílies de N3. Si finalment només canvia l'escenari, s'han de fusionar.

## Nuclis compartits que ja tenen prova matemàtica transversal a la PR #53

- **Pitàgores:** `problemes:6` ↔ `pitagores:13` (diagonal); `problemes:7` ↔ `pitagores:6` (escala).
- **Escales:** `problemes:8` ↔ `escales:2` i `problemes:9` ↔ `escales:4`; ombres `problemes:10` ↔ `escales:8`.
- **Superfície circular i cilíndrica:** `problemes:12` ↔ `perimetres:17`; `problemes:4` ↔ `superficies:7`; lateral `problemes:5` ↔ `superficies:8`.
- **Unitats i error:** `problemes:18` ↔ `unitats:2` (canvi de superfície); `problemes:16` ↔ `estimacio:9` (però el primer comparteix referència, una simplificació real).
- **Altres casos compartits proposats que encara no tenen aquesta prova transversal específica:** `problemes:17` ↔ `estimacio:1`; `problemes:20` ↔ `superficies:12`.

Que es comprovi la correcció d'algunes instàncies **no implica** que s'hagi demostrat equivalència pedagògica, cobertura exhaustiva ni correcte nivell de dificultat.

## Dues variants que no cal fusionar cegament

1. **`problemes:13`:** capsa sense tapa. El càlcul és base + quatre laterals, diferent de sumar sis cares d'una capsa tancada. La decisió sobre família pròpia depèn de si l'alumne ha de reconstruir la xarxa de cares.
2. **`problemes:16`:** compara errors relatius d'A i B respecte d'un **mateix** valor de referència. A diferència d'`estimacio:9`, on hi ha dues referències, es pot decidir comparant errors absoluts sense dos quocients. No elevar N1→N2 només perquè els títols siguin iguals.

La variant `problemes:5` parteix del **diàmetre** i demana identificar la cobertura lateral d'una etiqueta, mentre `superficies:8` dona el **radi**: examinar si és una transferència N2 o una aplicació directa N1 abans de canviar el mapa.

## Proves i decisions pendents

- **Fet:** desagregació 20/20, enllaç a candidats d'altres temes, exemples contrastius i test estructural `node scripts/test-mesura-2eso-decisions-problemes.cjs`.
- **Pendent:** almenys dos casos **generats realment** per cada procediment consolidat, amb solució pas a pas; oracles específics dels compostos, revisió del docent, currículum, modes guiat/autònom, examen i fitxes.
- **Prohibit concloure ara:** que hi ha exactament 10 famílies compartides, 4 noves, que s'assoleix la quota de 15, que apareix algun N3, o que aquestes classificacions ja són definitives.

No es canvien `2eso/sentit-mesura.html`, `assets/js/dificultat-mi.js` ni `docs/auditoria/families-validades.json`. Les reparacions funcionals són a la PR #53 i la consolidació provisional, aquí a la PR #49.
