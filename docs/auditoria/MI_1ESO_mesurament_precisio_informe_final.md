# Informe final — Mesurament i precisió · 1r d’ESO

## Base i abast

- Base `main` confirmada: merge de PR #29, SHA `9062840d294cb0793a391bb96ca589d68f51ce48`; la branca parteix d’aquest SHA.
- Tema/pràctica: `mesurament`, `1eso/sentit-mesura.html`. No s’han canviat teoria, CSS, altres temes ni `families-validades.json`/`inventari-fase-a.csv`.
- Fonts llegides: `AGENTS.md`, `docs/protocol-auditoria-temes.md`, `docs/auditoria/README.md` i els informes finals dels cinc temes de mesura: Sistema Mètric Decimal, Conversions d’unitats, Mesura del temps, Perímetres i Àrees.
- Referència curricular: [Orientacions curriculars de Matemàtiques per cursos, XTEC (PDF)](https://xtec.gencat.cat/web/.content/curriculum/eso/concrecions-curriculars/Orientacions-curriculars_MAT_SEC_per-cursos.pdf).

## Inventari inicial i consolidació

`genMesuramentPrecisioRaw()` tenia vuit tipus: instrument (1), unitat (2), escala directa (3), error absolut (4), error relatiu percentual (5), angle interior desconegut (6), circumferència/diàmetre (7) i elecció àrea/perímetre (8). També existia `encaix-amb-tolerancies` (1001, N3), més els bancs S01–S04, M01–M05 i T05.

Els vuit tipus no equivalen a vuit famílies: les escales verbals, numèriques i inverses comparteixen proporcionalitat; M03 comparteix procediment amb error absolut i M04/M05 amb error relatiu; T05 és la variant contextual del gir de la minutera. Les mancances reals identificades eren lectura de graduacions, comparació de resolució, arrodoniment i incertesa.

## Famílies definitives

**15 famílies: N1=6, N2=8, N3=1.** Recompte local al tema. La suma d’angles del triangle també apareix a la ruta espacial; es documenta com a procediment transversal, no com a família global exclusiva.

| ID estable | Família | Generadors i variants | Nivell anterior → final | Error freqüent |
|---|---|---|---|---|
| `seleccionar-instrument` | Seleccionar un instrument segons magnitud i precisió | 1; M01 | N1 → N1 (**N1**) | Confondre instrument amb unitat. |
| `seleccionar-unitat-mesura` | Seleccionar una unitat adequada per a la magnitud | 2; M02 | N1 → N1 (**N1**) | Triar una unitat sense identificar la magnitud. |
| `identificar-magnitud-plana` | Distingir perímetre i àrea segons el propòsit | 8 | N1 → N1 (**N1**) | Intercanviar contorn i superfície. |
| `llegir-graduacions` | Llegir una escala graduada numerada | 1002 (nou) | — → N1 (**N1**) | Comptar marques en lloc d'intervals. |
| `comparar-resolucio-instruments` | Comparar la resolució d'instruments segons un límit | 1003 (nou) | — → N1 (**N1**) | Creure que una divisió més gran dona més precisió. |
| `raio-circumferencia-diametre` | Aproximar π amb circumferència ÷ diàmetre | 7 | N1 → N1 (**N1**) | Esperar 3,14 exacte d'una mesura experimental. |
| `escala-proporcional` | Aplicar o interpretar escales verbals i numèriques | 3, 1004; S01–S04 | N1 (3/S01/S02), N2 (S03/S04) → N2 (**N2**) | Invertir la proporció o oblidar convertir unitats. |
| `error-absolut` | Calcular, comparar o reconstruir amb error absolut | 4, 1005; M03 | N1 → N2 (**N2**) | Donar signe a l'error absolut. |
| `error-relatiu-percentual` | Calcular i comparar errors relatius percentuals | 5, 1006; M04/M05 | N2 (M05 N1; etiquetes internes hard) → N2 (**N2**) | Dividir pel valor mesurat o comparar només errors absoluts. |
| `suma-angles-interiors-poligon` | Trobar l'angle interior que falta | 6 | N1 → N2 (**N2**) | Fer servir 360° en un triangle o no sumar tots els angles coneguts. |
| `arrodonir-mesura` | Arrodonir a unitats, dècimes o centèsimes | 1007 (nou) | — → N2 (**N2**) | Truncar en lloc d'arrodonir. |
| `interval-incertesa-lectura` | Expressar l'interval d'una lectura arrodonida | 1008 (nou) | — → N2 (**N2**) | Tancar els dos extrems o confondre lectura amb valor exacte. |
| `comparar-mesures-amb-incertesa` | Comparar intervals compatibles amb dues lectures | 1009 (nou) | — → N2 (**N2**) | Ordenar pels centres encara que els intervals se solapin. |
| `angle-gir-rellotge` | Calcular l'angle girat per l'agulla dels minuts | 1010; T05 preexistent | N2 (variant T05) → N2 (**N2**) | Usar 5° per minut en lloc de 6°. |
| `encaix-amb-tolerancies` | Garantir encaix amb toleràncies i límits inclusius | 1001 | N3 → N3 (**N3**) | Comprovar només valors nominals i ignorar els errors màxims. |

### Justificació pedagògica de les reclassificacions

- **Escala proporcional (N1→N2):** tipus 3 i S01/S02 figuraven N1; S03/S04 eren N2 al banc. La família exigeix proporció directa/inversa, deducció d’escala i gestió d’unitats, per tant N2.
- **Error absolut (N1→N2):** tipus 4 i M03 constaven N1. Prendre valor absolut, reconstruir lectures amb sentit de desviació o comparar errors combina procediments.
- **Error relatiu (N2):** el tipus 5 i M04 ja eren N2 però tenien etiqueta interna `hard`; M05 constava N1. Cal dividir per la referència i multiplicar per cent, que és N2, no N3.
- **Angle interior desconegut (N1→N2):** tipus 6 era N1; ara s’assigna N2 perquè requereix sumar i restar els angles coneguts. El reconeixement d’angles continua N1 al tema espacial.
- **Mantinguts:** selecció d’instruments/unitats, distinció àrea/perímetre i π experimental són directes N1; la tolerància continua N3 perquè demana garantir una condició als extrems pitjors.
- **Bancs:** S01/S02 passen a N2; M03 i M05 passen a N2; M04 es manté N2. Les etiquetes internes hard de M04/M05 es normalitzen a `medium`.

## Famílies noves i consolidacions

Noves famílies procedimentals: `llegir-graduacions` i `comparar-resolucio-instruments` (N1); `arrodonir-mesura`, `interval-incertesa-lectura` i `comparar-mesures-amb-incertesa` (N2). `angle-gir-rellotge` explicita com a família la variant T05 ja existent; no és una nova ruta de contingut. 1004–1006 amplien famílies prèvies i no compten separadament.

Escala 3/1004/S01–S04, error absolut 4/1005/M03, error relatiu 5/1006/M04/M05 i gir 1010/T05 compten cadascun una sola vegada. No s’afegeix cap família de conversions generals.

## Exemples generats i resolts

Els tres exemples per família s’han generat de manera determinista. Els passos expliciten el procediment i la unitat.

### Seleccionar un instrument segons magnitud i precisió (`seleccionar-instrument`, N1)

**Variants:** 1; M01. **Error freqüent:** Confondre instrument amb unitat.

1. **Enunciat:** Quin instrument és més adequat per mesurar el volum d’un líquid al laboratori? **Passos:** Identifico què es mesura (magnitud del context) → una **Proveta graduada** és adequada per a aquesta magnitud → la trio. **Resposta:** Proveta graduada.

2. **Enunciat:** Quin instrument és més adequat per mesurar l’amplitud d’un angle dibuixat? **Passos:** Identifico què es mesura (magnitud del context) → una **Transportador** és adequada per a aquesta magnitud → la trio. **Resposta:** Transportador.

3. **Enunciat:** Quin instrument és més adequat per mesurar el temps que tarda un atleta en una cursa curta? **Passos:** Identifico què es mesura (magnitud del context) → una **Cronòmetre** és adequada per a aquesta magnitud → la trio. **Resposta:** Cronòmetre.

### Seleccionar una unitat adequada per a la magnitud (`seleccionar-unitat-mesura`, N1)

**Variants:** 2; M02. **Error freqüent:** Triar una unitat sense identificar la magnitud.

1. **Enunciat:** Quina unitat és més adequada per expressar la superfície d’una habitació? **Passos:** Identifico la magnitud → comparo la mida de les unitats possibles → **m²** és la unitat adequada. **Resposta:** m².

2. **Enunciat:** Quina unitat és més adequada per expressar la temperatura d’una aula? **Passos:** Identifico la magnitud → comparo la mida de les unitats possibles → **°C** és la unitat adequada. **Resposta:** °C.

3. **Enunciat:** Quina unitat és més adequada per expressar l’amplitud d’un angle? **Passos:** Identifico la magnitud → comparo la mida de les unitats possibles → **graus** és la unitat adequada. **Resposta:** graus.

### Distingir perímetre i àrea segons el propòsit (`identificar-magnitud-plana`, N1)

**Variants:** 8. **Error freqüent:** Intercanviar contorn i superfície.

1. **Enunciat:** Volem saber quanta pintura cal per cobrir una paret. Quina magnitud de la paret és rellevant? **Passos:** El propòsit és cobrir una superfície → això requereix **Àrea**, sense calcular-la aquí. **Resposta:** Àrea.

2. **Enunciat:** Volem posar una sanefa al voltant d’una taula rectangular. Quina magnitud necessitem? **Passos:** El propòsit és envoltar un contorn → això requereix **Perímetre**, sense calcular-la aquí. **Resposta:** Perímetre.

3. **Enunciat:** Volem posar gespa a tot un jardí rectangular. Quina magnitud necessitem? **Passos:** El propòsit és cobrir una superfície → això requereix **Àrea**, sense calcular-la aquí. **Resposta:** Àrea.

### Llegir una escala graduada numerada (`llegir-graduacions`, N1)

**Variants:** 1002 (nou). **Error freqüent:** Comptar marques en lloc d'intervals.

1. **Enunciat:** En una escala de termòmetre, les marques numerades són 10 °C i 30 °C, separades per 10 intervals iguals. La lectura és a la divisió 6 després de la primera marca. Quina lectura indica? **Passos:** Valor d'una divisió: (30−10)÷10=2 °C; lectura: 10+6×2=**22 °C**. **Resposta:** 22 °C.

2. **Enunciat:** En una escala de termòmetre, les marques numerades són 10 °C i 30 °C, separades per 10 intervals iguals. La lectura és a la divisió 7 després de la primera marca. Quina lectura indica? **Passos:** Valor d'una divisió: (30−10)÷10=2 °C; lectura: 10+7×2=**24 °C**. **Resposta:** 24 °C.

3. **Enunciat:** En una escala de proveta, les marques numerades són 30 mL i 50 mL, separades per 10 intervals iguals. La lectura és a la divisió 8 després de la primera marca. Quina lectura indica? **Passos:** Valor d'una divisió: (50−30)÷10=2 mL; lectura: 30+8×2=**46 mL**. **Resposta:** 46 mL.

### Comparar la resolució d'instruments segons un límit (`comparar-resolucio-instruments`, N1)

**Variants:** 1003 (nou). **Error freqüent:** Creure que una divisió més gran dona més precisió.

1. **Enunciat:** Per mesurar una peça amb divisions no superiors a 2 mm, quin és l’instrument amb les divisions més grans que encara compleixen el requisit? **Passos:** Resolucions: cinta mètrica 10 mm, regle A 5 mm, regle B 2 mm, peu de rei 1 mm → compleixen ≤2 mm; la divisió més gran admissible és **regle B**. **Resposta:** regle B.

2. **Enunciat:** Per mesurar una peça amb divisions no superiors a 5 mm, quin és l’instrument amb les divisions més grans que encara compleixen el requisit? **Passos:** Resolucions: cinta mètrica 10 mm, regle A 5 mm, regle B 2 mm, peu de rei 1 mm → compleixen ≤5 mm; la divisió més gran admissible és **regle A**. **Resposta:** regle A.

3. **Enunciat:** Per mesurar una peça amb divisions no superiors a 1 mm, quin és l’instrument amb les divisions més grans que encara compleixen el requisit? **Passos:** Resolucions: cinta mètrica 10 mm, regle A 5 mm, regle B 2 mm, peu de rei 1 mm → compleixen ≤1 mm; la divisió més gran admissible és **peu de rei escolar**. **Resposta:** peu de rei escolar.

### Aproximar π amb circumferència ÷ diàmetre (`raio-circumferencia-diametre`, N1)

**Variants:** 7. **Error freqüent:** Esperar 3,14 exacte d'una mesura experimental.

1. **Enunciat:** En un experiment, es mesura una circumferència de 62,9 cm i el seu diàmetre de 20 cm. Quina aproximació de π dona el quocient longitud÷diàmetre, arrodonit a les centèsimes? **Passos:** Quocient: 62,9÷20≈3.1450 → a centèsimes: **3,15**. La diferència petita respecte de 3,14 és compatible amb l'error de mesura. **Resposta:** 3,15.

2. **Enunciat:** En un experiment, es mesura una circumferència de 125,7 cm i el seu diàmetre de 40 cm. Quina aproximació de π dona el quocient longitud÷diàmetre, arrodonit a les centèsimes? **Passos:** Quocient: 125,7÷40≈3.1425 → a centèsimes: **3,14**. La diferència petita respecte de 3,14 és compatible amb l'error de mesura. **Resposta:** 3,14.

3. **Enunciat:** En un experiment, es mesura una circumferència de 125,5 cm i el seu diàmetre de 40 cm. Quina aproximació de π dona el quocient longitud÷diàmetre, arrodonit a les centèsimes? **Passos:** Quocient: 125,5÷40≈3.1375 → a centèsimes: **3,14**. La diferència petita respecte de 3,14 és compatible amb l'error de mesura. **Resposta:** 3,14.

### Aplicar o interpretar escales verbals i numèriques (`escala-proporcional`, N2)

**Variants:** 3, 1004; S01–S04. **Error freqüent:** Invertir la proporció o oblidar convertir unitats.

1. **Enunciat:** En un plànol, 1 cm representa 5 m reals. Una distància hi mesura 8 cm. Quina és la distància real, en metres? **Passos:** 1 cm representa 5 m; 8 cm representa 8×5=**40 m**. **Resposta:** 40 m.

2. **Enunciat:** En un plànol, 1 cm representa 20 m reals. Una distància real fa 120 m. Quants centímetres ha de fer al plànol? **Passos:** 120 m÷(20 m per cm al plànol)=**6 cm** al dibuix. **Resposta:** 6 cm.

3. **Enunciat:** Un mapa està a escala 1:200. Dues poblacions són a 9 cm al mapa. Quina distància real hi ha en metres? **Passos:** 9 cm×200=1.800 cm reals → 1.800÷100=**18 m**. **Resposta:** 18 m.

### Calcular, comparar o reconstruir amb error absolut (`error-absolut`, N2)

**Variants:** 4, 1005; M03. **Error freqüent:** Donar signe a l'error absolut.

1. **Enunciat:** El valor de referència és 122 mm i una lectura dona 114 mm. Quin és l’error absolut, en mm? **Passos:** Error absolut = |114−122| = **8 mm**. **Resposta:** 8 mm.

2. **Enunciat:** El valor de referència és 246 mm. La lectura s’hi desvia 5 mm per sobre. Quina lectura s’ha obtingut? **Passos:** “Per sobre” fixa el signe: 246+5=**251 mm**. L'error absolut continua sent 5 mm. **Resposta:** 251 mm.

3. **Enunciat:** La mesura A té valor de referència 121 mm i lectura 113 mm. La B té referència 153 mm i lectura 151 mm. Quin és el menor dels dos errors absoluts? **Passos:** Error A: |113−121|=8 mm; error B: |151−153|=2 mm → menor error: **2 mm**. **Resposta:** 2 mm.

### Calcular i comparar errors relatius percentuals (`error-relatiu-percentual`, N2)

**Variants:** 5, 1006; M04/M05. **Error freqüent:** Dividir pel valor mesurat o comparar només errors absoluts.

1. **Enunciat:** El valor de referència és 200 mm i la lectura és 220 mm. Quin és l’error relatiu percentual? **Passos:** Error absolut: |220−200|=20 mm → 20÷200×100=**10%**. **Resposta:** 10%.

2. **Enunciat:** El valor de referència és 200 mm i la lectura és 198 mm. Quin és l’error relatiu percentual? **Passos:** Error absolut: |198−200|=2 mm → 2÷200×100=**1%**. **Resposta:** 1%.

3. **Enunciat:** El valor de referència és 500 mm i la lectura és 505 mm. Quin és l’error relatiu percentual? **Passos:** Error absolut: |505−500|=5 mm → 5÷500×100=**1%**. **Resposta:** 1%.

### Trobar l'angle interior que falta (`suma-angles-interiors-poligon`, N2)

**Variants:** 6. **Error freqüent:** Fer servir 360° en un triangle o no sumar tots els angles coneguts.

1. **Enunciat:** En un triangle, dos angles mesuren 59° i 70°. Quant mesura el tercer angle? **Passos:** Suma coneguda: 59+70=129°; suma interior=180° → 180−129=**51°**. **Resposta:** 51°.

2. **Enunciat:** En un quadrilàter, tres angles mesuren 96°, 80° i 83°. Quant mesura el quart angle? **Passos:** Suma coneguda: 96+80+83=259°; suma interior=360° → 360−259=**101°**. **Resposta:** 101°.

3. **Enunciat:** En un quadrilàter, tres angles mesuren 99°, 99° i 71°. Quant mesura el quart angle? **Passos:** Suma coneguda: 99+99+71=269°; suma interior=360° → 360−269=**91°**. **Resposta:** 91°.

### Arrodonir a unitats, dècimes o centèsimes (`arrodonir-mesura`, N2)

**Variants:** 1007 (nou). **Error freqüent:** Truncar en lloc d'arrodonir.

1. **Enunciat:** Una lectura aproximada és 37,600 cm. Arrodoneix-la a la unitat més propera. **Passos:** Conservo 0 decimals i observo la primera xifra descartada → 37,6 cm arrodonit a **38 cm**. **Resposta:** 38 cm.

2. **Enunciat:** Una lectura aproximada és 92,338 cm. Arrodoneix-la a la dècima més propera. **Passos:** Conservo 1 decimal i observo la primera xifra descartada → 92,338 cm arrodonit a **92,3 cm**. **Resposta:** 92,3 cm.

3. **Enunciat:** Una lectura aproximada és 54,573 cm. Arrodoneix-la a la centèsima més propera. **Passos:** Conservo 2 decimals i observo la primera xifra descartada → 54,573 cm arrodonit a **54,57 cm**. **Resposta:** 54,57 cm.

### Expressar l'interval d'una lectura arrodonida (`interval-incertesa-lectura`, N2)

**Variants:** 1008 (nou). **Error freqüent:** Tancar els dos extrems o confondre lectura amb valor exacte.

1. **Enunciat:** Una pantalla arrodoneix la longitud al múltiple de 0,20 cm més proper. La lectura és 6,00 cm. Quin interval de valors reals pot haver donat aquesta lectura? Suposa arrodoniment de mig punt cap amunt. **Passos:** Mitja resolució: 0,2÷2=0,1 cm; extrems 6±0,1 → inferior inclòs, superior exclòs: **[5,90; 6,10) cm**. **Resposta:** [5,90; 6,10) cm.

2. **Enunciat:** Una pantalla arrodoneix la longitud al múltiple de 0,50 cm més proper. La lectura és 6,70 cm. Quin interval de valors reals pot haver donat aquesta lectura? Suposa arrodoniment de mig punt cap amunt. **Passos:** Mitja resolució: 0,5÷2=0,25 cm; extrems 6,7±0,25 → inferior inclòs, superior exclòs: **[6,45; 6,95) cm**. **Resposta:** [6,45; 6,95) cm.

3. **Enunciat:** Una pantalla arrodoneix la longitud al múltiple de 0,50 cm més proper. La lectura és 7,40 cm. Quin interval de valors reals pot haver donat aquesta lectura? Suposa arrodoniment de mig punt cap amunt. **Passos:** Mitja resolució: 0,5÷2=0,25 cm; extrems 7,4±0,25 → inferior inclòs, superior exclòs: **[7,15; 7,65) cm**. **Resposta:** [7,15; 7,65) cm.

### Comparar intervals compatibles amb dues lectures (`comparar-mesures-amb-incertesa`, N2)

**Variants:** 1009 (nou). **Error freqüent:** Ordenar pels centres encara que els intervals se solapin.

1. **Enunciat:** La lectura A és 14,0 cm amb resolució 0,2 cm. La lectura B és 13,4 cm amb resolució 0,6 cm. Quina conclusió queda garantida? **Passos:** A∈[13,90; 14,10) i B∈[13,10; 13,70) cm → comparo intervals → **A és més llarga**. **Resposta:** A és més llarga.

2. **Enunciat:** La lectura A és 14,3 cm amb resolució 0,4 cm. La lectura B és 14,7 cm amb resolució 0,2 cm. Quina conclusió queda garantida? **Passos:** A∈[14,10; 14,50) i B∈[14,60; 14,80) cm → comparo intervals → **B és més llarga**. **Resposta:** B és més llarga.

3. **Enunciat:** La lectura A és 14,7 cm amb resolució 0,4 cm. La lectura B és 14,9 cm amb resolució 0,6 cm. Quina conclusió queda garantida? **Passos:** A∈[14,50; 14,90) i B∈[14,60; 15,20) cm → comparo intervals → **No es pot determinar**. **Resposta:** No es pot determinar.

### Calcular l'angle girat per l'agulla dels minuts (`angle-gir-rellotge`, N2)

**Variants:** 1010; T05 preexistent. **Error freqüent:** Usar 5° per minut en lloc de 6°.

1. **Enunciat:** L’agulla dels minuts d’un rellotge avança 25 minuts. Quin angle ha girat? **Passos:** 360°÷60=6° per minut → 25×6°=**150°**. **Resposta:** 150°.

2. **Enunciat:** L’agulla dels minuts d’un rellotge avança 30 minuts. Quin angle ha girat? **Passos:** 360°÷60=6° per minut → 30×6°=**180°**. **Resposta:** 180°.

3. **Enunciat:** L’agulla dels minuts d’un rellotge avança 35 minuts. Quin angle ha girat? **Passos:** 360°÷60=6° per minut → 35×6°=**210°**. **Resposta:** 210°.

### Garantir encaix amb toleràncies i límits inclusius (`encaix-amb-tolerancies`, N3)

**Variants:** 1001. **Error freqüent:** Comprovar només valors nominals i ignorar els errors màxims.

1. **Enunciat:** Una obertura mesura 52 cm amb error màxim 2 cm. Una peça té amplada nominal 42 cm i error màxim 3 cm. Cal una separació d’almenys 3 cm. Es pot garantir l’encaix en tots els casos? **Passos:** Obertura mínima=52−2=50 cm; peça màxima=42+3=45 cm; bretxa mínima=5 cm≥3 cm → **Sí, compleix**. **Resposta:** Sí, compleix.

2. **Enunciat:** Una obertura té amplada mesurada 54 cm i error absolut màxim 2 cm. Una peça té amplada nominal entera i error màxim 1 cm. Cal garantir una separació d’almenys 2 cm en tots els casos. Quina és l’amplada nominal màxima? **Passos:** Obertura mínima=54−2=52 cm; peça màxima=x+1; 52−(x+1)≥2 → x≤**49 cm**. **Resposta:** 49 cm.

3. **Enunciat:** Una obertura té amplada mesurada 56 cm i error absolut màxim 2 cm. Una peça té amplada nominal entera i error màxim 2 cm. Cal garantir una separació d’almenys 1 cm en tots els casos. Quina és l’amplada nominal màxima? **Passos:** Obertura mínima=56−2=54 cm; peça màxima=x+2; 54−(x+2)≥1 → x≤**51 cm**. **Resposta:** 51 cm.

## Adequació curricular i fronteres

- **Precisió / exactitud / resolució / incertesa:** la resolució és el valor d’una divisió; exactitud és proximitat a una referència; error absolut és la distància entre mesura i referència; error relatiu percentual posa aquesta distància en relació amb la referència; precisió es compara amb errors relatius o intervals. Una lectura arrodonida no es tracta com a valor exacte.
- **Sistema Mètric Decimal i Conversions:** no hi ha una família independent de conversió duplicada. cm→m i cm→km només apareixen com a pas propi d’un problema d’escala.
- **Mesura del temps:** M02 deixa de triar unitats temporals. T05/1010 calcula l’angle recorregut per la minutera, no equivalències ni durades.
- **Perímetres i Àrees:** tipus 8 només identifica quina magnitud cal mesurar segons si es cobreix o s’envolta; no calcula fórmules d’àrea o perímetre.
- **Estimació:** no s’estima la mida d’objectes reals. El càlcul de π parteix de dues mesures observades.
- **Angles:** la variant del triangle és compartida amb la ruta espacial; la família d’aquest tema també inclou quadrilàters. El gir de minutera és diferent.
- **Toleràncies:** enunciat especifica errors màxims i separació mínima. La comparació és inclusiva: igualar el marge requerit compleix.
- **Graduacions:** cada escala declara dues marques, intervals iguals i posició de lectura, sense dependre d’una imatge amb escala ambigua.

## Canvis funcionals

- Metadades de família estable, classificador compartit i rotació que evita repeticions consecutives per família també als exercicis contextuals.
- Afegits: lectura graduada, comparació de resolució, escala inversa/numèrica, reconstrucció d’error, arrodoniment i tractament d’intervals.
- M02 contextual canvia la selecció de temps per la massa d’un camió, per no duplicar Mesura del temps.
- M05 té quatre alternatives textuals diferents. Respostes d’arrodoniment comparteixen coma decimal i unitat amb les opcions; distractors numèrics coincidents es dedupliquen.
- La circumferència experimental inclou petit soroll de mesura i pot donar 3,13, 3,14 o 3,15.
- No s’ha modificat teoria/ancoratges, CSS, progressió, nombre d’exercicis per sessió ni altres temes.

## Resultats de les proves

### Test matemàtic — `scripts/comprova-mesurament-families-1eso.cjs`

- **7.000 mostres superades** amb oracles independents: 8 generadors crus ×250=2.000; 10 rutes de catàleg ×250=2.500; 10 patrons contextuals ×250=2.500.
- Cobertura comprovada: 15 famílies (6/8/1), metadades i nivells, opcions úniques/correctors, graduacions, selecció d’instruments/unitats, escales directes/inverses incloent S03→km, errors, π, arrodoniments, intervals, comparació, angles i toleràncies.
- Valors π observats: 3,13, 3,14, 3,15.

### Test integral Playwright — `scripts/comprova-mesurament-1eso.cjs`

- Executat amb **Chrome**, sense errors JavaScript: 320 seleccions de pràctica, les 15 famílies presents i cap repetició consecutiva; 30 després d’errors sense repeticions consecutives (12 famílies diferents en aquesta execució).
- Guiada/autònoma, resposta i següent exercici, progressió, examen del tema de 12 preguntes, examen global de 20, context 10×250, enllaç de teoria, ancoratge directe `#instrument` i `hashchange` a `#error-relatiu`.
- Amplada 1100 px i vista 390 px sense desbordament horitzontal.
- Regressió: 30 exercicis per cadascun de `metric`, `conversions`, `temps`, `perimetres`, `arees` (150 en total), amb classificació reconeguda.
- `node --check` superat en dos tests i dos JS modificats.

### Incidències i limitacions

- GitHub Pages no s’ha comprovat perquè la PR no es fusiona; els checks remots són pendents de l’execució de PR.
- La teoria no s’ha editat; es van validar l’enllaç, dos fragments d’URL, `hashchange` i amplada mòbil.
- `suma-angles-interiors-poligon` comparteix el cas triangle amb Sentit espacial; 15 és el recompte local del tema, no la suma global deduplicada.

## Ordres CMD de validació local

Des de l’arrel del repositori:

```cmd
cd /d C:\\Users\\srigu\\Documents\\Salva\\MI-GitHub
git fetch origin
git switch --track origin/codex/mesurament-precisio-1eso-2026-11-13
node --check scripts\\comprova-mesurament-families-1eso.cjs
node --check scripts\\comprova-mesurament-1eso.cjs
node scripts\\comprova-mesurament-families-1eso.cjs
node scripts\\comprova-mesurament-1eso.cjs
```

El test Playwright requereix Node.js i Playwright instal·lat; busca Edge o Chrome a les ubicacions habituals de Windows.