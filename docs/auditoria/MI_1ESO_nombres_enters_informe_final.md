# Informe final — Nombres enters · 1r d’ESO

**Tema:** Sentit numèric · Nombres enters  
**Base:** `main` a `6c8a6a1facd183b86783523656885ae258a2bca5`  
**Branca:** `codex/enters-1eso-families-2026-11-12`  
**Data de validació:** 12-11-2026  
**Estat:** proposta preparada per a revisió; aquesta branca no s’ha fusionat.

## Resultat de l’auditoria

S’han agrupat 17 generadors E01–E17 en **15 famílies per procediment**. E07/E10 són variants de distància; E13/E14 són variants de reconstrucció mitjançant operacions inverses. Cap de les parelles es compta com dues famílies.

| Recompte | Abans | Final |
|---|---:|---:|
| Famílies N1 | 8 | 8 |
| Famílies N2 | 5 | 6 |
| Famílies N3 | 4 | 1 |
| Total | 17 | 15 |

La reducció de N3 respon a la dificultat real dels exercicis: només queda a N3 l’enumeració exhaustiva amb restriccions intermèdies. No s’han afegit famílies per acostar-se a recomptes orientatius.

## Famílies definitives i justificació de nivell

| Família | Generadors | Nivell anterior | Nivell final | Justificació pedagògica |
|---|---|---:|---:|---|
| comparar-i-ordenar-enters | E01 | N1 | N1 | Comparar parells i ordenar una llista apliquen el mateix criteri de posició a la recta; no són dues famílies. |
| sumar-enters | E02 | N1 | N1 | Regla directa de suma segons signe i valors absoluts; es manté N1. |
| restar-enters | E03 | N1 | N1 | La transformació a suma de l’oposat és un procediment directe treballat al curs; es manté N1. |
| multiplicar-enters | E04 | N1 | N1 | Producte dels valors absoluts i regla de signes; càlcul directe, N1. |
| aplicar-un-canvi-signe | E05 | N1 | N1 | Un únic canvi s’afegeix amb signe a la posició inicial; contextos i recta són variants, N1. |
| combinar-canvis-signes | E06 | N2 | N2 | Dos canvis ordenats exigeixen mantenir l’estat intermedi; N2, sense elevar-los a raonament N3. |
| valor-absolut-i-distancia | E07, E10 | N2/N1 | N1 | E07 i E10 calculen la mateixa distància no orientada (entre dos punts o des de zero). Es consoliden; E07 baixa de N2 a N1 perquè el procediment és una diferència i valor absolut directes. |
| posicio-i-desplacament-net | E08 | N2 | N2 | Cal trobar la posició final i, a més, comparar-la amb l’inici per obtenir un desplaçament signat; dos resultats relacionats, N2. |
| ordenar-moviments-amb-restriccions | E09 | N3 | N3 | Cal provar sistemàticament els sis ordres i comprovar cada posició intermèdia dins d’un interval; això justifica N3. |
| trobar-oposat-additiu | E11 | N1 | N1 | Relació immediata x + (−x)=0; es manté N1. |
| llegir-escala-de-recta | E12 | N1 | N1 | Descodificar una escala i avançar intervals és lectura/valor posicional sobre la recta, N1. |
| reconstruir-operand-additiu | E13, E14 | N3/N2 | N2 | E13 i E14 comparteixen reconstrucció amb operacions inverses. E13 baixa de N3 a N2: desfer dos canvis ordenats és una combinació habitual, no una justificació oberta. |
| diagnosticar-resta-de-negatiu | E15 | N3 | N2 | E15 baixa de N3 a N2: el cas és guiat i demana aplicar la regla resta d’un negatiu = suma de l’oposat i corregir el càlcul, sense reconstrucció extensa. |
| reflectir-respecte-dun-punt | E16 | N3 | N2 | E16 baixa de N3 a N2: calcular una distància i repetir-la a l’altra banda és una simetria lineal de dos passos, no raonament N3. |
| operacions-combinades-amb-enters | E17 | N2 | N2 | Parèntesis, producte i suma final combinen procediments habituals; N2. |

Les famílies amb més d’un nivell anterior combinen generadors que s’han consolidat en un únic procediment. En particular, E07 s’alinea amb E10 a N1; E13 s’alinea amb E14 a N2. E15 i E16 passen de N3 a N2 perquè són situacions guiades i de dos passos habituals a 1r d’ESO.

## Exemples generats

Mostra determinista de tres generacions per família, amb enunciat, resposta i nivell. Els exemples provenen de `MIEnters.generate` de la branca validada.

### comparar-i-ordenar-enters

  1. **N1 · E01** Enunciat: Completa amb <, > o =: (19) □ (-3). Resposta: **19 > -3**
  2. **N1 · E01** Enunciat: Ordena de major a menor: -2, -11, 1, -9. Resposta: **1 > -2 > -9 > -11**
  3. **N1 · E01** Enunciat: Completa amb <, > o =: (0) □ (3). Resposta: **0 < 3**

### sumar-enters

  1. **N1 · E02** Enunciat: Calcula (-16) + (-8). Resposta: **-24**
  2. **N1 · E02** Enunciat: Calcula (-5) + (-7). Resposta: **-12**
  3. **N1 · E02** Enunciat: Calcula (6) + (-2). Resposta: **4**

### restar-enters

  1. **N1 · E03** Enunciat: Calcula (-7) − (11). Resposta: **-18**
  2. **N1 · E03** Enunciat: Calcula (4) − (12). Resposta: **-8**
  3. **N1 · E03** Enunciat: Calcula (15) − (-8). Resposta: **23**

### multiplicar-enters

  1. **N1 · E04** Enunciat: Calcula (-3) × (10). Resposta: **-30**
  2. **N1 · E04** Enunciat: Calcula (8) × (11). Resposta: **88**
  3. **N1 · E04** Enunciat: Calcula (19) × (-9). Resposta: **-171**

### aplicar-un-canvi-signe

  1. **N1 · E05** Enunciat: A la recta comences a -8 i et mous 4 unitats cap a l’esquerra. On arribes? Resposta: **-12**
  2. **N1 · E05** Enunciat: La temperatura és de 3 °C i puja 11 °C. Quina temperatura fa, en °C? Resposta: **14**
  3. **N1 · E05** Enunciat: A la recta comences a 14 i et mous 2 unitats cap a l’esquerra. On arribes? Resposta: **12**

### combinar-canvis-signes

  1. **N2 · E06** Enunciat: El valor inicial de la planta és -10 plantes. Els canvis són +5 i +3 plantes. Quin és el valor final? Resposta: **-2**
  2. **N2 · E06** Enunciat: El valor inicial del saldo és 1 €. Els canvis són -8 i -10 €. Quin és el valor final? Resposta: **-17**
  3. **N2 · E06** Enunciat: El valor inicial del saldo és 12 €. Els canvis són +3 i +5 €. Quin és el valor final? Resposta: **20**

### valor-absolut-i-distancia

  1. **N1 · E07** Enunciat: Quina distància hi ha entre 19 i -3 a la recta numèrica? Respon en unitats. Resposta: **22**
  2. **N1 · E10** Enunciat: Quin és el valor absolut de -11? Resposta: **11**
  3. **N1 · E07** Enunciat: Quina distància hi ha entre 0 i 3 a la recta numèrica? Respon en unitats. Resposta: **3**

### posicio-i-desplacament-net

  1. **N2 · E08** Enunciat: Un submarinista és a -19 m. Puja 7 m i baixa 7 m. Quina és la posició final i quin desplaçament net ha fet? Resposta: **-19; 0**
  2. **N2 · E08** Enunciat: Un submarinista és a -14 m. Puja 8 m i baixa 11 m. Quina és la posició final i quin desplaçament net ha fet? Resposta: **-17; -3**
  3. **N2 · E08** Enunciat: Un submarinista és a -9 m. Puja 3 m i baixa 14 m. Quina és la posició final i quin desplaçament net ha fet? Resposta: **-20; -11**

### ordenar-moviments-amb-restriccions

  1. **N3 · E09** Enunciat: Comences a 0 en una recta numèrica. Has d'aplicar els tres moviments +6, +10 i -9, una vegada cadascun, en l'ordre que triïs. Després de CADA moviment, la posició ha de quedar entre -3 i 11, inclosos. Quants ordres diferents són possibles? Resposta: **2**
  2. **N3 · E09** Enunciat: Comences a 0 en una recta numèrica. Has d'aplicar els tres moviments +4, +10 i -8, una vegada cadascun, en l'ordre que triïs. Després de CADA moviment, la posició ha de quedar entre -4 i 18, inclosos. Quants ordres diferents són possibles? Resposta: **4**
  3. **N3 · E09** Enunciat: Comences a 0 en una recta numèrica. Has d'aplicar els tres moviments +5, +11 i -12, una vegada cadascun, en l'ordre que triïs. Després de CADA moviment, la posició ha de quedar entre -2 i 13, inclosos. Quants ordres diferents són possibles? Resposta: **1**

### trobar-oposat-additiu

  1. **N1 · E11** Enunciat: Quin és l’oposat de -17? Resposta: **17**
  2. **N1 · E11** Enunciat: Quin és l’oposat de -6? Resposta: **6**
  3. **N1 · E11** Enunciat: Quin és l’oposat de 5? Resposta: **-5**

### llegir-escala-de-recta

  1. **N1 · E12** Enunciat: Quin nombre representa el punt A?[recta graduada; Recta amb set marques equidistants: -8, -3, A, 7, 12, 17, 22.] Resposta: **2**
  2. **N1 · E12** Enunciat: Quin nombre representa el punt A?[recta graduada; Recta amb set marques equidistants: 3, 4, 5, A, 7, 8, 9.] Resposta: **6**
  3. **N1 · E12** Enunciat: Quin nombre representa el punt A?[recta graduada; Recta amb set marques equidistants: 14, 16, 18, A, 22, 24, 26.] Resposta: **20**

### reconstruir-operand-additiu

  1. **N2 · E13** Enunciat: La temperatura puja 7 °C i després baixa 6 °C. Al final és de -5 °C. Quina temperatura hi havia al principi? Resposta: **-6**
  2. **N2 · E14** Enunciat: Completa amb un enter: (5) − □ = 8. Resposta: **-3**
  3. **N2 · E13** Enunciat: La temperatura puja 9 °C i després baixa 12 °C. Al final és de 13 °C. Quina temperatura hi havia al principi? Resposta: **16**

### diagnosticar-resta-de-negatiu

  1. **N2 · E15** Enunciat: Un alumne escriu 1 − (−8) = -7. Què ha fet malament i quin és el resultat correcte? Resposta: **Ha restat el valor absolut en lloc de sumar l’oposat del nombre negatiu.; 9**
  2. **N2 · E15** Enunciat: Un alumne escriu 8 − (−3) = 5. Què ha fet malament i quin és el resultat correcte? Resposta: **Ha restat el valor absolut en lloc de sumar l’oposat del nombre negatiu.; 11**
  3. **N2 · E15** Enunciat: Un alumne escriu 3 − (−6) = -3. Què ha fet malament i quin és el resultat correcte? Resposta: **Ha restat el valor absolut en lloc de sumar l’oposat del nombre negatiu.; 9**

### reflectir-respecte-dun-punt

  1. **N2 · E16** Enunciat: Un punt és a -6. On és el punt que està a la mateixa distància de -8, però a l’altra banda? Resposta: **-10**
  2. **N2 · E16** Enunciat: Un punt és a 5. On és el punt que està a la mateixa distància de -3, però a l’altra banda? Resposta: **-11**
  3. **N2 · E16** Enunciat: Un punt és a 16. On és el punt que està a la mateixa distància de -2, però a l’altra banda? Resposta: **-20**

### operacions-combinades-amb-enters

  1. **N2 · E17** Enunciat: Calcula (-2) × (-9 − (8)) + (-5). Resposta: **29**
  2. **N2 · E17** Enunciat: Calcula (9) × (-8 − (-7)) + (4). Resposta: **-5**
  3. **N2 · E17** Enunciat: Calcula (20) × (-3 − (-4)) + (0). Resposta: **20**

## Coherència del classificador i dels bancs

- Classificador compartit: N1/N2/N3 coincideixen amb els nivells interns de les 17 rutes de pràctica.
- Cobertura adaptativa: **8/6/1** famílies per N1/N2/N3.
- Prova d’examen existent: quotes conservades **6/3/3**; tipus heretats 1–5 i 7 a N1, tipus 6 a N2.
- Banc contextual AMP: enters-1, enters-2 i enters-4 a N2; enters-3 a N1; enters-5 a N2. El generador contextual de l’escala singular/plural s’ha corregit perquè escrigui “1 unitat” i “2 unitats”.
- Raonament `moviments-amb-limits`: N3, amb validació de totes les permutacions i dels estats intermedis.

## Validació executada

| Comprovació | Resultat |
|---|---|
| `node --check scripts/comprova-enters-families.cjs` | PASS |
| `node scripts/comprova-enters-families.cjs` | PASS |
| Rutes E01–E17 | 4.250 generacions (250 per ruta), oracles matemàtics independents, opcions/correctors i acord amb el classificador |
| Raonament amb límits | 250 generacions, recompte independent de les 6 permutacions |
| Variants contextuals | 1.250 generacions (250 per variant, cinc variants), resposta i nivell |
| Rutes d’examen heretades | 1.750 generacions (250 per tipus, set tipus), resposta i nivell |
| Cobertura/catalogació | 17 generadors assignats una sola vegada a 15 famílies; distribució 8/6/1; quotes d’examen 6/3/3 |
| Casos límit | zero, signe menys Unicode, rebuig de decimals i unitats incompatibles; concordança “1 unitat” |
| `node --check scripts/comprova-enters-1eso.cjs` | PASS |
| `node scripts/comprova-enters-1eso.cjs` | BLOQUEJADA abans de carregar la pàgina: s’ha intentat executar, però Playwright no ha pogut iniciar Edge. El perfil temporal falla en substituir `SiteList-Enterprise.json` i `SiteList-Consumer.json` (error -5). |

La prova nova s’ha executat amb Node 24.22.1 sobre còpies temporals dels fitxers exactes de la branca. El fall d’Edge afecta la prova d’integració del navegador, no les comprovacions de generació que han passat. No s’ha fet una inspecció visual interactiva del tema per aquest bloqueig.

## Fitxers del canvi

- `assets/js/enters-1eso.js`: catàleg de 15 famílies, nivells interns alineats, mostra lingüística “unitat/unitats”.
- `assets/js/dificultat-mi.js`: classificació compartida i cobertura/plà d’examen coherents amb el catàleg.
- `1eso/sentit-numeric.html`: metadades dels generadors d’examen/contextuals alineades.
- `scripts/comprova-enters-1eso.cjs`: expectativa de recompte actualitzada a 8/6/1.
- `scripts/comprova-enters-families.cjs`: nova regressió de classificació, aritmètica, contextos, opcions i casos límit.
- `docs/auditoria/MI_1ESO_nombres_enters_informe_final.md`: aquest informe.

No s’han modificat teoria, CSS, progressió, temes d’altres cursos ni el registre de temes validats. El desplegament de GitHub Pages no s’ha provat perquè la PR encara no s’ha fusionat.
