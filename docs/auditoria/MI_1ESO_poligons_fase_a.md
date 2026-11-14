# Polígons — auditoria Fase A

## Abast i decisions

Base auditada: `fe68bdc4e6f88eee425146d92e798fb66306036a`. Tema `poligons` de `1eso/sentit-espacial.html`. La pràctica accessible és `genPoligons1r`, tipus 1–8; el banc obert aporta P1–P6. El tipus 8 del generador tracta elements/definició, mentre que P3 compta triangles d’una triangulació: són objectius diferents i s’identifiquen separadament. No hi ha motiu per crear família N3 dins del currículum del tema.

| ID | Família / generadors i variants | Abans → final | Justificació |
|---|---|---|---|
| nom-i-costats-poligon | `genPoligons1r` 1–2; P1 | N1 → N1 | Conversió en ambdues direccions entre nom i nombre de costats, mateixa associació. |
| elements-poligon | tipus 8 | N1 → N1 | Reconeixement de costats, vèrtexs, diagonals i definició. |
| regularitat-poligons | tipus 3 | N1 → N1 | Comprovar dues condicions d’igualtat en una definició directa. |
| convexitat-poligons | tipus 4 | N1 → N1 | Reconeixement de convexitat/cavitat i posició de diagonals. |
| diagonals-des-dun-vertex | tipus 5; P2 | N1 → N1 | Excloure el vèrtex mateix i els dos adjacents; recompte directe n−3. |
| triangulacio-des-dun-vertex | P3 | N1 → N1 | Recompte directe n−2 dels triangles creats des d’un vèrtex. |
| suma-angles-interiors | tipus 6; P4 | N1 → N2 | Relaciona n costats amb n−2 triangles i suma 180° per triangle. |
| angle-interior-regular | P5; també família d’Angles | N1 → N2 | Combina suma interior i divisió en parts iguals. |
| repartir-volta-poligon-regular | tipus 7; P6 | N1 → N2 | Reparteix 360° en angles centrals iguals o reconstrueix el nombre de costats. |

Recompte final: **9 famílies, 6 N1, 3 N2, 0 N3**. La família d’angle interior regular és compartida amb Angles; es compta una vegada dins de cada tema per mantenir la cobertura local, i queda marcada amb el mateix ID estable.

## Exemples de les famílies

| Família (nivell) | Tres enunciats i respostes correctes |
|---|---|
| Nom i costats (N1) | 7 costats → heptàgon; 9 costats → nonàgon; hexàgon → 6 costats. |
| Elements (N1) | Contorn format per segments → polígon; segment entre vèrtexs no consecutius → diagonal; contorn d’un polígon → costats i vèrtexs. |
| Regularitat (N1) | Costats i angles tots iguals → regular; només costats iguals → no necessàriament regular; angles diferents → irregular. |
| Convexitat (N1) | Totes les diagonals queden dins → convex; figura amb una entrada i angle interior major de 180° → còncau; una diagonal surt de la figura → còncau. |
| Diagonals des d’un vèrtex (N1) | Hexàgon → 3; octàgon → 5; decàgon → 7. |
| Triangulació (N1) | Pentàgon → 3 triangles; octàgon → 6; decàgon → 8. |
| Suma interior (N2) | Pentàgon → 540°; octàgon → 1080°; decàgon → 1440°. |
| Angle interior regular (N2) | Quadrat regular → 90°; hexàgon regular → 120°; decàgon regular → 144°. |
| Volta regular (N2) | Angle central 90° → 4 costats; 60° → 6 costats; polígon regular de 10 costats → angle central 36°. |

## Implementació i validació

La font de famílies és `assets/js/espacial-1eso-families.js`. La pràctica i els bancs P1–P6 comparteixen els identificadors; els nivells antics N1 s’han revisat per procediment, no pel nombre de tipus. La selecció d’examen diferencia per `familyId`.

- Prova matemàtica: `scripts/comprova-espacial-poligons-families-1eso.cjs`, 2.000 mostres (250 per cadascun dels 8 tipus), amb comprovacions independents de diagonals, triangulació, suma angular, angle central i noms.
- Prova Playwright: `scripts/comprova-espacial-poligons-1eso.cjs`; executada a Chrome. Verifica pràctica, rotació després d’errors, exàmens, regressions, ancoratges i 390 px.
- La prova de navegador comprova 1.500 mostres (250 per patró P1–P6) amb oracles independents. Pendents: repetir a Windows abans del tancament; no s’ha comprovat cap desplegament de Pages.
