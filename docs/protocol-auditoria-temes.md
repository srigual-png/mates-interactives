# Mates Interactives — Protocol d'auditoria i ampliació de temes

**Versió:** 1.3 · **Acordat:** 10/11/2026 · **Actualitzat:** 11/11/2026  
**Àmbit:** tots els cursos (1r–4t ESO) i els cinc sentits matemàtics. Els objectius orientatius de famílies i nivells són comuns a tots els temes; sempre preval l'adequació curricular i la diversitat matemàtica real.  
**Referència funcional:** tema «Nombres racionals» de `2eso/sentit-numeric.html`, amb comprovació del codi real abans de reproduir-ne el comportament.  
**Referència visual i pedagògica inicial de teoria (adaptable a tots els cursos):** `2eso/teoria/numeric/nombres-racionals.html`. La referència funcional de pràctica i la visual de teoria són diferents.  
**Estat:** criteri de projecte aprovat. L'aprovació d'aquest protocol **no** implica que els temes actuals ja compleixin els requisits.

## 0. Quan cal aplicar-lo

- **Auditoria o ampliació completa d'un tema:** executar les vuit fases i comprovar els criteris de tancament.
- **Correcció puntual:** aplicar únicament les fases afectades i proves de regressió proporcionals; no reconstruir el tema sense necessitat.
- **Tots els cursos i sentits matemàtics:** aspirar orientativament a 15 famílies (≥5 N1, ≥5 N2, ≥3 N3), **sense obligació d'assolir cap quota**. És admissible tancar un tema amb menys famílies o sense N3 quan el contingut curricular no justifiqui ampliar-lo. Les ampliacions es registren separadament.
- Per defecte, començar amb **auditoria de només lectura**, lliurar especificació i separar clarament la proposta de la implementació. No publicar canvis funcionals sense l'encàrrec corresponent.

## 1. Objectius pedagògics orientatius comuns a tots els temes (1r–4t ESO, cinc sentits)

| Indicador | Objectiu orientatiu, no obligatori |
|---|---:|
| Famílies matemàtiques diferents, totals | **15** |
| Famílies N1 (bàsiques) | **5** |
| Famílies N2 (intermèdies) | **5** |
| Famílies N3 (avançades) | **3** |

Exemples de distribució desitjada: 6-6-3, 5-5-5, 7-5-3 o 5-7-3, **només quan el contingut ho permeti**. Els dèficits numèrics són indicadors de revisió, mai errors automàtics ni motius per inventar famílies. És preferible una distribució inferior ben justificada.

### Què és una família?

Una **família** és un procediment o objectiu matemàtic genuïnament diferenciat: la mateixa tècnica amb un context o uns nombres diferents **no** crea una nova família. Un mateix procediment pot tenir diversos **generadors** o variants. Documentar per separat:
1. identificador estable de família, objectiu/procediment i raó de la seva diferenciació;
2. tipus de generador que hi pertanyen i cobertura real;
3. nivell únic justificat (N1/N2/N3), o justificació explícita si variants matemàticament diferents s'han de separar en famílies;
4. exemples d'entrada, resposta, passos i errors típics.

**N1**: identificació i aplicació directa d'un procediment. **N2**: transferència, interpretació i/o diversos passos habituals. **N3**: raonament més exigent, restriccions, reconstrucció o justificació, **dins del currículum i l'abast del tema corresponent**. No elevar artificialment un N2 a N3 per assolir un recompte.

**La dificultat matemàtica no és el mode de suport.** «Guiat/autònom» regula pistes i ajuda, no l'etiqueta N1/N2/N3. No identificar automàticament «15 tipus de generador» amb «15 famílies».

## 2. Les vuit fases obligatòries en una ampliació completa

### Fase 1 — Inventari i auditoria
- **Subfase A actual (prioritària):** auditar únicament famílies matemàtiques reals, exemples representatius, nivell actual versus recomanat i adequació estricta al curs. No revisar teoria, estil visual ni progressió en aquesta subfase. La resta de fases s'executaran posteriorment i de manera separada.
- Localitzar a `main` el tema, generadors, classificadors, teoria, navegació, correcció, exàmens i fitxes relacionades. Registrar el **commit consultat**.
- Inventariar **tots** els generadors accessibles: tipus, variants, rang de dades, modes, restriccions, solució, pistes i tipus de resposta.
- Agrupar-los per **procediment real**, assignar N1/N2/N3 amb justificació, detectar duplicitats i revisar adequació curricular.
- Comparar l'estat real amb els **objectius orientatius** 15 / 5 / 5 / 3 per a qualsevol curs i sentit, i justificar per què és o no recomanable ampliar. Identificar contradiccions entre mapes de dificultat i prioritat efectiva del codi. No donar una distribució proposada per implementada.

### Fase 2 — Ampliar les famílies insuficients
- Proposar famílies noves **només si aporten un procediment matemàtic genuí, útil i curricularment adequat**. No crear famílies per completar quotes ni forçar N3 si el tema no ho justifica. Especificar primer l'objectiu matemàtic; després, si s'aprova, crear-ne els generadors.
- Per cada generador: paràmetres diversos i vàlids, enunciat inequívoc, solució correcta, passos de resolució, pistes graduades, alternatives i toleràncies si escau.
- Evitar recursions sense límit, casos degenerats, respostes ambigües, repetició cosmètica i procediments fora del nivell curricular.
- Si una família proposada coincideix substancialment amb una existent, fusionar-les i proposar-ne una altra.

### Fase 3 — Dificultat única i coherent
- Mantenir **una font efectiva de veritat** per a la correspondència família/tipus/variant amb N1, N2 i N3.
- Revisar especialment `assets/js/dificultat-mi.js` i qualsevol classificador o mapa específic del tema. Documentar i eliminar/conciliar classificacions contradictòries.
- Verificar que pràctica, etiquetes, selecció per dificultat, exàmens i registres d'errors reflecteixen el mateix nivell.
- Les variants que exigeixin un procediment realment diferent s'han de justificar i, si cal, separar com a famílies.

### Fase 4 — Progressió i varietat de la pràctica
- Prendre **«Nombres racionals» com a referència funcional**, però inspeccionar les regles reals de la versió actual abans d'implementar-les: modes guiat/autònom, selecció N1→N2→N3, condicions de pas, repeticions, final de sessió, recuperació d'errors i reptes opcionals.
- Objectiu de referència a verificar: mode guiat de **10 exercicis**, amb llindars de progressió **3 i 6**; autònom de **20**, amb llindars **6 i 12**, segons el mecanisme de progrés que tingui el model en aquell moment.
- La selecció ha d'estar realment filtrada per nivell quan correspongui: una etiqueta visual sense filtre de generació **no** és suficient.
- Evitar que una família amb múltiples generadors domini la sessió; distribuir les oportunitats entre famílies i reduir repeticions sense encallar els casos de poca varietat.
- Verificar comportament quan s'equivoca, quan surt voluntàriament, quan es reinicia i quan s'arriba al final. Separar els reptes opcionals de la progressió ordinària quan correspongui.

### Fase 5 — Teoria de cada família
- Abans d'implementar, crear una **matriu de cobertura** família → generador(s) → apartat visible de teoria → ID d'ajuda contextual → exemple resolt → error freqüent. Si hi ha famílies sense cobertura, la fase no està completa.
- Cada família compta amb explicació del **procediment**, passos ordenats, mínim un exemple resolt correcte i errors freqüents quan aportin valor.
- Utilitzar identificadors d'ancoratge **estables i únics**; cada generador ha de conèixer la família/ajuda corresponent.
- Les explicacions han de coincidir amb la resposta admesa pel corrector; contemplar formats alternatius i casos límit.
- No generar només títols: verificar contingut, exemples i correspondència entre família i procediment.

### Fase 6 — Pàgina de teoria i navegació
- Per a **tots els cursos i sentits**, emprar com a **model visual i pedagògic de referència** `2eso/teoria/numeric/nombres-racionals.html` (a més del patró consensuat a 1r d'ESO). Analitzar el model actual abans de tocar el fitxer de destinació; adaptar-ne l'estructura i l'aspecte, no copiar-ne els continguts matemàtics.
- La **teoria principal ha de ser completa i visible sense obrir desplegables**: organitzar els procediments de totes les famílies en apartats conceptuals numerats, amb explicacions suficients. No reduir-la a quatre o cinc resums si això deixa procediments només dins l'ajuda contextual. El nombre d'apartats l'estableix la cobertura pedagògica de cada tema, **no és fix ni ha de coincidir amb el nombre de famílies**.
- Mantenir un bloc **«Ajuda per a exercicis concrets»** desplegable com a suport complementari, amb un procediment per família i enllaços contextuals. No és un substitut de la teoria principal.
- Reproduir el patró de presentació del model: capçalera i botons, índex navegable, targetes numerades, exemples resolts **visibles en una secció pròpia**, errors freqüents amb explicació de l'error i la correcció, autoavaluació desplegable amb solucions, resum, pràctica final i navegació anterior/índex/següent. No amagar tots els exemples dins les ajudes.
- Validar la correspondència **de cada família amb la teoria principal, l'ajuda i els exemples**; les agrupacions temàtiques són acceptables sempre que no suprimeixin explicacions necessàries.
- Reutilitzar estils i components del model, conservar accessibilitat i visualització responsive. La semblança ha de ser estructural i visual, no només de colors.
- Incorporar els nous continguts sense eliminar teoria útil, exemples o IDs externament enllaçats; si s'ha de canviar un ID, proporcionar compatibilitat d'enllaços.
- Enllaç contextual exercici → ajuda concreta; l'enllaç directe ha d'obrir tant el contenidor com el procediment.
- **Important:** inicialitzar el JavaScript d'obertura quan el DOM ja existeix (script al final de `body` o `DOMContentLoaded`), i provar també `hashchange`.
- Comprovar disseny i llegibilitat a **ordinador i mòbil**; no confondre una actualització del repositori amb un desplegament instantani de GitHub Pages.

### Fase 7 — Exàmens, fitxes i solucionaris
- Revisar distribució real N1/N2/N3 en els exàmens per tema, compatibilitat amb els nous generadors i filtres del curs.
- Evitar saturar l'examen amb duplicats d'una mateixa família; preservar diversitat i coherència amb les famílies justificades.
- Si hi ha fitxes imprimibles, actualitzar selecció, enunciats i solucionaris; validar que cada pregunta i resposta corresponen al mateix generador i procediment.
- Comprovar que els nous tipus no queden exclosos per llistes fixes, codis d'identificació o classificacions obsoletes.

### Fase 8 — Verificació, documentació i publicació
- Comparar explícitament la teoria resultant amb la **referència visual**: capçalera, índex, targetes, apartats visibles, ajuda contextual, exemples resolts visibles, errors, autoavaluació, resum, botons i navegació. Verificar també que cap contingut preexistent útil s'ha perdut.
- Comprovar la **matriu de cobertura 100%** per família; provar cada `#ancora` des de pràctica i navegació directa, l'obertura del desplegable i `hashchange`.
- Si es poden executar captures o proves de navegador, contrastar escriptori i mòbil amb el model; si no, fer comprovacions estàtiques i declarar que la verificació visual real queda pendent. **No afirmar equivalència visual sense haver-la comprovat.**
- Provar tots els tipus i variants amb dades repetides, casos límit, correcció, alternatives, pistes i solucions.
- Documentar els recomptes reals i la diferència respecte als objectius orientatius (15 / 5 / 5 / 3), l'assignació exacta i sense contradiccions, i la selecció efectiva N1→N2→N3.
- Provar sessions guiades i autònomes completes, sortida/reinici, exàmens, fitxes i enllaços teoria ↔ pràctica.
- Revisar consola/HTML, ancoratges i vistes **mòbil i escriptori**; si no es poden provar navegadors, indicar expressament què queda pendent.
- Publicar únicament després de les comprovacions disponibles; anotar fitxers tocats, commit, proves realitzades, limitacions i pendents.

## 3. Lliurables estàndard per tema

**Auditoria integral (només lectura):** lliurar un ZIP amb **tres fitxers**. En la **subfase A**, prioritzar l'inventari de famílies, nivell actual/recomanat, adequació curricular i incidències; no requerir especificacions de teoria ni format visual:
1. `MI_<CURS>_<tema>_families.xlsx` (o taula de dades equivalent si no es pot crear Excel): inventari tipus→família, nivell, descripció, variants, cobertura i enllaços.
2. `MI_<CURS>_<tema>_incidencies.md`: mancances pedagògiques, contradiccions de nivell, errors, riscos i verificacions pendents, prioritzades.
3. `MI_<CURS>_<tema>_especificacio_codex.md`: canvis exactes, fitxers afectats, nous procediments, progressió, teoria, proves i criteris d'acceptació. Cal incloure la matriu de cobertura i una especificació explícita de les seccions/estructura visual segons el model, diferenciant teoria principal visible i ajuda desplegable.

**Implementació:** registrar commit(s), resum dels canvis, taula de cobertura final i resultat de proves, separant validat de pendent.

## 4. Criteris de tancament (checklist)

- [ ] Inventari verificat al commit consultat i famílies definides per procediment.
- [ ] Recomptes reals documentats i comparats amb els **objectius no obligatoris** de 15 / 5 / 5 / 3; qualsevol diferència està justificada pedagògicament, sense bloquejar el tancament.
- [ ] Nivells únics, justificats i coincidents entre els diferents fluxos.
- [ ] Generadors i correctors correctes, diversos i amb pistes/solucions.
- [ ] Progressió matemàtica efectiva com al tema de referència.
- [ ] Modes guiat i autònom diferenciats **només pel suport**.
- [ ] Matriu completa família → generadors → teoria principal visible → ajuda contextual → exemple → error habitual; cap família sense cobertura.
- [ ] Teoria principal suficient i **visible**; ajuda desplegable complementària, no substitutiva.
- [ ] Estructura segons model de Nombres racionals: índex, targetes, **exemples resolts visibles**, errors freqüents, autoavaluació, resum i navegació.
- [ ] Una ajuda teòrica per família, amb enllaços contextuals funcionals.
- [ ] Comparativa visual d'escriptori i mòbil realitzada, o limitació i proves estàtiques documentades expressament.
- [ ] Exàmens, fitxes i solucionaris revisats si existeixen per al tema.
- [ ] Proves de regressió documentades; mòbil i escriptori verificats o marcats pendents.
- [ ] Canvis publicats amb commit i incidències residuals documentades.

## 5. Cas documentat: Fraccions amb sentit (2n ESO)

Punt de partida **pendent d'auditoria completa**: el codi conté **15 tipus de generador**, que **no equivalen necessàriament a 15 famílies**. Hi ha indicis de **classificacions de dificultat contradictòries** i manca de selecció progressiva específica del tema, en comparació amb «Nombres racionals». Una agrupació preliminar suggeria 13 famílies i necessitat probable d'ampliació, però **no és resultat auditat ni acceptat definitivament**.

Les candidates d'ampliació són (cal validar diferenciació i nivell):
- **Reconstruir quantitats a partir d'una raó i una diferència** (proposta N2).
- **Corregir una raó afegint una quantitat per satisfer una condició** (proposta N2).

Cal validar les candidates N3 i l'adequació al currículum abans de fixar la distribució objectiu **6-6-3** o programar ampliacions. No canviar exercicis o teoria pel sol fet de crear aquest protocol.
