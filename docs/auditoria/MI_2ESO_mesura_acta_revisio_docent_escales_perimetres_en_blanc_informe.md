# Model d'acta de revisió docent: Escales i Perímetres · 2n ESO

**Estat:** acta **sense emplenar ni signar**. No representa cap revisió ja realitzada, cap decisió pedagògica registrada ni cap autorització d'implementació.

Fitxa estructurada: [MI_2ESO_mesura_acta_revisio_docent_escales_perimetres_en_blanc.json](MI_2ESO_mesura_acta_revisio_docent_escales_perimetres_en_blanc.json).

## Per què es fan dues decisions independents

L'acta distingeix expressament:

**Decisió A: identitat de família matemàtica.** Després de revisar els criteris **C1–C5** (nucli diferencial, independència real, varietat contrastada, adequació curricular i límits amb famílies existents), el docent pot classificar cada proposta com a **família independent**, **variant**, **pràctica composta**, **rebuig** o **evidència insuficient**. El camp de decisió continua buit.

**Decisió B: dificultat.** Una vegada examinada la demanda cognitiva observable, el docent pot proposar N1, N2 o N3 amb justificació pròpia. La hipòtesi de prova pilot **N2** no és un nivell aprovat; la identitat de família no decideix el nivell, ni a l'inrevés. El camp de nivell continua buit.

La revisió pedagògica tampoc no autoritza automàticament programar un generador, fusionar una PR o publicar el web: són tres decisions diferents i posteriors.

## Evidències que l'acta demana per candidat

| Candidat | Tasques a revisar | Evidència crítica |
|---|---|---|
| Escales | **E1, E2, E3, E4** | E2: igual àrea però rectangles diferents; E4: transferència a escales noves; E3 és control |
| Perímetres | **P1, P2, P3, P4** | P3: identificar el costat intern compartit entre dos rectangles; P1/P4: figura amb semicercle; P2 és control |

S'ha de registrar la justificació associada a cada C1–C5, les comparacions amb exercicis existents, les observacions i els dubtes pendents. No és vàlid substituir l'evidència per una puntuació global: un nombre elevat d'encerts o de passos **no** aprova una nova família ni N3.

## Estat dels registres

Tots els camps de sessió, revisor, observacions, evidència, classificació de família, nivell, justificació i signatura són **nuls o pendents**. Hi ha **zero actes docents realment emplenades, zero famílies aprovades i zero nivells oficials canviats**.

El model recorda que s'han d'utilitzar codis anònims en eventuals observacions i que no s'han de pujar dades personals d'alumnat al repositori.

## Verificació tècnica

El script `scripts/test-mesura-2eso-acta-revisio-docent.cjs` comprova els dos candidats, els **10 criteris C1–C5** que caldria valorar, l'enllaç a les 8 fitxes i que cap camp d'aprovació no s'ha omplert. El workflow dedicat està definit a `.github/workflows/test-mesura-2eso-acta-revisio-docent.yml`.

**Següent punt de treball:** revisar l'acta i els casos E2/P3 en relació amb els requisits curriculars i decidir si ja es disposa d'evidència suficient o si cal una aplicació docent abans de proposar cap implementació.

Cap PR fusionada, cap generador modificat i cap canvi publicat a la web.
