# Sentit estocàstic · 1r d’ESO · Diagrames de barres

**Commit de referència:** `3c972581d0aa11785d32d725dd1dcb7acbc41f4b` (main).  **Tema:** `barres`.
**Famílies:** 10 (7 N1, 3 N2, 0 N3).  **Inventari regular:** 112 exercicis revisats exhaustivament.  **Mostres contextuals:** 1500.  **Rotació provada:** 224 extraccions sense repetició familiar consecutiva.

L’objectiu orientatiu de 15 / 5 / 5 / 3 no és una quota. El tema es tanca amb procediments que el currículum i els generadors actuals sostenen; no s’han afegit N3 artificials.

## Famílies definitives

| ID | Procediment matemàtic | Anterior | Final | Justificació pedagògica | Generadors / variants | Recompte validat |
|---|---|---|---|---|---|---:|
| `lectura-freq-barra` | Llegir una freqüència o categoria en un diagrama de barres | N1 | N1 | Es manté N1: Llegir una freqüència o categoria en un diagrama de barres és una aplicació directa del procediment. | `barres:1`, `barres:7`, `barres:13`, `G1` | 36 regulars + 250 contextuals |
| `identificar-categoria-mes-frequent` | Identificar la categoria de freqüència màxima o mínima | N1 | N1 | Es manté N1: Identificar la categoria de freqüència màxima o mínima és una aplicació directa del procediment. | `barres:2`, `barres:3` | 24 regulars + 0 contextuals |
| `comparar-frequencies-barres` | Comparar directament les freqüències de dues categories | N1 | N1 | Es manté N1: Comparar directament les freqüències de dues categories és una aplicació directa del procediment. | `barres:8` | 12 regulars + 0 contextuals |
| `calcular-diferencia-frequencies` | Calcular la diferència entre freqüències representades | N2 | N2 | Es manté N2: Calcular la diferència entre freqüències representades és una aplicació directa del procediment. | `barres:4`, `G2` | 12 regulars + 250 contextuals |
| `detectar-escala-enganyosa` | Detectar quan una escala truncada exagera visualment una diferència | N2 | N2 | Es manté N2: Detectar quan una escala truncada exagera visualment una diferència és una aplicació directa del procediment. | `G8` | 0 regulars + 250 contextuals |
| `sumar-frequencies-parcials` | Sumar les freqüències d’un subconjunt de categories | N2 | N2 | Es manté N2: Sumar les freqüències d’un subconjunt de categories és una aplicació directa del procediment. | `barres:5` | 12 regulars + 0 contextuals |
| `totalitzar-freq-absolutes` | Calcular o interpretar el total a partir de freqüències absolutes | N2 | N1 | Es classifica N1 perquè és reconeixement, lectura o càlcul directe; el context no introdueix reconstrucció ni diversos passos. | `barres:6`, `G3` | 12 regulars + 250 contextuals |
| `interpretar-convencions-barres` | Interpretar les convencions bàsiques d’un diagrama de barres | N1 | N1 | Es manté N1: Interpretar les convencions bàsiques d’un diagrama de barres és una aplicació directa del procediment. | `barres:9`, `barres:10`, `barres:11`, `barres:12` | 4 regulars + 0 contextuals |
| `construir-diagrama-barres` | Construir un diagrama de barres a partir d’una taula | N1 | N1 | Es manté N1: Construir un diagrama de barres a partir d’una taula és una aplicació directa del procediment. | `K1` | 0 regulars + 250 contextuals |
| `triar-representacio-estadistica` | Triar una representació gràfica adequada a les dades | N1 | N1 | Es manté N1: Triar una representació gràfica adequada a les dades és una aplicació directa del procediment. | `G9` | 0 regulars + 250 contextuals |

## Canvis de classificació i justificació

N1 reuneix lectures, identificacions i càlculs directes amb una representació. N2 s’assigna a conversions, estimacions, comparacions amb càlcul o reconstruccions que combinen dades. No hi ha famílies N3: aquests quatre blocs de 1r d’ESO no requereixen una categoria avançada separada i algunes etiquetes prèvies N3 confonien ambigüitat o pas intermedi amb raonament avançat. Les famílies amb nivells previs mixtos es consoliden al nivell únic de la taula segons el procediment que comparteixen.

## Exemples generats per família

### Llegir una freqüència o categoria en un diagrama de barres · N1 (lectura-freq-barra)
1. **Enunciat:** En el diagrama sobre les mascotes de casa, quina categoria té freqüència 4? [representació: 10 Gos 5 Gat 18 Peixos 8 Ocells 4 Cap]  **Resposta:** Cap  **Nivell:** N1
2. **Enunciat:** Observa el diagrama de barres sobre les activitats extraescolars. Quina freqüència té la categoria "Dansa"? [representació: 10 Handbol 13 Dansa 3 Teatre 16 Música 19 Robòtica]  **Resposta:** 13  **Nivell:** N1
3. **Enunciat:** L’eix vertical del diagrama avança de 10 en 10. Quina freqüència té la categoria "Uno"? [representació: 0 10 20 30 40 50 Escacs Parxís Dames Uno Dobble Freqüència]  **Resposta:** 40  **Nivell:** N1

### Identificar la categoria de freqüència màxima o mínima · N1 (identificar-categoria-mes-frequent)
1. **Enunciat:** Observa el diagrama de barres sobre els colors preferits. Quina categoria té la freqüència més baixa? [representació: 6 Blau 10 Verd 7 Vermell 12 Lila 20 Groc]  **Resposta:** Blau  **Nivell:** N1
2. **Enunciat:** Observa el diagrama de barres sobre els estils de música preferits. Quina categoria té la freqüència més alta? [representació: 8 Pop 15 Rock 6 Rap 20 Clàssica 9 Electrònica]  **Resposta:** Clàssica  **Nivell:** N1
3. **Enunciat:** Observa el diagrama de barres sobre les zones preferides del pati. Quina categoria té la freqüència més baixa? [representació: 11 Pista 9 Jardí 10 Porxo 5 Bancs 19 Pati gran]  **Resposta:** Bancs  **Nivell:** N1

### Comparar directament les freqüències de dues categories · N1 (comparar-frequencies-barres)
1. **Enunciat:** Segons el diagrama sobre les assignatures preferides, quina de les dues categories té més freqüència: "Anglès" o "Música"? [representació: 9 Mates 12 Català 16 Anglès 6 Ciències 3 Música]  **Resposta:** Anglès  **Nivell:** N1
2. **Enunciat:** Segons el diagrama sobre els colors preferits, quina de les dues categories té més freqüència: "Verd" o "Lila"? [representació: 15 Blau 12 Verd 13 Vermell 9 Lila 8 Groc]  **Resposta:** Verd  **Nivell:** N1
3. **Enunciat:** Segons el diagrama sobre les zones preferides del pati, quina de les dues categories té més freqüència: "Bancs" o "Pista"? [representació: 8 Pista 16 Jardí 15 Porxo 3 Bancs 18 Pati gran]  **Resposta:** Pista  **Nivell:** N1

### Calcular la diferència entre freqüències representades · N2 (calcular-diferencia-frequencies)
1. **Enunciat:** En el diagrama sobre les fruites preferides, quina diferència de freqüència hi ha entre "Plàtan" i "Pera"? [representació: 17 Poma 11 Plàtan 16 Taronja 4 Pera 10 Kiwi]  **Resposta:** 7  **Nivell:** N2
2. **Enunciat:** En el diagrama sobre el transport per anar a classe, quina diferència de freqüència hi ha entre "Cotxe" i "Patinet"? [representació: 3 A peu 4 Bus 5 Cotxe 18 Bici 19 Patinet]  **Resposta:** 14  **Nivell:** N2
3. **Enunciat:** En el diagrama sobre les activitats extraescolars, quina diferència de freqüència hi ha entre "Dansa" i "Música"? [representació: 16 Handbol 3 Dansa 4 Teatre 18 Música 12 Robòtica]  **Resposta:** 15  **Nivell:** N2

### Detectar quan una escala truncada exagera visualment una diferència · N2 (detectar-escala-enganyosa)
1. **Enunciat:** Un gràfic compara dues quantitats, 61 i 62, però l’eix vertical comença a 58 en lloc de 0. Pot fer que la diferència sembli molt més gran del que és?  **Resposta:** Sí  **Nivell:** N2
2. **Enunciat:** Un gràfic compara dues quantitats, 72 i 76, però l’eix vertical comença a 71 en lloc de 0. Pot fer que la diferència sembli molt més gran del que és?  **Resposta:** Sí  **Nivell:** N2
3. **Enunciat:** Un gràfic compara dues quantitats, 63 i 66, però l’eix vertical comença a 62 en lloc de 0. Pot fer que la diferència sembli molt més gran del que és?  **Resposta:** Sí  **Nivell:** N2

### Sumar les freqüències d’un subconjunt de categories · N2 (sumar-frequencies-parcials)
1. **Enunciat:** Observa el diagrama sobre els esports preferits. Quina és la freqüència conjunta de "Bàsquet" i "Natació"? [representació: 3 Futbol 9 Bàsquet 8 Tennis 20 Natació 4 Ciclisme]  **Resposta:** 29  **Nivell:** N2
2. **Enunciat:** Observa el diagrama sobre els colors preferits. Quina és la freqüència conjunta de "Blau" i "Vermell"? [representació: 11 Blau 12 Verd 4 Vermell 6 Lila 9 Groc]  **Resposta:** 15  **Nivell:** N2
3. **Enunciat:** Observa el diagrama sobre les zones preferides del pati. Quina és la freqüència conjunta de "Porxo" i "Pati gran"? [representació: 6 Pista 10 Jardí 8 Porxo 17 Bancs 4 Pati gran]  **Resposta:** 12  **Nivell:** N2

### Calcular o interpretar el total a partir de freqüències absolutes · N1 (totalitzar-freq-absolutes)
1. **Enunciat:** Observa el diagrama sobre el transport per anar a classe. Quantes dades representa el gràfic en total? [representació: 3 A peu 11 Bus 10 Cotxe 17 Bici 13 Patinet]  **Resposta:** 54  **Nivell:** N1
2. **Enunciat:** Observa el diagrama sobre els gèneres de llibres preferits. Quantes dades representa el gràfic en total? [representació: 14 Aventura 8 Misteri 7 Còmic 18 Fantasia 11 Humor]  **Resposta:** 58  **Nivell:** N1
3. **Enunciat:** Observa el diagrama sobre els colors preferits. Quantes dades representa el gràfic en total? [representació: 3 Blau 14 Verd 19 Vermell 4 Lila 13 Groc]  **Resposta:** 53  **Nivell:** N1

### Interpretar les convencions bàsiques d’un diagrama de barres · N1 (interpretar-convencions-barres)
1. **Enunciat:** En un diagrama de barres de freqüències, què representa habitualment l'eix vertical?  **Resposta:** La freqüència  **Nivell:** N1
2. **Enunciat:** Quina afirmació descriu correctament un diagrama de barres?  **Resposta:** Cada barra associa una categoria o valor discret amb una freqüència  **Nivell:** N1
3. **Enunciat:** Quan és especialment útil un diagrama de barres?  **Resposta:** Quan volem comparar freqüències entre categories  **Nivell:** N1

### Construir un diagrama de barres a partir d’una taula · N1 (construir-diagrama-barres)
1. **Enunciat:** Construeix el diagrama de barres a partir de la taula. Clica a cada columna per marcar-ne l’alçada. [representació: Categoria Voleibol Futbol Atletisme Bàsquet Freqüència 3 7 10 6]  **Resposta:** Voleibol: 3 Futbol: 7 Atletisme: 10 Bàsquet: 6  **Nivell:** N1
2. **Enunciat:** Construeix el diagrama de barres a partir de la taula. Clica a cada columna per marcar-ne l’alçada. [representació: Categoria Futbol Natació Atletisme Bàsquet Freqüència 7 3 9 6]  **Resposta:** Futbol: 7 Natació: 3 Atletisme: 9 Bàsquet: 6  **Nivell:** N1
3. **Enunciat:** Construeix el diagrama de barres a partir de la taula. Clica a cada columna per marcar-ne l’alçada. [representació: Categoria Bàsquet Voleibol Atletisme Futbol Freqüència 5 8 5 2]  **Resposta:** Bàsquet: 5 Voleibol: 8 Atletisme: 5 Futbol: 2  **Nivell:** N1

### Triar una representació gràfica adequada a les dades · N1 (triar-representacio-estadistica)
1. **Enunciat:** Quina representació és especialment adequada per comparar els esports preferits d’una classe?  **Resposta:** diagrama de barres  **Nivell:** N1
2. **Enunciat:** Quina representació és especialment adequada per mostrar com es reparteix un pressupost en percentatges?  **Resposta:** diagrama de sectors  **Nivell:** N1
3. **Enunciat:** Quina representació és especialment adequada per seguir les freqüències de valors ordenats i unir-ne els punts?  **Resposta:** polígon de freqüències  **Nivell:** N1

## Proves i limitacions

- Classificació i nivell comprovats contra `MIFirstStochasticFamilies` i el classificador compartit; cap discrepància detectada.
- Tots els exercicis del banc regular s’han validat exhaustivament; les rutes contextuals especificades s’han generat 250 vegades cadascuna.
- La bossa s’ha recorregut dues vegades i no ha repetit família en dues extraccions consecutives.
- La rotació dels problemes oberts ha passat 20 exercicis consecutius sense repetir família, inclòs el canvi de bossa.
- Navegador: Chrome local; pràctica guiada i oberta, examen de tema de 12 preguntes i viewport de 390 px sense desbordament. Han passat 30 mostres per cadascun dels altres 5 temes (150 per execució).
- No s’han modificat teoria, CSS ni temes fora del lot. GitHub Pages no s’ha publicat ni verificat perquè la PR és pendent de revisió i no es fusiona.
