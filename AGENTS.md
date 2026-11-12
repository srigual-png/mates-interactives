# Instruccions per als agents — Mates Interactives

Aquest repositori conté exercicis interactius i teoria de matemàtiques de l'ESO.

## Protocol obligatori de referència

**Llegiu primer [docs/protocol-auditoria-temes.md](docs/protocol-auditoria-temes.md)** abans d'auditar, ampliar o modificar substancialment un tema. Inclou les vuit fases, criteris pedagògics, entregables i comprovacions.

- **Objectius orientatius (protocol v1.3):** per a tots els cursos (1r–4t ESO), cinc sentits i ampliacions, aspirar a **15 famílies matemàtiques reals**, amb **5 N1**, **5 N2** i **3 N3**, però **no són mínims obligatoris**. Sempre preval l'adequació al curs; no inventar procediments ni forçar N3 per assolir xifres. Es pot tancar justificadament un tema amb menys famílies.
- **Família ≠ generador:** no recompteu variants o contextos cosmètics com a famílies noves. La dificultat és matemàtica; guiat/autònom només indica el suport.
- **Subfase A actual:** revisar només famílies matemàtiques i nivells actuals/recomanats amb exemples i adequació al curs. No tocar teoria, format visual ni progressió fins a la fase corresponent.
- **Canvis de tema complets:** seguiu el protocol; primer inventari i auditoria, després especificació, implementació i validació, segons l'encàrrec.
- **Correccions puntuals:** feu un canvi mínim i les comprovacions pertinents. No reconstruïu pàgines, generadors ni progressió sense que es demani.
- **Auditories de només lectura:** no feu commits ni altereu el codi. Si s'ha demanat auditoria, lliureu els tres fitxers i ZIP descrits al protocol.
- **Font de veritat:** reviseu el codi real a `main`, en especial el fitxer del curs/sentit realment auditat i `assets/js/dificultat-mi.js`; no doneu per bons els mapes duplicats ni les suposicions de converses passades.
- **Teoria:** conserveu els enllaços contextuals i IDs; teoria essencial visible i ajuda de procediments desplegable. Proveu obertura per URL amb `#ancora` i `hashchange`.
- **Qualitat:** no doneu per fet que una publicació a GitHub ja apareix a GitHub Pages; verifiqueu i distingiu els punts pendents.

No pressuposeu que una distribució pedagògica proposada s'ha implementat: cal contrastar-la amb els generadors, la selecció de la pràctica i els exàmens actuals.

## Registre obligatori de famílies validades (Fase A)

- Abans de donar un tema per finalitzat, llegiu `docs/auditoria/README.md`.
- Les decisions pedagògiques definitives de famílies reals, generadors i N1/N2/N3 es conserven a `docs/auditoria/families-validades.json`. **No s'han de tornar a auditar des de zero** només perquè es reprengui el projecte.
- **Només després de fusionar i validar** la PR funcional d'un tema, afegiu-ne l'entrada amb el SHA real del merge, la PR, els nivells i les proves. Una PR oberta continua provisional.
- Executeu `node scripts/exporta-inventari-fase-a.cjs` per regenerar el CSV obriu amb Excel; comproveu `node scripts/exporta-inventari-fase-a.cjs --check` abans del commit. Feu commit conjunt del JSON i del CSV.
- Una variant de generador no és una família; no inferiu els recomptes definitius directament de `dificultat-mi.js`. Compareu-los amb el codi funcional real.
