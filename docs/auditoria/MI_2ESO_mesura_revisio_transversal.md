# Revisió transversal · 2n ESO · Sentit de la mesura

**FASE A — PROPOSTA PROVISIONAL.** Inventari de 7 temes i 128 tipus ja completat. Aquest document contrasta els set informes; **no declara famílies validades**, no modifica nivells ni generadors, i no incorpora cap família a `families-validades.json`.

## 1. Regla de consolidació

D'acord amb `docs/auditoria/PLANTILLA_AUDITORIA_NIVELLS.md`: una família ha de tenir **procediment matemàtic genuïnament diferent**, no només dades, figura, context, unitat, representació o redacció diferents. N1 = aplicació directa; N2 = interpretació/transferència/combinació; N3 = reconstrucció o justificació no immediata. **La distribució 5/5/3 i les 15 famílies són orientatives, no quotes.**

**No confondre els tres recomptes:** els 128 tipus de generador; les agrupacions provisionals pròpies de cada tema; i les famílies genuïnes **transversals** després de fusionar solapaments. No hi ha encara un total defensable de famílies validades per al bloc.

## 2. Correspondències transversals directes: no crear una família per cada context

Notació `tema:tipus` i variants indicades quan cal. Les equivalències següents expressen **el nucli matemàtic compartit**, no certificació de tot el contingut o dificultat de cada variant.

| Nucli de procediment compartit | Exemples de tipus ja documentats | Criteri transversal |
|---|---|---|
| Conversió d'unitats de superfície | `unitats:2,11`; `problemes:18` | Convertir m²↔cm² és la mateixa operació, encara que s'emmarqui en un pressupost |
| Conversions volum–capacitat | `unitats:6,12,16,18`; `superficies:13,14`; `problemes:4` | Cal distingir **conversió pura** de **càlcul previ de volum**; no comptar una conversió final com a nova família |
| Escala → longitud real | `escales:1,2`; `problemes:8` | Mateixa estructura: longitud mapa × factor i canvi d'unitat |
| Trobar escala a partir de mapa i realitat | `escales:4,15`; `problemes:9` | Normalitzar dibuix/real després d'igualar unitats |
| Semblança per ombres | `escales:8,9`; `problemes:10` | Una proporció de longituds/ombres, no un procediment nou per canviar de persona a pal |
| Hipotenusa contextual | `pitagores:4,6,7,8,13,15-diagonal`; `problemes:6,7` | Diagonal, cable, escala i rampa reutilitzen (c=√(a²+b²)); importa si el triangle està implícit |
| Sostracció de superfícies / corona circular | `perimetres:9,11,16,17`; `problemes:11,12` | Construir superfície exterior i restar buits; `problemes:12` és pràcticament el mateix que `perimetres:17` |
| Àrea lateral de cilindre | `superficies:8,19`; `problemes:5` | Etiqueta sobre llauna i cilindre desplegat reutilitzen (2πrh); `superficies:19` pregunta les dimensions del rectangle, no el producte |
| Volum del cilindre / altura inversa | `superficies:7,12`; `problemes:4,20` | `problemes:20` equival a aïllar `h=V/(πr²)` després de (L=dm³) |
| Superfície de capsa i recompte de cares | `superficies:2,6,16,20`; `problemes:13` | Diferenciar capsa **tancada** (sis cares) de **sense tapa** (cinc), però no generar una família per cada objecte |
| Estimació plausible | `estimacio:1,2,3`; `problemes:17`; `unitats:7` | Identificar unitat i ordre de magnitud és un coneixement transversal; comparar després les demandes concretes |
| Error relatiu i comparació | `estimacio:7,8,9,13`; `problemes:16` | Si es compara respecte a la **mateixa referència**, com a `problemes:16`, n'hi ha prou de comparar errors absoluts; no equiparar necessàriament la dificultat amb `estimacio:9` |
| Diagnòstic de confusió de fórmules | `unitats:13,17`; `pitagores:16`; `perimetres:18`; `superficies:18`; `estimacio:18` | **Format de pregunta compartit, no mateixa família matemàtica!** Canvien el concepte i l'error analitzat. No fusionar automàticament aquests tipus només perquè diuen «quin error?» |

Les parelles similars són **candidatures de fusió a nivell de curs**: cada tema pot continuar oferint les seves pròpies preguntes, però un inventari de famílies no ha de multiplicar-se per context. La matriu és verificable als set informes anteriors.

## 3. Combinacions que podrien merèixer família diferenciada

No declarar-les noves automàticament. Cal demostrar que incorporen **una decisió o reconstrucció diferent**, no només un pas aritmètic afegit.

| Procediment compost | Font | Què afegeix respecte del procediment base | Decisió |
|---|---|---|---|
| Calcular superfície pintable, aplicar rendiment i arrodonir pots sencers | `problemes:1` vs `perimetres:16` | Interpretació de rendiment i arrodoniment per excés al final | **Candidata diferenciada N2**; provar varietat d'1, 2, 3+ pots |
| Recompte de rajoles amb canvi d'unitats i disposició bidimensional | `problemes:2` | Quantificar peces a partir d'àrees o files×columnes, en m/cm | **Candidata N2**; els casos actuals no tenen retalls |
| Dipòsit parcialment ple: volum, litres i percentatge | `problemes:3` vs `superficies:1` | Composició de volum, conversió i operador percentual | **Candidata N2**; contrastar amb percentatges del sentit numèric |
| Perímetre amb obertura i cost de tanca | `problemes:14` vs `problemes:15` | En 14 hi ha cost proporcional; en 15 només longitud neta | **Subvariants d'una família de perímetre útil** fins a demostrar procediment diferent |
| Àrea d'un triangle isòsceles a partir de costats | `pitagores:10` vs fórmula directa d'àrea `perimetres` | Recuperar altura amb Pitàgores abans d'àrea | **Candidata N2** clarament més composta que substitució directa |
| Perímetre des de diagonal i costat | `pitagores:11` | Desfer Pitàgores i calcular perímetre | **Candidata N2**, valorar si agrupar-la amb altres problemes d'inversió i combinació |
| Recorregut més curt i estalvi | `pitagores:12` | Comparar suma de catets amb hipotenusa | **Candidata N2**, objectiu addicional de diferència |
| Capacitat→profunditat d'un dipòsit | `superficies:15` vs `superficies:10,12` | Conversió de litres i reconstrucció de volum invers | **Candidata N2**, el procediment invers és compartit en part |
| Franja rectangular amb amplada exterior | `problemes:11` vs `perimetres:9,11,16` | Reconstruir (L+2w) i (H+2w) abans de restar | **Variant composta N2**, no necessàriament família independent |
| Estimar pluja en litres a partir de mm×m² | `problemes:19` | Interpretació de l'equivalència aportada explícitament | **N1 defensable**, evitar classificar com a problema complex N3 |

## 4. Decisions de nivell que demanen comparació

1. **`unitats:6`**: branca directa N1 i branca encadenada candidata N2; separar variants abans de canviar el nivell.
2. **`unitats:18`**: mL→dm³ N1 actual, N2 candidat; validar si l'equivalència s'utilitza directament o s'han d'encadenar unitats.
3. **`pitagores:15`**: excepció `diagonal` N2 existent, `catet` N1. Conservar i provar totes dues variants.
4. **`superficies:17`**: excepció `sameBase` N1 existent, altres casos N2. Conservar i provar totes dues.
5. **`superficies:8` N1 versus `problemes:5` N2:** mateixa superfície lateral de cilindre amb radi/diàmetre donats; decidir si recuperar radi del diàmetre justifica N2 o només variant N1.
6. **`superficies:7` N1 versus `problemes:4` N2:** volum directe de cilindre amb r i h; la conversió dm³=L és immediata. **Discrepància clara a revisar**, no elevar sense raonament.
7. **`superficies:12` N2 versus `problemes:20` N2:** coherència ja existent en fórmula inversa de cilindre; comparar resposta i unitats.
8. **`estimacio:9` N2 versus `problemes:16` N1:** en aquest últim la referència és comuna; pot justificar N1 via comparar errors absoluts. Documentar simplificació, no declarar-ho un error de nivell sense més.
9. **`perimetres:12,13,14` N1:** inversions de fórmules; cal examinar si la manipulació simbòlica exigida és immediata en 2n ESO.
10. **N3:** l'inventari revisat assigna zero tipus base N3. No es recomana introduir-ne només per assolir una quota.

## 5. Incidències de qualitat amb prova lògica sobre el codi

| Prioritat proposada | Fitxer, tema/tipus | Evidència i afectació | Correcció futura |
|---|---|---|---|
| **P1** | `problemes:1` | Tres casos possibles: nombre de pots sempre **2**. No hi ha varietat en la resposta | Ampliar banc amb quocients que requereixin 1 i 3+ pots, provar `Math.ceil` |
| **P1** | `problemes:10` | Quatre casos amb `ht=6` → resposta sempre **6 m** | Diversificar altures correctes, verificar proporció |
| **P1** | `problemes:16` | Les quatre parelles tenen error menor a A → resposta sempre **Mesura A** | Afegir casos en què guanyi B, preservar criteri relatiu |
| **P1** | `estimacio:9` | Quatre parelles: A sempre més precisa en error relatiu | Alternar guanyador semàntic, no només barrejar opcions |
| **P1** | `estimacio:17` | Error A ∈ {1,2}, error B ∈ {4,5} → A sempre menor | Alternar guanyador semàntic amb dades plausibles |
| **P1** | `estimacio:14` | Enunciat omet unitats tot i que l'explicació les necessita | Afegir unitats i context físic inequívocs |
| **P2** | `estimacio:11` | La precisió raonable pot no ser unívoca sense instrument o ús indicat | Precisar context i criteri d'acceptació |
| **P2** | `estimacio:15` | Dades a una decimal, mitjana mostrada a dues; risc de confondre precisió de càlcul amb instrumental | Diferenciar mitjana aritmètica i resolució de lectura |
| **P2** | `perimetres:15` | Apotema calculada internament i arrodonida; la fórmula usa el valor indicat | Oracle usant apotema exposada, no valor exacte |
| **P2** | `escales:15,18` | Regeneració recursiva de certs casos | Tests de terminació i distribució |
| **P2** | `pitagores:9` | En alguns casos s'augmenta hipotenusa un punt per generar un triangle no rectangle | Comprovar desigualtat triangular en els valors possibles |

**P1/P2 són prioritats d'auditoria, no incidències reparades.** P1 per varietat molt limitada, ambigüitat o resposta previsible; P2 per risc pedagògic o de prova. No s'ha demostrat cap fallada de càlcul de totes les instàncies a partir d'una simple lectura estàtica.

## 6. Pla recomanat de validació

1. **Lot funcional A (primer):** tests amb oracle i reparació en una PR separada dels casos de varietat fixa `problemes:1,10,16`, `estimacio:9,17`; afegir context a `estimacio:14`. Provar que la resposta semàntica varia i que els distractors són únics.
2. **Lot pedagògic B:** decisió sobre variants i nivell d'`unitats:6,18` i coherència `superficies:7/8` versus `problemes:4/5`; tests de N1/N2 guiats i autònoms. No alterar `REVIEWED_LEVELS` sense proves de regressió.
3. **Lot transversal C:** resoldre les fusions de la matriu amb justificació família per família, dos exemples **reals** de generador per cada família amb proves, i comprovar el criteri de genuïnitat amb `Problemes de mesura`.
4. **Lot de validació final:** proves de UI, examen, fitxes, coherència de classificació, dades límit i contrast del currículum de 2n ESO. Només després de revisió humana, fusionar eventual PR d'implementació i registrar famílies com a validades.

## 7. Estat i traçabilitat

- **Fet:** revisió conjunta dels informes dels set temes i del protocol `PLANTILLA_AUDITORIA_NIVELLS.md`; correspondències explícites de tipus i casos dubtosos identificats; cap canvi funcional.
- **No fet:** deduplicació matemàtica exhaustiva amb una família final única assignada a cada tipus; mostres reals de cada generador, proves automàtiques específiques, contrast normatiu curricular i aprovació humana.
- **No executar de moment:** actualització del registre oficial `docs/auditoria/families-validades.json` o declaració de conformitat pedagògica. Els workflows existents de numeració o integritat documental no certifiquen les famílies de mesura.

**Decisió editorial:** la PR #49 pot continuar documentant aquests resultats en Draft; les correccions de codi i els nivells s'han de preparar i validar en PRs separades.
