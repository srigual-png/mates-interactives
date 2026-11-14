# Simplificació d’expressions · Lot 2 · 1r ESO

Base auditada: `b046e8dd6466279b9b8e78cd8144d8f0e3fddde1` (main amb PR #40). La teoria existent es va consultar i provar, però no s’ha modificat.

## Inventari i classificació definitiva

El generador de pràctica accessible és `genSimplificacio()` amb tipus ordinaris 1, 3, 5 i 6. Els tipus 2 i 4 continuen sent ampliacions de 2n ESO. El banc obert conté S1–S6; M3/M4, que ja redueixen termes semblants, es mantenen encaminats a Simplificació des de Lot 1.

| ID estable | Família | Generadors / variants | Nivell anterior | Final |
|---|---|---|---|---|
| `reduir-termes-sempre-amb-la-mateixa-part-literal` | Reduir termes semblants d’una mateixa part literal | `simplificacio:1`, `simplificacio:5`, S1, S2, S4, M3, M4 | N1; bancs N1 | N1 |
| `simplificar-expressio-lineal-agrupant-termes` | Agrupar per separat termes amb x i termes constants | `simplificacio:3`, `simplificacio:6`, S3, S5, S6 | tipus 3/6 N2; S3 N2, S5/S6 N1 | N2 |

Els tipus 1 i 5, els bancs S1/S2/S4 i M3/M4 apliquen directament suma/resta de coeficients de termes semblants. Els tipus 3/6 i S3/S5/S6 combinen aquesta reducció amb substituir x o separar també termes independents. Les variants de context i de nombres no creen famílies noves. No hi ha cap procediment N3 curricularment justificat.

## Exemples representatius

| Família / nivell | Enunciat | Resposta |
|---|---|---|
| Reducció de termes semblants · N1 | Redueix `7x + 2x − 3x`. | `6x` |
|  | Redueix `4x + 5x`. | `9x` |
|  | Un grup recull `6x` taps i un altre `3x`; expressa el total simplificat. | `9x` |
| Agrupació lineal · N2 | Redueix `5x + 4 + 2x − 1`. | `7x + 3` |
|  | Simplifica `6x − 2x` i calcula-ho per `x = 3`. | `12` |
|  | Redueix `8x + 3 + 2x − 5`. | `10x − 2` |

## Cobertura de teoria

La pàgina no s’ha editat. Els procediments de reducció directa i agrupació mixta tenen cobertura a `#x`, `#mixta`, `#signes` i `#valor`; la validació Chrome comprova ancoratges, `hashchange` i 390 px.

## Validació

- Test matemàtic: **3.000 mostres** (1.000 dels quatre tipus ordinaris i 2.000 dels vuit generadors del banc, inclosos M3/M4). Oracles independents d’equivalència algebraica/avaluació, família i nivell, respostes, opcions, pistes i solucions: superat.
- Test Playwright amb Chrome: **500** generacions aleatòries, rotació de les 2 famílies sense repetició consecutiva, pràctica guiada/autònoma, recuperació, examen de 12 i global de 20 preguntes, teoria i vista mòbil: superat.
- En la mateixa suite: 30 generacions cadascuna de les 3 ampliacions de 2n i 30 per cadascun dels altres temes de Lot 2: superat.
- Limitació compartida amb Lot 1: el clic real de pràctica a teoria no es pot verificar des de `file://`; s’han verificat l’enllaç contextual i la navegació directa a teoria. Cal repetir el clic servint la web per HTTP.
