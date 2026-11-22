# Matriu provisional conjunta de variants mixtes · Mesura, 2n ESO

**Estat: auditoria documentada, no validació curricular ni publicació.** Matriu detallada: [MI_2ESO_mesura_matriu_nivells_variants_mixtes.json](MI_2ESO_mesura_matriu_nivells_variants_mixtes.json).

## Els 3 tipus mixtos i les 6 variants

| Tipus | Variant | Nivell de treball | Estat del codi |
|---|---|---|---|
| Unitats 6 | Directa | N1 | N1 base a la branca d'auditoria |
| Unitats 6 | Encadenada | N2 | Proposta a **PR #53**, encara no fusionada |
| Pitàgores 15 | Catet desconegut | N1 | N1 base a la branca d'auditoria |
| Pitàgores 15 | Diagonal | N2 | Variant revisada al classificador de la branca d'auditoria |
| Superfícies 17 | Bases iguals (`sameBase`) | N1 | Variant revisada al classificador de la branca d'auditoria |
| Superfícies 17 | Bases diferents (`other`) | N2 | N2 base a la branca d'auditoria |

## Evidències ja recollides

- **Unitats 6:** equivalències directes dm³↔L / cm³↔mL comparades amb conversions que requereixen un canvi addicional (m³↔L, L↔cm³). La distinció N1/N2 d'aquesta segona branca pertany a la proposta d'integració PR #53.
- **Pitàgores 15:** verificades dues branques amb exercicis reals al workflow #44046115207. Diagonal 8×15 cm = 17 cm; catet quan la hipotenusa és 29 cm i un altre catet és 20 cm = 21 cm.
- **Superfícies 17:** quatre fixtures amb oracles de volum i classificador real al workflow #44046713429, inclosa la detecció retrospectiva sense metadades de variant. Bases iguals N1; bases diferents N2.
- **Coherència documental i de codi:** el validador `scripts/test-mesura-2eso-matriu-variants-mixtes.cjs` ha superat el workflow #44047392709. Comprova 3 tipus, 6 variants, els nivells del registre de traçabilitat i que la PR #49 no afirma que la proposta N2 d'Unitats ja estigui integrada.

## Límits

Les sis variants són **anotacions de només tres tipus de generador**, no sis famílies independents. El catàleg conserva els 128 tipus. Cap d'aquestes sis branques no acredita N3 i no se n'ha elevat cap per assolir quotes.

La matriu no substitueix la validació curricular, la revisió de dificultat amb alumnat ni les proves de modes guiat, autònom i examen. La distinció Pitàgores catet N1/diagonal N2 és l'estat de treball del classificador, no un judici curricular definitiu.

## Proper pas

Integrar aquesta matriu com a **font de revisió** amb les 85 agrupacions hipotètiques del catàleg, sense confondre subgrups i famílies genuïnes, i confeccionar un informe de mancances per tema i nivell. No modificar `families-validades.json`, ni els generadors, ni els nivells publicats sense una decisió explícita.

**No autoritza fusió de PR ni publicació.**
