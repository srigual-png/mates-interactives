# 3r ESO · Sentit numèric · Bloc 1 — Nombres racionals

> Pilot de revisió completa d’un bloc en una sola línia de treball. Estat: en curs. No s’assumeix que calgui afegir N3 si no hi ha un procediment curricular que el justifiqui.

## Abast i inventari inicial

El bloc racionals3r té **12 tipus ordinaris**: conversió fracció→decimal; decimal→fracció irreductible; comparació; ordenació; suma/resta; producte/divisió; operació decimal-fracció; operació combinada; equació additiva inversa; interval de resultat; fraccions d’una quantitat en dues etapes; estimació/validació del signe i magnitud.

Classificació desada a REVIEWED_LEVELS: 7 N1 i 5 N2, cap N3. Revisió-punt3 té una reclassificació prèvia marcada reclassified-with-gaps. Cal comprovar les raons i no tornar a fer el cens o les proves ja desades.

## Evidència existent

- docs/dificultats/revisio-3eso-numeric-punt3.json: 12 tipus de racionals amb propostes de nivell, motius i mostres.
- docs/dificultats/resultats-punt3-3eso-numeric.json: 3.000 mostres registrades per tema, cobertura i selecció d’examen; per racionals indica cobertura 9/5 i selecció 6/6. banksReviewed=0, bankChecks buit i pageErrors buit: no acrediten revisió visual ni de bancs.
- El resultat simulat no s’ha de comptar com a validació de 3.000 exercicis únics. No repetir execucions sense canvi material de codi o d’oracle.

## Contrast curricular

Font oficial: [XTEC, Orientacions curriculars de Matemàtiques per cursos, proposta de 3r ESO, sentit numèric, p. 18](https://xtec.gencat.cat/web/.content/curriculum/eso/concrecions-curriculars/Orientacions-curriculars_MAT_SEC_per-cursos.pdf). El curs inclou classificació dels racionals, conversió fracció-decimal, operacions i propietats en contextos, interpretació i validació de resultats i estimació. També cal distingir el que és propi d’aquest bloc del que correspon a fracció generatriu, nombres reals, aproximacions o proporcionalitat.

## Sis passos del pilot

1. Confirmar inventari real de tipus, branques i nivells actius.
2. Comparar tipus i deduplicar procediments equivalents; justificar mateixa família, variant o tasca diferent.
3. Proposar nivells amb justificació curricular i exemples resolts, errors típics i casos límit.
4. Detectar mancances reals i proposar exercicis nous només si completen una habilitat no coberta; no forçar cap quota de N3.
5. Revisar modes guiat, autònom i examen amb la millor evidència existent; deixar explícit què és estàtic, simulat o visual.
6. Si s’apliquen canvis funcionals, executar una sola integració al final i reutilitzar les evidències vigents sobre codi sense canvis.

El resultat d’aquest pilot servirà per fixar una plantilla eficient per als blocs següents. La PR es manté en Draft; sense fusió, publicació ni canvis de producció abans del dictamen complet.