# Revisió de variants: Pitàgores 15, Estimació i Superfícies (2n ESO)

**Estat: proposta pedagògica no aprovada, sense canvis funcionals.**

## Resultat

El catàleg global de 72 grups de treball manté la seva identitat. Sobre l'escissió anterior (80 grups provisionals), la revisió de tres clústers `ME2-C036`, `ME2-C009` i `ME2-C051` produeix **8 subgrups provisionals**. El recompte **85** és només el nombre hipotètic de clústers de revisió si es ratifiquen totes les escissions, **mai 85 famílies genuïnes**.

| Clúster | Procediments examinats | Prudència pedagògica |
|---|---|---|
| ME2-C036 | Pitàgores 15: diagonal del rectangle / catet desconegut | Dues branques reals de generador, amb operacions inverses; mantindre un tipus amb dues variants |
| ME2-C009 | Estimar longitud / superfície / volum i capacitat | Les magnituds varien però el judici d'ordre de magnitud pot ser una mateixa família; no comptar-ne tres sense evidència |
| ME2-C051 | Volum d'ortoedre / prisma amb àrea base donada / cub | Producte volumètric compartit; les dades donades i l'esquema algebraic poden ser variants, no tres famílies |

## Mostres del generador verificades

El workflow de GitHub Actions **#44046115207** ha finalitzat correctament: valida la traçabilitat de l'escissió i executa **14 mostres reals**, dues per cada tipus d'Estimació (1,2,3) i Superfícies (1,3,5), més les dues branques forçades de Pitàgores 15.

- **Pitàgores 15, diagonal:** rectangle 8 × 15 cm, resultat 17 cm.
- **Pitàgores 15, catet:** hipotenusa 29 cm i un catet 20 cm, resultat 21 cm.
- **Prisma amb base coneguda:** base 42 cm² i altura 6 cm, resultat 252 cm³. La segona mostra dona 168 cm³ per a altura de 4 cm.

La prova revisa quatre opcions sense duplicats, presència de resposta, passos de guia i solució, i oracles numèrics dels volums i de Pitàgores 15. **No és una prova exhaustiva de totes les configuracions, ni de navegació ni de dificultat curricular.**

## Pendents específics

1. **`superficies:17`**: les variants `sameBase` i `other` poden canviar la càrrega cognitiva. Cal comprovar si totes dues apareixen efectivament en mostres i si el classificador les distingeix de manera coherent.
2. **Estimació:** evitar crear famílies per simple canvi d'unitat o magnitud; inspeccionar distractors i coneixements necessaris.
3. **Superfícies:** distingir el producte base×altura de la necessitat prèvia de construir l'àrea de base.
4. Establir identitat de família genuïna i N1/N2/N3 amb evidència curricular per cada variant; **no completar quotes artificialment**.
5. No tocar `families-validades.json`, el codi publicat ni fusionar PR sense autorització.

Font de les decisions: [MI_2ESO_mesura_variants_pitagores_estimacio_superficies.json](MI_2ESO_mesura_variants_pitagores_estimacio_superficies.json).
