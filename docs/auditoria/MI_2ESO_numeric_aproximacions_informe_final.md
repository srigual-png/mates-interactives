# Aproximacions i errors — 2n d’ESO · Sentit numèric · Lot 2

## Abast i fonts

Auditoria de la branca iniciada a `main` (`19beace8b55b45c233742fe491354fece9ce4c86`). S’han contrastat els generadors reals, la classificació compartida `MIDifficulty`, la pàgina de pràctica i les seccions de teoria indicades a continuació. Les variants són generadors que comparteixen un procediment, no famílies addicionals.

- **Tema:** `aproximacions`
- **Pàgina i teoria:** 2eso/sentit-numeric.html#aproximar; teoria 2eso/teoria/numeric/aproximacions-errors.html
- **Inventari verificat:** 15 tipus de generador coberts, sense solapaments entre famílies.
- **Famílies definitives:** 6 · N1/N2/N3 = 3/3/0

## Classificació definitiva

| ID estable | Família | Nivell | Generadors | Justificació |
|---|---|---:|---|---|
| `aproximacio-i-arrodoniment` | Aproximació i arrodoniment | N1 | 1, 2, 3, 4 | Procediment directe, reconeixement o càlcul amb una relació principal; les variacions de context i representació romanen com a generadors/variants dins la família. |
| `seleccio-de-precisio` | Selecció de la precisió | N1 | 5 | Procediment directe, reconeixement o càlcul amb una relació principal; les variacions de context i representació romanen com a generadors/variants dins la família. |
| `error-absolut` | Error absolut i comparació d’errors | N1 | 6, 7, 13, 14 | Procediment directe, reconeixement o càlcul amb una relació principal; les variacions de context i representació romanen com a generadors/variants dins la família. |
| `error-relatiu` | Error relatiu i precisió relativa | N2 | 8, 9 | Combina relacions o operacions, inverteix una proporcionalitat, analitza una restricció o valida més d’un cas; es manté a N2 perquè els passos són ensenyables a 2n i no requereixen raonament avançat de N3. |
| `intervals-arrodoniment` | Intervals compatibles amb l’arrodoniment | N2 | 10, 15 | Combina relacions o operacions, inverteix una proporcionalitat, analitza una restricció o valida més d’un cas; es manté a N2 perquè els passos són ensenyables a 2n i no requereixen raonament avançat de N3. |
| `estimacio-i-validacio` | Estimació i validació de resultats | N2 | 11, 12 | Combina relacions o operacions, inverteix una proporcionalitat, analitza una restricció o valida més d’un cas; es manté a N2 perquè els passos són ensenyables a 2n i no requereixen raonament avançat de N3. |

Els generadors en cada fila són variants del mateix procediment matemàtic. No s’han creat famílies N3 perquè el tema actual no conté cap generador que exigeixi reconstrucció o raonament amb restriccions de nivell avançat; s’ha mantingut la dificultat curricular observada al codi compartit.

## Tres mostres generades per família

### Aproximació i arrodoniment (`aproximacio-i-arrodoniment`) — N1

**Generadors:** 1, 2, 3, 4 · **Apartat de teoria:** `#aproximar`

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

**Generadors:** 5 · **Apartat de teoria:** `#aproximar`

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

**Generadors:** 6, 7, 13, 14 · **Apartat de teoria:** `#error-absolut`

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

**Generadors:** 8, 9 · **Apartat de teoria:** `#error-relatiu`

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

**Generadors:** 10, 15 · **Apartat de teoria:** `#interval`

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

**Generadors:** 11, 12 · **Apartat de teoria:** `#estimar`

**Mostra 1 · tipus 11 · N2.** Sense fer el càlcul exacte, 19,8 · 1,98 és aproximadament...

**Resposta:** 40

**Resolució:** Podem aproximar 19,8 per 20 i 1,98 per 2. El producte queda al voltant de 40.

**Mostra 2 · tipus 12 · N2.** Un alumne afirma que 24,9 · 3,98 = 991 . Sense repetir el càlcul exacte, què pots dir?

**Resposta:** No és raonable

**Resolució:** El producte real ha d’estar aproximadament al voltant de 25 · 4. El valor 991 és aproximadament deu vegades massa gran. Per tant, no és raonable.

**Mostra 3 · tipus 11 · N2.** Sense fer el càlcul exacte, 39,7 · 1,98 és aproximadament...

**Resposta:** 80

**Resolució:** Podem aproximar 39,7 per 40 i 1,98 per 2. El producte queda al voltant de 80.

## Validació i incidències

- Prova matemàtica independent: **250 mostres per tipus**; cada mostra comprova el resultat amb un oracle independent, unicitat de respostes, consistència nivell/família i absència d’errors JavaScript.
- Prova de navegador: interfície guiada/autònoma, cobertura de famílies, respostes i recuperació d’error, generació d’examen, enllaços de teoria, ancoratges directes/hashchange i viewport mòbil de 390 px.
- Chrome 157.0.8103.52; la navegació emergent a la pàgina de teoria es verifica fins a l’esdeveniment `window.open` i URL/ancoratge sol·licitat. L’entorn de fitxer local no permet carregar el popup real; aquesta part no es declara verificada.
- Suite de regressió: 30 exercicis per cadascun dels quatre temes ordinaris i quatre temes d’ampliació, sense errors de pàgina.
- Fitxes: comprovació de nivells i famílies, temes ordinaris disponibles, combinacions N1/N2, impossibilitat de N3 per a temes sense N3, Word/PDF i solucions amb/sense resolució.

Les dades de resposta d’aquestes mostres també passen la prova matemàtica; són sortides aleatòries documentals i poden repetir-se quan un generador usa una plantilla fixa.
