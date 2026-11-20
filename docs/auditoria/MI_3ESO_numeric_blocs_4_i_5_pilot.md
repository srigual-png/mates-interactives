# 3r ESO · Sentit numèric · Blocs 4 i 5

> Dictamen documental complet dels 28 tipus ordinaris. PR #58 oberta i en Draft; cap fusió ni publicació.

## Abast i referent curricular

- Bloc 4 · Aproximacions: `aproximacions3r`, 12 tipus.
- Bloc 5 · Potències: `potencies3r`, 16 tipus.
- Contrast dels generadors actuals amb `revisio-3eso-numeric-punt3.json`, `resultats-punt3-3eso-numeric.json` i el mapa actiu. S’exclouen ampliacions de 4t.
- XTEC situa en aquests cursos aproximació, error/precisió, potències d’exponent enter i propietats de les potències. L’exigència de dificultat s’avalua pel procediment matemàtic, no pel format visual.

“Mateixa família” conserva procediment i objectiu; “variant” canvia dades o representació; “tasca diferent” exigeix una decisió/procediment distint.

## Mapa tipus → família i nivell

| Bloc/tipus | Família | Relació | Nivell | Justificació breu |
|---|---|---|---|---|
| Aproximacions 1 | A1 arrodonir a posició decimal | nucli | N1 | Una regla de xifra adjacent |
| 2 | A1 | variant | N1 | Arrodonir enter a desenes/milers |
| 3 | A2 aproximació per defecte | diferent | N1 | Truncar a precisió indicada sense superar |
| 4 | A3 aproximació per excés | diferent | N1 | Menor valor a precisió donada que no queda per sota |
| 5 | A4 classificar excés/defecte | diferent | N1 | Comparar dos valors |
| 6 | A5 expressar mesura amb precisió | diferent | N1 | Relacionar unitat de precisió i xifra |
| 7 | A6 error màxim d’arrodoniment | diferent | N1 | Meitat de la unitat d’arrodoniment |
| 8 | A7 comparar precisió | diferent | N2 | Comparar errors respecte d’un irracional |
| 9 | A8 error absolut | diferent | N1 | Valor absolut de la diferència |
| 10 | A9 reconstruir interval d’arrodoniment | diferent | N2 | Calcular semiamplada i gestionar extrems |
| 11 | A10 aproximar en context amb restricció | diferent | N1; variant `transport` N2 | El cas de material no excedible és N1; transportar 126 alumnes en autocars requereix quocient i arrodoniment cap amunt (N2) |
| 12 | A11 jutjar estimació de producte | diferent | N2 | Construir estimació de referència i valorar ordre de magnitud |
| Potències 1 | P1 exponent zero | nucli | N1 | Aplicar a⁰=1 per a≠0 |
| 2 | P2 exponent negatiu | nucli | N1 | Invertir base |
| 3 | P2 | variant | N1 | Base fraccionària; inversa de fracció |
| 4 | P3 producte de potències igual base | nucli | N1 | Sumar exponents |
| 5 | P4 quocient de potències igual base | diferent | N1 | Restar exponents |
| 9 | P4 | variant | N1 | Obtenir valor numèric amb exponent negatiu |
| 12 | P3 | variant | N1 | Trobar exponent desconegut |
| 16 | P3/P4 | variant | N1 | Expressar producte com a potència amb exponent negatiu |
| 6 | P5 potència d’una potència | diferent | N1 | Multiplicar exponents |
| 7 | P6 potència d’un producte | diferent | N1 | Distribuir exponent sobre factors |
| 8 | P7 potència d’un quocient | diferent | N1 | Elevar numerador i denominador |
| 14 | P7 | variant numèrica | N1 | Avaluar i simplificar la fracció |
| 10 | P8 signes i parèntesis amb exponent negatiu | diferent | N2 | Distingir si el signe forma part de la base |
| 11 | P9 diagnòstic de propietats | diferent | N2 | Reconèixer que la propietat del producte no s’aplica a suma |
| 13 | P10 valor numèric d’expressió amb potències | tasca diferent | N1 | Combinar propietat i inversa numèrica |
| 15 | P11 jerarquia d’operacions amb potències | tasca diferent | N2 | Respectar potències, multiplicació i resta |

## Famílies: exemples resolts, errors i casos límit

### Bloc 4 · Aproximacions

- **A1 Arrodonir.** 6,693 a centèsimes → 6,69; 9139 a milers → 9000. Error: mirar la xifra conservada, no la següent. Límit: xifra següent 5; zeros finals i notació de precisió.
- **A2 Per defecte.** 6,4337 a centèsimes → 6,43; −2,341 a dècimes per defecte, sense superar el valor numèric, dona **−2,4**. Error: truncar cap a zero i obtenir −2,3, que és superior a −2,341. Límit: nombre negatiu: “per defecte” s’ha de definir clarament al context.
- **A3 Per excés.** 8,9583 a mil·lèsimes → 8,959; 5,1449 a mil·lèsimes → 5,145. Error: arrodonir al més proper en lloc de prendre el mínim superior. Límit: si el valor ja té la precisió sol·licitada, queda igual.
- **A4 Excés/defecte.** 2,5 respecte de 2,465 és per excés; 0,12 respecte de 0,124 és per defecte. Error: comparar només xifres decimals. Límit: valors negatius exigeixen convenció explícita.
- **A5 Precisió d’una mesura.** 3,0502 m a 0,01 m → 3,05 m; 8,2007 m a 0,1 m → 8,2 m. Error: confondre precisió 0,01 amb dues xifres significatives. Límit: conservar unitat i zero final quan sigui significatiu.
- **A6 Error màxim d’arrodoniment.** A centèsimes: 0,01/2=0,005; a dècimes: 0,1/2=0,05. Error: prendre tota la unitat. Límit: el màxim és una cota i depèn de la regla aplicada als empats.
- **A7 Comparar precisió.** Per √2, 1,414 és més precís que 1,41 (errors aprox. 0,0002 i 0,0042); per √5, 2,236 és més precís que 2,24. Error: escollir només pel nombre de decimals sense considerar el valor exacte. Límit: zeros finals poden ser rellevants per la precisió.
- **A8 Error absolut.** |17,33−17,3|=0,03; |45,84−45,8|=0,04. Error: deixar resultat negatiu. Límit: unitats han de coincidir.
- **A9 Interval original.** Arrodonit a centèsimes dona 4,10: interval usual [4,095;4,105); arrodonit a dècimes dona 17,6: [17,55;17,65). Error: usar una unitat completa en lloc de la meitat. Límit: incloure un extrem depèn de la regla d’empats; el generador adopta extrem inferior inclòs i superior exclòs.
- **A10 Restricció contextual (tipus 11; base N1, variant `transport` N2).** Amb 17,8 m i només talls de metres complets sense excedir → 17 m; amb 6,2 kg màxims en paquets d’1 kg → 6 paquets. Variant `transport`: 126 alumnes i 50 places per autocar → ⌈126/50⌉=3 autocars; cal arrodonir el quocient cap amunt per no deixar alumnes sense plaça. Error: arrodonir a 2 i deixar-ne 26 sense transport. Límit: cal que l’enunciat expliqui clarament la restricció.
- **A11 Estimar producte.** 2,8×3≈3×3=9; 5,8×4,7≈6×5=30 i producte exacte 27,26, estimació raonable. Error: confondre estimació amb resultat exacte. Límit: acceptar estratègies diferents si són coherents amb l’ordre de magnitud.

### Bloc 5 · Potències

- **P1 Exponent zero.** 2⁰=1; (−4)⁰=1. Error: respondre 0. Límit: 0⁰ no es tracta com a potència ordinària en aquest nivell i no s’ha de generar com si fos 1.
- **P2 Exponent negatiu/inversa.** 4⁻¹=1/4; (−2/3)⁻¹=−3/2. Error: fer negativa la resposta sense invertir o oblidar el signe. Límit: base zero no admet exponent negatiu.
- **P3 Producte de mateixa base.** 3⁴·3⁰=3⁴; 7⁻²·7⁻⁴=7⁻⁶. Error: multiplicar exponents. Límit: bases han de coincidir.
- **P4 Quocient mateixa base.** 7²÷7⁻³=7⁵; 3³÷3⁷=3⁻⁴=1/81. Error: sumar exponents o ignorar que el resultat pot ser negatiu. Límit: divisor base no nul·la.
- **P5 Potència d’una potència.** (5⁻³)²=5⁻⁶; (3³)⁻²=3⁻⁶. Error: sumar exponents. Límit: parèntesis defineixen la base elevada.
- **P6 Potència d’un producte.** (2·5)³=2³·5³; (4·7)⁻³=4⁻³·7⁻³. Error: aplicar exponent només a un factor. Límit: exponents negatius també s’apliquen a cada factor no nul.
- **P7 Potència d’un quocient.** (5/5)³=5³/5³=1; (2/5)²=4/25. Error: elevar només numerador. Límit: denominador zero prohibit; simplificació final.
- **P8 Signe i parèntesis.** (−7)⁻²=1/49; −7⁻²=−1/49. Error: tractar −aⁿ com (−a)ⁿ. Límit: exponent parell/senar i exponent negatiu.
- **P9 Diagnosticar propietat.** 3⁴+3²≠3⁶; en canvi 3⁴·3²=3⁶. 2³+2³=16, no 2⁶. Error: estendre la regla del producte a sumes. Límit: confondre suma de potències amb potència d’una suma.
- **P10 Avaluar expressió.** 3⁴·3⁻⁹=3⁻⁵=1/243; 5²·5⁻³=1/5. Error: aturar-se en potència negativa quan es demana valor numèric final. Límit: base negativa i parèntesis.
- **P11 Jerarquia.** 2⁴−2·2²=16−8=8; 5⁴−5·5³=625−625=0. Error: fer primer la resta o tractar exponents com a multiplicacions tardanes. Límit: resultat zero i parèntesis addicionals.

Els nivells N1 de les lleis individuals són adequats perquè el procediment és aplicar una propietat en una expressió curta. N2 es reserva per distingir signes/parèntesis, diagnosticar una falsa propietat o encadenar jerarquia. No es força N3.

## Buits i solapaments

No s’ha trobat un buit curricular genuí que exigeixi una família nova: el bloc d’aproximacions cobreix arrodoniment, excés/defecte, precisió, error absolut/màxim, interval d’arrodoniment, comparació i estimació; potències cobreix exponents enters, lleis, signe i jerarquia. No es dupliquen famílies del bloc de nombres reals o racionals: la comparació d’irracionals aquí serveix per a precisió, i les potències són operacions pròpies del bloc 5.

Hi ha un enllaç entre els tipus 6 i 11 d’aproximacions (precisió de mesura vs restricció “no superar”), però són tasques contextualment diferents. Dins del tipus 11, la branca `transport` és una variant de nivell N2 perquè exigeix arrodonir el quocient cap amunt. Les lleis de potències es relacionen, però no es fusionen quan l’operació/procediment és diferent.

## Modes i evidència

- **Estàtica:** codi actual defineix aquests generadors, guies i solucions; pàgina inclou pràctica guiada/sense pistes, resposta múltiple/oberta i examen. No s’han recorregut visualment totes les branques.
- **Simulació existent, no repetida:** `resultats-punt3-3eso-numeric.json` registra 3.000 mostres per tema. Aproximacions: cobertura per camins 9/4/0 i examen 6/6/0; potències: 13/3/0 i examen 6/6/0. A aproximacions hi ha 12 tipus únics: 9 amb nivell base N1 i 3 amb nivell base N2; la branca `transport` del tipus 11 afegeix un camí N2. Per això la cobertura compta 13 camins de nivell (9/4/0), no 13 tipus diferents ni una anomalia pendent. Potències mostra 13/3/0 per als 16 tipus.
- **Visual:** cap validació visual completa registrada per aquests bancs; no afirmo qualitat de renderitzat ni accessibilitat visual.
- No s’ha modificat codi, de manera que no s’han repetit proves ni executat una validació nova.

## Conclusió

Proposta mantinguda per tipus únic: aproximacions 9 N1 / 3 N2 / 0 N3 (tipus 8,10,12 a N2; el tipus 11 té una branca N2 `transport`) i potències 13 N1 / 3 N2 / 0 N3 (tipus 10,11,15 a N2). La cobertura per camins d’aproximacions és 9/4/0 perquè compta aquesta variant addicional; no hi ha una anomalia pendent de reconciliar. No es canvien nivells actius ni registre oficial de famílies. Només s’ha completat la documentació de la PR #58.
