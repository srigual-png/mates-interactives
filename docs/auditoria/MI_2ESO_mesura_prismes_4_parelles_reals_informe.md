# Prismes amb àrea de base coneguda i calculada — 2n ESO

**Evidència:** [GitHub Actions #44106878748](https://github.com/srigual-png/mates-interactives/actions/runs/44106878748), `success`: 800 exercicis generats amb oracle independent, 16 conjunts de paràmetres coincidents i **4 parelles reals documentades**. La validació integral de la PR és independent de l'aprovació pedagògica.

## Contrast de tasca
`superficies:3`: base **12 cm²**, altura **10 cm** → volum **120 cm³**. L'àrea de base és una dada.

`superficies:4`: base triangular de **8 cm** × **3 cm**, longitud de prisma **10 cm** → base `8·3/2=12 cm²`, volum **120 cm³**. Cal *obtenir primer* l'àrea de base triangular.

**Conclusió provisional:** els dos exercicis comparteixen el nucli `V=A_base·h` i resultat final, però el segon exigeix un pas conceptual més. Unificar-los sense conservar les variants diluiria la dificultat de calcular l'àrea de base.

**Cobertura:** ara hi ha evidència de dades compartides en 8 de les 21 comparacions conceptuals úniques; resten 13. No s'han validat els modes guiat/autònom/examen, ni aprovat famílies o nivells. Cap canvi de codi font dels generadors o fusió/publicació.
