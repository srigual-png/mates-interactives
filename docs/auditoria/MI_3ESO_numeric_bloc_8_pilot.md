# 3r ESO · Sentit numèric · Bloc 8 · Recomptes

> Auditoria documental completa de `recomptes3r`. Aquesta és l’últim bloc ordinari pendent del sentit numèric de 3r.

## Abast i currículum

S’han contrastat els 17 tipus i la variant interna del tipus 12 amb el generador actual, la revisió pedagògica, els resultats simulats i els nivells actius. XTEC inclou a 3r l’ús de patrons en recomptes sistemàtics en diferents contextos mitjançant diagrames d’arbre, tècniques de combinatòria o altres estratègies ([Orientacions curriculars de matemàtiques per cursos, 3r d’ESO, p. 18](https://xtec.gencat.cat/web/.content/curriculum/eso/concrecions-curriculars/Orientacions-curriculars_MAT_SEC_per-cursos.pdf)).

“Mateixa família” conserva procediment/objectiu; “variant” canvia dades o context; “tasca diferent” requereix un procediment o decisió diferent.

## Mapa complet tipus → família i nivell

| Tipus | Família | Decisió | Nivell proposat | Raó |
|---:|---|---|---|---|
| 1 | C1 producte d’etapes independents | nucli | N1 | Multiplicar opcions de dues etapes |
| 2 | C1 | variant | N1 | Afegir una tercera etapa |
| 4 | C2 potència amb repetició | diferent | N1 | Mateix nombre d’opcions a cada posició: n^p |
| 5 | C3 cadenes de xifres amb primera restringida | diferent | N1 | Primera posició no zero, següents lliures |
| 6 | C1 | variant | N1 | Producte de tres trams/rutes |
| 9 | C1 | variant | N1 | Identificador amb dues etapes de tipus diferent |
| 14 | C1 | variant | N1 | Producte de tres característiques d’un objecte |
| 15 | C1 | variant representacional | N1 | Comptar fulles d’un arbre explícit |
| 11 | C4 principi additiu d’alternatives excloents | diferent | N1 | Sumar opcions d’una alternativa o l’altra |
| 3 | C5 ordenacions sense repetició / restricció creixent | diferent | N2 | Opcions de la segona posició disminueixen |
| 12 repetició permesa | C2 | variant | N1 | Producte amb opcions constants |
| 12 sense repetició | C5 | variant | N2 | Producte amb opcions decreixents |
| 7 | C6 ordenar tots els elements diferents | diferent | N2 | Permutació completa n·(n−1)…1 |
| 10 | C7 recompte amb condició de paritat | diferent | N2 | Triar primer unitats i després desenes admissibles |
| 8 | C8 parelles no ordenades | diferent | N2 | El producte ordenat compta cada parella dues vegades |
| 13 | C8 | variant contextual | N2 | Partits únics entre cada parella d’equips |
| 16 | C9 detectar doble recompte | diferent | N2 | Diagnosticar per què n(n−1) no és recompte final de parelles |
| 17 | C10 inferir el patró de nombres de parelles | diferent | N2 | Extendre patró i connectar increments amb n |

**Nivells proposats:** N1 per càlcul directe amb producte/suma o potència; N2 per restriccions, ordre, eliminació de dobles comptatges i inferència del patró. N3 no es força: l’inventari no inclou un problema de més complexitat curricular necessària.

## Famílies: dos exemples resolts, errors i límits

- **C1 Producte d’etapes independents (1,2,6,9,14,15).** Samarretes 6 i pantalons 4: 6·4=24 conjunts. Tres etapes amb 3,2,2 opcions: 3·2·2=12 menús. Error: sumar en comptes de multiplicar. Límit: producte només quan cal fer una tria de cada etapa; fulles d’arbre equivalen a resultats complets.
- **C2 Opcions repetibles (4,12 amb repetició).** Codi de 3 posicions amb 2 símbols: 2³=8; 6 símbols i 2 posicions amb repetició: 6²=36. Error: reduir opcions després de cada posició si repetir és permès. Límit: l’enunciat ha de dir clarament si es pot repetir.
- **C3 Cadenes de xifres, primera posició restringida (5).** Nombre de 4 xifres: 9·10³=9000; de 2 xifres: 9·10=90. Error: comptar zero com a primera xifra. Límit: nombres de longitud fixa; no confondre amb codis que poden començar per zero.
- **C4 Alternatives excloents (11).** 4 rutes de muntanya o 5 de costa: 4+5=9; 7 rutes o 3 opcions de transport: 10 opcions. Error: multiplicar branques alternatives. Límit: les opcions han de ser disjuntes; si una mateixa opció apareix en dues categories cal evitar doble recompte.
- **C5 Opcions decreixents sense repetició (3, 12 sense repetir).** Amb 4 xifres, nombres de dues xifres diferents: 4·3=12; amb 4 símbols i dues posicions sense repetició: 4·3=12. Error: usar n² encara que no es pugui repetir. Límit: primer element de domini diferent (p. ex. zero inicial) cal tractar a part.
- **C6 Permutar tots els elements (7).** 3 llibres diferents: 3·2·1=6; 4 llibres: 4·3·2·1=24. Error: tractar ordenacions com a grups sense ordre. Límit: llibres iguals o restriccions de veïnatge no estan modelats per aquest tipus.
- **C7 Condició de paritat (10).** Xifres 1–6, nombre de dues xifres parell: unitats 3 opcions (2,4,6), desenes 5 restants → 15. Si es prohibeix repetir i unitats han de ser 0,2,4,6: el cas 0 exigeix comptar desenes diferentment. Error: decidir desenes primer sense ajustar opcions. Límit: incloure zero i restriccions de repetició explícites.
- **C8 Parelles no ordenades (8,13).** 6 persones: 6·5/2=15 encaixades; 10 equips, un partit per parella: 10·9/2=45 partits. Error: comptar AB i BA dues vegades. Límit: cada parella es troba una sola vegada; si hi ha anada i tornada, ja no és el mateix model.
- **C9 Diagnosticar doble recompte (16).** 7 persones: 7·6=42 compta parelles ordenades; 42/2=21 parelles úniques. Amb 5 persones: 5·4/2=10. Error: respondre només “no” sense corregir el recompte. Límit: parelles no ordenades; no generalitzar a seqüències on l’ordre importa.
- **C10 Patró de parelles (17).** Amb n persones, parelles = n(n−1)/2; per n=8 →28; si n=6 →15 i n=7 →21, l’increment és 7. Error: extrapolar increments constants; creixen de manera consecutiva. Límit: taula curta i patrons de nombres triangulars; no es demana combinatòria formal.

Les variants d’un mateix producte no són famílies noves; les ordenacions, parelles no ordenades, alternatives i condicions restringides canvien l’estructura de recompte i es mantenen separades.

## Buit curricular i solapaments

La varietat cobreix productes d’etapes, suma d’alternatives, repetició/no repetició, primera xifra restringida, permutació, paritat, arbres i comptatge sistemàtic de parelles. No s’ha identificat un buit curricular prou concret per afegir un generador: el currículum demana estratègies de recompte sistemàtic i tècniques combinatòries, però no obliga a una família formal de combinacions amb notació específica. Les parelles i permutacions existents donen una primera representació d’aquests casos. No es dupliquen recomptes de proporcionalitat ni de potències: aquí la potència només modela posicions repetibles.

## Nivells i evidència dels modes

- **Nivells:** inventari de 17 tipus base. La revisió classifica 9 tipus N1 i 8 N2; la variant de repetició permesa del tipus 12 afegeix una branca N1, per això la cobertura simulada apareix com 10/8/0.
- **Estàtica:** inspecció del generador, estructura de preguntes, solucions, guies i opcions; a la pàgina hi ha pràctica guiada/sense pistes, resposta oberta/múltiple i mode examen.
- **Simulació existent, no repetida:** `resultats-punt3-3eso-numeric.json` registra **4.503 generacions** per a `recomptes3r` (recompte que coincideix amb la suma dels camps `n` de les 17 mostres), cobertura 10/8/0 i examen 6/6/0. Les mostres inclouen els 17 tipus, però no són una prova exhaustiva de totes les respostes obertes.
- **Visual:** no consta revisió visual de tots els arbres, taules, opcions o pantalles petites; no es declara validació visual.
- No s’ha canviat codi, nivell actiu ni registre oficial de famílies; no s’han repetit proves.

## Conclusió

El Bloc 8 queda auditat. Proposta: **9 tipus base N1 / 8 tipus base N2 / cap N3**, amb la branca de repetició del tipus 12 a N1. No es proposen exercicis nous ni es modifiquen les famílies oficials. Aquesta és l’última unitat ordinària restant del sentit numèric de 3r.
