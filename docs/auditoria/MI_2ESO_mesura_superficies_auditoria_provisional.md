# Auditoria Fase A · Superfícies i volums (2n ESO)

**ESTAT: PROVISIONAL — agrupacions i nivells candidats, pendents de validació pedagògica.** La revisió inclou el mapa efectiu i una prova de modes amb DOM simulat; no es modifiquen exercicis ni nivells.

## Font i nivells efectius

- Generador: `2eso/sentit-mesura.html:1426–1579`, `genSuperficiesVolums2ESO`, tipus **1–20**.
- Classificació prioritària: `assets/js/dificultat-mi.js:9`, `REVIEWED_LEVELS['2eso/mesura'].superficies` i `REVIEWED_VARIANTS` a la línia 11; `classify` aplica aquesta excepció abans del mapa general.
- **N1 per defecte (9 tipus):** 1,3,5,6,7,8,10,11,18.
- **N2 per defecte (11 tipus):** 2,4,9,12,13,14,15,16,17,19,20.
- **N3 per defecte:** cap.
- **Excepció real:** tipus **17**, variant `sameBase`, **N1**, perquè només es comparen altures quan les dues primeres dimensions de les caixes coincideixen. Les altres variants del mateix tipus queden a **N2**. El generador ja defineix `difficultyVariant='sameBase'` quan `a[0]===b[0]&&a[1]===b[1]` després de descartar volums idèntics. La prova de detecció textual alternativa del classificador no substitueix la identitat explícita del generador. Comptar el tipus 17 només com a N2 ocultaria una variant N1.
- El mapa antic `level()` és diferent del mapa revisat; no és l'origen de la dificultat efectiva ordinària.

## Nuclis matemàtics candidats: fins a 13, no validades

| Candidat | Procediment genuí proposat | Tipus/variants | Nivell actual | Judici provisional |
|---|---|---|---|---|
| SV01 | Volum directe d'un ortoedre, cub o prisma amb àrea de base donada | 1,3,5 | N1 | **N1**: mateixa idea V=Ab·h o producte de tres dimensions |
| SV02 | Volum de prisma triangular amb construcció d'àrea de base | 4 | N2 | **N2**: base triangular abans de volum |
| SV03 | Volum directe de cilindre | 7 | N1 | **N1**: aplicar πr²h, discutible si es valora la construcció de la base |
| SV04 | Superfície total d'ortoedre/cub | 2,6,16 | 2,16 N2; 6 N1 | **N1/N2 segons figura i dades**: comptar cares i sumar-ne àrees; 2/16 comparteixen el càlcul, 6 és el cas regular de sis quadrats |
| SV05 | Desenvolupament lateral d'un cilindre i àrea lateral | 8,19 | 8 N1; 19 N2 | **N1/N2 discutible**: 8 aplica fórmula d'àrea, 19 identifica dimensions d'un rectangle desplegat |
| SV06 | Superfície total d'un cilindre tancat | 9 | N2 | **N2**: àrea lateral més dues bases |
| SV07 | Invertir V=Ab·h per recuperar altura o àrea de base | 10,11 | N1 | **N1**: divisió directa, mateix esquema invers |
| SV08 | Recuperar altura d'un cilindre amb volum i radi donats | 12 | N2 | **N2**: identificar πr² i aïllar h; possible solapament amb SV07 |
| SV09 | Calcular capacitat d'un recipient a partir del volum | 13,14 | N2 | **N2**, amb dos subcasos: m³→L i dm³→L; 14 és una equivalència directa després de volum |
| SV10 | Reconstruir profunditat des de litres i superfície de base | 15 | N2 | **N2**: litres→m³, àrea de base, volum invers |
| SV11 | Comparar volums de dues caixes | 17, incl. `sameBase` | N2, però N1 en `sameBase` | **N1 si base igual** (compara altures), **N2 si base diferent** (dos productes i comparació) |
| SV12 | Detectar confusió de superfície i volum | 18 | N1 | **N1**: el diagnòstic es dona explícit entre distractors senzills |
| SV13 | Identificar parelles de cares d'un ortoedre desplegat | 20 | N2 | **Objectiu visual diferent**: identificar tipus i parelles de cares, sense calcular l'àrea total; mantenir-lo separat de SV04 |

Les 13 files **no són 13 famílies validades**. SV01/SV02/SV03 comparteixen l'estructura V=Ab·h; SV07/SV08/SV10 comparteixen inversió de volum; SV04/SV05/SV06 comparteixen descomposició de superfície. La fusió o separació necessita el criteri general de procediments genuïns. **Cobertura de tots els tipus 1–20 sense duplicacions de tipus** (el 17 inclou dues variants pedagògiques).

## Dos exemples resolts per candidat

Tots són exemples pedagògics **construïts a partir de les fórmules i dominis del codi**, no mostres extretes del navegador.

- **SV01:** ortoedre 4×3×2 cm → 4·3·2=**24 cm³**; cub d'aresta 5 cm → 5³=**125 cm³**. Error: confondre superfície i volum.
- **SV02:** prisma triangular amb base 6 cm, altura del triangle 4 cm i longitud 5 cm → (6·4/2)·5=**60 cm³**; base 8, altura 3, longitud 6 cm → (8·3/2)·6=**72 cm³**. Error: no dividir l'àrea triangular per dos.
- **SV03:** cilindre r=2 cm, h=5 cm → 3,14·4·5=**62,8 cm³**; r=3 cm, h=4 cm → 3,14·9·4=**113,04 cm³**. Error: fer servir 2πr en lloc de πr².
- **SV04:** ortoedre 4×3×2 cm → 2(12+8+6)=**52 cm²**; cub d'aresta 4 cm → 6·16=**96 cm²**. Error: comptar tres cares en lloc de sis o calcular volum. El tipus 20 avalua les parelles de cares, no l'àrea.
- **SV05:** cilindre r=2 cm, h=5 cm → lateral 2·3,14·2·5=**62,8 cm²**; desplegant cilindre de r=3 cm, h=4 cm: rectangle de **18,84 cm × 4 cm**. Error: confondre circumferència de base amb diàmetre.
- **SV06:** cilindre tancat r=2 cm, h=5 cm → 2·3,14·4+2·3,14·2·5=**87,92 cm²**; r=3 cm, h=4 cm → 2·3,14·9+2·3,14·3·4=**131,88 cm²**. Error: oblidar les dues bases.
- **SV07:** prisma V=120 cm³, Ab=20 cm² → h=120/20=**6 cm**; prisma V=144 cm³, h=8 cm → Ab=144/8=**18 cm²**. Error: multiplicar en lloc de dividir.
- **SV08:** cilindre r=2 cm, V=62,8 cm³ → h=62,8/(3,14·4)=**5 cm**; r=3 cm i V=113,04 cm³ → h=113,04/(3,14·9)=**4 cm**. Error: oblidar el quadrat del radi.
- **SV09:** dipòsit 3×2×1,5 m → 9 m³=**9.000 L**; capsa 4×3×2 dm → 24 dm³=**24 L**. Error: multiplicar per mil quan el volum ja és en dm³.
- **SV10:** dipòsit base 2×1 m i 500 L → 0,5 m³/2 m²=**0,25 m**; base 4×2 m i 2.400 L → 2,4/8=**0,3 m**. Error: dividir litres directament per m².
- **SV11:** caixa A 4×3×2 dm (24 L), B 3×3×3 dm (27 L) → **B** té més capacitat; amb bases iguals de 4×3 dm i altures 2 i 4 dm → **B**, perquè la seva altura és més gran. Error: calcular superfícies externes per comparar capacitats.
- **SV12:** per trobar volum de 4×3×2 cm, un alumne calcula 2(12+8+6)=52 → és **superfície**, volum real **24 cm³**; per a 5×4×3 cm, 2(20+15+12)=94 és superfície, volum **60 cm³**. Error: interpretar una fórmula de sis cares com a volum.

## Punts de revisió abans de validar

1. **Tipus 17 (molt important):** l'excepció `sameBase` del classificador és coherent amb el generador; provar-la tant quan s'activa com quan no, i comprovar que la UI de nivell N1/N2 no ofereix variants improcedents. La branca pot ser poc freqüent: cal test forçat de casos.
2. **Tipus 20:** el distractor «6 cares de l×w» pot coincidir amb una afirmació veritable si totes tres dimensions fossin iguals, però el codi força h≠w i escull l d'un conjunt diferent; validar totes les combinacions i la unicitat real.
3. **Tipus 13/14:** l'objectiu és capacitat: el càlcul del volum és instrumental, i cal valorar si són una única família genuïna o dues variants d'escalat.
4. **Tipus 12:** un volum de cilindre arrodonit a dues decimals es torna a dividir per πr²; amb els valors del codi (π=3,14, radi i altura enters), no apareix desviació perquè πr²h té com a màxim dos decimals, però cal provar el format de resposta.
5. **Tipus 8/19:** comparteixen el desplegament lateral; distingir si conèixer les dimensions del rectangle exigeix una família nova o només canvia el format de pregunta.
6. **N3:** no s'ha trobat un repte genuí de restriccions o reconstrucció no immediata entre els vint tipus. No inventar N3 per satisfer les quotes.
7. **Solapaments** amb `Unitats i conversions` (volum–capacitat), `Perímetres i àrees` (superfícies), `Pitàgores` i `Problemes de mesura`; contrast transversal pendent.

**Fet anteriorment:** inspecció de les 20 branques i del mapa efectiu, amb exemples aritmètics. La prova ampliada de modes ara cobreix els 20 tipus i totes dues variants de superficies:17 amb DOM simulat; resultat local success, workflow integrat pendent. **No és una prova visual en navegador ni cobreix totes les respostes textuals.** Resten la decisió docent sobre els dos canvis de mapa proposats (superficies:8 i 14), la revisió humana final de famílies, les fitxes/exàmens i la comprovació curricular normativa externa. La PR #49 continua sent d'auditoria, no un canvi funcional.


## Revisió del bloc i reconciliació de nivells · 21/11/2026

La lectura comparada de les 20 decisions manté provisionalment: volum rectangular/prisma/cub com a nucli directe (SV01), amb el prisma triangular compost (SV02) i el cilindre (SV03) com a procediments candidats diferenciats; superfície de capsa/cub com a variants de recompte (SV04); desplegament lateral de cilindre (SV05), amb càlcul d'àrea al 8 i identificació de dimensions al 19; superfície total cilíndrica (SV06); inversions de V=Ab·h (SV07), amb l'àrea circular del cilindre com a pas extra a SV08; capacitat de recipient (SV09) amb escalat diferent m³→L o dm³=L; i profunditat inversa (SV10). El tipus 17 és mixt: la branca sameBase compara altures (N1), mentre la resta calcula i compara volums (N2). El diagnòstic 18 no s'agrupa amb el diagnòstic de perímetres 18 només pel format. El tipus 20 s'ha separat de la família de superfície total: demana reconèixer parelles de cares, no sumar-ne les àrees.

| Tipus | Mapa efectiu | Proposta candidata | Estat de la revisió |
|---|---|---|---|
| superficies:7 | N1 | N1 | Reconciliat: fórmula directa amb dades donades. |
| superficies:8 | N1 | N2 | **Discrepància pendent:** desplegar la superfície lateral i identificar el rectangle afegeix una modelització espacial; recomanació N2, pendent de validació docent. |
| superficies:14 | N2 | N1 | **Discrepància pendent:** el producte de dimensions i la identitat dm³=L són directes; recomanació N1, coherent amb problemes:4. |
| superficies:18 | N1 | N1 | Reconciliat: diagnòstic tancat, amb error i distractors explícits. |
| superficies:20 | N2 | N2 | Reconciliat: cal associar les tres parelles de cares amb les dimensions de la capsa. |

Aquests candidats no són nivells aprovats i no justifiquen canvis automàtics al mapa. La bateria de modes cobreix ara 104 casos totals: els 20 tipus de Superfícies i Volums, tots els de Unitats, Escales i Perímetres/Àrees, les dues branques de unitats:6 i superficies:17, i mostres dels altres temes. Resultat local success; la integració ha de confirmar el commit.
