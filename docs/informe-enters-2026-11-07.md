# Nombres enters · implementació i verificació · 7 de novembre de 2026

17 famílies accessibles a la pràctica ordinària: **8 N1, 5 N2 i 4 N3**. E07 i E08 recuperades; E10–E17 afegides. E09 reutilitza `MIFirstNumericTasks`, sense duplicar el generador.

El motor i la pantalla de resum són els compartits: guiada amb 10 encerts acumulats, autònoma amb 20 respostes, +1/−1 punt amb mínim zero, llindars 3/6 i 6/12. Es preserven l’historial per nivell, les claus matemàtiques, la rotació, els reintents limitats i les reserves deterministes del motor. L’esgotament finalitza amb missatge i resum, sense baixar de nivell.

La recta és SVG responsive amb marques equidistants, escala 1/2/5, sis referències numèriques i nom accessible. Les respostes compostes tenen camps etiquetats; el diagnòstic combina selector en català i resultat enter. Les alternatives es barregen i tenen una única correcta. El submarinista es genera sempre sota la superfície, incloent els estats intermedis. La validació estricta rebutja decimals, components sobrants, unitats diferents i text afegit; accepta signes tipogràfics i normalitza −0. No s’executa l’entrada de l’alumne.

Els generadors i identificadors heretats continuen als exàmens: 12 preguntes i quotes **6/3/3** per al tema; 20 preguntes al global amb les quotes anteriors. Les famílies noves no s’hi introdueixen. Els errors nous conserven la resposta estructurada i el fragment de teoria; els antics es mantenen sense regenerar la pregunta.

## Matriu de cobertura teòrica

Els 17 fragments s’han carregat al navegador i obert amb clics a l’índex. Cada secció conté procediment i exemple resolt, i cada família proporciona pistes i enllaç específic.

Família | Explicació suficient | Exemple resolt | Ancoratge | Enllaç verificat
--- | --- | --- | --- | ---
E01 | Sí | Sí | `#recta` | Sí
E02 | Sí | Sí | `#sumar` | Sí
E03 | Sí | Sí | `#restar` | Sí
E04 | Sí | Sí | `#multiplicar` | Sí
E05 | Sí | Sí | `#moviments` | Sí
E06 | Sí | Sí | `#problemes` | Sí
E07 | Sí | Sí | `#distancia-enters` | Sí
E08 | Sí | Sí | `#posicio-canvi` | Sí
E09 | Sí | Sí | `#moviments-limits` | Sí
E10 | Sí | Sí | `#valor-absolut` | Sí
E11 | Sí | Sí | `#oposat` | Sí
E12 | Sí | Sí | `#recta-graduada` | Sí
E13 | Sí | Sí | `#valor-inicial` | Sí
E14 | Sí | Sí | `#operacio-incompleta` | Sí
E15 | Sí | Sí | `#errors-signes` | Sí
E16 | Sí | Sí | `#simetria` | Sí
E17 | Sí | Sí | `#combinades` | Sí

## Proves

- `node scripts/comprova-enters-1eso.cjs`: casos matemàtics obligatoris, 2.550 generacions (150 per família), opcions úniques, validació estricta, trajectòries submergides, referència N3 de dues ordenacions, guiada 10/10 i 10/12, autònoma 20/20 i 0/20, llindars, rotació, reserves, historial, esgotament, sortida, registre/repàs, teoria i exàmens. També comprova els camps separats al banc i a l’examen, i el teclat.
- `node scripts/comprova-raonament-1eso-numeric.cjs`: 1.442 casos, 14 famílies de raonament.
- `node scripts/comprova-resultats-practica-1eso.cjs`: 6 temes i 12 modalitats.
- `node scripts/comprova-jerarquia-1eso.cjs`: catàleg, sessions i exàmens.
- `node scripts/comprova-divisibilitat-1eso.cjs`: catàleg, sessions, exàmens, banc, teclat i mòbil.
- `node scripts/comprova-mcd-mcm-1eso.cjs`: 12 famílies, teoria i exàmens.
- Revisió visual real de captures de 390 px: recta graduada, dos camps etiquetats i resum amb 10/12 i 83,3%. Captures locals a `../output/enters-2026-11-07/`.
- `git diff --check` i revisió del diff, limitat al tema i als punts d’integració compartits.

No s’han instal·lat dependències ni modificat Nombres decimals, els continguts dels temes 01–07 o les fitxes Word/PDF. Les proves són locals; no es presenta la propagació de GitHub Pages com a verificada.

## Fitxers

- `assets/js/enters-1eso.js`: catàleg, generació, SVG i validació.
- `1eso/sentit-numeric.html`: integració adaptativa, controls, banc, exàmens i errors.
- `1eso/teoria/numeric/nombres-enters-1r-eso.html`: procediments i exemples.
- `assets/js/dificultat-mi.js`: classificació dels identificadors E01–E17, sense canviar les quotes.
- `assets/js/raonament-numeric-1eso.js`: reserva d’E09 recalculada amb les sis permutacions.
- `scripts/comprova-enters-1eso.cjs`: prova dirigida reproduïble.
- `docs/informe-enters-2026-11-07.md`: aquest informe.
