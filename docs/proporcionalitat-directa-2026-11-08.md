# Proporcionalitat directa — validació del 8 de novembre de 2026

Base preservada: `15c2a8edbcd6f784dad6b27c82d6a3fc639ea9c1`, posterior al commit auditat.

Onze famílies accessibles en pràctica adaptativa: N1 (P01, P03, P06), N2 (P02, P04, P07, P11), N3 (P05, P08, P09, P10). Es conserven els generadors històrics i les seves variants i nivells per als exàmens. Les sis famílies noves entren exclusivament al catàleg adaptatiu.

S’ha eliminat l’opció parcialment certa de les taules al generador d’origen. P01 explicita la tarifa; P11 diferencia dades insuficients de no proporcionalitat amb dos models compatibles. Les respostes adaptatives usen models serialitzables, coincidència categòrica exacta, selectors i camps numèrics amb unitats visibles. P07 compara preus unitaris en cèntims i inclou A, B i empat.

P05 reutilitza el generador del mòdul de raonament. La correcció enumera totes les combinacions admissibles amb hores enteres i límits petits. La teoria resol el cas de 30 €: A màxim 4 h, B màxim 2 h; màxim 68 peces amb 4 h A i 1 h B, cost 29 €. La taula mostra també les combinacions descartades.

Es reutilitzen els comptadors, llindars, bossa de famílies, historial per nivell, límit d’intents i reserves deterministes del motor compartit. Les claus depenen de la família i les dades matemàtiques. Les correccions, els errors guardats, el banc i els exàmens propaguen els ancoratges; els errors antics mantenen la pregunta original i disposen d’un enllaç general.

| Família | Nivell principal | Teoria suficient | Exemple resolt | Enllaç funcional | Estat |
|---|---|---|---|---|---|
| P01 | N1 | Sí | Sí | #proporcionalitat | Verificada |
| P02 | N2; variants històriques N1 | Sí | Sí | #unitari | Verificada |
| P03 | N1 | Sí | Sí | #constant | Verificada |
| P04 | N2 | Sí | Sí | #factor-i-taules | Verificada |
| P05 | N3 | Sí | Sí | #produccio-pressupost | Verificada |
| P06 | N1 | Sí | Sí | #significat-constant | Verificada |
| P07 | N2 | Sí | Sí | #comparar-preus | Verificada |
| P08 | N3 | Sí | Sí | #taula-erronia | Verificada |
| P09 | N3 | Sí | Sí | #reconstruir-taula | Verificada |
| P10 | N3 | Sí | Sí | #error-additiu | Verificada |
| P11 | N2 | Sí | Sí | #dades-suficients | Verificada |

Proves automatitzades: `node scripts/comprova-proporcionalitat-1eso.cjs`, `node --check` dels dos mòduls modificats i `git diff --check`.

La prova dirigida genera 60 mostres per variant, valida nivells, quatre opcions diferents, resposta canònica i rebuig de dades sobrants; contrasta P05 amb enumeració independent. Verifica sessions 10/10, 10/14 (71,4%), 20/20 i 0/20 (0%), absència de repeticions de clau, reserves forçades, transicions de nivell, sortida, doble enviament, errors nous i antics, banc, propagació al seu embolcall d’examen, examen de tema (12) i global (20), i obertura/resum dels deu temes anteriors. Verifica existència dels onze ancoratges i absència de desbordament horitzontal en mòbil.

Comprovació visual real: captures de la pràctica amb selector, taula P04 i taula completa de pressupost en mòbil (390 × 844); inspecció de llegibilitat i espaiat. Les captures són a `../output/proporcionalitat-*.png`, fora del commit.

Fitxers d’implementació: `1eso/sentit-numeric.html`, `1eso/teoria/numeric/proporcionalitat-directa-1r-eso.html`, `assets/js/proporcionalitat-1eso.js`, `assets/js/raonament-numeric-1eso.js`, `assets/js/examen-tema.js`. Prova: `scripts/comprova-proporcionalitat-1eso.cjs`.

No s’han canviat les quotes globals ni els generadors de Fraccions, Percentatges o els temes 01–10. No s’han instal·lat dependències ni generat fitxes Word/PDF.
