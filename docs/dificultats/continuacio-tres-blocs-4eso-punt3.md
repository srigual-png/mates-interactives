# Tancament de la classificació de 4t

Revisats els 372 tipus que faltaven: 129 algebraics, 123 espacials i 120 estocàstics, amb ampliacions i opcions A/B. Juntament amb els 252 de numèric i mesura, els cinc sentits de 4t sumen 624 tipus.

| Sentit | Baixa base | Mitjana base | Alta base |
| --- | ---: | ---: | ---: |
| Algebraic | 78 | 51 | 0 |
| Espacial | 89 | 34 | 0 |
| Estocàstic | 72 | 48 | 0 |

Àlgebra distingeix les branques incompletes dels tipus 3 i 4 d’equacions quadràtiques: si falta el terme lineal o l’independent, la resolució directa és baixa. Es recupera també la classificació d’un error antic que no guardés la variant. Nombres més grans a B no fan pujar la dificultat. Definicions, fórmules conegudes i ampliacions de contingut posterior no es converteixen automàticament en altes.

## Correccions

- Discriminant: la branca de dues arrels diferents ja no pot generar dues arrels iguals.
- Simetria de paràboles: retirat el distractor de valors oposats que també era cert quan tots dos valien zero.
- Factoritzacions: eliminades una expressió desenvolupada equivalent i la factorització equivalent amb factors intercanviats quan les arrels són oposades.
- Geometria: exclosos els paral·lelograms degenerats i la coincidència de rectes quan es demanen paral·leles distintes.
- Estadística: població i mostra fan referència a compres/tiquets quan la variable és la despesa per compra; substituïda una alternativa potencialment certa sobre la taula de dos grups.
- Resposta oberta estocàstica: lectura completa de decimals amb coma o punt i rebuig de text afegit. La part entera ja no basta per validar una resposta.
- Corregida la reserva d’opcions d’una utilitat que podia repetir indefinidament el nombre correcte.
- Els errors nous desats conserven la clau de variant.

## Modes, quotes i itineraris

Es conserven tots els temes curriculars i ampliacions. Espacial té 8 temes ordinaris a A i 10 a B: `rectesAmpA` i `geometriaAnaliticaAmpD` són curriculars B. Les quatre ampliacions estocàstiques de contingut Batx no entren als exàmens ordinaris.

Les quotes es basen en cobertura i enunciats diferents. Espai mostral declara 10/2/0 perquè només té dos enunciats mitjans diferents; experiments compostos declara 3/9/0 perquè només té tres baixos diferents. Es mantenen les quotes globals estrictes i els avisos si no es poden satisfer.

Àlgebra permet l’examen global només de mitjanes. Espacial i estocàstic tenen temes sense mitjanes, de manera que una selecció global de tots els temes no pot fer aquesta modalitat. Els tres sentits no disposen d’altes originals legítimes: les modalitats només d’alta i equilibrada es bloquegen quan es demana tota aquesta cobertura.

## Evidència i límits

Els resultats de cens, pràctica guiada/autònoma, test/obert, exàmens de tema i cinc polítiques globals consten als sis `resultats-punt3-4eso-{algebraic,espacial,estocastic}[-A].json`. Els generadors s’exerciten amb sessions noves per evitar saturar artificialment la memòria antirepetició; les proves de modes i exàmens fan servir la interfície real.

`oracles-tres-blocs-4eso-punt3.json` contrasta, amb càlculs independents, arrels i discriminants, factorització i equivalències, equacions racionals/irracionals/exponencials, coordenades, distàncies, mòduls, homotècies, no degeneració, percentatges de contingència i probabilitats. Inclou la validació decimal oberta i la recuperació de variants. Les comprovacions estructurals recorren tot el cens; no tots els enunciats qualitatius o dibuixos disposen d’un oracle exhaustiu.

`regressions-tres-blocs-4eso-punt3.json` registra les suites de correcció real dels exàmens d’A i B: respostes correctes, errònies i buides, notes, colors, reinici i retorn a pràctica. La generació d’exàmens de quart algebraic i espacial s’atura segons les quotes revisades, sense esperar altes inexistents, i reinicia la memòria de varietat a cada examen. Sintaxi, accés estàtic i coherència del registre compilat també es comproven abans de publicar.

Classificació revisada: 20/20 blocs. Continuen pendents les famílies que completin cobertura i varietat, una validació més àmplia del material heretat i els mapes propis de fitxes/Word/PDF.

La passada final de `scripts/comprova-cobertura-4eso.cjs` verifica les cinc polítiques globals als cinc sentits i als dos itineraris. Els nivells absents es bloquegen sense fer una cerca de 500 exercicis; les quotes impossibles es rebutgen abans de reunir candidats. Resultats a `regressions-tres-blocs-4eso-punt3.json`, camp `coverageQuotas`.
