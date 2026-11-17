# Contrast transversal dels cinc temes restants · Sentit de la mesura (2n ESO)

**Estat: PROVISIONAL.** Matriu: [MI_2ESO_mesura_cinc_temes_contrast_transversal.json](MI_2ESO_mesura_cinc_temes_contrast_transversal.json). Cap canvi als generadors, als nivells publicats ni a `families-validades.json`.

## Abast

Comparació dirigida dels **92 tipus** inventariats en Pitàgores (16), Perímetres (18), Superfícies (20), Estimació (18) i Problemes (20). S'han registrat **28 relacions explícites** amb justificació, no 28 famílies noves ni un contrast exhaustiu de totes les parelles possibles. La validació estructural confirma els identificadors, la unicitat de les parelles i la cobertura dels cinc temes.

## Solapaments de procediment a comprovar amb dos casos reals

- **Diagonals i hipotenuses:** `pitagores:4/13` i `problemes:6` comparteixen el nucli. `pitagores:6` i `problemes:7` modelitzen l'escala recolzada.
- **Corona circular:** `perimetres:17` i `problemes:12` calculen una corona amb radi exterior obtingut de l'amplada.
- **Cilindres:** `superficies:7` i `problemes:4` comparteixen volum cilíndric; `superficies:12` i `problemes:20` inverteixen la fórmula per obtenir l'altura. La superfície lateral amb diàmetre (`problemes:5`) necessita contrast addicional amb `superficies:8`.
- **Estimació:** `estimacio:1` i `problemes:17` comparteixen la valoració de magnitud plausible. La variant de volum/capacitat (`estimacio:3`) encara s'ha de revisar.
- **Errors relatius:** `estimacio:9` compara dues referències distintes, mentre que `problemes:16` fa servir una referència comuna. Mateix nucli de càlcul, no necessàriament mateixa càrrega cognitiva.

## No fusionar només perquè hi hagi un subpas igual

- `perimetres:16` i `problemes:1`: l'àrea útil és un component; rendiment de pintura i arrodoniment són operacions addicionals.
- `superficies:1` i `problemes:3`: el volum de l'ortoedre és un component abans de convertir a litres i aplicar percentatge d'ompliment.
- `superficies:2/16` i `problemes:13`: caixa tancada vs oberta, amb diferències en les cares incloses.
- `pitagores:10` i `perimetres:1`: l'àrea és el pas posterior a obtenir l'altura amb Pitàgores.
- Els diagnòstics de Pitàgores, circumferència/àrea i superfície/volum no són la mateixa família pel sol fet de compartir format d'error.

## Decisions pendents abans d'un catàleg canònic

1. Comparar dos exemples generats per cada relació prioritària, incloent-hi variants que puguin modificar el nivell.
2. Consolidar amb els 18 nuclis locals d'Unitats i Escales, evitant duplicats entre els set temes.
3. Quantificar **famílies matemàtiques genuïnes per tema i nivell**, sense convertir automàticament cada context o composició en família nova.
4. Si no s'arriba al mínim de 15 famílies amb N1≥5, N2≥5 i N3≥3, documentar la mancança curricular i proposar generadors realment nous. No elevar tipus a N3 per quota.
5. Validar posteriorment currículum, modes guiat/autònom, examen i fitxes abans de qualsevol aprovació de famílies.

**Aquesta etapa és un mapa de coincidències provisional, no una autorització de fusió o publicació.**
