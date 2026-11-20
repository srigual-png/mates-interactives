# Consolidació provisional · Superfícies i volums + Estimació, precisió i error

**Estat: PROVISIONAL; sense validació pedagògica final.** Aquest lot cobreix els darrers **38 tipus**, i completa la primera matriu individual de decisions per als **128 tipus** dels set temes ordinaris de Sentit de la mesura de 2n ESO.

Fonts: [auditoria de Superfícies](MI_2ESO_mesura_superficies_auditoria_provisional.md), [auditoria d'Estimació](MI_2ESO_mesura_estimacio_auditoria_provisional.md), [matriu de 128 tipus](MI_2ESO_mesura_tracabilitat_128_tipus.json), [revisió transversal](MI_2ESO_mesura_revisio_transversal.md). Matrius noves: [20 decisions de Superfícies](MI_2ESO_mesura_superficies_decisions_20_tipus.json) i [18 decisions d'Estimació](MI_2ESO_mesura_estimacio_decisions_18_tipus.json).

## Criteris de treball per als 38 tipus

| Categoria provisional | Superfícies (20) | Estimació (18) |
|---|---:|---:|
| Nucli compartit | 7 | 7 |
| Variant contextual, representativa o de dificultat | 7 | 6 |
| Compost candidat | 4 | 2 |
| Identitat per determinar | 1 | 3 |
| Tipus mixt amb variants internes | 1 | 0 |
| **Total** | **20** | **18** |

**No són recomptes de famílies genuïnes.** Les etiquetes serveixen per decidir què fusionar i què ha de continuar com a procediment diferenciat.

## Superfícies i volums — decisions principals

- **Volum de prisma:** els tipus 1, 3 i 5 comparteixen `V=Ab·h`; el prisma triangular (4) calcula **primer** l'àrea de la base. No multiplicar famílies pels contextos d'ortoedre i cub.
- **Volum de cilindre:** el tipus 7 coincideix amb `problemes:4` en `πr²h`, amb equivalència immediata `dm³=L` quan les dimensions són decímetres. La correcció funcional N1 del segon figura a les PR #52/#53.
- **Cares de capses:** els tipus 2, 6 i 16 reutilitzen recompte de superfícies. El tipus 20 pregunta pel recompte/agrupació de cares i no simplement per l'àrea total; `problemes:13` és una capsa **sense tapa** i no té les mateixes sis cares.
- **Cilindre lateral:** tipus 8 calcula `2πrh`, tipus 19 identifica el rectangle desplegat i `problemes:5` presenta una etiqueta amb diàmetre donat. Matemàtica compartida, però demandes distintes que **no justifiquen igual nivell automàtic**.
- **Superfície total de cilindre (9):** cal sumar lateral i dues bases; compost candidat N2, no un simple càlcul lateral.
- **Volums inversos:** tipus 10 i 11 recuperen altura o àrea de la base amb una divisió. Tipus 12 i `problemes:20` aïllen altura cilíndrica amb factor `πr²`; tipus 15 afegeix conversió de litres a m³ i base rectangular.
- **Capacitat després de volum:** tipus 13 passa de m³ a litres; tipus 14 de dm³ a litres. La diferència de factor de conversió **pot alterar el nombre de passos**. Contrastar amb `unitats:6` i `problemes:4`.
- **Comparar caixes (17):** la variant `sameBase` permet comparar directament altures i és N1, mentre la resta exigeixen comparar dos volums i són N2. És un **únic tipus** amb dues variants importants, no dues entrades base.
- **Diagnòstic (18):** superfície vs volum és un error conceptual propi. No fusionar-lo amb `perimetres:18` pel simple format de pregunta.

## Estimació, precisió i error — decisions principals

- **Estimació contextual:** tipus 1–3 comparteixen ordre de magnitud, com `problemes:17`. Triar l'instrument (4) és una demanda diferenciada.
- **Arrodoniment:** tipus 5 i 16 apliquen una precisió exigida; el tipus 10 reconeix la tolerància de mig pas i el 12 construeix l'interval semiobert. Són demandes relacionades, **no necessàriament una sola família**.
- **Error absolut:** tipus 6 i 17 comparteixen `|aproximació−referència|`; el segon afegeix la selecció de menor error. El tipus 18 diagnostica sumar en lloc de restar, amb distractors explícits.
- **Error relatiu:** tipus 7, 8 i 13 comparteixen error absolut/referència; la diferència és decimal/percentatge i si l'error absolut està donat. El tipus 9 compara **dues referències** i exigeix dos quocients. A `problemes:16` la referència és **comuna**, de manera que es poden comparar directament els errors absoluts, i per això no es pot forçar igual dificultat.
- **Qualitat pendent:** tipus 11 pot admetre diverses precisions plausibles sense instrument; tipus 15 mostra una mitjana a centèsimes a partir de lectures a dècimes, fet que exigeix distingir resultat matemàtic i precisió instrumental.
- **Canvis funcionals fora d'aquesta auditoria:** la PR #50, integrada a #53, modifica els casos de varietat fixa d'Estimació 9/17 i explicita unitats al tipus 14. Els informes Fase A descriuen el **codi anterior** i no s'han d'interpretar com si les correccions encara no existissin.

## Exemples contrastius resolts

Exemples matemàtics **construïts a partir del procediment documentat**, no instàncies generades a la UI.

| Comparació | Exemple i resultat | Diferència matemàtica |
|---|---|---|
| Prisma directe i triangular | Ortoedre 4×3×2 cm: **24 cm³**; prisma triangular base 6, altura triangular 4, llargada 5: `(6·4/2)·5 = 60 cm³` | El segon construeix àrea abans de volum |
| Cilindre lateral i total | r=2, h=5: lateral `2·3,14·2·5=62,8 cm²`; tancat `62,8+2·3,14·4=87,92 cm²` | El segon incorpora dues bases |
| Invertir un volum | Prisma V=120 cm³ i Ab=20 cm² → **h=6 cm**; cilindre r=2 cm i V=62,8 cm³ → `62,8/(3,14·4)=5 cm` | Cal recuperar l'àrea circular en el segon |
| Error absolut vs relatiu | Referència 100, lectura 102: error absolut **2**, relatiu **2%**. Referència 10, lectura 10,5: error absolut **0,5**, relatiu **5%** | Comparar només errors absoluts seria incorrecte amb referències diferents |
| Arrodonir vs construir interval | 12,26 cm a dècimes → **12,3 cm**; lectura 12,3 cm a dècimes → compatible amb **[12,25; 12,35) cm** | La segona tasca reconstrueix un conjunt de valors |

## Estat, límits i pròxima etapa

- **Consolidació documental completa:** 20 Problemes + 18 Unitats + 18 Escales + 16 Pitàgores + 18 Perímetres + 20 Superfícies + 18 Estimació = **128 tipus amb decisions provisionals**, cadascun traçat al grup original.
- **Prova automatitzada estructural:** `node scripts/test-mesura-2eso-decisions-superficies-estimacio.cjs`, que comprova els 38 registres nous i verifica l'existència **exacta de 128 registres als 7 JSON**.
- **Encara no fet:** reduir de forma **transversal** tots els grups a famílies canòniques úniques; dos exemples **realment generats** per família; oracles exhaustius; modes guiat/autònom, examen, fitxes i contrast normatiu curricular. Ni els tests estructurals ni els workflows d'un altre sentit acrediten aquestes etapes.
- **No s'ha alterat:** codi dels generadors, mapes N1/N2/N3 o `families-validades.json`.

**Següent pas recomanat:** construir un catàleg canònic transversal que assigni cada tipus (i les seves variants mixtes) al procediment matemàtic real, amb fusions explícites, conflictes de nivell resolts amb criteri docent i proves abans de marcar cap família com a validada.
