# Percentatges — 2n d’ESO · Sentit numèric · Lot 2

## Abast i fonts

Auditoria iniciada des de `main` (`19beace8b55b45c233742fe491354fece9ce4c86`). S’han contrastat tots els generadors accessibles, les dades del classificador compartit `MIDifficulty`, la pràctica i la teoria `2eso/teoria/numeric/percentatges.html`. Les variants de generador no es compten com a famílies noves.

- **Tema:** `percentatges`
- **Inventari:** 18 tipus de generador, repartits sense solapament entre famílies.
- **Resultat final:** 8 famílies · N1/N2/N3 = 4/4/0.
- **Nivell anterior:** tots els tipus ja estaven assignats pel classificador compartit als mateixos nivells indicats a la taula. El catàleg de fitxes, en canvi, conservava arrays antics que enviaven tipus a N3; s’ha eliminat aquesta discrepància i ara els nivells de fitxa deriven de les especificacions compartides.

## Famílies definitives i justificació

| ID estable | Família | Anterior | Final | Generadors | Justificació pedagògica |
|---|---|---:|---:|---|---|
| `significat-i-equivalencies` | Significat i representacions equivalents | N1 | N1 | 1, 2 | Interpreta el percentatge com a parts de cent i en reconeix les formes fraccionària/decimal equivalents. |
| `calcular-part-percentual` | Calcular una part percentual | N1 | N1 | 3, 8, 16, 17 | Transforma el percentatge en factor i el multiplica per la quantitat; descompte o context són variants del mateix operador. |
| `percentatge-duna-part` | Determinar quin percentatge representa una part | N1 | N1 | 4 | Relaciona part i total per determinar la taxa percentual; canvia la incògnita respecte del càlcul d’una part. |
| `canvi-percentual-directe` | Aplicar un augment o una disminució percentual | N1 | N1 | 6, 7 | Aplica el factor d’augment o disminució a un valor inicial; augment i descompte són variants directes. |
| `reconstruccio-total-inicial` | Reconstruir el total o el valor inicial | N2 | N2 | 5, 9, 10 | Desfà el factor percentual per recuperar total o valor inicial; és una inversió multiplicativa. |
| `taxa-de-variacio` | Determinar una taxa de variació percentual | N2 | N2 | 11, 12 | Calcula el canvi relatiu respecte del valor inicial i l’expressa en percentatge. |
| `canvis-successius-i-comparacio` | Analitzar canvis successius i comparar descomptes | N2 | N2 | 13, 14, 15 | Compon canvis en seqüència o compara descomptes sense sumar percentatges; combina factors. |
| `percentatge-compost-en-context` | Composició de percentatges en un context | N2 | N2 | 18 | Representa el preu total com a producte de taxa unitària i quantitat; és l’aplicació contextual del factor percentual. |

No es força cap objectiu de recompte de famílies. Cap generador actual no requereix N3 per al nivell curricular d’aquest tema; es manté N1/N2 i la fitxa rebutja N3 abans de començar quan cap tema seleccionat pot cobrir la quota.

## Tres mostres generades per família

### Significat i representacions equivalents (`significat-i-equivalencies`) — N1

**Generadors / variants:** 1, 2 · **Ajuda teòrica:** `#significat`

**Mostra 1 · tipus 1 · N1.** Què significa, en general, 120% ?

**Resposta:** 120 de cada 100

**Resolució:** 120% expressa una proporció de 120 parts de cada 100. Per tant: 120 de cada 100.

**Mostra 2 · tipus 2 · N1.** Quina equivalència representa correctament 75% ?

**Resposta:** 75% = 3/4 = 0,75

**Resolució:** 75% = 75/100. Simplificant i escrivint en decimal obtenim 75% = 3/4 = 0,75.

**Mostra 3 · tipus 1 · N1.** Què significa, en general, 60% ?

**Resposta:** 60 de cada 100

**Resolució:** 60% expressa una proporció de 60 parts de cada 100. Per tant: 60 de cada 100.

### Calcular una part percentual (`calcular-part-percentual`) — N1

**Generadors / variants:** 3, 8, 16, 17 · **Ajuda teòrica:** `#part`

**Mostra 1 · tipus 3 · N1.** Calcula el 30% de 80 .

**Resposta:** 24

**Resolució:** 30% de 80 correspon a 24. Resposta: 24.

**Mostra 2 · tipus 8 · N1.** Un article costa 40 € i té un descompte del 20% . De quants euros és el descompte?

**Resposta:** 8

**Resolució:** El 20% de 40 € és 8 €. El descompte és de 8 €.

**Mostra 3 · tipus 16 · N1.** Calcula el 200% de 60 .

**Resposta:** 120

**Resolució:** 200% és 2 vegades la quantitat. El resultat és 120.

### Determinar quin percentatge representa una part (`percentatge-duna-part`) — N1

**Generadors / variants:** 4 · **Ajuda teòrica:** `#percentatge`

**Mostra 1 · tipus 4 · N1.** De 60 alumnes, 15 compleixen una condició. Quin percentatge representen?

**Resposta:** 25%

**Resolució:** 15 de 60 representa 25 de cada 100. Percentatge: 25%.

**Mostra 2 · tipus 4 · N1.** De 80 alumnes, 24 compleixen una condició. Quin percentatge representen?

**Resposta:** 30%

**Resolució:** 24 de 80 representa 30 de cada 100. Percentatge: 30%.

**Mostra 3 · tipus 4 · N1.** De 80 alumnes, 40 compleixen una condició. Quin percentatge representen?

**Resposta:** 50%

**Resolució:** 40 de 80 representa 50 de cada 100. Percentatge: 50%.

### Aplicar un augment o una disminució percentual (`canvi-percentual-directe`) — N1

**Generadors / variants:** 6, 7 · **Ajuda teòrica:** `#augment-disminucio`

**Mostra 1 · tipus 6 · N1.** Una quantitat de 40 augmenta un 15% . Quin és el nou valor?

**Resposta:** 46

**Resolució:** L’augment és 6. Nou valor: 40 + 6 = 46.

**Mostra 2 · tipus 7 · N1.** Una quantitat de 120 disminueix un 30% . Quin és el nou valor?

**Resposta:** 84

**Resolució:** La disminució és 36. Nou valor: 120 − 36 = 84.

**Mostra 3 · tipus 6 · N1.** Una quantitat de 40 augmenta un 20% . Quin és el nou valor?

**Resposta:** 48

**Resolució:** L’augment és 8. Nou valor: 40 + 8 = 48.

### Reconstruir el total o el valor inicial (`reconstruccio-total-inicial`) — N2

**Generadors / variants:** 5, 9, 10 · **Ajuda teòrica:** `#total`

**Mostra 1 · tipus 5 · N2.** El 20% d’una quantitat són 16 . Quina és la quantitat total?

**Resposta:** 80

**Resolució:** 16 representa el 20% del total. El 100% correspon a 80.

**Mostra 2 · tipus 9 · N2.** Després d’un descompte del 40% , un article costa 48 € . Quin era el preu inicial?

**Resposta:** 80

**Resolució:** Després del descompte es paga el 60% del preu inicial. El preu inicial era 80 €.

**Mostra 3 · tipus 10 · N2.** Després d’un augment del 20% , una quantitat passa a ser 144 . Quin era el valor inicial?

**Resposta:** 120

**Resolució:** El valor final representa el 120% de l’original. El valor inicial era 120.

### Determinar una taxa de variació percentual (`taxa-de-variacio`) — N2

**Generadors / variants:** 11, 12 · **Ajuda teòrica:** `#variacio`

**Mostra 1 · tipus 11 · N2.** Una quantitat passa de 100 a 130 . Quin és el percentatge d’augment?

**Resposta:** 30%

**Resolució:** L’augment és 30. Comparat amb 100, representa un 30%.

**Mostra 2 · tipus 12 · N2.** Una quantitat passa de 50 a 45 . Quin és el percentatge de disminució?

**Resposta:** 10%

**Resolució:** La disminució és 5. Respecte del valor inicial, és un 10%.

**Mostra 3 · tipus 11 · N2.** Una quantitat passa de 40 a 60 . Quin és el percentatge d’augment?

**Resposta:** 50%

**Resolució:** L’augment és 20. Comparat amb 40, representa un 50%.

### Analitzar canvis successius i comparar descomptes (`canvis-successius-i-comparacio`) — N2

**Generadors / variants:** 13, 14, 15 · **Ajuda teòrica:** `#successius`

**Mostra 1 · tipus 13 · N2.** Un producte rep un descompte del 10% i després un altre del 25% sobre el preu ja rebaixat. Quin és el descompte total equivalent?

**Resposta:** 32,5%

**Resolució:** Partint de 100, després del primer descompte queda 90. Després del segon queda 67,5. El descompte total és 32,5%.

**Mostra 2 · tipus 14 · N2.** Una quantitat baixa un 40% i després puja un 40% . Torna al valor inicial?

**Resposta:** No, queda per sota del valor inicial

**Resolució:** Després de baixar, el segon 40% s’aplica sobre una quantitat més petita. Per això no es recupera tot el que s’havia perdut: No, queda per sota del valor inicial.

**Mostra 3 · tipus 15 · N2.** Un producte costa 80 € . · Oferta A: 30% de descompte. · Oferta B: 12 € de descompte. · Quina oferta estalvia més diners?

**Resposta:** Oferta A

**Resolució:** Oferta A estalvia 24 €. Oferta B estalvia 12 €. La millor és Oferta A.

### Composició de percentatges en un context (`percentatge-compost-en-context`) — N2

**Generadors / variants:** 18 · **Ajuda teòrica:** `#part`

**Mostra 1 · tipus 18 · N2.** En un centre hi ha 300 alumnes . El 40% són noies i el 25% de les noies practica un esport. Quantes noies practiquen aquest esport?

**Resposta:** 30

**Resolució:** Noies: 120. El 25% de 120 és 30. Resposta: 30 noies.

**Mostra 2 · tipus 18 · N2.** En un centre hi ha 600 alumnes . El 40% són noies i el 30% de les noies practica un esport. Quantes noies practiquen aquest esport?

**Resposta:** 72

**Resolució:** Noies: 240. El 30% de 240 és 72. Resposta: 72 noies.

**Mostra 3 · tipus 18 · N2.** En un centre hi ha 400 alumnes . El 60% són noies i el 20% de les noies practica un esport. Quantes noies practiquen aquest esport?

**Resposta:** 48

**Resolució:** Noies: 240. El 20% de 240 és 48. Resposta: 48 noies.

## Validació i limitacions

- Prova matemàtica: **250 mostres per tipus**; oracles independents, exactitud de resposta, unicitat, família i nivell. Resultat d’aquest tema: 4500 mostres; cobertura completa dels 8 IDs i cap error JS.
- Prova Playwright amb Chrome 157.0.8103.52: pràctica guiada/autònoma, selecció i rotació de famílies, correcció/resposta errònia, examen, enllaços i ancoratges de teoria, hashchange i viewport de 390 px; sense errors JavaScript.
- Regressions Lot 2: 30 mostres d’aquest tema i 30 de cada un dels altres tres temes ordinaris i de les quatre ampliacions.
- Fitxes: tots els 8 temes ordinaris, preguntes/solucions, quotes i duplicats; Word/PDF amb i sense solucions. Les fitxes admeten nivells només presents al catàleg real.
- El codi del popup real de teoria no s’ha pogut carregar des de `file://` en aquest sandbox. S’ha comprovat l’URL i l’ancoratge sol·licitats, i la navegació directa i `hashchange`. Chrome disponible; Edge no executat. No s’afirma que GitHub Pages s’hagi verificat.
