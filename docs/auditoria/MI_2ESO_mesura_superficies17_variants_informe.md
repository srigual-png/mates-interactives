# Superfícies i volums, tipus 17 · Verificació de les dues variants

**Estat: comprovació funcional superada, proposta curricular no aprovada.**

## Procediments

`superficies:17` demana decidir quin recipient té més capacitat a partir de les dimensions de dues capses. El generador evita igualtats de volum i marca `difficultyVariant='sameBase'` quan les dues primeres dimensions són iguals. Si les bases són diferents, no marca variant i s'aplica el nivell base.

| Cas | Raonament | Classificació observada |
| --- | --- | --- |
| `sameBase` | La mateixa base es cancel·la en comparar volums; només cal comparar altures | **N1** |
| `other` | Cal calcular o comparar el producte de les tres dimensions per a cada recipient | **N2** |

La classificació també és compatible amb registres antics que no tenen el camp `difficultyVariant`: el classificador reconeix les sis dimensions de l'enunciat.

## Prova directa del generador i el classificador

Nou validador: `scripts/test-mesura-2eso-superficies17-variants.cjs`. Executa el generador HTML i el classificador real `assets/js/dificultat-mi.js` en un context aïllat. Comprova el producte de dimensions **independentment de la resposta retornada**, les quatre opcions diferents, la marca de variant, el nivell del classificador i la inferència retrospectiva sense metadades.

Execució GitHub Actions **#44046713429: success**. Quatre casos dirigits:

1. **sameBase / N1:** 4×3×2 = 24 dm³ contra 4×3×3 = 36 dm³ → recipient B.
2. **other / N2:** 6×5×4 = 120 dm³ contra 3×6×5 = 90 dm³ → recipient A.
3. **sameBase / N1:** 5×4×4 = 80 dm³ contra 5×4×3 = 60 dm³ → recipient A.
4. **other / N2:** 4×5×3 = 60 dm³ contra 5×3×5 = 75 dm³ → recipient B.

Per als quatre casos, la classificació amb i sense metadades ha coincidit amb la variant esperada.

## Interpretació i límits

- La diferència entre comparar altures i comparar dos productes de tres factors és una **distinció cognitiva verificable**; mantenir la proposta N1/N2 per a revisió curricular és raonable.
- **No** es compten dues famílies matemàtiques genuïnes només per tenir dues variants. El nucli és comparar capacitats de prismes rectangulars.
- Quatre fixtures dirigits demostren que les dues branques funcionen; **no** demostren cobertura aleatòria exhaustiva, varietat de distractors, ni rendiment en navegador, pràctica guiada i examen.
- No s'ha editat `families-validades.json`, cap generador ni el classificador. Cap PR fusionada, cap publicació.

**Proper pas proposat:** registrar aquesta evidència en la matriu de nivells provisionals per variant i auditar la resta de tipus mixtos documentats (`unitats:6`, `pitagores:15`, `superficies:17`) conjuntament, sense forçar N3 ni duplicar famílies.
