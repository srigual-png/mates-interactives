# 3r ESO · Sentit numèric · Blocs 2 i 3

> Estat: auditoria iniciada. Documentació i propostes en PR Draft; sense canvis de producció.

## Abast

- **Bloc 2 · Decimals i fracció generatriu**: generatriu3r, 12 tipus.
- **Bloc 3 · Nombres reals i intervals**: reals3r, 12 tipus.
- Les ampliacions etiquetades per a 4t ESO queden fora.

## Punt de partida comprovat

- La revisió desada de generatriu3r proposa 8 tipus N1 i 4 N2; la classificació activa a REVIEWED_LEVELS mostra el mateix.
- La revisió desada de reals3r proposa els 12 tipus N1; el mapa actiu també els classifica N1.
- Els resultats previs registren 3.000 mostres per bloc. Generatriu3r: cobertura i examen 8/4/0. Reals3r: 12/0/0. Consten banksReviewed=0, bankChecks buit i pageErrors buit. No es repetiran les simulacions sobre el mateix codi.
- No hi ha cap PR prèvia específica per a aquests dos blocs. La PR #55 cobreix només el Bloc 1 i es manté separada.

## Contrast curricular

Font oficial: [XTEC — Orientacions curriculars de Matemàtiques per cursos, proposta de 3r ESO, sentit numèric, p. 18](https://xtec.gencat.cat/web/.content/curriculum/eso/concrecions-curriculars/Orientacions-curriculars_MAT_SEC_per-cursos.pdf). Inclou decimals exactes i periòdics/fracció generatriu, nombres no racionals, i representació d’intervals i semirectes a la recta real. Cal distingir aquests continguts dels blocs 1 i 4 per no duplicar famílies.

## Feina pendent

1. Comparar els 24 tipus amb els generadors, branques, preguntes, solucions, variants i nivells actius.
2. Mapejar tipus a famílies i concloure mateixa família, variant o tasca diferent.
3. Justificar cada nivell amb el currículum de 3r, dos exemples resolts, errors típics i casos límit.
4. Determinar si els 12 tipus N1 de nombres reals són correctament directes o si hi ha procediments que justifiquen N2. No crear N3 per quota.
5. Identificar buits reals i proposar exercicis nous només si cobreixen habilitats no presents.
6. Revisar els modes guiat, autònom i examen amb evidència existent; separar inspecció estàtica, simulació i validació visual.
7. Si s’aplica algun canvi funcional, fer una única validació integrada al final i no repetir proves verdes sobre codi sense canvis.

