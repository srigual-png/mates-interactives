# 2n ESO — Auditoria del Sentit estocàstic

## Estat i abast

Revisió documental dels **7 temes ordinaris i 84 tipus** de `2eso/sentit-estocastic.html`. S’exclouen `intervals3r`, `grafics3r`, `dispersio3r` i `probabilitat3r` (52 tipus d’ampliació de 3r, segons el registre actual: 13+12+12+12).

S’han contrastat els generadors actuals, `docs/dificultats/revisio-2eso-estocastic-punt3.json`, `docs/dificultats/resultats-punt3-2eso-estocastic.json` i `assets/js/dificultat-mi.js`. Les mostres prèvies s’han reutilitzat; no s’han repetit proves. **No s’ha modificat codi, nivell actiu, registre oficial de famílies ni workflows.** Aquesta revisió és estàtica; no s’ha fet simulació ni validació visual.

## Referent curricular

Les orientacions de la Generalitat per a 2n ESO inclouen la lectura i interpretació de taules i gràfics, població/individu, mostra, variables discretes i freqüències absolutes i relatives. També es recullen els diagrames d’arbre en la resolució de situacions matemàtiques i, per a l’estadística i la probabilitat, la regla de Laplace en esdeveniments compostos. Fonts: [Orientacions curriculars de Matemàtiques per cursos (XTEC)](https://xtec.gencat.cat/web/.content/curriculum/eso/concrecions-curriculars/Orientacions-curriculars_MAT_SEC_per-cursos.pdf) i [per sentits (XTEC)](https://xtec.gencat.cat/web/.content/curriculum/eso/concrecions-curriculars/Orientacions-curriculars_MAT_SEC_per-sentits.pdf).

Proposta de seqüenciació del producte: **N1** per identificar, llegir o calcular directament; **N2** per coordinar més d’una representació, invertir dades, jutjar biaix/qualitat, interpretar incertesa o resoldre probabilitat composta. No es força N3: no s’ha trobat una família ordinària amb procediment avançat propi que justifiqui aquest nivell a 2n.

## Nivells actius i proposta

La revisió prèvia i el mapa actual de `REVIEWED_LEVELS["2eso/estocastic"]` coincideixen en els 84 tipus. La proposta és, per tant, **mantenir els nivells actuals**, sense canvis.

| Tema | Tipus | N1/N2/N3 actuals | Proposta |
|---|---:|---:|---:|
| Dades, població i variables | 8 | 6/2/0 | 6/2/0 |
| Taules de freqüències | 12 | 10/2/0 | 10/2/0 |
| Gràfics estadístics | 12 | 10/2/0 | 10/2/0 |
| Centralització i dispersió | 12 | 8/4/0 | 8/4/0 |
| Investigacions estadístiques | 12 | 4/8/0 | 4/8/0 |
| Probabilitat teòrica i experimental | 15 | 13/2/0 | 13/2/0 |
| Experiments compostos | 13 | 7/6/0 | 7/6/0 |
| **Total** | **84** | **58/26/0** | **58/26/0** |

Això confirma una distribució de tipus, no un recompte de famílies. La deduplicació no autoritza a reetiquetar un tipus fàcil com a difícil ni a comptar variants contextuals com a famílies noves.

## Mapa tipus → família candidata

Els codis són **grups locals candidats**, no famílies oficials validades. «Variant» comparteix el nucli de procediment; «tasca diferent» canvia el que cal decidir o obtenir.

| Tema | Tipus i grup candidat | Decisió | Proposta |
|---|---|---|---:|
| Dades | D1: 1, 2, 3, 4 | Mateixa família àmplia d’identificació d’elements de l’estudi; població, mostra, individu i variable són variants de pregunta | N1 |
|  | D2: 5 | Tasca diferent: classificar la variable | N1 |
|  | D3: 7 | Tasca diferent: comptar freqüència en dades en brut | N1 |
|  | D4: 6, 8 | Mateixa família: valorar representativitat/afirmació sobre mostreig | N2 |
| Freqüències | F1: 1, 3, 4 | Mateixa família de freqüència absoluta/relativa; comptar, convertir decimal i recuperar recompte són variants de conversió | N1 |
|  | F2: 2, 5, 8 | Mateixa família: completar una taula; canvia la columna desconeguda | N1 |
|  | F3: 6 | Variant més exigent de lectura condicional/percentatge a partir de taula acumulada | N2 |
|  | F4: 7, 10 | Mateixa família: comptar o comparar un subconjunt de valors | N1 |
|  | F5: 11 | Tasca diferent: reconstruir dades en brut des de freqüències | N1 |
|  | F6: 9, 12 | Diagnòstic de coherència de taula; el tipus 9 localitza una incoherència entre columnes (N2), el 12 comprova una condició global directa (N1) | N1/N2 |
| Gràfics | G1: 1, 6, 7, 10 | Mateixa família: lectura de freqüència o valor representat; barres, pictograma, punts i afirmació són variants | N1 |
|  | G2: 2, 4, 5 | Mateixa família de lectura quantitativa amb suma/percentatge/angle | N1 |
|  | G3: 8, 9, 12 | Tasques diferents de lectura de Pareto, selecció del gràfic i comprovació d’elements | N1 |
|  | G4: 3, 11 | Mateixa família de crítica: contrastar amb una taula o detectar l’efecte d’un eix truncat | N2 |
| Centralització | C1: 1, 4, 7, 8, 10 | Mateixa família de càlcul directe d’una mesura; mitjana, mediana senar, moda i rang són procediments variants | N1 |
|  | C2: 2 | Tasca diferent: reconstruir una dada desconeguda a partir de la mitjana | N2 |
|  | C3: 3 | Tasca diferent: mitjana ponderada des d’una taula | N2 |
|  | C4: 5, 6 | Mateixa família: mediana de nombre parell de dades, directament o des de taula | N2 |
|  | C5: 9, 12 | Tasques d’interpretació/selecció de mesura, sense càlcul llarg | N1 |
|  | C6: 11 | Tasca diferent: comparar homogeneïtat a partir del rang | N1 |
| Investigacions | I1: 1, 2, 9, 12 | Mateixa família àmplia d’elements/seqüència d’investigació; classificar pregunta, població, fases i informe són variants amb objectiu diferent | N1 |
|  | I2: 3, 4, 5 | Mateixa família: adequació de mostra i biaix de selecció | N2 |
|  | I3: 6, 7 | Mateixa família: qualitat de la pregunta/opcions; neutralitat i solapament són variants | N2 |
|  | I4: 8, 10, 11 | Tasques diferents dins de la interpretació d’estudi: dada anòmala, mètode de recollida i conclusió justificable | N2 |
| Probabilitat | P1: 1, 2, 3, 4, 5 | Tasques conceptuals diferents dins de vocabulari bàsic: aleatori, espai, tipus d’esdeveniment, límits i equiprobabilitat | N1 |
|  | P2: 6, 7, 8 | Mateixa família: regla de Laplace en una etapa; dau, urna i ruleta són variants | N1 |
|  | P3: 9, 10 | Mateixa família: complement o canvi de representació decimal/percentual | N1 |
|  | P4: 11, 13, 15 | Tasques diferents: freqüència experimental, freqüència esperada i context històric | N1 |
|  | P5: 12, 14 | Mateixa família: diferenciar freqüència observada i teòrica i interpretar l’estabilització amb més repeticions | N2 |
| Experiments compostos | X1: 1, 3, 4, 13 | Mateixa família àmplia de representació d’etapes/espai mostral; arbre, llista i reconeixement són variants; el tipus 13 planteja problema d’ambigüitat per a examen | N1 |
|  | X2: 2, 6 | Mateixa família de recompte de combinacions/resultats amb producte o taula | N1 |
|  | X3: 5 | Tasca diferent: llegir la probabilitat d’un camí donat | N1 |
|  | X4: 7, 8, 9, 10, 11, 12 | Família de probabilitat composta; successos, complement, «almenys», «exactament», «cap» i unió són variants que exigeixen control de casos | N2 |

## Exemples resolts, errors i límits per família

### Dades (D1–D4)
- **D1:** en una escola de 240 alumnes n’enquestem 40: població = 240 alumnes; mostra = 40; un alumne és un individu; «nombre de llibres llegits» és la variable. Exemple variant: per estudiar l’esport preferit dels 240, l’esport preferit de cada alumne és la dada individual de la variable.
- **D2:** «assignatures aprovades» és quantitativa discreta perquè es compta en nombres enters; «color d’ulls» és qualitativa.
- **D3:** a les dades 2,1,2,3,2, la freqüència absoluta del 2 és 3; a 0,2,1,2, la del 1 és 1.
- **D4:** enquestar només l’equip de futbol per saber l’esport preferit de tot l’institut és esbiaixat; una afirmació que recomana no triar només un grup directament implicat és correcta.
- **Errors/límits:** no confondre mostra amb població; «individu» és cada unitat estudiada, no necessàriament una persona; comptar només valors observats; representativitat depèn de l’objectiu i del mètode, no només de la mida.

### Taules de freqüències (F1–F6)
- **F1:** si 15 de 25 alumnes trien una opció, fᵢ=15/25=0,6; si fᵢ=10% en una mostra de 20, nᵢ=0,10·20=2. Les dues preguntes són variants de relacionar recompte i freqüència.
- **F2:** en 32 dades amb recompte conegut de 4, 7, 2, 3 per a quatre valors, el recompte que falta és 32−(4+7+2+3)=16; una freqüència acumulada es reconstrueix sumant les absolutes fins a aquella fila.
- **F3/F4:** «com a màxim 2» suma les freqüències dels valors ≤2; si n(4)=4 i n(1)=2, la diferència és 2.
- **F5/F6:** si la taula diu n(0)=2 i n(1)=3, la llista reconstruïda conté 0,0,1,1,1; les freqüències relatives 0,25+0,30+0,15+0,40=1 són coherents.
- **Errors/límits:** acumulades no poden disminuir; les absolutes sumen el nombre d’individus; relatives sumen 1 (o 100% amb arrodoniment); una taula pot estar mal ordenada o tenir una cel·la impossible encara que la suma global sigui correcta.

### Gràfics (G1–G4)
- **G1/G2:** llegir 12 en una barra és lectura directa; sumar Bici=8 i Bus=5 dona 13; un sector del 50% ocupa 180° perquè 0,5·360°=180°.
- **G3:** un pictograma amb clau «1 símbol = 4 alumnes» i 3 símbols representa 12; per comparar categories, barres són adequades; per validar una representació cal títol, categories, escala i unitats/clau.
- **G4:** si el gràfic té barra d’A=20 i B=21 però la taula diu 20 i 25, no representa correctament la taula; un eix vertical que comença a 94 pot exagerar una diferència petita.
- **Errors/límits:** multiplicar pel valor de la clau en lloc de comptar símbols; sumar sectors com si fossin graus; sense escala ni denominador no es pot inferir una freqüència exacta; Pareto ordena categories per freqüència i sovint afegeix acumulada, no és un gràfic qualsevol.

### Centralització i dispersió (C1–C6)
- **C1:** mitjana de 11,6,10,7,9,5 = 48/6=8; mediana de 2,4,5,7,9,11,13 és 7; rang de 11,5,10,7,8 és 11−5=6.
- **C2/C3:** si la mitjana de 5 valors és 5, la suma és 25; coneguts 3,4,6,7, el valor que falta és 5. Amb valors 1,2,4 i freqüències 2,1,3, la mitjana ponderada és (2·1+1·2+3·4)/6=16/6.
- **C4:** 2,4,6,10 tenen mediana (4+6)/2=5; des d’una taula, es busquen les posicions centrals i es fan servir les acumulades.
- **C5/C6:** per repartir equitativament el total és adequada la mitjana; dos grups amb la mateixa mitjana són més homogenis segons rang si el seu rang és menor.
- **Errors/límits:** ordenar abans de trobar mediana; per n parell, mitjana dels dos valors centrals; moda pot ser múltiple o no existir segons la convenció; igual mitjana no implica igual dispersió; un valor extrem afecta la mitjana més que la mediana.

### Investigacions estadístiques (I1–I4)
- **I1:** «Quants minuts dura una hora?» no és pregunta estadística perquè té resposta fixa; en estudiar els llibres llegits per habitants, la població són els habitants objectiu; un ordre vàlid és pregunta → població/mostra → recollida → organització/anàlisi → conclusió.
- **I2/I3:** enquestar futbolistes sobre esport preferit crea biaix; «Quin esport t’agrada més?» és més neutral que «No creus que el futbol és el millor?»; intervals d’opcions 1–3 i 3–5 se solapen al 3.
- **I4:** davant 35 hores de son junt amb valors 6–9, primer cal verificar si és error de registre o valor real; no s’ha d’eliminar automàticament. Per observar ús d’espais, observació sistemàtica pot ser més adequada que preguntar només a un grup. Si 84/120=70% prefereixen començar més tard, la conclusió s’ha d’acotar a la mostra i al procediment.
- **Errors/límits:** una mostra petita no és automàticament esbiaixada, però pot ser poc precisa; conclusions no s’estenen més enllà del disseny; detectar un valor extrem no autoritza a esborrar-lo sense verificar-lo.

### Probabilitat teòrica i experimental (P1–P5)
- **P1/P2:** llançar moneda és aleatori; obtenir 9 amb dau és impossible; probabilitat 135% no és possible perquè P∈[0,1]; en un dau equilibrat, múltiple de 3 dona 2/6=1/3.
- **P3/P4:** si P(A)=0,8, P(no A)=0,2; 1/4=25%; 68 èxits en 100 proves donen freqüència relativa 0,68; si P=0,25 i N=100, freqüència esperada aproximada =25, no una garantia exacta.
- **P5:** una moneda equilibrada pot donar 15 cares de 40 (0,375) sense deixar de tenir probabilitat teòrica 0,5; amb més repeticions, la freqüència relativa tendeix a estabilitzar-se prop de 0,5, però no ha de ser exactament 0,5 en cada mostra.
- **Errors/límits:** els resultats d’una bossa no són equiprobables per color si hi ha proporcions diferents; probabilitat experimental depèn de les dades observades; la llei dels grans nombres descriu tendència, no el resultat de la propera prova; tipus 15 és una pregunta contextual/històrica, no un procediment de càlcul.

### Experiments compostos (X1–X4)
- **X1/X2:** dues monedes tenen espai {CC,CX,XC,XX} i 4 camins; un dau de 4 cares i una ruleta de 3 sectors tenen 4·3=12 combinacions; amb dos daus de 4 cares, la suma 4 té (1,3),(2,2),(3,1): 3 casos.
- **X3/X4:** si al diagrama cada branca té probabilitat 1/2, un camí de dues branques té 1/4; amb dos daus de 4 cares, suma 5 té 4/16=1/4; tres monedes, «almenys una cara» és 1−1/8=7/8; dues monedes, exactament dues cares és 1/4 i cap cara també 1/4; «cara o múltiple de 3» en moneda+dau és 1/2+2/6−(1/2·2/6)=2/3.
- **Errors/límits:** distingir parelles ordenades (1,2) i (2,1); no multiplicar probabilitats sense comprovar la independència; «o» pot incloure intersecció; «almenys una» acostuma a ser més fàcil pel complement; la regla de Laplace exigeix casos equiprobables.

## Deduplicació transversal

| Temes/vincles | Decisió |
|---|---|
| Dades: variable/població i Investigacions: definir població/pregunta | Relacionats, però tasques diferents: identificar elements d’un estudi vs valorar-ne el disseny i les conclusions. |
| Freqüències i gràfics | Mateix conjunt de dades pot aparèixer en taula o gràfic; llegir una barra és variant de lectura, però completar freqüències i criticar eixos són tasques diferents. |
| Freqüències i mitjana ponderada | La taula de freqüències alimenta el càlcul; convertir-la en una mesura central és una família diferent. |
| Investigacions: valor anòmal i Centralització: mitjana/rang | El context de dades es comparteix, però decidir què verificar és diferent de calcular una estadística. No eliminar valors extrems automàticament. |
| Probabilitat simple i Experiments compostos | Principi de Laplace compartit; simple (un pas) i compost (espai de resultats de més d’una etapa) són variants relacionades, no la mateixa tasca final. |
| Arbre i taula de contingència dins d’Experiments | Representacions alternatives de l’espai mostral; si codifiquen els mateixos resultats són variants, no famílies noves per format. |

Els grups són locals a aquest informe. **No s’ha actualitzat `families-validades.json`** perquè cap família d’aquest tema consta encara com a validada al registre oficial.

## Mancances i incidència a revisar

No es proposen exercicis nous: les set temàtiques cobreixen els procediments centrals descrits a les orientacions consultades. No trobar N3 és una conclusió curricular, no una invitació a etiquetar arbitràriament tasques directes com a avançades.

**Incidència sobre `experiments:13` i el mode examen:** el registre previ diu que aquest tipus queda exclòs de l’examen per ambigüitat de representació. El generador actual, però, `nextCompoundType()` recorre 1–13; `experiments` té `exam2n:true`; i `startExam()` crida `t.gen()` sense filtre per tipus. Per tant, no hi ha exclusió visible al codi actual i el tipus 13 pot aparèixer a l’examen. El tipus demana triar una representació adequada per seguir dues etapes, on més d’una representació pot ser vàlida. **Cal decidir si es concreta l’enunciat/resposta o s’exclou aquesta branca de l’examen; no s’ha aplicat cap correcció.**

## Modes i evidència

- **Guiat — revisió estàtica:** els generadors preparen `guide` i `solution`; la interfície existent exposa pistes/solució segons el mode. No s’ha recorregut visualment cada branca.
- **Autònom — revisió estàtica:** el nivell N2 es filtra amb l’anotació de dificultat i les pistes segueixen la configuració de mode. La classificació activa no prova per si sola que cada tasca sigui pedagògicament òptima.
- **Resposta oberta:** `allowOpen` depèn de la branca; `investigacions` retorna opcions per defecte, i altres temes alternen formats. No es pot afirmar que els 84 tipus siguin tots de resposta oberta.
- **Examen — revisió estàtica:** els set temes ordinaris tenen `exam2n:true`; les ampliacions de 3r, `exam2n:false`. El registre previ mostra 20 preguntes d’examen per tema amb distribucions N1/N2 indicades, però s’ha detectat que el tipus 13 d’Experiments no es filtra a la selecció actual.
- **Mostres reutilitzades:** generacions prèvies de 3.000–4.786 per tema ordinari; això és evidència de generació, no una simulació feta ara ni validació visual.
- **Simulació i validació visual:** no fetes en aquesta auditoria. No s’han executat proves ni workflows nous.

## Síntesi

- **84/84** tipus ordinaris comptabilitzats i vinculats als grups candidats de l’informe.
- Els 84 nivells de la revisió prèvia coincideixen amb el mapa actiu: **58 N1, 26 N2, 0 N3**. No es proposa reclassificació.
- No es proposen noves famílies ni canvis de codi; sí que es deixa documentada la incidència de `experiments:13` a l’examen per decidir-ne el tractament.
- Famílies candidates, no oficials; PR en Draft, sense fusió ni publicació.
