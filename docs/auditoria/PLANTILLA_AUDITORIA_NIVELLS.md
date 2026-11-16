# Plantilla d'auditoria matemàtica N1/N2/N3 — Proposta provisional

> Copieu aquesta plantilla per a cada **tema o lot**. Una proposta no implica que la dificultat sigui correcta, que els generadors estiguin implementats ni que la PR s'hagi validat.

## Identificació i traçabilitat

- Curs / sentit / tema / `topic_id`:
- Branca i SHA de `main` inspeccionat (40 caràcters):
- Fitxers font de generadors, variants, classificador, exàmens i fitxes:
- Currículum i abast del tema:
- Tipus o variants inventariats, inclosos els que no surten a la pràctica habitual:
- Temes d'ampliació exclosos:

## Resultat de l'inventari

| Tipus/variant real | Procediment matemàtic | Família candidata | Nivell actual efectiu | Evidència al codi |
|---|---|---|---|---|
| | | | | |

No assimileu tipus de generador, canvis de nombres o contextos a famílies.

## Matriu de decisió pedagògica

| ID família | Procediment genuí / diferència amb altres | Tipus vinculats | Actual | Proposat | Decisió | Justificació N1/N2/N3 | Currículum |
|---|---|---|---|---|---|---|---|
| | | | | | mantenir / reclassificar / nova / fusionar | | |

Definicions:
- **N1:** reconeixement o aplicació directa.
- **N2:** interpretació, transferència, combinació de procediments o diversos passos.
- **N3:** reconstrucció, restriccions, justificació o diagnòstic matemàtic no immediat **dins del curs**.
- Ni el volum de càlcul, ni els nombres grans, ni el mode guiat/autònom no eleven per si mateixos el nivell.
- Els objectius orientatius 15 famílies / 5 N1 / 5 N2 / 3 N3 **no són quotes**. És vàlid tenir 0 N3.

Per a **cada família**, adjunteu com a mínim dos exercicis reals resolts pas a pas; expliqueu errors típics, variants, casos límit, i per què la família és genuïnament distinta.

## Discrepàncies i riscos

- Diferències entre classificació actual, fitxes, exàmens i nivell recomanat:
- Tipus sense família, famílies sense tipus i classificacions duplicades:
- Famílies compartides amb altres temes (justifiqueu coincidències):
- Cobertura que falta, proves insuficients o procediments fora del currículum:
- Casos dubtosos per a revisió humana:

## Evidència i decisió final

- **Estat: PROVISIONAL** fins a revisió pedagògica i PR d'implementació fusionada.
- Auditoria realitzada sobre SHA:
- Tests matemàtics independents executats (comandament i resultat), o **no executats**:
- Tests UI / fitxes executats, o **no executats**:
- Revisió pedagògica: pendent / validada; persona i justificació:
- PR d'implementació (si n'hi ha), SHA de merge (només després de fusionar):
- Registre de fase A: **no modificar** fins a completar validació i fusió.

## Fitxer estructurat opcional

Quan hi hagi proposta mecanitzable, empleneu `docs/auditoria/propostes/<identificador>.json` segons `docs/auditoria/plantilla-proposta-nivells.json`; després executeu:

```sh
node scripts/comprova-proposta-auditoria.cjs docs/auditoria/propostes/<identificador>.json
```

Aquest comprovador valida l'estructura, la traçabilitat 1:1 tipus→família i la justificació **present**; **no pot certificar que un N2 sigui pedagògicament correcte**.
