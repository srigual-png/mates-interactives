# Consolidació provisional · Pitàgores i Perímetres i àrees (2n ESO)

**Estat: PROVISIONAL.** Matrius completes: [Pitàgores, 16 tipus](MI_2ESO_mesura_pitagores_decisions_16_tipus.json) i [Perímetres i àrees, 18 tipus](MI_2ESO_mesura_perimetres_decisions_18_tipus.json). A partir dels dos [informes originals](MI_2ESO_mesura_inventari_inicial.md), del [registre mestre 128/128](MI_2ESO_mesura_tracabilitat_128_tipus.json) i de la [revisió transversal](MI_2ESO_mesura_revisio_transversal.md). **La classificació de decisions no és una aprovació de famílies matemàtiques genuïnes.**

## 34 decisions individuals, per tipologia

| Decisió provisional | Pitàgores | Perímetres | Interpretació |
|---|---:|---:|---|
| Nucli matemàtic compartit | 6 | 7 | Repetició del procediment en un altre tipus o tema |
| Variant contextual o conceptual | 1 | 5 | Distingir si canvia l'exigència, no només el dibuix |
| Problema compost candidat | 4 | 3 | Combina passos que poden justificar un procés diferenciat |
| Identitat per contrastar | 4 | 3 | No declarar independent sense revisió |
| Tipus amb variants internes | 1 | 0 | El mateix generador té branques diferents |
| **Total** | **16** | **18** | **34**, una decisió per tipus |

Són **34 tipus classificats**, no 34 famílies.

## Teorema de Pitàgores: decisions importants

- **P02** agrupa hipotenuses directes i contextuals. Triangle explícit (`pitagores:2`) és N1, mentre una diagonal, rampa, cable o escala que exigeix identificar el triangle pot ser N2. Les descripcions canvien, però no el càlcul `√(a²+b²)`.
- **`pitagores:4` i `pitagores:13`** són diagonals de rectangles en contextos diferents; `problemes:6` recupera el mateix nucli. **`pitagores:6` i `problemes:7`** són l'escala recolzada.
- **`pitagores:5`** (diagonal de quadrat) és N1 al mapa actual, però si no es dona la relació `d=c√2` pot requerir modelització. **Mantenir decisió oberta**, no reclassificar per intuïció.
- **`pitagores:15` és mixt:** la variant `diagonal` pertany al nucli de la hipotenusa i és N2; la variant `catet` pertany al nucli d'inversió i és N1. El registre de 128 tipus compta només *un* tipus; el registre de variants ja les diferencia. No fusionar amb una única família final sense registrar aquesta bifurcació.
- **Compostos N2 candidats:** `pitagores:10` (altura de triangle isòsceles i àrea), `11` (catet i perímetre), `12` (diagonal i estalvi de recorregut) i `14` (hipotenusa i marge de cable). **No N3 automàtic**: poden acabar sent variants de transferència N2.
- **Diagnòstic `pitagores:16`:** error de sumar catets, amb resposta entre alternatives explícites. El fet que `perimetres:18` també pregunti per un error no implica que siguin la mateixa família.
- **`pitagores:9`:** comprovar Pitàgores i condició geomètrica en els casos amb hipotenusa alterada; és un risc de prova, no una fallada demostrada de totes les instàncies.

## Perímetres i àrees: decisions importants

- **PA01 (`1,2,3`)** agrupa l'aplicació de fórmules d'àrea de paral·lelogram, rombe i trapezi. Cal decidir si seleccionar fórmules realment diferents justifica família pròpia; el canvi de polígon per si sol no ho garanteix.
- **PA04 (`6,7`)**: àrea de cercle i meitat d'àrea per semicercle. Hi ha un nucli compartit amb una variant geomètrica, no dos problemes completament nous.
- **PA05 (`8`)**: semicercle, perímetre = arc + diàmetre. Es diferencia del càlcul d'una circumferència completa perquè exigeix reconstruir tot el contorn.
- **PA06 (`9,11,16`)**: àrea exterior menys buits. `problemes:11` ha de reconstruir dimensions exteriors abans de restar; `problemes:1` incorpora rendiment i arrodoniment de pots. No comptar repetidament la resta d'àrees.
- **PA07 (`10`)**: sumar rectangle i semicercle a partir d'un diàmetre; compost candidat, no simple àrea d'un cercle.
- **PA08 (`12,13`) i PA09 (`14`)**: fórmules inverses. N1 defensable en casos directes; el trapezi pot exigir agrupar dues bases. No convertir inversió algebraica en N3 per quota.
- **PA10 (`15`)**: l'apotema *ja és una dada de l'enunciat*. No atribuir a l'alumne trigonometria que només apareix internament en el generador.
- **PA11 (`17`)** coincideix en la corona circular amb `problemes:12`; primer cal trobar radi exterior `r+w`.
- **PA12 (`18`)** és diagnòstic entre longitud i àrea de circumferència; distractors simples, no equival a una tasca de justificació oberta N3.

## Exemples contrastius construïts a partir dels procediments

*Aquests exemples són resolucions matemàtiques elaborades per l'auditoria, no sortides enregistrades del navegador.*

| Comparació | Exemples | Per què és important |
|---|---|---|
| Pitàgores explícit / contextual | Catets 3 i 4 → **5**; escala recolzada a 3 m d'una paret i que arriba a 4 m → **5 m** | Mateixa arrel quadrada, però en el segon cas cal modelitzar la situació |
| Hipotenusa directa / àrea isòsceles | Catets 5 i 12 → **13**; isòsceles de base 10 i laterals 13 → altura 12, àrea **60 cm²** | El segon combina Pitàgores invers i superfície |
| Àrea de cercle / corona | Cercle radi 4 → **50,24 cm²**; cercle interior radi 3 m i camí 1 m → `3,14·(4²−3²)` = **21,98 m²** | La corona requereix reconstruir radi exterior i restar àrees |
| Perímetre de semicercle / longitud de circumferència | Radi 2 → circumferència completa **12,56 cm**; semicercle: `3,14·2+4` = **10,28 cm** | No s'ha d'oblidar el diàmetre |
| Àrea directa / amb apotema | Paral·lelogram base 8 i altura 5 → **40 cm²**; hexàgon regular costat 4, apotema donada 3,46 → `24·3,46/2` = **41,52 cm²** | En el segon cas cal obtenir perímetre; no es calcula l'apotema |

## Estat de verificació i passos pendents

- **Completat:** dues matrius tipus a tipus 16+18, vinculades a les agrupacions originals Pxx/PAxx, amb relacions a altres tipus i decisions justificades; nou test estructural `node scripts/test-mesura-2eso-decisions-pitagores-perimetres.cjs`.
- **Pendent:** proves amb oracles de totes les instàncies possibles de cada generador, mostra real de dues instàncies per família, examen i fitxes, navegació de modes, contrast curricular i revisió humana abans de qualsevol declaració de família validada.
- **No modificat:** `2eso/sentit-mesura.html`, `assets/js/dificultat-mi.js`, `docs/auditoria/families-validades.json`. Les correccions funcionals es concentren en la PR #53; aquesta PR #49 continua essent documental.

**Propera passada:** decisions de `superficies` (20 tipus) i `estimacio` (18), completant les 128 entrades de consolidació provisional. Després, procediment transversal canònic per cada tipus i contrast pedagògic final.
