# Profunditat d'un dipòsit i fórmules inverses del prisma — 2n ESO

**Validacions superades:** [proves específiques #44112545852](https://github.com/srigual-png/mates-interactives/actions/runs/44112545852) i [validació integral #44112545463](https://github.com/srigual-png/mates-interactives/actions/runs/44112545463).

El test `scripts/test-mesura-2eso-superficies10-11-15-inverses.cjs` ha verificat **1.200 exercicis** dels tipus `superficies:10,11,15`, amb les seves respostes, unitats, alternatives i pistes.

**Contrast amb dades idèntiques:** els tipus `superficies:10` i `superficies:11` presenten **24 combinacions reals compartides** d'àrea de base i altura. S'han registrat 4 parelles: amb `V=48 cm³` i `A_base=12 cm²`, el tipus 10 exigeix `h=4 cm`; amb `V=48 cm³` i `h=4 cm`, l'11 exigeix `A_base=12 cm²`. Mateixa fórmula `V=A_base·h`, però incògnites i unitats finals diferents.

**Contrast estructural, no aparellat:** a `superficies:15`, un dipòsit amb superfície de base en `m²` i volum en litres requereix convertir a `m³`, obtenir l'àrea a partir de llargada i amplada i dividir per trobar la profunditat en `m`. No s'ha trobat ni acreditat un parell de dades idèntiques amb `superficies:10/11`, que utilitzen `cm³` i `cm²`.

**Criteri pedagògic:** el tipus 15 utilitza una operació inversa relacionada amb el tipus 10, però incorpora conversió d'unitats i càlcul d'àrea. Aquesta evidència no basta per aprovar una mateixa família o nivell. No s'han modificat generadors, `REVIEWED_LEVELS`, fitxers de famílies aprovades ni s'ha fusionat o publicat la PR.
