# Escissions cognitives prioritàries · Pitàgores i Escales (2n ESO)

**Estat: proposta no aprovada.** El catàleg global inicial de 72 clústers continua intacte. Aquest document és una **capa de revisió**: [MI_2ESO_mesura_escissions_prioritaries.json](MI_2ESO_mesura_escissions_prioritaries.json).

## Resultat

Sis clústers potencialment massa amplis es desglossen en 14 subgrups. Si finalment es ratifiquessin totes aquestes separacions, el catàleg tindria **80 clústers de treball** en lloc de 72, però **no 80 famílies genuïnes validades**. No s'ha eliminat ni repetit cap assignació: 129 registres conservats.

| Clúster | Separació provisional | Tipus examinats |
|---|---|---|
| ME2-C001 | Escala directa / suma de trams prèvia | Escales 1, 2, 17; Problemes 8 |
| ME2-C005 | Reducció realitat→plànol / ampliació directa | Escales 3, 5 |
| ME2-C006 | Construir una escala 1:n / reconèixer factor lineal | Escales 4, 12, 15; Problemes 9 |
| ME2-C007 | Àrea real des de plànol / àrea dibuixada des de realitat | Escales 6, 7 |
| ME2-C008 | Ombres contextuals / costat homòleg / proporció ja plantejada | Escales 8, 9, 10, 11, 18; Problemes 10 |
| ME2-C038 | Hipotenusa explícita / diagonals / situacions físiques contextuals | Pitàgores 2, 4, 5, 6, 7, 8, 13; Problemes 6, 7 |

## Exemples realment generats

S'han afegit proves amb **54 instàncies reals**: dues seleccions per cada un dels 27 tipus vinculats als sis clústers, i lectura del seu enunciat, resultat, opcions i passos. GitHub Actions: execució **#44045526470 superada**. Exemples registrats als logs:

- **Escales 3:** representar 0,5 m a escala 1:25 exigeix passar a cm i dividir; resposta 2 cm.
- **Escales 5:** ampliar una peça d'1,5 cm a escala 2:1 exigeix multiplicar directament; resposta 3 cm.
- **Escales 11:** la proporció 2/6 = 6/x ja està formulada; resposta x = 18.
- **Pitàgores 2:** catets 7 i 24 cm amb hipotenusa explícita; resposta 25 cm.
- **Pitàgores 4:** habitació 6 × 8 m amb diagonal a identificar; resposta 10 m.
- **Pitàgores 6:** escala recolzada amb distàncies 8 i 15 m; resposta 17 m.

Aquest mostreig confirma que els generadors ofereixen instàncies vàlides en les seleccions executades. **No verifica que dos subgrups tinguin identitat pedagògica independent**, ni cobreix tots els casos aleatoris, ni substitueix els oracles independents de la PR #53.

## Advertiments

Les distincions de sentit invers o de context físic no es comptaran com a famílies diferents sense examinar els objectius d'aprenentatge, les decisions autònomes que exigeixen a l'alumnat i els distractors. Les notes N1/N2 són provisionals. Encara falta contrastar `pitagores:15` (variant diagonal/catet) i altres agrupacions excessives d'Estimació i Superfícies.

## Proper punt

Revisar els clústers de Pitàgores `pitagores:15`, Estimació `estimacio:1/2/3` i Superfícies `superficies:1/3/5` amb casos reals, i posteriorment quantificar famílies genuïnes i mancances N1/N2/N3 per tema.

Sense canvis de codi funcional, de `families-validades.json`, de PR fusionades ni de publicació.
