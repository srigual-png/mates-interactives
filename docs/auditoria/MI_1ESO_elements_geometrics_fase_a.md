# Elements geomètrics bàsics — auditoria Fase A

## Abast i decisió

Base auditada: `fe68bdc4e6f88eee425146d92e798fb66306036a`. Tema `elements`, pàgina de pràctica `1eso/sentit-espacial.html`. La pràctica utilitza `genElementsVarietat` (tipus 1–8); el generador antic `genElements` no està connectat a `TOPICS` i no es compta com a ruta activa. També són accessibles els patrons E1–E5 del banc obert.

Les variants de preguntes de definició no creen famílies noves. La mediatriu i la bisectriu comparteixen procediment amb contingut de Triangles, però conserven una única entrada cadascuna dins d’aquest tema. No hi ha cap procediment que justifiqui N3 en aquests continguts de 1r.

| ID | Família / generadors i variants | Abans → final | Justificació |
|---|---|---|---|
| elements-geometria-bàsics | `genElementsVarietat` 1, 7, 8 (variants d’identificació); E1 | N1 → N1 | Reconeixement directe de propietats i noms. |
| posicions-relatives-rectes | tipus 2; E2, E3 | N1 → N1 | Classificació directa a partir d’intersecció i angle recte. |
| punt-mig-segment | tipus 3 | N1 → N1 | Divisió directa per dos d’una longitud coneguda. |
| mediatriu-segment | tipus 4, 8 (variant mediatriu); E4 | N1 → N1 | Identificació de la perpendicular pel punt mig i interpretació de punts equidistants. |
| bisectriu-angle | tipus 5, 8 (variant bisectriu); E5 | N1 → N1 | Repartiment directe d’una amplitud en dues parts iguals. |
| alineacio-i-incidencia | tipus 6 | N1 → N1 | Lectura directa de pertinença i alineació. |

Recompte final: **6 famílies, 6 N1, 0 N2, 0 N3**.

## Exemples de les famílies

| Família (nivell) | Tres enunciats i respostes correctes |
|---|---|
| Identificar elements (N1) | «Té dos extrems i longitud finita» → segment; «s’allarga indefinidament en dues direccions» → recta; «només indica una posició» → punt. |
| Posicions relatives (N1) | «No es tallen» → paral·leles; «formen 90°» → perpendiculars; «es tallen sense formar 90°» → secants obliqües. |
| Punt mig (N1) | AB=12 cm → AM=6 cm; AB=24 cm → AM=12 cm; AB=18 cm → AM=9 cm. |
| Mediatriu (N1) | «Recta perpendicular pel punt mig» → mediatriu; «P és equidistant d’A i B» → P pertany a la mediatriu d’AB; «lloc dels punts equidistants dels extrems» → mediatriu. |
| Bisectriu (N1) | 72° dividits en dues parts → 36°; 120° → 60°; 98° → 49°. |
| Alineació i incidència (N1) | A, B i C a la mateixa recta → alineats; A pertany a r → A és un punt de r; dos punts diferents → determinen una recta. |

## Implementació i validació

La font efectiva és `assets/js/espacial-1eso-families.js`, consumida pel classificador compartit. La pràctica alterna per `familyId`; l’examen de tema diversifica per família real. No s’han editat pàgines de teoria ni CSS.

- Prova matemàtica: `scripts/comprova-espacial-elements-families-1eso.cjs`, 2.000 mostres (250 per cadascun dels 8 tipus), amb llavor fixa i comprovacions independents de punt mig i bisectriu.
- Prova Playwright: `scripts/comprova-espacial-elements-1eso.cjs`; Chrome disponible, 1.250 mostres (250 per patró E1–E5) amb oracles independents, pràctica guiada/autònoma, 30 respostes incorrectes, examen de tema i global, regressions, navegació amb ancoratges, `hashchange`, 390 px i errors JS.
- Pendents: cal repetir les proves a Windows amb la versió local de Node/navegador de l’usuari abans del tancament de revisió. No s’afirma cap desplegament de Pages.
