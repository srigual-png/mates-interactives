# Informe de mancances per tema i nivell · 2n ESO, Sentit de la mesura

**Estat:** diagnòstic de codi i auditoria **provisional**. No equival a la validació de famílies genuïnes. Font detallada: [MI_2ESO_mesura_mancances_per_tema_i_nivell.json](MI_2ESO_mesura_mancances_per_tema_i_nivell.json).

## 1. Nivells dels tipus inventariats

La font és el mapa `REVIEWED_LEVELS["2eso/mesura"]` de `assets/js/dificultat-mi.js` a la branca de la PR #49. Es compta **cada tipus una sola vegada**, sense inflar els totals amb variants del mateix tipus.

| Tema | Tipus totals | N1 | N2 | N3 | Dèficit mínim de tipus N1/N2/N3 |
|---|---:|---:|---:|---:|---|
| Unitats | 18 | 14 | 4 | 0 | 0 / **1** / **3** |
| Escales | 18 | 5 | 13 | 0 | 0 / 0 / **3** |
| Pitàgores | 16 | 7 | 9 | 0 | 0 / 0 / **3** |
| Perímetres | 18 | 11 | 7 | 0 | 0 / 0 / **3** |
| Superfícies | 20 | 9 | 11 | 0 | 0 / 0 / **3** |
| Estimació | 18 | 13 | 5 | 0 | 0 / 0 / **3** |
| Problemes | 20 | 5 | 15 | 0 | 0 / 0 / **3** |
| **Total** | **128** | **64** | **64** | **0** | — |

**Interpretació correcta:** són dèficits dels **tipus actualment classificats**, comparats amb els llindars N1≥5, N2≥5, N3≥3. **No es poden fer servir per acreditar els mínims de famílies genuïnes**, que necessiten comprovació de procediments independents.

## 2. Indicadors del catàleg de treball

Partint dels **72 clústers inicials**, els dos conjunts d'escissions proposats produirien **85 clústers de revisió**, encara **no ratificats**. Com que alguns grups travessen més d'un tema, el recompte per tema és un nombre de clústers que el toquen, no una partició de 85 ni una quantificació de famílies independents.

| Tema | Clústers provisionals que inclouen el tema | Diferència orientativa fins a 15 |
|---|---:|---:|
| Unitats | 10 | 5 |
| Escales | 14 | 1 |
| Pitàgores | 13 | 2 |
| Perímetres | 12 | 3 |
| Superfícies | 14 | 1 |
| Estimació | 12 | 3 |
| Problemes | 20 | 0 |

**Advertiment essencial:** la columna «diferència» és només una **senyal d'auditoria**. No significa que falti exactament aquest nombre de famílies. Les escissions poden sobreestimar la varietat i els grups massa amplis poden infraestimar-la. Ni tan sols els 20 grups de Problemes demostren 15 famílies independents.

## 3. Variants que no es poden confondre amb tipus nous

La matriu de variants proposa N1/N2 dins de tres tipus mixtos:

- `unitats:6`: conversió directa N1 / encadenada N2. **La segona assignació està proposta a la PR #53 encara sense fusionar**, no és un canvi vigent en el mapa base de la PR #49.
- `pitagores:15`: catet N1 / diagonal N2.
- `superficies:17`: bases iguals N1 / diferents N2.

Els totals 64 N1 + 64 N2 són els nivells **base per tipus**, no l'estadística real de totes les instàncies generades. Una branca N2 dins un tipus N1 no augmenta el recompte de tipus N2.

## 4. Prioritats de desenvolupament i revisió

1. **N3 (set temes):** determinar quins reptes autèntics del currículum de 2n ESO poden requerir tres decisions matemàtiques, justificació o modelització, en lloc d'elevar artificialment exercicis N2. Si un tema no permet assolir els mínims sense sortir del currículum, cal deixar-ho documentat i portar-ho a decisió explícita.
2. **Unitats N2:** revisar el nivell real de les variants encadenades i proposar procediments genuïnament diferents, no simples canvis de prefix.
3. **Problemes N1:** estudiar exercicis directes que resolguin un objectiu de mesura sense passos compostos innecessaris.
4. **Famílies genuïnes:** contrastar almenys dues instàncies reals per clúster, definir objectiu curricular i decisions necessàries, i després recomptar per tema i nivell. Evitar donar per assolida la fita de 15 basant-se en clústers provisionals.
5. **Integració funcional:** validar guiat, autònom, examen i repetició, amb proves de navegador i varietat suficient, abans de modificar l'inventari de famílies o publicar canvis.

## 5. Verificació tècnica i control de canvis

El validador `scripts/test-mesura-2eso-mancances.cjs` recalcula les xifres directament del classificador i de les capes de revisió, incloses les 85 agrupacions hipotètiques. GitHub Actions **#44048157867: correcte**.

**Sense canvis** a `families-validades.json`, als generadors, als nivells del classificador, a la web publicada o a l'estat de fusió de les PR.
