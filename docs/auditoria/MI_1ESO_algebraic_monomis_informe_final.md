# Sentit algebraic · Expressions: termes i coeficients · 1r ESO

## Inventari i agrupació

`genMonomis()` té quatre tipus: identificar coeficient (1), terme independent (2), identificar termes i signes (3) i reconèixer termes semblants (4). M1, M2 i M5 del banc obert cobreixen aquests mateixos procediments. M3 i M4 són reduccions de termes semblants, així que pertanyen a `simplificacio` i no es compten de nou a `monomis`. M6 és substitució i avaluació, procediment compartit amb Traducció. No s’hi incorporen grau, producte de monomis ni potències literals de l’ampliació de 2n.

| ID estable | Família definitiva | Nivell anterior dels generadors | Nivell final | Generadors i variants | Justificació |
|---|---|---|---|---|---|
| `identificar-coeficient-amb-signe` | Identificar el coeficient d’un terme, inclosos els signes implícits | tipus 1/M1: N1 | N1 | `monomis:1`, M1; variants `x`, `−x`, `0x`, `−3x` i coeficients positius | Lectura directa del factor numèric i el signe; 1 i −1 són implícits. |
| `identificar-terme-independent-amb-signe` | Identificar el terme independent i conservar-ne el signe | tipus 2/M2: N1 | N1 | `monomis:2`, M2; coeficient i constant poden ser positius o negatius | Localitzar el terme sense variable i mantenir el signe. |
| `identificar-termes-i-signes` | Identificar els termes d’una expressió i els signes que els acompanyen | tipus 3/M5: N1 | N1 | `monomis:3`, M5; suma o resta de termes amb `x` | Separa termes i signes sense reduir-los. El tipus 3 deixa de demanar una simplificació que correspon a l’altre tema. |
| `reconeixer-termes-semblants` | Reconèixer si dos termes tenen la mateixa part literal | tipus 4: N1 | N1 | `monomis:4`; constants i termes amb variable | Compara parts literals; els coeficients poden diferir. No es demana operar. |
| `avaluar-expressio-per-substitucio` | Substituir valors de variables i calcular una expressió | M6: N2; tipus 4/5 de Traducció: N1 | N1 | M6 compartit amb `traduccio:4/5`, T5 | M6 és una substitució lineal d’un sol valor i passa a N1, concordant amb el mateix procediment de Traducció. |

Distribució local: **5 famílies: 5 N1, 0 N2, 0 N3**. IDs únics d’aquest tema: 4; l’avaluació reutilitza l’ID `avaluar-expressio-per-substitucio` ja comptat a Traducció.

## Tres exemples per família

| Família / nivell | Enunciat → resolució |
|---|---|
| Coeficient i signe · N1 | Coeficient de `x` → `1`. |
|  | Coeficient de `−x` → `−1`. |
|  | Coeficient de `−3x` → `−3`; de `0x` → `0`. |
| Terme independent · N1 | `2x + 5` → terme independent `5`. |
|  | `−4x − 7` → `−7`. |
|  | `−3x + 8` → `8`. |
| Terme i signe · N1 | `6x + 3x` → termes `6x` i `+3x`. |
|  | `8x − 5x` → termes `8x` i `−5x`. |
|  | `2x − 7x` → termes `2x` i `−7x`. |
| Termes semblants · N1 | `3x` i `−5x` → sí, mateixa part literal `x`. |
|  | `4x` i `4` → no, una part literal és `x` i l’altra és constant. |
|  | `x` i `9x` → sí, coeficient implícit de `x` igual a 1. |
| Substitució · N1 | `x=3`, `4x+2` → `4·3+2=14`. |
|  | `x=2`, `3x+5` → `6+5=11`. |
|  | `x=7`, `2x+1` → `14+1=15`. |

## Cobertura de teoria i errors freqüents

| Família | Apartat / ajuda de teoria | Exemple resolt | Error freqüent |
|---|---|---|---|
| Coeficient | `#coeficient` | `−x` té coeficient `−1` | Ometre el signe o respondre `1` davant de `−x`. |
| Terme independent | `#independent` | `−4x − 7` té constant `−7` | Respondre `7` i perdre el signe. |
| Termes i signes | `#termes` | Separar cada terme i conservar el signe | Tractar el signe menys com si no pertanyés al terme següent. |
| Termes semblants | `#semblants` | `3x` i `−2x` són semblants | Exigir que els coeficients siguin iguals. |
| Substitució compartida | `#valor` (Traducció) | Reemplaçar `x` i operar | Substituir només a una part de l’expressió. |

La teoria existent també explica la reducció de termes (`#reduir`), contingut que es manté sota `simplificacio`; en aquesta PR no es canvia la teoria. Playwright amb Chrome ha verificat els ancoratges, el canvi d’ancoratge, els enllaços contextuals, la tornada i l’amplada de 390 px.

## Canvis i validació

- S’ha afegit `0` al banc de coeficients i s’han inclòs signes positius i negatius en els termes independents.
- El tipus 3 ara identifica termes i signes; la reducció algebraica no es duplica com a família de `monomis`. Els patrons M3/M4 mantenen els mateixos enunciats/respostes i s’assignen al tema `simplificacio`.
- M6 baixa de N2 a N1 perquè només requereix una substitució i una operació directa; `diff` intern i classificador s’han alineat. P7 també s’ha ajustat a N1 a Patrons per la mateixa raó de lectura directa.
- Prova matemàtica: 2.500 generacions (1.000 dels quatre tipus + 1.500 de sis rutes del banc); rotació de les 4 famílies pròpies accessibles a la pràctica, 5 aparicions cadascuna. M6 s’ha cobert com a ruta oberta i d’examen.
- Playwright/Chrome: 500 generacions, les 4 famílies de pràctica i l’avaluació compartida al banc/examen, 12 preguntes del tema, 20 globals, guia/autònom/recuperació i teoria/390 px superats.
- Regressions: 30 mostres per cadascun dels 3 temes del Lot 2 i 4 ampliacions en cada execució Playwright.
- Cap incidència local pendent. GitHub Actions i remot s’actualitzaran després d’obrir la PR.
