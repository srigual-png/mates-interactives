# 2n ESO · Sentit espacial — inventari i primera proposta d’agrupació

> **Estat: provisional.** Aquest document prepara la revisió pedagògica del bloc. No valida famílies, no modifica els generadors, els nivells publicats ni `families-validades.json`. La revisió s’ha fet sobre `main` al commit `086d7b725db59ebb99266352e84ef8d9470a7d17`.

## Abast i fonts

S’inclouen els set temes ordinaris de `2eso/sentit-espacial.html`: semblança, Tales i escales, Pitàgores, cossos, visualització 3D, coordenades i modelització. S’exclouen els quatre temes etiquetats com a ampliació de 3r (`pitagores3r`, `semblanca3r`, `transformacions3r` i `transformacionsAv3r`).

Fonts del repositori: `2eso/sentit-espacial.html`, `docs/dificultats/revisio-2eso-espacial-punt3.json` i `docs/dificultats/resultats-punt3-2eso-espacial.json`. Referència curricular consultada: [XTEC — Orientacions curriculars de Matemàtiques per cursos (PDF)](https://xtec.gencat.cat/web/.content/curriculum/eso/concrecions-curriculars/Orientacions-curriculars_MAT_SEC_per-cursos.pdf), apartat **2n ESO, sentit espacial**, p. 12 i visualització, p. 13 (consulta del 17-11-2026). La pàgina [Concrecions curriculars](https://xtec.gencat.cat/ca/curriculum/eso/concrecions-curriculars/) identifica aquest document com a concreció oficial.

La classificació efectiva és: **37 tipus únics a N1, 31 a N2 i 2 a N3**. El tipus 10 de modelització té una variant de plànol/escala que també es classifica a N1; per això, el resum de cobertura per camins el compta a N1 i N2. El validador de cobertura informa 38/31/2 camins, però només hi ha 70 tipus ordinaris.\n\n## Contrast amb la seqüenciació curricular de 2n

La proposta XTEC situa explícitament a 2n ESO: semblança en el pla i l’espai i raó de semblança; Tales en contextos; descobriment i ús de Pitàgores; propietats/classificació de cossos geomètrics; desenvolupaments plans; coordenades cartesianes; visualització de funcions constant, lineal i afí; i connexions entre sentits. També inclou representació plana de prismes i cilindres. Això dona base curricular als set blocs, però no valida per si sol cada pregunta ni el seu nivell.

| Bloc del repositori | Connexió curricular | Punt de revisió |
|---|---|---|
| Semblança | Semblança plana i espacial, raó de semblança. | Comprovar que els ítems tridimensionals treballen la raó i no introdueixen proporcions d’àrea/volum pròpies de l’ampliació de 3r. |
| Tales i escales | Tales i proporcionalitat geomètrica; hi ha referències creuades amb mesura i numèric. | Escales i conversions també pertanyen al sentit de la mesura; evitar presentar tot l’enunciat contextual com una família geomètrica nova. |
| Pitàgores | Descoberta, visualització per àrees i resolució de problemes. | Separar la comprensió de la relació de l’aplicació en diagonals/contextos; no elevar només per tenir context. |
| Cossos | Propietats, elements i classificació de poliedres i cossos rodons. | Recompte de cares/arestes/vèrtexs és una extensió de les propietats; revisar que les fórmules s’hagin treballat a 2n. |
| Visualització 3D | Desenvolupaments plans i representació de cossos. | Les vistes ortogonals i les restriccions triples són coherents com a visualització; comprovar que la dificultat no depengui de convencions gràfiques no ensenyades. |
| Coordenades | Localització en el pla cartesià. | Les distàncies euclidianes empren Pitàgores; les funcions de les rectes enllacen també amb el sentit algebraic. |
| Modelització | Connexions espacials; la visualització de funcions constant, lineal i afí també apareix al sentit espacial. | És un contenidor de connexions, no una família única. Cal vincular cada tipus al procediment curricular concret. |

## Inventari provisional

Hi ha **70 tipus ordinaris** repartits en set temes. Els nivells següents són la classificació efectiva de `REVIEWED_LEVELS` a `assets/js/dificultat-mi.js`, basada en l’inventari provisional existent. Estan actius a l’aplicació, però **no són una validació pedagògica final ni un registre de famílies**:

| Tema | Tipus | N1 | N2 | N3 | Lectura inicial |
|---|---:|---:|---:|---:|---|
| Semblança i congruència | 11 | 6 | 5 | 0 | Diverses propietats de la semblança estan agrupades sota una justificació massa ampla. |
| Tales, escales i mesures indirectes | 10 | 5 | 5 | 0 | Escala de plànol, Tales i ombres comparteixen proporcionalitat, però demanen representacions diferents. |
| Teorema de Pitàgores | 10 | 5 | 5 | 0 | Aplicació directa i identificació del triangle versus situacions que exigeixen construir-lo. |
| Poliedres i cossos rodons | 10 | 10 | 0 | 0 | Nivell uniforme; cal comprovar si les preguntes inverses i de recompte són igualment directes. |
| Desenvolupaments i visualització 3D | 9 | 2 | 6 | 1 | El tipus 8 incorpora tres projeccions i restriccions simultànies; candidat N3, sense donar-lo per validat. |
| Coordenades cartesianes | 10 | 7 | 3 | 0 | El tema barreja lectura del pla, classificació de figures, rectes i distàncies. |
| Modelització i connexions geomètriques | 10 | 2 (+ branca) | 7 | 1 | El tipus 10 té una variant d’escala a N1 i altres variants a N2; no són 11 tipus diferents. |
| **Total de tipus únics** | **70** | **37** | **31** | **2** | El tipus 10 de modelització té una branca N1 i altres variants N2; la cobertura per camins compta una branca addicional. No és un recompte de famílies. |

### Agrupacions candidates per contrastar

Els grups d’aquesta taula serveixen per començar la comparació. **No es declaren famílies genuïnes** fins a contrastar procediment, exemples reals i límits de cada generador.

| Tema | Tipus | Nucli que convé comparar | Qüestió pendent |
|---|---|---|---|
| Semblança | 2, 3 | Calcular la raó en els dos sentits. | Mateixa família amb orientació invertida? |
| Semblança | 1, 5, 8, 11 | Reconèixer o comprovar semblança entre figures; angles i dimensions corresponents. | Tipus 8 és conceptual; 11 és tridimensional. Cal decidir si són variants o tasques diferents. |
| Semblança | 4, 9 | Trobar una longitud homòloga desconeguda. | Verificar si les dues representacions usen el mateix muntatge proporcional. |
| Semblança | 6, 7, 10 | Conservar angle, mida o perímetre sota semblança/isometria. | Separar invariància angular, congruència per moviment i escala del perímetre. |
| Tales i escales | 3, 4, 5, 6, 10 | Passar entre representació i realitat amb una escala. | El tipus 10 pot exigir reconstruir una proporció, més que una conversió directa. |
| Tales i escales | 1, 2 | Reconstruir segments homòlegs amb paral·lelisme. | Revisar si canvia només la incògnita o també el raonament. |
| Tales i escales | 7, 8 | Relacionar alçades i ombres. | Mateixa proporcionalitat amb incògnita diferent. |
| Tales i escales | 9 | Mesura indirecta mitjançant triangles semblants. | Contrastar si és una aplicació de l’escala o un model geomètric propi. |
| Pitàgores | 1, 2, 3, 4, 5 | Relació entre catets i hipotenusa, identificació i recíproca. | Separar identificació, càlcul de costat i diagnòstic de triangle rectangle. |
| Pitàgores | 6, 7, 10 | Diagonal d’un rectangle, quadrat o cara rectangular. | Mateix triangle subjacent; representacions i resultat arrelat/arrodonit. |
| Pitàgores | 8, 9 | Escala recolzada i altura d’un isòsceles. | Modelització del triangle versus reconstrucció de la semibase. |
| Cossos | 1, 2, 3, 6, 9 | Reconeixement, classificació i descripció de cossos. | No assumir una sola família: poliedres, piràmides i cossos rodons. |
| Cossos | 4, 5, 7, 8, 10 | Recompte o reconstrucció de bases, cares i vèrtexs. | Revisar el tipus 10, que infereix la base des del total de cares. |
| Visualització 3D | 1, 2 | Plegar desenvolupaments i anticipar cares oposades. | Compartir procediment espacial, però pot requerir subfamílies segons la tasca. |
| Visualització 3D | 3, 4, 5, 6, 7 | Comptar cubs, llegir vistes i completar un prisma. | Distingir ocupació, alçades per projecció i completar volum. |
| Visualització 3D | 8 | Reconstruir una construcció que compleixi tres vistes. | Candidat a N3 per restriccions combinades; comprovar que cap pista redundant resol la resposta. |
| Visualització 3D | 9 | Identificar la forma de la secció plana d’un cub/cilindre i la base d’un prisma. | Barreja secció paral·lela i identificació de base; separar o justificar com a variants. |
| Coordenades | 1, 2 | Llegir coordenades i quadrants. | Comprovar si llegir el quadrant és la mateixa tasca amb dades diferents. |
| Coordenades | 3 | Classificar la figura definida per punts. | Pot implicar identificar propietats geomètriques, no només llegir coordenades. |
| Coordenades | 4, 6, 7 | Reconstruir quart vèrtex, punt mig o distància. | Tres procediments diferents; el tipus 7 connecta amb Pitàgores. |
| Coordenades | 5 | Distància horitzontal/vertical. | Distingir distància axial de distància euclidiana. |
| Coordenades | 8, 9, 10 | Interpretar recta, tendència i pertinença d’un punt. | Mateixa representació gràfica, però preguntes matemàtiques diferents. |
| Modelització | 6, 9 | Triar eina geomètrica o tipus de relació a partir del context. | Selecció d’eina i identificació de relació lineal poden no ser la mateixa família. |
| Modelització | 1, 2, 4, 5, 7, 8, 10 | Problemes contextuals que connecten representacions o procediments. | Massa heterogenis per comptar-los com una família; cal vincular cadascun al nucli del tema corresponent. |
| Modelització | 3 | Ombres per trobar altura i Pitàgores per trobar un cable. | Dues etapes de modelització; revisar si és N2 o si el nivell proposat N3 es manté dins del currículum de 2n. |

## Recomanació provisional de nivells

- **No forçar N3.** Els 2 tipus proposats com a N3 (visualització 3D:8 i modelització:3) necessiten contrast específic. Un tipus amb diversos passos no és N3 automàticament. A modelització, el tipus 10 també té una branca alternativa a N1; cal comptar variants i tipus únics per separat.
- **Revisar la distribució de cossos i coordenades.** Tots els tipus de cossos són N1; en coordenades conviuen tasques diferents sota una explicació comuna de N1. La classificació s’ha de basar en el raonament, no en el tema o el format.
- **Revisar les connexions transversals sense duplicar famílies:** semblança ↔ escales/Tales; Pitàgores ↔ diagonals/coordenades; coordenades ↔ trajectes; cossos ↔ visualització 3D. Una fórmula compartida no demostra que la tasca sigui la mateixa.
- Els objectius 15 famílies / 5 N1 / 5 N2 / 3 N3 són orientatius, no quotes. El nivell depèn del procediment i de l’adequació curricular a 2n.

## Evidència de proves disponible i límits

La lectura del codi confirma que els set generadors cobreixen els codis ordinaris 1–11 / 1–10 / 1–10 / 1–10 / 1–9 / 1–10 / 1–10. La classificació s’aplica des de `REVIEWED_LEVELS`; `REVIEWED_VARIANTS` només afegeix una branca específica per al tipus 10 de modelització (escala, N1). Les etiquetes locals `easy/medium/hard` dels generadors no substitueixen el mapa N1/N2/N3.\n\nEl resum existent registra **3.000 mostres generades per tema** i recompte de cobertura/examen. Això és evidència de generació simulada, no una revisió pedagògica de 3.000 exercicis únics. El mateix resum informa `banksReviewed: 0`, `bankChecks: []` i `pageErrors: []`; per tant, encara no acredita una passada de bancs ni una comprovació visual al navegador. Aquest document no executa proves noves ni modifica el comportament de l’aplicació.

Abans de considerar el bloc complet cal:
1. inspeccionar els generadors i variants reals i vincular 70/70 tipus amb preguntes, respostes, modes i els nivells configurats; 
2. decidir mantenir/reclassificar/fusionar/separar cada família candidata amb almenys dos exercicis reals resolts, errors típics i casos límit;
3. contrastar cada decisió amb la seqüenciació XTEC específica de 2n;
4. comprovar modes guiat, autònom i examen, així com opcions/resposta oberta, i fer una validació visual;
5. demanar revisió docent final. Fins aleshores, aquesta proposta és provisional i no s’ha de copiar al registre oficial de famílies.
