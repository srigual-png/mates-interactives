# 3r ESO · Sentit numèric · Blocs 6 i 7

> Auditoria documental completa dels 34 tipus ordinaris. PR Draft, sense canvis de producció.

## Abast i contrast

- **Bloc 6 — Notació científica:** `notacio3r`, 18 tipus.
- **Bloc 7 — Proporcionalitat:** `proporcionalitat3r`, 16 tipus.
- Contrast amb els generadors actuals de `3eso/sentit-numeric.html`, la revisió `revisio-3eso-numeric-punt3.json`, els resultats `resultats-punt3-3eso-numeric.json` i el mapa actiu. Es deixen fora ampliacions de 4t ESO.
- El criteri curricular és ús i conversió de notació científica, comparació/operacions adequades i proporcionalitat directa/inversa, escales i repartiments. Els nivells reflecteixen procediment i nombre de decisions, no només la representació.

“Mateixa família” conserva el procediment i objectiu; “variant” altera dades/context sense canviar el nucli; “tasca diferent” demana una decisió o procediment diferent.

## Mapa complet tipus → família i nivell

| Tema | Tipus → família | Relació | Nivell | Justificació |
|---|---|---|---|---|
| Notació | 1 → N1 escriure enter positiu en notació científica | nucli | N1 | Desplaçar coma i comptar posicions |
| 2 → N1 | variant | N1 | Mateixa conversió per nombre petit i exponent negatiu |
| 15 → N1 | variant contextual | N1 | Dada decimal petita a forma científica |
| 3 → N2 decimal des de forma científica | tasca diferent | N1 | Desplaçar coma cap a la dreta |
| 4 → N2 | variant | N1 | Exponent negatiu |
| 5 → N3 reconèixer forma normalitzada | diferent | N1 | Coeficient entre 1 i 10 |
| 6 → N4 normalitzar coeficient no normalitzat | diferent | N1 | Reequilibrar coeficient i exponent |
| 7 → N5 comparar coeficients amb exponent igual | diferent | N1 | Comparar mantisses |
| 8 → N6 comparar ordres diferents | diferent | N1 | Interpretar exponents positius/negatius |
| 9 → N7 ordre de magnitud | diferent | N1 | Aplicar convenció del tema |
| 10 → N8 producte | diferent | N2 | Multiplicar coeficients i sumar exponents |
| 11 → N9 quocient | diferent | N2 | Dividir coeficients i restar exponents |
| 12 → N10 suma amb exponent igual | diferent | N1 | Sumar coeficients |
| 13 → N10 | variant | N1 | Restar coeficients |
| 14 → N11 suma amb exponents diferents | diferent | N2 | Reescriure un terme abans d’operar |
| 16 → N12 diferència d’ordres de magnitud | diferent | N1 | Restar exponents segons convenció |
| 17 → N13 notació de pantalla E a científica | diferent | N1 | Interpretar E com ×10^n |
| 18 → N13 | variant inversa | N1 | Científica a notació de pantalla |
| Proporcionalitat | 1 → P1 reconèixer directa en taula | nucli | N1 | Quocient y/x constant |
| 2 → P2 reconèixer inversa en taula | diferent | N1 | Producte x·y constant |
| 3 → P3 verificar si una relació és proporcional | diferent | N2 | Contrastar quocients/productes i rebutjar |
| 4 → P4 constant directa k | diferent | N1 | k=y/x |
| 5 → P5 càlcul directe en context | diferent | N2 | Trobar valor unitari i escalar |
| 6 → P6 càlcul invers treballadors/temps | diferent | N2 | Producte constant i nova incògnita |
| 7 → P7 classificar relació verbal | diferent | N1 | Interpretar sentit dels canvis |
| 8 → P8 repartiment proporcional | diferent | N2 | Sumar pesos i distribuir total |
| 9 → P9 escala | diferent | N1 | Aplicar raó i convertir unitats |
| 10 → P10 constant inversa | diferent | N1 | k=xy |
| 11 → P11 avaluar relació inversa | diferent | N1 | Substituir x en y=k/x |
| 12 → P12 classificar canvi per factors | diferent | N1 | Un factor es duplica i l’altre es redueix |
| 13 → P6 | variant contextual | N2 | Mateixa relació velocitat·temps constant |
| 14 → P13 extrapolar taula directa | diferent | N2 | Obtenir k i calcular nou valor |
| 15 → P14 detectar quota fixa no proporcional | diferent | N1 | Intercept no nul implica no directa |
| 16 → P15 classificar canvis homotètics | diferent | N1 | Mateix factor de canvi en ambdues magnituds |

### Observacions de classificació

A notació científica, comparar coeficients amb el mateix exponent (7) és procediment més simple que comparar ordres diferents (8), i sumar termes amb exponents diferents (14) exigeix reescriptura que les sumes amb exponent igual (12–13) no requereixen. En proporcionalitat, P6 i P13 comparteixen invariància del producte, però són variants contextuals del mateix procediment; P8 repartiment proporcional és una tasca diferent. El test de quota fixa (15) i factor de canvi (16) no són substituts del test de taula: avalien evidències diferents.

## Exemples resolts, errors i límits per família

### Notació científica

- **N1 Enter → científica (1,2,15).** 5.600.000=5,6·10⁶; 0,000000025=2,5·10⁻⁸. Error: comptar salts de coma una posició de més. Límit: zeros interns i signes.
- **N2 Científica → decimal (3,4).** 7,5·10⁵=750.000; 4,2·10⁻⁵=0,000042. Error: moure coma en sentit contrari. Límit: afegir zeros sense perdre valor.
- **N3 Forma normalitzada (5).** 9,1·10⁻³ és normalitzada; 91·10⁻⁴ no. 3,4·10² sí; 0,34·10³ no. Error: oblidar 1≤|a|<10. Límit: coeficient negatiu també pot estar normalitzat.
- **N4 Normalitzar (6).** 350·100=350·10²=3,5·10⁴; 850·10⁰=8,5·10². Error: canviar coeficient sense compensar exponent. Límit: un sol pas pot moure coma en ambdós sentits.
- **N5 Comparar mateix exponent (7).** 6,2·10⁵ > 5,4·10⁵; 4,1·10⁵ < 5,4·10⁵. Error: comparar exponent quan és igual. Límit: signes i coeficients negatius.
- **N6 Comparar exponents diferents (8).** 9,1·10⁴ < 1,1·10⁵; 7,2·10⁻⁶ < 1,6·10⁻⁵. Error: creure que −6 és més gran que −5 pel valor absolut. Límit: comparar exponent primer quan coeficients normalitzats positius.
- **N7 Ordre de magnitud (9).** Segons la convenció del bloc, 2,7·10⁷ → ordre 10⁷; 8,6·10⁻³ → 10⁻³. Error: donar coeficient en lloc de potència. Límit: la definició pot variar entre cursos; cal mantenir la convenció explícita.
- **N8 Producte (10).** (4·10⁻²)(4·10¹)=16·10⁻¹=1,6·10⁰; (2·10⁴)(2·10²)=4·10⁶. Error: multiplicar exponents. Límit: normalització posterior obligada quan coeficient queda fora d’[1,10).
- **N9 Quocient (11).** (9·10²)/(3·10¹)=3·10¹; (4·10⁵)/(2·10¹)=2·10⁴. Error: sumar exponents. Límit: divisor no nul.
- **N10 Suma/resta exponent igual (12,13).** 3,4·10⁵+3,1·10⁵=6,5·10⁵; 6,8·10⁻⁵−1,2·10⁻⁵=5,6·10⁻⁵. Error: sumar exponents. Límit: el coeficient resultant pot requerir normalitzar.
- **N11 Suma exponent diferent (14).** 2,1·10⁻⁵+1,2·10⁻⁶=2,1·10⁻⁵+0,12·10⁻⁵=2,22·10⁻⁵; 3,4·10²+2,5·10¹=3,4·10²+0,25·10²=3,65·10². Error: sumar mantisses directament. Límit: triar exponent comú i normalitzar.
- **N12 Diferència d’exponents (16).** 1,2·10⁻⁸ i 6,4·10⁻⁶ difereixen en |−8−(−6)|=2 ordres; 10⁷ i 10¹¹, 4 ordres. Error: ometre valor absolut/direcció. Límit: això compara ordres, no distància exacta entre nombres.
- **N13 Notació E (17,18).** 1,2E−6=1,2·10⁻⁶; 7,2·10⁴ es pot mostrar 7,2E4. Error: interpretar E com nombre d’Euler. Límit: la pantalla pot ometre signe + de l’exponent positiu.

### Proporcionalitat

- **P1 Directa en taula (1).** (1,4),(2,8): quocient 4 → directa; (1,5),(2,10): també. Error: mirar només que totes dues augmenten. Límit: quocient constant en tots els parells.
- **P2 Inversa en taula (2).** (3,24),(4,18): producte 72 → inversa; (6,12),(12,6): producte 72. Error: mirar quocient. Límit: cap x ni y zero en model invers.
- **P3 Test de proporcionalitat (3).** Taula (1,4),(2,6): quocients 4 i 3, no directa; productes 4 i 12, no inversa. (1,5),(2,10): directa per quocient 5. Error: comprovar només primer parell. Límit: totes les dades han d’encaixar.
- **P4 Constant directa (4).** (x,y)=(8,16): k=16/8=2; (3,39): k=13. Error: invertir x/y. Límit: x≠0.
- **P5 Context directe (5).** 3 kg costen 27 €, 1 kg=9 €, 16 kg=144 €; 7 kg costen 63 €, 9 kg costen 81 €. Error: regla de tres amb unitats inconsistents. Límit: preu unitari constant, sense tarifa fixa.
- **P6 Inversa aplicada (6,13).** 6 treballadors·18 dies=108 jornaler-dies; 4 treballadors necessiten 27 dies. Trajecte: 80·2=160 km; a 40 km/h dura 4 h. Error: aplicar proporcionalitat directa a temps i treballadors. Límit: mateix ritme/feina o distància constant.
- **P7 Classificar verbal (7).** Més màquines per comanda fixa → menys temps, relació inversa; més kg a preu unitari fix → més cost, directa. Error: confondre “augmenta/disminueix” amb prova suficient. Límit: l’enunciat ha de mantenir altres factors constants.
- **P8 Repartir en proporció (8).** 192 € en 3:4:5 suma 12 parts; primera=192·3/12=48 €. 70 € en 2:3:5, primera=14 €. Error: repartir el total en tres parts iguals. Límit: total de pesos no zero.
- **P9 Escala (9).** 1:50, 4 cm → 200 cm=2 m; 1:200, 3 cm → 600 cm=6 m. Error: multiplicar sense convertir unitats. Límit: distingir escala de reducció/ampliació i unitats.
- **P10 Constant inversa (10).** x=12,y=2 → k=xy=24; x=4,y=15 → k=60. Error: y/x. Límit: k positiu si magnituds positives.
- **P11 Avaluar inversa (11).** y=48/x, x=3 → 16; y=72/x, x=12 → 6. Error: multiplicar x·k. Límit: x≠0 i domini contextual.
- **P12 Canvi contrari (12).** x×2 i y÷2 és coherent amb inversa; x×4 i y÷4 també. Error: classificar directa perquè x canvia multiplicativament. Límit: una sola parella no prova el model complet, només compatibilitat.
- **P13 Extrapolar directa (14).** (5,60) → k=12; x=17 → y=204. (5,15),(9,27) → k=3; x=14 → 42. Error: regla additiva. Límit: dades coherents i x en domini.
- **P14 Quota fixa (15).** y=7+2x: amb x=0 costa 7 €, així no és directa; y=3+4x tampoc és directa. Error: confondre funció afí amb proporcionalitat. Límit: tarifa fixa nul·la és el cas especial directe.
- **P15 Canvi homotètic (16).** (2,2)→(10,10): factors 5 i 5, compatible amb directa; (5,3)→(15,9): factors 3 i 3, també. Error: confondre compatibilitat d’un canvi amb demostració de tota la relació. Límit: amb una única parella no s’estableix una constant global.

## Buits, nivells i solapaments

No s’identifica un buit curricular prou justificat per afegir famílies: la notació científica cobreix conversions, comparació, ordre de magnitud i les quatre operacions bàsiques amb normalització; proporcionalitat cobreix directa/inversa, taules, constants, contextos, escala i repartiment. No es dupliquen operacions de potències de bloc 5: aquí només s’utilitzen per expressar magnituds.

Nivells actius segons la revisió: notació científica 15 N1 / 3 N2 / 0 N3 (N2 tipus 10,11,14); proporcionalitat 10 N1 / 6 N2 / 0 N3 (N2 tipus 3,5,6,8,13,14). Les operacions amb potències científiques que requereixen normalització/suma de mantisses diferents i els problemes de proporcionalitat amb diverses decisions queden justificadament N2. No es força N3.

## Modes i evidència

- **Estàtica:** inspecció del codi dels generadors i la interfície: cada ítem retorna solució/guia i alternatives; la pàgina té pràctica guiada, autònoma, resposta oberta/múltiple i mode examen. Això no comprova visualment cada branca.
- **Simulació desada, no repetida:** 3.000 mostres per tema. Notació: cobertura N1/N2/N3 15/3/0, examen 6/6/0. Proporcionalitat: 10/6/0 i examen 6/6/0. Resultats heretats amb variants de cada tipus, no certificació exhaustiva de totes les cadenes de resposta.
- **Visual:** no consta revisió de tots els bancs, fórmules, opcions ni pantalles petites; no s’afirma validació visual.
- No s’han modificat codis, nivells actius ni registre de famílies; no es repeteixen proves ni workflows.

## Conclusió

El mapa de 34 tipus queda documentat. Es mantenen els nivells 15/3/0 i 10/6/0. No es proposen exercicis nous ni N3 artificials. PR #59 queda oberta i en Draft, sense fusió ni publicació.
