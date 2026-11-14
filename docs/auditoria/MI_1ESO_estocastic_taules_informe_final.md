# Sentit estocàstic · 1r d’ESO · Taules de freqüències

**Commit de referència:** `3c972581d0aa11785d32d725dd1dcb7acbc41f4b` (main).  **Tema:** `taules`.
**Famílies:** 9 (4 N1, 5 N2, 0 N3).  **Inventari regular:** 68 exercicis revisats exhaustivament.  **Mostres contextuals:** 1750.  **Rotació provada:** 136 extraccions sense repetició familiar consecutiva.

L’objectiu orientatiu de 15 / 5 / 5 / 3 no és una quota. El tema es tanca amb procediments que el currículum i els generadors actuals sostenen; no s’han afegit N3 artificials.

## Famílies definitives

| ID | Procediment matemàtic | Anterior | Final | Justificació pedagògica | Generadors / variants | Recompte validat |
|---|---|---|---|---|---|---:|
| `lectura-freq-absoluta-taula` | Llegir una freqüència absoluta en una taula | N1 | N1 | Es manté N1: Llegir una freqüència absoluta en una taula és una aplicació directa del procediment. | `taules:1`, `taules:7`, `taules:9` | 17 regulars + 0 contextuals |
| `totalitzar-freq-absolutes` | Calcular o interpretar el total a partir de freqüències absolutes | N1 | N1 | Es manté N1: Calcular o interpretar el total a partir de freqüències absolutes és una aplicació directa del procediment. | `taules:2`, `taules:11`, `T6` | 9 regulars + 250 contextuals |
| `identificar-categoria-mes-frequent` | Identificar la categoria de freqüència màxima | N1 | N1 | Es manté N1: Identificar la categoria de freqüència màxima és una aplicació directa del procediment. | `taules:6` | 8 regulars + 0 contextuals |
| `freq-relativa-i-representacions` | Calcular i interpretar la freqüència relativa com a fracció, decimal o percentatge | N1/N2 | N2 | S’ajusta a N2 perquè requereix combinar representacions, calcular una diferència o reconstruir una part del total. | `taules:3`, `taules:10`, `taules:12`, `T2` | 10 regulars + 250 contextuals |
| `recuperar-freq-absoluta-des-de-relativa` | Recuperar una freqüència absoluta a partir de la relativa i del total | N1 | N2 | S’ajusta a N2 perquè requereix combinar representacions, calcular una diferència o reconstruir una part del total. | `taules:4` | 8 regulars + 0 contextuals |
| `recuperar-total-des-de-freq-i-relativa` | Recuperar el total a partir d’una freqüència absoluta i la relativa | N1 | N2 | S’ajusta a N2 perquè requereix combinar representacions, calcular una diferència o reconstruir una part del total. | `T5` | 0 regulars + 250 contextuals |
| `reconstruir-part-complementaria` | Reconstruir la freqüència o proporció que falta perquè el total sigui complet | N1/N2 | N2 | S’ajusta a N2 perquè requereix combinar representacions, calcular una diferència o reconstruir una part del total. | `taules:5`, `taules:8`, `T3`, `T4` | 16 regulars + 500 contextuals |
| `calcular-diferencia-frequencies` | Calcular la diferència entre freqüències representades | N2 | N2 | Es manté N2: Calcular la diferència entre freqüències representades és una aplicació directa del procediment. | `T7` | 0 regulars + 250 contextuals |
| `recompte-freq-des-de-dades-brutes` | Comptar una freqüència a partir d’una llista de dades | N1 | N1 | Es manté N1: Comptar una freqüència a partir d’una llista de dades és una aplicació directa del procediment. | `T1` | 0 regulars + 250 contextuals |

## Canvis de classificació i justificació

N1 reuneix lectures, identificacions i càlculs directes amb una representació. N2 s’assigna a conversions, estimacions, comparacions amb càlcul o reconstruccions que combinen dades. No hi ha famílies N3: aquests quatre blocs de 1r d’ESO no requereixen una categoria avançada separada i algunes etiquetes prèvies N3 confonien ambigüitat o pas intermedi amb raonament avançat. Les famílies amb nivells previs mixtos es consoliden al nivell únic de la taula segons el procediment que comparteixen.

## Exemples generats per família

### Llegir una freqüència absoluta en una taula · N1 (lectura-freq-absoluta-taula)
1. **Enunciat:** Observa la taula sobre les fruites preferides. Quina és la freqüència absoluta de "Plàtan"? [representació: Categoria Poma Plàtan Taronja Pera Freqüència 5 8 7 9]  **Resposta:** 8  **Nivell:** N1
2. **Enunciat:** Observa la taula sobre les mascotes de casa. Quina categoria té freqüència 8? [representació: Categoria Gos Gat Peixos Cap Freqüència 7 9 11 8]  **Resposta:** Cap  **Nivell:** N1
3. **Enunciat:** Observa la taula sobre les assignatures preferides. Quina categoria té freqüència 5? [representació: Categoria Mates Català Anglès Ciències Freqüència 5 3 2 11]  **Resposta:** Mates  **Nivell:** N1

### Calcular o interpretar el total a partir de freqüències absolutes · N1 (totalitzar-freq-absolutes)
1. **Enunciat:** Observa la taula sobre les mascotes de casa. Quantes dades hi ha en total? [representació: Categoria Gos Gat Peixos Cap Freqüència 8 5 2 10]  **Resposta:** 25  **Nivell:** N1
2. **Enunciat:** Observa la taula sobre les assignatures preferides. Quantes dades hi ha en total? [representació: Categoria Mates Català Anglès Ciències Freqüència 5 2 11 8]  **Resposta:** 26  **Nivell:** N1
3. **Enunciat:** Observa la taula sobre els colors preferits. Quantes dades hi ha en total? [representació: Categoria Blau Verd Vermell Groc Freqüència 8 10 4 3]  **Resposta:** 25  **Nivell:** N1

### Identificar la categoria de freqüència màxima · N1 (identificar-categoria-mes-frequent)
1. **Enunciat:** Observa la taula sobre les mascotes de casa. Quina categoria té la freqüència més alta? [representació: Categoria Gos Gat Peixos Cap Freqüència 4 3 12 9]  **Resposta:** Peixos  **Nivell:** N1
2. **Enunciat:** Observa la taula sobre els colors preferits. Quina categoria té la freqüència més alta? [representació: Categoria Blau Verd Vermell Groc Freqüència 11 5 9 8]  **Resposta:** Blau  **Nivell:** N1
3. **Enunciat:** Observa la taula sobre els estils de música preferits. Quina categoria té la freqüència més alta? [representació: Categoria Pop Rock Rap Clàssica Freqüència 9 11 5 3]  **Resposta:** Rock  **Nivell:** N1

### Calcular i interpretar la freqüència relativa com a fracció, decimal o percentatge · N2 (freq-relativa-i-representacions)
1. **Enunciat:** Observa la taula sobre els colors preferits. Expressa la freqüència relativa de "Blau" com a nombre decimal (arrodoneix a dues xifres decimals si cal). [representació: Categoria Blau Verd Vermell Groc Freqüència 8 3 6 5]  **Resposta:** 0.36  **Nivell:** N2
2. **Enunciat:** Observa la taula sobre el transport per anar a classe. Expressa la freqüència relativa de "Bici" com a percentatge (arrodoneix a dues xifres decimals si cal). [representació: Categoria A peu Bus Cotxe Bici Freqüència 4 5 12 7]  **Resposta:** 25%  **Nivell:** N2
3. **Enunciat:** Observa la taula sobre els esports preferits. Expressa la freqüència relativa de "Bàsquet" com a nombre decimal (arrodoneix a dues xifres decimals si cal). [representació: Categoria Futbol Bàsquet Natació Atletisme Freqüència 12 6 3 8]  **Resposta:** 0.21  **Nivell:** N2

### Recuperar una freqüència absoluta a partir de la relativa i del total · N2 (recuperar-freq-absoluta-des-de-relativa)
1. **Enunciat:** En un estudi de 20 dades sobre les assignatures preferides, una categoria té freqüència relativa 0.5. Quina és la seva freqüència absoluta?  **Resposta:** 10  **Nivell:** N2
2. **Enunciat:** En un estudi de 20 dades sobre les mascotes de casa, una categoria té freqüència relativa 0.25. Quina és la seva freqüència absoluta?  **Resposta:** 5  **Nivell:** N2
3. **Enunciat:** En un estudi de 20 dades sobre les fruites preferides, una categoria té freqüència relativa 0.3. Quina és la seva freqüència absoluta?  **Resposta:** 6  **Nivell:** N2

### Recuperar el total a partir d’una freqüència absoluta i la relativa · N2 (recuperar-total-des-de-freq-i-relativa)
1. **Enunciat:** Una categoria té freqüència absoluta 12 i freqüència relativa 1/5. Quantes dades hi ha en total?  **Resposta:** 60  **Nivell:** N2
2. **Enunciat:** Una categoria té freqüència absoluta 4 i freqüència relativa 1/4. Quantes dades hi ha en total?  **Resposta:** 16  **Nivell:** N2
3. **Enunciat:** Una categoria té freqüència absoluta 11 i freqüència relativa 1/10. Quantes dades hi ha en total?  **Resposta:** 110  **Nivell:** N2

### Reconstruir la freqüència o proporció que falta perquè el total sigui complet · N2 (reconstruir-part-complementaria)
1. **Enunciat:** Observa la taula sobre els colors preferits. Quantes dades NO pertanyen a la categoria "Groc"? [representació: Categoria Blau Verd Vermell Groc Freqüència 8 2 9 3]  **Resposta:** 19  **Nivell:** N2
2. **Enunciat:** En una taula de 20 dades sobre els gèneres de llibres preferits, tres freqüències són 2, 7, 6. Quina freqüència falta?  **Resposta:** 5  **Nivell:** N2
3. **Enunciat:** En una taula de 21 dades sobre les fruites preferides, tres freqüències són 3, 2, 7. Quina freqüència falta?  **Resposta:** 9  **Nivell:** N2

### Calcular la diferència entre freqüències representades · N2 (calcular-diferencia-frequencies)
1. **Enunciat:** Observa la taula. Quina diferència de freqüència hi ha entre la categoria més freqüent i la menys freqüent? [representació: Transport A peu Bici Bus Cotxe Freqüència 10 4 6 12]  **Resposta:** 8  **Nivell:** N2
2. **Enunciat:** Observa la taula. Quina diferència de freqüència hi ha entre la categoria més freqüent i la menys freqüent? [representació: Transport A peu Bici Bus Cotxe Freqüència 12 10 12 6]  **Resposta:** 6  **Nivell:** N2
3. **Enunciat:** Observa la taula. Quina diferència de freqüència hi ha entre la categoria més freqüent i la menys freqüent? [representació: Transport A peu Bici Bus Cotxe Freqüència 7 12 6 8]  **Resposta:** 6  **Nivell:** N2

### Comptar una freqüència a partir d’una llista de dades · N1 (recompte-freq-des-de-dades-brutes)
1. **Enunciat:** Dades en brut: 1, 4, 5, 4, 3, 1, 3, 3, 5, 5, 2, 1. Quina és la freqüència absoluta del valor 2?  **Resposta:** 1  **Nivell:** N1
2. **Enunciat:** Dades en brut: 2, 2, 1, 3, 5, 4, 3, 3, 2, 5, 1, 2, 2, 4. Quina és la freqüència absoluta del valor 4?  **Resposta:** 2  **Nivell:** N1
3. **Enunciat:** Dades en brut: 5, 4, 3, 4, 5, 5, 1, 1, 1, 1, 4, 4, 4, 4, 1. Quina és la freqüència absoluta del valor 3?  **Resposta:** 1  **Nivell:** N1

## Proves i limitacions

- Classificació i nivell comprovats contra `MIFirstStochasticFamilies` i el classificador compartit; cap discrepància detectada.
- Tots els exercicis del banc regular s’han validat exhaustivament; les rutes contextuals especificades s’han generat 250 vegades cadascuna.
- La bossa s’ha recorregut dues vegades i no ha repetit família en dues extraccions consecutives.
- La rotació dels problemes oberts ha passat 20 exercicis consecutius sense repetir família, inclòs el canvi de bossa.
- Navegador: Chrome local; pràctica guiada i oberta, examen de tema de 12 preguntes i viewport de 390 px sense desbordament. Han passat 30 mostres per cadascun dels altres 5 temes (150 per execució).
- No s’han modificat teoria, CSS ni temes fora del lot. GitHub Pages no s’ha publicat ni verificat perquè la PR és pendent de revisió i no es fusiona.
