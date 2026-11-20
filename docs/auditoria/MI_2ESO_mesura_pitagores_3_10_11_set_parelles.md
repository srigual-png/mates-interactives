# Contrast aparellat de Pitàgores invers — 2n ESO

**Prova:** [GitHub Actions #44107539982](https://github.com/srigual-png/mates-interactives/actions/runs/44107539982), resultat `success`. **1.200 exercicis** generats dels tipus `pitagores:3,10,11`, amb **7 parelles reals** basades en hipotenusa i catet conegut idèntics. Script: `scripts/test-mesura-2eso-pitagores3-10-11-aparellades.cjs`.

## Contrastos

**`pitagores:10` ↔ `pitagores:3` (3 parelles).** Triangle isòsceles amb base 12 cm i costats iguals 10 cm: cal trobar l'altura mitjançant `√(10²−6²)=8 cm` i després `12·8/2=48 cm²`. L'exercici base de Pitàgores pregunta directament pel catet 8 cm. No són el mateix objectiu ni magnitud de resposta.

**`pitagores:11` ↔ `pitagores:3` (4 parelles).** A partir de diagonal i costat d'un rectangle es calcula un catet desconegut. L'exercici contextual afegeix un pas posterior: `P=2(a+b)`, mentre que el bàsic acaba en la longitud del catet.

## Criteri pedagògic provisional

Les dues tasques contextuals comparteixen un **subprocediment necessari** amb `pitagores:3`, però incorporen una segona operació i més decisions. La prova matemàtica valida els resultats, **no autoritza agrupar-los en una mateixa família o nivell** sense contrast específic de modes guiat, autònom i examen.

El registre de cobertura recull **10 de 21** vincles conceptuals aparellats amb exemples reals i **38 casos aparellats** en conjunt. **11 vincles continuen pendents**. Cap modificació dels generadors, dels nivells aprovats, fusió o publicació.
