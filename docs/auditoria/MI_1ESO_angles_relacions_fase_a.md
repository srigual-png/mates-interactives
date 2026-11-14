# Angles: tipus i relacions — auditoria Fase A

## Abast i decisions

Base auditada: `fe68bdc4e6f88eee425146d92e798fb66306036a`. Tema `angles`, a `1eso/sentit-espacial.html`. La pràctica accessible és `genAngles`, tipus 1–7; són també accessibles els patrons contextuals A1–A7. Variants de nombres i de relació dins d’un mateix procediment no es compten com a famílies noves.

El patró A6 era barrejat amb el càlcul directe d’un angle que falta. Se separa perquè parteix de tres angles coneguts al voltant d’un punt i requereix combinar tres dades mitjançant sostraccions. Es classifica N2. Cap família requereix raonament avançat N3 per a 1r.

| ID | Família / generadors i variants | Abans → final | Justificació |
|---|---|---|---|
| classificar-amplitud-angle | `genAngles` 1; A1 | N1 → N1 | Comparar amb 90° i 180°. |
| angle-que-falta | tipus 2, 3, 5; A2, A3, A7 | N1 → N1 | Aplicar la suma coneguda de 90°, 180° o 360° i una resta directa. |
| oposats-pel-vertex | tipus 4; A4 | N1 → N1 | Els angles oposats pel vèrtex són iguals. |
| completar-volta-amb-tres-angles | A6 | N1* → N2 | Combina tres amplituds abans de trobar la part restant de 360°. `*` La classificació efectiva anterior del banc era N1; el mapa heretat secundari indicava N2, una contradicció que queda resolta. |
| relacions-angles-paral-leles | tipus 6; A5 | N1 → N2 | Cal identificar si la relació conserva l’amplitud o completa 180°. |
| angle-interior-regular | tipus 7; P5; també família de Polígons | N1 → N2 | Combina suma interior d’un polígon i repartiment entre angles iguals. |

Recompte final: **6 famílies, 3 N1, 3 N2, 0 N3**.

## Exemples de les famílies

| Família (nivell) | Tres enunciats i respostes correctes |
|---|---|
| Classificar amplitud (N1) | 38° → agut; 90° → recte; 145° → obtús. |
| Angle que falta (N1) | Complementari de 35° → 55°; suplementari de 124° → 56°; adjacent en línia recta a 70° → 110°. |
| Oposats pel vèrtex (N1) | Oposat a 45° → 45°; oposat a 112° → 112°; oposat a 150° → 150°. |
| Completar volta (N2) | 70°, 95° i 110° al voltant d’un punt → 85°; 80°, 120° i 65° → 95°; 100°, 85° i 90° → 85°. |
| Paral·leles i transversal (N2) | Altern intern d’un angle de 62° → 62°; corresponent de 117° → 117°; conjugat intern de 73° → 107°. |
| Angle interior regular (N2) | Triangle regular → 60°; pentàgon regular → 108°; octàgon regular → 135°. |

## Implementació i validació

Les famílies i els nivells s’assignen a `assets/js/espacial-1eso-families.js`. El classificador, el banc A1–A7 i el pla d’examen consumeixen aquesta font. S’ha retirat l’SVG fix de genAngles tipus 6: el dibuix posava α i β en posicions de conjugats interns encara que l’enunciat triés relacions diferents.

- Prova matemàtica: `scripts/comprova-espacial-angles-families-1eso.cjs`, 1.750 mostres (250 per cadascun dels 7 tipus), incloent-hi oracle de sumes, oposats, relacions i angles interiors regulars.
- Prova Playwright: `scripts/comprova-espacial-angles-1eso.cjs`; Chrome, 1.750 mostres (250 per patró A1–A7) amb oracles independents, pràctica, rotació després d’errors, exàmens, regressions, SVG, ancoratges i vista mòbil.
- Pendents: les 250 mostres són del generador de pràctica; els bancs contextuals es validen al test de navegador. Repetir a Windows abans del tancament. Sense afirmacions de desplegament de Pages.
