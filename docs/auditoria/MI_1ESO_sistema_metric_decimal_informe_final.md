# Informe final d’auditoria — Sistema Mètric Decimal · 1r d’ESO

## Abast i base

- **Base de treball:** `main` a `b46568a8a2242ffb45ac01221527208789c49e32` (merge de la PR #24).
- **Tema:** `metric`, Sentit de la mesura · 1r ESO.
- **Pàgina:** `1eso/sentit-mesura.html`.
- S’han llegit `AGENTS.md`, el protocol d’auditoria, el README del registre, el registre actual, el classificador, `raonament-mesura-1eso.js`, la teoria existent i proves/informes recents.
- No s’ha modificat la teoria, CSS, el nombre d’exercicis, els altres temes ni el registre de famílies validades.

## Inventari de generadors i variants

### Generador principal

`genMetricRaw()` exposa tres branques de codi:

| Tipus | Procediment i dades | Variants reals |
|---|---|---|
| 1 | Conversió de longitud amb km, hm, dam, m, dm, cm i mm; valor inicial enter entre 1 i 50. | 30 parelles ordenades, en ambdues direccions i de 1 a 6 posicions. |
| 2 | Conversió de massa amb t, kg, g i mg; valor inicial enter entre 1 i 40. | Parelles adjacents en ambdues direccions; factor 1000 per canvi. |
| 3 | Conversió de capacitat amb l, dl, cl i ml; valor inicial enter entre 1 i 50. | 12 parelles ordenades, en ambdues direccions i d’1 a 3 posicions. |

Les branques 1 i 3 comparteixen l’algorisme de canviar d’ordre en una escala decimal: cada posició multiplica o divideix per 10. Són variants de longitud/capacitat, no dues famílies. La massa es manté com a família pròpia perquè la seqüència implementada salta entre unitats amb factor 1000 a cada pas; no s’ha d’aplicar mecànicament la regla d’un sol zero per posició.

El generador conserva la coma decimal catalana, les unitats de la resposta, les pistes, la resolució i quatre opcions. Les conversions de petites a grans poden donar resultats decimals, com ara `7 mg = 0,007 g`.

### Rutes complementàries

`MIFirstMeasureTasks.extend()` intercala dues tasques pròpies del tema:

- `mesura-mixta` (tipus 1002, N2): sumar metres i centímetres, convertir una retirada en mil·límetres i restar-la en una unitat comuna.
- `talls-combinats` (tipus 1001, N3): minimitzar el nombre de barres quan hi ha diverses mides de tall i restriccions de compatibilitat.

El banc global de problemes també conté C01–C06 amb `primaryTopic: metric`, però la seva família de banc és «Conversions» o una operació en unitat comuna. Són elegibles en exàmens globals per la selecció del bloc; no es compten com famílies noves de Sistema Mètric Decimal. La futura auditoria de `conversions` ha de tractar C01–C06 com a rutes del banc de Conversions i no tornar-les a sumar com a famílies de `metric`.

## Famílies definitives

La classificació anterior no tenia famílies canòniques: el classificador inferia dificultat del nombre de salts, de manera que una conversió directa de tres o més posicions podia aparèixer com a N3. Les branques longitud, massa i capacitat eren identificadors de generador, no famílies justificades.

| Família | Generadors i variants | Nivell anterior | Nivell final | Justificació |
|---|---|---|---:|---|
| `escala-decimal-longitud-capacitat` · Canviar d’unitat en l’escala decimal de longitud o capacitat | Tipus 1 i 3; qualsevol direcció i nombre de posicions | Tipus 1/3: N1 amb un salt, N2 amb dos, N3 amb tres o més | **N1** | Una conversió directa aplica el factor 10 elevat al nombre de posicions. L’amplitud del salt canvia l’exponent, no crea reconstrucció ni raonament avançat. Es retira l’elevació mecànica a N3. |
| `equivalencies-massa-factor-1000` · Convertir entre les unitats de massa treballades | Tipus 2; t ↔ kg ↔ g ↔ mg | N1 | **N1** | Aplicació directa de l’equivalència 1000 per cada pas. La regla és diferent de la escala de longitud/capacitat, per això es conserva com a família diferenciada. |
| `mesura-mixta` · Operar amb una mesura composta i unitats diferents | Tasca contextual 1002 | N2 | **N2** | Cal expressar la longitud inicial i la retirada en la mateixa unitat, sumar la mesura composta i restar. |
| `talls-combinats` · Optimitzar la distribució de talls sota restriccions | Tasca contextual 1001 | N3 | **N3** | Cal reconstruir una distribució mínima, comprovar compatibilitats i justificar que no es pot usar una barra menys. |

**Recompte final: 4 famílies — 2 N1, 1 N2 i 1 N3.** No s’han creat famílies per acostar-se a una quota orientativa.

## Correspondència i canvis implementats

- Les variants tipus 1 i 3 comparteixen la família d’escala decimal; el nombre de posicions i la direcció són variants.
- El tipus 2 s’alinea amb la família d’equivalències de massa.
- Les tasques 1001 i 1002 porten identificador de família, nivell intern i nivell del classificador.
- El classificador compartit obté la cobertura de les famílies reals, no del nombre de tipus del generador.
- El filtre de dificultat manté la classificació del banc contextual C01–C06 i no els tracta com a conversions del generador principal.
- La rotació del generador principal evita repetir consecutivament una família real entre longitud/capacitat i massa.
- Es conserven els llindars generals de pràctica (8 encerts guiats i 15 autònoms), les rutes d’examen i la teoria actual.

## Exemples resolts

### Escala decimal de longitud i capacitat — N1

1. **Enunciat:** Converteix 3 km a m.  
   **Resolució:** km → hm → dam → m: tres posicions cap a unitats més petites; multipliquem per 10³.  
   **Resposta:** **3000 m**.

2. **Enunciat:** Converteix 25 cm a m.  
   **Resolució:** cm → dm → m: dues posicions cap a unitats més grans; dividim per 10².  
   **Resposta:** **0,25 m**.

3. **Enunciat:** Converteix 8 dl a l.  
   **Resolució:** dl → l: una posició cap a una unitat més gran; dividim per 10.  
   **Resposta:** **0,8 l**.

### Equivalències de massa — N1

1. **Enunciat:** Converteix 4 kg a g.  
   **Resolució:** kg → g és un pas de factor 1000; 4 × 1000.  
   **Resposta:** **4000 g**.

2. **Enunciat:** Converteix 3 g a mg.  
   **Resolució:** g → mg és un pas de factor 1000; 3 × 1000.  
   **Resposta:** **3000 mg**.

3. **Enunciat:** Converteix 7 mg a g.  
   **Resolució:** mg → g és un pas cap a unitat més gran; 7 ÷ 1000.  
   **Resposta:** **0,007 g**.

### Mesura mixta — N2

1. **Enunciat:** Una corda fa 4 m i 35 cm. Se’n gasten 500 mm. Quants centímetres en queden?  
   **Resolució:** 4 m = 400 cm; 500 mm = 50 cm; 400 + 35 − 50.  
   **Resposta:** **385 cm**.

2. **Enunciat:** Una corda fa 2 m i 90 cm. Se’n gasten 300 mm. Quants centímetres en queden?  
   **Resolució:** 2 m = 200 cm; 300 mm = 30 cm; 200 + 90 − 30.  
   **Resposta:** **260 cm**.

3. **Enunciat:** Una corda fa 6 m i 20 cm. Se’n gasten 900 mm. Quants centímetres en queden?  
   **Resolució:** 6 m = 600 cm; 900 mm = 90 cm; 600 + 20 − 90.  
   **Resposta:** **530 cm**.

### Talls combinats — N3

1. **Enunciat:** Barres d’1 m; calen 2 peces de 60 cm, 2 de 550 mm i 3 de 45 cm. Nombre mínim de barres?  
   **Resolució:** les peces de 60 cm van separades. Cada peça de 55 cm pot compartir barra amb una de 45 cm; sobra una peça de 45 cm. Mínim: 2 + 2 + 1.  
   **Resposta:** **5 barres**.

2. **Enunciat:** Barres de 2 m; calen 3 peces de 120 cm, 2 de 1100 mm i 3 de 90 cm.  
   **Resolució:** 1100 mm = 110 cm. Cap peça de 120 cm no comparteix barra amb una altra peça. Per a la resta, la suma total és 2×110 + 3×90 = 490 cm; dues barres de 200 cm no cobreixen 490 cm, així que en calen almenys 3. Es pot fer 2 parelles 110+90 i deixar una peça de 90 en una tercera barra.  
   **Resposta:** **6 barres** (3 peces de 120 cm separades i 3 barres per a les altres peces).

3. **Enunciat:** Barres de 3 m; calen 4 peces de 180 cm, 3 de 1650 mm i 4 de 135 cm.  
   **Resolució:** 1650 mm = 165 cm; cada peça de 180 cm necessita barra pròpia. Les altres peces sumen 3×165 + 4×135 = 1035 cm, que exigeixen almenys 4 barres de 300 cm; s’hi encaixen 3 parelles 165+135 i una peça de 135 cm.  
   **Resposta:** **8 barres**.

## Errors freqüents

- Multiplicar quan es passa a una unitat més gran, o dividir quan es passa a una de més petita.
- Moure la coma un sol lloc encara que hi hagi diversos passos de longitud/capacitat.
- Fer servir un factor 10 per a la massa, en lloc de 1000 per cada pas de la seqüència treballada.
- Escriure el valor correcte amb una unitat incorrecta.
- Sumar o restar metres, centímetres i mil·límetres sense expressar-los abans amb una unitat comuna.
- En els talls, minimitzar només amb la longitud total i ignorar que alguns trossos no caben junts.

## Proves i limitacions

S’han afegit dues proves: una de famílies amb oracles aritmètics independents i una d’integració amb Playwright.

**Resultats executats:**

- `node --check` dels dos scripts: 2/2 correctes.
- `comprova-metric-families-1eso.cjs`: superada; 1.250 mostres (250 per cadascuna de 3 rutes principals i 2 complementàries), factors independents 10/1000, unitats, resultats decimals, opcions, nivell intern/classificador, mesura mixta, mínim de talls i cobertura 2/1/1.
- `comprova-metric-1eso.cjs`: superada amb **Chrome**; 120 generacions comprovades, sense repeticions familiars consecutives, totes les 4 famílies presents, pràctica guiada/autònoma, examen del tema de 12 preguntes, examen global de 20, 20 mostres de cadascun dels cinc temes veïns, teoria amb enllaç directe i `hashchange`, i viewport mòbil de 390 px.
- No s’han observat errors JavaScript de pàgina ni desbordament horitzontal al viewport validat.

**Limitació:** la prova del navegador es va executar amb Chrome, no amb Edge. No s’ha comprovat el desplegament de GitHub Pages; aquesta PR no es fusiona.

## Ordres de validació local (CMD)

```cmd
node --check scripts\comprova-metric-families-1eso.cjs
node scripts\comprova-metric-families-1eso.cjs
node --check scripts\comprova-metric-1eso.cjs
node scripts\comprova-metric-1eso.cjs
```

## Fitxers previstos

- `1eso/sentit-mesura.html`
- `assets/js/dificultat-mi.js`
- `assets/js/raonament-mesura-1eso.js`
- `scripts/comprova-metric-families-1eso.cjs`
- `scripts/comprova-metric-1eso.cjs`
- Aquest informe.
