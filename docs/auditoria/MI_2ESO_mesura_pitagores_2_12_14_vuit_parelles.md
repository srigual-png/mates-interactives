# Pitàgores: hipotenusa i aplicacions — evidència aparellada

**Prova automatitzada superada:** [GitHub Actions #44108252953](https://github.com/srigual-png/mates-interactives/actions/runs/44108252953), amb **1.200 instàncies** matemàticament contrastades i **8 parelles reals** de dades compartides. També superada la validació integral de la PR en la mateixa revisió. Script: `scripts/test-mesura-2eso-pitagores2-12-14-aparellades.cjs`.

## Relacions pedagògiques

**`pitagores:12` ↔ `pitagores:2` (4 parelles):** amb catets 12 i 16, el tipus bàsic demana hipotenusa `√(12²+16²)=20` (cm). El problema de recorregut aplica el mateix càlcul en metres i continua amb `12+16−20=8 m` d'estalvi. El càlcul inicial és comú, però l'objectiu final i els passos no ho són.

**`pitagores:14` ↔ `pitagores:2` (4 parelles):** el cable entre dos punts utilitza la mateixa hipotenusa, però després afegeix una longitud extra d'ancoratge. Cal mantenir aquesta variant aplicada diferenciada de la hipotenusa directa.

La coincidència numèrica dels catets no és identitat d'unitats: `pitagores:2` presenta centímetres i `pitagores:12/14` metres. Els oracles han comprovat cada resposta en la seva unitat.

## Estat

**12 de 21** relacions conceptuals úniques amb comparació matemàtica aparellada (**46 conjunts aparellats**). Resten **9** relacions pendents. No implica aprovació pedagògica formal de famílies o nivells ni substitueix les proves dels modes guiat/autònom/examen. Cap modificació funcional dels generadors, fusió o publicació.
