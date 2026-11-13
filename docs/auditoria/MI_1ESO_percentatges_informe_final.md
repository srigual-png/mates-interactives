# Auditoria final — Percentatges, 1r d’ESO

- **Repositori:** `srigual-png/mates-interactives`
- **Branca base:** `main`
- **SHA base verificat en iniciar:** `429e8d09952e41c043d68883cbfcd4d7654b9884`
- **Branca de treball:** `codex/percentatges-1eso-families-2026-11-13`
- **Tema de pràctica:** `percentatges`
- **Resultat:** 13 famílies matemàtiques: **2 N1, 8 N2 i 3 N3**.
- **Abast:** revisió de generadors, nivells i coherència dels enllaços de teoria a l’examen. No s’ha modificat la teoria, el CSS, la progressió ni el registre global de famílies.

## Criteri curricular i de classificació

Les orientacions curriculars de XTEC per a 1r proposen identificar situacions de proporcionalitat directa i usar fraccions per resoldre problemes de proporcionalitat i percentatges. El currículum tracta els percentatges —també els superiors al 100%— dins el raonament proporcional ([orientacions per cursos](https://xtec.gencat.cat/web/.content/curriculum/eso/concrecions-curriculars/Orientacions-curriculars_MAT_SEC_per-cursos.pdf), [orientacions per sentits](https://xtec.gencat.cat/web/.content/curriculum/eso/concrecions-curriculars/Orientacions-curriculars_MAT_SEC_per-sentits.pdf)).

He agrupat per procediment i no per codi de generador. Les conversions de fracció, decimal i percentatge comparteixen una mateixa representació proporcional; la graella de 100 cel·les és una representació visual d’aquesta família. En canvi, calcular el total a partir d’una part percentual és diferent de recuperar un preu inicial després d’un canvi: aquest darrer procediment primer identifica el percentatge que queda i després desfà el factor.

Els recomptes 15/5/5/3 del protocol són orientatius. No he creat famílies per acostar-m’hi: els procediments reals justifiquen 13 famílies.

## Catàleg final i canvi de nivell

| Família i procediments/generadors | Nivell anterior | Nivell final | Justificació |
|---|---:|---:|---|
| **Calcular un percentatge d’una quantitat** · Q01 | N1 | N1 | Aplicació directa de (p/100) a una base coneguda. Ara inclou percentatges majors que 100 sense crear una família nova. |
| **Representacions equivalents** · Q05 (quatre sentits de conversió) i Q10 (graella) | N1 + N1 | N1 | La graella compta parts iguals i les expressa sobre 100; és una variant visual del mateix significat de percentatge. |
| **Trobar el percentatge que representa una part** · Q02 | N1 | **N2** | Cal identificar el total com a base, dividir part per total i escalar a 100; combina dos passos i evita confondre percentatge amb quantitat. |
| **Reconstruir un total a partir d’una part i el percentatge** · Q03-total, Q03-unitari | N3 | **N2** | És una inversió proporcional directa: dividir la part pel percentatge decimal. La variant unitària passa per l’1%; no cal raonament amb restriccions propi de N3. |
| **Preu final després d’un augment o descompte** · Q04-augment, Q04-descompte | N2 | N2 | Calcula el canvi sobre el preu inicial i suma’l o resta’l; procediment habitual de dos passos. |
| **Taxa de variació** · Q06 | N2 | N2 | Calcula la diferència i la compara amb el valor inicial; la base inicial es manté explícita. |
| **Canvis percentuals successius** · Q07 | N2 | N2 | Aplica el segon canvi sobre el valor intermedi, no sobre la base original. |
| **Complement fins al 100%** · Q08 | N2 | N2 | Reconeix categories excloents i exhaustives, resta els percentatges i calcula la part restant. |
| **Comparar ofertes amb preu inicial conegut** · Q11 | N2 | N2 | Calcula dos imports finals amb descompte i val i els compara amb una base comuna. |
| **Diferència en punts percentuals** · Q13 | N2 | N2 | Resta dues taxes i distingeix aquesta diferència del canvi relatiu respecte de la taxa inicial. |
| **Recuperar el preu inicial després d’un augment o descompte** · Q03-descompte, Q03-augment | Formava part de Q03 (N3) | N3 | Se separa de la reconstrucció directa del total: cal modelar el preu final com el ((100-p)%) o ((100+p)%) de la base desconeguda i desfer el factor. |
| **Llindar estricte entre dues ofertes** · Q09 | N3 | N3 | Compara dues expressions sobre la mateixa base i justifica el primer preu enter que compleix una desigualtat estricta; es comprova també el predecessor. |
| **Diagnosticar l’error de base en canvis successius** · Q12 | N3 | N3 | Explica per què una pujada i una baixada del mateix percentatge no es cancel·len: el segon canvi usa una base diferent. |

### Canvis de classificació

- **Q02, N1 → N2:** no és una lectura immediata; requereix seleccionar el total com a base, fer la divisió part/total i convertir la proporció a percentatge.
- **Q03-total i Q03-unitari, N3 → N2:** la reconstrucció directa és una operació inversa rutinària. La ruta unitària afegeix un pas, però no introdueix restriccions ni justificació avançada.
- **Q10 s’uneix a Q05:** tant comptar cel·les pintades com convertir fracció/decimal/percentatge responen a expressar una part de la unitat sobre 100. Els quatre sentits de conversió continuen sent variants diferenciades.
- **Q03 de preu inicial queda separat:** es conserva N3 per la reconstrucció del factor després d’un canvi, però no arrossega a N3 les dues variants de total directe.
- La resta conserva el nivell anterior perquè el procediment i la demanda cognitiva no han canviat.

## Exemples treballats per família

### 1. Calcular un percentatge d’una quantitat — N1

1. **Enunciat:** Calcula el 15% de 200. **Resposta:** 30. **Càlcul:** (200·15/100=30).
2. **Enunciat:** Calcula el 125% de 40. **Resposta:** 50. **Càlcul:** (40·125/100=50). El resultat pot superar la base perquè el percentatge és superior al 100%.
3. **Enunciat:** Calcula el 75% de 400. **Resposta:** 300. **Càlcul:** (400·75/100=300), equivalent a (400÷4·3).

### 2. Representacions equivalents — N1

1. **Enunciat:** Expressa (3/8) com a percentatge. **Resposta:** 37,5%. **Càlcul:** (3÷8=0,375); (0,375·100=37,5%).
2. **Enunciat:** Converteix 0,4 en percentatge. **Resposta:** 40%. **Càlcul:** (0,4·100=40%).
3. **Enunciat:** De 100 cel·les iguals, 25 estan pintades. Quin percentatge està pintat? **Resposta:** 25%. **Càlcul:** (25/100·100=25%).

### 3. Trobar el percentatge d’una part — N2

1. **Enunciat:** 35 de 140 persones han triat teatre. Quin percentatge és? **Resposta:** 25%. **Càlcul:** (35÷140·100=25%).
2. **Enunciat:** 18 de 60 alumnes han triat una activitat. **Resposta:** 30%. **Càlcul:** (18÷60·100=30%).
3. **Enunciat:** 45 de 180 participants han acabat la prova. **Resposta:** 25%. **Càlcul:** (45÷180·100=25%).

### 4. Reconstruir un total — N2

1. **Enunciat:** 40 és el 20% d’un total. **Resposta:** 200. **Càlcul:** (40÷0,20=200); comprovació: (200·0,20=40).
2. **Enunciat:** 30 és el 15% d’un total. **Resposta:** 200. **Càlcul:** (30÷0,15=200).
3. **Enunciat:** El 30% d’un grup són 18 alumnes. **Resposta:** 60 alumnes. **Càlcul unitari:** (18÷30=0,6) alumnes per 1%; (0,6·100=60). La comprovació és (60·0,30=18).

### 5. Preu final amb augment o descompte — N2

1. **Enunciat:** Un article de 440 € té un descompte del 30%. **Resposta:** 308 €. **Càlcul:** descompte (=440·0,30=132) €; final (=440-132=308) €.
2. **Enunciat:** Un article de 80 € augmenta un 25%. **Resposta:** 100 €. **Càlcul:** augment (=80·0,25=20) €; final (=80+20=100) €.
3. **Enunciat:** Un article de 120 € té un descompte del 15%. **Resposta:** 102 €. **Càlcul:** descompte (=18) €; final (=120-18=102) €.

### 6. Taxa de variació — N2

1. **Enunciat:** Un club passa de 500 a 625 socis. **Resposta:** augment del 25%. **Càlcul:** diferència (=125); (125÷500·100=25%).
2. **Enunciat:** Una quantitat baixa de 80 a 60. **Resposta:** disminució del 25%. **Càlcul:** (20÷80·100=25%).
3. **Enunciat:** Una quantitat passa de 200 a 230. **Resposta:** augment del 15%. **Càlcul:** (30÷200·100=15%).

### 7. Percentatges successius — N2

1. **Enunciat:** 500 € augmenten un 20% i després baixen un 10%. **Resposta:** 540 €. **Càlcul:** (500·1,20=600); (600·0,90=540).
2. **Enunciat:** 200 € baixen un 10% i després un 20%. **Resposta:** 144 €. **Càlcul:** (200·0,90=180); (180·0,80=144).
3. **Enunciat:** 80 € augmenten un 25% i després baixen un 20%. **Resposta:** 80 €. **Càlcul:** (80·1,25=100); (100·0,80=80). Les variacions es compensen en aquest cas perquè els factors són inversos.

### 8. Complement percentual — N2

1. **Enunciat:** En un grup de 800 persones, A és el 20% i B el 30%; tothom tria exactament una opció. Quantes trien C? **Resposta:** 400. **Càlcul:** C (=100-20-30=50%); (800·0,50=400).
2. **Enunciat:** En un grup de 200, A és el 25% i B el 15%. **Resposta:** 120 persones. **Càlcul:** resta (=60%); (200·0,60=120).
3. **Enunciat:** De 500 respostes exclusives, A representa el 10% i B el 20%. **Resposta:** 350. **Càlcul:** resta (=70%); (500·0,70=350).

### 9. Comparar ofertes — N2

1. **Enunciat:** Preu 80 €; A descompta el 25%; B descompta el 10% i un val de 10 €. Quina és més barata? **Resposta:** A. **Càlcul:** A (=80·0,75=60) €; B (=80·0,90-10=62) €.
2. **Enunciat:** Preu 100 €; A descompta el 20%; B descompta el 10% i un val de 15 €. **Resposta:** B. **Càlcul:** A (=80) €; B (=90-15=75) €.
3. **Enunciat:** Preu 60 €; A descompta el 30%; B descompta el 20% i un val de 6 €. **Resposta:** empat. **Càlcul:** A (=42) €; B (=48-6=42) €.

### 10. Punts percentuals — N2

1. **Enunciat:** Una taxa passa del 20% al 25%. Quina és la diferència? **Resposta:** augment de 5 punts percentuals. **Càlcul:** (25-20=5) pp; el canvi relatiu seria (5÷20·100=25%).
2. **Enunciat:** Una taxa passa del 60% al 45%. **Resposta:** disminució de 15 punts percentuals. **Càlcul:** (60-45=15) pp; relatiu a l’inici és (15÷60·100=25%) de disminució.
3. **Enunciat:** Una taxa passa del 12% al 18%. **Resposta:** augment de 6 punts percentuals. **Càlcul:** (18-12=6) pp; el canvi relatiu és (6÷12·100=50%).

### 11. Recuperar el preu inicial després d’un canvi — N3

1. **Enunciat:** Un article costa 72 € després d’un descompte del 20%. **Resposta:** 90 €. **Càlcul:** queda el 80% del preu inicial; (72÷0,80=90) €; comprovació: (90·0,80=72) €.
2. **Enunciat:** Un preu final és 90 € després d’un augment del 20%. **Resposta:** 75 €. **Càlcul:** el final és el 120%; (90÷1,20=75) €.
3. **Enunciat:** Un article costa 138 € després d’un augment del 15%. **Resposta:** 120 €. **Càlcul:** (138÷1,15=120) €; comprovació: (120·1,15=138) €.

### 12. Llindar estricte d’ofertes — N3

1. **Enunciat:** A descompta el 25%; B descompta el 10% i un val de 3 €. Quin és el menor preu enter per al qual A és estrictament més barata? **Resposta:** 21 €. **Càlcul:** (0,75x<0,90x-3), per tant (x>20); 21 compleix i 20 només empata.
2. **Enunciat:** A descompta el 20%; B descompta el 5% i un val de 6 €. **Resposta:** 41 €. **Càlcul:** (0,80x<0,95x-6), per tant (x>40); el primer enter vàlid és 41.
3. **Enunciat:** A descompta el 30%; B descompta el 10% i un val de 4 €. **Resposta:** 21 €. **Càlcul:** (0,70x<0,90x-4), per tant (x>20); es verifica 21 i es descarta 20.

### 13. Diagnosticar l’error de base — N3

1. **Enunciat:** 100 € pugen un 20% i després baixen un 20%. L’Àlex diu que tornen a 100 €. Quin error comet? **Resposta:** calcula el segon descompte sobre la base original. **Càlcul:** (100·1,20=120); (120·0,80=96) €, no 100 €.
2. **Enunciat:** 80 € pugen un 25% i després baixen un 25%. **Resposta:** el resultat és 75 €; s’ha de descomptar sobre 100 €. **Càlcul:** (80·1,25=100); (100·0,75=75).
3. **Enunciat:** 200 € pugen un 10% i després baixen un 10%. **Resposta:** el resultat és 198 €. **Càlcul:** (200·1,10=220); (220·0,90=198). La segona variació actua sobre 220 €, no sobre 200 €.

## Canvis implementats

- Reclassificació en el catàleg de famílies del generador i en el classificador compartit. Les dades antigues de pràctica (tipus numèrics 1–7) conserven una ruta de compatibilitat amb els nivells revisats.
- Q10 passa a formar part de Q05; Q03-total/Q03-unitari se separen de Q03-descompte/Q03-augment. Cada ruta continua sent verificable i les variants conserven el seu nivell.
- Les claus de rotació inclouen el generador a més de la família, perquè dues variants diferents de conversió amb les mateixes dades no es tractin com un duplicat.
- Q01 inclou percentatges fins al 200%, amb resultats exactes per a les bases generades.
- La categoria de problemes contextuals de percentatges passa a registrar sis variants N2 (abans 1 N1, 4 N2 i 1 N3).
- L’examen del tema ja mostra l’enllaç a la secció de teoria indicada a `percentTheory`. El camp ja hi era als exercicis, però el render compartit de la correcció no el feia servir.
- No s’ha modificat cap pàgina de teoria ni cap estil.

## Validació executada

Validació en una còpia de proves aïllada, alineada amb la pàgina i els scripts de la base SHA indicada. Ordres:

- `node --check scripts\comprova-percentatges-families.cjs` — correcte.
- `node --check scripts\comprova-percentatges-1eso.cjs` — correcte.
- `node scripts\comprova-percentatges-families.cjs` — **correcte**:
  - 20 rutes de generador × 250 mostres = **5.000 exercicis**.
  - **50.000 comprovacions bàsiques** (10 per mostra), més les comprovacions específiques de Q09 i els casos límit: nivell, família, unicitat de les quatre opcions, resposta correcta única segons oracles matemàtics independents, passos i enunciat.
  - Comprovacions addicionals de llindar estricte i enter predecessor, percentatges >100%, fraccions irreductibles, euros exactes, unitats, punts percentuals i entrades invàlides.
  - Catàleg final **13 famílies / 2-8-3**.
- `node scripts\comprova-percentatges-1eso.cjs` amb Playwright i Chrome:
  - 5.000 generacions distribuïdes en 250 proves per ruta; classificador compartit i nivell intern coincidents.
  - 40 comprovacions de resposta a la interfície (20 rutes en resposta oberta i multiresposta).
  - Rotació adaptativa: quatre escenaris, 64 preguntes en total; cap repetició consecutiva de família en les sessions adaptatives. En 20 errors consecutius apareixen les dues famílies N1.
  - 20 reserves d’exercicis N1 úniques; prova de transicions de nivell i doble enviament.
  - 60 exercicis contextuals de banc: classificació N2; 8 intents de resposta monetària amb tolerància incorrecta rebutjats.
  - Examen de tema: 12 preguntes, correcció amb 12 enllaços de teoria. Examen global: 20 preguntes.
  - Navegació directa `#preu-inicial`, canvi `hashchange` a `#error-base`, obertura del detall, i contingut resolt en els ancoratges de teoria verificats.
  - Quatre temes veïns generen una pregunta de control; errors de JavaScript del navegador: **0**.
  - Prova mòbil a 390 px amb quatre rutes, captures de pantalla i verificació que no hi ha desbordament horitzontal.
- **Edge:** Playwright no ha pogut iniciar Edge en aquest entorn. El test ha fet fallback a **Chrome instal·lat** i l’E2E ha acabat correctament.

## Incidències pendents i límits

- No s’ha pogut executar aquesta prova amb Edge; Chrome ha executat tota la suite E2E.
- No s’ha publicat ni fusionat aquesta branca, així que GitHub Pages no s’ha validat ni s’ha actualitzat.
- El catàleg global `docs/auditoria/families-validades.json` i el CSV no es modifiquen abans del merge, d’acord amb el protocol del repositori.

## Fitxers inclosos a la PR

- `assets/js/percentatges-1eso.js`
- `assets/js/dificultat-mi.js`
- `assets/js/examen-tema.js`
- `1eso/sentit-numeric.html`
- `scripts/comprova-percentatges-families.cjs` (nou)
- `scripts/comprova-percentatges-1eso.cjs`
- `docs/auditoria/MI_1ESO_percentatges_informe_final.md` (aquest informe)

## Ordres per validar a Windows CMD

Des de l’arrel del repositori, amb Node.js i la dependència Playwright disponible:

```bat
git fetch origin
git switch --track origin/codex/percentatges-1eso-families-2026-11-13
node --check scripts\comprova-percentatges-families.cjs
node --check scripts\comprova-percentatges-1eso.cjs
node scripts\comprova-percentatges-families.cjs
node scripts\comprova-percentatges-1eso.cjs
```
