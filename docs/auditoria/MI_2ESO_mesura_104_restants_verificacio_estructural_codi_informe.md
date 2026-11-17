# Revisió estructural del codi dels 104 tipus restants · 2n ESO, Sentit de la mesura

**Abast:** segona passada de l'auditoria curricular, després de la inspecció anterior dels 24 casos prioritaris.

## Comprovació realitzada

He localitzat una per una les **104 branques** que quedaven per inspeccionar al fitxer `2eso/sentit-mesura.html`. Per a cadascuna he comprovat la presència dels cinc components bàsics:

- Enunciat de la pregunta (`question`)
- Construcció de resposta (`correct`)
- Alternatives (`options`)
- Guia de resolució (`guide`)
- Solució explicada (`solution`)

**Resultat estructural:** **104/104** branques presents i amb aquests cinc components. No he detectat absències d'aquests camps. Això no demostra que cada alternativa sigui correcta, que no hi hagi ambigüitats o que totes les combinacions de valors funcionin: **no s'han executat exhaustivament els oracles**.

Fitxer per tipus, amb expressions de mostra del codi i comprovacions: [MI_2ESO_mesura_104_restants_verificacio_estructural_codi.json](MI_2ESO_mesura_104_restants_verificacio_estructural_codi.json).

## Quatre condicionals de reintent identificats

| Tipus | Motiu del reintent al codi | Revisió posterior |
|---|---|---|
| `unitats:9` | Reintenta quan les dues longituds esdevenen iguals | Comprovar si la condició és realment possible amb els increments configurats |
| `escales:15` | Reintenta si el denominador d'escala no és enter o és inferior a 10 | Mesurar taxa de reintents i garantir terminació |
| `escales:18` | Reintenta si el resultat de longitud d'ombra no surt amb una sola decimal | Comprovar taxa de reintents i terminació |
| `estimacio:17` | Reintenta si les dues aproximacions tenen el mateix error absolut | Comprovar si el cas és assolible amb les desviacions disponibles |

La presència de reintents **no és un error confirmat**. Dos podrien ser simplement defenses redundants, ja que els valors d'entrada semblen impedir la igualtat; caldria provar-ho de manera determinista abans de declarar-los inútils.

## Integració amb la fase anterior

La revisió anterior de **24 tipus prioritaris** ja havia identificat una **ambigüitat real a `estimacio:11`**: opcions com 1,5 L i 1,51 L poden ser igualment raonables segons la precisió instrumental no especificada. Aquesta incidència **continua pendent**, sense corregir.

En total tenim:

| Cobertura | Registres |
|---|---:|
| Tipus prioritaris inspeccionats en detall | 24 |
| Tipus restants amb integritat estructural de codi comprovada | 104 |
| **Tipus localitzats i coberts documentalment** | **128** |
| Oracles matemàtics de totes les combinacions executats exhaustivament | **No** |

## Pas següent

Cal una bateria de proves de generació i oracle sobre les **128 branques**, amb especial atenció a la unicitat de la resposta correcta, els arrodoniments, les unitats i els quatre reintents. Els casos sense cap incidència en aquesta fase **encara no** són «validats matemàticament».

No s'han modificat generadors, nivells oficials, famílies, estat de fusió de PR ni web publicada. El criteri 5–5–3 continua sent orientatiu; la prioritat és una pràctica adequada a **2n ESO**.
