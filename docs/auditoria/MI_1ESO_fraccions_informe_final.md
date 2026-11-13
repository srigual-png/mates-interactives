# Auditoria final — Fraccions · 1r d’ESO

- Base: `main` a `867ce909f121200bf1552bb75578658936034b88` (PR #22).
- Tema: `fraccions` · sentit numèric.
- Criteri: una família és un procediment matemàtic; els identificadors de generador són variants o rutes, no famílies per si sols.
- Referència curricular: les orientacions XTEC de 1r ESO inclouen representació de fraccions, pròpies/impròpies, fracció d’un nombre amb representacions i fraccions equivalents. [Orientacions curriculars de Matemàtiques per cursos (XTEC)](https://xtec.gencat.cat/web/.content/curriculum/eso/concrecions-curriculars/Orientacions-curriculars_MAT_SEC_per-cursos.pdf).

## Inventari i classificació

El generador declara 23 rutes, inicialment 9 N1, 9 N2 i 5 N3. En consolidar variants queden 19 famílies: 9 N1, 9 N2 i 1 N3.

| Família definitiva | Generadors | Nivells anteriors per ruta | Nivell final | Justificació |
|---|---|---|---:|---|
| Equivalència i simplificació de fraccions (`equivalencia-fraccions`) | `F01`, `F06`, `F20` | N1, N2 | N1 | F01 exigeix forma irreductible; F06 accepta qualsevol representant equivalent i F20 aplica el factor determinat pel denominador. Són les tres direccions d’una mateixa relació multiplicativa. |
| Suma de fraccions (`suma-fraccions`) | `F02` | N2 | N2 | Combina parts de la mateixa mida, amb denominador igual o comú. La variant de denominadors iguals continua sent N2 perquè forma part de la mateixa família que la suma amb denominadors diferents. |
| Multiplicació de fraccions (`producte-fraccions`) | `F03` | N1 | N1 | Multiplicació directa de numeradors i denominadors, amb reducció del resultat quan escau. |
| Divisió de fraccions (`divisio-fraccions`) | `F04` | N1 | N1 | Transforma una divisió en multiplicació per la inversa del divisor no nul. |
| Comparació de fraccions (`comparar-fraccions`) | `F05` | N2 | N1 | Comparació directa de dues fraccions positives amb productes creuats; es puja de N2 a N1 perquè no cal combinar procediments. |
| Fracció d’una quantitat i complement (`fraccio-quantitat`) | `F07`, `F09` | N2, N1 | N1 | F09 calcula la part directa d’un conjunt i F07 calcula el complement de la part donada; són variants directes de prendre una fracció d’una quantitat. |
| Fraccions pròpies i impròpies (`tipus-fraccio`) | `F08` | N1 | N1 | Reconeix pròpia o impròpia comparant numerador i denominador; inclou la convenció explícita que la fracció unitària és impròpia. |
| Conversió entre representacions (`representacions-fraccio`) | `F10` | N1 | N1 | Conversió directa entre fracció, expressió decimal exacta i percentatge. |
| Parts disjuntes i complement (`parts-disjuntes`) | `F11`, `F15` | N2 | N2 | F11 suma parts disjuntes (iguals o diferents denominadors) i F15 troba el complement de parts disjuntes respecte de la unitat. |
| Fracció d’una fracció (`fraccio-duna-fraccio`) | `F12` | N2 | N2 | Multiplica la fracció d’una part per la fracció del total i calcula la quantitat corresponent. |
| Retirades successives (`retirades-successives`) | `F13` | N2 | N2 | Aplica cada retirada a la quantitat de referència actualitzada; és un problema contextual de més d’un pas. |
| Reconstruir el total (`reconstruir-total`) | `F14` | N3 | N2 | Inverteix una sola aplicació de fracció per recuperar el total; és un pas invers habitual (N2), no una reconstrucció complexa N3. |
| Comparar i trobar la diferència (`comparar-i-restar`) | `F16` | N2 | N2 | Combina la comparació amb la resta de la fracció menor a la major i informa dues respostes. |
| Reconstrucció successiva (`reconstruccio-successiva`) | `F17` | N3 | N3 | Desfà en ordre invers dues fraccions aplicades sobre quantitats successives i una retirada fixa; és l’únic procediment amb reconstrucció multietapa del catàleg. |
| Lectura de representacions visuals (`representacio-visual`) | `F18` | N1 | N1 | Llegeix una representació d’una unitat dividida en parts iguals; comprova el total i les parts pintades. |
| Quocient expressat com a nombre mixt (`quocient-nombre-mixt`) | `F19` | N1 | N1 | Interpreta el quocient i el residu com a unitats senceres més una fracció pròpia. |
| Diagnosi d’errors amb fraccions (`diagnosticar-errors`) | `F21` | N3 | N2 | Identifica un error conceptual localitzat en una transformació o operació. Requereix comprendre la regla, però no una justificació multietapa; per això queda a N2. |
| Reconstruir un sumand (`sumand-desconegut`) | `F22` | N3 | N2 | Desfà una suma amb una resta i denominador comú; inversió directa d’una operació, adequada a N2. |
| Fracció intermèdia amb restricció (`fraccio-intermedia`) | `F23` | N3 | N2 | Busca l’únic numerador enter que queda entre dos extrems amb denominador fixat. Hi ha una restricció, sense reconstrucció multietapa; N2. |

## Exemples generats i resolts

Cada exemple s’ha generat pel generador indicat. Les respostes s’han contrastat amb un oracle independent a les proves.

### Equivalència i simplificació de fraccions — N1 (`equivalencia-fraccions`)

**Exemple 1 · F01. Enunciat:** Expressa 15/25 com una fracció irreductible.

**Resolució:**
- El MCD de 15 i 25 és 5.
- Divideix numerador i denominador pel MCD: 3/5. Una fracció equivalent sense reduir té el valor correcte, però no la forma irreductible exigida.

**Resposta:** 3/5 · **Nivell:** N1.

**Exemple 2 · F06. Enunciat:** Escriu una fracció equivalent a 4/5.

**Resolució:**
- Multiplica numerador i denominador pel mateix nombre no nul.
- 4/5 = 8/10. Qualsevol fracció equivalent és vàlida.

**Resposta:** 8/10 · **Nivell:** N1.

**Exemple 3 · F20. Enunciat:** 2/3 = □/9. Quin numerador falta?

**Resolució:**
- 9 ÷ 3 = 3.
- Multiplica també el numerador: 2 × 3 = 6.

**Resposta:** 6 · **Nivell:** N1.

### Suma de fraccions — N2 (`suma-fraccions`)

**Exemple 1 · F02. Enunciat:** Calcula (3/5) + (1/8).

**Resolució:**
- Denominador comú: 40.
- 3/5 = 24/40; 1/8 = 5/40.
- Sumem els numeradors: 29/40 = 29/40.

**Resposta:** 29/40 · **Nivell:** N2.

**Exemple 2 · F02. Enunciat:** Calcula (1/9) + (1/8).

**Resolució:**
- Denominador comú: 72.
- 1/9 = 8/72; 1/8 = 9/72.
- Sumem els numeradors: 17/72 = 17/72.

**Resposta:** 17/72 · **Nivell:** N2.

**Exemple 3 · F02. Enunciat:** Calcula (1/5) + (4/7).

**Resolució:**
- Denominador comú: 35.
- 1/5 = 7/35; 4/7 = 20/35.
- Sumem els numeradors: 27/35 = 27/35.

**Resposta:** 27/35 · **Nivell:** N2.

### Multiplicació de fraccions — N1 (`producte-fraccions`)

**Exemple 1 · F03. Enunciat:** Calcula (3/7) × (1/7).

**Resolució:**
- Multiplica numeradors: 3 × 1 = 3.
- Multiplica denominadors: 7 × 7 = 49.
- Resultat: 3/49 = 3/49.

**Resposta:** 3/49 · **Nivell:** N1.

**Exemple 2 · F03. Enunciat:** Calcula (4/3) × (3/6).

**Resolució:**
- Multiplica numeradors: 4 × 3 = 12.
- Multiplica denominadors: 3 × 6 = 18.
- Resultat: 12/18 = 2/3.

**Resposta:** 2/3 · **Nivell:** N1.

**Exemple 3 · F03. Enunciat:** Calcula (3/9) × (1/4).

**Resolució:**
- Multiplica numeradors: 3 × 1 = 3.
- Multiplica denominadors: 9 × 4 = 36.
- Resultat: 3/36 = 1/12.

**Resposta:** 1/12 · **Nivell:** N1.

### Divisió de fraccions — N1 (`divisio-fraccions`)

**Exemple 1 · F04. Enunciat:** Calcula (5/6) ÷ (1/4).

**Resolució:**
- La inversa de 1/4 és 4/1.
- 5/6 × 4/1 = 20/6 = 10/3.

**Resposta:** 10/3 · **Nivell:** N1.

**Exemple 2 · F04. Enunciat:** Calcula (4/5) ÷ (1/5).

**Resolució:**
- La inversa de 1/5 és 5/1.
- 4/5 × 5/1 = 20/5 = 4/1.

**Resposta:** 4/1 · **Nivell:** N1.

**Exemple 3 · F04. Enunciat:** Calcula (2/9) ÷ (1/5).

**Resolució:**
- La inversa de 1/5 és 5/1.
- 2/9 × 5/1 = 10/9 = 10/9.

**Resposta:** 10/9 · **Nivell:** N1.

### Comparació de fraccions — N1 (`comparar-fraccions`)

**Exemple 1 · F05. Enunciat:** Compara: 2/5 □ 3/7.

**Resolució:**
- Compara 2 × 7 = 14 i 3 × 5 = 15.
- 2/5 < 3/7.

**Resposta:** < · **Nivell:** N1.

**Exemple 2 · F05. Enunciat:** Compara: 3/3 □ 4/4.

**Resolució:**
- Compara 3 × 4 = 12 i 4 × 3 = 12.
- 3/3 = 4/4.

**Resposta:** = · **Nivell:** N1.

**Exemple 3 · F05. Enunciat:** Compara: 2/6 □ 4/3.

**Resolució:**
- Compara 2 × 3 = 6 i 4 × 6 = 24.
- 2/6 < 4/3.

**Resposta:** < · **Nivell:** N1.

### Fracció d’una quantitat i complement — N1 (`fraccio-quantitat`)

**Exemple 1 · F07. Enunciat:** De 180 fitxes se'n gasten 3/4. Quantes en queden?

**Resolució:**
- Gastades: 180 ÷ 4 × 3 = 135.
- Restants: 180 − 135 = 45.

**Resposta:** 45 · **Nivell:** N1.

**Exemple 2 · F09. Enunciat:** Un conjunt de 252 peces es reparteix en 9 grups iguals. Quantes peces són 4/9 del conjunt?

**Resolució:**
- Cada grup té 252 ÷ 9 = 28 peces.
- Prenem 4 grups: 28 × 4 = 112.

**Resposta:** 112 · **Nivell:** N1.

**Exemple 3 · F07. Enunciat:** De 200 fitxes se'n gasten 3/4. Quantes en queden?

**Resolució:**
- Gastades: 200 ÷ 4 × 3 = 150.
- Restants: 200 − 150 = 50.

**Resposta:** 50 · **Nivell:** N1.

### Fraccions pròpies i impròpies — N1 (`tipus-fraccio`)

**Exemple 1 · F08. Enunciat:** Classifica 5/3: considerem impròpia tota fracció amb numerador igual o superior al denominador.

**Resolució:**
- 5 ≥ 3.
- Una pròpia és menor que la unitat; una impròpia és igual o superior a la unitat. Per tant és impròpia.

**Resposta:** Impròpia · **Nivell:** N1.

**Exemple 2 · F08. Enunciat:** Classifica 3/6: considerem impròpia tota fracció amb numerador igual o superior al denominador.

**Resolució:**
- 3 < 6.
- Una pròpia és menor que la unitat; una impròpia és igual o superior a la unitat. Per tant és pròpia.

**Resposta:** Pròpia · **Nivell:** N1.

**Exemple 3 · F08. Enunciat:** Classifica 8/7: considerem impròpia tota fracció amb numerador igual o superior al denominador.

**Resolució:**
- 8 ≥ 7.
- Una pròpia és menor que la unitat; una impròpia és igual o superior a la unitat. Per tant és impròpia.

**Resposta:** Impròpia · **Nivell:** N1.

### Conversió entre representacions — N1 (`representacions-fraccio`)

**Exemple 1 · F10. Enunciat:** Expressa 3/4 en decimal i en percentatge.

**Resolució:**
- 3 ÷ 4 = 0,75.
- 0,75 × 100 = 75%; cal que tots dos components siguin correctes.

**Resposta:** Decimal: 0,75; Percentatge: 75% · **Nivell:** N1.

**Exemple 2 · F10. Enunciat:** Expressa 2/4 en decimal i en percentatge.

**Resolució:**
- 2 ÷ 4 = 0,5.
- 0,5 × 100 = 50%; cal que tots dos components siguin correctes.

**Resposta:** Decimal: 0,5; Percentatge: 50% · **Nivell:** N1.

**Exemple 3 · F10. Enunciat:** Expressa 2/2 en decimal i en percentatge.

**Resolució:**
- 2 ÷ 2 = 1.
- 1 × 100 = 100%; cal que tots dos components siguin correctes.

**Resposta:** Decimal: 1; Percentatge: 100% · **Nivell:** N1.

### Parts disjuntes i complement — N2 (`parts-disjuntes`)

**Exemple 1 · F11. Enunciat:** De 896 llibres, 7/8 són novel·les i 1/8 són còmics, sense superposició. Quina fracció representen junts i quants llibres són?

**Resolució:**
- Les parts són disjuntes: 7/8 + 1/8 = 56/64 + 8/64 = 1/1.
- Quantitat: 896 × 64/64 = 896.

**Resposta:** Fracció conjunta: 1/1; Llibres: 896 · **Nivell:** N2.

**Exemple 2 · F15. Enunciat:** D'un pressupost de 125 € es gasta 1/5 en material i 2/5 en transport. Quina fracció i quants euros queden?

**Resolució:**
- Gastat: 1/5 + 2/5 = 3/5.
- Restant: 1 − 3/5 = 2/5.
- Euros: 125 × 2/5 = 50.

**Resposta:** Fracció restant: 2/5; Euros restants: 50 · **Nivell:** N2.

**Exemple 3 · F11. Enunciat:** De 512 llibres, 6/8 són novel·les i 2/8 són còmics, sense superposició. Quina fracció representen junts i quants llibres són?

**Resolució:**
- Les parts són disjuntes: 6/8 + 2/8 = 48/64 + 16/64 = 1/1.
- Quantitat: 512 × 64/64 = 512.

**Resposta:** Fracció conjunta: 1/1; Llibres: 512 · **Nivell:** N2.

### Fracció d’una fracció — N2 (`fraccio-duna-fraccio`)

**Exemple 1 · F12. Enunciat:** Es destina a regar 2/3 de 5/7 d'un dipòsit de 315 litres. Quina fracció del dipòsit inicial i quants litres es destinen a regar?

**Resolució:**
- Una fracció d'una fracció és un producte: 2/3 × 5/7 = 10/21.
- Litres: 315 × 10/21 = 150.

**Resposta:** Fracció del total: 10/21; Litres: 150 · **Nivell:** N2.

**Exemple 2 · F12. Enunciat:** Es destina a regar 5/7 de 2/8 d'un dipòsit de 560 litres. Quina fracció del dipòsit inicial i quants litres es destinen a regar?

**Resolució:**
- Una fracció d'una fracció és un producte: 5/7 × 2/8 = 5/28.
- Litres: 560 × 10/56 = 100.

**Resposta:** Fracció del total: 5/28; Litres: 100 · **Nivell:** N2.

**Exemple 3 · F12. Enunciat:** Es destina a regar 6/8 de 3/6 d'un dipòsit de 432 litres. Quina fracció del dipòsit inicial i quants litres es destinen a regar?

**Resolució:**
- Una fracció d'una fracció és un producte: 6/8 × 3/6 = 3/8.
- Litres: 432 × 18/48 = 162.

**Resposta:** Fracció del total: 3/8; Litres: 162 · **Nivell:** N2.

### Retirades successives — N2 (`retirades-successives`)

**Exemple 1 · F13. Enunciat:** Hi ha 140 unitats. Se'n ven 3/5 i després es regala 2/7 de les que queden. Quantes en resten?

**Resolució:**
- Després de vendre: 140 × 2/5 = 56.
- La segona fracció s'aplica a aquest restant: regalem 16.
- Queden 56 − 16 = 40.

**Resposta:** 40 · **Nivell:** N2.

**Exemple 2 · F13. Enunciat:** Hi ha 60 unitats. Se'n ven 1/4 i després es regala 1/3 de les que queden. Quantes en resten?

**Resolució:**
- Després de vendre: 60 × 3/4 = 45.
- La segona fracció s'aplica a aquest restant: regalem 15.
- Queden 45 − 15 = 30.

**Resposta:** 30 · **Nivell:** N2.

**Exemple 3 · F13. Enunciat:** Hi ha 120 unitats. Se'n ven 1/3 i després es regala 3/4 de les que queden. Quantes en resten?

**Resolució:**
- Després de vendre: 120 × 2/3 = 80.
- La segona fracció s'aplica a aquest restant: regalem 60.
- Queden 80 − 60 = 20.

**Resposta:** 20 · **Nivell:** N2.

### Reconstruir el total — N2 (`reconstruir-total`)

**Exemple 1 · F14. Enunciat:** 2/7 del total són 24 alumnes. Quants alumnes hi ha en total?

**Resolució:**
- Una part val 24 ÷ 2 = 12.
- El total conté 7 parts: 12 × 7 = 84.

**Resposta:** 84 · **Nivell:** N2.

**Exemple 2 · F14. Enunciat:** 2/3 del total són 14 alumnes. Quants alumnes hi ha en total?

**Resolució:**
- Una part val 14 ÷ 2 = 7.
- El total conté 3 parts: 7 × 3 = 21.

**Resposta:** 21 · **Nivell:** N2.

**Exemple 3 · F14. Enunciat:** 3/8 del total són 12 alumnes. Quants alumnes hi ha en total?

**Resolució:**
- Una part val 12 ÷ 3 = 4.
- El total conté 8 parts: 4 × 8 = 32.

**Resposta:** 32 · **Nivell:** N2.

### Comparar i trobar la diferència — N2 (`comparar-i-restar`)

**Exemple 1 · F16. Enunciat:** La Laia ha llegit 2/6 del seu llibre i en Marc 1/6. Qui n'ha llegit una fracció més gran? Quina és la diferència entre fraccions?

**Resolució:**
- Productes creuats: 12 i 6; la fracció més gran és la de Laia.
- Resta la menor de la major: 6/36 = 1/6.

**Resposta:** Persona: Laia; Diferència entre fraccions: 1/6 · **Nivell:** N2.

**Exemple 2 · F16. Enunciat:** La Laia ha llegit 2/3 del seu llibre i en Marc 2/7. Qui n'ha llegit una fracció més gran? Quina és la diferència entre fraccions?

**Resolució:**
- Productes creuats: 14 i 6; la fracció més gran és la de Laia.
- Resta la menor de la major: 8/21 = 8/21.

**Resposta:** Persona: Laia; Diferència entre fraccions: 8/21 · **Nivell:** N2.

**Exemple 3 · F16. Enunciat:** La Laia ha llegit 5/8 del seu llibre i en Marc 3/7. Qui n'ha llegit una fracció més gran? Quina és la diferència entre fraccions?

**Resolució:**
- Productes creuats: 35 i 24; la fracció més gran és la de Laia.
- Resta la menor de la major: 11/56 = 11/56.

**Resposta:** Persona: Laia; Diferència entre fraccions: 11/56 · **Nivell:** N2.

### Reconstrucció successiva — N3 (`reconstruccio-successiva`)

**Exemple 1 · F17. Enunciat:** Una botiga ven 2/5 de les unitats que tenia. Després regala 1/3 de les que quedaven i finalment en retira 6 per a una exposició. Al final en queden 66. Quantes unitats tenia inicialment?

**Resolució:**
- Abans de retirar-ne 6, quedaven 66 + 6 = 72.
- Aquesta quantitat és 2/3 de la que hi havia abans de regalar: 72 ÷ 2 × 3 = 108.
- Això és 3/5 del total inicial: 108 ÷ 3 × 5 = 180.
- Comprovació: es venen 72, es regalen 36 i se'n retiren 6; queden 66.

**Resposta:** 180 · **Nivell:** N3.

**Exemple 2 · F17. Enunciat:** Una botiga ven 4/6 de les unitats que tenia. Després regala 1/3 de les que quedaven i finalment en retira 22 per a una exposició. Al final en queden 22. Quantes unitats tenia inicialment?

**Resolució:**
- Abans de retirar-ne 22, quedaven 22 + 22 = 44.
- Aquesta quantitat és 2/3 de la que hi havia abans de regalar: 44 ÷ 2 × 3 = 66.
- Això és 2/6 del total inicial: 66 ÷ 2 × 6 = 198.
- Comprovació: es venen 132, es regalen 22 i se'n retiren 22; queden 22.

**Resposta:** 198 · **Nivell:** N3.

**Exemple 3 · F17. Enunciat:** Una botiga ven 2/4 de les unitats que tenia. Després regala 1/4 de les que quedaven i finalment en retira 6 per a una exposició. Al final en queden 42. Quantes unitats tenia inicialment?

**Resolució:**
- Abans de retirar-ne 6, quedaven 42 + 6 = 48.
- Aquesta quantitat és 3/4 de la que hi havia abans de regalar: 48 ÷ 3 × 4 = 64.
- Això és 2/4 del total inicial: 64 ÷ 2 × 4 = 128.
- Comprovació: es venen 64, es regalen 16 i se'n retiren 6; queden 42.

**Resposta:** 128 · **Nivell:** N3.

### Lectura de representacions visuals — N1 (`representacio-visual`)

**Exemple 1 · F18. Enunciat:** Quina fracció de la unitat està pintada?[Esquema: 9 de 12 parts iguals d’una unitat estan pintades.]

**Resolució:**
- Hi ha 12 parts iguals en una unitat i 9 estan pintades.
- El denominador compta totes les parts i el numerador les pintades: 9/12.

**Resposta:** 9/12 · **Nivell:** N1.

**Exemple 2 · F18. Enunciat:** Quina fracció de la unitat està pintada?[Esquema: 6 de 10 parts iguals d’una unitat estan pintades.]

**Resolució:**
- Hi ha 10 parts iguals en una unitat i 6 estan pintades.
- El denominador compta totes les parts i el numerador les pintades: 6/10.

**Resposta:** 6/10 · **Nivell:** N1.

**Exemple 3 · F18. Enunciat:** Quina fracció de la unitat està pintada?[Esquema: 0 de 3 parts iguals d’una unitat estan pintades.]

**Resolució:**
- Hi ha 3 parts iguals en una unitat i 0 estan pintades.
- El denominador compta totes les parts i el numerador les pintades: 0/3.

**Resposta:** 0/3 · **Nivell:** N1.

### Quocient expressat com a nombre mixt — N1 (`quocient-nombre-mixt`)

**Exemple 1 · F19. Enunciat:** Repartim 5 pizzes entre 3 persones a parts iguals. Expressa les pizzes que rep cadascuna com a nombre mixt.

**Resolució:**
- 5 ÷ 3 = 1, residu 2.
- Cada persona rep 1 pizzes senceres i 2/3 de pizza.

**Resposta:** Unitats senceres: 1; Part fraccionària: 2/3 · **Nivell:** N1.

**Exemple 2 · F19. Enunciat:** Repartim 11 pizzes entre 4 persones a parts iguals. Expressa les pizzes que rep cadascuna com a nombre mixt.

**Resolució:**
- 11 ÷ 4 = 2, residu 3.
- Cada persona rep 2 pizzes senceres i 3/4 de pizza.

**Resposta:** Unitats senceres: 2; Part fraccionària: 3/4 · **Nivell:** N1.

**Exemple 3 · F19. Enunciat:** Repartim 15 pizzes entre 8 persones a parts iguals. Expressa les pizzes que rep cadascuna com a nombre mixt.

**Resolució:**
- 15 ÷ 8 = 1, residu 7.
- Cada persona rep 1 pizzes senceres i 7/8 de pizza.

**Resposta:** Unitats senceres: 1; Part fraccionària: 7/8 · **Nivell:** N1.

### Diagnosi d’errors amb fraccions — N2 (`diagnosticar-errors`)

**Exemple 1 · F21. Enunciat:** L'Ona diu que 4/3 + 4/5 = 8/8. Quin error ha comès?

**Resolució:**
- Cal un denominador comú: 20/15 + 12/15.
- Sumem els numeradors: 32/15.

**Resposta:** Ha sumat els denominadors com si fossin numeradors. · **Nivell:** N2.

**Exemple 2 · F21. Enunciat:** L'Ona simplifica 6/10 dividint només el numerador per 2 i escriu 3/10. Quin error ha comès?

**Resolució:**
- Cal dividir tots dos termes pel mateix divisor.
- 6/10 = 3/5 = 3/5.

**Resposta:** Ha dividit només el numerador en simplificar. · **Nivell:** N2.

**Exemple 3 · F21. Enunciat:** L'Ona diu que 4/3 + 1/4 = 4/12 + 1/12. Quin error ha comès?

**Resolució:**
- En multiplicar el denominador cal multiplicar també el numerador pel mateix factor.
- 16/12 + 3/12 = 19/12.

**Resposta:** Ha canviat el denominador sense transformar els numeradors. · **Nivell:** N2.

### Reconstruir un sumand — N2 (`sumand-desconegut`)

**Exemple 1 · F22. Enunciat:** Completa: 4/5 + □ = 26/20.

**Resolució:**
- Desfem la suma: 26/20 − 4/5.
- 26/20 − 16/20 = 10/20 = 1/2.

**Resposta:** 1/2 · **Nivell:** N2.

**Exemple 2 · F22. Enunciat:** Completa: 2/3 + □ = 12/9.

**Resolució:**
- Desfem la suma: 12/9 − 2/3.
- 12/9 − 6/9 = 6/9 = 2/3.

**Resposta:** 2/3 · **Nivell:** N2.

**Exemple 3 · F22. Enunciat:** Completa: 1/4 + □ = 17/20.

**Resolució:**
- Desfem la suma: 17/20 − 1/4.
- 17/20 − 5/20 = 12/20 = 3/5.

**Resposta:** 3/5 · **Nivell:** N2.

### Fracció intermèdia amb restricció — N2 (`fraccio-intermedia`)

**Exemple 1 · F23. Enunciat:** Quina fracció amb denominador 10 es troba estrictament entre 2/5 i 3/5?

**Resolució:**
- Escrivim els extrems amb denominador 10: 4/10 i 6/10.
- L'únic numerador enter intermedi és 5: 5/10. Cal conservar el denominador 10, encara que es pugui simplificar.

**Resposta:** 5/10 · **Nivell:** N2.

**Exemple 2 · F23. Enunciat:** Quina fracció amb denominador 4 es troba estrictament entre 0/1 i 1/2?

**Resolució:**
- Escrivim els extrems amb denominador 4: 0/4 i 2/4.
- L'únic numerador enter intermedi és 1: 1/4. Cal conservar el denominador 4, encara que es pugui simplificar.

**Resposta:** 1/4 · **Nivell:** N2.

**Exemple 3 · F23. Enunciat:** Quina fracció amb denominador 10 es troba estrictament entre 7/10 i 9/10?

**Resolució:**
- Escrivim els extrems amb denominador 10: 7/10 i 9/10.
- L'únic numerador enter intermedi és 8: 8/10. Cal conservar el denominador 10, encara que es pugui simplificar.

**Resposta:** 8/10 · **Nivell:** N2.

## Errors freqüents que es treballen

| Família | Error freqüent |
|---|---|
| `equivalencia-fraccions` | Dividir només un terme; donar una equivalent no irreductible quan s’exigeix; aplicar factors diferents. |
| `suma-fraccions` | Sumar també els denominadors o oblidar transformar els numeradors. |
| `producte-fraccions` | Sumar numeradors/denominadors en lloc de multiplicar; reduir només un terme. |
| `divisio-fraccions` | Invertir la primera fracció en lloc del divisor; oblidar que no es pot dividir per zero. |
| `comparar-fraccions` | Comparar numeradors o denominadors per separat sense valorar la mida de la fracció. |
| `fraccio-quantitat` | Dividir pel numerador; no restar la part gastada quan es demana el complement. |
| `tipus-fraccio` | Anomenar pròpia tota fracció amb numerador menor o igual; aquí igualtat és impròpia segons la definició indicada. |
| `representacions-fraccio` | Moure malament la coma o oblidar multiplicar per 100. |
| `parts-disjuntes` | Sumar numeradors amb denominadors diferents; sumar categories superposades com si fossin disjuntes. |
| `fraccio-duna-fraccio` | Sumar les fraccions o aplicar la segona al total inicial en lloc del subconjunt. |
| `retirades-successives` | Aplicar totes les fraccions a la quantitat inicial. |
| `reconstruir-total` | Multiplicar per la fracció coneguda en lloc de desfer-la. |
| `comparar-i-restar` | Resta amb signe incorrecte o compara només numeradors. |
| `reconstruccio-successiva` | Desfer les accions en ordre directe o aplicar una fracció al total equivocat. |
| `representacio-visual` | No distingir parts totals de parts pintades o acceptar parts de mida desigual. |
| `quocient-nombre-mixt` | Posar el quocient com a numerador o no fer pròpia la part fraccionària. |
| `diagnosticar-errors` | Confondre suma de denominadors, simplificació parcial o equivalència amb canvi del denominador només. |
| `sumand-desconegut` | Sumar el terme conegut al resultat; no trobar denominador comú. |
| `fraccio-intermedia` | Incloure un extrem, oblidar el denominador fix o donar més d’un numerador. |

## Canvis implementats

- Publicat un catàleg únic de generadors → família → nivell en `assets/js/fraccions-1eso.js`; 23 rutes agrupades en 19 famílies.
- La pràctica adaptativa continua rotant per famílies reals i evita repetir la mateixa família de manera consecutiva. `practiceKey` diferencia també les rutes generadores dins d’una família.
- El classificador compartit usa la metadada de ruta i compta famílies matemàtiques per planificar l’examen del tema. La cobertura de l’examen és 4 N1, 4 N2 i 4 N3; les rutes tradicionals continuen disponibles i es manté el codi numèric històric 1–11.
- S’han afegit les rutes F11–F23 a la bossa de generació de l’examen de tema, sense alterar altres temes.
- Banc contextual: les 7 variants de fraccions són N2, coherent amb els generadors que utilitza.
- F11 i F15 recalculen el total després de fixar denominadors iguals; abans l’enunciat podia donar un total incompatible amb les fraccions.
- No s’han tocat teoria, CSS, registre global de famílies ni pàgines d’altres temes.

## Resultats de validació

- `node scripts\comprova-fraccions-families.cjs`: 5.750 mostres, 250 per cadascuna de les 23 rutes; 19 famílies validades contra oracles racionals exactes independents, respostes, opcions, restriccions, representació visual, metadades i reconstrucció F17.
- `node scripts\comprova-fraccions-1eso.cjs`: prova integral Playwright; pràctica guiada/autònoma i modalitats oberta/múltiple, rotació de famílies sense repetició consecutiva, cobertura dels 9 generadors N1 en 20 errors, reserva N3, exàmens temàtics (12) i globals (20), banc contextual, correctors, detalls i exemples de teoria, fragments URL directes i `hashchange`, mòbil i regressions dels temes veïns.
- `node --check assets\js\fraccions-1eso.js`, `node --check assets\js\dificultat-mi.js`, `node --check scripts\comprova-fraccions-families.cjs`, `node --check scripts\comprova-fraccions-1eso.cjs`: sense errors de sintaxi.

### Incidències i límits

- Aquesta comprovació és local amb fitxers `file://`; no verifica el desplegament publicat a GitHub Pages.
- No s’ha editat la teoria ni el registre global; la validació final del contingut de producció correspon a la revisió de la PR i la validació local de Windows.

### Ordres CMD

```cmd
node --check assets\js\fraccions-1eso.js
node --check assets\js\dificultat-mi.js
node --check scripts\comprova-fraccions-families.cjs
node scripts\comprova-fraccions-families.cjs
node --check scripts\comprova-fraccions-1eso.cjs
node scripts\comprova-fraccions-1eso.cjs
```
