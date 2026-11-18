# Pilot 3r ESO — Sentit de la mesura

## Abast

Auditoria documental dels **8 blocs ordinaris** de 3r ESO (80 tipus, segons els registres previs). Les ampliacions A–D de preparació de 4t (40 tipus) queden excloses dels recomptes i de les decisions de família.

| Bloc | Tema | Tipus | N1/N2 provisionals al registre revisat |
|---|---|---:|---:|
| 1 | Volum i capacitat | 10 | 7 / 3 |
| 2 | Mesura i precisió | 10 | 7 / 3 |
| 3 | Àrees i figures compostes | 10 | 1 / 9 |
| 4 | Semblança i mesures | 10 | 9 / 1 |
| 5 | Tales i mesures indirectes | 10 | 0 / 10 |
| 6 | Pitàgores i mesures indirectes | 10 | 0 / 10 |
| 7 | Piràmides i cons | 10 | 5 / 5 |
| 8 | Estimació, error i problemes de mesura | 10 | 5 / 5 |
| **Total** |  | **80** | **34 / 46 / 0 N3** |

Aquests recomptes descriuen l’estat dels fitxers previs, no són encara una proposta pedagògica ni un recompte de famílies. Cal contrastar-los amb els generadors actuals i separar tipus, variants i famílies.

## Evidència prèvia a reutilitzar

- `docs/dificultats/revisio-3eso-mesura-punt3.json`: 120 registres de tipus per als 8 blocs ordinaris i 4 ampliacions; estat global `reclassified-with-gaps`.
- `docs/dificultats/resultats-punt3-3eso-mesura.json`: mostres de 3.000 instàncies per bloc, amb resultats d’examen per als 8 blocs ordinaris; els registres previs de les ampliacions no tenen camp d’examen.
- `3eso/teoria/mesura/index.html`: delimita explícitament el recorregut principal (blocs 1–8) i les ampliacions A–D.

Les xifres i mostres s’han de contrastar amb el codi actual abans de concloure. La generació de mostres documentada prèviament no demostra per si sola l’equivalència pedagògica entre tipus.

## Decisions i revisió

Per a cada tipus s’ha de registrar el grup/família candidata i la relació: **mateixa família / variant / tasca diferent**. Per a cada família resultant: nivell proposat i justificació curricular de 3r, dos exemples resolts, errors típics i casos límit. Les propostes de nous exercicis s’han de limitar als procediments absents; no es forçarà N3 ni es duplicaran famílies entre blocs.

La revisió dels modes guiat, autònom i examen ha d’indicar, per cada afirmació, si l’evidència és **estàtica**, de **simulació** o **visual**. La manca de validació visual s’ha de declarar explícitament.

## Límit de canvis

Aquesta branca és documental. No s’han de modificar nivells de producció, generadors ni `families-validades.json`, ni crear workflows ni proves noves. Si l’auditoria detecta una correcció de codi imprescindible, documentar-la i aturar-se abans d’aplicar-la.

## Estat

- [x] Inventari inicial i abast (80 tipus ordinaris; ampliacions excloses).
- [ ] Contrastar inventari i evidència amb generadors actuals.
- [ ] Mapa tipus → família i decisions de deduplicació (80/80).
- [ ] Nivells, justificació curricular i casos (per família).
- [ ] Buits reals i propostes justificades, si n’hi ha.
- [ ] Revisió de guiat, autònom i examen; límits de verificació.
- [ ] Síntesi final amb què s’ha verificat i què queda pendent.

## Primera comprovació contra el generador (revisió estàtica)

Fitxer contrastat: `3eso/sentit-mesura.html` a la branca base.

- El codi declara exactament **8 temes de 3r** amb `exam3r:true` i **4 ampliacions de 4t** amb `exam3r:false` i `ampliacio:true`. Això confirma l’abast 80/40 dels registres previs.
- Hi ha un generador específic per a cadascun dels 12 temes. Els vuit generadors ordinaris seleccionen un identificador de tipus entre 1 i 10; per tant, els registres previs cobreixen els identificadors esperats, però encara falta contrastar una per una les branques i el procediment matemàtic real de cada tipus.
- La interfície de pràctica exposa dos nivells (1 i 2); al nivell 1 mostra les pistes. El codi no exposa un selector N3 en aquesta pàgina. Això descriu la implementació actual, no determina si pedagògicament caldria proposar N3.
- El filtre de contingut d’examen s’aplica sobre la llista de temes; els vuit blocs ordinaris estan marcats com a inclosos i les ampliacions com a excloses.
- Aquesta passada és **estàtica**. No s’han executat proves ni s’ha fet simulació o validació visual.

Aquesta confirmació de l’estructura no certifica encara la correcció de les 80 branques, la deduplicació per família, la qualitat dels exemples o l’adequació curricular.

## Progrés de l’auditoria

- [x] Confirmació estàtica de l’abast al codi: 8 blocs de 3r × 10 tipus i 4 ampliacions de 4t × 10 tipus.
- [ ] Contrast individual de les branques 1–10 dels vuit generadors ordinaris.
- [ ] Mapa tipus → família i decisions de deduplicació (80/80).
- [ ] Nivells, justificació curricular i casos (per família).
- [ ] Buits reals i propostes justificades, si n’hi ha.
- [ ] Revisió de guiat, autònom i examen amb classificació de l’evidència.
- [ ] Síntesi final amb què s’ha verificat i què queda pendent.