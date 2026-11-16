# Registre de famílies matemàtiques — Fase A

**Propòsit:** no repetir l'auditoria pedagògica dels 230 temes. Les decisions definitives sobre famílies matemàtiques, variants i dificultats es conserven al control de versions, juntament amb el commit en què es van validar.

## Fitxers

- `docs/auditoria/families-validades.json`: **font de veritat pedagògica**. Una entrada per tema VALIDAT, amb famílies reals (identificador estable, objectiu, N1/N2/N3, generadors), variants excloses del recompte, PR, commit fusionat, data i proves.
- `docs/auditoria/inventari-fase-a.csv`: **exportació derivada**, separada per punts i coma, UTF-8 amb BOM; es pot obrir directament amb Excel. No l'editeu a mà.
- `scripts/exporta-inventari-fase-a.cjs`: valida l'estructura i regenera el CSV.

## Procés de tancament d'un tema

1. **Auditoria i implementació:** Codex investiga, reclassifica i comprova el tema en una branca/PR. Les dades són PROVISIONALS mentre la PR estigui oberta.
2. **Revisió humana i merge:** quan s'han validat els exercicis, es fusiona la PR del tema a `main` i es verifica la publicació.
3. **Registre definitiu:** en una PR de documentació (o una continuació explícita del procés), Codex afegeix/actualitza **només llavors** el tema dins `families-validades.json`, amb el SHA real del merge i l'evidència de les proves.
4. Regenera l'exportació: `node scripts/exporta-inventari-fase-a.cjs`.
5. Verifica `node scripts/exporta-inventari-fase-a.cjs --check` i inclou **JSON i CSV en la mateixa PR**.
6. Conserva les decisions anteriors; si un tema validat canvia de classificació, documenta el motiu i un nou commit de validació. No substitueixis dades auditades per recomptes mecànics dels generadors.

**Regla clau:** una família matemàtica pot tenir diversos generadors; cap recompte de tipus o de variants equival automàticament a famílies genuïnes. El registre conté només temes fusionats/validats. Els altres temes poden continuar al fitxer Excel global amb estat *provisional*; això no els converteix en validats.

**Important:** el codi de pràctica i el mapa de dificultat continuen determinant el comportament de la web; aquest JSON és el registre històric pedagògic. En tancar el tema, s'ha de verificar que ambdues fonts coincideixen. Si divergeixen, no doneu el tema per tancat.

## Nombres naturals

La PR #6, fusionada com a `7794721ec05aa51ce1ec42e0c0079b04f2fc2e82`, queda registrada amb **11 famílies: 4 N1, 5 N2 i 2 N3**. Els patrons numèrics són una variant vinculada al sentit algebraic, sense sumar al recompte de Naturals. La prova local Edge continua documentada com a pendent, sense esborrar les altres validacions.

## Auditories provisionals de dificultat N1/N2/N3 (PR #47)

Per a nous temes, utilitzeu [PLANTILLA_AUDITORIA_NIVELLS.md](PLANTILLA_AUDITORIA_NIVELLS.md) per documentar l'inventari de tipus i variants, les famílies genuïnes, el nivell actual versus el proposat, els exemples resolts i les discrepàncies pedagògiques. El model estructurat és [plantilla-proposta-nivells.json](plantilla-proposta-nivells.json), **exclusivament sintètic**: no és un tema real ni una decisió validada.

La comprovació estructural automatitzada és:

```sh
node scripts/comprova-proposta-auditoria.cjs --self-test
node scripts/comprova-proposta-auditoria.cjs docs/auditoria/plantilla-proposta-nivells.json
node scripts/comprova-proposta-auditoria.cjs docs/auditoria/propostes/nom-del-tema.json
```

GitHub Actions revisa propostes a `docs/auditoria/propostes/*.json`. La comprovació exigeix un inventari de tipus cobert una sola vegada, motius de classificació i exemples resolts; **no avalua la correcció pedagògica del nivell** ni comprova automàticament la cobertura real de generadors dins l'HTML. L'auditoria la fa Codex sobre el codi real seguint el protocol, després es revisa humanament, i una PR funcional separada aplica els canvis. El registre definitiu `families-validades.json` **només** s'actualitza després de la fusió de la PR d'implementació validada.

Aquesta eina **no executa Codex automàticament** i no crea una nova auditoria sense un encàrrec explícit. Els objectius de 15 famílies o de 3 N3 no són quotes obligatòries.
