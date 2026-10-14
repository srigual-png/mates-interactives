# Detecció automàtica dels exàmens al cercador

## Implementació

El catàleg existent conté 231 temes. El cercador llegia un únic JSON (o el mateix catàleg en format JS per a file://) i generava els botons de teoria i pràctica. Es manté aquesta arquitectura: ara cada entrada pot tenir també `exam`.

La font de veritat és el component real `assets/js/examen-tema.js`: `getTopics()` exposa els mateixos temes que accepta `start()`. No hi ha una segona llista d'exàmens al cercador. Durant la publicació, `scripts/genera-examens-cerca.cjs`:

1. Genera el catàleg a partir dels índexs de teoria, sense sobreescriure el catàleg anterior encara.
2. Revisa les pàgines de pràctica associades i obre només les que carreguen el component d'examen.
3. Executa el component i els generadors reals en un navegador headless, amb totes les peticions HTTP externes bloquejades.
4. Per a cada tema elegible, executa `build()`: exigeix 12 preguntes, opcions, una única resposta correcta per pregunta i solucions. El mateix builder exigeix quatre preguntes per nivell i evita duplicats.
5. Relaciona l'identificador intern amb el tema de teoria mitjançant `MI_THEORY_PAGES`, resolent la URL respecte de la pàgina de pràctica i exigint una coincidència única amb el catàleg del mateix sentit i curs.
6. Afegeix la URL amb `tema=<id>&examen=tema` i escriu les dues versions del catàleg. Una comprovació fallida atura la publicació i conserva el catàleg anterior.

No es considera suficient trobar un botó, la paraula examen o la inclusió del component: cal que el builder real funcioni. No es modifica el contingut de les preguntes, la teoria, els exercicis ni les pàgines indexables.

## Set exàmens detectats

Tots són de 1r ESO. Sentit numèric: operacions bàsiques (`ops`), potències i arrels (`potencies`), jerarquia d'operacions (`jerarquia`), divisibilitat (`divis`), mcm i MCD (`mcmmcd`) i nombres enters (`enters`). Sentit de la mesura: sistema mètric decimal (`metric`). Els altres 224 temes no tenen camp `exam`.

## Publicació i altes futures

Ordre habitual, ara amb verificació d'exàmens inclosa:

```sh
node scripts/genera-index-cerca.cjs
```

També es pot executar directament `node scripts/genera-examens-cerca.cjs`. Cal Node i Playwright amb un navegador instal·lat, només durant la generació. A Windows es pot aprofitar Edge i el Playwright del runtime local; `MI_PLAYWRIGHT` permet indicar explícitament el mòdul.

`.github/workflows/pages.yml` executa la generació en cada push a main, abans de preparar i desplegar l'artefacte de GitHub Pages. Instal·la Playwright i Chromium al runner, publica només els fitxers de la web i no publica scripts de prova, còpies de seguretat ni dependències. Si falla la comprovació no es desplega l'artefacte.

Quan un nou examen segueixi el patró existent (tema admès pel component, generador funcional, mapatge de teoria i component carregat a la pàgina de pràctica), el següent desplegament el detectarà. No cal editar el cercador ni donar-lo d'alta al seu catàleg.

**Estat de desplegament:** els canvis i el workflow són locals. Aquesta carpeta no té checkout Git ni workflow anterior. No s'ha publicat cap canvi ni s'ha pogut verificar la configuració remota: les consultes de `.github/workflows` al connector GitHub han retornat 404. En incorporar el workflow al repositori cal que GitHub Pages utilitzi GitHub Actions com a origen; aquesta configuració inicial no s'ha pogut confirmar. No es pot donar per verificat el desplegament remot fins que s'executi amb èxit.

## Interfície i analítica

Botó `Examen` rosa suau, amb etiqueta accessible. Reutilitza els estils de disposició dels enllaços, que poden ocupar diverses línies en mòbil. Es conserven els modes A/B quan correspongui i els enllaços de teoria i pràctica.

Es reutilitza l'únic controlador de clic existent. Exemple d'esdeveniment:

`mi/search/exam/general/1eso/teoria/numeric/jerarquia-operacions-1r-eso`

El camí diferencia cercador, portada d'origen, curs, sentit i tema; el títol els descriu. Es manté l'analítica de consulta separada, sense duplicar-la, i el suport al botó central. No s'envien consultes lliures ni respostes d'examen. L'esdeveniment de lliurament existent continua separat del clic d'accés.

## Verificació local

- `node --check` als cinc fitxers JS/CJS modificats o nous: correcte.
- `node scripts/comprova-examens-cercador.cjs`: set exàmens, generació de 12 preguntes i obertura correcta de cadascun a 1280 i 390 px; teoria i pràctica conserven la destinació; sense desbordament; temes sense examen sense botó; un sol esdeveniment d'accés; cap error JavaScript.
- Alta temporal només al component d'exàmens: s'ha habilitat `naturals` amb un generador existent complet per simular una implementació nova. El catàleg ha passat de 7 a 8 exàmens amb el mapatge correcte, sense tocar cercador ni catàleg. Restauració en `finally`, amb regeneració final de 7 exàmens.
- `node scripts/comprova-cercador.cjs`: regressió superada a les cinc portades; paginació, cerca, àlies, cursos, A/B, destinacions, mòbil, focus, fallada de càrrega i file://; cap error JavaScript.
- `node scripts/comprova-analitica-cercador.cjs`: regressió superada; deduplicació de consultes, clics, privacitat, GoatCounter absent/amb excepció i client oficial amb peticions interceptades.

Les proves de navegador s'han executat fora del sandbox amb aprovació automàtica perquè Edge no s'iniciava correctament dins del sandbox. Totes les comprovacions són locals; no s'han enviat esdeveniments de prova a GoatCounter.

## Fitxers

Implementació: `assets/js/examen-tema.js`, `assets/js/cercador-mi.js`, `assets/css/cercador-mi.css`, `scripts/genera-index-cerca.cjs`, `scripts/genera-examens-cerca.cjs`, `assets/data/index-cerca.json`, `assets/data/index-cerca-local.js`, `.github/workflows/pages.yml`.

Proves i documentació: `scripts/comprova-examens-cercador.cjs`, aquest informe i les captures `scripts/examens-cercador-1280.png` i `scripts/examens-cercador-390.png`. Les regressions existents també regeneren els seus resultats JSON i captures habituals.

## Límits

La comprovació usa els generadors aleatoris existents; verifica estructura i generació, però no és una auditoria matemàtica exhaustiva de totes les preguntes possibles. Una implementació futura que utilitzi un component o una API diferents necessitarà un adaptador de descoberta. Els exàmens que segueixin l'arquitectura actual no necessiten cap canvi al cercador. No s'afegeix cap dependència al navegador de l'usuari ni cap petició extra per examen: només es carrega el catàleg existent una vegada.
