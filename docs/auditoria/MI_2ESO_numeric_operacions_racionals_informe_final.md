# Operacions amb nombres racionals — 2n d’ESO · Sentit numèric

## Abast i fonts

Auditoria de l’estat actual de main a partir de l’informe d’auditoria anterior, del generador i classificador compartits i de les pàgines de pràctica i teoria. S’han mantingut teoria, CSS i progressió. Es conserva l’auditoria funcional fusionada de la PR #5, revisant-la contra els 21 tipus/variants del generador actual. Les variants contextuals no es compten com famílies noves.

## Classificació definitiva

N1: operacions directes i propietats bàsiques; N2: expressions amb passos combinats; N3: reconstruir operands/resultats i justificar errors o procediments.

| ID | Família matemàtica | Nivell | Generadors / variants |
|---|---|---:|---|
| OR01 | Suma i resta d’enters amb signe | N1 | 1, 18; balance, depth |
| OR02 | Suma i resta de decimals amb signe | N1 | 2, 18; temperature |
| OR03 | Suma i resta de fraccions | N1 | 3, 16, 18; route |
| OR04 | Producte de fraccions | N1 | 4 |
| OR05 | Divisió de fraccions | N1 | 5 |
| OR06 | Unificar representacions | N2 | 6 |
| OR07 | Anticipar el signe d’un producte | N1 | 7 |
| OR08 | Aplicar la jerarquia directa | N1 | 8, 9, 17 |
| OR09 | Operar amb parèntesis abans del producte | N2 | 10 |
| OR10 | Reconstruir un sumand | N2 | 11 |
| OR11 | Reconstruir un factor | N2 | 12, 13 |
| OR12 | Estimar un producte decimal | N2 | 14 |
| OR13 | Acotar una suma amb referències | N2 | 15 |
| OR14 | Desfer dos canvis consecutius | N3 | 19 |
| OR15 | Agrupar operacions per obtenir un objectiu | N3 | 20 |
| OR16 | Raonar amb intervals i cotes | N3 | 21 |

**Total:** 16 famílies; N1/N2/N3 = 7/6/3

## Exemples generats

Tres mostres del generador per família; les respostes i passos corresponen a les dades concretes de cada enunciat.

### OR01 — Suma i resta d’enters amb signe (N1)

**Exemple 1 · tipus 1.** Calcula -2 + (-8).

**Resposta:** -10

**Resolució:** Apliquem les regles de suma i resta d’enters. El resultat és -10.

**Exemple 2 · tipus 18, variant depth.** Un submarí és a -59 m respecte del nivell del mar i ascendeix 14 m. A quina cota queda?

**Resposta:** -45

**Resolució:** La profunditat és negativa i l’ascens és una variació positiva. La cota final és -45 m.

**Exemple 3 · tipus 1.** Calcula -14 − (-5).

**Resposta:** -9

**Resolució:** Apliquem les regles de suma i resta d’enters. El resultat és -9.

### OR02 — Suma i resta de decimals amb signe (N1)

**Exemple 1 · tipus 2.** Calcula 5 − 1,6.

**Resposta:** 3,4

**Resolució:** Operem els decimals respectant els signes. Resultat: 3,4.

**Exemple 2 · tipus 18, variant temperature.** A primera hora hi havia -20,5 °C. La temperatura augmenta 14 °C. Quina temperatura hi ha després?

**Resposta:** -6,5

**Resolució:** Representem la temperatura inicial amb signe i hi sumem l’augment. La temperatura final és -6,5 °C.

**Exemple 3 · tipus 2.** Calcula -2,6 + (-2,2).

**Resposta:** -4,8

**Resolució:** Operem els decimals respectant els signes. Resultat: -4,8.

### OR03 — Suma i resta de fraccions (N1)

**Exemple 1 · tipus 3.** Calcula 1/2 + (-4/5).

**Resposta:** -3/10

**Resolució:** Busquem un denominador comú per a 1/2 i -4/5. Fem la suma dels numeradors equivalents. Simplificant obtenim -3/10.

**Exemple 2 · tipus 16.** Un alumne proposa 6/13 per a 5/6 + 1/7. Calcula la suma i tria el valor correcte.

**Resposta:** 41/42

**Resolució:** Les fraccions tenen denominadors diferents, així que les expressem amb denominador comú. 5/6 + 1/7 = 41/42. El valor proposat 6/13 no és equivalent perquè s’han sumat denominadors sense fer fraccions equivalents.

**Exemple 3 · tipus 18, variant route.** Una ruta prevista és de 4 km i ja s’han recorregut 1/5 km. Quants quilòmetres falten?

**Resposta:** 19/5

**Resolució:** Restem la distància recorreguda de la distància total. Falten 19/5 km.

### OR04 — Producte de fraccions (N1)

**Exemple 1 · tipus 4.** Calcula 1 · (-1).

**Resposta:** -1

**Resolució:** Multipliquem numeradors i denominadors. Apliquem la regla dels signes. El resultat simplificat és -1.

**Exemple 2 · tipus 4.** Calcula -5/2 · (-3/7).

**Resposta:** 15/14

**Resolució:** Multipliquem numeradors i denominadors. Apliquem la regla dels signes. El resultat simplificat és 15/14.

**Exemple 3 · tipus 4.** Calcula -3/2 · 2/3.

**Resposta:** -1

**Resolució:** Multipliquem numeradors i denominadors. Apliquem la regla dels signes. El resultat simplificat és -1.

### OR05 — Divisió de fraccions (N1)

**Exemple 1 · tipus 5.** Calcula 2/3 ÷ (-3/2).

**Resposta:** -4/9

**Resolució:** Substituïm la divisió per un producte pel recíproc de la segona fracció. Multipliquem i simplifiquem. Resultat: -4/9.

**Exemple 2 · tipus 5.** Calcula 1/2 ÷ 1.

**Resposta:** 1/2

**Resolució:** Substituïm la divisió per un producte pel recíproc de la segona fracció. Multipliquem i simplifiquem. Resultat: 1/2.

**Exemple 3 · tipus 5.** Calcula 5/7 ÷ 1.

**Resposta:** 5/7

**Resolució:** Substituïm la divisió per un producte pel recíproc de la segona fracció. Multipliquem i simplifiquem. Resultat: 5/7.

### OR06 — Unificar representacions (N2)

**Exemple 1 · tipus 6.** Calcula -4/5 − 1,1.

**Resposta:** -1,9

**Resolució:** Expressant les dues quantitats en una representació comuna podem operar-les. El resultat és -1,9 = -19/10.

**Exemple 2 · tipus 6.** Calcula 2 − -0,9.

**Resposta:** 2,9

**Resolució:** Expressant les dues quantitats en una representació comuna podem operar-les. El resultat és 2,9 = 29/10.

**Exemple 3 · tipus 6.** Calcula 5/4 + -0,3.

**Resposta:** 0,95

**Resolució:** Expressant les dues quantitats en una representació comuna podem operar-les. El resultat és 0,95 = 19/20.

### OR07 — Anticipar el signe d’un producte (N1)

**Exemple 1 · tipus 7.** Sense fer el càlcul exacte, quin signe tindrà (-5/3) · (-2/3) · (-4/3)?

**Resposta:** Negatiu

**Resolució:** Hi ha 3 factors negatius. Per tant, el resultat és negatiu.

**Exemple 2 · tipus 7.** Sense fer el càlcul exacte, quin signe tindrà (-2/3) · (-4/3) · (-5/3)?

**Resposta:** Negatiu

**Resolució:** Hi ha 3 factors negatius. Per tant, el resultat és negatiu.

**Exemple 3 · tipus 7.** Sense fer el càlcul exacte, quin signe tindrà (-3/3) · (-4/3)?

**Resposta:** Positiu

**Resolució:** Hi ha 2 factors negatius. Per tant, el resultat és positiu.

### OR08 — Aplicar la jerarquia directa (N1)

**Exemple 1 · tipus 8.** Calcula 1 − 4 · (-5).

**Resposta:** 21

**Resolució:** La multiplicació té prioritat sobre la resta. Després fem l’operació restant. Resultat: 21.

**Exemple 2 · tipus 9.** Calcula -3/5 + 2/5 · 2.

**Resposta:** 1/5

**Resolució:** Primer resolem el producte. Després fem la suma de fraccions. Resultat simplificat: 1/5.

**Exemple 3 · tipus 17.** Per calcular 4 + 3 · 7, quin ha de ser el primer pas?

**Resposta:** Fer primer 3 · 7

**Resolució:** La multiplicació té prioritat. Per tant, el primer pas és fer primer 3 · 7.

### OR09 — Operar amb parèntesis abans del producte (N2)

**Exemple 1 · tipus 10.** Calcula (5/2 − 1/3) · (-3).

**Resposta:** -13/2

**Resolució:** Primer resolem el parèntesi. Multipliquem el resultat pel factor exterior. Resultat: -13/2.

**Exemple 2 · tipus 10.** Calcula (5/3 − 1/2) · (-3).

**Resposta:** -7/2

**Resolució:** Primer resolem el parèntesi. Multipliquem el resultat pel factor exterior. Resultat: -7/2.

**Exemple 3 · tipus 10.** Calcula (4/5 − 3/5) · (-2).

**Resposta:** -2/5

**Resolució:** Primer resolem el parèntesi. Multipliquem el resultat pel factor exterior. Resultat: -2/5.

### OR10 — Reconstruir un sumand (N2)

**Exemple 1 · tipus 11.** Troba el nombre que falta: 1/4 + □ = -1/12.

**Resposta:** -1/3

**Resolució:** Utilitzem l’operació inversa de la suma. El nombre que completa la igualtat és -1/3.

**Exemple 2 · tipus 11.** Troba el nombre que falta: 3/2 + □ = -1.

**Resposta:** -5/2

**Resolució:** Utilitzem l’operació inversa de la suma. El nombre que completa la igualtat és -5/2.

**Exemple 3 · tipus 11.** Troba el nombre que falta: -1 + □ = -7/3.

**Resposta:** -4/3

**Resolució:** Utilitzem l’operació inversa de la suma. El nombre que completa la igualtat és -4/3.

### OR11 — Reconstruir un factor (N2)

**Exemple 1 · tipus 12.** Troba el nombre que falta: -1 · □ = 2/3.

**Resposta:** -2/3

**Resolució:** Utilitzem la divisió com a operació inversa de la multiplicació. El factor que falta és -2/3.

**Exemple 2 · tipus 13.** La igualtat □ · 2 = 2 és certa. Quin nombre racional hi falta?

**Resposta:** 1

**Resolució:** 2 ÷ 2 = 1. Comprovació: 1 · 2 = 2. El factor desconegut és 1.

**Exemple 3 · tipus 12.** Troba el nombre que falta: 2/3 · □ = -1/2.

**Resposta:** -3/4

**Resolució:** Utilitzem la divisió com a operació inversa de la multiplicació. El factor que falta és -3/4.

### OR12 — Estimar un producte decimal (N2)

**Exemple 1 · tipus 14.** Sense calcular exactament, a quin valor és més proper 2 · 4,8?

**Resposta:** 10

**Resolució:** 2 · 4,8 = 9,6. La distància a 10 és menor que la distància a les fites veïnes. Per tant, la fita més propera és 10.

**Exemple 2 · tipus 14.** Sense calcular exactament, a quin valor és més proper 18 · 45?

**Resposta:** 1000

**Resolució:** 18 · 45 = 810. La distància a 1000 és menor que la distància a les fites veïnes. Per tant, la fita més propera és 1000.

**Exemple 3 · tipus 14.** Sense calcular exactament, a quin valor és més proper 5,1 · 20?

**Resposta:** 100

**Resolució:** 5,1 · 20 = 102. La distància a 100 és menor que la distància a les fites veïnes. Per tant, la fita més propera és 100.

### OR13 — Acotar una suma amb referències (N2)

**Exemple 1 · tipus 15.** Sense calcular exactament, en quin interval està 5/6 + 7/8?

**Resposta:** 1≤x<2

**Resolució:** Compare la suma amb nombres de referència: 0, 1 i 2. La suma exacta és 41/24, que pertany a 1≤x<2. La resposta és 1≤x<2.

**Exemple 2 · tipus 15.** Sense calcular exactament, en quin interval està 2/5 + 3/5?

**Resposta:** 1≤x<2

**Resolució:** Compare la suma amb nombres de referència: 0, 1 i 2. La suma exacta és 1, que pertany a 1≤x<2. La resposta és 1≤x<2.

**Exemple 3 · tipus 15.** Sense calcular exactament, en quin interval està 5/6 + 7/8?

**Resposta:** 1≤x<2

**Resolució:** Compare la suma amb nombres de referència: 0, 1 i 2. La suma exacta és 41/24, que pertany a 1≤x<2. La resposta és 1≤x<2.

### OR14 — Desfer dos canvis consecutius (N3)

**Exemple 1 · tipus 19.** Un dipòsit contenia una quantitat inicial desconeguda. Se’n treuen 4/3 L i, després, queda 2/3 de la quantitat que hi havia en aquell moment. Al final hi ha 64/9 L. Quina quantitat hi havia al començament?

**Resposta:** 12

**Resolució:** Desfem primer la multiplicació per 2/3: 64/9 ÷ 2/3 = 32/3 L. Ara desfem el canvi de 4/3 L: 32/3 + 4/3 = 12 L. Comprovació: 12 − 4/3 = 32/3; 32/3 · 2/3 = 64/9 L.

**Exemple 2 · tipus 19.** Un dipòsit contenia una quantitat inicial desconeguda. S’hi afegeixen 5/2 L i, després, queda 3/2 de la quantitat que hi havia en aquell moment. Al final hi ha 81/4 L. Quina quantitat hi havia al començament?

**Resposta:** 11

**Resolució:** Desfem primer la multiplicació per 3/2: 81/4 ÷ 3/2 = 27/2 L. Ara desfem el canvi de 5/2 L: 27/2 − 5/2 = 11 L. Comprovació: 11 + 5/2 = 27/2; 27/2 · 3/2 = 81/4 L.

**Exemple 3 · tipus 19.** Un dipòsit contenia una quantitat inicial desconeguda. Se’n treuen 1/4 L i, després, queda 3/2 de la quantitat que hi havia en aquell moment. Al final hi ha 225/8 L. Quina quantitat hi havia al començament?

**Resposta:** 19

**Resolució:** Desfem primer la multiplicació per 3/2: 225/8 ÷ 3/2 = 75/4 L. Ara desfem el canvi de 1/4 L: 75/4 + 1/4 = 19 L. Comprovació: 19 − 1/4 = 75/4; 75/4 · 3/2 = 225/8 L.

### OR15 — Agrupar operacions per obtenir un objectiu (N3)

**Exemple 1 · tipus 20.** Quina agrupació dona 13? Tria A, B, C o D si cap no hi arriba.A: (1 + 3) · 3 − 4B: 1 + 3 · (3 − 4)C: (1 + 3) · (3 − 4)

**Resposta:** D

**Resolució:** A: (1 + 3) · 3 − 4 = 8 B: 1 + 3 · (3 − 4) = -2 C: (1 + 3) · (3 − 4) = -4 Cap de les opcions A, B o C dona l’objectiu 13. Els parèntesis canvien l’ordre d’algunes operacions; el producte es fa abans que la suma o la resta quan no hi ha parèntesis que indiquin una altra agrupació.

**Exemple 2 · tipus 20.** Quina agrupació dona 81? Tria A, B, C o D si cap no hi arriba.A: (5 + 6) · 7 − 1B: 5 + 6 · (7 − 1)C: (5 + 6) · (7 − 1)

**Resposta:** D

**Resolució:** A: (5 + 6) · 7 − 1 = 76 B: 5 + 6 · (7 − 1) = 41 C: (5 + 6) · (7 − 1) = 66 Cap de les opcions A, B o C dona l’objectiu 81. Els parèntesis canvien l’ordre d’algunes operacions; el producte es fa abans que la suma o la resta quan no hi ha parèntesis que indiquin una altra agrupació.

**Exemple 3 · tipus 20.** Quina agrupació dona 46? Tria A, B, C o D si cap no hi arriba.A: (2 + 5) · 7 − 3B: 2 + 5 · (7 − 3)C: (2 + 5) · (7 − 3)

**Resposta:** A

**Resolució:** A: (2 + 5) · 7 − 3 = 46 B: 2 + 5 · (7 − 3) = 22 C: (2 + 5) · (7 − 3) = 28 Només l’opció A dona l’objectiu 46. Els parèntesis canvien l’ordre d’algunes operacions; el producte es fa abans que la suma o la resta quan no hi ha parèntesis que indiquin una altra agrupació.

### OR16 — Raonar amb intervals i cotes (N3)

**Exemple 1 · tipus 21.** Una quantitat inicial x és entre 12 i 21, ambdós extrems inclosos (12 ≤ x ≤ 21). Se’n gasten exactament 1. La quantitat final ha de ser com a mínim 12. La condició és garantida, possible però no garantida, impossible o no es pot determinar?

**Resposta:** Possible, però no garantida

**Resolució:** Quantitat final mínima: 12 − 1 = 11. Quantitat final màxima: 21 − 1 = 20. L’objectiu és arribar com a mínim a 12. Algunes quantitats hi arriben i d’altres no. Conclusió: possible, però no garantida.

**Exemple 2 · tipus 21.** Una quantitat inicial x és entre 10 i 16, ambdós extrems inclosos (10 ≤ x ≤ 16). Se’n gasten exactament 3. La quantitat final ha de ser com a mínim 8. La condició és garantida, possible però no garantida, impossible o no es pot determinar?

**Resposta:** Possible, però no garantida

**Resolució:** Quantitat final mínima: 10 − 3 = 7. Quantitat final màxima: 16 − 3 = 13. L’objectiu és arribar com a mínim a 8. Algunes quantitats hi arriben i d’altres no. Conclusió: possible, però no garantida.

**Exemple 3 · tipus 21.** Una quantitat inicial x és entre 12 i 22, ambdós extrems inclosos (12 ≤ x ≤ 22). Se’n gasten exactament 1. La quantitat final ha de ser com a mínim 22. La condició és garantida, possible però no garantida, impossible o no es pot determinar?

**Resposta:** Impossible

**Resolució:** Quantitat final mínima: 12 − 1 = 11. Quantitat final màxima: 22 − 1 = 21. L’objectiu és arribar com a mínim a 22. Ni el màxim hi arriba. Conclusió: impossible.

## Teoria, validació i incidències

Els ancoratges de procediment s’han contrastat amb la pàgina de teoria. Nombres racionals i fraccions tenen apartats contextualitzats per família; operacions racionals tenen ajudes OR01–OR16. Potències exposa sis blocs generals i no té un desplegable individual per cadascuna de les 14 famílies.

`node scripts/comprova-operacions-racionals-2eso.cjs` — 7.680 mostres matemàtiques, 16 famílies (7/6/3), consultes obertes, examen de tema 4/4/4 i examen global; sense errors de pàgina.

Regressions addicionals: node scripts/comprova-numeric-lot2-regressions-2eso.cjs (240 exercicis, 30 per cadascun dels vuit temes de lot 2); node scripts/comprova-numeric-theory-2eso.cjs (ancoratges directes, hashchange, amplada mòbil 390 px i errors JavaScript).

Limitacions: Edge no s’ha pogut executar en aquest entorn; les proves de navegador s’han executat amb Chrome 157. No s’ha comprovat desplegament de GitHub Pages. La prova integral d’exportació global scripts/fitxes/test-2eso.cjs encara requereix ajustar la fixture per al catàleg heterogeni de temes i queda pendent de validació; no s’afirma que hagi passat.

