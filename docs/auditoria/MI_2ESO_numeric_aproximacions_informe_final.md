# Aproximacions i errors — 2n d’ESO · Sentit numèric · Lot 2

## Abast i fonts

Auditoria iniciada des de `main` (`19beace8b55b45c233742fe491354fece9ce4c86`). S’han contrastat tots els generadors accessibles, les dades del classificador compartit `MIDifficulty`, la pràctica i la teoria `2eso/teoria/numeric/aproximacions-errors.html`. Les variants de generador no es compten com a famílies noves.

- **Tema:** `aproximacions`
- **Inventari:** 15 tipus de generador, repartits sense solapament entre famílies.
- **Resultat final:** 6 famílies · N1/N2/N3 = 3/3/0.
- **Nivell anterior:** tots els tipus ja estaven assignats pel classificador compartit als mateixos nivells indicats a la taula. El catàleg de fitxes, en canvi, conservava arrays antics que enviaven tipus a N3; s’ha eliminat aquesta discrepància i ara els nivells de fitxa deriven de les especificacions compartides.

## Famílies definitives i justificació

| ID estable | Família | Anterior | Final | Generadors | Justificació pedagògica |
|---|---|---:|---:|---|---|
| `aproximacio-i-arrodoniment` | Aproximació i arrodoniment | N1 | N1 | 1, 2, 3, 4 | Arrodonir, aproximar per defecte o per excés són variants de conservar les xifres demanades i aplicar una única regla local. |
| `seleccio-de-precisio` | Selecció de la precisió | N1 | N1 | 5 | Tria contextual d’una unitat de precisió adequada; és una decisió directa a partir de la magnitud i l’ús. |
| `error-absolut` | Error absolut i comparació d’errors | N1 | N1 | 6, 7, 13, 14 | Resta entre valor real i aproximat, o comparació d’aquestes diferències; el procediment és directe. |
| `error-relatiu` | Error relatiu i precisió relativa | N2 | N2 | 8, 9 | Relaciona l’error absolut amb el valor real i interpreta la proporció; afegeix normalització i conversió percentual. |
| `intervals-arrodoniment` | Intervals compatibles amb l’arrodoniment | N2 | N2 | 10, 15 | Reconstrueix els límits compatibles amb el valor arrodonit i contrasta un valor candidat; requereix dues relacions. |
| `estimacio-i-validacio` | Estimació i validació de resultats | N2 | N2 | 11, 12 | Estima el resultat i comprova si una solució és plausible; combina estimació amb verificació. |

No es força cap objectiu de recompte de famílies. Cap generador actual no requereix N3 per al nivell curricular d’aquest tema; es manté N1/N2 i la fitxa rebutja N3 abans de començar quan cap tema seleccionat pot cobrir la quota.

## Tres mostres generades per família

### Aproximació i arrodoniment (`aproximacio-i-arrodoniment`) — N1

**Generadors / variants:** 1, 2, 3, 4 · **Ajuda teòrica:** `#aproximar`

**Mostra 1 · tipus 1 · N1.** Arrodoneix 6,9616 a les mil·lèsimes .

**Resposta:** 6,962

**Resolució:** La precisió demanada és mil·lèsimes. Aplicat l’arrodoniment, obtenim 6,962.

**Mostra 2 · tipus 2 · N1.** Aproxima 3,526 a les centèsimes per defecte .

**Resposta:** 3,52

**Resolució:** Per defecte, triem el valor amb la precisió demanada que queda per sota. Resultat: 3,52.

**Mostra 3 · tipus 3 · N1.** Aproxima 7,112 a les dècimes per excés .

**Resposta:** 7,2

**Resolució:** Per excés, triem el valor amb la precisió demanada que queda per sobre. Resultat: 7,2.

### Selecció de la precisió (`seleccio-de-precisio`) — N1

**Generadors / variants:** 5 · **Ajuda teòrica:** `#aproximar`

**Mostra 1 · tipus 5 · N1.** Quina precisió és més adequada? · · Per donar aproximadament la població d’una ciutat de 250.000 habitants.

**Resposta:** Al miler d’habitants

**Resolució:** La precisió ha de ser útil per al context descrit. L’opció més adequada és: Al miler d’habitants.

**Mostra 2 · tipus 5 · N1.** Quina precisió és més adequada? · · Per indicar la distància aproximada entre dues ciutats en un cartell de carretera.

**Resposta:** Al quilòmetre

**Resolució:** La precisió ha de ser útil per al context descrit. L’opció més adequada és: Al quilòmetre.

**Mostra 3 · tipus 5 · N1.** Quina precisió és més adequada? · · Per mesurar l’alçada d’una persona en una revisió escolar.

**Resposta:** Al centímetre

**Resolució:** La precisió ha de ser útil per al context descrit. L’opció més adequada és: Al centímetre.

### Error absolut i comparació d’errors (`error-absolut`) — N1

**Generadors / variants:** 6, 7, 13, 14 · **Ajuda teòrica:** `#error-absolut`

**Mostra 1 · tipus 6 · N1.** El valor real és 62,2 i l’aproximació és 62,1 . Quin és l’ error absolut ?

**Resposta:** 0,1

**Resolució:** Calculem la diferència en valor absolut entre 62,2 i 62,1. L’error absolut és 0,1.

**Mostra 2 · tipus 7 · N1.** El valor real és 77 . Quina aproximació té menys error absolut : 80 o 72?

**Resposta:** 80

**Resolució:** 80 està a 3 unitats del valor real. 72 està a 5 unitats. Per tant, 80 té menys error absolut.

**Mostra 3 · tipus 13 · N1.** Una població real de 82.445 habitants s’indica com aproximadament 82.000 . Quin error absolut s’ha comès?

**Resposta:** 445

**Resolució:** Restem la població aproximada i la real en valor absolut. L’error absolut és de 445 habitants.

### Error relatiu i precisió relativa (`error-relatiu`) — N2

**Generadors / variants:** 8, 9 · **Ajuda teòrica:** `#error-relatiu`

**Mostra 1 · tipus 8 · N2.** El valor real és 80 i l’aproximació és 81,6 . Quin és l’ error relatiu percentual ?

**Resposta:** 2%

**Resolució:** L’error absolut és 1,6. El comparem amb el valor real 80. L’error relatiu percentual és 2%.

**Mostra 2 · tipus 9 · N2.** Dues mesures tenen el mateix error absolut de 2 . Una mesura un valor real de 20 i l’altra un valor real de 200 . Quina és proporcionalment més precisa?

**Resposta:** La mesura de 200

**Resolució:** En 20, un error de 2 representa una part més gran del valor. En 200, el mateix error representa una proporció més petita. Per tant, és més precisa proporcionalment la mesura de 200.

**Mostra 3 · tipus 8 · N2.** El valor real és 80 i l’aproximació és 84 . Quin és l’ error relatiu percentual ?

**Resposta:** 5%

**Resolució:** L’error absolut és 4. El comparem amb el valor real 80. L’error relatiu percentual és 5%.

### Intervals compatibles amb l’arrodoniment (`intervals-arrodoniment`) — N2

**Generadors / variants:** 10, 15 · **Ajuda teòrica:** `#interval`

**Mostra 1 · tipus 10 · N2.** Un nombre arrodonit a les centèsimes dona 6,5 . Quin d’aquests podria ser el valor original?

**Resposta:** 6,497

**Resolució:** Els possibles valors originals han d’estar a menys de mitja unitat de la precisió respecte de 6,5. Un valor possible és 6,497.

**Mostra 2 · tipus 15 · N2.** Una longitud s’ha arrodonit a les dècimes i el resultat és 4,2 m . En quin interval pot estar el valor real?

**Resposta:** Entre 4,15 i 4,25 (sense incloure el límit superior)

**Resolució:** Mitja dècima és 0,05. Per tant, els valors possibles van des de 4,15 fins abans de 4,25.

**Mostra 3 · tipus 10 · N2.** Un nombre arrodonit a les dècimes dona 4,7 . Quin d’aquests podria ser el valor original?

**Resposta:** 4,67

**Resolució:** Els possibles valors originals han d’estar a menys de mitja unitat de la precisió respecte de 4,7. Un valor possible és 4,67.

### Estimació i validació de resultats (`estimacio-i-validacio`) — N2

**Generadors / variants:** 11, 12 · **Ajuda teòrica:** `#estimar`

**Mostra 1 · tipus 11 · N2.** Sense fer el càlcul exacte, 19,8 · 1,98 és aproximadament...

**Resposta:** 40

**Resolució:** Podem aproximar 19,8 per 20 i 1,98 per 2. El producte queda al voltant de 40.

**Mostra 2 · tipus 12 · N2.** Un alumne afirma que 24,9 · 3,98 = 991 . Sense repetir el càlcul exacte, què pots dir?

**Resposta:** No és raonable

**Resolució:** El producte real ha d’estar aproximadament al voltant de 25 · 4. El valor 991 és aproximadament deu vegades massa gran. Per tant, no és raonable.

**Mostra 3 · tipus 11 · N2.** Sense fer el càlcul exacte, 39,7 · 1,98 és aproximadament...

**Resposta:** 80

**Resolució:** Podem aproximar 39,7 per 40 i 1,98 per 2. El producte queda al voltant de 80.

## Validació i limitacions

- Prova matemàtica: **250 mostres per tipus**; oracles independents, exactitud de resposta, unicitat, família i nivell. Resultat d’aquest tema: 3750 mostres; cobertura completa dels 6 IDs i cap error JS.
- Prova Playwright amb Chrome 157.0.8103.52: pràctica guiada/autònoma, selecció i rotació de famílies, correcció/resposta errònia, examen, enllaços i ancoratges de teoria, hashchange i viewport de 390 px; sense errors JavaScript.
- Regressions Lot 2: 30 mostres d’aquest tema i 30 de cada un dels altres tres temes ordinaris i de les quatre ampliacions.
- Fitxes: tots els 8 temes ordinaris, preguntes/solucions, quotes i duplicats; Word/PDF amb i sense solucions. Les fitxes admeten nivells només presents al catàleg real.
- El codi del popup real de teoria no s’ha pogut carregar des de `file://` en aquest sandbox. S’ha comprovat l’URL i l’ancoratge sol·licitats, i la navegació directa i `hashchange`. Chrome disponible; Edge no executat. No s’afirma que GitHub Pages s’hagi verificat.
