Estat posterior: [punt 2 implementat i validat](punt2-unificacio.md). Les dades següents es conserven com a registre de la fase anterior.

# Diagnosi global de dificultats i treball necessari

> Actualització: els errors confirmats del punt 1 ja estan corregits. Vegeu [punt1-correccions.md](punt1-correccions.md). Les incidències i propostes següents descriuen la diagnosi anterior a aquesta correcció.

30 d’octubre de 2026. Aquesta passada és de **validació i diagnosi**, no una reclassificació massiva. No s’ha modificat el comportament de la web en aquesta passada. Es manté la correcció parcial anterior de racionals de 2n.

## Resultat principal

La revisió ha passat pels **20 blocs de curs/sentit**, amb **231 entrades TOPICS**, incloses ampliacions. S’han fet **41.580 crides de generació** (180 per tema) i observat **2.468 parelles tema/tipus**. No són necessàriament 2.468 famílies pedagògiques diferents: una mateixa família pot tenir diversos tipus, i un mateix tipus pot tenir variants de diferent nivell. No és un cens exhaustiu certificat.

S’han construït **159 exàmens per tema** en la configuració inicial. Tots han retornat 12 preguntes amb quotes del motor. Això **no demostra coherència pedagògica**: hi ha 21 parelles tema/tipus sense nivell que queden fora de les quotes, i hi ha tasques directes classificades com a altes en tots els cursos i sentits.

També s’han repetit els cinc blocs de 4t activant A i B. En A, mesura admet cinc temes d’examen; en B, vuit. En espacial, B incorpora rectesAmpA i geometriaAnaliticaAmpD, que a la interfície es diuen ampliacions però són exigibles en aquesta opció. No s’han d’excloure només pel nom.

La revisió pedagògica següent és una diagnosi de les tasques mostrades i de mostres per bloc. **No dóna per certificades totes les famílies, totes les solucions ni tots els dibuixos.** Els totals de generació inclouen repeticions. Els exemples següents permeten decidir el treball, sense confondre una prova funcional que passa amb una dificultat ben assignada.

## Causes confirmades

1. **Diverses fonts de dificultat.** S’han trobat **129 mostres guardades, corresponents a 45 parelles tema/tipus**, amb diferència entre el nivell declarat pel generador i el calculat per l’examen (`divergencies-nivells.json`). No són 129 famílies diferents. Exemple: proporcionalitat directa de 1r declarada baixa pel generador pot passar a alta en l’examen.  Hi ha `diff`, `difficulty`, mapes dins l’examen per tema, classificacions de problemes contextuals i mapes propis de fitxes. La pràctica guiada/autònoma és un altre eix. No hi ha una font única revisada per curs/tema/tipus/variant.
2. **Classificació basada en procediment o complexitat aparent.** A 1r, el motor pot pujar conversions segons salts d’unitats i potències segons exponent/mida del radicand. A altres cursos, tipus que només apliquen fórmules o llegeixen dades estan fixats a alta.
3. **Mapes incomplets.** `.findIndex(...)+1` retorna 0 si no troba el tipus. En construir l’examen només es recorren nivells 1–3: aquests exercicis desapareixen sense bloquejar la preparació. Els exàmens continuen sortint amb altres preguntes.
4. **Selectors diferents entre modes.** La majoria de pràctiques ofereixen pistes sí/no, no baixa/mitjana/alta. Els exàmens per tema tenen quotes internes. Els exàmens globals seleccionen temes però no asseguren quotes baixa/mitjana/alta compartides amb l’examen per tema. Cal decidir i explicitar cada comportament, no assumir un selector universal.
5. **Bancs fora de TOPICS.** A 1r numèric hi ha AMP_CATS; a 1r mesura MEASURE_PROBLEM_PATTERNS; espacial/estocàstic de 1r tenen bancs específics de resposta oberta. Un cens basat només en TOPICS els deixa fora o confon el generador de test amb el d’oberta.
6. **Variants que redueixen el raonament.** Repetir quatre girs de 90° dóna una volta completa; una composició que es cancel·la o una expressió que es simplifica pot convertir una plantilla alta en directa. Cal validar el resultat matemàtic de la variant i la decisió que exigeix.

## Els quatre casos inicials de 2n

Aquesta còpia del repositori no els classifica com a alts en l’examen per tema: racionals:1 (fracció a decimal) és baixa; operacionsRacionals:17 (primer pas) és baixa; aproximacions:7 (menor error absolut) és mitjana; percentatges:7 (disminució directa) és mitjana. Els dos darrers també es poden rebaixar després de revisar la tasca directa. No s’ha reproduït que una selecció alta del motor de tema retorni aquests tipus. Cal registrar URL, mode i configuració real de la mostra per aclarir si venia d’un altre consumidor o d’una versió publicada diferent; no s’ha comprovat la web publicada en aquesta passada.

## Matriu de diagnosi i acció

Les columnes B/M/A són nombre de **tipus observats** que el motor situa a cada nivell, no cobertura pedagògica validada. Un tipus pot aparèixer en més d’una columna si la variant canvia de nivell. «Sense nivell» només compta temes elegibles per a examen. Les ampliacions sense examen no es consideren errors de nivell 0. Estat de tots els blocs: **diagnosi feta, correcció pendent**, llevat de la correcció parcial anterior de racionals.

| Curs | Sentit | Temes totals / examen inicial | Tipus observats | B / M / A al motor | Sense nivell | Acció prioritària |
|---|---|---:|---:|---|---:|---|
| 1eso | numeric | 13 / 12 | 91 | 31 / 37 / 19 | 0 | Revisar nivells incorporats als generadors i banc AMP_CATS; substituir criteris basats en exponents/nombres per demanda real. |
| 1eso | mesura | 9 / 8 | 80 | 21 / 31 / 26 | 0 | Eliminar alta basada en nombre de salts mètrics; diferenciar conversió, modelització i elecció de mesura. |
| 1eso | algebraic | 10 / 6 | 43 | 10 / 11 / 11 | 0 | Reclassificar reduccions i substitucions; crear altes d’equivalència, model invers i anàlisi d’errors no evidents. |
| 1eso | espacial | 12 / 7 | 72 | 18 / 14 / 13 | 0 | Reclassificar fórmules i propietats recordades; conservar problemes de construcció/condicions amb decisions. Revisar banc obert separat. |
| 1eso | estocastic | 11 / 9 | 95 | 33 / 26 / 25 | 1 | Revisar lectura de gràfics, moda/mediana i probabilitat directa. Classificar mediana:2 i incorporar el banc obert separat. |
| 2eso | numeric | 12 / 8 | 192 | 46 / 48 / 39 | 0 | Revisar els set temes ordinaris restants i les ampliacions. Racionals ja té correcció parcial; alta encara poc variada. |
| 2eso | mesura | 11 / 7 | 186 | 36 / 48 / 42 | 2 | Classificar perimetres:17/18; rebaixar fórmules directes i comparacions d’errors. Dissenyar alta amb elecció de model, recursos i precisió. |
| 2eso | algebraic | 10 / 7 | 136 | 25 / 39 / 24 | 0 | Diferenciar calcular un preu, trobar un llindar i escollir tarifa en un interval; revisar expansions rutinàries etiquetades altes. |
| 2eso | espacial | 11 / 7 | 107 | 22 / 26 / 22 | 0 | Separar record de fórmules i proporció directa de reconstrucció de vistes i modelització integrada; verificar dibuixos. |
| 2eso | estocastic | 11 / 7 | 133 | 28 / 27 / 29 | 0 | Reclassificar complements i freqüència experimental directa. Alta: successos compostos amb elecció de camins o lectura crítica no evident. |
| 3eso | numeric | 12 / 8 | 171 | 40 / 38 / 35 | 2 | Classificar proporcionalitat3r:16 i recomptes3r:17. Revisar intervals, potències i notació científica sense fer alta la rutina. |
| 3eso | mesura | 12 / 8 | 120 | 26 / 24 / 22 | 8 | Classificar el tipus 10 dels vuit temes. Reservar alta per reconstruccions, selecció de dades i cadenes geomètriques amb decisions. |
| 3eso | algebraic | 13 / 9 | 104 | 28 / 21 / 23 | 0 | Revisar identitats i simplificació; mantenir diferència entre resoldre una equació i formular/validar un model amb restriccions. |
| 3eso | espacial | 12 / 8 | 120 | 32 / 25 / 23 | 0 | Revisar repeticions i cancel·lacions. Alta: inversió/composició no immediata i justificar l’ordre. No totes les composicions són altes. |
| 3eso | estocastic | 12 / 8 | 194 | 40 / 47 / 51 | 0 | Separar fórmules de dispersió, recompte directe i raonament sobre distribucions/models. Evitar alta automàtica per dades agrupades. |
| 4eso | numeric | 12 / 8 | 120 | 29 / 24 / 27 | 0 | Revisar conjunts, intervals i errors, i finances. Alta: decidir amb imports variables, costos totals i reconstruccions; distingir ampliacions. |
| 4eso | mesura | 12 / 8 | 132 | 29 / 25 / 26 | 8 | Classificar tipus 11 dels vuit temes; validar A/B. Rebaixar trigonometria directa i reservar alta per plantejament indirecte i errors. |
| 4eso | algebraic | 12 / 8 | 129 | 32 / 28 / 29 | 0 | Reclassificar lectura de gràfiques i substitucions; alta amb elecció de model, domini, solucions admissibles i comparació no immediata. |
| 4eso | espacial | 12 / 8 | 123 | 29 / 25 / 27 | 0 | Revisar operacions i mòduls directes, homotècies i regions. Incloure rectesAmpA/geometriaAnaliticaAmpD en B encara que es diguin ampliacions. |
| 4eso | estocastic | 12 / 8 | 120 | 29 / 27 / 24 | 0 | Reclassificar parelles de dades i lectura directa. Alta amb model, adequació de predicció, dependència i comparació de successos. |

## Evidència pedagògica per als 20 blocs

Propostes de nivell orientatives per a les tasques concretes observades; s’ha de tancar la classificació de la família completa quan es revisin totes les seves variants. No es proposa rebaixar tot un tema a partir d’un exemple.

| Curs / sentit | Plantilla que el motor situa a alta | Tasca observada | Valoració |
|---|---|---|---|
| 1eso/numeric | decimal_sys:4 | Reconèixer el valor posicional de la xifra de les milers | Baixa: lectura posicional directa. No cal estratègia alta. |
| 1eso/mesura | conversions:4 | Convertir 15 dl a ml | Baixa: canvi directe d’unitat. |
| 1eso/algebraic | monomis:3 | Reduir 12x − 7x | Baixa: reducció directa de termes semblants. |
| 1eso/espacial | cercle:3 | Longitud de circumferència donat el radi | Baixa: aplicar 2πr. |
| 1eso/estocastic | barres:4 | Diferència entre dues freqüències d’un diagrama | Baixa/mitjana segons lectura; una resta directa no justifica alta. |
| 2eso/numeric | operacionsRacionals:8 | Calcular −8 − 3·5 | Baixa: jerarquia directa; els negatius no creen alta. |
| 2eso/mesura | estimacio:17 | Escollir l’aproximació amb menys error absolut | Baixa: calcular/comparar dues distàncies al valor exacte. |
| 2eso/algebraic | funcionslineals:16 | Comparar dues tarifes per a un consum ja donat | Mitjana com a màxim: substituir i comparar. |
| 2eso/espacial | cossos:4 | Nombre de vèrtexs d’un prisma triangular | Baixa: identificar/comptar una propietat directa. |
| 2eso/estocastic | probabilitat:9 | Complement d’una probabilitat 0,4 | Baixa: 1 − p. |
| 3eso/numeric | reals3r:10 | Comprovar si 6 pertany a (−2,7) | Baixa: comprovar dos límits. |
| 3eso/mesura | pitagores:8 | Diagonal d’un quadrat amb costat conegut | Baixa/mitjana: aplicació directa de Pitàgores. |
| 3eso/algebraic | expressions:7 | Desenvolupar 3x(x + 4) | Baixa: distributiva directa al curs. |
| 3eso/espacial | girs:7 | Aplicar quatre girs consecutius de 90° | Baixa/mitjana: reconèixer una volta completa; cas que trivialitza la composició. |
| 3eso/estocastic | probabilitat3r:22 | Comptar codis amb quatre posicions i cinc símbols, amb repetició | Baixa/mitjana: producte/potència directe. |
| 4eso/numeric | financera4t:9 | Comparar comissió percentual i fixa per a un import donat | Mitjana com a màxim: càlcul i comparació directes. |
| 4eso/mesura | semblancaRaons4t:8 | Calcular adjacent/hipotenusa quan es donen ambdós costats | Baixa: formar una raó. |
| 4eso/algebraic | patrons4t:6 | Factoritzar 2x + 12 | Baixa: factor comú directe. |
| 4eso/espacial | vectors4t:5 | Reconèixer el vector equipol·lent a un vector dibuixat | Baixa/mitjana segons representació; reconeixement directe no és alta per si sol. |
| 4eso/estocastic | espaiMostralRecompte4t:6 | Quatre samarretes i dos pantalons: quants conjunts? | Baixa: principi multiplicatiu directe. |

## 21 tipus sense nivell d’examen

Cada fila conserva l’identificador del tema i tipus per poder fer una correcció precisa. La proposta és una primera valoració, no un canvi aplicat.

| Bloc | Tema:tipus | Tasca | Proposta inicial |
|---|---|---|---|
| 1eso/estocastic | mediana:2 | Quina diferència hi ha entre la MITJANA i la MEDIANA? | Baixa: diferenciar definicions. |
| 2eso/mesura | perimetres:17 | Al voltant d’un estany circular de radi 5 m hi ha un camí d’amplada 1,5 m. Quina és l’àrea del camí? Utilitza π ≈ 3,14. | Mitjana: dos radis, dues àrees i diferència. |
| 2eso/mesura | perimetres:18 | Per trobar l’àrea d’un cercle de radi 3 cm, un alumne calcula 2·3,14·3 = 18,84. Quin error ha comès? | Mitjana: distingir longitud i àrea en un error proposat. |
| 3eso/numeric | proporcionalitat3r:16 | Una parella de valors passa de (4, 7) a (20, 35). Totes dues magnituds s’han multiplicat per 5. Aquest canvi és compatible amb una proporcionalitat directa? | Baixa: comprovar un mateix factor. |
| 3eso/numeric | recomptes3r:17 | Observa aquest patró de recompte de parelles:Persones5678Parelles101521?Si cada parella es compta una sola vegada, quin valor completa la taula? | Mitjana: relacionar parelles i patró de recompte. |
| 3eso/mesura | volum:10 | Compara 1500 cm³ amb 0,6 L. El primer volum és… | Baixa: conversió i comparació directes. |
| 3eso/mesura | precisio:10 | Massa d’un paquet amb una balança que resol 1 g. Quina manera d’expressar el resultat és més coherent? | Baixa: representació coherent amb resolució. |
| 3eso/mesura | arees:10 | Un pati de 15 m × 10 m conté una piscina rectangular de 5 m × 2 m. Quants metres quadrats de pati queden fora de la piscina? | Mitjana: diferència d’àrees. |
| 3eso/mesura | semblanca:10 | Un cub d’aresta 8 cm es reprodueix a escala amb totes les longituds 3 vegades més grans. Quin volum té el nou cub? | Mitjana: raó lineal i volum. |
| 3eso/mesura | tales:10 | Una persona de 1,6 m projecta una ombra de 1 m. Una torre amb una antena superior de 1,5 m projecta, al mateix instant, una ombra de 10 m. Quina altura té només l’edifici, sense comptar l’antena? | Mitjana: proporció i descompte d’antena. |
| 3eso/mesura | pitagores:10 | Per instal·lar un cable des del terra fins a un punt situat a 4 m d’altura i 4 m horitzontalment, cal deixar 1,5 m extra per a les connexions. Quina longitud total de cable cal comprar? Arrodoneix a dues xifres decimals si cal. | Mitjana: longitud geomètrica i reserva. |
| 3eso/mesura | piramides:10 | Un con de radi 5 cm té un volum de 157 cm³. Prenent π ≈ 3,14, quina altura té? | Mitjana: inversió de fórmula. |
| 3eso/mesura | errorMesura:10 | Un recipient cònic té radi 30 cm i altura 30 cm. Està ple al 80%. Quants litres conté? Pren π ≈ 3,14. | Mitjana: volum, fracció ocupada i conversió. |
| 4eso/mesura | angles4t:11 | Quin instrument és més adequat per mesurar amb precisió la distància directa fins a una paret llunyana? | Baixa: adequació d’instrument. |
| 4eso/mesura | radians4t:11 | Quina equivalència és correcta per a 90°? | Baixa: equivalència directa. |
| 4eso/mesura | pitagores4t:11 | En un triangle rectangle, els catets mesuren 6 i 7 i la hipotenusa és c. Quin plantejament és correcte? | Baixa: plantejament directe. |
| 4eso/mesura | semblancaRaons4t:11 | Un triangle rectangle es transforma en un altre de semblant multiplicant tots els costats per 2. Què passa amb la raó entre dos costats corresponents, per exemple oposat/hipotenusa? | Baixa/mitjana: invariància de raons. |
| 4eso/mesura | trigRaons4t:11 | En un mateix angle α tenim sin α=0,471 i cos α=0,882. Calcula tan α utilitzant la relació entre raons. | Baixa: tan = sin/cos. |
| 4eso/mesura | resolTriangles4t:11 | En un triangle rectangle, la hipotenusa és 17 m i un catet adjacent a α és 15 m. Resol els passos necessaris i indica quant mesura α. | Mitjana: triar raó i obtenir angle. |
| 4eso/mesura | mesuresIndirectes4t:11 | Un cable va des del terra fins al capdamunt d’un pal de 10 m i forma un angle de 45° amb el terra. Quina longitud mínima té el cable? | Mitjana: plantejar triangle i longitud. |
| 4eso/mesura | precisioError4t:11 | Es repeteix tres vegades la mateixa mesura.Sèrie A: 19,8, 20, 20,2 cmSèrie B: 19,2, 20, 20,8 cmQuina sèrie mostra més precisió o repetibilitat? | Mitjana: comparar repetibilitat. |

## Què hem de fer i en quin ordre

**P0 — Validesa, contracte i cobertura verificable.** Corregir primer el cas bimodal C9 i incorporar la prova determinista corresponent.  Crear una classificació compartida per curs, sentit, tema, tipus i, quan calgui, variant. Distingir `taskDifficulty` de `supportMode` i de l’opció A/B o d’ampliació. Detectar tipus desconeguts i publicar un informe de cobertura; no ignorar-los amb nivell 0. Incloure tots els bancs addicionals. No migrar encara el formulari/exportació de fitxes.

**P1 — Reclassificació pedagògica per blocs.** Començar per 2n numèric, continuar amb 1r (els cinc sentits), 2n restant, 3r i 4t A/B. En cada bloc: inventari tancat de famílies, diverses variants, revisió d’enunciat/resposta/resolució i exemples B/M/A. Classificar els 21 tipus localitzats com a part dels seus blocs. No aplicar la proposta anterior mecànicament a variants no vistes.

**P2 — Omplir buits d’alta amb famílies diferents.** No omplir-los amb més xifres o més repeticions. En numèric: reconstruccions i comparacions amb dades desconegudes; en mesura: elecció de model, recursos i precisió; en algebraic: modelització, llindars i admissibilitat de solucions; en espacial: reconstruccions i composicions no immediates; en estocàstic: decisions sobre models, mostres, representacions i successos compostos. Ajustar-ho al curs i a A/B. L’alumne ha de prendre decisions rellevants; una resposta test també pot exigir-les, però no ho fa per ser test.

**P3 — Consumidors de la web.** Fer servir el mateix contracte en pràctica, examen de tema i global/per sentit, cerca/enllaços i revisió d’errors. Fixar i provar quotes d’examen; informar quan falta nivell o varietat. En els modes sense selector de dificultat, explicar que són una barreja. Conservar suport guiat independent, validació d’equivalents, correccions i teoria. Els bancs de portada també necessiten metadades si s’hi ofereix selecció per dificultat.

**P4 — Validació de sortida.** Proves de transmissió i selecció, cobertura de tots els tipus declarats, cap substitució de nivell silenciosa, límits 0/1/signes/cancel·lacions, continguts adequats al curs i revisió visual de gràfics. Verificació matemàtica de solucions: les comprovacions actuals de presència i resposta exacta única no la substitueixen. Les proves d’examen actuals poden passar mentre hi ha tipus sense classificar; afegir aquesta comprovació de cobertura és necessari.

**Fase posterior de fitxes.** Compartir la classificació ja revisada, adaptar capacitats i variants i després formulari/Word/PDF. La divergència actual de racionals entre web i fitxes segueix documentada a `revisio.md`.

## Evidència reproduïble i límits

- `scripts/audita-dificultats-global.cjs`: diagnosi de generadors, classificació real i construcció d’examen per tema. Opcions opcionals `A` i `B`.
- `auditoria-global-mostres.json`, `auditoria-global-mostres-A.json`, `auditoria-global-mostres-B.json`: mostres i incidències, incloses ampliacions sense examen.
- `scripts/audita-modes-global.cjs` i `auditoria-modes-global.json`: mostres mostrades en pràctica, modes sol·licitats/efectius, inici d’exàmens globals i bancs addicionals. Vegeu també els bancs oberts que encara cal censar més avall.
- `recorreguts-estatics.json`: fragments de selecció/generació per bloc.
- `scripts/executa-regressions-dificultats.cjs` i `regressions-globals.json`: resultats íntegres de les comprovacions existents, amb temps límit per procés. Un temps límit no es presenta com una prova superada ni com una errada matemàtica.

No s’ha certificat la dificultat de cadascuna de les 2.468 parelles tema/tipus. No s’han revisat visualment tots els SVG ni recalculat totes les solucions. Tampoc s’ha comprovat la publicació remota. L’inventari d’ampliacions de contingut de cursos posteriors ha de mantenir aquesta condició: no s’han de seleccionar com a alta del curs ordinari.

## Comparació de mostres baixa, mitjana i alta per bloc

Etiquetes actuals del motor. Es mostren per contrastar-les, no per avalar-les. La valoració considera la tasca, no la llargada ni les dades.

| Bloc | Mostra baixa actual | Mostra mitjana actual | Mostra alta actual | Valoració de la progressió |
|---|---|---|---|---|
| 1eso/numeric | naturals:2 — Quin signe va entre:56624 ___ 54668 | naturals:3 — Arrodoneix 70942 a les milers | naturals:5 — Una fabrica te 7 maquines que produeixen 38 peces cadascuna. A mes, hi ha 13 peces de reserva. Quantes peces hi ha en total? | El context de producció afegeix passos però continua sent rutinari: l’alta observada s’acosta a mitjana. |
| 1eso/mesura | metric:2 — Converteix 20 t a kg | metric:1 — Converteix 39 hm a m | metric:3 — Converteix 32 ml a l | Les tres són conversions directes; el nombre de salts no justifica tres nivells de raonament. |
| 1eso/algebraic | traduccio:1 — Tradueix: "Un nombre menys quatre" | traduccio:3 — Una samarreta val x €. Quant costen 6 samarretes?Quina expressió algebraica ho representa? | traduccio:6 — 🍕 Una pizzeria cobra 7 € per pizza i 2 € d'entrega. Quant es paga per x pizzes?Quina expressió algebraica ho representa? | Passar de preu per unitat a quota fixa més variable pot ser mitjana; no hi ha estratègia alta explícita. |
| 1eso/espacial | elements:7 — Quina afirmació és correcta sobre un punt? | elements:5 — La bisectriu divideix un angle de 118° en dues parts iguals. Quant mesura cadascuna? | elements:8 — Per representar una direcció que comença en un punt i continua indefinidament, quin element necessites? | La semirecta és reconeixement conceptual directe; no és més difícil que la mitjana pel fet de ser una definició. |
| 1eso/estocastic | recollida:3 — Identifica el tipus d'estudi: "Registrar l'alçada de tots els jugadors d'un equip" | recollida:2 — En un estudi hi ha 123 alumnes d'un institut. Se'n seleccionen 59 (alumnes seleccionats per respondre una enquesta). Com s'anomena aquest grup de 59 elemen… | recollida:5 — Es vol estudiar els hàbits de lectura d’un barri. Quina mostra és més representativa?A) persones del barri triades en diferents zones i franges d’edat.B) n… | La representativitat requereix interpretar, però cal evitar altes de dues alternatives amb biaix evident. |
| 2eso/numeric | racionals:11 — En quina forma de representació està escrit 72%? | racionals:10 — Quin nombre està estrictament entre 0,3 i 0,6? | racionals:16 — En un club, 6 dels 22 membres van a l'institut amb bicicleta. S'hi inscriuen nous membres, tots ciclistes. Quin és el nombre mínim d'inscripcions perquè la… | Progressió coherent en aquesta mostra revisada: identificar, comparar amb dos límits i reconstruir un mínim amb denominador variable. |
| 2eso/mesura | unitats:3 — Converteix 6 m³ a dam³. | unitats:11 — La superfície útil d’una sala és de 48 m². Expressa-la en dm². | unitats:17 — Per convertir 2 m³ a dm³, un alumne fa 2 · 10. Quin és l’error principal? | Conversions d’unitats no han de pujar per dimensió; identificar un error de factor requereix comprensió però no necessàriament alta. |
| 2eso/algebraic | patrons:3 — Observa la successió: 14, 17, 20, 23, 26Quina és la diferència constant d? | patrons:6 — Quins són els quatre primers termes de aₙ = 11 + (n − 1)·6? | patrons:7 — La taula relaciona la posició amb el valor:n1234aₙ9162330Quina fórmula descriu la relació? | Hi ha progressió cap a modelitzar; cal revisar si deduir la fórmula d’una taula directa arriba realment a alta. |
| 2eso/espacial | semblanca:7 — Una figura es manté amb la mateixa mida però apareix reflectida en un eix. Quina afirmació és correcta? | semblanca:5 — Comprova si els rectangles de 7 × 6 cm i 14 × 13 cm són semblants.7 cm6 cm14 cm13 cmFigura AFigura B | semblanca:9 — Els triangles són semblants. Troba x.6 cm10 cm12 cmx cm | El dibuix no fa alta una proporció immediata; reconstruir o combinar condicions sí que pot canviar la demanda. |
| 2eso/estocastic | dades:2 — En un estudi de una escola de música, la població és de 150 alumnes i es pregunta a 35 d'ells sobre el/la instrument principal que estudien. Quina és la mo… | dades:7 — S’han recollit aquestes dades sobre llibres llegits aquest mes: 4 · 3 · 0 · 1 · 2 · 3 · 2 · 4 · 1 · 5 · 5 · 0 · 5 · 3Quantes vegades apareix el valor 4? | dades:8 — Valora aquesta afirmació:“El nombre de germans és una variable quantitativa discreta.” | Classificar una variable discreta no justifica estar per sobre de comptar dades d’una llista. |
| 3eso/numeric | racionals3r:3 — Compara 9/8 i 1,09. | racionals3r:4 — Ordena de menor a major:6/5 · 0,8 · −0,4 · 0,35 | racionals3r:8 — Calcula (5/4 − 2/3) × 4/5 respectant la jerarquia. | Ordenar representacions i operar fraccions poden ser mitjanes; manca planificació específica a l’alta mostrejada. |
| 3eso/mesura | volum:3 — Converteix 0,75 cL a mL. | volum:9 — Un recipient cúbic té una aresta interior de 5 dm. Quina capacitat té en litres? | volum:7 — Un dipòsit rectangular fa 2 m × 0,5 m × 0,8 m. Quina és la seva capacitat en litres? | Volum i conversió a litres són passos rutinàries relacionats, normalment mitjana al curs. |
| 3eso/algebraic | patrons:1 — Continua la successió: 2, 4, 6, 10, 16, … | patrons:4 — En la successió definida per aₙ = 8n + 3, en quina posició apareix el valor 123? | patrons:7 — Patró recursiu: 2, 6, 8, 14, 22, …Quin és el terme següent? | Cal declarar la regla recursiva i demanar decisions; continuar un patró no és alta automàticament. |
| 3eso/espacial | translacions:5 — Quin és el vector invers de la translació v = (-4; 3)? | translacions:10 — A(-3; -2) passa a A′(-4; -5) i B(-1; -3) passa a B′(-2; -6). Les dues transformacions corresponen al mateix moviment? | translacions:7 — Partim de P(2; 2) i apliquem 4 vegades la translació v=(-2; 1). On arribem? | Repetir una translació és càlcul directe d’un múltiple; alta exigeix reconstrucció o composició menys immediata. |
| 3eso/estocastic | dades3r:2 — En un estudi de un barri, la població és de 1200 habitants i es pregunta a 80 d'ells sobre el/la nombre de persones que viuen a cada llar. Quina és la most… | dades3r:4 — En un barri, es pregunta a una mostra de habitants pel/per la nombre de persones que viuen a cada llar. Quina és la variable estadística? | dades3r:11 — Un centre té 1200 alumnes. Per conèixer l’opinió de tot l’alumnat sobre el pati, es pregunta només a 4 alumnes. Quina valoració és més raonable? | Valorar una mostra pot exigir interpretació, però el nombre petit per si sol no substitueix discutir el disseny i el possible biaix. |
| 4eso/numeric | reals4t:6 — Quin nombre pertany a ℚ però no a ℤ? | reals4t:4 — Simplifica −√25 i indica el conjunt més petit al qual pertany. | reals4t:10 — Quina expressió representa un nombre real però no racional? | Reconèixer irracionals o conjunts no és alta a 4t només per tractar arrels. |
| 4eso/mesura | angles4t:1 — Com es classifica un angle de 58°? | angles4t:9 — A les 3:00, quin és l’angle més petit entre les dues agulles d’un rellotge? | angles4t:5 — Calcula 59° 40′ 0″ − 40° 18′ 30″. | La resta sexagesimal és procediment, encara que hi hagi préstecs; no hi ha planificació alta. |
| 4eso/algebraic | patrons4t:9 — El cost d’una activitat és C(x) = 5x + 7, on x és el nombre de sessions. Quin cost correspon a 4 sessions? | patrons4t:3 — Quina expressió representa aquesta taula?x=0x=1x=2x=3-7-238 | patrons4t:6 — Quina forma factoritzada és equivalent a 2x + 12? | Factor comú de dos termes és directe i no pot servir d’alta de 4t. |
| 4eso/espacial | figures4t:7 — La recta és tangent a la circumferència en T. Quin angle formen el radi OT i la tangent?OT? | figures4t:2 — Un triangle isòsceles té un angle del vèrtex de 58°. Quant mesura cadascun dels dos angles de la base???58° | figures4t:10 — Un prisma té 18 vèrtexs. Quantes cares té? | Inferir cares d’un prisma pot ser mitjana; cal combinar condicions o justificar per exigir alta. |
| 4eso/estocastic | dadesVariables4t:1 — En un estudi es registra el assignatura preferida de cada alumne. De quin tipus és aquesta variable? | dadesVariables4t:8 — Es registren les parelles (15; 48), (16; 52), (17; 56), (18; 61) on x representa edat i y representa freqüència cardíaca. Quants individus hi ha a la mostr… | dadesVariables4t:6 — En un estudi, x = hores d’estudi setmanal i y = nota de l’examen. Què significa la parella (4, 6)? | Interpretar la parella (4,6) és lectura bivariant directa, no alta de 4t. |

## Bancs complementaris i modes efectius

S’han mostrat **924 exercicis**: una mostra per tema × suport guiat/autònom × mode test/obert sol·licitat. Zero fallades d’estat/estructura després de validar la forma de resposta pròpia de cada motor. Els 20 exàmens globals han generat 20 preguntes seleccionant explícitament tots els temes. Això no valida quotes de dificultat globals, correcció de totes les respostes ni tots els casos sense cobertura.

A 1r espacial, poliedres, cossos, pitagores, cercle2 i coordenades desactiven l’oberta; a 1r estocàstic ho fan acumulades2 i histograma. El mode efectiu és test i el botó informa que l’oberta no està disponible: no és una substitució de dificultat.

| Banc addicional | Registres o variants identificats | Observació |
|---|---:|---|
| 1eso/numeric · AMP_CATS naturals | 7 | Famílies declarades de problemes contextuals; cal revisar la dificultat i els validadors. |
| 1eso/numeric · AMP_CATS potencies | 3 | Famílies declarades de problemes contextuals; cal revisar la dificultat i els validadors. |
| 1eso/numeric · AMP_CATS jerarquia | 4 | Famílies declarades de problemes contextuals; cal revisar la dificultat i els validadors. |
| 1eso/numeric · AMP_CATS divis | 4 | Famílies declarades de problemes contextuals; cal revisar la dificultat i els validadors. |
| 1eso/numeric · AMP_CATS mcmmcd | 4 | Famílies declarades de problemes contextuals; cal revisar la dificultat i els validadors. |
| 1eso/numeric · AMP_CATS enters | 5 | Famílies declarades de problemes contextuals; cal revisar la dificultat i els validadors. |
| 1eso/numeric · AMP_CATS decimals | 6 | Famílies declarades de problemes contextuals; cal revisar la dificultat i els validadors. |
| 1eso/numeric · AMP_CATS fraccions | 7 | Famílies declarades de problemes contextuals; cal revisar la dificultat i els validadors. |
| 1eso/numeric · AMP_CATS proporcionalitat | 5 | Famílies declarades de problemes contextuals; cal revisar la dificultat i els validadors. |
| 1eso/numeric · AMP_CATS pct | 6 | Famílies declarades de problemes contextuals; cal revisar la dificultat i els validadors. |
| 1eso/mesura · MEASURE_PROBLEM_PATTERNS  | 38 | Part del banc ja es reutilitza a TOPICS.problemes; no sumar-ho com si fossin famílies noves independents. |
| 1eso/espacial · SP_OPEN_PATTERNS  | 42 | S’han generat 20 mostres per registre; tots estan declarats a baixa o mitjana, cap a alta. La cobertura pedagògica continua pendent. |
| 1eso/estocastic · ST_OPEN_PATTERNS  | 49 | S’han generat 20 mostres per registre; tots estan declarats a baixa o mitjana, cap a alta. La cobertura pedagògica continua pendent. |

## Cas límit confirmat: moda oberta de 1r

**Prioritat de correcció abans de certificar el banc.** `ST_OPEN_PATTERNS:C9` construeix tres còpies del valor previst com a moda i tres dades aleatòries. Si les tres aleatòries coincideixen en un altre valor, apareixen dues modes. Amb la seqüència de decisions aleatòries [2,3,3,3] es genera una permutació de 2,2,2,3,3,3. La resposta correcta hauria de reconèixer 2 i 3; el generador diu només 2, accepta 2, rebutja 3 i rebutja «2 i 3». El solucionari afirma erròniament que només 2 és el més repetit.

Reproducció determinista: `node scripts/reprodueix-cas-limit-moda.cjs`; evidència a `cas-limit-moda-1eso.json`. No s’ha corregit el generador en aquesta passada diagnòstica. Cal decidir si C9 ha de garantir una moda única o si ha d’admetre tots els empats i adaptar pregunta, resposta i solució coherentment. No n’hi ha prou amb canviar-ne l’etiqueta de dificultat.

## Resultat de validació de respostes equivalents

`node scripts/comprova-validacio-motors.cjs` ha passat als 20 blocs. Comprova els controladors reals amb una resposta equivalent, l’absència de doble puntuació/doble registre i la correcció de l’examen de tema. Resultats detallats a `scripts/resultats-validacio-motors.json`. Aquesta prova de controladors usa preguntes deterministes: no garanteix que cadascuna de les solucions aleatòries del banc sigui matemàticament correcta, com demostra el cas C9.

El cercador mostra enllaços de teoria, pràctica i examen; no s’ha trobat un selector de dificultat al seu component. Els bancs de portada tampoc declaren dificultat a les estructures llegides. Cal conservar-ne la funció i no atribuir-los una selecció «alta» que no ofereixen. La traçabilitat d’una petició de dificultat ha d’arribar al consumidor que realment la fa.

## Resultat final de les regressions existents

S’han executat 19 suites d’examen: **16 superades, 3 amb temps límit, 0 altres fallades**. Les tres amb temps límit són 4t numèric, 4t mesura i 3r espacial; els seus logs imprimeixen els resultats dels temes, però el procés no ha finalitzat dins de 180 segons. No es compten com a superades ni se n’infereix una errada matemàtica. Cal repetir-les de manera aïllada i determinar per què el procés no acaba. Els registres íntegres són a `regressions-globals.json`; resum a `resum-validacio-global.json`.

| Suite | Resultat |
|---|---|
| comprova-examens-tema.cjs | Superada |
| comprova-examens-tema-2eso.cjs | Superada |
| comprova-examens-mesura-2eso.cjs | Superada |
| comprova-examens-tema-3eso.cjs | Superada |
| comprova-examens-mesura-3eso.cjs | Superada |
| comprova-examens-tema-4eso.cjs | Temps límit; incompleta |
| comprova-examens-mesura-4eso.cjs | Temps límit; incompleta |
| comprova-examens-algebraic-1eso.cjs | Superada |
| comprova-examens-algebraic-2eso.cjs | Superada |
| comprova-examens-algebraic-3eso.cjs | Superada |
| comprova-examens-algebraic-4eso.cjs | Superada |
| comprova-examens-espacial-1eso.cjs | Superada |
| comprova-examens-espacial-2eso.cjs | Superada |
| comprova-examens-espacial-3eso.cjs | Temps límit; incompleta |
| comprova-examens-espacial-4eso.cjs | Superada |
| comprova-examens-estocastic-1eso.cjs | Superada |
| comprova-examens-estocastic-2eso.cjs | Superada |
| comprova-examens-estocastic-3eso.cjs | Superada |
| comprova-examens-estocastic-4eso.cjs | Superada |
