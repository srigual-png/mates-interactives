# Accés lliure a Mates Interactives

Canvis del 25 d’octubre de 2026 als cinc sentits de cadascun dels quatre cursos d’ESO (20 pàgines de pràctica).

## Dependències i dades

El sistema d’accés utilitzava `unlockedIds` i l’antic comptador `unlocked`, dins dels mateixos registres que `done` i `errors`. També intervenia en les targetes, els problemes oberts, l’accés directe del cercador i la progressió després d’encertar exercicis.

S’han eliminat els camps d’accés de l’estat, les lectures, les escriptures i la progressió. Una migració elimina només aquests dos camps dels registres locals i de sessió coneguts, incloses les claus antigues. Conserva els altres camps i tolera dades inexistents, corruptes o emmagatzematge no disponible. Es mantenen els adaptadors de persistència i les migracions d’errors existents.

## Resultat

- Tots els temes existents es poden obrir des del principi, també les ampliacions.
- Retirats els panells, botons, cadenats i estils exclusius del desbloqueig, i actualitzada l’ajuda.
- Els problemes oberts ja no depenen del progrés d’accés.
- Es conserven la teoria, els generadors, la correcció, les explicacions, els enllaços a teoria, els exàmens, els cercadors, les portades i GoatCounter.
- Es conserven els temes completats, els errors i els comptadors. S’ha retirat el botó Reiniciar progrés dels 20 apartats i el seu codi exclusiu.
- Les opcions A/B de quart i els criteris curriculars dels exàmens es mantenen.
- La portada de quart continua demanant triar A o B: aquest selector no depèn del progrés ni bloqueja seqüencialment cap tema.
- Els marcadors buits de contingut futur, sense cap activitat associada, ja no tenen codi de targetes bloquejades.

## Comprovacions reproduïbles

```sh
node scripts/comprova-access-estatic.cjs
node scripts/comprova-access-lliure.cjs
node scripts/comprova-practica-cercador.cjs
node scripts/genera-examens-cerca.cjs
```

La comprovació estàtica verifica les 20 pàgines i la sintaxi dels 125 scripts incrustats, l’absència dels controls d’accés i la presència de GoatCounter, els exàmens per tema, la migració i l’absència del botó de reinici.

Resultat funcional obtingut: **25 variants de pàgina superades** (els 20 apartats, amb A/B a quart), **291 accessos a temes verificats**, conservació del progrés antic, correcció i exàmens per sentit. També s’ha validat la sintaxi dels 123 scripts de comprovació.

La comprovació funcional comprova cada tema sense enllaç directe, els registres antics de progrés, una resposta incorrecta i una de correcta, un examen de mostra de 12 preguntes per apartat i un examen de 20 preguntes per sentit. Quart es comprova en les opcions A i B. Escriu els resultats a `resultats-access-lliure.json`. El generador del catàleg valida exhaustivament els exàmens per tema, incloses les opcions de resposta i la correspondència amb la teoria.

També s’han retirat les crides preparatòries a `unlockAllTopics()` de 30 comprovacions històriques, ja que aquesta funció ha deixat d’existir i tots els temes són accessibles directament.

La comprovació del cercador recorre les pràctiques del catàleg en amplades de 1280 i 390 píxels i valida el tema obert, l’exercici visible i la correspondència amb la teoria.

Resultat del cercador: **231 entrades i 572 comprovacions superades**, incloses les variants A/B, tant a 1280 com a 390 píxels.

Resultat de la generació: **161 exàmens per tema validats**, amb 12 preguntes cadascun, resposta correcta única, resolució i correspondència amb la teoria. La comprovació estàtica final dels 20 apartats també ha passat.

## Correcció amb errors guardats

S’ha corregit una referència a una variable eliminada que impedia renderitzar la portada de mesura de 1r quan un tema principal tenia errors desats. La regressió comprova ara una resposta incorrecta en un tema principal, el retorn a la portada i una recàrrega mantenint els errors. A mesura de 1r exigeix que apareguin tots els temes. Els errors i el progrés desats es mantenen.

## Publicació

El flux `.github/workflows/pages.yml` executa la comprovació d’accés abans de preparar i publicar el lloc estàtic. No cal cap servidor ni dependència nova al navegador.

La carpeta rebuda no conté `.git`: no s’ha creat cap commit ni s’ha fet cap push. Per publicar, cal incorporar els fitxers actualitzats al repositori habitual i enviar-los a `main`, o executar el flux de GitHub Pages manualment després d’incorporar-los.
