# Proporcionalitat directa — 2n d’ESO · Sentit numèric · Lot 2

## Abast i fonts

Auditoria iniciada des de `main` (`19beace8b55b45c233742fe491354fece9ce4c86`). S’han contrastat tots els generadors accessibles, les dades del classificador compartit `MIDifficulty`, la pràctica i la teoria `2eso/teoria/numeric/proporcionalitat-directa.html`. Les variants de generador no es compten com a famílies noves.

- **Tema:** `proporcionalitat`
- **Inventari:** 18 tipus de generador, repartits sense solapament entre famílies.
- **Resultat final:** 9 famílies · N1/N2/N3 = 5/4/0.
- **Nivell anterior:** tots els tipus ja estaven assignats pel classificador compartit als mateixos nivells indicats a la taula. El catàleg de fitxes, en canvi, conservava arrays antics que enviaven tipus a N3; s’ha eliminat aquesta discrepància i ara els nivells de fitxa deriven de les especificacions compartides.

## Famílies definitives i justificació

| ID estable | Família | Anterior | Final | Generadors | Justificació pedagògica |
|---|---|---:|---:|---|---|
| `reconeixement-proporcionalitat` | Reconeixement de proporcionalitat directa | N1 | N1 | 1, 2 | Decideix si el model manté una raó constant (inclòs el test del valor zero); no cal calcular una quantitat desconeguda. |
| `seleccio-estrategia-proporcional` | Selecció d’una estratègia de resolució proporcional | N1 | N1 | 9 | Tria entre factor, reducció a la unitat o proporció segons les dades; és una selecció d’estratègia directa, separada del reconeixement. |
| `taules-i-escalatge` | Completar taules i escalar quantitats | N2 | N2 | 3, 8, 16 | Completa parelles proporcionals amb factor o reducció a la unitat; combina representació tabular i càlcul. |
| `factors-i-raons-equivalents` | Factors i raons equivalents | N1 | N1 | 5, 7 | Determina el factor o aplica’l als dos termes d’una raó equivalent; és una equivalència directa. |
| `taxes-i-constant` | Taxes unitàries i constant de proporcionalitat | N1 | N1 | 4, 6, 13, 18 | Calcula quant correspon a una unitat i interpreta la constant amb les unitats correctes. |
| `compra-amb-pressupost` | Compra amb pressupost limitat | N1 | N1 | 14 | Divideix el pressupost pel preu unitari i comprova que la quantitat sigui assequible. |
| `comparacio-de-taxes` | Comparació de preus unitaris | N2 | N2 | 10 | Calcula dues taxes unitàries i compara-les; necessita dos càlculs coherents. |
| `repartiment-proporcional` | Repartiment proporcional | N2 | N2 | 11, 12 | Suma les parts de la raó, calcula el valor d’una part i assigna les quantitats (dues o tres parts són variants). |
| `diagnosi-proporcionalitat` | Detecció d’errors en relacions proporcionals | N2 | N2 | 15, 17 | Detecta un model additiu o una parella que trenca la constant; exigeix comprovar la relació. |

No es força cap objectiu de recompte de famílies. Cap generador actual no requereix N3 per al nivell curricular d’aquest tema; es manté N1/N2 i la fitxa rebutja N3 abans de començar quan cap tema seleccionat pot cobrir la quota.

## Tres mostres generades per família

### Reconeixement de proporcionalitat directa (`reconeixement-proporcionalitat`) — N1

**Generadors / variants:** 1, 2 · **Ajuda teòrica:** `#que-es`

**Mostra 1 · tipus 1 · N1.** La quantitat d’ingredients i el nombre de persones, si mantenim la mateixa recepta. · · Hi ha proporcionalitat directa?

**Resposta:** Sí, són directament proporcionals

**Resolució:** En aquesta situació es manté una mateixa quantitat per unitat. Per tant: Sí, són directament proporcionals.

**Mostra 2 · tipus 2 · N1.** Considera la relació: Els quilòmetres d’un taxi i el preu total, si hi ha una tarifa inicial fixa de 4 €. · Quina afirmació és correcta?

**Resposta:** No és proporcionalitat directa

**Resolució:** Amb 0 km el cost no és 0 €, de manera que no és proporcionalitat directa. Per tant, no és proporcionalitat directa.

**Mostra 3 · tipus 1 · N1.** Les hores treballades i el salari, si es cobra sempre el mateix per hora. · · Hi ha proporcionalitat directa?

**Resposta:** Sí, són directament proporcionals

**Resolució:** En aquesta situació es manté una mateixa quantitat per unitat. Per tant: Sí, són directament proporcionals.

### Selecció d’una estratègia de resolució proporcional (`seleccio-estrategia-proporcional`) — N1

**Generadors / variants:** 9 · **Ajuda teòrica:** `#proporcio`

**Mostra 1 · tipus 9 · N1.** Quina estratègia és especialment adequada? · · 3 kg costen 8,40 € i vols saber quant costen 11 kg.

**Resposta:** Reduir a la unitat o plantejar una proporció

**Resolució:** En aquesta situació, una estratègia eficient és: Reduir a la unitat o plantejar una proporció.

**Mostra 2 · tipus 9 · N1.** Quina estratègia és especialment adequada? · · 7 entrades costen 31,50 € i vols saber el preu d’una entrada.

**Resposta:** Reduir a la unitat

**Resolució:** En aquesta situació, una estratègia eficient és: Reduir a la unitat.

**Mostra 3 · tipus 9 · N1.** Quina estratègia és especialment adequada? · · 8 ampolles costen 12 € i vols saber quant costen 4 ampolles.

**Resposta:** Aplicar un factor 1/2

**Resolució:** En aquesta situació, una estratègia eficient és: Aplicar un factor 1/2.

### Completar taules i escalar quantitats (`taules-i-escalatge`) — N2

**Generadors / variants:** 3, 8, 16 · **Ajuda teòrica:** `#proporcio`

**Mostra 1 · tipus 3 · N2.** Completa la taula proporcional: · · 3 unitats → 6 € · 10 unitats → ?

**Resposta:** 20

**Resolució:** La relació és de 2 € per unitat. Per 10 unitats obtenim 20 €.

**Mostra 2 · tipus 8 · N2.** Si 6 kg costen 9 € , quant costen 7 kg al mateix preu per kg?

**Resposta:** 10,5 €

**Resolució:** El preu unitari és 1,5 €/kg. Per 7 kg, el cost és 10,5 €.

**Mostra 3 · tipus 16 · N2.** Una recepta per a 4 persones necessita 400 g d’un ingredient. Quants grams calen per a 7 persones mantenint la mateixa proporció?

**Resposta:** 700

**Resolució:** La recepta utilitza 100 g per persona. Per 7 persones calen 700 g.

### Factors i raons equivalents (`factors-i-raons-equivalents`) — N1

**Generadors / variants:** 5, 7 · **Ajuda teòrica:** `#factor`

**Mostra 1 · tipus 5 · N1.** Una taula proporcional passa de 4 a 8 en una de les magnituds. Per quin factor s’ha multiplicat?

**Resposta:** 2

**Resolució:** 4 multiplicat per 2 dona 8. El factor és 2.

**Mostra 2 · tipus 7 · N1.** Completa la proporció: 3/3 = 6/□ .

**Resposta:** 6

**Resolució:** De 3 a 6 hem multiplicat per 2. Apliquem el mateix factor a 3. El terme que falta és 6.

**Mostra 3 · tipus 5 · N1.** Una taula proporcional passa de 6 a 30 en una de les magnituds. Per quin factor s’ha multiplicat?

**Resposta:** 5

**Resolució:** 6 multiplicat per 5 dona 30. El factor és 5.

### Taxes unitàries i constant de proporcionalitat (`taxes-i-constant`) — N1

**Generadors / variants:** 4, 6, 13, 18 · **Ajuda teòrica:** `#constant`

**Mostra 1 · tipus 4 · N1.** 6 quaderns costen 21 € . Quin és el preu d’un quadern ?

**Resposta:** 3,5

**Resolució:** Dividim el cost total entre 6 quaderns. El preu unitari és 3,5 €.

**Mostra 2 · tipus 6 · N1.** 2 kg d’un producte costen 2,5 € . Quina és la constant de proporcionalitat preu/quantitat?

**Resposta:** 1,25 €/kg

**Resolució:** La constant és el preu per quilogram. Resultat: 1,25 €/kg.

**Mostra 3 · tipus 13 · N1.** Una situació indica 10 litres per a 4 persones . Quina és la taxa per unitat?

**Resposta:** 2,5 L/persona

**Resolució:** Reduïm la situació a una sola unitat. La taxa és 2,5 L/persona.

### Compra amb pressupost limitat (`compra-amb-pressupost`) — N1

**Generadors / variants:** 14 · **Ajuda teòrica:** `#unitat`

**Mostra 1 · tipus 14 · N1.** Cada entrada costa 2 € . Amb 36 € , quantes entrades pots comprar?

**Resposta:** 18

**Resolució:** Dividim el pressupost pel preu de cada entrada. Es poden comprar 18 entrades.

**Mostra 2 · tipus 14 · N1.** Cada entrada costa 4 € . Amb 40 € , quantes entrades pots comprar?

**Resposta:** 10

**Resolució:** Dividim el pressupost pel preu de cada entrada. Es poden comprar 10 entrades.

**Mostra 3 · tipus 14 · N1.** Cada entrada costa 4 € . Amb 24 € , quantes entrades pots comprar?

**Resposta:** 6

**Resolució:** Dividim el pressupost pel preu de cada entrada. Es poden comprar 6 entrades.

### Comparació de preus unitaris (`comparacio-de-taxes`) — N2

**Generadors / variants:** 10 · **Ajuda teòrica:** `#unitat`

**Mostra 1 · tipus 10 · N2.** Compara dues ofertes: · Oferta A: 6 unitats per 12 € · Oferta B: 8 unitats per 20,8 € · Quina és més barata per unitat?

**Resposta:** Oferta A

**Resolució:** Oferta A: 2 € per unitat. Oferta B: 2,6 € per unitat. La més barata és Oferta A.

**Mostra 2 · tipus 10 · N2.** Compara dues ofertes: · Oferta A: 4 unitats per 7,2 € · Oferta B: 8 unitats per 19,2 € · Quina és més barata per unitat?

**Resposta:** Oferta A

**Resolució:** Oferta A: 1,8 € per unitat. Oferta B: 2,4 € per unitat. La més barata és Oferta A.

**Mostra 3 · tipus 10 · N2.** Compara dues ofertes: · Oferta A: 6 unitats per 10,8 € · Oferta B: 10 unitats per 15 € · Quina és més barata per unitat?

**Resposta:** Oferta B

**Resolució:** Oferta A: 1,8 € per unitat. Oferta B: 1,5 € per unitat. La més barata és Oferta B.

### Repartiment proporcional (`repartiment-proporcional`) — N2

**Generadors / variants:** 11, 12 · **Ajuda teòrica:** `#repartiment`

**Mostra 1 · tipus 11 · N2.** Reparteix 120 € en la raó 2:6 . Quines quantitats corresponen a les dues parts?

**Resposta:** 30 i 90

**Resolució:** La raó té 8 parts en total. Cada part val 15 €. El repartiment és 30 € i 90 €.

**Mostra 2 · tipus 12 · N2.** Reparteix 100 € proporcionalment en la raó 2:3:5 .

**Resposta:** 20, 30, 50

**Resolució:** Hi ha 10 parts en total. Cada part val 10 €. Repartiment: 20, 30, 50 €.

**Mostra 3 · tipus 11 · N2.** Reparteix 70 € en la raó 4:3 . Quines quantitats corresponen a les dues parts?

**Resposta:** 40 i 30

**Resolució:** La raó té 7 parts en total. Cada part val 10 €. El repartiment és 40 € i 30 €.

### Detecció d’errors en relacions proporcionals (`diagnosi-proporcionalitat`) — N2

**Generadors / variants:** 15, 17 · **Ajuda teòrica:** `#errors`

**Mostra 1 · tipus 15 · N2.** Quin raonament és incorrecte ?

**Resposta:** Si 4 quaderns costen 10 €, 7 quaderns costen 13 € perquè n’afegim 3.

**Resolució:** El primer raonament suma 3 € només perquè s’han afegit 3 quaderns. Això no manté el preu per unitat, així que és l’afirmació incorrecta.

**Mostra 2 · tipus 17 · N2.** En aquesta taula, quin valor de la primera fila correspon a la parella que trenca la proporcionalitat ? · · 2 → 4 &nbsp; · &nbsp; 4 → 10 &nbsp; · &nbsp; 6 → 12 &nbsp; · &nbsp; 8 → 16

**Resposta:** 4

**Resolució:** La constant esperada és 2. La parella que comença per 4 no manté aquesta relació. Resposta: 4.

**Mostra 3 · tipus 17 · N2.** En aquesta taula, quin valor de la primera fila correspon a la parella que trenca la proporcionalitat ? · · 2 → 6 &nbsp; · &nbsp; 4 → 15 &nbsp; · &nbsp; 6 → 18 &nbsp; · &nbsp; 8 → 24

**Resposta:** 4

**Resolució:** La constant esperada és 3. La parella que comença per 4 no manté aquesta relació. Resposta: 4.

## Validació i limitacions

- Prova matemàtica: **250 mostres per tipus**; oracles independents, exactitud de resposta, unicitat, família i nivell. Resultat d’aquest tema: 4500 mostres; cobertura completa dels 9 IDs i cap error JS.
- Prova Playwright amb Chrome 157.0.8103.52: pràctica guiada/autònoma, selecció i rotació de famílies, correcció/resposta errònia, examen, enllaços i ancoratges de teoria, hashchange i viewport de 390 px; sense errors JavaScript.
- Regressions Lot 2: 30 mostres d’aquest tema i 30 de cada un dels altres tres temes ordinaris i de les quatre ampliacions.
- Fitxes: tots els 8 temes ordinaris, preguntes/solucions, quotes i duplicats; Word/PDF amb i sense solucions. Les fitxes admeten nivells només presents al catàleg real.
- El codi del popup real de teoria no s’ha pogut carregar des de `file://` en aquest sandbox. S’ha comprovat l’URL i l’ancoratge sol·licitats, i la navegació directa i `hashchange`. Chrome disponible; Edge no executat. No s’afirma que GitHub Pages s’hagi verificat.
