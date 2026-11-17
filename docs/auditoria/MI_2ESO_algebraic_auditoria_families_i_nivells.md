# 2n ESO · Sentit algebraic — auditoria de famílies i nivells

> Estat: en curs. Aquesta branca inicia la revisió documental dels set temes ordinaris. Les tres ampliacions de 3r ESO queden excloses.

## Abast i punt de partida

Temes ordinaris i tipus registrats: patrons (8), expressions (10), equacions (12), problemes amb equacions (12), relacions (12), funcions lineals (17) i pensament computacional (17): **88 tipus**. Les ampliacions productes3r, identitats3r i sistemes3r no formen part d’aquest bloc de 2n.

La classificació desada a REVIEWED_LEVELS i revisió-punt3 té 46 tipus N1 i 42 N2, cap N3. Aquesta distribució és una proposta heretada i s’ha de contrastar amb el procediment real de cada tipus, no assumir com a definitiva.

## Evidència que ja existeix

- docs/dificultats/revisio-2eso-algebraic-punt3.json conté 136 tipus entre temes ordinaris i ampliacions de 3r, amb motius, nivells i mostres.
- docs/dificultats/resultats-punt3-2eso-algebraic.json registra 3.000 generacions per cadascun dels 10 temes, cobertura i selecció d’examen. No s’han de repetir proves que no tinguin canvis de codi rellevants.
- docs/dificultats/continuacio-algebraic-2eso-punt3.md resumeix una auditoria prèvia: 81/55/0 en els 136 tipus, cobertura alta pendent, proves específiques i límits de la validació. Aquesta revisió n’ha de recuperar les conclusions sense duplicar la feina feta.
- Els registres previs indiquen 0 bancs revisats i 0 errors de pàgina; no equivalen a comprovació visual al navegador.

## Contrast curricular

Font oficial: [XTEC, Orientacions curriculars de Matemàtiques per cursos, proposta de 2n ESO, sentit algebraic, p. 13](https://xtec.gencat.cat/web/.content/curriculum/eso/concrecions-curriculars/Orientacions-curriculars_MAT_SEC_per-cursos.pdf). Cal verificar-hi patrons i generalització, expressions, equacions i problemes, relacions funcionals, representació/lectura de funcions i pensament computacional. No classificar per llargada de l’enunciat o nombre de passos sols.

## Feina pendent d’aquesta auditoria

1. Comparar els 88 tipus ordinaris amb els seus enunciats, procediments, solucions i branques.
2. Assignar cada tipus a una família; marcar mateixa família, variant o tasca diferent. Separar variants internes que canviïn el procediment.
3. Proposar N1/N2/N3 amb justificació curricular i exemples resolts; no forçar N3 ni quotes artificials.
4. Identificar buits curriculars reals i proposar exercicis nous només quan aportin procediments no coberts.
5. Revisar modes guiat, autònom i examen a partir del codi i de l’evidència ja desada. Distingir inspecció estàtica de validació en navegador.
6. Si hi ha canvis de codi, fer una única integració de validació al final, sense repetir les proves ja superades sobre el mateix codi.

La feina es manté documental i en Draft. No es fusiona ni publica. No es canvien els nivells actius ni el registre oficial de famílies fins a tenir el dictamen complet.