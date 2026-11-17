# 2n ESO · Sentit algebraic — auditoria de famílies i nivells

> Dictamen documental complet dels **88 tipus ordinaris**. Les ampliacions productes3r, identitats3r i sistemes3r (48 tipus) són excloses. PR #56 continua en Draft; no s’han canviat generadors, nivells actius ni families-validades.json.

## Abast, mètode i criteri curricular

Temes i cens contrastat amb els generadors de `2eso/sentit-algebraic.html`: patrons (8), expressions (10), equacions (12), problemes amb equacions (12), relacions (12), funcions lineals (17) i pensament computacional (17). Total: **88**.

S’han contrastat la revisió desada, els resultats de simulació, la continuació anterior i les branques dels set generadors. “Mateixa” vol dir mateix procediment i objectiu; “variant” canvia representació, signe, dades o context, sense canviar el nucli del procediment; “diferent” requereix una decisió o procediment nou. La proposta de nivell mira el raonament matemàtic, no la llargada ni l’aspecte de l’enunciat.

La seqüenciació de XTEC per a 2n inclou generalització de patrons, expressions, equacions i modelització de problemes, relacions funcionals i pensament computacional. Les funcions afins i l’ús de taules, fórmules i representacions gràfiques són coherents amb aquesta progressió. No hi ha una exigència curricular que cada tema contingui N3: cap procediment d’aquest inventari justifica forçar-lo. Font: [XTEC, Orientacions curriculars de Matemàtiques de l’ESO, seqüenciació per cursos](https://xtec.gencat.cat/web/.content/curriculum/eso/concrecions-curriculars/Orientacions-curriculars_MAT_SEC_per-cursos.pdf) i [seqüenciació per sentits, sentit algebraic](https://xtec.gencat.cat/web/.content/curriculum/eso/concrecions-curriculars/Orientacions-curriculars_MAT_SEC_per-sentits.pdf).

## Mapa complet tipus → família i nivell proposat

Les etiquetes “mateixa” i “variant” es refereixen a la família indicada a la primera columna; “diferent” assenyala un objectiu/procediment propi. Els noms entre claudàtors són identificadors documentals, no famílies oficials.

| Tema | Tipus → família | Relació i nivell | Motiu curt |
|---|---|---|---|
| Patrons | 1 → P1 continuar progressió aritmètica | base; N1 | Detectar d i fer un pas |
|  | 3 → P1 | variant; N1 | Llegir d, inclosa una d negativa |
|  | 2 → P2 terme llunyà des de successió | diferent; N2 | Generalitzar i no comptar terme a terme |
|  | 4 → P3 formular terme general | diferent; N2 | Inferir a₁ i d i expressar la regla |
|  | 7 → P3 | variant; N2 | Mateixa regla inferida des d’una taula |
|  | 8 → P3 | variant; N2 | Generalitzar un patró contextual/geomètric |
|  | 5 → P4 substituir en fórmula donada | diferent; N1 | Substitució directa de n |
|  | 6 → P4 | variant; N1 | Substituir quatre posicions successives |
| Expressions | 1 → E1 termes semblants | base conceptual; N1 | Reconèixer part literal igual |
|  | 2 → E2 reduir termes d’una variable | diferent; N1 | Operar coeficients de x |
|  | 3 → E3 reduir polinomi per graus | diferent; N1 | Agrupar x², x i constants |
|  | 4 → E4 reduir dues variables | diferent; N1 | Agrupar separadament x i y |
|  | 5 → E5 producte de monomis | diferent; N1 | Multiplicar coeficients i sumar exponents |
|  | 6 → E6 distributiva | diferent; N1 | Factor positiu i suma |
|  | 7 → E6 | variant; N1 | Factor negatiu; controlar signes |
|  | 8 → E7 distributiva seguida de reducció | diferent; N2 | Encadenar dues transformacions |
|  | 9 → E7 | variant; N2 | Reconèixer una forma equivalent després d’expandir/reduir |
|  | 10 → E8 diagnòstic d’error algebraic | diferent; N1 | Detectar i corregir una regla mal aplicada |
| Equacions | 1 → Q1 equació lineal ax+b=c | nucli; N2 | Aïllar x amb operacions inverses |
|  | 2 → Q1 | variant; N2 | Terme independent negatiu |
|  | 8 → Q1 | variant; N2 | Coeficient negatiu |
|  | 9 → Q1 | variant; N2 | Solució negativa |
|  | 3 → Q2 x als dos membres | diferent; N2 | Agrupar incògnites i constants |
|  | 4 → Q2 | variant; N2 | Signes diferents en els dos membres |
|  | 5 → Q3 equació amb parèntesis | diferent; N2 | Desfer la distributiva/aïllar |
|  | 6 → Q3 | variant; N2 | Distributiva més constant |
|  | 7 → Q3 | variant; N2 | Distributiva i x als dos membres |
|  | 10 → Q4 comprovar solució | diferent; N2 | Substituir candidats en una igualtat |
|  | 11 → Q5 transformació equivalent | diferent; N1 | Aplicar la mateixa operació als dos membres o distribuir |
|  | 12 → Q6 diagnosticar resolució | diferent; N1 | Localitzar el primer pas invàlid |
| Problemes | 1 → W1 significat de la incògnita | diferent; N1 | Interpretar x en un model ja escrit |
|  | 2 → W2 consecutius | diferent; N2 | Traduir x i x+1 a una equació |
|  | 3 → W3 edats/relació multiplicativa | diferent; N2 | Expressar el doble més una diferència i sumar |
|  | 4 → W4 enters parells consecutius | diferent; N2 | Representar el segon com x+2 |
|  | 5 → W5 cost unitari i càrrec fix | diferent; N2 | Nombre d’unitats desconegut i cost lineal |
|  | 7 → W5 | variant; N2 | Mateix model de quota fixa + tarifa per unitat |
|  | 6 → W6 perímetre rectangular | diferent; N2 | Construir 2x+2(x+k)=P |
|  | 8 → W7 repartir després d’afegir | diferent; N2 | Invertir addició i divisió: (x+a)/g=q |
|  | 9 → W8 descompte invers | diferent; N2 | Recuperar preu inicial a partir del percentatge restant |
|  | 10 → W9 distància, velocitat i temps | diferent; N2 | Tram conegut més velocitat·temps |
|  | 11 → W10 validar solució contextual | diferent; N1 | Comprovar substitució i unitats/sentit |
|  | 12 → W11 diagnosticar modelització | diferent; N2 | Detectar perímetre confós amb semiperímetre |
| Relacions | 1 → R1 rols de variables | mateixa; N1 | Identificar variable independent |
|  | 2 → R1 | variant; N1 | Identificar variable dependent |
|  | 3 → R2 decidir si una taula defineix funció | nucli; N1 | Cada x té com a màxim una y |
|  | 4 → R2 | variant; N1 | Mateix criteri en parelles ordenades |
|  | 11 → R2 | variant; N1 | Repetició de x amb dues imatges |
|  | 12 → R2 | variant contextual; N1 | Una persona/alumne té una sola data associada |
|  | 5 → R3 avaluar fórmula | diferent; N1 | Substituir x i obtenir y |
|  | 8 → R3 | variant; N1 | Llegir imatge de x en taula contextual |
|  | 6 → R4 completar taula | diferent; N1 | Calcular valor absent amb fórmula donada |
|  | 7 → R5 parella ordenada contextual | diferent; N1 | Associar coordenades i unitats al context |
|  | 9 → R6 inferir fórmula de taula | diferent; N2 | Identificar variació i valor inicial |
|  | 10 → R7 trobar antecedent | diferent; N2 | Invertir una relació lineal donada |
| Funcions lineals | 1 → F1 classificar forma de funció | nucli; N1 | Reconeixement de funció lineal |
|  | 4 → F1 | variant; N1 | Cas constant y=0 |
|  | 5 → F2 proporcionalitat directa | diferent; N1 | Comprovar si l’ordenada a l’origen és zero |
|  | 2 → F3 identificar pendent | diferent; N1 | Llegir coeficient de x |
|  | 3 → F4 identificar ordenada a l’origen | diferent; N1 | Llegir terme independent |
|  | 10 → F3 | variant contextual; N1 | Interpretar pendent com a taxa |
|  | 11 → F4 | variant contextual; N1 | Interpretar valor inicial |
|  | 6 → F5 trobar fórmula des de taula | nucli; N2 | Inferir m i b a partir de valors |
|  | 14 → F5 | variant; N2 | Mateix objectiu des del gràfic |
|  | 9 → F5 | variant contextual; N2 | Traduir càrrec fix i taxa en fórmula |
|  | 7 → F6 pendent entre dos punts | diferent; N2 | Calcular quocient de canvis |
|  | 8 → F7 comprovar pertinença d’un punt | diferent; N1 | Substituir x i comparar y |
|  | 12 → F8 avaluar funció | diferent; N1 | Calcular y per x donat |
|  | 15 → F8 | variant representacional; N1 | Llegir y associada a x en taula gràfica |
|  | 13 → F9 trobar x a partir de y | diferent; N2 | Resoldre l’equació inversa |
|  | 16 → F10 comparar tarifes | diferent; N2 | Avaluar dos models i comparar resultats |
|  | 17 → F11 funció o equació | diferent; N1 | Distingir regla amb variable lliure d’igualtat |
| Pensament computacional | 1 → C1 traçar assignacions seqüencials | nucli; N2 | L’ordre de les instruccions modifica el valor |
|  | 2 → C1 | variant; N2 | Suma abans de multiplicar |
|  | 3 → C2 seguir condicional | diferent; N2 | Avaluar una condició i prendre una branca |
|  | 4 → C2 | variant; N2 | Condició de paritat |
|  | 5 → C3 iteració repetida | diferent; N1 | Actualitzar una variable amb increment fix |
|  | 6 → C3 | variant; N1 | Iteració multiplicativa |
|  | 7 → C4 acumulador | diferent; N1 | Sumar una quantitat en un total inicialitzat |
|  | 8 → C5 bucle mentre | diferent; N2 | Seguir actualitzacions fins que la condició deixa de complir-se |
|  | 9 → C6 condició amb I | diferent; N1 | Conjunció: s’han de complir les dues desigualtats |
|  | 10 → C7 condició amb O | diferent; N1 | Disjunció: n’hi ha prou amb una |
|  | 11 → C8 traduir regla contextual a condició | diferent; N1 | Formalitzar llindar inclusiu/exclusiu |
|  | 12 → C9 ordenar operacions en un algorisme | diferent; N1 | Construir seqüència d’instruccions equivalent |
|  | 13 → C10 depurar repeticions | diferent; N2 | Detectar el desfasament entre n iteracions i n−1 salts |
|  | 14 → C11 fórmula de full de càlcul | diferent; N2 | Escriure una funció amb referència a cel·la |
|  | 15 → C12 avaluar fórmula de full de càlcul | diferent; N1 | Substitució numèrica a una cel·la |
|  | 16 → C13 expressar successió en pseudocodi | diferent; N2 | Relacionar recurrència iterativa amb terme general |
|  | 17 → C14 identificar concepte computacional | diferent; N1 | Reconèixer iteració com a estructura de control |

## Fitxes de famílies: exemples resolts, errors i límits

Els exemples són representatius dels procediments existents; no afegeixen generadors ni famílies oficials.

### Patrons

- **P1 Progressió aritmètica (1, 3).** Exemples: 4, 7, 10 → d=3 i següent 13. En 17, 21, 25, d=4. Errors: restar en ordre diferent o confondre d amb un terme. Límit: d negativa i d=0 han de ser vàlides.
- **P2 Terme llunyà (2).** 2, 6, 10,… té a₁=2,d=4; a₁₄=2+13·4=54. Errors: multiplicar per n en lloc de n−1. Límit: n=1 ha de retornar a₁; mantenir índex començant a 1.
- **P3 Regla general des de termes/taula/context (4,7,8).** 10,13,16,… → aₙ=10+3(n−1)=3n+7. Taula 9,15,21,27 → aₙ=9+6(n−1). Errors: usar n salts des del primer terme o ajustar només una fila. Límit: validar la regla amb dues posicions; separar dades no lineals si s’amplia el banc.
- **P4 Substitució en regla donada (5,6).** aₙ=7+4(n−1): a₇=31; quatre primers termes de 4+3(n−1): 4,7,10,13. Errors: parèntesi/precedència. Límit: terme a₁ i d negativa.

### Expressions

- **E1 Terme semblant (1).** 3x² i −5x² són semblants; 3x² i 3x no. Error: comparar coeficients en lloc de part literal. Límit: exponents i variables han de coincidir exactament.
- **E2 Reducció d’una variable (2).** 6x+5x−4x=(6+5−4)x=7x. Error: sumar exponents en una suma. Límit: coeficient resultant zero.
- **E3 Reducció per graus (3).** 5x²−x²+7x+5x+5−4=4x²+12x+1. Error: ajuntar graus diferents. Límit: coeficients negatius i termes absents.
- **E4 Dues variables (4).** 3x+5y+5x−4y=8x+y. Error: combinar x amb y. Límit: eventualment més variables, sense canviar regla.
- **E5 Producte de monomis (5).** (4x³)(2x²)=8x⁵; (−3x)(2x²)=−6x³. Errors: sumar coeficients o multiplicar exponents. Límit: signe i exponent zero.
- **E6 Distributiva (6,7).** 3(x+6)=3x+18; −4(x−2)=−4x+8. Error: no multiplicar el segon terme o perdre el doble signe. Límit: factor −1 i resta dins parèntesi.
- **E7 Distributiva + reducció/equivalència (8,9).** 2(x+6)+x−3=3x+9; 5(x+7)+5x=10x+35. Error: reduir abans de distribuir ometent termes. Límit: formes equivalents amb ordre/coefs diferents.
- **E8 Diagnòstic (10).** 4(x+3)≠4x+3; correcte 4x+12. 2x+3x=5x, no 5x². Error: només marcar resposta sense explicar la regla. Límit: missatge d’error ha de tenir una correcció unívoca.

### Equacions

- **Q1 ax+b=c i variants de signe (1,2,8,9).** 2x+1=17 → x=8. −7x+8=−34 → −7x=−42 → x=6. Errors: operació inversa/signs. Límit: solucions zero o negatives.
- **Q2 Incògnita en ambdós membres (3,4).** 4x−2=3x+3 → x=5. Error: canviar de membre sense canviar signe. Límit: coeficients iguals poden donar cap solució o identitat, no forçar si el generador no ho tracta.
- **Q3 Parèntesis i equació composta (5,6,7).** 3(x+2)=30 → x=8; 4(x+1)+6=42 → 4x=32 → x=8. Error: distribuir només a un terme. Límit: signes externs i x als dos membres.
- **Q4 Comprovar una candidata (10).** Per 5x+4=−6, x=−2 perquè 5(−2)+4=−6. Error: “resoldre” de nou quan només es demana verificar. Límit: candidats diversos i cap candidat correcte.
- **Q5 Transformació equivalent (11).** 2x+7=4x+3, restar 4x dona −2x+7=3. Error: fer operació en un sol membre. Límit: distingir “aplica distributiva” de “resta el terme”.
- **Q6 Diagnòstic de pas (12).** −2x+5=13; després de restar 5: −2x=8; dividir per −2 dona x=−4. Error típic és perdre el signe negatiu en dividir. Límit: identificar el primer error, no un error posterior inventat.

### Problemes amb equacions

- **W1 Significat de x (1).** 3x+4=31: x és el preu d’una entrada; (31−4)/3=9 €. Error: dir que x és el total. Límit: distingir unitat/preu unitari i quantitat.
- **W2 Consecutius (2).** x+(x+1)=35 → 2x=34 → x=17. Error: representar consecutiu com x+2. Límit: parells consecutius usa x i x+2 (W4).
- **W3 Edats/relació verbal (3).** germà x, Laia 2x+4; 3x+4=43 → x=13. Error: invertir qui és el doble. Límit: verificar edats positives i suma.
- **W4 Parells consecutius (4).** x+(x+2)=66 → x=32. Error: usar x+1. Límit: especificar que x és parell; la suma sola no en garanteix la paritat si es canvien dades.
- **W5 Preu lineal fix + unitari (5,7).** 5x+8=48 → x=8; 3x+8=29 → x=7 GB. Error: multiplicar també el càrrec fix. Límit: quantitats enteres o fraccionàries i unitats.
- **W6 Perímetre (6).** 2x+2(x+5)=58 → 4x+10=58 → x=12 cm. Error: igualar només x+(x+5) al perímetre. Límit: dimensió positiva i coherència del costat llarg.
- **W7 Afegir i repartir (8).** (x+12)/5=9 → x=33 peces. Error: sumar les 12 després de dividir. Límit: grups/peces enters i pregunta per quantitat inicial.
- **W8 Descompte invers (9).** Amb 20% de descompte, queda 80%; 0,8x=200 → x=250 €. Error: afegir 20% sobre 200 (240). Límit: zero/descompte 100% no dona preu original finit.
- **W9 Distància (10).** 8+6x=26 → x=3 h. Error: multiplicar la distància ja recorreguda per la velocitat. Límit: unitats compatibles i temps no negatiu.
- **W10 Validar solució (11).** Si x=7 i substituïda en el perímetre dona el valor de l’enunciat, és solució admissible si també compleix dimensions. Error: confondre comprovació algebraica amb contextual. Límit: una igualtat satisfeta pot donar longitud impossible si x≤0.
- **W11 Diagnòstic del model (12).** Amplada x, llargada x+4, perímetre 36: l’error és escriure x+(x+4)=36; cal 2x+2(x+4)=36. Error: resposta vaga “falta el 2” sense explicar els dos parells de costats. Límit: diferenciar perímetre i semiperímetre.

### Relacions i funcions

- **R1 Variables (1,2).** En temperatura segons temps, el temps és independent; massa segons paquets, la massa és dependent. Error: decidir pel nom i no per “depèn de”. Límit: depèndencia pot no ser causal.
- **R2 Funció (3,4,11,12).** Taula x=0,1,2 amb y=6,11,16 és funció; si x=2 apareix amb y=6 i y=9, no. Error: exigir y diferents (no cal) o prohibir dos x amb la mateixa y. Límit: a cada entrada una sola sortida; múltiples entrades poden compartir imatge.
- **R3 Avaluar/llegir (5,8).** y=2x−1; x=5 → y=9. Si taula dona 5,10,15,25, x=3 → 15. Error: llegir fila/columna invertida. Límit: unitats i valors no enumerats.
- **R4 Completar taula (6).** y=2x+4; per x=1, y=6. Error: copiar valor d’una columna adjacent. Límit: falta al començament, al mig o al final.
- **R5 Parella ordenada (7).** 4 entrades a 5 € cadascuna → (4,20). Error: invertir (x,y). Límit: incloure unitats només a la coordenada dependent.
- **R6 Inferir fórmula (9).** 3,7,11,15 quan x=0,1,2,3: pendent 4 i origen 3; y=4x+3. Error: confondre primer y amb pendent. Límit: validar tots els punts.
- **R7 Inversa (10).** 6x+4=46 → x=7. Error: calcular y en lloc de desfer operacions. Límit: taxa zero pot fer la inversa indeterminada/impossible.

- **F1 Classificació de forma (1,4).** y=−2x és lineal; y=0 és constant i també cas de pendent 0. Error: confondre lineal/afí segons convenció no explicitada. Límit: l’enunciat ha de fixar la terminologia emprada.
- **F2 Proporcionalitat directa (5).** y=−3x−5 no és directa perquè b≠0. Error: mirar només el pendent. Límit: y=mx, passa per origen, inclòs m=0.
- **F3 Pendent i interpretació (2,10).** A y=−2x+1, m=−2; si y=5x+2 és massa total, cada paquet afegeix 5 kg. Error: confondre b i m. Límit: signe i unitats per x.
- **F4 Ordenada i interpretació (3,11).** y=x+5 dona b=5; y=3x+4 significa 4 kg abans d’afegir paquets. Error: interpretar b com a variació. Límit: b pot ser negatiu o zero.
- **F5 Fórmula des de taula/gràfic/context (6,9,14).** Taula 2,5,8,11 per x=0,1,2,3 → y=3x+2; una caixa de 4 kg amb paquet de 3 kg → y=3x+4. Error: no identificar m ni b. Límit: comprovar almenys dos punts; gràfic ha de permetre llegir coordenades.
- **F6 Pendent entre punts (7).** (−1,0),(2,6): m=(6−0)/(2−(−1))=2. Error: invertir ordre només al numerador o denominador. Límit: x igual dona recta vertical, no funció lineal y(x).
- **F7 Pertinença (8).** (0,−5) pertany a y=−3x−5 perquè substituint x=0 dona −5. Error: comprovar x sense y. Límit: coordenades exactes i ordenades.
- **F8 Avaluació/lectura (12,15).** y=−3x−4, x=5 → −19; des d’una taula/gràfic, llegir la y que correspon a x=2. Error: signe o escala del gràfic. Límit: valors negatius i escala no unitària.
- **F9 Inversa (13).** −5x−2=−22 → x=4. Error: dividir abans d’aïllar constant. Límit: pendent zero no és invertible.
- **F10 Comparar tarifes (16).** x=5: A=5·5+7=32; B=7·5+5=40; A és més barata. Error: comparar només quota fixa o pendent. Límit: l’ordre pot canviar segons x; comparar al consum demanat.
- **F11 Funció o equació (17).** y=2x+7 és regla que assigna y a cada x; 2x+7=2x+7 és una igualtat/equació (identitat), no una regla funcional escrita com a tal. Error: classificar pel fet que aparegui x. Límit: expressió amb variables necessita domini/relació per ser funció.

### Pensament computacional

- **C1 Traçar seqüència d’assignacions (1,2).** x=7; després ×4 i +4 → 32. Si sume abans i després multiplico: (6+7)·5=65. Error: executar en ordre diferent. Límit: cada assignació reemplaça el valor anterior.
- **C2 Condicional (3,4).** x=15, si x≥9 suma 2 →17; si x=18 és parell, x/2=9. Error: executar ambdues branques. Límit: igualtat al llindar i parell/senar negatius.
- **C3 Iteració d’una variable (5,6).** 7+4·6=31; 4·2²=16 després de dues multiplicacions per 2. Error: comptar una iteració extra. Límit: zero iteracions retorna valor inicial.
- **C4 Acumulador (7).** total=0; 6 vegades +4 →24. Error: començar acumulador amb el valor de l’element. Límit: nombre de repeticions zero.
- **C5 Bucle mentre (8).** x=3; mentre x<19, sumar 4: 3→7→11→15→19; quatre execucions. Error: comptar comprovacions en lloc d’execucions. Límit: assegurar que el bucle acaba.
- **C6 Conjunció I (9).** x>3 i x<11: 7 compleix. Error: tractar “i” com “o”. Límit: límits exclosos si són < i >.
- **C7 Disjunció O (10).** x<2 o x>10: 12 compleix; 5 no. Error: exigir les dues condicions. Límit: valors de frontera.
- **C8 Condició contextual (11).** “menors de 12” → edat<12, no ≤12. Error: ignorar si el límit s’inclou. Límit: frases “com a màxim”, “a partir de”.
- **C9 Ordenar instruccions (12).** Primer multiplicar i després sumar 4: x←x·2; x←x+4. Error: invertir ordre. Límit: escriure l’entrada i resultat final sense ambigüitat.
- **C10 Depurar iteracions (13).** Per arribar a terme n des d’a₁ calen n−1 salts; repetir n vegades suma un pas de més. Error: confondre termes i salts. Límit: n=1 requereix zero salts.
- **C11–C12 Full de càlcul (14,15).** Si A2 són hores, cost fix 3 i tarifa 2/h → =3+2*A2; amb A2=9 i =5*A2+1, B2=46. Errors: no començar amb = o confondre referència amb valor literal. Límit: precedència i referències relatives.
- **C13 Successió iterativa (16).** a₁=6, d=3; n=5 → 6+4·3=18. Error: n iteracions en lloc de n−1. Límit: equivalència entre pseudocodi i fórmula explícita.
- **C14 Concepte (17).** REPETEIX 5 VEGADES suma 2 representa iteració/repetició. Error: respondre “variable” o “condició”. Límit: l’ítem avalua vocabulari, no traçat d’algorisme.

## Buits curriculars i propostes

No s’ha trobat un buit que justifiqui crear exercicis nous: el conjunt cobreix patrons recursius i explícits, expressions i equivalència, equacions i comprovació, modelització, funcions en forma verbal/taula/fórmula/gràfic i estructures bàsiques d’algorismes. Algunes branques són més estretes que el saber complet (p. ex. bucles, gràfics i casos límit); això és oportunitat d’ampliar varietat, però no prova que falti una família. No es proposen exercicis nous ni N3 artificials. La decisió de cobrir bucles més avançats o sistemes es deixa fora: aquests últims són contingut ordinari de 3r en la seqüenciació consultada.

## Revisió de modes i evidència

- **Estàtica (codi actual):** la pàgina defineix set generadors amb 8/10/12/12/12/17/17 opcions de tipus; les branques retornen pregunta, resposta, alternatives, passos guia i solució. Hi ha selecció de pràctica guiada/sense pistes, resposta múltiple/oberta i mode examen general i d’examen per tema. Les ampliacions 3ESO estan marcades fora de l’examen ordinari de 2n. Inspecció del codi, no recorregut visual.
- **Simulació desada, no repetida:** `resultats-punt3-2eso-algebraic.json` registra 3.000 generacions per tema (30.000 incloent 3 temes 3ESO). A 2n, cobertura observada per nivell: patrons 4/4/0; expressions 8/2/0; equacions 2/11/0; problemes 2/10/0; relacions 10/2/0; funcions 11/6/0; computacional 9/8/0. En conjunt, els nivells actius proposats són 46 N1, 42 N2 i 0 N3. Distribució d’examen observada: patrons 6/6/0; expressions 8/4/0; equacions 6/6/0; problemes 2/10/0; relacions 10/2/0; funcions 6/6/0; computacional 6/6/0. Examen equilibrat o només N3 queda bloquejat per absència de N3. Són comptatges de resultats desats, no garantia que totes les branques i tots els modes siguin perfectes.
- **Auditoria heretada:** la continuació registra 8.332 solucions d’equacions contrastades per substitució; 637 expansions d’identitats a quatre valors de x i rebuig de 557 respostes amb coeficients intercanviats; 1.156 gràfics contrastats amb punts SVG; 844 variants d’equacions amb/sense metadades d’error; set exàmens de tema amb lliurament, nota, reinici i retorn a pràctica; regressió de 500 generacions, equivalències, opcions úniques, mòbil, examen general i accessos del cercador. Són evidències de la passada prèvia sobre el codi revisat allí; no s’atribueix una revalidació nova a aquest dictamen.
- **Visual:** no consta prova de navegador amb revisió de cada banc/portada/diagrama. El registre disponible indicava 0 bancs revisats; per tant, la qualitat visual, els estats accessibles i tots els casos de pantalla petita resten sense certificació visual.

No hi ha hagut canvis de codi; per tant, no s’han executat proves noves ni repetit les aprovades. La verificació d’abast confirma els 88 tipus ordinaris; les tres ampliacions de 3r continuen excloses. No s’han modificat nivells de producció ni el registre oficial de famílies.

## Conclusió i estat de la PR

La proposta heretada 46 N1 / 42 N2 / cap N3 es manté adequada al nivell de procediment observat. La comparació completa no revela duplicacions exactes que calgui eliminar ni buit prou justificat per afegir una nova família; les coincidències de context/representació s’han documentat com variants quan preserven el procediment. PR #56 resta **oberta i en Draft**, sense fusió ni publicació.


## Segon exemple resolt per família

Aquesta taula completa la fitxa anterior: cada família disposa així de dos exemples resolts, a més dels errors típics i límits ja indicats.

| Família | Segon exemple resolt |
|---|---|
| P1 | 12, 9, 6 → d=−3; següent terme 3. |
| P2 | 5, 8, 11,… → a₂₀=5+19·3=62. |
| P3 | Taula (n,aₙ)=(1,4),(2,9),(3,14) → d=5 i aₙ=4+5(n−1)=5n−1. |
| P4 | aₙ=2+6(n−1): a₅=26; primers quatre: 2, 8, 14, 20. |
| E1 | 4ab i −7ab són semblants; 4ab i 4a²b no. |
| E2 | 9x−2x+4x=11x. |
| E3 | 2x²+3x−x²−5x+8= x²−2x+8. |
| E4 | 7x−2y−3x+5y=4x+3y. |
| E5 | (−2x²)(3x⁴)=−6x⁶. |
| E6 | 5(x−3)=5x−15. |
| E7 | 3(x−2)+2x+1=5x−5. |
| E8 | Error 3(x+2)=3x+2; desenvolupament correcte 3x+6. |
| Q1 | 3x−5=10 → 3x=15 → x=5. |
| Q2 | 7x+2=4x+14 → 3x=12 → x=4. |
| Q3 | 2(x−3)+4=12 → 2x−2=12 → x=7. |
| Q4 | Per 3x−2=10, x=4 és solució perquè 12−2=10; x=3 no ho és. |
| Q5 | 5x+4=2x+16; restar 2x dona 3x+4=16. |
| Q6 | 4(x+2)=20; si s’escriu 4x+2=20, el primer error és no distribuir 4 al 2. |
| W1 | 2x+6=24: x representa el cost unitari; x=9 €. |
| W2 | Dos nombres consecutius sumen 51: x+(x+1)=51 → x=25. |
| W3 | Una germana té 3 anys més que el triple d’un germà; suma 35: 4x+3=35 → x=8. |
| W4 | Parells consecutius sumen 42: x+(x+2)=42 → x=20. |
| W5 | 4 viatges a 2 € més 3 € fixos: 2x+3=11 → x=4 viatges. |
| W6 | Costats x i x+2, perímetre 28: 2x+2(x+2)=28 → x=6. |
| W7 | Després d’afegir 8 objectes, 4 grups tenen 6 cadascun: (x+8)/4=6 → x=16. |
| W8 | Descompte 25%, preu final 90: 0,75x=90 → x=120 €. |
| W9 | 12 km inicials + 4 km/h durant x hores = 28 km → x=4 h. |
| W10 | x=6 satisfà 2x+8=20; la longitud és positiva i la comprovació contextual és vàlida. |
| W11 | Amplada x, llargada x+3, perímetre 30: el model correcte és 2x+2(x+3)=30, no x+(x+3)=30. |
| R1 | El nombre de litres depèn del temps: temps independent, litres dependents. |
| R2 | {(1,4),(1,7)} no és funció; {(1,4),(2,4)} sí que ho és. |
| R3 | y=3x+2 i x=4 → y=14; taula amb x=2 i y=9 → imatge 9. |
| R4 | y=3x+2; si falta y quan x=5, y=17. |
| R5 | 3 llibretes a 2 €: parella ordenada (3,6). |
| R6 | x=0,1,2 i y=−2,1,4 → pendent 3, ordenada −2, fórmula y=3x−2. |
| R7 | y=4x+3 i y=23 → 4x=20 → x=5. |
| F1 | y=4x és lineal; y=6 és constant (afí amb pendent 0). |
| F2 | y=7x és directament proporcional perquè b=0; y=7x+1 no. |
| F3 | En y=4x−3, pendent 4; si y són litres i x minuts, augmenten 4 L/min. |
| F4 | En y=2x−6, ordenada a l’origen −6. |
| F5 | Taula x=0,1,2 i y=−1,2,5 → y=3x−1. |
| F6 | (1,2),(4,8): m=(8−2)/(4−1)=2. |
| F7 | (2,5) pertany a y=2x+1 perquè 2·2+1=5. |
| F8 | y=4x−1, x=3 → y=11. |
| F9 | 3x+2=17 → x=5. |
| F10 | Amb x=2, A=3x+4=10 i B=5x+1=11; A és més barata. |
| F11 | y=3x+2 especifica una assignació; 3x+2=11 és una equació per resoldre. |
| C1 | x=5; x←x+3; x←2x → x=16. |
| C2 | x=4, si x>4 aleshores +1, si no −1 → x=3 (branca falsa). |
| C3 | x=10, repetir 3 cops x←x−2 → x=4. |
| C4 | total=0, quatre iteracions amb +7 → total=28. |
| C5 | x=1; mentre x<10 sumar 3: 1→4→7→10; tres execucions. |
| C6 | 2<x<8: el valor 5 compleix; 8 no compleix perquè el límit és estricte. |
| C7 | x≤0 o x≥10: −2 compleix; 5 no. |
| C8 | “com a màxim 12” → x≤12, inclou 12. |
| C9 | Primer restar 3 i després multiplicar per 2: x←x−3; x←2x. |
| C10 | De posició 1 a posició 6 hi ha 5 salts; repetir 6 salts seria un de més. |
| C11–C12 | Si A2=6 i B2=4*A2+3, B2=27; amb tarifa 5 fixos + 1,5 per hora, fórmula =5+1,5*A2. |
| C13 | a₁=2,d=5,n=4: inicialitzar 2 i sumar 5 tres vegades → a₄=17. |
| C14 | “SI…ALES HORES…SI NO” és selecció/condicional; REPETEIX és iteració. |
