# Sentit estocàstic · 1r d’ESO · Diagrames de sectors

**Commit de referència:** `3c972581d0aa11785d32d725dd1dcb7acbc41f4b` (main).  **Tema:** `sectors`.
**Famílies:** 8 (4 N1, 4 N2, 0 N3).  **Inventari regular:** 94 exercicis revisats exhaustivament.  **Mostres contextuals:** 1250.  **Rotació provada:** 188 extraccions sense repetició familiar consecutiva.

L’objectiu orientatiu de 15 / 5 / 5 / 3 no és una quota. El tema es tanca amb procediments que el currículum i els generadors actuals sostenen; no s’han afegit N3 artificials.

## Famílies definitives

| ID | Procediment matemàtic | Anterior | Final | Justificació pedagògica | Generadors / variants | Recompte validat |
|---|---|---|---|---|---|---:|
| `lectura-percentatge-sector` | Llegir el percentatge d’una categoria en un diagrama de sectors | N1 | N1 | Es manté N1: Llegir el percentatge d’una categoria en un diagrama de sectors és una aplicació directa del procediment. | `sectors:1`, `G4` | 10 regulars + 250 contextuals |
| `identificar-categoria-mes-frequent` | Identificar la categoria de freqüència màxima | N1 | N1 | Es manté N1: Identificar la categoria de freqüència màxima és una aplicació directa del procediment. | `sectors:7` | 10 regulars + 0 contextuals |
| `convertir-percentatge-i-angle` | Convertir una proporció entre percentatge i angle central | N2 | N2 | Es manté N2: Convertir una proporció entre percentatge i angle central és una aplicació directa del procediment. | `sectors:2`, `sectors:3`, `G6`, `K3` | 20 regulars + 500 contextuals |
| `convertir-percentatge-i-freq-absoluta` | Convertir entre percentatge i freqüència absoluta amb el total conegut | N1/N3 | N2 | Es baixa de N3 a N2: combina procediments habituals o interpreta una mostra/dada, sense restriccions ni justificació avançada. | `sectors:4`, `sectors:5`, `G5` | 20 regulars + 250 contextuals |
| `comparar-proporcions-sector` | Comparar proporcions representades en sectors | N2 | N2 | Es manté N2: Comparar proporcions representades en sectors és una aplicació directa del procediment. | `sectors:6` | 10 regulars + 0 contextuals |
| `reconstruir-part-complementaria` | Reconstruir la freqüència o proporció que falta perquè el total sigui complet | N3 | N2 | Es baixa de N3 a N2: combina procediments habituals o interpreta una mostra/dada, sense restriccions ni justificació avançada. | `sectors:8`, `sectors:9` | 20 regulars + 0 contextuals |
| `interpretar-diagrama-sectors` | Interpretar el total, les parts i l’ús d’un diagrama de sectors | N1 | N1 | Es manté N1: Interpretar el total, les parts i l’ús d’un diagrama de sectors és una aplicació directa del procediment. | `sectors:10`, `sectors:11`, `sectors:12`, `sectors:13` | 4 regulars + 0 contextuals |
| `triar-representacio-estadistica` | Triar una representació gràfica adequada a les dades | N1 | N1 | Es manté N1: Triar una representació gràfica adequada a les dades és una aplicació directa del procediment. | `G9` | 0 regulars + 250 contextuals |

## Canvis de classificació i justificació

N1 reuneix lectures, identificacions i càlculs directes amb una representació. N2 s’assigna a conversions, estimacions, comparacions amb càlcul o reconstruccions que combinen dades. No hi ha famílies N3: aquests quatre blocs de 1r d’ESO no requereixen una categoria avançada separada i algunes etiquetes prèvies N3 confonien ambigüitat o pas intermedi amb raonament avançat. Les famílies amb nivells previs mixtos es consoliden al nivell únic de la taula segons el procediment que comparteixen.

## Exemples generats per família

### Llegir el percentatge d’una categoria en un diagrama de sectors · N1 (lectura-percentatge-sector)
1. **Enunciat:** Observa el diagrama de sectors sobre les mascotes de casa. Quin percentatge correspon a "Gos"? [representació: Gos: 20% Gat: 15% Peixos: 30% Cap: 35%]  **Resposta:** 20%  **Nivell:** N1
2. **Enunciat:** Observa el diagrama de sectors sobre les zones preferides del pati. Quin percentatge correspon a "Bancs"? [representació: Pista: 35% Jardí: 25% Porxo: 30% Bancs: 10%]  **Resposta:** 10%  **Nivell:** N1
3. **Enunciat:** Observa el diagrama de sectors sobre els esmorzars preferits. Quin percentatge correspon a "Entrepà"? [representació: Entrepà: 10% Fruita: 40% Cereals: 15% Iogurt: 35%]  **Resposta:** 10%  **Nivell:** N1

### Identificar la categoria de freqüència màxima · N1 (identificar-categoria-mes-frequent)
1. **Enunciat:** Observa el diagrama de sectors sobre les zones preferides del pati. Quina categoria ocupa el sector més gran? [representació: Pista: 15% Jardí: 10% Porxo: 30% Bancs: 45%]  **Resposta:** Bancs  **Nivell:** N1
2. **Enunciat:** Observa el diagrama de sectors sobre els estils de música preferits. Quina categoria ocupa el sector més gran? [representació: Pop: 10% Rock: 40% Rap: 20% Electrònica: 30%]  **Resposta:** Rock  **Nivell:** N1
3. **Enunciat:** Observa el diagrama de sectors sobre les activitats extraescolars. Quina categoria ocupa el sector més gran? [representació: Handbol: 35% Dansa: 15% Música: 20% Robòtica: 30%]  **Resposta:** Handbol  **Nivell:** N1

### Convertir una proporció entre percentatge i angle central · N2 (convertir-percentatge-i-angle)
1. **Enunciat:** En un diagrama sobre les fruites preferides, un sector ocupa 144°. Quin percentatge del cercle representa? [representació: Sector: 144° Resta: 216°]  **Resposta:** 40%  **Nivell:** N2
2. **Enunciat:** En un diagrama sobre les mascotes de casa, un sector ocupa 108°. Quin percentatge del cercle representa? [representació: Sector: 108° Resta: 252°]  **Resposta:** 30%  **Nivell:** N2
3. **Enunciat:** En un diagrama sobre els esmorzars preferits, un sector ocupa 72°. Quin percentatge del cercle representa? [representació: Sector: 72° Resta: 288°]  **Resposta:** 20%  **Nivell:** N2

### Convertir entre percentatge i freqüència absoluta amb el total conegut · N2 (convertir-percentatge-i-freq-absoluta)
1. **Enunciat:** En una enquesta de 20 persones sobre els esports preferits, el 40% ha triat "Atletisme". Quantes persones són? [representació: Futbol: 10% Bàsquet: 15% Natació: 35% Atletisme: 40%]  **Resposta:** 8  **Nivell:** N2
2. **Enunciat:** En una enquesta de 20 persones, 4 han triat "Groc". Quin percentatge del total representen? [representació: Blau: 30% Verd: 15% Vermell: 35% Groc: 20%]  **Resposta:** 20%  **Nivell:** N2
3. **Enunciat:** En una enquesta de 80 persones, 12 han triat "Plàtan". Quin percentatge del total representen? [representació: Poma: 25% Plàtan: 15% Taronja: 40% Pera: 20%]  **Resposta:** 15%  **Nivell:** N2

### Comparar proporcions representades en sectors · N2 (comparar-proporcions-sector)
1. **Enunciat:** Observa el diagrama sobre el transport per anar a classe. Quina diferència percentual hi ha entre "Bici" i "Bus"? [representació: A peu: 30% Bus: 10% Cotxe: 45% Bici: 15%]  **Resposta:** 5%  **Nivell:** N2
2. **Enunciat:** Observa el diagrama sobre els colors preferits. Quina diferència percentual hi ha entre "Blau" i "Vermell"? [representació: Blau: 15% Verd: 50% Vermell: 25% Groc: 10%]  **Resposta:** 10%  **Nivell:** N2
3. **Enunciat:** Observa el diagrama sobre les fruites preferides. Quina diferència percentual hi ha entre "Taronja" i "Poma"? [representació: Poma: 35% Plàtan: 15% Taronja: 20% Pera: 30%]  **Resposta:** 15%  **Nivell:** N2

### Reconstruir la freqüència o proporció que falta perquè el total sigui complet · N2 (reconstruir-part-complementaria)
1. **Enunciat:** En un diagrama sobre els colors preferits, tres sectors mesuren 54°, 90° i 72°. Quants graus ha de mesurar el sector que falta?  **Resposta:** 144°  **Nivell:** N2
2. **Enunciat:** En un diagrama sobre els esports preferits, tres sectors mesuren 126°, 144° i 54°. Quants graus ha de mesurar el sector que falta?  **Resposta:** 36°  **Nivell:** N2
3. **Enunciat:** En un diagrama sobre les activitats extraescolars, tres categories ocupen el 25%, el 20% i el 10%. Quin percentatge ocupa la quarta categoria?  **Resposta:** 45%  **Nivell:** N2

### Interpretar el total, les parts i l’ús d’un diagrama de sectors · N1 (interpretar-diagrama-sectors)
1. **Enunciat:** Quants graus té un cercle complet?  **Resposta:** 360°  **Nivell:** N1
2. **Enunciat:** Quan és especialment útil un diagrama de sectors?  **Resposta:** Quan volem comparar les parts d’un total  **Nivell:** N1
3. **Enunciat:** Què representa el cercle complet en un diagrama de sectors?  **Resposta:** El 100% de les dades  **Nivell:** N1

### Triar una representació gràfica adequada a les dades · N1 (triar-representacio-estadistica)
1. **Enunciat:** Quina representació és especialment adequada per comparar els esports preferits d’una classe?  **Resposta:** diagrama de barres  **Nivell:** N1
2. **Enunciat:** Quina representació és especialment adequada per seguir les freqüències de valors ordenats i unir-ne els punts?  **Resposta:** polígon de freqüències  **Nivell:** N1
3. **Enunciat:** Quina representació és especialment adequada per mostrar com es reparteix un pressupost en percentatges?  **Resposta:** diagrama de sectors  **Nivell:** N1

## Proves i limitacions

- Classificació i nivell comprovats contra `MIFirstStochasticFamilies` i el classificador compartit; cap discrepància detectada.
- Tots els exercicis del banc regular s’han validat exhaustivament; les rutes contextuals especificades s’han generat 250 vegades cadascuna.
- La bossa s’ha recorregut dues vegades i no ha repetit família en dues extraccions consecutives.
- La rotació dels problemes oberts ha passat 20 exercicis consecutius sense repetir família, inclòs el canvi de bossa.
- Navegador: Chrome local; pràctica guiada i oberta, examen de tema de 12 preguntes i viewport de 390 px sense desbordament. Han passat 30 mostres per cadascun dels altres 5 temes (150 per execució).
- No s’han modificat teoria, CSS ni temes fora del lot. GitHub Pages no s’ha publicat ni verificat perquè la PR és pendent de revisió i no es fusiona.
