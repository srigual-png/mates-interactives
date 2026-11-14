# Sentit estocàstic · 1r d’ESO · Recollida i inferència

**Commit de referència:** `3c972581d0aa11785d32d725dd1dcb7acbc41f4b` (main).  **Tema:** `recollida`.
**Famílies:** 10 (5 N1, 5 N2, 0 N3).  **Inventari regular:** 115 exercicis revisats exhaustivament.  **Mostres contextuals:** 2250.  **Rotació provada:** 230 extraccions sense repetició familiar consecutiva.

L’objectiu orientatiu de 15 / 5 / 5 / 3 no és una quota. El tema es tanca amb procediments que el currículum i els generadors actuals sostenen; no s’han afegit N3 artificials.

## Famílies definitives

| ID | Procediment matemàtic | Anterior | Final | Justificació pedagògica | Generadors / variants | Recompte validat |
|---|---|---|---|---|---|---:|
| `classificar-variable-estadistica` | Classificar una variable qualitativa, quantitativa discreta o contínua | N1 | N1 | Es manté N1: Classificar una variable qualitativa, quantitativa discreta o contínua és una aplicació directa del procediment. | `recollida:1`, `R1` | 24 regulars + 250 contextuals |
| `distingir-poblacio-mostra-individu` | Distingir població, mostra i individu estadístic | N1/N2 | N1 | Es classifica N1 perquè és reconeixement, lectura o càlcul directe; el context no introdueix reconstrucció ni diversos passos. | `recollida:2`, `recollida:8`, `R2` | 28 regulars + 250 contextuals |
| `distingir-cens-i-mostra` | Distingir un cens d’un estudi amb mostra | N1 | N1 | Es manté N1: Distingir un cens d’un estudi amb mostra és una aplicació directa del procediment. | `recollida:3` | 16 regulars + 0 contextuals |
| `identificar-metode-recollida` | Identificar el mètode de recollida de dades | N1/N2 | N1 | Es classifica N1 perquè és reconeixement, lectura o càlcul directe; el context no introdueix reconstrucció ni diversos passos. | `recollida:4`, `R6` | 20 regulars + 250 contextuals |
| `seleccionar-mostra-representativa` | Valorar si una mostra representa la població | N2/N3 | N2 | Es baixa de N3 a N2: combina procediments habituals o interpreta una mostra/dada, sense restriccions ni justificació avançada. | `recollida:5`, `recollida:7#representativitat`, `R3`, `R8` | 10 regulars + 500 contextuals |
| `detectar-pregunta-esbiaixada` | Detectar i corregir el biaix d’una pregunta d’enquesta | N2/N3 | N2 | Es baixa de N3 a N2: combina procediments habituals o interpreta una mostra/dada, sense restriccions ni justificació avançada. | `recollida:6`, `R4`, `R5` | 8 regulars + 500 contextuals |
| `depurar-dades` | Detectar dades duplicades o incoherents abans d’analitzar-les | N1/N3 | N2 | Es baixa de N3 a N2: combina procediments habituals o interpreta una mostra/dada, sense restriccions ni justificació avançada. | `recollida:7#depuracio`, `R9` | 3 regulars + 250 contextuals |
| `extreure-conclusio-justificada` | Extreure una conclusió limitada per les dades i la mostra | N3 | N2 | Es baixa de N3 a N2: combina procediments habituals o interpreta una mostra/dada, sense restriccions ni justificació avançada. | `recollida:7#conclusio` | 3 regulars + 0 contextuals |
| `organitzar-estudi-estadistic` | Reconèixer les fases bàsiques d’un estudi estadístic | N3 | N1 | Es classifica N1 perquè és reconeixement, lectura o càlcul directe; el context no introdueix reconstrucció ni diversos passos. | `recollida:7#procediment` | 3 regulars + 0 contextuals |
| `estimar-proporcio-poblacional` | Estimar una proporció de la població a partir d’una mostra | N2 | N2 | Es manté N2: Estimar una proporció de la població a partir d’una mostra és una aplicació directa del procediment. | `R7` | 0 regulars + 250 contextuals |

## Canvis de classificació i justificació

N1 reuneix lectures, identificacions i càlculs directes amb una representació. N2 s’assigna a conversions, estimacions, comparacions amb càlcul o reconstruccions que combinen dades. No hi ha famílies N3: aquests quatre blocs de 1r d’ESO no requereixen una categoria avançada separada i algunes etiquetes prèvies N3 confonien ambigüitat o pas intermedi amb raonament avançat. Les famílies amb nivells previs mixtos es consoliden al nivell únic de la taula segons el procediment que comparteixen.

## Exemples generats per família

### Classificar una variable qualitativa, quantitativa discreta o contínua · N1 (classificar-variable-estadistica)
1. **Enunciat:** Quin tipus de variable és: "temps que es triga a arribar a l'institut"?  **Resposta:** quantitativa contínua  **Nivell:** N1
2. **Enunciat:** Quin tipus de variable és: "temperatura corporal"?  **Resposta:** quantitativa contínua  **Nivell:** N1
3. **Enunciat:** Quin tipus de variable és: "tipus de música preferida"?  **Resposta:** qualitativa  **Nivell:** N1

### Distingir població, mostra i individu estadístic · N1 (distingir-poblacio-mostra-individu)
1. **Enunciat:** En un estudi hi ha 106 cotxes que circulen per una comarca i se'n seleccionen 32 (cotxes observats en diversos controls). Quin conjunt constitueix la població de l'estudi?  **Resposta:** Els 106 cotxes que circulen per una comarca  **Nivell:** N1
2. **Enunciat:** En l’estudi de el nombre de persones de cada habitatge, quin és un individu estadístic?  **Resposta:** un habitatge  **Nivell:** N1
3. **Enunciat:** En l’estudi de el nombre de llibres llegits a la biblioteca, quin és un individu estadístic?  **Resposta:** un llibre  **Nivell:** N1

### Distingir un cens d’un estudi amb mostra · N1 (distingir-cens-i-mostra)
1. **Enunciat:** Identifica el tipus d'estudi: "Observar 100 vehicles d'una carretera per estudiar-ne l'ocupació"  **Resposta:** Mostra  **Nivell:** N1
2. **Enunciat:** Identifica el tipus d'estudi: "Preguntar a 80 alumnes d'un institut de 900 sobre les hores de son"  **Resposta:** Mostra  **Nivell:** N1
3. **Enunciat:** Identifica el tipus d'estudi: "Revisar totes les bicicletes aparcades al pati per saber-ne el color"  **Resposta:** Cens  **Nivell:** N1

### Identificar el mètode de recollida de dades · N1 (identificar-metode-recollida)
1. **Enunciat:** Quin mètode de recollida de dades s'utilitza si: "Preguntar als usuaris d'un poliesportiu si estan satisfets amb les instal·lacions"?  **Resposta:** Enquesta  **Nivell:** N1
2. **Enunciat:** Quin mètode de recollida de dades s'utilitza si: "Utilitzar les temperatures mensuals publicades pel servei meteorològic"?  **Resposta:** Fonts secundàries  **Nivell:** N1
3. **Enunciat:** Quin mètode de recollida de dades s'utilitza si: "Anotar quants cotxes passen per davant de l'institut durant 20 minuts"?  **Resposta:** Observació directa  **Nivell:** N1

### Valorar si una mostra representa la població · N2 (seleccionar-mostra-representativa)
1. **Enunciat:** Es vol estudiar com es desplacen els habitants d’un municipi. Quina mostra és més representativa? A) persones de barris i edats diverses triades a l’atzar. B) només persones que esperen a una parada d’autobús.  **Resposta:** Mostra A  **Nivell:** N2
2. **Enunciat:** Es vol conèixer l’esport preferit de tot l’institut. Quina mostra és més representativa? A) 60 alumnes triats aleatòriament de tots els cursos. B) 60 alumnes de l’equip de futbol.  **Resposta:** Mostra A  **Nivell:** N2
3. **Enunciat:** Es vol estimar les hores de son de l’alumnat de 1r. Quina mostra és més representativa? A) alumnes triats a l’atzar de totes les classes de 1r. B) només alumnes d’una classe que surt a les 8 del matí.  **Resposta:** Mostra A  **Nivell:** N2

### Detectar i corregir el biaix d’una pregunta d’enquesta · N2 (detectar-pregunta-esbiaixada)
1. **Enunciat:** Per conèixer l’opinió sobre els deures, quina pregunta és més neutral i no esbiaixada?  **Resposta:** Quina quantitat de deures consideres adequada?  **Nivell:** N2
2. **Enunciat:** Per saber quantes hores dorm l’alumnat, quina pregunta és més neutral i no esbiaixada?  **Resposta:** Quantes hores dorms habitualment una nit lectiva?  **Nivell:** N2
3. **Enunciat:** Per estudiar la lectura, quina pregunta és més neutral i no esbiaixada?  **Resposta:** Quants llibres has llegit durant l’últim mes?  **Nivell:** N2

### Detectar dades duplicades o incoherents abans d’analitzar-les · N2 (depurar-dades)
1. **Enunciat:** En una base de dades apareix exactament dues vegades el mateix formulari de la mateixa persona. Què cal fer abans de comptar freqüències?  **Resposta:** Comprovar el duplicat i deixar una sola resposta si és el mateix registre  **Nivell:** N2
2. **Enunciat:** En una llista de temperatures d’un gimnàs apareix 230 °C. Què convé fer abans de calcular-ne la mitjana?  **Resposta:** Comprovar si és un error de registre abans d’analitzar la dada  **Nivell:** N2
3. **Enunciat:** En registrar l’edat d’alumnes de 1r apareix el valor 143 anys. Què convé fer abans d’analitzar les dades?  **Resposta:** Revisar i depurar aquesta dada perquè probablement és un error  **Nivell:** N2

### Extreure una conclusió limitada per les dades i la mostra · N2 (extreure-conclusio-justificada)
1. **Enunciat:** Una enquesta representativa de 200 alumnes mostra que el 60% prefereix l’opció A. Quina conclusió és més raonable?  **Resposta:** Aproximadament un 60% de la població podria preferir l’opció A  **Nivell:** N2
2. **Enunciat:** En una mostra representativa, 42 de 60 alumnes fan activitat física almenys tres dies per setmana. Quina afirmació és adequada?  **Resposta:** La mostra suggereix que aquesta pràctica és majoritària a la població  **Nivell:** N2
3. **Enunciat:** En una mostra representativa de 120 alumnes, 66 diuen que van a l’institut amb transport públic. Quina conclusió és adequada?  **Resposta:** Les dades suggereixen que aproximadament el 55% de la població podria fer servir transport públic  **Nivell:** N2

### Reconèixer les fases bàsiques d’un estudi estadístic · N1 (organitzar-estudi-estadistic)
1. **Enunciat:** Què hauria d’incloure un informe breu d’un estudi estadístic?  **Resposta:** La pregunta, com s’han recollit les dades, els resultats i la conclusió  **Nivell:** N1
2. **Enunciat:** Una investigació vol saber quin esmorzar és més habitual. Després de recollir les dades, quin pas ajuda a respondre la pregunta?  **Resposta:** Organitzar-les, analitzar les freqüències i formular una conclusió  **Nivell:** N1
3. **Enunciat:** Després d’enquestar l’alumnat sobre el temps de lectura, quin pas ajuda a respondre la pregunta inicial?  **Resposta:** Organitzar les respostes, calcular-ne les freqüències i formular una conclusió  **Nivell:** N1

### Estimar una proporció de la població a partir d’una mostra · N2 (estimar-proporcio-poblacional)
1. **Enunciat:** En una mostra representativa de 91 persones, 54 responen “sí”. Si la població té 1019 persones, aproximadament quantes esperaries que responguessin “sí” si la proporció es manté?  **Resposta:** 605  **Nivell:** N2
2. **Enunciat:** En una mostra representativa de 111 persones, 65 responen “sí”. Si la població té 660 persones, aproximadament quantes esperaries que responguessin “sí” si la proporció es manté?  **Resposta:** 386  **Nivell:** N2
3. **Enunciat:** En una mostra representativa de 68 persones, 31 responen “sí”. Si la població té 715 persones, aproximadament quantes esperaries que responguessin “sí” si la proporció es manté?  **Resposta:** 326  **Nivell:** N2

## Proves i limitacions

- Classificació i nivell comprovats contra `MIFirstStochasticFamilies` i el classificador compartit; cap discrepància detectada.
- Tots els exercicis del banc regular s’han validat exhaustivament; les rutes contextuals especificades s’han generat 250 vegades cadascuna.
- La bossa s’ha recorregut dues vegades i no ha repetit família en dues extraccions consecutives.
- La rotació dels problemes oberts ha passat 20 exercicis consecutius sense repetir família, inclòs el canvi de bossa.
- Navegador: Chrome local; pràctica guiada i oberta, examen de tema de 12 preguntes i viewport de 390 px sense desbordament. Han passat 30 mostres per cadascun dels altres 5 temes (150 per execució).
- No s’han modificat teoria, CSS ni temes fora del lot. GitHub Pages no s’ha publicat ni verificat perquè la PR és pendent de revisió i no es fusiona.
