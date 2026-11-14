# Pensament computacional · Lot 2 · 1r ESO

Base auditada: `b046e8dd6466279b9b8e78cd8144d8f0e3fddde1` (main amb PR #40). S’han consultat els generadors i el banc C1–C6. La teoria i l’estil visual no s’han modificat.

## Inventari i classificació definitiva

| ID estable | Família | Generadors / variants | Nivell anterior | Final |
|---|---|---|---|---|
| `executar-algorisme-amb-operacions-ordenades` | Executar operacions en l’ordre indicat | `computacional:1`, C1 | tipus 1 N1; C1 N1 | N1 |
| `iterar-instruccio-additiva` | Repetir una instrucció additiva un nombre fix de vegades | `computacional:2`, C2 | tipus 2 N1; C2 N1 | N1 |
| `executar-branca-condicional` | Triar i executar una branca segons una condició | `computacional:3`, `computacional:6`, C3, C6 | tipus 3/6 N2; C3 N2, C6 N2 | N2 |
| `detectar-primer-error-dalgorisme` | Localitzar el primer pas que no respecta l’algorisme | `computacional:4`, C4 | tipus 4 N1; C4 N1 | N2 |
| `reconstruir-instruccio-absent` | Inferir una operació d’un pas entre valor inicial i final | `computacional:5`, C5 | N1 | N1 |

Els tipus 3 i 6 són variants de decisió condicional: un predicat de paritat o una comparació amb llindar. La detecció del primer error passa de N1 a N2 perquè cal recalcular i contrastar una seqüència ordenada de passos; continua sent una tasca adequada a 1r. Inferir l’operació que transforma un nombre en un altre és una operació inversa directa, per això C5 es manté a N1. Cap cas exigeix raonament N3.

## Exemples representatius

| Família / nivell | Enunciat | Resposta |
|---|---|---|
| Operacions ordenades · N1 | Comença amb 5, suma 3 i multiplica el resultat per 2. | `(5 + 3) · 2 = 16` |
|  | Comença amb 8, suma 4 i multiplica per 3. | `36` |
|  | Comença amb 6, suma 2 i després multiplica per 4. | `32` |
| Iteració additiva · N1 | Comença amb 2 i suma 5 quatre vegades. | `22` |
|  | Comença amb 7 i repeteix 3 vegades «suma 4». | `19` |
|  | Comença amb 1 i repeteix 5 vegades «suma 3». | `16` |
| Branca condicional · N2 | Si n és parell, divideix per 2; si és senar, fes 3n+1. Calcula-ho per n=9. | `28` |
|  | Aplica la mateixa regla a n=12. | `6` |
|  | Si x>10 resta 3; altrament suma 3. Calcula x=8. | `11` |
| Detectar el primer error · N2 | Inici 5; pas 1 suma 4 i dona 10; pas 2 multiplica per 3 i dona 30. | El primer error és el pas 1; havia de donar 9. |
|  | Inici 5; suma 4 i dona 9; multiplica per 3 i dona 28. | El primer error és el pas 2; havia de donar 27. |
|  | Inici 8; suma 2 i dona 11; multiplica per 4 i dona 44. | El primer error és el pas 1; havia de donar 10. |
| Reconstruir instrucció · N1 | Quina operació transforma 7 en 12? | Sumar 5. |
|  | Quina operació transforma 24 en 6? | Dividir entre 4. |
|  | Quina operació transforma 9 en 27? | Multiplicar per 3. |

## Cobertura de teoria

No s’ha editat la teoria. Les seccions visibles cobreixen `#algorisme`, `#descompondre`, `#iteracio`, `#condicio`, `#depuracio` i `#instruccio`. Chrome comprova els ancoratges, `hashchange` i amplada 390 px.

## Validació

- Test matemàtic: **3.000 mostres** (1.500 dels sis tipus interns i 1.500 dels bancs C1–C6), amb oracles independents per a aritmètica ordenada, iteració, condicions, depuració i operació inversa: superat.
- Test Playwright amb Chrome: 500 generacions, rotació sense repetició consecutiva i cobertura de les 5 famílies, etiquetes de nivell, pràctica guiada/autònoma, recuperació i exàmens: superat.
- Regressió de 30 generacions per tema per als set temes d’expansió/Lot 2, incloses les quatre ampliacions de 2n: superada.
- Limitació: no s’ha pogut validar el clic real de pràctica a teoria amb `file://`; repetir-lo amb servidor HTTP.
