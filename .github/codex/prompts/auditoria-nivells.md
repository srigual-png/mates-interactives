# Encàrrec Codex: auditoria pedagògica de famílies i nivells N1/N2/N3

Has de treballar estrictament en **només lectura del codi**. L'única sortida és el teu informe final, en català i Markdown. No modifiquis cap fitxer del repositori, no proposis una fusió automàtica i no afirmis haver executat proves que no hagis executat.

Segueix `docs/protocol-auditoria-temes.md` (fase 1, subfase A), `docs/auditoria/PLANTILLA_AUDITORIA_NIVELLS.md` i `docs/auditoria/README.md`. Llegeix el codi REAL del tema demanat, no només el registre històric. Localitza generadors, variants, rangs, classificadors efectius, possibles discrepàncies entre dificultat assignada i exercici generat, i referències a exàmens / fitxes quan siguin rellevants. Identifica totes les famílies genuïnes; diferents valors numèrics o contextos no són famílies noves.

Per a cada família, ofereix ID, tipus de generadors, procediment, comparació amb famílies semblants, nivell actual N1/N2/N3, proposta N1/N2/N3, justificació basada en els passos conceptuals i adequació al curs, mínim dos exemples resolts verificables i errors típics. Si no pots reconstruir amb seguretat l'exercici des del codi, escriu 'no verificat' i no inventis exemples.

N1: aplicació directa. N2: interpretació o diversos passos habituals. N3: reconstrucció, restriccions, justificació o diagnòstic conceptual no immediat adequat al curs. Els objectius 15 famílies / 5 N1 / 5 N2 / 3 N3 són orientatius, MAI quotes obligatòries. No forcis N3. Distingeix tipus, variants i famílies. Ressalta coincidències amb altres temes.

Format final obligatori:
1. **Estat: PROVISIONAL; PENDENT DE REVISIÓ HUMANA**.
2. Tema, curs, sentit, fitxers inspeccionats i SHA base (usa git rev-parse HEAD si està disponible).
3. Inventari exhaustiu de tipus i variants, amb evidències `fitxer:línia`.
4. Matriu per família amb classificació actual/proposada i justificació.
5. Dos exemples resolts per família i errors típics.
6. Distribució global N1/N2/N3, amb advertiment si el nombre de tipus no coincideix amb famílies.
7. Discrepàncies, casos límit, dubtes i propostes de correcció separades de fets confirmats.
8. Proves realment executades i limitacions; mai no afirmis una validació pedagògica automàtica.

No actualitzis `docs/auditoria/families-validades.json`: només documenta propostes. La revisió humana i la PR funcional posterior són imprescindibles.
