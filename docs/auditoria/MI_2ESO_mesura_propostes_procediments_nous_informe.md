# Propostes curriculars per a les mancances · 2n ESO, Sentit de la mesura

**Estat: onze idees per revisar, cap família genuïna nova acreditada ni generador implementat.** Fitxa estructurada: [MI_2ESO_mesura_propostes_procediments_nous.json](MI_2ESO_mesura_propostes_procediments_nous.json).

## Punt de partida

L'auditoria del classificador existent mostra 128 tipus repartits en 64 N1, 64 N2 i cap N3. **Aquestes xifres no equivalen a famílies independents.** Hi ha un dèficit de tipus N2 a Unitats i de N1 a Problemes; per als set temes falta avaluar la viabilitat de N3 sense forçar el currículum.

La revisió de referència ha utilitzat les **orientacions curriculars de matemàtiques de Catalunya, Sentit de la mesura 2n ESO**:

- Magnitud: https://projectes.edigital.cat/orientacions-curriculars/mat_sec/magnitud1.html
- Mesurament: https://projectes.edigital.cat/orientacions-curriculars/mat_sec/mesurament1.html
- Estimació i relacions: https://projectes.edigital.cat/orientacions-curriculars/mat_sec/estimaci_i_relacions1.html

Aquestes orientacions justifiquen explorar la tria d'unitats, conversió, càlcul de mesures directes i indirectes, composició de figures, tolerància i validesa dels resultats. **No validen automàticament ni el nivell N3 ni la independència d'una nova família**.

## Onze propostes, amb advertiment de solapaments

| Codi | Tema/nivell proposat | Problema matemàtic investigat | Risc de duplicació |
|---|---|---|---|
| U-N2-01 | Unitats N2 | Comparar 1,2 dm³ i 950 mL; diferència 250 mL | Conversió i comparació ja presents |
| U-N2-02 | Unitats N2 | 0,75 m³ menys 180 L = 570 L | Composició de conversió i resta |
| U-N3-01 | Unitats N3 | Escollir el contenidor més petit que admet 600 L entre 500 i 650 L | Restricció nova, procediments coneguts |
| E-N3-01 | Escales N3 | Dos plànols 1:50 i 1:100 de la mateixa sala, 12 m² | Verificació de models, escala coneguda |
| P-N3-01 | Pitàgores N3 | Sumar diagonals 6×8 m i 5×12 m, total 23 m | Repetició del mateix teorema |
| PA-N3-01 | Perímetres N3 | Contorn exterior de rectangle i semicercle; 22,28 m | Cal justificar l'exclusió d'una vora interna |
| S-N3-01 | Superfícies N3 | Capsa oberta 4×3×2 dm: 24 L, 40 dm² de material | Volum i àrea de caixa existents |
| EST-N3-01 | Estimació N3 | Error relatiu A=1% / B=1,5% i tolerància 1,2% | Càlcul d'errors ja existent |
| PR-N3-01 | Problemes N3 | Plànol, perímetre, porta i rotlles: 3 unitats | Procediments ja existents combinats |
| PR-N1-01 | Problemes N1 | Paret de 12 m², cobertura 4 m²/pot: 3 pots | **Reforç del tipus Problemes 1; no família nova** |
| PR-N1-02 | Problemes N1 | 3 dm³ = 3 L | **Duplicat funcional d'Unitats 12/16; no família nova** |

Els codis són **identificadors de propostes documentals**, no tipus funcionals, i els nivells només expressen la **hipòtesi de dificultat** a contrastar amb una rúbrica.

## Priorització de la següent decisió pedagògica

1. **No inventar un N3:** revisar si cada proposta exigeix realment representació, modelització, contrast de restriccions o justificació, i no simplement fer més càlculs.
2. **No inflar famílies:** les dues idees de Problemes N1 no poden comptar com a noves famílies. Les propostes N2 d'Unitats i N3 compostes tenen un risc explícit de coincidència.
3. **Passar una rúbrica d'originalitat curricular:** quin objectiu d'aprenentatge nou treballa cada proposta, quines decisions ha de prendre l'alumnat, quin prerequisit exigeix i quin nucli de l'inventari de 128 tipus la cobreix ja.
4. **Només amb validació explícita**, generar dos casos diferents per proposta candidata a família, oracles matemàtics independents, quatre distractors plausibles, proves de variació i modes guiat/autònom/examen.
5. No traslladar cap decisió al registre oficial de famílies ni a la web fins a acord pedagògic i revisió funcional.

## Control tècnic

El test `scripts/test-mesura-2eso-propostes-procediments.cjs` recalcula les respostes numèriques dels onze exemples, comprova referències a tipus existents, diversitat dels set temes i advertiments de no aprovació. **GitHub Actions #44049001744: success**.

Aquesta prova acredita l'aritmètica dels exemples i la integritat de l'inventari **no** la novetat matemàtica ni la idoneïtat del nivell.

No s'ha modificat cap generador, cap nivell funcional, `families-validades.json` ni s'ha fusionat o publicat cap PR.
