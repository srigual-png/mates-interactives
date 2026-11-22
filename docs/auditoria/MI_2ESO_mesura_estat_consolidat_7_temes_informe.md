# Estat consolidat de l'auditoria · 2n ESO · Sentit de la mesura · 7 temes

**Data:** 17/11/2026 · **Estat:** consolidació de les proves i de les mancances, no validació pedagògica final.

## Resum comprovable

- **128/128 tipus** tenen una branca inspeccionada al codi de `2eso/sentit-mesura.html` i s'han exercitat en mostres de generació.
- La prova generativa més àmplia sobre l'estructura i els camps va executar **5.120 instàncies** (40 per tipus), amb **800 comprovacions independents** de resultat sobre **20 tipus**; els altres **108 tipus** no disposen encara de l'oracle extern en aquesta bateria.
- Després de les correccions autoritzades dels tipus `estimacio:1` i `estimacio:11`, la prova de comparació d'unitats sobre **7.680 mostres** va detectar **0 duplicats numèrics entre les opcions reconegudes**.
- Els dos exercicis corregits van superar proves reals a **Chromium**, a 1280×800 i 390×844, amb mode guiat, sense pistes i examen. Els altres 126 tipus no tenen encara la mateixa comprovació específica en navegador.
- El conjunt de **24 casos prioritaris** inspeccionats al codi és una revisió tècnica, **no** una aprovació de 24 nivells ni de 24 famílies matemàtiques.
- **Cap família ni nivell oficial validat o reclassificat** en aquesta fase. La proposta **5–5–3 és orientativa**, mai motiu per crear exercicis fora de nivell de 2n ESO.

Les bateries de 1.536, 5.120 i 7.680 exercicis són mostres **diferents i potencialment superposades**. No s'han de sumar com a 14.336 exercicis diferents certificats ni com a 128 oracles independents.

## Cobertura per tema

| Tema | Tipus | Oracles independents | Tipus encara sense oracle | Incidències prioritàries documentades |
| --- | ---: | ---: | ---: | ---: |
| Unitats | 18 | 1 | 17 | 4 |
| Escales | 18 | 1 | 17 | 2 |
| Pitàgores | 16 | 1 | 15 | 3 |
| Perímetres i àrees | 18 | 5 | 13 | 3 |
| Superfícies i volums | 20 | 1 | 19 | 4 |
| Estimació, precisió i error | 18 | 7 | 11 | 3 |
| Problemes de mesura | 20 | 4 | 16 | 5 |
| **Total** | **128** | **20** | **108** | **24** |

La distribució anterior mesura **tipus de generador**, no pas famílies matemàtiques diferents. No existeix encara una quantificació aprovada de famílies o de nivells N1/N2/N3.

## Canvis funcionals completats i provats

**Estimació 1:** s'ha eliminat un distractor duplicat per equivalència de longitud (`0,8 m = 80 cm`).

**Estimació 11:** s'ha substituït una pregunta subjectiva de precisió amb múltiples respostes plausibles per quatre casos de **decisió sobre instruments i toleràncies**; exigeix comparar el marge màxim d'error admès amb l'error garantit de cada instrument i escollir el menys precís que compleixi. La prova independent i el navegador real han passat.

Aquestes correccions són exclusivament a la branca de la **PR #49**; no s'han fusionat ni publicat.

## Què queda pendent per a una reorganització sòlida

1. **Oracles matemàtics:** completar progressivament els **108 tipus** que encara no tenen verificació independent de resultat; començar pels temes amb risc més alt (conversió d'unitats de superfície/volum, escales, Pitàgores i problemes compostos).
2. **Qualitat de distractors:** a `unitats:13/17` i `escales:14`, les opcions poden ser massa evidents encara que no siguin numèricament duplicades.
3. **Precisió i convencions:** aclarir la interpretació de l'interval d'arrodoniment d'`estimacio:12` i la precisió comunicada de la mitjana a `estimacio:15`.
4. **Famílies i nivells:** decidir amb criteris docents quines estratègies són diferents de debò i com es classifiquen N1/N2/N3; cal evitar duplicar variants o forçar 5–5–3.
5. **Interfície:** ampliar proves de navegador a altres tipus i verificar els modes d'exercici en sessions representatives; l'estimació 1/11 ja té cobertura.
6. **Reintents de generació:** els quatre casos observats acaben en el mostreig, però manca prova completa de terminació per a tots els paràmetres possibles.

## Recomanació de proper treball

Començar una **segona ampliació de 10–15 oracles independents** de risc alt, sense tocar els generadors. Registrar per cada tipus l'oracle calculat des de l'enunciat, exemples i casos límit; si es detecta un error, separar la proposta correctiva de qualsevol modificació funcional fins a autorització.

Referències i identificadors per tipus: `docs/auditoria/MI_2ESO_mesura_estat_consolidat_7_temes.json`.

**No es dona per acabada l'auditoria ni per aprovada la reorganització dels nivells.**
