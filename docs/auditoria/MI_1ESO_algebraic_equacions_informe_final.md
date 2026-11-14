# Equacions de primer grau · Lot 2 · 1r ESO

Base auditada: `b046e8dd6466279b9b8e78cd8144d8f0e3fddde1` (main amb PR #40). Els tipus 5/6 de `genEquacions` continuen reservats a l’ampliació de 2n. La pàgina de teoria existent no s’ha modificat.

## Inventari i classificació definitiva

La pràctica ordinària té tipus interns 1–4, 7 i 8. El banc obert aporta E1–E10. Els casos textuals i els numèrics s’agrupen quan comparteixen el procediment d’aïllar la incògnita.

| ID estable | Família | Generadors / variants | Nivell anterior | Final |
|---|---|---|---|---|
| `resoldre-equacio-additiva-dun-pas` | Resoldre una equació additiva d’un pas | `equacions:1`, E1, E2 | N1 | N1 |
| `resoldre-equacio-multiplicativa-dun-pas` | Resoldre una equació multiplicativa d’un pas | `equacions:2`, E3 | N1 | N1 |
| `resoldre-equacio-lineal-de-dos-passos` | Eliminar el terme independent i dividir pel coeficient | `equacions:3`, `equacions:4`, E4, E5 | N2 | N2 |
| `modelitzar-i-resoldre-equacio-en-un-context` | Representar una situació amb una equació i resoldre-la | `equacions:7`, `equacions:8`, E6–E10 | tipus 7/8 N3; E6 N1; E7–E10 N2 | N2 |

Els antics N3 dels problemes contextuals baixen a N2: traduir un text senzill a una equació lineal i aïllar x combina passos habituals, però no demana reconstrucció ni justificació amb restriccions. El context d’edat d’E6 es classifica al mateix nivell perquè també requereix modelització, encara que tingui una equació d’un sol pas. No s’ha afegit cap família ni s’ha conservat un N3 artificial.

## Exemples representatius

| Família / nivell | Enunciat | Resposta |
|---|---|---|
| Equació additiva · N1 | Resol `x + 7 = 19`. | `x = 12` |
|  | Resol `x − 5 = 8`. | `x = 13` |
|  | La Júlia té 4 anys més que en Pau i té 15 anys. Quants en té en Pau? | `11 anys` |
| Equació multiplicativa · N1 | Resol `4x = 28`. | `x = 7` |
|  | Resol `7x = 63`. | `x = 9` |
|  | Resol `3x = 21`. | `x = 7` |
| Equació de dos passos · N2 | Resol `2x + 5 = 19`. | `x = 7` |
|  | Resol `3x − 4 = 17`. | `x = 7` |
|  | Resol `5x + 2 = 32`. | `x = 6` |
| Modelització contextual · N2 | Penso un nombre, el multiplico per 3 i hi sumo 5; obtinc 26. | `3x + 5 = 26`; `x = 7` |
|  | Un rectangle d’amplada 4 cm té perímetre 24 cm. Troba’n la llargada. | `2x + 8 = 24`; `x = 8 cm` |
|  | Una activitat costa 10 € per persona i 2 € fixos; el total és 72 €. Quantes persones hi ha? | `10x + 2 = 72`; `x = 7` |

## Cobertura de teoria

Sense canvis a la teoria. Els procediments s’enllacen amb `#igualtat`, `#inverses`, `#tipus`, `#resoldre`, `#problemes`, `#comprovar` i `#estrategia`. El test Chrome verifica enllaç contextual, destinació, ancoratges directes, `hashchange` i 390 px.

## Validació

- Test matemàtic: **4.000 mostres** (1.500 dels sis tipus interns ordinaris i 2.500 dels deu patrons E1–E10); comprovació independent per substitució a les equacions, opcions, solucions, correspondència família/nivell: superat.
- Test Playwright Chrome: 500 generacions, rotació sense repetició consecutiva i cobertura de les 4 famílies, pràctica guiada/autònoma i recuperació, examen de tema de 12 i global de 20 preguntes: superat.
- La mateixa execució comprova 30 generacions per cadascuna de les quatre ampliacions de 2n i els altres temes de Lot 2: superat.
- Limitació: el clic pràctica → teoria queda pendent de navegador servit per HTTP perquè l’entorn de prova obre la pàgina amb `file://`.
