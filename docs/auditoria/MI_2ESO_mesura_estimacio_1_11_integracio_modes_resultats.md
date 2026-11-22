# Verificació d'integració dels modes · Estimació 1 i 11 · 2n ESO

**Data:** 17/11/2026 · **Estat:** simulació d'integració sobre el codi real amb DOM simulat; **no** és una inspecció visual en un navegador complet.

## Cobertura

S'han executat les funcions reals dels dos generadors `estimacio:1` i `estimacio:11` i les funcions de la pàgina que mostren i corregeixen preguntes (`showExercise`, `selectAnswer`, `renderExamQ`, `selectExamAnswer`) dins d'un entorn JavaScript amb elements DOM simulats.

Per a cadascun dels dos tipus, la prova ha verificat:

- Pràctica amb **pistes (nivell 1)**: es mostra l'enunciat, una pista i les quatre opcions.
- Pràctica **sense pistes (nivell 2)**: les pistes queden ocultes i les opcions continuen disponibles.
- Correcció de respostes **correctes i incorrectes** segons el resultat del generador.
- **Mode examen**: es mostren enunciat i quatre alternatives, es desactiva la resposta escrita per `allowOpen=false` i es corregeix l'opció seleccionada correctament.
- **Resposta escrita**: tots dos generadors estableixen `allowOpen=false`; el codi de pràctica amb resposta oberta intenta evitar aquests tipus fins a 40 cops. Aquest comportament general s'ha inspeccionat al codi, però **no s'ha provat un recorregut complet de selecció aleatòria amb mode obert**.

**CI final:** https://github.com/srigual-png/mates-interactives/actions/runs/44066282805 — **success**.

## Límits de la verificació

- S'ha executat JavaScript real, però **el DOM és simulat**. No s'han comprovat aspecte visual, disposició responsive, botons en un navegador real ni interaccions de punter o teclat.
- La integració comprova un exercici generat per tipus en cada modalitat; les bateries numèriques independents i la generació mostrejada estan documentades en altres informes.
- No comprova que tots els 20 exercicis d'un examen aleatori acabin incloent necessàriament un dels dos tipus; només el seu comportament quan formen part d'un examen.

## Conclusions i següent pas

Les dues correccions autoritzades **no han mostrat regressions** en els circuits de resposta múltiple, pistes de nivell 1, absència de pistes de nivell 2 o correcció d'examen segons aquesta simulació. Per donar per acabada la validació de la interfície cal una **prova visual real amb navegador** (pantalla gran i mòbil) dels tipus d'Estimació 1 i 11.

No s'ha modificat cap generador addicional, nivell o família oficial, ni fusionat la PR #49 ni publicat la web.
